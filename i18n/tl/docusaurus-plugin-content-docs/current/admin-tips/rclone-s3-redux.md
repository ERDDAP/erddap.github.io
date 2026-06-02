Ang nilalamang ito ay batay sa isang [mensahe mula kay Roy Mendelssohn hanggang sa ERDDAP grupong gumagamit](https://groups.google.com/g/erddap/c/H-vJoGP42TI) .

Pagtakbo ERDDAP™ sa ulap ay naging isang mainit na paksa. Dapat kong pansinin na ERDDAP™ ay laging tumatakbo sa ulap, kadalasan ay wala sa server na inilalaan ng komersiyal na tagapaglaan ng ulap, at ang pangunahing hadlang sa pagtakbo ERDDAP™ sa komersiyal na provider ng ulap ay kung gagamit ka ng S3 storage, na nagpapangyari sa normal na Linux block access. Kung handa kang magbayad nang higit upang gamitin ang mga mapagpipilian sa pagkuha ng block na inilalaan ng iyong komersiyal na tagapaglaan ng ulap, kaysa sa pagpapatakbo sa isang komersiyal na server ng ulap ay pangunahin nang katulad ng pagtakbo sa iyong sariling kagamitan, maliban sa mangyari pa ang halaga.

Palibhasa'y nasabi ko iyan, noong Dis. 1, 2025 ay sumulat ako ng isang post “rclone at S3” at ito ay isang kasunod na up. Sa email na iyon ay ikinabit ko ang gulpo ng GOS17 at tiningnan ko ang isang file, subalit hindi ko ito tinanggap ERDDAP™ upang makita na lahat ng ito ay gumagana nang maayos. At oo, maaari mo itong subukan sa bahay at hindi mo na kailangang kumonsulta sa isang abogado o doktor, dapat na ligtas ito. Dito ay ipinasakay ko ang NCDC OI sst Itinatag ito ng avihrr v2.1 na nasa AWS. ERDDAP™ at sa palabas ang mga resulta.

- Hakbang 1: Ipaliwanag ang dulo sa rclone

Likido ang lumilikha ng oi sst s3 \\
tagapaglaan AWS \\
rehiyon ng we-east-1 \\
kinaroroonan_constraint amin-east-1 \\
env_auth false \\
Hindi kilalang totoo


- Hakbang 2: Gumawa ng mas malaking punto para sa dataset

sudo mkdir -p /mnt/oi sst 
"$USER:$USER" /mnt/oi sst 

- Hakbang 3: Iakyat ang imbakan ng S3 hanggang sa taluktok ng bundok

Mga pahintulot, pahintulot, pahintulot, pahintulot.... (Sa paghingi ng paumanhin kay Steve Balmer, kung alam mo na alam mo) ,

Ang pagtaas ay dapat gawin upang anumang gumagamit nito ay makakuha ng impormasyon. ‘ Arcloneić ang dataset sa may - ari at grupo ng gumagamit na nagpapatupad sa utos na pataas at nagnanais na mag - imbak ng impormasyon sa home directory ng gumagamit (Malamang na ito'y pinag - iisipan kung ilalagay mo ito bilang isang sistema na may antas sa ibaba) . Kaya kung magagawa mo, isagawa mo ang utos sa bundok bilang ’tomcat’, ngunit kung tulad namin ang iyong tomcat ay walang home directory kailangan mong isagawa ang utos sa bundok bilang ibang user. Para magawa ito, ayusin ang fuse. talaksang conf:

1. sudo vi /etc/fuse.conf

2. Hindi kaugnay o nakadaragdag:

gumagamit_chand_ iba pa

3. Magtipid at lumabas.


Ang aktuwal na impormasyon ay ilang suson ang lalim, at ako'y dumarami sa antas ng datos, hindi sa pinakamataas na antas, at isinasagawa ko ang utos sa isang smox terminal upang ang utos ay patuloy na tumakbo:

rclone -vv bundok oi sst :noaa-cdr-sea-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr /mnt/oi sst \\
-- Basahin-lamang \\
--wallow-ibang \\
--vfs-cache-mode puno \\
-vfs-cache-max-size 1G \\
-vfs-cache-poll-interval 1m \\
-vfs-read-chunk-size 64M \\
-vfs-read-chunk-size-limit 1G \\
-vfs-read-ahead 256M \\
--buffer-size 64M \\
-dir-cache-time 24h \\
-atr-timeout 1s \\
--no-modtime


- Hakbang 4: Gumamit ng GenerateDatasets Xml na gaya ng normal,

Gamitin EDDGrid Mula saNcFiles bilang datatype, at ang directory ay /mnt/oi sst /. Ang panimulang daanan ay maganda at gumagana nang walang problema. Gumawa ako ng tatlong pagbabago sa xml snippet na maaari sanang ginawa samantalang tumatakbo sa GenerateDatasets Xml at yaon ay:

1. Binago ang datasetid upang maging oi sst _rclone

2. Ang directory ay naglalaman ng isang halo ng mga files na ang ilan ay nagtatapos sa “ .nc " at iba pa na nagwawakas sa “preliminary .nc Ang ” at ang nauna lamang ang ninanais. Upang gawin ito ang pagbabago ng pangalan:

 <fileNameRegex> oi sst -avhrr-v02r01\\.\\di&#123;8&#125; .nc  </fileNameRegex> 

Madalas kong sabihin na ang regex ay isa sa mga hiwaga ng buhay, at maaaring may mas mabuting paraan ng paggawa ng regex. Subalit mabisa ito

3. Hindi itinakda ang iioos_category, at idinagdag ko pa iyon.

Para sa permanenteng gawaing produksiyon ang xml snippet ay maaaring gumamit ng kaunti pang pagsasaayos upang maging mas kumpleto.

- Hakbang 5: Idagdag ang xml snippet sa xml datasets.xml at inilagay ang bandila

Ito'y nangangailangan ng mahabang panahon upang magpasan muna, kaya humanap ng iba pang mga bagay na gagawin sa buong maghapon.

Ang pangwakas na resulta ay:

 https://upwell.pfeg.noaa.gov/erddap/griddap/oisst_rclone.graph
 

Ngayon tingnan mo na napakasakit niyan&#33;

Kung lalaroin mo ang resulta, pansinin mo muna na ang mga setting na rclone ay isang unang hula, at dapat na subukin para sa optimisasyon. Pinagmasdan ito ni Jonathan Sherman ng aming grupo at maaaring pinag - uusapan niya ito sa kaniyang pahayag sa pulong ng IOS DMAC. Sasaklawin din niya ang mas marami pang mga paksa na may kaugnayan sa pagtatayo ng Google Cloud Platform, tulad ng kung paano mag-eensayo ng setup ng VM, pag-ayos ng bucket upang magkaroon ng espasyo ng pangalan ng S3 na sa GCP ay mas mabilis at mas mahal lamang nang kaunti, at kung ikaw ay tatakbo ng mga script ng pagproseso upang i-update ang data na pinaglilingkuran ng ERDDAP™ kung paano itatayo ang mga iyon. Kung interesado kayo sa paksang ito hinihimok ko kayong makinig sa kaniyang pahayag. Ang ERDDAP™ pataas at tumatakbo, talagang hindi ito makukuha sa sandaling mula sa labas NMFS network.

Ikalawa ito ay hindi isang AWS VM na gumagawa ng isang timba na AWS S3, ito ang isa sa aming mga server at ang aming tubo sa mga araw na ito ay lubusang babad na sa tubig, kaya aasahan ninyo na ang dating setup ay mas mabilis kaysa nagawa ko (ang aming pipa ay hindi gaanong salamat NMFS &#33; - Pero talaga bang kailangang - kailangan natin ang impormasyon?) .

Sa wakas ay baka itanong mo - gusto kong gumawa ng sarili kong listahan, saan pa ako magsisimula bukod dito? Nasumpungan ko ang isang bagay na mahusay saLM ay ang impormasyon na kilalang - kilala at lubhang dokumentado, at ang AIs I check (hayun&#33;) Lahat ay marunong ng rclone at AWS at GCP maganda, at magagawa ang karamihan ng setup para sa iyo. Sa katunayan ako'y naghahanap ng isang dataset na makabubuti sa demo, at binigyan ako ng AI ng ilang mungkahi at ginawa ko ang karamihan ng nasa itaas, bagaman gumawa ako ng ilang pagsasaayos para sa aking sariling setup.

Gayundin, tandaan na sumulat si Set ng isang bagong S3 para sa kasalukuyang bersiyon (2.30) ng ERDDAP™ -Hindi ko naihambing ang bilis, at naguguniguni ko na depende sa ginagawa ninyo bawat isa ay magkakaroon ng mga bentaha. Para sa pagdaong sa isang umiiral ERDDAP™ Ang paglalagay, na ginagamit ang rclone ay maaaring magpasimple sa proseso.

-Roy

PS - At tandaan na ang rclone ay nagtatrabaho sa isang malawak na hanay ng mga tindero, ito ay hindi natatakdaan sa AWS at ilang pagbabago lamang sa “rclone  configić settings ang kinakailangan para sa isang ibang tindero.


Gawing isang serbisyo ang sistema (Pagbabago bilang angkop para sa gumagamit atbp) :
— Eipioximanificitificitixić

[ Talababa]
Larawan=Rclone na bundok para sa NOAA OSIST on AWS
Gusto=network-online .tar tumatanggap
Pagkatapos ng=network-online .tar tumatanggap

[ Talababa]
Uri=Tsino
User=YouUser
Grupo=YouGroup

REPORTSST=/usr/bin/rclone bundok oi sst :noaa-cdr-sea-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr /mnt/oi sst \\
-- Basahin-lamang \\
--wallow-ibang \\
-dir-perms 0755 \\
--file-perms 0644 \\
--vfs-cache-mode puno \\
-vfs-cache-max-size 1G \\
-vfs-cache-poll-interval 1m \\
-vfs-read-chunk-size 64M \\
-vfs-read-chunk-size-limit 1G \\
-vfs-read-ahead 256M \\
--buffer-size 64M \\
-dir-cache-time 24h \\
-atr-timeout 1s \\
--no-modtime

PROPS top=/bin/fusermount -uz /mnt/oi sst 
Kapahingahan=on-failure
RestartSec=10

[Install]
Gusto Sa Pamamagitan ng=Russ-user .tar tumatanggap
