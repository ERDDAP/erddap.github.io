Deze inhoud is gebaseerd op een [bericht van Roy Mendelssohn aan de ERDDAP gebruikersgroep](https://groups.google.com/g/erddap/c/H-vJoGP42TI) .

Uitvoeren ERDDAP™ in de cloud is een hot topic geworden. Ik zou willen opmerken dat ERDDAP™ altijd heeft uitgevoerd in de cloud, gewoon meestal niet op een server die door een commerciële cloud provider, en de belangrijkste belemmering voor het uitvoeren van ERDDAP™ op een commerciële cloudprovider is als je S3 opslag gebruikt, wat geen normale Linux block toegang toelaat. Als u bereid bent meer te betalen om de toegangsmogelijkheden van uw commerciële cloudprovider te gebruiken, dan is het draaien op een commerciële cloudserver in principe hetzelfde als draaien op uw eigen apparatuur, behalve natuurlijk de kosten.

Dat gezegd hebbende, op 1 december 2025 schreef ik een post  In die e-mail heb ik mounted de ours17 swathes en controleerde een bestand, maar ik nam het niet helemaal in ERDDAP™ om te zien dat het allemaal soepel werkt. En ja kinderen, je kunt dit thuis proberen en je hoeft niet te overleggen met een advocaat of medisch adviseur, het moet allemaal veilig zijn. Hier monteer ik de NCDC OI sst avhrr v2.1 dat is op AWS, zet het in ERDDAP™ en de show de resultaten.

- Stap 1: Bepaal het eindpunt in rclone

rclone config aanmaken sst s3 \\
aanbieder AWS \\
regio ons-oost-1 \\
location_contraint us-east-1 \\
env_auth vals \\
anoniem waar


- Stap 2: Maak een aankoppelpunt voor de dataset

sudo mkdir -p /mnt/oi sst 
sudo clown "$USER:$USER" /mnt/oi sst 

- Stap 3: koppel de S3-opslag aan het aankoppelpunt

Toestemmingen, machtigingen, machtigingen, machtigingen... (Met excuses aan Steve Ballmer.) ,

De mount moet worden gedaan, zodat welke gebruiker ook uw Tomcat, meestal gebruiker van Tomcat, toegang heeft tot de gegevens.  (dit wordt waarschijnlijk verzacht als u dit als systeemniveauproces opzet - zie hieronder) . Dus als je kunt, uitvoeren van de mount commando's als  Om dit te doen bewerken van de zekering. conf-bestand:

1. sudo vi /etc/fuse.conf

2. Opmerking verwijderen of toevoegen:

Gebruiker_allow_other

3. Opslaan en afsluiten.


De werkelijke gegevens zijn verschillende lagen diep, en ik ben aan het mounten op het dataniveau, niet op het hoogste niveau, en ik voer het commando uit in een tmux terminal zodat het commando blijft draaien:

rclone -vv mount oi sst :noaa-cdr-sea-surface-temp-optimum-iproliferatie-pds/data/v2.1/avrr /mnt/oi sst \\
--read-only \\
--allow-other \\
--vfs-cache-modus vol \\
--vfs-cache-max-size 1G \\
--vfs-cache-poll-interval 1m
--vfs-read-chunk-size 64M\\
--vfs-read-chunk-size-limit 1G \\
--vfs-read-ahead 256M
--buffer-grootte 64M \\
--dir-cache-time 24h \\
--attr-timeout 1s \\
--no-modtime


- Stap 4: Gebruik GenererenDatasets Xml zoals normaal,

Gebruik EDDGrid FromNcFiles als datatype, en de directory is /mnt/oi sst /. De eerste pas was vrij goed en werkte zonder problemen. Ik maakte drie wijzigingen aan de xml knipsel dat had kunnen worden gedaan tijdens het draaien GenererenDatasets Xml en deze waren:

1. Veranderde de datasetid om oi te zijn sst _rkloon

2. De map bevat een mix van bestanden wat eindigt in  .nc " en andere eindigend in een voorlopige .nc En alleen de eerste zijn gewenst. Om dit te doen wijzigen van de bestandsnaam regex:

 <fileNameRegex> oi sst -avrr-v02r01\\.\\d&#123;8&#125;\\ .nc  </fileNameRegex> 

Ik heb vaak gezegd dat ik regex een van de mysteries van het leven vind, en er kunnen betere manieren zijn om de regex te doen. Maar dit werkte.

3. De ioos_categorie is niet ingesteld, die heb ik toegevoegd.

Voor permanent productiewerk kan het xml knipsel iets meer bewerken gebruiken om vollediger te zijn.

- Stap 5: Voeg het xml knipsel toe aan de datasets.xml en zet de vlag

Dit duurt een lange tijd om te laden op de eerste pas, dus ga andere dingen te doen voor de rest van de dag.

Het eindresultaat is:

 https://upwell.pfeg.noaa.gov/erddap/griddap/oisst_rclone.graph
 

Dat was niet te pijnlijk.

Als je met het resultaat speelt, let dan eerst op dat de rclone instellingen een eerste gok zijn, en moet worden getest op optimalisatie. Jonathan Sherman van onze fractie heeft hier naar gekeken en kan er in zijn toespraak op de IOOS DMAC-bijeenkomst over praten. Hij zal ook betrekking hebben op veel meer onderwerpen met betrekking tot het opzetten in Google Cloud Platform, zoals hoe te orkestreren van de opstelling van de VM, het opzetten van de S3 emmer om een hiërarchische naamruimte die op GCP is sneller en slechts een beetje duurder, en als u de verwerking scripts om de gegevens die door de ERDDAP™ hoe je die opzet. Als dit onderwerp u interesseert, raad ik u aan om naar zijn praatje te luisteren. De ERDDAP™ is up and running, gewoon niet toegankelijk op het moment van buiten de NMFS netwerk.

Ten tweede is dit geen AWS VM montage van een AWS S3 emmer, dit is een van onze servers en onze pijp is deze dagen volledig verzadigd, dus je zou verwachten dat de vorige setup sneller is dan wat ik heb gedaan (goed onze pijp is niet erg groot - dank NMFS De vraag naar gegevens is fenomenaal.) .

Uiteindelijk kun je je afvragen - ik wil mijn eigen rollen, waar moet ik beginnen naast dit? Ik heb een ding gevonden waar LLM's goed in zijn is informatie die bekend en goed gedocumenteerd is, en de AIS die ik heb gecontroleerd (Daar gaat al mijn tokens&#33;&#33;) allemaal rclone en AWS en GCP vrij goed kennen, en kan het grootste deel van de setup voor u doen. In feite was ik op zoek naar een dataset die goed zou zijn om demo, en een AI gaf me verschillende suggesties en gegenereerde de meeste van wat hierboven is, hoewel ik wel een aantal bewerkingen voor mijn eigen setup.

Vergeet ook niet dat Seth een nieuwe S3 schreef voor de huidige versie (2.30) van ERDDAP™ - Ik heb geen snelheid vergeleken... en ik denk dat afhankelijk van wat jullie doen elk zijn voordelen zal hebben. Voor het porteren over een bestaande ERDDAP™ installatie, met behulp van rclone kan het proces vereenvoudigen.

- Roy.

PS - En onthoud rclone werkt over een breed scala van leveranciers, dit is niet beperkt tot AWS en slechts enkele wijzigingen in de instellingen van de configuratie van 


Maak gebruik van een systeemdienst (wijzigen naar gelang van het geval voor gebruiker enz.) :
Wat?

[Eenheid]
Beschrijving=Rclone mount voor NOAA OISST on AWS
Wants=network-online .tar krijgen
Na=network-online .tar krijgen

[Dienst]
Type=melding
Gebruiker=uw gebruiker
Groep= uw groep

ExecStart=/usr/bin/rclone mount oi sst :noaa-cdr-sea-surface-temp-optimum-iproliferatie-pds/data/v2.1/avrr /mnt/oi sst \\
--read-only \\
--allow-other \\
--dir-perms 0755 \\
--file-perms 0644 \\
--vfs-cache-modus vol \\
--vfs-cache-max-size 1G \\
--vfs-cache-poll-interval 1m
--vfs-read-chunk-size 64M\\
--vfs-read-chunk-size-limit 1G \\
--vfs-read-ahead 256M
--buffer-grootte 64M \\
--dir-cache-time 24h \\
--attr-timeout 1s \\
--no-modtime

ExecStop=/bin/fusermount -uz /mnt/oi sst 
Herstart=on-failure
HerstartSec=10

[Installeren]
GezochtBy=multi-user .tar krijgen
