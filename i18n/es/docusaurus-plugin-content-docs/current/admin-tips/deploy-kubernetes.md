# Cómo Despliegar ERDDAP on Kubernetes

Despliegue ERDDAP en Kubernetes proporciona un entorno escalable y resistente para su servidor de datos. Esta guía cubre los componentes esenciales necesarios para acoger ERDDAP usando estándar Kubernetes se manifiesta, incluyendo la gestión del almacenamiento persistente, el despliegue de la aplicación, la configuración de redes y la generación de nuevos XML de conjunto de datos directamente desde el grupo.

## Prerrequisitos
Antes de comenzar, asegúrese de que tiene:
- Un grupo de Kubernetes en funcionamiento
-  `kubectl` instalado y configurado para comunicarse con su cluster
- Un proveedor de almacenamiento capaz de crear volúmenes persistentes (PV) 
- Tu `setup.xml` y ` datasets.xml ` listo para ser montado
---

## 1. Almacenamiento persistente (PVC) 
 ERDDAP requiere almacenamiento persistente para mantener archivos de caché, registros y estado a través de pod reinicia. Usar un `PersistentVolumeClaim`   (PVC) asegura que su `bigParentDirectory`   (Donde ERDDAP almacena sus datos generados) no se pierde si una vaina cae. Este volumen también puede estar vinculado a su ubicación de almacenamiento de datos donde vivirán los archivos de datos brutos.

Crear un archivo llamado `pvc.yaml` así:
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

:::punta
 **Nota:** Su proveedor de almacenamiento tendrá que configurar la reclamación de volumen en el grupo Kubernetes y darle el `almacenamientoClassName` antes de que puedas conectarte con él.
:::

-...

## 2. El ERDDAP Despliegue
El manifiesto de Despliegue gestiona el ERDDAP La misma vaina. Recomendamos usar la imagen oficial erddap/erddap Docker con soporte a largo plazo.

:::info
Hasta mayo de 2026, [v2.30.0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) fue la última versión. Es prudente volver a desplegarse ocasionalmente para mantenerse al día con vulnerabilidades de seguridad.
:::

En esta configuración, inyectamos variables clave para manejar la configuración de la zona horaria, aseguramos que Tomcat tiene los permisos correctos de lectura/escritura para el volumen de almacenamiento, y diremos ERDDAP cómo abordar correctamente las URL cuando se sienta detrás de un Kubernetes Ingress. También montamos el PVC a `/erddapData`   (por defecto `bigParentDirectory` ) para inyectar datasets.xml y configuración.xml en `/usr/local/tomcat/content/erddap` .

Crear un archivo llamado `deployment.yaml` :

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
-  **TZ** : Establece la zona horaria para el servidor Tomcat y ERDDAP troncos.

-  **TOMCAT_USER_ID** : Por defecto, el ERDDAP container ejecuta Tomcat como un usuario específico. Si el volumen persistente montado en /erddapData es propiedad de un ID de usuario/grupo diferente en su sistema de almacenamiento de host, ERDDAP se estrellará debido al permiso negado errores. La configuración de estas variables obliga a Tomcat a funcionar con los IDs correspondientes.

    :::punta
Encuentre su usuario UID en el servidor donde el montaje NFS es así: `id -u <your-user_name> ` . Esto devolverá el valor numérico que necesita.
    :::

-  ** ERDDAP _baseUrl &gt; ERDDAP _baseHtps Url** : Cuando ERDDAP corre en Kubernetes detrás de un Servicio y un Ingress, Tomcat piensa que está sirviendo tráfico en localhost:8080. Estas variables anulan ERDDAP 's internal URL generation so that links (como su logotipo personalizado o enlaces de conjunto de datos) resolver correctamente su nombre de dominio público.

:::nota
Si usted está ejecutando entornos separados de producción y QA, sea cauteloso sobre compartir un solo PVC. Modificar o eliminar los datos de caché en un entorno afectará inmediatamente al otro. Gestionamos esto usando superposiciones de implementación para QA y Producción y agregando subcarpetas para cada superposición. Esto nos permite probar en QA con un conjunto de datos QA. XML antes de tocar el despliegue de producción.
:::
---

## 3. Redes: Servicio e Ingresos
Para exponer tu ERDDAP pod a la web, necesita un Servicio para trazar el tráfico interno de racimo, y un Ingress para atarlo a un nombre DNS público.

Crear un archivo llamado `service.yaml` :
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

Crear un archivo llamado `ingress.yaml` :
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
## 4. Gestión de entornos con Kustomize
A medida que crece su implementación, gestionar archivos individuales de YAML para diferentes entornos (por ejemplo, QA vs. Production) se convierte en prono de error. Kustomize le permite definir una configuración "Base" y luego aplicar "Overlays" a ajustes de ajuste para entornos específicos. En su repositorio GitHub, organice los archivos de la siguiente manera:

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

Crear el `kustomization.yaml` archivo para recoger todos los recursos y mapear los archivos XML de configuración y conjuntos de datos personalizados. Estos serán pasados en tu ERDDAP Imagen de Docker cuando se implementa para que puedas ERDDAP página y añadir conjuntos de datos de su repositorio GitHub mientras deja `kustomize` mapearlos a tu despliegue.

#### Base ( `base/kustomization.yaml` ) 
La kustomización base simplemente agrupa sus recursos básicos compartidos a través de los límites. Mantenemos la producción ` datasets.xml ` y `setup.xml` en base y sólo actualizar estos después de probar en QA.

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
tipo: Kustomization
namespace: <your-erddap-namespace> 
recursos:
- ../
- ingress.yaml
configMapGenerator:
- nombre: setup-xml
comportamiento: reemplazar # Esta anulación utilizará el archivo de configuración local con el enlace de logotipo de la URL de QA.
archivos:
  - setup.xml
- nombre: datasets-xml
comportamiento: reemplazar # Esta anulación utilizará los conjuntos de datos locales xml para actualizar los conjuntos de datos xml en el despliegue de QA.
archivos:
  -  datasets.xml 
parches:
- ruta: despliegue. Yaml
nombrePrefijo: qa-
Etiquetas:
- incluyeSeleccionistas: verdadero
pares:
medio ambiente: qa
```

And here's the corresponding Production `kustomization`:
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
tipo: Kustomization
namespace: <your-erddap-namespace> 
recursos:
- ../
- ingress.yaml
parches:
- ruta: despliegue. Yaml
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
