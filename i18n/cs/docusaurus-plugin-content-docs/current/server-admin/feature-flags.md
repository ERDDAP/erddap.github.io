# Vlajky funkcí

Tato stránka dokumentuje konfigurační vlajky dostupné v systému. Tyto vlajky ovládají různé funkce, experimentální schopnosti a chování.

##  **Legenda o životním cyklu vlajky** 

*  **Stabilní:** Plánované jako dlouhodobé vlajky, které umožňují administrátorům měnit funkčnost. V bezpečí pro výrobu.
*  **Testování:** Funkce, které jsou připraveny k testování. Tyto budou buď absolventem "Stáj," nebo budou nakonec nastaveny na cílovou hodnotu a budou odstraněny vlajky.
*  **Ve výstavbě:** V současné době hardkódován k false v kódu, bez ohledu na konfiguraci. Funkce ještě není připravena k použití.

##  **? Optimalizace při testování** 

To jsou vlajky, které budou pravděpodobně v budoucnu odstraněny.

###  **touchThreadOnlyWhenItems** 

Popis zboží
Optimalizační vlajka. Pokud je to pravda, dotykové vlákno běží pouze tehdy, když jsou věci k zpracování.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Testování | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno 2.29.0 | 

###  **úkolCacheClear** 

Popis zboží
Povolí úkol pozadí, který odstraní prošlé položky z cache.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno 2.27.0 | 

###  **ncHeaderMakeFile** 

Popis zboží
Pokud je to pravda, server před vytvořením výsledku ncheader vytvoří celý soubor nc. Nový (preferovaný) chování, když je falešné je přímo generovat výsledek ncheader.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Testování | 
 |   **Současná výchozí**   | false | 
 |   **Dlouhodobý cíl**   | false | 
 |   **Historie**   | Přidáno 2.29.0 | 

###  **použítEddReflekce** 

Popis zboží
Povoluje použití Java Odraz k instantizaci EDD ( ERDDAP Soubor dat) třídy.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Testování | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Výchozí změna na true v 2.28.0, přidáno v 2.25 | 

###  **pozadíVytvořitSubsetTables** 

Popis zboží
Umožňuje vytvoření podmnožinových tabulek v podkladových vláknech pro zlepšení doby načítání souborů.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Testování | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno 2.29.0 | 

###  **použítNcMetadataForFileTable** 

Popis zboží
Použití NetCDF Metadata pro zalidnění zobrazení tabulky souborů. Zejména pokud nc soubor obsahuje aktuální_range pro každou proměnnou, načítání souborů může přeskočit čtení celého souboru.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno 2.29.0 | 

##  **Systém a hlavní chování** 

###  **e-mail IsActive** 

Popis zboží
Kontroluje, zda se systém pokouší odeslat skutečné e-maily (např. pro aktualizace předplatného nebo hlášení chyb) přes nakonfigurovaný SMTP server.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | false | 
 |   **Dlouhodobý cíl**   | pravda (Závisí na admin config)   | 
 |   **Historie**   | Odkaz | 

:::info Logic
Tato vlajka je při startu dynamicky vypočtena. It defaults to false pokud všechny požadované SMTP pověření (hostitel, port, uživatel, heslo, z adresy) jsou přísně poskytovány v setup.xml.
::

###  **showLoadErrorsOnStatusPage** 

Popis zboží
Určuje, zda jsou na stránce stavu veřejně zobrazeny detailní chyby zatížení souborů.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | nastavit podle potřeby | 
 |   **Historie**   | Přidáno v 2.25 | 

###  **výchozíDostupnéViaFiles** 

Popis zboží
Nastaví výchozí chování pro to, zda lze v souborové službě přistupovat k základním souborům datového souboru.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | false | 
 |   **Dlouhodobý cíl**   | false | 
 |   **Historie**   | Přidáno 2.10 | 

##  **Datasety** 

###  **rychleRestartovat** 

