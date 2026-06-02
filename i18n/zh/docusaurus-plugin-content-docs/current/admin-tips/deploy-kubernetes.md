# 如何部署 ERDDAP 库伯涅特

部署 ERDDAP 在 Kubernetes 上为您的数据服务器提供了一个可扩展的、具有弹性的环境。 本指南涵盖主办《公约》缔约方会议 ERDDAP 使用标准 Kubernetes显示,包括管理持续存储,部署应用程序,配置网络,以及直接从集群内生成新的数据集XML.

## 先决条件
在开始之前,请确保:
- 运行中的 Kubernetes 集群
-  `ku` 安装和配置以与您的集群通信
- 能够创建持久音量的存储提供器 (逐字记录) 
- 你们 `设置. xml` 和 ` datasets.xml ` 准备挂载
- - - - - - - 说说看

## 一、导 言 持久性储存 (聚氯乙烯) 
 ERDDAP 需要持续的存储来维护缓存文件,日志,并声明横跨cock重启. 使用a `长期索赔`   (聚氯乙烯) 确保您 `大家长会`   (地点 ERDDAP 存储其生成的数据) 如果一个吊舱坠落,则不会丢失。 此音量也可以链接到原始数据文件所在的数据存储位置.

创建名为的文件 `维基月球在线解说-亚姆尔` 像这样:
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
 **说明:** 你的仓储提供商需要 建立数量索赔库伯内兹集群 并给你 `存储类Name` 之前,你可以连接到它。
:::

- - - - - - 说吧

## 2. 国家 那个 ERDDAP 部署
部署清单管理 ERDDAP 潜伏自己。 我们建议使用官方的 erddap/erddap Docker 图像,长期支持。

:::信息
截止2026年5月, [页:1](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) 是最新的版本。 明智的做法是偶尔重新部署以适应安全方面的弱点。
:::

在这个配置中,我们注入关键环境变量来处理时区设置,确保Tomcat有正确的存储音量读写权限,并告诉 ERDDAP 当坐在库伯涅兹入侵之后时如何正确路径 URL 。 我们还把聚氯乙烯挂到 `/erddapData 数据`   (默认 `大家长会` ) 输入 datasets.xml 并设置.xml 进入 `/usr/当地/Tomcat/内容/erddap` 。 。 。 。

创建名为的文件 `部署. yaml` 数字 :

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
-  **特兹** 数字 : 设置Tomcat服务器的时区和 ERDDAP 木头。

-  **TOMCAT_USER_ID & TOMCAT_GROUP_ID** 数字 : 默认情况下, ERDDAP 容器作为特定的用户运行Tomcat. 如果挂载到/erddapData的持久性音量为您主机存储系统上不同的用户/组ID所拥有, ERDDAP 将会因为被拒绝的许可而崩溃 。 设置这些变量会迫使Tomcat与匹配的ID运行.

    :::提示
在 NFS 挂载这样的服务器上查找您的用户 UID : `编号 - u <your-user_name> ` 。 。 。 这将返回所需的数值 。
    :::

-  ** ERDDAP 基数( B) ERDDAP 基数(_B) 乌尔尔** 数字 : 何时 ERDDAP Tomcat认为它服务于当地host:8080。 这些变量覆盖 ERDDAP 内部 URL 生成以链接 (类似您的自定义标志或数据集链接) 正确确定您的公开域名。

:::说明
如果运行单独的Production 和 QA 环境,请谨慎地分享单个PVC. 在一个环境中修改或删除缓存数据将立即影响另一个环境. 我们使用QA和Production的部署叠加管理,并为每个叠加增加子文件夹。 这样我们就可以用一个QA数据集在QA测试. XML在接触生产部署前.
:::
---

## 3个 联网:服务和入侵
揭发你 ERDDAP 在网络上,您需要一个服务 来引导内部集群流量, 和入侵 把它绑在一个公共 DNS 名称。

创建名为的文件 `服务. yaml` 数字 :
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

创建名为的文件 `内侵. yaml` 数字 :
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
## 4个 与Kustomize管理环境
随着部署的增长,管理不同环境的 YAML 文件 (例如,质量保证与生产) 变得容易出错。 Kustomize 允许您定义“ Base” 配置, 然后将“ 重叠” 应用到特定环境的 tweak 设置 。 在您的 GitHub 仓库中, 组织文件如下 :

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

创建 `kustomization.yaml (英语).` 用于收集所有资源并映射您的自定义设置和数据集XML文件的文件。 这些会传给你 ERDDAP 部署时粘贴图像, 以便样式 ERDDAP 页面并添加您 GitHub 寄存器中的数据集,同时启用 `暂停` 把他们定位到部署中

#### 基础 ( `碱基/酮化. yaml` ) 
基础Kustomimization只是将你共享的核心资源捆绑在了整个覆盖层。 我们继续制作 ` datasets.xml ` 和 `设置. xml` 在基部中,只有在QA测试后才能更新。

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
apiVersion: kustomize.config.k8s.io/v1beta1 (英语).
类型: Kustomization
命名空间 : <your-erddap-namespace> 
资源:
- ./././基地
- 内侵. yaml
配置地图
- 名称: 设置- xml
行为: 替换 # 此覆盖将使用本地设置文件, 并带有QA URL 的标志链接 。
文件 :
  - 设置. xml
- 名称: 数据集- xml
行为: 替换 # 此覆盖将使用本地数据集 xml 更新 QA 部署中的数据集 xml 。
文件 :
  -  datasets.xml 
补丁 :
- 路径:部署。 雅姆尔
前缀: qa -
标签 :
- 包含选择者:真
配对 :
环境:qa
```

And here's the corresponding Production `kustomization`:
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1 (英语).
类型: Kustomization
命名空间 : <your-erddap-namespace> 
资源:
- ./././基地
- 内侵. yaml
补丁 :
- 路径:部署。 雅姆尔
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
