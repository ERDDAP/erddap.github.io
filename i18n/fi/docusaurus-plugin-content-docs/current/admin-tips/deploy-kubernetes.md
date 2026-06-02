# Miten ottaa käyttöön ERDDAP Kubernetes

Käyttäminen ERDDAP Kubernetes tarjoaa skaalautuvan ja kestävän ympäristön palvelimellesi. Tämä opas kattaa isännöintiin tarvittavat olennaiset osat. ERDDAP Käyttämällä standardia Kubernetes ilmenee, mukaan lukien jatkuvan varastoinnin hallinta, sovelluksen käyttöönotto, verkostoitumisen konfigurointi ja uusien XML-tietojen tuottaminen suoraan klusterista.

## Edellytykset
Ennen kuin aloitat, varmista, että:
- Juoksija Kubernetes Cluster
-  `Kubect` asennettu ja konfiguroitu kommunikoimaan klusterin kanssa
- Varastotoimittaja, joka pystyy luomaan pysyviä volyymejä (PV) 
- Sinun `Asennus.xml` ja ` datasets.xml ` valmiina asennettavaksi
-------

## 1.1. Pysyvä säilytys (PVC) 
 ERDDAP Vaatii pysyvän tallennuksen säilyttääkseen välimuistitiedostoja, lokeja ja tilaa pod-käynnistyksessä. Käyttämällä a `PysyväVolumeClaim`   (PVC) Varmista, että sinun `isovanhemmat`   (missä missä ERDDAP tallentaa luotuja tietoja) Ei menetetä, jos potti laskee. Tämä volyymi voidaan liittää myös tallennustilaan, jossa raaka-ainetiedostot elävät.

Luo tiedosto nimeltä `pvc.yaml` Kuten näin:
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

:::Vinkki
 **Huomautus:** Varastotoimittajan on perustettava Kubernetes-klusterin tilavuusvaatimus ja annettava sinulle `Varastointiluokka` Ennen kuin voit yhdistää siihen.
:::

------

## 2. The ERDDAP käyttöönotto
Käyttöohje hallitsee ERDDAP Pod itse. Suosittelemme käyttämään virallista erddap/erddap Docker -kuvaa pitkällä aikavälillä.

