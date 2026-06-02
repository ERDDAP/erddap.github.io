# Як розгорнути ERDDAP на Куберне

Розгортання ERDDAP на Kubernetes забезпечує масштабне, стабільне середовище для вашого сервера даних. Цей посібник охоплює необхідні компоненти, необхідні для розміщення ERDDAP за стандартом Kubernetes проявляється, в тому числі управління стійким зберіганням, розгортанням програми, налаштування мереж і створення нових даних XML безпосередньо з кластера.

## Вимоги
Перед тим як розпочати роботу, переконайтеся, що у вас є:
- Пробіг Kubernetes кластер
-  `кішка` встановити і налаштувати для спілкування з кластером
- Консерватор зберігання, здатний створювати стійкий обсяги (ПВ) 
- Ваше ім'я `Налаштування.xml` і ` datasets.xml ` готовий до монтажу
------

## 1,1 км Постійне зберігання (Пиріг) 
 ERDDAP вимагає стійких зберігання для підтримки кеш-файлів, журналів та стану через pod-замки. Використання `ПерсистентVolumeClaim`   (Пиріг) гарантує, що ваш `bigParentПублічний`   (де ERDDAP зберігає дані) не загублений, якщо под йде вниз. Цей об'єм також може бути пов'язаний з розташуванням сховища даних, де файли даних будуть жити.

Створити файл `пвк.ямл` так:
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

:::Навігація
 **Примітка:** Ваше сховище буде потрібно налаштувати об'ємну вимогу на кластері Kubernetes і дати вам `Склад` перед ним можна підключити.
:::

-----

## 2,2 км Про нас ERDDAP Розгортання
Розгортання проявляється в управлінні ERDDAP сам под. Ми рекомендуємо використовувати офіційне зображення erddap/erddap Docker з довгостроковою підтримкою.

:::Контакти
Станом на 2026 травня, [в2.30.0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) була остання версія. Звісно, що для забезпечення безпеки є можливість повторно реєструватися.
:::

У цій конфігурації ми вводили змінні середовища для обробки параметрів часового поясу, переконайтеся, що Tomcat має правильний дозвіл на читання/запису для обсягу зберігання, і розповісти ERDDAP Як правильно маршрутувати URL-адреси, коли сидять за допомогою Kubernetes Ingress. Ми також монтуємо ПВХ до `КСНУМКС`   (За замовчуванням `bigParentПублічний` ) вводити datasets.xml JavaScript licenses API Веб-сайт `/usr/local/tomcat/content/erddap` й

Створити файл `Розгортання.yaml` :

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
-  **ТЗ** : Налаштовує часовий пояс для сервера Tomcat та ERDDAP Увійти

-  **TOMCAT_USER_ID & TOMCAT_GROUP_ID** : За замовчуванням, ERDDAP контейнер працює Tomcat як конкретний користувач. Якщо персистентний об'єм, встановлений до /erddapData, належить іншому ідентифікатору користувача / групи на системі зберігання, ERDDAP буде збиток через відмову від помилок. Налаштування цих змінних сил Tomcat для запуску з відповідними ідентифікаторами.

    :::Навігація
Знайти користувача UID на сервері, де NFS mount це: `id -u <your-user_name> ` й Це поверне число, яке вам потрібно.
    :::

-  ** ERDDAP _ БазаУрл & ERDDAP _ БазаХттппс Уль** : Коли ERDDAP працює в Kubernetes за Сервісом і Ingress, Tomcat вважає, що він обслуговує трафік на локальномуhost:808080. Ці змінні перевизначення ERDDAP 's внутрішнього створення URL, щоб посилання (як користувацький логотип або посилання на дані) правильно вирішувати доменне ім’я.

:::замітка
Якщо Ви працюєте окреме виробництво та навколишнє середовище QA, будьте обережні щодо спільного використання одного ПВХ. Зміна або видалення кешованих даних в одному середовищі буде негайно впливати на інші. Ми керуємо цим шляхом розгортання накладок для QA та виробництва та додавання підпапок для кожної накладки. Це дозволяє нам перевірити на QA за допомогою QA даних. XML перед сенсорним розгортанням виробництва.
:::
---

## 3. У Мережі: Послуги та конгреси
Виконувати ERDDAP pod на веб-сторінку, вам потрібна Послуга для маршруту внутрішнього трафіку кластера, і Інгрес, щоб зв'язати його на публічне ім'я DNS.

Створити файл `Сервіс.yaml` :
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

Створити файл `свінгери` :
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
## 4. У Управління навколишнім середовищем з Kustomize
Як вирости вашого розгортання, управління індивідуальними файлами YAML для різних середовищ (Наприклад, QA проти виробництва) стає помилкою. Kustomize дозволяє визначити конфігурацію "Base", а потім застосувати "Overlays" для настроювання певних середовищ. У Вашому репозиторію GitHub організуйте файли наступним чином:

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

Створити `Кустотомізація.yaml` файл для збору всіх ресурсів та копіювання користувацького налаштування та даних XML файлів. Це буде передано в ваш ERDDAP Докер зображення при розгортанні, так що ви можете стильувати ваш ERDDAP Сторінка і додати дані з вашого репозиторію GitHub припускі `Кустотоміз` налаштуйте їх до розгортання.

#### Головна ( `JavaScript licenses API Веб-сайт Go1.13.8` ) 
Основа kustomization просто поповнює ваші основні ресурси, що знаходяться на перекладах. Ми зберігаємо виробництво ` datasets.xml ` і `Налаштування.xml` після тестування на QA.

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
JavaScript licenses API Веб-сайт Go1.13.8
різновид: Кустомизация
простір імен: <your-erddap-namespace> 
ресурси:
- .././ База
- свінгери
НалаштуванняMapGenerator:
- name: Налаштування-xml
поведінка: замінити # Цей зовнішній вигляд використовує локальний файл налаштування з посиланням на логотип з URL QA.
Файли:
  - Налаштування.xml
- ім'я: datasets-xml
поведінка: замінити # Цей перенаречений використовуватиме локальні дані xml для оновлення xml даних у розгортанні QA.
Файли:
  -  datasets.xml 
патчі:
- шлях: розгортання. yaml
ім'яПрефікс: qa-
етикетки:
- включає в себеСелектори: правда
пари:
об'єм: qa
```

And here's the corresponding Production `kustomization`:
```yaml
JavaScript licenses API Веб-сайт Go1.13.8
різновид: Кустомизация
простір імен: <your-erddap-namespace> 
ресурси:
- .././ База
- свінгери
патчі:
- шлях: розгортання. yaml
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
