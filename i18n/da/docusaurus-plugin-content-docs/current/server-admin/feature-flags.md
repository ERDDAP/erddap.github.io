# Feature Flags

Denne side dokumenterer konfigurationsflagene til rådighed i systemet. Disse flag styrer forskellige funktioner, eksperimentelle kapaciteter og arv adfærd.

##  **Flag Lifecycle Legend** 

*  **Stabil:** Forudbestilt så langsigtede flag for at tillade administratorer at ændre funktionalitet. Sikker til produktion.
*  **Test:** Funktioner, der er klar til test. Disse vil enten blive uddannet til "Stable" eller i sidste ende blive sat til deres målværdi og har flaget fjernet.
*  **Under konstruktion:** I øjeblikket hårdtkodet til falsk i koden, uanset konfiguration. Funktionerne er endnu ikke klar til brug.

##  **🚀 Optimering af test** 

Det er flag, der sandsynligvis vil blive fjernet i fremtiden.

###  **touchThread OnlyNårItems** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Optimeringsflag. Hvis det er tilfældet, kører berøringstråden kun, når der er elementer til at behandle.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Test af test | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Tilføjet i 2.29.0 | 

###  **opgaveCacheClear** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Aktiverer baggrundsopgaven, der fjerner udløbne elementer fra cachen.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Tilføjet i 2.27.0 | 

###  **I nærheden af ncHeaderMakeFile** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Hvis sand serveren vil generere hele nc-filen, før du opretter ncheader-resultatet. Den nye (foretrukket foretrukne) adfærd, når falsk er at direkte generere ncheader-resultatet.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Test af test | 
 |   **Nuværende Standard**   | falsk | 
 |   **Langsigtet Goal**   | falsk | 
 |   **Historiehistorie**   | Tilføjet i 2.29.0 | 

###  **BrugEddReflection** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Aktiver brugen af Java Refleksion til øjeblikkelige EDD ( ERDDAP Datasæt) klasser.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Test af test | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Standard ændret til ægte i 2.28.0, tilføjet i 2.25 | 

###  **baggrundOpretSubsetTables** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Tillader, at undermapper skal oprettes i baggrundstråde for at forbedre datasæt indlæsningstiden.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Test af test | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Tilføjet i 2.29.0 | 

###  **BrugNcMetadataForFileTable** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Bruger NetCDF metadata til at simulere filtabelvisningen. Især hvis en nc-fil indeholder faktiske_range for hver variabel, kan datasættet indlæsning springe hele filen.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Tilføjet i 2.29.0 | 

##  **🛠 System & Core Behavior** 

###  **e-mail IsActive** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Kontrol af, om systemet forsøger at sende faktiske e-mails (f.eks. til abonnementsopdateringer eller fejlrapporter) via den konfigurerede SMTP-server.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | falsk | 
 |   **Langsigtet Goal**   | sande sande sande sande (Afhængigt af administrator config)   | 
 |   **Historiehistorie**   | Legacy | 

Anmeldelse afinfo Logic
Dette flag beregnes dynamisk ved opstart. Det svarer til falsk, medmindre alle nødvendige SMTP-legitimationsoplysninger (vært, port, bruger, adgangskode, fra-adresse) leveres strengt i opsætning.xml.
Sidste gang:

###  **VisLoad FejlerOnStatusPage** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Hvis detaljerede datasæt belastningsfejl vises offentligt på statussiden.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sæt som ønsket | 
 |   **Historiehistorie**   | Tilføjet i 2.25 | 

###  **StandardAccessibleViaFiles** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Angiver standardadfærden for, om et datasæts underliggende filer kan tilgås i filtjenesten.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | falsk | 
 |   **Langsigtet Goal**   | falsk | 
 |   **Historiehistorie**   | Tilføjet i 2.10 | 

##  **Datasæt** 

