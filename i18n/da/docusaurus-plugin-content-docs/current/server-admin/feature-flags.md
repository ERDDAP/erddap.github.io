# Feature Flag

Denne side dokumenterer konfigurationsflag tilgængelige i systemet. Disse flag styre forskellige funktioner, eksperimentelle evner, og arv adfærd.

##  **Name** 

*  **Stabil:** Påtænkt som langsigtede flag for at gøre det muligt for administratorer at ændre funktionalitet. Sikker til produktion.
*  **Test:** Funktioner, der er klar til test. Disse vil enten opgradere til "Stable" eller i sidste ende blive sat til deres målværdi og få flaget fjernet.
*  **Under opførelse:** I øjeblikket hardkodet til false i koden, uanset konfiguration. Funktionen er endnu ikke klar til brug.

##  **Name Optimering af test** 

Det er flag, der sandsynligvis vil blive fjernet i fremtiden.

###  **touchThreadOnlyWhenPets** 

Varebeskrivelse
Optimeringsflag. Hvis sandt, den touch tråd kun kører, når der er elementer til at behandle.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Test | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Tilføjet under 2.29.0 | 

###  **taskCacheClear** 

Varebeskrivelse
Aktiverer den baggrundsopgave der fjerner udløbne elementer fra cachen.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Tilføjet under 2.27.0 | 

###  **ncHeaderMakeFile** 

Varebeskrivelse
Hvis sandt serveren vil generere hele nc-fil, før du opretter ncheader resultat. Det nye (foretrækkes) adfærd, når falsk er at direkte generere ncheader resultat.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Test | 
 |   **Nuværende standard**   | falsk | 
 |   **Målsætning på lang sigt**   | falsk | 
 |   **Historie**   | Tilføjet under 2.29.0 | 

###  **use EddReflection** 

Varebeskrivelse
Aktiverer brugen af Java Refleksion til instantiate EDD ( ERDDAP Datasæt) Timer.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Test | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Standard ændret til true i 2.28.0, tilføjet i 2.25 | 

###  **backgroundCreateSubsetTables** 

Varebeskrivelse
Giver mulighed for at delsætte tabeller, der skal oprettes i baggrundstråde for at forbedre dataenes loading tid.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Test | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Tilføjet under 2.29.0 | 

###  **use NcMetadataForFileTable** 

Varebeskrivelse
Anvendelse NetCDF metadata til at befolke filtabelvisningen. Især hvis en nc-fil indeholder faktiske _ range for hver variabel, datasættet indlæsning kan springe læse hele filen.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Tilføjet under 2.29.0 | 

##  **Name** 

###  **email Isaktive** 

Varebeskrivelse
Kontrollerer om systemet forsøger at sende rigtige e-mails (f.eks. for abonnementsopdateringer eller fejlrapporter) via den konfigurerede SMTP server.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | falsk | 
 |   **Målsætning på lang sigt**   | true (Afhængig af admin config)   | 
 |   **Historie**   | Legacy | 

::: info Logic
Dette flag beregnes dynamisk ved opstart. Det er standard at falsk, medmindre alle nødvendige SMTP-oplysninger (vært, havn, bruger, adgangskode, fra- adresse) er strengt fastsat i setup.xml.
::

###  **showLoadErrorsOnStatusPage** 

Varebeskrivelse
Bestemmer om detaljerede datasætbelastningsfejl vises offentligt på statussiden.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | indstillet som ønsket | 
 |   **Historie**   | Tilføjet i 2.25 | 

###  **defaultAccessibleViaFiles** 

Varebeskrivelse
Sætter standardopførsel for om et datasets underliggende filer kan tilgås i filtjenesten.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | falsk | 
 |   **Målsætning på lang sigt**   | falsk | 
 |   **Historie**   | Tilføjet i 2.10 | 

##  **Datasæt** 

###  **quickGenstart** 

Varebeskrivelse
Hvis aktiveret, systemet forsøger at starte hurtigere ved at springe visse dybe validering kontrol af datasæt under initialisering.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Tilføjet i 1.38 | 

###  **enableEnvParsing** 

