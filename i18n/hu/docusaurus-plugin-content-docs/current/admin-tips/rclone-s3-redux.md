Ez a tartalom egy [Roy Mendelssohn üzenete a ERDDAP felhasználók csoport](https://groups.google.com/g/erddap/c/H-vJoGP42TI) ...

Running ERDDAP™ A felhőben forró téma lett. Meg kell jegyeznem, hogy ERDDAP™ mindig a felhőben futott, csak a legtöbbször nem egy kereskedelmi felhő szolgáltató által nyújtott szerveren, és a futás fő akadálya ERDDAP™ egy kereskedelmi felhő szolgáltató, ha használja S3 tároló, amely nem teszi lehetővé a normál Linux blokk hozzáférést. Ha hajlandó többet fizetni a kereskedelmi felhő szolgáltatója által biztosított blokk-hozzáférési lehetőségek használatáért, mint egy kereskedelmi felhőkiszolgáló futtatása alapvetően ugyanaz, mint a saját felszerelése, kivéve természetesen a költségeket.

Miután elmondta, hogy 2025. december 1-jén írtam egy "klone és S3" bejegyzést, és ez egy követés. Ebben az e-mailben felszereltem a GOES17 fürdőket, és ellenőriztem egy fájlt, de nem vettem át az egész utat. ERDDAP™ látni, hogy mindez zökkenőmentesen működik. És igen kiddos, akkor próbálja meg ezt otthon, és nem kell konzultálni egy ügyvéd vagy orvosi tanácsadó, ez minden biztonságos. Itt szerelem az NCDC OI-t sst avhrr v2.1, amely az AWS-en van, állítsa be ERDDAP™ és a show az eredményeket.

- 1. lépés: Definiálja a végpontot a rikonban

Rune konfigurálja oi sst S3 \\
szolgáltató AWS \\
régió us-east-1 \\
place_constraint us-east-1 \\
dalszöveg: Env_auth Hase
anonim igaz


- 2. lépés: Hozzon létre egy hegyi pontot az adatkészlethez

sudo mkdir -p /mnt/oi sst 
sudo "$USER: $USER" /mnt/oi sst 

- 3. lépés: szerelje fel az S3 tárolót a hegyi ponthoz

Engedélyek, engedélyek, engedélyek, engedélyek... (Steve Ballmer bocsánatkéréssel, ha tudod, hogy tudod) ,

A hegyet meg kell tenni, hogy bármilyen felhasználó futtassa a tomcatot, általában a felhasználói "tomcat" hozzáférést biztosít az adatokhoz. A "klón" felszereli az adatkészletet a felhasználó tulajdonosával és csoportjával, amely végrehajtja a hegyi parancsot, és információt szeretne tárolni a felhasználó otthoni könyvtárában (ez valószínűleg mérsékelt, ha ezt rendszerszintű folyamatként állítja be - lásd alább) ... Tehát ha lehet, végezze el a hegyi parancsot, mint ’tomcat’, de ha tetszik nekünk a tomcat nem rendelkezik otthoni könyvtárral, akkor a hegyi parancsot más felhasználóként kell végrehajtania. Ehhez szerkesztse a fuse-t. konf fájl:

1. sudo vi /etc/fuse.conf

2. Kérdezés vagy hozzáadás:

felhasználó_allow_other

3. Mentés és kilépés.


A tényleges adatok több réteg mély, és én szerelem az adat szinten, nem a felső szinten, és végrehajtja a parancsot egy tmux terminál, így a parancs továbbra is fut:

Rclone - Vv Mount Oi sst :noa-cdr-sea-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr /mnt/oi sst \"
- csak olvasni
- Sárga-más \\
--vfs-cache-mode teljes \\
--vfs-cache-max méret 1G \\
--vfs-cache-poll-interval 1m \\
--vfs-read-chunk méret 64M \\
Vfs-read-chunk-size-limit 1G \\
--vfs-read-ahead 256M \\
- puffer méretű 64M \\
- Dir-cache-time 24h \\
- attr-timeout 1s \\
- nem-modtime


- 4. lépés: Használja a GenerateDatasets Xml mint normális,

Használat EDDGrid FromNcFiles mint adattípus, és a könyvtár /mnt/oi sst /. Az első lépés elég jó volt, és problémák nélkül dolgozott. Három változást hoztam az xml-es rabláshoz, amit a GenerateDatasets futtatása során elvégezhettem Xml és azok:

1. Változtassa meg az adatkészletet, hogy oi sst _rclone

2. A könyvtár tartalmaz egy keveréket a fájlok egy bizonyos befejezése " .nc Mások pedig a „prelimináriumban” végződnek .nc Csak az előbbi kívánatos. Ehhez a fájlnév regex:

 <fileNameRegex> Oi sst avhrr-v02r01\\.d&#123;8&#125; .nc  </fileNameRegex> 

Gyakran mondtam, hogy a regexet az élet egyik rejtélyének találom, és lehet, hogy jobb módja van a regexnek. De ez működött

3. Az ioos_category nem volt beállítva, hozzáadtam azokat.

Az állandó termelési munkához az xml snippet egy kicsit több szerkesztést használhat, hogy teljesebb legyen.

- 5. lépés: Adja hozzá az xml snippetet datasets.xml és állítsa be a zászlót

Ez hosszú időt vesz igénybe, hogy terhelje az első lépést, így találjon más dolgokat, hogy a többi nap.

A végső eredmény:

 https://upwell.pfeg.noaa.gov/erddap/griddap/oisst_rclone.graph
 

Most nézd meg, hogy ez nem túl fájdalmas&#33;

Ha az eredményekkel játszik, vegye figyelembe először, hogy a rclone beállítások egy első találgatás, és tesztelni kell az optimalizálás. Jonathan Sherman a csoportunk nézte ezt a néhányat, és lehet beszélni róla az IOOS DMAC találkozóján. Ezenkívül sokkal több témát fog lefedni a Google Cloud Platform beállításával kapcsolatban, mint például a VM létrehozásának módja, létrehozva az S3 bucketet, hogy hierarchikus nevet kapjon, amely a GCP-n gyorsabb és csak egy kicsit drágább, és ha feldolgozó szkripteket futtat, hogy frissítse az általa szolgáltatott adatokat a GCP-n ERDDAP™ hogyan lehet ezeket felállítani. Ha ez a téma érdekli, akkor arra ösztönözlek benneteket, hogy hallgassatok a beszélgetésre. A ERDDAP™ felfelé és fut, csak pillanatnyilag nem érhető el kívülről NMFS hálózat.

Másodszor, ez nem egy AWS VM szerelvény egy AWS S3 vödör, ez az egyik szerverünk és a cső ezekben a napokban teljesen telített, így azt várná, hogy az egykori beállítás gyorsabb, mint amit tettem. (jól a csőnk nem túl nagy - hála NMFS - de valaha is telítettünk - az adatok iránti kereslet fenomenális volt) ...

Végül csodálkozhatsz - saját magamat akarom görgetni, hol kezdek el ezen kívül? Találtam egy dolgot LLM jó az információ, hogy jól ismert és jól dokumentált, és az AIs ellenőriztem (Ott megy az összes token&#33;) Mindenki jól ismeri a rclone-t és az AWS-t és a GCP-t, és megteheti a legtöbb beállítást az Ön számára. Valójában olyan adathalmazt kerestem, amely jó lenne demoálni, és egy AI több javaslatot adott nekem, és a legtöbbet létrehozta, ami fent van, bár tettem néhány szerkesztést a saját beállításomhoz.

Ne feledje, hogy Seth új S3-at írt a jelenlegi verzióra (2.30) a ERDDAP™ - Nem hasonlítottam a sebességet, és elképzelem, attól függően, hogy mit csinálsz, mindegyiknek megvan az előnyei. A meglévő portoláshoz ERDDAP™ telepítés, a rclone segítségével egyszerűsítheti a folyamatot.

-Roy

PS - És ne feledje, hogy a rikon széles választékban működik, ez nem korlátozódik az AWS-re, és csak néhány változtatásra van szükség a "ruha konfigurálásához" beállításokra egy másik szállító számára.


Készüljön be egy rendszer szolgáltatásba (a felhasználó számára megfelelő módosítás stb.) :
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

[[szerkesztés]]]
Leírás=Rclone szerelvény NOAA OISST az AWS-en
Wants=hálózat-online .tar kap
After=hálózat-online .tar kap

[Szolgáltatás]
Type=notify
Felhasználó: YourUser
Csoport=yourGroup

ExecStart=/usr/bin/rclone mount oi sst :noa-cdr-sea-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr /mnt/oi sst \"
- csak olvasni
- Sárga-más \\
--dir-perms 0755 \\
--file-perms 0644 \\
--vfs-cache-mode teljes \\
--vfs-cache-max méret 1G \\
--vfs-cache-poll-interval 1m \\
--vfs-read-chunk méret 64M \\
Vfs-read-chunk-size-limit 1G \\
--vfs-read-ahead 256M \\
- puffer méretű 64M \\
- Dir-cache-time 24h \\
- attr-timeout 1s \\
- nem-modtime

ExecStop=/bin/fusermount -uz /mnt/oi sst 
Restart=on-hiba
RestartSec=10

[Install]
WantedBy=multi-user .tar kap
