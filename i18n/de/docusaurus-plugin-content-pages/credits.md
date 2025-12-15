# Kredite

## Beiträge zu ERDDAP™ Code{#contributions-to-erddap-code} 
* MergeIR
     [ EDDGrid VonMergeIRFiles.java](/docs/server-admin/datasets#eddgridfrommergeirfiles) wurde geschrieben und von Jonathan Lafite und Philippe Makowski von R.Tech Engineering beigetragen (Lizenz: urheberrechtlich geschützte Open Source) . Danke, Jonathan und Philippe&#33;
     
* TabelleWriterDataTable
     [.data Tabelle (TabelleWriterDataTable.java) ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType) geschrieben und von Roland Schweitzer NOAA   (Lizenz: urheberrechtlich geschützte Open Source) . Danke. Roland&#33;
     
* json-ld
Die erste Version der [Semantische Markierung von Datensätzen mit json-ld (JSON Linked Data) ](/docs/server-admin/additional-information#json-ld) Funktion (und damit die ganze harte Arbeit bei der Gestaltung des Inhalts) geschrieben und beigetragen (Lizenz: urheberrechtlich geschützte Open Source) von Adam Leadbetter und Rob Fuller vom Marine Institute in Irland. Danke. Adam und Rob&#33;
     
*    orderBy   
Der Code für die [ orderByMean Filter](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderByMean) in tabledap und die umfangreichen Änderungen des Codes zur Unterstützung der [_variableName/divisor:offset_ notation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderByDivisorOptions) für alle orderBy Filter wurden geschrieben und beigetragen (Lizenz: urheberrechtlich geschützte Open Source) von Rob Fuller und Adam Leadbetter vom Marine Institute in Irland. Danke. Rob und Adam&#33;
     
* Borderless Marker Typen
Der Code für drei neue Markertypen (Borderless Filled Square, Borderless Filled Circle, Borderless Filled Up Dreieck) wurde von Marco Alba von ETT / EMODnet Physik beigetragen. Danke. Marco Alba&#33;
     
* Übersetzungen von Nachrichten.xml
Die erste Version des Codes in TranslateMessages.java, die den Übersetzungsdienst von Google verwendet, um Messages.xml in verschiedene Sprachen zu übersetzen, wurde von Qi Zeng geschrieben, der als Google Summer of Code intern tätig war. Danke. Qi&#33;
     
*    orderBy Summe
Der Code für die [ orderBy Summenfilter](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBySum) in tabledap   (basierend auf Rob Fuller und Adam Leadbetter's orderByMean ) und die Alle überprüfen und alle Tasten auf der EDDGrid Datenzugriffsformular wurden geschrieben und beigetragen (Lizenz: urheberrechtlich geschützte Open Source) von Marco Alba von ETT Solutions und EMODnet. Danke. Marco&#33;
     
* Out-of-range .transparent Png Anfragen
     ERDDAP™ akzeptiert jetzt Anträge auf . transparent Png's, wenn die Breiten- und/oder Längenwerte teilweise oder vollständig außer Reichweite sind. (Das war ERDDAP™ GitHub Issues #19, gepostet von Rob Fuller -- danke für das posten, Rob.) Der Code, um das zu beheben, wurde von Chris John geschrieben. Danke. Chris&#33;
     
* Bilddaten von base64 anzeigen in .htmlTable Antworten
Der Code zur Anzeige von Basis64-Bilddaten in .htmlTable Antworten wurden von Marco Alba von ETT / EMODnet Physics beigetragen. Danke. Marco Alba&#33;
     
* nThreads Verbesserung
Das nThreads-System für EDDTableFromFiles wurde deutlich verbessert. Diese Veränderungen führen zu einer enormen Geschwindigkeitsverbesserung (z.B. 2X Beschleunigung, wenn nThreads auf 2 oder mehr eingestellt ist) für die anspruchsvollsten Anfragen (wenn eine große Anzahl von Dateien verarbeitet werden muss, um die Ergebnisse zu sammeln) . Diese Veränderungen werden auch zu einer allgemeinen Beschleunigung führen ERDDAP™ . Der Code für diese Änderungen wurde von Chris John beigetragen. Danke. Chris&#33;

* Farbpalette EK80 für akustische Datensätze. Danke Rob Cermak&#33;

* EDDTableAggregateRows Aggregation über alle Kinder fest. Danke Marco Alba&#33;

* Fix für falsche varNames in Protokollen. Danke Ayush Singh&#33;
