# Functievlaggen

Deze pagina documenteert de configuratievlaggen die beschikbaar zijn in het systeem. Deze vlaggen controleren verschillende functies, experimentele mogelijkheden, en legacy gedrag.

##  **Vlag Lifecycle Legend** 

*  **Stabiel:** Beoogd als lange termijn vlaggen om beheerders om functionaliteit te veranderen. Veilig voor productie.
*  **Test:** Kenmerken die klaar zijn voor testen. Deze zullen ofwel afstuderen naar "Stabiel" of uiteindelijk worden ingesteld op hun streefwaarde en laat de vlag verwijderd.
*  **In aanbouw:** Momenteel hardcoded tot vals in de code, ongeacht de configuratie. De functie is nog niet klaar voor gebruik.

##  **Wat? Optimalisaties bij het testen** 

Dit zijn waarschijnlijk vlaggen die in de toekomst verwijderd zullen worden.

###  **alleen aanrakenAlsitems** 

Omschrijving
Optimalisatievlag. Indien waar, de touch thread draait alleen als er items te verwerken zijn.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Testen | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 2.29.0 | 

###  **taskCacheClear** 

Omschrijving
Schakel de achtergrondtaak in die verlopen items uit de cache verwijdert.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 2.27.0 | 

###  **ncHeaderMakeFile** 

Omschrijving
Indien ingeschakeld zal de server het volledige nc bestand genereren voordat het ncheader resultaat wordt aangemaakt. Het nieuwe (voorkeur) gedrag wanneer onjuist is om direct het ncheader resultaat te genereren.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Testen | 
 |   **Huidige standaard**   | onwaar | 
 |   **Langetermijndoelstelling**   | onwaar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 2.29.0 | 

###  **gebruikEddReflection** 

Omschrijving
Inschakelt het gebruik van Java Reflectie om EDD te instantiseren ( ERDDAP Dataset) lessen.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Testen | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Standaard veranderd in true in 2.28.0, toegevoegd in 2.25 | 

###  **achtergrondSubsettabellen aanmaken** 

Omschrijving
Hiermee kunnen deelverzamelingen worden gemaakt in achtergrondthreads om datasets laadtijd te verbeteren.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Testen | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 2.29.0 | 

###  **useNcMetadataForFileTable** 

Omschrijving
Gebruik NetCDF Metadata om de bestandstabelweergave te vullen. In het bijzonder als een nc-bestand actual_range voor elke variabele bevat, kan het laden van de dataset het hele bestand overslaan.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 2.29.0 | 

##  **Systeem- en kerngedrag** 

###  **e-mail IsActive** 

Omschrijving
Bepaalt of het systeem probeert om echte e-mails te versturen (b.v. voor abonnementsupdates of foutmeldingen) via de ingestelde SMTP-server.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | onwaar | 
 |   **Langetermijndoelstelling**   | waar (Afhankelijk van admin configuratie)   | 
 |   **Voorgeschiedenis**   | Legacy | 

:::info Logic
Deze vlag wordt dynamisch berekend bij het opstarten. Het defaults to false, tenzij alle vereiste SMTP-gegevens (host, poort, gebruiker, wachtwoord, van-adres) zijn strikt voorzien in setup.xml.
::

###  **showLoadErrorsOnStatusPage** 

Omschrijving
Bepaalt of gedetailleerde datasetbelastingsfouten publiekelijk op de statuspagina worden weergegeven.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | ingesteld naar wens | 
 |   **Voorgeschiedenis**   | Toegevoegd in 2,25 | 

###  **standaardAccessibleViaFiles** 

Omschrijving
Stelt het standaardgedrag in voor de vraag of de onderliggende bestanden van een dataset kunnen worden benaderd in de bestandsservice.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | onwaar | 
 |   **Langetermijndoelstelling**   | onwaar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 2.10 | 

##  **Datasets** 

###  **quickRestart** 

Omschrijving
Indien ingeschakeld probeert het systeem sneller op te starten door bepaalde diepe validatiecontroles op datasets over te slaan tijdens initialisatie.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 1.38 | 

###  **EnvParsing inschakelen** 

