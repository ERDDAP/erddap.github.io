# যেভাবে গমন করতে হয় ERDDAP কুবরেটে

ডিপ্লোমা ERDDAP কুতারনেটেসে আপনার তথ্য সার্ভার সংক্রান্ত একটি স্ক্রিপ্যপূর্ণ এনভায়রনমেন্ট সরবরাহ করা হয়েছে। এই গাইডটি হোস্ট- এর জন্য প্রয়োজনীয় উপাদান উল্লেখ করে ERDDAP প্রমিত মান ব্যবহার করা হবে কুবাজারনেটস, যার মধ্যে রয়েছে লাগাতার সংরক্ষণ, অ্যাপ্লিকেশন চালু করা, নেটওয়ার্ক কনফিগার করা, এবং নতুন তথ্য ধারণ করা।

## পূর্বনির্দিষ্ট
শুরু করার পূর্বে, আপনাকে নিশ্চিত করতে হবে:
- একটি চলমান কুঞ্জারের গুচ্ছ
-  `কিলোবাইট` ইনস্টল করে কম্পিউটারের সাথে সংযোগ স্থাপন করা হয়েছে
- শব্দকোষ নির্মাণের জন্য একটি সংরক্ষণ ব্যবস্থা (PVS) 
- আপনার `উন্নত ব্যবস্থা।` এবং ` datasets.xml ` মাউন্ট করার জন্য প্রস্তুত
লোবাম্বা

## ১. পার্থজ (PVC) 
 ERDDAP ক্যাশে ফাইল, লগ- ইন ও অবস্থা পুনরায় চালু করার জন্য ধারাবাহিক সংগ্রহস্থলের প্রয়োজন। ব্যবহৃত হচ্ছে `পারটিগ্রেক্স`   (PVC) যে আপনার নিশ্চিত `স্বয়ংক্রিয় সংরক্ষণের ডিরেক্টরি`   (কোথায় ERDDAP স্টোরের তথ্য সংরক্ষণ করা হয়েছে) যদি কোন চেম্বার নষ্ট হয়ে যায় তাহলে হারিয়ে যাবে। এই ভলিউমের মধ্যে উপস্থিত তথ্য সংরক্ষণ করা হলে, তথ্য সংরক্ষণের উদ্দেশ্যে খোলা ফাইলগুলি মূল স্থানে করা যাবে।

একটি ফাইল নির্মাণ করুন `pvc.yml` যেমন:
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

:::পরামর্শ
 **উল্লেখ্য:** আপনার সংগ্রহকারীকে কুবাজারনেটের উপর দাবী করতে হবে এবং আপনাকে তা দিতে হবে `সংগ্রহস্থল সংরক্ষণ করুনName` সংযোগ স্থাপনের পূর্বে.
:::

---

## ২. এটা ERDDAP প্রেরণ
ডিপ্লোমা প্রকাশ করে দেয় ERDDAP নিজেকে মুক্ত করো। দীর্ঘ সময় ধরে সমর্থনের মাধ্যমে আমরা সরকারি/অনুরোধ/দাস ডকার ছবি ব্যবহার করার সুপারিশ করছি।

:::তথ্য
মে হতে, [v2 30. 30](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) সর্বশেষ সংস্করণটা ছিল। মাঝে মাঝে নিরাপত্তার সাথে মানিয়ে নেয়া বিজ্ঞতার কাজ।
:::

এই কনফিগারেশনের মধ্যে, সময়ের অঞ্চল সংক্রান্ত বৈশিষ্ট্য পরিচালনার উদ্দেশ্যে ব্যবহারযোগ্য কি-বাইন্ডিং ভেরিয়েবল সংক্রান্ত তথ্য চিহ্নিত করা হয়। ভলিউম আন-লক করার সময় সঠিক অনুমতি প্রদান করা হবে এবং বলো: ERDDAP কোয়েরনেট ইনগ্রেসের পিছনে বসে কিভাবে পথ অনুসরণ করতে হয়। আমরা PVC কে মাউন্ট করেছি `/erraplad`   (ডিফল্ট `স্বয়ংক্রিয় সংরক্ষণের ডিরেক্টরি` ) প্রবেশ করতে datasets.xml এবং প্রস্তুতি নাও। `/usr/local/bin/ সুদের মাত্রা` . .

একটি ফাইল নির্মাণ করুন `স্থাপনা` :

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
-  **তাজি** : টম্যাট সার্ভার এবং সময় অঞ্চল নির্ধারণ করে ERDDAP লগ।

-  **হোস্ট-নেম (_T)** : ডিফল্ট হিসাবে, ERDDAP কন্টেইনার টমকে একজন বিশেষ ব্যবহারকারী হিসেবে চালান । ব্যবহারকারীর দ্বারা সিস্টেমের মধ্যে উপস্থিত লগ-ইন ভিত্তিক ID পৃথক ব্যবহারকারী দ্বারা আপনার ব্যবহৃত হলে স্থায়ীরূপে ভলিউম মাউন্ট করা হবে। ERDDAP অনুমতি প্রত্যাখ্যান করার সময় বিপর্যয় সংক্রান্ত সমস্যা দেখা দিয়েছে। মিল পাওয়া গিয়েছে.

    :::পরামর্শ
