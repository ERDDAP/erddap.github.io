# Как развернуть ERDDAP На Кубернете

развертывание ERDDAP Kubernetes предоставляет масштабируемую, устойчивую среду для вашего сервера данных. Это руководство охватывает основные компоненты, необходимые для размещения ERDDAP Использование стандарта Kubernetes проявляется, включая управление постоянным хранением, развертывание приложения, настройку сетей и генерацию новых наборов данных XML непосредственно из кластера.

## Предпосылки
Прежде чем начать, убедитесь, что у вас есть:
- Бегущий кластер Kubernetes
-  `кубектль` установлен и настроен для связи с вашим кластером
- Поставщик хранения, способный создавать постоянные объемы (ПВ) 
- Твой `Настройка.xml` и ` datasets.xml ` Готовы к установке
---

## 1. Постоянное хранение (ПВХ) 
 ERDDAP требует постоянного хранения для поддержания файлов кэша, журналов и состояния при перезапуске под. Используя `PersistentVolumeClaim`   (ПВХ) Убедитесь, что ваш `BigParent Директория`   (где ERDDAP Хранит сгенерированные данные) Не теряется, если стручка падает. Этот том также может быть связан с местом хранения данных, где будут жить исходные файлы данных.

Создайте файл с именем `pvc.yaml` Вот так:
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

:::чаевые
 **Примечание:** Вашему поставщику услуг по хранению потребуется настроить претензию на объем кластера Kubernetes и предоставить вам `ХранилищеClassName` Прежде чем вы сможете подключиться к нему.
:::

---

## 2. The ERDDAP Развертывание
Манифест развертывания управляет ERDDAP Сама капсула. Мы рекомендуем использовать официальное изображение erddap/erddap Docker с долгосрочной поддержкой.

:::информация
По состоянию на май 2026 года, [v2.30-0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) Это была последняя версия. Разумно время от времени перераспределяться, чтобы не отставать от уязвимостей безопасности.
:::

В этой конфигурации мы вводим ключевые переменные среды для обработки настроек часового пояса, гарантируем, что у Tomcat есть правильные разрешения на чтение / запись для объема хранилища и сообщаем ERDDAP Как правильно маршрутизировать URL-адреса, сидя за входом Kubernetes Мы также устанавливаем ПВХ на `/erddapData`   (по умолчанию `BigParent Директория` ) чтобы ввести datasets.xml и установить.xml в `/usr/local/tomcat/контент/erddap` .

Создайте файл с именем `развёртывание.` :

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
-  **TZ** : Устанавливает часовой пояс для сервера Tomcat и ERDDAP бревна.

-  **TOMCAT_USER_ID и TOMCAT_GROUP_ID** : По умолчанию, ERDDAP Контейнер Tomcat работает как конкретный пользователь. Если постоянный объем, установленный на /erddapData, принадлежит другому идентификатору пользователя / группы в вашей системе хранения хоста, ERDDAP будет падать из-за отказа в разрешении ошибок. Установка этих переменных заставляет Tomcat работать с соответствующими идентификаторами.

    :::чаевые
Найдите UID пользователя на сервере, где монтируется NFS: `id-u <your-user_name> ` . Это вернет вам необходимое числовое значение.
    :::

-  ** ERDDAP _baseUrl & ERDDAP _baseHttps Урл** : Когда ERDDAP Tomcat работает в Kubernetes за сервисом и Ingress и считает, что он обслуживает трафик на localhost: 8080. Эти переменные преобладают ERDDAP Внутренняя генерация URL, чтобы ссылки (как ваш собственный логотип или ссылки на набор данных) Правильное решение для вашего публичного доменного имени.

:::примечание
Если вы используете отдельные производственные и QA-среды, будьте осторожны при совместном использовании одного ПВХ. Изменение или удаление кэшированных данных в одной среде немедленно повлияет на другую. Мы управляем этим, используя наложения развертывания для QA и производства и добавляя подпапки для каждого наложения. Это позволяет нам тестировать на QA с помощью наборов данных QA. XML, прежде чем приступить к развертыванию.
:::
---

## 3. Сеть: сервис и вход
Разоблачить свою ERDDAP Для подключения к сети вам нужен сервис для маршрутизации внутреннего кластерного трафика и Ingress для связывания его с публичным именем DNS.

Создайте файл с именем `Service.yaml` :
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

Создайте файл с именем `ingress.yaml` :
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
## 4. Управление средами с помощью Kustomize
По мере роста развертывания, управление отдельными файлами YAML для разных сред (QA vs. Производство) становится подверженным ошибкам. Kustomize позволяет определить конфигурацию «Base», а затем применить «Overlays» для настройки настроек для конкретных сред. В репозитории GitHub организуйте файлы следующим образом:

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

создавать `kustomization.yaml` Файл для сбора всех ресурсов и отображения ваших пользовательских настроек и наборов данных XML-файлов. Они будут переданы в вашу ERDDAP Изображение Docker при развертывании, чтобы вы могли создать свой стиль ERDDAP Страница и добавьте наборы данных из вашего репозитория GitHub, позволяя `кустомизировать` Отправьте их в свое развертывание.

#### База ( `base/kustomization.yaml` ) 
Базовая кустомизация просто объединяет ваши основные ресурсы, разделенные по оверлеям. Мы сохраняем производство ` datasets.xml ` и `Настройка.xml` Обновляйте их только после тестирования на QA.

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
Тип: Кустомизация
пространство имен: <your-erddap-namespace> 
ресурсы:
- .. / База
- ingress.yaml
ConfigMapGenerator:
- Название: Setup-xml
Поведение: заменить # Эта оверрайд будет использовать локальный файл настройки со ссылкой на логотип из QA URL.
файлы:
  - Настройка.xml
- Название: Datasets-xml
Поведение: заменить # Эта отмена будет использовать локальные наборы данных xml для обновления наборов данных xml в развертывании QA.
файлы:
  -  datasets.xml 
Патчи:
- Путь: развертывание. ямл
Оригинальное название: Qa-
этикетки:
- Избиратели: правда
пары:
окружающая среда: qa
```

And here's the corresponding Production `kustomization`:
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
Тип: Кустомизация
пространство имен: <your-erddap-namespace> 
ресурсы:
- .. / База
- ingress.yaml
Патчи:
- Путь: развертывание. ямл
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
