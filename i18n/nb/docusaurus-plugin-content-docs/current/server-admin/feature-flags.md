# Funksjonsflagg

Denne siden dokumenterer konfigurasjonsflaggene som er tilgjengelige i systemet. Disse flaggene kontrollerer ulike funksjoner, eksperimentelle evner og arvlige oppførsel.

##  **Flag Lifecycle Legend** 

*  **Stabil:** Tiltenkt som langsiktige flagg for å tillate administratorer å endre funksjonalitet. Sikker for produksjon.
*  **Testing:** Funksjoner som er klare til å teste. Disse vil enten utdanne til "Stable" eller til slutt bli satt til deres målverdi og få flagget fjernet.
*  **Under konstruksjon:** For tiden hardcoded til falsk i koden, uansett konfigurasjon. Funksjonen er ennå ikke klar til bruk.

##  **🚀 Optimasjon i testing** 

Dette er flagg som sannsynligvis vil bli fjernet i fremtiden.

###  **touchTreadOnlyWhenItems** 

Beskrivelse
Optimasjonsflagg. Hvis det er sant, kjører berøringstråden bare når det er elementer å behandle.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Testing | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 2.29.0 | 

###  **taskCacheClear** 

Beskrivelse
Aktiverer bakgrunnsoppgaven som fjerner utløpte elementer fra bufferen.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 2.27.0 | 

###  **ncHeaderMakeFile** 

Beskrivelse
Hvis det er sant vil serveren generere hele nc-filen før du oppretter ncheader-resultatet. Den nye (Foretrukket) atferd når falsk er å direkte generere ncheader-resultatet.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Testing | 
 |   **Gjeldende standard**   | falsk | 
 |   **Langsiktige mål**   | falsk | 
 |   **Historie**   | Lagt til i 2.29.0 | 

###  **brukEddReflection** 

Beskrivelse
Aktiverer bruk av Java Refleksjon til å instantere EDD ( ERDDAP Datasett) klasser.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Testing | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Standard endret til sant i 2.28.0, lagt til i 2.25 | 

###  **BakgrunnOpprettSubsetTables** 

Beskrivelse
Tillater undergruppetabeller å opprettes i bakgrunnstråder for å forbedre datasettets lastingstid.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Testing | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 2.29.0 | 

###  **brukNcMetadataForFileTable** 

Beskrivelse
Bruker NetCDF metadata for å populere filtabellvisningen. Spesielt hvis en nc-fil inneholder actual_range for hver variabel, kan datasettlastingen hoppe over å lese hele filen.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 2.29.0 | 

##  **🛠 System og kjerneadferd** 

###  **e-post IsActive** 

Beskrivelse
Kontrollerer om systemet prøver å sende faktiske e-poster (For eksempel for abonnementsoppdateringer eller feilrapporter) via den konfigurerte SMTP- serveren.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | falsk | 
 |   **Langsiktige mål**   | sant (Avhengig av administratorinnstilling)   | 
 |   **Historie**   | Legacy | 

::info Logic
Dette flagget beregnes dynamisk ved oppstart. Det er standard til falsk med mindre alle nødvendige SMTP- legitimasjoner (host, port, bruker, passord, fra-adresse) er strengt anordnet i setup.xml.
::

###  **showLoadErrorsOnStatusPage** 

Beskrivelse
Bestemer om detaljerte datasettslastfeil vises offentlig på statussiden.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | Sett som ønsket | 
 |   **Historie**   | Lagt til i 2.25 | 

###  **standardAccessibleViaFiles** 

Beskrivelse
Angi standard atferd for om et datasetts underliggende filer kan nås i filtjenesten.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | falsk | 
 |   **Langsiktige mål**   | falsk | 
 |   **Historie**   | Lagt til i 2.10 | 

##  **🗃️ Datasett** 

###  **Rask omstart** 

Beskrivelse
Hvis aktivert, forsøker systemet å starte opp raskere ved å hoppe over visse dype valideringskontroller på datasett under initialisering.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 1.38 | 

