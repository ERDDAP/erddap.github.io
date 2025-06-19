---
sidebar_position: 4
---
# További információk

## Dolog, amit tudnod kell{#things-you-need-to-know} 
     
###    **[Proxy hibák](#proxy-errors)**  {#proxy-errors} 
Néha egy kérésERDDAP™visszatér egy Proxy hiba, egy HTTP 502 Bad Gateway hiba, vagy néhány hasonló hiba. Ezeket a hibákat Apache vagy Tomcat dobja, nemERDDAP™maga.
* Ha minden kérelem generálja ezeket a hibákat, különösen akkor, ha először állítja felERDDAP™Valószínűleg ez egy proxy vagy rossz kapu hiba, és a megoldás valószínűleg megoldható[ERDDAPproxy beállítások](/docs/server-admin/deploy-install#proxypass)... Ez lehet a probléma akkor is, ha létrehozottERDDAP™hirtelen elkezdi dobni ezeket a hibákat minden kérésre.
* Ellenkező esetben a "proxy" hibák általában az Apache vagy Tomcat hibáinak kitöltése. Még akkor is, ha viszonylag gyorsan megtörténnek, az Apache vagy Tomcat valamilyen válasza akkor fordul elő, amikorERDDAP™nagyon elfoglalt, memóriakorlátozott vagy korlátozott más erőforrás. Ezekben az esetekben lásd az alábbi tanácsot, hogy foglalkozzon vele[ERDDAP™lassan reagálni](#responding-slowly)...
        
Hosszú távú igények (&gt; 30 időpont) egy rácsos adatkészletből hajlamosak a kudarcok kitörésére, amelyek gyakran Proxy Hibáknak tűnnek, mert jelentős időt vesz igénybe aERDDAP™megnyitni az összes adatfájl egy-egy. HaERDDAP™egyébként elfoglalt a kérelem során, a probléma nagyobb valószínűséggel fordul elő. Ha az adatkészlet fájljait tömörítik, a probléma nagyobb valószínűséggel fordul elő, bár nehéz meghatározni, hogy egy adatkészlet fájljait tömörítik-e.
A megoldás az, hogy több kérést, mindegyik egy kisebb időtartomány. Mennyi időtartomány? Azt javaslom, hogy tényleg kicsi (30 időpont?) Aztán (megközelítőleg) duplázza meg az időtartományt, amíg a kérés nem sikerül, majd menjen vissza egy duplázás. Ezután tegye meg az összes kérést (mindegyik egy másik darab időre) minden adat megszerzéséhez szükséges.
EgyERDDAP™Az adminisztrátor csökkentheti ezt a problémát azáltal, hogy növeli[Apache Timeout beállítások](/docs/server-admin/deploy-install#apache-timeout)...
        
### Megfigyelés{#monitoring} 
Mindannyian azt akarjuk, hogy az adatszolgáltatásaink megtalálják a közönségüket, de néha a tiéteket is.ERDDAP™túl sokat lehet használni, problémákat okozva, beleértve a szuper lassú válaszokat minden kérésre. A tervünk, hogy elkerüljük a problémákat:

* MonitorERDDAP™keresztül[status.html weboldal](#status-page)...
Eznek rengeteg hasznos információja van. Ha látja, hogy egy hatalmas számú kérés jön be, vagy tonna memóriát használnak, vagy tonna kudarcot valló kérések, vagy minden Major LoadDatasets hosszú időt vesz igénybe, vagy látja, hogy a dolgok bármilyen jele lebomlott és lassan reagál, akkor nézze megERDDAPA[log.txt fájl](#log)látni, mi történik.
    
Ez is hasznos, hogy egyszerűen vegye figyelembe, milyen gyorsan reagál a status oldal. Ha lassan reagál, ez egy fontos mutató, hogyERDDAP™nagyon elfoglalt.
    
* MonitorERDDAP™keresztül[Napi jelentés](#daily-report)e-mail.
     
* Nézd meg a naprakész adatkészleteket keresztül *alapUrl* /erddap/outOfDateDatasets.htmlweboldal, amely az opcionális[testOutOfDate](/docs/server-admin/datasets#testoutofdate)globális tulajdonság.
     
#### Külső monitorok{#external-monitors} 
A fent felsorolt módszerekERDDAP„A monitorozás módja. Lehetőség van külső rendszerek létrehozására vagy használatára, hogy figyelemmel kísérjeERDDAP... Az egyik projekt erre az, hogy[Axiom erddap-metrikus projektje](https://github.com/axiom-data-science/erddap-metrics)... Az ilyen külső rendszereknek van néhány előnye:
* Testreszabhatók, hogy megadják az általad kívánt információt, megmutatva a kívánt módon.
* Információkat tartalmazhatnakERDDAP™azERDDAP™nem tud könnyen vagy egyáltalán hozzáférni (például CPU használat, lemezszabad tér,ERDDAP™a felhasználó szemszögéből látható válaszidő,ERDDAP™uptime,
* Tudnak figyelmeztetéseket (e-mailek, telefonhívások, szövegek) az adminisztrátoroknak, amikor a problémák meghaladják a küszöböt.
             
### Többszörös szimultán Kérés{#multiple-simultaneous-requests} 
*    **A Blacklist felhasználók több egyidejű kérést tesznek&#33;** 
Ha egyértelmű, hogy egyes felhasználók több mint egyidejű kérést tesznek, többször és folyamatosan, akkor adja hozzá az IP-címét.ERDDAP[[szerkesztés]]&lt;kérésBlacklist&gt; (/docs/server-admin/datasets#requestblacklist) a tedatasets.xmlfájl. Néha a kérések mindegyike egy IP-címből származnak. Néha több IP-címből származnak, de egyértelműen ugyanaz a felhasználó. Szintén feketelistázhatja az embereket, akik érvénytelen kéréseket vagy tonna elme-számítógépes hiányos kéréseket tesznek.
    
Ezután minden kérésre, amit tesznek,ERDDAP™visszatér:
    
    > HTTP ERROR 403 - Access Forbidden --  
    > Your IP address is on this ERDDAP's request blacklist.  
    > Did you often submit more than one request at a time?  
    > Did you often submit identical requests in a short period of time?  
    > Did you submit a large number of invalid requests?  
    > If you are ready to avoid these problems, please email \\[ERDDAP™ administrator's email address\\] to request to be taken off of the blacklist.
    
Remélhetőleg a felhasználó látni fogja ezt az üzenetet, és kapcsolatba lép vele, hogy megtudja, hogyan kell rögzíteni a problémát, és kikapcsolni a feketelistát. Néha csak átkapcsolják az IP címeket, és újra próbálják.
    
Olyan, mint a hatalom egyensúlya a támadási és védekező fegyverek között a háborúban. Itt a védekező fegyverek (ERDDAP) rögzített kapacitással rendelkezik, amelyet a CPU-ban, a lemez hozzáférési sávszélességben és a hálózati sávszélességben korlátoz. De a támadó fegyverek (felhasználók, nevezetesen szkriptek) korlátlan kapacitással rendelkezik:
    
    * Egyetlen kérelem az adatok sok időpont okozhatERDDAPhatalmas számú fájl megnyitása (szekvenciában vagy részben többlépcsős) ... Szélsőséges esetekben egy "egyszerű" kérés könnyen köthető a RAID-hoz csatoltERDDAP™egy percig, hatékonyan blokkolja más kérések kezelését.
         
    * Egyetlen kérelem nagy memóriát fogyaszthat (még haERDDAP™kódolva, hogy minimalizálja a nagy kérések kezelésére szükséges memóriát) ...
         
    * Parallelizáció -
Könnyű egy okos felhasználó számára, hogy párhuzamosan egy nagy feladatot hozzon létre sok szál létrehozásával, amelyek mindegyike külön kérést nyújt be (amely nagy vagy kicsi lehet) ... Ezt a viselkedést a számítógépes tudomány közössége arra ösztönzi, hogy hatékonyan kezelje a nagy problémát (és a párhuzamosság más körülmények között hatékony) ... Visszatérve a háborús analógiához: a felhasználók alapvetően korlátlan számú egyidejű kérést tehetnek meg minden lényegében nulla költséggel, de az egyes kérések költsége minden egyes kérés költsége.ERDDAP™lehet nagy ésERDDAPA válaszképesség véges. Nyilvánvaló,ERDDAP™elveszíti ezt a csatát, hacsak nemERDDAP™adminisztrátor feketelistákat használók, akik több egyidejű kéréseket, amelyek tisztességtelenül zsúfolják más felhasználókat.
         
    * Többszörös írások -
Most gondolj arra, hogy mi történik, ha több okos felhasználó fut párhuzamos szkriptek. Ha egy felhasználó sok kérést generálhat, amelyeket más felhasználók zsúfolnak ki, akkor több ilyen felhasználó generálhat annyi kérést, hogyERDDAP™túlterhelté és látszólag felelőtlenné válik. Hatékonyan egy[DDOS támadás](https://en.wikipedia.org/wiki/Denial-of-service_attack)Ismét az egyetlen védekezésERDDAP™a blacklist felhasználók több egyidejű kérést tesznek, amelyek tisztességtelenül zsúfolják más felhasználókat.
         
    * Inflációs várakozások -
Ebben a világban a hatalmas technológiai vállalatok (Amazon, Google, Facebook, ...) A felhasználók alapvetően korlátlan képességeket várnak el a szolgáltatóktól. Mivel ezek a vállalatok pénzgyűjtő műveletek, annál több felhasználó van, annál több bevételt kell bővítenie az informatikai infrastruktúráját. Így megengedhetik egy hatalmas informatikai infrastruktúrát a kérések kezelésére. És okosan korlátozzák a felhasználók kérelmeinek és költségeinek számát azáltal, hogy korlátozzák a felhasználók által kért kérelmeket, hogy egyetlen kérés ne legyen terhes, és soha nincs ok (vagy út) a felhasználók számára, hogy több egyidejű kérést. Tehát ezek a hatalmas technológiai vállalatok sokkal több felhasználóval rendelkezhetnek, mintERDDAP™, de masszívan több erőforrással és okos módon korlátozzák a kérelmeket minden felhasználótól. Ez egy kezelhető helyzet a nagy informatikai vállalatok számára (és meggazdagodnak&#33;) de nemERDDAP™telepítések. Ismét az egyetlen védekezésERDDAP™a blacklist felhasználók több egyidejű kérést tesznek, amelyek tisztességtelenül zsúfolják más felhasználókat.
         
    
Tehát a felhasználók: Ne készítsen több egyidejű kérést, vagy feketelistát kap&#33;
     

Nyilvánvaló, hogy a legjobb, ha a szerver sok fűvel rendelkezik, sok memória (így sok memóriát eloszthatszERDDAP™Több, mint valaha szüksége van rá) és egy magas sávszélességű internetkapcsolat. Ezután a memória ritkán vagy soha nem korlátozó tényező, de a hálózati sávszélesség a gyakoribb korlátozó tényezővé válik. Alapvetően, mivel egyre több egyszerű kérés van, az adott felhasználó sebessége csökken. Ez természetesen lelassítja az érkező kérések számát, ha minden felhasználó egyszerre csak egy kérést nyújt be.
    
### ERDDAP™Adatok THREDDS{#erddap-getting-data-from-thredds} 
Ha a teERDDAP™néhány adatot kap egy THREDDS-től az Ön webhelyén, vannak olyan előnyök, amelyek a THREDS adatfájlok másolatát teszik ki (legalább a legnépszerűbb adatkészletek esetében) egy másik RAID-on,ERDDAP™hozzáférést biztosít ahhoz, hogyERDDAP™közvetlenül szolgálhat adatokat a fájlokból. AERDEzt a legnépszerűbb adatkészleteinkért tesszük.

*   ERDDAP™közvetlenül megkaphatja az adatokat, és nem kell várnia a THREDDS-t, hogy újratöltse az adatkészletet vagy ...
*   ERDDAP™azonnal észreveheti és beépítheti az új adatfájlokat, így nem kell a THREDDS-t gyakrabban megnézni, hogy megváltozott-e az adatkészlet. Lásd:&lt;frissítésEveryNMillis&gt; (/docs/server-admin/datasets#updateeverynmillis) ...
* A terhelés 2 RAIDS és 2 szerver között oszlik meg, ahelyett, hogy a kérés mindkettőre kemény lenneERDDAP™és THREDDS.
* Elkerüli a THREDDS által okozott hibás problémát egy kis (által default) maximális kérelemméret.ERDDAP™van egy rendszer, hogy kezelje a félelem, de elkerülése a probléma jobb.
* Van egy biztonsági másolata az adatokról, ami mindig jó ötlet.

Mindenesetre ne futtassa a THREDDS-t ésERDDAP™ugyanabban a Tomcatban. Futtassa őket külön Tomcats, vagy jobb, külön szervereken.

Úgy találjuk, hogy a THREDDS rendszeresen olyan állapotba kerül, ahol a kérés csak akaszt. Ha a teERDDAP™a THREDDS-ből származó adatok és a THREDDS ebben az állapotban van,ERDDAP™védekezés (azt mondja, hogy a THREDDS-alapú adatkészlet nem áll rendelkezésre) , de még mindig nehézERDDAP™mertERDDAP™meg kell várni, amíg az időzítés minden alkalommal megpróbálja újratölteni egy adatkészletet egy ung THREDDS. Néhány csoport (többek közöttERD) Ez elkerülése a THREDDS proaktív újraindításával gyakran (pl. éjszaka egy krónikus munkahelyen) ...

### Lassan reagálni{#responding-slowly} 
*    **HaERDDAP™Lassan reagál** vagy ha csak bizonyos kérések lassan reagálnak,
kitalálni lehet, hogy a lassúság ésszerű és ideiglenes (pl. a szkriptek vagyWMSfelhasználók) vagy ha valami megmagyarázhatatlanul rossz, és szüksége van rá[zárja le és indítsa újra Tomcatot ésERDDAP™](#shut-down-and-restart)...
    
HaERDDAP™lassan válaszol, lásd az alábbi tanácsot, hogy meghatározza az okot, amely remélhetőleg lehetővé teszi, hogy megjavítsa a problémát.
Lehet, hogy van egy konkrét kiindulási pontja (pl. egy adott kérés URL) vagy homályos kiindulópont (pl.:ERDDAP™lassú) ...
Lehet, hogy ismeri az érintett felhasználót (pl. azért, mert e-maileztek téged) vagy sem.
Lehet, hogy más nyomokat, vagy sem.
Mivel ezek a helyzetek és a problémák összes lehetséges oka összemosódik, az alábbi tanács megpróbálja kezelni az összes lehetséges kiindulási pontokat, és minden lehetséges probléma a lassú válaszokat.
    
    *    **Nézd meg a nyomokat[ERDDAP"A log fájl](#log)**   ( *bigParentDirectory[szerkesztés]* /log/log.txt) ...
        \\[Ritka alkalmakkor vannak nyomok a[Tomcat logfájlja](#tomcat-logs)  ( *Tomcat* /logs/catalina.out) ...\\]  
Keressen hibaüzeneteket.
Keressen egy nagy számú kérést, amelyek egyből érkeznek (vagy néhány) felhasználók és talán egy csomó szerver erőforrásait (memória, CPU idő, lemez hozzáférés, internet sávszélesség) ...
        
Ha a baj kötődik **Egy felhasználó** Gyakran előfordulhat, hogy ki a felhasználó a webszolgáltatásokon keresztül, mint például[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)ez adhat információt a felhasználó IP-címével kapcsolatban (amit megtalálhatszERDDAPA[Log.txt](#log)fájl) ...
        
        * Ha a felhasználó úgy tűnik, hogy egy **bot** rosszul viselkedni (nevezetesen egy keresőmotor megpróbálja kitölteni aERDDAP™formák a belépési értékek minden lehetséges permutációjával) Győződjön meg róla, hogy megfelelően beállította a szerverét[robotok.txt](#robotstxt)fájl.
        * Ha a felhasználó úgy tűnik, hogy egy **Szöveg (s) ** ez több egyidejű kérést tesz lehetővé, lépjen kapcsolatba a felhasználóval, magyarázza el, hogyERDDAP™korlátozott erőforrásokkal rendelkezik (pl. memória, CPU idő, lemez hozzáférés, internet sávszélesség) , és kérje őket, hogy vegye figyelembe más felhasználók, és csak egy kérést egy időben. Azt is megemlítheti, hogy feketelistázza őket, ha nem térnek vissza.
        * Ha a felhasználó úgy tűnik, hogy egy **Szöveg** nagyszámú időigényes kérés készítése, kérje meg a felhasználót, hogy vegye fontolóra más felhasználókat egy kis szünet elhelyezésével (2 másodperc?) a kérések közötti forgatókönyvben.
        *    **WMSügyfél szoftver** nagyon igényes lehet. Egy ügyfél gyakran kér 6 egyedi képet egy időben. Ha a felhasználó úgy tűnik, hogy egyWMSolyan ügyfél, amely jogos kéréseket tesz, Ön:
            * Ne hagyd&#33; (ajánlott, mert hamarosan továbblépnek) 
            * Kapcsolja ki a szerverétWMSszolgáltatásERDDAP"s setup.html fájl. (nem ajánlott) 
        * Ha a kérések úgy tűnnek **hülye, őrült, túlzott vagy rosszindulatú,** vagy ha nem tudja megoldani a problémát más módon, fontolja meg ideiglenesen vagy tartósan a felhasználó IP-címét a [&lt;kérésBlacklist&gt; az Öndatasets.xmlfájl] (/docs/server-admin/datasets#requestblacklist) ...
             
    *    **Próbálja meg duplázni a problémát, a számítógépről.**   
Figurálja, hogy a probléma egy adatkészlettel vagy minden adatkészlettel, egy felhasználó vagy minden felhasználó számára, csak bizonyos típusú kérések esetén stb.
Ha duplázhatja a problémát, próbálja meg szűkíteni a problémát.
Ha nem duplázhatja a problémát, akkor a probléma a felhasználó számítógépéhez, a felhasználó internetkapcsolatához vagy az intézmény internetkapcsolatához köthető.
         
    * Ha csak **Egy adatkészlet** lassan reagál (talán csak **egyfajta kérelem** egy felhasználótól) A probléma lehet:
        *   ERDDAP's hozzáférés az adatkészlet forrásadataihoz (különösen a kapcsolati adatbázisokból, a Cassandra-ból és a távoli adatkészletekből) átmenetileg vagy tartósan lassú lehet. Próbálja meg ellenőrizni a forrás sebességét függetlenERDDAP... Ha lassú, talán javíthatja.
        * Az adott kérelemhez vagy általános kérelemhez kapcsolódó probléma?
Minél nagyobb a kért adatkészlet, annál valószínűbb, hogy a kérés kudarcot vall. Ha a felhasználó hatalmas kéréseket tesz, kérje meg a felhasználót, hogy készítsen kisebb kéréseket, amelyek nagyobb valószínűséggel kapnak gyors és sikeres választ.
            
Szinte minden adatkészlet jobb kezelni bizonyos típusú kéréseket, mint mások típusú kérések. Például, ha egy adatkészlet különböző időt tárol különböző fájlokban, nagyszámú időpontból származó adatok kérése nagyon lassú lehet. Ha a jelenlegi kérések nehéz típusúak, fontolja meg az ilyen kérésekre optimalizált adatkészlet változatát. Vagy csak magyarázza el a felhasználónak, hogy az ilyen típusú kérés nehéz és időigényes, és kérje türelmét.
            
        * Az adatkészlet nem optimálisan konfigurálható. Lehet, hogy megváltoztathatja az adatkészletetdatasets.xmlcunk, hogy segítsenERDDAP™jobban kezeli az adatkészletet. Például,
            
            *   EDDGridFromNcFiles adatkészletek, amelyek a tömörített nc4/hdf5 fájlokból származó adatokhoz való hozzáférés lassú, ha az egész földrajzi tartomány adatait kapják (pl. egy világtérképre) mert az egész fájlt depressziósnak kell lennie. A fájlokat lemondatlan fájlokra konvertálhatja, de a lemezterület követelménye sokkal nagyobb lesz. Valószínűleg jobb elfogadni, hogy az ilyen adatkészletek bizonyos körülmények között lassúak lesznek.
            * A [[szerkesztés]]]&lt;subsetVariables&gt;&gt;&gt;&gt;&gt;&gt; (/docs/server-admin/adatbázisok#subsetvariables) A tagnak hatalmas befolyása van arra, hogyanERDDAP™kezeli az EDDTable adatkészleteket.
            * Lehet, hogy képes növelni a[Az EDDTableFromDatabase sebessége](/docs/server-admin/datasets#database-speed)adatkészlet.
            * Számos EDDTable adatkészletet lehet felosztani[az adatok másolatának tárolása azNetCDFContiguous Ragged Array fájlok](/docs/server-admin/datasets#eddtablefromfiles)AmelyERDDAP™nagyon gyorsan olvashat.
            
Ha szeretné, hogy segítsen felgyorsítani egy adott adatkészletet, tartalmazzon egy leírást a problémáról és az adatkészlet darabjadatasets.xmllásd a miénket[rész további támogatás megszerzéséről](/docs/intro#support)...
             
    * Ha **Minden** benneERDDAP™az **mindig** lassú, a probléma lehet:
        * A számítógép, amely futERDDAP™lehet, hogy nincs elég memória vagy feldolgozó erő. Jó futniERDDAP™egy modern, többmagos szerveren. A nagy használat érdekében a szervernek 64 bites operációs rendszerrel és 8 GB-tal vagy több memóriával kell rendelkeznie.
        * A számítógép, amely futERDDAP™más alkalmazásokat is üzemeltethet, amelyek sok rendszerforrást fogyasztanak. Ha igen, kaphat egy dedikált szervertERDDAP? Például (Ez nem támogatottság) Kaphat egy quad-core Mac Mini Server 8 GB memóriát ~ $ 1100.
             
    * Ha **Minden** benneERDDAP™az **átmenetileg** Lassú, nézd meg a teERDDAPA[ **/erddap/status.htmloldal** ](#status-page)a böngészőben.
        * AERDDAP™A status oldal nem tölt?
Ha igen,[KezdőlapERDDAP™](#shut-down-and-restart)...
        * AERDDAP™status oldal load lassan (pl.:&gt;5 másodperc) ?
Ez egy jel, hogy minden benneERDDAP™lassan fut, de nem feltétlenül baj.ERDDAP™Lehet, hogy csak tényleg elfoglalt.
        * "Response Failed Time (Az utolsó nagy LoadDatasets) n= nagy szám?
Ez azt jelzi, hogy a közelmúltban sok sikertelen kérés történt. Ez baj lehet, vagy a baj kezdete. A kudarcok medián ideje gyakran nagy (pl. 210000 ms) ,
ami azt jelenti, hogy ott voltak (Vagy?) Sok aktív szálak.
amelyek sok erőforrást köttek fel (mint a memória, a nyílt fájlok, a nyílt aljzatok, ...) ,
ami nem jó.
        * "Response Sikeres Idő (Az utolsó nagy LoadDatasets) n= nagy szám?
Ez azt jelzi, hogy a közelmúltban sok sikeres kérés történt. Ez nem baj. Ez csak azt jelenti, hogy a teERDDAP™nehéz használni.
        * A "Number of non-Tomcat-waiting szálak" kettős egy tipikus érték?
Ez gyakran súlyos baj, ami okozzaERDDAP™lassulni és végül befagyni. Ha ez órákig fennmarad, proaktívan szeretnél[KezdőlapERDDAP™](#shut-down-and-restart)...
        * A "Memory Use Summary" lista alján az utolsó "Memory: jelenleg nagyon magas" érték?
Ez csak a magas használatot jelezheti, vagy a baj jele lehet.
        * Nézd meg a szálak listáját és állapotukat. Szokatlan számuk csinál valami szokatlant?
             
    * Az **az intézmény internetkapcsolata** Jelenleg lassú?
Keresse meg az internetet az "internet sebesség teszthez", és használja az egyik ingyenes online tesztet, például[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/)... Ha az intézmény internetkapcsolata lassú, akkor a kapcsolatok közöttERDDAP™és a távoli adatforrások lassúak lesznek, és kapcsolatokERDDAP™és a felhasználó lassú lesz. Néha megoldhatja ezt a felesleges internethasználat megállításával (pl. a videók streamingjét vagy videokonferencia-hívásokat figyelő emberek) ...
         
    * Az **a felhasználó internetkapcsolata** Jelenleg lassú?
Keresse meg az internetet az "internet sebesség tesztre", és használja az egyik ingyenes online tesztet, például[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/)... Ha a felhasználó internetkapcsolata lassú, lelassítja hozzáférésétERDDAP... Néha meg tudják oldani ezt azáltal, hogy megállítják a felesleges internethasználatot intézményükön (pl. a videók streamingjét vagy videokonferencia-hívásokat figyelő emberek) ...
         
    *    **Stuck?**   
Lásd:[rész további támogatás megszerzéséről](/docs/intro#support)...

### Shut Down és újraindítás{#shut-down-and-restart} 
*    **Hogyan kell leülni és újraindítani TomcatotERDDAP™**   
Nem kell leállítani és újraindítani Tomcatot ésERDDAPhaERDDAP™átmenetileg lassú, néhány ismert ok miatt lassan (mint sok kérés a forgatókönyvekből vagyWMSfelhasználók) vagy alkalmazni kell a változásokatdatasets.xmlfájl.
    
Le kell zárni és újra kell indítani Tomcatot ésERDDAP™ha változtatásokat kell alkalmaznia a setup.xml fájlra, vagy haERDDAP™fagyaszt, akaszt vagy bezár. extrém körülmények között,Javabefagyaszthat egy-két percig, miközben egy teljes szemétgyűjtést végez, de aztán felépül. Szóval jó várni egy percet vagy kettőt, hogy megnézze,Java/ERDDAP™valóban fagyasztott, vagy ha csak egy hosszú szemétgyűjtést végez. (Ha a szemétgyűjtés gyakori probléma,[több memória elosztása Tomcat számára](/docs/server-admin/deploy-install#memory)...) 
    
Nem ajánlom a Tomcat Web Application Manager használatát a Tomcat elindításához vagy leállításához. Ha nem zárja le és indítsa el a Tomcatot, előbb vagy utóbb PermGen memóriaproblémái lesznek.
    
Tomcat leállítása és újraindítása ésERDDAP:
    
    * Ha Linuxot vagy Mac-et használ:
         (Ha létrehozott egy speciális felhasználót, hogy futtassa Tomcat, például tomcat, ne feledje, hogy a következő lépéseket, mint a felhasználó.)   
         
        1. Használja a cd *Tomcat* /bin
             
        2. Használja ps -ef|grep tomcat megtalálni a java/tomcat folyamatot ID (remélhetőleg csak egy folyamat kerül felsorolásra) - amit hívunk *javaProcessID* alá.
             
        3. HaERDDAP™fagyasztott/hung/zárt, gyilkosság -3 *javaProcessID* Mondd elJava  (amely fut Tomcat) egy küszöböt csinálni a Tomcat logfájlhoz: *Tomcat* /logs/catalina.out . Miután újraindított, diagnosztizálhatja a problémát azáltal, hogy megtalálja a szál dömping információit (egyéb hasznos információk felette) benne *Tomcat* /logs/catalina.out és azáltal is, hogy elolvasta a releváns részeit[ERDDAP™log archívum](#log)... Ha akarod, akkor betöltheted ezt az információt, és megnézheted a mi[rész további támogatás megszerzéséről](/docs/intro#support)...
             
        4. Használjon . / leállítást. Árnyék
             
        5. Használja ps -ef|grep tomcat ismételten, amíg a java/tomcat folyamat nem szerepel.
            
Néha a java/tomcat folyamat két percig tart, hogy teljesen leálljon. Ennek oka:ERDDAP™Üzenetet küld a háttér szálainak, hogy megállítsák őket, de néha hosszú időt vesz igénybe, hogy jó megállási helyre jussanak.
            
        6. Ha egy perc után, vagy úgy, java/tomcat önmagában nem áll meg, akkor használhatja
gyilkosság -9 *javaProcessID*   
kényszerítse a java/tomcat folyamatot, hogy azonnal leálljon. Ha lehetséges, használja ezt csak utolsó üdülőhelyként. A -9 kapcsoló erős, de különböző problémákat okozhat.
             
        7. ÚjraindításERDDAP™, Használja ./startup.sh
             
        8. MegtekintésERDDAP™a böngészőben ellenőrizze, hogy az újraindítás sikeres volt. (Néha 30 másodpercet kell várnia, és megpróbálja betölteniERDDAP™ismét a böngészőben, hogy sikeres legyen.)   
             
    * Ha Windows-t használ:
         
        1. Használja a cd *Tomcat* /bin
             
        2. Használatshutdown.bat  
             
        3. Előfordulhat, hogy szeretné / Szüksége van a Windows Feladatkezelő használatára (elérhető Ctrl Alt Del) annak biztosítására, hogyJava/Tomcat/ERDDAP™a folyamat/alkalmazás teljesen megállt.
Néha a folyamat/alkalmazás legfeljebb két percet vesz igénybe, hogy leálljon. Ennek oka:ERDDAP™Üzenetet küld a háttér szálainak, hogy megállítsák őket, de néha hosszú időt vesz igénybe, hogy jó megállási helyre jussanak.
             
        4. ÚjraindításERDDAP™Használja az induló.batot
             
        5. MegtekintésERDDAP™a böngészőben ellenőrizze, hogy az újraindítás sikeres volt. (Néha 30 másodpercet kell várnia, és megpróbálja betölteniERDDAP™ismét a böngészőben, hogy sikeres legyen.)   
             
### gyakori balesetek vagy fagyasztások{#frequent-crashes-or-freezes} 
HaERDDAP™lassúvá válik, összeomlik vagy befagy, valami rossz. Nézd meg[ERDDAP"A log fájl](#log)próbálja kitalálni az okot. Ha nem tudsz, kérjük a részleteket, és lásd a mi[rész további támogatás megszerzéséről](/docs/intro#support)...

A leggyakoribb probléma egy problémás felhasználó, aki egyszerre több írást futtat, és / vagy valaki, aki számos érvénytelen kérést tesz. Ha ez megtörténik, valószínűleg feketelistát kell használnia a felhasználónak. Amikor egy feketelistás felhasználó kérést tesz, a hibaüzenet a válaszban arra ösztönzi őket, hogy e-mailt küldjenek a problémák kidolgozására. Ezután arra ösztönözheti őket, hogy egyszerre csak egy szkriptet futtassanak, és rögzítse a szkriptjeikben lévő problémákat (pl. egy távoli adatkészletből származó adatok kérése, amely nem válaszolhat az időzítés előtt) ... Lásd:&lt;kérésBlacklist&gt; az Öndatasets.xmlfájl] (/docs/server-admin/datasets#requestblacklist) ...

extrém körülmények között,Javabefagyaszthat egy-két percig, miközben egy teljes szemétgyűjtést végez, de aztán felépül. Szóval jó várni egy percet vagy kettőt, hogy megnézze,Java/ERDDAP™valóban fagyasztott, vagy ha csak egy hosszú szemétgyűjtést végez. (Ha a szemétgyűjtés gyakori probléma,[több memória elosztása Tomcat számára](/docs/server-admin/deploy-install#memory)...) 

HaERDDAP™lassú vagy lefagyasztódik, és a probléma nem egy gondos felhasználó vagy egy hosszú szemétgyűjtés, általában megoldhatja a problémát[újraindításERDDAP™](#shut-down-and-restart)... A tapasztalatom az, hogyERDDAP™hónapokig futhat anélkül, hogy újraindításra lenne szüksége.
     

### Monitor{#monitor} 
MegfigyelhetedERDDAPstátusza, ha megnézzük[/erddap/status.htmloldal](#status-page), nevezetesen a statisztikák a felső részben. HaERDDAP™lassú vagy fagyasztódik, és a probléma nem csak rendkívül nehéz használat, általában megoldhatja a problémát[újraindításERDDAP™](#shut-down-and-restart)... További metrikák állnak rendelkezésre a Prometheus integrációján /erddap/metrikusokon.

A tapasztalatom az, hogyERDDAP™hónapokig futhat anélkül, hogy újraindításra lenne szüksége. Csak akkor kell újraindítania, ha olyan változtatásokat szeretne alkalmazni, amelyeket megtettERDDAP"s setup.xml vagy ha új verziókat kell telepítenieERDDAP™,JavaTomcat vagy az operációs rendszer. Ha újra kell indítaniERDDAP™Gyakran valami rossz. Nézd meg[ERDDAP"A log fájl](#log)próbálja kitalálni az okot. Ha nem tudsz, kérjük a részleteket, és lásd a mi[rész további támogatás megszerzéséről](/docs/intro#support)... ideiglenes megoldásként megpróbálhatja használni[Monit](https://mmonit.com/monit/)nyomon követniERDDAP™és indítsa újra, ha szükséges. Vagy krónikus munkát végezhet az újraindításhozERDDAP™  (proaktív módon) rendszeresen. Lehet, hogy egy kis kihívás, hogy írjon egy szkriptet, hogy automatizálja a monitoring és újraindításERDDAP... Néhány tipp, amely segíthet:

* Egyszerűsítheti a tesztelést, ha a Tomcat folyamat még mindig a -c átkapcsolásával működik:
ps -u *Tomcat Felhasználó*  |gep -c java
Ez csökkenti az "1" kimenetet, ha a tomcat folyamat még mindig él, vagy "0", ha a folyamat leállt.
     
* Ha jó a gawk, akkor kivonhatja a folyamatID eredményeiből
ps -u *Tomcat Felhasználó*  |grep java, és használja a folyamatID más sorok a forgatókönyv.
     

Ha monitot vagy krónikus munkát hozol létre, akkor nagyszerű lenne, ha megoszthatnád a részleteket, így mások hasznot tudnának látni[rész további támogatás megszerzéséről](/docs/intro#support)Mert ahol megoszthatsz.

#### Permgen{#permgen} 
Ha többször használja a Tomcat Manager-t újratöltéshez (vagy Stop és Start)  ERDDAP™,ERDDAP™Lehet, hogy nem indul ki, és dobja a java.lang. OutOfMemoryError: PermGen. A megoldás az, hogy rendszeresen (vagy minden alkalommal?)  [zárja le és indítsa újra a tomcatot ésERDDAP™](#shut-down-and-restart)helyett csak újratöltésERDDAP...
\\[Frissítés: Ez a probléma nagymértékben minimalizált vagy rögzített voltERDDAP™1.24 verzió.\\]  
     
#### Bejelentkezés{#log} 
*    **[Log.txt](#log)**   
HaERDDAP™nem indul fel, vagy ha valami nem működik a vártnál, nagyon hasznos a hiba és a diagnosztikai üzenetek megtekintése.ERDDAP™log fájl.
    * A log fájl *bigParentDirectory[szerkesztés]* /log/log.txt
         ( *bigParentDirectory[szerkesztés]* meg van határozva[setup.xml](/docs/server-admin/deploy-install#setupxml)) ... Ha nincs log. txt fájl vagy ha a log. txt fájl nem frissült, mivel újraindítottERDDAP™Nézd meg[Tomcat Log fájlok](#tomcat-logs)látni, van-e hibaüzenet.
    * A diagnosztikai üzenetek típusai a naplófájlban:
        * A "hiba" szót akkor használják, amikor valami olyan rosszul ment, hogy az eljárás nem sikerült befejezni. Bár bosszantó hiba, a hiba arra kényszeríti, hogy foglalkozzon a problémával. A mi gondolkodásunk az, hogy jobb egy hibát kidobni, mintERDDAP™hobble együtt, dolgozzon olyan módon, ahogy nem számított.
        * A "háború" szót akkor használják, amikor valami rosszul ment, de az eljárás befejeződött. Ezek elég ritkák.
        * Bármi más csak informatív üzenet. Ellenőrizheti, hogy mennyi információ van bejelentkezve [&lt;logLevel&gt;] (/docs/server-admin/datasets#loglevel)  datasets.xml...
        * Adatkészlet-visszatöltések és felhasználói válaszok, amelyek &gt;10 másodperccel a befejezéshez (sikeresen vagy sikertelenül) "jellemzik" (&gt; 10-es évek&#33;) "..." Így megkeresheti a log.txt fájlt ehhez a kifejezéshez, hogy megtalálja azokat az adatkészleteket, amelyek lassúak voltak újratöltésre, vagy a kérelmek számát, amelyek lassan befejeződtek. Ezután magasabbra tekinthet a log.txt fájlban, hogy megnézze, mi volt az adatkészlet probléma, vagy mi volt a felhasználói kérelem, és kitől származott. Ezek a lassú adatkészletek és felhasználói kérések néha adóztatnakERDDAP... Tehát többet tudni ezekről a kérésekről, segíthet azonosítani és megoldani a problémákat.
    * Az információt a lemezmeghajtó logfájljára írják meglehetősen nagy darabokban. Az előny az, hogy ez nagyon hatékony -ERDDAP™Soha nem fogja megakadályozni, hogy az információt a naplófájlra írják. A hátrány az, hogy a napló szinte mindig egy részleges üzenettel fog véget érni, amely addig nem fejeződik be, amíg a következő darab meg nem íródik. Készíthetsz naprakészen (Egy pillanatra) megtekintveERDDAPstatus weboldal https://*your.domain.org*/erddap/status.html   (vagyhttp://hahttpsnem engedélyezett) ...
    * Amikor a log.txt fájlok 20 MB-re kerülnek,
a fájlt átnevezik a logó. txt.previous és egy új log.txt fájl jön létre. Tehát a logfájlok nem halmoznak fel.
        
A setup.xml-ben megadhat egy másik maximális méretet a logfájlnak, a MegaBytes-ben. A megengedett minimum 1 (MB) ... A megengedett maximum 2000 (MB) ... Az alapértelmezettség 20 (MB) ... Például:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```

    * Amikor újraindulszERDDAP™,
        ERDDAP™készítsen egy archív másolatot a log.txt és a log. txt.previous fájlok egy időbélyeggel a fájl nevében. Ha baj volt az újraindítás előtt, hasznos lehet ezeket az archivált fájlokat a nyomokat, hogy mi volt a baj. Törölheti az archív fájlokat, ha már nem szükségesek.
         
##### A log.txt{#parsing-logtxt} 
ERDDAPLog. txt fájl nem tervezett a csomagoláshoz (Bár lehet, hogy képes lesz rendszeres kifejezéseket létrehozni, amelyek kivonják a kívánt információkat) ... Úgy tervezték, hogy segítsen egy embernek kitalálni, mi történik, amikor valami rosszul megy. Ha hibát vagy problémajelentést nyújt beERDDAP™fejlesztők, ha lehetséges, kérjük, tartalmazza az összes információt a log.txt fájl kapcsolódó a gondos kérelem.

Hatékony okokból,ERDDAP™csak az információt írja a naplóra. txt után egy nagy része információ halmozott. Tehát, ha látogasson el a naplóra. txt közvetlenül a hiba bekövetkezte után, a hibahoz kapcsolódó információk még nem írtak log.txt-re. Annak érdekében, hogy tökéletesen naprakész információkat kapjon a log.txt-tól, látogasson el a webhelyéreERDDAPA[status.html oldal](#status-page)... MikorERDDAP™folyamatok, amelyek kérik, az összes függő információt a log.txt.

MertERDDAP™használati statisztikák, kérjük, használja a[Apache és / vagy Tomcat log fájlok](#tomcat-logs)helyetteERDDAPLog.txt. Vegyük észre, hogyERDDAPA[status.html oldal](#status-page)  (Néhány) és[Napi jelentés](#daily-report)  (Több) nagyszámú használati statisztikákkal rendelkezik az Ön számára.
    
### Tomcat Logs{#tomcat-logs} 
HaERDDAP™nem indul ki, mert a hiba nagyon korán történtERDDAPAz indulás, a hibaüzenet megjelenik Tomcat logfájljaiban ( *Tomcat* /logs/catalina. *ma ma ma* .log vagy *Tomcat* /logs/catalina.out) Nem[ERDDAPLog.txt fájl](#log)...

Használati statisztika: A legtöbb információ, amit az emberek szeretne gyűjteni egy logfájl (pl. használati statisztikák) Kérjük, használja az Apache és / vagy Tomcat logfájlokat. Szépen formázzák őket, és ilyen típusú információkkal rendelkeznek. Számos eszköz van például az elemzéshez,[AWStats](https://www.awstats.org),[ElasticSearch Kibana](https://www.elastic.co/products/kibana)és[JMeter](https://jmeter.apache.org)Keresse meg az internetet, hogy megtalálja a megfelelő eszközt az Ön céljaira.

Vegye figyelembe, hogy a logfájlok csak IP-címként azonosítják a felhasználókat. Vannak olyan weboldalak, amelyek segítenek egy adott IP-címhez kapcsolódó információk megszerzésében, pl.[WhatIsMyIPAddress](https://whatismyipaddress.com/ip-lookup), de általában nem lesz képes megtalálni a felhasználó nevét.

Szintén, mert[DHCP](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol)Egy adott felhasználó IP-címe eltérő lehet a különböző napokon, vagy a különböző felhasználók különböző időpontokban azonos IP-címet kaphatnak.

Alternatívaként használhat valami hasonlót[Google Analytics](https://analytics.google.com/analytics/web/provision/?authuser=0#/provision)... De vigyázzon: ha külső szolgáltatásokat használ, mint a Google Analytics, akkor feladja a felhasználók magánéletét azzal, hogy a Google teljes hozzáférést biztosít a tevékenységéhez az Ön webhelyén, amely a Google (és mások?) örökké tarthat és bármilyen célra használhat (talán nem technikailag, de valószínűleg a gyakorlatban) ... A felhasználók nem beleegyeztek ehhez, és valószínűleg nem tisztában vannak azzal, hogy nyomon követik a webhelyét, ahogy valószínűleg nem tudják, hogy szinte minden weboldalon követik őket. Manapság sok felhasználó nagyon aggódik amiatt, hogy minden, amit az interneten tesznek, ezeket a nagyvállalatokat figyelik. (Google, Facebook, stb.) és a kormány, és megtalálja ezt a nem karantén behatolást az életükbe (mint a könyvben, 1984) ... Ez sok felhasználót vezetett, hogy olyan termékeket telepítsen, mint[Adatvédelmi Badger](https://www.eff.org/privacybadger/faq)a nyomkövetés minimalizálása, alternatív böngészők használata, mint például[Tor Browser](https://www.torproject.org/)  (vagy kapcsolja le a nyomkövetést a hagyományos böngészőkben) Alternatív keresőmotorok használata, mint például[Duck Duck Go](https://duckduckgo.com/)... Ha olyan szolgáltatást használ, mint a Google Analytics, kérjük, legalább dokumentálja a használatát, és a következmények megváltoztatásával&lt;standardPrivacyPolicy&gt; címkeERDDAPA
\\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml fájl.
    
### E-Mail Log{#e-mail-log} 
*    **e-mailLogYEAR-MM-DD.txt**   
    ERDDAP™mindig írja az összes kimenő e-mail üzenet szövegét a jelenlegi napi e-mailben LogYEAR-MM-DD.txt fájl *bigParentDirectory[szerkesztés]* /logok ( *bigParentDirectory[szerkesztés]* meg van határozva[setup.xml](/docs/server-admin/deploy-install#setupxml)) ...
    * Ha a szerver nem küldhet e-mail üzeneteket, vagy ha konfiguráltERDDAP™nem küldjön e-mail üzeneteket, vagy ha csak kíváncsi vagy, ez a fájl kényelmes módja annak, hogy megnézze az összes küldött e-mail üzenetet.
    * Törölheti az előző napok e-mail logfájljait, ha már nem szükségesek.
         
### Napi jelentés{#daily-report} 
A Daily jelentés sok hasznos információt tartalmaz - az összes információt aERDDAPA[/erddap/status.htmloldal](#status-page)Sőt.
    * Ez a legteljesebb összefoglalója az Ön számáraERDDAPstátusz.
    * Többek között statisztikák, ez magában foglalja az olyan adatkészletek listáját, amelyek nem voltak betöltve és az általuk generált kivételeket.
    * Ez akkor keletkezik, amikor elkezdeszERDDAP™  (Csak utánaERDDAP™befejezi az összes adatkészlet betöltését) és hamarosan 7 órakor keletkezett, minden reggel helyi idő.
    * Amikor keletkezik, meg van írva[ERDDAPLog.txt fájl](#log)...
    * Amikor keletkezik, e-mailt küldünk&lt;e-mailDailyReportsTo&gt; és&lt;e-mailMinden To&gt; (amelyek meg vannak határozva[setup.xml](/docs/server-admin/deploy-install#setupxml)) feltéve, hogy létrehozta az e-mail rendszert (Beállítás.xml) ...

### Status oldal{#status-page} 
Megtekintheti a státuszátERDDAP™bármilyen böngészőből, ha megy&lt;alapUrl&gt;/erddap/status.html
* Ez az oldal dinamikusan keletkezik, így mindig rendelkezik up-to-the-moment statisztikákkal az Ön számáraERDDAP...
* Tartalmazza a statisztikákat a kérések, a memóriafelhasználás, a küszöbérték nyomai, a feladatmenet stb. tekintetében.
* Mivel a Status oldalt bárki is megtekintheti, nem tartalmaz olyan sok információt, mint amilyen a[Napi jelentés](#daily-report)...
         
### Adatok módosítása / megváltoztatása{#addingchanging-datasets} 
ERDDAP™rendszerint újraolvasásokdatasets.xmlMinden *loadDatasetsMinMinutes*   (meghatározott[setup.xml](/docs/server-admin/deploy-install#setupxml)) ... Így változtathatszdatasets.xmlbármikor, még akkor is,ERDDAP™fut.
Egy új adatkészletet hamarosan észlelnek, általában belül *loadDatasetsMinMinutes* ...
A módosított adatkészlet újratöltésre kerül, ha *ReloadEveryNMinutes* öreg (a megadottdatasets.xml) ...
    
#### zászló{#flag} 
*    **[Flag File](#flag)TellsERDDAP™Próbáljon ki újratölteni egy adatkészletet, amint lehetséges** 
    
    *   ERDDAP™nem fogja észrevenni az adatkészlet beállításának módosításátdatasets.xmlamígERDDAP™visszatölti az adatkészletet.
         
    * MegmondaniERDDAP™adatkészlet visszatöltése a lehető leghamarabb (az adatkészlet előtt)&lt;reloadEveryNMinutes&gt; azt okozná, hogy újratöltésre kerüljön), tegye be egy fájlt *bigParentDirectory[szerkesztés]* /flag ( *bigParentDirectory[szerkesztés]* meg van határozva[setup.xml](/docs/server-admin/deploy-install#setupxml)) ugyanaz a név, mint az adatkészletdatasetID...
Ez azt mondjaERDDAP™próbálja újratölteni az ASAP adatkészletet.
Az adatkészlet régi verziója mindaddig elérhető lesz a felhasználók számára, amíg az új verzió nem érhető el, és atomikusan lenyelődik.
MertEDDGridFromFiles és EDDTable FromFiles, a reloading adatkészlet új vagy megváltozott fájlokat keres, olvassa el azokat, és beépítse őket az adatkészletbe. Tehát az újratöltés ideje az új vagy megváltozott fájlok számától függ.
Ha az adatkészlet aktív="hamis",ERDDAP™eltávolítja az adatkészletet.
         
##### Bad Files zászló{#bad-files-flag} 
* A / zászlós könyvtár egyik változata a /badFilesFlag könyvtár. (HozzáadvaERDDAP™v2.12.)   
Ha fájlt helyezel be *bigParentDirectory[szerkesztés]* /badFilesFlag könyvtár egydatasetIDmint a fájl neve (a fájl tartalma nem számít) Akkor amintERDDAP™látja a rosszfiókokat Flag fájl,ERDDAP™akarat:
    
    1. Törölje a rosszFilesFlag fájlt.
    2. Törölje a rossz fájlokat.ncfájl (ha van egy) , amely tartalmazza a rossz fájlok listáját az adatkészlethez.
Olyan adatkészletek esetében, mintEDDGridSideBySide, amely gyermekDatasets, ez is törli a rossz fájlokat.ncfájl minden gyermek adatkészlethez.
    3. Töltse ki az ASAP adatkészletét.
    
Így ez okozzaERDDAP™ismét próbálkozni a korábban használt fájlokkal (téves?) rosszul jelzett.
         
##### Hard Flag{#hard-flag} 
* A /flag könyvtár másik változata a /hardFlag könyvtár. (HozzáadvaERDDAP™v1.74.)   
Ha fájlt helyez *bigParentDirectory[szerkesztés]* /hardFlag egydatasetIDmint a fájl neve (a fájl tartalma nem számít) Akkor amintERDDAP™látja a keményt Flag fájl,ERDDAP™akarat:
    
    1. Törölje a hardFlag fájlt.
    2. Távolítsa el az adatkészletetERDDAP...
    3. Törölje az összes információt, hogyERDDAP™tárolta ezt az adatkészletet.
MertEDDGridFromFiles és EDDTable A Files alosztályaiból ez törli az adatfájlok belső adatbázisát és azok tartalmát.
Olyan adatkészletek esetében, mintEDDGridA SideBySide, amely rendelkezik gyermekDatasets-szal, ez szintén törli az adatfájlok belső adatbázisát és tartalmát minden gyermekadatbázisra.
    4. Töltse újra az adatkészletet.
MertEDDGridFromFiles és EDDTable FromFiles alosztályok, ez okozzaERDDAP™Újraindítás **Minden** az adatfájlok. Így a reload idő függ az adatkészletben lévő adatfájlok teljes számától. Mivel az adatkészletet eltávolítottákERDDAP™Amikor a hardFlag-t észrevették, az adatkészlet nem lesz elérhető, amíg az adatkészlet be nem fejezi az újratöltést. Légy türelmes&#33; Nézz be[Log.txt](#log)fájl, ha szeretné látni, mi történik.
    
A hardFlag változata töröli az adatkészlet tárolt adatait, még akkor is, ha az adatkészletet jelenleg nem töltik beERDDAP...
    
Nehéz A zászlók nagyon hasznosak, ha csinálsz valamit, ami változást okoz, hogyanERDDAP™olvassa el és értelmezi a forrásadatokat, például amikor új verziót telepítERDDAP™vagy amikor megváltoztatta az adatkészlet meghatározásátdatasets.xml
    
* A zászló tartalma, a rosszFilesFlag és a hardFlag fájlok irrelevánsak.ERDDAP™Csak nézd meg a fájl nevét, hogy megkapddatasetID...
     
* A főbb adatkészlet-reloads között,ERDDAP™Folyamatosan néz ki a zászlóra, a rosszFilesFlagra és a hardFlag fájlokra.
     
* Vegye figyelembe, hogy ha egy adatkészletet újratöltik, minden fájlt *bigParentDirectory[szerkesztés]* /[Húsvét](#cached-responses)/ *datasetID* A könyvtárat törölik. Ez magában foglalja.ncés a képfájlok, amelyek általában ~15 percig sütöttek.
     
* Vegye figyelembe, hogy ha az adatkészlet xml-je tartalmazza[aktív="false"](/docs/server-admin/datasets#active), egy zászló okozza az adatkészletet, hogy inaktív (ha aktív) , és mindenesetre, nem töltve.
     
* BármikorERDDAP™fut a LoadDatasets-nek, hogy jelentős reloadot végezzen (az időzített újratöltést ellenőrzött&lt;loadDatasetsMinMinutes&gt;) vagy kisebb reload (külső vagy belső zászló következtében) ,ERDDAP™olvassa el az összeset&lt;DekompressedCacheMaxGB&gt;,&lt;DekompressedCacheMaxMinutesOld&gt;,&lt;felhasználó&gt;,&lt;kérésBlacklist&gt;,&lt;lassúDownTroubleMillis&gt; és&lt;előfizetésEmailBlacklist&gt; címkék és kapcsolja az új beállításokat. Így használhat egy zászlót, mint egy módja annak, hogy megkapjaERDDAP™hogy észrevegyék az ASAP-címkék változásait.

##### Adatkészlet zászló{#set-dataset-flag} 
*  ERDDAP™van egy webes szolgáltatás, hogy a zászlók beállíthatók az URL-eken keresztül.
    
    * Például,
         https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789   
         (Ez egy hamis zászló Key) zászlót fog beállítani az rPmelTao adatkészlethez.
    * Van egy másik zászlóKey minden egyes számáradatasetID...
    * Az adminisztrátorok láthatják a zászló URL-ek listáját az összes adatkészlet számára, ha megnézik az alját[Napi jelentés](#daily-report)e-mail.
    * Az adminisztrátoroknak bizalmasan kell kezelniük ezeket az URL-eket, mivel megadják valakinek a jogot, hogy visszaállítson egy adatkészletet.
    * Ha úgy gondolja, hogy a zászlóKey-k valaki kezébe esnek, aki visszaél, megváltoztathatja&lt;FlagKeyKey&gt; in[setup.xml](/docs/server-admin/deploy-install#setupxml)újraindításERDDAPKényelemERDDAP™létrehozni és használni egy másik sor flagKeys.
    * Ha megváltozik&lt;flagKeyKey&gt; törölje az összes régi előfizetést (lásd a listát a Daily jelentésben) és ne feledje, hogy küldje el az új URL-eket azoknak az embereknek, akiket akarsz nekik.
    
A zászlórendszer alapjául szolgálhat egy hatékonyabb mechanizmushoz a mondáshozERDDAP™mikor töltsön be egy adatkészletet. Például létrehozhat egy adatkészletet&lt;ReloadEveryNMinutes&gt; nagyszámú (pl. 10080 = 1 hét) ... Akkor, amikor tudod, hogy az adatkészlet megváltozott (Talán azért, mert hozzáadott egy fájlt az adatkészlet adattárához) Állítsa be a zászlót, hogy az adatkészlet a lehető leghamarabb újratöltse. A zászlókat általában gyorsan látják. De ha a LoadDatasets szál már elfoglalt, lehet, hogy egy ideig, mielőtt a zászlón járhat. De a zászlórendszer sokkal inkább felelős és sokkal hatékonyabb, mint a beállítás&lt;ReloadEveryNMinutes&gt; egy kis számba.
    
#### Adatkészletek eltávolítása{#removing-datasets} 
Ha egy adatkészlet aktívERDDAP™és ideiglenesen vagy állandóan akarja deaktiválni:
1. Inkábbdatasets.xmlaz adatkészlethez, beállítás[aktív="false"](/docs/server-admin/datasets#active)az adatkészletben.
2. VárjERDDAP™az adatkészlet eltávolítása a következő nagy reload alatt vagy[zászló beállítása](#flag)az adatkészlet számára, hogy elmondjaERDDAP™ezt a változást a lehető leghamarabb észre kell venni. Ha ezt megteszed,ERDDAP™nem dob ki semmilyen információt, amelyet tárolhatott az adatkészletről, és biztosan nem tesz semmit a tényleges adatokhoz.
3. Ezután elhagyhatja az aktív="hamis" adatkészletetdatasets.xmlvagy távolítsa el.
         
#### Mikor töltik újra az adatkészleteket?{#when-are-datasets-reloaded} 
A RunLoadDatasets nevű szál a mester szál, amely ellenőrzi, amikor az adatkészleteket újratöltik. RunLoad Az adatkészletek örökre hurok:

1. A RunLoadDatasets megjegyzi a jelenlegi időt.
2. A RunLoadDatasets egy LoadDatasets szálat indít, hogy "majorLoad"-t csináljon. Láthat információt a jelenlegi/previous bigLoad-ról a tetejénERDDAPA
    [/erddap/status.htmloldal](#status-page)  (például,[status oldal példa](https://coastwatch.pfeg.noaa.gov/erddap/status.html)) ...
    
    1. A LoadDatasets másolatot készítdatasets.xml...
    2. A LoadDatasets a másolaton keresztül olvashatódatasets.xmlés minden adatkészlet esetében látja, hogy az adatkészletnek szüksége van-e (Újra) betöltött vagy eltávolított.
        * Ha egy[zászló](#flag)fájl létezik ez az adatkészlet, a fájl törlődik, és az adatkészlet eltávolítása, ha aktív="hamis" vagy (Újra) betöltve, ha aktív="igaz" (az adatkészlet korától függetlenül) ...
        * Ha az adatkészlet adatkészlete.xml darab aktív="hamis", és az adatkészlet jelenleg be van töltve (aktív) , betöltetlen (eltávolítva) ...
        * Ha az adatkészlet aktív="true" és az adatkészlet már nem van betöltve, be van töltve.
        * Ha az adatkészlet aktív="true" és az adatkészlet már be van töltve, az adatkészletet újratöltik, ha az adatkészlet kora (Az utolsó terhelés óta) nagyobb, mint a&lt;újratöltés MindenNMinutes&gt; (alapértelmezett = 10080 perc) Egyébként az adatkészlet egyedül marad.
    3. A LoadDatasets befejeződik.
    
A RunLoadDatasets szál várja, hogy a LoadDatasets befejezze. Ha a LoadDatasets hosszabb ideig tart, mint a loadDatasets MinMinutes (a setup.xml-ben megadott) RunLoadDatasets megszakítja a LoadDatasets szálat. Ideális esetben a LoadDatasets észreveszi a megszakítást és befejezi. De ha nem veszi észre a megszakítást egy percen belül, a RunLoadDatasets loadDatasets-nek hívja. Megáll () , amely nem kívánatos.
3. Míg az utolsó nagyobb vezető kezdete óta eltelt idő kevesebb, mint a loadDatasets MinMinutes (mint a setup.xml, pl. 15 perc) RunLoadDatasets ismételten keres[zászló](#flag)fájlok a *bigParentDirectory[szerkesztés]* /flag könyvtár. Ha egy vagy több zászlófájl található, törlésre kerülnek, és a RunLoadDatasets elindítja a LoadDatasets szálát, hogy "minorLoad"-t csináljon. (Főoldal &gt; False) ... Nem látja a kisebbLoad információkat az ÖnERDDAPA[/erddap/status.htmloldal](#status-page)...
    1. A LoadDatasets másolatot készítdatasets.xml...
    2. A LoadDatasets a másolaton keresztül olvashatódatasets.xmlés minden adatkészlet esetében, amelyhez zászlófájl volt:
        * Ha az adatkészlet adatkészlete.xml darab aktív="hamis", és az adatkészlet jelenleg be van töltve (aktív) , betöltetlen (eltávolítva) ...
        * Ha az adatkészlet aktív="true", az adatkészlet (Újra) betöltve, korától függetlenül. A nem zászlós adatkészleteket figyelmen kívül hagyják.
    3. A LoadDatasets befejeződik.
4. RunLoad Az adatkészletek visszatérnek az 1. lépéshez.

Megjegyzések:
* Kezdőlap
Amikor újraindultERDDAP™, minden adatkészlet aktív="true" van betöltve.
* Cédula
Amikor egy adatkészlet (Újra) betöltve, a cache (beleértve az adatválasz fájlokat és / vagy képfájlokat) üres.
* Sok adatkészlet
Ha sok adatkészlet és / vagy egy vagy több adatkészlet lassú (Újra) terhelés, a LoadDatasets szál sok időt vehet igénybe a munkájának befejezéséhez, talán még hosszabb, mint a loadDatasets MinMinutes.
* Egy LoadDatasets szálak
Soha nem több, mint egy LoadDatasets szál fut egyszerre. Ha egy zászló van beállítva, amikor a LoadDatasets már fut, a zászló valószínűleg nem lesz észrevehető vagy cselekszik, amíg a LoadDatasets szál fut. Azt mondhatnánk: "Ez hülye. Miért nem indít egy csomó új szálat az adatkészletek betöltéséhez? De ha sok adatkészlete van, amelyek egy távoli szerver adatait kapják, még egy LoadDatasets szál is jelentős stresszt fog okozni a távoli szerveren. Ugyanez igaz, ha sok adatkészlete van, amelyek egy RAID-on adatot kapnak. Gyorsan csökkenő visszatérések vannak attól, hogy több mint egy LoadDatasets szál.
* Flag = ASAP
A zászló beállítása csak azt jelzi, hogy az adatkészletnek kell lennie (Újra) a lehető leghamarabb betöltött, nem feltétlenül azonnal. Ha nem fut a LoadDatasets szál, az adatkészlet néhány másodpercen belül újratöltődik. De ha egy LoadDatasets szál jelenleg fut, az adatkészlet valószínűleg nem lesz újratöltve, amíg a LoadDatasets szál befejeződik.
* Flag File törölt
Általában, ha egy zászlófájlt helyez be *bigParentDirectory[szerkesztés]* /erddap/flag könyvtár (az adatkészlet zászlajának meglátogatásával Url vagy egy tényleges fájl elhelyezése ott) Az adatkészletet általában hamarosan újratöltik, miután a zászlófájl törlődik.
* zászlóversus Small reload EveryNMinutes
Ha van valamilyen külső módja annak, hogy tudja, mikor kell egy adatkészletet újratölteni, és ha ez kényelmes az Ön számára, a legjobb módja annak, hogy megbizonyosodjon arról, hogy az adatkészlet mindig naprakész, hogy beállítsa a reload MindenNMinuták egy nagy számban (10080?) zászló beállítása (egy forgatókönyven keresztül?) bármikor újra kell tölteni. Ez az a rendszer, amelyEDDGridFromErddap és EDDTableFromErddap használata olyan üzeneteket kap, amelyeket az adatkészletet újra kell tölteni.
* Nézd meg a log.txt
Sok releváns információt írnak a *bigParentDirectory[szerkesztés]* /logs/log.txt fájl. Ha a dolgok nem működnek, ahogy várjuk, nézd meg a naplót. txt lehetővé teszi, hogy diagnosztizálja a problémát azáltal, hogy pontosan megtudja, mitERDDAP™tette.
    
    * Keressen "majorLoad=true"-t a nagy LoadDataset szálak kezdetéért.
    * Keressen "majorLoad=false" a kisebb LoadDatasets szálak kezdetéért.
    * Keressen egy adott adatkészletetdatasetIDinformáció arról, hogy (Újra) betöltött vagy lekérdezett.
        
          
         
#### Cached válaszok{#cached-responses} 
Általában,ERDDAP™nem cache (Áruház) válaszok a felhasználói kérelmekre. A racionale az volt, hogy a legtöbb kérés kissé más lenne, így a cache nem lenne nagyon hatékony. A legnagyobb kivételek a képfájlok kérései (amelyek a böngészők és programok óta csípnek, mint példáulGoogle EarthGyakran ismételt képek) és kérelmek.ncfájlok (mert nem hozhatók létre a repülésen) ...ERDDAP™tárolja az egyes adathalmazok láncolt fájlait egy másik könyvtárban: *bigParentDirectory[szerkesztés]* /cache/ *datasetID* Mivel egyetlen cache-könyvtár hatalmas számú fájlt tartalmazhat, amelyek lassúak lehetnek a hozzáféréshez.
A fájlokat három okból eltávolítják a süteményből:
* Az összes fájlt ebben a cache-ban törölték, haERDDAP™újraindításra kerül.
* Rendszeresen minden fájl több, mint&lt;cacheMinutes&gt; régi (a megadott[setup.xml](/docs/server-admin/deploy-install#setupxml)) törlésre kerül. A fájlok eltávolítása a kor alapján (Nem legkevésbé fejlett) biztosítja, hogy a fájlok nem maradnak a cache-ban nagyon hosszú ideig. Bár úgy tűnhet, mintha egy adott kérés mindig ugyanazt a választ adja vissza, ami nem igaz. Például egytabledapkérés, amely tartalmazza &time&gt; *Néhány Idő* megváltozik, ha új adatok érkeznek az adatkészlethez. És egy griddap kérelem, amely magában foglalja\\[utolsó\\]Az idő dimenziója megváltozik, ha új adatok érkeznek az adatkészlethez.
* A hibás feltételeket mutató képek csípődnek, de csak néhány percig (nehéz helyzet) ...
* Minden alkalommal, amikor egy adathalmazt újratöltik, minden fájlt az adathalmazban törölnek. Mert a kérések lehetnek"last"index egy rácsos adatkészletben, a cache fájlok érvénytelenné válhatnak, ha egy adatkészletet újratöltik.
         
#### Stored Dataset információ{#stored-dataset-information} 
valamennyi adatkészlet esetében,ERDDAP™gyűjtsön sok információt, amikor egy adatkészlet be van töltve, és tartja ezt az emlékezetben. Ez lehetővé tesziERDDAP™nagyon gyorsan reagálni a keresésekre, az adatkészletek listáira vonatkozó kérelmekre, és információt kér egy adatkészletről.

Néhány adatkészlet esetében (nevezetesenEDDGridMásolás, EDDTableCopy,EDDGridTőle *Xxx* Files és EDDTableFrom *Xxx* Fiók) ,ERDDAP™tárolja a lemezen néhány információt az újrafelhasznált adatkészletről, amikor az adatkészletet újratöltik. Ez nagyban felgyorsítja a reloading folyamatot.

* Néhány adatállomány emberi olvasható.jsonfájlokat és tároltak *bigParentDirectory[szerkesztés]* /dataset/ *Last2LettersOfDatasetID/datasetID* ...
*   ERDDAP™csak töröli ezeket a fájlokat szokatlan helyzetekben, például, ha hozzáadja vagy törölje a változót az adatkészletbőldatasets.xmlcunk.
* A legtöbb változás egy adatkészletdatasets.xmlcunk (pl. globális tulajdonság vagy változó tulajdonság megváltoztatása) Ne feledje, hogy törölje ezeket a fájlokat. A rendszeres adatkészlet-reload kezeli ezeket a változásokat. ElmondhatjaERDDAP™Adatkészlet újratöltése ASAP beállításával[zászló](#flag)az adatkészlethez.
* Hasonlóképpen, az adatfájlok kiegészítése, törlése vagy módosítása akkor kerül kezelésre, haERDDAP™visszatölti az adatkészletet. DeERDDAP™hamar észreveszi az ilyen típusú változást, és automatikusan, ha az adatkészletet használja [&lt;frissítésEveryNMillis&gt; (/docs/server-admin/datasets#updateeverynmillis) rendszer.
* Csak ritkán szükséges, hogy törölje ezeket a fájlokat. A leggyakoribb helyzet, ahol kényszeríteni kellERDDAP™törli a tárolt információkat (mert naprakész / helytelen, és nem lesz automatikusan rögzítveERDDAP) az, amikor megváltoztatja az adatkészletetdatasets.xmlcunk, amely befolyásolja, hogyanERDDAP™tolmácsolja az adatokat a forrásadat fájlokban, például megváltoztatja az idő változó formátumát.
* Az adatkészlet tárolt információs fájljainak törlése egyERDDAP™Ez fut (még akkor is, ha az adatkészletet jelenleg nem töltik be) Állítson be[kemény zászló](#hard-flag)az adatkészlethez. Ne feledje, hogy ha egy adatkészlet nagyszámú fájl aggregációja, az adatkészlet visszatöltése jelentős időt vehet igénybe.
* Az adatkészlet tárolt információs fájljainak törlése, amikorERDDAP™nem fut, fut[DasDds](/docs/server-admin/datasets#dasdds)az adatkészlethez (amely könnyebb, mint a kitalálás, amelyben a könyvtár az információ található és törli a fájlokat kézzel) ... Ne feledje, hogy ha egy adatkészlet nagyszámú fájl aggregációja, az adatkészlet visszatöltése jelentős időt vehet igénybe.
         
### Memory Status{#memory-status} 
ERDDAP™Soha nem szabad összeomlani vagy befagyasztani. Ha igen, az egyik legvalószínűbb oka nem elegendő memória. Figyelemmel kísérheti a memória használatát a status.html weboldal megtekintésével, amely olyan vonalat tartalmaz, mint amilyen a

0 gc calls, 0 kérés furcsa, és 0 veszélyes MemoryEmailek az utolsó nagy LoadDatasets óta

 (fokozatosan súlyosabb események)   
MB inUse és gc Calls oszlopok a statisztikák táblázatában. Elmondhatja, hogy a memória-stresszERDDAP™figyeli ezeket a számokat. A magasabb számok több stresszt jeleznek.

* Az MB inUse mindig kevesebb, mint a fele[\\-Xmx memória beállítás](/docs/server-admin/deploy-install#memory)... A nagyobb számok rossz jelek.
* gc calls jelzi az idők számátERDDAP™a szemétgyűjtőnek nevezte, hogy megpróbálja enyhíteni a magas memóriahasználatot. Ha ez lesz &gt;100, ez egy jele a súlyos baj.
* Shed jelzi a beérkező kérelmek számát, amelyek (HTTP hibaszám 503, szolgáltatás elérhető) mert a memóriahasználat már túl magas volt. Ideális esetben semmilyen kérelmet nem szabad lefeküdni. Rendben van, ha néhány kérés lefeküdt, de komoly baj jele, ha sokan lefeküdnek.
* veszélyes MemoryEmails - Ha a memóriahasználat veszélyesen magas lesz,ERDDAP™e-mailt küld a felsorolt e-mail címekre&lt;e-mailMinden To&gt; (Beállítás.xml) az aktív felhasználói kérések listájával. Ahogy az e-mail mondja, kérjük, továbbítsa ezeket az e-maileket Chrisnek. John at noaa. gov, így használhatjuk az információkat a jövőbeli verziók javításáraERDDAP...
     

Ha a teERDDAP™memória stresszes:
* Fontolja meg a szerver memóriájának több elosztásátERDDAP™megváltoztatva a Tomcat[−Xmx memória beállítás](/docs/server-admin/deploy-install#memory)...
* Ha már annyi memóriát osztottál el, amennyit csak tudszERDDAP™-Xmx, fontolja meg, hogy vásárol több memória a szerver. A memória olcsó (egy új szerver vagy az idő árához képest) &#33; Ezután növelje -Xmx.
* Inkábbdatasets.xml, készlet&lt;nGridThreads&gt; 1, set&lt;nTableThreads&gt; 1-re, és&lt;ipAddressMaxRequestsActive&gt; 1.
* Nézd meg a log.txt kéréseit nem hatékony vagy problémás (de legitim) kérések. Adja hozzá az IP-címeket&lt;Blacklist&gt; bennedatasets.xml... A feketelist hibaüzenet tartalmazza aERDDAP™adminisztrátor e-mail címe azzal a reméléssel, hogy ezek a felhasználók kapcsolatba lépnek veled, hogy dolgozhasson velük.ERDDAP™hatékonyabban. Jó, ha megtartja az IP listáját, foglalkozik a feketelistával, és miért, hogy dolgozzon a felhasználókkal, ha kapcsolatba lépnek veled.
* Nézd meg a log.txt kéréseit a rosszindulatú felhasználóktól. Adja hozzá az IP-címeket&lt;Blacklist&gt; bennedatasets.xml... Ha hasonló kérelmek érkeznek több hasonló IP-címet, akkor használhat néhányat, aki szolgáltatás (pl.:[ https://www.whois.com/whois/ ](https://www.whois.com/whois/)) Ismerje meg az IP-címek tartományát ebből a forrásból és a feketelistából az egész tartományt. Lásd:&lt;Blacklist&gt; dokumentáció (/docs/server-admin/datasets#requestblacklist) ...
         
#### OutOfMemoryError{#outofmemoryerror} 
Amikor létrehoztálERDDAP™meghatározza a maximális memória mennyiségét,JavaHasználhat keresztül[\\-Xmx beállítás](/docs/server-admin/deploy-install#memory)... HaERDDAP™Mindig több memóriára van szüksége, mint ez, egy javát dobja. Lang. OutOfMemoryError.ERDDAP™csomó ellenőrzést végez annak érdekében, hogy ezt a hibát kegyesen kezelje (pl. a probléma merül fel, de a rendszer megtartja az integritását) ... De néha a hiba károsítja a rendszer integritását, és újra kell indítaniaERDDAP... Remélhetőleg ez ritka.

Az OutOfMemoryError gyors és egyszerű megoldása a[\\-Xmx beállítás](/docs/server-admin/deploy-install#memory), de soha nem kell növelni a -Xmx beállítást a fizikai memória több mint 80% -ára a szerveren (pl. egy 10GB-os kiszolgáló esetében ne állítsa be -Xmx 8GB felett) ... A memória viszonylag olcsó, így jó lehetőség lehet a memória növelésére a szerveren. De ha a kiszolgáló memóriáját vagy más okok miatt maximalizálta, akkor közvetlenül az OutOfMemoryError ügyével kell foglalkoznia.

Ha belenézel[Log.txt](#log)fájl, hogy megnézze, mitERDDAP™Amikor a hiba merült fel, általában jó kőzetet kaphat az OutOfMemoryError ügyében. Sok lehetséges oka van, beleértve:

* Egyetlen hatalmas adatfájl okozhatja az OutOfMemoryError-t, nevezetesen hatalmas ASCII adatfájlokat. Ha ez a probléma, nyilvánvalónak kell lennie, mertERDDAP™nem fogja betölteni az adatkészletet (mesés adatkészletek) vagy olvassa el az adatokat ebből a fájlból (a rácsos adatkészletekért) ... A megoldás, ha megvalósítható, a fájlt több fájlba osztja. Ideális esetben a fájlt logikai darabokra oszthatja. Például, ha a fájl 20 hónapos adatértékkel rendelkezik, 20 fájlra osztja, mindegyik 1 hónapos adatértékkel. De vannak előnyök még akkor is, ha a fő fájlt önkényesen osztják fel. Ennek a megközelítésnek több előnye van: a) Ez csökkenti az adatfájlok 1/20. elolvasásához szükséges memóriát, mert csak egy fájl olvasható egy időben. b) Gyakran,ERDDAP™sokkal gyorsabban kezelheti a kérelmeket, mert csak egy vagy néhány fájlban kell megnéznie, hogy megtalálja az adatokat egy adott kérésre. c) Ha az adatgyűjtés folyamatban van, akkor a meglévő 20 fájl változatlan maradhat, és csak egy, kis, új fájlt kell módosítania, hogy hozzáadja a következő hónapi adatértéket az adatkészlethez.
* Egyetlen hatalmas kérelem okozhatja az OutOfMemoryErrort. Különösen, néhány közülükorderByopciók a teljes válasz a memória egy második (pl. egyfajta cselekedet) ... Ha a válasz hatalmas, akkor a hibához vezethet. Mindig lesznek olyan kérések, amelyek különböző módon túl nagyok. Megoldhatja a problémát az -Xmx beállítás növelésével. Vagy ösztönözheti a felhasználót, hogy készítsen egy sor kisebb kérést.
* Nem valószínű, hogy sok fájl okozná a fájl indexetERDDAP™olyan nagynak tűnik, hogy ez a fájl hibát okozna. Ha feltételezzük, hogy minden fájl 300 byte-t használ, akkor 1 000 fájl csak 300 MB-t használna. De a rengeteg adatfájl adatkészletei más problémákat okoznakERDDAP– nevezetesen, sokáig tartERDDAP™megnyitni az összes adatfájlt, amikor válaszol egy felhasználói adatkérésre. Ebben az esetben a megoldás lehet, hogy összesítse a fájlokat, hogy kevesebb adatfájl van. A tabuláris adatkészletek esetében gyakran nagyszerű, ha megmenti az adatokat a jelenlegi adatkészlettől[CF Discrete Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contiguous Ragged Array adatfájlok (kérés.ncCF fájlok aERDDAP) Ezután készítsen új adatkészletet. Ezek a fájlok nagyon hatékonyan kezelhetőkERDDAPA[EDDTableFromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles)... Ha logikailag megszervezik őket (mindegyik adat egy darab űr és idő) ,ERDDAP™nagyon gyorsan kivonhatja az adatokat tőlük.
* A tambuláris adatkészletek esetében, amelyek a [[szerkesztés]]]&lt;subsetVariables&gt;&gt;&gt;&gt;&gt;&gt; (/docs/server-admin/adatbázisok#subsetvariables) tulajdonság,ERDDAP™egyedi kombinációk táblázata ezeknek a változóknak az értékeinek. Hatalmas adatkészletek vagy ha&lt;subsetVariables&gt; félreértve, ez az asztal elég nagy lehet az OutOfMemoryErrors okozásához. A megoldás az, hogy eltávolítsuk a változókat a listáról&lt;subsetVariables&gt; amelyekre nagyszámú érték van, vagy szükség szerint eltávolítják a változókat, amíg az asztal mérete ésszerű. A részeiERDDAP™használjasubsetVariablesrendszer nem működik jól (pl. a weboldalak nagyon lassan töltenek be) ha több mint 100.000 sor van ebben az asztalban.
* Mindig lehetséges, hogy több egyidejű nagy kérés (egy igazán elfoglaltERDDAP) kombinálhatja a memória baját. Például 8 kérés, mindegyik 1 GB-t használ, problémákat okozna egy -Xmx=8 GB beállításhoz. De ritka, hogy minden kérés egyidejűleg a memóriahasználat csúcsán állna. És könnyedén látni fogjátok, hogy a tiétekERDDAP™igazán elfoglalt nagy kérésekkel. De lehetséges. Nehéz kezelni ezt a problémát más, mint azáltal, hogy növeli a -Xmx beállítást.
* Vannak más forgatókönyvek is. Ha megnézed[Log.txt](#log)fájl, hogy megnézze, mitERDDAP™Amikor a hiba merült fel, általában jó okot kaphat az ok miatt. A legtöbb esetben van egy módja annak, hogy minimalizálja ezt a problémát (lásd fent) De néha csak több memóriára és magasabb -Xmx beállításra van szüksége.
         
### Túl sok nyílt fájl{#too-many-open-files} 
KezdőlapERDDAP™v2.12,ERDDAP™rendszerrel rendelkezik a nyílt fájlok számának nyomon követésére (amely magában foglalja az aljzatokat és más dolgokat, nem csak fájlokat) Tomcatban Linux számítógépeken. Ha néhány fájl hibásan soha nem zárva ("erőforrás szivárgás") A nyílt fájlok száma növekedhet, amíg meghaladja az operációs rendszer által megengedett maximumot, és számos nagyon rossz dolog történik. Tehát most, Linux számítógépeken (mert az információ nem elérhető a Windows számára) :

* Van egy "Open Files" oszlop a status.html weboldal szélsőjobboldalán, amely megmutatja a max fájlok százalékát. A Windows-on csak "?.
* MikorERDDAP™generálja ezt az információt az egyes jelentős adatkészletek újratöltésének végén, a naplóra nyomtat. txt fájl:
OpenFileCount= *jelenlegi* max= *max* %= *százalék* 
* Ha a százalék &gt;50%, egy e-mailt küldünkERDDAP™adminisztrátor és az e-mail Minden E-mail címekre.

Ha a százalék 100%,ERDDAP™szörnyű bajban van. Ne hagyja, hogy ez megtörténjen.
Ha a százalék &gt;75 %,ERDDAP™közel van a szörnyű bajhoz. Ez nem rendben van.
Ha a százalék &gt;50%, akkor nagyon lehetséges, hogy a pike okozza a százalékot, hogy elérje 100.
Ha a százalékos arány valaha &gt;50%, akkor:
* Növelje a maximális számú nyílt fájlok engedélyezett akár:
    * Ezek a változások minden alkalommal, mielőtt elkezdi tomcat (tedd őket a Tomcat startup.sh fájlba?) :
dalszöveg: Hn 16384
dalszöveg: Sn 16384
    * Vagy állandó változást hozni a szerkesztéssel (mint gyökér) /etc/security/limits.conf és a sorok hozzáadása:
tomcat soft nofil 16384
Tomcat kemény nofil 16384
Ezek a parancsok feltételezik, hogy a Tomcat felhasználóját "tomcatnak" nevezik.
Sok Linux változatban újra kell indítania a szervert, hogy alkalmazza ezeket a változásokat. Mindkét lehetőség esetében a fenti „16384” példa. Kiválasztod azt a számot, amit gondolsz, a legjobb.
* KezdésERDDAP... Az operációs rendszer bezár minden nyílt fájlt.
         
### Hibás kérések{#failed-requests} 
*    **Szokatlan tevékenység: a kérések 25%-a nem sikerült**   
Minden reloadDataset részeként, amely általában 15 perc,ERDDAP™Nézze meg az utolsó reloadDatasets óta elbukott kérések százalékos arányát. Ha ez &gt;25%,ERDDAP™e-mailt küldERDDAP™adminisztrátor a „Szokatlan tevékenység: a kérések 25%-a kudarcot vallott”. Ez az e-mail egy tally közel az alján "Requester IP cím (Hiábavaló)   (Az utolsó Major LoadDatasets) "..." Keress erre&#33; Azt mondja, hogy a számítógépek IP-címe a leghibásabb kéréseket teszi. Ezután keresheti ezeket az IP címeket a\\[bigParentDirectory[szerkesztés]\\]/log/[Log.txt](#log)fájlt, és nézze meg, milyen típusú kéréseket készítenek.
    
Használhatja a felhasználó IP-számát (például,[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)) próbálja kitalálni, ki vagy mi a felhasználó. Néha ez elég pontosan elmondja, hogy ki a felhasználó (pl. a keresőmotor webes személyzete) ... Legtöbbször csak ad egy csiszolót (pl. ez egy amazonaws számítógép, ez egy bizonyos egyetem, ez valaki egy bizonyos városban) ...
    
A tényleges kérelem, az IP-szám és a hibaüzenet megtekintésével (minden[Log.txt](#log)) egy sor hiba, akkor általában kitalálni alapvetően mi megy rosszul. Tapasztalataim szerint négy gyakori oka van sok sikertelen kérésnek:
    
1) A kérések rosszindulatúak (pl. biztonsági gyengeségek keresése, vagy kérelmek készítése, majd törölje őket, mielőtt befejezték őket) ... Használnia kell&lt;Blacklist&gt; bennedatasets.xmlfeketelistára ezeket az IP címeket.
    
2) A keresőmotor naiv módon próbálja meg az URL-eket, amelyek szerepelnekERDDAP™weboldalak és ISO 19115 dokumentumok. Például sok hely van, amelyek felsorolják az alapotOPeNDAPURL például https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST amelyhez a felhasználónak hozzá kell adnia egy fájltípust (pl.: .das, .dds, .html) ... De a keresőmotor nem tudja ezt. És az alap URL iránti kérelem kudarcot vall. A kapcsolódó helyzet az, amikor a keresőmotor bizarr kéréseket generál, vagy megpróbálja kitölteni a formanyomtatványokat annak érdekében, hogy "rejtett" weboldalakra jusson. De a keresőmotorok gyakran rossz munkát végeznek, ami kudarcokhoz vezet. A megoldás: hozzon létre egy[robotok.txt](#robotstxt)fájl.
    
3) Néhány felhasználó egy olyan forgatókönyvet futtat, amely többször kér valamit, ami nincs ott. Lehet, hogy ez egy olyan adatkészlet, amely már létezett, de most eltűnt (átmenetileg vagy állandóan) ... A szalagok gyakran nem várják el ezt, és így nem foglalkoznak vele intelligensen. Tehát a forgatókönyv csak megtartja a kéréseket, és a kérések továbbra is kudarcot vallanak. Ha kitalálhatja, hogy ki a felhasználó (a fenti IP-számból) Kapcsolatba lépjen velük, és elmondja nekik, hogy az adatkészlet már nem áll rendelkezésre, és kérje meg őket, hogy változtassák meg a forgatókönyvüket.
    
4) Valami nagyon rossz néhány adatkészlettel. Általában,ERDDAP™a zavart adatkészlet inaktívvá válik. Néha nem, így az összes kérés csak hibákhoz vezet. Ha igen, oldja meg a problémát az adatkészlettel vagy (ha nem tudod) állítsa be az adatkészletet[aktív="false"](/docs/server-admin/datasets#active)... Természetesen ez okozhat problémát #2.
    
Néha a hibák nem olyan rosszak, különösen, haERDDAP™felismerheti a hibát, és nagyon gyorsan reagálhat (&lt;= 1ms). Tehát úgy dönthet, hogy nem tesz lépést.
    
Ha minden más nem sikerül, van egy univerzális megoldás: add hozzá a felhasználó IP-számát a [&lt;kérésBlacklist&gt; (/docs/server-admin/datasets#requestblacklist) ... Ez nem olyan rossz vagy drasztikus opció, mint amilyennek látszik. Ezután a felhasználó hibaüzenetet kap, ami azt mondja, hogy feketelistázták és elmondta nekik, hogy (aERDDAP™adminisztrátor) e-mail cím. Néha a felhasználó kapcsolatba lép veled, és megoldhatja a problémát. Néha a felhasználó nem lép kapcsolatba veled, és látni fogja, hogy pontosan ugyanaz a viselkedés jön egy másik IP szám a következő napon. A Blacklist az új IP-számot és reméli, hogy végül megkapják az üzenetet. (Vagy ez a Te Groundhog-napod, ahonnan soha nem fogsz menekülni. Sajnálom.) 
    
### robotok.txt{#robotstxt} 
A keresőmotor cégek webes személyzetet használnak (pl. Google Bot) megvizsgálni az összes oldalt az interneten, hogy hozzáadja a tartalmat a keresőmotorokhoz. MertERDDAP™Ez alapvetően jó.ERDDAP™sok linket tartalmaz az oldalak között, így a személyzet megtalálja az összes weboldalt, és hozzáadja őket a keresőmotorokhoz. Ezután a keresőmotorok felhasználói képesek lesznek adatkészleteket találni az Ön számáraERDDAP...
    
Sajnos, néhány webes személyzet (pl. Google Bot) most kitöltik és benyújtják a formákat, hogy további tartalmakat találjanak. A webes kereskedelmi oldalak számára ez nagyszerű. De ez szörnyűERDDAP™mert csak egyhez vezet **végtelen** a nemkívánatos és értelmetlen kísérletek száma a tényleges adatok felszámolására. Ez több adatkéréshez vezethet, mint az összes többi felhasználó kombinálva. És kitölti a keresőmotort goofy-val, a tényleges adatok értelmetlen alkészleteivel.
    
Annak érdekében, hogy megmondja a webes személyzetnek, hogy hagyja abba a formákat, és általában nem nézi a weboldalakat, amelyeket nem kell megnéznie, létrehoznia kell egy szöveges fájlt, amelyet az úgynevezett[robotok.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)a weboldal dokumentumhierarchiájának gyökerkönyvtárában, hogy bárki is megtekinthesse, pl. http://*www.your.domain*/robots.txt ...
Ha új robotokat hoz létre. txt fájl, ez egy jó kezdet:
```
    User-Agent: \\*
    Disallow: /erddap/files/ 
    Disallow: /files/ 
    Disallow: /images/ 
    Disallow: /\\*?
    Disallow: /\\*?\\*
    Disallow: /\\*.asc\\*
    Disallow: /\\*.csv\\*
    Disallow: /\\*.dods\\*
    Disallow: /\\*.esriAscii\\*
    Disallow: /\\*.esriCsv\\*
    Disallow: /\\*.geoJson\\*
    Disallow: /\\*.htmlTable\\*
    Disallow: /\\*.json\\*
    Disallow: /\\*.mat\\*
    Disallow: /\\*.nc\\*
    Disallow: /\\*.odvTxt\\*
    Disallow: /\\*.tsv\\*
    Disallow: /\\*.xhtml\\*
    Disallow: /\\*.geotif\\*
    Disallow: /\\*.itx\\*
    Disallow: /\\*.kml\\*
    Disallow: /\\*.pdf\\*
    Disallow: /\\*.png\\*
    Disallow: /\\*.large\\*
    Disallow: /\\*.small\\*
    Disallow: /\\*.transparentPng\\*
    Sitemap: http://***your.institutions.url***/erddap/sitemap.xml
```
     (De cserélje ki *Your.institutions.url* veledERDDAPAlap URL.)   
Lehet, hogy néhány napig tart a keresőmotorok észrevétele és a hatásváltozások.
     
### webhelytérkép.xml{#sitemapxml} 
Mint a[ https://www.sitemaps.org ](https://www.sitemaps.org/)Webhely szerint:

> Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. In its simplest form, a Sitemap is an XML file that lists URLs for a site along with additional metadata about each URL (when it was last updated, how often it usually changes, and how important it is, relative to other URLs on the site) so that search engines can more intelligently crawl the site.
> 
> Web crawlers usually discover pages from links within the site and from other sites. Sitemaps supplement this data to allow crawlers that support Sitemaps to pick up all URLs in the Sitemap and learn about those URLs using the associated metadata. Using the Sitemap protocol does not guarantee that web pages are included in search engines, but provides hints for web crawlers to do a better job of crawling your site.

Valójában, mivelERDDAP™azRESTful, keresőmotoros pókok könnyen lecsaphatják aERDDAP... De gyakrabban csinálják (naponta&#33;) a szükségesnél (Havi?) ...

* Tekintettel arra, hogy minden keresőmotor lecsaphatja az egészetERDDAP™Minden nap ez sok szükségtelen kéréshez vezethet.
* SzóvalERDDAP™webhelytérkép.xml fájlt generál az Ön számáraERDDAP™amely azt mondja a keresőmotoroknak, hogy az ÖnERDDAP™csak havonta kell összetörni.
* Hozzá kell adnia egy hivatkozástERDDAPwebhelytérkép.xml a[robotok.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)fájl:
Sitemap: http://**www.yoursite.org**/erddap/sitemap.xml
 
* Ha ez nem tűnik, hogy az üzenetet a személyzetnek kapja, elmondhatja a különböző keresőmotorokat a webhelytérkép.xml fájlról az URL-ek látogatásával (változás **YourInstitution** az intézmény akronymája vagy rövidítése és **www.yoursite.org** a teERDDAPURL) :
    *    https://www.bing.com/webmaster/ping.aspx?siteMap=http://**www.yoursite.org**/erddap/sitemap.xml
 
    *    https://www.google.com/ping?sitemap=http://**www.yoursite.org**/erddap/sitemap.xml(I Gondolj csak egyszer kell minden keresőmotort pingelned, minden alkalommal. A keresőmotorok ezután észlelik a webhelytérkép.xml-es változásokat rendszeresen.
     
### Adatok terjesztése / Adatok terjesztése Hálózatok:PushésPullTechnológia{#data-dissemination--data-distribution-networks-push-and-pull-technology} 
* Általában,ERDDAP™közvetítőként működik: kérelmet vesz igénybe a felhasználótól; távoli adatforrásból kap adatokat; megreformálja az adatokat; és elküldi a felhasználónak.
*   [PullTechnológia](https://en.wikipedia.org/wiki/Pull_technology):ERDDAP™szintén képes aktívan megkapni az összes rendelkezésre álló adatot egy távoli adatforrásból, és[tárolja az adatok helyi másolatát](/docs/server-admin/datasets#eddgridcopy)...
*   [PushTechnológia](https://en.wikipedia.org/wiki/Push_technology): használatávalERDDAPA[előfizetési szolgáltatások](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)más adatkiszolgálók értesülhetnek, amint új adatok állnak rendelkezésre, hogy kérjék az adatokat (az adatok húzásával) ...
*   ERDDAPA[EDDGridFromErdap](/docs/server-admin/datasets#eddfromerddap)és[EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap)HasználatERDDAPElőfizetési szolgáltatások és[zászlórendszer](#flag)hogy azonnal értesüljön, amikor új adatok állnak rendelkezésre.
* Ezeket nagyszerű hatásra lehet kombinálni: ha becsomagol egyEDDGridMásolj körül egyEDDGridFromErdp adatkészlet (vagy csomagoljon EDDTableCopy körül egy EDDTableFromErddap adatkészlet) ,ERDDAP™automatikusan létrehozza és fenntartja a másik helyi másolatátERDDAPAdatkészlet.
* Mivel az előfizetési szolgáltatások amint új adatok állnak rendelkezésre, a nyomási technológia nagyon gyorsan terjeszti az adatokat (másodperceken belül) ...

Ez az architektúra mindenERDDAP™az adminisztrátor feladata annak meghatározása, hogy hol az adatai az ő / ő számáraERDDAP™jön.

* EgyébERDDAP™Az adminisztrátorok ugyanezt tehetik. Nincs szükség koordinációra az adminisztrátorok között.
* Ha sokanERDDAP™adminisztrátorok kapcsolódnak egymáshozERDDAPs, egy adatelosztó hálózat alakul ki.
* Az adatok gyorsan, hatékonyan és automatikusan terjesztődnek az adatforrásokból (ERDDAPS és más szerverek) az adatelosztási oldalakra (ERDDAPs) bárhol a hálózatban.
* Egy adottERDDAP™egyes adatkészletek és más adatkészletek újraelosztási oldalának forrása lehet.
* Az ebből eredő hálózat nagyjából hasonlít az olyan programokkal létrehozott adatelosztó hálózatokhoz, mint például[UnidataIDD/IDM](https://www.unidata.ucar.edu/projects/index.html#idd), de kevésbé merev strukturált.
         
### Biztonság, hitelesítés és engedélyezés{#security-authentication-and-authorization} 
Alapértelmezéssel,ERDDAP™fut, mint egy teljesen nyilvános szerver (használathttpvagyhttps) nincs login ([hitelesítés](https://en.wikipedia.org/wiki/Authentication)) rendszer és nincs korlátozás az adatokhoz való hozzáférésre ([engedélyezés](https://en.wikipedia.org/wiki/Authorization)) ...

#### biztonság{#security} 
Ha korlátozni szeretné a hozzáférést néhány vagy minden adatkészlethez néhány felhasználó számára, használhatjaERDDAPBeépített biztonsági rendszer. Amikor a biztonsági rendszer használatban van:

*   ERDDAP™Használat[szerepalapú hozzáférés-ellenőrzés](https://en.wikipedia.org/wiki/Role-based_access_control)...
    * AERDDAP™Az adminisztrátor meghatározza a felhasználókat a [&lt;felhasználó&gt;] (/docs/server-admin/datasets#user) tagdatasets.xml... Minden felhasználó rendelkezik felhasználónévvel, jelszóval (ha hitelesítés=custom) és egy vagy több szerep.
    * AERDDAP™Az adminisztrátor meghatározza, hogy mely szerepek hozzáférhetnek egy adott adatkészlethez a [&lt;hozzáférhetőTo&gt; (/docs/server-admin/datasets#accessibleto) tagdatasets.xmlminden olyan adatkészlet esetében, amely nem rendelkezik nyilvános hozzáféréssel.
* A felhasználó login állapota (és link a bejelentkezéshez / ki) Minden weboldal tetején jelenik meg. (De egy bejelentett felhasználó megjelenikERDDAP™hogy ne jelentkezzen be, ha használjahttpURL.) 
* Ha&lt;A baseUrl&gt;, amelyet a beállításban megadott.xml egy **http** URL, azok a felhasználók, akik nem jelentkeznek be, használhatjákERDDAPA **http** URL. Ha&lt;baseHttpsUrl&gt; is meg van határozva, azok a felhasználók, akik nem jelentkeznek be, szintén használhatjákhttpsURL.
* HTTPS Csak - Ha&lt;A baseUrl&gt;, amelyet a beállításban megadott.xml egy **https** URL, azok a felhasználók, akik nem jelentkeznek be, bátorítva vannak (nem kényszerítve) HasználniERDDAPA **https** URL - az összes kapcsolatERDDAP™weboldalak fognak hivatkoznihttpsURL.
    
Ha arra szeretné kényszeríteni a felhasználókat, hogy használjákhttpsURL, adjon hozzá egy átirányított állandó vonalat belül&lt;VirtualHost \\*:80&gt; szakasz az Apache konfigurációs fájljában (általábanhttpd.conf) pl.:
    
```
    <VirtualHost \\*:80>
        \\[...\\]
        ServerName example.com
        Redirect permanent / https://example.com/
    </VirtualHost>
```

Ha akarja, van egy további módszer arra, hogy kényszerítse a használatáthttps: [HTTP szigorú közlekedésbiztonság (HSTS) ](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security)... Használni:
    
    1. Lehetővé teszi az Apache Headers Module: A2enmod headers
    2. Adja hozzá a további vezetőt a HTTPS VirtualHost irányelvhez. A Max-age másodpercekben mérhető, és néhány hosszú értékre állítható.
        
```
        <VirtualHost \\*:443>
            # Guarantee HTTPS for 1 Year including Sub Domains 
            Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
    
Kérjük, vegye figyelembe, hogy ez a fejléc csak érvényes a HTTPS VirtualHost.
    
Az ok, amiért nem kényszerítik a felhasználókat használnihttpsAz URL-ek: a mögöttes SSL / TLS link időt vesz igénybe a létrehozáshoz, majd időt vesz igénybe, hogy titkosítsa és dekódolja a felhasználó és a szerver közötti összes információt. De egyes intézmények megkövetelikhttpscsak.
    
* Felhasználók, akik be vannak jelentkezve MUST használatbaERDDAPA **https** URL. Ha használjákhttpURL-ek, úgy tűnik, hogyERDDAP™nem kell bejelentkezni. Ez biztosítja a kommunikáció magánéletét, és segít megelőzni[munkamenet hijacking és oldalsójackelés](https://en.wikipedia.org/wiki/Session_hijacking)...
* Bárki, aki nem jelentkezik be, hozzáférhet és használja a nyilvános adatkészleteket. Alapértelmezés szerint a magánadatok nem jelennek meg az adatkészletek listáján, ha a felhasználó nem jelentkezik be. Ha az adminisztrátor beállította a setup.xml-t&lt;listaPrivateDatasets&gt; igaznak, megjelennek. Megkíséreli adatok kérését a magánadatoktól (ha a felhasználó tudja az URL-t) átirányítva lesz a login oldalra.
* Bárki, aki be van jelentkezve, képes lesz látni és kérni az adatokat bármilyen nyilvános adatkészletből és bármilyen magánadatból, amelyhez a szerepük lehetővé teszi számukra a hozzáférést. Alapértelmezett, magánadatok, amelyekhez a felhasználónak nincs hozzáférése, nem jelennek meg az adatkészletek listáján. Ha az adminisztrátor beállította a setup.xml-t&lt;listaPrivateDatasets&gt; igaznak, megjelennek. Az adatok kérésére irányuló kísérletek, amelyekhez a felhasználónak nincs hozzáférése, átirányítva a bejelentkezési oldalra.
* ARSSa teljes magánadatbázisra vonatkozó információk csak a felhasználók rendelkezésére állnak (ésRSSolvasók) aki be van jelentkezve és engedélyezve, hogy használja ezt az adatkészletet. Ez tesziRSSnem nagyon hasznos a teljes magánadatok számára.
    
Ha egy adatkészlet privát, de annak&lt;graphsAccessibleTo&gt; (/docs/server-admin/adtasets#grafsaccessibleto) nyilvánosságra kerül, az adatkészletRSSbárki számára elérhető.
    
* E-mail előfizetések csak akkor hozhatók létre, ha egy felhasználó hozzáfér egy adatkészlethez. Ha egy felhasználó feliratkozik egy privát adatkészletre, az előfizetés továbbra is működik, miután a felhasználó bejelentette.

##### Biztonsági beállítás{#setup-security} 
A biztonsági/hitelesítési/engedélyezési rendszer létrehozása:

* A szabványERDDAP™ [Kezdő beállítás](/docs/server-admin/deploy-install)...
* Inkább[setup.xml](/docs/server-admin/deploy-install#setupxml),
    * Add/változtasd a&lt;hiteles&gt; érték semmitől a szokásig (ne használja ezt) E-mail (ne használja ezt) , google (ajánlott) , orcid (ajánlott) vagy oauth2 (amely google+orcid, ajánlott) ... Lásd az alábbi lehetőségeket.
    * Add/változtasd a&lt;baseHttpsUrl&gt; érték.
    * Insert / hiány&loginInfo;benne&lt;startBodyHtml&gt; megjeleníteni a felhasználó logját / out info minden weboldal tetején.
* Tesztelési célokra a személyi számítógépen,[kövesse ezeket az utasításokat, hogy konfigurálja a tomcatot az SSL támogatására](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html)  (alapjahttpskapcsolatok) egy kulcstár létrehozása egy[önjelölt tanúsítvány](https://en.wikipedia.org/wiki/Self-signed_certificate)és módosítva *Tomcat* /conf/server.xml a 8443 kikötő csatlakozójának leküzdésére. A Windows-on előfordulhat, hogy .keystore-t kell mozgatni a "c:\\Users\"-ból *Te vagy* ↑.keystore" c:\\Uers\\Default User\\.keystore" vagy "c:\\.keystore" (lásd: *Tomcat* /logs/catalina. *ma ma ma* .log, ha az alkalmazás nem tölt be, vagy a felhasználók nem látják a naplót az oldalon) ... Láthatja, mikor a .keystore tanúsítvány lejár a tanúsítvány vizsgálatával, amikor bejelentkezik.
    
Egy nyilvánosan hozzáférhető szerver számára, ahelyett, hogy önjelölt tanúsítványt használna, erősen ajánlott, hogy egy tanúsítványt vásároljon és telepítsen egy igazolást, amelyet egy[tanúsító hatóság](https://en.wikipedia.org/wiki/Certificate_authority)Mivel az ügyfeleinek nagyobb biztosítékot ad, hogy valóban kapcsolódnak az ÖnhözERDDAP™, nem egy man-in-the-middle verziója az ÖnERDDAP... Számos gyártó értékesít digitális tanúsítványokat. (Keressen internetet.) Nem drágák.
    
* Linux számítógépeken, ha a Tomcat az Apache-ban fut, módosítja a /etc/httpd/conf.d/ssl.conf fájl, amely lehetővé teszi a HTTPS forgalmat/fromERDDAP™anélkül, hogy a :8443 portszámot az URL-ben igényelné:
    1. A meglévő módosítás&lt;VirtualHost&gt; címke (ha van egy) , vagy adjon hozzá egyet a fájl végén, hogy legalább ezek a sorok:
```
        <VirtualHost \\_default\\_:443>
            SSLEngine on
            SSLProxyEngine On
            ProxyPass /erddap http://localhost:8443/erddap
            ProxyPassReverse /erddap http://localhost:8443/erddap
        </VirtualHost>
```

    2. Ezután indítsa el az Apache-t: /usr/sbin/apachectl - k kegyes (de néha más könyvtárban van) ...
* Inkább *Tomcat* /conf/server.xml, kommentálja a port=8443&lt;Connector&gt; címke:
```
    <Connector port="8443" 
        protocol="org.apache.coyote.http11.Http11NioProtocol"
        maxThreads="150" SSLEnabled="true">
        <SSLHostConfig>
        <Certificate certificateKeystoreFile="conf/localhost-rsa.jks" 
            type="RSA" />
        </SSLHostConfig>
    </Connector>
```
és változtassa meg a tanúsítvány helyétKeystoreFile.
##### Engedélyezés{#authorization} 
*   [Inkábbdatasets.xmlhozzon létre egy](#authorization)[[szerkesztés]]&lt;felhasználó&gt;] (/docs/server-admin/datasets#user) tag minden felhasználó számára felhasználónévvel, jelszóval (Ha engedélyezés=custom) és szerepek információ. Ez az engedélyezési részeERDDAPBiztonsági rendszer.
     
* Inkábbdatasets.xml, add hozzá [&lt;hozzáférhetőTo&gt; (/docs/server-admin/datasets#accessibleto) címke minden adatkészlethez, amely nem rendelkezik nyilvános hozzáféréssel.&lt;A hozzáférhetőTo&gt; megadja, hogy mely szerepet játszik az adatkészlethez.
     
* Indítsa újra Tomcat. Hiba? Ellenőrizze a Tomcat logokat.
     
* Kérdezd meg&#33; Minden hiba biztonsági hibához vezethet.
     
* Ellenőrizze, hogy a bejelentkezési oldal használjahttps  (nemhttp) ... Bejelentkezési kísérletekhttpautomatikusan át kell irányítani, hogyhttpsport 8443 (bár a portszámot el lehet rejteni egy Apache proxy segítségével) ... Lehet, hogy a hálózati adminisztrátorral kell dolgoznia, hogy lehetővé tegye a külső webes kérelmeket a 8443-as porthoz való hozzáférést a szerverén.
     
* Meg tudod változtatni&lt;felhasználó&gt; és&lt;hozzáférhetőTo&gt; címkék bármikor. A változásokat minden adatkészlet következő rendszeres újratöltésén, vagy az ASAP-on alkalmazzák, ha egy[zászló](#flag)...

##### Hitelesítés{#authentication} 
[ **Hitelesítés (Bejelentkezés) ** ](#authentication)  
Ha nem akarja, hogy a felhasználók bejelentkezzenek, ne adja meg az értékét&lt;hitelesítés&gt; a setup.xml-ben.
Ha azt szeretné, hogy a felhasználók bejelentkezzenek, meg kell határoznia egy értéket&lt;hitelesítés&gt;. Jelenleg,ERDDAP™támogatás
[szokás](#custom)  (ne használja ezt) ,
[e-mail cím](#email)  (ne használja ezt) ,
[google](#google)  (ajánlott) ,
[orcid](#orcid)  (ajánlott) és
[Oauth2](#oauth2)  (ajánlott) a hitelesítési módszerhez.
Ha szeretné engedélyezni a bejelentkezést, határozottan ajánljuk a google, orcid vagy oauth2 opciókat, mert megszabadítják Önt a felhasználó jelszavai tárolásától és kezelésétől (szükséges a szokáshoz) és biztonságosabbak, mint az e-mail opció. Ne feledje, hogy a felhasználók gyakran ugyanazt a jelszót használják különböző webhelyeken. Így lehet, hogy ugyanazt a jelszót használja az Ön számáraERDDAP™mint a bankjukban. Ez teszi a jelszavát nagyon értékes - sokkal értékesebb a felhasználó, mint csak az általuk kért adatok. Tehát annyit kell tenned, amennyit csak tudsz, hogy privát jelszavakat tartsd. Ez egy nagy felelősség. Az e-mail, google, orcid és oauth2 opciók gondoskodnak a jelszavakról, így nem kell összegyűjteni, tárolni vagy dolgozni velük. Tehát megszabadulsz ebből a felelősségből.

Minden&lt;hitelesítés&gt; opciók egy[Süti](https://en.wikipedia.org/wiki/HTTP_cookie)a felhasználó számítógépén, így a felhasználó böngészőjét be kell állítani, hogy engedélyezze a cookie-kat. Ha egy felhasználó készítERDDAP™számítógépes program kérései (nem egy böngésző) A cookie-k és a hitelesítés nehéz dolgozni. Ez egy közös probléma az összes hitelesítési rendszerrel. Sajnálom.

A részletek a&lt;hitelesítés&gt; opciók:

###### Vám{#custom} 
szokásERDDAP„Egyéni rendszer, amely lehetővé teszi a felhasználók számára, hogy bejelentkezzenek a Felhasználói Nevükbe és Jelszójukba egy weboldalon. Ha egy felhasználó 10 percen belül megpróbálja bejelentkezni, a felhasználót letiltják, hogy 10 percig próbál bejelentkezni. Ez megakadályozza, hogy a hackerek egyszerűen több millió jelszót próbáljanak ki, amíg megtalálják a megfelelőt.

Ez némileg biztonságos, mert a Felhasználónév és a Jelszó továbbításra kerülhttps  (nemhttp) , de autentication=google, orcid vagy oauth2 jobb, mert megszabadulnak attól, hogy kezelje a jelszavakat. A szokásos megközelítés megköveteli, hogy összegyűjtse a felhasználó nevét, és egy hash emésztése a jelszó (Használja a telefonját&#33; Az e-mail nem biztonságos&#33;) és tárolja őketdatasets.xml[[[szerkesztés]]]&lt;felhasználó&gt;] (/docs/server-admin/datasets#user) címkék.

A szokásos opcióval senki sem tud bejelentkezni addig, amíg nem (aERDDAP™adminisztrátor) létrehozni&lt;felhasználói&gt; címke a felhasználó számára, meghatározva a felhasználó nevét, mint a felhasználónév, a jelszó, mint a jelszó, és a szerepük.

Nem ajánlott
Mivel a kínos generálása és továbbítása a hash emésztése a felhasználó jelszavát, és a kockázatok miattERDDAP™a jelszavak hash emésztése, ez a lehetőség nem ajánlott.

Ennek az opciónak a biztonságának növelése:

* Biztosítani kell, hogy más felhasználók a szerveren (i.e. Linux felhasználók, nemERDDAP™felhasználók) nem olvashat fájlokat a Tomcat könyvtárban (főlegdatasets.xmlfájl&#33;) vagyERDDAPA bigParentDirectory.
Linux, mint felhasználó=tomcat, használja:
chmod - R g-rwx *bigParentDirectory[szerkesztés]*   
chmod - R o-rwx *bigParentDirectory[szerkesztés]*   
chmod - R g-rwx *TomcatDirectory*   
chmod - R o-rwx *TomcatDirectory*   
     
* UEPSHA256 használata&lt;jelszóEncoding&gt; a setup.xml-ben.
     
* Használja az aszecure-as-possible módszert, hogy adja át a felhasználó jelszavát a felhasználótól a felhasználóigERDDAP™adminisztrátor (telefon?) ...
         
###### e-mail cím{#email} 
Az e-mail hitelesítési lehetőség a felhasználó e-mail fiókját használja a felhasználó hitelesítésére (azzal, hogy e-mailt küldenek egy speciális linkkel, amelyet hozzá kell férniük ahhoz, hogy bejelentkezzenek) ... Ellentétben más e-maileket, hogyERDDAP™küldjön,ERDDAP™nem írja ezeket a meghívó e-maileket az e-mail logfájlba, mert bizalmas információkat tartalmaznak.
Elméletileg ez nem nagyon biztonságos, mert az e-maileket nem mindig titkosítják, így egy rossz srác, aki képes elfogni az e-maileket, visszaélhetné ezt a rendszert egy érvényes felhasználó e-mail címével, és elfoglalja a meghívó e-mailt.
A gyakorlatban, ha létrehozzaERDDAP™egy Google e-mail fiókot használjon e-mailek küldésére, és ha beállítja, hogy a kapcsolat egyik TLS opcióját használja, és ha a felhasználó rendelkezik egy Google e-mail fiókkal, ez kissé biztonságos, mert az e-mailek titkosítják az összes utat.ERDDAP™a felhasználónak.

Ennek az opciónak a biztonságának növelése:

* Győződjön meg róla, hogy más felhasználók a szerveren (i.e. Linux felhasználók, nemERDDAP™felhasználók) nem olvashat fájlokat a Tomcat könyvtárban vagyERDDAPA bigParentDirectory.
Linux, mint felhasználó=tomcat, használja:
chmod - R g-rwx *bigParentDirectory[szerkesztés]*   
chmod - R o-rwx *bigParentDirectory[szerkesztés]*   
chmod - R g-rwx *TomcatDirectory*   
chmod - R o-rwx *TomcatDirectory*   
     
* Állítsa be a dolgokat, hogy végleges biztonságot kapjon az e-mailekért, amelyeket küldtekERDDAP™a felhasználók számára. Például Google-központú rendszert hozhat létre, csak létrehozva&lt;felhasználói&gt; címkék a Google-managed e-mail címekhez, és létrehozza aERDDAP™Google e-mail kiszolgáló használata biztonságos / TLS kapcsolaton keresztül: a setup.xml-ben, használja például,
```
    <emailSmtpHost>smtp.gmail.com</emailSmtpHost>  
    <emailSmtpPort>587</emailSmtpPort>  
    <emailProperties>mail.smtp.starttls.enable|true</emailProperties>
```

Nem ajánlott
Az e-mail hitelesítési lehetőség nem ajánlott. Kérjük, használja a google, orcid vagy oauth2 opciót.

Mint a Google, az orcid és az oauth2 opciók esetében, az e-mail nagyon kényelmesERDDAP™adminisztrátorok - soha nem kell kezelni a jelszavakat vagy hash emésztéseiket. Mindössze annyit kell létrehoznod, hogy egy [&lt;felhasználó&gt;] (/docs/server-admin/datasets#user) tag egy felhasználó számáradatasets.xmla felhasználó e-mail címe, amelyERDDAP™használja a felhasználó nevét. (A jelszó tulajdonsága nem használható az autentication=email, google, orcid vagy oauth2 esetén.) 

Az e-mail opcióval csak olyan felhasználók vannak, akiknek van egy&lt;felhasználói&gt; címkedatasets.xmlmegpróbálhat bejelentkezniERDDAP™az e-mail címének biztosítása és az e-mailben szereplő linkre kattintva,ERDDAP™küldi őket.

ERDDAP™az e-mail címeket eseti érzékenyként kezeli. Ezt teszi az e-mail címek megtérítésével (belépéskor)&lt;felhasználói&gt; címkék) vagy felhasználók belépnek (a login formában) az összes alsó tételű verziójukhoz.

Authentication=email beállítása:

1. A beállításban.xml megváltoztatja a&lt;baseHttpsUrl&gt; címke értéke.
A kísérletezés / munka a személyi számítógépen, használja
     https://localhost:8443   
A nyilvánosság számáraERDDAP™Használat
     https://*your.domain.org*:8443   
vagy anélkül:8443, ha egy Apache-t használ[Proxypass](/docs/server-admin/deploy-install#proxypass)hogy a portszám nem szükséges.
     
2. A beállításban.xml megváltoztatja a&lt;hitelesítés&gt; címke értéke e-mail:
```
    <authentication>email</authentication>  
```

3. A setup.xml-ben győződjön meg róla, hogy az e-mail rendszer az összes&lt;e-mail...&gt; címkék, hogyERDDAP™E-maileket küldhet. Ha lehetséges, állítsa be ezt biztonságos kapcsolatot (SSL / TLS) az e-mail szerverhez.
     
4. A tedatasets.xmlteremtés [&lt;felhasználó&gt;] (/docs/server-admin/datasets#user) címkéket minden felhasználó számára, aki hozzáférést biztosít a személyes adatkészletekhez.
Használja a felhasználó e-mail címét, mint a felhasználónevét a címkén.
Ne adja meg a jelszó tulajdonságát a felhasználói címkén.
     
5. KezdésERDDAP™hogy a beállítások.xml ésdatasets.xmlhatást gyakorolni.
         
###### Google, orcid, oauth2{#google-orcid-oauth2} 
*   [ **google** ](#google),[ **orcid** ](#orcid)és[ **Oauth2** ](#oauth2)   (ajánlott)   
Mindhárom ilyen lehetőség az ajánlottERDDAP™hitelesítési lehetőségek. Ők mind a legbiztonságosabb lehetőségek. A többi lehetőség jelentősen gyengébb biztonsággal rendelkezik.
     
###### Google Google{#google} 
* A google hitelesítési lehetőség használata[Jel A Google segítségével](https://developers.google.com/identity/gsi/web/guides/overview), amely végrehajtása[OAuth 2.0 hitelesítési protokoll](https://oauth.net/2/)...ERDDAP™a felhasználók bejelentkeznek a Google e-mail fiókjába, beleértve a Google által irányított fiókokat, például@noaa.govfiókok. Ez lehetővé tesziERDDAP™a felhasználó személyazonosságának ellenőrzése (név és e-mail cím) és hozzáfér a profilképéhez, de nem adERDDAP™E-mailjeikhez, a Google Drive-hoz vagy bármilyen más privát információhoz való hozzáférés.
    
MertERDDAP™v2.22 és lent,ERDDAP™használt "Google Sign-In". A Google azt mondja, hogy a rendszer 2023. március 31-e után csökken. Ha még nem tetted meg, kérlek kapcsoljERDDAP™v2.23+ az új „Jel in with Google”-alapú hitelesítési rendszer használatához.
    
MertERDDAP™v2.23 példák egy Tartalombiztosítási-Policy konfigurált és a Google Hitelesítés használatával, hozzá kell adnia https://accounts.google.com az engedélyezett script-src listájára (vagy script-src-elem) ...ERDDAP™már nem használ https://apis.google.com Tehát, ha megengedte, akkor most eltávolíthatja.
    
MertERDDAP™v2.24+ hozzáadhat https://accounts.google.com/gsi/style a stlye-src és https://accounts.google.com/gsi/ a connect-src. A script-src-hez most használhatsz https://accounts.google.com/gsi/client.
 
    
További információkért mehetsz a[Google oldal](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)a CSP konfigurációról. Ha bármilyen kérdése van, lépjen kapcsolatba Chris.john-val a noaa.gov-nál.
         
###### Orcid{#orcid} 
* Az orcid hitelesítési lehetőség használata[Orcid hitelesítés](https://members.orcid.org/api/integrate/orcid-sign-in), amely végrehajtása[OAuth 2.0 hitelesítési protokoll](https://oauth.net/2/)...ERDDAP™a felhasználók bejelentkeznek[Orcid fiók](https://members.orcid.org/api/integrate/orcid-sign-in), amelyet a kutatók általában arra használják, hogy azonosítsák magukat. Ez lehetővé tesziERDDAP™ellenőrizni a felhasználó Orcid identitását és megkapni a Orcid számlaszámát, de nem adERDDAP™Hozzáférés más Orcid fiókinformációihoz.

###### Oauth2{#oauth2} 
* Az oauth2 opció lehetővé teszi a felhasználók számára, hogy jelezzék a Google-fiókjukat vagy az Orcid-fiókjukat.

A google, az orcid és az oauth2 opciók az utódok a nyílt lehetőség, amely megszűnt utánERDDAP™1.68 verzió, és amely a nyílt verzión alapult ID, ami most naprakész. Kérjük, kapcsolja be a Google-t, az orcid-ot vagy az oauth2 opciót.

Ezek a lehetőségek nagyon kényelmesekERDDAP™adminisztrátorok - soha nem kell kezelni a jelszavakat vagy hash emésztéseiket. Mindössze annyit kell létrehoznod, hogy egy [&lt;felhasználó&gt;] (/docs/server-admin/datasets#user) tag egy felhasználó számáradatasets.xmlamely meghatározza a felhasználó Google e-mail címét vagy a Orcid számlaszámát, mint a felhasználónevet. (A jelszó tulajdonsága nem használatos, ha hitelesítés = e-mail, google, orcid vagy oauth2.) 

Ezekkel a lehetőségekkel bárki jelentkezhet beERDDAP™a Google e-mail fiókjába vagy a Orcid fiókjába való beiratkozáskor, de senkinek sincs joga hozzáférni a magánadatbázisokhoz, amíg nem (aERDDAP™adminisztrátor) létrehozni&lt;felhasználói&gt; címke, a Google e-mail címét vagy a Orcid számlaszámát a felhasználónévként határozza meg, és meghatározza szerepüket.

ERDDAP™az e-mail címeket eseti érzékenyként kezeli. Ezt teszi az e-mail címek megtérítésével (belépéskor)&lt;felhasználói&gt; címkék) vagy felhasználók belépnek (a login formában) az összes alsó tételű verziójukhoz.

A google, orcid vagy oauth2 hitelesítés létrehozása:

* A beállításban.xml megváltoztatja a&lt;baseHttpsUrl&gt; címke értéke.
A kísérletezés / munka a személyi számítógépen, használja
     https://localhost:8443   
A nyilvánosság számáraERDDAP™Használat
     https://*your.domain.org*:8443   
vagy jobb, a :8443 nélkül, ha Apache-t használ[Proxypass](/docs/server-admin/deploy-install#proxypass)hogy a portszám nem szükséges.
     
* A beállításban.xml megváltoztatja a&lt;hitelesítés&gt; a címke értéke a google, orcid vagy oauth2, például:
```
    <authentication>oauth2</authentication>  
```
###### Google beállítás{#google-setup} 
* A google és az oauth2 opciók:
Kövesse az alábbi utasításokat a Google hitelesítésének létrehozásáhozERDDAP...
     
    1. Ha nincs Google e-mail fiókja,[Egy](https://www.google.com/intl/en_us/mail/help/about.html)  
         
    2. Kövesse[Ezek az utasítások](https://developers.google.com/identity/sign-in/web/devconsole-project)létrehozni egy Google Developers Console projektet, és kap egy ügyfél azonosítót.
        
Amikor a Google forma engedélyt kérJavaScript eredete, belép az értékbe&lt;baseHttpsUrl&gt; a személyi számítógépérőlERDDAP™setup.xml, például
         https://localhost:8443   
Egy második sorban add hozzá a&lt;baseHttpsUrl&gt; a nyilvánosságtólERDDAP™setup.xml, például
         https://*your.domain.org*:8443
 
        
Ne határozzon meg semmilyen engedélyezett átirányítási URI-t.
        
Ha meglátja az Ügyfélazonosítóját erre a projektre, másolja és beilleszti a setup.xml-be (általában csak alább).&lt;hitelesítés&gt; rendesen, de a elhelyezés valójában nem számít), a&lt;googleClientID&gt; címke, pl.
        &lt;googleClientID&gt; *YourClientID* &lt;/googleClientID&gt;
Az ügyfélazonosító körülbelül 75 karakterből álló húr lesz, valószínűleg több számjegyből indul, és véget ér a .apps.googleusercontent.com .
         
        
    3. A tedatasets.xml, hozzon létre egy [&lt;felhasználó&gt;] (/docs/server-admin/datasets#user) tag minden felhasználó számára, aki hozzáférést biztosít a magánadatbázisokhoz. A felhasználónév tulajdonsága a címkén:
        
        * Azoknak a felhasználóknak, akik bejelentkeznek a Google-be, használja a felhasználó Google e-mail címét.
        * Azok számára, akik beiratkoznak az orciddel, használja a felhasználó Orcid számlaszámát (dashokkal) ...
        
Ne adja meg a jelszó tulajdonságát a felhasználói címkéhez.
         
    4. KezdésERDDAP™hogy a beállítások.xml ésdatasets.xmlhatást gyakorolni.
         
###### Orcid beállítás{#orcid-setup} 
* Az orcid és az oauth2 opciók esetében:
Kövesse az alábbi utasításokat, hogy létrehozza az Orcid hitelesítést az Ön számáraERDDAP...
     (Részletekért lásd[Orcid hitelesítése API dokumentáció](https://members.orcid.org/api/integrate/orcid-sign-in)...)   
     
    1. Ha nincs Orcid fiókja,[Egy](https://orcid.org/signin)  
         
    2. Jelentkezzen be Orcid[ https://orcid.org/signin ](https://orcid.org/signin)használja a személyes Orcid fiókot.
         
    3. Kattintson a "Developer Tools" -ra ("For Researchers" alatt a tetején) ...
         
    4. Kattintson a „Register for the free ORCID public API” („Register for the free ORCID public API”) („Register for the free ORCID public API”) („Register for the free ORCID public API”) („Register for the free ORCID public API”) („Register for the free ORCID public API”) címre. Írja be ezt az információt:
Név:ERDDAP™a\\[szervezete\\]  
Webhely:\\[TeERDDAP"A domain\\]  
Leírás:ERDDAP™tudományos adatkiszolgáló. A felhasználóknak hitelesíteniük kell a Google-t vagy a Orcid-ot, hogy hozzáférjenek a nem nyilvános adatkészletekhez.
Redirect URIs:\\[TeERDDAP"A domain\\]/erddap/loginOrcid.html
         
    5. Kattintson a Save ikonra (Úgy néz ki, mint egy 3,5" lemez&#33;) ...
Ezután láthatja az ORCID APP Ügyfélazonosítóját és az ORCID Ügyfél Titkát.
         
    6. Másolja és pasztolja az ORCID APP ügyfélazonosítóját (amely a "APP-val" kezdődik) be setup.xml a&lt;orcidClientID&gt; címke, például
```
        <orcidClientID>APP-*ALPHANUMERICCHARACTERS*</orcidClientID>
```
    7. Másolja és pazarolja az ORCID ügyfél titkát (alfa-numerikus karakterek dashes) be setup.xml a&lt;orcidClientSecret&gt; címke, pl.
```
        <orcidClientSecret>*alpha-numeric-characters-with-dashes*</orcidClientSecret>
```

    8. A tedatasets.xml, hozzon létre egy [&lt;felhasználó&gt;] (/docs/server-admin/datasets#user) tag minden felhasználó számára, aki hozzáférést biztosít a magánadatbázisokhoz. A felhasználónév tulajdonsága a címkén:
        
        * Azoknak a felhasználóknak, akik bejelentkeznek a Google-be, használja a felhasználó Google e-mail címét.
        * Azok számára, akik beiratkoznak az orciddel, használja a felhasználó Orcid számlaszámát (dashokkal) ...
        
Ne adja meg a jelszó tulajdonságát a felhasználói címkéhez.
         
    9. KezdésERDDAP™hogy a beállítások.xml ésdatasets.xmlhatást gyakorolni.
             

###### Log In Either Way{#log-in-either-way} 
Ha használja a google, orcid vagy oauth2 hitelesítési lehetőségeket, és a Google Sign-In vagy Orcid hitelesítési API hirtelen megszűnik dolgozni (bármilyen okból) vagy megszűnik dolgozni, mintERDDAP™elvárások, a felhasználók nem tudnak bejelentkezni az Ön számáraERDDAP... ideiglenes (vagy állandó) megoldás, kérheti a felhasználókat, hogy írjanak alá a másik rendszerrel (kap egy Google e-mail fiókot, vagy kap egy Orcid fiókot) ... Ehhez:

1. Változtasd meg&lt;hitelesítés&gt; címke, hogy lehetővé tegye a másik hitelesítési rendszer. Az oauth2 opció lehetővé teszi a felhasználók számára, hogy bejelentkezzenek egy rendszerrel.
2. Duplicate minden&lt;felhasználói&gt; címkéket és megváltoztatja a Google e-mail címéből a megfelelő Orcid számlaszámhoz (vagy fordítva) De tartsa ugyanazt a szerepet, mint a szerepek.

###### OpenId{#openid} 
ERDDAP™már nem támogatja a nyílt hitelesítési opciót, amely nyílt változaton alapult ID, ami most naprakész. Kérjük, használja a google, orcid vagy oauth2 opciókat.

###### BASIC{#basic} 
ERDDAP™nem támogatja a BASIC hitelesítést, mert:
* A BASIC úgy tűnik, hogy az előre meghatározott weboldalak felé halad, amelyek biztonságos hozzáférést vagy takarót igényelnek az egész webhelyhez való hozzáféréshez, deERDDAP™lehetővé teszi (korlátozott hozzáférés) Adatkészleteket kell hozzáadni a-the-fly.
* A BASIC hitelesítése nem kínál utat a felhasználók számára, hogy jelentkezzenek&#33;
* A BASIC hitelesítése ismert, hogy nem biztonságos.

##### Biztonságos adatforrások{#secure-data-sources} 
Ha egy adatkészlet korlátozza a hozzáféréstERDDAP™felhasználók, az adatforrás (ott, aholERDDAP™megkapja az adatokat) Nem szabad nyilvánosan hozzáférhetőnek lenni. Szóval hogyan lehetERDDAP™megkapja a korlátozott hozzáférési adatkészletek adatait? Néhány lehetőség:

*   ERDDAP™szolgálhat adatokat a helyi fájlokból (például az EDDTable segítségével FromFiles vagyEDDGridFájlok) ...
     
*   ERDDAP™lehet egy[DMZ](https://en.wikipedia.org/wiki/Demilitarized_zone_(computing)) és az adatforrás (pl. egyOPeNDAPszerver vagy adatbázis) lehet egy mögött[tűzfal](https://en.wikipedia.org/wiki/Firewall), ahol hozzáférhetőERDDAP™de nem a nyilvánosság számára.
     
* Az adatforrás nyilvános weboldalon lehet, de bejelentkezést igényel az adatokhoz. A két adatkészlet, amitERDDAP™bejelentkezhet a hozzáférésbe[EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)és[EDDTableFromCassandra](/docs/server-admin/datasets#eddtablefromcassandra)... Ezek az adatkészletek támogatása (és mindig használni kell) felhasználónevek (teremtésERDDAP™felhasználó, aki csak olvasható kiváltságokkal rendelkezik) jelszavak, SSL kapcsolatok és egyéb biztonsági intézkedések.
    
De általában, jelenleg,ERDDAP™nem tudja kezelni ezeket az adatforrásokat, mert nincs rendelkezése az adatforrásra való bejelentkezéshez. Ez az oka annak, hogy miért férhet hozzá[EDDGridFromErddap és EDDTable FromErdap](/docs/server-admin/datasets#eddfromerddap)Az adatkészletek nem korlátozhatók. Jelenleg a helyiERDDAP™nincs módja annak, hogy bejelentkezzen és hozzáférjen a metaadat információhoz a távolbólERDDAP... És a "remote"ERDDAP™tűzfal mögött, és eltávolítja az adatkészlet hozzáférhetőségét A korlátozások nem oldják meg a problémát: mivel az EDDXxx felhasználói kérelmei FromErddap adatok kell átirányítani a távoliERDDAP™A távoliERDDAP™hozzáférhetőnek kell lennie.
    
#### A hackerek elleni védekezés{#defenses-against-hackers} 
Vannak rossz srác hackerek, akik megpróbálják kihasználni a biztonsági gyengeségek a szerver szoftver, mint példáulERDDAP...ERDDAP™követi a közös biztonsági tanácsot, hogy több réteg védekezés:

* Korlátozott kiváltságok - Az egyik legfontosabb védekezés a Tomcat futtatása egy olyan felhasználón keresztül, akit tomcatnak hívnak, amely nem rendelkezik jelszóval (így senki sem tud bejelentkezni, mint a felhasználó) és korlátozott fájlrendszer-kiváltságokkal rendelkezik (pl. az adatokhoz való kizárólagos hozzáférés) ... LásdERDDAPutasítások[Tomcat beállítása](/docs/server-admin/deploy-install#tomcat)...
* Nehéz használat - Általában,ERDDAP™nehéz használatra épül, többek között olyan szkriptek, amelyek több tízezer kérést tesznek, egy másik után. Ez nehézERDDAP™hogy egyszerre nyissa meg magát a nehéz legitim használatra, és pajzsolja magát a visszaélésekből. Néha nehéz megkülönböztetni a nehéz legitim felhasználást, a túlzott jogos használatot és az illegális használatot (néha nagyon könnyű) ... Egyéb védekezések között,ERDDAP™Tudatosan nem teszi lehetővé egyetlen kérést, hogy a rendszer erőforrásainak rendezetlen töredékét használja (ha a rendszer egyébként nem aktív) ...
* Határozott felhasználók azonosítása - HaERDDAP™lelassul vagy fagyasztva (Talán azért, mert egy naiv felhasználó vagy egy bot több szkriptet futtat, hogy egyidejűleg vagy talán egy rossz fiú miatt több kérelmet nyújtson be[Denial-of-service](https://en.wikipedia.org/wiki/Denial-of-service_attack)támadás) , megnézheti a[Daily jelentés e-mail](#daily-report)  (és gyakoribb azonos információk a[ERDDAP™log fájl](#log)) amely a legaktívabb felhasználók által tett kérések számát mutatja be (lásd: "Requester IP Address" (engedélyezett) "...") ...ERDDAP™e-maileket is küld az adminisztrátornak, amikor ott van[„Szokatlan tevékenység: a kérések 25%-a kudarcot vallott”](#failed-requests)... Ezután megnézhetedERDDAP™naplófájl, hogy megnézze kéréseik jellegét. Ha úgy érzi, hogy valaki túl sok kérést tesz, bizarr kérések (nem hinnétek el, amit láttam, jól, talán te is) , vagy támadási típusú kérések, hozzáadhatja IP-címét a feketelistához.
* Blacklist -- Hozzáadhatja a problémás felhasználók IP-címét, botokat és[Denial-of-service](https://en.wikipedia.org/wiki/Denial-of-service_attack)támadók aERDDAP [Blacklist](/docs/server-admin/datasets#requestblacklist), hogy a jövőbeli kérelmeket azonnal elutasítsák. Ez a beállítás adatasets.xmlhogy gyorsan hozzáadhat egy IP-címet a listához, majd[zászló](#flag)adatkészlet, hogyERDDAP™azonnal észreveszi és alkalmazza a változást. A feketelistázott felhasználóknak küldött hibaüzenet arra ösztönzi őket, hogy lépjenek kapcsolatba aERDDAP™adminisztrátor, ha úgy érzik, tévesen a feketelistára helyezték őket. (Tapasztalataink szerint több felhasználó nem tudta, hogy egyszerre több forgatókönyvet futtatnak, vagy hogy a forgatókönyvek értelmetlen kéréseket tettek.) 
* Adatbiztonság - Néhány adatkészlet (nevezetesen az EDDTableFromDatabase) további biztonsági kockázatok (pl. SQL injekció) saját biztonsági intézkedéseik vannak. Lásd az ilyen típusú adatkészletekre vonatkozó információkat[Együttműködésdatasets.xmlFile](/docs/server-admin/datasets)nevezetesen[EDDTableFromDatabase biztonság](/docs/server-admin/datasets#database-security)...
* Biztonsági audit - BárNOAAAz informatikai biztonság évekig visszautasította a szkennelési kéréseinket, most rutinszerűen szkennelik meg (Bob)  ERDDAP™telepítés. Bár a kezdeti vizsgálatok olyan problémákat találtak, amelyeket aztán rögzítettem, a későbbi vizsgálatok nem találtak problémákatERDDAP... A szkennelések sok dolog miatt aggódnak: nevezetesen, miveltabledapA kérések úgy néznek ki, mint az SQL kérések, aggódnak az SQL injekciós sebezhetőségek miatt. De ezek az aggályok megalapozatlanok, mertERDDAP™mindig a párokat és érvényesíti a lekérdezéseket, majd külön építi az SQL lekérdezést olyan módon, amely elkerüli az injekciós sebezhetőségeket. A másik dolog, amiről néha panaszkodnak, hogy a miénkJavaA verzió vagy a Tomcat verziók nem olyan naprakészek, mint amennyit csak akarnak, ezért válaszként frissítjük őket. Korábban felajánlottam, hogy megmutassam az embereknek a biztonsági jelentéseket, de most azt mondtam, hogy ezt nem tudom megtenni.

#### Kérdések? Javaslatok?{#questions-suggestions} 
Ha bármilyen kérdése vanERDDAPBiztonsági rendszer, vagy bármilyen kérdése, kétségei, aggodalmai vagy javaslatai arról, hogy hogyan épül fel, lásd[rész további támogatás megszerzéséről](/docs/intro#support)...
    

## Dolog, amit nem kell tudni{#things-you-dont-need-to-know} 

Ezek olyan részletek, amelyeket nem kell tudni, amíg szükség van.

### MásodikERDDAP™ {#second-erddap} 
*    **Második beállításERDDAP™tesztelés / fejlesztés**   
Ha ezt akarod tenni, két megközelítés van:
    *    (Legjobb) Telepítse Tomcat ésERDDAP™egy számítógépen kívül, mint a számítógép, amely a nyilvánosságERDDAP... Ha a személyi számítógépet használja:
        1. Csinálj egy lépést egy időben. Szerezd fel Tomcatot, és futj először.
Amikor Tomcat fut, a Tomcat Manager-nek kell lennie
            [ http://127.0.0.1:8080/manager/html/ ](http://127.0.0.1:8080/manager/html/)  (vagy talán[ http://localhost:8080/manager/html/ ](http://localhost:8080/manager/html/)) 
        2. BeállításERDDAP...
        3. Ne használja a ProxyPass-t a portszám eltávolításáraERDDAP™URL.
        4. Inkább[setup.xml](/docs/server-admin/deploy-install#setupxml), set baseUrl to http://127.0.0.1:8080
 
        5. Miután elkezdte eztERDDAP™képesnek kell lennie arra, hogy lássa
            [ http://127.0.0.1:8080/erddap/status.html ](http://127.0.0.1:8080/erddap/status.html)  (vagy talán[ http://localhost:8080/erddap/status.html ](http://localhost:8080/erddap/status.html)) 
#### Második Tomcat{#second-tomcat} 
*    (Második legjobb) Telepítsen egy másik Tomcatot ugyanazon a számítógépen, mint a nyilvánosságERDDAP...
    1. Csinálj egy lépést egy időben. Szerezd fel Tomcatot, és futj először.
Változtassa meg a második Tomcathoz kapcsolódó összes portszámot (pl. a 8080-8081-es változás)   (lásd:[Több Tomcat Instances rész](https://tomcat.apache.org/tomcat-8.0-doc/RUNNING.txt)félúton ezen a dokumentumon keresztül) ...
    2. BeállításERDDAP™az új Tomcatban.
    3. Ne használja a ProxyPass-t a portszám eltávolításáraERDDAP™URL.
    4. Inkább[setup.xml](/docs/server-admin/deploy-install#setupxml), set baseUrl to http://www.*yourDomainName*:8081
 
    5. Miután elkezdte eztERDDAP™képesnek kell lennie arra, hogy lássa
         http://www.*yourDomainName*:8081/erddap/status.html   
             
### Szilárd állami meghajtók{#solid-state-drives} 
*    **Szilárd állami meghajtók (SSD) Nagy&#33;**   
A leggyorsabb, legkönnyebb és legolcsóbb módja annak, hogy felgyorsuljonERDDAPA mesés adatokhoz való hozzáférés az adatfájlok egy szilárd állami meghajtóra való elhelyezése (SSD) ... A legtöbb tabuláris adatkészlet viszonylag kicsi, így egy 1 vagy 2 TB SSD valószínűleg elegendő ahhoz, hogy az összes adatfájl tartsa az összes tabuláris adatkészletet. Az SSD végül viseli, ha adatokat ír egy cellára, törölje és írjon új adatokat a cellára túl sokszor. Tehát, ha csak használja az SSD-t, hogy egyszer írja meg az adatokat, és sokszor olvassa el, még egy fogyasztói minőségű SSD-nek is hosszú ideig kell tartania, valószínűleg sokkal hosszabb, mint bármely Hard Disk Drive (HDD) ... A fogyasztói minőségű SSD most olcsó (2018-ban, ~ $ 200 1 TB vagy ~ $ 400 2 TB) és az árak még mindig gyorsan csökkennek. MikorERDDAP™hozzáférés egy adatfájlhoz, az SSD mind a rövidebb latencia (~0.1ms, versus ~ 3ms egy HDD, versus ~ 10 (?) ms egy RAID, versus ~ 55ms az Amazon S3 számára) és magasabb teljesítmény (500 MB/S, versus ~ 75 MB/s egy HDD, versus ~ 500 MB/s egy RAID) ... Szóval kaphat egy nagy teljesítménynövekedést (akár 10X versus HDD) 200 dollárért&#33; Összehasonlítva a rendszer legtöbb lehetséges változásával (Új kiszolgáló 100 000 dollárért? Új RAID 35 000 dollárért? egy új hálózati váltás 5000 dollárért? stb.) Ez messze a legjobb visszatérés a beruházásra (ROI) ... Ha/ha az SSD meghal (1, 2, 8 év) cserélje ki. Ne támaszkodjon hosszú távon az adatok archival tárolására, csak az adatok elülső másolatára.\\[Az SSD nagyszerű lenne a rácsos adatokhoz is, de a legtöbb rácsos adatkészlet sokkal nagyobb, így az SSD nagyon drága.\\]
    
Ha a szerver nem tölti be a memóriát, a szerver további memóriája szintén nagyszerű és viszonylag olcsó módja annak, hogy felgyorsítsa az összes szempontotERDDAP...
     
    
### [Nehéz terhek / korlátok](#heavy-loads--constraints) **  {#heavy-loads--constraints} 
Nehéz használat esetén egy önállóERDDAP™különböző problémák korlátozhatják. További információkért lásd:[korlátok és megoldások listája](/docs/server-admin/scaling#heavy-loads--constraints)...
     
### Hálók, klaszterek és szövetségek{#grids-clusters-and-federations} 
Nagyon nehéz használat alatt egyetlen önállóERDDAP™egy vagy több korlátba kerül, és még a javasolt megoldások is elégtelenek lesznek. Ilyen helyzetekben,ERDDAP™olyan tulajdonságokkal rendelkezik, amelyek megkönnyítik a skálázható rácsok felépítését (is úgynevezett klaszterek vagy szövetségek) aERDDAPs amelyek lehetővé teszik a rendszer kezelését nagyon nehéz használat (pl. egy nagy adatközpont számára) ... További információkért lásd:[hálók, klaszterek és szövetségekERDDAPs](/docs/server-admin/scaling)...
     
### Cloud számítás{#cloud-computing} 
Számos vállalat kezd ajánlatot adni[felhő számítási szolgáltatások](https://en.wikipedia.org/wiki/Cloud_computing)  (pl.:[Amazon Web Services](https://aws.amazon.com/)) ...[Web hosting cégek](https://en.wikipedia.org/wiki/Web_hosting_service)Az 1990-es évek közepe óta egyszerűbb szolgáltatásokat kínáltak, de a „zárt” szolgáltatások nagymértékben bővítették a rendszerek rugalmasságát és a kínált szolgáltatások körét. Használhatja ezeket a szolgáltatásokat egyetlen létrehozásáhozERDDAP™vagy egy rács / klaszterERDDAPS kezelni nagyon nehéz használat. További információkért lásd:[felhő számítástechnika aERDDAP™](/docs/server-admin/scaling#cloud-computing)...

### Amazon{#amazon} 
*    **[Amazon Web Services (AWS) EC2 Telepítési áttekintés](#amazon)**   
    [Amazon Web Services (AWS) ](https://aws.amazon.com/)egy[felhő számítástechnikai szolgáltatás](https://en.wikipedia.org/wiki/Cloud_computing)ez széles körű számítógépes infrastruktúrát kínál, amelyet órán keresztül bérelhet. telepíthetERDDAP™Egy[Elastic Compute Cloud (EC2) ](https://aws.amazon.com/ec2/)Például (a neve egy számítógép, hogy lehet bérelni az óra) ... AWS kiváló[AWS felhasználói útmutató](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)Használhatja a Google-t, hogy megtalálja a választ az adott kérdésekre. Gyűjtsd magad - ez egy meglehetősen sok munka, hogy elkezdjük. De ha egyszer kap egy kiszolgálót, és fut, könnyen bérelhet annyi további erőforrást (szerverek, adatbázisok, SSD-tér, stb.) ahogy szüksége van, ésszerű áron.\\[Ez nem az Amazon Web Services ajánlása vagy jóváhagyása. Vannak más felhő szolgáltatók is.\\]
    
Áttekintés a dolgokról, amelyeket meg kell tennie, hogy megkapjaERDDAP™Az AWS-en futni:
    
    * Általánosságban elmondható, hogy mindent meg fogtok csinálni, amit leírtak a[AWS felhasználói útmutató](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)...
    * Állítson be egy AWS fiókot.
    * Állítson be egy AWS felhasználót ezen a fiókon belül az adminisztrátor kiváltságokkal. Jelentkezzen be, mivel ez a felhasználó megteszi az alábbi lépéseket.
    * Elasztikus blokk tárolás (EBS) az AWS egyenértékű egy hard drive kapcsolódik a szerverhez. Néhány EBS-területet akkor fogják elosztani, amikor először létrehoz egy EC2-es példát. Ez tartós tárolás - az információ nem veszíthető el, ha megállítja az EC2-es példáját. És ha megváltoztatja az esettípusokat, az EBS űr automatikusan csatlakozik az új esethez.
    * Hozzon létre egy elasztikus IP-címet, hogy az EC2-es példának stabil, nyilvános URL-je legyen (szemben egy privát URL-vel, amely minden alkalommal megváltozik, amikor újraindítja az Ön példáját) ...
    * Készítsen és indítson el egy EC2-es esetet (számítógép) ... Vannak széles skálája[Például típusok](https://aws.amazon.com/ec2/instance-types/), mindegyik más áron. Az m4.large vagy m4.xlarge példája erőteljes, és valószínűleg a legtöbb felhasználásra alkalmas, de válassza ki, ami megfelel az Ön igényeinek. Valószínűleg az Amazon Linuxot operációs rendszerként szeretné használni.
    * Ha az asztali/laptop számítógép Windows számítógép, akkor használható[Téged](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html)Ingyenes SSH-ügyfel a Windows számára, hogy hozzáférjen az EC2-es példány parancssorához. Vagy lehet, hogy van néhány más SSH program, amit szeretne.
    * Amikor bejelentkezik az EC2-es példányba, bejelentkezik, mint az adminisztratív felhasználó a "ec2-felhasználóval". Az ec2-felhasználónak sudo kiváltságai vannak. Tehát, ha valamit meg kell tennie, mint a gyökérhasználó, használja: sudo *SomeCommand* 
    * Ha az asztali/laptop számítógép Windows számítógép, akkor használható[FileZilla](https://stackoverflow.com/questions/16744863/connect-to-amazon-ec2-file-directory-using-filezilla-and-sftp)Ingyenes SFTP program, hogy fájlokat továbbítson / az EC2-es esetről. Vagy lehet, hogy van néhány más SFTP program, amit szeretne.
    *   [Install Apache](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html)az EC2-ben.
    * Kövesse a szabványt[ERDDAP™telepítési utasítások](/docs/server-admin/deploy-install)...
         
### WaitThenTryAgain kivétel{#waitthentryagain-exception} 
A felhasználó hibaüzenetet kaphat, mint például
WaitThenTryAgainException:
Volt egy (ideiglenes?) probléma. Várjon egy percet, majd próbálja meg újra. (Egy böngészőben kattintson a Reload gombra.)   
Részletek: GridDataAccessor.increment: PartialResults\\[0 0\\]="123542730" várhatóan "123532800".

A WaitThenTryAgainException általános magyarázata:
MikorERDDAP™válaszol egy felhasználói kérésre, váratlan hiba lehet az adatkészlettel (pl. hiba a fájlból származó adatok olvasásakor, vagy egy távoli adatkészlethez való hozzáférés hiba) ... WaitThenTryAgain jelzésekERDDAP™a kérés kudarcot vallott (Eddig) de ezERDDAP™Próbálja meg gyorsan újratölteni az adatkészletet (hívja[RequestReloadASAP](#requestreloadasap)) és ismételje meg a kérést. Gyakran ez sikeres, és a felhasználó csak azt látja, hogy a válasz a kérésre lassú volt. Máskor a rettegés kudarcot vall, vagy túl lassú, vagy a kérelem kezelésének későbbi kísérlete szintén kudarcot vall, és újabb WaitThenTryAgain-t dob. Ha ez megtörténik,ERDDAP™jelzi a reloading adatkészletét, de mondja a felhasználó (WaitThenTryAgain Kivétel) kudarcot vallott, miközben válaszolt a kérésre.

Ez a normális viselkedés. Ez a rendszer sok közös problémával foglalkozhat.
De lehetséges, hogy ez a rendszer túlzottan kiváltja. A leggyakoribb oka az, hogyERDDAP"Az adatkészlet betöltése nem lát problémát, hanemERDDAP"Az adatok kérésére adott válasz nem látja a problémát. Függetlenül attól, hogy mi az oka, a megoldás az, hogy foglalkozzon azzal, ami rossz az adatkészlettel. Nézze meg a log.txtot, hogy megnézze a tényleges hibaüzeneteket, és foglalkozzon a problémákkal. Ha sok fájl rendelkezik érvényes fejlécekkel, de érvénytelen adatok (sérült fájl) , cserélje ki a fájlokat korrupt fájlokkal. Ha egy RAID-hoz való kapcsolat hamis, rögzítse. Ha a távoli szolgáltatáshoz való kapcsolat hamis, találjon módot arra, hogy ne lángoljon vagy letöltse az összes fájlt a távoli forrásból, és szolgálja az adatokat a helyi fájlokból.

Az adott hiba részletes magyarázata (felett) az:
MindenEDDGridadatkészlet,ERDDAP™tartja a tengely változó értékeit az emlékezetben. Például a kért tengelyértékek átalakítására használják, amelyek a " () " formátum indexszámokba. Például, ha a tengelyértékek "10, 15, 20, 25", kérés (20.) a #2 index kéréseként értelmezhető (0 alapú indexek) ... MikorERDDAP™kérelmet kap az adatokhoz, és megkapja az adatokat a forrásból, igazolja, hogy a forrásból származó tengelyértékek megfelelnek a memória tengelyértékeinek. Általában ők teszik. De néha az adatforrás jelentősen megváltozott: például a tengelyváltozat kezdetétől származó indexértékek eltávolíthatók (pl.: "10, 15, 20, 25" lehet, hogy "20, 25, 30") ... Ha ez megtörténik, egyértelmű, hogyERDDAPA kérelem értelmezése (pl.: " (20.) "Az index #2) most rossz. SzóvalERDDAP™kivételt dob, és RequestReloadASAP-nak hívja.ERDDAP™hamarosan frissíteni fogja az adatkészletet (gyakran néhány másodperc alatt, általában egy percen belül) ... Más hasonló problémák is dobja a WaitThenTryAgain kivételt.
    
#### RequestReloadASAP{#requestreloadasap} 
Láthatja a RequestReloadASAP-ot a log.txt fájlban közvetlenül hibaüzenet után, és gyakran közel egy[WaitThenTryAgain kivétel](#waitthentryagain-exception)... Ez alapvetően egy belső, programozott módja annak, hogyERDDAP™Beállítani egy[zászló](#flag)aláírni, hogy az adatkészletet vissza kell tölteni az ASAP-ot.
     
### Fájlok nem törölve{#files-not-being-deleted} 
NéhányERDDAP™létesítmények, volt egy probléma néhány ideiglenes fájlok létrehozása általERDDAP™Nyitott maradás (tévesen) és így nem törlődnek. Néhány esetben ezek közül a fájlok közül sok felhalmozott és jelentős mennyiségű lemezterületet vett fel.

Remélhetőleg ezek a problémák rögzítettek (mintERDDAP™v2.00) ... Ha ezt a problémát látja, kérjük, e-mailben küldje el a Chris-nek nyújtott sértő fájlok könyvtárát. John at noaa.gov. Van néhány lehetőség a probléma kezelésére:

* Ha a fájlok nem nagyok, és nem okozza, hogy kifut a lemezterületről, figyelmen kívül hagyhatja a problémát.
* A legegyszerűbb megoldás a tomcat/ERDDAP™  (órák után, így kevesebb felhasználó érintett) ... A leállítás során, ha az operációs rendszer nem törli a fájlokat, törölje őket kézzel. Ezután indíts újraERDDAP...
         
### JSON-ld{#json-ld} 
*    **[Semantic Markup of Datasets with json-ld (JSON Linked adatok) ](#json-ld)**   
    ERDDAP™most használ[json-ld (JSON Linked adatok) ](https://json-ld.org)az adatkatalógus és adatkészletek része[szemantikai web](https://en.wikipedia.org/wiki/Semantic_Web)A Tim Berners-Lee ötlete, hogy a webes tartalmat könnyebbé tegyük, és a gép "megérthetetlen". A json-ld tartalom használata[schema.org](https://schema.org/)feltételek és meghatározások. Keresőmotorok ([Google különösen](https://developers.google.com/search/docs/data-types/datasets)) és más szemantikai eszközök is használhatják ezt a strukturált markupot, hogy megkönnyítsék a felfedezést és indexelést. A json-ld strukturált markup láthatatlan embernek tűnik&lt;script&gt; kód a https://.../erddap/info/index.html Weboldal (ami egy szemantikus web[Adatkezelés](https://schema.org/DataCatalog)) és mindegyiken https://.../erddap/info/*datasetID*/index.html Weboldal (ami egy szemantikus web[Adatbázis](https://schema.org/Dataset)) ... (Speciális köszönet Adam Leadbetter és Rob Fuller a tengeri intézet Írországban, hogy a kemény része a munka, hogy ezt a részét a munka.ERDDAP...)   
     
### Out-Of-Date URL-ek{#out-of-date-urls} 
Lassan, de biztosan az URL-ek, amelyeket az adatszolgáltatók az adatfájlokra írtak, naprakészsé válnak (például,httpleszhttpsA weboldalak átrendezésre kerülnek, és az olyan szervezetek, mint a NODC/NGDC/NCDC átszervezése NCEI) ... Az ebből eredő törött linkek egy folyamatosan jelenlévő probléma, amellyel minden weboldal szembesül. ezzel foglalkozni,ERDDAP™most van egy rendszer, amely automatikusan frissíti a naprakész URL-eket. Ha GenerateDatasets Az Xml egy naprakész URL-t lát, hozzáadja a naprakész URL-t&lt;addAttributes&gt;. Is, ha egy adatkészlet terheli, haERDDAP™látja a naprakész URL-t, csendben megváltoztatja a naprakész URL-t. A változásokat egy sor keresési-for/replace-with pár irányítja, amelyeket a&lt;frissítésUrls&gt; benneERDDAPA
\\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml fájl. Ott változtathatsz. Ha javaslatai vannak a változásokra, vagy ha úgy gondolja, hogy ez szolgáltatássá válik (mint a konverterek) Kérlek e-mailt Chris. John at noaa.gov.
     
### CORS{#cors} 
* CORS ([Cross-Origin erőforrás megosztása](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing))   
"egy olyan mechanizmus, amely lehetővé teszi a korlátozott erőforrásokat (pl. betűk vagyERDDAP™adatok) egy weboldalon, amelyet egy másik tartományból kell kérni, ahonnan az első erőforrást szolgálták” (Arun Ranganathan) ... Alapvetően a CORS egy olyan üzenet, amely a válasz HTTP-fejlesztőjébe helyezhető, mondván lényegében: "ez rendben van ezzel az oldallal, ha bizonyos más webhelyek vannak. (egyediek, vagy minden) grab erőforrások (pl. adatok) Ebből az oldalból, és a webhelyén elérhetővé teszi.” Így ez egy alternatíva[JSONP](https://en.wikipedia.org/wiki/JSONP)...
    
A fejlesztőkERDDAP™nem állítják, hogy biztonsági szakértők. Nem vagyunk teljesen világosak a CORS-szel kapcsolatos biztonsági kérdésekről. Nem akarunk olyan nyilatkozatot tenni, amely támogatja a biztonság csökkenését. Tehát mi csak maradunk semlegesek, és hagyjuk minden egyesreERDDAP™admin eldönteni, hogy a CORS-fejlesztő előnyei vagy engedélyezése megéri-e a kockázatokat. Mint mindig, ha a teERDDAP™bármilyen privát adatkészlettel rendelkezik, jó ötlet, hogy rendkívül óvatosak legyenek a biztonsággal kapcsolatban.
    
Ha lehetővé akarja tenni a CORS számáraERDDAP™vannak[könnyen elérhető utasítások](https://enable-cors.org/index.html)leírja, hogy a weboldal adminisztrátorai hogyan tehetik lehetővé a CORS fejlécét alacsonyabb szintű szerver szoftverükön keresztül (pl.: Apache vagy nginx) ...
    
### Paletta{#palettes} 
* A palettákat használjákERDDAP™egy sor adatértéket átalakítani egy sor színbe, amikor grafikonokat és térképeket készít.
    
Minden palettát egy .cpt stílusú palettafájlban definiálják, amelyet a[GMT](https://www.soest.hawaii.edu/gmt/)... MindenERDDAP™.cpt fájlok érvényes GMT .cpt fájlok, de az ellenkezője nem igaz. HasználatERDDAP™, .cpt fájlok:
    
    * Opcionális megjegyzések sorok a fájl elején, kezdve a "#".
    * Fő rész a paletta szegmenseinek leírásával, egy soronkénti szegmenssel. Minden szegmens leírási vonalnak 8 értéke van:
Kezdőlap Érték, startRed, start Zöld, kezdj Kék, endValue, endRed, endGreen, endBlue.
Lehet, hogy számos szegmens van.ERDDAP™lineáris interpolációt használ a startRed/Green/Blue és endRed/Green/Blue között minden szegmensből.
        
Javasoljuk, hogy minden szegmens egy kezdő és végszínt határozzon meg, amely különbözik, és hogy az egyes szegmensek kezdeti színe ugyanaz, mint az előző szegmens végső színe, hogy a paletta folyamatos színeket írjon le.ERDDAP™rendszert hoz létre - repülni egy paletta diszkrét színek egy paletta folyamatos keveréke színek. EgyERDDAP™A felhasználó meg tudja határozni, ha azt akarja, hogy a paletta folyamatos legyen (az eredeti) vagy Discrete (az eredetiből származik) ... De vannak jogos okok, amelyek nem követik ezeket az ajánlásokat néhány palettára.
        
    * A startValue és az endValues integrálóknak kell lenniük.
Az első szegmensnek a StarValue=0-nak és a végValue=1-nek kell lennie.
A második szegmensnek a StarValue=1-nek és a végValue=2-nek kell lennie.
Etc.
    * A vörös, zöld és kék értékeknek 0-ból kell integrálódniuk (Nem) 255 (teljes) ...
    * A fájl végén 3 sort kell tartalmaznia:
        1. A háttér rgb színe az adatértékek kevesebb, mint a színesbár minimum, pl.: B 128 128 128
Gyakran ez a startRed, startGreen, és az első szegmensből indul.
        2. Egy előtéri rgb szín az adatértékek több, mint a színesbár maximális, pl.: F 128 0
Ez gyakran az endRed, endGreen és endBlue az utolsó szegmensből.
        3. Egy rgb szín a NaN adatértékekhez, például N 128 128 128
Gyakran középső szürke (128 128 128) ...
    * Az egyes vonalbeli értékeket a fülek kell elválasztani, és nincs túlzott terek.
    
Egy minta .cpt fájl BlueWhiteRed.cpt:
    
\\# Ez a BlueWhiteRed.cpt.
0 0 0 128 0 255
1 0 0 255 2 0 255 255
2 0 255 255 255 255 255 255
3 255 255 255 4 255 255 0
255 255 0 5 255 0
5 255 0 6 128 0
B 0 0 128
F 128 0
N 128 128 128
    
Lásd a meglévő .cpt fájlokat más példákhoz. Ha baj van egy .cpt fájllal,ERDDAP™valószínűleg eldob egy hibát, amikor a .cpt fájlt elválasztják (ami jobb, mint az információ visszaélése) ...
    
További palettákat adhat hozzáERDDAP... Megteheti őket, vagy megtalálhatja őket az interneten (például,[cpt-város](http://soliton.vm.bytemark.co.uk/pub/cpt-city/)) Bár valószínűleg kissé meg kell szerkeszteni a formátumot, hogy megfeleljenERDDAP.cpt követelmények. Ahhoz, hogy megkapjaERDDAP™egy új .cpt fájl használata, tárolja a fájlt *Tomcat* /webapps/erddap/WEB-INF/cptfiles (ezt meg kell tennie minden új verzióraERDDAP) vagy:
    
    * Ha az alapértelmezett üzeneteket.xml fájlt használja: add hozzá a fájlnévet&lt;paletta&gt; címke
         *Tomcat* /webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml.
Ha ezt megteszi, akkor minden alkalommal meg kell tennie, amikor frissítERDDAP...
    * Ha szokásos üzeneteket használ.xml fájl: add hozzá a fájlnévet&lt;paletták&gt; címke az Ön egyedi üzeneteiben.xml fájl: *Tomcat* /content/erddap/messages.xml . Ha ezt megteszi, akkor csak egyszer kell megtennie (De van más munka, hogy fenntartsa a szokásos üzeneteket.xml fájl) ...
    
Ezután indíts újraERDDAP™ígyERDDAP™észreveszi a változásokat. Ennek a megközelítésnek az előnye, hogy meghatározhatja a paletták sorrendjét a felhasználók számára bemutatott listán. Ha hozzáad egy gyűjteményt, bátorítunk benneteket, hogy hozzáadjatok egy előtagot a szerzők kezdeteivel (pl.: "KT\\_"...") minden paletta neve, hogy azonosítsa a gyűjteményt, és hogy lehet több paletta, amelyek egyébként ugyanazt a nevet.
    
Kérjük, ne távolítsa el vagy változtassa meg a szabványos palettákat. Ezek egy szabványos jellemzője mindennekERDDAP™telepítések. Ha úgy gondolja, hogy a paletta vagy a palettagyűjtemény a szabványban szerepelERDDAP™az elosztás, mert általánosan használnák, kérjük, küldje el őket Chrisnek. John at noaa.gov.
    
### Colorbars{#colorbars} 
*    **HogyanERDDAP™generálja a színeket egy színesbarban?** 
    
    1. A felhasználó kiválasztja az egyik előre meghatározott[paletta](#palettes)vagy használja az alapértelmezett, pl. Rainbow. A palettákat GMT-stílusban tárolják / definiálják .cpt Color Palette Table fájlokban. MindegyikERDDAP"Az előre meghatározott palettáknak egyszerű integrált tartománya van, például 0-1 (ha csak egy szakasz van a palettában) 0 vagy 4 (ha négy rész van a palettában) ... Minden szegmens a fájlban lefedi az n+1-et, kezdve az n=0-ban.
    2.  ERDDAP™generál egy új .cpt fájlt-the-fly, az előre meghatározott paletta tartományának skálázásával (pl. 0–4) a felhasználó által szükséges paletta hatótávolságához (pl. 0,1-50) Ezután egy szakaszt generál az új palettában az új paletta minden egyes szakaszában (pl. a 0,1, 0,5, 1, 5, 10, 50-es rögtön 5 rész lesz) ... Az egyes szakaszok végpontjának színét azáltal generálják, hogy megtalálják a paletta releváns részét a .cpt fájlban, majd lineárisan interpolálják az R, G és B értékeket. (Ez ugyanaz, mint ahogyan a GMT színeket generál a Color Palette Table fájlokból.) Ez a rendszer lehetővé tesziERDDAP™kezdeni generikus palettákat (pl. Rainbow 8 szegmenssel, összesen 0-8-ra terjedve) és hozzon létre egyedi palettákat-the-fly (pl. egy egyedi Rainbow, amely 0,1-50 mg/L-t térképez az esőnyílás színeire) ...
    3.  ERDDAP™Ezután használja az új .cpt fájlt, hogy létrehozza a színt minden különböző színes pixelhez a színes bárban (és később minden adatpontra, amikor adatokat rajzra vagy térképre helyez) Ismét megtalálva a paletta releváns szakaszát a .cpt fájlban, majd lineárisan beavatkozva az R, G és B értékekbe.
    
Ez a folyamat szükségtelenül bonyolultnak tűnhet. De megoldja a logisztikai skálákkal kapcsolatos problémákat, amelyek nehézkesek más módon megoldani.
    
Szóval, hogyan tudsz mimikát elmélyülniERDDAP™csinál? Ez nem könnyű. Alapvetően meg kell duplázni a folyamatot, hogyERDDAP™használja. Ha te vagyJavaprogramozó, ugyanazt használhatjaJavaosztály,ERDDAP™használja mindezt:
     *Tomcat* /webapps/erddap/WEB-INF/classes/gov/noa/pfel/coastwatch/sgt/CompoundColorMap.java.
    
### Az adatelosztási rendszerek iránymutatásai{#guidelines-for-data-distribution-systems} 
Az adatelosztó rendszerek tervezéséről és értékeléséről szóló általánosabb vélemények megtalálhatók[itt](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html)...
     
### ArchiveADataset{#archiveadataset} 
Tartsa be az ÖnERDDAP™a telepítés egy parancssor eszköz, amelyet ArchiveADatasetnek neveznek, amely segíthet egy archívum létrehozásában (egy.zipvagy.tar.gzfájl) részben vagy egészben tárolt adatkészlet egy sor netcdf-3.ncadatfájlok olyan fájlformátumban, amely alkalmas a benyújtásraNOAANCEI archívum (.nca rácsos adatkészletek vagy[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)a tabuláris adatkészletek esetében, amint azt a[NCEINetCDFTemplates v2.0](https://www.ncei.noaa.gov/data/oceans/ncei/formats/netcdf/v2.0/index.html)) ...

Archívum Az adatkészlet két különböző archív formátumot tartalmazhat:

* Az „eredeti” formátum követi ezeket[NCEI Archiving iránymutatások](https://www.ncdc.noaa.gov/atrac/guidelines.html)Ez az útmutató a[Adatok Archiválása az NCEI-n](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook?pli=1)és a kapcsolódó[Gyakorlatok az adatintegritás biztosítása érdekében](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook/data-integrity)...
* A "BagIt" formátum teszi[BagIt fájlok](https://en.wikipedia.org/wiki/BagIt)az Egyesült Államok Kongresszusi Könyvtárának által támogatott szabványosított archív formátum, amelyet a[BagIt v0.97 specifikáció](https://tools.ietf.org/html/draft-kunze-bagit-14)...NOAA"Az NCEI szabványosíthatja a BagIt-fájlokat az archívumba való benyújtásra.

Nem meglepő, hogy[globális és változó metaadata](/docs/server-admin/datasets#global-attributes)azERDDAP™bátorítások/követelmények szinte pontosan ugyanazok a betöltő CF és ACDD metaadata, hogy NCEI ösztönzi/követeli, így az összes adatkészletnek készen kell állnia az NCEI-be történő beadására.[Send2NCEI](https://www.nodc.noaa.gov/s2n/)vagy[ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)  (NCEI fejlett nyomon követési és erőforrás eszköze Archive Collections) ...

Ha te vagy (aERDDAP™adminisztrátor) használja ArchiveADataset, hogy nyújtson be adatokat NCEI, akkor Ön (Nem NCEI) meghatározza, hogy mikor kell beadni egy darab adatot a NCEI-nek, és mi lesz ez a részeg, mert tudni fogja, mikor van új adatok, és hogyan kell meghatározni, hogy a zsák (NCEI nem fog) ... Így az ArchiveADataset egy eszköz az Ön számára, hogy egy csomagot hozzon létre a NCEI-hez.

Archívum Az adatkészlet hasznos lehet más helyzetekben, például,ERDDAP™adminisztrátorok, akiknek szükségük van egy adatbázisra (privátERDDAP) natív fájlformátuma egy sor[.ncCF fájlok](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA), hogy egy nyilvánosERDDAP™szolgálhatja az adatokat.ncCF fájlok az eredeti fájlok helyett.

Miután létrehoztálERDDAP™és futtassa (legalább egy alkalommal) Találhat és használhatja az ArchiveADataset-et *Tomcat* /webapps/erddap/WEB-INF könyvtár. Van egy shell forgatókönyv (ArchiveADataset.sh) Linux/Unix és egy batch fájl (ArchiveADataset.bat) Windows számára.

A Windows, az első alkalom, hogy futtassa ArchiveADataset, meg kell szerkeszteni az ArchiveADataset. bat fájl egy szövegszerkesztővel, hogy megváltoztassa az utat a java felé. Exe fájl, hogy a Windows találjonJava...

Amikor az ArchiveADataset-et futtatod, egy sor kérdést fog feltenni. Minden kérdés esetén írja be a választ, majd press Enter. Vagy sajtó ^C, hogy bármikor kilép egy program.

Vagy felteheti a választ a kérdésekre, annak érdekében, a parancssoron. Ehhez futtassa a programot egyszer és írja le a választ. Ezután egyetlen parancssort hozhat létre (a válaszok paraméterként) amely futtatja a programot, és válaszol minden kérdésre.
Használja az alapértelmezett szót, ha egy adott paraméter alapértelmezett értéket szeretne használni.
Használja "" (Két kettős idézet) mint egy helytartó egy üres string számára.
A paraméterek meghatározása a parancssoron nagyon kényelmes lehet, például ha havonta egyszer használod az ArchiveADataset-t, hogy egy hónapos adatmennyiséget archiválj. Miután a parancssort paraméterekkel generálta, és megmentette, hogy a jegyzetekben vagy egy kagylós forgatókönyvben csak havonta kis változásokat kell végrehajtania, hogy a hónap archívuma legyen.

Az ArchiveADataset által feltett kérdések lehetővé teszik, hogy:

* Adja meg az eredeti vagy a Bagit fájl csomagolást. NCEI, használja Bagit.
* Specify zip vagy tar.gztömörítés a csomaghoz. NCEI, használja tar.gz...
* Adja meg a kapcsolatot e-mail címét ehhez az archívumhoz (Írva lesz a READ\\_ME.txt fájlban az archívumban) ...
* Adja megdatasetIDaz adatkészlet, amelyet archívumot szeretne készíteni.
* Ismerje meg, hogy melyik adatváltozatot szeretne archíválni (általában minden) ...
* Győződjön meg arról, hogy melyik alkészletet szeretne archíválni. Ugyanúgy kell formáznia az aljzatot, ahogyan egy adatkérés leállítását formázná, így más lesz a csaláshoz, mint a tabuláris adatkészletek esetében.
    * A megfogott adatkészletek esetében a legtávolabbi dimenzió számos értékét meghatározhatja, általában ez egy sor idő. Az ArchiveADataset külön kérést tesz, és külön adatfájlot generál minden értékhez az értékek tartományában. Mivel a rácsos adatkészletek általában nagyok, szinte mindig meg kell határoznia egy kis aljzatot a teljes adatkészlet méretéhez képest.
Például,\\[ (2015-12-01) : (2015-12-31) \\]\\[\\]\\[\\]\\[\\]
    * A tabuláris adatkészletek esetében megadhatja a korlátozások gyűjteményét, de gyakran sok idő. Mivel a tabuláris adatkészletek általában kicsiek, gyakran lehetséges, hogy nem korlátozzák, hogy az egész adatkészlet archivált.
Például, &time&gt;=2015-12-01&time&lt;2016-01-01
* A tabuláris adatkészletek esetében: meghatározza a 0 vagy annál több változó kombinációval elválasztott listát, amely meghatározza, hogy az archivált adatok hogyan kerülnek tovább a különböző adatfájlokba. Adatkészletek, amelyek
    [cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type)\\=TimeSeries|TimeSeriesProfil|Trajektor|TrajectoryProfil
szinte mindig meg kell határozni a változót, amely a cf\\_role=timeseries\\_id (pl.:stationID) vagy cf\\_role=trajectory\\_id tulajdonság. Az ArchiveADataset külön kérést tesz lehetővé, és külön adatfájlot hoz létre ezeknek a változóknak az értékeinek minden egyes kombinációjára, például mindegyikre.stationID...
Minden más tabuláris adatkészlet esetében valószínűleg nem határoz meg semmilyen változót erre a célra.
Figyelmeztetés: Ha az Ön által archiváló adatkészlet nagy (&gt;2GB) És nincs megfelelő változó erre a célra, az ArchiveADataset nem használható ezzel az adatkészlettel. Ez ritka lehet.
* Adja meg a fájlformátumot az létrehozott adatfájlokhoz.
A rácsos adatkészletekhez, az NCEI-hez, használathoz.nc...
A mesés adatkészletekhez, az NCEI-hez, használathoz[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)ha ez egy lehetőség; egyébként használja.nc...
* Adja meg az egyes adatfájlokhoz és az egész archív csomaghoz szükséges fájltípust: MD5, SHA-1 vagy SHA-256. A fájl emésztése utat biztosít az ügyfél számára (pl. NCEI) tesztelni, hogy az adatfájl korrupt lett-e. Hagyományosan ezek voltak[.md5 fájlok](https://en.wikipedia.org/wiki/MD5)De most vannak jobb lehetőségek. NCEI, használja SHA-256.

Miután válaszolt az összes kérdésre, ArchiveADataset:

1. Készítsen egy sor kérést az adatkészletre, és kövesse a kapott adatfájlokat *bigParentDirectory[szerkesztés]* /ArchiveADataset/ *datasetID\\_timestamp* /.
A rácsos adatkészletek esetében a baloldali dimenzió minden értékének fájlja lesz. (pl. idő) ... A fájl neve az lesz, hogy az érték (pl. az időérték) ...
A tabuláris adatkészletek esetében lesz egy fájl a ... változó minden értékéhez. (s) ... A fájl neve ez az érték lesz. Ha több mint egy változó van, a baloldali változók felhasználhatók a közvetett nevek készítésére, és a jobboldali változót a fájlnévek készítésére fogják használni.
Minden adatfájlnak meg kell lennie&lt;2GB (a megengedett maximum.nc3. verzió fájlok) ...
2. Készítsen egy fájlt minden adatfájlhoz az adatfájl emésztésével. Például, ha az adatfájl 46088.ncés az emésztési típus .sha256, majd az emésztési fájl lesz a neve 46088.nc.sha256.
3. Készítsen egy READ\\_ME.txt fájlt az archívumról, beleértve a listát az összes megadott beállításról, hogy létrehozza ezt az archívumot.
4. Készítsen 3 fájlt *bigParentDirectory[szerkesztés]* /ArchiveADataset/ :
    
    * A.zipvagy.tar.gzarchív fájl neve *datasetID\\_timestamp* .zip  (vagy.tar.gz) tartalmazza az összes szakaszos adatfájlt és emésztési fájlt. Ez a fájl lehet bármilyen méret, korlátozott csak a lemezterület.
    * Emésztési fájl az archív fájlhoz, például *datasetID\\_timestamp* .zip.sha256.txt
    * Az „eredeti” típusú archívumhoz egy szöveges fájlt nevelnek *datasetID\\_timestamp* .zip.listOfFiles.txt (vagy.tar.gz) amely felsorolja az összes fájlt a.zip  (vagy.tar.gz) fájl.
    
Ha az NCEI archívumát készíti, ezek azok a fájlok, amelyeket NCEI-be küld, talán keresztül[Send2NCEI](https://www.nodc.noaa.gov/s2n/)vagy[ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)  (NCEI fejlett nyomon követési és erőforrás eszköze Archive Collections) ...
5. Törölje az összes szakaszban lévő fájlt, hogy csak az archív fájl (pl.:.zip) Az emésztés (pl.: .sha256.txt) az archívum és (Opcionálisan) .listOfFiles.txt fájlok maradnak.

#### ISO 19115 .xml Metadata fájlok{#iso-19115-xml-metadata-files} 
Az ArchiveADataset archív csomag nem tartalmazza az ISO 19115 .xml metaadat fájlt az adatkészlethez. Ha azt szeretné / szükséges, hogy nyújtson be ISO 19115 fájlt az adatkészlet NCEI-hez, elküldheti azokat az ISO 19115 .xml metaadat fájlt, amelyERDDAP™létrehozott adatkészlet (deNMFSAz embereknek meg kell szerezniük az ISO 19115 fájlt az InPort adataiért, haERDDAP™nem szolgálja ezt a fájlt) ...

Problémák? Javaslatok? Az ArchiveADataset új. Ha problémái vagy javaslatai vannak, nézze meg a mi[rész további támogatás megszerzéséről](/docs/intro#support)...
     
