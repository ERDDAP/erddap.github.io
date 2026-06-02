# Comment déployer ERDDAP sur Kubernetes

Déploiement ERDDAP sur Kubernetes fournit un environnement évolutif et résistant pour votre serveur de données. Ce guide couvre les éléments essentiels nécessaires à l'accueil ERDDAP utilisant la norme Kubernetes manifeste, y compris la gestion du stockage persistant, le déploiement de l'application, la configuration du réseau et la génération de nouveaux XML de jeux de données directement à partir du cluster.

## Préalables
Avant de commencer, assurez-vous :
- Un cluster Kubernetes
-  `Les` installé et configuré pour communiquer avec votre cluster
- Un fournisseur de stockage capable de créer des volumes persistants (PVs) 
- Votre `configuration.xml` et ` datasets.xml ` prêt à monter
-----

## 1. Stockage persistant (PVC) 
 ERDDAP nécessite un stockage persistant pour maintenir les fichiers cache, les journaux et l'état à travers les redémarrages de pod. Utilisation d'un `Volume persistant`   (PVC) veille à ce que votre `BigParent Directory`   (où ERDDAP stocke ses données générées) n'est pas perdu si une nacelle tombe. Ce volume peut également être lié à votre emplacement de stockage de données où les fichiers de données brutes vont vivre.

Créer un fichier nommé `Pvc.yaml` Comme ça :
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: erddap-pvc
spec:
  storageClassName: <your-claim> # Replace with the name of your claim
  accessModes:
    - ReadWriteMany # Allows multiple pods to access the data if scaling/testing
  resources:
    requests:
      storage: 50Gi # Adjust based on your dataset sizes
```

:::pointe
 **Remarque:** Votre fournisseur de stockage devra configurer la réclamation de volume sur le groupe Kubernetes et vous donner le `Nom de la classe de stockage` avant de pouvoir vous y connecter.
:::

----

## 2. Les ERDDAP Déploiement
Le manifeste de déploiement gère ERDDAP C'est lui-même. Nous vous recommandons d'utiliser l'image officielle erddap/erddap Docker avec un support à long terme.

:::Informations
En mai 2026, [v2.30.0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) était la dernière version. Il est sage de redéployer à l'occasion pour suivre les vulnérabilités en matière de sécurité.
:::

Dans cette configuration, nous injectons des variables d'environnement clés pour gérer les paramètres de fuseau horaire, nous nous assurons que Tomcat a les permissions correctes de lecture/écriture pour le volume de stockage, ERDDAP comment effectuer correctement l'acheminement des URLs quand vous êtes assis derrière un Kubernetes Ingress. Nous montons également le PVC pour `/erddapDonnées`   (par défaut `BigParent Directory` ) pour injecter datasets.xml et setup.xml dans `/usr/local/tomcat/content/erddap` .

Créer un fichier nommé `déploiement.yaml` :

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: erddap-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: erddap
  template:
    metadata:
      labels:
        app: erddap
    spec:
      containers:
      - name: erddap
        image: ghcr.io/erddap/erddap:v2.30.0
        imagePullPolicy: "Always"
        ports:
        - name: http
          containerPort: 8080
        lifecycle:
            postStart:
              exec:
                command: 
                # This ensures the dataset scripts are executable in the pod
                  - /bin/sh
                  - -c
                  - |
                    chmod +x /usr/local/tomcat/webapps/erddap/WEB-INF/GenerateDatasetsXml.sh
                    chmod +x /usr/local/tomcat/webapps/erddap/WEB-INF/DasDds.sh
        env:
        - name: TZ
          value: "America/New_York" 
          # Adjust to your local timezone
        - name: TOMCAT_USER_ID
          value: "1000" 
          # Must match the user ID that owns the mounted volume directories
        - name: TOMCAT_GROUP_ID
          value: "2000" 
          # Must match the group ID that owns the mounted volume directories
        - name: ERDDAP_baseUrl
          value: "http://erddap.your-institution.edu"
        - name: ERDDAP_baseHttpsUrl
          value: "https://erddap.your-institution.edu"
          # These environment variables prevent TOMCAT from using `localhost` for subroutes. Both are needed for routing the custom logo
        resources:
          limits:
            memory: "8Gi"
            cpu: "2"
          requests:
            memory: "4Gi"
            cpu: "1"
        volumeMounts:
        - name: erddap-storage
          mountPath: /erddapData
          subPath: data 
          # This subpath is where your data live on the volume mount
        - name: erddap-storage
          mountPath: /usr/local/tomcat/content/erddap
          subPath: config
          # This subpath is for your config files on the volume mount
        - name: erddap-storage
          mountPath: /usr/local/tomcat/logs
          subPath: erddap/logs/tomcat
          # This subpath is to pass out the tomcat logs to your volume mount to make them easy to find
        - name: erddap-storage
          mountPath: /erddapData/logs
          subPath: erddap/logs/data_loading
          # This subpath is to pass out the deployment logs to your volume mount to make them easy to find
      volumes:
      - name: erddap-storage
        persistentVolumeClaim:
          claimName: erddap-pvc
```
-  **TZ** : Définit le fuseau horaire du serveur Tomcat et ERDDAP Des journaux.