Omschrijving
Schakel verwerking van de datasets.xml bestand met een [Tekenreeksondernemer](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Dit heeft vele toepassingen, waaronder het instellen van private waarden (zoals wachtwoorden) gebruik van omgevingsvariabelen.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | ingesteld naar wens | 
 |   **Voorgeschiedenis**   | Toegevoegd in 2.29.0 | 

###  **gebruikSaxParser** 

Omschrijving
Schakelt de interne XML-ontleedmotor om een SAX te gebruiken (Eenvoudige API voor XML) parser in plaats van de DOM parser. Dit maakt een aantal nieuwe geavanceerde functies zoals XInclude, en [aangepaste weergave-attributen](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) .

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Testen | 
 |   **Huidige standaard**   | onwaar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 2,25 | 

###  **listPrivateDatasets** 

Omschrijving
Bepaalt of particuliere datasets (degenen die authenticatie vereisen) verschijnen in de hoofddatasetlijst.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | onwaar | 
 |   **Langetermijndoelstelling**   | onwaar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 1.20 | 

###  **Politieke grenzenActief** 

Omschrijving
Controleert of politieke grenzen kunnen worden getrokken op kaarten.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 1.80 | 

##  **Metadata en standaarden** 

###  **fgdcActive** 

Omschrijving
Genereert en bedient FGDC (Federal Geographic Gegevenscomité) Metadata.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 1.38 | 

###  **iso19115 Actief** 

Omschrijving
Genereert en serveert ISO 19115 metadata.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 1.38 | 

###  **gebruikSisISO19115** 

Omschrijving
Gebruikt de Apache SIS bibliotheek om ISO 19115 metadata te genereren in plaats van de legacy generator. Als dit aan en gebruikSisISO19139 is niet aan, de standaard IOS 19115 metadata zal in ISO19115_3_2016 formaat. Als dit onjuist is, zal het standaardformaat in het verouderde gewijzigde ISO19115_2-formaat staan.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Testen | 
 |   **Huidige standaard**   | onwaar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 2,26 | 

###  **gebruikSisISO19139** 

Omschrijving
Gebruikt de Apache SIS-bibliotheek om ISO19139_2007 metadata te genereren.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Testen | 
 |   **Huidige standaard**   | onwaar | 
 |   **Langetermijndoelstelling**   | onwaar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 2.29.0 | 

###  **jsolldActive** 

Omschrijving
Genereert en bedient JSON-LD (Gekoppelde gegevens) Metadata.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Legacy | 

###  **genererenCroissantSchema** 

Omschrijving
Genereert "Croissant" metadata schema als de standaard schema voor machine learning bereidheid.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Testen | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 2.28.0 | 

###  **variabelenMustHaveIoosCategory** 

Omschrijving
Dwingt dat variabelen een IOOS categorie attribuut moeten hebben.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | ingesteld naar wens | 
 |   **Voorgeschiedenis**   | Legacy | 

###  **omvattenNcCFSubsetVariables** 

Omschrijving
Legacy gedrag was om subset variabelen te genereren alleen voor EDDTableFromNcCFFiles datasets. Dit werd toegevoegd aan standaard het gedrag voor EDDTableFromNcCFFiles om consistent te zijn met andere dataset types. Als u de legacy automatic nodig hebt subsetVariables U kunt dit inschakelen. De beste oplossing zou zijn om subsetVariables de definitie van de gegevensverzameling.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Testen | 
 |   **Huidige standaard**   | onwaar | 
 |   **Langetermijndoelstelling**   | onwaar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 2,26 | 

##  **Abonnementen en kennisgevingen** 

###  **abonnementSystemActive** 

Omschrijving
Schakel het e-mailabonnementssysteem in voor dataset-updates.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 1.14 | 

###  **abonnerenToRemoteErdapDataset** 

Omschrijving
Staat dit toe ERDDAP instantie om op afstand te abonneren ERDDAP datasets voor updates.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 1.70 | 

###  **updateSubsRssOnFileChanges** 

Omschrijving
Triggers abonnement en RSS updates wanneer onderliggende bestanden veranderen. Het oude gedrag was alleen om updates te doen over dataset herladen (die sommige servers hadden zo zelden als wekelijks) .

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 2,26 | 

###  **inschakelen MqttBroker** 

Omschrijving
Start een interne MQTT-makelaar binnen de toepassing om berichten te verwerken.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Testen | 
 |   **Huidige standaard**   | onwaar | 
 |   **Langetermijndoelstelling**   | ingesteld naar wens | 
 |   **Voorgeschiedenis**   | Toegevoegd in 2.29.0 | 

###  **publicerenMqttNotif** 

Omschrijving
Maakt het publiceren van kennisgevingen mogelijk (zoals datasetwijzigingen) aan de MQTT-makelaar.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Testen | 
 |   **Huidige standaard**   | onwaar | 
 |   **Langetermijndoelstelling**   | ingesteld naar wens | 
 |   **Voorgeschiedenis**   | Toegevoegd in 2.29.0 | 

##  **Webheaders/configuratie** 

###  **gebruik HeadersVoor Url** 

Omschrijving
Hiermee kunt u HTTP-headers gebruiken om de verzoek-URL-gegevens te bepalen (nuttig achter proxies) .

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Standaard veranderd in waar in 2.28.0, toegevoegd in 2.27.0 | 

###  **inschakelen Cors** 

Omschrijving
Schakel Cross-Origin Resource Sharing in (CORS) headers op HTTP antwoorden.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | onwaar | 
 |   **Langetermijndoelstelling**   | ingesteld naar wens | 
 |   **Voorgeschiedenis**   | Toegevoegd in 2,26 | 

##  **Zoeken** 

###  **gebruikLuceneSearchEngine** 

Omschrijving
Schakelt de interne zoekmachine om Apache Lucene te gebruiken.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Testen | 
 |   **Huidige standaard**   | onwaar | 
 |   **Langetermijndoelstelling**   | ? | 
 |   **Voorgeschiedenis**   | Legacy | 

##  **Diensten en protocollen** 

###  **bestandenActive** 

Omschrijving
Schakel de "Files" browserweergave in voor datasets die het ondersteunen.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 1.58 | 

###  **convertersActive** 

Omschrijving
Schakel conversiegereedschappen in de UI in.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 1.44 | 

###  **diaSorterActive** 

Omschrijving
Inschakelt de Slide Sorter.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 1.44 | 

###  **dataProviderFormActive** 

Omschrijving
Hiermee kunnen dataproviders metadata invoeren.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Legacy | 

###  **OutOfDateDatasetsActive** 

Omschrijving
Activeert de rapportage van verouderde datasets.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 1.82 | 

###  **wmsActive** 

Omschrijving
Activeert de Web Map Service ( WMS ) interface.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Toegevoegd in 1.44 | 

###  **wmsClientActive** 

Omschrijving
Schakel de interne WMS klantkenmerken.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | Stabiel | 
 |   **Huidige standaard**   | waar | 
 |   **Langetermijndoelstelling**   | waar | 
 |   **Voorgeschiedenis**   | Legacy | 

###  **geoDienstenRestActive** 

Omschrijving
Inschakelt de RESTful interface voor Geospatial Services. Niet volledig geïmplementeerd.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | In aanbouw | 
 |   **Huidige standaard**   | onwaar (Hardgecodeerd)   | 
 |   **Langetermijndoelstelling**   | waar | 

###  **wcsActive** 

Omschrijving
Schakel de Web Coverage Service in ( WCS ) interface. Niet volledig geïmplementeerd.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | In aanbouw | 
 |   **Huidige standaard**   | onwaar (Hardgecodeerd)   | 
 |   **Langetermijndoelstelling**   | waar | 

###  **sosActive** 

Omschrijving
Schakel de sensorobservatiedienst in ( SOS ) interface.

 | Eigenschap | Gegevens | 
 | :---- | :---- | 
 |   **Levenscyclus**   | In aanbouw | 
 |   **Huidige standaard**   | onwaar (Hardgecodeerd)   | 
 |   **Langetermijndoelstelling**   | waar | 
