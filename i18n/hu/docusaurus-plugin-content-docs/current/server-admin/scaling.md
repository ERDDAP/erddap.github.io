---
sidebar_position: 5
---
# Skaling

## ERDDAP™- Heavy Loads, Grids, Klaszterek, Föderációk és Cloud Computing{#erddap---heavy-loads-grids-clusters-federations-and-cloud-computing} 
 

## ERDDAP:

[ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/index.html)egy webes alkalmazás és egy webes szolgáltatás, amely összegyűjti a különböző helyi és távoli forrásokból származó tudományos adatokat, és egyszerű, következetes módot kínál arra, hogy letöltse az adatokat a közös fájlformátumokban, és grafikákat és térképeket készítsen. Ez a weboldal megvitatja a nehéz kérdésekkel kapcsolatos kérdéseketERDDAP™Használja a terheléseket és felfedezi a rendkívül nehéz terhek kezelésének lehetőségeit hálózatokon, klasztereken, szövetségeken és felhőalapú számításon keresztül.

Az eredeti változatot 2009 júniusában írták. Nem voltak jelentős változások. Ez volt a legutóbbi frissített 2019-04-15.

## DISCLAIMER{#disclaimer} 

A weboldal tartalma a Bob Simons személyes véleménye, és nem feltétlenül tükrözi a kormány vagy aNational Oceanic and Atmospheric Administration... A számítások egyszerűek, de szerintem a következtetések helyesek. Használtam hibás logikát, vagy hibáztam a számításaimban? Ha igen, a hiba egyedül az enyém. Kérjük, küldjön e-mailt a korrekcióvalerd dot data at noaa dot gov...
 

- -

## Nehéz terhek / korlátok{#heavy-loads--constraints} 

Nehéz használat esetén egy önállóERDDAP™lesz korlátozva (a legkevésbé valószínű) :

### Távoli forrás Bandwidth{#remote-source-bandwidth} 
1. Egy távoli adatforrás sávszélessége - Még hatékony kapcsolattal (pl.:OPeNDAP) hacsak egy távoli adatforrásnak nagyon magas sávszélességű internetkapcsolata van,ERDDAPA válaszokat az fogja korlátozni, hogy milyen gyorsanERDDAP™adatokat szerezhet az adatforrásból. A megoldás az adatkészlet másolása ontoERDDAP"A kemény meghajtó, talán[EDDGridMásolás](/docs/server-admin/datasets#eddgridcopy)vagy[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy)...
     
### ERDDAPSzerver Bandwidth{#erddaps-server-bandwidth} 
2. Hacsak nemERDDAP"A szervernek nagyon magas sávszélességű internetkapcsolata van,ERDDAPA válaszokat az fogja korlátozni, hogy milyen gyorsanERDDAP™adatokat szerezhet az adatforrásokból, és milyen gyorsanERDDAP™visszaadhatja az adatokat az ügyfeleknek. Az egyetlen megoldás, hogy gyorsabb internetkapcsolatot kapjunk.
     
### Memory{#memory} 
3. Ha sok egyidejű kérés van,ERDDAP™memóriából indulhat ki, és ideiglenesen visszautasíthatja az új kérelmeket. (ERDDAP™van néhány mechanizmus, hogy elkerülje ezt, és minimalizálja a következményeket, ha ez történik.) Tehát a nagyobb memória a kiszolgálóban jobb. Egy 32 bites kiszolgálón a 4+ GB nagyon jó, 2 GB rendben van, kevésbé ajánlott. Egy 64 bites szerveren szinte teljesen elkerülheti a problémát sok memória megszerzésével. Lásd:[\\-Xmx és -Xms beállítások](/docs/server-admin/deploy-install)MertERDDAP/Tomcat. EgyERDDAP™Nehéz használat egy számítógépen egy 64 bites kiszolgálóval, 8GB memóriával és -Xmx 4000M-re van beállítva, ha valaha is, a memória korlátozza.
     
### Had Drive Bandwidth{#had-drive-bandwidth} 
4. A szerver merevlemezén tárolt adatokhoz való hozzáférés sokkal gyorsabb, mint a távoli adatokhoz való hozzáférés. Még akkor is, haERDDAP™szerver nagyon magas sávszélességű internetkapcsolattal rendelkezik, lehetséges, hogy a merevlemezen lévő adatokhoz való hozzáférés egy palackneck lesz. A részleges megoldás gyorsabban használható (pl. 10 000 RPM) mágneses merevlemezek vagy SSD meghajtók (ha van értelme költséges) ... Egy másik megoldás az, hogy különböző adatkészleteket tároljon különböző meghajtókon, hogy a kumulatív merevlemez sávszélessége sokkal magasabb legyen.
     
