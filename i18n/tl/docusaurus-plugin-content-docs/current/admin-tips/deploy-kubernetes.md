# Kung Paano Lulubog ERDDAP sa Kubernetes

Pag - aalis ng Tubig ERDDAP sa Kubernetes ay naglalaan ng isang ligtas, matatag na kapaligiran para sa iyong data server. Saklaw ng giyang ito ang mahahalagang bahagi na kailangan upang maging punong - abala ERDDAP paggamit ng pamantayan Makikita ang mga bernete, pati na ang patuloy na pag - iimbak, paglalagay ng application, pag - aayos ng networking, at paggawa ng mga bagong dataset na XML mula mismo sa loob ng kumpol.

## Mga Prerequisite
Bago ka magsimula, tiyakin na mayroon ka:
- Isang tumatakbong kumpol ng Kubernetes
-  `cubectl` naka-install at nakaayos upang makipagtalastasan sa iyong cluster
- Isang imbakan na may kakayahang gumawa ng nagtatagal na mga Tomo (Mga PV) 
- Ang iyong sarili `setup.xml` at ` datasets.xml ` handa nang isakay
--

## 1. Patuloy na Paglitaw (PVC) 
 ERDDAP ay nangangailangan ng patuloy na pag - iimbak upang mapanatili ang mga salansan ng cache, troso, at estado sa ibayo ng mga pod restart. Paggamit ng isang `Patuloy na Pag - aasawa`   (PVC) ay tumitiyak na ang iyong `Malaking Direktoryo`   (kung saan ERDDAP nag - iimbak ng mga impormasyong gawa nito) ay hindi nawawala kapag bumaba ang isang bunga. Ang volume na ito ay maaari ring maiugnay sa iyong data storage na lokasyon kung saan ang mga hilaw na data files ay titira.

Gumawa ng talaksang may pangalan `pvc.yaml` tulad ng:
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
 **Pansinin:** Ang iyong tagapag - imbak ay mangangailangang mag - ipon ng laman sa kumpol ng Kubernetes at ibigay sa iyo ang laman nito `storyClassName` bago mo ito maiugnay.
:::

--

## 2. Ang ERDDAP Paglubog
Ang Deployment ang namamahala sa ERDDAP Ang bunga mismo. Iminumungkahi namin ang paggamit ng opisyal na larawang erddap/erddap Docker na may pangmatagalang suporta.

:::Pagkain
Noong Mayo 2026, [v2.30.0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) ang pinakabagong bersiyon. Isang katalinuhan na muling-deploy paminsan-minsan upang makasabay sa seguridad volnerability.
:::

Sa pagsasaayos na ito, aming itinuturok ang mga pangunahing variable na kapaligiran upang pangasiwaan ang mga timezone setting, tinitiyak na si Tomcat ay may tamang pagbasa/pagsusulat ng mga pahintulot para sa imbakan, at sabihin sa ERDDAP kung paano wastong mapapatakbo ang mga URL kapag nakaupo sa likod ng isang Kubernetes Ingres. Pinaakyat din namin ang PVC hanggang sa `/erddapData`   (ang default `Malaking Direktoryo` ) upang iturok ang datasets.xml at inilagay sa setup.xml `/usr/local/tomcat/content/erddap` .

Gumawa ng talaksang may pangalan `Paglalagay.yaml` :

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
-  **TZ** : Itakda ang timezone para sa Tomcat server at ERDDAP mga troso.

-  **TOMCAT_USTER_ID & TOMCAT_GROUP_ID** : Sa pamamagitan ng default, ang ERDDAP Ang container ay tumatakbo Tomcat bilang isang espesipikong gumagamit. Kung ang tuloy-tuloy na volume na inilagay sa /erddapData ay pag-aari ng ibang user/group ID sa inyong host storage system, ERDDAP ay babagsak dahil sa pagpapahintulot sa mga pagkakamali. Ang pagtatakda ng mga variable na ito ay pumupuwersa kay Tomcat na tumakbo kasama ang mga katambal na ID.

    :::tip
Hanapin ang inyong user UID sa server kung saan ganito ang NFS mount: `id -u <your-user_name> ` . Ibabalik nito ang halaga ng numero na kailangan mo.
    :::

