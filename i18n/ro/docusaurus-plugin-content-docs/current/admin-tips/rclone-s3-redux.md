Acest conţinut se bazează pe [mesaj de la Roy Mendelssohn la ERDDAP grupul de utilizatori](https://groups.google.com/g/erddap/c/H-vJoGP42TI) .

Rularea ERDDAP™ în nor a devenit un subiect fierbinte. Ar trebui să observ că ERDDAP™ a rula întotdeauna în nor, doar cele mai multe ori nu pe un server furnizat de un furnizor de cloud comercial, și impedimentul major pentru rularea ERDDAP™ pe un furnizor de cloud comercial este dacă utilizați S3, care nu permite accesul normal Linux bloc. Dacă sunteți dispus să plătească mai mult pentru a utiliza opțiunile de acces bloc furnizate de furnizorul dvs. de cloud comercial, decât rularea pe un server de cloud comercial este practic același cu rularea pe propriul echipament, cu excepția, desigur, costul.

După ce a spus că, la 1 decembrie 2025 am scris un post de rclone și S3  În acel e-mail am montat GOES17 swathes și a verificat un fișier, dar nu am luat-o tot drumul în ERDDAP™ să văd că totul merge bine. Şi da copii, puteţi încerca asta acasă şi nu trebuie să vă consultaţi cu un avocat sau un consilier medical, ar trebui să fie totul în siguranţă. Aici am monta OI NCDC sst avhrr v2.1 care este pe AWS, setați-l în ERDDAP™ și arată rezultatele.

- Etapa 1: Definirea obiectivului final în rclonă

RClone config create oi sst S3 \\
furnizor AWS \\
regiunea ne-est-1
locație_constrânge-ne-est-1 \\
Env_auth fals
anonim adevărat


- Etapa 2: Crearea unui punct de montare pentru setul de date

sudo mkdir -p/mnt/oi sst 
sudo chown "$USER:$USER" /mnt/oi sst 

- Pasul 3: Montarea depozitului S3 la punctul de montare

Permisiuni, permisiuni, permisiuni, permisiuni... (Cu scuze lui Steve Ballmer, dacă ştii că ştii) ,

Mount trebuie să fie făcut astfel încât orice utilizator ruleaza Tomcat dvs., de obicei, utilizator   (acest lucru este probabil atenuat dacă setați acest lucru ca un proces de nivel de sistem - a se vedea mai jos) . Deci, dacă puteți, executa comanda de montare ca  Pentru a face acest lucru edita siguranta. fișier conf:

1. sudo vi /etc/fuze.conf

2. Decomentează sau adaugă:

utilizator_allow_other

3. Salvare şi ieşire.


Datele reale sunt mai multe straturi adanci, si eu sunt montarea la nivelul de date, nu la nivelul de sus, si execut comanda intr-un terminal tmux astfel încât comanda continua sa ruleze:

rclone -vv Mount oi sst :noa-cdr-sea-suprafață-temper-optimum-interpolation-pds/data/v2.1/avhrr /mnt/oi sst \\
--citeste-doar \\
--permis-altul \\
--vFS-cache-mod complet \\
--vfs-cache-max-size 1G\\
--vfs-cache-poll-interval 1m
--vfs-read-chunk-size 64M \\
--vfs-read-chunk-size-limit 1G \\
--vfs-citire-force 256M
--Buffer-size 64M\\
--dir-cache-time 24h \\
--attr-timeout 1s \\
--no-modtime


- Pasul 4: Foloseste datele generate Xml ca de obicei,

Utilizare EDDGrid FromNcFiles este tipul de date, iar directorul este /mnt/oi sst /. Permisul iniţial a fost destul de bun şi a funcţionat fără probleme. Am făcut trei modificări la fragmentul xml care ar fi putut fi făcut în timp ce rulează GenerateDatasets Xml și cele care au fost:

1. A modificat setul de date pentru a fi Oi sst _rclonă

2. Dosarul conține un amestec de fișiere unele se încheie în  .nc "şi altele care se termină în preliminar .nc Şi numai cei dintâi sunt doriţi. Pentru a face acest lucru, modificați numele de fișier regex:

 <fileNameRegex> Oi sst - Avhrr-v02r01. .nc  </fileNameRegex> 

Am spus adesea că Regex mi se pare unul dintre misterele vieții, și ar putea exista modalități mai bune de a face regexul. Dar acest lucru a lucrat

3. Categoria ioos_ nu a fost stabilită, le-am adăugat.

Pentru munca de producție permanentă, fragmentul xml poate folosi un pic mai mult editare pentru a fi mai completă.

- Pasul 5: Adăugaţi fragmentul xml la datasets.xml și a stabilit steagul

Acest lucru ia o lungă perioadă de timp pentru a încărca pe prima trecere, așa că du-te găsi alte lucruri de făcut pentru restul zilei.

Rezultatul final este:

 https://upwell.pfeg.noaa.gov/erddap/griddap/oisst_rclone.graph
 

Acum vezi că nu a fost prea dureros&#33;

Dacă jucați cu rezultatul, rețineți mai întâi că setările rclone sunt o primă presupunere, și ar trebui să fie testate pentru optimizare. Jonathan Sherman din grupul nostru s-a uitat la asta şi poate vorbeşte despre asta în discursul său de la şedinţa IOOS DMAC. El va acoperi, de asemenea, o mult mai multe subiecte legate de înființarea în Google Cloud Platform, cum ar fi modul de a orchestra configurarea VM, înființarea găleata S3 pentru a avea un spațiu nume ierarhic care pe GCP este mai rapid și doar un pic mai scump, și dacă executați scripturi de procesare pentru a actualiza datele deservite de către ERDDAP™ cum să le aranjezi. Dacă acest subiect te interesează, te încurajez să-i asculţi discursul. ă ERDDAP™ este în sus și să fie difuzate, doar că nu este accesibil în acest moment din afara NMFS Reţeaua.

În al doilea rând, aceasta nu este o AWS VM montarea o găleată AWS S3, aceasta este unul dintre serverele noastre și conducta noastră aceste zile este complet saturate, așa că v-ați aștepta ca fosta configurare să fie mai rapid decât ceea ce am făcut (pipa noastră nu este foarte mare - mulțumesc NMFS - Dar suntem vreodată saturat - cererea de date a fost fenomenal) .

În cele din urmă s-ar putea întreba - vreau să rola mea, în cazul în care nu am începe în afară de asta? Am găsit un lucru la care LLM sunt bune informaţiile bine cunoscute şi bine documentate, şi AI-ul pe care l-am verificat. (Nu merge toate jetoanele mele&#33;&#33;) toate știu Rclone și AWS și GCP destul de bine, și poate face cele mai multe dintre configurarea pentru tine. De fapt, am fost în căutarea unui set de date care ar fi bine să demo, și un AI mi-a dat mai multe sugestii și a generat cea mai mare parte a ceea ce este mai sus, deși am făcut unele editări pentru propria mea configurare.

De asemenea, amintiți-vă Seth a scris un nou S3 pentru versiunea actuală (2, 30) din ERDDAP™ - Nu am comparat vitezele, și îmi imaginez în funcție de ceea ce faci fiecare va avea avantajele sale. Pentru portul peste un existent ERDDAP™ instalare, folosind rclone poate simplifica procesul.

- Roy.

PS - Și amintiți-vă rclone lucrează peste o gamă largă de furnizori, acest lucru nu este limitat la AWS și doar unele modificări la setările de configurare rclone sunt necesare pentru un alt furnizor.


Transformă într-un serviciu de sistem (se modifică după caz pentru utilizator etc.) :


[Unit]
Descriere=Rcone Mount for NOAA OISST pe AWS
Wants=network-online .tar Ia
After=network-online .tar Ia

[Servicii]
Tip = notificare
Utilizator=Utilizatorul tău
Grup = grupul dumneavoastră

ExecStart=/usr/bin/rclone mount oi sst :noa-cdr-sea-suprafață-temper-optimum-interpolation-pds/data/v2.1/avhrr /mnt/oi sst \\
--citeste-doar \\
--permis-altul \\
--dir-perms 0755 \\
--file-permes 0644 \\
--vFS-cache-mod complet \\
--vfs-cache-max-size 1G\\
--vfs-cache-poll-interval 1m
--vfs-read-chunk-size 64M \\
--vfs-read-chunk-size-limit 1G \\
--vfs-citire-force 256M
--Buffer-size 64M\\
--dir-cache-time 24h \\
--attr-timeout 1s \\
--no-modtime

ExecStop=/bin/fusermount -u /mnt/oi sst 
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user .tar Ia