### Túl sok Files Cached{#too-many-files-cached} 
5. Túl sok fájl egy[Húsvét](/docs/server-admin/additional-information#cached-responses)rendező -ERDDAP™minden képet lemásol, de csak bizonyos típusú adatkérelmekre szorítja az adatokat. Lehetséges, hogy a cache könyvtár egy adatkészlet, hogy egy nagy számú fájl ideiglenesen. Ez lelassítja a kéréseket, hogy lássa, van-e egy fájl a csészében (Tényleg&#33;) ...&lt;Húsvét Minutes&gt; in[setup.xml](/docs/server-admin/deploy-install#setupxml)Hagyja, hogy beállítsa, mennyi ideig lehet egy fájl a cache-ban, mielőtt törlődik. Egy kisebb szám beállítása minimalizálná ezt a problémát.
     
### CPU{#cpu} 
6. Csak két dolog vesz egy csomó CPU időt:
    *   NetCDF4 ésHDFJelenleg 5 támogatja az adatok belső tömörítését. Nagy tömörítésNetCDF4 / 4 /HDF5 adatfájl 10 vagy több másodpercig tarthat. (Ez nem egy végrehajtási hiba. Ez a tömörítés jellege.) Tehát több egyidejű kérés az adatkészletekhez a tömörített fájlokban tárolt adatokkal, súlyos törést tehet bármely szerverre. Ha ez problémát jelent, a megoldás az, hogy népszerű adatkészleteket tároljon a nem kompresszált fájlokban, vagy kapjon kiszolgálót egy CPU-val több kukoricával.
    * grafikonok készítése (beleértve a térképeket) : durván 0,2 - 1 másodperc grafikonononként. Tehát, ha sok egyidejű egyedi kérés volt a grafikonokra (WMSAz ügyfelek gyakran 6 egyidejű kérést tesznek&#33;) CPU korlátozás lehet. Amikor több felhasználó futWMSAz ügyfelek, ez problémát jelent.
         

- -

## Többszörös identikusERDDAPLoad Balancing?{#multiple-identical-erddaps-with-load-balancing} 

Gyakran felmerül a kérdés: "A nehéz terheléssel foglalkozni, többszörös identikát hozhatok létreERDDAPS terheléskiegyensúlyozással?” Érdekes kérdés, mert gyorsan eljut a maghozERDDAPTervezés. A gyors válasz "nem". Tudom, hogy csalódást okozó válasz, de van néhány közvetlen oka, és néhány nagyobb alapvető oka annak, hogy miért terveztemERDDAP™más megközelítés alkalmazása (egy szövetségERDDAPs, e dokumentum ömlében leírva) Azt hiszem, ez egy jobb megoldás.

Néhány közvetlen ok, amiért nem tudsz/nem hozhatsz létre több azonosságotERDDAPS:

* Egy adottERDDAP™olvassa el az egyes adatfájlokat, amikor először elérhetővé válik, hogy megtalálja az adatmennyiséget a fájlban. Ezután tárolja ezt az információt indexfájlban. Később, amikor az adatok felhasználói kérelme érkezik,ERDDAP™használja ezt az indexet, hogy kitalálja, mely fájlokat keres a kért adatokra. Ha több azonosERDDAPS, mindegyikük ezt az indexálást végezné, ami elpazarolt erőfeszítés. Az alább leírt szövetségi rendszerrel az indexálás csak egyszer történik, az egyikERDDAPS.
* Bizonyos típusú felhasználói kérések (pl.:.nc, .png, .pdf fájlok)  ERDDAP™meg kell tennie az egész fájlt, mielőtt a válasz elküldhető. SzóvalERDDAP™gyorsítja ezeket a fájlokat rövid ideig. Ha azonos kérés érkezik (ahogy gyakran teszi, különösen olyan képek esetében, ahol az URL egy weboldalon van beágyazva) ,ERDDAP™újrahasznosíthatja ezt a csésze fájlt. Több azonos rendszerbenERDDAPs, ezek a csípett fájlok nem megosztottak, így mindegyikERDDAP™szükségtelenül és szennyesen újrateremteni.nc, .png vagy .pdf fájlok. Az alább leírt szövetségi rendszerrel a fájlokat csak egyszer készítik el, az egyikERDDAPés újrahasznosított.
*   ERDDAP„Az előfizetési rendszert nem kell megosztani többszörösenERDDAPS. Például, ha a terhelési egyenlegező egy felhasználót küld egy személynekERDDAP™és a felhasználó feliratkozik egy adatkészletre, majd a másikERDDAPS nem lesz tudatában ennek az előfizetésnek. Később, ha a terhelési egyensúlyozó a felhasználót másra küldiERDDAP™és kéri az előfizetéseinek listáját, a másikatERDDAP™Azt mondják, nincs senki (vezetni őt / ő, hogy egy duplikált előfizetés a másik EREDDAP) ... Az alább leírt szövetségi rendszerrel az előfizetési rendszert egyszerűen a fő, nyilvános, kompozit kezeli.ERDDAP...

Igen, minden problémára, tudtam (nagy erőfeszítéssel) mérnök egy megoldás (az információ megosztása a közöttERDDAPs) De azt hiszem,[FöderációERDDAPS megközelítés](#grids-clusters-and-federations)  (e dokumentum tömegében ismertetett) egy sokkal jobb általános megoldás, részben azért, mert más problémákkal foglalkozik, hogy a többszörös-identikusERDDAPA s-feltöltés-kiegyensúlyozó megközelítés még a világ adatforrásainak decentralizált jellegét sem kezdi el kezelni.

A legjobb, ha elfogadom az egyszerű tényt, hogy nem terveztemERDDAP™többszörös azonosnak kell lennieERDDAPrakománymérlegelővel. Tudatosan terveztemERDDAP™jól működni egy szövetségbenERDDAPs, amit hiszem, sok előnye van. Nevezetesen egy szövetségERDDAPs tökéletesen igazodik az adatközpontok decentralizált, elosztott rendszeréhez, amelyekkel a való világban rendelkezünk. (a különböző IOOS régiókra, vagy a különböző CoastWatch régiókra, vagy a NCEI különböző részeire, vagy a 100 másik adatközpontra.NOAA, vagy a különböző NASA DAAC, vagy az 1000 adatközpontok szerte a világon) ... Ahelyett, hogy elmondanák a világ összes adatközpontját, hogy fel kell hagyniuk erőfeszítéseiket, és az összes adatot központi "adattó tavába" helyezik. (még akkor is, ha lehetséges, ez egy szörnyű ötlet számos okból - lásd a különböző elemzések mutatják a számos előnye a[decentralizált rendszerek](https://en.wikipedia.org/wiki/Decentralised_system)) ,ERDDAPA design a világgal működik, mint az. Minden adatközpont, amely adatokat termel, továbbra is fenntarthatja, gyógyíthatja és szolgálhatja az adatait (ahogy kellene) És mégis,ERDDAP™, az adatok azonnal elérhetők egy centralizáltERDDAP, anélkül, hogy szükség lenne az adatok centralizált továbbításáraERDDAP™vagy az adatok kettős másolatának tárolása. Valójában egy adott adatkészlet egyszerre elérhető
egyERDDAP™olyan szervezetnél, amely elkészítette és ténylegesen tárolja az adatokat (pl. GoMOOS) ,
egyERDDAP™a szülői szervezetben (IOOS központi) ,
egy egésztőlNOAA ERDDAP™,
egy amerikai-szövetségi kormánytólERDDAP™,
globálisERDDAP™  (GOOS) ,
és szakosodottERDDAPs (pl. egyERDDAP™a HAB kutatásának szentelt intézménynél) ,
minden lényegében azonnal és hatékonyan, mert csak a metadata kerül átadásraERDDAPS, nem az adatok. Legjobb, a kezdet utánERDDAP™az eredő szervezetnél, az összes másikERDDAPS gyorsan felállítható (néhány óra munka) minimális erőforrásokkal (egy olyan kiszolgáló, amely nem igényel semmilyen RAID-t az adattároláshoz, mivel helyben nem tárol adatokat) és így valóban minimális költséggel. Hasonlítsa össze, hogy a központosított adatközpont létrehozásának és fenntartásának költsége egy adattóval, és az igazán masszív, valóban drága, internetkapcsolat szükségessége, plusz a központosított adatközpont részvételi problémája egyetlen hibapont. Számomra,ERDDAPa decentralizált, föderált megközelítés messze, sokkal magasabb rendű.

Olyan helyzetekben, ahol egy adott adatközpontnak többre van szükségeERDDAPS hogy megfeleljen a nagy keresletnek,ERDDAP"A design teljes mértékben képes megfelelni vagy meghaladni a többszörös-identikus teljesítményétERDDAPS-A-load-balancer megközelítés. Mindig lehetősége van felállítani[több kompozitERDDAPs (az alábbiakban tárgyalt) ](#multiple-composite-erddaps)Mindegyikük megkapja az összes adatot a többitőlERDDAPS, terheléskiegyensúlyozás nélkül. Ebben az esetben azt javaslom, hogy tegyen egy pontot, hogy mindegyik kompozitERDDAPmás név / személyazonosság, és ha lehetséges, a világ különböző részein hozza létre őket (pl. különböző AWS régiók) pl.:ERD\\_US\\_East,ERD\\_US\\_West,ERD\\_IE,ERD\\_FR,ERD\\_IT, hogy a felhasználók tudatosan, ismételten dolgozzanak egy adottERDDAPA hozzáadott előnyökkel, hogy egyetlen hibapontból eltávolította a kockázatot.
 

- -

## [ **Hálók, klaszterek és szövetségek** ](#grids-clusters-and-federations) {#grids-clusters-and-federations} 

Nagyon nehéz használat alatt egyetlen önállóERDDAP™befut egy vagy több[korlátok](#heavy-loads--constraints)A fent felsorolt és még a javasolt megoldások is elégtelenek lesznek. Ilyen helyzetekben,ERDDAP™olyan tulajdonságokkal rendelkezik, amelyek megkönnyítik a skálázható rácsok felépítését (is úgynevezett klaszterek vagy szövetségek) aERDDAPs amelyek lehetővé teszik a rendszer kezelését nagyon nehéz használat (pl. egy nagy adatközpont számára) ...

Én használok[háló](https://en.wikipedia.org/wiki/Grid_computing)mint általános kifejezés, hogy jelezze egyfajta[számítógépes klaszter](https://en.wikipedia.org/wiki/Computer_cluster)ahol az összes alkatrész fizikailag nem található egy létesítményben, és lehet, vagy nem lehet központilag beadni. Előnye az összekapcsolt, központi tulajdonú és kezelt hálózatoknak (klaszterek) az, hogy profitálnak a méretgazdaságból (különösen az emberi munkaterhelés) és egyszerűsítse, hogy a rendszer részei jól működjenek együtt. Előnye a nem társult hálózatoknak, nem központilag tulajdonolt és bevezetett hálózatoknak (szövetségek) az, hogy elosztják az emberi munkaterhelést és a költségeket, és további hibatűrést biztosíthatnak. Az alábbi megoldás jól működik minden rács, klaszter és szövetségi topográfiához.

A skálázható rendszer megtervezésének alapvető ötlete az, hogy azonosítsa a potenciális palackneckeket, majd megtervezze a rendszert, hogy a rendszer részei megismételhetők legyenek a palackneckek enyhítéséhez. Ideális esetben minden replikált rész növeli a rendszer ezen részének képességét lineárisan (A skálázás hatékonysága) ... A rendszer nem skálázható, kivéve, ha van egy skálázható megoldás minden palackneck számára.[Képesség](https://en.wikipedia.org/wiki/Scalability)különbözik a hatékonyságtól (milyen gyorsan elvégezhető egy feladat - az alkatrészek hatékonysága) ... A stabilitás lehetővé teszi, hogy a rendszer növekedjen a kereslet bármilyen szintjének kezelésére. **Hatékonyság**   (skálázás és alkatrészek) meghatározza, hogy hány szerverre, stb. szükség lesz egy adott szintű kereslet kielégítésére. A hatékonyság nagyon fontos, de mindig korlátozza. A stabilitás az egyetlen gyakorlati megoldás egy olyan rendszer létrehozására, amely képes kezelni **nagyon** nehéz használat. Ideális esetben a rendszer skálázható és hatékony lesz.

### Célok{#goals} 
Ennek a tervezésnek a céljai:

* Skálázható architektúra létrehozása (az egyik, amely könnyen kibővíthető bármilyen rész megismétlésével, amely túlterhelté válik) ... Annak érdekében, hogy egy hatékony rendszer, amely maximalizálja a rendelkezésre álló és átvitele az adatok adott a rendelkezésre álló számítási források. (A költség szinte mindig probléma.) 
* A rendszer alkatrészeinek képességeinek kiegyensúlyozása érdekében, hogy a rendszer egyik része ne legyen túlterhelt egy másik rész.
* Egy egyszerű architektúra kialakításához, hogy a rendszer könnyen felállítható és adminisztrálható legyen.
* Annak érdekében, hogy egy architektúrát, amely jól működik minden rácsos topográfiával.
* Annak érdekében, hogy egy rendszer, amely meghiúsítja a kegyelmet, és korlátozott módon, ha bármely rész túlterhelt. (A nagy adatkészletek másolásához szükséges idő mindig korlátozza a rendszer azon képességét, hogy hirtelen növekedjen egy adott adatkészlet iránti kereslet.) 
*    (Ha lehetséges) Hogy egy architektúra, amely nem kötődik semmilyen konkrét[felhő számítás](#cloud-computing)szolgáltatás vagy egyéb külső szolgáltatások (mert nem kell nekik) ...

### Ajánlások{#recommendations} 
Ajánlásaink
![háló / klaszter diagram](/img/cluster.png)

* Alapvetően azt javaslom, hogy egy kompozitot állítsak felERDDAP™  ( **D** a diagramban) - ami rendszeresERDDAP™kivéve, hogy csak az adatokat szolgáltatja mástólERDDAPS. A rács architektúráját úgy tervezték, hogy a lehető legtöbb munkát változtassák (CPU használat, memóriahasználat, sávszélesség használat) a kompozitbólERDDAP™a másikERDDAPS.
*   ERDDAP™két speciális adatkészlettípussal rendelkezik,[EDDGridFromErdap](/docs/server-admin/datasets#eddfromerddap)és[EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap), amely utal
adatkészletek másERDDAPS.
* Amikor a kompozitERDDAP™kérelmet kap ezekből az adatkészletekből származó adatokról vagy képekről, a kompozitERDDAP™ [átirányítás](https://en.wikipedia.org/wiki/URL_redirection)a másik adatkérésERDDAP™szerver. Az eredmény:
    * Ez nagyon hatékony (CPU, memória és sávszélesség) mert egyébként
        1. A kompozitERDDAP™meg kell küldeni az adatkérést a másiknakERDDAP...
        2. A másikERDDAP™meg kell szereznie az adatokat, meg kell reformálnia, és továbbítja az adatokat az összetettnekERDDAP...
        3. A kompozitERDDAP™meg kell kapni az adatokat (extra sávszélesség használatával) megreformálja (extra CPU időt és memóriát használ) és továbbítja az adatokat a felhasználónak (extra sávszélesség használatával) ... Az adatkérés átirányításával és a másik lehetővé tételévelERDDAP™a válasz közvetlenül a felhasználóra, az összetettERDDAP™lényegében nincs CPU-idő, memória vagy sávszélesség az adatkéréseknél.
    * Az átirányítás átlátható a felhasználó számára az ügyfélszoftvertől függetlenül (böngésző vagy más szoftver vagy parancssor eszköz) ...

### Grid alkatrészek{#grid-parts} 
[A rács részei:](#grid-parts)

 **A** : Minden távoli adatforrás, amely magas sávszélességűOPeNDAPszerver, közvetlenül kapcsolódhat a távoli szerverhez. Ha a távoli szerver egyERDDAP™HasználatEDDGridFromErddap vagy EDDTableFromERDDAPhogy szolgálja az adatokat a kompozitERDDAP... Ha a távoli szerver más típusúDAPszerver, pl. THREDDS,Hyraxvagy GrADS, használatEDDGridFromDap.

 **B** MindenERDDAP- lehetséges adatforrás (olyan adatforrás, amelybőlERDDAPolvasható adatok) ez egy magas sávú szerverrel rendelkezik, létrehozva egy másikatERDDAP™az adatforrásból származó adatok kiszolgálásáért felelős hálózatban.

* Ha több ilyenERDDAPs nem kap sok adatkérést, megszilárdíthatja őket egyERDDAP...
* HaERDDAP™az egyik távoli forrásból származó adatok túl sok kérést kapnak, van egy kísértés, hogy továbbiERDDAPs a távoli adatforráshoz való hozzáférés. Különleges esetekben ez értelmet jelenthet, de valószínűbb, hogy ez túlnyomja a távoli adatforrást (amely az önvédelem) és megakadályozza a többi felhasználót a távoli adatforráshoz való hozzáféréstől (ami nem szép) ... Ilyen esetben fontolja meg egy másik beállítástERDDAP™hogy szolgálja ezt az adatkészletet, és másolja az adatkészletet.ERDDAP"A kemény meghajtó (lásd: **C** ) talán[EDDGridMásolás](/docs/server-admin/datasets#eddgridcopy)vagy[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy)...
*    **B** A szervereknek nyilvánosan hozzáférhetőnek kell lenniük.

 **C** MindenERDDAP- olyan adatforrás, amely alacsony sávszélességű szerverrel rendelkezik (vagy lassú szolgáltatás más okokból) fontolja meg egy másik beállítástERDDAP™az adatkészlet másolatának tárolása ezenERDDAP"A kemény meghajtók, talán[EDDGridMásolás](/docs/server-admin/datasets#eddgridcopy)vagy[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy)... Ha több ilyenERDDAPs nem kap sok adatkérést, megszilárdíthatja őket egyERDDAP...
 **C** A szervereknek nyilvánosan hozzáférhetőnek kell lenniük.

#### KompozitERDDAP {#composite-erddap} 
 **D** : A kompozitERDDAP™rendszeresERDDAP™kivéve, hogy csak az adatokat szolgáltatja mástólERDDAPS.

* Mert a kompozitERDDAP™az összes adatkészlet memóriájában van információ, gyorsan reagálhat az adatkészletek listáira vonatkozó kérelmekre (teljes szöveges keresések, kategóriakeresések, az összes adatkészlet listája) és kéri az egyes adatkészletek adathozzáférési formáját, Készítsen egy grafikus formát vagyWMSInfo oldal. Ezek mind kicsi, dinamikusan generált, HTML oldalak az emlékezetben tartott információk alapján. Tehát a válaszok nagyon gyorsak.
* Mivel a tényleges adatok iránti kérelmeket gyorsan átirányítják a másiknakERDDAPS, a kompozitERDDAP™gyorsan válaszolhat a tényleges adatok kérésére anélkül, hogy bármilyen CPU-időt, memóriát vagy sávszélességet használna.
* A lehető legtöbb munkát átváltva (CPU, emlékezet, sávszélesség) a kompozitbólERDDAP™a másikERDDAPS, a kompozitERDDAP™tűnhet úgy, hogy adatokat szolgáltat az összes adatkészletből, és még mindig nagyszámú adatkérést tart fenn számos felhasználótól.
* Előzetes vizsgálatok azt mutatják, hogy a kompozitERDDAP™válaszolhat a legtöbb kérésre ~1ms CPU idő, vagy 1000 kérés / másodperc. Tehát egy 8 fő processzornak képesnek kell lennie arra, hogy körülbelül 8000 kérésre / másodpercre válaszoljon. Bár lehetséges elképzelni a magasabb aktivitás eltemetését, ami lassulást okozna, ez sok átmenet. Valószínű, hogy az adatközpont sávszélessége lesz a palackneck, mielőtt a kompozitERDDAP™lesz a palackneck.
##### up-to-date max (Idő) ?{#up-to-date-maxtime} 
AEDDGrid/TableFromErddap a kompozitbanERDDAP™csak az egyes forrásadatokkal kapcsolatos tárolt információkat módosítja, ha a forrásadatkészlet["Reload"](/docs/server-admin/datasets#reloadeverynminutes)és néhány metaadat megváltozik (pl. az idő változójaactual\\_range) Ezáltal előfizetési értesítést generál. Ha a forrásadatlap olyan adatokkal rendelkezik, amelyek gyakran változnak (például minden második új adat) és használja a["frissítés"](/docs/server-admin/datasets#updateeverynmillis)rendszer, hogy észrevegyük a gyakori változásokat az alapul szolgáló adatok,EDDGrid/TableFromErddap nem értesíti ezeket a gyakori változásokat, amíg a következő adatkészlet "reload", így aEDDGrid/TableFromErddap nem lesz tökéletesen naprakész. Ezt a problémát minimalizálhatja a forrásadatlap megváltoztatásával&lt;ReloadEveryNMinutes & Gt; kisebb értékre (60? 15?) hogy több előfizetési értesítést kapjon, hogy elmondja aEDDGrid/TableFromErddap, hogy frissítse az információt a forrás adatkészlet.

Vagy ha az adatkezelő rendszere tudja, hogy a forrásadatbázisnak új adatai vannak (pl. egy olyan forgatókönyven keresztül, amely másol egy adatfájl helyére) És ha ez nem szuper gyakori (pl. minden 5 percben, vagy kevésbé gyakori) Van egy jobb megoldás:

1. Ne használja&lt;frissítésEveryNMillis & gt; a forrásadat naprakész tárolása.
2. Állítsa be a forrásadatkészletet&lt;ReloadEveryNMinutes & Gt; egy nagyobb számra (1440?) ...
3. Vedd fel a forgatókönyvet a forrásadatkészlettel[zászló URL](/docs/server-admin/additional-information#set-dataset-flag)közvetlenül, miután másol egy új adatfájl helyére.
Ez vezet a forrásadathoz, hogy tökéletesen naprakész legyen, és azt eredményezi, hogy előfizetési értesítést generáljon, amelyet elküldnekEDDGrid/TableFromErddap adatkészlet. Ez vezetni fogEDDGrid/TableFromErddap adatkészlet, hogy tökéletesen naprakész (jól, 5 másodpercen belül az új adatok hozzáadása) ... És mindez hatékonyan fog történni (felesleges adatkészlet-reloads nélkül) ...

#### Több kompozitERDDAPs{#multiple-composite-erddaps} 
* Nagyon szélsőséges esetekben, vagy hibás toleranciák esetén több kompozitot szeretne létrehozniERDDAP... Valószínű, hogy a rendszer más részei (nevezetesen az adatközpont sávszélessége) hosszú problémává válik a kompozit előttERDDAP™lesz egy palackneck. Tehát a megoldás valószínűleg további, földrajzilag változatos, adatközpontokat hoz létre (tükör) Mindegyik összetettERDDAP™szerverekkelERDDAPés (legalább) a nagy keresletben lévő adatkészletek tükörmásolatai. Egy ilyen beállítás hibás toleranciát és adatmentést is biztosít (másoláson keresztül) ... Ebben az esetben a legjobb, ha a kompozitERDDAPS vannak különböző URL-ek.
    
Ha igazán akarja az összes kompozitotERDDAPs, hogy ugyanazt az URL-t használja, használjon olyan frontvégzeti rendszert, amely egy adott felhasználót hozzárendel a kompozithozERDDAPs (az IP-cím alapján) , hogy az összes felhasználó kérése csak az egyik kompozitERDDAPS. Két oka van:
    
    * Amikor egy mögöttes adatkészletet újratöltenek, és a metaadat megváltozik (pl. egy új adatfájl egy rácsos adatkészletben az idő változójaactual\\_rangeváltozás) , a kompozitERDDAPa szinkronból időnként kissé kimaradnak, de[esetleges következetesség](https://en.wikipedia.org/wiki/Eventual_consistency)... Általában 5 másodpercen belül újra szinkronizálnak, de néha hosszabb lesz. Ha egy felhasználó automatizált rendszert készít, amely támaszkodik[ERDDAP™Előfizetések](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions/index.html)a kiváltó intézkedések, a rövid szinkronicitási problémák jelentőssé válnak.
    * A 2+ kompozitERDDAPS mindegyik fenntartja saját előfizetési készletét (a fent leírt szinkron probléma miatt) ...
    
Tehát egy adott felhasználót csak az egyik kompozitra kell irányítaniERDDAPhogy elkerüljék ezeket a problémákat. Ha az egyik kompozitERDDAPlemegy, az elülső végrendszer átirányíthatja aztERDDAPA felhasználók egy másikERDDAP™Ez felfelé. Ha azonban kapacitásproblémáról van szó, ami az első kompozitot okozzaERDDAP™kudarcot vall (túlzott felhasználó? egy[Denial-of-service támadás](https://en.wikipedia.org/wiki/Denial-of-service_attack)?) , ez nagyon valószínű, hogy átirányítja a felhasználók más kompozitERDDAPS fogja okozni[Cascading kudarc](https://en.wikipedia.org/wiki/Cascading_failure)... Így a legerősebb beállítás az, hogy kompozitERDDAPS különböző URL-ekkel.
    
Vagy talán jobb, több kompozit létrehozásaERDDAPS terheléskiegyensúlyozás nélkül. Ebben az esetben meg kell tennie egy pontot, hogy mindegyiket megadjaERDDAPmás név / személyazonosság, és ha lehetséges, a világ különböző részein hozza létre őket (pl. különböző AWS régiók) pl.:ERD\\_US\\_East,ERD\\_US\\_West,ERD\\_IE,ERD\\_FR,ERD\\_IT, hogy a felhasználók tudatosan, ismételten dolgozzon egy adottERDDAP...
    
*   \\[A nagy teljesítményű rendszer lenyűgöző kialakítása egy szerveren, lásd ezt[részletes leírása Mailinator](https://mailinator.blogspot.com/2007/01/architecture-of-mailinator.html)...\\]

### Adatkészletek a nagyon magas keresletben{#datasets-in-very-high-demand} 
Az igazán szokatlan esetben az egyik a **A** , **B** vagy **C**  ERDDAPs nem tud lépést tartani a sávszélesség vagy a merevlemez-korlátozások miatt, értelme van az adatok másolására (újra) egy másik szerver+hard Drive+ERDDAPtalán[EDDGridMásolás](/docs/server-admin/datasets#eddgridcopy)vagy[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy)... Bár ideálisnak tűnhet az eredeti adatkészlet és a másolt adatkészlet zökkenőmentesen jelenik meg, mint az egyik adatkészlet a kompozitbanERDDAP™Ez nehéz, mert a két adatkészlet kissé különböző állapotokban lesz (nevezetesen, miután az eredeti kap új adatokat, de mielőtt a másolt adatkészlet megkapja a másolatot) ... Ezért azt javaslom, hogy az adatkészletek kissé eltérő címeket kapjanak (pl.: „... (Másolat #1) "és "..." (Másolat #2) ", vagy talán " (tükör # *n* ) " vagy " (szerver # *n* ) "...") és külön adatkészletként jelennek meg a kompozitbanERDDAP... A felhasználókat használják a listák megtekintésére[tükör oldalak](https://en.wikipedia.org/wiki/Website#mirror_site)népszerű fájl letöltési oldalak, így ez nem meglepő, vagy csalódás őket. Mivel a sávszélesség korlátozások egy adott oldalon, lehet, hogy van értelme, hogy a tükör található egy másik oldalon. Ha a tükör másolata más adatközpontban van, akkor az adott adatközpont kompozitja hozzáférERDDAP™A különböző címek (pl.: "mirror #1) nem szükséges.

### RAIDs versus rendszeres merevlemezek{#raids-versus-regular-hard-drives} 
Ha egy nagy adatkészletet vagy adatkészletek egy csoportját nem használják, akkor értelme lehet az adatok tárolására egy RAID-on, mivel hibás toleranciát kínál, és mivel nincs szüksége egy másik szerver feldolgozóerejére vagy sávszélességére. De ha egy adatkészletet erősen használják, akkor több értelme lehet másolni az adatokat egy másik szerveren +ERDDAP™+ merevlemez (hasonló[mit csinál a Google](https://storagemojo.com/2007/02/19/googles-disk-failure-experience/)) ahelyett, hogy egy kiszolgálót és egy RAID-t használna több adatkészlet tárolására, mivel mindkét szerver + hardDrive +ERDDAPs a rácsban, amíg egyikük nem sikerül.

### Hibák{#failures} 
Mi történik, ha...

* Egy adatkészlet iránti kérelmek eltemetése (pl. az osztály minden diákja egyszerre kéri a hasonló adatokat) ?
Csak aERDDAP™az adatkészlet kiszolgálása túlterhelt és lassú lesz, vagy elutasítja a kéréseket. A kompozitERDDAP™másERDDAPnem érintik. Mivel az adott adatkészlet korlátozó tényezője a rendszeren belül a merevlemez az adatokkal (nemERDDAP) Az egyetlen megoldás (nem azonnal) az adatkészlet másolata egy másik szerveren + hardDrive +ERDDAP...
* Egy **A** , **B** vagy **C**  ERDDAP™kudarc (pl. a merevlemez kudarca) ?
Csak az adatkészlet (s) ezt szolgáljaERDDAP™befolyásolják. Ha az adatkészlet (s) egy másik kiszolgáló + hardDrive +ERDDAPA hatás minimális. Ha a probléma merevlemezhiány az 5. vagy 6. szinten, akkor csak a meghajtót helyettesíti, és az RAID újraépíti az adatokat a meghajtón.
* A kompozitERDDAP™Nem?
Ha azt szeretné, hogy egy rendszer nagyon[magas rendelkezésre állás](https://en.wikipedia.org/wiki/High_availability), hozhat létre[több kompozitERDDAPs (a fentebb tárgyalt) ](#multiple-composite-erddaps)használjon valami hasonlót[NGINX](https://www.nginx.com/)vagy[Traefik](https://traefik.io/)kezelni a terhelési egyensúlyt. Vegye figyelembe, hogy egy adott kompozitERDDAP™nagyszámú felhasználó kérését kezelheti, mert
a metaadat iránti kérelmek kicsik, és azokat az információkat kezelik, amelyek emlékezetben vannak, és
adatok kérése (melyik lehet nagy) átirányítják a gyermeketERDDAPS.

### Egyszerű, skálázható{#simple-scalable} 
Ez a rendszer könnyen felállítható és kezelhető, és könnyen kibővíthető, ha bármely része túlterhelt. Az adott adatközpont egyetlen valódi korlátozása az adatközpont sávszélessége és a rendszer költsége.

### Bandwidth{#bandwidth} 
Vegye figyelembe a rendszer közösen használt összetevőinek közelgő sávszélességét:

|Összehasonlítás|Körülbelül Bandwidth (GBytes/s)  |
|-|-|
|DDR memória|2.5|
|SSD meghajtó|1|
|SATA merevlemez|0.3|
|Gigabit Ethernet|0.1|
|OC-12|0.06|
|OC-3|0.015|
|T1|0.0002|

  
Tehát egy SATA merevlemez (0,3GB/s) egy kiszolgálóval egyERDDAP™valószínűleg telített egy Gigabit Ethernet LAN (0,1GB/s) ... Egy Gigabit Ethernet LAN (0,1GB/s) valószínűleg telített OC-12 internetkapcsolatot (0,06GB/s) ... És legalább egy forrás felsorolja az OC-12 sorokat, amelyek havonta körülbelül 100 000 dollárba kerülnek. (Igen, ezek a számítások azon alapulnak, hogy a rendszert korlátozza, ami nem jó, mert nagyon súlyos válaszokat eredményez. De ezek a számítások hasznosak a rendszer alkatrészeinek tervezéséhez és kiegyensúlyozásához.)   **Nyilvánvaló, hogy az adatközpont megfelelő gyors internetkapcsolata messze a rendszer legdrágább része.** Könnyen és viszonylag olcsón építhet egy hálózatot egy tucat szerverrel, amely tucatot futtat.ERDDAPs amely képes gyorsan kiszivattyúzni sok adatot, de egy megfelelően gyors internetkapcsolat nagyon drága lesz. A részleges megoldások:

* Ösztönözze az ügyfeleket, hogy kérjék az adatokat, ha ez minden szükséges. Ha az ügyfélnek csak egy kis régióra vagy egy alacsonyabb állásfoglalásra van szüksége, az az, amit kérnie kell. A helyettesítés központi fókusza a protokolloknakERDDAP™az adatok kérésére nyújtott támogatások.
* Ösztönözze a tömörített adatokat.ERDDAP™ [kompresszorok](https://coastwatch.pfeg.noaa.gov/erddap/information.html#compression)adatátvitel, ha "elfogadást" találHTTP GETkérjen vezetőt. Minden webes böngésző "elfogadást" használ, és automatikusan lenyomja a választ. Egyéb ügyfelek (pl. számítógépes programok) kifejezetten használni kell.
* Indítsa el szervereit egy ISP vagy más webhelyen, amely viszonylag olcsó sávszélességi költségeket kínál.
* Fedezze fel a szervereket aERDDAPkülönböző intézményekre, hogy a költségek szétoszlanak. Ezután kapcsolhatja össze a kompozitjátERDDAP™az őERDDAPS.

Vegyük észre, hogy[Cloud számítás](#cloud-computing)és a web hosting szolgáltatások kínálnak minden internet sávszélességet, amire szüksége van, de ne oldja meg az ár problémát.

Általános információk a skálázható, nagy kapacitású, hibás toleráns rendszerek tervezéséről, lásd Michael T. Nygard könyvét[Elengedni](https://www.amazon.com/Release-Production-Ready-Software-Pragmatic-Programmers/dp/0978739213)...

### Mint a Legos{#like-legos} 
A szoftvertervezők gyakran próbálnak jót használni[szoftver tervezési minták](https://en.wikipedia.org/wiki/Software_design_pattern)problémák megoldására. A jó minták jók, mert jó, könnyű létrehozni és dolgozni, általános célú megoldásokkal, amelyek jó tulajdonságokkal rendelkező rendszerekhez vezetnek. A minta nevek nem szabványosítva vannak, ezért felhívom a mintát, amitERDDAP™használja a Lego Pattern. Minden láb (MindenERDDAP) egy egyszerű, kicsi, szabványos, önálló, tégla (Data szerver) egy meghatározott felülettel, amely lehetővé teszi, hogy más jogokhoz kapcsolódjon (ERDDAPs) ... A részeiERDDAP™a rendszer létrehozása: az előfizetés és a zászlóURL rendszerek (amely lehetővé teszi a kommunikációtERDDAPs) Az EDD... FromErddap átirányítási rendszer és a rendszerRESTfulolyan adatok iránti kérelmek, amelyeket a felhasználók vagy másERDDAPS. Így két vagy több legóra (ERDDAPs) hatalmas számú különböző formát hozhat létre (hálózati topológiákERDDAPs) ... Persze, a tervezés és jellemzőiERDDAP™lehetett volna másképp, nem Lego-szerű, talán csak, hogy lehetővé tegye és optimalizálja egy adott topológia. De úgy érezzük, hogyERDDAPA Lego-szerű design jó, általános célú megoldást kínál, amely lehetővé teszi bármelyiketERDDAP™adminisztrátor (vagy adminisztrátorok csoportja) létrehozni mindenféle különböző szövetségi topológiát. Például egy egyetlen szervezet létrehozhatna háromat (vagy többet)  ERDDAPS mint amilyen mutatott[ERDDAP™Grid/Cluster diagram felett](#recommendations)... Vagy elosztott csoport (IOOS? CoastWatch? NCEI? NWS?NOAA? USGS? Adatok? NEON? LTER? OOI? BODC? ONC? JRC? WMO?) létrehozhat egyetERDDAP™minden kis kitétben (így az adatok a forráshoz közel maradhatnak) Ezután állítson összetettetERDDAP™a központi irodában virtuális adatkészletekkel (amelyek mindig tökéletesen naprakészek) minden kis kitűbőlERDDAPS. Valóban, az összesERDDAPs, telepítve különböző intézmények szerte a világon, amely adatokat kap másERDDAPs és/vagy adatokat szolgáltat másnakERDDAPs, képezzen egy hatalmas hálózatotERDDAPS. Milyen jó ez?&#33; Tehát, mint a Lego, a lehetőségek végtelenek. Ezért ez egy jó minta. Ezért ez egy jó designERDDAP...

### Különböző típusú kérések{#different-types-of-requests} 
Az adatkiszolgáló topológiák megvitatásának egyik valós szövődménye, hogy különböző típusú kérések és különböző módszerek vannak a különböző típusú kérések optimalizálására. Ez többnyire külön kérdés (Milyen gyors lehetERDDAP™az adatok válaszolnak az adatok kérésére?) a topológia beszélgetésből (amely az adatkiszolgálók közötti kapcsolatokkal foglalkozik, és amely szerver rendelkezik a tényleges adatokkal) ...ERDDAP™Természetesen megpróbál minden típusú kérelmet hatékonyan kezelni, de jobban kezeli, mint mások.

* Sok kérés egyszerű.
Például: Mi a metaadata ennek az adatkészletnek? Vagy: Melyek az idő dimenziójának értékei ennek a rácsos adatkészletnek?ERDDAP™úgy tervezték, hogy ezeket a lehető leggyorsabban kezeljék (általában a&lt;=2 ms) azáltal, hogy ezt az információt memóriában tartja.
     
* Néhány kérés mérsékelten nehéz.
Például: Adj nekem egy adatkészletet (amely egy adatfájlban van) ... Ezek a kérések viszonylag gyorsan kezelhetők, mert nem olyan nehézkesek.
     
* Néhány kérés kemény, így az időfogyasztás.
Például: Adj nekem egy adatkészletet (amely a 10 000+ adatfájl bármelyikében lehet, vagy olyan tömörített adatfájlokból származhat, amelyek mindegyike 10 másodpercet vesz igénybe a depresszióhoz) ...ERDDAP™v2.0 bevezetett néhány új, gyorsabb módszert, hogy kezelje ezeket a kéréseket, különösen azáltal, hogy lehetővé teszi a kéréskezelő szál több munkavállalói szálak leküzdését, amelyek a kérés különböző alkészleteit kezelik. De van egy másik megközelítése ennek a problémának, amelyERDDAP™még nem támogatja: az adatfájlok egy adott adathalmazra vonatkozó alkészleteit külön számítógépekre lehet tárolni és elemezni, majd az eredeti kiszolgálón kombinált eredményeket. Ezt a megközelítést nevezik[MapReduce](https://en.wikipedia.org/wiki/MapReduce)és felrobbant[Hadoop](https://en.wikipedia.org/wiki/Apache_Hadoop)Az első (?) nyílt forráskódú MapReduce program, amely a Google papír ötletei alapján készült. (Ha szüksége van a MapReducre inERDDAPKérjük, küldjön e-mail kérésterd.data at noaa.gov...) Google[BigQuery](https://cloud.google.com/bigquery/)érdekes, mert úgy tűnik, hogy a MapReduce alkalmazása a tambuláris adatkészletek leállítására vonatkozik, ami az egyikERDDAPFő célok. Valószínű, hogy létrehozhatsz egyERDDAP™adatkészlet a BigQuery adatkészletből keresztül[EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)mert a BigQuery egy JDBC felületen keresztül érhető el.

### Ezek az én véleményem.{#these-are-my-opinions} 

Igen, a számítások egyszerűbbek (és most enyhén dátumozott) De szerintem a következtetések helyesek. Használtam hibás logikát, vagy hibáztam a számításaimban? Ha igen, a hiba egyedül az enyém. Kérjük, küldjön e-mailt a korrekcióvalerd dot data at noaa dot gov...

- -

## [ **Cloud számítás** ](#cloud-computing) {#cloud-computing} 

Számos vállalat kínál felhő számítási szolgáltatásokat (pl.:[Amazon Web Services](https://aws.amazon.com/)és[Google Cloud platform](https://cloud.google.com/)) ...[Web hosting cégek](https://en.wikipedia.org/wiki/Web_hosting_service)Az 1990-es évek közepe óta egyszerűbb szolgáltatásokat kínáltak, de a „zárt” szolgáltatások nagymértékben bővítették a rendszerek rugalmasságát és a kínált szolgáltatások körét. ótaERDDAP™A hálózat csak aERDDAPés azótaERDDAPS.Javawebes alkalmazások, amelyek Tomcatban futhatnak (a leggyakoribb alkalmazásszerver) vagy más alkalmazásszervereknek, viszonylag könnyűnek kell lennie létrehozni egyERDDAP™Hálózati szolgáltatás vagy web hosting oldal. Ezeknek a szolgáltatásoknak az előnyei:

* Nagyon magas sávszélességű internetkapcsolatokhoz biztosítanak hozzáférést. Ez önmagában igazolhatja ezeket a szolgáltatásokat.
* Csak az általad használt szolgáltatásokért felelősek. Például hozzáférhet egy nagyon magas sávszélességű internetkapcsolathoz, de csak a tényleges adatátvitelért fizet. Ez lehetővé teszi egy olyan rendszer építését, amely ritkán túlterhelt (még a csúcs keresletnél is) anélkül, hogy fizetnie kell a ritkán használt kapacitásért.
* Könnyen kimeríthetőek. A szervertípusokat megváltoztathatja, vagy hozzáadhat annyi szervert vagy annyi tárolót, amennyit csak akar, kevesebb, mint egy perc alatt. Ez önmagában igazolhatja ezeket a szolgáltatásokat.
* Megszabadítanak a szerverek és hálózatok működtetésének számos adminisztratív feladatától. Ez önmagában igazolhatja ezeket a szolgáltatásokat.

E szolgáltatások hátrányai:

* Felszámolnak szolgáltatásaikért, néha sokat (abszolút értelemben; nem az, hogy nem jó érték) ... Az itt felsorolt árak a[Amazon EC2](https://aws.amazon.com/ec2/pricing)... Ezek az árak (2015 júniusától) le fog jönni.
A múltban az árak magasabbak voltak, de az adatfájlok és a kérések száma kisebb volt.
A jövőben az árak alacsonyabbak lesznek, de az adatfájlok és a kérések száma nagyobb lesz.
Tehát a részletek megváltoznak, de a helyzet viszonylag állandó marad.
És nem az, hogy a szolgáltatás túláramlik, hanem az, hogy sok szolgáltatást használunk és vásárolunk.
    * Adatátvitel - Az adatátvitel a rendszerbe most ingyenes (Igen&#33;) ...
Az adatátvitel a rendszerből 0,09/GB dollár.
Egy SATA merevlemez (0,3GB/s) egy kiszolgálóval egyERDDAP™valószínűleg telített egy Gigabit Ethernet LAN (0,1GB/s) ...
Gigabit Ethernet LAN (0,1GB/s) valószínűleg telített OC-12 internetkapcsolatot (0,06GB/s) ...
Ha egy OC-12 kapcsolat továbbíthatja a ~ 150 000 GB / hónapot, az adatátviteli költségek akár 150 000 GB @ $0.09 / GB = 13 500 $ / hónap, ami jelentős költség. Nyilvánvalóan, ha tucat keményen dolgozikERDDAPfelhő szolgáltatás, havi adatátviteli díjak jelentősek lehetnek (akár $ 162,000 / hónap) ... (Ismét nem az, hogy a szolgáltatás túláramlik, az az, hogy sok szolgáltatást használunk és vásárolunk.) 
    * Adattárolás - Az Amazon TB-nként 50 dollárt számít fel. (Hasonlítsd össze, hogy egy 4TB-vállalatot vásárolj meg egyenesen ~ $ 50 / TB-ért, bár a RAID a teljes költséghez hozzáadott és adminisztratív költségeket.) Tehát, ha sok adatot kell tárolnia a felhőben, meglehetősen drága lehet (pl. a 100TB 5000 dollárba kerülne) ... De ha nincs igazán nagy mennyiségű adat, ez egy kisebb probléma, mint a sávszélesség / adatátviteli költségek. (Ismét nem az, hogy a szolgáltatás túláramlik, az az, hogy sok szolgáltatást használunk és vásárolunk.)   
         
### Beállítás{#subsetting} 
* A helyettesítő probléma: Az egyetlen módja annak, hogy hatékonyan eloszthassuk az adatfájlok adatait, hogy rendelkezzenek olyan programmal, amely elosztja az adatokat (pl.:ERDDAP) fut egy olyan szerveren, amely rendelkezik a helyi merevlemezen tárolt adatokkal (vagy hasonlóan gyors hozzáférés egy SAN-hoz vagy helyi RAID-hoz) ... A helyi fájlrendszerek lehetővé teszikERDDAP™  (a könyvtárak, például a netcdf-java) konkrét byte-tartományok kérésére a fájlokból, és nagyon gyorsan választ kap. Számos adatkérés aERDDAP™a fájlba (nevezetesen rácsos adatkérelmek, ahol a merev érték &gt; 1) nem lehet hatékonyan elvégezni, ha a programnak meg kell kérnie egy nem helyi fájl teljes fájlját vagy nagy darabját (így lassabb) adattároló rendszer, majd kivonat egy alkatrészt. Ha a felhő beállítás nem adERDDAP™gyors hozzáférés a fájlok byte tartományaihoz (olyan gyors, mint a helyi fájlok) ,ERDDAP"Az adatokhoz való hozzáférés súlyos palackneck lesz, és más előnyökkel jár a felhőszolgáltatás használata.

### Hosted Data{#hosted-data} 
A fenti költséges haszonelemzés alternatívája (amely az adattulajdonoson alapul (pl.:NOAA) fizetni az adataikat a felhőben tárolni) 2012 körül érkezett, amikor az Amazon (és kisebb mértékben, néhány más felhő szolgáltató) elkezdett tárolni néhány adatkészletet a felhőben (AWS S3) ingyenesen (feltehetően abban a reményben, hogy visszaszerezhetik a költségeket, ha a felhasználók az AWS EC2 kompute példákat bérelnének az adatokkal való együttműködésre.) ... Nyilvánvaló, hogy ez teszi a felhő számítás jelentősen költséghatékonyabb, mert az idő és a költségek feltöltése az adatokat, és host ez most nulla. EzzelERDDAP™v2.0, vannak új funkciók a futás megkönnyítéséreERDDAPfelhőben:

* Most, egyEDDGridFromFiles vagy EDDTableFromFiles adatkészlet létrehozható olyan adatfájlokból, amelyek távoli és hozzáférhetőek az interneten keresztül (pl.: AWS S3 vödör) használatával&lt;cacheFromUrl&gt; és&lt;cacheSize GB&gt; opciók.ERDDAP™fenntartja a legutóbb használt adatfájlok helyi gyorsítótárát.
* Most, ha az EDDTableFromFiles forrásfájlok tömörülnek (pl.:.tgz) ,ERDDAP™automatikusan elnyomja őket, amikor elolvassa őket.
* Most, aERDDAP™egy adott kérésre adott szál reagálása meg fogja szüntetni a munkavállalói szálakat, hogy dolgozzanak a kérelem alszakaszán, ha használja a&lt;nThreads & gt; opciók. Ez a párhuzamosság lehetővé kell tennie a gyorsabb válaszokat a nehéz kérésekre.

Ezek a változások megoldják az AWS S3 problémáját, nem helyi, blokkszintű fájltárolást és (öreg) az S3 adatokhoz való hozzáférés problémája jelentős laggal. (Évekkel ezelőtt (~2014) Ez a lag jelentős volt, de most sokkal rövidebb, és nem olyan jelentős.) Összességében ez azt jelenti, hogy felállítjukERDDAP™A felhőben most sokkal jobban működik.

 **Köszönöm** - Sok köszönet Matthew Arrottnak és csoportjának az eredeti OOI erőfeszítésében, hogy munkájukat helyeztékERDDAP™a felhőben és az ebből eredő vitákban.
 

- -

## [Az adatkészletek eltávolítása](#remote-replication-of-datasets) {#remote-replication-of-datasets} 

Van egy közös probléma, amely kapcsolódik a fent említett tárgyalás a rácsok és szövetségekERDDAPs: az adatkészletek távoli replikációja. Az alapvető probléma az, hogy az adatszolgáltató fenntart egy olyan adatkészletet, amely időnként változik, és a felhasználó fenntartani akarja az adatkészlet naprakész helyi másolatát. (bármilyen különböző okok miatt) ... Nyilvánvaló, hogy ennek számos változata létezik. Néhány variáció sokkal nehezebb kezelni, mint mások.

* Gyors frissítések
Nehéz naprakészen tartani a helyi adatkészletet *azonnal*   (pl. 3 másodpercen belül) a forrás minden változása után, nem pedig néhány órán belül.
     
* Gyakori változások
A gyakori változások nehezebbek kezelni, mint a gyakori változások. Például az egyszeri változások sokkal könnyebben kezelhetők, mint a 0,1 másodpercnél.
     
* Kis változások
A forrásfájl kis változásai nehezebbek kezelni, mint egy teljesen új fájl. Ez különösen igaz, ha a kis változások bárhol lehetnek a fájlban. A kis változások nehezebbek felismerni és nehezen elszigetelni azokat az adatokat, amelyeket meg kell replikálni. Az új fájlok könnyen felismerhetők és hatékonyak az átvitelhez.
     
* Entire Dataset
A teljes adatállomány naprakész tartása nehezebb, mint a közelmúltbeli adatok fenntartása. Néhány felhasználónak csak a legújabb adatokra van szüksége (pl. az utolsó 8 napos érték) ...
     
* Több másolat
A különböző webhelyeken több távoli másolat fenntartása nehezebb, mint egy távoli másolat fenntartása. Ez a skálázó probléma.
     

Nyilvánvalóan számos változata lehetséges változások a forrás adatkészlet és a felhasználó igényeinek és elvárásainak. Sok variáció nagyon nehéz megoldani. Az egyik helyzet legjobb megoldása gyakran nem a legjobb megoldás egy másik helyzetre - még nincs univerzális megoldás.

### [ **RelevantERDDAP™Eszközök** ](#relevant-erddap-tools) {#relevant-erddap-tools} 

ERDDAP™számos eszközt kínál, amelyeket egy olyan rendszer részeként lehet használni, amely egy adatkészlet távoli másolatának fenntartására törekszik:

*   ERDDAPA[RSS  (Rich Site összefoglaló?) szolgáltatás](https://en.wikipedia.org/wiki/RSS)  
gyors módja annak, hogy ellenőrizze, ha egy adatkészlet távolrólERDDAP™megváltozott.
     
*   ERDDAPA[előfizetési szolgáltatás](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)  
hatékonyabb (mintRSS) megközelítés: azonnal küld egy e-mailt, vagy lépjen kapcsolatba egy URL-t minden előfizetővel, amikor az adatkészlet frissül, és a frissítés változást eredményezett. Hatékony abban, hogy az ASAP megtörténjen, és nincs pazarlási erőfeszítés (mint a polling egyRSSszolgáltatás) ... A felhasználók más eszközöket használhatnak (mint[IFTTT](https://ifttt.com/)) reagálni az előfizetési rendszer e-mail értesítéseire. Például egy felhasználó feliratkozhat egy távoli adatkészletreERDDAP™és használja az IFTTT-t, hogy reagáljon az előfizetési e-mail értesítésekre, és indítsa el a helyi adatkészlet frissítését.
     
*   ERDDAPA[zászlórendszer](/docs/server-admin/additional-information#flag)  
utat biztosít egyERDDAP™adminisztrátor, hogy elmondjon egy adatkészletet az ő / őERDDAPaz ASAP újratöltéséhez. A zászló URL formája könnyen használható a forgatókönyvekben. A zászló URL formáját is fel lehet használni, mint az előfizetés fellépését.
     
*   ERDDAPA["files"rendszerrendszer](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)  
hozzáférést biztosíthat a forrásfájlokhoz egy adott adatkészlethez, beleértve a fájlok Apache-style könyvtárát is (Web Accessible Folder) amely minden fájl letöltése URL, utolsó módosított idő és méret. Az egyik hátránya a használat"files"a rendszer az, hogy a forrásfájlok különböző változó nevekkel és különböző metaadatokkal rendelkeznek, mint az adatkészlet, ahogy megjelenikERDDAP... Ha egy távoliERDDAP™Az adatkészlet hozzáférést biztosít a forrásfájlokhoz, amely megnyitja a rossz ember rsync verziójának lehetőségét: könnyűvé válik egy helyi rendszer számára, hogy megnézze, mely távoli fájlok változtak és letölthetők. (Lásd:[cacheFromUrl opció](#cache-from-url)alább, amely felhasználhatja ezt.)   
     

### [Megoldások](#solutions) {#solutions} 

Bár számos variáció van a probléma és a végtelen számú lehetséges megoldás, csak egy maroknyi alapvető megközelítések megoldások:

#### Custom, Brute Force megoldások{#custom-brute-force-solutions} 
Egy nyilvánvaló megoldás, hogy egy egyedi megoldást kezeljünk, amelyet ezért egy adott helyzetre optimalizálunk: olyan rendszert készítsünk, amely észleli / azonosítja, hogy mely adatok megváltoztak, és elküldi ezt az információt a felhasználónak, így a felhasználó kérheti a módosított adatokat. Nos, ezt megteheti, de vannak hátrányok:

* Az egyedi megoldások sok munka.
* Az egyedi megoldások általában annyira testreszabottak egy adott adatkészletre, és a felhasználó rendszerére, amelyet nem lehet könnyen újra felhasználni.
* Az egyedi megoldásokat az Ön számára kell megépíteni és fenntartani. (Ez soha nem jó ötlet. Mindig jó ötlet, hogy elkerülje a munkát, és kap valaki mást, hogy a munkát&#33;) 

Elriasztom ezt a megközelítést, mert szinte mindig jobb, ha olyan általános megoldásokat keresünk, amelyeket valaki más épített és fenntart, amely könnyen újrahasznosítható különböző helyzetekben.
     
#### rsync{#rsync} 
[rsync](https://en.wikipedia.org/wiki/Rsync)a meglévő, lenyűgözően jó, általános célú megoldás a fájlok gyűjteményének megtartására egy felhasználó távoli számítógépén. Így működik:

1. Néhány esemény (pl. egyERDDAP™előfizetési rendszer esemény) rsync futtatása,
     (vagy egy krónikus munka rsync-et futtat naponta a felhasználó számítógépén) 
2. amely kapcsolat rsync a forrás számítógépén,
3. amely kiszámítja az egyes fájlok zsákmányainak egy sor hashát, és továbbítja azokat a hashokat a felhasználó rsyncjéhez,
4. amely összehasonlítja ezt az információt a felhasználó fájlok másolatára vonatkozó hasonló információkhoz,
5. amely aztán megkívánja azokat a fájlokat, amelyek megváltoztak.

    
Figyelembe véve mindazt, amit csinál, a rsync nagyon gyorsan működik (pl. 10 másodperc, plusz adatátviteli idő) és nagyon hatékonyan. Vannak[Rsync variációi](https://en.wikipedia.org/wiki/Rsync#Variations)ez optimalizálja a különböző helyzeteket (pl. az egyes forrásfájlok zsákmányainak kiszámítása és kiürítése révén) ...

A rsync fő gyengeségei: némi erőfeszítést igényel a felépítéshez (biztonsági kérdések) ; van néhány ijesztő kérdés; és nem jó az NRT adatkészletek fenntartásához valóban naprakész (pl. kínos, hogy használja rsync többet, mint minden 5 perc) ... Ha kezelni tudja a gyengeségeket, vagy ha nem befolyásolja a helyzetet, a rsync kiváló, általános célú megoldás, amelyet bárki használhat most, hogy megoldja az adatkészletek távoli replikációját.

Van egy elem aERDDAP™Csatlakozzon a listához, hogy megpróbáljon támogatást nyújtani a rsync szolgáltatásokhozERDDAP  (valószínűleg egy nagyon nehéz feladat) , hogy minden ügyfél használja rsync (vagy változat) egy adatkészlet naprakész másolatának fenntartása. Ha valaki dolgozni akar ezen, kérlek e-mailterd.data at noaa.gov...

Vannak más programok, amelyek többé-kevésbé azt teszik, amit a rsync csinál, néha orientált adatállomány-replikáció (bár gyakran egy fájl másolat szintjén) pl.:UnidataA[IDD](https://www.unidata.ucar.edu/projects/index.html#idd)...
    
#### Cache From Url{#cache-from-url} 
[A cacheFromUrl](/docs/server-admin/datasets#cachefromurl)beállítás elérhető (KezdőlapERDDAP™v2.0) mindenki számáraERDDAPOlyan adatkészlettípusok, amelyek adatkészleteket hoznak a fájlokból (alapvetően az összes alosztály[EDDGridFájlok](/docs/server-admin/datasets#eddgridfromfiles)és[EDDTableFromFiles](/docs/server-admin/datasets#eddtablefromfiles)) ... Húsvét FromUrl megpróbálja automatikusan letölteni és fenntartani a helyi adatfájlokat azáltal, hogy távoli forrásból másolja őket a gyorsítótáron keresztül FromUrl beállítás. A távoli fájlok egy Web Accessible Folderben vagy a THREDDS által kínált könyvtár-szerű fájllistában találhatók,HyraxS3 vödör, vagyERDDAPA"files"rendszer.
    
Ha a távoli fájlok forrása egy távoliERDDAP™adatkészlet, amely a forrásfájlokat a forrásfájlokon keresztül kínáljaERDDAP™ "files"rendszer, akkor lehet[alá: beadás](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)távoli adatkészletre, és használja a[zászló URL](/docs/server-admin/additional-information#flag)a helyi adatkészlet, mint az előfizetés fellépése. Ezután, amikor a távoli adatkészlet megváltozik, kapcsolatba lép a zászló URL-rel az adatkészletéhez, amely megmondja az ASAP újratöltéséről, amely feltárja és letölti a módosított távoli adatfájlokat. Mindez nagyon gyorsan történik (általában 5 másodperc, plusz az idő, hogy letöltse a módosított fájlokat) ... Ez a megközelítés nagyszerűen működik, ha a forrásadatváltozások az új fájlokat rendszeresen hozzáadják, és amikor a meglévő fájlok soha nem változnak. Ez a megközelítés nem működik jól, ha az adatokat gyakran hozzák létre mindenhez (vagy a legtöbb) a meglévő forrásadat fájlok, mert akkor a helyi adatkészlet gyakran letölti az egész távoli adatkészletet. (Itt van szükség egy rsync-szerű megközelítésre.) 
    
#### ArchiveADataset{#archiveadataset} 
ERDDAP™A[ArchiveADataset](/docs/server-admin/additional-information#archiveadataset)jó megoldás, ha az adatgyűjtés gyakran hozzáadódik, de az idősebb adatok soha nem változnak. Alapvetően, egyERDDAP™adminisztrátor futhat ArchiveADataset (talán egy forgatókönyvben, talán a krón) és határozza meg az adatkészlet alkészletét, amelyet ki akarnak vonni (Talán több fájlban) csomag egy.zipvagy.tgzfájl, így elküldheti a fájlt az érdekelt embereknek vagy csoportoknak (NCEI az archiváláshoz) vagy letölthetővé teszi. Például, akkor futtatni ArchiveADataset minden nap 12:10 am és van, hogy egy.zipaz összes adat 12:00 órakor az előző nap 12:00-ig. (Vagy tegyük ezt a heti, havi vagy évente, szükség szerint.) Mivel a csomagolt fájl offline keletkezik, nincs veszélye az időzítésre vagy túl sok adatra, mivel lenne egy szabványERDDAP™kérés.
     
#### ERDDAP™„Szabványos kérési rendszer{#erddaps-standard-request-system} 
ERDDAP™A standard kérési rendszer alternatív jó megoldás, ha az adatok gyakran hozzáadódik egy adatkészlethez, de az idősebb adatok soha nem változnak. Alapvetően bárki használhat szabványos kéréseket, hogy adatokat szerezzenek egy adott időre. Például 12:10-kor minden nap kérheti az összes adatot egy távoli adatkészletből 12:00-tól az előző napig 12:00-ig. A korlátozás (az ArchiveADataset megközelítéshez képest) az időzítés kockázata, vagy túl sok adat van egyetlen fájlhoz. Elkerülheted a korlátozást azáltal, hogy gyakoribb kéréseket teszel kisebb időszakokra.
     
#### EDDTableFromHttpGet{#eddtablefromhttpget} 
\\[Ez az opció még nem létezik, de úgy tűnik, a közeljövőben építhető.\\]  
Az új[EDDTableFromHttpGet](/docs/server-admin/datasets#eddtablefromhttpget)adatkészlet típusaERDDAP™A v2.0 lehetővé teszi egy másik megoldás bevezetését. Az ilyen típusú adathalmaz által fenntartott mögöttes fájlok alapvetően naplófájlok, amelyek rögzítik az adathalmaz változásait. Lehetővé kell tenni egy olyan rendszer létrehozását, amely rendszeresen fenntartja a helyi adatkészletet (vagy egy trigger alapján) a távoli adatkészlethez tett összes módosítás kérése az utolsó kérelem óta. Olyan hatékonynak kell lennie (vagy többet) mint rsync, és kezelni sok nehéz forgatókönyv, de csak akkor működne, ha a távoli és helyi adatkészletek EDDTableFromHttpGet adatkészletek.

Ha valaki dolgozni akar ezen, lépjen kapcsolatbaerd.data at noaa.gov...
    
#### Elosztott adatok{#distributed-data} 
A fenti megoldások egyike sem nagyszerű munkát végez a probléma kemény variációinak megoldásában, mert a közel valós idő replikációja (NRT) Az adatkészletek nagyon kemények, részben az összes lehetséges forgatókönyv miatt.

Van egy nagyszerű megoldás: ne próbálja megismételni az adatokat.
Ehelyett használja az egy autoritatív forrást (Egy adatkészlet egyenERDDAP) az adatszolgáltató fenntartása (pl. regionális iroda) ... Azok a felhasználók, akik adatokat akarnak az adatkészletből, mindig a forrásból kapják. Például a böngésző-alapú alkalmazások az adatokat egy URL-alapú kérelemből kapják, így nem számít, hogy a kérelem az eredeti forráshoz egy távoli szerveren (nem ugyanaz a szerver, amely az ESM-et tárja) ... Sokan régóta támogatták ezt a Distributed Data megközelítést (Roy Mendelssohn az elmúlt 20 évben) ...ERDDAPHáló/szövetségi modell (a dokumentum legfelső 80% -a) ezen megközelítésen alapul. Ez a megoldás olyan, mint egy kard egy Gordian Knot-hoz - az egész probléma eltűnik.

* Ez a megoldás nagyon egyszerű.
* Ez a megoldás lenyűgözően hatékony, mivel nem végeznek munkát egy replikált adatkészlet megtartása érdekében (s) up-to-date.
* A felhasználók bármikor megkaphatják a legújabb adatokat (pl. csak ~0,5 másodperces késleltetéssel) ...
* Jól mérlegeli, és vannak módok a skálázás javítására. (Lásd a vita a dokumentum legfelső 80% -ában.)   
     

Nem, ez nem megoldás minden lehetséges helyzetre, de ez egy nagyszerű megoldás a hatalmas többség számára. Ha bizonyos helyzetekben problémák/gyengeségek merülnek fel ezzel a megoldással, gyakran érdemes megoldani ezeket a problémákat, vagy azokkal a gyengeségekkel élni, mert a megoldás lenyűgöző előnyei vannak. Ha/ha ez a megoldás valóban elfogadhatatlan egy adott helyzetben, pl. amikor valóban rendelkeznie kell az adatok helyi másolatával, akkor fontolja meg a fent említett egyéb megoldásokat.
     
### Következtetés{#conclusion} 
Bár nincs egyetlen, egyszerű megoldás, amely tökéletesen megoldja az összes problémát minden forgatókönyvben (mint rsync és elosztott adatok szinte) Remélhetőleg elegendő eszköz és lehetőség van arra, hogy elfogadható megoldást találhasson az adott helyzetre.
