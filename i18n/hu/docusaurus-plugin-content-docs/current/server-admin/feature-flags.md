# Feature zászlók

Ez az oldal dokumentálja a rendszerben elérhető konfigurációs zászlókat. Ezek a zászlók különböző funkciókat, kísérleti képességeket és örökös viselkedéseket irányítanak.

##  **zászló életciklus legenda** 

*  **Stabil:** Olyan hosszú távú zászlókként fejlesztettek ki, amelyek lehetővé teszik az adminok számára a funkcionalitás megváltoztatását. Biztonságos a termeléshez.
*  **Tesztelés:** Jellemzők, amelyek készen állnak a tesztelésre. Ezek vagy diplomások "Stabil" vagy végül beállítják a célértéket, és a zászló eltávolítása.
*  **Építés alatt:** Jelenleg keményen kódolt hamis a kódban, függetlenül a konfigurációtól. A funkció még nem áll készen a használatra.

##  **Ó Optimalizálások tesztelés** 

Ezek a zászlók valószínűleg eltávolításra kerülnek a jövőben.

###  **ThreadOnlyWhenItems** 

Leírás
Optimalizációs zászló. Ha igaz, az érintő szál csak akkor fut, ha vannak elemek feldolgozására.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Tesztelés | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Hozzáadva 2,29.0 | 

###  **feladatCacheClear** 

Leírás
Lehetővé teszi a háttér feladatát, amely megtisztítja a lejáratott elemeket a csészéből.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Hozzáadva 2.27.0 | 

###  **ncHeaderMakeFile** 

Leírás
Ha igaz, a szerver generálja az egész nc fájlt, mielőtt létrehozza a ncheader eredményt. Az új (preferált) viselkedés, ha hamis, hogy közvetlenül generálja a ncheader eredményt.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Tesztelés | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | hamis | 
 |   **Történelem**   | Hozzáadva 2,29.0 | 

###  **HasználataEddReflection** 

Leírás
Lehetővé teszi a használatát Java Az EDD azonnali ( ERDDAP Adatbázis) osztályok.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Tesztelés | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Az alapértelmezettség 2,28,0-ban változott, 2,25-ben | 

###  **háttérCreateSubsetTables** 

Leírás
Lehetővé teszi az alkatrész táblák létrehozását a háttér szálakban, hogy javítsák az adatkészletek betöltési időt.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Tesztelés | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Hozzáadva 2,29.0 | 

###  **NcMetadataForFileTable** 

Leírás
Használatok NetCDF metadata, hogy populálja a fájl táblázat nézetét. Különösen, ha egy nc fájl tartalmazza a tényleges_range-t minden változóhoz, az adatkészlet-terhelést kihagyhatja az egész fájl olvasását.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Hozzáadva 2,29.0 | 

##  **Rendszer és alapvető viselkedés** 

###  **e-mail cím IsActive** 

Leírás
Ellenőrzi, hogy a rendszer megpróbál-e tényleges e-maileket küldeni (pl. előfizetési frissítésekre vagy hibajelentésekre) a konfigurált SMTP szerveren keresztül.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | Igaz (Az admin konfigurációtól függően)   | 
 |   **Történelem**   | Legacy | 

::info logika
Ezt a zászlót dinamikusan az induláskor számítják ki. Ez hamisnak bizonyul, hacsak nem minden szükséges SMTP hitelesítő (host, port, felhasználó, jelszó, öltözködő) szigorúan a setup.xml.
:::

###  **dalszöveg: LoadErrorsOnStatusPage** 

Leírás
Határozza meg, hogy a részletes adatkészlet-terhelési hibák nyilvánosan jelennek meg a status oldalon.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | a kívánt | 
 |   **Történelem**   | Hozzáadva 2,25 | 

###  **DefaultAccessibleViaFiles** 

Leírás
Beállítja az alapértelmezett viselkedést annak érdekében, hogy egy adatkészlet mögöttes fájljai elérhetők-e a fájlok szolgáltatásában.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | hamis | 
 |   **Történelem**   | Hozzáadva 2,10 | 

##  **Adatkészletek** 

###  **GyorsRestart** 

