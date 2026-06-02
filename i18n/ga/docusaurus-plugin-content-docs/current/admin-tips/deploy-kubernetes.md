# Conas a Imlonnú ERDDAP ar Kubernets

Amharc ar gach eolas ERDDAP ar Kubernetes Soláthraíonn scalable, timpeallacht athléimneach do do fhreastalaí sonraí. Clúdaíonn an treoir seo na comhpháirteanna riachtanacha is gá a óstáil ERDDAP ag baint úsáide as caighdeán Taispeánann Kubernetes, lena n-áirítear stóráil leanúnach a bhainistiú, an t-iarratas a úsáid, líonrú a chumadh, agus XMLanna tacar sonraí nua a ghiniúint go díreach ó laistigh den chnuasach.

## Réamhriachtanas
Sula dtosaíonn tú, déan cinnte go bhfuil tú:
- Cnuasach Kubernets ag rith
-  `taiseachas aeir: fliuch` suiteáilte agus cumraithe chun cumarsáid a dhéanamh le do bhraisle
- Soláthróir stórála atá in ann Imleabhar Seasmhach a chruthú (PVs) 
- Do chuid oibre `crios fuar: aon sonraí` agus ` datasets.xml ` réidh le bheith suite
--

## 1. Stóráil Persistent (PVC PVC) 
 ERDDAP Éilíonn stóráil leanúnach a choimeád ar bun comhaid taisce, logs, agus stáit ar fud atosú pod. Ag baint úsáide as `Seirbhís do Chustaiméirí`   (PVC PVC) cinnte go bhfuil do `Treoir do Thuismitheoirí`   (i gcás ERDDAP siopaí a sonraí a ghintear) nach bhfuil caillte má théann pod síos. Is féidir an méid seo a nascadh freisin le do shuíomh stórála sonraí ina mbeidh na comhaid sonraí amh ina gcónaí.

Cruthaigh comhad ainmnithe `cineál gas: in airde` mar sin:
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

:::cineál gas: in airde
 **Tabhair faoi deara:** Ní mór do do sholáthróir stórála an t-éileamh toirte a bhunú ar bhraisle Kubernetes agus an t-éileamh a thabhairt duit `taiseachas aeir: fliuch` sular féidir leat ceangal leis.
:::

--

## 2. 2. 2. An bhfuil ERDDAP tréimhse saoil: ilbhliantúil
Bainistíonn an léiriú Imscaradh na ERDDAP pod féin. Molaimid ag baint úsáide as an erddap oifigiúil / erddap Docker íomhá le tacaíocht fadtéarmach.

:::info
Ó 2026 Bealtaine, [v2.30.0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) Bhí an leagan is déanaí. Tá sé ciallmhar ath-imlonnú ó am go chéile a choinneáil suas le le leochaileachtaí slándála.
:::

Sa chumraíocht, instealladh againn athróg timpeallacht eochair a láimhseáil suímh crios ama, a chinntiú go bhfuil Tomcat na ceadanna a léamh / scríobh ceart le haghaidh an toirt stórála, agus a insint ERDDAP conas URLanna bealach i gceart nuair a suí taobh thiar de Kubernetes Ingress. Táimid mount freisin ar an PVC a `Sonraí Táirge`   (taiseachas aeir: fliuch `Treoir do Thuismitheoirí` ) a instealladh an datasets.xml agus thus.xml isteach `/ úsáid tírdhreach: coimeádán, flowerbed, teorann` .

Cruthaigh comhad ainmnithe `imscaradh.yaml` :

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
-  **TZ** : Socraigh an t-amchrios don fhreastalaí Tomcat agus ERDDAP logs.

-  **TOMCAT_USER_ID &amp; TOMCAT_GROUP** : De réir réamhshocraithe, an ERDDAP Ritheann coimeádán Tomcat mar úsáideoir ar leith. Má tá an toirt leanúnach suite go /erddapData faoi úinéireacht ag úsáideoir / grúpa ID éagsúla ar do chóras stórála óstach, ERDDAP Beidh tuairteála mar gheall ar chead earráidí dhiúltú. Socrú na fórsaí athróg Tomcat a reáchtáil leis na IDs meaitseáil.

    :::cineál gas: in airde
Faigh do UID úsáideora ar an bhfreastalaí ina bhfuil an mount NFS mar seo: `Déan teagmháil linn <your-user_name> ` . Tabharfaidh sé seo ar ais an luach uimhriúil is gá duit.
    :::