###  **hurtigstart** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Hvis det er aktiveret, forsøger systemet at starte hurtigere ved at springe visse dybe valideringstjek på datasæt under initialisering.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Tilføjet i 1.38 | 

###  **aktivereEnvParsing** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Aktivering af behandlingen datasets.xml fil med en [StrygSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Dette har mange anvendelser, herunder indstilling af private værdier (som adgangskoder) Brug af miljøvariabler.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sæt som ønsket | 
 |   **Historiehistorie**   | Tilføjet i 2.29.0 | 

###  **Brug afSaxParser** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Switcher den interne XML parsing motor til at bruge en SAX (Enkel API til XML) parser i stedet for DOM parser. Dette gør det muligt for nogle nye avancerede funktioner som XInclude og [brugerdefinerede skærm attributter](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) .

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Test af test | 
 |   **Nuværende Standard**   | falsk | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Tilføjet i 2.25 | 

###  **listePrivateDatasets** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Bestems, hvis private datasæt (dem, der kræver godkendelse) vises på listen over hoveddatasæt.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | falsk | 
 |   **Langsigtet Goal**   | falsk | 
 |   **Historiehistorie**   | Tilføjet i 1.20 | 

###  **Politiske ordsprog** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Kontrol af, om politiske grænser kan trækkes på kort.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Tilføjet i 1.80 | 

##  **Metadata og standarder** 

###  **FgdcActive** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Generer og tjener FGDC (Forbunds Geografisk Dataudvalg) metadata.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Tilføjet i 1.38 | 

###  **iso19115 Active Active Active** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Generer og tjener ISO 19115 metadata.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Tilføjet i 1.38 | 

###  **BrugSisISO19115** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Brug Apache SIS-biblioteket til at generere ISO 19115 metadata i stedet for den ældre generator. Hvis dette er på og brugSisISO19139 ikke er på, vil standard IOS 19115 metadata være i ISO19115_3_2016 format. Hvis dette er falsk, vil standardformatet være i den arv modificeret ISO19115_2 format.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Test af test | 
 |   **Nuværende Standard**   | falsk | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Tilføjet i 2.26 | 

###  **BrugSisISO19139** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Brug Apache SIS biblioteket til at generere ISO19139_2007 metadata.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Test af test | 
 |   **Nuværende Standard**   | falsk | 
 |   **Langsigtet Goal**   | falsk | 
 |   **Historiehistorie**   | Tilføjet i 2.29.0 | 

###  **jsonActiveld** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Generer og tjener JSON-LD (Disse data) metadata.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Legacy | 

###  **generereCroissantSchema** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Generer "Croissant" metadata schema som standard schema for maskinlæringsparathed.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Test af test | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Tilføjet i 2.28.0 | 

###  **variablerMustHavIoosKategori** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Forstærker, at variabler skal have en IOOS kategori attribut.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sæt som ønsket | 
 |   **Historiehistorie**   | Legacy | 

###  **inkludereNcCFSubsetVariables** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Legacy adfærd var at generere subset variabler kun til EDDTableFraNcCFFiles datasets. Dette blev tilføjet til standard adfærd for EDDTableFraNcCFFiles at være i overensstemmelse med andre datasæt typer. Hvis du har brug for arv automatisk subsetVariables Du kan aktivere dette. Den bedre løsning ville være at tilføje subsetVariables til definition af datasæt.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Test af test | 
 |   **Nuværende Standard**   | falsk | 
 |   **Langsigtet Goal**   | falsk | 
 |   **Historiehistorie**   | Tilføjet i 2.26 | 

##  **Abonnementer og meddelelser** 

###  **Abonnement** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Aktiverer e-mail-abonnementssystemet for opdateringer af datasæt.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Tilføjet i 1.14 | 

###  **Tilmeld dig vores nyhedsbrev** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Tillader dette ERDDAP f.eks. at abonnere på fjern ERDDAP Datasæt til opdateringer.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Tilføjet i 1.70 | 