-  **TOMCAT_USER_ID & TOMCAT_GROUP_ID** : Par défaut, ERDDAP conteneur fonctionne Tomcat comme un utilisateur spécifique. Si le volume persistant monté sur /erddapData appartient à un autre identifiant utilisateur/groupe sur votre système de stockage hôte, ERDDAP s'écrasera en raison d'erreurs de permission refusées. Réglage de ces variables force Tomcat à exécuter avec les ID correspondants.

    :::pointe
Trouvez votre UID utilisateur sur le serveur où le montage NFS est comme ceci: `id -u <your-user_name> ` . Cela retournera la valeur numérique dont vous avez besoin.
    :::

-  ** ERDDAP _baseUrl & ERDDAP _baseHttps Autres** : Quand ERDDAP tourne à Kubernetes derrière un Service et une Ingress, Tomcat pense qu'il dessert le trafic sur localhost:8080. Ces variables remplacent ERDDAP La génération interne d'URL pour que les liens (comme votre logo personnalisé ou vos liens dataset) résoudre correctement votre nom de domaine public.

:::Remarque
Si vous utilisez des environnements de production et d'AQ séparés, soyez prudents quant au partage d'un seul PVC. Modifier ou supprimer les données mises en cache dans un environnement affectera immédiatement l'autre. Nous gérons cela en utilisant des superpositions de déploiement pour QA et Production et en ajoutant des sous-dossiers pour chaque superposition. Cela nous permet de tester sur QA avec un ensemble de données QA. XML avant de toucher le déploiement de la production.
:::
---

## 3. Réseautage : Service et entrée
Pour exposer votre ERDDAP pod sur le web, vous avez besoin d'un Service pour acheminer le trafic de cluster interne, et d'un Ingress pour le lier à un nom DNS public.

Créer un fichier nommé `Service.yaml` :
```yaml
apiVersion: v1
kind: Service
metadata:
  name: erddap-service
spec:
  selector:
    app: erddap
  ports:
    - name: http
      protocol: TCP
      port: 80
      targetPort: 8080
```

Créer un fichier nommé `ingress.yaml` :
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: erddap-ingress
  labels:
    app: erddap
  annotations:
    spec.ingressClassName: nginx
    nginx.ingress.kubernetes.io/app-root: /erddap
    # This app-root allows us to just use the deployment url without "/erddap" when navigating to the URL.
    cert-manager.io/cluster-issuer: "<your-cluster-issuer>"
    # Use this if your IT has set up a certificate manager on the Kubernetes cluster for TLS handshakes/https. This is the name of the `ClusterIssuer` that finds the encrypted secrets.
spec:
  tls:
    - hosts:
        - erddap.your-institution.edu
  rules:
  - host: erddap.your-institution.edu
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: erddap-service
            port:
              name: http
```
---
## 4. Gestion des environnements avec Kustomize
Au fur et à mesure que votre déploiement augmente, gérer des fichiers YAML individuels pour différents environnements (Par exemple, QA vs Production) devient sujet à erreur. Kustomize vous permet de définir une configuration "Base" puis d'appliquer "Overlays" pour modifier les paramètres pour des environnements spécifiques. Dans votre dépôt GitHub, organisez les fichiers comme suit :

```text
erddap/
├── base/
│   ├── datasets.xml
│   ├── setup.xml
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── pvc.yaml
│   └── kustomization.yaml
└── overlays/
    ├── qa/
    │   ├── datasets.xml
    │   ├── setup.xml
    │   ├── deployment.yaml
    │   ├── ingress.yaml
    │   └── kustomization.yaml
    └── production/
        ├── deployment.yaml
        ├── ingress.yaml
        └── kustomization.yaml
```

Créer la `kustomisation.yaml` fichier pour collecter toutes les ressources et mapper vos fichiers XML personnalisés de configuration et de données. Ils seront transmis dans votre ERDDAP Image Docker lors du déploiement afin que vous puissiez styler votre ERDDAP page et ajouter des ensembles de données de votre dépôt GitHub tout en laissant `kustomize` les cartographier à votre déploiement.

#### Base ( `base/kustomisation.yaml` ) 
La kustomisation de base regroupe simplement vos ressources de base partagées entre les recouvrements. Nous gardons la production ` datasets.xml ` et `configuration.xml` dans la base et ne mettre à jour ces derniers qu'après les essais sur l'AQ.

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: <your-erddap-namespace>
configMapGenerator:
- name: setup-xml
  files:
  - setup.xml
- name: datasets-xml
  files:
  - datasets.xml
resources:
- deployment.yaml
- service.yaml
- pvc.yaml
#### Overlays (`overlays/{qa,production}/kustomization.yaml`)
The overlay points to the base and adds environment-specific changes to allow testing in QA before updating the production deployment. 

Here's an example of the QA overlay that patches onto base:
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
genre: Kustomisation
espace de noms : <your-erddap-namespace> 
ressources :
- ../../base
- ingress.yaml
configMapGenerator:
- nom : setup-xml
comportement: remplacer # Cette substitution utilisera le fichier de configuration local avec le lien logo de l'URL QA.
fichiers & #160;:
  - configuration.xml
- nom: datasets-xml
comportement: remplacer # Cette redéfinition utilisera les ensembles de données locaux xml pour mettre à jour les ensembles de données xml dans le déploiement de QA.
fichiers & #160;:
  -  datasets.xml 
correctifs & #160;:
- chemin: déploiement. l'anémie
NomPréfixe : qa-
étiquettes:
- inclusSélecteurs: true
paires:
environnement: qa
```

