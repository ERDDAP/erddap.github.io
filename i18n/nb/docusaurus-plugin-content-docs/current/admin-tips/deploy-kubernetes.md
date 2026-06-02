# Hvordan å deploy ERDDAP på Kubernetes

Deploying ERDDAP Kubernetes gir et skalerbart og robust miljø for dataserveren din. Denne guiden dekker essensielle komponenter som kreves for å være vert. ERDDAP bruker standard Kubernetes manifesterer, inkludert å administrere vedvarende lagring, distribuere programmet, konfigurere nettverk og generere nye datasett XML direkte fra inne i klyngen.

## Forutsetninger
Før du begynner, sørg for at du har:
- En løpende Kubernetes klynge
-  `kubectl` installert og konfigurert for å kommunisere med klyngen din
- En lagerleverandør som kan skape vedvarende volum (PVs) 
- Din `config.xml` og ` datasets.xml ` Klar til å bli montert
-----

## 1. Vedvarende lagring (PVC) 
 ERDDAP krever vedvarende lagring for å opprettholde cache-filer, logger og tilstand over pod starter på nytt. Bruker en `PersistentVolumeClaim`   (PVC) sikrer at din `bigParentDirectory`   (hvor ERDDAP lagrer sine genererte data) Er ikke tapt hvis en pod går ned. Dette volumet kan også kobles til datalagringsstedet der rådatafilene vil bo.

Opprett en fil som heter `pvc.yaml` Som så:
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
 **Merk:** Din lagerleverandør må sette opp volumet krav på Kubernetes-hopen og gi deg den `lagerklasseName` Før du kan koble til det.
:::

----

## 2. Den ERDDAP Deployment
Deployment manifestet håndterer ERDDAP Selve pod. Vi anbefaler å bruke det offisielle Erddap/erddap Docker-bildet med langsiktig støtte.

:::info
Fra mai 2026, [v2.30.0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) Den siste versjonen. Det er klokt å gjenoppta tidvis å holde tritt med sikkerhetsproblem.
:::

I denne konfigurasjonen injiserer vi viktige miljøvariabler for å håndtere tidssoneinnstillinger, sikre at Tomcat har riktig lese-/skrive-løyve for lagringsvolumet, og fortel ERDDAP Hvordan rute URLs riktig når du sitter bak en Kubernetes Ingress. Vi monterer også PVC til `/erddapData`   (standard `bigParentDirectory` ) å injisere datasets.xml og oppsett.xml i `/usr/lokal/tomcat/innhold/erddap` ..

Opprett en fil som heter `implementation.yaml` :)

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
-  **TZ** :) Stiller tidssone for Tomcat-serveren og ERDDAP Logger.

-  **TOMCAT_USER_ID & TOMCAT_GROUP_ID** :) Som standard er ERDDAP container kjører Tomcat som en bestemt bruker. Hvis det vedvarende volumet montert til /erddapData eies av en annen bruker/gruppe-ID på vertslagringssystemet ditt, ERDDAP vil krasje på grunn av tillatelse nektet feil. Setting av disse variablene tvinger Tomcat til å kjøre med de matchende ID-ene.

    :::tip
Finn brukerens UID på serveren der NFS-monteringen er slik: `id-u <your-user_name> ` .. Dette vil returnere den numeriske verdien du trenger.
    :::

-  ** ERDDAP _BaseUrl & ERDDAP _BaseHttps Url** :) Når ERDDAP kjører i Kubernetes bak en tjeneste og en ingresjon, Tomcat mener det betjener trafikk på lokalhost:8080. Disse variablene overstyrer ERDDAP intern URL-produksjon slik at lenker (som din egendefinerte logo eller datasett lenker) Løs riktig til ditt domenenavn.

:::Note
Hvis du kjører separate produksjons- og QA-miljøer, vær forsiktig med å dele en enkelt PVC. Å endre eller slette cachede data i ett miljø vil umiddelbart påvirke den andre. Vi administrerer dette ved hjelp av distribusjonsoverlegg for QA og produksjon og legger til undermapper for hvert overlegg. Dette gjør det mulig å teste QA med QA-datasett. XML før du berører produksjonen.
:::
---

## 3. Nettverk: Service og ingresjon
Å avsløre din ERDDAP pod til nettet, trenger du en tjeneste for å rute intern cluster trafikk, og en Ingress for å binde det til et offentlig DNS-navn.

Opprett en fil som heter `service.yaml` :)
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

Opprett en fil som heter `Ingress.yaml` :)
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
## 4. Administrere miljøer med Kustomize
Når din distribusjon vokser, administrerer individuelle YAML-filer for ulike miljøer (f.eks. QA vs. produksjon) blir feilprone. Kustomize lar deg definere en "Base" konfigurasjon og deretter bruke " Overlays" for å justere innstillingene for bestemte miljøer. I GitHub-arkivet, organisere filene som følger:

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

Opprette `kustomization.yaml` fil å samle alle ressursene og kartlegge ditt egendefinerte oppsett og datasett XML-filer. Disse vil bli passert inn i din ERDDAP Docker bilde når implementert slik at du kan stile din ERDDAP side og legg til datasett fra GitHub-arkivet mens du lar `Kustomize` Kartlegg dem til din distribusjon.

#### Base ( `base/kustomization.yaml` ) 
Basekustomisering bare pakker kjerneressursene dine som deles over lag. Vi beholder produksjonen ` datasets.xml ` og `config.xml` i base og bare oppdater disse etter testing på QA.

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
navnerom: <your-erddap-namespace> 
ressurser:
- ../../base
- Ingress.yaml
konfigureringskartGenerator:
- navn: setup-xml
atferd: erstatte # Denne overstyringen vil bruke den lokale oppsettsfilen med logolenken fra QA-adressen.
filer:
  - config.xml
- navn: datasett-xml
atferd: erstatte # Denne overstyringen vil bruke de lokale datasettene xml til å oppdatere datasettene xml i QA-utføringen.
filer:
  -  datasets.xml 
flekker:
- bane: distribusjon. yaml
namePrefix: qa-
etiketter:
- blant andre velgere: sant
par:
miljø: qa
```

And here's the corresponding Production `kustomization`:
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
type: Kustomization
navnerom: <your-erddap-namespace> 
ressurser:
- ../../base
- Ingress.yaml
flekker:
- bane: distribusjon. yaml
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
