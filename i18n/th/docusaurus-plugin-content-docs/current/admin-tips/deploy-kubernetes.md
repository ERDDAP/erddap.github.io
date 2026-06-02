# จะ ทํา อย่าง ไร ดี? ERDDAP บน คู เบอร์ เนส์

การลงเล่น ERDDAP บนคูแบร์เน็ตส์ เป็นสภาพแวดล้อมที่ทนทานและยืดหยุ่นได้ สําหรับเซิร์ฟเวอร์ข้อมูลของคุณ ส่วนเสริมนี้ครอบคลุมส่วนประกอบที่จําเป็นในการใช้โฮสต์ ERDDAP ใช้มาตรฐาน Kubernetes ออกรายการรวมไปถึงการจัดการจัดเก็บอย่างต่อเนื่อง, ใช้งานโปรแกรม, การปรับแต่งเครือข่าย, และสร้างข้อมูลใหม่ชุด XML โดยตรงจากภายในกลุ่ม.

## ความแหลม:
ก่อนที่คุณจะเริ่มต้นแน่ใจว่าคุณมี:
- กระจุก ดาว คู เบอร์ เนส ที่ กําลัง วิ่ง
-  `Kubjectl` ติดตั้งและปรับแต่งให้สื่อสารกับกลุ่มย่อยของคุณ
- เครื่อง สํารอง ที่ สามารถ สร้าง ปริมาตร ต่อ เนื่อง ได้ (แบบ PV) 
- คุณ `ตั้งค่า. xml` ถึง ` datasets.xml ` พร้อมที่จะถูกเมานท์
---

## 1 การจัดเก็บต่อเนื่อง (แบบ PVC) 
 ERDDAP ต้องการ การ เก็บ อย่าง ต่อ เนื่อง เพื่อ คง ไว้ ซึ่ง แคช, ล็อก, และ รัฐ ต่าง ๆ ที่ อยู่ เหนือ ฝัก จะ เริ่ม ต้น ใหม่. ใช้ `ต่อเนื่อง VolumeClamm`   (แบบ PVC) เพื่อให้แน่ใจว่า `เครื่อง มือ ขนาด ใหญ่`   (ที่ไหน ERDDAP เก็บข้อมูลที่ถูกสร้าง) จะไม่หลงถ้าฝักลงไป ระดับเสียงนี้สามารถเชื่อมโยงไปยังตําแหน่งเก็บข้อมูลของคุณได้ โดยมีแฟ้มข้อมูลดิบมีชีวิตอยู่

สร้างแฟ้มชื่อ `ขนาด pvc. yaml` เช่น:
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

:::เคล็ดลับ
 **หมายเหตุ:** เครื่องอุปโภค บริโภค ของ คุณ จะ ต้อง กําหนด ปริมาณ ใน การ อ้าง ถึง กระจุก ดาว คู เบอร์ เนส และ ให้ คุณ `จัดเก็บแฟ้มName` ก่อนที่คุณจะเชื่อมต่อกับมัน
:::

---

## 2 เดอะ ERDDAP การ ว่าง งาน
รายการ การ ลง มือ ทํา งาน จัด การ ERDDAP กระสวยเอง เราขอแนะนําให้ใช้ภาพของอาร์ดแนป/เซอร์แดป ดอกเกอร์อย่างไม่เป็นทางการ

:::ข้อมูล
2026 เมื่อ พ.ศ. [v2.30.0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) เป็นฉบับล่าสุด เป็นการฉลาดที่บางครั้งจะลดความเร็วลง เพื่อตามความไม่มั่นคงของความปลอดภัย
:::

ในการปรับแต่งนี้ เราได้ฉีดตัวแปรแวดล้อมที่สําคัญ เพื่อจัดการการตั้งค่าเขตเวลา เพื่อให้แน่ใจว่าทอมแคทมีสิทธิ์ในการอ่าน/เขียนได้ถูกต้องสําหรับโวลต์จัดเก็บ และบอก ERDDAP วิธีทําเส้นทางที่อยู่ URL อย่างเหมาะสม เมื่อนั่งหลังคูเบอร์เน็ตต์แบบรุก เราเพิ่ม PVC ให้ `เคอร์ดัปดาต้า`   (ค่าปริยาย `เครื่อง มือ ขนาด ใหญ่` ) เพื่อฉีด datasets.xml และตั้งค่า.xml เข้าไป `/ usr/ local/tomcat/ content/erdap` .

สร้างแฟ้มชื่อ `เรียกใช้งาน aml` .

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
-  **ขนาด TZ** . ตั้งค่าเขตเวลาสําหรับเซิร์ฟเวอร์ Tomcat ERDDAP ล็อก

-  **TOMCAT_SUID & TOMCAT_GUP_ID** . โดยปริยายแล้ว ERDDAP ตู้คอนเทนเนอร์ใช้ Tomcat เป็นผู้ใช้เฉพาะ หากโวลุมถาวรถูกเมานท์ไปยัง / serdapdata โดยหมายเลขผู้ใช้/กลุ่มผู้ใช้อื่นในระบบแฟ้มของคุณ ERDDAP จะเกิดความผิดพลาดเนื่องจากสิทธิ์ที่อนุญาต การกําหนดตัวแปรเหล่านี้บังคับให้ทอมแคท ทํางานกับ ID ที่ตรงกับ

    :::เคล็ดลับ
ค้นหาผู้ใช้ของคุณหมายเลขผู้ใช้บนเซิร์ฟเวอร์ที่จุดเมานท์ NFS เป็นเช่นนี้: `ไอดี-ยู <your-user_name> ` . นี่จะเป็นค่าตัวเลขที่คุณต้องการ
    :::

