# 如何部署 ERDDAP 在 Kubernetes 上

部署 ERDDAP 在 Kubernetes 上, 您的數據伺服器提供了可縮放的、有弹性的環境 。 本指南涵盖主机所需的基本部件。 ERDDAP 使用標準 Kubernetes 顯示, 包括管理持續儲存, 部署應用程式, 配置網路, 直接從群組內產生新的數據集 XML 。

## 先决条件
在你開始之前,一定要有:
- 正在运行的 Kubernetes 群組
-  `ku` 安裝和配置以與您的群組通訊
- 能夠建立持久性音量的儲存提供器 (逐) 
- 你的 `設定. xml` 和 ` datasets.xml ` 準備上載
- --

## 1. 永久儲存 (聚氯乙烯) 
 ERDDAP 需要持續儲存以維持快取檔案、紀錄, 并狀態跨越 cock 重启 。 使用a `持久性要求`   (聚氯乙烯) 确保您 `大家长會`   (在哪里 ERDDAP 儲存其產生的資料) 如果吊艙掉下來, 不會失去。 此音量也可以連結到您的資料儲存位置 。

建立名为檔案 `pvc.yaml (日文)` 像這樣:
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

:::提示
 **注:** 您的庫藏供應商需要建立 Kubernetes 群組的數量申請 并給你 `儲存層Name` 在你連接它之前
:::

- - - -

## 2. 其 ERDDAP 部署
部署表管理 ERDDAP 躲起來 我們建議使用官方的 erddap/erddap Docker 影像,

:::信息
截至2026年5月, [v2.30.0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) 是最新版本。 偶爾重新部署是明智的,
:::

在此設定中, 我們插入關鍵環境變數來處理時區設定, 確保Tomcat有正確的讀/ 寫儲存音量的權限, 並告知 ERDDAP 坐在 Kubernetes 入侵 后面時如何正确路徑 URL 。 我們把聚氯乙烯升到 `/ erddapData 資料`   (默认 `大家长會` ) 插入 datasets.xml 设置. xml 成 `/usr/ 本地/tomcat/內容/erddap` .

建立名为檔案 `已部署。` :

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
-  **TZ** : 設定Tomcat 伺服器的時區, ERDDAP 木

-  **TOMCAT_USER_ID & TOMCAT_GROUP_ID** : 默认, ERDDAP 容器以特定使用者的身份運行 。 如果挂載到( erddapData) 的持續音量是由您主機儲存系統上不同的使用者/ 群組 ID 擁有的, ERDDAP 會因為被拒絕的權限而崩溃 。 設定這些變數迫使 Tomcat 用匹配的ID 執行 。

    :::提示
在 NFS 挂载的伺服器上找到您的使用者 UID : `id - u <your-user_name> ` . 這會傳回您需要的數值 。
    :::

-  ** ERDDAP 基底Url( B) ERDDAP 基数(_B) 網址** : 什麼時候 ERDDAP Tomcat認為它提供交通服務, 這些變數覆蓋 ERDDAP 內部的 URL 產生, 以便連結 (如您的自訂標籤或數據集連結) 正确決定你的公開域名

:::注
如果你正在執行不同的製作與QA環境, 請小心分享一個 PVC 。 在一個環境中修改或刪除缓存的資料會立即影響另一個 。 我們使用 QA 和 Production 的 部署覆寫來管理它, 並為每個覆寫增加子目錄 。 這可以讓我們用 QA 的數據集在 QA 上測試 。 XML 在觸碰製作部署前
:::
---

## 3. 建立網路:服務和入侵
為了揭露你 ERDDAP 在網絡上,你需要一個服務 導引內部群體交通, 以及一個入侵者把它捆綁到一個公共的 DNS 名稱。

建立名为檔案 `服務. yaml` :
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

建立名为檔案 `入侵。` :
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
## 4. 用 Kustomize 管理環境
随着您的部署增加, 管理不同環境的 YAML 檔案 (例如,质量保证与生产) 容易出錯 Kustomize 允許您定義「 Base」 設定, 然后對特定環境的 tweak 設定套用「 覆寫 」 。 在您的 GitHub 主目錄中, 檔案排列如下 :

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

建立 `kustomization.yaml (中文(简体) ).` 以收集所有資源并映射您的自訂設定和資料集 XML 文件。 這些會傳到你身上 ERDDAP 已部署時嵌入影像, 以便您可以樣式 ERDDAP 並加入您 GitHub 主目錄中的數據集 `暫停` 傳布到您的部署。

#### 基底 ( `基底/ kustomization.yaml` ) 
基底的Kustominization只是捆綁了您在覆蓋上共享的核心資源。 我們保留製作 ` datasets.xml ` 和 `設定. xml` 在底部,只有在QA測試后才能更新。

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
apiVersion: kustomize.config.k8s.io/v1β1
類型: Kustomization
命名空格 : <your-erddap-namespace> 
資源 :
- ././基地
- 入侵。
配置 MapGenerator :
- 名稱: 設定- xml
行為: 取代 # 此覆蓋會使用 QA URL 的標籤連結 。
文件 :
  - 設定. xml
- 名稱: 数据集- xml
行為: 取代 # 此覆蓋會使用本地端的數據集 xml 來更新 QA 部署中的數據集 xml 。
文件 :
  -  datasets.xml 
补丁 :
- 路徑: 部署。 耶
前缀: qa -
標籤 :
- 包含選取者: 真
配對 :
環境:qa
```

And here's the corresponding Production `kustomization`:
```yaml
apiVersion: kustomize.config.k8s.io/v1β1
類型: Kustomization
命名空格 : <your-erddap-namespace> 
資源 :
- ././基地
- 入侵。
补丁 :
- 路徑: 部署。 耶
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
