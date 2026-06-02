Dette indhold er baseret på en [besked fra Roy Mendelssohn til te ERDDAP Brugere gruppe](https://groups.google.com/g/erddap/c/H-vJoGP42TI) .

Løb ERDDAP™ i skyen er blevet et varmt emne. Jeg skal bemærke, at ERDDAP™ har altid kørt i skyen, kun det meste af tiden ikke på en server, der leveres af en kommerciel cloud-udbyder, og den store impediment til at køre ERDDAP™ på en kommerciel cloud-udbyder er, hvis du bruger S3-lagring, som ikke tillader normal Linux-blok adgang. Hvis du er villig til at betale mere for at bruge blokeringsadgangsmulighederne fra din kommercielle cloud-udbyder, end du kører på en kommerciel cloud-server er dybest set den samme som at køre på dit eget udstyr, bortset fra naturligvis omkostningerne.

Efter at have sagt, at 2025 skrev jeg et indlæg “rclone og S3” og det er en opfølgning. I den e-mail monterede jeg GOES17 sederne og kontrollerede en fil, men jeg tog ikke den hele vejen ind ERDDAP™ for at se, at det hele virker glat. Og ja kiddos, kan du prøve dette derhjemme, og du behøver ikke at konsultere en advokat eller læge, det bør alle være sikker. Her monterer jeg NCDC OI sst avhrr v2.1, der er på AWS, sætte det op i ERDDAP™ og show resultaterne.

- Trin 1: Definer slutpunktet i rclone

rclone config skaber oi sst s3 \\
udbyder AWS \\
region us-øst-1 \\
Beliggenhed_constraint us-øst-1 \\
env_auth falsk \\
anonym sand


- Trin 2: Opret et monteringspunkt for datasættet

sudo mkdir -p /mnt/oi sst 
klovn "$USER:$USER" /mnt/oi sst 

- Trin 3: Montering af S3-lagringen til monteringspunktet

Tilladelser, tilladelser, tilladelser.... (Med apologier til Steve Ballmer, hvis du ved, du ved, at du ved) ,

Monteringen skal gøres, så enhver bruger kører din tomcat, normalt bruger "tomcat", kan få adgang til dataene. ‘rclone’ monterer datasættet med ejer og gruppe af brugeren, der udfører monteringskommandoen og ønsker at gemme oplysninger i brugerens hjemmemappe (Dette er sandsynligvis mitigeret, hvis du indstiller dette op som en systemniveau proces - se nedenfor) . Så hvis du kan udføre monteringskommandoen som ’tomcat’, men hvis du som os har din tomcat ikke en hjemmemappe, skal du udføre monteringskommandoen som en anden bruger. Sådan redigeres sikringen. Tilføjelse af fil:

1. sudo vi /etc/fuse.conf

2. Indtagelse eller tilføjelse:

Bruger_allow_and

3. Gem og udgang.


De faktiske data er flere lag dybt, og jeg monterer på dataniveauet, ikke på topniveau og udfører kommandoen i en tmux-terminal, så kommandoen fortsætter:

rclone -vvv mount oi sst :noaa-cdr-sea-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr /mnt/oi sst \\
--læs kun \\
--til-andet \\
--vfs-cache-mode fuld \\
--vfs-cache-max-size 1G \\
--vfs-cache-poll-interval 1m \\
--vfs-read-chunk-size 64M \\
--vfs-read-chunk-size-grænse 1G \\
--vfs-read-ahead 256M \\
--buffer-size 64M \\
--dir-cache-time 24h \\
--attr-timeout 1s \\
--no-modtime


- Trin 4: Brug Generer datasæt Xml ligesom normalt,

Brug EDDGrid FraNcFiles som datatypen, og mappen er /mnt/oi sst /. Det oprindelige pass var ret godt og fungerede uden problemer. Jeg lavede tre ændringer i xml-snippet, der kunne have været gjort, mens du kører GenererDatasetsets Xml og dem var:

1. Ændret datasetid til at være oi sst _rclone

2. Skabelonen indeholder en blanding af filer, der slutter i " .nc " og andre slutter i "preliminary .nc ” og kun den tidligere er ønsket. For at gøre denne ændring af filnavnet regex:

 <fileNameRegex> I nærheden af oi sst - vævhrr-v02r01 .\\d&#123;8&#125;\\ .nc  </fileNameRegex> 

Jeg har ofte sagt, at jeg finder regex til at være en af livets mysterier, og der kan være bedre måder at gøre regex på. Men dette arbejde

3. Ioos_-kategorien blev ikke sat, jeg tilføjede dem.

Til permanent produktion kan xml-snippet bruge lidt mere redigering til at være mere komplet.

- Trin 5: Tilføj xml-snippet til xml datasets.xml og sæt flaget

Det tager lang tid at indlæse på første gang, så gå med andre ting at gøre for resten af dagen.

Det endelige resultat er:

 https://upwell.pfeg.noaa.gov/erddap/griddap/oisst_rclone.graph
 

Se nu, at det ikke var for smertefuldt&#33;

Hvis du spiller med resultatet, skal du først bemærke, at indstillingerne for rclone er et første gæt, og skal testes for optimering. Jonathan Sherman af vores gruppe har kigget på dette, og kan tale om det i sin tale på IOOS DMAC møde. Han vil også dække en masse flere emner relateret til opsætning i Google Cloud Platform, f.eks. hvordan man orkestrere opsætningen af VM, etablere S3-skoven for at have et hierarkisk navn, som på GCP er hurtigere og kun lidt dyrere, og hvis du kører behandling scripts til at opdatere de data, der betjenes af de data, der betjenes af den ERDDAP™ hvordan man opsætter dem. Hvis dette emne interesserer dig for at lytte til hans tale. The The The The The The The ERDDAP™ er op og kører, bare det er ikke tilgængeligt i øjeblikket udefra NMFS netværk.

For det andet er dette ikke en AWS VM montering af en AWS S3 spand, det er en af vores servere og vores rør disse dage er helt mættet, så du ville forvente den tidligere opsætning at være hurtigere, end hvad jeg har gjort (godt vores rør er ikke meget stort - takket være NMFS &#33; - men er vi nogensinde mættet - efterspørgslen efter data er blevet fænomenal) .

Endelig kan du undre dig - jeg vil rulle min egen, hvor starter jeg udover dette? Jeg har fundet en ting LLMs er god til er information, der er kendt og veldokumenteret, og de AI'er jeg har kontrolleret (der går alle mine tokens&#33;&#33;) alle kender rclone og AWS og GCP temmelig godt, og kan gøre mest af opsætningen for dig. Faktisk ledte jeg efter et datasæt, der ville være godt til demo, og en AI gav mig flere forslag og genererede mest af hvad der er ovenfor, selvom jeg gjorde nogle redigeringer for min egen opsætning.

Husk også, at Seth skrev en ny S3 for den nuværende version (2.30) af ERDDAP™ - Jeg har ikke sammenlignet hastigheder, og jeg forestiller mig afhængigt af, hvad du laver hver vil have sine fordele. Til portering over en eksisterende ERDDAP™ installation, ved hjælp af rclone kan forenkle processen.

-Roy

PS - Og husk rclone arbejder over en bred vifte af leverandører, er dette ikke begrænset til AWS og kun nogle ændringer i indstillingerne for "rclone config" er nødvendig for en anden leverandør.


Gør dig i en systemtjeneste (Ændre som passende for brugeren osv) :
————————————————————————

[Unit]
Beskrivelse=Rclone mount for NOAA OISST på AWS
Ønsker=netværk-online .tar få få få
Efter=netværk-online .tar få få få

[Service]
Type=
Bruger: Din bruger
Gruppe = Din gruppe

Udførelse Start=/usr/bin/rclone mount oi sst :noaa-cdr-sea-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr /mnt/oi sst \\
--læs kun \\
--til-andet \\
--dir-perms 0755 \\
--fil-perms 0644 \\
--vfs-cache-mode fuld \\
--vfs-cache-max-size 1G \\
--vfs-cache-poll-interval 1m \\
--vfs-read-chunk-size 64M \\
--vfs-read-chunk-size-grænse 1G \\
--vfs-read-ahead 256M \\
--buffer-size 64M \\
--dir-cache-time 24h \\
--attr-timeout 1s \\
--no-modtime

UdførelseStop=/bin/fusermount -uz / mnt/oi sst 
Genstart=on-failure
GenstartSec=10

[Install]
Ønsket By=multi-bruger .tar få få få