Popis zboží
Pokud je to povoleno, systém se snaží spustit rychleji přeskočením některých hlubokých kontrol validace dat během inicializace.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 1.38 | 

###  **enableEnvParsing** 

Popis zboží
Povoluje zpracování datasets.xml soubor s [Stringsubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . To má mnoho využití včetně nastavení soukromých hodnot (jako hesla) pomocí proměnných prostředí.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | nastavit podle potřeby | 
 |   **Historie**   | Přidáno 2.29.0 | 

###  **použijte SaxParser** 

Popis zboží
Přepne interní XML parsingový motor pro použití SAX (Jednoduché API pro XML) Parser místo parseru DOM. To umožňuje některé nové pokročilé funkce, jako je XInclude, a [vlastní atributy zobrazení](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) .

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Testování | 
 |   **Současná výchozí**   | false | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 2.25 | 

###  **seznamPrivateDatasets** 

Popis zboží
Určuje, zda soukromé soubory údajů (kteří vyžadují ověření) se objeví v hlavním seznamu souborů údajů.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | false | 
 |   **Dlouhodobý cíl**   | false | 
 |   **Historie**   | Přidáno v 1.20 | 

###  **Političtí BoundariesActive** 

Popis zboží
Kontroluje, zda lze politické hranice vykreslit na mapách.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 1.80 | 

##  **Metadata a standardy** 

###  **fgdcActive** 

Popis zboží
Generuje a slouží FGDC (Spolkový geograf Výbor pro údaje) metadata.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 1.38 | 

###  **iso19115 Aktivní** 

Popis zboží
Generuje a slouží ISO 19115 metadata.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 1.38 | 

###  **použitíSisISO19115** 

Popis zboží
Používá knihovnu Apache SIS k generování ISO 19115 metadat namísto původního generátoru. Pokud toto není zapnuto a použitoSisISO19139, výchozí IOS 19115 metadata budou ve formátu ISO19115_3_2016. Pokud je to false, bude výchozí formát ve starém upraveném formátu ISO19115_2.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Testování | 
 |   **Současná výchozí**   | false | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 2.26 | 

###  **použitíSisISO19139** 

Popis zboží
Používá knihovnu Apache SIS pro generování metadat ISO19139_2007.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Testování | 
 |   **Současná výchozí**   | false | 
 |   **Dlouhodobý cíl**   | false | 
 |   **Historie**   | Přidáno 2.29.0 | 

###  **JsonldActive** 

Popis zboží
Generuje a slouží JSON-LD (Propojené údaje) metadata.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Odkaz | 

###  **generovatCroissantSchema** 

Popis zboží
Generuje "Croissant" metadata schema jako výchozí schéma pro připravenost strojového učení.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Testování | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 2.28.0 | 

###  **proměnnéMusímmítIoosKategorie** 

Popis zboží
Vymáhá, aby proměnné měly atribut kategorie IOOS.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | nastavit podle potřeby | 
 |   **Historie**   | Odkaz | 

###  **zahrnujíNcCFSubsetVariables** 

Popis zboží
Chování Legacy bylo generování podmnožinových proměnných pouze pro datové soubory EDDTableFromNcCFFiles. To bylo přidáno do výchozího stavu chování pro EDDTableFromNcCFFiles, aby bylo v souladu s jinými typy souborů dat. Pokud potřebujete odkaz automatické subsetVariables Můžete to povolit. Lepší řešení by bylo přidat subsetVariables k definici datového souboru.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Testování | 
 |   **Současná výchozí**   | false | 
 |   **Dlouhodobý cíl**   | false | 
 |   **Historie**   | Přidáno v 2.26 | 

##  **Předplatné a oznámení** 

###  **předplatnéSystemActive** 

Popis zboží
Umožňuje systém předplatného e-mailu pro aktualizace souborů dat.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 1.14 | 

###  **upsatDoRemoteErddapDataset** 

Popis zboží
Umožňuje ERDDAP instance pro přihlášení ke vzdálenému ERDDAP Data pro aktualizace.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 1.70 | 

###  **updateSubsRssOnFileChangs** 

Popis zboží
Spouštěcí předplatné a RSS aktualizace při změně základních souborů. Dědictví chování bylo pouze dělat aktualizace na soubor data reload (které některé servery měly jako často týdně) .

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 2.26 | 

###  **povolit MqttBroker** 

Popis zboží
Spustí vnitřní MQTT broker v rámci aplikace pro zpracování zpráv.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Testování | 
 |   **Současná výchozí**   | false | 
 |   **Dlouhodobý cíl**   | nastavit podle potřeby | 
 |   **Historie**   | Přidáno 2.29.0 | 

###  **publikovatMqttNotif** 

Popis zboží
Povoluje zveřejňování oznámení (jako změny datového souboru) MQTT makléři.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Testování | 
 |   **Současná výchozí**   | false | 
 |   **Dlouhodobý cíl**   | nastavit podle potřeby | 
 |   **Historie**   | Přidáno 2.29.0 | 

##  **Webové hlavičky/konfigurace** 

###  **UseHeadersPro Url** 

Popis zboží
Umožňuje pomocí hlaviček HTTP určit detaily URL požadavku (užitečné za proxy) .

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Výchozí změna na true v 2.28.0, Přidáno v 2.27.0 | 

###  **povolit Cors** 

Popis zboží
Povoluje sdílení zdrojů přes zdroj (KORS) hlavičky HTTP odpovědí.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | false | 
 |   **Dlouhodobý cíl**   | nastavit podle potřeby | 
 |   **Historie**   | Přidáno v 2.26 | 

##  **Hledat** 

###  **použítLuceneSearchEngine** 

Popis zboží
Přepne vnitřní vyhledávač pro použití Apache Lucene.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Testování | 
 |   **Současná výchozí**   | false | 
 |   **Dlouhodobý cíl**   | ? | 
 |   **Historie**   | Odkaz | 

##  **Služby a protokoly** 

###  **souboryActive** 

Popis zboží
Umožňuje zobrazení prohlížeče "Files" pro soubory, které jej podporují.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 1.58 | 

###  **měničeActive** 

Popis zboží
Povoluje konvertační nástroje v UI.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 1.44 | 

###  **slideSorterActive** 

Popis zboží
Povoluje Slide Sorter.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 1.44 | 

###  **dataProviderFormActive** 

Popis zboží
Umožňuje formulář umožňující poskytovatelům dat vstupní metadata.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Odkaz | 

###  **OutOfDateDatasetsActive** 

Popis zboží
Povoluje hlášení zastaralých souborů dat.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno 1.82 | 

###  **wmsActive** 

Popis zboží
Povolí službu Web Map ( WMS ) rozhraní.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Přidáno v 1.44 | 

###  **wmsClientActive** 

Popis zboží
Povolí vnitřní WMS Klientské rysy.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Stabilní | 
 |   **Současná výchozí**   | pravda | 
 |   **Dlouhodobý cíl**   | pravda | 
 |   **Historie**   | Odkaz | 

###  **geoSlužbyRestActive** 

Popis zboží
Povolí RESTful rozhraní pro geoprostorové služby. Není plně realizován.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Ve výstavbě | 
 |   **Současná výchozí**   | false (Hardcoded)   | 
 |   **Dlouhodobý cíl**   | pravda | 

###  **wcsActive** 

Popis zboží
Povolí Webovou službu pokrytí ( WCS ) rozhraní. Není plně realizován.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Ve výstavbě | 
 |   **Současná výchozí**   | false (Hardcoded)   | 
 |   **Dlouhodobý cíl**   | pravda | 

###  **sosActive** 

Popis zboží
Umožňuje službu pozorování senzorů ( SOS ) rozhraní.

 | Majetek | Podrobnosti | 
 | :--- | :--- | 
 |   **Životní cyklus**   | Ve výstavbě | 
 |   **Současná výchozí**   | false (Hardcoded)   | 
 |   **Dlouhodobý cíl**   | pravda | 
