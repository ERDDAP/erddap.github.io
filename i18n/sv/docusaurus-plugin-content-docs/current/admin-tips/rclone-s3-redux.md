Detta innehåll är baserat på en [från Roy Mendelssohn till ERDDAP användare grupp](https://groups.google.com/g/erddap/c/H-vJoGP42TI) .

Running ERDDAP™ i molnet har blivit ett hett ämne. Jag bör notera att ERDDAP™ har alltid kört i molnet, bara för det mesta inte på en server som tillhandahålls av en kommersiell molnleverantör, och det stora hindret för körning ERDDAP™ på en kommersiell molnleverantör är om du använder S3 lagring, vilket inte tillåter normal Linux blockåtkomst. Om du är villig att betala mer för att använda blockåtkomstalternativen som tillhandahålls av din kommersiella molnleverantör, än att köra på en kommersiell molnserver är i grunden samma som att köra på din egen utrustning, förutom naturligtvis kostnaden.

Efter att ha sagt det, den 1 december 2025 skrev jag ett inlägg "rclone and S3" och detta är en uppföljning. I det e-postmeddelandet monterade jag GOES17-svettarna och kontrollerade en fil, men jag tog det inte hela vägen in. ERDDAP™ För att se att allt fungerar smidigt. Och ja kiddos, du kan prova detta hemma och du behöver inte konsultera en advokat eller medicinsk rådgivare, det borde vara säkert. Här monterar jag NCDC OI sst avhrr v2.1 som finns på AWS, sätt upp den i ERDDAP™ och visa resultaten.

- Steg 1: Definiera slutpunkten i rclone

Rclone config skapar oi sst s3 \\
Leverantör AWS
regionen us-east-1
place_constraint us-east-1
Env_auth falsk \\
anonym sann


- Steg 2: Skapa en monteringspunkt för datamängden

sudo mkdir -p/mnt/oi sst 
Sudo chown "$USER:$USER" /mnt/oi sst 

- Steg 3: montera S3-lagringen till monteringspunkten

Behörigheter, behörigheter, behörigheter, behörigheter. (Med ursäkt till Steve Ballmer, om du vet att du vet) ,

Monteringen måste göras så att oavsett användare kör din tomcat, vanligtvis användaren "tomcat", kan komma åt data. "rclone" monterar datamängden med ägare och grupp av användaren som utför kommandot montering och vill lagra information i användarens hemkatalog (Detta är förmodligen mildrat om du ställer upp detta som en systemnivåprocess - se nedan) . Så om du kan, exekvera monteringskommandot som "tomcat", men om din tomcat inte har en hemkatalog måste du utföra monteringskommandot som en annan användare. För att göra det redigera säkringen. Conf Fil:

1. sudo vi /etc/fuse.conf

2. Okommentera eller lägga till:

User_allow_other

3. Spara och lämna.


Den faktiska data är flera lager djup, och jag monterar på datanivå, inte på toppnivå, och utför kommandot i en tmux terminal så kommandot fortsätter att köra:

rclone -vv mount oi sst Noaa-cdr-sea-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr /mnt/oi sst O
Läs-bara \\
-allow-other \\
vfs-cache-mode full \\
Vfs-cache-max-storlek 1G
vfs-cache-poll-intervall 1m \\
Vfs-read-chunk-size 64M \\
Vfs-read-chunk-size-limit 1G
Vfs-read-ahead 256M \\
Buffertstorlek 64M
Dir-cache-time 24h
-attr-timeout 1s
Ingen-modtime


- Steg 4: Använd GenerateDatasets Xml precis som normalt,

Användning EDDGrid FromNcFiles som datatypen, och katalogen är /mnt/oi sst /. Det första passet var ganska bra och fungerade utan problem. Jag gjorde tre ändringar i xml snippet som kunde ha gjorts medan du kör GenerateDatasets Xml och de var:

1. Ändra datasetid för att vara oi sst _rclone

2. Katalogen innehåller en blandning av filer som vissa slutar i " .nc Och andra slutar i "preliminär .nc och endast de förra är önskade. För att göra denna ändring filnamnet regex:

 <fileNameRegex> Oi sst -avhrr-v02r01\\d&#123;8&#125; .nc  </fileNameRegex> 

Jag har ofta sagt att jag tycker att regex är ett av livets mysterier, och det kan finnas bättre sätt att göra regex. Men detta fungerade

3. Ioos_category var inte inställd, jag lade till dem.

För permanent produktionsarbete kan xml snippet använda lite mer redigering för att vara mer komplett.

- Steg 5: Lägg till xml snippet till datasets.xml och ställ flaggan

Detta tar lång tid att ladda på första passet, så gå och hitta andra saker att göra resten av dagen.

Slutresultatet är:

 https://upwell.pfeg.noaa.gov/erddap/griddap/oisst_rclone.graph
 

Se nu att det inte var för smärtsamt&#33;

Om du spelar med resultatet, notera först att rclone inställningarna är en första gissning, och bör testas för optimering. Jonathan Sherman i vår grupp har tittat på det här och kan prata om det i sitt samtal på IOOS DMAC-mötet. Han kommer också att täcka många fler ämnen relaterade till inställningen i Google Cloud Platform, till exempel hur man orkestrerar installationen av VM, ställa in S3-hinken för att ha ett hierarkiskt namnutrymme som på GCP är snabbare och bara lite dyrare, och om du kör bearbetningsskript för att uppdatera de data som serveras av den. ERDDAP™ Hur man ställer upp dessa. Om detta ämne intresserar dig uppmuntrar jag dig att lyssna på hans samtal. och ERDDAP™ är igång, bara det är inte tillgängligt för tillfället utanför NMFS nätverk.

För det andra är detta inte en AWS VM montering en AWS S3 hink, detta är en av våra servrar och vårt rör nuförtiden är helt mättad, så du skulle förvänta dig att den tidigare inställningen ska vara snabbare än vad jag har gjort. (vårt rör är inte så stort - tack NMFS Men är vi någonsin mättade - efterfrågan på data har varit fenomenal) .

Slutligen kanske du undrar - jag vill rulla min egen, var börjar jag förutom detta? Jag har hittat en sak LLMs är bra på är information som är välkänd och väl dokumenterad, och AIs jag har kontrollerat. (Det går alla mina tokens&#33;&#33;) Alla vet rclone och AWS och GCP ganska bra, och kan göra det mesta av installationen för dig. Faktum är att jag letade efter en dataset som skulle vara bra att demo, och en AI gav mig flera förslag och genererade det mesta av vad som är ovan, men jag gjorde några redigeringar för min egen inställning.

Kom också ihåg att Seth skrev en ny S3 för den nuvarande versionen. (2.30) av ERDDAP™ Jag har inte jämfört hastigheter, och jag föreställer mig att beroende på vad du gör kommer att ha sina fördelar. För portering över en befintlig ERDDAP™ installation, med hjälp av rclone kan förenkla processen.

Roy

PS - Och kom ihåg att rclone fungerar över ett brett utbud av leverantörer, är detta inte begränsat till AWS och endast några ändringar i "rclone config" inställningar behövs för en annan leverantör.


Gör till en systemtjänst (ändra efter behov för användaren etc.) Från:
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

[Unit]
Description=Rclone montering för NOAA OISST på AWS
Wants=network-online .tar Få
After=network-online .tar Få

[Service]
Typ = meddela
Användare =YourUser
Grupp=yourGroup

ExecStart=/usr/bin/rclone montering oi sst Noaa-cdr-sea-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr /mnt/oi sst O
Läs-bara \\
-allow-other \\
Dir-perms 0755
Fil-perms 0644 \\
vfs-cache-mode full \\
Vfs-cache-max-storlek 1G
vfs-cache-poll-intervall 1m \\
Vfs-read-chunk-size 64M \\
Vfs-read-chunk-size-limit 1G
Vfs-read-ahead 256M \\
Buffertstorlek 64M
Dir-cache-time 24h
-attr-timeout 1s
Ingen-modtime

ExecStop=/bin/fusermount -uz /mnt/oi sst 
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user .tar Få