###  **EnvParsing** 

Beskrivelse
Aktiverer behandling av datasets.xml fil med a [StringSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) .. Dette har mange bruksområder inkludert å sette private verdier (som passord) bruk av miljøvariabler.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | Sett som ønsket | 
 |   **Historie**   | Lagt til i 2.29.0 | 

###  **brukSaxParser** 

Beskrivelse
Bytter den interne XML-tolkingmotoren til å bruke en SAX (Enkelt API for XML) Tolker i stedet for DOM-tolkeren. Dette muliggjør noen nye avanserte funksjoner som XInclude, og [egendefinerte skjermattributter](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) ..

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Testing | 
 |   **Gjeldende standard**   | falsk | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 2.25 | 

###  **listePrivateDatasett** 

Beskrivelse
Avgjør om private datasett (De som krever autentisering) vises i hovedlisten.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | falsk | 
 |   **Langsiktige mål**   | falsk | 
 |   **Historie**   | Lagt til i 1.20 | 

###  **politisk** 

Beskrivelse
Kontrollerer om politiske grenser kan tegnes på kart.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 1.80 | 

###  **ForceSynkronousLoading** 

Beskrivelse
Last datasett synkron i stedet for utsett bakgrunnslasting.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | falsk | 
 |   **Langsiktige mål**   | falsk | 
 |   **Historie**   | Lagt til i 2.30 | 

##  **Metadata og standarder** 

###  **fgdcActive** 

Beskrivelse
Oppretter og tjener FGDC (Federal Geographic Datakomiteen) Metadata.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 1.38 | 

###  **iso19115 Aktiv** 

Beskrivelse
Oppretter og betjener ISO 19115 metadata.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 1.38 | 

###  **brukSisISO19115** 

Beskrivelse
Bruker Apache SIS-biblioteket til å generere ISO 19115 metadata i stedet for arvegeneratoren. Hvis dette er på og brukSisISO19139 er ikke på, vil standard IOS 19115 metadata være i ISO19115_3_2016 format. Hvis dette er falsk, vil standardformatet være i det tidligere endret ISO19115_2-formatet.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Testing | 
 |   **Gjeldende standard**   | falsk | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 2.26 | 

###  **brukSisISO19139** 

Beskrivelse
Bruker Apache SIS-biblioteket til å generere ISO19139_2007 metadata.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Testing | 
 |   **Gjeldende standard**   | falsk | 
 |   **Langsiktige mål**   | falsk | 
 |   **Historie**   | Lagt til i 2.29.0 | 

###  **JsonldActive** 

Beskrivelse
Genererer og tjener JSON-LD (Linked Data) Metadata.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Legacy | 

###  **genererCroissantSchema** 

Beskrivelse
Genererer "Croissant" metadata skjema som standard skjema for maskinlæring beredskap.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Testing | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 2.28.0 | 

###  **VariablerMustHaveIoos** 

Beskrivelse
Forsterker at variabler må ha en IOOS-kategoriattributt.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | Sett som ønsket | 
 |   **Historie**   | Legacy | 

###  **inkludertNcCFSubsetVariables** 

Beskrivelse
Legacy-adferd var å generere undergruppevariabler bare for EDDTableFromNcCFFiles-datasett. Dette ble lagt til standard atferden for EDDTableFromNcCFFiles å være i samsvar med andre datasett typer. Hvis du trenger arven automatisk subsetVariables Du kan aktivere dette. Den bedre løsningen vil være å legge til subsetVariables til definisjonen av datasett.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Testing | 
 |   **Gjeldende standard**   | falsk | 
 |   **Langsiktige mål**   | falsk | 
 |   **Historie**   | Lagt til i 2.26 | 

##  **🔔 Abonnementer og varsler** 

###  **abonnement SystemActive** 

Beskrivelse
Aktiverer e-postabonnementsystemet for datasettoppdateringer.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 1.14 | 

###  **abonnentToRemoteErddapDataset** 

