# Značky funkcí

Tato stránka dokumentuje konfigurační vlajky dostupné v systému. Tyto vlajky ovládají různé funkce, experimentální schopnosti a dědičné chování.

##  **Legenda o životním cyklu vlajky** 

*  **Stabilní:** Určeno jako dlouhodobé vlajky umožňující administrátorům měnit funkčnost. Bezpečné pro výrobu.
*  **Zkouška:** Funkce, které jsou připraveny k testování. Tyto budou buď odmaturovat na "stabilní", nebo nakonec budou nastaveny na jejich cílovou hodnotu a bude vlajka odstraněna.
*  **Ve stavebnictví:** V současné době zakódován na false v kódu, bez ohledu na konfiguraci. Funkce ještě není připravena k použití.

##  **Př Optimalizace testování** 

To jsou vlajky, které budou pravděpodobně v budoucnosti odstraněny.

###  **touchThreadOnlyWhenObjects** 

Popis
Optimalizační vlajka. Pokud je to pravda, dotyková nit běží pouze tehdy, když jsou položky k zpracování.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Zkouška | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 2.29.0 | 

###  **taskCacheClear** 

Popis
Umožňuje úkol pozadí, který vymaže prošlé položky z cache.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 2.27.0 | 

###  **ncHeaderMakeFile** 

Popis
Pokud je to pravda, server vygeneruje celý soubor nc před vytvořením výsledku ncheader. Nový (preferované) chování, když false je přímo generovat ncheader výsledek.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Zkouška | 
 |   **Aktuální výchozí**   | false | 
 |   **Dlouhodobý cíl**   | false | 
 |   **Historie**   | Přidáno v 2.29.0 | 

###  **USEEddReflection** 

Popis
Umožňuje použití Java Odraz na instanci EDD ( ERDDAP Dataset) třídy.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Zkouška | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Výchozí změna na true v 2.28.0, přidána v 2.25 | 

###  **Background CreateSubsetTables** 

Popis
Umožňuje vytvořit podmnožinu tabulek v pozadí pro zlepšení času načítání souborů dat.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Zkouška | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 2.29.0 | 

###  **useNcMetadataForFileTable** 

Popis
Použití NetCDF metadata pro zobrazení tabulky souborů. Zejména pokud soubor nc obsahuje skutečný _ range pro každou proměnnou, načítání datového souboru může přeskočit čtení celého souboru.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 2.29.0 | 

##  **& Základní chování** 

###  **e-mail Isactive** 

Popis
Kontroluje, zda se systém snaží odeslat skutečné e-maily (např. pro aktualizace předplatného nebo chybové zprávy) přes nakonfigurovaný SMTP server.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | false | 
 |   **Dlouhodobý cíl**   | pravda (Závislý na admin config)   | 
 |   **Historie**   | Odkaz | 

:: Informace Logika
Tato vlajka se při startu počítá dynamicky. Chyby na false, pokud všechny požadované SMTP pověření (hostitel, port, uživatel, heslo, z- adresa) jsou přísně poskytovány v setup.xml.
::

###  **showLoadErrorsOnStatusPage** 

Popis
Určuje, zda jsou na stavové stránce veřejně zobrazeny podrobné chyby při ukládání dat.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | nastavit dle potřeby | 
 |   **Historie**   | Přidáno v 2.25 | 

###  **defaultAccessibleViaFiles** 

Popis
Nastaví výchozí chování pro to, zda lze mít přístup k podkladovým souborům souboru.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | false | 
 |   **Dlouhodobý cíl**   | false | 
 |   **Historie**   | Přidáno v 2.10 | 

##  **Name** 

###  **quickRestart** 

Popis
Pokud je zapnuto, systém se pokusí začít rychleji tím, že během inicializace přeskočí některé hluboké kontroly validace souborů dat.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 1.38 | 

###  **enable EnvParsing** 

