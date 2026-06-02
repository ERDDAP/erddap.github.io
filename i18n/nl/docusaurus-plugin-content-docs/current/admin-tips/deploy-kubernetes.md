# Hoe in te zetten ERDDAP over Kubernetes

Inzetten ERDDAP op Kubernetes biedt een schaalbare, veerkrachtige omgeving voor uw dataserver. Deze gids heeft betrekking op de essentiële componenten die nodig zijn voor het hosten ERDDAP standaard gebruiken Kubernetes manifesteert zich, inclusief het beheren van persistente opslag, het implementeren van de applicatie, het configureren van netwerken, en het genereren van nieuwe dataset XMLs rechtstreeks vanuit het cluster.

## Vereisten
Voordat u begint, zorg ervoor dat u:
- Een lopende Kubernetes cluster
-  `Kubectl` geïnstalleerd en geconfigureerd om te communiceren met uw cluster
- Een opslagvoorziening die persistente volumes kan creëren (PV's) 
- Uw `setup.xml` en ` datasets.xml ` klaar om te worden gemonteerd
----

## 1. Permanente opslag (PVC) 
 ERDDAP vereist aanhoudende opslag om cache-bestanden, logs en status over pod herstarten te behouden. Gebruik van een `PersistentVolumeClaim`   (PVC) uw `bigParentDirectory`   (waarbij ERDDAP slaat de gegenereerde gegevens op) is niet verloren als een capsule gaat neer. Dit volume kan ook worden gekoppeld aan uw gegevensopslaglocatie waar de ruwe gegevensbestanden zullen leven.

Een bestand aanmaken met de naam `pvc.yaml` Zoals:
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

:::tip
 **Opmerking:** Uw opslag provisioner zal moeten instellen van de volume claim op de Kubernetes cluster en geven u de `opslagClassName` voordat je je ermee kunt verbinden.
:::

----

## 2. De ERDDAP Toepassing
Het Deployment manifest beheert de ERDDAP Pod zelf. Wij raden het gebruik van de officiële erddap/erdap Docker afbeelding met langdurige ondersteuning.

:::info
Vanaf mei 2026, [v2.30.0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) was de laatste versie. Het is verstandig om af en toe opnieuw in te zetten om de beveiligingskwetsbaarheden bij te houden.
:::

In deze configuratie injecteren we belangrijke omgevingsvariabelen om tijdzone-instellingen te verwerken, ervoor te zorgen dat Tomcat de juiste lees-/schrijfrechten heeft voor het opslagvolume, en te vertellen ERDDAP hoe u URL's correct kunt routeren als u achter een Kubernetes-ingang zit. We monteren ook het PVC op `/erdapData`   (de standaard `bigParentDirectory` ) om de datasets.xml en setup.xml in `/usr/local/tomcat/content/erdap` .

Een bestand aanmaken met de naam `implementation.yaml` :

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
-  **TZ** : Stelt de tijdzone in voor de Tomcat-server en ERDDAP logs.

-  **TOMCAT_USER_ID & TOMCAT_GROUP_ID** : Standaard is de ERDDAP container draait Tomcat als een specifieke gebruiker. Als het aanhoudende volume dat is gekoppeld aan /erddapData eigendom is van een andere gebruiker/groep ID op uw host opslagsysteem, ERDDAP zal crashen als gevolg van toestemming geweigerde fouten. Het instellen van deze variabelen dwingt Tomcat om te draaien met de bijbehorende ID's.

    :::tip
Zoek uw gebruiker UID op de server waar de NFS mount is als volgt: `id -u <your-user_name> ` . Dit geeft de numerieke waarde terug die je nodig hebt.
    :::

-  ** ERDDAP _baseUrl & ERDDAP _baseHttps Url** : Wanneer ERDDAP Loopt in Kubernetes achter een Service en een Ingress, Tomcat denkt dat het vervoer op localhost:8080. Deze variabelen overschrijven ERDDAP 's interne URL-generatie zodat links (zoals uw aangepaste logo of dataset links) correct oplossen naar uw publieke domeinnaam.

:::noot
Als u afzonderlijke productie- en QA-omgevingen gebruikt, wees voorzichtig met het delen van één PVC. Het wijzigen of verwijderen van gecachede gegevens in de ene omgeving zal onmiddellijk van invloed zijn op de andere. We beheren dit met implementatie-overlays voor QA en Productie en het toevoegen van submappen voor elke overlay. Dit stelt ons in staat om te testen op QA met een QA datasets. XML alvorens de productie-implementatie aan te raken.
:::
---

## 3. Netwerken: Service en Ingress
Om uw ERDDAP pod naar het web, je hebt een Service nodig om intern clusterverkeer te routeren, en een Ingres om het te binden aan een publieke DNS naam.

Een bestand aanmaken met de naam `service.yaml` :
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

Een bestand aanmaken met de naam `ingress.yaml` :
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
## 4. Omgevingen beheren met Kustomize
Naarmate uw implementatie groeit, beheren individuele YAML-bestanden voor verschillende omgevingen (b.v. QA vs. Productie) wordt foutgevoelig. Kustomize stelt u in staat om een "Base" configuratie te definiëren en vervolgens "Overlays" toe te passen op tweak instellingen voor specifieke omgevingen. In je GitHub repository, orden je de bestanden als volgt:

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

Creëer de `kustomization.yaml` bestand om alle bronnen te verzamelen en kaart uw aangepaste setup en datasets XML-bestanden. Deze zullen worden doorgegeven in uw ERDDAP Docker image wanneer ingezet, zodat u uw ERDDAP pagina en voeg datasets toe van uw GitHub repository tijdens het huren `kustomize` in kaart brengen met uw inzet.

#### Basis ( `base/kustomization.yaml` ) 
De basiskustomization bundelt gewoon je kernbronnen gedeeld over de overlays. We houden de productie ` datasets.xml ` en `setup.xml` in de basis en deze alleen bijwerken na het testen op QA.

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
soort: Kustomization
naamruimte: <your-erddap-namespace> 
middelen:
- ../../basis
- ingress.yaml
configMapGenerator:
- naam: setup-xml
gedrag: vervangen # Deze override zal het lokale instellingenbestand gebruiken met de logolink van de QA-URL.
bestanden:
  - setup.xml
- naam: datasets-xml
gedrag: vervangen # Deze override zal de lokale datasets xml gebruiken om de datasets xml bij te werken in de QA implementatie.
bestanden:
  -  datasets.xml 
pleisters:
- pad: inzet. yaml
naamVoorvoegsel: qa-
etiketten:
- inclusief Selectors: waar
paar:
milieu: qa
```

And here's the corresponding Production `kustomization`:
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
soort: Kustomization
naamruimte: <your-erddap-namespace> 
middelen:
- ../../basis
- ingress.yaml
pleisters:
- pad: inzet. yaml
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
