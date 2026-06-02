# کیسے ؟ ERDDAP کوبرنیٹس پر

رنگ ERDDAP کوبرنیٹس پر آپ کے ڈیٹا سرور کے لیے ایک قابل قبول، قابل برداشت ماحول فراہم کرتا ہے۔ یہ گائیڈ میزبان کے لئے درکار ضروری اجزاء پر محیط ہے۔ ERDDAP معیار استعمال کریں کوبرنیٹز ظاہر کرتے ہیں جن میں مسلسل ذخیرہ کا انتظام کرنا ، درخواست کو پورا کرنا ، نیٹ‌ورک نیٹ ورکنگ کرنا اور نئے ڈیٹا سیٹ کو کمپیوٹر کے اندر سے براہِ‌راست ترتیب دینا شامل ہے ۔

## ذمہ‌داری
شروع کرنے سے پہلے، آپ کو یقین ہے:
- ایک دوڑنے والا کوبرنیٹس
-  `معطل` آپ کے کردستان سے رابطہ کرنے کے لیے نصب اور پلگ ان سے رابطہ کرنے کے لیے
- ایک ذخیرہ فراہم کرنے والے کیلئے مستقل جِلد پیدا کرنے کی صلاحیت (پَس) 
- آپ کی `تیار` اور ` datasets.xml ` گرانے کے لئے تیار ہیں
----

## 1۔ مستقل‌مزاجی (پی ٹی سی) 
 ERDDAP کیچ فائلوں ، لاگس اور ریاست کو دوبارہ تعمیر کرنے کیلئے مسلسل ذخیرہ کرنے کی ضرورت ہے ۔ ایک استعمال `مستقل‌مزاجی`   (پی ٹی سی) آپ کو یقین دلاتا ہے `بڑے کیمیائی مرکبات`   (کہاں ERDDAP اس کے پیدا کردہ اعداد و شمار کو ذخیرہ کریں) اگر پود نیچے جاتا ہے تو گم نہیں ہوتا۔ اس حجم کو آپ کے ڈیٹا ذخیرہ گاہ سے بھی منسلک کیا جا سکتا ہے جہاں خام ڈیٹا فائل رہیں گے۔

فائل کا نام بنائیں `pvc.yaml` اس طرح:
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

:::اوپر
 **نوٹ:** آپ کے ذخیرہ فراہم کنندہ کو کوبرنیٹس کی خلیج پر حجم کا دعویٰ کرنے کی ضرورت ہوگی اور آپ کو دے گا۔ `ذخیرے کا نام` اس سے پہلے آپ اس سے متصل ہو سکتے ہیں.
:::

--

## ۲ ۔ جواب ERDDAP غیر متصل
ظاہر ظاہری کا انتظام کرتا ہے۔ ERDDAP خود کود. ہم طویل عرصے تک معاونت کے ساتھ سرکاری ایرڈاپ/رڈاپ ڈکر تصویر استعمال کرتے ہیں۔