###  **OpdaterSubsRsOnFileChanges** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Udløser abonnement og RSS opdateringer, når underliggende filer ændres. Den ældre adfærd var kun at foretage opdateringer på dataset reload (som nogle servere havde lige så uvist som ugentligt) .

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Tilføjet i 2.26 | 

###  **Aktivering MqttBroker** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Starter en intern MQTT mægler inden for ansøgningen for at håndtere meddelelser.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Test af test | 
 |   **Nuværende Standard**   | falsk | 
 |   **Langsigtet Goal**   | sæt som ønsket | 
 |   **Historiehistorie**   | Tilføjet i 2.29.0 | 

###  **Udgivelse afMqtttNotif** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Aktiver udgivelse af meddelelser (som datasæt ændringer) til MQTT mægler.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Test af test | 
 |   **Nuværende Standard**   | falsk | 
 |   **Langsigtet Goal**   | sæt som ønsket | 
 |   **Historiehistorie**   | Tilføjet i 2.29.0 | 

##  **Websider/konfigurering** 

###  **Brug afHeadersFor Url** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Tillader at bruge HTTP-headere til at bestemme anmodnings-URL-oplysningerne (nyttige bag proxies) .

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Standard ændret til ægte i 2.28.0, Tilføjet i 2.27.0 | 

###  **Aktivering Cors** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Aktivering af Cross-Origin Resource (CORS) Overskrifter på HTTP-reaktioner.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | falsk | 
 |   **Langsigtet Goal**   | sæt som ønsket | 
 |   **Historiehistorie**   | Tilføjet i 2.26 | 

##  **🔍 Søg** 

###  **Brug afLuceneSearchEngine** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Skifter den interne søgemaskine til at bruge Apache Lucene.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Test af test | 
 |   **Nuværende Standard**   | falsk | 
 |   **Langsigtet Goal**   | ? | 
 |   **Historiehistorie**   | Legacy | 

##  **Tjenesteydelser og -protokoller** 

###  **filerActive** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Aktiverer "Files" browservisning for datasæt, der understøtter det.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Tilføjet i 1.58 | 

###  **OmformereActive** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Aktiverer konverteringsværktøjer i brugergrænsefladen.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Tilføjet i 1.44 | 

###  **Klik her for at købe** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Aktiverer Slide Sorter.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Tilføjet i 1.44 | 

###  **DataProviderFormActive** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Aktiverer formularen, så dataudbydere kan indtaste metadata.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Legacy | 

###  **afDateDatasetsActive** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Aktivering af forældede datasæt.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Tilføjet i 1.82 | 

###  **wmsActive** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Aktiver Web Map Service ( WMS ) interface.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Tilføjet i 1.44 | 

###  **wmsClientActive** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Aktiverer det interne WMS klientfunktioner.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Stable | 
 |   **Nuværende Standard**   | sande sande sande sande | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
 |   **Historiehistorie**   | Legacy | 

###  **geoservicesRestActive** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Aktivering af RESTful interface til Geospatial Services. Ikke fuldt implementeret.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Under konstruktion | 
 |   **Nuværende Standard**   | falsk (Hårdt kode)   | 
 |   **Langsigtet Goal**   | sande sande sande sande | 

###  **wcsActive** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Aktiver Web Coverage Service ( WCS ) interface. Ikke fuldt implementeret.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Under konstruktion | 
 |   **Nuværende Standard**   | falsk (Hårdt kode)   | 
 |   **Langsigtet Goal**   | sande sande sande sande | 

###  **SåsActive** 

Beskrivelse Beskrivelse Beskrivelse Beskrivelse
Aktivering af Sensorobservation Service ( SOS ) interface.

 | Ejendom | Detaljer Detaljer | 
 | :--- | :--- | 
 |   **Livscyklus**   | Under konstruktion | 
 |   **Nuværende Standard**   | falsk (Hårdt kode)   | 
 |   **Langsigtet Goal**   | sande sande sande sande | 
