# Πώς να Αναπτύξετε ERDDAP σε Kubernetes

Ανάπτυξη ERDDAP στο Kubernetes παρέχει ένα κλιμακωτό, ανθεκτικό περιβάλλον για το διακομιστή δεδομένων σας. Ο οδηγός αυτός καλύπτει τα βασικά συστατικά στοιχεία που απαιτούνται για την υποδοχή ERDDAP χρησιμοποιώντας το πρότυπο Kubernetes δηλώνει, συμπεριλαμβανομένης της διαχείρισης της διαρκούς αποθήκευσης, την ανάπτυξη της εφαρμογής, τη ρύθμιση της δικτύωσης, και τη δημιουργία νέων σύνολο δεδομένων XMLs απευθείας από το σύνολο.

## Προαπαιτούμενα
Πριν ξεκινήσετε, βεβαιωθείτε ότι έχετε:
- Ένα τρέχον σύμπλεγμα Kubernetes
-  `κιβέκτη` εγκατεστημένο και ρυθμισμένο για να επικοινωνεί με το σμήνος σας
- Ένας προμηθευτής αποθήκευσης που μπορεί να δημιουργήσει μόνιμους τόμους (PVs) 
- Το δικό σου `setup.xml` και ` datasets.xml ` έτοιμο προς τοποθέτηση
-----

## 1. Επίμονη αποθήκευση (PVC) 
 ERDDAP απαιτεί μόνιμη αποθήκευση για τη διατήρηση αρχείων λανθάνουσας μνήμης, αρχείων καταγραφής και την κατάσταση σε όλες τις επανεκκινήσεις pod. Χρήση ενός `Επίμονος τόμος`   (PVC) εξασφαλίζει ότι σας `bigParentΚατάλογος`   (όπου ERDDAP αποθηκεύει τα παραγόμενα δεδομένα του) Δεν χάνεται αν πέσει μια κάψουλα. Αυτός ο όγκος μπορεί επίσης να συνδεθεί με την τοποθεσία αποθήκευσης δεδομένων σας όπου θα ζουν τα ακατέργαστα αρχεία δεδομένων.

Δημιουργία ενός αρχείου με όνομα `pvc.yaml (στα Αγγλικά)` Έτσι:
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

:::άκρη
 **Σημείωση:** Ο προμηθευτής αποθήκευσης σας θα πρέπει να δημιουργήσει την απαίτηση έντασης στο σύμπλεγμα Kubernetes και να σας δώσει το `κλάση αποθήκευσηςName` πριν μπορέσεις να συνδεθείς με αυτό.
:::

----

## 2. Η ERDDAP Ανάπτυξη
Η δήλωση ανάπτυξης διαχειρίζεται το ERDDAP Το ίδιο το σκάφος. Σας συνιστούμε να χρησιμοποιήσετε την επίσημη εικόνα erddap/erddap Docker με μακροπρόθεσμη υποστήριξη.

:::Πληροφορίες
Από τον Μάιο του 2026, [v2.30,00](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) ήταν η τελευταία έκδοση. Είναι σοφό να επαναλειτουργούμε περιστασιακά για να συμβαδίζουμε με τα τρωτά σημεία ασφαλείας.
:::

Σε αυτές τις ρυθμίσεις, εγχύουμε βασικές μεταβλητές περιβάλλοντος για να χειριστούμε τις ρυθμίσεις της ζώνης χρόνου, να διασφαλίσουμε ότι το Tomcat έχει τις σωστές άδειες ανάγνωσης/γραφής για τον όγκο αποθήκευσης, και να πούμε ERDDAP πώς να δρομολογήσει σωστά URLs όταν κάθεται πίσω από ένα Kubernetes Ingress. Επίσης τοποθετούμε το PVC σε `/erddapData`   (το προκαθορισμένο `bigParentΚατάλογος` ) να ενέσετε το datasets.xml και setup.xml σε `/usr/local/tomcat/content/erddap` .

Δημιουργία ενός αρχείου με όνομα `Ανάπτυξη.yaml` :

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
-  **ΤΖ** : Ορισμός της ζώνης ώρας για τον εξυπηρετητή Tomcat και ERDDAP Κορμοί.

-  **TOMCAT_USER_ID & TOMCAT_GROUP_ID** : Εξ ορισμού, η ERDDAP δοχείο τρέχει Tomcat ως συγκεκριμένος χρήστης. Εάν ο επίμονος όγκος προσαρτημένος στο /erddapData ανήκει σε διαφορετικό αναγνωριστικό χρήστη/ομάδας στο σύστημα αποθήκευσης του υπολογιστή σας, ERDDAP θα συντριβεί λόγω της άδειας αρνήθηκε λάθη. Ο καθορισμός αυτών των μεταβλητών αναγκάζει τον Tomcat να τρέξει με τις αντιστοιχισμένες ταυτότητες.

    :::άκρη
Βρείτε το UID χρήστη σας στον εξυπηρετητή όπου είναι έτσι η προσάρτηση NFS: `id - u <your-user_name> ` . Αυτό θα επιστρέψει την αριθμητική αξία που χρειάζεστε.
    :::