Popis
Umožňuje zpracování datasets.xml soubor s [StringSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . To má mnoho použití včetně nastavení soukromých hodnot (jako hesla) používání proměnných prostředí.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | nastavit dle potřeby | 
 |   **Historie**   | Přidáno v 2.29.0 | 

###  **useSaxParser** 

Popis
Přepne interní XML parsing motor pro použití SAX (Jednoduchý API pro XML) Parser místo Boomparser. To umožňuje některé nové pokročilé funkce jako XInclude, a [atributy vlastního zobrazení](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) .

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Zkouška | 
 |   **Aktuální výchozí**   | false | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 2.25 | 

###  **listPrivateDatasets** 

Popis
Určuje, zda soukromé soubory údajů (osoby vyžadující ověření) jsou uvedeny v hlavním seznamu datových souborů.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | false | 
 |   **Dlouhodobý cíl**   | false | 
 |   **Historie**   | Přidáno v 1.20 | 

###  **PoliticalBoundariesActive** 

Popis
Kontroluje, zda lze politické hranice vytyčit na mapách.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 1.80 | 

###  **siceSynchronousLoading** 

Popis
Nahrát soubory dat synchronně namísto odloženého načítání pozadí.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | false | 
 |   **Dlouhodobý cíl**   | false | 
 |   **Historie**   | Přidáno v 2.30 | 

##  **Metadata a normy** 

###  **fgdcActive** 

Popis
Vytváří a slouží FGDC (Federální geografické Výbor pro údaje) metadata.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 1.38 | 

###  **iso19115 Aktivní** 

Popis
Vytváří a slouží metadatům ISO19115.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 1.38 | 

###  **USESiSO19115** 

Popis
Používá knihovnu Apache SIS k generování metadat ISO19115 namísto generátoru odkazu. Pokud je zapnuto a není zapnuto USISISO19139, výchozí metadata IOS19115 budou ve formátu ISO19115 _3 _2016. Je-li toto false, bude výchozí formát ve formátu modifikovaném v odkazu ISO19115 _2.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Zkouška | 
 |   **Aktuální výchozí**   | false | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 2.26 | 

###  **USESiSO19139** 

Popis
Používá knihovnu Apache SIS k generování metadat ISO19139 _2007.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Zkouška | 
 |   **Aktuální výchozí**   | false | 
 |   **Dlouhodobý cíl**   | false | 
 |   **Historie**   | Přidáno v 2.29.0 | 

###  **jsonldActive** 

Popis
Vytváří a slouží JSON-LD (Propojená data) metadata.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Odkaz | 

###  **generateCroissantSchema** 

Popis
Vytváří schéma metadat "Croissant" jako výchozí schéma pro připravenost strojového učení.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Zkouška | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 2.28.0 | 

###  **VariablesMustHaveloosCategory** 

Popis
Zdůrazňuje, že proměnné musí mít atribut kategorie IOOS.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | nastavit dle potřeby | 
 |   **Historie**   | Odkaz | 

###  **includeNcCFSubsetProměnné** 

Popis
Chování legality bylo generovat podmnožiny proměnných pouze pro soubory EDDTableFromNcCFFiles. To bylo přidáno k výchozímu chování EDDTableFromNcCFFiles být v souladu s ostatními typy datových souborů. Pokud potřebujete odkaz automaticky subsetVariables Můžete to povolit. Lepší by bylo přidat subsetVariables k definici souboru údajů.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Zkouška | 
 |   **Aktuální výchozí**   | false | 
 |   **Dlouhodobý cíl**   | false | 
 |   **Historie**   | Přidáno v 2.26 | 

##  **Předplatné a oznámení** 

###  **NAME OF TRANSLATORS** 

Popis
Umožňuje předplatné e-mailu pro aktualizace datových souborů.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 1.14 | 

###  **předplatné ToRemoteErdapDataset** 

Popis
Umožňuje to ERDDAP instance pro přihlášení na vzdálený ERDDAP soubory dat pro aktualizace.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 1.70 | 

###  **updateSubsRssOnFileChanges** 

Popis
Závodníci předplatné a RSS aktualizace, pokud se základní soubory změní. Dědičné chování bylo pouze pro aktualizaci datového souboru (které některé servery měly tak zřídka jako týdenní) .

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 2.26 | 

###  **Povolit MqttBroker** 

Popis
Spustí interní zprostředkovatel MQTT v rámci aplikace pro zpracování zpráv.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Zkouška | 
 |   **Aktuální výchozí**   | false | 
 |   **Dlouhodobý cíl**   | nastavit dle potřeby | 
 |   **Historie**   | Přidáno v 2.29.0 | 

###  **publishMqttNotif** 

Popis
Umožňuje zveřejňování oznámení (jako změny datového souboru) k makléři MQTT.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Zkouška | 
 |   **Aktuální výchozí**   | false | 
 |   **Dlouhodobý cíl**   | nastavit dle potřeby | 
 |   **Historie**   | Přidáno v 2.29.0 | 

##  **Comment** 

###  **USEHeadersFor Url** 

Popis
Umožňuje použití HTTP hlaviček pro určení údajů URL požadavku (užitečné za proxy) .

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Výchozí změna platí v 2.28.0, přidána v 2.27.0 | 

###  **Povolit Cors** 

Popis
Umožňuje cross- Origin sdílení zdrojů (CORS) hlavičky HTTP odpovědí.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | false | 
 |   **Dlouhodobý cíl**   | nastavit dle potřeby | 
 |   **Historie**   | Přidáno v 2.26 | 

##  **Name** 

###  **USELuceneSearchEngine** 

Popis
Přepne vnitřní vyhledávač pro použití Apache Lucene.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Zkouška | 
 |   **Aktuální výchozí**   | false | 
 |   **Dlouhodobý cíl**   | ? | 
 |   **Historie**   | Odkaz | 

##  **Služby a protokoly** 

###  **filesActive** 

Popis
Umožňuje zobrazení prohlížeče "Soubory" pro soubory dat, které jej podporují.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 1.58 | 

###  **convertersActive** 

Popis
Umožňuje konverzi nástrojů v UI.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 1.44 | 

###  **slideSorterActive** 

Popis
Umožňuje Slide Sorter.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 1.44 | 

###  **dataProviderFormActive** 

Popis
Umožňuje zadávat metadata poskytovatelům dat.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Odkaz | 

###  **outOfDateDatasetsActive** 

Popis
Umožňuje vykazování souborů údajů o externím datu.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 1.82 | 

###  **wmsActive** 

Popis
Umožňuje službu Web Map ( WMS ) rozhraní.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 1.44 | 

###  **wmsClientActive** 

Popis
Umožňuje vnitřní WMS funkce klienta.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Aktuální výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Odkaz | 

###  **geoServiceRestartActive** 

Popis
Umožňuje RESTful rozhraní pro geoprostorové služby. Není plně provedena.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Pod stavbou | 
 |   **Aktuální výchozí**   | false (Hardcode)   | 
 |   **Dlouhodobý cíl**   | pravda | 

###  **wcsActive** 

Popis
Umožňuje službu pokrytí webu ( WCS ) rozhraní. Není plně provedena.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Pod stavbou | 
 |   **Aktuální výchozí**   | false (Hardcode)   | 
 |   **Dlouhodobý cíl**   | pravda | 

###  **sosActive** 

Popis
Umožňuje službu sledování senzorů ( SOS ) rozhraní.

 | Vlastnost | Podrobnosti | 
 | : -- -- | : -- -- | 
 |   **Životní cyklus**   | Pod stavbou | 
 |   **Aktuální výchozí**   | false (Hardcode)   | 
 |   **Dlouhodobý cíl**   | pravda | 
