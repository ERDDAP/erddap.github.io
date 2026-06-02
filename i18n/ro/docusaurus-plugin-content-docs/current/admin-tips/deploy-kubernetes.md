# Cum să vă desfăşuraţi ERDDAP privind Kubernetes

Desfăşurarea ERDDAP pe Kubernetes oferă un mediu scalabil, rezistent pentru serverul de date. Acest ghid acoperă componentele esențiale necesare gazduirii ERDDAP utilizând standardul Kubernetes se manifestă, inclusiv gestionarea stocării persistente, implementarea aplicației, configurarea rețelelor și generarea de noi XML-uri de seturi de date direct din cadrul grupului.

## Precondiții
Înainte de a începe, asiguraţi-vă că aveţi:
- Un grup Kubernetes care rulează
-  `kubectl` instalat și configurat pentru a comunica cu grupul dumneavoastră
- Un furnizor de stocare capabil să creeze volume persistente (PV) 
- Al tău `setup.xml` şi ` datasets.xml ` gata să fie montate
-...

## 1. Păstrare persistentă (PVC) 
 ERDDAP necesită stocare persistentă pentru a menține fișiere cache, busteni, și starea pe pod reporniri. Utilizarea `VolumeClaim persistent`   (PVC) asigură că `Big ParentDirectory`   (unde ERDDAP stochează datele generate) nu este pierdut dacă o capsulă se duce în jos. Acest volum poate fi, de asemenea, legat de locația de stocare a datelor unde vor trăi fișierele de date brute.

Creează un fișier numit `pvc.yaml` așa:
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
 **Notã:** Furnizorul de stocare va trebui să stabilească cererea de volum pe grupul Kubernetes și să vă dea `clasă de stocareName` înainte de a vă putea conecta la ea.
:::

-...

## 2. ă ERDDAP Desfăşurare
Manifestul de desfășurare gestionează ERDDAP capsula în sine. Vă recomandăm să utilizați imaginea oficială erddap/erddap Docker cu suport pe termen lung.

:::info
Din 20 mai26, [v2. 30. 0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) a fost ultima versiune. Este înţelept să te reangajezi ocazional pentru a ţine pasul cu vulnerabilităţile de securitate.
:::

În această configurație, vom injecta variabile cheie de mediu pentru a gestiona setările fusului orar, asigurați-vă că Tomcat are permisiunile corecte de citire/scriere pentru volumul de stocare, și spune ERDDAP cum să rutați corect URL-uri atunci când stați în spatele unui Kubernetes Ingress. Am monta, de asemenea, PVC la `/erddapData`   (implicit `Big ParentDirectory` ) pentru injectare datasets.xml și configurare.xml în `/usr/local/tomcat/content/erddap` .

Creează un fișier numit `implementare. yaml` :

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
-  **TZ** : Setează fusul orar pentru serverul Tomcat și ERDDAP buşteni.

-  **TOMCAT_USER_ID & TOMCAT_GROUP_ID** : În mod implicit, ERDDAP Containerul rulează Tomcat ca un anumit utilizator. În cazul în care volumul persistent montat la /erddapData este deținută de un alt utilizator/grup ID pe sistemul de stocare gazdă, ERDDAP se va prăbuşi din cauza permisiunii de a refuza erorile. Setarea acestor variabile obligă Tomcat să ruleze cu ID-uri de potrivire.

    :::tip
Găsiți IUD-ul utilizatorului pe serverul unde mount-ul NFS este așa: `id-u <your-user_name> ` . Asta îţi va înapoia valoarea numerică de care ai nevoie.
    :::

-  ** ERDDAP _baseUrl & ERDDAP _baseHttps Url** : Când ERDDAP Rulează în Kubernetes în spatele unui Serviciu și o Ingress, Tomcat crede că este de servire trafic pe localhost:8080. Aceste variabile suprascrie ERDDAP Generarea internă a URL-ului, astfel încât link-urile (cum ar fi logo-ul personalizat sau link-uri de set de date) rezolva corect la numele de domeniu cu care se confruntă publicul.

:::nota
Dacă sunteți difuzate medii diferite de producție și QA, fiți precauți cu privire la partajarea unui singur PVC. Modificarea sau ștergerea datelor cache într-un mediu va afecta imediat celălalt. gestionăm acest lucru folosind straturi de implementare pentru QA și Producție și adăugând subdosare pentru fiecare suprapunere. Acest lucru ne permite să testăm QA cu un set de date QA. XML înainte de a atinge desfășurarea producției.
:::
---

## 3. Networking: Service and Ingress
Pentru a expune dvs. ERDDAP pod la web, aveți nevoie de un serviciu pentru a ruta traficul intern grup, și un Ingress să-l lega de un nume public DNS.

Creează un fișier numit `service.yaml` :
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

Creează un fișier numit `ingress.yaml` :
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
## 4. Gestionarea mediilor cu Kustomize
Pe măsură ce implementarea dumneavoastră crește, gestionarea de fișiere individuale YAML pentru diferite medii (De exemplu, QA vs. Producție) devine predispusă la erori. Kustomize vă permite să definiţi o configuraţie "Base" şi apoi să aplicaţi "Overlays" pentru a modifica setările pentru medii specifice. În depozitul GitHub, organizați fișierele după cum urmează:

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

Creează `kustomization.yaml` fișier pentru a colecta toate resursele și harta setările personalizate și seturile de date fișiere XML. Acestea vor fi trecut în dumneavoastră ERDDAP Docker imagine atunci când sunt implementate astfel încât să puteți stil ERDDAP pagină și adăugați seturi de date din depozitul GitHub în timp ce lăsați `kustomize` Hartă-le până la desfăşurarea ta.

#### Baza ( `bază/kustomization.yaml` ) 
Kustomizarea de bază pur și simplu grupează resursele de bază partajate pe suprafeţe. Păstrăm producţia. ` datasets.xml ` şi `setup.xml` în bază și actualizează acestea numai după testarea pe QA.

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
fel: Kustomizare
namespace: <your-erddap-namespace> 
resurse:
- .././bază
- ingress.yaml
configMapGenerator:
- Nume: setup-xml
comportament: înlocui # Această suprascriere va utiliza fișierul de configurare locală cu link-ul logo de la URL-ul QA.
fișiere:
  - setup.xml
- Denumire: seturi de date-xml
comportament: înlocui # Această suprascriere va utiliza seturi de date locale xml pentru a actualiza setările xml în implementarea QA.
fișiere:
  -  datasets.xml 
plasturi:
- calea: desfăşurare. yaml
namePrefix: qa-
etichete:
- include alegătorii: adevărat
perechi:
mediu: qa
```

And here's the corresponding Production `kustomization`:
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
fel: Kustomizare
namespace: <your-erddap-namespace> 
resurse:
- .././bază
- ingress.yaml
plasturi:
- calea: desfăşurare. yaml
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
