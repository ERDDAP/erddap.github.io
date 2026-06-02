# कैसे तैनात करें ERDDAP Kubernetes

तैनाती ERDDAP Kubernetes पर अपने डेटा सर्वर के लिए एक स्केलेबल, लचीला वातावरण प्रदान करता है। यह गाइड मेजबान के लिए आवश्यक आवश्यक घटक को कवर करता है ERDDAP मानक का उपयोग Kubernetes प्रकट होता है, जिसमें लगातार भंडारण का प्रबंधन, एप्लिकेशन को तैनात करना, नेटवर्किंग को कॉन्फ़िगर करना और क्लस्टर के भीतर सीधे नए डेटासेट XML उत्पन्न करना शामिल है।

## आवश्यकता
शुरू होने से पहले, सुनिश्चित करें कि आपके पास है:
- एक चल Kubernetes क्लस्टर
-  `kubectl` अपने क्लस्टर के साथ संवाद करने के लिए स्थापित और कॉन्फ़िगर किया गया
- एक भंडारण अनंतिम persistent Volumes बनाने में सक्षम (पीवी) 
- आपका `साइटमैप` और ` datasets.xml ` घुड़सवार होना
-----

## 1. लगातार भंडारण (पीवीसी) 
 ERDDAP कैश फ़ाइलों को बनाए रखने के लिए लगातार भंडारण की आवश्यकता होती है, लॉग और पोड पुनः आरंभ में राज्य। उपयोग करना `PersistentVolumeClaim`   (पीवीसी) सुनिश्चित करता है कि आपका `बड़ाParentDirectory`   (कहाँ ERDDAP अपने उत्पन्न डेटा स्टोर) अगर कोई पोड नीचे जाता है तो खो नहीं जाता है। इस वॉल्यूम को आपके डेटा स्टोरेज स्थान से भी जोड़ा जा सकता है जहां कच्चे डेटा फ़ाइलों को जीना होगा।

नाम की एक फ़ाइल बनाएं `पीवीसी` इसी तरह:
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

:::टिप
 **ध्यान दें:** आपके भंडारण प्रावधानकर्ता को कुबेर्नेट्स क्लस्टर पर वॉल्यूम दावा स्थापित करने और आपको देने की आवश्यकता होगी। `स्टोरेज क्लासनाम` इससे पहले कि आप इससे जुड़ सकते हैं।
:::

-----

## 2. The The most of the ERDDAP तैनाती
तैनाती प्रकट होने का प्रबंधन करता है ERDDAP खुद को पोड करें। हम लंबी अवधि के समर्थन के साथ आधिकारिक erddap/erddap Docker छवि का उपयोग करने की सलाह देते हैं।

:::जानकारी
मई 2026 तक [v2.30.0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) नवीनतम संस्करण था। कभी-कभी सुरक्षा कमजोरियों के साथ रहने के लिए इसे फिर से लागू करने के लिए बुद्धिमान है।
:::

इस विन्यास में, हम टाइमज़ोन सेटिंग्स को संभालने के लिए प्रमुख पर्यावरण चर इंजेक्ट करते हैं, यह सुनिश्चित करते हैं कि टॉमकैट के पास स्टोरेज वॉल्यूम के लिए सही रीड / राइट अनुमतियां हैं, और बताते हैं कि टॉमकैट के पास स्टोरेज वॉल्यूम के लिए सही रीड / राइट अनुमतियां हैं। ERDDAP कैसे ठीक से यूआरएल रूट करने के लिए जब एक Kubernetes प्रवेश के पीछे बैठे। हम पीवीसी को भी माउंट करते हैं `/erddapData`   (डिफ़ॉल्ट `बड़ाParentDirectory` ) इंजेक्शन datasets.xml और सेटअप.xml में `/usr/local/tomcat/content/erddap` ।

नाम की एक फ़ाइल बनाएं `तैनाती.yaml` :

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
-  **TZ** : टॉमकैट सर्वर के लिए टाइमज़ोन सेट करता है और ERDDAP लॉग

-  **TOMCAT_USER_ID & TOMCAT_GROUP_ID** : डिफ़ॉल्ट रूप से, ERDDAP कंटेनर एक विशिष्ट उपयोगकर्ता के रूप में टॉमकैट चलाता है। यदि लगातार मात्रा /erddapData पर चढ़कर आपके होस्ट स्टोरेज सिस्टम पर एक अलग उपयोगकर्ता / समूह आईडी के स्वामित्व में है, ERDDAP अनुमति अस्वीकार त्रुटियों के कारण दुर्घटनाग्रस्त हो जाएगा। इन चरों की स्थापना से टॉमकैट को मिलान आईडी के साथ चलाने के लिए मजबूर किया जाता है।

    :::टिप