ব্যবহৃত NFS মাউন্টের জন্য অন্য কোনো ব্যবহারকারীর UID অনুসন্ধান করুন: `আইডি - রো <your-user_name> ` . . এর মান আপনার প্রয়োজন হবে.
    :::

-  ** ERDDAP বিপরীত দিশায় ক্রমবিন্যাস (_B) ERDDAP টুল-বার (_T) ইউলার** : কখন ERDDAP একটি সার্ভিস এবং ইনগ্রেসের পেছনে কুবাজারেট চালায়, টম্যাট মনে করে যে এটা স্থানীয় হোস্ট: ৮০। এই ভেরিয়েবলগুলি অগ্রাহ্য করা হবে ERDDAP 'অভ্যন্তরীণ অভ্যন্তরীণ ইউ. আর. এল. সংখ্যা' যাতে লিংক (স্বনির্বাচিত লোগো অথবা ডাটা লিঙ্কের পছন্দ) আপনার পাবলিক-ফাইিং ডোমেইনের নাম সঠিকভাবে সমাধান করুন।

:::নোট
যদি আপনি পৃথক উৎপাদন পদ্ধতি এবং কিউএ পরিবেশ পরিচালনা করেন, তাহলে একক পিভিসি শেয়ার করার ব্যাপারে সতর্ক থাকবেন। এক বা একাধিক ফাইলে ক্যাশে তথ্য মুছে ফেলা হবে অথবা সেটি আবর্জনার বাক্সে স্থানান্তর করা হলে অন্য কোনো কাজে প্রভাব ফেলবে। আমরা এটা দিয়ে কিউএ এবং উৎপাদনশীলতা এবং প্রতিটি ওভারলে উপ-তৃতি যোগ করবো। এটি আমাদের কিউএ-এর একটি কিউএ ডাটাসেট দিয়ে পরীক্ষার অনুমতি দেয়। উৎপাদন কেন্দ্র স্পর্শ করার আগে XML।
:::
---

## ৩. নেটওয়ার্ক: সার্ভিস এবং ইনগ্রিটর
আপনার উন্মোচন ERDDAP ওয়েবের কাছে, তোমাকে একটা সার্ভিস সার্ভিসের দরকার যাতে অভ্যন্তরীণ সেতুর ট্রাফিক পার হতে পারে, আর একটা ইনগা্রেস যাতে পাবলিক ডিএনএস নামের সাথে বাঁধতে পারে।

একটি ফাইল নির্মাণ করুন `সার্ভিস` :
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

একটি ফাইল নির্মাণ করুন `ইনস্টল` :
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
## ৪। কার সঙ্গে ব্যবস্থাপনাকারী পরিবেশ
বিভিন্ন পরিবেশের জন্য DAMAML ফাইল পরিচালনা এবং পরিচালনা করুন (উদাহরণ, কিউএ বনাম উৎপাদন) সমস্যা হয়. Kemize আপনাকে "Bible" কনফিগারেশন নির্ধারণ করতে দেয় এবং তারপর নির্দিষ্ট পরিবেশের জন্য "powerels" সেটিংস প্রয়োগ করে । আপনার গিটহাব রিপোজিটরিতে ফাইল সংগঠিত করুন:

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

নির্মাণ করুন `বার্তা তালিকা - নতুন বার্তা` সকল রিসোর্স ও ম্যাপ ফাইল একত্রিত করার জন্য আপনার স্বনির্ধারিত বৈশিষ্ট্য নির্ধারণ করুন। এটা আপনার মধ্যে পাস হবে ERDDAP ডকার ছবি যখনই আপনি ব্যবহার করতে পারেন ERDDAP আপনার গিটহাব রিপোজিটরি থেকে তথ্য এবং যোগ করুন `স্বনির্ধারিত` তাদের জাহাজ ঠিক করো.

#### ভিত্তি ( `বেস /kuchart.ymam2` ) 
মূল কবেশন শুধু আপনার মূল সম্পদ ওভারলে ভাগ করে। আমরা প্রোডাকশন রাখা ` datasets.xml ` এবং `উন্নত ব্যবস্থা।` শুধু কিউএ-এর পরীক্ষার পর এটা আপডেট করে।

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
APViders: kus.config.k.8.
ব্যবহার: স্বনির্বাচিত
নেমস্পেস: <your-erddap-namespace> 
সামগ্রী:
- ../.
- ইনস্টল
কনফিগারেশন
- নাম:
আচরণ: # QA URL- র সাহায্যে স্থানীয় স্থাপনার জন্য ব্যবহার করা হবে ।
ফাইল:
  - উন্নত ব্যবস্থা।
- নাম: ক্যালেইন
আচরণ: # ডি. এন. এস.
ফাইল:
  -  datasets.xml 
প্যাচ:
- রাস্তা: স্থাপনা। ইয়াল
নাম:
লেবেল:
- নির্বাচন ব্যবস্থা
জুটি:
পরিবেশ: ক্যালা
```

And here's the corresponding Production `kustomization`:
```yaml
APViders: kus.config.k.8.
ব্যবহার: স্বনির্বাচিত
নেমস্পেস: <your-erddap-namespace> 
সামগ্রী:
- ../.
- ইনস্টল
প্যাচ:
- রাস্তা: স্থাপনা। ইয়াল
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
