Dette innholdet er basert på en [melding fra Roy Mendelssohn til ERDDAP brukergruppe](https://groups.google.com/g/erddap/c/H-vJoGP42TI) ..

Kjøring ERDDAP™ I skyen er blitt et varmt emne. Jeg bør merke meg at ERDDAP™ har alltid kjørt i skyen, bare det meste av tiden ikke på en server gitt av en kommersiell skyleverandør, og den store hindringen for å kjøre ERDDAP™ på en kommersiell skyleverandør er hvis du bruker S3-lagring, som ikke tillater normal Linux blokk tilgang. Hvis du er villig til å betale mer for å bruke blokktilgangsalternativene fra din kommersielle skyleverandør, er det i utgangspunktet det samme som å kjøre på ditt eget utstyr, bortsett fra kostnadene.

Etter å ha sagt det, 1. desember 2025 skrev jeg en post \"rocklone og S3\" og dette er en oppfølging. I den e-posten monterte jeg GOES17 swathes og sjekket en fil, men jeg tok det ikke hele veien inn i ERDDAP™ For å se at alt fungerer glatt. Og ja kiddos, du kan prøve dette hjemme og du trenger ikke å konsultere med en advokat eller medisinsk rådgiver, det bør være trygt. Her monterer jeg NCDC OI sst avhrr v2.1 som er på AWS, satt det opp i ERDDAP™ og vise resultatene.

- Trinn 1: Definer endepunktet i rclone

rclone config opprette oi sst s3 \\
leverandør AWS-
Region us-east-1 \\
location_begrense oss-øst-1 \\
Env_auth falsk \\
anonym sann


- Trinn 2: Opprett et monteringspunkt for datasettet

sudo mkdir -p /mnt/oi sst 
sudo chown-$USER:$USER" /mnt/oi sst 

- Trinn 3: montere S3-lagringen til monteringspunktet

Tillatelser, tillatelser, tillatelser, tillatelser.... (Med unnskyldning til Steve Ballmer, hvis du vet du vet) ,

Montering må gjøres slik at uansett bruker kjører tomcat, vanligvis bruker \"tomcat\", kan få tilgang til data. «Rclone» monterer datasettet med eier og gruppe av brukeren som kjører monteringskommandoen og ønsker å lagre informasjon i brukerens hjemmemappe (Dette er sannsynligvis redusert hvis du konfigurerer dette som en systemnivåprosess - se nedenfor) .. Så hvis du kan, kjør monteringskommandoen som \"tomcat\", men hvis som oss din tomcat ikke har en hjemmekatalog, må du kjøre monteringskommandoen som en annen bruker. Slik redigerer du sikringen. conf-fil:

1. sudo vi /etc/fuse.conf

2. Kommenter eller legg til:

user_ally_other

3. Spar og avslutt.


De faktiske dataene er flere lag dypt, og jeg monterer på datanivå, ikke på toppnivå, og utfører kommandoen i en tmux-terminal slik at kommandoen fortsetter å kjøre:

rclone-vvv mount oi sst :noaa-cdr-sea-overflate-temp-optimum-interpolation-pds/data/v2.1/avhrr /mnt/oi sst \\
--lesbar -
-- la andre \\
--vfs-cache-mode full \\
--vfs-cache-max-størrelse 1G \\
--vfs-cache-poll-interval 1m
--vfs-les-chunk-størrelse 64M \\
--vfs-les-chunk-size-limit 1G \\
--vfs-read-ahead 256M
--buffer-størrelse 64M \\
--dir-cache-tid 24h \\
--attr-timeout 1s \\
--no-modtime


- Trinn 4: Bruk genererte datasett Xml som normalt,

Bruk EDDGrid FraNcFiles som datatypen, og katalogen er /mnt/oi sst /. Det første passet var ganske bra og jobbet uten problemer. Jeg gjorde tre endringer i xml-biten som kunne ha blitt gjort mens du kjører Genererer Datasett Xml og disse var:

1. Endret datasettet til å være oi sst _Rclone

2. Katalogen inneholder en blanding av filer som slutter i \" .nc " og andre som ender i “premiær” .nc «Og bare den forrige er ønsket. Slik endrer du filnavnet regulært:

 <fileNameRegex> oi sst -avhrr-v02r01\\.\\d&#123;8&#125;\\ .nc  </fileNameRegex> 

Jeg har ofte sagt at jeg finner regulær til å være en av livets mysterier, og det kan være bedre måter å gjøre regulær. Men dette fungerte

3. Ioos_kategorien var ikke satt, jeg la til dem.

For permanent produksjon kan xml snuten bruke litt mer redigering for å være mer komplett.

- Trinn 5: Legg xml-biten til datasets.xml og satt flagget

Dette tar lang tid å laste på første pass, så gå og finne andre ting å gjøre resten av dagen.

Det endelige resultatet er:

 https://upwell.pfeg.noaa.gov/erddap/griddap/oisst_rclone.graph
 

Se nå at det ikke var så smertefullt&#33;

Hvis du spiller med resultatet, må du først merke deg at Rclone-innstillingene er et første gjett, og bør testes for optimalisering. Jonathan Sherman i vår gruppe har sett på dette noen og kan snakke om det i hans tale på IOOS DMAC-møtet. Han vil også dekke mye mer temaer relatert til å sette opp i Google Cloud Platform, for eksempel hvordan man orkestrere installasjonen av VM, konfigurere S3-bøtten for å ha en hierarkisk navneplass som på GCP er raskere og bare litt dyrere, og hvis du kjører behandling skript for å oppdatere dataene som serveres av GCP ERDDAP™ Hvordan sette dem opp. Hvis dette emnet interesserer deg, oppfordrer jeg deg til å lytte til samtalen hans. Den ERDDAP™ er oppe og løper, bare det er ikke tilgjengelig i øyeblikket fra utenfor NMFS nettverk.

For det andre er dette ikke en AWS VM montering en AWS S3 bøtte, dette er en av våre servere og vårt rør i disse dager er helt mettet, så du vil forvente at den tidligere oppsettet skal være raskere enn det jeg har gjort (godt vårt rør er ikke veldig stort - takk NMFS &#33; - men er vi noensinne mettet - etterspørselen etter data har vært fenomenal) ..

Til slutt lurer du kanskje på - jeg vil rulle min egen, hvor skal jeg begynne i tillegg til dette? Jeg har funnet en ting LLMs er god på er informasjon som er velkjent og godt dokumentert, og AIs jeg har sjekket (Det går alle mine polletter&#33;&#33;) alle vet rclone og AWS og GCP ganske bra, og kan gjøre det meste av oppsettet for deg. Faktisk var jeg på utkikk etter et datasett som ville være bra å demo, og en AI ga meg flere forslag og genererte det meste av det som er ovenfor, selv om jeg gjorde noen redigeringer for mitt eget oppsett.

Husk også at Seth skrev en ny S3 for denne versjonen (2.30) av ERDDAP™ - Jeg har ikke sammenlignet hastigheter, og jeg forestiller meg avhengig av hva du gjør hver vil ha sine fordeler. For porting over eksisterende ERDDAP™ installasjon, ved bruk av rclone kan forenkle prosessen.

-Roy

PS - Og husk rclone fungerer over et bredt utvalg av leverandører, dette er ikke begrenset til AWS og bare noen endringer i \"Rclone config\" innstillingene er nødvendig for en annen leverandør.


Ta i bruk en systemtjeneste (endres etter behov for bruker etc) :)
————————————————

[Eining]
Beskrivelse=Rclone-montering for NOAA OISST på AWS
Wants=network-online .tar Få
After=network-online .tar Få

[Service]
Type=notifiser
Bruker=din bruker
Gruppe = din gruppe

ExecStart=/usr/bin/rclone mount oi sst :noaa-cdr-sea-overflate-temp-optimum-interpolation-pds/data/v2.1/avhrr /mnt/oi sst \\
--lesbar -
-- la andre \\
--dir-perms 0755 \\
--file-perms 0644 \\
--vfs-cache-mode full \\
--vfs-cache-max-størrelse 1G \\
--vfs-cache-poll-interval 1m
--vfs-les-chunk-størrelse 64M \\
--vfs-les-chunk-size-limit 1G \\
--vfs-read-ahead 256M
--buffer-størrelse 64M \\
--dir-cache-tid 24h \\
--attr-timeout 1s \\
--no-modtime

ExecStop=/bin/fusermount -uz /mnt/oi sst 
Start om=på feil
Start omSec=10

[Installer]
Wantedby=fleirtynner .tar Få
