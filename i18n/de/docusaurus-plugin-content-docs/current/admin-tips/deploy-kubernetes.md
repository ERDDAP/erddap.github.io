# Wie man arbeitet ERDDAP auf Kubernetes

Bereitstellung ERDDAP auf Kubernetes bietet eine skalierbare, widerstandsfähige Umgebung für Ihren Datenserver. Diese Anleitung deckt die wesentlichen Komponenten ab, die für den Host erforderlich sind ERDDAP mit Standard Kubernetes manifestiert sich, einschließlich der Verwaltung der persistenten Speicherung, der Bereitstellung der Anwendung, der Konfiguration der Vernetzung und der Generierung neuer Datensatz-XMLs direkt aus dem Cluster.

## Voraussetzungen
Bevor Sie beginnen, stellen Sie sicher, dass Sie:
- Ein laufender Kubernetes-Cluster
-  `kubectl` installiert und konfiguriert, um mit Ihrem Cluster zu kommunizieren
- Ein Speicherbereiter, der in der Lage ist, dauerhafte Volumes zu erstellen (Solaranlagen) 
- Ihr `Setup.xml` und ` datasets.xml ` fertig montiert werden
----

## ANHANG Dauerhafter Speicher (PVC) 
 ERDDAP erfordert persistente Speicherung, um Cache-Dateien, Protokolle und Zustand über Pod-Neustarts zu halten. Verwendung einer `PersistentVolumeClaim`   (PVC) sorgt dafür, dass Sie `BigParentDirectory`   (wenn ERDDAP speichert die generierten Daten) ist nicht verloren, wenn ein Pod nach unten geht. Dieses Volumen kann auch mit Ihrem Datenspeicherort verbunden werden, wo die Rohdatendateien leben.

Erstellen einer Datei namens `pvc.yaml` wie so:
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

:::Spitze
 **Anmerkung:** Ihr Speicherbereiter muss den Volumenanspruch auf dem Kubernetes-Cluster einrichten und Ihnen die `SpeicherClassName` bevor Sie mit ihm verbinden können.
:::

---

## 2. Die ERDDAP Bereitstellung
Das Deployment Manifest verwaltet die ERDDAP sich selbst podieren. Wir empfehlen, das offizielle erdddap/erddap Docker-Bild mit langfristiger Unterstützung zu verwenden.

:::Informationen
Ab Mai 2026, [V2.30.0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) war die neueste Version. Es ist ratsam, gelegentlich wieder einzusetzen, um Sicherheitslücken zu halten.
:::

In dieser Konfiguration injizieren wir wichtige Umgebungsvariablen, um Zeitzoneneinstellungen zu handhaben, sicherzustellen, dass Tomcat die richtigen Lese- und Schreibgenehmigungen für das Speichervolumen hat und ERDDAP wie man URLs richtig leitet, wenn man hinter einem Kubernetes Ingress sitzt. Wir montieren auch das PVC auf `/erddapData`   (Der Standard `BigParentDirectory` ) um die datasets.xml und setup.xml in `/usr/local/tomcat/content/erddap` .

Erstellen einer Datei namens `Einsatz.yaml` :

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
-  **TZ** : Stellt die Zeitzone für den Tomcat Server fest und ERDDAP Logs.

-  **TOMCAT_USER_ID & TOMCAT_GROUP_ID** : Standardmäßig, die ERDDAP Container läuft Tomcat als ein bestimmter Benutzer. Wenn das an /erddapData montierte persistente Volumen einer anderen Benutzer-/Gruppen-ID auf Ihrem Host-Speichersystem gehört, ERDDAP wird durch die Erlaubnis verleugnet Fehler abstürzen. Die Einstellung dieser Variablen zwingt Tomcat, mit den passenden IDs zu laufen.

    :::Spitze
