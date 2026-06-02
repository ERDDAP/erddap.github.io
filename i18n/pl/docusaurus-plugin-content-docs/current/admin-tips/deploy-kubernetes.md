# Jak uruchomić ERDDAP na Kubernetes

Wprowadzanie ERDDAP na Kubernetes zapewnia skalowalne, odporne środowisko dla serwera danych. Niniejszy przewodnik obejmuje zasadnicze elementy wymagane do przechowywania ERDDAP przy użyciu normy Kubernetes manifestuje się, w tym zarządzanie trwałym magazynowaniem, rozmieszczanie aplikacji, konfiguracja sieci i generowanie nowego zbioru danych XML bezpośrednio z wewnątrz klastra.

## Warunki wstępne
Przed rozpoczęciem należy upewnić się, że:
- Uruchomiony klaster Kubernetes
-  `kubectl` zainstalowany i skonfigurowany do komunikacji z klastrem
- Zaopatrzenie w magazyny zdolne do tworzenia trwałych objętości (PVs) 
- Twój `setup.xml` oraz ` datasets.xml ` gotowe do zamontowania
-

## 1. Trwałe przechowywanie (PVC) 
 ERDDAP wymaga stałej pamięci masowej do utrzymywania plików pamięci podręcznej, dzienników i stanu w całym restarcie kapsuły. Stosowanie `PersistentVolumeClaim`   (PVC) zapewnia, że `bigParentDirectory`   (gdzie ERDDAP przechowuje wygenerowane dane) nie jest stracone, jeśli kapsuła spadnie. Ten wolumin może być również powiązany z miejscem przechowywania danych, w którym będą żyć pliki danych nieprzetworzonych.

Utwórz nazwany plik `pvc.yaml` tak:
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

:::końcówka
 **Uwaga:** Twój rezerwator pamięci będzie musiał skonfigurować prawo do głośności na klastrze Kubernetes i dać Ci `StorageClassName` zanim się z nim połączysz.
:::

-

## 2. W ERDDAP Wdrożenie
manifest wdrożeniowy zarządza ERDDAP Sam się poddam. Polecamy korzystanie z oficjalnego obrazu erddap / erddap Docker z długoterminowym wsparciem.

:::info
Od maja 2026 r. [v2.30.0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) była najnowszą wersją. Rozsądnie jest od czasu do czasu przeprowadzać relokację, aby nadążyć za słabościami w zakresie bezpieczeństwa.
:::

W tej konfiguracji wstrzykujemy kluczowe zmienne środowiskowe, aby obsługiwać ustawienia strefy czasowej, zapewnić Tomcat ma poprawne uprawnienia do odczytu / zapisu dla pojemności pamięci i powiedzieć ERDDAP jak prawidłowo śledzić adresy URL siedząc za Kubernetes Ingress. Montujemy również PVC do `/ erddapData`   (domyślny `bigParentDirectory` ) do wstrzyknięcia datasets.xml i setup.xml do `/ usr / local / tomcat / content / erddap` .

Utwórz nazwany plik `loyment.yaml` :

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
-  **TZ** : Ustawia strefę czasową serwera Tomcat i ERDDAP logi.

-  **TOMCAT _ USER _ ID & TOMCAT _ GROUP _ ID** : Domyślnie ERDDAP kontener obsługuje Tomcat jako konkretnego użytkownika. Jeżeli stała objętość zamontowana na / erddapData jest własnością innego identyfikatora użytkownika / grupy w systemie przechowywania danych hosta, ERDDAP będzie awarii z powodu odmowy zgody błędów. Ustawienie tych zmiennych zmusza Tomcata do działania z dopasowanymi identyfikatorami.

    :::końcówka
Znajdź swój UID użytkownika na serwerze, gdzie montuje NFS: `id-u <your-user_name> ` . Zwraca wartość liczbową, której potrzebujesz.
    :::

-  ** ERDDAP _ baseUrl ERDDAP _ baseHttps Url** : Kiedy ERDDAP działa w Kubernetes za Serwisem i Ingresu, Tomcat myśli, że obsługuje ruch na localhost: 8080. Zmienne te nadrzędne ERDDAP wewnętrzne generowanie URL tak, że linki (jak własne logo lub odnośniki do zbioru danych) poprawnie rozwiązać do nazwy domeny zwracającej się do opinii publicznej.

:::Uwaga
Jeśli prowadzisz oddzielną produkcję i środowiska QA, uważaj na dzielenie się pojedynczym PVC. Modyfikacja lub usunięcie danych buforowanych w jednym środowisku natychmiast wpłynie na inne. Zarządzamy tym za pomocą nakładek wdrożeniowych dla QA i Production oraz dodawania podfolderów dla każdej nakładki. Pozwala to na testowanie na QA za pomocą zbiorów danych QA. XML przed dotknięciem wdrożenia produkcji.
:::
---

## 3. Networking: Serwis i Ingress
Aby odsłonić swoje ERDDAP pod do sieci, potrzebujesz Service do trasy wewnętrznego ruchu klastrów, i Ingress, aby powiązać go z publiczną nazwą DNS.

Utwórz nazwany plik `service.yaml` :
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

Utwórz nazwany plik `ingress.yaml` :
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
## 4. Zarządzanie środowiskami z Kustomize
Wraz z rozwojem Twojego wdrożenia, zarządzanie poszczególnymi plikami YAML w różnych środowiskach (np., QA vs Produkcja) staje się błędna. Kustomize pozwala zdefiniować konfigurację "Base", a następnie zastosować "Overlays" do ustawień dostrojenia dla określonych środowisk. W repozytorium GitHub, organizuj pliki w następujący sposób:

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

Utwórz `kustomization.yaml` plik do zbierania wszystkich zasobów i mapowania własnych ustawień i zbiorów danych plików XML. Będą one przekazywane do ERDDAP Zdjęcie Docker po uruchomieniu, dzięki czemu można styl ERDDAP strona i dodawanie zbiorów danych z repozytorium GitHub `kustomize` Zidentyfikuj je do swojego rozmieszczenia.

#### Podstawa ( `Base / kustomization.yaml` ) 
Podstawy kustomizacji po prostu łączy swoje podstawowe zasoby dzielone przez nakłady. Utrzymujemy produkcję. ` datasets.xml ` oraz `setup.xml` w bazie i tylko uaktualnić je po testach na QA.

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
apiVersion: kustomize.config.k8s.io / v1beta1
Rodzaj: Kustomizacja
spacja nazw: <your-erddap-namespace> 
zasoby:
- .. /.. / baza
- ingress.yaml
ConfigMapGenerator:
- nazwa: setup- xml
zachowanie: zastąpić # To nadpisanie użyje lokalnego pliku konfiguracyjnego z linkiem logo z URL QA.
pliki:
  - setup.xml
- nazwa: datasets- xml
zachowanie: zastąpić # To nadpisanie użyje lokalnych zbiorów danych xml do aktualizacji zbiorów danych xml w wdrożeniu QA.
pliki:
  -  datasets.xml 
plastry:
- ścieżka: rozmieszczenie. yaml
Nazwa Prefix: q-
etykiety:
- includeSelectory: true
pary:
środowisko: qa
```

And here's the corresponding Production `kustomization`:
```yaml
apiVersion: kustomize.config.k8s.io / v1beta1
Rodzaj: Kustomizacja
spacja nazw: <your-erddap-namespace> 
zasoby:
- .. /.. / baza
- ingress.yaml
plastry:
- ścieżka: rozmieszczenie. yaml
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