सर्वर पर अपने उपयोगकर्ता UID खोजें जहां NFS माउंट इस तरह है: `id -u <your-user_name> ` । यह आपको आवश्यक संख्यात्मक मान लौटा देगा।
    :::

-  ** ERDDAP _baseUrl ERDDAP बेसहैट Url** : कब ERDDAP एक सेवा और एक प्रवेश के पीछे Kubernetes में चलाता है, टॉमकैट लगता है कि यह स्थानीय होस्ट: 8080 पर यातायात की सेवा कर रहा है। ये चर ओवरराइड ERDDAP ’ s आंतरिक URL जनरेशन (अपने कस्टम लोगो या डेटासेट लिंक की तरह) अपने डोमेन नाम को सही ढंग से हल करें।

:::नोट
यदि आप अलग उत्पादन और क्यूए वातावरण चल रहे हैं, तो एक एकल पीवीसी साझा करने के बारे में सावधान रहें। एक वातावरण में कैश डेटा को संशोधित या हटाने से तुरंत दूसरे को प्रभावित होगा। हम क्यूए और प्रोडक्शन के लिए इस तैनाती ओवरले का प्रबंधन करते हैं और प्रत्येक ओवरले के लिए सबफ़ोल्डर्स को जोड़ते हैं। यह हमें क्यूए डेटासेट के साथ क्यूए पर परीक्षण करने की अनुमति देता है। एक्सएमएल उत्पादन तैनाती को छूने से पहले।
:::
---

## 3. नेटवर्किंग: सेवा और प्रवेश
अपने को उजागर करने के लिए ERDDAP वेब के लिए फली, आपको आंतरिक क्लस्टर यातायात मार्ग करने के लिए एक सेवा की आवश्यकता है, और इसे सार्वजनिक DNS नाम से बांधने के लिए एक प्रवेश की आवश्यकता है।

नाम की एक फ़ाइल बनाएं `सेवा` :
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

नाम की एक फ़ाइल बनाएं `ingress.yaml` :
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
## 4. कुस्टोमाइज़ के साथ वातावरण का प्रबंधन
चूंकि आपकी तैनाती बढ़ती है, अलग-अलग वातावरणों के लिए व्यक्तिगत YAML फ़ाइलों को प्रबंधित करना (उदाहरण के लिए, QA बनाम उत्पादन) त्रुटि-प्रवण हो जाता है। Kustomize आपको "Base" विन्यास को परिभाषित करने की अनुमति देता है और फिर विशिष्ट वातावरण के लिए सेटिंग्स को ट्वीक करने के लिए "Overlays" लागू करता है। अपने GitHub भंडार में, फ़ाइलों को निम्नानुसार व्यवस्थित करें:

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

बनाना `kustomization.yaml` सभी संसाधनों को इकट्ठा करने और अपने कस्टम सेटअप और डेटासेट XML फ़ाइलों को मैप करने के लिए फ़ाइल। ये आपके पास आएंगे ERDDAP जब तैनात किया गया तो डोकर छवि, ताकि आप अपनी शैली बना सकें ERDDAP पृष्ठ और अपने गिटहब भंडार से डेटासेट जोड़ने जबकि देते हैं `कस्टोम` उन्हें अपनी तैनाती के लिए मैप करें।

#### बेस ( `बेस / kstomization.yaml` ) 
बेस कुस्टोमाइज़ेशन बस ओवरले में साझा किए गए अपने कोर संसाधनों को बंडल करता है। हम उत्पादन करते हैं ` datasets.xml ` और `साइटमैप` आधार में और केवल QA पर परीक्षण के बाद इन अद्यतन।

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
प्रकार: Kustomization
नामस्थान: <your-erddap-namespace> 
संसाधन:
- ../.. /base
- ingress.yaml
विन्यास MapGenerator:
- नाम: सेटअप-xml
व्यवहार: # बदलें यह ओवरराइड QA URL से लोगो लिंक के साथ स्थानीय सेटअप फ़ाइल का उपयोग करेगा।
फ़ाइलें:
  - साइटमैप
- नाम: डेटासेट-xml
व्यवहार: # बदलें यह ओवरराइड QA तैनाती में डेटासेट xml को अद्यतन करने के लिए स्थानीय डेटासेट xml का उपयोग करेगा।
फ़ाइलें:
  -  datasets.xml 
पैच:
- पथ: तैनाती। yaml
NamePrefix: qa-
लेबल:
- चयनकर्ता: सच
जोड़े:
पर्यावरण: क्यूए
```

And here's the corresponding Production `kustomization`:
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
प्रकार: Kustomization
नामस्थान: <your-erddap-namespace> 
संसाधन:
- ../.. /base
- ingress.yaml
पैच:
- पथ: तैनाती। yaml
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
