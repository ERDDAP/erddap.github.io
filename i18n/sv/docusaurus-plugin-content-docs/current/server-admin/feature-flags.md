# Funktion Flaggor

Den här sidan dokumenterar de konfigurationsflaggor som finns i systemet. Dessa flaggor styr olika funktioner, experimentella funktioner och äldre beteenden.

##  **Flag Lifecycle Legend** 

*  **Stabil:** Avsett som långsiktiga flaggor för att tillåta administratörer att ändra funktionalitet. Säker för produktion.
*  **Testning:** Funktioner som är redo för testning. Dessa kommer antingen att examen till "Stabil" eller så småningom ställas in till deras målvärde och har flaggan bort.
*  **Under byggandet:** För närvarande hårdkodad till falsk i koden, oavsett konfiguration. Funktionen är ännu inte redo för användning.

##  **😀 Optimering i testning** 

Detta är flaggor som kan tas bort i framtiden.

###  **touchThreadOnlyWhenItems** 

Beskrivning
Optimeringsflaggan. Om det är sant körs touchtråden bara när det finns saker att bearbeta.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Testning | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Tillagd i 2.29.0 | 

###  **uppgiftCacheClear** 

Beskrivning
Möjliggör bakgrundsuppgiften som rensar utgångna objekt från cache.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Tillagd i 2.27.0 | 

###  **ncHeaderMakeFile** 

Beskrivning
Om det är sant genererar servern hela nc-filen innan du skapar ncheader-resultatet. Den nya (Föredrog) beteende när falskt är att direkt generera ncheader resultat.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Testning | 
 |   **Nuvarande standard**   | falska lögner | 
 |   **Långsiktigt mål**   | falska lögner | 
 |   **Historia historia**   | Tillagd i 2.29.0 | 

###  **AnvändEddReflection** 

Beskrivning
möjliggör användning av Java Reflektion för att omedelbara EDD ( ERDDAP Dataset) klasser.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Testning | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Standard ändrades till sant i 2.28.0, tillagd i 2.25 | 

###  **bakgrundCreateSubsetTables** 

Beskrivning
Tillåter att subset tabeller skapas i bakgrundstrådar för att förbättra dataset laddningstid.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Testning | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Tillagd i 2.29.0 | 

###  **AnvändNcMetadataForFileTable** 

Beskrivning
Användning NetCDF metadata för att fylla filtabellvyn. I synnerhet om en nc-fil innehåller faktisk_range för varje variabel kan datasetbelastningen hoppa över att läsa hela filen.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Tillagd i 2.29.0 | 

##  **System & Core Behavior** 

###  **e-post e-post e-post e-post e-post e-post e-post e-post e-post e-post e-post e-post e-post e-post e-post e-post e-post e-mail e-post e-post e-post e-post e-post e-post e-post e-post e-post e-post e-mail e-mail e-post e-post e-post e-post e-post e-post e-post e-post e-post e-mail e-post e-post e-mail e-mail e-mail e-mail e-mail e-post e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e-mail e IsAktiv** 

Beskrivning
Kontrollerar om systemet försöker skicka faktiska e-postmeddelanden (t.ex. för abonnemangsuppdateringar eller felrapporter) via konfigurerad SMTP-server.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | falska lögner | 
 |   **Långsiktigt mål**   | sanning sant (Beroende på admin config)   | 
 |   **Historia historia**   | Legacy | 

Info Logic
Denna flagga beräknas dynamiskt vid start. Det standarder för falskt om inte alla krävs SMTP-uppgifter (värd, port, användare, lösenord, från-adress) är strikt tillhandahålls i setup.xml.
::::::

###  **ShowLoadErrorsOnStatusPage** 

Beskrivning
Bestäm om detaljerade datamängdsfel visas offentligt på statussidan.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | som önskat | 
 |   **Historia historia**   | Tillagd i 2,25 | 

###  **DefaultAccessibleViaFiles** 

Beskrivning
Anger standardbeteende för om en dataset underliggande filer kan nås i filtjänsten.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | falska lögner | 
 |   **Långsiktigt mål**   | falska lögner | 
 |   **Historia historia**   | Läggs till i 2.10 | 

##  **Datasets** 

###  **Snabbstart** 

