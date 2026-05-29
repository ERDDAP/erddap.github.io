# How to Deploy ERDDAP on Kubernetes

Deploying ERDDAP on Kubernetes provides a scalable, resilient environment for your data server. This guide covers the essential components required to host ERDDAP using standard Kubernetes manifests, including managing persistent storage, deploying the application, configuring networking, and generating new dataset XMLs directly from within the cluster.

## Prerequisites
Before you begin, ensure you have:
- A running Kubernetes cluster
- `kubectl` installed and configured to communicate with your cluster
- A storage provisioner capable of creating Persistent Volumes (PVs)
- Your `setup.xml` and `datasets.xml` ready to be mounted 
-----

## 1. Persistent Storage (PVC)
ERDDAP requires persistent storage to maintain cache files, logs, and state across pod restarts. Using a `PersistentVolumeClaim` (PVC) ensures that your `bigParentDirectory` (where ERDDAP stores its generated data) is not lost if a pod goes down. This volume can also be linked to your data storage location where the raw data files will live.

Create a file named `pvc.yaml` like so:
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

:::tip
**Note:** Your storage provisioner will need to set up the volume claim on the Kubernetes cluster and give you the `storageClassName` before you can connect to it.
:::

----

## 2.  The ERDDAP Deployment
The Deployment manifest manages the ERDDAP pod itself. We recommend using the official erddap/erddap Docker image with long term support.

:::info
As of May 2026, [v2.30.0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) was the latest version. It is wise to re-deploy occasionally to keep up with security vulnerabilities.
:::

In this configuration, we inject key environment variables to handle timezone settings, ensure Tomcat has the correct read/write permissions for the storage volume, and tell ERDDAP how to properly route URLs when sitting behind a Kubernetes Ingress. We also mount the PVC to `/erddapData` (the default `bigParentDirectory`) to inject the datasets.xml and setup.xml into `/usr/local/tomcat/content/erddap`.

Create a file named `deployment.yaml`:

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
- **TZ**: Sets the timezone for the Tomcat server and ERDDAP logs.

- **TOMCAT_USER_ID & TOMCAT_GROUP_ID**: By default, the ERDDAP container runs Tomcat as a specific user. If the persistent volume mounted to /erddapData is owned by a different user/group ID on your host storage system, ERDDAP will crash due to permission denied errors. Setting these variables forces Tomcat to run with the matching IDs.

    :::tip
    Find your user UID on the server where the NFS mount is like this: `id -u <your-user_name>`. This will return the numeric value you need. 
    :::

- **ERDDAP_baseUrl & ERDDAP_baseHttpsUrl**: When ERDDAP runs in Kubernetes behind a Service and an Ingress, Tomcat thinks it is serving traffic on localhost:8080. These variables override ERDDAP's internal URL generation so that links (like your custom logo or dataset links) correctly resolve to your public-facing domain name.

:::note 
If you are running separate Production and QA environments, be cautious about sharing a single PVC. Modifying or deleting cached data in one environment will immediately affect the other. We manage this using deployment overlays for QA and Production and adding subfolders for each overlay. This allows us to test on QA with a QA datasets.XML before touching the production deployment.
:::
---

## 3. Networking: Service and Ingress
To expose your ERDDAP pod to the web, you need a Service to route internal cluster traffic, and an Ingress to bind it to a public DNS name.

Create a file named `service.yaml`:
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

Create a file named `ingress.yaml`:
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
## 4. Managing Environments with Kustomize
As your deployment grows, managing individual YAML files for different environments (e.g., QA vs. Production) becomes error-prone. Kustomize allows you to define a "Base" configuration and then apply "Overlays" to tweak settings for specific environments. In your GitHub repository, organize the files as follows:

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

Create the `kustomization.yaml` file to collect all the resources and map your custom setup and datasets XML files. These will get passed into your ERDDAP Docker image when deployed so you can style your ERDDAP page and add datasets from your GitHub repository while letting `kustomize` map them to your deployment.

#### Base (`base/kustomization.yaml`)
The base kustomization simply bundles your core resources shared across the overlays. We keep the production `datasets.xml` and `setup.xml` in base and only update these after testing on QA.

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
kind: Kustomization
namespace: <your-erddap-namespace>
resources:
- ../../base
- ingress.yaml
configMapGenerator:
- name: setup-xml
  behavior: replace # This override will use the local setup file with the logo link from the QA URL.
  files:
  - setup.xml
- name: datasets-xml
  behavior: replace # This override will use the local datasets xml to update the datasets xml in the QA deployment.
  files:
  - datasets.xml
patches:
- path: deployment.yaml
namePrefix: qa-
labels:
- includeSelectors: true
  pairs:
    environment: qa
```

And here's the corresponding Production `kustomization`:
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: <your-erddap-namespace>
resources:
- ../../base
- ingress.yaml
patches:
- path: deployment.yaml
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