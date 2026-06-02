# Hur man distribuerar ERDDAP på Kubernetes

Utplacering ERDDAP på Kubernetes ger en skalbar, motståndskraftig miljö för din dataserver. Denna guide täcker de väsentliga komponenter som krävs för att vara värd ERDDAP Använda standard Kubernetes manifesterar, inklusive hantering av ihållande lagring, distribuera programmet, konfigurera nätverk och generera nya dataset XML direkt från klustret.

## Förutsättningar
Innan du börjar, se till att du har:
- En löpande Kubernetes kluster
-  `Kubectl` installerad och konfigurerad för att kommunicera med ditt kluster
- En lagringsleverantör som kan skapa bestående volymer (PV) 
- Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Dina Din Din Dina Dina Dina Dina Dina Dina Dina Dina Dina Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din Din `setup.xml` och ` datasets.xml ` redo att monteras
--------

## 1. Persistent lagring (PVC) 
 ERDDAP kräver ihållande lagring för att upprätthålla cachefiler, loggar och statliga över pod-omstarter. Använda en `PersistentVolumeClaim`   (PVC) säkerställer att din `bigParentDirectory`   (där var ERDDAP lagrar sin genererade data) är inte förlorad om en pod går ner. Denna volym kan också kopplas till din datalagringsplats där rådatafilerna kommer att leva.

Skapa en fil som heter `Pvc.yaml` Som så:
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

:::Tips
 **Notera:** Din lagringsleverantör måste ställa in volymkravet på Kubernetes-klustret och ge dig `FörlagClassName` innan du kan ansluta till den.
:::

-------

## 2. och ERDDAP Utplacering
Utplaceringsmanifestet hanterar ERDDAP Pod själv. Vi rekommenderar att du använder den officiella erddap/erddap Docker-bilden med långsiktigt stöd.

:::info info info
i maj 2026, [v2.30.0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) var den senaste versionen. Det är klokt att omplacera ibland för att hålla jämna steg med säkerhetsproblem.
:::

I denna konfiguration injicerar vi viktiga miljövariabler för att hantera tidszoninställningar, se till att Tomcat har rätt läs- / skrivbehörigheter för lagringsvolymen och berätta ERDDAP Hur man korrekt dirigerar webbadresser när man sitter bakom en Kubernetes Ingress Vi monterar också PVC till `/erddapData`   (Default `bigParentDirectory` ) att injicera datasets.xml och setup.xml in `/usr/local/tomcat/content/erddap` .

Skapa en fil som heter `Utplacering.yaml` Från:

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
-  **TZ** Från: Anger tidszonen för Tomcat-servern och ERDDAP loggar.

-  **TOMCAT_USER_ID och TOMCAT_GROUP_ID** Från: Som standard, ERDDAP container kör Tomcat som en specifik användare. Om den ihållande volymen monterad till /erddapData ägs av ett annat användar-/grupp-ID på ditt värdlagringssystem, ERDDAP kommer att krascha på grund av tillåtelse nekade fel. Att ställa in dessa variabler tvingar Tomcat att köra med matchande ID.

    :::Tips
Hitta användaren UID på servern där NFS-fästet är så här: `Id -u <your-user_name> ` . Detta kommer att returnera det numeriska värde du behöver.
    :::

-  ** ERDDAP _baseUrl & ERDDAP _baseHttps Url** Från: När när ERDDAP springer i Kubernetes bakom en tjänst och en ingress, Tomcat tror att det tjänar trafik på localhost:8080. Dessa variabler åsidosätter ERDDAP intern URL-generering så att länkar (som din anpassade logotyp eller dataset länkar) Rätt besluta om ditt domännamn för allmänheten.

:::Note
Om du kör separata produktions- och QA-miljöer, var försiktig med att dela en enda PVC. Ändra eller ta bort cachade data i en miljö kommer omedelbart att påverka den andra. Vi hanterar detta med hjälp av distributionsöverlägg för QA och produktion och lägger till undermappar för varje överlag. Detta gör att vi kan testa på QA med en QA-dataset. XML före beröring av produktionsutplaceringen.
:::
---

## 3. Nätverk: Service och Ingress
Att avslöja din ERDDAP pod till webben, du behöver en tjänst för att dirigera intern klustertrafik, och en ingress för att binda den till ett offentligt DNS-namn.

Skapa en fil som heter `service.yaml` Från:
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

Skapa en fil som heter `Ingress.yaml` Från:
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
## 4. Hantera miljöer med Kustomize
När din utplacering växer, hantera enskilda YAML-filer för olika miljöer (QA vs Produktion) Blir felbenägen. Kustomize låter dig definiera en "Base" konfiguration och sedan tillämpa "Overlays" för att justera inställningar för specifika miljöer. I ditt GitHub-förvar organiserar du filerna enligt följande:

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

Skapa `Kollektivisering.yaml` fil för att samla alla resurser och kartlägga din anpassade inställning och datamängder XML-filer. Dessa kommer att passeras in i din ERDDAP Docker bild när den distribueras så att du kan stil din ERDDAP sida och lägga till datamängder från ditt GitHub-förvar medan du låter `Kollektiv` kartlägga dem till din distribution.

#### Base ( `Bas/kustomization.yaml` ) 
Basen kustomization buntar helt enkelt dina kärnresurser som delas över överlagorna. Vi håller produktionen ` datasets.xml ` och `setup.xml` i basen och bara uppdatera dessa efter testning på QA.

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
Typ: Kustomisering
Namnspace: <your-erddap-namespace> 
resurser:
- ../../base
- Ingress.yaml
ConfigMapGenerator:
- Namn: setup-xml
beteende: ersätta ## Denna överridning kommer att använda den lokala inställningsfilen med logo länken från QA-URL.
filer:
  - setup.xml
- Namn: Datasets-xml
beteende: ersätta ## Denna överridning kommer att använda de lokala datamängderna xml för att uppdatera datamängderna xml i QA-utplaceringen.
filer:
  -  datasets.xml 
fläckar:
- Vägen: Utplacering. Yaml
NamnPrefix: Qa-
etiketter:
- inkludera väljare: sant
par:
miljö: qa
```

And here's the corresponding Production `kustomization`:
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
Typ: Kustomisering
Namnspace: <your-erddap-namespace> 
resurser:
- ../../base
- Ingress.yaml
fläckar:
- Vägen: Utplacering. Yaml
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