-  ** ERDDAP Déan Teagmháil Linn ERDDAP Déan Teagmháil Linn irl - Library Service** : Nuair a bheidh ERDDAP Ritheann i Kubernetes taobh thiar de Seirbhís agus Ingress, Measann Tomcat go bhfuil sé ag freastal ar thrácht ar localhost:8080. Na override athróg ERDDAP 's ghlúin URL inmheánach ionas go naisc (cosúil le do lógó saincheaptha nó naisc tacar sonraí) réiteach i gceart le d'ainm fearainn poiblí-facing.

:::nóta nótaí
Má tá tú ag rith ar leith Táirgeadh agus timpeallachtaí QA, a bheith cúramach faoi roinnt PVC amháin. Beidh tionchar láithreach ag na sonraí atá i dtaisce i dtimpeallacht amháin a mhodhnú nó a scriosadh. Bainistímid é seo ag baint úsáide as overlays imscaradh do QA agus Táirgeadh agus fofhillteáin a chur le haghaidh gach forleagan. Ligeann sé seo dúinn tástáil a dhéanamh ar QA le tacair shonraí QA. XML roimh teagmháil a dhéanamh leis an imscaradh táirgthe.
:::
---

## 3. 3. 3. Líonrú: Seirbhís agus Ingress
A nochtadh do ERDDAP pod leis an ngréasán, is gá duit Seirbhís chun bealach tráchta braisle inmheánach, agus Ingress chun ceangal é a ainm DNS poiblí.

Cruthaigh comhad ainmnithe `service.yaml` :
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

Cruthaigh comhad ainmnithe `ingress.yaml` :
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
## 4. 4. 4. Bainistiú Timpeallachtaí le Kustomize
Mar a fhásann do imscaradh, a bhainistiú comhaid YAML aonair do thimpeallachtaí éagsúla (e.g., QA vs Táirgeadh) thiocfaidh chun bheith earráid-prone. Kustomize is féidir leat a shainmhíniú "Bás" chumraíocht agus ansin a chur i bhfeidhm "Overlays" chun suímh tweak do thimpeallachtaí ar leith. I do stór GitHub, eagrú na comhaid mar seo a leanas:

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

taiseachas aeir: fliuch `minicíocht uisce: flúirseach` comhad a bhailiú na hacmhainní agus léarscáil do thus saincheaptha agus datasets comhaid XML. Beidh siad a fháil ar aghaidh isteach i do ERDDAP Docker íomhá nuair a imscaradh ionas gur féidir leat stíl do ERDDAP leathanach agus tacair sonraí a chur ó do stór GitHub agus ligean `kustomize` léarscáil iad chuig do imscaradh.

#### Bonn bonn ( `bonn / struchtúrú.yaml` ) 
An kustomization bonn ach bundles do chuid acmhainní lárnacha roinnte ar fud an overlays. Coinnímid an táirgeadh ` datasets.xml ` agus `crios fuar: aon sonraí` i mbonn agus iad seo a nuashonrú ach amháin tar éis tástála ar QA.

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
cineál: Kustomization
ainmspás: <your-erddap-namespace> 
acmhainní:
- ../. Bunachar
- ingress.yaml
Comhghleacaí:
- cineál gas: in airde
iompar: in ionad # Bainfidh an iomarca seo úsáid as an gcomhad thus áitiúil leis an nasc lógó ón URL QA.
comhaid:
  - crios fuar: aon sonraí
- cineál gas: in airde
iompar: in ionad # Bainfidh an iomarca seo úsáid as na tacair sonraí áitiúla xml chun na tacair sonraí xml a nuashonrú in imscaradh QA.
comhaid:
  -  datasets.xml 
paistí:
- cosán: imscaradh. taiseachas aeir: fliuch
ainm Prefix: qa-
lipéid:
- Áirítear Selectors: fíor
péirí:
taiseachas aeir: fliuch
```

And here's the corresponding Production `kustomization`:
```yaml
apiVersion: kustomize.config.k8s.io / v1beta1
cineál: Kustomization
ainmspás: <your-erddap-namespace> 
acmhainní:
- ../. Bunachar
- ingress.yaml
paistí:
- cosán: imscaradh. taiseachas aeir: fliuch
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