:::Info
toukokuussa 2026, [V2.30.0](https://github.com/erddap/erddap/pkgs/container/erddap/779906687?tag=v2.30.0) Se oli viimeisin versio. On viisasta ottaa joskus uudelleen käyttöön turvallisuushaavoittuvuuksia.
:::

Tässä kokoonpanossa injektoimme keskeisiä ympäristömuuttujat käsittelemään aikavyöhykeasetuksia, varmistamaan, että Tomcatilla on oikeat luku-/kirjoitusoikeudet varastointitilavuuteen. ERDDAP Miten reitittää URL-osoitteet kun istuu Kubernetes Ingressin takana PVC:tä on myös `ErddapData`   (Oletusarvo `isovanhemmat` ) injektoimaan datasets.xml Asennus.xml `Käyttäjä/Paikallinen/Tomcat/Sisältö/Erddap` .

Luo tiedosto nimeltä `Lähde: Yaml` :

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
-  **T** : Aikavyöhyke Tomcat-palvelimelle ja ERDDAP Lokit.

-  **TOMCAT_USER_ID & TomCAT_GROUP_ID Näytä tarkat tiedot** : Oletusarvoisesti, ERDDAP Tomcat toimii tiettynä käyttäjänä. Jos säilyvä tilavuus, joka on asennettu /erddapDataan, omistaa eri käyttäjä/ryhmätunnus isäntätallennusjärjestelmässäsi, ERDDAP Syynä ovat luvatut virheet. Näiden muuttujien asettaminen pakottaa Tomcatin kulkemaan yhteensopivien tunnisteiden kanssa.

    :::Vinkki
Löydä käyttäjätunnuksesi palvelimelta, jossa NFS-vuori on tällainen: `_ _ U <your-user_name> ` . Tämä palauttaa tarvitsemasi numeroarvon.
    :::

-  ** ERDDAP _baseUrl & ERDDAP _baseHttps Url** : Milloin ERDDAP Kubernetes toimii palvelun ja Ingressin takana, ja Tomcat uskoo, että se palvelee liikennettä paikalla: 8080. Nämä muuttujat ylittävät ERDDAP Sisäinen URL-sukupolvi niin, että (kuten mukautettu logo tai dataset linkit) Oikein päätät julkisen verkkotunnuksen.

:::Huomautus
Jos käytät erillisiä tuotanto- ja QA-ympäristöjä, ole varovainen yhden PVC:n jakamisesta. Muokkaamalla tai poistamalla välimuistitietoja yhdessä ympäristössä vaikuttaa välittömästi toiseen. Hallitsemme tätä käyttämällä QA: n ja tuotannon käyttöönottopäällysteitä ja lisäämme kuhunkin päällekkäisyyteen alikansioita. Tämä mahdollistaa QA: n testaamisen QA-datalla. XML ennen tuotantoa.
:::
---

## 3.3.3. Verkosto: Palvelu ja Ingress
paljastamaan sinun ERDDAP verkkoon, tarvitset palvelun, joka reitittää sisäisen klusteriliikenteen, ja Ingress sitoa sen julkiseen DNS-nimeen.

Luo tiedosto nimeltä `Yaml` :
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

Luo tiedosto nimeltä `Sisäänkäynti.yaml` :
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
## 4.4. Ympäristöjen hallinta Kustomizella
Kun käyttöönotto kasvaa, yksittäisten YAML-tiedostojen hallinta eri ympäristöissä. (QA vs. tuotanto) Siitä tulee virheellinen. Kustomizen avulla voit määrittää "Base"-asetuksen ja käyttää sitten "Overlays" tiettyjen ympäristöjen tweak-asetuksiin. GitHub-tietokoneessasi järjestä tiedostot seuraavasti:

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

Luoda `Kustomointi.yaml` tiedosto kerätä kaikki resurssit ja kartoittaa mukautetun asennuksen ja tietoaineistot XML-tiedostot. Nämä siirtyvät sinun ERDDAP Docker-kuva, kun se on otettu käyttöön, jotta voit muotoilla ERDDAP sivu ja lisää tietoaineistoja GitHub-varastostasi antaessasi `Kustom` kartoittaa ne käyttöönottoon.

#### Perusta ( `Perusta/kustomointi.yaml` ) 
Peruskustomointi yksinkertaisesti yhdistää ydinresursseja jaettu päällysteiden. Pidämme tuotantoa ` datasets.xml ` ja `Asennus.xml` ja päivittää niitä vain testin jälkeen.

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
Alkuperäinen nimi: Kustomization
Nimeke: <your-erddap-namespace> 
Resursseja:
- .. . . . . base
- Sisäänkäynti.yaml
ConfigMapGenerator:
- Alkuperäinen nimi: setup-xml
Vaihtoehto # Tämä ylikuormitus käyttää paikallista asennustiedostoa QA-URL-osoitteen logoyhteydellä.
Tiedostot:
  - Asennus.xml
- Alkuperäinen nimi: Datasets-xml
Vaihtoehto # Tämä ylikuormitus käyttää paikallisia tietoaineistoja xml päivittää tietoaineistoja xml QA:n käyttöönotossa.
Tiedostot:
  -  datasets.xml 
Laatikot:
- Reitti: käyttöönotto. Yaml
Alkuperäinen nimi: qa-
Etiketit:
- Näyttelijät: Totta
Pari:
Ympäristö: Qa
```

And here's the corresponding Production `kustomization`:
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
Alkuperäinen nimi: Kustomization
Nimeke: <your-erddap-namespace> 
Resursseja:
- .. . . . . base
- Sisäänkäynti.yaml
Laatikot:
- Reitti: käyttöönotto. Yaml
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
