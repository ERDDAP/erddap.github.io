---
title: "EDDTableFromEML" 
---
# Az EDDTableFromEML és EDDTableFromEMLBatch Opciók a GenerateDatasets-ben Xml

\\[Ez a weboldal csak érdekes leszERDDAP™adminisztrátorok, akik EML fájlokkal dolgoznak.
Ezt a dokumentumot 2016-ban hozták létre. Legutóbb 2020-11-30-ra szerkesztették.\\]

[ **ERDDAP™** ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)egy adatkiszolgáló, amely egyszerű, következetes módot biztosít a felhasználók számára, hogy letöltsék a hálózati és mesés tudományos adatkészleteket a közös fájlformátumokban, és grafikonokat és térképeket készítsenek.ERDDAP™egy adott adatkészlettel működik, mint a többdimenziós rácsos változók csoportja (pl. műholdas vagy modelladat) vagy adatbázisszerű asztalként (minden típusú információ oszlopával és sorral minden megfigyeléshez) ...ERDDAP™Ingyenes és nyílt forráskódú szoftver, így bárki képes[letöltés és telepítésERDDAP™](/docs/server-admin/deploy-install)hogy szolgálja az adatait.

Adatkészlet hozzáadása egy adatkészlethezERDDAP™telepítés,ERDDAP™Az adminisztrátornak hozzá kell adnia egy darab XML-t, amely leírja az adatkészletet egy olyan fájlba, amelyet az úgynevezettdatasets.xml... (Ott van[alapos dokumentációdatasets.xml](/docs/server-admin/datasets)...) Bár lehet generálni az XML darabjátdatasets.xmlteljesen kézzel,ERDDAP™jön egy úgynevezett eszköz[ **GenerateDatasetsXml** ](/docs/server-admin/datasets#tools)amely generálhatja az XML zsákjának durva tervezetét egy adott adatkészlethez, amely az adatkészlet bizonyos forrásán alapul.

Az első dolog, amit GenerateDatasets Az Xml megkérdezi, hogy milyen típusú adatkészletet szeretne létrehozni. GenerateDatasets Az Xml-nek különleges lehetősége van, **EDDTableFromEML** , amely az információt egy[ökológiai metaadata nyelv (EML) ](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)XML fájl az XML darabjának létrehozásáhozdatasets.xmllétrehozni egy[EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles)adatkészlet minden adattábláról egy EML fájlban. Ez nagyon jól működik a legtöbb EML fájl esetében, többnyire azért, mert az EML fájlok kiváló munkát végeznek az összes szükséges metaadat tárolásában egy egyszerű-munka formátumban. Az információ, hogy a GenerateDatasetsXml-nek meg kell teremtenie az adatkészleteket, az EML-fájlban van, beleértve az URL-t az adatfájlhoz, amely a GenerateDatasetsXml letöltések, parses és összehasonlítja az EML-fájl leírását. (Sok csoport jól tenné az EML-re való áttérést, ami egy nagyszerű rendszer bármilyen mesés tudományos adatkészlet, nem csak az ökológiai adatok dokumentálására. És sok csoport, amely XML sémákat hoz létre, jól tenné az EML-t, mint az XML séma esettanulmányát, amely egyértelmű, hogy nem túl mély (túl sok szint) , és könnyen az emberek és a számítógépek dolgozni.) 

## Kérdések{#questions} 

Íme az összes kérdés a GenerateDatasets Xml megkéri, hogy kommentálja, hogyan kell válaszolni, ha csak egy EML fájlt vagy egy EML fájlok tételét szeretné feldolgozni:

* Melyik EDDType?
Ha csak egy fájlt szeretne feldolgozni, válasz: EDDTableFromEML
Ha fájlok egy csoportját szeretné feldolgozni, válasz: EDDTableFromEMLBatch
* Igazgatóság fájlok tárolására?
Írja be a letöltött EML és / vagy adatfájlok tárolására használt könyvtár nevét.
Ha a könyvtár nem létezik, akkor létrejön.
*    (EDDTableFromEML csak) EML URL vagy helyi fájlName?
Írja be az EML fájl URL vagy helyi fájlnevét.
*    (Az EDDTableFromEMLBatch csak) EML dir (URL vagy helyi) ?
Írja be a könyvtár nevét az EML fájlokkal (URL vagy helyi piszk) ...
Például: http://sbc.lternet.edu/data/eml/files/
 
*    (Az EDDTableFromEMLBatch csak) Filename regex?
Írja be a rendszeres kifejezést, amelyet a kívánt EML fájlok azonosítására használnak az EML könyvtárban.
Például: knb-lter-sbc. \\d+
* Használja a helyi fájlokat, ha jelen van (Igaz|hamis) ?
Adja meg a meglévő helyi EML fájlokat és adatfájlokat, ha léteznek.
Írja be a hamis, hogy mindig újra letöltse az EML fájlokat és / vagy adatfájlokat.
* hozzáférhető?
Ha azt szeretné, hogy az új adatkészletek privát adatkészletek legyenekERDDAPmeghatározza a csoport nevét (s) ez lehetővé teszi a hozzáférést.
Ajánlott LTER csoportok: kombinálja a "jobb" plusz a csoport, pl., lter Sbc.
Ha belépsz "nullba", nem lesz semmi&lt;hozzáférhető To&gt; tag a kimenetben.
Lásd[hozzáférhető Hogy](/docs/server-admin/datasets#accessibleto)...
* helyi TimeZone (pl.: US/Pacific) ?
Ha egy idő változó azt jelzi, hogy helyi időértékekkel rendelkezik, akkor ez az időzóna lesz rendelve.
Ennek értéknek kell lennie[TZ oszlop listája az időzóna neveiről](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)...
Vegye figyelembe az összes könnyen használható "US / ..." nevet a lista végén.
Ha később azt találja, hogy helytelen, akkor megváltoztathatja atime\\_zonea zsákbandatasets.xml...

EML pluszERDDAP™nagyszerű kombináció, mivelERDDAP™a felhasználók számára közvetlenebb hozzáférést biztosíthatnak a gazdagsághoz[Tudáshálózat a biokomplexitáshoz (KNB) ](https://knb.ecoinformatics.org/)és[Hosszú távú ökológiai kutatás (LTER) ](https://lternet.edu/)adatok és segítik ezeket a projekteket az amerikai kormány[Közös hozzáférés a kutatási eredményekhez (PARR) követelmények](https://nosc.noaa.gov/EDMC/PD.DSP.php)a webszolgáltatáson keresztül elérhető adatok elkészítésével. Továbbá, EML pluszERDDAP™Úgy tűnik, mint egy nagy híd a tudósok között az akadémiai / NSF által finanszírozott birodalom és tudósok a szövetségi ügynökségben (NOAA, NASA, USGS) birodalom.

Lásd:[rész további támogatás megszerzéséről](/docs/intro#support)...
 
## Design részletek{#design-details} 

Íme az EDDTableFromEML opció tervezési adatai a GenerateDatasetsXml-ben.
Néhányan kapcsolódnak a különbségek, hogyan EML ésERDDAP™dolgokat és hogyan GenerateDatasets Az Xml kezeli ezeket a problémákat.

### Az egyik adatTable az egyikERDDAP™Adatbázis{#one-datatable-becomes-one-erddap-dataset} 
Egy EML fájl lehet több&lt;adatok Table & gt;s.ERDDAP™Az egyikERDDAP™EML adattáblánkénti adatkészlet. AdatasetIDaz adatkészlet esetében
 *EMLName* \\_t *tableNumber*   (amikor az EMLname szöveg) vagy
 *rendszer\\_EMLName* \\_t *tableNumber*   (amikor az EMLname egy szám) ...
Például az asztal # 1 a fájl knb-lter-sbc.28, válikERDDAP™ datasetID=knb\\_lter\\_sbc\\_28\\_t1,
     
### EML versus CF+ACDD{#eml-versus-cfacdd} 
Majdnem az összes metaadat az EML fájlokban kerül beERDDAP, de más formátumban.ERDDAP™Használja a[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)és[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata szabványok. Kiegészítő metaadatrendszerek, amelyek kulcsfontosságú=érték párokat használnak a globális metaadatokhoz és minden változó metaadatához.
Igen, a metaadata EML képviselete jóval jobb, mint a CF+ACDD képviselete. Nem javasolom, hogy a CF+ACDD reprezentációt az EML helyettesítéseként használjam. Kérjük, gondoljon a CF+ACDD-re a híd részeként az EML világából azOPeNDAP/CF/ACDD világ.
     
### Kis változások{#small-changes} 
ERDDAP™sok apró változást hoz. Például,ERDDAP™használja az EML non-tDOIalternatíva Identifier plusz adatTable szám, mintERDDAP™ datasetID, de kissé megváltoztatja az alternatívát Identifier, hogy ez egy érvényes változó nevet a legtöbb számítógépes nyelven, például knb-lter-sbc.33 adatok A táblázat # 1 knb\\_lter\\_sbc\\_33\\_t1 lesz.
     
### DocBook{#docbook} 
Az EML a DocBook jelölési rendszerét használja, hogy struktúrát biztosítson a szöveg blokkjainak az EML fájlokban. A CF és az ACDD megköveteli, hogy a metaadat egyszerű szöveg legyen. Tehát a GenerateDatasets Az Xml a jelzett szöveget egyszerű szöveggé alakítja, amely úgy néz ki, mint a szöveg formázott változata. Az inline címkéket négyzetes konzolokkal, pl.\\[hangsúlyozta\\]és maradt a sima szövegben.
     
### Adat fájlok{#data-files} 
Mivel az EML adatTable tartalmazza a tényleges adatfájl URL-jét, a GenerateDatasets Xml:
1. Töltse le az adatfájlot.
2. Tárolja ugyanazon könyvtárban, mint az EML fájl.
3. Olvassa el az adatokat.
4. Hasonlítsa össze az EML adatainak leírását a fájl tényleges adataival.
5. Ha GenerateDatasets Az Xml különbségeket talál, velük foglalkozik, vagy kéri az üzemeltetőt, ha a különbségek rendben vannak, vagy hibaüzenetet küld. A részletek az alábbi különböző tárgyakban találhatók.
         
### .zip"D Adatfájlok{#zipd-data-files} 
Ha a hivatkozott adatfájl egy.zipfájlt, csak egy fájlt kell tartalmaznia. Ezt a fájlt aERDDAP™adatkészlet. Ha több mint 1 fájl van.ERDDAP™elutasítja ezt az adatkészletet. Szükség esetén ez módosítható. (A gyakorlatban az összes SBC LTER zip fájlnak csak egy adatfájlja van.)   
     
### StorageType{#storagetype} 
Ha egy oszlop tárolása A típus nem meghatározott,ERDDAP™a legjobb találgatásokat használja az adatfájl adatai alapján. Ez jól működik.
     
### Egységek{#units} 
ERDDAP™Használat[UDUNITSformázás egységekre](https://www.unidata.ucar.edu/software/udunits/)... GenerateDatasets Az Xml képes átalakítani az EML egységetUDUNITStisztán az idő 95%-a. A fennmaradó 5 százalék az egységek olvasható leírását eredményezi, például a „biomassDensityUnitPerAbundanceUnit” az EML-ben „biomass sűrűség egység bőségegységenként” válik.ERDDAP... Technikailag ez nem megengedett. Nem hiszem, hogy ez olyan rossz a körülmények között.\\[Szükség esetén olyan egységek, amelyek nem hozhatókUDUNITSkompatibilis lehet mozgatni a változó komment tulajdonsága.\\]  
     
### EML verzió 2.1.1{#eml-version-211} 
Az EML v2.1.1 fájlok támogatása a GenerateDatasets-hez lett hozzáadva Az Xml 2016-ban azzal a reméléssel, hogy az EML közösségében némi felvétel áll fenn. 2020 óta ez nem történt meg. AERDDAP™A fejlesztők örömmel támogatnák az EML legújabb verzióit, de csak akkor, ha az új funkciókat ténylegesen használják. Kérlek e-mailterd.data at noaa.govha szeretne támogatást nyújtani az EML legújabb verzióihoz, és ténylegesen használja ezt a funkciót.
     

## Kérdések az EML fájlokkal{#issues-with-the-eml-files} 

Vannak problémák / problémák az EML fájlokat, amelyek problémákat okoznak, ha egy szoftver kliens (mint például az EDDTableFromEML opció a GenerateDatasetsXML-ben) megpróbálja értelmezni / feldolgozni az EML fájlokat.

* Bár számos kérdés van itt, többnyire kicsi, megoldható problémák. Általában az EML egy nagyszerű rendszer, és örömömre szolgál, hogy vele dolgozzak.
* Ezek durván rendeződnek a legrosszabb / leggyakoribb a legkevésbé rossz / kevésbé gyakori.
* A legtöbb kapcsolódik a kis problémákat az adott EML fájlokban (amelyek nem EML hibái) ...
* A legtöbbet az EML fájl vagy adatfájl egyszerű módosításai rögzíthetik.
* Tekintettel arra, hogy az LTER emberek EML-ellenőrzőt építenek az EML-fájlok érvényességének tesztelésére, hozzáadtam néhány javaslatot az ellenőrhöz hozzáadott funkciók tekintetében.

Íme a kérdések:

### Különálló dátum és idő oszlopok{#separate-date-and-time-columns} 
Néhány adatfájl külön oszlopokat tartalmaz napi és időre, de nem egységes dátum + idő oszlop. Jelenleg a GenerateDatasets Az Xml egy adatkészletet hoz létre ezekkel a külön oszlopokkal, de ez nem ideális, mert:

* A legjobb, ha az adatkészletekERDDAP™van egy kombinált dátum + idő oszlop úgynevezett"time"...
* Gyakran az adatkészlet nem tölt beERDDAP™mert"time"Az oszlopnak nincs dátuma + időadata.

Két lehetséges megoldás létezik:
1. Szerkeszteni a forrásadat fájlt, hogy hozzáadjon egy új oszlopot az adatkészletben (és írja le az EML-ben) ahol a dátum és az idő oszlopok összeolvadnak egy oszlopba. Ezután indítsa vissza a GenerateDatasets-t Xml így megtalálja az új oszlopot.
2. Használja a[Derived változók](/docs/server-admin/datasets#script-sourcenamesderived-variables)funkcióERDDAP™új változó meghatározásadatasets.xmlamelyet a dátum és az idő oszlopainak meghódítása hoz létre. Az egyik példa kifejezetten a helyzettel foglalkozik.
         
### Konzisztens oszlop nevek{#inconsistent-column-names} 
Az EML fájlok felsorolják az adatfájl oszlopait és nevüket. Sajnos gyakran különböznek az oszlop nevektől a tényleges adatfájlban. Általában az EML-fájl oszloprendje ugyanaz, mint az adatfájl oszloprendje, még akkor is, ha a nevek kissé váltak, de nem mindig. GenerateDatasets Az Xml megpróbálja megfelelni az oszlopneveknek. Ha nem tudja (ami gyakori) Megáll, megmutatja az EML/adta fájlnév párokat, és kérdezze meg, hogy helyesen igazodnak-e. Ha belép a "s"-be, hogy kihagyjon egy asztalt, a GeneratedDatasetsXml egy hibaüzenetet fog kinyomtatni, és a következő asztalra megy.
A megoldás az, hogy megváltoztassa a hibás oszlopneveket az EML fájlban, hogy megfeleljen az adatfájl oszlopneveinek.
     
### Különböző oszloprend{#different-column-order} 
Számos olyan eset van, amikor az EML a oszlopokat más rendben határozta meg, mint az adatfájlban. GenerateDatasets Az Xml megáll, és megkérdezi az üzemeltetőt, ha a mérkőzések rendben vannak, vagy ha az adatkészletet ki kell állítani. Ha kihagyják, hibaüzenet lesz az eredményfájlban, pl.:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
      datasetID=knb\\_lter\\_sbc\\_17\\_t1
      dataFile=all\\_fish\\_all\\_years\\_20140903.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        SURVEY\\_TIMING        = notes
        NOTES                = survey\\_timing
      --&gt;
```
A megoldás az oszlop megrendelésének javítása ezekben az EML fájlokban, hogy megfeleljenek a megrendelésnek az adatfájlokban.

Jó lenne, ha az EML-ellenőrző ellenőrizné, hogy a forrásfájlban lévő oszlopok és oszlopok megfelelnek az EML-fájl oszlopainak és oszloprendjének.
    
### Helytelen numHeaderLines{#incorrect-numheaderlines} 
Több adat A táblázatok helytelenül állami numHeaderLines=1, pl. ...sbc.4011. Ez okozzaERDDAP™olvassa el az első adatsort, mint az oszlop nevet. Megpróbáltam manuálisan SKIP-t adni ezeknek az adattábláknak. Nyilvánvalóak, mert a nem mért forráskódú nevek minden adatérték. És ha vannak olyan fájlok, amelyek helytelenül rendelkeznek numHeaderLines=0-val, a rendszerem nem teszi nyilvánvalóvá. Íme egy példa az SBC LTER hibafájlból:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3017\\_t1
      dataFile=MC06\\_allyears\\_2012-03-03.txt
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        2008-10-01T00:00     = timestamp\\_local
        2008-10-01T07:00     = timestamp\\_UTC
        2.27                 = discharge\\_lps
        -999.0               = water\\_temperature\\_celsius
      --&gt;
```
Tehát a hiba úgy jelenhet meg, mintha a GenerateDatasets Xml úgy gondolja, hogy az első vonal az adatokkal a fájlban (pl. 2008-10-01T00:00 stb.) a vonal oszlop nevekkel (ha 2008-10-01T00:00 oszlopnév volt) ...

Jó lenne, ha az EML-ellenőrző ellenőrizte a numHeaderLines értékét.
    
### numHeaderLines = 0{#numheaderlines--0} 
Néhány forrásfájlnak nincs oszlop neve.ERDDAP™elfogadja, hogy ha az EML ugyanazokat az oszlopokat írja le.

Véleményem szerint ez nagyon veszélyesnek tűnik. Lehetnek oszlopok egy másik sorrendben, vagy különböző egységekkel (lásd alább) És nincs mód arra, hogy elkapja ezeket a problémákat. Sokkal jobb, ha az összes ASCII adatfájlnak van egy sor oszlop nevekkel.
    
### DateTime Format Strings{#datetime-format-strings} 
Az EML szabványos módja a dátumidő formátumok leírására. De jelentős variáció van használatában az EML fájlokban. (Korábban tévedtem erről. Látom az EML dokumentációt a formátumbanString, amely úgy tűnik, hogy megfelel a[JavaDateTimeFormatter specifikáció](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html), de ami hiányzik a használatával kapcsolatos fontos iránymutatások, az eredmény, hogy a formátumString gyakran/általában helytelenül használják.) Számos esetben helytelen ügy, és / vagy helytelen duplikáció egy levél, és / vagy nem szabványos formázás. Ez ésszerűtlen terhet ró az ügyfelekre, különösen a szoftveres ügyfelekre, mint a GenerateDatasetsXml. GenerateDatasets Xml megpróbálja átalakítani a helytelenül meghatározott formátumokat az EML fájlokban
[dátum/idő formátum, amelyERDDAP™követelmények](/docs/server-admin/datasets#string-time-units), amely szinte azonos aJava/Joda idő formátum specifikáció, de kissé több megbocsátás.

Jó lenne, ha az EML ellenőr szigorú betartást igényelneJava/Joda/ERDDAPidőegységek specifikációja és igazolta, hogy a dátumidő értékek az adattáblában helyesen lehetnek a megadott formátummal.
    
### dalszöveg: DateTime De No Time Zone{#datetime-but-no-time-zone} 
GenerateDatasets Xml keres egy oszlopot dátummal Idő és meghatározott időzóna (vagyZulu: az időegységekből, amelyek a „Z”-ben vagy az oszlopnévben végződnek, vagy olyan attribútum-meghatározás, amely magában foglalja a „gmt” vagy a „utc” kifejezést, vagy a helyi: a „helyi” az oszlopnévben vagy az attribútum meghatározásában) ... Is elfogadható egy fájl egy dátum oszlop, de nincs idő oszlop. Szintén elfogadható egy fájl, dátum vagy időinformáció nélkül.

GenerateDatasets Xml kezeli az összes "helyi" időt, hogy az időzónából, amely megadhatja egy adott tétel fájlok, például az SBC LTER, US / Csendes-óceáni. Az információ néha a megjegyzésekben van, de nem olyan formában, amely könnyen kitalálható egy számítógépes program számára.

Azok a fájlok, amelyek nem felelnek meg ennek a kritériumnak, elutasítják az üzenetet, "NO GOOD DATE (Időzítés) VARIABLE.” A közös problémák:

* Van egy oszlop dátumokkal és oszlop idővel, de nem dátum Idő oszlop.
* Vannak időegységek, de az időzóna nem meghatározott.

Egyéb megjegyzések:
Ha van egy jó dátum + idő az időzóna oszlopával, akkor az oszlop neve lesz"time"benneERDDAP...ERDDAP™megköveteli, hogy az idő oszlop adatai érthetők legyenek / konvertálhatók legyenekZulu/UTC/GMT időzóna dátumTimes.\\[Hiszem: a helyi idők és a különböző dátum/idő formátumok használata (2 számjegyű év&#33; mm/dd/yyy vs dd/mm/yyy vs...) az adatfájlok kényszerítik a végfelhasználót, hogy bonyolult konverziókat tegyenekZuluidő ahhoz, hogy összehasonlítsa az adatokat az egyik adatkészletből a másik adatokkal. SzóvalERDDAP™szabványosítja az összes adatot: Szúrási időkre,ERDDAP™mindig használja az ISO 8601:2004-et (EZ) szabványos formátum, például 1985-01-02T00:00Z. numerikus időkben,ERDDAP™mindig használ"seconds since 1970-01-01T00:00:00Z"...ERDDAP™mindig használjaZulu  (UTC, GMT) időzóna eltávolítja a nehézségeket a munka különböző időzónák és a standard idő versus napfény megtakarítási idő. Tehát a GenerateDatasets Az Xml EML adatTable oszlopot keres dátum + idővelZulu... Ez nehéz, mert az EML nem használ formális szókincset/rendszert (mint[Java/Joda idő formátum](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html)) az adatok meghatározásához Idő formátum:
Ha van egy oszlop numerikus időértékekkel (pl.:MatlabIdőnként) ésZuluIdőzóna (vagy csak dátumok, nincs idő oszlopok) , használják, mint"time"...
Ha van egy col dátummal és időadatokkal, használja aZuluidőzóna, használják, mint"time"és bármely más dátum vagy időoszlop eltávolításra kerül.
Else, ha az igazságos dátummal kapcsolatos információval rendelkező gyűjtemény megtalálható, akkor úgy használják, mint"time"változó (nincs időzónával) ...
Ha van egy adatoszlop és egy időoszlop, és nincs kombinált dátum Az idő oszlopa, az adatkészlet visszakerül - de az adatkészlet használható egy kombinált dátum hozzáadásával Idő oszlop (lehetőleg,ZuluIdőzóna) az adatokhoz, és hozzáadja a leírását az EML fájlban.
EXAMPLE az SBC LTER-től:[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)adatTable #2.

Jó lenne, ha az EML/LTER egy oszlop bevonását kérnéZulu  (UTC, GMT) időzóna-idők minden releváns forrásadat fájlban. A következő legjobb, ha egy rendszert hozzáadunk az EML-hez, hogy meghatározza atime\\_zonejellemző szabványos nevek használatával (a[TZ oszlop](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) ...
    
### Kilépésmissing\\_value {#missing-missing_value} 
Néhány oszlop egymissing\\_valueDe ne sorolja fel az EML metaadatában, pl. a csapadék\\_mm a knb-lter-sbc.5011-ben -999. Ha az EML-ben nincs hiányzó érték, a GenerateDatasetsXml automatikusan keresi a közös hiányzó értékeket (pl. 99, -99, 999, -999, 9999, -9999, stb.) és létrehozza ezt a metaadatot. De más hiányzikmissing\\_valueS nem fogott.

Jó lenne, ha az EML ellenőr eltűntmissing\\_valueS.
    
### Kis problémák{#small-problems} 
Sok kis probléma van (Spelling, punctuáció) amely valószínűleg csak egy emberi ellenőrzi az egyes adatkészleteket.

Jó lenne, ha az EML-ellenőrző varázslatos és grammatikus hibákat keresett. Ez egy nehéz probléma, mert a tudomány szavakat gyakran a varázslók tévesztik. Az emberi szerkesztés valószínűleg szükséges.
    
### Érvénytelen Unicode karakterek{#invalid-unicode-characters} 
Néhány EML tartalom érvénytelen Unicode karaktereket tartalmaz. Ezek valószínűleg a Windows charset karakterei, amelyek helytelenül másoltak és beillesztették az UTF-8 EML fájlokat. GenerateDatasets Az Xml ezeket a karaktereket pl.\\[#128\\], így könnyű keresni aERDDAP™ datasets.xmlfájl.

Jó lenne, ha az EML-ellenőrző ezt ellenőrzi. Könnyű megtalálni és könnyen rögzíteni.
    
### Különböző oszlop egységek] (#differentColumnUnits)  {#different-column-unitsdifferentcolumnunits} 
Egyes EML adattáblák olyan oszlopokat határoznak meg, amelyek nem állnak összhangban az adatfájl oszlopaival, különösen azért, mert különböző egységekkel rendelkeznek. GenerateDatasets Az Xml ezeket zászlók. Az üzemeltető feladata eldönteni, hogy a különbségek rendben vannak-e vagy sem. Ezek a hibafájlban "SKIPPED" adattáblákként jelennek meg. EXAMPLE az SBC LTER kudarcok fájlban:
```
      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3\\_t1
      dataFile=SBCFC\\_Precip\\_Daily\\_active\\_logger.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        Daily\\_Precipitation\\_Total\\_mm = Daily\\_Precipitation\\_Total\\_inch
        Flag\\_Daily\\_Precipitation\\_Total\\_mm = Flag\\_Daily\\_Precipitation\\_Total\\_inch
      -->
```
Jó lenne, ha az EML-ellenőrző ellenőrizné, hogy az egységek megfelelnek. Sajnos ez valószínűleg lehetetlen elkapni, majd lehetetlen megoldani anélkül, hogy kapcsolatba lépne az adatkészlet létrehozójával, mivel a forrásfájl nem tartalmaz egységeket. A fenti példával kapcsolatos megkülönböztetés csak azért volt észrevehető, mert az egységek szerepeltek a forrás oszlopnévben és az EML oszlopnévben. Hány adatTables van ez a probléma, de észrevétlen?
    
### Az EML különböző verziói{#different-versions-of-eml} 
GenerateDatasets Az Xml-t úgy tervezték, hogy az EML 2.1.1-el dolgozzon. Az EML többi verziója azon a mértékben fog működni, hogy megfelelnek a 2.1.1-nek vagy a GenerateDatasetsXml-nek speciális kódja van annak kezelésére. Ez egy ritka probléma. Amikor ez megtörténik, a megoldás az, hogy fájlokat EML 2.1.1-re konvertálja, vagy küldje el az EML fájlterd.data at noaa.govÍgy változtathatok a GenerateDatasets-re Xml a különbségek kezelésére.

Bob hozzáadott támogatást az EML fájlokhoz a GenerateDatasets-hez Az Xml 2016-ban azzal a reméléssel, hogy az EML közösségében némi felvétel áll fenn. 2020 óta ez nem történt meg. A Bob örömmel támogatja az EML legújabb verzióit, de csak akkor, ha az új funkciókat ténylegesen használják. Kérlek e-mailterd.data at noaa.govha szeretne támogatást nyújtani az EML legújabb verzióihoz, és ténylegesen használja ezt a funkciót.
    
### Trouble Parsing az adatfájl{#trouble-parsing-the-data-file} 
Ritkán egy adatTable elutasítható a "váratlan számú elem a #120 sorban (megfigyelt=52, várható=50) "..." Egy hibaüzenet, mint ez azt jelenti, hogy az adatlapban egy sor más értékekkel rendelkezik, mint a többi sor. Lehet, hogy probléma ezERDDAP™  (pl. a fájl helyes elválasztása) vagy a fájlban. EXAMPLE az SBC LTER-től:
[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)adatTable #3, lásd az adatfilt = LTER\\_monthly\\_ palackdata\\_registered\\_stations\\_20140429.txt