Beskrivning
Om det är möjligt försöker systemet att starta snabbare genom att hoppa över vissa djupa valideringskontroller på datamängder under initiering.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Tillagd i 1.38 | 

###  **aktiveraEnvParsing** 

Beskrivning
möjliggör bearbetning av datasets.xml fil med en [StringSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Detta har många användningsområden inklusive att ställa in privata värden (som lösenord) använda miljövariabler.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | som önskat | 
 |   **Historia historia**   | Tillagd i 2.29.0 | 

###  **AnvändSaxParser** 

Beskrivning
Switches den interna XML parsing motor att använda en SAX (Enkel API för XML) Parser istället för DOM parser. Detta möjliggör nya avancerade funktioner som XInclude, och [anpassade display attribut](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) .

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Testning | 
 |   **Nuvarande standard**   | falska lögner | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Tillagd i 2,25 | 

###  **ListaPrivateDatasets** 

Beskrivning
Bestäm om privata datamängder (de som kräver autentisering) visas i huvuddataset-listan.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | falska lögner | 
 |   **Långsiktigt mål**   | falska lögner | 
 |   **Historia historia**   | Tillagd i 1.20 | 

###  **politiska gränser** 

Beskrivning
Kontrollerar om politiska gränser kan dras på kartor.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Tillagd i 1,80 | 

###  **forcesynchronousLoading** 

Beskrivning
Load datasets synkron i stället för uppskjuten bakgrundsbelastning.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | falska lögner | 
 |   **Långsiktigt mål**   | falska lögner | 
 |   **Historia historia**   | Tillagd i 2.30 | 

##  **Metadata och standarder** 

###  **FgdcActive** 

Beskrivning
Genererar och tjänar FGDC (Federal Geographic Datakommittén) metadata.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Tillagd i 1.38 | 

###  **iso19115 Aktivt** 

Beskrivning
Genererar och serverar ISO 19115 metadata.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Tillagd i 1.38 | 

###  **AnvändSISO19115** 

Beskrivning
Använder Apache SIS-biblioteket för att generera ISO 19115-metadata istället för arvsgeneratorn. Om detta är på och använderSisISO19139 inte är på, kommer standard IOS 19115 metadata vara i ISO19115_3_2016-format. Om detta är falskt kommer standardformatet att vara i arvsmodifierad ISO19115_2-format.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Testning | 
 |   **Nuvarande standard**   | falska lögner | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Tillagd i 2,26 | 

###  **AnvändSISO19139** 

Beskrivning
Använder Apache SIS-biblioteket för att generera ISO19139_2007 metadata.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Testning | 
 |   **Nuvarande standard**   | falska lögner | 
 |   **Långsiktigt mål**   | falska lögner | 
 |   **Historia historia**   | Tillagd i 2.29.0 | 

###  **JsonldActive** 

Beskrivning
Genererar och tjänar JSON-LD (Länkade data) metadata.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Legacy | 

###  **genereraCroissantSchema** 

Beskrivning
Genererar "Croissant" metadataschema som standardschemat för maskininlärningsberedskap.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Testning | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Tillagd i 2.28.0 | 

###  **variablerMustHaveIoosCategory** 

Beskrivning
Verkställa att variabler måste ha en IOOS-kategori.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | som önskat | 
 |   **Historia historia**   | Legacy | 

###  **inkluderarNcCFSubsetVariables** 

Beskrivning
Legacy beteende var att generera subset variabler endast för EDDTableFromNcCFFiles dataset. Detta lades till för att standardisera beteendet för EDDTableFromNcCFFiles att vara förenligt med andra datasettyper. Om du behöver arvet automatiskt subsetVariables Du kan aktivera detta. Den bättre lösningen skulle vara att lägga till subsetVariables till dataset definition.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Testning | 
 |   **Nuvarande standard**   | falska lögner | 
 |   **Långsiktigt mål**   | falska lögner | 
 |   **Historia historia**   | Tillagd i 2,26 | 

##  **Abonnemang och meddelanden** 

###  **PrenumerationSystemActive** 

Beskrivning
Möjliggör e-postabonnemangssystemet för datasetuppdateringar.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Tillagd i 1.14 | 

###  **Prenumerera påRemoteErddapDataset** 

Beskrivning
Tillåter detta ERDDAP instans att prenumerera på fjärrkontroll ERDDAP dataset för uppdateringar.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Läggs till i 1.70 | 

###  **updateSubsRssOnFileChanges** 

Beskrivning
Triggers prenumeration och RSS uppdateringar när underliggande filer ändras. Det äldre beteendet var bara att göra uppdateringar om dataset reload (som vissa servrar hade lika sällan som varje vecka) .

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Tillagd i 2,26 | 

###  **möjliggöra MqttBroker** 

Beskrivning
Startar en intern MQTT-mäklare inom ansökan för att hantera meddelanden.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Testning | 
 |   **Nuvarande standard**   | falska lögner | 
 |   **Långsiktigt mål**   | som önskat | 
 |   **Historia historia**   | Tillagd i 2.29.0 | 

###  **PublicMqttNotif** 

Beskrivning
Gör det möjligt att publicera meddelanden (som datasetändringar) till MQTT mäklare.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Testning | 
 |   **Nuvarande standard**   | falska lögner | 
 |   **Långsiktigt mål**   | som önskat | 
 |   **Historia historia**   | Tillagd i 2.29.0 | 

##  **Web Headers/Configuration** 

###  **AnvändHeadersFor Url** 

Beskrivning
Tillåter att använda HTTP-rubriker för att bestämma begäran URL-information (användbar bakom proxies) .

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Standard ändrades till sant i 2.28.0, Added in 2.27.0 | 

###  **möjliggöra Cors** 

Beskrivning
Möjliggör Cross-Origin Resource Sharing (Kor) rubriker på HTTP svar.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | falska lögner | 
 |   **Långsiktigt mål**   | som önskat | 
 |   **Historia historia**   | Tillagd i 2,26 | 

##  **· Häftad sökning** 

###  **AnvändLuceneSearchEngine** 

Beskrivning
Switches den interna sökmotorn för att använda Apache Lucene.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Testning | 
 |   **Nuvarande standard**   | falska lögner | 
 |   **Långsiktigt mål**   | ?? | 
 |   **Historia historia**   | Legacy | 

##  **Tjänster och protokoll** 

###  **filerAktivera** 

Beskrivning
Möjliggör webbläsarvyn "Files" för dataset som stöder den.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Tillagd i 1,58 | 

###  **konverterareActive** 

Beskrivning
Möjliggör konverteringsverktyg i UI.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Tillagd i 1,44 | 

###  **Bilder från SorterActive** 

Beskrivning
Möjliggör Slide Sorter.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Tillagd i 1,44 | 

###  **DataProviderFormActive** 

Beskrivning
Möjliggör formuläret så att dataleverantörer kan mata in metadata.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Legacy | 

###  **outOfDateDatasetsAktiv** 

Beskrivning
Möjliggör rapportering av out-of-date dataset.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Tillagd i 1.82 | 

###  **WmsActive** 

Beskrivning
Möjliggör Web Map Service ( WMS ) gränssnitt.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Tillagd i 1,44 | 

###  **WmsClientActive** 

Beskrivning
Möjliggör intern WMS klientfunktioner.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Stabilt | 
 |   **Nuvarande standard**   | sanning sant | 
 |   **Långsiktigt mål**   | sanning sant | 
 |   **Historia historia**   | Legacy | 

###  **geoServicesRestActive** 

Beskrivning
Gör det möjligt för RESTful gränssnitt för Geospatial Services. Inte fullt genomförd.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Under byggandet | 
 |   **Nuvarande standard**   | falska lögner (Hardcoded)   | 
 |   **Långsiktigt mål**   | sanning sant | 

###  **wcsActive** 

Beskrivning
Möjliggör Web Coverage Service ( WCS ) gränssnitt. Inte fullt genomförd.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Under byggandet | 
 |   **Nuvarande standard**   | falska lögner (Hardcoded)   | 
 |   **Långsiktigt mål**   | sanning sant | 

###  **SosActive** 

Beskrivning
Möjliggör Sensor Observation Service ( SOS ) gränssnitt.

 | Fastighet | Detaljer | 
 | -------- | -------- | 
 |   **Livscykel**   | Under byggandet | 
 |   **Nuvarande standard**   | falska lögner (Hardcoded)   | 
 |   **Långsiktigt mål**   | sanning sant | 