Beskrivelse
Tillater dette ERDDAP å abonnere på fjernkontrollen ERDDAP datasett for oppdateringer.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 1.70 | 

###  **updateSubsRssOnFileChanges** 

Beskrivelse
Triggers abonnement og RSS Oppdaterer når underliggende filer endres. Den gamle oppførselen var bare å gjøre oppdateringer på datasett reload (som noen servere hadde så sjelden som ukentlig) ..

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 2.26 | 

###  **Aktiver MqttBroker** 

Beskrivelse
Starter en intern MQTT megler i programmet for å håndtere meldinger.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Testing | 
 |   **Gjeldende standard**   | falsk | 
 |   **Langsiktige mål**   | Sett som ønsket | 
 |   **Historie**   | Lagt til i 2.29.0 | 

###  **publisereMqttNotif** 

Beskrivelse
Aktiverer publisering av meldinger (som endringer i datasett) til MQTT megleren.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Testing | 
 |   **Gjeldende standard**   | falsk | 
 |   **Langsiktige mål**   | Sett som ønsket | 
 |   **Historie**   | Lagt til i 2.29.0 | 

##  **🌐 Webtopptekster/konfigurasjon** 

###  **brukHeadersFor Url** 

Beskrivelse
Tillater bruk av HTTP-hoder å bestemme forespørselens URL-detaljer (nyttig bak proxies) ..

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Standard endret til sant i 2.28.0, lagt til i 2.27.0 | 

###  **Aktiver Cors** 

Beskrivelse
Aktiverer deling av ressurser i kryssorigo (CORS) overskrifter på HTTP-svar.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | falsk | 
 |   **Langsiktige mål**   | Sett som ønsket | 
 |   **Historie**   | Lagt til i 2.26 | 

##  **🔍 Søk** 

###  **brukLuceneSearchEngine** 

Beskrivelse
Bytter den interne søkemotoren til å bruke Apache Lucene.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Testing | 
 |   **Gjeldende standard**   | falsk | 
 |   **Langsiktige mål**   | ? | 
 |   **Historie**   | Legacy | 

##  **📡 Tjenester og protokoller** 

###  **filesActive** 

Beskrivelse
Aktiverer browser Filer" nettleservisning for datasett som støtter det.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 1.58 | 

###  **konvertereActive** 

Beskrivelse
Aktiverer konverteringsverktøy i UI.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 1.44 | 

###  **slideSorterActive** 

Beskrivelse
Aktiverer lysbildesorteringen.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 1.44 | 

###  **dataProviderFormActive** 

Beskrivelse
Aktiverer skjemaet som gjør det mulig å skrive inn metadata.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Legacy | 

###  **outOfDateDatasett** 

Beskrivelse
Aktiverer rapportering av utdaterte datasett.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 1.82 | 

###  **wmsActive** 

Beskrivelse
Aktiverer webkarttjenesten ( WMS ) grensesnitt.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 1.44 | 

###  **wmsClientActive** 

Beskrivelse
Aktiverer den interne WMS kundefunksjoner.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stabil | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Legacy | 

###  **GeoServicesRestActive** 

Beskrivelse
Aktiverer RESTful grensesnitt for Geospatial Services. Ikke fullt implementert.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Under konstruksjon | 
 |   **Gjeldende standard**   | falsk (Hardkodet)   | 
 |   **Langsiktige mål**   | sant | 

###  **wcsActive** 

Beskrivelse
Aktiverer webdekningstjenesten ( WCS ) grensesnitt. Ikke fullt implementert.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Under konstruksjon | 
 |   **Gjeldende standard**   | falsk (Hardkodet)   | 
 |   **Langsiktige mål**   | sant | 

###  **sosActive** 

Beskrivelse
Aktiverer sensorobservasjonstjenesten ( SOS ) grensesnitt.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Under konstruksjon | 
 |   **Gjeldende standard**   | falsk (Hardkodet)   | 
 |   **Langsiktige mål**   | sant | 
