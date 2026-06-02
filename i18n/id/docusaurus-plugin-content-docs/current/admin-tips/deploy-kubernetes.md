# Cara Menyebarkan ERDDAP di Kubernetes

Login ERDDAP di Kubernetes menyediakan lingkungan yang dapat diandalkan untuk server data Anda. Panduan ini mencakup komponen penting yang diperlukan untuk tuan rumah ERDDAP menggunakan standar Kubernetes memanifestasikan, termasuk mengelola penyimpanan terus-menerus, menyebarkan aplikasi, mengonfigurasi jaringan, dan menghasilkan dataset XML baru langsung dari dalam cluster.

## Login
Sebelum Anda mulai, pastikan Anda memiliki:
- Login
-  `Login` dipasang dan dikonfigurasi untuk berkomunikasi dengan kluster Anda
- Penyedia penyimpanan yang mampu menciptakan Volume Persistent (Login) 
- Login `WordPress.org` Login ` datasets.xml ` siap dipasang
-----

## Sitemap Penyimpanan Persistent (Login) 
 ERDDAP memerlukan penyimpanan terus-menerus untuk mempertahankan file cache, log, dan state di restart pod. Menggunakan `Login`   (Login) memastikan bahwa Anda `Login`   (Sitemap ERDDAP menyimpan data yang dihasilkan) tidak hilang jika Pod turun. Meme it Volume ini juga dapat dihubungkan ke lokasi penyimpanan data Anda di mana file data baku akan hidup.

Buat file bernama `pvc.yaml` seperti itu:
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

:::Login
 **Catatan:** Penyedia penyimpanan Anda harus mengatur klaim volume pada kluster Kubernetes dan memberi Anda `Login` sebelum Anda dapat menghubungkannya. Meme it
:::

Sitemap

## 2. di Login ERDDAP Login
Manifest Deployment mengelola ERDDAP Login Kami merekomendasikan menggunakan gambar Docker erddap/erddap resmi dengan dukungan jangka panjang.

:::Sitemap
Pada tanggal 2026 Mei, [v2.30.0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) adalah versi terbaru. Hal ini bijaksana untuk menyebarkan sesekali untuk menjaga kerentanan keamanan.
:::

Dalam konfigurasi ini, kami menyuntikkan variabel lingkungan kunci untuk menangani pengaturan zona waktu, memastikan Tomcat memiliki izin baca / tulis yang benar untuk volume penyimpanan, dan memberitahukan ERDDAP bagaimana untuk benar rute URL ketika duduk di balik Ingress Kubernetes. Kami juga memasang PVC ke `Login`   (Login `Login` ) untuk menyuntikkan datasets.xml dan setup.xml ke `/usr/local/tomcat/datasheet` Sitemap

Buat file bernama `Login` Sitemap

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
-  **Login** Sitemap Mengatur zona waktu untuk server Tomcat dan ERDDAP login

-  **Facebook Twitter Google Plus Pinterest Email** Sitemap Login ERDDAP kontainer berjalan Tomcat sebagai pengguna tertentu. Jika volume tetap dipasang ke /erddapData dimiliki oleh ID pengguna / kelompok yang berbeda pada sistem penyimpanan host Anda, ERDDAP akan jatuh karena kesalahan yang ditolak izin. Menyiapkan variabel ini memaksa Tomcat untuk berjalan dengan ID yang cocok.

    :::Login
Menemukan UID pengguna Anda di server di mana gunung NFS seperti ini: `Login <your-user_name> ` Sitemap Ini akan mengembalikan nilai numerik yang Anda butuhkan.
    :::

-  ** ERDDAP Sitemap ERDDAP Login Sitemap** Sitemap Sitemap ERDDAP berjalan di Kubernetes di balik Layanan dan Ingress, Tomcat berpikir itu melayani lalu lintas di localhost:8080. variabel ini override ERDDAP generasi URL internal sehingga tautan (seperti logo atau tautan dataset kustom Anda) benar menyelesaikan nama domain publik Anda.

:::Login
Jika Anda menjalankan lingkungan Produksi dan QA yang terpisah, berhati-hati untuk berbagi PVC tunggal. Modifikasi atau menghapus data cache dalam satu lingkungan akan segera mempengaruhi yang lain. Kami mengelola overlay penggunaan ini untuk QA dan Produksi dan menambahkan subfolder untuk setiap overlay. Ini memungkinkan kita untuk menguji QA dengan set data QA. XML sebelum menyentuh penyebaran produksi.
:::
---

## 3. Juni Jaringan: Layanan dan Ingress
Untuk mengekspos Anda ERDDAP Pod ke web, Anda memerlukan Layanan untuk mengarahkan lalu lintas cluster internal, dan Ingress untuk mengikatnya dengan nama DNS publik.

Buat file bernama `service.yaml` Sitemap
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

Buat file bernama `ingress.yaml` Sitemap
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
## 4. Oktober Mengelola Lingkungan dengan Kustomisasi
Ketika penyebaran Anda tumbuh, mengelola file YAML individu untuk lingkungan yang berbeda (e.g., QA vs. Produksi) menjadi kesalahan-prone. Kustomisasi memungkinkan Anda untuk menentukan konfigurasi "Base" dan kemudian menerapkan "Overlays" untuk mengubah pengaturan untuk lingkungan tertentu. Dalam repositori GitHub Anda, mengatur file sebagai berikut:

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

Login `Login` file untuk mengumpulkan semua sumber daya dan peta setup kustom Anda dan file XML. Ini akan dilewatkan ke dalam Anda ERDDAP Gambar Docker ketika dimanfaatkan sehingga Anda dapat gaya Anda ERDDAP halaman dan tambahkan data set dari repositori GitHub Anda sambil membiarkan `Login` peta mereka ke penyebaran Anda.

#### Login ( `info@kustomization.yaml` ) 
Kustomisasi dasar cukup bundel sumber daya inti Anda bersama di overlay. Kami menjaga produksi ` datasets.xml ` Login `WordPress.org` dalam dasar dan hanya memperbarui ini setelah pengujian di QA.

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
apiVersion: customize.config.k8s.io/v1beta1
jenis: Kustomisasi
Login <your-erddap-namespace> 
sumber daya:
- Sitemap
- ingress.yaml
configMapGenerator
- Nama: setup-xml
perilaku: mengganti # Override ini akan menggunakan file setup lokal dengan tautan logo dari URL QA.
file:
  - WordPress.org
- Nama: dataset-xml
perilaku: mengganti # Override ini akan menggunakan dataset lokal xml untuk memperbarui dataset xml dalam penyebaran QA.
file:
  -  datasets.xml 
Sitemap
- jalan: penyebaran. Login
NamaPrefix: qa-
label:
- termasukPilihan: benar
pasangan:
lingkungan: qa
```

And here's the corresponding Production `kustomization`:
```yaml
apiVersion: customize.config.k8s.io/v1beta1
jenis: Kustomisasi
Login <your-erddap-namespace> 
sumber daya:
- Sitemap
- ingress.yaml
Sitemap
- jalan: penyebaran. Login
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
