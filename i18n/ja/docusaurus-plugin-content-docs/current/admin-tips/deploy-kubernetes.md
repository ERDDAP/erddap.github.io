# 導入方法 ERDDAP Kubernetesについて

導入事例 ERDDAP Kubernetesでは、データサーバーのスケーラブルで弾力性のある環境を提供します。 このガイドは、ホストに必要な重要なコンポーネントをカバーしています ERDDAP 標準の使用 Kubernetesマニフェストは、永続ストレージの管理、アプリケーションを展開し、ネットワークの設定、クラスター内の新しいデータセットXMLを直接生成します。

## 前提条件
始める前に、次のことを確実にしてください。
- Kubernetesクラスターを実行している
-  `ログイン` インストールして、クラスターと通信するように設定
- 持続的なボリュームを作成することができるストレージプロビジョナー (太陽光発電) 
- お問い合わせ `セットアップ。xml` そして、 ` datasets.xml ` 取付けられる準備ができて
お問い合わせ

## 1。 持続的な貯蔵 (ポリ塩化ビニール) 
 ERDDAP キャッシュファイル、ログ、およびPodの再起動を介した状態を維持するために永続ストレージが必要です。 利用する `パーシステントボリュームクレーム`   (ポリ塩化ビニール) あなたのことを保障して下さい `bigParentディレクトリ`   (どこまでも ERDDAP 生成されたデータを保存する) Podが下がると失いません。 このボリュームは、生データファイルが生きているデータストレージの場所にもリンクできます。

名前付きファイルを作成する `ポリ塩化ビニール。yaml` のような:
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

:::チップ
 **注意:** ストレージプロビジョナーは、Kubernetesクラスターのボリュームクレームを設定し、あなたに与える必要があります `ストレージクラス名` 接続する前に接続します。
:::

お問い合わせ

## 2。 ザ・オブ・ザ・ ERDDAP 導入事例
展開マニフェストは、 ERDDAP ポッド自体。 erddap/erddap Docker の公式イメージを長期サポートで使用することをお勧めします。

:::インフォメーション
2026年5月現在 [v2.30.0の](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) 最新バージョンでした。 セキュリティの脆弱性を保ちつつ、時折再採用することが賢明です。
:::

この設定では、タイムゾーンの設定を処理するために重要な環境変数を注入し、Tomcat がストレージボリュームの正しい読み書き権限を持っていることを確認し、 ERDDAP Kubernetes Ingressの背後にあるURLを適切にルートする方法。 私達はまたポリ塩化ビニールをに取付けます `/erddapデータ`   (デフォルト `bigParentディレクトリ` ) 注入するために datasets.xml と setup.xml に `/usr/local/tomcat/content/erddap/ja/ja/ja/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html/html` お問い合わせ

名前付きファイルを作成する `デプロイメント.yaml` : : :

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
-  **ツイート** : : : Tomcat サーバーのタイムゾーンを設定します。 ERDDAP ログイン

-  **TOMCAT_USER_ID と TOMCAT_GROUP_ID** : : : デフォルトでは、 ERDDAP コンテナは、Tomcatを特定のユーザーとして実行します。 /erddapData にマウントされた永続的なボリュームがホストストレージシステム上の異なるユーザー/グループ ID が所有している場合、 ERDDAP 許可拒否されたエラーによりクラッシュします。 これらの変数を設定すると、Tomcatが一致するIDで実行するように強制します。

    :::チップ
NFS マウントがこんなサーバーでユーザ UID を検索します。 `ログイン <your-user_name> ` お問い合わせ 必要な数値を返します。
    :::

-  ** ERDDAP _ベースUrl& ERDDAP ログイン ウルル** : : : いつか ERDDAP サービスとイングレッシブの背後にあるKubernetesで実行されるTomcatは、localhost:8080でトラフィックを提供しています。 これらの変数は上書きします ERDDAP '内部 URL 生成でリンク (カスタムロゴやデータセットリンクなど) パブリックフェースドメイン名に正しく解決します。

:::注意:
別々の生産およびQAの環境を実行している場合は、単一のポリ塩化ビニールを共有することについて注意深いです。 キャッシュされたデータを1つの環境で変更または削除すると、すぐに他の環境に影響します。 QAとプロダクションの展開オーバーレイで管理し、各オーバーレイのサブフォルダを追加します。 QA で QA を QA データセット でテストできます。 生産の展開に触れる前のXML。
:::
---

## 3。 ネットワーキング: サービスおよび侵入
あなたの露出をするために ERDDAP ウェブへのポッド、内部クラスターのトラフィックをルーティングするサービス、およびパブリックDNS名にバインドするイングレッシブが必要です。

名前付きファイルを作成する `サービス。yaml` : : :
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

名前付きファイルを作成する `イングレッシブ.yaml` : : :
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
## 4。 クストマイズによる環境管理
展開が拡大するにつれて、個々の YAML ファイルをさまざまな環境で管理できます。 (例:QA対生産) エラーが発生します。 Kustomize では、「Base」の設定を定義し、「Overlays」を適用して、特定の環境の設定を調整することができます。 GitHub リポジトリでは、以下のファイルを整理します。

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

作成する `久住化.yaml` すべてのリソースを収集し、カスタム設定とデータセットのXMLファイルをマップします。 これらがあなたのところに渡されます ERDDAP デプロイ時に Docker イメージがデプロイされるので、スタイルをすることができます ERDDAP GitHubリポジトリからデータセットを追加 `クズモマイズ` 展開をマップします。

#### ベース ( `ベース/kustomization.yaml` ) 
ベース kustomization は、オーバーレイ間で共有されるコアリソースを束ねるだけです。 私達は生産を保ちます ` datasets.xml ` そして、 `セットアップ。xml` ベースで、QAのテスト後にのみ更新します。

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
種類: 昆虫化
名前空間: <your-erddap-namespace> 
リソース:
- .././ベース
- イングレッシブ.yaml
configMapGenerator:
- 名前: setup-xml
行動: # 置換 このオーバーライドは、QA URL のロゴリンクでローカル設定ファイルを使用します。
ファイル:
  - セットアップ。xml
- 名前: datasets-xml
行動: # 置換 このオーバーライドは、ローカルデータセット xml を使用して、QA デプロイでデータセット xml を更新します。
ファイル:
  -  datasets.xml 
パッチ:
- path: デプロイメント。 ログイン
名前プレフィックス: qa-
ラベル:
- includeSelectors: 本当
ペア:
環境: qa
```

And here's the corresponding Production `kustomization`:
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
種類: 昆虫化
名前空間: <your-erddap-namespace> 
リソース:
- .././ベース
- イングレッシブ.yaml
パッチ:
- path: デプロイメント。 ログイン
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
