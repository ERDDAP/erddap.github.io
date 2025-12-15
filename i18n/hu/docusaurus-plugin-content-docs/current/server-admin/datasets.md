---
sidebar_position: 3
---
# Együttműködés datasets.xml File

 \\[ Ez a weboldal csak érdekes lesz ERDDAP™ adminisztrátorok. \\] 

Miután követted a ERDDAP™   [telepítési utasítások](/docs/server-admin/deploy-install) , szerkesztenie kell datasets.xml fájl *Tomcat* /content/erddap/ leírja azokat az adatkészleteket, amelyeket a ERDDAP™ A telepítés szolgálni fog.

Láthat egy példát [ datasets.xml GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) ...

- -

##  [Bevezetés](#introduction)  {#introduction} 

### Néhány közgyűlés szükséges{#some-assembly-required} 
Adatkészlet beállítása ERDDAP™ nem csak egy dolog, ami rámutat az adatkészlet könyvtárára vagy URL-re. Meg kell írnia egy darab XML-t datasets.xml amely leírja az adatkészletet.

* A rácsos adatkészletek esetében, hogy az adatkészlet megfeleljen ERDDAP A rácsos adatok adatstruktúrája, azonosítania kell az adatkészlet változóinak leállítását, amelyek ugyanazokat a dimenziókat osztják meg. ( [Miért?](#why-just-two-basic-data-structures)   [Hogyan?](#dimensions) ) 
* Az adatkészlet jelenlegi metaadatát automatikusan importálják. De ha módosítani szeretné ezt a metaadatot, vagy hozzáadni más metaadatot, akkor meg kell határoznia. datasets.xml ... És ERDDAP™ más metaadatokra van szükség, beleértve [globális tulajdonságok](#global-attributes)   (mint például infoUrl intézmény, sourceUrl összefoglaló és cím) és [változó tulajdonságok](#variable-addattributes)   (mint például long\\_name és egység) ... Ahogyan a metaadata, amely jelenleg az adatkészletben található, leíró információkat ad az adatkészlethez, a metadata által kért ERDDAP™ leíró információkat ad az adatkészlethez. A további metaadat jó kiegészítés az adatkészlet és segít ERDDAP™ tegyen jobb munkát az adatok bemutatására olyan felhasználók számára, akik nem ismerik.
*    ERDDAP™ Szüksége van arra, hogy különleges dolgokat tegyen [Hosszúság, magasság, magasság (vagy mélység) és az idő változók](#destinationname) ...

Ha megveszi ezeket az ötleteket, és kitölti az XML létrehozására irányuló erőfeszítést datasets.xml , kapsz minden előnye, hogy ERDDAP™ beleértve:

* Teljes szöveges keresés az adatkészletekhez
* Adatkészletek keresése kategória szerint
* Adathozzáférési formák ( * datasetID * .html) így számos különböző fájlformátumban kérhet egy adatkészletet
* Forms kérni grafikonok és térképek ( * datasetID * .gráf) 
* Web Map szolgáltatás ( WMS ) a rácsos adatkészletekért
*    RESTful Hozzáférés az adataihoz

A készítés datasets.xml jelentős erőfeszítéseket tesz az első néhány adatkészlet számára, de **könnyebb lesz** ... Az első adatkészlet után gyakran újra felhasználhatja a munkát a következő adatkészlethez. szerencsére, ERDDAP™ jön két [Eszközök](#tools) hogy segítsen létrehozni az XML-t minden adatkészlethez datasets.xml ...
Ha megragadsz, lásd a mi [rész további támogatás megszerzéséről](/docs/intro#support) ...

### Variables in datasets.xml  {#varaibles-in-datasetsxml} 

Mint ERDDAP™ verzió 2.29.0, datasets.xml most van (Opcionálisan) feldolgozott egy [StringSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) ... Ez sok felhasználással rendelkezik, beleértve a magánértékek beállítását (mint a jelszavak) környezeti változók használata. Ezt letilthatja a beállítás lehetővé teszi az EnvParsing számára, hogy hamis a setup.xml-ben.

### Adatszolgáltató Formátum{#data-provider-form} 
Amikor egy adatszolgáltató érkezik hozzád, remélve, hogy hozzáad néhány adatot a ERDDAP Nehéz és időigényes, hogy összegyűjtse az összes metaadatát (információ az adatkészletről) szükséges az adatkészlet hozzáadásához ERDDAP ... Számos adatforrás (például .csv fájlok, Excel fájlok, adatbázisok) nincs belső metaadata, így ERDDAP™ rendelkezik olyan adatszolgáltatói formanyomtatványsal, amely összegyűjti a metaadatot az adatszolgáltatótól, és más iránymutatást ad az adatszolgáltatónak, ideértve a kiterjedt útmutatást is. [Adatbázisok](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html#databases) ... A benyújtott információ átalakul a datasets.xml formátum, majd e-mailben ERDDAP™ adminisztrátor (Te vagy) írás (Megjelent) a *bigParentDirectory[szerkesztés]* /logs/dataProviderForm.log Így a forma félautomatizálja az adatkészlet beszerzésének folyamatát ERDDAP de a ERDDAP™ Az adminisztrátornak még mindig befejeznie kell datasets.xml cunk és foglalkozik az adatfájl megszerzésével (s) a szolgáltatótól vagy az adatbázishoz való csatlakozástól.

A tényleges adatfájlok külső forrásokból történő benyújtása hatalmas biztonsági kockázat, így ERDDAP™ nem foglalkozik ezzel. Meg kell találnia egy olyan megoldást, amely az Ön és az adatszolgáltató számára működik, például e-mail (kis fájlokhoz) , húzza ki a felhőből (például a DropBox vagy a Google Drive) Sftp webhely (jelszavakkal) vagy sneaker Net (USB hüvelykujjj meghajtó vagy külső merevlemez) ... Valószínűleg csak olyan fájlokat kell elfogadnia az emberektől, akiket ismer. Meg kell szkennelni a fájlokat vírusok és más biztonsági óvintézkedések.

Nincs kapcsolat ERDDAP™ az adatszolgáltatói űrlaphoz (például, ERDDAP™ weboldal) ... Ehelyett, ha valaki azt mondja, hogy az adatait az Ön által szolgáltatott ERDDAP Küldhet nekik egy e-mailt, mondván valamit:
Igen, megkaphatjuk az adatait ERDDAP ... Kezdéshez kérjük, töltse ki az űrlapothttps://*yourUrl*/erddap/dataProviderForm.html  (vagy http:// ha https:// nem engedélyezett) ...
Miután befejezte, kapcsolatba lépek, hogy dolgozzon ki a végső részleteket.
Ha csak meg akarja nézni a formát (anélkül, hogy kitölte volna) Láthatja a formát ERD A ERDDAP : [Bevezetés](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm.html) , [1. rész](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html) , [2. rész](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm2.html) , [3. rész](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm3.html) és [4. rész](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm4.html) ... Ezek a linkek a ERD   ERDDAP™ Információt küldj hozzám, nem te, ezért ne nyújts be információt velük, hacsak nem szeretné hozzáadni az adatokat ERD   ERDDAP ...

Ha el akarja távolítani az adatszolgáltatói űrlapot az Öntől ERDDAP™ , tedd
```
<dataProviderFormActive>false</dataProviderFormActive>  
```
a setup.xml fájlban.

Ennek az impetusa volt NOAA 2014 [Közös hozzáférés a kutatási eredményekhez (PARR) irányelv](https://www.glerl.noaa.gov/review2016/reviewer_docs/NOAA_PARR_Plan_v5.04.pdf) ami megköveteli, hogy minden NOAA az adófizetői dollárokon keresztül finanszírozott környezeti adatokat egy adatszolgáltatáson keresztül elérhetővé kell tenni (Nem csak fájlok) a teremtés 12 hónapján belül. Tehát fokozott érdeklődés van a használatban ERDDAP™ az ASAP szolgáltatáson keresztül elérhető adatkészletek készítése. Egy hatékonyabb módszerre volt szükségünk ahhoz, hogy számos adatszolgáltatóval foglalkozzunk.

Visszajelzések/Suggestions? Ez a forma új, ezért kérjük e-mail erd dot data at noaa dot gov ha bármilyen visszajelzése vagy javaslata van ennek javítására.

### Eszközök{#tools} 
 ERDDAP™ jön két parancssori programok, amelyek eszközök, hogy segítsen létrehozni az XML minden adatkészlet, hogy azt akarja, hogy a ERDDAP™ szolgálni. Miután létrehoztál ERDDAP™ és futtassa (legalább egy alkalommal) megtalálhatja és használhatja ezeket a programokat a programokban *Tomcat* /webapps/erddap/WEB-INF könyvtár. Vannak Linux/Unix shell szkriptek (a kiterjesztés .sh) Windows scriptek (a kiterjesztés .bat) minden program. \\[ Linuxon futtassa ezeket az eszközöket, mint ugyanazt a felhasználót (Tomcat?) Ez fogja futtatni Tomcat. \\] Amikor fut minden programot, kérdéseket tesz fel. Minden kérdés esetén írja be a választ, majd press Enter. Vagy sajtó ^C, hogy bármikor kilép egy program.

#### A program nem fut?{#program-wont-run} 

* Ha egy ismeretlen programot kapsz (vagy hasonló) hibaüzenet, a probléma valószínűleg az, hogy az operációs rendszer nem talált Java ... Ki kell találnod, hol Java a számítógépén van, majd szerkesztse a java referenciát a .bat vagy .sh fájlban, amelyet megpróbál használni.
* Ha kap egy jar fájl nem talált vagy osztály nem talált hibaüzenetet, akkor Java nem találhatja meg az egyik osztályt, amely szerepel a .bat vagy .sh fájlban, amelyet megpróbál használni. A megoldás az, hogy kitaláljuk, hol van ez a .jar fájl, és szerkeszteni a java hivatkozást a .bat vagy .sh fájlban.
* Ha egy verziót használ Java túl öreg egy programhoz, a program nem fut, és hibaüzenetet fog látni, mint például
Kivétel a szálban "fő" java.lang.UnsupportedClassVersionError:
     *Néhány / osztály / név* : Nem támogatott nagy.minor verzió *dalszöveg: SomeNumber*   
A megoldás az, hogy frissítsük a legújabb verzióját Java és győződjön meg arról, hogy a .sh vagy .bat fájl a program használja.

#### Az eszközök különböző diagnosztikai üzeneteket nyomtatnak:{#the-tools-print-various-diagnostic-messages} 

* Az "ERROR" szót akkor használják, amikor valami olyan rosszul ment, hogy az eljárás nem sikerült befejezni. Bár bosszantó hiba, a hiba arra kényszeríti, hogy foglalkozzon a problémával.
* A "WARNING" szót akkor használják, amikor valami rosszul ment, de az eljárás befejeződött. Ezek elég ritkák.
* Bármi más csak informatív üzenet. Hozzáadhat \\-verbose-t a [GenerateDatasetsXml](#generatedatasetsxml) vagy [DasDds](#dasdds) parancssor további informatív üzenetek megszerzéséhez, amelyek néha segítenek a problémák megoldásában.

A két eszköz nagy segítség, de még mindig el kell olvasnia ezeket az utasításokat ezen az oldalon óvatosan, és fontos döntéseket hoz magának.

### GenerateDatasetsXml{#generatedatasetsxml} 
*    **GenerateDatasetsXml** egy parancssori program, amely képes létrehozni egy durva tervezet az adatkészlet XML szinte bármilyen típusú adatkészlet.
    
Rendben vagyunk azzal, hogy használod a GenerateDatasets-t Xml ahelyett, hogy cunkkokat hozna létre datasets.xml kézzel, mert:
    
    * GenerateDatasets Az Xml másodpercekben működik. Ennek kézzel történő megtétele legalább egy órás munka, még akkor is, ha tudod, mit csinálsz.
    * GenerateDatasets Az Xml jobb munkát végez. Ennek kézzel történő elvégzése kiterjedt tudást igényel arról, hogyan ERDDAP™ munkák. Nem valószínű, hogy jobb munkát fog végezni kézzel. (Bob Simons mindig használja a GenerateDatasets Xml az első tervezethez, és írta ERDDAP ...) 
    * GenerateDatasets Az Xml mindig érvényes darabot generál datasets.xml ... Bármelyik részeg datasets.xml hogy írsz, valószínűleg legalább néhány hibát, amelyek megakadályozzák ERDDAP™ az adatkészlet betöltésétől. Gyakran órákat vesz igénybe ezeknek a problémáknak a diagnosztizálására. Ne pazarolja az idejét. Let Generate Adatkészletek Xml csinálja a kemény munkát. Ezután finomíthatja a .xml-t kézzel, ha akarja.
    
Ha használja a GenerateDatasets Xml program:
    
    * A Windows-on az első alkalommal futtatja a GenerateDatasetsXml-t, szerkesztenie kell a GenerateDatasetsXml.bat fájlt egy szövegszerkesztővel, hogy megváltoztassa az utat a javára. Exe fájl, hogy a Windows találjon Java ...
    * GenerateDatasets Xml először kéri, hogy adja meg az EDDType-t (Erd Dap Adatkészlet típus) az adatkészlet. Lásd: [Adatkészlet típusok listája](#list-of-types-datasets)   (ebben a dokumentumban) kitalálni, hogy melyik típus megfelelő az adatkészlethez, amelyen dolgozol. A rendszeres EDDTypes mellett néhány [Speciális/Pseudo adatkészlet típusok](#specialpseudo-dataset-types)   (pl. az egyik, amely összetör egy THREDDS katalógust, hogy létrehozzon egy darab darabot datasets.xml minden adatkészlet a katalógusban) ...
    * GenerateDatasets Az Xml egy sor kérdést tesz fel, amelyek specifikusak az EDDType számára. A kérdések összegyűjtik a szükséges információkat ERDDAP™ az adatkészlet forrásához való hozzáféréshez. Hogy megértsük, mi ERDDAP™ kéri, lásd a dokumentációt az EDDType számára, amelyet az azonos adatkészlettípusra kattintva megadott [Adatkészlet típusok listája](#list-of-types-datasets) ...
        
Ha speciális karakterekkel kell belépnie egy sztringbe (pl. fehértér karakterek az elején vagy végén, nem-ASCII karakterek) belépj egy [JSON stílusú sztring](https://www.json.org/json-en.html)   (speciális karakterekkel elmenekült \\ karakterekkel) ... Például, hogy belépjen csak egy lapos karakter, lépjen be "\t" (a környező kettős idézetek, amelyek azt mondják, ERDDAP™ ez egy JSON stílusú sztring.
        
    * Gyakran az egyik válasz nem lesz az, amire a GenerateDatasetsXml-nek szüksége van. Ezután próbálkozhat újra, felülvizsgált válaszokkal a kérdésekre, amíg a GenerateDatasets Az Xml sikeresen megtalálhatja és megértheti a forrásadatokat.
    * Ha helyesen válaszol a kérdésekre (vagy elég helyesen) , GenerateDatasets Az Xml összekapcsolja az adatkészlet forrását, és összegyűjti az alapvető információkat (például változó nevek és metaadata) ...
Adatkészletek, amelyek a helyi NetCDF   .nc és kapcsolódó fájlok, GenerateDatasets Az Xml gyakran kinyomtatja a fájl ncdump-szerű szerkezetét, miután először olvassa el a fájlt. Ez adhat információt, hogy válaszoljon a kérdések jobb egy későbbi hurok keresztül GenerateDatasetsXml.
    * GenerateDatasets Az Xml ezután az XML adatkészletének durva tervezetét fogja létrehozni.
    * Diagnosztikai információk és az XML adatkészlet durva tervezete meg lesz írva *bigParentDirectory[szerkesztés]* /log/GenerateDatasetsXml.log .
    * Az XML adatkészlet durva tervezetét meg kell írni *bigParentDirectory[szerkesztés]* /logs/GenerateDatasetsXml.out .
#### "0 fájl" hibaüzenet{#0-files-error-message} 
Ha fut a GenerateDatasets Xml vagy [DasDds](#dasdds) vagy ha megpróbálsz betölteni egy EDDGrid Fájlok vagy EDDTableFrom... Files adatkészlet ERDDAP™ , és kap egy "0 fájl" hibaüzenetet, amely jelzi, hogy ERDDAP™ talált 0 megfelelő fájlokat a könyvtárban (ha úgy gondolja, hogy van egyező fájlok ebben a könyvtárban) :
* Ellenőrizze, hogy megadta a könyvtár teljes nevét. És ha megadta a minta fájlnév, győződjön meg róla, hogy megadta a fájl teljes nevét, beleértve a teljes könyvtár nevét.
* Ellenőrizze, hogy a fájlok valóban ebben a könyvtárban vannak.
* Ellenőrizze a könyvtár neve varázslatát.
* Ellenőrizze a fájlNameRegex. Valójában nagyon könnyű hibákat hibáztatni a regexekkel. Tesztcélok esetén próbálja meg a regex .\\*-t, amely minden fájlnévhez illeszkedik. (Lásd ezt [regex dokumentáció](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) és [regex bemutató](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ...) 
* Ellenőrizze, hogy a felhasználó, aki fut a program (pl. felhasználó=tomcat (?) Tomcat/ ERDDAP ) "olvassa" az engedélyt ezekre a fájlokra.
* Egyes operációs rendszerekben (például SELinux) és a rendszerbeállításoktól függően a felhasználónak, aki futtatja a programot, „olvassa” a könyvtárak egész láncolatát, amely a fájlokat tartalmazó könyvtárhoz vezet.


* Ha olyan problémák vannak, amelyeket nem lehet megoldani, [kérés támogatása](/docs/intro#support) a lehető legtöbb információval. Hasonlóképpen, ha úgy tűnik, hogy az adott adatkészlet megfelelő EDDType-je nem működik az adatkészlettel, vagy ha nincs megfelelő EDDType, kérjük, írjon egy [A GitHub kérdése](https://github.com/ERDDAP/erddap/issues) a részletekkel (mintafájl, ha releváns) ...
         
#### Meg kell szerkeszteni a kimenetet a GenerateDatasets Xml, hogy jobbá tegye.{#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better} 
         
* DISCLAIMER:
A pogány datasets.xml MADE BE GenerateDatasets Xml ISN'T PERFECT. MINDEN MINDEN VÁLLALKOZÓ ÉS EDIT THE XML BEFORE FELÜLVIZSGÁLAT ERDDAP ... GenerateDatasets Xml RELIES A RULES-OF-THUMB WHICH ALWAYS CORRECT. AZ ELNÖK AZ ELNÖK KORRÁNYULÓJÁNAK AZ ELNÖK AZ ELNÖK AZ ELNÖK AZ ELNÖK AZ ELNÖK SZÁMÁRA ERDDAP S datasets.xml FILE.
    
     (Fun Fact: Nem kiabálok. Történelmi jogi okokból a kiáltókat minden sapkában meg kell írni.) 
    
A GenerateDatasetsXml kimenete durva tervezet.
Majdnem mindig kell szerkeszteni.
Folytattuk, és továbbra is óriási erőfeszítést teszünk annak érdekében, hogy a kimenet a lehető legkészebb legyen, de vannak korlátozások. Gyakran előfordul, hogy a szükséges információk egyszerűen nem állnak rendelkezésre a forrás metaadatából.
    
Az alapvető probléma az, hogy számítógépes programot kérünk (GenerateDatasetsXml) hogy egy olyan feladatot, ahol, ha ugyanazt a feladatot 100 ember, akkor kap 100 különböző eredményeket. Nincs egyetlen "jobb" válasz. Nyilvánvaló, hogy a program legközelebb áll a Bob elmének olvasásához (Nem a tiéd) De még így sem, ez nem egy teljesen értetlen AI program, csak egy csomó heurisztika összefonódott, hogy egy AI-szerű feladat. (Egy teljesen érthetetlen AI program napja jön, de még nem. Ha/ha ez megtörténik, akkor az embereknek nagyobb problémái lehetnek. Legyen óvatos, hogy mit akarsz.) 
    
* Információs célokra a kibocsátás a globális forrásAttributes és változó forrásAttributes mint észrevételek. ERDDAP™ A forrásAttributes és addAttributes   (mely előbbi) hogy a kombinált Olyan tulajdonságok, amelyeket a felhasználónak mutatnak. (És más tulajdonságok automatikusan hozzáadódik a hosszúsághoz, a magassághoz, a magassághoz, a mélységhez és az idő változókhoz, amikor ERDDAP™ ténylegesen teszi az adatkészletet) ...
     
* Ha nem tetszik egy forrásAttribute, írja felül az addAttribute hozzáadása ugyanazzal a névvel, de más érték (vagy nem érték, ha el akarja távolítani) ...
     
* Minden addAttributes számítógép-generált javaslatok. Szeressétek őket&#33; Ha nem tetszik egy addAttribute, változtassa meg.
     
* Ha mást szeretne hozzáadni addAttributes add hozzá őket.
     
* Ha változtatni akarsz destinationName Változtasd meg. De ne változzon sourceName S.
     
* Meg tudod változtatni a rendet dataVariable vagy távolítsa el őket.


    * Ezután használható [DasDds](#dasdds)   (lásd alább) ismételten tesztelni az XML-t az adatkészlet számára annak biztosítása érdekében, hogy az elért adatkészlet úgy jelenjen meg, ahogy azt szeretné, hogy bekapcsolja. ERDDAP ...
    * Érezze szabadon, hogy kis változásokat tegyen datasets.xml cunk, amit generált, például jobb ellátást infoUrl összefoglaló vagy cím.
#### DoNotAddStandardNames{#donotaddstandardnames} 
Ha tartalmazza a \\-doNotAddStandardNames mint parancssori paraméter, ha fut generál Adatkészletek Xml, generál Adatkészletek Xml nem fog hozzáadni standard\\_name a addAttributes bármilyen változó más, mint a latitude, hosszúság, magasság, mélység vagy idő (amely nyilvánvaló standard\\_name s) ... Ez hasznos lehet, ha a termelést használja Adatkészletek Xml közvetlenül ERDDAP™ a kimenet szerkesztése nélkül, mert generál Adatkészletek Xml gyakran guesses standard\\_name Helytelenül. (Vegye figyelembe, hogy mindig azt javasoljuk, hogy szerkesztse a kimenetet, mielőtt használja azt ERDDAP ...) Ezzel a paraméterrel más kisebb hatások is lesznek, mert a kitalált standard\\_name gyakran használják más célokra, például egy új létrehozásra long\\_name És létrehozni a színBar beállításokat.
#### Jelölés{#scripting} 
Alternatívaként a kérdések megválaszolására interaktívan a billentyűzeten, és a további adatkészletek létrehozására való looping, parancssori érveket biztosíthat, hogy válaszoljon az összes kérdésre egy adatkészlet létrehozásához. GenerateDatasets Az Xml feldolgozza ezeket a paramétereket, írja a kimenetet a kimeneti fájlba, és kilép a programból.
        
A beállításhoz először használja a programot interaktív módban, és írja le a válaszokat. Íme egy részleges példa:
Tegyük fel, hogy futtassa a forgatókönyvet: ./GenerateDatasetsXml.sh
Ezután lépjen be: EDDTableFromAsciiFiles
Ezután lépjen be: /u00/data/
Ezután lépjen be: .\\*\\.asc
Ezután lépjen be: /u00/data/sampleFile.asc
Ezután lépjen be: ISO-8859-1
        
Hogy ezt nem interaktív módon futtassa, használja ezt a parancssort:
./GenerateDatasetsXml.sh EDDTableFromAsciiFiles /u00/data/ .\\*=.asc /u00/data/sampleFile.asc ISO-8859-1
Tehát alapvetően csak felsorolja az összes választ a parancssoron.
Ez hasznos lehet az olyan adatkészletek számára, amelyek gyakran változnak olyan módon, amely megköveteli a GenerateDatasets újraindítását Xml (nevezetesen EDDGrid FromThreddsCatalog) ...
        
Részletek:

* Ha egy paraméter tartalmaz egy teret vagy egy speciális karaktert, akkor kódolja a paramétert, mint egy [JSON stílusú sztring](https://www.json.org/json-en.html) pl.: „A paraméterem a terekkel és kettővel \\n vonalak.”
* Ha egy üres sztringet paraméterként szeretné meghatározni, használja: semmi
* Ha egy paraméter alapértelmezett értéket szeretne meghatározni, használja: alapértelmezett
             
* GenerateDatasets Xml támogatja a -i *adatkészletek XmlName* # *TagName* parancssori paraméter, amely beilleszti a kimenetet a megadott datasets.xml fájl (az alapértelmezés *Tomcat* /content/erddap/ datasets.xml ) ... GenerateDatasets Az Xml két vonalat keres az adatkészletekben XmlName:
```
        <!-- Begin GenerateDatasetsXml #*tagName someDatetime* -->  
```
és
```
        <!-- End GenerateDatasetsXml #*tagName someDatetime* -->  
```
és cserélje ki mindent az e sorok között az új tartalommal, és megváltoztatja a SomeDatetime-t.
* A -i kapcsoló csak feldolgozott (változások datasets.xml csak) ha fut a GenerateDatasets Xml parancssori érvek, amelyek meghatározzák az összes választ az összes kérdésre egy hurok a program. (Lásd: „Scripting” fent.)   (A gondolkodás: Ez a paraméter a forgatókönyvekkel való használatra szól. Ha a programot interaktív módban használja (Info beírása a billentyűzeten) Valószínűleg az XML hibás darabjait generálod, mielőtt létrehozod azt, amit akarsz.) 
* Ha a Kezdő és Végső sorokat nem találják, akkor ezeket a sorokat és az új tartalmakat közvetlenül beillesztik&lt;/erddapDatasets&gt;.
* Van még egy -I (tőke i) kapcsolja be a tesztelési célokat, amelyek ugyanazt működnek, mint -i, de létrehozza az úgynevezett fájlt datasets.xml  *dalszöveg* és nem változtat meg datasets.xml ...
* Ne futtassa GenerateDatasets Xml - egyszerre két folyamatban. Van egy esély, hogy csak egy sor változás fog tartani. Lehet, hogy komoly baj van (például korrupt fájlok) ...
    
Ha használja a "GenerateDatasetsXml -verbose", akkor a szokásosnál több diagnosztikai üzenetet fog nyomtatni.
    
#### Speciális/Pseudo adatkészlet típusok{#specialpseudo-dataset-types} 
Általában az EDDType lehetőségek a GenerateDatasets-ben Az e dokumentumban leírt EDD-típusok Xml-es egyezése (lásd: [Adatkészlet típusok listája](#list-of-types-datasets) ) létrehozni egy datasets.xml egy adatkészlet létrehozása egy adott adatforrásból. Néhány kivétel és különleges eset van:
    
#####  EDDGrid FromErdap{#eddgridfromerddap} 
Ez az EDDType az összes datasets.xml cunks szükséges ahhoz, hogy [ EDDGrid FromErdap](#eddfromerddap) adatkészletek az összes EDDGrid adatkészletek egy távoli ERDDAP ... Lehetősége lesz az eredeti megtartására datasetID s (amely megduplázhat néhányat datasetID már benned ERDDAP ) vagy új nevek létrehozása, amelyek egyediek lesznek (de általában nem olyan emberi olvasható) ...
     
##### EDDTableFromErddap{#eddtablefromerddap} 
Ez az EDDType az összes datasets.xml cunks szükséges ahhoz, hogy [EDDTableFromErddap](#eddfromerddap) az összes EDDTable adatkészletből egy távoli ERDDAP ... Lehetősége lesz az eredeti megtartására datasetID s (amely megduplázhat néhányat datasetID már benned ERDDAP ) vagy új nevek létrehozása, amelyek egyediek lesznek (de általában nem olyan emberi olvasható) ...
     
#####  EDDGrid FromThreddsCatalog{#eddgridfromthreddscatalog} 
Ez az EDDType az összes datasets.xml a zsák szükséges az összes [ EDDGrid dalszöveg](#eddgridfromdap) olyan adatkészletek, amelyeket visszanyerő módon találhat egy THREDDS-en keresztül (alá: beadás) katalógus. Számos formája van a THREDDS katalógus URL-eknek. Ez az opció REQUIRES egy THREDDS .xml URL /catalog / benne, például,
https://oceanwatch.pfeg.noaa.gov/thredds/catalog/catalog.xmlvagy
https://oceanwatch.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml  
(Egy kapcsolódó .html katalógus van
https://oceanwatch.pfeg.noaa.gov/thredds/Satellite/aggregsatMH/chla/catalog.htmlamely nem elfogadható EDDGrid FromThreddsCatalog.
Ha problémái vannak EDDGrid FromThredd Katalógus:
* Győződjön meg róla, hogy az URL-t használja, érvényes, tartalmazza / katalog /, és végződik /catalog.xml .
* Ha lehetséges, használjon nyilvános IP-címet (például,https://oceanwatch.pfeg.noaa.gov) az URL-ben, nem egy helyi numerikus IP-cím (például,https://12.34.56.78) ... Ha a THREDDS csak a helyi numerikus IP címen keresztül érhető el, használhatja [&lt;átalakításToPublicSourceUrl&gt; (#konverttopublicsourceurl) így ERDDAP™ a felhasználók látják a nyilvános címet, bár ERDDAP™ adatokat kap a helyi numerikus címről.
* Ha olyan problémák vannak, amelyeket nem lehet megoldani, [Ellenőrizze a hibaelhárítási tippeket](#troubleshooting-tips) ...
* Az alacsony szintű kód ezt most használja Unidata netcdf-java katalógus személyzeti kód (Szárak. katalógus osztályok) hogy kezelje az összes THREDDS katalógust (amely meglepően bonyolult lehet) Köszönöm Unidata ehhez a kódhoz.
         
#####  EDDGrid LonPM180FromErddapCatalog{#eddgridlonpm180fromerddapcatalog} 
Ez az EDDType generálja datasets.xml Hogy [ EDDGrid LonPM180](#eddgridlonpm180) adatkészletek az összes EDDGrid adatkészletek egy ERDDAP olyan hosszúsági értékek, amelyek 180-nál nagyobbak.
* Ha lehetséges, használjon nyilvános IP-címet (például,https://oceanwatch.pfeg.noaa.gov) az URL-ben, nem egy helyi numerikus IP-cím (például,https://12.34.56.78) ... Ha ERDDAP™ csak a helyi numerikus IP-címen keresztül érhető el, használhatja [&lt;átalakításToPublicSourceUrl&gt; (#konverttopublicsourceurl) így ERDDAP™ a felhasználók látják a nyilvános címet, bár ERDDAP™ adatokat kap a helyi numerikus címről.
         
#####  EDDGrid Lon0360 FromErddapCatalog{#eddgridlon0360fromerddapcatalog} 
Ez az EDDType generálja datasets.xml Hogy [ EDDGrid Lon0360](#eddgridlon0360) adatkészletek az összes EDDGrid adatkészletek egy ERDDAP aminek bármilyen hosszúsági értéke kevesebb, mint 0.
* Ha lehetséges, használjon nyilvános IP-címet (például,https://oceanwatch.pfeg.noaa.gov) az URL-ben, nem egy helyi numerikus IP-cím (például,https://12.34.56.78) ... Ha ERDDAP™ csak a helyi numerikus IP-címen keresztül érhető el, használhatja [&lt;átalakításToPublicSourceUrl&gt; (#konverttopublicsourceurl) így ERDDAP™ a felhasználók látják a nyilvános címet, bár ERDDAP™ adatokat kap a helyi numerikus címről.
         
##### EDDSFromFiles{#eddsfromfiles} 
Tekintettel az induló könyvtárra, ez megfordítja a könyvtárat és az összes alirányítót, és megpróbál létrehozni egy adatkészletet minden egyes adatfájlhoz, amelyet megtalál.
* Ez azt feltételezi, hogy amikor egy adatkészlet megtalálható, az adatkészlet tartalmazza az összes aláírót.
* Ha egy adatkészlet megtalálható, hasonló testvéri könyvtárakat fognak kezelni külön adatkészletként (Például az 1990-es évek könyvtárai, a 2000-es évek, a 2010-es évek, külön adatkészleteket fognak létrehozni) ... Könnyűnek kell lenniük a kézzel kombinálni - csak megváltoztatni az első adatkészletet&lt;fájlDir&gt; a szülői könyvtárba, és törölje az összes későbbi testvéri adatkészletet.
* Ez csak egy darabot próbál generálni datasets.xml a leggyakoribb típusú fájl kiterjesztése egy könyvtárban (nem számít .md5, amely figyelmen kívül hagyja) ... Tehát, adott egy könyvtár 10 .nc fájlokat és 5 .txt fájlokat, adatkészletet generálnak .nc fájlok csak.
* Ez azt feltételezi, hogy az összes fájl egy könyvtárban azonos kiterjesztéssel tartozik ugyanabban az adatkészletben. Ha egy könyvtár van néhány .nc fájlok SST adatokkal és néhány .nc fájlok chlorophyll adatok, csak egy minta .nc fájl lesz olvasva (SST? Chlorophyll?) és csak egy adatkészlet jön létre az ilyen típusú fájlhoz. Ez az adatkészlet valószínűleg nem terheli a komplikációk miatt, hogy megpróbálja betölteni két típusú fájlt ugyanazon adatkészletbe.
* Ha kevesebb, mint 4 fájl van a leggyakoribb kiterjesztéssel egy könyvtárban, ez azt feltételezi, hogy nem adatfájlok, és csak kihagyja a könyvtárat.
* Ha van 4 vagy több fájl egy könyvtárban, de ez nem képes sikeresen létrehozni egy darabot datasets.xml a fájlokhoz (például egy nem támogatott fájltípus) Ez generál egy [EDDTableFromFileNames](#eddtablefromfilenames) adatkészlet a fájlokhoz.
* A diagnózis végén, hogy ez a logfájlra ír, csak mielőtt datasets.xml cunks, ez egy táblázatot fog nyomtatni, amely összefoglalja az összes előirányzatot átnyomó információt. Az asztal felsorolja az összes előirányzatot, és jelzi a leggyakoribb típusú fájl kiterjesztését, a fájlok teljes számát, és mely típusú adatkészletet hoztak létre ezekhez a fájlokhoz. (ha valaki) ... Ha összetett, mélyen fészkelt fájlstruktúrával szembesül, fontolja meg a GenerateDatasets futtatását Xml EDDType=EDDSFromFiles csak azért, hogy létrehozza ezt az információt,
* Ez az opció nem tehet nagyszerű munkát a legjobb EDDType kitalálásában egy adott adatfájlok csoportja számára, de gyors, egyszerű és érdemes kipróbálni. Ha a forrásfájlok megfelelőek, jól működik, és jó első lépés a generálásban datasets.xml egy fájlrendszer, sok előirányzattal, mindegyik adatfájlok különböző adatkészletek.
         
##### EDDTableFromEML és EDDTableFromEMLBatch{#eddtablefromeml-and-eddtablefromemlbatch} 
Ezek a különleges EDDType generálja datasets.xml Hogy egy [EDDTableFromAsciiFiles](#eddtablefromasciifiles) az egyes táblákból származó adatkészlet, amelyet egy [ökológiai metaadata nyelv](https://knb.ecoinformatics.org/external//emlparser/docs/index.html) XML fájl. A "Batch" változat működik az összes EML fájl egy helyi vagy távoli könyvtárban. Kérjük, lásd a különállót [dokumentáció EDDTableFromEML](/docs/server-admin/EDDTableFromEML) ...
     
##### EDDTableFromInPort{#eddtablefrominport} 
Ez a különleges EDDType generálja datasets.xml Hogy egy [EDDTableFromAsciiFiles](#eddtablefromasciifiles) adatkészlet az információból egy [Inport-xml](https://inport.nmfs.noaa.gov/inport) fájl. Ha hozzáférhet a forrásadat fájlhoz (az inport-xml-fájlnak rendelkeznie kell azzal, hogy hol találja meg) működőképes adatkészletet készíthet ERDDAP ...

A következő lépések felvázolják, hogyan kell használni a GenerateDatasets Xml inport-xml fájllal, hogy munkaadatot kapjon ERDDAP ...

1. Miután hozzáfér az inport-xml fájlhoz (vagy URL-ként vagy helyi fájlként) Futás GenerateDatasets Xml, megjelöli az EDDType=EDDTableFromInPort-ot, meghatározza az inport-xml URL-t vagy a teljes fájlnévet, meghatározza, hogy melyikChild=0, és meghatározza a többi kért információt (ha ismert) ... (Ezen a ponton nem kell a forrásadat fájlt megadnia, vagy meg kell határoznia a nevét.) Az, amiChild=0 beállítás mondja a GenerateDatasets Xml, hogy megírja az információkat **Minden** A&lt;entity-attribute-információ&gt;&lt;entity&gt; az inport-xml fájlban (ha vannak) ... Kinyomtat egy Background információs összefoglalót is, beleértve az összes letöltési url listáját az inport-xml fájlban.
2. Nézz át az összes információt (beleértve a Background információkat, amelyek a GenerateDatasets Xml nyomtatások) és látogasson el a letöltési URL (s) annak érdekében, hogy megpróbálja megtalálni a forrásadat fájlt (s) ... Ha megtalálja (őket) Töltse le (őket) olyan könyvtárba, amely hozzáférhető ERDDAP ... (Ha nem talál semmilyen forrásadat fájlt, nincs pont az eljárásban.) 
3. Run Generate Adatkészletek Xml ismét.
Ha a forrásadat fájl megfelel az egyik inport-xml fájlnak&lt;entity-attribute-információ&gt;&lt;entitás&gt; megadja, melyikChild= *Az Entity'sNumber*   (pl.: 1, 2, 3, ...) ... ERDDAP™ megpróbálja megegyezni az oszlopneveket a forrásadat file-ban az entitásinformációk neveihez, és ösztönözni kell az elfogadást/tagadni bármilyen eltérést.
Vagy ha az inport-xml fájlnak nincs semmilyen&lt;entity-attribute-információ&gt;&lt;entitás&gt; megadja, melyikChild=0.
4. A zsákban datasets.xml Ezt a GenerateDatasets készítette Xml, felülvizsgálja a [global]&lt; addAttributes &gt;&gt;&gt;&gt;&gt;&gt; (#globális tulajdonságok) szükség/kívánatos.
5. A zsákban datasets.xml Ezt a GenerateDatasetsXml készítette, add / felülvizsgálja [&lt; dataVariable &gt;&gt;&gt;&gt;&gt;&gt; (#datavariable) a szükséges / kívánatos információ, hogy leírja az egyes változók. Ügyeljen arra, hogy megfelelően azonosítsa az egyes változókat
[[szerkesztés]]&lt; sourceName &gt;&gt;&gt;&gt;&gt;&gt; (#sourcename)   (ahogy megjelenik a forrásban) ,
[[szerkesztés]]&lt; destinationName &gt;&gt;&gt;&gt;&gt;&gt; (#destinationname)   (amely több korláttal rendelkezik az engedélyezett karakterekre, mint sourceName ) ,
[[szerkesztés]]&lt;egység&gt;] (#uniták)   (különösen, ha ez egy [idő vagy időmérő változó](#timestamp-variables) ahol az egységeknek meg kell határozniuk a formátumot) és
[[szerkesztés]]&lt; missing\\_value &gt;&gt;&gt;&gt;&gt;&gt; (#missing_érték) ,
6. Amikor közel vagy befejezni, ismételten használja a [DasDds](#dasdds) eszköz, hogy gyorsan megnézze, hogy az adatkészlet leírása érvényes-e, és ha az adatkészlet megjelenik ERDDAP™ ahogy akarod.
     

Nagyszerű lenne, ha az InPortot használó csoportok dokumentálnák adatkészleteiket, szintén használnák ERDDAP™ elérhetővé tenni a tényleges adatokat:

*    ERDDAP™ olyan megoldás, amelyet most használhatunk, így teljesíthet NOAA A [Közös hozzáférés a kutatási eredményekhez (PARR) követelmények](https://nosc.noaa.gov/EDMC/PD.DSP.php) most, nem valami homályos időben a jövőben.
*    ERDDAP™ a felhasználók számára elérhető tényleges adatokat, nem csak a metaadatot. (Milyen jó a metaadata adatok nélkül?) 
*    ERDDAP™ támogatások metaadata (nevezetesen a változók egységei) Ellentétben néhány más adatkiszolgáló szoftvert. (Milyen jó az adatok metadata nélkül?) Olyan szoftver használatához, amely nem támogatja a metaadatot, hogy meghívja az adatokat félreértésre és visszaélésre.
*    ERDDAP™ ingyenes és nyílt forráskódú szoftver, ellentétben néhány más szoftvert. Folyamatos fejlődés ERDDAP™ már fizetett. Támogatás ERDDAP™ A felhasználók ingyenesek.
*    ERDDAP A megjelenés könnyen testreszabható, hogy tükrözze és kiemelje a csoportot (nem ERD vagy ERDDAP ) ...
*    ERDDAP™ következetes módot kínál az összes adatkészlethez.
*    ERDDAP™ számos adatfájlból és a kapcsolati adatbázisokból olvashat adatokat.
*    ERDDAP™ nagy adatkészletekkel, beleértve az adatkészleteket is, ahol a forrásadat számos adatfájlban található.
*    ERDDAP™ adatokat írhat sokféle adatfájlra, a felhasználó kérésére, beleértve a netCDF, ESRI .csv és ODV .txt ...
*    ERDDAP™ egyedi grafikonokat és térképeket készíthet az adatok alkészleteiről, a felhasználó specifikációi alapján.
*    ERDDAP™ nem adatkészletekkel, például képgyűjteményekkel, videóval vagy audiofájlokkal foglalkozhat.
*    ERDDAP™ telepítették és használják [több mint 60 intézmény világszerte](/#who-uses-erddap) ...
*    ERDDAP™ a használatra javasolt adatkiszolgálók egyikeként szerepel NOAA a [ NOAA Adathozzáférési eljárási irányelv](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) Ellentétben néhány más szoftvert.
*    ERDDAP™ egy termék NMFS / NOAA , így használja belül NMFS és NOAA legyen a büszkeség pontja NMFS és NOAA ...

Kérjük, adja meg ERDDAP™ Egy próbát. Ha segítségre van szüksége, küldjön üzenetet a ERDDAP™ Google csoport.
     
##### addFillValueAttributes{#addfillvalueattributes} 
Ez a különleges EDDType opció nem adatkészlet. Ez egy eszköz, amely hozzáadhatja a \\_FillValue tulajdonságait néhány változóhoz bizonyos adatkészletekben. Lásd [addFillValueAttributes](#add-_fillvalue-attributes) ...
     
##### FindDuplic Idő{#findduplicatetime} 
Ez a különleges EDDType opció nem adatkészlet. Ehelyett azt mondja a GenerateDatasets Xml keresni egy gyűjtött gyűjteményt .nc   (és kapcsolódó) fájlokat találni és nyomtatni a fájlok listáját duplikált időértékekkel. Amikor az időértékeket nézi, az eredeti egységekről átalakítja őket "seconds since 1970-01-01" ha a különböző fájlok különböző egységeket használnak. Meg kell adnia a kezdő könyvtárat (vagy anélkül, hogy nyomkövető slash) , a fájlnév rendszeres kifejezés (pl.: \\* \\ .nc  ) , és az idő neve változó a fájlokban.
     
##### ncdump{#ncdump} 
Ez a különleges EDDType opció nem adatkészlet. Ehelyett azt mondja a GenerateDatasets Xml nyomtatni egy [ncdump](https://linux.die.net/man/1/ncdump) \\-szerű nyomtatás egy .nc , .nc ml, vagy .hdf fájl. Valójában használja a netcdf-java [NCdump](https://docs.unidata.ucar.edu/netcdf-java/5.4/javadoc/ucar/nc2/write/Ncdump.html) Ez egy korlátozottabb eszköz, mint az NCdump C verziója. Ha ezt a lehetőséget használja, a GenerateDatasetsXml arra kéri Önt, hogy használja az egyik lehetőséget: "h" (Fejlesztő) , "-c" (koordinált vars) , "vall" (default) , "v var1;var2", "v var1 (0:10,0:20) "..." Ez azért hasznos, mert ncdump nélkül nehéz megtudni, mi van egy .nc , .nc ml, vagy .hdf fájl és így az EDDType meg kell határozni a GenerateDatasets Xml. Egy .nc ml fájl, ez kinyomtatja a ncdump kimenetet az eredményért .nc ml fájlváltozások az alapul szolgáló .nc vagy .hdf fájl.
         
### DasDds{#dasdds} 
*    [ **DasDds** ](#dasdds) egy parancssori program, amelyet használhat, miután létrehozott egy első kísérletet az XML-nél egy új adatkészletre datasets.xml ... A DasDds-szel többször is tesztelheti és finomíthatja az XML-t. Ha a DasDds programot használja:
    1. A Windows-on az első alkalommal futtatja a DasDds-eket, szerkesztenie kell a DasDds-eket. bat fájl egy szövegszerkesztővel, hogy megváltoztassa az utat a java felé. Exe fájl, hogy a Windows találjon Java ...
    2. A DasDds kéri Önt datasetID az Ön által végzett adatkészletért.
    3. A DasDds megpróbálja létrehozni az adatkészletet ezzel datasetID ...
        * A DasDds mindig sok diagnosztikai üzenetet nyomtat.
Ha "DasDds -verbose"-t használ, a DasDds a szokásosnál több diagnosztikai üzenetet fog nyomtatni.
        * A biztonság érdekében a DasDds mindig törli az összes csípős adatkészlet információit (fájlok) az adatkészlet számára, mielőtt megpróbálná létrehozni az adatkészletet. Ez az egyenértékű egy [kemény zászló](/docs/server-admin/additional-information#hard-flag) Tehát az összesített adatkészletek esetében előfordulhat, hogy módosítani szeretné a fájltNameRegex ideiglenesen, hogy korlátozza a fájlok számát az adatgyártó megtalálja.
        * Ha az adatkészlet nem terheli (bármilyen okból) A DasDds megállítja és megmutatja a hibaüzenetet az első hiba miatt, amit talál.
             **Ne próbálja kitalálni, hogy mi lehet a probléma. Olvassa el gondosan az ERROR üzenetet.**   
Ha szükséges, olvassa el az előző diagnosztikai üzeneteket, hogy több nyomot és információt is találjon.
        *    **Változtasson az adatkészlet XML-jére, hogy megpróbálja megoldani a THAT problémát**   
és hagyja, hogy a DasDds újra létrehozza az adatkészletet.
        *    **Ha ismételten megoldja minden problémát, akkor végül megoldja az összes problémát**   
és az adatkészlet betöltődik.
    4. Minden DasDds kimenet (diagnosztika és eredmények) a képernyőre írnak, és *bigParentDirectory[szerkesztés]* /logs/DasDds.log
    5. Ha a DasDds létrehozhatja az adatkészletet, a DasDds majd megmutatja Önnek a [.das (Adatkészlet tulajdonság struktúra) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_das) , [.dds (Dataset Descriptor Szerkesztés) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_dds) és [Időszakok (Időbeli szakadékok) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps) információ az adatkészlet a képernyőn, és írja őket, hogy *bigParentDirectory[szerkesztés]* /log/DasDds.out .
    6. Gyakran előfordul, hogy kis változást szeretne elérni az adatkészlet XML-jéhez, hogy megtisztítsa az adatkészlet metaadatát és újraindítsa a DasDds-t.

### Bónusz Harmadik fél eszköz: ERDDAP -lint{#bonus-third-party-tool-erddap-lint} 
 ERDDAP -lint egy program Rob Fuller és Adam Leadbetter az ír tengerészeti intézet, hogy lehet használni, hogy javítsa a metaadat a ERDDAP™ adatkészletek. ERDDAP -lint "megtartja a szabályokat és egy egyszerű statikus webes alkalmazást néhány ellenőrző teszt futtatásához ERDDAP™ szerver. Minden teszt fut a webböngészőben.” Mint a [Unix/Linux lint eszköz](https://en.wikipedia.org/wiki/Lint_(software) ) szerkesztheti a meglévő szabályokat, vagy új szabályokat adhat hozzá. Lásd [ ERDDAP -lint](https://github.com/IrishMarineInstitute/erddap-lint) További információkért.

Ez az eszköz különösen hasznos az olyan adatkészletek számára, amelyeket néhány évvel ezelőtt hoztál létre, és most naprakészen akarod hozni a jelenlegi metaadat preferenciáiddal. Például a GenerateDatasets korai verziói Az Xml nem tett erőfeszítést a globális megteremtés érdekében creator\\_name , creator\\_email , alkotó\\_type, vagy creator\\_url Metaadata. Használhatja ERDDAP -lint azonosítani azokat az adatkészleteket, amelyek hiányoznak ezek a metaadatok tulajdonságai.

Robnak és Ádámnak köszönhetően, hogy létrehozza ezt az eszközt, és elérhetővé tegye azt ERDDAP™ közösség.
 
## Alapvető szerkezete datasets.xml File{#the-basic-structure-of-the-datasetsxml-file} 
A szükséges és opcionális címkék megengedettek egy datasets.xml fájl (és hányszor jelenhetnek meg) alább láthatók. A gyakorlatban, a te datasets.xml sok lesz&lt;adatkészlet&gt; címkéi és csak a többi címkét használja&lt;erddapDatasets&gt; szükség szerint.

  >&nbsp;&lt;&#63;xml version="1.0" encoding="ISO-8859-1" &#63;>  
  >&nbsp;&lt;erddapDatasets>  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeUnits>](#angulardegreeunits)...&lt;/angularDegreeUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeTrueUnits>](#angulardegreetrueunits)...&lt;/angularDegreeTrueUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;cacheMinutes>](#cacheminutes)...&lt;/cacheMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;commonStandardNames>](#commonstandardnames)...&lt;/commonStandardNames> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateRequestCSVExample />](#convertinterpolaterequestcsvexample) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateDatasetIDVariableList />](#convertinterpolatedatasetidvariablelist) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertToPublicSourceUrl />](#converttopublicsourceurl) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxGB>](#decompressed-cache)...&lt;/decompressedCacheMaxGB> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxMinutesOld>](#decompressed-cache)...&lt;/decompressedCacheMaxMinutesOld> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;drawLandMask>](#drawlandmask)...&lt;/drawLandMask> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;emailDiagnosticsToErdData>](#emaildiagnosticstoerddata)...&lt;/emailDiagnosticsToErdData> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;graphBackgroundColor>](#graphbackgroundcolor)...&lt;/graphBackgroundColor> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequests>](#ipaddressmaxrequests)...&lt;/ipAddressMaxRequests> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequestsActive>](#ipaddressmaxrequestsactive)...&lt;ipAddressMaxRequestsActive> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressUnlimited>](#ipaddressunlimited)...&lt;ipAddressUnlimited> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMinMinutes>](#loaddatasetsminminutes)...&lt;/loadDatasetsMinMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMaxMinutes>](#loaddatasetsmaxminutes)...&lt;/loadDatasetsMaxMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;logLevel>](#loglevel)...&lt;/logLevel> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nGridThreads>](#nthreads)...&lt;/nGridThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nTableThreads>](#nthreads)...&lt;/nTableThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;palettes>](#palettes)...&lt;/palettes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxBytes>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxBytes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxCells>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxCells> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;requestBlacklist>](#requestblacklist)...&lt;/requestBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;slowDownTroubleMillis>](#slowdowntroublemillis)...&lt;/slowDownTroubleMillis> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;subscriptionEmailBlacklist>](#subscriptionemailblacklist)...&lt;/subscriptionEmailBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;unusualActivity>](#unusualactivity)...&lt;/unusualActivity> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;updateMaxEvents>](#updatemaxevents)...&lt;/updateMaxEvents> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;standardLicense>](#standard-text)...&lt;/standardLicense> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardContact>](#standard-text)...&lt;/standardContact> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDataLicenses>](#standard-text)...&lt;/standardDataLicenses> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfEndorsement>](#standard-text)...&lt;/standardDisclaimerOfEndorsement> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfExternalLinks>](#standard-text)...&lt;/standardDisclaimerOfExternalLinks> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardGeneralDisclaimer>](#standard-text)...&lt;/standardGeneralDisclaimer> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardPrivacyPolicy>](#standard-text)...&lt;/standardPrivacyPolicy> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startHeadHtml5>](#standard-text)...&lt;/startHeadHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startBodyHtml5>](#standard-text)...&lt;/startBodyHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;theShortDescriptionHtml>](#standard-text)...&lt;/theShortDescriptionHtml> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;endBodyHtml5>](#standard-text)...&lt;/endBodyHtml5> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;user username="..." password="..." roles="..." />](#user) &lt;!-- 0 or more -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;dataset>](#list-of-types-datasets)...&lt;/dataset> &lt;!-- 1 or more -->  
  >&nbsp;&lt;/erddapDatasets>  

Lehetséges, hogy a jövőben más kódolások kerülnek engedélyezésre, de most már csak az ISO-8859-1 ajánlott.
 
### XInclude{#xinclude} 
Az új verzió 2.25 támogatja az XInclude-t. Ez megköveteli, hogy használja a SAX parser&lt;HasználatSaxParser&gt; Igaz&lt;/useSaxParser&gt; a beállításban.xml. Ez lehetővé teszi, hogy saját fájljában írjon minden adatkészletet, majd tartalmazza azokat a főbb datasets.xml újrahasznosítani az adatkészlet-meghatározásokat, vagy mindkettőt. Ha egy példát szeretnél látni, [EDDTestDataset.java](https://github.com/ERDDAP/erddap/blob/main/src/test/java/testDataset/EDDTestDataset.java) XInclude-t állít fel a változó meghatározások újrafelhasználására.
 

- -

## Megjegyzések{#notes} 

Együttműködés datasets.xml A fájl nem triviális projekt. Kérjük, olvassa el ezeket a jegyzeteket gondosan. Miután kiválasztott egy [adatkészlet típus](#list-of-types-datasets) Kérjük, olvassa el gondosan a részletes leírást.
     
### Az adatkészlet típusának kiválasztása{#choosing-the-dataset-type} 
A legtöbb esetben csak egy van ERDDAP™ adatkészlettípus, amely megfelelő egy adott adatforráshoz. Néhány esetben (pl.: .nc fájlok) Vannak néhány lehetőség, de általában az egyik közülük biztosan a legjobb. Az első és legnagyobb döntés, amit meg kell hozni: helyénvaló kezelni az adatkészletet, mint egy csoport multidimenzionális sorozatok (ha igen, [ EDDGrid adatkészlet típusa](#eddgrid) ) vagy adatbázisszerű adattábláként (ha igen, [EDDTable adatkészlet típusok](#eddtable) ) ...
     
### Az adatok szolgálata, mint{#serving-the-data-as-is} 
Általában nincs szükség az adatforrás módosítására (pl. a fájlokat más fájltípusra konvertálja) hogy ERDDAP™ szolgálhatja. Az egyik feltételezés a ERDDAP™ az, hogy az adatforrást úgy fogják használni, mint az. Általában ez jól működik. Néhány kivétel:
* Kapcsolódó adatbázisok és Cassandra - ERDDAP™ közvetlenül a kapcsolati adatbázisokból és a Cassandra-ból szolgálhat adatokat. De a biztonság, a terhelés kiegyensúlyozása és a teljesítmény kérdései, úgy dönthet, hogy létrehoz egy másik adatbázist ugyanazzal az adatokkal, vagy mentse meg az adatokat, hogy NetCDF v3 .nc fájlok és ERDDAP™ szolgálja az adatokat az új adatforrásból. Lásd [EDDTableFromDatabase](#eddtablefromdatabase) és [EDDTableFromCassandra](#eddtablefromcassandra) ...
* Nem támogatott adatforrások - ERDDAP™ támogathat számos adatforrást, de a világ tele van 1000-es (milliók?) különböző adatforrások (nevezetesen az adatfájl struktúrák) ... Ha ERDDAP™ nem támogatja az adatforrást:
    * Ha az adatforrás NetCDF   .nc fájlokat, használhat [NcML](#ncml-files) az adatfájlok módosítása a repülésen vagy a használaton [ NCO ](#netcdf-operators-nco) az adatfájlok állandó módosítása.
    * Az adatokat egy adatforrástípusra írhatja, ERDDAP™ támogatás. NetCDF -3 .nc a fájlok jó, általános ajánlás, mert bináris fájlok, hogy ERDDAP™ nagyon gyorsan olvashat. A tabuláris adatok esetében fontolja meg az adatok tárolását egy gyűjteményben .nc fájlok, amelyek a [CF Discrete Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Ragged Array adatstruktúrák és így kezelhetők ERDDAP A [EDDTableFromNcCFFiles](#eddtablefromnccffiles) ). Ha logikailag megszervezik őket (mindegyik adat egy darab űr és idő) , ERDDAP™ nagyon gyorsan kivonhatja az adatokat tőlük.
    * Kérheti, hogy az adatforrás támogatását hozzáadjuk ERDDAP™ e-mailben Chris. John at noaa.gov.
    * Hozzáadhat támogatást az adatforráshoz azáltal, hogy megírja a kódot, hogy kezelje magát. Lásd [a ERDDAP™ Programozó útmutató](/docs/contributing/programmer-guide) 
* Speed - ERDDAP™ olvashat adatokat néhány adatforrásból sokkal gyorsabban, mint mások. Például olvasás NetCDF v3 .nc A fájlok gyorsak és az ASCII fájlok olvasása lassabb. Ha van egy nagy (&gt;1000) vagy hatalmas (&gt;10 000) forrásadat fájlok száma, ERDDAP™ Lassan reagál néhány adatkérésre. Általában a különbség nem észrevehető az emberek számára. Ha azonban úgy gondolja, ERDDAP™ lassú egy adott adatkészlet esetében, úgy dönthet, hogy megoldja a problémát az adatok hatékonyabb beállításának írásával (általában: néhány, jól strukturált, NetCDF v3 .nc fájlok) ... A tabuláris adatokhoz lásd: [ez a tanács](#millions-of-files) ...
         
### Hint{#hint} 
Gyakran könnyebb generálni az XML-t egy adathalmaz számára, ha egy munkaadat-leírást készít az adatkészletben.xml-ben, majd módosítja azt.
    
### Különleges karakterek kódolása{#encoding-special-characters} 
óta datasets.xml XML fájl, akkor MUST [&-Ecode](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML) "&", "&lt;"és "&gt;" bármilyen tartalomban "&amp;", "&lt;és „és gt;”.
Rossz:&lt;cím&gt; Idő és tides&lt;/title&gt;
Jobb:&lt;cím&gt; Time &amp; Tides&lt;/title&gt;
     
### Az XML nem tolerálja a szintax hibákat{#xml-doesnt-tolerate-syntax-errors} 
Miután szerkesztette az adatkészletet.xml fájlt, jó ötlet ellenőrizni, hogy az eredmény [jól kialakított XML](https://www.w3schools.com/xml/xml_dtd.asp) az XML szöveg beillesztése egy XML-ellenőrzőbe, mint [xmlvalidáció](https://www.xmlvalidation.com/) ...
     
### Hibaelhárítási tippek{#troubleshooting-tips} 
*    **Más módszerek a problémák diagnosztizálására az adatkészletekkel**   
A két fő mellett [Eszközök](#tools) ,
    *    [Log.txt](/docs/server-admin/additional-information#log) egy log fájl minden ERDDAP Diagnosztikai üzenetek.
    * A [Napi jelentés](/docs/server-admin/additional-information#daily-report) több információval rendelkezik, mint a status oldal, beleértve az olyan adatkészletek listáját, amelyek nem töltöttek be, és a kivételek (hibák) termeltek.
    * A [Status oldal](/docs/server-admin/additional-information#status-page) gyors módja annak, hogy ellenőrizze ERDDAP státusza bármilyen webböngészőtől. Ez magában foglalja az olyan adatkészletek listáját, amelyek nem töltöttek be (bár nem a kapcsolódó kivételek) és feladatHárom statisztika (bemutatni a haladást [ EDDGrid Másolás](#eddgridcopy) és [EDDTableCopy](#eddtablecopy) adatkészletek és minden [ EDDGrid Fájlok](#eddgridfromfiles) vagy [EDDTableFromFiles](#eddtablefromfiles) olyan adatkészletek, amelyek [CacheFromUrl](#cachefromurl)   (de nem kóstol SizeGB) ) ...
    * Ha megragadsz, lásd a mi [rész további támogatás megszerzéséről](/docs/intro#support) ...
         
### Különleges változók{#special-variables} 
*    ** [A hosszúság, a magasság, a magasság, a mélység, a nyomás és az idő (LLAT) változó](#destinationname)   [ destinationName ](#destinationname) S különleges.** 
    * Általában:
        * LLAT változók ismertek ERDDAP™ ha a tengely változója (Mert EDDGrid adatkészletek) vagy az adatok változója (EDDTable adatkészletek)   [ destinationName ](#destinationname) "hosszúság", "latitude", "altitude", "mélység" vagy "time" ...
        * Erősen arra ösztönözzük Önt, hogy használja ezeket a szabványos neveket ezekre a változókra, amikor csak lehetséges. Egyikük sem szükséges. Ha nem használja ezeket a különleges változó neveket, ERDDAP™ nem fogja felismerni jelentőségüket. Például az LLAT változókat speciálisan a Make A Graph kezeli ( * datasetID * .gráf) : ha az X Axis változó "hosszúság", és az Y Axis változó "magasság", akkor térképet kap (egy szabványos előrejelzés, valamint egy földmaszk, politikai határok stb.) egy grafikon helyett.
        *    ERDDAP™ automatikusan hozzáad sok metaadatot a LLAT változókhoz (Például: " [ ioos\\_category ](#ioos_category) ",", [egység](#units) " és számos szabványhoz kapcsolódó tulajdonság, mint a "\\_CoordinateAxisType") ...
        *    ERDDAP™ automatikusan, on-the-fly, hozzáadni sok globális metaadata kapcsolódó LLAT értékek a kiválasztott adatalkotó (Például: "geospatial\\_lon\\_min") ...
        * Azok az ügyfelek, akik támogatják ezeket a metaadat-szabványokat, képesek lesznek kihasználni a hozzáadott metaadatot az adatok időben és térben történő elhelyezésére.
        * Az ügyfelek könnyebben létrehoznak olyan lekérdezéseket, amelyek magukban foglalják a LLAT változókat, mert a változó nevek minden releváns adatkészletben azonosak.
    * A "hosszúság" változó és a "latitude" változó:
        * Használja a [ destinationName ](#destinationname) S "hosszúság" és "latitude" csak akkor, ha [egység](#units) fokozatok\\_east és fokozatok\\_north, vagyis. Ha az adatai nem felelnek meg ezeknek a követelményeknek, használjon különböző változó neveket (Például x, y, lonRadians, latRadians) ...
        * Ha hosszúságú és szélességi adatok vannak különböző egységekben, és így különböző destinationName S, például lonRadians és latRadians, Make A Graph ( * datasetID * .gráf) grafikonokat készít (például az idősorozat) a térképek helyett.
    * A "szélesség", a "megelőzés" vagy a "mély" változó:
        * Használja a [ destinationName ](#destinationname) "szélesség" az adatok tengerszint feletti távolságának azonosítása (pozitív="up" értékek) ... Opcionálisan használhatja a tengerszint alatti távolságokat, ha az értékek negatívak a tenger alatt (vagy ha például használja,
[[szerkesztés]]&lt;att name=" scale\\_factor "típus="int"&gt; - 1&lt;/att&gt;] (#scale_factor) a mélységértékek magassági értékekké alakítása.
        * Használja a destinationName "mély" az adatok tengerszint alatti távolságának azonosítása (pozitív="down" értékek) ...
        * Alternatívaként a levegőnyomás szintje által meghatározott emelések esetében (mint például [Isobars](https://en.wikipedia.org/wiki/Contour_line#Barometric_pressure) ) , meg kell határozni destinationName "nyomás" Ez támogatja az "hPa", a "Pa" és a "mbar" egységeket (pozitív="down" értékek) ...
        * Az adatkészletnek csak egy "szélessége", "nyomás" vagy "mély" változója lehet.
        * Ezeknek a "magasságnak" és a "mély" változóknak, a [egység](#units) "m", "mérő" vagy "mérő". Ha az egység különbözik (például a fatomok) Használhatja
[[szerkesztés]]&lt;att name=" scale\\_factor "&gt;&gt;&gt; *Néhány Érték* &lt;/att&gt;] (#scale_factor) [[[szerkesztés]]]&lt;att name="units"&gt; méterek&lt;/att&gt;] (#uniták) átalakítani az egységeket méterekre.
        * Ha az adatai nem felelnek meg ezeknek a követelményeknek, használjon mást destinationName   (Például a fenti csoport, távolság ToBottom) ...
        * Ha ismeri a vertikális CRS-t, kérjük, adja meg a metaadatban, pl. „EPSG:5829” (azonnali magasság a tengerszint felett) EPSG:5831 (azonnali mélység tengerszint alatt) vagy "EPSG:5703" (NAVD88 magasság) ...
    * Mert "time" változó:
        * Használja a [ destinationName ](#destinationname)   "time" csak olyan változók esetében, amelyek az egész dátum+time-t tartalmazzák (vagy dátum, ha ez minden ott van) ... Ha például vannak külön oszlopok a dátum és az időOfDay, ne használja a változó nevet "time" ...
        * Lásd [egység](#time-units) az idő és az időStamp változók számára jellemző egységekről.
        * Az idő változó és kapcsolódó [Idő Stamp változók](#timestamp-variables) egyediek abban, hogy mindig az adatértékeket a forrás idő formátumából alakítják át (bármi legyen is az) numerikus értékbe (másodpercek 1970-01-01T00:00Z) vagy erős érték (ISO 8601:2004 (EZ) formátum) a helyzettől függően.
        * Amikor egy felhasználó időadatokat kér, akkor kérheti azt az idő meghatározásával, mint számszerű érték (másodpercek 1970-01-01T00:00Z) vagy erős érték (ISO 8601:2004 (EZ) formátum) ...
        *    ERDDAP™ haszonnal rendelkezik [Konvertáljon Numeric Idő / sztring idő](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) ...
        * Lásd [Hogyan ERDDAP Üzletek az idővel](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) ...
            
### Miért csak két alapvető adatstruktúra?{#why-just-two-basic-data-structures} 
* Mivel nehéz az emberi ügyfelek és a számítógépes ügyfelek számára, hogy összetett, lehetséges adatkészlet-struktúrákat kezeljenek, ERDDAP™ csak két alapvető adatstruktúrát használ:
    * egy [fúrt adatstruktúra](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)   (például műholdas adatok és modelladatok esetében) és
    * egy [tabuláris adatstruktúra](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)   (például az in-situ buoy, az állomás és a pályázati adatok) ...
* Természetesen nem minden adat lehet kifejezni ezekben a struktúrákban, de sok ez képes. A táblázatok különösen nagyon rugalmas adatstruktúrák (Nézze meg a kapcsolati adatbázis-programok sikerét) ...
* Ez megkönnyíti az adatkérések építését.
* Ez teszi az adatválaszok egyszerű struktúrával rendelkeznek, ami megkönnyíti az adatok szélesebb körű, szabványos fájltípusokban történő kiszolgálását (amely gyakran csak egyszerű adatstruktúrákat támogat) ... Ez a fő oka annak, hogy felállítottuk ERDDAP™ így.
* Ez viszont nagyon könnyű számunkra (vagy bárki) olyan ügyfélszoftvert írni, amely mindennel működik ERDDAP™ adatkészletek.
* Ez megkönnyíti az adatok összehasonlítását különböző forrásokból.
* Nagyon tisztában vagyunk azzal, hogy ha más adatstruktúrákban dolgozol adatokkal, akkor kezdetben úgy gondolod, hogy ez a megközelítés egyszerű vagy elégtelen. De az összes adatstruktúrának vannak szakadékai. Senki sem tökéletes. Még a do-it-all struktúrák is vannak hátrányai: a velük való együttműködés bonyolult, és a fájlokat csak speciális szoftverkönyvtárak írható vagy olvasható. Ha elfogadod ERDDAP "Elég megközelítés ahhoz, hogy megpróbáljon vele dolgozni, úgy találhatja, hogy előnyei vannak (nevezetesen több fájltípus támogatása, amelyek megtarthatják az adatválaszokat) ... A [ ERDDAP™ Slide show](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html)   (különösen a [adatstruktúrák csúsznak](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html#dataStructures) ) Sokat beszél ezekről a kérdésekről.
* És még akkor is, ha ez a megközelítés furcsán hangzik hozzád, a legtöbb ERDDAP™ Az ügyfelek soha nem fognak észrevenni - egyszerűen látni fogják, hogy az összes adatkészletnek szép egyszerű szerkezete van, és hálásak lesznek, hogy számos fájlformátumban visszatért forrásból származó adatokat kaphatnak.
         
### Méretek{#dimensions} 
*    **Mi van, ha a rács változók a forrás adatkészletben nem osztoznak ugyanazon tengelyváltozatokkal?**   
Inkább EDDGrid adatkészletek, minden adatváltozat MUST használat (Részvény) az összes tengely változó. Tehát, ha egy forrásadatnak van néhány változója az egyik dimenzióval, és más változók eltérő dimenzióval, akkor két adatkészletet kell készítenie. ERDDAP ... Például, lehet, hogy egy ERDDAP™ „Egyes cím (felületen) - olyan változókat tartsanak, amelyek csak \\[ Idő \\]  \\[ magasság \\]  \\[ hosszúság \\] dimenziók és egy másik ERDDAP™ „Egyes cím (mélységben) "megtartani azokat a változókat, amelyek \\[ Idő \\]  \\[ magasság \\]  \\[ magasság \\]  \\[ hosszúság \\] ... Vagy talán megváltoztathatja az adatforrást, hogy hozzáadjon egy dimenziót egyetlen értékkel (például altitude=0) hogy a változók következetesek legyenek.
    
     ERDDAP™ nem kezel bonyolultabb adatkészleteket (Például olyan modellek, amelyek háromszögek hálóját használják) jól. Ezeket az adatkészleteket szolgálhatja ERDDAP™ két vagy több adatkészlet létrehozásával ERDDAP™   (annak érdekében, hogy minden adat változó legyen minden egyes új adatkészletben, ugyanazt a tengelyváltozatot ossza meg) De ez nem az, amit a felhasználók akarnak. Néhány adatkészlet esetében előfordulhat, hogy az adatkészlet rendszeres rúdolt verzióját készíti el, és felajánlja azt az eredeti adatok mellett. Néhány ügyfél szoftver csak egy rendszeres hálózattal foglalkozhat, így ezzel további ügyfeleket érhet el.
     
    
### Projected Gridded adatok{#projected-gridded-data} 
Néhány rácsos adat komplex szerkezettel rendelkezik. Például műholdas szint 2 (dalszöveg: "along track") Az adatok nem használnak egyszerű előrejelzést. Modellek (mások) gyakran dolgoznak a különböző nem-cilindrikus előrejelzésekkel kapcsolatos hálózati adatokat (például conic, polar sztereográfia, tripolar) vagy strukturálatlan rácsokban (összetettebb adatstruktúra) ... Néhány végfelhasználó ezt az adatokat akarja, így nincs információvesztés. Ezeknek az ügyfeleknek, ERDDAP™ szolgálhatja az adatokat, csak akkor, ha ERDDAP™ Az adminisztrátor néhány adatkészletbe bontja az eredeti adatkészletet, és minden egyes részben olyan változókat tartalmaz, amelyek ugyanazokat a tengelyváltozatokat osztják meg. Igen, ez furcsának tűnik az érintett emberek számára, és különbözik a legtöbbtől OPeNDAP szerverek. De ERDDAP™ hangsúlyozza, hogy sok formátumban elérhetővé teszi az adatokat. Ez azért lehetséges, mert ERDDAP™ egységesebb adatstruktúrát igényel. Bár ez egy kicsit kínos (más, mint a vártnál) , ERDDAP™ eloszthatja a tervezett adatokat.

 \\[ Igen, ERDDAP™ lehetne lazább követelményeket az adatstruktúrára, de tartsa a kimeneti formátumokra vonatkozó követelményeket. De ez zavart okozna sok felhasználó, különösen az újszülött között, mivel sok látszólag érvényes adatkérés érvénytelen lenne, mert az adatok nem illeszkednének a fájltípusba. Visszatérünk a jelenlegi rendszer tervezéséhez. \\] 

Egyes végfelhasználók olyan lat lon-cilindrikus előrejelzést akarnak, mint az Equirectangular / lemezkarrée vagy Mercator) a könnyű használatra különböző helyzetekben. Ezekre a helyzetekre bátorítjuk a ERDDAP™ adminisztrátor más szoftverek használatához ( NCO ? Matlab ? R? IDV? ...?) az adatoknak egy földrajzra való újrafeldolgozása (Equirectangular előrejelzés / lemezkarrée) vagy más cilindrikus előrejelzés, és szolgálja az adatok ilyen formáját ERDDAP™ mint más adatkészlet. Ez hasonló ahhoz, amit az emberek csinálnak, amikor műholdas szinten 2 adatot alakítanak át a 3. szintű adatokba. Egy ilyen eszköz [ NCO ](https://nco.sourceforge.net/nco.html#Regridding) amely kiterjesztési lehetőségeket kínál a sajnálatos adatokhoz.

#### GIS és reprojektív adatok{#gis-and-reprojecting-data} 
Mivel a GIS világ gyakran térképorientált, a GIS programok általában támogatást nyújtanak az adatok reprojektjéhez, azaz az adatokat egy másik előrejelzésű térképre helyezve.

Jelenleg, ERDDAP™ nincs eszköze az adatok reprojekciójára. Ehelyett azt javasoljuk, hogy használjon egy külső eszközt, hogy az adatkészlet változatos legyen, ahol az adatokat eredeti formájából reprojektálták egy téglalapra. (magassági hosszúság) alkalmas ERDDAP ...

Véleményünk szerint a CF/ DAP A világ egy kicsit más, mint a GIS világ, és kissé alacsonyabb szinten működik. ERDDAP™ ezt tükrözi. Általában, ERDDAP™ célja, hogy elsősorban az adatokkal dolgozzon (nem térképek) és nem akar változtatni (pl. reprojekt) az adatok. Mert ERDDAP™ A rácsos adatok gyakran/általában/előnyösen kapcsolódnak a lat lon értékek és a cilindrikus előrejelzés, és nem néhány előrejelzés x,y értékek. Mindenesetre, ERDDAP™ nem tesz semmit az adatprojektjével; csak áthalad az adatokon keresztül, mint ahogy a jelenlegi előrejelzése, azon az elméleten, hogy a reprojekció jelentős változás az adatokhoz és ERDDAP™ nem akar jelentős változásokat bevonni. Továbbá a későbbi felhasználók naiv módon újraprojektezhetik az adatokat, ami nem lenne olyan jó, mint egy reprojekció. (Tehát, ha ERDDAP™ Az adminisztrátor más előrejelzésben, bírságban kívánja felajánlani az adatokat; csak reprojektálja az offline adatokat, és felajánlja azt, hogy egy másik adatkészletként ERDDAP ... Sok műholdas adatkészletet kínálnak, mint amit a NASA 2. szintnek nevez (fürdő) és mint 3. szint (Equirectangular előrejelzés) verziók.) Mikor ERDDAP™ térképek készítése (közvetlenül vagy keresztül WMS vagy KML) , ERDDAP™ Jelenleg csak térképeket készít az Equirectangular / tányérkarrier-projekcióval, amelyet szerencsére a legtöbb feltérképező program elfogad.

Bátorítunk ERDDAP™ adminisztrátorok más szoftverek használatára ( NCO ? Matlab ? R? IDV? ...?) az adatoknak egy földrajzra való újrafeldolgozása (Equirectangular előrejelzés / lemezkarrée) vagy más cilindrikus előrejelzés, és szolgálja az adatok ilyen formáját ERDDAP™ mint más adatkészlet. Ez hasonló ahhoz, amit az emberek csinálnak, amikor műholdas szinten 2 adatot alakítanak át a 3. szintű adatokba. Egy ilyen eszköz [ NCO ](https://nco.sourceforge.net/nco.html#Regridding) amely kiterjesztési lehetőségeket kínál a sajnálatos adatokhoz.

Reméljük, hogy ERDDAP™ beépített eszközöket kínálnak térképeket más előrejelzésekkel a jövőben. Reméljük, hogy a jövőben jobb kapcsolatokat ápolunk a GIS világával. (más, mint a jelenlegi WMS szolgáltatás) ... Szörnyű, hogy ebben a „modern” világban a CF// DAP A világ és a GIS világ még mindig olyan gyenge. Mindkét dolog a To Do listán van. (Ha segíteni akar, nevezetesen a csatlakozással ERDDAP™ MapServer, kérlek e-mailt Chris. John at noaa.gov.) 
    
### Adattípusok{#data-types} 
 ERDDAP™ támogatja a következő adattípusokat
 (a nevek érzékenyek; 'u' prefix áll a "nem kijelölt"; a szám sok a nevek más rendszerekben a bitek száma) :

#### byte{#byte} 
*    **byte** integrált értékeket írt alá -128 és 127 között.
Más rendszerekben ezt néha int8-nak nevezik.
Ezt az úgynevezett "tinyint" az SQL és a Cassandra.
     ERDDAP™ átalakítások [boolean](#boolean-data) néhány forrásból (pl. SQL és Cassandra) b) a bytes in ERDDAP™ 0=hamis, 1=igaz és 127= missing\\_value ...
#### Ubyte{#ubyte} 
*    **Ubyte** 0–255 közötti számottevő értékkel rendelkezik.
Más rendszerekben ezt néha uint8-nak nevezik.
#### rövid{#short} 
*    **rövid** integrált értékeket írt alá -32768 és 32767 között.
Más rendszerekben ezt néha int16-nak nevezik.
Ezt az SQL és Cassandra "smallint"-nak hívják.
#### Uraim{#ushort} 
*    **Uraim** 0-65535 közötti számtalan integrált értékkel rendelkezik.
Más rendszerekben ezt néha uint16-nak nevezik.
#### Inkább{#int} 
*    **Inkább** integrált értékeket írt alá -2147483648 és 2147483647.
Más rendszerekben ezt néha int32-nek nevezik.
Ezt nevezik "integernek" | numerikus (?) "SQL és "int" Cassandra.
#### Uint{#uint} 
*    **Uint** 0–4294967295 közötti számtalan integrált értékkel rendelkezik.
Más rendszerekben ezt néha uint32-nek nevezik.
#### hosszú{#long} 
*    **hosszú** -9223372036854575808 és 9223372036854775807 közötti integrációs értékeket írt alá.
Más rendszerekben ezt néha int64-nek nevezik.
Ezt nevezik "bigint | numerikus (?) "Az SQL és a "bigint" által Cassandra.
Mivel sok fájltípus nem támogatja a hosszú adatokat, használatuk elriasztott. Ha lehetséges, használja dupla helyett (lásd alább) ...
#### Utána{#ulong} 
*    **Utána** az integrációs értékek száma 0-tól 18446744073709551615
Más rendszerekben ezt néha uint64-nek nevezik.
Mivel sok fájltípus nem támogatja az ulong adatokat, használatuk elriasztott. Ha lehetséges, használja dupla helyett (lásd alább) ...
#### Float{#float} 
*    **Float** egy IEEE 754 float körülbelül +/- 3.402823466e+38.
Más rendszerekben ezt néha float32-nek nevezik.
Ezt nevezik "valódi | Float (?)  | decimális (?)  | numerikus (?) "Az SQL és a "float" által Cassandra.
A NaN különleges értéke Not-a-Number.
     ERDDAP™ pozitív és negatív végtelen értékeket alakít ki a NaN számára.
#### dupla dupla{#double} 
*    **dupla dupla** egy IEEE 754 dupla, körülbelül
+/- 1.7976931348623157E+308.
Más rendszerekben ezt néha float64-nek nevezik.
Ezt nevezik „kettős pontosságnak | Float (?)  | decimális (?)  | numerikus (?) "Az SQL és a "dupla" által Cassandra.
A NaN különleges értéke Not-a-Number.
     ERDDAP™ pozitív és negatív végtelen értékeket alakít ki a NaN számára.
#### char{#char} 
*    **char** egyetlen, 2 fehér (16 bit)   [Unicode UCS-2 karakter](https://en.wikipedia.org/wiki/UTF-16) Furcsa \\u0000   (#0) keresztül \\uffff   (#65535) ...
     \\uffff "A definíció Not-a-Character, amely a NaN kettős értéket elemzi.
A char használata elriasztott, mert sok fájltípus sem támogatja a charsot, vagy csak 1 fehér charsot támogat (lásd alább) ... Fontolja inkább a String használatát.
A felhasználók a char változókat használhatják a grafikonok elkészítéséhez. ERDDAP™ átalakítja a karaktereket az Unicode kódszámára, amelyet numerikus adatokként lehet használni.
#### Hírek{#string} 
*    **Hírek** 0 vagy több, 2 fehér sorozat (16 bit)   [Unicode UCS-2 karakterek](https://en.wikipedia.org/wiki/UTF-16) ...
     ERDDAP™ Használja/értelmezi a 0 hosszúságot, mint egy hiányzó érték. ERDDAP™ nem támogatja az igazi null sztringet.
Az elméleti maximális sztring hossza 21473647 karakter, de valószínűleg különböző problémák vannak különböző helyeken, még valamivel rövidebb Strings.
Használat ERDDAP "Az SQL karakterének, varchar, karakterváltó, bináris, varbináris, intervallum, tömör, multiset, xml és minden más adatbázis-adattípus, amely nem illik tisztán másokkal ERDDAP™ adattípus.
Használat ERDDAP Cassandra "szövege" és bármely más Cassandra adattípus, amely nem illik tisztán mással ERDDAP™ adattípus.
     

Korábban ERDDAP™ v2.10, ERDDAP™ nem támogatta a nem jelentett integrált típusokat belsőleg, és korlátozott támogatást nyújtott az adatolvasók és írók számára.
    
### Adattípus korlátozások{#data-type-limitations} 
Gondolhatsz ERDDAP™ olyan rendszerként, amely virtuális adatkészletekkel rendelkezik, és amely az adatkészlet forrásának belső adatmodelljévé történő olvasásával működik, és adatokat ír különböző szolgáltatásokra (pl.(OPeN)DAP, WMS ) és fájltípusok a felhasználói kérelmekre válaszul.

* Minden bemeneti olvasó támogatja az adattípusok aljzatát, amelyek ERDDAP™ támogatás. Az adatok olvasása az adatokba ERDDAP A belső adatstruktúrák nem jelentenek problémát.
* Minden kimeneti író támogatja az adattípusok alkészletét is. Ez egy probléma, mert ERDDAP például a hosszú adatok olyan fájltípusokba kerülnek, amelyek nem támogatják a hosszú adatokat.
     

Az alábbiakban a korlátozások magyarázatai (vagy nem) különböző kimeneti írók és hogyan ERDDAP™ foglalkozik a problémákkal. Az ilyen komplikációk egy örök része ERDDAP Célja, hogy interoperábilisá váljon az elválasztott rendszerek.

#### ASCII{#ascii} 
* ASCII (.csv, .tsv stb.) szövegfájlok -
    * Minden numerikus adatot a String reprezentációján keresztül írják (hiányzó adatértékek jelennek meg 0 hosszúságú sztringek) ...
    * Bár ERDDAP™ hosszú és hosszú értékeket ír az ASCII szövegfájljainak megfelelően, sok olvasó (pl. táblázatprogramok) nem tudja helyesen kezelni a hosszú és ulong értékeket, és ehelyett kettős értékekké alakítja őket (a pontosság elvesztése bizonyos esetekben) ...
    * Char és String adatok írt keresztül JSON Strings, amely kezeli az összes Unicode karakterek (nevezetesen az ASCII #127-en túli „szokatlan” karakterek, pl. az euró karakter „u20ac”-ként jelenik meg) ...
    
        
#### JSON{#json} 
* JSON ( .json , .jsonlCSV stb.) szövegfájlok -
    * Minden numerikus adat a String reprezentációján keresztül van megírva.
    * Char és String adatok vannak írva JSON Strings, amely kezeli az összes Unicode karakterek (nevezetesen az ASCII #127-en túli „szokatlan” karakterek, pl. az euró karakter „u20ac”-ként jelenik meg) ...
    * Az összes numerikus adattípus hiányzó értéke nullnak tűnik.
         
####  .nc 3 fájl{#nc3-files} 
*    .nc 3 fájl nem natív módon támogatja a nem tervezett integrált adattípusokat. A CF v1.9 előtt a CF nem támogatta a nem aláírt integrált típusokat. ezzel foglalkozni, ERDDAP™ 2.10+ követi a NUG-szabványt, és mindig hozzáad egy "\\_Unsigned" tulajdonságot az "igaz" vagy "hamis" értékével, hogy jelezze, hogy az adatok egy meg nem írt vagy aláírt változóból származnak. Minden integrált tulajdonságot aláírt tulajdonságként írnak (pl. byte) aláírt értékekkel (pl. ubyte) actual\\_range a 0–255 értéknek tulajdonítható, 0–1 értékkel bíró gyűlöletként jelenik meg (a két teljes értékének inverzuma). Nincs egyszerű módja annak, hogy megtudjuk, melyik (jelzett) integer tulajdonságokat kell leolvasni jelölt tulajdonságként. ERDDAP™ támogatja a "\\_Unsigned" tulajdonságot, amikor olvas .nc 3 fájl.
*    .nc 3 fájl nem támogatja a hosszú vagy ulong adattípusokat. ERDDAP™ ezzel foglalkozik, átmenetileg átalakítva őket, hogy kettős változó legyen. A duplák pontosan képviselhetik az összes értéket +/- 9,007,199,254,740,992 ami 2^53. Ez egy tökéletlen megoldás. Unidata elutasítja, hogy egy kisebb frissítést készítsen .nc 3 kezelni ezt és kapcsolódó problémákat, idézni .nc 4 4 4 (jelentős változás) mint megoldás.
* A CF specifikáció (v1.9 előtt) Azt mondta, hogy támogatja a char adattípust, de nem világos, hogy a char csak a char sasok építőelemei, amelyek hatékonyan Strings. Kérdések a levelezési listájához csak zavaró válaszokat hoztak létre. Ezeknek a komplikációknak köszönhetően a legjobb, ha elkerüljük a char változókat ERDDAP™ Használja a String változókat, ha csak lehetséges.
* Hagyományosan, .nc 3 fájl csak az ASCII által kódolt karakterláncokat támogatta (7 bites, #0 - #127) karakterek. NUG (és ERDDAP ) kiterjeszteni azt (Kezdőlap ~2017) beleértve a „\\_Encoding” tulajdonságot az „ISO-8859-1” értékével (az ASCII kiterjesztése, amely minden 8 bites karakter 256 értéket meghatároz) vagy "UTF-8", hogy jelezze, hogy a String adatok kódolva. Más kódolások lehet jogi, de elriasztják.
         
####  .nc 4 fájl{#nc4-files} 
*    .nc 4 fájl támogatja az összes ERDDAP Adattípusok.
    
#### NCCSV fájlok{#nccsv-files} 
Az NCCSV 1.0 fájlok nem támogatnak semmilyen nem aláírt integrált adattípust.
 [NCCSV 1.1+ fájlok](/docs/user/nccsv-1.00) támogassa az összes kijelölt integrált adattípust.
     
####  DAP  {#dap} 
*   (OPeN)DAP  (.das, .dds, .asc ASCII fájlok és .dods bináris fájlok) -
    *   (OPeN)DAPrövid, ushort, int, uint, float és dupla értékek helyes kezelése.
    *   (OPeN)DAP"bájt" adattípussal rendelkezik, amelyet lemondatlannak tekintenek, míg történelmileg a THREDDS és ERDDAP™ bánatot kezeltek, ahogy aláírták őket(OPeN)DAPSzolgáltatások. Hogy jobban kezeljük ezt, ERDDAP™ 2.10+ követi az NUG szabványt, és mindig hozzáad egy "\\_Unsigned" tulajdonságot az "igaz" vagy "hamis" értékével, hogy jelezze, hogy az adatok az ERDDAP™ byte vagy ubyte. Minden byte- és ubyte-jellemzőt úgy írják, mint „byte” tulajdonságokat, amelyek aláírt értékekkel rendelkeznek (pl. ubyte-ként). actual\\_range a 0–255 értéknek tulajdonítható, 0–1 értékkel bíró gyűlöletként jelenik meg (a két teljes értékének inverzuma). Nincs egyszerű módja annak, hogy megtudjuk, melyik "bájt" tulajdonságokat kell utódi tulajdonságként elolvasni.
    *   (OPeN)DAPnem támogatja az aláírt vagy nem aláírt hosszúságokat. ERDDAP™ ezzel foglalkozik, átmenetileg átalakítva őket, hogy kettős változók és tulajdonságok. A duplák pontosan képviselhetik az összes értéket 9,007,199,254,740,992 ami 2^53. Ez egy tökéletlen megoldás. OPeNDAP   (a szervezet) elutasítja, hogy egy kisebb frissítést készítsen DAP 2.0 ezzel és a kapcsolódó problémákkal foglalkozni, idézve DAP 4 4 4 (jelentős változás) mint megoldás.
    * Mert(OPeN)DAPnincs külön char adattípus és technikailag csak 1 fehér ASCII karaktert támogat (#0 - #127) a Strings-ban a char data variables 1 karakter-hosszú Strings-ként jelenik meg(OPeN)DAP.das, .dds és .dods válaszok.
    * Technikailag, a(OPeN)DAPspecifikáció csak az ASCII kódolt karakterekkel támogatja (#0 - #127) ... NUG (és ERDDAP ) kiterjeszteni azt (Kezdőlap ~2017) beleértve a „\\_Encoding” tulajdonságot az „ISO-8859-1” értékével (az ASCII kiterjesztése, amely minden 8 bites karakter 256 értéket meghatároz) vagy "UTF-8", hogy jelezze, hogy a String adatok kódolva. Más kódolások lehet jogi, de elriasztják.
         
### Adattípus megjegyzések{#data-type-comments} 
* Mivel a rossz támogatás hosszú, ulong, és char adatok sok fájltípusban, elriasztjuk az ilyen adattípusok használatát ERDDAP ... Ha lehetséges, használja kettős helyett hosszú és ulong, és használja String helyett char.
     
* Metadata - Mert(OPeN)DAP.das és .dds válaszok nem támogatják a hosszú vagy ulong tulajdonságokat vagy adattípusokat (helyettük kettősnek mutatják őket) Ehelyett inkább használni akarod ERDDAP "A metafora reprezentációja a metaadata, mint látható a http .../erddap/ **Info** / * datasetID * .html weboldal (például, [https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html)  )   (amely más fájltípusokban is kaphat, például .csv, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv , .xhtml ) vagy .nccsv Metadata válasz (például, [https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) bár .nccsv A Metadata csak tabuláris adatkészletekhez érhető el) mindkettő támogatja az összes adattípust (különösen, hosszú, ulong és char) ...
         
### Media Files{#media-files} 
Nem minden adat számos szám vagy szöveg. Néhány adatkészlet tartalmaz vagy tartalmazza a médiafájlokat, például a képet, az audio- és videofájlokat. ERDDAP™ Van néhány speciális jellemzője, hogy megkönnyítse a felhasználók számára, hogy hozzáférjenek a médiafájlokhoz. Ez egy két lépéses folyamat:
 

1. Készítsen minden fájlt a saját URL-jén keresztül, egy olyan rendszeren keresztül, amely támogatja a byte range kéréseket.
A legegyszerűbb módja ennek az, hogy a fájlokat egy könyvtárba helyezzük, hogy ERDDAP™ hozzáféréssel rendelkezik. (Ha egy konténerben vannak, mint egy .zip fájl, zip őket, bár lehet, hogy felajánlja a .zip fájlt a felhasználóknak is.) Ezután készíts egy [EDDTableFromFileNames](#eddtablefromfilenames) adatkészlet, hogy ezeket a fájlokat hozzáférhetővé tegyék ERDDAP™ - nevezetesen keresztül ERDDAP A [ "files" rendszerrendszer](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) ...
    
Minden fájl elérhetővé tette az EDDTableFromFileNames és ERDDAP A "files" rendszertámogatás [byte range kérések](https://en.wikipedia.org/wiki/Byte_serving) ... Normális esetben, ha egy ügyfél (pl. böngésző) kérést kér egy URL-hez, az egész fájlt választ kapja. De egy byte range kéréssel a kérelem egy sor byte-t határoz meg a fájlból, és a szerver csak visszaküldi azokat a byte-eket. Ez azért releváns itt, mert a böngészők hang- és videojátékosai csak akkor működnek, ha a fájl elérhető a byte hatótávú kéréseken keresztül.
    
Opcionális: Ha több mint egy adatkészlete van a kapcsolódó médiafájlokkal, akkor csak egy EDDTableFromFileNames-t készíthet, amely minden egyes fájltípushoz almappát tartalmaz. Az előny az, hogy amikor új médiafájlokat szeretne hozzáadni egy új adatkészlethez, minden, amit meg kell tennie, egy új mappa létrehozása, és a fájlokat a mappába helyezi. A mappát és fájlokat automatikusan hozzáadjuk az EDDTableFromFileNames adatkészlethez.
    
2. Opcionális: Ha van egy adatkészlet, amely magában foglalja a médiafájlokra való hivatkozásokat, add hozzá ERDDAP ...
Például, lehet, hogy egy .csv fájl egy sor minden alkalommal, amikor valaki látott egy bálna és egy oszlop, amely magában foglalja a neve egy kép fájl kapcsolódik a látnivaló. Ha a képfájl neve csak a fájlnév, pl. Img20141024T192403Z, nem teljes URL, akkor hozzá kell adnia [AccessBase Url és / vagy fájlAccessSuffix](#fileaccessbaseurl) ennek a metaadatnak a tulajdonságai dataVariable amely meghatározza az alapURL-t és elegendőt ezekhez a fájlnévekhez. Ha az EDDTableFromFileNames-on keresztül elérhető fájlokat készítette, az URL formában lesz
     *alapUrl* /erddap/files/ * datasetID * /
Például,
```
        <att name="fileAccessBaseUrl">*someBaseURL*</a>  
        <att name="fileAccessSuffix">.png</a>
```
        
Ha van egy .zip vagy más konténerfájl az összes adatváltozathoz kapcsolódó médiafájlmal, javasoljuk, hogy a fájl is hozzáférhető legyen a felhasználók számára (Lásd a fenti 1. lépést) Ezután azonosítsa azt egy [AccessArchive Url](#fileaccessarchiveurl) tulajdonság.
    

 \\[ Kezdőlap ERDDAP™ v1.82 \\] Ha az első lépést tesszük fölött (vagy mindkét lépés) akkor, ha egy felhasználó megnézi a ERDDAP™   "files" rendszer az adatkészlethez (vagy kéri, hogy az adathalmaz egy albeállítását egy .htmlTable kérés, ha megtette a második lépést) , ERDDAP™ "?" ikont mutat a fájlnév baljára. Ha a felhasználó átkapcsolja ezt az ikont, akkor egy popupot látnak, amely megmutatja a képet, vagy egy audiolejátszót, vagy egy videolejátszót. A böngészők csak korlátozott számú típusú támogatást nyújtanak

* kép (általában .gif, .jpg és .png) ,
* audio (általában .mp3, .ogg és .wav) és
* videofájlok (általában .mp4, .ogv és . webm) ...

Támogatás változatos különböző verziók különböző böngészők különböző operációs rendszerek. Tehát, ha van egy választás, hogy melyik fájltípus kínál, akkor van értelme, hogy ezeket a típusokat.

Vagy ha egy felhasználó kattint a fájlnévre, amelyet egy ERDDAP™ weboldal, böngészőjük a képet, az audio- vagy videofájlt külön weboldalként fogja megjeleníteni. Ez leginkább hasznos, hogy egy nagyon nagy kép vagy videó skálázott a teljes képernyő, ahelyett, hogy egy popup.
    
### Az AWS S3 fájlokkal való együttműködés{#working-with-aws-s3-files} 
 [Amazon Web szolgáltatás (AWS) ](https://aws.amazon.com) egy eladója [felhő számítás](https://en.wikipedia.org/wiki/Cloud_computing) Szolgáltatások. [S3](https://aws.amazon.com/s3/) az AWS által kínált objektumtároló rendszer. A hagyományos fájlrendszer hierarchikus rendszere és fájljai helyett (mint egy kemény meghajtó a PC-ben) Az S3 csak "bucketeket" kínál, amelyek "objekteket" tartanak (hívjuk őket "files" ) ...

Az ASCII fájlokhoz (pl.: .csv) , ERDDAP™ közvetlenül a vödörökben lévő fájlokkal dolgozhat. Az egyetlen dolog, amit meg kell tennie, az megadja a&lt;fájlDir&gt; az adatkészlethez egy adott formátumot használva az AWS bucket számára, példáulhttps://*bucketName*.s3.*aws-region*.amazonaws.com/*subdirectory*/... Nem szabad használni&lt;cacheFromUrl&gt; Lásd alább részleteket.

De a bináris fájlokhoz (pl.: .nc , .grib, .bufr és .hdf fájlok) Használnia kell&lt;cacheFromUrl&gt; rendszer az alábbiakban leírt. ERDDAP Netcdf-java (melyik ERDDAP™ használja az adatok olvasását ezekből a fájlokból) , és más tudományos adatszoftvereket úgy terveztek, hogy egy hagyományos fájlrendszerben dolgozzanak, amely kínál [blokk szint](https://en.wikipedia.org/wiki/Block-level_storage) hozzáférés fájlokhoz (amely lehetővé teszi, hogy elolvassa a zsákokat egy fájlból) , de az S3 csak ajánlatok [fájlszint (objektum) ](https://en.wikipedia.org/wiki/Block-level_storage) hozzáférés fájlokhoz (amely csak lehetővé teszi az egész fájl olvasását) ... Az AWS alternatívát kínál az S3-nak, [Elastic Block áruház (EBS) ](https://aws.amazon.com/ebs/) ), amely támogatja a blokk szintű hozzáférést a fájlokhoz, de drágább, mint az S3, ezért ritkán használják nagy mennyiségű adatfájl tárolására. (Tehát amikor az emberek azt mondják, hogy tárolja az adatokat a felhőben (S3) olcsó, általában almák narancsok összehasonlításához.) 

#### S3 vödör{#s3-buckets} 
 **Egy vödör tartalma. kulcsok. Objects. Delimiters.**   
Technikailag az S3 bucketek nem szerveződnek egy hierarchikus fájlszerkezetben, mint egy fájlrendszer egy számítógépen. Ehelyett a vödrök csak "objekteket" tartalmaznak (fájlok) Mindegyiknek van egy "key" (név) ... Egy példa arra a kulcsra, hogy a noa-goes17 bucket

```
ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc
```
A megfelelő URl ehhez a tárgyhoz

 [https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc](https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR_ABI-L1b-RadC-M6C01_G17_s20192352201196_e20192352203569_c20192352204013.nc) 

Az AWS egy kis variációt támogat abban, hogy hogyan épül fel az URL, de ERDDAP™ megköveteli ezt az egy adott formátumot:
  https://*bucketName*.s3.*region*.amazonaws.com/*key*  

Mint ERDDAP v2.29, most használhatja a `S3:` URI formátum a bucket URL helyett. Ez a formátum, amelyet a [AWS s3 cli](https://docs.aws.amazon.com/cli/latest/reference/s3/) ...
S3: *BucketName* / *kulcs* 

A *régió* az S3 URI-t háromféleképpen lehet meghatározni:
- A *régió* a Tomcat felhasználója `~/.aws/config` profil
- A `AWS_DEFAULT_REGION` környezet változó
- A `Aws.region` JVM változó (a setenv.sh for Tomcat) 

Ez a szokásos gyakorlat, mint ez a példa, hogy a kulcsfontosságú nevek úgy néznek ki, mint egy hierarchikus út, plusz egy fájlnév, de technikailag nem. Mivel ez gyakori és hasznos, ERDDAP™ kezeli a kulcsokat / úgy, mintha egy hierarchikus út plusz fájl neve, és ez a dokumentáció hivatkozik rájuk. Ha egy vödör kulcsa nem használja / (pl. egy kulcs, mint egy kulcs,
ABI-Lib.2018.052.22.OR\\_ABI-L1b-RadM2-M3C10\\_G16\\_s201805222475), majd ERDDAP™ Csak az egész kulcsot kezeli hosszú fájlnévként.

Private vs Public Buckets - Az S3 bucket adminisztrátora nyilvánosságra hozhatja a vödört és tartalmát. Ha nyilvános, a vödör bármely fájlját bárki letöltheti az URL-t a fájlhoz. Az Amazonnak van egy [Nyitott adatok](https://aws.amazon.com/opendata/) program, amely nyilvános adatkészleteket tárol (beleértve az adatokat NOAA , NASA és USGS) ingyen, és nem számít fel senkinek, hogy letöltse a fájlokat ezekből a vödörökből. Ha egy vödör privát, a vödörben lévő fájlok csak az engedélyezett felhasználók és az AWS díjakhoz jutnak (általában a vödör tulajdonosa által fizetett) fájlok letöltése egy nem AWS S3 számítógépre. ERDDAP™ adatokat dolgozhat nyilvános és privát vödörekben.

#### AWS Credentials{#aws-credentials} 
Hogy megtegye, hogy ERDDAP™ elolvashatja a privát vödör tartalmát, szüksége van AWS hitelesítő anyagokra, és tárolnia kell egy hitelesítő fájlt a szabványos helyen, így ERDDAP™ megtalálhatja az információt. Lásd az AWS SDK-t Java 2.x dokumentáció: [Az alapértelmezett hitelesítő anyagok beállítása](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials) ... (Az értékek tárolásának lehetősége, mint Java parancssori paraméterek a \\[ Tomcat \\] /bin/setenv.sh lehet egy jó lehetőség.) 
#### AWS /files/{#aws-files} 
* /files/ rendszer - A ERDDAP™   [/files/ rendszer](#accessibleviafiles) lehetővé teszi a felhasználók számára, hogy letöltsék a forrásfájlokat egy adatkészlethez. Javasoljuk, hogy fordítsa ezt az összes adatlapot a forrásfájlokkal, mert sok felhasználó le akarja tölteni az eredeti forrásfájlokat.
    * Ha a fájlok egy privát S3 vödörben vannak, a felhasználó kérése, hogy töltse le a fájlt, akkor kezeli ERDDAP™ , amely elolvassa az adatokat a fájlból, majd továbbítja a felhasználónak, így növeli a terhelést az Ön számára ERDDAP™ bejövő és kimenő sávszélességet használva, és (a ERDDAP™ adminisztrátor) fizesse ki az adatok egress díját az AWS-nek.
    * Ha a fájlok nyilvános S3 bucketben vannak, a felhasználó kérése, hogy töltse le a fájlt, átirányítva lesz az AWS S3 URL-re a fájlhoz, így az adatok nem fognak keresztülmenni. ERDDAP™ Így csökkenti a terhelést ERDDAP ... És ha a fájlok egy Amazon Open Data (szabad) nyilvános vödör, akkor te (a ERDDAP™ adminisztrátor) Nem kell fizetnie semmilyen adat-egészségügyi díjat az AWS-nek. Így nagy előnye van az adatok nyilvános kiszolgálása (nem privát) S3 vödör, és hatalmas előnye az adatok kiszolgálásának az Amazon Open Data (szabad) vödör.

 ERDDAP anonim hitelesítő anyagokat is támogat a nyilvános vödörök számára. Anonim hitelesítő anyagok használata, hozzátéve ` <useAwsAnonymous> Igaz </useAwsAnonymous> ` a setup.xml.

#### Custom S3 Endpoints{#custom-s3-endpoints} 
Az S3 kompatibilis objektumok tárolásához nem az Amazon, konfigurálnia kell [végpont_url](https://docs.aws.amazon.com/sdkref/latest/guide/feature-ss-endpoints.html) együtt specifikálva a vödör / kulcs segítségével egy `S3:` URI.

A *végpont_url* háromféleképpen lehet meghatározni:
- A *végpont_url* a Tomcat felhasználója `~/.aws/config` profil
- A `AWS_ENDPOINT_URL` környezet változó
- A `Aws.endpoint Url` JVM változó (a setenv.sh for Tomcat) 

Az S3 konfigurációs változók teljes listája esetében, [Lásd az Amazon dokumentációt](https://docs.aws.amazon.com/cli/latest/topic/config-vars.html) ...

 **Önjelölt tanúsítványok** 
Az önhordozó S3 buckets esetében gyakran önjelölt SSL tanúsítványokkal rendelkezik. Mert ERDDAP olvassa el ezeket a vödröket, hozzá kell adnia a tanúsítási láncot a JVM biztatójához `JAVA_HOME/jre/lib/security/cacert` ... Továbbá, ERDDAP Használja a [AWS Common Runtime](https://docs.aws.amazon.com/sdkref/latest/guide/common-runtime.html) a vödör aszinkronhoz való hozzáféréshez. Ez növeli a teljesítményt, de azt is megköveteli, hogy az önjelölt tanúsítványok hozzáadják az OS specifikus bizalmat. Ha el akarja kerülni ezt, az AWS CRT-t letilthatja ` <useAwsCrt> hamis </useAwsCrt> ` a setup.xml.

####  ERDDAP™ AWS S3 vödör{#erddap-and-aws-s3-buckets} 
 [ ** ERDDAP™ AWS S3 vödör** ](#erddap-and-aws-s3-buckets)   
Szerencsére, sok erőfeszítés után, ERDDAP™ számos olyan funkcióval rendelkezik, amelyek lehetővé teszik, hogy az S3 blokkszintű hozzáféréssel ésszerűen hatékonyan kezelje a fájlokhoz való hozzáférést:

*    \\[ Hirdető: Az AWS S3 bucketekkel való munka sok extra munka. Az AWS egy hatalmas ökoszisztéma a szolgáltatásoknak és funkcióknak. Rengeteg tanulni. Időre és erőfeszítésre van szükség, de ez megvalósítható. Légy türelmes, és kapsz dolgokat dolgozni. Nézd / kérj segítséget
() [AWS dokumentáció](https://aws.amazon.com/documentation/gettingstarted/) olyan weboldalak, mint [Stack Overflow](https://stackoverflow.com/) és a rendszeres
     [ ERDDAP™ támogatási lehetőségek](/docs/intro#support) Ha/ha megragadsz. \\]   
     
* Nehéz megtudni a fájlok könyvtári struktúráját és fájlnevét egy S3 bucketben. ERDDAP™ megoldás erre a problémára: az EDDTableFromFileNames speciális [\\*\\*\\*fromOnTheFly](#fromonthefly) opció, amely lehetővé teszi, hogy egy EDDTableFromFileNames adatkészletet készítsen, amely lehetővé teszi a felhasználók számára, hogy böngészjenek egy S3 bucket tartalmát (fájlok letöltése) az adatkészleten keresztül "files" opció. Van egy [az alábbiakban](#viewing-the-contents-of-a-bucket) ...
     
*    ERDDAP™ olvashat adatokat [külső tömörített adatfájlok](#externally-compressed-files) , így rendben van, ha az S3 fájlokat tárolják .gz , .gzip , .bz2 , .Z, vagy más típusú külsőleg tömörített adatfájlok, amelyek drámai módon (2 - 20X) csökkentse a fájltárolási költségeket. Gyakran nincs idő büntetés külsőleg tömörített fájlok használatára, mivel az S3 és az S3 közötti kisebb fájl átvitelével mentett idő ERDDAP durván egyensúlyozza a szükséges extra időt ERDDAP™ dekompresszálni a fájlt. Használja ezt a funkciót, csak meg kell győződnie arról, hogy az adatkészlet&lt;fájlNameRegex&gt; lehetővé teszi a kompressált fájltípust (pl. hozzáadásával ( |  .gz ) a regex végére) ...
     
* A leggyakoribb esetben, ahol van egy ERDDAP™ telepítve a PC-re a teszt / fejlesztéshez, és ahol az adatkészletnek bináris adatfájlja van, amelyeket objektumként tárolnak egy S3 bucketben, egy megközelítés az adatkészlet beszerzéséhez ERDDAP™ az:
    1. Hozzon létre egy könyvtárat a PC-n, hogy tartson néhány teszt adatfájlot.
    2. Töltse le a forrásból származó két adatfájlokat az Ön által létrehozott könyvtárba.
    3. Használat [GenerateDatasetsXml](#generatedatasetsxml) létrehozni a zsákot datasets.xml a két helyi adatfájlon alapuló adatkészlet esetében.
    4. Ellenőrizze, hogy ez az adatkészlet a kívánt módon működik [DasDds](#dasdds) és/vagy a helyi ERDDAP ...
        
         **A következő lépések az adatkészlet másolatát teszik ki (amely adatokat kap az S3-ból) nyilvánosan ERDDAP ...** 
        
    5. Másolja a zsákot datasets.xml az adatkészlet számára datasets.xml a nyilvánosság számára ERDDAP™ ez szolgálja az adatokat.
    6. Hozzon létre egy könyvtárat a nyilvánosság számára ERDDAP Helyi merevlemez az ideiglenes fájlok gyorsítótárának megtartásához. A könyvtár nem fog sok lemezterületet használni (lásd a cacheSizeGB alul) ...
    7. Változtassa meg az adatkészlet értékét&lt;fájlDir&gt; címke, hogy pont a könyvtár, amit csak létrehozott (még akkor is, ha a könyvtár üres) ...
    8. Adj hozzá egy [CacheFromUrl](#cachefromurl) címke, amely meghatározza az adatkészlet vödör nevét és opcionális előtagját (i.e., könyvtár) az adott [Aws S3 URL formátum ERDDAP™ követelmények](#accessing-files-in-an-aws-s3-bucket) ...
    9. Adj hozzá egyet&lt;cacheSizeGB&gt;] (#cachefromurl) címke az adatkészlet xml (pl. a 10 jó érték a legtöbb adatkészlet számára) Mondd el ERDDAP™ korlátozni a helyi cache méretét (i.e., ne próbálja meg az összes távoli fájlt) ...
    10. Lásd, hogy ez működik-e a nyilvánosságban ERDDAP ... Vegye figyelembe, hogy az első alkalommal ERDDAP™ terheli az adatkészletet, hosszú időt vesz igénybe a terheléshez, mert ERDDAP™ le kell tölteni és el kell olvasni az összes adatfájlt.
        
Ha az adatkészlet hatalmas gyűjteménye a hatalmas hálózati adatfájloknak, ez nagyon hosszú időt vesz igénybe, és gyakorlati jellegű lesz. Bizonyos esetekben a rácsos adatfájlok esetében, ERDDAP™ kivonhatja a szükséges információkat (pl. az adatok időpontja egy rácsos adatfájlban) a fájl neve és elkerülje ezt a problémát. Lásd [Aggregáció keresztül File nevek](#aggregation-via-file-names-or-global-metadata) ...
        
    11. Opcionálisan (de különösen az EDDTableFromFiles adatkészletek esetében) Hozzáadhatsz egy [nHárom](#nthreads) tagolja meg az adatkészletet, hogy elmondja ERDDAP több mint 1 szál használata a felhasználó adatkérésére. Ez minimalizálja a késés hatásait, amelyek akkor fordulnak elő, amikor ERDDAP™ az adatfájlokat olvassa el (távolról) AWS S3 vödör a helyi csészébe és (talán talán talán talán talán) dekompresszálja őket.

#### AWS S3 nyílt adatok{#aws-s3-open-data} 
részeként NOAA A [Big Data Program](https://www.noaa.gov/nodd/about) , NOAA öt szervezettel, beleértve az AWS-t is, „a kulcsfontosságú megfigyelések és modellkimenetek másolatainak tárolásának lehetséges előnyeinek felfedezése a Cloud-ban, hogy lehetővé tegye a közvetlenül az adatokon történő számítást anélkül, hogy további elosztást igényelne”. Az AWS tartalmazza az általa kapott adatkészleteket NOAA programjának részeként nyilvános hozzáférést biztosít a nagy gyűjteményhez [Nyitott adatok AWS S3](https://registry.opendata.aws/) bármely számítógépről, legyen szó az Amazon kompute-ről (bérelt számítógép) az AWS hálózaton vagy a saját PC-n bármely hálózaton. Az alábbi példa feltételezi, hogy nyilvánosan hozzáférhető adatkészlettel dolgozol.

#### Hozzáférés Files egy AWS S3 Bucket{#accessing-files-in-an-aws-s3-bucket} 
Egy privát S3 adatcsomag esetében a vödör tulajdonosának hozzáférést kell adnia a vödörhöz. (Lásd az AWS dokumentációt.) 

Minden esetben szüksége lesz egy AWS fiókra, mert az AWS SDK Java   (melyik ERDDAP™ az információ visszaszerzése egy vödör tartalmáról) megköveteli az AWS fiók hitelesítő adatait. (többet az alábbiakban) 

 ERDDAP™ csak az AWS S3 vödörhöz férhet hozzá, ha megadja a [&lt;cacheFromUrl&gt; (#cachefromurl) (vagy&lt;fájlDir&gt;) egy adott formátumban:
https://*bucketName*.s3.*aws-region*.amazonaws.com/*prefix/*  
ahol

* A bucketName a vödör neve rövid formája, pl. noaa-goes17.
* Az aws-region, például a kelet-1, a "Region" oszlop egyik táblázatában található. [AWS Service Endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html) ahol a vödör valójában található.
* Az előtag opcionális. Ha jelen van, akkor véget kell érnie '/' ...

Például,https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/  
Ez az URL formátum az egyik AWS S3 ajánlás: lásd [Bucket hozzáférése](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html) és [az előtagok leírása](https://docs.aws.amazon.com/AmazonS3/latest/dev/ListingKeysHierarchy.html) ... ERDDAP™ megköveteli, hogy kombinálja a vödör URL-t és az opcionális előtagot egy URL-be annak érdekében, hogy meghatározza a&lt;cacheFromUrl&gt; (vagy&lt;fájlDir&gt;), ahol a fájlok találhatók.

#### Test Public AWS S3 Buckets{#test-public-aws-s3-buckets} 
A nyilvános vödörök számára tesztelheti és tesztelheti az AWS S3 könyvtárának vödörét a böngészőben, pl.
 [https://noaa-goes17.s3.us-east-1.amazonaws.com](https://noaa-goes17.s3.us-east-1.amazonaws.com) Ha a vödör URL helyes és megfelelő ERDDAP visszatér egy XML dokumentumhoz, amely rendelkezik (Részleges) e vödör tartalmának felsorolása. Sajnos a teljes URL (i.e., bucket URL plus prefix) az ERDDAP™ egy adott adatkészletet akar, nem működik egy böngészőben. Az AWS nem kínál rendszert, hogy a böngészőben könnyen böngészhesse a vödör hierarchiáját. (Ha ez helytelen, kérjük, e-mailben Chris. John at noaa.gov. Ellenkező esetben az Amazon, kérlek, adjon támogatást ehhez&#33;) 

#### Egy vödör tartalmának megtekintése{#viewing-the-contents-of-a-bucket} 
Az S3 buckets gyakran tartalmaz néhány fájlkategóriát, néhány pszeudo-közvetítőt, amelyek pár ERDDAP™ adatkészletek. Ahhoz, hogy a ERDDAP™ adatkészletek, tudnia kell a kezdő könyvtárat&lt;cacheFromUrl&gt; (vagy&lt;fájlDir&gt;) és a fájl nevek formátuma, amelyek azonosítják a fájlok beállítását. Ha egy böngészőben megpróbálja megtekinteni a teljes tartalmat, az S3 csak az első 1000 fájlt mutatja be, ami elégtelen. Jelenleg a legjobb módja annak, hogy megnézze az összes tartalmat egy vödör, hogy egy [EDDTableFromFileNames](#eddtablefromfilenames) adatkészlet (a PC-jén ERDDAP™ és/vagy a nyilvánosságra ERDDAP ) , amely egy egyszerű módja annak, hogy böngészje a könyvtári struktúrát és letöltse fájlokat. A&lt;fájlDir&gt; ez lesz az URL, amit fent tett, pl.https://noaa-goes17.s3.us-east-1.amazonaws.com... \\[ Miért nem kínálja az AWS S3 gyors és egyszerű módját bárkinek, aki ezt AWS fiók nélkül teszi? \\] Vegye figyelembe, hogy amikor ezt a PC-n egy nem Amazon hálózaton csinálom, úgy tűnik, hogy az Amazon lelassítja a trükkre adott válaszot (körülbelül 100 (?) fájlok / chunk) az első néhány darab után (1000 fájlból darabonként) letöltve. Mivel a vödrök hatalmas számú fájlt tartalmazhatnak (Noaa-goes17 26 millióval rendelkezik) , hogy az összes tartalmát egy vödör lehet venni EDDTableFromFileNames órák (pl. 12&#33;) befejezni. \\[ Az Amazon igaz? \\] 

#### EDDTable készítése FromFileNames Dataset with AWS S3 Bucket{#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket} 
Ha van egy vödör neve, de nem rendelkezik már egy listát a fájlok az S3 vödör vagy az előtag, amely azonosítja a helyét a vonatkozó fájlokat a vödörben, használja az utasításokat, hogy az EDDTableFileNames adatkészlet, így böngészheti a könyvtár hierarchia az S3 vödör keresztül ERDDAP A "files" rendszer.

1. Nyisson meg egy AWS fiókot
     ERDDAP™ Használja a [AWS SDK Java ](https://docs.aws.amazon.com/sdk-for-java/index.html) hogy vödör információt kapjon az AWS-től, így meg kell [létrehozni és aktiválni egy AWS fiókot](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/) ... Ez egy elég nagy munka, sok mindent megtanulni.
     
2. Helyezze az AWS Credentials-ot, ahol ERDDAP™ megtalálhatja őket.
Kövesse az utasításokat [Az AWS Credentials és a Fejlesztési Régió létrehozása](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials) így ERDDAP™   (kifejezetten az AWS SDK Java ) képes lesz megtalálni és használni az AWS hitelesítő adatait. Ha ERDDAP™ nem találja meg a hitelesítő anyagokat, látni fogja a
java.lang. IllegalArgumentException: profilfájl nem lehet null hiba ERDDAP Log.txt fájl.
    
Hint for Linux és Mac OS: a hitelesítő fájlnak a Tomcat futó felhasználó otthoni könyvtárában kell lennie (és ERDDAP )   (e bekezdés esetében a felhasználó=tomcat) egy ~/.aws/credentials nevű fájlban. Ne feltételezzük, hogy ~ a /home/tomcat - valójában használja a cd-t -, hogy megtudja, hol gondolja az operációs rendszer - a felhasználó=tomcat. Hozzon létre a könyvtárat, ha nem létezik. Továbbá, miután elhelyezte a hitelesítő fájlt, győződjön meg róla, hogy a fájl felhasználója és csoportja tomcat, majd használja a chmod 400 hitelesítőt, hogy megbizonyosodjon arról, hogy a fájl csak a felhasználói=tomcat.
    
3. Hozzon létre a bucket URL-t [formátum, ERDDAP™ követelmények](#accessing-files-in-an-aws-s3-bucket) pl.:
     [https://noaa-goes17.s3.us-east-1.amazonaws.com](https://noaa-goes17.s3.us-east-1.amazonaws.com) és (nyilvános vödrökkel) tesztelni egy böngészőben, hogy megbizonyosodjon arról, hogy visszatér egy XML dokumentum, amely részlegesen felsorolja a tartalmát a bucket.
     
4. Használat [GenerateDatasetsXml](#generatedatasetsxml) létrehozni egy [EDDTableFromFileNames](#eddtablefromfilenames) adatkészlet:
    * A Starting könyvtárhoz használja ezt a szintaxot:
        \\*\\*\" *A-tól,* YourBucketUrl*
például,
        \\*\\*\\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/
    * File név regex? **
    * Visszatérő? Igaz
    * újratöltés EveryNMinutes? 10080
    *    infoUrl ?https://registry.opendata.aws/noaa-goes/
    * intézmény? NOAA 
    * összefoglaló? Nincs semmi ( ERDDAP™ automatikusan egy tisztességes összefoglalót hoz létre.) 
    * cím? Nincs semmi ( ERDDAP™ automatikusan létrehoz egy tisztességes címet.) A szokásos módon szerkesztenie kell az elért XML-t, hogy ellenőrizze a korrektséget, és javítson, mielőtt az adatkészletek zsunkja használja azt. datasets.xml ...
5. Ha követi a fenti utasításokat, és betölti az adatkészletet ERDDAP , létrehozott egy EDDTableFromFiles adatkészletet. Példaként, és hogy megkönnyítse bárki számára, hogy böngészjen és letöltse az AWS Open Data buckets fájlokat, létrehoztuk az EDDTableFromFileNames adatkészleteket (lásd a listát a listán az AWS Open Data buckets-ből).
     [https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files\\_](https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files_) ) szinte az összes [AWS S3 Open Data buckets](https://registry.opendata.aws/) ...
     \\[ A kevesek, akiket nem tartalmaztunk, vagy számos fájlt tartalmaztak a gyökérkönyvtárban (több, mint letölthető ésszerű idő alatt) vagy nem engedélyezi a nyilvános hozzáférést (Nem ők mind nyilvánosak?) vagy a Requester Pays buckets (pl. Sentinel) ... \\]   
Ha rákattintasz a "files" link az egyik ilyen adatkészlethez, böngészheti a könyvtárfát és a fájlokat ebben az S3-ban. Az út miatt\\*\\*\\*fromOnTheFly EDDTableFromFiles működik, ezek a könyvtári listák mindig tökéletesen naprakészek, mert ERDDAP™ a repülésen kapja meg őket. Ha rákattint a könyvtárfára egy tényleges fájlnévre, és kattintson a fájlnévre, ERDDAP™ átirányítja kérését az AWS S3-ra, hogy közvetlenül letölthesse a fájlt az AWS-től. Ezután ellenőrizheti ezt a fájlt.
    
Hiba?
Ha az EDDTableFromFiles nem tölt be ERDDAP™   (vagy DasDds) Nézze meg a log.txt fájlt egy hibaüzenethez. Ha látsz egyet
java.lang. IllegalArgumentException: profilfájl nem lehet null hiba, a probléma az, hogy az AWS SDK Java   (használt ERDDAP ) nem találja meg a hitelesítő fájlt. Lásd a hitelesítő utasításokat fent.
     

Sajnálatos, hogy az AWS nem egyszerűen lehetővé teszi, hogy az emberek egy böngészőt használhassanak, hogy megnézzék egy nyilvános vödör tartalmát.

 **Aztán megteheted ERDDAP™ olyan adatkészletek, amelyek hozzáférést biztosítanak a felhasználóknak az adatokhoz a fájlokban.**   
Lásd az utasításokat [ ERDDAP™ S3 vödör](#erddap-and-aws-s3-buckets)   (felett) ...
A minta EDDTableFromFileNames adatkészlet, amelyet fent készített, ha egy kicsit feküdt a könyvtár és a fájl nevek a könyvtárban, egyértelművé válik, hogy a felső szintű könyvtár nevek (pl.: ABI-L1b-RadC) megfelel annak, amit ERDDAP™ külön adatkészleteknek neveznék. A vödör, amellyel dolgozol, hasonló lehet. Ezután külön adatkészleteket hozhat létre ERDDAP™ az egyes adatkészletek esetében, például,
https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/  
mint&lt;cacheFromUrl&gt; Sajnos ebben a példában az adatkészletek a vödörben úgy tűnik, hogy az 1. vagy 2. szintű adatkészletek, amelyek ERDDAP™   [nem különösebben jó](#dimensions) Mivel az adatkészlet bonyolultabb változógyűjtemény, amely különböző dimenziókat használ.
     
    
### NcML fájlok{#ncml-files} 
NcML fájlok lehetővé teszik, hogy megadja az on-the-fly változások egy vagy több eredeti forrás NetCDF   (v3 vagy v4)   .nc , .grib, .bufr vagy .hdf   (v4 vagy v5) fájlok, majd ERDDAP™ kezelni .nc ml fájlok, mint a forrásfájlok. ERDDAP™ Az adatkészletek elfogadják .nc ml fájlok, amikor .nc A fájlok várhatóak. Az NcML fájlok MUST van a kiterjesztés .nc ml. Lásd: [ Unidata NcML dokumentáció](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html) ... NcML hasznos, mert lehet csinálni néhány dolgot vele (például különböző változásokat hozva a különböző fájlokra egy gyűjteményben, beleértve a fájlhoz adott dimenziót egy adott értékkel.) ,, hogy nem tehetsz vele ERDDAP A datasets.xml ...

* Változások egy .nc ml fájl utolsóModified idő okozza a fájlt, hogy újratöltsék, amikor az adatkészletet újratöltik, de az alapul szolgáló változások .nc Az adatfájlokat nem fogják közvetlenül észrevenni.
* Hint: NcML\\*nagyon\\*érzékeny néhány elem megrendelése az NcML fájlban. Gondolj az NcML-re, mint egy sor utasítást a megadott sorrendben, azzal a szándékkal, hogy megváltoztatja a forrásfájlokat (az állam az NcML fájl kezdetén/topján) a rendeltetési fájlokba (az állam az NcML fájl végén / alján) ...

Az NcML alternatívája az [ NetCDF Üzemeltetők ( NCO ) ](#netcdf-operators-nco) ... A nagy különbség az, hogy az NcML egy olyan rendszer, amely megváltoztatja a repülést (így a forrásfájlok nem változnak) , mivel NCO felhasználhatók a változásokhoz (vagy új verziók) a fájlok. Mindkettő NCO és az NcML nagyon, nagyon rugalmas, és lehetővé teszi, hogy szinte bármilyen változást gondoljon a fájlokra. Mindkét esetben kihívást jelenthet, hogy pontosan kitalálja, hogyan kell csinálni, amit szeretne csinálni - ellenőrizze az internetet hasonló példákra. Mindkettő hasznos eszköz a netCDF és HDF fájlok használatra ERDDAP - különösen, hogy a változásokat túlmutassuk azon, hogy mi ERDDAP A manipulációs rendszer megteheti.

Példa # 1: Idő dimenzió hozzáadása egy egységes értékkel
Itt van egy .nc ml fájl, amely létrehoz egy új külső dimenziót (Idő, 1 értékkel: 1041379200) és hozzáadja ezt a dimenziót a pic változójához az A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km nevű fájlban .nc :
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'>
      <variable name='time' type='int' shape='time' />
      <aggregation dimName='time' type='joinNew'>
        <variableAgg name='pic'/>
        <netcdf location='A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc' coordValue='1041379200'/>
      </aggregation>
    </netcdf>
```
Példa #2: A meglévő időérték megváltoztatása
Néha a forrás .nc a fájl már rendelkezik idő dimenzióval és időértékkel, de az érték helytelen (az Ön céljaira) ... Ez a .nc ml fájl azt mondja: az "19810825230030-NCEI" nevű adatfájl esetében a dimenzió változója "time" , állítsa be az egységek tulajdonságát, hogy "második 1970-01-01T00:00Z", és meghatározza az időértéket, hogy 367588800.
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'
      location="19810825230030-NCEI-L3C\\_GHRSST-SSTskin-AVHRR\\_Pathfinder-PFV5.3\\_NOAA07\\_G\\_1981237\\_day-v02.0-fv01.0.nc">
      <variable name="time">
        <attribute name='units' value='seconds since 1970-01-01T00:00:00Z' />
        <values>367588800</values>
      </variable>
    </netcdf>
```
###  NetCDF Üzemeltetők ( NCO )  {#netcdf-operators-nco} 
„A netCDF üzemeltetők ( NCO ) tartalmaz egy tucat önálló, parancssori programokat, amelyek netCDF \\[ v3 vagy v4 \\] , HDF   \\[ v4 vagy v5 \\] , \\[ .grib, .bufr, \\] vagy DAP fájlok mint bemenet, majd működnek (pl. új adatok, kompute statisztikák, nyomtatás, hiperslab, manipulálja a metaadatát) és adja ki az eredményeket a szövegben, bináris vagy netCDF formátumban való képernyőre vagy fájlokra. NCO támogatások elemzése rácsos tudományos adatok. A shell-parancs stílusa NCO lehetővé teszi a felhasználók számára, hogy interaktív módon manipulálják és elemezzék a fájlokat, vagy kifejező szkriptekkel, amelyek elkerülik a magasabb szintű programozási környezetek egy részét.” (a [ NCO ](https://nco.sourceforge.net/) Weboldal) ...

alternatíva NCO az [NcML](#ncml-files) ... A nagy különbség az, hogy az NcML egy olyan rendszer, amely megváltoztatja a repülést (így a forrásfájlok nem változnak) , mivel NCO felhasználhatók a változásokhoz (vagy új verziók) a fájlok. Mindkettő NCO és az NcML nagyon, nagyon rugalmas, és lehetővé teszi, hogy szinte bármilyen változást gondoljon a fájlokra. Mindkét esetben kihívást jelenthet, hogy pontosan kitalálja, hogyan kell csinálni, amit szeretne csinálni - ellenőrizze az internetet hasonló példákra. Mindkettő hasznos eszköz a netCDF és HDF fájlok használatra ERDDAP - különösen, hogy a változásokat túlmutassuk azon, hogy mi ERDDAP A manipulációs rendszer megteheti.

Például használható NCO hogy az idő egységei változóak legyenek egy olyan fájlcsoportban, ahol eredetileg nem voltak következetesek. Vagy használhat NCO alkalmazni scale\\_factor és add\\_offset egy olyan fájlcsoportban, ahol scale\\_factor és add\\_offset különböző értékekkel rendelkezik a különböző forrásfájlokban.
 (Vagy most kezelheti ezeket a problémákat ERDDAP™ keresztül [ EDDGrid FromNcFilesUnpack](#eddgridfromncfilesunpacked) Ez egy változata EDDGrid FromNcFiles, amelyek csomagolt adatokat csomagolnak, és alacsony szinten szabványosítják az időértékeket annak érdekében, hogy kezeljék a gyűjtőfájlokat, amelyek eltérőek scale\\_factor és add\\_offset vagy különböző időegységek.) 

 NCO Ingyenes és nyílt forráskódú szoftver, amely a [GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.html) licenc.

Példa # 1: Egységek konzisztens készítése
 EDDGrid FromFiles és EDDTable A Files ragaszkodik ahhoz, hogy az egy adott változó egységei azonosak legyenek az összes fájlban. Ha néhány fájl triviálisan (nem funkcionális) másoktól eltérő (pl. időegységek
"Seconds 1970-01-01 00:00 UTC" versus
 "seconds since 1970-01-01T00:00:00Z" Használhatnád NCO A [Növény](https://nco.sourceforge.net/nco.html#ncatted-netCDF-Attribute-Editor) . megváltoztatni az egységeket az összes fájlban, hogy azonos legyen
nco/catted - egy egység, idő, o,c, másodpercek 1970-01-01T00:00Z \\* .nc   
 \\[ Sok probléma, mint ez az EDDTableFrom... Files adatkészletek, most használhatja [szabványosítás Amit](#standardizewhat) Mondd el ERDDAP szabványosítani a forrásfájlokat, ahogy olvassák ERDDAP ... \\] 
    
### Korlátozza az adatkészlet méretét{#limits-to-the-size-of-a-dataset} 
Sok hivatkozást fogsz látni a "2 milliárd" alatt. Pontosabban, ez egy hivatkozás 2,147,483,647 (2^31-1) amely a 32 bites aláírt integrál maximális értéke. Egyes számítógépes nyelveken például Java   (melyik ERDDAP™ be van írva) Ez a legnagyobb adattípus, amelyet sok adatstruktúrára lehet használni (például egy tömb mérete) ...

Erős értékek (például a változó nevek, a tulajdonság nevek, a String attribute értékek és a String adatértékek) , a legnagyobb számú karakter per String in ERDDAP™ 2 milliárd. De szinte minden esetben kicsi vagy nagy probléma lesz, ha a String meghaladja az ésszerű méretet (pl. 80 karakter a változó nevekhez és a tulajdonságnevekhez, és 255 karakter a legerősebb tulajdonsági értékekhez és adatértékekhez) ... Például olyan weboldalak, amelyek hosszú változó neveket jelenítenek meg, kényelmetlenül szélesek lesznek, és a hosszú változó neveket kivonják, ha túllépik a válaszfájltípus határát.

A rácsos adatkészletek esetében:

* A maximális szám axisVariable S ~2 milliárd.
A maximális szám dataVariable S ~2 milliárd.
De ha egy adatkészletnek van &gt;100 változója, akkor nehéz lesz használni a felhasználókat.
És ha egy adatkészletnek 1 millió változója van, akkor a szervernek sok fizikai memóriára van szüksége, és más problémák is lesznek.
* Az egyes dimenziók maximális mérete ( axisVariable ) 2 milliárd érték.
* Azt hiszem, a cellák maximális teljes száma (az összes dimenziós méret terméke) korlátlan, de lehet ~9e18.

A tabuláris adatkészletek esetében:

* A maximális szám dataVariable S ~2 milliárd.
De ha egy adatkészletnek van &gt;100 változója, akkor nehéz lesz használni a felhasználókat.
És ha egy adatkészletnek 1 millió változója van, akkor a szervernek sok fizikai memóriára van szüksége, és más problémák is lesznek.
* A legtöbb forrás (például fájlok) Ez összesíthető - 2 milliárd.
* Bizonyos esetekben az egyéni forrásból származó sorok maximális száma (Például egy fájl, de nem adatbázis) 2 milliárd sor.
* Nem hiszem, hogy vannak más határok.

Mind a rácsos, mind a mentő adatkészletek esetében vannak belső határértékek az aljzat méretére vonatkozóan, amelyet a felhasználó kérhet egyetlen kérelemben. (gyakran kapcsolódik a &gt;2 milliárd valami vagy ~9e18 valami) , de sokkal valószínűbb, hogy a felhasználó eléri a fájltípusspecifikus határokat.

*    NetCDF verzió 3 .nc A fájlok 2GB byte-re korlátozódnak. (Ha ez valóban problémát jelent valakinek, hadd tudjam: Hozzáadhatnám a támogatást NetCDF verzió 3 .nc 64 bites kiterjesztés vagy NetCDF A 4. verzió, amely jelentősen növelné a határt, de nem végtelenül.) 
* Böngésző összeomlik csak ~ 500 MB adat, így ERDDAP™ korlátozza a válaszot .htmlTable ~400MB adatkérés.
* Számos adatelemzési program hasonló korlátokkal rendelkezik (Például a méret maximális mérete gyakran ~ 2 milliárd érték) Tehát nincs ok arra, hogy keményen dolgozzon a fájltípusspecifikus határok körül.
* A fájltípus-specifikus határok hasznosak abban, hogy megakadályozzák a naiv kérelmek valóban hatalmas mennyiségű adat (Például: "add meg nekem az összes adatkészletet", amikor az adatkészlet 20TB adatkészlettel rendelkezik) , amely heteket vagy hónapokat vesz igénybe a letöltéshez. Minél hosszabb a letöltés, annál valószínűbb, hogy sokféle ok miatt kudarcot vall.
* A fájltípus-specifikus határok hasznosak abban, hogy arra kényszerítik a felhasználót, hogy kezelje ésszerűen méretű alkatrészeket (például egy nagy hálózatú adathalmaz kezelése fájlokon keresztül, egy alkalommal adatokkal, minden alkalommal) ...
         
### Váltás ACDD-1.3{#switch-to-acdd-13} 
Mi vagyunk (nevezetesen [GenerateDatasetsXml](#generatedatasetsxml) ) Jelenleg ajánlott [ACDD verzió 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) , amelyet 2015 elején ratifikáltak, és amelyet „ACDD-1.3”-nak neveznek a globális egyezményekben. Előző ERDDAP™ verzió 1.62 (megjelent 2015 júniusában) , ERDDAP™ használt/ajánlotta az eredeti, 1.0 verziót, [ NetCDF Attribute Convention for Dataset Discovery](https://wiki.esipfed.org/ArchivalCopyOfVersion1) amelyet "-nak" neveztek. Unidata Dataset Discovery v1.0" a globális egyezményekben és Metadata\\_Conventions tulajdonságok.

Ha az adatkészletek az ACDD korábbi verzióit használják, akkor RECOMMEND-re váltunk az ACDD-1.3-ra. Nem nehéz. Az ACDD-1.3 nagyon visszafelé kompatibilis az 1.0 verzióval. Átváltani minden adatkészletet (kivéve, kivéve EDDGrid FromErddap és EDDTable FromErdp adatkészletek) :

1. Távolítsa el az újonnan deprekált globális Metadata\\_Conventions attribútum hozzáadása (vagy a meglévő megváltoztatásával Metadata\\_Conventions tulajdonság)   
```
        <att name="Metadata\\_Conventions">null</att>  
```
az adatkészlet globális&lt; addAttributes &gt;.
     
2. Ha az adatkészlet rendelkezik a globálisan jellemző egyezményekkel&lt; addAttributes &gt; változtassa meg az összes " Unidata Dataset Discovery v1.0" hivatkozások az "ACDD-1.3"-ra.
Ha az adatkészlet nem rendelkezik a globális egyezményekkel&lt; addAttributes &gt; aztán hozzáadjuk az ACDD-1.3-at. Például,
```
        <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
```
         
3. Ha az adatkészlet globális standard\\_name\\_vocabulary attribútum, kérjük, változtassa meg az érték formátumát, például,
```
        <att name="standard\\_name\\_vocabulary">CF Standard Name Table v65</att>  
```
Ha a hivatkozás egy régebbi verzióra vonatkozik [CF standard névtáblázat](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) ... valószínűleg jó ötlet a jelenlegi verzióra váltani (65, ahogy ezt írjuk) Mivel az új szabványos neveket hozzáadjuk az asztalhoz a későbbi verziókkal, de a régi szabványos neveket ritkán deprekálják, és soha nem távolítják el.
     
4. Bár az ACDD-1.0 globális tulajdonságokat tartalmazott creator\\_name , creator\\_email , creator\\_url , [GenerateDatasetsXml](#generatedatasetsxml) nem tette automatikusan hozzá őket, amíg valamikor körül ERDDAP™ v1.50. Ez fontos információ:
        
    *    creator\\_name lehetővé teszi a felhasználók számára, hogy ismerjék/meghatározzák az adatkészlet létrehozását.
    *    creator\\_email elmondja a felhasználóknak a preferált e-mail címet az adatkészlet létrehozásához, például, ha kérdéseik vannak az adatkészlettel kapcsolatban.
    *    creator\\_url lehetőséget ad a felhasználóknak arra, hogy többet megtudjanak az alkotóról.
    *    ERDDAP™ az összes információt az FGDC és az ISO 19115-2/19139 metaadat-dokumentumok generálásakor használja minden adatkészlethez. Ezeket a dokumentumokat gyakran külső keresési szolgáltatások használják.
    
Kérjük, adja hozzá ezeket a tulajdonságokat az adatkészlet globális&lt; addAttributes &gt;.
```
        <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
        <att name="creator\\_email">erd.data@noaa.gov</att>  
        <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
```
    
Ez az. Remélem, ez nem túl nehéz.
     
### Zarr{#zarr} 
2.25 verzió ERDDAP™ olvasható helyi Zarr fájlok használatával [EDDTableFromNcFiles](#eddtablefromncfiles) és [ EDDGrid FromNcFiles](#eddgridfromncfiles) ...

 (2019 augusztusától) Könnyen tévedhetünk, de még nem vagyunk meggyőződve arról, hogy [Zarr](https://github.com/zarr-developers/zarr-python) vagy hasonló rendszerek, amelyek az adatfájlokat kisebb darabokra bontják, nagyszerű megoldások a probléma a ERDDAP™ a felhőszolgáltatásokban tárolt adatok, mint az Amazon AWS S3. Zarr egy nagyszerű technológia, amely számos helyzetben megmutatta hasznosságát, nem vagyunk biztosak abban, hogy ERDDAP +S3 lesz az egyik ilyen helyzet. Többnyire azt mondjuk: mielőtt sietnénk, hogy az összes adatot Zarrban tároljuk, végezzünk teszteket, hogy lássuk, valójában jobb megoldás.

Az adatokhoz való hozzáféréssel kapcsolatos problémák a felhőben a latencia (a lag, hogy először kap adatokat) fájlszintű hozzáférés (a blokkszintű hozzáférés helyett) ... Zarr megoldja a fájlszintű hozzáférési problémát, de semmit sem tesz a latencia. Összehasonlítva, hogy csak letöltse a fájlt (így lehet olvasni, mint egy helyi fájlt blokk szintű hozzáféréssel) Zarr még súlyosbíthatja a latencia problémát, mert Zarr-val a fájl olvasása most számos hívássorozatot tartalmaz a fájl különböző részei olvasásához (mindegyik saját laggal) ... A latenciaproblémát a kérések párhuzamosan meg lehet oldani, de ez egy magasabb szintű megoldás, nem Zarrtól függ.

Zárral (mint a kapcsolati adatbázisokkal) Elveszítjük azt a kényelmet, hogy egy adatfájl egy egyszerű, egyetlen fájl, amely könnyen ellenőrizheti az integritását, vagy letöltés egy példányt.

 ERDDAP™   (mint v2) rendszerrel rendelkezik a helyi fájlok tárolására egy URL forrásból (pl. S3) (lásd)&lt;cacheFromUrl&gt; és&lt;cacheMaxGB&gt;] (#cachefromurl) ). Az új [&lt;nThreads&gt;] (#nthreads) minimalizálja a latencia problémát az adatátvitel magas szintű párhuzamosságával.&lt;A cacheFromUrl&gt; nagyon jól működik sok forgatókönyv esetében. (Nem vagyunk biztosak abban, hogy mennyire hasznosak vagyunk&lt;nThreads&gt; további tesztek nélkül.) Bevalljuk, hogy nem végeztünk időzítési teszteket egy AWS-en, jó hálózati kapcsolattal, de sikeresen teszteltünk különböző távoli URL-forrásokkal. És ERDDAP A&lt;cacheFromUrl&gt; bármilyen típusú adatfájllal működik (pl.: .nc , .hdf , .csv, .jsonlCSV ) még akkor is, ha külsőleg tömörített (pl.: .gz ) , a fájlok módosítása nélkül (pl. Zarr gyűjteményként újraírni őket) ...

Valószínű, hogy a különböző forgatókönyvek különböző megoldásokat, például csak egy fájl egy részét kell elolvasni egyszer (Zarr győzni fog) vs. egyszer el kell olvasnia az összes fájlt, vs.-nek ismételten el kell olvasnia a részét vagy az összes fájlt.&lt;cacheFromUrl&gt; győzni fog.

Többnyire azt mondjuk: mielőtt sietnénk, hogy az összes adatot Zarrban tároljuk, végezzünk teszteket, hogy lássuk, valójában jobb megoldás.

- -
## A típusok adatbázisainak listája{#list-of-types-datasets} 
Ha segítségre van szüksége a megfelelő adatkészlet kiválasztásában, lásd [Az adatkészlet típusának kiválasztása](#choosing-the-dataset-type) ...

Az adatkészletek típusai két kategóriába tartoznak. ( [Miért?](#why-just-two-basic-data-structures) ) 

###  EDDGrid  {#eddgrid} 
*    [ ** EDDGrid ** ](#eddgrid) Az adatkészletek kezelik a hálózati adatokat.
    * Inkább EDDGrid adatkészletek, adatok változói többdimenziós adatsorok.
    * Ott lehet egy tengely változó minden dimenzióban. Axis változók MUST van meghatározva annak érdekében, hogy az adatok változók használja őket.
    * Inkább EDDGrid adatkészletek, minden adatváltozat MUST használat (Részvény) az összes tengely változó.
         ( [Miért?](#why-just-two-basic-data-structures)   [Mi van, ha nem?](#dimensions) ) 
Újdonság ERDDAP™ verzió 2.29.0 EDDGrid FromNcFiles kísérleti támogatást nyújt az olyan adatok változóinak, amelyek nem támogatják az összes tengelyváltozatot (vagy ahogy néhányan úgy hívták, hogy az 1D és a 2D adatok ugyanazon adatkészletben) ...
    * Osztott dimenziós értékek - Minden EDDGrid adatkészletek, minden dimenzió MUST rendezett rendben (Felemelkedés vagy leszármazás) ... Mindegyik szabálytalanul helyet foglalhat. Nem lehetnek kapcsolatok. Ez a követelmény a [CF metaadat szabvány](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) ... Ha bármely dimenzió értéke nem rendezett rendben van, az adatkészlet nem lesz betöltve és ERDDAP™ azonosítja az első fel nem szorított értéket a logfájlban, *bigParentDirectory[szerkesztés]* /logs/log.txt .
        
Néhány alosztálynak további korlátozásai vannak (különösen, EDDGrid Az AggregateExistingDimension megköveteli, hogy a külső (balra, első) dimenzió felemelkedjen.
        
A nem szorított dimenziós értékek szinte mindig problémát jelentenek a forrásadatokkal. Ez a leggyakrabban akkor fordul elő, amikor egy tévhit vagy nem megfelelő fájl szerepel a gyülekezetben, ami egy szorulatlan idő dimenzióhoz vezet. A probléma megoldásához lásd a hibaüzenetet ERDDAP™ log.txt fájl, hogy megtalálja a megsértő időértéket. Ezután nézze meg a forrásfájlokat, hogy megtalálja a megfelelő fájlt (vagy egy előtt vagy után) ez nem tartozik a gyülekezetbe.
        
    * Lásd a teljesebb leírást [ EDDGrid adatmodell](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel) ...
    * A EDDGrid adatkészlettípusok:
        *    [ EDDGrid FromAudioFiles](#eddfromaudiofiles) összesíti az adatokat egy csoport helyi audio fájlokat.
        *    [ EDDGrid dalszöveg](#eddgridfromdap) kezeli a rácsos adatokat DAP szerverek.
        *    [ EDDGrid FromEDDTable](#eddgridfromeddtable) lehetővé teszi, hogy egy mesés adatállományt egy rácsolt adatkészletbe konvertáljon.
        *    [ EDDGrid FromErdap](#eddfromerddap) rajtolt adatok kezelése egy távolból ERDDAP ...
        *    [ EDDGrid FromEtopo](#eddgridfrometopo) csak kezeli a beépített ETOPO topográfiai adatokat.
        *    [ EDDGrid Fájlok](#eddgridfromfiles) az összes szuperosztály EDDGrid A... Files osztályok.
        *    [ EDDGrid FromMergeIRFiles](#eddgridfrommergeirfiles) összesíti a helyi MergeIR csoport adatait .gz fájlok.
        *    [ EDDGrid FromNcFiles](#eddgridfromncfiles) összesíti az adatokat egy helyi csoportból NetCDF   (v3 vagy v4)   .nc és kapcsolódó fájlok.
        *    [ EDDGrid FromNcFilesUnpack](#eddgridfromncfilesunpacked) variáns, ha EDDGrid FromNcFiles, amely adatokat is gyűjt egy helyi csoportból NetCDF   (v3 vagy v4)   .nc és kapcsolódó fájlok, amelyek ERDDAP™ alacsony szintű csomagok.
        *    [ EDDGrid LonPM180](#eddgridlonpm180) módosítja a gyermek hosszúsági értékeit EDDGrid hogy a -180-180-as tartományban vannak.
        *    [ EDDGrid Lon0360](#eddgridlon0360) módosítja a gyermek hosszúsági értékeit EDDGrid hogy a 0-360-as tartományban vannak.
        *    [ EDDGrid SideBySide](#eddgridsidebyside) aggregál két vagy több EDDGrid adatkészletek oldalról oldalra.
        *    [ EDDGrid AggregateExistingDimenzió](#eddgridaggregateexistingdimension) aggregál két vagy több EDDGrid adatkészletek, amelyek mindegyikének különböző értékei vannak az első dimenzióban, de azonos értékek a többi dimenzió számára.
        *    [ EDDGrid Másolás](#eddgridcopy) létrehozhat egy másik helyi másolatot EDDGrid Az adatok és szolgálja az adatokat a helyi másolatból.
             
    * Minden EDDGrid Az adatkészletek támogatják az nThreads beállítást, ami azt mondja ERDDAP™ hány szálat kell használni, amikor válaszol egy kérésre. Lásd: [nHárom](#nthreads) dokumentáció a részletekért.
         
### EDDTable{#eddtable} 
*    [ **EDDTable** ](#eddtable) Az adatkészletek kezelik a mesés adatokat.
    * A tabuláris adatok adatbázis-szerű táblázatként szolgálhatnak sorokkal és oszlopokkal. Minden oszlop (egy adat változó) van egy név, egy sor tulajdonság, és tárol csak egy típusú adat. Minden sornak van egy megfigyelése (vagy a kapcsolódó értékek csoportja) ... Az adatforrás más adatstruktúrában, bonyolultabb adatstruktúrában és/vagy több adatfájlban is rendelkezhet, de ERDDAP™ képesnek kell lennie arra, hogy a forrásadatokat adatbázisszerű táblázatba helyezze annak érdekében, hogy az adatokat takaró adatkészletként jelenítse meg a felhasználók számára ERDDAP ...
    * Lásd a teljesebb leírást [EDDTable adatmodell](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel) ...
    * Az EDDTable adatkészlet típusai:
        *    [EDDTableFromAllDatasets](#eddtablefromalldatasets) egy magasabb szintű adatkészlet, amely információkkal rendelkezik az összes többi adatkészletről az Önben ERDDAP ...
        *    [EDDTableFromAsciiFiles](#eddtablefromasciifiles) összesíti az adatokat a comma-tól, a tab-tól, a szemicolon-tól, vagy az űrválasztott tabuláris ASCII adatfájloktól.
        *    [EDDTableFromAsciiService](#eddtablefromasciiservice) az összes EDDTableFromAsciiService... osztályok szuperosztálya.
        *    [EDDTableFromAsciiServiceNOS](#eddtablefromasciiservicenos) adatokat kezel egyesektől NOAA NOS webszolgáltatások.
        *    [EDDTableFromAudioFiles](#eddfromaudiofiles) összesíti az adatokat egy csoport helyi audio fájlokat.
        *    [EDDTableFrom AwsXmlFiles](#eddtablefromawsxmlfiles) összesíti az adatokat egy sor Automatic Weather Station (AWS) XML fájlok.
        *    [EDDTableFromCassandra](#eddtablefromcassandra) kezeli a mesés adatokat egy Cassandra asztalról.
        *    [EDDTableFromColumnarAsciiFiles](#eddtablefromcolumnarasciifiles) összesíti a tabuláris ASCII adatfájlok adatait rögzített szélességi adatoszlopokkal.
        *    [EDDTableFromDapSequence](#eddtablefromdapsequence) kezeli a mentő adatokat DAP Sequence szerverek.
        *    [EDDTableFromDatabase](#eddtablefromdatabase) kezeli a mentő adatokat egy adatbázis táblából.
        *    [EDDTableFrom EDDGrid ](#eddtablefromeddgrid) lehetővé teszi, hogy létrehozzon egy EDDTable adatkészletet egy EDDGrid adatkészlet.
        *    [EDDTableFromErddap](#eddfromerddap) kezeli a mesés adatokat távolról ERDDAP ...
        *    [EDDTableFromFileNames](#eddtablefromfilenames) Adatkészletet hoz létre a szerver fájlrendszerében lévő fájlok csoportjáról, de nem szolgálja az adatokat a fájlokban.
        *    [EDDTableFromFiles](#eddtablefromfiles) az összes EDDTableF felülete... Files osztályok.
        *    [EDDTableFromHttpGet](#eddtablefromhttpget) az ERDDAP „Csak az adatimport és az adatexport rendszere.
        *    [EDDTableFrom Hyrax Fiók](#eddtablefromhyraxfiles)   (Meghatározva) összesíti a fájlok adatait több változóval, amelyeket megosztott dimenziók szolgálnak egy [ Hyrax   OPeNDAP szerver](https://www.opendap.org/software/hyrax-data-server) ...
        *    [EDDTableFromInvalidCRAFiles](#eddtablefrominvalidcrafiles) összesített adatok NetCDF   (v3 vagy v4)   .nc fájlok, amelyek egy adott, érvénytelen, változata a CF DSG Contiguous Ragged Array (CRA) fájlok. Bár ERDDAP™ támogatja ezt a fájltípust, ez egy érvénytelen fájltípus, amelyet senkinek nem kell használnia. Azok a csoportok, amelyek jelenleg ezt a fájltípust használják, erősen ösztönzik a használatra ERDDAP™ hiteles CF DSG CRA fájlok generálására, és hagyja abba ezeket a fájlokat.
        *    [EDDTableFromJsonlCSVFiles](#eddtablefromjsonlcsvfiles) összesített adatok [JSON Lines CSV fájlok](https://jsonlines.org/examples/) ...
        *    [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) összesített adatok NetCDF   (v3 vagy v4)   .nc több változóval rendelkező fájlok közös dimenziókkal.
        *    [EDDTableFromMqt](/docs/server-admin/mqtt-integration) az MQTT üzeneteken alapuló adatkészletet épít. Vegye figyelembe, hogy a dokumentáció egy dedikált oldalon van. Ne feledje, hogy sok hasonlóság van [EDDTableFromHttpGet](#eddtablefromhttpget) ...
        *    [EDDTableFromNcFiles](#eddtablefromncfiles) összesített adatok NetCDF   (v3 vagy v4)   .nc több változóval rendelkező fájlok közös dimenziókkal. Jó, ha továbbra is használja ezt az adatkészlettípust a meglévő adatkészletekhez, de új adatkészletek esetében inkább az EDDTableFromMultidimNcFiles használatát javasoljuk.
        *    [EDDTableFromNcCFFiles](#eddtablefromnccffiles) összesített adatok NetCDF   (v3 vagy v4)   .nc fájlokat, amelyek az egyik fájlformátumot használják, amelyet a [CF Discrete Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) egyezmények. De az egyik multidimenzionális CF DSG változatot használó fájlokhoz, használjon [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) Ehelyett.
        *    [EDDTableFromNccsvFiles](#eddtablefromnccsvfiles) összesített adatok [NCCSV](/docs/user/nccsv-1.00) ASCII .csv fájlok.
        *    [EDDTableFromNOS](#eddtablefromnos)   (Meghatározva) kezeli a mentő adatokat az NOS XML szerverektől.
        *    [EDDTableFromOBIS](#eddtablefromobis) kezeli a mentő adatokat az OBIS szervereitől.
        *    [EDDTableFromParquetFiles](#eddtablefromparquetfiles) adatok kezelése [Parquet](https://parquet.apache.org/) ...
        *    [EDDTableFrom SOS ](#eddtablefromsos) kezeli a mentő adatokat SOS szerverek.
        *    [EDDTableFromThreddsFiles](#eddtablefromthreddsfiles)   (Meghatározva) összesíti a fájlok adatait több változóval, amelyeket megosztott dimenziók szolgálnak egy [Hírek OPeNDAP szerver](https://www.unidata.ucar.edu/software/tds/) ...
        *    [EDDTableFrom WFS Fiók](#eddtablefromwfsfiles)   (Meghatározva) helyi másolatot készít az összes adatról egy ArcGIS MapServer WFS szerver, így az adatok gyorsan továbbíthatók ERDDAP™ felhasználók.
        *    [EDDTableAggregateRows](#eddtableaggregaterows) EDDTable adatkészletet készíthet egy EDDTable adatkészletből.
        *    [EDDTableCopy](#eddtablecopy) helyi másolatot készíthet sokféle EDDTable adatkészletből, majd gyorsan megőrizheti az adatokat a helyi másolatból.

  
- -

## Adatkészlettípusok részletes leírása{#detailed-descriptions-of-dataset-types} 

###  EDDGrid dalszöveg{#eddgridfromdap} 
 [ ** EDDGrid dalszöveg** ](#eddgridfromdap) kezeli a hálózati változókat [ DAP ](https://www.opendap.org/) szerverek.

* Erősen ajánljuk a használatát [GenerateDatasets Xml program](#generatedatasetsxml) egy durva tervezetet készíteni datasets.xml cunk ehhez az adatkészlethez. Összegyűjtheti azokat az információkat, amelyekre szüksége van, hogy csípjen vagy létrehozza a saját XML-jét egy EDDGrid FromDap adatkészlet a forrásadatlap DDS és DAS fájlok megtekintésével a böngészőben (.das és .dds hozzáadása sourceUrl Például, [https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds](https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds) ) ...
     
*    EDDGrid FromDap adatokat kaphat bármilyen többdimenziós változóból DAP adatkiszolgáló. (Korábban, EDDGrid FromDap korlátozott volt a változók kijelölt "széles", de ez már nem követelmény.)   
     
* Osztott dimenziós értékek - Az értékek minden dimenzióban MUST lehet rendezett rendben (Felemelkedés vagy leszármazás) ... Az értékek szabálytalanul helyreállhatnak. Nem lehetnek kapcsolatok. Ez a követelmény a [CF metaadat szabvány](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) ... Ha bármely dimenzió értéke nem rendezett rendben van, az adatkészlet nem lesz betöltve és ERDDAP™ azonosítja az első fel nem szorított értéket a logfájlban, *bigParentDirectory[szerkesztés]* /logs/log.txt .
    
A nem szorított dimenziós értékek szinte mindig problémát jelentenek a forrásadatokkal. Ez a leggyakrabban akkor fordul elő, amikor egy tévhit vagy nem megfelelő fájl szerepel a gyülekezetben, ami egy szorulatlan idő dimenzióhoz vezet. A probléma megoldásához lásd a hibaüzenetet ERDDAP™ log.txt fájl, hogy megtalálja a megsértő időértéket. Ezután nézze meg a forrásfájlokat, hogy megtalálja a megfelelő fájlt (vagy egy előtt vagy után) ez nem tartozik a gyülekezetbe.
    
####  EDDGrid FromDap csontváz XML{#eddgridfromdap-skeleton-xml} 

 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset type="EDDGridFromDap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromDap, this gets the remote .dds and then gets the new  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

     
###  EDDGrid FromEDDTable{#eddgridfromeddtable} 
 [ ** EDDGrid FromEDDTable** ](#eddgridfromeddtable) lehetővé teszi, hogy egy EDDTable tabuláris adatállományt egy EDDGrid megrúgott adatkészlet. Ne feledje, hogy ERDDAP™ kezeli az adatkészleteket, mint akár [Hálózott adatkészletek (alosztályok EDDGrid ) vagy mesés adatkészletek (EDDTable alosztályai) ](#why-just-two-basic-data-structures) ...

* Normális esetben, ha megrúgta az adatokat, csak egy EDDGrid adatkészlet közvetlenül. Néha ez nem lehetséges, például, ha van olyan adat, amelyet egy kapcsolati adatbázisban tárolnak ERDDAP™ csak az EDDTableFromDatabase-on keresztül érhető el. EDDGrid FromEDDTable osztály lehetővé teszi, hogy orvosolja ezt a helyzetet.
     
* Nyilvánvaló, hogy a mögöttes EDDTable adatkészletben szereplő adatoknak az alapul szolgáló EDDTable adatkészletben kell szerepelniük. (alapvetően) fúrt adatok, de takaró formában. Például az EDDTable adatkészletnek CTD-adatai lehetnek: a keleti és északi jelenlegi mérések, több mélységben, többször. Mivel a mélységek minden alkalommal azonosak, EDDGrid FromEDDTable hozhat létre egy rácsos adatkészletet egy időben és egy mélység dimenzióval, amely az adatokat az alapul szolgáló EDDTable adatkészleten keresztül éri el.
     
* GenerateDatasets Xml -- Erősen ajánljuk a használatát [GenerateDatasets Xml program](#generatedatasetsxml) egy durva tervezetet készíteni datasets.xml cunk ehhez az adatkészlethez. Összegyűjtheti azokat az információkat, amelyekre szüksége van a durva tervezet javítására.
     
* Forrás tulajdonságok -- Mint minden más típusú adatkészlet esetében, EDDGrid FromTable van az ötlet, hogy vannak globális forrásAttributes és [globális addAttributes ](#global-attributes)   (meghatározott datasets.xml ) kombinálva a globális kombináltságot tulajdonságok, melyeket a felhasználók látnak. A globális forrásAttributes, EDDGrid FromEDDTable használja a globális kombinált Az alapul szolgáló EDDTable adatkészlet tulajdonságai. (Ha egy percig gondolsz rá, akkor van értelme.) 
    
Hasonlóképpen, mindenki számára axisVariable és dataVariable A [ addAttributes ](#addattributes) , EDDGrid FromEDDTable használja a változó kombinált Az alapul szolgáló EDDTable adatkészlet tulajdonságai, mint EDDGrid FromEDDTable változó forrásAttributes. (Ha egy percig gondolsz rá, akkor van értelme.) 
    
Következésképpen, ha az EDDTable jó metaadatokkal rendelkezik, az EDDGrid FromEDDTable gyakran szüksége van nagyon kevés addAttributes metadata - csak néhány csípő itt és ott.
    
*    dataVariable versus axisVariable S - A mögöttes EDDTable csak dataVariable S. Egy EDDGrid FromEDDTable adatkészlet lesz néhány axisVariable s (az EDDTable közül néhány dataVariable s) Néhány dataVariable s (a fennmaradó EDDTable dataVariable s) ... [GenerateDatasetsXml](#generatedatasetsxml) kitalálja, hogy melyik EDDTable dataVariable S váljon EDDGrid FromEDDTable axisVariable S, de csak egy kitalált. A GenerateDatasetsXml kimenetét módosítania kell annak meghatározására, hogy melyik dataVariable lesz axisVariable s, és melyik sorrendben.
     
* AxisValues - Nincs semmi a mögöttes EDDTable-ről, hogy elmondja EDDGrid FromEDDTable a lehetséges értékek a axisVariable s az adatkészlet rácsos változatában, így minden egyes információt megadja axisVariable ezen tulajdonságok egyikén keresztül:
    
    * axisValues - lehetővé teszi, hogy meghatározza az értékek listáját. Például,
        &lt;att name="axisValues" [dalszöveg: DoubleList](#attributetype) 2,5, 3,3.5, 4&lt;/att&gt;
Vegye figyelembe egy használatát [adattípus](#data-types) plusz a lista szó. Szintén a lista típusa (például kettős) MUST megfelel az adatoknak A változó típusa az EDDTable és EDDGrid FromEDDTable adatkészletek.
    * axisValuesStartStrideStop - lehetővé teszi, hogy megjelölje a rendszeres terhelt értékek sorozatát azáltal, hogy meghatározza a kezdetet, a szélsőséget és az értékeket. Itt van egy példa, amely egyenértékű a tengelyValues példa fent:
        &lt;att name="axisValuesStartStrideStop" [dalszöveg: DoubleList](#attributetype) \\&gt;2, 0,5, 4&lt;/att&gt;
Ismét vegye figyelembe egy lista adattípus használatát. Szintén a lista típusa (például kettős) MUST megfelel az adatoknak A változó típusa az EDDTable és EDDGrid FromEDDTable adatkészletek.
         
    
Frissítések - Ahogy nincs mód arra, hogy EDDGrid FromEDDTable, hogy meghatározza a tengelyValues az EDDTable kezdetben, nincs megbízható módja annak, hogy a EDDGrid FromEDDTable, hogy meghatározza az EDDTable, amikor a tengelyValues változott (különösen, ha új értékek vannak az idő változójához) ... Jelenleg az egyetlen megoldás az, hogy megváltoztassa az axisValues tulajdonságát datasets.xml és újratöltse az adatkészletet. Például írhatsz egy forgatókönyvet
    
    1. Keresés datasets.xml Mert
         datasetID Ó *ADatasetID* "..."
így a megfelelő adatkészlettel dolgozol.
    2. Keresés datasets.xml a következő előfordulásért
         <sourceName>  *AVariablesSourceName*  </sourceName>   
így a helyes változóval dolgozol.
    3. Keresés datasets.xml a következő előfordulásért
```
        <att name="axisValuesStartStrideStop" type="doubleList">  
```
így ismeri a címke kezdeti pozícióját.
    4. Keresés datasets.xml a következő előfordulásért
```
        </att>  
```
így ismeri a tengelyértékek végső pozícióját.
    5. Helyettesítse a régi indulást, merüljön fel, állítsa le az értékeket az új értékekkel.
    6. Kapcsolatfelvétel a [zászló URL](/docs/server-admin/additional-information#set-dataset-flag) az adatkészlet számára, hogy elmondja ERDDAP™ az adatkészlet újratöltéséhez.
    
Ez nem ideális, de működik.
     
* precizitás - Mikor EDDGrid FromEDDTable válaszol a felhasználó kérésére az adatok, ez mozog egy sor adatot az EDDTable válasz táblába a EDDGrid válasz rács. Ehhez ki kell találni, hogy az adott sorban lévő "axis" értékek egy adott sorban megfelelnek-e a tengelyértékek kombinációjának a hálózatban. Az integrált adattípusok esetében könnyen meghatározható, hogy két érték egyenlő-e. De az úszók és a duplák esetében ez felveti a lebegő pontszámok szörnyű problémáját [nem egyezik pontosan](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) ... (például 0,2 versus 0.19999999996) ... Hogy (próbálkozni) foglalkozz ezzel, EDDGrid FromTable lehetővé teszi, hogy meghatározza a pontos tulajdonság bármelyike számára axisVariable s, amely meghatározza a decimális számjegyek teljes számát, amelyeknek azonosnak kell lenniük.
    * Például,&lt;att name="precision" típusú="int"&gt;5&lt;/att&gt;
    * A különböző típusú adatok változói, vannak különböző alapértelmezett pontossági értékek. Az alapértelmezések általában megfelelőek. Ha nem, meg kell határoznia a különböző értékeket.
    * Mert axisVariable i. [Idő vagy idő Stamp változók](#timestamp-variables) Az alapértelmezés teljes pontosságú (pontos mérkőzés) ...
    * Mert axisVariable s amelyek úszók, az alapértelmezett pontosság 5
    * Mert axisVariable duplák, az alapértelmezett pontosság 9.
    * Mert axisVariable az integrált adattípusok, EDDGrid Az FromEDDTable figyelmen kívül hagyja a pontosságot, és mindig teljes pontosságot használ (pontos mérkőzés) ...
         
    *    **FIGYELEM&#33;** Amikor egy csomó tabuláris adatot átváltoztat egy zsúfolt adatokba, ha EDDGrid Az FromEDDTable nem tud egy EDDTable "axis" értéket elérni az egyik várhatóan EDDGrid FromEDDTable axis értékek, EDDGrid FromEDDTable csendesen (Nincs hiba) dobja el az adatokat az asztal sorából. Például lehetnek más adatok (nem a rácson) az EDDTable adatkészletben. (És ha sztride &gt; 1, nem nyilvánvaló, hogy EDDGrid A táblázatból, amely a tengelyértékek kívánt értékek, és melyek azok, akiket a törzs miatt kell kihagyni.) Tehát, ha a pontossági értékek túl magasak, a felhasználó hiányzó értékeket lát az adatválaszban, amikor az érvényes adatértékek ténylegesen léteznek.
        
Ezzel szemben, ha a pontossági értékek túl alacsonyak, EDDTable "axis" értékeket állítanak fel, amelyeknek nem kell megfelelniük EDDGrid FromEDDTable axis értékek (tévesen) Meccs.
        
Ezek a potenciális problémák szörnyűek, mert a felhasználó rossz adatokat kap (vagy hiányzó értékek) ha megfelelő adatokat kell kapniuk (vagy legalább hibaüzenet) ...
Ez nem egy hibás EDDGrid FromTable. EDDGrid FromTable nem tudja megoldani ezt a problémát. A probléma a tabuláris adatok áttérésében rejlik a rácsos adatokba (kivéve, ha más feltételezéseket lehet tenni, de nem tehetik itt) ...
Ez rajtad múlik, ERDDAP™ adminisztrátor, **tesztelje EDDGrid FromEDDTable alaposan** annak biztosítása érdekében, hogy a pontossági értékek elkerüljék ezeket a potenciális problémákat.
        
#### gapThreshold{#gapthreshold} 
*    [gapThreshold](#gapthreshold) - Ez egy nagyon szokatlan adatkészlet. Mivel a lekérdezések típusai, amelyeket meg lehet tenni (kezeli) egy EDDGrid adatkészlet (a tartományokhoz és a merényletekhez kapcsolódóan axisVariable s) nagyon különböznek attól a típusú kérdésektől, amelyeket meg lehet tenni (kezeli) EDDTable adatkészlet (csak néhány változó tartományához kapcsolódik) , a teljesítmény EDDGrid Az FromEDDTable adatkészletek nagymértékben változnak attól függően, hogy milyen pontos kérésre kerül sor, és az alapul szolgáló EDDTable adatkészlet sebessége. Olyan kérelmek esetében, amelyeknek szilárd értéke van &gt; 1, EDDGrid FromEDDTable kérheti a mögöttes EDDTable egy viszonylag nagy mennyiségű adat (ha sztride=1) Ezután az eredményeken keresztül, bizonyos sorokból tartva az adatokat, és eldobva az adatokat másoktól. Ha sok adatot kell átszűrnie, hogy megkapja a szükséges adatokat, a kérés hosszabb időt vesz igénybe.
    
Ha EDDGrid FromEDDTable elmondhatja, hogy nagy hiányosságok lesznek (nem kívánt adatok sorával) a kívánt adatokkal rendelkező sorok között, EDDGrid FromEDDTable úgy dönthet, hogy több albekezdést tesz az alapjául szolgáló EDDTable-nek, ahelyett, hogy egy nagy kérés lenne, ezáltal kihagyva az adatok nem kívánt sorát a nagy szakadékokban. A döntés érzékenységét a gapThreshold érték irányítja, amint azt a&lt;gapThreshold&gt; címke (default=1000 sor forrásadatok) ... A gapThreshold beállítása egy kisebb számhoz vezet az adatkészletkészítéshez (általában általában) további alkérdések. A gapThreshold beállítása egy nagyobb számhoz vezet az adatkészletkészítéshez (általában általában) Kevésbé kérelmek.
    
Ha a gapThreshold túl kicsi, EDDGrid Az FromEDDTable lassabban működik, mert a többszörös kérések túlnyomó része nagyobb lesz, mint az által, hogy túlzott adatokat kapjon. Ha a gapThreshold túl nagy, EDDGrid Az FromEDDTable lassan működni fog, mert az EDDTable-ből annyi túlzott adat kerül visszakerülésre, csak el kell távolítani. (Ahogy a Goldilocks felfedezte, a közép "csak helyes".) A különböző típusú EDDTable adatkészletek túlnyomórésze nagyban változik, így az egyetlen módja annak, hogy megismerje az adatkészlet tényleges legjobb beállítását kísérletezéssel. De nem fog túl rosszul ragaszkodni az alapértelmezéshez.
    
Egy egyszerű példa: Képzelj el egyet EDDGrid Table csak egy axisVariable   (idő, mérete 100000) Egy dataVariable   (hőmérséklet) , és az alapértelmezett gapThreshold 1000.
    
    * Ha egy felhasználó hőmérsékletet kér \\[ 0&#58;100&#58;5000 \\] A sztride 100, így a szakadék mérete 99, ami kevesebb, mint a gapThreshold. Szóval EDDGrid Az FromTable csak egy kérést tesz lehetővé az EDDTable számára a kérelemhez szükséges összes adatért (a hőmérséklet \\[ 0:5000 \\] ) és dobja el az összes adatsort, amire nincs szüksége.
    * Ha egy felhasználó hőmérsékletet kér \\[ 0:2500:5000 \\] Ez a sztride 2500, így a szakadék mérete 2499, ami nagyobb, mint a gapThreshold. Szóval EDDGrid A táblázat külön kéréseket tesz az EDDTable-hez, amelyek megfelelnek a hőmérsékletnek \\[ 0 0 \\] , hőmérséklet \\[ 2500 \\] , hőmérséklet \\[ 5000 \\] ...
    
A szakadék méretének kiszámítása bonyolultabb, ha több tengely van.
    
Minden felhasználó kérésére, EDDGrid FromEDDTable nyomtatás diagnosztikai üzenetek ezzel kapcsolatban ebben a [Log.txt](/docs/server-admin/additional-information#log) fájl.
    
    * [[Ha]]&lt;logLevel&gt;] (#loglevel) benne datasets.xml Info-ra van beállítva, ez olyan üzenetet nyomtat, mint
\\* nOuterAxes=1 4 nOuterRequests=22
Ha az nOuterAxes=0, a gapThresholdat nem haladták meg, és csak egy kérést fognak tenni az EDDTable-hez.
Ha a nOuterAxes&gt;0, a gapThresholdat túllépték, és a nOuterRequests az EDDTable-hez kerül, amely megfelel a baloldali nOuterAxes minden kért kombinációjának. Például, ha az adatkészlet 4 axisVariable és dataVariable mint kelet \\[ Idő \\]  \\[ magasság \\]  \\[ hosszúság \\]  \\[ mélység \\] A baloldal (először) A tengely változó az idő.
    * Ha&lt;LogLevel&gt; benne datasets.xml be van állítva, további információkat írnak a log.txt fájlra.
         
####  EDDGrid FromEDDTable csontváz XML{#eddgridfromeddtable-skeleton-xml} 
 >&nbsp;&lt;dataset type="EDDGridFromEDDTable" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromEDDTable, this only works if the underlying EDDTable  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;supports updateEveryNMillis. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;gapThreshold>](#gapthreshold)...&lt;/gapThreshold> &lt;!-- 0 or 1. The default is 1000. >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The underlying source EDDTable dataset. -->  
 >&nbsp;&lt;/dataset>  

### ED*A ERDDAP  {#eddfromerddap} 
 ** EDDGrid FromErdap** rajtolt adatok kezelése egy távolból ERDDAP™ szerver.
 **EDDTableFromErddap** kezeli a mesés adatokat távolról ERDDAP™ szerver.

*    EDDGrid FromErddap és EDDTableFromErddap másképp viselkednek az összes többi adatkészletből ERDDAP ...
    * Mint más típusú adatkészletek, ezek az adatkészletek információkat kapnak a forrásból származó adatkészletről, és emlékezetben tartják.
    * Mint más típusú adatkészletek, amikor ERDDAP™ adatkészletek keresése, megjeleníti az adathozzáférési formanyomtatványt ( * datasetID * .html) vagy megjeleníti a Make A Graph forma ( * datasetID * .gráf) , ERDDAP™ a memóriában található adatkészlettel kapcsolatos információkat használja.
    *    EDDGrid FromErddap és EDDTable FromErddap az alapja [hálók/klaszterek/szövetségek](/docs/server-admin/scaling) a ERDDAP s, amely hatékonyan terjeszti a CPU használatát (többnyire térképek készítéséhez) memóriafelhasználás, adatkészlet-tárolás és sávszélesség egy nagy adatközpont használatával.
#### Átirányítás{#redirect} 
* Más típusú adatkészletekkel ellentétben, amikor ERDDAP™ kérelmet kap ezekből az adatokból vagy képekből, ERDDAP   [átirányítás](https://en.wikipedia.org/wiki/URL_redirection) a távoli kérelem ERDDAP™ szerver. Az eredmény:
    * Ez nagyon hatékony (CPU, memória és sávszélesség) mert egyébként
        1. A kompozit ERDDAP™ meg kell küldeni a kérést a másiknak ERDDAP™   (amely időt vesz igénybe) ...
        2. A másik ERDDAP™ meg kell szereznie az adatokat, meg kell reformálnia, és továbbítja az adatokat az összetettnek ERDDAP ...
        3. A kompozit ERDDAP™ meg kell kapni az adatokat (sávszélesség) megreformálja (CPU és memória használata) és továbbítja az adatokat a felhasználónak (sávszélesség) ... A kérelem átirányításával és a másik engedélyezésével ERDDAP™ a válasz közvetlenül a felhasználóra, az összetett ERDDAP™ lényegében nincs CPU idő, memória vagy sávszélesség a kérésre.
    * Az átirányítás átlátható a felhasználó számára az ügyfélszoftvertől függetlenül (böngésző vagy más szoftver vagy parancssor eszköz) ...
*    [Elmondhatja ERDDAP™ ](#redirect) nem átirányítani minden felhasználói kérelmet a beállítással&lt;Átirányítás&gt;hamis&lt;/redirect&gt;, de ez negates a legtöbb előnye a ...FromErddap adatkészlet típus (nevezetesen, szétszórva a terhelést a front végén ERDDAP™ a távoli / backend ERDDAP ) ...
         
     
#### Előfizetések{#subscriptions} 
Normális esetben, ha egy EDDGrid FromErddap és EDDTable FromErddap (Újra) Töltsd be magad ERDDAP Próbálnak feliratot adni a távoli adatkészlethez távolról ERDDAP e-mail/URL előfizetési rendszer. Így, amikor a távoli adatkészlet megváltozik, a távoli ERDDAP™ Kapcsolatok a [setDataset Flag URL](/docs/server-admin/additional-information#set-dataset-flag) a te ERDDAP™ Annak érdekében, hogy a helyi adatkészlet újratöltse az ASAP-ot, és hogy a helyi adatkészlet mindig tökéletesen naprakész legyen, és bevándorolja a távoli adatkészletet. Tehát, az első alkalommal, amikor ez megtörténik, kap egy e-mailt, amely arra kéri, hogy érvényesítse az előfizetést. Ha azonban a helyi ERDDAP™ nem küldhet e-mailt, vagy ha a távoli ERDDAP "Az e-mail / URL előfizetési rendszer nem aktív, el kell küldenie a távoli ERDDAP™ adminisztrátor és kéri, hogy a s/he manuálisan adja hozzá [[szerkesztés]]]&lt;onChange&gt;] (#onchange) ...&lt;/onChange&gt; címkék az összes releváns adatkészlethez, hogy felhívja az adatkészletét [setDataset Flag URL-ek](/docs/server-admin/additional-information#set-dataset-flag) ... Lásd: ERDDAP™ napi jelentés a setDataset listájáról zászló URL-ek, de csak küldje el a EDDGrid FromErddap és EDDTableFromErddap adatkészletek a távoli ERDDAP™ adminisztrátor.
    
Ez nem működik? A helyi adatkészletek nem maradnak szinkronban a távoli adatkészletekkel?
Számos dolognak helyesen kell működnie ehhez a rendszerhez ahhoz, hogy az adatkészletek naprakészek maradjanak. Ellenőrizze ezeket a dolgokat rendben:
    
    1. A ERDDAP™ Képesnek kell lennie e-maileket küldeni. Lásd az e-mail beállításokat a setup.xml-ben.
    2. Általában (de nem mindig) A te ERDDAP A&lt;alapUrl&gt; és&lt;baseHttpsUrl&gt; nem rendelkezik portszámmal (pl.:8080, :8443) ... Ha igen, használjon egy [Proxypass](/docs/server-admin/deploy-install#proxypass) távolítsa el a kikötőt az Urltól.
    3. A beállításban.xml,&lt;Az SubscribeToRemoteErddapDataset&gt;-t igaznak kell alávetni.
    4. Amikor a helyi EDD... FromErddap adatkészlet újratöltése, meg kell küldeni a kérést a távoli ERDDAP™ feliratkozni a távoli adatkészletre. Nézze meg a log.txtot, hogy megnézze, ez megtörténik-e.
    5. Kell kapni egy e-mail kéri, hogy érvényesítse az előfizetési kérést.
    6. Kattintson az e-mailben lévő linkre az előfizetési kérelem érvényesítéséhez.
    7. A távoli ERDDAP™ Azt kell mondani, hogy az érvényesítés sikeres volt. Bármikor kérhet egy e-mailt a távolitól ERDDAP™ a függő és érvényes előfizetések listájával. Lásd a formát *Távol-ErddapBase Url* /erddap/subscriptions/list.html .
    8. Amikor a távoli adatkészlet megváltozik (pl. további adatokat kap) A távoli ERDDAP™ Próbáljon meg kapcsolatba lépni a flagURL-rel az Önén ERDDAP ... Nem ellenőrizheti ezt, de megkérdezheti a távoli adminisztrátort ERDDAP™ ellenőrizni ezt.
    9. A ERDDAP™ kérelmet kell kapnia annak megállapítására, hogy a flagURL. Nézze meg a log.txtot a "setDatasetFlag.txt?" kérésre (s) és nézze meg, hogy van-e hibaüzenet a kérelmekkel kapcsolatban.
    10. A ERDDAP™ meg kell próbálni újratölteni ezt az adatkészletet (talán nem azonnal, de ASAP) ...
         
#### up-to-date max (Idő) ?{#up-to-date-maxtime} 
 EDDGrid /TableFromErddap adatkészletek csak megváltoztatja a tárolt információkat minden forrás adatkészlet, ha a forrás adatkészlet ["Reload"](#reloadeverynminutes) és néhány metaadat megváltozik (pl. az idő változója actual\\_range ) Ezáltal előfizetési értesítést generál. Ha a forrásadatlap olyan adatokkal rendelkezik, amelyek gyakran változnak (például minden második új adat) és használja a ["frissítés"](#updateeverynmillis) rendszer, hogy észrevegyük a gyakori változásokat az alapul szolgáló adatok, EDDGrid /TableFromErddap nem értesíti ezeket a gyakori változásokat, amíg a következő adatkészlet "reload", így a EDDGrid /TableFromErddap nem lesz tökéletesen naprakész. Ezt a problémát minimalizálhatja a forrásadatlap megváltoztatásával&lt;ReloadEveryNMinutes&gt; egy kisebb értékhez (60? 15?) hogy több előfizetési értesítést kapjon, hogy elmondja a EDDGrid /TableFromErddap, hogy frissítse az információt a forrás adatkészlet.

Vagy ha az adatkezelő rendszere tudja, hogy a forrásadatbázisnak új adatai vannak (pl. egy olyan forgatókönyven keresztül, amely másol egy adatfájl helyére) És ha ez nem szuper gyakori (pl. minden 5 percben, vagy kevésbé gyakori) Van egy jobb megoldás:

1. Ne használja&lt;frissítésEveryNMillis&gt; a forrásadat naprakész tárolására.
2. Állítsa be a forrásadatkészletet&lt;ReloadEveryNMinutes&gt; egy nagyobb számba (1440?) ...
3. Vedd fel a forgatókönyvet a forrásadatkészlettel [zászló URL](/docs/server-admin/additional-information#set-dataset-flag) közvetlenül, miután másol egy új adatfájl helyére.
     

Ez vezet a forrásadathoz, hogy tökéletesen naprakész legyen, és azt eredményezi, hogy előfizetési értesítést generáljon, amelyet elküldnek EDDGrid /TableFromErddap adatkészlet. Ez vezetni fog EDDGrid /TableFromErddap adatkészlet, hogy tökéletesen naprakész (jól, 5 másodpercen belül az új adatok hozzáadása) ... És mindez hatékonyan fog történni (felesleges adatkészlet-reloads nélkül) ...
     
#### Nem addAttributes , axisVariable vagy dataVariable  {#no-addattributes-axisvariable-or-datavariable} 
Ellentétben más típusú adatkészletek, EDDTableFromErddap és EDDGrid FromErddap adatkészletek nem teszik lehetővé a globális&lt;addAttributes&gt;,&lt; axisVariable Gt; vagy&lt; dataVariable Gt; szakaszok a datasets.xml az adatkészlethez. A probléma az, hogy lehetővé tegyék, hogy ezek ellentmondásokhoz vezetjenek:
    
1. Tegyük fel, hogy megengedett, és hozzáadott egy új globális tulajdonságot.
2. Amikor egy felhasználó kéri ERDDAP™ a globális tulajdonságok tekintetében az új tulajdonság megjelenik.
3. De amikor egy felhasználó kéri ERDDAP™ egy adatfájl, az Ön ERDDAP™ átirányítja a forrás iránti kérelmet ERDDAP ... Az ERDDAP™ nem ismeri az új tulajdonságot. Tehát, ha létrehoz egy adatfájlot metaadatokkal, pl. egy .nc fájl, a metaadatnak nem lesz új tulajdonsága.

Két munkakörnyezet van:

1. Konvince a forrás adminja ERDDAP™ a metaadatára vonatkozó változásokat.
2. Az EDDTableFromErddap helyett használja [EDDTableFromDapSequence](#eddtablefromdapsequence) ... Vagy helyette EDDGrid FromErddap, használat [ EDDGrid dalszöveg](#eddgridfromdap) ... Ezek az EDD típusok lehetővé teszik, hogy hatékonyan kapcsolódjon egy adatkészlethez egy távolról ERDDAP™   (de adatkérések átirányítása nélkül) és lehetővé teszik, hogy globális&lt;addAttributes&gt;,&lt; axisVariable Gt; vagy&lt; dataVariable Gt; szakaszok a datasets.xml ... Egy másik különbség: manuálisan kell feliratkoznia a távoli adatkészletre, hogy az adatkészlet az Ön számára ERDDAP™ értesülni fognak (keresztül [zászló URL](/docs/server-admin/additional-information#set-dataset-flag) ) amikor változások vannak a távoli adatkészletben. Így új adatkészletet hoz létre, ahelyett, hogy egy távoli adatkészlethez kapcsolódna.
         
#### Egyéb jegyzetek{#other-notes} 
* Biztonsági okokból, EDDGrid FromErddap és EDDTable FromErddap nem támogatja a [[szerkesztés]]]&lt;hozzáférhetőTo&gt; (#Ccessibleto) címke és nem használható távoli adatkészletekkel, amelyek bejelentkezést igényelnek (mert használnak).&lt;hozzáférhetőTo&gt; (#Ccessibleto) ). Lásd ERDDAP A [biztonsági rendszer](/docs/server-admin/additional-information#security) bizonyos adatkészletekhez való hozzáférés korlátozása bizonyos felhasználók számára.
     
* Kezdőlap ERDDAP™ v2.10, EDDGrid FromErddap és EDDTableFromErddap támogatja a [[szerkesztés]]&lt;hozzáférhetőViaFiles&gt;] (#Ccessibleviafiles) Tag. Ellentétben más típusú adatkészletek, az alapértelmezett igaz, de az adatkészlet fájlok lesz hozzáférhetőViaFiles csak akkor, ha a forrás adatkészlet is rendelkezik&lt;hozzáférhetőViaFiles&gt; az igazhoz.
     
* Használhatja a [GenerateDatasets Xml program](#generatedatasetsxml) Hogy a datasets.xml cunk az ilyen típusú adatkészlethez. De ezeket a típusú adatkészleteket könnyen kézzel teheti meg.
     
####  EDDGrid FromErddap csontváz XML{#eddgridfromerddap-skeleton-xml} 
*    EDDGrid FromErddap csontváz Az XML adathalmaz nagyon egyszerű, mert a szándék csak a távoli adathalmazt jelenti, amely már alkalmas a használatra. ERDDAP :
 >&nbsp;&nbsp;&lt;dataset type="EDDGridFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)...&lt;/accessibleViaFiles> &lt;!-- 0 or 1, default=true. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromErddap, this gets the remote .dds and then gets  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the new leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
 >&nbsp;&nbsp;&lt;/dataset>  

#### EDDTableFromErddap csontváz XML{#eddtablefromerddap-skeleton-xml} 
* A Skeleton XML egy EDDTableFromErddap adatkészlethez nagyon egyszerű, mert a szándék csak a távoli adatkészletet jelenti, amely már alkalmas a használatra. ERDDAP :
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid FromEtopo{#eddgridfrometopo} 
 [ ** EDDGrid FromEtopo** ](#eddgridfrometopo) Csak szolgálja a [ETOPO1 Global 1-Minute Gridded Elevation Adatkészlet](https://www.ngdc.noaa.gov/mgg/global/global.html)   (Ice Surface, grid regisztrált, bináris, 2byte int: etopo1\\_ice\\_g\\_i2 .zip ) amely szét van osztva ERDDAP ...

* Csak kettő datasetID támogatást nyújtanak EDDGrid FromEtopo, így hozzáférhet az adatokhoz a hosszúsági értékek -180-180, vagy a hosszúsági értékek 0-360.
* Soha nincsenek alcímek, mivel az adatok már leírtak ERDDAP ...
* Tehát a két lehetőség a EDDGrid FromEtopo adatkészletek (szó szerint) :
```
      <!-- etopo180 serves the data from longitude -180 to 180 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo180" /> 
      <!-- etopo360 serves the data from longitude 0 to 360 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo360" /> 
```

###  EDDGrid Fájlok{#eddgridfromfiles} 
 [ ** EDDGrid Fájlok** ](#eddgridfromfiles) az összes szuperosztály EDDGrid A... Files osztályok. Nem használhatod EDDGrid FromFiles közvetlenül. Ehelyett használjon egy alosztályt EDDGrid FromFiles kezelni az adott fájltípust:

*    [ EDDGrid FromMergeIRFiles](#eddgridfrommergeirfiles) kezeli az adatokat a hálózatból [MergeIR .gz ](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README) fájlok.
*    [ EDDGrid FromAudioFiles](#eddfromaudiofiles) összesíti az adatokat egy csoport helyi audio fájlokat.
*    [ EDDGrid FromNcFiles](#eddgridfromncfiles) kezeli az adatokat a hálózatból [GRIB .grb](https://en.wikipedia.org/wiki/GRIB) fájlok, [ HDF   (v4 vagy v5)   .hdf ](https://www.hdfgroup.org/) fájlok, [ .nc ml ml](#ncml-files) fájlok és [ NetCDF   (v3 vagy v4)   .nc ](https://www.unidata.ucar.edu/software/netcdf/) fájlok. Ez működhet más fájltípusokkal (Például a BUFR) Mi csak nem teszteltük - kérjük, küldjön nekünk néhány minta fájlokat, ha érdekel.
*    [ EDDGrid FromNcFilesUnpack](#eddgridfromncfilesunpacked) egy változata EDDGrid FromNcFiles, amely kezeli az adatokat a rácsos NetCDF   (v3 vagy v4)   .nc és kapcsolódó fájlok, amelyek ERDDAP™ alacsony szintű csomagok.

Jelenleg nem támogatnak más fájltípusokat. De általában viszonylag könnyű támogatni más fájltípusokat. Lépjen kapcsolatba velünk, ha van kérése. Vagy, ha az adatai egy régi fájlformátumban vannak, amelyet el akarsz költözni, javasoljuk, hogy a fájlok átalakítása legyen NetCDF v3 .nc fájlok. NetCDF széles körben támogatott, bináris formátum, lehetővé teszi a gyors véletlenszerű hozzáférést az adatokhoz, és már támogatott ERDDAP ...

#### Files részletekből{#from-files-details} 
A következő információ az összes alosztályra vonatkozik EDDGrid FromFiles.

##### Egy létező dimenzió aggregációja{#aggregation-of-an-existing-dimension} 
Minden variáció EDDGrid FromFiles összesítheti az adatokat a helyi fájlokból, ahol minden fájl 1 (vagy többet) különböző értékek a baloldal számára (először) dimenzió, általában \\[ Idő \\] , amely összesítve lesz. Például a dimenziók lehetnek \\[ Idő \\]  \\[ magasság \\]  \\[ magasság \\]  \\[ hosszúság \\] , és a fájlok lehetnek az adatok egy (vagy néhány) Időérték (s) egy fájl. Az ebből eredő adatkészlet úgy tűnik, mintha az összes fájl adatát kombinálták volna. Az aggregáció nagy előnyei:

* Az összesített adatkészlet mérete sokkal nagyobb lehet, mint egy fájl kényelmesen (2GB) ...
* A közeli valós idejű adatokhoz könnyű új fájlt hozzáadni a legfrissebb adatcsomaggal. Nem kell újraírnia az egész adatkészletet.

Az aggregáció követelményei:
* A helyi fájloknak nem kell azonosak dataVariable s (az adatkészletben meghatározottak szerint datasets.xml ) ... Az adatkészletnek lesz dataVariable definiált datasets.xml ... Ha egy adott fájlnak nincs egy adott dataVariable , ERDDAP™ szükség szerint hozzáadja a hiányzó értékeket.
* Minden dataVariable MUST ugyanazt használja axisVariable s/dimenziók (az adatkészletben meghatározottak szerint datasets.xml ) ... A fájlokat az első alapján összesítik (baloldali) dimenzió, rendezve felemelkedő sorrendben.
* Minden fájl MAY van adatok egy vagy több értéke az első dimenzió, de nem lehet átfedés között fájlokat. Ha egy fájlnak több mint egy értéke van az első dimenzióban, a MUST értékeket felemelkedő sorrendben kell rendezni, kötelék nélkül.
* Minden fájl MUST pontosan ugyanazokat az értékeket az összes többi dimenzióban. A vizsgálat pontosságát a tesztelés határozza meg [AxisNDigits](#matchaxisndigits) ...
* Minden fájl MUST pontosan ugyanaz [egység](#units) Metaadata mindennek axisVariable és dataVariable S. Ha ez egy probléma, akkor használható lehet [NcML](#ncml-files) vagy [ NCO ](#netcdf-operators-nco) a probléma megoldására.
         
##### Aggregáció File Names vagy Global Metadata{#aggregation-via-file-names-or-global-metadata} 
Minden variáció EDDGrid Az FromFiles is összesítheti a fájlok egy csoportját azáltal, hogy új baloldalt ad hozzá (először) dimenzió, általában idő, az egyes fájlnévből származó érték alapján, vagy az egyes fájlokban található globális tulajdonság értékétől függően. Például a fájlnév magában foglalhatja az adatok időértékét a fájlban. ERDDAP™ akkor hozzon létre egy új idő dimenziót.

Ellentétben a hasonló jellemző a THREDDS, ERDDAP™ mindig teremt axisVariable numerikus értékekkel (a CF által előírt) Soha nem erős értékek (amelyet nem engedélyeznek a CF) ... Szintén ERDDAP™ rendezi a fájlokat a számon alapuló összességében axisVariable az egyes fájlokhoz rendelt érték, hogy a tengely változója mindig a CF által előírt értékeket rendezze. A THREDS megközelítése, hogy egy lexikográfiai fajta, amely a fájlnéveken alapul, aggregációkhoz vezet, ahol a tengelyértékek nem rendeződnek (amelyet nem engedélyeznek a CF) ha a fájl nevek másképp rendeződnek, mint amilyennek a származott axisVariable értékek.

Az egyik ilyen aggregáció létrehozása ERDDAP™ Új baloldalt fogsz meghatározni (először)   [ axisVariable ](#axisvariable) különleges, pseudo&lt; sourceName &gt;, amely azt mondja ERDDAP™ hol és hogyan találjuk meg az új dimenzió értéket minden fájlból.

* A Pseudo formátuma sourceName amely megkapja az értéket egy fájlnévből (Just filename.ext) az
    \\*\\*\" *fájlName,*  [adatok típus](#data-types)  *,* KivonatRegex *,* ElfogadásGroupNumber*
* A Pseudo formátuma sourceName amely megkapja az értéket egy fájl abszolút útnevéről
    \\*\\*\" *PathName,*  [adatok típus](#data-types)  *,* KivonatRegex *,* ElfogadásGroupNumber*
     \\[ Ehhez az út neve mindig használja '/' mint a rendezői szeparátor karakter, soha nem ''. \\] 
* A Pseudo formátuma sourceName amely az értéket globális tulajdonságból szerezi,
    \\*\\*\" *globális:* tulajdonság név *,*  [adatok típus](#data-types)  *,* KivonatRegex *,* ElfogadásGroupNumber*
* Ez a pseudo sourceName másképp működik a többiektől: ahelyett, hogy új baloldalt hoznánk létre (először)   axisVariable Ez helyettesíti a jelenlegi értékét axisVariable a fájlnévből kivont értékkel (Just filename.ext) ... A formátum az
    \\*\\*\" *helyettesítő FromFileName,*  [adatok típus](#data-types)  *,* KivonatRegex *,* ElfogadásGroupNumber*
     

A megadott alkatrészek leírása:

*    *tulajdonság név* - a globális tulajdonság neve, amely minden fájlban van, és amely tartalmazza a dimenzió értéket.
*    *adatok típus* - Ez meghatározza azokat az adattípusokat, amelyeket az értékek tárolására használnak. Lásd a standard listát [adatok típusok](#data-types) az ERDDAP™ támogatás, kivéve, hogy a String nem engedélyezett itt a tengelyváltoztatások óta ERDDAP™ Nem lehet String változók.
    
Van egy további pseudo adattípus, időFormat= *Szilárd TimeFormat* Amit mond ERDDAP™ az érték egy sztring időStamp [A szigorú időkre alkalmas egységek](#string-time-units) ... A legtöbb esetben a stringTimeFormat lesz egy variáció az egyik ilyen formátumban:
    
    *    yyyy-MM-dd T'HH:mm:ss.SSSZ - amely ISO 8601:2004 (EZ) dátumidő formátum. Szüksége lehet egy rövidített verzióra, például, yyyy-MM-dd T'HH:mm:ss vagy yyyy-MM-dd ...
    * yyyMddHHmmss.SSS - amely az ISO 8601 dátumidő formátumának kompakt verziója. Lehet, hogy szüksége van egy rövidített változata ennek, például yyyMMddHmmss vagy yyyMMMdd.
    * M/d/yyyy H:mm:ss.SSS - ami az amerikai slash dátumformátum. Szükség lehet egy rövidített változata ennek, pl. M/d/yyyy.
    * yyyDDHHmmssSSS - ez az év, plusz az év nulla beadott napja (pl, 001 = Jan 1, 365 = Dec 31 egy nem-levő évben; ez néha tévesen nevezik Julian dátum) ... Szüksége lehet egy rövidített változata ennek, például yyyyDD.
    
Ha ezt a pseudo adattípust használja, add hozzá ezt az új változóhoz&lt; addAttributes &gt;:
```
        <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Ha el akarja cserélni az összes időértéket, változtassa az időértéket az egységekben, pl.
1970-01-01T12:00Z.
*    *KivonatRegex* - Ez az [rendszeres kifejezés](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) amely magában foglalja a rögzítő csoportot (parentheses) amely leírja, hogyan lehet kivonni az értéket a fájlnévből vagy a globális tulajdonságértékből. Például egy fájlnév, mint S19980011998031.L3b\\_MO\\_CHL .nc , rögzítő csoport #1, "\\ \\dtutorial „A rendszeres kifejezésben S (\" \\dtutorial ) \" \\dtutorial \\.L3b.\\* az első 7 számjegyet a „S” után fogja megragadni: 1998001.
*    *ElfogadásGroupNumber* - Ez a rögzítő csoport száma (egy pár parentheses) a rendszeres kifejezésben, amely tartalmazza az érdeklődésre vonatkozó információkat. Általában 1, az első rögzítő csoport. Néha a rögzítő csoportokat más célokra kell használnia a regexben, így a fontos rögzítő csoportszám 2 lesz (a második rögzítő csoport) vagy 3 (a harmadik) stb.

Teljes példa egy axisVariable amely összesített adatkészletet hoz létre egy új idős tengelyrel, amely az egyes fájlok fájlnévből származó időértékeket kapja
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
      </axisVariable>
```
Amikor a "timeFormat=" pseudo adatait használja típus, ERDDAP™ 2 tulajdonságot ad hozzá axisVariable úgy tűnik, hogy a forrásból jönnek:
```
    <att name="standard\\_name">time</att>  
    <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Tehát ebben az esetben, ERDDAP™ létrehoz egy új tengelyt, amelyet megneveztek "time" kettős értékekkel (másodpercek 1970-01-01T00:00Z) a 7 számjegy kivonásával a "S" után és a ".L3m" előtt a fájlnévben, és értelmezve azokat, mint az yyyyDDD formátumú időértékeket.

Felírhatja az alapértelmezett bázisidőt (1970-01-01T00:00Z) hozzáadásával egy [addAttribute](#addattributes) amely különböző egységeket határoz meg, más alapidővel. Közös helyzet: vannak olyan adatfájlok, amelyek mindegyike egy 1 napos műholdas adatkészlettel rendelkezik, ahol azt szeretné, hogy az időértéke a fájlnévben említett nap déle legyen. (minden nap középpontjában) és szeretné a változót long\\_name "Centered Time" -nak lenni. Egy példa, ami ezt teszi:
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
        <addAttributes>
          <att name="long\\_name">Centered Time</att>
          <att name="units">seconds since 1970-01-01T12:00:00Z</att>
        </addAttributes>
      </axisVariable>
```
Megjegyzés órák=12 az alapidőben, amely hozzáad 12 órát az eredeti alapidő 1970-01-01T00:00Z.

Teljes példa egy axisVariable ami aggregált adatállományt egy új "run" tengely segítségével teszi (int értékekkel) amely a "runID" globális tulajdonságból származó futási értékeket kapja minden fájlban (olyan értékekkel, mint a "r17\\_global", ahol 17 a futó szám) az
```
      <axisVariable> 
        <sourceName>\\*\\*\\*global:runID,int,(r|s)(\\d+)\\_global,2</sourceName>
        <destinationName>run</destinationName>
        <addAttributes>
          <att name="ioos\\_category">Other</att>
          <att name="units">count</att>
        </addAttributes>
      </axisVariable>
```
Vegye figyelembe a 2. számú rögzítő csoport használatát, hogy rögzítse a "r" vagy "s" után bekövetkező számjegyeket, és mielőtt "\\_global". Ez a példa azt is mutatja, hogyan kell hozzáadni további tulajdonságokat (pl.: ioos\\_category és egység) a tengely változó.
     
#### Külsőleg elnyomott fájlok{#externally-compressed-files} 
* Adatkészletek, amelyek alkatrészei EDDGrid FromFiles és EDDTable Az FromFiles közvetlenül külsőleg tömörített adatfájlokból szolgálhat adatokat, köztük .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 és .Z fájlok.
     
*    **Ez meglepően jól működik&#33;**   
A legtöbb esetben a kis- és közepes méretű adatfájlokkal kapcsolatos lassulás kisebb. Ha lemezterületet kell őriznie, erősen bátorítjuk ezt a funkciót, különösen az idősebb fájlok esetében, amelyek ritkán érhetők el.
     
*    **Ments pénzt&#33;**   
Ez az egyik a kevés funkciókban ERDDAP™ ez lehetőséget kínál arra, hogy sok pénzt takarítson meg (bár a kissé csökkent teljesítmény költségénél) ... Ha a tömörítési arány pl. 6:1 (Néha sokkal magasabb lesz) Ezután az adatkészlet adatfájljai csak 1/6-ra lesznek szükségük a lemezterületre. Akkor lehet, hogy 1 RAID (egy adott méretből) 6 RAIDS helyett (azonos méretű) ... Ez egy hatalmas költségmegtakarítás. Remélhetőleg a képesség, hogy tömörítsen néhány fájlt egy gyűjteményben (Az idősebbek?) és ne tömöríts másokat (az újak?) , és ezt bármikor megváltoztatni, minimalizáljuk a hátrányt, hogy tömörítsünk néhány fájlt (lassabb hozzáférés) ... És ha a választás a fájlok tárolása a szalagon (és csak kérésre érhető el, késés után) vs tárolja őket egy RAID-on (és elérhető ERDDAP ) , akkor van egy hatalmas előnye, hogy használja a tömörítést, hogy a felhasználók interaktív és (viszonylag) gyors hozzáférés az adatokhoz. És ha ez megmentheti Önt egy további RAID vásárlásától, ez a funkció körülbelül 300 000 dollárt takaríthat meg.
     
* Minden EDDGrid FromFiles alosztályok, ha az adatfájlok egy kiterjesztés jelzi, hogy azok külsőleg tömörített fájlok (Jelenleg: .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 vagy .Z) , ERDDAP™ elnyomja a fájlokat az adatkészlet gyorsítótárának, amikor olvassa őket (ha már nem szerepelnek a cache-ban) ... Ugyanez igaz a bináris fájlra (pl.: .nc ) EDDTableFromFiles alosztályai.
     
* EDDTableFromFiles alosztályok nem bináris fájlok (pl.: .csv) , adatfájlok egy kiterjesztéssel jelezve, hogy külsőleg tömörített fájlokat fognak dekompresszálni, mivel a fájl olvasható.
     
* KÉRDÉS: Ha a külsőleg tömörített fájl típusa (pl.: .tgz vagy .zip ) több mint 1 fájlt támogat a tömörített fájlon belül, a tömörített fájlnak csak 1 fájlt kell tartalmaznia.
     
* KÉRDÉS: Ez a funkció feltételezi, hogy a külsőleg tömörített fájlok tartalma nem változik, hogy egy csésze depressziós fájl újrahasznosítható. Ha néhány vagy az összes adatkészlet adatfájlja néha megváltozik, ne tömörítse ezeket a fájlokat. Ez összhangban van a közös használattal, mivel az emberek általában nem tömörítik a fájlokat, amelyeket néha meg kell változtatniuk.
     
*   &lt;fájlNameRegex&gt; Hogy ez a munka, az adatkészlet&lt;fájlNameRegex&gt; meg kell felelnie a tömörített fájlok nevét. Nyilvánvalóan olyan regexek, mint .\\*Minden fájl nevet illeszt. Ha specifikus fájltípust ad meg, pl.\\*↑ .nc Ezután módosítania kell a regexet, hogy tartalmazza a tömörítés kiterjesztését is, pl. *↑ .nc ↑ .gz (ha az összes fájl lesz* valami* .nc  .gz fájlok)
     
* Jó, ha az adatkészlet tartalmaz egy kompressált és nem tömörített fájlok keverékét. Ez hasznos lehet, ha úgy gondolja, hogy egyes fájlok (pl. régebbi fájlok) Kevesebbet fognak használni, ezért hasznos lenne a lemezterület megmentése azáltal, hogy tömörítené őket. Hogy ez a munka, a&lt;fájlNameRegex&gt; meg kell felelnie a tömörített és nem tömörített fájlok nevét, például.\\*vagy .\\*↑ .nc  ( | ↑ .gz ) (ahol a rögzítő csoport ennek végén meghatározza, hogy .gz opcionális.
     
* Jó, ha tömöríti vagy dekompresszálja a gyűjteményben lévő konkrét fájlokat bármikor.
Ha az adatkészlet nem használja [&lt;frissítésEveryNMillis&gt; (#updateeverynmillis) Állítsa be az adatkészletet [zászló](/docs/server-admin/additional-information#flag) Mondd el ERDDAP™ az adatkészlet újratöltéséhez, és így észreveheti a változásokat. Érdekes módon különböző tömörítő algoritmusokat és beállításokat használhat a különböző fájlokhoz ugyanazon adatkészletben (pl.: .bz2 ritkán használt fájlok esetében, .gz nem gyakran használt fájlok, és nem tömörítés gyakran használt fájlok) , csak győződjön meg róla, hogy a regex támogatja az összes olyan fájl kiterjesztését, amelyek használatban vannak, például .\\* \\ .nc  ( | ↑ .gz  | ↑ .bz2 ) ...
     
* Természetesen a tömörítési arányok és sebességek a különböző tömörítési algoritmusok változnak a forrásfájl és a beállítások között (pl. kompressziós szint) ... Ha szeretné optimalizálni ezt a rendszert a fájlok számára, végezzen tesztet a különböző tömörítési módszerekről a fájlokkal, és számos tömörítési beállítással. Ha megbízhatóan jót akarsz (nem feltétlenül a legjobb) beállítás, kissé javasoljuk gzip   ( .gz ) ... gzip nem teszi a legkisebb tömörített fájlt (ésszerűen közel van) , de nagyon gyorsan tömöríti a fájlt és (fontosabb a fontosabb ERDDAP™ felhasználók) Nagyon gyorsan elnyomja a fájlt. Plusz, gzip szoftver jön szabványos minden Linux és Mac OS telepítés, és könnyen elérhető a Windows ingyenes eszközökkel, mint a 7Zip és a Linux kiegészítők, mint a Git Bash. Például, hogy tömörítsen egy forrásfájlt a .gz A fájl verziója (ugyanazon fájlnév, de .gz Megjelent) Használat (Linux, Mac OS és Git Bash)   
     gzip   * sourceName *   
Dekompresszálni egy .gz fájl vissza az eredeti, használat
gunzip * sourceName  .gz *   
A forrásfájlok mindegyikének tömörítése a könyvtárban és az aláírókban, ismételten, használat
     gzip -r *rendezőName*   
Dekompresszálni az egyeseket .gz fájlok a könyvtárban és az aláírók , ismételten, használat
gunzip -r *rendezőName*   
     
* WARNING: Ne tömörítse külsőleg ( gzip ) olyan fájlokat, amelyek már belsőleg tömörítettek&#33;
Számos fájl már belsőleg tömörítette az adatokat. Ha te vagy gzip Ezek a fájlok, a kapott fájlok nem lesznek sokkal kisebbek (&lt;5%) és ERDDAP™ pazarolja az időt, hogy depressziós őket, amikor el kell olvasni őket. Például:
    
    * adatfájlok: pl., .nc 4 és .hdf 5 fájl: Néhány fájl belső tömörítést használ; néhány nem. Hogyan lehet elmondani: a tömörített változók "\\_ChunkSize" tulajdonságokkal rendelkeznek. Továbbá, ha egy csoport rácsos .nc vagy .hdf A fájlok mind különböző méretűek, valószínűleg belsőleg tömörítettek. Ha ők mind ugyanazok a méretek, nem belsőleg tömörülnek.
    * képfájlok: pl., .gif, .jpg és .png
    * audio fájlok: pl., .mp3 és .ogg.
    * videofájlok: pl. .mp4, .ogv és .webm.
    
        
Egy szerencsétlen furcsa eset: .wav audio fájlok hatalmasak és nem belsőleg tömörítettek. Jó lenne tömöríteni ( gzip ) Ezek, de általában nem szabad, mert ha megteszi, a felhasználók nem tudják játszani a kompressált fájlokat a böngészőben.
     
* Test Case: tömörítés (vele gzip ) adatkészlet 1523 rácsos .nc fájlok.
    
    * A forrásfájlokban szereplő adatok sparse (sok hiányzó érték) ...
    * A teljes lemezterület 57 GB-ból indult, mielőtt a tömörítés 7 GB-ra kerülne.
    * Az 1 időpontból származó sok adat kérése&lt;1 s a tömörítés előtt és után.
    * 1 adatpont kérése 365 időponthoz (a legrosszabb helyzet) 4-ről 71-re ment.
         
    
Számomra ez minden adatkészlet ésszerű kikapcsolása, és minden bizonnyal olyan adatkészletek esetében, amelyeket gyakran használnak.
     
* Belső versus külső kompresszió -
Összehasonlítva a belső fájlkompresszió által kínált .nc 4 és .hdf 5 fájl, ERDDAP A külsőleg tömörített bináris fájlok megközelítése előnyökkel és hátrányokkal jár. A hátrány az, hogy egy alkalommal olvassa el egy kis részét egy fájl, belső tömörítés jobb, mert EDDGrid A Files csak néhány darabot kell dekompresszálni (s) a fájl, nem az egész fájl. De ERDDAP A megközelítésnek van néhány előnye:
    
    *    ERDDAP™ támogatja az összes adatfájl tömörítését (bináris és nem bináris, pl. .nc 3 és .csv) nem csak .nc 4 és .hdf 4. 4.
    * Ha egy fájl tömegét rövid idő alatt többször kell olvasni, akkor időt takarít meg a fájl lebontására egyszer, és sokszor olvassa el. Ez történik ERDDAP™ ha egy felhasználó használja a Make-A-Graph-ot az adatkészlethez, és egy sor apró változtatást tesz a grafikonra.
    * Az a képesség, hogy tömörített fájlokat, és nem tömörített fájlokat ugyanabban a gyűjteményben, lehetővé teszi, hogy több ellenőrzést, amelyen a fájlok tömörülnek, és amelyek nem. És ez a hozzáadott ellenőrzés nem igazán módosítja a forrásfájlot (mivel tömöríthet egy fájlt pl. .gz Ezután dekompresszálja, hogy megkapja az eredeti fájlt) ...
    * Az a képesség, hogy bármikor megváltoztassa, hogy egy adott fájlt tömörítenek-e, és hogyan tömörítik (különböző algoritmusok és beállítások) nagyobb ellenőrzést biztosít a rendszer teljesítménye felett. És könnyedén visszaállíthatja az eredeti elnyomatlan fájlt bármikor.
    
Bár a megközelítés sem győztes minden helyzetben, egyértelmű, hogy ERDDAP "A külsőleg tömörített fájlokból származó adatok kiszolgálásának képessége a külső tömörítést ésszerű alternatívá teszi a belső kompresszióval .nc 4 és .hdf 5. 5. 5. Ez jelentős, mivel a belső tömörítés az egyik fő oka annak, hogy az emberek használják .nc 4 és .hdf 5. 5. 5.
     
##### Dekompresszált Cache{#decompressed-cache} 
 ERDDAP™ a tömörített bináris depressziós változata (pl.: .nc ) adatfájl, ha el kell olvasnia a fájlt. A depressziós fájlokat az adatkészlet könyvtárában tartják *bigParentDirectory[szerkesztés]* /dekompresszált/ A nemrégiben nem használt depressziós fájlokat törölni fogják, hogy felszabadítsák a helyet, amikor a kumulatív fájlméret &gt; 10 GB. Ezt megváltoztathatja a beállítással&lt;DekompressedCacheMaxGB&gt; (default=10) adatkészletekben Xml.xml, pl.
```
        <decompressedCacheMaxGB>40</decompressedCacheMaxGB>  
```
Továbbá, az elmúlt 15 percben nem használt depressziós fájlokat törölni fogják minden jelentős adatkészlet-visszatöltés kezdetén. Ezt megváltoztathatja a beállítással&lt;DekompressedCacheMaxMinutesOld&gt; (default=15) adatkészletekben Xml.xml, pl.
```
        <decompressedCacheMaxMinutesOld>60</decompressedCacheMaxMinutesOld>  
```
Nagyobb számok szépek, de a depressziós fájlok kumulatív mérete okozhat *bigParentDirectory[szerkesztés]* kifutni a lemezterületről, ami súlyos problémákat okoz.
     
* Mivel a fájl dekompresszálása jelentős időt vehet igénybe (0,1-10 másodpercig) A tömörített fájlokkal rendelkező adatkészletek előnyösek lehetnek az adatkészlet beállításában [&lt;nThreads&gt;] (#nthreads) egy magasabb szám beállítása (2? 3? 4?) ... Még magasabb számok hátrányai (pl. 5? 6? 7?) csökkenti a visszatéréseket, és az egyik felhasználó kérése a rendszer erőforrásainak nagy százalékát használhatja, így jelentősen lelassítja a többi felhasználó kérésének feldolgozását. Így nincs ideális nThreads beállítás, csak különböző következmények különböző helyzetekben különböző beállításokat.
         
#### Osztott dimenziós értékek{#sorted-dimension-values} 
Az értékek minden dimenzióban MUST lehet rendezett rendben (felemelkedő vagy leszármazott, kivéve az elsőt (baloldali) olyan dimenzió, amelyet fel kell emelkedni) ... Az értékek szabálytalanul helyreállhatnak. Nem lehetnek kapcsolatok. Ez a követelmény a [CF metaadat szabvány](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) ... Ha bármely dimenzió értéke nem rendezett rendben van, az adatkészlet nem lesz betöltve és ERDDAP™ azonosítja az első fel nem szorított értéket a logfájlban, *bigParentDirectory[szerkesztés]* /logs/log.txt .
    
A nem szorított dimenziós értékek szinte mindig problémát jelentenek a forrásadatokkal. Ez a leggyakrabban akkor fordul elő, amikor egy tévhit vagy nem megfelelő fájl szerepel a gyülekezetben, ami egy szorulatlan idő dimenzióhoz vezet. A probléma megoldásához lásd a hibaüzenetet ERDDAP™ log.txt fájl, hogy megtalálja a megsértő időértéket. Ezután nézze meg a forrásfájlokat, hogy megtalálja a megfelelő fájlt (vagy egy előtt vagy után) ez nem tartozik a gyülekezetbe.
    
#### Rendezők{#directories} 
A fájlok MAY lehet egy könyvtárban, vagy egy könyvtárban és az aláírók (ismétlődően) ... Ha nagyszámú fájl van (Például:&gt;1,000) , operációs rendszer (és így EDDGrid Fájlok) sokkal hatékonyabban fog működni, ha a fájlokat egy sor aláíróban tárolja (egy évente, vagy havonta egy adatkészletek nagyon gyakori fájlokkal) Annak érdekében, hogy soha ne legyen sok fájl egy adott könyvtárban.
     
#### &lt;cacheFromUrl&gt;{#cachefromurl} 
Minden EDDGrid FromFiles és az összes EDDTableFromFiles adatkészlet támogatja egy sor címkét, amelyek elmondják ERDDAP™ letölteni és fenntartani egy másolatot az összes távoli adatkészlet fájlok, vagy egy csésze néhány fájl (letöltve, amennyire szükséges) ... Ez hihetetlenül hasznos lehet. Lásd: [Húsvét FromUrl dokumentáció](#cachefromurl) ...
    
#### Távoli könyvtárak és HTTP Range kérések{#remote-directories-and-http-range-requests} 
 (AKA Byte Serving, Byte Range kéri, elfogadja a szabályokat http Fejlesztő)   
 EDDGrid FromNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles és EDDTableFromNcCFFiles, can can *Néha néha* szolgáltatott adatok .nc fájlok távoli szervereken és a HTTP-n keresztül elérhetők, ha a szerver támogatja [Byte Serving](https://en.wikipedia.org/wiki/Byte_serving) HTTP tartományi kérések (HTTP mechanizmus a byte szolgáló) ... Ez azért lehetséges, mert netcdf-java (melyik ERDDAP™ Használat az olvasáshoz .nc fájlok) támogatja az adatok távolról történő olvasását .nc fájlok HTTP tartomány kérések.

 **Ne csináld ezt&#33;** Ez szörnyen nem hatékony és lassú.
Ehelyett használja a [[szerkesztés]]]&lt;cacheFromUrl&gt; rendszer (#cachefromurl) ...

Hozzáférés ERDDAP™ adatkészletek, mint fájlok byte range kéréseken keresztül -
Flipping ezt körül, mert lehet (elmélet) Gondolj egy adatkészletre ERDDAP™ mint óriás .nc fájlt a "Csak" beállításával .nc "Az OPen bázisra DAP URL egy adott adatkészlethez (pl.:https://myserver.org/erddap/griddap/datasetID.ncés egy ?query hozzáadása után is, hogy megadja az aljzatot) Talán ésszerű megkérdezni, hogy használhatja-e a netcdf-java-t, Ferret vagy más NetCDF kliens szoftver az adatok olvasásához HTTP Range kérések ERDDAP ... A válasz nem, mert nincs igazán hatalmas " .nc "fájl. Ha ezt akarod csinálni, ehelyett tedd meg az egyik ilyen lehetőséget:

* Használat(OPeN)DAPügyfélszoftver, hogy csatlakozzon a griddap szolgáltatások által kínált ERDDAP ... Ez az, ami DAP   (és így ERDDAP ) tervezték. Nagyon hatékony.
* Vagy letöltse a forrás fájlt (s) a "files" rendszerrendszer (vagy subset fájl egy .nc ? Lekérdezés) a számítógépére, és netcdf-java-t használ, Ferret vagy más NetCDF ügyfél szoftver olvasni (most) helyi fájl (s) ...
         
#### Cached File Információ{#cached-file-information} 
Amikor egy EDDGrid FromFiles adatkészlet első betöltése, EDDGrid FromFiles az összes releváns fájlból olvas információt, és táblákat hoz létre (Egy sor minden fájlhoz) minden érvényes fájlról és minden "rossz" (különböző vagy érvénytelen) fájl.
* Az asztalokat is tárolják a lemezen, mint NetCDF v3 .nc fájlok *bigParentDirectory[szerkesztés]* /dataset/ *Last2CharsOfDatasetID* / * datasetID * / fájlok neve:
dirTable .nc   (amely az egyedi könyvtár nevek listáját tartalmazza) ,
fájl táblázat .nc   (amely az asztalt minden érvényes fájl információjával tartja) ,
rosszfiókok .nc   (amely az asztalt minden rossz fájl információjával tartja) ...
* A hozzáférés gyorsítása egy EDDGrid FromFiles adatkészlet (de több memóriát használva) Használhatja [&lt;fájlTableInMemory&gt; Igaz&lt;/fileTableInMemory&gt;] (#filetableinmemory) Mondd el ERDDAP™ tartsa a fájlinformációs táblák másolatát az emlékezetben.
* A lemezen található fájlinformációs táblák másolata akkor is hasznos, ha ERDDAP™ le van zárva és újraindítva: megment EDDGrid A Files-től, hogy újra kell olvasnia az összes adatfájlot.
* Amikor egy adatkészletet újratöltik, ERDDAP™ csak az adatokat kell olvasni az új fájlokban és fájlokban, amelyek megváltoztak.
* Ha egy fájlnak más szerkezete van a többi fájlból (Például egy másik adattípus az egyik változó számára, vagy egy másik érték a " [egység](#units) - tulajdonság) , ERDDAP hozzáadja a fájlt a "rossz" fájlok listájához. Információk a probléma a fájl lesz írva a *bigParentDirectory[szerkesztés]* /logs/log.txt fájl.
* Soha nem kell törölnie vagy dolgoznia ezeket a fájlokat. Az egyik kivétel: ha még mindig megváltoztatja az adatkészletet datasets.xml beállítás, lehet, hogy törölni ezeket a fájlokat kényszeríteni ERDDAP™ az összes fájl újraindítása, mivel a fájlokat másképp olvassák/értelmezik. Ha valaha is törli ezeket a fájlokat, akkor megteheti, ha ERDDAP™ fut. (Ezután állítsa be a [zászló](/docs/server-admin/additional-information#set-dataset-flag) az adatkészlet újratöltése ASAP.) Azonban, ERDDAP™ általában észreveszi, hogy a datasets.xml az információ nem egyezik a fájllal Asztalinformációk és a fájltáblák automatikusan törlése.
* Ha bátorítani akarsz ERDDAP™ a tárolt adatkészlet információjának frissítése (például, ha csak hozzáadott, eltávolított vagy módosított néhány fájlt az adatkészlet adattárához) Használja a [zászlórendszer](/docs/server-admin/additional-information#flag) Kényelem ERDDAP™ a csatolt fájlinformációk frissítése.
         
#### Kérések kezelése{#handling-requests} 
Amikor az ügyfél adatkérelme feldolgozásra kerül, EDDGrid A Files gyorsan megvizsgálhatja az asztalt az érvényes fájlinformációkkal, hogy megnézze, mely fájlok rendelkeznek a kért adatokkal.
     
#### A Cached File információ frissítése{#updating-the-cached-file-information} 
Amikor az adatkészletet újratöltik, a csésze fájlinformációkat frissítik.
    
* Az adatkészletet rendszeresen újratöltik, amint azt a&lt;reloadEveryNMinutes&gt; az adatkészlet információiban datasets.xml ...
* Az adatkészletet a lehető leghamarabb újratöltik, ha ERDDAP™ kimutatja, hogy hozzáadott, eltávolított, [touch'd](https://en.wikipedia.org/wiki/Touch_(Unix) ) (a fájl utolsó módosítása Módosított idő) vagy módosított egy adatszűrőt.
* Az adatkészlet a lehető leghamarabb újratöltődik, ha használja [zászlórendszer](/docs/server-admin/additional-information#flag) ...

Amikor az adatkészletet újratöltik, ERDDAP™ összehasonlítja a jelenleg rendelkezésre álló fájlokat a csatolt fájlinformációs táblákhoz. Új fájlokat olvasnak és hozzáadnak az érvényes fájlok táblázatához. Azok a fájlok, amelyek már nem léteznek, az érvényes fájlok táblájából származnak. Azok a fájlok, ahol a fájl-időmérő változott, olvashatók, és az információjuk frissül. Az új táblák felváltják a régi táblákat a memória és a lemezen.
     
#### Bad Files{#bad-files} 
A rossz fájlok táblázata és az okok, amelyeket a fájlok rossznak nyilvánították (korrupt fájl, a változók hiánya stb.) e-mailben van az e-mailben Minden E-mail cím (valószínűleg te) Minden alkalommal, amikor az adatkészletet újratöltik. A lehető leghamarabb fel kell cserélnie vagy javítania ezeket a fájlokat.
     
#### Elhagyni a változókat{#missing-variables} 
Ha néhány fájl nem rendelkezik néhányat dataVariable az adatkészletben meghatározott datasets.xml cunk, ez rendben van. Mikor EDDGrid FromFiles elolvassa az egyik ilyen fájlt, úgy fog működni, mintha a fájl volt a változó, de minden hiányzó értékek.
     
#### FTP hiba / tanács{#ftp-troubleadvice} 
Ha FTP új adatfájlokat készít ERDDAP™ szerver, ERDDAP™ fut, van esély arra, hogy ERDDAP™ az FTP folyamat során újratölti az adatkészletet. Gyakrabban fordul elő, mint gondolnád&#33; Ha ez megtörténik, a fájl úgy tűnik, hogy érvényes (érvényes neve) , de a fájl még nem érvényes. Ha ERDDAP™ megpróbálja elolvasni az adatokat ebből az érvénytelen fájlból, az ebből eredő hiba okozza a fájlt az érvénytelen fájlok táblázatához. Ez nem jó. A probléma elkerülése érdekében használjon ideiglenes fájlnévet, amikor az FTP a fájlt, például az ABC2005 .nc \\_TEMP . Ezután a fájlNameRegex teszt (lásd alább) jelzi, hogy ez nem releváns fájl. Miután az FTP folyamat befejeződött, nevezze át a fájlt a helyes névre. A megnevezési folyamat azt fogja okozni, hogy a fájl egy pillanat alatt releváns legyen.
     
#### "0 fájl" hibaüzenet{#0-files-error-message-1} 
Ha futsz [GenerateDatasetsXml](#generatedatasetsxml) vagy [DasDds](#dasdds) vagy ha megpróbálsz betölteni egy EDDGrid Files adatkészlet ERDDAP™ , és kap egy "0 fájl" hibaüzenetet, amely jelzi, hogy ERDDAP™ talált 0 megfelelő fájlokat a könyvtárban (ha úgy gondolja, hogy van egyező fájlok ebben a könyvtárban) :
    * Ellenőrizze, hogy a fájlok valóban ebben a könyvtárban vannak.
    * Ellenőrizze a könyvtár neve varázslatát.
    * Ellenőrizze a fájlNameRegex. Valójában nagyon könnyű hibákat hibáztatni a regexekkel. Tesztcélok esetén próbálja meg a regex .\\*-t, amely minden fájlnévhez illeszkedik. (Lásd ezt [regex dokumentáció](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) és [regex bemutató](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ...) 
    * Ellenőrizze, hogy a felhasználó, aki fut a program (pl. felhasználó=tomcat (?) Tomcat/ ERDDAP ) "olvassa" az engedélyt ezekre a fájlokra.
    * Egyes operációs rendszerekben (például SELinux) és a rendszerbeállításoktól függően a felhasználónak, aki futtatja a programot, „olvassa” a könyvtárak egész láncolatát, amely a fájlokat tartalmazó könyvtárhoz vezet.
         
####  EDDGrid FromFiles csontváz XML{#eddgridfromfiles-skeleton-xml} 
*    **A csontváz XML** mindenkinek EDDGrid FromFiles alosztályok:

>&nbsp;&nbsp;&lt;dataset type="EDDGridFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromFiles subclasses, this uses Java's WatchDirectory system   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file names, for example, ".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadata from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDD*AudioFiles{#eddfromaudiofiles} 
 ** EDDGrid FromAudioFiles** és **EDDTableFromAudioFiles** összesített adatok a helyi audiofájlok gyűjteményéből. (Ezek az első megjelentek ERDDAP™ v1.82.) A különbség az, hogy EDDGrid Az FromAudioFiles az adatokat többdimenziós adatkészletként kezeli (általában 2 dimenzióval: \\[ fájl indítása Idő \\] és \\[ elapadt Idő egy fájlon belül \\] ) , mivel az EDDTableFromAudioFiles az adatokat takaró adatokként kezeli (általában oszlopok a fájl indítása, az elapsedTime a fájl, és az adatok az audio csatornák) ... EDDGrid FromAudioFiles megköveteli, hogy minden fájl ugyanazon számú mintával rendelkezik, így ha ez nem igaz, akkor EDDTableFromAudioFiles-t kell használnia. Ellenkező esetben az EDD-típus használatának választása teljesen a választás. Az EDDTableFromAudioFiles egyik előnye: más változókat is hozzáadhat más információkkal, például stationID , állomásType. Mindkét esetben az egységes időváltozat hiánya nehezebbé teszi az ilyen EDD-típusok adataival való együttműködést, de nem volt jó módja annak, hogy egységes időváltozatot hozzon létre.

Lásd ezeket az osztályokat, [ EDDGrid Fájlok](#eddgridfromfiles) és [EDDTableFromFiles](#eddtablefromfiles) Általános információk arról, hogyan működik ez az osztály, és hogyan kell használni.

Erősen ajánljuk a használatát [GenerateDatasets Xml program](#generatedatasetsxml) egy durva tervezetet készíteni datasets.xml cunk ehhez az adatkészlethez. Mivel az audiofájlok nem rendelkeznek más metaadatokkal, mint a hangadatok kódolásával kapcsolatos információk, meg kell szerkeszteni a kimenetet a GenerateDatasets-től Xml, hogy alapvető információkat nyújtson (pl. cím, összefoglaló, creator\\_name , intézmény, történelem) ...

Részletek:

* Számos audio fájlformátum létezik. Jelenleg, ERDDAP™ olvashat adatokat a legtöbb .wav és .au fájlból. Jelenleg nem olvashat más típusú audio fájlokat, például .aiff vagy .mp3. Ha támogatásra van szüksége más audio fájlformátumok vagy más változatok .wav és .au, kérjük, küldje el a kérését Chris. John at noaa.gov. Vagy, mint egy munkakör, amit most használhat, átalakíthatja az audio fájlokat PCM\\_ SIGNED (Integrációs adatok) PCM\\_FLOAT (lebegő pont adatok) .wav fájlok, hogy ERDDAP™ dolgozhat velük.
* Jelenleg, ERDDAP™ elolvashatja az audio fájlokat azzal, amit Java "Az AudioFormat osztály PCM\\_FLOAT, PCM\\_SIGNED, PCM\\_UNSIGNED, ALAW és ULAW kódolásokat hív. ERDDAP™ átalakítja a PCM\\_UNSIGNED értékeket (pl. 0-255) aláírt értékek (pl.: 128-128) a bitek átrendezése az adatértékekben. ERDDAP™ átalakítja az ALAW és az ULAW kódolt az őshonos kódolt byte formátumból rövidre (Int16) értékek. óta Java bigEndian=igazi adatokat akar, ERDDAP™ átrendezi a bigEndian=false-vel tárolt adatok byteáit (kis endian) annak érdekében, hogy helyesen olvassa el az értékeket. Minden más kódoláshoz (PCM) , ERDDAP™ olvassa el az adatokat, mint az.
* Mikor ERDDAP™ elolvassa az adatokat az audio fájlokból, a fájl elérhető audio metaadatát globális tulajdonságokra konvertálja. Ez mindig tartalmazza (mintaértékekkel) 
    
Hangszóró audioBigEndian "hamis"; //igaz vagy hamis
Int audio Csatornák 1;
Hangsúlyozva a "PCM\\_SIGNED" -t;
Float audioFrameRate 96000.0; //per második
az audioFrameSize 2; //# adat bytes per frame
Float audioSampleRate 96000.0; //per második
int audioSampleSizeInBits 16; //# bits / csatorna / minta
    
Mert ERDDAP A cél, a keret szinonimája egy mintával, ami az adatok egy időben.
A tulajdonságok a ERDDAP™ lesz az információ, amely leírja az adatokat, mivel a forrásfájlokban volt. ERDDAP™ Gyakran megváltoztatta ezt az adatokat, például a PCM\\_UNSIGNED, az ALAW és az ULAW kódolt adatok átalakulnak a PCM\\_SIGNED-re, és a bigEndian=hamis adatok átalakulnak a bigEndian=true adatokra (Így van Java el akarja olvasni) ... A végén az adatértékek a ERDDAP™ mindig lesz az [PCM kódolva](https://en.wikipedia.org/wiki/Pulse-code_modulation) adatértékek (azaz a hanghullám egyszerű digitalizált mintái) ...
* Mikor ERDDAP™ elolvassa az adatokat az audio fájlokból, az egész fájlt olvassa el. ERDDAP™ csatornánként körülbelül 2 milliárd mintát olvashat. Például, ha a mintavételi ráta másodpercenként 44.100 minta, 2 milliárd minta lefordítható körülbelül 756 percnyi hangadattal. Ha több audió fájlja van, mint ez az adatmennyiség, meg kell szakítania a fájlokat kisebb darabokra, hogy ERDDAP™ olvassa el őket.
* Mert ERDDAP™ teljes audiofájlokat olvas, ERDDAP™ nagy mennyiségű memóriához kell hozzáférnie ahhoz, hogy nagy audiofájlokkal dolgozzon. Lásd [ ERDDAP memória beállítások](/docs/server-admin/deploy-install#memory) ... Ismét, ha ez egy probléma, egy munkakör, amelyet most használhat, az, hogy a fájlokat kisebb darabokra bontja, hogy ERDDAP™ kevesebb memóriával olvashatjuk őket.
* Egyes audiofájlokat helytelenül írtak. ERDDAP™ kis erőfeszítést tesz az ilyen esetek kezelésére. De általában, ha van egy hiba, ERDDAP™ dob egy kivételt (és elutasítja ezt a fájlt) vagy (ha a hiba észrevehetetlen) olvassa el az adatokat (de az adatok helytelenek lesznek) ...
*    ERDDAP™ nem ellenőrzi vagy megváltoztatja a hang mennyiségét. Ideális esetben az integrált audio adatok az adattípus teljes skáláját használják.
* Az Audio fájlok és az audio szereplők nem rendelkeznek rendszerrel a hiányzó értékekhez (pl. -999 vagy Float.NaN) ... Tehát az audio adatoknak nincs hiányzó értékük. Ha hiányzik az értékek (pl. ha meg kell hosszabbítani egy audio fájlt) Használjon egy 0-as sorozatot, amelyet tökéletes csendként értelmeznek.
* Mikor ERDDAP™ adatokat olvas az audio fájlokból, mindig létrehoz egy elapsed nevű oszlopot Idő minden mintához, másodpercekben (duplákként tárolva) , az első mintához képest (kitűzött Time=0.0 s) ... Ezzel EDDGrid FromAudioFiles, ez lesz az elapsedTime tengely változó.
*    EDDGrid FromAudioFiles előírja, hogy minden fájl ugyanazt a számú mintát. Tehát ha ez nem igaz, akkor EDDTableFromAudioFiles-t kell használnia.
* Mert EDDGrid FromAudioFiles, javasoljuk, hogy állítsa be [[szerkesztés]]&lt;dimenzióValuesInMemory&gt;] (#dimenziós érzelmek) hamis (a GenerateDatasets által ajánlott Xml) Mivel az időméretnek gyakran számos értéke van.
* Mert EDDGrid FromAudioFiles, szinte mindig használja a EDDGrid FromFiles rendszer [Aggregáció keresztül File nevek](#aggregation-via-file-names-or-global-metadata) - szinte mindig a felvételi dátum kivonásával Idő a fájlnévből. Például,
```
    <sourceName>\\*\\*\\*fileName,"timeFormat=yyyyMMdd'\\_'HHmmss",aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
GenerateDatasets Az Xml ezt ösztönzi, és ezzel segít.
* Az EDDTableFromAudioFiles számára szinte mindig használja az EDDTableFromFiles rendszert [\\*\\*\\*fileName pseudo sourceName s](#filename-sourcenames) információ kivonása a fájl nevét (szinte mindig az indulási dátum Idő a felvételhez) és népszerűsítse azt, hogy az adatok oszlopa legyen. Például,
```
    <sourceName>\\*\\*\\*fileName,aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Ezután meg kell határozni az időformátumot, mint az egységeket:&lt;att name="units" - YyMMdd'\\_'HHmmss&lt;/att&gt;
     
###  EDDGrid FromMergeIRFiles{#eddgridfrommergeirfiles} 
 [ ** EDDGrid FromMergeIRFiles** ](#eddgridfrommergeirfiles) összesíti a helyi adatok adatait, [MergeIR](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README) fájlok, amelyek a [Trópusi Rainfall mérési misszió (TRMM) ](https://trmm.gsfc.nasa.gov) , amely közös küldetés a NASA és a Japán Aerospace Exploration Agency között (JAXA) ... Merge Az IR fájlok letölthetők [NASA](ftp://disc2.nascom.nasa.gov/data/s4pa/TRMM_ANCILLARY/MERG/) ...

 EDDGrid FromMergeIRFiles.java írta és hozzájárult a ERDDAP™ Jonathan Lafite és Philippe Makowski R.Tech Engineering (licenc: szerzői jogi nyílt forráskód) ...

 EDDGrid FromMergeIRFiles egy kicsit szokatlan:

*    EDDGrid FromMergeIRFiles támogatja a tömörített vagy elnyomott forrásadat fájlokat, bármilyen kombinációban, ugyanazon adatkészletben. Ez lehetővé teszi például, hogy tömörítse az idősebb fájlokat, amelyek ritkán elérhetők, de az új fájlokat gyakran hozzáférnek. Vagy megváltoztathatja az eredeti tömörítés típusát. Z például, .gz ...
* Ha ugyanazon adatfájlok tömörített és elnyomatlan verziói vannak ugyanabban a könyvtárban, győződjön meg róla, hogy&lt;fájlNameRegex&gt; az adatkészlet illeszti a fájlnéveket, hogy azt akarja, hogy megfeleljen, és nem egyezik fájlnévvel, hogy nem akarja, hogy megfeleljen.
* A nem elnyomott forrásadat fájloknak nem kell fájl kiterjesztése (i.e., nem ". a fájlnévben) ...
* A kompressált forrásadatfájloknak fájl kiterjesztéssel kell rendelkezniük, de ERDDAP™ meghatározza a tömörítés típusát a fájl tartalmának ellenőrzésével, nem pedig a fájl kiterjesztésének megtekintésével (Például: ".Z") ... A támogatott kompressziós típusok magukban foglalják a "gz", "bzip2", "xz", "lzma", "snappy-raw", "snappy-framed", "pack200" és "z". Mikor ERDDAP™ tömörített fájlokat olvas, decompresses on-the-fly, írás nélkül egy ideiglenes fájlt.
* Minden forrásadatfájlnak az eredeti fájl elnevezési rendszert kell használnia: azaz a merg\\_ *YYYMMDHH* \\_4km-pixel (ahol *YYYMMDHH* jelzi az adatokhoz kapcsolódó időt a fájlban) , plusz egy fájl kiterjesztése, ha a fájlt tömörítik.

Lásd ezt az osztályt, [ EDDGrid Fájlok](#eddgridfromfiles) Általános információk arról, hogyan működik ez az osztály, és hogyan kell használni.

Erősen ajánljuk a használatát [GenerateDatasets Xml program](#generatedatasetsxml) egy durva tervezetet készíteni datasets.xml cunk ehhez az adatkészlethez. Ezután szerkesztheti ezt, hogy finomhangolja azt.
 
###  EDDGrid FromNcFiles{#eddgridfromncfiles} 
 [ ** EDDGrid FromNcFiles** ](#eddgridfromncfiles) aggregálja az adatokat a helyi, rácsos, [GRIB .grb és .grb2](https://en.wikipedia.org/wiki/GRIB) fájlok, [ HDF   (v4 vagy v5)   .hdf ](https://www.hdfgroup.org/) fájlok, [ .nc ml ml](#ncml-files) fájlok, [ NetCDF   (v3 vagy v4)   .nc ](https://www.unidata.ucar.edu/software/netcdf/) fájlok és [Zarr](https://github.com/zarr-developers/zarr-python) fájlok (2.25 verzió) ... A Zarr fájlok kissé eltérő viselkedéssel rendelkeznek, és megkövetelik a fájltNameRegex vagy az útRegex, hogy tartalmazza a "zarr".

Újdonság ERDDAP™ A 2.29.0 verzió kísérleti támogatást nyújt az olyan adatok változóinak, amelyek nem támogatják az összes tengelyváltozatot (vagy ahogy néhányan úgy hívták, hogy az 1D és a 2D adatok ugyanazon adatkészletben) ... Kérjük, érje el a GitHub-ot (beszélgetések vagy kérdések) visszajelzésekkel és hibákkal.

Ez működhet más fájltípusokkal (Például a BUFR) Csak nem teszteltük - kérjük, küldjön nekünk néhány minta fájlt.

* GRIB fájlokhoz, ERDDAP™ .gbx index fájlt készít, először olvassa el az összes GRIB fájlt. Tehát a GRIB-fájloknak olyan könyvtárban kell lenniük, ahol a "felhasználó", amely ran Tomcat olvasott + írásbeli engedélyt.
* Lásd ezt az osztályt, [ EDDGrid Fájlok](#eddgridfromfiles) információ arról, hogyan működik ez az osztály, és hogyan kell használni.
* Kezdőlap ERDDAP™ v2.12, EDDGrid FromNcFiles és EDDGrid FromNcFiles A nem csomagolt adatok a "struktúrákból" olvashatók .nc 4 és .hdf 4 fájl. A változó azonosítása, amely egy szerkezetből származik,&lt; sourceName &gt; &gt; &gt; &gt; használja a formátumot: *fullstructureName*  |  *tagName* Például a csoport1/myStruct | myMember.
* Erősen ajánljuk a használatát [GenerateDatasets Xml program](#generatedatasetsxml) egy durva tervezetet készíteni datasets.xml cunk ehhez az adatkészlethez. Ezután szerkesztheti ezt, hogy finomhangolja azt.
    
#### Csoportok Gridded Nc fájlokban{#groups-in-gridded-nc-files} 
     [A Netcdf4 fájlok csoportokat tartalmazhatnak.](#groups-in-gridded-nc-files)   ERDDAP™ csak egy adathalmazt készít az egyik csoportban és az összes szülőcsoportban lévő változókból. Megadhat egy adott csoport nevét a GenerateDatasets-ben Xml (Elhagyni a nyomvonalat) vagy használjon "" GenerateDatasets Xml keresse meg az összes csoportot a változókhoz, amelyek a legtöbb dimenziót használják, vagy használja a " \\[ gyökér \\] "A GenerateDatasets csak a változókat keresi a gyökércsoportban.
    
Az első dolog, amit a GenerateDatasetsXml tesz az ilyen típusú adatkészlethez, miután válaszol a kérdésekre, kinyomtatja a minta fájl ncdump-szerű szerkezetét. Tehát, ha belépsz néhány goofy válaszra az első hurok számára GenerateDatasets Xml, legalább látni fogja, hogy ERDDAP™ olvassa el a fájlt, és nézze meg, hogy milyen dimenziók és változók vannak a fájlban. Ezután jobb választ adhat a második hurok számára a GenerateDatasetsXml-en keresztül.
    

###  EDDGrid FromNcFilesUnpack{#eddgridfromncfilesunpacked} 
 [ ** EDDGrid FromNcFilesUnpack** ](#eddgridfromncfilesunpacked) egy változata [ EDDGrid FromNcFiles](#eddgridfromncfiles) amely összegyűjti az adatokat a helyi, megfogott NetCDF   (v3 vagy v4)   .nc és kapcsolódó fájlok. A különbség az, hogy ez az osztály minden adatfájlot kicsomagol, mielőtt EDDGrid FromFiles a fájlokat nézi:

* Kicsomagolja a változókat, amelyek tele vannak [ scale\\_factor vagy add\\_offset ](#scale_factor) ...
* Megtéríti a \\_FillValue-t és missing\\_value A NaN értékei (vagy MAX\\_VALUE az integrált adattípusokhoz) ...
* Idő- és ütemértékeket alakít át "seconds since 1970-01-01T00:00:00Z" ...

Ennek az osztálynak a nagy előnye, hogy utat biztosít a különböző értékek kezelésére scale\\_factor , add\\_offset \\_FillValue, missing\\_value vagy időegységek különböző forrásfájlokban egy gyűjteményben. Ellenkező esetben olyan eszközt kell használnia, mint [NcML](#ncml-files) vagy [ NCO ](#netcdf-operators-nco) módosítani minden fájlt, hogy távolítsa el a különbségeket, hogy a fájlokat lehet kezelni EDDGrid FromNcFiles. Ahhoz, hogy ez az osztály megfelelően működjön, a fájloknak követniük kell a kapcsolódó tulajdonságok CF szabványait.

* Ha megpróbálsz csinálni EDDGrid FromNcFiles Csomagolatlan egy olyan fájlcsoportból, amellyel korábban kipróbált és nem használt EDDGrid FromNcFiles, cd to
     *bigParentDirectory[szerkesztés]* /dataset/ *Last2Letters* / * datasetID * /
ahol *Last2Letters* az utolsó 2 betű datasetID ,
és törölje az összes fájlt ebben a könyvtárban.
* Kezdőlap ERDDAP™ v2.12, EDDGrid FromNcFiles és EDDGrid FromNcFiles A nem csomagolt adatok a "struktúrákból" olvashatók .nc 4 és .hdf 4 fájl. A változó azonosítása, amely egy szerkezetből származik,&lt; sourceName &gt; &gt; &gt; &gt; használja a formátumot: *fullstructureName*  |  *tagName* Például a csoport1/myStruct | myMember.
* Erősen ajánljuk a használatát [GenerateDatasets Xml program](#generatedatasetsxml) egy durva tervezetet készíteni datasets.xml cunk ehhez az adatkészlethez. Ezután szerkesztheti ezt, hogy finomhangolja azt.
    
A Netcdf4 fájlok csoportokat tartalmazhatnak. Lásd [ez a dokumentáció](#groups-in-gridded-nc-files) ...
    
Az első dolog, amit a GenerateDatasetsXml tesz az ilyen típusú adatkészlethez, miután válaszol a kérdésekre, kinyomtatja a mintafájl ncdump-szerű szerkezetét **előtte** kicsomagolatlan. Tehát, ha belépsz néhány goofy válaszra az első hurok számára GenerateDatasets Xml, legalább látni fogja, hogy ERDDAP™ olvassa el a fájlt, és nézze meg, hogy milyen dimenziók és változók vannak a fájlban. Ezután jobb választ adhat a második hurok számára a GenerateDatasetsXml-en keresztül.
    
###  EDDGrid LonPM180{#eddgridlonpm180} 
 [ ** EDDGrid LonPM180** ](#eddgridlonpm180) módosítja a gyermek hosszúsági értékeit (bezárt)   EDDGrid olyan adatkészlet, amely több mint 180 (például 0-360) hogy ők a tartományban -180-180 (Longitude Plus vagy Minus 180, így a név) ...

* Ez lehetőséget ad arra, hogy olyan adatkészleteket hozzanak létre, amelyeknek hosszúsági értékei nagyobbak, mint 180 megfelelnek / a OGC Szolgáltatások (Például WMS szerver ERDDAP ) Mint minden OGC A szolgáltatások hosszúsági értékeket igényelnek -180 és 180 között.
* A szüntelenséghez közeli munka problémákat okoz, függetlenül attól, hogy a szüntelenség hosszúságú 0 vagy hosszúságú 180. Ez az adatkészlet típus lehetővé teszi, hogy elkerülje ezeket a problémákat mindenki számára, két változata ugyanazt az adatkészletet:
a 0–360 közötti tartományban lévő hosszúsági értékek ("Pacificentric"?) ,
az egyik hosszúsági értékek a tartományban -180-180 ("Atlanticentric"?) ...
* A 180-nál nagyobb, hosszúsági értékű gyermekadatok esetében az új hosszúsági értékek mindössze 360 fokkal alacsonyabbak. Például egy 180-240-es szélességi értékű adatkészlet az -180–120 közötti hosszúsági értékekkel rendelkező adatkészlet lesz.
* Gyermekadatkészletek, amelyek hosszúságú értékek az egész világon (durván 0-360) Az új hosszúsági érték újrarendezésre kerül, hogy (durván) 180–180:
Az eredeti 0–180 érték változatlan.
Az eredeti 180-360 értékek átalakulnak -180-0-ra, és a hosszúsági sor kezdetére változnak.
* A 180-as gyermekadatok esetében, de ne fedje le a világot, ERDDAP™ beilleszti a hiányzó értékeket, amelyek szükségesek ahhoz, hogy egy adatkészletet hozzanak létre, amely lefedi a világot. Például egy 140-200-as hosszúsági értékű gyermekadat az 180–180-as évek hosszúsági értékű adatkészletévé válik.
A 180-200-as gyermekértékek -180-160-ra válnak.
Az új hosszúsági értékek -160-tól 140-ig terjednek. A megfelelő adatértékek \\_FillValues lesznek.
A 140-180-as gyermekértékek változatlanok lesznek.
A hiányzó értékek beillesztése furcsának tűnhet, de elkerüli számos problémát, ami azt eredményezi, hogy a hosszúsági értékek hirtelen ugranak. (pl.: -160 és 140) ...
* Inkább [GenerateDatasetsXml](#generatedatasetsxml) van egy speciális "adatkészlet", EDDGrid LonPM180FromErddapCatalog, amely lehetővé teszi, hogy létrehozza a datasets.xml Mert EDDGrid LonPM180 adatkészletek mindegyikétől EDDGrid adatkészletek egy ERDDAP olyan hosszúsági értékek, amelyek 180-nál nagyobbak. Ez megkönnyíti ezen adatkészletek két változatát:
az eredeti, hosszúsági értékekkel a 0–360 tartományban,
és az új adatkészlet, a hosszúsági értékek a -180-180 tartományban.
    
A gyermek adatkészlete minden egyesben EDDGrid LonPM180 adatkészlet lesz EDDGrid FromErddap adatkészlet, amely az eredeti adatkészletre vonatkozik.
Az új adatkészlet datasetID lesz az eredeti adatkészlet neve, plusz "\\_LonPM180".
Például,
```
    <dataset type="EDDGridLonPM180" datasetID="erdMBsstdmday\\_LonPM180" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_LonPM180Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=120.0 maxLon=320.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Tedd le a EDDGrid LonPM180 adatkészlet **alább** az eredeti adatkészlet datasets.xml ... Ez elkerüli néhány lehetséges problémát.
    
Alternatívaként helyettesítheti a EDDGrid FromErddap gyermek adatkészlet az eredeti adatkészlettel datasets.xml ... Ezután az adatkészlet csak egy verziója lesz: az egy, amelynek hosszúsági értékei vannak -180 és 180 között. Ezt azért elriasztjuk, mert vannak olyan idők, amikor az adatkészlet minden verziója kényelmesebb.
    
* Ha egy adatkészlet két verzióját kínálja, például egy, 0-360-as hosszúsággal, és egy hosszúsággal -180-180-as 180-as:
    * Használhatja az opcionális [&lt;hozzáférhető Via WMS &gt; Hamis&lt;/Csak elérhető Via WMS &gt;&gt;&gt;&gt;&gt;&gt; (#Ccessibleviawms) a 0-360 adatkészlettel, amely erõsen letiltja a WMS szolgáltatás erre az adatkészletre. Ezután csak az adatkészlet LonPM180 verziója elérhető lesz WMS ...
    * Van néhány módja annak, hogy a LonPM180 adatállomány naprakész legyen a mögöttes adatkészlet változásaival:
        * Ha a gyermek adatkészlete egy EDDGrid FromErddap adatkészlet, amely ugyanazon adatkészletre hivatkozik ERDDAP™ A LonPM180 adatkészlet közvetlenül feliratkozik az alapjául szolgáló adatkészletre, hogy mindig naprakész legyen. A közvetlen előfizetések nem generálnak olyan e-maileket, amelyek arra kérik Önt, hogy érvényesítse az előfizetést - az érvényesítést automatikusan meg kell tenni.
        * Ha a gyermek adatkészlete nem EDDGrid FromErddap adatkészlet, amely ugyanazon ERDDAP™ A LonPM180 adatkészlet megpróbálja használni a rendszeres előfizetési rendszert az alapul szolgáló adatkészletre. Ha rendelkezik az előfizetési rendszerrel az Önben ERDDAP™ fordult, meg kell kapni e-mailek kéri, hogy érvényesítse az előfizetést. Kérlek, tedd meg&#33;
        * Ha rendelkezik az előfizetési rendszerrel az Önben ERDDAP™ Kikapcsolva, a LonPM180 adatkészlet néha elavult metaadatokkal rendelkezhet, amíg a LonPM180 adatkészletet újratöltik. Tehát, ha az előfizetési rendszer le van kapcsolva, be kell állítania a [[szerkesztés]]&lt;újratöltés MindenNMinutes&gt;] (#reloadeveryn percek) a LonPM180 adatkészlet kisebb számra történő beállítása, így nagyobb valószínűséggel elkapja a gyermek adatkészletének változásait.

* A maximális hosszúságú adatkészletek esetében &gt; 360, a következő opcionális konfigurációt használja a maximális érték meghatározása érdekében, és az adatkészletet -180-180-ra korrigálják.
```
    <maxSourceLon>540</maxSourceLon>
```

####  EDDGrid LonPM180 csontváz XML{#eddgridlonpm180-skeleton-xml} 

>&nbsp;&nbsp;&lt;dataset type="EDDGridLonPM180" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid Lon0360{#eddgridlon0360} 
 [ ** EDDGrid Lon0360** ](#eddgridlon0360) módosítja a gyermek hosszúsági értékeit (bezárt)   EDDGrid olyan adatkészlet, amely kevesebb, mint 0 (például -180-180) hogy a 0-360-as tartományban vannak (Ezért a neve) ...

* A szüntelenséghez közeli munka problémákat okoz, függetlenül attól, hogy a szüntelenség hosszúságú 0 vagy hosszúságú 180. Ez az adatkészlet típus lehetővé teszi, hogy elkerülje ezeket a problémákat mindenki számára, két változata ugyanazt az adatkészletet:
az egyik hosszúsági értékek a tartományban -180-180 ("Atlanticentric"?) ...
a 0–360 közötti tartományban lévő hosszúsági értékek ("Pacificentric"?) ,
* A gyermekek adatkészleteinél kevesebb, mint 0, az új hosszúsági értékek mindössze 360 fokkal magasabbak. Például a -180–120 közötti hosszúsági értékű adatkészlet 180–240-es szélességi értékű adatkészlet lesz.
* Gyermekadatkészletek, amelyek hosszúságú értékek az egész világon (durván -180-180) Az új hosszúsági érték újrarendezésre kerül, hogy (durván) 0-360:
Az eredeti -180-0 értékek 180–360-ra változnak, és a hosszúsági sor végére változnak.
Az eredeti 0–180 érték változatlan.
* A lon=0-as gyermekadatok esetében, de ne fedje le a világot, ERDDAP™ beilleszti a hiányzó értékeket, amelyek szükségesek ahhoz, hogy egy adatkészletet hozzanak létre, amely lefedi a világot. Például a -40-2020 közötti hosszúsági értékű gyermekadat egy 0-360-as hosszúsági értékű adatkészlet lesz.
A 0-20 éves gyermekértékek változatlanok lesznek.
Az új hosszúsági értékek 20-tól 320-ig lesznek beillesztve. A megfelelő adatértékek \\_FillValues lesznek.
A -40-0 gyermekértékei 320-ról 360-ra válnak.
A hiányzó értékek beillesztése furcsának tűnhet, de elkerüli számos problémát, ami azt eredményezi, hogy a hosszúsági értékek hirtelen ugranak. (pl. 20 és 320 között) ...
* Inkább [GenerateDatasetsXml](#generatedatasetsxml) van egy speciális "adatkészlet", EDDGrid Lon0360 ErddapCatalog, amely lehetővé teszi, hogy létrehozza a datasets.xml Mert EDDGrid Lon0360 adatkészletek mindegyikéből EDDGrid adatkészletek egy ERDDAP olyan hosszúsági értékek, amelyek 180-nál nagyobbak. Ez megkönnyíti ezen adatkészletek két változatát:
az eredeti, hosszúsági értékekkel a 0–360 tartományban,
és az új adatkészlet, a hosszúsági értékek a -180-180 tartományban.
    
A gyermek adatkészlete minden egyesben EDDGrid Lon0360 adatkészlet lesz EDDGrid FromErddap adatkészlet, amely az eredeti adatkészletre vonatkozik.
Az új adatkészlet datasetID lesz az eredeti adatkészlet neve, plusz "\\_Lon0360".
Például,
```
    <dataset type="EDDGridLon0360" datasetID="erdMBsstdmday\\_Lon0360" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_Lon0360Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=-40.0 maxLon=20.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Tedd le a EDDGrid Lon0360 adatkészlet **alább** az eredeti adatkészlet datasets.xml ... Ez elkerüli néhány lehetséges problémát.
    
Alternatívaként helyettesítheti a EDDGrid FromErddap gyermek adatkészlet az eredeti adatkészlettel datasets.xml ... Ezután az adatkészlet csak egy verziója lesz: az egy, 0-360-on belüli hosszúsági értékekkel. Ezt azért elriasztjuk, mert vannak olyan idők, amikor az adatkészlet minden verziója kényelmesebb.
    
* Ha egy adatkészlet két verzióját kínálja, például egy, 0-360-as hosszúsággal, és egy hosszúsággal -180-180-as 180-as:
    * Használhatja az opcionális [&lt;hozzáférhető Via WMS &gt; Hamis&lt;/Csak elérhető Via WMS &gt;&gt;&gt;&gt;&gt;&gt; (#Ccessibleviawms) a 0–360 adatkészlettel, hogy könnyedén letiltsa a WMS szolgáltatás erre az adatkészletre. Ezután csak az adatkészlet -180–180 verziója elérhető lesz WMS ...
    * Van néhány módja annak, hogy a Lon0360 adatállományt naprakészen tartsa a mögöttes adatállomány változásaival:
        * Ha a gyermek adatkészlete egy EDDGrid FromErddap adatkészlet, amely ugyanazon adatkészletre hivatkozik ERDDAP™ A Lon0360 adatkészlet közvetlenül feliratkozik a mögöttes adatkészletre, hogy mindig naprakész legyen. A közvetlen előfizetések nem generálnak olyan e-maileket, amelyek arra kérik Önt, hogy érvényesítse az előfizetést - az érvényesítést automatikusan meg kell tenni.
        * Ha a gyermek adatkészlete nem EDDGrid FromErddap adatkészlet, amely ugyanazon ERDDAP™ A Lon0360 adatkészlet megpróbálja használni a rendszeres előfizetési rendszert az alapul szolgáló adatkészletre. Ha rendelkezik az előfizetési rendszerrel az Önben ERDDAP™ fordult, meg kell kapni e-mailek kéri, hogy érvényesítse az előfizetést. Kérlek, tedd meg&#33;
        * Ha rendelkezik az előfizetési rendszerrel az Önben ERDDAP™ Kikapcsolva, a Lon0360 adatkészlet néha elavult metaadatokkal rendelkezhet, amíg a Lon0360 adatkészletet vissza nem töltik. Tehát, ha az előfizetési rendszer le van kapcsolva, be kell állítania a [[szerkesztés]]&lt;újratöltés MindenNMinutes&gt;] (#reloadeveryn percek) a Lon0360 adatkészlet kisebb számra történő beállítása, így nagyobb valószínűséggel fogja elkapni a gyermek adatkészletének változásait.
####  EDDGrid Lon0360 csontváz XML{#eddgridlon0360-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridLon0360" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid SideBySide{#eddgridsidebyside} 
 [ ** EDDGrid SideBySide** ](#eddgridsidebyside) aggregál két vagy több EDDGrid adatkészletek (gyerekek) oldalról oldalra.

* Az ebből eredő adatkészlet minden változóval rendelkezik az összes gyermek adatkészletből.
* A szülői adatkészlet és az összes gyermek adatkészlet MUST eltérő datasetID S. Ha a család bármely neve pontosan ugyanaz, az adatkészlet nem terheli (a hibaüzenet, hogy az összesített tengely értékei nem rendezett rendben vannak) ...
* Minden gyereknek ugyanaz a forrásértéke van axisVariable s \\[ 1+ \\]   (Például a magasság, a hosszúság) ... A vizsgálat pontosságát a tesztelés határozza meg [AxisNDigits](#matchaxisndigits) ...
* A gyerekeknek különböző forrásértékei lehetnek axisVariable s \\[ 0 0 \\]   (például az idő) De általában nagyjából ugyanazok.
* A szülői adatkészlet úgy tűnik, hogy az összes axisVariable s \\[ 0 0 \\] forrásértékek az összes gyermektől.
* Például ez lehetővé teszi, hogy egy forrásadatot egy vektor komponensével és egy másik forrásadatot egy vektor v-komponensével kombináljon, így a kombinált adatok szolgálhatnak.
* A módszer által létrehozott gyermekeket magántulajdonban tartják. Nem külön hozzáférhető adatkészletek (például az ügyféladatkérések vagy az [zászló fájlok](/docs/server-admin/additional-information#flag) ) ...
* A világméretű metaadat és a szülői beállítások a globális metaadatból származnak, és az első gyermek beállításai.
* Ha van egy kivétel az első gyermek létrehozása közben, a szülő nem jön létre.
* Ha van egy kivétel, miközben más gyerekeket hozunk létre, ez egy e-mailt küld az EverythingTo-nak. (a megadott [setup.xml](/docs/server-admin/deploy-install#setupxml) ) és folytatódik a többi gyerekkel.
####  EDDGrid SideBySide csontváz XML{#eddgridsidebyside-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridSideBySide" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 2 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid AggregateExistingDimenzió{#eddgridaggregateexistingdimension} 
 [ ** EDDGrid AggregateExistingDimenzió** ](#eddgridaggregateexistingdimension) aggregál két vagy több EDDGrid adatkészletek, amelyek mindegyike különböző értékek az első dimenzió, de azonos értékek a többi dimenzióban.

* Például egy gyermek adatkészletnek 366 értéke lehet (2004-re) az idő dimenziója és egy másik gyermeknek 365 értéke lehet (2005-re) az idő dimenziója.
* Az összes többi dimenzió értéke (Például a magasság, a hosszúság) MUST legyen azonos minden gyermek számára. A vizsgálat pontosságát a tesztelés határozza meg [AxisNDigits](#matchaxisndigits) ...
* Osztott dimenziós értékek - Az értékek minden dimenzióban MUST lehet rendezett rendben (Felemelkedés vagy leszármazás) ... Az értékek szabálytalanul helyreállhatnak. Nem lehetnek kapcsolatok. Ez a követelmény a [CF metaadat szabvány](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) ... Ha bármely dimenzió értéke nem rendezett rendben van, az adatkészlet nem lesz betöltve és ERDDAP™ azonosítja az első fel nem szorított értéket a logfájlban, *bigParentDirectory[szerkesztés]* /logs/log.txt .
    
A nem szorított dimenziós értékek szinte mindig problémát jelentenek a forrásadatokkal. Ez a leggyakrabban akkor fordul elő, amikor egy tévhit vagy nem megfelelő fájl szerepel a gyülekezetben, ami egy szorulatlan idő dimenzióhoz vezet. A probléma megoldásához lásd a hibaüzenetet ERDDAP™ log.txt fájl, hogy megtalálja a megsértő időértéket. Ezután nézze meg a forrásfájlokat, hogy megtalálja a megfelelő fájlt (vagy egy előtt vagy után) ez nem tartozik a gyülekezetbe.
    
* A szülői adatkészlet és a gyermek adatkészlete eltérő datasetID S. Ha a család bármely neve pontosan ugyanaz, az adatkészlet nem terheli (a hibaüzenet, hogy az összesített tengely értékei nem rendezett rendben vannak) ...
* Jelenleg a gyermek adatkészlete MUST lehet egy EDDGrid FromDap adatkészlet és MUST van a legalacsonyabb értékek az összesített dimenzió (általában a legrégebbi időértékek) ... Az összes többi gyereknek szinte azonos adatkészletnek kell lennie (különbözik csak az első dimenzió értékeiben) és csak sajátjuk határozza meg sourceUrl ...
* Az összesített adatkészlet az első gyermektől kapja a metaadatát.
* A [GenerateDatasets Xml program](#generatedatasetsxml) durva tervezetet készíthet datasets.xml egy EDDGrid AggregateExistingDimension egy sor fájl alapján, amelyet egy Hyrax vagy THREDS szerver. Például használja ezt a bemenetet a programhoz (az URL "1988" példája gyorsabb) :
    ```
      EDDType? EDDGridAggregateExistingDimension  
      Server type (hyrax, thredds, or dodsindex)? hyrax  
      Parent URL (for example, for hyrax, ending in "contents.html";  
        for thredds, ending in "catalog.xml")  
      ? https://opendap.jpl.nasa.gov/opendap/ocean\\_wind/ccmp/L3.5a/data/  
        flk/1988/contents.html  
      File name regex (for example, ".\\*\\.nc")? month.\\*flk\\.nc\\.gz  
      ReloadEveryNMinutes (for example, 10080)? 10080  
    ```
Használhatja az eredményt&lt; sourceUrl &gt; címkék vagy törölje őket, és kommentálja a&lt; sourceUrl &gt; címke (így az új fájlokat minden alkalommal észreveszik, amikor az adatkészletet újratöltik.
####  EDDGrid AggregateExistingDimension csontváz XML{#eddgridaggregateexistingdimension-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridAggregateExistingDimension" [datasetID](#datasetid)\\="..."  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- This is a regular [EDDGridFromDap](#eddgridfromdap) dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description child with the lowest values for the aggregated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl> &lt;!-- 0 or many; the sourceUrls for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;other children.  These children must be listed in order of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrls serverType="..." regex="..." recursive="true"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[pathRegex](#pathregex)\\=".\\*"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>https://*someServer/someDirectory/someSubdirectory*/catalog.xml&lt;/sourceUrls>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1. This specifies how to find the other children,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instead of using separate sourceUrl tags for each child.  The  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advantage of this is: new children will be detected each time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the dataset is reloaded. The serverType must be "thredds",  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hyrax", or "dodsindex". 
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) (regex)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) is .\\*\\.nc  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recursive can be "true" or "false".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Only directory names which match the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(default=".\\*") will be accepted.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A thredds catalogUrl MUST include "/thredds/catalog/".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a thredds catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chla/catalog.xml](https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a hyrax catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flk/1988/contents.html](https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/1988/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a dodsindex URL is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Note the "OPeNDAP logo at the top of the page.)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When these children are sorted by filename, they must be in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order of ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid Másolás{#eddgridcopy} 
 [ ** EDDGrid Másolás** ](#eddgridcopy) létrehozza és fenntartja a másik helyi másolatát EDDGrid Az adatok és szolgálja az adatokat a helyi másolatból.

*    EDDGrid Másolás (és a mesés adatok esetében, [EDDTableCopy](#eddtablecopy) ) nagyon könnyen használható és nagyon hatékony
     **megoldás néhány legnagyobb probléma az adatok távoli adatforrásból történő kiszolgálásával:** 
    * A távoli adatforrásból származó adatokhoz való hozzáférés lassú lehet.
        * Lassú lehet, mert őszintén lassú (például egy nem hatékony típusú szerver) ,
        * mert túl sok kérés túlterhelt,
        * vagy mert a szerver vagy a távoli szerver korlátozott a sávszélesség.
    * A távoli adatkészlet néha nem elérhető (ismét, különböző okok miatt) ...
    * Az adatok egyik forrására való támaszkodás nem mérlegeli jól (Például, amikor sok felhasználó és sok ERDDAP Használja) ...
         
* Hogyan működik - EDDGrid A másolat ezeket a problémákat automatikusan megoldja és fenntartja az adatok helyi másolatát, és adatokat szolgáltat a helyi másolatból. ERDDAP™ nagyon gyorsan szolgálhat a helyi másolatból származó adatokat. És a helyi másolat megkönnyíti a terhet a távoli szerveren. És a helyi másolat az eredeti mentés, amely hasznos abban az esetben, ha valami történik az eredeti.
    
Nincs semmi új az adatkészlet helyi másolatának elkészítéséről. Mi az új itt, hogy ez az osztály teszi\\*könnyű\\*létrehozni és létrehozni\\*Fenntartás\\*az adatok helyi másolata egy\\*változat\\*távoli adatforrások és\\*Metaadat\\*az adatok másolása közben.
    
* Adatgyűjtés - EDDGrid A másolat az adatok helyi másolatát azáltal teszi, hogy a távoli adatcsomagokat kéri&lt;adatkészlet&gt; Lesz egy darab a baloldal minden értékére (először) axis változó. EDDGrid A másolat nem támaszkodik a távoli adatkészlet indexszámára a tengelyre - ezek változhatnak.
    
FIGYELMEZTETÉS: Ha egy darab adat mérete olyan nagy (&gt; &gt; &gt; &gt; 2GB) ez problémákat okoz, EDDGrid A másolat nem használható. (Sajnáljuk, reméljük, hogy megoldást találunk erre a problémára a jövőben.) 
    
*    \\[ alternatíva EDDGrid Másolás -
Ha a távoli adatok letölthető fájlokon keresztül érhetők el, nem webes szolgáltatás, használat [Húsvét FromUrl opció EDDGrid Fájlok](#cachefromurl) , amely helyi másolatot készít a távoli fájlokról, és szolgálja az adatokat a helyi fájlokból. \\] 
* Helyi fájlok - Az adatok minden része külön tárolódik NetCDF fájl egy aláírásban *bigParentDirectory[szerkesztés]* /copy/ * datasetID * / (a megadott [setup.xml](/docs/server-admin/deploy-install#setupxml) ) ... A tengelyértékekből létrehozott tüzelőanyagokat módosítják, hogy fájlnév-biztonságot hozzanak létre (Például a hyphenseket "x2D" helyettesíti) - ez nem befolyásolja a tényleges adatokat.
     
* Új adatok - Minden alkalommal EDDGrid A másolatot újratöltik, ellenőrzi a távoli&lt;adatkészlet&gt; megnézni, hogy milyen zsákok állnak rendelkezésre. Ha a fájl egy darab adat nem létezik, a kérés, hogy a zsákmány hozzáadott egy sor. ERDDAP „Thread feldolgozza az összes megkeresett kérelmet az adatcsomagok, egy-egy. Láthatja a statisztikákat a Thread tevékenységéhez [Status oldal](/docs/server-admin/additional-information#status-page) és a [Napi jelentés](/docs/server-admin/additional-information#daily-report) ... (Igen, ERDDAP™ több feladatot rendelhetne erre a folyamatra, de ez sok távoli adatforrás sávszélességét, memóriáját és CPU időt használna, és sok helyi ERDDAP "Sávszélesség, memória és CPU idő, amelyek egyike sem jó ötlet.) 
    
MEGJEGYZÉS: Az első alkalom EDDGrid A másolatot betöltik, (ha minden jól megy) Számos adatkérés kerül hozzáadásra a feladathozHárom sorrendje, de nem hoztak létre helyi adatfájlokat. Tehát a konstrukció kudarcot vall, de a feladatThread továbbra is dolgozik, és létrehozza a helyi fájlokat. Ha minden jól megy, a feladatThread néhány helyi adatfájlot készít, és a következő kísérletet, hogy újratöltse az adatkészletet (~15 perc) sikeres lesz, de kezdetben nagyon korlátozott mennyiségű adattal.
    
MEGJEGYZÉS: A helyi adatkészlet után van néhány adat, és megjelenik az Ön adataiban ERDDAP Ha a távoli adatkészlet ideiglenesen vagy állandóan nem hozzáférhető, a helyi adatkészlet továbbra is működik.
    
WARNING: Ha a távoli adatkészlet nagy, és / vagy a távoli szerver lassú (Ez a probléma, nem?&#33;) Hosszú időbe telik, hogy teljes helyi másolatot készítsen. Bizonyos esetekben a szükséges idő elfogadhatatlan lesz. Például 1 TB adatátvitel egy T1-es vonalon keresztül (0,15 GB/s) legalább 60 napot vesz igénybe, optimális körülmények között. Ráadásul sok sávszélességet, memóriát és CPU időt használ a távoli és helyi számítógépeken. A megoldás az, hogy kemény meghajtót küldjön a távoli adatok adminisztrátorához, hogy a s / ő készítsen egy példányt az adathalmazról, és elküldje a merevlemezt vissza. Használja ezt az adatokat kiindulópontként és EDDGrid A másolás hozzáadja az adatokat. (Ez egy módja annak, hogy [Az Amazon EC2 Cloud Service](https://aws.amazon.com/importexport/) kezeli a problémát, bár rendszerüknek sok sávszélessége van.) 
    
WARNING: Ha egy adott érték a baloldal számára (először) axis változó eltűnik a távoli adatkészletből, EDDGrid A másolat nem töröli a helyi másolt fájlt. Ha akarod, törölheted magad.
    
#### Grid Copy ellenőrzés Adatok{#grid-copy-checksourcedata} 
A datasets.xml ez az adatkészlet lehet egy opcionális címke
```
    <checkSourceData>true</checkSourceData>  
```
Az alapértelmezett érték igaz. Ha/ha hibáztatja, az adatkészlet soha nem fogja ellenőrizni a forrásadatlapot, hogy megnézze, van-e további adatok.

#### Csak{#onlysince} 
Elmondhatja EDDGrid Másolás, hogy készítsen egy másolatot a forrásadatkészlet, ahelyett, hogy a teljes forrásadat, azáltal, hogy hozzá egy címke formájában&lt;JustSince&gt; *Néhány Érték* &lt;/onlySince&gt; az adatkészlethez datasets.xml cunk. EDDGrid A másolat csak az első dimenzió értékeivel kapcsolatos adatértékeket fogja letölteni (általában az idő dimenziója) ami nagyobb, mint *Néhány Érték* ... *Néhány Érték* lehet:
    * A relatív idő, amelyet a now-  *nUnits* ...
Például,&lt;JustSince&gt; now- 2 év&lt;/onlySince&gt; azt mondja az adatkészletnek, hogy csak helyi másolatokat készítsen az adatokhoz, ahol a külső dimenzió értékei (rendszerint időértékek) az elmúlt 2 évben (amely minden alkalommal újraértékelődik, az adatkészletet újratöltik, ami az, amikor új adatokat keres másolni) ... Lásd: [ now-  *nUnits* Szintax leírás](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) ... Ez akkor hasznos, ha az első dimenziónak van időadata, amit általában tesz.
        
         EDDGrid A másolat nem törli azokat a helyi adatfájlokat, amelyeknek idővel adatai vannak, idősebbek lesznek, mint now-  *nUnits* ... E fájlokat bármikor törölheti, ha úgy dönt. Ha igen, akkor erősen javasoljuk, hogy állítson be egy [zászló](/docs/server-admin/additional-information#flag) Miután törölte a fájlokat, hogy elmondja EDDGrid Másolja a csípett fájlok listájának frissítését.
        
    * Az ISO 8601 sztringként meghatározott időben rögzített pont yyyy-MM-ddTHH:mm:ssZ ...
Például,&lt;JustSince&gt;2000-01-01T00:00Z&lt;/onlySince&gt; csak az adatkészletet mondja el, hogy olyan helyi adatmásolatokat készítsen, ahol az első dimenzió értéke \\&gt;=2000-01-01T00:00Z. Ez akkor hasznos, ha az első dimenziónak van időadata, amit általában tesz.
         
    * Egy lebegő pontszám.
Például,&lt;JustSince&gt;946684800.0&lt;/onlySince&gt; Az egységek lesznek az első dimenzió úti egységei. Például az idő dimenziók esetében az egységek ERDDAP™ mindig "seconds since 1970-01-01T00:00:00Z" ... 946684800.0 "seconds since 1970-01-01T00:00:00Z" egyenértékű a 2000-01-01T00:00Z. Ez mindig hasznos lehetőség, de különösen hasznos, ha az első dimenziónak nincs időadata.

####  EDDGrid Copy Recomended használat{#eddgridcopy-recomended-use} 
1. Hozzon létre&lt;adatkészlet&gt; Belépés (az őshonos típus, nem EDDGrid Másolás) a távoli adatforráshoz.
     **Szerezd megfelelően, beleértve az összes kívánt metaadatot is.** 
2. Ha túl lassú, add hozzá az XML kódot, hogy csomagolja be egy EDDGrid Másolási adatkészlet.
    * Használjon mást datasetID   (talán megváltoztatva datasetID a régi datasetID kissé) ...
    * Másolja a&lt;hozzáférhető&gt;&gt;,&lt;ReloadEveryNMinutes&gt; és&lt;onChange&gt; távolról EDDGrid XML a EDDGrid Copy XML. (Értékeik EDDGrid Másolási anyag; a belső adatkészlet értékei irrelevánsak.) 
3.   ERDDAP™ az adatok helyi másolatát készíti és tartsa fenn.
         
* WARNING: EDDGrid A másolás azt feltételezi, hogy az egyes részegek adatértékei soha nem változnak. Ha / ha megteszik, manuálisan törölnie kell a chunk fájlokat *bigParentDirectory[szerkesztés]* /copy/ * datasetID * / amely megváltozott és [zászló](/docs/server-admin/additional-information#flag) az adatkészletet újra kell tölteni, hogy a törölt darabokat lecseréljék. Ha van egy e-mail előfizetése az adatkészlethez, akkor két e-mailt kap: az egyik, amikor az adatkészlet először újratölti és elkezdi másolni az adatokat, és egy másik, amikor az adatkészlet ismét betölti (automatikusan) és észleli az új helyi adatfájlokat.
     
* Minden tengelyértéknek egyenlőnek kell lennie.
Minden tengelyre, kivéve a baloldalt (először) Az összes értéknek egyenlőnek kell lennie minden gyermek számára. A vizsgálat pontosságát a tesztelés határozza meg [AxisNDigits](#matchaxisndigits) ...
     
* Beállítások, Metadata, változók - EDDGrid A másolat a zárt forrásadatból származó beállításokat, metaadatokat és változókat használja.
     
* Metadata megváltoztatása - Ha meg kell változtatni addAttributes vagy megváltoztatja a forrásadatokkal kapcsolatos változók sorrendjét:
    1. Változtasd meg addAttributes a forrásadatkészlethez datasets.xml szükség szerint.
    2. Törölje az egyik másolt fájlt.
    3. Állj be egy [zászló](/docs/server-admin/additional-information#flag) az adatkészlet azonnali újratöltéséhez. Ha egy zászlót használ, és e-mail előfizetése van az adatkészlethez, két e-mailt kap: az egyik, amikor az adatkészlet először visszatölti és elkezdi másolni az adatokat, és egy másik, amikor az adatkészlet ismét betöltődik (automatikusan) és észleli az új helyi adatfájlokat.
    4. A törölt fájlt az új metaadatokkal fogják regenerálni. Ha a forrásadatbázis valaha elérhető, az EDDGrid A másolási adatkészlet metaadatot kap a regenerált fájlból, mivel ez a legfiatalabb fájl.
####  EDDGrid Másolási csontváz XML{#eddgridcopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#grid-copy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onlySince>](#onlysince)...&lt;/onlySince> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromCassandra{#eddtablefromcassandra} 
 [ **EDDTableFromCassandra** ](#eddtablefromcassandra) adatokat kezel egyből [Cassandra](https://cassandra.apache.org/) asztal. A Cassandra egy NoSQL adatbázis.

*    ERDDAP™ Cassandra v2-vel és v3-val dolgozhat a beállítások változásai vagy különbségei nélkül. Teszteltünk [Cassandra v2 és v3 Apache](https://cassandra.apache.org/download/) ... Valószínű, hogy ERDDAP™ Cassandra-val is dolgozhat a DataStax-ból.
     
* Aug 2019 - május 2021, baj volt, hogy Cassandra dolgozni AdoptOpenJdk Java v8. Ez egy EXCEPTION\\_ACCESS\\_VIOLATION-t vezetett be. De most (2021 május) Ez a probléma eltűnt: sikeresen használhatjuk a Cassandra v2.1.22-et és az AdoptOpenJdk jdk8u292-b10-et.
     
#### Egy asztal{#one-table} 
A Cassandra nem támogatja a "joins"-t abban, ahogyan a kapcsolati adatbázisok teszik. Egyetlen ERDDAP™ EDDTableFromCassandra adatkészlet térképek egy (talán egy aljzat) Cassandra asztal.

#### Cassandra datasets.xml  {#cassandra-datasetsxml} 
*    ERDDAP™ jön a Cassandra Java sofőr, így nem kell külön telepíteni.
* Óvatosan olvassa el a dokumentum összes információját az EDDTableFromCassandra-ról. Néhány részlet nagyon fontos.
* A Cassandra Java A sofőr az Apache Cassandra-val dolgozik (1.2+) DataStax Enterprise (3.1+) ... Ha Apache Cassandra 1.2.x-t használ, szerkesztenie kell a cassandra.yaml fájlt minden csomó számára, hogy beállítsa az induló\\_transportot: igaz, majd indítsa újra az egyes csomópontokat.
* Erősen ajánljuk a használatát [GenerateDatasets Xml program](#generatedatasetsxml) egy durva tervezetet készíteni datasets.xml cunk ehhez az adatkészlethez. Ezután szerkesztheti azt, hogy finomhangolja azt (különösen [&lt;partíció KeySourceNames&gt;] (#partitionkeysourcenames) ). Összegyűjtheti az XML létrehozásához szükséges információkat az EDDTableFromCassandra adatkészlethez, kapcsolatba lépve a Cassandra adminisztrátorral és az internet keresésével.
    
GenerateDatasets Az Xml-nek két speciális lehetősége van az EDDTableFromCassandra számára:
    
    1. Ha belépsz "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (idézetek nélkül) a kulcstér számára a program megjeleníti a kulcsszók listáját
    2. Ha belép egy konkrét kulcstérbe, majd lépjen be a "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (idézetek nélkül) az asztalnév számára a program megjeleníti az asztalok listáját a kulcstérben és az oszlopokban.
##### Eset érzékenység{#case-sensitivity} 
* Az eset-érzékeny kulcstér és asztali nevek -
Cassandra kezeli a kulcstér és az asztal nevek egy eset-érzékeny módon. Emiatt soha nem használsz fenntartott szót (más esetekkel,) Cassandra kulcstérként vagy asztali névként.
* Az eset-inszenzitív oszlop nevek -
Alapértelmezés szerint Cassandra eset-érzékeny módon kezeli az oszlopneveket. Ha Cassandra egyik fenntartott szavait oszlop névként használja (Kérlek, ne&#33;) Használata
```
        <columnNameQuotes>"<columnNameQuotes>  
```
benne datasets.xml a Cassandra és ERDDAP™ kezelni fogja az oszlop neveket esetérzékeny módon. Ez valószínűleg egy hatalmas fejfájás lesz az Ön számára, mert nehéz meghatározni az oszlopnevek érzékeny változatait - Cassandra szinte mindig az oszlopneveket mutatja, mint az összes alacsonyabb esetet, függetlenül az igaz esettől.
* szorosan együttműködik a Cassandra adminisztrátorával, akinek releváns tapasztalatai lehetnek. Ha az adatkészlet nem terheli, olvassa el [hibaüzenet](#troubleshooting-tips) alaposan megtudni, miért.
         
#### Cassandra&lt;kapcsolat Property & Gt;{#cassandra-connectionproperty} 
Cassandra olyan kapcsolati tulajdonságokkal rendelkezik, amelyeket meg lehet határozni datasets.xml ... Ezek közül sokan befolyásolják a Cassandra-díj teljesítményét ERDDAP™ kapcsolat. Sajnos a Cassandra tulajdonságokat programszerűen kell beállítani Java , így ERDDAP™ kódot kell tartalmaznia minden ingatlan számára ERDDAP™ támogatás. Jelenleg, ERDDAP™ támogatja ezeket a tulajdonságokat:
 (Az alapértelmezettek az, amit látunk. A rendszer alapjai eltérőek lehetnek.) 

*    **Általános lehetőségek**   
    &lt;kapcsolat Tulajdonos neve=" **tömörítés** "&gt;&gt;&gt; *Nem | LZ4 | Snappy* &lt;/összeköttetés Tulajdonság&gt; (eset-insensitive, default=none)   
     (Általános tömörítési tanács: „nem” használat, ha a Cassandra és ERDDAP™ helyi/gyors és használja az LZ4-et, ha a kapcsolat távoli/lassú.)   
    &lt;kapcsolat Tulajdonos neve=" **hitelesítő anyagok** "&gt;&gt;&gt; *felhasználónév/password* &lt;/összeköttetés Tulajdonság&gt; (Ez egy szó szerinti '/' )   
    &lt;kapcsolat Tulajdonos neve=" **metrikák** "&gt;&gt;&gt; *Igaz | hamis* &lt;/összeköttetés Tulajdonság&gt; (2021-01-25 volt alapértelmezett=igaz, most figyelmen kívül hagyták és mindig hamis)   
    &lt;kapcsolat Tulajdonos neve=" **port** "&gt;&gt;&gt; *anIntegrátor* &lt;/összeköttetés Tulajdonság&gt; (natív bináris protokoll alapértelmezése=9042)   
    &lt;kapcsolat Tulajdonos neve=" **Súgó** "&gt;&gt;&gt; *Igaz | hamis* &lt;/összeköttetés Tulajdonság&gt; (Default=false)   
     (A gyors próbálkozásom, hogy a ssl sikertelen legyen. Ha sikerül, mondd el nekem, hogyan csináltad.) 
*    **Kérdés Opciók**   
    &lt;kapcsolat Tulajdonos neve=" **következetesség Szint** "&gt;&gt;&gt; *Minden | Minden | Minden \\_quorum | helyi\\_one | Helyi \\_quorum | helyi\\_serial | Egy | kvórum | Serial | három | kettő* &lt;/összeköttetés Tulajdonság&gt; (eset-insensitive, default=ONE)   
    &lt;kapcsolat Tulajdonos neve=" **fetchSize** "&gt;&gt;&gt; *anIntegrátor* &lt;/összeköttetés Tulajdonság&gt; (default=5000)   
     (Ne állítsa be a fetchSize-t kisebb értékre.)   
    &lt;kapcsolat Tulajdonos neve=" **dalszöveg: SerialConsistencyLevel** "&gt;&gt;&gt; *Minden | Minden | Minden \\_quorum | helyi\\_one | Helyi \\_quorum | helyi\\_serial | Egy | kvórum | Serial | három | kettő* &lt;/összeköttetés Tulajdonság&gt; (eset-insensitive, default=SERIAL) 
*    **Socket Opciók**   
    &lt;kapcsolat Tulajdonos neve=" **connectTimeoutMillis** "&gt;&gt;&gt; *anIntegrátor* &lt;/összeköttetés Tulajdonság&gt; (default=5000)   
     (Ne állítson összeköttetést TimeoutMillis egy kisebb értékre.)   
    &lt;kapcsolat Tulajdonos neve=" **Tartalom** "&gt;&gt;&gt; *Igaz | hamis* &lt;/összeköttetés Tulajdonság&gt;
    &lt;kapcsolat Tulajdonos neve=" **dalszöveg: TimeoutMillis** "&gt;&gt;&gt; *anIntegrátor* &lt;/összeköttetés Tulajdonság&gt;
     (Cassandra alapértelmezett olvasmányaTimeoutMillis 12000, de ERDDAP™ megváltoztatja az alapértelmezettet 120000-re. Ha Cassandra az olvasásTimeouts-ot dobja, akkor ez nem segíthet, mert Cassandra néha ezt megelőzi. A probléma valószínűbb, hogy túl sok adatot tárolsz partíciónként Kulcs kombináció.)   
    &lt;kapcsolat Tulajdonos neve=" **GetBufferSize** "&gt;&gt;&gt; *anIntegrátor* &lt;/összeköttetés Tulajdonság&gt;
     (Nem világos, hogy mi az alapértelmezett GetBufferSize. Ne állítsa be ezt egy kis értékre.)   
    &lt;kapcsolat Tulajdonos neve=" **SoLinger** "&gt;&gt;&gt; *anIntegrátor* &lt;/összeköttetés Tulajdonság&gt;
    &lt;kapcsolat Tulajdonos neve=" **tcpNoDelay** "&gt;&gt;&gt; *Igaz | hamis* &lt;/összeköttetés Tulajdonság&gt; (Default=null) 

Ha más kapcsolati tulajdonságokat kell beállítania, lásd a miénket [rész további támogatás megszerzéséről](/docs/intro#support) ...

A Tomcat egy adott startupja esetében a kapcsolatfeltételeket csak az első alkalommal használják, amikor egy adatkészletet hoznak létre egy adott Cassandra URL-hez. Mindezek az adatkészletek és az összes későbbi adatkészletek, amelyek ugyanazt az URL-t osztják, ezeket az eredeti kapcsolatfeltételeket fogják használni.
    
#### CQL{#cql} 
Cassandra Query Nyelv (CQL) felületesen olyan, mint az SQL, a hagyományos adatbázisok által használt lekérdezési nyelv. Mert OPeNDAP „A mesés adatok kéréseit az SQL mesés adatok kéréseire tervezték, lehetséges, hogy ERDDAP™ a tabuláris adatkérelmek CQL Bound/PreparedStatements-be történő átalakítása. ERDDAP™ bejelenti a nyilatkozatot [Log.txt](/docs/server-admin/additional-information#log) mint
szövegkénti nyilatkozat: *TheStatementAsText*   
Az Ön által látott nyilatkozat változata a nyilatkozat szöveges képviselete lesz, és csak "?", ahol a korlátozott értékek kerülnek elhelyezésre.
       
Nem olyan egyszerű - Sajnos a CQL-nak számos korlátozása van, amelyen az oszlopok lekérdezhetők, például a partíciós kulcsfontosságú oszlopokat lehet korlátozni = és IN, így ERDDAP™ bizonyos korlátozásokat küld Cassandra-nak, és minden korlátozást alkalmaz, miután az adatok Cassandra-ból érkeztek. Segítség ERDDAP™ hatékonyan kezelje a Cassandrát, meg kell határoznia [&lt;partíció KeySourceNames&gt;] (#partitionkeysourcenames) [[szerkesztés]]&lt;clusterColumnSourceNames&gt; (#clustercolumnsourcenames) és [&lt;indexColumnSourceNames&gt; (#indexcolumnsourcenames) benne datasets.xml ehhez az adatkészlethez. Ezek a legfontosabb módja annak, hogy segítsünk ERDDAP™ hatékonyan működik Cassandra-val. Ha nem mondod ERDDAP™ ez az információ, az adatkészlet fájdalmasan lassú lesz ERDDAP™ és használjon tonna Cassandra erőforrásokat.
     
#### &lt;partíció KeySourceNames & Gt;{#partitionkeysourcenames} 
Mivel a partíciós kulcsok központi szerepet játszanak a Cassandra asztalokban, ERDDAP™ tudni kell sourceName s és ha releváns, egyéb információk arról, hogyan kell velük dolgozni.
* Ön MUST határozza meg a részecskék fő forráskódú oszlop nevek kombinációs elválasztott listáját datasets.xml keresztül&lt;partíció KeySourceNames&gt;.
Egyszerű példa,
```
        <partitionKeySourceNames>station, deviceid<partitionKeySourceNames>  
```
Összetettebb példa,
```
        <partitionKeySourceNames>deviceid=1007, date/sampletime/1970-01-01<partitionKeySourceNames>
```
* TimeStamp Partition kulcsok - Ha az egyik partíciós kulcsoszlop egy olyan ütemes oszlop, amely egy másik ütemes oszlop koarser verziójával rendelkezik, ezt megadja
     *PartitionKeySourcName/OtherColumnSourceName/ time\\_precision *   
ahol time\\_precision az egyik az [ time\\_precision ](#time_precision) máshol használt húrok ERDDAP ...
A Z nyomvonal a time\\_precision a húr az alapértelmezett, így nem számít, ha a time\\_precision A sztring vége Z-ben vagy sem.
Például, ERDDAP™ tolmácsolja a dátumot/mintaidő/1970-01-01 "A dátumra vonatkozó korlátozásokat a mintavételi korlátozásokból lehet felépíteni, ezzel time\\_precision » A korlátok tényleges átalakítása bonyolultabb, de ez az áttekintés.
     **Használja ezt, amikor releváns.** Ez lehetővé teszi ERDDAP™ hatékonyan dolgozzon Cassandrával. Ha az oszlopok közötti kapcsolat létezik egy Cassandra asztalnál, és nem mondod ERDDAP™ Az adatkészlet fájdalmasan lassú lesz ERDDAP™ és használjon tonna Cassandra erőforrásokat.
* Egyedül Value Partition Keys - Ha akarsz egyet ERDDAP™ adatkészlet, hogy csak egy értékű egy partíciós kulcs, meghatározott *partitionKeySourceName=érték* ...
Ne használjon idézeteket egy numerikus oszlophoz, például az eszközid=1007
Használjon idézeteket egy String oszlophoz, például a Stid="Point Pinos"
* Dataset Default Sort Order -- A partíciós kulcs rendje&lt; dataVariable &gt; a datasets.xml meghatározza a Cassandra eredményeinek alapértelmezett rendezését. Természetesen a felhasználók más típusú megrendelést kérhetnek egy adott eredménykészlethez a jóváhagyással és orderBy  ("..." *Comma-elválasztott lista a változókról* "...") lekérdezésük végére.
* Alapértelmezett, Cassandra és ERDDAP™ kezelje az oszlop neveket eset-érzékeny módon. De ha beállítottad [oszlopNameQuotes](#case-sensitivity) ", ERDDAP™ kezelni fogja a Cassandra oszlop neveket eset-érzékeny módon.
         
#### &lt;partíció KeyCSV&gt;{#partitionkeycsv} 
Ha ez meg van határozva, ERDDAP™ használja, ahelyett, hogy Cassandra-t kérne a partícióra Minden alkalommal kulcsfontosságú információkat töltenek be az adatkészlet. Ez biztosítja a különálló partíciós kulcsértékek listáját, annak érdekében, hogy használják őket. Az időket 1970-01-01T00:00Z óta másodpercként kell meghatározni. De van még két különleges alternatív módja annak, hogy meghatározza az időket (minden kódolt, mint egy sztring) :

1) idő (aISO8601 Idő)   (MAY kódolva, mint egy sztring)   
2) „idők (anISO8601StartTime, strideSeconds, stopTime) "..." (MUST kódolva, mint egy sztring)   
Megáll Az idő lehet ISO8601 Idő vagy egy " now- nUnits" idő (pl.: " now- 3 perc”) ...
Megáll Az időnek nem kell pontos mérkőzésnek lennie a kezdéshez Idő + x strideSeconds.
Egy sor egy alkalommal () az érték több sorba kerül minden lekérdezés előtt, így a partíció listája A kulcsok mindig tökéletesen naprakészek lehetnek.
Például,
```
    <partitionKeyCSV>
    deviceid,date
    1001,"times(2014-11-01T00:00:00Z, 86400, 2014-11-02T00:00:00Z)"
    1007,"time(2014-11-07T00:00:00Z)"
    1008,time(2014-11-08T00:00:00Z)
    1009,1.4154912E9
    </partitionKeyCSV>
```
bővül a partíciós kulcskombinációk ebbe az asztalba:
```
    deviceid,date
    1001,1.4148E9
    1001,1.4148864E9
    1007,1.4153184E9
    1008,1.4154048E9
    1009,1.4154912E9 
```
#### &lt;clusterColumnSourceNames & gt;{#clustercolumnsourcenames} 
Cassandra elfogadja az SQL-szerű korlátokat a klaszteroszlopokra, amelyek az elsődleges kulcs második részét képező oszlopok. (a partíciós kulcs után (s) ) ... Tehát elengedhetetlen, hogy azonosítsa ezeket az oszlopokat keresztül&lt;clusterColumnSourceNames&gt;. Ez lehetővé teszi ERDDAP™ hatékonyan dolgozzon Cassandrával. Ha vannak klaszter oszlopok, és nem mondod ERDDAP Az adatkészlet fájdalmasan lassú lesz ERDDAP™ és használjon tonna Cassandra erőforrásokat.
    * Például,&lt;clusterColumnSourceNames&gt; *myClusterColumn1, myClusterColumn2* &lt;/clusterColumnSourceNames&gt;
    * Ha egy Cassandra asztalnak nincs klaszteres oszlopa, vagy nem adja meg&lt;clusterColumnSourceNames&gt;, vagy úgy határozza meg, hogy nincs értéke.
    * Alapértelmezett, Cassandra és ERDDAP™ kezelje az oszlop neveket eset-érzékeny módon. De ha beállítottad [oszlopNameQuotes](#case-sensitivity) ", ERDDAP™ kezelni fogja a Cassandra oszlop neveket eset-érzékeny módon.
         
#### &lt;indexColumnSourceNames & gt;{#indexcolumnsourcenames} 
Cassandra elfogadja '=' a másodlagos index oszlopokra vonatkozó korlátozások, amelyek az oszlopok, amelyeket kifejezetten létrehozott indexek segítségével
```
    CREATE INDEX *indexName* ON *keyspace.tableName* (*columnName*);  
```
 (Igen, a parentheses szükséges.)   
Tehát nagyon hasznos, ha azonosítja ezeket az oszlopokat keresztül&lt;indexColumnSourceNames&gt; Ez lehetővé teszi ERDDAP™ hatékonyan dolgozzon Cassandrával. Ha vannak index oszlopok, és nem mondod ERDDAP Néhány kérdésre szükségtelenül, fájdalmasan lassú lesz ERDDAP™ és használjon tonna Cassandra erőforrásokat.
* Például,&lt;indexColumnSourceNames&gt; *myIndexColumn1, myIndexColumn2* &lt;/indexColumnSourceNames&gt;
* Ha egy Cassandra asztalnak nincs indexoszlopa, vagy nem adja meg&lt;indexColumnSourceNames&gt;, vagy úgy határozza meg, hogy nincs értéke.
* WARNING: A Cassandra indexek nem szeretik az adatbázis indexeket. Cassandra indexek csak segítenek '=' korlátok. Ők csak [ajánlott](https://cassandra.apache.org/doc/latest/cql/indexes.html) olyan oszlopok esetében, amelyek sokkal kevesebb különböző értékkel rendelkeznek, mint a teljes értékek.
* Alapértelmezett, Cassandra és ERDDAP™ kezelje az oszlop neveket eset-érzékeny módon. De ha beállítottad [oszlopNameQuotes](#case-sensitivity) ", ERDDAP™ kezelni fogja a Cassandra oszlop neveket eset-érzékeny módon.
         
#### &lt;maxRequestFraction & gt;{#maxrequestfraction} 
Mikor ERDDAP™   (Újra) betölti az adatkészletet, ERDDAP™ Cassandra-ból származik a partíciós kulcsok különböző kombinációinak listája. Hatalmas adatkészlet esetében a kombinációk száma hatalmas lesz. Ha meg akarja akadályozni a felhasználók kérését a legtöbb vagy az összes adatkészlet kérésétől (vagy akár egy kérés, amely kér ERDDAP™ letölteni a legtöbbet vagy az összes adatot annak érdekében, hogy tovább szűrje) Elmondhatod ERDDAP™ csak olyan kérelmek engedélyezése, amelyek csökkentik a kombinációk számát valamilyen mennyiséggel&lt;maxRequestFraction&gt;, amely egy lebegő pontszám 1e-10 között (ami azt jelenti, hogy a kérelem nem igényelhet több mint 1 kombinációt egy milliárdban) és 1 (az alapértelmezettség, ami azt jelenti, hogy a kérés lehet az egész adatkészlet számára) ...
Például, ha egy adatkészlet 10000 különböző kombinációval rendelkezik a partíciós kulcsok és a maxRequestFraction 0,1-re kerül sor,
olyan kérelmek, amelyeknek 1001 vagy több kombinációra van szükségük, hibaüzenetet fognak generálni,
Azok a kérések, amelyeknek 1000 vagy kevesebb kombinációból származó adatokra van szükségük.
    
Általában a nagyobb adatkészlet, az alacsonyabb, amit be kell hozni&lt;maxRequestFraction&gt;. Tehát egy kis adatkészletre, 0,1-re állíthatja be egy közepes méretű adatkészletre, 0,01-re egy nagy adatkészletre, és 0.0001-re egy hatalmas adatkészletre.
    
Ez a megközelítés messze nem tökéletes. Néhány ésszerű kéréshez vezet, amelyeket elutasítanak, és néhány túl nagy kérést engedélyeznek. De ez egy nehéz probléma, és ez a megoldás sokkal jobb, mint semmi.
    
#### Cassandra subsetVariables  {#cassandra-subsetvariables} 
Mint más EDDTable adatkészletekkel, megadhatja a Comma-elválasztott listáját&lt; dataVariable &gt; &gt; &gt; &gt; destinationName s egy globális attribútumban, amelyet " [ subsetVariables ](#subsetvariables) „A változók azonosítása, amelyek korlátozott számú értékkel rendelkeznek. Az adatkészletnek ezután .subset weboldala lesz, és különböző értékek listáját jeleníti meg az e változók számára számos weboldalon.
    
A listán szereplő csak partíciós kulcsváltozatok és statikus oszlopok bevonása STRONGLY E NCO URAGED. Cassandra képes lesz arra, hogy a listát a különböző kombinációk nagyon gyorsan és könnyen minden alkalommal, amikor az adatkészletet újratöltik. Az egyik kivétel az időbélyegző partíciós kulcsok, amelyek más ütemű oszlop társuló verziói - valószínűleg a legjobb, ha ezeket kihagyjuk a listából. subsetVariables Mivel számos értéke van, és nem nagyon hasznosak a felhasználók számára.
    
Ha tartalmazza a nem partíciós kulcsot, a nem statikus változókat a listában, akkor valószínűleg **nagyon** számításszerűen drága Cassandra számára minden alkalommal, amikor az adatkészletet újratöltik, mert ERDDAP™ meg kell vizsgálnia az adatkészlet minden sorát, hogy létrehozza az információkat. Valójában a lekérdezés valószínűleg kudarcot vall. Tehát, kivéve a nagyon kis adatkészletek, ez a STRONGLY DISCOURAGED.
    
#### Cassandra DataTypes{#cassandra-datatypes} 
Mert van néhány kétértelműség arról, hogy melyik [Cassandra adattípusok](https://cassandra.apache.org/doc/latest/cql/types.html) térkép, amelyre ERDDAP™ adattípusok, meg kell határozni egy [&lt;adatType&gt;] (#datatype) Minden [[Ki]]]&lt; dataVariable &gt;&gt;&gt;&gt;&gt;&gt; (#datavariable) Mondd el ERDDAP™ melyik adattípust kell használni. A szabvány ERDDAP™ adatok típusok (és a leggyakoribb megfelelő Cassandra adattípusok) a következők:
    
*    [boolean](#boolean-data)   (boolean) Amely ERDDAP™ Ezután áruházak, mint bytes
* byte (int, ha a tartomány -128-127) 
* rövid (int, ha a tartomány -32768-32767) 
* Inkább (int, pult?, varint?, ha a tartomány -2147483648 és 2147483647) 
* hosszú (bigint, pult?, varint?, ha a tartomány -9223372036854775808 922337203685478) 
* Float (Float) 
* dupla dupla (dupla, decimal (a pontosság lehetséges elvesztésével) , Timetamp) 
* char (ascii vagy szöveg, ha soha nem rendelkeznek több mint 1 karakterrel) 
* Hírek (ascii, szöveg, varchar, inet, uuid, timeuid, blokk, térkép, készlet, lista?) 

Cassandra [Timetamp](#cassandra-timestamp-data) különleges eset: használat ERDDAP dupla adat típus.

Ha egy String adattípust határoz meg ERDDAP™ egy Cassandra térképre, beállított vagy listára, a térképre, beállított vagy listára minden Cassandra sorban egyetlen sorra kerül átalakulásra egyetlen sorban. ERDDAP™ asztal. ERDDAP™ van egy alternatív rendszer a listák; lásd alább.

 *típus* listák - ERDDAP [[szerkesztés]]&lt;adatType&gt;] (#datatype) Cassandra címke dataVariable S tartalmazhatja a rendszert ERDDAP™ adatok típusok (lásd fent) plusz számos speciális adatTypes, amely használható Cassandra lista oszlopok: booleanList, byteList, ubyteList, shortList, ushortList, intList, uintList, longList, floatList, duplaList, charList, StringList. Amikor az egyik lista oszlop az eredményeket átadják ERDDAP™ A forrásadatok minden sorát kiterjesztik a listára. méret () adatok sorai az adatokban ERDDAP egyszerű adatok típusok (például int) Ebben a forrásadatsorban duplikált lista lesz. méret () Idő. Ha az eredmények több mint egy listát tartalmaznak, az összes lista egy adott adatsorban azonos méretű, és MUST "parallel" listák, vagy ERDDAP™ hibaüzenetet fog generálni. Például az ADCP jelenlegi méréseire,
mélység \\[ 0 0 \\] UCurrent \\[ 0 0 \\] , vCurrent \\[ 0 0 \\] , és zCurrent \\[ 0 0 \\] minden kapcsolódik, és
mélység \\[ 1 \\] UCurrent \\[ 1 \\] , vCurrent \\[ 1 \\] , és zCurrent \\[ 1 \\] minden kapcsolódik, ...
Alternatíva, ha nem akarod ERDDAP™ bővíteni egy listát több sorban ERDDAP™ táblázat, határozza meg a Stringet, mint dataVariable adatok Típusú, hogy az egész listát az egyik csapásként ábrázolják ERDDAP ...
    
#### Cassandra TimeStamp adatok{#cassandra-timestamp-data} 
A Cassandra időbélyegző adatai mindig tisztában vannak az időzónákkal. Ha időbélyegző adatokat ad meg anélkül, hogy meghatározná az időzónát, a Cassandra feltételezi, hogy az időbélyeget a helyi időzónát használja.
    
 ERDDAP™ támogatja az időbélyegző adatokat, és mindig bemutatja az adatokat Zulu /GMT időzóna. Tehát, ha a Cassandra-i időbélyegző adatokat más időzónával adja meg Zulu /GMT, ne feledje, hogy minden kérdést meg kell tennie az időbélyegző adatokhoz ERDDAP™ használja Zulu /GMT időzóna. Tehát ne lepődj meg, amikor az időbélyeg értékek jönnek ki ERDDAP több órával változnak a helyi időzóna átállása miatt Zulu /GMT idő.

* Inkább ERDDAP A datasets.xml , a&lt; dataVariable &gt; címke egy időbélyegző változóhoz, set
```
          <dataType>double</dataType>  
```
és&lt; addAttributes &gt; beállítás
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Javaslat: Ha az adatok egy időtartomány, hasznos, hogy az időbélyegző értékek utalnak a központja a beágyazott időtartomány (Például, nem) ... Például, ha egy felhasználónak van adatai a 2010-03-26T13:00Z-nak egy másik adatkészletből, és szeretnének a legközelebbi adatokat ebből a Cassandra adatkészletből, amely minden nap adatokkal rendelkezik, akkor a 2010-03-26T12:00Z adatai (a Cassandra adatainak bemutatása ezen időpontban) nyilvánvalóan a legjobb (mint szemben az éjfél előtt vagy után, ahol kevésbé nyilvánvaló, hogy a legjobb) ...
*    ERDDAP™ haszonnal rendelkezik [Konvertáljon Numeric Idő / sztring idő](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) ...
* Lásd [Hogyan ERDDAP™ Üzletek az idővel](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) ...
         
#### Integer nulls{#integer-nulls} 
Cassandra támogatja a nullákat Cassandra intben ( ERDDAP™ Inkább) Nagy ( ERDDAP™ hosszú) oszlopok, de ERDDAP™ nem támogatja az igazi nullákat minden integrált adattípushoz.
Alapértelmezés szerint a Cassandra integráló nullák átalakulnak ERDDAP™ 2147483647 int oszlopok, vagy 9223372036854775807 hosszú oszlopok. Ezek „NaN”-ként fognak megjelenni bizonyos típusú szövegkimeneti fájlokban (Például .csv) , "" más típusú szövegkimeneti fájlokban (például, .htmlTable ) és az adott szám (2147483647 a hiányzó int értékekért) más típusú fájlokban (például bináris fájlok, mint például .nc és mat) ... A felhasználó az ilyen típusú hiányzó értékű adatsorokat keresheti a "NaN", például " & WindSpeed=NaN" -re hivatkozva.
    
Ha más integrált értéket használ, hogy jelezze a hiányzó értékeket a Cassandra táblában, kérjük, azonosítsa ezt az értéket datasets.xml :

>    &lt;att name="missing\\_value" [type="int"](#attributetype)\\>-999&lt;/att>

A Cassandra lebegő pontoszlopok esetében a nullák áttérnek a NaN-ekre ERDDAP ... A Cassandra-adattípusok esetében, amelyek a Strings-be kerülnek ERDDAP™ A nullák megtérnek az üres vonásokra. Ez nem lehet probléma.
    
#### "WARNING: A már elkészített lekérdezés újrakészítése"{#warning-re-preparing-already-prepared-query} 
* "WARNING: A már előkészített lekérdezés újrakészítése" *Tomcat* /logs/catalina.out (vagy más Tomcat log fájl)   
Cassandra dokumentáció szerint baj van, ha ugyanazt a lekérdezést egy PreparedStatement-be sorolják (vagy többet) ... (Lásd ezt [bug jelentés](https://datastax-oss.atlassian.net/browse/JAVA-236) ...) Hogy elkerüljük Cassandra őrült, ERDDAP™ minden PreparedStatements-t, így újra felhasználhatja őket. Ez a gyorsaság elveszett, ha/ha Tomcat/ ERDDAP™ újraindításra kerül, de úgy gondolom, ez rendben van, mert az PreparedStatements egy adott üléshez kapcsolódik (között Java Cassandra) , ami szintén elveszett. Tehát láthatja ezeket az üzeneteket. Nem ismerek más megoldást. Szerencsére figyelmeztetés, nem hiba (Bár Cassandra fenyegeti, hogy teljesítményproblémákhoz vezethet) ...
    
Cassandra azt állítja, hogy a PreparedStatements örökre jó, így ERDDAP "A Cached PreparedStatements-nek soha nem szabadna naprakész / érvénytelenné válnia. Ha ez nem igaz, és hibákat kap bizonyos PreparedStatements-ről naprakész / érvénytelen, akkor újra kell indítania. ERDDAP™ tisztázni ERDDAP „A PreparedStatements jegyzőkönyve.
    
#### Cassandra biztonság{#cassandra-security} 
Lásd [Cassandra biztosítása](https://cassandra.apache.org/doc/latest/operating/security.html) 

Amikor Cassandra-val dolgozol, a lehető legbiztonságosabban és biztonságosan kell tennie a dolgokat, hogy elkerülje, hogy egy rosszindulatú felhasználó károsítsa a Cassandrát, vagy hozzáférést szerezzen azokhoz az adatokhoz, amelyekhez nem kell hozzáférnie. ERDDAP™ megpróbálja a dolgokat biztonságos módon is csinálni.

* Bátorítunk benneteket, hogy hozzon létre ERDDAP™ a Cassandra-hoz, mint Cassandra-felhasználóhoz való csatlakozás, amely csak hozzáférést biztosít **releváns** asztal (s) és csak READ kiváltságai vannak.
* Arra bátorítunk benneteket, hogy hozzátok létre a kapcsolatot ERDDAP™ Cassandra, hogy
    * mindig használja az SSL-t,
    * csak az egyik IP-címből származó kapcsolatokat engedélyezi (vagy a címek egy blokkja) az egyiktől ERDDAP™ felhasználó és
    * csak átadja a jelszavakat az MD5 formanyomtatványában.
*    \\[ KNOWN PROBLEM \\] A kapcsolatfeltételek (beleértve a jelszót&#33;) egyszerű szövegként tárolják datasets.xml ... Nem találtunk módot arra, hogy az adminisztrátor belépjen a Cassandra jelszóba ERDDAP Kezdőlap Tomcatban (amely felhasználói bemenet nélkül történik) Így a jelszót egy fájlban hozzáférhetőnek kell lennie. Hogy ezt biztonságosabbá tegyük:
    * Te vagy (a ERDDAP™ adminisztrátor) legyen a tulajdonosa datasets.xml és van READ és WRITE hozzáférés.
    * Készítsen egy csoportot, amely csak felhasználó=tomcatot tartalmaz. Használja a chgrp-t, hogy a csoport legyen datasets.xml Csak READ kiváltságokkal.
    * Használja a chmod-t az o-rwx kiváltságok hozzárendeléséhez (Nincs READ vagy WRITE hozzáférés a "másik" felhasználókhoz) Mert datasets.xml ...
* Mikor ERDDAP™ , a jelszó és más kapcsolati tulajdonságokat "magánban" tárolják Java változók.
* Az ügyfelek kéréseit a Cassandra CQL-kérelmek generálása előtt pótolják és ellenőrzik.
* A Cassandra iránti kérelmek CQL Bound/PreparedStatements-rel készülnek, hogy megakadályozzák a CQL injekciót. Mindenesetre a Cassandra kevésbé érzékeny a CQL injekcióra, mint a hagyományos adatbázisok. [SQL injekció](https://en.wikipedia.org/wiki/SQL_injection) ...
         
#### Cassandra Speed{#cassandra-speed} 
A Cassandra gyors vagy lassú lehet. Van néhány dolog, amit tehetünk, hogy gyorsan:
* Általános -
A CQL természete az, hogy a kérdések [deklaratív](https://en.wikipedia.org/wiki/Declarative_programming) ... Pontosan meghatározzák, mit akar a felhasználó. Nem tartalmaznak specifikációt vagy utalásokat arra, hogy a lekérdezést hogyan kell kezelni vagy optimalizálni. Tehát nincs mód ERDDAP™ a lekérdezés olyan módon történő generálása, hogy segít Cassandra optimalizálni a lekérdezést (vagy bármilyen módon meghatározza, hogyan kell kezelni a lekérdezést) ... Általában a Cassandra adminisztrátortól függ, hogy felállítsa a dolgokat (Például indexek) bizonyos típusú kérdések optimalizálása.
     
* Az időbélyegző oszlopok specifikálása, amelyek a coarser-precision időbélyegző partíciós kulcsokhoz kapcsolódnak [&lt;partíció KeySourceNames&gt;] (#partitionkeysourcenames) a legfontosabb módja annak, hogy segítsünk ERDDAP™ hatékonyan működik Cassandra-val. Ha ez a kapcsolat egy Cassandra asztalnál létezik, és nem mondod ERDDAP™ Az adatkészlet fájdalmasan lassú lesz ERDDAP™ és használjon tonna Cassandra erőforrásokat.
     
* A klaszter oszlopok leírása [&lt;clusterColumnSourceNames&gt; (#clustercolumnsourcenames) a második legfontosabb módja annak, hogy segítsen ERDDAP™ hatékonyan működik Cassandra-val. Ha vannak klaszter oszlopok, és nem mondod ERDDAP Az adatok lehetséges kérdéseinek nagy része szükségtelenül, fájdalmasan lassú lesz ERDDAP™ és használjon tonna Cassandra erőforrásokat.
     
* Készülj fel [Indexek](https://cassandra.apache.org/doc/latest/cql/indexes.html) közösen konstruált változók számára -
Gyorsíthat néhány kérdést azáltal, hogy indexeket hoz létre a Cassandra oszlopokhoz, amelyeket gyakran "="korlátokkal" korlátoznak.
    
A Cassandra nem hozhat indexeket a listára, a beállításra vagy a térképes oszlopokra.
    
* Az index oszlopok leírása [&lt;indexColumnSourceNames&gt; (#indexcolumnsourcenames) fontos módja annak, hogy segítsünk ERDDAP™ hatékonyan működik Cassandra-val. Ha vannak index oszlopok, és nem mondod ERDDAP Néhány adatkérés szükségtelenül, fájdalmasan lassú lesz ERDDAP™ és használjon tonna Cassandra erőforrásokat.
     
#### Cassandra Stats{#cassandra-stats} 
*    ["Cassandra stats" Diagnosztikus üzenetek](#cassandra-stats) - Minden ERDDAP™ felhasználó lekérdezése egy Cassandra adatkészlethez, ERDDAP™ kinyomtat egy sort a logfájlban, *bigParentDirectory[szerkesztés]* /logs/log.txt, a lekérdezéshez kapcsolódó statisztikákkal, például
```
        \\* Cassandra stats: partitionKeyTable: 2/10000=2e-4 < 0.1 nCassRows=1200 nErddapRows=12000 nRowsToUser=7405  
```
A fenti példában szereplő számok használatával ez azt jelenti:

* Mikor ERDDAP™ utolsó (Újra) betöltötte ezt az adatkészletet, mondta Cassandra ERDDAP™ 10000 különböző kombinációja volt a partíciós kulcsoknak. ERDDAP™ az összes különböző kombinációt egy fájlban.
* A felhasználó korlátozásai miatt, ERDDAP™ 2 kombinációt azonosított az 10000-ből, amely a kívánt adatokkal rendelkezhet. Szóval, ERDDAP™ 2 felhívást tesz Cassandra-ra, az egyik a partíciós kulcsok mindegyik kombinációjára. (Ez az, amit Cassandra igényel.) Nyilvánvaló, hogy nehéz, ha egy nagy adatkészletnek számos kombinációja van a partíciós kulcsoknak, és egy adott kérelem nem drasztikusan csökkenti azt. Megkövetelheti, hogy minden kérelem csökkenti a kulcsterületet a beállítással [&lt;maxRequestFraction&gt; (#maxrequestfraction) ... Itt 2/10000=2e-4, ami kevesebb, mint a maxRequestFraction (0.1) Ezért a kérést engedélyezték.
* a korlátozások alkalmazása a partíciós kulcsokra, [Klaszter oszlopok](#clustercolumnsourcenames) és [index oszlopok](#indexcolumnsourcenames) amelyet küldtek ERDDAP™ Cassandra visszatért 1200 sor adathoz ERDDAP™ a ResultSetben.
* Az eredmény A beállításnak kellett volna [adatok Type= *dalszöveg* lista](#cassandra-datatypes) oszlopok (átlagosan 10 tétel listánként) mert ERDDAP™ kibővítette a 1200 sort Cassandrából 12000 sorba ERDDAP ...
*    ERDDAP™ mindig a felhasználó összes korlátozását alkalmazza a Cassandra adataira. Ebben az esetben a Cassandra által nem kezelt korlátozások csökkentették a sorok számát 7405-re. Ez a felhasználónak küldött sorok száma.

Ezeknek a diagnosztikai üzeneteknek a legfontosabb használata az, hogy megbizonyosodjon arról, hogy ERDDAP™ azt csinálja, amit úgy gondolja, hogy csinál. Ha ez nem (Például nem csökkenti a várhatóan eltérő kombinációk számát?) Ezután felhasználhatja az információkat, hogy megpróbálja kitalálni, mi történik rosszul.
 
* Kutatás és kísérlet a jobb megtalálásához és beállításához [&lt;kapcsolatProperty&gt;] (#cassandra-kapcsolati tulajdon) A.
 
* Ellenőrizze a Cassandra és a hálózati kapcsolat sebességét ERDDAP ... Ha a kapcsolat lassú, nézze meg, hogy javíthatja-e. A legjobb helyzet az, amikor ERDDAP™ fut egy olyan szerveren, amely ugyanazhoz kapcsolódik (Gyors) kapcsolja be, mint a kiszolgáló futtatja a Cassandra csomót, amelyhez kapcsolódik.
 
* Kérjük, légy türelmes&#33; Olvassa el itt és a Cassandra dokumentációban gondosan. Tapasztalat. Ellenőrizze a munkáját. Ha a Cassandra ERDDAP™ kapcsolat még mindig lassabb, mint várni, kérjük, vegye fel a Cassandra asztal sémáját és ERDDAP™ zsákmány datasets.xml lásd a miénket [rész további támogatás megszerzéséről](/docs/intro#support) ...
 
* Ha minden más kudarcot vall,
fontolja meg az adatok tárolását egy gyűjteményben NetCDF v3 .nc fájlok (különösen különösen .nc fájlok, amelyek a [CF Discrete Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Ragged Array adatstruktúrák és így kezelhetők ERDDAP A [EDDTableFromNcCFFiles](#eddtablefromnccffiles) ) ... Ha logikailag megszervezik őket (mindegyik adat egy darab űr és idő) , ERDDAP™ nagyon gyorsan kivonhatja az adatokat tőlük.
         
#### EDDTableFromCassandra csontváz XML{#eddtablefromcassandra-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromCassandra" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;ipAddress>](#sourceurl)...&lt;/ipAddress>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The Cassandra URL without the port number, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;127.0.0.1 REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#cassandra-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "readTimeoutMillis") and values  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;of the Cassandra properties that ERDDAP™ needs to change.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;keyspace>...&lt;/keyspace> &lt;!-- The name of the keyspace that has  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the table. REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName> &lt;!-- The name of the table, default = "".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;partitionKeySourceNames>](#partitionkeysourcenames)...&lt;partitionKeySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;clusterColumnSourceNames>](#clustercolumnsourcenames)...&lt;clusterColumnSourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;indexColumnSourceNames>](#indexcolumnsourcenames)...&lt;indexColumnSourceNames> &lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;maxRequestFraction>](#maxrequestfraction)...&lt;maxRequestFraction>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL double between 1e-10 and 1 (the default). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#case-sensitivity)...&lt;columnNameQuotes> &lt;!-- OPTIONAL.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Options: \\[nothing\\] (the default) or ". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include a [&lt;dataType>](#datatype) tag. See  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Cassandra DataTypes](#cassandra-datatypes).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For [Cassandra timestamp columns](#cassandra-timestamp-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromDapSequence{#eddtablefromdapsequence} 
 [ **EDDTableFromDapSequence** ](#eddtablefromdapsequence) a változók kezelése 1- és 2-szintű sorrendben [ DAP ](https://www.opendap.org/) szerverek, mint például DAP PER (volthttps://www.pmel.noaa.gov/epic/software/dapper/Most megszűnt) ...

* Erősen ajánljuk a használatát [GenerateDatasets Xml program](#generatedatasetsxml) egy durva tervezetet készíteni datasets.xml cunk ehhez az adatkészlethez. Ezután szerkesztheti ezt, hogy finomhangolja azt. Összegyűjtheti a szükséges információkat azáltal, hogy megvizsgálja a forrásadatlap DDS és a DAS fájlokat a böngészőben (a .das és .dds hozzáadásával a sourceUrl (Egy példa volthttps://dapper.pmel.noaa.gov/dapper/epic/tao\\_time\\_series.cdp.dds).
    
* A változó egy DAP sorrendben, ha a .dds válasz azt jelzi, hogy a változó adatstruktúra "sorozat" (eseti érzéketlenség) ...
* Bizonyos esetekben, látni fogja a sorrendben, egy 2 szintű sorozat - EDDTableFromDapSequence kezeli ezeket is.
#### EDDTableFromDapSequence csontváz XML{#eddtablefromdapsequence-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDapSequence" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;outerSequenceName>...&lt;/outerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the outer sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;innerSequenceName>...&lt;/innerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the inner sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is OPTIONAL; use it if the DAP data is a two level  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sequence. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringEQNE>](#sourcecanconstrainstringeqne)true|false&lt;/sourceCanConstrainStringEQNE>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringGTLT>](#sourcecanconstrainstringgtlt)true|false&lt;/sourceCanConstrainStringGTLT>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringRegex>](#sourcecanconstrainstringregex)...&lt;/sourceCanConstrainStringRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;skipDapperSpacerRows>...&lt;/skipDapperSpacerRows>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- skipDapperSpacerRows specifies whether the dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;will skip the last row of each innerSequence other than the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last innerSequence (because Dapper servers put NaNs in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;row to act as a spacer).  This tag is OPTIONAL. The default  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is false.  It is recommended that you set this to true for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;all Dapper sources and false for all other data sources. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromDatabase{#eddtablefromdatabase} 
 [ **EDDTableFromDatabase** ](#eddtablefromdatabase) az adatokat egy kapcsolati adatbázis táblából vagy [nézet](https://en.wikipedia.org/wiki/View_(database) ).

#### Egy asztal vagy kilátás{#one-table-or-view} 
Ha az Ön által szolgált adatok két vagy több táblában vannak (és így szüksége van egy JOIN-re, hogy egyszerre kivonja az adatokat mindkét asztalról) , meg kell tennie egyet [denormalizált](https://en.wikipedia.org/wiki/Denormalization)   (már csatlakozott) asztal vagy [nézet](https://en.wikipedia.org/wiki/View_(SQL) ) az összes olyan adattal, amelyet egyetlen adatkészletként szeretne elérhetővé tenni ERDDAP ...

Nagy, összetett adatbázisok számára értelme lehet, hogy több darabot denormalizált asztalként különítsenek el, mindegyik más típusú adatokkal, amelyek külön adatkészletekké válnak. ERDDAP ...

Denormalizált asztal készítése a használathoz ERDDAP™ Úgy hangzik, mint egy őrült ötlet neked. Kérlek benneteket&#33; Több oka van annak, hogy miért ERDDAP™ denormalizált asztalokkal működik:

* Ez sokkal könnyebb a felhasználók számára.
Mikor ERDDAP™ bemutatja az adatkészletet, mint egy, egyszerű, denormalizált, egy táblázat, nagyon könnyű bárki számára megérteni az adatokat. A legtöbb felhasználó soha nem hallott a normalizált asztalokról, és nagyon kevesen értik a kulcsokat, a külföldi kulcsokat vagy az asztali csatlakozásokat, és szinte biztosan nem ismerik a különböző típusú csatlakozások részleteit, vagy hogyan kell meghatározni az SQL-t, hogy csatlakozzon (vagy több csatlakozó) helyesen. A denormalizált asztal használata elkerüli az összes problémát. Ez az ok egyedül igazolja a denormalizált egységes asztal használatát egy adatkészlet bemutatására ERDDAP™ felhasználók.
     
* Normalizált asztalok (a kulcsfontosságú oszlopok által kapcsolódó több táblázat) Nagyszerűek az adatok tárolása egy adatbázisban.
De még az SQL-ben is, a felhasználóhoz visszatérő eredmény denormalizált. (csatlakozik) egyetlen asztal. Tehát ésszerűnek tűnik, hogy az adatkészletet óriási, denormalizált, egyedi táblázatként jelenítse meg, amelyből azután kérhet alkatrészeket (pl.: Mutassa meg az asztal sorait, ahol a hőmérséklet&gt; 30.) ...
     
* Lehet változtatni ERDDAP™ anélkül, hogy megváltoztatná az asztalait.
     ERDDAP™ van néhány olyan követelmény, amely különbözhet attól, hogy hogyan hozta létre az adatbázist.
Például, ERDDAP™ megköveteli, hogy az időbélyegző adatokat „időbélyegző időben” mezőkben tárolják.
Egy külön asztal/nézet készítésével ERDDAP™ Ezeket a változásokat akkor lehet elvégezni, ha a denormalizált asztalt készíti ERDDAP ... Így nem kell változtatnia az asztalaiban.
     
*    ERDDAP™ újrateremti a normalizált táblák szerkezetét.
Megadhatja, hogy mely adatok oszlopai a „külső” táblákból származnak, és ezért korlátozott számú különböző értékkel rendelkeznek. ERDDAP™ összegyűjti az értékek összes különböző kombinációját ezekben az oszlopokban, és bemutatja azokat a felhasználóknak egy speciális . olyan weblapot, amely segít a felhasználóknak gyorsan kiválasztani az adatkészlet alkészleteit. Az egyes oszlopok különböző értékei szintén megtalálhatók az adatkészlet többi weboldalán található legördülő listákban.
     
* Egy denormalizált asztal teszi az adatot kézből az Ön számára ERDDAP Az adminisztrátor egyszerű.
Te vagy az adatkészlet szakértője, ezért van értelme, hogy meghozza a döntéseket arról, hogy melyik táblázat és melyik oszlop csatlakozik, és hogyan csatlakozzon hozzájuk. Szóval nem kell nekünk átadnod (vagy rosszabb, a végfelhasználók) Számos táblázat és részletes utasítás, hogy hogyan kell csatlakozni hozzájuk, csak hozzá kell férnünk a denormalizált asztalhoz.
     
* A denormalizált asztal lehetővé teszi az adatokhoz való hatékony hozzáférést.
A denormalizált forma általában gyorsabb a hozzáféréshez, mint a normalizált forma. A csatlakozók lassúak lehetnek. Több csatlakozó nagyon lassú lehet.
     

Annak érdekében, hogy az adatbázisban két vagy több asztal adatait megkapja az adatbázisban ERDDAP™ Három lehetőség van:
 

* Ajánlott opció:
Képes létrehozni egy Comma- vagy tab-választott értékű fájlt a denormalizált asztal adataival.
Ha az adatkészlet óriási, akkor értelme van több fájl létrehozására, mindegyik a denormalizált táblázat kohéziós helyettesítésével (például egy kisebb időtartomány adatai) ...
    
A nagy előny itt az, hogy ERDDAP™ képes lesz kezelni a felhasználói kérelmeket az adatokat anélkül, hogy további erőfeszítést az adatbázis. Szóval ERDDAP™ nem lesz teher az adatbázisában vagy biztonsági kockázatban. Ez a legjobb lehetőség szinte minden körülmények között, mert ERDDAP™ rendszerint gyorsabban kaphat adatokat a fájlokból, mint egy adatbázisból (ha átalakítjuk az .csv fájlokat .nc CF fájlok) ... (Az ok egy része az, hogy ERDDAP A +files egy olvasható rendszer, és nem kell kezelni a változásokat, miközben [ACID](https://en.wikipedia.org/wiki/ACID)   (Atomicitás, konzisztencia, elszigeteltség, tartósság) ...) Valószínűleg nem lesz szüksége külön kiszolgálóra, mivel az adatokat az egyik RAID-n tárolhatjuk, és hozzáférhetünk egy meglévő szerverhez. ERDDAP™ egy meglévő szerveren.
    
* Okéy Opció:
Új adatbázist hoz létre egy másik számítógépen, csak a denormalizált asztallal.
Mivel ez az adatbázis lehet egy ingyenes és nyílt forráskódú adatbázis, mint a MariaDB, a MySQL és a PostgreSQL, ez az opció nem kell sokba kerülnie.
    
A nagy előny itt az, hogy ERDDAP™ képes lesz kezelni a felhasználói kérelmeket az adatokra anélkül, hogy további erőfeszítéseket tenne a jelenlegi adatbázisában. Szóval ERDDAP™ Nem lesz terhet a jelenlegi adatbázisában. Ez sok biztonsági aggályt is megszüntet, mivel ERDDAP™ nem lesz hozzáférése jelenlegi adatbázisához.
    
* Bátorított opció:
Kapcsolat ERDDAP™ a jelenlegi adatbázisodhoz.
Ehhez:
    
    * Készítsen külön asztalt vagy nézetet az adatok denormalizált táblájával.
    * Hozzon létre egy "erddap" felhasználót, aki csak a denormalizált táblázathoz fér hozzá (s) ...
         
    
Ez egy lehetőség, ha az adatok nagyon gyakran változnak, és szeretné adni ERDDAP™ a felhasználók azonnali hozzáférést ezekhez a változásokhoz; de még így is, értelme lehet használni a fájl opciót, és rendszeresen (30 percenként?) helyettesítse a fájlt, amely a mai adatok.
Ennek a megközelítésnek a hatalmas hátrányai az, hogy ERDDAP™ A felhasználói kérelmek valószínűleg elviselhetetlenül nagy terhet jelentenek az adatbázisban, és hogy ERDDAP™ a kapcsolat biztonsági kockázat (Bár minimalizálhatjuk/ kezelhetjük a kockázatot) ...

A denormalizált asztal vagy nézet készítése ERDDAP™ jó lehetőség, hogy néhány változást hozzon, ERDDAP™ olyan módon, amely nem befolyásolja az eredeti táblákat:

* Változtassa meg a dátumot és az időmérő mezőket / oszlopokat az adattípus használatára, amelyet a Postgres hív [időbélyegző időzónával](#database-date-time-data)   (vagy az egyenértékű az adatbázisban) ...
A Timestamps időzóna információ nélkül nem működik megfelelően ERDDAP ...
* Készítsen indexeket az oszlopok számára, amelyeket a felhasználók gyakran keresnek.
* Légy nagyon tisztában veled [a mező/oszlop nevek esete](#quotes-for-names-and-case-sensitivity)   (például használja az összes alsó esetet) amikor beírod őket.
* Ne használjon tartalék szavakat az asztalhoz és a mező/oszlop nevekhez.

Ha segítségre van szüksége a denormalizált asztal vagy nézet készítéséhez, kérjük, vegye fel a kapcsolatot az adatbáziskezelővel.
Ha szeretnél beszélni erről az egész megközelítésről, vagy stratégiázni, hogyan lehet a legjobban csinálni, kérlek e-mailt Chris. John at noaa.gov.
    
#### adatbázis datasets.xml  {#database-in-datasetsxml} 
Nehéz létrehozni a helyes datasets.xml szükséges információ ERDDAP™ kapcsolatot létesíteni az adatbázissal. Légy türelmes&#33; Légy módszeres&#33;
* Erősen ajánljuk a használatát [GenerateDatasets Xml program](#generatedatasetsxml) egy durva tervezetet készíteni datasets.xml cunk ehhez az adatkészlethez. Ezután szerkesztheti ezt, hogy finomhangolja azt.
        
GenerateDatasets Az Xml három speciális opcióval rendelkezik az EDDTableFromDatabase számára:
1. Ha belépsz "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (idézetek nélkül) a katalógus neve, a program megjeleníti a katalógus nevek listáját.
2. Ha belépsz "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (idézetek nélkül) a schema neve esetében a program megjeleníti a schema nevek listáját.
3. Ha belépsz "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (idézetek nélkül) az asztalnév számára a program megjeleníti az asztalok és oszlopok listáját. Az első "&#33;&#33;&#33;LIST&#33;&#33;&#33;" bejegyzés, amit csinálsz, az, amit használni fognak.
* Óvatosan olvassa el a dokumentum összes információját az EDDTableFromDatabase-ről.
* Összegyűjtheti az XML létrehozásához szükséges legtöbb információt egy EDDTableFromDatabase adatkészlethez, kapcsolatba lépve az adatbáziskezelővel és az internet keresésével.
* Bár az adatbázisok gyakran kezelik az oszlopneveket és az asztali neveket eset-érzékeny módon, azok esetérzékenyek. ERDDAP ... Tehát, ha egy hibaüzenet az adatbázisból azt mondja, hogy egy oszlop neve ismeretlen (Például: "Unknown azonosító= "..." *oszlop\\_name* "") bár tudod, hogy létezik, próbáld meg használni az összes fővárost, például, *COLUMN_NAME* , amely gyakran az oszlop neve igazi, eset-érzékeny változata.
* szorosan együttműködik az adatbázis-adminisztrátorral, aki releváns tapasztalattal rendelkezik. Ha az adatkészlet nem terheli, olvassa el [hibaüzenet](#troubleshooting-tips) alaposan megtudni, miért.
         
#### JDBC sofőr{#jdbc-driver} 
* [JDBC sofőr és&lt;sofőrName&gt;] (#jdbc-driver) - Meg kell szereznie a megfelelő JDBC 3 vagy JDBC 4 vezető .jar fájlt az adatbázishoz és
Tedd be&#33; *Tomcat* /webapps/erddap/WEB-INF/lib miután telepített ERDDAP ... Aztán, a te datasets.xml ehhez az adatkészlethez meg kell határoznia a&lt;sofőrName&gt; erre a sofőrre, ami (Sajnos) különbözik a fájlnévtől. Keressen az interneten a JDBC sofőr számára az adatbázis és a sofőrName számára Java használnia kell.
    
    * MariaDB számára próbálkozzon [https://mariadb.com/kb/en/about-the-mariadb-java-client/](https://mariadb.com/kb/en/about-the-mariadb-java-client/)   
A&lt;sofőrName&gt; használni datasets.xml   (lásd alább) valószínűleg org.mariadb.jdbc. Vezető .
    * A MySQL és az Amazon RDS számára próbálkozzon [https://dev.mysql.com/downloads/connector/j/](https://dev.mysql.com/downloads/connector/j/)   
A&lt;sofőrName&gt; használni datasets.xml   (lásd alább) valószínűleg com.mysql.jdbc. Vezető .
    * Mert Oracle Próbálj ki [https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html) ...
A&lt;sofőrName&gt; használni datasets.xml   (lásd alább) valószínűleg oracle.jdbc.driver. Oracle Vezető .
    * Postgresql számára megkaptuk a JDBC 4-es sofőrt [https://mvnrepository.com/artifact/org.postgresql/postgresql](https://mvnrepository.com/artifact/org.postgresql/postgresql)   
A&lt;sofőrName&gt; használni datasets.xml   (lásd alább) valószínűleg org.postgresql. Vezető .
    * Az SQL Server számára megkaphatja a JTDS JDBC sofőrt [https://jtds.sourceforge.net](https://jtds.sourceforge.net) ...
A&lt;sofőrName&gt; használni datasets.xml   (lásd alább) valószínűleg net.sourceforge.jtds.jdbc. Vezető .
    
Miután betette a JDBC vezetőjét.jar ERDDAP™ lib könyvtár, meg kell adni egy hivatkozást, hogy .jar fájl a .bat és / vagy .sh script fájlok a GenerateDatasets Xml, DasDds és ArchiveADataset, amelyek a *Tomcat* /webapps/erddap/WEB-INF/ könyvtár; különben kapsz egy ClassNotFoundException, amikor futtatod ezeket a forgatókönyveket.
    
Sajnos a JDBC néha a baj forrása. A szerepe, mint közvetítő között ERDDAP™ és az adatbázis, néha finom változásokat hoz az SQL szabványos/generikus adatbázis kérésére ERDDAP™ létrehozza, ezáltal problémákat okozva (például, amelyhez kapcsolódik [felső/alacsonyabb azonosítók](#quotes-for-names-and-case-sensitivity) és kapcsolódik [dátum / időzónák](#database-date-time-data) ) ... Kérjük, légy türelmes, olvassa el az információkat itt gondosan, ellenőrizze a munkáját, és nézze meg a miénket [rész további támogatás megszerzéséről](/docs/intro#support) ...
    
#### Adatbázis&lt;kapcsolat Property & Gt;{#database-connectionproperty} 
* [[szerkesztés]]&lt;kapcsolatProperty&gt;] (#database-kapcsolat) - A datasets.xml az adatkészletéhez több kapcsolatot kell meghatároznia Tulajdonos címkék mondani ERDDAP™ Hogyan kapcsolódjon az adatbázishoz (például a felhasználó nevét, jelszót, ssl kapcsolatot és [fetch méret](#set-the-fetch-size) ) ... Ezek különbözőek minden helyzetben, és egy kicsit nehéz kitalálni. Keresse meg az internetet például egy JDBC sofőr használatával, hogy csatlakozzon az adatbázishoz. A&lt;kapcsolatProperty&gt; nevek (Például: "felhasználó", "password" és "ssl") , és néhány a kapcsolatProperty értékek megtalálhatók a keresés az interneten a "JDBC kapcsolat tulajdonságok *adatbázis típus* "..." (például, Oracle MySQL, Amazon RDS, MariaDB, PostgreSQL) ...
     
#### Névek és esetérzékenységi idézetek{#quotes-for-names-and-case-sensitivity} 
*    [Field/Kolumn nevek idézetei; esetérzékenység](#quotes-for-names-and-case-sensitivity) - Az alapértelmezett, EDDTableFromDatabase ANSI-SQL-standard dupla idézeteket ír elő a SELECT nyilatkozataiban, ha egy tartalék szót, mint egy mező / oszlop neve, vagy egy speciális karakter egy mező / oszlop neve. A kettős idézetek az SQL injekciós támadások bizonyos típusait is megnyomják. Elmondhatja ERDDAP™ ",", vagy nincs idézet&lt;oszlopNameQuotes&gt; benne datasets.xml ehhez az adatkészlethez.
    
Számos adatbázis esetében, bármilyen típusú idézet használata miatt az adatbázis olyan érzékeny módon működik a mező/oszlopnevekkel. (az alapértelmezett adatbázis eset helyett érzéketlen módon) ... Az adatbázisok gyakran jelennek meg fájl / oszlop nevek, mint az összes felső eset, amikor a valóságban az eset érzékeny formája más. Inkább ERDDAP™ Kérjük, mindig kezelje az adatbázis oszlop neveket, mint érzékeny.
    
    * Mária DB, futtatnia kell az adatbázist [\\-sql-mode=ANSI\\_QUOTES](https://mariadb.com/kb/en/mysql-command-line-client/) ...
    * A MySQL és az Amazon RDS számára az adatbázist kell futtatnia [\\-sql-mode=ANSI\\_QUOTES](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_ansi_quotes) ...
    *    Oracle támogatja az ANSI-SQL-standard kettős idézeteit [által default](https://docs.oracle.com/database/121/SQLRF/sql_elements008.htm#SQLRF00223) ...
    * A PostgreSQL támogatja az ANSI-SQL szabványos kettős idézeteket az alapértelmezés szerint.
    
      
Ne használjon tartalék szót egy adatbázishoz, katalógushoz, schema-hoz vagy asztal nevehez. ERDDAP™ nem tesz idézeteket körülöttük.
    
Ha lehetséges, használja az adatbázis, katalógus, schema, asztali nevek és mezőnevek összes alsó esetét az adatbázis táblázat létrehozásakor (vagy nézet) és amikor a mező/oszlop nevekre utal datasets.xml benne ERDDAP ... Ellenkező esetben hibaüzenetet kaphat, amely szerint az adatbázis, a katalógus, a schema, az asztal és/vagy a mező nem található meg. Ha megkapja ezt a hibaüzenetet, próbálja meg használni az esetérzékeny verziót, az összes felső esetű verziót, és a név összes alsó esetű verzióját a névben ERDDAP ... Egyikük dolgozhat. Ha nem, meg kell változtatni az adatbázis neve, katalógus, schema és / vagy táblázat az összes alacsonyabb esetre.
    
#### Adatbázis&lt;adatok Type & gt;{#database-datatype} 
*    [Adatbázis](#database-datatype) [[szerkesztés]]&lt;adatType&gt;] (#datatype) Tagok - Mert van néhány kétértelműség arról, hogy melyik [adatbázis adattípusok](https://www.w3schools.com/sql/sql_datatypes_general.asp) térkép, amelyre ERDDAP™ adattípusok, meg kell határozni egy [&lt;adatType&gt;] (#datatype) Minden [[Ki]]]&lt; dataVariable &gt;&gt;&gt;&gt;&gt;&gt; (#datavariable) Mondd el ERDDAP™ melyik adattípust kell használni. A probléma egy része az, hogy a különböző adatkészletek különböző kifejezéseket használnak a különböző adattípusokhoz - így mindig próbálják meg megfelelni a meghatározásoknak, nem csak a neveknek. Lásd a leírást [szabvány ERDDAP™ adatok típusok](#data-types) , amely a megfelelő SQL adattípusokra hivatkozik. [Dátum és időmérő](#database-date-time-data) speciális esetek: használat ERDDAP dupla adat típus.
     
#### Adatbázis dátuma Idő adatok{#database-date-time-data} 
Néhány adatbázis-idő oszlopnak nincs kifejezett időzónája. Az ilyen oszlopok bajok ERDDAP ... Az adatbázisok támogatják a dátum fogalmát (vagy anélkül egy idő) időzóna nélkül, megközelítő időtartományként. De Java   (és így ERDDAP ) csak azonnali dátum+időkkel foglalkozik egy időzónával. Tehát lehet, hogy tudja, hogy a dátumidő adatai helyi időzónán alapulnak (nappali megtakarítási idővel) vagy a GMT/ Zulu időzóna, de Java   (és ERDDAP ) ne. Eredetileg azt gondoltuk, hogy dolgozhatunk ebben a problémában (pl. az oszlop időzónájának meghatározásával) , de az adatbázis + JDBC+ Java az interakciók ezt megbízhatatlan megoldássá tették.
* Szóval, ERDDAP™ megköveteli, hogy az adatbázis táblázatban tárolja az összes dátumot és dátumidő adatait olyan adatbázis-adattípussal, amely megfelel a JDBC típusú "időjármű-időzónával" (ideális, hogy használja a GMT / Zulu Időzóna) ...
* Inkább ERDDAP A datasets.xml , a&lt; dataVariable &gt; címke egy időbélyegző változóhoz, set
    >     [&lt;dataType>double&lt;/dataType>](#datatype)  

és&lt; addAttributes &gt; beállítás
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Javaslat: Ha az adatok egy időtartomány, hasznos, hogy az időbélyegző értékek utalnak a központja a beágyazott időtartomány (Például, nem) ... Például, ha egy felhasználónak van adatai a 2010-03-26T13:00Z-nak egy másik adatkészletből, és szeretnének a legközelebbi adatokat egy adatbázis-adatbázisról, amely minden nap adatokkal rendelkezik, akkor a 2010-03-26T12:00Z adatbázisadatai (az adott dátumra vonatkozó adatok képviselete) nyilvánvalóan a legjobb (mint szemben az éjfél előtt vagy után, ahol kevésbé nyilvánvaló, hogy a legjobb) ...
*    ERDDAP™ haszonnal rendelkezik [Konvertáljon Numeric Idő / sztring idő](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) ...
* Lásd [Hogyan ERDDAP Üzletek az idővel](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) ...
       
#### Integer nulls{#integer-nulls-1} 
Az adatbázisok támogatják a nullákat az integrálóban (Int, kicsiny, tinyint) oszlopok, de ERDDAP™ nem támogatja az igazi nullákat.
Adatbázis nulls lesz átalakítva ERDDAP™ 127 byte oszlopok esetében, 255 az ubyte oszlopok esetében, 32767 rövid oszlopok esetében, 65535 az utólagos oszlopok esetében, 2147483647 int oszlopok esetében, 4294967295 az oszlopok esetében, 9,223,372,036,854,775,807 a hosszú oszlopok esetében, vagy 1844674407551615 az ulong oszlopok esetében. Ha ezeket az alapokat használja, kérjük azonosítsa azokat missing\\_value s az adatkészlet felhasználói számára az ERDDAP™ vele

>    &lt;att name="\\_FillValue" [type="int"](#attributetype)\\>2147483647&lt;/att>  

vagy

>    &lt;att name="\\_FillValue" [type="short"](#attributetype)\\>32767&lt;/att>  

Alternatívaként használhatja a " " missing\\_value "A "\\_FillValue" helyett tulajdonítható.
GenerateDatasets Az Xml automatikusan hozzáadja ezeket a \\_FillValue tulajdonságokat, amikor létrehozza a javasolt datasets.xml adatbázis adatkészletek.

Az adatbázis lebegő pont oszlopok esetében a nullák áttérnek a NaN-ekre ERDDAP ...
Az adatbázis-adattípusok esetében, amelyek a Strings-be kerülnek ERDDAP™ A nullák megtérnek az üres vonásokra.
    
#### Adatbázisbiztonság{#database-security} 
* Amikor adatbázisokkal dolgozol, a lehető legbiztonságosabban és biztonságosan kell elvégeznie a dolgokat, hogy elkerülje, hogy egy rosszindulatú felhasználó károsítsa az adatbázist, vagy hozzáférést szerezzen azokhoz az adatokhoz, amelyekhez nem kell hozzáférnie. ERDDAP™ megpróbálja a dolgokat biztonságos módon is csinálni.
    * Fontolja meg a más számítógépen történő replikációt, az adatbázist és az adatbázis táblákat az Ön által kívánt adatokkal ERDDAP™ szolgálni. (Igen, olyan kereskedelmi adatbázisok esetében, mint Oracle Ez további engedélyezési díjakat tartalmaz. De a nyílt forráskódú adatbázisok, például a PostgreSQL, a MySQL, az Amazon RDS és a MariaDB esetében ez semmibe kerül.) Ez magas szintű biztonságot nyújt, és megakadályozza ERDDAP™ kérelmek az eredeti adatbázis lelassításától.
    * Bátorítunk benneteket, hogy hozzon létre ERDDAP™ az adatbázishoz való csatlakozás adatbázis-felhasználóként, amely csak hozzáférést biztosít az adatbázishoz **releváns** adatbázis (s) és csak READ kiváltságai vannak.
    * Arra bátorítunk benneteket, hogy hozzátok létre a kapcsolatot ERDDAP™ az adatbázisba, hogy
        * mindig használja az SSL-t,
        * csak az egyik IP-címből származó kapcsolatokat engedélyezi (vagy a címek egy blokkja) az egyiktől ERDDAP™ felhasználó és
        * csak átadja a jelszavakat az MD5 formanyomtatványában.
    *    \\[ KNOWN PROBLEM \\] A kapcsolatfeltételek (beleértve a jelszót&#33;) egyszerű szövegként tárolják datasets.xml ... Nem találtunk módot arra, hogy az adminisztrátor belépjen az adatbázis-jelszóba ERDDAP Kezdőlap Tomcatban (amely felhasználói bemenet nélkül történik) Így a jelszót egy fájlban hozzáférhetőnek kell lennie. Hogy ezt biztonságosabbá tegyük:
        * Te vagy (a ERDDAP™ adminisztrátor) legyen a tulajdonosa datasets.xml és van READ és WRITE hozzáférés.
        * Készítsen egy csoportot, amely csak felhasználó=tomcatot tartalmaz. Használja a chgrp-t, hogy a csoport legyen datasets.xml Csak READ kiváltságokkal.
        * Használja a chmod-t az o-rwx kiváltságok hozzárendeléséhez (Nincs READ vagy WRITE hozzáférés a "másik" felhasználókhoz) Mert datasets.xml ...
    * Mikor ERDDAP™ , a jelszó és más kapcsolati tulajdonságokat "magánban" tárolják Java változók.
    * Az ügyfelek kéréseit elválasztják és ellenőrizik az érvényességet, mielőtt létrehozzák az SQL kérelmeit az adatbázishoz.
    * Az adatbázis iránti kérelmeket az SQL PreparedStatements-el készítik, hogy megakadályozzák [SQL injekció](https://en.wikipedia.org/wiki/SQL_injection) ...
    * Az adatbázisra vonatkozó kérelmeket végrehajtottan nyújtják be Irányítás (Nem executeState) korlátozni a kérelmeket, hogy csak olvassák (így próbálta meg az SQL injekciót, hogy megváltoztassa az adatbázist, szintén kudarcot vall.) ...
         
#### SQL{#sql} 
* Mert OPeNDAP „A mesés adatok kéréseit az SQL mesés adatok kéréseire tervezték, könnyű ERDDAP™ a tabuláris adatkérések egyszerű SQL PreparedStatements-be való átalakítása. Például, ERDDAP™ kérés
```
    time,temperature&time>=2008-01-01T00:00:00Z&time&lt;=2008-02-01T00:00:00Z  
```
Az SQL PreparedStatementbe kerül
```
    SELECT "time", "temperature" FROM *tableName*  
    WHERE "time" >= 2008-01-01T00:00:00Z AND "time" &lt;= 2008-02-01T00:00:00Z  
```
 ERDDAP™ kérések &distinct () és/vagy orderBy  ( *változók* ) hozzáadja a DISTINCT-t és/vagy ORDER BY-t *változók* az SQL elkészített nyilatkozatára. Általában ez nagymértékben lelassítja az adatbázis válaszát.
 ERDDAP™ a PreparedStatement bejegyzése [Log.txt](/docs/server-admin/additional-information#log) mint
```
    statement=*thePreparedStatement*  
```
Ez az előkészítés szöveges ábrázolása lesz, amely kissé különbözhet a tényleges PreparedStatementtől. Például az PreparedStatementben az időket különleges módon kódolják. De a szöveges képviseletben úgy tűnik, mint az ISO 8601-es dátumidő.
     
#### Adatbázis sebesség{#database-speed} 
* Az adatbázisok lassúak lehetnek. Van néhány dolog, amit tehetsz:
    * Általános -
Az SQL jellege az, hogy a kérdések [deklaratív](https://en.wikipedia.org/wiki/Declarative_programming) ... Pontosan meghatározzák, mit akar a felhasználó. Nem tartalmaznak specifikációt vagy utalásokat arra, hogy a lekérdezést hogyan kell kezelni vagy optimalizálni. Tehát nincs mód ERDDAP™ a lekérdezés oly módon történő létrehozása, hogy segít az adatbázis optimalizálni a lekérdezést (vagy bármilyen módon meghatározza, hogyan kell kezelni a lekérdezést) ... Általában az adatbázis-adminisztrátortól függ, hogy felállítsa a dolgokat (Például indexek) bizonyos típusú kérdések optimalizálása.
##### Állítsa be a Fetch méretét{#set-the-fetch-size} 
Az adatbázisok visszatérnek az adatokhoz ERDDAP™ zsarukban. Alapértelmezés szerint a különböző adatbázisok különböző sorokat térnek vissza a zsákokban. Gyakran ez a szám nagyon kicsi és nagyon hatástalan. Például az alapértelmezés Oracle 10&#33; Olvassa el az adatbázis JDBC dokumentációját az adatbázis JDBC sofőrjéhez, hogy megtalálja a kapcsolatot, hogy ezt növelje, és add hozzá ezt az adatkészlet leírásához datasets.xml ... Például,
A MySQL és az Amazon RDS esetében használjon
```
        <connectionProperty name="defaultFetchSize">10000</connectionProperty>  
```
A MariaDB esetében jelenleg nincs mód a fetch méret megváltoztatására. De ez egy kért funkció, így keresse meg az internetet, hogy megnézze, hogy ez végrehajtott-e.
Mert Oracle Használat
```
        <connectionProperty name="defaultRowPrefetch">10000</connectionProperty>  
```
PostgreSQL, használat
```
        <connectionProperty name="defaultRowFetchSize">10000</connectionProperty>  
```
de úgy érzi, szabad megváltoztatni a számot. A túl nagy szám beállítása okozza ERDDAP™ sok memóriát használni, és valószínűbb, hogy kifut a memóriából.
#### ConnectionSzövetségek{#connectionproperties} 
Minden adatbázisnak más kapcsolati tulajdonságai vannak, amelyeket meg lehet adni datasets.xml ... Ezek közül sokan hatással lesznek az adatbázis teljesítményére ERDDAP™ kapcsolat. Kérjük, olvassa el a dokumentációt az adatbázis JDBC vezetője számára, hogy lássa a lehetőségeket. Ha olyan kapcsolati tulajdonságokat talál, amelyek hasznosak, küldjön e-mailt a részletekkel erd dot data at noaa dot gov ...
* Készítsen asztalt -
Valószínűleg gyorsabb válaszokat kap, ha rendszeresen (Mindennap? bármikor új adatok vannak?) létrehoz egy tényleges asztalt (Hasonlóképpen, hogyan generálta a VIEW-t) és mondja ERDDAP™ adatokat szerezni az asztalról a VIEW helyett. Mivel az asztal iránti kérelmet ezután be lehet tölteni anélkül, hogy JOINing egy másik asztal, a válasz sokkal gyorsabb lesz.
* Vákuum a táblázat -
MySQL és Amazon RDS sokkal gyorsabban reagál, ha használja [OPTIMIZE TABLE](https://dev.mysql.com/doc/refman/5.7/en/optimize-table.html) ...
Maria A DB sokkal gyorsabban reagál, ha használja [OPTIMIZE TABLE](https://mariadb.com/kb/en/optimize-table/) ...
A PostgreSQL sokkal gyorsabban reagál, ha [VACUUM](https://www.postgresql.org/docs/8.3/static/sql-vacuum.html) az asztal.
     Oracle nincs, vagy nincs szükség analóg parancsra.
* Készülj fel [Indexek](https://en.wikipedia.org/wiki/Database_index) közösen konstruált változók számára -
Felgyorsíthat sok / legtöbb kérdést azáltal, hogy indexeket hoz létre az adatbázisban a változók számára (amelyet az adatbázisok "oszlopoknak" neveznek) gyakran korlátozzák a felhasználó lekérdezését. Általánosságban elmondható, hogy ezek ugyanazok a változók, amelyeket [a [a]&lt; subsetVariables &gt;&gt;&gt;&gt;&gt;&gt; (#subsetvariables) és/vagy a magasság, a hosszúság és az idő változók.
##### Connection Pooling használata{#use-connection-pooling} 
Általában, ERDDAP™ külön kapcsolatot teremt az adatbázissal minden kérésre. Ez a legmegbízhatóbb megközelítés. A gyorsabb alternatíva egy DataSource használata, amely támogatja a kapcsolatfelvételt. Hogy felállítsuk, megadjuk (például)   
```
        <dataSourceName>java:comp/env/jdbc/postgres/erddap</dataSourceName>  
```
jobb mellett&lt; sourceUrl &gt;,&lt;sofőrName&gt; és&lt;kapcsolat Tulajdonság&gt;.
és *Tomcat* /conf/context.xml, definiálja az erőforrást ugyanazokkal az információkkal, például
```
        <Resource  
        name="jdbc/postgres/erddap" auth="Container" type="javax.sql.DataSource"  
        driverClassName="org.postgresql.Driver"  
        url="*jdbc:postgresql://somehost:5432/myDatabaseName*"  
        username="*myUsername*" password="*myPassword*"  
        initialSize="0" maxActive="8" minIdle="0" maxIdle="0" maxWait="-1"/>  
```
Általános információk a DataSource használatáról [https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html) ...
Lásd [Tomcat DataSource információ](https://tomcat.apache.org/tomcat-7.0-doc/jndi-resources-howto.html#JDBC_Data_Sources) és [Tomcat DataSource példák](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html) vagy keresse meg az internetet például az adatszolgáltatások más alkalmazásszerverekkel történő használatával.
* Ha minden más kudarcot vall,
fontolja meg az adatok tárolását egy gyűjteményben NetCDF v3 .nc fájlok (különösen különösen .nc fájlok, amelyek a [CF Discrete Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Ragged Array adatstruktúrák és így kezelhetők ERDDAP A [EDDTableFromNcCFFiles](#eddtablefromnccffiles) ) ... Ha logikailag megszervezik őket (mindegyik adat egy darab űr és idő) , ERDDAP™ nagyon gyorsan kivonhatja az adatokat tőlük.
         
#### EDDTableFromDatabase csontváz XML{#eddtablefromdatabase-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDatabase" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The format varies for each type of database, but will be  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;something like:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MariaDB:    jdbc:mariadb://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MySql       jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Amazon RDS: jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Oracle:     jdbc:oracle:thin:@*xxx.xxx.xxx.xxx*:1521:*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Postgresql: jdbc:postgresql://*xxx.xxx.xxx.xxx*:5432/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where *xxx.xxx.xxx.xxx* is the host computer's numeric IP address  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;followed by :*PortNumber* (4 digits), which may be different for your  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;database.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[driverName](#jdbc-driver)\\>...&lt;/driverName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The high-level name of the database driver, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"org.postgresql.Driver".  You need to put the actual database  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;driver .jar file (for example, postgresql.jdbc.jar) in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*tomcat*/webapps/erddap/WEB-INF/lib.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#database-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "user", "password", and "ssl")  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and values of the properties needed for ERDDAP™ to establish  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the connection to the database.  0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataSourceName>](#use-connection-pooling)...&lt;/dataSourceName>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;catalogName>...&lt;/catalogName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the catalog which has the schema which has the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  OPTIONAL.  Some databases don't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;schemaName>...&lt;/schemaName> &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schema which has the table, default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName>  &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#quotes-for-names-and-case-sensitivity)&lt;columnNameQuotes> &lt;!-- OPTIONAL. Options:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" (the default), ', \\[nothing\\]. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderBy>...&lt;/orderBy>  &lt;!-- A comma-separated list of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[sourceName](#sourcename)s to be used in an ORDER BY clause at the end of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;every query sent to the database (unless the user's request  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;includes an &orderBy() filter, in which case the user's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;orderBy is used).  The order of the sourceNames is important.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The leftmost (first) sourceName is most important; subsequent  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are only used to break ties.  Only relevant  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are included in the ORDER BY clause for a given user  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;request.  If this is not specified, the order of the returned  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;values is not specified. Default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanOrderBy>](#sourcecanorderby)no(default)|partial|yes&lt;/sourceCanOrderBy>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanDoDistinct>](#sourcecandodistinct)no(default)|partial|yes&lt;/sourceCanDoDistinct>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each dataVariable MUST include a [&lt;dataType>](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See [Database DataTypes](#database-datatype).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For [database date and timestamp columns](#database-date-time-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFrom EDDGrid  {#eddtablefromeddgrid} 
 [ **EDDTableFrom EDDGrid ** ](#eddtablefromeddgrid) lehetővé teszi, hogy létrehozzon egy EDDTable adatkészletet bármelyikből EDDGrid adatkészlet.

* Néhány gyakori oka ennek:
    * Ez lehetővé teszi az adatkészlet lekérését OPeNDAP kiválasztási korlátok, amelyek egyfajta "kérdezés érték szerint" (melyik felhasználó kérhette) ...
    * Az adatkészlet eredetileg tabuláris adatkészlet.
* A globális tulajdonság „maxAxis0” értéke (általában a Type="int") , (az alapértelmezett 10) használni fogják a tengelyek számának korlátozását \\[ 0 0 \\]   (általában "time" axis) a bezárt értékek EDDGrid olyan adatkészlet, amely adatok kérése esetén elérhető. Ha nem akarja, hogy legyen bármilyen határ, adja meg a 0 értéket. Ez a beállítás azért fontos, mert különben túl könnyű lenne egy felhasználónak kérni az EDDTableF-t EDDGrid áttekinteni az összes rácsos adatkészlet adatait. Ez hosszú időt vesz igénybe, és szinte biztosan kudarcot vallana egy kiütési hiba miatt. Ez az a beállítás, amely biztonságossá teszi az EDDTableF-t EDDGrid adatkészletek az Ön adataiban ERDDAP Félelem nélkül, hogy a számítási erőforrások ésszerűtlen használatához vezetnek.
* Ha a bezárt EDDGrid egy [ EDDGrid FromErdap](#eddfromerddap) és ERDDAP™ ugyanaz ERDDAP Ezután EDDTableFrom EDDGrid mindig közvetlenül használja a hivatkozott adatkészlet jelenlegi verzióját. Ez egy nagyon hatékony módja az EDDTableF-nek EDDGrid a rácsos adatokhoz való hozzáféréshez.
* Ez az osztály [&lt;újratöltés MindenNMinutes&gt;] (#reloadeveryn percek) az, ami számít. A bezárt EDDGrid A&lt;reloadEveryNMinutes&gt; figyelmen kívül hagyják.
* Ha érték [&lt;frissítésEveryNMillis&gt; (#updateeverynmillis) ez az adatkészlet, figyelmen kívül hagyják. A bezárt EDDGrid A&lt;frissítésEveryNMillis&gt; az, ami számít.
*    [GenerateDatasetsXml](#generatedatasetsxml) lehetősége van az adatkészlet típusára=EDDTableFrom EDDGrid amely egy URL-t kér ERDDAP   (általában ugyanaz ERDDAP )   („/erddap/”) rendszeres kifejezés. GenerateDatasets Az Xml az XML-t egy EDDTableF-re fogja generálni EDDGrid adatkészlet minden egyes rácsos adatkészlethez ERDDAP™ amelynek van egy datasetID amely megfelel a rendszeres kifejezésnek (Használjon .\\*-t, hogy megfeleljen az összes datasetID s a rácsos adatkészletekért) ...
    
Az XML darabja, amelyet a GenerateDatasetsXml generál minden adatkészlethez:
    
    * A datasetID ami az EDDGrid A datasetID plusz "\\_Asatable".
    * Egy új összefoglaló globális tulajdonság, amely a EDDGrid összefoglaló plusz egy új első bekezdés, amely leírja, hogy mi ez az adatkészlet.
    * Egy új cím globális tulajdonság, amely a EDDGrid dalszöveg: 's cím plus', (Mint asztal) "..."
    * Egy új maxAxis0 globális tulajdonság 10 értékkel.
#### EDDTableFrom EDDGrid Skeleton XML{#eddtablefromeddgrid-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromEDDGrid" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromEDDGrid, this calls lowUpdate() of the underlying  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGrid. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataset>](#eddgrid)...&lt;/dataset> &lt;!-- 1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Any type of EDDGrid dataset.  You can even use an  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EDDGridFromERDDAP™ to access an independent EDDGrid dataset on  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this server. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromFileNames{#eddtablefromfilenames} 
 [ **EDDTableFromFileNames** ](#eddtablefromfilenames) adatkészletet hoz létre a szerver fájlrendszerében lévő fájlok csoportjáról, beleértve az egyes fájlok URL-jét, hogy a felhasználók letölthessék a fájlokat a ERDDAP A [ "files" rendszerrendszer](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) ... Ellentétben az összes [EDDTableFromFiles](#eddtablefromfiles) alosztályok, ez az adatkészlet típus nem szolgálja az adatokat a fájlokon belül.

* EDDTableFromFileNames hasznos, ha:
    * Van egy olyan fájlok csoportja, amelyeket egész fájlként szeretne elosztani, mert nem tartalmaznak „adatot” ugyanúgy, ahogyan a rendszeres adatfájlok adatokkal rendelkeznek. Például képfájlok, videofájlok, Word dokumentumok, Excel táblázatok, PowerPoint prezentációs fájlok vagy szövegfájlok strukturálatlan szöveggel.
    * Van egy olyan fájlok csoportja, amelyek olyan formátumban adatokkal rendelkeznek, ERDDAP™ Még nem olvasható. Például egy projektspecifikus, egyedi, bináris formátum.
         
#### EDDTableFromFileNames adatok{#eddtablefromfilenames-data} 
*    [Az adatok egy EDDTableFromFileNames adatkészletben](#eddtablefromfilenames-data) egy asztal, amely ERDDAP™ on-the-fly információt hoz létre a helyi fájlok csoportjáról. Az asztalnál van egy sor minden fájlhoz. Négy különleges tulajdonság a [ datasets.xml ez az adatkészlet](#eddtablefromfilenames-skeleton-xml) meghatározza, hogy mely fájlokat fognak tartalmazni ebben az adatkészletben:
    
##### fájl Dir{#filedir} 
    *   &lt;fájlDir&gt; - Ez meghatározza a szerver fájlrendszerének forráskönyvtárát az adatkészlethez tartozó fájlokkal. Azok a fájlok, amelyek valójában a szerver fájlrendszerében találhatók&lt;fájlDir&gt; jelenik meg az adatkészlet url oszlopában egy virtuális könyvtáron belülhttps://*serverUrl*/erddap/files/*datasetID/*...
Például, ha datasetID jplMU RSS T,
és&lt;fájlDir&gt; /home/data/mur/
és ez a könyvtár egy jplMU nevű fájlt tartalmaz RSS T20150103000000.png,
Ezután az URL, amely a felhasználók számára jelenik meg, hogy ez a fájl lesz
        https://*serverUrl*/erddap/jplMURSST/jplMURSST20150103000000.png...
        
Amellett, hogy egy helyi könyvtárat használunk&lt;fájlDir&gt;, akkor is megadhatja az URL egy távoli, könyvtári-szerű weboldal. Ez működik:
        
        * A nem összesített adatkészletek a THREDDS-ben, például
            https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[ 2020-10-21 Ez a szerver már nem megbízhatóan elérhető. \\] 
        * A nem összesített adatkészletek Hyrax pl.:
             [https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/) 
        * A legtöbb Apache-szerű könyvtári lista, például
             [https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/](https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/) 
##### dalszöveg: OnTheFly{#fromonthefly} 
 [\\*\\*\\*fromOnTheFly](#fromonthefly) - Néhány hatalmas S3 vödör (mint a noaa-goes17, amely 26 millió fájlt tartalmaz) Lehet, hogy ERDDAP™ legfeljebb 12 óra, hogy letöltse az összes információt a tartalmát a vödör (vannak más problémák) ... Ahhoz, hogy körül ezt, van egy speciális módja annak, hogy használja&lt;fájlDir&gt; az EDDTableFromFileNames-ben, hogy adathalmazt készítsen az AWS S3 bucket könyvtárával és fájlneveivel. Az adatkészletnek nem lesz az összes S3 bucket könyvtárának és fájlnevének listája, amelyet a felhasználó kereshet az adatkészlet iránti kérelmeken keresztül. De az adatkészlet megkapja a könyvtárak és fájlok nevét, ha a felhasználó átlépi a könyvtári hierarchiát az adatkészlettel "files" opció. Így ez lehetővé teszi a felhasználók számára, hogy böngészjenek az S3 bucket fájlhierarchiájával és fájlokkal az adatkészleten keresztül "files" rendszer. Ehhez, ahelyett, hogy meghatározná az URL-t az S3 bucket számára, mint a "Starting Directory" (a GenerateDatasets Xml) vagy&lt;fájlDir&gt; (benne datasets.xml ) Használat:
```
\\*\\*\\*fromOnTheFly,*theS3BucketUrl*  
```
Például:
```
\\*\\*\\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/  
```
Lásd a dokumentációt [S3 Buckets-szel dolgozunk ERDDAP™ ](#working-with-aws-s3-files) , nevezetesen a specifikus formátum leírása, amelyet az S3 bucket URL-hez kell használni. És nézd meg
 [ezek a részletek és példák](#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket) használat\\*\\*\\*fromOnTheFly.
        
##### ismétlődő{#recursive} 
*   &lt;visszatérő&gt; - Files in Subdirectors of the&lt;fájlDir&gt; olyan nevekkel, amelyek megfelelnek&lt;fájlRegex&gt; ugyanazon albizottságokban jelenik meg "files" URL, ha&lt;Az ismétlődő&gt; igaz. Az alapértelmezés hamis.
* [[szerkesztés]]&lt;PaintRegex&gt;] (#pathregex) - Ha visszatérő=igaz, csak a könyvtár nevek, amelyek megfelelnek az útvonalnakRegex (default=".\\*") elfogadják. Ha visszatérő=hamis, ezt figyelmen kívül hagyják. Ezt ritkán használják, de nagyon hasznos lehet a szokatlan körülmények között. (Lásd ezt [regex dokumentáció](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) és [regex bemutató](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ...) 
##### fájlkezelő{#fileregex} 
*   &lt;fileRegex&gt; - Csak a fájlnév, ahol az egész fájlnév (nem tartalmazza a könyvtár nevét) Meccs&lt;A fájlRegex&gt; szerepel ebben az adatkészletben. Például a jplMU RSS T.&#123;14.png . (Lásd ezt [regex dokumentáció](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) és [regex bemutató](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ...)   
         
##### File nevek Adattáblázat Tartalmak{#from-file-names-data-table-contents} 
Az asztalnál oszlopok lesznek:
* url - Az URL, amelyet a felhasználók használhatnak a fájl letöltéséhez ERDDAP A [ "files" rendszerrendszer](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) ...
* név - A fájl neve (könyvtári név nélkül) ...
* Utolsó módosítás - Az idő, amikor a fájlt legutóbb módosították (duplákként tárolva "seconds since 1970-01-01T00:00:00Z" ) ... Ez a változó azért hasznos, mert a felhasználók láthatják, hogy egy adott fájl tartalma megváltozott-e. Ez a változó egy [Idő Stamp változó](#timestamp-variables) Így az adatok numerikus értékként jelenhetnek meg (másodpercek 1970-01-01T00:00Z) vagy erős érték (ISO 8601:2004 (EZ) formátum) a helyzettől függően.
* méret - A fájl mérete byte-ben, duplaként tárolva. Duplán tárolják őket, mert egyes fájlok nagyobbak lehetnek, mint a betűk lehetővé teszik, és a hosszúságokat nem támogatják valamilyen válaszfájltípusban. A duplák pontos méretet adnak, még nagyon nagy fájlokat is.
* kiegészítő oszlopok, amelyeket a ERDDAP™ adminisztrátor a fájlnévből kivont információkkal (Például az adatokhoz kapcsolódó idő a fájlban) két tulajdonság alapján, amelyet minden további oszlop/ dataVariable :
    
    * ExtractRegex - Ez egy [rendszeres kifejezés](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) ... Az egész regexnek meg kell felelnie az egész fájlnévnek (nem tartalmazza a könyvtár nevét) ... A regexnek tartalmaznia kell legalább egy rögzítő csoportot (a parentézisek által bezárt rendszeres kifejezés egy része) melyik ERDDAP™ azon felhasználások, amelyek meghatározzák, hogy a fájlnév melyik része kivonja az adatokat.
    * Kivonat Csoport -- Ez a rögzítő csoport száma (# 1 az első rögzítő csoport) rendszeres kifejezésben. Az alapértelmezett 1 A rögzítő csoport egy olyan rendszeres kifejezés része, amelyet a parentheses zár.
    
Íme két példa:
```
            <dataVariable>
                <sourceName>time</sourceName>
                <destinationName>time</destinationName>
                <dataType>String</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST(.{14})\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="units">yyyyMMddHHmmss</att>
                </addAttributes>
            </dataVariable>
```
```
            <dataVariable>
                <sourceName>day</sourceName>
                <destinationName>day</destinationName>
                <dataType>int</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST.{6}(..).{6}\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="ioos\\_category">Time</att>
                </addAttributes>
            </dataVariable> 
```
Abban az esetben, ha egy fájl van a neve jplMU RSS T20150103000000.png, a kivonatRegex megfelel a fájlnévnek, kivonja azokat a karaktereket, amelyek megfelelnek az első rögzítő csoportnak ("20150103000000") adatType=String, majd használja a [A szigorú időkre alkalmas egységek](#string-time-units) a sztrájkok időbeli adatértékekbe való felosztása (2015-01-03T00:00Z) ...

A nap változója esetén, ha egy fájl rendelkezik a jplMU névvel RSS T20150103000000.png, a kivonatRegex megfelel a fájlnévnek, kivonja azokat a karaktereket, amelyek megfelelnek az első rögzítő csoportnak ("03") [[szerkesztés]]&lt;adatType&gt;] (#datatype) \\=int, a 3. adatérték elszámolása
        
#### Egyéb információk{#other-information} 
* [[szerkesztés]]&lt;frissítésEveryNMillis&gt; (#updateeverynmillis) - Ez a fajta adatkészlet nem igényel és nem tudja használni&lt;frissítésEveryNMillis&gt; címke, mert az EDDTableFromFileNames által szolgáltatott információk mindig tökéletesen naprakészek, mert ERDDAP™ kéri a fájlrendszert annak érdekében, hogy válaszoljon minden adatkérésre. Még akkor is, ha számos fájl létezik, ez a megközelítésnek ésszerűen jól kell működnie. A válasz lassú lehet, ha számos fájl van, és az adathalmazt egy ideig nem kérték. De néhány perc múlva az operációs rendszer tartsa az információt egy gyorsítótárban, így a válaszoknak nagyon gyorsnak kell lenniük.
     
* Használhatja a [GenerateDatasets Xml program](#generatedatasetsxml) Hogy a datasets.xml cunk az ilyen típusú adatkészlethez. További oszlopokat adhat hozzá / definiálhat a fájlnévből kivont információkkal, amint azt fentebb mutatják.
     
#### EDDTableFromFileNames csontváz XML{#eddtablefromfilenames-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromFileNames" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileDir>](#eddtablefromfilenames-data)...&lt;/fileDir>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;recursive>](#eddtablefromfilenames-data)...&lt;/recursive>  &lt;!-- true or false (the default) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileNameRegex>](#eddtablefromfilenames-data)...&lt;/fileNameRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include [&lt;dataType>](#datatype) tag. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromFiles{#eddtablefromfiles} 
 [ **EDDTableFromFiles** ](#eddtablefromfiles) az összes EDDTableF felülete... Files osztályok. Nem használhatja az EDDTableFromFiles-t közvetlenül. Ehelyett használja az EDDTableFromFiles alosztályát, hogy kezelje az adott fájltípust:

*    [EDDTableFromAsciiFiles](#eddtablefromasciifiles) összesíti az adatokat a comma-tól, a tab-tól, a szemicolon-tól, vagy az űrválasztott tabuláris ASCII adatfájloktól.
*    [EDDTableFromAudioFiles](#eddfromaudiofiles) összesíti az adatokat egy csoport helyi audio fájlokat.
*    [EDDTableFrom AwsXmlFiles](#eddtablefromawsxmlfiles) összesíti az adatokat egy sor Automatic Weather Station (AWS) XML fájlok.
*    [EDDTableFromColumnarAsciiFiles](#eddtablefromcolumnarasciifiles) összesíti a tabuláris ASCII adatfájlok adatait rögzített szélességi adatoszlopokkal.
*    [EDDTableFrom Hyrax Fiók](#eddtablefromhyraxfiles)   (Meghatározva) összesíti az adatokat több változóval, mindegyik közös dimenzióval (Például, idő, magasság (vagy mélység) , magasság, hosszúság) és szolgált egy [ Hyrax   OPeNDAP szerver](https://www.opendap.org/software/hyrax-data-server) ...
*    [EDDTableFromInvalidCRAFiles](#eddtablefrominvalidcrafiles) összesített adatok NetCDF   (v3 vagy v4)   .nc fájlok, amelyek egy adott, érvénytelen, változata a CF DSG Contiguous Ragged Array (CRA) fájlok. Bár ERDDAP™ támogatja ezt a fájltípust, ez egy érvénytelen fájltípus, amelyet senkinek nem kell használnia. Azok a csoportok, amelyek jelenleg ezt a fájltípust használják, erősen ösztönzik a használatra ERDDAP™ hiteles CF DSG CRA fájlok generálására, és hagyja abba ezeket a fájlokat.
*    [EDDTableFromJsonlCSVFiles](#eddtablefromjsonlcsvfiles) összesített adatok [JSON Lines CSV fájlok](https://jsonlines.org/examples/) ...
*    [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) összesített adatok NetCDF   (v3 vagy v4)   .nc   (vagy [ .nc ml ml](#ncml-files) ) több változóval rendelkező fájlok, mindegyik közös dimenzióval (Például, idő, magasság (vagy mélység) , magasság, hosszúság) ...
*    [EDDTableFromNcFiles](#eddtablefromncfiles) összesített adatok NetCDF   (v3 vagy v4)   .nc   (vagy [ .nc ml ml](#ncml-files) ) több változóval rendelkező fájlok, mindegyik közös dimenzióval (Például, idő, magasság (vagy mélység) , magasság, hosszúság) ... Jó, ha továbbra is használja ezt az adatkészlettípust a meglévő adatkészletekhez, de új adatkészletek esetében inkább az EDDTableFromMultidimNcFiles használatát javasoljuk.
*    [EDDTableFromNcCFFiles](#eddtablefromnccffiles) összesített adatok NetCDF   (v3 vagy v4)   .nc   (vagy [ .nc ml ml](#ncml-files) ) fájlokat, amelyek az egyik fájlformátumot használják, amelyet a [CF Discrete Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) egyezmények. De az egyik multidimenzionális CF DSG változatot használó fájlokhoz, használjon [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) Ehelyett.
*    [EDDTableFromNccsvFiles](#eddtablefromnccsvfiles) összesített adatok [NCCSV](/docs/user/nccsv-1.00) ASCII .csv fájlok.
*    [EDDTableFromParquetFiles](#eddtablefromparquetfiles) adatok kezelése [Parquet](https://parquet.apache.org/) ...
*    [EDDTableFromThreddsFiles](#eddtablefromthreddsfiles)   (Meghatározva) összesíti a fájlok adatait több változóval, amelyeket megosztott dimenziók szolgálnak egy [Hírek OPeNDAP szerver](https://www.unidata.ucar.edu/software/tds/) ...
*    [EDDTableFrom WFS Fiók](#eddtablefromwfsfiles)   (Meghatározva) helyi másolatot készít az összes adatról egy ArcGIS MapServer WFS szerver, így az adatok gyorsan továbbíthatók ERDDAP™ felhasználók.

Jelenleg nem támogatnak más fájltípusokat. De általában viszonylag könnyű támogatni más fájltípusokat. Lépjen kapcsolatba velünk, ha van kérése. Vagy, ha az adatai egy régi fájlformátumban vannak, amelyet el akarsz költözni, javasoljuk, hogy a fájlok átalakítása legyen NetCDF v3 .nc fájlok (és különösen .nc fájlok a [CF Discrete Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Ragged Array adatstruktúra - ERDDAP™ nagyon gyorsan kivonhatja az adatokat) ... NetCDF széles körben támogatott, bináris formátum, lehetővé teszi a gyors véletlenszerű hozzáférést az adatokhoz, és már támogatott ERDDAP ...

#### FromFiles részletek{#fromfiles-details} 
A következő információ az EDDTableFromFiles összes alosztályára vonatkozik.
##### Aggregáció{#aggregation} 
Ez az osztály összesíti az adatokat a helyi fájlokból. Minden fájl tart egy (viszonylag) kis adattáblázat.
    * Az ebből eredő adatkészlet úgy tűnik, mintha az összes fájl tábláját kombinálták volna (az adatok összes sora a #1 fájlból, plusz az összes sor a #2 fájlból, ...) ...
    * A fájloknak nem mindegyiküknek rendelkeznie kell a megadott változókkal. Ha egy adott fájl nem rendelkezik meghatározott változóval, ERDDAP™ szükség szerint hozzáadja a hiányzó értékeket.
    * A változók az összes fájl MUST ugyanazokat az értékeket a [ add\\_offset ](#scale_factor) , [ missing\\_value ](#missing_value) , [\\_Töltés Érték](#missing_value) , [ scale\\_factor ](#scale_factor) és [egység](#units) tulajdonságok (ha valaki) ... ERDDAP™ ellenőrzések, de ez egy tökéletlen teszt - ha különböző értékek vannak, ERDDAP nem tudja, melyik helyes, ezért milyen fájlok érvénytelenek. Ha ez egy probléma, akkor használható lehet [NcML](#ncml-files) vagy [ NCO ](#netcdf-operators-nco) a probléma megoldására.
         
##### Elnyomott fájlok{#compressed-files} 
A forrásadat fájlok az összes EDDTableFromFiles alosztály számára külsőleg tömöríthetők (pl.: .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 vagy .Z) ... Lásd: [Külsőleg elnyomott fájldokumentáció](#externally-compressed-files) ...
     
##### Cached File Információ{#cached-file-information-1} 
* Amikor az EDDTableFromFiles adatkészletet először töltik be, az EDDTableFromFiles az összes releváns fájlból olvas információkat, és táblázatokat hoz létre (Egy sor minden fájlhoz) minden érvényes fájlról és minden "rossz" (különböző vagy érvénytelen) fájl.
    * Az asztalokat is tárolják a lemezen, mint NetCDF v3 .nc fájlok *bigParentDirectory[szerkesztés]* /dataset/ *Last2CharsOfDatasetID* / * datasetID * / fájlok neve:
dirTable .nc   (amely az egyedi könyvtár nevek listáját tartalmazza) ,
fájl táblázat .nc   (amely az asztalt minden érvényes fájl információjával tartja) ,
rosszfiókok .nc   (amely az asztalt minden rossz fájl információjával tartja) ...
    * Az EDDTableFromFiles adatkészlethez való hozzáférés felgyorsítása (de több memóriát használva) Használhatja
[[szerkesztés]]&lt;fájlTableInMemory&gt; Igaz&lt;/fileTableInMemory&gt;] (#filetableinmemory)   
Mondd el ERDDAP™ tartsa a fájlinformációs táblák másolatát az emlékezetben.
    * A lemezen található fájlinformációs táblák másolata akkor is hasznos, ha ERDDAP™ le van zárva és újraindítva: megmenti az EDDTable-t A Files-től, hogy újra kell olvasnia az összes adatfájlot.
    * Amikor egy adatkészletet újratöltik, ERDDAP™ csak az adatokat kell olvasni az új fájlokban és fájlokban, amelyek megváltoztak.
    * Ha egy fájlnak más szerkezete van a többi fájlból (Például egy másik adattípus az egyik változó számára, vagy egy másik érték a " [egység](#units) - tulajdonság) , ERDDAP hozzáadja a fájlt a "rossz" fájlok listájához. Információk a probléma a fájl lesz írva a *bigParentDirectory[szerkesztés]* /logs/log.txt fájl.
    * Soha nem kell törölnie vagy dolgoznia ezeket a fájlokat. Az egyik kivétel: ha még mindig megváltoztatja az adatkészletet datasets.xml beállítás, lehet, hogy törölni ezeket a fájlokat kényszeríteni ERDDAP™ az összes fájl újraindítása, mivel a fájlokat másképp olvassák/értelmezik. Ha valaha is törli ezeket a fájlokat, akkor megteheti, ha ERDDAP™ fut. (Ezután állítsa be a [zászló](/docs/server-admin/additional-information#set-dataset-flag) az adatkészlet újratöltése ASAP.) Azonban, ERDDAP™ általában észreveszi, hogy a datasets.xml az információ nem egyezik a fájllal Asztalinformációk és a fájltáblák automatikusan törlése.
    * Ha bátorítani akarsz ERDDAP™ a tárolt adatkészlet információjának frissítése (például, ha csak hozzáadott, eltávolított vagy módosított néhány fájlt az adatkészlet adattárához) Használja a [zászlórendszer](/docs/server-admin/additional-information#flag) Kényelem ERDDAP™ a csatolt fájlinformációk frissítése.
         
##### Kérések kezelése{#handling-requests-1} 
*    ERDDAP™ A tabuláris adatkérések korlátozódhatnak bármilyen változóra.
    * Amikor az ügyfél adatkérelme feldolgozásra kerül, az EDDTableFromFiles gyorsan megtekintheti az asztalt az érvényes fájlinformációkkal, hogy megnézze, mely fájlok lehetnek releváns adatok. Például, ha minden forrásfájl rendelkezik az adatok egy rögzített elhelyezkedésű buoy, EDDTableFromFiles nagyon hatékonyan meghatározhatja, hogy mely fájlok lehetnek adatok egy adott hosszúsági tartományban és a szélességi tartományban.
    * Mivel az érvényes fájlinformációs táblázat tartalmazza az összes változó minimális és maximális értéket minden érvényes fájl esetében, az EDDTableFromFiles gyakran képes kezelni más kérdéseket meglehetősen hatékonyan. Például, ha néhány buoys nem rendelkezik levegőnyomás-érzékelővel, és az ügyfél kéri az adatokat a AirPressure&#33;=NaN, EDDTableFromFiles hatékonyan meghatározhatja, hogy melyik buoys légnyomás-adatokkal rendelkezik.
         
##### A Cached File információ frissítése{#updating-the-cached-file-information-1} 
Amikor az adatkészletet újratöltik, a csésze fájlinformációkat frissítik.
    
* Az adatkészletet rendszeresen újratöltik, amint azt a&lt;reloadEveryNMinutes&gt; az adatkészlet információiban datasets.xml ...
* Az adatkészletet a lehető leghamarabb újratöltik, ha ERDDAP™ kimutatja, hogy hozzáadott, eltávolított, [touch'd](https://en.wikipedia.org/wiki/Touch_(Unix) ) (a fájl utolsó módosítása Módosított idő) vagy módosított egy adatszűrőt.
* Az adatkészlet a lehető leghamarabb újratöltődik, ha használja [zászlórendszer](/docs/server-admin/additional-information#flag) ...

Amikor az adatkészletet újratöltik, ERDDAP™ összehasonlítja a jelenleg rendelkezésre álló fájlokat a csatolt fájlinformációs táblázathoz. Új fájlokat olvasnak és hozzáadnak az érvényes fájlok táblázatához. Azok a fájlok, amelyek már nem léteznek, az érvényes fájlok táblájából származnak. Azok a fájlok, ahol a fájl-időmérő változott, olvashatók, és az információjuk frissül. Az új táblák felváltják a régi táblákat a memória és a lemezen.
     
##### Bad Files{#bad-files-1} 
A rossz fájlok táblázata és az okok, amelyeket a fájlok rossznak nyilvánították (korrupt fájl, hiányzó változók, helytelen tengelyértékek stb.) e-mailben van az e-mailben Minden E-mail cím (valószínűleg te) Minden alkalommal, amikor az adatkészletet újratöltik. A lehető leghamarabb fel kell cserélnie vagy javítania ezeket a fájlokat.
     
##### Elhagyni a változókat{#missing-variables-1} 
Ha néhány fájl nem rendelkezik néhányat dataVariable az adatkészletben meghatározott datasets.xml cunk, ez rendben van. Amikor az EDDTableFromFiles elolvassa az egyik ilyen fájlt, úgy fog működni, mintha a fájl volt a változó, de minden hiányzó érték.
     
##### Közel valós idejű adatok{#near-real-time-data} 
* Az EDDTableFromFiles a legutóbbi adatok iránti kérelmeket különleges esetként kezeli. A probléma: Ha az adatkészletet készítő fájlokat gyakran frissítik, valószínűleg az adatkészletet nem frissítik minden alkalommal, amikor egy fájlt változnak. Tehát az EDDTableFromFiles nem fogja tudni a módosított fájlokat. (Használhatja a [zászlórendszer](/docs/server-admin/additional-information#flag) De ez vezethet ERDDAP™ az adatkészlet újratöltése szinte folyamatosan. Tehát a legtöbb esetben nem ajánljuk.) Ehelyett az EDDTableFromFiles a következő rendszerrel foglalkozik: Mikor ERDDAP™ kérelmet kap az adatokat az elmúlt 20 órában (például 8 órával ezelőtt, egészen mostanáig) , ERDDAP™ Minden olyan fájlt keres, amely az elmúlt 20 órában adatokkal rendelkezik. Így, ERDDAP™ nem kell tökéletesen naprakész adatokat tartalmaznia az összes fájl számára, hogy megtalálja a legújabb adatokat. Még mindig meg kell határozni [&lt;újratöltés MindenNMinutes&gt;] (#reloadeveryn percek) ésszerűen kicsi érték (például 60) de nem kell kicsinek lennie (Például 3) ...
     
    *    **Nem ajánlott** a közeli valós idejű adatok szervezése a fájlokban: Ha például van olyan adatkészleted, amely számos állomásra tárol adatokat (vagy buoy, vagy trajectory, ...) Sok éven át rendezheti a fájlokat, hogy például van egy fájl állomásonként. De akkor minden alkalommal, amikor új adatok érkeznek egy állomásra, el kell olvasnia egy nagy régi fájlt, és írnia kell egy nagy új fájlt. És mikor ERDDAP™ visszatölti az adatkészletet, észreveszi, hogy néhány fájlt módosítottak, így teljesen elolvassa ezeket a fájlokat. Ez nem hatékony.
         
    *    **Ajánlott** a közeli valós idejű adatok szervezése a fájlokban: Tárolja az adatokat a zsákokban, például az összes adatot egy állomásra/buoy/trajectory egy évig (vagy egy hónap) ... Aztán, amikor egy új datum érkezik, csak a fájl az idei (vagy hónap) Az adatokat érintik.
        
        * Legjobb: Használat NetCDF v3 .nc korlátlan dimenzióval rendelkező fájlok (Idő) ... Ezután, új adatok hozzáadásához csak módosíthatja az új adatokat anélkül, hogy el kell olvasnia és újraírnia az egész fájlt. A változás nagyon hatékonyan és lényegében atomikusan történik, így a fájl nem mindig egy következetlen állapotban van.
        * Egyébként: Ha nem / nem használ .nc korlátlan dimenzióval rendelkező fájlok (Idő) Ezután, ha új adatokat kell hozzáadnia, el kell olvasnia és újraírnia az egész érintett fájlt (remélhetőleg kicsi, mert csak egy éve van (vagy hónap) adatok értéke) ... Szerencsére az előző évek összes fájlja (vagy hónap) mert az állomás változatlan marad.
        
mindkét esetben, amikor ERDDAP™ visszatölti az adatkészletet, a legtöbb fájl változatlan; csak néhány, kis fájlok változott, és olvasni kell.
         
##### Rendezők{#directories-1} 
A fájlok lehetnek egy könyvtárban, vagy egy könyvtárban és az aláírókban (ismétlődően) ... Ha nagyszámú fájl van (Például:&gt;1,000) , operációs rendszer (és így az EDDTableFromFiles) sokkal hatékonyabban fog működni, ha a fájlokat egy sor aláíróban tárolja (egy évente, vagy havonta egy adatkészletek nagyon gyakori fájlokkal) Annak érdekében, hogy soha ne legyen sok fájl egy adott könyvtárban.
     
##### Távoli könyvtárak és HTTP Range kérések{#remote-directories-and-http-range-requests-1} 
*    **Távoli könyvtárak és HTTP Range kérések**   (AKA Byte Serving, Byte Range kérések) -
     EDDGrid FromNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles és EDDTableFromNcCFFiles, néha szolgálhat adatokat .nc fájlok távoli szervereken és a HTTP-n keresztül elérhetők, ha a szerver támogatja [Byte Serving](https://en.wikipedia.org/wiki/Byte_serving) HTTP tartományi kérések (HTTP mechanizmus a byte szolgáló) ... Ez azért lehetséges, mert netcdf-java (melyik ERDDAP™ Használat az olvasáshoz .nc fájlok) támogatja az adatok távolról történő olvasását .nc fájlok HTTP tartomány kérések.
    
     **Ne csináld ezt&#33;**   
Ehelyett használja a [[szerkesztés]]]&lt;cacheFromUrl&gt; rendszer (#cachefromurl) ...
    
##### CacheFromUrl{#cachefromurl} 
* [[szerkesztés]] ** &lt;cacheFromUrl&gt; ** ] (#cachefromurl) -
Minden EDDGrid FromFiles és az összes EDDTableFromFiles adatkészlet támogatja egy sor címkét, amelyek elmondják ERDDAP™ letölteni és fenntartani egy másolatot az összes távoli adatkészlet fájlok, vagy egy csésze néhány fájl (letöltve, amennyire szükséges) ... **Ez egy hihetetlenül hasznos funkció.** 
    * A&lt;cacheFromUrl&gt; címke lehetővé teszi, hogy megadja az URL-t egy távoli adatkészlet fájlainak listájával egy távoli fájllistából.
        
        * A nem összesített adatkészletek a THREDDS-ben, például
            https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[ 2020-10-21 Ez a szerver már nem megbízhatóan elérhető. \\] 
        * A nem összesített adatkészletek Hyrax pl.:
             [https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/) 
        * A legtöbb Apache-szerű könyvtári lista, például
             [https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/](https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/) 
        * S3 vödör, pl.
             [https://noaa-goes17.s3.us-east-1.amazonaws.com/](https://noaa-goes17.s3.us-east-1.amazonaws.com/)   
Ez azonban AWS-fiókot és több beállítást igényelhet.
Lásd [S3 Buckets-szel dolgozunk ERDDAP™ ](#working-with-aws-s3-files) ...
Továbbá, általában nem kell használni a cache FromUrl fájlokkal S3 buckets, ha a fájlok ASCII fájlok (pl.: .csv) mert ERDDAP™ hatékonyan olvassa el az adatokat a vödörről közvetlenül egy patakon keresztül.
        
         ERDDAP™ lemásolja vagy lekapcsolja ezeket a fájlokat az adatkészletben&lt;fájlDir&gt; könyvtár. Ha szüksége van egy másik típusú távoli fájllistára (pl. FTP) Kérjük, küldje el a kérését Chrisnek. John at noaa.gov.
        
        * Az alapértelmezett érték a&lt;cacheFromUrl&gt; címke null. Ha nem adja meg az értéket&lt;cacheFromUrl&gt; címke, a copy/cache rendszer nem használható az adatkészlethez.
        * Ha az adatkészlet&lt;fileRegex&gt; a beállítás valami más, mint .\\*, ERDDAP™ csak letölteni fájlokat, amelyek megfelelnek a fájlRegex.
        * Ha az adatkészlet&lt;visszaszerző&gt; beállítás igaz, és a távoli fájlok közvetettek, ERDDAP™ olyan távoli előirányzatokban fog megjelenni, amelyek megfelelnek az adatkészletnek [&lt;PaintRegex&gt;] (#pathregex) , hozzon létre ugyanazt a könyvtári struktúrát helyileg, és helyezze a helyi fájlokat ugyanabban az alirányítókban.
        * A GenerateDatasets Xml, ha megadja a&lt;cacheFromUrl&gt; érték, Generáció Adatkészletek Xml létrehozza a helyi&lt;fájlDir&gt; könyvtár és másoljon 1 távoli fájlt. GenerateDatasets Az Xml ezután generálja datasets.xml cunk ezen mintafájl alapján (minta meghatározása File=nem) ...
        * Ha az adatforrás távoli ERDDAP™ Használat [ EDDGrid FromErdap](#eddfromerddap) vagy [EDDTableFromErddap](#eddfromerddap) helyette&lt;cacheFromUrl&gt;. Így, a helyi ERDDAP™ Úgy tűnik, hogy az adatkészlet, de nem kell tárolni az adatokat helyileg. Az egyetlen ok a használatra&lt;cacheFromUrl&gt; az adatok távolról ERDDAP™ akkor van, ha van más oka annak, hogy miért akarja az adatfájlok helyi másolatát. Ebben az esetben:
            * Ez az adatkészlet megpróbálja feliratkozni a távoli adatkészletre ERDDAP hogy az adatkészlet változásai ezt az adatkészlet zászlaját fogják hívni Url, ezzel a helyi adatkészlettel, hogy újratöltse és letöltse a módosított távoli fájlokat. Így a helyi adatkészlet hamarosan naprakész lesz, miután a változások a távoli adatkészlethez kerülnek.
            * E-mailt kell küldenie a távoli adminisztrátornak ERDDAP™ Kérdezd meg datasets.xml a távoli adathalmaz számára, hogy az adathalmazt a helyi ERDDAP™ Úgy néz ki, mint a távoli adatkészlet ERDDAP ...
        * Ha az adatforrás távoli ERDDAP™ A helyi adatkészlet megpróbálja feliratkozni a távoli adatkészletre.
            * Ha az előfizetés sikerül, bármikor a távoli ERDDAP reloads és új adatokkal rendelkezik, felveszi a kapcsolatot a flagURL-rel az adatkészlethez, ami lehetővé teszi az új és/vagy megváltozott adatfájlok újratöltését és letöltését.
            * Ha az előfizetés kudarcot vall (bármilyen okból) vagy ha egyszerűen azt szeretnénk biztosítani, hogy a helyi adatkészlet naprakész legyen, beállíthat egy [zászló](/docs/server-admin/additional-information#flag) a helyi adatkészlet esetében, így újratöltődik, így ellenőrizni fogja az új és/vagy módosított távoli adatfájlokat.
        * Ha az adatforrás nem egy távoli ERDDAP : az adatkészlet ellenőrzi az új és/vagy módosított távoli fájlokat, amikor visszatölti. Normális esetben ezt ellenőrzi [a]&lt;újratöltés MindenNMinutes&gt;] (#reloadeveryn percek) ... De ha tudod, mikor vannak új távoli fájlok, beállíthatsz egy [zászló](/docs/server-admin/additional-information#flag) a helyi adatkészlet esetében, így újratölti és ellenőrizi az új és/vagy módosított távoli adatfájlokat. Ha ez rutinszerűen történik egy bizonyos napon (pl.: 7 órakor) Cron munkát végezhet a használathoz curl Kapcsolatba lépni a zászlóval Üdvözöljük ezt az adatkészletet, ezért újratölti és ellenőrizi az új és/vagy módosított távoli adatfájlokat.
    * A&lt;cacheSizeGB&gt; címke meghatározza a helyi cache méretét. Valószínűleg csak akkor kell használnia, ha olyan felhőtároló rendszerekkel dolgozol, mint például [Amazon S3](https://aws.amazon.com/s3/) amely egy általánosan használt tárolórendszer, amely része [Amazon Web Services (AWS) ](https://aws.amazon.com/) ... Az alapértelmezettség -1.
        * Ha az érték&lt;=0 (pl. az -1 alapértelmezett értéke) ,
             ERDDAP™ letölteni és fenntartani egy **Teljes másolat** az összes távoli adatkészlet fájlja az adatkészletben&lt;fájlDir&gt;.
            * Ez az a beállítás, amelyet bármikor ajánlott.
            * Minden alkalommal, amikor az adatkészletet újratöltik, összehasonlítja a távoli fájlok és a helyi fájlok neveit, méreteit és LastModified időit, és letölti az új vagy megváltozott távoli fájlokat.
            * Ha egy távoli szerveren lévő fájl eltűnik, ERDDAP™ nem törli a megfelelő helyi fájlt (egyébként, ha valami átmenetileg rossz volt a távoli szerverrel, ERDDAP™ törölhet néhány vagy az összes helyi fájlt&#33;) ...
            * Ezzel a beállítással általában beállítja&lt;frissítésEveryNMillis&gt; -1-re, mivel az adatkészlet tisztában van azzal, hogy új adatfájlokat telepített be.
        * Ha az érték &gt;0,
             ERDDAP™ letölti a távoli adatkészletből származó fájlokat, amennyire szükséges egy helyi **Húsvét** (az adatkészletben&lt;fájlDir&gt;) a megadott számú GB küszöbértékével.
            * A gyorsítótárnak elég nagynak kell lennie ahhoz, hogy legalább több adatfájlot tartson.
            * Általában a nagyobb a gyorsaság, annál jobb, mert a következő kért adatfájl nagyobb valószínűséggel lesz a gyorsaságban.
            * Caching csak akkor használható, ha ERDDAP™ fut egy felhő számítástechnikai szerveren (pl. egy AWS-kompatippus) és a távoli fájlok felhőtároló rendszerben (pl.: AWS S3) ...
            * Amikor a helyi fájlok által használt lemezterület meghaladja a cache-t SizeGB, ERDDAP™ hamarosan (Lehet, hogy nem azonnal) törleszteni néhány csésze fájlt (jelenleg a legkevésbé használt legutóbbi (LRU) algoritmus) amíg a helyi fájlok által használt lemezterület nem&lt;0.75\\*cacheSizeGB (A "goal") ... Igen, vannak olyan esetek, amikor az LRU nagyon rosszul teljesít – nincs tökéletes algoritmus.
            *    ERDDAP™ Soha nem próbálja törölni egy csésze fájlt ERDDAP™ az utolsó 10 másodpercben kezdtek használni. Ez egy tökéletlen rendszer, amely kezeli a cache rendszert, és az adatfájl-olvasó rendszert csak lazaan integrálják. E szabály miatt, ERDDAP™ Lehet, hogy nem tudja törölni elég fájlokat, hogy elérje a célját, amely esetben a WARNING-t nyomtatja a log.txt fájlba, és a rendszer sok időt veszteget, hogy megpróbálja megdönteni a gyorsítótárat, és lehetséges, hogy a fájlok mérete a cacheSizeGB-t nagymértékben meghaladhatja. Ha ez megtörténik, használjon nagyobb cacheSizeGB beállítást az adatkészlethez.
            * Jelenleg, ERDDAP™ Soha nem ellenőrzi, hogy a távoli szerver rendelkezik-e egy olyan fájl új verziójával, amely a helyi cache-ban van. Ha szüksége van erre a funkcióra, kérjük, e-mailben Chris. John at noaa.gov.
        * Bár ugyanazok a címke nevek használata azt jelenti, hogy a másolatrendszer és a cache rendszer ugyanazt az alaprendszert használja, ami nem helyes.
            * A másolatrendszer proaktívan indítja el a feladatotHárom feladatot, hogy minden alkalommal letöltse az új és megváltozott fájlokat, amikor az adatkészletet újratöltik. Csak olyan fájlok, amelyek ténylegesen másoltak a helyi könyvtárban, elérhetők a ERDDAP™ adatkészlet.
            * A cache rendszer minden alkalommal megkapja a távoli fájllistát, amikor az adatkészletet újratöltik, és úgy tesz, hogy ezek a fájlok mindegyike elérhető. ERDDAP™ adatkészlet. Érdekes, hogy az összes távoli fájl még az adatkészlet /files / weboldalakon is megjelenik, és letölthető (Bár talán csak késés után, míg a fájlt először letöltik a távoli szerverről a helyi gyorsítótárba.) 
        * Azok az adatok, amelyek a cacheSizeGB-t használják, előnyösek lehetnek egy [nHárom](#nthreads) nagyobb beállítás, mint 1, mert ez lehetővé teszi, hogy az adatkészlet több mint 1 távoli fájl egy időben.
    * A&lt;cachePartialPathRegex&gt; címke egy ritkán használt címke, amely meghatározhatja az adatkészlet alternatíváját [&lt;PaintRegex&gt;] (#pathregex) ... Az alapértelmezettség null.
        * Csak akkor használja ezt, ha az egész adatkészletet az alapértelmezésen keresztül másolja&lt;cacheSizeGB&gt; érték -1. With&lt;cacheSizeGB&gt; értékek &gt;1, ez figyelmen kívül hagyják, mert ez nem érzéki.
        * Lásd [a dokumentációt]&lt;PaintRegex&gt;] (#pathregex) útmutatásért, hogyan építsük fel a regexet.
        * Ha ez meg van határozva, akkor minden alkalommal felhasználják az adatkészletet, kivéve, ha az adatkészletet egy hónap elején újratöltik.
        * Ez akkor hasznos, ha a távoli adatkészletet labirintusban tárolják, és amikor ezeknek a fájloknak a túlnyomó többsége ritkán változik, ha valaha is megváltozik. ()&lt;köhögés&gt; NASA&lt;Kemény&gt;) Például meg lehet határozni egy&lt;cachePartialPathRegex&gt; amely csak megfelel a jelenlegi évnek vagy a jelenlegi hónapnak. Ezek a regexek nagyon trükkösek, hogy meghatározzák, mert az összes részleges és teljes úti neveknek meg kell felelniük a&lt;cachePartialPathRegex&gt; és mert&lt;A cachePartialPathRegexnek a távoli URL-ekkel és a helyi könyvtárakkal kell dolgoznia. Az igazi élet példa:
```
            <cacheFromUrl>https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/</cacheFromUrl>  
            \\>!-- \\[2020-10-21 This server is no longer reliably available.\\] For most types of remote directories, omit the filename (e.g., contents.html for Hyrax). -->  
            <fileDir>/u00/satellite/MUR41/</fileDir>  
            <fileNameRegex>\\*\\.nc</fileNameRegex>  
            <recursive>true</recursive>  
            <pathRegex>.\\*</pathRegex>  
            <cachePartialPathRegex>.\\*/v4\\.1/(|2018/(|01./))</cachePartialPathRegex>  
```
A fentebbi minta fájlokat tartalmaz az év alapján (pl. 2018) az év napja (pl. 001, 002, 365 vagy 366) ...
Vegyük észre, hogy a&lt;cachePartialPathRegex&gt; kezdődik .\\*,
akkor van egy konkrét aláírás, amely gyakori a távoli URL-ek és a helyi könyvtárak, például /v4.1/
Ezután van egy sor fészkes rögzítő csoport, ahol az első lehetőség semmi
és a második lehetőség egy adott érték.
            
A fenti példának csak 2018 második 10 napján kell megfelelnie a könyvtáraknak, pl.
            https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/2018/010/  \\[ 2020-10-21 Ez a szerver már nem megbízhatóan elérhető. \\]   
nap 011, 012, ..., 019.
             (Lásd ezt [regex dokumentáció](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) és [regex bemutató](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ...)   
Ha segítségre van szüksége&lt;cachePartialPathRegex&gt;, kérlek e-mailt&lt;cacheFromUrl&gt; Chrishez. John at noaa.gov.
            
        * Közös megközelítés: Ha használni akar&lt;cachePartialPathRegex&gt;, ne használja eredetileg, mert akarja ERDDAP™ Először letölteni az összes fájlt. Utána ERDDAP™ letöltötte az összes fájlt, hozzáadta az adatkészlet csomóját datasets.xml ...
             
##### Több ezer fájl{#thousands-of-files} 
Ha az adatkészlet több ezer fájlt tartalmaz, ERDDAP™ lassú lehet reagálni az adatkészletből származó adatok kérésére. Itt két kérdés van:
 

1. A fájlok száma könyvtáronként.
Internally, ERDDAP™ ugyanazon sebességgel működik, függetlenül attól, hogy az n fájlok egy könyvtárban vannak-e, vagy több könyvtárban vannak-e szétszórva.
     
De van egy probléma: Minél több fájl egy adott könyvtárban, annál lassabb az operációs rendszer a fájlok listájának visszatérése a könyvtárban (Fájl) a ERDDAP ... A válaszidő lehet O (n log n) ... Nehéz megmondani, hogy az egyik könyvtárban hány fájl túl sok, de 10.000 valószínűleg túl sok. Tehát, ha a beállítás sok fájlt generál, itt lehet egy ajánlás: tegye be a fájlokat logikailag szervezett alirányítókba (pl. állomás vagy állomás/év) ...
    
Egy másik ok az aláírók használatára: ha egy felhasználó használni akar ERDDAP A "files" rendszer, amely megtalálja a X állomás legrégebbi fájljának nevét, gyorsabb és hatékonyabb, ha a fájlok állomáson / év alatti előirányzatokban vannak, mert sokkal kevesebb információt kell átadni.
    
2. A fájlok teljes száma.
mesés adatkészletek esetében, ERDDAP™ nyomon követi az értékek tartományát minden egyes fájlban. Amikor egy felhasználó kérést tesz, ERDDAP™ el kell olvasnia az összes adatot az összes olyan fájlból, amely adatot tartalmazhat a felhasználó kérésére. Ha a felhasználó korlátozott ideig kéri az adatokat (pl. egy nap vagy egy hónap) Aztán ERDDAP™ Nem kell túl sok fájlt nyitnia az adatkészletében. De vannak szélsőséges esetek, ahol szinte minden fájlnak megfelelnie kell az adatoknak (pl. amikor a vízTemperature=13.2C) ... Mivel eltart ERDDAP™ egy kis idő (részben a keresési idő a HDD-n, részben az idő, hogy elolvassa a fájl fejlécét) Csak egy adott fájl megnyitása (Sőt, ha sok fájl van a könyvtárban) Jelentős időbüntetés van, ha a fájlok teljes száma ERDDAP™ nyitottnak kell lennie, nagyon nagy. Még az 1000 fájl megnyitása is jelentős időt vesz igénybe. Tehát vannak előnyök, hogy rendszeresen konszolidálja a napi fájlokat nagyobb darabokra (pl. 1 állomás 1 évig) ... Megértem, hogy nem akarod ezt különböző okokból megtenni, de sokkal gyorsabb válaszokhoz vezet. szélsőséges esetekben (pl. egy GTSPP adatkészlettel foglalkozom, amely ~35 millió forrásfájltal rendelkezik) Számos forrásfájlból származó adatok kiszolgálása gyakorlati, mert ERDDAP "Az egyszerű kérdésekre adott válasz órákat vehet igénybe, és tonna memóriát használhat. A forrásfájlok kisebb számba történő konszolidálása (a GTSPP-hez, most 720-as, havonta 2) , ERDDAP™ ésszerűen gyorsan reagálhat. Lásd [Files milliói](#millions-of-files)   
     

N.B. Solid State Drives nagyszerű&#33; A leggyorsabb, legkönnyebb, legolcsóbb módja annak, hogy segítsen ERDDAP™ ügyeljen egy hatalmas számú (kicsi) A fájlok szilárd állami meghajtót használnak. Lásd [A Solid State Drives nagyszerű&#33;](/docs/server-admin/additional-information#solid-state-drives)   
     
##### Files milliói{#millions-of-files} 
* Néhány adatkészletnek több millió forrásfájlja van. ERDDAP™ képes kezelni ezt, de vegyes eredményekkel.
    
    * Olyan kérelmek esetében, amelyek csak a változókat tartalmazzák [a]&lt; subsetVariables &gt;&gt;&gt;&gt;&gt;&gt; (#subsetvariables) , ERDDAP™ az összes szükséges információ már kivont az adatokból és tárolt egy fájlban, így nagyon, nagyon gyorsan reagálhat.
    * egyéb kérések esetén, ERDDAP™ szkennelheti az adatkészletet [cached fájl információ](#cached-file-information) és kitalálja, hogy csak néhány fájlnak lehetnek olyan adatok, amelyek relevánsak a kérésre, és így gyorsan reagálnak.
    * De más kérések esetén (Például a vízTemperature=18 fok\\_C) ha bármilyen fájlnak releváns adatai lehetnek, ERDDAP™ számos fájlt kell megnyitnia, hogy megnézze, hogy minden fájlnak van-e olyan adatai, amelyek relevánsak a kérelemhez. A fájlokat sorozatosan nyitották meg. Bármely operációs rendszer és bármilyen fájlrendszer (más, mint a szilárd állami meghajtók) Ez sokáig tart (így ERDDAP™ Lassan reagál) és valóban összekapcsolja a fájlrendszert (így ERDDAP™ lassan reagál más kérésekre) ...
    
Szerencsére van megoldás.
    
    1. Állítsa be az adatkészletet egy nem nyilvános ERDDAP™   (Személyes számítógépe?) ...
    2. Hozzon létre és futtassa a forgatókönyvet, amely sorozatot kér .nc CF fájlok, mindegyik nagy darab adatkészlet, általában egy idő (például az összes adat egy adott hónapra) ... Válassza ki az időt, hogy az összes kapott fájl kevesebb, mint 2GB (de remélhetőleg nagyobb, mint 1 GB) ... Ha az adatkészlet közeli idejű adataival rendelkezik, futtassa a forgatókönyvet, hogy regenerálja a fájlt a jelenlegi időszakra (pl. ez a hónap) gyakran (10 percenként? Minden órában?) ... Kérések ERDDAP™ Mert .nc A CF fájlok létrehoznak egy NetCDF v3 .nc fájl, amely használja a [CF Discrete Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Ragged Array adatstruktúrák).
    3. Állj fel egy [EDDTableFromNcCFFiles](#eddtablefromnccffiles) adatkészlet a nyilvánosság számára ERDDAP™ amely adatokat kap .nc  (CF) fájlok. ERDDAP™ nagyon gyorsan kivonhatja az adatokat ezekből a fájlokból. És mivel most több tucat vagy száz (milliók helyett) fájlok, még akkor is, ha ERDDAP™ ki kell nyitnia az összes fájlt, ezt gyorsan megteheti.
    
Igen, ez a rendszer némi időt és erőfeszítést igényel, de nagyon jól működik. A legtöbb adatkérés 100-szor gyorsabban kezelhető, mint korábban.
     \\[ Bob tudta, hogy ez egy lehetőség, de Kevin O'Brien volt, aki először ezt tette, és megmutatta, hogy jól működik. Most, A Bob ezt a GTSPP adatkészletre használja, amelynek mintegy 18 millió forrásfájlja van, és amelyek ERDDAP™ most körülbelül 500-on keresztül szolgál .nc  (CF) fájlok. \\] 
    
N.B. Solid State Drives nagyszerű&#33; A leggyorsabb, legkönnyebb, legolcsóbb módja annak, hogy segítsen ERDDAP™ ügyeljen egy hatalmas számú (kicsi) A fájlok szilárd állami meghajtót használnak. Lásd [A Solid State Drives nagyszerű&#33;](/docs/server-admin/additional-information#solid-state-drives)   
     
    
##### Hatalmas fájlok{#huge-files} 
* Egyetlen hatalmas adatfájl (nevezetesen hatalmas ASCII adatfájlok) lehet okozni egy OutOfMemoryError. Ha ez a probléma, nyilvánvalónak kell lennie, mert ERDDAP™ nem fogja betölteni az adatkészletet. A megoldás, ha megvalósítható, a fájlt több fájlba osztja. Ideális esetben a fájlt logikai darabokra oszthatja. Például, ha a fájl 20 hónapos adatértékkel rendelkezik, 20 fájlra osztja, mindegyik 1 hónapos adatértékkel. De vannak előnyök még akkor is, ha a fő fájlt önkényesen osztják fel. Ennek a megközelítésnek több előnye van: a) Ez csökkenti az adatfájlok 1/20. elolvasásához szükséges memóriát, mert csak egy fájl olvasható egy időben. b) Gyakran, ERDDAP™ sokkal gyorsabban kezelheti a kérelmeket, mert csak egy vagy néhány fájlban kell megnéznie, hogy megtalálja az adatokat egy adott kérésre. c) Ha az adatgyűjtés folyamatban van, akkor a meglévő 20 fájl változatlan maradhat, és csak egy, kis, új fájlt kell módosítania, hogy hozzáadja a következő hónapi adatértéket az adatkészlethez.
     
##### FTP hiba / tanács{#ftp-troubleadvice-1} 
* Ha FTP új adatfájlokat készít ERDDAP™ szerver, ERDDAP™ fut, van esély arra, hogy ERDDAP™ az FTP folyamat során újratölti az adatkészletet. Gyakrabban fordul elő, mint gondolnád&#33; Ha ez megtörténik, a fájl úgy tűnik, hogy érvényes (érvényes neve) , de a fájl nem érvényes. Ha ERDDAP™ megpróbálja elolvasni az adatokat ebből az érvénytelen fájlból, az ebből eredő hiba okozza a fájlt az érvénytelen fájlok táblázatához. Ez nem jó. A probléma elkerülése érdekében használjon ideiglenes fájlnévet, amikor az FTP a fájlt, például az ABC2005 .nc \\_TEMP . Ezután a fájlNameRegex teszt (lásd alább) jelzi, hogy ez nem releváns fájl. Miután az FTP folyamat befejeződött, nevezze át a fájlt a helyes névre. A megnevezési folyamat azt fogja okozni, hogy a fájl egy pillanat alatt releváns legyen.
    
##### File Name Extracts{#file-name-extracts} 
 \\[ Ez a funkció DEPRECATED. Kérjük, használja [\\*\\*\\*fileName pseudo sourceName ](#filename-sourcenames) Ehelyett. \\]   
Az EDDTableFromFiles rendszerrel rendelkezik egy String kivonására minden fájlnévből, és arra használja, hogy a pseudo adat változó legyen. Jelenleg nincs rendszer arra, hogy ezeket a Hangokat dátumként/időként értelmezzük. Számos XML-címke van, hogy létrehozza ezt a rendszert. Ha nincs szüksége részre vagy egész rendszerre, csak ne határozza meg ezeket a címkéket, vagy használja a "" értékeket.

* PreExtractRegex egy [rendszeres kifejezés](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) használt szöveg azonosítására, amelyet eltávolítanak a fájlnév kezdetétől. A eltávolítás csak akkor fordul elő, ha a regex egyezik. Ez általában a "^"-val kezdődik, hogy megfeleljen a fájlnév kezdetének.
* Hozzászólás ExtractRegex egy rendszeres kifejezés, amelyet a szöveg eltávolítására használnak a fájlnév végétől. A eltávolítás csak akkor fordul elő, ha a regex egyezik. Ez általában a "$"-vel ér véget, hogy megfeleljen a fájlnév végének.
* KivonatRegex Ha jelen van, ezt a rendszeres kifejezést a preExtractRegex és a postExtractRegex után használják, hogy azonosítsák a karakterláncot, amelyet kivonnak a fájlnévből (Például, stationID ) ... Ha a regex nem egyezik, az egész fájlnévet használják (mínusz preExtract és poszt Kivonat) ... Használja a ".\\*"-t, hogy megfeleljen az egész fájlnévnek, amely a PreExtractRegex és a PostExtractRegex után marad.
* oszlop A NameForExtract az adatoszlop forrás neve a kivont Strings számára. A dataVariable ezzel [ sourceName ](#sourcename) be kell tartani a dataVariable S lista (bármilyen adattípussal, de általában String) ...

Például, ha egy adatkészlet olyan nevekkel rendelkezik, mint a XYZAble .nc XYZBaker .nc XYZCharlie .nc ... és új változót akarsz létrehozni ( stationID ) ha minden fájl olvasható, amely állomása ID értékek (Able, Baker, Charlie, ...) kivont a fájlnév, lehet használni ezeket a címkéket:

*   &lt;PreExtractRegex ^XYZ&lt;/preExtractRegex&gt;
A kezdeti ^ egy rendszeres kifejezés speciális karakter, amely erők ERDDAP™ keresni XYZ elején a fájlnév. Ez okozza a XYZ-t, ha a fájlnév elején találják, eltávolítható (Például a XYZAble fájlnév .nc Able lett .nc ) ...
*   &lt;posztExtractRegex&gt; \\ .nc $ € $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $&lt;/postExtractRegex&gt;
A végén egy rendszeres kifejezés speciális karakter, amely erők ERDDAP™ keresni .nc a fájlnév végén. Mivel . egy rendszeres kifejezés speciális karakter (amely megfelel minden karakternek) , ez kódolt, mint \\. itt (mert a 2E a hexadecimális karakterszám egy időszakra) ... Ez okozza .nc , ha a fájlnév végén található, eltávolítható (Például a részleges fájlnév Able .nc Able lett) ...
*   &lt;ExtractRegex&gt;.\\*&lt;/extraRegex&gt;
A .\\* rendszeres kifejezés megfelel az összes fennmaradó karakternek (Például a részleges fájlnév Able az első fájl kivonatává válik) ...
*   &lt;oszlopNameForExtract&gt; stationID &lt;/columnNameForExtract&gt;
Ez azt mondja ERDDAP™ létrehozni egy új forrás oszlop úgynevezett stationID minden fájl olvasásakor. Minden adatsor egy adott fájlra lesz kivonva a fájlnévből (például, Able) mint érték a stationID oszlop.

A legtöbb esetben számos értéke van ezeknek a kivonat címkéknek, amelyek ugyanazokat az eredményeket hozzák - a rendszeres kifejezések nagyon rugalmasak. De néhány esetben csak egy módja van a kívánt eredmények elérésére.
     
##### Pseudo sourceName s{#pseudo-sourcenames} 
Minden változó minden adatkészletben ERDDAP™ [[Ki]]]&lt; sourceName &gt;&gt;&gt;&gt;&gt;&gt; (#sourcename) amely meghatározza a forrás neve változó. Az EDDTableFromFiles néhány pszeudót támogat sourceName kivonat értéket más helyről (pl. a fájl neve vagy a globális tulajdonság értéke) és támogassa ezt az értéket, hogy állandó értékek oszlopa legyen az adott részes adatok számára (pl. a fájl adatainak táblázata) ... Ezen változók esetében meg kell határoznia a változó adattípusát [a változó adattípusát] keresztül.&lt;adatType&gt;] (#datatype) Tag. Ha a kivont információ egy dátumTime sztring, megadja a formátumot a dátumTime sztring a [egység tulajdonság](#string-time-units) ... Pseudo sourceName opciók:
 
###### globális: sourceName s{#global-sourcenames} 
Egy globális metaadat tulajdonsága minden forrásadat fájl lehet előmozdítani, hogy egy oszlop az adatok. Ha egy változó&lt; sourceName &gt; rendelkezik formátummal
```
        <sourceName>global:*attributeName*</sourceName>
```
akkor, amikor ERDDAP™ az adatokat egy fájlból olvassa el, ERDDAP™ globális jelleget fog keresni ebből a névből (Például PI) és hozzon létre egy oszlopot, amely tele van a tulajdonság értékével. Ez akkor hasznos, ha a tulajdonságnak különböző értékei vannak a különböző forrásfájlokban, mert máskülönben a felhasználók csak az egyik értéket látnák az egész adatkészlet számára. Például,
```
        <sourceName>global:PI</sourceName>
```
Amikor egy tulajdonságot hirdet, hogy adatok legyenek, ERDDAP™ eltávolítja a megfelelő tulajdonságot. Ez azért helyénvaló, mert az érték feltehetően különbözik minden fájlban; mivel az összesített adatkészletben ERDDAP™ csak egy értéke lesz. Ha akarja, hozzáadhat egy új értéket az egész adatkészlet tulajdonságához azáltal, hogy hozzáad&lt;att name=" *tulajdonság név* "&gt;&gt;&gt; *új Érték* &lt;/att&gt; az adatkészlet globális részére [&lt; addAttributes &gt;&gt;&gt;&gt;&gt;&gt; (#addattributes) ... A globális tulajdonságokért, amelyek ERDDAP™ megköveteli például az intézménytől, hogy új értéket adjon hozzá a tulajdonsághoz.
     
###### változó: sourceName s{#variable-sourcenames} 
A változó metaadata tulajdonsága minden fájlban elősegíthető az adatok oszlopának. Ha egy változó&lt; [ sourceName ](#sourcename) \\&gt; a formátum
```
        <sourceName>variable:*variableName*:*attributeName*<sourceName>
```
akkor, amikor ERDDAP™ az adatokat egy fájlból olvassa el, ERDDAP™ keresni fogja a meghatározott tulajdonságot (Például ID) a meghatározott változó (például instrumentum) és hozzon létre egy oszlopot, amely tele van a tulajdonság értékével. A szülői változó (például instrumentum) nem kell az egyik dataVariable az adatkészlet meghatározásában foglalt ERDDAP ... Például,
```
        <sourceName>variable:instrument:ID</sourceName>
```
Ez akkor hasznos, ha a tulajdonságnak különböző értékei vannak a különböző forrásfájlokban, mert máskülönben a felhasználók csak az egyik értéket látnák az egész adatkészlet számára.

Amikor egy tulajdonságot hirdet, hogy adatok legyenek, ERDDAP™ eltávolítja a megfelelő tulajdonságot. Ez azért helyénvaló, mert az érték feltehetően különbözik minden fájlban; mivel az összesített adatkészletben ERDDAP™ csak egy értéke lesz. Ha akarja, hozzáadhat egy új értéket az egész adatkészlet tulajdonságához azáltal, hogy hozzáad&lt;att name=" *tulajdonság név* "&gt;&gt;&gt; *új Érték* &lt;/att&gt; a változó [&lt; addAttributes &gt;&gt;&gt;&gt;&gt;&gt; (#addattributes) ... A tulajdonságokért, hogy ERDDAP™ például megköveteli ioos\\_category   (a beállítástól függően) Hozzá kell adni egy új értéket a tulajdonsághoz.
        
###### fájlName sourceName s{#filename-sourcenames} 
Kivonhatja a fájl fájlja részét, és elősegítheti, hogy az adatok oszlopa legyen. A Pseudo formátuma [&lt; sourceName &gt;&gt;&gt;&gt;&gt;&gt; (#sourcename) az
```
        <sourceName>\\*\\*\\*fileName,*regex*,*captureGroupNumber*</sourceName>
```
Például,
```
        <sourceName>\\*\\*\\*fileName,A(\\d{12})\\.slcpV1.nc,1</sourceName>
```
Amikor az EDDTableFromFiles egy fájlból olvassa el az adatokat, megbizonyosodik arról, hogy a fájlName (Például az A201807041442.slcpV1 .nc ) megfelel a meghatározott rendszeres kifejezésnek ("regex") és kivonja a megadott (Ebben az esetben az első) rögzítő csoport (amely a parentheses által körülvéve) Például: "201807041442". (Lásd ezt [regex dokumentáció](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) és [regex bemutató](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ...) A regex lehet meghatározni, mint egy húr, vagy anélkül, hogy környező idézetek. Ha a regexet a környező idézetekkel húrként határozzák meg, a húrnak kell lennie [JSON stílusú sztring](https://www.json.org/json-en.html)   (speciális karakterekkel elmenekült \\ karakterekkel) ... A rögzítő csoport száma általában 1 (az első rögzítő csoport) De lehetnek számok.
     
###### dalszöveg sourceName s{#pathname-sourcenames} 
Kivonhatja a fájl teljes útját név (/directories/fileName.ext) és előmozdítja ezt az adatoszlopnak. A Pseudo formátuma [&lt; sourceName &gt;&gt;&gt;&gt;&gt;&gt; (#sourcename) az
```
        <sourceName>\\*\\*\\*pathName,*regex*,*captureGroupNumber*<sourceName>
```
Például,
```
        <sourceName>\\*\\*\\*pathName,/data/myDatasetID/(\\[A-Z0-9\\]\\*)/B(\\d{12}).nc,1</sourceName>
```
Amikor az EDDTableFromFiles egy fájlból olvassa el az adatokat, megbizonyosodik arról, hogy a teljes útvonal Name (Például /data/myDatasetID/BAY17/B201807041442 .nc ... Ehhez a teszthez a könyvtári elválasztó mindig lesz '/' Sohasem » "...") megfelel a meghatározott rendszeres kifejezésnek ("regex") és kivonja a megadott (Ebben az esetben az első) rögzítő csoport (amely a parentheses által körülvéve) Például: "BAY17". (Lásd ezt [regex dokumentáció](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) és [regex bemutató](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ...) A regex lehet meghatározni, mint egy húr, vagy anélkül, hogy környező idézetek. Ha a regexet a környező idézetekkel húrként határozzák meg, akkor a húrnak kell lennie [JSON stílusú sztring](https://www.json.org/json-en.html)   (speciális karakterekkel elmenekült \\ karakterekkel) ... A rögzítő csoport száma általában 1 (az első rögzítő csoport) De lehetnek számok.
         
##### "0 fájl" hibaüzenet{#0-files-error-message-2} 
* Ha futsz [GenerateDatasetsXml](#generatedatasetsxml) vagy [DasDds](#dasdds) vagy ha megpróbálsz betölteni egy EDDTableF-et... Files adatkészlet ERDDAP™ , és kap egy "0 fájl" hibaüzenetet, amely jelzi, hogy ERDDAP™ talált 0 megfelelő fájlokat a könyvtárban (ha úgy gondolja, hogy van egyező fájlok ebben a könyvtárban) :
    * Ellenőrizze, hogy a fájlok valóban ebben a könyvtárban vannak.
    * Ellenőrizze a könyvtár neve varázslatát.
    * Ellenőrizze a fájlNameRegex. Valójában nagyon könnyű hibákat hibáztatni a regexekkel. Tesztcélok esetén próbálja meg a regex .\\*-t, amely minden fájlnévhez illeszkedik. (Lásd ezt [regex dokumentáció](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) és [regex bemutató](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ...) 
    * Ellenőrizze, hogy a felhasználó, aki fut a program (pl. felhasználó=tomcat (?) Tomcat/ ERDDAP ) "olvassa" az engedélyt ezekre a fájlokra.
    * Egyes operációs rendszerekben (például SELinux) és a rendszerbeállításoktól függően a felhasználónak, aki futtatja a programot, „olvassa” a könyvtárak egész láncolatát, amely a fájlokat tartalmazó könyvtárhoz vezet.
         
##### szabványosítás Amit{#standardizewhat} 
* Ha az EDDTableFromFiles bármely alosztálya egy sor forrásfájlot tartalmaz, egy adott változó esetében az összes forrásfájlnak azonos tulajdonságai vannak több tulajdonság számára: scale\\_factor , add\\_offset , \\_Unsigned, missing\\_value , \\_FillValue és egység). Gondolj bele: ha egy fájl WindSpeed units=knots és egy másik szélSpeed units=m/s, akkor a két fájl adatértékeit nem kell ugyanabban az aggregált adatkészletben tartalmazni. Tehát, amikor az EDDTableFromFiles először létrehozza az adatkészletet, elolvassa az egyik fájltól származó tulajdonságértékeket, akkor elutasítja az összes olyan fájlt, amely különböző értékekkel rendelkezik az említett fontos tulajdonságok számára. A legtöbb fájlgyűjtemény esetében ez nem probléma, mert az összes változó tulajdonságai következetesek. Azonban más fájlgyűjtések esetében ez 1%, 10%, 50%, 90% vagy akár 99% -os fájlhoz vezethet, amelyeket "rossz" fájlként utasítanak el. Ez baj.
    
Az EDDTableFrom fájloknak van egy rendszere, amely kezeli ezt a problémát: szabványosítani Mi. A szabványosítás A beállítás azt mondja, hogy az EDDTableFromFiles szabványosítja a fájlokat, amint olvassa őket, mielőtt az EDDTableFromFiles megnézi a tulajdonságokat, hogy lássa, következetes-e.
    
A flip oldal: ha az adatkészlet nem rendelkezik ezzel a problémával, ne használjon szabványosítást Mi. szabványosítás Milyen potenciális kockázatokkal jár (az alábbiakban tárgyalt) és hiányosságok. Tehát, ha nem igazán kell a szabványosítás jellemzői Ami, nem kell szembenéznie a potenciális kockázatokkal és a hatékonysággal. A legnagyobb hatékonyság: ha különböző szabványosítás Milyen lehetőségeket használnak egy adatkészlet, azt jelenti, hogy a forrásfájlok tárolják az adatokat jelentősen eltérő módon (pl. különböző scale\\_factor és add\\_offset vagy időhúrokkal különböző formátumokat használ) ... Így egy adott korlátozott felhasználói kérelem esetén nincs mód arra, hogy ERDDAP™ egyetlen forrásszintű korlátozás létrehozása, amely minden forrásfájlra alkalmazható. Szóval ERDDAP™ csak magasabb szinten alkalmazhatja az érintett korlátozásokat. Szóval ERDDAP™ el kell olvasnia az adatokat több fájlból, mielőtt a magasabb, célszintű korlátozásokat alkalmazná. Ezért kéri az olyan adatkészleteket, amelyek szabványosítással rendelkeznek Mi tart tovább feldolgozni.
    
Ennek a rendszernek a használatához meg kell határoznia
```
    <standardizeWhat>*standardizeWhat*</standardizeWhat>  
```
a [ datasets.xml az EDDTableFrom... Files adatkészlet](#eddtablefromfiles-skeleton-xml) (azonnal&lt;adatkészlet&gt; címke).
    
A *szabványosítás Amit* az érték meghatározza, hogy mely változásokat EDDTableFromFiles kell próbálni alkalmazni. A változások a következő kombináció összege:
    
1. Unpack
Ez sok közös és biztonságos műveletet tesz a számszerű oszlopok szabványosítására a fájlokban:
    * Ha scale\\_factor vagy add\\_offset attribútumok jelen vannak, távolítsa el őket, és alkalmazza őket az adatértékek kicsomagolására.
    * Unpack csomagolt tulajdonságok (pl. tényleges\\_min, tényleges\\_max, actual\\_range , data\\_min , data\\_max , adat\\_range, valid\\_min , valid\\_max , valid\\_range ) , ha jelen van, ha a változót csomagolták, és ha az attribútum értékeit csomagolták (ez trükkös, de ésszerűen megbízható) ...
    * Ha \\_FillValue és/vagy missing\\_value jelen vannak, átalakítják ezeket az adatértékeket ERDDAP "standard" hiányzó értékek: MAX\\_VALUE az integrált típusokhoz (pl.: 127 bytes, 32 767 rövid és 2,147,483,647 ints, 922337203685478 Hosszúság) NaN a duplák és a úszók számára.
    * Távolítsa el a régi \\_FillValue és/vagy missing\\_value tulajdonságok (ha valaki) , és cserélje őket csak \\_FillValue= \\[ a ERDDAP™ standard hiányzó érték \\] ...
         
2. Szabványosítsa a numerikus időket
Ha egy numerikus oszlop rendelkezik CF-stílusú numerikus időegységekkel ("..." *IdőEgységek* óta *alapTim* ", pl. "napok 1900-01-01 óta") Ez megtéríti a dátumot Időértékek be "seconds since 1970-01-01T00:00:00Z" értékek és változások az egységek tulajdonsága, hogy jelezze.
Ha ezt kiválasztják, és van esély arra, hogy ez a változó scale\\_factor vagy add\\_offset # 1 MUST is választható.
     
3. Apply String missing\\_value   
Ha egy sztring oszlop \\_FillValue és/vagy missing\\_value attribútumok, ez átalakítja ezeket az értékeket "", és eltávolítja a tulajdonságokat.
     
4. Keressen Numeric missing\\_value   
Ha egy numerikus oszlopnak nincs \\_FillValue vagy missing\\_value attribútumok, ez megpróbálja azonosítani a nem meghatározott numerikus missing\\_value   (-999, 9999, 1e37f) és átformálja az eseteket a "szabványos" értékekre (MAX\\_VALUE az integrált típusokhoz, és NAN a dupla és úszókhoz) ...
     **Ez az opció kockázattal jár:** ha a legnagyobb vagy legkisebb érvényes adatérték hiányzó értéknek tűnik (pl. 999) Ezután ezek az érvényes adatértékek megtérülnek a hiányzó értékekre (pl. NaN) ...
     
5. Változtasd meg a "N/A"-t "
Minden sztring oszlopban több sztringet konvertáltak, amelyek általában arra használják, hogy jelezzék a hiányzó String értéket ". Jelenleg ez "", "...", "-", "?", "??", "N/A", "na", "nem alkalmazható", "null", "nem", "nem", "nem", "nem ismert", "különbözetlen". A sztringkeresés eset-érzékeny, és a húrok után alkalmazott trim'd. "és" és "más" kifejezetten nem szerepel a listán.
     **Ez az opció kockázattal jár:** Hangsúlyozza, hogy érvényes értékeknek tekinthető, ""-re váltható.
     
6. Szabványosítani ISO 8601 DateTimes
Minden egyes sztring oszlopban próbálja meg átalakítani a nem pusztán-numerikus String dátumotTimes („Jan 2, 2018”) ISO 8601 String dátumTimes ("2018-01-02") ...
     **Megjegyzés** hogy az oszlop összes adatértékének ugyanazt a formátumot kell használnia, különben ez az opció nem változtat egy adott oszlopban.
     **Ez az opció kockázattal jár:** Ha van egy oszlop a szigorú értékekkel, amelyek csak úgy néznek ki, mint egy közös dátum Időformátum, átalakítják az ISO 8601 String dátumTimes.
     
7. Kompakt dátumok szabványosítása ISO 8601 dátumhoz
Minden egyes String vagy integráló típusú oszlop esetében próbálja meg a tisztán-numerikus String dátumot (pl.: „20180102”) ISO 8601 String dátumTimes ("2018-01-02") ...
     **Megjegyzés** hogy az oszlop összes adatértékének ugyanazt a formátumot kell használnia, különben ez az opció nem változtat egy adott oszlopban.
     **Ez az opció kockázattal jár:** Ha van egy oszlop olyan értékekkel, amelyek nem kompakt dátum Az idők, de úgy néznek ki, mint a kompakt dátumTimes, átalakítják az ISO 8601 String dátumTimes.
     
8. Szabványosítsa az egységek
Ez megpróbálja szabványosítani az egyes változó egységeket. Például: "mérő másodpercenként", "mérő/második", "m.s^-1" , "m s-1" "m.s-1" minden "m.s-1-re" fog átalakulni. Ez nem változtatja meg az adatértékeket. Ez jól működik érvényesnek UDUNITS egység húrok, de lehet problémák érvénytelen vagy összetett húrok. A problémákkal foglalkozhat, specifikus From-to pairs in&lt;szabványosításUdunits&gt; benne ERDDAP A
     \\[ Tomcat \\] /webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml fájl. Kérjük, küldjön e-mailt bármilyen változást, amit Chris-nek teszel. John at noaa.gov, így beépülhetnek az alapértelmezett üzenetekbe.xml.
     **Ez az opció kockázattal jár:** Ez összetett vagy érvénytelen egységeket ölelhet fel; azonban a fent leírt munkakört használhatja a problémák megkerülésére, ha előfordulnak.
         
    
A szabványosítás alapértelmezett értéke Mi a 0, ami nem csinál semmit.

Ha/ha megváltoztatod a szabványosítás értékét Mi, a következő alkalommal, amikor az adatkészletet újratöltik, ERDDAP™ újraindítja az összes adatfájlot az adatkészlethez, hogy újraépítse a mini-adatbázist az egyes fájlokkal kapcsolatos információkkal. Ha az adatkészlet sok fájlt tartalmaz, ez hosszú időt vesz igénybe.
    
Megjegyzések:

* Egy trükkös dolog -
A szabványosítás Milyen beállítást használnak a forrásfájl összes oszlopához. Így például a #2048 használata sikeresen konvertálhat egy kompakt String dátumotTimes-t az ISO 8601 String dátumTimes-be, de tévesen átalakíthat egy oszlopot olyan Strings-szal, amely csak úgy néz ki, mint a kompakt dátumTimes.
     
*    datasets.xml és a GenerateDatasets Xml -
Különösen trükkös, hogy a beállítások helyesek legyenek datasets.xml hogy az adatkészleted úgy működjön, ahogyan akarod. A legjobb megközelítés (mint mindig) az:
    1. Használat [GenerateDatasetsXml](#generatedatasetsxml) és meghatározza a szabványosítás értékét Mit szeretne használni.
    2. Használat [DasDds](#dasdds) annak biztosítása, hogy az adatkészlet helyesen terheljen, és tükrözze a szabványosítást Milyen beállítás, amit megadott.
    3. Tesztelje meg az adatkészletet kézzel, ha ERDDAP™ annak biztosítása érdekében, hogy az érintett változók a várt módon működjenek.
         
* Kockázat -
A #256 és a fenti lehetőségek kockázatosabbak, azaz nagyobb esély van arra, hogy ERDDAP™ változtatni fog, amit nem szabad tenni. Például a #2048 opció véletlenül változhat az állomás ID-csíkokkal, amelyek mind csak az ISO 8601 "kompakt" dátumok megjelenésével történnek (pl. 20180102) ISO 8601 "extended" dátumok ("2018-01-02") ...
     
* Lassú egy változás után -
Mivel a szabványosítás értéke Milyen változtatja meg az EDDTableFromFiles adatait, ha módosítja a szabványosítást Milyen beállítás, az EDDTableFromFiles eldobja az összes csípős információt minden fájlról (amely magában foglalja a bányát és a maxot az egyes fájlokban változó adatokhoz) és újraolvassa az egyes adatfájlokat. Ha egy adatkészlet nagyszámú fájlt tartalmaz, ez nagyon időigényes lehet, ezért hosszú időt vesz igénybe az adatkészlet újratöltéséhez. ERDDAP™ újratölti azt, miután meghozza a változást.
     
* Heurisztika -
Opciók #256 és fent használja a heurisztika, hogy a változásokat. Ha olyan helyzetben találkozol, ahol a heurisztika rossz döntést hoz, kérjük, írja le a problémát Chrisnek. John at noaa. Gov így javíthatjuk a heurisztikát.
     
* alternatívák -
Ha az egyik szabványosítás Milyen lehetőségeket nem old meg egy adott adatkészlet számára, akkor képes lehet megoldani a problémát azáltal, hogy egy [ .nc ml fájl](#ncml-files) párhuzamosan minden adatfájl és meghatározza a dolgok változásait a fájlokban, hogy a fájlok következetesek legyenek. Ezután mondja el az EDDTableF-et... Files adatkészlet aggregálásához .nc ml fájlok.
    
Vagy használj [ NCO ](#netcdf-operators-nco) a fájlok tényleges megváltoztatása, hogy a fájlok következetesek legyenek.
        
##### Külön oszlopok évre, hónapra, dátumra, órára, percre, másodpercre{#separate-columns-for-year-month-date-hour-minute-second} 
Ez meglehetősen gyakori a mesés adatfájlok, hogy külön oszlopokat évente, hónap, dátum, óra, perc, második. Korábban ERDDAP™ v2.10, az egyetlen megoldás az adatfájl szerkesztése volt, hogy egyesítse ezeket az oszlopokat egy egységes időoszlopba. Ezzel ERDDAP™ 2.10+, használhatja a
[[szerkesztés]]&lt; sourceName &gt;= *kifejezés* &lt; sourceName &gt;&gt;&gt;&gt;&gt;&gt; (#sourcename) Mondd el ERDDAP™ Hogyan lehet kombinálni a forrás oszlopokat, hogy egységes idő oszlop, így már nem kell szerkeszteni a forrás fájlt.
##### &lt;skipHeaderToRegex & gt;{#skipheadertoregex} 
* [[szerkesztés]]&lt;skipHeaderToRegex&gt; (#skipheadertoregex) -
VÁLASZTÓ. (EDDTableFromAsciiFiles és EDDTableFromColumnarAsciiFiles adatkészletek csak.)   
Amikor az EDDTableFromAsciiFiles egy adatfájlot olvas, figyelmen kívül hagyja az összes sort, és beleértve azt a vonalat, amely megfelel a rendszeres kifejezésnek. Az alapértelmezett "", amely nem használja ezt a lehetőséget. Egy példa
```
    <skipHeaderToRegex>\\\*\\\*\\\* END OF HEADER.\\*<skipHeaderToRegex>  
```
amely figyelmen kívül hagyja az összes sort, és beleértve azt a vonalat, amely a "\\*\\** END OF HEADER.

Ha ezt a címkét használja,&lt;oszlopNamesRow&gt; és&lt;Az elsőDataRow&gt; úgy működik, mintha a fejléc eltávolításra került volna, mielőtt a fájl olvasható. Például oszlopNamesRow=0-t használnál, ha az oszlop nevek a fejléc után közvetlenül a sorban vannak.

Ha szeretné használni a generációt Adatkészletek Xml egy adatkészlettel, amely szüksége van erre a címkére:

1. Készítsen egy új, ideiglenes, minta fájlt egy meglévő fájl másolásával és eltávolítva a fejléct.
2. Run generáció Adatkészletek Xml és megadja a minta fájlt.
3. Kézzel add hozzá a&lt;skipHeaderToRegex&gt; címke a datasets.xml cunk.
4. Törölje az ideiglenes, minta fájlt.
5. Használja az adatkészletet ERDDAP ...
##### &lt;skipLinesRegex & gt;{#skiplinesregex} 
VÁLASZTÓ. (EDDTableFromAsciiFiles és EDDTableFromColumnarAsciiFiles adatkészletek csak.)   
Amikor az EDDTableFromAsciiFiles egy adatfájlot olvas, figyelmen kívül hagyja az összes sort, amely megfelel ennek a rendszeres kifejezésnek. Az alapértelmezett "", amely nem használja ezt a lehetőséget. Egy példa
```
    <skipLinesRegex>#.\\*<skipLinesRegex>  
```
amely figyelmen kívül hagyja az összes olyan vonalat, amely "#"-vel kezdődik.

Ha ezt a címkét használja,&lt;oszlopNamesRow&gt; és&lt;Az elsőDataRow&gt; úgy működik, mintha az összes megfelelő sort eltávolították volna, mielőtt a fájl olvasható. Például használná az oszlopNamesRow=0-t, még akkor is, ha több sor kezdődne, például „#” a fájl elején.
    
#### EDDTableFromFiles csontváz XML{#eddtablefromfiles-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;nDimensions>...&lt;/nDimensions>  &lt;!-- This was used prior to ERDDAP™  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version 1.30, but is now ignored. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromFiles subclasses, this uses Java's WatchDirectory system  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;standardizeWhat>](#standardizewhat)...&lt;/standardizeWhat> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;specialMode>*mode*&lt;/specialMode>  &lt;-- This rarely-used, OPTIONAL tag  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;can be used with EDDTableFromThreddsFiles to specify that special,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hard-coded rules should be used to determine which files should  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;be downloaded from the server. Currently, the only valid *mode*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is SAMOS which is used with datasets from  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://tds.coaps.fsu.edu/thredds/catalog/samos to download only the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files with the last version number. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  &lt;-- For subclasses like  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromHyraxFiles and EDDTableFromThreddsFiles, this is where  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you specify the base URL for the files on the remote server.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For subclasses that get data from local files, ERDDAP™ doesn't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this information to get the data, but does display the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;information to users. So I usually use "(local files)". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data file names, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get metadata  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;charset>...&lt;/charset>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This OPTIONAL tag specifies the character set (case  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sensitive!) of the source files, for example, ISO-8859-1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default) and UTF-8.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipHeaderToRegex>](#skipheadertoregex)...&lt;/skipHeaderToRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipLinesRegex>](#skiplinesregex)...&lt;/skipLinesRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNamesRow>...&lt;/columnNamesRow> &lt;-- (For EDDTableFromAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the row with the column  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;names in the files. (The first row of the file is "1".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default = 1.)  If you specify 0, ERDDAP™ will not look for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;column names and will assign names: Column#1, Column#2, ... -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;firstDataRow>...&lt;/firstDataRow>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the first row with data in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. (The first row of the file is "1". Default = 2.) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dimensionsCSV>...&lt;/dimensionsCSV> &lt;-- (For EDDTableFromNcFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and EDDTableFromMultidimNcFiles only) This is a comma-separated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list of dimension fullNames. If specified, ERDDAP™ will only read  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variables in the source files which use some or all of these  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions, plus all of the scalar variables. If a dimension  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is in a group, you must specify its fullName,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g., "*groupName/dimensionName*". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The next four tags are DEPRECATED. For more information, see  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[File Name Extracts](#filename-sourcenames). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;preExtractRegex>...&lt;/preExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;postExtractRegex>...&lt;/postExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractRegex>...&lt;/extractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNameForExtract>...&lt;/columnNameForExtract>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortedColumnSourceName>...&lt;/sortedColumnSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The [sourceName](#sourcename) of the numeric column that the data files are  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;usually already sorted by within each file, for example, "time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Don't specify this or use an empty string if no variable is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suitable. It is ok if not all files are sorted by this column.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If present, this can greatly speed up some data requests.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromHyraxFiles, EDDTableFromNcFiles and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, this must be the leftmost (first) axis variable.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromMultidimNcFiles ignores this because it has a better  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;system. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortFilesBySourceNames>...&lt;/sortFilesBySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- This is a space-separated list of [sourceName](#sourcename)s  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which specifies how the internal list of files should be sorted  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(in ascending order), for example "id time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is the minimum value of the specified columns in each file  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;that is used for sorting.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When a data request is filled, data is obtained from the files  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in this order. Thus it determines the overall order of the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the response.  If you specify more than one column name, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;second name is used if there is a tie for the first column; the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;third is used if there is a tie for the first and second  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;columns; ... This is OPTIONAL (the default is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fileDir+fileName order). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For EDDTableFromHyraxFiles, EDDTableFromMultidimNcFiles,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromNcFiles, EDDTableFromNccsvFiles, and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, the source's axis variables (for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;example, time) needn't be first or in any specific order. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromAsciiService{#eddtablefromasciiservice} 
 [ **EDDTableFromAsciiService** ](#eddtablefromasciiservice) lényegében egy képernyőkép. Olyan adatforrásokkal kell foglalkozni, amelyek egyszerű webszolgáltatással rendelkeznek az adatok kérésére (gyakran HTML forma egy weboldalon) és amely visszaállíthatja az adatokat egyes strukturált ASCII formátumban (például egy képzett értékű vagy oszlop ASCII szövegformátum, gyakran más információkkal az adatok előtt és/vagy után) ...

EDDTableFromAsciiService az összes EDDTableFromAsciiService... osztályok szuperosztálya. Nem használhatja az EDDTableFromAsciiService-t közvetlenül. Ehelyett használja az EDDTableFromAsciiService alosztályát a szolgáltatások bizonyos típusainak kezelésére:

*    [EDDTableFromAsciiServiceNOS](#eddtablefromasciiservicenos) adatokat kap NOAA NOS ASCII szolgáltatásai.

Jelenleg semmilyen más szolgáltatástípus nem támogatott. De általában viszonylag könnyű támogatni más szolgáltatásokat, ha hasonló módon működnek. Lépjen kapcsolatba velünk, ha van kérése.

#### Részletek{#details} 
A következő információ az EDDTableFromAsciiService valamennyi alosztályára vonatkozik.

* Következtetések - ERDDAP™ A tabuláris adatkérések bármilyen változóra korlátozódhatnak. A mögöttes szolgáltatás megengedheti vagy nem engedélyezheti a korlátozásokat minden változóban. Például sok szolgáltatás csak támogatja az állomás nevek, a szélesség, a hosszúság és az idő korlátozásait. Tehát, ha az EDDTableFromAsciiService alosztálya kérést kap egy adatkészlet aljzatához, akkor a forrásadat-szolgáltatáshoz a lehető legtöbb korlátozást éri el, majd a szolgáltatás által visszatért adatokra a fennmaradó korlátozásokat alkalmazza, mielőtt az adatokat átadja a felhasználónak.
* Valid Range - Ellentétben sok más adatkészlet típusok, EDDTableFromAsciiService általában nem ismeri az adatok körét minden változó, így nem lehet gyorsan elutasítani a kérelmek az adatok kívül az érvényes tartományban.
* Az ASCII szöveges válasza - Amikor az EDDTableFromAsciiService választ kap egy ASCII Text Service-tól, igazolnia kell, hogy a válasz a várható formátum és információ, majd kivonja az adatokat. Megadhatja a formátumot különböző speciális címkékkel az XML zsákmányában az adatkészlethez:
    *   &lt;előttData1&gt; keresztül&lt;ElőzőData10&gt; címkék - Megadhat egy sor szöveget (amennyit csak akarsz, akár 10) az EDDTableFromAsciiService-nek meg kell keresnie az ASCII szöveg vezetőjét, amelyet a szolgáltatás visszaküldött&lt;előttData1&gt; keresztül&lt;ElőzőData10&gt; Például ez hasznos annak ellenőrzéséhez, hogy a válasz magában foglalja a várható változókat a várt egységekkel. Az utolsó előttData-címke, amelyet megad, azonosítja a szöveget, amely közvetlenül történik, mielőtt az adatok elkezdődnek.
    *   &lt;AfterData&gt; - Ez meghatározza azt a szöveget, amelyet az EDDTableFromAsciiService az ASCII szövegben keres, amelyet az adatok végét jelezi.
    *   &lt;noData&gt; - Ha az EDDTableFromAsciiService megtalálja ezt a szöveget az ASCII szövegében, amelyet a szolgáltatás visszaküldött, arra a következtetésre jut, hogy nincs adat, amely megfelel a kérelemnek.
#### EDDTableFromAsciiService Skeleton XML{#eddtablefromasciiservice-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromAsciiService..." [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData1>...&lt;beforeData1> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData10>...&lt;beforeData10> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;afterData>...&lt;afterData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;noData>...&lt;noData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromAsciiServiceNOS{#eddtablefromasciiservicenos} 
 [ **EDDTableFromAsciiServiceNOS** ](#eddtablefromasciiservicenos) EDDTable adatkészleteket készít az ASCII szöveges adatszolgáltatásaiból NOAA A [Nemzeti Ocean Service (NOS) ](https://oceanservice.noaa.gov/) ... Információk arról, hogyan működik ez az osztály, és hogyan kell használni, lásd ezt az osztály szuperosztályát [EDDTableFromAsciiService](#eddtablefromasciiservice) ... Nem valószínű, hogy bárki más, mint Bob Simons kell használni ezt az alosztályt.

Mivel a NOS szolgáltatás válaszain belüli adatok egy oszlop ASCII szövegformátumot használnak, a szélességtől és a hosszúságtól eltérő adatoknak különleges tulajdonságot kell tartalmazniuk, amely meghatározza az egyes adatok vonalának melyik karakterét, például a változó adatait tartalmazza,
```
<att name="responseSubstring">17, 25</att>  
```
 
### EDDTableFromAllDatasets{#eddtablefromalldatasets} 
 [ **EDDTableFromAllDatasets** ](#eddtablefromalldatasets) egy magasabb szintű adatkészlet, amely információkat tartalmaz az összes többi adatkészletről, amelyeket jelenleg betöltöttek ERDDAP ... Más típusú adatkészletekkel ellentétben nincs specifikáció a allDatasets adatkészlet datasets.xml ... ERDDAP™ automatikusan létrehoz egy EDDTableFromAllDatasets adatkészletet (vele datasetID = allDatasets ) ... Így, egy allDatasets az adatkészletet minden egyesben létrehozzák ERDDAP™ telepítés és ugyanazt a munkát minden egyesben ERDDAP™ telepítés.

A allDatasets Az adatkészlet egy tabuláris adatkészlet. Minden adatkészlet számára tartalmaz egy sor információt. Minden adatkészlettel kapcsolatos információkkal rendelkezik, például datasetID , hozzáférhető, intézmény, cím, minLongitude, maxLongitude, minLatitude, maxLatitude, minTime, maxTime stb. Mert allDatasets egy mesés adatkészlet, lehet kérni, ugyanúgy, ahogy lehet kérni bármely más tabuláris adatkészlet ERDDAP™ , és megadhatja a fájltípust a válaszhoz. Ez lehetővé teszi a felhasználók számára, hogy nagyon erős módon keressék az érdekeltségeket.
 
### EDDTableFromAsciiFiles{#eddtablefromasciifiles} 
 [ **EDDTableFromAsciiFiles** ](#eddtablefromasciifiles) összesíti az adatokat a comma-tól, a tab-tól, a szemicolon-tól, vagy az űrválasztott tabuláris ASCII adatfájloktól.

* Leggyakrabban a fájlok oszlopneveket kapnak az első sorban, és a második sorban kezdődő adatok. (Itt a fájl első sorát az 1. sorszámnak hívják.) De használható&lt;oszlopNamesRow&gt; és&lt;elsőDataRow&gt; az Ön datasets.xml fájl egy másik sorszám megadásához.
*    ERDDAP™ lehetővé teszi az adatok sorát, hogy különböző számú adatértékekkel rendelkezzenek. ERDDAP™ feltételezi, hogy a hiányzó adatértékek a végleges oszlopok a sorban. ERDDAP™ hozzárendeli a hiányzó értékek standard hiányzó értékét a hiányzó adatértékekhez. (hozzáadott v1.56) 
* Az ASCII fájlok könnyen működnek, de nem a leghatékonyabb módja az adatok tárolásának / visszaszerzésének. A nagyobb hatékonyság érdekében mentse meg a fájlokat, mint NetCDF v3 .nc fájlok (egy dimenzióval, "sorral", amelyet minden változó oszt meg) Ehelyett. Lehet [Használat ERDDAP™ az új fájlok létrehozása](#millions-of-files) ...
* Lásd ezt az osztályt, [EDDTableFromFiles](#eddtablefromfiles) információ arról, hogyan működik ez az osztály, és hogyan kell használni.
* Erősen ajánljuk a használatát [GenerateDatasets Xml program](#generatedatasetsxml) egy durva tervezetet készíteni datasets.xml cunk ehhez az adatkészlethez. Mivel a teljes hiánya metaadata ASCII fájlok, akkor mindig meg kell szerkeszteni az eredményeket GenerateDatasetsXml.
* WARNING: Amikor ERDDAP™ olvassa el az ASCII adatfájlokat, ha egy adott sorban hibát talál (pl. helytelen számú elem) figyelmeztető üzenetet jelent ("WARNING: Bad sor (s) adatok” ... a rossz vonalak listája a későbbi sorokon) a [log.txt fájl](/docs/server-admin/additional-information#log) Ezután továbbra is olvassa el az adatfájl többi részét. Így a te felelősséged rendszeresen nézni (vagy írjon egy forgatókönyvet, hogy ezt tegye) az üzenet a logban. txt, hogy rögzítse a problémákat az adatfájlokban. ERDDAP™ így van beállítva, hogy a felhasználók továbbra is elolvassák az összes rendelkezésre álló érvényes adatot, még akkor is, ha a fájl egyes vonalak hibái vannak.
     
### EDDTableFrom AwsXmlFiles{#eddtablefromawsxmlfiles} 
 [ **EDDTableFrom AwsXmlFiles** ](#eddtablefromawsxmlfiles) összesíti az adatokat egy sor Automatic Weather Station (AWS) XML adatfájlok az WeatherBug Rest XML API használatával (amely már nem aktív) ...

* Ez a fajta fájl egy egyszerű, de nem hatékony módja annak, hogy tárolja az adatokat, mert minden fájl általában úgy tűnik, hogy tartalmazza a megfigyelést csak egy alkalommal. Tehát nagyszámú fájl lehet. Ha szeretné javítani a teljesítményt, fontolja meg a megfigyelések konszolidáló csoportjait (egy hét megéri?) benne NetCDF v3 .nc fájlok (legjobb: .nc fájlok a [CF Discrete Sampling Geometries (DSG) Contiguous Ragged Array formátum](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) ) és használat [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)   (vagy [EDDTableFromNcCFFiles](#eddtablefromnccffiles) ) szolgálja az adatokat. Lehet [Használat ERDDAP™ az új fájlok létrehozása](#millions-of-files) ...
* Lásd ezt az osztályt, [EDDTableFromFiles](#eddtablefromfiles) információ arról, hogyan működik ez az osztály, és hogyan kell használni.
     
### EDDTableFromColumnarAsciiFiles{#eddtablefromcolumnarasciifiles} 
 [ **EDDTableFromColumnarAsciiFiles** ](#eddtablefromcolumnarasciifiles) összesíti a tabuláris ASCII adatfájlok adatait rögzített szélességi oszlopokkal.

* Leggyakrabban a fájlok oszlopneveket kapnak az első sorban, és a második sorban kezdődő adatok. Az első vonal / sor a fájlban hívják row # 1. De használható&lt;oszlopNamesRow&gt; és&lt;elsőDataRow&gt; az Ön datasets.xml fájl egy másik sorszám megadásához.
* A&lt; addAttributes &gt; minden&lt; dataVariable &gt; ezeknek az adatkészleteknek MUST tartalmazza ezt a két különleges tulajdonságot:
    
    *   &lt;att name="startColumn"&gt; *Integráció* &lt;att&gt; - meghatározza a karakter oszlopot minden sorban, amely az adatok kezdete változó.
    *   &lt;att name="stopColumn"&gt; *Integráció* &lt;att&gt; - meghatározza a karakter oszlop minden sorban, amely az 1 után a végén az adatok változó.
    
Az első karakteroszlopot oszlopnak nevezik #0.
Például ez a fájl, amely időértékekkel rendelkezik a hőmérséklet-értékek visszaállítása:
```
      0         1         2        <-- character column number 10's digit
      0123456789012345678901234567 <-- character column number 1's digit
      time                temp
      2014-12-01T12:00:00Z12.3
      2014-12-02T12:00:00Z13.6
      2014-12-03T12:00:00Z11.0
```
az időadatok változója lett volna
```
      <att name="startColumn">0<att>  
      <att name="stopColumn">20<att>  
```
és az időadatok változója lett volna
```
      <att name="startColumn">20<att>  
      <att name="stopColumn">24<att>  
```
Ezek az attribútumok MUST meg kell határozni minden változó, kivéve [fix érték](#fixed-value-sourcenames) és [fájlnév-source-names](#filename-sourcenames) változók.
* Az ASCII fájlok könnyen működnek, de nem hatékony módja az adatok tárolásának / visszaküldésének. A nagyobb hatékonyság érdekében mentse meg a fájlokat, mint NetCDF v3 .nc fájlok (egy dimenzióval, "sorral", amelyet minden változó oszt meg) Ehelyett. Lehet [Használat ERDDAP™ az új fájlok létrehozása](#millions-of-files) ...
* Lásd ezt az osztályt, [EDDTableFromFiles](#eddtablefromfiles) információ arról, hogyan működik ez az osztály, és hogyan kell használni.
* Erősen ajánljuk a használatát [GenerateDatasets Xml program](#generatedatasetsxml) egy durva tervezetet készíteni datasets.xml cunk ehhez az adatkészlethez. Mivel a nehéz meghatározni a kezdeti és vége pozíciók minden adatoszlop és a teljes hiánya metaadata ASCII fájlok, akkor mindig meg kell szerkeszteni az eredményeket a GenerateDatasetsXml.
     
### EDDTableFromHttpGet{#eddtablefromhttpget} 
EDDTable FromHttpGet különbözik az összes többi adatkészlettől ERDDAP™ abban a rendszerben, ahol specifikus "a szerzők" hozzáadhatnak adatokat, felülvizsgálhatják az adatokat, vagy rendszeresen törölhetik az adatokat az adatkészletből HTTP GET vagy [POST](#http-post) számítógépes program, szkript vagy böngésző kérései. Az adatkészletet ugyanúgy kéri a felhasználóktól, hogy minden más EDDTable adatkészlet lekérhető legyen ERDDAP ... Lásd az osztály szuperosztályának leírását, [EDDTableFromFiles](#eddtablefromfiles) , hogy olvassa el azokat a funkciókat, amelyek örököltek ebből a szuperosztályból.

Az EDDTableFromHttpGet egyedi jellemzőit az alábbiakban írják le. El kell olvasnia ezt a kezdeti szakaszt, és meg kell értenie; különben irreális elvárásaid vannak, vagy bajba kerülhetsz, ami nehéz megoldani.

#### Intelligens felhasználás{#intended-use} 
Ez a rendszer célja:

* Tabular (Situ) adatok, nem hálózott adatok.
* valós idejű adatok -
A cél az, hogy engedélyezze a szerző (pl. az érzékelő, egy automatizált QC forgatókönyv, vagy egy adott emberi) változtatni az adatkészleten (egy [.insert vagy .delete parancs](#insert-and-delete) ) és ez lehetővé teszi a változást ERDDAP™ a felhasználók kevesebb mint 1 másodperc alatt, és valószínűleg sokkal gyorsabbak. Az 1 másodperc nagy része hálózati idő. ERDDAP™ feldolgozhatja a kérelmet körülbelül 1 ms, és az adatok azonnal hozzáférhetőek a felhasználók számára. Ez egy [Gyors](#httpget-speed) , [robusztus](#robust) és [megbízható rendszer](#system-reliability) ...
* Szinte minden adat frekvenciája -
Ez a rendszer elfogadhatja a gyakori adatokat (pl. napi) nagyon gyakori adatok (pl. 100 Hz adat) ... Ha optimalizálja a rendszert, képes kezelni a magasabb frekvenciaadatokat (Talán 10 KHz adat, ha szélsőségekbe megy) ...
* Adatok egy érzékelőből vagy hasonló érzékelők gyűjteményéből.
*    [Verzió](#versioning) / [Reprodukálható tudomány](https://en.wikipedia.org/wiki/Reproducibility) / DOI S -
Szituációk, ahol meg kell tudni változtatni az adatok (pl. a minőségellenőrzési zászló megváltoztatása) Tudja, hogy melyik szerző tett minden változást, tudja, hogy mikor a szerző változtatott, és (kérés) látni az eredeti adatokat a változás előtt. Így ezek az adatkészletek jogosultak [ DOI s](https://en.wikipedia.org/wiki/Digital_object_identifier) ... mert találkoznak DOI követelmény, hogy az adatkészlet nem változik, kivéve az aggregáció. Általában a valós idejű adatkészletek közelében nem jogosultak DOI mert az adatok gyakran visszamenőlegesen változnak (pl. QA/QC célokra) ...
     

Miután az adatok egy EDDTableFromHttpGet adatkészletben vannak, minden felhasználó kérhet adatokat ugyanúgy, hogy adatokat kérjen bármely más EDDTable adatkészlettől.
     
#### Kísérlet: Legyen óvatos{#experimental-be-careful} 
Mivel ez a rendszer új, és mivel az elveszett környezeti adatokat nem lehet kielégíteni, kísérleti EDDTableFromHttpGet-t kell kezelnie. Ha átalakul egy másik rendszerből, kérjük, futtassa a régi rendszert és az új rendszert párhuzamosan, amíg nem biztos benne, hogy az új rendszer jól működik (hetek vagy hónapok, nem csak órák vagy napok) ... Minden esetben kérjük, győződjön meg róla, hogy a rendszer külön archiválja a .insert és .delete URL-eket, amelyeket az EDDTableFromHttpGet adatkészlethez küldenek (még akkor is, ha csak az Apache és / vagy Tomcat logs) legalább egy ideig. És minden esetben győződjön meg róla, hogy az EDDTableFromHttpGet adatkészlete rutinszerűen támogatja a külső adattároló eszközöket. (Vegyük észre, hogy [rsync](https://en.wikipedia.org/wiki/Rsync) . támogatja az EDDTableFromHttpGet által létrehozott adatfájlokat nagyon hatékonyan.)   
     
#### .insert és .delete{#insert-and-delete} 

Minden adatkészlethez ERDDAP™ , ha küld egy kérést, hogy ERDDAP™ az adatok egy adathalmazban történő aljzatához megadja a fájltípust, amelyet a válaszra szeretne, például .csv, .htmlTable , .nc , .json ... EDDTableFromHtp Get kiterjeszti ezt a rendszert, hogy támogassa a két további "szűrőtípust", amely beillesztheti (vagy változás) vagy törölje az adatokat az adatkészletben:

* .insert
    * A kérés úgy formázódik, mint egy standard HTML-forma válasz, a kulcs=érték párok, elválasztva a '&'. Például,
        https://*some.erddap.url*/erddap/tabledap/myDataset**.insert**?stationID=46088&time=2016-03-30T12:37:55Z&latitude=10.1&longitude=-150.1&airTemp=17.23&waterTemp=12.3&author=JohnSmith\\_someKey1  
Megjegyzés ERDDAP™ hozzáadni vagy megváltoztatni az adatokat stationID =46088 a megadott időre.
    * Ennek a változásnak a szerzője JohnSmith, és a kulcs néhányKey1.
    * Az URL-nek tartalmaznia kell az érvényes értékeket (nem hiányzó értékek) az egészet [ http GetRequiredVariables](#httpgetrequiredvariables-global-attribute) 
    * Ha az értékek http GetRequired Változók a kérelemben (pl.: stationID és idő) az értékek egy sorban már az adatkészletben, az új értékek hatékonyan felülírják a régi értékeket (bár a régi értékek még mindig elérhetőek, ha a felhasználó adatokat kér egy korábbitól [verzió](#versioning) az adatkészlet) ...
    * A .insert URL-nek soha nem kell tartalmaznia &timestamp= ( ERDDAP™ generálja ezt az értéket) vagy &command= (Ezt a .insert határozza meg (Ez a parancs = 0) vagy .delete (a parancs = 1) ) ...
    * Ha az .insert URL nem határozza meg az adatkészletben található egyéb oszlopok értékeit, akkor feltételezik, hogy az őshonos hiányzó értékek. (MAX\\_VALUE az integrált adattípusokhoz, a NaN for Floats and dupls, és a "" a Strings számára) ...
             
    * .delete
        * A kérés úgy formázódik, mint egy standard HTML-forma válasz, a kulcs=érték párok, elválasztva a '&'. Például,
            https://*some.erddap.url*/erddap/tabledap/myDataset**.delete**?stationID=46088&time=2016-03-30T12:37:55Z&author=JohnSmith\\_someKey1  
Megjegyzés ERDDAP™ törölni az adatokat stationID = 46088 a megadott időpontban.
        * Ennek a változásnak a szerzője JohnSmith, és a kulcs néhányKey1.
        * Az URL-nek meg kell határoznia [ http GetRequiredVariables](#httpgetrequiredvariables-global-attribute) kérelemben (pl.: stationID és idő) ... Ha ezek az értékek már az adatkészletben megfelelnek az értékeknek (melyeket általában) A régi értékek hatékonyan törlődnek (bár a régi értékek még mindig elérhetőek, ha egy felhasználó kéri az adatokat egy korábbi [verzió](#versioning) az adatkészlet) ...
        * Nincs szükség a nem HttpGetRequiredVariables értékeinek megadására, kivéve a szerzőt, amelyre szükség van a kérelem hitelesítéséhez.
             
    
Részletek:
    * .insert és .delete kéréseket formáznak, mint a standard HTML válaszok, a kulcsfontosságú=érték párok, elválasztva a "&". Az értékeknek kell lenniük [százalék kódolva](https://en.wikipedia.org/wiki/Percent-encoding) ... Így speciális karaktereket kell kódolni a %HH formába, ahol a HH a karakter 2 számjegyes hexadecimális értéke. Általában csak néhány punctuációs karaktert kell átalakítania: %-25, és %26, "- %22,&lt;%3C, = %3D, &gt; %3E, + %2B, | %7C, \\[ %5B, \\] %5D, tér %20, és átalakítani minden karakter felett #127 a saját UTF-8 formában, majd százaléka kódolja minden byte az UTF-8 formában a %HH formátum (kérjen programozót segítségért) ...
    * .insert és .delete kéréseknek tartalmazniuk kell a [ http GetRequiredVariables](#httpgetrequiredvariables-global-attribute) pl.: stationID Idő. Mert .insert kérések, változók, amelyek nem meghatározott a kérelem feltételezik, hogy hiányzó értékek (MAX\\_VALUE az integrált változókhoz, a NaN for Float and dupla változókhoz, és egy üres String for String változókhoz) ... For .delete kérések, értékek a non-HttpGetRequired Variables (más, mint szerző, amire szükség van) figyelmen kívül hagyják.
    * .insert és .delete kéréseknek tartalmazniuk kell a szerző nevét és a szerző kulcsát a szerző formanyomtatványában; *szerzői_key* a kérelem utolsó paramétereként. Következésképpen ez a végső biztosíték, hogy az egész kérést megkapta ERDDAP ... Csak a szerző (nem a kulcs) az adatfájlban tárolódik. Meg kell határoznia a megengedett listát *szerzői_key* A globális tulajdonságon keresztül [ http GetKeys](#httpgetkeys) 
    * .insert és .delete paraméterek lehetnek szkalár (Egyetlen) bármilyen hosszúság értékei vagy sorai a formában \\[ érték1,érték2,érték3,...,értékN \\] ... Egy adott kérelemhez minden változónak meg kell szereznie a sorokat ugyanazon értékekkel. (más ez egy hiba) ... Ha egy kérelem skalár- és tömör értékeket tartalmaz, a skalár értékeket megismételik, hogy ugyanolyan hosszúságúak legyenek, mint a meghatározott tömbök, pl. & stationID =46088 kezelhető és stationID = \\[ 46088,46088,46088 \\] ... Az Arrays a kulcs a [magas teljesítmény](#httpget-speed) ... Szerkesztés nélkül kihívást jelent a .insert vagy .delete több mint 8 sor adat másodpercenként egy távoli szerzőtől (a hálózat egésze miatt) ... A sorozatokkal könnyű lesz .insert vagy .deletet több mint 1000 sor adat másodpercenként távoli érzékelőből.
    * .insert és .delete elfogadja (hibaüzenet nélkül) úszópontszámok, amikor az integrálók várhatóak. Ezekben az esetekben az adatkészlet az integrálók értékeit kerekíti.
    * .insert és .delete elfogadja (hibaüzenet nélkül) integráló és lebegő pontszámok, amelyek a változó adattípusának határán kívül vannak. Ezekben az esetekben az adatkészlet az értékeket tárolja, mint ERDDAP natív hiányzó értékek az adattípushoz (MAX\\_VALUE az integrált típusokhoz és a NaN-hez floatokhoz és duplákhoz) ...
         
#### Válasz{#response} 
Ha a .insert vagy .delete URL sikerül, a HTTP válaszkód 200 lesz (OK) a válasz szöveg lesz egy .json tárgy, pl.
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-11-05T22:12:19.517Z",
    "numericTimestamp":1.541455939517+E9
    }
```
Vegye figyelembe, hogy az időbélyegzők milliszekundus precizitásúak.

Ha a .insert vagy .delete URL nem sikerül, akkor kap egy HTTP válaszkódot, amely 200-nál más, mint 200 (Okéy) , pl. hiba 403 Tilos, ha egy helytelen szerzői kulcsértéket nyújt be. ERDDAP™ küldi a HTTP válaszkódot (nem, pl. .json formázott hiba) mert így történik a dolgok az interneten, és mivel a hibák bárhol előfordulhatnak a rendszerben (pl. a hálózatban, amely visszatér egy HTTP hiba) ... Ha a hiba a ERDDAP™ A válasz tartalmazhat néhány szöveget (nem .json ) részletesebb magyarázattal, hogy mi rosszul ment, de a HTTP válaszkód (200=Oké, bármi más baj) a megfelelő módja annak, hogy ellenőrizze, hogy a .insert vagy .delete sikerült-e. Ha a HTTP válaszkód ellenőrzése nem lehetséges, vagy kényelmetlen, keresse meg a "status": "siker" a válaszszövegben, amely megbízható jelzése a sikernek.
    
#### Bejelentkezési fájlok{#log-files} 
Amikor az EDDTableFromHttpGet .insert és .delete parancsokat kap, egyszerűen módosítja az információkat a releváns fájlhoz egy sor naplófájlban, amelyek mindegyike egy táblázat, amelyet egy táblázat tárolt [JSON Lines CSV fájl](https://jsonlines.org/examples/) ... Amikor egy felhasználó kéri az adatokat, ERDDAP™ gyorsan elolvassa a releváns naplófájlokat, alkalmazza az adatkészlet módosításait az általuk készített sorrendben, majd szűri a kérelmet a felhasználó korlátain keresztül, mint bármely más ERDDAP™ adatkérés. Az adatok felosztása különböző logfájlokba, különböző információs darabok tárolása (pl. a parancs üteme, és hogy a parancs .insert vagy .delete volt-e) , és az adatkészlet különböző aspektusai, mindez lehetővé teszi ERDDAP az adatok tárolása és az adatok visszaszerzése ezen adatkészletből nagyon gyorsan és nagyon hatékonyan.
     
#### Biztonsági és Szerző{#security-and-author} 
Minden .insert és .delete parancsnak tartalmaznia kell &author= *szerzői_key* mint az utolsó paraméter, ahol a szerző_key a szerző azonosítójából áll (Választott: neve, kezdetek, pseudonym, szám) , egy alpont és egy titkos kulcs. A ERDDAP™ Az adminisztrátor együttműködik a szerzőkkel, hogy létrehozza az érvényes szerző\\_key értékek listáját, amely bármikor megváltoztatható.
Amikor az EDDTableFromHttpGet kap egy .insert vagy .delete parancsot, győződjön meg róla, hogy az autoID\\_key az utolsó paraméter és érvényes. Mert ez az utolsó paraméter, azt jelzi, hogy az egész parancssor elérte ERDDAP™ és nem trunkáltak. A titkos kulcs biztosítja, hogy csak specifikus szerzők lehet beilleszteni vagy törölni adatokat az adatkészletben. ERDDAP™ Ezután kivonja a szerzői jogot, és megmenti azt a szerzői változóban, hogy bárki láthassa, aki felelős az adatkészlet egy adott változásáért.
.insert és .delete parancsokat csak keresztül lehet tenni https:   (biztonságos)   ERDDAP™ URL. Ez biztosítja, hogy az átadott információt a tranzit során titokban tartsák.
     
#### Timetamp{#timestamp} 
A log rendszer részeként az EDDTableFromHttpGet egy időbélyegzőt ad hozzá (az idő, ERDDAP megkapta a kérést) minden parancsra, amelyet a logfájlokban tárol. Mert ERDDAP™ generálja az időbélyeget, nem a szerzők, nem számít, hogy a különböző szerzők változtatásokat tesznek-e a számítógépek óráival, amelyek kissé eltérőek. Az időbélyegző megbízhatóan jelzi azt az időt, amikor a változás az adatkészletbe került.
     
#### HTTP POST{#http-post} 
*    [Mi a helyzet a HTTP POST-val?](#http-post)   
HTTP [POST](https://en.wikipedia.org/wiki/POST_(HTTP) A jobb alternatíva (összehasonlítva HTTP GET ) információ küldése egy ügyféltől egy HTTP szerverre. Ha lehet, vagy ha tényleg javítani akar a biztonságot, használja a POST-t a GET helyett, hogy elküldje az információkat ERDDAP ... A POST biztonságosabb, mert: GET és https Az URL-t biztonságos módon továbbítják, de az egész URL (beleértve a paramétereket, köztük a szerző\\_key) Az Apache, Tomcat és ERDDAP™ naplófájlok, ahol valaki elolvashatja őket, ha a fájlokat nem megfelelően biztosítják. A POST segítségével a paramétereket biztonságos módon továbbítják, és nem írják a naplófájlokra. A POST egy kicsit nehezebb az ügyfelek számára, hogy együttműködjenek, és nem támogatja az ügyfélszoftverek széles körét, de a programozási nyelvek támogatják azt. A GET-en vagy POST-on keresztül küldött adatkészlet tartalma ugyanaz lesz, csak más módon formázva.
     
####  http GetRequired Globális tulajdonságok{#httpgetrequiredvariables-global-attribute} 
Az egész rendszer működésének alapvető része a szükséges globális tulajdonság http GetRequired Variables, amely egy képregény-választott listája dataVariable forrás nevek, amelyek egyedülállóan azonosítják az adatok sorát. Ez a lehető legkisebb, és szinte mindig magában foglalja az idő változóját. Például itt vannak az ajánlott http GetRequired Variables minden egyes [CF Discrete Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)   (Természetesen az azonosító nevek eltérőek lehetnek az adatkészletben.) :

* TimeSeries: stationID Idő
* Trajectory: trajectoryID, idő
* Profilhoz: idő (feltételezési idő a profil\\_id) , mélység
* A TimeSeries Profil: stationID Idő (feltételezési idő a profil\\_id) , mélység
* Trajektor Profil: trajectoryID, idő (feltételezési idő a profil\\_id) , mélység

    
A TimeSeries mint példa:
Tekintettel egy .insert parancsra, amely magában foglalja stationID =46088 és idő=2016-06-23T19:53:00Z (egyéb értékek más változók számára) :
* Ha nincs meglévő adat az állomásra, és ez az idő, akkor a hatás az adatkészlethez hozzáadódik.
* Ha az állomás és az adott idő meglévő adatai vannak, akkor a hatás az lesz, hogy felváltsa az adatok meglévő sorát ezzel az új adatokkal. (Természetesen, mivel ERDDAP™ megtartja minden parancs naplóját, amelyet kap, a régi adatok még mindig a naplóban vannak. Ha egy felhasználó az adatkészlet egy verziójából kéri az adatokat, mielőtt ez a változás megtörténik, akkor meglátják a régebbi adatokat.)   
         
####  http GetDirectorySzerkesztés{#httpgetdirectorystructure} 
*    [ http GetDirectory Struktúra globális tulajdonság és adatok (Bejelentkezés) File nevek](#httpgetdirectorystructure)   
Az, ami ezt az egész rendszert hatékonyan teszi, az az, hogy ERDDAP™ létrehoz egy sor adatot (Napló) fájlok, mindegyik az adatkészlet egy másik darabjával. Ha ezeket jól állítják, ERDDAP™ képes lesz gyorsan reagálni az adatok legtöbb kérésére. Ezt a beállítást a http GetDirectoryStructure globális tulajdonság, amely egy String, amely úgy néz ki, mint egy relatív fájlnév, pl.: stationID /10 év", de valójában a könyvtári struktúra specifikációja. Ennek a részei jelzik, hogy a könyvtár és a fájlnév az adatokhoz (Napló) fájlokat építenek.
    
    * Ha egy rész egy integráló (&gt;= 1) plusz egy időPeriod (millisecond, második, perc, óra, dátum, hónap, év vagy plurális) , például 10 év, majd az EDDTableFromHttpGet adatkészlet időt vesz igénybe az adatok sorára (pl. 2016-06-23T19:53:00Z) kiszámítja az időt erre a pontosságra (pl. 2010) Készítsen egy mappát vagy fájltName-t ebből.
        
A cél az, hogy minden fájlba ésszerűen nagy mennyiségű adatot kapjunk, de sokkal kevesebb, mint 2 GB.
        
    * Ellenkező esetben a specifikáció része a specifikációnak kell lennie dataVariable A sourceName pl.: stationID ... Ebben az esetben az EDDTableFromHttpGet mappát vagy fájlnévet készít az adatok új sorára változó értékéből. (pl.: "46088") ...
    
Mivel a .insert és a .delete parancsadatok bizonyos adatokban tárolódnak (Napló) fájlok, EDDTableFromHttpGet általában csak meg kell nyitni egy vagy néhány adat (Napló) fájlokat, hogy megtalálja az adatokat egy adott felhasználói kérésre. És mivel minden adat (Napló) A fájlnak minden releváns információja van az adatkészlet zsúfjára, gyors és egyszerű az EDDTableFromHttpGet számára, hogy egy adott verziót készítsen (vagy a jelenlegi verzió) az adatkészlet az adott fájlban (és nem kell generálni a teljes adatkészlet kért verzióját) ...
    
Az általános iránymutatások az adatok mennyiségén és gyakoriságán alapulnak. Ha 100 byte-ot veszünk fel az adatok soránként, akkor ...
``` 
    | Frequency  <br>of measurements | Recommended  <br>httpGetDirectoryStructure |
    | --- | --- |
    | \\>=1 per second | *featureID*/1year/1day |
    | \\>=1 per minute | *featureID*/2months |
    | \\>=1 per hour | *featureID*/10years |
    | \\>=1 per day | *featureID* |
```
Például, ha a könyvtár szerkezete stationID /2 hónap, és beilleszti az adatokat két állomásról (46088 és 46155) időértékekkel 2015 decemberétől 2016 májusáig, EDDTableFromHttp Létrehozza a 46088 és a 46155 nevű könyvtárakat, és fájlokat hoz létre a 2015–11-es néven. .json l, 2016-01 .json l, 2016-03 .json l, 2016-05 .json L (minden 2 hónapos adatot tartalmaz az érintett állomás számára) ... A jövőben bármikor, ha használja .insert vagy .delete, hogy megváltoztassa vagy törölje az adatokat, például állomás 46088 2016-04-05T14:45:00Z, EDDTableFromHtp Szerezd meg ezt a parancsot 46088/2016-03 .json l, a releváns adatok (Napló) fájl. És egyértelmű, hogy a jövőben bármikor hozzáadhat adatokat más állomásokhoz, mivel az adatkészlet egyszerűen további könyvtárakat hoz létre az új állomások adatainak megtartásához.
    
####  http GetKeys{#httpgetkeys} 
Minden EDDTable FromHtp Az adatkészletnek globális tulajdonsággal kell rendelkeznie http GetKeys, amely meghatározza a listát engedélyezett szerzők és a titkos kulcsok, mint egy Comma-választott lista a *szerzői_key* pl.: JohnSmith\\_someKey1, HOBOLogger\\_someKey2, QCScript59\\_someKey3.
* szerző\\_key esetérzékeny, és teljesen ASCII karaktereknek kell lennie (#33 - #126, és bármilyen komma nélkül, " vagy" karaktereknek
* A kulcsok olyanok, mint a jelszavak, így lehetnek &gt;=8 karakterek, nehéz kitalálni, és belső szótári szavak nélkül. Meg kell kezelni őket, ahogy kezelni a jelszavakat - tartsa őket privát.
* Az első "\\_" karakter elválasztja a szerzőt a kulcstól, így a szerző neve nem tartalmazhat "\\_" karaktert (de egy kulcs lehet) ...
* Bármely adott szerzőnek lehet egy vagy több szerző\\_key, például JohnSmith\\_some Key1, JohnSmith\\_some Key7, stb.
* Ezt a tulajdonságot bármikor megváltoztathatja. A változások a következő alkalommal lépnek hatályba, amikor az adatkészletet betöltik.
* Ez az információ eltávolításra kerül az adatkészlet globális tulajdonságaiból, mielőtt nyilvánosságra kerül.
* Az adatkészlet beillesztésére vagy törlésére vonatkozó minden kérelemnek tartalmaznia kell egy &author= *szerzői_key* paraméter. A kulcs érvényességének ellenőrzése után, ERDDAP™ csak mentse meg a szerző részt (nem a kulcs) az adatfájlban.

#### Beállítás{#set-up} 

Íme az ajánlott lépések az EDDTableFromHttpGet adatkészlet létrehozásához:

1. Készítse el a fő könyvtárat, hogy tartsa ezt az adatkészletet. Például használjuk /data/testGet/ . A felhasználó fut GenerateDatasetsXml és a felhasználó fut ERDDAP™ Mindkettőnek olvasható írásbeli hozzáférése van ehhez a könyvtárhoz.
     
2. Használjon egy szövegszerkesztőt, hogy egy mintát készítsen .json l CSV fájl a kiterjesztéssel .json l ebben a könyvtárban.
A név nem fontos. Például hívhatja mintát .json L
Készítsen egy 2 vonalat .json l CSV fájl, oszlop nevekkel az első sorban és dummy/tipikus értékekkel (a helyes adattípus) a második sorban. Itt egy mintafájl, amely alkalmas egy gyűjteményre featureType =TimeSeries adatok, amelyek mért levegő és víz hőmérséklet.
     \\[ Mert featureType = Tárgy, változhat stationID trajectoryID. \\]   
     \\[ Mert featureType = profil, meg lehet változtatni stationID profilid legyen, és mélységváltozatot adjon hozzá. \\] 
    
     \\[ "..." stationID -, "time" "latitude", "hosszúság", "airTemp", "waterTemp", "timestamp", "author", "parancsnok" \\] 
     \\[ "myStation", "2018-06-25T17:00Z", 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, "SomeBody", 0 \\] 
    
Megjegyzés:
    * A tényleges adatértékek nem számítanak, mert végül törölni fogja ezt a fájlt, de a megfelelő adattípusnak kell lenniük. Figyelemre méltó, hogy az idő változónak ugyanazt a formátumot kell használnia, amelyet a forrásból származó tényleges adatok fognak használni.
    * Minden változó esetében a sourceName egyenlő lesz destinationName , így használja a helyes / végleges változó nevek most, beleértve az időt, a szélességet, a hosszúságot, és néha mélységet vagy a magasságot, ha az információval változók szerepelnek.
    * Szinte mindig lesz egy változó elnevezésű idő, amely rögzíti a megfigyelést. Lehet adatType String with [A szigorú időkre alkalmas egységek](#string-time-units)   (pl.: yyyy-MM-dd T'HH:mm:ss.SSSZ) vagy adat Type dupla, [numerikus időkre alkalmas egységek](#time-units)   (pl. másodpercek 1970-01-01T00:00Z óta, vagy más bázisidő) ...
    * Három oszlop (általában az utolsó három) Időbélyegzőnek, szerzőnek, parancsnak kell lennie.
    * Az időbélyegző oszlopot az EDDTableFromHttpGet fogja használni, hogy hozzáadjon egy időbélyeget, amely jelzi, amikor egy adott adatsorot adott az adatfájlhoz. Adattípus kettős és egységek másodpercek óta 1970-01-01T00:00Z.
    * A szerző oszlop az adatType String lesz felhasználva, hogy rögzítse, melyik engedélyezett szerző adott ezt a vonaladat. Az engedélyezett szerzőket a [ http GetKeys globális tulajdonsága](#httpgetkeys) ... Bár a kulcsokat úgy határozzák meg, mint *szerzői_key* és ebben a formában a "kérés" URL-ben vannak, csak a szerzői rész mentésre kerül az adatfájlban.
    * A parancs oszlop az adatType byte jelzi, ha az adatok ezen a vonalon egy beillesztés (0 0) vagy törlés (1) ...
         
3. Run GenerateDatasets Xml és mondja el
    
    1. Az adatkészlet típusa EDDTableFromHttpGet
    2. A könyvtár a (erre a példára) /data/test Get/
    3. A minta fájl (erre a példára) /data/testGet/startup .json L
    4. A http GetRequired A változók (erre a példára)   stationID Idő Lásd a leírást [ http GetRequiredVariables](#httpgetrequiredvariables-global-attribute) alá.
    5. Ha az adatokat 5 percenként gyűjtik, az http GetDirectorySzerkesztés erre a példára stationID /2 hónap . Lásd a leírást [ http GetDirectorySzerkesztés](#httpgetdirectorystructure) alá.
    6. A [ http GetKeys](#httpgetkeys) 
    
Add hozzá a kimenetet (A zsák datasets.xml az adatkészlethez) a datasets.xml ...
     
4. Edit datasets.xml cunk ehhez az adatkészlethez, hogy helyes és teljes legyen.
Valószínűleg cserélje ki az összes ??? megfelelő tartalommal.
     
5. Mert&lt;fájlTableInMemory&gt; beállítás:
    * Állítsa be ezt igaznak, ha az adatkészlet általában gyakori .insert és / vagy .delete kéréseket kap (pl. gyakrabban, mint 10 másodpercenként) ... Ez segít az EDDTableFromHttpGet gyorsabban reagálni .insert és / vagy .delete kérésekre. Ha ezt igaznak állítja, az EDDTableFromHttpGet továbbra is megmenti a fájlTable és a kapcsolódó információkat a lemezre rendszeresen (szükség szerint nagyjából 5 másodpercenként) ...
    * Állítsd ezt hamisnak (az alapértelmezett) ha az adatkészlet általában gyakori .insert és / vagy .delete kéréseket kap (pl. kevesebb, mint 10 másodpercenként) ...
         
6. Megjegyzés: Használható&lt;cacheFromUrl&gt; és kapcsolódó beállítások datasets.xml EDDTable FromHtp Szerezzen adatkészleteket, mint egy módja annak, hogy egy távoli EDDTableFromHttpGet adatkészletet készítsen és tartsa fenn egy másik oldalon ERDDAP ... Ebben az esetben azonban ez a helyi adatkészlet elutasít minden .insert és .delete kérést.

#### Az EDDTable használatával FromHttpGet Adatkészletek{#using-eddtablefromhttpget-datasets} 

* A szerzők "kérelmeket" tehetnek, amelyeket [adatok beillesztése vagy az adatok törlése az adatkészletből](#insert-and-delete) ...
     
* Miután a valós adatokat beillesztették az adatkészletbe, törölheti és törölheti az eredeti mintaadat fájlt.
     
* A felhasználók adatokat kérhetnek az adatkészlettől, mivel bármilyen más EDDTable adatkészletet tesznek ERDDAP ... Ha a kérelem nem tartalmazza az időbélyegző oszlop korlátozását, akkor a kérelem az adatkészlet jelenlegi verziójából származik. (a naplófájl az összes beilleszkedési és törlési parancs feldolgozása után, és a http GetRequiredVariables) ...
     
* A felhasználók olyan kéréseket is tehetnek, amelyek specifikusak az EDDTableFromHttpGet adatkészletekhez:
    * Ha a kérelem tartalmaz egy&lt;vagy&lt;= az időbélyegző oszlop korlátozása, majd ERDDAP™ folyamatok sorai a napló fájl felfelé, amíg a megadott ütemterv. Valójában ez az időnként törli az adatkészlettel kapcsolatos összes változást, mivel ez az időmérő érték. További információért lásd [Verzió](#versioning) ...
    * Ha a kérelem tartalmaz egy &gt;, &gt;= vagy = az időbélyegző oszlop korlátozását, például &timestamp&lt;=0, akkor ERDDAP™ visszaküldi az adatfájlok adatait, mivel a beillesztési és törlési parancsok feldolgozása nélkül.
* A jövőben azt látjuk, hogy az eszközök épülnek (ugye? Te?) az ilyen adatkészletekkel való együttműködéshez. Például lehet egy forgatókönyv, amely elolvassa a nyers logófájlokat, más kalibrációs egyenleteket alkalmaz, és más adatállományt generál/frissít az adott származtatott információval. Vegye figyelembe, hogy a forgatókönyv megkaphatja az eredeti adatokat kéréssel ERDDAP™   (amely az adatokat a fájl formátumban kapja, amely a legkönnyebb a forgatókönyvnél dolgozni) és frissítse az új adatkészletet .insert "kérések" segítségével ERDDAP ... A forgatókönyvnek nincs szüksége közvetlen hozzáférésre az adatfájlokhoz; bármely engedélyezett szerző számítógépén lehet.
     

#### Részletes információk az EDDTableFromHttpGet-ről{#detailed-information-about-eddtablefromhttpget} 

A témák:

*    [Ne változtassa meg a beállítást&#33;](#dont-change-the-setup) 
*    [CRUD](#crud) 
*    [InvalidRequests](#invalidrequests) 
*    [Speed](#httpget-speed) 
*    [Robuszt](#robust) 
*    [Rendszermegbízhatóság](#system-reliability) 
*    [Verzió](#versioning) 
*    [Mi a helyzet a HTTP PUT és a DELETE?](#https-put-and-delete) 
*    [Megjegyzések](#httpget-notes) 
*    [A CHORDS-nek köszönhetően az alapvető ötletért.](#thanks) 

Itt van a részletes információ:

##### Ne változtassa meg a beállítást&#33;{#dont-change-the-setup} 
Miután létrehozták az adatkészletet, és hozzáadta az adatokat:

* Ne add hozzá vagy távolítsd el dataVariable S.
* Ne változtassa meg a sourceName vagy destinationName A dataVariable S.
* Ne változtassa meg az adatokat típusa dataVariable S. De megváltoztathatja a dataVariable Metaadata.
* Ne változtassa meg a http GetRequired Variables globális tulajdonság.
* Ne változtassa meg a http GetDirectoryStructure globális tulajdonság.

Ha ezen dolgok bármelyikét meg kell változtatnia, hozzon létre egy új adatkészletet, és adja át az összes adatot az új adatkészletre.
     
##### CRUD{#crud} 
A számítógépes tudományban az adatkészlettel való munka négy alapvető parancsa [CREATE, READ, UPDATE, DELETE (CRUD) ](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) ... Az SQL, a kapcsolati adatbázisokkal való együttműködés nyelve egyenértékű az INSERT-ben, az SELECT-ben, az UPDATE-ban és a DELETE-ben. EDDTableFromHttpGet,

* .insert a CREATE és az UPDATE kombinációja.
* .delete DELETE.
* Az adatkészletek kérésére szolgáló rendszer READ.

Így az EDDTableFromHttpGet támogatja az összes alapvető parancsot egy adatkészlettel való munkavégzéshez.
     
* .insert vagy .delete kérések hiba nélkül visszatér HTTP status code=200 és egy JSON objektum, pl.
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-03-26T15:34:05.552Z",
    "numericTimestamp":1.522078445552E9
    }
```
A két ütemű értékek ugyanazon milliszekundumra utalnak, amely a milliszekundum, amelyet az időbélyegben tárolnak, változóvá válnak azok az adatok sorai, amelyeket beillesztettek vagy töröltek. ERDDAP™ nem fogja megváltoztatni e kulcsfontosságú értékű párok nevét és formázását a jövőben. ERDDAP™ további kulcsfontosságú értékű párokat adhat hozzá a JSON objektumhoz a jövőben.
     
##### InvalidRequests{#invalidrequests} 
Érvénytelen .insert vagy .delete kérések visszatérnek egy HTTP hiba státusz kódot más, mint a status=200, és nem lesz változás az adatkészlet. Ez magában foglalja a helytelen szerzői információkkal kapcsolatos kérelmeket, helytelen változó neveket, különböző tömbhosszokat különböző változók számára, a szükséges változók hiánya, a szükséges változó értékek hiánya stb. Ha a kérelem egynél több adatfájlot tartalmaz, lehetséges, hogy a kérelem egy része sikeres lesz, és a rész kudarcot vall. Ez azonban nem jelent problémát, ha a kérelem küldése hibát teljes kudarcnak tekint. Például, ha mondod ERDDAP™ Insert (vagy törlés) ugyanazok az adatok kétszer egy sorban, a legrosszabb esetben az, hogy az információt kétszer tárolják, zárva a logfájlban. Nehéz meglátni, hogy ez hogyan okozhat bajt.
     
##### HttpGet sebesség{#httpget-speed} 
For .insert vagy .delete kérések (nem számít http Felső) , ballpark számozza a sebességet .insert vagy .delete
1ms / .insert 1 sor adattal
2ms / .insert 10 sor adatsorban ( \\[  \\] )   
3ms / .insert 100 sor adatot tartalmaz a sorozatokban ( \\[  \\] )   
13ms / .insert 1000 sor adatot tartalmaz a sorozatokban ( \\[  \\] )   
Nyilvánvalóan a sorok a kulcsok [magas teljesítmény](#httpget-speed) ... Szerkesztés nélkül kihívást jelent a .insert vagy .delete több mint 8 sor adat másodpercenként egy távoli szerzőtől (a hálózat egésze miatt) ... A sorozatokkal könnyű lesz .insert vagy .deletet több mint 1000 sor adat másodpercenként távoli érzékelőből.

Nagyon nagy mennyiségű adat kérésre, meg fogja találni Tomcat határát a maximális lekérdezés hossza (Az alapértelmezett 8KB?) Ez azonban növelhető a maxHttpHeaderSize beállítás szerkesztésével *Tomcat* /conf/server.xml HTTP/1.1 Connector belép.

Mikor ERDDAP™ olvassa el a JSON Lines CSV adatait (Napló) fájlok, van egy kis időbüntetés, összehasonlítva a bináris adatfájlok olvasásával. Úgy éreztük, hogy ez az idő büntetés, amikor az olvasás ésszerű ár, hogy fizetni a sebesség és a robusztus a rendszer írása adatok (amely elsődleges fontosságú) ...

##### SSD{#ssd} 
 [Nagyobb sebességgel,](#ssd) Használjon [Szilárd állami vezetés (SSD) ](https://en.wikipedia.org/wiki/Solid-state_drive) tárolni az adatokat. Sokkal gyorsabb hozzáférési idővel rendelkeznek (&lt;0,1ms) a kemény lemezmeghajtóknál (3 - 12 ms) ... Gyorsabb adatátviteli arányuk is van (200 - 2500 MB/s) mint a kemény lemez meghajtók (200 MB/s) ... Költségük jelentősen leállt az elmúlt években. Bár a korai SSD-nek problémái voltak egy adott blokkra írt nagyszámú írás után, ez a probléma most nagymértékben csökkent. Ha csak az SSD-t használja, hogy egyszer írja az adatokat, akkor sokszor olvassa el, még egy fogyasztói minőségű SSD-t is. (ami jelentősen olcsóbb, mint egy vállalati szintű SSD) Hosszú ideig kell tartani.
    
##### Robuszt{#robust} 
Megpróbáltuk ezt a rendszert a lehető legegyszerűbbé tenni és robusztusabbá tenni.
* A rendszer célja, hogy több szál legyen (pl. az érzékelő, egy automatizált QC forgatókönyv és egy emberi) egyidejűleg ugyanazon adatkészleten dolgozunk, és még ugyanazon fájlon is. Ennek nagy része lehetséges azáltal, hogy egy log fájl megközelítést használ az adatok tárolására és egy nagyon egyszerű fájltípus használatával, [JSON Lines CSV fájlok](https://jsonlines.org/examples/) Az adatok tárolására.
* Egy másik hatalmas előnye a JSON Lines CSV, hogy ha egy fájl valaha is sérült (pl., érvénytelen egy vonal hibája miatt) Könnyű megnyitni a fájlt egy szövegszerkesztőben, és rögzíteni a problémát.
* Egy másik előny, ha hiba van egy sorban egy fájlban, a rendszer még mindig elolvashatja az összes adatot a sorok előtt és után a hibavonalat. És a rendszer még naplózhat további .insert és .delete információt.
* Hatalmas előnye az admin-hozzáférhető szabványfájlok használatának (egy kapcsolati adatbázishoz vagy Cassandra-hoz vagy más szoftverhez képest) : Nincs más szoftver, amelyet fenn kell tartani, és aminek futnia kell az adatok tárolásához vagy visszaküldéséhez. És könnyen visszaállíthatja a szabványos fájlokat bármikor, és rendkívüli módon, mert az adatok zsunkban vannak (egy idő után, csak az egyes állomások jelenlegi idejű fájlja változik) ... Ezzel szemben jelentős erőfeszítést és rendszert igényel, hogy külső biztonsági fájlokat készítsenek adatbázisokból és Cassandra-ból.
         
##### Rendszermegbízhatóság{#system-reliability} 
Ésszerű elvárni egy kiszolgálót ERDDAP™ 99,9% uptime - ez körülbelül 9 óra leállás évente (Bár ezt egy rossz éjszakában használhatja&#33;) ...
Ha szorgalmas vagy szerencsés, akkor 99,99%-os uptime-t kaphat (53 perces leállás évente) Mivel a frissítések csak néhány újraindítása sok időt vesz igénybe.
Szélsőséges intézkedéseket kell tenned (külön backup szerver, megszakíthatatlan energiaellátás, backup légkondicionálás, 24x7x365 személyzet a helyszín nyomon követésére stb.) vékony esély 99,999% uptime (5.25 perces leállás évente) ... Még akkor is, rendkívül valószínűtlen, hogy eléri a 99,999% uptime (vagy akár 99,99%) mert a problémák gyakran az irányításán kívül vannak. Például az Amazon Web Service és a Google csodálatosan megbízható webszolgáltatásokat kínál, de a nagy részeket néha órákig levonják.

Arcra, mindenki akar ERDDAP™ 100%-os felállás, vagy legalábbis a vadon élő "hat kilences" (99,999% uptime egyenlő 32 másodpercnyi leállás évente) De nincs mód arra, hogy megszerezd, függetlenül attól, hogy mennyi időt, erőfeszítést és pénzt költesz.

De ERDDAP™ Az uptime nem az igazi cél itt. A cél az, hogy megbízhatóan építsünk **rendszerrendszer** Az egyik, amely nem veszít el semmilyen adatot. Ez egy megoldható probléma.

A megoldás: hiba toleranciát építeni a számítógépes szoftverbe, amely az adatokat elküldi ERDDAP ... Pontosabban, hogy a szoftvernek fenntartania kell az adatok sorát, amelyek arra várnak, hogy menjen ERDDAP ... Amikor az adatok hozzáadódik a sorhoz, a szoftvernek ellenőriznie kell a válaszot ERDDAP ... Ha a válasz nem tartalmazza a kapott adatokat. Nincs hiba, akkor a szoftvernek el kell hagynia az adatokat a sorban. Ha több adat keletkezik és hozzáadódik a sorhoz, a szoftvernek újra meg kell próbálnia beállítani az adatokat a sorban (talán a \\[  \\] rendszerrendszer) ... Sikeres vagy kudarcot vall. Ha nem sikerül, később megpróbálja. Ha így írja a szoftvert, és ha a szoftver készen áll arra, hogy néhány napos adatkérést végezzen, akkor valójában jó esélye van az érzékelő adatainak 100%-os feltöltésére. ERDDAP ... És megtette, anélkül, hogy nagy erőfeszítést vagy költséget tenne.

 \\[ Háttér: Nem gondoltuk ezt. [Így érik el a számítógépes hálózatok a megbízhatóságot.](https://en.wikipedia.org/wiki/Reliability_(computer_networking) ) A számítógépes hálózatok teljesen megbízhatatlanok. Tehát, ha egy fájlt egy számítógépről a másikra továbbít, a küldő szoftver tudja / várja, hogy néhány csomag elveszett. Ha nem kap megfelelő elismerést egy adott csomaghoz a vevőtől, akkor újraküldi az elveszett csomagot. Ezzel a megközelítéssel viszonylag egyszerű küldő és vevő szoftver megbízható fájlátviteli rendszert építhet a megbízhatatlan hálózat tetején. \\] 
    
##### Miért a JSON Lines CSV fájlokat?{#why-json-lines-csv-files} 
EDDTableFromHttpGet használata [JSON Lines CSV fájlok](https://jsonlines.org/examples/) . az adatok tárolására. Az okok:

* A fő oka: A JSON Lines CSV fájlok egyszerűsége gyors, egyszerű és megbízható módja annak, hogy több szálat írjon egy adott fájlra (pl. a fájlnév szinkronizálásával) ...
* Ha egy JSON Lines CSV fájl valaha lett korrupt (pl., érvénytelen egy vonal hibája miatt) Az EDDTableFromFromHttpGet még mindig elolvashatta az összes adatot a hibavonal előtt és után. És a .insert és a .delete rendszer továbbra is új adatokat adhat az adatfájlhoz.
* Mivel a JSON Lines CSV fájlok ASCII fájlok, ha egy fájl valaha is korrupt lett, könnyű lenne rögzíteni (egy szövegszerkesztő) ...
* A JSON Lines CSV támogatja Unicode húrok.
* A JSON Lines CSV támogatja a változó hosszadalmakat (nem korlátozott néhány max hossza) ...
* A JSON Lines CSV 64 bites integrálót támogat (hosszúság) ...
* A JSON Lines CSV formális jellege és extra szintaxisa (vs régi iskola CSV) biztosítékot biztosít, hogy egy adott vonal nem sérült meg.

Kezdetben megpróbáltuk használni .nc 3 fájl korlátlan dimenzióval. Azonban voltak problémák:

* A fő probléma az volt: Nincs megbízható módja annak, hogy több szálat írjon egy .nc 3 fájl, még akkor is, ha a szálak együttműködnek az írások szinkronizált módon.
* Ha egy .nc 3 fájl korrupt, a .insert és .delete rendszer nem tudja továbbra is használni a fájlt.
* Mert .nc 3 fájl bináris, ha egy fájl sérült (amit a többszörös probléma miatt csinálnak) túl kemények vagy lehetetlenek a javításhoz. Nincs eszköz a javításhoz.
* A CF-nek nincs módja a sztringek kódolásának meghatározására, így nincs hivatalos módja annak, hogy támogassa az Unicode-t, például az UTF-8 kódolást. Megpróbáltuk megszerezni a CF-t, hogy támogassunk egy \\_Encoding tulajdonságot, de képtelenek voltak bármilyen előrelépést elérni. ( Unidata A hitelükre a \\_Encoding tulajdonságot támogatja.) 
*    .nc 3 fájl csak a rögzített hosszadalmakat támogatja. Ismét megpróbáltuk elérni a CF-t és Unidata a változó hosszadalmak támogatása, de nem tudtak bármilyen előrehaladást elérni.
*    .nc 3 fájl nem támogat egyszerű módja annak, hogy megkülönböztetje az egységes karakter változókat a String változóktól. Ismét megpróbáltuk elérni a CF-t és Unidata a két adattípus megkülönböztetésére szolgáló rendszer támogatása, de nem tudtak semmilyen előrelépést elérni.
*    .nc 3 fájl csak 8 bites karaktereket támogat egy meghatározott kódolás. Ismét megpróbáltuk elérni a CF-t és Unidata a kódolás meghatározására szolgáló rendszer támogatása, de nem tudtak semmilyen előrelépést elérni.
*    .nc 3 fájl nem támogatja a 64 bites integrálókat (hosszúság) ... Ismét megpróbáltuk elérni a CF-t és Unidata egy hosszú rendszer támogatása, de nem tudtak előrehaladni.
         
##### Verzió{#versioning} 
Mert EDDTable FromHtp Szerezzen naplót az adatkészlet minden változásáról az időbélyegzővel és az egyes változások szerzőjével, gyorsan újra létrehozhatja ezt az adatkészletet, mint bármikor. Bizonyos értelemben van egy verzió bármely pontra időben. Ha egy felhasználó adatkérése tartalmaz egy ütemtervet&lt;= korlátozott, pl. &timestamp&lt;= 2016-06-23T16:32:22.128Z (vagy bármikor pont) , de nem korlátozza a szerzőt vagy parancsot, ERDDAP™ válaszolni fog a kérésre, először generálja az adatkészlet egy verzióját, mint az adott időpontban. Aztán, ERDDAP™ alkalmazza a felhasználó más korlátozásait, mint bármely más adatkérelmet ERDDAP ... Az EDDTableFromHttpGet azért van felállítva, hogy ez a folyamat nagyon gyors és hatékony legyen, még nagyon nagy adatkészletek esetében is.

Hasonlóképpen, a felhasználó megtudhatja, mikor az adatkészletet a legutóbbi frissítéssel frissítette ...?timestamp &timestamp=max (Timetamp) Ésdistinct () 

És minden adatkéréshez, az adatkészlet bármely verziójához a felhasználók láthatják, hogy melyik szerző változtatott, és mikor tették őket.

Ez a verziórendszer lehetővé teszi [Reprodukálható tudomány](https://en.wikipedia.org/wiki/Reproducibility) Mivel bárki bármikor kérheti az adatkészlet verzióját bármikor. Ez a finomított változatlás nem lehetséges más rendszerrel, amiről tudjuk. A mögöttes mechanizmus nagyon hatékony, abban az esetben, ha nincs szükség extra tárolóhelyre, és a feldolgozófelület valóban minimális.

Nem mindenkinek van szüksége az ilyen típusú finomított változatozásra, de rendkívül hasznos, talán szükséges, egy nagy adatkezelő szervezet keretében. (OOI, Earth Cube, Data One és NOAA NCEI) ahol egy adatkészlet több szerzővel rendelkezhet (pl. az érzékelő, egy automatizált QC forgatókönyv és egy emberi szerkesztő) ...

 \\[ Történelem: Az ilyen típusú verziók szükségessége először rám jött (Bob) amikor az OOI-ról olvasunk és beszélünk 2008-ban. Abban az időben, OOI volt egy nehéz, lassú, nem hatékony rendszer változatlan Git. A Git nagyszerű azért, amit terveztek, de nem ez. 2008-ban, míg egy OOI-beszélgetésen egy kiterjedt, hatékony alternatív-OOI rendszert terveztem az adatkezeléshez, beleértve számos olyan funkciót is, amelyet hozzáadtam. ERDDAP™ azóta, és beleértve ezt a verziórendszert is. Abban az időben és azóta az OOI elkötelezett a verziórendszerük iránt, és nem érdekelt az alternatívák iránt. 2016-ban a terv más aspektusai bevezettek, és elkezdtem végrehajtani. Mivel sok megszakítás történt más projekteken, 2018-ig nem fejeztem be. Még most sem tudom, hogy bármely más tudományos adatrendszer olyan gyors és egyszerű hozzáférést biztosít az adatok bármely pontjáról, gyakran változó adatkészletek esetében. Az egyszerű fájlrendszerek nem kínálják ezt. A kapcsolati adatbázisok nem. Cassandra nem. \\] 
    
##### HTTPS Put és törlés{#https-put-and-delete} 
*    [Mi a helyzet a HTTPS PUT és a DELETE?](#https-put-and-delete)   
     [Hypertext Transfer protokoll (HTTP) ](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) a World Wide Web alapja, és az oka annak, hogy a weboldal URL-jei "http://"vagy "https://"... A HTTPS a HTTP egy további biztonsági réteggel. Minden nap, a böngészők, a szkriptek és a számítógépes programok teszik több milliárd HTTP (Súgó)   **GET** kéri a távoli forrásokból származó információkat. HTTP (Súgó) más is [verbs](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) , nevezetesen PUT (adatokat tolni a szerverre) DELETE (DELETE adatok a szerverről) ... Igen, a PUT és a DELETE a megfelelő módja az adatok beillesztésének, és az adatok törlésének, a HTTP segítségével (Súgó) ... A GET-t minden olyan szoftver támogatja, amely együttműködhet a HTTP-vel (Súgó) ... A GET nagyon könnyű dolgozni. Mindenki már tudja, hogyan kell dolgozni a GET és sokan tudják, hogyan kell használni a POST (amely lényegében ugyanúgy használható, mint a GET) Így az EDDTableFromHttpGet a GET és a POST segítségével dolgozott. Nagyon kevés ember (még kevés számítógépes programozó) valaha is dolgozott a PUT és a DELETE. A PUT és a DELETE-t általában csak számítógépes nyelvek támogatják, így a használatukhoz ügyes programra van szükség. Tehát a PUT és a DELETE általában sokkal több égető megközelítés, mivel az eszközök fejlődtek.
     
##### HttpGet Notes{#httpget-notes} 
*    [Megjegyzések](#httpget-notes) 
    * Nem dataVariable Lehet, hogy adatType=char. Használja az adatType=String helyett. Ha valóban szüksége van adatType=char, e-mail Chris. John at noaa.gov.
         
##### Köszönöm{#thanks} 
*    [A CHORDS-nek köszönhetően az alapvető ötletért.](#thanks)   
Az EDDTableFromHttpGet alapgondolata (azaz egy HTTP GET adatok hozzáadása egy adatkészlethez) az UCAR-tól (NCAR?)   [Cloud-Host valós idejű adatszolgáltatások (CHORDS) ](https://github.com/earthcubeprojects-chords) projekt. A paraméterek formátuma a kérelemben (ismétlődő *név=érték* Elválasztva &’s) ugyanaz a szabványos formátum, amelyet a HTML űrlapok használnak a weboldalakon. Ez egy egyszerű és ragyogó ötlet, és még inkább azért, mert olyan tökéletesen összeomlik ERDDAP meglévő rendszer a mesés adatok kezeléséhez. Az ötlet nyilvánvaló a hindukban, de én (Bob) nem gondolt rá. EDDTableFromHtp Használja ezt az alapvető ötletet, kombinálva az elképzeléseinket, hogyan kell végrehajtani, hogy rendszert készítsen ERDDAP™ az adatok feltöltéséhez. Más, mint az alapvető ötlet, hogy használja a GET-t, hogy nyomja az adatokat a rendszerbe, az EDDTableFromHttpGet végrehajtás teljesen más és teljesen független a CHORDS-től, és különböző jellemzőkkel rendelkezik (pl. naplófájlok, adatgyűjtés, különböző biztonsági rendszer, CRUD támogatás, reprodukálható adatok) ... A CHORDS-nek való kitettségünk csak webinárium volt. Nem néztük meg a kódjukat, vagy olvastunk a projektjükről, mert azonnal tudtuk, hogy a rendszert másképp akarjuk végrehajtani. De hálásak vagyunk nekik az alapvető ötletért. A CHORDS-re való teljes hivatkozás
Daniels, M. D., Kerkez, B., Chandrasekar, V., Graves, S., Stamps, D. S., Martin, C., Dye, R., Bartos, M., Jones, J., Keiser, K. (2014.) ... Cloud-Host valós idejű adatszolgáltatások a geosciences számára (CHORDS) szoftver. UCAR/NCAR - Föld megfigyelő laboratórium. [https://doi.org/10.5065/d6v1236q](https://doi.org/10.5065/d6v1236q)   
     
### EDDTableFrom Hyrax Fiók{#eddtablefromhyraxfiles} 
 [ **EDDTableFrom Hyrax Fiók** ](#eddtablefromhyraxfiles)   (detektáltak) összesíti az adatfájlokat több változóval, mindegyik egy vagy több megosztott dimenzióval (Például, idő, magasság (vagy mélység) , magasság, hosszúság) és szolgált egy [ Hyrax   OPeNDAP szerver](https://www.opendap.org/software/hyrax-data-server) ...

* Ez az adatkészlet típusa **Meghatározva** ... Az új és általánosabb megoldás az, hogy használja a [Húsvét FromUrl opció az EDDTable számára Fájlok](#cachefromurl)   (vagy változat) , amely helyi másolatot készít a távoli fájlokról, és szolgálja az adatokat a helyi fájlokból. A&lt;cacheFromUrl&gt; opció bármilyen típusú tabuláris adatfájlhoz használható. **   
Ha nem tudja elvégezni ezt a munkát valamilyen okból, e-mailben Chris. John at noaa.gov.
Ha 2020 előtt nincs panasz, ez az adatkészlet típusa eltávolítható. ** 
* Erősen ajánljuk a használatát [GenerateDatasets Xml program](#generatedatasetsxml) egy durva tervezetet készíteni datasets.xml cunk ehhez az adatkészlethez. Ezután szerkesztheti ezt, hogy finomhangolja azt.
* A legtöbb esetben minden fájlnak több értéke van a baloldal számára (először) A dimenzió például az idő.
* A fájlok gyakran (de nem kell) egyetlen értéke van a többi dimenziónak (például magasság (vagy mélység) , magasság, hosszúság) ...
* A fájlok lehetnek karakter változók egy további dimenzióval (Például az nCharacters) ...
*    Hyrax a szervereket az URL "/dods-bin/nph-dods/" vagy "/opendap/" azonosíthatja.
* Ez az osztály képernyője a Hyrax weboldalak a fájlok listáival az egyes könyvtárban. Emiatt nagyon specifikus a jelenlegi formátumban. Hyrax weboldalak. Megpróbáljuk alkalmazkodni ERDDAP™ ha/ha a jövőbeli verziók Hyrax módosítsa, hogy a fájlok hogyan szerepelnek.
* A&lt;fájlDir&gt; beállítás figyelmen kívül hagyva. Mivel ez az osztály letöltése és minden távoli adatfájl helyi másolata, ERDDAP™ erők a fájl Dir, hogy *bigParentDirectory[szerkesztés]* /copy/ * datasetID * /.
* Mert&lt; sourceUrl &gt; az adatkészlet alapkönyvtárának URL-jét használja Hyrax szerver, például
    &lt; sourceUrl &gt; &gt; &gt; &gt;http://edac-dap.northerngulfinstitute.org/dods-bin/nph-dods/WCOS/nmsp/wcos/&lt;/ sourceUrl &gt; &gt; &gt; &gt;
     (de tedd egy sorba)   (sajnálatos, hogy a szerver már nem áll rendelkezésre) ...
A sourceUrl weboldal általában " OPeNDAP Server Index \\[ DirectoryName \\] A tetején.
* Mivel ez az osztály mindig letölti és helyi másolatot készít minden távoli adatfájlról, soha ne csomagolja be ezt az adatkészletet [EDDTableCopy](#eddtablecopy) ...
* Lásd ezt az osztályt, [EDDTableFromFiles](#eddtablefromfiles) információ arról, hogyan működik ez az osztály, és hogyan kell használni.
* Lásd az 1D, 2D, 3D és 4D példákat [EDDTableFromNcFiles](#eddtablefromncfiles) ...
     
### EDDTableFromInvalidCRAFiles{#eddtablefrominvalidcrafiles} 
 [ **EDDTableFromInvalidCRAFiles** ](#eddtablefrominvalidcrafiles) összesített adatok NetCDF   (v3 vagy v4)   .nc fájlok, amelyek egy adott, érvénytelen, változata a CF DSG Contiguous Ragged Array (CRA) fájlok. Bár ERDDAP™ támogatja ezt a fájltípust, ez egy érvénytelen fájltípus, amelyet senkinek nem kell használnia. Azok a csoportok, amelyek jelenleg ezt a fájltípust használják, erősen ösztönzik a használatra ERDDAP™ hiteles CF DSG CRA fájlok generálására, és hagyja abba ezeket a fájlokat.

Részletek: Ezek a fájlok több row\\_size változóval rendelkeznek, mindegyik minta\\_dimenziós tulajdonsággal rendelkezik. A fájlok nem szabványos fájlok, mert a több minta (Emberek) A méreteket le kell dekódolni és egymáshoz kapcsolódni ezzel a kiegészítő szabálylal és ígéretgel, amely nem része a CF DSG specifikációnak: „Egy adott pl. hőmérséklet-értéket társíthatsz (Temp\\_obs dimenzió) egy adott mélységértékkel (z\\_obs dimenzió, a dimenzió a legtöbb értékkel) Mert: a hőmérséklet row_size (egy adott cast) 0 vagy egyenlő a megfelelő mélységi row\\_size-val (az övé)   (Ez a szabály) ... Tehát, ha a hőmérséklet row\\_size nem 0, akkor a n hőmérséklet-értékek az öntötthez közvetlenül kapcsolódnak a n mélységértékekhez. (Ez az ígéret) »

Egy másik probléma ezekkel a fájlokkal: a Principal\\_Investigator row\\_size változónak nincs minta\\_dimenziós tulajdonsága, és nem követi a fenti szabályt.

A mintafájlok az adatkészlet típusához megtalálhatókhttps://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[ 2020-10-21 Ez a szerver már nem megbízhatóan elérhető \\] ...

Lásd ezt az osztályt, [EDDTableFromFiles](#eddtablefromfiles) információ arról, hogyan működik ez az osztály, és hogyan kell használni.

Erősen ajánljuk a használatát [GenerateDatasets Xml program](#generatedatasetsxml) egy durva tervezetet készíteni datasets.xml cunk ehhez az adatkészlethez. Ezután szerkesztheti ezt, hogy finomhangolja azt.

Az első dolog, amit GenerateDatasets Az Xml ilyen típusú adatkészletet tesz, miután válaszol a kérdésekre, kinyomtatja a mintafájl ncdump-szerű szerkezetét. Tehát, ha belépsz néhány goofy válaszra az első hurok számára GenerateDatasets Xml, legalább látni fogja, hogy ERDDAP™ olvassa el a fájlt, és nézze meg, hogy milyen dimenziók és változók vannak a fájlban. Ezután jobb választ adhat a második hurok számára a GenerateDatasetsXml-en keresztül.
 
### EDDTableFromJsonlCSVFiles{#eddtablefromjsonlcsvfiles} 
 [ **EDDTableFromJsonlCSVFiles** ](#eddtablefromjsonlcsvfiles) összesített adatok [JSON Lines CSV fájlok](https://jsonlines.org/examples/) ... Lásd ezt az osztályt, [EDDTableFromFiles](#eddtablefromfiles) információ arról, hogyan működik ez az osztály, és hogyan kell használni.

* Ahogy a jsonlines.org mondja, ez a formátum "Better, mint CSV" (és legálisan, mint szövetségi alkalmazott, nem értek egyet vagy nem értenek egyet velük - hogy milyen őrült ez?) ... A CSV-t soha nem határozták meg hivatalosan, és akadályozza az eredeti táblázatprogramokhoz kapcsolódó történelmi poggyász. A JSON Lines CSV-t összehasonlítva teljes mértékben definiálják és előnyökkel jár a széles körben használt JSON szabványhoz való kapcsolatából, amely viszont előnyökkel jár a kapcsolatából a kapcsolatból a Java Script és Java ... Figyelemre méltó, hogy teljes támogatást nyújt a hosszú integrációk és az Unicode karakterek számára a karakterláncokban, és egyértelmű módja annak, hogy más speciális karaktereket is tartalmazzon (nevezetesen lapok és hírvonalak) húrokon belül.
    
Ez a formátum különösen jó az adatkészletek számára, ahol rendszeresen kiegészítő sorokat kell hozzáadnia egy adott adatfájl végéhez. Emiatt és mások (lásd fent) , [EDDTableFromHttpGet](#eddtablefromhttpget) Json Lines CSV fájlokat használ az adattároláshoz.
    
* A bemeneti fájlokat UTF-8 kódolják. Mindazonáltal, tekintettel a \\u *dddd* formátum különleges karakterek kódolásához (pl.: \\u20ac az euró karakter kódolása) Lehetősége van a fájlok írására, hogy csak 7 bites ASCII karaktereket tartalmazzon \\u használatával *dddd* kódolni minden karakter felett #127.
     
* Erősen ajánljuk a használatát [GenerateDatasets Xml program](#generatedatasetsxml) egy durva tervezetet készíteni datasets.xml cunk ehhez az adatkészlethez. Ezután szerkesztheti ezt, hogy finomhangolja azt.
    
Az első dolog, amit a GenerateDatasetsXml tesz az ilyen típusú adatkészlethez, miután válaszol a kérdésekre, kinyomtatja a minta fájl ncdump-szerű szerkezetét. Tehát, ha belépsz néhány goofy válaszra az első hurok számára GenerateDatasets Xml, legalább látni fogja, hogy ERDDAP™ olvassa el a fájlt, és nézze meg, hogy milyen dimenziók és változók vannak a fájlban. Ezután jobb választ adhat a második hurok számára a GenerateDatasetsXml-en keresztül.
    
* WARNING: Amikor ERDDAP™ dalszöveg: JSON Lines CSV adatfájlok, ha hibát talál egy adott sorban (pl. helytelen számú elem) figyelmeztető üzenetet jelent ("WARNING: Bad sor (s) adatok” ... a rossz vonalak listája a későbbi sorokon) a [log.txt fájl](/docs/server-admin/additional-information#log) Ezután továbbra is olvassa el az adatfájl többi részét. Így a te felelősséged rendszeresen nézni (vagy írjon egy forgatókönyvet, hogy ezt tegye) az üzenet a logban. txt, hogy rögzítse a problémákat az adatfájlokban. ERDDAP™ így van beállítva, hogy a felhasználók továbbra is elolvassák az összes rendelkezésre álló érvényes adatot, még akkor is, ha a fájl egyes vonalak hibái vannak.
     
### EDDTableFromMultidimNcFiles{#eddtablefrommultidimncfiles} 
 [ **EDDTableFromMultidimNcFiles** ](#eddtablefrommultidimncfiles) összesített adatok NetCDF   (v3 vagy v4)   .nc   (vagy [ .nc ml ml](#ncml-files) ) fájlok több változóval, mindegyik egy vagy több megosztott dimenzióval. A fájlok lehetnek karakter változók, vagy anélkül, hogy egy további dimenzió (például, STRING14) ... Lásd ezt az osztályt, [EDDTableFromFiles](#eddtablefromfiles) információ arról, hogyan működik ez az osztály, és hogyan kell használni.

* Ha a fájlok többdimenziós CF DSG változatok, használja ezt az adatkészlet típus helyett [EDDTableFromNcCFFiles](#eddtablefromncfiles) ...
     
* Új tabuláris adatkészletek számára .nc fájlok, használja ezt a lehetőséget, mielőtt megpróbálja az idősebb [EDDTableFromNcFiles](#eddtablefromncfiles) ... Néhány előnye ennek az osztálynak:
    * Ez az osztály több változót olvashat a fájlszerkezetek szélesebb köréből. Ha megadja DimensionsCSV (egy Comma-választott lista a dimenzió nevekről) a GenerateDatasets Xml (vagy&lt;dimenziókCSV&gt; a datasets.xml info az egyik ilyen adatkészlethez), majd ERDDAP™ csak azokat a változókat olvassa el a forrásfájlokban, amelyek valamilyen vagy mindegyik dimenziót használnak, plusz minden skalárváltozatot. Ha egy dimenzió egy csoportban van, meg kell határoznia a teljes nevet, például: " *csoportName/dimenzióName* "..."
    * Ez az osztály gyakran nagyon gyorsan visszautasíthatja a fájlokat, ha nem felel meg a kérés korlátozásainak. Így a nagy gyűjteményekből származó adatok gyakran sokkal gyorsabban mennek.
    * Ez az osztály kezeli az igazi char változókat (non-String változók) helyesen.
    * Ez az osztály megpróbálhatja a String változókat, amikor a Teremtő nem használta a Netcdf-java írásait (amely a char #0-t támogatja a sztring végére) ...
    * Ez az osztály jobban kezeli az egyes fájlokat, amelyek hiányoznak bizonyos változók vagy dimenziók.
    * Ez az osztály eltávolíthatja a hiányzó értékekkel rendelkező sorok blokkját, amint azt meghatározottaknak nevezik [CF Discrete Sampling Geometries (DSG) Teljes többdimenziós Array fájlok](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#_incomplete_multidimensional_array_representation)   
         
* Erősen ajánljuk a használatát [GenerateDatasets Xml program](#generatedatasetsxml) egy durva tervezetet készíteni datasets.xml cunk ehhez az adatkészlethez. Ezután szerkesztheti ezt, hogy finomhangolja azt.
    
Az első dolog, amit a GenerateDatasetsXml tesz az ilyen típusú adatkészlethez, miután válaszol a kérdésekre, kinyomtatja a minta fájl ncdump-szerű szerkezetét. Tehát, ha belépsz néhány goofy válaszra az első hurok számára GenerateDatasets Xml, legalább látni fogja, hogy ERDDAP™ olvassa el a fájlt, és nézze meg, hogy milyen dimenziók és változók vannak a fájlban. Ezután jobb választ adhat a második hurok számára a GenerateDatasetsXml-en keresztül.
    
Csoport -- GenerateDatasets Az Xml egy "csoportot" kér. Beléphetsz "", hogy bármilyen / minden csoportot keress, " *Néhány Csoport* " vagy " *SomeGroup / SomeSubGroup* "Egy adott csoportot keresni, vagy " \\[ gyökér \\] "hogy csak a gyökércsoportot keressük. A "Group" szúró válik&lt;csoport&gt; a datasets.xml Info az adatkészlethez (Bár " \\[ gyökér \\] "" lesz "") ...
    
DimensionsCSV - GenerateDatasets Az Xml egy "DimensionsCSV" sztringet kér. Ez egy különválasztott értékű lista egy sor dimenzió forrás neveiről. GenerateDatasets Az Xml csak az adatok változóit olvassa el a mintában .nc fájlok, amelyek valamilyen vagy az összes ilyen dimenziót használnak (és nem más dimenziók) , valamint az összes skalárváltozat a fájlban, és az adatkészletet ezekből az adatok változóiból készítik. Ha egy dimenzió egy csoportban van, meg kell határoznia a teljes nevet, például: " *csoportName/dimenzióName* "..."
Ha nincs megadva (üres sztring) , GenerateDatasets Az Xml a legtöbb dimenzióval keresi a változókat az elméletben, hogy ők lesznek a legérdekesebbek, de lehetnek olyan idők, amikor adatkészletet szeretne készíteni néhány más adatváltozatból, amelyek más dimenziókat használnak.
Ha csak egy olyan dimenziós nevet határoz meg, amely nem létezik (NO\\_MATCH) , ERDDAP™ csak megtalálja az összes skalár változót.
A "DimensionsCSV" húrrá válik&lt;dimenziókCSV&gt; a datasets.xml Info az adatkészlethez.
    
#### ADimensions{#treatdimensionsas} 
Van egy kategória érvénytelen .nc fájlok (mert nem követik a CF szabályokat) több dimenzióval rendelkezik (pl. lat, lon, idő) amikor csak egy dimenziót kellett volna használni (pl. idő) Például:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
        lat = 1437 ;
        lon = 1437 ;
    variables:
        double time(time) ;
        double lat(lat) ;
        double lon(lon) ;
        float temperature(time, depth) ;
```
Az EDDTableFromMultidimNcFiles speciális funkcióval rendelkezik, hogy kezelje ezeket a fájlokat: ha hozzáadja a globális tulajdonságot "treatDimensionsAs" az adatkészletekhez a globális addAttributes Elmondhatod ERDDAP™ bizonyos dimenziók kezelésére (pl. lat és lon) ha ők egy másik dimenziók (pl. idő) ... Az attribútumértéknek egy olyan vőlegénynek kell lennie, amely a "től" dimenziókat határozza meg, majd a "től" dimenziót, pl.
 <att name="treatDimensionsAs"> lat, lon, idő </att>   
Aztán ERDDAP™ olvassa el a fájlt, mintha:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
    variables:
        double time(time) ;
        double lat(time) ;
        double lon(time) ;
        float temperature(time, depth) ;
```
Természetesen a listán szereplő dimenziók jelenlegi méretének azonosnak kell lennie; különben, ERDDAP™ A fájlt "Bad File"-ként kezeli.

Ne feledje, hogy ezek a fájlok érvénytelenek, mert nem követik a CF szabályokat. még akkor is, ha ERDDAP™ olvassa el őket, erősen javasoljuk, hogy ne hozzon létre olyan fájlokat, mint ez, mert más CF-alapú szoftvereszközök nem tudják helyesen olvasni őket. Ha már rendelkezik ilyen fájlokkal, határozottan javasoljuk, hogy a lehető leghamarabb cserélje ki őket érvényes fájlokkal.
    
### EDDTableFromNcFiles{#eddtablefromncfiles} 
 [ **EDDTableFromNcFiles** ](#eddtablefromncfiles) összesített adatok NetCDF   (v3 vagy v4)   .nc   (vagy [ .nc ml ml](#ncml-files) ) fájlok és [Zarr](https://github.com/zarr-developers/zarr-python) fájlok (2.25 verzió) több változóval, mindegyik közös dimenzióval (például az idő) vagy több, mint egy közös dimenzió (Például, idő, magasság (vagy mélység) , magasság, hosszúság) ... A fájloknak ugyanolyan dimenziós nevekkel kell rendelkezniük. Egy adott fájlnak több értéke lehet az egyes dimenziókban, és az értékek eltérőek lehetnek különböző forrásfájlokban. A fájlok lehetnek karakter változók egy további dimenzióval (például, STRING14) ... Lásd ezt az osztályt, [EDDTableFromFiles](#eddtablefromfiles) információ arról, hogyan működik ez az osztály, és hogyan kell használni.

A Zarr fájlok kissé eltérő viselkedéssel rendelkeznek, és megkövetelik a fájltNameRegex vagy az útRegex, hogy tartalmazza a "zarr".

* Ha .nc A fájlok az egyiket használják [CF Discrete Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) fájlformátumok, próbálja meg használni [EDDTableFromNcCFFiles](#eddtablefromncfiles) mielőtt kipróbálná ezt.
     
* Új tabuláris adatkészletek számára .nc fájlok, próbálja meg az újabbat [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) először.
     
* Erősen ajánljuk a használatát [GenerateDatasets Xml program](#generatedatasetsxml) egy durva tervezetet készíteni datasets.xml cunk ehhez az adatkészlethez. Ezután szerkesztheti ezt, hogy finomhangolja azt.
    
Az első dolog, amit a GenerateDatasetsXml tesz az ilyen típusú adatkészlethez, miután válaszol a kérdésekre, kinyomtatja a minta fájl ncdump-szerű szerkezetét. Tehát, ha belépsz néhány goofy válaszra az első hurok számára GenerateDatasets Xml, legalább látni fogja, hogy ERDDAP™ olvassa el a fájlt, és nézze meg, hogy milyen dimenziók és változók vannak a fájlban. Ezután jobb választ adhat a második hurok számára a GenerateDatasetsXml-en keresztül.
    
DimensionsCSV - GenerateDatasets Az Xml egy "DimensionsCSV" sztringet kér. Ez egy különválasztott értékű lista egy sor dimenzió forrás neveiről. GenerateDatasets Az Xml megtalálja az adatok változóit a .nc olyan fájlok, amelyek valamilyen vagy az összes ilyen dimenziót használnak, plusz minden skalár változót, és az adatkészletet ezekből az adatok változóiból készítik. Ha nincs megadva (üres sztring) , GenerateDatasets Az Xml a legtöbb dimenzióval keresi a változókat az elméletben, hogy ők lesznek a legérdekesebbek, de lehetnek olyan idők, amikor adatkészletet szeretne készíteni néhány más adatváltozatból, amelyek más dimenziókat használnak.
    
* 1D példa: 1D fájlok kissé különböznek a 2D, 3D, 4D, ... fájloktól.
    * Lehet, hogy van egy sor .nc adatfájlok, ahol minden fájlnak egy hónapos adatértéke van egy sodródó buoy-ból.
    * Minden fájlnak 1 dimenziója lesz, például idő (méret = \\[ sokan \\] ) ...
    * Minden fájlnak egy vagy több 1D változója lesz, amelyek ezt a dimenziót használják, például az idő, a hosszúság, a szélesség, a levegő hőmérséklet, ....
    * Minden fájlnak 2D karakterváltozatai lehetnek, például dimenziókkal. (Idő, NCharacters) ...
         
* 2D példa:
    * Lehet, hogy van egy sor .nc adatfájlok, ahol minden fájlnak egy hónapos adatértéke van egy sodródó buoy-ból.
    * Minden fájlnak 2 dimenziója lesz, például idő (méret = \\[ sokan \\] ) és id (méret = 1) ...
    * Minden fájlnak 2 1D-s változója lesz ugyanazokkal a nevekkel, mint a méretek és ugyanazon név dimenziók használatával, például az idő (Idő) , id (id) ... Ezeket az 1D-s változókat be kell vonni a listába&lt; dataVariable &gt; az adatkészlet XML.
    * Minden fájlnak egy vagy több 2D változója lesz, például hosszúság, magasság, levegő hőmérséklet, vízhőmérséklet, ...
    * Minden fájlnak 3D karakterváltozatai lehetnek, például dimenziókkal. (Idő,id,nCharacters) ...
         
* 3D példa:
    * Lehet, hogy van egy sor .nc adatfájlok, ahol minden fájlnak egy hónapos adatértéke van az egyik állomásos buoy-tól.
    * Minden fájlnak 3 dimenziója lesz, például az idő (méret = \\[ sokan \\] ) , lat (méret = 1) , és lon (méret = 1) ...
    * Minden fájlnak 3 1D-s változója lesz ugyanazokkal a nevekkel, mint a méretek és ugyanazon név dimenziók használatával, például az idő (Idő) , lat (lat) , lon (london) ... Ezeket az 1D-s változókat be kell vonni a listába&lt; dataVariable &gt; az adatkészlet XML.
    * Minden fájlnak egy vagy több 3D változója lesz, például levegő hőmérséklet, vízhőmérséklet, ...
    * Minden fájlnak 4D karakterváltozatai lehetnek, például dimenziókkal (Idő,lat,lon,nCharacters) ...
    * A fájl neve lehet a bója nevét a fájl nevében.
         
* 4D példa:
    * Lehet, hogy van egy sor .nc adatfájlok, ahol minden fájlnak egy hónapos adatértéke van egy állomásról. Minden alkalommal, amikor az állomás olvasmányokat készít egy sor mélységben.
    * Minden fájlnak 4 dimenziója lesz, például idő (méret = \\[ sokan \\] ) , mélység (méret = \\[ sokan \\] ) , lat (méret = 1) , és lon (méret = 1) ...
    * Minden fájlnak 4 1D változója lesz ugyanazokkal a nevekkel, mint a méretek és ugyanazon név dimenziók használatával, például az idő (Idő) , mélység (mélység) , lat (lat) , lon (london) ... Ezeket az 1D-s változókat be kell vonni a listába&lt; dataVariable &gt; az adatkészlet XML.
    * Minden fájlnak egy vagy több 4D változója lesz, például levegő hőmérséklet, vízhőmérséklet, ...
    * Minden fájlnak lehet 5D karakterváltozata, például dimenziókkal (Idő, mélység,lat,lon,nCharacters) ...
    * A fájl neve lehet a bója nevét a fájl nevében.
         
### EDDTableFromNcCFFiles{#eddtablefromnccffiles} 
 [ **EDDTableFromNcCFFiles** ](#eddtablefromnccffiles) aggregált adatok összesítik az adatokat NetCDF   (v3 vagy v4)   .nc   (vagy [ .nc ml ml](#ncml-files) ) fájlokat, amelyek az egyik fájlformátumot használják, amelyet a [CF Discrete Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) egyezmények. Lásd ezt az osztályt, [EDDTableFromFiles](#eddtablefromfiles) információ arról, hogyan működik ez az osztály, és hogyan kell használni.

Az egyik multidimenzionális CF DSG változatot használó fájlok esetében használjon [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) Ehelyett.

A CF DSG egyezmények több tucat fájlformátumot határoznak meg, és számos kisebb variációt tartalmaznak. Ez az osztály foglalkozik az összes variációval, amit ismerünk, de lehet, hogy hiányzott egy (vagy többet) ... Tehát, ha ez az osztály nem tudja elolvasni a CF DSG fájlokat, kérlek [további támogatás elérése](/docs/intro#support) ...

Erősen ajánljuk a használatát [GenerateDatasets Xml program](#generatedatasetsxml) egy durva tervezetet készíteni datasets.xml cunk ehhez az adatkészlethez. Ezután szerkesztheti ezt, hogy finomhangolja azt.
 
### EDDTableFromNccsvFiles{#eddtablefromnccsvfiles} 
 [ **EDDTableFromNccsvFiles** ](#eddtablefromnccsvfiles) összesített adatok [NCCSV](/docs/user/nccsv-1.00) ASCII .csv fájlok. Lásd ezt az osztályt, [EDDTableFromFiles](#eddtablefromfiles) információ arról, hogyan működik ez az osztály, és hogyan kell használni.

* Erősen ajánljuk a használatát [GenerateDatasets Xml program](#generatedatasetsxml) egy durva tervezetet készíteni datasets.xml cunk ehhez az adatkészlethez. Ezután szerkesztheti ezt, hogy finomhangolja azt.
    
Az első dolog, amit a GenerateDatasetsXml tesz az ilyen típusú adatkészlethez, miután válaszol a kérdésekre, kinyomtatja a minta fájl ncdump-szerű szerkezetét. Tehát, ha belépsz néhány goofy válaszra az első hurok számára GenerateDatasets Xml, legalább látni fogja, hogy ERDDAP™ olvassa el a fájlt, és nézze meg, hogy milyen dimenziók és változók vannak a fájlban. Ezután jobb választ adhat a második hurok számára a GenerateDatasetsXml-en keresztül.
    
* WARNING: Amikor ERDDAP™ Olvassa el az NCCSV adatfájlokat, ha egy adott sorban hibát talál (pl. helytelen számú elem) figyelmeztető üzenetet jelent ("WARNING: Bad sor (s) adatok” ... a rossz vonalak listája a későbbi sorokon) a [log.txt fájl](/docs/server-admin/additional-information#log) Ezután továbbra is olvassa el az adatfájl többi részét. Így a te felelősséged rendszeresen nézni (vagy írjon egy forgatókönyvet, hogy ezt tegye) az üzenet a logban. txt, hogy rögzítse a problémákat az adatfájlokban. ERDDAP™ így van beállítva, hogy a felhasználók továbbra is elolvassák az összes rendelkezésre álló érvényes adatot, még akkor is, ha a fájl egyes vonalak hibái vannak.
     
### EDDTableFromNOS{#eddtablefromnos} 
 [ **EDDTableFromNOS** ](#eddtablefromnos)   (Meghatározva) adatokat kezel egy NOAA   [NOS](https://opendap.co-ops.nos.noaa.gov/axis/) forrás, amely használja [ SOAP+XML ](https://www.w3schools.com/xml/xml_soap.asp) kérések és válaszok. Nagyon specifikus NOAA NOS XML. Lásd a minta EDDTableFromNOS adatkészletet az adatkészletekben2.xml.
 
### EDDTableFromOBIS{#eddtablefromobis} 
 [ **EDDTableFromOBIS** ](#eddtablefromobis) adatokat kezel egy Ocean Biogeographic Information System (OBIS) szerver (volthttp://www.iobis.org ) ... Lehetséges, hogy nincs olyan aktív szerver, amely ezt a mostantól naprakész OBIS szerverrendszert használja.

* Az OBIS szerverek egy XML kérést várnak el, és visszatérnek egy XML válaszhoz.
* Mert minden OBIS-kiszolgáló ugyanazokat a változókat szolgálja, mint (volthttp://iobis.org/tech/provider/questions) Nem kell sokat megadnia egy OBIS adatkészlet létrehozásához ERDDAP ...
* Ön is tartalmaz egy " creator\\_email "A globális tulajdonság addAttributes Mivel az információt a licencben használják. Egy megfelelő e-mail cím megtalálható az XML válasz elolvasásával a forrásURL-től.
* Lehet, vagy nem lehet képes a globális tulajdonságot elérni [&lt; subsetVariables &gt;&gt;&gt;&gt;&gt;&gt; (#subsetvariables) egy adott OBIS-kiszolgálóval dolgozni. Ha megpróbálja, csak próbálja ki az egyik változót (Például ScientificName vagy Genus) ...
#### EDDTableFromOBIS Skeleton XML{#eddtablefromobis-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromOBIS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceCode>...&lt;/sourceCode>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- If you read the XML response from the sourceUrl, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source code (for example, GHMP) is the value from one of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;resource>&lt;code> tags. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- All ...SourceMinimum and Maximum tags are OPTIONAL -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMinimum>...&lt;/longitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMaximum>...&lt;/longitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMinimum>...&lt;/latitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMaximum>...&lt;/latitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For timeSource... tags, use yyyy-MM-dd'T'HH:mm:ssZ format. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMinimum>...&lt;/timeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMaximum>...&lt;/timeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1.  This MUST include  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"creator\\_email" -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromParquetFiles{#eddtablefromparquetfiles} 
 [ **EDDTableFromParquetFiles** ](#eddtablefromparquetfiles) adatok kezelése [Parquet](https://parquet.apache.org/) ... Lásd ezt az osztályt, [EDDTableFromFiles](#eddtablefromfiles) információ arról, hogyan működik ez az osztály, és hogyan kell használni.

* A Parquet célja, hogy nagyon hatékonyan tömörítse, így kisebb fájlméreteket adhat, mint más formátumok.
* Erősen ajánljuk a használatát [GenerateDatasets Xml program](#generatedatasetsxml) egy durva tervezetet készíteni datasets.xml cunk ehhez az adatkészlethez. Ezután szerkesztheti ezt, hogy finomhangolja azt.
* WARNING: Amikor ERDDAP™ olvassa el a Parquet adatfájlokat, ha egy adott sorban hibát talál (pl. helytelen számú elem) figyelmeztető üzenetet jelent ("WARNING: Bad sor (s) adatok” ... a rossz vonalak listája a későbbi sorokon) a [log.txt fájl](/docs/server-admin/additional-information#log) Ezután továbbra is olvassa el az adatfájl többi részét. Így a te felelősséged rendszeresen nézni (vagy írjon egy forgatókönyvet, hogy ezt tegye) az üzenet a logban. txt, hogy rögzítse a problémákat az adatfájlokban. ERDDAP™ így van beállítva, hogy a felhasználók továbbra is elolvassák az összes rendelkezésre álló érvényes adatot, még akkor is, ha a fájl egyes vonalak hibái vannak.
     
### EDDTableFrom SOS  {#eddtablefromsos} 
 [ **EDDTableFrom SOS ** ](#eddtablefromsos) adatokat kezel egy Sensor Observation Service (SWE/ [ SOS ](https://www.ogc.org/standards/sos) ) szerver.

* Ez az adatkészlet típus összesíti az adatokat egy csoport állomások, amelyek mindegyik szolgáltatja egy SOS szerver.
* Az állomások mind ugyanazokat a változókat szolgálják (Bár az egyes állomások forrásának nem kell minden változót szolgálnia) ...
*    SOS A szerverek egy XML kérelmet várnak el, és visszatérnek egy XML válaszhoz.
* Erősen ajánljuk a használatát [GenerateDatasets Xml program](#generatedatasetsxml) egy durva tervezetet készíteni datasets.xml cunk ehhez az adatkészlethez. Ezután szerkesztheti ezt, hogy finomhangolja azt. Nem könnyű létrehozni az XML adatkészletet SOS adatkészletek kézzel. Ahhoz, hogy megtalálja a szükséges információkat, meg kell látogatnia sourceUrl +? Szolgáltatás= SOS &request= GetCapabilities "Egy böngészőben; nézze meg az XML-t; készítsen egy GetObservation kérelmet kézzel; és nézze meg az XML válaszát a kérésre.
* Az új típusok alkalmi kiegészítésével SOS szerverek és változások a régi szerverek, egyre nehezebb ERDDAP™ a szerver típusának automatikusan felismerése a szerver válaszaiból. Használata&lt;SosServerType&gt; (az IOOS\\_NDBC, IOOS\\_NOS értékével, OOSTethys vagy WHOI) Mostanra szigorúan elismert. Ha problémái vannak az ilyen típusú adatkészletekkel, próbálja meg újra futtatni a GenerateDatasets-t Xml a SOS szerver. Generáció Adatkészletek Xml lehetővé teszi, hogy kipróbálja a különböző&lt;sosServerType&gt; opciók, amíg megtalálja a megfelelőt egy adott szerver számára.
*    SOS Áttekintés:
    * SWE (Sensor Web Enablement) és SOS   (Érzékelő megfigyelő szolgálat) vannak [OpenGIS® szabványok](https://www.ogc.org/standards) ... Ez a weboldal rendelkezik a szabványos dokumentumokkal.
    * A OGC Web Services Common Specification 1.1.0 ( OGC 06-121r3) fedezi a GET és a POST lekérdezések építését (lásd a 7.2.3. szakaszt és a 9. szakaszt) ...
    * Ha GetCapabilities xml kérést küld egy SOS szerver ( sourceUrl + "?service= SOS &request= GetCapabilities "...") , kap egy xml eredmény egy listát az állomások és a megfigyelt Tulajdonságok, amelyekre adatuk van.
    * A megfigyeltProperty egy hivatalos URI hivatkozás egy ingatlanra. Például:ogc:phenomenon:longitude:wgs84 vagyhttps://mmisw.org/ont/cf/parameter/sea\\_water\\_temperature
    * A megfigyeltProperty nem változó.
    * Egynél több változó lehet ugyanaz a megfigyelt Tulajdonság (Például: belülTemp és kívül A tempó mindkettő megfigyelhető Tulajdonsághttps://mmisw.org/ont/cf/parameter/air\\_temperature) ...
    * Ha GetObservation xml kérést küld egy SOS szerver, kap egy xml eredmény leírása mező nevek a válasz, mezőegységek, és az adatok. A mező nevek tartalmazzák a hosszúságot, a szélességet, a mélységet (talán talán talán talán talán) és az idő.
    * Minden dataVariable EDDTableFrom SOS tartalmaznia kell egy „megfigyelt területet” tulajdonságot, amely azonosítja a megfigyelt tulajdonságot, amelyet a kiszolgálótól kell kérni, hogy megkapja ezt a változót. Gyakran, több dataVariable S fogja felsorolni ugyanazt a kompozit megfigyeltTermészet.
    * Az adattípus minden egyes számára dataVariable előfordulhat, hogy a szerver nem határozza meg. Ha igen, akkor meg kell néznie az XML adatválaszait a szerverről, és megfelelőnek kell lennie [&lt;adatType&gt; (#datatype) a ERDDAP™ adatkészlet dataVariable definíciók.
    *    (Ez írásakor) Néhány SOS szerverek válaszolnak a GetObservation kérésekre egynél több megfigyelt Tulajdonképpen csak visszatérő eredményeket az első megfigyeltProperties. (Nincs hibaüzenet&#33;) Lásd a konstruktor paraméter kérését MegfigyeltTermészetekKülönösen.
* EDDTableFrom SOS automatikusan hozzáadódik
  >  <att name="[subsetVariables](#subsetvariables)">station\\_id, longitude, latitude</att>  
az adatkészlet globális tulajdonságaihoz, amikor az adatkészlet jön létre.
*    SOS szerverek általában expressz [egység](#units) a [UCUM](https://unitsofmeasure.org/ucum.html) rendszer. Legtöbb ERDDAP™ szerverek expressz egységekkel [ UDUNITS ](https://www.unidata.ucar.edu/software/udunits/) rendszer. Ha át kell alakítani a két rendszer között, használhatja [ ERDDAP „Hálózati szolgáltatás az UCUM-egységek átalakítására / a UDUNITS ](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html) ...
#### EDDTableFrom SOS Skeleton XML{#eddtablefromsos-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromSOS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sosServerType>...&lt;/sosServerType> &lt;!-- 0 or 1, but STRONGLY  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RECOMMENDED. This lets you specify the type of SOS server  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(so ERDDAP™ doesn't have to figure it out).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Valid values are: IOOS\\_NDBC, IOOS\\_NOS, OOSTethys, and WHOI. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;responseFormat>...&lt;/responseFormat> &lt;!-- 0 or 1. Use this only if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you need to override the default responseFormat for the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;specified sosServerType.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;stationIdSourceName>...&lt;/stationIdSourceName> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default="station\\_id". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceName>...&lt;/longitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceName>...&lt;/latitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceName>...&lt;/altitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;altitudeMetersPerSourceUnit>](#altitudemeterspersourceunit)...&lt;/altitudeMetersPerSourceUnit>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceName>...&lt;/timeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceFormat>...&lt;/timeSourceFormat>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- timeSourceFormat MUST be either  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For numeric data: a [UDUnits](https://www.unidata.ucar.edu/software/udunits/)\\-compatible string (with the format  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"*units* since *baseTime*") describing how to interpret  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source time values (for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"seconds since 1970-01-01T00:00:00Z"), where the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;base time is an ISO 8601:2004(E) formatted date time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string (yyyy-MM-dd'T'HH:mm:ssZ).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For String date time data: specify  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[units suitable for string times](#string-time-units)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;describing how to interpret string times  (for example, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ISO8601TZ\\_FORMAT "yyyy-MM-dd'T'HH:mm:ssZ"). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;observationOfferingIdRegex>...&lt;/observationOfferingIdRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Only observationOfferings with IDs (usually the station names)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which match this [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) will be included  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the dataset (".+" will catch all station names). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;requestObservedPropertiesSeparately>true|false(default)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/requestObservedPropertiesSeparately>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the [dataType](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the observedProperty attribute.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For IOOS SOS servers, \\*every\\* variable returned in the text/csv  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response MUST be included in this ERDDAP™ dataset definition. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromThreddsFiles{#eddtablefromthreddsfiles} 
 [ **EDDTableFromThreddsFiles** ](#eddtablefromthreddsfiles)   (detektáltak) összesíti az adatfájlokat több változóval, mindegyik egy vagy több megosztott dimenzióval (Például, idő, magasság (vagy mélység) , magasság, hosszúság) és szolgált egy [Hírek OPeNDAP szerver](https://www.unidata.ucar.edu/software/tds/) ...

* Ez az adatkészlet típusa **Meghatározva** ... Az új és általánosabb megoldás az, hogy használja a [Húsvét FromUrl opció az EDDTable számára Fájlok](#cachefromurl)   (vagy változat) , amely helyi másolatot készít a távoli fájlokról, és szolgálja az adatokat a helyi fájlokból. A&lt;cacheFromUrl&gt; opció használható bármilyen típusú tabuláris adatfájl bármilyen webes forrásból, amely közzéteszi a könyvtári típusú fájlokat. **   
Ha nem tudja elvégezni ezt a munkát valamilyen okból, e-mailben Chris. John at noaa.gov.
Ha 2020 előtt nincs panasz, ez az adatkészlet típusa eltávolítható. ** 
* Erősen ajánljuk a használatát [GenerateDatasets Xml program](#generatedatasetsxml) egy durva tervezetet készíteni datasets.xml cunk ehhez az adatkészlethez. Ezután szerkesztheti ezt, hogy finomhangolja azt.
* A legtöbb esetben minden fájlnak több értéke van a baloldal számára (először) A dimenzió például az idő.
* A fájlok gyakran (de nem kell) egyetlen értéke van a többi dimenziónak (például magasság (vagy mélység) , magasság, hosszúság) ...
* A fájlok lehetnek karakter változók egy további dimenzióval (Például az nCharacters) ...
* A THREDS-kiszolgálókat az URL-ekben a „szelvények/” azonosíthatja. Például,
```
    https://www.ncei.noaa.gov/thredds/catalog/uv/6h\\_strs\\_agg/catalog.html
```
* A THREDS szerverek különböző helyeken katalógusokkal rendelkeznek. Ez az osztály REQUIRES, hogy az URL magában foglalja a "/tizedek/katalógus/". Általában ezt a változót megtalálhatja a gyökér katalógus böngészőjében, majd a kívánt alkatalógusra kattintva.
* Ez az osztály elolvassa a THREDDS által szolgált katalógus.xml fájlokat a listákkal&lt;katalógusRefs&gt; (hivatkozások további katalógus.xml sub-files) és&lt;adatkészlet&gt; (adatfájlok) ...
* A&lt;fájlDir&gt; beállítás figyelmen kívül hagyva. Mivel ez az osztály letöltése és minden távoli adatfájl helyi másolata, ERDDAP™ erők a fájl Dir, hogy *bigParentDirectory[szerkesztés]* /copy/ * datasetID * /.
* Mert&lt; sourceUrl &gt; használja a THREDDS szerver adatkészletének URL-jét, például: ehhez az URL-hez, amelyet egy webböngészőben lehet használni,
    https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.html  \\[ 2020-10-21 Ez a szerver már nem megbízhatóan elérhető. \\] ,
Használat&lt; sourceUrl &gt; &gt; &gt; &gt;https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.xml&lt;/ sourceUrl &gt; &gt; &gt; &gt;
     (de tedd egy sorba) ...
* Mivel ez az osztály mindig letölti és helyi másolatot készít minden távoli adatfájlról, soha ne csomagolja be ezt az adatkészletet [EDDTableCopy](#eddtablecopy) ...
* Ez az adatkészlet típus támogatja az OPTIONAL, ritkán használt, speciális címkét,&lt;SpecialMode&gt; *mód* &lt;/specialMode&gt; amely arra használható, hogy meghatározza, hogy a speciális, kemény kódolt szabályokat kell használni annak meghatározására, hogy melyik fájlokat kell letölteni a szerverről. Jelenleg az egyetlen érvényes *mód* a SAMOS, amelyet adatkészletekkel használnakhttps://tds.coaps.fsu.edu/thredds/catalog/samosletölteni csak a fájlokat az utolsó verziószámmal.
* Lásd ezt az osztályt, [EDDTableFromFiles](#eddtablefromfiles) információ arról, hogyan működik ez az osztály, és hogyan kell használni.
* Lásd az 1D, 2D, 3D és 4D példákat [EDDTableFromNcFiles](#eddtablefromncfiles) ...
     
### EDDTableFrom WFS Fiók{#eddtablefromwfsfiles} 
 [ **EDDTableFrom WFS Fiók** ](#eddtablefromwfsfiles)   (Meghatározva) helyi másolatot készít az összes adatról egy ArcGIS MapServer WFS szerver, így az adatok gyorsan továbbíthatók ERDDAP™ felhasználók.

* Meg kell határoznia egy speciálisan formázott sourceUrl globális tulajdonság, hogy elmondja ERDDAP™ Hogyan kérjen szolgáltatási információkat a szervertől. Kérjük, használja ezt a példát mint egy sablont:
```
    <att name="sourceUrl">http://*someUrl/dir1/dir2*/MapServer/WFSServer?request=GetFeature&amp;service=WFS&amp;typename=aasg:BoreholeTemperature&amp;format=&quot;text/xml;%20subType=gml/3.1.1/profiles/gmlsf/1.0.0/0"</att>  
```
     (de tedd az egészet egy sorra) 
* Hozzá kell adni egy speciális globális tulajdonságot, hogy elmondja ERDDAP™ Hogyan azonosítsuk a le kell tölteni a le kell tölteni az adatcsomagok nevét. Ez valószínűleg minden EDDTableF-re fog működni WFS Files adatkészletek:
```
    <att name="rowElementXPath">/wfs:FeatureCollection/gml:featureMember</att>
```
* Mivel ez az osztály mindig letölti és helyi másolatot készít minden távoli adatfájlról, soha ne csomagolja be ezt az adatkészletet [EDDTableCopy](#eddtablecopy) ...
* Lásd ezt az osztályt, [EDDTableFromFiles](#eddtablefromfiles) További információkért, hogyan működik ez az osztály, és hogyan kell használni.
     
### EDDTableAggregateRows{#eddtableaggregaterows} 
 [ **EDDTableAggregateRows** ](#eddtableaggregaterows) EDDTable adatkészletet készíthet egy "gyermek" EDDTable adatkészletből.

* Íme néhány felhasználás az EDDTableAggregateRows számára:
    * Lehet, hogy egy EDDTableAggregateRows adatkészlet két különböző típusú fájlok vagy adatforrások, például egy adatkészlet a múlt hónap végéig tárolt adatok a múlt hónapban tárolt .nc CF-fájlok és adatkészlet a jelenlegi hónaphoz, amelyet egy kapcsolati adatbázisban tároltak.
    * Lehet, hogy egy EDDTableAggregateRows adatkészlet, hogy foglalkozzon a változás a forrásfájlok (például az időformátum megváltozott vagy változó név megváltozott, vagy adatok típus/ scale\\_factor / add\\_offset megváltozott) ... Ebben az esetben egy gyermek adatot kapna a változás előtt készült fájlokból, és a másik gyermek a változást követően adatokat kapna. Az EDDTableAggregateRows használata alternatíva [NcML](#ncml-files) vagy [ NCO ](#netcdf-operators-nco) ... Hacsak nincs megkülönböztető funkció a fájlnévben (ezt használhatja).&lt;fájlNameRegex&gt; annak meghatározásához, hogy melyik fájl tartozik a gyermek adatkészletéhez), valószínűleg tárolnia kell a fájlokat a két gyermek adatkészlethez különböző könyvtárakban.
    * Lehet, hogy egy EDDTableAggregateRows adatkészlet, amely egy vagy több hasonló, de különböző adatkészletek közös alkészlete, például egy olyan adatkészlet, amely Profil adatkészletet készít egy Profil adatkészlet kombinációjából, egy TimeSeriesProfile adatkészletből és egy TrajectoryProfile adatkészletből (amelyek különböző változók és néhány változók közös - ebben az esetben meg kell tenni speciális változatokat a gyermek adatkészletek, csak a közös változók) ...
    * Lehet, hogy több önálló adatkészlet, mindegyik azonos típusú adat, de egy másik állomás. Elhagyhatja ezeket az adatkészleteket, de létrehozhat egy EDDTableAggregateRows adatkészletet, amely az összes állomás adataival rendelkezik - minden gyermek adatkészlet egyszerű lehet [EDDTableFromErddap](#eddfromerddap) , amely az egyik meglévő állomás adatkészletre utal. Ha ezt megteszi, adjon meg minden EDDTableFromErddap adatkészletet másként datasetID mint az eredeti önálló adatkészletek, például az eredeti „gyermek” beállításával datasetID ...
* Minden gyermek&lt;Az adatkészlet&gt; meghatározottnak teljes adatkészletnek kell lennie, mintha egy önálló adatkészlet lenne. Mindegyiknek azonosnak kell lennie [ dataVariable s](#datavariable) ugyanabban a sorrendben, ugyanazzal a [ destinationName s](#destinationname) , [adatok típusok](#datatype) , [ missing\\_value s](#missing_value) , [FillValues](#missing_value) és [egység](#units) ... Az EDDTableAggregateRows adatkészlet minden variálható metaadata az első gyermekadatban változókból származik, de az EDDTableAggregateRows frissíti a [ actual\\_range ](#actual_range) A metaadat az összes gyermek számára a tényleges tartomány.
* Ajánlás: Szerezzen minden gyermek adatkészletet, amely önálló adatkészletként működik. Ezután próbálja meg az EDDTableAggregateRows adatkészletet azáltal, hogy csökkenti és lezárja a datasets.xml zsúfolt mindegyik az új EDDTableAggregate Rows adatkészlet.
* Dataset Default Sort Order -- A gyermekadatok megrendelése meghatározza az eredmények általános alapértelmezett rendezését. Természetesen a felhasználók más típusú megrendelést kérhetnek egy adott eredménykészlethez a jóváhagyással és orderBy  ("..." *Comma-elválasztott lista a változókról* "...") lekérdezésük végére.
* A "forrás" [globális tulajdonságok](#global-attributes) Az EDDTableAggregateRows az első gyermek adatkészletből származó kombinált globális tulajdonságok. Az EDDTableAggregate Rows lehet egy globális&lt; addAttributes &gt; további globális tulajdonságok biztosítása vagy a forrás globális tulajdonságainak felülírása.
#### EDDTableAggregátum Rows csontváz XML{#eddtableaggregaterows-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableAggregateRows" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableCopy{#eddtablecopy} 
 [ **EDDTableCopy** ](#eddtablecopy) helyi másolatot készíthet sokféle EDDTable adatkészletből, majd gyorsan megőrizheti az adatokat a helyi másolatból.

* EDDTableCopy (és a hálózati adatokhoz, [ EDDGrid Másolás](#eddgridcopy) ) nagyon könnyen használható és nagyon hatékony **megoldás néhány legnagyobb probléma a távoli adatforrásokból származó adatok kiszolgálásával:** 
    * A távoli adatforrásból származó adatokhoz való hozzáférés lassú lehet.
        * Lassúak lehetnek, mert örökre lassúak (például egy nem hatékony típusú szerver) ,
        * mert túl sok kéréssel túlterhelik őket,
        * vagy mert a szerver vagy a távoli szerver korlátozott a sávszélesség.
    * A távoli adatkészlet néha nem elérhető (ismét, különböző okok miatt) ...
    * Az adatok egyik forrására való támaszkodás nem mérlegeli jól (Például, amikor sok felhasználó és sok ERDDAP Használja) ...
         
* Hogyan működik - az EDDTableCopy ezeket a problémákat automatikusan megoldja és fenntartja az adatok helyi másolatát, és adatokat szolgáltat a helyi másolatból. ERDDAP™ nagyon gyorsan szolgálhat a helyi másolatból származó adatokat. És egy helyi másolat készítése és használata megkönnyíti a terhet a távoli szerveren. És a helyi másolat az eredeti mentés, amely hasznos abban az esetben, ha valami történik az eredeti.
    
Nincs semmi új az adatkészlet helyi másolatának elkészítéséről. Mi az új itt, hogy ez az osztály teszi\\*könnyű\\*létrehozni és létrehozni\\*Fenntartás\\*az adatok helyi másolata egy\\*változat\\*távoli adatforrások és\\*Metaadat\\*az adatok másolása közben.
    
#### EDDTableCopy vs&lt;cacheFromUrl&gt;{#eddtablecopy-vs-cachefromurl} 
&lt;A cacheFromUrl&gt; az EDDTableCopy alternatívája. Másképp dolgoznak.

* EDDTable A másolat úgy működik, hogy távoli szolgáltatásból származó adatokat kér, és ezeket a zsákokat tárolja a helyi fájlokban. Így az EDDTableCopy bizonyos esetekben hasznos, amikor az adatok távoli szolgáltatáson keresztül elérhetők.
* [[szerkesztés]]&lt;cacheFromUrl&gt; (#cachefromurl) letölti a meglévő fájlokat egy távoli weboldalon.&lt;A cacheFromUrl&gt; könnyebben használható és megbízhatóbb, mivel könnyen elmondható, hogy van egy új távoli adatfájl, vagy amikor egy távoli adatfájl megváltozott, és így le kell tölteni.

Ha vannak olyan helyzetek, ahol az EDDTableCopy vagy&lt;cacheFromUrl&gt; használható, használat&lt;cacheFromUrl&gt; mert könnyebb és megbízhatóbb.
     
#### &lt;ExtractDesztináció Névek & gt;{#extractdestinationnames} 
EDDTable A másolat az adatok helyi másolatát azáltal teszi, hogy a távoli adatkészletből származó adatokat kéri. EDDTable A másolat meghatározza, hogy melyik zsákot kéri az &distinct kérésével () értékek a&lt;ExtractDestinationNames&gt; (megadott datasets.xml lásd alább) , amelyek a távoli adatkészletben a változók űrelválasztott rendeltetési nevei. Például,
```
    <extractDestinationNames>drifter profile</extractDestinationNames>  
```
Lehet, hogy a drifter=tig17,profil=1017, drifter=tig17,profil=tig17,profil=1095, ... drifter=une12,profil=1223, drifter=une12,profil=1251, ....

Olyan helyzetekben, ahol egy oszlop (például profil) lehet, hogy mindaz, amire szükség van, hogy egyedileg azonosítsa az adatok sorát, ha van egy nagyon nagyszámú, például profilok, hasznos lehet egy további kivonatot is megadni Desztináció név (Például, sodró) amely a profilok felosztására szolgál. Ez kevesebb adatfájlhoz vezet egy adott könyvtárban, ami gyorsabb hozzáférést eredményezhet.
    
#### Helyi fájlok{#local-files} 
Az adatok minden része külön tárolódik NetCDF fájl egy aláírásban *bigParentDirectory[szerkesztés]* /copy/ * datasetID * / (a megadott [setup.xml](/docs/server-admin/deploy-install#setupxml) ) ... Van egy közvetett szint minden, de az utolsó kivonatDestinationName. Például a tig17+1017 adatait tárolják
     *bigParentDirectory[szerkesztés]* /copy/sampleDataset/tig17/1017 .nc ...
Például az une12+1251 adatait tárolják
     *bigParentDirectory[szerkesztés]* /copy/sampleDataset/une12/1251 .nc ...
Az adatértékekből létrehozott könyvtárak és fájlnévek módosítottak, hogy fájlnév-biztonságot hozzanak létre (Például a helyeket „x20” váltja fel.) - ez nem befolyásolja a tényleges adatokat.
     
#### Új adatok{#new-data} 
Minden alkalommal EDDTable A másolatot újratöltik, ellenőrzi a távoli adatkészletet, hogy lássa, milyen különböző részek állnak rendelkezésre. Ha a fájl egy darab adat nem létezik, a kérés, hogy a zsákmány hozzáadott egy sor. ERDDAP „Thread feldolgozza az összes megkeresett kérelmet az adatcsomagok, egy-egy. Láthatja a statisztikákat a Thread tevékenységéhez [Status oldal](/docs/server-admin/additional-information#status-page) és a [Napi jelentés](/docs/server-admin/additional-information#daily-report) ... (Igen, ERDDAP™ több feladatot rendelhetne erre a folyamatra, de ez sok távoli adatforrás sávszélességét, memóriáját és CPU időt használna, és sok helyi ERDDAP "Sávszélesség, memória és CPU idő, amelyek egyike sem jó ötlet.) 
    
MEGJEGYZÉS: Az első alkalommal, amikor egy EDDTableCopy be van töltve, (ha minden jól megy) Számos adatkérés kerül hozzáadásra a feladathozHárom sorrendje, de nem hoztak létre helyi adatfájlokat. Tehát a konstrukció kudarcot vall, de a feladatThread továbbra is dolgozik, és létrehozza a helyi fájlokat. Ha minden jól megy, a feladatThread néhány helyi adatfájlot készít, és a következő kísérletet, hogy újratöltse az adatkészletet (~15 perc) sikeres lesz, de kezdetben nagyon korlátozott mennyiségű adattal.
    
MEGJEGYZÉS: A helyi adatkészlet után van néhány adat, és megjelenik az Ön adataiban ERDDAP Ha a távoli adatkészlet ideiglenesen vagy állandóan nem hozzáférhető, a helyi adatkészlet továbbra is működik.
    
WARNING: Ha a távoli adatkészlet nagy, és / vagy a távoli szerver lassú (Ez a probléma, nem?&#33;) Hosszú időbe telik, hogy teljes helyi másolatot készítsen. Bizonyos esetekben a szükséges idő elfogadhatatlan lesz. Például 1 TB adatátvitel egy T1-es vonalon keresztül (0,15 GB/s) legalább 60 napot vesz igénybe, optimális körülmények között. Ráadásul sok sávszélességet, memóriát és CPU időt használ a távoli és helyi számítógépeken. A megoldás az, hogy kemény meghajtót küldjön a távoli adatok adminisztrátorához, hogy a s / ő készítsen egy példányt az adathalmazról, és elküldje a merevlemezt vissza. Használja ezt az adatokat kezdő pontként, és az EDDTableCopy hozzáadja az adatokat. (Így használt az Amazon EC2 Cloud Service a probléma kezelésére, annak ellenére, hogy rendszerük sok sávszélességgel rendelkezik.) 
    
WARNING: Ha az értékek egy adott kombinációja eltűnik egy távoli adatkészletből, az EDDTableCopy nem törli a helyi másolt fájlt. Ha akarod, törölheted magad.
    
#### TableCopy&lt;CheckSourceData & gt;{#tablecopy-checksourcedata} 
A datasets.xml ez az adatkészlet lehet egy opcionális címke
```
    <checkSourceData>true</checkSourceData>  
```
Az alapértelmezett érték igaz. Ha/ha hibáztatja, az adatkészlet soha nem fogja ellenőrizni a forrásadatlapot, hogy megnézze, van-e további adatok.
     
#### Ajánlott felhasználás{#recommended-use} 
1. Hozzon létre&lt;adatkészlet&gt; Belépés (natív típus, nem EDDTableCopy) a távoli adatforráshoz. **Szerezd megfelelően, beleértve az összes kívánt metaadatot is.** 
2. Ha túl lassú, add hozzá az XML kódot, hogy csomagolja egy EDDTableCopy adatkészletben.
    * Használjon mást datasetID   (talán megváltoztatva datasetID a régi datasetID kissé) ...
    * Másolja a&lt;hozzáférhető&gt;&gt;,&lt;ReloadEveryNMinutes&gt; és&lt;onChange&gt; a távoli EDDTable XML-től az EDDTableCopy XML-ig. (Az EDDTableCopy anyag értékei; a belső adatkészlet értékei nem relevánsak.) 
    * Hozzon létre&lt;ExtractDestinationNames&gt; címke (lásd fent) ...
    *   &lt;rendExtractBy&gt; egy OPTIONAL űr elválasztott lista a cél változó nevek a távoli adatkészletben. Amikor minden egyes darab adatot letöltenek a távoli szerverről, a zsákot ezeket a változókat rendezik (az első változó, majd a második változó, ha az első változó kötődik, ...) ... Bizonyos esetekben, ERDDAP™ képes lesz gyorsabban kivonni az adatokat a helyi adatfájlokból, ha a listán szereplő első változó numerikus változó ( "time" számít numerikus változónak) ... De válassza ki ezeket a változókat olyan módon, amely megfelelő az adatkészlethez.
3.   ERDDAP™ az adatok helyi másolatát készíti és tartsa fenn.
         
* FIGYELMEZTETÉS: Az EDDTableCopy feltételezi, hogy az egyes részek adatértékei nem változnak. Ha / ha megteszik, manuálisan törölnie kell a chunk fájlokat *bigParentDirectory[szerkesztés]* /copy/ * datasetID * / amely megváltozott és [zászló](/docs/server-admin/additional-information#flag) az adatkészletet újra kell tölteni, hogy a törölt darabokat lecseréljék. Ha van egy e-mail előfizetése az adatkészlethez, akkor két e-mailt kap: az egyik, amikor az adatkészlet először újratölti és elkezdi másolni az adatokat, és egy másik, amikor az adatkészlet ismét betölti (automatikusan) és észleli az új helyi adatfájlokat.
     
* Metadata megváltoztatása - Ha meg kell változtatni addAttributes vagy megváltoztatja a forrásadatokkal kapcsolatos változók sorrendjét:
    1. Változtasd meg addAttributes a forrásadatkészlethez datasets.xml szükség szerint.
    2. Törölje az egyik másolt fájlt.
    3. Állj be egy [zászló](/docs/server-admin/additional-information#flag) az adatkészlet azonnali újratöltéséhez. Ha egy zászlót használ, és e-mail előfizetése van az adatkészlethez, két e-mailt kap: az egyik, amikor az adatkészlet először visszatölti és elkezdi másolni az adatokat, és egy másik, amikor az adatkészlet ismét betöltődik (automatikusan) és észleli az új helyi adatfájlokat.
    4. A törlesztett fájlt az új metaadata regenerálja. Ha a forrásadatkészlet valaha elérhető, az EDDTableCopy adatkészlet metaadatot kap a regenerált fájlból, mivel ez a legfiatalabb fájl.
         
*    [ EDDGrid Másolás](#eddgridcopy) nagyon hasonlít az EDDTableCopy-hoz, de a hálózati adatkészletekkel működik.
#### EDDTableCopy csontváz XML{#eddtablecopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractDestinationNames>...&lt;/extractDestinationNames>  &lt;!-- 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderExtractBy>...&lt;/orderExtractBy> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#tablecopy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

- -

## Részletek{#details-1} 

Íme a közös címkék és tulajdonságok részletes leírása.

### &lt;angularDegreeUnits & Gt;{#angulardegreeunits} 
* [[szerkesztés]] ** &lt;angularDegreeUnits&gt; ** ] (#angulardegreeunits) egy ritkán használt OPTIONAL tag egy&lt;erddapDatasets&gt; tag datasets.xml amely tartalmaz egy képregény-elválasztott listát az egyesületekről, amelyek ERDDAP™ Angular fokos egységként kell kezelni. Ha egy változónak van egy ilyen egysége, tabledap A orderByMean A szűrő kiszámítja az eszközöket különleges módon, majd jelentést tesz az -180 és 180 közötti értéknek. Lásd ERDDAP EDStatic.java forráskód fájl a jelenlegi alapértelmezett listához. A tag értékének bármilyen változása a következő alkalommal lép életbe ERDDAP™ olvasó datasets.xml , beleértve az adatkészletre adott válaszban is [zászló](/docs/server-admin/additional-information#flag) ...
### &lt;angularDegreeTrueUnits & gt;{#angulardegreetrueunits} 
* [[szerkesztés]] ** &lt;Angol DegreeTrueUnits&gt; ** ] (#angulardegreetrueunits) egy ritkán használt OPTIONAL tag egy&lt;erddapDatasets&gt; tag datasets.xml amely tartalmaz egy képregény-elválasztott listát az egyesületekről, amelyek ERDDAP™ kell kezelni, mint egy rövid fokozatú igaz egységek. Ha egy változónak van egy ilyen egysége, tabledap A orderByMean A szűrő kiszámítja az eszközt egy speciális módon, majd jelentse az összeget 0-tól 360-ig. Lásd ERDDAP EDStatic.java forrásfájl a jelenlegi alapértelmezett listához. A tag értékének bármilyen változása a következő alkalommal lép életbe ERDDAP™ olvasó datasets.xml , beleértve az adatkészletre adott válaszban is [zászló](/docs/server-admin/additional-information#flag) ...
     
### &lt;gyakoriStandardNames & Gt;{#commonstandardnames} 
* [[szerkesztés]] ** &lt;gyakoriStandardNames&gt; ** ] (#commonstandardnames) egy ritkán használt OPTIONAL tag egy&lt;erddapDatasets&gt; tag datasets.xml hogy megadja a Comma-elválasztott listáját [CF szabvány neve](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) ... E. pl.
```
    <commonStandardNames>air\\_pressure, ..., wind\\_to\\_direction</commonStandardNames>  
```
Ezt a listát az DataProviderForm3.html-ben használják, mint a felhasználók kényelme.
Ha ezt az információt szeretné megadni datasets.xml Kezdje a jelenlegi alapértelmezett lista másolásával&lt;DEFAULT\\_commonStandardNames&gt; benne ERDDAP A
 \\[ Tomcat \\] /webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml fájl.
     
### &lt;cacheMinutes & Gt;{#cacheminutes} 
* [[szerkesztés]] ** &lt;cacheMinutes&gt; ** ] (#cache percek) egy ritkán használt OPTIONAL tag egy&lt;erddapDatasets&gt; tag datasets.xml az életkor meghatározása (perc) amelyen a cache fájlokat törölni kell (default=60) ... E. pl.
```
    <cacheMinutes>60</cacheMinutes>  
```
Általában csak képfájlok (mert ugyanazokat a képeket gyakran ismételten kérik) és .nc fájlok (mert teljes mértékben létre kell hozni, mielőtt elküldik a felhasználót) csésze. Bár úgy tűnhet, mintha egy adott kérés mindig ugyanazt a választ adja vissza, ami nem igaz. Például egy tabledap kérelem, amely tartalmazza az időt&gt; *Néhány Idő* megváltozik, amikor új adatok érkeznek az adatkészlethez. És egy griddap kérelem, amely magában foglalja \\[ utolsó \\] Az idő dimenziója megváltozik, amikor új adatok érkeznek az adatkészlethez. A tag értékének bármilyen változása a következő alkalommal lép életbe ERDDAP™ olvasó datasets.xml , beleértve az adatkészletre adott válaszban is [zászló](/docs/server-admin/additional-information#flag) ... Korábban ERDDAP™ v2.00, ezt a setup.xml-ben határozták meg, amely még megengedett, de elriasztott.

### &lt;cacheClearMinutes & Gt;{#cacheclearminutes} 
* [[szerkesztés]] ** &lt;cacheClearMinutes&gt; ** ] (#cacheclear percek) egy ritkán használt OPTIONAL tag egy&lt;erddapDatasets&gt; tag datasets.xml meghatározni a frekvenciát, hogy ellenőrizze a csípett fájlokat, és távolítsa el a régieket (perc)   (default=15) ... E. pl.
```
    <cacheClearMinutes>15</cacheClearMinutes>  
```
Amikor a kiszolgáló befejezi a kérést, ellenőrizni fogja, hogy mennyi ideig volt az utolsó gyorsítótár. Ha túl régen volt, akkor feladatot fog kérni a TaskThread-on, hogy megtisztítsa a tortát. A tag értékének bármilyen változása a következő alkalommal lép életbe ERDDAP™ olvasó datasets.xml , beleértve az adatkészletre adott válaszban is [zászló](/docs/server-admin/additional-information#flag) ... Ezt meg lehet határozni a setup.xml-ben, de ez elriasztott.
     
### &lt;átalakításInterpolateRequestCSVExample & gt;{#convertinterpolaterequestcsvexample} 
* [[szerkesztés]] ** &lt;átalakításInterpolateRequestCSVExample ** ] (# Convertinterpolaterequestcsvexample) egy OPTIONAL tag egy&lt;erddapDatasets&gt; tag datasets.xml   \\[ Kezdőlap ERDDAP™ v2.10 \\] amely olyan példát tartalmaz, amelyet az Interpolate átalakító weboldalán mutatnak be. Az alapértelmezett érték: jplMU RSS T41/analylylyed\\_ sst /Bilinear/4 .
### &lt;átalakításInterpolateDatasetIDVariableList & Gt;{#convertinterpolatedatasetidvariablelist} 
* [[szerkesztés]] ** &lt;átalakításInterpolateDatasetIDVariableList&gt; ** ] (# Convertinterpolatedatasetidvariablelist) egy OPTIONAL tag egy&lt;erddapDatasets&gt; tag datasets.xml   \\[ Kezdőlap ERDDAP™ v2.10 \\] amely CSV listát tartalmaz datasetID / változó Névi példák, amelyeket az Interpolate konverter weboldalának javaslataiként fognak használni. Az alapértelmezett érték: jplMU RSS T41/analylylyed\\_ sst ...
### &lt;átalakításToPublicSourceUrl & gt;{#converttopublicsourceurl} 
* [[szerkesztés]] ** &lt;átalakításToPublicSourceUrl&gt; ** ] (#konverttopublicsourceurl) egy OPTIONAL tag egy&lt;erddapDatasets&gt; tag datasets.xml amely magában foglalja a "törzsből" és a "to" tulajdonságot, amely meghatározza, hogyan lehet egy megfelelő helyiséget átalakítani sourceUrl   (rendszerint IP-szám) nyilvános sourceUrl   (domain név) "A" formának kell lennie " \\[ valami \\] // \\[ valami \\] » Ezek közül a címkék közül 0 vagy több lehet. További információkért lásd [&lt; sourceUrl &gt;&gt;&gt;&gt;&gt;&gt; (#sourceurl) ... Például,
```
    <convertToPublicSourceUrl from="https://192.168.31.18/" to="https://oceanwatch.pfeg.noaa.gov/" />  
```
egy megfelelő helyiséget okoz sourceUrl   (mint példáulhttps://192.168.31.18/thredds/dodsC/satellite/BA/ssta/5day)   
nyilvános sourceUrl   (https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day) ...
A tag értékének bármilyen változása a következő alkalommal lép életbe ERDDAP™ olvasó datasets.xml , beleértve az adatkészletre adott válaszban is [zászló](/docs/server-admin/additional-information#flag) ...

De az előfizetési rendszerhez kapcsolódó biztonsági okokból és okokból, **Ne kövessétek ezt a lépést&#33;**   
Ehelyett mindig használja a nyilvános domain nevet a&lt; sourceUrl &gt; címke és használja a [/etc/hosts táblázat](https://linux.die.net/man/5/hosts) a szerverén, hogy a helyi domain neveket IP-számokra konvertálja anélkül, hogy DNS-kiszolgálót használna. Megpróbálhatja, ha egy domain nevet megfelelően konvertálnak IP-számra a használatával:
ping *Some.domain.name*   
     
### adatok:image/png;base64,{#dataimagepngbase64} 
* Amikor egy felhasználó kér egy .htmlTable válasz ERDDAP™ , ha a String cellában szereplő adatok adatot tartalmaznak:image/png;base64, amelyet egy base64 kódolt .png kép követ, ERDDAP™ megjelenik egy ikon (így a felhasználó láthatja a képet, ha lebegnek rajta) és gombok menteni a szöveget vagy a képet a vágólapra. Ezt a funkciót hozzáadták ERDDAP™ V2.19 Marco Alba.
###  drawLandMask  {#drawlandmask} 
*    [ ** drawLandMask ** ](#drawlandmask) meghatározza az alapértelmezett beállítást, amely ellenőrzi, mikor és hogyan kell a hulladékot levonni, amikor ERDDAP™ térképet készít. Három különböző helyen lehet meghatározni datasets.xml   (a legalacsonyabbtól a legmagasabb prioritásig) :
    
    1. Ha drawLandMask meg van határozva belül&lt;erddapDatasets&gt; (nem kapcsolódik semmilyen konkrét adatkészlethez) Ezután meghatározza az alapértelmezett értékét drawLandMask minden változó minden adatkészletben. Például,
    ```
        <drawLandMask>under</drawLandMask>  
    ```
A tag értékének bármilyen változása a következő alkalommal lép életbe ERDDAP olvasó datasets.xml ...
Ha ez a címke nem jelenik meg, az alapértelmezett érték alul van.
         
    2. Ha drawLandMask egy adott adatkészlet globális tulajdonságaként van meghatározva, majd meghatározza az alapértelmezett értékét drawLandMask minden változó az adott adatkészletben, felülírva minden alacsonyabb prioritási beállítást. Például,
    ```
        <att name="drawLandMask">under</att>  
    ```
A tag értékének bármilyen változása a következő alkalommal lép életbe ERDDAP™ visszatölti ezt az adatkészletet.
         
    3. Ha drawLandMask egy adott adatkészletben a változó tulajdonságaként van meghatározva, majd meghatározza az alapértelmezett értékét drawLandMask az adott adatkészletben ez a változó, felülírva minden alacsonyabb prioritási beállítást. Például,
    ```
        <att name="drawLandMask">under</att>  
    ```
A tag értékének bármilyen változása a következő alkalommal lép életbe ERDDAP™ visszatölti ezt az adatkészletet.
    
A felhasználó felülírhatja az alapértelmezést (bárhol is van megadva) azáltal, hogy kiválaszt egy értéket a "Draw földmaszk" egy ledobott listáról az adatkészlet Make A Graph honlapján, vagy beleértve &.land= *érték* az URL-ben, amely térképet kér ERDDAP ...
    
Minden helyzetben 4 lehetséges érték van a tulajdonsághoz:
    
    * "under" vonzza a földmaszkot, mielőtt adatokat gyűjt a térképen.
A rácsos adatkészletek esetében a föld állandó fényszürke színként jelenik meg.
A mesés adatkészletek esetében a "nyilatkozat" a föld és az óceánok feletti topográfiai adatokat mutatja.
    * "túl" - A rácsos adatkészletek esetében a "tovább" felhívja a hulladékot, miután adatokat gyűjt a térképekre, hogy bármilyen adatot lehessen a föld felett. A mesés adatkészletek esetében a "túl" az óceán fürdőmetriáját mutatja, és egy állandó fényszürkét, ahol szárazföld van, mind az adatok alapján.
    * "outline" csak a táj, a politikai határok, tavak és folyók körvonalát vonja le.
    * "off" nem húz semmit.
### &lt;e-mailDiagnosticsToErdData & gt;{#emaildiagnosticstoerddata} 
* [[szerkesztés]] ** &lt;e-mailDiagnosticsToErdData ** ] (#emaildiagnosticstoerddata) egy ritkán használt OPTIONAL tag egy&lt;erddapDatasets&gt; tag datasets.xml ... A címke értéke igaz lehet (az alapértelmezett) vagy hamis. Ha igaz, ERDDAP™ e-mailt küld a zsákút Chrisnek. John at noaa. Gov (a ERDDAP™ Fejlesztő csapat) ... Ez biztonságosnak és biztonságosnak kell lennie, mivel nincs bizalmas információ (pl. a kérésUrl) az e-mailben szerepel. Ennek lehetővé kell tennie, hogy bármilyen homályos, teljesen váratlan hibát elkapjon, amely a NullPointerExceptionshez vezet. Ellenkező esetben a felhasználó látja a kivételeket, de a ERDDAP™ fejlesztési csapat nem (így nem tudjuk, hogy van olyan probléma, amelyet rögzíteni kell) ...
     
### &lt;graphBackgroundColor & gt;{#graphbackgroundcolor} 
* [[szerkesztés]] ** &lt;graphBackgroundColor ** ] (#grafbackgroundcolor) egy ritkán használt OPTIONAL tag egy&lt;erddapDatasets&gt; tag datasets.xml az alapértelmezett háttérszín meghatározása a grafikonokon. Ez szinte minden grafikont érint. Néhány helyzet nem érintett. A színt 8 számjegyű hexadecimális értéknek tekintik a 0xAARRGGBB formájában, ahol az AA, RR, GG és BB az opacitás, a vörös, a zöld és a kék összetevők. "0x" érzékeny, de a hexadecimális számjegyek nem érzékenyek. Például egy teljesen opaque (ff) zöldes-kék szín vörös = 22, zöld = 88, blue = ee lenne 0xff2288ee. Az Opaque White 0xffffff. Az alapértelmezés az opaque fénykék (0xffccff) , amely előnye, hogy különbözik a fehér, ami egy fontos szín számos paletta használt adatok gyűjtése. Például,
    ```
    <graphBackgroundColor>0xffffffff</graphBackgroundColor>  
    ```
A tag értékének bármilyen változása a következő alkalommal lép életbe ERDDAP™ olvasó datasets.xml , beleértve az adatkészletre adott válaszban is [zászló](/docs/server-admin/additional-information#flag) ...
### &lt;ipAddressMaxRequests & gt;{#ipaddressmaxrequests} 
* [[szerkesztés]] ** &lt;ipAddressMaxRequests&gt; ** ] (#ipaddressmaxrequeststs) ritkán használt opcionális címke (először támogatott ERDDAP™ v2.12) belül&lt;erddapDatasets&gt; tag datasets.xml ez egy olyan rendszer része, amely korlátozza a túlzottan agresszív legitim felhasználók és a rosszindulatú felhasználók képességét, hogy nagyszámú egyidejű kérést készítsenek, amelyek lerombolják a rendszer teljesítményét más felhasználók számára. ipAddress A MaxRequests meghatározza az egyidejű kérések maximális számát, amelyeket bármely specifikus IP-címről fogadnak el. További kérések kap egy HTTP 429 hiba: túl sok kérés. A kis, statikus fájlok erddap / letöltés / és erddap / képek / nem mentesülnek ebből a számból. Az alapértelmezett 15. A megengedett maximum 1000, ami őrült magas - ne csináld&#33; ERDDAP™ nem fogad el kevesebbet, mint 6, mert sok törvényes felhasználó (nevezetesen webes böngészők és WMS ügyfelek) Legyen akár 6 kérés egy időben. A ERDDAP™ A Daily Report és a log.txt fájlhoz írt hasonló információk mindegyik Major Dataset Reload rendszerrel, most tartalmazzák a "Requester's IP Address" cím szerinti kéréseket. (Túl sok kérés) "..."
A tag értékének bármilyen változása a következő alkalommal lép életbe ERDDAP™ olvasó datasets.xml , beleértve az adatkészletre adott válaszban is [zászló](/docs/server-admin/additional-information#flag) ...
    
A status.html "Major LoadDatasets Time Series" szakasza tartalmaz egy "tooMany" oszlopot, amely felsorolja azokat a kéréseket, amelyek meghaladták a felhasználó ipAddressMaxRequests beállítását, és így látta a "Too Sok kérés" hiba. Ez lehetővé teszi, hogy könnyedén láthassa, ha aktív túlzottan agresszív legitim felhasználók és rosszindulatú felhasználók, így lehet (Opcionálisan) Nézze meg a log.txt fájlt, és döntse el, hogy szeretné-e feketelistázni ezeket a felhasználókat.
    
Nincs semmi különösképpen helytelen, ha ezt magasabb számra állítjuk. Ez rajtad múlik. De ez lehetővé teszi / ösztönzi az embereket, hogy olyan rendszereket hozzanak létre, amelyek nagyszámú szálat használnak a projekteken való munkához, majd nem ad visszajelzést arról, hogy mit csinálnak, nem kapnak hasznot.
### &lt;ipAddressMaxRequestsActive & gt;{#ipaddressmaxrequestsactive} 
* [[szerkesztés]] ** &lt;ipAddressMaxRequestsActive&gt; ** ] (#ipaddressmaxrequestive) ritkán használt opcionális címke (először támogatott ERDDAP™ v2.12) belül&lt;erddapDatasets&gt; tag datasets.xml ez egy olyan rendszer része, amely korlátozza a túlzottan agresszív legitim felhasználók és a rosszindulatú felhasználók képességét, hogy nagyszámú egyidejű kérést készítsenek, amelyek lerombolják a rendszer teljesítményét más felhasználók számára. Az ipAddressMaxRequestsActive meghatározza az egyidejű kérések maximális számát, amelyeket aktívan kezelnek bármely specifikus IP-címből. További kérések leülnek egy sorban, amíg az előző kérelmeket feldolgozták. A kis, statikus fájlok erddap/download/ és erddap/images/ ARE mentesülnek ebből a számból és a kapcsolódó rothadásból. Az alapértelmezett 2 A megengedett maximum 100, ami őrült magas - nem csinálja&#33; Ezt beállíthatja az 1-re, hogy szigorú legyen, különösen, ha túlságosan agresszív vagy rosszindulatú felhasználók vannak. A felhasználók még mindig gyorsan megkapják az összes kért adatot (ipAddressMaxRequests) De nem lesznek képesek a rendszer erőforrásait befogadni. Nem javasoljuk, hogy ezt nagyobb számba állítsuk, mert lehetővé teszi, hogy túlságosan agresszív legitim felhasználók és rosszindulatú felhasználók uralkodjanak. ERDDAP feldolgozási kapacitás.
A tag értékének bármilyen változása a következő alkalommal lép életbe ERDDAP™ olvasó datasets.xml , beleértve az adatkészletre adott válaszban is [zászló](/docs/server-admin/additional-information#flag) ...
     
### &lt;ipAddressUnlimited & gt;{#ipaddressunlimited} 
* [[szerkesztés]] ** &lt;ipAddressUnlimited&gt; ** ] (#ipaddressunlimited) ritkán használt opcionális címke (először támogatott ERDDAP™ v2.12) belül&lt;erddapDatasets&gt; tag datasets.xml ez egy olyan rendszer része, amely korlátozza a túlzottan agresszív legitim felhasználók és a rosszindulatú felhasználók képességét, hogy nagyszámú egyidejű kérést készítsenek, amelyek lerombolják a rendszer teljesítményét más felhasználók számára. ipAddressUnlimited egy képregény-elválasztott lista az IP címekről, amelyek lehetővé teszik a korlátlan hozzáférést az Ön számára ERDDAP ... Nézd meg a naplódat&#33; txt fájl, hogy melyik formátumot használja a szerver az IP címek. Egyes szervereken az IP címek a #.#.#.# formátumban lesznek. (ahol a # 0 és 255 közötti integrátor) ; mivel másokon ez lesz a formátumban &#123; &#123; &#125; ... A listán szereplő kérelmek nem tartoznak a ipAddressMaxRequests vagy az ipAddressMaxRequestsActive beállítások alá. Ez lehet másodlagos ERDDAP™ vagy bizonyos felhasználók vagy szerverek számára a rendszerben. ERDDAP™ mindig hozzáteszi: " (Ismeretlen IPAddress) - amely ERDDAP™ ha a kérő IP-címét nem lehet meghatározni, pl. az ugyanazon szerveren futó egyéb folyamatok esetében.
A tag értékének bármilyen változása a következő alkalommal lép életbe ERDDAP™ olvasó datasets.xml , beleértve az adatkészletre adott válaszban is [zászló](/docs/server-admin/additional-information#flag) ...
    
Ha valamilyen oknál fogva az összes felhasználó kérése megkapja a hibaüzenetet "Emlékezve várni a többi kérelmet feldolgozni", akkor megoldhatja a problémát, ha hozzáadja a felhasználó IP-címét az ipAddressUnlimited listához, alkalmazva ezt a változást, majd eltávolítja azt a listából.
    
### &lt;loadDatasetsMinMinutes & gt;{#loaddatasetsminminutes} 
* [[szerkesztés]] ** &lt;loadDatasetsMinMinutes&gt; ** ] (#loaddatasetsmin percek) egy ritkán használt OPTIONAL tag egy&lt;erddapDatasets&gt; tag datasets.xml meghatározni a minimális időt (perc) nagy terhelés között Adatkészletek (mikor ERDDAP™ reprocesszorok datasets.xml , beleértve az egyes adatkészletek ellenőrzését, hogy megnézze, újra kell-e tölteni a reload szerint MindenNMinutes beállítás, default=15) ... E. pl.
```
    <loadDatasetsMinMinutes>15</loadDatasetsMinMinutes>  
```
Ha egy adott rakományDatasets kevesebbet vesz igénybe, mint ez az idő, a rakomány ismételten megnézi a zászlós könyvtárat és / vagy alszik, amíg a fennmaradó idő eltelt. Az alapértelmezett 15 perc, aminek szinte mindenki számára jónak kell lennie. Az egyetlen hátránya annak, hogy ezt kisebb számba helyezzük, az, hogy növeli a frekvenciát ERDDAP™ olyan adatkészletek, amelyek olyan hibákkal rendelkeznek, amelyek megakadályozzák őket, hogy betöltsék őket (pl. egy távoli szerver leáll) ... Ha sok ilyen adatkészlet van, és gyakran ismétlődnek, az adatforrás a pestering / agresszív viselkedést tekintheti. A tag értékének bármilyen változása a következő alkalommal lép életbe ERDDAP™ olvasó datasets.xml , beleértve az adatkészletre adott válaszban is [zászló](/docs/server-admin/additional-information#flag) ... Korábban ERDDAP™ v2.00, ezt a setup.xml-ben határozták meg, amely még megengedett, de elriasztott.
     
### &lt;loadDatasetsMaxMinutes & gt;{#loaddatasetsmaxminutes} 
* [[szerkesztés]] ** &lt;loadDatasetsMaxMinutes&gt; ** ] (#loaddatasetsmax percek) egy OPTIONAL tag egy&lt;erddapDatasets&gt; tag datasets.xml meghatározni a maximális időt (perc) Nagy terhelés Az adatkészletek erőfeszítése megengedett (a terhelés előtt Adatkészletek szál kezelt "megoldott" és megszakadt)   (default=60) ... E. pl.
```
    <loadDatasetsMaxMinutes>60</loadDatasetsMaxMinutes>  
```
Általában ezt legalább kétszer kell beállítani, amíg ésszerűen úgy gondolja, hogy az összes adatkészlet újratöltése (Kumulatív módon) kell venni (mivel a számítógépek és hálózatok néha lassabbak, mint a várt) Ez mindig sokkal hosszabb, mint a loadDatasetsMinMinutes. Az alapértelmezés 60 perc. Néhány ember ezt hosszabbra fogja beállítani. A tag értékének bármilyen változása a következő alkalommal lép életbe ERDDAP™ olvasó datasets.xml , beleértve az adatkészletre adott válaszban is [zászló](/docs/server-admin/additional-information#flag) ... Korábban ERDDAP™ v2.00, ezt a setup.xml-ben határozták meg, amely még megengedett, de elriasztott.
     
### &lt;logLevel&gt;{#loglevel} 
* [[szerkesztés]] ** &lt;LogLevel&gt; ** ] (#loglevel) egy OPTIONAL tag egy&lt;erddapDatasets&gt; tag datasets.xml annak meghatározására, hogy hány diagnosztikai üzenetet küldenek a log.txt fájlba. Beállítható a "háborúba" (a legkisebb üzenetek) , "info" (az alapértelmezett) vagy "minden" (a legtöbb üzenet) ... E. pl.
```
    <logLevel>info</logLevel>  
```
A tag értékének bármilyen változása a következő alkalommal lép életbe ERDDAP™ olvasó datasets.xml , beleértve az adatkészletre adott válaszban is [zászló](/docs/server-admin/additional-information#flag) ... Korábban ERDDAP™ v2.00, ezt a setup.xml-ben határozták meg, amely még megengedett, de elriasztott.
     
### &lt;partialRequestMaxBytes & gt; és&lt;PartialRequestMaxCells & Gt;{#partialrequestmaxbytes-and-partialrequestmaxcells} 
* [[szerkesztés]] ** &lt;PartialRequestMaxBytes&gt; **] (#partialrequestmaxbytes-and-partialrequestmaxcells) [[[szerkesztés]]]** &lt;PartialRequestMaxCells&gt; ** ] (#partialrequestmaxbytes-and-partialrequestmaxcells) ritkán használják az OPTIONAL címkéket egy&lt;erddapDatasets&gt; tag datasets.xml ... Ha lehetséges (és nem mindig lehetséges) , ERDDAP™ megtöri a nagy adatkérelmeket a darabokra, hogy megőrizze a memóriát.
    
32 bit Java egyszerű értelemben a maximális számú egyidejű *nagy* a kérelmek nagyjából a rendelkezésre álló memória 3/4 (a -Xmx érték átadta Tomcat) osztva a zsák mérete (pl. 1200 MB / 100 MB =&gt; 12 kérés) ... Más dolgok memóriát igényelnek, így a tényleges kérések száma kevésbé lesz. A gyakorlatban a zsúfolás nem mindig lehetséges. Tehát egy hatalmas vagy néhány nagyon nagy egyidejű, nem zsúfolt kérés 32 bites problémát okozhat Java ...

64 bit Java A -Xmx érték sokkal nagyobb lehet. Tehát a memória sokkal kevésbé valószínű, hogy korlátozott.

Fedezheti az alapértelmezett darab méretét azáltal, hogy ezeket a címkéket határozza meg datasets.xml   (különböző értékekkel, mint itt) :
Hálók számára:&lt;PartialRequestMaxBytes&gt;100000000&lt;/partialRequestMaxBytes&gt;
Az asztalokhoz:&lt;PartialRequestMaxCells&gt;1000000&lt;/partialRequestMaxCells&gt;

PartialRequestMaxBytes az előnyben részesített legnagyobb számú bytes egy részleges hálózati adatkéréshez (a teljes kérelem egy része) ... default=100000000 (10 ^8) ... A nagyobb méretek nem feltétlenül jobbak (és ne menj át 500 MB, mert ez a THREDDS alapértelmezett határa DAP válaszok) ... De a nagyobb méretek kevesebb tonna fájlhoz való hozzáférést igényelhetnek (Gondolj bele ERD "s műholdas adatok minden egyes alkalommal egy különálló fájlban - jobb, ha minden egyes fájlból több adatot kapunk) ...

PartialRequestMaxCells az előnyben részesített maximális számú sejt (nRows \\* nColumns az adattáblában) Részleges TABLE adatkérés (a teljes kérelem egy része) ... Alapértelmezett = 100000. A nagyobb méretek nem feltétlenül jobbak. Ezek egy hosszabb várakozást eredményeznek az adatok kezdeti tételére a forrásból.

A tag értékének bármilyen változása a következő alkalommal lép életbe ERDDAP™ olvasó datasets.xml , beleértve az adatkészletre adott válaszban is [zászló](/docs/server-admin/additional-information#flag) ... Korábban ERDDAP™ v2.00, ezeket a setup.xml-ben határozták meg, amely még mindig megengedett, de elriasztott.
     
### &lt;Blacklist&gt;{#requestblacklist} 
* [[szerkesztés]] ** &lt;Blacklist&gt; ** ] (#requestblacklist)   [OPTIONAL címke](/docs/server-admin/additional-information#frequent-crashes-or-freezes) belül&lt;erddapDatasets&gt; tag datasets.xml amely a numerikus IP címek egy különálló listáját tartalmazza, amelyeket feketelistáznak. A tag értékének bármilyen változása a következő alkalommal lép életbe ERDDAP™ olvasó datasets.xml , beleértve az adatkészletre adott válaszban is [zászló](/docs/server-admin/additional-information#flag) ...
    * Ezt lehet használni, hogy lemond egy [A szolgáltatási támadás elutasítása](https://en.wikipedia.org/wiki/Denial_of_service) Túlságosan nulla [webes robot](https://en.wikipedia.org/wiki/Internet_bot) vagy bármilyen más típusú gondos felhasználó.
    * Hibaelmés felhasználó - Ha ERDDAP™ lassú egy nyers vagy fagyaszt / megállók, az ok gyakran egy problémás felhasználó, aki egyszerre több mint egy forgatókönyvet fut, és / vagy nagyszámú nagyon nagy, rendkívül hatékony vagy érvénytelen kérés, vagy egyidejű kérés. Nézd meg [Log.txt](/docs/server-admin/additional-information#log) látni, hogy ez a helyzet, és megtalálni a numerikus IP címet a problémás felhasználó. Ha ez a probléma, akkor valószínűleg feketelistát kell használnia a felhasználónak.
        
Mikor ERDDAP™ kérelmet kap egy feketelistás IP-címről, visszatér a HTTP hiba 403: Tilos. A kísérő szöveges hibaüzenet arra ösztönzi a felhasználót, hogy e-mailt küldjön Önnek, ERDDAP adminisztrátor, hogy dolgozzon ki a problémákat. Ha időt vesz igénybe a hibaüzenet olvasására (sok látszólag nem) és lépjen kapcsolatba veled, akkor dolgozhat velük, hogy egyszerre csak egy szkriptet futtassanak, hatékonyabb kéréseket készítsen, rögzítse a szkriptjeikben lévő problémákat (például egy távoli adatkészletből származó adatok kérése, amelyek nem válaszolhatnak az időzítés előtt) vagy bármi más volt a baj forrása.
        
A felhasználók gyakran egyszerűen nem tudják, hogy kéréseik problémásak. Gyakran nincsenek tudatában a hibáknak, a bruttó hatékonyságnak, vagy más problémáknak a forgatókönyvükkel. Gyakran gondolják, mert a tiéd ERDDAP™ ingyenes adatot kínál, hogy annyi adatot kérjenek, amennyit csak akarnak, például több szkript futtatásával, vagy több szál használatával egyszerre.
        
        * Elmagyarázhatja őket, hogy mindegyik ERDDAP™ Most számít, mennyire nagy és erős, véges erőforrásokkal rendelkezik (CPU idő, hard drive I/O, hálózati sávszélesség stb.) és nem tisztességes, ha egy felhasználó kéri az adatokat oly módon, hogy más felhasználókat vagy túlburdenseket zsúfol ERDDAP ...
        * Miután egy felhasználó tudja, hogyan kell két egyidejű kérést készíteni, gyakran nem látnak okot arra, hogy nem készítsenek 5, 10 vagy 20 egyidejű kérést, mivel a további kérések semmit sem fizetnek. Olyan, mint aszimmetrikus hadviselés: itt a támadó fegyverek hatalmas előnyökkel rendelkeznek (nulla költség) a védekező fegyverek felett (véges telepítés valódi költségekkel) ...
        * Nézd meg őket, hogy csökkenő visszatérések egyre több egyszerű kérések; a további kérések csak további blokkolja más felhasználó kéréseit; nem hoznak létre egy hatalmas javulást számukra.
        * Emlékeztesse őket arra, hogy vannak más felhasználók (mind az alkalmi felhasználók, mind a többi felhasználó scripteket futtat) Ezért nem tisztességes, hogy mindnyájatokat megöljenek ERDDAP források.
        * Érdemes megjegyezni, hogy a technológiai óriások arra ösztönözték a felhasználókat, hogy végtelen erőforrásokat várjanak el a webszolgáltatástól. Míg vannak módok létrehozására [hálók/klaszterek/szövetségek ERDDAP s](/docs/server-admin/scaling) Hogy egy ERDDAP™ rendszer több erőforrással, a legtöbb ERDDAP™ Az adminisztrátoroknak nincs pénzük vagy a manifesztumuk az ilyen rendszerek létrehozásához, és egy ilyen rendszer még mindig véges lesz. A ERD Például van egy személy (Engem) írás ERDDAP™ 2 adminisztráció ERDDAP s (Segítségével a főnököm) , és kezeli több adatforrások, mind egy éves hardver költségvetés $0 (alkalmi támogatásokra támaszkodunk a hardverért való fizetéshez) ... Ez nem a Google, a Facebook, az Amazon stb. 100 mérnökökkel, és több millió dolláros bevétel újrahasznosítása egyre nagyobb rendszerekbe. És nem tudunk csak mozogni ERDDAP™ Például az Amazon AWS, mert az adattárolási költségek nagyok, és az adatátviteli díjak nagyok és változóak, míg a külső szolgáltatásokra vonatkozó költségvetésünk 0 dollár.
        * A felhasználók iránti kérésem: a nem-idős érzékeny kérések esetében (ami messze a leggyakoribb eset) A rendszerüknek csak egy kérést kell tennie egy időben. Ha a kérések érzékenyek (pl. több .png egy weboldalon, több csempe egy weboldalon WMS ügyfél, stb.) Talán 4 egyidejű kérésnek kell lennie a max (és csak nagyon rövid ideig) ...
        * Ha elmagyarázza a helyzetet a felhasználónak, a legtöbb felhasználó megérti és hajlandó a szükséges változtatásokat, hogy eltávolítsa IP-címét a feketelistáról.
             
    * A felhasználó Blacklistához add hozzá számszerű IP-címüket az IP-címek comma-elválasztott listájához&lt;kérésBlacklist&gt; az Ön datasets.xml fájl. Ahhoz, hogy megtalálja a gondos felhasználó IP címét, nézze meg a ERDDAP™   *bigParentDirectory[szerkesztés]* /logs/log.txt fájl ( *bigParentDirectory[szerkesztés]* meg van határozva [setup.xml](/docs/server-admin/deploy-install#setupxml) ) látni, hogy ez a helyzet, és megtalálni a felhasználó IP-címét. Az IP-címet minden kérésre felsoroljuk a "&#123;&#123;&#123;&#123;##123;#" és az időszakoktól elválasztott 4 szám, például 123.45.67.8 . Az „ERROR” keresése segít olyan problémákat találni, mint az érvénytelen kérések.
    * Az utolsó számot egy IP-címben is helyettesítheti\\*(például 202.109.200.\\*) egy sor IP cím blokkolására, 0-255.
    * Az utolsó 2 számot is felcserélheti egy IP-címben\\*...\\*  (Például 121.204.\\*...\\*) az IP címek szélesebb körének blokkolására, 0-255.0-255.
    * Például,
    ```
        <requestBlacklist>98.76.54.321, 202.109.200.\\*, 121.204.\\*.\\*</requestBlacklist>
    ```
    * Nem kell újraindítani ERDDAP™ a változásokra&lt;kérelemBlacklist&gt;, hogy lépjen hatályba. A változásokat a következő alkalommal fogják észlelni ERDDAP™ ellenőrzi, hogy minden adatkészletet újra kell tölteni. Vagy felgyorsíthatja a folyamatot egy látogatással [setDataset Flag URL](/docs/server-admin/additional-information#set-dataset-flag) minden adatkészlethez.
    * A ERDDAP™ A napi jelentés tartalmazza a legaktívabb engedélyezett és blokkolt kérők listáját/tally-ját.
    * Ha szeretné kitalálni, hogy mi a domain/intézmény kapcsolódik egy numerikus IP címhez, használhat egy ingyenes, fordított DNS webes szolgáltatást, mint például [https://network-tools.com/](https://network-tools.com/) ...
    * Lehetnek olyan idők, amikor értelme van bizonyos felhasználókat magasabb szinten blokkolni, például rosszindulatú felhasználókat. Például blokkolhatja a hozzáférést mindenhez a szerverén, nem csak ERDDAP ... Linuxon egy ilyen módszert kell használni [iptables](https://www.linode.com/docs/guides/control-network-traffic-with-iptables/) ... Például hozzáadhat egy olyan szabályt, amely megakadályozza mindazt, ami 198.51.100.0-ból érkezik a parancshoz.
I INPUT – 198.51.100.0 J DROP
       
### &lt;lassúDownTroubleMillis & gt;{#slowdowntroublemillis} 
* [[szerkesztés]] ** &lt;LassúDownTroubleMillis&gt; ** ] (#slowdowntroublemillis) egy ritkán használt OPTIONAL tag egy&lt;erddapDatasets&gt; tag datasets.xml amely tartalmaz egy integrált, amely meghatározza a milliszekundumok számát (default=1000) szünet, amikor válaszolni minden meghibásodott kérésre, pl. ismeretlen adatkészlet, kérjen túl nagy, felhasználó a feketelistán. E. pl.
    ```
    <slowDownTroubleMillis>2000</slowDownTroubleMillis>
    ```
Ha egy forgatókönyv azonnal kérést tesz egy másik után, akkor gyorsan lehet, hogy egy rossz kérést egy másik után. Ezzel a beállítással lelassíthatja a hiányos forgatókönyvet, így ERDDAP™ nem árasztott rossz kérésekkel. Ha egy ember rossz kérést tesz, nem is veszik észre ezt a késést. Ajánlások:
    
    * Ha a baj a szolgáltatás elosztott tagadása (DDOS) 100+ támadó támadása, állítsa be ezt kisebb számba (100?) ... A túl sokáig lelassítva túl sok aktív szálhoz vezet.
    * Ha a baj 1-10 forrásból származik, állítsa be ezt 1000 ms-re (az alapértelmezett) , de nagyobb szám (Mint 10000) ésszerű is. Ez lelassítja őket, így kevesebb hálózati erőforrást pazarolnak. Továbbá 1000 ms vagy így nem bosszantja az embereket, akik rossz kérést tesznek.
    
A tag értékének bármilyen változása a következő alkalommal lép életbe ERDDAP™ olvasó datasets.xml , beleértve az adatkészletre adott válaszban is [zászló](/docs/server-admin/additional-information#flag) ...
     
### &lt;előfizetésEmailBlacklist & gt;{#subscriptionemailblacklist} 
* [[szerkesztés]] ** &lt;előfizetés EmailBlacklist&gt; ** ] (#subscriptionemailblacklist) egy ritkán használt OPTIONAL tag egy&lt;erddapDatasets&gt; tag datasets.xml amely az e-mail címek egy párosított listáját tartalmazza, amelyeket azonnal feketelistáznak [előfizetési rendszer](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions) Például
    ```
    <subscriptionEmailBlacklist>bob@badguy.com, john@badguy.com</subscriptionEmailBlacklist>  
    ```
Ez egy esetérzékeny rendszer. Ha egy e-mail cím hozzáadódik ehhez a listához, ha az e-mail cím előfizetésekkel rendelkezik, az előfizetéseket törölni fogják. Ha a listán szereplő e-mail cím megpróbál előfizetni, a kérelmet elutasítják. A tag értékének bármilyen változása a következő alkalommal lép életbe ERDDAP™ olvasó datasets.xml , beleértve az adatkészletre adott válaszban is [zászló](/docs/server-admin/additional-information#flag) ...
     
### Standard szöveg{#standard-text} 
*    [ **Standard szöveg** ](#standard-text) - Számos OPTIONAL címke létezik (a legtöbbet ritkán használják) belül&lt;erddapDatasets&gt; tag datasets.xml olyan szöveg meghatározása, amely különböző helyeken jelenik meg ERDDAP ... Ha meg akarja változtatni az alapértelmezett szöveget, másolja a meglévő értéket ugyanazon név címkéjéből
     *Tomcat* /webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util.messages.xml a datasets.xml Ezután módosítsa a tartalmat. Az előnye annak, hogy ezek bennük vannak datasets.xml az, hogy bármikor meghatározhatja az új értékeket, még akkor is, ha ERDDAP™ fut. Ezeknek a címkéknek az értékeinek bármilyen változása a következő alkalommal lép életbe ERDDAP™ olvasó datasets.xml , beleértve az adatkészletre adott válaszban is [zászló](/docs/server-admin/additional-information#flag) ... A címke nevek leírják a célt, de lásd az alapértelmezett tartalmat az üzenetekben.xml mélyebb megértéshez.
    
    *   &lt;szabványos licenc&gt;
    *   &lt;standardContact&gt;
    *   &lt;szabványDataLicenses&gt;
    *   &lt;szabványDisclaimerOfEndorsement&gt;
    *   &lt;szabványDisclaimerOfExternalLinks&gt;
    *   &lt;szabványGeneralDisclaimer&gt;
    *   &lt;szabvány PrivacyPolicy
    *   &lt;Kezdőlap &gt;HeadHtml5
    *   &lt;Az indulóBodyHtml5&gt; egy jó címke, amely megváltoztatja annak érdekében, hogy testreszabja minden weboldal tetején lévő megjelenését ERDDAP ... Figyelemre méltó, hogy ezt könnyen hozzáadhat egy ideiglenes üzenetet a ERDDAP™ weboldal (pl.: "Keresse ki az új JPL MUR SST v4.1 adatkészletet..." vagy "Ez ERDDAP™ offline lesz 2019-05-08T17:00:00 PDT 2019-05-08T20:00 PDT.) ... Egy furcsa, hogy ezt a címkét helyezzük be datasets.xml ha újraindítás ERDDAP Az első kérés ERDDAP™ visszatér az alapértelmezett induláshoz BodyHtml5 HTML, de minden későbbi kérés a kezdőBodyHtml5 HTML-t használja datasets.xml ...
    *   &lt;AShortDescription Html&gt; egy jó címke, hogy megváltoztassa, hogy testreszabja a leírást a ERDDAP ... Vegye figyelembe, hogy könnyen megváltoztathatja ezt, hogy ideiglenes üzenetet adjon a honlapon (pl.: „Ez ERDDAP™ offline lesz 2019-05-08T17:00:00 PDT 2019-05-08T20:00 PDT.) ...
    *   &lt;endBodyHtml5&gt;
    
      
Korábban ERDDAP™ v2.00, ezeket a setup.xml-ben határozták meg, amely még mindig megengedett, de elriasztott.
     
### &lt;szokatlan Activity & gt;{#unusualactivity} 
* [[szerkesztés]] ** &lt;szokatlanActivity&gt; ** ] (# szokatlantivitás) egy ritkán használt OPTIONAL tag egy&lt;erddapDatasets&gt; tag datasets.xml a LoadDatasets két futamideje közötti maximális kérelmek meghatározása, amelyeket normálisnak tartanak (default=10000) ... Ha ezt a számot túllépik, egy e-mailt küldünk e-mailbeEverythingTo (a setup.xml-ben megadott) ... E. pl.
    ```
    <unusualActivity>10000</unusualActivity>  
    ```
A tag értékének bármilyen változása a következő alkalommal lép életbe ERDDAP™ olvasó datasets.xml , beleértve az adatkészletre adott válaszban is [zászló](/docs/server-admin/additional-information#flag) ... Korábban ERDDAP™ v2.00, ezt a setup.xml-ben határozták meg, amely még megengedett, de elriasztott.
     
### &lt;frissítésMaxEvents & gt;{#updatemaxevents} 
* [[szerkesztés]] ** &lt;frissítésMaxEvents&gt; ** ] (#updatemaxevents) egy ritkán használt OPTIONAL tag egy&lt;erddapDatasets&gt; tag datasets.xml meghatározni a fájlváltozási események maximális számát (default=10) Ezt a [[szerkesztés]]]&lt;frissítésEveryNMillis&gt; (#updateeverynmillis) a rendszer, mielőtt az adatkészlet újratöltésére váltana. Például,
    ```
    <updateMaxEvents>10</updateMaxEvents>  
    ```
A frissítésEveryNMillis rendszer célja, hogy futtassa nagyon gyorsan, mielőtt a felhasználó kérésére feldolgozott. Ha sok fájlváltozási esemény van, akkor valószínűleg nem tud gyorsan futni, így ehelyett kéri az adatkészlet újratöltését. Ha a te ERDDAP™ olyan adatkészletekkel foglalkozik, amelyeket naprakészen kell tartani, még akkor is, ha nagyszámú adatfájl változásai vannak, ezt nagyobb számba állíthatja. (100?) ...

### &lt;felhasználó és gt;{#user} 
* [[szerkesztés]] ** &lt;felhasználó&gt; ** ] (#user) egy OPTIONAL tag egy&lt;erddapDatasets&gt; tag datasets.xml amely azonosítja a felhasználó felhasználó nevét, jelszó (ha hitelesítés=custom) és szerepek (Comma-választott lista) ... A felhasználónév és a jelszó használata kissé a [[szerkesztés]] értékén alapul.&lt;hitelesítés&gt;] (/docs/server-admin/additional-information#authentication) a te ERDDAP "s setup.xml fájl.
    * Ez része ennek ERDDAP A [biztonsági rendszer](/docs/server-admin/additional-information#security) bizonyos adatkészletekhez való hozzáférés korlátozása bizonyos felhasználók számára.
    * Készítsen külön&lt;felhasználói&gt; címke minden felhasználó számára. Opcionálisan, ha hitelesítés=oauth2, létrehozhat két&lt;felhasználó&gt; tagok minden felhasználó számára: egy, amikor a felhasználó bejelentkezik A Google, ha a felhasználó bejelentkezik az Orcid segítségével, valószínűleg ugyanazokkal a szerepekkel.
    * Ha nincs&lt;felhasználói&gt; címke az ügyfél számára, s / ő csak képes lesz hozzáférni a nyilvános adatkészletekhez, azaz olyan adatkészletekhez, amelyek nem rendelkeznek [a]&lt;hozzáférhetőTo&gt; (#Ccessibleto) Tag.
    * felhasználónév
Az autentication=custom esetében a felhasználónév általában levelek, számjegyek, alpontok és időszakok kombinációja.
Authentication=email esetében a felhasználónév a felhasználó e-mail címe. Lehet, hogy bármilyen e-mail cím.
Authentication=google esetében a felhasználónév a felhasználó teljes Google e-mail címe. Ez magában foglalja a Google által irányított számlákat, mint például @noaa.gov fiókok.
A hitelesítés=orcid, a felhasználónév a felhasználó Orcid számlaszáma (dashokkal) ...
Authentication=oauth2 esetében a felhasználónév a felhasználó teljes Google e-mail címe vagy a felhasználó Orcid fiókszáma (dashokkal) ...
    * jelszó
Az autentication=email, google, orcid vagy oauth2 esetében ne adja meg a jelszó tulajdonságát.
Authentication=custom esetében meg kell határoznia a jelszó tulajdonságát minden felhasználó számára.
        * Azok a jelszavak, amelyekbe a felhasználók belépnek, érzékenyek, és 8 vagy több karakterrel kell rendelkezniük, így nehezebb repedni. Manapság még 8 karaktert is lehet repedni gyorsan és olcsón brutális erő segítségével a számítógépek klasztere AWS. ERDDAP™ csak akkor érvényesíti a 8 karakteres minimumot, ha a felhasználó megpróbál bejelentkezni (nem akkor, ha&lt;felhasználói&gt; címke feldolgozásra kerül, mert ez a kód csak a jelszó hash emésztését látja, nem a plaintext jelszó).
        * setup.xml's&lt;jelszóEncoding&gt; meghatározza, hogy a jelszavakat hogyan tárolják&lt;felhasználó&gt; címkék a datasets.xml ... A biztonság növelése érdekében a lehetőségek a következők:
            *    [MD5](https://en.wikipedia.org/wiki/MD5)   (Ne használja ezt&#33;) - a jelszó tulajdonsága, meghatározza az MD5 hash emésztését a felhasználó jelszavát.
            * UEPMD5 (Ne használja ezt&#33;) - a jelszó tulajdonsága, meghatározza az MD5 hash emésztését *felhasználónév* : ERDDAP : *jelszó* ... A felhasználónév és a " ERDDAP "Szokták használni [Só](https://en.wikipedia.org/wiki/Salt_(cryptography) ) a hash értékét, ami nehezebb dekódolni.
            *    [SHA256](https://en.wikipedia.org/wiki/SHA-2)   (nem ajánlott) - a jelszó tulajdonsága, meghatározza az SHA-256 hash emésztését a felhasználó jelszavát.
            * UEPSHA256 (alapértelmezett, ajánlott jelszóEncoding. De sokkal jobb: használja a google, orchidea, vagy az oauth2 hitelesítési lehetőségeket.) - a jelszó tulajdonsága, megadja az SHA-256 hash emésztését *felhasználónév* : ERDDAP : *jelszó* ... A felhasználónév és a " ERDDAP "A hash értékének sóhajtására használják, így nehezebb dekódolni.
        * Windows, akkor generál MD5 jelszó emésztési értékek letöltésével egy MD5 program (mint például [MD5](https://www.fourmilab.ch/md5/) ) és használat (például) :
md5 -djsmith: ERDDAP : *tényleges jelszó* 
        * A Linux / Unix, akkor generál MD5 emésztési értékek segítségével a beépített md5sum program (például) :
dalszöveg: Echo -n "Jsmith: ERDDAP : *tényleges jelszó* "..." | md5sum
        * A tárolt plaintext jelszavak érzékenyek. Az MD5 és az UEPMD5 jelszavak tárolt formái nem érzékenyek.
        * Például (UEPMD5 használata) , ha felhasználóneme="jsmith" és jelszó="myPassword",&lt;felhasználó&gt; címke:
```
            <user username="jsmith"  
            password="57AB7ACCEB545E0BEB46C4C75CEC3C30"  
            roles="JASmith, JASmithGroup" />  
```
ahol a tárolt jelszót generálták
md5 -djsmith: ERDDAP :myPassword
        * A szerepek egy képregény-választott lista azon szerepekről, amelyekre a felhasználó engedélyezett. Minden&lt;adatkészlet&gt; lehet egy [&lt;hozzáférhetőTo&gt; (#Ccessibleto) címke, amely felsorolja azokat a szerepeket, amelyek lehetővé teszik az adatkészlethez való hozzáférést. Egy adott felhasználó és egy adott adatkészlet esetében, ha a felhasználói szerepek listájának egyik szerepe megfelel az adatkészlet listájának egyik szerepének.&lt;hozzáférhetőTo&gt; szerepek, akkor a felhasználó engedélyezett, hogy hozzáférjen az adatkészlet.
            
Minden felhasználó, aki bejelentkezik, automatikusan megkapja a szerepet \\[ bárkit megadva Inkább \\] - akár van egy&lt;felhasználói&gt; címke számukra datasets.xml vagy sem. Tehát, ha egy adott adatkészlet
```
            <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
```
akkor minden olyan felhasználó, aki be van jelentkezve, engedélyezve lesz az adatkészlethez való hozzáférést, még akkor is, ha nincs&lt;felhasználói&gt; címke számukra datasets.xml ...
            
    * A tag értékének bármilyen változása a következő alkalommal lép életbe ERDDAP™ olvasó datasets.xml , beleértve az adatkészletre adott válaszban is [zászló](/docs/server-admin/additional-information#flag) ...
         
### &lt;útRegex & gt;{#pathregex} 
* [[szerkesztés]] ** &lt;ugyeRegex&gt; ** ] (#pathregex) Adja meg a rendszeres kifejezést, amely korlátozza az utat (Melyik közvetítők) az adatkészletbe kerül. Az alapértelmezettség .\\*, amely megfelel az összes útnak. Ez egy ritkán használt, ritkán szükséges, OPTIONAL címke EDDGrid FromFiles adatkészletek, EDDTableFromFiles adatkészletek, és néhány más adatkészlettípus. Azonban, amikor szüksége van rá, tényleg szüksége van rá.
    
Ahhoz, hogy ez a munka, akkor igazán jó a rendszeres kifejezéseket. Lásd ezt [regex dokumentáció](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) és [regex bemutató](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ... Különösen tudnia kell a rögzítő csoportokról (valami a parenthesesben) és a "vagy" szimbólum " | "..."
Együtt, ezek lehetővé teszik, hogy megadja számos lehetőséget, például, (opció1 | opció2 | opció3) ...
Szintén minden lehetőség nem lehet semmi, pl. ( | opció2 | opció3) ...
Azt is tudnia kell, hogy a rögzítő csoportok fészkezhetnek, azaz a rögzítő csoport bármely lehetősége tartalmazhat egy másik rögzítő csoportot, például. ( | opció2 ( | opció2 b) | opció2c)  | opció3) amely azt mondja, hogy az opció2 követhető semmi, vagy opció2b, vagy opció2c.
Az útRegexes számára minden opció egy mappa neve lesz, amelyet egy /, pl. bar/ követ.
    
Az ösvény trükkös részeRegex: Amikor ERDDAP™ ismétlődően leereszkedik a könyvtár fájáról, az ösvényRegexnek el kell fogadnia az összes olyan utat, amellyel az adatokkal találkozik a könyvtárak felé. A Regex fészkelő rögzítő csoportjai jó módja ennek kezelésére.
    
Példa:
Tegyük fel, hogy a következő könyvtári struktúrával rendelkezünk:
    ```
    /foo/bar/D0001/a/\\*.nc  
    /foo/bar/D0001/b/\\*.nc  
    /foo/bar/D0002/a/\\*.nc  
    /foo/bar/D0002/b/\\*.nc  
    ...  
    /foo/bar/E0001/a/\\*.nc  
    ...  
    ```
és a megadott fájlDirectory /foo/bar/, és csak akarjuk .nc fájlok a D-ben \\[ 0-9 \\] &#123;4&#125;/a/ aláírók.
A megoldás az, hogy beállítsuk az utatRegex to /foo / bar / ( | D \\[ 0-9 \\] &#123;4&#125;/ ( | a/) )   
Ez azt mondja:
Az útnak a /foo/bar/
Ezt követheti semmi vagy D \\[ 0-9 \\] &#123;4&#125;/
Ezt követheti semmi vagy a/
    
Igen, az útRegex hihetetlenül nehéz megfogalmazni. Ha elakad, kérjen számítógépes programozót (a legszorosabb dolog a való világban, hogy egy varázsló kiabálási ösztönzés?) vagy küldjön e-mailt Chrisnek. John at noaa.gov.
    
### &lt;adatkészlet és gt;{#dataset} 
* [[szerkesztés]] ** &lt;adatkészlet&gt; ** ] (#dataset) az OPTIONAL (de mindig használt) egy&lt;erddapDatasets&gt; tag datasets.xml (ha az összes információt tartalmazza&lt;adatkészlet&gt; és&lt;/dataset&gt;) teljesen leírja az egyik adatkészletet. Például,
    ```
    <dataset type="EDDGridFromDap" datasetID="erdPHssta8day" active="true"> ... </dataset>  
    ```
Legfeljebb számos adatcímke van az Ön számára datasets.xml fájl.
Három tulajdonság MAY jelenik meg egy&lt;Dataset&gt; címke:
     
    *    **típusa=" *egy típus* "..."** a REQUIRED tulajdonsága egy&lt;Dataset&gt; címke datasets.xml amely azonosítja az adatkészlet típusát (például, hogy ez egy EDDGrid / gridded vagy EDDTable/tabular adatkészlet) és az adatok forrása (például egy adatbázis, fájl vagy egy távoli OPeNDAP szerver) ... Lásd: [ **Adatkészlet típusok listája** ](#list-of-types-datasets) ...
         
#### adatkészlet Id{#datasetid} 
*    [ ** datasetID Ó *ADatasetID* "..."** ](#datasetid) a REQUIRED tulajdonsága egy&lt;adatkészlet&gt; címke, amely rövid (általában)&lt;15 karakter), egyedi, azonosító név egy adatkészlet.
    * A datasetID S MUST legyen egy levél (A-Z, a-z) A-Z, a-z, 0-9 és \\_ (de a legjobb, ha&lt;32 karakter teljes).
    * Adatbázis Az azonosítók érzékenyek, de nem hoznak létre kettőt datasetID s ez csak a felső/alacsonyabb levelekben különbözik. Ez problémákat okoz a Windows számítógépeken (Ön és / vagy egy felhasználó számítógépe) ...
    * Legjobb gyakorlatok: Javasoljuk, hogy használja [Tűz Esetleg](https://en.wikipedia.org/wiki/CamelCase) ...
    * Legjobb gyakorlatok: Javasoljuk, hogy az első rész legyen a forrás intézmény neve akronymája vagy rövidítése, és a második rész az adatkészlet neve akronymája vagy rövidítése legyen. Ha lehetséges, létrehozunk egy nevet, amely tükrözi a forrás neve az adatkészlet. Például használtuk datasetID ="erdPH sst a8day” egy adatkészletre NOAA   NMFS   SWFSC Környezetkutatási osztály ( ERD ) amelyet a forrás a műholdas/PH/ sst a/8 nap.
    * Ha módosítja az adatkészlet nevét, a régi adatkészlet (a régi névvel) még mindig élni fog ERDDAP ... Ez egy "orfán" adatkészlet, mert a specifikáció benne datasets.xml most eltűnt. Ezzel kell foglalkozni:
        1. Mert ERDDAP™ V2.19 és később nem kell semmit tennie. ERDDAP™ automatikusan eltávolítja ezeket az árva adatkészleteket.
        2. Mert ERDDAP™ v2.18 és korábban, meg kell tennie valamit, hogy távolítsa el az árva adatkészletek: Készítsen aktív="hamis" adatkészletet, például
```
                <dataset type="EDDTableFromNcFiles" datasetID="*theOldName*" active="false" />  
```
A következő nagy terhelés után Adatkészletek, Ezt a címkét eltávolíthatja a régi adatkészlet után, inaktív.
                 
#### aktív{#active} 
*    [ **aktív =" *boolean* "..."** ](#active) OPTIONAL attribútum egy&lt;Dataset&gt; címke datasets.xml amely azt jelzi, hogy egy adatkészlet aktív (jogosult a használatra ERDDAP ) vagy sem.
    * Valid értékek igazak (az alapértelmezett) és hamis.
    * Mivel az alapértelmezett igaz, nem kell használni ezt a tulajdonságot, amíg ideiglenesen vagy tartósan eltávolítani ezt az adatkészletet. ERDDAP ...
    * Ha csak eltávolít egy aktív="true" adatkészletet datasets.xml Az adatkészlet továbbra is aktív lesz ERDDAP™ De soha nem lesz frissítve. Az ilyen adatkészlet "orfán" lesz, és a státuszban ilyennek fogják felsorolni. html weboldal közvetlenül az olyan adatkészletek listája alatt, amelyek nem töltöttek be.
    * Ha aktív="hamis"-t állít be, ERDDAP™ a következő alkalommal deaktiválja az adatkészletet, amikor megpróbálja frissíteni az adatkészletet. Ha ezt megteszed, ERDDAP™ nem dob ki semmilyen információt, amelyet tárolhatott az adatkészletről, és biztosan nem tesz semmit a tényleges adatokhoz.
    * Az adatkészlet eltávolítása érdekében ERDDAP™ lásd [Erő adatkészlet eltávolítása](/docs/server-admin/additional-information#removing-datasets) ...
         

 ** Számos címke jelenhet meg a között&lt;adatkészlet&gt; és&lt;/dataset&gt; címkék. **   
Van néhány variáció, amelyben a címkék megengedett, hogy milyen típusú adatkészletek. Lásd a dokumentációt egy adott [adatkészlet típusa](#list-of-types-datasets) részletekért.

#### &lt;hozzáférhető To&gt;{#accessibleto} 
* [[szerkesztés]] ** &lt;hozzáférhető To&gt; ** ] (#Ccessibleto) egy OPTIONAL tag egy&lt;adatkészlet&gt; címke, amely meghatározza a comma-elválasztott listát [szerepek](#user) amely lehetővé teszi ezen adatkészlethez való hozzáférést. Például,
    ```
    <accessibleTo>RASmith, NEJones</accessibleTo>  
    ```
    * Ez része ennek ERDDAP A [biztonsági rendszer](/docs/server-admin/additional-information#security) bizonyos adatkészletekhez való hozzáférés korlátozása bizonyos felhasználók számára.
    * Ha ez a címke nem jelenik meg, minden felhasználó (még akkor is, ha nem jelentkeztek be) hozzáférni fog ehhez az adatkészlethez.
    * Ha ez a címke jelen van, ez az adatkészlet csak látható és hozzáférhető a bejelentett felhasználók számára, akiknek az egyik meghatározott szerepe van. Ez az adatkészlet nem lesz látható azok számára, akik nem jelentkeznek be.
    * Minden felhasználó, aki bejelentkezik, automatikusan megkapja a szerepet \\[ bárkit megadva Inkább \\] - akár van egy&lt;felhasználói&gt; címke számukra datasets.xml vagy sem. Tehát, ha egy adott adatkészlet
    ```
        <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
    ```
akkor minden olyan felhasználó, aki be van jelentkezve, engedélyezve lesz az adatkészlethez való hozzáférést, még akkor is, ha nincs&lt;felhasználói&gt; címke számukra datasets.xml ...
         
#### &lt;graphsAccessibleTo&gt;{#graphsaccessibleto} 
* [[szerkesztés]] ** &lt;graphsAccessibleTo&gt; ** ] (#grafsaccessibleto) egy OPTIONAL tag egy&lt;Dataset&gt; címke datasets.xml amely meghatározza, hogy az adatkészlet grafikája és metaadata elérhető-e a nyilvánosság számára. Ez lehetőséget kínál arra, hogy részben felülírja az adatkészletet [&lt;hozzáférhetőTo&gt; (#Ccessibleto) beállítás. Az engedélyezett értékek:
    * autó - Ez az érték (vagy hiánya egy&lt;graphsAccessibleTo&gt; címke az adatkészlethez) hozzáférést biztosít a grafikonokhoz és a metaadatokhoz az adatkészletből, az adatkészlet&lt;hozzáférhetőTo&gt; beállítás.
Tehát ha az adatkészlet privát, a grafikonja és a metaadata privát lesz.
És ha az adatkészlet nyilvános, a grafikonja és a metaadata nyilvános lesz.
    * nyilvános - Ez a beállítás lehetővé teszi az adatkészlet grafikonját és metaadatát bárki számára, még azok is, akik nem jelentkeznek be, még akkor is, ha az adatkészlet egyébként privát, mert van egy&lt;hozzáférhetőTo&gt; címke.
         
#### &lt;hozzáférhető ViaFiles & Gt;{#accessibleviafiles} 
* [[szerkesztés]] ** &lt;hozzáférhetőViaFiles&gt; ** ] (#Ccessibleviafiles) egy OPTIONAL tag egy&lt;Dataset&gt; címke datasets.xml Mert [ EDDGrid AggregateExistingDimenzió](#eddgridaggregateexistingdimension) , [ EDDGrid Másolás](#eddgridcopy) , [ EDDGrid FromEDDTable](#eddgridfromeddtable) , [ EDDGrid FromErdap](#eddfromerddap) , [ EDDGrid FromEtopo](#eddgridfrometopo) , [ EDDGrid Fájlok](#eddgridfromfiles)   (beleértve az összes alosztályt) , [ EDDGrid SideBySide](#eddgridsidebyside) , [EDDTableCopy](#eddtablecopy)   [EDDTableFromErddap](#eddfromerddap) , [EDDTableFrom EDDGrid ](#eddtablefromeddgrid) és [EDDTableFromFiles](#eddtablefromfiles)   (beleértve az összes alosztályt) adatkészletek. Valódi vagy hamis értéke lehet. Például,
    ```
    <accessibleViaFiles>true</accessibleViaFiles>  
    ```
Ha az érték igaz, ERDDAP™ így a felhasználók böngészhetnek és letölthetik az adatkészlet forrásadatfájljait ERDDAP A [ "files" rendszerrendszer](https://coastwatch.pfeg.noaa.gov/erddap/files/) ... Lásd: "files" rendszer [dokumentáció](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) További információkért.
    
Az alapértelmezett érték&lt;hozzáférhetőViaFiles&gt; A&lt;DefaultAccessibleViaFiles&gt; benne [setup.xml](/docs/server-admin/deploy-install#setupxml) ... A hamis alapértelmezett értéke van, de azt javasoljuk, hogy adja hozzá ezt a címkét a setup.xml-hez az igaz értékkel.
    
Ajánlás - Javasoljuk, hogy az összes releváns adatkészlet elérhető legyen a fájlrendszeren keresztül a fájlok beállításával&lt;defaultAccessibleViaFiles&gt; az igazi beállítás.xml, mert van egy csoport felhasználó, akinek ez a preferált módja az adatok megszerzésének. Egyéb okok között, "files" rendszer megkönnyíti a felhasználók számára, hogy lássák, mely fájlok állnak rendelkezésre, és amikor utoljára megváltoztak, így megkönnyíti a felhasználó számára a teljes adatkészlet saját másolatának fenntartását. Ha általában nem akarja, hogy az adatkészletek hozzáférhetők legyenek a fájlrendszeren keresztül, állítsa be&lt;defaultAccessibleViaFiles&gt; hamisítványhoz. Mindkét esetben csak használja&lt;hozzáférhetőViaFiles&gt; azon kevés adatkészlet esetében, amelyek kivételt képeznek az általános politikának, amelyet&lt;DefaultAccessibleViaFiles&gt; (Például, ha az adatkészlet használata [ .nc ml ml](#ncml-files) fájlok, amelyek nem igazán hasznosak a felhasználók számára) ...
     
#### &lt;hozzáférhető Via WMS Gt;{#accessibleviawms} 
* [[szerkesztés]] ** &lt;hozzáférhető Via WMS &gt; &gt; &gt; &gt; ** ] (#Ccessibleviawms) egy OPTIONAL tag egy&lt;Dataset&gt; címke datasets.xml mindenkinek [ EDDGrid ](#eddgrid) alosztályok. Lehet értéke az igazi (az alapértelmezett) vagy hamis. Például,
    ```
    <accessibleViaWMS>true</accessibleViaWMS>  
    ```
Ha az érték hamis, ERDDAP A WMS a szerver nem lesz elérhető ezen adatkészlet számára. Ezt általában olyan adatkészletek esetében használják, amelyeknek több mint 180 értéke van (amely technikailag érvénytelen WMS Szolgáltatások) és amelyre az adatkészlet változatát is kínálja, a hosszúsági értékekkel teljes egészében a -180-180-as tartományban. [ EDDGrid LonPM180](#eddgridlonpm180) ...
Ha az érték igaz, ERDDAP™ megpróbálja a rendelkezésre álló adatkészletet elérhetővé tenni ERDDAP A WMS szerver. De ha az adatkészlet teljesen alkalmas WMS   (pl. nincs hosszúsági vagy magassági adatok) Ezután az adatkészlet nem lesz elérhető ERDDAP A WMS szerver, függetlenül a beállítástól.
     
#### &lt;Hozzáadás Variables Hol&gt;{#addvariableswhere} 
* [[szerkesztés]]&lt;addVariablesWhere&gt; (#addvariables hova) egy OPTIONAL címke belül&lt;adatkészlet&gt; címke az összes EDDTable adatkészlethez.
    
Bármely EDDTable adatkészlet iránti kérelmek tartalmazhatnak &add Variables Hol ("..." *tulajdonság név* "" *tulajdonság Érték* "...") Amit mond ERDDAP™ az összes változó hozzáadása az adatkészletben, ahol *attributeName=attributeValue* a kért változók listájára. Például, ha egy felhasználó hozzáadja &add Variables Hol ("..." ioos\\_category "Wind") egy lekérdezésre, ERDDAP hozzáadja az összes változót az adatkészletben, amely rendelkezik ioos\\_category = A kért változók listájának tulajdonítva (Például WindSpeed, WindDirection, WindGustSpeed) ... *tulajdonság név* és *tulajdonság Érték* esetérzékenyek.
    
Inkább datasets.xml , ha az adatkészlet része.xml egy adatkészlethez
    ```
    <addVariablesWhere>*attributeNamesCSV*<addVariablesWhere>  
    ```
például,
    ```
    <addVariablesWhere>ioos\\_category,units<addVariablesWhere>  
    ```
Az adathozzáférési forma (.html weboldal) az adatkészlet tartalmaz egy widgetet (minden attriteName a comma-választott listában) a változók listája alatt, amelyek lehetővé teszik a felhasználók számára, hogy meghatározzák a tulajdonságértéket. Ha a felhasználó egy vagy több attribútum-nevet kiválaszt, hozzáadódik a kérelemhez &add Variables Hol ("..." *tulajdonság név* "" *tulajdonság Érték* "...") ... Így ez a címke datasets.xml lehetővé teszi, hogy megjelölje azokat a tulajdonságneveket, amelyek megjelennek az Adathozzáférési Formán, és megkönnyítik a felhasználók számára, hogy hozzáadják &addVariables Ahol a kérésre működik. A *attributeNamesCSV* A lista esetérzékeny.
    
#### &lt;altitudeMetersPerSourceUnit & gt;{#altitudemeterspersourceunit} 
* [[szerkesztés]] ** &lt;AltitudeMetersPerSourceUnit&gt; ** ] (#altitudemeterspersourceunit) egy OPTIONAL címke belül&lt;adatkészlet&gt; címke az adatkészletekben. xxml az EDDTableF-hez SOS adatkészletek (Csak&#33;) ez olyan számot határoz meg, amelyet a forrás magassága vagy mélységértékei megsokszoroznak, hogy magassági értékekké alakítsák őket (méter tengerszint felett) ... Például,
    ```
    <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>  
    ```
Ez a címke MUST akkor használható, ha az adatkészlet vertikális tengelyértékei nem méterek, pozitív=up. Ellenkező esetben a TIONÁLIS, mivel az alapértelmezett érték 1. Például,
    * Ha a forrás már mérhető a tengerszint felett, használja az 1-et (vagy nem használja ezt a címkét, mivel az 1 az alapértelmezett érték) ...
    * Ha a forrást tengerszint alatt mérik, használjon -1-et.
    ```
        <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>
    ```
    * Ha a forrást a tengerszint feletti km-ben mérik, használjon 0,001-et.
         
#### &lt;defaultDataQuery & gt;{#defaultdataquery} 
* [[szerkesztés]] ** &lt;DefaultDataQuery&gt; ** ] (#defaultdataquery) egy OPTIONAL tag egy&lt;Dataset&gt; címke datasets.xml Ez azt mondja ERDDAP™ a megadott lekérdezés használata (az URL része a „?” után?) ha a .html fájl típus (Az adathozzáférési forma) kérésre nincs lekérdezés.
    * Valószínűleg ritkán kell használni ezt.
    * XML-kódra van szüksége (nem százalékkód) az alapértelmezett kérdések, mivel egy XML dokumentumban vannak. Például, és &amp; ,&lt;lesz&lt;, &gt; válik ésgt;
    * Kérjük, ellenőrizze a munkáját. Könnyű hibát követni, és nem kapja meg azt, amit akar. ERDDAP™ megpróbálja megtisztítani a hibáit - de ne támaszkodjon rá, mivel\\*hogyan\\*Megtisztítva változhat.
    * A hálózati adatkészletek esetében ennek egy közös használata egy másik alapértelmezett mélység vagy magassági dimenzió érték meghatározása. (például, \\[ 0 0 \\] helyette \\[ utolsó \\] ) ...
Mindenesetre mindig fel kell sorolnia az összes változót, mindig ugyanazt a dimenzió értéket használja minden változó számára, és szinte mindig használjon. \\[ 0 0 \\] , \\[ utolsó \\] vagy \\[ 0: utolsó \\] a dimenzió értékeiért.
Például:
    ```
        <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
    ```
    * Mert tabledap adatkészletek, ha nem határoz meg korlátozást, a kérelem visszaadja az egész adatkészletet, amely gyakorlatilag nagy lehet, az adatkészlettől függően. Ha nem akarsz semmilyen korlátozást meghatározni, nem pedig üres&lt;DefaultDataQuery&gt; (ami ugyanaz, mint az alapértelmezés megjelölése Adatkérés) , meg kell kifejezetten felsorolni az összes változót, amit szeretne tartalmazni az alapértelmezettDataQuery.
    * Mert tabledap adatkészletek, ennek leggyakoribb használata, hogy meghatározza a különböző alapértelmezett időtartományt (viszonylag max (Idő) Például, &time&gt;=max (Idő) -1day, vagy viszonylag most, például, &time&gt;= now- 1 nap) ...
Ne feledje, hogy az adatok változóinak kérése ugyanaz, mint az összes adatváltozat meghatározása, így általában csak meghatározhatja az új időkorlátot.
Például:
    ```
        <defaultDataQuery>&amp;time&gt;=max(time)-1day</defaultDataQuery>  
    ```
vagy
    ```
        <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>  
    ```
#### &lt;defaultGraphQuery&gt;{#defaultgraphquery} 
* [[szerkesztés]] ** &lt;DefaultGraphQuery&gt; ** ] (#defaultgraphquery[szerkesztés]) egy OPTIONAL tag egy&lt;Dataset&gt; címke datasets.xml Ez azt mondja ERDDAP™ a megadott lekérdezés használata (az URL része a „?” után?) ha a .graph fájl típus (A Make A Graph Form) kérésre nincs lekérdezés.
    * Valószínűleg ritkán kell használni ezt.
    * XML-kódra van szüksége (nem százalékkód) az alapértelmezett kérdések, mivel egy XML dokumentumban vannak. Például, és &amp; ,&lt;lesz&lt;, &gt; válik ésgt;
    * Kérjük, ellenőrizze a munkáját. Könnyű hibát követni, és nem kapja meg azt, amit akar. ERDDAP™ megpróbálja megtisztítani a hibáit - de ne támaszkodjon rá, mivel\\*hogyan\\*Megtisztítva változhat.
    * A hálózati adatkészletek esetében ennek a leggyakoribb használata egy másik alapértelmezett mélység vagy magassági dimenzió érték meghatározása. (például, \\[ 0 0 \\] helyette \\[ utolsó \\] ) és/vagy meg kell határozni, hogy egy adott változót grafikonozzák.
Mindenesetre szinte mindig használni fog \\[ 0 0 \\] , \\[ utolsó \\] vagy \\[ 0: utolsó \\] a dimenzió értékeiért.
Például:
    ```
        <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>  
    ```
         (de tedd az egészet egy sorra) 
    * Mert tabledap adatkészletek, ha nem határoz meg semmilyen korlátozást, a kérelem az egész adatkészletet grafikálja, amely hosszú időt vehet igénybe az adatkészlettől függően.
    * Mert tabledap adatkészletek, ennek leggyakoribb használata, hogy meghatározza a különböző alapértelmezett időtartományt (viszonylag max (Idő) Például, &time&gt;=max (Idő) -1day, vagy viszonylag most, például, &time&gt;= now- 1 nap) ...
Ne feledje, hogy az adatok változóinak kérése ugyanaz, mint az összes adatváltozat meghatározása, így általában csak meghatározhatja az új időkorlátot.
Például:
    ```
        <defaultGraphQuery>&amp;time&gt;=max(time)-1day</defaultGraphQuery>  
    ```
vagy
    ```
        <defaultGraphQuery>&amp;time&gt;=now-1day</defaultGraphQuery>  
    ```
#### &lt;dimenzióValuesInMemory & Gt;{#dimensionvaluesinmemory} 
* [[szerkesztés]] ** &lt;dimenzió ÉrtékekInMemory&gt; ** ] (#dimenziós érzelmek)   (Igaz (az alapértelmezett) vagy hamis) egy OPTIONAL és ritkán használt címke belül&lt;adatkészlet&gt; címke bármelyik EDDGrid adatkészlet, amely ERDDAP™ hol tartsuk fenn a dimenziók forrásértékeit (néven is ismert axisVariable s) :
    
    * igaz = a memóriában (ami gyorsabb, de több memóriát használ) 
    * hamis = a lemezen (ami lassabb, de nem használ memóriát) 
    
Például,
    ```
    <dimensionValuesInMemory>false</dimensionValuesInMemory>  
    ```
Ezt csak a hamis nem-default értékkel kell használnia, ha a ERDDAP™ sok adatkészlettel rendelkezik nagyon nagy méretekkel (pl. értékek milliói, pl. EDDGrid FromAudioFiles adatkészletek) és ERDDAP A használatban lévő memóriahasználat mindig túl magas. Lásd a memória: jelenleg használja a sort \\[ YourDomain \\]  /erddap/status.html monitor ERDDAP™ memóriahasználat.
     
#### &lt;fájlTableInMemory & Gt;{#filetableinmemory} 
* [[szerkesztés]] ** &lt;fájlTableInMemory ** ] (#filetableinmemory)   (igaz vagy hamis (az alapértelmezett) ) egy OPTIONAL címke belül&lt;adatkészlet&gt; címke bármelyik EDDGrid FromFiles és EDDTable FromFiles adatkészlet, amely elmondja ERDDAP™ hol tartsa a fájlTable (amely információkat tartalmaz minden forrásadat fájlról) :
    
    * igaz = a memóriában (ami gyorsabb, de több memóriát használ) 
    * hamis = a lemezen (ami lassabb, de nem használ memóriát) 
    
Például,
    ```
    <fileTableInMemory>true</fileTableInMemory>  
    ```
Ha ezt minden adatkészlethez igazítod, tartsd szemmel a Memory-t: jelenleg vonalat használsz \\[ YourDomain \\]  /erddap/status.html annak biztosítása, hogy ERDDAP™ Még mindig rengeteg szabad memóriával rendelkezik.
     
#### &lt;fgdcFile & gt;{#fgdcfile} 
* [[szerkesztés]] ** &lt;fgdcFile&gt; ** ] (#fgdcfile) egy OPTIONAL tag egy&lt;Dataset&gt; címke datasets.xml Ez azt mondja ERDDAP™ Előkészített FGDC fájl használata helyett ERDDAP™ Próbálja létrehozni a fájlt. Használat:
```
    <fgdcFile>*fullFileName*</fgdcFile>  
```
     *teljes FileName* hivatkozhat egy helyi fájlra (valahol a szerver fájlrendszerén) vagy egy távoli fájl URL-je.
Ha *teljes FileName* \\="" vagy a fájl nem található, az adatkészletnek nem lesz FGDC metaadata. Tehát ez akkor is hasznos, ha el akarja nyomni az FGDC metaadatát egy adott adatkészlethez.
Vagy, lehet tenni&lt;fgdcActive&gt; hamis&lt;/fgdcActive&gt; a setup.xml-ben, hogy elmondja ERDDAP™ nem kínál FGDC metaadatot minden adatkészlethez.
     
#### &lt;Iso19115 File&gt;{#iso19115file} 
* [[szerkesztés]] ** &lt;Iso19115Fil&gt; ** ] (#iso19115file) egy OPTIONAL tag egy&lt;Dataset&gt; címke datasets.xml Ez azt mondja ERDDAP™ Használjon előre elkészített ISO 19115 fájlt ahelyett, hogy ERDDAP™ Próbálja létrehozni a fájlt. Használat:
    ```
    <iso19115File>*fullFileName*</iso19115File>  
    ```
     *teljes FileName* hivatkozhat egy helyi fájlra (valahol a szerver fájlrendszerén) vagy egy távoli fájl URL-je.
Ha *teljes FileName* \\="" vagy a fájl nem található, az adatkészlet nem lesz ISO 19115 metaadata. Tehát ez akkor is hasznos, ha el akarja nyomni az ISO 19115 metaadatot egy adott adatkészlethez.
Vagy, lehet tenni&lt;Io19115Active&gt; hamisítás&lt;/iso19115Active&gt; a setup.xml-ben, hogy elmondja ERDDAP™ nem kínál ISO 19115 metaadatot minden adatkészlethez.
     
#### &lt;MeccsAxi NDigits & Gt;{#matchaxisndigits} 
* [[szerkesztés]] ** &lt;AxisNDigits&gt; ** ] (#matchaxisndigits) egy OPTIONAL tag egy EDDGrid  &lt;adatkészlet&gt; címke EDDGrid adatkészletek, amelyek aggregációk, pl. fájlok összessége. Minden alkalommal, amikor az adatkészletet újratöltik, ERDDAP™ ellenőrzi, hogy az aggregáció egyes összetevőinek tengelyértékei ugyanazok. A vizsgálat pontosságát a vizsgálat határozza meg [AxisNDigits](#matchaxisndigits) , amely meghatározza a számjegyek teljes számát, amelyeknek meg kell felelniük a kettős pontossági tengelyértékek tesztelésekor, 0 - 18 (az alapértelmezett) ... A float tengelyértékek tesztelésekor a teszt a matchAxisNDigits/2 számjegyekkel történik. A 18 vagy annál magasabb értéke azt mondja EDDGrid pontos tesztet végezni. A 0 értéke mondja EDDGrid ne végezzen tesztelést, amelyet nem ajánlott, kivéve az alábbiakban leírtak szerint.
    
Bár EDDGrid lehetővé teszi a gyülekezet komponenseinek, hogy kissé eltérő tengelyértékekkel rendelkezzenek, csak egy tengelyértéket mutatnak a felhasználónak. A készlet ugyanaz a komponens, amely biztosítja az adatkészlet metaadatát. Például, például EDDGrid FromFiles adatkészletek, amelyeket a&lt;metadataFrom&gt; beállítás (Default=last) ...
    
A meccsAxisNDigits\\=0 használata erősen elriasztott a legtöbb esetben, mert lekapcsol minden ellenőrzést. Még a minimális ellenőrzés is hasznos, mert biztosítja, hogy az alkatrészek alkalmasak az összesítésre. Mindannyian feltételezzük, hogy minden komponens alkalmas, de ez nem mindig így van. Ez tehát egy fontos szanitásteszt. Még a matchAxisNDigits1, 2, 3 vagy 4 értéke is elriasztódik, mert a különböző tengelyértékek gyakran jelzik, hogy az összetevőket létrehozták (Megkötött?) más módon, és így nem alkalmasak az aggregációra.
    
Van egy eset, ahol a meccsAxisNDigits\\=0 használata hasznos és ajánlott: távoli fájlok összessége, például az S3 buckets adataival. Ebben az esetben, ha az adatkészlet használja a cacheFromUrl, cacheSizeGB, matchAxisNDigits\\=0, és a EDDGrid FromFiles rendszer [Aggregáció keresztül File nevek](#aggregation-via-file-names-or-global-metadata) Aztán EDDGrid nem kell elolvasnia az összes távoli fájlt, hogy megtegye az aggregációt. Ez lehetővé teszi az S3 buckets adataiból származó adatkészletek gyors betöltését (abszurd módon, ha EDDGrid letölteni és olvasni az összes fájlt) ...
    
#### &lt;nThreads & gt;{#nthreads} 
* Kezdőlap ERDDAP™ 2.00 verzió, ha az EDDTableFromFiles vagy EDDGrid a forrásból származó adatokat olvassa el, egy darab adatot elolvashat (pl. egy forrásfájl) egy időben (egy szál)   (Ez az alapértelmezés) vagy több, mint egy darab adat (pl.: 2+ forrásfájlok) egy időben (2 vagy több szálban) Minden kérelem feldolgozása közben.
     
    * Thumb szabály:
A legtöbb adatkészlet a legtöbb rendszeren, használja az nThreads=1-et, az alapértelmezettséget. Ha van egy erős számítógép (Rengeteg CPU hullám, sok memória) Ezután fontolja meg az nThreads 2, 3, 4 vagy magasabb beállítását (de soha többet, mint a CPU fűrészek száma a számítógépen) olyan adatkészletek esetében, amelyek előnyösek lehetnek:
        
        * A legtöbb EDDTableFromFiles adatkészlet előnyös lesz.
        * Adatkészletek, ahol valami okozza a lemaradást, mielőtt egy darab adat ténylegesen feldolgozható, előnyös, például:
            * Adatkészletek [külsőleg elnyomott (pl.: .gz ) ](#externally-compressed-files) bináris (pl.: .nc ) fájlok, mert ERDDAP™ elnyomja az egész fájlt, mielőtt elkezdi olvasni a fájlt.
            * Adatkészletek, amelyek [cacheSizeGB](#cachefromurl) mert ERDDAP™ Gyakran le kell töltenie a fájlt, mielőtt elolvashatja.
            * Adatkészletek a magas sávú párhuzamos fájlrendszeren tárolt adatfájlokkal, mert több adatot, gyorsabban, ha kérik. A párhuzamos fájlrendszerek példái közé tartoznak [JBOD](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures) , [pNFS](http://www.pnfs.com/) , [GlusterFS](https://en.wikipedia.org/wiki/Gluster) Amazon S3 és a Google Cloud Storage.
                 
        
Figyelmeztetés: Az nThreads&gt;1 használatakor tarts szemmel ERDDAP memóriahasználat, szálhasználat és általános felelősség (lásd: [ ERDDAP status oldal](/docs/server-admin/additional-information#status-page) ) ... Lásd észrevételeit ezekről a kérdésekről az alábbiakban.
         
    * Egy adott adatkészlet esetében ez az nThreads beállítás különböző helyekről származhat:
        
        * Ha datasets.xml cunk for a dataset egy&lt;nThreads&gt; címke (belül&lt;adatkészlet&gt; címke, nem mint globális tulajdonság) értékkel&gt;= 1, az nThreads értékét használják. Tehát más számot adhat az egyes adatkészletekhez.
        * Egyébként, ha datasets.xml Van egy&lt;nTableThreads&gt; címke (EDDTable FromFiles adatkészletek) vagy egy&lt;nGridThreads&gt; címke (Mert EDDGrid adatkészletek) értékkel&gt;= 1, kívül egy&lt;adatkészlet&gt; címke, az nThreads értékét használják.
        * Ellenkező esetben 1 szálat használnak, ami biztonságos választás, mivel a legkisebb memóriát használja.
             
        
Mert [eredeti ERDDAP™ telepítés](https://coastwatch.pfeg.noaa.gov/erddap/index.html) használjuk
        &lt;nTableThreads&gt; 6 6 6&lt;/nTableThreads&gt; (Ez egy erős szerver.) A nehéz kérések most az előző idő 30%-át teszik ki.
         
##### Monitor erőforrás felhasználása{#monitor-resource-usage} 
Amikor különböző nThreads beállításokkal kísérletez (és talán nehezebb mintakéréseket tesz az Ön számára ERDDAP ) , figyelemmel kísérheti a számítógép erőforrás-felhasználását:
* Macskákon használja a Finder: Applications: Utilities: Activity Monitor
* Linuxon használja a felső
* Windows 10, használat *Ctrl + Shift + Esc* Nyissa meg a Task Managert
             
##### Figyelmeztetés: Meghatározott felelősség{#warning-decreased-responsiveness} 
Elszigeteltségben, ERDDAP™ egy magasabb nThreads-szal rendelkező adatkészlet iránti kérelem teljesítése gyorsabban, mint ha az nThreads=1. De bár ezt a kérést feldolgozzák, más felhasználók más kérései kissé zsúfoltak, és lassabb választ kapnak. Is, amikor ERDDAP™ válaszol egy adott kérésre, más számítási forrásokra (pl. lemezmeghajtási hozzáférés, hálózati sávszélesség) korlátozható, különösen a magasabb nThreads beállításokkal. Így a magasabb nThreads beállításokkal, az általános rendszerfelelősség rosszabb lesz, ha többszörös kérelmet dolgoznak fel - ez nagyon bosszantó lehet a felhasználók számára&#33; Emiatt: soha ne állítsa be az nThreads-t, mint a számítógép CPU fűrészeinek száma. nThreads=1 a legtisztább beállítás minden kérés óta (több egyidejű kérés között) egyenlő részesedést kap a számítási erőforrásoknak. De minél erősebb a számítógép, annál kevésbé lesz probléma.
         
##### Figyelmeztetés: Higher Memory Használjon EDDGrid Adatkészletek{#warning-higher-memory-use-for-eddgrid-datasets} 
A memóriahasználat, míg a feldolgozási kérelmek közvetlenül arányosak az nThreads beállítással. Egy ésszerűen biztonságos szabály a hüvelykujjj: meg kell határozni [ ERDDAP memória beállítások](/docs/server-admin/deploy-install#memory) legalább 2GB + (2GB \\* nThreads) ... Néhány adatkészlet iránti kérelemnek több memóriára lesz szüksége. Például az nThreads=3 beállítása bármelyikhez EDDGrid Az adatkészlet azt jelenti, hogy a -Xmx beállításnak legalább -Xmx8000M-nek kell lennie. Ha ez a memória beállítása nagyobb, mint 3/4 a számítógép fizikai emléke, csökkenti az nThreads beállítását, hogy csökkentse a memória beállítását.

Az EDDTable adatkészletekre vonatkozó szálak feldolgozási kérelmek memóriahasználata szinte mindig alacsonyabb, mert a fájlok általában sokkal kisebbek. Ha azonban egy adott EDDTable adatkészlet hatalmas (pl.:&gt;=1 GB) adatfájlok, majd a fenti megjegyzések is vonatkoznak ezekre az adatkészletekre.

Bármi legyen is az nThreads beállítása, tartsa szem előtt a memóriahasználati statisztikákat az Önén [ ERDDAP status oldal](/docs/server-admin/additional-information#status-page) ... Soha nem kell közelednie ahhoz, hogy a memóriafelhasználást maximalizálja ERDDAP egyébként súlyos hibák és kudarcok lesznek.
        
##### Ideiglenes beállítás 1{#temporarily-set-to-1} 
Ha a jelenlegi memóriahasználat még kissé magas, ERDDAP™ beállítja az nThreads-t erre a kérésre. Így, ERDDAP™ megőrzi az emlékezetet, amikor a memória szűkös.
         
##### A visszatérés csökkentése{#diminishing-returns} 
Vannak csökkenő visszatérés, hogy növelje az nThreads beállítás: 2 szál lesz jobb, mint 1 (ha figyelmen kívül hagyjuk a dinamikus túlórát) ... De a 3 csak egy darab jobb lesz, mint 2. A 4 csak marginálisan jobb lesz, mint 3.

Egy teszt egy nehéz lekérdezés egy nagy EDDTable adatkészlet, a válaszidő használata 1, 2, 3, 4, 5, 6 szál volt 38, 36, 20, 18, 13, 11 másodperc. (Most használjuk az nTableThreads=6-ot ezen a szerveren.) 

nThreads=2: Bár gyakran jelentős előnye van az nThreads=2 meghatározásának az nThreads=1 helyett, gyakran nem tesz sok különbséget az adott felhasználó kérésére adott órában. Ennek oka: az nThreads=1, a legtöbb modern CPU gyakran [dinamikus túlórázás](https://en.wikipedia.org/wiki/Intel_Turbo_Boost)   (Turbo Boost) a CPU órás sebességének ideiglenes növelése. Így az nThreads=1-el, az egyik mag gyakran magasabb órás sebességgel dolgozik, mint a két sáv, ha nThreads=2-et használta. Függetlenül attól, hogy még mindig úgy gondoljuk, hogy jobb, ha az nThreads=2-t használjuk, nem pedig az nThreads=1-et, mivel ez a beállítás jobb eredményeket eredményez a helyzetek szélesebb körében. És persze, ha a számítógép rendelkezik elegendő CPU kukoricával, egy még magasabb nThreads beállításnak jobb eredményeket kell hoznia.

Mint fentebb említettük, nagyon magas nThreads beállítások vezethet gyorsabb válaszokat néhány kérésre, de a kockázat az általános csökkentett ERDDAP™ felelősség és magas memóriahasználat (a fentebb megjegyzett) míg ezeket a kérelmeket feldolgozzák, azt jelenti, hogy általában nem jó ötlet.
        
##### CPU Súgó{#cpu-cores} 
Nem szabad soha beállítani az nThreads-t egy szám nagyobbra, mint a CPU fűrészek száma a számítógép CPU-jában. Lényegében minden modern CPU-nak több sarka van (pl.: 2, 4 vagy 8) ... Néhány számítógép még több CPU-val is rendelkezik (pl. 2 CPUs \\* 4 cores/CPU = 8 CPU cores) ... Hogy megtudja, hány CPU és fűző egy számítógép:

* Macskákon használja *Opció kulcs* Apple Menu: Rendszerinformáció
* Linuxon használjon macskát / proc / cpuinfo
* Windows 10, használat *Ctrl + Shift + Esc* Nyitott Feladatkezelő: Performance (A logikai processzorok megmutatják a CPU hullák teljes számát) 

Igen, a legtöbb processzorok ezekben a napokban azt mondják, hogy támogatják a 2 szálat főként (keresztül [hiperszálas](https://en.wikipedia.org/wiki/Hyper-threading) ) , de a 2 szál megosztja a számítási forrásokat, így nem fogja kétszer látni a CPU-n keresztüli teljesítményt nehéz terhelés alatt. Például egy CPU-val rendelkező számítógép 4 fűvel azt állíthatja, hogy legfeljebb 8 szálat támogat, de soha nem haladhatja meg az nThreads=4-et abban az esetben. ERDDAP ... Ne feledje:

* Az nThreads beállítása ERDDAP™ kérésre. ERDDAP™ gyakran egyszerre több kérést kezel.
*    ERDDAP™ más dolgokat tesz, mint a folyamatkérések, például az adatkészletek újratöltése.
* Mikor ERDDAP™ válaszol egy adott kérésre, más számítási forrásokra (pl. lemezmeghajtási hozzáférés, hálózati sávszélesség) korlátozás lehet. A magasabb, amit nThreads-t hoztál létre, annál valószínűbb, hogy ezek a többi erőforrások le lesznek foglalva, és lelassulnak ERDDAP Általános felelősség.
* Az operációs rendszer más dolgokat csinál, mint futni ERDDAP ...

Tehát a legjobb, ha nem állítja be az nThreads-t, amely több, mint a számítógép CPU-jában található fűrészek számát tartalmazza.
         
##### Lehet, hogy a mérföld Vary (YMMV)  {#your-mileage-may-vary-ymmv} 
A különböző nThreads beállítások eredményei nagyban különböznek a különböző adatkészletek különböző kéréseitől a különböző rendszereken. Ha igazán szeretné megismerni a különböző nThreads beállítások hatását, reális teszteket futtat.
         
##### Miért nHárom kérésre?{#why-nthreads-per-request} 
Hallhatom, hogy néhányan közületek azt gondolják, hogy „Miért nThreads per kérésre? Ha ezt kódolnám, használnék egy állandó munkásszálas medencét és egy üzenetküldő sort a jobb teljesítmény érdekében.” A probléma egy munkavállalói szálmedencével és egy üzenetküldő kérdéssel az, hogy egy nehéz kérés számos lassú feladattal elárasztja a sort. Ez hatékonyan blokkolná ERDDAP™ a más kérelmekkel kapcsolatos feladatok megkezdésétől az eredeti kérelemig (lényegében) befejeződött. Így még az egyszerű későbbi kérések is lassan reagálnak. ERDDAP Az nThreads kérésre történő felhasználása a számítási források sokkal tisztább felhasználásához vezet.
         
##### nThreads vs. Több munkavállalói számítógépek{#nthreads-vs-multiple-worker-computers} 
Sajnos, ERDDAP "Az nThreads rendszer soha nem lesz olyan hatékony, mint az igazi párhuzamosan több munkavállalói számítógépen keresztül, és minden egyes munka egy darab adaton dolgozik, úgy, ahogyan a Hadoop vagy az Apache Sparkot általában használják. Amikor a feladat valóban párhuzamos/elosztott több számítógéphez, minden számítógép felhasználhatja az összes erőforrását a feladat részéről. Ezzel ERDDAP nThreads rendszer, minden szál versenyez ugyanazon számítógép sávszélessége, lemezmeghajtók, memória stb. Sajnos a legtöbbünknek nincs forrása vagy pénzeszköze, hogy felállítson vagy akár béreljen (Az Amazon Web Services (AWS) Google Cloud platform (GCP) ) masszív hálózatok számítógépek. Ellentétben egy kapcsolati adatbázissal, amely lehetővé teszi az eredmény sorok visszaküldését bármilyen sorrendben, ERDDAP™ ígéretet tesz arra, hogy az eredmény sorokat következetes sorrendben adja vissza. Ez a korlátozás teszi ERDDAP Az nThreads kevésbé hatékony. De ERDDAP Az nThreads sok esetben hasznos.

Azonban vannak módjai annak, hogy ERDDAP™ skála, hogy kezelje a hatalmas számú kérés gyorsan létrehozásával egy [háló/klaszter/szövetség ERDDAP s](/docs/server-admin/scaling) ...
         
#### &lt;paletták és gt;{#palettes} 
* Kezdőlap ERDDAP™ verzió 2.12, datasets.xml tartalmazhat&lt;paletta&gt; címke (innen&lt;erddapDatasets&gt;), amely felülírja&lt;paletták&gt; címkeérték az üzenetekből.xml (vagy visszaállítja az üzeneteket.xml értéket, ha a címke datasets.xml üres) ... Ez lehetővé teszi a rendelkezésre álló paletták listáját, miközben ERDDAP™ fut. Azt is lehetővé teszi, hogy változzon, és maradjon, ha telepít egy új verziót ERDDAP ...
WARNING: A paletták szerepelnek datasets.xml szuperállománynak kell lennie az üzenetekben felsorolt palettáknak; különben ERDDAP™ kivételt fog dobni, és abbahagyja a feldolgozást datasets.xml ... Ez biztosítja, hogy minden ERDDAP™ a létesítmények legalább ugyanazokat a magpalettákat támogatják.
WARNING: ERDDAP™ ellenőrzi, hogy a palettafájlok az üzenetekben találhatók.xml valójában léteznek, de nem ellenőrzi a palettafájlokat. datasets.xml ... Az Ön felelőssége, hogy a fájlok jelen legyenek.
    
Szintén kezdve ERDDAP™ 2.12-es verzió, ha cptfilokat állít be a közvetettbe ERDDAP™ tartalomkezelő, ERDDAP™ lemásolja az összes \\*.cpt fájlt az adott könyvtárban \\[ Tomcat \\] /webapps/erddap/WEB-INF/cptfiles könyvtár minden alkalommal ERDDAP™ kezdődik. Így, ha egyedi cpt fájlokat helyez be az adott könyvtárba, ezeket a fájlokat fogják használni ERDDAP™ Nincs több erőfeszítés a részéről, még akkor is, ha új verziót telepítesz ERDDAP ...
    
FIGYELMEZTETÉS: Ha egyedi palettákat ad hozzá ERDDAP™ és van EDDGrid FromErddap és/vagy EDDTableFromErdap adatkészletek az Ön adataiban ERDDAP™ Ezután a felhasználók meglátják a szokásos paletta opciókat ERDDAP™ Készítsen egy grafikus weboldalt, de ha a felhasználó megpróbálja használni őket, akkor grafikont kap az alapértelmezettel (rendszerint Rainbow) paletta. Ez azért van, mert a képet távolról alkotják ERDDAP™ amely nem rendelkezik a szokásos palettával. Az egyetlen megoldás most a távoli e-mail ERDDAP™ adminisztrátor, hogy hozzáadja a szokásos palettáit az ő / ő ERDDAP vagy e-mail Chris. John at noaa.gov megkérdezi, hogy a palettákat hozzá kell adni a szabványhoz ERDDAP™ elosztás.
    
#### &lt;onChange & Gt;{#onchange} 
* [[szerkesztés]] ** &lt;OnChange&gt; ** ] (#onchange) egy OPTIONAL tag egy&lt;Dataset&gt; címke datasets.xml ez meghatározza a cselekvést, amely akkor történik, ha ez az adatkészlet létrejön (mikor ERDDAP™ újraindítás) és amikor ez az adatkészlet bármilyen módon változik.
    * Jelenleg, EDDGrid alosztályok, bármilyen változás a metaadata vagy a tengely változó (például a közeli valós idejű adatok új időpontja) változásnak tekinthető, de az adatkészlet újratöltése nem tekinthető változásnak (önmagára) ...
    * Jelenleg az EDDTable alosztály esetében az adatkészlet bármilyen újratöltése változásnak tekinthető.
    * Jelenleg csak kétféle intézkedés engedélyezett:
        * "..."http://"vagy "https://"- Ha a cselekvés "http://"vagy "https://", ERDDAP™ küldjön HTTP GET kérelem a megadott URL-hez. A válasz figyelmen kívül hagyásra kerül. Például az URL elmondhat egy másik webes szolgáltatást, hogy tegyen valamit.
            * Ha az URL-nek van egy lekérdező része (utána a "?") MIÉRT már [százalék kódolva](https://en.wikipedia.org/wiki/Percent-encoding) ... Különleges karaktereket kell kódolni a korlátozásokban (a kezdeti „és” és a fő '=' korlátok) a %H formában, ahol a HH a karakter két számjegyű hexadecimális értéke. Általában csak néhány punctuációs karaktert kell átalakítania: %-25, és %26, "- %22,&lt;%3C, = %3D, &gt; %3E, + %2B, | %7C, \\[ %5B, \\] %5D, tér %20, és átalakítani minden karakter felett #127 a saját UTF-8 formában, majd százaléka kódolja minden byte az UTF-8 formában a %HH formátum (kérjen programozót segítségért) ...
Például, & stationID &gt;="41004"
Beszéd és stationID %3E=%2241004%22
A százalékos kódolás általában akkor szükséges, ha hozzáfér ERDDAP szoftveren keresztül, mint egy böngésző. A böngészők általában kezelik a százalékos kódolást az Ön számára.
Bizonyos helyzetekben százalékban kell kódolni az A-Za-z0-9\\_-től eltérő összes karaktert&#33; "..." () \\*, de még mindig nem kódolja az eredeti '&' vagy a fő '=' korlátokban.
A programozási nyelveknek van eszközük erre (például lásd Java A [ java.net.URLEncoder ](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html) és Java Olvasson bele a(z)encodeURIComponent()] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) ) és vannak
                 [olyan webhelyek, amelyek százalékos kódot / dekódot mutatnak Önnek](https://www.url-encode-decode.com/) ...
            * óta datasets.xml XML fájl, akkor is &-encode ALL ' &',&lt;"és "&gt;" az URL-ben, mint '&amp;',&lt;és a „&gt;” százalékos kódolás után.
            * Példa: Egy olyan URL-hez, amelyet egy böngészőbe lehet beírni:
                https://www.company.com/webService?department=R%26D&param2=value2  
Meg kell határoznia egy&lt;OnChange&gt; címke keresztül (Egy vonalon) 
            ```
                <onChange>https://www.company.com/webService?department=R%26D&amp;param2=value2</onChange>
            ```
        * mailto: - Ha a cselekvés a „mailto:” címmel kezdődik, ERDDAP™ e-mailt küld a későbbi e-mail címre, jelezve, hogy az adatkészletet frissítették/változtatták.
Például:&lt;dalszöveg: JOhn.smith@company.com&lt;/onChange&gt; Ha jó oka van annak, hogy ERDDAP™ támogasson más típusú akciót, küldjön nekünk egy e-mailt, amely leírja, mit akar.
    * Ez a címke OPTIONAL. Ezek közül a címkék közül annyi lehet, amennyit csak akar. Használja az egyik ilyen címkét minden egyes cselekvésre.
    * Ez analóg a ERDDAP e-mail/URL előfizetési rendszer, de ezek a tevékenységek nem tárolják tartósan (azaz csak egy EDD objektumban tárolják) ...
    * Az előfizetés eltávolítása, csak távolítsa el a&lt;OnChange&gt; címke. A változást a következő alkalommal fogják megjegyezni, amikor az adatkészletet újratöltik.
         
#### &lt;ReloadEveryNMinutes & Gt;{#reloadeverynminutes} 
* [[szerkesztés]] ** &lt;újratöltés MindenNMinutes&gt; ** ] (#reloadeveryn percek) egy OPTIONAL tag egy&lt;Dataset&gt; címke datasets.xml szinte minden adatkészlettípusról, amely meghatározza, hogy milyen gyakran kell újratölteni az adatkészletet. Például,
    ```
    <reloadEveryNMinutes>60</reloadEveryNMinutes>
    ```
    * Általában olyan adatkészletek, amelyek gyakran változnak (például kapjon új adatfájlokat) Gyakran újra kell tölteni, például 60 percenként.
    * Azok az adatkészletek, amelyek gyakran változnak, ritkán kell újratölteni, például 1440 percenként (naponta) 10080 perc (heti) ...
    * Ez a címke TIONAL, de ajánlott. Az alapértelmezett 10080.
    * Egy példa:&lt;ReloadEveryNMinutes&gt;1440&lt;/reload MindenNMinutes&gt;
    * Amikor egy adatkészletet újratöltik, minden fájlt *bigParentDirectory[szerkesztés]* /cache/ * datasetID * A könyvtárat törölik.
    * Függetlenül attól, hogy mi ez be van állítva, az adatkészletet nem fogják gyakrabban betölteni, mint&lt;loadDatasetsMinMinutes&gt; (default = 15) , amint meghatározott [setup.xml](/docs/server-admin/deploy-install#setupxml) ... Tehát, ha azt szeretné, hogy az adatkészleteket nagyon gyakran újratöltsék, be kell állítani mind a reloadEveryNMinutes, mind a loadDatasets MinMinutes a kis értékekhez.
    * Ne állítsa vissza a ReloadEveryNMinutes-t ugyanazzal az értékkel, mint a loadDatasets MinMinutes, mert az eltelt idő valószínűleg (például) 14:58 vagy 15:02, így az adatkészletet csak a nagy terhelések mintegy felében töltik be. Ehelyett használjon kisebb (például 10) vagy nagyobb (Például 20) újratöltés MindenNMinutes érték.
    * Függetlenül a reloadEveryNMinutestől, manuálisan elmondhatja ERDDAP™ egy adott adatkészlet visszatöltése a lehető leghamarabb egy [Flag fájl](/docs/server-admin/additional-information#flag) ...
    * Curious Programmers - In ERDDAP™ Az összes adatkészlet újratöltését két célszál kezeli. Az egyik szál egy kisebb rettegést kezdeményez, ha egy zászlófájlt vagy egy nagyobb rettegést talál (amely ellenőrzi az összes adatkészletet, hogy megnézze, újra kell-e tölteni) ... A másik szál egyszerre teszi az adatkészletek tényleges újratöltését. Ezek a szálak a háttérben működnek, biztosítva, hogy minden adatkészlet naprakész legyen. A szál, amely ténylegesen teszi a reloads készít egy új verziót egy adatkészlet, majd bekapcsolja a helyére (lényegében helyettesíti a régi verzió atomi) ... Tehát nagyon lehetséges, hogy az események következő sorozata bekövetkezik (ez egy jó dolog) :
        
        1.   ERDDAP™ kezdi újratölteni egy adatkészletet (új verzió készítése) a háttérben.
        2. A felhasználó „A” kérést tesz az adatkészlethez. ERDDAP™ az adatkészlet jelenlegi verzióját használja a válasz létrehozásához. (Ez jó. A felhasználó számára nem volt késés, és az adatkészlet jelenlegi verziója soha nem lehet nagyon ellopni.) 
        3.   ERDDAP™ befejezi az adatkészlet új újratöltött verziójának létrehozását, és lenyeli azt az új verziót a gyártásba. Az összes későbbi új kérést az adatkészlet új verziója kezeli. A következetességhez a felhasználó A kérése még mindig tele van az eredeti verzióval.
        4. A „B” felhasználó kéri az adatkészletet és ERDDAP™ az adatkészlet új verzióját használja a válasz létrehozásához.
        5. Végül az A felhasználó és a B felhasználó kérése befejeződött (talán talán talán talán talán Először befejeződik, talán B befejezi az elsőt) ...
        
Hallhatok valakit, aki azt mondja: „Csak két szál&#33; Ha&#33; Ez a lame&#33; Meg kell határoznia, hogy az adatkészletek újratöltése annyi szálat használ, amennyire szükség van, így minden gyorsabban és kissé vagy nem laggal történik.” Igen és nem. A probléma az, hogy egynél több adatkészlet betöltése egy időben több nehéz új problémát okoz. Mindegyiket meg kell oldani vagy kezelni. A jelenlegi rendszer jól működik, és kezelhető problémákkal rendelkezik (Például a zászló előtti potenciál észlelhető) ... (Ha segítségre van szüksége, hogy kezelje őket, lásd a mi [rész további támogatás megszerzéséről](/docs/intro#support) ...) A kapcsolódó [frissítés MindenNMillis](#updateeverynmillis) . rendszer a válaszfalakon belül működik, így több adatállományhoz vezethet és frissíthető (nem a teljes reload) egyszerre.
##### Proaktív vs. Reactive{#proactive-vs-reactive} 
 ERDDAP A reload rendszer proaktív - az adatkészleteket hamarosan újratöltik A EveryNMinutes idő felemelkedik (i.e., ők "találkozóvá" válnak, de soha nem lopnak) - függetlenül attól, hogy az adatkészlet a felhasználóktól érkezik-e vagy sem. Szóval ERDDAP™ Az adatkészletek mindig naprakészek és készen állnak a használatra. Ez ellentétben áll a THREDDS reaktív megközelítésével: a felhasználó kérése az, ami megmondja a THREDDS-nek, hogy ellenőrizze, van-e adatkészlet (Lehet, hogy nagyon ellopott) ... Ha ellopják, a THREDDS várja a felhasználót (gyakran néhány percig) míg az adatkészlet újratöltésre kerül.
        
#### &lt;frissítés AllNMillis & Gt;{#updateeverynmillis} 
* [[szerkesztés]] ** &lt;frissítésEveryNMillis&gt; ** ] (#updateeverynmillis) egy OPTIONAL tag egy&lt;Dataset&gt; címke datasets.xml néhány adatkészlettípus, amely segít ERDDAP™ olyan adatkészletekkel dolgozunk, amelyek nagyon gyakran változnak (olyan gyakran, mint minden második) ... Ellentétben ERDDAP Rendszeres, proaktív,&lt;újratöltés MindenNMinutes&gt;] (#reloadeveryn percek) rendszer az egyes adatkészletek teljes újratöltéséhez, ez az OPTIONAL kiegészítő rendszer reaktív (egy felhasználói kérelem által kiváltott) és gyorsabb, mert növekményes (frissíteni kell az információkat, amelyeket frissíteni kell) ... Például, ha egy kérés egy EDDGrid FromDap adatkészlet több, mint a megadott számú milliszekundum az utolsó frissítés óta, ERDDAP™ látni fogja, hogy vannak-e új értékek a baloldal számára (először, általában "time" ) dimenzió és ha igen, csak töltse le ezeket az új értékeket a felhasználó kérésének kezelése előtt. Ez a rendszer nagyon jó, ha egy gyorsan változó adatállományt naprakészen tartunk, minimális igényekkel az adatforráson, de egy kissé lassítja néhány felhasználói kérelmek feldolgozását.
    * Használja ezt a rendszert, add hozzá (például) :
        ```
        <updateEveryNMillis>1000</updateEveryNMillis>  
        ```
közvetlenül utána&lt;ReloadEveryNMinutes &gt; az adatkészlet címe in datasets.xml ... A megadott milliszekunddok száma olyan kicsi lehet, mint 1 (annak biztosítása érdekében, hogy az adatkészlet mindig naprakész legyen) ... 0 érték (az alapértelmezett) vagy negatív szám kapcsolja ki a rendszert.
    * Növekvő jellegük miatt a frissítéseknek nagyon gyorsan kell befejeződniük, így a felhasználóknak soha nem kell sokáig várniuk.
    * Ha egy második adatkérés érkezik az előző frissítés befejezése előtt, a második kérés nem indít újabb frissítést.
    * A dokumentáció során megpróbáljuk használni a "reload" szót a rendszeres, teljes adatkészlet-visszatöltéshez, és "frissítés" ezeknek az új inkrementális, részleges frissítéseknek.
    * Tesztelési célokra néhány diagnosztikai nyomtatott log.txt ha [&lt;logLevel&gt;] (#loglevel) benne datasets.xml "mindennek".
    * Ha fokozott frissítéseket használ, és különösen, ha a baloldal (először) Például az idő, a tengely nagy, lehet, hogy be akarja állítani&lt;ReloadEveryNMinutes&gt; egy nagyobb számba (1440?) , hogy a frissítések a legtöbb munkát, hogy tartsa az adatkészlet naprakész, és a teljes reloads gyakran.
    * Megjegyzés: ez az új frissítési rendszer frissíti a metaadatot (például az idő actual\\_range idő\\_coverage\\_end, ...) de nem indítja el az onChange-t (e-mail vagy érintés URL) vagy változtassa meg RSS takarmány (Talán...) ...
    * Minden olyan adatkészlet esetében, amely alosztályokat használ [ EDDGrid Fájlok](#eddgridfromfiles) és [EDDTableFromFiles](#eddtablefromfiles) :
        *    **WARNING:** ha új adatfájlot ad hozzá egy adatkészlethez azáltal, hogy a könyvtárba másolja, hogy ERDDAP™ Nézd meg, van egy veszély, hogy ERDDAP™ észreveszi a részben írott fájlt; próbálja meg elolvasni, de nem sikerül, mert a fájl hiányos; kijelenti, hogy a fájl "rossz" fájl lesz, és távolítsa el (átmenetileg) az adatkészletből.
Hogy elkerüljük ezt, mi **STRONGLY RECOMMEND** új fájlt másol a könyvtárba egy ideiglenes névvel (Például, 20150226 .nc Tmp) Ez nem egyezik az adatkészletek fájljával NameRegex (\\* ` .nc ) Ezután nevezze át a fájlt a helyes névre (Például, 20150226 .nc ) ... Ha ezt a megközelítést használja, ERDDAP™ figyelmen kívül hagyja az ideiglenes fájlt, és csak a helyesen megnevezett fájlt veszi észre, amikor teljes és készen áll a használatra.
        * Ha módosítja a meglévő adatokat a helyén (például új adatpont hozzáadása) ,&lt;frissítésEveryNMillis&gt; jól működik, ha a változások atom módon jelennek meg (Egy pillanatban) és a fájl mindig érvényes fájl. Például a netcdf-java könyvtár lehetővé teszi a "klasszikus" korlátlan dimenziójának kiegészítését .nc v3 fájlt atomikusan kell elkészíteni.
            &lt;frissítésEveryNMillis&gt; rosszul fog működni, ha a fájl érvénytelen, míg a változások készülnek.
        *   &lt;A frissítésEveryNMillis&gt; jól működik az adatkészleteknél, ahol egy vagy néhány fájl rövid idő alatt megváltozik.
        *   &lt;frissítésEveryNMillis&gt; rosszul fog működni az adatkészleteknél, ahol rövid idő alatt sok fájl változik (ha a változások atomi módon jelennek meg) ... Ezeknek az adatkészleteknek jobb, ha nem használjuk&lt;frissítésEveryNMillis&gt; és beállítás [zászló](/docs/server-admin/additional-information#set-dataset-flag) Mondd el ERDDAP™ az adatkészlet újratöltéséhez.
        *   &lt;frissítésEveryNMillis&gt; nem frissíti a [[szerkesztés]]] információt&lt; subsetVariables &gt;&gt;&gt;&gt;&gt;&gt; (#subsetvariables) ... Általában ez nem probléma, mert a subsetVariables olyan dolgokról van információ, amelyek gyakran nem változnak (például az állomás nevek, magasságok és hosszúságok listája) ... Ha subsetVariables adatok módosítása (Például, ha egy új állomás hozzáadódik az adatkészlethez) Ezután lépjen kapcsolatba a [zászló URL](/docs/server-admin/additional-information#set-dataset-flag) az adatkészlet számára, hogy elmondja ERDDAP™ az adatkészlet újratöltéséhez. Egyébként, ERDDAP™ Nem fogja észrevenni az új alkatrészt A következő alkalommal, amikor az adatkészletet újratöltik (&lt;ReloadEveryNMinutes&gt;).
        * Generikus ajánlásunk:
        ```
            <reloadEveryNMinutes>1440</reloadEveryNMinutes>  
            <updateEveryNMillis>10000</updateEveryNMillis>
        ```
        * TUDATOK? Linux számítógépeken, ha használja&lt;frissítésEveryNMillis&gt; vele EDDGrid FromFiles vagy EDDTableFromFiles osztályok, láthat egy problémát, ahol egy adatkészlet nem terheli (alkalmanként vagy következetesen) hibaüzenet: "IOException: Az elért vagy túl sok nyílt fájl értesítésének felhasználói korlátozása." Az ok lehet egy hiba Java ami inotifikálja az eseteket, hogy ne gyűjtsenek szemetet. Ezt a problémát elkerülik ERDDAP™ v1.66 és magasabb. Tehát a legjobb megoldás az, hogy váltsa át a legújabb verziót ERDDAP ...
Ha ez nem oldja meg a problémát (azaz, ha van egy nagyon sok adatkészlet használata&lt;frissítésEveryNMillis&gt;, ezt a problémát a hívással tudja megoldani:
            ```
            sudo sysctl fs.inotify.max\\_user\\_watches=65536  
            sudo sysctl fs.inotify.max\\_user\\_instances=1024  
            sudo sysctl -p  
            ```
Vagy használjon magasabb számokat, ha a probléma továbbra is fennáll. Az órák alapértelmezettje 8192. Az esetek alapértelmezettje 128.
    * Megteheted&lt;frissítésMaxEvents&gt;10&lt;/updateMaxEvents&gt; benne datasets.xml   (a többi beállítás a felső közelében) a fájlok maximális számának megváltoztatása (default=10) Ezt feldolgozza a frissítésEveryNMillis rendszer. Egy nagyobb szám hasznos lehet az adatállomány számára, ahol nagyon fontos, hogy mindig naprakészek legyenek. Lásd: [frissítésMaxEvents dokumentáció](#updatemaxevents) ...
    * Curious Programmers - ezek a növekvő frissítések, ellentétben a ERDDAP Teljes [ReloadEveryNMinutes](#reloadeverynminutes) rendszer, a felhasználói kérés szálakon belül fordul elő. Tehát minden adatkészlet egyszerre frissíthető. van kód (és egy zár) annak biztosítása érdekében, hogy egyetlen szál minden adott pillanatban frissítse az adott adatkészletet. Több egyidejű frissítés engedélyezése könnyű volt; lehetővé téve, hogy több egyidejű teljes reload nehezebb lenne.
         
#### &lt;forrásCanConstrainStringEQNE & gt;{#sourcecanconstrainstringeqne} 
* [[szerkesztés]] ** &lt;forrásCanConstrainStringEQNE&gt; ** ] (#sourcecanconstrainstringeqne) egy OPTIONAL tag egy EDDTable-en belül&lt;Dataset&gt; címke datasets.xml ez meghatározza, hogy a forrás képes-e korlátozni a String változókat a = és a &#33;=operátorokkal.
    * Az EDDTableFromDapSequence esetében ez csak a külső sorozatokra vonatkozik. Feltételezzük, hogy a forrás nem tudja kezelni a belső sorozat változói korlátozásokat.
    * Ez a címke OPTIONAL. Az értékek igazak (az alapértelmezett) és hamis.
    * Az EDDTableFromDapSequence OPeNDAP DRDS szervereket kell beállítani, hogy igaz (az alapértelmezett) ...
    * Az EDDTableFromDapSequence Dapper szervereket, ezt hamisnak kell beállítani.
    * Egy példa:
```
        <sourceCanConstrainStringEQNE>true</sourceCanConstrainStringEQNE>  
```
         
#### &lt;forrásCanConstrainStringGTLT & gt;{#sourcecanconstrainstringgtlt} 
* [[szerkesztés]] ** &lt;forrásCanConstrainStringGTLT ** ] (#sourcecanconstrainstringgtlt) egy OPTIONAL tag egy EDDTable-en belül&lt;adatkészlet&gt; címke, amely meghatározza, hogy a forrás képes-e korlátozni a String változókat a&lt;,&lt;=, &gt; és &gt;= üzemeltetők.
    * Az EDDTableFromDapSequence esetében ez csak a külső sorozatokra vonatkozik. Feltételezzük, hogy a forrás nem tudja kezelni a belső sorozat változói korlátozásokat.
    * Valid értékek igazak (az alapértelmezett) és hamis.
    * Ez a címke OPTIONAL. Az alapértelmezettség igaz.
    * Az EDDTableFromDapSequence OPeNDAP DRDS szervereket kell beállítani, hogy igaz (az alapértelmezett) ...
    * Az EDDTableFromDapSequence Dapper szervereket, ezt hamisnak kell beállítani.
    * Egy példa:
```
        <sourceCanConstrainStringGTLT>true</sourceCanConstrainStringGTLT>  
```
         
#### &lt;forrásCanConstrainStringRegex & gt;{#sourcecanconstrainstringregex} 
* [[szerkesztés]] ** &lt;forrásCanConstrainStringRegex&gt; ** ] (#sourcecanconstrainstringregex) egy OPTIONAL tag egy EDDTable-en belül&lt;adatkészlet&gt; címke, amely meghatározza, hogy a forrás a String változókat rendszeres kifejezésekkel korlátozhatja, és ha igen, mi az üzemeltető.
    * Az értékek "=" (a DAP szabvány) ,, ,,, ,,, (tévesen támogatott sok DAP szerverek) vagy "" (jelzi, hogy a forrás nem támogatja a rendszeres kifejezéseket) ...
    * Ez a címke OPTIONAL. Az alapértelmezett „”.
    * Az EDDTableFromDapSequence OPeNDAP DRDS-kiszolgálókat kell beállítani, hogy "" (az alapértelmezett) ...
    * Az EDDTableFromDapSequence Dapper kiszolgálók, ezt ""-re kell beállítani (az alapértelmezett) ...
    * Egy példa:
```
        <sourceCanConstrainStringRegex>=~</sourceCanConstrainStringRegex>  
```
#### &lt;forrásCanDoDistinct & gt;{#sourcecandodistinct} 
* [[szerkesztés]] ** &lt;forrásCanDoDistinct&gt; ** ] (#sourcecandodistinct) egy OPTIONAL tag egy EDDTableFromDatabase&lt;adatkészlet&gt; címke, amely meghatározza, hogy a forrás adatbázisnak kezelnie kell &distinct () korlátozza a felhasználói kérdéseket.
    * Ez a címke OPTIONAL. Az értékek nem ( ERDDAP™ egyedi; az alapértelmezett) , részleges (a forrás kezeli a különbséget és ERDDAP™ újra kezeli) és igen (a forrás kezeli a különbséget) ...
    * Ha nem használ, és ERDDAP™ a memóriából fut, amikor külön kezeljük, használjuk igen.
    * Ha igent használ, és a forrás adatbázis túl lassan kezeli a különbséget, ne használjon.
    * részleges mindkettő közül a legrosszabbat adja: lassú, mert a különböző adatbázis-kezelés lassú, és memóriából futhat ERDDAP ...
    * Az adatbázisok a DISTINCT-t úgy értelmezik, mint csupán egyedi eredmények sorát, míg ERDDAP™ értelmezi azt, mint egy sor egyedi eredmények listáját. Ha ezt részlegesnek vagy igennek állítod, ERDDAP™ automatikusan elmondja az adatbázisnak, hogy rendezze az eredményeket.
    * Egy kis különbség az eredményekben:
Nem | részleges, ERDDAP™ rendezni "" az eredmények elején (előtt nem "" húrok) ...
Igen, az adatbázis lehet (A posztgrák) rendezett "" az eredmények végén (után non-" húrok) ...
Azt hiszem, ez hatással lesz a rövid szavak fajta versus hosszabb szavakra, amelyek a rövid szóval kezdődnek. Például, ERDDAP™ "Simon" fog rendezni a "Simons" előtt.
    * Egy példa:
```
        <sourceCanDoDistinct>yes</sourceCanDoDistinct>  
```
         
#### &lt;forrásCanOrderBy & Gt;{#sourcecanorderby} 
* [[szerkesztés]] ** &lt;forrás CanOrderBy&gt; ** ] (#sourcecanorderby) egy OPTIONAL tag egy EDDTableFromDatabase&lt;adatkészlet&gt; címke, amely meghatározza, hogy a forrás adatbázisnak kezelnie kell & orderBy  (...) korlátozza a felhasználói kérdéseket.
    * Ez a címke OPTIONAL. Az értékek nem ( ERDDAP™ kézzelfogható orderBy  (...) ; az alapértelem) , részleges (a forrás kezeli orderBy és ERDDAP™ újra kezeli) és igen (a forrás kezeli orderBy  (...) ) ...
    * Ha nem használ, és ERDDAP™ a memóriából fut, amikor kezelés orderBy  (...) Használja igen.
    * Ha igent használ, és a forrás adatbázis kezeli orderBy  (...) túl lassan, ne használjon.
    * A részleges mindkettő közül a legrosszabb: lassú, mert az adatbázis kezelése orderBy  (...) lassú, és memóriából futhat ERDDAP ...
    * Egy kis különbség az eredményekben:
Nem | részleges, ERDDAP™ rendezni "" az eredmények elején (előtt nem "" húrok) ...
Igen, az adatbázis lehet (A posztgrák) rendezett "" az eredmények végén (után non-" húrok) ...
Ez befolyásolhatja a rövid szavak fajta versus hosszabb szavakat, amelyek a rövid szóval kezdődnek. Például, ERDDAP™ rendezni fogja a "Simon"-t a "Simons" előtt, de nem vagyok biztos abban, hogy egy adatbázis hogyan rendezi őket.
    * Egy példa:
```
        <sourceCanOrderBy>yes</sourceCanOrderBy>  
```
         
#### &lt;forrásNeedsExpandedFP\\_EQ&gt;{#sourceneedsexpandedfp_eq} 
* [[szerkesztés]] ** &lt;forrásNeedsExpandedFP\\_EQ&gt; ** ] (#sourceneedsexpandedfp_eq) egy OPTIONAL tag egy EDDTable-en belül&lt;adatkészlet&gt; címke, amely meghatározza (Igaz (az alapértelmezett) vagy hamis) ha a forrásnak segítségre van szüksége a kérdésekkel&lt;numerikus Variable&gt;=&lt;FloatingPointValue&gt; (és &#33;=, &gt;=,&lt;=). Például,
    ```
    <sourceNeedsExpandedFP\\_EQ>false</sourceNeedsExpandedFP\\_EQ>
    ```
    * Bizonyos adatforrások esetében numerikus lekérdezések bevonásával =, &#33;=,&lt;=, vagy&gt;= nem működhet úgy, ahogyan az úszópontszámokkal kívánatos. Például a hosszúság keresése = 220.2 kudarcot vallhat, ha az érték 220.20000000001-ként kerül tárolásra.
    * Ez a probléma merül fel, mert az úszópontszámok [nem képviselték pontosan a számítógépeken belül](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) ...
    * Ha a forrásNeedsExpandedFP\\_EQ Az igaz (az alapértelmezett) , ERDDAP™ módosítja az adatforráshoz küldött kérdéseket, hogy elkerülje ezt a problémát. Mindig biztonságos és jó, ha ezt a készletet igazra hagyjuk.
         
#### &lt; sourceUrl Gt;{#sourceurl} 
* [[szerkesztés]] ** &lt; sourceUrl &gt; &gt; &gt; &gt; ** ] (#sourceurl) egy közös címke egy adatkészlet globális&lt; addAttributes &gt; címke, amely meghatározza az URL-t, amely az adatok forrása.
    * Egy példa:
    ```
        <sourceUrl>https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/VH/chla/1day</sourceUrl>  
    ```
         (de tedd az egészet egy sorra) 
    * Inkább ERDDAP™ Minden adatkészletnek van egy " sourceUrl „A kombinált globális tulajdonságokban, melyeket a felhasználóknak mutatnak.
    * A legtöbb adatkészlettípus esetében ez a címke REQUIRED. Lásd az adatkészlet típus leírását, hogy megtudja, hogy ez REQUIRED vagy sem.
    * Néhány adatkészlet esetében a különálló&lt; sourceUrl &gt; címke nem engedélyezett. Ehelyett meg kell adnia egy " sourceUrl "..." [globális tulajdonság](#global-attributes) általában a globális \\&gt; addAttributes &lt;... Ha nincs tényleges forrás URL (például, ha az adatokat helyi fájlokban tárolják) , ez a tulajdonság gyakran csak egy helytulajdonos értéke, például,&lt;att name="name"&gt; (helyi fájlok) &lt;/att&gt;
    * A legtöbb adatkészlet esetében ez az URL alapja, amelyet az adatok kérésére használnak. Például, például DAP szerverek, ez az URL, amelyhez .dods, .das, .dds vagy .html hozzáadható.
    * óta datasets.xml XML fájl, akkor MUST is kódolja '&',&lt;"és "&gt;" az URL-ben, mint '&amp;',&lt;és „és gt;”.
    * A legtöbb adatkészlettípus esetében, ERDDAP™ hozzáadja az eredetit sourceUrl   (a "localSourceUrl" a forráskódban) a [globális tulajdonságok](#global-attributes)   (ahol a "publicSourceUrl" a forráskódban) ... Amikor az adatforrás helyi fájlok, ERDDAP™ Hozzáadás sourceUrl Ó (helyi fájlok) „A globális attribútumok mint biztonsági óvintézkedés. Amikor az adatforrás adatbázis, ERDDAP™ Hozzáadás sourceUrl Ó (forrás adatbázis) „A globális attribútumok mint biztonsági óvintézkedés. Ha néhány adatkészlet nem nyilvános sourceUrl A (általában azért, mert a számítógép a DMZ vagy egy helyi LAN) Használhatja [&lt;átalakításToPublicSourceUrl&gt; (#konverttopublicsourceurl) címkék, hogy meghatározzák, hogyan kell átalakítani a helyi sourceUrl nyilvános sourceUrl S.
    * A sourceUrl Kezdődhet http:// , https:// Ftp: és talán más előtagok. https kapcsolatok olvassa el és ellenőrizze a forrás digitális tanúsítványát annak biztosítása érdekében, hogy a forrás az, akiről azt mondják, hogy azok. Ritka esetekben ez az ellenőrzés kudarcot vallhat a "javax.net.ssl.SSLProtocolException: kézfogás figyelmeztetés: ismeretlen\\_name". Ez valószínűleg annak köszönhető, hogy a domain név a tanúsítványon nem egyezik a domain névvel, amelyet használ. Elolvashatja és el kell olvasnia a részleteket sourceUrl "a tanúsítvány a webböngészőben, nevezetesen a "DNS neve" listája a "Subject Alternative Name" részben.
        
Bizonyos esetekben, sourceUrl Ön használhatja a domain nevet a tanúsítványon. Például,
        https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/dobja ezt a hibát, de
        https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/, amely a domain nevet használja a tanúsítványon, nem. A megoldás ezekben az esetekben tehát megtalálja és használja a domain nevet a tanúsítványon. Ha nem találja meg a tanúsítványt, lépjen kapcsolatba az adatszolgáltatóval.
        
Más esetekben a tanúsítvány domain neve lehet a nevek csoportja. Ha ez megtörténik, vagy a probléma másként megoldhatatlan, kérlek e-mailt Chris. John at noaa.gov, hogy jelentse a problémát.
         

#### &lt;addAttributes&gt; {#addattributes} 
* [[szerkesztés]] ** &lt; addAttributes &gt; &gt; &gt; &gt; ** ] (#addattributes) OPTIONAL címke minden adatkészlet és minden változó, amely lehetővé teszi ERDDAP Az adminisztrátorok ellenőrzik az adathalmazhoz és annak változóihoz kapcsolódó metaadat tulajdonságokat.
    *    ERDDAP™ egyesíti az adatkészlet forrásából származó tulajdonságokat ("sourceAttributes") és a " addAttributes Amit ti definiáltok datasets.xml   (amelyek prioritást élveznek) hogy a "kombinedAttributes", amelyek azok, amelyek ERDDAP™ A felhasználók látják. Így használható addAttributes a forrásAttributes értékeinek újraértékelése, új tulajdonságok hozzáadása vagy a tulajdonságok eltávolítása.
    * A&lt; addAttributes &gt; címke 0 vagy több ** &lt;att&gt; ** altagok, amelyeket az egyes tulajdonságok meghatározására használnak.
    * Minden tulajdonság egy névből és értékből áll (amely konkrét adattípussal rendelkezik, például kettős) ...
    * Csak egy tulajdonság lehet egy adott névvel. Ha több van, az utolsónak van prioritása.
    * Az érték lehet egységes érték vagy egy űrválasztott értékek listája.
    * Syntax
        * A rendje&lt;att&gt; altagok belül addAttributes nem fontos.
        * A&lt;att&gt; subtag formátum
        ```
            <att name="*name*" \\[type="*type*"\\] >*value*</att>
        ```
        * A rendeltetési neve minden tulajdonság MUST kezdődik egy levelet (A-Z, a-z) A MUST csak az A-Z, a-z, 0-9 vagy \\_ karaktereket tartalmazza.
        * Ha egy&lt;att&gt; az altagnak nincs értéke vagy a null értéke, ezt a tulajdonságot eltávolítják a kombinált tulajdonságokból.
Például,&lt;att name="rows" /&gt; eltávolítja a sorokat a kombinált tulajdonságokból.
Például,&lt;att name="koordináták"&lt;/att&gt; eltávolítja a koordinátákat a kombinált tulajdonságokból.
##### tulajdonság típus{#attributetype} 
* [Az OPTIONAL típusú érték&lt;att&gt; altagok] (#attributetype) jelzi az értékek adattípusát. Az alapértelmezett típus String. Egy sztring tulajdonság példája:
    ```
    <att name="creator\\_name">NASA/GSFC OBPG</att>
    ```
    * Az egységes értékek érvényes típusai byte (8 bites integráló) rövid (16 bites aláírt integrál) , Int (32 bites aláírt integrál) Hosszú (64 bites aláírt integrál) Float (32 bites úszópont) dupla (64 bites úszópont) , char és String. Például,
        ```
        <att name="scale\\_factor" type="float">0.1</att>
        ```
Lásd ezeket a jegyzeteket a [char adattípus](#char) ...
Lásd ezeket a jegyzeteket a [hosszú adattípus](#long) ...
        
    * Érvényes típusok az űrválasztott értékek listáihoz (vagy egyedi értékek) byteList, shortList, unsignedShortList, charList, intList, longList, floatList, dupla List. Például,
        ```
        <att name="actual\\_range" type="doubleList">10.34 23.91</att>  
        ```
Egy unsignedShortList lehetővé teszi, hogy megjelölje a le nem írt rövidek listáját, de a megfelelő Unicode karakterek listájába kerülnek (pl.: 65 67 69") átalakul az "A C E"-be.
Ha megadja a charList, kódolja a speciális karakterek (pl., tér, kettős idézetek, backslash,&lt;#32, vagy&gt;#127), ahogy az NCCSV fájl adatszekciójában kódolná őket (pl. ", ", "\"" vagy """", "", "", ",", " \\n ", "\\u20ac") ...
Nincs stringList. Tárolja a String értékeket, mint egy multi-line String. Például,
        ```
        <att name="history">2011-08-05T08:55:02Z ATAM - made CF-1.6 compliant.  
        2012-04-08T08:34:58Z ATAM - Changed 'height' from double to float.</att>  
                ```
                 
#### Globális tulajdonságok{#global-attributes} 
* [[szerkesztés]] ** Globális tulajdonságok / Globális&lt; addAttributes &gt; &gt; &gt; &gt; ** ] (#globális tulajdonságok) -
    &lt; addAttributes &gt; egy OPTIONAL címke belül&lt;adatkészlet&gt; címke, amelyet a teljes adatkészletre alkalmazandó tulajdonságok megváltoztatására használnak.
    
    *    ** Használja a globális&lt; addAttributes &gt; az adatkészlet globális tulajdonságainak megváltoztatása. **  ERDDAP™ egyesíti az adatkészlet forrásából származó globális tulajdonságokat (** Forrás: Forrás **) és a globális**  addAttributes  **amit ti definiáltok datasets.xml   (amelyek prioritást élveznek) hogy a globális** kombinált tulajdonságok ** , amelyek azok, amik ERDDAP™ A felhasználók látják. Így használható addAttributes a forrásAttributes értékeinek újraértékelése, új tulajdonságok hozzáadása vagy a tulajdonságok eltávolítása.
    * Lásd: ** &lt; addAttributes &gt; &gt; &gt; &gt; **információ] (#addattributes) amely a globális és változóra vonatkozik** &lt; addAttributes &gt; &gt; &gt; &gt; ** ...
    *    [FGDC](https://www.fgdc.gov/standards/projects/FGDC-standards-projects/metadata/base-metadata/index_html) és [ISO 19115-2/19139](https://en.wikipedia.org/wiki/Geospatial_metadata) Metadata - Általában, ERDDAP™ automatikusan létrehozza az ISO 19115-2/19139 és az FGDC (FGDC-STD-001-1998) XML metaadat fájlok minden adatkészlethez az adatkészlet metaadatából származó információk felhasználásával. Szóval, **a jó adatkészlet metaadata jóhoz vezet ERDDAP - generált ISO 19115 és FGDC metaadata. Kérjük, vegye fontolóra, hogy sok időt és erőfeszítést tegyen az adatkészletek metaadatának javítására (ami egy jó dolog, amit egyébként csinálni kell) ...** Az ISO 19115 és az FGDC metadata generálásához használt adatkészletek többsége az [ACDD metaadat standard](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) alább megjegyezve.
    * Számos globális tulajdonság különleges ebben ERDDAP™ keresi őket, és különböző módon használja őket. Például egy link a infoUrl a weboldalakon szerepel az adatkészletek listáival és más helyekkel, hogy a felhasználók többet tudhassanak meg az adatkészletről.
    * Amikor egy felhasználó kiválaszt egy adathalmazt, a változó hosszúságával, szélességgel, magassággal kapcsolatos GlobalAttributes (vagy mélység) , és az időtartományok (például Southernmost\\_Northing, Northernmost\\_Northing, time\\_coverage\\_start, idő\\_coverage\\_end) automatikusan generált vagy frissített.
    * Egy egyszerű minta globális&lt; addAttributes &gt; az:
        ```
        <addAttributes> 
          <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>
          <att name="infoUrl">https://coastwatch.pfeg.noaa.gov/infog/PH\\_ssta\\_las.html</att>
          <att name="institution">NOAA CoastWatch, West Coast Node</att>
          <att name="title">SST, Pathfinder Ver 5.0, Day and Night, Global</att>
          <att name="cwhdf\\_version" />
        </addAttributes>  
        ```
Az üres cwhdf\\_version tulajdonsága okozza a forrás cwhdf\\_version tulajdonságát (ha valaki) eltávolítani a végső, kombinált tulajdonságok listájáról.
    * Ezen információk ellátása segít ERDDAP™ jobb munkát végezzen, és segít a felhasználóknak megérteni az adatkészleteket.
A jó metaadata felhasználható adatkészletet készít.
Az elégtelen metaadata haszontalanná teszi az adatkészletet.
Kérjük, vegye be az időt, hogy jó munkát végezzen a metaadat tulajdonságokkal.
##### Különleges globális tulajdonságok a ERDDAP™ 
###### elismerés{#acknowledgement} 
*    [ **elismerés** ](#acknowledgement) és **elismerés**   (a [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabvány) a támogatott csoport vagy csoportok elismerésének módja (nevezetesen pénzügyi) a projekt, amely létrehozta ezt az adatokat. Például,
    ```
    <att name="acknowledgment">AVISO</att>
    ```    
Vegye figyelembe, hogy az ACDD 1.0 és 1.1 használta a "ismerés" varázslatát (amely a szokásos varázslat az Egyesült Államokban) , de az ACDD 1.3 megváltoztatta ezt a "felhasználást" (ami a szokásos varázslat az Egyesült Királyságban.) ... A megértésem az, hogy a változás lényegében baleset volt, és minden bizonnyal nem ismerték fel a változás ramifikációit. Micsoda rendetlenség&#33; Most már több millió adatfájl van szerte a világon, amelyek "ismétlődéssel" rendelkeznek és milliók, amelyek "felhasználással" rendelkeznek. Ez kiemeli a szabványos "egyszerű" változásokat, és hangsúlyozza a stabilitás szükségességét. Mert az ACDD 1.3 (amely az ACDD verziója, ERDDAP™ támogatás) azt mondja: "ismeret", ez az, ami ERDDAP™   (nevezetesen GenerateDatasets Xml) bátorítás.
     
###### cdm\\_altitude\\_proxy{#cdm_altitude_proxy} 
*    [ **cdm\\_altitude\\_proxy** ](#cdm_altitude_proxy) csak az EDDTable adatkészletek esetében, amelyeknek nincs magassága vagy mélysége változó, de van egy változó, amely a magasság vagy a mélység proxyja. (Például a nyomás, a sigma, a palackNumber) Használhatja ezt a tulajdonságot, hogy azonosítsa ezt a változót. Például,
    ```
    <att name="cdm\\_altitude\\_proxy">pressure</att>  
    ```
Ha [cdm\\_data\\_type](#cdm_data_type) Profil vagy TrajectoryProfil, és nincs magasság vagy mélység változó, cdm\\_altitude\\_proxy MUST definiálva. Ha a cdm\\_altitude\\_proxy-t meghatározzák, ERDDAP™ hozzáadja a következő metaadatot a változóhoz: \\_koordináta AxisType=Height and axis=Z.
     
###### cdm\\_data\\_type{#cdm_data_type} 
*    [ **cdm\\_data\\_type** ](#cdm_data_type)   (a [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabvány) egy globális tulajdonság, amely jelzi Unidata   [Közös adatmodell](https://www.unidata.ucar.edu/software/netcdf-java/v4.6/CDM/index.html) adattípus az adatkészlethez. Például,
    ```
    <att name="cdm\\_data\\_type">Point</att>  
    ```
A CDM még mindig fejlődik, és ismét megváltozhat. ERDDAP™ megfelel a kapcsolódó és részletesebb [Discrete Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) fejezete [CF 1.6](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) metadatai egyezmények (korábban CF Point megfigyelési egyezményeknek nevezték) ...
    * Vagy az adatkészlet globális [Forrás: Forrás](#global-attributes) vagy globális&lt; addAttributes &gt; &gt; &gt; &gt; A MUST tartalmazza a cdm\\_data\\_type tulajdonságát. Néhány adatkészlettípus (mint az EDDTable FromObis) ezt automatikusan beállítja.
    * Mert EDDGrid adatkészletek, a cdm\\_data\\_type opciók Grid (az alapértelmezett és messze a leggyakoribb típus EDDGrid adatkészletek) MovingGrid, Egyéb, Pont, Profil, RadialSweep, TimeSeries, TimeSeriesProfile, Swath, Trajectory és TrajectoryProfile. Jelenleg, EDDGrid nem követeli meg, hogy minden kapcsolódó metaadatot meg kell határozni, és nem ellenőrzi, hogy az adatok megfelelnek a cdm\\_data\\_type-nek. Ez valószínűleg megváltozik a közeljövőben.
    * Az EDDTable a cdm\\_data\\_type-t szigorúan használja, a CF DSG specifikációját követően, nem pedig a CDM-nél, ami valamilyen oknál fogva nem frissítették a DSG-vel való következetességet. Ha egy adatkészlet metaadata nem felel meg ERDDAP cdm\\_data\\_type követelményei (lásd alább) Az adatkészlet nem fog betölteni, és generálni fog [hibaüzenet](#troubleshooting-tips) ... (Ez egy jó dolog, abban az értelemben, hogy a hibaüzenet megmondja, mi rossz, hogy meg tudja oldani.) És ha az adatkészlet adatai nem felelnek meg az adatkészlet metaadatkészletének (pl. ha egy adott állomás több mint egy szélességi értéke van egy időmérő adatkészletben) Az adatok egyes kérései helytelen adatokat fognak visszaküldeni a válaszban. Tehát győződjön meg róla, hogy megkapja ezt a jogot.
        
Mindezen adatkészletek esetében az Egyezményekben és Metadata\\_Conventions globális tulajdonságok, kérjük, utaljon a CF-1.6-ra (nem CF-1.0, 1.1, 1.2, 1.3, 1.4 vagy 1.5) Mivel a CF-1.6 az első verzió, amely tartalmazza a Discrete Sampling Geometryhez kapcsolódó változásokat (DSG) egyezmények.
        *   ** ERDDAP™ egy nem egyszerű kapcsolat a CF DSG** 
        *    ERDDAP™ érvényes DSG adatkészletet készíthet egy olyan forrásadatból, amely már érvényes DSG fájl (s) vagy egy olyan forrásadatból, amelyet nem hoznak létre a DSG-hez, de a metaadata változásain keresztül megtehető (amelyek közül néhány ERDDAP -specifikus annak érdekében, hogy általánosabb megközelítést biztosítson a DSG beállításának meghatározása érdekében) ...
        *    ERDDAP™ sok érvényességi tesztet végez, amikor adatkészletet tölt be. Ha a cdm\\_data\\_type adatkészlet (vagy featureType ) a sikeresen betöltött terhek tulajdonítására ERDDAP™ Aztán ERDDAP™ azt mondja, hogy az adatkészlet megfelel a DSG követelményeinek (egyébként, ERDDAP™ kivételt fog dobni, amely elmagyarázza az első problémát, amit talált) ...
WARNING: A sikeresen betöltött adatkészlet úgy tűnik, hogy megfelel a DSG követelményeinek (a tulajdonságok megfelelő kombinációjával rendelkezik) De még mindig helytelenül felállítható, ami helytelen eredményeket eredményez .nc CF és .nc CFMA válaszfájlok. (A szoftver bizonyos módon okos és kényelmetlen másokban.) 
        * Ha megnézzük az adatkészlet metaadatát ERDDAP™ A DSG adatkészlete úgy tűnik, hogy ERDDAP Belső formátum (hatalmas, adatbázisszerű asztal) ... Ez nem az egyik DSG formátumban van (pl. a dimenziók és a metaadatok nem helyesek) , de az adatkészlet DSG adatkészletként történő kezeléséhez szükséges információ a metadatában van (például cdm\\_data\\_type=TimeSeries és cdm\\_timeseries\\_variables= *aCsvListOfStationRelatedVarables* a globális metaadat és cf\\_role=timeseries\\_id néhány változó) ...
        * Ha egy felhasználó kéri az adatkészlet egy részét egy .nc CF (egy .nc fájl a DSG Contiguous Ragged Array fájlformátumában) vagy .nc CFMA fájl (egy .nc fájl DSG Multidimenzionális Array fájl formátumban) Ez a fájl érvényes CF DSG fájl lesz.
FIGYELEM: Ha azonban az adatkészlet helytelenül alakult ki (hogy a metadata által tett ígéretek nem igazak) Ezután a válaszfájl technikailag érvényes lesz, de valamilyen módon helytelen lesz.
             
###### EDDTable cdm_data_types
* Az EDDTable adatkészletek esetében a cdm\\_data\\_type opciók (kapcsolódó követelmények ERDDAP ) vannak
###### Pont{#point} 
*    [Pont](#point) - egy sor mérés nem kapcsolódó időpontokban és helyeken.
    * Mint minden más cdm\\_data\\_types más, mint más, a Point adatkészletek MUST-nak hosszúsága, szélessége és az idő változói vannak.
###### Profil{#profile} 
*    [Profil](#profile) - egy sor mérés, amelyet egy időben, egy magasságú hosszúságú helyen végeznek, de több mint egy mélységben (vagy magasság) ... Az adatkészlet lehet ilyen profilok gyűjteménye, például 7 profil különböző helyekről. Ez a cdm\\_data\\_type nem jelent semmilyen logikai kapcsolatot a profilok között.
    
* Az egyik változó (például profil\\_number) MUST van a változó tulajdonsága cf\\_role=profil\\_id azonosítani a változó, amely egyedülállóan azonosítja a profilokat.
    ```
    <att name="cf\\_role">profile\\_id</att>  
    ```
Ha nincs más változó, fontolja meg az idő változó használatát.
###### cdm\\_profil\\_variables{#cdm_profile_variables} 
* Az adatkészlet MUST tartalmazza a GlobalAttribute [cdm\\_profil\\_variables](#cdm_profile_variables) , ahol az érték egy képregény-elválasztott lista a változókról, amelyek az egyes profilokra vonatkozó információkat tartalmazzák. Egy adott profil esetében ezeknek a változóknak az értéke állandó. Például,
    ```
    <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
    ```
Az MUST lista tartalmazza a cf\\_role=profil\\_id változót és az összes többi változót a profilról, az időről, a szélességről és a hosszúságról.
A lista soha nem tartalmaz magasságot, mélységet vagy bármilyen megfigyelési változót.
     

 \\[ Vélemény: cdm\\_data\\_type=Profilt ritkán kell használni. A gyakorlatban egy adott adatkészlet általában vagy a TimeSeriesProfile (profilok egy fix pozícióban) vagy TrajectoryProfil (profilok egy trajectory mentén) és így kell megfelelően azonosítani, mint ilyen. \\]   
###### Idősorozat{#timeseries} 
*    [Idősorozat](#timeseries) - a mérések sorozata (pl. tengervíz hőmérséklet) egy, rögzített, magasság, hosszúság, mélység (vagy magasság) hely. (Gondolj úgy, mint "állomás".) Az adatkészlet ezeknek a TimeSeriesnek a gyűjteménye lehet, például három különböző helyszínből származó sorozat.
    * Az egyik változó (például állomás\\_id) MUST van a változó tulajdonsága cf\\_role=timeseries\\_id azonosítani a változó, amely egyedülállóan azonosítja az állomásokat.
        ```
        <att name="cf\\_role">timeseries\\_id</att>
        ```
###### cdm\\_timeseries\\_ változók{#cdm_timeseries_variables} 
* Az adatkészlet MUST tartalmazza a GlobalAttribute [cdm\\_timeseries\\_ változók](#cdm_timeseries_variables) , ahol az érték egy képregény-elválasztott lista a változókról, amelyek minden állomásról információt kapnak. Egy adott állomás esetében ezeknek a változóknak az értéke állandó. Például,
    ```
    <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
    ```
A lista MUST tartalmazza a cf\\_role=timeseries\\_id változó és az összes többi változó információt az állomásról, amely szinte mindig tartalmazza a magasság és a hosszúság (magasság vagy mélység, ha jelen van) ...
A lista soha nem tartalmaz időt vagy bármilyen megfigyelési változót.
* Egyes moored buoys esetében egy adatkészlet két szélességi és hosszúsági változóval rendelkezik:
    1. Egy pár magassági és hosszúsági értékek, amelyek állandóak (azaz a moorálás fix helye) ... Inkább ERDDAP™ Adja meg ezeket a változókat destinationName s a szélesség és a hosszúság, és tartalmazza ezeket a változókat a lista cdm\\_timeseries\\_variables.
    2. Az egyes megfigyelésekhez kapcsolódó pontos magassági és hosszúsági értékek. Inkább ERDDAP™ Adja meg ezeket a változókat különböző destinationName s (pl. precíz és precíz Lon) és ne tartalmazza ezeket a változókat a cdm\\_timeseries\\_variables listáján.
Ennek oka: elméleti szempontból egy DSG TimeSeries adatkészlet, a magasság és a hosszúság (magasság vagy mélység, ha jelen van) az MUST állomás helye állandó.
###### TimeSeriesProfil{#timeseriesprofile} 
*    [TimeSeriesProfil](#timeseriesprofile) - az egyik, rögzített, magasságbeli elhelyezkedésű profilok sorozata. Minden profil egy sor mérést több magasságban vagy mélységben. Az adatkészlet lehet ilyen TimeSeriesProfiles gyűjteménye, például a 12 különböző helyszínen vett profilok sorozata.
    * Az egyik változó (például állomás\\_id) MUST van a változó tulajdonsága cf\\_role=timeseries\\_id azonosítani a változó, amely egyedülállóan azonosítja az állomásokat.
    ```
        <att name="cf\\_role">timeseries\\_id</att>
    ```
    * Az egyik változó (például profil\\_number) MUST van a változó tulajdonsága cf\\_role=profil\\_id azonosítani a változó, amely egyedülállóan azonosítja a profilokat.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Egy adott profil\\_id csak egyedinek kell lennie egy adott időzített\\_id számára.) Ha nincs más változó, fontolja meg az idő változó használatát.
    * Az adatkészlet MUST magában foglalja a GlobalAttribute cdm\\_timeseries\\_variables, ahol az érték egy koma-választott lista a változók, amelyek az egyes állomások. Egy adott állomás esetében ezeknek a változóknak az értéke állandó. Például,
        ```
        <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
        ```
A lista MUST tartalmazza a cf\\_role=timeseries\\_id változó és az összes többi változó információval az állomásról, amely szinte mindig tartalmazza a magasság és a hosszúság.
A lista soha nem tartalmazza az időt, a magasságot, a mélységet vagy bármilyen megfigyelési változót.
    * Az adatkészlet MUST magában foglalja a GlobalAttribute cdm\\_profile\\_variables, ahol az érték egy koma-választott lista a változók, amelyek az egyes profilok. Egy adott profil esetében ezeknek a változóknak az értéke állandó. Például,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time</att>
        ```
A lista MUST tartalmazza a cf\\_role=profil\\_id változó és az összes többi változó információval a profil, amely szinte mindig tartalmazza az időt.
A lista soha nem tartalmaz szélességet, hosszúságot, magasságot, mélységet vagy bármilyen megfigyelési változót.
###### Trajektor{#trajectory} 
*    [Trajektor](#trajectory) - az áruló mentén mérések sorozata (egy út a téren és az időn keresztül)   (pl. a tenger\\_water\\_temperature által szállított hajó, mivel a vízen keresztül mozog) ... Az adatkészlet ezeknek a trajektoroknak a gyűjteménye lehet, például 4 különböző hajóból származó sorozat.
    * Az egyik változó (például a hajó \\_id) A MUST rendelkezik a Cf\\_role=trajectory\\_id tulajdonságával, hogy azonosítsa a változót, amely egyedülállóan azonosítja a traktorokat.
        ```  
        <att name="cf\\_role">trajectory\\_id</att>
        ```
###### cdm\\_trajectory\\_variables{#cdm_trajectory_variables} 
* Az adatkészlet MUST tartalmazza a GlobalAttribute [cdm\\_trajectory\\_variables](#cdm_trajectory_variables) , ahol az érték egy képregény-elválasztott lista a változókról, amelyek mindegyik pályáról információt kapnak. Egy adott pályára ezeknek a változóknak az értékei állandóak lehetnek. Például,
    ```
    <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
    ```
Az MUST lista tartalmazza a cf\\_role=trajectory\\_id változót és az összes többi változót az árucikkekről.
A lista soha nem tartalmazza az időt, a szélességet, a hosszúságot vagy bármilyen megfigyelési változót.
###### TrajectoryProfil{#trajectoryprofile} 
*    [TrajectoryProfil](#trajectoryprofile) - a pályán vett profilok sorozata. Az adatkészlet ezeknek a TrajectoryProfiloknak a gyűjteménye lehet, például 14 különböző hajó által készített profilsorozat.
    * Az egyik változó (például a hajó \\_id) MUST van a változó tulajdonsága cf\\_role=trajectory\\_id azonosítani a változó, amely egyedülállóan azonosítja a traktorok.
        ``` 
        <att name="cf\\_role">trajectory\\_id</att>
        ```
    * Az egyik változó (például profil\\_number) MUST van a változó tulajdonsága cf\\_role=profil\\_id azonosítani a változó, amely egyedülállóan azonosítja a profilokat.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Egy adott profil\\_idnek csak egy adott pályára kell egyedinek lennie.) Ha nincs más változó, fontolja meg az idő változó használatát.
    * Az adatkészlet MUST magában foglalja a GlobalAttribute cdm\\_trajectory\\_variables, ahol az érték egy koma-választott lista a változók, amelyek az információt az egyes áruk. Egy adott pályára ezeknek a változóknak az értékei állandóak lehetnek. Például,
        ```
        <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
        ```
Az MUST lista tartalmazza a cf\\_role=trajectory\\_id változót és az összes többi változót az árucikkekről.
A lista soha nem tartalmaz profilhoz kapcsolódó változókat, időt, magasságot, hosszúságot vagy bármilyen megfigyelési változót.
    * Az adatkészlet MUST magában foglalja a GlobalAttribute cdm\\_profile\\_variables, ahol az érték egy koma-választott lista a változók, amelyek az egyes profilok. Egy adott profil esetében ezeknek a változóknak az értéke állandó. Például,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
        ```
A lista MUST tartalmazza a cf\\_role=profil\\_id változó és az összes többi változó információval a profil, amely szinte mindig tartalmazza az idő, a szélesség és a hosszúság.
A lista soha nem tartalmaz magasságot, mélységet vagy bármilyen megfigyelési változót.
###### Egyéb{#other} 
*    [Egyéb](#other) - nincs követelménye. Használja, ha az adatkészlet nem illeszkedik az egyik másik lehetőséghez, nevezetesen, ha az adatkészlet nem tartalmazza a szélességet, a hosszúságot és az idő változókat.
     
###### Kapcsolódó megjegyzések{#related-notes} 
* Minden EDDTable adatkészlet egy cdm\\_data\\_type más, mint "Egy másik" MUST van hosszúság, szélesség és az idő változók.
* Az MUST profilokkal rendelkező adatkészletek magasságbeli változó, mélységváltozékony vagy [cdm\\_altitude\\_proxy](#cdm_altitude_proxy) változó.
* Ha nem tudja, hogy egy adatkészlet megfeleljen az összes követelmény az ideális cdm\\_data\\_type, használja a "Point" (amelyeknek kevés követelménye van) Vagy "másik" (amelyeknek nincs követelménye) Ehelyett.
* Ezt az információt használják ERDDAP™ különböző módon, például, de többnyire a készítéshez .nc CF fájlok ( .nc olyan fájlok, amelyek megfelelnek az adatkészlet cdm\\_data\\_type-jéhez kapcsolódó kontigurált Array reprezentációknak) és .nc CFMA fájlok ( .nc olyan fájlok, amelyek megfelelnek az adatkészlet cdm\\_data\\_type társult többdimenziós Array képviselőinek) mint ahogyan azt meghatározták [Discrete Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) fejezete [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) metadatai egyezmények, amelyeket korábban „CF Point Megfigyelési Egyezményeknek” neveztek.
* Hint: Ezeknek az adatoknak a megfelelő beállítása [ subsetVariables ](#subsetvariables) általában a cdm\\_...\\_variables tulajdonságaiban felsorolt összes változó kombinációja. Például a TimeSeriesProfile, használja a cdm\\_timeseries\\_variables plusz a cdm\\_profil\\_variables.
######  contributor\\_name  {#contributor_name} 
*    [ ** contributor\\_name ** ](#contributor_name)   (a [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabvány) a TÁMOGATÓ módja annak, hogy azonosítsunk egy olyan személyt, szervezetet vagy projektet, amely hozzájárult az adatkészlethez (például az adatok eredeti alkotója, mielőtt az adatkészlet létrehozója újra feldolgozta volna.) ... Például,
    ```
        <att name="contributor\\_name">NOAA OceanWatch - Central Pacific</att>  
    ```
Ha a "közreműködő" nem igazán vonatkozik egy adatkészletre, hagyja ki ezt a tulajdonságot. Összehasonlítás [ creator\\_name ](#creator_name) Ez néha inkább a finanszírozási forrásra összpontosít.
######  contributor\\_role  {#contributor_role} 
*    [ ** contributor\\_role ** ](#contributor_role)   (a [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabvány) AZ ELŐTTT módja annak, hogy azonosítsa a szerepét [ contributor\\_name ](#creator_name) ... Például,
    ```
        <att name="contributor\\_role">Source of Level 2b data</att>  
    ```
Ha a "közreműködő" nem igazán vonatkozik egy adatkészletre, hagyja ki ezt a tulajdonságot.
###### Egyezmények{#conventions} 
*    [ **Egyezmények** ](#conventions)   (a [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) metadata szabvány) STRONGLY RECOMMENDED. (KÉRDÉS lehet a jövőben.) Az érték a metaadat-szabványok kombinációválasztott listája, amelyet ez az adatkészlet követ. Például:
    ```
    <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
    ```
A közös metaadat-konvenciók, amelyeket a ERDDAP™ a következők:
    
    *    [ COARDS Egyezmények](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) a CF prekurzora.
    *    [Éghajlat és előrejelzés (CF) Egyezmények](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) az ajánlott és megkövetelt tulajdonságok sok forrása ERDDAP ... A CF jelenlegi verzióját "CF-1.6"-nak nevezik.
    * A NetCDF Attribute Convention for Dataset Discovery (ACDD) az ajánlott és megkövetelt tulajdonságok sok forrása ERDDAP ... Az ACDD eredeti 1.0 verziója (ragyogó munka Ethan Davis) , azonosították, mint [ Unidata Dataset Discovery v1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1) A jelenlegi (Kezdés 2015-ben) Az ACDD 1.3 verzióját azonosítják [ACDD-1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) ... Ha az adatkészleteit használták Unidata Dataset Discovery v1.0, bátorítjuk Önt, hogy [kapcsolja ki az adatkészleteket az ACDD-1.3 használatára](#switch-to-acdd-13) ...
    
Ha az adatkészlete további metaadat-szabványt követ, kérjük, adja hozzá a CSV listáját az Egyezményekben.
######  coverage\\_content\\_type  {#coverage_content_type} 
*    [ ** coverage\\_content\\_type ** ](#coverage_content_type)   (a [ISO 19115](https://en.wikipedia.org/wiki/Geospatial_metadata) metadata szabvány) a RECOMMENDED mód a rácsos adatok típusának azonosítására (benne EDDGrid adatkészletek) ... Például,
    ```
    <att name="coverage\\_content\\_type">modelResult</att>  
    ```
Az egyetlen megengedett értékek segéd információ, kép, modellResult, fizikai Mérés (az alapértelmezett, amikor az ISO 19115 metaadatot generálják) minőséginformáció, referenciainformáció és tematikus osztályozás. (Ne használja ezt a címkét az EDDTable adatkészletekhez.)   
######  creator\\_name  {#creator_name} 
*    [ ** creator\\_name ** ](#creator_name)   (a [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabvány) az ELŐTTT mód a személy azonosítására, szervezetre vagy projektre (ha nem egy adott személy vagy szervezet) A legtöbb felelős a teremtésért (vagy legutóbbi újrafeldolgozás) ezen adatokból. Például,
    ```
    <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
    ```
Ha az adatok széles körben újrafeldolgozásra kerültek (például a 2. szinttől a 3. vagy 4. szintig terjedő műholdas adatok) , akkor általában a reprocesszor szerepel, mint a Teremtő, és az eredeti alkotó szerepel [ contributor\\_name ](#contributor_name) ... Összehasonlítás [projekt](#project) Ez rugalmasabb, mivel azonosíthat egy személyt, egy szervezetet vagy egy projektet.
######  creator\\_email  {#creator_email} 
*    [ ** creator\\_email ** ](#creator_email)   (a [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabvány) az E-mail cím azonosításának módja (helyesen formázott) ez egy módja annak, hogy kapcsolatba lépjen a Teremtővel. Például,
    ```
    <att name="creator\\_email">erd.data@noaa.gov</att>  
    ```
######  creator\\_url  {#creator_url} 
*    [ ** creator\\_url ** ](#creator_url)   (a [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabvány) a RECOMMENDED módja annak, hogy azonosítsa az URL-t olyan szervezet számára, amely létrehozta az adatkészletet, vagy egy URL-t az alkotó információjával az adatkészletről (de ez inkább a cél [ infoUrl ](#infourl) ) ... Például,
    ```
    <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
    ```
######  date\\_created  {#date_created} 
*    [ ** date\\_created ** ](#date_created)   (a [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabvány) a TÁMOGATÓ módja annak, hogy azonosítsa azt a dátumot, amikor az adatokat először hozták létre (például feldolgozva ebbe a formába) ISO 8601 formátumban. Például,
    ```
    <att name="date\\_created">2010-01-30</att>  
    ```
Ha az adatok rendszeresen hozzáadódik az adatkészlethez, ez az első dátum, amelyet az eredeti adatok elérhetők.
######  date\\_modified  {#date_modified} 
*    [ ** date\\_modified ** ](#date_modified)   (a [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabvány) a TISZTETT módja annak, hogy azonosítsa azt a dátumot, amelyen az adatok legutóbbi módosításra kerültek (például, amikor hiba történt, vagy amikor a legfrissebb adatokat hozzáadták) ISO 8601 formátumban. Például,
    ```
    <att name="date\\_modified">2012-03-15</att>  
    ```
######  date\\_issued  {#date_issued} 
*    [ ** date\\_issued ** ](#date_issued)   (a [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabvány) a RECOMMENDED módja annak, hogy azonosítsuk azt a dátumot, amelyen az adatokat először elérhetővé tették mások számára, például 2012-03-15 formátumban. Például,
    ```
    <att name="date\\_issued">2010-07-30</att>  
    ```
Például az adatkészletnek lehet egy [ date\\_created ](#date_created) 2010-01-30, de csak nyilvánosan elérhető 2010-07-30. date\\_issued kevésbé használják, mint date\\_created és date\\_modified ... Ha date\\_issued kihagyott, azt feltételezik, hogy ugyanaz, mint a date\\_created ...
###### globális drawLandMask  {#global-drawlandmask} 
*    [ ** drawLandMask ** ](#global-drawlandmask) - Ez egy OPTIONAL globális tulajdonság, amelyet a ERDDAP™   (és nem metadata szabványok) amely meghatározza a "Draw Land Mask" alapértelmezett értéket az adatkészlet Make A Graph formanyomtatványán ( * datasetID * .gráf) és a &.land paraméter egy URL-ben, amely az adatok térképét kéri. Például,
    ```
    <att name="drawLandMask">over</att>  
    ```
Lásd: [ drawLandMask Áttekintés](#drawlandmask) ...
######  featureType  {#featuretype} 
*    [ ** featureType ** ](#featuretype)   (a [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) metadata szabvány) IGNORED és/vagy REPLACED. Ha az adatkészlet [cdm\\_data\\_type](#cdm_data_type) megfelelő, ERDDAP™ automatikusan használja, hogy létrehozzon egy featureType tulajdonság. Tehát nincs szükség arra, hogy hozzáadd.
    
Ha azonban használja [EDDTableFromNcCFFiles](#eddtablefromnccffiles) egy adatkészlet létrehozása olyan fájlokból, amelyek követik a [CF Discrete Sampling Geometries (DSG) szabvány](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) A fájloknak maguknak kell lennie featureType helyesen meghatározott, hogy ERDDAP™ helyesen olvashatja a fájlokat. Ez része az ilyen típusú fájl CF DSG követelményeinek.
     
###### történelem{#history} 
*    [ **történelem** ](#history)   (a [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) és [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabványok) egy RECOMMENDED multi-line String globális tulajdonsága minden feldolgozási lépésnek, amelyet az adatok áthaladtak. Például,
    ```
    <att name="history">2011-08-05T08:55:02Z CMOR: Rewrote data to comply with CF standards.  
    2012-04-08T08:34:58Z CMOR: Converted 'height' type from 'd' to 'f'.</att>
    ```
    * Ideális esetben minden sornak van ISO 8601:2004 (EZ) formázott dátum +timeZ (Például 2011-08-05T08:55:02Z) a feldolgozási lépés leírása követte.
    *    ERDDAP™ létrehozza ezt, ha már nem létezik.
    * Ha már létezik, ERDDAP™ új információkat küld a meglévő információkhoz.
    * A történelem azért fontos, mert lehetővé teszi az ügyfelek számára, hogy visszalépjenek az adatok eredeti forrásához.
######  infoUrl  {#infourl} 
*    [ ** infoUrl ** ](#infourl) REQUIRED globális tulajdonsága egy weboldal URL-jének, amely több információval rendelkezik az adatkészletről (általában a forrás intézmény honlapján) ... Például,
    ```
    <att name="infoUrl">http://www.globec.org/</att>
    ```
    * Vagy az adatkészlet globális [Forrás: Forrás](#global-attributes) vagy globális&lt; addAttributes &gt; &gt; &gt; &gt; A MUST ezt a tulajdonságot tartalmazza.
    *    infoUrl Fontos, mert lehetővé teszi az ügyfelek számára, hogy többet megtudjanak az eredeti forrásból származó adatokról.
    *    ERDDAP™ linket jelenít meg a infoUrl az adatkészlet adathozzáférési formája ( * datasetID * .html) Make A Graph weboldal ( * datasetID * .gráf) és más weboldalak.
    * Ha az URL-nek van egy lekérdező része (utána a "?") MIÉRT már [százalék kódolva](https://en.wikipedia.org/wiki/Percent-encoding) ... Különleges karaktereket kell kódolni a korlátozásokban (a kezdeti „és” és a fő '=' ha van) a %H formában, ahol a HH a karakter két számjegyű hexadecimális értéke. Általában csak néhány punctuációs karaktert kell átalakítania: %-25, és %26, "- %22,&lt;%3C, = %3D, &gt; %3E, + %2B, | %7C, \\[ %5B, \\] %5D, tér %20, és átalakítani minden karakter felett #127 a saját UTF-8 formában, majd százaléka kódolja minden byte az UTF-8 formában a %HH formátum (kérjen programozót segítségért) ...
Például, & stationID &gt;="41004"
Beszéd és stationID %3E=%2241004%22
A százalékos kódolás általában akkor szükséges, ha hozzáfér ERDDAP szoftveren keresztül, mint egy böngésző. A böngészők általában kezelik a százalékos kódolást az Ön számára.
Bizonyos helyzetekben százalékban kell kódolni az A-Za-z0-9\\_-től eltérő összes karaktert&#33; "..." () \\*, de még mindig nem kódolja az eredeti '&' vagy a fő '=' ...
A programozási nyelveknek van eszközük erre (például lásd Java A [ java.net.URLEncoder ](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)   
és Java Olvasson bele a(z)encodeURIComponent()] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) ) és vannak
         [olyan webhelyek, amelyek százalékos kódot / dekódot mutatnak Önnek](https://www.url-encode-decode.com/) ...
    * óta datasets.xml XML fájl, akkor is &-encode ALL ' &',&lt;"és "&gt;" az URL-ben, mint '&amp;',&lt;és a „&gt;” százalékos kódolás után.
    *    infoUrl egyedi ERDDAP ... Ez nem bármilyen metaadat szabványból származik.
###### intézmény{#institution} 
*    [ **intézmény** ](#institution)   (a [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) és [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabványok) REQUIRED globális tulajdonság az intézmény neve rövid változatával, amely az adatok forrása (általában akronym, általában&lt;20 karakter). Például,
    ```
    <att name="institution">NASA GSFC</att>
    ```
    * Vagy az adatkészlet globális [Forrás: Forrás](#global-attributes) vagy globális&lt; addAttributes &gt; &gt; &gt; &gt; A MUST ezt a tulajdonságot tartalmazza.
    *    ERDDAP™ megjeleníti az intézményt, amikor az adatkészletek listáját jeleníti meg. Ha itt egy intézmény neve hosszabb, mint 20 karakter, csak az első 20 karakter látható lesz az adatkészletek listáján (De az egész intézmény látható az egérkurzor elhelyezésével a szomszédos "?" ikononon) ...
    * Ha intézményt ad hozzá a listához&lt; categoryAttributes &gt; &gt; &gt; &gt; benne ERDDAP A [setup.xml](/docs/server-admin/deploy-install#setupxml) fájl, a felhasználók könnyen megtalálhatják az azonos intézményből származó adatkészleteket ERDDAP "Search for Datasets by Kategória" a honlapon.
###### kulcsszavak{#keywords} 
*    [ **kulcsszavak** ](#keywords)   (a [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabvány) egy RECOMMENDED Comma-elválasztott lista a szavakról és rövid kifejezésekről (például, [GCMD Tudományos kulcsszavak](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Access) ) általánosan leírja az adatkészletet, és nem feltételezi az adatkészlet egyéb ismereteit (például az óceáni adatokra, beleértve az óceánt) ... Például,
    ```
    <att name="keywords">ano, circulation, coastwatch, currents, derived, Earth Science &gt; Oceans &gt; Ocean Circulation &gt; Ocean Currents, eastward, eastward\\_sea\\_water\\_velocity, experimental, hf radio, meridional, noaa, northward, northward\\_sea\\_water\\_velocity, nuevo, ocean, oceans, radio, radio-derived, scan, sea, seawater, velocity, water, zonal</att>  
    ```
óta datasets.xml egy XML dokumentum, a karakterek és&lt;és &gt; egy olyan tulajdonságban, mint a kulcsszavak (pl. a GCMD tudományos kulcsszavak &gt; karakterei) alá: beadás éve (évszám)&lt;, és gt; tiszteletben.
Amikor egy adatkészletet töltenek be ERDDAP ,
    
    * "Föld tudomány &gt;" hozzáadódik minden GCMD kulcsszó kezdetéhez, amely hiányzik.
    * A GCMD kulcsszavak megtérülnek a címsorba (az első betűket kapitalizálják) ...
    * A kulcsszavak rendezett rendbe kerülnek, és minden újvonal karaktert eltávolítanak.
     
######  keywords\\_vocabulary  {#keywords_vocabulary} 
*    [ ** keywords\\_vocabulary ** ](#keywords_vocabulary)   (a [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabvány) egy ELŐTTT TANÁCSADÓ tulajdonság: ha egy iránymutatást követ a kulcsszavakban szereplő szavak / kifejezések tekintetében (Például a GCMD Science Keywords) , tedd ide az iránymutatás nevét. Például,
    ```
    <att name="keywords\\_vocabulary">GCMD Science Keywords</att>  
    ```
###### licenc{#license} 
*    [ **licenc** ](#license)   (a [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabvány) a STRONGLY RECOMMENDED globális tulajdonsága a licenc és/vagy használati korlátozásoknak. Például,
    ```
    <att name="license">\\[standard\\]</att>
    ```
    * Ha " \\[ szabvány \\] " a tulajdonképpeni értékben fordul elő, a szabvány helyettesíti ERDDAP™ licenc a&lt;StandardLicense&gt; címke ERDDAP A
         \\[ Tomcat \\] /webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml fájl.
         
######  Metadata\\_Conventions  {#metadata_conventions} 
*    [ ** Metadata\\_Conventions ** ](#metadata_conventions) az elavult [ACDD 1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)   (amelyet azonosítottak Metadata\\_Conventions mint " Unidata Dataset Discovery v1.0") metadata szabvány. A tulajdonság érték az adatkészlet által használt metaadat-konvenciók egy különálló listája volt.
Ha egy adatkészlet ACDD 1.0-t használ, ez a tulajdonság például szigorúan elismert.
    ```
    <att name="Metadata\\_Conventions">COARDS, CF-1.6, Unidata Dataset Discovery v1.0</att>  
    ```
De ERDDAP™ most javasolja az ACDD-1.3-at. Ha van [kapcsolta be az adatkészleteit az ACDD-1.3 használatára](#switch-to-acdd-13) Használata Metadata\\_Conventions STRONGLY DISCOURAGED: Csak használja [&lt;Egyezmények&gt;] (#konvenciók) Ehelyett.
######  processing\\_level  {#processing_level} 
*    [ ** processing\\_level ** ](#processing_level)   (a [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabvány) a feldolgozás szöveges leírása (például, [A NASA Föld-megfigyelő rendszeradat- és információs rendszeradat-feldolgozási szintje](https://www.earthdata.nasa.gov/learn/earth-observation-data-basics/data-processing-levels) Például a 3. szint) vagy minőségellenőrzési szint (Például a Science Quality) az adatok. Például,
    ```
    <att name="processing\\_level">3</att>  
    ```
###### projekt{#project} 
*    [ **projekt** ](#project)   (a [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabvány) OPTIONAL tulajdonsága annak a projektnek a azonosítása, amely része az adatkészletnek. Például,
    ```
    <att name="project">GTSPP</att>  
    ```
Ha az adatkészlet nem része egy projektnek, ne használja ezt a tulajdonságot. Összehasonlítás [ creator\\_name ](#creator_name) Ez a projektre összpontosít (nem személy vagy szervezet, amely több projektben részt vehet) ...
######  publisher\\_name  {#publisher_name} 
*    [ ** publisher\\_name ** ](#publisher_name)   (a [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabvány) a TÁMOGATÓ módja annak, hogy azonosítsa a személyt, szervezetet vagy projektet, amely közzéteszi ezt az adatkészletet. Például,
    ```
    <att name="publisher\\_name">JPL</att>  
    ```
Például Ön a kiadó, ha egy másik személy vagy csoport [teremtés](#creator_name) az adatkészlet, és csak újra kiszolgálja ERDDAP ... Ha a "publisher" nem igazán vonatkozik egy adatkészletre, hagyja ki ezt a tulajdonságot. Összehasonlítás [ creator\\_name ](#creator_name) A kiadó valószínűleg nem módosította vagy újra feldolgozta az adatokat; a kiadó csak az új helyszínen elérhetővé teszi az adatokat.
######  publisher\\_email  {#publisher_email} 
*    [ ** publisher\\_email ** ](#publisher_email)   (a [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabvány) az E-mail cím azonosításának módja (helyesen formázva, például john\\_smith@great.org) ez egy módja annak, hogy kapcsolatba lépjen a kiadóval. Például,
    ```
    <att name="publisher\\_email">john\\_smith@great.org</att>  
    ```
Ha a "publisher" nem igazán vonatkozik egy adatkészletre, hagyja ki ezt a tulajdonságot.
######  publisher\\_url  {#publisher_url} 
*    [ ** publisher\\_url ** ](#publisher_url)   (a [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabvány) a RECOMMENDED módja annak, hogy azonosítsa az URL-t a szervezet számára, amely közzéteszi az adatkészletet, vagy egy URL-t a kiadó információjával az adatkészletről (de ez inkább a cél [ infoUrl ](#infourl) ) ... Például,
    ```
    <att name="publisher\\_url">https://podaac.jpl.nasa.gov</att>  
    ```
Ha a "publisher" nem igazán vonatkozik egy adatkészletre, hagyja ki ezt a tulajdonságot.
######  real\\_time  {#real_time} 
*    [ ** real\\_time ** ](#real_time) egy globális sztring tulajdonság (nem bármilyen szabványból) jelzi, hogy ez egy valós idejű adatkészlet. Például,
    ```
    <att name="real\\_time">true</att>  
    ```
Ha ez hamis (az alapértelmezett) , ERDDAP™ a fájltípusok iránti kérelmekre adott válaszokat, ahol az egész fájlt előbb kell létrehozni ERDDAP™ elkezdheti küldeni a választ a felhasználóra, és akár 15 percig újra felhasználhatja őket (pl.: .nc , .png) ...
Ha ez igaz, ERDDAP™ Soha nem fogja összezúzni a válaszfájlokat, és mindig újonnan létrehozott fájlokat fog visszaküldeni.
######  sourceUrl tulajdonság{#sourceurl-attribute} 
*    [ ** sourceUrl ** ](#sourceurl-attribute) globális tulajdonság az adatok forrásának URL-jével. Például,
    ```
    <att name="sourceUrl">https://opendap.co-ops.nos.noaa.gov/ioos-dif-sos/SOS</att>  
    ```
     (de tedd az egészet egy sorra) 
    *    ERDDAP™ általában automatikusan létrehozza ezt a globális tulajdonságot. Két kivétel EDDTableFrom Hyrax Files és EDDTableFromThreddsFiles.
    * Ha a forrás helyi fájlok, és a fájlokat a szervezet hozta létre, használja
    ```
        <att name="sourceUrl">(local files)</att>
    ```
    * Ha a forrás helyi adatbázis, és az adatokat a szervezet hozta létre, használja
    ```
        <att name="sourceUrl">(local database)</att>
    ```
    *    sourceUrl Fontos, mert lehetővé teszi az ügyfelek számára, hogy visszalépjenek az adatok eredeti forrásához.
    *    sourceUrl egyedi ERDDAP ... Ez nem bármilyen metaadat szabványból származik.
        
######  standard\\_name\\_vocabulary  {#standard_name_vocabulary} 
*    [ ** standard\\_name\\_vocabulary ** ](#standard_name_vocabulary)   (a [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabvány) egy ELŐTTT tulajdonság, hogy azonosítsa az ellenőrzött szókincs nevét, amelyből a változó [ standard\\_name ](#standard_name) szednek. Például,
    ```
    <att name="standard\\_name\\_vocabulary">CF Standard Name Table v77</att>  
    ```
a 77-es verzióhoz [CF standard névtáblázat](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) ...
         
#####  subsetVariables  {#subsetvariables} 
*    ** subsetVariables **   (Az EDDTable adatkészletekhez csak) egy RECOMMENDED globális tulajdonság, amely lehetővé teszi, hogy megjelölje a Comma-elválasztott listát&lt; dataVariable &gt;&gt;&gt;&gt;&gt;&gt; (#datavariable)   [ destinationName ](#destinationname) a változók azonosítása, amelyek korlátozott számú értékkel rendelkeznek (másképp fogalmazva: a változók, amelyekre minden értéknek sok duplikációja van) ... Például,
    ```
        <att name="subsetVariables">station\\_id, longitude, latitude</att>  
    ```
Ha ez a tulajdonság jelen van, az adatkészletnek van egy * datasetID * .subset weboldal (és link hozzá minden adatkészlet listán) amely lehetővé teszi a felhasználók számára, hogy gyorsan és könnyen kiválaszthassák az adatok különböző alkészleteit.
    * Minden alkalommal, amikor egy adatkészletet töltenek be, ERDDAP rakományok és áruházak a lemezen egy asztalt az összes különböző () az alapkészlet kombinációi Variable változó értékei. ERDDAP™ olvassa el, hogy subsetVariables asztal és feldolgozza nagyon gyorsan (különösen a sok adatfájl olvasásához vagy az adatbázisból vagy más külső szolgáltatásból származó adatokhoz képest) ...
    * Ez lehetővé teszi ERDDAP™ 3 dolgot csinálni:
        1. Ez lehetővé teszi ERDDAP™ egy listát a lehetséges értékekről az Adathozzáférési Formáról, Készítsen egy Graph weboldalt, és .subset weboldalakat.
        2. Ez lehetővé teszi ERDDAP™ .subset weboldalt kínálni az adatkészlethez. Ez az oldal érdekes, mert könnyű megtalálni a változók értékeinek érvényes kombinációját, amely néhány adatkészlet és néhány változó nagyon, nagyon nehéz (szinte lehetetlen) ... Ezután minden felhasználói kérelmet külön () aljzat A változó adatok nagyon gyorsak lesznek.
        3. Ha van egy felhasználói kérés, amely csak az említett változók aljzatára vonatkozik, ERDDAP™ gyorsan elolvashatja subsetVariables táblázat, és válaszoljon a kérésre. Ez megmenthet egy tonna időt és erőfeszítést ERDDAP ...
    * A rendje destinationName s Ön határozza meg a rendezési rendet * datasetID * .subset weboldal, így általában megadja a legfontosabb változókat először, majd a legkevésbé fontos. Például az idősoros adatokkal rendelkező adatkészletek több állomás számára használhatók, például,
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
hogy az értékeket az állomás \\_id rendezi.
    * Nyilvánvaló, hogy az Ön választása, amely változókat tartalmazhat a subsetVariables lista, de a javasolt használat:
        
Általában tartalmaznak olyan változókat, amelyekre szeretné ERDDAP™ az adatkészlet adathozzáférési formanyomtatványának csökkentési listájának megjelenítése (.html) Make-A-Graph (.gráf) weboldalak.
        
Általában tartalmazzák a változókat az adatkészlet jellemzőiről (az állomások, profilok és/vagy trajektorok, különösen [cdm\\_timeseries\\_ változók](#cdm_timeseries_variables) , [cdm\\_profil\\_variables](#cdm_profile_variables) , [cdm\\_trajectory\\_variables](#cdm_trajectory_variables) ) ... Ezeknek a változóknak csak néhány különböző értéke van, így jól működnek a ledobott listákkal.
        
Soha ne tartalmazzon semmilyen adatváltozatot az egyéni megfigyelésekhez kapcsolódóan (pl. idő, hőmérséklet, szalinitás, jelenlegi sebesség) a subsetVariables lista. Túl sok különböző értékek ezeknek a változóknak, így a ledobás lista lassú lenne, és nehéz lenne dolgozni (vagy nem működik) ...
        
    * Ha ezeknek a változóknak a különböző kombinációinak száma meghaladja a 10 000 000-et, akkor fontolja meg a korlátozást subsetVariables hogy meghatározza a különböző kombinációk számának csökkentését 1 000 000 alá; különben, * datasetID * A weblapokat lassan lehet generálni. szélsőséges esetekben az adatkészlet nem tölthet be ERDDAP™ mivel a különböző kombinációk listájának létrehozása túl sok memóriát használ. Ha igen, akkor el kell távolítani néhány változót a subsetVariables lista.
    * Ha az egyik aljzat változójának különböző értékei több mint 20 000, akkor fontolóra kell vennie, hogy nem tartalmazza ezt a változót a listán subsetVariables egyébként hosszú időbe telik, hogy továbbítsák a * datasetID * .subset, * datasetID * .graph, és * datasetID * .html weboldalak. Szintén egy Mac-en nagyon nehéz kiválasztani a kiválasztást egy ledobott listáról, több mint 500 tétellel, mivel a görgetős bár hiánya. A kompromisszum: távolítsa el a változókat a listából, amikor a felhasználók valószínűleg nem választják ki az értékeket egy leesés listából.
    * Minden adatkészletet tesztelnie kell, hogy lássa, van-e subsetVariables A beállítás rendben van. Ha a forrásadatkiszolgáló lassú, és túl sokáig tart (vagy kudarcot vall) letölteni az adatokat, vagy csökkenteni a megadott változók számát, vagy eltávolítani subsetVariables globális tulajdonság.
    * Beállítás A változók nagyon hasznosak. Tehát, ha az adatkészlet megfelelő, kérjük, hozzon létre egy subsetVariables tulajdonság.
    * EDDTableFrom SOS automatikusan hozzáadódik
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
amikor az adatkészlet jön létre.
        * Lehetséges figyelmeztetés: ha egy felhasználó használja * datasetID * .subset weboldal kiválaszt egy olyan értéket, amely egy fuvarozóReturn vagy újline karakterrel rendelkezik, * datasetID * .subset kudarcot vall. ERDDAP™ nem tud működni a probléma miatt néhány HTML részletek. Mindenesetre szinte mindig jó ötlet, hogy távolítsa el a fuvarozásReturn és az újline karakterek az adatok. Hogy segítsen megoldani a problémát, ha az EDDTable. subsetVariables AdatTable módszer a ERDDAP olyan adatértékeket észlel, amelyek bajt okoznak, figyelmeztetést küld az e-mail megsértő értékeinek listájával Minden Az e-mail címek megadott setup.xml. Így tudod, mit kell rögzíteni.
        *    **Elő generált subset táblák.** Normális esetben, amikor ERDDAP™ betölti az adatkészletet, kéri a különálló () az adatforrásból származó változó adattáblát, csak normál adatkéréssel. Bizonyos esetekben ez az adatok nem állnak rendelkezésre az adatforrásból, vagy az adatforrásból való visszakeresés nehéz lehet az adatforrás kiszolgálóján. Ha igen, akkor egy táblázatot tudsz nyújtani az információval egy .json vagy .csv fájl a névvel *Tomcat* /content/erddap/subset/ * datasetID *  .json   (vagy .csv) ... Ha jelen van, ERDDAP™ egyszer elolvassa, amikor az adatkészletet betöltik, és az aljzatadatok forrásaként használja.
            * Ha van hiba, amikor elolvassa, az adatkészlet nem fog betölteni.
            * Pontosan ugyanaz az oszlop neve (például ugyanaz az eset) mint&lt; subsetVariables &gt; de az oszlopok minden rendben vannak.
            * Több oszlop van (eltávolításra kerülnek, és az újonnan redundáns sorokat eltávolítják) ...
            * A hiányzó értékeknek hiányozniuk kell az értékeket (nem hamis számok, mint -99) ...
            *    .json fájlok lehet egy kicsit nehezebb létrehozni, de foglalkozik az Unicode karakterek jól. .json A fájlok könnyen létrehozhatók, ha létrehozod őket ERDDAP ...
            * A .csv fájlok könnyen működnek, de csak az ISO 8859-1 karakterek számára alkalmasak. .csv fájlok MUST van oszlop nevek az első sorban és adatok a későbbi sorok.
        * Hatalmas adatkészletek vagy ha&lt; subsetVariables &gt; félreértve, az értékek kombinációinak táblázata elég nagy lehet ahhoz, hogy túl sok adatot vagy OutOfMemory hibákat okozzon. A megoldás az, hogy eltávolítsuk a változókat a listáról&lt; subsetVariables &gt; amelyekre nagyszámú érték van, vagy szükség szerint eltávolítják a változókat, amíg az asztal mérete ésszerű. Függetlenül attól, hogy a hiba, az alkatrészek ERDDAP™ használja subsetVariables rendszer nem működik jól (pl. a weboldalak nagyon lassan töltenek be) ha túl sok sor van (pl. több mint egymillió) ebben az asztalban.
        *    subsetVariables semmi köze annak megállapításához, hogy mely változó felhasználók használhatják a korlátozásokat, azaz a felhasználók hogyan kérhetik az adatkészlet alkészleteit. ERDDAP™ mindig lehetővé teszi a korlátozásokat, hogy hivatkozzanak bármelyik változóra.
###### Időegységek{#time-units} 
 [Idő és időmérő](#time-units) Az oszlopoknak ISO 8601:2004 (EZ) formázott dátum + idő Z strings (Például, 1985-01-31T15:31:00Z) ...
             
###### összefoglaló{#summary} 
*    [ **összefoglaló** ](#summary)   (a [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) és [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabványok) REQUIRED globális tulajdonság az adatkészlet hosszú leírásával (általában)&lt;500 karakter). Például,
    ```
    <att name="summary">VIIRSN Level-3 Standard Mapped Image, Global, 4km, Chlorophyll a, Daily. The Visible and Infrared Imager/Radiometer Suite (VIIRS) is a multi-disciplinary instrument that flies on the National Polar-orbiting Operational Environmental Satellite System (NPOESS) series of spacecraft, including the NPOESS Preparatory Project (NPP).</att>
    ```
    * Vagy az adatkészlet globális [Forrás: Forrás](#global-attributes) vagy globális&lt; addAttributes &gt; &gt; &gt; &gt; A MUST ezt a tulajdonságot tartalmazza.
    * összefoglaló nagyon fontos, mert lehetővé teszi az ügyfelek számára, hogy olvassa el az adatkészlet leírását, amely több információval rendelkezik, mint a cím, és így gyorsan megérti, mi az adatkészlet.
    * Tanácsadás: kérlek írja le az összefoglalót, hogy dolgozzon, hogy leírja az adatkészletet néhány véletlenszerű embernek, akivel találkozik az utcán vagy egy kollégának. Ne feledje, hogy tartalmazza [Öt W és egy H](https://en.wikipedia.org/wiki/Five_Ws) Ki hozta létre az adatkészletet? Milyen információkat gyűjtöttek? Mikor gyűjtötték be az adatokat? Hol gyűjtötték? Miért gyűjtötték össze? Hogyan gyűjtötték össze?
    *    ERDDAP™ megjeleníti az adatkészlet adathozzáférési formájának összefoglalását ( * datasetID * .html) Make A Graph weboldal ( * datasetID * .gráf) és más weboldalak. ERDDAP™ használja az összefoglalót az FGDC és az ISO 19115 dokumentumok létrehozásakor.
######  testOutOfDate  {#testoutofdate} 
*    [ ** testOutOfDate ** ](#testoutofdate)   (opcionális ERDDAP -specifikus globális metaadat tulajdonság, nem bármilyen szabványból) egyszerűsítve, ha a közeli valós idejű adatkészlet adatait naprakésnek tekintik, now-  *nUnits* Például, now- 2 nap olyan adatok esetében, amelyek általában 24-48 órát jelentenek az időérték után. Előrejelzési adatok, használat most **+**  *nUnits* Például most + 6 nap előrejelzési adatok, amelyek a jövőben 8 nap. (Lásd: [ now-  *nUnits* Szintax leírás](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) ...) Ha az adatkészlet maximális időértéke közelmúltban van, mint a megadott idő, az adatkészlet naprakésznek tekinthető. Ha a maximális időérték idősebb, mint a megadott idő, az adatkészletet naprakésznek tekintik. A naprakész adatkészletek esetében valószínűleg probléma merül fel az adatforrással, így ERDDAP™ képtelen a közelmúltbeli időpontokból származó adatokhoz jutni.
    
A testOutOfDate az érték oszlopként jelenik meg [ allDatasets adatkészlet](#eddtablefromalldatasets) a te ERDDAP ... Azt is használják, hogy kiszámítsa az OutOfDate index, amely egy másik oszlop a allDatasets adatkészlet.
Ha az index&lt;1, az adatkészlet naprakésznek tekinthető.
Ha az index&lt;=1, az adatkészletet naprakésznek tekintik.
Ha az index&lt;=2, az adatkészlet nagyon naprakésznek tekinthető.
    
A testOutOfDate értéket is használnak ERDDAP™ létrehoznihttps://*yourDomain*/erddap/outOfDateDatasets.htmlWeboldal ( [példa](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) ) amely megmutatja az adatkészleteket, amelyek&lt; testOutOfDate &gt; címkék, az adatkészletek rangsorolva, hogy milyen out-of-date ők. Ha módosítja a fájltípust (.html és .csv, .jsonlCSV , .nc , .tsv ...) Ezeket az információkat különböző fájlformátumokban kaphatja meg.
    
Ha lehetséges, [GenerateDatasetsXml](#generatedatasetsxml) hozzáad egy testOutOfDate a globális addAttributes adatkészlet. Ez az érték egy javaslat, amely a GenerateDatasetsXml rendelkezésére álló információkon alapul. Ha az érték nem megfelelő, változtassa meg.
    
"Out-of-date" itt nagyon különbözik a&lt;újratöltés MindenNMinutes&gt;] (#reloadeveryn percek) , amely foglalkozik azzal, hogy naprakész ERDDAP Az adatkészlet ismerete. A&lt; testOutOfDate A rendszer feltételezi, hogy ERDDAP Az adatkészlet ismerete naprakész. A kérdés&lt; testOutOfDate &gt; az ügyletek: úgy tűnik, hogy valami baj van az adatok forrásával, ami újabb adatokat okoz, amelyeket nem lehet hozzáférhetővé tenni ERDDAP ?
    
###### cím{#title} 
*    [ **cím** ](#title)   (a [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) és [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabványok) REQUIRED globális tulajdonság az adatkészlet rövid leírásával (általában)&lt;= 95 karakter). Például,
    ```
    <att name="title">VIIRSN Level-3 Mapped, Global, 4km, Chlorophyll a, Daily</att>
    ```
    * Vagy az adatkészlet globális [Forrás: Forrás](#global-attributes) vagy globális&lt; addAttributes &gt; &gt; &gt; &gt; A MUST ezt a tulajdonságot tartalmazza.
    * a cím azért fontos, mert az adatkészletek minden listája bemutatott ERDDAP   (más, mint a keresési eredmények) felsorolja az adatkészleteket az alfabetikus sorrendben, cím szerint. Tehát, ha meg szeretné határozni az adatkészletek megrendelését, vagy egyes adatkészletek csoportosulnak, akkor címeket kell létrehoznia ezzel szem előtt tartva. Számos adatkészlet listája (például egy kategóriás keresésre válaszul) Mutassa meg a teljes lista aljzatát és egy másik sorrendben. Tehát az egyes adatkészletek címe önmagában kell állnia.
    * Ha a cím tartalmazza a "DEPRECATED" szót (minden tőkebetű) Ezután az adatkészlet alacsonyabb rangsorolást kap a keresésekben.
             
##### &lt; axisVariable Gt;{#axisvariable} 
* [[szerkesztés]] ** &lt; axisVariable &gt; &gt; &gt; &gt; ** ] (#axisvariable) egy dimenzió leírására használják (úgynevezett "axis") ...
Mert EDDGrid adatkészletek, egy vagy több axisVariable A címkék REQUIRED, és minden [ dataVariable s](#datavariable) mindig ossza meg/használja az összes tengelyváltozatot. ( [Miért?](#why-just-two-basic-data-structures)   [Mi van, ha nem?](#dimensions) )   
Ott lehet egy tengely változó minden dimenzióban az adatok változók.
Axis változók MUST van meghatározva annak érdekében, hogy az adatok változók használja őket.
(EDDTable adatkészletek nem használhatók&lt; axisVariable &gt; címkék.)
Egy testesített példa:

>&nbsp;&nbsp;&lt;axisVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>MT&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>time&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">days since 1902-01-01T12:00:00Z&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/axisVariable>  

&lt; axisVariable &gt; támogatja a következő altagokat:
###### &lt; sourceName \\&gt;{#sourcename} 
* [[szerkesztés]]&lt; sourceName \\&gt;] (#sourcename) - az adatforrás neve változó. Ez az a neve, hogy ERDDAP™ az adatforrásból származó adatok kérésekor fog használni. Ez az a neve, hogy ERDDAP™ megkeresi, hogy az adatok visszatérnek az adatforrásból. Ez érzékeny. Ez REQUIRED.
###### &lt; destinationName \\&gt;{#destinationname} 
* [[szerkesztés]]&lt; destinationName \\&gt;] (#destinationname) az a neve annak a változónak, amelyet bemutatunk és használunk ERDDAP™ felhasználók.
    * Ez a TIONAL. Ha hiányzik, sourceName használják.
    * Ez azért hasznos, mert lehetővé teszi, hogy megváltoztassa a kriptográfiai vagy furcsa sourceName ...
    *    destinationName érzékeny.
    *    destinationName S MUST kezd egy levelet (A-Z, a-z) és követni kell 0 vagy több karaktert (A-Z, a-z, 0-9 és \\_) ... ("-" megengedték korábban ERDDAP™ 1.10 verzió.) Ez a korlátozás lehetővé teszi, hogy a tengely változó nevek azonosak legyenek ERDDAP™ , a válaszfájlokban és az összes olyan szoftverben, ahol ezeket a fájlokat fogják használni, beleértve a programozási nyelveket is (mint Python , Matlab és Java Szövegek) ahol hasonló korlátozások vannak a változó nevekre.
    * Inkább EDDGrid adatkészletek, [hosszúság, magasság, magasság, mélység és idő](#destinationname) A tengely változók különlegesek.
         
######  axisVariable  &lt;addAttributes&gt; {#axisvariable-addattributes} 
* [[szerkesztés]]&lt; addAttributes &gt;&gt;&gt;&gt;&gt;&gt; (# változó-addattributes) meghatározza az OPTIONAL tulajdonságok ( *név* = *érték* ) amely hozzáadódik a forrás tulajdonságaihoz egy változó, hogy a kombinált tulajdonságok változó.
Ha a változó [Forrás: Forrás](#variable-addattributes) vagy&lt; addAttributes &gt; beleértve [ scale\\_factor vagy add\\_offset ](#scale_factor) attribútumok, értékeiket fogják használni, hogy kicsomagolja az adatokat a forrásból, mielőtt az ügyfél elosztása
     (eredmény Érték = forrás Érték \\* scale\\_factor + add\\_offset ) ... A nem csomagolt változó ugyanazon adattípus lesz (Például, float) mint scale\\_factor és add\\_offset értékek.
         
##### &lt; dataVariable Gt;{#datavariable} 
* [[szerkesztés]] ** &lt; dataVariable &gt; &gt; &gt; &gt; ** ] (#datavariable) egy REQUIRED (szinte minden adatkészlet) címke belül&lt;adatkészlet&gt; címke, amelyet az adatok változó leírására használnak. Ott lehet 1 vagy több példa erre a címkére. Egy testesített példa:

>&nbsp;&nbsp;&lt;dataVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>waterTemperature&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>sea\\_water\\_temperature&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataType>](#datatype)float&lt;/dataType>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Water Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[standard\\_name](#standard_name)">sea\\_water\\_temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/dataVariable>  

&lt; dataVariable &gt; támogatja a következő altagokat:
###### &lt; sourceName Gt;{#sourcename-1} 
* [[szerkesztés]]&lt; sourceName &gt;&gt;&gt;&gt;&gt;&gt; (#sourcename) - az adatforrás neve változó. Ez az a neve, hogy ERDDAP™ az adatforrásból származó adatok kérésekor fog használni. Ez az a neve, hogy ERDDAP™ megkeresi, hogy az adatok visszatérnek az adatforrásból. Ez érzékeny. Ez REQUIRED.
###### Csoportok{#groups} 
CF hozzáadott támogatást csoportok CF v1.8. Kezdve ~2020-ban, NetCDF olyan eszközök, amelyek a változókat csoportokba helyezik egy .nc fájl. A gyakorlatban ez csak azt jelenti, hogy a változóknak hosszú neve van, amely azonosítja a csoportot (s) és a változó név, például a csoport1a/group2c/varName). ERDDAP™ támogatja a csoportokat azáltal, hogy átalakítja a "/" változóban&lt; sourceName &gt; "\\_" a változóban&lt; destinationName &gt; például csoport1a\\_group2c\\_varName. (Ha ezt látod, akkor rá kell jönnöd, hogy a csoportok nem sokkal többek, mint egy szintaxi egyezmény.) Amikor a változók szerepelnek ERDDAP™ A csoport összes változója együtt fog megjelenni, az alapul szolgáló csoportot. \\[ Ha ERDDAP™ , nevezetesen GenerateDatasets Xml, nem teljesít, valamint olyan forrásfájlokkal, amelyek csoportokkal rendelkeznek, kérjük, küldjön egy mintafájlt Chrisnek. John at noaa.gov. \\] 

EDDTableFromFiles adatkészletek használhat néhány speciálisan kódolt, pseudo sourceName az új adatok változóinak meghatározása, például, hogy elősegítse a globális tulajdonságot, hogy az adat változó legyen. Lásd [ez a dokumentáció](#pseudo-sourcenames) ...
######  HDF Struktúrák{#hdf-structures} 
Kezdőlap ERDDAP™ v2.12, EDDGrid FromNcFiles és EDDGrid FromNcFiles A nem csomagolt adatok a "struktúrákból" olvashatók .nc 4 és .hdf 4 fájl. A változó azonosítása, amely egy szerkezetből származik,&lt; sourceName &gt; &gt; &gt; &gt; használja a formátumot: *fullstructureName*  |  *tagName* Például a csoport1/myStruct | myMember.

###### Fix érték ForrásNames{#fixed-value-sourcenames} 
Egy EDDTable adatkészletben, ha változót szeretne létrehozni (egyetlen, rögzített értékkel) ez nem a forrásadatlapban, használat:
```
    <sourceName>=*fixedValue*</sourceName>  
```
A kezdeti egyenlő jelmondás ERDDAP™ egy rögzített Az érték követni fog.

* A numerikus változók esetében a rögzített értéknek egyetlen véges értéknek vagy NaN-nek kell lennie (esetérzékeny, pl.: \\=NaN) ...
* A változók megerősítéséhez a rögzített értéknek egyedülállónak kell lennie, [JSON stílusú sztring](https://www.json.org/json-en.html)   (speciális karakterekkel elmenekült \\ karakterekkel) , pl. \\="My \"Különleges \" String"
* Egyszerre változó, meghatározza a rögzített érték, mint szám a "seconds since 1970-01-01T00:00:00Z" Használat
egység = másodpercek 1970-01-01T00:00Z óta.
    
A többi címke a&lt; dataVariable &gt; úgy működik, mintha ez rendszeres változó lenne.
Például, hogy hozzon létre egy változó úgynevezett magasság egy fix érték 0,0 (Float) Használat:

>        &lt;sourceName>=0&lt;/sourceName>  
>        [&lt;destinationName\\>](#destinationname)altitude&lt;/destinationName>  
>        [&lt;dataType>float&lt;/dataType>](#datatype)  

Szokatlan helyzetek esetén még egyet is meghatározhat actual\\_range addAttribute, amely felülírja a célértékeketMin és a rendeltetésiMax (amely egyébként egyenlő lenne a rögzített Érték) ...
 
###### Script SourceNames / Adott változók{#script-sourcenamesderived-variables} 
Kezdőlap ERDDAP™ v2.10, egy [EDDTableFromFiles](#eddtablefromfiles) , [EDDTableFromDatabase](#eddtablefromdatabase) vagy [EDDTableFromFileNames](#eddtablefromfilenames) adatkészlet,&lt; sourceName &gt; lehet
kifejezés (egy egyenlet, amely egy értékre értékeli) , a formátum használatával
```
    <sourceName>=*expression*</sourceName>  
```
vagy script (olyan nyilatkozatok sorozata, amelyek egyetlen értéket hoznak vissza) , a formátum használatával
```
    <sourceName>=*script*</sourceName>  
```
 ERDDAP™ támaszkodik a [Apache projektje](https://www.apache.org/)   [ Java Kifejezési nyelv (JEXL) ](https://commons.apache.org/proper/commons-jexl/)   (licenc: [Apache](https://www.apache.org/licenses/LICENSE-2.0) ) a kifejezések értékelése és a szövegek futtatása.
Az adott új változó számítása az eredmények egy sorában történik, ismételten minden sorban.
A kifejezések és írások egy Java és Java Script-szerű szintax, és bármelyiket használhat
 [üzemeltetők és módszerek, amelyeket a JEXL-be építettek](https://commons.apache.org/proper/commons-jexl/reference/syntax.html) ...
A forgatókönyvek is használhatnak módszereket (funkciók) ezekből az osztályokból:
*    [Naptár2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2) , amely egy roncs néhány statisztikai, idő- és naptári-hoz kapcsolódó módszerek com.cohort.util.Calendar2 ( [licenc](/acknowledgements#cohort-software) ) ... Például,
Calendar2.parseToEpochSeconds ( *forrásTime, dátum TimeFormat* ) elválasztja a forrást Idő sztring a dátumTimeFormat sztring és visszatér "seconds since 1970-01-01T00:00:00Z"   (EpochSeconds) kettős érték.
*    [Math](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math) , ami egy roncs szinte az összes statikus, matematikai módszerek [java.lang. Math](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html) ... Például Math.atan2 ( *y, x* ) tőkés koordinátákban vesz részt (y, x) és visszatér a poláris koordináták (egy sor dupla kettős \\[ R, Theta \\] ) ...
*    [Math2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2) , amely egy roncs szinte az összes statikus, matematikai-hoz kapcsolódó módszerek com.cohort.util. Math2 ( [licenc](/acknowledgements#cohort-software) ) ... Például,
Math2.roundTo ( *d, nPlaces* ) d-t fog kerekíteni a meghatározott számjegyek számához a döntő ponthoz.
* String, amely hozzáférést biztosít az összes statikus, String-related módszerhez [java.lang. Hírek](https://docs.oracle.com/javase/8/docs/api/java/lang/String) ... String tárgyak a ERDDAP™ kifejezések és forgatókönyvek bármelyik társult Java a java.langban leírt módszerek. Húr dokumentáció. Például String.valueOf (d)) átalakítja a kettős érték d egy String (bár használhatja a "+d"-t is) ...
*    [String2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2) , amely a legtöbb statikus, String- és tömörítő módszert a com.cohort.util.String2-ben ( [licenc](/acknowledgements#cohort-software) ) ... Például String2 .z eroPad ( *szám, nDigits* ) 0-ot hozzáad a String szám baljára, hogy a számjegyek teljes száma nDigits (pl.: String2 .z eroPad ("6", 2) visszatér a "06") ...
*    [sor](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-row) , amely nem statikus módszerekkel rendelkezik az adatokhoz való hozzáféréshez a forrásadattáblá jelenlegi sorában lévő különböző oszlopokból. Például row.columnString ("év") olvassa el az értéket az "év" oszlopból, mint egy String, míg row.column Int ("év") elolvassa az értéket az "év" oszlopból, mint egy integrál.

Biztonsági okokból a kifejezések és írások nem használhatnak más osztályokat, mint a 6. ERDDAP™ e korlátozás végrehajtása az alapértelmezett feketelist létrehozásával (melyik feketelisták minden osztályt) Ezután egy fehérlistát (amely kifejezetten lehetővé teszi a fent leírt 6 osztályt) ... Ha más módszerekre és / vagy más osztályokra van szüksége a munkádhoz, kérjük, küldje el a Chris iránti kérelmet. John at noaa.gov.
    
###### Hatékonyság
Az EDDTableFromFiles adatkészletek esetében csak nagyon-nagyon minimális (valószínűleg nem észrevehető) lassulás az ezekből a változókból származó adatok kérésére. Az EDDTableFromDatabase esetében hatalmas sebesség büntetés van azoknak a kéréseknek, amelyek magukban foglalják ezeket a változókat (pl.: &longitude0360&gt;30 &longitude0360&lt;40) mivel a korlátozásokat nem lehet átadni az adatbázisba, így az adatbázisnak sokkal több adatot kell visszaadnia ERDDAP™   (ami nagyon időigényes) hogy ERDDAP™ létrehozhatja az új változót, és alkalmazhatja a korlátozást. A legrosszabb eset elkerülése (ahol nincsenek korlátozások az adatbázisba kerülnek) , ERDDAP™ hibaüzenetet dob, hogy az adatbázisnak nem kell visszaadnia az asztal teljes tartalmát. (Ha ezt el akarod kerülni, add hozzá a korlátot egy nem-script oszlophoz, amely mindig igaz, pl.&lt;3000-01-01.) Emiatt az EDDTableFromDatabase-val valószínűleg mindig jobb létrehozni egy bevezetett oszlopot az adatbázisban, nem pedig használni. sourceName = forgatókönyv ERDDAP ...

###### Áttekintés Hogyan Egy Kifejezés (Vagy Script) Használt:
Válaszul a felhasználó tambuláris adatok kérésére, ERDDAP™ adatokat kap egy sor forrásfájlból. Minden forrásfájl létrehoz egy nyers táblát (Egyenesen a forrásból) adatok. ERDDAP™ Ezután menjen át a nyers adatok tábláján, sorban sorban, és értékelje a kifejezést vagy a forgatókönyvet minden sorban, hogy létrehozzon egy új oszlopot, amely rendelkezik ezzel a kifejezéssel vagy forgatókönyvvel, mint egy sourceName ...
    
###### GenerateDatasetsXml
Megjegyzés: GenerateDatasets Az Xml teljesen tisztában van azzal, hogy szükség van egy változó létrehozására&lt; sourceName &gt;= *kifejezés* &lt;/ sourceName &gt;. Meg kell hozni a változót datasets.xml kézzel.

###### Kifejezési példa:
Íme néhány teljes példa az adatok változóira, amelyek kifejezést használnak az új adatoszlop létrehozásához. Arra számítunk, hogy ezek a példák (változataik) lefedi az összes kifejezés használatának 95%-át sourceName S.

###### A különálló „dátum” és "time" oszlopok egy egységes időoszlopba:
```
    <dataVariable>
        <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("date") + "T" + 
            row.columnString("time") + "Z", "yyyy-MM-dd'T'HH:mm:ss'Z'")</sourceName> 
        <destinationName>time</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">seconds since 1970-01-01</att>
        </addAttributes>
    </dataVariable>
```
Az sourceName A kifejezés új "time" oszlop azáltal, hogy a String értékeket a "dátum" ( yyyy-MM-dd ) és "time"   (HH:mm:ss) oszlopok a forrásfájl minden során, és azáltal, hogy átalakítja ezt a sztringet "seconds since 1970-01-01"   (EpochSeconds) kettős érték.

Vagy természetesen meg kell testreszabni az idő formátumot, hogy kezelje a konkrét formátumot minden adatkészlet forrás dátuma és idő oszlopok, lásd
 [idő egység dokumentáció](#string-time-units) ...

Technikailag nem kell használni Calendar2.parseToEpochSeconds () átalakítani a kombinált dátum + idő epochSeconds. Csak átadhatja a dátumot+time String ERDDAP™ és adja meg a formátumot (pl.
 yyyy-MM-dd "T'H:mm:ss'Z") az egységeken keresztül. De jelentős előnyökkel jár az epochSeconds-ra való áttérés - nevezetesen az EDDTableFromFiles könnyedén nyomon követheti az időértékek számát minden fájlban, és olyan gyorsan eldöntheti, hogy egy adott fájlban keres-e, amikor válaszol egy kérésre, amely időkorlátokkal rendelkezik.

A kapcsolódó probléma az, hogy egységes dátum + idő oszlopot kell létrehozni egy külön év, hónap, dátum, óra, perc, második forrásból. A megoldás nagyon hasonló, de gyakran kell nulla-pad sok mező, így például hónap (1 - 12) dátum (1 - 31) Mindig van 2 számjegy. Íme egy példa az évre, hónapra, dátumra:
```
    <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("year") + 
        String2.zeroPad(row.columnString("month"), 2) + 
        String2.zeroPad(row.columnString("date"), 2), "yyyyMMdd")</sourceName>
```
A kapcsolódó probléma az, hogy létre kell hozni egy egységes magassági vagy hosszúsági oszlopot azáltal, hogy kombinálja az adatokat a forrástáblázat külön fokozataiban, perceiben és másodpercek oszlopaiban, mindegyik integrálként tárolva. Például,
```
    <sourceName>=row.columnInt("deg") + row.columnInt("min")/60.0 + 
        row.columnInt("sec")/3660.0</sourceName>
```
###### Konvertáljon egy "lon" nevű oszlopot, amelynek hosszúsági értékei 0 - 360° -ról egy "hosszúság" nevű oszlopra, -180 - 180° értékkel
```
    <dataVariable>
        <sourceName>=Math2.anglePM180(row.columnDouble("lon"))</sourceName> 
        <destinationName>longitude</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">degrees\\_east</att>
        </addAttributes>
    </dataVariable>
```
Az sourceName A kifejezés egy új "hosszúság" oszlopot hoz létre, amely a "lon" oszlop kettős értéket alakítja át a forrásfájl minden során (feltehetően 0 - 360 értékkel) , és átalakítva ezt egy 180-180 kettős értékre.

Ha inkább a források hosszúsági értékeit szeretné átalakítani -180 - 180° 0 - 360°, használja
```
    <sourceName>=Math2.angle0360(row.columnDouble("lon"))</sourceName>
```
A két hosszúsági változó megnevezése:
Ha az adatkészlet 2 hosszúsági változóval rendelkezik, javasoljuk, hogy használja destinationName = hossza a -180 - 180° változó és destinationName =hosszúság0360 (Hosszúság (cm) 360°) 0 - 360° változó. Ez azért fontos, mert a felhasználók néha Advanced Search-ot használnak az adatok kereséséhez egy adott hosszúsági tartományon belül. Ez a keresés jobb lesz, ha a hosszúság konzisztensen -180 - 180° értékű minden adatkészlet számára. Továbbá az adatkészlet geospatial\\_lon\\_min, geospatial\\_lon\\_max, Westernmost\\_Easting és Easternmost\\_Eastings globális tulajdonságai következetes módon lesznek meghatározva (hosszúsági értékek -180-180°) ;
    
###### A "tempF" nevű oszlop átalakítása a hőmérsékleti értékekkel a \\_ F egy "tempC" nevű oszlopba, a hőmérsékletekkel fokozatosan\\_ C:
```
    <dataVariable>
        <sourceName>=(row.columnFloat("tempF")-32)\\*5/9</sourceName> 
        <destinationName>tempC</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_C</att>
        </addAttributes>
    </dataVariable>
```
Az sourceName a kifejezés új "tempC" oszlopot hoz létre a float fokozat átalakításával F érték a "tempF" oszlopból a forrásfájl minden során egy float fokozatba C érték.

Vegye figyelembe, hogy az adatkészlet mind az eredeti tempóval rendelkezhet F változó és az új tempó C változó, ha egy másik változó
```
    <sourceName>tempF</sourceName>
```
###### A szél "sebességű" és "irányítás" átalakítása két oszlopba kerül az u,v komponensekkel
* Használjon változót, használjon
```
    <sourceName>=row.columnFloat("speed") \\* Math.cos(row.columnFloat("direction"))</sourceName>
```
* Változékony, használható
```
    <sourceName>=row.columnFloat("speed") \\* Math.sin(row.columnFloat("direction"))</sourceName>
```
Vagy adott u,v:
* A sebesség változó, használat
```
    <sourceName>=Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[0\\]</sourceName>
```
* Ahhoz, hogy egy irány változó, használja
```
    <sourceName>=Math.toDegrees(Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[1\\])</sourceName>
```
    
###### Script Példa:
Íme egy példa egy forgatókönyv használatára, nem csak egy kifejezésre, mint egy sourceName ... Azt várjuk, hogy a szkriptek, szemben a kifejezésekkel, nem lesz szükség gyakran. Ebben az esetben a cél az, hogy visszatérjen egy non-NaN hiányzó érték (-99) a hőmérsékleti értékek egy adott tartományon kívül. Ne feledje, hogy a forgatókönyv a "=" utáni rész.
```
    <dataVariable>
        <sourceName>=var tc=row.columnFloat("tempC"); return tc&gt;35 || tc&lt;-5? -99.0f : tc\\*9/5+32;</sourceName> 
        <destinationName>tempF</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_F</att>
        </addAttributes>
    </dataVariable>
```
###### Hard Flag
Ha megváltoztatja a kifejezést vagy a forgatókönyvet, amelyet egy sourceName Be kell állítanod egy [kemény zászló](/docs/server-admin/additional-information#hard-flag) az adatkészlethez, így ERDDAP™ törli az összes csípett információt az adatkészlethez, és újraolvas minden adatfájlot (az új kifejezés vagy szöveg használata) a következő alkalommal tölti be az adatkészletet. Alternatívaként használhatja [DasDds](#dasdds) amely egyenértékű egy kemény zászló beállításával.

###### százalékkód
Ez csak ritkán releváns: Mert a kifejezések és a forgatókönyvek be vannak írva datasets.xml , ami egy XML-dokumentum, akkor százalékos kódolás minden&lt;, \\&gt; és karakterek a kifejezésekben és szövegekben, mint&lt;, és gt; és &amp;

###### Gyakori problémák
A közös probléma az, hogy változót hoz létre sourceName = *kifejezés* De az elért adatok oszlopa csak hiányzó értékekkel rendelkezik. Alternatívaként az új oszlop néhány sorának hiányzó értékei vannak, és úgy gondolja, hogy nem szabad. A mögöttes probléma az, hogy valami rossz a kifejezéssel és ERDDAP Ez a hiba egy hiányzó értékbe konvertálódik. A probléma megoldásához,

* Nézd meg a kifejezést, hogy lásd, mi lehet a probléma.
* Nézzetek [Log.txt](/docs/server-admin/additional-information#log) , amely megmutatja az első hibaüzenetet, amely az egyes új oszlopok létrehozása során keletkezett.

A közös okok:

* A rossz esetet használta. A kifejezések és a szkriptek érzékenyek.
* Elhagyta az osztály nevét. Például a Math.abs-t kell használnia () Nem csak abs () ...
* Nem csináltatok típuskonverziókat. Például, ha egy paraméter érték adattípusa String, és kettős értéke van, meg kell alakítani egy kettőt egy String-on keresztül "+d.
* A kifejezés oszlop neve nem pontosan illeszkedik az oszlop neve a fájlban (vagy a név más lehet egyes fájlokban) ...
* Van egy szintax hiba a kifejezésben (pl. hiányzó vagy extra ") ").

Ha elakad, vagy segítségre van szüksége,
Kérjük a részleteket, és lásd a mi [rész további támogatás megszerzéséről](/docs/intro#support) ...
        
###### &lt; destinationName Gt;{#destinationname-1} 
* [[szerkesztés]]&lt; destinationName &gt;&gt;&gt;&gt;&gt;&gt; (#destinationname) - a változó neve, amelyet bemutatnak és használnak ERDDAP™ felhasználók.
    * Ez a TIONAL. Ha hiányzik, [ sourceName ](#sourcename) használják.
    * Ez azért hasznos, mert lehetővé teszi, hogy megváltoztassa a kriptográfiai vagy furcsa sourceName ...
    *    destinationName érzékeny.
    *    destinationName S MUST kezd egy levelet (A-Z, a-z) és követni kell 0 vagy több karaktert (A-Z, a-z, 0-9 és \\_) ... ("-" megengedték korábban ERDDAP™ 1.10 verzió.) Ez a korlátozás lehetővé teszi, hogy az adatok változó nevei azonosak legyenek ERDDAP™ , a válaszfájlokban és az összes olyan szoftverben, ahol ezeket a fájlokat fogják használni, beleértve a programozási nyelveket is (mint Python , Matlab és Java Szövegek) ahol hasonló korlátozások vannak a változó nevekre.
    * EDDTable adatkészletekben, [Hosszúság, magasság, magasság (vagy mélység) és idő](#destinationname) Az adatok változói különlegesek.
             
###### &lt;adatok Type & gt;{#datatype} 
* [[szerkesztés]]&lt;adatType&gt;] (#datatype) - meghatározza a forrásból származó adattípust. (Bizonyos esetekben például az ASCII fájlokból származó adatok olvasásakor meghatározza, hogy a forrásból származó adatokat hogyan kell tárolni.) 
    * Ezt néhány adathalmaz típusa és mások által támasztott. Adattípusok, amelyek ezt megkövetelik a sajátjuk számára dataVariable S: EDDGrid FromXxxFiles, EDDTableFromXxFiles, EDDTableFromM WFS EDDTableFromNOS, EDDTableFrom SOS ... Más adatkészlettípusok figyelmen kívül hagyják ezt a címkét, mert megkapják az információkat a forrásból.
         
    * Az értékek bármelyike a szabványnak [ ERDDAP™ adattípusok](#data-types) plusz boolean (lásd alább) ... Az adattípus nevek esetérzékenyek.
         
###### boolean adatok{#boolean-data} 
*    ["boolean"](#boolean-data) különleges eset.
    * Internally, ERDDAP™ nem támogatja a boolean típust, mert a booleanok nem tárolhatják a hiányzó értékeket, és a legtöbb fájltípus nem támogatja a booleanokat. Szintén DAP nem támogatja a booleanokat, így nem lenne szabványos módja a boolean változók lekérdezésének.
    * "boolean" specifikálása az adatokhoz típus datasets.xml boolean értékeket kell tárolni és képviselni, mint bytes: 0=hamis, 1=igaz, 127= missing\\_value ...
    * A felhasználók korlátozódhatnak a számértékek használatával (Például: "isAlive=1") ...
    *    ERDDAP™ Az adminisztrátoroknak néha használniuk kell a "boolean" adatokat típus datasets.xml Mondd el ERDDAP™ hogyan kell kölcsönhatásba lépni az adatforrással (pl. a boolean értékek elolvasása a kapcsolati adatbázisból, és 0, 1 vagy 127-re átalakítja őket) ...
         
* Ha szeretné megváltoztatni az adat változót az adattípustól a forrásfájlokban (például rövid) más adatokba Típus az adatkészletben (például int) Ne használj&lt;adatType&gt; megadni, amit akar. (Néhány adatkészlet esetében működik, de nem mások.) Ehelyett:
    * Használat&lt;adatType&gt; megadni, mi van a fájlokban (például rövid) ...
    * A&lt; addAttributes &gt; a változó, add hozzá egy [ scale\\_factor ](#scale_factor) az új adatok tulajdonításához típus (például int) és az 1 érték, például
```
            <att name="scale\\_factor" type="int">1</att>  
```
######  dataVariable  &lt;addAttributes&gt; {#datavariable-addattributes} 
* [[szerkesztés]]&lt; addAttributes &gt;&gt;&gt;&gt;&gt;&gt; (# változó-addattributes) - meghatározza egy sor tulajdonságot ( *név* = *érték* ) amely hozzáadódik a forrás tulajdonságaihoz egy változó, hogy a kombinált tulajdonságok változó. Ez a TIONAL.
Ha a változó [Forrás: Forrás](#variable-addattributes) vagy&lt; addAttributes &gt; beleértve [ scale\\_factor vagy add\\_offset ](#scale_factor) attribútumok, értékeiket fogják használni, hogy kicsomagolja az adatokat a forrásból, mielőtt elosztják az ügyfélt. A nem csomagolt változó ugyanazon adattípus lesz (Például, float) mint scale\\_factor és add\\_offset értékek.
        
###### Variable&lt;addAttributes&gt; {#variable-addattributes} 
* [[szerkesztés]] ** Változatos tulajdonságok / változó&lt; addAttributes &gt; &gt; &gt; &gt; ** ] (# változó-addattributes) -&lt; addAttributes &gt; egy OPTIONAL tag egy&lt; axisVariable &gt; vagy&lt; dataVariable &gt; címke, amelyet a változó tulajdonságainak megváltoztatására használnak.
    
    *    ** Használjon egy változót&lt; addAttributes &gt; megváltoztatni a változó tulajdonságait. **  ERDDAP™ egyesíti a változó tulajdonságait az adatkészlet forrásából (** Forrás: Forrás **) és a változó**  addAttributes  **amit ti definiáltok datasets.xml   (amelyek prioritást élveznek) a változó "** kombinált tulajdonságok ** „Az, amik azok, ERDDAP™ A felhasználók látják. Így használható addAttributes a forrásAttributes értékeinek újraértékelése, új tulajdonságok hozzáadása vagy a tulajdonságok eltávolítása.
    * Lásd: ** &lt; addAttributes &gt; &gt; &gt; &gt; **információ] (#addattributes) amely a globális és változóra vonatkozik** &lt; addAttributes &gt; &gt; &gt; &gt; ** ...
    *    ERDDAP™ keresi és használja ezeket a tulajdonságokat különböző módon. Például a színBar értékek szükségesek ahhoz, hogy a változó elérhetővé váljanak WMS , hogy a térképek következetes színBars.
    *    [A hosszúság, a magasság, a magasság (vagy mélység) és az idő változók](#destinationname) sok megfelelő metaadat automatikusan (például, [egység](#units) ) ...
    * Egy minta&lt; addAttributes &gt; az adatok változója:

    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="actual\\_range" type="doubleList">10.34 23.91&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMinimum" type="double">0&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMaximum" type="double">32&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Surface Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="numberOfObservations" />  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  

Az üres számOfObservations tulajdonsága okozza a forrás számOfObservations tulajdonsága (ha valaki) eltávolítani a végső, kombinált tulajdonságok listájáról.
    * Ezen információk ellátása segít ERDDAP™ jobb munkát végezzen, és segít a felhasználóknak megérteni az adatkészleteket.
A jó metaadata felhasználható adatkészletet készít.
Az elégtelen metaadata haszontalanná teszi az adatkészletet.
Kérjük, vegye be az időt, hogy jó munkát végezzen a metaadat tulajdonságokkal.
    
###### Megjegyzések a változó tulajdonságokról, amelyek különlegesek ERDDAP :

######  actual\\_range  {#actual_range} 
*    [ ** actual\\_range ** ](#actual_range) a RECOMMENDED változó tulajdonsága. Például,

>    &lt;att name="actual\\_range" [type="floatList"](#attributetype)\\>0.17 23.58&lt;/att>

* Ez a tulajdonság a [CDC COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) és [CF 1.7+](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) metadata szabványok.
* Ha jelen van, akkor lehet egy sor két értéke ugyanazon adattípus, mint a rendeltetési adatok típusa változó, meghatározva a tényleges (nem elméleti vagy megengedett) az ilyen változó adatok minimális és maximális értékei.
* Ha az adatok tele vannak [ scale\\_factor vagy add\\_offset ](#scale_factor) , actual\\_range kicsomagolt értékekkel kell rendelkeznie, és ugyanolyan adattípusúnak kell lennie, mint a nem csomagolt értékek.
* Néhány adatforráshoz (Például minden EDDTableFrom... Files adatkészletek) , ERDDAP™ határozza meg actual\\_range minden változó és beállítja actual\\_range tulajdonság. Más adatforrásokkal (például kapcsolati adatbázisok, Cassandra, DAP PER, Hyrax ) , lehet, hogy nehéz vagy terhelő a forrás, hogy kiszámítsa a tartomány, így ERDDAP™ nem kéri. Ebben az esetben a legjobb, ha beállíthatja actual\\_range   (különösen a hosszúság, a szélesség, a magasság, a mélység és az idő változói) hozzáadásával egy actual\\_range minden változónak tulajdonítva [&lt; addAttributes &gt;&gt;&gt;&gt;&gt;&gt; (#addattributes) ez az adatkészlet datasets.xml Például,

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>-180 180&lt;/att>

* numerikus [Idő és időbélyegző változók](#time-units) A megadott értékeknek a megfelelő forrásnak kell lenniük (nem rendeltetés) numerikus értékek. Például, ha a forrásidő értékeit "napként 1985-01-01" tárolják, akkor a actual\\_range Meg kell határozni a "napok óta 1985-01-01". És ha azt szeretné, hogy hivatkozzon a MOST, mint a második értéke a közeli valós idejű adatok, hogy rendszeresen frissítik, akkor használja NaN . Például, hogy megadja az 1985-01-17-es adattartományt, amíg nem, használjon

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>16 NaN&lt;/att>

* Ha actual\\_range Ismert (vagy ERDDAP™ kiszámítása, vagy ha hozzáadja azt keresztül&lt; addAttributes &gt;), ERDDAP™ megjeleníti a felhasználónak az adathozzáférési formában ( * datasetID * .html) Készítsen egy Graph weboldalt ( * datasetID * .gráf) az adatkészlet és használja az FGDC és az ISO 19115 metaadatok generálásakor. Az utolsó 7 napos idő actual\\_range az alapértelmezett idő alkészletként használják.
* Ha actual\\_range Ismert, a felhasználók használhatják a [b) () és max () funkciók](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min) kérések esetén, ami gyakran nagyon hasznos.
* Minden EDDTable... adatkészletek, ha actual\\_range Ismert (vagy megadja, vagy ERDDAP™ kiszámítása) , ERDDAP™ képesek lesznek gyorsan elutasítani az adott tartományon kívüli adatok iránti kérelmeket. Például, ha az adatkészlet legalacsonyabb időértéke megfelel az 1985-01-17-nek, akkor az 1985-01-01-től 1985-01-16-ig terjedő összes adatkérelmet azonnal elutasítják az „A lekérdezés nem hozott megfelelő eredményeket.” Ez teszi actual\\_range egy nagyon fontos metaadata, mivel megmentheti ERDDAP™ sok erőfeszítést és sok időt takarít meg a felhasználónak. És ez kiemeli, hogy a actual\\_range az értékek nem szűkebbek, mint az adatok tényleges tartománya; különben ERDDAP™ téves mondás "Nincs megfelelő adat", ha valójában releváns adatok vannak.
* Amikor egy felhasználó kiválaszt egy adatkészletet, és olyan fájltípust kér, amely magában foglalja a metaadatot (például, .nc ) , ERDDAP™ Módosítás actual\\_range a válaszfájlban, hogy tükrözze az alkészlet tartományát.
* Lásd még [ data\\_min és data\\_max ](#data_min-and-data_max) , amelyek alternatív módja annak, hogy meghatározza a actual\\_range ... Azonban ezek most eltökéltek, hogy actual\\_range a CF 1.7+.
         
###### Color Bar tulajdonságok{#color-bar-attributes} 
Számos OPTIONAL változó tulajdonság létezik, amelyek meghatározzák a javasolt alapértelmezett tulajdonságokat egy színes bár számára (az adatértékek konvertálása a színekbe a képeken) ehhez a változóhoz.
* Ha jelen van, ezt az információt a griddap és tabledap Amikor olyan képet kér, amely színes bárot használ.
* Például, ha a szélességi hálós adatok egy térképen lefedettségként kerülnek elhelyezésre, a színes bár meghatározza, hogy az adatértékek hogyan alakíthatók át a színekre.
* Ezeknek az értékeknek köszönhetően lehetővé válik ERDDAP™ olyan képek létrehozása, amelyek konzisztens színvonalat használnak különböző kéréseken keresztül, még akkor is, ha az idő vagy más dimenzió értékek változnak.
* Ezeket a tulajdonságneveket a használatra hozták létre ERDDAP ... Ezek nem egy metaadat szabványból származnak.
* A színes bárhoz kapcsolódó tulajdonságok:
    *    ** colorBarMinimum ** meghatározza a minimális értéket a színBar. Például,

    >    &lt;att name="colorBarMinimum" [type="double"](#attributetype)\\>-5&lt;/att>  

    * Ha az adatok tele vannak [ scale\\_factor vagy add\\_offset ](#scale_factor) Adja meg a colorBarMinimum nem csomagolt értékként.
    * Az adatérték alacsonyabb, mint colorBarMinimum ugyanaz a szín képviseli, mint colorBarMinimum értékek.
    * A tulajdonságnak kell lennie [Type="double"](#attributetype) az adatváltozat típusától függetlenül.
    * Az érték általában egy szép körszám.
    * Legjobb gyakorlatok: Javasoljuk, hogy az érték valamivel magasabb legyen, mint a minimális adatérték.
    * Nincs alapértelmezett érték.
*    ** colorBarMaximum ** meghatározza a színesBar maximális értéket. Például,

    >    &lt;att name="colorBarMaximum" [type="double"](#attributetype)\\>5&lt;/att>  

    * Ha az adatok tele vannak [ scale\\_factor vagy add\\_offset ](#scale_factor) Adja meg a colorBarMinimum nem csomagolt értékként.
    * Adatértékek magasabbak, mint colorBarMaximum ugyanaz a szín képviseli, mint colorBarMaximum értékek.
    * A tulajdonságnak kell lennie [Type="double"](#attributetype) az adatváltozat típusától függetlenül.
    * Az érték általában egy szép körszám.
    * Legjobb gyakorlatok: Javasoljuk, hogy az érték valamivel alacsonyabb legyen, mint a maximális adatérték.
    * Nincs alapértelmezett érték.
*    **szín BarPalette** meghatározza a palettát a színBar számára. Például,
    ```
            <att name="colorBarPalette">WhiteRedBlack</att>
    ```
    * Minden ERDDAP™ a telepítések támogatják ezeket a szabványos palettákat: BlackBlueWhite, BlackRedWhite, BlackWhite, BlueWhiteRed, LightRainbow, Ocean, OceanDepth, Rainbow, RedWhiteBlue, ReverseRainbow, Topography, TopographyDepth \\[ hozzáadott v1.74 \\] WhiteBlack, WhiteBlueBlack és WhiteRedBlack.
    * Ha telepített [további paletták](/docs/server-admin/additional-information#palettes) Ön egyikükre hivatkozhat.
    * Ha ez a tulajdonság nem jelenik meg, az alapértelmezett BlueWhiteRed, ha \\-1\\* colorBarMinimum = colorBarMaximum egyébként az alapértelmezés Rainbow.
*    **színesBarScale** meghatározza a színesBar méretét. Például,
    ``` 
            <att name="colorBarScale">Log</att>
    ```
    * Az értékek a lineárisak és a Log.
    * Ha az érték a Log, colorBarMinimum nagyobbnak kell lennie, mint 0.
    * Ha ez a tulajdonság nem jelenik meg, az alapértelmezett a Linear.
*    **szín BarContinuous** meghatározza, hogy a színBar folyamatos színpaletta-e, vagy hogy a színBarnak van-e néhány diszkrét színe. Például,
    ```
            <att name="colorBarContinuous">false</att>
    ```
    * Az értékes értékek igazak és hamisak.
    * Ha ez a tulajdonság nem jelenik meg, az alapértelmezés igaz.
*    **színBarNSections** meghatározza az alapértelmezett számát a színBar. Például,
    ```
            <att name="colorBarNSections" type="int">6</att>
    ```
    * Az értékek pozitív integrációk.
    * Ha ez a tulajdonság nem jelenik meg, az alapértelmezett \\-1, ami azt mondja ERDDAP™ a színesBar tartományán alapuló szakaszok számának kiválasztása.
######  WMS  {#wms} 
A változó fő követelményei, amelyek elérhetőek a ERDDAP A WMS szerver:
* Az adatkészletnek kell lennie EDDGrid ... adatkészlet.
* Az adatok változó MUST lehet egy rácsos változó.
* Az adatok változó MUST van hosszúságú és szélességi tengely változók. (Más tengelyváltozatok a TIONAL.) 
* Van valami hosszúsági érték -180 és 180 között.
* A colorBarMinimum és colorBarMaximum az MUST tulajdonságait meg kell határozni. (Más színes bár tulajdonságok OPTIONAL.) 

######  data\\_min és data\\_max  {#data_min-and-data_max} 
*    [ ** data\\_min ** és ** data\\_max ** ](#data_min-and-data_max) - Ezek a világ Ocean Circulation Experimentben meghatározott változó tulajdonságok (WOCE) metadata leírás. Például,

    >    &lt;att name="data\\_min" [type="float"](#attributetype)\\>0.17&lt;/att>  
    >    &lt;att name="data\\_max" [type="float"](#attributetype)\\>23.58&lt;/att>

    * Javasoljuk, hogy használja [ actual\\_range ](#actual_range) helyette data\\_min és data\\_max mert actual\\_range most a CF specifikációja határozza meg.
    * Ha jelen van, ugyanazon adattípusnak kell lennie, mint a változó céladattípusnak, és meghatározza a tényleges (nem elméleti vagy megengedett) az ilyen változó adatok minimális és maximális értékei.
    * Ha az adatok tele vannak [ scale\\_factor vagy add\\_offset ](#scale_factor) , data\\_min és data\\_max kicsomagolt értékeknek kell lenniük a csomagolatlan adattípus használatával.
         
###### változó drawLandMask  {#variable-drawlandmask} 
*    [ ** drawLandMask ** ](#variable-drawlandmask) - Ez egy OPTIONAL változó tulajdonság, amelyet a ERDDAP™   (és nem metadata szabványok) amely meghatározza a "Draw Land Mask" alapértelmezett értéket az adatkészlet Make A Graph formanyomtatványán ( * datasetID * .gráf) és a &.land paraméter egy URL-ben, amely az adatok térképét kéri. Például,
    ```
        <att name="drawLandMask">under</att>  
    ```
Lásd: [ drawLandMask Áttekintés](#drawlandmask) ...
###### kódolás{#encoding} 
*    [ **\\_Encoding** ](#encoding) 
    * Ez a tulajdonság csak String változókkal használható.
    * Ez a tulajdonság erősen ajánlott.
    * Ez a tulajdonság a [ NetCDF Felhasználói útmutató (NUG) ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html) ...
    * Internally belül ERDDAP™ , Strings egy sor 2 fehér karakter, hogy használja a [Unicode UCS-2 karakterkészlet](https://en.wikipedia.org/wiki/UTF-16) ...
    * Számos fájl csak 1 fehér karaktert támogat a Strings-ben, és ezért szükség van erre a tulajdonságra, hogy azonosítsa a kapcsolódó
         [Charset (AKA kódoldal) ](https://en.wikipedia.org/wiki/Code_page) amely meghatározza, hogyan térképezze fel a 256 lehetséges értékeket egy 256 karakterből álló karakterből és / vagy a kódolási rendszerből, például [UTF-8](https://en.wikipedia.org/wiki/UTF-8)   (amely 1 és 4 byte karakterenkénti) ...
    * Az értékek a \\_Encoding esetében érzékenyek.
    * Elméletben, ERDDAP™ támogathatná a \\_Encoding azonosítókat [IANA lista](https://www.iana.org/assignments/character-sets/character-sets.xhtml) De a gyakorlatban, ERDDAP™ Jelenleg csak támogatások
        * ISO-8859-1 (jegyezze meg, hogy dashes, nem alscores) , amely előnye, hogy azonos az első 256 karakter Unicode, és
        * UTF-8.
    * A forrásfájlok olvasásakor az alapértelmezett érték az ISO-8859-1, kivéve a netcdf-4 fájlokat, ahol az alapértelmezett UTF-8.
    * Ez egy folyamatban lévő gondos probléma, mert sok forrásfájl olyan charseteket vagy kódolásokat használ, amelyek különböznek az ISO-8859-1-től, de nem azonosítják a charset-et vagy kódolást. Például számos forrásadatfájlnak van néhány metaadata másolta és pazarolta a Microsoft Word-t a Windows-on, így fancy hyphens és apostrophes a Windows-specifikus charset helyett az ASCII hyphens és az apostrophes. Ezek a karakterek aztán furcsa karakterként vagy "?"-ként jelennek meg ERDDAP ...
         
###### AccessBaseUrl{#fileaccessbaseurl} 
*    ** [AccessBaseUrl](#fileaccessbaseurl) fájl AccessSuffix** Nagyon ritkán használják azokat a tulajdonságokat, amelyek nem bármilyen szabványból származnak. Ha egy EDDTable oszlop rendelkezik a webes hozzáférhető fájlok fájlneveivel (pl. kép, videó vagy audio fájlok) Hozzáadhat
```
    <att name="fileAccessBaseUrl">*someBaseURL*</a>  
```
a bázis URL megadásához (befejezés /) szükséges, hogy a fájlnév teljes URL-ek. Szokatlan esetekben, például amikor egy oszlop hivatkozik a .png fájlokra, de az értékek hiányoznak ".png", hozzáadhatja
```
    <att name="fileAccessSuffix">*someSuffix*</a>  
```
(például&lt;att name="fileAccessSuffix"&gt;.png&lt;/a&gt;)
megadni egy kelléket, hogy a fájlnév teljes URL-be kerüljön. Aztán .htmlTable válaszok, ERDDAP™ megjeleníti a fájlnév, mint a teljes URL-hez való kapcsolódás (az alap Url plusz a fájlnév plusz a elegendő) ...

Ha akarod ERDDAP™ a kapcsolódó fájlok kiszolgálása, külön [EDDTableFromFileNames](#eddtablefromfilenames) adatkészlet ezekhez a fájlokhoz (lehet magán adatkészlet) ...
    
###### AccessArchive Url{#fileaccessarchiveurl} 
*    [ **AccessArchive Url** ](#fileaccessarchiveurl) egy nagyon ritkán használt tulajdonság, amely nem bármilyen szabványból származik. Ha egy EDDTable oszlop rendelkezik a webes hozzáférhető fájlok fájlneveivel (pl. kép, videó vagy audio fájlok) amely egy archívumon keresztül elérhető (pl.: .zip fájl) hozzáférhető egy URL-en keresztül, használat&lt;att name="fileAccessArchiveUrl" *URL* &lt;/att&gt; megadni az URL-t az archívumnak.
    
Ha akarod ERDDAP™ hogy szolgálja az archív fájlt, készítsen külön [EDDTableFromFileNames](#eddtablefromfilenames) adatkészlet ehhez a fájlhoz (lehet magán adatkészlet) ...
    
######  ioos\\_category  {#ioos_category} 
*    [ ** ioos\\_category ** ](#ioos_category) - Ez egy REQUIRED változó tulajdonság, ha&lt;változókMustHaveIoosCategory&gt; igaz (az alapértelmezett) benne [setup.xml](/docs/server-admin/deploy-install#setupxml) Máskülönben ez a TIONÁLIS.
Például,&lt;att name=" ioos\\_category Salinitás&lt;/att&gt;
A kategóriák a [ NOAA Integrált óceán megfigyelő rendszer (IOOS) ](https://ioos.noaa.gov/) ...
    
    *    (Írni ezt) Nem vagyunk tudatában ezeknek a neveknek a formális meghatározásainak.
    * A fő nevek Zdenka Willis .ppt "Integrált Ocean Observing System (IOOS)   NOAA "A kezdeti működési képesség létrehozásának megközelítése" és [US IOOS Blueprint](https://www.iooc.us/wp-content/uploads/2010/11/US-IOOS-Blueprint-for-Full-Capability-Version-1.0.pdf)   (oldal 1-5) ...
    * Valószínű, hogy a listát a jövőben felül fogják vizsgálni. Ha van kérése, kérjük, e-mailben Chris. John at noaa.gov.
    *    ERDDAP™ támogatja a kategóriák nagyobb listáját, mint az IOOS, mert a Bob Simons további neveket adott (főként tudományos területek nevein alapul, például Biológia, Ekológia, Meteorológia, Statisztika, Taxonómia) más típusú adatok esetében.
    * A jelenlegi érvényes értékek ERDDAP™ Bathymetria, Biológia, alsó karakter, CO2, színes feloldott szerves anyag, szennyező anyagok, áramlók, feloldott tápanyagok, szétválasztott O2, ökológia, halak bőség, halak fluxus, hidrológia, jég elosztás, lakhely, meteorológia, optikai tulajdonságok, egyéb, pathogens, Phytoplankton Species, Pressure, Productivity, Minőség, Szalinitás, Level
    * Van néhány átfedés és kétértelműség különböző kifejezések között - tedd a legjobbat.
    * Ha hozzáad ioos\\_category a listára&lt; categoryAttributes &gt; &gt; &gt; &gt; benne ERDDAP A [setup.xml](/docs/server-admin/deploy-install#setupxml) fájl, a felhasználók könnyen megtalálhatják az adatkészleteket hasonló adatokkal ERDDAP "Search for Datasets by Kategória" a honlapon.
         [Próbálja ki használni ioos\\_category az érdeklődés adatkészleteinek keresése.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000) 
    * Ott volt [egy beszélgetésről ERDDAP™ és ioos\\_category a ERDDAP™ Google Group.](https://groups.google.com/forum/#!topic/erddap/TnwbgzpSS0w) 
    
Lehet, hogy kísértés van beállítva&lt;változókMustHaveIoosCategory&gt; hamis, hogy ez a tulajdonság nem szükséges. ("Pfft&#33; Mi ez nekem?”) Néhány ok arra, hogy elhagyja azt igaznak (az alapértelmezett) Használat ioos\\_category a következők:
    
    * Ha a setup.xml&lt;változókMustHaveIoosCategory&gt; igaznak van állítva, [GenerateDatasetsXml](#generatedatasetsxml) mindig létrehozza/bocsát egyet ioos\\_category minden változó tulajdonsága minden új adatkészletben. Miért ne hagyja csak be?
    *    ERDDAP™ lehetővé teszi a felhasználók számára, hogy kategória szerint keressék az érdeklődési eszközöket. ioos\\_category egy nagyon hasznos keresési kategória, mert az ioos\\_categories (például a hőmérséklet) meglehetősen szélesek. Ez teszi ioos\\_category sokkal jobb erre a célra, mint például a sokkal finomabb CF standard\\_name s (amelyek nem annyira jók erre a célra, mert az összes szinonimák és enyhe variációk, például a tenger\\_surface\\_temperature versus tenger\\_water\\_temperature) ...
(Használás ioos\\_category erre a célra az ellenőrzése alatt áll&lt; categoryAttributes &gt; a setup.xml fájlban.)
         [Próbálja ki használni ioos\\_category az érdeklődés adatkészleteinek keresése.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000) 
    * Ezek a kategóriák [ NOAA Integrált óceán megfigyelő rendszer (IOOS) ](https://ioos.noaa.gov/) ... Ezek a kategóriák alapvető fontosságúak az IOOS küldetésének leírásához. Ha benne vagy NOAA támogatás ioos\\_category jó Egy-egy NOAA dolgod. (Nézd meg ezt [Egyetlen NOAA videó](https://www.youtube.com/watch?v=nBnCsMYm2yQ) és légy inspiráló&#33;) Ha Ön más amerikai vagy nemzetközi ügynökségben vagy kormányzati ügynökségekkel dolgozik, vagy más Ocean Observing System-rel dolgozik, nem jó ötlet együttműködni az Egyesült Államok IOOS irodájával?
    * Előbb vagy utóbb, lehet, hogy mást akarsz ERDDAP™ az adatkészletekhez való kapcsolódás [ EDDGrid FromErdap](#eddfromerddap) és [EDDTableFromErddap](#eddfromerddap) ... Ha a másik ERDDAP™ követelmények ioos\\_category Az adatkészleteknek rendelkezniük kell ioos\\_category a EDDGrid FromErddap és EDDTableFromErddap dolgozni.
    * Ez pszichológiailag sokkal könnyebb bevonni ioos\\_category amikor létrehozod az adatkészletet (ez csak egy másik dolog, amit ERDDAP™ szükséges az adatkészlet hozzáadásához ERDDAP ) , mint hozzáadni a tény után (ha úgy döntött, hogy használja a jövőben) ...
         
######  long\\_name  {#long_name} 
*    [ ** long\\_name ** ](#long_name)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) , [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) és [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabványok) a RECOMMENDED változó tulajdonsága ERDDAP ... Például,
    ```
        <att name="long\\_name">Eastward Sea Water Velocity</att>
    ```
    *    ERDDAP™ Használja a long\\_name a grafikonok címkézésére.
    * Legjobb gyakorlatok: Kapitalizálja a szavakat a szavakban long\\_name mintha ez lenne egy cím (kapitalizálja az első szót és az összes nem ritka szót) ... Ne tartalmazza az egységeket a long\\_name ... A hosszú név nem lehet nagyon hosszú (általában)&lt;20 karakter), de le kell írni, mint [ destinationName ](#destinationname) - ami gyakran nagyon tömör.
    * Ha " long\\_name "Nem definiálódik a változóban [Forrás: Forrás](#variable-addattributes) vagy&lt; addAttributes &gt;, ERDDAP™ létrehozza azt azáltal, hogy megtisztítja a [ standard\\_name ](#standard_name)   (ha jelen van) vagy destinationName ...
         
######  missing\\_value  {#missing_value} 
*    [ ** missing\\_value ** ](#missing_value) és **\\_Töltés Érték**   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) és [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) ) változó tulajdonságok, amelyek leírják a számot (például -9999) amelyet a hiányzó érték képviselésére használnak. Például,

>  &lt;att name="missing\\_value" [type="double"](#attributetype)\\>-9999&lt;/att>  

For String változók, az alapértelmezett mindketten "" (Az üres sztring) ...
A numerikus változók esetében mindkét alapértelmezés a NaN.
*    ERDDAP™ mindkettő támogatása missing\\_value és a \\_FillValue, mivel egyes adatforrások kissé eltérő jelentéseket adnak nekik.
* Ha jelen van, ugyanolyan adattípusnak kell lenniük, mint a változó.
* Ha az adatok tele vannak [ scale\\_factor vagy add\\_offset ](#scale_factor) A missing\\_value A \\_FillValue értékeket hasonlóképpen csomagolni kell. Hasonlóképpen, egy oszlopban a String dátum / idő értékek, hogy használja a helyi [ time\\_zone ](#time_zone) A missing\\_value A \\_FillValue értékeknek a helyi időzónát kell használniuk.
* Ha egy változó használja ezeket a különleges értékeket, a missing\\_value és/vagy a \\_FillValue tulajdonságai REQUIRED.
* Mert [Idő és időbélyegző változók](#time-units)   (hogy a forrás húr vagy numerikus) , missing\\_value s és \\_FillValues úgy tűnik, mint "" (Az üres sztring) Amikor az idő meg van írva, mint egy String, és mint NaN, amikor az idő meg van írva, mint egy kettős. A forrásértékek a missing\\_value \\_FillValue nem jelenik meg a változó metaadatában.
* A változók erősítése érdekében, ERDDAP™ mindig megtérít missing\\_value s vagy \\_FillValue adatértékek "" (Az üres sztring) ... A forrásértékek a missing\\_value \\_FillValue nem jelenik meg a változó metaadatában.
* numerikus változók esetében:
A missing\\_value \\_FillValue megjelenik a változó metaadatában.
Néhány kimeneti adatformátum esetében, ERDDAP™ elhagyja ezeket a különleges számokat, például látni fogja -9999.
Más kimeneti adatformátumokhoz (különösen szövegszerű formátumok, mint .csv és .htmlTable ) , ERDDAP™ helyettesíti ezeket a különleges számokat a NaN-vel vagy a ".
* Egyes adattípusok olyan hiányzó értékjelzőket tartalmaznak, amelyek nem kell kifejezetten azonosítani a missing\\_value vagy a \\_FillValue tulajdonságai: a float és a dupla változók NaN (Nem szám) A String értékek az üres sztringet használják, és a char értékek karakterrel rendelkeznek \\uffff   (#65535 karakter, amely az Unicode értéke nem egy karakter számára) ... Az Integer adattípusok nem rendelkeznek belső hiányzó értékjelzőkkel.
* Ha egy integráló változónak hiányzó értéke van (Például egy üres pozíció egy .csv fájlban) , ERDDAP™ értelmezni fogja az értéket, mint a meghatározott missing\\_value vagy \\_FillValue ehhez a változóhoz. Ha senkit nem definiálnak, ERDDAP™ értelmezni fogja az értéket, mint az adott adattípus alapértelmezett hiányzó értéket, amely mindig a maximális érték, amelyet az adattípus megtarthat:
127 byte variables, 32767 rövid, 2147483647 int, 92233720368547807 hosszú ideig,
255 ubyte, 65535 a ushort számára, 4294967295 az uint számára, és 18446744073709551615 az ulong számára.
######  ADD \\_FillValue ATTRIBUTES ?{#add-_fillvalue-attributes} 
*    [ ADD \\_FillValue ATTRIBUTES ?](#add-_fillvalue-attributes)   
Minden alkalommal ERDDAP™ adatkészlet betöltése, ellenőrzi, hogy az integrált forrásadatokkal rendelkező változók meghatározottak-e missing\\_value vagy \\_FillValue tulajdonság. Ha egy változó nem, akkor ERDDAP™ kinyomtat egy üzenetet a logfájlhoz ("Add \\_FillValue Attribute?") ajánljuk, hogy ERDDAP™ adminisztrátor hozzáad egy \\_Fill Érték tulajdonsága ennek a változónak datasets.xml ... Nagyon hasznos minden változó számára, hogy \\_FillValue vagy missing\\_value mert a hiányzó értékek mindig lehetségesek, például, ha egy adott fájl egy adatkészletben nem rendelkezik eltérő, ERDDAP™ képesnek kell lennie arra, hogy ezt a változót bemutassa, mivel minden hiányzó értéke van a változó számára. Ha úgy dönt, hogy a változó nem rendelkezik \\_FillValue tulajdonsággal, akkor hozzáadhatja
    &lt;att nevek="\\_FillValue"&gt;null&lt;/att&gt; helyett, amely elnyomja az üzenetet erre datasetID + változó kombináció a jövőben.
    
Minden alkalommal ERDDAP™ kezdődik, összegyűjti az összes ajánlást egy üzenetbe, amelyet a logfájlhoz írnak (Kezdőlap » ADD \\_FillValue ATTRIBUTES ?”) e-mailben ERDDAP™ adminisztrátor, és egy CSV adatfájlra írt \\[ bigParentDirectory[szerkesztés] \\] /logs/ könyvtár. Ha szeretné, akkor használja a GenerateDatasetsXml programot (és az AddFillValueAttributes opció) az összes javaslat alkalmazása a CSV fájlban a datasets.xml fájl. bármelyiknek datasetID / változó kombinációk a fájlban, ha úgy dönt, nincs szükség hozzáadni a tulajdonított, akkor megváltoztathatja a tulajdonságot, hogy&lt;att nevek="\\_FillValue"&gt;null&lt;/att&gt; elnyomni az erre vonatkozó ajánlást datasetID + változó kombináció a jövőben.
    
Ez fontos&#33;
Ahogy Bob gyakran mondta: rossz lenne (és kínos) ha a globális felmelegedés néhány bizonyítékát az adatok azonosítatlan hiányzó értékei okozták (pl. 99 vagy 127 fokos hőmérséklet-értékek C, hogy kellett volna jelezni, mint hiányzó értékek, és így elnyomta az eszköz és/vagy medián statisztika magasabb) ...

* A \\_FillValue és missing\\_value az adott változó értékek különböző forrásfájlokban következeteseknek kell lenniük; különben ERDDAP™ fogadja el a fájlokat egy sor értékkel, és utasítsa el az összes többi fájlt "Bad Files". A probléma megoldásához,
    * Ha a fájlokat megrúgják .nc fájlokat, használhat [ EDDGrid FromNcFilesUnpack](#eddgridfromncfilesunpacked) ...
    * Ha a fájlok mesés adatfájlok, használhatja az EDDTableFrom... Fájlok "..." [szabványosítás Amit](#standardizewhat) Mondd el ERDDAP szabványosítani a forrásfájlokat, ahogy olvassák ERDDAP ...
    * Keményebb problémák esetén használhat [NcML](#ncml-files) vagy [ NCO ](#netcdf-operators-nco) megoldani a problémát.
             
######  scale\\_factor  {#scale_factor} 
*    [ ** scale\\_factor ** ](#scale_factor)   (default = 1) és ** add\\_offset **   (default = 0)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) és [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) ) OPTIONAL változó tulajdonságok, amelyek leírják azokat az adatokat, amelyeket egyszerűbb adattípusban csomagolnak egy egyszerű átalakuláson keresztül.
    * Ha jelen van, az adattípusuk különbözik a forrásadat típusától, és leírja a rendeltetési értékek adattípusát.
Például egy adatforrás lehetett tárolni float adatértékek egy decimális számjegy csomagolt, mint rövid ints (Int16) Használat scale\\_factor = 0,1 és add\\_offset = 0. Például,

    >    &lt;att name="scale\\_factor" [type="float"](#attributetype)\\>0.1&lt;/att>  
    >    &lt;att name="add\\_offset" [type="float"](#attributetype)\\>0&lt;/att>  

Ebben a példában, ERDDAP™ kicsomagolja az adatokat, és bemutatja a felhasználónak, mint a float adatértékek.
    * Ha jelen van, ERDDAP™ kivonja az értékeket ezekből a tulajdonságokból, távolítsa el a tulajdonságokat, és automatikusan kicsomagolja a felhasználó adatait:
célállomás Érték = forrás Érték \\* scale\\_factor + add\\_offset   
Vagy másképp fogalmazva:
UnpackedValue = csomagolás Érték \\* scale\\_factor + add\\_offset 
    * A scale\\_factor és add\\_offset az adott változó értékek különböző forrásfájlokban következeteseknek kell lenniük; különben ERDDAP™ fogadja el a fájlokat egy sor értékkel, és utasítsa el az összes többi fájlt "Bad Files". A probléma megoldásához,
        * Ha a fájlokat megrúgják .nc fájlokat, használhat [ EDDGrid FromNcFilesUnpack](#eddgridfromncfilesunpacked) ...
        * Ha a fájlok mesés adatfájlok, használhatja az EDDTableFrom... Fájlok "..." [szabványosítás Amit](#standardizewhat) Mondd el ERDDAP szabványosítani a forrásfájlokat, ahogy olvassák ERDDAP ...
        * Keményebb problémák esetén használhat [NcML](#ncml-files) vagy [ NCO ](#netcdf-operators-nco) megoldani a problémát.
             
######  standard\\_name  {#standard_name} 
*    [ ** standard\\_name ** ](#standard_name)   (a [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) metadata szabvány) a RECOMMENDED változó tulajdonsága ERDDAP ... A CF fenntartja az engedélyezett listát [CF szabvány neve](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) ... Például,
    ```
        <att name="standard\\_name">eastward\\_sea\\_water\\_velocity</att>
    ```
    * Ha hozzáad standard\\_name a változók tulajdonságai és hozzáadása standard\\_name a listára&lt; categoryAttributes &gt; &gt; &gt; &gt; benne ERDDAP A [setup.xml](/docs/server-admin/deploy-install#setupxml) fájl, a felhasználók könnyen megtalálhatják az adatkészleteket hasonló adatokkal ERDDAP "Search for Datasets by Kategória" a honlapon.
    * Ha megadja a CF-t standard\\_name Változékony, a változó egységeknek tulajdonítható egységeknek nem kell azonosnak lenniük a CF Standard Name táblázatban meghatározott kánonikus egységekkel, de a MUST egységeket át kell alakítani a kánonikus egységek számára. Például az összes hőmérséklethez kapcsolódó CF standard\\_name "K" (Kelvin) mint a kanonikus egységek. Tehát változó a hőmérséklethez kapcsolódó standard\\_name MUST van egy egység K, fokozat\\_C, fokozat\\_F, vagy néhány UDUnits változata ezeknek a neveknek, mivel ők mind interkonvertálható.
    * Legjobb gyakorlatok: A hatalom egy része [ellenőrzött szókincsek](https://en.wikipedia.org/wiki/Controlled_vocabulary) csak a listán szereplő feltételeket használja. Ezért javasoljuk, hogy ragaszkodjon az ellenőrzött szókincsben meghatározott feltételekhez, és javasoljuk, hogy tegyen fel egy kifejezést, ha nincs megfelelő a listában. Ha további feltételekre van szüksége, nézze meg, hogy a szabványok bizottsága hozzáadja-e őket az ellenőrzött szókincshez.
    *    standard\\_name Az értékek az egyetlen CF-értékek, amelyek érzékenyek. Ők mindig mind alsóbbrendűek. Kezdőlap ERDDAP™ v1.82, GenerateDatasets átalakítja a felsőkategóriás betűket az alsó levélbe. És amikor egy adatkészlet be van töltve ERDDAP A felsőkategóriás betűk csendben változnak az alsó betűkre.
         
######  time\\_precision  {#time_precision} 
*    time\\_precision egy OPTIONAL tulajdonság, amelyet a ERDDAP™   (és nem metadata szabványok) Mert [Idő és időbélyegző változók](#time-units) , amely megfogott adatkészletekben vagy mesés adatkészletekben lehet, és axisVariable vagy dataVariable S. Például,
    ```
        <att name="time\\_precision">1970-01-01</att>  
    ```
     time\\_precision meghatározza a precizitást, amelyet akkor kell használni, ha ERDDAP™ formázza az időértékeket ebből a változóból, mint a hálóoldalak, beleértve .htmlTable válaszok. Olyan fájlformátumokban, ahol ERDDAP™ formázási idők, mint sztringek (például .csv és .json ) , ERDDAP™ csak használja time\\_precision -specifikus formátum, ha frakcionális másodperceket tartalmaz; egyébként, ERDDAP™ használja az 1970-01-01T00:00 Z formátum.
* Érvényes értékek 1970-01, 1970-01-01, 1970-01-01T00Z, 1970-01-01T00Z, 1970-01-01T00:00Z (az alapértelmezett) , 1970-01-01T00:00:00:00.0Z, 1970-01-01T00:00:00,00Z, 1970-01-01T00:00:00.000Z. \\[ 1970 nem egy lehetőség, mert ez egy szám, így ERDDAP™ nem tudja, hogy ez egy formázott idő húr (év) vagy ha az 1970-01-01T00:00Z óta néhány másodperc. \\] 
* Ha time\\_precision nem meghatározott, vagy az érték nem egyezik, az alapértelmezett értéket fogják használni.
* Itt, mint más részein ERDDAP™ A nem megjelenített formázott idő bármely területét feltételezik, hogy minimális értéke van. Például 1985-07, 1985-07-01, 1985-07-01T00Z, 1985-07-01T00:00Z és 1985-07-01T00:00 A Z mind egyenértékűnek tekinthető, bár a pontosság különböző szintjével. Ez megfelel a [ISO 8601:2004 "extended" Időforma specifikáció](https://www.iso.org/iso/date_and_time_format) ...
*    **WARNING:** Csak korlátozottan kell használnia time\\_precision ha **Minden** a változó adatértékeknek csak minimális értéke van az összes rejtett mező számára.
    * Például használhatsz egy time\\_precision 1970-01-01, ha az összes adatérték órá=0, perc=0 és második=0 (Például 2005-03-04T00:00Z és 2005-03-05T00:00Z) ...
    * Például ne használjon time\\_precision 1970-01-01, ha nincs 0 óra, perc vagy másodperc értékek, (Például 2005-03-05T12:00Z) mert a nem default órás érték nem jelenik meg. Ellenkező esetben, ha egy felhasználó kéri az összes adatot az idő=2005-03-05, a kérés nem sikerül váratlanul.
             
######  time\\_zone  {#time_zone} 
*    [ ** time\\_zone ** ](#time_zone) 
    *    time\\_zone egy OPTIONAL tulajdonság, amelyet a ERDDAP™   (és nem metadata szabványok) Mert [Idő és időbélyegző változók](#time-units) , amely rácsos adatkészletekben vagy tabuláris adatkészletekben lehet.
    * Az alapértelmezett " Zulu "..." (amely a GMT modern időzóna verziója) ...
    * Háttérinformáció: "idős ofszets" (pl. Pacific Standard Time, -08:00, GMT-8) rögzített, specifikus, ellentmondások Zulu   (GMT) ... Ezzel szemben a "időzónák" sokkal összetettebb dolgok, amelyek befolyásolják a Daylight Saving (pl. „US/Pacific”) , amelyeknek különböző szabályok vannak különböző helyeken különböző időpontokban. Az időzónáknak mindig vannak nevei, mivel nem lehet egy egyszerű ofset értékkel összefoglalni (lásd a "TZ adatbázis nevek" oszlopot az asztalon [https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) ) ... ERDDAP A time\\_zone attribute segít kezelni a helyi időadatokat egy időzónából (1987-03-25T17:32:05 Pacific Idő) ... Ha van sztring vagy numerikus időadata egy (rögzített) idő ofszet, egyszerűen ki kell igazítania az adatokat Zulu   (Ez az, ami ERDDAP™ Akarat) egy másik alapidő meghatározása az egységekben (pl. „órákat 1970-01-01T08:00Z óta”, jegyezze meg a T08-at, hogy meghatározza az idő ofszetet) , és mindig ellenőrizze az eredményeket annak biztosítása érdekében, hogy megkapja az eredményeket akar.
    * Az időbélyegző változók forrásadatokkal a Strings-tól, ez a tulajdonság lehetővé teszi, hogy meghatározza az időzónát, amely vezet ERDDAP™ átalakítani a helyi-time-zóna forrási időket (néhány a Standard időben, néhány a Daylight Saving Time) a Zulu Időnként (amelyek mindig a szabványos időben vannak) ... Az érvényes időzóna nevek listája valószínűleg azonos a TZ oszlop listáján [https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) ... A közös amerikai időzónák: US/Hawaii, US/Alaska, US/Cacific, US/Mountain, US/Arizona, US/Central, US/Kelet.
    * Az időbélyegző változók számszerű forrásadatokkal, megadhatja a " time\\_zone tulajdonság, de az értéknek " Zulu " vagy "UTC". Ha más időzónák támogatására van szüksége, kérjük, e-mailben Chris. John at noaa.gov.
         
###### Legacy_time_adjust{#legacy_time_adjust} 
*    [ **Legacy_time_adjust** ](#legacy_time_adjust) Kezdőlap ERDDAP™ 2.29.0, az idő változói valamivel másképp működnek. Ritka esetekben, legvalószínűbb, ha használja `napok óta` egy évvel 1582 előtt (így `napok óta 0000-01-01` vagy `napok 1-1 00:00:0.0` ) jeleznie kell egy kiigazítást a dátum változójához. Ennek oka az ERDDAP™ használja a java.time könyvtárat, hogy belsőleg kezelje a dátumokat. Vannak olyan adatkészletek, amelyek megkövetelik a régi GregorianCalendar könyvtár használatát a helyes dátumok megragadásához.

```
<axisVariable>
    <sourceName>time</sourceName>
    <destinationName>time</destinationName>
    <!-- sourceAttributes>
        ... removed several lines ...
        <att name="units">days since 1-1-1 00:00:0.0</att>
    </sourceAttributes -->
    <addAttributes>
        ... removed several lines ...
        <att name="legacy_time_adjust">true</att>
    </addAttributes>
</axisVariable>
```

###### egység{#units} 
*    [ **egység** ](#units)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) , [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) és [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata szabvány) meghatározza az adatértékek egységeit. Például,
    ```
        <att name="units">degree\\_C</att>
    ```
    * "egységek" a REQUIRED, mint egy forrásAttribute vagy addAttribute "time" változók, és szigorúan más változók számára, ha megfelelő (ami szinte mindig) ...
    * Általában ajánljuk, hogy [UDUnits](https://www.unidata.ucar.edu/software/udunits/) \\ kompatibilis egységek, amelyeket a szükséges [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) és [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) szabványok.
    * Egy másik közös szabvány [UCUM](https://unitsofmeasure.org/ucum.html) - az Egységes Mérési Szabályzat. [ OGC ](https://www.ogc.org/) olyan szolgáltatások, mint például [ SOS ](https://www.ogc.org/standards/sos) , [ WCS ](https://www.ogc.org/standards/wcs) és [ WMS ](https://www.ogc.org/standards/wms) UCUM-re van szükség, és gyakran UCUM-ra utal, mint UOM (Measure egységei) ...
    * Javasoljuk, hogy egy egység szabványt használjon az összes adatkészlethez az Önben ERDDAP ... Meg kell mondania ERDDAP™ melyik szabványt használod&lt;Egységek\\_standard&gt;, a te [setup.xml](/docs/server-admin/deploy-install#setupxml) fájl.
    * Az adott változó egységeknek különböző forrásfájlokban következetesnek kell lenniük. Ha van egy adatfájl gyűjteménye, ahol a fájlok egyik aljzata különböző egységértékeket használ, mint a fájlok egy vagy több más aljzata (például,
"a napok 1985-01-01" versus "napok óta 2000-01-01",
"degree\\_Celsius" versus "deg\\_C", vagy
"knots" versus "m/s", meg kell találni a módját, hogy szabványosítsa az egység értékek, különben, ERDDAP™ csak betölti a fájlok egyik aljzatát. Gondolj bele: ha egy fájl WindSpeed units=knots és egy másik szélSpeed units=m/s, akkor a két fájl értékei nem tartoznak ugyanabban az aggregált adatkészletben.
        * Ha a fájlokat megrúgják .nc fájlok, sok helyzetben használhatja [ EDDGrid FromNcFilesUnpack](#eddgridfromncfilesunpacked) ...
        * Ha a fájlok mesés adatfájlok, sok helyzetben használhatja az EDDTableF-t... Fájlok "..." [szabványosítás Amit](#standardizewhat) Mondd el ERDDAP szabványosítani a forrásfájlokat, ahogy olvassák ERDDAP ...
        * Keményebb problémák esetén használhat [NcML](#ncml-files) vagy [ NCO ](#netcdf-operators-nco) megoldani a problémát.
    * A CF szabvány 8.1. szakasza szerint ha a változó adatait a [ scale\\_factor vagy add\\_offset ](#scale_factor) „A változó egységeinek a csomagolatlan adatok képviselőjének kell lenniük.”
    *    [Idő- és időbélyegző változók esetében,](#time-units) vagy a változó [Forrás: Forrás](#variable-addattributes) vagy&lt; addAttributes &gt; &gt; &gt; &gt; (ami előbbre kerül) MUST [egység](#units) vagy
        
        * Az idő tengely változók vagy időadatok változók numerikus adatokkal: [UDUnits](https://www.unidata.ucar.edu/software/udunits/) \\-kompatibilis sztring (formátummal *egység* óta *alapTim* ) leírva, hogyan értelmezhető a forrásidő értékek (Például a másodpercek 1970-01-01T00:00Z) ...
            
         *egység* lehet bármelyik:
        ```
            ms, msec, msecs, millis, millisec, millisecs, millisecond, milliseconds,  
            s, sec, secs, second, seconds, m, min, mins, minute, minutes, h, hr, hrs, hour, hours,  
            d, day, days, week, weeks, mon, mons, month, months, yr, yrs, year, or years.  
        ```
Technikailag, ERDDAP™ NEM kövesse UDUNITS szabvány, ha átalakítjuk "years since" és "months since" időértékek a "seconds since" ... A UDUNITS A szabvány rögzített, egységes értékként határozza meg az évet: 3.15569259747e7 másodperc. És UDUNITS meghatároz egy hónapot, mint év/12. Sajnos, a legtöbb / minden adatkészlet, amit láttunk, hogy használja "years since" vagy "months since" egyértelműen szándékozik tartani az értékeket naptári évekkel vagy naptári hónapokkal. Például 3 "months since 1970-01-01" általában az 1970-04-01-et jelenti. Szóval, ERDDAP™ értelmezés "years since" és "months since" naptári évek és hónapok, és nem követi szigorúan UDUNITS szabvány.
            
A *alapTim* ISO 8601:2004 kell lennie (EZ) formázott dátum idő sztring ( yyyy-MM-dd T'HH:mm:ssZ, például 1970-01-01T00:00Z) vagy ennek valamilyen változata (például a végén hiányzó részekkel) ... ERDDAP™ próbálkozik az ideális formátumú változatok széles skálájával, például az "1970-1 0:0:0" támogatást kap. Ha az időzóna információ hiányzik, feltételezik, hogy az Zulu Időzóna (AKA GMT) ... Még akkor is, ha egy másik idő ofszet van meghatározva, ERDDAP™ Soha nem használja a Daylight Saving Time-t. Ha az alapTime más formátumot használ, akkor használnia kell&lt; addAttributes &gt; megadni egy új egységek sztringjét, amely az ISO 8601:2004 változatát használja (EZ) formátum (pl. változási napok 1985. január 1-től napokig 1985-01-ig.
        
Tesztelhet ERDDAP "A képesség, hogy egy adott *egység* óta *alapTim* vele ERDDAP A [Idő átalakító](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) ... Remélhetőleg egy számba tudsz dugni (az első érték az adatforrásból?) és egy egység sztring, kattintson a konvertre, és ERDDAP™ lesz képes átalakítani az ISO 8601:2004 (EZ) formázott dátum idő húr. A konverter hibaüzenetet fog küldeni, ha az egységek sztringje nem felismerhető.

###### Húró időegységek{#string-time-units} 
*    [Az idő- vagy ütemterv-adatok változóinak egységei számára a String adatokkal,](#string-time-units) meg kell határoznia egy [java.time.DateTimeFormatter](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) minta (ami leginkább kompatibilis a java.text-szel. SimpleDateFormat) amely leírja, hogyan kell értelmezni a szigorú időket.
    
Az ISO 8601:2004 általánosan használt időformátumok esetében (EZ) standard formátum (például 2018-01-02T00:00Z) , megadhatja a variációk variációit yyyy-MM-dd T'HH:mm:ssZ, például használat yyyy-MM-dd ha a sztringidőnek csak dátuma van. bármilyen formátumban, amely a Yyy-M-vel kezdődik, ERDDAP egy speciális parsert használ, amely nagyon megbocsátja a kisebb variációkat a formátumban. A parser kezelheti az időzónákat a "Z", "UTC", "GMT", ±XX:XX, ±XXXX és ±XXX formátumban. Ha a dátumidő részeit nem határozzák meg (például percek és másodpercek) , ERDDAP™ feltételezi a legalacsonyabb értéket ezen a területen (pl. ha a másodperceket nem határozzák meg, a másodperceket=0 feltételezik) ...
    
Az összes többi szigorú időformátum esetében pontosan meg kell határoznia a DateTimeFormatter-kompatibilis időformátumot. Mint yyyy-MM-dd "T'H:mm:ssZ, ezek a formátumú karakterláncok olyan karakterekből épülnek, amelyek azonosítják az adott típusú információt a sztringből, például percről órára. Ha megismételi a formátum karaktert néhány alkalommal, ez tovább finomítja a jelentést, pl., m azt jelenti, hogy az értéket lehet meghatározni számos számjegy, mm azt jelenti, hogy az értéket kell meghatározni 2 számjegy. A Java A DateTimeFormatter dokumentációja egy durva áttekintés, és nem teszi ezeket a részleteket egyértelművé. Tehát itt van egy lista a formátum karakter variációk és a jelentés belül ERDDAP™   (ami néha kissé különbözik attól, Java DateTimeFormatter) :
    
     | Karakterek | példák | A jelentés | 
     | - | - | - | 
     | u, y, Y | \\-4712, 0, 1, 10, 100, 2018 | egy évszám, számos számjegy. ERDDAP™ bánik y (Év-Era) és Y (heti alapú év, mert ez gyakran tévesen használják helyetted) mint u, [csillagászati évszám](https://en.wikipedia.org/wiki/Astronomical_year_numbering) ... A csillagászati évek pozitív vagy negatív integrátorok, amelyek nem használják a BCE-t (BC) vagy CE (AD) korszaktervezők: 2018=2018CE, ..., 2=2CE, 1=1CE, 0=1BCE, -1=2BCE, -2=3BCE, ... | 
     | Uuuuu, igen, Igen, | \\-4712, 0000, 0001, 0010, 0100, 2018 | 4 számjegyű csillagászati évszám (figyelmen kívül hagyni minden megelőző "-")   | 
     | M | 1, 01, 12 | egy hónapos szám, számos számjegy (1=Január)   | 
     | MM | 01, 12 | 2 számjegy (nulla padded) hónapszám | 
     | MMM | Jan, jan, JAN | 3 betű angol havi név, esetérzékeny | 
     | MMM | Jan, jan, JAN, január, január, JANUARY | 3 betű vagy teljes angol havi név, esetérzékeny | 
     | d) | 1, 01, 31 | napi szám, bármilyen számjegy | 
     | dd | 01, 31 | 2 számjegy (nulla padded) nap-hónap. Az első „digit” lehet egy űr. | 
     | D | 1, 001, 366 | nap-év, bármilyen számjegy, 001=Jan 1 | 
     | DDD | 001, 366 | nap-év, 3 számjegy, 001=Jan 1 | 
     | EEE | HU, THU, Thu | egy 3 betűs napi hetet, az érték figyelmen kívül hagyva, amikor a párosítás | 
     | EEEE | HU, THU, Thu, tegnap, THURSDAY, csütörtök | egy 3 betű vagy teljes angol napi hét, eseti érzéketlen, az érték figyelmen kívül hagyása, amikor a pletykát | 
     | Hát | 0, 00, 23 | Hónap (0-23) bármilyen számjegy | 
     | HH | 00, 23 | HH óra-nap (00-23) 2 számjegy. Az első „digit” lehet egy űr. | 
     | egy | AM, PM, PM | AM vagy PM, eseti érzékeny | 
     | h | 12, 1, 01, 11 | órá-hour-of-am-pm (12, 1, 2, 11) bármilyen számjegy | 
     | hó | 12, 01, 11 | órá-hour-of-am-pm (12, 1, 2, 11) 2 számjegy. Az első „digit” lehet egy űr. | 
     | K. | 0, 1, 11 | óra-of-am-pm (0, 1, ...11) bármilyen számjegy | 
     | KK | 00, 01, 11 | órá-of-am-pm, 2 számjegy | 
     | m | 0, 00, 59 | perc órája, bármilyen számjegy | 
     | mm | 00, 59 | perc óra, 2 számjegy | 
     | s | 0, 00, 59 | perc, bármilyen számjegy | 
     | SS | 00, 59 | perc, 2 számjegy | 
     | Súgó | 0, 000, 999 | frakció-második, mintha egy meghatározott pontot követnénk, bármilyen számjegyet | 
     | SS | 00, 99 | Több száz másodperc, 2 számjegy | 
     | SSS | 000, 999 | ezer másodperc, 3 számjegy | 
     | A | 0, 0000, 863999 | millisecond-of-day, bármilyen számjegy | 
     | AAAAAA | 000 000, 863999 | napi, 8 számjegy | 
     | N | 0,000000000000, 863999999999 | nanoszecond-of-day, bármilyen számjegy. Inkább ERDDAP™ Ez az nMillis-re trunkál. | 
     | NNNNNNNNNNNNN | 000000000000, 8639999999 | nanoszecond-of-day, 14 számjegy. Inkább ERDDAP™ Ezt az nMillis-re trunkálják. | 
     | n | 0,000000000, 59999999999 | nanoszekundum-második, számos számjegy. Inkább ERDDAP™ Ezt az nMillis-re trunkálják. | 
     | nnnnnnnnnn | 000000000, 599999999 | nanoszekundum-második, 11 számjegy. Inkább ERDDAP™ Ezt az nMillis-re trunkálják. | 
     | XXX, ZZZ | Z, -08:00, +01:00 | egy időzóna a "Z" vagy ± formátummal (2 Digitális óra offset) : (2 Digitális perc offset) ... Ez kezeli *Tér* mint + (Nem szabványos) ... ZZ támogató "Z" nem szabványos, de foglalkozik egy közös felhasználói hiba. | 
     | XX, ZZ | Z -0800, +0100 | egy időzóna a "Z" vagy ± formátummal (2 Digitális óra offset) : (2 Digitális perc offset) ... Ez kezeli *Tér* mint + (Nem szabványos) ... A ZZ támogatja a "Z" nem szabványos, de közös felhasználói hibával foglalkozik. | 
     | X, Z | Z, -08, +01 | egy időzóna a "Z" vagy ± formátummal (2 Digitális óra offset) : (2 Digitális perc offset) ... Ez kezeli *Tér* mint + (Nem szabványos) ... A „Z” támogatása nem szabványos, de közös felhasználói hibával foglalkozik. | 
     | XXX. | \\-08:00, +01:00 | időzóna a formátummal ± (2 Digitális óra offset) : (2 Digitális perc offset) ... Ez kezeli *Tér* mint + (Nem szabványos) ... | 
     | xx | \\-0800, +0100 | időzóna a formátummal ± (2 Digitális óra offset)  (2 Digitális perc offset) ... Ez kezeli *Tér* mint + (Nem szabványos) ... | 
     | x x x x | \\-08, +01 | időzóna a formátummal ± (2 Digitális óra offset) ... Ez kezeli *Tér* mint + (Nem szabványos) ... | 
     | "..." | "T", "Z", "GMT" | egy sor szó szerinti karakter kezdete és vége | 
     | "..." "..." (Két egyetlen idézet)   | "..." "..." | Két egyetlen idézet egy szó szerinti egyetlen idézetet | 
     |   \\[  \\]   |   \\[   \\]   | Kezdőlap ("..." \\[ "...") és vége ("..." \\] "...") opcionális rész. Ez a megjegyzés csak szó szerinti karakterek és a végén a formátum sztring. | 
     | #, &#123; és#125; | #, &#123; és#125; | fenntartva a jövőbeli használatra | 
     | G,L, Q,e,c,V,z,O,p |       | Ezeket a formázási karaktereket támogatják Java DateTimeFormatter, de jelenleg nem támogatott ERDDAP ... Ha támogatásra van szüksége, e-mail Chris. John at noaa.gov. | 
    
Megjegyzések:
    
    * Egy dátumban a punctuációval, a numerikus értékek változatos számjegyeket tartalmazhatnak (pl. az Egyesült Államokban a „1/2/1985” szilárd dátum formátumban a hónap és a dátum 1 vagy 2 számjegy lehet) így a formátumnak 1 betűs tokeneket kell használnia, pl. M/d/yyyyyy-t, amely havonta és napra számos számjegyet fogad el.
    * Ha egy elem számjegye állandó, például 01/02/1985, akkor adja meg a számjegyek számát a formátumban, pl. MM/dd/yyyy 2 számjegyű hónap, 2 számjegyű dátum és 4 számjegyű év.
    * Ezek a formátumok trükkösek dolgozni. Egy adott formátum működik a legtöbb, de nem minden, idő húrok egy adott változó. Mindig ellenőrizze, hogy a megadott formátum a vártnál működik ERDDAP minden változó idejére.
    * Ha lehetséges, a GenerateDatasetXml időformátumot javasol.
    * Ha segítségre van szüksége, hogy létrehozzon egy formátumot, kérjük, e-mailben Chris. John at noaa.gov.

A fő időadatok változóak (mesés adatkészletek) és a fő idő tengely változó (a rácsos adatkészletekért) által elismert [ destinationName ](#destinationname) Idő. Egységük metaadatának UDUnits-kompatibilis egységnek kell lennie, amely a numerikus időértékekre vonatkozik, pl. „1970-01-01 napja” (tabuláris vagy rácsos adatkészletek) vagy [A szigorú időkre alkalmas egységek](#string-time-units) pl.: „M/d/yyyy” (mesés adatkészletek) ...

Különböző időegységek különböző fosztva .nc File - Ha van egy gyűjteménye rácsos .nc fájlok, ahol az idő változó, az egyik alkészlet a fájlok különböző időegységek, mint egy vagy több más alkatrészek a fájlokat, akkor használható [ EDDGrid FromNcFilesUnpack](#eddgridfromncfilesunpacked) ... Az időértékeket átalakítja "seconds since 1970-01-01T00:00:00Z" alacsonyabb szinten, ezáltal elrejtve a különbségeket, így egy adatkészletet készíthet a heterogén fájlok gyűjteményéből.

###### TimeStamp változók{#timestamp-variables} 
 [TimeStamp változók](#timestamp-variables) - Bármely más változó ( axisVariable vagy dataVariable Egyben EDDGrid vagy EDDTable adatkészlet) lehet egy timeStamp változó. A Timestamp változók olyan változók, amelyek idővel kapcsolatos egységekkel és időadatokkal rendelkeznek, de van egy&lt; destinationName &gt; más, mint idő. A TimeStamp változók úgy viselkednek, mint a fő idő változók abban, hogy átalakítják a forrás idő formátumát "seconds since 1970-01-01T00:00:00Z" és/vagy ISO 8601:2004 (EZ) formátum). ERDDAP™ felismeri az időt Stamp változók az idővel kapcsolatos " [egység](#units) "Metadata, amelynek meg kell felelnie ennek a rendszeres kifejezésnek" \\[ a-zA-Z \\] ++since + \\[ 0-9 \\] .+" (numerikus dátum Idők, például "seconds since 1970-01-01T00:00:00Z" ) vagy legyen dátum Time formátum string tartalmaz "uuuu", "yyyy" vagy "YYYY" (Például: " yyyy-MM-dd "T'HH:mm:ssZ") ... De kérlek még mindig használd a destinationName   "time" a fő dátumhoz Idő változó.

 **Mindig ellenőrizze a munkáját, hogy megbizonyosodjon arról, hogy az időadatok, amelyek jelennek meg ERDDAP™ a megfelelő időadatok.** Az időadatokkal való munka mindig trükkös és hibás hajlam.

Lásd [több információ az idő változóiról](#destinationname) ...
 ERDDAP™ haszonnal rendelkezik [Konvertáljon Numeric Idő / sztring idő](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) ...
Lásd [Hogyan ERDDAP™ Üzletek az idővel](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) ...
         
        
######  valid\\_range  {#valid_range} 
*    [ ** valid\\_range ** vagy ** valid\\_min ** és ** valid\\_max ** ](#valid_range) - Ezek az OPTIONAL változó tulajdonságok, amelyeket a [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) metadatai egyezmények. Például,

    >    &lt;att name="valid\\_range" [type="floatList"](#attributetype)\\>0.0 40.0&lt;/att>  

vagy

    >    &lt;att name="valid\\_min" [type="float"](#attributetype)\\>0.0&lt;/att>  
    >    &lt;att name="valid\\_max" [type="float"](#attributetype)\\>40.0&lt;/att>  

    * Ha jelen van, ugyanazon adattípusnak kell lennie, mint a változónak, és meg kell határoznia az adott változó adatok érvényes minimális és maximális értékeit. A felhasználóknak az ezen tartományon kívüli értékeket érvénytelennek kell tekinteniük.
    *    ERDDAP™ nem alkalmazzák valid\\_range ... Mondj egy másik módot: ERDDAP™ nem konvertálja az adatértékeket kívül valid\\_range a \\_Fill Érték vagy missing\\_value ... ERDDAP™ csak továbbhalad ezen a metaadatán, és elhagyja az alkalmazást az Ön számára.
Miért? Ezért van ez a metaadata. Ha az adatszolgáltató akart volna, az adatszolgáltató az adatértékeket az adatokon kívül is át tudta alakítani valid\\_range \\_FillValues. ERDDAP™ nem a második találgatja az adatszolgáltatót. Ez a megközelítés biztonságosabb: ha később kiderül, hogy a valid\\_range túl szűk vagy egyébként helytelen volt, ERDDAP™ nem akadályozta meg az adatokat.
    * Ha az adatok tele vannak [ scale\\_factor vagy add\\_offset ](#scale_factor) , valid\\_range , valid\\_min és valid\\_max legyen a csomagolt adattípus és érték. óta ERDDAP™ alkalmazandó scale\\_factor és add\\_offset ha betölti az adatkészletet, ERDDAP™ kicsomagolja a valid\\_range , valid\\_min és valid\\_max értékek, hogy a célállomás metaadata (a felhasználók számára) jelzi a csomagolatlan adattípust és tartományt.
Vagy, ha nem csomagolt\\_ valid\\_range attribútum jelen van, átnevezik valid\\_range mikor ERDDAP™ betölti az adatkészletet.
##### &lt;eltávolításaMVRows & gt;{#removemvrows} 
* [[szerkesztés]] ** &lt;eltávolításaMVRows&gt; ** ] (#removemvrows) egy OPTIONAL tag egy címkén belül datasets.xml EDDTableFromFiles (beleértve az összes alosztályt) adatkészletek, bár csak az EDDTableFromMultidimNcFiles számára használják. Valódi vagy hamis értéke lehet. Például igaz
Ez eltávolítja a sorok blokkját egy csoport végén, ahol az összes érték missing\\_value , \\_FillValue, vagy a CoHort...Array natív hiányzó érték (dalszöveg: CharArrays) ... Ez a CF DSG Multidimenzionális Array fájltípus és hasonló fájlok. Ha igaz, ez a megfelelő teszt, és így mindig betölti az összes max dim változó, így lehet, hogy extra időt.
Az alapértelmezett érték hamis.
Ajánlás - Ha lehetséges az adatkészlet, javasoljuk, hogy állítsa be a eltávolításMVRows hamis. A eltávolítás MVRows igazba történő beállítása jelentősen lelassíthatja a kérelmeket, bár egyes adatkészletekhez lehet szükség.
