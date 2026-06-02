# Hogyan telepítsünk ERDDAP Kubernetes

telepítés ERDDAP A Kubernetes skálázható, ellenálló környezetet biztosít az adatkiszolgáló számára. Ez az útmutató lefedi a fogadóhoz szükséges alapvető összetevőket ERDDAP szabvány használata A Kubernetes megnyilvánul, beleértve a tartós tárolást, az alkalmazás telepítését, a hálózatépítést és az új adatkészletek létrehozását közvetlenül a klaszteren belül.

## Előfeltételek
Mielőtt elkezdené, biztosítsa, hogy:
- Egy futó Kubernetes klaszter
-  `Kubectl` telepítve és konfigurálva kommunikálni a klaszterével
- A tartós volumen létrehozására alkalmas tároló szolgáltató (PV-k) 
- A `setup.xml` és ` datasets.xml ` készen áll arra, hogy felszereljék
-----

## 1. Állandó tárolás (PVC) 
 ERDDAP tartós tárolást igényel a cache fájlok, a logok és az állam fenntartásához a pod újraindításokon keresztül. Használjon egy `PersistentVolumeClaim`   (PVC) biztosítja, hogy a te `bigParentDirectory[szerkesztés]`   (ahol ERDDAP tárolja generált adatait) nem veszítik el, ha egy pod lemegy. Ez a mennyiség kapcsolódhat az adattároló helyéhez is, ahol a nyers adatfájlok élnek.

Készítsen egy fájlt neve `pvc.yaml` mint így:
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

:::Tippek
 **Megjegyzés:** A tároló szolgáltatónak be kell hoznia a Kubernetes klaszterre vonatkozó mennyiségi követelést, és meg kell adnia a `tárolóClassName` mielőtt kapcsolatba léphetsz vele.
:::

----

## 2. 2. 2. A ERDDAP Telepítés
A telepítés manifesztálja a ERDDAP pod maga. Javasoljuk a hivatalos erddap / erddap Docker kép használatát hosszú távú támogatással.

:::Info
2026 májusától, [v2.30.0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) volt a legújabb verzió. Bölcs dolog alkalmanként újratelepíteni a biztonsági sebezhetőségeket.
:::

Ebben a konfigurációban a kulcsfontosságú környezeti változókat az időzóna beállításainak kezelésére injektáljuk, biztosítva, hogy a Tomcat rendelkezik a megfelelő olvasási / írási engedélyekkel a tárolási volumenhez, és elmondja ERDDAP hogyan kell megfelelően útvonalazni az URL-eket egy Kubernetes Ingress mögött. A PVC-t is felszereljük `/erddapData`   (az alapértelmezett `bigParentDirectory[szerkesztés]` ) injekcióba datasets.xml and setup.xml into `/usr/local/tomcat/content/erddap` ...

Készítsen egy fájlt neve `telepítés.yaml` :

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
-  **TZ** : Beállítja az időzónát a Tomcat szervernek és ERDDAP logok.

-  **TOMCAT_USER_ID & TOMCAT_GROUP_ID** : Alapértelmezéssel, ERDDAP konténer fut Tomcat, mint egy adott felhasználó. Ha a /erddapData-hoz felszerelt tartós kötet egy másik felhasználó/csoportos azonosító tulajdonában van a tárhelyrendszerén, ERDDAP összeomlik az engedély megtagadott hibái miatt. Ezeknek a változóknak a beállítása Tomcat a megfelelő azonosítókkal fut.

    :::Tippek
Keresse meg az UID felhasználóját a szerveren, ahol az NFS-hegy ilyen: `id -u <your-user_name> ` ... Ez visszaadja a szükséges számértéket.
    :::

-  ** ERDDAP _baseUrl & ERDDAP _baseHttps Url** : Mikor ERDDAP fut Kubernetes mögött egy Szolgáltatás és egy Ingress, Tomcat úgy gondolja, hogy ez szolgálja a forgalom a helyi:8080. Ezek a változók felülírják ERDDAP Belső URL-generáció, így linkek (mint az Ön egyedi logója vagy adatkészlet linkjei) helyesen oldja meg a nyilvánosan néző domain nevét.

:::Megjegyzés
Ha külön termelési és QA környezetet futtat, óvatos legyen az egyetlen PVC megosztása. A sütött adatok egy környezetben történő módosítása vagy törlése azonnal hatással lesz a másikra. Ezt a telepítési átfedések alkalmazásával kezeljük a QA-t és a termelést, és minden átfedéshez alkatrészeket adunk hozzá. Ez lehetővé teszi számunkra, hogy teszteljük a QA-t egy QA adatkészlettel. XML, mielőtt megérinti a termelési telepítést.
:::
---

## 3. 3. 3. Hálózat: Szolgáltatás és Ingress
Lásd ki ERDDAP pod az internetre, szüksége van egy Szolgáltatásra, hogy belső klaszterforgalmat irányítson, és egy Ingress csatlakoztassa a nyilvános DNS-nevhez.

Készítsen egy fájlt neve `Szolgáltatás.yaml` :
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

Készítsen egy fájlt neve `ingress.yaml` :
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
## 4. 4. Környezetek kezelése Kustomize-val
Ahogy a telepítés növekszik, kezeli az egyes YAML fájlokat különböző környezetekben (pl. QA vs. Production) hiba-prone. A Kustomize lehetővé teszi, hogy meghatározza a "Base" konfigurációt, majd alkalmazza az "Overlays"-t, hogy tweak beállításokat tegyen specifikus környezetekhez. A GitHub repository, szervezze a fájlokat a következőképpen:

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

Hozzon létre `kustomization.yaml` fájl gyűjteni az összes erőforrást, és térképezze fel a szokásos telepítési és adatkészletek XML fájlokat. Ezek áthaladnak a tiédbe ERDDAP Docker kép, amikor telepítve van, így stílusban lehet ERDDAP oldal és adjon hozzá adatkészleteket a GitHub repository-ból, miközben hagyja `kustomize` térképezze őket a telepítéshez.

#### Alap ( `alap/kustomization.yaml` ) 
A bázis kustomizáció egyszerűen megfosztja az alapvető erőforrásait a tétek során. Megtartjuk a termelést ` datasets.xml ` és `setup.xml` bázisban és csak frissítse ezeket a QA tesztelése után.

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
kedves: Kustomization
névtér: <your-erddap-namespace> 
források:
- ../..
- ingress.yaml
ConigMapGenerator:
- név: setup-xml
viselkedés: helyettesítse # Ez a túllépés a helyi beállítási fájlt a QA URL logó linkjével fogja használni.
fájlok:
  - setup.xml
- név: datasets-xml
viselkedés: helyettesítse # Ez a túllépés a helyi adatkészleteket xml-t fogja használni a QA telepítésben lévő adatkészletek frissítésére.
fájlok:
  -  datasets.xml 
Foltok:
- út: telepítés. yaml
NamePrefix: Qa-
címkék:
- Telepítők: igaz
párok:
környezet: Qa
```

And here's the corresponding Production `kustomization`:
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kedves: Kustomization
névtér: <your-erddap-namespace> 
források:
- ../..
- ingress.yaml
Foltok:
- út: telepítés. yaml
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
