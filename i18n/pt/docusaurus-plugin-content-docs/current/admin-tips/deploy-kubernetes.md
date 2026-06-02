# Como Deplorar ERDDAP em Kubernetes

Implantação ERDDAP em Kubernetes fornece um ambiente escalável e resistente para o seu servidor de dados. Este guia cobre os componentes essenciais necessários para hospedar ERDDAP usando padrão Kubernetes se manifesta, incluindo o gerenciamento de armazenamento persistente, a implantação do aplicativo, a configuração de rede e a geração de novos XML de conjuntos de dados diretamente a partir do cluster.

## Pré-requisitos
Antes de começar, certifique-se de ter:
- Um cluster de Kubernetes em execução
-  `kubect.` instalado e configurado para se comunicar com seu cluster
- Um provedor de armazenamento capaz de criar Volumes Persistentes (PVs) 
- Tu és `setup.xml` e ` datasets.xml ` pronto para ser montado
- Não.

## 1. Armazenamento persistente (PVC) 
 ERDDAP requer armazenamento persistente para manter arquivos de cache, logs e estado através de reinicializações pod. Usando um `PersistenteVolumeClaim`   (PVC) garante que seu `Diretriz de grande porte`   (Onde? ERDDAP armazena seus dados gerados) não está perdido se uma cápsula cair. Este volume também pode ser ligado ao seu local de armazenamento de dados onde os arquivos de dados brutos irão viver.

Criar um arquivo chamado `pvc.yaml` assim:
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

:::ponta da ponta
 **Nota:** Seu provedor de armazenamento precisará configurar a reivindicação de volume no cluster Kubernetes e dar-lhe o `armazenamentoClassName` antes que você possa se conectar a ele.
:::

----

## 2. O ERDDAP Distribuição
O manifesto de implantação gerencia o ERDDAP pod-se. Recomendamos usar a imagem oficial do erddap/erddap Docker com suporte a longo prazo.

:::info
A partir de maio de 2026, [V2.30.0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) foi a última versão. É aconselhável re-deplorar ocasionalmente para manter-se com vulnerabilidades de segurança.
:::

Nesta configuração, injetamos variáveis de ambiente chave para lidar com configurações de fuso horário, asseguramos que a Tomcat tenha as permissões de leitura/escrita corretas para o volume de armazenamento e digamos ERDDAP como direcionar corretamente URLs quando sentado atrás de um Kubernetes Ingress. Nós também montamos o PVC para `/erddapData`   (o padrão `Diretriz de grande porte` ) para injetar datasets.xml e setup.xml em `/usr/local/tomcat/content/erddap` .

Criar um arquivo chamado `deployment.yaml` :

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
-  **TZ** : Define o fuso horário para o servidor Tomcat e ERDDAP Registos.

-  **TOMCAT_USER_ID & TOMCAT_GROUP_ID** : Por padrão, o ERDDAP O recipiente executa Tomcat como um usuário específico. Se o volume persistente montado em /erddapData é de propriedade de um ID de usuário/grupo diferente em seu sistema de armazenamento de host, ERDDAP irá falhar devido à permissão negada erros. Definir essas variáveis força Tomcat a correr com os IDs correspondentes.

    :::ponta da ponta
Encontre seu usuário UID no servidor onde a montagem NFS é assim: `Id -u <your-user_name> ` . Isso retornará o valor numérico que você precisa.
    :::

-  ** ERDDAP _baseUrl &gt; ERDDAP _baseHttps Url.** : Quando ERDDAP corre em Kubernetes por trás de um Serviço e uma entrada, Tomcat acha que está servindo tráfego no localhost:8080. Essas variáveis substituem ERDDAP 's geração de URL interna para que os links (como seu logotipo personalizado ou links de dataset) resolva corretamente o seu nome de domínio público.

:::Nota
Se você estiver executando ambientes de produção e QA separados, seja cauteloso em compartilhar um único PVC. Modificar ou excluir dados armazenados em um ambiente afetará imediatamente o outro. Nós gerenciamos isso usando sobreposições de implantação para QA e Produção e adicionando subpastas para cada sobreposição. Isso nos permite testar no QA com um conjunto de dados QA. XML antes de tocar na implantação de produção.
:::
---

## 3. Rede: Serviço e Ingresso
Para expor o seu ERDDAP pod para a web, você precisa de um Serviço para direcionar o tráfego interno do cluster, e uma entrada para a vincular a um nome de DNS público.

Criar um arquivo chamado `serviço.yaml` :
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

Criar um arquivo chamado `ingress.yaml` :
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
## 4. Gerenciamento de ambientes com Kustomize
À medida que sua implantação cresce, gerenciando arquivos YAML individuais para diferentes ambientes (por exemplo, QA vs. Produção) torna-se propenso a erros. O Kustomize permite definir uma configuração "Base" e, em seguida, aplicar "Overlays" para ajustar configurações para ambientes específicos. No seu repositório GitHub, organize os arquivos da seguinte forma:

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

Criar `kustomization.yaml` arquivo para coletar todos os recursos e mapear sua configuração personalizada e conjuntos de dados arquivos XML. Estes serão passados para o seu ERDDAP Imagem do docker quando implantado para que você possa estilo seu ERDDAP página e adicione conjuntos de dados do seu repositório GitHub ao deixar `kustomize` mapeá-los para sua implantação.

#### Base ( `base/kustomization.yaml` ) 
A kustomização base simplesmente empacota seus recursos principais compartilhados através das sobreposições. Mantemos a produção ` datasets.xml ` e `setup.xml` na base e apenas atualizá-los após testes no QA.

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
apiVersão: kustomize.config.k8s.io/v1beta1
tipo: Kustomization
namespace: <your-erddap-namespace> 
recursos:
- .././base
- ingress.yaml
configMapGenerator:
- nome: setup-xml
comportamento: substituir # Esta substituição usará o arquivo de configuração local com o link do logotipo da URL QA.
arquivos:
  - setup.xml
- nome: datasets-xml
comportamento: substituir # Esta substituição usará os conjuntos de dados locais xml para atualizar os conjuntos de dados xml na implementação QA.
arquivos:
  -  datasets.xml 
patches:
- path: implantação. Sim.
namePrefix: qa-
etiquetas:
- includeSelectors: true
pares:
ambiente: qa
```

And here's the corresponding Production `kustomization`:
```yaml
apiVersão: kustomize.config.k8s.io/v1beta1
tipo: Kustomization
namespace: <your-erddap-namespace> 
recursos:
- .././base
- ingress.yaml
patches:
- path: implantação. Sim.
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