:::معلومات
جیسا کہ مئی 2026ء کی بات ہے۔ ['وی2.30.0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) تازہ ترین ورژن تھا۔ حفاظتی سرگرمیوں کے ساتھ وقتاًفوقتاً دوبارہ رہنا دانشمندی کی بات ہے۔
:::

اس ڈھانچے میں، ہم نے کلیدی ماحول تبدیل کر دیا ہے تاکہ ٹائمز کی ترتیبات کو حل کیا جا سکے، ٹامکاٹ کو ذخیرہ کرنے کے لیے درست پڑھا / لکھنے کے اجازے موجود ہیں ERDDAP جب کوبرنیٹس انگریس کے پیچھے بیٹھا تو درست روٹ URLs کیسے بن سکتا ہے۔ ہم پی وی سی کو بھی ماؤنٹ کرتے ہیں۔ `/ بچہ`   (طے شدہ `بڑے کیمیائی مرکبات` ) کھانے کے لئے datasets.xml اور برابر برابر بچھے ہوئے قالین `/usr/local/tomcat/content/reddap` . .

فائل کا نام بنائیں `مَیں نے اُس سے پوچھا : ” کیا مَیں اِس بات پر یقین رکھتا ہوں کہ یہوواہ خدا مجھے معاف کر دے گا ؟ “` :

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
-  **TZ** : ٹامکاٹ سرور کے لیے ٹائمز سیٹ کرتا ہے اور ERDDAP لاگس.

-  **خرچ کریں** : قَسم ہے بُرجوں (یعنی گواہی دینے والا) ERDDAP برتن مخصوص صارف کے طور پر ٹومکاٹ چلاتا ہے۔ اگر آپ کے میزبان اسٹور سسٹم پر ایک مختلف صارف/ گروپ شناخت کی ملکیت ہے، ERDDAP اجازت کی وجہ سے تباہ ہو جائے گا۔ ان متغیرات کو آپس میں ملانے کے لئے ٹومکاٹ پر زور دیں

    :::اوپر
سرور پر آپ کا صارف ایوی ایشن تلاش کریں جہاں این ایف ایس ماؤنٹ اس طرح ہے: `id - <your-user_name> ` . . اس سے آپ کو ضرورت پڑنے والی نیوکلیائی قدر واپس مل جائے گی۔
    :::

-  ** ERDDAP _محفوظہ & ERDDAP _تاریخِ تبدیلی سے اورل** : کب ERDDAP کوبرنیٹز میں ایک سروس اور ایک انگرس کے پیچھے چلتی ہے، ٹومکاٹ کا خیال ہے کہ یہ مقامیہوست:8080 پر ٹریفک کی خدمت کر رہی ہے۔ یہ تبدیلی ERDDAP ' اندرونی طور پر پیدا ہونے والی نسل تاکہ تعلقات (اپنے دستور لاگو یا ڈیٹا سیٹ تعلقات کی طرح) آپ کے پبلک شناختی ڈومین نام سے درست طور پر حل.

:::نوٹ
اگر آپ الگ پروڈکشن اور QA ماحول چلا رہے ہیں تو ایک پی وی سی کو شیئر کرنے کے بارے میں محتاط رہیں ۔ ایک ماحول میں کیڈنگ ڈیٹا کو ختم کرنا یا اسے ختم کرنا دوسرے ماحول میں فوری طور پر متاثر ہوگا۔ ہم KA اور پروڈکشن کے لئے زیادہ ٹیکسوں کا استعمال کرتے ہوئے اس کا انتظام کرتے ہیں اور ہر سطح کے لیے ذیلی حصے شامل کرتے ہیں۔ اس سے ہم QA A پر ایک QA datasss کے ساتھ جانچ سکتے ہیں۔ پیداواری برآمدات کو چھونے سے پہلے XML.
:::
---

## 3۔ ذمہ‌داری : خدمت اور آغاز
آپ کو چھپانے کے لئے ERDDAP ویب پر آپ کو ایک سروس کی ضرورت ہوتی ہے تاکہ آپ اسے عوامی DNS کے نام سے باندھ سکیں ۔

فائل کا نام بنائیں `خدمت ۔` :
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

فائل کا نام بنائیں `گارے ۔` :
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
## ۴ ۔ ماحولیاتی انتظامیہ
جب آپ کی کارکردگی بڑھتی ہے تو مختلف ماحول کے لیے انفرادی طور پر یاسایل فائلوں کا انتظام کرتے ہیں۔ (مثلا، QA Vs. پروڈکشن) غلطی صریح غلطی پر ہے کوسوتس آپ کو "باس" کی حامل قرار دینے کے قابل بناتا ہے اور اس کے بعد "دورل" کا اطلاق مخصوص ماحول کے لیے تناسبات پر کرتا ہے۔ آپ کی جٹ ہبل کی خانقاہ میں درج ذیل فائلوں کو منظم کرتے ہیں۔

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

بنائیں `Kustomization.yaml` تمام وسائل جمع کرنے اور اپنے دستوری سیٹ اپ اور ڈیٹا سیٹس XML فائل کے لیے فائل۔ وہ آپ میں داخل ہو جائیں گے۔ ERDDAP اِس کے بعد آپ اُس کی تصویر بنا سکتے ہیں ۔ ERDDAP صفحہ اور اعداد و شمار آپ کے GitHub کے ذخیرہ سے اخذ کیے گئے اعداد و شمار میں شامل کرتے ہیں۔ `قبرص` ان کو آپ کے انکار پر نشان لگائیں.

#### بیس ( `بنیاد/kostomization.yaml` ) 
بنیادی طور پر آپ کے بنیادی وسائل کو مجموعی طور پر تقسیم کرتے ہیں. ہم پیداوار سنبھالتے ہیں۔ ` datasets.xml ` اور `تیار` بنیاد میں اور صرف کی اے اے پر امتحان کے بعد ان کو اپ ڈیٹ کیا.

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
ApiVersion: Kustomeze.c8s.io/v1beta1
رحمدلی :
نام: <your-erddap-namespace> 
وسائل:
- ۔ ۔ ۔ ۔ ۔ ۔ ۔ ۔ ۔
- گارے ۔
مدیر:
- نام: متعین کردہ-xl.
برتاؤ: # یہ حصہ مقامی سیٹ اپ فائل کو کیو ایم سے منسلک کر کے استعمال کرے گا.
فائلیں:
  - تیار
- نام: Datasets-xil
برتاؤ: # یہ آلہ مقامی اعداد و شمار Xml استعمال کرے گا تاکہ ڈیٹا سیٹس Xml کو کو QA Acentment میں اپلوڈ کیا جا سکے۔
فائلیں:
  -  datasets.xml 
غلطی:
- راستے: یامل
نام:  q-
لیبل:
- انتخاب کنندہ شامل: سچ ہے۔
جوڑے
ماحول :
```

And here's the corresponding Production `kustomization`:
```yaml
ApiVersion: Kustomeze.c8s.io/v1beta1
رحمدلی :
نام: <your-erddap-namespace> 
وسائل:
- ۔ ۔ ۔ ۔ ۔ ۔ ۔ ۔ ۔
- گارے ۔
غلطی:
- راستے: یامل
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
