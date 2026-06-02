# Jak nasadit ERDDAP na Kubernetech

Nasazení ERDDAP na Kubernetech poskytuje škálovatelné a odolné prostředí pro váš datový server. Tato příručka pokrývá základní složky potřebné k hostiteli ERDDAP použití normy Kubernety se manifestují, včetně správy trvalého úložiště, nasazení aplikace, konfigurace sítě a generování nových dat XML přímo v rámci clusteru.

## Předpoklady
Než začnete, ujistěte se, že:
- Běžící Kubernety
-  `kubectl` nainstalována a nakonfigurována pro komunikaci s vaším clusterem
- Skladovací zařízení schopné vytvářet trvalé objemy (PV) 
- Vaše `setup.xml` a ` datasets.xml ` připraven k montáži
-----

## 1. Trvalé skladování (PVC) 
 ERDDAP vyžaduje trvalé ukládání pro udržení cache souborů, protokoly, a stav v celém modulu restartuje. Použití `PersistentníVolumeClaim`   (PVC) zajistí, že Váš `velkýRodič rodičů`   (kde ERDDAP ukládá své generované údaje) se neztratí, když se potopí modul. Tento objem lze také spojit s místem uložení dat, kde budou žít soubory se surovými daty.

Vytvořit soubor s názvem `pvc.yaml` Takhle:
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
 **Poznámka:** Váš poskytovatel úložiště bude muset nastavit objem nárok na Kubernetes cluster a dát vám `StorageClassName` než se k němu můžeš připojit.
:::

----

## 2. The ERDDAP Nasazení
manifest nasazení řídí ERDDAP Pod sám. Doporučujeme použít oficiální erddap/erddap Docker obrázek s dlouhodobou podporou.

:::Informace
Od května 2026 [v2. 30. 0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) byla poslední verze. Je moudré občas se přemístit, aby se udržely bezpečnostní slabiny.
:::

V této konfiguraci vstřikujeme klíčové proměnné prostředí, abychom zvládli nastavení časového pásma, zajistíme, aby měl Tomcat správná oprávnění ke čtení/zapsání pro objem úložiště, a řekneme ERDDAP jak správně směrovat URL při sezení za Kubernetes Ingress. Také namontujeme PVC na `/erddapData`   (výchozí `velkýRodič rodičů` ) k aplikaci injekce datasets.xml a nastavení.xml do `/usr/local/tomcat/content/erddap` .

Vytvořit soubor s názvem `nasazení.yaml` :

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
-  **TZ** : Nastavuje časové pásmo pro server Tomcat a ERDDAP záznamy.

-  **TOMCAT_USER_ID & TOMCAT_GROUP_ID** : Ve výchozím nastavení ERDDAP kontejner provozuje Tomcat jako specifický uživatel. Pokud je trvalý objem nainstalovaný do /erddapData vlastněn jiným uživatelským/skupinovým ID na vašem hostitelském úložišti, ERDDAP bude havarovat kvůli povolení odmítnutých chyb. Nastavení těchto proměnných nutí Tomcat běžet s odpovídajícími ID.

    :::tip
Najděte uživatele UID na serveru, kde je mount NFS takto: `id - u <your-user_name> ` . To vám vrátí číselnou hodnotu, kterou potřebujete.
    :::

-  ** ERDDAP _baseUrl & ERDDAP _baseHttps Url** : Kdy? ERDDAP běží v Kubernetech za službou a Ingress, Tomcat si myslí, že slouží provoz na localhost:8080. Tyto proměnné přepsat ERDDAP 's interní generování URL tak, aby odkazy (jako vaše vlastní logo nebo datové odkazy) správně se rozhodnete pro své veřejné jméno domény.

:::poznámka
Pokud provozujete samostatné výrobní a QA prostředí, buďte opatrní při sdílení jediného PVC. Modifikace nebo mazání cachovaných dat v jednom prostředí okamžitě ovlivní to druhé. Zvládáme to pomocí překryvů pro QA a Production a přidávání podsložek pro každý překryv. To nám umožňuje testovat QA s QA soubory. XML před dotykem s nasazením výroby.
:::
---

## 3. Síť: služba a ingres
Odhalit váš ERDDAP Pod na webu, budete potřebovat službu pro trasu vnitřní cluster provozu, a Ingress, aby se váže k veřejné DNS jméno.

Vytvořit soubor s názvem `service.yaml` :
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

Vytvořit soubor s názvem `ingress.yaml` :
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
## 4. Správa prostředí s Kustomizou
Jak vaše nasazení roste, správa jednotlivých souborů YAML pro různá prostředí (např. QA vs. výroba) se stává chybovým pronem. Kustomize umožňuje definovat konfiguraci "Base" a pak použít "Overlays" pro vylepšení nastavení pro konkrétní prostředí. V repozitáři GitHub organizujte tyto soubory takto:

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

Vytvořit `kustomization.yaml` soubor pro shromažďování všech zdrojů a mapování vlastních nastavení a souborů XML souborů. Tyhle přejdou do vaší ERDDAP Docker image při nasazení, takže můžete styl své ERDDAP záložka a přidání souborů dat z vašeho úložiště GitHub a zároveň `kustomize` zmapujte je k vašemu nasazení.

#### Základna ( `base/kustomization.yaml` ) 
Základní kustomizace jednoduše svazuje vaše základní zdroje sdílené přes překryvy. Udržujeme produkci. ` datasets.xml ` a `setup.xml` na základně a pouze aktualizovat po testování na QA.

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
apiVerze: kustomize.config.k8s.io/v1beta1
druh: Kustomizace
namespace: <your-erddap-namespace> 
zdroje:
- ../../base
- ingress.yaml
konfigurMapGenerator:
- název: setup-xml
chování: nahradit # Toto ovládání použije místní soubor nastavení s logem odkaz z QA URL.
Soubory:
  - setup.xml
- název: datové soubory-xml
chování: nahradit # Toto ovládání použije lokální soubory dat xml k aktualizaci souborů xml v nasazení QA.
Soubory:
  -  datasets.xml 
náplasti:
- cesta: nasazení. Yaml
namePrefix: qa-
etikety:
- zahrnují výběrčí: true
páry:
prostředí: qa
```

And here's the corresponding Production `kustomization`:
```yaml
apiVerze: kustomize.config.k8s.io/v1beta1
druh: Kustomizace
namespace: <your-erddap-namespace> 
zdroje:
- ../../base
- ingress.yaml
náplasti:
- cesta: nasazení. Yaml
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
