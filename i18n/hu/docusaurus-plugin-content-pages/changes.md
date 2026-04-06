---
title: "ERDDAP™ - Changes"
---
#  ERDDAP™ Változások

 ERDDAP™ egy nagy példa a [Felhasználó- vezetett innováció](https://en.wikipedia.org/wiki/User_innovation) , ahol a termék innováció gyakran a fogyasztók ( ERDDAP™ felhasználók) Nem csak a producerek. ( ERDDAP™ fejlesztők) . Az évek során a legtöbb ötlet az új funkciók és változások ERDDAP™ a felhasználóktól származnak. Ezeket a felhasználókat az alábbiakban a nagy ötleteikért írják alá. Köszönöm&#33; Kérem, jöjjenek azok a nagyszerű javaslatok&#33;

Itt vannak a változások kapcsolódó minden ERDDAP™ Ereszd el.

## Version 2.30.0{#version-2300} 
 (felszabadult 2026- 04- 07) 

Version v2.30.0 nagyrészt fókuszál hibajavítások, függőségi frissítések a stabilitás és a biztonság, és tesztelése teljesítmény javítása.

*    **Új jellemzők és változások (felhasználók számára) :** 
      * Fokozott [Croissant](https://mlcommons.org/working-groups/data/croissant/) metaadatok kompatibilitása és nyilvánvaló támogatása, beleértve [mcroissant](https://pypi.org/project/mlcroissant/) kompatibilitás.
      * Javított támogatás parketta booades.

*    **Dolgok ERDDAP™ Administrators need to know and do:** 
      * A nem használt parancssori eszközöket és a hozzájuk tartozó kódot eltávolították a kódból a technikai adósság csökkentése érdekében. Lásd https://github.com/ERDDAP/erddap/pull/432.
 
      * Új funkciózászló `forceSynchronousLoading` hozzáadták az alapértelmezett késleltetett adatbetöltési megközelítés felülbírálásához. Erre ritkán van szükség, és csak azokban az esetekben alkalmazható, amikor a késleltetett berakodás problémákat okoz. Lásd a [funkció zászló oldal](/docs/server-admin/feature-flags#forcesynchronousloading) Részletekért.

## Version 2.29.0{#version-2290} 
 (Szabad 2025- 12- 15) 

Cselekedni kell.

 ERDDAP™ változat 2.29.0 igényel jdk 25 vagy később. Frissítse a jdk verzióját. Ha ez probléma, építhetsz ERDDAP™ egy idősebb jdk (legalább 17-ig) a pom.xml fájl megváltoztatásával. JDK 25 egy LTS kiadás Java és számos javítást tartalmaz, elsősorban a jobb teljesítményt.

*    **Új jellemzők és változások (felhasználók számára) :** 
    * ISO 19115 verziók: Lásd alább az admin információkat. A felhasználók számára most az ISO 19115 metaadatok speciális verzióit kérheti. Tedd ezt a griddap / tabledap a fájltípussal rendelkező adatkészlet oldalai leesnek. Ezek a verziók függetlenek lesznek a szerver alapértelmezésétől.

*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * Új funkció, MQTT támogatás. További részletek Javaslom, olvassa el a [Új oldal.](/docs/server-admin/mqtt-integration) Ez magában foglalja az MQTT üzenetekből származó adatkészletek kiépítését és az adatkészlet megváltozásakor az MQTT üzenetek közzétételét. Alapértelmezés szerint kikapcsolt, tehát ha használni akarod, engedélyezned kell.

Köszönet Ayush Singh-nek, hogy az MQTT-n dolgozott&#33;

    * S3 fejlesztések: Támogatás hozzáadása S3 URI mint a cacheFromUrl érték. Ez lehetővé teszi ERDDAP az amazonaws.com-on található magánvödröket támogatni S3-as memória szivárgás.

Köszönet @ SethChampagneNRL-nek az S3-on végzett munkáért&#33;

    * ISO 19115 verziók: Jelenleg az ISO 19115 metaadatok 3 különböző verzióját támogatják. Az alapértelmezett verziót a setup.xml. beállításai vezérlik. Ha a SisISO19115 használata hamis, a kiszolgáló alapértelmezés szerint megadja NOAA módosított ISO19115 _ 2. Ha az useSisISO19115 igaz, akkor a kiszolgáló a SisisO19139 értékétől függően más verziót fog használni. Ha a SisISO19139 használata igaz, az alapértelmezett ISO19139 _ 2007 lesz, ha a SisISO19139 használata hamis, akkor az alapértelmezett ISO19115 _ 3 _ 2016 lesz. A SisisO19115 = igaz és a SisisO19139 = hamis használatát javasoljuk. A szervezetéhez különböző beállítások szükségesek.

    * Elvándorolt a javába. időkönyvtár (Java.uth helyett. GregorianCalendar) . Ez teljesítményjavulást eredményezhet a dátum- / időoszlopokat tartalmazó lekérdezéseken. Az adatkészletek túlnyomó többsége esetében nem lehet észrevehető hatás. Az egyetlen ismert eset, ami változást okoz, ha az adatkészlet `0000- 01- 01 napja óta` vagy hasonló. Ha ez probléma egy változó, akkor hozzá ` <att name="legacy_time_adjust"> igaz </att> ` a addAttributes a dataVariable vagy axisVariable .
    
    *    datasets.xml jelenleg [StringSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Ennek sok haszna van, beleértve a magánértékek meghatározását (mint a jelszavak) környezeti változók használata. Ez letiltható a lehetségesEnvParsing setup.xml-ben történő hamisítás beállításával.

    * Nyomástengely: A nyomásemelkedés különleges esetét adja hozzá. Ezt elsősorban a meteorológiai adatokban alkalmazzák, amelyek az izobarikus szintek függőleges emelkedését határozzák meg. MEGJEGYZÉS: A kisebb nyomásértékek magasabb emelkedést jelentenek, így a tengely a méterekben vagy lábakban meghatározott normál emelkedéssel szemben fut.

Köszönöm [SethChampagneNRL](https://github.com/ERDDAP/erddap/pull/373) 

    *    EDDGrid FromNcFiles változó méretekkel: Van (kísérleti) támogatás EDDGrid FromNcFiles adatkészletek, hogy változók, amelyek nem használják ugyanazt a tengelyt. Kérem, számoljon be arról, hogy ez hogyan működik, vagy ha a viselkedése nem tűnik helyesnek.

    * Van egy gyűjtemény optimalizált, hogy kell biztonságos, de a zászlók, hogy visszatérjen a régi viselkedés, ha szükséges. Ha úgy találja, hogy be kell állítani a zászlók, kérjük, adjon be egy hibát. Ha nem hallunk semmilyen problémáról, ezek többsége a jövőben az új viselkedési alapértelmezéssel megszűnik. Van egy... [új oldal a funkciózászlókról](/docs/server-admin/feature-flags) ahol olvashatsz ezekről és más zászlókról.

      * érintés Fonal Csak Amikor elemek: Ez egy változás, hogy a touchThread csak akkor fut, ha vannak elemek a sorban, hogy megérintse. Eggyel kevesebb szálfutás kisebb optimalizálás, de még mindig hasznos. Az alapértelmezés igaz.

      * useNcMetamfetamin ForFileTable: Ez a módosítás lehetővé teszi, hogy a belső fájltábla nc attribútumokat használjon, különösen egy változó tényleges _ range attribútumot, hogy elkerülje az egész nc fájl olvasását. Ez drasztikusan felgyorsíthatja az nc files alapú adatkészletek kezdeti betöltését, ha az egyes változók tényleges _ tartománya attribútumként szerepel. Ne feledje, hogy ez megbízik az érték, így ha nem, a belső fájl tábla lesz hibás információkat. Az alapértelmezés igaz.

      * ncHeader MakeFile: Ez a módosítás lehetővé teszi az nc fejléc fájlok generálását a reprezentatív nc fájl létrehozása nélkül. Ez egy kis optimalizálása EDDTable, de egy hatalmas optimalizálása sok EDDGrid kérések. Alapértelmezett (mint a hamis a tervezett optimalizált viselkedés) .

      * háttér CreateSubset táblázat: Ez a módosítás az adatkészletek kezdeti feldolgozásának egy részét háttérszálra mozgatja. Ez javítaná az adatkészletek betöltésének idejét. Konkrétan a késleltetett rész alkészlet táblázatok, amelyek akkor is keletkeznek, ha szükséges, ha a késleltetett feldolgozás még nem történt meg. Az alapértelmezés igaz.

    * Néhány apró módosítás, hibajavítások (köszönöm Italo Borrelli az EDDTableFromAggregateRows, Köszönöm. @ SethChampagneNRL a 360-nál nagyobb teljesítmény engedélyezéséhez EDDGrid LonPM180, és számos egyéb hibajavítás) és optimalizált.

*    **A ERDDAP™ Fejlesztők:** 
    * További optimalizálások, beleértve a vizsgálati idő kettévágását.

    * Új vizsgálati profilok nagyon pelyhes (külső) vagy rendkívül lassú (Lassú) vizsgálatok.

## Változat 2.28.1{#version-2281} 
 (szabad 2025- 09- 05) 

*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * Támogatás az X- Forwarded- Prefinhez. Ez különösen fontos az administrs futó szerverek egy alpályán. Kérjük, olvassa el a frissített dokumentációt [Apache](/docs/server-admin/deploy-install#apache) és [Nginx](/docs/server-admin/deploy-install#nginx) további információkért.

Köszönöm [@ srstaird](https://github.com/srstsavage) 

## Változat 2.28.0{#version-2280} 
 (kiadás 2025- 08- 29) 

*    **Új jellemzők és változások (felhasználók számára) :** 
    *    [Croissant-séma](https://docs.mlcommons.org/croissant/docs/croissant-spec.html) Most már elérhető. Az alkalmazások ellenőrizni tudják, hogy az alapértelmezett metaadatok Croissant-t használnak-e, de a 2.28.0-tól kezdve kérhetik a Croissant definícióját az új exportfájltípushoz. "croissant" (amely jsonld fájlt tartalmaz) .

*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * Új dokkoló A kép minden egyesített mozgatási kérésen létrejött. Ezek alfa építmények, nem visszaforgatott kiadványok. Olyan címkék lesznek, mint a "20250814T034025", ami jelzi, hogy mikor épült. Ha szeretné kipróbálni a legújabb funkciók lehet használni ezeket. Ha valami stabilabbat szeretnél használni, használd a kiadásainkat szemantikus verziócímkével. (pl. 2.28.0) . Mindig arra törekszünk, hogy az alfa-kibocsátás használható legyen, de kevesebb a tesztelés, mint a mi verzióink. Mindig azt javasoljuk, hogy legalább olyan újat használj, mint a mi "legújabb" kiadásunk, ami a legújabb szemantikai verziós kiadás lesz.

    * Docker Képek most már elérhető a [GitHub](https://github.com/ERDDAP/erddap/pkgs/container/erddap) valamint [DockerHub](https://hub.docker.com/r/erddap/erddap) .

Köszönöm [@ ocefpaf](https://github.com/ocefpaf) , [@ abkfenris](https://github.com/abkfenris) , [@ srstaird](https://github.com/srstsavage) , és [MathewBiddle](https://github.com/MathewBiddle) a Docker-képek körüli hozzájárulásukhoz. Ebbe beletartoztak az első hozzászólások, kivéve @ stsvage&#33;
    
    * Most már van támogatás a termeléshez [Croissant-séma](https://docs.mlcommons.org/croissant/docs/croissant-spec.html) fájlok. Alapértelmezés szerint be van kapcsolva. Ön letilthatja a Croissant séma a setup.xml (NEM JAVASOL- Kérjük, vegye fel a kapcsolatot a GitHub-mal, vagy tegyen panaszt, ha ezt meg kell tennie.) :
    ```
        <generateCroissantSchema>false</generateCroissantSchema>
    ```

    * Néhány beállítás megváltoztatta az alapértelmezett értékeket. useHeadersForUrl and useEddReflection now both default to true. Ha problémát okoznak, és hamisnak kell beállítani őket, kérem, hozzon létre egy kérdést. A szándék az, hogy távolítsa el őket egy jövőbeli kiadás.

    * Néhány beállítást eltávolítottak. useSharedWatchService és átirányított dokumentáció A TogitHublo alapértelmezés szerint több kiadás esetében is igaz volt, és ezen a ponton elég jól tesztelték. Eltávolítom ezeket néhány kódtisztításhoz.

    * Néhány apró változás, hibajavítás és optimalizáció.

*    **A ERDDAP™ Fejlesztők:** 
    * Sok halott kódot távolítottak el. Sok figyelmeztetés rögzítve.

## Version 2.27.0{#version-2270} 
 (szabad 2025- 06- 11) 

*    **Új jellemzők és változások (felhasználók számára) :** 
    * Új adatok a / erddap / converting / color.html szervereken lévő színbar átalakítóhoz

*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * Az alapértelmezett viselkedés az, hogy a gyorsítótár most független lesz a nagyobb betöltési adatkészletek feladatától. Ez lehetővé teszi a régi gyorsítótárfájlok megbízhatóbb és rendszeresebb tisztítását. Van további munka, hogy javítsa a szerver viselkedését, ha alacsony a lemez tér (visszatérés egy hiba a kérések valószínű, hogy a szerver fut ki a helyből, és tisztítása a gyorsítótár gyakrabban alacsony lemez körülmények között, hogy megpróbálja megelőzni a hibákat) . In datasets.xml   (vagy szetup.xml) az új gyorsítótár hozzáadása / beállítása ClearPerc paraméter annak ellenőrzésére, hogy a kiszolgáló milyen gyakran ellenőrzi a gyorsítótár kiürítését. Megjegyzés, A jelenlegi cachePercept paraméter szabályozza a kort a fájlokat kell tartani, az új gyorsítótár A ClearMinuts arra vonatkozik, hogy milyen gyakran kell tisztázni a dolgokat.
    ```
        <cacheClearMinutes>15</cacheClearMinutes>
    ```
Az új gyorsítótár letiltható a CacheClear beállításával, de ez nem ajánlott.
gyorsítótár Az elszámolási jegyzőkönyv szintén szerepel a [adatkészletek dokumentációja](/docs/server-admin/datasets#cacheclearminutes) .
    
    * Helyi adatkészlet metaadatok támogatása. Támogatja a lokalizáció értékek egy addAttributes szakasz. Egyszerűen adjunk hozzá egy attribútumot a további xml: lang tag. Például adjunk hozzá egy francia címet egy adatkészlet addAttributes A szakasz a következőket tartalmazza:
    ```
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
    ```
További részletek a [helyi metaadatok dokumentációja](/docs/server-admin/localized-metadata) .

    * Új dokkoló Készítsen fájlt SSL opciókkal és egy mezítláb Prométheusz szerver. Hála Shane St. Savage-nek az SSL-ért és Jiahui Hu-nak a Prométheuszért.

    * Támogatás a fejlécekben lévő információk felhasználásához a kiszolgáló URL meghatározásához, ahelyett, hogy a config fájlra hagyatkoznánk. Ez lehetővé teszi, hogy a szerver hozzáférjen több nevet, és egyszerűsítheti bizonyos konfigurációk. Engedélyezze, és küldjön visszajelzést.
    ```
        <useHeadersForUrl>true</useHeadersForUrl>
    ```

    * Néhány apró változás, hibajavítás és optimalizáció.

*    **A ERDDAP™ Fejlesztők:** 
    * Reaktor arra, hogyan definiálják a kimeneti fájltípusokat a kódban. Ez kell, hogy ez így fájltípusok lehet hozzáadni anélkül, hogy megérintené sok kód helyek.

## változat{#version-226} 
 (felszabadult 2025- 03- 31) 

*    **Mindenkinek:** 
    * Nagy frissítés a dokumentáció honlapunkra: https://erddap.github.io/
 
A frissített megjelenés mellett jobb a navigáció, a keresés, a fordítás, és könnyebb lesz fenntartani a továbblépést&#33;

*    **Új jellemzők és változások (felhasználók számára) :** 
    * Előfizetés és RSS a frissítéseknek megbízhatóbbnak kell lenniük a fájlváltozásokból gyakran frissülő adatkészleteknél.

*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * Az alapértelmezett kiadás megköveteli / támogatja Java verzió 21. Vissza ebben a kiadásban képes könnyen Java 17 kompatibilis bináris.

    * Új funkció, hogy személyre szabja az adatok megjelenített adatait az EU-ban. Elvárjuk, hogy ez különösen hasznos legyen olyan dolgok hozzáadásához, mint az adatkészlet idézés. További részletek a [új dokumentáció](/docs/server-admin/display-info) . Köszönet Ayush Singh-nek a hozzájárulásért&#33;

    * További Prométheusz metria. A legnagyobb ` http _ kérés _ időtartam _ másodperc` "request _ type", "dataset _ id", "dataset _ type", "file _ type", "lang _ code", "status _ code"
Ez a géppel olvasható formátum lehetővé teszi, hogy jobban gyűjtsük össze a mérőszámokat, hogy megértsük, hogyan használják a felhasználók a szervert.

    * Új módszer ISO19115 XML fájlok létrehozására. Az Apache SIS-t használja, és új lehetőség ebben a kiadásban. Engedélyezze, és küldjön visszajelzést.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * Az UI most egyedi linkeket fog létrehozni minden egyes url területeken, mint a infoUrl és összefoglalást.

    * Előfizetés és RSS A frissítéseknek megbízhatóbbnak kell lenniük a fájlváltozásokból gyakran frissülő adathalmazoknál. Ha ez problémákat okoz, kérjük, vegye fel a kapcsolatot a GitHub-on és tiltsa le a funkcionalitást azáltal, hogy a setup.xml-hez hozzáadja az alábbi zászlót.
NEM AJÁNLOTT
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * A részváltozók már nem lesznek automatikusan generálva az EDDTableFromNcCFFiles adatkészlethez. Ha a viselkedésre hagyatkozol, (előkezelt oldat) a subsetVariables az adatkészlet definíciójához datasets.xml , vagy adja hozzá az alábbi zászlót a setup.xml. Ha úgy érzi, hogy ezt be kell kapcsolnia, kérjük, lépjen kapcsolatba a GitHub-dal, hogy jobban tudjuk támogatni az előremenő használati esetét.
NEM AJÁNLOTT
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * A kiszolgáló most átirányítja a dokumentációs kéréseket (letöltések alatt / amely a dokumentáció, hogy már vándorolt) az új dokumentációs oldalra. Ha szükséges, letilthatja ezt egy zászlóval a setup.xml-ben:
NEM AJÁNLOTT
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Néhány apró változtatás és hibajavítás.

*    **A ERDDAP™ Fejlesztők:** 
    * További kódminőség-javítások és halott kód tisztítás. Ez magában foglalja a kisebb optimalizálásokat, a lezárható erőforrások jobb kezelését és a hosszú ideje elavult adattípusoktól való eltávolodást (Mint Vector) .

    * Nagy megcáfolása EDStatic, hogy húzza ki a legtöbb a config, üzenet, és metrikus kódot. Ez is jobban magában foglalja inicializálás és kezelése könyvtár utak (Az utolsó kettő még hátra van.) 

    * Sok előrelépés történt egy hivatalosan támogatott Docker Image felé. A terv az, hogy véglegesítik és kiadja után a ERDDAP™ 2.26 kiadás áll rendelkezésre.

## változat{#version-225} 
 (kiadás 2024- 10- 31) 

*    **Új jellemzők és változások (felhasználók számára) :** 
    * EDDTableFromFiles most már támogatja lekérdezések csak származtatott kimenetek (globals, jexl script, vagy változók) .
         
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * A 2.25-ös verzió megköveteli Java 21 vagy újabb. Ez az LTS verzió, és már több mint egy éve elérhető.
         
    * A SharedWatchService most az alapértelmezett. Ha ki kell kapcsolnia, kérem lépjen kapcsolatba Chris-szel. John a Noaa.gov, hogy tudassa velem, így tudom javítani a jövőbeli verziók, és hozzá:
        &lt;useSharedWatchService &gt; hamis&lt;/ useSharedWatchService &gt; a setup.xml.
         
    * A ERDDAP™ A servlet most indul a szerver indításánál. Ami azt jelenti, hogy az adatkészletek azonnal elkezdenek berakodni, ahelyett, hogy várnának, amíg kérés érkezik.
         
    * Az EDDTableFromMMultidimNcFiles removeMVRows paramétere most már hatásos. A hamisítás jelentősen felgyorsíthat néhány lekérdezést, de ez nem minden adatkészletre alkalmazható. További információkért lásd: [a paraméter leírása](/docs/server-admin/datasets#removemvrows) .
         
    * Adatbázisok (EDDTableFromNcFiles és EDDGrid FromNcFiles) a zarr fájlok használata már támogatott. A "zarr" -t vagy a fileNameRegex vagy path Regex fájlba kell beírni. Lásd a [marr secion az adatkészletek dokumentációjában](/docs/server-admin/datasets#zarr) további részletekért.
         
    * Új adatkészlet típus, EDDTableFromParquetFiles most támogatott. Lásd a [EDDTableFromParquetFile secion in the datasets documentation](/docs/server-admin/datasets#eddtablefromparquetfiles) további részletekért.
         
    *    [Prometheus metrics](https://prometheus.io/) már elérhetők az / erddap / metrics címen.
         
    * Új XML elemzőprogram áll rendelkezésre. Ez az új elemező lehetővé teszi az Xinclide használatát a datasets.xml . Köszönet Ayush Singhnek a műsorért.
         
    * Új paraméter datasets.xml hogy ellenőrizzék a szokatlan aktivitású e-maileket. unusualActivity A százalék a régi 25% -ra csökken. Köszönet Ayush Singhnek a műsorért.
         
    * Új paraméter a setup.xml-ben, amely azt szabályozza, ha az adatkészlet betöltési hibái megjelennek a status.html oldalon. Nem felel meg a valóságnak, ha a státus oldalon az adatkészlet hibáinak letiltása történik, akkor a LoadErrorsOnStatusPage-et kell beállítani:&lt;show LoadErrorsOnStatusPage &gt; hamis&lt;/ show LoadErrorsOnStatusPage &gt;
         
    * Néhány apró változtatás és hibajavítás.
         
*    **A ERDDAP™ Fejlesztők:** 
    * Az egységre szétválasztott vizsgálat és integrálás (lassú) vizsgálatok. További vizsgálatok engedélyezve, és a vizsgálatok már kevésbé pelyhes.
         
    * Hiba nyomtatás (néhány ellenőrzés még mindig nem működik) és Spot bogarak integrálva Maven.
         
    * Teljes kódú bázis, a Google Style Guide-hoz igazítva.
         

## változat{#version-224} 
 (felszabadult 2024- 06- 07) 

*    **Új jellemzők és változások (felhasználók számára) :** 
    * Új színű paletta EK80 akusztikus adatkészletekhez. Köszönet Rob Cermaknak ezért.
         
    * Fixen olyan kérdés, ahol EDDTableAggregateRows nem mutatott megfelelő tartományok minden gyermek. Köszönet Marco Albának a hibajelentésért.
         
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * TY: BIZTONSÁGI VÁLTOZÁS: A Google Authentication megváltoztathatja a CSP-jét.
        
Konkrétan, akkor is szükség lehet https://accounts.google.com/gsi/style Stlye- src és https://accounts.google.com/gsi/ Connect- src. A script- src most már használható https://accounts.google.com/gsi/client.
 
        
További információkért elmehet a [Google oldal](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy) a CSP konfigurációról.
         
        
    * Új Közös Őrszolgálat. Ez egy új lehetőség a könyvtárak frissítéséhez. Minden fájlrendszer esetében egy szál van egy szál helyett. Valószínűleg ez drasztikusan csökkenti a szálak számát, hogy figyelje a változásokat. Ez azt jelenti, hogy minden adatkészlet együtt frissül, ahelyett, hogy minden adatkészlet saját frissítési frekvenciával rendelkezne. Legvalószínűbb, hogy ez a legtöbb adatkészlet gyakoribb frissítését jelenti.
        
Ennek lehetővé tétele&lt;useSharedWatchService &gt; igaz&lt;/ useSharedWatchService &gt; a setup.xml.
        
          
Kérlek, próbáld ki, és jelentsd, hogy működik Chris-nek. John a Noaa.govban.
         
    * Javítsa meg a hibás var neveket a naplókban. Ayush Singh-nek köszönhetően.
         
    * Néhány apró változtatás és hibajavítás.
         
*    **Javítások ERDDAP™ fejlesztők:** 
    * A helyi fejlesztés támogatása Docker használatával. Köszönöm Matt Hopson és Roje.
         
    * A helyi fejlesztés támogatása Jetty használatával és a dokumentáció javítása. Köszönöm Micah Wengren.
         
    * A vizsgálatok módosítása a problémák határokon átnyúló csökkentése érdekében. Köszönöm. Shane St. Savage.
         

## változat{#version-223} 
 (szabad 2023- 02- 27) 

Megjegyzendő, hogy ezt a kiadást Bob Simons készítette, ami azt mutatja, hogy még mindig itt van és aktív az utódja, Chris John felé való átmenet során. Ezzel a kiadással az összes kódváltozást Chis John végzi, hacsak másként nem rendelkezik.

*    **Új jellemzők és változások (felhasználók számára) :** 
    *    (Nincs)   
         
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * TY: BIZTONSÁGI VÁLTOZÁS: A Google Authentication most az új Google Identity Services könyvtáron keresztül valósul meg, amely a "Sign In with Google" része. A Google támogatása a régi "Google Sign In" rendszer 2023- 03- 31 leáll. Tehát, ha a Google Authentication-t használja a ERDDAP™ telepítés, meg kell frissíteni ERDDAP™ v2.23 + előtte. (Bob sajnálja a rövid felmondást. Bob hibája.)   
         
    * JAVÍTÁS: Az NCCSV most v1.2. A változás az, hogy a fájlok most UTF- 8- kódolt fájlok (ASCII-k voltak.) és így most már bármilyen Unicode karakter, mint van, nélkül kódolás\\ u _ hhhh _, bár ez még mindig megengedett.
Az NCCV fájlok írásakor, ERDDAP™ Most V1.2 fájlokat ír.
         ERDDAP™ még mindig olvassa NCCSV fájlokat, amelyek követik a v1.0 és v1.1 specifikáció.
Köszönet Pauline- Chauvet, n-a- t- e, és thogar- számítógép, hogy ezt sugallja, és a tesztek, hogy a különböző táblázatkezelő programok importálhatnak UTF- 8 fájlokat. Köszönet Bob Simonsnak ezért a kódváltásért.
         
    * ÚJ: A status.html weboldalon most már van egy sor a tetején, amely jelzi, hogy melyik adatkészlet betöltése és kapcsolódó statisztikák, vagy nincs, ha nincs adatkészlet betöltése. Ez nagyon hasznos lehet ERDDAP™ adminisztrátorok próbálják kitalálni, miért terhelés A adatbázisok olyan sokáig tartanak. Az nGridDatasets, nTableDatasets és az nTotalDatasets is az alatt van, ami most már azonnali (Korábban az utolsó nagyobb rakomány végén voltak. Adatbázisok) .
Ez a változás Roy Mendelssohn-nak szól. Köszönet Bob Simonsnak ezért a kódváltásért.
         
    * JAVÍTOTT: GenerateDatasets Az Xml most a CF- 1, 10 értékre változik (CF- 1,6) a "Conventions" attribútumokban.
Köszönet Bob Simonsnak ezért a kódváltásért.
         
    * Néhány apró változtatás és hibajavítás.
         

## változat{#version-222} 
 (Szabad 2022- 12- 08) 

Megjegyzendő, hogy ezt a kiadást Bob Simons készítette, ami azt mutatja, hogy még mindig itt van és aktív az utódjára való áttérés során.

*    **Új jellemzők és változások (felhasználók számára) :** 
    *    (Nincs)   
         
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * Semmit.
         
    * Biztonsági BUG FIX: Volt egy Cross Site Scripting- kapcsolódó hiba a kód a nyelvi választás csepp le. Köszönöm NOAA Biztonsági szkennerek, hogy elkaphassuk. Ez azt mutatja, hogy NOAA a biztonság aktívan és rendszeresen keresi a biztonsági hiányosságokat ERDDAP .
         
    * BIZTONSÁGI FIX: A sok könyvtárak által használt ERDDAP™ a kiadás részeként a szokásos módon frissítették. Ez alkalommal a PostgreSQL illesztőprogram frissítése (amely volt egy biztonsági hiba) - 42.5.1.
         
    * JAVASOLT: ERDDAP A memóriagazdálkodási rendszernek csökkentenie kell annak az esélyét, hogy a rendelkezésre álló memória hiánya miatt egy adott kérés sikertelen legyen.
         
    * Néhány apró változtatás és hibajavítás.
         

## változat{#version-221} 
 (Szabad 2022- 10- 09) 

*    **Új jellemzők és változások (felhasználók számára) :** 
    *    (Nincs)   
         
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * TENNI: Java 17, akkor nem kell\\ -d64 JAVA\\ _ OPTS a setenv.bat vagy setenv.sh. Szóval, ha ott van, kérem távolítsa el. Azt hiszem, a 64 bites mód most van kiválasztva, amikor letöltöd a 64 bites verziót Java . Hála Sam Woodmannek.
         
    * BUG FIX: Néha az új e-mail rendszer túl gyakran próbált bejelentkezni, ami miatt a Google E-mail szerverei elutasítottak minden jövőbeli naplózást. Az e-mail rendszer elkerüli ezt és a kapcsolódó problémákat.
         

## változat{#version-220} 
 (released 2022- 09- 30) 

*    **Ne használj v2.20-at. Hibás.** De az adminisztrátorok még mindig meg kell csinálni a TO DO tételek alább, amikor korszerűsítés v2.21 +.
     
*    **Új jellemzők és változások (felhasználók számára) :** 
    *    (Nincs)   
         
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * JAVÍTÁS: A régi memóriagazdálkodási rendszert újra aktiváltuk (Math2.gondokElérhető) és módosította az új memóriagazdálkodási rendszert (EDStatic.therapent) hogy jobban működjön. Lásd [Memória állapota](/docs/server-admin/additional-information#memory-status) Részletekért.
         
    * MEGVÁLTOZOTT: Az alapértelmezett&lt;ipAddressMaxApplications &gt; in datasets.xml 7-ről 15-re nőtt. Világos, hogy néhány törvényes WMS az ügyfelek több mint 7 egyidejű kérést generálhatnak.
         

## változat{#version-219} 
 (felszabadult 2022- 09- 01) 

*    **Ne használd a v2.19.-et. Hibás.** De az adminisztrátorok még mindig meg kell csinálni a TO DO tételek alább, amikor korszerűsítés v2.20 +.
     
*    **Új jellemzők és változások (felhasználók számára) :** 
    * Új: Van egy új szerveroldal funkció, orderBy Leereszkedés, ami így működik: orderBy , de inkább csökkenő sorrendben. Adam Leadbetternek köszönhetően.
         
    * JAVÍTOTT: Most, grafikonok (de nem térképek) bővül, hogy töltse ki a rendelkezésre álló helyet a vásznon, azaz, tér nem használja a legenda. Magas grafikonok, négyszögletes grafikonok vagy széles grafikonok a & .size = _ width összeadásával és manipulálásával kaphatók | _ magasság _ paraméter (ahol a szélesség és a magasság határozza meg a vászon méretét, pixelben) URL kérésre. (Ez nem egy opció a .graph weboldalon. Kézzel kell hozzáadni az URL-hez.) Ha nem adja meg a & .size paraméter, kérések .small Png, .png, .largePng, .small Pdf, .pdf, és .large.pdf van előre meghatározott vászon méretek, így a grafikon bővül, hogy töltse ki a rendelkezésre álló helyet, de általában nagyjából négyzet. Hála Bob Flemingnek.
         
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * TILOS: ERDDAP™ Most kell Java 17 és a kapcsolódó Tomcat 10. Követned kell a ERDDAP™ Beszerelési utasítások (vagy ezzel egyenértékű, pl. dokkoló esetében) telepíteni Java 17 and Tomcat 10 and copy your \\[ Nincs magyar neve \\] / Content könyvtár a Tomcat 8 telepítésről az új \\[ Nincs magyar neve \\] Könyvtár. Nincs más változás, amit meg kell tennie a ERDDAP a változáshoz kapcsolódó telepítés. Más szóval, ERDDAP™ Úgy működik, ahogy korábban.
        
Ne felejtsd el, hogy a ERDDAP -kapcsolódó változások Tomcat server.xml és context.xml, ha frissíti Tomcat. Lásd ERDDAP s [A Tomcat telepítési utasításai](/docs/server-admin/deploy-install#tomcat) .
        
A benyomásom Java 17 az, hogy jobban szeret több feldolgozási teljesítmény és memória a hosszú távú, nagyobb alkalmazások, mint ERDDAP™ , így működik kissé lassabban, mint Java 8 kis teljesítményű számítógépekkel (például 2 magot és minimális RAM-ot) és kissé gyorsabban hat, mint Java 8 nagyobb teljesítményű számítógépekkel (4 + magok és bőséges RAM) . Ha rossz teljesítményt látsz, használj olyan programokat, mint a Linux [felső](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/) az erőforrás-felhasználás ellenőrzése és annak mérlegelése, hogy ERDDAP™ több erőforrás, különösen több memória. A memória olcsó&#33; A legtöbb telefonnak több processzora és memóriája van, mint azoknak a szervereknek, amiket maguk közül használnak a futáshoz. ERDDAP &#33;
Hála Erin Turnbull-nak.
         
        
    * TY: Ha Ön használja ERDDAP™ Cassandra-hoz, Cassandra-nak, továbbra is a Java amit a Cassandra vezetésére használtál. Csak válts rá Java 17 a Tomcat + futtatásához ERDDAP .
         
    * TY: Ajánlott: Ha a kiszolgáló CPU-ja 4 + maggal és 8 + GB RAM-mal rendelkezik, fontolja meg a beállítások megváltoztatását datasets.xml fájl:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Ha a szervernek kevesebb erőforrása van, mindkét beállítás esetén ragaszkodjon az "1" -hez.
Az nThreads rendszerek EDDGrid FromFiles és EDDTable A FromFiles jelentősen javult. Ezek a változások hatalmas sebességjavuláshoz vezettek. (pl. 2X gyorsulás, ha az nThreads 2 vagy több) A legkihívóbb kérések (amikor nagy számú fájlt kell feldolgozni az eredmények összegyűjtéséhez) . Néhány ehhez kapcsolódó változás Chris John-tól szintén általános gyorsasághoz vezet ERDDAP . E változások kódját Chris John adta meg. Köszönöm. Chris&#33;
         
    * Figyelmeztetés: kötőhártya datasetID 's are deprected and no more támogatott (bár technikailag még megengedett) . A következő kiadásban valószínűleg kizárják őket. Ha hyphens-t használ, váltson alátétekre, hogy elkerülje a bajt. Ha most változtatsz, az a te sebességed. Ha vársz a következő kiadásig, pánikba esel, és azon a napon meg kell birkóznod vele.
         
    * Most pedig .htmlTable adatválaszok, ha a sztringcellában lévő adatok adatokat tartalmaznak: kép / png; base64, majd egy bázis64 kódolt .png képet, ERDDAP™ megjelenik egy ikon (így a felhasználó láthatja a képet, ha lebegnek rajta) és gombok menteni a szöveget vagy a képet a vágólapra. Marco Albának köszönhetően (aki hozzájárult a kódhoz) és Bob Simons (aki kissé módosította.) .
         
    * ÚJ: -doNNotAddStandardName
Ha a\\ -doNotAddStandardNames parancssor paraméterként van megadva, amikor a generál Adatbázisok Xml, generál Adatbázisok Az Xml nem ad hozzá standard\\_name a addAttributes a szélességi, hosszúsági, magassági, mélységi vagy időbeli változóktól eltérő változók esetében (amelyek nyilvánvalóak standard\\_name sz) . Ez hasznos lehet, ha a generálás kimenetét használjuk Adatbázisok Xml közvetlenül ERDDAP™ a kimenet szerkesztése nélkül, mert generál Adatbázisok Xml gyakran találgatások standard\\_name Helytelen. (Megjegyzés, hogy mindig azt javasoljuk, hogy szerkessze a kimenetet, mielőtt használja a ERDDAP .) Ennek a paraméternek a használata más kisebb kapcsolódó hatásokat okoz, mert a kitalált standard\\_name gyakran más célokra használják, például új long\\_name , és létrehozni a ColorBar beállításokat. Hála Kevin O 'Briennek.
         
    * Most már beteheted.&lt;frissítésMax. Események &gt; 10&lt;/ frissítésMaxEsemények &gt; in datasets.xml   (in a többi beállítások közelében a tetején) a fájlok maximális számának módosítása (alapértelmezés = 10) amit a ModeEveryNMillis rendszer fog feldolgozni. Nagyobb szám (100?) hasznos lehet, ha nagyon fontos, hogy az adatkészlet mindig naprakész legyen. Lásd a [frissítésMaxEsemények dokumentációja](/docs/server-admin/datasets#updatemaxevents) . Hála John Maurernek.
         
    * ÚJ: A globális támogatás növelése " real\\_time = true | hamis "String attribútum.
Ha ez hamis (alapértelmezés) és ha az adatkészlet nem használ frissítést EveryNMillis, ERDDAP™ cache választ kérések fájltípusok, ahol az egész fájl kell létrehozni előtt ERDDAP™ elkezdheti elküldeni a választ a felhasználónak, és újrafelhasználhatja őket akár 15 percig (például: .nc , .png) .
Ha ez igaz, vagy ha az adatkészlet frissítést használ EveryNMillis, ERDDAP™ soha nem tárolja a válaszfájlok és mindig visszatér az újonnan létrehozott fájlokat.
Hála John Maurernek.
         
    * Az e-maileket külön e-mailben küldik. Ez teszi betöltési adatkészletek és más akciók generál e-maileket gyorsabb, mert a loadDatasets nem kell várni, hogy az e-mail kell küldeni, ami néha sokáig tart. Az új rendszer több e-mailt is küldhet e-mail munkamenetenként, ezáltal csökkentve az e-mail szerver bejelentkezések számát, és csökkentve annak kockázatát, hogy a sikertelen, mert túl gyakori. Vannak statisztikák az emailThread a status.html oldalon és diagnosztikai üzenetek a log.txt -- keresd az "emailThread". Megjegyzés, hogy egy sor nEmailsPerSession = 0, jelzi a baj, azaz, egy e-mail munkamenet nem volt képes e-maileket küldeni.
Hála Bob Simonsnak.
         
    * MEGVÁLTOZOTT: Az e-maileket most kissé más kóddal küldik (mert Java 17 és az emailThread módosítása) . Ha nehézségei vannak e-mailek küldésével, kérjük, küldje el e-mailben erd.data at noaa.gov .
         
    * ÚJ: Feliratkozási műveletek, amelyek "érintenek" egy távoli URL-t, most már külön touchThread-ben kezelhetők. Ez teszi a betöltési adatkészletek és más intézkedések, amelyek megérintik URL-ek gyorsabb, mert a loadDatasets nem kell várni, hogy az érintés befejeződjön, ami néha sokáig tart. Vannak statisztikák a touchThread a status.html oldalon és diagnosztikai üzenetek a log.txt -- keresse meg a "touchthread".
Hála Bob Simonsnak.
         
    * ÚJ: A status.html oldalon, a "Major LoadDatasets Time Series" -ban, van egy új "sher" oszlop, amely jelzi a kérelmek számát, amelyek a jelenlegi ERDDAP™ A memória túl magas volt. Kérések, amelyek istállót vissza HTTP státusz kód 503 "Szolgáltatás elérhető". Ezek a kérések nem voltak szükségszerűen probléma. Épp most érkeztek meg egy zsúfolt időben. Ez része volt annak, hogy ERDDAP™ foglalkozik a nagy memória használat.
         
    * ÚJ: Az Unix / Linux számítógépeken most már van egy "OS Info" vonal a status.html weboldalon a jelenlegi operációs rendszer információival, beleértve a CPU betöltését és a memória használatát.
         
    * JAVÍTOTT: Most, amikor ERDDAP™ újraindítása és a quickRestart = true, EDDTableFromFiles datasets will reuse alset .nc és elkülönül .nc . Néhány adatkészlet esetében ez jelentősen csökkenti az adatkészlet betöltésének idejét (például 60 másodperctől 0.3-ig) . Együtt az új emailThread és TaskThread (lásd fent) , Ez nagyban felgyorsítja az újraindítást ERDDAP™ sok ERDDAP™ berendezések. Hála Ben Adamsnek és John Kerfootnak.
         
    * Az előző részek tartalmából: (élő adatkészletek ERDDAP™ de nincs datasets.xml ) egyszerűen megjegyezték a státuszukat. html és log.txt minden nagyobb betöltési adatkészlet után. Most, automatikusan eltávolítják ERDDAP™ és rögzített status.html és a log.txt, és e-mailben Mindent. Tehát, ha el akarsz távolítani egy adatelemet ERDDAP™ , most már csak annyit kell tennie, hogy távolítsa el a darab xml datasets.xml és eltávolítjuk a következő nagy rakományadatbázisokban. Hála Bob Simonsnak.
         
    * ISMERT BUG in netcdf- java v5.5.2 és v5.5.3: A EDDGrid FromThredek Katalógus opció az GenerateDatasets-ben Xml használt dolgozni THREDDS katalógusok, amelyek tartalmazzák a hivatkozások adatkészletek távoli THREDDS katalógusok. Most már nem. Jelentettem a problémát a netcdf- java fejlesztőknek.
         
    * BUG FIX: A Docker felhasználók beállításához setup.xml paramétereket ERDDAP \\ _ _ paramName _: int és logikai paraméterekhez (például e-mail SmtpPort) , ERDDAP™ Helytelenül kerestük az _ paramName _. Most meg azt keresi: ERDDAP ParamName. Alessandro De Donno-nak köszönhetően.
         
    * A ERDDAP™ a tesztelési rendszer most egy automatizált rendszert használ annak ellenőrzésére, hogy az újonnan létrehozott vizsgálati képek pontosan a vártnak felelnek meg. Chris-nek köszönhetően. John a javaslatért és Bob Simons a végrehajtásért.
         

## változat{#version-218} 
 (released 2022- 02- 23) 

*    **Új jellemzők és változások (felhasználók számára) :** 
    * NONE
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * BUG FIX: .nc Az aktákat nem zárták le bizonyos körülmények között. Most már igen. Hála Marco Albának, Roland Schweitzernek, John Maurernek és másoknak.
         

## változat{#version-217} 
 (released 2022- 02- 16) 

*    **Új jellemzők és változások (felhasználók számára) :** 
    * BUG FIX: A orderBy rendszer néhány évvel ezelőtt, Tabledap 's Make A Graph nem megfelelően kezelni sok kérdés, amely használt orderBy Xxx. Most már igen. Köszönet Maurice Libes-nek.
         
    * Korábban ERDDAP™ elutasított kérelmek. átlátható Png, amikor a szélességi és / vagy hosszúsági értékek részben vagy teljesen kívül voltak a tartományon. ( ERDDAP™ GitHub kérdések # 19, kifüggesztett by Rob Fuller -- köszönöm, hogy posztolta, hogy Rob) Most adja vissza az átlátszó pixeleket a kép minden tartományon kívüli területéhez. Ez sok kliens alkalmazás számára hasznos. A kód változtatásokat, hogy ez a változás tette teljes egészében Chris John. Köszönöm szépen, Chris&#33;
         
    * Korábban ERDDAP™ elutasított griddap kérelmek, ha egy adott dimenzió indexértékei \\[ magas: alacsony \\] . Most már érvényessé teszi ezeket a kérelmeket az alacsony és magas értékek kicserélésével. Ez megoldja a hosszú távú probléma a felhasználók és a külső programok, mint az xtracto, amelynek nyomon kellett követni a néhány adatkészletek, amelyek a szélességi értékek, amelyek a magas és alacsony, hogy a kérés, mint \\[  (50) : (20)  \\] hogy a kérés index tér volt \\[ alacsony: magas \\] . Lásd https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html Nos, egy kérés: \\[  (20) : (50)  \\] az egyik ilyen adatkészlet automatikusan értelmezi: \\[  (50) : (20)  \\] .
         
    * MEGVÁLTOZOTT: .esriAscii kérések most elindítja a "Fájl: Mentés" párbeszédablak a felhasználó böngészőjében. Joel Van Noordnak köszönhetően.
         
    * BUG FIX: Most, ha a hosszúsági változó egy gyermek adatkészlet a EDDGrid LonPM180 vagy EDDGrid Lon0360 dataset valid\\_min és / vagy valid\\_max attribútum, eltávolítják a EDDGrid LonPM180 vagy EDDGrid Lon0360 dataset. Hála Roy Mendelssohn-nak.
         
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * TY: Ha beállította volna&lt;dataProviderFormative &gt; a hamis, hogy ideiglenesen kezelni az XSS sebezhetőség, kérjük állítsa vissza a valós.
         
    * Security BUG FIX: Rögzített XSS sebezhetőség adatszolgáltatói űrlapon. Hála Genaro Contreras Gutiérreznek.
         
    * BUG FIX: Amikor egy AWS S3-as szemétdombon több mint 10000 fájl volt, ERDDAP™ Eldobott egy belső hibát. Ez már megoldódott. Hála Andy Zieglernek.
         
    * BUG FIX: EDDGrid SideBySide nem engedte a változó sourceName A különböző gyermekes adatállományokban azonos. Most már igen. Hála Joshua Stanfordnak.
         

## változat{#version-216} 
 (felszabadult 2021- 12- 17) 

*    **Új jellemzők és változások (felhasználók számára) :** 
    * VÁLTOZÁS / BÖRÖGZÉS: Számos kis változtatások a fordítási rendszer köszönhetően javaslatok a nyelvi-specifikus szerkesztők. Hála Melanie Abecassisnak, Marco Albának, Jessy Barrette-nek, Filipe Fernandes-nek, Etienne Godin-nak, Jennifer Sevadjian-nak és Mike Smit-nek.
         
    * Hozzáadott egy megfelelő nyilatkozat és hozzárendelése a Google Translate, ahogy azt a feltételei a Google Translate. Továbbá, a&lt;html &gt; tag a HTML minden weboldalon most már megfelelően azonosítja a nem angol weboldalak, mint már lefordított gép. Hála Mike Smitnek.
         
    * BUG FIX: A bejelentkezési weboldalak most megfelelően működnek a különböző nyelvi beállítások. Hála Mike Smitnek.
         
    * ÚJ orderBy Sum szűrő. És új Check All and Uncheck Minden gomb bekapcsolva EDDGrid Adathozzáférési űrlap weboldal. Hála Marco Alba kódhozzájárulásának.
         
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * TY: ha Ön
        &lt;questMarkImageFile &gt; QuestionMark.jpg&lt;/ questMarkImageFile &gt;
a setup.xml fájlban az egész címkét el kell távolítani (ajánlott, így az alapértelmezett fájl használata) vagy módosítsa:
        &lt;kérdés MarkImageFile &gt; kérdőív Mark.png&lt;/ questMarkImageFile &gt;
         
    * Csak hogy tudd, [Adoptium](https://adoptium.net/?variant=openjdk8) felváltotta az AdoptOpenJDK-t mint a Java   (OpenJDK) .
         
    * A naplófájlok ERDDAP™ , GenerateDatasets Xml, és DasDds most UTF- 8, nem a számítógép alapértelmezett karakterkészlete. Sokat ellenőriztem, és néhány változtatást tettem annak érdekében, hogy ERDDAP™ mindig meghatározza a megfelelő karakterkészlet olvasásakor vagy írásakor mindenféle fájlokat, és már nem (több esetben) a számítógép alapértelmezett karakterkészletére támaszkodik. Ez kijavított néhány hibát, és olyan közel került a cél, hogy az UTF- 8 a lehető legtöbb fájltípus (pl. .log, .xml, .html, .json , .json I, .nc Fejléc) . Megjegyzendő, hogy sok régebbi fájltípusra van szükség az ISO-8859-1 használatához (például: OPeNDAP .das, .dds, .csv, .tsv , .nc 3, .nccsv , .cpt) . Korábban próbáltam együtt dolgozni a CF csoport és Unidata az UTF- 8 támogatásának hozzáadása .nc 3 fájl, mindkettő ellenálló volt.
         
    * ÚJ: AWS S3 fájlok letöltésekor, ERDDAP a gyorsítótár FromUrl rendszer EDDGrid FromFiles és EDDTable FromFiles most használja az új AWS Transfer Manager letöltéséhez fájlokat parallelized darabok (így nagyon gyors) . A cél átvitel be van állítva 20 Gbps, fájlonként, így ez jól működik minden AWS példány típusok, de különösen azok, amelyek kiváló "Networking Performance". Ezzel a változással ERDDAP a gyorsítótár FromUrl rendszer most kínál összehasonlítható sebességet az xarray megközelítése parallelized letöltések pre- chunked fájlokat, de anélkül, hogy szükséges, hogy átalakítsa a forrás fájlokat .nc és .hdf a chunked xarray fájlokba. Valójában, ERDDAP A rendszer jobb, ha van egy későbbi kérés olvasni ugyanabból a fájlból, mert ERDDAP™ Most van egy helyi másolata a fájlnak. A közösségünk éveket töltött szabványosítással .nc és .hdf fájlok. Ezt nem kell kidobnunk, csak hogy jó teljesítményt kapjunk, amikor adatokat tárolunk az AWS S3-ban. Hála Rich Signell-nek.
         
    * A keresőmotor = Lucene egyenlőre romlott. Ez egy összetett rendszer, amely gyakran hoz eredményeket, amelyek némileg különböznek a kívánatosabb viselkedését keresőmotor = eredeti. Majdnem minden ERDDAP™ berendezések, az időmegtakarítás Lucene nem ellensúlyozza a különbségeket az eredmények. Kérjük, használja a keresőmotor = eredeti helyett, ha lehetséges. Ha ez problémát okoz, kérjük, küldjön e-mailt Bobnak.
         
    * A Lucene keresőmotor most már jobban hasonlít az eredeti keresőmotorra. Már nincs olyan eset, amikor Lucene azt hiszi, hogy egy adatkészlet egyezik, és az eredeti nem. Továbbá, Lucene rangsora megegyezik az eredeti rangsorával. (mert az eredetit most már mindig a rangsorok kiszámításához használják.) .
         
    * BUG FIX: Egy újabb kiadással kezdve, ERDDAP™ nem lát többet, mint az első 1000 tárgy egy adott AWS S3 vödör. Nos, ERDDAP™ újra látja az összes tárgyat. Hála Andy Zieglernek.
         
    * BUG FIX: most EDDTableAggregate A sorok eltávolítják a actual\\_range attribútum, amikor egy vagy több gyermekadatkészlet soha nem ismeri a változóit ' actual\\_range   (pl. EDDTableFromDatabase) . Hála Erik Gelettinek.
         

## változat{#version-215} 
 (released 2021- 11- 19) 

*    **Új jellemzők és változások (felhasználók számára) :** 
    *    ERDDAP™ van egy új rendszer, amely lehetővé teszi a felhasználó adja meg a nyelvet kell használni minden weboldalon. Ha ERDDAP™ telepítés áll, hogy használja, a nyelvek listája jelenik meg a jobb felső sarokban minden weboldal. ERDDAP™ URL-ek előtt ez a verzió továbbra is működik, és mindig vissza angol tartalom, mint korábban.
        
Nem minden szöveget vagy weboldalt fordítottak le. A projekt időbeli korlátai megakadályozták, hogy Qi és Bob elérje a 100% -ot.
        
A nyilvánvaló kérdés az, hogy miért fektettünk bele ennyi energiát, amikor a Chrome lefordítja a weboldalt a -the- fly oldalon? A válasz: így sokkal jobban tudjuk irányítani a fordítást. Különösen sok szó van, amit nem kellene lefordítani a weboldalakon, például az adatkészletek címei és összefoglalói, a változók, paraméterek, egységek és szervezetek neve. A fordítási erőfeszítések nagy része a szavak és kifejezések azonosítása volt, amiket nem kellene lefordítani. Továbbá, a gép fordításai bizonyos típusú HTML markup-ot markoltak. A fordítás kezelése lehetővé tette számunkra, hogy minimalizáljuk ezt a problémát.
        
A fordítási projekt Qi Zeng (a Google Summer of Code gyakornok) és Bob Simons a Google Fordítási webes szolgáltatását használja. Hatalmas projekt volt. Köszönöm. Qi&#33;
        
    * BUG FIX: ERDDAP™ Így az ORCID azonosítója X lesz az utolsó számjegy. Köszönet Maurice Libes-nek.
         
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * TILOS:
        
        * Meg kell, hogy néhány módosítást kapcsolódó ERDDAP az új rendszer, amely lehetővé teszi a felhasználók számára, hogy meghatározzák a nyelvet a weboldalak.
            * Az első sorban a setup.xml és datasets.xml files, change to: encoding = "UTF- 8" and change the document 's encoding in your text editor so it is mented as a UTF- 8 file. GenerateDatasets Xml most feltételezi, hogy a datasets.xml egy UTF- 8 fájl.
            * Összeállított programozók ERDDAP : Valamennyi ERDDAP™ A .java fájlokat UTF- 8 fájlként kell kezelni. Lehet, hogy az "UTF- 8 kódolást" hozzá kell adni a javac parancssorhoz. (Igen.) 
            * A rendszer lehetővé tétele (erősen ajánlott) , a&lt;startBodyHtml5 &gt; címke datasets.xml , a "& amp&#33; loginInfo;" helyett "& amp&#33; loginInfo; | & amp&#33; nyelv; "így a nyelvek listája megjelenik a jobb felső sarokban minden ERDDAP™ weboldalt.
            *    ERDDAP™ kizárólag:&lt;startBodyHtml5 &gt; címke datasets.xml a HTML tartalom megadása a banner tetején minden ERDDAP™ weboldal, függetlenül attól, hogy a felhasználó milyen nyelvet választ. Ha megváltoztatod a címkét a használathoz
" &EasierAccessToScientificData; "a tudományos adatokhoz való könnyebb hozzáférés helyett" és
" &BroughtToYouBy; "Ahelyett, hogy" hozott neked ", ERDDAP™ használja a fordított változatok ezeket a mondatokat a banner.
            * Hasonlóképpen, az új alapértelmezés&lt;ShortDescriptionHtml &gt; in datasets.xml ed
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
A tartalom utolsó 3 sora olyan dolog, amelyet lefordított szöveggel helyettesítenek. Ha bármelyiküket megtéríted (nevezetesen: Részecske Erddap;) vagy az összes, hogy kifejezett szöveg datasets.xml   (amely elsőbbséget élvez, ha jelen van) vagy messages.xml, hogy a szöveg jelenik meg, függetlenül attól, hogy a felhasználó milyen nyelvet választ. Ez nem tökéletes, de gondoltam, hogy kevés adminisztrátor szeretne szerkeszteni&lt;A ShortDescriptionHtml &gt; 35 különböző fájlban, hogy 35 különböző lefordított változatát a tag.
        
          
         
    * MEGVÁLTOZOTT: Néhány hibát most kissé másképp kezelnek, így hozzá lehet adni a status.html-en és a Daily Report Email-en lévő "sikertelen kérések" sorrendjéhez. Tehát ezek a számok valamivel nagyobbak, mint korábban.
         
    * BUG FIX: GenerateDatasets Xml EDDGrid Lon0360 és EDDGrid A LONPM180 már nem tartalmazza a forrásadatokat datasetID = ~ ".\\*\\ _ LonPM180 "és datasetID = ~ ".\\*\\ _ Lon0360 ", illetve.
         

## változat{#version-214} 
 (szabad 2021- 07- 02) 

*    **Új jellemzők és változások (felhasználók számára) :** 
    *    (nincs)   
         
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * ÚJ: EDDGrid Lon0360, amely egy gridded adatkészlet hosszúsági értéke & gt; = 0 és&lt;= 360 egy gridded adatkészletből, amelynek hosszúsági értékei & gt; = -180 és&lt;= 180. Lásd a [ EDDGrid Lon0360 dokumentáció](/docs/server-admin/datasets#eddgridlon0360) . Hála Dale Robinsonnak.
         
    * ÚJ: ERDDAP™ Az adminisztrátorok most már felülbírálhatják a setup.xml értéket egy környezeti változón keresztül. ERDDAP \\ _ _ értéknév _ futás előtt ERDDAP . Például, használat ERDDAP \\ _ baseUrl felülírja a&lt;baseUrl &gt; érték. Ez hasznos lehet, amikor a telepítés ERDDAP™ Konténerrel, mivel a standard beállításokat a setup.xml-be lehet tenni, majd speciális beállításokat lehet biztosítani környezeti változókkal. Ha titkos információt szolgáltat ERDDAP™ ezen a módszeren keresztül ellenőrizze, hogy az információ titokban marad-e. ERDDAP™ csak egyszer olvassa el a környezeti változókat indításonként, az első másodpercben a startup, így az egyik módja annak, hogy használja: állítsa be a környezeti változók, start ERDDAP™ Várj, amíg ERDDAP™ megkezdődött, majd kibontja a környezeti változókat. Hála Marc Portier-nek.
         
    * JAVÍTOTT: Ha néhány fájl egy EDDTableFrom... A sok fájlból álló fájlok néhány nagyon hosszú String értékkel rendelkeznek, az adatkészlet sokkal gyorsabban töltődik és sokkal gyorsabban válaszol a kérésekre. Korábban... ERDDAP™ sok helyet biztosítana a min és max String értékeknek azokban a fájlokban, amelyeket az ilyen adathalmazokhoz szükséges fájladatokkal tárolnak. Az így kapott fájl hatalmas volt, ami miatt lassan kell írni és olvasni. Hála az OBIS-nak.
         
    * JAVÍTOTT: Most, ERDDAP™ jobb munkát végez a szokatlan és érvénytelen karaktersorozatok CSV fájlokban történő értelmezésében. Hála az OBIS-nak.
         
    * Egy év Cassandrával való zűrzavar után végre sikeresen telepítettem Cassandrát (v2) újra és így sikerült újrafuttatni a teszteket Cassandra v2-vel. Így magabiztosabban kijelenthetem, hogy ERDDAP™ A Cassandra v2-vel és v3-mal működik. Hála az ONC-nek.
         

## változat{#version-212} 
 (felszabadult 2021- 05- 14) 

*    **Új jellemzők és változások (felhasználók számára) :** 
    * BUG FIX: Ha az előfizetési feketelistán vagy, nem kérhetsz listát az előfizetéseidről.
         
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * TY: ÚJ: olyan rendszer, amely automatikusan korlátozza a rosszindulatú felhasználók és a túlságosan agresszív, legitim felhasználók azon képességét, hogy nagyszámú egyidejű kérelmet nyújtsanak be, amelyek a rendszer teljesítményét más felhasználók számára rontják. Van 3 új opcionális címkék datasets.xml amelyet közvetlenül azután lehet / kell hozzáadni&lt;grafikus BackgroundColor &gt;:
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

További információk: [ipCímzettek Max. Kérések](/docs/server-admin/datasets#ipaddressmaxrequests) . ERDDAP™ "Egyedi felhasználók száma (indítás óta) "a status.html oldalon.
Köszönhetően annak, aki Kínában megtámadta az én ERDDAP™ telepítés.
         
    * Váltás a Postgresql meghajtó viselkedésére: Amikor frissítettem a Postgresql meghajtót, a Postgresql és az GenerateDatasetsXml által generált táblázatlistában szereplő oszlopnevek minden nagybetűs eset helyett, mint korábban. Nem tudom, hogy ez hatással lesz-e más dolgokra, mivel az adatbázisok gyakran úgy vélik, hogy ezek a nevek érzéketlenek. A teszt adataim még mindig működnek. De ha a dataset nem dolgozik ezzel ERDDAP™ Frissítés, ez a lehetséges ok, hogy az első.
         
    * BUG FIX: ERDDAP™ Most is kezeli a privát AWS S3 fájlokat helyesen. Az AWS S3 fájlok kezelésének más, ehhez kapcsolódó javításai voltak. Hála Michael Ganglnak és Dylan Pugh-nak.
         
    * ÚJ: EDDGrid FromNcFiles és EDDGrid FromNcFiles A kicsomagolt adatok már olvashatók a "struktúrák" .nc 4 és .hdf 4 fájl. A változók azonosítására, hogy egy struktúra, a&lt; sourceName &gt; kell használni a formátum: _ fullStructureName | _ memberName _, például group1 / myStruct | A tagom. Hála az NRL-nek.
         
    * MEGVÁLTOZOTT: Ha az aktuális memória használat plusz ez a kérés még egy kicsit magas, griddap készletek nThreads for this request to 1. Így, ERDDAP™ megőrzi az emlékeket, ha kevés az emlék. Köszönhetően annak, aki Kínában megtámadta az én ERDDAP™ telepítés.
         
    * Új rendszer a nyitott fájlok számának nyomon követésére (amely magában foglalja a foglalatokat és más dolgokat, nem csak fájlokat) a Tomcat Linux számítógépeken. Ha néhány fájl tévedésből soha nem záródik be, a nyitott fájlok száma növekedhet, amíg meghaladja a maximálisan megengedett és számos nagyon rossz dolog történik. Tehát most, a Linux számítógépeken (az információ nem áll rendelkezésre a Windows) :
        
        * Van egy új "Nyílt fájlok" oszlop a jobb oldalon a status.html weboldal mutatja a százalékos max fájlokat nyitott. A Windows csak azt mutatja, hogy "?".
        * Mikor? ERDDAP™ generálja ezt az információt a végén minden nagyobb adatkészlet újratöltés, ez kinyomtatja a naplóba. txt fájl:
openFileCount = _ current _ of max = _ max _% = _% _
        * Ha a százalék &gt; 50%, egy e-mailt kell küldeni a ERDDAP™ adminisztrátor és az e-mail Minden. E-mail címekre.
        
Hogy többet tudjon meg, vagy ha látja ezt a problémát a ERDDAP™ Látod? [Túl sok nyitott fájl](/docs/server-admin/additional-information#too-many-open-files) .
Köszönhetően annak, aki Kínában megtámadta az én ERDDAP™ telepítés.
         
    * Új: Tettem hozzá egy csomó ellenőrzés és kezelése "Túl sok nyitott fájlok", így a feladat csak megáll, és a felhasználó látja a hibaüzenet. Adatfájlok többé nem lesz megjelölve, mint rossz, ha az olvasás eredménye a "Túl sok nyitott fájlok" hiba.
         
    * ÚJ \\[ bigParentDirectory \\] / badFilesFlag könyvtár:
Ha ebbe a könyvtárba a datasetID fájlnév (A fájl tartalma nem számít.) , ERDDAP™ Törli a rossz fájlokat .nc fájl ehhez az adatkészlethez (ha van) és töltse újra az adatokat, amilyen gyorsan csak lehet. Ennek okai ERDDAP™ próbálja újra dolgozni a fájlokat korábban (Hibásan?) Úgy van jelölve, mint a rossz. Hála Marco Albának.
         
    * Ha EDDGrid A... fájlokból vagy az EDDTableFrom... A fájloknak kezdetben 0 fájljuk van az ismert érvényes fájlok listájában (például, ez egy új adatkészlet) , akkor ERDDAP™ elhalasztja a betöltését, és úgy állítja be a zászlót, hogy a nagyobb betöltési adatkészletek befejezése után azonnal betöltse. Ez felgyorsítja a kezdeti indítást, amikor új adatkészletek vannak.
         
    * MEGVÁLTOZOTT: FileVisitorNLS.testAWSS3 () és FileVisitorSubdir.testAWSS3 () ; most használja az AWS v2 (nem v1) SDK. Szóval most a Git ERDDAP™ distribution most tartalmazza az összes szükséges fájlokat, és már nem kell kézzel hozzáadni a masszív v1 AWS SDK jar fájlt.
         
    * Megváltoztam: Maven segítségével észleltem / gyűjtöttem függéseket (a .jar fájlok / lib) . Az AWS SDK v2-re történő módosítása ezt tette szükségessé. A jövőben más importált kódokra is szükség lesz. Hatalmas köszönet Kyle Wilcox-nak, aki biztosította az általa létrehozott és használt pom.xml-t, ami számos problémát megoldott számomra.
         
    * VÁLTOZOTT: A classpath paraméter (- cp) Használt GenerateDatasetXml, DasDds és más kis programok, hogy jön ERDDAP™ , és a tanácsadás a programozók most sokkal egyszerűbb, és soha többé nem kell változtatni, mivel ez utal a könyvtár, nem az egyes fájlokat:
\\ -cp osztályok; C:\\ programok\\\ _ tomcat\\ lib\\ servlet- apiijar; lib\\\ *
         (vagy ':' helyett ';' Linux és Macs) .
         (Már évekkel ezelőtt meg kellett volna tennem, amikor lehetőség lett belőle.)   
         
    * ÚJ: GenerateDatasets Xml van egy új közüzemi opció: find DuplicateTime, amely keresni fogja a gyűjteménye rácsozott .nc   (és kapcsolódó) fájlok keresése az időértékek másolásával. Lásd [FindDuplicate Idő](/docs/server-admin/datasets#findduplicatetime)   
         
    * ÚJ: datasets.xml a&lt;paletta &gt; címke, amely felülírja a&lt;paletta &gt; címke értéke üzenetek.xml (vagy visszatér az üzenet.xml értéke, ha üres) . Ez lehetővé teszi, hogy módosítsa a listát a rendelkezésre álló paletta, míg ERDDAP™ Rohan. Is, ha van egy cptfiles alkönyvtár a ERDDAP™ tartalomjegyzék, ERDDAP™ át fogja másolni az összes\\ * .cpt fájlt abban a könyvtárban a \\[ Nincs magyar neve \\] / Webaps / erddap / WEB- INF / cptfiles könyvtár minden alkalommal ERDDAP™ Elindul. Együtt, ezek a változások lehetővé teszi, hogy adjunk paletta és a változások továbbra is, ha telepít egy új változata ERDDAP . Lásd a [paletta dokumentáció](/docs/server-admin/datasets#palettes)   
Hála Jennifer Sevadjian-nek, Melanie Abecassis-nek, és talán más parti őröknek.
         
    * Megváltozott.&lt;Lassú DownTroubleMillis &gt;] (/ docs / server- admin / datasets # lassuldowntroblemillis) most már minden sikertelen kéréshez használják, nem csak néhány típushoz.
         
    * VÁLTOZOTT: A RunLoadDatasets szál most megszakítja a LoadDatasets szálat 3 / 4 LoadDatasets MaxMinutes így több idő van LoadDatasets észrevenni a megszakítás és a kilépés kecsesen. További és jobb diagnosztikai üzenetek erre.
         
    * A Lucene régi verziójától a 8.7.0-ra változott.
         
    * Elküldött e-mailek ERDDAP™ most jelenik meg egy fix szélességű betűtípussal.
         
    * Váltás: EDDGrid FromFiles most kap tengelyértékek és attribútumok az ELT | Az utolsó fájl, az alábbiak szerint:&lt;metadataFrom &gt;. Köszönöm. (nem) Ken Casey, et al.
         
    * ADDED támogatás az érvénytelen egységek "diploma\\ _ North" és "fokozat\\ _ East", amelyeket tévesen használt a legutóbbi fájlokat (2020- 10- 01 óta) AVHRR Pathfinder 5. 3 verziójában L3- kollated (L3C) SST adatkészletek (nceiph53 sst d1day és ncePH53 sst unit description in lists) . ERDDAP™ most már szabványosítani őket érvényes egységek. Köszönöm. (nem) Ken Casey, et al.
         

## változat{#version-211} 
 (Szabad 2020- 12- 04) 

*    **Új jellemzők és változások (felhasználók számára) :** 
    * BUG FIX: OrderByMean dobott egy NullPointerException, ha egy változó csak egy\\ _ FillValue vagy hiányzik\\ _ Érték meghatározása. Most jól kezeli a helyzetet. Hála Marco Albának.
         
    * BUG FIX: Voltak problémák az ODV szöveges fájlok által létrehozott ERDDAP™ a 2.10. pontban. Ezek a problémák megoldódtak. Hála Shaun Bellnek.
         
    * BUG FIX: Most jöttem. ERDDAP™ v2.10: Ha az URL-ben a lat lon határait határozták meg, a kerítő doboz nem került fel a világtérképre. Már megint az. Hála John Maurernek.
         
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * BUG FIX: Most jöttem. ERDDAP™ v2.10: Az ArchiveADataset, GenerateDatasets szkriptfájlok Xml és DasDds nem működött, mert nem volt a változások a classpath, amely hozzáadott ERDDAP™ Most már tudják. Hála Marco Albának.
         
    * ÚJ: In datasets.xml , akkor most már a címke:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

Jelenleg, ha igaz (vagy ha a címke üres, vagy ha a címke nincs a fájlban) , amikor a felhasználó kérése egy NullPointerException-hez vezet, ERDDAP™ e-mailben a stack nyomkövetés erd.data at noaa.gov   (a ERDDAP™ fejlesztési csoport) . Ennek biztonságosnak és biztonságosnak kell lennie, mivel nincsenek bizalmas információk. (pl. a kérelem) benne van az e-mailben. Ez lehetővé teszi, hogy elkapjon minden homályos, teljesen váratlan hibákat vezet NullPointers kivételek. Ellenkező esetben a felhasználó látja a kivételeket, de a ERDDAP™ A fejlesztők nem, szóval nem tudjuk, hogy van-e olyan probléma, amit meg kell oldani.
        
Lehetséges, hogy ez a címke vezet más, hasonló diagnosztikai információk e-mailben erd.data at noaa.gov a jövőben. Az e-mail tartalma mindig minimális, és kapcsolódik a hibák, és nem, például, használati információk. Hála Marco Albának.
         
        
    * VÁLTOZOTT: Most, közös tömörített fájltípusok ( .bz2 , .gz , .gzip , .tar , .tgz , .z , .zip ) szintén tilos byte range kérések. Ez van megadva a&lt;extensionsNoRangeApplications &gt; in messages.xml.
         
    * Ismerős probléma: Mint ERDDAP™ 2.10, .nc ml fájlok, amelyek megpróbálnak változtatni egy attribútum, ne változtassa az attribútum. Ez egy ismert hiba a netcdf- java-ban, amit jelentettem, és azt mondják, hogy rögzítik a következő kiadás a netcdf- java.
         

## változat{#version-210} 
 (kiadás 2020- 11- 05) 

*    **Új jellemzők és változások (felhasználók számára) :** 
    * ÚJ: Az új [Interpolát](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html) a konverter hatékonyan interpolálja a rácsozott adatkészlet értékeiből származó értékeket. Így különösen hasznos az állatforgalmi adatokkal dolgozó kutatók számára. Ez a konverter vesz egy asztalt szélességi, hosszúsági és időbeli oszlopok (és talán más oszlopok) és ad vissza egy táblázatot további oszlopokkal interpolált értékeket. Így ez hasonló a népszerű [Xtractomatic](https://coastwatch.pfeg.noaa.gov/xtracto) szkript eredetileg készítette Dave Foley, de kínál az előnye a feldolgozás akár 100 pont kérésre. Hála Dave Foley-nak és Jordan Watson-nak. ( NMFS ) .
         
    * JAVÍTOTT: Advanced Search most szigorú non-.html kérések. Most kivételeket vet ki az állandó hibákkal járó kérelmekre. (pl. kérések, ha minLat &gt; maxLat) vagy átmeneti hibák (például a standard\\_name Ez nem létezik.) . A html kérések, Advanced Search változatlan: mint a Google keresések, ez teszi a legjobb és csendben javít vagy figyelmen kívül hagyja a hibákat. Hála Rich Signell-nek.
         
    * JAVASOLT: A térkép az Advanced Search oldalon most nagyobb (Még mindig hunyorítanod kell, de kevesebbet.) és lényegesen pontosabb (de még mindig nem tökéletes.) . Hála John Maurernek.
         
    * JAVÍTOTT: A "Draw land mask" beállítás a Make A Graph weboldalak és a & .land =... beállítás az URLs-ben, amely egy térképet kér, most két további lehetőséget támogat:
"vázlat" csak rajzolja a terepmaszk körvonalát, politikai határok, tavak és folyók.
Az "off" nem rajzol semmit.
Lásd a [& .land =... dokumentáció](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) .
Hála John Maurernek.
         
    * JAVASOLT: Az általa létrehozott grafikák és térképek ERDDAP™ Most már három új jelölőtípust használhat: Borderless Filled Square, Borderless Filled Circle, Borderless Filled Up Triangle. Ennek kódját az ETT / EMODnet fizika Marco Alba adta hozzá. Hála Marco Albának.
         
    * ÚJ: "files" rendszer most támogatja a sima Fájltípus válaszok (CSV, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv vagy .xhtml .) például: [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv) .
Kyle Wilcox-nak köszönhetően.
         
    * JAVÍTOTT: A felhasználó adathozzáférési űrlapjának használatakor generált URL- ek (html) vagy egy Make- A- grafikont (ábra) Web page most megfelelően antide- kódolja a karakterek \\[ és \\] . Ez egy kicsit megnehezíti az emberek számára az URL-ek olvasását, de webbiztonsági szempontból jobb. Az igazgatóknak most lehetőségük van a relaxedQueryChars beállítására = ' \\[  \\]  | "a Tomcat server.xml fájlban (kevésbé biztonságos) vagy nem (biztonságosabb) .
Hála Antoine Queric-nek, Dominic Fuller-Rowell-nek és másoknak.
         
    * ÚJ: Ha egy EDDTable adatkészletre vonatkozó kérés tartalmazza az & hozzáadást Változók ahol (_ attribútum Név, attribútum Érték _) , ERDDAP™ hozzáad minden változót, amely _ attribútum Név = attribútum Érték _ a kért változók listájára.
Lásd a [& Hozzáadás Változók Ahol a dokumentáció](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere) . Köszönet Aurelie Briand, et al.
         
    * Megváltozott: ERDDAP™ most visszautasítja byte range kéréseket / fájlokat / .nc vagy .hdf fájlok. Ne próbálj kapcsolódni a távoli .nc vagy .hdf Akták, mintha helyi akták lennének. Szörnyen hatástalan, és gyakran más problémákat is okoz. Ehelyett:
        * Felhasználás(OPeN)DAPkliens szoftver csatlakozni ERDDAP s DAP szolgáltatások ehhez az adatkészlethez (amelyek / griddap / vagy tabledap / az URL-ben) . Ez az. DAP - Igen.
        * Az adatkészlet adatelérési űrlapjának használata adatkészlet kéréséhez.
        * Ha az egész fájlra szüksége van, vagy hosszú időn keresztül ismételt hozzáférésre, használja curl , wget , vagy böngésző letölteni az egész fájlt, majd hozzáférni az adatokat a helyi másolat a fájl.
             
    * JAVÍTOTT: a .odv A Txt kimeneti opció átírásra került, hogy támogassa az új verziót ODV .txt fájlok és a megfelelő ábrázolása röppálya, időmérők, és profiladatok.
         
    * JAVÍTÁS: A kettős idézőjelben megadott keresési kifejezéseket json sztringként értelmezik, így\\ kódolt karaktereik lehetnek. Többek között ez lehetővé teszi, hogy egy attribútum pontos egyezését keressék, pl. "intézmény = NOAA  \\n "nem egyezik egy adatkészlet az intézmény = NOAA   NMFS . Hála Dan Nowackinek.
         
    * JAVÍTOTT: További helyeken lebegő pontszámok (különösen a páros úszók) most megjelenhet, mint egy kicsit kerekített változata a szám további helyeken, például egy úszó korábban egy dupla, mint 32.27998779296875, most tűnhet 32.28. Kyle Wilcox-nak köszönhetően.
         
    * BUG FIX: aláíratlan egész szám audio fájlokat olvastak kissé rosszul. Most már helyesen olvassák őket.
         
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * FIGYELEM: Először futsz ERDDAP™ v2.10, a helyi adatállományokon alapuló adatkészletek betöltése **Nagyon** lassan, mert ERDDAP™ újra kell létrehoznia a fájlinformációk adatbázisát. A lassú kezdeti újratöltés után gyorsan, mint korábban. Kérlek, légy türelmes.
         
    * A következőt kell tenned:
        * Amikor először fut v2.10, néhány adatkészlet lehet, hogy nem tölt, mert ERDDAP™ most már szigorúbb néhány metaadat. Mint korábban, ERDDAP™ e-mailben a Daily Report, amikor először feltöltődik. Ez tartalmazza a hibaüzeneteket minden egyes nem betölthető adathoz. Olvassa el a hibaüzeneteket, hogy kitalálja a problémákat. A legtöbb esetben, csak meg kell, hogy egy kis változás az adatkészlet metaadatai megoldani a problémát.
             
        * In datasets.xml , keresés&lt; sourceName & gt; = (Megjegyzés: '=' jel, amely azonosítja a [rögzített érték sourceName ](/docs/server-admin/datasets#fixed-value-sourcenames) ) . A legtöbb ERDDAP™ Setups, ezek ritkák. Ha a következő értékek bármelyike '=' a húrok (nem számok) , Most kell csatolni a string dupla idézetek. Például,
Előtte:&lt; sourceName & gt; = KZ401&lt;/ sourceName &gt;
Ezután:&lt; sourceName & gt; = KZ401&lt;/ sourceName &gt;
             
        * ÚJ: Új opcionális beállítás van a setup.xml-ben,&lt;defaultAccessibleViaFiles &gt;, amely beállítja az alapértelmezett&lt;accessibleViaFiles &gt; minden adathoz. Az alapértelmezés az új címke hamis, amely utánozza az előző ERDDAP™ viselkedés. Ezt az alacsonyabb szintű beállítást egy adott adatkészlet felülbírálhatja&lt;accessibleViaFiles &gt; beállítás.
            
AJÁNLVA (mert vannak felhasználók, akik ezt akarják) :
Ha azt akarja, hogy minden EDD... FromFiles adatbázisok elérhetők a fájlrendszeren keresztül, majd
            
            1. Adja hozzá ezt a címkét a setup.xml fájljához:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Választható) Az összes
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
in datasets.xml mivel az alapértelmezés most már igaz.
                 
        * \\ _ FillValue attribútumok hozzáadása:
             ERDDAP™ az összes egész számra vonatkozó\\ _ FillValue alapértelmezett értéke: az adattípus maximális értéke (pl. 127 bájt változó esetén) . Most már nem. Annak érdekében, hogy elkerüljék ezen értékek adatértékként való feltüntetését (nem hiányzó értékek) , meg kell, hogy kifejezetten ezeket a\\ _ FillValue attribútumok. Mostantól minden alkalommal, amikor elkezded ERDDAP™ , küld az adminisztrátor egy e-mailt a .csv táblázat egy listát egész forrásváltozók, amelyek nem rendelkezik\\ _ FillValue vagy missing\\_value attribútumok és a javasolt új\\ _ FillValue attribútumok. Lásd [@ info: whatsthis Értékattribútumok](/docs/server-admin/datasets#add-_fillvalue-attributes) további információkért és utasításokért.
             
        * Ha összeállít ERDDAP™ , meg kell módosítani a classpath paraméter a javac parancssorokat, hogy adjunk egy hivatkozást ezen új üveg: lib / common-jexl.jar; lib / aws- java- sdk.jar; lib / jackson- annotations.jar; lib / jackson- core.jar; lib / jackson- admin.jar; lib / jackson- ademind.jar.
             
    * VÁLTOZOTT: Tomcat 9 most az ajánlott változata Tomcat ERDDAP . A Tomcat 8.5 + legújabb verziója is rendben van. Feltakarítottunk. ERDDAP s [A Tomcat telepítési utasításai](/docs/server-admin/deploy-install#tomcat) .
        
A legújabb verzió a Java 8 (nem Java 9, 10, 11,...) / [AdoptOpenJDK](https://adoptopenjdk.net/) továbbra is az ajánlott változata Java MELLÉKLET ERDDAP . Java 8 hosszú távú támogatás AdoptOpenJDK így továbbra is biztonságos használni, de ne feledje, hogy a legújabb verziót rendszeresen biztonsági okokból.
        
    * ÚJ: Szkript szónevek / származékos változók táblázatos adatbázisokban
EDDTableFromFiles, EDDTableFromDatabase, és EDDTableFromFileNames datasets most már tartalmazhat kifejezéseket és szkripteket a sourceName . Ez lehetővé teszi, hogy új változók alapján meglévő változók a forrás fájlokat. Egy adott új változó kiszámítása az eredmények egy sorában történik, ismételten minden sorban. Például a -180-180 ° -os tartományba eső hosszúsági változót a 0-360 ° tartományba eső változótól:
        &lt; sourceName & gt; = Math2.anglePM180 (row.columnDouble ("lon") ) &lt;/ sourceName &gt;
A részleteket lásd: [Szkript szónevek](/docs/server-admin/datasets#script-sourcenamesderived-variables)   
Hála Bob Simonsnak. (Ki tervezte ezt korábban? ERDDAP™ v1.0 és végül megtalálta a módját, hogy végrehajtsa) , Kevin O 'Brien, Roland Schweitzer, John Maurer, és az Apache JEXL könyvtár, amiért a kemény részt csinálta (és jól csinálja.) .
         
    * ÚJ: Nem aláírt egész számra vonatkozó adattípusok (ubyte, ushort, uint, ulong) Most már támogatnak. Megjegyzés: sok fájltípus (pl. .das, .dds, .nc 3) nem támogatják ezeket az új adattípusokat. Lásd a [Adatok Típusdokumentáció](/docs/server-admin/datasets#data-types) részletekért arról, hogyan ERDDAP™ foglalkozik ezekkel a különbségekkel. Különösen azóta.(OPeN)DAP, különösen a .dds válasz, nem támogatja a dedikált byte, longs, vagy ulongs, akkor érdemes használni ERDDAP az .das és .das táblázatos ábrázolása a http ... / erddap / **információ** _ datasetID _ .html weboldal (például: [ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html)  ) amit más fájltípusokba is beszerezhet .nccsv Metabolizmus válasz (például: [ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)  ) , mindkettő támogatja az összes adattípust minden helyzetben.
        
FIGYELEM: A változás által érintett adatkészletek esetében előfordulhat, hogy az adatkészlet problémákat fog látni, mert az adatok ERDDAP™ a forrástól származó adatok eltérhetnek (például a korábban aláírt egész számra vonatkozó változók most már aláíratlan egész számra értendők) . Az ebből eredő problémák közé tartozik: új fájlok nem kerülnek az adatkészletbe, és / vagy hibák, amikor megpróbálunk hozzáférni az adatokhoz. Ha egy adatkészletnek problémái vannak, az első dolog, amit megpróbálunk, hogy [kemény Lobogó](/docs/server-admin/additional-information#hard-flag) az adatkészletre. Ha ez nem oldja meg a problémát, akkor meg kell nézned a naplót. txt a hibaüzenetek megtekintéséhez datasets.xml az adatkészlet, és / vagy esetleg újra generateDatasets.xml az adatkészlet.
Köszönet a netcdf- java 5.x (amely kényszerítette a kérdést) és a következő CF 1.9.
        
    * JAVÍTOTT: Van most [jobb dokumentáció / tanácsadás](/docs/server-admin/datasets#s3-buckets) az AWS S3 vödrökben található fájlokból származó adatkészlet létrehozásához. Hála Micah Wengrennek.
         
    * MEGVÁLTOZOTT: Számos változás kapcsolódik a "files" rendszer.
        * Ezt a kódot átírták, hogy több osztály használhassa.
             
        * ÚJ: A könyvtárjegyzékek felhasználói kérései most azt kérhetik, hogy a válasz legyen az egyik standard sima asztaltípus a kívánt fájlkiterjesztés kiegészítésével: .csv, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv vagy .xhtml ). Például,
             [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)   
Hála Kyle Wilcox-nak és Shane St Savage-nek.
             
        * JAVÍTOTT: Most, generálj Adatbázisok Xml nem tartalmazza a&lt;accessibleViaFiles &gt; tag a kimeneten. A feltevés szerint az adatkészlet az új&lt;defaultAccessibleViaFiles &gt; tag in setup.xml. Lásd [hozzáférhető ViaFiles](/docs/server-admin/datasets#accessibleviafiles) .
             
        * JAVASOLT: A további adatkészlet típusok most már hozzáférhetők ViaFiles: EDDGrid SideBySide, EDDGrid AggregateExisting Dimension, EDDGrid FromErddap, EDDTableFromErddap, EDDGrid FromEDDTable, EDDTableFrom EDDGrid , és EDDGrid Frometopo. Ehhez egy adott távoli / gyermek adatkészlet fájljai csak akkor érhetők el, ha mind a szülő, mind a távoli / gyermek adatkészlet elérhető ViaFiles beállított igaz (talán via&lt;defaultAccessibleViaFiles &gt;). Hála Damian Smyth-nek és Rob Fullernek.
             
        * TY DO / AJÁNLÁS: Javasoljuk, hogy minden releváns adatkészlet a fájlrendszeren keresztül legyen elérhető beállítással&lt;defaultAccessibleViaFiles &gt; to true in setup.xml, mert van egy csoport felhasználók számára, akik számára ez a preferált módja az adatok megszerzésének. Egyéb okok mellett "files" rendszer megkönnyíti a felhasználók számára, hogy milyen fájlok állnak rendelkezésre, és amikor utoljára megváltozott, így megkönnyíti a felhasználó számára, hogy megőrizze saját másolatát a teljes adatkészlet. Ha általában nem szeretné az adatkészleteket a fájlrendszeren keresztül hozzáférhetővé tenni, állítsa be&lt;defaultAccessibleViaFiles &gt; to false. Mindkét esetben csak használja&lt;accessibleViaFiles &gt; a néhány adatkészlet, amelyek kivételek az általános politika által meghatározott&lt;defaultAccessibleViaFiles &gt; (például amikor az adatkészlet .nc ml fájlok, amelyek nem igazán hasznos a felhasználók számára) .
             
    * JAVASOLT: Most, ha a forrás adatkészlet CF rács\\ _ feltérképezési információ, generálni Adatbázisok Xml a rácsozott adatok hozzá az információt a globális&lt;addAtts &gt;, és az információk a globális&lt;sourceAtts &gt; minden egyes adat olvasható a fájlból. Az információ megjelenik az adatkészlet globális attribútumaiban, mint egy sor attribútum a prefix grid\\ _ feltérképezési\\ _.
         
    * JAVASOLT: A csoportok támogatása olvasáskor .nc 4 (és bizonyos mértékig .hdf 5) fájlok. Általában ERDDAP™ az adatkészlet a fájl egyik csoportjának változóiból készül. GenerateDatasets Xml EDDGrid FromNcFiles és EDDGrid FromNcFiles A kicsomagolás most egy "csoportot" kér. (pl. "" bármely / minden csoport "," someGroup "," someGroup / someSubGroup ", vagy" \\[ gyökér \\] "csak a root csoport) . Hála Charles Carletonnak és Jessica Hausmannek.
         
    * JAVÍTOTT: GenerateDatasets Xml EDDGrid FromNcFiles és EDDGrid FromNcFiles Kicsomagolva most támogatja egy opcionális "DimensionsCSV" paraméter, amely lehetővé teszi, hogy adja meg a forrásnevét a dimenziók, hogy szeretné ezt az adatelemet használni. Használja a "", hogy a változók, amelyek a legtöbb méretet, mint korábban. Továbbá, egy ehhez kapcsolódó kis hiba, ami az ilyen típusú fájlokkal történt, most már fix. Hála Sujal Manandharnak.
         
    * BUG FIX: GenerateDatasets Xml most megfelelően listák "EDDTableFromJsonlCSVFiles" (nem "EDDTableFromJsonlCSV") mint az EDDType egyik opciója. Hála Andy Zieglernek.
         
    * JAVÍTOTT: EDDGrid FromNcFiles Kicsomagolva most szabványosítja az "egységek" attribútumokat a standard / "kanonikus" udegységekre (ugyanaz a módszer, mint az egység konverter) . Például, "meter per second" , "meters/second" , "m.s^-1" , és "m s-1" minden "m s-1" . Hála Andy Zieglernek.
        
FIGYELEM: Lehetséges, hogy ez problémákat okoz néhány meglévő adatkészletben (például új fájlok "rossz" jelölése) . Ha igen, [kemény Lobogó](/docs/server-admin/additional-information#hard-flag) az adatkészlet, hogy az összes forrás fájlokat újra kell olvasni az új rendszer.
        
    * JAVÍTOTT: Most, egy változó&lt; sourceName &gt; megadhat egy fix értéket = NaN és a változó lehet actual\\_range a véges tartományt meghatározó attribútum. Ez néha hasznos, hogy egy adatkészlet (nevezetesen egy EDDTableFromFileName adatelem) lehet dummy változó (sz)   (pl. szélesség, hosszúság, idő) rögzített NaN értékkel, de érvényes actual\\_range   (az attribútum szerint) . Ezután az Advanced Search-ben a felhasználó megkeresheti azokat az adatkészleteket, amelyek egy adott szélességi, hosszúsági és időtartományban rendelkeznek adatokkal, és ez az adatkészlet azt mondhatja, hogy rendelkezik releváns adatokkal (Bár az összes tényleges adatsor NaN-t mutat) . Lásd a [rögzített érték dokumentációja](/docs/server-admin/datasets#fixed-value-sourcenames) .
Hála Mathew Biddle-nek.
         
    * Most, a datasets.xml egy EDDTableFromAsciiFile vagy EDDTableFromColumnaAsciiFile adatállománya tartalmazhat egy címkét, amely megmondja ERDDAP™ figyelmen kívül hagyni az összes sort a fájl tetején egészen a sor, amely megfelel a megadott reguláris kifejezés. Például,
        &lt;skipHeaderToRegex &gt;\\\*\\\*\\\*Fejének vége.\\*&lt;/ skipHeaderToRegex &gt;
figyelmen kívül hagyja az összes sort fel, és tartalmazza a sort, hogy kezdődik "\\*\\*A HEADER VÉGE ". Lásd: [&lt;skipHeaderToRegex &gt; dokumentáció] (/ docs / server- admin / datasets # skipheadertoregex) .
Hála Eli Hunternek.
         
    * Most, a datasets.xml egy EDDTableFromAsciiFile vagy EDDTableFromColumnarAsciiFilesdataset esetén lehet egy címkét, amely megmondja ERDDAP™ figyelmen kívül hagyni az összes sort a fájlban, amelyek megfelelnek a megadott reguláris kifejezés. Például,
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

kihagy minden sort, ami "#" -val kezdődik. Lásd: [&lt;skipLinesRegex &gt; dokumentáció] (/ docs / server- admin / datasets # skiplinesregex) .
Eli Hunternek köszönhetően.
         
    * ÚJ: A datasets.xml bármilyen EDDTable adatkészlet darabja most már tartalmazhat & hozzáadható Változók ahol (A nevem:) . Ha mégis, ERDDAP™ widget hozzáadása minden egyes megadott attribútumhoz Az adatkészlet adathozzáférési űrlapjának neve (html weboldal) hogy a felhasználók könnyen hozzá és hozzá Változók ahol (_ attribútum Név, attribútum Érték _) a kérelemre.
Lásd a [& Hozzáadás Változók Ahol a dokumentáció](/docs/server-admin/datasets#addvariableswhere) .
Köszönet Aurelie Briand, et al.
         
    * ÚJ Harmadik party eszköz: ERDDAP - Szín
         ERDDAP -lint egy program Rob Fuller és Adam Leadbetter az Irish Marine Institute, hogy lehet használni, hogy javítsa a metaadatok ERDDAP™ adatkészletek. ERDDAP -lint "tartalmaz szabályokat és egy egyszerű statikus webes alkalmazás futtatni néhány ellenőrző vizsgálatok ellen ERDDAP™ szerver. Minden teszt a böngészőben fut ". Mint a [Unix / Linux lint eszköz](https://en.wikipedia.org/wiki/Lint_(software) ), lehet szerkeszteni a meglévő szabályokat, vagy új szabályokat. Lásd [ ERDDAP - Szín](https://github.com/IrishMarineInstitute/erddap-lint) további információkért.
        
Ez az eszköz különösen hasznos az Ön által egy ideje létrehozott adathalmazok esetében, és most az aktuális metaadatok beállításaival szeretné a -to-date-ot. Például az GenerateDatasets korai verziói Xml nem tett semmilyen erőfeszítést a globális creator\\_name , creator\\_email , creator\\ _ type, vagy creator\\_url metaadatok. Használhatnád. ERDDAP -lint azonosítani az adatokat, amelyek hiányoznak a metaadatok attribútumok.
        
Köszönet Rob és Adam létre ezt az eszközt, és elérhetővé teszi a ERDDAP™ közösség.
        
    * Most már rendben van, ha néhány fájl egy EDDGrid A FromFiles adatok nem tartalmazzák az adatkészlet összes változóját. A fájlok lesznek benne, mintha a változók (az összes hiányzó értékkel) .
Hála Dale Robinsonnak és Doug Latornellnek.
         
    * ÚJ: Új használati statisztikák vannak a naplófájlban és a Daily Report-ban, amelyek segítenek az adminisztrátoroknak azonosítani a memóriaproblémákat okozó felhasználókat. A statisztikák neve "OutOfMemory (Array méret) "," OutOfMemory (Túl nagy) ", és" OutOfMemory (Way Too Big) ". Megmutatják az e kategóriákban kérelmet benyújtó felhasználók IP-címét és az általuk benyújtott kérelmek számát. Ha nem lennének kellemetlen kérések, ezek a statisztikák nem jelennek meg." OutOfMemory (Array méret) "és" OutOfMemory (Way Too Big) "a kérelmek általában nem jelentenek problémát, mert a kérelmek olyan nagyok voltak, ERDDAP™ Gyorsan elfogták őket, és visszaadtak egy hibaüzenetet. Az "OutOfMemory (Túl nagy) "a kérések veszélyesebbek, mert ERDDAP™ tett egy kis erőfeszítést, mielőtt rájött, hogy nem volt elég memória jelenleg elérhető kezelni a kérést (Bár a probléma lehet más kérések közvetlenül e kérések előtt) .
        
Vannak olyan új statisztikák is, "Nagy kérés, IP-cím", amelyek a nagy kéréseket benyújtó felhasználók IP-címét mutatják (jelenleg .nc fájlok &gt; 1GB) .
        
Továbbá, az idősor tábla a status.html oldalon most tartalmazza a "memFail" oszlop mutatja a kérelmek számát, hogy nem sikerült az "OutOfMemory (Túl nagy) "hibák az utolsó nagyobb terhelési adatbázis óta. A 0-n kívül bármely szám aggodalomra ad okot.
Hála Bob Simonsnak.
        
    * ÚJ: Az új változata Hyrax A könyvtárjegyzékek kijelzése eltér a korábbiaktól. ERDDAP™ Most már olvashatja a régi és új könyvtárjegyzékeket.
         
    * ÚJ: Dataset újratöltések és felhasználói válaszok, amelyek &gt; 10 másodperc a befejezésig (sikeresen vagy sikertelenül) " (&gt; 10-es&#33;) ". Így lehet keresni a log.txt fájlt erre a kifejezésre, hogy megtalálja a lassú újratölthető adatkészleteket vagy a kérések számát, amelyek lassan befejeződtek. Ezután a log.txt fájlban magasabbra nézhet, hogy lássa, mi volt az adatkészlet probléma, vagy mi volt a felhasználói kérés és ki volt az. Ezek a lassú adatkészlet terhelések és felhasználói igények néha adót ERDDAP . Így többet tudni ezekről a kérésekről segíthet azonosítani és megoldani a problémákat.
    * JAVÍTOTT: A CF DSG adatkészlet hitelesítésekor, ERDDAP™ most biztosítja, hogy a cf\\ _ role attribútumokkal rendelkező változók a megfelelő cdm\\ _...\\ _ változók listában vannak, és nincsenek más cdm\\ _...\\ _ változók listában. Például, ha a TimeseriesProfile dataset-nek van egy "station\\ _ id" változója, aminek cf\\ _ role = timeseries\\ _ id attribútuma van, akkor a "station\\ _ id" -nek a cf\\ _ timeseries\\ _ változók listájában kell lennie, de nem szerepelhet a cf\\ _ profile\\ _ változók listáján.
Hála Micah Wengrennek.
         
    * JAVASOLT: Az 'Egyszerűsítés' most gyorsabb, kevesebb memóriát használ, és visszaadhatja a LongArray-t. Köszönöm Unidata .
         
    * JAVÍTOTT: a quickRestart most jelentősen gyorsabb az EDDTableFrom (unit synonyms for matching user input) Fájlok (kivéve EDDTableFromNcCFFiles és EDDTableFromInvalidCRAFiles) mert Várt (és egy másik hely) Most csak olvassa el a minta fájl metaadatait, ahelyett, hogy elolvassa az összes adatot. Hála Jessica Austinnak.
         
    * JAVASOLT: A -milliszekundumnál nagyobb pontosságú idősztringek már támogathatók, ha a további számok mind 0-ak, pl. "2020- 05- 22T01: 02: 03.456000000Z". Hála Yibo Jiangnak.
         
    * JAVÍTOTT: GenerateDatasetsXml EDD.DestinationName használt eltávolítása '("és minden azt követően. Most eltávolítja.\\*) sourceName . Most meg eltávolítja. \\[ .\\* \\] Csak akkor, ha ez a vége a sourceName . Julien Paulnak köszönhetően.
         
    * JAVÍTOTT: GenerateDatasets Xml most teszi a változó destinationName s egyedi hozzáadásával\\ _ 2,\\ _ 3,..., ha szükséges. Julien Paulnak köszönhetően.
         
    * JAVÍTOTT: Amikor a Calendar2.parseDateTime dd, hh, vagy HH, az első "számjegy" lehet egy tér.
    * Ismerős probléma: Kezdve ERDDAP™ 2.10, .nc ml fájlok, amelyek megpróbálnak változtatni egy attribútum, ne változtassa az attribútum. Ez egy ismert hiba a netcdf- java-ban, amit jelentettem, és azt mondják, hogy rögzítik a következő kiadás a netcdf- java.
         
    * Broken Links FIX: Készítettem egy megfelelő rendszert a törött linkek tesztelésére. ERDDAP™ weboldalak, így most már nagyon kevés törött linkek (legalább minden kiadás dátuma -- új, törött linkek jönnek létre gyakran) .
         
    * BUG FIX: EDDTableFromHttpGet nem bizonyos típusú kérések. Most már nem. Hála Emmának a BODC-ban.
         
    * BUG FIX: Néhány kérés kezelése érdekében az EDDTable minden kért változóhoz készített egy ideiglenes fájlt, a változó nevével végződő fájlnévvel. Ha a változó neve is egyfajta tömörítés (pl. .Z) , ERDDAP Megpróbálná (és nem sikerül) az ideiglenes fájl dekompressziója. Most az ideiglenes fájlnevek véget érnek. Hála Mathew Biddle-nek.
         
    * BUG FIX: GenerateDatasetsXml és Calendar2.convertTO Java Időpont Formátum most sokkal kevésbé valószínű, hogy egy helytelen változás, amikor megpróbálja rögzíteni egy esetleg érvénytelen dátum idő formátum. Nevezetesen nem módosítják az automatikus javasolt dateTime formátumot. Hála Mathew Biddle-nek.
         
    * BUG FIX: Ha hiba történt a tartalom távoli URL-ből való lekérdezése közben, és ha az errorStream tartalom tömörítve van, ERDDAP™ Most megfelelően dekompresszálja a hibaüzenetet. Hála Bob Simonsnak.
         
    * BUG FIX:&lt;előfizetés ToRemoteErddappDataset &gt; nem alkalmazták, amikor a EDD... FromErddap dataset egy gyerek dataset volt. Most már igen. Hála Chris Romsosnak.
         
    * BUG FIX: GenerateDatasets Xml már nem gondolja, hogy a forrás változó név kezdve "latin" lehet szélesség. Hála Vincent Luzzonak.
         
    * BUG FIX: Most, egy OutOfMemoryError olvasás közben egy adatfájl feldolgozása közben a felhasználó kérése nem ok, hogy adjunk egy fájlt a BadFiles listát. Hála Bob Simonsnak.
         

## változat{#version-202} 
 (released 2009- 08- 21) 

*    **Új jellemzők és változások (felhasználók számára) :** 
    * ÚJ: Most már kétféleképpen kereshetjük az adatkészleteket ERDDAP c. Egy kicsit másképp működnek, különböző interfészekkel és lehetőségekkel rendelkeznek.
        
        *    [Keresés ERDDAP s.html](/SearchMultipleERDDAPs.html) Bob Simons / NOAA   NMFS   SWFSC   ERD .
        *    [ http://erddap.com ](http://erddap.com) Rob Fuller / The Marine Institute of Ireland-től.
        
Köszönet Tylar Murray-nek az eredeti kérésért.
         
    * JAVASOLT: a kérelem "files" rendszer letölteni egy fájlt, amely valójában egy távoli oldalon (pl. AWS S3) most vezet egy átirányítás, így a felhasználó ténylegesen letölti az adatokat a forrásból, ahelyett, hogy használja ERDDAP™ mint közvetítő. Andy Zieglernek és NOAA .
         
    * ÚJ: Példaként az új AWS S3-hoz kapcsolódó funkciók, és annak érdekében, hogy bárki számára könnyebb böngészni és letölteni fájlokat nyilvános AWS S3 vödrök, hoztunk létre
         [~ 110 mintaadat](https://registry.opendata.aws/) amely lehetővé teszi, hogy bárki is böngészni a tartalmát szinte az összes
         [AWS S3 Nyílt adatvödrök](https://registry.opendata.aws/) . Ha rákattint a "files" linket bármely ilyen minta adatkészletek, akkor böngészhet a könyvtár fa és a fájlokat, hogy S3 vödör. Mivel ezek az adatok működnek, ezek a listák mindig tökéletesen frissek, mert ERDDAP™ Felveszi őket a repülőre. Ha rákattint a könyvtárra, hogy egy fájl nevét, és kattintson a fájl nevét, ERDDAP™ átirányítja kérését az AWS S3-ra, így közvetlenül letöltheti a fájlt az AWS-ből. ERDDAP™ az adminisztrátorok
         [olvasási útmutató más S3 vödrökhöz](/docs/server-admin/datasets#working-with-aws-s3-files) . Andy Zieglernek és NOAA .
         
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * TEVÉKENYSÉGEK
         
    * JAVÍTOTT: ERDDAP a húrok tömbjeinek tárolására szolgáló módszer (Stringarray) most sokkal emlékezetesebb. Húrozás A tömböket végig használják. ERDDAP™ különösen a táblázatos ASCII adatfájlok olvasásakor. Egyéb változások miatt a CSV / TSV / SSV ASCII, Columnar ASCII és a jsonlCSV táblázatos adatfájlok olvasása gyorsabb és sokkal emlékezethatékonyabb. Az eredmény: egy 764 MB ASCII adatvizsgálati fájl (de 52MB-re tömörítve .gz fájl) 3,503,266 sorral és 33 oszloppal, a maximális memória használat 10GB-ról 0.6GB-re csökkent (csúcs) . Az idő, hogy elolvassa ment ~ 7 perc (de nagyban változik, hogy mennyi fizikai memória a számítógép) ~ 36 másodperc (beleértve az egyszerűsítésre szánt 10-est () amelyet csak az GenerateDatasets használ Xml) . Sok más helyen ERDDAP™ hasznára válik ez a megnövekedett memória hatékonyság. Hála Tylar Murray-nek és Mathew Biddle-nek.
        
Más megoldást kerestem. (Húrok tárolása Stringarray-ban UTF- 8- kódolt tömbök formájában) . Ez további 33% -kal csökkenti a memóriahasználatot, de 33% -os lassulás árán. A most használt rendszerhez képest ez rossz cserének tűnt. Könnyebb több memóriát adni egy számítógépnek. ($200-ért több memória vásárlása) hogy gyorsabb legyen. (vesz egy teljesen új számítógépet) .
        
Ha ez kényelmes, akkor is mindig jó ötlet, hogy ossza fel a hatalmas táblázatos adatok fájlokat több kisebb fájlokat alapján néhány kritérium, mint stationID és / vagy idő. ERDDAP™ gyakran csak meg kell nyitni az egyik kis fájlokat válaszul a felhasználó kérésére, és így képes reagálni sokkal gyorsabb.
        
    * JAVÍTOTT: Van most [ ERDDAP™ AWS S3 dokumentáció](/docs/server-admin/datasets#working-with-aws-s3-files) , amely leírja, hogyan lehet ERDDAP™ az AWS S3 vödörben lévő adatfájlokkal dolgozni.
Továbbá, ERDDAP™ Most használ új funkciók az AWS S3 Java API.
Továbbá, ERDDAP™ Most lehetővé teszi, hogy az AWS S3 URL további karaktereket tartalmazzon (menstruáció, hyphen, aláhúzás) Bakancsnevekkel.
Továbbá, ERDDAP™ most azt írja elő, hogy az AWS S3 vödör URL-jeit egy meghatározott módon azonosítsák:
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
ahol az előtag nem kötelező.
Andy Zieglernek és NOAA .
         
    * JAVÍTOTT: GenerateDatasets Xml most kezeli további gyakori missing\\_value s standins mint hiányzó értékek, és így valószínűbb, hogy átalakít egy oszlop egy numerikus adattípus. A PrimitiveArra.egyszerűsítés () most naplózza, hogy mely konkrét adatérték okozta, hogy egy adott oszlopot húroszlopként kezeljen. Hála Mathew Biddle-nek.
         
    * JAVÍTOTT:&lt;Kérjen feketelista &gt; most támogatja.\\*.\\*  (vagy:\\*:\\*az IPv6 esetében) az IP-címek végén, hogy az IP-címek nagyobb darabját, pl. 110,52-et feketelistára tehesd.\\*.\\*  (Kína Unicom Tianjin) . Lásd a [[&lt;Kérelmező feketelista &gt;] (/ docs / server- admin / datasets # applicblist) Köszönhetően a kínai unicom és a kínai Telecom.
         
    * JAVÍTOTT: Ha egy adatkészlet forrása nem határozza meg a "institution" attribútum, GenerateDatasets Xml és loadDataset most kap ez egy "creator\\ _ institution" attribútum (ha rendelkezésre áll) . Hála Micah Wengrennek.
         
    * BUG FIX: szabványosítás Amit nem mindig alkalmaztak az ASCII adatfájlokra.
Továbbá, az EDDTable nem kezelte megfelelően az időértékeket, amikor a forrás Húros időértékek és szabványosítás Amit használtak.
Hála Paloma de la Vallee-nek.
        
Nem mondtam világosan, hogy használnod kéne a szabványt. Milyen funkciók, amikor valóban szükség van rájuk (pl. amikor a különböző forrásfájlok különböző módon tárolják az időértékeket) , mert néhány kérése adatkészleteket használó szabványosítás Mi lesz feldolgozni egy kicsit lassabban.
        
    * BUG FIX: A hiba a kód által használt EDDGrid FromNcFiles okozta a hiba .nc 4 és .hdf 5 "hosszú" fájl (int64) változók. Ez már megoldódott. Hála Friedemann Wobusnak.
         
    * BUG FIX: Kis módosítások az ISO 19115 fájlok, hogy egy másik validátor boldog. Chris MacDermaid-nek és Anna Milan-nak köszönhetően.
         

## Version 2.01{#version-201} 
 (released 2009- 07- 02) 

*    **Új jellemzők és változások (felhasználók számára) :** 
    * Nincs.
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * BUG FIX: Egy hiba a kódban, amely létrehozza az adathozzáférési űrlapot tabledap adatkészletek miatt a weboldal üres néhány adatkészletek. Továbbá javítottam a váratlan hibák kezelésén minden HTML oldalon, így azok (általában) hibaüzenet megjelenítése. Hála Marco Albának.
    * JAVÍTOTT: GenerateDatasets Az Xml már nem jelent hosszú figyelmeztetést a kimenet tetején. Helyette, kérem nézze meg [Generáció szerkesztése Adatbázisok Xml kimenet](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better) . Hála Steven Baumnak.
    * JAVÍTOTT: GenerateDatasets Xml most kissé eltérő ajánlásokat különböző helyzetekben&lt;updateEveryNMillis &gt; for EDD... from... files datasets. GenerateDatasets Az Xml most elriasztja az EDDTableFromFiles adatbázisok eredeti "kivonatát".

## Version 2.00{#version-200} 
 (released 2009- 06- 26) 

*    ** ERDDAP™ V2.00 végre itt van&#33; Igen&#33;**   
     
    * Elnézést kérünk a hosszú késlekedésért, hogy befejezzük ezt a verziót.
Köszönöm a türelmét.
         
    * A jó hír az, hogy a többletidőt arra használták, hogy a felhasználók által kért funkciók közül többet is hozzáadjanak. A rossz hír az, hogy még a késéssel is nem minden kívánt funkciót adtak hozzá. Sajnáljuk, de sokkal fontosabbnak tűnt, hogy kiadjuk ezt a kiadást, mint hogy tovább halasszuk. (Örökre?) folyamatosan új funkciók hozzáadása. Megígérjük, hogy a jövőben visszatérünk a gyakoribb kiadásokhoz.
         
    * "2. verzió? Vannak nagy változások és összeegyeztethetetlenségek?"
Nagy új vonások? Igen.
Nagy összeegyeztethetetlenség vagy változások rendszergazdák vagy felhasználók számára? Nem.
V1.82-ről v2.00-ra ugrottunk:
        * részben a 10 év ünneplésére (Most 11) a ERDDAP™   (v1.00 2008- 05- 06, ami külsőleg rendkívül hasonlított v2.00) . Abban az időben ERDDAP™ legalább 12 országban egy létesítményből majdnem 100 létesítménybe került (Ausztrália, Belgium, Kanada, Franciaország, India, Írország, Olaszország, Dél-Afrika, Spanyolország, Thaiföld, Egyesült Királyság, USA) .
        * részben egy teljesen új irányba mutató jelentős kiegészítés: ERDDAP™ Most már van egy adatbeviteli rendszer, hogy menjen a meglévő adatszerver szolgáltatások (Látod? [EDDTableFromHttpGet](#eddtablefromhttpget) ) ,
        * És részben azért, mert nem volt nagy ugrás 1.82-től 2.00-ig számszerűen, így ez tűnt a megfelelő időben.
             
    * A másik jó hír, hogy most két másik csoport is hozzájárul a kódhoz. ERDDAP™   (Ebben a verzióban, és a jelek továbbra is) : Rob Fuller és Adam Leadbetter az ír Tengerészeti Intézetből, és Roland Schweitzer a PMEL-től és Weathertop Consulting. Köszönöm szépen. Igaz, hogy a saját maguk által választott projekteken dolgoznak, de ez a klasszikus nyílt forráskódú fejlesztési modell -- a csoportok hozzájárulnak a hozzáadott funkciók kódjához. Hozzáadott előny a közreműködőknek: amint befejezték az új funkciók használatát; nem kell várniuk a következő kiadásra ERDDAP . A te csoportod is hozzájárulhat&#33; Lásd a [ ERDDAP™ Programozó útmutató](/docs/contributing/programmer-guide) .
         
    * Reméljük tetszik. ERDDAP™ v2.00. Várjuk a következő 10 év ERDDAP™ fejlesztés és egyre több használat világszerte.
         
*    **Új jellemzők és változások (felhasználók számára) :**   
     
    * ÚJ: orderByMean szűrő
MELLÉKLET tabledap az adatkészletek kiszámítják a meghatározott csoportok eszközeit. Továbbá, az összes orderBy opciók most támogatják a csoportok meghatározásának egy további módját: _ numicVariable \\[ / szám \\[ időegységek \\]  \\[ : offset \\]  \\] _ pl. idő / 1 nap vagy mélység / 10: 5. Például, stationID , idő, víz Temp & orderByMean  (" stationID , idő / 1 nap ") az eredményeket stationID és idő, majd kiszámítja és visszaadja a víz Temp minden stationID minden nap. Ezek rendkívül hasznos és erőteljes új funkciók. Rob Fuller és Adam Leadbetter az írországi Tengerészeti Intézetből hozzájárultak az új kódhoz és a régi kód módosításához, majd Git-en keresztül nyújtották be. Köszönöm. Rob és Adam&#33;
         
    * ÚJ: kimeneti fájltípus táblázatos adatkészletekhez: [.adat táblázat](https://developers.google.com/chart/interactive/docs/reference#dataparam) ,
a JSON fájl formázva a Google Visualization kliens könyvtár ( Google Charts ) . A kódot Roland Schweitzer adta meg, és Git-en keresztül nyújtotta be. Köszönöm. Roland&#33;
         
    * ÚJ: kimeneti fájltípus táblázatos adatkészletekhez: [ .jsonlCSV1 ](https://jsonlines.org/examples/) ,
ami olyan, mint a meglévő .jsonlCSV opció, de oszlopnevekkel az első sorban. Hála Eugene Burgernek.
         
    * ÚJ: Ha az adminisztrátor engedélyezi, a felhasználók bejelentkezhetnek a [ORCID](https://orcid.org) számla.
Ez egy OAuth 2.0 hitelesítési rendszer, mint a Google hitelesítés. Az ORCID-t a kutatók széles körben használják arra, hogy egyedileg azonosítsák magukat. Az ORCID számlák ingyenesek, és nincsenek olyan adatvédelmi problémáik, mint a Google számláknak. Lásd ERDDAP s [Orcid hitelesítési utasítások](/docs/server-admin/additional-information#orcid) . A BCO- DMO-nak köszönhetően (Adam Shepard, Danie Kinkade stb.) .
         
    * ÚJ: Az új URL konverter az elavult URL-eket up- to-date URL-ekké alakítja át.
Lásd... / erddap / konvertálni / urls.html bármilyen ERDDAP™ telepítés, például,
         [ez a link a konverter a ERD   ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html) . Ennek hasznosnak kell lennie az adatkezelők számára. Ezt az GenerateDatasetsXml is használja. Bob Simonsnak és Sharon Mesicknek köszönhetően.
         
    * JAVASOLT: [Időátalakító](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) most már lehetőségeket konvertálni a közös sztring idő egy ISO8601 string idő, vagy konvertálni a UDUNITS - mint az időegységek egy megfelelő UDUNITS időegységek sztring. Ennek is hasznosnak kell lennie ERDDAP™ adminisztrátorok, akiknek tudniuk kell, milyen formátumot kell megadni az "egységek" attribútum string idő változók. Ezt a GenerateDatasetsXml és a standardize is használja belsőleg. Hála Bob Simonsnak.
         
    * ÚJ: A [Egységek átalakító](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) új "Szabványosítsa UDUnits" opcióval rendelkezik.
Például a "deg\\ _ C / m" és a "deces\\ _ C meters-1" egyaránt átalakul
"diploma\\ _ C m-1". Ezt a funkciót az EDDTableFromFiles standard is használja. Hála Bob Simonsnak.
         
    * ÚJ: grafikonokhoz (nem felületi grafikonok) a griddap és tabledap 'Make A Graph weboldalak, ha az x tengely nem egy időtengely, ha csak egy részhalmaza az x tengely változó tartományát látható, most már gombok felett a grafikon, hogy eltolja az X tengely baloldali vagy jobb oldali. Hála Carrie Wall Bell / a Hydrophone projekt.
         
    * ÚJ: A grafikonok esetében az X és / vagy Y tengely most már logskálát is használhat.
A felhasználók az Y Axis Scale-t a griddap és a tabledap Készíts egy grafikont honlapokat. Lásd a [.xRange és. yRange dokumentáció](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange) . Hála Carrie Wall Bell / a Hydrophone projekt.
         
    * JAVÍTOTT: ERDDAP™ most már jobban használja a különböző HTTP hibakódokat, és most visszatér a(OPeN)DAPv2.0- formázott hibaüzenet. Lásd [a részletek](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors) . Hála Antoine Queric-nek és Aurelie Briand-nek.
         
    * JAVÍTOTT: Ne használja Netcdf- java / c vagy más szoftver eszközök csatlakozni .nc vagy .hdf az általa felszolgált fájlok ERDDAP A / fájlok / rendszer, mintha helyi fájlok. ERDDAP™ Most visszautasítja ezeket a kéréseket. Szörnyen hatástalan, és gyakran más problémákat is okoz. Ehelyett:
        
        * Felhasználás(OPeN)DAPkliens szoftver csatlakozni ERDDAP s DAP az adatkészlet szolgáltatásai (amelyek / griddap / vagy tabledap / az URL-ben) . Ez az. DAP Nagyon jól csinálja.
        * Vagy használja az adatkészlet adathozzáférési űrlapját, hogy kérje az adatok egy részhalmazát.
        * Vagy, ha az egész fájlt, vagy ismételt hozzáférést hosszú idő alatt, használja curl , wget , vagy böngésző letölteni az egész fájlt, majd hozzáférni az adatokat a helyi másolat a fájl.
        
          
         
    * JAVÍTOTT: A ERDDAP™ Homepage, Full Text Search most a "Tekintse meg az összes adatbázis listáját", mivel ez a legjobb kiindulópont a legtöbb felhasználó számára. Hála Didier Mallarinónak és Maurice Libesnek.
         
    * JAVÍTOTT: A DataProviderForm3.html Már vannak közös listáink. standard\\_name c. Hála valakinek az IOOS DMAC találkozón.
         
    * JAVASOLT: A / files / web oldalakon most már van egy link az új "Mit tehetek ezekkel a fájlokkal?" menüpontra. Az a rész leírja a különböző fájltípusokat, és javaslatokat ad a velük való együttműködésre. Köszönet Maurice Libes-nek.
         
    * JAVÍTOTT: Szinte minden kérés ERDDAP™ Legalább egy kicsit gyorsabbnak kell lennie, és néha sokkal gyorsabbnak.
         
    * BUG FIX: Bizonyos körülmények között, amikor egy EDDTable adatkészlet mentett adatokat bizonyos típusú .nc files, the global "id" attribútum volt beállítva a fájl javasolt nevét, amely magában foglalja a hash, hogy ez egyedi a kérés. Most az "id" megfelelően változatlan marad. (adott esetben) vagy az adatkészlethez datasetID   (ha nincs megadva) . Hála John Maurernek.
         
*    **Dolgok ERDDAP™ Administrators need to know and do:**   
     
    * TY: Ez a kiadás eltart egy ideig és dolgozni fog. Kérjük, legyenek türelemmel, és tervezzék meg, hogy néhány óra alatt elvégzik a szükséges változtatásokat, és néhány óra múlva kísérleteznek új funkciókkal.
         
    * TY: Biztonság érdekében készíts egy másolatot az aktuális setup.xml és datasets.xml fájlok, hogy vissza tudjon térni hozzájuk abban a valószínűtlen esetben, amikor vissza kell térni ERDDAP™ v1.82. pont
         
    * TY: Az ajánlott Java AdoptOpenJDK OpenJDK 8 (LTS) + HotSpot.
Ez egy nyílt forráskódú változata a Java amelyek nem korlátozzák annak használatát (ellentétben Oracle s Java eloszlás) . Ez származik Oracle s Java egy folyamatban lévő módon, Oracle Az áldás. Biztonsági okokból fontos, hogy az Ön Java verzió up-to-date. Lásd ERDDAP s [ Java Beszerelési utasítások](/docs/server-admin/deploy-install#java) .
         
    * TY: AdoptOpenJDK Java szüksége van egy kis kiegészítése a Tomcat telepítés: lásd a [Források gyorsítótár utasítások](/docs/server-admin/deploy-install#contentxml) . Úgy gondolom, hogy ez a -XX: MaxPermSize beállítást helyettesíti, ami (Elfogadás) Az OpenJDK már nem támogatja.
         
    * TY: Az új alapértelmezés és ajánlás&lt;fondFamily &gt; setup.xml beállítás
Az AdoptOpenJDK-ba épített DejaVu Sans Java . Lásd a
         [módosított betűtípus telepítési utasítások](/docs/server-admin/deploy-install#fonts) .
         
    * TY: Sok címke mozog setup.xml datasets.xml . Az az előnye, hogy megváltoztathatod az értékeiket, miközben ERDDAP™ fut, újraindítás nélkül ERDDAP . Különösen, könnyen megváltozhatsz.&lt;startBodyHtml5 &gt; ideiglenes üzenet megjelenítéséhez ERDDAP™ kezdőlap (például, "Nézd meg az új JPL MUR SST v4.1 dataset"... vagy "This ERDDAP™ offline lesz a karbantartáshoz 2019- 05- 08T17: 00: 00 PDT - 2019- 05- 08T20: 00: 00 PDT ".) . Ha / amikor ezeket a címkéket datasets.xml , a változások hatályba lépnek a következő alkalommal ERDDAP™ olvas datasets.xml .
         
        
        1. @ info: whatsthis datasets.xml fájl (valahol a fájl elején, után&lt;erddapDatasets &gt;):
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

        2. Egy-egy, másold le az értéket (ha van) minden egyes címke a setup.xml fájlt az új címke, hogy csak pasted (felül) in datasets.xml . Például, ha 30-as értéket használt volna&lt;cachePercode &gt; in setup.xml, akkor másolja ezt az értéket az új&lt;cachePercode &gt; címke datasets.xml   (Bár ha az érték ugyanaz, mint az új alapértelmezett érték, akkor a legjobb, ha csak hagyja a címke datasets.xml üres) .
            
Ha az Ön értéke eltér az új javasolt alapértelmezett (kivéve:&lt;startBodyHtml5 &gt; és&lt;A ShortDescriptionHtml &gt;, amely hasznos testreszabásához ERDDAP™ installáció), kérjük, fontolja meg az új alapértékre való áttérést. Ez különösen igaz a&lt;részleges Rendszerkövetelmények &gt; és&lt;partialRequestMaxCells &gt;, ahol az alapértelmezett / javasolt érték jelentősen megváltozott az évek során.
            
Miután minden értéket lemásolt, törölje a címkét és annak leírását a setup.xml-ből. Jobb, ha ezek a címkék datasets.xml . És most már vannak jobb leírások [setupDatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file) .
            
        
Az új rendszer furcsasága, hogy az első weboldal, amikor elkezded ERDDAP lesz az alapértelmezett ERDDAP™ weboldalt. Minden későbbi weboldal a... Html tartalmat adja meg datasets.xml .
        
    * FIGYELEM: Először futsz ERDDAP™ v2.0, a helyi adatállományokon alapuló adatkészletek betöltése **Nagyon** lassan, mert ERDDAP™ meg kell újítani az adatbázis fájlok egy kicsit más formátumban. A lassú kezdeti újratöltés után gyorsan, mint korábban. Kérlek, légy türelmes.
         
#### EDDTableFromHttpGet{#eddtablefromhttpget} 
    *    [Nagy ÚJ FEATURE: EDDTableFromHttpGet](#eddtablefromhttpget)   
Mostanáig, ERDDAP™ csak olvassa el az adatokat, és elérhetővé tette a felhasználók számára. Nos, ERDDAP™ van egy egyszerű, hatékony rendszer fogyasztására valós idejű adatok érzékelők. Többek között ez az adatkészlet fine-grained versioning: emlékszik minden változtatás az adatkészlet, amikor készült, és aki. A felhasználók általában csak az adatkészlet legújabb változatát akarják majd, az alkalmazott változtatásokkal együtt. A felhasználók azonban bármikor kérhetnek adatokat az adatkészletből. Ez megkönnyíti a reprodukálható tudományt. Így, ellentétben a legtöbb más közel valós idejű adatkészlet, ezek az adatkészletek jogosultak [ DOI sz](https://en.wikipedia.org/wiki/Digital_object_identifier) . mert találkoznak a DOI követelmény, hogy az adatkészlet változatlan maradjon, kivéve az összesítést. Lásd [EDDTableFromHttpGet](/docs/server-admin/datasets#eddtablefromhttpget) . Hála OOI-nak. (réges-rég és most) Eugene Burger emlékezteti, hogy mi a fontos.
         
    * Nagy újonc: ERDDAP™ most már közvetlenül szolgálhat adatokat külső tömörített adatfájlokból, beleértve .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 , vagy .Z. adatbázisok tartalmazhatnak egy keveréket kívülről tömörített fájlokat (Talán a régebbi adatfájlok?) és nem külső tömörített fájlok, és akkor tömöríteni / dekompressziós fájlt bármikor.
        
Ez remekül működik&#33;
A legtöbb esetben, a lelassulás kapcsolódó dekompresszió az akták kisebb. Erősen bátorítjuk Önt, hogy próbálja ki ezt, különösen a ritkán használt adatkészletek és / vagy adatfájlok esetében.
        
Ez megspórolhat 30 ezret vagy többet&#33;
Ez a kevesek egyike. ERDDAP™ olyan funkciók, amelyek sok pénzt takaríthatnak meg -- ha sok adatfájlt tömörít, sokkal kevesebb Ridear / merevlemezre lesz szüksége az adatok tárolásához, vagy fordítva, sokkal több adatot szolgálhat fel (10x-ig) Már így is van. Ha ez a funkció megment egy másik RAID vásárlástól, akkor 30 000 dollárt spórolt meg.
        
Lásd a [Külső tömörített fájlok dokumentációja](/docs/server-admin/datasets#externally-compressed-files) . Hála Benoit Perrimondnak és Paloma de la Vallee-nek.
        
    * Nagy újonc: Valamennyi EDDGrid FromFiles and all EDDTableFromFiles datasets support a&lt;cacheFromUrl &gt; tag és a&lt;cacheSizeGB &gt; tag. Ha a cacheSizeGB nincs megadva, akkor ez letölti és fenntartja egy távoli adatkészlet teljes másolatát. Ha a cacheSizeGB van megadva, és &gt; 0, ez letölti fájlokat a távoli adatkészlet, szükség szerint, egy helyi gyorsítótár korlátozott méretű, amely hasznos, ha dolgozik felhőalapú (pl. S3) adatfájlok. Lásd a [gyorsítótár FromUrl dokumentáció](/docs/server-admin/datasets#cachefromurl) Részletekért. Köszönet Bob Simonsnak és Roy Mendelssohn-nak (akik évek óta írogatnak forgatókönyveket, hogy kezeljék a távoli adatállomány helyi másolatait) , Lloyd Cotten, Eugene Burger, Conor Delaney (amikor az Amazon Web Services-nél volt.) , és a Google Cloud Platform.
         
    * ÚJ: Az új EDDTableFromJsonlCSV osztály olvasható táblázatos adatokat
         [JSON A CSV vonalak fájljai](https://jsonlines.org/examples/)   ("Jobb, mint a CSV") . Hála az Írországi Tengerészeti Intézetben dolgozó embereknek, hogy meséltek nekem erről a formátumról, valamint Eugene Burger-nek és PMEL-nek, hogy támogatták, mint bemeneti típust.
         
    * ÚJ: minden EDDGrid és minden EDDTableFromFile adatállomány támogatja a&lt;nThreads &gt; beállítás ERDDAP™ hány szálat kell használni a kérelemre adott válasz esetén. Lásd a [nThreads dokumentáció](/docs/server-admin/datasets#nthreads) Részletekért. Köszönet Rob Bocheneknek az axiómai adattudománytól, Eugene Burger, Conor Delaney (amikor az Amazon Web Services-nél volt.) , és a Google Cloud Platform.
         
    * Új szabványosítás Mi az összes EDDTableFromFile alosztály -
Korábban, ha egy adott változó, az értékek a fontos attribútumok (például: scale\\_factor , add\\_offset , missing\\_value ,\\ _ FillValue, units) nem volt következetes, EDDTableFromFiles választana egy értéket minden attribútum, hogy "érvényes" és jelölje fájlokat más attribútum értékek "rossz fájlok". Van egy rendszer, ami szabványosítja a fájlokat, amint az EDDTableFromFiles elolvassa a fájlokat. Lásd [EDDTableFromFile szabványosítása Mi?](/docs/server-admin/datasets#standardizewhat) . Az egyik ERDDAP a fő célja, hogy az adatfájlok és adatkészletek következetesen hozzáférhetők legyenek. szabványosítás Mi egy fontos új eszköz, hogy ez valósággá váljon. Hála Marco Albának, Margaret O 'Briennek (és egyéb EML-felhasználók) , BCO- DMO, and InPort users.
         
    * ÚJ EDDTableFromInvalidCRAFiles lehetővé teszi, hogy egy adatkészlet gyűjteménye NetCDF   (v3 vagy v4)   .nc a CF DSG Ragged Array egyedi, érvénytelen, változatát használó fájlok (CRA) fájlok. Mintafájlok ehhez az adatkészlettípushoz megtalálhatók az alábbi címen: https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/   \\[ 2020- 10- 21 Ez a szerver már nem megbízható \\] . Bár ERDDAP™ támogatja ezt a fájltípust, ez egy érvénytelen fájltípus, amit senki sem kezdhet el használni. A jelenleg ezt a fájltípust használó csoportokat erősen ösztönzik az alkalmazásra ERDDAP™ érvényes CF DSG CRA fájlokat generálni és leállítani ezeket a fájlokat. Hála Ajay Krishnannek és Tim Boyernek.
         
    * EDDTableFromThreddsFiles and EDDTableFrom Hyrax Az akták tönkrementek. Kérjük, váltson az EDDTableFromNcFiles-re (vagy változat) plusz&lt;cacheFromUrl &gt;. Ha ez nem működik valamilyen oknál fogva, email erd.data at noaa.gov . Ha 2020 előtt nem érkezik panasz, ezeket az adatkészlettípusokat el lehet távolítani.
         
    * JAVÍTOTT -- A nem-ISO 8601-szer ISO 8601-re történő automatikus átalakító rendszer (bevezetés v1.82-ben) jelentős mértékben kibővült, hogy számos további formátummal foglalkozzon. Ez az GenerateDatasetsXml és ERDDAP a forrásmetaadatok kezelése.
         
    * JAVÍTOTT -- A string time parsing rendszer harmadik jelentős felülvizsgálatával (és remélhetőleg az utolsó) , ERDDAP™ már nem használható Java DateTimeFormatic miatt hibák, amelyek néha a szélsőséges időkben (évek&lt;= 0000). ERDDAP™ Most a saját rendszerét használja idősztringek feldolgozásához.
         
    * FIGYELEM: Az új String idő parsing rendszer valamivel szigorúbb. Ha az egyik adatkészlet hirtelen csak hiányzó értékeket időértékek, az ok szinte biztosan, hogy az időformátum string kissé rossz. A naplóba hibajelzéseket kell beírni. a txt olyan időértékekhez kapcsolódik, amelyek nem egyeznek az időformátummal -- ami segít megjavítani az időformátum sztringet az adathoz. Ha segítségre van szüksége, használja az opciót ERDDAP 's Time Converter which "Convert \\[ sz \\] bármely közös sztring idő az ISO 8601 sztring időben "-- azt a formátumot jelzi, amit a konverter használt a forrássztring feldolgozásához.
         
    * AJÁNLÁS: A leggyorsabb, legegyszerűbb és legolcsóbb módja a felgyorsításnak ERDDAP a táblázatos adatokhoz való hozzáférése egy Solid State Drive-on van. (SSD) . A legtöbb táblázatos adatkészlet viszonylag kicsi, így egy 1 vagy 2 TB SSD valószínűleg elegendő az összes adatfájl tárolására az összes táblázatos adatkészlethez. Az SSD-k végül elkopnak, ha adatokat írsz egy cellába, törlöd, és túl sokszor írsz új adatokat annak a sejtnek. Ehelyett azt javaslom, hogy (amennyire csak lehet.) Csak használja az SSD-t, hogy írja az adatokat egyszer, és olvassa el többször. Akkor még egy fogyasztónak is sokáig kell tartania, valószínűleg sokkal tovább, mint bármelyik Hard Disk Drive-nak. (HDD) . A fogyókúrás SSD-k most olcsók. (2018-ban ~ $200 1 TB vagy ~ $400 2 TB) és az árak még mindig gyorsan csökkennek. Mikor? ERDDAP™ Hozzáférés egy adatfájlhoz, egy SSD mindkét
        
        * rövidebb késleltetés (~ 0.1 ms, versus ~ 3 ms egy HDD, versus ~ 10 (?) M for a RAID, versus ~ 55ms for Amazon S3) , és
        * magasabb áttétel (~ 500 MB / S, versus ~ 75 MB / s a HDD versus ~ 500 MB / s a RAID) .
        
Így fel tudsz jutni egy ~ 10X teljesítménynövelésre (vs HDD) 200 dollárért&#33; Összehasonlítva a rendszer többi lehetséges változásával (Egy új szerver $10,000-ért? Egy új RAID 35 ezer dollárért? Egy új hálózati kapcsoló 5000 dollárért? stb.) Ez messze a legjobb megtérülés a beruházások terén (ROI) . Ha a szerver nincs megtöltve memóriával, további memória a szerver is egy nagy és viszonylag olcsó módja annak, hogy gyorsítsa fel az összes szempontból ERDDAP .
         \\[ Az SSD-k is jók lennének a rácsozott adatokhoz, de a legtöbb rácsozott adatkészlet sokkal nagyobb, így az SSD nagyon drága. \\]   
         
    * ÚJ: Mindenki, aki bejelentkezett kap szerepet = \\[ Bárkit In \\] , még akkor is, ha nincs&lt;felhasználó &gt; címkék datasets.xml . Ha beállítod az adatokat&lt;accessibleTo &gt; to \\[ Bárkit In \\] , akkor bárki, aki bejelentkezett ERDDAP™   (például a Gmail vagy az Orcid fiókkal) Felhatalmazást kap, hogy hozzáférjen az adatkészlethez, még akkor is, ha nem adott meg&lt;felhasználó &gt; címkék datasets.xml . Köszönet Maurice Libes-nek.
         
    * JAVASOLT: UDUNITS / UCUM egységek konverter jelentősen javult.
Az érvénytelen egységek húrjait jobban kezeli. (az információ megőrzésére helyezett hangsúllyal kezdve, az érvényesség érvényesítése helyett) . Továbbá, az eredmények most már szabványos szintaxis.
         
    * ÚJ: A UDUNITS / UCUM egységek átalakító van egy új lehetőség szabványosítani a UDUNITS Húr.
Ez jól működik érvényes UDUNITS strings és ésszerűen jól nem standard / érvénytelen UDUNITS A húrok. Például, UDUNITS = "méter per másodperc", "méter / másodperc", "m.s^-1" , és "m s-1" "M.s- 1". Erre az új szabványosításhoz volt szükség. A fent leírt rendszer. Hála Marco Albának, Margaret O 'Briennek (és egyéb EML-felhasználók) , BCO- DMO, and InPort users.
         
    * ÚJ: EDDTableFromMMultidimNcFiles most egy [Kezelés Méretek](/docs/server-admin/datasets#treatdimensionsas) opció, amely jelzi ERDDAP™ bizonyos méretek kezelése (pl. LAT és LON) mintha más dimenziók lennének. (pl. TIME) . Ez hasznos néhány hibás fájlnál, amelyek különböző dimenziókat használnak különböző változókhoz, amikor csak egy dimenziót kellett volna használniuk. (pl. TIME) . Hála Marco Albának és Maurice Libesnek.
         
    * Most mindenki EDDGrid A fájlok adatai egy új speciális tengelyt támogatnak sourceName ami elárulja ERDDAP™ a fájlnévből származó információk kinyerése (Csak filename.ext) és használja az értéket, hogy **helyettesítés** a bal oldali tengely jelenlegi értéke. A formátum:
        \\*\\*\\ * helyettesítő FromFileName, _ dataType _, _ extractRegex _, _ captureGroupNumber _
Lásd [Ez a dokumentáció](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) . Hála a NOAA Pathfinder Napi összesítési adatok.
         
    * Most mindenki EDDGrid A fájlok adatai egy új speciális tengelyt támogatnak sourceName ami elárulja ERDDAP™ a fájl pathName-jából származó információk kinyerése (könyvtárak + filename.ext)   
        \\*\\*\\ * path Name, _ dataType _, _ extractRegex _, _ captureGroupNumber _
Ehhez a menetvonal neve mindig '/' mint könyvtárelválasztó karakter, soha '\\'.
Lásd [Ez a dokumentáció](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) . Hála Paloma de la Vallee-nek.
         
    * Az összes EDDTableFrom... A fájlok adatai további pszeudo változót támogatnak sourceName s a fájl fájlnevéből származó információkat (Csak filename.ext)   (Látod? [\\*\\*\\ * fájlnév](/docs/server-admin/datasets#filename-sourcenames) ) vagy a fájl teljes pathName (/ dir1 / dir2 / filename.ext)   (Látod? [\\*\\*\\ * path Name](/docs/server-admin/datasets#pathname-sourcenames) ) . Hála Paloma de la Vallee-nek.
         
    * ÚJ: ha EDDGrid az adatkészlet egy vagy több igen nagy méretű (például értékek milliói) ami sok emléket vesz fel, akkor állítsa be az új [&lt;DimensionValuesInMemory &gt;] (/ docs / server- admin / datasets # dimensionvalisinmemory) hamis (az alapértelmezés igaz) , ami miatt az adatkészlet tárolja az értékeket a lemezen, és szükség esetén visszaszerezze azokat. Hála David Rodriguez-nek és Rich Signell-nek (: EDDGrid FromAudioFiles) .
         
    * JAVÍTÁS: Korábban, ha újra megrendelte a dataVariable s egy EDDTableFromFiles adatállományhoz és az adatállományhoz, az EDDTableFromFiles újraolvasná az összes adatállományt. Az átsorolás az összes adatfájl újraolvasása nélkül is megoldható. Hála Roland Schweitzernek.
         
    * JAVÍTOTT: Most, amikor ERDDAP™ ASCII, NCCSV és JSON Lines CSV táblázatos adatfájlokat olvas, ha hibát talál egy adott sorban (pl. a tételek helytelen száma) Ez egy figyelmeztető üzenet. ("FIGYELEM: A sor elhagyása"...) a [log.txt fájl](/docs/server-admin/additional-information#log) majd tovább olvassa az adatfájl többi részét. Ezért a te felelősséged, hogy rendszeresen nézz körül. (vagy írni egy szkriptet, hogy ezt) Az üzenet a naplóban. txt, hogy meg tudd oldani az adatfájlok problémáit. ERDDAP™ úgy van kialakítva, hogy a felhasználók továbbra is el tudják olvasni az összes érvényes adatot, annak ellenére, hogy a fájl egyes soraiban hibák vannak. Korábban... ERDDAP™ megjelölte a fájlt "rossz", és eltávolította az adatkészletből.
         
    * JAVASOLT: Pontos időpontokban (például a legközelebbi második vagy ezredfordulóra) a forrásnál tárolják "percek óta"... (vagy nagyobb egységek) , ERDDAP™ most kerekíti őket a legközelebbi milliszekundum, amikor leolvassa az értékeket ERDDAP . Ellenkező esetben a lebegő pontok száma sérült, és az adatok kérése meghatározott időpontokban (pl., & time = 2018- 06- 15T01: 30: 00) nem sikerül. Korábban a lehető legpontosabban kiszámította őket. (és még akkor is, ha az egységek például "másodpercek óta" vagy "ezredmásodperc óta"...) . A legjobb elkerülni ezt a problémát nem használ nagy egységek (pl. perc vagy óra) pontos időértékek tárolása (pl. mikroszekundum) -- a számítógépek rosszul kezelik a tizedesjegyeket. Hála Marco Albának.
         
    * VÁLTOZÁSOK EDDTableFrom felé EDDGrid ami sokkal jobbá teszi. EDDTableFrom EDDGrid lehetővé teszi a felhasználók lekérdezését, mintha táblázatos adatkészletek lennének ("Kérdés érték szerint") .
        
        * Ez most támogatja a&lt;maxAxis0 &gt; tag (alapértelmezés = 10) amely meghatározza a tengely maximális számát \\[ 0 \\]   (általában "time" ) olyan értékek, amelyek egyszerre kérdőjelezhetők meg. Ez megakadályozza a naiv kéréseket, hogy EDDTableFrom EDDGrid egy teljes gridded adatkészlet keresése (ami egy időtúllépési hiba esetén nem működne) .
        * GenerateDatasets Xml most már van egy lehetőség, hogy EDDTableFrom EDDGrid adatkészletek az adott adatállományhoz tartozó összes rácsozott adatkészlethez ERDDAP™ amely megfelel egy meghatározott regexnek (használja.\\ * az összes adatkészlethez) . Az általa létrehozott adatkészleteknek az összefoglaló attribútumban további információik vannak, amelyek szerint ez egy rácsozott adatkészlet táblázatos változata. És a datasetID a datasetID a rácsozott adatkészlet, plusz "\\ _ AsATable".
        * Van egy nagy sebesség fel a leggyakoribb beállítás: amikor a gridded adatkészlet EDDGrid FromErddap dataset that is the same ERDDAP .
        
Hála James Gallaghernek és Ed Armstrongnak.
         
    * ÚJ: generálás Adatbázisok Xml minden típusú adatkészlet most sokkal valószínűbb, hogy adjunk hozzá egy\\ _ FillValue vagy missing\\_value attribútum numerikus változóhoz addAttributes . Például ez akkor fordul elő, amikor a sztring hiányzik az értékjelzőkből (pl. ","., "?", "NA", "nd", "NaN") az adott változót a mintafájlban át kell alakítani ERDDAP az eredeti hiányzó értékek (127 bájt oszlopokban, 32767 rövid oszlopokban, 2147483647 int oszlopokban, 9223372036854775807 hosszú oszlopokban, és NaN úszó és kettős változók) . Ez is előfordul a NaN értékek úszó és dupla változók. Az "nd" -t is felvették a numerikus adatoszlopokban található közös hiányzó értékjelölők listájára, ERDDAP™ Meg kell keresnem. Hála Matt Biddle-nek a BCO- DMO-ból.
         
    * JAVÍTOTT: az ncdump opció generálása Adatbázisok Az Xml most már inkább ncdump. (de még mindig használja a netcdf- java változata ncdump) . Most kinyomtatja a lehetőségek új listáját. Most pedig... .nc ml fájlok, ez kinyomtatja az ncdump kimenetet az eredmény .nc ml fájlváltozások az alapra .nc vagy .hdf akta.
         
    * BUG FIX: Volt egy fájlkiszivárogtatás. (végül okozza ERDDAP™ lefagyasztani) bizonyos típusú kimeneti fájlok, például .geotif létrehozásakor keletkezett hiba. Azt hiszem, remélem, ez most már megoldódott. Ha még mindig problémákat lát, kérem, mondja el, milyen típusú adatkészlet (rács vagy táblázat) és a fájl típusát, amely okozza a problémát. Hála Steven Beale-nek, Lynn DeWitt-nek, Jibei Zhao-nak és másoknak.
         
    * BUG FIX: A WMS   Leaflet A demo nem teljesen / megfelelően alakította át a "mélység" tengelyt "magasságra". De igen, és a megtört legendák kérései meg vannak javítva. Is, minden tengely opciók a drop-down listák mindig emelkedő rendezett sorrendben. Hála Antoine Queric-nek és Aurelie Briand-nek.
         
    * BUG FIX: EDDTableFromFiles most helyesen támogatja a string változók korlátozásait, amelyek az adatfájlok char változóiból jöttek létre. Hála Antoine Queric-nek és Aurelie Briand-nek.
         
    * BUG FIX: Amikor egy adatkészlet elérhetetlenné válik, az adatkészlet megpróbálja értesíteni ("Ez az adat jelenleg nem elérhető".) előfizetői, jegyzett tevékenységei, rss és lonPM180 adatkészletei, amelyek rá támaszkodnak. Hála Roy Mendelssohn-nak és Bob Simons-nak.
         
    * BUG FIX: Két hiba az EDDTableCopy-hoz kapcsolódik. Hála Sam McClatchie-nek.
         
    * JAVASOLT: A sikertelen kérések száma a status.html oldalon növekszik, mert több dolog számít hibának, mint korábban.
         
    * JAVÍTOTT: ERDDAP Status.html most mutatja "Kérések (középértékek ms-ban) "az idősorozatban. Az előző részek tartalmából:
         
    * JAVÍTOTT: A jsonld kimenetben a jsonld "név" most jön a dataset "title" in ERDDAP , és a jsonld "főcím" most jön a dataset " datasetID " ERDDAP . Az előző részek tartalmából: Ez nem tűnik helyesnek, mert a normál angol használat, "név" általában egy rövid, (ideális esetben) egyedi azonosító, amely ritkán / soha nem változik (például Robert Middlename Simons) , nem egy leírás, amely nem egyedi, és amely könnyen és gyakran változik (Például, "Egy srác, aki szoftvereket ír NOAA "vs." Egy magas srác, aki szoftvereket ír NOAA ") . Jó lenne, ha a séma.org definíciója [Név](https://schema.org/name) A Dataset keretében konkrétabban fogalmaztak. A szoftverfejlesztők számára lehetővé kell tenni, hogy a termékleíráson alapuló termékleírás végrehajtását a szakértők útmutatása nélkül írhassák meg. De én a Google-t választom. (különösen Natasha Noy) , NCEI (nevezetesen John Relph) és Rob Fuller.
         
    * JAVÍTOTT: A jsonld kimenetben a négy "spatialCoverage GeoShape box" érték minLat minLon maxLat maxLon. Az előző részek tartalmából: Jó lenne, ha a séma.org definíciója [GeoShape](https://schema.org/GeoShape) Meghatározta a helyes parancsot. A szoftverfejlesztők számára lehetővé kell tenni, hogy a termékleíráson alapuló termékleírás végrehajtását a szakértők útmutatása nélkül írhassák meg. Hála Natasha Noy-nak és Rob Fullernek.

## Változat 1.82{#version-182} 
 (released 08- 01- 26) 

*    **Új jellemzők (felhasználók számára) :**   
     
    * Számos finom változások a megjelenés és érzés ERDDAP™ weboldalak.
        * JAVÍTOTT: ERDDAP™ most HTML 5-öt használ, és jobban használja a CSS-t.
        * JAVASOLT: A weboldalakat kissé módosították, hogy tisztábbak és kevésbé "elfoglaltak" legyenek. (Még mindig sűrű, és még mindig vannak dolgok, amikről panaszkodhatunk, de remélhetőleg sokkal kevésbé, mint korábban.) Köszönet John Kerfootnak néhány megjegyzésért.
        * JAVASOLT: A weboldalak most már sokkal jobban néznek ki a mobiltelefonok és más kis eszközök, különösen, ha használja őket tájképi orientáció. Ők is jobban néz ki nagyon kicsi és nagyon nagy ablakok asztali böngészők.
        * JAVASOLT: A biztonság és más okok javítása érdekében, egy elavult Openlayers verzió használata WMS A bemutató oldalak helyébe a következő szöveg lép: Leaflet .
        * ÚJ: a kép-, hang- és videofájlok előnézetének támogatása "files" rendszer (például: [Ez a vizsgálati adatkészlet](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/) ) és .htmlTable válasz, ha egy sejt kép-, hang- vagy videofájl URL-jével rendelkezik (például: [a kérelem](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22) ) . Ha egy '?' ikon fölött lebeg, akkor egy képet, audiót vagy videó fájl előnézetet kell látnia. A fájllinkre kattintva megtekintheti a teljes képernyőt a böngészőben. Lásd a [Médiafájlok dokumentációja](/docs/server-admin/datasets#media-files) . Vegye figyelembe, hogy a különböző böngészők különböző fájltípusokat támogatnak, így előfordulhat, hogy a példák nem működnek a böngészőben.
Köszönet ezeknek az embereknek / linkeknek az ötletekért és a CSS- csak képtippek mintakódjáért (volt https://codepen.io/electricalbah/pen/eJRLVd ) és késleltetett képbetöltés (volt https://varvy.com/pagespeed/defer-images.html )   (Bár a kódot a használat előtt módosították ERDDAP ) .
Köszönet Cara Wilsonnak, Matthew Austinnak és Adam Shepherdnek / BCO- DMO-nak a képtámogatásért.
Hála Jim Potemrának, Rich Signellnek, OOI-nak és Carrie Wall Bellnek az audió / hidrofon fájl támogatás iránti kérésekért.
Hála az OOI-nak, hogy megmutatta, szükség van videóra.
        * ÚJ: Az adatok bármely részhalmaza ERDDAP™ dataset (de általában egy adatkészlet audio fájlokból) most menthető egy .wav audio fájlban. ( [dokumentáció](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav) ) Hála Jim Potemrának, Rich Signellnek, OOI-nak és Carrie Wall Bellnek az audió / hidrofon fájl támogatás iránti kérésekért.
        * JAVÍTOTT: A formátum a webes elérhetõ mappák (WAF)   (pl. a / fájlok / mappák) frissítve van HTML tábla használatához. Az új formátum az Apache újabb verziói által létrehozott weboldalak listázásának újabb verzióját utánozza. Az emberek rá fognak jönni, hogy a változások megkönnyítik az információ olvasását. Szoftver, amely ezeket a dokumentumokat tartalmazza (például az ISO 19115 dokumentumok gyűjtésére szolgáló szoftver ERDDAP ) felül kell vizsgálni, de az új formátumot könnyebb feldolgozni, mint az előző formátumot. (Figyelem, Anna Milan.) 
        * ÚJ outOfDateDatasets.html oldal. ( [példa](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) ) Ezen a weboldalon látható egy táblázat az összes közel-real-time adatok, amelyek&lt; testOutOfDate &gt; címke (lásd alább) , rangsorolva, hogy az adatok mennyire elavultak. Ez a műszerfal hasznos lehet ERDDAP™ adminisztrátorok és végfelhasználók, ha tudni akarják, hogy mely adatkészletek elavultak. A dátumon kívüli adatok esetében feltehetően probléma van az adatforrással, így ERDDAP™ nem képes adatokat látni / beszerezni újabb időpontokból.
Administrators: Ha nem akar Out- Of- Date Datasets weboldalt, ezt adja hozzá a setup.xml:
            &lt;OfDateDatasetActive &gt; hamis&lt;/ OfDateDatasetActive &gt;
Most már vannak. testOutOfDate és ki OfDate oszlopok a allDatasets Dataset.
Köszönet Bob Simons-nak, aki évek óta ezt akarta, és az Írország Tengerészeti Intézetének okos embereinek, akik a Raspberry Pi-n és a monitoron keresztül ihletet adtak, ami mindig egy ilyen képernyőt mutat az irodájukban.
        * JAVÍTOTT: .htmlTable és .xhtml a válasz most már jobban formázott, kompakt, és így gyorsabb. Hála a HTML5-nek és a CSS-nek.
    * Új kimeneti fájltípus a griddap adatállományokhoz: .timeGaps. A táblázat a középértéknél nagyobb időértékek hiányosságait mutatja. ( [példa](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps) ) Ez hasznos ERDDAP™ rendszergazdák és végfelhasználók, ha azt szeretnék tudni, hogy vannak-e váratlan hiányosságok az idő értékek egy adatkészlet, amely várhatóan rendszeresen osztott idő értékek. Köszönet Bob Simons-nak és Roy Mendelssohn-nak, akinek szüksége volt erre a funkcióra.
    * JAVASOLT: Az alapértelmezett grafikon a allDatasets dataset most egy térkép x = maxLon és y = maxLat. Hála John Kerfootnak, Rich Signell-nek és OOL-CI-nak.
    * ÚJ: [erddapy](https://github.com/ioos/erddapy) -- nem egy ERDDAP™ funkció, de lesz érdekes sok ERDDAP™ felhasználók. Erddapy ( ERDDAP™ + Python ) a Python könyvtár által létrehozott Filipe Fernandes, hogy "kihasználja a ERDDAP s RESTful web szolgáltatások és létrehozza a ERDDAP™ URL bármilyen kérés, mint a keresés adatkészletek, metaadatok megszerzése, letöltés, stb ". Hála Filipe Fernandesnek.
    * Már korábban is említenem kellett volna: Van egy harmadik fél R csomag célja, hogy könnyebb dolgozni ERDDAP™ R-en belülről: [regddap](https://github.com/ropensci/rerddap#rerddap) . Köszönöm [rOpenSci](https://ropensci.org/) és Roy Mendelssohn.
         
*    **Dolgok ERDDAP™ Administrators need to know and do:**   
     
    * TY: Setup.xml-ben, közvetlenül alatta&lt;Administration Institute &gt;, please add a&lt;AdministrationUrl &gt; tag, amely meghatározza az Ön intézményének URL-jét (vagy csoport) .
    * TY: Ez a 3 címke setup.xml már nem használható:
        &lt;start HeadHtml &gt;&lt;startBodyHtml &gt; és&lt;endBodyHtml &gt;. Ezek helyébe a következő szöveg lép:
        &lt;startHeadHtml5 &gt;,&lt;startBodyHtml5 &gt; és&lt;endBodyHtml5 &gt;, amelynek alapértelmezett értékei az üzenetekben.xml (és az alábbiakban látható) .
        
Javasoljuk az alapértelmezett&lt;startHeadHtml5 &gt; és&lt;endBodyHtml5 &gt;.
Javasoljuk: Ha változtatott az eredeti&lt;startBodyHtml &gt; és / vagy szeretné testreszabni a ERDDAP™ Most, kérem másolja le az új&lt;startBodyHtml5 &gt; tag (alulról) a setup.xml és módosítsa, hogy testre ERDDAP™ hogy ERDDAP a weboldalak tükrözik a szervezet, nem NOAA   ERD . Nevezetesen, kérjük, hogy a "által hozott" a szervezet (sz) . Ha segítségre van szüksége, kérjük, küldje el e-mailben erd.data at noaa.gov . (Ha nem akarja testre szabni a ERDDAP™ Most használd az alapértelmezett&lt;startBodyHtml5 &gt;.)
        
Ezután törölje a setup.xml-ben található 3 régi címkét, amelyeket már nem használnak.

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

Vannak további lehetőségek is. [testre szabva ERDDAP™ ](/docs/server-admin/deploy-install#customize) így ERDDAP a weboldalak tükrözik a szervezet helyett NOAA   ERD .
        
    * TY: A&lt; EDDGrid ... Példa & gt; címkék (kezdve&lt; EDDGrid Idext & gt;) és a&lt;EDDTable... Példa & gt; címkék (kezdve&lt;EDDTableIdExample & gt;) a setup.xml fájlban a griddap és tabledap dokumentáció. html weboldalak a ERDDAP .
        
Ha nem testesítette meg azokat a címkéket, kérjük, törölje őket a setup.xml fájlból. Most mindegyiknek vannak alapértelmezett üzenetei.xml, amely utal adatkészletek Bob ERDDAP™ a https://coastwatch.pfeg.noaa.gov/erddap/index.html . Tehát már nincs szükség speciális adatkészletekre ERDDAP . Ha felül szeretné írni az alapértelmezést, másolja le ezeket a címkéket a setup.xml-be, és változtassa meg az értékeket.
Ha azt szeretné, hogy a példák az Ön ERDDAP™ , a legegyszerűbb módszer:
        
        1. Ez a két adatkészlet a ERDDAP™ a datasets.xml :
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Adja hozzá ezt a címkét a setup.xml-hez, de váltsa az URL-t a ERDDAP s ( https ?) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Ha ön testre szabja ezeket a címkék, hagyja őket, és kérjük, adja hozzá ezeket a 2 új címkék a setup.xml, hogy adja meg a ERDDAP™ URL ezekre az adathalmazokra, de változtassa meg az URL-t ERDDAP s ( https ?) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * TILOS: ERDDAP™ Most egy erddap2.css nevű css fájlt használ. Ha változtatott a \\[ Nincs magyar neve \\] / Webaps / erddap / images / erddap.css, fontolja meg az erddap2.css-hoz hasonló változtatásokat (ugyanabban a könyvtárban) .
    * ÚJ: ERDDAP a weboldalak most már nagy számú szinte láthatatlan belső linkek (a szöveg fekete, és nem hangsúlyozza) . Ha ezen a linken lebegsz (általában az első néhány szót a címek és bekezdések) A kurzorból kéz lesz. Ha rákattint a linkre, az URL a belső link a dokumentum adott részére. Ez megkönnyíti a dokumentáció egyes szakaszaira történő hivatkozást. Hála Bob Simonsnak, aki évek óta ezt akarja.
    * ÚJ: ERDDAP™ Most támogatja [Byte Range / Accept- Ranges](https://en.wikipedia.org/wiki/Byte_serving) a / files / files részek kérése. Erre azért volt szükség, hogy a böngészők audió és videó nézőit támogassuk.
    * TY: Most, hogy javítsa a biztonságot, ha meg&lt;baseHttpsUrl &gt; in setup.xml (és így támogatás https ) , az ajánlott lobogó Url https URL egy biztonságosabb zászlóval. Ha igen, minden korábbi flagUrls / flagKeys érvénytelen lesz. Adagolás: Ha ezek a változások vonatkoznak az Ön ERDDAP™ és ha ERDDAP™ van EDDGrid FromErddap és EDDTable FromErddap 's that subsize to remote ERDDAP S, akkor, miután frissíteni ERDDAP , a ERDDAP™ automatikusan megpróbál feliratkozni az új flagUrl, így törölni kell a régi előfizetéseket, és érvényesíteni az új előfizetéseket, amikor megkapja az új előfizetési validálás e-maileket.
    * TY: Ha ERDDAP™ van EDDGrid FromErddap adatkészletek az erdVH3 adatkészletekhez Bob parti őrségén ERDDAP™ , Kérjük, módosítsa őket, hogy hivatkozzanak az új erdVH2018 adatkészletekre.
    * TY: Ha a jplAquariusSSS minta-adatkészleteit is tartalmazza ERDDAP™ , kérjük, változtassa meg a "V4" a datasetID A V5-re.
    * TILOS: actual\\_range CF standard attribútum (CF- 1.7) és egyértelműen azt mondja, hogy ha a változó használja add\\_offset és / vagy scale\\_factor az adatértékek, majd a actual\\_range az értékeknek a csomagolatlan adattípust kell használniuk, és azokat ki kell csomagolniuk. Sajnos ez ellentétes az előző tanácsunkkal. GenerateDatasets Xml most csomagolva actual\\_range értékek, de ez nem rögzíti a meglévő adatok a datasets.xml akta.
        
Tehát, kérjük, ellenőrizze adatkészleteit: ha egy változó értékei be vannak csomagolva, és actual\\_range a megadott adatértékek, kérjük, adja meg a&lt; addAttributes &gt; actual\\_range a csomagolatlan értékek megadásához szükséges érték. Ellenkező esetben az adatkészlet nem kerül be ERDDAP . Egy egyszerű és majdnem tökéletes módja ennek, hogy a keresés datasets.xml forrás Attribútumok, amelyek
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
és scale\\_factor az 1.0-tól eltérő. Azok... actual\\_range Olyan tulajdonságokat, amiket talán meg kell javítanod.
        
A tengelyváltozók: EDDGrid adatkészletek, ERDDAP™ mindig beállítja a actual\\_range attribútum, hogy a tényleges tartománya az értékek, mivel ismeri ezeket az értékeket.
        
A tengelyváltozók csökkenő értékekkel (például néhány szélességi változó) , ERDDAP™ Létrehozva actual\\_range a \\[ 0 \\] ... \\[ utolsó \\] értékek, amik magasak voltak... alacsonyak. Most mindig alacsony... magas értékeket használ az új CF definícióhoz.
        
A actual\\_range az EDDTable adatkészletei esetében az értékek különösen fontosak, mert ERDDAP™ gyorsan elutasítja a felhasználók kéréseit olyan adatértékek iránt, amelyek kisebbek, mint a actual\\_range minimális érték vagy amely nagyobb, mint a actual\\_range maximális érték.
        
Kapcsolódó: a tényleges\\ _ min, tényleges\\ _ max, data\\_min és data\\_max Az attribútumok most romlottak. Kérjük, alakítsa át a datasets használni actual\\_range Inkább.
        
    * TILOS (választható, de ajánlott) : Minden közel-real-time és előrejelzés adatkészlet az Ön ERDDAP™ , kérjük, adja hozzá a [&lt; testOutOfDate &gt;] (/ docs / server- admin / datasets # testoutofdate) címkék, amelyek értéke a forma now- _ NU _, például, now- 2 nap. Ha az adatkészlet maximális időértéke ennél az értéknél régebbi, akkor az adatkészlet elavultnak tekintendő, és a [ outOfDateDatasets.html ](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) weboldalt. Ez könnyen belátható, ha valami baj van egy adatkészlet forrásával.
    *    [ÚJ: Az adatkészletek szemantikai jelölése json- ld-vel (JSON Kapcsolt adatok) ](/docs/server-admin/additional-information#json-ld)   
         ERDDAP™ most használja [json- ld (JSON Kapcsolt adatok) ](https://json-ld.org) hogy az adatok katalógus és adatkészletek része legyen a [szemantikai web](https://en.wikipedia.org/wiki/Semantic_Web) , ami Tim Berners-Lee ötlete, hogy a web tartalmat olvashatóbbá és érthetőbbé tegyük. Kereső motorok ( [Különösen a Google](https://developers.google.com/search/docs/data-types/datasets) ) és más szemantikai eszközök is felhasználhatják ezt a strukturált felárat a felfedezés és indexálás megkönnyítése érdekében. A json- ld strukturált markup láthatatlannak tűnik.&lt;script &gt; kód http://.../erddap/info/index.html weboldal (ami egy szemantikai háló [Adatkatalógus](https://schema.org/DataCatalog) ) és mindegyiken http://.../erddap/info/_datasetID_/index.html weboldal (ami egy szemantikai háló [Dataset](https://schema.org/Dataset) ) . (Külön köszönet Adam Leadbetter-nek és Rob Fuller-nek az írországi Tengerészeti Intézetből, amiért elvégezték a munka nehéz részeit, hogy ezt a részt ERDDAP .) 
    * ÚJ: Vannak új adatkészlet típusok, amelyek képesek adatokat olvasni audio fájlokból:
         [ EDDGrid FromAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles) , amely az audio adatokat rácsozott adatként kezeli.
         [EDDTableFromAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles) , amely az audió adatokat táblázatos adatként kezeli. Hála Jim Potemrának, Rich Signellnek, OOI-nak és Carrie Wall Bellnek az audió / hidrofon fájl támogatás iránti kérésekért.
    * Az GenerateDatasets módosítása Xml (és a kapcsolódó változások) :
        * ÚJ: ERDDAP™ Most már egy rendszer automatikusan [update out- of- date URLs](/docs/server-admin/additional-information#out-of-date-urls) mindkettő az GenerateDatasets-ben Xml és az adatkészletek betöltésekor. Ha további URL-ekre vonatkozó javaslatai vannak, amelyeket el kell fogni és frissíteni kell, vagy ha úgy gondolja, hogy ezt szolgáltatássá kell alakítani (Mint a konverterek.) , kérem email erd.data at noaa.gov .
        * Új: Most, ha GenerateDatasets Xml lát egy CF standard\\_name   (amelyek mind alacsonyak) nagybetűs karakterrel, az összes kisbetűs változatot hozzáadja&lt; addAttributes &gt;. Ha egy adatkészlet betöltődik, ERDDAP™ CF standard\\_name egy nagybetűs karakter, ez csendben megváltoztatja a standard\\_name . Hála Rich Signell-nek.
        * Új: Most, ha GenerateDatasets Xml lát egy attribútum, hogy az idő, hogy nem ISO 8601 formátumban, ez hozzáadja az ISO 8601 formázott idő&lt; addAttributes &gt;. Ha ERDDAP™ nem ismeri fel a formátumot, az időérték változatlan marad. Ha látsz egy formátumot, ERDDAP™ nem ismeri fel és javít, kérjük, e-mailben erd.data at noaa.gov .
        * JAVÍTOTT: Az alacsony szintű kód a EDDGrid FromThredek Katalógus opció az GenerateDatasets-ben Xml most a Unidata netcdf- java katalógus crawler kód (Három. katalógus osztályok) hogy kezelni tudja az összes THREDDS katalógust (ami meglepően bonyolult lehet) . Köszönet Roland Schweitzer, hogy javasolta ezt a változást, és köszönhetően Unidata a kódhoz.
        * ÚJ: GenerateDatasets Xml EDDGrid FromDap most hozzáteszi, "startYear -EndYear" a cím végén alapuló tényleges időtengely értékek. Végév = "jelen", ha az adatok az elmúlt 150 napban léteznek.
        * ÚJ: GenerateDatasets Xml EDDGrid FromDap most hozzáteszi: " \\[ szanálás \\] ° "a címre, ha az adatkészlet egyenletesen osztott, és a lat és lon esetében azonos.
        * JAVASOLT: Az időkonverter most már további funkciókkal rendelkezik, nevezetesen azzal a képességgel, hogy a string times-t sokféle közös formátumban átalakítsa ISO 8601 sztringekre vagy UDUNitS kompatibilis számra. Minden korábban támogatott funkció változatlan marad.
        * BUG FIX: GenerateDatasets Xml és a kulcsszavak konverter most tartalmazza "Föld tudomány &gt;" elején GCMD Science Kulcsszavak. Amikor egy adatkészlet be van töltve ERDDAP™ , ERDDAP™ Most javít minden GCMD kulcsszavak a kulcsszavak attribútum, hogy nem kezdődik a "Föld tudomány &gt;" vagy amely használ semmi mást, mint a cím esetében (ahol minden szó első betűjét tőkésítik) .
        * JAVASOLT: Amikor javasoljuk&lt; destinationName &gt; 's, GenerateDatasets Xml EDDTableFromAsciiFiles csak a farok vége sourceName és '/'   (néhány filename- szerű) . Most az egész sourceName (pl. "blahblahblah (m / s)". Ez a változás jó lesz néhány adatkészletnek, és nem másoknak, de biztonságosabb viselkedés. Köszönet Maurice Libes-nek.
        * BUG FIX: GenerateDatasets Xml és a dataset konstruktorok most biztosítja, hogy nincs másolat oszlop nevek. Köszönet Maurice Libes-nek.
        * BUG FIX: GenerateDatasets Xml az EDDTableFromAsciiFiles nem írt&lt;ColumnSeparator &gt; a kimenet. Most már igen. Köszönet Maurice Libes-nek.
    * ÚJ: A DasDds eszköz most kinyomtatja az időhézag adatait (a [.timeGaps információk](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps) ) ha az adatkészlet rácsozott adatkészlet.
    * ÚJ: Advanced Search most elfogadja a "now _\\ -nUnits _" időértékeket. Hála Rich Signell-nek.
    * JAVASOLT: A biztonság javítása érdekében, ha egy adatkészlet metaadataiban vagy adataiban szereplő e-mail cím egy html weboldalra van írva, a "@" helyébe az "at" lép. Ez csak olyan e-mail címeket fog, amelyek a teljes metaadatok vagy adatérték, nem pedig hosszabb értékekbe ágyazott e-mail címeket.
    * JAVASOLT: A biztonság növelése érdekében RSS a magánadatbázisokra vonatkozó információk már csak a felhasználók rendelkezésére állnak (és RSS olvasó) akik bejelentkeztek, és felhatalmazták őket, hogy használják az adatokat.
    * Most, amikor egy adatkészlet betöltése, ha date\\_created , date\\_issued , date\\_modified , vagy dátum\\ _ metaadatok\\ _ módosított attribútum van egy időérték nem ISO 8601 formátumban, ERDDAP™ az ISO 8601 szabvány szerinti formázott időre változtatja. Ha ERDDAP™ nem ismeri fel a formátumot, az időérték változatlan marad. Ha látsz egy formátumot, ERDDAP™ nem ismeri fel és javít, kérjük, e-mailben erd.data at noaa.gov .
    * JAVÍTOTT: .dods válaszok EDDGrid az adatkészleteknek most jelentősen gyorsabbnak kell lenniük. Hála Rich Signell-nek.
    * Változások ERDDAP ISO 19115 dokumentumok létrehozása:
        * BUG FIX: az ISO 19115 dokumentumok létrehozásakor, dataVariable Az egységek nem HTML attribútum kódolva és százalékban kódolva voltak. Most már igen. Hála az NGDC ISO 19115 validátorának.
        * BUG FIX: az ISO 19115 dokumentumok létrehozásakor, date\\_created Úgy használták, ahogy van, olyan gyakran volt rossz formátum. Most az ISO 8601 Z sztring lesz. Hála az NGDC ISO 19115 validátorának.
        * BUG FIX: az ISO 19115 dokumentumok létrehozásakor, ERDDAP™ most hosszabb írások dátumok év = 0000 (a klimatológiai adatkészletekhez hasonlóan) , mert az ISO 19115 séma nem engedélyezi dátumok év = 0000. Hála az NGDC ISO 19115 validátorának.
    * ÚJ: Mint a kérés előtt http ... / erddap / verzió visszatér csak a verziószámot (szövegként) például ", ERDDAP \\ _ version = 1.82 ".
Nos, egy kérés, hogy http ... / erddap / version\\ _ string visszaad egy számot és egy opcionális utótagot a '\\ _' plusz ASCII szövegből (nincs szóköz vagy vezérlőkarakter) például ", ERDDAP \\ _ version\\ _ string = 1.82\\ _ JohnsFork ". Az emberek a villa határozza meg ezt megváltoztatásával EDStatic.erddapVersion. Ez a módszer nem okoz problémát a korábbi verziók ERDDAP . Axiomnak köszönhetően (nevezetesen Kyle Wilcox) és Írország Tengerészeti Intézete (nevezetesen Rob Fuller) .
    * BUG FIX: A wms verzió = 1.3.0, kérés = GetMap , cs = EPSG: 4326 (Nem CRS: 84) kérések: a bbox order legyen minLat, minLon, maxLat, maxLon. CRS esetében: 84 kérelem, mint korábban, bbox order legyen minLon, minLat, maxLon, maxLat. Ez javíthatja a ERDDAP s WMS 1.3.0 szolgáltatás ArcGIS   (Köszönet Paola Arce-nak) . Köszönöm. (nem) - OGC hogy ilyen bonyolulttá tette. Köszönöm Leaflet hogy helyesen kezeljem ezt, és hogy lehetőséget adjak a tesztelésre.
    * JAVÍTOTT: Előző, a javasolt link RSS és e-mail előfizetések a http URL az Ön számára ERDDAP . Most már... https URL, ha ez aktív.
    * ÚJ: EDDGrid A másolás most egy opcionális címkét támogat&lt;Csak mióta &gt; _ someValue _&lt;/ csak mióta &gt;, ahol az érték egy meghatározott ISO- 8601 formázott idő vagy now- units (unit) (például: now- 2 év) idő. Lásd a [Csak Dokumentáció óta](/docs/server-admin/datasets#onlysince) . Drew P. -nek köszönhetően
    * JAVÍTOTT: Ha rendelkezésre áll, ERDDAP™ meg fogja mutatni a https URL (&lt;baseHttpsUrl &gt;, ha van) helyett a http URL, ha azt mondja a felhasználóknak, hogy az URL-t hozzáadják / validálják / eltávolítják / listázzák az előfizetést.
    * BUG FIX: ERDDAP™ Most lehetővé teszi, hogy az előfizetés kezdődik " https://" . (Bob felpofozza a homlokát.) Jennifer Sevadjian-nek köszönhetően.
    * BUG FIX: .jsonlKVP most használja ':' között minden kulcs és érték, ahelyett, hogy '=' . (Bob felpofozza a homlokát.) Alexander Barth-nak köszönhetően.
    * BUG FIX: Az előző részek tartalmából... ERDDAP™ a quickRestart = true, és ha, mielőtt az adatkészlet újra lett volna töltve normál, akkor tett egy hívást egy EDDTableFromFiles adatsor, amely frissítette EveryEveryNMillis, és ha egy adatfájl csak most változott volna, a kérés sikertelen lenne egy null pointer hiba. Most a kérés sikeres lesz. Hála John Kerfootnak.
    * ÚJ: Ha egy adatkészlet be van töltve ERDDAP™ , a kulcsszavak most átrendezett sorrendben, és minden új sor karakterek eltávolítva.
    * Ha egy .geoJson, .json vagy .nc OJson kérése .json p paraméter, a válasz mime típus alkalmazás / javascript. Megjegyzés: .json p nem támogatott .jsonlCSV vagy .jsonlKVP Mivel nem működött. Hála Rob Fullernek.
    * JAVÍTOTT: A json vonalak mime típusa fájltípus opciók most "alkalmazás / x- jsonlines". Ez egy jelentkezési lap volt. Jelenleg nincs végleges helyes választás.
    * JAVASOLT: A nem sikerült kérések száma a status.html oldalon növekedni fog, mert több dolog számít hibának, mint korábban, például a ClientAbortException.
    * JAVÍTOTT: Most, ha a válasz ERDDAP™ nem tömörített, akkor a fejléc a válasz tartalmazza "Content- Encoding" = "identitás".
    * JAVÍTOTT: A "licence" attribútum nem volt szükséges. Ha nincs megadva, a standard licenc az üzenetekből.xml (vagy setup.xml-ből, ha van) alapértelmezésként használják.
    * ÚJ: Van most egy opcionális [fileAccessSuffix attribútum](/docs/server-admin/datasets#fileaccessbaseurl) . amely használható a meglévő [fileAccessBaseUrl attribútum](/docs/server-admin/datasets#fileaccessbaseurl) .
    * JAVASOLT: A biztonság növelése érdekében ezt a verziót a legfrissebb Java JDK v8u162.
    * ÚJ: A biztonság növelése érdekében több közös terület nyújt ideiglenes e-mail címeket (pl. @ mailinator.com) most már egy állandó e-mail feketelista az előfizetési rendszer.
    * ÚJ: A biztonság növelése érdekében a napi jelentés a következőket tartalmazza:
SetDataset Az IP-cím nem sikerült (az utolsó napi jelentés óta)   
SetDataset Az IP-cím nem sikerült (indítás óta)   
SetDataset A zászló IP címe befejeződött (az utolsó napi jelentés óta)   
SetDataset A zászló IP címe befejeződött (indítás óta)   
A "nem sikerült" szavak megmutatják, hogy ki (Egy hacker?) próbálja beállítani a zászlót, de nem sikerül.
    * JAVÍTOTT: A biztonság növelése érdekében e-mail címek a&lt;előfizetésEmailBlacklist &gt; az Ön datasets.xml most már esetlennek tekintik.
         

## változat{#version-180} 
 (kiadás dátuma: 2017- 08- 04) 

*    **Új jellemzők (felhasználók számára) :**   
     
    * ÚJ orderByCount  () szűrővel megadhatja, hogyan kerül sor az eredménytábla válogatására (vagy nem) és csak egy sort ad vissza minden fajta csoport, a szám a nem-missing- értékek minden változó.
Például, orderByCount  (" stationID ") Elrendeződik stationID és minden egyes sorban egy-egy sort vissza stationID , az egyes változókhoz tartozó nem-hiányértékek számával.
Ha csak megadod orderByCount  ("") , a válasz lesz csak egy sor a száma nem-hiány- értékek minden adat változó.
Lásd a [ orderBy ... dokumentáció](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy) Hála Ben Adamsnek.
    * ÚJ .nc oJson fájl Típusopció rácsozott és táblázatos adatkészletekhez. Ez az opció NCO lvl = 2 "pedantikus" JSON fájl az összes információt általában megtalálható a .nc akta. Lásd [ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json) Hála Charlie Zendernek.
    * BUG FIX: A orderBy ... () opciók a Make A Graph weboldalon most megfelelően kezelik.
    * BUG FIX: .geoJson output most nem nyomtat sorokat, ahol a lat vagy lon értékek hiányoznak. Magassági értékek (ha rendelkezésre áll) már szerepelnek a koordinátákban, nem adatértékként. Hála Jonathan Wilkinsnek.
         
*    **Dolgok ERDDAP™ Administrators need to know and do:**   
     
    * BIZTONSÁGI KÉRDÉS: A provincis.js könyvtár használt a OpenLayers demo a WMS oldal ERDDAP™ van -off-date, és van egy hiba, amely lehetővé teszi, hogy visszaélnek vele. (Sajnos a frissítés OpenLayers és protokollok. Js nem könnyű.) Ez felveti annak lehetőségét, hogy a könyvtárat úgy állítsák fel, hogy lehetővé váljon a kereszteződés. Azonban, mivel ERDDAP™ kizárólag: felhasználások OpenLayers egy meghatározott előre beállított módon, és csak külön ERDDAP -alapú adatforrások, úgy gondoljuk, nincs kereszteződés sebezhetőség ERDDAP alkalmazása OpenLayers és provincis.j. Azonban, ha nem hisz ebben, akkor most már nem használja a OpenLayers demo a WMS oldalai ERDDAP™ hozzáadva
```
        <openLayersActive>false</openLayersActive>  
```
a setup.xml fájlba. Az alapértelmezés "igaz". Hála Charles Carletonnak és az NCEI-nek.
    * BIZTONSÁGI VÁLTOZÁSOK: Használatlan .jar fájlok és másolás .jar fájlok (mert ők is a netcdfAll.jar) eltávolították ERDDAP™ eloszlás. Out- of- date .jar fájlokat frissítettük. Hála Charles Carletonnak és az NCEI-nek.
    * BIZTONSÁGI VÁLTOZÁSOK: A netcdfAll.jar fájl elosztva ERDDAP™ a legújabb verzió (jelenleg 4.6.10) , de még mindig tartalmaz belső Jackson .jar fájlokat, amelyek ismert, hogy elavult és biztonsági sebezhetőségek, különösen a Jackson könyvtárak, amelyeket csak akkor használnak, amikor az Amazon S3 adatforrásokhoz. Ha nem az Amazon S3-on keresztül férsz hozzá az adatokhoz (Tudnád, ha) Ezek a sebezhetőségek nem relevánsak.
        
A Netcdf- java fejlesztők fenntartják, hogy ezek a sebezhetőségek nem relevánsak, mert a netcdf kód használja ezeket a könyvtárakat, és minden esetben csak az Amazon S3 eléréséhez lenne releváns. Lásd [ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866) . Hiszek nekik. Ha még mindig aggályai vannak ezzel kapcsolatban, lépjen kapcsolatba a netcdf- java fejlesztőkkel. (Ha nem hiszed, hogy a netcdf- java fejlesztők nem használják ERDDAP™ Emiatt, akkor nem kell használni THREDDS sem, mert THREDDS használ netcdf- java alapjaiban és átfogóbb, mint ERDDAP .) 
        
Részletek: A problémás kód és a sebezhetőségi figyelmeztetések a következők:
netcdfAll- latest.jar / META- INF / maven / com.fasterxml.jackson.core / jackson- dategind / pom.xml
Lásd https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Magas
netcdfAll- latest.jar / META- INF / maven / com.fasterxml.jackson.dataformat / jackson- dataformat- cbor / pom.xml
Lásd https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Magas
netcdfAll- latest.jar / META- INF / maven / com.fasterxml.jackson.core / jackson- annotations / pom.xml
Lásd https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Magas
Lásd https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Kritikus
netcdfAll- latest.jar / META- INF / maven / com.fasterxml.jackson.core / jackson- core / pom.xml
Lásd https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Magas
Lásd https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Kritikus
"A 4.6.10-es verzióhoz az aws- java- sdk- core a Jackson 2.6.6-os verzióját húzza". (e-mail from netcdf- java people) .
Hála Charles Carletonnak és az NCEI-nek.
        
    * ÖSSZEEGYEZTETŐ VÁLTOZÁSOK: Ha újrafordítja ERDDAP™ , Megjegyzés, hogy a -cp classpath paraméter szükséges a parancssor most sokkal rövidebb, mint korábban. Lásd az új -cp beállítást [Ez a dokumentáció](/docs/contributing/programmer-guide#development-environment) . Hála Charles Carletonnak és az NCEI-nek.
    * ÚJ LEHETŐSÉG az GenerateDatasets-ben Xml: EDDTableFromBcodmo, amely csak a BCO- DMO belső használatra szolgál.
Adam Shepherdnek és BCODMO-nak köszönhetően.
    * ÚJ ATTRIBUTE ÉS FEATURE: Ha az EDDTable oszlopban webes fájlok fájlnevei vannak (például kép, videó vagy audio fájlok) , akkor hozzá
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
a bázisURL megadása (vége: /) A fájlneveket teljes URL-ekké kell tenni. Akkor .htmlTable válaszok, ERDDAP™ a fájlnevet a kombinált URL linkjeként jeleníti meg (alap Url plusz a fájlnév) .
Ha akarod. ERDDAP™ a kapcsolódó fájlok kiszolgálásához készítsünk egy külön EDDTableFromFileNames adatlapot ezekhez a fájlokhoz (lehet egy privát adatkészlet) .
Adam Shepherdnek és BCODMO-nak köszönhetően.
    * ÚJ ATTRIBUTE AJÁNLÁS: Ha egy EDDTable oszlopban webes hozzáférhető fájlok fájlnevei vannak (például kép, videó vagy audio fájlok) amely archívumon keresztül hozzáférhető (például: .zip fájl) URL-en keresztül elérhető, használat
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
az archívum URL-jének megadása.
Ha akarod. ERDDAP™ az archívum kiszolgálásához készítsünk egy külön EDDTableFromFileNames adatlapot ehhez a fájlhoz (lehet egy privát adatkészlet) .
Adam Shepherdnek és BCODMO-nak köszönhetően.
    * JAVÍTÁSOK AZ generált adatbázisokhoz Xml az érvénytelen / rossz okok eltávolításához&lt; subsetVariables &gt; javaslatok és duplikált / rossz javasolt változó nevek, stb Hála Rich Signell-nek, Adam Shepherd-nek és BCO- DMO-nak.
    * Új lehetőség: A politikai határokról szóló információk ERDDAP harmadik személytől származik, és kissé elavult. A világ számos pontján vannak vitatott határok, ahol különböző embereknek különböző elképzeléseik vannak arról, hogy mi a helyes. Nem vonjuk kétségbe a politikai Boundary-adatok helytállóságát ERDDAP . Ha nem tetszik a politikai határ információ, hogy jön ERDDAP™ Most már elmondhatod. ERDDAP™ soha nem húzza politikai határok hozzáadásával
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
a setup.xml fájlba. Az alapértelmezés "igaz". Raju Devendernek köszönhetően.
    * Új METADATA TAG: A datasets.xml egy adatkészlet esetében, most megadhatja az alapértelmezett színszámot Páncélburkolat dataVariable a grafikonon és a térképen,
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (alapértelmezés = -1, ami azt mondja, hagyjuk ERDDAP™ döntés) . Lásd a [szín A bár beállításai](/docs/server-admin/datasets#color-bar-attributes) .
    * JAVASOLT: az állami határvonal színe a térképen lila volt (Deep Purple for you Baby Boomers) . Most már szürke. (a nemzeti határ között szürke és a föld szürke) .
    * BUG FIX:&lt;izo19115Fájl &gt; és&lt;fgdcFile &gt; in datasets.xml nem mindig megfelelően kezelték. Most már igen. Hála a BCO- DMO-nak.

## változat{#version-178} 
 (kiadás dátuma: 2017- 05- 27) 

*    **Új jellemzők (felhasználók számára) :**   
     
    *    (nincs)   
         
*    **Dolgok ERDDAP™ Administrators need to know and do:**   
     
    * JAVASOLT: A sorok sorrendje a "Major LoadDatasets Time Series" -ban a status.html oldalon most a legrégibb az alján.
    * BUG FIX: ERDDAP™ Most ír .nccsv az időváltozóval rendelkező fájlok actual\\_range ISO-8601 Húridő. Ez javítja a hibát EDDTableFromErddap parsing info egy távoli adatkészlet és a quickRestart fájl minden EDDTableFrom... fájlok. (Az idő actual\\_range az adatkészlet első feltöltésekor téves lesz, de az újratöltés után helyes, például ha az adatkészlet be van jelölve.) 

## változat{#version-176} 
 (kiadás dátuma: 2017- 05- 12) 

*    **Új jellemzők (felhasználók számára) :**   
     
    * VÁLTOZÁS Tomcat-ban: Kérelmek ERDDAP™ nem webböngészőkből származó szoftver (például: curl , R, Matlab , Python , Java ) :
Mint a Tomcat korábbi változataiban (az alacsony szintű szoftver fut ERDDAP ) 2016 eleje óta a kérés lekérdezési részében szereplő karakterek közül egyre több URL [ **Kódolt százalék** ](/docs/server-admin/datasets#infourl) biztonsági okokból. A böngészők gondoskodnak a százalékos kódolásról. így ERDDAP™ a böngésző nem érinti, kivéve, ha a kérést átirányítják egy másik ERDDAP .
    * JAVÍTOTT: Korábban, ERDDAP™ kezelt **Char változók** Inkább aláíratlan rövid egész számok, mint karakterek. Most úgy bánik velük, mint az 1-es karakterű UCS2-vel. (Unicode) Húrok. Lásd a [Char dokumentáció](/docs/server-admin/datasets#char) . Köszönet Aurelie Briand-nek és az Argo projektnek.
    * JAVÍTOTT: Korábban, ERDDAP™ kevés támogatást nyújtott **Unicode karakterek** a 255-ös karakter felett a Strings-ben. Most, belül, ERDDAP™ teljes mértékben támogatja a 2- byte UCS2 chars (0-tól 65535-ig számozott karakterek) Stringsben. Amikor a sztringadatok különböző fájltípusokra vannak írva, ERDDAP™ megteszi, amit tud, hogy támogassa a 2 byte chars. Egy másik példa a .csv fájlok, amelyek ERDDAP™ ír az ISO-8859-1 charset (1 byte charset) , így ERDDAP™ minden karaktert a 255-ös karakter felett ír a JSON- like\\ u _ hhhh _ szintaxissal. Lásd [Húros adatok](/docs/server-admin/datasets#string) .
    * JAVÍTOTT: .nc fájlok ERDDAP™ , Char változók kell értelmezni, mint Strings lesz az attribútum
         **\\ _ Kódolás = ISO- 8859- 1**   
In .nc fájlok olvasása ERDDAP™ , Char változók "\\ _ Encoding" lesz értelmezni, mint Strings a megadott charset.
    * REMIDER: ERDDAP™ támaszok **JSON- like backslash- encoding** a speciális karakterek, ha meghatározza megszorítások Char és Húros változók. Így kérhetsz valami olyasmit, mint a & myString = "\\ u20ac", amikor adatsorokat akarsz, ahol a myString = €20ac óta az Euro szimbólum kódpontjának hexadecimális változata. Az interneten több forrás mutatja az Unicode szimbólumok kódpontszámait, például: [ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode) .
    * JAVÍTOTT: Korábban, ERDDAP™ korlátozott támogatást nyújtott **hosszú egész szám** változók. Most ERDDAP™ teljes mértékben támogatja longs belül, és teszi a legjobb írásakor hosszú adatok különböző fájltípusok. Lásd a [hosszú dokumentáció](/docs/server-admin/datasets#long) . Hála az írországi Tengerészeti Intézetnek, Craig Risiennek, Rich Signell-nek, Christopher Wingardnak és OOI-nak.
    * ÚJ: kimeneti fájl típusa griddap és tabledap : ** .nccsv ** , ami a NetCDF -szerű ASCII, CSV fájl, amely tartalmazza az összes metaadatokat, hogy lenne egy összehasonlítható .nc akta. Lásd a [NCSV Specifikáció](/docs/user/nccsv-1.00) . Hála Steve Hankinnek.
    * ÚJ: ** orderByClosest szűrő** lehetővé teszi, hogy meghatározza, hogyan kerül sor az eredménytábla válogatására és egy intervallum (pl. 2 óra) . Az egyes csoportokon belül csak az intervallumhoz legközelebb eső sorok maradnak. Például, orderByClosest  (" stationID 2 óra ".) Elrendeződik stationID és idő, de csak vissza a sorok minden egyes stationID ahol az utolsó orderBy oszlop (idő) 2 órás időközökhöz van legközelebb. Ez a legközelebbi dolog tabledap az értékeket griddap kéréssel lépje. Ez az opció megadható bármilyen tabledap dataset .html weboldal, .graph weboldal, és bármely URL, hogy létre magad. Hála az ír Tengerészeti Intézetnek és az Ocean Networks Kanadának.
    * ÚJ: ** orderByLimit szűrő** lehetővé teszi, hogy adja meg, hogyan kerül sor az eredménytábla válogatására és a limit szám (például 100) . Az egyes csoportokon belül csak az első "limit" sorok maradnak meg. Például, orderByMax  (" stationID , 100 ") Elrendeződik stationID , de csak vissza az első 100 sor minden stationID . Ez hasonló az SQL LIMIT záradékához. Ez az opció megadható bármilyen tabledap dataset .html weboldal, .graph weboldal, és bármely URL, hogy létre magad. Hála az ír Tengerészeti Intézetnek és az Ocean Networks Kanadának.
    * ÚJ: Két új válaszfájltípus, ** .jsonlCSV és .jsonlKVP ** a rácsozott adatkészletekre, táblázatos adatkészletekre és számos más helyre ERDDAP   (például adatkészletekkel kapcsolatos információkérések) . A fájlok JSON Lines fájlok ( [ https://jsonlines.org/ ](https://jsonlines.org/) ) ahol minden vonalnak külön JSON objektuma van. .jsonlCSV csak az értékek CSV formátumban. .jsonlKVP van kulcsa: Értékpárokat. Minden vonal magától áll. A vonalak nem egy nagyobb JSON tömb vagy objektum. Például: [a minta iránti kérelem](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z) . Hála Damian Smyth-nek, Rob Fullernek, Adam Leadbetternek és Írország Tengerészeti Intézetének.
    * ÚJ: Új dokumentáció [ **Hogyan férjünk hozzá a privát adatbázisokhoz ERDDAP™ Scripts** ](/docs/user/AccessToPrivateDatasets) . Lynn DeWitt-nek köszönhetően.
    * JAVASOLT: A minimális kiterjedése a ** OpenLayers ** A térkép 2 fok volt, és most 4 adatpixel. Köszönet Rusty Hollemannek.
    * JAVASOLT: Egyes közös esetekben olyan kérelmek, amelyek **reguláris kifejezés** A kényszer sokkal gyorsabb lesz.
         
*    **Dolgok ERDDAP™ Administrators need to know and do:**   
     
    *    **Első lépés:** Az első alkalom, hogy elkezded ezt az új verziót, hosszú ideig fog tartani ERDDAP™ az összes adatkészlet betöltése, mert újra kell olvasnia az összes forrásadatot (bár csak a fejléc a rácsozott adatfájlok) . Ha megnézed a naplókat, lehet, hogy hibaüzeneteket látsz, melyek szerint "régi / nem támogatott javított verzió" néhány belső fájl -- ez rendben van -- ERDDAP™ elkészíti a belső fájlok új verzióit. Kérlek, légy türelmes.
    * FELLÉPÉS: ERDDAP™ Most használja az új **Java.time** osztályok (más néven JSR 310) Joda helyett a húrokat numerikus időkre bontsa. Megjegyzések:
        * Ha ERDDAP™ hirtelen problémái vannak a Húros idők egy adott adatkészlet, és így csak átalakítja a legtöbb vagy minden alkalommal a NaN (hiányzó értékek) , A probléma szinte mindig a dátum Időformátum sztring, amit a változó "egységeként" definiáltál. Az új rendszernek néha egy kicsit más datedTime formátumra van szüksége.
        * Ha numerikus hónapok és napok a dateTime strings nem 0- párnázott (például "3 / 7 / 2016") , hogy a formátum csak egyetlen M és d (pl. "M / d / yyy", nem "MM / dd / yyy") .
        * Minden törtmásodperces specifikáció módosítása, amely kisebb s-t használ (például a .sss in yyyy-MM-dd Nem.) tőkére S, (például: yyyy-MM-dd Nem.) .
        *    ERDDAP™ már nem támogatja a sztring dátumát Kétjegyű időformátum (yy) implicit évszázad (Például 1900 vagy 2000) . A vállalkozások dollármilliárdokat költöttek erre a problémára az 1990-es évek végén. A tudósok nem használhatnak két számjegyű évet. Kérjük, javítsa meg a forrásfájlt (sz) 4 számjegyű évekre történő átváltással, majd a dátumban éééé Időformátum.
        * Használhatja az ÉÉÉÉ-t vagy ÉÉÉÉ-t (amelyet ERDDAP™ átalakítja uuuuuba) 4 számjegyű év, beleértve a negatív éveket, pl. -4712 (ami Kr. e. 4713) . Hála a SeaDataNetnek, Thomas Gardnernek és a BODC-nak.
        * Kérjük, továbbra is használja Z egy date Time formátumban, hogy ERDDAP Időeltolódás (pl. Z, + 0200, -08, -0800, -08: 30) .
        *    **Győződjön meg róla, hogy Java 1.8.0\\ _ 21 vagy magasabb verzió.** 
        * Programozók -- Ha írsz Java a futó programok ERDDAP™ kód, el kell távolítani a hivatkozást a joda-time. üveg az osztályút paraméterben.
    * ÚJ: ERDDAP s [ArchiveA Adatkészlet](/docs/server-admin/additional-information#archiveadataset) létre tud hozni [ **BagIt fájlok** ](https://en.wikipedia.org/wiki/BagIt) . Az NCEI szabványosíthatja ezt a formátumot. Hála Scott Crossnak és John Relph-nek.
    * JAVÍTOTT: A linkek letölteni az erddap. háború a ERDDAP™ weboldalak most rámutat, hogy **GitHub** . (Ezek nyilvános kapcsolatok, így nem kell csatlakoznod a GitHub-hoz.) Ez sokkal gyorsabb letöltéseket jelent. (legfeljebb 12Mb / s versus 1Mb / s) és kevés probléma a letöltéssel. Hála Damian Smyth, Rob Fuller, Adam Leadbetter, Conor Delaney és Írország Tengerészeti Intézete.
    * JAVASOLT: **Status.html oldal és a napi állapotjelentés e-mail** Most egy "Major LoadDatasets Time Series" részt tartalmaz, amely a következő statisztikákat mutatja: ERDDAP™ az utolsó 100 fő terhelési adatkészlet minden nagyobb terhelési adatlapjának a végén. Köszönhetően a problémás RAID-unknak.
    * ÚJ: új, opcionális (de ajánlott) EDDTableFromCassandra adatkészletek paramétere: [ ** &lt;partitionKeyCSV &gt; ** ] (/ docs / server- admin / datasets # partitionkeycsv) . Hála az Ocean Networks Kanadának.
    * ÚJ: EDDTableFromAsciiFiles most támogatja ** &lt;Oldalelválasztó &gt; ** paraméter. Ha null vagy "", az osztály kitalálja, mint korábban, Ellenkező esetben, az első karakter lesz a oszlop elválasztó olvasásakor a fájlokat. Hála Sky Bristolnak és Abigail Bensonnak.
    * Új: az új adatkészlet típusa, [ **EDDTableFromNccsvFiles** ](/docs/server-admin/datasets#eddtablefromnccsvfiles) , képes egy adatkészlet összesítésével [NCCSV .csv fájlok](/docs/user/nccsv-1.00) . Hála Steve Hankinnek.
    * JAVÍTOTT: **EDDTableFromErddap** most használja .nccsv az információ távoli ERDDAP s és a metaadatok helyi archívumához. Ez lehetővé teszi a teljes támogatást a char és a hosszú adattípusok, és az Unicode (UCS- 2) Charset chars and Strings. Hála Rob Fullernek és Írország Tengerészeti Intézetének.
    * JAVÍTOTT: EDDTableFromErddap és EDDGrid FromErddap most támogatja ** &lt;átirányítás &gt; hamis&lt;/ átirányítás &gt; ** ami elárulja ERDDAP™ soha ne irányítsa át a kérést a távoli ERDDAP . Az alapértelmezés igaz. Ez hasznos, ha a távoli ERDDAP™ magánszemély ERDDAP . Hála Damian Smyth-nek, Rob Fuller-nek és Írország Tengerészeti Intézetének.
    * JAVÍTOTT: ERDDAP™ Most fogások **törölt felhasználói kérelmek** Előbb. És ERDDAP™ Most gyorsabban leáll, mert az alacsony szintű szálak gyorsabban záródnak le. Köszönhetően a problémás RAID-unknak.
    *    **GenerateDatasets Xml:** 
        * ÚJ: Az új speciális EDDType "ncdump" nyomtat [ncdump](https://linux.die.net/man/1/ncdump) \\ -szerű kinyomtatás a fejléc egy .nc akta. A megadott változók adatértékeit is kinyomtathatja (vagy írja be a "semmi", hogy ne nyomtasson semmilyen adatértéket) . Ez azért hasznos, mert az ncdump nélkül nehéz tudni, mi van egy fájlban, és így milyen EDDType-ot kell megadnod az GenerateDatasetsXml-hez. Craig Risiennek, Rich Sigellnek, Christopher Wingardnak és OOI-nak köszönhetően.
        * ÚJ: Tengeri adatok esetében Nettó adatok:
Adott esetben GenerateDatasets Xml most csinál egy speciális szemantikai konverzió segítségével távoli SPARQL lekérdezés: ha egy változó forrás metaadatai tartalmaznak sdn\\ _ paraméter\\ _ urn, például, sdn\\ _ paraméter\\ _ urn = "SDN: P01::: PSLTZZ01", GenerateDatasets Xml hozzáadja a megfelelő P02 attribútumot, pl. sdn\\ _ P02\\ _ urn = "SDN: P02::: PSAL". Ha van adatkészlete, amely ezeket az attribútumokat használja, és ha ERDDAP s&lt; categoryAttributes &gt; in setup.xml includes sdn\\ _ paraméter\\ _ urn and sdn\\ _ P02\\ urn, users will be able to use ERDDAP™ A kategóriás keresési rendszer ezen attribútumok egyedi értékeivel rendelkező adatkészletek keresésére szolgál. Köszönet a BODC-nak és Alexandra Kokkinaki-nak.
        * JAVÍTOTT: GenerateDatasets Xml most sok változást http:// a metaadatok https:// adott esetben.
        * JAVÍTOTT: GenerateDatasets Xml most próbálja kitalálni, készítő\\ _ type és kiadó\\ _ type.
        * JAVASOLT: Az GenerateDatasets által javasolt adattípusok Az Xml egy kicsit jobb lesz. Hála Margaret O 'Briennek, LTER-nek és EML-nek.
        * JAVÍTOTT: GenerateDatasets Az Xml jobb a&lt;cdm\\ _ data\\ _ type & gt;, és a hozzá tartozó, szükséges attribútumok (pl.,&lt;cdm\\ _ timeseries\\ _ változók & gt;), így ezt az információt megadhatja. Hála Rich Signell-nek.
        * JAVASOLT: Általános adatbázisokban Xml, az EDDTable datasets, a javaslat&lt; subsetVariables &gt; most sokkal konzervatívabb. Hála John Kerfootnak.
        * JAVÍTOTT: Ha datasets.xml adatsorok esetében meghatározza featureType de nem cdm\\ _ data\\ _ type, a featureType cdm\\ _ data\\ _ type néven kerül felhasználásra. Hála Rich Signell-nek.
        * BUG FIX: generál Adatbázisok Xml most a helyes&lt;adattípus &gt; olyan adatváltozók esetében, amelyek scale\\_factor , add\\_offset és / vagy\\ _ Aláíratlan attribútumok.
    * JAVÍTOTT: Mikor ERDDAP™ megnyitja a .nc fájl **rövidebb** mint aminek lennie kell (például, nem lett teljesen másolt a helyére) , ERDDAP™ Most már rosszul kezeli az aktát. Korábban... ERDDAP™ visszatért hiányzó értékek bármely hiányzó része a fájl, mert ez az alapértelmezett viselkedés a netcdf- java. ERDDAP™ Most ucar-t használ .nc 2.iosp.netcdf3.N3header.disallow FileTruncation = true; Hála a mi bajkeverő RAID-unknak és Christian Ward- Garrison-nak.
    * JAVASOLT: az ISO 19115 író most használja **creator\\ _ type** , ha jelen van.
    * JAVÍTOTT: ERDDAP™ Most használja a legújabb netcdf- java v4.6.9, amely olvassa el a további típusok **netcdf4 fájlok** . Hála Craig Risiennek, Rich Signell-nek, Christopher Wingardnak és OOI-nak.
    * BUG FIX: kerülje a bajt, ha a különböző forrásfájlok különböző adattípusokkal rendelkeznek egy adott változóhoz. Hála Roy Mendelssohnnak és Eugene Burgernek.
    * BUG FIX: **Időformátum-átalakítások** Most már jobban védve vannak a rossz időértékekkel szemben. Hála az NDBC-nek.
    * BUG FIX: EDDGrid FromNcFiles Kicsomagolva kezeli az időértékeket **"hónapok óta"... és "évek óta"...** helyesen (a hónap vagy év növelésével, nem durván összeadva például 30 nappal többször) . Köszönet Soda3.3.1.
    * BUG FIX: csak v1.74, **előfizetések** intézkedés előírása (például: http:// ...) , amely volt, és kell, hogy legyen választható.
    * BUG FIX: EDDGrid FromMergeIRFiles.lowGetSourceMetaadatok () nem adott hozzá globális tulajdonságokat. Most már igen.
         

## Változat 1.74{#version-174} 
 (released 2016-10- 07) 

*    **Új jellemzők (felhasználók számára) :**   
     
    * Most, amikor egy lista a adatbázisok (Minden, vagy egy keresés) weboldalon jelenik meg, a hosszú címek több sorban jelennek meg. Az előző részek tartalmából: Hála Margaret O 'Briennek, LTER-nek és EML-nek.
         
*    **Dolgok ERDDAP™ Administrators need to know and do:**   
     
    * TY: A Linux számítógépeken változtasd meg az Apache időkimaradási beállításokat, hogy az időigényes felhasználói kérések ne időzzenek ("Proxy" vagy "Bad Gateway" hibával) . Mint a root felhasználó:
        
        1. Az Apache módosítása http d.conf fájl (általában / etc / http d / conf /) :
Változás a meglévő&lt;Időkérés &gt; beállítás (vagy adjon hozzá egyet a fájl végén) 3600-3600 (másodperc) 60 vagy 120 másodperc helyett.
Változás a meglévő&lt;ProxyTimeout &gt; beállítás (vagy adjon hozzá egyet a fájl végén) 3600-3600 (másodperc) 60 vagy 120 másodperc helyett.
        2. Újraindítás Apache: / usr / sbin / apachectl -k kecses (de néha egy másik könyvtárban van.) .
        
Thomas Olivernek köszönhetően.
         
    * ÚJ: \\[ bigParentDirectory / hard Zászló könyvtár
Ez úgy működik, mint a zászló könyvtár, de a hardFlag verzió törli az összes tárolt adatállományt. Nincsenek URL-ek, hogy beállítsunk egy kemény zászlót. Ez csak akkor használható, ha egy fájlt a könyvtárba.
kemény A zászlók nagyon hasznosak, ha olyat teszel, ami megváltoztatja a ERDDAP™ elolvassa és értelmezi a forrásadatokat, például, amikor egy új verziót telepít ERDDAP™ vagy ha bizonyos típusú változtatásokat hajtott végre az adatkészlet definíciójában datasets.xml . Lásd [Ez a dokumentáció](/docs/server-admin/additional-information#hard-flag) . Hála John Kerfootnak és az összes Argo csoportnak.
         
    * ÚJ: GenerateDatasets Xml most már egy EDDTableFromEML opció
amely egy adatelemet olvas egy ökológiai metaadatok nyelvén (EML) fájl, letöltése a kapcsolódó adatfájl, és létrehoz egy darab datasets.xml így az adatkészlet hozzáadható ERDDAP . Van egy EDDTableFromEMLLOT, amely ugyanezt teszi az összes EML fájlokat egy könyvtárban. Ez nagyon jól működik, mert az EML kiváló munkát végez az adatkészlet leírásában, és mert a KNB és a LTER elérhetővé teszi a tényleges adatfájlokat.
EML plusz ERDDAP™ lehet egy nagy kombináció, mivel ERDDAP™ a felhasználók számára közvetlenebb hozzáférést biztosíthatna a KNB és a LTER adataihoz, és segíthetne ezeknek a projekteknek megfelelni az Egyesült Államok kormányának [A kutatási eredményekhez való nyilvános hozzáférés (PARR) követelmények](https://nosc.noaa.gov/EDMC/PD.DSP.php) az adatok internetes szolgáltatás útján történő hozzáférhetővé tételével.
Lásd [Ez a dokumentáció](/docs/server-admin/EDDTableFromEML) . Hála Margaret O 'Briennek, LTER-nek és EML-nek.
         
    * ÚJ: GenerateDatasets Xml most már egy EDDTableFromInPort opció
amely elolvassa az adatkészlet leírását egy InPort XML fájlban, és megpróbálja létrehozni egy darab datasets.xml így az adatkészlet hozzáadható ERDDAP . Ez ritkán hoz létre egy "readyto- use" XML darabot datasets.xml , de létrehoz egy jó durva vázlatot, ami jó kiindulópont egy ember szerkesztéséhez.
Nagyszerű lenne, ha az emberek az InPort-ot is használnák adataik dokumentálására. ERDDAP™ a tényleges adatok rendelkezésre bocsátása a ERDDAP a webes szolgáltatások, így megfelel az amerikai kormány és NOAA s [A kutatási eredményekhez való nyilvános hozzáférés (PARR) követelmények](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research) az adatok internetes szolgáltatás útján történő hozzáférhetővé tételével. Ez egy olyan megoldás, amit most használhatnánk. ( erd.data at noaa.gov Örömmel segít.)   
Lásd [Ez a dokumentáció](/docs/server-admin/datasets#eddtablefrominport) . Hála Evan Howellnek és Melanie Abecassisnak.
         
    * JAVÍTOTT: ERDDAP™ Most használ netcdf- java 4.6.6.
A korábbi verziók, netcdf- java olvasni néhány kitöltési értékeket (Talán, csak a netcdf4 fájlokban) 0-ás. Néhányuk a netcdf standard kitöltési értéke: -127 bájt, -32767 rövidnadrág, -2147483647 int. Unidata Azt mondja, az új viselkedés a megfelelő viselkedés. Ha egy változó egy adatkészletben megjelenik ezen értékek egyikén, ahol a 0-as értékek voltak, hozzáadhatjuk például,
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
a változó 's addAttributes Hogy elmondjam ERDDAP™ ezt az értéket a missing\\_value /\\ _ Töltse ki Érték. Sok esetben azonban ez nem hozza meg a kívánt eredményt: 0-as. Ha igen, fontolja meg a fájlok módosítását NCO vagy átírja a fájlokat. Panaszt? Kérem lépjen kapcsolatba Unidata ; -)
         
    * TY: Új Topographyth Depth paletta
Arra bátorítalak, hogy cseréld ki az összes adatot, ami az OceanDepth palettát használja az új Topographyth Depette-hez, ami olyan, mint a Topography, kivéve a színekkel, hogy alkalmas legyen a mélységi értékekre. (pozitív = lefelé) magassági értékek helyett (pozitív = fel) . A paletta ajánlott beállításai:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * ÚJ FEATURE: Húrozás missing\\_value és / vagy\\ _ FillValue
Ha egy sztring változó definiálja a missing\\_value és / vagy\\ _ FillValue, ERDDAP™ most törli ezeket az értékeket az adatokból, és helyettesíti őket egy üres sztring, így a hiányzó értékek jelennek meg, mint az üres sztringek, mint más adatsorok ERDDAP . Hála Margaret O 'Briennek, LTER-nek és EML-nek.
         
    * ÚJ FEATURE: A helyi idők támogatása
időbélyegző változók forrás adatok Húrok most már meg egy időzóna a " time\\_zone "attribútum, amely vezet ERDDAP™ konvertálni a helyi időzóna forrásidejét (Van, aki a szokásos időben, van, aki nappal takarít.) be Zulu Times. Az érvényes időzóna-nevek listája valószínűleg megegyezik a TZ oszlopban szereplő listával [táblázat](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) . Az alapértelmezett " Zulu ". Gyakori amerikai időzónák: US / Hawaii, US / Alaska, US / Pacific, US / Mountain, US / Arizona, US / Central, US / Eastern. Az időbélyegző változók numerikus forrásadatokkal, akkor adja meg a" time\\_zone "attribútum, de az értéknek" Zulu "vagy" UTC ". Hála Margaret O 'Briennek, LTER-nek és EML-nek.
         
    * ÚJ FEATURE: EDDTableFromAsciiFiles most támogatja a szemikolonszétválasztott fájlokat
és okosabb a szeparátorban. Hála Margaret O 'Briennek, LTER-nek és EML-nek.
         
    * ÚJ FEATURE: Ha jelentős hiba van a Load Datasets-ben (jelentős vagy kisebb, például hiányzik vagy érvénytelen datasets.xml dokumentum) , ERDDAP™ most azt jelzi status.html, közvetlenül alatt "n Datasets sikertelen betölteni", mint ERROR: miközben feldolgozás datasets.xml : A részleteket lásd a log.txt oldalon.
         
    * ÚJ FEATURE: ERDDAP™ Árvákat keres.
Mikor? ERDDAP™ nagy terhelést végez Datasets, ez most keres árva adatok (adatkészletek, amelyek ERDDAP™ de nem a datasets.xml ) . Ha megtalálják, akkor a status.html-ben vannak felsorolva, közvetlenül az "n Datasets Fail To Load" alatt, mint ERROR: n Orphan Datasets (adatkészletek ERDDAP™ de nem a datasets.xml ) =...
Ha el szeretné távolítani (kirakodás) árva ERDDAP™ , meg kell adni
        &lt;adatkészlet típusa = "_ anyValidType _" datasetID = "_ theDatasetID _" active = "false" / &gt;
- datasets.xml amíg az adatkészlet ki nem kerül a következő nagyobb betöltési adatkészletekből.
         
    * BUG FIX: Ha egy adatkészlet volt egy numerikus időbélyegző változó egységek nem "seconds since 1970-01-01T00:00:00Z" valamint&lt;updateEveryNMillis &gt; System active, the timestable variator 's range was unright when the dataset was updated. Hála John Kerfootnak.
         
    * BUG FIX: Ha&lt;A quickRestart &gt; igaz volt a setup.xml-ben, és adatokat kért egy EDDTableFrom... A használt adatállomány&lt;updateEveryNMillis &gt;, az első kérés az adatkészlet sikertelen, de a későbbi kérések sikeresek. Az első kérés nem fog elbukni. Hála John Kerfootnak.
         
    * BUG FIX: A GenerateDatasetsXml.sh és a .bat nem működött &gt; 9 paraméter a parancssorban. Most már tudják. Hála John Kerfootnak.
         
    * BUG FIX: Az új EDDTableFromMMultidimNcFiles nem távolította el következetesen a trining szóközöket a húrokról. Most már igen. Ez különösen az ARGO fájlokra volt hatással. Hála Kevin O 'Briennek és Roland Schweitzernek.
         
    * BUG FIX: Minden hozzáférés távoli DAP A szolgáltatások most már modernebb kóddal kezdődnek. Ez rögzíti a "kapcsolat bezárt" hibát, amikor hozzáférsz néhány EDDTableFromErddap adatkészlethez. Hála Kevin O 'Briennek.
         
    * BUG FIX: A orderBy ... () és elkülönül () visszatértek a legutóbbi változások előtti állapotukba: egy adott kérésnek több is lehet orderBy ... () és / vagy külön () szűrő; ERDDAP™ kezeli őket a megadott sorrendben. Hála David Karugának.
         
    * BUG FIX: Ha az adatkészlet EDDTableFromDatabase és egy lekérdezés [sourceCanOrderBy](/docs/server-admin/datasets#sourcecanorderby) és / vagy [sourceCanDosinty](/docs/server-admin/datasets#sourcecandodistinct) , akkor az adatbázis (a beállítások függvényében datasets.xml ) részben vagy teljesen fogantyú **Csak az első**   orderBy .. () vagy eltérő () . Hála David Karugának.
         
    * BUG FIX: A legutóbbi extra kódolás problémákat okozott néhány kérdés .nc CF fájlok, pl. "HTTP állapot 500 - Kérdés hiba: változó = állomás kétszer szerepel az eredményváltozók listáján". Hála Kevin O 'Briennek.
         
    * BUG FIX: EDDTableFromFiles volt nehéz újratölteni egy adatkészlet, amikor az egyik oszlop volt egy igazi char oszlop. Hála Roland Schweitzernek.
         
    * BUG FIX: EDDGrid FromNcFiles Most már kicsomagolt is. missing\\_value and\\ _ FillValue to standard values so files with different values can be aggregate. Mert ez a változás, miután telepítse ezt az új változata ERDDAP™ a [kemény Lobogó](/docs/server-admin/additional-information#hard-flag) minden egyes EDDGrid FromNcFiles Kicsomagolt adatkészlet ERDDAP .
         
    * JAVÍTOTT: EDDTableFromNcCFFiles most már kezelni fájlok több minta\\ _ dimenzió 's. Egy adott adatkészlet csak a minta\\ _ méreteinek egyikét használó változókat használhatja. Ajay Krishnannek köszönhetően.
         
    * JAVÍTOTT: az EDDTableFrom... fájlok,&lt;sortFilesBySourceNames &gt; Most lehetővé teszi a comma- elválasztott (ajánlott) vagy térelválasztó listák változó forrásnevek. Mindkét esetben az egyedi változó neveket kettős idézőjel veszi körül, például, ha a névnek belső helye van.

## változat{#version-172} 
 (released 2016-05- 12) 

*    **Új jellemzők (felhasználók számára) :** Nincs.
     
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * ÚJ EDDTableFromMMultidimNcfiles [EDDTableFromMultidimNcFiles](/docs/server-admin/datasets#eddtablefrommultidimncfiles) az EDDTableFromNcFiles új alternatívája. Arra tervezték, hogy több változóval rendelkező fájlok csoportjaival foglalkozzon, közös méretekkel, például, var1 \\[ a \\]  \\[ b \\] , 2. \\[ a \\] , 3. \\[ b \\] SkalarVar. Köszönet az Argo Projektnek, Aurélie Briand-nek és Roland Schweitzernek.
    * BUG FIX: ERDDAP™   (a FileVisitorDNLS és FileVistorSubdir osztályokon keresztül) Most a Linux szimbolikus linkjeit követi. ERDDAP™ Még mindig nem követi a Windows-on lévő inket.
    * Az 1.70-ben bemutatott hiba BUG FIX-e: elkülönítés + orderBy egy kérésben nem megengedett. Már megint azok. Ezek nem zárják ki egymást / feleslegesek. Hála David Karugának.
    * VÁLTOZÁS datasets.xml az IP-címek feketelistája:
Az IP v4 címek látszólag ERDDAP™ 4 period- elválasztott hexaszám.
Azt hiszem, az IP v6 címek 8, egymástól elválasztott átokszám.
Szóval... ERDDAP™ most támogatja a colons az IP címek a listán, és:\\ * végén a lista, hogy blokkolja egy sor címet.
    * JAVÍTOTT: ERDDAP™ Most használja NetcdfFileWriter írni .nc fájlok a netcdfFileWritible helyett. Nem lehet észrevehető változás a kapott fájlokat. Ez megnyitja a lehetőséget, hogy nagy .nc a .nc 3 64 bites kiterjesztés. Ha azt szeretné / szüksége van rá, kérjük, küldje el a kérelmet erd.data at noaa.gov .
    * JAVASOLT: A távoli weboldalak számos linkje elavult. Most már up- to-date és használat https: helyett http : ha lehetséges.
    * Sok apró változás.

## Változat 1.70{#version-170} 
 (released 2016-04- 15) 

*    **Új jellemzők (felhasználók számára) :** Nincs.
     
*    **Dolgok ERDDAP™ Administrators need to know and do:** Az alábbiakban több javasolt változtatások a dokumentáció a setup.xml fájlt.
Kérem, most tegye meg ezeket a változtatásokat.
30 perc munka most megspórolhat órákig tartó zűrzavart a jövőben.
    * A hibajavítás: A probléma az volt, hogy a kéréseket egy távoli ERDDAP nem sikerült érvénytelen karakterrel " | 'hibaüzenet. Ez csak a Tomcat legújabb változataival történt meg. Köszönet Rusty Hollemannek, Conor Delaney-nek és Roy Mendelssohn-nak.
    * A hibajavítás: ERDDAP™ most a netcdf- java up- to- date verzióját használja (Hosszú történet.) amely magában foglalja az NcML up-to-date támogatását, ami rögzíti a problémát az NcML LogicalReduce nem a várt módon működik. A metaadatok néhány apró változtatása ERDDAP™ lead via netcdf- java from .nc , .hdf , .grib és .bufr fájlok. Hála Favio Medranónak.
    * Az új [EDDTableAggregateRows](/docs/server-admin/datasets#eddtableaggregaterows) lehetővé teszi, hogy egy egyesített EDDTable adatkészlet két vagy több EDDTable adatkészletből, amelyek azonos adatváltozókkal ugyanazokkal az egységekkel. Köszönöm Kevin O 'Briennek.
    * Az EDDTableFromDatabase új opciói ( [sourceCanOrderBy](/docs/server-admin/datasets#sourcecanorderby) és [sourceCanDosinty](/docs/server-admin/datasets#sourcecandodistinct) ) adja meg, hogy ERDDAP™ , az adatbázis, vagy mindkettő, kezelni külön és orderBy   (és valamennyi változat) megszorítások. Hála David Karugának.
    * Most már az új [&lt;grafsAccessibleTo &gt; nyilvános&lt;/ grafsAccessibleTo &gt;] (/ docs / server- admin / datasets # grafsaccessito) Címke. Hála Emanuele Lombardi-nak.
    * Ha egy sztring átmegy az GenerateDatasets-be Xml vagy DasDds körül dupla idézetek, ez nem idézett (Mintha ez egy JSON sztring lenne) . Hála John Kerfootnak és Melanie Abecassisnak.
    * GenerateDatasets Xml most támogatja az "alapértelmezett", hogy az alapértelmezett és a "semmi", hogy kap egy üres string (Idézőjelekkel vagy anélkül dolgoznak) . Ez megoldja az üres húrok átadásával kapcsolatos problémákat.
    * Most, az GenerateDatasets-ben Xml, mindenkinek EDDGrid FromFiles és EDDTable FromFile adatok, ha a minta A megadott név: "" (az üres sztring) , akkor használja az utolsó illeszkedő fájlnév a könyvtár + regex + rekurzív = igaz.
    * Frissítve: A DisplayInBrowser kód, amelyet az GenerateDatasetsXml és DasDds eredményeinek megjelenítéséhez használnak Linux számítógépeken, elavult és furcsa üzenetet adott a Netscape-ről. Ez egy modern Linux eszközt használ: xdg- open. Melanie Abecassisnak köszönhetően.
    * A allDatasets dataset most "files" oszlop, amely a / files link URL-jét jelzi (ha van) az adatkészletre.
    * Növelje az Ön általános biztonságát ERDDAP™ a tomcat könyvtárhoz és a bigParentDirectory-hoz kapcsolódó engedélyek megváltoztatásával:
         (Az alábbi parancsok Linuxra vonatkoznak. Más operációs rendszerekhez hasonló változtatásokat kell végrehajtani.) 
        * Változtassa meg a "csoport", hogy a tomcat, a felhasználóneved, vagy a nevét egy kis csoport, amely magában foglalja tomcat és az összes adminisztrátor Tomcat / ERDDAP például:
chgrp - R _ your UserName _ apache- tomcat- _ 8.0.23 _
chgrp - R _ a UserName bigParentDirectory _
        * A jogosultságokat úgy kell megváltoztatni, hogy a Tomcat és a csoport olvasson, írjon, hajtson végre jogosultságokat, pl.
chmod -R ug + rwx apache- tomcat- _ 8.0.23 _
chmod -R ug + rwx _ bigParentDirectory _
        * Távolítsa el az "egyéb" felhasználó jogosultságait olvasni, írni vagy végrehajtani:
chmod -R o- rwx apache- tomcat- _ 8.0.23 _
chmod -R o- rwx _ bigParentDirectory _
Ez fontos, mert megakadályozza, hogy más felhasználók esetleg érzékeny információkat ERDDAP™ beállítási fájlok, naplófájlok, és fájlok információkat a privát adatkészletek.
    * A hitelesítési / bejelentkezési rendszer átkerült. Thomas Gardnernek, Emanuele Lombardinak és az amerikai kormánynak köszönhetően [HTTPS- only standard](https://home.dotgov.gov/management/preloading/dotgovhttps/) .
        * A hitelesítési = nyitott opció eltávolításra került. Ez már lejárt lemez volt.
        * Az új, ajánlott, [hitelesítés = Google](/docs/server-admin/additional-information#google) opciók használata Google Sign- In (OAuth 2.0 alapján) lehetővé teszi, hogy bárki Google e-mail fiókot (beleértve: Google kezelt fiókok, mint @noaa.gov ) Bejelentkezni.
        * Az új, [hitelesítés = e-mail](/docs/server-admin/additional-information#email) Az opció egy mentés a hitelesítéshez = Google. Ez lehetővé teszi a felhasználók a&lt;felhasználó &gt; címke datasets.xml bejelentkezni egy e-mail küldésével egy speciális linket.
        * A szetup.xml, kérjük, változtassa meg a leírás&lt;hitelesítés &gt; legyen
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

        * A setup.xml, kérjük, adja hozzá ezt alatt a&lt;hitelesítés &gt; tag
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

        * A nem bejelentkezett felhasználók használhatják http vagy https URL- ek (ha beállított&lt;baseHttpsUrl &gt; a szetup.xml). Hála az amerikai kormány új [HTTPS- only standard](https://https.cio.gov/) .
        * Most, akkor bátorítani minden felhasználó, hogy használja https   (nem http ) beállítással&lt;baseUrl &gt; lesz egy https URL. A felhasználók kizárólag a használatra való kényszerítése https , akkor is meg kell változtatni az Apache / Tomcat beállítás blokkolása nem - https hozzáférés. Hála az amerikai kormány új [HTTPS- only standard](https://https.cio.gov/) .
            
A szetup.xml, kérjük, változtassa meg a leírás&lt;baseUrl &gt; lesz
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

        * A lehetőségek&lt;jelszó kódolás &gt; Megváltozott. A szetup.xml, kérjük, változtassa meg a leírás&lt;jelszó kódolás &gt; legyen
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

        * A szetup.xml, kérjük, változtassa meg a leírás&lt;baseHttpsUrl &gt; lesz
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

        * Ha a ListPrivateDatasets = igaz setup.xml-ben, még kevesebb információ jelenik meg olyan adatkészletekről, amelyekhez a felhasználónak nincs hozzáférése.
    * Most, különösen, amikor az első beállítás a ERDDAP Most már elmondhatod. ERDDAP™ nem próbál előiratkozni a távoli ERDDAP™ adatkészletek. Hála Filipe Rocha Freire-nek.
A szetup.xml, közvetlenül előtt&lt;fontFamily &gt;, kérjük, adja hozzá
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

    * A szetup.xml, A fenti utasítások&lt;e-mail FromCíme &gt;, kérjük, illessze be:
Ha lehetséges, állítsa be ezt egy biztonságos kapcsolat (SSL / TLS) az e-mail szerverre.
Ha a beállítás nem használja a biztonságos kapcsolatot az e-mail szerveren, kérjük, hogy a módosításokat, hogy ez.
    * Az Ön datasets.xml , kérjük, adja hozzá ezt a sort a leírás&lt;előfizetésEmailBlacklist &gt; az Ön datasets.xml :
Használhatod a nevet "\\*"egy egész domain feketelistára, például,\\*@ example.com.
    * Mivel a változás a naplózási rendszer v1.66, a naplófájl soha nem up- to-date. Mindig vannak üzenetek vagy üzenetrészek, amelyek arra várnak, hogy a naplófájlba írjanak. Most már felfrissítheted. (Egy pillanatra.) megtekintésével a ERDDAP status weboldal http://_your.domain.org_/erddap/status.html .
    * HashDigest.......
    * Egy kis változás. (húr2.kanonikus) ami segít gyorsan mozgásban tartani a dolgokat, amikor ERDDAP™ nagyon elfoglalt, és számos adatkészletgel is jobban foglalkozik.
    * Szigorúan Ajánlott: hagyja abba a használatot&lt;convertToPublicSourceUrl &gt; in datasets.xml IP-számot konvertálni egy adatkészletben&lt; sourceUrl &gt; (például: http://192.168.#.#/ ) domain név (például: http : my.domain.org /) . Mostantól új előfizetések http://localhost , http://127.0.0.1 , és http://192.168.#.# Az URLS biztonsági okokból nem engedélyezett. Ezért kérjük, mindig használja a nyilvános domain nevet a&lt; sourceUrl &gt; címke (ha a DNS-problémák miatt szükséges) , akkor használja a [/ etc / hosts tábla a kiszolgálón](https://linux.die.net/man/5/hosts) a probléma megoldása a helyi domain nevek IP-számokra történő konvertálásával DNS-kiszolgáló használata nélkül. Tesztelheti, ha egy adott domain név megfelelően megoldódik a használatával
Ping _ some.domain.name
    * GenerateDatasets.xml-ben, távoli adathalmazokhoz (például egy THREDDS szerverről) , az automatikusan generált datasetID s a legtöbb domain esetében változatlan. Néhány domain, az első rész (azaz a név) az automatikusan generált datasetID Egy kicsit más lesz. A neveknek, amelyeknek volt egy részük, most már inkább két részük van. Például az adatok http://oos.soest.hawaii.edu korábban datasetID A hawaii-val kezdődött, de most datasetID Az első a hawaii _ soest\\ _. Ha ez gondot okoz neked, kérlek, írj nekem. Lehet, hogy van egy kis munka.
    * A Cassandra driver frissítve volt cassandra- driver- core- 3.0.jar, és így a Cassandra v3. EDDTableFromCassandra nem használja ki az új funkciók Cassandra v3. Az indexek Cassandrában bonyolultabbak lehetnek, de ERDDAP™ még mindig használja a Cassandra v2 index modell, amely feltételezi, hogy egy indexált oszlop lehet közvetlenül queried '=' megszorítások. GenerateDatasets Xml EDDTableFromCassandra már nem detektálja oszlopok indexek; ha egy index egyszerű, meg kell adni, hogy datasets.xml Kézzel. Ha komplex indexek vagy egyéb új funkciók támogatására van szüksége, kérjük, emailezzen erd.data at noaa.gov .
&#33; Ha még mindig a Cassandra 2.x-et használja, folytassa a kezelést ERDDAP™ v1.68, amíg nem fejleszted a Cassandra 3.x-et.
    * Üvegek és a Classpath -- Szinte az összes benne lévő harmadik fél .jar fájlokat frissítették a legújabb verziók.
        * slf4j.jar került a / lib és a classpath.
        * Joid. Üveg és tsik. az üveget eltávolították a / lib-ből és a classpath-ból.
        * Ha hibajelzéseket kapsz az olyan osztályokról, amelyek nem találhatóak meg, amikor fordítasz vagy futsz ERDDAP™ vagy valamelyik eszköz, hasonlítsa össze a parancssor classpath ERDDAP s [jelenlegi classpath](/docs/contributing/programmer-guide#development-environment) Hogy kitaláljam, melyik befőttesüveg hiányzik a classpath-odból.

## Változat 1.68{#version-168} 
 (released 2016-02-08) 

*    **Új jellemzők (felhasználók számára) :** Nincs.
     
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    *    [ EDDGrid FromFiles Aggregáció fájlnevek vagy globális metaadatok segítségével](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) --
A EDDGrid FromFiles most összesíteni egy csoport fájlok hozzáadásával egy új bal dimenzió, általában idő, alapján egy érték származtatott minden fájlnév vagy egy globális attribútum, hogy minden fájl.
    * JAVÍTOTT: Korábban azt javasoltuk, hogy talán szeretne létrehozni egy EDDGrid FromErddap dataset a datasets.xml amely hivatkozott, és újra szolgált a jplMU RSS T adatkészlet a mi ERDDAP . Mivel most már van egy újabb verziója ennek az adatkészletnek, ez az adatkészlet most romlik. Szóval, ha megvan az adatkészlet a... ERDDAP™ , kérjük, adja hozzá ezt az új adatlapot
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Ha szeretné eltávolítani a régi jplMU RSS T dataset a ERDDAP™   (Te döntesz.) "Igaz" helyett "hamis" lett.
    * A hibajavítás: Kérjük, ellenőrizze a BigParentDirectory, hogy a megadott setup.xml. Ha nem vágtál volna a végén&lt;bigParentDirectory &gt; név, akkor ERDDAP™ több könyvtárat is létre fog hozni azzal, hogy a szavakat közvetlenül az Ön által megadott névhez csatolja, ahelyett, hogy alkönyvtárakat hozna létre. Kezdve az 1.68-as verzióval, ERDDAP™ Ha nem adott meg egyet, a könyvtárnév végére egy slot ad. Tehát, ha korábban nem adott meg egy slot a végén, akkor amikor telepíti ERDDAP™ v1.68 Meg kell mozgatni és átnevezni ezeket a könyvtárakat **után** Leállítod a régit. ERDDAP™ és **előtt** Te kezded az új ERDDAP . Például, ha tévesen megadott bigParentDirectory mint / home / erddapBPD (nincs korlát) és ERDDAP™ tévedésből létrehozott könyvtárak, mint
/ otthon / erddappBPDcache
/ otthon / erddappBPDcope
/ otthon / erddapBPDdataset
/ otthon / erddappBPDflag
/ otthon / erddappBPDlogs
/ otthon / erddapBPDlucene
és egy fájl neve / home / erddapBPDsubptionsV1.txt,
Akkor meg kell mozgatni, és átnevezni őket, hogy
/ otthon / erddapBPD / gyorsítótár
/ otthon / erddapBPD / másolat
/ otthon / erddapBPD / adatkészlet
/ otthon / erddapBPD / zászló
/ otthon / erddapBPD / naplók
/ otthon / erddapBPD / lucén
és / home / erddapBPD / előfizetés V1.txt
    * A hibajavítás: Bogarak voltak benne. EDDGrid LONPM180 ERDDAP™ v1.66, amely akkor történt, amikor a gyermek adatkészlet EDDGrid FromErddap.
    * A hibajavítás: Volt egy bogár. EDDGrid FromFiles és EDDTable FromFile in ERDDAP™ v1.66, ami&lt;updateEveryNMillis &gt;, hogy figyelmen kívül hagyja az első alkalommal az adatkészlet betöltése után újraindítás.
    * hibajavító / új funkció: Ha egy gyermek adatai belül EDDGrid AggregateExisting Dimension, EDDGrid Vettem. EDDGrid FromedDTable, EDDGrid LonPM180, EDDGrid SideBySide, EDDTableCopy, vagy EDDTableFrom EDDGrid FromErddap dataset, hogy a szülő dataset most feliratkozik a mögöttes ERDDAP™ Dataset. Ha az alapul szolgáló eszköz ERDDAP™ dataset azonos ERDDAP™ , az előfizetés és annak validálása történik közvetlenül; akkor nem kap egy e-mailt kéri, hogy érvényesítse az előfizetés. Máskülönben, ha az előfizetési rendszer az Ön ERDDAP™ ki van kapcsolva, állítsa be a&lt;újratöltéseEveryNMinutes &gt; a szülőadatkészlet beállítása egy kis számra (60?) hogy naprakész maradjon.
    * hibajavító / új funkció: Ha egy gyermek adatai belül EDDGrid AggregateExisting Dimension, EDDGrid Vettem. EDDGrid FromedDTable, EDDGrid LonPM180, EDDGrid SideBySide, EDDTableCopy, vagy EDDTableFrom EDDGrid Aktív = "hamis", hogy a gyermek dataset most kimarad.

## változat{#version-166} 
 (released 2016-01-19) 

*    **Új jellemzők (felhasználók számára) :** 
    * Grafikák (Nem térképek) Most már lehetnek csökkenő értékek a tengelyeken. Ahhoz, hogy ezt egy Make A Graph weboldal, új Y tengely: emelkedő beállítás (alapértelmezés) Leereszkedni. Vagy egy grafikont igénylő URL-ben az új opcionális 3 " | "paraméter a [& .x Távolság és / vagy &. yRange kapcsolók](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) Ami nem lehet semmi. (alapértelmezés) , igaz, vagy t kap emelkedő értékek, vagy a hamis vagy f, hogy csökkenő értékeket. Az igaz | A hamis értékek érzéketlenek. Hála Chris Fullilove-nak, John Kerfoot-nak, Luke Campbell-nek és Cara Wilson-nak.
    * A felhasználók most már megadhatják a grafikonok háttérszínét egy & .bgColor = 0x _ AARRGGBB _ switch to the URL which required the graph. Lásd .bgColor a Graphics Commands szakaszban a [graddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) és [ tabledap ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands) dokumentáció. Hála John Kerfootnak és Luke Campbellnek.
    * A táblázatos adatkészletek esetében a megszorítások most már a min (_ someVariabeName _) vagy max. (_ someVariabeName _) . Lásd [perc () és max. () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min) . Hála John Kerfootnak.
    * Táblázati adatkészletek esetében a használt időkorlátok [Most](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) most már megadhatja az időegységeket milliszekundum vagy milliszekundum.
    * Egy táblázatos adatkészlet képére vonatkozó kérés most már térképet is készít (nem diagram) ha az x és y változók volta- like és latittude- like változók (kompatibilis egységek) . Hála Rich Signell-nek.
    * hibajelzés: Az időtengelyek címkéi és a kullancsok néha furcsa szabálytalanságokat mutatnak, amikor egyszerre több grafikont kérnek (például egy weboldalon) . A probléma egy hiba volt az SGT grafikus könyvtárában. ERDDAP™ felhasználások (egy változó volt "statikus", hogy nem kellett volna) . Hála Bradford Butmannek.
         
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * Ez egy biztonsági kockázat, hogy az e-mail jelszavát egy egyszerű szöveges fájl, mint a setup.xml. A probléma enyhítése érdekében határozottan javasoljuk, hogy:
        1. Állítson fel egy e-mail fiókot csak a ERDDAP Használata, például, erddap @ yourInstitution.org. Ennek más előnyei is vannak; nevezetesen egynél több ERDDAP™ Ezt követően az adminisztrátor hozzáférést kaphat az e-mail fiókhoz.
        2. A setup.xml fájl jogosultságai rw (helyesen + írni) a felhasználó, aki fut Tomcat és ERDDAP™   (felhasználó = macska?) és nincs engedély (nem ír vagy ír) a csoport és más felhasználók számára. Hála Filipe Rocha Freire-nek.
    * Az új [ArchiveADataset](/docs/server-admin/additional-information#archiveadataset) eszköz egyszerűsíti a .tar  .gz archiválásra alkalmas formátumú adatkészlet részhalmaza (különösen: NOAA NCEI) . Ez sokaknak hasznos lesz. ERDDAP™ adminisztrátorok sok helyzetben, de különösen csoportok belül NOAA .
    * Az új adatkészlet típusa [ EDDGrid FromNcFilesKicsomagolva](/docs/server-admin/datasets#eddgridfromncfilesunpacked) a EDDGrid FromNcFiles. A különbség az, hogy ez az osztály kipakolja az egyes adatfájlokat, mielőtt EDDGrid FromFiles megnézi a fájlokat:
        
        * Csomagolja ki a használt változókat scale\\_factor és / vagy add\\_offset .
        * Olyan egész változókat támogat, amelyek\\ _ Unsignated = valódi attribútumokkal rendelkeznek egy nagyobb egész adattípusra, így az értékek aláíratlan értékként jelennek meg. Például egy\\ _ Unauthorised = true byte (8 bit) változó lesz egy aláírt rövid (16 bit) változó.
        * \\ _ FillValue és missing\\_value NaN-értékek (vagy MAX\\ _ érték egész adattípusokra) .
        
A nagy előnye ennek az osztálynak, hogy biztosítja a módját, hogy kezelni a különböző értékek scale\\_factor , add\\_offset ,\\ _ FillValue vagy missing\\_value a gyűjtemény különböző fájljaiban. Máskülönben olyan eszközt kellene használnod, mint [NcML](/docs/server-admin/datasets#ncml-files) vagy [ NCO ](/docs/server-admin/datasets#netcdf-operators-nco) minden fájl módosítása a különbségek eltávolítása érdekében, hogy a fájlokat kezelni EDDGrid FromNcFiles. Ahhoz, hogy ez az osztály megfelelően működjön, a fájloknak a kapcsolódó attribútumok CF szabványait kell követniük. Hála Philippe Makowskinak.
    * Az új adatkészlet típusa [ EDDGrid LONPM180](/docs/server-admin/datasets#eddgridlonpm180) lehetővé teszi a 180-nál nagyobb hosszúsági értékkel rendelkező adatkészletek megváltoztatását (például 0-360) a -180-180 tartományon belüli hosszúsági értékkel rendelkező adatkészletekbe (Longitione Plus vagy Minus 180, így a név) . A nagy előnye annak, hogy a -180-180-as tartományba eső hosszúsági értékekkel rendelkező adatkészleteket OGC szolgáltatások (például: WMS ) a hosszúsági értékeket ebben a tartományban kell meghatározni. Köszönet Lynne Tablewskinak, Fabien Guichardnak, Philippe Makowskinak és Martin Spelnek.
2016- 01- 26 Frissítés: Eeek&#33; Ez a hiba akkor fordul elő, amikor a gyermek adatkészlet egy EDDGrid FromErddap, amely utal egy adatkészlet azonos ERDDAP . Ez a hiba be van javítva ERDDAP™ v1.68.
    * In [GenerateDatasetsXml](/docs/server-admin/datasets#generatedatasetsxml) új speciális adatkészlet típussal, EDDGrid LonPM180FromErddapaddal, lehetővé teszi a generálás datasets.xml MELLÉKLET EDDGrid LONPM180 adatkészlet az összes EDDGrid adat ERDDAP amelyek hosszúsági értékei meghaladják a 180-at.
    * For all EDDGrid adatkészletek, in datasets.xml most már használhatja az opcionális
[&lt;hozzáférhető Via WMS &gt; igaz | hamis&lt;/ hozzáférhető Via WMS &gt;] (/ docs / server- admin / datasets # accessibleviawms)   (alapértelmezés = igaz) . Ha ezt hamis erőre állítjuk, az lehetetlenné teszi a WMS szolgáltatás erre az adatra. Ha igaz, az adatkészlet még mindig nem érhető el WMS egyéb okok miatt (pl. nincs lat- vagy lontengely) . Ez különösen hasznos az önmagában létező és EDDGrid LONPM180, hogy csak a LONPM180 verzió érhető el WMS .
    * A setup.xml, meg lehet adni egy másik alapértelmezett szín a háttérben grafikonok. A szín a 0x _ AARRGGBB _ formában megadott 8 számjegyű hexadecimális érték, ahol az AA, RR, GG és BB az opacitás, a piros, a zöld és a kék komponensek, amelyeket 2 számjegyű hexadecimális számként határoznak meg. Megjegyzés, hogy a vászon mindig átlátszatlan fehér, így a (fél -) átlátszó grafikus háttér szín keveredik a fehér vászon. Az alapértelmezés világoskék:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
Hála John Kerfootnak és Luke Campbellnek.
    * A setup.xml, akkor most adja meg a maximális méret a [naplófájl](/docs/server-admin/additional-information#log)   (amikor átnevezik naplóvá. Txt. korábbi és új napló. txt létrehozása) , in MegaBytes. A minimum 1. A maximum 2000. Az alapértelmezett 20 (MB) . Például:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * In datasets.xml , [&lt;fgdcFile &gt;] (/ docs / server- admin / datasets # fgdcfile) vagy [&lt;izo19115Fájl &gt;] (/ docs / server- admin / datasets # iso19115file) lehet egy helyi fájl (mint korábban) vagy URL (amit letöltenek, így van egy helyi másolat) . Ha ERDDAP™ nem tudja letölteni a fájlt, az adatkészlet betöltése folytatódik, de az adatkészletnek nem lesz fgdc vagy iso19115 fájlja.
    *    EDDGrid FromFiles és EDDTable FromFiles datasets now do a quickRestart (a rendszer, amely ERDDAP™ megpróbálja használni, amikor az adatkészletek első betöltése ERDDAP™ újraindítása) . Ez felgyorsítja az újraindítást. ERDDAP .
2016- 01- 26 Frissítés: Eeek&#33; Ez a hiba okozza&lt;updateEveryNMillis &gt;, hogy figyelmen kívül hagyja az első alkalommal az adatkészlet betöltése után újraindítás. Ez a hiba be van javítva ERDDAP™ v1.68.
    * A QuickRestart rendszer általános javítása lehetővé teszi ERDDAP™ az adatkészletek gyorsabb betöltése, amikor ERDDAP™ újraindul.
    * Valamennyi EDDGrid FromFiles és EDDTable FromFiles alosztályok most elfogadnak egy új&lt;pathRegex &gt; tag, általában itt van megadva&lt;rekurzív &gt;. Ha rekurzív "igaz", csak teljes alkönyvtári utak, amelyek megfelelnek a path Regex (alapértelmezett = "\\ *") Elfogadjuk. A&lt; sourceUrl s &gt; címke EDDGrid AggregateExistingDimension most már tartalmazza a pathoRegex attribútum (alapértelmezett = "\\ *") .
    * Az alapértelmezett&lt;partialRendszerkövetelmények &gt; in setup.xml most 490000000 (~ 490 MB) . Ez elkerüli a THREDDS adatszerverek adatainak megszerzésével kapcsolatos problémákat / időtúllépéseket. Hála Leslie Thorne-nak.
    * A log rendszer egy kis módosítása lehetővé teszi ERDDAP™ hogy jobban reagáljon, amikor nagyon, nagyon elfoglalt. Az információ most a lemezmeghajtón lévő naplófájlra van írva, meglehetősen nagy darabokban. Az az előnye, hogy ez nagyon hatékony... ERDDAP™ soha nem blokkolja arra várva, hogy az információkat a naplófájlba írják. A hátrány az, hogy a napló majdnem mindig egy részleges üzenettel ér véget, ami addig nem fejeződik be, amíg a következő darab meg nem íródik.
    * Az inotifikálással és a [&lt;updateEveryNMillis &gt;] (/ docs / server- admin / datasets # updateevernmillis) rendszer EDDGrid FromFiles és EDDTable FromFiles adatok: Már nem szükséges megadni egy nagy fs.inotify.max\\ _ user\\ _ watches vagy fs.inotify.max\\ _ user\\ _ cases. Van egy bogár. Java Ez okozza néhány része Java Az inotify / WatchDirectory rendszer, hogy ne gyűjtsük össze a szemetet, amikor véglegesítik; végül, a zombi inotify órák vagy esetek száma meghaladná a maximális meghatározott számot. ERDDAP™ Most már működik ez Java Bogár.
Továbbá, az inotify szálak száma szerepel a status.html weboldalon, így szemmel tarthatod annak használatát. Jellemzően, van 1 inotify szál per EDDGrid FromFiles és EDDTable FromFiles adatkészlet.
    * Hibajavítás: sok helyen a hiba újraindítása helyett egy új hiba jött létre, amely csak egy rövid verziót tartalmazott az eredeti hibaüzenet és a stack nyomkövetés nélkül. Most, amikor egy új hiba keletkezik, ez megfelelően tartalmazza a teljes eredeti kivétel például, dobja új Exception ("néhány új üzenet", e) ;
Susan Perkinsnek köszönhetően.
    * Hibajavítás: egészen mostanáig (V1.64?) , ha a... / datasetID URL-t kértek, ERDDAP™ az URL-hez egy html-t adna. V1.64-ben ez nem sikerült. (Helytelenül formázott URL jött létre, majd nem sikerült) . Most újra működik. Hála Chris Fullilove-nak.

## Változat 1.64{#version-164} 
 (released 2015-08-19) 

*    **Új jellemzők (felhasználók számára) :** 
    * Most már van útmutatás a jelszóval védett privát ERDDAP™ adatkészletek ( https:// ) al curl és Python . Lásd a [ curl ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl) és [ Python ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python) utasítások.
Hála Emilio Mayorgának a NANOOS-tól és Paul Janeceknek a Spyglass Technologies-tól.
         
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    *    ERDDAP™ Most kell Java 1.8 +.
         Java 1.7 [élet vége](https://www.oracle.com/technetwork/java/eol-135779.html)   (nincs több biztonsági frissítés) 2015 áprilisában. Ez a verzió a ERDDAP™ nem működik a verziók Java 1,8 alatt. Ha frissíti a Java 1, 7x (vagy korábban) , akkor is frissíteni Tomcat. Lásd a [ ERDDAP™ Útmutató beállítása](/docs/server-admin/deploy-install) linkek és tanácsok letöltéséhez.
    * Új adatszolgáltatói űrlap.
Amikor egy adatszolgáltató felkeresi Önt abban a reményben, hogy az Ön ERDDAP™ , nehéz és időigényes lehet összegyűjteni az összes metaadatok szükséges hozzáadása az adatkészlet ERDDAP . Számos adatforrás (például .csv fájlok, Excel fájlok, adatbázisok) nincs belső metaadata, így ERDDAP™ új adatszolgáltatói űrlappal rendelkezik, amely az adatszolgáltatótól származó metaadatokat gyűjt, és az adatszolgáltatónak más útmutatást is nyújt, beleértve az adatszolgáltatókra vonatkozó kiterjedt útmutatást is. A benyújtott információk átalakulnak a datasets.xml formátum, majd e-mailben a ERDDAP™ adminisztrátor (Ön) és írott (Melléklet) bigParentDirectory / log / dataProviderForm.log. Így a forma félig automatizálja a folyamatot, hogy egy adatkészlet ERDDAP™ , de a ERDDAP™ Az adminisztrátornak még ki kell töltenie a datasets.xml chunk és foglalkozik a szerzés az adatfájl (sz) a szolgáltatótól vagy az adatbázishoz való csatlakozástól. További információkért lásd a [Adatszolgáltató Formaleírás](/docs/server-admin/datasets#data-provider-form) .
    * Új&lt;matchAxisNDigits &gt;
használható EDDGrid FromFiles (és így a NcFiles és a MergeIRFiles) , EDDGrid AggregateExisting Dimension, EDDGrid Vettem, és EDDGrid SideBySide adatok annak meghatározására, hogy pontosan egyenlő a tengely értékek a különböző fájlokat (hány számjegy) : 0 = nincs ellenőrzés (Ne használd ezt&#33;) , 1- 18 a pontosság növelésére, vagy 20 (alapértelmezés) A pontos egyenlőségért. n = 1- 18, ERDDAP™ biztosítja, hogy a kettős értékek első n számjegye (vagy (n + 1) 2. ágazat: úszó értékek) egyenlő.
        &lt;matchAxisNDigits &gt; helyettesíti&lt;Az AxisValuesAreEqual &gt;, amely most deprected. A "true" értéke "matchAxisNDigits = 20 lesz. A" false "értéke (Ne csináld ezt&#33;) lesz átalakítva, hogy megfeleljen AxisNDigits = 0.
    *    EDDGrid FromFiles és EDDTable FromFiles lesz tölteni nagyon lassan az első alkalommal használja ezt a verziót a ERDDAP .
         ERDDAP™ Most egy kicsit másképp tárolja a belső fájlinformációkat, ezért mindegyik adatkészlet belső adattábláját újra kell építeni. Szóval ne aggódj. Semmi baj. Egyszeri alkalom.
    * Távoli forrásfájlok
         EDDGrid FromNcFiles, EDDTableFromNcFiles, EDDTableFromNcCFFiles most lehetővé teszi, hogy a fájlok távoli fájlok legyenek egy könyvtárba hozzáférhető http://   (és valószínűleg https:// és ftp: / /, de nem tesztelt) ha a távoli kiszolgáló támogatja [Kérések tartománya](https://en.wikipedia.org/wiki/Byte_serving) a megkeresési fejlécben. Az Amazon azt állítja, hogy a LuxOpCo által a LuxOpCo-nak nyújtott, a LuxSCS-nek nyújtott, a LuxSCS-nek nyújtott, a LuxSCS által a LuxSCS-nek nyújtott, a LuxSCS-nek nyújtott, a LuxSCS-nek nyújtott, a LuxSCS-nek nyújtott, a LuxSCS-nek nyújtott, a LuxSCS-nek nyújtott, a LuxSCS-nek nyújtott, a LuxSCS-nek nyújtott, a LuxSCS-nek nyújtott, a LuxSCS-nek nyújtott, a LuxSCS-nek nyújtott hiteleket, a LuxSCS-nek nyújtott, a LuxSCS-nek nyújtott, a LuxSCS-nek és a LuxSCS-nek nyújtott szolgáltatások kivételével. Hyrax Nem. Ez a rendszer lehetővé teszi, hogy hozzáférjen az adatokhoz távoli fájlokban anélkül, hogy letöltené a fájlokat (ami hasznos, ha a távoli fájlok túl terjedelmesek) , de a hozzáférés ezekhez a fájlokhoz sokkal lassabb lesz, mint a helyi fájlokhoz való hozzáférés, vagy akár egy távoli OPeNDAP forrás.
Ez magában foglalja a következőket: "files" Amazon S3 vödör, mivel ezek hozzáférhetők a http:// . Ha az S3 objektum neve olyan, mint a fájlnevek (Belső / 's, mint egy Linux könyvtárfa) , ERDDAP™ a fájlok elérhetõvé válhatnak ERDDAP s "files" rendszer. Ahhoz, hogy ez működjön, az S3-nak ~ / .aws / mandátumban kell lennie (Linux, OS X vagy Unix) vagy C:\\ Felhasználók\\ USERName\\ .aws\\ mandátumok (Windows) a szerveren ERDDAP . Lásd a [A LuxOpCo-nak a LuxOpCo-val kötött szerződésekből származó bevételei](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1) .
    * GenerateDatasets Xml egy új, szokatlan lehetőség: EDDsFromFiles.
Ez átmegy egy fájlrendszeren (még egy távoli rendszer, mint egy Amazon S3, ha a tárgyak fájlszerű nevek) és létrehozza a datasets.xml Darabok egy sor adatkészlethez. A kilométere változhat. Ez jól működik, ha a fájlokat úgy szervezték, hogy az összes adatfájl egy adott könyvtárban (és alkönyvtárai) alkalmasak egy adatkészletre (pl. minden SST 1 napos kompozit) . Egyéb (például, ha egy könyvtár tartalmaz néhány SST fájlt és néhány klorofill- a fájlt) Ez rosszul működik, de még hasznos lehet.
    * Programozók: új / lib .jar fájlok.
Ha összeállít ERDDAP™ , kérjük, vegye figyelembe az új .jar fájlokat a classpath -cp paraméterben felsorolt ERDDAP™   [Programozó útmutató](/docs/contributing/programmer-guide) .
    * tenger\\ _ víz\\ _ gyakorlati\\ _ sótartalom
Ha a CF standard Sea\\ _ water\\ _ salainity nevet használja bármilyen változóhoz, arra biztatom, hogy váltson a Sea\\ _ water\\ _ practical\\ _ salinity-re, amely elérhető [a CF Standard Name Table 29. verziója](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)   (és néhány korábbi verzió -- nem tudtam, hogy) . Ez a név azt jelzi, hogy ez valóban gyakorlati sótartalom Practical Salinity Units   ( PSU ) , szemben az idősebb g / kg értékkel. A kanonikus egységek különbözőek, de még mindig hihetetlenül haszontalanok: 1 (Feltehetően PSU / PSS- 78) , szemben az 1e3-mal (feltételezhetően g / kg-ot jelent) tengeri\\ _ víz\\ _ sótartalom. \\[ Hé, Unidata és CF: Más skálákat, például Fahrenheit-et vagy Celsius-t használó értékeket azonosítunk egy egység sztring segítségével, amely a skála neve vagy valamilyen variáció. Miért nem tudjuk azonosítani a sótartalom egységeket a skálájukon keresztül, például PSS- 78? Tudom, hogy a PSS- 78 értékek "unitless", de van egy implicit skála, nem? Ha feltalálok egy új gyakorlati sótartalom skálát, ahol az értékek 0,875 szorozva a PSS- 78 értékekkel, akkor a kanonikus egységek továbbra is "1" -esek legyenek? Hogy tudná egy felhasználó megkülönböztetni őket? Egységek 1e3 és 1 nem leíró és hasznos a felhasználók, akik próbálják kitalálni, mit mutatnak a számok. \\] 

## változat{#version-162} 
 (released 2015-06- 08) 

*    **Új jellemzők (felhasználók számára) :** 
    * A EDDGrid datasets, users can now make Graph Type: Surface grafikonok bármilyen kombinációja numerikus tengelyek, nem csak a hosszúság versus szélesség. Ez lehetővé teszi, hogy x versus y (előrejelzés) grafikonok és különböző [Hovmöller diagramok](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram) például hosszúsági és mélységi ábrázolás, vagy idő kontra mélység. \\[ Megjegyzés: ha a mélység az Y tengelyen van, akkor valószínűleg a kívánt értékhez lesz igazítva. Sajnálom, még nem lehet kikapcsolni. \\] Hála Cara Wilsonnak és Lynn DeWittnek.
    * Van egy új [Oceanic / Atmospheric Accronym Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html) amely lehetővé teszi, hogy a közös óceáni / atmoszféra rövidítés egy teljes név.
    * Van egy új [Óceán / atmoszféra Változó névátalakító](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html) amely lehetővé teszi, hogy egy közös oceanic / atmoszféra változó nevet egy teljes név / -ból konvertálj.
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    *    Java 7 / 8
         Oracle már nem támogatja (biztonsági hibajavításokat biztosít)   Java 7. ERDDAP™ még mindig támogatja Java 7, de kérem, menjen a Java 8. A következő kiadás ERDDAP™ valószínűleg szükséges lesz Java 8.
    *    valid\\_min / max / tartomány
Korábban és most, ha dataVariable volt scale\\_factor és add\\_offset metaadatok, ERDDAP™ kipakolja az adatértékeket, és eltávolítja azokat a metaadatokat. Korábban... ERDDAP™ nem módosította / csomagolta ki valid\\_range , valid\\_min , valid\\_max metaadatok (amely általában / csomagolt értékeket tartalmaz) a scale\\_factor és add\\_offset . Most már igen. Keresse meg a ERDDAP™ az "érvényes\\ _" kifejezéshez, és győződjön meg arról, hogy az összes változót valid\\_range , valid\\_min vagy valid\\_max van a helyes értékeket, amikor az adatok jelennek meg az új verzió ERDDAP . Lásd [ valid\\_range / perc / max dokumentáció](/docs/server-admin/datasets#valid_range) .
    * ACDD- 1.3
Korábban... ERDDAP™   (különösen az GenerateDatasets Xml) az eredeti (1, 0) a [ NetCDF Attribútum-egyezmény a Dataset Discovery számára](https://wiki.esipfed.org/ArchivalCopyOfVersion1) amelyre " Unidata Dataset Discovery v1.0 "a globális egyezményekben és Metadata\\_Conventions jellemzők. Javasoljuk [ACDD 1.3. változat](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) amelyet 2015 elején ratifikáltak, és "ACDD -1.3" -ként hivatkoznak Szerencsére az ACDD- 1.3 nagymértékben visszafelé kompatibilis az 1.0 verzióval. Javasoljuk, hogy [ACDD- 1, 3](/docs/server-admin/datasets#switch-to-acdd-13) . Nem nehéz.
    * GenerateDatasets Xml attribútumok
A&lt; addAttributes &gt; az GenerateDatasets által javasolt értékek Xml a globális egyezmények esetében, creator\\_name / email / url, kulcsszavak, összefoglaló, és cím attribútumok és a változó long\\_name attribútum. Néhány módosítás az ACDD- 1.3. új használatához kapcsolódik
    * EDDTableFrom SOS adatkészletek
Alkalmanként új típusú SOS szerverek és változások a régi szerverek, egyre nehezebb ERDDAP™ automatikusan észlelni a szerver típusát a kiszolgáló válaszaiból. [&lt;sosServerType &gt;] (/ docs / server- admin / datasets # eddtable from sos- skeleton- xml)   (IOOS\\ _ NDBC, IOOS\\ _ NOS értékkel, OOSTethys , vagy WHOI) Most már erősen ajánlja. Ha bármelyik ilyen típusú adatállományának problémái vannak az új verzióban ERDDAP , próbálja újra futtatni GenerateDatasets Xml SOS szerver generálni egy új darab datasets.xml az adatra. GenerateDatasets Xml lehetővé teszi, hogy kipróbálja a különböző&lt;sosServerType &gt; opciók, amíg meg nem találod az adott szerver megfelelőjét. Ha még mindig vannak problémái, kérem, tudassa velem, hogy mi a probléma, és a kiszolgáló URL-je, és megpróbálok segíteni.
    * EDDTableFromFileName adatkészletek
Néhány attribútum, amit javasoltak addAttributes Most már a sourceAttriumok. Valószínűleg semmit sem kell megváltoztatnod a meglévő adataid miatt. datasets.xml .
    * A hibajavítás az EDDTableFromNcCFFiles adataihoz kapcsolódó bizonyos kérésekhez kapcsolódik.
Az alapul szolgáló módszerek meglévő nagy számú egységvizsgálatához is hozzáadtam egy sor egységvizsgálatot. (100 forgatókönyv van.) . Eli Hunternek köszönhetően.
    * A hibajavítás / kis változtatások EDDGrid FromMergeIr.
Jonathan Lafite-nak és Philippe Makowski-nak köszönhetően
    * A hibajavítás: EDDGrid A FromErddap akkor is működik, ha egy távoli adatnak nincs ioos\\_category változó tulajdonságok.
Hála Kevin O 'Briennek.
    * Hibajavítás a .graph weboldalon EDDGrid adatkészletek, ha csak egy tengely változó több mint egy érték.
Hála Charles Carletonnak.
    * Voltak más kis fejlesztések, változások, és hibajavítások.

## változat{#version-160} 
 (kiadás dátuma: 2015-03-12) 

*    **Új jellemzők (felhasználók számára) :** nincs
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * STRONGLY AJÁNLVA: Frissítse a szerver [robots.txt](/docs/server-admin/additional-information#robotstxt) a következőket tartalmazó fájl:
Kibocsátó: / erddap / files /
    * A probléma bejelentése és megoldása:
Linux számítógépeken, ha használod&lt;updateEveryNMillis &gt; a típus adataival = EDDGrid FromFiles, EDDTableFromFiles, EDDGrid Másolás, EDDTableCopy, vagy alosztályok, láthat egy problémát, ha egy adatkészlet nem betölti (esetenként vagy következetesen) A hibaüzenet: "IOException: User limit of inotify inotify accreded or too many open files". Ha igen, megoldhatod ezt a problémát, ha felhívod (gyökér) :
echo fs.inotify.max\\ _ user\\ _ watches = 65536 | tee - a / etc / sysctl.conf
echo fs.inotify.max\\ _ user\\ _ cases = 1024 | tee - a / etc / sysctl.conf
sysctl - p
Vagy használj nagyobb számokat, ha a probléma továbbra is fennáll. Az alapértelmezés 8192 óra. Az esetek alapértelmezett értéke 128. \\[ UPDATE: Van egy hiba Java ami miatt nem gyűjtik össze az inotizáló eseteket. Ez a probléma elkerülhető ERDDAP™ v1.66 és magasabb. Tehát a jobb megoldás az, hogy váltsunk a legújabb verzió ERDDAP . \\] 
    * NoSuchFileException A hibajavítás:
Volt egy hiba, ami olyan típusú adathalmazokat okozott, EDDGrid FromFiles, EDDTableFromFiles, EDDGrid Másolás, EDDTableCopy, vagy azok alosztályok, hogy ne töltsön alkalmanként a hiba "NoSuchFileException: _ someFileName _". A hiba a FileVisitor használatához kapcsolódik, és a ERDDAP™ v1.56. A probléma ritka, és nagy valószínűséggel befolyásolja az adatkészleteket, ahol számos gyakran változó adatfájl található.
    * Volt néhány apró javítások, változások, és hibajavítások.

## változat{#version-158} 
 (released 2015-02-25) 

*    **Új jellemzők (felhasználók számára) :** 
    * Az új [ "files" ](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) a rendszer lehetővé teszi a virtuális fájlrendszer böngészését és a forrásadatok letöltését sok fájlból ERDDAP™ adatkészletek. A "files" a rendszer alapértelmezés szerint aktív, de ERDDAP™ Az adminisztrátorok letilthatják, ha
```
        <filesActive>false</filesActive>  
```
az ERDDAP™ Setup.xml fájl. Külön köszönet Philippe Makowskinak, aki kitartott mellettem, amikor lassan értékeltem ennek az ötletnek a szépségét.
    * időpont Max... Korábban az EDDTable időváltozója, közel valós idejű adatokkal, a NaN sorrendjeMax volt, ami azt jelentette, hogy az adatkészlet maximális időértéke friss, de nem pontosan ismert és gyakran változik. Nos, a DestinationMax-nek van egy valós értéke, ami a legutóbb ismert. Számos adatkészlet folyamatosan frissítette az adatokat. ERDDAP™ támogatja a legújabb adatokhoz való hozzáférést, még akkor is, ha az a legutóbbi ismert után történt. Megjegyzés: az új [&lt;updateEveryNMillis &gt;] (/ docs / server- admin / datasets # updateevernmillis) támogatás EDDGrid FromFiles és EDDTable FromFiles adatok frissítik az időváltozó destinationMax. A változás másik következménye, hogy datasetID = allDatasets az adatkészlet most tartalmazza a jelenleg ismert utolsó alkalommal a maxTime oszlopokban. Hála John Kerfootnak.
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * STRONGLY AJÁNLVA: Frissítse a szerver [robots.txt](/docs/server-admin/additional-information#robotstxt) a következőket tartalmazó fájl:
Kibocsátó: / fájlok /
Kibocsátó: / erddap / files /
    * Minta datasets.xml -- Tavaly számos kiváló adatkészletet ajánlottunk a parti őrségnek ERDDAP™ amit hozzá tudna adni a ERDDAP™ csak hozzá néhány sort a datasets.xml . Ha hozzáadjuk az erdVH adatkészleteket, kérjük váltsunk az újabb erdVH2 adatkészletekre:
        * Készíts egy másolatot az erdVH adatállományokról és változtasd meg a másolatot datasetID az erdVH-tól az erdVH2-ig... és a hivatkozott sourceUrl az erdVH-tól az erdVH2-ig....
        * Állítsa be az erdVH... adatkészleteket aktív = "hamis".
    * Valamennyi EDDGrid FromFiles és EDDTable FromFiles alosztályok most támogatja [&lt;accessibleViaFiles &gt;] (/ docs / server- admin / datasets # accessibleviafles) a forrásadat-fájlok hozzáférhetővé tétele a "files" rendszerek. Alapértelmezés szerint ez a rendszer minden adatkészlet esetében kikapcsolt. Meg kell adni a címkét, hogy lehetővé tegye. Hála Philippe Makowskinak.
    * Valamennyi EDDGrid FromFiles és EDDTable FromFiles alosztályok most támogatja [&lt;updateEveryNMillis &gt;] (/ docs / server- admin / datasets # updateevernmillis) . Alapértelmezés szerint ez a rendszer minden adatkészlet esetében kikapcsolt. Meg kell adni a címkét, hogy lehetővé tegye. Hála Dominic Fuller- Rowell-nek és az NGDC-nek.
    * Az új [EDDTableFromFileNames](/docs/server-admin/datasets#eddtablefromfilenames) létrehoz egy adatkészletet a szerverfájlrendszerben található fájlok egy csoportjáról, de nem szolgáltat adatokat a fájlokból. Például ez hasznos a képfájlok, audio fájlok, videó fájlok, szavak-feldolgozó fájlok és táblázatfájlok gyűjteményeinek terjesztéséhez. Ez működik kéz a kézben az új [ "files" ](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) rendszer, hogy a felhasználók letölthessék a fájlokat. Külön köszönet Philippe Makowskinak, aki kitartott mellettem, amikor lassan értékeltem ennek az ötletnek a szépségét.
    * Az új [ EDDGrid FromedDTable](/docs/server-admin/datasets#eddgridfromeddtable) lehetővé teszi, hogy a táblázatos adatállományt rácsozott adatmá alakítsuk. Hála az Ocean Networks Kanadának.
    * Az új [ EDDGrid FromMergeIRFiles](/docs/server-admin/datasets#eddgridfrommergeirfiles) a helyi MergeIR-csoport aggregált adatai .gz fájlok. EDDGrid FromMergeIRFiles a különbség, hogy az első darab kód hozzájárult ERDDAP . A segítségünk nélkül történt. Háromszoros hurrá és különleges köszönet Jonathan Lafite-nak és Philippe Makowski-nak az R.Tech Engineering-től.
    * Van egy új, opcionális setup.xml címke,&lt;unitTestDataDir &gt;, amely meghatározza a könyvtárat az egység vizsgálati adatfájlokkal, amelyek egy új GitHub adattáron keresztül elérhetők: [ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest) . Például:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
Ez még nem hasznos, de része annak a lépésnek, hogy minél több egység tesztet futtatni más emberek által lehetséges. Hála Terry Rankinenek.
    * Sok apró javítások, változások és hibajavítások voltak.

## változat{#version-156} 
 (Közzétéve 2014- 12- 16) 

*    **Új jellemzők (felhasználók számára) :**   (Nincs) 
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * Valószínűleg már tudod, hogy [ EDDGrid FromErddap](/docs/server-admin/datasets#eddfromerddap) és [EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap) amely lehetővé teszi, hogy linket az adatok más ERDDAP és jelenjen meg a ERDDAP . A felhasználóknak az ilyen adatállományokból származó tényleges adatokat láthatatlanul a forráshoz kell eljuttatniuk ERDDAP™ Így az adatok nem áramlanak át a rendszerén, és nem használják a sávszélességet. A mintában az ajánlott adatkészletek nagy listája található. datasets.xml in erddapContent .zip . Hogy belevegye őket az Ön ERDDAP™ , Csak annyit kell tennie, hogy másolja és illessze be azokat, amiket akar datasets.xml . Hála Conor Delaney-nek.
    * Ha összeállít ERDDAP™ - Hozzá kell adnod valami újat. üveg fájlok az Ön [classpath -cp kapcsoló](/docs/contributing/programmer-guide#development-environment) Javac és Java számára.
    * Az új [EDDTableFromCassandra](/docs/server-admin/datasets#eddtablefromcassandra) kezeli az adatok megszerzését [Cassandra](https://cassandra.apache.org/) . Hála az Ocean Networks Kanadának.
    * Az új [EDDTableFromColumnarAsciiFiles](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles) kezeli a rögzített szélességű oszlopokkal rendelkező ASCII adatállományokból származó adatok megszerzését. Hála Philippe Makowskinak.
    * Valamennyi EDDGrid FromFiles és EDDTable FromFiles alosztályok most egy új módszert használ, FileVisitor (hozzáadva Java 1, 7) információt gyűjteni az aktákról. Ez nem lehet előnyös az első gyűjtése fájlinformációk egy adott adatkészlet, de úgy tűnik, hogy egy hatalmas előnye a későbbi összejövetelek, ha hamarosan, míg a OS még mindig tárolja az információt. Hála az NGDC-nek.
        
Még mindig javasoljuk: Ha egy adatkészlet nagy számú fájlt (pl. &gt; 1000) , az operációs rendszer (és így EDDGrid FromFiles és EDDTableFromFiles) sokkal hatékonyabban fog működni, ha a fájlokat alkönyvtárakban tárolja (évente egy vagy havonta egy adatkészlet nagyon gyakori fájlokkal) , hogy soha nem sok fájlok egy adott könyvtárban.
        
    * Számos kis fejlesztések EDDTableFromAsciiFiles.
    * Az EDDTableFromAsciiServiceNos javításai, nevezetesen azért, hogy a forrástól további információkat kapjunk. Lynn DeWitt-nek köszönhetően.
    * Néhány kis hibajavítás az ISO 19115 szerint ERDDAP™ generál. Hála Anna Milánónak.

## Változat 1.54{#version-154} 
 (kiadás dátuma: 2014- 10- 24) 

*    **Új jellemzők (felhasználók számára) :** 
    * Egyes változók most már az idő a milliszekundum pontosság, például, 2014-10- 24T16: 41: 22.485Z. Hála Dominic Fullernek, Rowell.
*    **Kis változások / hibajelzés:** 
    * hibajavítás: a körülmények bizonyos kombinációjával, EDDGrid A FromNcFile adatkészletei csökkentett pontossággal szolgáltattak adatokat (például a páros helyett úszó) . Ez csak a 8-nál nagyobb értékű adatértékeket érintheti. Elnézést. (És ez egy klasszikus számítógépes programozási hiba volt: egy rossz karakter.) Hála Dominic Fullernek, Rowell.
    * Sok apró változás.
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * A griddap adatkészletek most támogatják az időbélyegző tengelyváltozókat és adatváltozókat (azaz, változók időértékek, de a destinationName nem "time" ) . Hála Dominic Fullernek, Rowell.
    *    ERDDAP™ most megfelelően támogatja milliszekundum time\\_precision "1970- 01- 01T00: 00: 00.000Z". Egy szándékos furcsaság: amikor az idők emberközpontú fájlokba íródnak (például .csv, .tsv , .json , .xhtml ) , ERDDAP™ használja a meghatározott time\\_precision ha másodperceket és / vagy tizedesjegyeket tartalmaz; egyébként másodperceket használ time\\_precision "1970- 01- 01T00: 00: 00Z" (a következetesség és a visszafelé való kompatibilitás érdekében) . Hála Dominic Fullernek, Rowell.
    *    EDDGrid FromNcFiles most támogatja az olvasást String dataVariable c.
    *    .nc fájlokat írt griddap most már String dataVariable c.
    * GenerateDatasets Az Xml most több öblítést tartalmaz () hívások, hogy elkerüljék a problémát az információ nem írt a fájlokat. Thierry Valerónak köszönhetően.
    * Az GenerateDatasetsXml dokumentációja javításra került, nevezetesen, hogy rámutassunk arra, hogy az -i kapcsoló csak akkor működik, ha megadjuk az összes választ a parancssorban (például script mód) . És a forgatókönyv mód meg van magyarázva. Thierry Valerónak köszönhetően.
    *    ERDDAP™ már nem teszi lehetővé két változó egy adatkészlet, hogy ugyanaz sourceName . (Ha valaki korábban tette, valószínűleg hibajelentésekhez vezetett.) Mint korábban, ERDDAP™ nem teszi lehetővé két változó egy adatkészlet, hogy ugyanaz destinationName .

## változat{#version-152} 
 (kiadás dátuma: 2014- 10- 03) 

*    **Új jellemzők:**   (nincs) 
*    **Kis változások / hibajelzés:** 
    * Egy másik (kisebb) változtatás ERDDAP™ Gyorsabban.
    * Javítás az ISO 19115 fájlok által generált ERDDAP : újonnan javasolt&lt;gmd: protokoll & gt; értékek (információ, keresés, OPeNDAP : OPeNDAP , ERDDAP : griddap, és ERDDAP : tabledap ) belül&lt;gmd: CI\\ _ OnlineResource & gt;. Hála Derrick Snowdennek és John Maurernek.
    * Sok apró változás.
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * Bugfix: GenerateDatasetsXml.sh és DasDds.sh nem volt erddap.war 1.48 és 1.50. Most már igen. Thierry Valerónak köszönhetően.
    * Kis változások néhány sebesség vizsgálatok TestAll, hogy kevésbé érzékeny a véletlenre. Hála Terry Rankinenek.

## Változat 1.50{#version-150} 
 (kiadás dátuma: 2014.-09-06) 

*    **Új jellemzők:**   (nincs) 
*    **Kis változások / hibajelzés:** 
    * Ez ERDDAP™ Sokkal gyorsabbnak kell lennie, mint a legutóbbi verziók.
*    **Dolgok ERDDAP™ Administrators need to know and do:**   (Semmi.) 

## változat{#version-148} 
 (kiadás dátuma: 2014.-09-04) 

*    **Új jellemzők:** 
    *    ERDDAP™ Most mindig létrehoz egy táblázatos adatlapot, datasetID = allDatasets , amely egy táblázat információt az összes adatkészlet ebben ERDDAP . Megkérdőjelezhető, mint bármely más táblázatos adatkészlet. Ez a jelenlegi rendszer hasznos alternatívája az adatkészletekkel kapcsolatos információk programosan történő beszerzésére.
    * Két új kimeneti fájltípus van az EDDTable-hez és EDDGrid , .csv0 és .tsv 0. Ezek comma- and tab- separated-value fájlok, amelyek nem tartalmaznak sorokat oszlopnevekkel vagy egységekkel. Az adatok az első sorban kezdődnek. Ezek különösen hasznos szkriptek, hogy csak egy darab információt ERDDAP .
*    **Kis változások / hibajelzés:** 
    * Térképek készíthetők a -720-720-as tartományban.
    * Az új .nc ml válasz File Type elérhető mindenkinek EDDGrid adatkészletek. Visszaadja a [NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html) \\ - az adatkészlet formázott leírása (hasonló a .dds + .das kombinációhoz) .
    * hibajavítás: táblázatos adatok mentése egy .nc a fájl változónként 100 000 értékre korlátozódott. Most már csak 2 GB teljes fájlméret. Hála Kevin O 'Briennek.
    * A hibajavítás: a mentességek Matlab a módszerek biztosítják, hogy datasetID s biztonságos lesz Matlab változó nevek. De még mindig erősen ajánlom, hogy hozzon létre datasetID s, amelyek érvényes változó nevek: kezdve egy betűvel, majd csak az A-Z, a-z, 0-9 és\\ _. Lásd [ datasetID ](/docs/server-admin/datasets#datasetid) . Hála Luke Campbell-nek.
    * Az EDDTableFromDatabase hibajavítása: Bizonyos típusú adatbázisokkal, NO\\ _ Az adatbázisból származó adatválasz értelmetlen 30 másodperces késéshez vezetett ERDDAP . Hála Greg Williamsnek.
    * A hibajavítás: EDDGrid Egy grafikont a grafikus típus = vonalak (vagy markerek vagy markerek és vonalak) Az x tengelyváltozót az időnek kell tekinteni. Most már bármelyik tengely lehet. Lynn DeWitt-nek köszönhetően.
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * STRONGLY AJÁNLOTT: Frissítés Java   
Ez a verzió a ERDDAP™ szükséges Java legalább 7, de Java 7 lesz eléri a végén az élet áprilisban 2015 (Hamarosan&#33;) Itt az ideje, hogy váltsunk Java 8. Java A 8-at erősen ajánljuk. I teszt Java 8. Megjegyzés: Java 6 2013 februárjában ért véget (Nincs több biztonsági hiba&#33;) .
    * STRONGLY AJÁNLOTT: Frissítés
Ha Tomcat-ot használ, kérjük, váltson a Tomcat legújabb verziójára. Tomcat 8 tervezett dolgozni Java 8.
    * " ERDDAP "már nem rövidítés. Most már csak egy név. Nem akarom, hogy a név kiemelje ERD . I want ERDDAP™ hogy kiemelje intézményét és adatait.
    * Kérlek. [testre ERDDAP™ telepítés az intézmény és az adatok kiemelésére](/docs/server-admin/deploy-install#customize) . Egy órányi munkával szép fejlesztéseket végezhetsz, ami örökké fog tartani.
    * In setup.xml, a&lt;Display DiagnosticInfo &gt; opció most mindig figyelmen kívül hagyja, és kezelni, mintha az érték hamis.
AJÁNLJA: Távolítsa el a&lt;displayDiagnosticInfo &gt; tag és kapcsolódó információk a setup.xml.
    * A setup.xml, az alapértelmezett&lt; drawLandMask &gt; volt "vége", de most "alatt", ami egy jobb általános alapértelmezés (jól működik az összes adatkészlet) .
    * A GenerateDatasetsXml.sh és DadDds.sh Linux szkriptek most bash-t használnak csh helyett, és a .sh. kiterjesztéssel rendelkeznek. Hála Emilio Mayorgának.
    * GenerateDatasets Xml és DasDds most létrehozza saját naplófájljait (GenerateDatasetsXml.log és DasDds.log) és kimeneti fájlok (GenerateDatasetsXml.out és DadDds.out) in _ bigParentDirectory _ / log /, and never put their results on the clipboard.
    * GenerateDatasets Xml most támogatja a -i parancssor paraméter, amely behelyezi a kimenetet a megadott fájlt egy megadott helyen. Lásd a [dokumentáció](/docs/server-admin/datasets#generatedatasetsxml) . Hála Terry Rankinenek.
    * EDDTableFromDatabase most támogatja&lt;Idézőjelek &gt;&lt;/ ColumnNameQuotes &gt;, érvényes értékekkel " (alapértelmezés) ", vagy semmi. Ez a karakter (ha van) az SQL lekérdezések oszlopneve előtt és után kerül felhasználásra. Különböző típusú adatbázisok, különböző módon, szükség lesz különböző oszlopnév idézőjelek.
    * Táblázati szélességi és hosszúsági változók most már testreszabott long\\_name például a profilszélesség. Az előző részek tartalmából:
    * Mostantól az adatkészlet globális metaadataiban (azaz,&lt;addatt &gt;), nem külön&lt;defaultDataQuery &gt; és&lt;defaultGraphQuery &gt; tags. (Habár, ha még mindig megadod őket a címkéken keresztül, ERDDAP™ automatikusan globális attribútumokat hoz létre az információval.) 

## változat{#version-146} 
 (kiadás dátuma: 2013.-07-09) 

*    **Új jellemzők:** 
    *    (Nincs) 
*    **Kis változások / hibajelzés:** 
    * hibajavítás: az EDDTableFromDatabase-ban, csak az 1.44-es verzióban, ERDDAP™ Helytelenül idézte az adatbázis táblázatának nevét SQL kimutatásokban. Ez már megoldódott. Hála Kevin O 'Briennek.
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    *    ** Ha nem módosítjuk a standard üzeneteket az üzenetekben.xml,
Törlés \\[ Nincs magyar neve \\] / tartalom / erddap / messages.xml. **   
Az alapértelmezett üzenet.xml fájl most az erddap. háborús fájl, nem erddapContent .zip . Tehát már nem kell manuálisan frissíteni az üzeneteket.xml.
    * Ha módosítjuk az üzeneteket.xml, mostantól, minden alkalommal frissíteni ERDDAP™ vagy:
        * Ugyanazokat a változtatásokat, mint korábban az új
             \\[ Nincs magyar neve \\] / Webapps / erddap / WEB- INF / class / gov / noaa / pfel / erddap / util / messages.xml.
És ez egyszer: törlés \\[ Nincs magyar neve \\] / tartalom / erddap / messages.xml.
        * Vagy találd ki, mi változott az új üzenetekben. (diff) , és módosítsa a
             \\[ Nincs magyar neve \\] / content / erddap / messages.xml fájl ennek megfelelően.

## változat{#version-144} 
 (kiadás dátuma: 2013.-05-30) 

*    **Új jellemzők:** 
    * Kérdések az EDDTable adatbázisokhoz orderBy Min (...) & orderByMinMax  (...)   (ami mindkét csoportban két sort ad vissza, az utolsó minimum és maximum orderBy érték) . Lynn DeWitt-nek köszönhetően.
    * Van két új tabledap fájltípusok: .nc CFHeader és .nc CFMAHeader (ami visszaadja a megfelelő .nc CF és .nc CFMA fájltípusok) . Hála Steve Hankinnek.
*    **Kis változások / hibajelzés:** 
    * hibajavítás: a sok időértékkel rendelkező adatkészletek .grafikus és .html weblapjainak betöltése lassú volt, mert ERDDAP™ lassú volt, amikor létrehozta az időcsúszós lehetőségeket. Most már mindig gyors. Hála Michael Barrynek, OOICI-nak és Kristian Sebastian Blalidnak.
    * A hibajavítás: Az EDDTable egyes adattípusaiban az időkorlátokat nem mindig megfelelően kezelték. Most már igen. Hála John Maurernek és Kevin O 'Briennek.
    * hibajavítás: az adatok nem töltődnek, ha az összes subsetVariables fix értékű változók voltak. Most fognak. Lynn DeWitt-nek és John Peterson-nak köszönhetően.
    * JAVASOLT: most, minden lekérdezés csak alset változók jár, mintha & elkülönítve () a lekérdezés része.
    * JAVÍTOTT: most, a lekérdezések, amelyek tartalmazzák a & .json p = _ functionName _, _ function Név _ KELL lennie egy sorozat 1 vagy több (periodelválasztott) szavak. Minden szónak ISO 8859 betűvel vagy "\\ _" betűvel kell kezdődnie, amelyet 0 vagy több ISO 8859 betűnek, számnak vagy "\\ _" -nek kell követnie. Igen, ez szigorúbb, mint Java A szkript követelményei a függvény neveire.
    * Az időtengely grafikonon most már jól működik hosszabb ideig (80 - 10000 év) és rövidebb időtartományok (0,003 - 180 másodperc) .
    *    ERDDAP™ most már megbocsátóbb, amikor az ISO- 8601 formátumú időadatok változatát dolgozza fel.
    * Sok más apró változás és hibajavítás volt.
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    *    **Frissítenie kell a legújabb verziót, hogy biztonságos legyen.**   
         ERDDAP™ biztonsági ellenőrzésen esett át. Voltak hibák és gyengeségek. Az 1.44-es verzió számos fontos biztonsági hibajavítást és a biztonság és a hozzáférhetőség növelését célzó változtatást tartalmaz (például látásromlás esetén) . Az 1.44-es verzió átment a biztonsági ellenőrzésen. Hála a jó embereknek a USGS-nél és az Acunetix-nél, akik ezt lehetővé tették. (Nem kellene. NOAA Ezt csinálod?) 
    * Az új [EDDTableFrom WFS Fájlok](/docs/server-admin/datasets#eddtablefromwfsfiles) helyi másolatot készít az összes adatról ArcGIS MapServer WFS szerver és így az adatok lehet majd újra-kiszolgáló gyorsan ERDDAP™ felhasználók. Hála Christy Caudillnek.
    * Az új [EDDTableFrom EDDGrid ](/docs/server-admin/datasets#eddtablefromeddgrid) lehetővé teszi, hogy hozzon létre egy EDDTable dataset EDDGrid Dataset. Ennek néhány közös oka:
        * Ez lehetővé teszi az adatkészlet lekérdezését OPeNDAP kiválasztási korlátok (amelyet a felhasználó kérhetett) .
        * Az adatkészlet eredendően egy táblázatos adatelem. Hála az OOICI-nak, Jim Potemrának, Roy Mendelssohn-nak.
    * A változó név "mélység" most egy speciális alternatívája a "magasság". Az egységek a "méter" valamilyen változatai lehetnek. Az adatértékeknek pozitívnak kell lenniük = lefelé. ERDDAP™ már teljesen tisztában van a "mélység" jelentésével, és támogatja azt, ahol a magasságot támogatják. (például CF DSG cdm\\ _ data\\ _ type = profile dataset összetevőjeként) . Az adatkészlet nem tartalmazhat "mélységet" és "magasságot" egyaránt.
    * Az Ön datasets.xml , kérjük távolítsa el a&lt;att name = "cdm\\ _ height\\ _ proxy" &gt; mélység&lt;/ att &gt; Mivel a mélység most már a magasság különleges alternatívája, ezért nem kell külön azonosítani.
    * Az Ön datasets.xml , kérjük távolítsa el a&lt;ortitude MetersPerSourceUnit &gt;, az EDDTable kivételével From SOS .
Ha az érték 1, csak törölje.
Ha az érték -1, fontolja meg a változó név mélységre történő megváltoztatását.
Más értékekhez hozzáadva&lt; addAttributes &gt;, például:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Minden adatkészlet támogatja
        
        *   &lt;defaultDataQuery &gt; amely akkor használható, ha a .html-t lekérdezés nélkül kérjük.
            * Valószínűleg ritkán lesz szükség erre.
            * A griddap adatkészletek esetében a közös használatuk az, hogy eltérő alapértelmezett mélység- vagy magassági dimenzióértéket határoznak meg. (például: \\[ 0 \\] helyett \\[ utolsó \\] ) .
Mindenesetre, mindig fel kell sorolni az összes változót, mindig ugyanazokat a dimenzióértékeket kell használni minden változóhoz, és szinte mindig \\[ 0 \\] , \\[ utolsó \\] vagy \\[ 0: utolsó \\] a dimenzióértékek esetében.
Például:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * A tabledap datasets, a leggyakoribb használata ennek az, hogy egy másik alapértelmezett időtartomány (a jelenhez képest, pl., & idő & gt; = now- 1 nap) .
Ne feledje, hogy nem kér adatokat változók ugyanaz, mint az összes adat változók, így általában csak meg kell adni az új időkorlát.
Például:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;defaultGraphQuery &gt;, amelyet akkor használnak, ha az .graph-ot kérés nélkül kérik.
            * Valószínűleg ritkán lesz szükség erre.
            * A griddap adatkészletek esetében a leggyakoribb, hogy az alapértelmezett mélység vagy a magasság dimenziójának értéke eltérő legyen. (például: \\[ 0 \\] helyett \\[ utolsó \\] ) és / vagy egy adott változó grafikonjának meghatározása.
Minden esetben, akkor szinte mindig használni \\[ 0 \\] , \\[ utolsó \\] vagy \\[ 0: utolsó \\] a dimenzióértékek esetében.
Például:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * A tabledap datasets, a leggyakoribb használata ennek a különböző grafikus változók, egy másik alapértelmezett időtartomány (a jelenhez képest, pl., & idő & gt; = now- 1 nap) és / vagy eltérő alapértelmezett grafikus beállítások (például jelölőtípus) .
Például:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

Ne feledje, hogy XML- kódolnia kell, vagy (vagy egy, de nem mindkettő.) az alapértelmezett lekérdezések, mivel azok egy XML dokumentumban vannak. Például, & amp; amp;,&lt;& amp; lt;, és &gt; lesz & amp; gt;.
És kérem, ellenőrizze a munkáját. Könnyű hibázni, és nem azt kapni, amit akarsz.
Hála Charles Carletonnak, Kevin O 'Briennek, Luke Campbellnek és másoknak.
    *    EDDGrid FromDap, EDDGrid FromErddap és EDDTableFrom EDDGrid új rendszerrel rendelkezik a gyakran változó adatkészletek kezelésére (olyan gyakran, mint durván minden 0,5 s) . Ellentétben ERDDAP a rendszeres, proaktív rendszer teljes újratöltése minden adatkészlet, ez a választható kiegészítő rendszer reaktív (a felhasználó kérésére) és növekményes (a frissítendő információk frissítése) . Például, ha a kérelem a EDDGrid FromDap dataset fordul elő több, mint a megadott számú milliszekundum óta az utolsó frissítés, ERDDAP™ Meglátjuk, van-e valami új érték a bal oldalon (általában "time" ) dimenzió és, ha igen, csak töltse le az új értékeket, mielőtt a felhasználó kérésének megfelel. Ez a rendszer nagyon jó abban, hogy a gyorsan változó adatkészlet naprakész legyen, minimális igényekkel az adatforrással szemben, de néhány felhasználói kérés feldolgozásának kis lelassulásával. Lásd [&lt;updateEveryNMillis &gt;] (/ docs / server- admin / datasets # updateevernmillis)   
Hála Michael Barry-nek és OOICI-nak.
    *    EDDGrid FromNcFiles, EDDTableFromNcFiles és EDDTableFromNcCFFiles [NcML .nc ml](/docs/server-admin/datasets#ncml-files) forrás fájlok helyett .nc fájlok. Hála Jose B Rodriguez Rueda-nak.
    * A EDDGrid AggregateExisting Dimension, ERDDAP™ támogatja egy új szerverType = "dodsindex" opció a szerverType attribútum&lt; sourceUrl s &gt; tag. Ez működik a weboldalak, amelyek listája fájlok belül&lt;pre- &gt;&lt;/ pre&gt; és gyakran a OPeNDAP logó. Példa erre: [ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html) .
    * Az EDDTableFrom esetében SOS Most egy opcionális címkét támogat
```  
        <sosServerType>_serverType_</sosServerType>  
```
így megadhatja a típusa SOS kiszolgáló (így ERDDAP™ Nem kell rájönnie.) . Érvényes értékek&lt;_ serverType _\\ & gt; are IOOS\\ _ NDBC, IOOS\\ _ NOS, OOSTethys és WHOI (újonnan támogatott kiszolgáló Típus) . Lásd [EDDTableFrom SOS ](/docs/server-admin/datasets#eddtablefromsos) . Hála Derrick Snowdennek és Janet Fredericks-nek.
    * Valamennyi EDDGrid A... fájlokból, az EDDTableFrom... fájlokból, EDDGrid Másolás és EDDTable Másolás most támogatja egy opcionális tag
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
amely meg tudja mondani ERDDAP™ a fájl megőrzése táblázat (az egyes forrásadatokkal kapcsolatos információkkal) memória helyett csak a lemezen (alapértelmezés) . A fájltábla memóriában tartása felgyorsítja az adatkérést (különösen, ha &gt; 1000 forrásadat-fájl van) De több emléket használ. Ha ezt igaznak állítod be bármilyen adathoz, tartsd szemmel az Memory-t: jelenleg a _ yourDomain _ sort használja /erddap/status.html annak biztosítása, hogy ERDDAP™ Még mindig rengeteg szabad memóriája van. Hála Fredrik Straynek.
    * EDDTableFromASCIIFiles most támogatja&lt;Charset &gt;. A két leggyakoribb charset (Az ügy kényes&#33;) ISO- 8859- 1 (alapértelmezés) és UTF- 8.
    * Ajánlott: in setup.xml, belül&lt;startHeadHtml &gt;, kérem, cserélje ki&lt;html &gt; be
        &lt;html lang = "en- US" &gt; (vagy más [nyelvkód](https://www.w3schools.com/tags/ref_language_codes.asp) ha lefordítottad az üzeneteket.xml) .
    * setup.xml új opcionális címkék letiltására részei ERDDAP :
        *   &lt;konvertersActive &gt; false&lt;/ átalakító aktív &gt;&lt;&#33; -- az alapértelmezés igaz -- &gt;
        *   &lt;slideSorterActive &gt; hamis&lt;/ slideSorterActive &gt;&lt;&#33; -- az alapértelmezés igaz -- &gt;
        *   &lt;wmsActive &gt; hamis&lt;/ wmsActive &gt;&lt;&#33; -- az alapértelmezés igaz -- &gt; Általánosságban azt javasoljuk, hogy ne állítsuk ezeket hamisnak.
    * GenerateDatasets Xml most ír eredményeket _ bigParentDirectory _ / log / generateDatasetsXmlLog.txt, nem log.txt. Hála Kristian Sebastian Blalidnak.
    * GenerateDatasets Xml most tesz egy jó javaslatot a&lt;újratöltés Minden perc &gt;. Hála a NOAA UAF projekt.
    * Sok kis fejlesztések GenerateDatasetsXml. Hála a NOAA UAF projekt.

## változat{#version-142} 
 (released 2012-11-26) 

*    **Új jellemzők:** 
    *    (Nincsenek új funkciók.) 
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * Ha Ön korszerűsíti ERDDAP™ 1.38 vagy 1.40, nem volt változás, ami szükségessé tette volna, hogy módosítsa a konfigurációs fájlokat (de az új üzenetet kell használni.xml fájl) .
    *    ERDDAP™ újra futhat Java 1.6. ( ERDDAP™ v1.40 szükséges Java 1.7.) Továbbra is erősen javasoljuk a legújabb verziót a Java 1.7.
    * új adatkészlet típusa, [EDDTableFrom AwsXmlFiles](/docs/server-admin/datasets#eddtablefromawsxmlfiles) , tud olvasni adatokat egy sor Automatikus Időjárás Állomás (AWS) XML adatfájlok. Hála Lynn Dewittnek és az Exploratoriumnak.
*    **Kis változások / hibajelzés:** 
    * Az NDBC módosításaihoz igazítva SOS forrásadat-szerverek.
    * A NOS COOPS ASCII szolgáltatások módosításához igazítva.
    * Számos apró változtatás és hibajavítás történt.

## változat{#version-140} 
 (released 2012- 10- 25) 

*    **Új jellemzők:** 
    * Van egy új kimeneti fájlformátum tabledap adatkészletek: .nc CFMA, amely a kért adatokat .nc a CF-nek megfelelő fájl [Diszkrét mintavételi geometria](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Többdimenziós tömblehetőségek, amelyek ezért megfelelnek a NODC sablonoknak \\[ 2021: most [NCII-sablonok](https://www.ncei.noaa.gov/netcdf-templates)  \\] az ilyen típusú adatok tárolására. Hála az NDC-nek.
    *    tabledap A kérelmek időkorlátokat is tartalmazhatnak, mint például az & idő &gt; now- 5 nap. Lásd a [dokumentáció](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) . Hála James Goslingnak.
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * Ha Ön korszerűsíti ERDDAP™ 1.38, nem volt olyan változás, amely szükségessé tette volna, hogy módosítsa a konfigurációs fájlokat (de az új üzenetet kell használni.xml fájl) .
    *    ERDDAP™ a közkiadások és a belső mérföldkövek elérhetők az alábbi címen: [ ERDDAP™ a GitHub-ról](https://github.com/ERDDAP) . További információkért lásd a [Wiki](https://github.com/ERDDAP/erddap/wiki) a következő szövegrész: ERDDAP™ projekt és általánosabb [ ERDDAP™ Programozó útmutató](/docs/contributing/programmer-guide) . (Ezt külön bejelentették néhány héttel a ERDDAP™ 1.38-as kiadás.) 
    * GenerateDatasets Az Xml javult.
        * A szkriptet felülvizsgálták, így minden Linux számítógépen megfelelően kell működnie. (nem csak néhány) .
        * Most már hozzáteszi: creator\\_name , creator\\_email , és creator\\_url ha lehetséges.
        * Sok más kis fejlesztések.
    * Hogyan finomított ERDDAP™ foglalkozik az idővel.
        * Belül, ERDDAP™ Most milliszekundum pontossággal kezeli az időt (nem másodperc) .
        * Most már opcionálisan megadhatja egy adott adatkészlet időpontosságát, lásd [ time\\_precision ](/docs/server-admin/datasets#time_precision) . Például beállíthat egy adatelemet, hogy az időértékeket dátumpontossággal jelenítse meg (Például, 1970- 01- 01) .
        * Az aktuális adatkészletei az alapértelmezett beállításokat fogják használni, így ezeket nem érintik ezek a változások, és az időt másodpercpontossággal fogják megjeleníteni. Köszönet Cizmelinek és Philip Goldsteinnek.
    *    [EDDTableFromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles) egy új dataset típus, amit használhat a datasets.xml akta. Elolvassa az adatokat a számos fájl formátumok által meghatározott [CF Diszkrét mintavételi geometria](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Konvenciók. Köszönet a NODC-nek, és külön köszönet Kyle Wilcox-nak, hogy mintafájlokat készített a nagy számú érvényes DSG fájlformátumhoz, és nyilvánosan hozzáférhetővé tette azokat.
*    **Kis változások / hibajelzés:** 
    * A [quickRestart](#quick-restart) rendszer minden releváns EDDGrid és EDDTable alosztályok.
    * Javított dokumentáció, különösen a felhasználás módjával kapcsolatban [graddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType) és [ tabledap ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType) különböző ügyfélszoftverek.
    * A minTime és / vagy a maxTime támogatása érdekében megváltozott a keresés epochondokban kifejezve. Lynn Dewitt-nek köszönhetően.
    * Megváltozott .htmlTable kimeneten megjeleníteni urls és e-mail címek linkként.
    * Hozzáadva a vonatkozó "rel =" és "rev =" értéket&lt;a href &gt; tags. Köszönet Pat Cappelaere-nek a OGC   REST projekt.
    * Javított védelem a nem realisztikusan nagy adatkérésekkel szemben, különösen tabledap ahol ez egy nehezebb probléma.
    * Több üzenetet küldött üzeneteknek.xml.
    * Sebességjavítások.
    * Rögzített EDDGrid FromFiles lehetővé teszi a csökkenő válogatott tengelyek. Hála Maricel Etchegaray-nak.
    * Eltávolított hivatkozások az iGoogle-ra, mivel abba fogják hagyni.
    * Számos apró változtatás és hibajavítás történt.

## változat{#version-138} 
 (kiadás dátuma: 2012-04-21) 

*    **Új jellemzők:** 
    * ISO 19115 és FGDC -- ERDDAP™ automatikusan generálhat ISO 19115 és FGDC XML metaadatokat minden adatkészlethez. A fájlokra mutató linkek az adatkészletek minden listáján láthatók. (pl. a teljes szöveges keresésből) és a webes elérhető mappák (WAF)   (lásd a [FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/) és [ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/) ) . Hála Ted Habermann-nek, Dave Neufeld-nek és még sok másnak.
    * Teljes szöveges keresések az adatbázisokhoz most a\\ - _ excludedWord _ és\\ - "_ kizárt kifejezés _". Hála Rich Signell-nek.
    * Az adatok keresése most egy oldalt ad vissza. Az alapértelmezett paraméter sztringet használja: page = 1 & itemsPerPage = 1000, de a kérés URL-jében megváltoztathatja az értékeket. Hála Steve Hankinnek és az UAF projektnek.
    *    OpenSearch -- ERDDAP™ most támogatja a [ OpenSearch 1, 1](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html) standard adatkészletek keresésére. Többek között, ez lehetővé teszi a katalógus aggregáció weboldalak csinálni megosztott keresések (a keresési kérelem továbbítása minden olyan katalógushoz, amelyről tud) .
    * Elválasztott vessző Érték (CSV) Akták... ERDDAP™ most CSV fájlokat generál egy vesszővel az értékek között (amelyet Excel előnyben részesít) vessző helyett. Hála Jeff DeLaBeaujardere-nek.
    * Millió Dataset... Számos változtatás történt a támogatás érdekében ERDDAP Rengeteg adatunk van, talán még egy millió is. Hála Steve Hankinnek és az UAF projektnek.
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
#### Gyors újraindítás{#quick-restart} 
*    [A](#quick-restart) a gyors újraindítás lehetővé teszi ERDDAP™ hogy sokkal gyorsabban újraindítsuk.
     **Ezt adja hozzá a setup.xml fájljához** rögtön utána.&lt;/ datasetsRegex &gt;:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * Az adatkészletek teljes szöveges keresése most már elvégezhető a Lucene keresőmotorral (bár javasoljuk az eredeti keresőmotor, ha kevesebb, mint 10 000 adatkészlet) vagy az eredeti keresőrendszer.
         **Ezt adja hozzá a setup.xml fájljához** rögtön utána.&lt;/ DisplayDiagnosticInfo &gt;:
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

    * A setup.xml, akkor / kell hozzáadni két új kategóriát a comma- elválasztott lista&lt; categoryAttributes &gt;:
        * globális: kulcsszavak (Hozzáadás közvetlenül a globális után: intézmény) -- egy új különleges eset, amely elválasztja a kulcsszavak listáját a globális kulcsszavak attribútumától, hogy minden kulcsszó külön legyen.
        * változó Név (Add hozzá a végén) -- egy új különleges eset, amely kategorizálja minden egyes dataVariable   destinationName c.
    * Setup.xml, akkor (De miért?) Mondd ERDDAP™ nem lehet FGDC és / vagy ISO 19115 metaadatokat kínálni semmilyen adatkészlethez,
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

A beállítások alapértelmezett értékei igazak.
    * In datasets.xml , kérem, fontolja meg a metaadatok javítását az adatkészletekhez. ERDDAP™ Most automatikusan létrehozza az ISO 19115 és az FGDC XML metaadatfájlokat minden adatkészlethez az adatkészlet metaadatai alapján.
Szóval, **jó adatkészlet metaadatok vezet jó ERDDAP -generált ISO 19115 és FGDC metaadatok.**   
         **Lásd a számos új AJÁNLOTT dokumentumot [Globális attribútumok](/docs/server-admin/datasets#global-attributes) .** 
    * In datasets.xml , if you wanna tell ERDDAP™ egy előre gyártott FGDC és / vagy ISO 19115 fájl használata, amely valahol a szerver fájlrendszerén van ahelyett, hogy ERDDAP™ generálja ezeket a fájlokat, használja:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Ha _ fullFileName _\\ = "vagy a fájl nem található, az adatkészletben nem lesz FGDC és / vagy ISO 19115 metaadat. Ez tehát akkor is hasznos, ha el akarjuk nyomni az FGDC és / vagy az ISO 19115 metaadatokat egy adott adatkészlethez.
    * In datasets.xml , mindenkinek EDDGrid SideBySide és EDDGrid Összefoglaló Létrehozási Dimenzió adatkészletek, győződjön meg arról, hogy a gyermek adatkészletek különböző datasetID a szüleik adatain és a többi gyereken kívül. (Például követhetnéd George Foreman egyszerű, de hatékony rendszerét, hogy elnevezd a gyerekeit.) Ha egy családban egy név pontosan ugyanaz, az adatkészlet nem fog betölteni (a hibaüzenettel, hogy az összesített tengely értékei nincsenek rendezett sorrendben) .
    * In datasets.xml , volt néhány változás a lista érvényes ioos\\_category metaadatok értékei:
        * A "pCO2" -t "CO2" -ra változtatták.
        * "Fizikai Oceanográfia" került beillesztésre.
        * "Talaj" lett hozzáadva.
    * In datasets.xml , ERDDAP™ már nem engedélyezi a "." -t datasetID . Megengedték, de elbátortalanították. (Sajnálom.) 
    * In datasets.xml , a beállítás EDDTableFromThreddsFiles és EDDTableFron Hyrax A fájlok kissé megváltoztak, mert mindkét osztályt átírták, hogy hatékonyabbak legyenek. (Most mindkét osztály helyi másolatot készít az összes távoli adatfájlról) . Lásd ezen osztályok felállításának dokumentációját: [EDDTableFrom Hyrax Fájlok](/docs/server-admin/datasets#eddtablefromhyraxfiles) és [EDDTableFromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles) . Különösen az alábbiakra vonatkozó felülvizsgált észrevételek&lt;fileDir &gt; (Most már lényegtelen.) és&lt; sourceUrl &gt; (Most már létfontosságú.) . Továbbá, soha nem kellene becsomagolni ezt az osztályt az EDDTableCopy hatékonyság.
    * In datasets.xml , ha az EDDTableFromDatabase-t a Oracle adatbázis, tartalmaznia kell egy kapcsolatot Tulajdonság, mint például
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
meg kell határozni, hogy hány sort kell egyszerre beszerezni, mert az alapértelmezett 10, ami borzasztóan nem hatékony. Lásd a [ Oracle dokumentáció](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm) . A MySql-nek és a PostgreSQL-nek ennél jobb alapértelmezései vannak. Hála Kevin O 'Briennek.
    * Ha EDDTableFromDatabase-t használ, nézze meg a javított ["Sebesség" dokumentáció](/docs/server-admin/datasets#eddtablefromdatabase) a teljesítmény javítására irányuló további javaslatok. Hála Kevin O 'Briennek.
    * In datasets.xml , minden EDDTable... adatkészletek, az egyezmények és Metadata\\_Conventions globális attribútumok, kérjük, olvassa el a CF- 1.6-ot (CF- 1, 0, 1, 1, 1, 1, 3, 1, 4 vagy 1, 5) , mivel a CF- 1.6 az első olyan változat, amely tartalmazza a diszkrét mintavételi geometriához kapcsolódó változásokat.
    * Programozók, amelyek a ERDDAP™ kód kell hozzáadni lib / lucene- core.jar a listához a javac és java parancssorokat.
    *    ERDDAP™ a [új szolgáltatás](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html) konvertálni egy CF standard név egy GCMD Science kulcsszó. Ezt akkor találhatja hasznosnak, ha globális kulcsszavakat hoz létre az adatkészletekhez az Ön ERDDAP .
    * Bot-okkal üzletelni... Kérjük, olvassa el ezt a tanácsot: [megakadályozza, hogy a robotok a ERDDAP™ Egy hülye módon.](/docs/server-admin/additional-information#robotstxt) .
    * Fordítás... A szöveg ERDDAP A weboldalak most többnyire az üzenetek.xml és így alkalmas a fordítás a különböző nyelvekre (pl. német, francia) . Az üzenetek most gyakran használja MessageFormat formázás, is segít a fordítások. Ha szeretne egy fordítást, kérjük, e-mailben erd dot data at noaa dot gov .
    * Minta datasets.xml -- Számos apró, de jelentős hiba volt a mintában datasets.xml . Ha használja ezeket az adatokat, kérjük, hogy az újabb verziókat az új minta datasets.xml az új erddapContent-ban .zip akta. Hála James Wilkinsonnak.
    * Git... I will try to make ERDDAP™ A GitHub projekt a kiadás után azonnal.
*    **Kis változások / hibajelzés:** 
    * Egy új paletta, OceanDepth, hasznos mélységi értékek (pozitív a csökkenés) például: 0 (sekély) 8000-től (mély) .
    * A .kml kimenet tabledap jobb jelölőikont használ (Nem homályos.) . És most, hogy egy filctoll fölött lebeg, még nagyobb lesz.
    * EDDTableFromFiles -- Az utolsó frissítés, az új netcdf- java könyvtár szigorúbb korlátozásokat változó nevek .nc fájlok. Ez okozott problémákat az EDDTableFromFiles, ha egy változó sourceName bizonyos írásjelek. EDDTableFromFiles most módosult, hogy elkerülje ezt a problémát. Thomas Holcomb-nak köszönhetően.
    * A .subset oldal most támogatja 0 / 10 / 100 / 1000 / 10000 / 100000 a kapcsolódó adatokra vonatkozó ellenőrző doboz helyett. Az eszköztipp figyelmezteti, hogy 100000 okozhat a böngésző összeomlik. Hála Annette DesRochersnek, Richard (Abe.) Coughlin, és az IOOS Biological Project.
    * ... / erddap / info / _ datasetID _ / index.html weboldalak most látható urls és e-mail címek kattintható linkek. Hála Richardnak. (Abe.) Coughlin és az IOOS Biological Project.
    * hibajavítás: in tabledap magasságú adatkészletek esetében MetersPerSourceUnit&lt;0, a magassági korlátokkal rendelkező lekérdezéseket helytelenül kezelték. Kyle Wilcox-nak köszönhetően.
    * A hibajavítás: EDDGrid AggregateFromExistingDimension most támogatja a változatosabb TDS URL. Hála?

## Változat 1.36{#version-136} 
 (kiadás dátuma: 2011-08-01) 

*    **Új jellemzők:** 
    * A felhasználó szempontjából nincs jelentős változás.
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * A pmelTao adatkészlet, amelyet gyakran használtak mintaadatként a tabledap   
a dokumentáció már nem áll rendelkezésre. ERDDAP™ Az adminisztrátoroknak a következő változtatásokat kell végrehajtaniuk:
        * Az Ön datasets.xml , ha datasetID = "pmelTao" adatkészlet, add
aktív = "hamis" közvetlenül a "&gt;" előtt a sor végén.
        * Ha Ön&lt;EDDTableIdPélda &gt; pmelTao, majd:
            * Ha datasets.xml nincs adatkészlete datasetID = "erdGlobecBottle", add
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * A setup.xml, cserélje ki az összes címkét&lt;EDDTableIdPélda &gt; keresztül
                &lt;EDDTable Matlab Példa és
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
                
    * Az olyan adathalmazok esetében, ahol a típus az EDDTableFromFiles alosztálya, most már metaadatok készíthetők.
Pontosabban, most már lehet, hogy egy változó az értékek egy attribútum az egyik eredeti változók.
Például: datasets.xml a&lt; dataVariable &gt; címke, ha használja
```
        <sourceName>variable:cruise:PI</sourceName>  
```
         ERDDAP™ Készít egy változót a hajóút-változó PI-attribútumának értékeivel.
Hála WOD-nak.
*    **Változások:** 
    * Kis változások

## változat{#version-134} 
 (kiadás dátuma: 2011- 06- 15) 

*    **Változások:** 
    * A hibajavítás: Rögzített egy memória szivárgás, hogy történt néhány 64 bites Java berendezések.
    * A hibajavítás: ERDDAP™ most helyesen állítja be ezeket a globális attribútumokat, amikor a szélességi dimenzió értékei magastól alacsonyig terjednek: geosteral\\ _ lat\\ _ min, geosteral\\ _ lat\\ _ max, Southernmost\\ _ Northing, Northernmost\\ _ Northing.
        
Megjegyzés: actual\\_range változatlan: alacsony, magas vagy magas, alacsony értékei lehetnek, mivel a tárolási tartomány és annak sorrendje feltüntetésére szolgál.
        
    * Apró változások.
    *    ERDDAP™ Az adminisztrátoroknak nem kell változtatniuk a setup.xml-en vagy datasets.xml .

## változat{#version-132} 
 (released 2011- 05- 20) 

*    **Változások:** 
    * Az újonnan ratifikált CF diszkrét mintavételi geometriák támogatása (ami sajnos még nem elérhető online) a javasolt CF Point Observation Conventions helyébe lép.
         ERDDAP™ A felhasználók látni fogják, hogy a cdm\\ _ function\\ _ type = Station helyébe a TimeSeries lép, és kis változások vannak a fájlokat létrehozott .nc CF fájltípus (A lapos\\ _ dimenziót most minta\\ _ dimenziónak hívják) .
         ERDDAP™ az adminisztrátoroknak el kell végezniük ezeket a változásokat datasets.xml :
        * cdm\\ _ data\\ _ type = Station to be cdm\\ _ data\\ _ type = TimeSeries.
        * cdm\\ _ data\\ _ type = StationProfile-t cdm\\ _ data\\ _ type = TimeSeriesProfile-ra kell módosítani.
        * cdm\\ _ station\\ _ változókat cdm\\ _ timeseries\\ _ változókra kell változtatni.
        * cf\\ _ role = station\\ _ id = cf\\ _ role = timeseries\\ _ id.
    * Új ioos\\_category opciók: "Colored Dissolided Organic Matter", "pCO2", "Stream Flow", "Total Suspended Matter".
    * Lehetséges megoldás a 64 bites memória szivárgására Java . \\[ Nem működött. \\] 
    * Apró változások.

## változat{#version-130} 
 (kiadás dátuma: 2011- 04- 29) 

*    **Új jellemzők:** 
    * Támogatás 64- bithez Java . 64 bites Java , ERDDAP™ Most már sokkal több halom memória és kezelni sok egyidejű kéréseket.
    * Támogatás .nc fájlkérelmek 2GB-ig (64 bites nélkül is Java ) a ERDDAP az adatok kezelése darabokban.
    * Sok 2X sebesség javítása a kód és 2X sebesség ups Java 1,6 ERDDAP™ 2X-től 4X-ig gyorsabb, mint korábban.
    * A memóriamegtakarítás jelentősen alacsonyabb ERDDAP Az alapmemória használata.
    * táblázat szerinti adatkészletek esetében: ERDDAP™ most már teljes mértékben tisztában van az adatkészlet cdm\\ _ data\\ _ type adataival, és azzal, hogy az adattérképek CDM-típusba kerülnek. Lásd a [CF Diszkrét mintavételi geometriák meghatározása](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) . Talán egy nap, hogy a Word fájl lesz konvertálni .html, és helyettesíti a jelenlegi "OBSOLETE" információkat a honlapon. Hála a NOAA UAF projekt.
    * A legtöbb EDDTable adatkészlet esetében egy új kimeneti fájltípus opció, .nc CF, létrehozza a Raged Array-t .nc fájlok, amelyek megfelelnek a legújabb változata a [CF Diszkrét mintavételi geometria-egyezmények](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) . Ezek a fájlok az adatkészlet CDM adattípusát tükrözik. Mivel a javasolt egyezmények most változtak meg, a netcdf- java könyvtár még nem támogatja az általa létrehozott fájlformátumok olvasását. ERDDAP és CDM adatfájlként értelmezi őket. Valószínűleg hamarosan. Hála a NOAA UAF projekt.
    * The View: Disclose Data option on the .subset web page is now a drop-down list that let users specified the maximum number of district data to be see (alapértelmezés = 1000) . Ez a változás, és mások, lehetővé teszi ERDDAP™ olyan adatkészletekkel dolgozni, amelyek nagyon sok különböző adatsorral rendelkeznek. (Az egyedi értékek száma egy változóhoz még mindig probléma, de elég magas lehet (20.000?) mielőtt a .subset és más weboldalak betölteni nagyon lassan.) Hála a NOAA UAF projekt.
    * .subset weboldalak egy új lehetőség: Távolsági adatszámlálók megtekintése. Hála a GTOPP projektnek.
    * A felhasználók megsegítése érdekében a különböző értékek (pl. az állomás neve) Jelenleg a Make- A- grafikonon és az adathozzáférési űrlapon látható. Hála a NOAA UAF projekt.
    * .átlátszó A Png kérések most minden típusú grafikont és adatmegjelenítést támogatnak. Csak az adatokat rajzolja -- nincsenek tengelyek, legendák, földálarc, vagy bármi más. Ez lehetővé teszi, hogy a képek, mint réteg átlátszó Pngs. Ha & .méret = _ szélesség _ | _ magasság _ van megadva a lekérdezés (ajánlott) Megtiszteltetés. Az alapértelmezés 360x360 pixel. Az egyetlen kivétel: EDDGrid & .draw = felület, ahol az alapértelmezett (mint korábban) ~ 1 / pixel / adatpont képpel (legfeljebb 3000 x és y pixel) . Hála Fred Hochstaedternek.
    * A WMS weboldalak most mutatja a színes sáv az adatkészlet változó (sz) . Hála Emilio Mayorgának és másoknak.
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * Ez a kiadás sok változással jár. Mind fontos. Kérjük, legyen türelmes és dolgozza át az alább felsorolt változásokat.
    * Ezt a verziót már korábban kitolták, mint azt tervezték, hogy néhány Java Biztonsági poloskák. Sajnos, több funkciók / javítások szánt erre ERDDAP™ A verzió nincs ebben a verzióban. Sajnálom. Remélhetőleg a következő verzió viszonylag hamar elkészül. (és sokkal könnyebb frissíteni) .
    * Hogy elkerülje több biztonsági hibák Java 6 frissítés 23 és az alábbi, töltse le és telepítse a legújabb verzióját a Java   ( Java 6 frissítés 24 vagy magasabb) . Ha van egy 64 bites operációs rendszere, kérjük, szerezze meg a 64 bites verzióját Java .
    * Ha Tomcat 5-öt használsz, fel kell frissítened Tomcat 6-ra vagy 7-re (előnyben részesített) . Ha Tomcat 6-ot használ, tekintse át a Tomcat 7-es verziójára.
    * Kérjük, kövesse az összes utasítást [új ERDDAP™ ](/docs/server-admin/deploy-install) , de adott esetben, akkor másolja fájlokat a régi telepítés az új telepítés, különösen a \\[ Nincs magyar neve \\] / content / erddap könyvtár és fájlok. Ennek részeként, vegye figyelembe a [új Tomcat beállítási ajánlások](/docs/server-admin/deploy-install#tomcat) .
    * Az alapértelmezett erddap.css már szerepel az erddap.war fájlban.
        * Az alapértelmezett erddap.css használatához **Törlés** a régi \\[ Nincs magyar neve \\] / tartalom / erddap / képek / erddap.css.
        * Ha módosítottad \\[ Nincs magyar neve \\] / content / erddap / images / erddap.css, and want to keep it: just leave it in place and place&lt;bemenet &gt; szakasz:
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

    * Az Ön \\[ Nincs magyar neve \\] / tartalom / erddap / setup.xml:
        * A megjegyzések és címkék cseréje&lt;részleges Rendszerkövetelmények &gt; és&lt;partialRequestMaxCells &gt; és
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
        * A következőkkel kapcsolatos észrevételek helyettesítése:&lt; categoryAttributes &gt; és fontolja meg a címke értékének módosítását:
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

Egyéni&lt; categoryAttributes &gt; amelyek globális attribútumok most KELL azonosítani az előtag globális: (például globális: intézmény) . Az egyéb attribútumok változónak tekintendők. (például: standard\\_name ) . Az intézmények értékei is (Az egyetlen) Az eredeti esetben maradt. Most az összes kategóriaérték alacsonyra változik.
    * Az Ön \\[ Nincs magyar neve \\] / tartalom / erddap / datasets.xml :
        * JAVÍTOTT: ERDDAP™ új követelmények kapcsolódó táblázatos adatkészlet cdm\\ _ data\\ _ type. Konkrétan minden adatkészletnek rendelkeznie kell a cdm\\ _ data\\ _ type-hoz kapcsolódó megfelelő metaadatokkal és változókkal. Ha nem, az adatkészlet nem fog betölteni, és hibát fog elkövetni. Lásd a dokumentációt: [cdm\\ _ adat\\ _ type](/docs/server-admin/datasets#cdm_data_type) .
        * FYI: Van egy új adatkészlet típus: EDDTableFromAsciiServiceNos.
        * FYI: Három újonnan engedélyezett ioos\\_category opciók: Hidrológia, minőség (például minőségi lobogók esetében) és statisztikák (pl. átlag) .
        * Az EDDTableFrom... Fájlok adatbázisok, távolítsa el bármelyik&lt;nDimensions &gt; tags. Már nincs rájuk szükség és nem is használják őket.
        * A változók destinationName = magasság, ERDDAP™ már nem kényszeríti a long\\_name Magasságosnak lenni. Kérlek, menj át a... datasets.xml és ismételt keresés&lt; destinationName &gt; magasság és a változó hozzáadása&lt; addAttributes &gt;:
```
              <att name="long\\_name">Altitude</att>  
```
             (vagy kissé más long\\_name különleges esetekben) .
        * Opcionális: Minden EDDTableFromFile alosztály támogatási változó [ sourceName = globális:...](/docs/server-admin/datasets#global-sourcenames) a globális metaadatok konvertálása minden fájlból adatváltozóvá. Lynn DeWitt-nek köszönhetően.
    * EDDTableFromDatabase felhasználók -- ERDDAP™ van egy új JDBC 4 meghajtó Postgres. Más adatbázisok esetén ellenőrizze az adatbázis legújabb JDBC .jar fájlját. Azóta ERDDAP™ most használja Java 1.6 +, JDBC 4 (nem 3) valószínűleg ajánlott.
    * FYI
        *    EDDGrid A fájlok és az EDDTable A... A fájlok adatai most tárolják a fájltábla adatait
             \\[ bigParentDirectory \\] / adatkészlet Info / \\[  datasetID  \\] /\\ * .nc fájlok.
Az EDDTable adatkészletei is tárolják az alcsoport adatait
             \\[ bigParentDirectory \\] / adatkészlet Info / \\[  datasetID  \\] /\\ * .nc fájlok. Ezek a fájlok régen
             \\[ bigParentDirectory \\] / adatkészlet Info / \\[  datasetID  \\] .\\ * .json fájlok.
A régi fájlok automatikusan törlődnek, ha ERDDAP™ Elindul. Vagy törölhetsz minden fájlt (de hagyja az üres alkönyvtárakat) in \\[ bigParentDirectory \\] / datasetInfo /.
        * Egy új EDDTableFromNcCFFiles-en dolgoztam, amely a javasolt, új CF Point Observation Conventions segítségével helyi és távoli fájlokból származó adatokat olvasott. De nincs ebben a kiadásban. Problémák vannak a netcdf- java könyvtárakban, amelyek a fájlok olvasásához kapcsolódnak. És volt néhány nagyon friss változás a javasolt CF Point Observation Conventions. Amikor a netcdf- java könyvtárat rögzítik és frissítik a legutóbbi javaslathoz, folytatom a munkát.
        * Futtatás ERDDAP™ A Windows lehet problémák: nevezetesen, akkor látni a \\[ bigParentDirectory / log / log.txt fájl ERDDAP™ néha képtelen gyorsan törölni és / vagy átnevezni a fájlokat. Ez az antivírus szoftvernek köszönhető. (például, a McAfee és Norton) ami a vírusokra vonatkozó fájlokat ellenőrzi. Ha belefutsz ebbe a problémába (amit a log.txt fájlban található hibaüzenetek is láthatnak, mint "Nem sikerült törölni"...) A vírus elleni szoftver beállításainak megváltoztatása részben enyhítheti a problémát.
Ha ERDDAP™ A Windows csak egy teszt fut az asztalon, ez csak egy bosszantó.
Ha ERDDAP™ a Windows a nyilvánosság ERDDAP™ , fontolja meg váltás Linux szerver.
    * Lassú első állomás... Amikor először futsz ERDDAP™ korszerűsítés után, ERDDAP™ Az adatkészletek betöltése lassú lehet. Az út ERDDAP™ az összesített fájlokra vonatkozó információk megváltoztak, így ERDDAP™ újra kell olvasnia az összes fájlt. Az időbe telik.
    * Hibák a Startupon... Tekintve a cdm\\ _ data\\ _ type változásait, valószínű, hogy néhány adatkészlet nem töltődik be, és hibákat dob. Gondosan olvassa el a Daily Report e-mail, hogy ERDDAP™ küld, amikor ERDDAP™ befejezte az indulást. Van egy listája az adatkészletekről, amik nem töltöttek be. (a tetején) És az ok, amiért nem töltöttek (közel az aljához) .
    * Ha beragad, vagy más kérdése van, küldje el nekem a részleteket: erd.data at noaa.gov .
    * Programozók -- Ha írsz Java a futó programok ERDDAP™ kód, meg kell változtatni néhány parancssor paraméter hivatkozások:
        * Cseréljünk joda- time - 1.6.2.jar joda- time. üveg
        * Változás a Postgres JDBC .jar hivatkozás posztgresql.jdbc.jar
*    **Kis változások és hibajelzés:** 
    
    * Javított kapcsolat kezelése, hogy elkerülje az akasztott szálak.
    * Javított konvalencia gyakorlatok a közel egyidejű azonos kérelmek hatékonyabb kezelésére.
    *    ERDDAP™ most használ netcdfAll -4.2.jar (Átnevezve NetcdfAllra. üveg) . Ez a kapcsoló több belső változtatást tett szükségessé, és néhány kisebb külső változást okozott, például a grib fájlok olvasásának megváltoztatását és a .nc Feji kimenet.
    * Új funkció: \\[ erddap \\] / konvertálni / fipscounty.html konvertálni FIPS megyei kódok / megyei nevek.
    * A térképeken az államhatárok most már sötét ibolyák, így minden háttérszínen jobban kitűnnek.
    * táblázat .kml a kimenet ismét egy kör alakú ikont használ a pontok jelöléséhez (nem a repülőgép ikon Google nemrég váltott) .
    * Az erdCalcofi adatkészleteket átrendezték és most helyi fájlokból szolgálják fel (gyorsabb) .
    * GenerateDatasets Xml Threds Katalógus most létrehoz egy eredményfájlt:
         \\[ Nincs magyar neve \\] / Webalkalmazások / erddap / WEB- INF / hőmérséklet / EDDGrid FromThredds Catalog.xml. Hála Kevin O 'Briennek.
    * GenerateDatasets Xml Threds Katalógus most próbálja eltávolítani a felesleges port számokat a forrás URLs (például: 8080 és: 8081 néha eltávolítható) . Köszönöm NOAA A központ biztonsági csapata.
    * A .subset weboldalak, A térkép a Disclose Data most egy változó lat lon tartományban.
    * Több lista ERDDAP™   (például az összes adatsort tartalmazó táblázat) úgy rendezték, hogy A.. Z rendezte a. .z . Most pedig az esetükben érzéketlenek.
    * Kis módosítások a .subset weboldalak, beleértve: egységek most jelzik.
    * GenerateDatasets Az Xml és a DasDds már nem tesz kivételt, ha nem tudja az eredményeket a vágólapra vagy a DisplayInBrowser-ra tenni. Hála Eric Bridgernek és Greg Williamsnek.
    * A hibajavítás: Ha az adatok betöltve vannak, ERDDAP™ Most eltávolítja vagy módosítja a geosteral globális attribútumokat. Hála Charles Carletonnak.
    * hibajavítás: sztring2.getClassPath () Most már megfelelően decides az osztály Útvonal (nevezetesen a Windows-on a fájlnév szóközök jelentek meg:% 20) . Ez a hatás ERDDAP™ EDStatic calling SSR.getContextDirectory () és a tartalom keresése / erddap. Abe Coughlinnak köszönhetően.
    * Bugfix: az EDDTableFromFiles kapcsolódó getDataForDapQuery kezelése külön () kérések. Hála Eric Bridgernek.
    * A hibajavítás: tabledap a kérések nem kezelték megfelelően a magassági korlátokat, amikor az adatkészlet magasságát A MetersPerSourceUnit -1 volt. Hála Eric Bridgernek.
    * Bugfix: EDDTableFrom... A fájlok adatbázisai most már megfelelően kezelik a kérelmeket, amelyek tartalmazzák a = NaN és&#33; = NaN-t.
    
## változat{#version-128} 
 (kiadás dátuma: 2010- 08- 27) 

*    **Új jellemzők:** Semmi.
*    **Dolgok ERDDAP™ Administrators need to know and do:** Semmi.
*    **A hibajavítás:** Programozási hiba (Csak az 1.26.) amit ERDDAP™ Nagyon lassan.
     

## változat{#version-126} 
 (kiadás dátuma: 2010- 08- 25) 

*    **Új jellemzők:** Semmi.
*    **Dolgok ERDDAP™ Administrators need to know and do:** 
    * A te \\[ Nincs magyar neve \\] / tartalom / erddap / setup.xml,
        * In&lt;jogi &gt;, egy új vonal alább \\[ szabvány Adatengedélyek \\] , \\[ standard kapcsolat \\] . \\[ standard kapcsolat \\] utal a&lt;Administre Email &gt; magasabb a setup.xml.
        * Eltávolítás&lt;TabCommonBGColor &gt; és&lt;Table Highlight BGColor &gt;.
        * Ajánlott: Változás&lt;endBodyHtml &gt;
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

    * Kötelező: Az Ön \\[ Nincs magyar neve \\] / content / erddap / images / erddap.css és erddaAlp.css, add az alján:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Hibák és apró változások:** 
    
    * Hibajavítás: egyes helyzetekben az űrlapok nem működtek az Internet Explorer egyes változataiban. Nagyon köszönöm Greg Williamsnek.
    * A hibajavítás: A Make A Graph gombok nem működött, ha az adatkészlet egy távoli ERDDAP .
    * A hibajavítás: WMS Néha nem működött, ha az adatkészlet egy távirányítóról jött. ERDDAP .
    * Sok apró változtatás és hibajavítás.
    

## változat{#version-124} 
 (kiadás dátuma: 2010-08-06) 

*    **Új jellemzők:** 
    * Új [Aloldal](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html) a táblázatos adatkészletek alcsoportjainak kiválasztásához fapelled keresési módot használjon. Hála a POST-nak.
    * Új [Speciális keresés](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html) egyesíti az összes többi keresési lehetőséget, és hozzáteszi a hosszúságot, szélességet, és az idő határoló dobozok. Hála Ellyn Montgomerynek. (Elnézést a késésért.) 
    * Új [Átalakítás](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) weboldal és szolgáltatás lehetővé teszi, hogy átalakítsa numerikus időpontok / ISO sztring időpontok.
    * Új [Átalakít egységek](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html) weboldal és szolgáltatás lehetővé teszi, hogy megtérítse UDUNITS UCUM-egységektől / -egységektől. Köszönöm NOAA JOOS SOS .
    * Ha a tabledap A kérés tartalmazza az egységeket ("UCUM") , Az egységek neve lesz átalakítva az eredeti nevek (általában UDUNITS ) - [UCUM](https://unitsofmeasure.org/ucum.html) Az egységek neve. Ez csak az egységeket érinti.\\*nevek\\*Nem adatértékek. Köszönöm NOAA JOOS SOS .
    * Javítások grafikonok és grafikonok elkészítéséhez:
        * Ha a diagram egy térkép, vannak új Make A Graph gombok nagyítani / ki, és egy új lehetőség, hogy kattintson, hogy megváltoztassa a térkép középpontját. Hála a POST-nak.
        * Szűrési beállítások az alsó közelében. Hála Greg Williamsnek.
        * A beépített tengerparti adatállományokat frissítették GSHHS v2.0. Hála a POST-nak.
        * A térképek közé tartoznak a tavak és a folyók. Hála a POST-nak. (Sajnálom, a Sacramento Delta folyó hiányzik, mert sem a parti adatok, sem a tó / folyó adatkészlet nem foglalkozik vele.) 
        * A pscoast- responsible national / state fájlokat frissítették. Hála a POST-nak.
        * A Topography.cpt-et kissé módosították. (Sajnálom, ha ez rossz hatással van rád.) Hála a POST-nak.
        * A griddap Make A Graph, Ha a felhasználó megváltoztatja a változó, a forma automatikusan újra be, hogy a axisVariable s a show StartandStop mindig tükrözi a grafikonok változóit. Hála Joaquin Trinanesnek.
        * Png és pdf képURLs esetén:
            * Új & .land = _ value _, ahol _ value _ is "under" (show topográfia) vagy "vége" (Csak mutasd a fürdőt.) . Ha nincs megadva, az alapértelmezett értéke [ drawLandMask ](/docs/server-admin/datasets#global-drawlandmask) in datasets.xml vagy setup.xml. Hála a POST-nak.
            * Új: a túl hosszú sorok automatikusan több sorra törnek. Hála a POST-nak.
        * A png képURL- ek esetében:
            * Új & .legenda = _ value _, ahol _ value _ lehet "Alul" (alapértelmezés) "Ki" vagy "Csak". Ez lehetővé teszi, hogy a legenda, kizárja a legenda, vagy csak a legenda. Hála Cara Wilsonnak.
            * Új & .trim = _ n Pixels _ elhagyja a határ nPixels (például, 10) a kép alján. Az .Legenda = Off után alkalmazzák. Hála Cara Wilsonnak.
            * Új & .méret = _ szélesség _ | _ height _ let you specified the width and height for the image, in pixels.
    * Új kimeneti fájlformátumok:
        * .csvp és .tsv p -- mint .csv és .tsv , de " (_ egységek _) "az első sor oszlopneveihez csatolva.
        * .odvTxt -- készít egy .txt fájlt, amely leegyszerűsíti az adatok bevitelét [Tengeri adatok Nézet (ODV) ](https://odv.awi.de/) .
        * .esriCSV -- teszi a .csv fájl alkalmas import ESRI ArcGIS . (kizárólag táblázatos adatkészletek) Hála Jan Masonnak, Jeff de La Beaujardere-nek, és NOAA JOOS SOS projekt.
    * A GUI javítása a [Besorolás](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html) weboldalak. Továbbá, a kategorizálási értékek (Nem intézmény) Most már mind alacsonyak. Nem kis értékű kérelmek elfogadva (átirányított) visszafelé kompatibilis. Hála Roy Mendelssohn-nak.
    * A hibaüzenetek most még rövidebbek és a felhasználók felé orientáltabbak. Hála Greg Williamsnek.
    * Belső változás, amely nagymértékben csökkenti ERDDAP Az alapmemória használata.
    * Sok új funkció, amelyek csak a POST projekt szempontjából relevánsak.
*    **Dolgok ERDDAP™ Administrators need to know and do:** Sok a változás. Sajnálom. De mindegyik hoz valami szép hasznot.
    * Nagy változások GenerateDatasetXml -- ez most gyakran több kérdést (lásd a vonatkozó [dataset Típusok](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) információ) és most mindig generál lényegében readyto- use tartalom datasets.xml . Még mindig felelős a beállítás, így akkor is felül kell vizsgálni a datasets.xml tartalom használata előtt. Egy ember, aki erőfeszítéseket tesz a projektbe, mindig jobb lesz, mint egy számítógépes program. Hála az UAF projektnek.
    * Szükséges: A szetup.xml, akkor felül kell vizsgálni a WMS szakasz. Most ezeket a címkéket kell tartalmaznia. (de nyugodtan változtasd meg az értékeket.) :
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

    * KÖVETELVE: A setup.xml, másolja le és illessze be ezt az új javasolt&lt;startHeadHtml &gt; a régi verzió helyére. De nyugodtan változtass a preferenciáidon.
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

Hála a POST-nak, Hans Vedónak és Rick Blairnek.
    * Szükséges: szetup.xml-ben,&lt;startBodyHtml &gt;, változtassa meg a&lt;test &gt; címke&lt;test &gt;, mivel a stílus már beállította erddap.css.
    * Szükséges: A szetup.xml, a változás erre&lt;endBodyHtml &gt; (de változtassa meg az e-mail címet az e-mail címre, és nyugodtan, hogy más módosításokat) :
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

    * NAGYON AJÁNLOTT: Setup.xml-ben az ajánlott&lt;The ShortDescriptionHtml &gt; most
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

Nyugodtan változtass ezen, különösen az első bekezdés utolsó mondatán.
    * In setup.xml, emailEverything To and emailDailyReport Most lehet comma- elválasztott listák e-mail címek. Az első e-mail minden A speciális, például, előfizetés EDDXxxxFromErddap adatkészletek használja ezt az e-mail címet. Hála John Maurernek.
    * E-mail hibák most bejelentkezik a \\[ bigParentDirectory \\] / log / emailLogyly- MM- DD.txt fájl.
    * A setup.xml, van egy új, opcionális paraméter beállítani e-mail fiók tulajdonságait (általában közvetlenül után&lt;@ info: whatsthis
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

Az alapértelmezés semmi. Hála Rich Signell-nek.
    * Szükséges: Ha EDDTableCopy vagy EDDGrid Vettem, el kell küldened mindent. \\[ bigParentDirectory \\] / másolás / könyvtárak és fájlok, amelyek "xh" a könyvtárban vagy fájlnevek leállítása után a régi ERDDAP™ és az új ERDDAP™ Szóval azokat a fájlokat újra lemásolják. Nagyon sajnálom, de fontos volt, hogy a változás, és remélhetőleg hatással van néhány tollak és fájlok.
Linux-ban ezeket a fájlokat a, cd \\[ bigParentDirectory \\] / másolat
Megtalálni.\\*xh\\*  
A Windows, megtalálja ezeket a fájlokat, Start | Keresés
Mit szeretne keresni: Dokumentumok
A fájlnév részben vagy egészben: xh
Keressen be: Böngészés - &gt; \\[ bigParentDirectory \\] / másolat
Kattintson a 'Keresés' gombra
^ A az összes kiválasztásához
Del törölni őket
    * Szükséges: datasets.xml , az EDDTableFromDatabase adatok, a dátum- és időbélyegző változók esetében változtassa meg az adatokat Gépeld a dupláig és az egységeket másodpercekig 1970-01T00: 00: 00Z óta. Kérjük, hogy tárolja az időbélyegző adatait az adatbázisban\\*és\\*időzóna. Időzóna információ nélkül, a kérdések, hogy ERDDAP™ elküldi az adatbázisba és az eredményeket, hogy ERDDAP™ Az adatbázisból JDBC-n keresztül érkezik, kétértelműek és valószínűleg tévednek. Megpróbáltuk, de nem találtunk megbízható módot az időbélyegző nélküli adatok kezelésére. Szerintünk ez jó gyakorlat. Végül is az "időbélyegző időzóna nélkül" adatok implicit időzónával rendelkeznek. Bár nagyszerű, hogy az időzóna nyilvánvaló az adatbázis admin, van értelme, hogy pontosan határozza meg, hogy más szoftver megfelelően kölcsönhatásba léphet az adatbázis. Köszönöm / sajnálom Michael Urzen.
    * NAGYON AJÁNLOTT: datasets.xml , hogy lehetővé tegye .subset weboldalak facebook keresés a táblázatos adatok, meg kell adni [&lt; subsetVariables &gt;] (/ docs / server- admin / datasets # subsetvariers) az adatkészlet globális sajátosságaira.
    * AJÁNLVA: In datasets.xml , ha az adatkészlet datasetID = "pmelGtsppp", kérlek változtasd meg
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * AJÁNLVA: In datasets.xml , vannak új érvényes opciók a [&lt;cdm\\ _ data\\ _ type & gt;] (/ docs / server- admin / datasets # cdm _ data _ type) globális attribútum, így felül kell vizsgálni / változtatni az értéket az adatsorok.
    * In datasets.xml , az új [&lt;sourceNeedsExpandedFP\\ _ EQ & gt;] (/ docs / server- admin / datasets # sourceneedsexplandedfp _ eq) hasznos, ha a forrás szerver nem kezeli következetesen a & _ változó _\\ = _ érték _ teszteket (mert [a lebegőpontos számok egyenlőségének vizsgálatának általános nehézsége](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) ) . sourceNeedsExpandedFP\\ _ EQ alapértelmezésben igaznak (a legbiztonságosabb beállítás) Nem kell változtatnod.
    * Új [EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles) . Hála Jerry Yun Pan-nak.
    * Új [EDDTableFromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles) . Hála Roy Mendelssohn-nak.
    * Változások [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles) lehetővé teszi, hogy a fájlokat szélesebb körben használják.
    * Az EDDTableFromBMDE nem működik. Már nincs aktív, megfelelő adatforrás.
    * GenerateDatasetXml, az új EDDGrid FromThredek Katalógus betakarít egy teljes THREDDS katalógus (vagy alcsoport) és generál datasets.xml tartalom. Hála az UAF projektnek.
    * GenerateDatasets Xml és DasDds most is az eredményeket \\[ bigParentDirectory \\] / naplók / log.txt. Hála Rich Signellnek és Charles Carletonnak.
    * Sok javulás a bejelentkezési rendszer. Hála a POST-nak.
*    **Dolgok ERDDAP™ Programozók Tudnia kell és meg kell tennie:** 
    * Megváltozott a / WEB- INF / lib / könyvtár. Kérem, változtassa meg a Javac és Java classpath beállításokat.
    * Van egy új \\[ Ön Url \\] / erddap / verzió szolgáltatás a verzió ERDDAP . A válasz a szöveg, például, ERDDAP \\ _ verzió = 1.24 Ha HTTP 404 Not- Found hibaüzenetet kap, kezelje a ERDDAP™ 1.22 vagy alacsonyabb változatként. Hála a POST-nak.
*    **Kis változások és hibajelzés:** 
    
    * EDDTableFrom Sos változások:
        * Az IOOS olvasásához nyújtott támogatás eldobása SOS XML válaszok.
        * Hozzáadott támogatás az IOOS olvasásához SOS szöveg / CSV. (Szóval... SOS A szervereket jelenleg nem támogatják.) 
        * Sok változtatás történt az IOOS-szal kapcsolatban SOS A kiszolgáló adatai.
        * Hozzáadott támogatás a BBOX lekérdezésekhez az IOOS-hoz SOS és OOSTethys   SOS szerverek. Ezek a változások nagy gyorsaságot eredményeznek a vonatkozó adatkérések tekintetében. Az IOOS-nak köszönhetően SOS .
    * Szöveg .mat A táblázatos adatfájlok most már helyesek. Hála Roy Mendelssohn-nak.
    *    WMS 
        *    OpenLayers jelenleg ERDDAP™ a WMS weboldalak. Ez javítja a problémát okozott, amikor OpenLayers néhány hónapja megváltozott, és megelőzte a jövőbeli problémákat.
        * A WMS   GetCapabilities válasz, a&lt;OnlineResource &gt; érték most a URL WMS szolgáltatás. Hála Charlton Galvarinónak.
        * Egy legenda jelenik meg a WMS a színes sáv megjelenítésére szolgáló weboldal. Hála Emilio Mayorgának.
    *    EDDGrid AggregateExistingDimension Constructor volt probléma, ha a tengely 'forrás Az értékek nem voltak egyenlőek a céljukkal. Érték, például, ha a forrásidő volt valami más "seconds since 1970-01-01" . Köszönöm Todd Spindler.
    * A TableWriterGeoJson, a felesleges "," után bbox \\[ ... \\] eltávolították. Hála Greg Williamsnek.
    * Sok apró változtatás és hibajavítás.
    
## változat{#version-122} 
 (release 2009- 07- 05) 

* Az 1.20-ban bemutatott SlideSorter hiba meg van javítva.
* Az 1.20-ban bemutatott OBIS hiba meg van javítva.
* A Jason adatkészletekre vonatkozó hivatkozásokat a képek / szerkentyűk / googleGadgets oldalon eltávolították.
     
## változat{#version-120} 
 (released 2009- 07- 02) 

*    ERDDAP™ adminisztrátorok, kérjük, hogy ezt adja hozzá a setup.xml fájlhoz:
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

* Új adatkészlet típusok [ EDDGrid Másolás](/docs/server-admin/datasets#eddgridcopy) és [EDDTableCopy](/docs/server-admin/datasets#eddtablecopy) egy másik helyi másolatának elkészítése és karbantartása EDDGrid vagy EDDTable dataset adatait, és szolgáljon adatokat a helyi másolat. Ezek nagyon könnyen használható és nagyon hatékony **megoldások a távoli adatforrásokból származó adatok kiszolgálásával kapcsolatos legnagyobb problémákra:** 
    
    * A távoli adatforrástól való hozzáférés lassú lehet (különböző okokból) .
    * A távoli adatkészlet néha nem elérhető (több okból) .
    * Az adatok egyetlen forrásával való kapcsolat nem túl jó. (például, amikor sok felhasználó és sok ERDDAP s használja) .
    
Plusz, a helyi másolat az eredeti másolata, ami hasznos arra az esetre, ha valami történne az eredetivel.
    
Semmi új nincs abban, ha helyi másolatot készítünk egy adatkészletről. Ami új itt, hogy ezek az órák teszik\\*könnyű\\*Létrehozni és\\*fenntartás\\*a\\*fajta\\*a távoli adatforrások típusai és\\*metaadatok hozzáadása\\*az adatok másolása közben.
    
Ezek az adatkészlet típusok egy sor olyan funkció részét képezik, amelyek egyszerűsítik a [Hálózatok / klaszterek / szövetségek ERDDAP sz](/docs/server-admin/scaling) nagyon nehéz teher kezelése (pl. adatközpontban) .
    
* Új adatkészlet típusa [EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase) adatokat szerez egy helyi vagy távoli adatbázistáblából.
*    ERDDAP™ Most van egy [biztonság](/docs/server-admin/additional-information#security) a hitelesítést támogató rendszer (a felhasználók belépésének engedélyezése) és engedély (bizonyos magánjellegű adatkészletekhez való hozzáférés biztosítása) .
* Vannak [két, új, parancssori szerszám](/docs/server-admin/datasets#tools) Segíteni ERDDAP™ Az adminisztrátorok létrehozzák az XML-t egy új adathoz datasets.xml :
    * GenerateDatasets Az Xml szinte bármilyen típusú adatkészlethez készítheti az XML adatállományt.
    * A DasDds segít az XML- es adatkészlet ismételt tesztelésében és finomításában. ERDDAP GenerateDatasets Az Xml-es honlapokat eltávolították. Biztonsági okokból csak néhány adatkészlet típust támogattak. Az új parancssori eszközök jobb megoldást jelentenek.
* Az új [állapot oldal](/docs/server-admin/additional-information#status-page) hagyja, hogy bárki (de különösen adminisztrátorok) a ERDDAP™ bármilyen böngésző segítségével \\[ baseUrl \\]  /erddap/status.html .
* Tabledap most támogatja [szerver- side függvények](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions) :
    * Elkülönítés () két sort távolít el a választáblából,
    * & orderBy  (...) lehetővé teszi a választábla összeállításának módját,
    * & orderByMax  (...) lehetővé teszi a választábla kiválasztásának módját, és eltávolítja az összes sort, kivéve az utolsó megadott oszlopban megadott maximális értékeket tartalmazó sorokat. Ez például arra használható, hogy az utolsó rendelkezésre álló adatokat az egyes állomásokra.
* A táblázatos adatok most már tartalmazhatnak további datedTime változókat, amelyeket nem neveztek el "time" . Ezeket a változókat az "egységek" metaadatai ismerik el, amelyeknek tartalmazniuk kell " since "   (numerikus dátumnál Időpontok) vagy "yy" vagy "YY" (formázott String dateTimes) . De kérem, használja a destinationName   "time" a fő időpontra Időváltozó.
*    ERDDAP™ most létrehoz egy [sitemap.xml](/docs/server-admin/additional-information#sitemapxml) file, amely megmondja keresőmotorok, hogy a ERDDAP Csak havonta kell kúszni. ERDDAP™ adminisztrátorok, kérem kövessék [Ezek az utasítások](/docs/server-admin/additional-information#sitemapxml) a keresőmotorok értesítése az új sitemap.xml fájlról.
*    ERDDAP A hibaüzenetek most sokkal rövidebbek és az ügyfelekhez igazodnak (nem programozók) . Hála Greg Williamsnek.
* [&lt;Kérelmező feketelista &gt;] (/ docs / server- admin / datasets # applicblist) most az IP-címeket is támogatja, ahol az utolsó szám helyébe\\ * lép.
* Kérelem .json és .geoJson fájlok most tartalmazhatnak egy opcionális [jsonp](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/) kérés "& .json p = _ functionName _ "a lekérdezés végéig. Alapvetően, ez csak azt mondja, ERDDAP™ a "_ functionName _ ("a válasz kezdetéig és"...) "a válasz végéig. Ha eredetileg nem volt lekérdezés, hagyja ki a" & "a lekérdezés. Hála Greg Williamsnek.
* A [Napi jelentés](/docs/server-admin/additional-information#daily-report) .
* Az adatkészletek listáit tartalmazó weboldalakon az intézmény és az ID most a jobb szélen van. Ez mozgatja az előfizetést és más hasznos oszlopokat megtekinteni a keskeny képernyőkön.
* Az összes oldalon, az oldal címe (alapján a&lt;cím &gt; a&lt;startHeadHtml &gt; amit setup.xml-ben definiálsz) módosul, hogy a weboldal jobb leírását tartalmazza (például a jelenlegi adatkészlet címével és intézményével) .
* Xmx információk most tartalmazza a log.txt, a Daily Report, és a status.html. Hála Ellyn Montgomerynek.
*    ERDDAP™ kiegészítő általános védelmet nyújt minden hibával szemben (pl., OutOfMemoryError) . Hála Charles Carletonnak.
* A hibakezelés javítása, ha a válasz már megtörtént.
* JAVÍTOTT: EDDTableFromFiles és EDDGrid FromFiles most csak lehetővé teszi&lt;metadata &gt; első vagy utolsó. Az utolsó előtti nem támogatott. És az elsők és utolsók az utolsó ModifiedTime fájlokon alapulnak.
* hibajavítás: az EDDTableFrom-ban SOS , érvénytelen info egy állomás dobott egy kivételt, és okozta az egész adatkészlet elutasítását. Azokat az állomásokat figyelmen kívül hagyják. (és a hibaüzenet bejelentkezik a log.txt fájlba) . Hála Rick Blairnek.
     

## változat{#version-118} 
 (kiadás dátuma: 2009- 04- 08) 

* Hibajavítás: Az 1.14-től kezdve az EDDTable Data Access Form és a Make A Graph weboldal nem foglalkozott megfelelően az idézett megszorításokkal.
* hibajavítás: 1,14-től kezdve az EDDTableFromDapSequence nem kezelte megfelelően az időkorlátokat, ha a forrásidő nem volt "másodperc 1970-01T00: 00 óta".
     

## változat{#version-116} 
 (kiadás dátuma: 2009- 03- 26) 

*    ERDDAP™ adminisztrátorok:
    * Ez egy fontos kiadás, mert javítja a hibát, hogy hagyott egy ERDDAP™ szál fut, ha használt Tomcat Manager megállítani / Start vagy újratöltés ERDDAP . Tehát, amikor telepíted az 1.16-ot, ne csak Tomcat menedzsert használd, hogy eltávolítsd a régi ERDDAP™ és telepítse az új ERDDAP . Ehelyett: **unimplant the old ERDDAP™ , a Tomcat újraindítása (vagy a szerver) , majd telepítse az új ERDDAP .** Mindig jó ötlet egy új verzió telepítésekor.
    * Kérjük, adja meg [&lt;Kérelmező feketelista &gt;&lt;/ Kérelmező feketelista &gt;] (/ docs / server- admin / datasets # applicblist) Önnek datasets.xml . Ez használható a blokkolandó kliens IP-címek listájának megadásához (például a Szolgáltatás megtagadása vagy egy túlságosan buzgó webrobot elhárítása) .
* Van egy \\[ bigParentDirectory \\] / Naplózási könyvtár a ERDDAP™ naplófájlok. Amikor elkezded ERDDAP™ , készít egy archívum másolatot a log.txt és a log. tx.Korábbi fájlok időbélyegzővel. Ha baj volt az újrakezdés előtt, hasznos lehet ezeket a fájlokat elemezni.
*    ERD s ERDDAP™ Most bekapcsolta az előfizetési rendszert.
*    ERDDAP™ ismét megengedi (de még mindig nem ajánlott.) a "% 26" kódolása az URL- ben (lásd a [Kapcsolódó v1.14 változás](#percent26) ) .
* Számos új kiegészítés a [Napi jelentés](/docs/server-admin/additional-information#daily-report) .
* Kis hibajavítások generateDatasetsXml.
* Néhány kis hiba.
     

## változat{#version-114} 
 (kiadás dátuma: 2009- 03- 17) 

* Változások a felhasználók számára:
    * A hálózati adatkérésekben, ERDDAP™ most támogatja: [last- n](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last) ahol n az indexek egész száma, és [ (last- d) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses) ahol d a numerikus érték (Az idő, ez a másodperc) .
    * A táblázatos adatkérésekben a sztringkorlátozások megkövetelik [kétszeres idézetek](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings) az érték körül, például, & id = "NDBC40121" Ez szükséges a DAP A protokoll.
    * A táblázatos adatkérésekben, ERDDAP™ Most kell, hogy [minden korlátozás megfelelő százalékban kódolva](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode) . A böngészők ezt automatikusan csinálják, így ez leginkább a számítógépes programokat / szkripteket érinti, amelyek hozzáférnek ERDDAP .
#### ↑ 26{#percent26} 
*    [Korábban...](#percent26) a [grafikonoldal beágyazása](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html) és [ ERDDAP™ Google Gadget weboldal](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html) azt mondta, hogy a kép URL-jének "&" -jét "% 26" -ra kell cserélni. Mostantól a kép URL-jének "& amp;" -jét kell helyettesítenie. Tehát a meglévő weboldalakon és a Google Gadgets-ben található "% 26" -t "& amp;" -ra kell cserélni. (Sajnálom.) 
*    ERDDAP™ adminisztrátorok, kérem:
    * A következő [szetup.xml](/docs/server-admin/deploy-install#setupxml) fájl (és a zászló megváltoztatása Kulcsfontosságú érték) :
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

    * A következő vonalon&lt;emailUserName &gt; az Ön [szetup.xml](/docs/server-admin/deploy-install#setupxml) fájl hozzáadása
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
és adja meg az igazi jelszavát.
    * Megváltozhatsz.&lt;wmsSampleBBox &gt; az Ön [szetup.xml](/docs/server-admin/deploy-install#setupxml) a legfeljebb 360 hosszúsági értéket tartalmazó fájl, például,
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * Az Ön datasets.xml fájl, az adatkészlet típusa: EDDTableFromNc4DFiles to EDDTableFromNcFiles (amely most támogatja a fájlok száma a méretek) . Ha volt EDDTableFromNc4DFiles adata:
        
        1. Meg kell változtatni, hogy a = "EDDTableFromNcFiles" a datasets. XML fájl.
        2. A&lt;n Méretek &gt; 4&lt;/ nDimensions &gt; tag az adatkészlet XML.
        3. Hozzáadhatja az új&lt;sortFilesBySourceNames &gt; tag a fájlok belső sorrendjének megadásához, amely meghatározza a visszaküldött adatok teljes sorrendjét.
        
A részleteket lásd: [EDDTableFromFiles](/docs/server-admin/datasets#eddtablefromfiles) .
    * A múltban, az EDDTableFromDapSequence, a OPeNDAP DRDS szerverek, in datasets.xml , mi használt&lt;sourceCanConstrainStringsRegex &gt; ~ =&lt;/ sourceCanConstrainStringRegex &gt;. De most azt látjuk, hogy a DRDS regex támogatás korlátozottabb, mint ERDDAP 's, így javasoljuk&lt;sourceCanConstrainStringsRegex &gt;&lt;/ sourceCanastrainStringRegex &gt; annak érdekében, hogy a regex-megkötéseket ne a forrásnak adják át, hanem a ERDDAP .
    * Felújított kezelése sourceCanContrine... in datasets.xml a [EDDTableFromDapSequence](/docs/server-admin/datasets#eddtablefromdapsequence) és (Belső) minden EDDTable adatkészlet típusa. Az új rendszer egyszerűbb, és jobban tükrözi a különböző adatforrások változékonyságát. Lehet, hogy módosítani kell az XML az adatok datasets.xml .
* Számos új funkciók, amelyek hasznosak maguk, de ha együtt, is megkönnyíti a létrehozását [Hálózatok / klaszterek / szövetségek ERDDAP sz](/docs/server-admin/additional-information#grids-clusters-and-federations) .
    * Új adatkészlet típusok:
        *    [ EDDGrid FromErddap](/docs/server-admin/datasets#eddfromerddap) és [EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap) amely lehetővé teszi ERDDAP™ adatkészlet felvétele egy másikból ERDDAP™ nagyon egyszerű és nagyon hatékony módon.
        *    [ EDDGrid FromFiles](/docs/server-admin/datasets#eddgridfromfiles)   (és alosztálya, [ EDDGrid FromNcFiles](/docs/server-admin/datasets#eddgridfromncfiles) amely tud olvasni NetCDF   .nc , valamint HDF   .hdf fájlok) .
        *    [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles) amely tud olvasni NetCDF   .nc Amelyeknek asztalszerű szerkezetük van.
    * A Run LoadDatasets és a LoadDatasets átalakult, így ERDDAP™ nagyon érzékeny az adatkészletek újratöltésére a [lobogó](/docs/server-admin/additional-information#flag) könyvtár (gyakran&lt;5 másodperc, ha a fő betöltési adatkészlet jelenleg kész).
    * Új szolgáltatás engedélyezése [URL a zászló fájl létrehozásához](/docs/server-admin/additional-information#set-dataset-flag) adott adatkészlet esetében, például,
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
létrehoz egy zászló fájlt a zászló könyvtárában rPmelTao (Bár a zászló A kulcs itt rossz.) .
    * Új [előfizetés](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions) szolgáltatás annak érdekében, hogy az ügyfél meg tudja határozni egy adott adatkészlet létrehozásakor végrehajtandó műveletet (amikor ERDDAP™ újraindítása) és amikor az adatkészlet változik bármilyen módon. Ez a rendszer letiltható&lt;előfizetés Rendszeraktív &gt; az Ön [szetup.xml](/docs/server-admin/deploy-install#setupxml) akta. A ERDDAP™   [Napi jelentés](/docs/server-admin/additional-information#daily-report) Most felsorolja az összes előfizetés, és magában foglalja a URL szükséges, hogy törölje mindegyik, arra az esetre, ha úgy érzi, a rendszer visszaélnek. In datasets.xml , van egy új, opcionális [&lt;előfizetés EmailBlacklist &gt;] (/ docs / server- admin / datasets # subcomptionemailblacklist) Címke, hogy az adminisztrátorok meg tudják adni a comma- elválasztott listáját e-mail címek, amelyek azonnal feketelistára az előfizetési rendszer.
    * Új [&lt;onChange &gt;] (/ docs / server- admin / datasets # on change) attribútum datasets.xml hagyja ERDDAP™ Az adminisztrátor határozza meg az adott adatkészlet létrehozásakor végrehajtandó műveletet (amikor ERDDAP™ újraindítása) és amikor az adatkészlet változik bármilyen módon.
    * Javítások a teljes szöveges kereséshez: a keresési sztring tárolása minden adatkészlethez 1 / 2-re használja a memóriát. A keresési algoritmus (Boyer- Moore- szerű) Most már 3X gyorsabb.
    * E-mailek ERDDAP™ most mindig előrehozza a téma és tartalma \\[ erddap Url \\] , hogy egyértelmű legyen melyik ERDDAP™ Ez jött (abban az esetben, ha Ön több adagot ad be ERDDAP sz) .
    * Szélesebb körű statisztikai adatgyűjtés a [Napi jelentés](/docs/server-admin/additional-information#daily-report) e-mail.
    * Új naplófájl \\[ bigParentDirectory \\] / emailLogYEAR- MM- DD.txt naplók minden e-mailt küldött ERDDAP™ minden nap. Ez különösen akkor hasznos, ha a szerver nem tud e-maileket küldeni -- legalább olvasd el őket a naplóban.
    *    ERDDAP™ Most pedig... \\[ bigParentDirectory \\] / gyorsítótár / ( datasetID ) könyvtárak minden adatkészlethez, mivel sok fájl tárolható.
* Új [ RSS 2, 01](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions) takarmány minden adatkészlethez (Keresd a narancsot. RSS ikonok az adatkészletek, az adathozzáférési űrlapok és a grafikonok listáin) .
*    EDDGrid   .kml A válaszok most csempézett képeket használnak ("szuperoverlays" -- dinamikusan generált quadtree képek) . A kezdeti kép sokkal gyorsabban érkezik a GoogleEarth-be, mint korábban. A térkép felbontása növekszik, ahogy ráközelítünk, egészen az adatkészlet teljes felbontásáig. Ajánlás: a felhasználók kérhetik .kml egyszer, de az adatkészlet teljes hosszúsága, szélességi tartománya. Sajnos az idősávok támogatása megszűnt. (Remélem, visszajön.) .
*    ERDDAP™ Most adja hozzá [Expires and Cache- Control max- age fejlécek](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) a / images könyvtárból kért összes fájlra. Ez nagyban csökkenti a statikus fájlkérelmek számát ERDDAP és így jelentősen felgyorsul a legtöbb ERDDAP™ oldaltöltések. És sok Java A szkriptfájl hivatkozásai a HTML oldalak aljára kerülnek, ami szintén sok ERDDAP™ oldaltöltések. Köszönhetően a könyv "nagy teljesítményű weboldalak" Steve Souders és a ySlow hozzáadása a FireFox FireBug plugin.
*    ERDDAP™ Átváltottak a netcdf- java 2.2.22-ről a netcdf- java 4.0-ra. Többek között, ez lehetővé teszi EDDGrid Elolvasandó FromNcFiles HDF   .hdf , valamint GRIB .grb és NetCDF   .nc fájlok.
*    EDDGrid FromDap és EDDGrid FromNcFiles most is támogatja DARray (valamint DGrid)   dataVariable c. Ha egy dimenziónak nincs megfelelő koordináta-változója, ERDDAP™ tengelyváltozót hoz létre az indexértékekkel (pl. 0, 1, 2,..., 311, 312) . Tehát minden egyéb szempontból EDDGrid továbbra is ugyanaz:
- Igen. Még mindig minden adatállományt Gridként szolgál, minden dimenzióhoz tengelyváltozóval.
- Igen. A lekérdezések még mindig kérhetnek értékeket a tengelyváltozókból.
Hála Charles Carletonnak, Thomas Im-nak, Dorian Raymernek és másoknak.
* A WMS   OpenLayers Az oldalakon most egy alapértelmezett hosszúság, szélességi tartomány, amely egy kicsit nagyobb, mint az adatkészlet tartománya (nem a pontos tartomány, így a kontextus a kis adatkészletek nyilvánvalóbb) . Az alapértelmezett tartomány most is 0-tól 360-ig terjedhet, ami lehetővé teszi számos adatkészlet teljes skáláját. Köszönöm Todd Spindler.
* Új csúszdák néhány Data Access Forms és Make A Graph weboldalak. Egyszerűsítik (nyers) a kívánt adatok specifikációja és jó vizuális visszajelzések.
* Egy új lehetőség a&lt;adatkészlet &gt; címkék datasets.xml : [aktív = "hamis"](/docs/server-admin/datasets#active) .
* Hivatkozás: ERD s ERDDAP™ megváltozott a parti őrségről.pfel (Még mindig működik a proxy) Part Watch.pfeg (előnyben részesített) .
* Új támogatás [ data\\_min és data\\_max ](/docs/server-admin/datasets#data_min-and-data_max) változó metaadatok attribútumok.
* A [Várakozás](/docs/server-admin/additional-information#waitthentryagain-exception) : Nos, néhány kérés, amely korábban nem sikerült, amikor az adatforrás változást észleltek, sikeres lesz, mert ERDDAP™ újra betölti az adatállományt, és automatikusan újra kéri az adatokat, mind az eredeti kéréssel összefüggésben.
* hibajavítás: generálás Adatbázisok Az Xml-t letiltották ERDDAP™ változat Köszönöm Ellyn Montgomerynek, hogy rámutatott erre.
* Kis változások a hibakezelésben.
* Sok javítások elkerülése / kezelése lehetséges versenyfeltételek (azaz a többmenetes ERDDAP ) ami kis, ritka problémákat okozott.
* Ha egy hibaüzenet egy képre van írva, a kép csak ~ 5- 10 percig marad a gyorsítótárban (nem 60) . Hála Cara Wilsonnak.
* A standard üzenet, amikor nincs adat, most "A lekérdezés nem eredményezett egyező eredményeket"., ami rövidebb, pontosabb, és egyezik OPeNDAP szerverek.
*    EDDGrid már nem teszi lehetővé a kötött tengely értékeit.
* Kis változtatások .ver és .help kérések.
* Sok apró változtatás és hibajavítás.
     

## változat{#version-112} 
 (released 2008- 10- 31) 

* EDDTableFrom SOS újra működik az NDBC SOS és dolgozik az új NOS SOS .
* EDDTableFromBMDE most megköveteli ERDDAP™ az admin meghatározása dataVariable c.
*    EDDGrid már nem szükséges, hogy a lat és lon egyenletesen elosztva. átlátható Png vagy .kml . Köszönöm Todd Spindler.
* Néhány apró változás.
     

## változat{#version-110} 
 (released 2008- 10- 14) 

* Új "colorBar" metaadatok az adatváltozókhoz datasets.xml meghatározza az alapértelmezett színsáv beállításokat grafikonok és térképek. Lásd [További információk](/docs/server-admin/datasets#color-bar-attributes) . Ez azért fontos, mert nagyban javítja a Make A Graph által készített alapértelmezett grafikonok és térképek megjelenését, és mert az alapértelmezett grafikonok és térképek most már konzisztens színsávban vannak, még akkor is, ha az ügyfél megváltoztatja a kért időt vagy földrajzi tartományt. Továbbá, ez szükséges volt a WMS .
*    ERDDAP™ most a legtöbb hálózati adatot a WMS szolgáltatás. Ez azért fontos, mert azt mutatja, hogy azon kívül, hogy számos típusú adatszervertől kap adatokat, ERDDAP™ az adatokat különböző protokollokon keresztül terjesztheti ( DAP , WMS ,... többet a jövőben) . Lásd a [ügyféldokumentáció](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html) . Vagy a [a referenciamutató-kezelők dokumentációja](/docs/server-admin/datasets#wms) . vagy [Próbáld ki.](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html) .
* Új támogatás a hosszúsági értékek &gt; 180 .kml fájlok.
* Új CDM\\ _ data\\ _ type: Egyéb.
*    ERDDAP™ most támogatja a "logikai" forrás adattípus. Lásd [További információk](/docs/server-admin/datasets#boolean-data) Ez hasznos lesz a jövőbeni EDDTableFromDatabase számára.
* Az új EDDTableFromBMDE támogatja a DigIR / BMDE adatforrásokat.
* EDVGridAxis most lehetővé teszi a csökkenő válogatott értékek. A PmelOscar adatkészleteknek erre volt szükségük.
*    ERDDAP™ most visszatér HTTP hibák (például, "404 a forrás / oldal nem található") több helyzetben, helyett HTML oldalak hibaüzenetek.
* Sok változás / kiegészítés a ERDDAP™ dokumentáció.
* Sok apró változás.
* Néhány hiba javít.
*    **Dolgok ERDDAP™ Az adminisztrátoroknak ezt a verziót kell frissíteniük:** 
    * In datasets.xml , bármilyen EDDTableFrom SOS datasets, change "observedProperty" metaadatok "sourceObservedProperty".
    * A szabályok a axisVariable vagy dataVariable s destinationName most [szigorúbb](/docs/server-admin/datasets#datavariable-addattributes) . Ellenőriznie kell, hogy a változó nevek érvényesek-e. Vagy kézzel ellenőrzöd, vagy futsz. ERDDAP™ és nézd meg a jelentésben szereplő hibaüzeneteket, amelyeket az adminisztrátornak küldött e-mailben.
    * In datasets.xml , ha azt szeretné, hogy egy rács adat változó legyen elérhető a WMS , meg kell hozzá ColorBar metaadatok. Legalább, például,&lt;att name = " colorBarMinimum "type =" double "&gt; 0&lt;/ att &gt;
```
          <att name="colorBarMaximum" type="double">32</att>  
```
Lásd [További információk](/docs/server-admin/datasets#wms) .
    * A következő [szetup.xml](/docs/server-admin/deploy-install#setupxml) fájl (de testreszabni az információt) :

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

## Változat 1.08{#version-108} 
 (released 2008- 07- 13) 

* Új webszolgáltatás ERDDAP™ , generál Adatbázisok Xml, asszisztálás ERDDAP™ adminisztrátorok létrehozása durva vázlata XML szükséges leírására adatkészlet datasets.xml 
* Néhány módosítás / hibajavítás, amely lehetővé teszi, hogy a griddap a netcdf- java által opendap szerverként jelenjen meg, beleértve: a globális metaadatok neve "NC\\ _ GLOBAL" (GLOBAL helyett) .
* A EDDGrid és EDDTable Data Access Forms most használja lekérdezési információkat az URL. Így például, ha a felhasználó megy egy Make A Graph űrlap egy adathozzáférési űrlap, a korlátozások most megfelelően át.
*    tabledap 'Make A Graph most lehetővé teszi a megszorításokat a sztring változók.
* EDDTable 's Make A Graph most már lehetővé teszi a NaN megszorítások. Hála Steve Hankinnek.
* Hibajavítás: EDDTable mentés AsImage nem ismerte fel megfelelően a .colorbar min és max értékeket. Hála Steve Hankinnak.
* Sok fejlesztések setupDatasetsXml. Hála Ellyn Montgomerynek.
* Griddap kérések most lehetővé teszik () -stílus kérések kissé kívül a tényleges tengely tartományban. Ez helyénvaló, mivel () -értékek kerekítve a legközelebbi tényleges érték. Cindy Bessey-nek köszönhetően
* A FloatArray és a DoubleArray tesztet az Isevently Spaced kifinomultabbá tette. Mindig tökéletlen lesz. (mert a vizsgálatot minden adatkészlethez egyedileg kell elvégezni) De jobb lesz. Hála Ellyn Montgomerynek.
* A setup.html-t és a setupDatasets-et áthelyeztem. Xml.html erddap / download directory and hard code all link to them. Most változtathatok, és azonnal frissíthetem a beállítási adatokat.
* Sok apró változás. Néhány kis hiba.
*    **Dolgok ERDDAP™ Az adminisztrátoroknak ezt a verziót kell frissíteniük:** 
    * Mozgás&#33;&lt;A rövid leírás Html &gt; az üzenetektől.xml az Ön [szetup.xml](/docs/server-admin/deploy-install#setupxml) akta. Meghatározza azt a szöveget, amely a bal oldali ERDDAP™ kezdőlap. Továbbá, add&lt;h1 &gt; ERDDAP &lt;/ h1 &gt; (vagy más főcím) A tetejébe. **Vagy,** másolat&lt;ShortDescriptionHtml &gt; az új [szetup.xml](/docs/server-admin/deploy-install#setupxml) fájl (az új erddapContent .zip ) a szetup xml.
         

## változat{#version-106} 
 (2008-06- 20) 

* Új támogatás IOOS DIF SOS adatforrások.
* Sok apró változás. Néhány kis hiba.
     

## Változat 1.04{#version-104} 
 (2008-06- 10) 

* Új Slide Sorter funkció.
* Új Google Gadgets oldal és példák.
* Hibajavítás EDDGrid .saveAsNc a változó skála és addOffset.
     

## Változat 1.02{#version-102} 
 (2008-05- 26) 

* Új EDDGrid SideBySide lehetővé teszi a különböző axisVariable sz \\[ 0 \\] forrás Értékek.
* Az áramlatok és a szél összes adata egybeolvadt EDDGrid SideBySide adatok.
* Images from image requestions are now cafed for 1 hour.
     

## Változat 1.00{#version-100} 
 (release 2008- 05- 06) 

* Készíts egy grafikus oldalakat és grafikus parancsokat URL-ben.
* Támogatás zászlós fájlok kényszeríteni újratöltése adatkészlet.
* Új adatkészlet típusa: EDDTableFrom4DFiles (az EDDTableFromFiles első alosztálya) .
