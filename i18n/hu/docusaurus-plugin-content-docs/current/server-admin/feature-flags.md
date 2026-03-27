# Jellemzők

Ez az oldal a rendszerben elérhető konfigurációs zászlókat dokumentálja. Ezek a zászlók ellenőrzik a különböző funkciók, kísérleti képességek, és örökölt viselkedés.

##  **Flag Lifeccle Legend** 

*  **Stabil:** Hosszú távú zászlóknak szánták, hogy lehetővé tegyék az adminok számára a funkcionalitás megváltoztatását. Biztonságos.
*  **Vizsgálat:** A tesztelésre kész jellemzők. Ezek vagy lediplomáznak a "Stabil" -re, vagy végül a célértékhez igazodnak, és eltávolítják a zászlót.
*  **Építkezés alatt:** Jelenleg a kódban hamisra van kódolva, a konfigurációtól függetlenül. A funkció még nem készült fel a használatra.

##  *** A vizsgálat optimalizálása** 

Ezek a zászlók valószínűleg eltávolításra kerülnek a jövőben.

###  **touchead Only Whentelek** 

Leírás
Optimalizáló zászló. Ha igaz, az érintőszál csak akkor fut, ha vannak feldolgozandó elemek.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Vizsgálat | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Hozzáadva: 2.29.0. | 

###  **Task CacheClear** 

Leírás
A gyorsítótárból letisztító háttérfeladat engedélyezése.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Hozzáadva: 2.27.0 | 

###  **ncHeaderMakeFile** 

Leírás
Ha igaz, a szerver generálja a teljes nc fájlt, mielőtt létrehozza a olcsóbb eredményt. Az új (előnyben részesített) viselkedés, amikor hamis, hogy közvetlenül generálja a olcsóbb eredményt.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Vizsgálat | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | hamis | 
 |   **Történelem**   | Hozzáadva: 2.29.0. | 

###  **useEddReflection** 

Leírás
Engedélyezi a Java Az instant EDD reflexiója ( ERDDAP Dataset) órák.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Vizsgálat | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Alapértelmezés 2.28.0-ra módosítva, hozzáadva 2.25-höz | 

###  **backgroundCreateSubsetTables** 

Leírás
Lehetővé teszi, hogy a háttérszálakban létrehozandó altáblák javítsák az adatkészletek terhelési idejét.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Vizsgálat | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Hozzáadva: 2.29.0. | 

###  **useNcMetadataForFileTable** 

Leírás
Felhasználások NetCDF metaadatok a fájltábla megtekintéséhez. Különösen, ha az nc file minden változóhoz valós _ range-ot tartalmaz, az adatkészlet betöltése kihagyhatja az egész fájl elolvasását.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Hozzáadva: 2.29.0. | 

##  **A rendszer és a mag viselkedése** 

###  **e-mail IsActive** 

Leírás
Ellenőrzi, hogy a rendszer megpróbálja-e küldeni a tényleges e-maileket (például az előfizetés frissítéséhez vagy hibajelentéséhez) a beállított SMTP szerveren keresztül.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | igaz (Admin config függő)   | 
 |   **Történelem**   | Joghatóság | 

::: info Logic
Ezt a zászlót indításkor dinamikusan számítják ki. Hamis, kivéve, ha az összes szükséges SMTP hitelesítő (host, port, felhasználó, jelszó, a címről) szigorúan a setup.xml-ben biztosítják.
:::

###  **show LoadErrorsOnStatusPage** 

Leírás
Meghatározza, hogy a részletes adatbetöltési hibák megjelennek-e nyilvánosan az állapotoldalon.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | beállítás a kívánt módon | 
 |   **Történelem**   | Hozzáadva a 2.25-höz | 

###  **defaultAccessibleViaFiles** 

Leírás
Beállítja az alapértelmezett viselkedést, hogy egy adatkészlet alapfájljai elérhetők-e a fájlszolgáltatásban.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | hamis | 
 |   **Történelem**   | Hozzáadva: 2.10. | 

##  **- Adatbázisok** 

###  **quickRestart** 