Leírás
Ha engedélyezett, a rendszer gyorsabban próbálja kiindulni azáltal, hogy kihagy bizonyos mély validálási ellenőrzéseket az adatkészleteken az indulás során.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Hozzáadva 1,38 | 

###  **lehetővé teszi az EnvParsing** 

Leírás
Lehetővé teszi a feldolgozást datasets.xml fájl egy [StringSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) ... Ez sok felhasználással rendelkezik, beleértve a magánértékek beállítását (mint a jelszavak) környezeti változók használata.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | a kívánt | 
 |   **Történelem**   | Hozzáadva 2,29.0 | 

###  **HasználataSaxParser** 

Leírás
kapcsolja be a belső XML pótlómotort egy SAX használatára (Egyszerű API az XML számára) parser a DOM parser helyett. Ez lehetővé teszi néhány új fejlett funkciók, mint a XInclude, és [egyedi megjelenítési tulajdonságok](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) ...

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Tesztelés | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Hozzáadva 2,25 | 

###  **ListPrivateDatasets** 

Leírás
Határozza meg a magánadatbázisokat (azok, amelyek hitelesítést igényelnek) megjelenik a fő adatkészlet listán.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | hamis | 
 |   **Történelem**   | Hozzáadva 1,20 | 

###  **Politikai határok** 

Leírás
Ellenőrzi, hogy a politikai határokat térképekre lehet-e rajzolni.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Hozzáadva 1,80 | 

##  **Metadata és szabványok** 

###  **fgdcActive** 

Leírás
Generál és szolgálja az FGDC-t (Szövetségi Földrajz Adatbizottság) Metaadata.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Hozzáadva 1,38 | 

###  **Iso19115 Aktív** 

Leírás
Generálja és szolgálja az ISO 19115 metaadatot.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Hozzáadva 1,38 | 

###  **HasználataSisO19115** 

Leírás
Használja az Apache SIS könyvtárat, hogy ISO 19115 metaadatot generáljon az örökség generátor helyett. Ha ez van, és használjaSisISO19139 nem működik, az alapértelmezett IOS 19115 metaadata lesz az ISO19115_3_2016 formátumban. Ha ez hamis, akkor az alapértelmezett formátum az ISO19115_2 örök módosított formátumban lesz.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Tesztelés | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Hozzáadva 2,26 | 

###  **HasználataSisO19139** 

Leírás
Használja az Apache SIS könyvtárat az ISO19139_2007 metaadat létrehozására.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Tesztelés | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | hamis | 
 |   **Történelem**   | Hozzáadva 2,29.0 | 

###  **dalszöveg: JsonldActive** 

Leírás
Generál és szolgálja a JSON-LD-t (Linked adatok) Metaadata.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Legacy | 

###  **CroissantSchema** 

Leírás
Generálja a "Croissant" metaadat schema, mint az alapértelmezett schema gépi tanulási készenlét.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Tesztelés | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Hozzáadva 2,28.0 | 

###  **változókMustHaveIoosCategory** 

Leírás
Annak érdekében, hogy a változóknak IOOS-kategóriával kell rendelkezniük.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | a kívánt | 
 |   **Történelem**   | Legacy | 

###  **NcCFSubsetVariables** 

Leírás
A legacy magatartás az volt, hogy csak az EDDTableFromNcCFFiles adatkészleteket generáljon. Ezt hozzáadták az EDDTableFromNcCFFiles viselkedésének visszaállításához, hogy következetes legyen más adatkészlettípusokkal. Ha szüksége van a örökség automatikus subsetVariables Ezt lehetővé teheted. A jobb megoldás az lenne, ha hozzáadnánk subsetVariables az adatkészlet meghatározása.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Tesztelés | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | hamis | 
 |   **Történelem**   | Hozzáadva 2,26 | 

##  **Előfizetések és értesítések** 

###  **ElőfizetésSystemActive** 

Leírás
Lehetővé teszi az e-mail előfizetési rendszert az adatkészlet-frissítésekhez.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Hozzáadva 1,14 | 

###  **SubscribeToRemoteErddapDataset** 

Leírás
Lehetővé teszi ezt ERDDAP Például, hogy feliratkozzon a távoli ERDDAP adatkészletek a frissítésekhez.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Hozzáadva 1,70 | 

###  **frissítésSubsRssOnFileChanges** 

