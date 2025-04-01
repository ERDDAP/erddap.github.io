---
title: "ERDDAP™ - Changes"
---
# ERDDAP™változások

ERDDAP™nagyszerű példa erre[Felhasználó-vezérelt innováció](https://en.wikipedia.org/wiki/User_innovation), ahol a termékinnováció gyakran a fogyasztóktól származik (ERDDAP™felhasználók) nem csak a termelők (ERDDAP™fejlesztők) ... Az évek során az új funkciók és változások ötleteinek többségeERDDAP™A felhasználókból jöttek. Ezek a felhasználók a nagy ötleteikért hitelesítettek. Köszönöm&#33; Kérjük, tartsa be ezeket a nagy javaslatokat&#33;

Íme a változások, amelyek mindegyikhez kapcsolódnakERDDAP™kiadás.

## Verzió 2.26{#version-226} 
 (2025-03-31) 

*    **Mert All:** 
    * Nagy frissítés a dokumentációs oldalunkra: https://erddap.github.io/
 
A frissített megjelenés mellett jobb navigáció, keresés, fordítás, és könnyebben kell fenntartani a haladást&#33;

*    **Új funkciók és változások (felhasználók számára) :** 
    * Előfizetések ésRSSA frissítéseknek megbízhatóbbá kell válniuk az olyan adatkészletek esetében, amelyek gyakran frissülnek a fájlváltozásokból.

*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * Az alapértelmezett kiadás megköveteli/támogatjaJava21. Hát ebben a kiadásban könnyen elkészíthetőJava17 kompatibilis bináris.

    * Új funkció az UI adatkészleteiről megjelenített információk testreszabásához. Arra számítunk, hogy ez különösen hasznos lehet olyan dolgokat hozzáadni, mint az adatállomány idézetei. További részletekért olvassa el a[új dokumentáció](/docs/server-admin/display-info)... Köszönjük Ayush Singh-nak a hozzájárulásért&#33;

    * További Prometheus metrikák. A legnagyobb a `http_request_duration_seconds`, amely magában foglalja a kérelemre adott válaszidőket: "request_type", "dataset_id", "dataset_type", "file_type", "lang_code", "status_code"
Ez a gép olvasható formátum lehetővé teszi a mutatók jobb gyűjtését, hogy megértsék, hogy a felhasználók hogyan használják a szervert.

    * Új módja az ISO19115 XML fájlok létrehozásának. Az Apache SIS-t használja, és ez egy új lehetőség ebben a kiadásban. Kérjük, engedélyezze és küldjön visszajelzést.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * Az UI most egyedi linkeket fog létrehozni minden késztetéshez olyan területeken, mint amilyen ainfoUrlés összefoglaló.

    * Előfizetések ésRSSA frissítéseknek megbízhatóbbá kell válniuk az olyan adatkészletek esetében, amelyek gyakran frissülnek a fájlváltozásokból. Ha ez problémákat okoz, kérjük, érje el a GitHub-ot, és tiltsa le a funkcionalitást az alábbi zászló hozzáadásával a setup.xml-hez.
NEM ELŐTTT
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * Az anyagi változókat már nem fogják automatikusan generálni az EDDTableFromNcCFFiles adatkészlettípusra. Ha a viselkedésre támaszkodtál, akkor akár (preferált megoldás) add hozzásubsetVariablesaz adatkészlet meghatározása az Ön adataibandatasets.xml, vagy add hozzá az alábbi zászlót a setup.xml-hez. Ha úgy érzi, hogy ezt meg kell fordítania, kérjük, érje el a GitHub-ot, hogy jobban támogassuk a használati esetet előre.
NEM ELŐTTT
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * A szerver most átirányítja a dokumentációs kérelmeket (letöltés alatt / ami a dokumentáció, amely áttelepült) az új dokumentációs oldalra. Ha szükséges, akkor ezt egy zászlóval letilthatja a setup.xml-ben:
NEM ELŐTTT
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Néhány kis változás és hibajavítás.

*    **MertERDDAP™Fejlesztők:** 
    * Több kódminőség javítása és halott kód tisztítás. Ez magában foglalja a kisebb optimalizálásokat, a lezárható erőforrások jobb kezelését, és eltávolítja a hosszú elavult adattípusokat (mint Vector) ...

    * Nagy refaktoring EDStatic, hogy húzza ki a legtöbb konfigurált, üzenet és metrikus kód. Ez is jobban képesíti a könyvtári utak kezdetiesítését és kezelését (Az utolsó 2-nek többet kell tennie.) 

    * Sok előrelépés egy hivatalosan támogatott Docker Image. A terv az, hogy véglegesítsük és felszabadítsuk aERDDAP™2.26 kiadás áll rendelkezésre.

## Verzió 2.25{#version-225} 
 (2024-10-31) 

*    **Új funkciók és változások (felhasználók számára) :** 
    * Az EDDTableFromFiles most csak meghatározott kimenetekkel támogathatja a lekérdezéseket (Globálisok, jexl script vagy változók) ...
         
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * A 2.25-ös verzió megköveteliJava21 vagy újabb. Ez az LTS verzió, és már több mint egy éve elérhető.
         
    * A SharedWatchService most az alapértelmezett. Ha le kell tiltani, kérjük, lépjen kapcsolatba a krízissel. john at noaaa.gov, hogy hadd tudjam, így tudom javítani a jövőbeni verziók és hozzá:
        &lt;Használat:SharedWatchService&gt;False&lt;/useSharedWatchService&gt; a beállításhoz.xml.
         
    * AERDDAP™A servlet most kezdi a szerver indítását. Ez azt jelenti, hogy az adatkészletek azonnal elkezdenek betölteni, ahelyett, hogy várnának, amíg egy kérést nem tesznek.
         
    * A eltávolításMVRows paraméter az EDDTableFromMultidimNcFiles-ben most hatással lesz. A hamisítás beállítása jelentősen felgyorsíthat néhány kérdést, de ez nem alkalmas minden adatkészletre. További információkért lásd:[a paraméter leírása](/docs/server-admin/datasets#removemvrows)...
         
    * Adatkészletek (EDDTableFromNcFiles ésEDDGridFromNcFiles) A zarr fájlok használata most támogatott. Tartalmazniuk kell a "zarr"-t vagy a fájlNameRegex-et vagy az útRegex-et. Lásd:[zarr secion az adatkészletek dokumentációjában](/docs/server-admin/datasets#zarr)További részletekért.
         
    * Új adatkészlettípus, EDDTableFromParquetFiles már támogatott. Lásd:[EDDTableFromParquetFiles secion in the datasets dokumentáció](/docs/server-admin/datasets#eddtablefromparquetfiles)További részletekért.
         
    *   [Prometheus metrikák](https://prometheus.io/)jelenleg elérhető /erddap/metrikus.
         
    * Egy új XML parser implementáció áll rendelkezésre. Ez az új parser lehetővé teszi a XInclude használatátdatasets.xml... Köszönhetően Ayush Singh a funkcióért.
         
    * Új paraméterdatasets.xmla szokatlan tevékenységi e-mailek ellenőrzése. szokatlanAktivitás A FailPercent 25% -os régi értékre alapozza. Köszönhetően Ayush Singh a funkcióért.
         
    * Az új paraméter a setup.xml-ben, amely ellenőrzi, ha az adatkészletek betöltési hibái a status.html oldalon jelennek meg. Alapértelmezett az igaz, hogy letiltsa az adatkészlet hibáit a status oldalon, állítsa be a showLoadErrorsOnStatusPage hamis:&lt;dalszöveg: LoadErrorsOnStatusPage&gt; False&lt;/showLoadErrorsOnStatusPage&gt;
         
    * Néhány kis változás és hibajavítás.
         
*    **MertERDDAP™Fejlesztők:** 
    * Elkülönült tesztelés az egységre és az integrációra (lassú) tesztek. Szintén több teszt engedélyezett és tesztek készült kevésbé ízesített.
         
    * Error Prone (Néhány ellenőrzés még mindig fogyatékkal élő) Spot Bugs integrálva Maven.
         
    * Teljes kód bázis formázva, hogy megfeleljen a Google Style Guide.
         

## Verzió 2.24{#version-224} 
 (2024-06-07) 

*    **Új funkciók és változások (felhasználók számára) :** 
    * Új színes paletta EK80 az akusztikus adatkészletek számára. Ennek köszönhetően Rob Cermak.
         
    * Rögzítsen egy problémát, ahol az EDDTableAggregateRows nem mutatott megfelelő tartományokat minden gyermektől. Marco Albanak köszönhetően a fix és hibajelentésért.
         
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * TO DO: SZECURITY CHANGE: A Google hitelesítése módosíthatja a CSP-jét.
        
Pontosabban, akkor is hozzá kell adni https://accounts.google.com/gsi/style a stlye-src és https://accounts.google.com/gsi/ a connect-src. A script-src-hez most használhatsz https://accounts.google.com/gsi/client.
 
        
További információkért mehetsz a[Google oldal](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)a CSP konfigurációról.
         
        
    * Új megosztott Watch szolgáltatás. Ez egy új lehetőség a könyvtárak figyelésére a frissítésekre. Egy szál van minden fájlrendszerhez, ahelyett, hogy egy szál lenne adatkészletenként. Valószínűleg ez drasztikusan csökkenti a változások figyelésére használt szálak számát. Ez azt jelenti, hogy minden adatkészlet frissül, ahelyett, hogy minden adatállomány saját frissítési gyakorisággal rendelkezik. Valószínűleg ez gyakoribb frissítéseket jelent a legtöbb adatkészlet számára.
        
Ennek lehetővé tétele&lt;HasználatSharedWatchService&gt;&lt;/useSharedWatchService&gt; a beállításhoz.xml.
        
          
Kérjük, próbálja meg ezt, és jelentse vissza, hogyan működik az Ön számára, hogy krízis. John at noaa.gov.
         
    * Fix a helytelen var nevek a logokban. Köszönhetően Ayush Singh a fix.
         
    * Néhány kis változás és hibajavítás.
         
*    **JavításokERDDAP™fejlesztők:** 
    * A helyi fejlesztés támogatása a Docker segítségével. Köszönöm Matt Hopson és Roje.
         
    * A helyi fejlesztés támogatása a Jetty és a dokumentáció javításával. Köszönöm Micah Wengren.
         
    * Változások tesztek csökkentése kérdések kereszt platform. Köszönöm Shane St. Savage.
         

## Verzió 2.23{#version-223} 
 (2023-02-27) 

Ne feledje, hogy ezt a kiadást Bob Simons tette, ezáltal azt mutatja, hogy még mindig a Chris John-ra való áttérés során aktív. Ezzel a kiadással kapcsolatban minden kódváltozást Chis John végzi, kivéve, ha másként meghatározott.

*    **Új funkciók és változások (felhasználók számára) :** 
    *    (Nem)   
         
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * TO DO: SZECURITY CHANGE: A Google Authentication most az új Google Identity Services könyvtáron keresztül valósul meg, amely a "Sign In with Google" része. A Google támogatja a régi "Google Sign In" rendszert, megszünteti a 2023-03-31-et. Tehát, ha a Google hitelesítést használja az ÖnbenERDDAP™telepítés, frissíteni kellERDDAP™v2.23+ azelőtt. (Bob sajnálja a rövid értesítést. Ez Bob hibája.)   
         
    * IMPROVED: NCCSV most v1.2. A változás az, hogy a fájlok most UTF-8 kódolt fájlok (Ők voltak ASCII) és így most is tartalmazhat bármilyen Unicode karaktert, mint az, anélkül, hogy kódolnánk \\u_hhh_, bár ez még mindig megengedett.
NCCSV fájlok írásakor,ERDDAP™most v1.2 fájlokat ír.
        ERDDAP™Még mindig olvassa el az NCCSV fájlokat, amelyek követik a v1.0 és v1.1 specifikációt.
Köszönhetően Pauline-Chauvet, n-a-t-e, és a thogar-számítógép ezt javasolja, és a tesztek, hogy biztosítsák a különböző terepprogramok import UTF-8 fájlokat. Bob Simonsnak köszönhetően ez a kódváltozás.
         
    * NEW: A status.html weboldalnak most van egy olyan vonala, amely azt jelzi, hogy az adatkészletek jelenleg terhelik és kapcsolódó statisztikákat, vagy sem, ha nincs adatkészlet betöltése. Ez nagyon hasznos lehetERDDAP™adminisztrátorok próbálják kitalálni, miért terhelik Az adatkészletek olyan hosszú ideig tartanak. Továbbá az nGridDatasets, nTableDatasets és az nTotalDatasets az alábbiakban számít, amelyek most azonnaliak (Korábban ők voltak az utolsó nagy terhelés végén Adatkészletek) ...
Ez a változás Roy Mendelssohn számára készült. Bob Simonsnak köszönhetően ez a kódváltozás.
         
    * IMPROVED: GenerateDatasets Az Xml most megváltoztatja a CF-1.10-et (volt CF-1.6) a „találkozók” tulajdonságaiban.
Bob Simonsnak köszönhetően ez a kódváltozás.
         
    * Néhány kis változás és hibajavítás.
         

## Verzió 2.22{#version-222} 
 (megjelent 2022-12-08) 

Ne feledje, hogy ezt a kiadást Bob Simons tette, ezáltal azt mutatja, hogy még mindig körül van, és aktív az utódjára való átmenet során.

*    **Új funkciók és változások (felhasználók számára) :** 
    *    (Nem)   
         
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * TO DO: semmi.
         
    * SECURITY BUG FIX: Volt egy Cross Site Scripting-related bug a kód a nyelv kiválasztása leesett. KöszönömNOAABiztonsági ellenőrzések ennek elkapásához. Ez azt mutatja, hogyNOAAA biztonság aktívan és rutinszerűen biztonsági gyengeségeket keresERDDAP...
         
    * SECURITY FIX: A sok könyvtár használtaERDDAP™Aktualizálták, mint általában, ennek a kiadásnak a részeként. Ezúttal ez magában foglalta a PostgreSQL sofőr frissítését (amely biztonsági hiba volt) 42.5.1.
         
    * IMPROVED: Több apró változásERDDAP„A memóriamenedzsment rendszerének csökkentenie kell a rendelkezésre álló memória hiánya miatt elmulasztott kérés esélyét.
         
    * Néhány kis változás és hibajavítás.
         

## Verzió 2.21{#version-221} 
 (2022-10-09) 

*    **Új funkciók és változások (felhasználók számára) :** 
    *    (Nem)   
         
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * TO DO: MertJava17, akkor nem kell használni \\-d64 JAVA\\_OPTS setenv.bat vagy setenv.sh. Tehát, ha ott van, kérlek, távolítsa el. Úgy gondolom, hogy 64 bites mód van kiválasztva, amikor letölt egy 64 bites verziótJava... Sam Woodmannak köszönhetően.
         
    * BUG FIX: Néha az új e-mail rendszer túl gyakran próbálkozott bejelentkezni, ami miatt a Google e-mail szerverei visszautasítják az összes jövőbeli bejelentkezést. Most az e-mail rendszer elkerüli ezt és a kapcsolódó problémákat.
         

## Verzió 2.20{#version-220} 
 (2022-09-30) 

*    **Ne használja v2.20. Ez hibás.** De az adminisztrátoroknak még mindig meg kell tenniük a lent felsorolt TO DO elemeket a v2.21+-ra történő frissítéskor.
     
*    **Új funkciók és változások (felhasználók számára) :** 
    *    (Nem)   
         
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * IMPROVED: A régi memóriakezelési rendszert újra bevezettük (Math2.ensureMemory elérhető) és módosította az új memóriakezelő rendszert (EDStatic.shed ThisRequest) hogy jobban működjön vele. Lásd[Memory Status](/docs/server-admin/additional-information#memory-status)részletekért.
         
    * Összefüggő: Az alapértelmezettség&lt;ipAddressMaxRequests&gt; bennedatasets.xml7-től 15-ig nőttek. Világos, hogy néhány legitimWMSAz ügyfelek több mint 7 egyidejű kérést generálhatnak.
         

## Verzió 2.19{#version-219} 
 (megjelent 2022-09-01) 

*    **Ne használja a v2.19-et. Ez hibás.** De az adminisztrátoroknak még mindig meg kell tenniük a lent felsorolt TO DO elemeket a v2.20+-ra történő frissítéskor.
     
*    **Új funkciók és változások (felhasználók számára) :** 
    * NEW: Van egy új szerveroldali funkció,orderByFelemelkedés, amely úgy működik, mintorderBy, de fajta leszármazott rendben. Adam Leadbetternek köszönhetően.
         
    * IMPROVED: Most, grafikonok (de nem térképek) bővülni fog, hogy kitöltse a rendelkezésre álló helyet a vászonon, vagyis a legenda által nem használt térben. Magas grafikonokat, négyzet grafikonokat vagy széles grafikonokat kaphat a &.size=_width_ hozzáadásával és manipulálásával|_height_ paraméter (ahol a szélesség és a magasság meghatározza a vászon méretét, pixelekben) a kérelem URL. (Ez nem egy lehetőség a .graph weboldalon. Kézzel kell hozzáadni az URL-hez.) Ha nem határozza meg a &.size paramétert, kéri a .smallPng, .png, .largePng, .smallPdf, .pdf és .large.pdf előre meghatározott vászonméreteket, így a grafikon kiterjeszti a rendelkezésre álló teret, de általában nagyjából négyzet lesz. Bob Flemingnek köszönhetően.
         
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * TO DO:ERDDAP™most megköveteliJava17 és a kapcsolódó Tomcat 10. Követnetek kellERDDAP™telepítési utasítások (vagy az egyenértékű pl. Docker) telepítésJava17 és Tomcat 10 és másolja a\\[Tomcat\\]/ Content könyvtár a Tomcat 8 telepítés az új\\[Tomcat\\]könyvtár. Nincs más változás, amit meg kell tennie aERDDAPe változáshoz kapcsolódó létesítmény. Más szavakkal,ERDDAP™úgy működik, mint korábban.
        
Ne felejtsd el, hogy készítsd elERDDAP- a Tomcat kiszolgálójának.xml és kontextusának megváltoztatása.xml, amikor frissíti a Tomcat-ot. LásdERDDAPA[Tomcat telepítési utasítások](/docs/server-admin/deploy-install#tomcat)...
        
Benyomásom aJava17 az, hogy előnyben részesíti a feldolgozóképességet és a memóriát a hosszú távú, nagyobb alkalmazásokhoz, mint példáulERDDAP™Így valamivel lassabban működik, mintJava8 alacsony teljesítményű számítógépekkel (pl. 2 kor és minimális RAM) és valamivel gyorsabban működik, mintJava8 magasabb teljesítményű számítógépekkel (pl. 4+ kukorica és rengeteg RAM) ... Tehát, ha rossz teljesítményt lát, használjon olyan programokat, mint a Linux[felső](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/)Ellenőrizze az erőforrás-felhasználást és fontolja meg az adástERDDAP™több erőforrás, különösen több memória. A memória olcsó&#33; A legtöbb telefon több processzorral és memóriával rendelkezik, mint a kiszolgálók, amelyeket néhányan közületek használnak.ERDDAP&#33;
Erin Turnbullnak köszönhetően.
         
        
    * TO DO: Ha használjaERDDAP™hozzáférés Cassandra, a Cassandra, meg kell, hogy használja a verziótJavahogy a Cassandra futtatására használták. Csak váltsonJava17 a Tomcat+ futtatásáhozERDDAP...
         
    * TO DO: ajánlott: Ha a kiszolgáló CPU 4 + fűvel és 8 + GB RAM-mal rendelkezik, fontolja meg a beállítások megváltoztatását adatasets.xmlfájl:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Ha a szerver kevesebb erőforrással rendelkezik, ragaszkodjon az "1"-hez mindkét beállításhoz.
Az nThreads rendszerekEDDGridFromFiles és EDDTable Az FromFiles jelentősen javult. Ezek a változások hatalmas sebességnöveléshez vezettek (pl. 2X sebesség, ha az nThreads 2 vagy annál több) a legnehezebb kérésekért (ha nagyszámú fájlt kell feldolgozni az eredmények összegyűjtésére) ... Néhány kapcsolódó változás Chris John is vezet egy általános sebességet az egészbenERDDAP... Ezeknek a változásoknak a kódját Chris John segítette. Köszönöm, Chris&#33;
         
    * FIGYELMEZTETÉS: hifénekdatasetID"Elképzelt és már nem támogatott (bár technikailag még mindig engedélyezett) ... Valószínűleg a következő felszabadításban fogják letiltani őket. Ha hyphens-t használ, váltson alulbecsülni most, hogy elkerülje a bajt. Ha most változtatsz, akkor saját sebességed van. Ha várja a következő kiadást, akkor egy pánikban lesz, és ezt a napot kell kezelnie.
         
    * NEW: Most,.htmlTableadatválaszok, ha a String cellában lévő adatok adatokat tartalmaznak:image/png;base64, amelyet egy base64 kódolt .png kép követ,ERDDAP™megjelenik egy ikon (így a felhasználó láthatja a képet, ha lebegnek rajta) és gombok menteni a szöveget vagy a képet a vágólapra. Marco Albanak köszönhetően (aki hozzájárult a kódhoz) Bob Simons (aki kissé módosította) ...
         
    * dalszöveg: DoNotAddStandardNames
Ha tartalmazza a \\-doNotAddStandardNames mint parancssori paraméter, ha fut generál Adatkészletek Xml, generál Adatkészletek Xml nem fog hozzáadnistandard\\_nameaaddAttributesbármilyen változó más, mint a latitude, hosszúság, magasság, mélység vagy idő (amely nyilvánvalóstandard\\_names) ... Ez hasznos lehet, ha a termelést használja Adatkészletek Xml közvetlenülERDDAP™a kimenet szerkesztése nélkül, mert generál Adatkészletek Xml gyakran guessesstandard\\_nameHelytelenül. (Vegye figyelembe, hogy mindig azt javasoljuk, hogy szerkesztse a kimenetet, mielőtt használja aztERDDAP...) Ezzel a paraméterrel más kisebb hatások is lesznek, mert a kitaláltstandard\\_namegyakran használják más célokra, például egy új létrehozásralong\\_nameÉs létrehozni a színBar beállításokat. Kevin O'Briennek köszönhetően.
         
    * NEW: Most már elhelyezheted&lt;frissítésMaxEvents&gt;10&lt;/updateMaxEvents&gt; bennedatasets.xml  (a többi beállítás a felső közelében) a fájlok maximális számának megváltoztatása (default=10) Ezt feldolgozza a frissítésEveryNMillis rendszer. Nagyobb szám (100?) hasznos lehet, ha nagyon fontos, hogy az adatkészletet mindig naprakészen tartsák. Lásd:[frissítésMaxEvents dokumentáció](/docs/server-admin/datasets#updatemaxevents)... John Maurernek köszönhetően.
         
    * NEW: Hozzáadott támogatás a globális "real\\_time= Igaz|hamis" String tulajdonság.
Ha ez hamis (az alapértelmezett) és ha az adatkészlet nem használja a frissítést MindenNMillis,ERDDAP™a fájltípusok iránti kérelmekre adott válaszokat, ahol az egész fájlt előbb kell létrehozniERDDAP™elkezdheti küldeni a választ a felhasználóra, és akár 15 percig újra felhasználhatja őket (pl.:.nc, .png) ...
Ha ez igaz, vagy ha az adatkészlet frissítést használ MindenNMillis,ERDDAP™Soha nem fogja összezúzni a válaszfájlokat, és mindig újonnan létrehozott fájlokat fog visszaküldeni.
John Maurernek köszönhetően.
         
    * ÚJ: Az e-maileket most egy külön e-mailben küldik. Ez olyan adatkészleteket és egyéb műveleteket terhel, amelyek gyorsabban generálják az e-maileket, mert a loadDatasets nem kell várnia az e-mail küldésére, ami néha hosszú időt vesz igénybe. Az új rendszer több e-mailt küldhet e-mail ülésen, így csökkenti az e-mail szerver bejelentkezések számát, és csökkenti a kudarc kockázatát, mert túl gyakoriak. Vannak statisztikák az e-mailThread a status.html oldalon és diagnosztikai üzenetek a log.txt - keresse az "emailThread". Vegye figyelembe, hogy az nEmailsPerSession=0 tallyja bajt jelez, azaz egy e-mail ülés nem volt képes elküldeni bármilyen e-mailt.
Bob Simonsnak köszönhetően.
         
    * KAPCSOLÓDÓ: Az e-maileket kissé más kóddal küldik (mertJava17 és az e-mailThread módosítása) ... Ha baj küld e-maileket, kérjük e-maileketerd.data at noaa.gov...
         
    * ÚJ: Az előfizetési intézkedések, amelyek "érintik" a távoli URL-t, most egy külön érintőképernyőben kezelik. Ez teszi a terhelés adatkészletek és egyéb intézkedések, amelyek érintik az URL-eket gyorsabban, mert a terhelésDatasets nem kell várni a kapcsolatot befejezni, ami néha hosszú időt vesz igénybe. Vannak statisztikák a touchThread a status.html oldalon és diagnosztikai üzenetek a log.txt - keresse meg a "touchThread".
Bob Simonsnak köszönhetően.
         
    * NEW: A status.html oldalon, a "Major LoadDatasets Time Series", van egy új "sült" oszlop, amely jelzi a kérések számát, amelyek fedezték, mert a jelenlegiERDDAP™A memóriahasználat túl magas volt. Azok a kérések, amelyek fedezetet kapnak, visszaküldik a HTTP státuszkódot 503 "Szolgáltatás elérhető". Ezek a kérések nem feltétlenül jelentek problémát. Csak egy elfoglalt időre érkeztek. Ez része volt egy revampának, hogyanERDDAP™foglalkozik a magas memóriahasználattal.
         
    * NEW: Az Unix/Linux számítógépeken most van egy "OS Info" sor a status.html weboldalon, ahol a jelenlegi operációs rendszerinformációk vannak, beleértve a CPU terhelést és a memóriahasználatot.
         
    * IMPROVED: Most, amikorERDDAP™újraindított és gyorsRestart=true, EDDTableFromFiles adatkészletek újrahasználata.ncKülönböző.nc... Néhány adatkészlet esetében ez nagymértékben csökkenti az adatkészlet betöltésének idejét (pl. 60 másodperctől 0,3-ig) ... Az új e-mailThread és a feladatThread mellett (lásd fent) , ez nagyban felgyorsítja az újraindítástERDDAP™sokERDDAP™telepítések. Ben Adamsnak és John Kerfootnak köszönhetően.
         
    * Előzőleg árva adatkészletek (olyan adatkészletek, amelyek élnekERDDAP™de nemdatasets.xml) egyszerűen megjegyezték a státuszt. html és log.txt után minden nagy terhelésDatasets. Most automatikusan eltávolítják őketERDDAP™és megjegyezte a status.html és a log.txt, és e-mailben Minden. Tehát, ha egy adatkészletet szeretne eltávolítaniERDDAP™Most minden, amit meg kell tennie, eltávolítja az xml darabjátdatasets.xmlés eltávolításra kerül a következő nagy terhelésDatasets. Bob Simonsnak köszönhetően.
         
    * KNOWN BUG netcdf-java v5.5.2 és v5.5.3: AEDDGridFromThredd Katalógus opció a GenerateDatasets-ben Xml használt dolgozni THREDDS katalógusok, amelyek tartalmazzák hivatkozások adatkészletek távoli THREDDS katalógusok. Most nem. Beszámoltam a problémát a netcdf-java fejlesztőknek.
         
    * BUG FIX: A Docker felhasználók beállítása.xml paramétereken keresztülERDDAP\\__paramName_: int és boolean paraméterek (pl. e-mail SmtpPort) ,ERDDAP™helytelenül keresett _paramName_. Most keres _ERDDAP\\_paramName_. Alessandro De Donnonak köszönhetően.
         
    * CHANGE: AERDDAP™A tesztelési rendszer most egy automatizált rendszert használ annak ellenőrzésére, hogy az újonnan létrehozott tesztképek pontosan olyanok, mint amilyenek várhatóak. Chrisnek köszönhetően John a javaslatért és Bob Simons a végrehajtásért.
         

## Verzió 2.18{#version-218} 
 (megjelent 2022-02-23) 

*    **Új funkciók és változások (felhasználók számára) :** 
    * Nem
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * BUG FIX:.ncA fájlokat bizonyos körülmények között nem zárták le. Most ők is. Marco Albanak, Roland Schweitzernek, John Maurernek és másoknak köszönhetően.
         

## Verzió 2.17{#version-217} 
 (megjelent 2022-02-16) 

*    **Új funkciók és változások (felhasználók számára) :** 
    * BUG FIX: A változások utánorderByrendszer néhány évvel ezelőtt, Tabledap's Make A Graph nem megfelelően kezelt sok kérdést, amely használtorderBy_Xx_. Most ezt teszi. Maurice Libesnek köszönhetően.
         
    * KANGE: Korábban,ERDDAP™elutasított kérelmek . Átlátszó Png, amikor a magasság és/vagy a hosszúság értékek részben vagy teljes mértékben a rangsorban voltak. (ERDDAP™GitHub Issues #19, által közzétett Rob Fuller - köszönetet mondani, hogy Rob) Most átlátszó pixeleket hoz a kép bármely határterületére. Ez sok ügyfélalkalmazás számára hasznos. A kód megváltoztatja, hogy ezt a változást teljesen Chris John végezte. Köszönöm nagyon, Chris&#33;
         
    * KANGE: Korábban,ERDDAP™elutasított griddap kérések, ahol az index értékek egy adott dimenzióban voltak\\[magas: alacsony\\]... Most ezeket a kéréseket az alacsony és magas értékek csökkentésével teszi érvényessé. Ez megoldja a felhasználók és a külső programok, mint az xtracto, hogy nyomon kell tartani a néhány adatkészletek, amelyek a magas és alacsony, hogy a kérés, mint például a\\[ (50.) : (20.) \\]hogy az index térben a kérés\\[alacsony: magas\\]... Lásd https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html Most egy olyan kérés, mint\\[ (20.) : (50.) \\]az egyik ilyen adatkészlet automatikusan értelmezhető, mint\\[ (50.) : (20.) \\]...
         
    * KAPCSOLÓDÓ: .esriAscii kérések most indítanak egy "File : Save As" párbeszédpanelet a felhasználó böngészőjében. Joel Van Noordnak köszönhetően.
         
    * BUG FIX: Most, ha a gyermek adatkészletének hosszúsága változóEDDGridLonPM180 vagyEDDGridLon0360 adatkészletvalid\\_minvagyvalid\\_maxtulajdonképpen eltávolítják őket aEDDGridLonPM180 vagyEDDGridLon0360 adatkészlet. Roy Mendelssohnnak köszönhetően.
         
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * TO DO: Ha beállítottad&lt;adatProviderFormActive&gt; hamis, hogy átmenetileg foglalkozik az XSS sebezhetőségével, kérjük, állítsa vissza az igazat.
         
    * SECURITY BUG FIX: fix XSS sebezhetőség az adatszolgáltatói formában. Genaro Contreras Gutiérreznek köszönhetően.
         
    * BUG FIX: Amikor egy AWS S3 szennyezés több mint 10000 fájlt tartalmazott,ERDDAP™"Belső hiba" Ez most rögzített. Andy Zieglernek köszönhetően.
         
    * BUG FIX:EDDGridA SideBySide nem tette lehetővé a változók számárasourceNameS a különböző gyermekadatbázisokban, hogy ugyanaz legyen. Most ezt teszi. Joshua Stanfordnak köszönhetően.
         

## Verzió 2.16{#version-216} 
 (2021-12-17) 

*    **Új funkciók és változások (felhasználók számára) :** 
    * CHANGES/BUG FIXES: Számos kis változás a fordítási rendszerben a nyelvspecifikus szerkesztők javaslatainak köszönhetően. Melanie Abecassisnak köszönhetően Marco Alba, Jessy Barrette, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian és Mike Smit.
         
    * A Google Fordítás megfelelő kimutatását és tulajdonát képezte, amint azt a Google Fordítás feltételei megkövetelik. Továbbá,&lt;html&gt; címke a HTML-ben minden weblap számára manapság megfelelően azonosítja a nem angol weboldalakat, ahogy a gépet lefordították. Mike Smitnek köszönhetően.
         
    * BUG FIX: A bejelentkezési weboldalak most megfelelően működnek különböző nyelvi beállításokkal. Mike Smitnek köszönhetően.
         
    * ÚjorderBySum szűrő. Új Ellenőrzés All és Uncheck Minden gombEDDGridData Access Form weboldal. A Marco Alba kódhoz való hozzájárulásának köszönhetően.
         
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * TO DO: Ha van
        &lt;KérdésMarkImageFile&gt;QuestionMark.jpg&lt;/questionMarkImageFile &gt;
a setup.xml fájlban, el kell távolítania az egész tagot (ajánlott, így az alapértelmezett fájlt használják) vagy változtassa meg:
        &lt;KérdésMarkImageFile&gt;QuestionMark.png&lt;/questionMarkImageFile &gt;
         
    * CHANGE: Csak így tudod,[Adoptium](https://adoptium.net/?variant=openjdk8)felváltotta az AdoptOpenJDK-t, mint a fő / ajánlott forrástJava  (OpenJDK) ...
         
    * CHANGE: A logfájlokERDDAP™, GenerateDatasets Xml és a DasDds most UTF-8, nem a számítógép alapértelmezett karakterkészlete. Rengeteg ellenőrzést végeztem, és néhány változtatást tettem annak biztosítására, hogyERDDAP™mindig meghatározza a megfelelő karakterkészletet az összes fájl olvasásakor vagy írásakor, és már nem (több esetben) támaszkodik a számítógép alapértelmezett karakterkészletére. Ez kijavított néhány hibát, és olyan közel került, mint tudtam használni UTF-8 a lehető legtöbb fájltípushoz (pl.: .log, .xml, .html,.json,.jsonl,.ncFejlesztő) ... Vegye figyelembe, hogy sok régebbi fájltípusra van szükség az ISO-8859-1 használatához (pl.:OPeNDAP.das, .dds, .csv,.tsv,.nc3,.nccsv, cpt) ... Korábban megpróbáltam együttműködni a CF csoporttal és azzalUnidataaz UTF-8 támogatása.nc3 fájl; mindkettő ellenálló volt.
         
    * ÚJ: A fájlok letöltése az AWS S3-ból,ERDDAPdalszöveg: Cache FromUrl rendszerEDDGridFromFiles és EDDTable FromFiles most használja az új AWS Transfer Manager, hogy letöltse fájlokat párhuzamos zsákok segítségével (nagyon gyors) ... A célteljesítmény 20 Gbps-re van beállítva, fájlonként, így ez jól működik az összes AWS-típussal, de különösen azok, amelyek kiváló "hálózati teljesítményt" tartalmaznak. Ezzel a változássalERDDAPdalszöveg: Cache FromUrl rendszer most kínál összehasonlítható sebességek röntgen megközelítése párhuzamos letöltések előgyűjtött fájlok, de anélkül, hogy meg kell alakítani a forrásfájlokat a forrásfájlok.ncés.hdfbetörött röntgenfájlokba. Valójában,ERDDAPa rendszer jobb, ha van egy későbbi kérés, hogy olvassa el ugyanazt a fájlt, mertERDDAP™most van egy helyi másolata a fájlnak. Közösségünk évekig szabványosított.ncés.hdffájlok. Most nem kell kitűznünk, hogy csak azért, hogy jó teljesítményt érjünk el, amikor adatokat tárolunk az AWS S3-ban. Rich Signellnek köszönhetően.
         
    * CHANGE: keresésEngine=Lucene most, deprecált. Ez egy komplex rendszer, amely gyakran hoz olyan eredményeket, amelyek kissé különböznek a kívánatos viselkedés a keresésEngine=eredeti. Szinte mindenERDDAP™létesítmények, Lucene időmegtakarítása nem ellensúlyozza az eredmények különbségeit. Kérjük, használja a kereséstEngine=eredeti helyett, ha lehetséges. Ha ez problémákat okoz, kérjük, e-mail Bob.
         
    * CHANGE: A Lucene keresésEngine most úgy viselkedik, mint az eredeti keresésEngine. Nincs többé olyan eset, amikor a lucene egy adatkészlet-mérkőzést gondol, és az eredeti nem. Továbbá, lucene rangsorok most egyenlő eredeti rangsorok (mert az eredetit mindig használják a rangsorok befejezésére) ...
         
    * BUG FIX: Kezdve egy közelmúltbeli kiadásban,ERDDAP™abbahagyta, hogy az első 1000 objektumot egy adott AWS S3 vödörben látja. Most,ERDDAP™ismét az összes objektumot látja. Andy Zieglernek köszönhetően.
         
    * BUG FIX: Most EDDTableAggregate A Rows eltávolítja aactual\\_rangefüggetlenül attól, hogy egy vagy több gyermek adatkészlet nem ismeri a változókat "..."actual\\_range  (pl.: EDDTableFromDatabase) ... Erik Gelettinek köszönhetően.
         

## verzió 2.15{#version-215} 
 (2021-11-19) 

*    **Új funkciók és változások (felhasználók számára) :** 
    *   ERDDAP™új rendszerrel rendelkezik, amely lehetővé teszi, hogy a felhasználó megadja a nyelvet, hogy minden weboldalra használható legyen. Ha egyERDDAP™telepítés jön létre, hogy használja, a lista a nyelvek jelennek meg a felső jobb sarkában minden weboldal.ERDDAP™Az URL-ek a verzió előtt továbbra is működnek, és mindig visszatérnek az angol tartalomhoz, mint korábban.
        
Nem minden szöveget vagy minden weboldalt lefordították. Volt időkorlátok ezen a projekten, amely megakadályozta Qi és Bob elérése 100%.
        
A nyilvánvaló kérdés: miért tettünk ennyi erőfeszítést erre, amikor a Chrome lefordítja a weboldalakat a repülésen? A válasz: így sokkal több ellenőrzést kapunk arról, hogy a fordítás hogyan történik. Különösen sok olyan szó van, amelyet nem kell fordítani a weboldalakon, például az adatkészletek címei és összefoglalói, a változók, paraméterek, egységek és szervezetek neve. A fordítási erőfeszítések nagy része olyan szavakat és kifejezéseket azonosított, amelyeket nem szabad lefordítani. Továbbá, a gépi fordítások hajlamosak mangle bizonyos típusú HTML markup. A fordítás kezelése lehetővé tette számunkra, hogy minimalizáljuk ezt a problémát.
        
A fordítási projektet Qi Zeng végezte (Google Nyári Kódex Belső) Bob Simons a Google Fordító webszolgáltatásával. Ez egy hatalmas projekt volt. Köszönöm, Qi&#33;
        
    * BUG FIX:ERDDAP™Most lehetővé teszi az ORCID ID-nek, hogy X legyen az utolsó számjegy. Maurice Libesnek köszönhetően.
         
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * TO DO:
        
        * Néhány változtatást kell végrehajtania aERDDAPAz új rendszer, amely lehetővé teszi a felhasználók számára, hogy megadják a nyelvet a weboldalak számára.
            * A setup.xml ésdatasets.xmlfájlok, változtasson: encoding="UTF-8" és változtassa meg a dokumentum kódolását a szövegszerkesztőben, így UTF-8 fájlként mentésre kerül. GenerateDatasets Az Xml most feltételezi, hogy adatasets.xmlUTF-8 fájl.
            * Programozók, akik összeállítjákERDDAP: MindenERDDAP™.java fájlokat kell kezelni UTF-8 fájlok alapértelmezett. Előfordulhat, hogy hozzá kell adnia az "EB-8" kódolást a javac parancssorhoz. (Megtettem.) 
            * E rendszer lehetővé tétele (erősen ajánlott) , a&lt;KezdőlapBodyHtml5&gt; címke, amelyet Ön megadottdatasets.xml, változtassa meg a "&amp&#33;loginInfo-t;" a "&amp&#33;loginInfo-ba;|&amp&#33;language;", hogy a nyelvek listája megjelenik a felső jobb sarkában mindenERDDAP™weboldal.
            *   ERDDAP™csak használja&lt;KezdőlapBodyHtml5&gt; címke, amelyet Ön megadottdatasets.xmla HTML tartalmak meghatározása a banner számára minden tetejénERDDAP™weboldal, függetlenül attól, hogy a felhasználó milyen nyelvet választ. Ha megváltoztatja ezt a címkét használni
"..."&EasierAccessToScientificData;"Ahelyett, hogy a "Könnyebb hozzáférés a tudományos adatokhoz" és
"..."&BroughtToYouBy;"Ahelyett, hogy "Brought to you",ERDDAP™fordított változatokat fog használni ezeknek a kifejezéseknek a bannerben.
            * Hasonlóképpen, az új alapértelmezettség&lt;dalszöveg: ShortDescriptionHtmldatasets.xmlaz
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
Az utolsó 3 tartalomsor olyan dolgok, amelyeket fordított szöveggel helyettesítenek. Ha bármelyiket megtérítesz (Nevezetesen & This ParticularErddap;) vagy mindegyikük, hogy kifejezze a szövegetdatasets.xml  (kiemelt, ha jelen van) vagy az üzenetek.xml, ez a szöveg nem fog megjelenni, függetlenül attól, hogy milyen nyelvet választ a felhasználó. Ez nem tökéletes, de rájöttem, hogy kevés adminisztrátor szeretne szerkeszteni&lt;theShortDescriptionHtml&gt; 35 különböző fájlban, hogy 35 különböző fordított verziót biztosítson a címkének.
        
          
         
    * KAPCSOLÓDÓ: Néhány hibát manapság kissé másképp kezelik, és így hozzáadhatók a status.html és a Daily Report e-mailben. Tehát ezek a számok valamivel nagyobbak lehetnek, mint korábban.
         
    * BUG FIX: GenerateDatasets Xml azEDDGridLon0360 ésEDDGridA LonPM180 most kizárja a forrásadatbázisokatdatasetID= ~".\\*\\_LonPM180" ésdatasetID= ~".\\*\\_Lon0360", vagyis.
         

## Verzió 2.14{#version-214} 
 (2021-07-02) 

*    **Új funkciók és változások (felhasználók számára) :** 
    *    (Nem)   
         
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * NEW:EDDGridLon0360, amely a hálózati adatkészletet a hosszúsági értékekkel és gt;=0 és&lt;= 360 őrült adatkészletből, hosszúsági értékekkel és gt;=-180 és&lt;= 180. Lásd:[EDDGridLon0360 dokumentáció](/docs/server-admin/datasets#eddgridlon0360)... Dale Robinsonnak köszönhetően.
         
    * NEW:ERDDAP™Az adminisztrátorok most felülírhatják a setup.xml értékét egy környezeti változón keresztülERDDAP\\__értékName_ futás előttERDDAP... Például használjonERDDAP\\_baseUrl felülírja&lt;alapUrl&gt; érték. Ez hasznos lehet a telepítés soránERDDAP™konténerrel, mivel szabványos beállításokat lehet elhelyezni a setup.xml-ben, majd speciális beállításokat kínálhat környezeti változókon keresztül. Ha titkos információkat nyújtERDDAP™ezen a módszeren keresztül győződjön meg róla, hogy az információ titokban marad.ERDDAP™csak az induláskor egyszer olvassa el a környezet változóit, így az egyik módja annak, hogy ezt használja: állítsa be a környezet változóit, kezdje elERDDAP™Várjon, amígERDDAP™Elkezdődik, majd beállítja a környezet változóit. Marc Portiernek köszönhetően.
         
    * IMPROVED: Most, ha néhány fájl egy EDDTableFrom... Files adatkészlet sok fájl van néhány nagyon hosszú String értékek, az adatkészlet sokkal gyorsabban tölti be, és reagál a kérések sokkal gyorsabb. Korábban,ERDDAP™sok helyet osztana a bányák és a max String értékek számára olyan fájlokban, amelyeket fájlinformációkkal tárolnak az ilyen adatkészletek számára. A kapott fájl óriási volt, ami azt írja, és lassan olvassa el. Az OBIS-nek köszönhetően.
         
    * IMPROVED: Most,ERDDAP™jobb munkát végez a szokatlan és érvénytelen karaktersorozatok értelmezése a CSV fájlokban. Az OBIS-nek köszönhetően.
         
    * FIX: Egy évnyi baj után Cassandra, végre sikeresen telepítettem Cassandra (v2) Ismét sikerült újraindítani a Cassandra v2 teszteket. Tehát most magabiztosabban kijelenthetem, hogyERDDAP™Cassandra v2 és v3. Az ONC-nak köszönhetően.
         

## Verzió 2.12{#version-212} 
 (2021-05-14) 

*    **Új funkciók és változások (felhasználók számára) :** 
    * BUG FIX: Ha az előfizetési feketelistán vagy, most nem kérhet fel az előfizetések listáját.
         
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * TO DO: NEW: rendszer, amely automatikusan korlátozza a rosszindulatú felhasználók képességét, és túlságosan agresszív legitim felhasználókat, hogy számos egyidejű kérést tegyenek, amelyek lerombolják a rendszer teljesítményét más felhasználók számára. Három új opcionális címke vandatasets.xmlamit tudsz / tedd hozzá közvetlenül utána&lt;graphBackgroundColor:
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

További információkért lásd:[ipAddressMaxRequests](/docs/server-admin/datasets#ipaddressmaxrequests)...ERDDAP™szintén kinyomtatja az „Egyedülálló felhasználók számát (Kezdőlap) " a status.html oldalon.
Hála a kínai embernek, aki megtámadta aERDDAP™telepítés.
         
    * CHANGE Postgresql sofőr viselkedése: Amikor frissítettem a Postgresql sofőrt, a Postgresql és a GenerateDatasetsXml által generált oszlop nevek az összes alsó táska helyett, mint korábban. Nem tudom, hogy ez hatással lesz-e más dolgokra, mivel az adatbázisok gyakran úgy vélik, hogy ezek a nevek érzéketlenek. A teszt adatkészletem továbbra is helyesen működik. De ha az adatkészlet nem működik ezzelERDDAP™frissítés, ez a lehetséges oka az első folytatásnak.
         
    * BUG FIX:ERDDAP™most is megfelelően kezeli a magán AWS S3 fájlokat. Voltak más kapcsolódó fejlesztések az AWS S3 fájlok kezeléséhez. Michael Ganglnak és Dylan Pughnak köszönhetően.
         
    * NEW:EDDGridFromNcFiles ésEDDGridFromNcFiles A nem csomagolt adatok most olvashatók a "struktúrákról".nc4 és.hdf4 fájl. A változó azonosítása, amely egy szerkezetből származik,&lt;sourceName&gt; &gt; &gt; &gt; Használja a formátumot: _fullStructureName_|_memberName_, például csoport1/myStruct|myMember. Az NRL-nek köszönhetően.
         
    * KAPCSOLÓDÓ: Most, ha a jelenlegi memóriahasználat és ez a kérés még kissé magas, griddap készletek nHárom ez a kérés az 1. Így,ERDDAP™megőrzi az emlékezetet, amikor a memória szűkös. Hála a kínai embernek, aki megtámadta aERDDAP™telepítés.
         
    * Új rendszer a nyílt fájlok számának nyomon követésére (amely magában foglalja az aljzatokat és más dolgokat, nem csak fájlokat) Tomcatban Linux számítógépeken. Ha néhány fájl hibásan soha nem zárul le, a nyílt fájlok száma növekedhet, amíg meghaladja a megengedett maximális és számos nagyon rossz dolog történik. Tehát most, Linux számítógépeken (az információ nem elérhető a Windows számára) :
        
        * Van egy új "Open Files" oszlop a status.html weboldal szélsőjobboldalán, amely megmutatja a max fájlok százalékát. A Windows-on csak "?.
        * MikorERDDAP™generálja ezt az információt az egyes jelentős adatkészletek újratöltésének végén, a naplóra nyomtat. txt fájl:
OpenFileCount=_current_ a max=_max_ %=_percent_
        * Ha a százalék &gt;50%, egy e-mailt küldünkERDDAP™adminisztrátor és az e-mail Minden E-mail címekre.
        
Tudjon meg többet, vagy ha látja ezt a problémát aERDDAP™lásd[Túl sok nyílt fájl](/docs/server-admin/additional-information#too-many-open-files)...
Hála a kínai embernek, aki megtámadta aERDDAP™telepítés.
         
    * NEW: Hozzáadtam egy csomó ellenőrzést a "Túl sok nyílt fájl", így a feladat csak megáll, és a felhasználó látja a hibaüzenetet. Az adatfájlok már nem lesznek rosszak, ha elolvassák őket egy "Túl sok nyílt fájl" hibában.
         
    * Új\\[bigParentDirectory[szerkesztés]\\]/badFilesFlag könyvtár:
Ha fájlt helyez a könyvtárba egydatasetIDmint a fájl neve (a fájl tartalma nem számít) ,ERDDAP™törli a rosszfiókokat.ncfájl ehhez az adatkészlethez (ha valaki) és újratöltse az ASAP adatkészletét. Ez okozzaERDDAP™ismét próbálkozni a korábban használt fájlokkal (téves?) rosszul jelzett. Marco Albanak köszönhetően.
         
    * KAPCSOLÓDÓ: Az induláskor, ha egyEDDGridFájlok vagy EDDTableFrom... A fájlok adatbázisa eredetileg 0 fájlt tartalmaz az ismert érvényes fájlok listáján (pl. ez egy új adatkészlet) AztánERDDAP™betölti és beállít egy zászlót, hogy betöltse az ASAP-ot, miután a nagy terhelésDatasets befejeződik. Ez felgyorsítja a kezdeti indulást, amikor új adatkészletek vannak.
         
    * FileVisitorDNLS.testAWSS3 () FileVisitorSubdir.testAWSS3 () ; most használja az AWS v2 (nem v1) SDK. Tehát most a GitERDDAP™elosztás most magában foglalja az összes szükséges fájlokat, és már nem kell manuálisan hozzáadni a hatalmas v1 AWS SDK jar fájlt.
         
    * KAPCSOLÓDÓ: Bekapcsoltam a Maven használatára, hogy észleljem / agyfüggőségeket (.jar fájlok /lib) ... Az AWS SDK v2-jének változása ezt szükségessé tette. Szükség lesz más importált kódra a jövőben. Hatalmas köszönet Kyle Wilcoxnak, aki biztosította a Pom.xml-t, amelyet létrehozott és használ, ami számos problémát megoldott nekem.
         
    * KAPCSOLÓDÓ: Az osztálypata paraméter (-cp) használt GenerateDatasetXml, DasDds és más kis programok, amelyek jönnekERDDAP™, és a programozóknak szóló tanácsadásban most sokkal egyszerűbb, és soha nem szabad újra változni, mivel a könyvtárra utal, nem pedig az egyes fájlokra:
\\-cp osztályok;C:\\programok_tomcat\\ lineservlet-api.jar;lib*
         (vagy ":" ahelyett, hogy ";" Linux és Macskák) ...
         (Évekkel ezelőtt kellett volna megtennem, amikor lehetőség lett.)   
         
    * NEW: GenerateDatasets Xml egy új hasznossági lehetőség: FindDuplicateTime, amely a megfogott gyűjteményen keresztül keres.nc  (és kapcsolódó) fájlokat találni fájlokat duplikált időértékekkel. Lásd[FindDuplic Idő](/docs/server-admin/datasets#findduplicatetime)  
         
    * NEW:datasets.xmlmost tartalmazhat egy&lt;paletta&gt; címke, amely felülírja&lt;paletták&gt; címkeérték az üzenetekből.xml (vagy visszaállítja az üzeneteket.xml értéket, ha üres) ... Ez lehetővé teszi a rendelkezésre álló paletták listáját, miközbenERDDAP™fut. Továbbá, ha van egy cptfiles aláírása aERDDAP™tartalomkezelő,ERDDAP™lemásolja az összes \\*.cpt fájlt az adott könyvtárban\\[Tomcat\\]/webapps/erddap/WEB-INF/cptfiles könyvtár minden alkalommalERDDAP™kezdődik. Együtt, ezek a változások lehetővé teszik, hogy a palettákat, és a változások továbbra is fennállnak, amikor telepít egy új verziótERDDAP... Lásd:[paletta dokumentáció](/docs/server-admin/datasets#palettes)  
Köszönhetően Jennifer Sevadjian, Melanie Abecassis, és talán más CoastWatch emberek.
         
    * [[szerkesztés]]&lt;lassúDownTroubleMillis&gt;] (/docs/server-admin/adatbázisok#slowdowntroublemillis) most minden meghibásodott kérésre használják, nem csak néhány típusra.
         
    * KAPCSOLÓDÓ: A RunLoadDatasets most megszakítja a LoadDatasets szálat 3/4 LoadDatasets MaxMinutes így több idő van a LoadDatasets számára, hogy észrevegye a megszakítást és kegyesen kilépjen. Ezenkívül egyre több és jobb diagnosztikai üzenet van.
         
    * A Lucene régi verziójától a v8.7.0-ig.
         
    * CHANGE: E-mailek küldéseERDDAP™most egy rögzített szélességi betűvel jelenik meg.
         
    * Tanú:EDDGridFromFiles most kap a tengelyértékek, valamint tulajdonságok FIRST|LAST fájl, amint meghatározott&lt;metadataFrom&gt;. Köszönöm (nem) Ken Casey, és al.
         
    * ADDED támogatás a "degree\\_North" és a "degree\\_East" érvénytelen egységekhez, amelyeket tévesen használnak a legutóbbi fájlok (2020-10-01 óta) az AVHRR Pathfinder Version 5.3 L3-gyűjtve (L3C) SST adatkészletek (nceiPH53sstd1day és nceiPH53sstn1day) ...ERDDAP™most szabványosíthatja őket érvényes egységekre. Köszönöm (nem) Ken Casey, és al.
         

## Verzió 2.11{#version-211} 
 (2020-12-04) 

*    **Új funkciók és változások (felhasználók számára) :** 
    * BUG FIX: OrderByMean dobott egy NullPointerException, ha egy változó volt csak az egyik \\_FillValue vagy hiányzó\\_ Az érték határozott. Most helyesen kezeli a helyzetet. Marco Albanak köszönhetően.
         
    * BUG FIX: Voltak problémák az ODV szöveges fájlok által létrehozottERDDAP™V2.10-ban. Ezek a problémák rögzítve vannak. Shaun Bellnak köszönhetően.
         
    * BUG FIX: Csak aERDDAP™v2.10: Ha a lat lon kötelékeket az URL-ben határozták meg, a kötődoboz nem szerepelt a világtérképen. Most ismét. John Maurernek köszönhetően.
         
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * BUG FIX: Csak aERDDAP™v2.10: A script fájlok ArchiveADataset, GenerateDatasets Az Xml és a DasDds nem működött, mert nem voltak változásai az osztálypátiának, amiket hozzáadtakERDDAP™V2.10. Most csinálják. Marco Albanak köszönhetően.
         
    * NEW: Indatasets.xmlLehet, hogy most van a címke:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

Jelenleg, ha igaz (vagy ha a címke üres, vagy ha a címke nem szerepel a fájlban) Amikor egy felhasználó kérése NullPointerException-hez vezet,ERDDAP™e-mailt küld a veremcsapdánakerd.data at noaa.gov  (aERDDAP™Fejlesztő csapat) ... Ez biztonságosnak és biztonságosnak kell lennie, mivel nincs bizalmas információ (pl. a kérésUrl) az e-mailben szerepel. Ennek lehetővé kell tennie, hogy bármilyen homályos, teljesen váratlan hibát elkapjon, amely a NullPointerExceptionshez vezet. Ellenkező esetben a felhasználó látja a kivételeket, de aERDDAP™A fejlesztők nem, ezért nem tudjuk, hogy van olyan probléma, amelyet rögzíteni kell.
        
Lehetséges, hogy ez a címke más, hasonló diagnosztikai információkhoz vezet, amelyeket e-mailben küldenek.erd.data at noaa.gova jövőben. Az e-mail tartalma mindig minimális és kapcsolódik a hibákhoz, és nem, például a használati információkhoz. Marco Albanak köszönhetően.
         
        
    * KAPCSOLÓDÓ: Most, közös tömörített fájltípusok (.bz2,.gz,.gzip,.tar,.tgz,.z,.zip) tilos a byte hatótávú kérésekre is. Ezt a&lt;kiterjesztésekNoRangeRequests&gt; az üzenetekben.xml.
         
    * KNOWN PROBLEM: MintERDDAP™2.10,.ncml fájlok, amelyek megpróbálják megváltoztatni a tulajdonságot, ne változtassa meg a tulajdonságot. Ez egy ismert hiba a netcdf-java-ban, amit bejelentem, és azt mondják, a netcdf-java következő kiadásában lesz rögzítve.
         

## Verzió 2.10{#version-210} 
 (2020-11-05) 

*    **Új funkciók és változások (felhasználók számára) :** 
    * ÚJ: Az új[Interpoláció](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html)A konverter hatékonyan interpolálja az értékeket egy rácsos adatkészlet értékéből. Mint ilyen, különösen hasznos a kutatók, akik dolgoznak az állati nyomkövetési adatok. Ez a konverter egy asztalban van, magassággal, hosszúsággal és időoszlopokkal (és talán más oszlopok) és visszatér egy táblázat további oszlopokkal interpolált értékekkel. Így ez hasonló a népszerűséghez[Xtractomatic](https://coastwatch.pfeg.noaa.gov/xtracto)A Dave Foley által eredetileg létrehozott forgatókönyv, de kérésre akár 100 pontot is kínál. Dave Foleynek és Jordan Watsonnak köszönhetően (NMFS) ...
         
    * IMPROVED: Az Advanced Search most szigorú a nem-.html kérésekhez. Most kivételeket fog dobni olyan kérésekre, amelyek állandó hibákkal rendelkeznek (pl. kérések, ahol a minLat &gt; maxLat) vagy ideiglenes hibák (pl. kérések egystandard\\_nameez nem létezik) ... A .html kérések esetében az Advanced Search változatlan: a Google keresésekkel a legjobb és csendben rögzíti vagy figyelmen kívül hagyja a hibákat. Rich Signellnek köszönhetően.
         
    * IMPROVED: Az Advanced Search oldal térképe most nagyobb (Még mindig meg kell szokni, de kevesebb) és jelentősen pontosabb (de még mindig nem tökéletes) ... John Maurernek köszönhetően.
         
    * IMPROVED: A "Draw földmaszk" beállítása a Make A Graph weboldalain és a &.land=... beállítása az URL-ekben, amelyek kérik a térképet, most két további lehetőséget nyújtanak:
"outline" csak vonzza a tájképet, politikai határokat, tavakat és folyókat.
"off" nem húz semmit.
Lásd:[&.land=... dokumentáció](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)...
John Maurernek köszönhetően.
         
    * IMPROVED: grafikonok és térképek, amelyeket létrehoztakERDDAP™most három új jelölőtípust használhat: Borderless Filled Square, Borderless Filled Circle, Borderless Filled Up Háromszög. A kód ehhez hozzájárult Marco Alba ETT / EMODnet fizika. Marco Albanak köszönhetően.
         
    * NEW:"files"rendszer most támogatja a sima File típusú válaszok (.csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsvvagy.xhtml...) pl.:[ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)...
Kyle Wilcoxnak köszönhetően.
         
    * IMPROVED: Az URL-ek akkor keletkeztek, amikor egy felhasználó egy adathozzáférési formát használ (.html) vagy Make-A-Graph (.gráf) weblap most megfelelően százalék-kód a karakterek\\[és\\]... Ez teszi az URL-eket egy kicsit nehezebbé az emberek számára, hogy olvassák, de jobb egy web-biztonsági szempontból. Az adminisztrátoroknak most lehetőségük van pihenniQueryChars= "..."\\[\\]|" a Tomcat szerverben.xml fájl (kevésbé biztonságos) vagy nem (biztonságosabb) ...
Antoine Quericnek, Dominic Fuller-Rowellnek és másoknak köszönhetően.
         
    * ÚJ: Ha egy EDDTable adatkészlet iránti kérelem tartalmazza és adva Variables Hol (_attribute Név, tulajdonság Value_) ,ERDDAP™hozzáadja az összes változót, amelyek _attribute Név = tulajdonság Value_ a kért változók listájára.
Lásd:[A Variables Hol dokumentáció](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere)... Köszönhetően Aurelie Briand, et al.
         
    * Összefüggő:ERDDAP™most elutasítja a byte hatótávolság iránti kérelmeket /files/.ncvagy.hdffájlok. Ne próbálja összekapcsolni a távoli.ncvagy.hdffájlok, mintha helyi fájlok lennének. Ez szörnyen nem hatékony, és gyakran okoz más problémákat. Ehelyett:
        * Használat(OPeN)DAPügyfélszoftver csatlakoztatásaERDDAPADAPszolgáltatások az adatkészlethez (amely rendelkezik / griddap/ vagytabledap/ az URL-ben) ... Ez az, amiDAPaz.
        * Használja az adatkészlet Adathozzáférési Formáját, hogy kérjen egy adatkészletet.
        * Ha szüksége van az egész fájlra vagy ismételt hozzáférésre hosszú ideig, használjacurl,wget, vagy böngészője letölteni az egész fájlt, majd hozzáférni az adatokat a fájl helyi másolatából.
             
    * IMPROVED: The .odv A Txt output opciót újraírták az új verzió támogatásáraODV .txtfájlok és a pályázati, időzítési és profiladatok megfelelő képviseletének támogatása.
         
    * IMPROVED: Most, keresési feltételek a kettős idézetek értelmezhető, mint egy json sztring, így lehet, hogy \\ kódolt karakterek. Többek között ez lehetővé teszi, hogy egy pontos egyezséget keressen egy attribútumhoz, például az „intézmény=NOAA\\n"Nem fog egy adatkészletet találni az intézményrelNOAA NMFS... Dan Nowackinak köszönhetően.
         
    * IMPROVED: További helyeken, lebegő pontszámok (különösen a duplákra átalakított úszók) most úgy tűnik, mint egy kissé kerekített változata a szám több helyen, pl. egy float korábban mutatott, mint egy kettős, mint 32.27998779296875, most úgy tűnik, mint 32.28. Kyle Wilcoxnak köszönhetően.
         
    * BUG FIX: a nem aláírt integrált audiofájlokat kissé helytelenül olvasták. Most helyesen olvasnak.
         
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * WARNING: Az első alkalom, amikor futszERDDAP™v2.10, a helyi adatfájlokon alapuló adatkészletek betöltése **nagyon** lassan, mertERDDAP™újra kell létrehoznia a fájlinformációk adatbázisát. A lassú kezdeti újratöltés után gyorsan betöltik, mint korábban. Kérjük, légy türelmes&#33;
         
    * AZ IGAZSÁGOK:
        * Amikor először futtatja a v2.10-t, néhány adatkészlet nem tölthet be, mertERDDAP™most szigorúbb bizonyos metaadatokról. Mint korábban,ERDDAP™E-mailt küld egy Daily jelentést, amikor először feltöltődik. Ez magában foglalja az egyes adatkészletek hibás üzeneteit, amelyek nem töltöttek be. Olvassa el a hibaüzeneteket, hogy kitalálja a problémákat. A legtöbb esetben csak egy kis változást kell hoznia az adatkészlet metaadatára a probléma megoldására.
             
        * Inkábbdatasets.xmlKeressen&lt;sourceNameGt;= (jegyezze meg'='jel, amely azonosít egy[fix értéksourceName](/docs/server-admin/datasets#fixed-value-sourcenames)) ... A legtöbbERDDAP™beállítások, ezek ritkák. Ha az értékek bármelyike után'='húrok (nem számok) Most már bezárja a sztringet a kettős idézetekbe. Például,
Előző:&lt;sourceNameGt;=KZ401&lt;/sourceName&gt; &gt; &gt; &gt;
utána:&lt;sourceNameGt;="KZ401"&lt;/sourceName&gt; &gt; &gt; &gt;
             
        * NEW: Van egy új opcionális beállítás a setup.xml-ben,&lt;defaultAccessibleViaFiles&gt;, amely meghatározza az alapértelmezettséget&lt;hozzáférhetőViaFiles&gt; minden adatkészlethez. Az új címke alapértelmezettje hamis, ami az előzőt jelentiERDDAP™viselkedés. Ezt az alacsonyabb szintű beállítást egy adott adatkészlet felülmúlhatja&lt;hozzáférhetőViaFiles&gt; beállítás.
            
JELENTÉS (mert vannak olyan felhasználók, akik ezt akarják) :
Ha minden EDD-t akarsz készíteni... FromFiles adatkészletek elérhetőek a fájlrendszeren keresztül, majd
            
            1. Adja hozzá ezt a címkét a setup.xml fájlhoz:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Opcionálisan) Távolítsa el az összes
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
bennedatasets.xmlmivel az alapértelmezés most igaz.
                 
        * Adjon hozzá \\_FillValue tulajdonságokat:
            ERDDAP™használt alapértelmezett \\_FillValue minden integrált változó esetében: az adattípus maximális értéke (pl. 127 byte változó) ... Most nem. Annak elkerülése érdekében, hogy ezek az értékek adatértékként jelenjenek meg (nem hiányzó értékek) , meg kell határozottan kijelenteni ezeket a \\_FillValue tulajdonságokkal. Mostantól kezdve minden alkalommal, amikor elkezdeszERDDAP™, küldi az adminisztrátor egy e-mailt egy .csv asztallal, amely egy listát tartalmaz az integrált forrás változókról, amelyeknek nincs \\_FillValue vagymissing\\_valueattribútumok és a javasolt új \\_FillValue tulajdonságok. Lásd[Add hozzá \\_Fill Érték tulajdonságok](/docs/server-admin/datasets#add-_fillvalue-attributes)További információk és utasítások.
             
        * Ha összeállítodERDDAP™, módosítania kell az osztálypata paramétert a javac parancssorokon, hogy hivatkozzon ezekre az új jarokra: lib/commons-jexl.jar;lib/aws-java-sdk.jar;lib/jackson-annotations.jar;lib/jackson-core.jar;lib/jackson-databind.jar; ...
             
    * KAPCSOLÓDÓ: Tomcat 9 most a Tomcat ajánlott verziójaERDDAP... A Tomcat 8.5+ legfrissebb verziója szintén jó. MegtisztítottunkERDDAPA[Tomcat telepítési utasítások](/docs/server-admin/deploy-install#tomcat)...
        
A legújabb verziójaJava8. 8. (nemJava9, 10, 11, ...) A[AdoptOpenJDK](https://adoptopenjdk.net/)továbbra is az ajánlott változataJavaMertERDDAP...Java8 Long Term Support az AdoptOpenJDK-tól, így biztonságosan használható, de ne feledje, hogy rendszeresen megkapja a legújabb verzióját biztonsági okokból.
        
    * ÚJ: Script SourceNames / Derived Variables in Tabular Datasets
Az EDDTableFromFiles, az EDDTableFromDatabase és az EDDTableFromFileNames adatkészletek most tartalmazhatnak kifejezéseket és szövegeketsourceName... Ez lehetővé teszi, hogy új változók alapján meglévő változók a forrásfájlok. Az adott új változó számítása az eredmények egy sorában történik, ismételten minden sorban. Például, hogy hosszúságú változó értékek a tartományban -180 - 180° változó értékek 0 - 360°:
        &lt;sourceNameGt;=Math2.anglePM180 (dalszöveg: row.columnDouble ("lon") ) &lt;/sourceName&gt; &gt; &gt; &gt;
Részletekért lásd[Script SourceNames](/docs/server-admin/datasets#script-sourcenamesderived-variables)  
Bob Simonsnak köszönhetően (ki tervezte ezt korábbanERDDAP™v1.0 és végül megtalálta a módját annak megvalósítására) Kevin O'Brien, Roland Schweitzer, John Maurer és az Apache JEXL könyvtár a nagyon nehéz rész elvégzésére (jól csinálni) ...
         
    * NEW: Unsigned Integer adattípusok (Ubyte, ushort, uint, ulong) most támogatottak. Vegye figyelembe, hogy sok fájltípus (pl.: .das, .dds,.nc3) Ne támogassa az összes ilyen új adattípust. Lásd:[Adatok Típusú dokumentáció](/docs/server-admin/datasets#data-types)részletek arról, hogyanERDDAP™foglalkozik ezekkel a különbségekkel. Nevezetesen, mivel(OPeN)DAP, nevezetesen a .dds válasz, nem támogatja aláírt bytees, longs vagy ulongs, lehet, hogy használni akarjaERDDAPA .das és a .das tabuláris reprezentációja, amint azt ahttp.../erddap/ **Info** ______datasetID_.html weboldal (például,[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) ) amelyet más fájltípusokban is kaphat, vagy.nccsvMetadata válasz (például,[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) ) mindkettő támogatja az összes adattípust minden helyzetben.
        
FIGYELMEZTETÉS: Az ilyen változás által érintett adatkészletek esetében lehetséges, hogy problémákat fog látni az adatkészlettel, mert az adatok, amelyekERDDAP™a forrásból származó olvasmányok eltérőek lehetnek (pl. a korábban aláírt integrátorként elolvasott változók immár lehetetlen integrátorként olvashatók) ... A felmerülő problémák magukban foglalják: az adatkészlethez nem hozzáadott új fájlokat, és/vagy hibákat, amikor megpróbálja elérni az adatokat. Ha egy adatkészletnek van problémája, az első dolog, amit megpróbálni, az az, hogy[Nehéz zászló](/docs/server-admin/additional-information#hard-flag)az adatkészlethez. Ha ez nem oldja meg a problémát, akkor meg kell nézni a logot. txt látni a hibaüzeneteket, belemerülnidatasets.xmlaz adatkészlet, és / vagy talán újraindítja a genetikaiDatasets.xml-t az adatkészlethez.
Hála a netcdf-java 5.x (amely kényszerítette a problémát) és a következő CF 1.9.
        
    * IMPROVED: Most van[jobb dokumentáció / tanácsadás](/docs/server-admin/datasets#s3-buckets)Hogyan lehet létrehozni egy adatkészletet az AWS S3 buckets fájlokból. Micah Wengrennek köszönhetően.
         
    * KAPCSOLÓDÓ: Számos változás van kapcsolatban a"files"rendszer.
        * A kód kezelni ezt újraírták, hogy használható több osztály.
             
        * NEW: A könyvtári listák felhasználói kérelmei most kérhetik, hogy a válasz az egyik standard egyszerű táblázattípus legyen a kívánt fájl kiterjesztésének módosításával: .csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsvvagy.xhtml). Például,
            [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)  
Köszönhetően Kyle Wilcox és Shane St Savage.
             
        * IMPROVED: Most, Generáció Adatkészletek Xml nem tartalmaz&lt;hozzáférhetőViaFiles&gt; címke a kimenetben. A feltételezés az, hogy az adatkészlet az új értékére támaszkodik.&lt;DefaultAccessibleViaFiles&gt; tag a setup.xml-ben. Lásd[hozzáférhető ViaFiles](/docs/server-admin/datasets#accessibleviafiles)...
             
        * IMPROVED: További adatkészlettípusok most a hozzáférhetőséget támogatják ViaFiles:EDDGridSideBySide,EDDGridAggregateExistingDimension,EDDGridFromErddap, EDDTableFromErddap,EDDGridFromEDDTable, EDDTableFromEDDGridésEDDGridFromEtopo. Ezek számára az adott távoli/gyermekes adatkészletből származó fájlok csak akkor érhetők el, ha mind a szülő, mind a távoli/gyermekes adatkészlet hozzáférhető ViaFiles igaznak indult (talán át&lt;defaultAccessibleViaFiles&gt;). Damian Smythnek és Rob Fullernek köszönhetően.
             
        * TO DO / RECOMMENDATION: Javasoljuk, hogy az összes releváns adatkészlet elérhető legyen a fájlrendszeren keresztül&lt;defaultAccessibleViaFiles&gt; az igazi beállítás.xml, mert van egy csoport felhasználó, akinek ez a preferált módja az adatok megszerzésének. Egyéb okok között,"files"rendszer megkönnyíti a felhasználók számára, hogy lássák, mely fájlok állnak rendelkezésre, és amikor utoljára megváltoztak, így megkönnyíti a felhasználó számára a teljes adatkészlet saját másolatának fenntartását. Ha általában nem akarja, hogy az adatkészletek hozzáférhetők legyenek a fájlrendszeren keresztül, állítsa be&lt;defaultAccessibleViaFiles&gt; hamisítványhoz. Mindkét esetben csak használja&lt;hozzáférhetőViaFiles&gt; azon kevés adatkészlet esetében, amelyek kivételt képeznek az általános politikának, amelyet&lt;DefaultAccessibleViaFiles&gt; (Például, ha az adatkészlet használata.ncml fájlok, amelyek nem igazán hasznosak a felhasználók számára) ...
             
    * IMPROVED: Most, ha egy forrás adatkészlet CF grid\\_mapping információval rendelkezik, generál Adatkészletek Xml a rácsos adatkészletekhez hozzáadja az információkat a globális&lt;addAtts&gt;, és az információkat a globális&lt;ForrásAtts&gt; minden alkalommal az adatok olvashatók a fájlból. Az információ megjelenik az adatkészlet globális tulajdonságaiban, mint egy sor tulajdonság az előtag grid\\_mapping\\_ .
         
    * IMPROVED: Csoportok támogatása az olvasás során.nc4 4 4 (bizonyos mértékig.hdf5) fájlok. Általában egyERDDAP™Az adatkészletet az egyik fájlcsoportban lévő változókból fogják építeni. Továbbá, GenerateDatasets Xml azEDDGridFromNcFiles ésEDDGridFromNcFiles Unpacked most egy "csoportot" kér (pl.: "" bármilyen / minden csoport számára, "valami csoport", "valamiGroup / SomeSubGroup" vagy "\\[gyökér\\]"Csak a gyökércsoportért) ... Charles Carletonnak és Jessica Hausmannak köszönhetően.
         
    * IMPROVED: GenerateDatasets Xml azEDDGridFromNcFiles ésEDDGridFromNcFiles Unpacked most támogat egy opcionális "DimensionsCSV" paramétert, amely lehetővé teszi, hogy megjelölje a forrás nevét a dimenziók, hogy azt szeretné, hogy ez az adatkészlet használni. Használja a "" változókat, amelyek a legtöbb dimenziót használják, mint korábban. Továbbá egy kapcsolódó kis hiba, amely az ilyen típusú fájlokkal történt, most rögzített. Sujal Manandharnak köszönhetően.
         
    * BUG FIX: GenerateDatasets Az Xml most megfelelően felsorolja az "EDDTableFromJsonlCSVFiles" -t (Nem "EDDTableFromJsonlCSV") mint az egyik EDDType opció. Andy Zieglernek köszönhetően.
         
    * IMPROVED:EDDGridFromNcFiles A nem csomagolt ma szabványosítja az "egységek" tulajdonságait a szabványos / "kanonikus" udunitákhoz (ugyanaz a módszer, mint az Units átalakító) ... Például,"meter per second","meters/second","m.s^-1"és"m s-1"Minden lesz"m s-1"... Andy Zieglernek köszönhetően.
        
WARNING: Lehetséges, hogy ez problémákat okoz néhány meglévő adatkészlet számára (pl. új fájlokat kell megjelölni "rossz") ... Ha igen,[Nehéz zászló](/docs/server-admin/additional-information#hard-flag)az adatkészlet számára, hogy az összes forrásfájl újraolvassa az új rendszert.
        
    * IMPROVED: Most egy változó&lt;sourceName&gt; meghatározhatja az =NaN és a változó értékétactual\\_rangetulajdonság, amely meghatározza a véges tartományt. Ez néha hasznos, hogy egy adatkészlet (nevezetesen EDDTableFromFileNames adatkészlet) lehet dummy változó (s)   (pl.: magasság, hosszúság, idő) rögzített értékekkel a NaN, de érvényesactual\\_range  (a tulajdonság szerint) ... Ezután az Advanced Search-ban egy felhasználó olyan adatkészleteket kereshet, amelyek egy adott magasságban, hosszúságban, időtartományban vannak, és ez az adatkészlet képes lesz azt mondani, hogy releváns adatokkal rendelkezik (Bár az összes tényleges adatsor megmutatja NaN) ... Lásd:[rögzített értékdokumentáció](/docs/server-admin/datasets#fixed-value-sourcenames)...
Mathew Biddle-nek köszönhetően.
         
    * NEW: Most,datasets.xmlcunk egy EDDTableFromAsciiFiles vagy EDDTableFromColumnarAsciiFiles adatkészlet tartalmazhat egy címkét, amely azt mondjaERDDAP™figyelmen kívül hagyni az összes sort a fájl tetején, és beleértve azt a vonalat, amely megfelel a meghatározott rendszeres kifejezésnek. Például,
        &lt;skipHeaderToRegex&gt; \\*↑\\*↑\\*HEADER END&#33;\\*&lt;/skipHeaderToRegex&gt;
figyelmen kívül hagyja az összes sort, és magában foglalja azt a vonalat, amely a "\\*\\** END OF HEADER. Lásd:&lt;skipHeaderToRegex&gt; dokumentáció (/docs/server-admin/datasets#skipheadertoregex) ...
Eli Hunternek köszönhetően
         
    * NEW: Most,datasets.xmlcunk egy EDDTableFromAsciiFiles vagy EDDTableFromColumnarAsciiFilesdataset tartalmazhat egy címkét, amely azt mondjaERDDAP™figyelmen kívül hagyni az összes sort a fájlban, amely megfelel a meghatározott rendszeres kifejezésnek. Például,
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

kihagyja az összes sort, amely a "#"-vel kezdődik. Lásd:&lt;skipLinesRegex&gt; dokumentáció (/docs/server-admin/datasets#skiplinesregex) ...
Eli Hunternek köszönhetően.
         
    * ÚJ: Adatasets.xmlcunk bármely EDDTable adatkészlethez most tartalmazhat &add Variables Hol (_attributeNamesCSV_) ... Ha igen,ERDDAP™hozzáad egy widgetet az egyes meghatározott tulajdonságokhoz Az adatkészlet adathozzáférési formájának nevei (.html weboldal) hogy megkönnyítse a felhasználók számára, hogy hozzáadják &add Variables Hol (_attribute Név, tulajdonság Value_) kérésre.
Lásd:[A Variables Hol dokumentáció](/docs/server-admin/datasets#addvariableswhere)...
Köszönhetően Aurelie Briand, et al.
         
    * Új Harmadik fél eszköz:ERDDAP-lint
        ERDDAP-lint egy program Rob Fuller és Adam Leadbetter az ír tengerészeti intézet, hogy lehet használni, hogy javítsa a metaadat aERDDAP™adatkészletek.ERDDAP-lint "megtartja a szabályokat és egy egyszerű statikus webes alkalmazást néhány ellenőrző teszt futtatásáhozERDDAP™szerver. Minden teszt fut a webböngészőben.” Mint a[Unix/Linux lint eszköz](https://en.wikipedia.org/wiki/Lint_(software)) szerkesztheti a meglévő szabályokat, vagy új szabályokat adhat hozzá. Lásd[ERDDAP-lint](https://github.com/IrishMarineInstitute/erddap-lint)További információkért.
        
Ez az eszköz különösen hasznos az olyan adatkészletek számára, amelyeket néhány évvel ezelőtt hoztál létre, és most naprakészen akarod hozni a jelenlegi metaadat preferenciáiddal. Például a GenerateDatasets korai verziói Az Xml nem tett erőfeszítést a globális megteremtés érdekébencreator\\_name,creator\\_email, alkotó\\_type, vagycreator\\_urlMetaadata. HasználhatjaERDDAP-lint azonosítani azokat az adatkészleteket, amelyek hiányoznak ezek a metaadatok tulajdonságai.
        
Robnak és Ádámnak köszönhetően, hogy létrehozza ezt az eszközt, és elérhetővé tegye aztERDDAP™közösség.
        
    * NEW: Most rendben van, ha néhány fájl egyEDDGridFromFiles adatkészlet nem rendelkezik az összes adatkészlet változójával. A fájlokat úgy fogják bevonni, mintha a változók voltak (minden hiányzó értékkel) ...
Dale Robinsonnak és Doug Latornellnek köszönhetően.
         
    * ÚJ: Új használati statisztikák vannak a logfájlban és a Daily jelentésben, hogy segítsenek az adminisztrátoroknak azonosítani azokat a felhasználókat, akik memóriaproblémákat okoznak. A statisztikákat „OutOfMemory”-nak nevezik. (Array méret) "OutOfMemory (Túl nagy) és „OutOfMemory (Út túl nagy) "..." Megmutatják a felhasználók IP-címeit, akik kérelmeket tettek e kategóriákban és az általuk készített kérések számát. Ha nem voltak gondos kérések, ezek a statisztikák nem jelennek meg. "OutOfMemory (Array méret) és "OutOfMemory" (Út túl nagy) A kérések általában nem jelentenek problémát, mert a kérések olyan nagyok voltak, hogyERDDAP™gyorsan elkapta őket, és hibaüzenetet küldött. "OutOfMemory (Túl nagy) "A kérések veszélyesebbek, mertERDDAP™erőfeszítést tett, mielőtt rájött volna, hogy jelenleg nem volt elegendő memória a kérelem kezeléséhez. (bár a probléma lehet más kérelmek, mielőtt ezek a kérések) ...
        
Vannak olyan új statisztikák is, amelyeket "Nagy Kérés, IP cím" neveznek, amelyek megmutatják a felhasználók IP-címeit, akik nagy kéréseket tettek (jelenleg, hülye.ncfájlok &gt; 1GB) ...
        
Továbbá, az idő sorozat asztal a status.html oldalon most tartalmaz egy "memFail" oszlopot, amely megmutatja a "OutOfMemory"-val kudarcot vallott kérések számát (Túl nagy) "Az utolsó nagy Load Datasets óta elkövetett hibák. Minden 0-nál más szám legalább valamilyen aggodalomra ad okot.
Bob Simonsnak köszönhetően.
        
    * NEW: Az új verzióHyraxa könyvtári listákat másképp jeleníti meg, mint korábban.ERDDAP™most olvassa el a régi és új könyvtári listákat.
         
    * NEW: Adatkészlet-visszatöltések és felhasználói válaszok, amelyek &gt;10 másodperccel befejeződnek (sikeresen vagy sikertelenül) "jellemzik" (&gt; 10-es évek&#33;) "..." Így megkeresheti a log.txt fájlt ehhez a kifejezéshez, hogy megtalálja azokat az adatkészleteket, amelyek lassúak voltak újratöltésre, vagy a kérelmek számát, amelyek lassan befejeződtek. Ezután magasabbra tekinthet a log.txt fájlban, hogy megnézze, mi volt az adatkészlet probléma, vagy mi volt a felhasználói kérelem, és kitől származott. Ezek a lassú adatkészletek és felhasználói kérések néha adóztatnakERDDAP... Tehát többet tudni ezekről a kérésekről, segíthet azonosítani és megoldani a problémákat.
    * IMPROVED: A CF DSG adatkészlet érvényesítésekor,ERDDAP™most biztosítja, hogy a cf\\_role tulajdonságokkal rendelkező változók a megfelelő cdm\\_...\\_variables listában vannak, és nem szerepelnek más cdm\\_...\\_variables listákban. Például, ha egy időzítettProfil adatkészletnek van egy "station\\_id" változója, amely rendelkezik a cf\\_role=timeseries\\_id tulajdonságával, akkor a "station\\_id"-nek a cf\\_variables listában kell lennie, de nem szabad a cf\\_profil\\_variables listában szerepelnie.
Micah Wengrennek köszönhetően.
         
    * IMPROVED: "Simplify" most gyorsabb, kevesebb memóriát használ, és visszatérhet a LongArray-hoz. KöszönömUnidata...
         
    * IMPROVED: a gyorsRestart jelentősen gyorsabb az EDDTableF-hez (nc-vel kapcsolatos) Fiók (kivéve az EDDTableFromNcCFFiles és az EDDTableFromInvalidCRAFiles) Mert Várható (egy másik hely) Most olvassa el a minta fájl metaadatát ahelyett, hogy elolvassa az összes adatot. Jessica Austinnak köszönhetően.
         
    * IMPROVED: Most már támogatjuk az időcsíkokat a precizitásnál nagyobb, mint a to-the-millisecond, ha a további számjegyek mind a 0, pl.: „2020-05-22T01:02:03.456000Z”. Yibo Jiangnak köszönhetően.
         
    * IMPROVED: GenerateDatasetsXml EDD.suggestDestinationName használt eltávolítani "(" és minden után. Most eltávolítja (...)\\*csak akkor, ha ez a végesourceName... Most is eltávolítja\\[...\\*\\]csak akkor, ha ez a végesourceName... Julien Paulnak köszönhetően.
         
    * IMPROVED: GenerateDatasets Az Xml most teszi a változótdestinationNameegyedi hozzáadott \\_2, \\_3, ... szükség szerint. Julien Paulnak köszönhetően.
         
    * IMPROVED: Amikor a Calendar2.parseDateTime dd, hh vagy HH, az első „digit” lehet most egy hely.
    * KNOWN PROBLEM: KezdőlapERDDAP™2.10,.ncml fájlok, amelyek megpróbálják megváltoztatni a tulajdonságot, ne változtassa meg a tulajdonságot. Ez egy ismert hiba a netcdf-java-ban, amit bejelentem, és azt mondják, a netcdf-java következő kiadásában lesz rögzítve.
         
    * BROKEN LINKS FIX: Megfelelő rendszert készítettem a törött linkek teszteléséreERDDAP™weboldalak, így most nagyon kevés törött linknek kell lennie (legalábbis minden kibocsátási időpontban - új törött linkek keletkeznek gyakran) ...
         
    * BUG FIX: Az EDDTableFromHttpGet bizonyos típusú kérésekkel kudarcot vallott. Most nem. Emma a BODC-nél.
         
    * BUG FIX: Néhány kérés kezeléséhez az EDDTable ideiglenes fájlt készített minden kért változóhoz, a változó nevében végző fájlnévvel. Ha a változó neve is egyfajta tömörítés volt (pl.: .Z) ,ERDDAPPróbálja ki (és kudarc) az ideiglenes fájl dekompresszálására. Most az ideiglenes fájlnév véget ér az ".temp"-ben. Mathew Biddle-nek köszönhetően.
         
    * BUG FIX: GenerateDatasetsXml és Calendar2.convertToJavaDateTim Format most sokkal kevésbé valószínű, hogy egy helytelen változás, amikor megpróbálja megjavítani egy esetleg érvénytelen dátumidő formátumot. Figyelemre méltó, hogy egyetlen auto-szuggesztált dátum sem módosítható. Mathew Biddle-nek köszönhetően.
         
    * BUG FIX: Ha hiba volt, miközben távoli URL-től kaptunk tartalmat, és ha a hibaStream tartalmat tömörítik,ERDDAP™most megfelelően lenyomja a hibaüzenetet. Bob Simonsnak köszönhetően.
         
    * BUG FIX:&lt;SubscribeToRemoteErddapDataset&gt; nem alkalmazták, amikor az EDD... FromErddap adatkészlet gyermek adatkészlet volt. Most van. Chris Romsosnak köszönhetően.
         
    * BUG FIX: GenerateDatasets Az Xml már nem úgy gondolja, hogy a "latinnal" kezdődő forrás változó név szélességű lehet. Köszönhetően Vincent Luzzo.
         
    * BUG FIX: Most egy OutOfMemoryError, miközben egy adatfájlot olvas, miközben a felhasználó kérése feldolgozása nem ok arra, hogy fájlt adjon a BadFiles listához. Bob Simonsnak köszönhetően.
         

## Verzió 2.02{#version-202} 
 (megjelent 2019-08-21) 

*    **Új funkciók és változások (felhasználók számára) :** 
    * ÚJ: Jelenleg két módja van az adatkészletek keresésének többszörösenERDDAPS. Egy kicsit másképp dolgoznak, és különböző interfészekkel és opciókkal rendelkeznek.
        
        *   [SearchMultipleERDDAPs.html](/SearchMultipleERDDAPs.html)Bob Simons/NOAA NMFS SWFSC ERD...
        *   [ http://erddap.com ](http://erddap.com)Rob Fuller / The Marine Institute of Ireland.
        
Tylar Murraynak köszönhetően az eredeti kérésre.
         
    * IMPROVED: kérés a"files"rendszer letölteni egy fájlt, amely valójában egy távoli webhelyen van (pl.: AWS S3) most egy átirányításhoz vezet, így a felhasználó ténylegesen letölti az adatokat a forrásból, ahelyett, hogy használnáERDDAP™közvetítőként. Andy Zieglernek ésNOAA...
         
    * NEW: Az új AWS S3-hoz kapcsolódó funkciók példájaként, és megkönnyíti bárki számára, hogy böngészjen és letöltse a fájlokat a nyilvános AWS S3-ból, létrehoztunk
        [110 minta adatkészlet](https://registry.opendata.aws/)ez lehetővé teszi bárki számára, hogy szinte az összes tartalmát böngészje
        [AWS S3 Open Data buckets](https://registry.opendata.aws/)... Ha rákattintasz a"files"link bármely ilyen minta adatkészlethez, böngészheti a könyvtárfát és fájlokat ebben az S3-ban. Mivel ezek az adatkészletek működnek, ezek a könyvtárak mindig tökéletesen naprakészek, mertERDDAP™a repülésen kapja meg őket. Ha rákattint a könyvtárfára egy tényleges fájlnévre, és kattintson a fájlnévre,ERDDAP™átirányítja kérését az AWS S3-ra, hogy közvetlenül letölthesse a fájlt az AWS-től.ERDDAP™adminisztrátorok képesek
        [Olvassa el az utasításokat, hogyan kell ezt megtenni más S3 bucketekhez](/docs/server-admin/datasets#working-with-aws-s3-files)... Andy Zieglernek ésNOAA...
         
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * MINDEN MINDEN MINDEN: senki sem
         
    * IMPROVED:ERDDAP"Strings sorozatok tárolásának módja (StringArray) most sokkal inkább memóriahatékony. Hírek Array-ket használnak egészbenERDDAP™, nevezetesen a mesés ASCII adatfájlok olvasásakor. Továbbá más változások teszik lehetővé a CSV / TSV / SSV ASCII, oszlop ASCII, és a jsonlCSV tabuláris adatfájlok gyorsabb és sokkal több memória hatékony. Az eredmény: 764 MB ASCII adattesztfájl esetében (de tömörített egy 52MB.gzfájl) 3,503,266 sorral és 33 oszloptal a maximális memóriahasználat 10 GB-ról 0,6 GB-ra csökkent. (a csúcson) ... Az olvasás ideje ~7 perc (de nagyban változik azzal, hogy mennyi fizikai memória van a számítógépen) 36 másodpercig (beleértve a 10-et az egyszerűsítéshez () amelyet csak a GenerateDatasets használ Xml) ... Sok más helyenERDDAP™hasznot húz ez a megnövekedett memóriahatékonyság. Tylar Murray és Mathew Biddle.
        
Egy másik megoldást vizsgáltam (strings in StringArray mint UTF-8 kódolt byte sorozatok) ... Ez csökkenti a memória használatát egy másik ~ 33%, de a költségek ~ 33% lelassul. Összehasonlítva a rendszert, amelyet most használnak, úgy tűnt, mint egy rossz kereskedelem. Könnyebb egy számítógép több memóriát adni (vásároljon több memóriát ~$200) mint gyorsabbá tenni (Vásároljon egy teljesen új számítógépet) ...
        
Ha kényelmes, még mindig jó ötlet, hogy megosztani hatalmas tabuláris adatfájlok több kisebb fájl alapján bizonyos kritériumok, mint példáulstationIDés/vagy idő.ERDDAP™Gyakran csak egy kis fájlt kell megnyitnia a felhasználó kérésére válaszul, és így sokkal gyorsabban reagálhat.
        
    * IMPROVED: Most van[ERDDAP™AWS S3 dokumentáció](/docs/server-admin/datasets#working-with-aws-s3-files), amely leírja, hogyan kell kapniERDDAP™adatfájlokkal való munka az AWS S3 bucketsben.
SzinténERDDAP™most új funkciókat használ az AWS S3-banJavaAPI.
SzinténERDDAP™most lehetővé teszi az AWS S3 URL-ek számára, hogy további karaktereket tartalmazzanak (periódus, hyphen, alscore) bucket nevekben.
SzinténERDDAP™most előírja, hogy az AWS S3 bucket URL-eket konkrét módon kell azonosítani:
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
ahol az előtag opcionális.
Andy Zieglernek ésNOAA...
         
    * IMPROVED: GenerateDatasets Az Xml most további közösmissing\\_values stand-ins, mint hiányzó értékek, és így nagyobb valószínűséggel konvertál egy oszlopot egy numerikus adattípusra. Továbbá, PrimitiveArray.simplify () most olyan naplók, amelyek bizonyos adatérték okozta, hogy egy adott oszlopot kezeljenek a sztringek oszlopaként. Mathew Biddle-nek köszönhetően.
         
    * IMPROVED:&lt;A kérelemBlacklist&gt; most támogatja.\\*...\\*  (vagy:\\*:\\*IPv6) az IP-címek végén, hogy az IP-címek nagyobb részeit feketelistázhassa, például 110.52.\\*...\\*  (Kína Unicom Tianjin) ... Lásd a dokumentációt [&lt;kérésBlacklist&gt; (/docs/server-admin/datasets#requestblacklist) A China Unicomnak és a China Telecomnak köszönhetően.
         
    * IMPROVED: Ha egy adatkészlet forrása nem határozza meg a"institution"tulajdonság, GenerateDatasets Xml és loadDataset most kapja meg a "teremtő\\_institution" tulajdonságból (ha rendelkezésre áll) ... Micah Wengrennek köszönhetően.
         
    * BUG FIX: szabványosítás Amit nem mindig alkalmaztak az ASCII adatfájlokra.
Továbbá az EDDTable nem kezelte megfelelően az időértékek korlátozásait, amikor a forrásnak erősítette az időértékeket és szabványosította Mit használtak.
Paloma de la Vallee-nek köszönhetően.
        
Nem írtam egyértelműen: csak szabványosítani kell Milyen jellemzők, ha valóban szüksége van rájuk (pl. amikor a különböző forrásfájlok különböző módon tárolják az időértékeket) , mert egyes adatokra vonatkozó kérések, amelyek szabványosítással rendelkeznek Mi fog feldolgozni egy kicsit lassabb.
        
    * BUG FIX: Bug a kódban használtEDDGridFromNcFiles okozta, hogy kudarcot vall.nc4 és.hdf5 fájl, amely "hosszú" (Int64) változók. Ez most rögzített. Friedemann Wobusnak köszönhetően.
         
    * BUG FIX: Kis változások az ISO 19115 fájlok, hogy egy másik érvényesítő boldog. Chris MacDermaidnak és Anna Milannak köszönhetően.
         

## Verzió 2.01{#version-201} 
 (megjelent 2019-07-02) 

*    **Új funkciók és változások (felhasználók számára) :** 
    * Senki sem.
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * BUG FIX: Egy hiba a kódban, amely létrehozza az adathozzáférési formanyomtatványttabledapAz adatkészletek azt okozták, hogy a weboldal bizonyos adatkészletek számára üres legyen. Emellett javítottam a váratlan hibák kezelését az összes HTML-oldalon, így ők lesznek (általában) hibaüzenet megjelenítése. Marco Albanak köszönhetően.
    * IMPROVED: GenerateDatasets Az Xml már nem nyomtat hosszú figyelmeztetést a kimenet tetején. Ehelyett, kérlek, lásd[Editing Generáció Adatkészletek Xml kimenet](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better)... Steven Baumnak köszönhetően.
    * IMPROVED: GenerateDatasets Az Xml most kissé eltérő ajánlásokat tesz különböző helyzetekben&lt;frissítésEveryNMillis&gt; az EDD ... From... Files adatkészletek. Továbbá, GenerateDatasets Az Xml most elriasztja az eredeti "kivonat" rendszert az EDDTableFromFiles adatkészletekhez.

## Verzió 2.00{#version-200} 
 (2019-06-26) 

*    **ERDDAP™A v2.00 végre itt van&#33; Igen&#33;**   
     
    * Elnézést kérünk a hosszú késéshez, ami szükséges ahhoz, hogy befejezzük ezt a verziót.
Köszönöm a türelmeteket.
         
    * A jó hír az, hogy az extra időt arra használták, hogy több olyan funkciót adjon hozzá, amelyet a felhasználók kértek. A rossz hír az, hogy még a késéssel is, nem minden kért funkciót adtak hozzá. Sajnáljuk, de fontosabbnak tűnik, hogy kiszabaduljunk, mint késleltetni több (örökké?) folyamatosan új funkciók hozzáadása. Azt ígérjük, hogy visszatérünk a jövőben gyakoribb kiadásokhoz.
         
    * Version 2?&#33; Vannak-e nagy változások és összeegyeztethetetlenségek?”
Nagyszerű új funkciók? Igen.
Nagy kompatibilitások vagy változások az adminisztrátorok vagy a felhasználók számára? Nem.
V1.82-től v2.00-ig ugrottunk:
        * részben ünnepelni 10 évet (most 11) Az első nyilvános kiadás ótaERDDAP™  (v1.00 2008-05-06, amely kiemelkedően úgy nézett ki, mint a v2.00) ... Ebben az időben,ERDDAP™az egyik létesítményből majdnem 100 létesítménybe került legalább 12 országban (Ausztrália, Belgium, Kanada, Franciaország, India, Írország, Olaszország, Dél-Afrika, Spanyolország, Thaiföld, Egyesült Királyság, USA) ...
        * részben, hogy egy nagy kiegészítés egy teljesen új irányba:ERDDAP™most van egy adatgyűjtő rendszer, hogy menjen a meglévő adatkiszolgáló szolgáltatásokkal (lásd:[EDDTableFromHttpGet](#eddtablefromhttpget)) ,
        * részben azért, mert nem volt nagy ugrás az 1,82-től 2,00-ig, így ez úgy tűnt, mint a megfelelő idő.
             
    * A másik jó hír az, hogy most két másik csoport is hozzájárul a kódhozERDDAP™  (ebben a verzióban és jelzésekkel folytatják) Rob Fuller és Adam Leadbetter of Ireland's Marine Institute, és Roland Schweitzer of PMEL és Weathertop Consulting. Köszönöm nagyon. Igaz, hogy a saját választásuk projektjén dolgoznak, de ez a klasszikus nyílt forráskódú fejlesztési modell - csoportok hozzájárulnak a kódexhez olyan funkciókhoz, amelyeket a legtöbben szeretnék látni. A hozzáadott előny a közreműködők számára: az új funkciókat amint befejezik; nem kell várniuk a következő kiadástERDDAP... A csoport örömmel járul hozzá, szintén&#33; Lásd:[ERDDAP™Programozó útmutató](/docs/contributing/programmer-guide)...
         
    * Reméljük, tetszikERDDAP™V2.00. Várjuk a következő 10 évreERDDAP™Fejlesztés és egyre több használat világszerte.
         
*    **Új funkciók és változások (felhasználók számára) :**   
     
    * NEW:orderByMeanSzűrő
MerttabledapAz adatkészletek kiszámítják a megadott csoportok eszközeit. Szintén az összesorderByopciók most támogatják a csoportok meghatározásának további módját: _numericVariable\\[/number\\[IdőEgységek\\]\\[Offset\\]\\]_, pl. idő/1day vagy mélység/10:5. Például,stationIDIdő,waterTemp &orderByMean ("..."stationID,time/1day") rendezné az eredményeketstationIDés az idő, majd kiszámítja és visszaadja a vizetTemp minden egyesstationIDminden nap. Ezek rendkívül hasznos és erős új funkciók. Az új kódex ezekre a funkciókra és a régi kód változásaira Rob Fuller és Adam Leadbetter of Ireland's Marine Institute és Git által benyújtott. Köszönöm, Rob és Adam&#33;
         
    * NEW: kimeneti fájltípus a tabuláris adatkészletekhez:[.data táblázat](https://developers.google.com/chart/interactive/docs/reference#dataparam),
JSON fájl formázva használatra aGoogle Visualizationügyfél könyvtár (Google Charts) ... Ennek a kódexet Roland Schweitzer és Git segítségével nyújtotta be. Köszönöm, Roland&#33;
         
    * NEW: kimeneti fájltípus a tabuláris adatkészletekhez:[.jsonlCSV1](https://jsonlines.org/examples/),
olyan, mint a létező.jsonlCSVopció, de oszlop nevekkel az első sorban. Eugene Burgernek köszönhetően.
         
    * NEW: Ha az adminisztrátor lehetővé teszi, a felhasználók most bejelentkezhetnek a sajátjukkal[ORCID](https://orcid.org)Számla.
Ez egy OAuth 2.0 hitelesítési rendszer, mint a Google hitelesítés. Az ORCID-t széles körben használják a kutatók, hogy egyedileg azonosítsák magukat. Az ORCID-fiókok ingyenesek, és nem rendelkeznek a Google-fiókok adatvédelmi kérdéseivel. LásdERDDAPA[Orcid hitelesítési utasítások](/docs/server-admin/additional-information#orcid)... A BCO-DMO-nak köszönhetően (Adam Shepard, Danie Kinkade stb.) ...
         
    * ÚJ: Egy új URL átalakító átalakítja a naprakész URL-eket naprakész URL-ekké.
Lásd: .../erddap/convert/urls.html bármelyik oldalonERDDAP™telepítés, pl.
        [ez a kapcsolat a konverterrel aERD ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html)... Ez hasznos lehet az adatkezelők számára. Ezt belsőleg a GenerateDatasetsXml is használja. Bob Simonsnak és Sharon Mesicknek köszönhetően.
         
    * IMPROVED: A[Idő átalakító](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)most van lehetőség arra, hogy bármilyen közös sztringidőt egy ISO8601 sztringidőbe alakítsunk, vagy átalakítsunk egyUDUNITS- mint az időegységek egy megfelelőUDUNITSidőegységek sztring. Ez is hasznos lehetERDDAP™adminisztrátorok, akiknek tudniuk kell, hogy milyen formátumot kell meghatározni a szigorú időváltozatok "egységek" tulajdonságára. Ezt belsőleg a GenerateDatasetsXml és az EDDTableFromFiles szabványosítása is használja. Bob Simonsnak köszönhetően.
         
    * ÚJ: A[Units Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)új "Standardize UDUnits" opcióval rendelkezik.
Például a "deg\\_C/m" és a "degrees\\_C méter-1" mind átalakulnak
"degree\\_C m-1". Ezt a funkciót az EDDTableFromFiles szabványosítása is használja. Bob Simonsnak köszönhetően.
         
    * ÚJ: grafikonokhoz (más, mint a felületi grafikonok) a griddap éstabledap"S Make A Graph weboldalak, amikor az x tengely nem idő tengely, ha csak az x tengelyváltozékony tartomány aljzata látható, most a grafikon felett van gombok az X Axis balra vagy jobbra váltásához. Carrie Wall Bell / Hydrophone projektnek köszönhetően.
         
    * ÚJ: A grafikonok esetében az X és/vagy Y tengelyek most használhatják a Log skáláját.
A felhasználók ellenőrizhetik az Y Axis Scale-t egy új ledobási widgeten keresztül a griddap-on éstabledapKészítsen egy Graph weboldalakat. Lásd:[.xRange és yRange dokumentáció](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange)... Carrie Wall Bell / Hydrophone projektnek köszönhetően.
         
    * IMPROVED:ERDDAP™most jobban használja a különböző HTTP hibakódokat, és most visszatér(OPeN)DAPv2.0-formatizált hibaüzenet fizetett. Lásd[a részletek](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors)... Antoine Queric és Aurelie Briandnak köszönhetően.
         
    * IMPROVED: Ne használja a Netcdf-java / c vagy más szoftvereszközöket a csatlakozáshoz.ncvagy.hdffájlok által szolgáltatottERDDAP's /files / rendszer, mintha helyi fájlok lennének.ERDDAP™most elutasítja ezeket a kéréseket. Ez szörnyen nem hatékony, és gyakran okoz más problémákat. Ehelyett:
        
        * Használat(OPeN)DAPügyfélszoftver csatlakoztatásaERDDAPADAPszolgáltatások az adatkészlethez (amely rendelkezik / griddap/ vagytabledap/ az URL-ben) ... Ez az, amiDAPEz azért van, és ezt jól teszi.
        * Vagy használja az adatkészlet Adathozzáférési Formáját, hogy kérjen egy adatkészletet.
        * Vagy ha szüksége van az egész fájlra vagy ismételt hozzáférésre hosszú ideig, használjacurl,wget, vagy böngészője letölteni az egész fájlt, majd hozzáférni az adatokat a fájl helyi másolatából.
        
          
         
    * IMPROVED: AERDDAP™Homepage, Full Text Search most a "View a List of All Datasets" felett van, mivel ez a legjobb kiindulópont a legtöbb felhasználó számára. Didier Mallarino és Maurice Libes.
         
    * IMPROVED: On DataProviderForm3.html vannak most leállított listák a közösstandard\\_nameS. Köszönjük valakinek az IOOS DMAC találkozóján.
         
    * IMPROVED: A /files/weboldalakon most kapcsolódik az új "Mit tehetek ezekhez a fájlokhoz?" szakasza a /files/ dokumentáció. Ez a rész leírja a különböző fájltípusokat, és javaslatokat ad arra vonatkozóan, hogyan kell velük dolgozni. Maurice Libesnek köszönhetően.
         
    * IMPROVED: Szinte minden kérésERDDAP™legalább egy kicsit gyorsabb, és néha sokkal gyorsabb.
         
    * BUG FIX: Bizonyos körülmények között, amikor az EDDTable adatkészlet bizonyos típusú adatokkal mentette meg az adatokat.ncfájlokat, a globális "id" tulajdonságot a fájl javasolt neve, amely magában foglalja a hash, hogy egyedivé tegye ezt a kérést. Most az "id" megfelelően változatlan marad (ha meghatározott) vagy az adatkészlethezdatasetID  (ha nem meghatározott) ... John Maurernek köszönhetően.
         
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:**   
     
    * TO DO: Ez a kiadás egy kis időt vesz igénybe, és munkálkodik tőled. Kérjük, légy türelmes és tervezzen néhány órát a szükséges változtatások megtételére, és néhány órát az új funkciók kísérletére.
         
    * TO DO: A biztonság érdekében készítsen biztonsági másolatot a jelenlegi setup.xml ésdatasets.xmlfájlokat, hogy visszaállíthassa őket a valószínűtlen esetben, ahol vissza kell térnieERDDAP™v1.82.
         
    * TO DO: Az ajánlottJavaAz AdoptOpenJDK OpenJDK 8. 8. (LTS) + HotSpot.
Ez egy nyílt forráskódú változataJavanincs korlátozása annak használatára (EllentétbenOracleAJavaelosztás) ... Ez származikOracleAJavafolyamatban lévő módon,OracleÁldás. Biztonsági okokból fontos megtartani a teJavaverzió up-to-date. LásdERDDAPA[Javatelepítési utasítások](/docs/server-admin/deploy-install#java)...
         
    * AdoptOpenJDKJavakis kiegészítést igényel a Tomcat telepítéséhez: lásd[Resources Cache utasítások](/docs/server-admin/deploy-install#contentxml)... Azt hiszem, ez egy csere a -XX:MaxPermSize beállításhoz, amely (Adopt) Az OpenJDK már nem támogatja.
         
    * TO DO: Az új alapértelmezettség és ajánlás&lt;betűFamily&gt; beállítás a setup.xml-ben
DejaVu Sans, amely az AdoptOpenJDKJava... Lásd:
        [felülvizsgált betűtípus telepítési utasítások](/docs/server-admin/deploy-install#fonts)...
         
    * TO DO: Sok címke mozog a setup.xml-tőldatasets.xml... Az előny az, hogy megváltoztathatja értékeiket, miközbenERDDAP™fut, újraindítás nélkülERDDAP... Figyelemre méltó, hogy könnyen változhat&lt;Kezdőlap &gt;BodyHtml5&gt; ideiglenes üzenet megjelenítéséreERDDAP™weboldal (pl.: "Keresse ki az új JPL MUR SST v4.1 adatkészletet..." vagy "EzERDDAP™offline lesz 2019-05-08T17:00:00 PDT 2019-05-08T20:00 PDT.) ... Ha/ha megváltoztatod ezeket a címkéketdatasets.xmlA változások a következő alkalommal lépnek hatálybaERDDAP™olvasódatasets.xml...
         
        
        1. Másolja ezt a tartalmat az Önébedatasets.xmlfájl (bárhol a fájl kezdete közelében, miután&lt;erddapDatasets&gt;):
```
            <!-- The tags below are described in setupDatasetsXml.html.
                 The defaults listed below are as of ERDDAP™ v2.00. -->
            <cacheMinutes></cacheMinutes>                                     <!-- default=60 --> 
            <decompressedCacheMaxGB></decompressedCacheMaxGB>                 <!-- default=10 --> 
            <decompressedCacheMaxMinutesOld></decompressedCacheMaxMinutesOld> <!-- default=15 --> 
            <drawLandMask></drawLandMask>                                     <!-- "over" or "under" (default) -->
            <graphBackgroundColor></graphBackgroundColor>                     <!-- 0xAARRGGBB, default is 0xffccccff -->
            <loadDatasetsMinMinutes></loadDatasetsMinMinutes>                 <!-- usually=default=15 -->
            <loadDatasetsMaxMinutes></loadDatasetsMaxMinutes>                 <!-- default=60 -->
            <logLevel></logLevel> <!-- "warning" (fewest messages), "info" (default), or "all" (most messages) -->
            <nGridThreads></nGridThreads>                                     <!-- default=1 -->
            <nTableThreads></nTableThreads>                                   <!-- default=1 -->
            <partialRequestMaxBytes></partialRequestMaxBytes>                 <!-- default=490000000 -->
            <partialRequestMaxCells></partialRequestMaxCells>                 <!-- default=10000000 -->
            <slowDownTroubleMillis></slowDownTroubleMillis>                   <!-- default=1000 -->
            <unusualActivity></unusualActivity>                               <!-- default=10000 -->
            <!-- The defaults for the following tags are in messages.xml. -->
            <startHeadHtml5></startHeadHtml5>                                
            <startBodyHtml5></startBodyHtml5>                                 <!-- This is often customized. -->
            <theShortDescriptionHtml></theShortDescriptionHtml>               <!-- This is often customized. -->
            <endBodyHtml5></endBodyHtml5>
            <standardLicense></standardLicense>
            <standardContact></standardContact>
            <standardDataLicenses></standardDataLicenses>
            <standardDisclaimerOfEndorsement></standardDisclaimerOfEndorsement>
            <standardDisclaimerOfExternalLinks></standardDisclaimerOfExternalLinks>
            <standardGeneralDisclaimer></standardGeneralDisclaimer>
            <standardPrivacyPolicy></standardPrivacyPolicy>
```

        2. Egy-egy, másolja az értéket (ha valaki) az egyes címkék a setup.xml fájlt az új címkére, amelyet csak pasztoltál (felett) bennedatasets.xml... Például, ha 30 értéket használtál a 30-ból&lt;cacheMinutes&gt; be setup.xml, meg kell másolni ezt az értéket az új&lt;cacheMinutes&gt; címkedatasets.xml  (bár ha az érték ugyanaz, mint az új alapértelmezett érték, akkor a legjobb, ha csak elhagyja a címkétdatasets.xmlBlank) ...
            
Ha az értéke más, mint az új javasolt alapértelmezés (más, mint az&lt;startBodyHtml5&gt; és&lt;AShortDescriptionHtml&gt;, amely hasznos a testreszabásáhozERDDAP™telepítés), kérjük, vegye fontolóra az új alapértelmezett értékekre való átállást. Ez különösen igaz&lt;PartialRequestMaxBytes&gt; és&lt;partialRequestMaxCells&gt;, ahol az alapértelmezett/szuggesztált érték jelentősen megváltozott az évek során.
            
Miután minden értéket másol, törölje a címkét és annak leírását a setup.xml-től. Jobb, ha ezeket a címkéket bevonjukdatasets.xml... És most jobb leírások vannak[setupDatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file)...
            
        
Az új rendszer csúcsa az, hogy az első weboldal, amikor elkezdeszERDDAPlesz az alapértelmezésERDDAP™weboldal. Minden későbbi weboldal használja a ...Html tartalmat, amelyet megadottdatasets.xml...
        
    * WARNING: Az első alkalom, amikor futszERDDAP™v2.0, a helyi adatállományokon alapuló adatkészletek terhelik **nagyon** lassan, mertERDDAP™újra kell létrehozni a fájlok adatbázisát egy kicsit más formátumban. A lassú kezdeti újratöltés után gyorsan betöltik, mint korábban. Kérjük, légy türelmes&#33;
         
#### EDDTableFromHttpGet{#eddtablefromhttpget} 
    *   [BIG NEW FEATURE: EDDTableFromHttpGet](#eddtablefromhttpget)  
Mostanáig,ERDDAP™csak olvassa el az adatokat, és elérhetővé tette a felhasználók számára. Most,ERDDAP™egyszerű, hatékony rendszerrel rendelkezik az érzékelők valós idejű adatainak becslésére. Többek között ez az adatkészlet finoman megfogalmazott verziót kínál: emlékszik minden változásra az adatkészletben, amikor készült, és ki által. Általában a felhasználók csak az adatkészlet legfrissebb verzióját akarják, minden megváltozással. De van lehetőség a felhasználók számára, hogy adatokat kérjenek az adathalmaztól, mivel bármikor volt. Ez megkönnyíti a reprodukálható tudományt. Így, ellentétben a legtöbb más közeli idejű adatkészletekkel, ezek az adatkészletek jogosultak[DOIs](https://en.wikipedia.org/wiki/Digital_object_identifier)... mert találkoznakDOIkövetelmény, hogy az adatkészlet nem változik, kivéve az aggregáció. Lásd[EDDTableFromHttpGet](/docs/server-admin/datasets#eddtablefromhttpget)... Köszönjük OOI (régen és most) a szükségességről és az Eugene Burgerről beszélni az emlékeztető számára, hogy mi fontos.
         
    * BIG NEW FEATURE:ERDDAP™ma már közvetlenül a külsőleg elnyomott adatfájlokból szolgálhat adatokat, beleértve a.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, vagy .Z. Adatkészletek tartalmazhatnak külsőleg elnyomott fájlok keverékét (Talán az idősebb adatfájlok?) és külsőleg elnyomott fájlok, és bármikor tömörítheti / lebonthatja a fájlt.
        
Ez nagyszerűen működik&#33;
A legtöbb esetben a fájlok depressziójával kapcsolatos lassulás kisebb. Erősen arra ösztönözzük Önt, hogy próbálja meg ezt, különösen az adatkészletek és / vagy adatfájlok esetében, amelyeket gyakran használnak.
        
Ez akár 300 000 dollárt is megtakaríthat&#33;
Ez az egyik a kevesek közülERDDAP™olyan funkciók, amelyek sok pénzt takaríthatnak meg - ha sok adatfájlot tömörítenek, sokkal kevesebb RAID-ra / merevlemezre lesz szüksége az adatok tárolásához vagy fordítva, sokkal több adatot szolgálhat (akár 10x) a már rendelkezett RAID-okkal. Ha ez a funkció megmenti Önt egy másik RAID vásárlásától, akkor körülbelül 300 000 dollárt takarított meg.
        
Lásd:[Külsőleg elnyomott fájldokumentáció](/docs/server-admin/datasets#externally-compressed-files)... Benoit Perrimondnak és Paloma de la Vallee-nek köszönhetően.
        
    * BIG NEW FEATURE: MindenEDDGridFromFiles és az összes EDDTableFromFiles adatkészlet támogatja a&lt;cacheFromUrl&gt; címke és&lt;cacheSizeGB&gt; címke. Ha a cacheSizeGB-t nem határozzák meg, ez letölti és fenntartja a távoli adatkészlet fájlainak teljes másolatát. Ha a cacheSizeGB-t megjelölik, és &gt;0, ez szükség szerint letölti a távoli adatkészletből származó fájlokat egy korlátozott méretű helyi cache-ba, amely hasznos a felhőalapú munkavégzés során. (pl. S3) adatfájlok. Lásd:[Húsvét FromUrl dokumentáció](/docs/server-admin/datasets#cachefromurl)részletekért. Bob Simonsnak és Roy Mendelssohnnak köszönhetően (aki évek óta írja a scripteket, hogy kezelje a távoli adatkészletek helyi másolatait) Lloyd Cotten, Eugene Burger, Conor Delaney (amikor az Amazon Web Services volt) , és a Google Cloud platform.
         
    * ÚJ: Az új EDDTableFromJsonlCSV Az osztály elolvashatja a tabuláris adatokat
        [JSON Lines CSV fájlok](https://jsonlines.org/examples/)  ("Better, mint CSV") ... A Marine Institute of Ireland munkatársainak köszönhetően, hogy elmondják nekem ezt a formátumot, és Eugene Burgernek és PMEL-nek, hogy kérje, hogy támogassa azt bemeneti típusként.
         
    * ÚJ: MindenEDDGridés az összes EDDTableFromFiles adatkészlet támogatja a&lt;nThreads&gt; beállítás, amely azt mondjaERDDAP™hány szálat kell használni, amikor válaszol egy kérésre. Lásd:[nHreads dokumentáció](/docs/server-admin/datasets#nthreads)részletekért. Rob Bocheneknek Axiom Data Science, Eugene Burger, Conor Delaney (amikor az Amazon Web Services volt) és a Google Cloud platform.
         
    * NEW szabványosítás Mi minden EDDTableFromFiles alosztály számára -
Korábban, ha egy adott változó, a fontos tulajdonságok értékei (pl.:scale\\_factor,add\\_offset,missing\\_value\\_FillValue, egység) Nem voltak következetesek, az EDDTableFromFiles egy értéket választana minden tulajdonság számára, hogy „értékesek” legyenek, és más tulajdonságokkal rendelkező fájlokat jelöljenek meg, mint a „Bad Files”. Most van egy rendszer, hogy szabványosítsa a fájlokat, amint az EDDTableFromFiles olvassa el a fájlokat. Lásd[EDDTableFromFile szabványosítása Amit](/docs/server-admin/datasets#standardizewhat)... Az egyikERDDAPA fő célja, hogy az adatfájlokat és adatkészleteket következetes módon hozzáférhetővé tegyék. szabványosítás Mi egy fontos új eszköz, hogy ez a valóság. Marco Albanak köszönhetően Margaret O'Brien (más EML felhasználók) BCO-DMO és InPort felhasználók.
         
    * NEW EDDTableFromInvalidCRAFiles lehetővé teszi, hogy egy adatkészlet egy gyűjteményNetCDF  (v3 vagy v4)  .ncfájlok, amelyek egy adott, érvénytelen, változata a CF DSG Contiguous Ragged Array (CRA) fájlok. A mintafájlok az adatkészlet típusához megtalálhatók https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 Ez a szerver most már nem megbízhatóan elérhető\\]... BárERDDAP™támogatja ezt a fájltípust, ez egy érvénytelen fájltípus, amelyet senkinek nem kell használnia. Azok a csoportok, amelyek jelenleg ezt a fájltípust használják, erősen ösztönzik a használatraERDDAP™hiteles CF DSG CRA fájlok generálására, és hagyja abba ezeket a fájlokat. Köszönhetően Ajay Krishnan és Tim Boyer.
         
    * EDDTableFromThreddsFiles és EDDTableFromHyraxA fájlokat most levonják. Kérjük, váltson EDDTableFromNcFiles-re (vagy változat) plusz&lt;cacheFromUrl&gt; Ha ez valamilyen okból nem működik, e-mailerd.data at noaa.gov... Ha 2020 előtt nincsenek panaszok, ezeket az adatkészleteket el lehet távolítani.
         
    * IMPROVED - A rendszer automatikusan átalakítja a nem-ISO 8601-szer az ISO 8601-szer (bevezetett v1.82) Nagymértékben bővült, hogy számos további formátumot kezeljen. Ez befolyásolja a GenerateDatasetsXml-t ésERDDAPA forrás metaadatának kezelése.
         
    * IMPROVED - Harmadik fő felülvizsgálatával a String Time parsing rendszer (és remélhetőleg az utolsó) ,ERDDAP™már nem használJavaA DateTimeFormatter olyan hibák miatt, amelyek néha szélsőséges időket érintenek (évek).&lt;=0000).ERDDAP™most használja a saját rendszerét az időcsíkok elválasztására.
         
    * FIGYELMEZTETÉS: Az új sztrájkidő-parsing rendszer valamivel szigorúbb. Ha az egyik adatkészlet hirtelen csak hiányzik az időértékek, az ok szinte biztosan, hogy az idő formátuma sztring kissé rossz. Hibaüzeneteknek kell lenniük a naplóban. txt kapcsolódik az időértékekhez, amelyek nem feleltek meg az időformátumnak - ez segít abban, hogy megjavítsa az adott adatkészlethez tartozó időt formátumot. Ha segítségre van szüksége, használja a lehetőségetERDDAPTime Converter, amely "Convert\\[s\\]bármilyen közös sztringidő egy ISO 8601-es sztringidőbe" - jelzi azt a formátumot, amelyet a konverter használt a forráskód lezárásához.
         
    * JELENTÉS: A leggyorsabb, legkönnyebb és legolcsóbb módja annak, hogy felgyorsuljonERDDAPA mesés adatokhoz való hozzáférés az adatfájlok egy szilárd állami meghajtóra való elhelyezése (SSD) ... A legtöbb tabuláris adatkészlet viszonylag kicsi, így egy 1 vagy 2 TB SSD valószínűleg elegendő ahhoz, hogy az összes adatfájl tartsa az összes tabuláris adatkészletet. Az SSD végül viseli, ha adatokat ír egy cellára, törölje és írjon új adatokat a cellára túl sokszor. Ehelyett azt javaslom, hogy (a lehető legtöbbet) Használja az SSD-t, hogy egyszer írja az adatokat, és sokszor olvassa el. Ezután még egy fogyasztói minőségű SSD-nek is hosszú ideig kell tartania, valószínűleg sokkal hosszabb, mint bármely Hard Disk Drive (HDD) ... A fogyasztói minőségű SSD most olcsó (2018-ban, ~ $ 200 1 TB vagy ~ $ 400 2 TB) és az árak még mindig gyorsan csökkennek. MikorERDDAP™hozzáférés egy adatfájlhoz, az SSD mindketten
        
        * rövidebb latencia (~0.1ms, versus ~ 3ms egy HDD, versus ~ 10 (?) ms egy RAID, versus ~ 55ms az Amazon S3 számára) és
        * magasabb teljesítmény (500 MB/S, versus ~ 75 MB/s egy HDD versus ~ 500 MB/s egy RAID) ...
        
Tehát felállhat egy ~ 10X teljesítménynövekedésre (vs HDD) 200 dollárért&#33; Összehasonlítva a rendszer legtöbb lehetséges változásával (Új kiszolgáló 100 000 dollárért? Új RAID 35 000 dollárért? egy új hálózati kapcsoló 5000 dollárért? stb.) Ez messze a legjobb visszatérés a beruházásra (ROI) ... Ha a szerver nem tölti be a memóriát, a szerver további memóriája szintén nagyszerű és viszonylag olcsó módja annak, hogy felgyorsítsa az összes szempontotERDDAP...
        \\[Az SSD nagyszerű lenne a rácsos adatokhoz is, de a legtöbb rácsos adatkészlet sokkal nagyobb, így az SSD nagyon drága.\\]  
         
    * ÚJ: Mindenki, aki be van jelentkezve, szerepet kap =\\[bárkit megadva Inkább\\]még akkor is, ha nincs&lt;felhasználói&gt; címke számukradatasets.xml... Ha beállítása adatkészlet&lt;hozzáférhetőTo&gt;\\[bárkit megadva Inkább\\]Akkor bárki, aki bejelentettERDDAP™  (pl. Gmail vagy Orcid fiókjukon keresztül) engedélyezik az adatkészlethez való hozzáférést, még akkor is, ha nem adott meg egyet&lt;felhasználói&gt; címke számukradatasets.xml... Maurice Libesnek köszönhetően.
         
    * IMPROVED: AUDUNITS/UCUM egység átalakító széles körben javult.
Az érvénytelen egységeket jobban kezeli (hangsúlyt fektetve az információk megőrzésére, ahelyett, hogy érvényességet érne el) ... Az eredmények most egy szabványosított szinaxis.
         
    * ÚJ: AUDUNITS/UCUM egység átalakító új lehetőség a szabványosításáraUDUNITShúr.
Ez jól működik érvényesnekUDUNITShúrok és ésszerűen jól a nem szabványos / érvénytelenUDUNITShúrok. Például például,UDUNITS="méter másodpercenként", "mérő/második","m.s^-1"és"m s-1"Minden visszatér "m.s-1". Ez szükséges volt az új szabványosításhoz Milyen rendszert írtak le fent. Marco Albanak köszönhetően Margaret O'Brien (más EML felhasználók) BCO-DMO és InPort felhasználók.
         
    * EDDTableFromMultidimNcFiles most van egy[ADimensions](/docs/server-admin/datasets#treatdimensionsas)opció, ez azt mondjaERDDAP™bizonyos dimenziók kezelésére (LAT és LON) mintha más dimenziók lennének (pl.: TIME) ... Ez hasznos néhány helytelen fájl esetében, amelyek különböző dimenziókat használnak különböző változók számára, amikor csak egy dimenziót kellett volna használniuk. (pl.: TIME) ... Marco Albanak és Maurice Libesnek köszönhetően.
         
    * ÚJ: Most, mindenEDDGridA Files adatkészletek egy új különleges tengelyt támogatnaksourceNameamit mondERDDAP™információ kivonása a fájlbólName (Just filename.ext) és használja az értéket **helyettesítő** a meglévő baloldali tengelyérték. A formátum az
        \\*\\*\\*replaceFromFileName,_dataType_,_extractRegex_,_captureGroupNumber_
Lásd[ez a dokumentáció](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)... Köszönöm aNOAAPathfinder Daily aggregációs adatkészlet.
         
    * ÚJ: Most, mindenEDDGridA Files adatkészletek egy új különleges tengelyt támogatnaksourceNameamit mondERDDAP™információ kinyerése a fájl útjárólName (könyvtárak + filename.ext)   
        \\*\\*\\*pathName,_dataType_,_extractRegex_,_captureGroupNumber_
Ehhez az út neve mindig használja'/'mint a rendezői szeparátor karakter, soha nem ''.
Lásd[ez a dokumentáció](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)... Paloma de la Vallee-nek köszönhetően.
         
    * ÚJ: Most, minden EDDTableFrom... A Files adatkészletek további pseudo változót támogatnaksourceNames, amely kivonja az információkat a fájl fájlbólName (Just filename.ext)   (lásd:[\\*\\*\\*fileName](/docs/server-admin/datasets#filename-sourcenames)) vagy a fájl teljes útjaName (/dir1/dir2/filename.ext)   (lásd:[\\*\\*PathName](/docs/server-admin/datasets#pathname-sourcenames)) ... Paloma de la Vallee-nek köszönhetően.
         
    * NEW: Ha egyEDDGridAz adatkészletnek egy vagy több nagyon nagy dimenziója van (több millió érték) amely sok memóriát vesz fel, beállíthatja az újat [&lt;dimenzióValuesInMemory&gt;] (/docs/server-admin/datasets#dimenziós érzékszervi) beállítás hamis (az alapértelmezés igaz) , amely az adathalmazt okozza, hogy tárolja az értékeket a lemezen, és szükség esetén visszaszerezze őket. David Rodrigueznak és Rich Signellnek köszönhetően (Re:EDDGridFromAudioFiles) ...
         
    * Előzőleg, ha újrarendelte adataVariables egy EDDTableFromFiles adatkészlet és újratölteni az adatkészletet, az EDDTableFromFiles újraolvasná az összes adatlapot. Most foglalkozhat a helyreállítással anélkül, hogy újraolvasná az összes adatfájlot. Roland Schweitzernek köszönhetően.
         
    * IMPROVED: Most, amikorERDDAP™Olvassa el az ASCII-t, az NCCSV-t és a JSON Lines CSV tabuláris adatfájlokat, ha hibát talál egy adott sorban (pl. helytelen számú elem) figyelmeztető üzenetet jelent ("WARNING: Skipping sor #"... "váratlan számú elem...") a[log.txt fájl](/docs/server-admin/additional-information#log)Ezután továbbra is olvassa el az adatfájl többi részét. Így a te felelősséged rendszeresen nézni (vagy írjon egy forgatókönyvet, hogy ezt tegye) az üzenet a logban. txt, hogy rögzítse a problémákat az adatfájlokban.ERDDAP™így van beállítva, hogy a felhasználók továbbra is elolvassák az összes rendelkezésre álló érvényes adatot, még akkor is, ha a fájl egyes vonalak hibái vannak. Korábban,ERDDAP™a fájlt "rosszként" jelezte, és eltávolította az adatkészletből.
         
    * IMPROVED: Amikor pontos idők (pl. a legközelebbi második vagy millisecond) tárolják a forrás, mint "percek óta ..." (vagy nagyobb egység) ,ERDDAP™most a legközelebbi milliszekundra kerekíti őket, amikor az értékeket beolvassaERDDAP... Ellenkező esetben a lebegő pontszámokat súlyosbítják, és bizonyos időpontokban kérik az adatokat (pl.: &time=2018-06-15T01:30:00) kudarcot vall. Korábban a lehető legpontosabban kiszámította őket (és még mindig, ha az egységek pl. „második azóta...” vagy „milliseconds óta...”) ... A legjobb, ha elkerüljük ezt a problémát, ha nem használunk nagy egységeket (pl. percek vagy órák) pontos időértékek tárolása (pl. mikro másodpercek) - a számítógépek rossz munkát végeznek a decimális számjegyek kezelésében. Marco Albanak köszönhetően.
         
    * CHANGES EDDTableFEDDGridami sokkal jobbá teszi. EDDTableFromEDDGridlehetővé teszi a felhasználók számára, hogy lekérdezzék a rácsos adatkészleteket, mintha mesés adatkészletek lennének ("Kérdezés érték szerint") ...
        
        * Ez most támogatja a&lt;maxAxis0&gt; címke (default=10) amely meghatározza a maximális tengelyszámot\\[0 0\\]  (általában"time") olyan értékek, amelyek egyszerre lekérhetők. Ez megakadályozza a naiv kérelmeket, hogy EDDTableF-t kapjanakEDDGridkeressen egy teljes rácsos adatkészletet (amely elbukik az időzítési hiba miatt) ...
        * GenerateDatasets Az Xml most lehetősége van az EDDTableF létrehozásáraEDDGridadatkészletek az összes rácsos adatkészlethez egy adottERDDAP™amely megfelel egy meghatározott regexnek (Használjon .\\*-t az összes adatkészlethez) ... Azok az adatkészletek, amelyeket létrehoz, további információkat tartalmaznak az összefoglaló jellemzőkben, jelezve, hogy ez egy takaró változata egy rácsos adatkészletnek. És az ődatasetIDazdatasetIDa rácsos adatkészlet, plusz "\\_Asatable".
        * Nagy sebességgel jár a leggyakoribb beállításhoz: ha a rácsos adatkészlet egyEDDGridFromErddap adatkészlet, amely ugyanabban az esetben vanERDDAP...
        
James Gallaghernek és Ed Armstrongnak köszönhetően.
         
    * NEW: generáció Adatkészletek Az Xml minden típusú adatkészlethez sokkal valószínűbb, hogy hozzáad egy \\_FillValue-t vagymissing\\_valuea numerikus változó tulajdonságaiaddAttributes... Például ez akkor következik be, amikor a szúrás hiányzó értékjelzők (pl.: "", "?", "NA", "nd", "NaN",) a mintafájlban ez a változó átalakulERDDAPnatív hiányzó értékek (127 byte oszlopban, 32767 rövid oszlopokban, 2147483647 int oszlopok, 9223372036854775807 hosszú oszlopokban és a NaN floatban és kettős változóban) ... Ez is előfordul a NaN értékek float és dupla változók. Továbbá a "nd"-t hozzáadták a számszerű adatoszlopok közös hiányzó értékjelzőinek listájához, amelyeketERDDAP™keresni kell. A BCO-DMO Matt Biddle-nek köszönhetően.
         
    * IMPROVED: a ncdump opció generál Adatkészletek Xml most több, mint a ncdump (de még mindig használja a ncdump netcdf-java verzióját) ... Most új listát nyomtat a lehetőségekről. Most, mert.ncml fájlok, kinyomtatja a ncdump kimenetet az eredményért.ncml fájlváltozások az alapul szolgáló.ncvagy.hdffájl.
         
    * BUG FIX: Volt egy fájlkezelő szivárgás (végül okozzaERDDAP™fagyasztani) egyes típusú kimeneti fájlok létrehozásakor, például .geotif, különösen akkor, ha hibák történtek a létrehozás során. Azt hiszem / remélem, ez most minden rögzített. Ha még mindig látsz problémákat, mondd el nekem az adatkészlet típusát (háló vagy asztal) és a probléma okozó fájl típusa. Steven Beale, Lynn DeWitt, Jibei Zhao és másoknak köszönhetően.
         
    * BUG FIX: AWMS LeafletA demó nem teljesen / tulajdonképpen átalakította a "mély" tengelyt a "felemelkedéshez". Most, ez teszi, és a törött legenda kérések rögzítve vannak. Továbbá az összes tengely opció a lefelé irányuló listák mindig felemelkedő rendezés. Antoine Queric és Aurelie Briandnak köszönhetően.
         
    * BUG FIX: Az EDDTableFromFiles jelenleg helyesen támogatja a String változókat, amelyeket az adatfájlokban a char változókból hoztak létre. Antoine Queric és Aurelie Briandnak köszönhetően.
         
    * BUG FIX: Most, amikor egy adatkészlet nem érhető el, az adatkészlet megpróbálja értesíteni („Ez az adatkészlet jelenleg nem érhető el.”) előfizetői, felsorolt fellépései, rss és lonPM180 adatkészletei, amelyek rá támaszkodnak. Roy Mendelssohnnak és Bob Simonoknak köszönhetően.
         
    * BUG FIX: Két hiba az EDDTableCopy-hoz kapcsolódó. Sam McClatchie-nak köszönhetően.
         
    * IMPROVED: A status.html oldalon bemutatott sikertelen kérések száma növekedni fog, mert több dolog számít kudarcnak, mint korábban.
         
    * IMPROVED:ERDDAPA status.html most azt mutatja, hogy "Requests (medián idő ms) "A sorozatban. Korábban a medián időket mutatták be az integráló másodpercekre.
         
    * IMPROVED: A jsonld kimenetben a jsonld "név" most az adatkészletből származik"title"benneERDDAP, és a jsonld "fejvonal" most az adatkészlet "datasetID"AERDDAP... Korábban megfordították. Ez rossznak tűnik számomra, mert a normál angol használatban a "név" általában rövid, (ideális) egyedi azonosító, amely ritkán/soha nem változik (Robert Middlename Simons) nem olyan leírás, amely nem egyedi, és amely könnyen és gyakran változhat (pl.: "A srác, aki szoftvert írNOAA"Vs. "A magas srác, aki szoftvert írNOAA"...") ... Gee, nagyszerű lenne, ha a schema.org meghatározása[név](https://schema.org/name)A Dataset kontextusában konkrétabbak voltak. A szoftverfejlesztőknek képesnek kell lenniük arra, hogy egyedül a specifikáción alapuló specifikációt írják le a szakértők útmutatása nélkül. De elhalasztom a Google-t (nevezetesen Natasha Noy) NCEI (John Relph) Rob Fuller.
         
    * IMPROVED: A jsonld kimenetben a négy "spatialCoverage GeoShape box" értéke most minLat minLat maxLat maxLon. Korábban a lat és a lon pozíciókat visszafordították. Gee, nagyszerű lenne, ha a schema.org meghatározása[GeoShape](https://schema.org/GeoShape)meghatározta a helyes rendet. A szoftverfejlesztőknek képesnek kell lenniük arra, hogy egyedül a specifikáción alapuló specifikációt írják le a szakértők útmutatása nélkül. Natasha Noynak és Rob Fullernek köszönhetően.

## Verzió 1.82{#version-182} 
 (megjelent 2018-01-26) 

*    **Új funkciók (felhasználók számára) :**   
     
    * Számos finom változás a megjelenés és az érzékERDDAP™weboldalak.
        * IMPROVED:ERDDAP™most használja a HTML 5-et, és jobban használja a CSS-t.
        * IMPROVED: Az oldalak kissé módosítottak, hogy tisztábbá és kevésbé "vásárlási". (Még mindig sűrűek, és még mindig vannak dolgok, amikre panaszkodni lehet, de remélhetőleg sokkal kevésbé, mint korábban.) John Kerfootnak köszönhetően néhány megjegyzésért.
        * IMPROVED: A weboldalak most sokkal jobban néznek ki a mobiltelefonokon és más kis eszközökön, különösen akkor, ha táj-orientációban használják őket. Ők is jobban néznek ki nagyon kicsi és nagyon nagy ablakok asztali böngészők.
        * IMPROVED: A biztonság javítása és egyéb okok, a naprakész Openlayers verzió használata aWMSa demonstrációs oldalakat felváltottaLeaflet...
        * NEW: a kép, az audio és a videofájlok előnézetének támogatása"files"rendszerrendszer (például,[ez a vizsgálati adatkészlet](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/)) és.htmlTableválaszok, ha egy cella rendelkezik egy kép, audio vagy videofájl URL-ével (például,[e kérelem](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22)) ... Ha egy "?" ikon felett forogsz, meg kell nézned egy képet, hangot vagy videofájl előnézetet. Ezután kattintson a fájl linkre, hogy megnézze a fájl teljes képernyőjét a böngészőben. Lásd:[Media Files dokumentáció](/docs/server-admin/datasets#media-files)... Vegye figyelembe, hogy a különböző böngészők különböző fájltípusokat támogatnak, így a példák nem működhetnek a böngészőben.
Ezeknek az embereknek/linkeknek köszönhetően ötletek és minta kód CSS-csak kép tooltips (volt https://codepen.io/electricalbah/pen/eJRLVd ) és elhalasztott képterhelést (volt https://varvy.com/pagespeed/defer-images.html )   (bár a kódot módosították, mielőtt használtákERDDAP) ...
Cara Wilsonnak, Matthew Austinnak és Adam Shepherd/BCO-DMO-nak köszönhetően a kép támogatás iránti kérelmekért.
Köszönhetően Jim Potemra, Rich Signell, OOI és Carrie Wall Bell az audio / hidrofon fájl támogatás iránti kérelmekért.
Az OOI-nak köszönhetően, hogy megmutassa a videó támogatás szükségességét.
        * ÚJ: Az adatok bármilyen adatkészleteERDDAP™adatkészlet (de általában egy adatkészlet az audio fájlokból) most meg lehet menteni egy .wav audio fájlban. ([dokumentáció](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav)) Köszönhetően Jim Potemra, Rich Signell, OOI és Carrie Wall Bell az audio / hidrofon fájl támogatás iránti kérelmekért.
        * IMPROVED: A web hozzáférhető mappák formátuma (WAF)   (pl. a /files/ mappa) A HTML asztal használatára frissítették. Az új formátum az Apache legújabb verziói által létrehozott weblapok listájának legújabb verzióját jelenti. Az emberek azt fogják találni, hogy a változások megkönnyítik az olvasást. Szoftver, amely elválasztja ezeket a dokumentumokat (pl. olyan szoftver, amely betakarítja az ISO 19115 dokumentumokatERDDAP) felül kell vizsgálni, de az új formátum könnyebb lesz párosítani, mint az előző formátum. (Figyelem, Anna Milan.) 
        * ÚjoutOfDateDatasets.htmloldal. ([példa](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) Ez a weboldal egy táblázatot mutat az összes közeli valós idejű adatkészlettel, amely rendelkezik&lt;testOutOfDate&gt; &gt; címke (lásd alább) rangsorolva, hogy az adatkészletek naprakésszé tétele milyen. Ez a dashboard hasznos lehetERDDAP™adminisztrátorok és végfelhasználók, amikor tudni akarják, hogy mely adatkészletek naprakészek. A naprakész adatkészletek esetében valószínűleg probléma merül fel az adatforrással, hogyERDDAP™képtelen meglátni/céladatokat a közelmúltban.
Adminisztrátorok: Ha nem akar egy Out-Of-Date Datasets weboldalt, add hozzá ezt a beállításhoz.xml:
            &lt;OutOfDateDatasetsActive&gt; hamis&lt;/outOfDateDatasetsActive&gt;
Vannak most mártestOutOfDateés Az OfDate oszlopok aallDatasetsadatkészlet.
Bob Simonsnak köszönhetően, aki évek óta ezt akarta, és Írország tengerészeti intézetének okos embereinek, akik az inspirációt az elkötelezett Raspberry Pi-n keresztül adtak nekem, és figyelemmel kísérik, amely mindig olyan képernyőt mutat, mint ez az irodájukban.
        * IMPROVED:.htmlTableés.xhtmla válasz most jobb formázott, kompaktabb és így gyorsabban terheli. HTML5 és CSS.
    * NEW output fájltípus griddap adatkészletekhez: .timeGaps. Megmutatja a hiányosságok listáját az időértékekben, amelyek nagyobbak, mint a medián szakadék. ([példa](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps)) Ez hasznosERDDAP™adminisztrátorok és végfelhasználók, ha tudni akarják, hogy váratlan hiányosságok vannak-e az adatkészlet idejében, amely várhatóan rendszeresen elterjedt időértékeket tartalmaz. Bob Simonsnak és Roy Mendelssohnnak köszönhetően, akiknek szüksége volt erre a funkcióra.
    * IMPROVED: Az alapértelmezett grafikonallDatasetsAz adatkészlet most egy x=maxLon és y=maxLat térkép. John Kerfootnak, Rich Signellnek és OOI-CI-nak köszönhetően.
    * NEW:[erddapy](https://github.com/ioos/erddapy)- nem egyERDDAP™jellemző, de érdekes lesz sokak számáraERDDAP™felhasználók. Erddapy (ERDDAP™+Python) egyPythona Filipe Fernandes által létrehozott könyvtár, amely "előnyt élvezERDDAPARESTfulwebszolgáltatások és létrehozza aERDDAP™URL minden olyan kérésre, mint az adatkészletek keresése, metadat megszerzése, adatok letöltése stb..” Filipe Fernandesnek köszönhetően.
    * Korábban már említettem: Van egy harmadik fél R csomag célja, hogy megkönnyítse a munkátERDDAP™belülről R:[Rerdap](https://github.com/ropensci/rerddap#rerddap)... Köszönöm[rOpenSci](https://ropensci.org/)Roy Mendelssohn.
         
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:**   
     
    * TO DO: A setup.xml-ben, közvetlenül alább&lt;adminInstitution&gt;, kérlek add hozzá egy&lt;adminInstitutionUrl&gt; címke, amely meghatározza az intézmény URL-jét (vagy csoport) ...
    * TO DO: Ezek a 3 címke a setup.xml már nem használják:
        &lt;Kezdőlap HeadHtml&gt;,&lt;startBodyHtml&gt; és&lt;végBodyHtml&gt; Őket helyettesítik
        &lt;startHeadHtml5&gt;,&lt;startBodyHtml5&gt; és&lt;végBodyHtml5&gt;, amely az üzenetekben meghatározott alapértelmezett értékekkel rendelkezik.xml (alább látható) ...
        
Javasoljuk az alapértelmezett használatát&lt;startHeadHtml5&gt; és&lt;végBodyHtml5&gt;
Javasoljuk: Ha megváltoztatta az eredetit&lt;Kezdőlap &gt; és / vagy szeretné testreszabniERDDAP™most, kérlek, másolja az újat&lt;startBodyHtml5&gt; címke (alulról) Beállítása.xml és módosítsa azt, hogy testreszabjaERDDAP™hogyERDDAPA weboldalak tükrözik a szervezetet, nemNOAA ERD... Tulajdonképpen, kérjük, változtassa meg a "Brought to you"-t a szervezetéhez (s) ... Ha segítségre van szüksége, kérjük e-mailterd.data at noaa.gov... (Ha nem akarja testreszabni aERDDAP™most használja az alapértelmezést&lt;startBodyHtml5&gt;.)
        
Ezután törölje a 3 régi címkét a setup.xml-ben, amelyet már nem használnak.

```
        <startBodyHtml5><!\\[CDATA\\[ 
        <body>
        <table class="compact nowrap" style="width:100%; background-color:#128CB5;"> 
          <tr> 
            <td style="text-align:center; width:80px;"><a rel="bookmark"
              href="https://www.noaa.gov/"><img 
              title="National Oceanic and Atmospheric Administration" 
              src="&erddapUrl;/images/noaab.png" alt="NOAA"
              style="vertical-align:middle;"></a></td> 
            <td style="text-align:left; font-size:x-large; color:#FFFFFF; ">
              <strong>ERDDAP</strong>
              <br><small><small><small>Easier access to scientific data</small></small></small>
              </td> 
            <td style="text-align:right; font-size:small;"> 
              &loginInfo; &nbsp; &nbsp;
              <br>Brought to you by 
              <a title="National Oceanic and Atmospheric Administration" rel="bookmark"
              href="https://www.noaa.gov">NOAA</a>  
              <a title="National Marine Fisheries Service" rel="bookmark"
              href="https://www.fisheries.noaa.gov">NMFS</a>  
              <a title="Southwest Fisheries Science Center" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/southwest-fisheries-science-center">SWFSC</a> 
              <a title="Environmental Research Division" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center">ERD</a>  
              &nbsp; &nbsp;
              </td> 
          </tr> 
        </table>
        \\]\\]></startBodyHtml5>
```

Vannak további módok, hogy lehet[testreszabásaERDDAP™](/docs/server-admin/deploy-install#customize)ígyERDDAPA weboldalak tükrözik a szervezetet, ahelyett, hogyNOAA ERD...
        
    * TO DO: A&lt;EDDGrid...Example & gt; címkék (csillagolás&lt;EDDGridIdExample & gt;) és&lt;EDDTable... Example & gt; címkék (csillagolás&lt;EDDTableIdExample & gt;) a setup.xml fájlban használják, hogy példákat hozzon létre a griddapban éstabledapdokumentáció. Html weboldalak az ÖnERDDAP...
        
Ha nem testreszabta ezeket a címkéket, törölje őket a setup.xml fájlból. Most mindegyiküknek vannak olyan alapjai az üzenetekben.xml-ben, amely a Bob adatkészleteire utalERDDAP™a https://coastwatch.pfeg.noaa.gov/erddap/index.html ... Tehát már nem kell konkrét adatkészleteket tartalmaznia az Ön számáraERDDAP... Ha le akarja vetni az alapértelmeket, másolja néhány vagy az összes címkét a beállításba.xml-be, és megváltoztatja az értékeket.
Ha azt akarja, hogy a példák rámutassanak aERDDAP™A legegyszerűbb módszer:
        
        1. Tartsa be ezeket a két adatkészletet az ÖnbenERDDAP™hozzáadásával ezt adatasets.xml:
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Adja hozzá ezt a címkét a setup.xml-hez, de változtassa meg az URL-t az Ön számáraERDDAPA (https?) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Ha testreszabta ezeket a címkéket, hagyja el őket, és kérjük, adja hozzá ezeket a 2 új címkét a setup.xml-hez, hogy megadja aERDDAP™URL ezeknek az adatkészleteknek, de módosítsa az URL-t az Ön számáraERDDAPA (https?) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * TO DO:ERDDAP™most egy css fájlt használ erddap2.css néven. Ha változtatásokat tettél\\[Tomcat\\]/webapps/erddap/images/erddap.css, fontolja meg a hasonló változásokat az erddap2.css-hez (ugyanabban a könyvtárban) ...
    * NEW:ERDDAPA weboldalaknak most nagyszámú szinte láthatatlan belső linkje van (a szöveg fekete, és nem hangsúlyozott) ... Ha átmeleged ezen linkek egyikét (általában az első néhány fejezet és bekezdés) A kurzor kéz lesz. Ha rákattint a linkre, az URL a dokumentum ezen szakaszához való belső kapcsolat. Ez megkönnyíti a dokumentáció konkrét szakaszait. Bob Simonsnak köszönhetően, aki évek óta ezt akarta.
    * NEW:ERDDAP™most támogatja[Byte Range / Accept-Ranges](https://en.wikipedia.org/wiki/Byte_serving)/files/ fájlok adagjaira vonatkozó kérelmek. Ez volt szükség, hogy támogassa az audio és video nézők a böngészők.
    * TO DO: Most, hogy javítsa a biztonságot, ha meghatározott&lt;baseHttpsUrl&gt; a setup.xml-ben (és így támogatáshttps) Az ajánlott zászló Url egyhttpsURL egy biztonságosabb zászlóKey. Ha igen, minden korábbi flagUrls/flagKeys érvénytelenné válik. Adminok: Ha ezek a változások érvényesek az Ön számáraERDDAP™és ha a teERDDAP™AEDDGridFromErddap és EDDTable FromErddap, aki feliratkozott a távoliERDDAPS, akkor, miután frissítettERDDAPA teERDDAP™automatikusan megpróbálja feliratkozni az új flagUrl, így törölje a régi előfizetéseket, és érvényesítse az új előfizetéseket, amikor megkapja az új előfizetési validálási e-maileket.
    * TO DO: Ha a teERDDAP™AEDDGridFromErddap adatkészletek erdVH3 adatkészletek Bob partiwatchERDDAP™Kérjük, változtassa meg őket az új erdVH2018 adatkészletekre.
    * TO DO: Ha tartalmazza a jplAquariusSS minta adatkészletek bármelyikétERDDAP™Kérjük, változtassa meg a "V4-et" adatasetID"V5-re".
    * TO DO:actual\\_rangemost egy CF szabványos tulajdonság (CF-1.7) és egyértelműen azt mondja, hogy ha a változó használjaadd\\_offsetvagyscale\\_factoraz adatértékek csomagolására, majd aactual\\_rangeAz értékeknek a csomagolatlan adattípust kell használniuk, és csomagolatlan értékeknek kell lenniük. Sajnos ez a konfliktus az előző tanácsunkkal. GenerateDatasets Xml most csomagolatlanactual\\_rangeértékek, de ez nem javítja a meglévő adatkészleteket az Önbendatasets.xmlfájl.
        
Tehát, kérjük, ellenőrizze az adatkészleteit: ha a változó értékek csomagolva vannak, és haactual\\_rangecsomagolt adatértékként van meghatározva, kérjük, adjon hozzá&lt;addAttributes&gt; &gt; &gt; &gt;actual\\_rangeérték a nem csomagolt értékek meghatározásához. Ellenkező esetben az adatkészlet nem tölt beERDDAP... Egy egyszerű és szinte tökéletes módja ennek, hogy keresse adatasets.xmlForrás tulajdonságok, amelyek rendelkeznek
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
ésscale\\_factormás, mint 1.0. Ezek azok, akikactual\\_rangetulajdonságait, hogy meg kell oldani.
        
A tengely változók esetébenEDDGridadatkészletek,ERDDAP™mindig állítjaactual\\_rangeaz értékek tényleges tartományának tulajdonítható, mivel ismeri ezeket az értékeket.
        
A tengelyváltozatokhoz csökkenő értékekkel (pl. néhány szélességi változó) ,ERDDAP™teremtésactual\\_rangea\\[0 0\\]...\\[utolsó\\]értékek, amelyek magasak voltak... alacsonyak. Most mindig alacsony... magas értékeket használ az új CF meghatározáshoz.
        
A helyesség aactual\\_rangeaz értékek különösen fontosak az EDDTable adatkészletek számára, mertERDDAP™gyorsan elutasítja az adatértékek felhasználói kérelmeit, amelyek kevesebbek, mintactual\\_rangeminimális érték, vagy ami nagyobb, mintactual\\_rangemaximális érték.
        
Kapcsolódó: a tényleges\\_min, tényleges\\_max,data\\_minésdata\\_maxA tulajdonságokat most levonják. Kérjük, konvertálja az adatkészleteit használniactual\\_rangeEhelyett.
        
    * DO (opcionális, de ajánlott) : Minden közeli idejű és előre jelzett adatkészlet az ÖnERDDAP™Kérlek, add hozzá egy [&lt;testOutOfDate&gt;&gt;&gt;&gt;&gt;&gt; (/docs/server-admin/datasets#testoutofdate) címke értéke a formábannow-_nUnits_, pl.now-2 nap. Ha az adatkészlet maximális időértéke idősebb, mint ez az érték, az adatkészletet naprakésznek tekintik, és olyannak fogják jelölni, mint[outOfDateDatasets.html](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)weboldal. Ez egy egyszerű módja annak, hogy megnézze, hogy valami rossz az adatkészlet forrásával.
    *   [ÚJ: Semantic Markup of Datasets with json-ld (JSON Linked adatok) ](/docs/server-admin/additional-information#json-ld)  
        ERDDAP™most használ[json-ld (JSON Linked adatok) ](https://json-ld.org)az adatkatalógus és adatkészletek része[szemantikai web](https://en.wikipedia.org/wiki/Semantic_Web)A Tim Berners-Lee ötlete, hogy a webes tartalmat könnyebbé tegyük, és a gép "megérthetetlen". Keresőmotorok ([Google különösen](https://developers.google.com/search/docs/data-types/datasets)) és más szemantikai eszközök is használhatják ezt a strukturált markupot, hogy megkönnyítsék a felfedezést és indexelést. A json-ld strukturált markup láthatatlan embernek tűnik&lt;script&gt; kód a http://.../erddap/info/index.html Weboldal (ami egy szemantikus web[Adatkezelés](https://schema.org/DataCatalog)) és mindegyiken http://.../erddap/info/_datasetID_/index.html Weboldal (ami egy szemantikus web[Adatbázis](https://schema.org/Dataset)) ... (Speciális köszönet Adam Leadbetter és Rob Fuller a tengeri intézet Írországban, hogy a kemény része a munka, hogy ezt a részét a munka.ERDDAP...) 
    * NEW: Vannak új adatkészlettípusok, amelyek az audiofájlokból olvashatók:
        [EDDGridFromAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles), amely az audio adatokat hálózati adatokként kezeli.
        [EDDTableFromAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles), amely az audio adatokat mentő adatokként kezeli. Köszönhetően Jim Potemra, Rich Signell, OOI és Carrie Wall Bell az audio / hidrofon fájl támogatás iránti kérelmekért.
    * A GenerateDatasets változásai Xml (és a kapcsolódó változások) :
        * NEW:ERDDAP™most van egy rendszer automatikusan[naprakész URL-ek frissítése](/docs/server-admin/additional-information#out-of-date-urls)mindkettő a GenerateDatasets-ben Xml és az adatkészletek betöltésekor. Ha javaslatai vannak további URL-ekre, amelyeket le kell ragadni és frissíteni, vagy ha úgy gondolja, hogy ez egy szolgáltatássá válik (mint a konverterek) Kérlek e-mailterd.data at noaa.gov...
        * NEW: Most, ha a GenerateDatasets Xml látja a CF-tstandard\\_name  (aminek minden alsóbb esetnek kell lennie) egy uppercase karakterrel, hozzáadja az összes alsó tételes verziót&lt;addAttributes&gt;. Is, ha egy adatkészlet terheli, haERDDAP™látja a CF-tstandard\\_nameegy felsőfokú karakterrel, csendben megváltoztatja aztstandard\\_name... Rich Signellnek köszönhetően.
        * NEW: Most, ha a GenerateDatasets Az Xml olyan tulajdonságot lát, amely nem ISO 8601 formátumban van, hozzáadja az ISO 8601 formátumú időt&lt;addAttributes&gt;. HaERDDAP™nem ismeri fel a formátumot, változatlanul hagyja az időértéket. Ha egy formátumot látsz,ERDDAP™nem ismeri fel és rögzíti, kérem e-mailt, hogyerd.data at noaa.gov...
        * IMPROVED: Az alacsony szintű kód azEDDGridFromThredd Katalógus opció a GenerateDatasets-ben Az Xml most aUnidatanetcdf-java katalógus személyzeti kód (Szárak. katalógus osztályok) hogy kezelje az összes THREDDS katalógust (amely meglepően bonyolult lehet) ... Roland Schweitzernek köszönhetően ezt a változást javasolja, és ennek köszönhetőenUnidataa kódhoz.
        * NEW: GenerateDatasets Xml azEDDGridFromDap most hozzáadja a ", startYear-EndYear"-t a tényleges idő tengelyértékek alapján. EndYear="present", ha az adatok az elmúlt 150 napban léteznek.
        * NEW: GenerateDatasets Xml azEDDGridFromDap hozzáteszi ",\\[állásfoglalás\\]°" a címre, ha az adatkészlet egyenletes, és ugyanaz a lat és a lon.
        * IMPROVED: Az időátalakítónak most további jellemzői vannak, nevezetesen a képesség, hogy a szigorú időket az ISO 8601-es sztrájkok széles skálájába konvertálja, vagy egy UDUnits-kompatibilis számba. Minden korábban támogatott funkció továbbra is működik, változatlan.
        * BUG FIX: GenerateDatasets Xml és a kulcsszavak átalakítója most magában foglalja a "Föld tudomány" -t a GCMD Science Keywords kezdetén. Amikor egy adatkészletet töltenek beERDDAP™,ERDDAP™most rögzíti a GCMD kulcsszavakat a kulcsszavakban, amelyek nem kezdődnek a "Föld Tudomány" -val, vagy amelyek mást használnak, mint a címes eset (ahol minden szó első betűje kapitalizálódik) ...
        * IMPROVED: Amikor javasoljuk&lt;destinationName&gt;, GenerateDatasets Xml EDDTableFromAsciiFiles csak használta a farok végénsourceNameS'/'  (Néhányan fájlnév-szerűek voltak) ... Most az egészet használjasourceName(pl.: „blahblahblah (m/s)”. Ez a változás jó lesz néhány adatkészlet számára, és nem mások számára, de biztonságosabb viselkedés. Maurice Libesnek köszönhetően.
        * BUG FIX: GenerateDatasets Az Xml és az adatkészlet-konstrukciók most biztosítják, hogy nincsenek duplikált oszlop nevek. Maurice Libesnek köszönhetően.
        * BUG FIX: GenerateDatasets Xml EDDTableFromAsciiFiles nem írt&lt;oszlopSeparator&gt; a kimenethez. Most ezt teszi. Maurice Libesnek köszönhetően.
    * NEW: A DasDds eszköz most kinyomtatja az időbeli szakadék információit (a[TimeGaps információ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)) ha az adathalmaz megrúgott adathalmaz.
    * NEW: Az Advanced Search most elfogadja a "now_\\-nUnits_" időértékeket. Rich Signellnek köszönhetően.
    * IMPROVED: A biztonság javítása érdekében, amikor egy e-mail cím egy adatkészlet metaadatában vagy adatait egy html weboldalra írják, a "@" helyébe ". Ez csak olyan e-mail címeket tartalmaz, amelyek az egész metaadat vagy adatérték, nem pedig az e-mail címek, amelyeket hosszabb értékekbe foglaltak.
    * IMPROVED: A biztonság növelése, aRSSA magánadatbázisokra vonatkozó információk jelenleg csak a felhasználók rendelkezésére állnak (ésRSSolvasók) aki be van jelentkezve és engedélyezve, hogy használja ezt az adatkészletet.
    * NEW: Most, amikor egy adatkészletet töltenek be, hadate\\_created,date\\_issued,date\\_modified, vagy dátum \\_metadata\\_modified attribute rendelkezik olyan időértékkel, amely nem ISO 8601 formátumban van,ERDDAP™megváltoztatja az ISO 8601 formázott időt. HaERDDAP™nem ismeri fel a formátumot, változatlanul hagyja az időértéket. Ha egy formátumot látsz,ERDDAP™nem ismeri fel és rögzíti, kérem e-mailt, hogyerd.data at noaa.gov...
    * IMPROVED: .dods válaszokEDDGridAz adatkészleteknek most jelentősen gyorsabbnak kell lenniük. Rich Signellnek köszönhetően.
    * Változások kapcsolódnakERDDAPISO 19115 dokumentumok létrehozása:
        * BUG FIX: az ISO 19115 dokumentumok létrehozásakor,dataVariableAz egységek nem voltak HTML tulajdonsága kódolt és százaléka kódolt. Most ők is. Az NGDC ISO 19115 validátorának köszönhetően.
        * BUG FIX: az ISO 19115 dokumentumok létrehozásakor,date\\_createdÚgy használták, mint az, gyakran rossz formátum volt. Most átalakul az ISO 8601 Z sztringre. Az NGDC ISO 19115 validátorának köszönhetően.
        * BUG FIX: az ISO 19115 dokumentumok létrehozásakor,ERDDAP™most már ír dátumokat az év =00 (mint a climatológia adatkészletek) Mivel az ISO 19115 schema nem engedélyezi a dátumokat az év=0000-val. Az NGDC ISO 19115 validátorának köszönhetően.
    * ÚJ: Mint a kérés előtthttp.../erddap/version csak a verziószámot fogja visszaadni (szöveg) pl.: "ERDDAP\\_version=1.82.
Most egy kéréshttp.../erddap/version\\_string visszatér egy számot, és egy opcionális elegendő "\\_" plus ASCII szöveg (Nincs űr vagy kontroll karakter) pl.: "ERDDAP\\_version\\_string=1.82\\_JohnsFork. A villát végző emberek ezt az EDStatic.erddapVersion megváltoztatásával fogják meghatározni. Ez a módja annak, hogy ez nem okoz problémákat a korábbi verziókERDDAP... Axiomnak köszönhetően (nevezetesen Kyle Wilcox) Írország tengerészeti intézete (nevezetesen Rob Fuller) ...
    * BUG FIX: wms verzió=1.3.0, kérés=GetMapcrs=EPSG:4326 (nem CRS:84) kérések: a bbox megrendelésnek minLat,minLon,maxLat,maxLonnak kell lennie. CRS:84 kérések, mint korábban, bbox megrendelés kell minLon,minLat,maxLon,maxLat. Ez javíthatja a használatátERDDAPAWMS1.3.0 szolgáltatásArcGIS  (Köszönöm Paola Arce) ... Köszönöm (nem) aOGChogy ezt oly bonyolultsá tegyük. KöszönömLeafletezt helyesen kezelni, és megadni nekem a módját, hogy ezt teszteljem.
    * IMPROVED: Előző, a javasolt link aRSSés e-mail előfizetések rendelkeznekhttpURL az Ön számáraERDDAP... Most ez azhttpsURL, ha ez aktív.
    * NEW:EDDGridCopy most támogatja az opcionális címkét&lt;dalszöveg: SomeValue_&lt;/onlySince&gt;, ahol az érték egy specifikus ISO-8601-formatált idő vagynow-nUnits (pl.:now-2 év) Idő. Lásd:[csak Dokumentáció óta](/docs/server-admin/datasets#onlysince)... Drew P.
    * IMPROVED: Ha elérhető,ERDDAP™MegmutatjahttpsURL (a&lt;baseHttpsUrl&gt;, ha rendelkezésre áll) helyetthttpURL, ha azt mondja a felhasználóknak, hogy az URL hozzáadja / eltávolítja / eltávolítja / listázza az előfizetést.
    * BUG FIX:ERDDAP™most lehetővé teszi az előfizetési akció elindítását " https://" ... (Bob megöli az előrelátását.) Jennifer Sevadjiannak köszönhetően.
    * BUG FIX:.jsonlKVPmost „:” minden kulcs és érték között, ahelyett, hogy'='... (Bob megöli az előrelátását.) Alexander Barthnak köszönhetően.
    * BUG FIX: Korábban, ha újraindítottERDDAP™A gyorsRestart=true-val, és ha az adatkészletet általában újratöltették, felhívott egy EDDTableFromFiles adatkészletre, amely frissítette az EveryNMillis-t, és ha egy adatfájl csak megváltozott volna, a kérés nullponter hiba esetén kudarcot vall. Most a kérés sikeres lesz. John Kerfootnak köszönhetően.
    * NEW: Amikor egy adatkészletet betöltenekERDDAP™A kulcsszavak most átrendezett rendbe kerülnek, és minden újvonal karaktert eltávolítanak.
    * IMPROVED: Most, ha egy .geoJson,.jsonvagy.ncoJson kérés.jsonp paraméter, a válasz mime típus alkalmazás/javascript. Vegyük észre, hogy.jsonp nem támogatott.jsonlCSVvagy.jsonlKVPMivel nem működne. Rob Fullernek köszönhetően.
    * IMPROVED: A json sorok mime típusa a fájlType opciók most "alkalmazási/x-jsonlines". Ez volt az alkalmazás/jsonl. Jelenleg nincs végleges helyes választás.
    * IMPROVED: A status.html oldalon bemutatott sikertelen kérések száma növekszik, mert több dolgot számítanak kudarcnak, mint korábban, például a ClientAbortException.
    * IMPROVED: Most, ha válasz aERDDAP™nem tömörül, majd a válasz vezetője magában foglalja a "Content-Encoding"="identitást".
    * IMPROVED: A „licensz” tulajdonság nem volt szükség. Most, ha nem van megjelölve, a standardLicense az üzenetekből.xml (vagy a setup.xml, ha jelen van) az alapértelmezésként használják.
    * NEW: Most van egy opcionális[fájlAccessSuffix tulajdonság](/docs/server-admin/datasets#fileaccessbaseurl). amely használható a meglévő[fájlAccessBaseUrl tulajdonság](/docs/server-admin/datasets#fileaccessbaseurl)...
    * IMPROVED: A biztonság növelése érdekében ez a verzió a legutóbbiJavaJDK v8u162.
    * NEW: A biztonság növelése, számos közös domain, amelyek ideiglenes e-mail címeket kínálnak (pl.: @mailinator.com) most egy állandó e-mail feketelistán van az előfizetési rendszerhez.
    * NEW: A biztonság növelése érdekében a Daily jelentésben jelenleg a következőket tartalmazza:
Beállítások Flag IP cím hibás (az utolsó napi jelentés óta)   
Beállítások Flag IP cím hibás (Kezdőlap)   
Beállítások Flag IP cím sikeres (az utolsó napi jelentés óta)   
Beállítások Flag IP cím sikeres (Kezdőlap)   
A "csalódott" hazugságok azt látják, kik (Hacker?) zászlót próbál beállítani, de kudarcot vall.
    * IMPROVED: A biztonság növelése, az e-mail címek a&lt;ElőfizetésEmailBlacklist&gt; az Öndatasets.xmlmost eseti érzékenynek tekintik.
         

## Verzió 1.80{#version-180} 
 (közzétett 2017-08-04) 

*    **Új funkciók (felhasználók számára) :**   
     
    * ÚjorderByCount () A szűrő lehetővé teszi, hogy megadja, hogyan rendezik az eredménytáblát (vagy nem) és csak egy sort tér vissza minden egyes csoporthoz, a nem elbocsátott értékek számával minden változóban.
Például,orderByCount ("..."stationID"...") rendezni fogstationIDés térj vissza egy sort mindegyikrestationID, a nem ígéretes értékek számával minden változó esetében.
Ha csak megadjaorderByCount ("") A válasz csak egy sor lesz az egyes adatokra vonatkozó nem megfelelő értékek számával.
Lásd:[orderBy... dokumentáció](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy)Ben Adamsnak köszönhetően.
    * Új.ncoJson fájl Típusú lehetőség a rácsos és tabuláris adatkészletekre. Ez az opció teszi egyNCOlvl=2 "pedantic" JSON fájl minden információval általában egy.ncfájl. Lásd[ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json)Charlie Zendernek köszönhetően.
    * BUG FIX: AorderBy... () A Make A Graph weboldalán található lehetőségeket most helyesen kezelik.
    * BUG FIX: .geoJson kimenet most nem nyomtatott sorokat, ahol hiányzik a lat vagy a lon értékek. Szintén magassági értékek (ha rendelkezésre áll) most szerepelnek a koordinátákban, nem pedig adatértékként. Jonathan Wilkinsnek köszönhetően.
         
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:**   
     
    * SECURITY ISSUE: A protokollok.js könyvtár használt aOpenLayersDemo onWMSoldalakERDDAP™naprakész, és van egy hiba, amely potenciálisan lehetővé teszi, hogy visszaéljen. (Sajnos, frissítésOpenLayersés protokollok. A js nem könnyű.) Ez megnyitja azt a lehetőséget, hogy a könyvtár felállítható, hogy lehetővé tegye a helyszíni sebezhetőséget. Azonban, mivelERDDAP™csak használatOpenLayersspecifikus előre beállított módon és csak specifikusanERDDAP- alapú adatforrások, úgy véljük, nincs keresztoldali sebezhetőségERDDAPHasználataOpenLayersprotokollok.js. Azonban, ha nem hiszed ezt, akkor most már letilthatja a használatátOpenLayersDemo onWMSoldalaiERDDAP™hozzáadásával
```
        <openLayersActive>false</openLayersActive>  
```
a setup.xml fájlhoz. Az alapértelmezett "igaz". Charles Carletonnak és NCEI-nek köszönhetően.
    * SECURITY CHANGES: Felhasználatlan .jar fájlok és duplikálja .jar fájlokat (mert ők is a netcdfAll.jar) eltávolították őket aERDDAP™elosztás. A naprakész .jar fájlokat frissítették. Charles Carletonnak és NCEI-nek köszönhetően.
    * SZECURITY CHANGES: A netcdfAll.jar fájl, amely elosztottERDDAP™a legújabb verzió (Jelenleg 4.6.10) , de még mindig tartalmaz belső jackson .jar fájlokat, amelyekről ismert, hogy naprakésszé válnak, és biztonsági sebezhetőségekkel rendelkeznek, nevezetesen a Jackson könyvtárak, amelyeket csak az Amazon S3 adatforrásokhoz használnak. Ha nem hozzáfér az adatokhoz az Amazon S3-on keresztül (Tudnád, hogy te vagy) Ezek a sebezhetőségek nem relevánsak.
        
A netcdf-java fejlesztők fenntartják, hogy ezek a sebezhetőségek nem relevánsak, mivel a netcdf kód ezeket a könyvtárakat használja, és minden esetben csak az Amazon S3-hoz való hozzáférés esetén lenne releváns. Lásd[ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866)... Hiszem őket. Ha még mindig vannak aggodalmai ennek, kérjük, vegye fel a kapcsolatot a netcdf-java fejlesztők. (Vedd figyelembe, hogy ha nem hiszed a netcdf-java fejlesztőket, és ne használja őketERDDAP™Emiatt nem szabad használni a THREDDS-t, mert a THREDS a netcdf-java-t alapvetően és kiterjedtebben használja, mintERDDAP...) 
        
Részletek: A gondos kód és a kiszolgáltatott figyelmeztetések:
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml
Lásd https://nvd.nist.gov/vuln/detail/CVE-2016-7051 - Magas
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.dataformat/jackson-dataformat-cbor/pom.xml
Lásd https://nvd.nist.gov/vuln/detail/CVE-2016-7051 - Magas
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-annotations/pom.xml
Lásd https://nvd.nist.gov/vuln/detail/CVE-2016-7051 - Magas
Lásd https://nvd.nist.gov/vuln/detail/CVE-2016-3720 - Kritikus
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml
Lásd https://nvd.nist.gov/vuln/detail/CVE-2016-7051 - Magas
Lásd https://nvd.nist.gov/vuln/detail/CVE-2016-3720 - Kritikus
"A 4.6.10-es verzióhoz az aws-java-sdk-core pulls a 2.6.6-os jackson-\\* műtárgyakban." (e-mail a netcdf-java emberektől) ...
Charles Carletonnak és NCEI-nek köszönhetően.
        
    * COMPILER CHANGES: Ha összeállítodERDDAP™, vegye figyelembe, hogy a parancssorhoz szükséges -cp osztálypata paraméter sokkal rövidebb, mint korábban. Lásd az új -cp beállítást[ez a dokumentáció](/docs/contributing/programmer-guide#development-environment)... Charles Carletonnak és NCEI-nek köszönhetően.
    * NEW OPTION in GenerateDatasets Xml: EDDTableFromBcodmo, amely csak belső használatra vonatkozik a BCO-DMO-ban.
Adam Shepherdnek és BCODMO-nak köszönhetően.
    * NEW ATTRIBUTE és FEATURE: Ha egy EDDTable oszlop rendelkezik a webes hozzáférhető fájlok fájlneveivel (pl. kép, videó vagy audio fájlok) Hozzáadhat
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
a bázis URL megadásához (befejezés /) szükséges, hogy a fájlnév teljes URL-ek. Aztán.htmlTableválaszok,ERDDAP™megjeleníti a fájlnév, mint a link a kombinált URL (az alap Url plusz a fájlnév) ...
Ha akarodERDDAP™a kapcsolódó fájlok kiszolgálása, külön EDDTableFromFileNames adatkészlet készítése ezekhez a fájlokhoz (lehet magán adatkészlet) ...
Adam Shepherdnek és BCODMO-nak köszönhetően.
    * ÚJ ATTRIBUTE RECOMMENDATION: Ha egy EDDTable oszlop rendelkezik fájlnévekkel web hozzáférhető fájlokat (pl. kép, videó vagy audio fájlok) amely egy archívumon keresztül elérhető (pl.:.zipfájl) hozzáférhető egy URL-en keresztül, használat
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
meghatározni az URL-t az archívum számára.
Ha akarodERDDAP™hogy szolgálja az archív fájlt, készítsen külön EDDTableFromFileNames adatkészletet az adott fájlhoz (lehet magán adatkészlet) ...
Adam Shepherdnek és BCODMO-nak köszönhetően.
    * IMPROVEMENTS generálniDatasets Xml az érvénytelen/rossz okainak eltávolítására&lt;subsetVariables&gt; Javaslatok és duplikáció / bad javasolta változó nevek, stb. Rich Signellnek, Adam Shepherdnek és BCO-DMO-nak köszönhetően.
    * ÚJ VÁLASZ: A politikai határokon átnyúló információ, amelyet aERDDAPegy harmadik féltől származik, és kissé naprakész. Vannak vitatott határok a világ számos helyén, ahol különböző emberek lesznek különböző ötletek arról, hogy mi helyes. NEM KAPCSOLÓDÓ A POLITIKAI BOUNDARY DATA SZÜKSÉGEERDDAP... Ha nem szereted a politikai határinformációkat, amelyek jönnekERDDAP™Most már elmondhatodERDDAP™soha ne rajzoljon politikai határokat azáltal, hogy hozzáadja
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
a setup.xml fájlhoz. Az alapértelmezett "igaz". Raju Devendernek köszönhetően.
    * METADATA TAG: Adatasets.xmlegy adatkészlethez most meghatározhatja az alapértelmezett színszámot Bar szakaszok egydataVariablegrafikonokon és térképeken
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (default=-1, ami azt mondja, hogy engedjükERDDAP™döntés) ... Lásd:[szín Bar beállítások](/docs/server-admin/datasets#color-bar-attributes)...
    * IMPROVED: az állami határ színe a térképeken a lila (Mély lila az Ön számára Baby Boomers) ... Most szürke (a nemzeti határszürke és a szürke között) ...
    * BUG FIX:&lt;Iso19115Fil&gt; és&lt;fgdcFile&gt;datasets.xmlnem mindig kezelték megfelelően. Most ők is. A BCO-DMO-nak köszönhetően.

## Verzió 1.78{#version-178} 
 (közzétett 2017-05-27) 

*    **Új funkciók (felhasználók számára) :**   
     
    *    (Nem)   
         
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:**   
     
    * IMPROVED: A sorrend a "Major LoadDatasets Time Series" a status.html oldalon most a legrégebbi az alján.
    * BUG FIX:ERDDAP™most írja.nccsvfájlok az idő változójaactual\\_rangemint ISO-8601 String idő. Ez rögzíti a hiba EDDTableFromErddap parsing info egy távoli adatkészlet és a gyorsRestart fájl minden EDDTableFrom... Files adatkészletek. (Az időactual\\_rangeRossz lesz az első alkalom, hogy az adatkészlet v1.78-ban van, de helyes, miután újratöltődik, pl. ha zászlózik az adatkészletet.) 

## Verzió 1.76{#version-176} 
 (közzétett 2017-05-12) 

*    **Új funkciók (felhasználók számára) :**   
     
    * CHANGE Tomcatban: A kérésekhezERDDAP™a webböngészőktől eltérő szoftverekből jön (pl.:curlR,Matlab,Python,Java) :
Mint a Tomcat verzióinak korábbi módosításai (az alacsonyabb szintű szoftver, amely futERDDAP) 2016 eleje óta a kérés URL lekérdezésének több karakterének kell lennie[ **Percent kódolva** ](/docs/server-admin/datasets#infourl)biztonsági okokból. A böngészők gondoskodnak a százalékos kódolásról az Ön számára. használatERDDAP™egy böngészőben nem érintett, kivéve, ha a kérés átirányul egy másikraERDDAP...
    * Előzőleg,ERDDAP™kezelt **char változók** jobban, mint a nem aláírt rövid integrátorok, mint a karakterek. Most úgy kezeli őket, mint az 1 karakterhosszú UCS-2 (Unicode) Húrok. Lásd:[char dokumentáció](/docs/server-admin/datasets#char)... Az Aurelie Briandnek és az Argo projektnek köszönhetően.
    * Előzőleg,ERDDAP™Kis támogatást nyújtanak **Unicode karakterek** felett karakter #255 Strings. Most, belsőleg,ERDDAP™teljes mértékben támogatja a 2 fehér UCS-2 chars (karakterek száma 0 65535) Húrokban. Amikor a String adatokat különböző fájltípusokra írják,ERDDAP™a legjobb, hogy támogassa a 2 fehér chars. Egy másik példa az .csv fájlok, amelyekERDDAP™írja az ISO-8859-1 charset (1 fehér charset) , ígyERDDAP™ír minden karakter felett #255 a JSON-szerű \\u_hhhh_ szintax. Lásd[String adatok](/docs/server-admin/datasets#string)...
    * IMPROVED: In.ncfájlok írtaERDDAP™, char variables to interpreted as Strings lesz a tulajdonsága
         **\\_Encoding=ISO-8859-1**   
Inkább.ncfájlok által olvasottERDDAP™A "\\_Encoding" jótékonysági változókat a meghatározott jelzáloghitelekkel fogják értelmezni.
    * REMINDER:ERDDAP™támogatás **JSON-szerű backslash kódolás** speciális karakterek, ha megadja a char és a String változókat. Így kérhet valamit, mint &myString="\\u20ac", amikor olyan adatokat akar, ahol a myString=€ 20ac óta az euró szimbólumának hexadecimális változata. Számos forrás az interneten bemutatja az Unicode szimbólumok kódszámát, például[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode)...
    * Előzőleg,ERDDAP™korlátozott támogatást nyújtottak **hosszú integráló** változók. MostERDDAP™teljes mértékben támogatja a hosszúságokat belsőleg, és a legjobb, ha hosszú adatokat ír különböző fájltípusokra. Lásd:[hosszú dokumentáció](/docs/server-admin/datasets#long)... Az Írország tengerészeti intézetének, Craig Risiennek, Rich Signellnek, Christopher Wingardnak és OOI-nak köszönhetően.
    * NEW: kimeneti fájltípus griddap éstabledap: **.nccsv** , ami egyNetCDF- mint az ASCII, CSV fájl, amely tartalmazza az összes metaadatot, amely összehasonlítható lenne.ncfájl. Lásd:[NCCSV Specifikáció](/docs/user/nccsv-1.00)... Steve Hankinnak köszönhetően.
    * NEW: **orderByClosestSzűrő** lehetővé teszi, hogy megadja, hogyan rendezik az eredménytáblát, és egy intervallum (pl. 2 óra) ... Minden egyes csoporton belül csak az intervallumhoz legközelebbi sorokat fogják tartani. Például,orderByClosest ("..."stationIDIdő, 2 óra") rendezni fogstationIDés idő, de csak vissza a sorokat minden egyesstationIDahol az utolsóorderByoszlop (Idő) közel 2 órás intervallum. Ez a legközelebbi dologtabledapértékek ösztönzése egy griddap kérelemben. Ezt az opciót bármelyik oldalon meg lehet határoznitabledapAz adatkészlet .html weboldala, .graph weboldala, és bármilyen URL által, amelyet Ön generál. Az Írország tengerészeti intézetének és az Ocean Networks Canada-nak köszönhetően.
    * NEW: **orderByLimitSzűrő** Határozza meg, hogyan rendezik meg az eredménytáblát, és korlátozza a számot (pl. 100) ... Minden egyes csoporton belül csak az első „korlát” sorokat fogják megtartani. Például,orderByMax ("..."stationID100") rendezni fogstationIDDe csak az első 100 sort adja vissza mindegyiknekstationID... Ez hasonló az SQL LIMIT záradékához. Ezt az opciót bármelyik oldalon meg lehet határoznitabledapAz adatkészlet .html weboldala, .graph weboldala, és bármilyen URL által, amelyet Ön generál. Az Írország tengerészeti intézetének és az Ocean Networks Canada-nak köszönhetően.
    * NEW: Két új válaszfájltípus, **.jsonlCSVés.jsonlKVP** rendelkezésre állnak a megfogott adatkészletek, tabuláris adatkészletek és sok más helyenERDDAP  (pl. az adatkészletekkel kapcsolatos információk kérése) ... A fájlok JSON Lines fájlok ([ https://jsonlines.org/ ](https://jsonlines.org/)) ahol minden sor külön JSON objektummal rendelkezik..jsonlCSVcsak az értékek egy CSV formátumban..jsonlKVPVan Key: Értékpárok. Minden vonal önmagában áll. A vonalakat nem zárják be egy nagyobb JSON tömbben vagy tárgyban. Például lásd[Ez a mintakérelem](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z)... Damian Smythnek, Rob Fullernek, Adam Leadbetternek és Írország tengerészeti intézetének köszönhetően.
    * ÚJ: Van új dokumentáció, amely leírja[ **Hogyan érhető el a magánadatokERDDAP™Szövegek** ](/docs/user/AccessToPrivateDatasets)... Lynn DeWittnek köszönhetően.
    * IMPROVED: A minimális mértékű **OpenLayers** A térkép 2 fok volt, és most 4 adatpixel. Rusty Hollemannak köszönhetően.
    * IMPROVED: Bizonyos közös esetekben olyan kérelmek, amelyek tartalmaznak egy **rendszeres kifejezés** a korlátozást sokkal gyorsabban fogják feldolgozni.
         
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:**   
     
    *    **SLOW FIRST STARTUP:** Az első alkalommal, amikor elkezdi ezt az új verziót, hosszú időbe telikERDDAP™az összes adatkészlet betöltése, mert újra kell olvasnia az összes forrásadatot (bár csak a rácsos adatfájlok vezetője) ... Ha megnézi a naplókat, láthatja a hibaüzeneteket, amelyek azt mondják, hogy egyes belső fájlok „régi/nem támogatott továbbfejlesztett verziója” - ez rendben van -ERDDAP™a belső fájlok új verzióit készíti. Kérjük, légy türelmes&#33;
    * ACTION:ERDDAP™most használja az újat **java.time** osztályok (JSR 310 néven ismert) Joda helyett, hogy a String-időket numerikus időkre tegye. Megjegyzések:
        * HaERDDAP™hirtelen problémái vannak, amelyek a String-időt egy adott adatkészletre választják, és így csak a NaN legtöbbször átalakítja a (hiányzó értékek) A probléma szinte mindig a dátummal Az idő formátum azt állítja, hogy a változó "egyetemeként" meghatározott. Az új rendszernek néha kissé eltérő dátumTime formátumú stringre van szüksége.
        * Ha a numerikus hónapok és napok a dátumbanA húrok nem 0-padded (pl.: "3/7/2016") Győződjön meg róla, hogy a formátum csak egy M és d (pl. „M/d/yyyy”, nem „MM/dd/yyyy”) ...
        * Változtasson bármilyen frakcionális másodperc specifikációt, amely az alkatrészt használja (pl. a .ss inyyyy-MM-ddT'HH:mm:ss.ss) , fővárosba S's, (pl.:yyyy-MM-ddT'HH:mm:ss.SS) ...
        *   ERDDAP™már nem támogatja a sztring dátumot Időformátumok kétszámjegyű évekkel (Igen,) egy implied évszázaddal (pl.: 1900 vagy 2000) ... A vállalkozások milliárd dollárt költöttek erre a problémára az 1990-es évek végén. A tudósoknak nem szabad két számjegyévet használniuk. Kérjük, javítsa ki a forrásfájlt (s) 4 számjegyű évre való áttérés, majd használjon igent a dátumban Idő formátum.
        * Használhatja Yyyy vagy YYYY (melyikERDDAP™átalakítja az uuuu) 4 számjegyév, beleértve a negatív évet, például -4712 (amely 4713 BC) ... A SeaDataNetnek, Thomas Gardnernek és a BODC-nek köszönhetően.
        * Kérjük, továbbra is használja Z egy dátumTime formátumot kapniERDDAPparázz egy idő ofszet (pl. Z, +0200, -08, -0800, -08:30) ...
        *    **Győződjön meg róla, hogy használjaJava1.8.0\\_21 vagy annál magasabb verzió.** 
        * Programozók - Ha írszJavaprogramok futásERDDAP™kód, el kell távolítania a joda-időre való hivatkozást. jar az osztályút paraméterében.
    * NEW:ERDDAPA[Archívum Adatkészlet eszköz](/docs/server-admin/additional-information#archiveadataset)most hozhat létre[ **BagIt fájlok** ](https://en.wikipedia.org/wiki/BagIt)... Az NCEI szabványosíthatja ezt a formátumot. Köszönhetően Scott Cross és John Relph.
    * IMPROVED: Az erddap letöltéséhez kapcsolódó linkek. háború aERDDAP™weboldalak most rámutatnak **GitHub** ... (Ezek nyilvános linkek, így nem kell csatlakoznia a GitHubhoz.) Ez sokkal gyorsabb letöltést jelent (12 Mb/s versus 1Mb/s) és néhány probléma a letöltésekkel. Damian Smyth, Rob Fuller, Adam Leadbetter, Conor Delaney és Írország tengerészeti intézetének köszönhetően.
    * IMPROVED: A **status.html oldal és a napi Status Report e-mail** most tartalmaz egy "Major LoadDatasets Time Series" szakaszt, amely statisztikákat mutatERDDAP™a végén minden nagy terhelésDatasets az utolsó 100 fő terhelésDatasets. Hála a gondos RAID.
    * NEW: egy új, opcionális (de ajánlott) paraméter az EDDTableFromCassandra adatkészletekhez: ** &lt;partitionKeyCSV&gt; ** ] (/docs/server-admin/datasets#partitionkeycsv) ... Az Ocean Networks Canada-nak köszönhetően.
    * ÚJ: Az EDDTableFromAsciiFiles most támogatja ** &lt;oszlopSeparator&gt; ** paraméter. Ha null vagy "", az osztály kitalálja, mint korábban, Ellenkező esetben az első karaktert fogják használni, mint az oszlop elválasztó, amikor olvassa a fájlokat. A Sky Bristolnak és az Abigail Bensonnak köszönhetően.
    * Új: az új adatkészlet típusa,[ **EDDTableFromNccsvFiles** ](/docs/server-admin/datasets#eddtablefromnccsvfiles)Adatkészletet készíthet aggregálással[NCCSV .csv fájlok](/docs/user/nccsv-1.00)... Steve Hankinnak köszönhetően.
    * IMPROVED: **EDDTableFromErddap** most használ.nccsvinformációt szerezni távolrólERDDAPs és a metaadat info helyi archívuma. Ez lehetővé teszi a char és a hosszú adattípusok teljes támogatását, valamint az Unicode számára (UCS-2) charset for chars és Strings. Rob Fullernek és Írország tengerészeti intézetének köszönhetően.
    * IMPROVED: EDDTableFromErddap ésEDDGridFromErddap támogatás ** &lt;Átirányítás&gt;hamis&lt;/redirect&gt; ** amit mondERDDAP™Soha ne irányítsa a kérést a távolbaERDDAP... Az alapértelmezettség igaz. Ez akkor hasznos, ha a távoliERDDAP™privátERDDAP... Damian Smythnek, Rob Fullernek és Írország tengerészeti intézetének köszönhetően.
    * IMPROVED:ERDDAP™macska **törölt felhasználói kérések** előbb. ÉsERDDAP™most gyorsabban leáll, mert az alacsony szintű szálak gyorsabban leállnak. Hála a gondos RAID.
    *    **GenerateDatasets Xml:** 
        * ÚJ: Az új speciális EDDType "cdump" nyomtatott[ncdump](https://linux.die.net/man/1/ncdump)\\-szerű nyomtatás a vezető egy.ncfájl. Kinyomtathatja az adatértékeket a megadott változók esetében is (vagy lépjen be "semmi", hogy ne nyomtassa ki az adatértékeket) ... Ez azért hasznos, mert ncdump nélkül nehéz tudni, mi van egy fájlban, és így az EDDType meg kell határoznia a GenerateDatasetsXml-t. Craig Risiennek, Rich Signellnek, Christopher Wingardnak és OOI-nak köszönhetően.
        * ÚJ: SeaData Net adatok:
Adott esetben a GenerateDatasets Az Xml most egy specifikus szemantikai átalakulást végez egy távoli SPARQL lekérdezés segítségével: ha a változó metaadata tartalmaz egy sdn\\_paraméter\\_urn, például sdn\\_paraméter\\_urn = "SDN:P01:PSLTZZ01", GenerateDatasets Xml hozzáadja a megfelelő P02 tulajdonságot, pl. sdn\\_P02\\_urn = "SDN:P02::PSAL". Ha rendelkezik olyan adatkészletekkel, amelyek ezeket a tulajdonságokat használják, és ha aERDDAPA&lt;categoryAttributes&gt; a setup.xml tartalmazza a sdn\\_paraméter\\_urn és sdn\\_P02\\_urn, a felhasználók képesek lesznek használniERDDAP™Kategória keresési rendszer az adatkészletek kereséséhez ezeknek a tulajdonságoknak a sajátos értékeivel. Köszönhetően BODC és Alexandra Kokkinaki.
        * IMPROVED: GenerateDatasets Az Xml most sokat változtathttp://hivatkozások a metaadatábanhttps://adott esetben.
        * IMPROVED: GenerateDatasets Az Xml most megpróbálja kitalálni a Teremtőt\\_típust és a kiadót\\_típust.
        * IMPROVED: A változó adattípusok által javasolt GenerateDatasets Az Xml most egy kicsit jobb lesz. Köszönhetően Margaret O'Brien, LTER és EML.
        * IMPROVED: GenerateDatasets Az Xml jobb, ha meghatározza a&lt;cdm\\_data\\_type & gt; és hozzáadja a kapcsolódó, szükséges tulajdonságokat (pl.&lt;cdm\\_timeseries\\_variables & gt;), így elláthatja ezt az információt. Rich Signellnek köszönhetően.
        * IMPROVED: A GenerateDatasets-ben Xml, az EDDTable adatkészletek esetében, a javaslat&lt;subsetVariables&gt; most sokkal konzervatívabb. John Kerfootnak köszönhetően.
        * IMPROVED: Hadatasets.xmlegy adatkészlet esetében meghatározzafeatureTypede nem cdm\\_data\\_type,featureTypecdm\\_data\\_type-ként fogják használni. Rich Signellnek köszönhetően.
        * BUG FIX: generál Adatkészletek Az Xml most azt sugallja, hogy helyes&lt;adatType&gt; olyan adatváltozatokra, amelyekscale\\_factor,add\\_offsetés/vagy \\_ kijelölt tulajdonságok.
    * IMPROVED: AmikorERDDAP™megnyit egy.ncfájl, amely **rövidebb** mint kellene, hogy legyen (pl. nem kapott teljesen másolatot a helyére) ,ERDDAP™most úgy kezeli a fájlt, mint rossz. Korábban,ERDDAP™visszatért hiányzó értékek a fájl hiányzó részéhez, mert ez a netcdf-java alapértelmezett viselkedése.ERDDAP™most használ Ucar.nc2.iosp.netcdf3.N3header.disallowFileTruncation = igaz; Hála a gondos RAID és a keresztény Ward-Garrison.
    * IMPROVED: az ISO 19115 író most használja **Készítő\\_type** Ha jelen van.
    * IMPROVED:ERDDAP™most használja a legfrissebb netcdf-java v4.6.9, amely olvasható további típusú **netcdf-4 fájlok** ... Craig Risiennek, Rich Signellnek, Christopher Wingardnak és OOI-nak köszönhetően.
    * BUG FIX: elkerülje a bajt, ha a különböző forrásfájlok különböző adattípusokkal rendelkeznek egy adott változóhoz. Roy Mendelssohnnak és Eugene Burgernek köszönhetően.
    * BUG FIX: **Idő formátum konverziók** most jobban védettek a rossz időértékek ellen. Az NDBC-nek köszönhetően.
    * BUG FIX:EDDGridFromNcFiles Unpacked most kezeli az időértékeket **"hónapok óta..." és "évek óta..."** helyesen (növelve a hónapot vagy az évet, nem durván hozzáadva, pl. 30 nap ismételten) ... A Soda3.3.1-nek köszönhetően
    * BUG FIX: csak v1.74-ben, **Előfizetések** Szükséges cselekvés (pl.:http://...) , ami volt, és legyen opcionális.
    * BUG FIX:EDDGridFromMergeIRFiles.lowGetSourceMetadata () nem adott hozzá globális tulajdonságokat. Most ezt teszi.
         

## Verzió 1.74{#version-174} 
 (2016-10-07) 

*    **Új funkciók (felhasználók számára) :**   
     
    * Most, amikor az adatkészletek listája (All, vagy egy keresésből) egy weboldalon jelenik meg, a hosszú címek több sorban jelennek meg. Korábban egy hosszú cím közepét "..." váltotta fel. Köszönhetően Margaret O'Brien, LTER és EML.
         
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:**   
     
    * TO DO: A Linux számítógépeken változtassa meg az Apache-idő beállításokat, hogy az időigényes felhasználói kérések ne ütközzenek (ami gyakran úgy tűnik, mint egy "Proxy" vagy "Bad Gateway" hiba) ... Mint a gyökérfelhasználó:
        
        1. Módosítsa az Apachehttpd.conf fájl (általában /etc/httpd/conf/) :
Változtassa meg a meglévő&lt;Timeout&gt; beállítás (vagy adjon hozzá egyet a fájl végén) 3600-ig (másodpercek) Az alapértelmezett 60 vagy 120 másodperc helyett.
Változtassa meg a meglévő&lt;ProxyTimeout&gt; beállítás (vagy adjon hozzá egyet a fájl végén) 3600-ig (másodpercek) Az alapértelmezett 60 vagy 120 másodperc helyett.
        2. Restart Apache: /usr/sbin/apachectl - k kegyes (de néha más könyvtárban van) ...
        
Thomas Olivernek köszönhetően.
         
    * NEW:\\[bigParentDirectory/kemény Flag könyvtár
Ez úgy működik, mint a zászlós könyvtár, de a hardFlag verzió is törli az összes csípős adatkészlet információt. Nincsenek URL-ek a hardFlag beállításához. Ezt csak akkor lehet használni, ha egy fájlt helyezünk be az adott könyvtárba.
kemény A zászlók nagyon hasznosak, ha csinálsz valamit, ami változást okoz, hogyanERDDAP™olvassa el és értelmezi a forrásadatokat, például amikor új verziót telepítERDDAP™vagy ha bizonyos típusú változtatásokat tettél egy adatkészlet definíciójáradatasets.xml... Lásd[ez a dokumentáció](/docs/server-admin/additional-information#hard-flag)... John Kerfootnak és az összes Argo csoportnak köszönhetően.
         
    * NEW: GenerateDatasets Xml most rendelkezik EDDTableFromEML opcióval
amely egy ökológiai metaadata nyelven olvas egy adatkészlet leírását (EML) fájl, letölti a kapcsolódó adatfájlot, és egy darabot generáldatasets.xmlhogy az adatkészlet hozzáadható legyenERDDAP... Van egy EDDTableFromEMLBatch is, amely ugyanezt teszi az összes EML fájl számára egy könyvtárban. Ez nagyon jól működik, mert az EML kiváló munkát végez az adatkészlet leírására, és mivel a KNB és az LTER a tényleges adatfájlokat elérhetővé teszi.
EML pluszERDDAP™nagyszerű kombináció lehet, mivelERDDAP™közvetlenebb hozzáférést biztosíthat a felhasználók számára a KNB és az LTER adatok gazdagságához, és segítheti ezeket a projekteket az amerikai kormánynak[Közös hozzáférés a kutatási eredményekhez (PARR) követelmények](https://nosc.noaa.gov/EDMC/PD.DSP.php)a webszolgáltatáson keresztül elérhető adatok elkészítésével.
Lásd[ez a dokumentáció](/docs/server-admin/EDDTableFromEML)... Köszönhetően Margaret O'Brien, LTER és EML.
         
    * NEW: GenerateDatasets Xml most rendelkezik EDDTableFromInPort opcióval
amely az InPort XML fájlban olvas egy adatkészlet leírását, és megpróbál létrehozni egy darabotdatasets.xmlhogy az adatkészlet hozzáadható legyenERDDAP... Ez ritkán hozza létre az XML kész használt darabjátdatasets.xmlDe egy jó durva tervezetet hoz létre, amely jó kiindulópont az ember szerkesztéséhez.
Nagyszerű lenne, ha az InPortot használó emberek dokumentálnák az adatkészleteiket isERDDAP™a tényleges adatok elérhetővé tétele aERDDAPwebszolgáltatások és ezáltal megfelelnek az amerikai kormánynak ésNOAAA[Közös hozzáférés a kutatási eredményekhez (PARR) követelmények](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research)a webszolgáltatáson keresztül elérhető adatok elkészítésével. Ez egy olyan megoldás, amelyet most lehet használni. (erd.data at noaa.govboldog, hogy segítsen.)   
Lásd[ez a dokumentáció](/docs/server-admin/datasets#eddtablefrominport)... Evan Howellnek és Melanie Abecassisnak köszönhetően.
         
    * IMPROVED:ERDDAP™most használja a netcdf-java 4.6.6.
A korábbi verziókkal a netcdf-java elolvasott néhány kitöltő értéket (Talán csak a netcdf-4 fájlokban) mint 0. Most néhányat közülük úgy olvas, mint a netcdf standard teljes érték: -127 bytes, -32767 rövidnadrág, -21473647 ints.UnidataAz új viselkedés a megfelelő viselkedés. Ha az adatkészlet változója elkezdi mutatni az egyik ilyen értéket, ahol 0-at mutattak, hozzáadhatja, pl.
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
a változóaddAttributesMondd elERDDAP™kezelni ezt az értéket, mintmissing\\_value/\\_Fill Érték. Sok esetben azonban ez nem eredményezi a kívánt eredményt: 0. Ha igen, fontolja meg a fájlok módosításátNCOvagy újraírja a fájlokat. Panaszok? Kérjük, vegye fel a kapcsolatotUnidata;-)
         
    * dalszöveg: New TopographyDepth paletta
Arra ösztönözlek benneteket, hogy kapcsoljatok át az összes adatkészletet, amely az OceanDepth palettát használja az új TopographyDepth palettát, amely olyan, mint a Topography, kivéve a színeket, hogy alkalmas legyen a mély értékekre. (pozitív=down) magassági értékek helyett (pozitív=up) ... A paletta ajánlott beállításai:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * NEW FEATURE: Hírekmissing\\_valueés/vagy \\_FillValue
Ha egy String változó meghatározza amissing\\_valueés/vagy \\_FillValue,ERDDAP™most eltávolítja ezeket az értékeket az adatokból, és üres sztringgel helyettesíti őket, hogy a hiányzó értékek üres sztringeknek tűnjenek, mint más adatkészleteknél.ERDDAP... Köszönhetően Margaret O'Brien, LTER és EML.
         
    * NEW FEATURE: Helyi idők támogatása
A Stringsből származó forrásadatokkal rendelkező ütemváltozatok most egy időzónát adhatnak meg egy "time\\_zone"A tulajdonság, amely vezetERDDAP™átalakítani a helyi-time-zóna forrási időket (néhány a Standard időben, néhány a Daylight Saving Time) aZuluIdő. Az érvényes időzóna nevek listája valószínűleg azonos a TZ oszlop listáján[ez az asztal](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)... Az alapértelmezett "Zulu"..." A közös amerikai időzónák: US/Hawaii, US/Alaska, US/Cacific, US/Mountain, US/Arizona, US/Central, US/Kelet. Az időbélyegző változók számszerű forrásadatokkal, megadhatja a "time\\_zonetulajdonság, de az értéknek "Zulu" vagy "UTC". Köszönhetően Margaret O'Brien, LTER és EML.
         
    * NEW FEATURE: EDDTableFromAsciiFiles most támogatja a szemicolon-választott fájlokat
és okosabb az elválasztó kitalálásáról. Köszönhetően Margaret O'Brien, LTER és EML.
         
    * NEW FEATURE: Ha jelentős hiba van a loadDatasets-ben (nagy vagy kisebb, például egy hiányzó vagy érvénytelendatasets.xmldokumentum) ,ERDDAP™most jelzi a status.html-ben, közvetlenül a "n Datasets Failed to Load" alatt, mint ERROR: miközben a feldolgozásdatasets.xml: lásd a log.txtot a részletekhez.
         
    * NEW FEATURE:ERDDAP™keres árvák.
MikorERDDAP™jelentős terhelés Adatkészletek, most az árva adatkészleteket keresi (olyan adatkészletek, amelyekERDDAP™de nemdatasets.xml) ... Ha megállapítják, akkor status.html-ben szerepelnek, közvetlenül a "n Datasets Failed to Load" alatt, mint ERROR: n Orphan Datasets (adatkészletekERDDAP™de nemdatasets.xml) = ....
Ha eltávolítani akar (Betöltés) dalszöveg: orphanERDDAP™Hozzá kell adnia
        &lt;Dataset Type="_anyValidType_"datasetID="_theDatasetID_" aktív="hamis" /&gt;
adatasets.xmlamíg az adatkészlet nem töltődik be a következő nagy terhelés alatt.
         
    * BUG FIX: Ha egy adatkészletnek numerikus időbélyegzője változó volt más egységekkel, mint"seconds since 1970-01-01T00:00:00Z"és&lt;frissítésEveryNMillis&gt; rendszer aktív, az időbélyegző változó tartományt helytelenül határozták meg, amikor az adatkészletet frissítették. John Kerfootnak köszönhetően.
         
    * BUG FIX: Ha&lt;A gyorsRestart&gt; igaz volt a setup.xml-ben, és adatokat kért egy EDDTableF-től... Files adatkészlet, amely használt&lt;frissítésEveryNMillis&gt; az adatkészlet első kérése kudarcot vall, de a későbbi kérések sikeresek lesznek. Most az első kérés nem fog kudarcot vallani. John Kerfootnak köszönhetően.
         
    * BUG FIX: A GenerateDatasetsXml.sh és .bat nem működött a parancssor 9 paraméterével. Most ők teszik. John Kerfootnak köszönhetően.
         
    * BUG FIX: Az új EDDTableFromMultidimNcFiles nem volt következetesen eltávolítva nyomkövető tereket a húroktól. Most ezt teszi. Különösen ez befolyásolta az ARGO fájlokat. Kevin O'Briennek és Roland Schweitzernek köszönhetően.
         
    * BUG FIX: Minden távoli hozzáférésDAPa szolgáltatások most kezdeményezi a modernebb kódot. Ez rögzíti a "csatlakozás zárt" hibát, amikor hozzáfér néhány EDDTableFromErddap adatkészlethez. Kevin O'Briennek köszönhetően.
         
    * BUG FIX: A kezelésorderBy... () Különböző () most visszatértek a legutóbbi változások előtt: egy adott kérelemnek lehet többorderBy... () vagy külön () szűrő;ERDDAP™kezelni fogják azokat a sorrendben, amelyet megadnak. David Karuga-nak köszönhetően.
         
    * BUG FIX: Ha az adatkészlet EDDTableFromDatabase és egy lekérdezés[forrásCanOrderBy](/docs/server-admin/datasets#sourcecanorderby)vagy[forrásCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct)Ezután az adatbázis lehet (a beállításoktól függőendatasets.xml) részben vagy teljesen kezelni **csak az első**  orderBy(...) () vagy külön () ... David Karuga-nak köszönhetően.
         
    * BUG FIX: A közelmúltbeli extra százalékkódolás problémákat okozott néhány kérdéssel.ncCF fájlok, például: "HTTP Status 500 - Kérdés hiba: a változó=station kétszer szerepel az eredmények változó listáján.” Kevin O'Briennek köszönhetően.
         
    * BUG FIX: Az EDDTableFromFilesnek gondja volt egy adatkészlet újratöltése, amikor az egyik oszlop egy igazi char oszlop volt. Roland Schweitzernek köszönhetően.
         
    * BUG FIX:EDDGridFromNcFiles Unpacked most is átalakítjamissing\\_valueés a \\_FillValue szabványos értékekhez, így a különböző értékekkel rendelkező fájlok összesíthetők. Emiatt a változás miatt, miután telepítette ezt az új verziótERDDAP™Kérlek, állíts egy[kemény zászló](/docs/server-admin/additional-information#hard-flag)mindenEDDGridFromNcFiles Csomagolt adatkészlet az ÖnERDDAP...
         
    * IMPROVED: Az EDDTableFromNcCFFiles jelenleg kezeli a több minta\\_dimenziója. Egy adott adatkészletnek csak olyan változókat kell használnia, amelyek a minta egyik dimenzióját használják. Ajay Krishnannak köszönhetően.
         
    * IMPROVED: Az EDDTableF-re... Fájlok,&lt;dalszöveg: HowBySourceNames most lehetővé teszi a comma-elválasztott (ajánlott) vagy az űr elválasztott listák változó forrás nevek. Mindkét esetben az egyéni változó neveket kettős idézetek veszik körül, például, ha a névnek belső tere van.

## Verzió 1.72{#version-172} 
 (2016-05-12) 

*    **Új funkciók (felhasználók számára) :** Senki sem.
     
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * NEW EDDTableFromMultidimNcFiles[EDDTableFromMultidimNcFiles](/docs/server-admin/datasets#eddtablefrommultidimncfiles)az EDDTableFromNcFiles új alternatívája. Úgy tervezték, hogy kezelje a különböző változatokkal rendelkező fájlokat, például a var1\\[egy\\]\\[b)\\]var2\\[egy\\]var3\\[b)\\]ScalarVar. Az Argo Projectnek köszönhetően Aurélie Briand és Roland Schweitzer.
    * BUG FIX:ERDDAP™  (a FileVisitorDNLS és a FileVistorSubdir osztályokon keresztül) most szimbolikus linkeket követ a Linuxon.ERDDAP™Még mindig nem követi a .lnk Windows-t.
    * BUG FIX bug bevezetett 1,70: külön +orderByegyetlen kérelemben nem engedélyezték együtt. Most ismét. Ezek nem kölcsönösen kizárólagosak/hitelesek. David Karuga-nak köszönhetően.
    * CHANGEdatasets.xmlIP címek feketelistája:
IP v4 címek jelennek megERDDAP™4 időszakos hex számként.
Úgy gondolom, hogy az IP v6 címek 8 gyarmatosított hex számként jelennek meg.
SzóvalERDDAP™most támogatja a gyarmatokat az IP címekben ebben a listában, és :\\* a lista végén, hogy blokkolja a címek egy sorát.
    * IMPROVED:ERDDAP™most használja a NetcdfFileWriter-t, hogy írjon.ncfájlok helyett a lenyűgöző NetcdfFileWriteable. Nem lehet megkülönböztethető változás a kapott fájlokban. Ez megnyitja annak lehetőségét, hogy nagy.ncfájlok, amelyek a.nc3 64bit kiterjesztés. Ha ezt akarja / szükséges, küldjön kérésterd.data at noaa.gov...
    * IMPROVED: A távoli weboldalakhoz kapcsolódó linkek közül sokan naprakészek voltak. Most naprakészek és használnakhttps:helyettehttp- ha lehetséges.
    * Sok apró változás.

## Verzió 1.70{#version-170} 
 (2016-04-15) 

*    **Új funkciók (felhasználók számára) :** Senki sem.
     
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** Az alábbiakban számos ajánlott változtatás van a dokumentációban a setup.xml fájlban.
Kérjük, tegye ezeket a változásokat most.
30 perc munka most mentheti meg órák zavar a jövőben.
    * Bug fix: A probléma az volt, hogy a kéréseket, amelyek átirányították egy távoliERDDAPelbukott egy érvénytelen karakter "|hibaüzenet. Ez csak a Tomcat legújabb verzióival történt. Rusty Hollemannak, Conor Delaneynek és Roy Mendelssohnnak köszönhetően.
    * Bug fix:ERDDAP™most a netcdf-java naprakész verzióját használja (ez egy hosszú történet) amely magában foglalja az NcML naprakész támogatását, amely rögzíti a problémát az NcML LogicalReduce-val, amely nem működik a várhatóan. Lehet, hogy néhány apró változás a metaadata, amelyERDDAP™a netcdf-java-n keresztül.nc,.hdf, .grib és .bufr fájlok. Favio Medranonak köszönhetően.
    * Az új[EDDTableAggregateRows](/docs/server-admin/datasets#eddtableaggregaterows)lehetővé teszi, hogy egy összeolvadt EDDTable adatkészletet két vagy több EDDTable adatkészletből készítsen, amelyek ugyanazokkal az adatváltozatokkal rendelkeznek, ugyanazokkal az egységekkel. Köszönjük Kevin O'Briennek.
    * Új lehetőségek az EDDTableFromDatabase számára ([forrásCanOrderBy](/docs/server-admin/datasets#sourcecanorderby)és[forrásCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct)) Hadd adja meg, hogyERDDAP™, az adatbázis, vagy mindkettő, kezelni a különböző ésorderBy  (és minden változat) korlátok. David Karuga-nak köszönhetően.
    * Most készíthet magánadatok grafikonját és metaadatát az újonnan elérhetővé [&lt;graphsAccessibleTo&gt; nyilvános&lt;/graphsAccessibleTo&gt;] (/docs/server-admin/adtasets#grafsaccessibleto) Tag. Emanuele Lombardinak köszönhetően.
    * Most, ha egy sztring átment a GenerateDatasets-be Az Xml vagy a DasDds kettős idézetek veszik körül, idézetlen (ha ez egy JSON sztring) ... John Kerfootnak és Melanie Abecassisnak köszönhetően.
    * GenerateDatasets Az Xml most támogatja az "alapértelmezett"-t, hogy megkapja az alapértelmezett és "semmi"-t, hogy üres sztringet kapjon (dolgoznak vagy idézetek nélkül) ... Ez megold néhány problémát az üres sztringek átadásával kapcsolatban.
    * Most, a GenerateDatasets-ben Xml, mindenEDDGridFromFiles és EDDTable FromFiles adatkészletek, ha a minta A FileName megadja a "" (Az üres sztring) , ez fogja használni az utolsó megfelelő fájlName a könyvtár + regex + visszaszerzési = igaz.
    * Frissítés: A megjelenítőInBrowser kód, amelyet a GenerateDatasetsXml és a DasDds a Linux számítógépeken való megjelenítésére használnak, naprakész volt, és furcsa üzenetet adott a Netscape-ről. Most ez egy modern Linux eszközt használ: xdg-open. Melanie Abecassisnak köszönhetően.
    * AallDatasetsadatkészlet most van egy"files"oszlop, amely a /files link alap URL-jét jelzi (ha van egy) az adatkészlethez.
    * Növelje az általános biztonságotERDDAP™a tomcat könyvtárral és a bigParentDirectory-val kapcsolatos engedélyek megváltoztatásával:
         (Az alábbi tényleges parancsok Linuxra vonatkoznak. Más OS-ok esetében az analóg változásokat.) 
        * Változtassa meg a "csoport" tomcat, a felhasználónév, vagy a neve egy kis csoport, amely magában foglalja a tomcat és az összes adminisztrátorok Tomcat /ERDDAPpl.:
Chgrp - R _yourUserName_ apache-tomcat-_8.0.23_
Chgrp - R _your Felhasználónév BigParentDirectory_
        * Változtassa meg az engedélyeket, hogy a tomcat és a csoport olvassa, írja, végrehajtsa a kiváltságokat, például.
chmod - R ug+rwx apache-tomcat-_8.0.23_
Chmod - R ug+rwx _bigParentDirectory_
        * Távolítsa el a "másik" felhasználó engedélyeit az olvasáshoz, íráshoz vagy végrehajtáshoz:
chmod - R o-rwx apache-tomcat-_8.0.23_
Chmod - R o-rwx _bigParentDirectory_
Ez fontos, mert megakadályozza, hogy más felhasználók olvassák esetleg érzékeny információkatERDDAP™fájlok, naplófájlok és fájlok létrehozása a magán adatkészletekről.
    * A hitelesítési/login rendszert megújították. Thomas Gardnernek, Emanuele Lombardinak és az Egyesült Államok kormányának új[HTTPS-Only Standard](https://home.dotgov.gov/management/preloading/dotgovhttps/)...
        * A hitelesítés=openid opciót eltávolították. Ez naprakész volt.
        * Az új, ajánlott,[hitelesítés = Google](/docs/server-admin/additional-information#google)opció használat Google Sign-In (OAuth 2.0 alapján) lehetővé tenni bárki számára egy Google e-mail fiókot (többek között Google kezelt fiókok, mint például@noaa.gov) bejelentkezni.
        * Az új,[hitelesítés = e-mail](/docs/server-admin/additional-information#email)opció a hitelesítési = Google támogatása. Ez lehetővé teszi a felhasználók számára egy&lt;felhasználói&gt; címkedatasets.xmlbejelentkezni azzal, hogy egy e-mailt küldenek egy speciális linkkel.
        * A beállításban.xml, kérjük, változtassa meg a leírást&lt;hitelesítés&gt;
```
            <!-- If you want to restrict access to some datasets, 
            you need to specify the method used for logging on (authentication).
            See the info at 
            https://erddap.github.io/setup.html#security
            Currently, the options are: "" (logins not supported, the default), 
            "custom", "email", and "google" (recommended).  
            \\[No longer supported: "basic", "openid"\\]
            -->
```

        * A setup.xml-ben, kérjük, adja hozzá ezt a jobb alul&lt;hitelesítés&gt; tag
```
            <!-- If authentication=google, you must supply your Google Client ID. 
            See
            https://developers.google.com/identity/sign-in/web/devconsole-project
            When setting this up, for Authorized JavaScript origins, 
            for testing on your computer, use the domain "localhost" 
            (e.g., origin=https://localhost:8443), 
            not "127.0.0.1" (because Google Sign-In doesn't work with anything 
            at that domain).
            This will be a string of about 75 characters, probably starting with
            several digits and ending with .apps.googleusercontent.com .
            -->
            <googleClientID></googleClientID>
```

        * Most azok a felhasználók, akik nem jelentkeznek be, használhatjákhttpvagyhttpsURL-ek (ha létrehoztál&lt;baseHttpsUrl&gt; a beállításban.xml). Köszönhetően az amerikai kormány új[HTTPS-Only Standard](https://https.cio.gov/)...
        * Most arra ösztönözheti az összes felhasználót, hogy használjahttps  (nemhttp) beállítás&lt;alapUrl&gt; egyhttpsURL. A felhasználók kényszerítése csak használnihttpsAzt is meg kell változtatni az Apache / Tomcat beállítást, hogy blokkolja a nem-httpshozzáférés. Köszönhetően az amerikai kormány új[HTTPS-Only Standard](https://https.cio.gov/)...
            
A beállításban.xml, kérjük, változtassa meg a leírást&lt;alapUrl&gt; lenni
```
            <!-- baseUrl is the start of the public URL, to which "/erddap" 
            is appended. For example:
            For running/testing on your personal computer:
              <baseUrl>http://localhost:8080</baseUrl>     
              (127.0.0.1 doesn't work with authentication=google).
            If you want to encourage all users to use https (not http), 
              make the baseUrl the same as the baseHttpsUrl (see below).
            For ERD releases, we used to use
              <baseUrl>http://coastwatch.pfeg.noaa.gov</baseUrl>    
            For ERD releases, we now use
              <baseUrl>https://coastwatch.pfeg.noaa.gov</baseUrl>    
            -->
```

        * A lehetőségek&lt;jelszóEncoding&gt; megváltozott. A beállításban.xml, kérjük, változtassa meg a leírást&lt;jelszóEncoding&gt;
```
            <!-- For "custom" authentication, this specifies how you have 
            stored passwords in the roles tags in datasets.xml.
            If you aren't storing any passwords, this is irrelevant.
            The options (in order of increasing security) are: 
            "MD5", "UEPMD5" (MD5(UserName:ERDDAP:Password)), 
            "SHA256", "UEPSHA256" (SHA256(UserName:ERDDAP:Password), 
            the default).
            You should only use "MD5" or "SHA256" if you need to match 
            values stored that way in an external password database.
            See the info at 
            https://erddap.github.io/setup.html#security
            --> 
```

        * A beállításban.xml, kérjük, változtassa meg a leírást&lt;BaseHttpsUrl&gt;
```
            <!-- This is a variant of <baseUrl> which is used when 
            authentication is active and the user is logged in.
            In general, you take the <baseUrl>, change "http" to "https", 
            and change/add ":8443". This must begin with "https://".
            If you make a proxy so that ":8443" isn't needed, 
            then don't use ":8443" here.
            This is relevant even if <authentication> is "".
            See the instructions at 
            https://erddap.github.io/setup.html#security
            For example:
            For running/testing on your personal computer:
              <baseHttpsUrl>https://localhost:8443</baseHttpsUrl>                  
            For releases at ERD, we use:
              <baseHttpsUrl>https://coastwatch.pfeg.noaa.gov</baseHttpsUrl>  
            If you want to encourage all users to use https (not http), 
              make the baseUrl (see above) the same as the baseHttpsUrl.
            --> 
```

        * Most, ha a listaPrivateDatasets=true in setup.xml, még kevésbé lesz információ az adatkészletekről, amelyekhez a felhasználónak nincs hozzáférése.
    * Most, különösen, ha kezdetben felállítottad aERDDAPMost már elmondhatodERDDAP™ne próbálja feliratkozni a távoliERDDAP™adatkészletek. A Filipe Rocha Freire-nek köszönhetően.
A setup.xml-ben, közvetlenül mielőtt&lt;betűcsalád&gt;, kérjük, add hozzá
```
        <!-- Normally, if you have a EDDGridFromErddap or EDDTableFromErddap 
        dataset in your datasets.xml, it will try to subscribe to the remote 
        ERDDAP™ dataset so that the local dataset is kept perfectly up-to-date.
        If this ERDDAP™ is not publicly accessible (http://localhost), or its
        IP address will change soon, or you have some other reason, 
        you can tell this ERDDAP™ to not try to subscribe to the remote 
        ERDDAP™ datasets by setting this to false. (default=true) 
        This is the overall setting for this ERDDAP. It can be overridden by
        the same tag (with a different value) in the datasets.xml chunk for 
        a given EDD...FromErddap dataset. 
        For each fromErddap dataset that doesn't subscribe to the remote 
        ERDDAP™ dataset, you should set <reloadEveryNMinutes> to a smaller 
        number so that the local dataset stays reasonably up-to-date. -->
        <subscribeToRemoteErddapDataset>true</subscribeToRemoteErddapDataset>
```

    * A setup.xml-ben, a fenti utasításokban&lt;e-mailFromAddress&gt; kérlek, írja be:
Ha lehetséges, állítsa be ezt biztonságos kapcsolatot (SSL / TLS) az e-mail szerverhez.
Ha a beállítás nem használja biztonságos kapcsolatot az e-mail szerverrel, kérjük, tegye meg a változtatásokat.
    * A tedatasets.xmlKérlek, add hozzá ezt a vonalat a leíráshoz&lt;ElőfizetésEmailBlacklist&gt; az Öndatasets.xml:
Használhatja a "nevet"\\*"Egy egész domain feketelistára, pl.\\*@example.com .
    * Mivel a v1.66-os naplórendszer változása, a logfájl soha nem naprakész. Mindig vannak üzenetek vagy üzenetek részei, amelyek arra várnak, hogy a naplófájlra írjanak. Most, elkészítheted up-to-date (Egy pillanatra) megtekintveERDDAPstatus weboldal http://_your.domain.org_/erddap/status.html ...
    * HashDigest......
    * Egy kis változás (String2.canonical) segíteni kell a dolgokat gyorsan mozogni, amikorERDDAP™nagyon elfoglalt, és sokkal jobban foglalkozik egy nagyon sok adatkészlettel.
    * Erős Ajánlott: hagyja abba a használatot&lt;átalakításToPublicSourceUrl&gt; bennedatasets.xmlIP szám átalakítása egy adatkészletben&lt;sourceUrl&gt; &gt; &gt; &gt; (pl.: http://192.168.#.#/ ) egy domain név (pl.:httpMy.domain.org/) ... Mostantól új előfizetések http://localhost , http://127.0.0.1 és http://192.168.#.# Az URLS nem engedélyezett biztonsági okokból. Ezért kérjük, mindig használja a nyilvános domain nevet&lt;sourceUrl&gt; &gt; címke (ha szükséges a DNS problémák miatt) Használhatja a[/etc/hosts táblázat a szerverén](https://linux.die.net/man/5/hosts)a probléma megoldása a helyi domain nevek IP-számokra való átalakításával anélkül, hogy DNS-kiszolgálót használna. Tesztelhet, ha egy adott domain név megfelelően megoldódik a használatával
dalszöveg: Some.domain.name
    * A geneDatasets.xml, a távoli adatkészletek számára (pl. THREDS szervertől) automatikusan generáltdatasetIDS változatlanok a legtöbb domain számára. Néhány domain, az első rész (azaz a neve) a automatikusan generáltdatasetIDegy kicsit más lesz. Figyelemre méltó, hogy a nevek, amelyek egy része most nagyobb valószínűséggel két rész. Például az adatkészletek http://oos.soest.hawaii.edu korábban vezetettdatasetIDs ez kezdődött a hawaii\\_, de most vezetdatasetIDEz a hawaii\\_soest\\_ . Ha ez problémákat okoz az Ön számára, kérjük, küldjön nekem. Lehet, hogy munkakörnyezet van.
    * A Cassandra sofőrt a cassandra-vezérelt-core-3.0.jar-ra frissítették, így Cassandra v3. EDDTableFromCassandra nem használja ki új funkciókat Cassandra-ban v3. Cassandra indexei most összetettebbek lehetnek, deERDDAP™még mindig használja a Cassandra v2 index modellt, amely feltételezi, hogy egy indexelt oszlop közvetlenül kapcsolódik'='korlátok. GenerateDatasets Xml az EDDTableFromCassandra számára már nem észleli az indexekkel rendelkező oszlopokat; ha egy index egyszerű, meg kell határoznia aztdatasets.xmlkézzel. Ha több komplex indexre vagy más új funkcióra van szüksége, kérjük e-mailterd.data at noaa.gov...
&#33;&#33;&#33; Ha még mindig használja Cassandra 2.x, kérjük, továbbra is használjaERDDAP™v1.68, amíg frissíti a Cassandra 3.x használatát.
    * Jars és az Classpath - Majdnem az összes érintett harmadik fél .jar fájlt frissítették legújabb verziójukra.
        * Slf4j.jar hozzáadták /lib és az osztálypath.
        * joid. jar és tsik. jar eltávolították a /lib és az osztálypata.
        * Ha hibaüzeneteket kap az osztályokról, amelyeket nem találsz, ha összeállítod vagy futszERDDAP™vagy az egyik eszköze, hasonlítsa össze a parancssor osztályátERDDAPA[jelenlegi osztálypata](/docs/contributing/programmer-guide#development-environment)kitalálni, hogy melyik .jars hiányzik az osztálypátoktól.

## Verzió 1.68{#version-168} 
 (2016-02-08) 

*    **Új funkciók (felhasználók számára) :** Senki sem.
     
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    *   [EDDGridFromFiles Aggregation keresztül File Names vagy Global Metadata](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)-
Minden variációEDDGridA Files most összesítheti a fájlok egy csoportját egy új baloldali dimenzió hozzáadásával, általában az idő, amely az egyes fájlnévből származó értéken vagy az egyes fájlokban szereplő globális tulajdonság értékétől függ.
    * IMPROVED: Korábban azt javasoltuk, hogy te is szeretne létrehozni egyEDDGridFromErdp adatkészlet az Ön adataibandatasets.xmla hivatkozott és újra kiszolgálta a jplMU-tRSST adatkészlet a miénkbenERDDAP... Mivel most van egy új verziója ennek az adatkészletnek, ez az adatkészlet most eltökélt. Tehát, ha rendelkezik ez az adatkészlet az ÖnbenERDDAP™Kérlek, add hozzá ezt az új adatkészletet
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Ha el akarja távolítani a régi jplMURSST adatkészlet az ÖnERDDAP™  (ez a választásod) , változtassa meg aktív beállítását "igaz" a "hamis".
    * Bug fix: Kérjük, ellenőrizze a bigParentDirectory-t, amelyet a setup.xml-ben megadott. Ha nem tettél csapást a végén&lt;bigParentDirectory&gt; név, majdERDDAP™több könyvtárat hoztak létre azzal, hogy a szavakat közvetlenül a megadott névre helyezték, ahelyett, hogy előirányzatokat hoznának létre. Kezdő verzió 1.68,ERDDAP™hozzáad egy slash-t a könyvtári név végéhez, ha nem adott meg egyet. Tehát, ha korábban nem határozott meg egy csapást a végén, akkor amikor telepítiERDDAP™v1.68 kell mozogni és újranevezni ezeket a könyvtárakat **utána** leállítod a régitERDDAP™és **előtte** elkezdi az újatERDDAP... Például, ha tévesen meghatározott bigParentDirectory, mint /home/erddapBPD (Nincs nyomvonal slash) ésERDDAP™hibásan létrehozott könyvtárak, mint például
/home/erddapBPDcache
/home/erddapBPDcopy
/home/erddapBPDdataset
/home/erddapBPDflag
/home/erddapBPDlogok
/home/erddapBPDlucene
és egy fájl neve /home/erddapBPDsubscriptionsV1.txt,
Ezután meg kell mozgatni és átnevezni őket, hogy legyen
/home/erddapBPD/cache
/home/erddapBPD/copy
/home/erddapBPD/adatkészlet
/home/erddapBPD/flag
/home/erddapBPD/logs
/home/erddapBPD/lucene
/home/erddapBPD/subscriptionsV1.txt
    * Bug fix: Voltak hibák aEDDGridLonPM180ERDDAP™v1.66, amely akkor következett be, amikor a gyermek adatkészlete egyEDDGridFromErddap.
    * Bug fix: Volt egy hibaEDDGridFromFiles és EDDTable FromFiles inERDDAP™v1.66, ami okozta&lt;frissítésEveryNMillis&gt; figyelmen kívül hagyni az első alkalommal, amikor az adatkészletet újraindítás után töltötték be.
    * Bug fix/új funkció: Ha egy gyermek adatkészlete belülEDDGridAggregateExistingDimension,EDDGridMásolás,EDDGridFromEDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy vagy EDDTableFromEDDGridegy ...FromErddap adatkészlet, hogy a szülői adatkészlet most az alapjául szolgálERDDAP™adatkészlet. Ha a mögöttesERDDAP™adatkészlet ugyanabban az esetben vanERDDAP™, az előfizetés és annak validálása közvetlenül történik; nem kap egy e-mailt, amely arra kéri Önt, hogy érvényesítse az előfizetést. Ellenkező esetben, ha az előfizetési rendszer az Ön számáraERDDAP™kikapcsolódik, állítsa be&lt;reloadEveryNMinutes&gt; a szülői adatkészlet kis számba történő beállítása (60?) hogy naprakész maradjon.
    * Bug fix/új funkció: Ha egy gyermek adatkészlete belülEDDGridAggregateExistingDimension,EDDGridMásolás,EDDGridFromEDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy vagy EDDTableFromEDDGridaktív="hamis", hogy a gyermek adatkészlet most kihagyott.

## Verzió 1.66{#version-166} 
 (2016-01-19) 

*    **Új funkciók (felhasználók számára) :** 
    * Graphs (nem térképek) lehet most leszármazott értékek a tengelyeken. Ahhoz, hogy ezt a Make A Graph weboldalt használja, változtasson új Y Axis: Felemelkedő beállítást (az alapértelmezett) leereszkedni. Vagy egy olyan URL-ben, amely grafikont kér, használja az új opcionális 3.|"paraméter a[&.x Range és/vagy yRange kapcsolók](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)Ez nem lehet semmi (az alapértelmezett) , igaz, vagy t, hogy felemelkedő értékek, vagy használja hamis vagy f, hogy leszármazott értékeket. Az igaz|A hamis értékek érzéketlenek. Chris Fullilove, John Kerfoot, Luke Campbell és Cara Wilson.
    * A felhasználók most meghatározhatják a háttérszínt a grafikonok számára azáltal, hogy hozzáadnak egy &.bgColor=0x_ Az AARRGGBB_ átkapcsolja az URL-t, amely kéri a grafikont. Lásd .bgColor a Graphics Commands részében[griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)és[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands)dokumentáció. John Kerfootnak és Luke Campbellnek köszönhetően.
    * A mesés adatkészletek esetében a korlátozások most a bányára utalhatnak (_someVariableName_) vagy max (_someVariableName_) ... Lásd[b) () és max () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min)... John Kerfootnak köszönhetően.
    * A tabuláris adatkészletek, az időkorlátok, amelyek használatát[most](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)most meghatározhatja a milliszekundumok vagy millisz időegységeit.
    * A tabuláris adatkészlet képének kérése most térképet készít (nem grafikon) ha az x és a y változók hosszúságúak és szélességű változók (kompatibilis egységek) ... Rich Signellnek köszönhetően.
    * Bug fix: Idő tengelycímkék és trükkök néha furcsa szabálytalanságokat kért több grafikon egyszerre (pl. weboldalon) ... A probléma egy hiba volt az SGT grafikai könyvtárban, amelyERDDAP™Használat (az egyik változó "static" volt, amit nem kellett volna) ... Bradford Butmannak köszönhetően.
         
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * Biztonsági kockázat, hogy az e-mail jelszót egy egyszerű szövegfájlba helyezze, mint a setup.xml. A probléma enyhítése érdekében határozottan javasoljuk, hogy:
        1. E-mail fiók beállítása csakERDDAPHasználata, például erddap@yourInstitution.org. Ez más előnyökkel is jár; nevezetesen több, mint egyERDDAP™Az adminisztrátor ezt követően hozzáférhet az e-mail fiókhoz.
        2. Készítse el a setup.xml fájl rw engedélyeit (Olvasó + írás) a felhasználó számára, aki fut Tomcat ésERDDAP™  (felhasználó=tomcat?) és nem engedélyek (nem olvas vagy ír) a csoport és más felhasználók számára. A Filipe Rocha Freire-nek köszönhetően.
    * Az új[ArchiveADataset](/docs/server-admin/additional-information#archiveadataset)az eszköz egyszerűsíti egy.tar.gzarchívum egy adatkészlet egy olyan formátumban, amely alkalmas az archiválásra (nevezetesen,NOAANCEI) ... Ez sokak számára hasznos lehetERDDAP™adminisztrátorok sok helyzetben, de különösen a csoportokbanNOAA...
    * Az új adatkészlet típusa[EDDGridFromNcFilesUnpack](/docs/server-admin/datasets#eddgridfromncfilesunpacked)egy változataEDDGridFromNcFiles. A különbség az, hogy ez az osztály minden adatfájlot kicsomagol, mielőttEDDGridFromFiles a fájlokat nézi:
        
        * Nem csomagolt változókat használnakscale\\_factorvagyadd\\_offset...
        * Elősegíti az integrált változókat, amelyek \\_Unsigned=igazi tulajdonságokkal rendelkeznek egy nagyobb integrált adattípushoz, hogy az értékek a meg nem jelentett értékekként jelenjenek meg. Például egy \\_Unsigned=true byte (8 bit) változó lesz egy aláírt rövid (16 bit) változó.
        * Megtéríti a \\_FillValue-t ésmissing\\_valueA NaN értékei (vagy MAX\\_VALUE az integrált adattípusokhoz) ...
        
Ennek az osztálynak a nagy előnye, hogy utat biztosít a különböző értékek kezelésérescale\\_factor,add\\_offset\\_FillValue, vagymissing\\_valuekülönböző fájlokban egy gyűjteményben. Ellenkező esetben olyan eszközt kell használnia, mint[NcML](/docs/server-admin/datasets#ncml-files)vagy[NCO](/docs/server-admin/datasets#netcdf-operators-nco)módosítani minden fájlt, hogy távolítsa el a különbségeket, hogy a fájlokat lehet kezelniEDDGridFromNcFiles. Ahhoz, hogy ez az osztály megfelelően működjön, a fájloknak követniük kell a kapcsolódó tulajdonságok CF szabványait. Philippe Makowskinak köszönhetően.
    * Az új adatkészlet típusa[EDDGridLonPM180](/docs/server-admin/datasets#eddgridlonpm180)lehetővé teszi, hogy megváltoztassa az adatkészleteket, amelyeknek több mint 180 értéke van (pl. a 0–360 közötti tartomány) a -180–180 közötti tartományon belüli hosszúsági értékekkel rendelkező adatkészletek (Longitude Plus vagy Minus 180, így a név) ... A nagy előnye, hogy az adatkészletek hosszúsági értékekkel rendelkeznek a -180–180 tartományban, az, hogyOGCSzolgáltatások (pl.:WMS) hosszúsági értékeket igényel ebben a tartományban. Köszönhetően Lynne Tablewski, Fabien Guichard, Philippe Makowski és Martin Spel.
2016-01-26 Frissítés: Eeek&#33; Ez egy hiba, amely akkor fordul elő, ha a gyermek adatkészlete egyEDDGridFromErddap, amely ugyanazon adatkészletre hivatkozikERDDAP... Ez a hiba rögzítve vanERDDAP™v1.68.
    * Inkább[GenerateDatasetsXml](/docs/server-admin/datasets#generatedatasetsxml)új speciális adatkészlettípus,EDDGridLonPM180FromErddapCatalog, lehetővé teszi, hogy létrehozza adatasets.xmlMertEDDGridLonPM180 adatkészletek az összesEDDGridadatkészletek egyERDDAPolyan hosszúsági értékek, amelyek 180-nál nagyobbak.
    * MindenEDDGridadatkészletek,datasets.xmlmost használhatja az opcionális
[[szerkesztés]]&lt;hozzáférhető ViaWMS&gt; Igaz|hamis&lt;/Csak elérhető ViaWMS&gt;&gt;&gt;&gt;&gt;&gt; (/docs/server-admin/adtasets#accessibleviawms)   (Default=true) ... Ezt tévesen letiltja aWMSszolgáltatás ez az adatkészlet. Ha igaz, az adatkészlet még mindig nem hozzáférhetőWMSegyéb okokból (pl. nem lat vagy lon tengely) ... Ez különösen hasznos az olyan adatkészletek számára, amelyek a sajátjukban léteznek, és amelyeket azEDDGridLonPM180, így csak a LonPM180 verzió elérhetőWMS...
    * A setup.xml-ben megadhat egy másik alapértelmezett színt a grafikonok hátterében. A színt 8 számjegyű hexadecimális értékként határozzák meg a 0x_AARRGGBB_ formájában, ahol az AA, RR, GG és BB az opacitás, a vörös, a zöld és a kék összetevők, vagyis 2 számjegyű hexadecimális számok. Ne feledje, hogy a vászon mindig opaque fehér, így egy (Félig -) Átlátszó grafikon háttérszín keverékek a fehér vászon. Az alapértelmezett könnyű kék:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
John Kerfootnak és Luke Campbellnek köszönhetően.
    * A setup.xml-ben most meghatározhatja a maximális méretet[log fájl](/docs/server-admin/additional-information#log)  (amikor újra megnevezik a naplóra. txt. Előző és egy új log. txt jön létre) MegaBytesben. A megengedett minimum 1. A megengedett maximum 2000. Az alapértelmezettség 20 (MB) ... Például:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * Inkábbdatasets.xml[[szerkesztés]]&lt;fgdcFile&gt; (/docs/server-admin/datasets#fgdcfile) [[szerkesztés]]&lt;Iso19115Fil&gt; (/docs/server-admin/adatkészletek#iso19115file) most lehet helyi fájl (mint korábban) vagy URL (amelyet le kell tölteni, így van egy helyi másolat) ... HaERDDAP™nem tudja letölteni a fájlt, az adatkészlet betöltése folytatódik, de az adatkészletnek nem lesz fgdc vagy iso19115 fájlja.
    *   EDDGridFromFiles és EDDTable FromFiles adatkészletek most tehet egy gyorsRestart (a rendszer, amelyERDDAP™megpróbálja használni, ha az adatkészleteket először töltik be, amikorERDDAP™újraindítás) ... Ez felgyorsítja az újraindítástERDDAP...
2016-01-26 Frissítés: Eeek&#33; Ez egy hiba, ami okozza&lt;frissítésEveryNMillis&gt; figyelmen kívül hagyni az első alkalommal, amikor az adatkészletet újraindítás után töltik be. Ez a hiba rögzítve vanERDDAP™v1.68.
    * A gyorsRestart rendszer általános javítása lehetővé tesziERDDAP™az adatkészletek gyorsabb betöltése, haERDDAP™újraindításra kerül.
    * MindenEDDGridFromFiles és EDDTable FromFiles alosztályok most elfogad egy új&lt;patRegex&gt; címke, általában az alábbiakban megadott&lt;ismétlődő&gt;. Ha az ismétlődő "igaz", csak a teljes átirányítási útvonalak, amelyek megfelelnek az útvonalnakRegex (default=".\\*") elfogadják. Hasonlóképpen, egy&lt;sourceUrls&gt; címke egyEDDGridAz AggregateExistingDimension most tartalmazhat egy utatRegex tulajdonság (default=".\\*") ...
    * Az alapértelmezett&lt;PartialRequestMaxBytes&gt; a setup.xml-ben jelenleg 490000000 (490 MB) ... Ez elkerüli a THREDDS adatkiszolgálók adatainak megszerzéséhez kapcsolódó problémák/időszakokat. Leslie Thorne-nek köszönhetően.
    * A logisztikai rendszer kis változásának lehetővé kell tennieERDDAP™felelősségteljesebbnek lenni, ha nagyon, nagyon elfoglalt. Az információ most a lemezmeghajtó naplófájljára íródik, meglehetősen nagy darabokban. Az előny az, hogy ez nagyon hatékony -ERDDAP™Soha nem fogja megakadályozni, hogy az információt a naplófájlra írják. A hátrány az, hogy a napló szinte mindig egy részleges üzenettel fog véget érni, amely addig nem fejeződik be, amíg a következő darab meg nem íródik.
    * Bug fix az inotifikációval és a [&lt;frissítésEveryNMillis&gt; (/docs/server-admin/datasets#updateeverynmillis) rendszerEDDGridFromFiles és EDDTable FromFiles adatkészletek: Már nem szükséges meghatározni egy nagy fs.inotify.max\\_user\\_watches vagy fs.inotify.max\\_user\\_instances. Van egy hiba benneJavaez okoz néhány részétJava"Az inotify/WatchDirectory rendszert nem gyűjtik össze, amikor véglegesítik; végül a zombi inotify órák vagy esetek száma meghaladná a megadott maximális számot.ERDDAP™most működik körül ezJavaBug.
Továbbá, az inotify szálak száma szerepel a status.html weboldalon, így szemmel tarthatja a használatát. Jellemzően 1 inotify szál perEDDGridFromFiles és EDDTable FromFiles adatkészlet.
    * Bug fix: sok helyen, ahelyett, hogy egy hiba újrakezdődik, egy új hiba keletkezett, amely csak tartalmazott egy rövid változata az eredeti hibaüzenet és anélkül, hogy a verem nyomon. Most, amikor egy új hiba keletkezik, megfelelően tartalmazza az egész eredeti kivételt, pl. új kivételt ("valami új üzenet", e) ;
Susan Perkinsnek köszönhetően.
    * Bug fix: az utóbbi időben (v1.64?) ha .../datasetIDURL-t kértek,ERDDAP™hozzáadná .html-t az URL-hez. V1.64-ben ez kudarcot vallott (helytelenül formázott URL-t hoztak létre, majd kudarcot vallottak) ... Most ez ismét működik. Chris Fullilove-nak köszönhetően.

## Verzió 1.64{#version-164} 
 (2015-08-19) 

*    **Új funkciók (felhasználók számára) :** 
    * Jelenleg útmutatás van a jelszó-védő privát hozzáféréshezERDDAP™adatkészletek (https://) keresztülcurlésPython... Lásd:[curl](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl)és[Python](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python)utasítások.
Emilio Mayorga NANOOS és Paul Janecek Spyglass Technologies
         
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    *   ERDDAP™most megköveteliJava1.8+.
        Java1.7 elérte[az élet vége](https://www.oracle.com/technetwork/java/eol-135779.html)  (Nincs több biztonsági frissítés) 2015 áprilisában. Ez a verzióERDDAP™nem fog működni verziókkalJavaalá: 1,8 Ha frissülJava1.7x (vagy korábban) , akkor is frissíteni Tomcat. Lásd:[ERDDAP™Állítsa be az utasításokat](/docs/server-admin/deploy-install)letöltés linkek és tanácsok.
    * Új adatszolgáltató forma.
Amikor egy adatszolgáltató érkezik hozzád, remélve, hogy hozzáad néhány adatot aERDDAP™Nehéz és időigényes lehet összegyűjteni az összes metaadatot, ami szükséges ahhoz, hogy az adatkészletet hozzáadjukERDDAP... Számos adatforrás (például .csv fájlok, Excel fájlok, adatbázisok) nincs belső metaadata, ígyERDDAP™új adatszolgáltatói forma, amely összegyűjti a metaadatot az adatszolgáltatótól, és más iránymutatást ad az adatszolgáltatónak, beleértve az adatok adatbázisainak kiterjedt útmutatását is. A benyújtott információ átalakul adatasets.xmlformátum, majd e-mailbenERDDAP™adminisztrátor (Te vagy) írás (Megjelent) a bigParentDirectory/logs/dataProviderForm.log . Így a forma félautomatizálja az adatkészlet beszerzésének folyamatátERDDAP™de aERDDAP™Az adminisztrátornak még mindig befejeznie kelldatasets.xmlcunk és foglalkozik az adatfájl megszerzésével (s) a szolgáltatótól vagy az adatbázishoz való csatlakozástól. További információkért lásd:[Adatszolgáltató Form leírás](/docs/server-admin/datasets#data-provider-form)...
    * Új&lt;AxisNDigits&gt;
használhatóEDDGridFájlok (és így a NcFiles és a MergeIRFiles) ,EDDGridAggregateExistingDimension,EDDGridMásolás ésEDDGridA SideBySide adatkészletei meghatározzák, hogy a különböző fájlokban pontosan egyenlő a tengelyértékekkel (hány számjegy) : 0 = nincs ellenőrzés (Ne használja ezt&#33;) 1-18 a növekvő pontosság érdekében, vagy 20 (az alapértelmezett) pontos egyenlőségért. n=1-18,ERDDAP™biztosítja, hogy a kettős értékek első n számjegye (vagy (n+1) div 2 a float értékekért) egyenlőek.
        &lt;meccsAxisNDigits&gt; helyettesíti&lt;biztosítja az AxisValuesAreEqual-ot, amelyet most levonnak. Az „igaz” értéke megtérül az AxisNDigits=20 mérkőzésre. A „hamis” érték (Ne csináld ezt&#33;) megtérül a mérkőzésre AxisNDigits=0.
    *   EDDGridFromFiles és EDDTable Az FromFiles nagyon lassan tölti be az első alkalommal, amikor ezt a verziót használjaERDDAP...
        ERDDAP™most egy kicsit másképp tárolja a belső fájlinformációkat, így az egyes adatkészletek belső fájltábláját újra kell építeni. Tehát ne aggódj&#33; Semmi sem rossz. Ez egy idő dolog.
    * Távoli Forrás Files
        EDDGridFromNcFiles, EDDTableFromNcFiles, EDDTableFromNcCFFiles most lehetővé teszi, hogy a fájlok távoli fájlok legyenek egy könyvtárban, amelyet a könyvtárban hozzáférhetőhttp://  (és valószínűleghttps://Ftp: de nem teszteltek) ha a távoli szerver támogatja[Range kérések](https://en.wikipedia.org/wiki/Byte_serving)a kérelmezőben. THREDS és Amazon S3 támogatási Range kérések,Hyraxnem. Ez a rendszer lehetővé teszi az adatokhoz való hozzáférést a távoli fájlokban anélkül, hogy letöltené a fájlokat (ami hasznos, ha a távoli fájlok túl óriásiak) De ezekhez a fájlokhoz való hozzáférés sokkal lassabb lesz, mint a helyi fájlokhoz való hozzáférés vagy akár távoliOPeNDAPforrás.
Ez magában foglalja"files"az Amazon S3 bucketben, mivel azok elérhetőkhttp://... Ha az S3 objektum neve olyan, mint a fájlnév (belső / olyan, mint egy Linux könyvtár fa) ,ERDDAP™a fájlokat is elérhetővé tehetiERDDAPA"files"rendszer. Ehhez a munkához az S3 hitelesítőinek kell lenniük ~/.aws/credentials (Linux, OS X vagy Unix) , vagy C:\\Users\\USERNAME\\.aws\\credentials (Windows-on) a szerveren aERDDAP... Lásd:[Amazon SDK dokumentáció](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1)...
    * GenerateDatasets Az Xml-nek új, szokatlan lehetősége van: EDDsFromFiles.
Ez egy fájlrendszeren megy keresztül (még egy távoli rendszer, mint egy Amazon S3, ha az objektumok fájlszerű nevek) és hozzon létredatasets.xmlcunks egy sor adatkészlet. A mérfölded változhat. Ez jól működik, ha a fájlokat megszervezik, hogy az összes adatfájl egy adott könyvtárban (aláírói) alkalmas egy adatkészletre (pl. az összes SST 1 napos kompozit) ... Egyébként (pl. ha egy könyvtár tartalmaz néhány SST fájlt és néhány Chlorophyll-a fájlt) Ez rosszul működik, de még mindig hasznos lehet.
    * Programozók: új /lib .jar fájlok.
Ha összeállítodERDDAP™Kérjük, vegye figyelembe az új .jar fájlokat az osztálypath-cp paraméterben, amelyet felsoroltakERDDAP™ [Programozó útmutató](/docs/contributing/programmer-guide)...
    * tenger\\_water\\_gyakorlati\\_szalon
Ha a CF szabványos nevet használja, a Sea\\_water\\_salinity minden változó számára, arra ösztönözlek benneteket, hogy váltsatok át a tengeri\\_water\\_practical\\_salinity-re, amely elérhető[A CF Standard Name Table 29 verziója](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)  (és néhány korábbi verzió - nem tudtam, hogy) ... Ez a név azt jelzi, hogy ez valóban Gyakorlati Szalinitás érték használataPractical Salinity Units  (PSU) , szemben egy idősebb g/kg értékkel. A kanonikus egységek különbözőek, de még mindig hihetetlenül hasznosak: 1 (feltehetően implyPSU/PSS-78) szemben az 1e-3-mal (feltehetően g/kg) Sea\\_water\\_salinitás.\\[Hé,UnidataCF: Olyan értékeket azonosítunk, amelyek más skálákat használnak, például Fahrenheit vagy Celsius egy olyan egységen keresztül, amely a skála vagy néhány variáció neve. Miért nem tudjuk azonosítani a szaloni egységeket a skálán keresztül, például a PSS-78-on keresztül? Tudom, hogy a PSS-78 értékek "kétségtelenek", de van egy implikált skála, nem létezik? Ha feltalálok egy új, praktikus szalonitási skálát, ahol az értékek 0,875-szeresek a PSS-78 értékek, akkor a kánonikus egységek még mindig „1”? Hogyan mondhatná el egy felhasználó? Az 1e-3 és az 1-es egységek sem leíróak, sem nem hasznosak azoknak a felhasználóknak, akik megpróbálják kitalálni, hogy mit jeleznek a számok.\\]

## Verzió 1.62{#version-162} 
 (2015-06-08) 

*    **Új funkciók (felhasználók számára) :** 
    * MertEDDGridadatkészletek, a felhasználók most készíthetnek Graph Type: Surface grafikonok bármilyen kombinációja numerikus tengelyek, nem csak a hosszúságú versus latitude. Ez lehetővé teszi x versus y (projekt) grafikonok és különböző[Hovmöller diagramok](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram)Például a hosszúság versus mélysége, vagy az idő versus mélysége.\\[Megjegyzés: ha a mélység az Y tengelyen van, akkor valószínűleg el lesz dobva attól, amit akar. Sajnálom, felemelve, hogy még nincs lehetőség.\\]Cara Wilsonnak és Lynn DeWittnek köszönhetően.
    * Van egy új[Oceanic/Atmospheric Acronym Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html)amely lehetővé teszi, hogy egy közös óceáni / légköri akronymát alakítson át / egy teljes névből.
    * Van egy új[Oceanic/Atmospheric Variable Names Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html)amely lehetővé teszi, hogy egy közös óceáni / légköri változó nevet alakítsunk át egy teljes névre.
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    *   Java7/8
        Oraclemár nem támogatja (Biztonsági hibajavítások biztosítása)  Java7.ERDDAP™Még mindig támogatjaJava7, de kérlek, költözzJava8. A következő kiadásERDDAP™valószínűleg szükség leszJava8.
    *   valid\\_min/max/range
Korábban és most, ha egydataVariableVoltscale\\_factorésadd\\_offsetmetadata,ERDDAP™kicsomagolja az adatértékeket, és eltávolítja ezt a metaadatot. Korábban,ERDDAP™nem módosított/csomagoltvalid\\_range,valid\\_min,valid\\_maxmetadata (amely általában / a csomagolt értékeket tartalmazza) általscale\\_factorésadd\\_offset... Most ezt teszi. Kérjük, keresse meg aERDDAP™"érvényes\\_", és győződjön meg róla, hogy az összes változó, amely rendelkezikvalid\\_range,valid\\_minvagyvalid\\_maxmegfelelő értékekkel rendelkezik, ha az adatkészletek megjelenik az új verzióbanERDDAP... Lásd[valid\\_range/min/max dokumentáció](/docs/server-admin/datasets#valid_range)...
    * ACDD-1.3
Korábban,ERDDAP™  (nevezetesen GenerateDatasets Xml) használt/ajánlott az eredeti (1.0) változata[NetCDFAttribute Convention for Dataset Discovery](https://wiki.esipfed.org/ArchivalCopyOfVersion1)amelyet "-nak" neveztek.UnidataDataset Discovery v1.0" a globális egyezményekben ésMetadata\\_Conventionstulajdonságok. Most ajánljuk[ACDD verzió 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)amelyet 2015 elején ratifikáltak, és „ACDD-1.3”-nak nevezik. Szerencsére az ACDD-1.3 nagyon visszafelé kompatibilis az 1.0 verzióval. Elképzeljük, hogy te[váltson az ACDD-1.3-ra](/docs/server-admin/datasets#switch-to-acdd-13)... Nem nehéz.
    * GenerateDatasets Xml tulajdonságok
Számos változás történt a javításhoz&lt;addAttributes&gt; A GenerateDatasets által javasolt értékek Xml a globális egyezményekhez,creator\\_name/email/url, kulcsszavak, összefoglaló és címjellemzők és változók számáralong\\_nametulajdonság. Néhány változás kapcsolódik az ACDD-1.3 új felhasználásához.
    * EDDTableFromSOSadatkészletek
Az új típusok alkalmi kiegészítésévelSOSszerverek és változások a régi szerverek, egyre nehezebbERDDAP™a szerver típusának automatikusan felismerése a szerver válaszaiból. [[[szerkesztés]]]]&lt;SosServerType&gt; (/docs/server-admin/adatkészletek#eddtablefromsos-skeleton-xml)   (az IOOS\\_NDBC, IOOS\\_NOS értékével,OOSTethysvagy WHOI) Mostanra szigorúan elismert. Ha az ilyen típusú adatkészletek bármelyikének problémái vannak az új verzióbanERDDAPPróbálja újra futtatni a GenerateDatasets-t Xml aSOSszerver létrehozni egy új darabotdatasets.xmlaz adatkészlethez. GenerateDatasets Xml lehetővé teszi, hogy kipróbálja a különböző&lt;sosServerType&gt; opciók, amíg megtalálja a megfelelőt egy adott szerver számára. Ha még mindig problémái vannak, hadd tudjam a problémát, amit látsz, és a szerver URL-je, és megpróbálok segíteni.
    * EDDTableFromFileNames adatkészletek
Néhány tulajdonság, amit ajánlottakaddAttributesmost forrásAttributes. Valószínűleg nem kell semmit megváltoztatnia a meglévő adatkészletekért az Önbendatasets.xml...
    * Bug fix bizonyos kérések EDDTableFromNcCFFiles adatkészletek.
Hozzátettem egy nagyszámú egységvizsgálatot is az alapul szolgáló módszerek meglévő nagyszámú egységvizsgálatához. (100 forgatókönyv van) ... Eli Hunternek köszönhetően.
    * Bug fix/kis változásEDDGridFromMergeIR.
Jonathan Lafite és Philippe Makowski
    * Bug fix:EDDGridFromErddap még akkor is működik, ha egy távoli adatkészlet nem rendelkezikioos\\_categoryváltozó tulajdonságok.
Kevin O'Briennek köszönhetően.
    * Bug fix .graph weboldalonEDDGridadatkészletek, ha csak egy tengely változó, több mint egy érték.
Charles Carletonnak köszönhetően.
    * Voltak más kis fejlesztések, változások és hibajavítások.

## Verzió 1.60{#version-160} 
 (2015-03-12) 

*    **Új funkciók (felhasználók számára) :** Nem
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * STRONGLY RECOMMENDED: Frissítse a szerverét[robotok.txt](/docs/server-admin/additional-information#robotstxt)fájl, hogy tartalmazza:
Párnák: /erddap/files/
    * Inotify probléma és megoldás:
Linux számítógépeken, ha használja&lt;frissítésEveryNMillis&gt; adatkészletekkel a típus=EDDGridFromFiles, EDDTableFromFiles,EDDGridMásolás, EDDTableCopy vagy alosztálya, láthat egy problémát, ahol egy adatkészlet nem terheli (alkalmanként vagy következetesen) hibaüzenet: "IOException: Az elért vagy túl sok nyílt fájl értesítésének felhasználói korlátozása." Ha igen, akkor megoldhatja ezt a problémát azáltal, hogy hívja (mint gyökér) :
echo fs.inotify.max\\_user\\_watches=65536|tee -a /etc/sysctl.conf
echo fs.inotify.max\\_user\\_instances=1024|tee -a /etc/sysctl.conf
Sysctl -p
Vagy használjon magasabb számokat, ha a probléma továbbra is fennáll. Az órák alapértelmezettje 8192. Az esetek alapértelmezettje 128.\\[UPDATE: Van egy hibaJavaami inotifikálja az eseteket, hogy ne gyűjtsenek szemetet. Ezt a problémát elkerülikERDDAP™v1.66 és magasabb. Tehát a jobb megoldás az, hogy váltson a legújabb verzióraERDDAP...\\]
    * NoSuchFileException Bug Fix:
Volt egy hiba, ami okozhat adatkészletek típus=EDDGridFromFiles, EDDTableFromFiles,EDDGridMásolás, EDDTableCopy, vagy azok alosztályai, hogy ne töltsenek alkalmanként a hiba "NoSuchFileException: _someFileName_". A hiba a FileVisitor használatával kapcsolatos, és bevezettékERDDAP™v1.56. A probléma ritka, és valószínűleg számos gyakran változó adatfájlokkal érinti az adatkészleteket.
    * Volt néhány kis fejlesztés, változások és hibajavítás.

## Verzió 1.58{#version-158} 
 (2015-02-25) 

*    **Új funkciók (felhasználók számára) :** 
    * Az új["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)rendszer lehetővé teszi, hogy böngészjen egy virtuális fájlrendszert, és letöltse a forrásadat fájlokat sokbólERDDAP™adatkészletek. A"files"a rendszer alapértelmezett, deERDDAP™Az adminisztrátorok letilthatják azt azáltal, hogy
```
        <filesActive>false</filesActive>  
```
aERDDAP™setup.xml fájl. Külön köszönet Philippe Makowskinak, aki ragaszkodott, amikor lassan értékelem ennek az ötletnek a szépségét.
    * Időcél Max -- Korábban az EDDTable adatkészletek időbeli változója a közeli valós idejű adatokkal rendelkezik a NaN célértékével, ami azt jelenti, hogy az adatkészlet maximális időértéke a közelmúltban van, de nem pontosan ismert és gyakran változik. Most, a célMax van egy igazi érték, jelezve a jelenleg ismert legutóbb. Számos adatkészlet folyamatosan frissített adatokat.ERDDAP™támogatja a legfrissebb adatokhoz való hozzáférést, még akkor is, ha a jelenleg ismert múlt idő után van. Ne feledje, hogy az új [[szerkesztés]]]&lt;frissítésEveryNMillis&gt; (/docs/server-admin/datasets#updateeverynmillis) támogatásEDDGridFromFiles és EDDTable FromFiles adatkészletek frissíti az idő változó célMax. Ennek a változásnak a másik következménye az, hogy adatasetID=allDatasetsAz adatkészlet most a maxTime oszlopokban jelenleg ismertté teszi. John Kerfootnak köszönhetően.
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * STRONGLY RECOMMENDED: Frissítse a szerverét[robotok.txt](/docs/server-admin/additional-information#robotstxt)fájl, hogy tartalmazza:
Párnák: /files/
Párnák: /erddap/files/
    * mintadatasets.xml- Tavaly számos kiváló adatkészletet ajánlottunk a part menti forgalombanERDDAP™hozzáadhatnád magadhozERDDAP™Csak néhány vonal hozzáadása az Ön számáradatasets.xml... Ha hozzáadta az erdVH adatkészleteket, kérjük, váltson az újabb erdVH2 adatkészletekre:
        * Készítsen egy másolatot az erdVH adatkészletekről, és változtassa meg a másolatotdatasetID"Az erdVH... az erdVH2-re... és a hivatkozottsourceUrlerdVH... az erdVH2...
        * Állítsa be az erdVH-t... az adatkészleteket az aktív="hamis" -ra.
    * MindenEDDGridFromFiles és EDDTable FromFiles alosztályok most támogatás [&lt;hozzáférhetőViaFiles&gt;] (/docs/server-admin/adtasets#accessibleviafiles) a forrásadatfájlok elérhetővé tétele a"files"rendszerek. Alapértelmezéssel ez a rendszer minden adatkészletre le van kapcsolva. Hozzá kell adnia a címkét, hogy lehetővé tegye. Philippe Makowskinak köszönhetően.
    * MindenEDDGridFromFiles és EDDTable FromFiles alosztályok most támogatás [&lt;frissítésEveryNMillis&gt; (/docs/server-admin/datasets#updateeverynmillis) ... Alapértelmezéssel ez a rendszer minden adatkészletre le van kapcsolva. Hozzá kell adnia a címkét, hogy lehetővé tegye. A Dominic Fuller-Rowell és az NGDC köszönhetően.
    * Az új[EDDTableFromFileNames](/docs/server-admin/datasets#eddtablefromfilenames)Adatkészletet hoz létre a szerver fájlrendszerében lévő fájlok csoportjáról, de nem szolgálja az adatokat a fájlokban. Például ez hasznos a képfájlok, audió fájlok, videofájlok, szófeldolgozó fájlok, és a táblázatfájlok forgalmazásához. Ez kézzel működik az új["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)rendszer, így a felhasználók letölthetik a fájlokat. Külön köszönet Philippe Makowskinak, aki ragaszkodott, amikor lassan értékelem ennek az ötletnek a szépségét.
    * Az új[EDDGridFromEDDTable](/docs/server-admin/datasets#eddgridfromeddtable)lehetővé teszi, hogy egy mesés adatállományt egy rácsolt adatkészletbe konvertáljon. Az Ocean Networks Canada-nak köszönhetően.
    * Az új[EDDGridFromMergeIRFiles](/docs/server-admin/datasets#eddgridfrommergeirfiles)összesíti a helyi MergeIR csoport adatait.gzfájlok.EDDGridFromMergeIRFiles a különbség, hogy az első darab kód hozzájárult, hogyERDDAP... Teljesen segítségünk nélkül történt. Három sark és különleges köszönhetően Jonathan Lafite és Philippe Makowski R.Tech Engineering.
    * Van egy új, opcionális setup.xml címke,&lt;egységTestDataDir&gt;, amely meghatározza a könyvtárat az egységes teszt adatfájlokkal, amelyek egy új GitHub repository segítségével érhetők el:[ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest)... Például:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
Ez még nem hasznos, de része a lépésnek, hogy minél több egység tesztet végezzen más emberek által. Terry Rankine-nak köszönhetően.
    * Sok kis fejlesztés, változások és hibajavítás volt.

## Verzió 1.56{#version-156} 
 (2014-12-16) 

*    **Új funkciók (felhasználók számára) :**   (Nem) 
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * Valószínűleg már tud róla[EDDGridFromErdap](/docs/server-admin/datasets#eddfromerddap)és[EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap)amely lehetővé teszi, hogy más adatkészletekhez kapcsolódjonERDDAPés megjelennek a teERDDAP... Ezekből az adatkészletekből származó tényleges adatok iránti kérelmek láthatatlanul a forráshoz vezetnekERDDAP™Így az adatok nem áramlanak át a rendszerén, vagy a sávszélességét használják. Most van egy nagy lista az ajánlott adatkészletekről a mintábandatasets.xmlerddapContent.zip... Tartsd be őket a teERDDAP™Mindössze annyit kell tennie, hogy másolja és beilleszti azokat, akiket a tiédbe akarszdatasets.xml... Conor Delaneynek köszönhetően.
    * Ha összeállítodERDDAP™Hozzá kell adnia néhány újat. jar fájlok a[osztálypath - cp kapcsoló](/docs/contributing/programmer-guide#development-environment)javac és java.
    * Az új[EDDTableFromCassandra](/docs/server-admin/datasets#eddtablefromcassandra)kezeli az adatok gyűjtését[Cassandra](https://cassandra.apache.org/)... Az Ocean Networks Canada-nak köszönhetően.
    * Az új[EDDTableFromColumnarAsciiFiles](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles)kezeli az ASCII adatfájloktól származó adatokat rögzített szélességi oszlopokkal. Philippe Makowskinak köszönhetően.
    * MindenEDDGridFromFiles és EDDTable FromFiles alosztályok most használ egy új módszer, FileVisitor (HozzáadásJava1.7) információkat gyűjteni a fájlokról. Ez nem lehet előnye a fájlinformációk első gyűjtésének egy adott adatkészlet számára, de úgy tűnik, hogy hatalmas előnye van a későbbi összejöveteleknek, ha hamarosan megtörténik, míg az OS még mindig rendelkezik az információval. Az NGDC-nek köszönhetően.
        
Még mindig ajánljuk: Ha egy adatkészlet nagyszámú fájlt tartalmaz (pl.:&gt;1,000) , operációs rendszer (és ígyEDDGridFromFiles és EDDTableFromFiles) sokkal hatékonyabban fog működni, ha a fájlokat egy sor aláíróban tárolja (egy évente, vagy havonta egy adatkészletek nagyon gyakori fájlokkal) Annak érdekében, hogy soha ne legyen sok fájl egy adott könyvtárban.
        
    * Számos kis fejlesztés az EDDTableFromAsciiFiles számára.
    * Néhány fejlesztés az EDDTableFromAsciiServiceNOS-hoz, különösen, hogy további információs oszlopokat szerezzen a forrásból. Lynn DeWittnek köszönhetően.
    * Az ISO 19115-hez kapcsolódó kis hibajavítások, amelyekERDDAP™generál. Anna Milannak köszönhetően.

## Verzió 1.54{#version-154} 
 (megjelent 2014-10-24) 

*    **Új funkciók (felhasználók számára) :** 
    * Néhány változó most dolgozik az idő a milliseconds precision, például 2014-10-24T16:41:22.485Z. Dominikai Fuller-Rowellnek köszönhetően.
*    **Kis változások/Bug javítások:** 
    * Bug fix: bizonyos körülmények kombinációjával,EDDGridFromNcFile adatkészletek visszatért adatok csökkent pontosság (pl. a duplák helyett úszók) ... Ez csak az adatértékeket érintheti a 8 jelentős számmal. Elnézést kérek. (És ez egy klasszikus számítógépes programozási hiba volt: egy rossz karakter.) Dominikai Fuller-Rowellnek köszönhetően.
    * Sok apró változás.
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * A Griddap adatkészletek most támogatják az időbélyegző tengelyváltozatokat és az adatok változóit (azaz változók az időértékekkel, de egydestinationNamemás, mint"time") ... Dominikai Fuller-Rowellnek köszönhetően.
    *   ERDDAP™most helyesen támogatja a milliszekundumokattime\\_precision"1970-01-01T00:00:00:00.000Z". Egy szándékos kiáltás: amikor időket ír az emberi orientált fájlokra (pl.: .csv,.tsv,.json,.xhtml) ,ERDDAP™használja a megadotttime\\_precisionha a másodperceket és/vagy döntő másodperceket tartalmaz; máskülönben másodperceket használtime\\_precision"1970-01-01T00:00Z" (konzisztencia és visszafelé kompatibilitás) ... Dominikai Fuller-Rowellnek köszönhetően.
    *   EDDGridFromNcFiles most támogatja a String olvasásátdataVariableS.
    *   .ncA griddap által írt fájlok most már StringdataVariableS.
    * GenerateDatasets Az Xml most több flusht tartalmaz () felhívja a figyelmet arra, hogy elkerülje a fájlokhoz nem írt információ problémáját. Thierry Valeronak köszönhetően.
    * A GenerateDatasetsXml dokumentációja javult, különösen arra, hogy rámutassa, hogy az -i kapcsoló csak akkor működik, ha megjelöli az összes választ a parancssoron. (pl. script mód) ... És a forgatókönyv módot elmagyarázzák. Thierry Valeronak köszönhetően.
    *   ERDDAP™már nem teszi lehetővé két változót egy adatkészletben, hogy ugyanaz legyensourceName... (Ha valaki korábban megtette, valószínűleg hibaüzenetekhez vezetett.) Mint korábban,ERDDAP™nem engedélyezi a két változót egy adatkészletben, hogy ugyanaz legyendestinationName...

## Verzió 1.52{#version-152} 
 (2014-10-03) 

*    **Új funkciók:**   (Nem) 
*    **Kis változások/Bug javítások:** 
    * Egy másik (kisebb) változás, hogyERDDAP™gyorsabb.
    * Javítás ISO 19115 fájlok által generáltERDDAPHozzáadott újonnan ajánlott&lt;gmd: protokoll & gt; értékek (információ, keresés,OPeNDAP:OPeNDAP,ERDDAPgriddap ésERDDAP:tabledap) belül&lt;gmd:CI\\_OnlineResource & gt; Derrick Snowdennek és John Maurernek köszönhetően.
    * Sok apró változás.
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * Bug fix: GenerateDatasetsXml.sh és DasDds.sh nem volt erddap.warban 1,48 és 1,50. Most ők is. Thierry Valeronak köszönhetően.
    * Kis változások bizonyos sebességvizsgálatok TestAll, hogy azok kevésbé érzékeny a véletlen. Terry Rankine-nak köszönhetően.

## Verzió 1.50{#version-150} 
 (megjelent 2014-09-06) 

*    **Új funkciók:**   (Nem) 
*    **Kis változások/Bug javítások:** 
    * Ez aERDDAP™sokkal gyorsabbnak kell lennie, mint a legújabb verziók.
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:**   (Nincs semmi) 

## Verzió 1.48{#version-148} 
 (megjelent 2014-09-04) 

*    **Új funkciók:** 
    *   ERDDAP™most mindig tabuláris adatkészletet hoz létre,datasetID=allDatasets, amely táblázatot tartalmaz az összes adatkészletről ebbenERDDAP... Bármely más tabuláris adatkészlethez hasonlóan lehet lekérni. Ez egy hasznos alternatíva a jelenlegi rendszer, hogy információt az adatkészletek programozva.
    * Két új kimeneti fájltípus van az EDDTable-hez ésEDDGrid, .csv0 és.tsv0. Képregény- és lapos értékű fájlok, amelyek nem rendelkeznek oszlopnevekkel vagy egységekkel. Az adatok az első sorban kezdődnek. Különösen hasznosak a szkriptek számára, amelyek csak egy darab információt akarnakERDDAP...
*    **Kis változások/Bug javítások:** 
    * A Térképek most a tartományban -720-720-720-ig terjednek.
    * Az új.ncml válasz File Type elérhető minden számáraEDDGridadatkészletek. Visszatér a[NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html)\\-formatizált leírás az adatkészletről (hasonló egy kombinált .dds + .das) ...
    * Bug fix: Tabular adatok mentése egy.ncA fájl változatos módon 100.000 értékre korlátozódott. Most csak 2 GB teljes fájlméretre korlátozódik. Kevin O'Briennek köszönhetően.
    * Bug fix: a mentésAsMatlabmódszerek most biztosítják, hogydatasetIDS biztonságossá váltakMatlabváltozó nevek. De még mindig erősen ajánlom, hogy hozzon létredatasetIDs ez érvényes változó nevek: kezdve egy levelet, majd csak használja A-Z, a-z, 0-9 és \\_. Lásd[datasetID](/docs/server-admin/datasets#datasetid)... Luke Campbellnek köszönhetően.
    * Bug fix EDDTableFromDatabase: Bizonyos típusú adatbázisokkal, NO\\_ A DATA válasz az adatbázisból egy értelmetlen 30 másodperces késéshez vezetettERDDAP... Greg Williamsnek köszönhetően.
    * Bug fix:EDDGridKészítsen egy grafikont a Graph Type = sorokkal (vagy markerek vagy markerek és vonalak) kényszerített x tengely változó, hogy idő. Most lehet bármilyen tengely. Lynn DeWittnek köszönhetően.
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * HATÁROZAT: frissítésJava  
Ez a verzióERDDAP™követelményekJava7 vagy annál magasabb, deJava7 fogja elérni az élet végét 2015 áprilisában (hamarosan&#33;) Tehát most jó ideje váltaniJava8. SzóvalJava8 HATÁROZATOS RECOMMENDED TesztelekJava8. Ne feledje, hogyJava6 2013 februárjában elérte az élet végét (Nincs több biztonsági hibajavaslat&#33;) ...
    * Stonegly RECOMMENDED: Frissítés Tomcat
Ha a Tomcatot használja, kapcsolja be a Tomcat legújabb verzióját. Tomcat 8 célja, hogy dolgozzon együttJava8.
    * "..."ERDDAP" többé nem akronym. Most ez csak egy név. Nem akarom a nevet kiemelniERD... Azt akaromERDDAP™kiemelni az intézményt és az adatait.
    * PEASE[testreszabja a megjelenésétERDDAP™telepítés, hogy kiemelje az intézmény és az adatok](/docs/server-admin/deploy-install#customize)... Egy órás munkával jó fejlesztéseket végezhet, amelyek örökké tartanak.
    * A beállításban.xml,&lt;A kijelzőDiagnosticInfo&gt; opció most mindig figyelmen kívül hagyja és kezeli, mintha az érték hamis lenne.
TUDATOK: Távolítsa el a&lt;megjelenítőDiagnosticInfo&gt; címke és kapcsolódó információ a setup.xml-től.
    * A setup.xml, az alapértelmezett&lt;drawLandMask&gt; "túl" volt, de most "alul", ami jobb általános alapértelmezettség (jól működik az összes adatkészlettel) ...
    * A GenerateDatasetsXml.sh és a DadDds.sh Linux szkriptek most csh helyett használnak bashot, és megvan a kiterjesztés .sh. Emilio Mayorga-nak köszönhetően
    * GenerateDatasets Az Xml és a DasDds most saját logfájlokat hoz létre (GenerateDatasetsXml.log és DasDds.log) Kimeneti fájlok (GenerateDatasetsXml.out és apuds.out) _bigParentDirectory_/logs/, és soha nem tette az eredményt a vágólapra.
    * GenerateDatasets Az Xml most egy -i parancssori paramétert támogat, amely egy meghatározott helyen beilleszti a kimenetet. Lásd:[dokumentáció](/docs/server-admin/datasets#generatedatasetsxml)... Terry Rankine-nak köszönhetően.
    * Az EDDTableFromDatabase most támogatja&lt;oszlopNameQuotes&gt;&lt;/columnNameQuotes&gt;, érvényes értékekkel " (az alapértelmezett) „, vagy semmi. Ez a karakter (ha valaki) az SQL lekérdezések előtt és után fogják használni. Különböző típusú adatbázisok, amelyek különböző módon vannak felállítva, különböző oszlopnév-kvótákra lesz szükség.
    * A tabuláris magasság és a hosszúság változói most testreszabhatóklong\\_name"S, pl. a Profil Latitude. Korábban csak Latitude és Longitude lehetnek.
    * Mostantól a "defaultDataQuery" és a "defaultGraphQuery" mint tulajdonságok az adatkészlet globális metaadatában (azaz,&lt;addAtts&gt;), nem különálló&lt;defaultDataQuery&gt; és&lt;defaultGraphQuery&gt; címkék. (Bár, ha még mindig megadja őket a címkéken keresztül,ERDDAP™automatikusan létrehozza a globális tulajdonságokat az információval.) 

## Verzió 1.46{#version-146} 
 (2013-07-09) 

*    **Új funkciók:** 
    *    (Nem) 
*    **Kis változások/Bug javítások:** 
    * Bug fix: Az EDDTableFromDatabase-ban csak 1.44 verzióban,ERDDAP™helytelenül idézte az adatbázis táblázat nevét az SQL nyilatkozatokban. Ez most rögzített. Kevin O'Briennek köszönhetően.
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    *    ** Ha nem módosítja a szabványos üzeneteket az üzenetekben.xml,
törlés\\[Tomcat\\]/content/erddap/messages.xml . **   
Az alapértelmezett üzenetek.xml fájl jelenleg az erddap. háborús fájl, nem erddapContent.zip... Tehát már nem kell manuálisan frissíteni az üzeneteket.xml .
    * Ha módosítja az üzeneteket az üzenetekben.xml, mostantól minden alkalommal, amikor frissítERDDAP™vagy:
        * Készíts ugyanazokat a változásokat, amelyeket az új
            \\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml.
És ez egy alkalommal: törlés\\[Tomcat\\]/content/erddap/messages.xml .
        * Vagy kitaláljuk, mi változott az új üzenetekben.xml (keresztül diff) és módosítsa a
            \\[Tomcat\\]/content/erddap/messages.xml fájl ennek megfelelően.

## Verzió 1.44{#version-144} 
 (2013-05-30) 

*    **Új funkciók:** 
    * Az EDDTable adatkészleteknek most támogatást ésorderByMin (...) ésorderByMinMax (...)   (amely minden egyes csoportban két sort ad vissza, az utolsó minimális és maximálisorderByérték) ... Lynn DeWittnek köszönhetően.
    * Két újtabledapfájltípusok:.ncCFHeader és.ncCFMAHeader (amely visszatér a megfelelő ncdump-szerű vezetőjéhez.ncCF és.ncCFMA fájltípusok) ... Steve Hankinnak köszönhetően.
*    **Kis változások/Bug javítások:** 
    * Bug fix: a .graph és a .html weboldalak betöltése a sok időértékű adatkészletekhez lassú volt, mertERDDAP™lassú volt, amikor létrehozta az időcsúcs opciókat. Most mindig gyors. Michael Barrynek, OOICI-nak és Kristian Sebastian Blalidnak köszönhetően.
    * Bug fix: Egyes EDDTable adatkészlettípusokban az időkorlátokat nem mindig kezelték megfelelően. Most ők is. John Maurernek és Kevin O'Briennek köszönhetően.
    * Bug fix: az adatkészletek nem töltenek be, ha az összessubsetVariablesrögzített értékváltozatok voltak. Most ők is. Lynn DeWittnek és John Petersonnak köszönhetően.
    * IMPROVED: most minden kérdés, hogy csak alkatrész változók működnek, mintha &distinct () a lekérdezés része.
    * IMPROVED: most, azokra a kérdésekre, amelyek tartalmazzák és.jsonp=_functionName_, _funkció Név_ MUST most egy sor 1 vagy több (Időszakos elválasztott) szavak. Minden szónak ISO 8859 betűvel vagy "\\_"-vel kell kezdődnie, és ezt 0 vagy több ISO 8859 betűvel, számjegyekkel vagy "\\_" követi. Igen, ez korlátozóbb, mintJavaScript követelményei a funkció nevekre.
    * A grafikonok ideje most jól működik a hosszabb időtartományoknál (80 - 10000 év) rövidebb időtartományok (0.003 - 180 másodperc) ...
    *   ERDDAP™most nagyobb megbocsátás az ISO-8601-formátus időadatok variációinak elkülönítésekor.
    * Sok más apró változás és hibajavítás volt.
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    *    **Frissítse a legújabb verziót, hogy biztonságos legyen.**   
        ERDDAP™biztonsági audit alá került. Voltak néhány hibák és gyengeségek. Az 1.44. verzió számos fontos biztonsági hibajavaslatot tartalmaz, és számos változást tartalmaz a biztonság és a hozzáférhetőség növelésére (pl. látáskárosító felhasználók esetében) ... Az 1.44. verzió átadta a nyomonkövetési biztonsági auditot. Az összes jó embernek köszönhetően az USGS-nél és az Acunetixnél, aki ezt lehetővé tette. (Nem kelleneNOAATedd ezt?) 
    * Az új[EDDTableFromWFSFiók](/docs/server-admin/datasets#eddtablefromwfsfiles)helyi másolatot készít az összes adatról egyArcGISMapServerWFSszerver és így az adatok gyorsan továbbíthatókERDDAP™felhasználók. Christy Caudillnek köszönhetően.
    * Az új[EDDTableFromEDDGrid](/docs/server-admin/datasets#eddtablefromeddgrid)lehetővé teszi, hogy létrehozzon egy EDDTable adatkészletet egyEDDGridadatkészlet. Néhány gyakori oka ennek:
        * Ez lehetővé teszi az adatkészlet lekérésétOPeNDAPkiválasztási korlátozások (melyik felhasználó kérhette) ...
        * Az adatkészlet eredetileg tabuláris adatkészlet. OOICI, Jim Potemra, Roy Mendelssohn.
    * A "mélység" változó név most a "magasság" különleges alternatívája. Az egységeknek a "mérők" valamilyen változatának kell lenniük. Az adatértékeknek pozitívnak kell lenniük = lefelé.ERDDAP™most teljesen tisztában van a "mélység" értelmével, és támogatja azt, ahol a magasságot támogatják (pl. a CF DSG cdm\\_data\\_type=profil adatkészlet összetevőjeként) ... Az adatkészletnek nem kell mind a "mély", mind a "magassági" változóknak lennie.
    * A tedatasets.xmlKérlek, távolítsa el minden használatát&lt;att name="cdm\\_altitude\\_proxy"&gt; mélység&lt;/att&gt; mivel a mélység most egy különleges alternatívája a magasságnak, így nem kell különösebben azonosítani.
    * A tedatasets.xmlKérlek, távolítsa el minden használatát&lt;altitudeMetersPerSourceUnit&gt;, kivéve az EDDTable-t TőleSOS...
Amikor az érték 1, csak törli.
Amikor az érték -1, fontolja meg a változó neve mélységét.
Más értékek esetén add hozzá&lt;addAttributesPéldául:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Az összes adatkészlet most támogatja
        
        *   &lt;defaultDataQuery&gt;, amelyet akkor használnak, ha .html-t nem kérik.
            * Valószínűleg ritkán kell használni ezt.
            * A hálózati adatkészletek esetében ennek egy közös használata egy másik alapértelmezett mélység vagy magassági dimenzió érték meghatározása. (pl.:\\[0 0\\]helyette\\[utolsó\\]) ...
Mindenesetre mindig fel kell sorolnia az összes változót, mindig ugyanazt a dimenzió értéket használja minden változó számára, és szinte mindig használjon.\\[0 0\\],\\[utolsó\\]vagy\\[0: utolsó\\]a dimenzió értékeiért.
Például:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * Merttabledapadatkészletek, ennek leggyakoribb használata, hogy meghatározza a különböző alapértelmezett időtartományt (a mostanihoz képest, pl.: &time & gt;=now-1 nap) ...
Ne feledje, hogy az adatok változóinak kérése ugyanaz, mint az összes adatváltozat meghatározása, így általában csak meghatározhatja az új időkorlátot.
Például:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;alapértelmezettGraphQuery&gt;, amelyet akkor használnak, ha a .graphot nem kérik.
            * Valószínűleg ritkán kell használni ezt.
            * A hálózati adatkészletek esetében ennek a leggyakoribb használata egy másik alapértelmezett mélység vagy magassági dimenzió érték meghatározása. (pl.:\\[0 0\\]helyette\\[utolsó\\]) és/vagy meg kell határozni, hogy egy adott változót grafikonozzák.
Mindenesetre szinte mindig használni fog\\[0 0\\],\\[utolsó\\]vagy\\[0: utolsó\\]a dimenzió értékeiért.
Például:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * Merttabledapadatkészletek, ennek a leggyakoribb felhasználása, hogy megjelölje a különböző változókat, egy másik alapértelmezett időtartományt (a mostanihoz képest, pl.: &time & gt;=now-1 nap) és/vagy különböző alapértelmezett grafikai beállítások (pl.: marker típus) ...
Például:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

Ne feledje, hogy XML-kódra vagy százalék-kódra van szüksége (vagy egy, de nem mindkettő) az alapértelmezett kérdések, mivel egy XML dokumentumban vannak. Például, és válik &amp; amp; ,&lt;apk;lt; és &gt; válik &amp;gt;
És kérjük, ellenőrizze a munkáját. Könnyű hibát követni, és nem kapja meg azt, amit akar.
Charles Carletonnak, Kevin O'Briennek, Luke Campbellnek és másoknak köszönhetően.
    *   EDDGridFromDap,EDDGridFromErddap és EDDTableFromEDDGridvan egy új rendszer, amely kezeli az adatkészleteket, amelyek gyakran változnak (olyan gyakran, mint minden 0,5 s) ... EllentétbenERDDAPRendszeres, proaktív rendszer minden adatkészlet teljes újratöltéséhez, ez az opcionális kiegészítő rendszer reaktív (egy felhasználói kérelem által kiváltott) Növekvő (frissíteni kell az információkat, amelyeket frissíteni kell) ... Például, ha egy kérés egyEDDGridFromDap adatkészlet több, mint a megadott számú milliszekundum az utolsó frissítés óta,ERDDAP™látni fogja, hogy vannak-e új értékek a baloldal számára (általában"time") dimenzió és ha igen, csak töltse le ezeket az új értékeket a felhasználó kérésének kezelése előtt. Ez a rendszer nagyon jó, ha egy gyorsan változó adatállományt naprakészen tartunk, minimális igényekkel az adatforráson, de egy kissé lassítja néhány felhasználói kérelmek feldolgozását. Lásd:&lt;frissítésEveryNMillis&gt; (/docs/server-admin/datasets#updateeverynmillis)   
Michael Barrynek és OOICI-nak köszönhetően.
    *   EDDGridFromNcFiles, EDDTableFromNcFiles és EDDTableFromNcCFFiles most támogatást[NcML.ncml ml](/docs/server-admin/datasets#ncml-files)forrásfájlok helyén.ncfájlok. Jose B Rodriguez Ruedának köszönhetően.
    * MertEDDGridAggregateExistingDimension,ERDDAP™támogatja az új szerverType="dodsindex" opciót a szerverType tulajdonságához&lt;sourceUrls&gt; címke. Ez olyan webhelyekkel működik, amelyek a fájlok listáit tartalmazzák&lt;pre&gt;&lt;/pre&gt; és gyakran egyOPeNDAPlogó. Egy példa[ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html)...
    * EDDTableFromSOSmost támogatja az opcionális címkét
```  
        <sosServerType>_serverType_</sosServerType>  
```
így megadhatja a típusátSOSszerver (ígyERDDAP™nem kell kitalálnia) ... Érvényes értékek&lt;_serverType_\\&gt; IOOS\\_NDBC, IOOS\\_NOS,OOSTethysés WHOI (egy újonnan támogatott szerver típus) ... Lásd[EDDTableFromSOS](/docs/server-admin/datasets#eddtablefromsos)... Derrick Snowdennek és Janet Fredericksnek köszönhetően.
    * MindenEDDGridFájlok, EDDTableFrom... Files,EDDGridMásolás és EDDTable Copy most támogat egy opcionális címke
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
amit mondhatERDDAP™Tartsa a fájlt táblázat (minden forrásadatfájlról információkkal) memória helyett csak a lemezen (az alapértelmezett) ... A fájlTable memória sebessége felkéri az adatokat (különösen, ha vannak &gt;1000 forrásadat fájlok) De több memóriát használ. Ha ezt minden adatkészlethez igazítod, tartsd szemmel a Memory-t: jelenleg a _yourDomain_ vonalat használod/erddap/status.htmlannak biztosítása, hogyERDDAP™Még mindig rengeteg szabad memóriával rendelkezik. A Fredrik Straynak köszönhetően.
    * Az EDDTableFromASCIIFiles most támogatja&lt;charset&gt;. A két leggyakoribb charset (érzékeny&#33;) ISO-8859-1 (az alapértelmezett) UTF-8.
    * Ajánlott: setup.xml, belül&lt;startHeadHtml&gt;, kérjük, változtasson&lt;html&gt; a
        &lt;html lang="en-US" (vagy más[nyelvkód](https://www.w3schools.com/tags/ref_language_codes.asp)ha lefordított üzeneteket.xml) ...
    * A setup.xml új opcionális címkékkel rendelkezik, amelyek letiltják a részeketERDDAP:
        *   &lt;átalakítókActive&gt; hamis&lt;/konverterekActive&gt;&lt;- az alapértelmezés igaz -&gt;
        *   &lt;SlideSorterActive&gt; Hamis&lt;/slideSorterActive&gt;&lt;- az alapértelmezés igaz -&gt;
        *   &lt;wmsActive&gt; hamisság&lt;/wmsActive&gt;&lt;- az alapértelmezés igaz -&gt; Általában azt javasoljuk, hogy bármelyiket hamisítsuk.
    * GenerateDatasets Az Xml most az eredményeket írja a _bigParentDirectory_/logs/generateDatasetsXmlLog.txt, nem log.txt. Kristian Sebastian Blalidnak köszönhetően.
    * GenerateDatasets Az Xml most jó javaslatot tesz a&lt;újratöltés MindenNMinutes&gt;. Köszönöm aNOAAUAF projekt.
    * Számos kis fejlesztés a GenerateDatasetsXml-hez. Köszönöm aNOAAUAF projekt.

## Verzió 1.42{#version-142} 
 (2012-11-26) 

*    **Új funkciók:** 
    *    (Nincs jelentős új funkció.) 
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * Ha frissülszERDDAP™1,38 vagy 1,40, nem voltak olyan változások, amelyek megkövetelik, hogy a konfigurációs fájlok módosítása (De használnia kell az új üzeneteket.xml fájlt) ...
    *   ERDDAP™ismét futhat együttJava1.6. (ERDDAP™v1.40 szükségesJava1.7.) Még mindig erősen ajánljuk a legújabb verzió használatátJava1.7.
    * Új adatkészlettípus,[EDDTableFrom AwsXmlFiles](/docs/server-admin/datasets#eddtablefromawsxmlfiles), olvashat adatokat egy sor automatikus időjárási állomásról (AWS) XML adatfájlok. Lynn Dewittnek és a Exploratoriumnak köszönhetően.
*    **Kis változások/Bug javítások:** 
    * Az NDBC változásaihoz igazodvaSOSforrásadatkiszolgálók.
    * Az NOS COOPS ASCII szolgáltatásainak változásaihoz igazodva.
    * Készítsen több apró változtatást és bug fixeket.

## Verzió 1.40{#version-140} 
 (2012-10-25) 

*    **Új funkciók:** 
    * Van egy új kimeneti fájl formátumtabledapadatkészletek:.ncCFMA, amely megmenti a kért adatokat egy.ncfájl, amely megfelel a CF[Discrete Sampling Geometries](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Multidimenzionális Array opciók, és ezért megfelel az NODC sablonoknak\\[2021: most a[NCEI sablonok](https://www.ncei.noaa.gov/netcdf-templates)\\]az ilyen típusú adatok tárolására. NODC-nek köszönhetően.
    *   tabledapa kérelmek most tartalmazhatnak időkorlátokat, például &time&gt;now-5 nap. Lásd:[dokumentáció](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)... James Goslingnek köszönhetően.
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * Ha frissülszERDDAP™1.38, nem voltak olyan változtatások, amelyek megkövetelik, hogy módosítsa a konfigurációs fájlokat (De használnia kell az új üzeneteket.xml fájlt) ...
    *   ERDDAP™nyilvános kiadások és belső mérföldkövek állnak rendelkezésre[ERDDAP™GitHub](https://github.com/ERDDAP)... További információkért lásd:[Wiki](https://github.com/ERDDAP/erddap/wiki)MertERDDAP™projekt, valamint az általánosabb[ERDDAP™Programozó útmutató](/docs/contributing/programmer-guide)... (Ezt néhány héttel azután jelentették be, hogyERDDAP™1.38 kiadás.) 
    * GenerateDatasets Az Xml javult.
        * A forgatókönyvet felülvizsgálták, így helyesen kell működnie minden Linux számítógépen (nem csak néhány) ...
        * Most hozzáteszicreator\\_name,creator\\_emailéscreator\\_urlbármikor lehetséges.
        * Sok más kis fejlesztés.
    * finomította, hogyanERDDAP™foglalkozik az idővel.
        * Internally,ERDDAP™most kezeli az időket a millisecond precision (nem másodpercek) ...
        * Most opcionálisan meghatározhatja az adott adatkészlet időtartamát, lásd[time\\_precision](/docs/server-admin/datasets#time_precision)... Például létrehozhat egy adathalmazt az időértékek megjelenítéséhez dátum pontossággal (pl.: 1970-01-01) ...
        * A jelenlegi adatkészletek fogják használni az alapértelmezett beállításokat, így ezek nem érintik ezeket a változásokat, és továbbra is megjeleníti az időt a második pontossággal. Servet Cizmelinek és Philip Goldsteinnek köszönhetően.
    *   [EDDTableFromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles)egy új adatkészlettípus, amelyet Ön használhatdatasets.xmlfájl. Elolvashatja az adatokat a számos fájlformátum közül, amelyet a[CF Discrete Sampling Geometries](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)egyezmények. A NODC-nek és különlegesnek köszönhetően a Kyle Wilcox-nak, hogy mintafájlokat készítsen a hatalmas számú érvényes DSG fájlformátumhoz, és nyilvánosan hozzáférhetővé tegye őket.
*    **Kis változások/Bug javítások:** 
    * Bővebben[GyorsRestart](#quick-restart)rendszer minden relevánsEDDGridEDDTable alosztályok.
    * Javított dokumentáció, különösen azzal kapcsolatos, hogyan kell használni[griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType)és[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType)különböző ügyfélszoftverekből.
    * Változott fejlett keresés támogatására MinTime és / vagy maxTime kifejezett epochSeconds. Lynn Dewittnak köszönhetően.
    * megváltozott.htmlTableoutput megjeleníteni urls és e-mail címek, mint linkek.
    * Hozzáadott "rel=" és "rev=" a relevánshoz&lt;href&gt; címkék. Pat Cappelaere-nek köszönhetőenOGC RESTprojekt.
    * Javított védelem az irreálisan nagy adatkérések ellen, különösen atabledap, ahol ez egy nehezebb probléma.
    * Több üzenetet küldött az üzenetekhez.xml.
    * Made sebesség javítása.
    * FixEDDGridFromFiles, hogy lehetővé tegye a felemelkedő rendezett tengelyek. Maricel Etchegaraynak köszönhetően.
    * Távolított hivatkozások az iGoogle-ra, mivel megszűnik.
    * Készítsen több apró változtatást és bug fixeket.

## Verzió 1.38{#version-138} 
 (2012-04-21) 

*    **Új funkciók:** 
    * ISO 19115 és FGDC -ERDDAP™automatikusan generálhat ISO 19115 és FGDC XML metaadat fájlokat minden adatkészlethez. A fájlokra való hivatkozások láthatóak az adatkészletek minden listáján (pl. a teljes szöveges keresésből) és a web hozzáférhető mappákban is (WAF)   (lásd:[FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/)és[ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/)) ... Ted Habermannnak, Dave Neufeldnek és sok másnak köszönhetően.
    * A teljes szöveges keresések az adatkészletekhez most \\-_excludedWord_ és \\- "kizárt phrase_" Rich Signellnek köszönhetően.
    * Az adatkészletek keresése most egy időben visszaadja az oldalt. Az alapértelmezettség a paramétercsíkot használja: oldal=1 & itemsPerPage=1000, de a kérelem URL-jében megváltoztathatja az értékeket. Steve Hankinnak és az UAF projektnek köszönhetően.
    *   OpenSearch-ERDDAP™most támogatja[OpenSearch1.1.](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html)szabvány az adatkészletek kereséséhez. Többek között ez lehetővé teszi a katalógus aggregációs weboldalak elosztott keresések (keresési kérelem átadása minden katalógushoz, amit tud) ...
    * Comma különválasztva Érték (CSV) File -ERDDAP™most CSV-fájlokat generál az értékek között (melyik Excel preferálja) a comma+space helyett. Jeff deLaBeaujardiere-nek köszönhetően.
    * Millió adatkészletek - Több változtatást tettek a támogatás érdekébenERDDAPóriási számú adatkészlettel, talán még egy millióval. Steve Hankinnak és az UAF projektnek köszönhetően.
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
#### Gyors újraindítás{#quick-restart} 
*   [A](#quick-restart)gyors újraindítási rendszer lehetővé tesziERDDAP™sokkal gyorsabb újraindítás.
     **Kérjük, add hozzá ezt a beállításhoz.xml fájlt** utána&lt;/datasetsRegex&gt;:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * Az adatkészletek teljes szöveges keresése most a Lucene keresőmotorral elvégezhető (Bár az eredeti keresőmotort ajánljuk, ha kevesebb mint 10 000 adatkészlete van) vagy az eredeti keresési rendszer.
         **Kérjük, add hozzá ezt a beállításhoz.xml fájlt** utána&lt;/displayDiagnosticInfo&gt;:
```
              <!-- ERDDAP™ lets you choose between two search engines for full text searches:
              \\* original (the default) -- is the best choice if your ERDDAP™ has fewer 
                than about 10,000 datasets.  It is very robust and trouble free. 
              \\* lucene -- is the best choice for more than about 10,000 datasets.
                The advantages are that with any number of datasets it works fast 
                and uses very little memory.
                But there are many things that might go wrong with individual 
                queries and with the whole system. 
                And although its behaviour (the datasets it finds and the order that
                it ranks them) is almost identical to the original search engine,
                it has a few quirky, subtle, small differences.
              -->
              <searchEngine>original</searchEngine>
```

    * A setup.xml-ben most két új kategóriát adhat hozzá a Comma-elválasztott listához&lt;categoryAttributes&gt;:
        * globális: kulcsszavak (add hozzá közvetlenül a globális: intézmény) - egy új különleges eset, amely a globális kulcsszavakból származó komákkal elválasztott listát választja ki, amelynek célja, hogy minden kulcsszava külön beléphessen.
        * változó név (add hozzá a végén) - egy új különleges eset, amely kategorizálja az egyeseketdataVariable destinationNameS.
    * A beállításban.xml, akkor lehet (De miért?) mondja:ERDDAP™nem kínál FGDC és / vagy ISO 19115 metaadat minden adatkészlet, beleértve
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

Ezeknek a beállításoknak az alapértelmezett értékek igazak.
    * Inkábbdatasets.xmlKérjük, vegye figyelembe a metaadatának javítását az adatkészleteihez.ERDDAP™most automatikusan generál ISO 19115 és FGDC XML metaadat fájlokat minden adatkészlet alapján adatkészlet metaadata.
Szóval, **a jó adatkészlet metaadata jóhoz vezetERDDAP- generált ISO 19115 és FGDC metaadata.**   
         **Lásd az új dokumentációt a sok új RECOMMENDED számára[Globális tulajdonságok](/docs/server-admin/datasets#global-attributes)...** 
    * Inkábbdatasets.xmlHa el akarod mondaniERDDAP™egy előre elkészített FGDC és / vagy ISO 19115 fájl használata, amely valahol a szerver fájlrendszerén van, ahelyett, hogyERDDAP™generálja ezeket a fájlokat, használja:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Ha a _fullFileName_\\="" vagy a fájl nem található, az adatkészletnek nincs FGDC és / vagy ISO 19115 metaadata. Tehát ez akkor is hasznos, ha el akarja nyomni az FGDC-t és/vagy az ISO 19115 metaadatot egy adott adatkészlethez.
    * Inkábbdatasets.xmlMindenértEDDGridSideBySide ésEDDGridAggregateExistingDimension adatkészletek, hogy bizonyos, hogy a gyermek adatkészletek különböződatasetIDa szülői adatkészleteknél és a többi gyermeknél. (Például követheti George Foreman egyszerű, de hatékony rendszerét a gyermekeinek megnevezésére.) Ha a család bármely neve pontosan ugyanaz, az adatkészlet nem terheli (a hibaüzenet, hogy az összesített tengely értékei nem rendezett rendben vannak) ...
    * Inkábbdatasets.xmlVolt néhány változás az érvényes listánioos\\_categorymetadata értékek:
        * "pCO2" változott a "CO2".
        * "A fizikai óceánográfia" hozzáadódott.
        * "A talajokat" hozzáadták.
    * Inkábbdatasets.xml,ERDDAP™már nem teszi lehetővé a "."-t egydatasetID... Megengedték, de elriasztották. (Sorry) 
    * Inkábbdatasets.xml, az EDDTableFromThreddsFiles és az EDDTableFHyraxA fájlok kissé megváltoztak, mert mindkét osztályt csak újraírták, hogy hatékonyabbak legyenek (mindkét osztály mindig készít helyi másolatot az összes távoli adatfájlról) ... Lásd a dokumentációt ezen osztályok létrehozásához:[EDDTableFromHyraxFiók](/docs/server-admin/datasets#eddtablefromhyraxfiles)és[EDDTableFromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles)... Különösen lásd a felülvizsgált megjegyzéseket a&lt;fájlDir&gt; (most irreleváns) és&lt;sourceUrl&gt; &gt; &gt; &gt; (most lényeges) ... Továbbá, soha ne csomagolja ezt az osztályt az EDDTableCopy-ban a hatékonyság érdekében.
    * Inkábbdatasets.xmlHa EDDTableFromDatabase-t használsz egyOracleadatbázis, tartalmaznia kell egy kapcsolatot Tulajdon, mint például
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
meg kell határozni, hogy hány sornyi adatot fetch egy időben, mert az alapértelmezés 10, ami szörnyen nem hatékony. Lásd:[Oracledokumentáció](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm)... A MySql és a PostgreSQL úgy tűnik, hogy jobb alapértelmezettséggel rendelkezik ehhez a beállításhoz. Kevin O'Briennek köszönhetően.
    * Ha EDDTableFromDatabase-t használ, lásd a javított["Speed" dokumentáció](/docs/server-admin/datasets#eddtablefromdatabase)további javaslatok a teljesítmény javítására. Kevin O'Briennek köszönhetően.
    * Inkábbdatasets.xml, minden EDDTable... adatkészletek, az egyezményekben ésMetadata\\_Conventionsglobális tulajdonságok, kérjük, utaljon a CF-1.6-ra (nem CF-1.0, 1.1, 1.2, 1.3, 1.4 vagy 1.5) Mivel a CF-1.6 az első verzió, amely tartalmazza a Discrete Sampling Geometryhez kapcsolódó változásokat.
    * Programozók, amelyek összeállítják aERDDAP™A kódnak hozzá kell adnia a lib/lucene-core.jar-t a Jar fájlok listájához a javac és a java parancssori útjaikban.
    *   ERDDAP™Van egy[új szolgáltatás](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html)átalakítani egy CF Standard neve / a GCMD Science Keyword. Lehet, hogy ez hasznos, ha generál globális kulcsszavak metaadata az adatkészletek az ÖnERDDAP...
    * A botok kezelése - Kérjük, olvassa el ezt a tanácsot[megakadályozza a botokat az összeomlástólERDDAP™hülye módon](/docs/server-admin/additional-information#robotstxt)...
    * Fordítás - A szövegERDDAPA weboldalak többnyire üzenetekben vannak.xml és így alkalmasak a különböző nyelvekre való fordításra (pl. német, francia) ... Az üzenetek most gyakran használják MessageFormat formázásra, szintén segítenek fordítások készítésében. Ha érdekel a fordítás, kérjük e-mailerd dot data at noaa dot gov...
    * mintadatasets.xml- Több kicsi, de jelentős hiba volt a mintábandatasets.xml... Ha ezeket az adatkészleteket használja, kérjük, szerezze be az új mintátdatasets.xmlaz új erddapContent.zipfájl. James Wilkinsonnak köszönhetően.
    * Git - Megpróbálok keményen csinálniERDDAP™GitHub projekt ASAP után ezt a kiadást.
*    **Kis változások/Bug javítások:** 
    * Egy új paletta, OceanDepth, hasznos a mélységi értékek számára (a pozitív) , pl. 0 (Súgó) 8000-ig (mély) ...
    * A.kmlkimenetbőltabledapHasznál egy jobb marker ikon (nem fuzzy) ... És egy marker fölötti elhelyezés most nagyobbá teszi.
    * EDDTableFromFiles - Az utolsó frissítésben az új netcdf-java könyvtár szigorúbb korlátozásokkal rendelkezett a változó nevek tekintetében.ncfájlok. Ez problémákat okozott az EDDTableFromFiles számára, ha a változósourceNamevolt bizonyos punctuációs karakterek. Az EDDTableFromFiles most módosított, hogy elkerülje ezt a problémát. Thomas Holcombnak köszönhetően.
    * A .subset oldal most támogatja 0/10/100/1000/1000/10000/100000 a Kapcsolódó adatok ellenőrzési doboza helyett. A tooltip figyelmeztet, hogy 100000 okozhatja a böngészőjét, hogy összeomlik. Annette DesRochersnek köszönhetően Richard (Abe) Coughlin és az IOOS biológiai projekt.
    * .../erddap/info/_datasetID_/index.html weboldalak most késztetéseket és e-mail címeket mutatnak kattintható linkként. Richardnak köszönhetően (Abe) Coughlin és az IOOS biológiai projekt.
    * Bug fix: IntabledapAdatkészletek magassággal MetersPerSourceUnit&lt;0, a magassági korlátozásokkal kapcsolatos kérdéseket helytelenül kezelték. Kyle Wilcoxnak köszönhetően.
    * Bug fix:EDDGridAz AggregateFromExistingDimension most több különböző TDS URL-t támogat. Köszönöm?

## Verzió 1.36{#version-136} 
 (2011-08-01) 

*    **Új funkciók:** 
    * Nincs jelentős változás a felhasználó álláspontjából.
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * A pmelTao adatkészlet, amelyet gyakran használtak minta adatkészletkénttabledap  
A dokumentáció már nem elérhető.ERDDAP™adminisztrátorok MUST ezeket a változásokat:
        * A tedatasets.xmlHa van egydatasetID="pmelTao" adatkészlet, add hozzá
aktív="hamis" közvetlenül a "&gt;" előtt a sor végén.
        * A beállításban.xml, ha a&lt;EDDTableIdExample&gt; pmelTao, akkor:
            * Ha a tedatasets.xmlnem rendelkezik adatkészletteldatasetID="erdGlobecBottle", add hozzá
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * A setup.xml, cserélje ki az összes címkét&lt;EDDTableIdExample&gt; keresztül
                &lt;EDDTableMatlabPlotExample vele
```
                <!-- Tabledap Examples
                This group of settings is used to make examples for the tabledap documentation 
                that appears at \\[baseUrl\\]/erddap/tabledap/documentation.html and elsewhere.
                If you include the erdGlobecBottle dataset in your datasets.xml (recommended), 
                you don't need to change these.
                If you don't, you MUST change these before you make your ERDDAP™ public; 
                otherwise, none of the examples will work!
                The new settings should be very similar to the defaults.
                If your ERDDAP™ won't serve any tabular datasets, use "NOT\\_APPLICABLE" for all of the entities.
                In .xml files like this, ampersand, lessThan, and greaterThan have to be 
                HTML encoded as "&amp;", "&lt;", "&gt;".
                -->
                <!-- This is the datasetID for an EDDTable dataset that is served by your ERDDAP.
                     This dataset is used as the basis for all of the EDDGrid examples below. 
                     Ideally, it is a dataset that has longitude, latitude, and time variables (among others). 
                     ('time' allows for making a time series graph. 'latitude' and 'longitude' allow for making a map.)
                     The dataset can have longitude values -180 to 180, or 0 to 360. -->
                <EDDTableIdExample>erdGlobecBottle</EDDTableIdExample>
                <!-- This is a comma-separated list of variables from the dataset.
                     It is useful if it is "longitude,latitude,time," plus a data variable name. -->
                <EDDTableVariablesExample>longitude,latitude,time,bottle\\_posn,temperature1</EDDTableVariablesExample>
                <!-- This is the constraints example which is appended to EDDTableVariablesExample. -->
                <EDDTableConstraintsExample>&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableConstraintsExample>
                <!-- This is an example data query using an ISO-formatted time. 
                     You could generate your example via your dataset's Data Access Form in ERDDAP.  -->
                <EDDTableDataTimeExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableDataTimeExample>
                <!-- This is an equivalent example data query, but which specifies time as seconds-since-1970-01-01. 
                     If you need to convert a date/time to "seconds since 1970-01-01", use
                     https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html -->
                <EDDTableDataValueExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=1029542400&amp;time&lt;=1029788280</EDDTableDataValueExample>
                <!-- This is an example query which generates a graph. 
                     You could generate your example via your dataset's Make A Graph form in ERDDAP.  -->
                <EDDTableGraphExample>bottle\\_posn,temperature1&amp;time=2002-08-19T10:06:00Z&amp;.draw=lines</EDDTableGraphExample>
                <!-- This is an example query which generates a map. 
                     In the default mapExample, temperature1, time, bottle\\_posn are useful 
                     because they appear in GoogleEarth with the .kml example 
                     and are ignored by the other image file types. -->
                <EDDTableMapExample>longitude,latitude,temperature1,time,bottle\\_posn&amp;time&gt;=2002-08-13T00:00:00Z&amp;time&lt;=2002-08-20T00:00:00Z&amp;bottle\\_posn=1&amp;.draw=markers&amp;.marker=5|5</EDDTableMapExample>
                <!-- This is a Matlab example which uses data from the EDDTableGraphExample.
                     Note the Matlab notation datasetName.variableName.  -->
                <EDDTableMatlabPlotExample>plot(erdGlobecBottle.bottle\\_posn, erdGlobecBottle.temperature1)</EDDTableMatlabPlotExample>
```
                
    * Az olyan adatkészletek esetében, ahol a típus az EDDTableFromFiles alosztálya, most adatokat készíthet a metaadatból.
Pontosabban, most változhat az értékek egy tulajdonság az egyik eredeti változó.
Például,datasets.xmlEgyen belül&lt;dataVariable&gt; címke, ha használja
```
        <sourceName>variable:cruise:PI</sourceName>  
```
        ERDDAP™variálhatóvá válik a cruise változó PI tulajdonságának értékeivel.
Hála a WOD-nak.
*    **Változások:** 
    * Kis változások

## Verzió 1.34{#version-134} 
 (2011-06-15) 

*    **Változások:** 
    * Bug fix: Rögzített egy memória szivárgás, amely néhány 64 bitesJavatelepítések.
    * Bug fix:ERDDAP™most helyesen állítja be ezeket a globális tulajdonságokat, amikor a szélességi dimenzió értékei magasról alacsonyra terjednek: geospatial\\_lat\\_min, geospatial\\_lat\\_lat\\_max, Southernmost\\_Northing, Northernmost\\_Northing.
        
Vegyük észre, hogyactual\\_rangeváltozatlan: lehet, hogy alacsony, magas értékek vagy magas, alacsony értékű értékek, mivel azt a célt, hogy jelezzék a tartományt és a tárolási rendet.
        
    * Kis változások.
    *   ERDDAP™Az adminisztrátoroknak nem kell változtatniuk a beállításukon.xml vagydatasets.xml...

## Verzió 1.32{#version-132} 
 (2011-05-20) 

*    **Változások:** 
    * Az újonnan ratifikált CF Discrete Sampling Geometries támogatása (amely sajnos még nem elérhető online) , amely helyettesíti a javasolt CF Point megfigyelési egyezményeket.
        ERDDAP™a felhasználók látni fogják, hogy a cdm\\_feature\\_type=Station helyettesíti a TimeSeries-t, és kis változások vannak a létrehozott fájlokban..ncCF fájltípus (flat\\_dimenziót most minta\\_dimenziónak nevezik) ...
        ERDDAP™Az adminisztrátoroknak meg kell tenniük ezeket a változásokatdatasets.xml:
        * cdm\\_data\\_type=Station kell változtatni cdm\\_data\\_type=TimeSeries.
        * cdm\\_data\\_type=StationProfilt módosítani kell a cdm\\_data\\_type=TimeSeriesProfile-re.
        * cdm\\_station\\_variables kell változtatni a cdm\\_timeseries\\_variables.
        * cf\\_role=station\\_id kell változtatni a cf\\_role=timeseries\\_id.
    * Újioos\\_categoryopciók: "Colored Dissolved Organic Matter", "pCO2", "Stream Flow", "Total Suspended Matter".
    * Lehetséges megoldás egy lehetséges memóriaszivárgásra 64 bitesJava...\\[Nem működött.\\]
    * Kis változások.

## Verzió 1.30{#version-130} 
 (2011-04-29) 

*    **Új funkciók:** 
    * 64 bites támogatásJava... Amikor 64 bitet használnakJava,ERDDAP™Most már sokkal több fegyveres memóriát használhat, és több egyidejű kérelmet kezelhet.
    * Támogatás.ncfájlkérések legfeljebb 2GB (64 bites nélkülJava) a jobb használat révénERDDAP"Az adatok kezelése a zsákokban.
    * Sok 2X sebesség javítása a kódban, és 2X sebesség felfeléJava1.6 készítésERDDAP™2X-4X gyorsabb, mint korábban.
    * A memóriamegtakarítási javulás jelentősen alacsonyabbERDDAPAlap memóriahasználat.
    * mesés adatkészletek esetében,ERDDAP™most teljesen tisztában van egy adatkészlet cdm\\_data\\_type-jával, és hogy az adatok hogyan térképeznek a CDM-típusra. Lásd:[CF Discrete Sampling Geometries specifikáció](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)... Talán egy nap, hogy a Word fájl átalakul a .html-re, és felváltja a jelenlegi "OBSOLETE" információt ezen a weboldalon. Köszönöm aNOAAUAF projekt.
    * A legtöbb EDDTable adatkészlethez egy új kimeneti fájltípus lehetőség,.ncCF, hozza létre a Contiguous Ragged Array.ncolyan fájlok, amelyek megfelelnek a legújabb verziójának[CF Discrete Sampling Geometries egyezmények](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)... Ezek a fájlok strukturáltak a CDM adattípusának tükrözésére. Mivel a javasolt egyezmények csak változtak, mint ez az írás, a netcdf-java könyvtár még nem támogatja az általa létrehozott fájlformátumok olvasásátERDDAPés CDM adatfájlként értelmezve őket. Valószínűleg hamarosan. Köszönöm aNOAAUAF projekt.
    * A View: Distinct Data opció a .subset weboldalon most egy ledobott lista, amely lehetővé teszi a felhasználók számára, hogy meghatározzák a különböző adatok számát, amelyeket megtekintenek (default = 1000) ... Ez a változás és mások megengedikERDDAP™olyan adatkészletekkel dolgozhat, amelyek nagyon sok különböző adatsorral rendelkeznek. (Az egyedülálló értékek száma minden egyes változó számára még mindig probléma, de nagyon magas lehet (20 000?) mielőtt a .subset és más weboldalak nagyon lassan töltenek be.) Köszönöm aNOAAUAF projekt.
    * A weblapoknak új lehetőségük van: Nézd meg a Distinct Data Counts-t. A GTOPP projektnek köszönhetően.
    * A felhasználók támogatása, a különböző értékek (pl. állomás nevek) A Make-A-Graph és az Adathozzáférési Formákon jelennek meg. Köszönöm aNOAAUAF projekt.
    * .transzparens A Png kérelmek most mindenféle grafikont és adatképviseletet támogatnak. Csak az adatokat vonzza - nem tengelyek, legendák, hulladékok vagy bármi más. Ez lehetővé teszi, hogy a képek, mint rétegek TransparentPngs. Ha &.size=_width_|_height_ van meghatározva a lekérdezésben (ajánlott) Megtiszteltetés. Az alapértelmezett 360x360 pixel. Az egyetlen kivételEDDGrid&.draw=felület, ahol az alapértelmezés (mint korábban) egy kép ~1/pixel adatpontonként (akár 3000 x és y pixel) ... Fred Hochstaedternek köszönhetően.
    * AWMSweboldalak most mutatják a színes bár az adatkészlet változó (s) ... Emilio Mayorgának és másoknak köszönhetően.
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * Ez a kiadás sok változást tartalmaz. Ezek mind fontosak. Kérjük, légy türelmes és dolgozzon az alábbi változásokon.
    * Ezt a verziót korábban tömörítik, minthogy foglalkozni akarnak néhányJavaBiztonsági hibák. Sajnos, több funkció / javítások tervezett erreERDDAP™A verzió nem szerepel ebben a verzióban. Sajnálom. Remélhetőleg a következő verzió viszonylag hamarosan (és sokkal könnyebb frissíteni, hogy) ...
    * Több biztonsági hiba elkerülése érdekébenJava6 frissítés 23 és lent, töltse le és telepítse a legújabb verziótJava  (Java6 frissítés 24 vagy annál magasabb) ... Ha 64 bites operációs rendszere van, kérlek, szerezzen egy 64 bites verziótJava...
    * Ha a Tomcat 5-et használja, frissítse a Tomcat 6-ot vagy 7-et (preferált) ... Ha a Tomcat 6-ot használja, fontolja meg a Tomcat 7 verziójának frissítését.
    * Kérjük, kövesse az összes utasítást[Új beállításERDDAP™](/docs/server-admin/deploy-install), de ahol releváns, akkor másolja fájlokat a régi telepítés az új telepítés, különösen az\\[Tomcat\\]/content/erddap könyvtár és fájlok. Ennek részeként vegye figyelembe a[új Tomcat beállítási ajánlások](/docs/server-admin/deploy-install#tomcat)...
    * Az alapértelmezett erddap.css most szerepel az erddap.war fájlban.
        * Az alapértelmezett erddap.css használatához, **törlés** régi\\[Tomcat\\]/content/erddap/images/erddap.css .
        * Ha módosított\\[Tomcat\\]/content/erddap/images/erddap.css, és szeretné használni: csak hagyja a helyére, és cserélje ki a helyére&lt;input&gt; rész:
```
            /\\* Small input items let more be shown on one screen  
            (esp. Chrome and Safari). Google Chrome and Safari have  
            default margin 2px, while others are 0. This sets all to 0.  
            .skinny is used e.g., for the buttons above the image on  
            a Make A Graph page. \\*/  
            input\\[type=button\\], input\\[type=submit\\], button {  
              margin:0px; padding:0px 3px; }  
            input\\[type=checkbox\\], input\\[type=password\\],  
              input\\[type=text\\], select, textarea {  
              margin:0px; padding:0px; }  
            input\\[type=radio\\] {margin:0px 2px; padding:0px; }  
            input.skinny {padding:0px 1px; }
```

    * A te\\[Tomcat\\]/content/erddap/setup.xml:
        * Cserélje ki a hozzászólásokat és címkéket kapcsolódó&lt;PartialRequestMaxBytes&gt; és&lt;PartialRequestMaxCells&gt; vele
```
            <!-- When possible (and it isn't always possible),  
            ERDDAP™ breaks source data requests into chunks to  
            conserve memory. See the description of these tags in  
            messages.xml. You can override the default chunk sizes  
            here with  
            For grids:  
             <partialRequestMaxBytes>100000000</partialRequestMaxBytes>  
            For tables:  
             <partialRequestMaxCells>100000</partialRequestMaxCells>  
            \\-->
```
        * Cserélje ki a hozzászólásokat&lt;categoryAttributes&gt; és fontolja meg a címke értékének módosítását:
```
            <!-- This is the comma-separated list (recommended:  
            in alphabetical order) of the global attribute and  
            variable attribute names which will be used to  
            categorize the datasets and shown to clients at urls  
            like .../erddap/categorize/ioos\\_category/index.html  
            (ioos\\_category is unusual, but is used at ERD).  
            If an attribute is a global attribute, identify it by  
            prefixing it with "global:".  
            \\-->  
            <categoryAttributes>global:institution, ioos\\_category,  
            long\\_name, standard\\_name</categoryAttributes>  
```

Egyéni&lt;categoryAttributes&gt; amelyek globális tulajdonságok most MUST azonosítható az előtag globális: (Globális: intézmény) ... Más tulajdonságok várhatóan változó tulajdonságok. (pl.:standard\\_name) ... Is, intézményi értékek (az egyetlenek) az eredeti esetben maradtak. Most az összes kategória értékek átalakulnak az alsógondozásra.
    * A te\\[Tomcat\\]/content/erddap/datasets.xml:
        * Big IMPROVED:ERDDAP™új követelményeket tartalmaz egy tabuláris adatkészlet cdm\\_data\\_type. Nevezetesen minden adatkészlet MUST rendelkezik a megfelelő metaadatokkal és változókkal a cdm\\_data\\_type-hez kapcsolódóan. Ha nem, az adatkészlet nem terheli, és hibát fog dobni. Lásd a dokumentációt[cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type)...
        * FYI: Van egy új adatkészlettípus: EDDTableFromAsciiServiceNOS.
        * FYI: Három újonnan engedélyezettioos\\_categoryopciók: Hidrológia, minőség (pl. minőségi zászlók esetében) és statisztika (pl.:) ...
        * Az EDDTableFrom... Files adatkészletek, távolítsa el minden&lt;nDimensions&gt; címkék. Már nem szükségesek vagy használtak.
        * A változók számáradestinationName=altitude,ERDDAP™többé nem kényszeríti along\\_nameMagasságosnak lenni. Kérlek, menj át a tedatasets.xmlés ismételten keress&lt;destinationName&gt;szélesség és hozzáadás a változóhoz&lt;addAttributes&gt;:
```
              <att name="long\\_name">Altitude</att>  
```
             (vagy valamivel máslong\\_namekülönleges esetekben) ...
        * Opcionális: Minden EDDTableFromFiles alosztály támogatja a változót[sourceName=globális:...](/docs/server-admin/datasets#global-sourcenames)a globális metaadatok átalakítása minden fájlból egy adatváltozatba. Lynn DeWittnek köszönhetően.
    * EDDTableFromDatabase felhasználók -ERDDAP™jön egy új JDBC 4 pilóta a Postgres. Más adatbázisokhoz ellenőrizze az internetet a legújabb JDBC .jar fájlhoz az adatbázishoz. ótaERDDAP™most használJava1.6+, JDBC 4 (nem 3) valószínűleg ajánlott.
    * FYI
        *   EDDGridFájlok és EDDTable ... Files adatkészletek most tárolja a fájlTable információt
            \\[bigParentDirectory[szerkesztés]\\]/dataset Info/\\[datasetID\\]/*.ncfájlok.
Ezenkívül az EDDTable adatkészletek most tárolják az alapinformációkat
            \\[bigParentDirectory[szerkesztés]\\]/dataset Info/\\[datasetID\\]/*.ncfájlok. Ezek a fájlok, amelyeket használtak
            \\[bigParentDirectory[szerkesztés]\\]/dataset Info/\\[datasetID\\]**.jsonfájlok.
A régi fájlokat automatikusan töröljük, amikorERDDAP™kezdődik. Vagy törölheti az összes fájlt (de hagyja el az üres aláírókat) benne\\[bigParentDirectory[szerkesztés]\\]/datasetInfo/.
        * Egy új EDDTableFromNcCFFiles-en dolgoztam, amely a javasolt, új CF Point Megfigyelési Egyezményeket használó helyi és távoli fájlokból olvasható. De ez nem ebben a kiadásban van. Vannak problémák a netcdf-java könyvtárak kapcsolódó néhány módszerek olvasására ezeket a fájlokat. És voltak néhány nagyon közelmúltbeli változások a javasolt CF Point megfigyelési egyezmények. Amikor a netcdf-java könyvtárat a legújabb javaslatra rögzítik és frissítik, folytatom a munkát.
        * RunningERDDAP™A Windows-on problémák lehetnek: nevezetesen láthatja a\\[bigParentDirectory/logs/log.txt fájl, amelyERDDAP™Néha nem képes gyorsan törölni és/vagy újranevezni a fájlokat. Ennek oka a víruskereső szoftver (pl. McAfee és Norton) amely ellenőrzi a vírusok fájljait. Ha belefutsz erre a problémára (amelyet a log.txt fájlban hibaüzenetek láthatnak, mint például "Felhasználódnak törölni ...") A víruskereső szoftver beállításainak megváltoztatása részben enyhítheti a problémát.
HaERDDAP™A Windows csak egy teszt fut az asztalon, ez csak bosszú.
HaERDDAP™A Windows az Ön nyilvánosERDDAP™fontolja meg a Linux szerverre való átállást.
    * Lassú első indítás - Az első alkalom, hogy futszERDDAP™frissítés után,ERDDAP™lassú lehet az adatkészletek betöltéséhez. Az útERDDAP™az összesített fájlokra vonatkozó információ megváltozott, ígyERDDAP™újra kell olvasni néhány információt az összes ilyen fájlból. Ez időbe telik.
    * Hiba a Startup-on - Tekintettel a cdm\\_data\\_type-hez kapcsolódó változásokra, valószínű, hogy néhány adatkészlet nem tölt be, és hibákat fog dobni. Óvatosan olvassa el a Daily Report e-mailt, amelyERDDAP™küldjön, amikorERDDAP™befejeződött a kezdés. Lesz egy lista az adatkészletekről, amelyek nem töltöttek be (a csúcson) és az ok, amiért nem töltöttek be (közel az alsóhoz) ...
    * Ha elakadsz vagy más kérdéseid vannak, e-mailt küldj nekem:erd.data at noaa.gov...
    * Programozók - Ha írszJavaprogramok futásERDDAP™kód, meg kell változtatni néhány parancssor paraméter referenciák:
        * Változtassa meg a joda-time-1.6.2.jar-t a joda-time-ra. jar
        * Változtassa meg a Postgres JDBC .jar referencia posztgresql.jdbc.jar
*    **Kis változások és Bug javítások:** 
    
    * Javított kapcsolatkezelés a ung szálak elkerülése érdekében.
    * A közel egyidejű azonosító kérések hatékonyabb kezelése érdekében javított közbeszerzési gyakorlatok.
    *   ERDDAP™most használja a netcdfAll-4.2.jar (átnevezett netcdfAll-latest. jar) ... Ez a kapcsoló több belső változást igényelt, és néhány kisebb külső változtatást okozott, például a grib fájlok olvasásának és apró változásainak megváltoztatását..ncFejlesztő kimenet.
    * Új funkció:\\[erddap\\]/convert/fipscounty.html konvertálFIPSmegyei kódok a megyei nevektől/számlálástól.
    * A térképeken az állami határok most sötét ibolya, így jobban kiemelkednek minden háttérszínen.
    * Tabular.kmla kimenet ismét egy körkörös ikont használ a pontok jelölésére (nem a repülőgép ikon A Google nemrég váltott) ...
    * Az erdCalcofi-adatbázisokat átrendezték, és most szolgálnak a helyi fájlokból (Gyorsabb) ...
    * GenerateDatasets Xml a Thredds A katalógus most létrehoz egy eredményfájlt:
        \\[Tomcat\\]/webapps/erddap/WEB-INF/temp/EDDGridFromThreddsCatalog.xml. Kevin O'Briennek köszönhetően.
    * GenerateDatasets Xml a Thredds Katalógus most megpróbálja eltávolítani a felesleges portszámokat a forrás URL-ekből (pl.:8080 és :8081 néha eltávolítható) ... KöszönömNOAAközponti biztonsági csapata.
    * A .subset weboldalak esetében a Distinct Data térképe most egy változó lat lon tartományt tartalmaz.
    * Több lista aERDDAP™  (pl. az asztal, amely az összes adatkészletet mutatja) úgy rendezték, hogy az A.Z rendezett..z... Most eset-érzékeny módon rendeznek.
    * Kis változások a .subset weboldalak, beleértve: egységeket most jelezték.
    * GenerateDatasets Az Xml és a DasDds már nem dob kivételt, ha képtelen az eredményeket a rendszer vágólapjára vagy az InBrowser megjelenítésére tenni. Eric Bridgernek és Greg Williamsnek köszönhetően.
    * Bug fix: Amikor az adatkészleteket betöltik,ERDDAP™most eltávolítja vagy kiigazítja a geotéri globális tulajdonságokat. Charles Carletonnak köszönhetően.
    * Bug fix: String2.getClassPath () most megfelelően százalékos csökken az osztály Útvonal (nevezetesen a Windows-on a fájlnév űrei a %20-nak tűntek fel) ... Ez érintettERDDAP™EDStatic call SSR.getContextDirectory () tartalom/erddap megtalálása. Abe Coughlinnak köszönhetően.
    * Bug fix: az EDDTableFromFiles-ben a GetDataForDapQuery-kezelés () kérések. Eric Bridgernek köszönhetően.
    * Bug fix:tabledapa kérelmek nem kezelték megfelelően a magassági korlátozásokat, amikor az adatkészlet magassága MetersPerSourceUnit -1 volt. Eric Bridgernek köszönhetően.
    * Bug fix: EDDTableFrom... Files adatkészletek most helyesen kezeli a kérelmeket, amelyek közé tartozik a =NaN és &#33;=NaN.
    
## Verzió 1.28{#version-128} 
 (2010-08-27) 

*    **Új funkciók:** Nem.
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** Nem.
*    **Bug Fix:** Fix egy programozási hiba (csak az 1.26. versben) megtettERDDAP™nagyon lassú.
     

## Verzió 1.26{#version-126} 
 (2010-08-25) 

*    **Új funkciók:** Nem.
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** 
    * Tőled\\[Tomcat\\]/content/erddap/setup.xml,
        * Inkább&lt;jogi&gt; egy új vonalon\\[szabvány DataLicenses\\], betét\\[StandardContact\\]...\\[StandardContact\\]hivatkozik a&lt;AdminEmail&gt; megjelölt magasabb a setup.xml-ben.
        * Távolítás&lt;tableCommonBGColor&gt; és&lt;asztalHighlightBGColor&gt;.
        * Ajánlott: Változás&lt;végBodyHtml&gt;
```
            <endBodyHtml><!\\[CDATA\\[  
            <br>&nbsp;  
            <hr>  
            ERDDAP, Version &erddapVersion;  
            <br><a href="&erddapUrl;/legal.html">Disclaimers</a> |  
            <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy Policy</a> |  
            <a href="&erddapUrl;/legal.html#contact">Contact</a>  
            </body>  
            \\]\\]></endBodyHtml>
```

    * Szükséges: A te\\[Tomcat\\]/content/erddap/images/erddap.css és erddapAlt.css, add hozzá az alján:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Bug Fixes és kis változások:** 
    
    * Bug fix: egyes helyzetekben a formák nem működtek az Internet Explorer egyes verzióiban. Nagyon köszönöm Greg Williamsnek.
    * Bug fix: A Make A Graph gombok nem működtek, ha az adatkészlet távolról érkezettERDDAP...
    * Bug fix:WMSNéha nem működött, ha az adatkészlet távolról érkezettERDDAP...
    * Sok apró változás és hibajavítás.
    

## Verzió 1.24{#version-124} 
 (2010-08-06) 

*    **Új funkciók:** 
    * Új[Subset weboldalak](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html)használat szembesült keresés a mentő adatkészletek alkészleteinek kiválasztására. A POST-nak köszönhetően.
    * Új[Fejlett keresés](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html)ötvözi az összes többi keresési lehetőséget, és hozzáadja a hosszúságot, a szélességet és az időkorlátozó dobozokat. Ellyn Montgomerynek köszönhetően. (Sajnálom a késést.) 
    * Új[Convert idő](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)weboldal és szolgáltatás lehetővé teszi számszerű idők átalakítását / az ISO-sztring időkből.
    * Új[Konvert egységek](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html)weboldal és szolgáltatás lehetővé teszi, hogy átalakítsaUDUNITSaz UCUM egységekről. KöszönömNOAAIOOSSOS...
    * Ha egytabledapkérelem tartalmazza &units ("UCUM") Az egységek neveit eredeti nevekből fogják átalakítani (általábanUDUNITS) a[UCUM](https://unitsofmeasure.org/ucum.html)egység nevek. Ez csak az egységeket érinti\\*nevek\\*nem adatértékek. KöszönömNOAAIOOSSOS...
    * Javítások készíteni egy Graph weboldalak és grafikonok és térképek:
        * Ha a grafikon egy térkép, van új Make A Graph gombok zoom in/out és egy új lehetőség, hogy kattintson a változás a térkép középpontjában. A POST-nak köszönhetően.
        * Szűrő beállítások hozzáadott közel az alsó. Greg Williamsnek köszönhetően.
        * A part menti adatfájlokban beépített adatokat a GSHHS v2.0-ra frissítették. A POST-nak köszönhetően.
        * Térképek most tartalmazzák a tókat és a folyókat. A POST-nak köszönhetően. (Sajnálatos, hogy a Sacramento River Delta hiányzik, mert sem a partvonal adatai, sem a tó / folyó adatkészlet nem foglalkozik vele.) 
        * A pscoast-derived nemzet/állami fájlokban épült. A POST-nak köszönhetően.
        * Topography.cpt kissé módosított. (Sajnálja, hogy ez hátrányosan befolyásolja Önt.) A POST-nak köszönhetően.
        * A griddap's Make A Graph, ha a felhasználó megváltoztatja a változót, a forma automatikusan lemond, hogy aaxisVariableS' ShowStartAndStop mindig tükrözi a grafikus változókat. Joaquin Trinanesnak köszönhetően.
        * Png és pdf kép URL:
            * New &.land=_value_, ahol a _value_ „szükségtelen” lehet (show topográfia) vagy "túl" (Csak mutatjon fürdőmetriát) ... Ha nem meghatározott, az alapértelmezést az[drawLandMask](/docs/server-admin/datasets#global-drawlandmask)bennedatasets.xmlvagy setup.xml. A POST-nak köszönhetően.
            * Új: a legenda olyan vonalak, amelyek túl hosszúak, automatikusan megszakadnak több sorba. A POST-nak köszönhetően.
        * Png kép URL-ekhez:
            * New &.legend=_value_, ahol a _value_ "Lottó" lehet (default) "Off" vagy "Only". Ez lehetővé teszi a legendát, kizárja a legendát, vagy csak a legendát kapja. Cara Wilsonnak köszönhetően.
            * New &.trim=_n Pixels_ elhagyja az nPixels határát (pl. 10) a kép alján. Ezt követően .legend=Off. Cara Wilsonnak köszönhetően.
            * New &.size=_width_|_height_ lehetővé teszi a kép szélességét és magasságát, pixelekben.
    * Új kimeneti fájlformátumok:
        * .csvp és.tsvp - mint .csv és.tsv, de a " (_units_) "Az első sorban oszlop nevekre jutottak.
        * .odvTxt - egy .txt fájlt készít, amely egyszerűsíti az adatok beszerzését[Ocean adatok Megtekintés (ODV) ](https://odv.awi.de/)...
        * .esriCsv - készít egy .csv fájlt, amely alkalmas az ESRI importjáraArcGIS... (A tabuláris adatkészletek csak) Jan Masonnak, Jeff de La Beaujardierenek ésNOAAIOOSSOSprojekt.
    * GUI fejlesztések a[Kategorizálás](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html)weboldalak. Továbbá a kategorizáló értékek (más, mint intézmény) Most már minden alsóbb eset. A nem-alacsonyabb kérelmeket elfogadják (Átirányítás) visszafelé kompatibilitásra. Roy Mendelssohnnak köszönhetően.
    * A hibaüzenetek még rövidebbek és orientáltabbak a felhasználók számára. Greg Williamsnek köszönhetően.
    * Belső változás, amely nagymértékben csökkentERDDAPAlap memóriahasználat.
    * Számos új funkció, amelyek csak a POST projekt szempontjából relevánsak.
*    **A dolgokERDDAP™Az adminisztrátoroknak tudniuk kell és meg kell tenniük:** Sok változás van. Sajnálom. De mindegyik szép előnyökkel jár.
    * Nagy változások a GenerateDatasetXml - ez most gyakran több kérdést (lásd a relevánst[adatkészlet típusok](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types)információ) és most mindig alapvetően kész tartalmat generáldatasets.xml... Még mindig felelős a beállításért, így még mindig felül kell vizsgálniadatasets.xmltartalom, mielőtt használja. A projektbe való emberi erőfeszítés mindig jobb, mint egy számítógépes program. Az UAF projektnek köszönhetően.
    * KÉRDÉS: A setup.xml-ben felül kell vizsgálniaWMSrész. Most tartalmaznia kell ezeket a címkéket (de úgy érzi, szabad megváltoztatni az értékeket) :
```
        <!-- These default accessConstraints, fees, and keywords are used 
        by the SOS, WCS, and WMS services.
        They can be overridden by "accessConstraints", "fees", "keywords" 
        attributes in a dataset's global metadata.
        If a dataset that has an "accessibleTo" tag doesn't override 
        "accessConstraints", then the default for "accessConstraints" is the
        "accessRequiresAuthorization" value.  
        -->
        <accessConstraints>NONE</accessConstraints>
        <accessRequiresAuthorization>only accessible to authorized
        users</accessRequiresAuthorization>
        <fees>NONE</fees>
        <keywords>Earth science, oceans</keywords> 
        
        <!-- This appears on the erddap/legal.html web page after the 
        General Disclaimer. 
        You can replace any of the \\[standardParts\\] with your own HTML. -->
        <legal><!\\[CDATA\\[
        \\[standardDisclaimerOfEndorsement\\]
        \\[standardDisclaimerOfExternalLinks\\]
        \\[standardPrivacyPolicy\\]
        \\[standardDataLicenses\\]
        \\]\\]></legal>
        
        <!-- Specify the default units standard (e.g., "UDUNITS" 
        (the default) or "UCUM") that you (the ERDDAP™ admin) are using to 
        specify units.  The value is case-sensitive.
        This is used by ERDDAP's SOS server to determine if the units need to
        be converted to UCUM units for WMS and SOS GetCapabilities responses. 
        -->
        <units\\_standard>UDUNITS</units\\_standard>
        
        <!-- For the wms examples, pick one of your grid datasets that has
        longitude and latitude axes.
        The sample variable must be a variable in the sample grid dataset.
        The bounding box values are minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>
```

    * REQUIRED: A setup.xml-ben, másolja és pazarolja ezt az új javasolt&lt;startHeadHtml&gt; a régi verzió helyettesítésére. De úgy érzi, szabad, hogy változtatásokat a preferenciák.
```
        <!-- startHeadHtml has the start of the HTML document and the 
        'head' tags (starting at "<!DOCTYPE>", but not including 
        "</head>") for all HTML web pages. 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, 
          css files, etc. must be in \\[tomcat\\]/content/erddap/images or a 
          subdirectory and must be referenced here with 
          &erddapUrl;/images/\\[fileName\\].
        
        favicon.ico is the image that browsers associate with your website.
        For more information, see https://en.wikipedia.org/wiki/Favicon .
        You can use your own favicon.ico file by putting it in 
          \\[tomcat\\]/content/erddap/images. 
        
        \\*\\*\\* Optional: you can change the appearance of all of your 
        ERDDAP's HTML pages by changing the CSS <style> settings below.
        
        For an example of a very different style, change the import reference
        to <tomcat>/content/erddap/images/erddapAlt.css
        
        \\*\\*\\* If your CSS style includes links to files (e.g., images), that 
        style information must be inline in the style tag below, after the
        'import' line, not in the .css file.  
        Put all of the (e.g., image) files in the 
        \\[tomcat\\]/content/erddap/images directory (or a subdirectory) and 
        reference them below starting with &erddapUrl;.
        Why? On ERDDAP™ https: web pages, \\*all\\* links should use "https:" 
        (not "http:"); otherwise, most browsers consider the web page not 
        fully secure.  Because ERDDAP™ would use the same .css file for 
        http: and https: web pages, the links within the .css file wouldn't 
        switch between http: and https:.  There doesn't seem to be a way 
        around this other than using inline style information.
        -->
        <startHeadHtml><!\\[CDATA\\[ 
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
          "http://www.w3.org/TR/html4/loose.dtd">
        <html>
        <head>
        <title>ERDDAP</title>
        <link rel="shortcut icon" href="&erddapUrl;/images/favicon.ico">
        <style type="text/css">
        <!--
          @import "&erddapUrl;/images/erddap.css";
        -->
        </style>
        \\]\\]></startHeadHtml>
        
        <!-- The tableCommonBGColor MUST be the same color as the 
           table.commonBGColor in erddap.css above. Suggested is #f1ecd8. 
           But if you use erddapAlt.css, change this to #e7dec5. -->
        <tableCommonBGColor>#f1ecd8</tableCommonBGColor>
        
        <!-- This is used, e.g., for the type=variable rows on the metadata
          info tables. -->
        <tableHighlightBGColor>#cceecc</tableHighlightBGColor>
```

Köszönhetően POST, Hans Vedo és Rick Blair.
    * REQUIRED: A beállításban.xml,&lt;startBodyHtml&gt; megváltoztatja a&lt;test&gt; címke, hogy csak&lt;test&gt; mivel a stílust most az erddap.css határozza meg.
    * REQUIRED: A beállításban.xml, változtassa meg ezt&lt;endBodyHtml&gt; (de változtassa meg az e-mail címét az e-mail címére, és szabadon érezze magát, hogy más változásokat hozzon létre) :
```
        <!-- The end of the body of the HTML code for all HTML web pages
          (with "</body>" at the end). 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, etc. 
          must be in \\[tomcat\\]/content/erddap/images or a subdirectory
          and must be referenced here with &erddapUrl;/images/\\[fileName\\].
        
        You can change this, but please keep "ERDDAP, Version &erddapVersion;"
        and these references to the Disclaimers and Privacy Policy. -->
        <endBodyHtml><!\\[CDATA\\[ 
        <br>&nbsp;
        <hr>
        ERDDAP, Version &erddapVersion;
        <br><font class="subduedColor">Questions, comments, 
          suggestions?  Please send an email to 
          <tt>erd dot data at noaa dot gov</tt>
        <br>and include the ERDDAP™ URL directly related to your question
          or comment.
        <br>
          <a href="&erddapUrl;/legal.html">Disclaimers</a> | 
          <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy 
            Policy</a>
        </font>
        </body>
        \\]\\]></endBodyHtml>
```

    * HIGHLY RECOMMENDED: A setup.xml-ben az ajánlott&lt;AShortDescriptionHtml&gt; most
```
        <theShortDescriptionHtml><!\\[CDATA\\[ 
        <h1>ERDDAP</h1>
        This website (the Environmental Research Division's Data Access 
        Program) aggregates scientific data from diverse local and remote 
        sources and offers you a simple, consistent way to download subsets 
        of the data in common file formats and make graphs and maps.
        This particular ERDDAP™ installation has oceanographic data
        (for example, data from satellites and buoys).
        
        \\[standardShortDescriptionHtml\\]
        \\]\\]></theShortDescriptionHtml>
```

Érezz szabadon megváltoztatni ezt, különösen az utolsó mondatot az első bekezdésben.
    * A setup.xml, e-mailEverythingTo és e-mailDailyReport Ahhoz, hogy most összeomlott listák az e-mail címek. Az első e-mailMinden Ahhoz, hogy különleges, pl. az EDDXxxxFromErddap adatkészletek előfizetései ezt az e-mail címet használják. John Maurernek köszönhetően.
    * Az e-mail hibák most bejelentkeznek\\[bigParentDirectory[szerkesztés]\\]/logs/emailLogYYYY-MMM-D.txt fájl.
    * A setup.xml-ben van egy új, opcionális paraméter az e-mail fiók tulajdonságainak beállításához (általában közvetlenül az után, hogy&lt;e-mail cím:
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

Az alapértelmezés semmi. Rich Signellnek köszönhetően.
    * KÉRDÉS: Ha EDDTableCopy-t használsz vagyEDDGridMásolás, meg kell tennie mindent\\[bigParentDirectory[szerkesztés]\\]/copy / könyvtárak és fájlok, amelyek "xh"-t tartalmaznak a könyvtárban vagy a fájlnévekben a régi megállítása utánERDDAP™és az új kezdetek előttERDDAP™így ezeket a fájlokat újra másolják. Nagyon sajnálom, de fontos volt a változás, és remélhetőleg kevés admint és néhány fájlt érint.
A Linuxban megtalálhatja ezeket a fájlokat, cd\\[bigParentDirectory[szerkesztés]\\]/copy
találj&#33;\\*xh\\*  
Windows-ban megtalálhatja ezeket a fájlokat, Start|Keresés
Mit szeretne keresni: dokumentumok
A fájlnév egésze vagy része: xh
Nézd meg: Browse -&gt;\\[bigParentDirectory[szerkesztés]\\]/copy
Kattintson a „Search”-ra
A kiválasztani őket minden
Del törölni őket mind
    * KÉRDÉS: Indatasets.xml, az EDDTableFromDatabase adatkészletek esetében a dátum és az ütemezés változói módok megváltoztatják az adatokat Típus kettős és az egységek másodpercek óta 1970-01-01T00:00Z. Kérdezzük meg, hogy tárolja az időmérő adatokat az adatbázisban\\*vele\\*időzóna. Időzóna-információk nélkül a kérdések, amelyekERDDAP™elküldi az adatbázist és az eredményeket, amelyekERDDAP™A JDBC-n keresztül származó adatbázis kétértelmű, és valószínűleg téved. Megpróbáltuk, de nem találtunk megbízható módszert az „időjármű nélküli” adatok kezelésére. Úgy gondoljuk, hogy ez egyébként jó gyakorlat. Végtére is, a "timestamp időzóna nélküli" adatok egy implied timezone. Bár nagyszerű, hogy az időzóna nyilvánvaló az adatbázis admin számára, értelme van kifejezetten meghatározni, hogy más szoftverek megfelelően kölcsönhatásba léphessenek az adatbázisával. Köszönöm/sajnálom Michael Urzent.
    * HIGHLY RECOMMENDED: Indatasets.xml, hogy lehetővé tegye a .subset weboldalak számára, hogy szembenézzenek a tambuláris adatkészletek keresésével, hozzá kell adnia [&lt;subsetVariables&gt;&gt;&gt;&gt;&gt;&gt; (/docs/server-admin/adatbázisok#subsetvariables) az adatkészlet globális tulajdonságaihoz.
    * JELENTÉS:datasets.xmlHa rendelkezik az adatkészletteldatasetID="pmelGtsppp", kérjük, változtassa meg, hogy
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * JELENTÉS:datasets.xml, vannak új érvényes lehetőségek a [&lt;cdm\\_data\\_type & gt;] (/docs/server-admin/datasets#cdm_data_type) globális tulajdonság, így felül kell vizsgálnia / megváltoztatnia az adatkészletek értékét.
    * Inkábbdatasets.xmlAz új [&lt;forrásNeedsExpandedFP\\_EQ&gt;] (/docs/server-admin/datasets#sourceneedsexpandedfp_eq) hasznos, ha a forráskiszolgáló nem kezeli következetesen &_variable_\\=_value_ teszteket helyesen (mert[általános nehézség a lebegő pontszámok egyenlőségének vizsgálatára](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)) ... forrásNeedsExpandedFP\\_EQ az alapértelmezés szerint igaz (a legbiztonságosabb beállítás) Tehát nem kell változtatni.
    * Új[EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles)... Jerry Yun Pannak köszönhetően.
    * Új[EDDTableFromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles)... Roy Mendelssohnnak köszönhetően.
    * Változások[EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles)lehetővé teszi, hogy szélesebb körű fájlokkal használják.
    * Az EDDTableFromBMDE fogyatékkal élő. Nincs többé aktív, megfelelő, adatforrás.
    * A GenerateDatasetXml, az újEDDGridFromThredd Katalógus betakarítás egy teljes THREDDS katalógus (vagy alkatrész) és generáldatasets.xmltartalom. Az UAF projektnek köszönhetően.
    * GenerateDatasets Az Xml és a DasDds most az eredményeket is\\[bigParentDirectory[szerkesztés]\\]/logs/log.txt. Rich Signellnek és Charles Carletonnak köszönhetően.
    * Számos fejlesztés a login rendszerben. A POST-nak köszönhetően.
*    **A dolgokERDDAP™Programozók Tudni és csinálni kell:** 
    * Voltak változások a /WEB-INF/lib/ könyvtárban. Kérjük, változtassa meg a javac és a java osztályú beállításokat ennek megfelelően.
    * Van egy új\\[Te Url\\]/erddap/verziós szolgáltatás, hogy meghatározza a verzió egyERDDAP... A válasz szöveg, pl.ERDDAP\\_version=1.24 Ha kap egy HTTP 404 Not-Found hibaüzenetet, kezelje aERDDAP™mint 1.22 vagy alacsonyabb verzió. A POST-nak köszönhetően.
*    **Kis változások és Bug javítások:** 
    
    * EDDTableFrom Változások:
        * Csökkentett támogatás az IOOS olvasásáhozSOSXML válaszok.
        * Hozzáadott támogatás az IOOS olvasásáhozSOSszöveg/csv. (NOSSOSa jelenleg nem támogatott szerverek.) 
        * Sok változást hozott létre az IOOS-hozSOSszerver részletek.
        * Hozzáadott támogatás BBOX lekérdezések IOOSSOSésOOSTethys SOSszerverek. Ezek a változások nagy sebességgel járnak a releváns adatkérésekhez. Köszönöm IOOSSOS...
    * Szöveg.matA tabuláris adatfájlokat most helyesen mentik meg. Roy Mendelssohnnak köszönhetően.
    *   WMS
        *   OpenLayersmost össze van kötveERDDAP™használatra aWMSweboldalak. Ez rögzíti az okozott problémát, haOpenLayersnéhány hónappal ezelőtt megváltozott, és megakadályozza a jövőbeli problémákat.
        * AWMS GetCapabilitiesválasz,&lt;OnlineResource&gt; Az érték most az URLWMSszolgáltatás. Charlton Galvarino-nak köszönhetően.
        * Egy legenda jelenik megWMSweboldal, hogy megmutassa a színesbar. Emilio Mayorgának köszönhetően.
    *   EDDGridAggregateExistingDimension konstruktornak problémái voltak, ha a tengely forrása Az értékek nem voltak egyenlőek a rendeltetési helyükkel Értékek, például, ha a forrásidő valami más volt, mint"seconds since 1970-01-01"... KöszönömToddSpindler.
    * A TableWriterGeoJson-ban a túlzott "," a bbox után\\[...\\]eltávolították. Greg Williamsnek köszönhetően.
    * Sok apró változás és hibajavítás.
    
## Verzió 1.22{#version-122} 
 (2009-07-05) 

* Az 1,20-ban bevezetett SlideSorter bug rögzített.
* Az OBIS bug bevezetett 1,20-ban rögzített.
* A Jason adatkészletekre vonatkozó hivatkozásokat a képeken/gadgets/GoogleGadgets oldalon eltávolították.
     
## Verzió 1.20{#version-120} 
 (2009-07-02) 

*   ERDDAP™adminisztrátorok, kérjük, adja hozzá ezt a beállítás.xml fájl:
```
    <!-- If you want to restrict access to some datasets, you need to 
    specify the method used for logging on (authentication). See the info 
    at https://erddap.github.io/setup.html#security
    Currently, the options are: "" (logins not supported, the default),
    "custom", "openid". Note that openid login doesn't work when testing 
    with localhost (https://127.0.0.1:8443).
    -->
    <authentication></authentication>
    
    <!-- This specifies how you have stored passwords in the roles tags 
    in datasets.xml. If you aren't storing any passwords this is irrelevant.
    The options (in order of increasing security) are: "plaintext", "MD5", 
    or "UEPMD5" (MD5(UserName:ERDDAP:Password), the default).
    You should only use "plaintext" or "MD5" if you need to match values 
    stored that way in an external password database.  See the info at
    https://erddap.github.io/setup.html#security
    -->
    <passwordEncoding>UEPMD5</passwordEncoding>
    
    <!-- This determines whether datasets that the user doesn't currently
    have access to (because he isn't logged in or because his roles don't
    allow access) should be shown on lists of data sets 
    (e.g., from full text search, categorize, view all datasets, ...).
    The options are: "true", or "false" (the default).
    If false, no information about the dataset (even its existence) is 
      shown to users who don't have access to it.
    If true, some information about the dataset (title, summary, etc) is
      shown to users who don't have access to it.  
      If the user clicks on a link to a dataset he doesn't have access to,
      he will get an error message and be prompted to log in.
    -->
    <listPrivateDatasets>false</listPrivateDatasets>
    
    <!-- If the number of requests between two runs of LoadDatasets 
    exceeds unusualActivity, an email is sent to emailEverythingTo.
    The default is 10000.
    -->
    <unusualActivity>10000</unusualActivity>
```

* Új adatkészlettípusok[EDDGridMásolás](/docs/server-admin/datasets#eddgridcopy)és[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy)készítsen és tartsa fenn a másik helyi másolatátEDDGridvagy az EDDTable adatkészlet adatai, és szolgálja az adatokat a helyi másolatból. Ezek nagyon könnyen használhatók és nagyon hatékonyak **a távoli adatforrásokból származó adatok kiszolgálásával kapcsolatos legnagyobb problémák megoldása:** 
    
    * A távoli adatforrásból származó adatok lassúak lehetnek (különböző okok miatt) ...
    * A távoli adatkészlet néha nem elérhető (ismét, különböző okok miatt) ...
    * Az adatok egyik forrására való támaszkodás nem mérlegeli jól (pl. amikor sok felhasználó és sokERDDAPHasználja) ...
    
Plusz, a helyi másolat az eredeti mentés, amely hasznos abban az esetben, ha valami történik az eredeti.
    
Nincs semmi új az adatkészlet helyi másolatának elkészítéséről. Mi az új itt, hogy ezek az osztályok teszik\\*könnyű\\*létrehozni és létrehozni\\*Fenntartás\\*az adatok helyi másolata egy\\*változat\\*távoli adatforrások és\\*Metaadat\\*az adatok másolása közben.
    
Ezek az adatkészlet típusok egy teljes funkciók részét képezik, amelyek egyszerűsítik a létrehozását[hálók/klaszterek/szövetségekERDDAPs](/docs/server-admin/scaling)nagyon nehéz terheket kezelni (pl. adatközpontban) ...
    
* Új adatkészlet típus[EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)adatokat kap egy helyi vagy távoli adatbázis tábláról.
*   ERDDAP™most van egy[biztonság](/docs/server-admin/additional-information#security)rendszer, amely támogatja a hitelesítést (hagyja, hogy a felhasználók bejelentkezzenek) és engedélyezés (hozzáférést biztosítanak bizonyos magánadatbázisokhoz) ...
* Vannak[kettő, új, parancssori eszközök](/docs/server-admin/datasets#tools)SegítségERDDAP™Az adminisztrátorok létrehozzák az XML-t egy új adatkészlethezdatasets.xml:
    * GenerateDatasets Az Xml az XML durva tervezetét generálhatja szinte bármilyen adatkészlethez.
    * A DasDds segít ismételten tesztelni és finomítani az XML-t egy adatkészletre.ERDDAPGenerateDatasets Az Xml weboldalakat eltávolították. Biztonsági okokból csak néhány adatkészlettípust támogattak. Az új parancssori eszközök jobb megoldást jelentenek.
* Az új[status oldal](/docs/server-admin/additional-information#status-page)Engedd, hogy bárki (de különösen adminisztrátorok) nézd meg egy státusztERDDAP™bármilyen böngészőből, ha megy\\[alapUrl\\]/erddap/status.html...
* A Tabledap most támogatja[szerveroldali funkciók](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions):
    * Ésdistinct () eltávolítja a duplikált sorokat a válaszasztalról,
    * ésorderBy (...) megadja, hogyan kell rendezni a választáblát,
    * ésorderByMax (...) Lehetővé teszi, hogy megadja, hogyan kell rendezni a választáblát, és eltávolítja az összes sort, kivéve a sorokat az utolsó meghatározott oszlopban lévő maximális értékekkel. Ezt lehet használni, például, hogy az utolsó rendelkezésre álló adatokat minden állomásra.
* A Tabular adatkészletek most tartalmazhatnak további dátumotTime változókat, amelyeket nem neveznek el"time"... Ezeket a változókat "egyetlen" metaadata ismeri el, amelyet tartalmaznia kell" since "  (numerikus dátum Idők) vagy "yy" vagy "YYY" (formázott String dátumTimes) ... De kérlek még mindig használd adestinationName "time"a fő dátumhoz Idő változó.
*   ERDDAP™most generál egy[webhelytérkép.xml](/docs/server-admin/additional-information#sitemapxml)fájl, amely azt mondja a keresőmotoroknak, hogy aERDDAPcsak havonta kell összetörni.ERDDAP™adminisztrátorok, kérlek kövesse[Ezek az utasítások](/docs/server-admin/additional-information#sitemapxml)hogy értesítse a keresőmotorokat az új webhelytérkép.xml fájlról.
*   ERDDAP"A hibaüzenetek most sokkal rövidebbek, és az ügyfelek számára készültek (nem programozók) ... Greg Williamsnek köszönhetően.
* [[szerkesztés]]&lt;kérésBlacklist&gt; (/docs/server-admin/datasets#requestblacklist) most is támogatja az IP címeket, ahol az utolsó számot \\* váltotta fel.
* Kérések.jsonés a .geoJson fájlok most tartalmazhatnak egy opcionális[jsonp](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/)kérés a "&#" hozzáadásával.jsonp=_functionName_” a lekérdezés végén. Alapvetően ez csak azt mondjaERDDAP™"_funkciónév_ ("A válasz kezdetére és ") "A válasz végére. Ha eredetileg nem volt lekérdezés, hagyja ki a "&" a lekérdezésben. Greg Williamsnek köszönhetően.
* Az új statisztikák helyét hozzáadták a[Napi jelentés](/docs/server-admin/additional-information#daily-report)...
* Az adatkészletek, az intézmény és az id listáival rendelkező weboldalakon jelenleg messze van. Ez az előfizetést és más hasznosabb oszlopokat érinti a szűk számítógép képernyőkön.
* Az összes weboldalon az oldal címe (az oldalon található).&lt;cím&gt; a&lt;Az indulóHtml&gt;, amelyet a setup.xml-ben definiál, módosítva van, hogy a weboldal jobb leírását tartalmazza (például a jelenlegi adatkészlet címe és intézménye) ...
* Az Xmx információ jelenleg szerepel a log.txt, a Daily Report és a status.html memóriainformációival. Ellyn Montgomerynek köszönhetően.
*   ERDDAP™további, általános célú védelem minden hiba ellen (pl.: OutOfMemoryError) ... Charles Carletonnak köszönhetően.
* A hibakezelés javítása, ha a válasz már elkövetett.
* IMPROVED: EDDTableFromFiles ésEDDGridFromFiles most csak lehetővé teszi&lt;metadataFrom&gt; először vagy utolsó. A félelmet már nem támogatják. És először és utoljára most a fájlok LastModifiedTime.
* Bug fix: EDDTableFromSOSAz egyik állomás érvénytelen információja kivételt váltott ki, és az egész adatkészletet elutasították. Most ezeket az állomásokat csak figyelmen kívül hagyják (és a hibaüzenet bejelentkezik a log.txt) ... Rick Blairnek köszönhetően.
     

## Verzió 1.18{#version-118} 
 (2009-04-08) 

* Bug fix: Kezdve 1,14-ben, az EDDTable Data Access Form és Make A Graph weboldal nem foglalkozik megfelelően idézett korlátozásokkal.
* Bug fix: Kezdve 1,14, EDDTableFromDapSequence nem kezeli az időkorlátokat helyesen, ha a forrásidő egység nem volt "második 1970-01-01T00:00.
     

## Verzió 1.16{#version-116} 
 (2009-03-26) 

*   ERDDAP™adminisztrátorok:
    * Ez egy fontos kiadás, mert egy hibát rögzít, amely elhagyta aERDDAP™szál fut, ha a Tomcat Managert a Stop / Start or Reload-ra használtaERDDAP... Tehát amikor telepíti az 1.16-ot, ne csak a Tomcat menedzsert használja a régitERDDAP™és telepítse az újatERDDAP... Ehelyett: **A régiERDDAP™Indítsa újra Tomcat (vagy a szerver) Ezután telepítse az újatERDDAP...** Mindig jó ötlet, ha új verziót telepítünk.
    * Kérlek, add hozzá (&lt;Blacklist&gt;&lt;/requestBlacklist&gt;] (/docs/server-admin/datasets#requestblacklist) a tedatasets.xml... Ezt lehet használni, hogy megadja az ügyfél IP címek listáját blokkolni (pl. a szolgáltatási támadás megtagadása vagy túlságosan nulla webes robot) ...
* Van most egy\\[bigParentDirectory[szerkesztés]\\]/log könyvtár, hogy tartsa aERDDAP™log fájlok. Amikor elkezdedERDDAP™, ez teszi egy archív másolat a log.txt és a log. txt.previous fájlok egy időbélyeggel. Ha baj volt az újraindítás előtt, hasznos lehet ezeket a fájlokat elemezni.
*   ERDAERDDAP™most az előfizetési rendszer megfordult.
*   ERDDAP™ismét lehetővé teszi (de még mindig nem ajánlom) a „%26” kódolása az URL-ek kérésére (lásd:[kapcsolódó v1.14 változás](#percent26)) ...
* Számos új kiegészítés a Tally részéhez[Napi jelentés](/docs/server-admin/additional-information#daily-report)...
* Kis hibajavítások a geneDatasetsXml-ben.
* Néhány kis hibajavítás.
     

## Verzió 1.14{#version-114} 
 (2009-03-17) 

* Változások a felhasználók számára:
    * A hálózati adatkérésekben,ERDDAP™most támogatja:[Utolsó](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last)ahol az n egy integrált számú index és[ (utolsó) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses)hol d egy numerikus érték (Idővel másodpercekben van) ...
    * A tabuláris adatkérésekben a String Contraints most előírja[dupla idézetek](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings)az érték körül, például &id="NDBC40121" Ezt a követelményt aDAPprotokoll.
    * Mesés adatok kéréseiben,ERDDAP™most megköveteli, hogy[minden korlátozás megfelelő százalékban kódolt](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode)... A böngészők ezt automatikusan teszik, így ez leginkább befolyásolja a számítógépes programokat / írásokat, amelyek hozzáférnekERDDAP...
#### százalék26{#percent26} 
*   [Korábban,](#percent26)a[beágyazott egy grafikus weboldalt](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html)és[ERDDAP™Google Gadget weboldal](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html)Azt mondta, hogy cserélje ki a "&" a kép URL "%26". Mostantól ki kell cserélni a "&"-t a kép URL-jében a "&amp;". Tehát fel kell cserélnie a "%26" -ot a meglévő weboldalakon és a Google Gadgetsben a "&amp;". (Sorry) 
*   ERDDAP™adminisztrátorok, kérlek:
    * Adja hozzá a következőt[setup.xml](/docs/server-admin/deploy-install#setupxml)fájl (és változtassa meg a zászlót KeyKey érték) :
```
        <!-- ERDDAP™ has a service that lets remote users set a flag
        to notify ERDDAP™ to try to reload a dataset.
        These requests use a key which is generated based
        on baseUrl/warName, a datasetID, and flagKeyKey.
        \\*\\*\\* Change this once, to any text (a favorite quote? random text? 
        It doesn't matter). Normally, you won't ever change this again.
        But if you think someone is abusing the flag system,
        change this text again, restart ERDDAP™, and send
        all of the users of the flag system the relevant new flagKeys
        (see the list in the Daily Report). -->
        <flagKeyKey>A stitch in time saves nine. CHANGE THIS!!!</flagKeyKey>
        
        <!-- ERDDAP™ has an email/URL subscription system which sends a user
        an email or pings a url whenever a dataset of interest changes.
        (This is different from the RSS system, which is always active.)
        The system relies on the server being able to send out 
        emails to people to validate their subscription requests.
        The emails appear to come from the emailFromAddress below.
        So if your server can't send out emails, don't make this system active.
        You may choose (for whatever reason) to make this system active or not, 
        so valid values below are "true" (the default) and "false".
        Note that if you change this and restart ERDDAP™, the list of 
        subscriptions (in \\[bigParentDirectory\\]/subscriptionsV1.txt) isn't
        affected. See also the subscriptionEmailBlacklist in datasets.xml.
        -->
        <subscriptionSystemActive>true</subscriptionSystemActive>  
```

    * A sor után&lt;e-mailUserName&gt; az Ön[setup.xml](/docs/server-admin/deploy-install#setupxml)fájl, add
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
és lépjen be az igazi jelszóba.
    * Megváltozhat&lt;wmsSampleBox&gt; az Ön[setup.xml](/docs/server-admin/deploy-install#setupxml)fájl, hogy tartalmazza a hosszúsági értékek akár 360, pl.,
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * A tedatasets.xmlfájl, nevezze át az EDDTableFromNc4DFiles adatkészletét az EDDTableFromNcFiles-re (amely jelenleg számos dimenzióval támogatja a fájlokat) ... Ha EDDTableFromNc4DFiles adatkészlete volt:
        
        1. Meg kell változtatni a Type="EDDTableFromNcFiles" az adatkészletekben. XML fájl.
        2. Hozzá kell adnia egy&lt;nDimensions&gt; 4 4 4&lt;/nDimensions&gt; címke az adatkészlet XML.
        3. Hozzáadhatja az újat&lt;rendezőFilesBySourceNames&gt; címke, hogy meghatározza a fájlok belső megrendelését, amely meghatározza a visszatért adatok általános rendjét.
        
Részletekért lásd[EDDTableFromFiles](/docs/server-admin/datasets#eddtablefromfiles)...
    * A múltban az EDDTableFromDapSequence esetében,OPeNDAPDRDS szerverek,datasets.xmlhasználtunk&lt;forrásCanConstrainStringsRegex -=&lt;/sourceCanConstrainStringRegex&gt;. De most látjuk, hogy a DRDS regex támogatása korlátozottabb, mintERDDAP"Szóval ajánljuk&lt;forrásCanConstrainStringsRegex&gt;&lt;/sourceCanConstrainStringRegex&gt;, hogy a regex korlátozások nem kerülnek át a forrásba, hanem inkább kezelik őketERDDAP...
    * Revamped kezelése forrásCanConstrain ... bennedatasets.xmláltal[EDDTableFromDapSequence](/docs/server-admin/datasets#eddtablefromdapsequence)és (belső) minden EDDTable adatkészlet típus. Az új rendszer egyszerűbb és jobban tükrözi a különböző adatforrások változóságát. Lehet, hogy módosítania kell az XML-t az adatkészleteihezdatasets.xml...
* Számos új funkció van, amelyek önmagukban hasznosak, de ha kombináljuk, szintén elősegítik a létrehozást[hálók/klaszterek/szövetségekERDDAPs](/docs/server-admin/additional-information#grids-clusters-and-federations)...
    * Új adatkészlettípusok:
        *   [EDDGridFromErdap](/docs/server-admin/datasets#eddfromerddap)és[EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap)amely engediERDDAP™tartalmaz egy másik adatkészletetERDDAP™nagyon egyszerű és nagyon hatékony módon.
        *   [EDDGridFájlok](/docs/server-admin/datasets#eddgridfromfiles)  (alosztálya,[EDDGridFromNcFiles](/docs/server-admin/datasets#eddgridfromncfiles)amely olvashatóNetCDF .ncGRIB .grb ésHDF .hdffájlok) ...
        *   [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles)amely olvashatóNetCDF .ncamelynek asztali struktúrája van.
    * A RunLoadDatasets és a LoadDatasets újratelepültek, hogyERDDAP™nagyon reagál az adatkészletek visszatöltésére a fájlok alapján[zászló](/docs/server-admin/additional-information#flag)rendező (gyakran&lt;5 másodperc, ha a fő terhelésDatasets jelenleg történik).
    * Új szolgáltatás, amely lehetővé teszi[URL létrehozni egy zászló fájlt](/docs/server-admin/additional-information#set-dataset-flag)egy adott adatkészlet esetében, például
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
létrehoz egy zászlófájlt az rPmelTao zászlós könyvtárában (Bár a zászló Key itt rossz) ...
    * Új[előfizetés](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)szolgáltatás, hogy minden ügyfél megadja a műveletet, amely akkor történik, ha egy adott adatkészlet jön létre (mikorERDDAP™újraindítás) és amikor az adatkészlet bármilyen módon változik. Ez a rendszer letiltható&lt;ElőfizetésSystemActive&gt; az Ön[setup.xml](/docs/server-admin/deploy-install#setupxml)fájl. AERDDAP™ [Napi jelentés](/docs/server-admin/additional-information#daily-report)most felsorolja az összes előfizetést, és magában foglalja az URL-t, hogy törölje az egyeseket, ha úgy érzi, a rendszert visszaélnek. Inkábbdatasets.xmlVan egy új, opcionális [&lt;előfizetés EmailBlacklist&gt;] (/docs/server-admin/datasets#subscriptionemailblacklist) címke, hogy az adminisztrátorok meg tudják határozni az előfizetési rendszerből azonnal feketelistát tartalmazó e-mail címek egy kiválasztott listáját.
    * Új (új)&lt;onChange&gt;] (/docs/server-admin/datasets#onchange) attribútumdatasets.xmlhagyja, hogyERDDAP™adminisztrátor határozza meg a cselekvést, amely akkor történik, ha egy adott adatkészletet hoznak létre (mikorERDDAP™újraindítás) és amikor az adatkészlet bármilyen módon változik.
    * A teljes szöveges keresés javítása: a keresési sztring tárolása minden adatkészlethez most 1/2 memóriát használ. A keresési algoritmus (Boyer-Moore-szerű) most 3X gyorsabb.
    * E-mailekERDDAP™most mindig megelőzi a témát és a tartalmat\\[erddap Url\\], hogy világos legyen, melyik leszERDDAP™ez jött (abban az esetben, ha többször is adminisztrálERDDAPs) ...
    * További kiterjedt statisztikai gyűjtés a[Napi jelentés](/docs/server-admin/additional-information#daily-report)e-mail.
    * Új log fájl\\[bigParentDirectory[szerkesztés]\\]/emailLogYEAR-MM-D.txt bejelenti az összes e-mailt küldöttERDDAP™Minden nap. Ez különösen akkor hasznos, ha a szerver nem tudja küldeni az e-maileket - legalább a naplóban olvashatja őket.
    *   ERDDAP™Most teszi egy\\[bigParentDirectory[szerkesztés]\\]/cache/ (datasetID) Az egyes adatkészletek könyvtára, mivel előfordulhat, hogy sok fájl csésze.
* Új[RSS2.01](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)takarmány minden adatkészlethez (Keresse meg a narancsotRSSikonok az adatkészletek listáján, az adathozzáférési formákon és a grafikus weboldalakon) ...
*   EDDGrid .kmlválaszok most használnak csíkos képeket ("superoverlays" - dinamikusan generált quadtree képek) ... A kezdeti kép sokkal gyorsabban terheli a GoogleEarth-ot, mint korábban. A térkép állásfoglalása növekszik, ahogy zoom, az adatkészlet teljes állásfoglalásáig. Ajánlás: a felhasználóknak kérniük kell.kmlegy alkalommal, de az adatkészlet teljes hosszúsága, szélességi tartománya. Sajnos az időtartományok támogatását eltávolították (Remélem, visszatér) ...
*   ERDDAP™most hozzáadódik[Lejár és Cache-Control max-age fejlécek](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)a /images könyvtárból kért összes fájlra. Ez nagymértékben csökkenti a kapott statikus fájlkérések számátERDDAPés így nagyban felgyorsítja a legtöbbetERDDAP™oldal terhelések. SokanJavaScript fájl referenciák költözött az aljára a HTML oldalak, amely szintén felgyorsítja sokERDDAP™oldal terhelések. A "High Performance Web Sites" könyvnek köszönhetően Steve Souders és a FireBug plugin ySlow kiegészítése a FireFox-ban.
*   ERDDAP™Netcdf-java 2.2.22-ről a netcdf-java 4.0-ra váltott. Többek között ez lehetővé tesziEDDGridFromNcFiles olvasniHDF .hdf, valamint a GRIB .grb ésNetCDF .ncfájlok.
*   EDDGridFromDap ésEDDGridFromNcFiles most is támogatja a DArray (valamint a DGrid)  dataVariableS. Ha egy dimenziónak nincs megfelelő koordináta változója,ERDDAP™axis változót hoz létre az index értékekkel (pl. 0, 1, 2, 311, 312) ... Tehát minden más aspektusaEDDGridugyanaz marad:
\\* Még mindig szolgálja az összes adatkészletet, mint a Rácsok, a tengely változó minden dimenzióban.
\\* A lekérdezések továbbra is értékeket kérhetnek a tengely változóitól.
Charles Carletonnak, Thomas Imnek, Dorian Raymernek és másoknak köszönhetően.
* AWMS OpenLayersoldalak most van egy alapértelmezett hosszúságú, szélességi tartomány, amely egy kicsit nagyobb, mint az adatkészlet tartománya (nem a pontos tartomány, így a kis adatkészletek kontextusa nyilvánvalóbb) ... Az alapértelmezett tartomány is lehet 0-360, amely lehetővé teszi, hogy a teljes körű sok adatkészletek látható most. KöszönömToddSpindler.
* Új csúszók néhány adathozzáférési formában, és készíts egy grafikus weboldalt. Egyszerűsítik (Súgó) a kívánt adatok specifikációja és jó vizuális visszajelzést nyújt.
* Új lehetőség a&lt;adatkészlet&gt; címkék adatasets.xml:[aktív="false"](/docs/server-admin/datasets#active)...
* ReferenciákERDAERDDAP™megváltozott a partwatch.pfel (Még mindig működik a proxy segítségével) partwatch.pfeg (preferált) ...
* Új támogatás[data\\_minésdata\\_max](/docs/server-admin/datasets#data_min-and-data_max)változó metaadat tulajdonságok.
* Részleges megoldás a[WaitThenTryAgain / Részleges eredmények kivétel](/docs/server-admin/additional-information#waitthentryagain-exception): Most néhány olyan kérés, amely korábban kudarcot vallott, amikor egy adatforrás-változást észleltek, sikeres lesz, mertERDDAP™újratölti az adatkészletet, és automatikusan kéri az adatokat, az eredeti kérelem keretében.
* Bug fix: generál Adatkészletek Az Xml-t letiltottákERDDAP™1.12 verzió. Köszönhetően Ellyn Montgomerynek, hogy rámutat erre.
* Kis változások a hibakezeléshez.
* Számos fejlesztés a lehetséges versenyfeltételekkel való elkerüléshez / étkezéshez (azaz lehetséges problémák merülnek fel a többlépcsős természetbőlERDDAP) ami kis, gyakori problémákat okozott.
* Most, ha egy hibaüzenetet egy képen írnak, a kép csak a ~5-10 percig marad. (nem 60) ... Cara Wilsonnak köszönhetően.
* A szabványos üzenet, amikor nincs adat, most "Az Ön lekérdezése nem eredményezett megfelelő eredményeket.", ami rövidebb, pontosabb, és megfelelOPeNDAPszerverek.
*   EDDGridmár nem teszi lehetővé a kött tengelyértékeket.
* Kis változások .ver és .help kérések.
* Sok apró változás és hibajavítás.
     

## Verzió 1.12{#version-112} 
 (2008-10-31) 

* EDDTableFromSOSismét működik az NDBC-velSOSés működik az új NOSSOS...
* Az EDDTableFromBMDE most megköveteliERDDAP™Admin megadnidataVariableS.
*   EDDGridMár nem követeli, hogy a lat és a lon egyenletes legyen. Átlátszó Png vagy.kml... KöszönömToddSpindler.
* Néhány apró változás.
     

## Verzió 1.10{#version-110} 
 (2008-10-14) 

* Új "colorBar" metaadata az adatok változóinakdatasets.xmlmeghatározza a grafikonok és térképek alapértelmezett színsárga beállításait. Lásd[További információk](/docs/server-admin/datasets#color-bar-attributes)... Ez azért fontos, mert jelentősen javítja a Make A Graph által gyártott alapértelmezett grafikonok és térképek megjelenését, és mivel az alapértelmezett grafikonok és térképek most következetes színvonalúak, még akkor is, ha az ügyfél megváltoztatja a kért időt vagy földrajzi tartományt. Ez is szükséges volt ahhoz, hogyWMS...
*   ERDDAP™most a legtöbb hálózati adatot szolgálja egyWMSszolgáltatás. Ez azért fontos, mert azt mutatja, hogy számos adatkiszolgálótól származó adatok mellett,ERDDAP™az adatokat különböző protokollokon keresztül terjesztheti (DAP,WMS... több a jövőben) ... Lásd:[ügyfél dokumentáció](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html)... Vagy[dokumentáció az adminisztrátoroknak](/docs/server-admin/datasets#wms)... Vagy[Próbáld ki](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html)...
* A hosszúsági értékek új támogatása &gt; 180.kmlfájlok.
* Új cdm\\_data\\_type: Egyéb
*   ERDDAP™most támogatja a "boolean" forrásadattípust. Lásd[További információk](/docs/server-admin/datasets#boolean-data)Ez hasznos lesz a jövőbeli EDDTableFromDatabase számára.
* Az új EDDTableFromBMDE támogatja a DiGIR / BMDE adatforrásokat.
* Az EDVGridAxis most lehetővé teszi a rendezett értékek felemelkedését. A pmelOscar adatkészletek ehhez szükségesek.
*   ERDDAP™most visszatér a HTTP hibákhoz (pl.: "404 erőforrás/oldal nem talált") több helyzetben, ahelyett, hogy HTML oldalak hibaüzenetekkel.
* Sok változás / kiadások aERDDAP™dokumentáció.
* Sok apró változás.
* Néhány hibajavítás.
*    **A dolgokERDDAP™Az adminisztrátoroknak meg kell tenniük, hogy frissítsék ezt a verziót:** 
    * Inkábbdatasets.xml, bármilyen EDDTableFromSOSadatkészletek, változtassa meg a "megfigyelt terület" metaadatát a "sourceObservedProperty" -ra.
    * A szabályok egyaxisVariablevagydataVariableAdestinationNamemost vannak[szigorúbb](/docs/server-admin/datasets#datavariable-addattributes)... Ellenőrizni kell, hogy a változó nevek érvényesek. Vagy ellenőrizze őket kézzel, vagy futERDDAP™és nézze meg a hibaüzeneteket a jelentésben, amelyet az adminisztrátornak küldenek.
    * Inkábbdatasets.xml, ha azt szeretné, hogy egy hálózati adatok változó, hogy hozzáférhető legyen keresztülWMS, hozzá kell adnia a színBar metaadatát. Legalább például,&lt;att name="colorBarMinimumType="double"&gt;0&lt;/att&gt;
```
          <att name="colorBarMaximum" type="double">32</att>  
```
Lásd[További információk](/docs/server-admin/datasets#wms)...
    * Adja hozzá a következőt[setup.xml](/docs/server-admin/deploy-install#setupxml)fájl (de testreszabja az információval) :

```
        <!-- drawLand specifies the default Make A Graph setting for 
        whether the landmask should be drawn "over" (the default) or "under" 
        surface data on maps. "over" is recommended for primarily 
        oceanographic data (so that grid data over land is obscured by the 
        landmask). "under" is recommended for all other data.
        -->
        <drawLand>over</drawLand>  
        
        <!-- Information about the ERDDAP™ administrator is used for the 
        SOS and WMS servers. You MUST CHANGE these to describe your 
        installation. 
        -->
        <adminInstitution>NOAA Environmental Research 
        Division</adminInstitution>
        <adminIndividualName>Your Name</adminIndividualName>
        <adminPosition>Webmaster</adminPosition>
        <adminPhone>your-phone-number</adminPhone>
        <adminAddress>99 Pacific St, Suite 255A</adminAddress>
        <adminCity>Monterey</adminCity>
        <adminStateOrProvince>CA</adminStateOrProvince>
        <adminPostalCode>93940</adminPostalCode>
        <adminCountry>USA</adminCountry>
        <adminEmail>yourName@yourSite</adminEmail>
        
        <!-- Information about the ERDDAP™ administrator is used for ERDDAP's
        SOS server. You MUST CHANGE these to describe your installation. 
        -->
        <sosTitle>NOAA Environmental Research Division SOS</sosTitle>
        <sosAbstract>NOAA Environmental Research Division's ERDDAP™ makes 
          data from multiple sources available via the SOS 
          protocol.</sosAbstract>
        <sosKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</sosKeywords>
        <sosAccessConstraints>NONE</sosAccessConstraints>
        <sosFees>NONE</sosFees>
        
        <!-- Information about the ERDDAP™ administrator is used for 
        ERDDAP's WMS server. You MUST CHANGE these to describe your 
        installation. -->
        <wmsTitle>NOAA Environmental Research Division 
        WMS</wmsTitle>
        <wmsAbstract>NOAA Environmental Research Division's ERDDAP™ makes
        data from multiple sources available via the WMS 
        protocol.</wmsAbstract>
        <wmsKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</wmsKeywords> 
        <wmsAccessConstraints>NONE</wmsAccessConstraints>
        <wmsFees>NONE</wmsFees>
        <!-- For the wms examples, pick one of your grid datasets that has 
        longitude and latitude axes. The sample variable must be a variable 
        in the sample grid dataset.  The bounding box values are 
        minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <wmsSampleBBox>0,-75,180,75</wmsSampleBBox>
```

## Verzió 1.08{#version-108} 
 (2008-07-13) 

* Új webszolgáltatásERDDAP™generál Adatkészletek Xml, segítERDDAP™adminisztrátorok az XML durva tervezetének létrehozásával egy adatkészlet leírásához szükségesdatasets.xml
* Néhány változás / hibajavítás, amely lehetővé teszi a hálózati rést, amelyet a netcdf-java nyitott kiszolgálóként láthat, beleértve: a globális metaadatot most a "NC\\_GLOBAL" címkézi. ("GLOBAL" helyett) ...
* AEDDGridés az EDDTable Data Access Forms most használja lekérdezési információkat az URL-ben. Tehát például, ha egy felhasználó a Make A Graph formanyomtatványból egy Adathozzáférési Formába megy, a korlátozásokat most megfelelően továbbítják.
*   tabledapMake A Graph most lehetővé teszi a korlátokat a String változókban.
* Az EDDTable Make A Graph most lehetővé teszi a NaN korlátokat. Steve Hankinnak köszönhetően.
* Bug fix: EDDTable mentés AsImage nem ismerte el megfelelően a .colorbar min és max értékeket. Steve Hankinnek köszönhetően
* Számos fejlesztés a setupDatasetsXml-hez. Ellyn Montgomerynek köszönhetően.
* A Griddap kérései most lehetővé teszik () - a stíluskérések kissé a tényleges tengely tartományon kívül vannak. Ez megfelelő azóta () - Az értékek a legközelebbi tényleges értékhez fordulnak. Cindy Besseynek köszönhetően
* A FloatArray-t és a DoubleArray-t teszteltem, az EvenlySpaced-t kifinomultabbá tettem. Mindig tökéletes lesz (mert a tesztet minden adatkészletre testre kell szabni) De jobbnak kell lennie. Ellyn Montgomerynek köszönhetően.
* A setup.html és a setupDatasets Xml.html erddap / letöltési könyvtára és kemény kódolt minden linket. Most azonnal módosíthatom és frissíthetem a beállítási információkat.
* Sok apró változás. Néhány kis hibajavítás.
*    **A dolgokERDDAP™Az adminisztrátoroknak meg kell tenniük, hogy frissítsék ezt a verziót:** 
    * Mozgás&lt;AShortDescription Html&gt; az üzeneteiből.xml a[setup.xml](/docs/server-admin/deploy-install#setupxml)fájl. Meghatározza a szöveget, amely a bal oldal közepén jelenik megERDDAP™honlap. Továbbá, add hozzá&lt;h1&gt;ERDDAP&lt;/h1&gt; (vagy más címsor) a tetejére. **Vagy,** Másolás&lt;TheShortDescriptionHtml - az új[setup.xml](/docs/server-admin/deploy-install#setupxml)fájl (az új erddapContent.zip) Beállítása.xml.
         

## Verzió 1.06{#version-106} 
 (2008-06-20) 

* Új támogatásIOOS DIF SOSadatforrások.
* Sok apró változás. Néhány kis hibajavítás.
     

## Változat 1.04{#version-104} 
 (2008-06-10) 

* Új Slide Sorter funkció.
* Új Google Gadgets oldal és példák.
* Bug fixEDDGrid.saveAsNc a változó méretű és addOffset.
     

## Verzió 1.02{#version-102} 
 (2008-05-26) 

* ÚjEDDGridA SideBySide lehetővé teszi a különbözőaxisVariables\\[0 0\\]forrás Értékek.
* Az összes áram és szél adatkészlet összeolvadtEDDGridSideBySide adatkészletek.
* A képkérelmekből származó képek immár 1 órán át sütődnek.
     

## Verzió 1.00{#version-100} 
 (2008-05-06) 

* Készítsen egy Graph weboldalakat és grafikus parancsokat az URL-ekben.
* A zászlófájlok támogatása az adatkészlet újratöltésére.
* Új adatkészlet típusa: EDDTableFrom4DFiles (Az EDDTableFromFiles első alosztálya) ...