-  ** ERDDAP _ล้างข้อมูล ERDDAP _พื้นฐาน Url** . เมื่อ ERDDAP ทํางานในคูแบร์เน็ตส์ เบื้องหลังบริการ และอินเทรียล ทอมแคทคิดว่ากําลังให้บริการการจราจร บนเครื่องในท้องถิ่น:8080. การแทนที่ตัวแปรเหล่านี้ ERDDAP รุ่นที่อยู่ URL ภายในเพื่อให้ลิงก์ (เช่น โลโก้หรือลิงก์ที่กําหนดเอง) แก้ไขให้ถูกต้องกับชื่อโดเมนของคุณ

:::ข้อความ
ถ้าคุณทํางานแยกโปรดักชันและ QA สภาพแวดล้อม โปรดระวังเกี่ยวกับการใช้ PVC ร่วมกัน การ แก้ไข หรือ ลบ ข้อมูล ที่ เก็บ ไว้ ใน สภาพ แวด ล้อม หนึ่ง ๆ จะ ส่ง ผล กระทบ ต่อ อีก สภาพ การณ์ หนึ่ง ทันที. เราจัดการมันโดยใช้ส่วนทับของ QA และผลิตและเพิ่มโฟลเดอร์ย่อยในแต่ละชั้น นี่ช่วยให้เราทดสอบ QA ด้วยชุดข้อมูล QA  XML ก่อนจะสัมผัสตัวโปรแกรมการผลิต
:::
---

## 3 ระบบเครือข่าย: บริการ และ ความ ดันทุรัง
เพื่อเปิดเผยตัวตนของคุณ ERDDAP กระสวยไปที่เว็บ คุณจําเป็นต้องมีบริการในการเส้นทาง การจราจรภายในกลุ่ม และอินแอร์จะผูกมันเข้ากับชื่อ DNS ของสาธารณชน

สร้างแฟ้มชื่อ `บริการ aml` .
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

สร้างแฟ้มชื่อ `การละเมิดลิขสิทธิ์` .
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
## 4 การ ดู แล สิ่ง แวด ล้อม กับ คุ ส โต มิช
ขณะที่การใช้งานของคุณเพิ่มขึ้น จัดการแฟ้ม YAML แต่ละตัวสําหรับสภาพแวดล้อมที่แตกต่างกัน (e.g., QA vs. Profile) กลายเป็นความคลาดเคลื่อน Kustomize ให้คุณได้กําหนดการปรับแต่ง "Base" จากนั้นให้ใช้ "Offle" เพื่อปรับการตั้งค่าสําหรับสภาพแวดล้อมเฉพาะ ในคลังเก็บ GitHub ของคุณ ให้จัดการแฟ้มต่าง ๆ ดังต่อไปนี้:

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

สร้าง `การทํา kustomization. yaml` แฟ้มที่จะใช้เก็บทรัพยากรและแผนที่ต่าง ๆ ที่ตั้งค่าและชุดข้อมูล XML ที่กําหนดเองของคุณ มันจะถูกส่งต่อไปยังคุณ ERDDAP อิมเมจของโดกเกอร์เมื่อใช้งานเพื่อให้คุณสามารถฟอร์แมตของคุณได้ ERDDAP หน้าและเพิ่มชุดข้อมูลต่าง ๆ จากคลังข้อมูล GitHub ของคุณในขณะที่ให้ `ลูกบาศก์` ทําแผนที่ไปที่ระบบของคุณ

#### ฐาน ( `ฐาน/ การขยายสัญญาณ` ) 
การแบ่งตัวของฐาน ก็แค่รวมทรัพยากรหลักของคุณเข้าด้วยกัน เราเก็บการผลิต ` datasets.xml ` ถึง `ตั้งค่า. xml` ในฐานและการปรับปรุงเท่านั้น หลังจากการทดสอบบน QA

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
ApiVersion: kustomize.config.k8s.io/v1beta1
กรุณา: การ คุม กําเนิด
ชื่อแฟ้ม: <your-erddap-namespace> 
ทรัพยากร:
- . /. เบส
- การละเมิดลิขสิทธิ์
เครื่องมือปรับแต่ง:
- ชื่อ: ตั้งค่า- xml
พฤติกรรม:แทนที่ # override นี้จะใช้แฟ้มการตั้งค่าภายในระบบโดยใช้โลโก้ที่อยู่เชื่อมโยงจากที่อยู่ URL QA
แฟ้ม:
  - ตั้งค่า. xml
- ชื่อ: ชุดข้อมูล- xml
พฤติกรรม:แทนที่ # override นี้จะใช้ชุดข้อมูลภายในระบบ xml เพื่อปรับปรุงชุดข้อมูล xml ในระบบ QA
แฟ้ม:
  -  datasets.xml 
แผ่น:
- เส้นทาง: การใช้งาน มัน
ชื่อโครงการ:
ป้าย:
- ตัวเลือก: จริง
จํานวนคู่:
สภาพแวดล้อม: ค.ศ.
```

And here's the corresponding Production `kustomization`:
```yaml
ApiVersion: kustomize.config.k8s.io/v1beta1
กรุณา: การ คุม กําเนิด
ชื่อแฟ้ม: <your-erddap-namespace> 
ทรัพยากร:
- . /. เบส
- การละเมิดลิขสิทธิ์
แผ่น:
- เส้นทาง: การใช้งาน มัน
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