Varebeskrivelse
Aktiverer behandling af datasets.xml fil med en [StringSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Dette har mange anvendelser, herunder indstilling af private værdier (som adgangskoder) ved hjælp af miljøvariabler.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | indstillet som ønsket | 
 |   **Historie**   | Tilføjet under 2.29.0 | 

###  **use SaxParser** 

Varebeskrivelse
Skifter den interne XML parsing motor til at bruge en SAX (Simple API for XML) Parser i stedet for DOM parser. Dette muliggør nogle nye avancerede funktioner som XInclude, og [brugerdefinerede visningsegenskaber](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) .

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Test | 
 |   **Nuværende standard**   | falsk | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Tilføjet i 2.25 | 

###  **listPrivatDatasets** 

Varebeskrivelse
Bestemmer om private datasæt (dem, der kræver godkendelse) findes i hoveddatasætlisten.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | falsk | 
 |   **Målsætning på lang sigt**   | falsk | 
 |   **Historie**   | Tilføjet i 1.20 | 

###  **politiskBundariesActive** 

Varebeskrivelse
Kontrollerer om politiske grænser kan tegnes på kort.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Tilføjet i 1.80 | 

###  **kraftSynkronousLoading** 

Varebeskrivelse
Indlæs datasæt synkront i stedet for udskudt baggrundsindlæsning.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | falsk | 
 |   **Målsætning på lang sigt**   | falsk | 
 |   **Historie**   | Tilføjet i 2.30 | 

##  **Metadata og standarder** 

###  **fgdcActive** 

Varebeskrivelse
Genererer og serverer FGDC (Federal Geographic Dataudvalget) metadata.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Tilføjet i 1.38 | 

###  **iso19115 Aktiv** 

Varebeskrivelse
Genererer og serverer ISO 19115 metadata.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Tilføjet i 1.38 | 

###  **use Sisisiso19115** 

Varebeskrivelse
Bruger Apache SIS-biblioteket til at generere ISO 19115 metadata i stedet for den ældre generator. Hvis dette er på og bruger Sisisiso19139 er ikke på, standard IOS 19115 metadata vil være i ISO19115 _ 3 _ 2016 format. Hvis dette er falsk, vil standardformatet være i det ændrede ISO19115 _ 2-format.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Test | 
 |   **Nuværende standard**   | falsk | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Tilføjet i 2.26 | 

###  **usSisiso19139** 

Varebeskrivelse
Bruger Apache SIS-biblioteket til at generere ISO19139 _ 2007 metadata.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Test | 
 |   **Nuværende standard**   | falsk | 
 |   **Målsætning på lang sigt**   | falsk | 
 |   **Historie**   | Tilføjet under 2.29.0 | 

###  **jsonldActive** 

Varebeskrivelse
Genererer og serverer JSON- LD (Sammenkædede data) metadata.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Legacy | 

###  **generateCroissantSchema** 

Varebeskrivelse
Genererer "Croissant" metadata skema som standard skema for machine learning parathed.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Test | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Tilføjet i 2.28.0 | 

###  **variablesMust HaveIoosCategory** 

Varebeskrivelse
Kræver, at variabler skal have en IOOS kategori attribut.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | indstillet som ønsket | 
 |   **Historie**   | Legacy | 

###  **includeNcCFSubsetVariabler** 

Varebeskrivelse
Legacy adfærd var at generere delsæt variabler kun for EDDTableFromNcCFFiles datasæt. Dette blev tilføjet til standard opførsel for EDDTableFromNcCFFiles at være i overensstemmelse med andre datasæt typer. Hvis du har brug for arven automatisk subsetVariables du kan aktivere dette. Den bedste løsning ville være at tilføje subsetVariables til datasætdefinitionen.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Test | 
 |   **Nuværende standard**   | falsk | 
 |   **Målsætning på lang sigt**   | falsk | 
 |   **Historie**   | Tilføjet i 2.26 | 

##  **Abonnementer og anmeldelser** 

###  **abonnentSystemAktiv** 

Varebeskrivelse
Aktiverer e- mail- abonnementssystemet for datasæt opdateringer.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Tilføjet i 1.14 | 

###  **subscribeToRemoteErddapDataset** 

Varebeskrivelse
Tillader dette ERDDAP instans at abonnere på fjernbetjening ERDDAP Datasæt til opdateringer.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Tilføjet i 1.70 | 

###  **updateSubsRssOnFileChanges** 

Varebeskrivelse
Triggers abonnement og RSS opdateringer, når underliggende filer ændres. Den arv adfærd var kun at gøre opdateringer på datasæt genindlæsning (som nogle servere havde så sjældent som ugentlig) .

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Tilføjet i 2.26 | 

###  **Aktivér MqttBroker** 

Varebeskrivelse
Starter en intern MQTT mægler i programmet til at håndtere beskeder.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Test | 
 |   **Nuværende standard**   | falsk | 
 |   **Målsætning på lang sigt**   | indstillet som ønsket | 
 |   **Historie**   | Tilføjet under 2.29.0 | 

###  **Name** 

Varebeskrivelse
Aktiverer offentliggørelse af meddelelser (som datasætændringer) til MQTT mægler.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Test | 
 |   **Nuværende standard**   | falsk | 
 |   **Målsætning på lang sigt**   | indstillet som ønsket | 
 |   **Historie**   | Tilføjet under 2.29.0 | 

##  **Name** 

###  **use HeadersFor Url** 

Varebeskrivelse
Tillader at bruge HTTP-overskrifter til at bestemme forespørgslens URL-detaljer (nyttige bag proxies) .

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Standard ændret til true i 2.28.0, tilføjet i 2.27.0 | 

###  **Aktivér Kors** 

Varebeskrivelse
Aktiverer deling af ressourcer på tværs af oprindelse (KORS) overskrifter på HTTP-svar.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | falsk | 
 |   **Målsætning på lang sigt**   | indstillet som ønsket | 
 |   **Historie**   | Tilføjet i 2.26 | 

##  **Name** 

###  **use LucenSearchEngine** 

Varebeskrivelse
Skifter den interne søgemaskine til at bruge Apache Lucene.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Test | 
 |   **Nuværende standard**   | falsk | 
 |   **Målsætning på lang sigt**   | ? | 
 |   **Historie**   | Legacy | 

##  **Denne bevilling er bestemt til at dække følgende udgifter:** 

###  **filesActive** 

Varebeskrivelse
Aktiverer "Files" browservisningen for datasæt der understøtter den.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Tilføjet i 1.58 | 

###  **convertersActive** 

Varebeskrivelse
Aktiverer konverteringsværktøjer i UI.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Tilføjet i 1.44 | 

###  **slideSorterActive** 

Varebeskrivelse
Aktiverer slidesorteren.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Tilføjet i 1.44 | 

###  **dataProviderFormActive** 

Varebeskrivelse
Gør det muligt for dataudbyderne at indtaste metadata.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Legacy | 

###  **outOfDateDatasettsActive** 

Varebeskrivelse
Aktiverer indberetning af dataserier uden for datoen.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Tilføjet i 1.82 | 

###  **wmsActive** 

Varebeskrivelse
Aktiverer webkorttjenesten ( WMS ) interface.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Tilføjet i 1.44 | 

###  **wmsClientActive** 

Varebeskrivelse
Aktiverer den interne WMS klientfunktioner.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | Stabil | 
 |   **Nuværende standard**   | true | 
 |   **Målsætning på lang sigt**   | true | 
 |   **Historie**   | Legacy | 

###  **geoServicesRestactive** 

Varebeskrivelse
Aktiverer RESTful interface til geospatiale tjenester. Ikke fuldt implementeret.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | under opførelse | 
 |   **Nuværende standard**   | falsk (Hardkodet)   | 
 |   **Målsætning på lang sigt**   | true | 

###  **wcsActive** 

Varebeskrivelse
Aktiverer webdækningstjenesten ( WCS ) interface. Ikke fuldt implementeret.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | under opførelse | 
 |   **Nuværende standard**   | falsk (Hardkodet)   | 
 |   **Målsætning på lang sigt**   | true | 

###  **sosActive** 

Varebeskrivelse
Aktiverer Sensor Observation Service ( SOS ) interface.

 | Ejendom | Detaljer | 
 | : -- -- | : -- -- | 
 |   **Livscyklus**   | under opførelse | 
 |   **Nuværende standard**   | falsk (Hardkodet)   | 
 |   **Målsætning på lang sigt**   | true | 
