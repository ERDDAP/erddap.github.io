# Sådan gør du ERDDAP på Kubernetes

At huske ERDDAP på Kubernetes giver et skalerbart, robust miljø til din dataserver. Denne vejledning dækker de væsentlige komponenter, der kræves for at hoste ERDDAP Brug af standard Kubernetes manifesterer sig, herunder administration af vedvarende opbevaring, udrulning af programmet, konfiguration af netværk og generere nye datasæt XMLs direkte fra klyngen.

## Forudsætninger
Før du begynder, skal du sikre dig:
- En kørende Kubernetes klynge
-  `kubectl` installeret og konfigureret til at kommunikere med din klynge
- En lagerfører, der kan skabe vedvarende volumener (PV'er) 
- Din Dine Dine `opsætning.xml` og og og ` datasets.xml ` klar til at blive monteret
----

## 1. Vedvarende opbevaring (PVC PVC PVC) 
 ERDDAP kræver vedvarende opbevaring for at opretholde cache filer, logfiler og tilstand på tværs af pod genstarter. Brug af en `VedvarendeVolumeClaim`   (PVC PVC PVC) sikrer, at din virksomhed `bigParentDirectory`   (hvor ERDDAP Gemmer sine genererede data) er ikke tabt, hvis en pod går ned. Denne volumen kan også forbindes til din datalagringssted, hvor de rå datafiler vil leve.

Opret en fil ved navn `PVC.yaml` som så:
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

:::tip tip tip tip
 **Bemærk:** Din lagerfører skal konfigurere lydstyrken på Kubernetes-klyngen og give dig den. `Opbevaringsklassenavn` før du kan oprette forbindelse til det.
:::

----

## 2. The The The The The The The ERDDAP Implementering af implementering
Implementerings manifesteret administrerer ERDDAP pod sig selv. Vi anbefaler at bruge den officielle erddap/erddap Docker billede med langsigtet støtte.

:::info info
Som den 2026, [v2.30.0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) var den seneste version. Det er klogt at re-deploy lejlighedsvis at holde op med sikkerhedssårbarheder.
:::

I denne konfiguration indsætter vi centrale miljøvariabler til at håndtere tidszoneindstillinger, sikre, at Tomcat har de korrekte læse-/skrivetilladelser til opbevaringsvolumen og fortælle ERDDAP hvordan man korrekt kører webadresser, når man sidder bag en Kubernetes Ingress. Vi monterer også PVC til `/erddapData`   (Standard `bigParentDirectory` ) til at indsætte datasets.xml og opsætning.xml ind `/usr/lokal/tomcat/content/erddap` .

Opret en fil ved navn `implementering.yaml` :

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
-  **TZ** : Angiver tidszonen for Tomcat-serveren og ERDDAP logfiler.

-  **Hoteller i nærheden af TOMCAT_GROUP_ID** : Som standard ERDDAP containeren kører Tomcat som en specifik bruger. Hvis den vedvarende volumen monteret til /erddapData ejes af en anden bruger/gruppe ID på dit værtslagersystem, ERDDAP vil gå ned på grund af tilladelse nægtede fejl. Indstilling af disse variable kræfter Tomcat til at køre med de matchende ID'er.

    :::tip tip tip tip
Find din bruger UID på serveren, hvor NFS mount er som denne: `id -u <your-user_name> ` . Dette vil returnere den numeriske værdi, du har brug for.
    :::

-  ** ERDDAP _baseUrl & ERDDAP _baseHttps Url** : Hvornår Hvornår skal man Hvornår ERDDAP I Kubernetes bag en tjeneste og en Ingresss mener Tomcat, at det tjener trafik på lokalehost:8080. Disse variable tilsidesætter ERDDAP 's interne URL-generation, så links (som dine brugerdefinerede logo eller datasæt links) korrekt løse dit offentligtvendte domænenavn.

:::Bemærk venligst at note
Hvis du kører separat Produktion og QA miljøer, være forsigtig med at dele en enkelt PVC. Ændre eller slette cached data i et miljø vil straks påvirke den anden. Vi administrerer dette ved hjælp af implementeringslejringer for QA og Production og tilføjer undermapper til hver overlejring. Dette giver os mulighed for at teste på QA med en QA-datasæt. XML, før du rører ved produktionsinstallationen.
:::
---

## 3. Netværk: Service og Ingress
Sådan udsætter du din ERDDAP pod til internettet, du har brug for en tjeneste til at dirigere intern klynge trafik, og en Ingresss for at binde den til et offentligt DNS-navn.

Opret en fil ved navn `Service.yaml` :
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

Opret en fil ved navn `I nærheden af ingresss.yaml` :
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
## 4. Håndtering af miljø med Kustomize
Som din implementering vokser, administrere individuelle YAML-filer til forskellige miljøer (f.eks. QA vs. Produktion) bliver fejl-prone. Kustomize giver dig mulighed for at definere en "Base" konfiguration og derefter anvende "Overlays" til at justere indstillinger for specifikke miljøer. I dit GitHub-lager, organisere filerne som følger:

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

Opret forbindelse `Beregning.yaml` fil for at indsamle alle ressourcer og kortlægge din brugerdefinerede opsætning og datasets XML-filer. Disse vil blive bestået til din ERDDAP Docker billede når du er indsat, så du kan style dit ERDDAP side og tilføj datasæt fra dit GitHub-lager, mens du lader `Billeder af kustomize` kort dem til din implementering.

#### Base base ( `base/kustomisering.yaml` ) 
Basiskaparering bundter simpelthen dine kerneressourcer delt på tværs af overlejringer. Vi holder produktionen ` datasets.xml ` og og og `opsætning.xml` i base og kun opdatere disse efter test på QA.

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
type: Kustomization
Navnrum: <your-erddap-namespace> 
ressourcer:
- .././base
- I nærheden af ingresss.yaml
configMapGenerator:
- navn: setup-xml
adfærd: erstatter # Denne tilsidesættelse vil bruge den lokale opsætningsfil med logolinket fra QA URL.
filer:
  - opsætning.xml
- navn: Datasets-xml
adfærd: erstatter # Denne tilsidesættelse vil bruge de lokale datasets xml til at opdatere datasets xml i QA-installationen.
filer:
  -  datasets.xml 
pletter:
- sti: implementering. yaml
NavnPrefix: qa-
etiketter:
- inkludereSelectorer: sande
par:
miljø: qa
```

And here's the corresponding Production `kustomization`:
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
type: Kustomization
Navnrum: <your-erddap-namespace> 
ressourcer:
- .././base
- I nærheden af ingresss.yaml
pletter:
- sti: implementering. yaml
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