Leírás
Triggers előfizetés és RSS frissítések, amikor a mögöttes fájlok megváltoznak. Az örökség viselkedése csak az adatkészlet-visszatöltésre vonatkozó frissítések voltak (melyik szervernek volt olyan gyakran hetente) ...

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Hozzáadva 2,26 | 

###  **lehetővé teszi MqttBroker** 

Leírás
Indítsa el a belső MQTT brókert az alkalmazáson belül, hogy kezelje a üzeneteket.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Tesztelés | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | a kívánt | 
 |   **Történelem**   | Hozzáadva 2,29.0 | 

###  **dalszöveg: MqttNotif** 

Leírás
Lehetővé teszi az értesítések közzétételét (mint az adatkészlet változása) az MQTT brókerhez.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Tesztelés | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | a kívánt | 
 |   **Történelem**   | Hozzáadva 2,29.0 | 

##  **Headers/konfiguráció** 

###  **HasználatHeadersFor Url** 

Leírás
Lehetővé teszi a HTTP-fejlesztők használatát, hogy meghatározzák a kérés URL részleteit (hasznos proxis mögött) ...

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Az alapértelmezettség 2,28,0-ban változott, 2,27,0-ban | 

###  **lehetővé teszi Súgó** 

Leírás
Lehetővé teszi a Cross-Origin erőforrás megosztását (CORS) HTTP válaszok vezetői.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | a kívánt | 
 |   **Történelem**   | Hozzáadva 2,26 | 

##  **Keresés** 

###  **HasználataLuceneSearchEngine** 

Leírás
Váltja a belső keresőmotort az Apache Lucene használatára.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Tesztelés | 
 |   **Jelenlegi alapértelmezés**   | hamis | 
 |   **Hosszú távú cél**   | ? | 
 |   **Történelem**   | Legacy | 

##  **Szolgáltatások és protokollok** 

###  **fájlokActive** 

Leírás
Lehetővé teszi a "Files" böngésző nézetét az általa támogatott adatkészletekre.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Hozzáadva 1,58 | 

###  **konverterekAktív** 

Leírás
Lehetővé teszi a konverziós eszközöket az UI-ban.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Hozzáadva 1,44 | 

###  **dalszöveg: SlideSorterActive** 

Leírás
Lehetővé teszi a Slide Sorter.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Hozzáadva 1,44 | 

###  **DataProviderFormActive** 

Leírás
Lehetővé teszi az adatszolgáltatók számára a metaadat bevitelét.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Legacy | 

###  **OutOfDateDatasetsActive** 

Leírás
Lehetővé teszi a naprakész adatkészletek bejelentését.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Hozzáadva 1,82 | 

###  **wmsActive** 

Leírás
Lehetővé teszi a Web Map szolgáltatást ( WMS ) interfész.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Hozzáadva 1,44 | 

###  **wmsClientActive** 

Leírás
Lehetővé teszi a belső WMS ügyfél funkciók.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Stabil | 
 |   **Jelenlegi alapértelmezés**   | Igaz | 
 |   **Hosszú távú cél**   | Igaz | 
 |   **Történelem**   | Legacy | 

###  **geoServicesRestActive** 

Leírás
Lehetővé teszi RESTful interfész a Geospatial Services számára. Nem teljesen megvalósított.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Építés alatt | 
 |   **Jelenlegi alapértelmezés**   | hamis (Hardcod)   | 
 |   **Hosszú távú cél**   | Igaz | 

###  **wcsActive** 

Leírás
Lehetővé teszi a Web Coverage szolgáltatást ( WCS ) interfész. Nem teljesen megvalósított.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Építés alatt | 
 |   **Jelenlegi alapértelmezés**   | hamis (Hardcod)   | 
 |   **Hosszú távú cél**   | Igaz | 

###  **dalszöveg** 

Leírás
Lehetővé teszi az érzékelő megfigyelési szolgáltatást ( SOS ) interfész.

 | Tulajdonság | Részletek | 
 | ---- | ---- | 
 |   **Életciklus**   | Építés alatt | 
 |   **Jelenlegi alapértelmezés**   | hamis (Hardcod)   | 
 |   **Hosszú távú cél**   | Igaz | 
