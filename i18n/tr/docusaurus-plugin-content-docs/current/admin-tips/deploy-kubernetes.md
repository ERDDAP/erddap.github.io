# Nasıl işe alınır ERDDAP Kubernetes

Deploying ERDDAP Kubernetes, veri sunucunuz için ölçeklenebilir, dayanıklı bir ortam sağlar. Bu kılavuz, ev sahibi olmak için gerekli temel bileşenleri kapsar ERDDAP Standart kullanım standart kullanımı Kubernetes, kalıcı depolamayı yönetmek, uygulamayı dağıtmak, ağ kurmak ve küme içinde doğrudan yeni veri setlerini oluşturmak gibi ortaya çıkıyor.

## Ön Koşullar
Başlamadan önce, sahip olmanızı sağlayın:
- Bir koşu Kubernetes küme
-  `kubectl` kümenizle iletişim kurmak ve yapılandırın
- Kalıcı Volumes oluşturma yeteneğine sahip bir depolama göstergesi (PVs) 
- Senin Senin Senin `Kurulum.xml` ve ` datasets.xml ` Yüklemeye hazır olun
►

## 1. Kalıcı Depolama (PVC PVC PVC) 
 ERDDAP Önbellek dosyaları, logları ve pod yeniden başlatmaları için kalıcı depolama gerektirir. Kullanımı `PersistentVolumeClaim`   (PVC PVC PVC) Sizin için emin olun `Büyük Parent Yönetmeny`   (nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede nerede? ERDDAP Oluşturulan verilerini depolar) Bir pod aşağı giderse kaybolmaz. Bu hacim aynı zamanda ham veri dosyalarının yaşayacağınız veri depolama lokasyonuna da bağlanabilir.

Create a file named Create a file name `(İngilizce).` Bunun gibi:
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

:::ipucu
 **Not:** Depolama düzenlemeciniz Kubernetes kümesinde bulunan hacim iddiasını kurmak ve size vermek zorunda kalacak `DepolamaClassName` Daha önce buna bağlanabilirsiniz.
:::

----

## 2. The The The The The The The The ERDDAP Deployment
Deployment ortaya çıkıyor ERDDAP pod'un kendisi. Resmi erddap/erddap Docker imajını uzun vadeli destekle kullanmayı tavsiye ederiz.

:::Bilgi bilgi
2026 Mayıs itibariyle, [v2.30.00.0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) En son versiyondu. Bazen güvenlik açıklarını tutmak için yeniden çalışmak akıllıcadır.
:::

Bu yapılandırmada, zaman bölgesi ayarlarını ele almak için önemli çevresel değişkenleri enjekte ediyoruz, Tomcat'ın depolama hacmi için doğru okuma / yazma iznine sahip olmasını ve depolama hacmine ilişkin bilgilerine sahip olmasını sağlayın. ERDDAP Bir Kubernetes İngress arkasında otururken URL'leri nasıl doğru bir şekilde rotalayın. Ayrıca PVC'yi PVC'yi de aktık `/erddapData`   (varsayılan varsayılan `Büyük Parent Yönetmeny` ) enjekte etmek için datasets.xml ve kurulum.xml into `/usr/local/tomcat/content/erddap` .

Create a file named Create a file name `Dağıtım.ya ml` :

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
-  **TZ** : Tomcat sunucusu için zaman bölgesi ayarlar ve ERDDAP loglar.

-  **TOMCAT_USER_ID & TOMCAT_GROUP_ID** : Varsayılan olarak, ERDDAP konteyner, Tomcat'ı belirli bir kullanıcı olarak işletiyor. Eğer /erddapData'ya monte edilen kalıcı hacim, ev sahibi depolama sisteminizde farklı bir kullanıcı/grup kimliğine aitse, ERDDAP İzin verilen hataları nedeniyle kazaya uğrar. Bu değişkenleri ayarlama kimlikleri ile çalıştırmak için Tomcat'ı ayarlayın.

    :::ipucu