Leírás
Ha ez be van jelölve, a rendszer megkísérli felgyorsítani a folyamatot azáltal, hogy kihagy bizonyos mély validálási ellenőrzéseket az adatkészleteken az inicializáció során.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Hozzáadva: 1.38 | 

###  **enableEnvParsing** 

Leírás
A datasets.xml fájl [StringSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Ennek sok haszna van, beleértve a magánértékek meghatározását (mint a jelszavak) környezeti változók használata.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | beállítás a kívánt módon | 
 |   **Történelem**   | Hozzáadva: 2.29.0. | 

###  **useSax Parser** 

Leírás
Kapcsolja a belső XML oldó motort SAX használatához (Egyszerű API XML-hez) a DOM-parser helyett. Ez lehetővé tesz néhány új fejlett funkciókat, mint például az XInverde, és [egyedi megjelenítő attribútumok](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) .

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Vizsgálat | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Hozzáadva a 2.25-höz | 

###  **ListPrivateDatasets** 

Leírás
Meghatározza, ha privát adatkészletek (a hitelesítést igénylő személyek) megjelenik a fő adatkészlet listán.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | hamis | 
 |   **Történelem**   | Hozzáadva: 1.20 | 

###  **politikaiHatárokAktív** 

Leírás
Ellenőrzi, hogy a politikai határok rajzolhatók-e a térképeken.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Hozzáadva: 1.80 | 

###  **forceSynchronousLoading** 

Leírás
A betöltési adatok szinkronizálódnak a késleltetett háttérterhelés helyett.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | hamis | 
 |   **Történelem**   | Hozzáadva: 2.30. | 

##  **- Method & Standards** 

###  **fgdcActive** 

Leírás
Az FGDC generálása és kiszolgálása (Szövetségi földrajzi Adatbizottság) metaadatok.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Hozzáadva: 1.38 | 

###  **izo19115 Aktív** 

Leírás
ISO 19115 metaadatokat generál és szolgál.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Hozzáadva: 1.38 | 

###  **useSISO19115** 

Leírás
Az Apache SIS könyvtárát használja az ISO 19115 metaadatok előállítására az örökölt generátor helyett. Ha ez be van kapcsolva, és a SisISO19139 nincs bekapcsolva, az alapértelmezett IOS 19115 metaadatok ISO19115 _ 3 _ 2016 formátumban lesznek. Ha ez hamis, akkor az alapértelmezett formátum a módosított ISO19115 _ 2 formátumban lesz.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Vizsgálat | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Hozzáadva: 2.26. | 

###  **useSISO19139** 

Leírás
ISO19139 _ 2007 metaadatok előállítására használja az Apache SIS könyvtárat.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Vizsgálat | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | hamis | 
 |   **Történelem**   | Hozzáadva: 2.29.0. | 

###  **jsondActive** 

Leírás
JSON- LD generál és szolgál (Kapcsolt adatok) metaadatok.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Joghatóság | 

###  **generateCroissantSchema** 

Leírás
A "Croissant" metaadatrendszert generálja a gépi tanulási készség alapértelmezett sémájaként.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Vizsgálat | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Hozzáadva: 2.28.0 | 

###  **változók MustahaveIoosKategória** 

Leírás
A változóknak IOOS kategóriájú attribútummal kell rendelkezniük.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | beállítás a kívánt módon | 
 |   **Történelem**   | Joghatóság | 

###  **ide tartoznak az NcCFSubsetVariables** 

Leírás
Legacy viselkedés volt generálni alset változók csak EDDTableFromNcCFFiles adatkészletek. Ez került hozzáadásra, hogy alapértelmezett viselkedést EDDTableFromNcCFFiles, hogy összhangban más adatkészlet típusok. Ha szükséged van a hagyaték automatikus subsetVariables Engedélyezheti. A jobb megoldás az lenne, ha hozzáadnánk subsetVariables az adatkészlet definíciójához.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Vizsgálat | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | hamis | 
 |   **Történelem**   | Hozzáadva: 2.26. | 

##  **Feliratkozások és bejelentések** 

###  **előfizetés Rendszeraktív** 

Leírás
Lehetővé teszi az e-mail előfizetési rendszer adatkészlet frissítések.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Hozzáadva: 1.14. | 

###  **előfizetés ToRemoteErddapDataset** 

Leírás
Lehetővé teszi ERDDAP a távoli előfizetés ERDDAP adatkészletek frissítéséhez.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Hozzáadva: 1.70 | 

###  **frissítések** 

Leírás
Triggers előfizetés és RSS frissítések, ha a mögöttes fájlok változnak. Az örökletes viselkedés csak az adatkészlet újratöltése volt. (ami néhány szervernek olyan ritkán volt heti) .

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Hozzáadva: 2.26. | 

###  **engedélyezése MqttBroker** 

Leírás
Elindít egy belső MQTT bróker az alkalmazás kezelni üzenetküldő.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Vizsgálat | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | beállítás a kívánt módon | 
 |   **Történelem**   | Hozzáadva: 2.29.0. | 

###  **publishMqttNotip** 

Leírás
A bejelentések közzététele (mint az adatkészlet változásai) az MQTT brókernek.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Vizsgálat | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | beállítás a kívánt módon | 
 |   **Történelem**   | Hozzáadva: 2.29.0. | 

##  **Web Headers / konfiguráció** 

###  **Felhasználás HeadersFor Url** 

Leírás
Lehetővé teszi HTTP fejlécek segítségével a kérés URL részleteit (hasznos mögött proxies) .

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Alapértelmezés: 2.28.0, hozzáadva: 2.27.0 | 

###  **engedélyezése Cors** 

Leírás
Lehetővé teszi az eredet-források megosztását (CORS) HTTP válaszok fejlécei.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | beállítás a kívánt módon | 
 |   **Történelem**   | Hozzáadva: 2.26. | 

##  **- Keresés** 

###  **useLuceneSearchEngine** 

Leírás
Kapcsolja a belső keresőmotort az Apache Lucene használatához.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Vizsgálat | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | ? | 
 |   **Történelem**   | Joghatóság | 

##  **- Szolgáltatások és jegyzőkönyvek** 

###  **filesActive** 

Leírás
Engedélyezi a "Fájlok" böngésző nézetét az azt támogató adathalmazokhoz.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Hozzáadva: 1.58 | 

###  **konvertersActive** 

Leírás
Konverziós eszközök engedélyezése az EU-ban.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Hozzáadva: 1.44 | 

###  **slideSorterActive** 

Leírás
Engedélyezi a Slide Sortert.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Hozzáadva: 1.44 | 

###  **dataProviderFormative** 

Leírás
Lehetővé teszi az adatszolgáltatók számára a bemeneti metaadatokat.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Joghatóság | 

###  **OfDateDatasetActive** 

Leírás
Engedélyezi a dátumon kívüli adatok bejelentését.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Hozzáadva: 1.82 | 

###  **wmsActive** 

Leírás
A webtérképszolgáltatás engedélyezése ( WMS ) interfész.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Hozzáadva: 1.44 | 

###  **wmsClienActive** 

Leírás
A belső WMS ügyfélfunkciók.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | igaz | 
 |   **Hosszú távú cél**   | igaz | 
 |   **Történelem**   | Joghatóság | 

###  **geoServicesRestActive** 

Leírás
A RESTful interfész a Geosteral Services számára. Nem teljes mértékben végrehajtott.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Építés alatt | 
 |   **Jelenlegi alapértelmezés**   | hamis (Kódolva)   | 
 |   **Hosszú távú cél**   | igaz | 

###  **wcsActive** 

Leírás
Engedélyezi a webes lefedettségi szolgáltatást ( WCS ) interfész. Nem teljes mértékben végrehajtott.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Építés alatt | 
 |   **Jelenlegi alapértelmezés**   | hamis (Kódolva)   | 
 |   **Hosszú távú cél**   | igaz | 

###  **sosActive** 

Leírás
Az érzékelő megfigyelési szolgáltatás engedélyezése ( SOS ) interfész.

 | Tulajdonság | Részletek | 
 | : -- | : -- | 
 |   **Életciklus**   | Építés alatt | 
 |   **Jelenlegi alapértelmezés**   | hamis (Kódolva)   | 
 |   **Hosszú távú cél**   | igaz | 