Finden Sie Ihren Benutzer UID auf dem Server, auf dem die NFS-Halterung so ist: `id -u <your-user_name> ` . Dies wird den numerischen Wert zurückgeben, den Sie benötigen.
    :::

-  ** ERDDAP _baseUrl & ERDDAP _baseHttps Url** : Wann ERDDAP läuft in Kubernetes hinter einem Service und einem Ingress, Tomcat denkt, es dient Verkehr auf localhost:8080. Diese Variablen überschreiben ERDDAP interne URL-Generierung, so dass Links (wie Ihr benutzerdefiniertes Logo oder Dataset Links) korrekt auf Ihren Public-Fernsehen-Domainnamen zu beheben.

:::Anmerkung
Wenn Sie separate Produktions- und QA-Umgebungen betreiben, sollten Sie vorsichtig sein, ein einzelnes PVC zu teilen. Das Ändern oder Löschen von geätzten Daten in einer Umgebung wird sofort das andere beeinflussen. Wir verwalten dies mit Bereitstellungs-Overlays für QA und Produktion und Hinzufügen von Unterordner für jede Overlay. Damit können wir auf QA mit einem QA-Datensatz testen. XML vor dem Berühren der Produktion.
:::
---

## 3. Vernetzung: Service und Ingress
Um Ihre ERDDAP pod to the web, Sie benötigen einen Dienst, um internen Cluster-Verkehr zu führen, und ein Ingress, um es an einen öffentlichen DNS-Namen zu binden.

Erstellen einer Datei namens `Service.yaml` :
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

Erstellen einer Datei namens `ingress.yaml` :
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
## 4. Umweltmanagement mit Kustomize
Wenn Ihr Einsatz wächst, verwalten Sie einzelne YAML-Dateien für verschiedene Umgebungen (z.B. QA vs. Produktion) wird fehleranfällig. Kustomize ermöglicht es Ihnen, eine "Base"-Konfiguration zu definieren und dann "Overlays" anzuwenden, um Einstellungen für bestimmte Umgebungen zu optimieren. In Ihrem GitHub-Repository organisieren Sie die Dateien wie folgt:

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

Erstellen Sie die `kustomization.yaml` Datei, um alle Ressourcen zu sammeln und Ihre benutzerdefinierte Einrichtung und Datensätze XML-Dateien zu erstellen. Diese werden in Ihre ERDDAP Docker-Bild bei der Bereitstellung, so können Sie Ihre ERDDAP Seite und Hinzufügen von Datensätzen aus Ihrem GitHub-Repository während der Vermietung `kustomize` sie zu Ihrem Einsatz abbilden.

#### Basis ( `base/kustomization.yaml` ) 
Die Basis-Kustomisierung bündelt einfach Ihre Kernressourcen, die über die Overlays geteilt werden. Wir halten die Produktion ` datasets.xml ` und `Setup.xml` in Basis und nur aktualisieren diese nach dem Testen auf QA.

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
Art: Kustomization
Namespace: <your-erddap-namespace> 
Ressourcen:
- .././base
- ingress.yaml
configMapGenerator:
- Name: Setup-xml
Verhalten: ersetzen # Dieses Überschreiben wird die lokale Setup-Datei mit dem Logo-Link aus der QA-URL verwenden.
Dateien:
  - Setup.xml
- Name: Datasets-xml
Verhalten: ersetzen # Dieses Überschreiben wird die lokalen Datensätze xml verwenden, um die Datensätze xml in der QA-Bereitstellung zu aktualisieren.
Dateien:
  -  datasets.xml 
Patches:
- Pfad: Bereitstellung. Yaml
NamePrefix: qa-
Etiketten:
- umfassenSelectors: true
Paare:
Umgebung: qa
```

And here's the corresponding Production `kustomization`:
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
Art: Kustomization
Namespace: <your-erddap-namespace> 
Ressourcen:
- .././base
- ingress.yaml
Patches:
- Pfad: Bereitstellung. Yaml
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