NFS Dağının böyle olduğu sunucuda kullanıcı UID'inizi bulun: `id -u <your-user_name> ` . Bu ihtiyacınız olan sayısal değeri geri getirecektir.
    :::

-  ** ERDDAP _baseUrl & ERDDAP _baseHttps Url** : When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When ERDDAP Kubernetes'te bir Hizmet ve İngress arkasında çalışır, Tomcat yerelhost:8080'da trafik hizmet ettiğini düşünüyor. Bu değişkenler override ERDDAP “İç URL nesli bu yüzden bağlantılar (Özel logonuz veya dataset bağlantıları gibi) Doğru şekilde halka açık yüz alan adınıza karar verin.

:::not not not not
Ayrı üretim ve QA ortamları kullanıyorsanız, tek bir PVC paylaşmak konusunda dikkatli olun. Bir ortamda önbelleklenen verileri değiştirmek hemen diğerini etkileyecektir. Bunu QA ve Production için dağıtımını kullanarak yönetiyoruz ve her overlay için alt katlayıcılar ekliyoruz. Bu, QA'da bir QA veri setleriyle test etmemizi sağlar. XML üretim dağıtımına dokunmadan önce.
:::
---

## 3. Ağlama: Servis ve Ingress
Sizi açığa çıkarmak için ERDDAP Web'e pod, iç küme trafiği yönlendirmek için bir servise ihtiyacınız var ve onu halka açık bir DNS adına bağlamak için bir Ingress.

Create a file named Create a file name `Servis.ya ml` :
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

Create a file named Create a file name `ingress.ya ml` :
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
## 4. Kusto ile Çevreleri Yönetin
Dağıtımınız büyüdükçe, farklı ortamlar için bireysel YAML dosyalarını yönetmek (e.g., QA vs. Production) Hata-prone olur. Kustotion, bir "Base" yapılandırmasını tanımlamanıza ve ardından belirli ortamlar için ayar ayarları uygulamanıza izin verir. GitHub repository'nizde dosyaları aşağıdaki gibi organize edin:

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

Oluşturun `kustomizasyon.yaml` Tüm kaynakları toplamak ve özel kurulumunuzu haritalayın ve veri setlerini XML dosyalarını haritalayın. Bunlar senin içine geçecek ERDDAP Docker görüntüsü ne zaman konuşulduğunda, böylece stilize edebilirsiniz ERDDAP Sayfa ve GitHub repository'den veri setlerini ekleyin, izin verirken `Kusto` Onları dağıtımına haritalayın.

#### Base Base ( `baz/kustomizasyon.ya ml` ) 
Temel kustomizasyon sadece overlays boyunca paylaşılan temel kaynaklarınızı birleştirir. Üretime devam ediyoruz ` datasets.xml ` ve `Kurulum.xml` Temelde ve bunları QA'da test ettikten sonra güncellemek.

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
apiVersion: kustotion.k8s.io/v1beta1
Tür: Kustomizasyon
namespace: <your-erddap-namespace> 
kaynaklar:
- .././base
- ingress.ya ml
YapıMapGenerator:
- Adı: kurulumu-xml
Davranış: Değiştir # Bu override, QA URL'den logo bağlantısı ile yerel kurulum dosyasını kullanacak.
dosyalar:
  - Kurulum.xml
- Adı: datasets-xml
Davranış: Değiştir # Bu override, QA dağıtımında veri setlerini xml güncellemek için yerel veri setlerini xml kullanacak.
dosyalar:
  -  datasets.xml 
yamalar:
- Yol: dağıtım. Ya ml
Ad: qa-
etiketler:
- Seçiciler: gerçek
çift:
Çevre: qa
```

And here's the corresponding Production `kustomization`:
```yaml
apiVersion: kustotion.k8s.io/v1beta1
Tür: Kustomizasyon
namespace: <your-erddap-namespace> 
kaynaklar:
- .././base
- ingress.ya ml
yamalar:
- Yol: dağıtım. Ya ml
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