-  ** ERDDAP _ΒάσηUrl & ERDDAP _βάσηHttps Ουρλ** : Πότε ERDDAP τρέχει στο Kubernetes πίσω από μια Υπηρεσία και μια Ingress, Tomcat νομίζει ότι εξυπηρετεί την κυκλοφορία στο τοπικό host:8080. Αυτές οι μεταβλητές υπερισχύουν ERDDAP Εσωτερική δημιουργία URL έτσι ώστε οι σύνδεσμοι (όπως το προσαρμοσμένο λογότυπο ή οι σύνδεσμοι του συνόλου δεδομένων σας) Αποφασίστε σωστά στο domain name σας που αντιμετωπίζει το κοινό.

:::σημείωση
Εάν τρέχετε ξεχωριστά περιβάλλοντα παραγωγής και QA, να είστε προσεκτικοί σχετικά με την κοινή χρήση ενός μόνο PVC. Η τροποποίηση ή διαγραφή των δεδομένων σε ένα περιβάλλον θα επηρεάσει άμεσα το άλλο. Το διαχειριζόμαστε χρησιμοποιώντας επικαλύψεις ανάπτυξης για QA και Παραγωγή και προσθέτοντας υποφακέλους για κάθε επικάλυψη. Αυτό μας επιτρέπει να ελέγξουμε σε QA με ένα QA datasets. XML πριν αγγίξει την ανάπτυξη παραγωγής.
:::
---

## 3. Δικτύωση: Υπηρεσία και είσοδος
Για να εκθέσει σας ERDDAP bood στο διαδίκτυο, χρειάζεστε μια Υπηρεσία για να δρομολογήσετε την εσωτερική κίνηση διασποράς, και μια Ingress για να το συνδέσετε με ένα δημόσιο όνομα DNS.

Δημιουργία ενός αρχείου με όνομα `υπηρεσία.yaml` :
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

Δημιουργία ενός αρχείου με όνομα `είσοδος. yaml` :
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
## 4. Διαχείριση Περιβάλλοντος με Kustomize
Καθώς η ανάπτυξή σας μεγαλώνει, η διαχείριση μεμονωμένων αρχείων YAML για διαφορετικά περιβάλλοντα (Π.χ., QA εναντίον Παραγωγής) γίνεται αποτέλεσμα λάθους. Το Kustomize σας επιτρέπει να ορίσετε μια ρύθμιση "Base" και στη συνέχεια να εφαρμόσετε " Overlays" για να τροποποιήσετε τις ρυθμίσεις για συγκεκριμένα περιβάλλοντα. Στο GitHub αποθετήριο σας, οργανώστε τα αρχεία ως εξής:

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

Δημιουργία του `kustomization.yaml (στα Αγγλικά)` αρχείο για να συλλέξει όλους τους πόρους και να χαρτογραφήσει προσαρμοσμένες ρυθμίσεις και σύνολα δεδομένων σας XML αρχεία. Αυτά θα περάσουν στο δικό σου ERDDAP Docker εικόνα όταν αναπτυχθεί έτσι ώστε να μπορείτε να στυλ σας ERDDAP σελίδα και να προσθέσετε σύνολα δεδομένων από το GitHub αποθετήριο σας, ενώ αφήστε `κουστομιζέ` χαρτογράφησέ τους στην αποστολή σου.

#### Βάση ( `βάση/kustomization.yaml` ) 
Η βασική kutomization απλά δεσμεύει τους βασικούς πόρους σας μοιράζονται σε όλες τις επικαλύψεις. Κρατάμε την παραγωγή. ` datasets.xml ` και `setup.xml` στη βάση και μόνο ενημέρωση αυτών μετά από δοκιμές σε QA.

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
apiΈκδοση: kustomize.config.k8s.io/v1beta1
είδος: Kustomization
χώρος ονομάτων: <your-erddap-namespace> 
πόροι:
- ../../βάση
- είσοδος. yaml
configMapGenerator:
- όνομα: setup-xml
συμπεριφορά: αντικατάσταση # Αυτή η παράκαμψη θα χρησιμοποιήσει το τοπικό αρχείο ρυθμίσεων με το σύνδεσμο λογότυπο από το URL QA.
αρχεία:
  - setup.xml
- όνομα: datasets-xml
συμπεριφορά: αντικατάσταση # Αυτή η παράκαμψη θα χρησιμοποιήσει τα τοπικά σύνολα δεδομένων xml για να ενημερώσει τα σύνολα δεδομένων xml στην ανάπτυξη QA.
αρχεία:
  -  datasets.xml 
έμπλαστρα:
- διαδρομή: ανάπτυξη. Γιαμλ
namePrefix: qa-
ετικέτες:
- περιλαμβάνουν επιλογείς: αλήθεια
ζεύγη:
περιβάλλον: qa
```

And here's the corresponding Production `kustomization`:
```yaml
apiΈκδοση: kustomize.config.k8s.io/v1beta1
είδος: Kustomization
χώρος ονομάτων: <your-erddap-namespace> 
πόροι:
- ../../βάση
- είσοδος. yaml
έμπλαστρα:
- διαδρομή: ανάπτυξη. Γιαμλ
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