And here's the corresponding Production `kustomization`:
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
genre: Kustomisation
espace de noms : <your-erddap-namespace> 
ressources :
- ../../base
- ingress.yaml
correctifs & #160;:
- chemin: déploiement. l'anémie
```

:::info
In the case of the production overlay, the only thing patching onto base is the ingress. The `datasets` and `setup` XML files from base will map to the production deployment.
:::

#### Apply the deployment
Now apply the configuration using `kustomize`:
| Env | Command |
| --- | --- |
| QA | `kubectl apply -k overlays/qa/ --server-side=true` |
| Production | `kubectl apply -k overlays/production/ --server-side=true` |

:::note
Make sure you are in the right namespace and context before applying the config. The namespace and contexts are set up by your IT Kubernetes administrator. QA typically uses the `qa-` prefix.
:::

:::tip
Adding the flag `--server-side=true` is critical once your datasets.xml file grows larger than 256kB. The API has a file size limit so this work needs to be passed off to the cluster rather than the API.
:::

Check the status of your deployment:
`kubectl get pods`

---
## 5. Dataset XML Generation in Kubernetes
 Adding new datasets to ERDDAP requires generating an XML block for the `datasets.xml` file. ERDDAP ships with two interactive utilities, `GenerateDatasetsXml.sh` and `DasDds.sh`, which you can run directly inside your active pod.

 ### Step 1: Generate the XML
   - Find the pod ID: `kubectl get pods`
   - Exec into the pod and run the generator script: `kubectl exec -it <erddap-pod-id> -- bash -c "cd /usr/local/tomcat/webapps/erddap/WEB-INF && ./GenerateDatasetsXml.sh"`
   - Follow the interactive prompts, making sure to use the path inside the Docker container that maps to your volume mount: `/erddapData/my_new_dataset`
   - Copy the resulting XML output to your `datasets.xml` in your repository and to the `datasets.xml` in your volume mount. After we validate the XML, we can redeploy and the config will map the new `datasets.xml` file to your deployment.

### Step 2: Validate the new Dataset XML
Before restarting the entire deployment, test that ERDDAP can successfully read your new XML configuration using the `DasDds.sh` script.
  - Ensure your updated `datasets.xml` is saved to your mounted config directory.
  - Run the validation script: `kubectl exec -it <erddap-pod-id> -- bash -c "cd /usr/local/tomcat/webapps/erddap/WEB-INF && ./DasDds.sh"`
  - Enter the `datasetID` you just created in the last step.
  - If the XML is valid, the script will print the `.das` and `.dds` structure to your terminal. If there are errors, use the output to troubleshoot and correct your `datasets.xml`. Repeat steps 1 and 2 until there are no more errors.

  ### Step 3: Apply the Changes
  Once validated, restart your deployment so ERDDAP can ingest the new configurations: 
  `kubectl rollout restart deployment/erddap-deployment`

  ---

### Useful `kubectl` commands for debugging

| Command | Purpose |
| --- | --- |
| `kubectl port-forward <erddap-pod-id> 8080:8080` | Forward the pod's port to your local machine (`http://localhost:8080/erddap`) for testing before modifying Ingress. |
| `kubectl logs <erddap-pod-id>` | View the Tomcat/Catalina startup logs to diagnose immediate crash loops. |
| `kubectl describe pod <erddap-pod-id>` | Check for volume mounting errors or insufficient resource limits. |
| `kubectl get ingress erddap-deployment -n <your_erddap_namespace> -o yaml` | Check ingress connections. |
| `kubectl get endpoints erddap-deployment -n <your_erddap_namespace> -o yaml` | Check your endpoint connections. |
| `kubectl describe svc erddap-deployment -n <your_erddap_namespace>` | Check service IPs and ports. |
---

### Notes
This is only one way of deploying ERDDAP using Kubernetes, and is the way we have deployed the [ERDDAP](https://erddap.riddc.brown.edu/erddap/index.html) associated with the [Rhode Island Data Discovery Center](https://riddc.brown.edu/). We use the manifest approach with `kustomize` so it's easier to understand all the connections and we still get the benefits of using overlays and testing on QA. Helm Charts is another viable approach, but would use a completely different configuration approach. 