-  ** ERDDAP _baseUrl & ERDDAP _BaseHtps Url** : Kailan ERDDAP ay tumatakbo sa Kubernetes sa likod ng isang Serbisyo at isang Inggress, sa tingin ni Tomcat ito ay naglilingkod sa trapiko sa lokal na holst:8080. Ang mga pagbabagong ito ay nangingibabaw ERDDAP 'di panloob na henerasyon ng URL kaya't nag-uugnay (tulad ng iyong logo ng kaugalian o mga link ng dataset) Hanggang sa pangalang public-facing domain.

:::pansinin
Kung ikaw ay nagpapatakbo ng hiwalay na Production at QA environments, maging maingat sa pagbabahagi ng isang PVC. Ang pag - aalis o pag - aalis ng nakuhang impormasyon sa isang kapaligiran ay agad na makaaapekto sa isa pa. Nagawa namin ito sa pamamagitan ng paglalagay ng mga sapin para sa QA at Production at pagdaragdag ng mga subfolder para sa bawat balot. Ito ay pumapayag sa amin na subukin ang QA sa pamamagitan ng isang QA datasets. XML bago hawakan ang produksyon.
:::
---

## 3. Networking: Paglilingkod at mga Inggles
Upang ilantad ang iyong sarili ERDDAP Pawang sa web, kailangan mo ng isang Serbisyo upang matahak ang internasyunal na cluster traffic, at isang Ingress upang itali ito sa isang pampublikong pangalan ng DNS.

Gumawa ng talaksang may pangalan `paglilingkod.` :
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

Gumawa ng talaksang may pangalan `ingress.yaml` :
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
## 4. Kumokontrol sa Kapaligiran sa Pamamagitan ng Kustomiks
Habang lumalaki ang iyong pangangailangan, ang namamahala sa indibiduwal na mga file ng YAML para sa iba't ibang kapaligiran (e.g., QA vs. Production) nagiging error-prone. Ang Kustomize ay nagpapahintulot sa iyo na bigyang kahulugan ang isang "Base" configuration at pagkatapos ay ikapit ang "Overlays" sa mga tweak setting para sa mga espesipikong kapaligiran. Sa inyong libingan sa GitHub, ayusin ang mga file na gaya ng sumusunod:

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

Gumawa ng `mustomisasyon.yaml` ng talaksan upang tipunin ang lahat ng yaman at i - map ang iyong custom setup at datasets XML files. Ang mga ito ay madadaanan mo ERDDAP docker image kapag naka - set upang mapaganda mo ang iyong hitsura ERDDAP pahina at magdagdag ng mga dataset mula sa iyong libingan ng GitHub habang hinahayaang ilagay `Kumbinasyon` ireserba ang mga ito sa iyong paghahanda.

#### Base ( `base/kustomisasyon.yaml` ) 
Ang base kustomization ay basta nagdudurulot sa iyong pangunahing yaman na ibinahagi sa ibayo ng mga balot. Iniingatan namin ang produksiyon ` datasets.xml ` at `setup.xml` sa base at ang mga ito ay updated lamang pagkatapos ng pagsubok sa QA.

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
ApiVersiyon: us.config.k8s.io/v1beta1
Uri: Kustomisasyon
Pangalangspace: <your-erddap-namespace> 
tinatangkilik:
- .././basse
- ingress.yaml
Tagapagpaganap:
- Pangalan: setup-xml
pag - uugali: Palitan ang # Ang surpasiyong ito ay gagamit ng lokal na setup file na may logo link mula sa QA URL.
mga talaksan:
  - setup.xml
- Pangalan: datasets-xml
pag - uugali: Palitan ang # Ang surpasiyong ito ay gagamit ng mga lokal na dataset na xml upang i-update ang mga dataset na xml sa produksyon ng QA.
mga talaksan:
  -  datasets.xml 
mga patse:
- Path: pagpopondo. Pakulubot
Pangalang Panlapi: qa-
Pangalan:
- ay kinabibilangan ng mga skektor: totoo
pares:
kapaligiran: qa
```

And here's the corresponding Production `kustomization`:
```yaml
ApiVersiyon: us.config.k8s.io/v1beta1
Uri: Kustomisasyon
Pangalangspace: <your-erddap-namespace> 
tinatangkilik:
- .././basse
- ingress.yaml
mga patse:
- Path: pagpopondo. Pakulubot
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
