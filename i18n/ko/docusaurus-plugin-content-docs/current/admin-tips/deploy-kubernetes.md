# 배포 방법 ERDDAP Kubernetes에서

계정 만들기 ERDDAP 쿠버네티스는 데이터 서버의 확장성, 탄력성 환경을 제공합니다. 이 가이드는 호스트에 필요한 필수 구성 요소를 다룹니다. ERDDAP 표준 사용 쿠버네티스는 기존 스토리지 관리, 애플리케이션 배포, 네트워킹 구성, 클러스터 내에서 새 데이터셋 XML을 직접 생성한다.

## 자주 묻는 질문
시작하기 전에 다음을 확인하십시오.
- Kubernetes 클러스터 실행
-  `뚱 베어` 클러스터와 소통하기
- Persistent Volumes를 만들 수있는 스토리지 프로듀서 (PV 시리즈) 
- 내 계정 `설정.xml` 이름 * ` datasets.xml ` 장착 가능
-----

## 1. 명세 공급 능력 (자료: PVC) 
 ERDDAP pod 재시작을 통해 캐시 파일, 로그 및 상태를 유지하려면 영구 저장이 필요합니다. 사용 방법 `주변기기`   (자료: PVC) 그대는 `큰Parent감독`   (이름 * ERDDAP 생성된 데이터 저장) 파드가 내려지면 손실되지 않습니다. 이 볼륨은 데이터 저장 위치로도 연결될 수 있습니다.

파일 생성 `pvc.yaml의` 이렇게:
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

:::뚱 베어
 **참고 :** 스토리지 프로퍼터는 쿠버네티스 클러스터에서 볼륨 클레임을 설정해야 하며, `저장ClassName` 연결하기 전에.
:::

·

## 2. 명세 더 보기 ERDDAP 계정 만들기
Deployment는 정의한다. ERDDAP 팟 자체. 장기 지원으로 공식 erddap/erddap Docker 이미지를 사용하는 것이 좋습니다.

:::(주)
5월 2026일 현재 [v2.30.0의](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) 최신 버전이었다. 보안 취약점으로 계속 유지하려면 re-deploy가 현명합니다.
:::

이 구성에서, 우리는 timezone 설정을 처리하는 주요 환경 변수를 주사하고, Tomcat은 스토리지 볼륨에 대한 올바른 읽기 / 쓰기 권한이 있습니다. ERDDAP 쿠버네티스 Ingress 뒤에 앉아 때 URL을 올바르게 경로하는 방법. 우리는 또한 PVC를에 거치합니다 `/erddap데이터`   (기본값 `큰Parent감독` ) 관련 기사 datasets.xml 그리고 setup.xml로 `/usr/현지/tomcat/content/erddap` ·

파일 생성 `배포.yaml` ::

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
-  **사이트맵** :: Tomcat 서버의 시간대를 설정하고 ERDDAP 로그아웃

-  **TOMCAT_USER_ID 및 TOMCAT_GROUP_ID** :: 기본적으로, ERDDAP 컨테이너는 특정 사용자로 Tomcat을 실행합니다. /erddapData에 장착 된 영구 볼륨이 호스트 스토리지 시스템에 다른 사용자 / 그룹 ID에 의해 소유되면, ERDDAP 실패한 오류로 인해 발생합니다. 이 변수를 설정하는 것은 Tomcat을 일치 ID로 실행합니다.

    :::뚱 베어
NFS 마운트가 다음과 같은 서버에서 사용자 UID 찾기 : `사이트맵 <your-user_name> ` · 필요한 수치를 반환합니다.
    :::

-  ** ERDDAP _baseUrl 및 ERDDAP _baseHttps의 뚱 베어** :: 시간 : ERDDAP 서비스 및 Ingress 뒤에 쿠버네티스에서 실행되는 Tomcat은 localhost:8080의 트래픽을 제공하는 것으로 생각합니다. 이 변수 override ERDDAP '내부 URL 생성 등 링크 (사용자 정의 로고 또는 dataset 링크처럼) 도메인 이름에 대한 올바른 해결.

:::이름 *
별도의 생산 및 QA 환경을 실행하는 경우 단일 PVC를 공유하는 것에주의해야합니다. 하나의 환경에서 캐시 된 데이터를 수정하거나 삭제하면 즉시 다른 영향을 미칩니다. QA 및 Production에 대한 배포 오버레이를 사용하여 관리하고 각 오버레이에 대한 하위 폴더를 추가합니다. QA를 QA 데이터셋으로 테스트할 수 있습니다. 생산 배포를 터치하기 전에 XML.
:::
---

## 3. 명세 네트워킹: 서비스 및 진입
당신의 꿈을 ERDDAP pod to web, 당신은 내부 클러스터 트래픽을 경로를 서비스해야, 그리고 Ingress to bind it to the public DNS name.

파일 생성 `서비스.yaml` ::
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

파일 생성 `언어: English` ::
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
## 4. 명세 Kustomize 환경 관리
배포가 성장함에 따라 개별 YAML 파일 관리 (e.g., QA 대 생산) 오류가 발생한다. Kustomize는 "Base" 구성을 정의하고 특정 환경에 대한 "Overlays"를 적용 할 수 있습니다. GitHub 저장소에서 다음과 같이 파일을 구성:

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

이름 * `kustomization.yaml의` 모든 리소스를 수집하고 사용자 정의 설정 및 datasets XML 파일을 맵하십시오. 이것은 당신에 통과됩니다 ERDDAP 배포할 때 Docker 이미지도 스타일링할 수 있습니다. ERDDAP 여러분의 GitHub 저장소에서 데이터셋을 추가합니다. `사이트맵` 맵을 배포합니다.

#### 기본 정보 ( `기초/kustomization.yaml` ) 
Base kustomization는 단순히 오버레이를 통해 공유된 핵심 리소스를 묶습니다. 우리는 생산을 지킵니다 ` datasets.xml ` 이름 * `설정.xml` 기초에서 그리고 QA에 시험 후에만 이 새롭게 합니다.

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
종류: Kustomization
이름: <your-erddap-namespace> 
자료:
- ../../기초
- 언어: English
configMapGenerator:
- 이름: 설정 XML
동작: # 교체 이 오버라이드는 QA URL에서 로고 링크와 로컬 설정 파일을 사용할 수 있습니다.
파일 :
  - 설정.xml
- 이름: datasets-xml
동작: # 교체 이 override는 QA 배포에서 datasets xml을 업데이트하는 로컬 datasets xml을 사용합니다.
파일 :
  -  datasets.xml 
패치:
- 경로: 배포. 스낵 바
이름Prefix: qa-
상표:
- includeSelectors: 진실
쌍:
환경: qa
```

And here's the corresponding Production `kustomization`:
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
종류: Kustomization
이름: <your-erddap-namespace> 
자료:
- ../../기초
- 언어: English
패치:
- 경로: 배포. 스낵 바
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
