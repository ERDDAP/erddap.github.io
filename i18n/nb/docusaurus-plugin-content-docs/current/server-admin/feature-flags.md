# Funksjonsflagg

Denne siden dokumenterer konfigurasjonsflaggene som er tilgjengelige i systemet. Disse flaggene kontrollerer ulike funksjoner, eksperimentelle evner og arvlige oppførsel.

##  **Flag Lifecycle Legend** 

*  **Stabilt:** Tiltenkt som langsiktige flagg for å tillate administratorer å endre funksjonalitet. Sikker for produksjon.
*  **Testing:** Funksjoner som er klare til testing. Disse vil enten utdanne til "Stable" eller til slutt bli satt til deres målverdi og få flagget fjernet.
*  **Under konstruksjon:** For tiden hardcoded til falsk i koden, uansett konfigurasjon. Funksjonen er ennå ikke klar til bruk.

##  **🚀 Optimasjon i testing** 

Dette er flagg som sannsynligvis vil bli fjernet i fremtiden.

###  **TouchTreadOnlyWhen items** 

Beskrivelse
Optimasjonsflagg. Hvis det er sant, kjører berøringstråden bare når det er elementer å behandle.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Testing | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 2.29.0 | 

###  **oppgaveCacheClear** 

Beskrivelse
Aktiverer bakgrunnsoppgaven som fjerner utløpte elementer fra bufferen.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 2.27.0 | 

###  **ncHeaderMakeFile** 

Beskrivelse
Hvis sant serveren vil generere hele nc-filen før du oppretter ncheader-resultatet. Den nye (Foretrukket) atferd når falsk er å direkte generere ncheader resultat.

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
Tillater undergruppetabeller å bli opprettet i bakgrunnstråder for å forbedre datasettets lastetid.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Testing | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 2.29.0 | 

###  **brukNcMetadataForFileTable** 

Beskrivelse
Bruker NetCDF metadata for å populere filtabellvisningen. Spesielt hvis en nc-fil inneholder faktisk_område for hver variabel, kan datasettet lastes over å lese hele filen.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 2.29.0 | 

##  **🛠 System og kjerneadferd** 

###  **e-post IsActive** 

Beskrivelse
Kontrollerer om systemet prøver å sende faktiske e-poster (For eksempel for abonnementsoppdateringer eller feilrapporter) via den konfigurerte SMTP- serveren.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | falsk | 
 |   **Langsiktige mål**   | sant (Avhengig av administratorinnstilling)   | 
 |   **Historie**   | Legacy | 

::info Logic
Dette flagget beregnes dynamisk ved oppstart. Det standarder til falsk med mindre alle nødvendige SMTP- legitimasjoner (host, port, bruker, passord, fra-adresse) er strengt levert i setup.xml.
::

###  **showLoadErrorsOnStatusPage** 

Beskrivelse
Avgjør om detaljerte datasettlastfeil vises offentlig på statussiden.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | Sett som ønsket | 
 |   **Historie**   | Lagt til i 2.25 | 

###  **standardAccessibleViaFiles** 

Beskrivelse
Angi standard atferd for om et datasetts underliggende filer kan nås i filtjenesten.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | falsk | 
 |   **Langsiktige mål**   | falsk | 
 |   **Historie**   | Lagt til i 2.10 | 

##  **🗃️ Datasett** 

###  **Rask omstart** 

Beskrivelse
Hvis aktivert, forsøker systemet å starte opp raskere ved å hoppe over visse dype valideringskontroller på datasett under oppstart.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 1.38 | 

###  **EnvParsing** 

Beskrivelse
Tillater behandling av datasets.xml fil med en [StringSubstitor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) .. Dette har mange bruksområder inkludert å sette private verdier (som passord) bruk av miljøvariabler.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | Sett som ønsket | 
 |   **Historie**   | Lagt til i 2.29.0 | 

###  **brukSaxParser** 

Beskrivelse
Bytter den interne XML-tolkermotoren til å bruke en SAX (Enkelt API for XML) I stedet for DOM-tolkeren. Dette muliggjør nye avanserte funksjoner som XInclude, og [egendefinerte skjermattributter](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) ..

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Testing | 
 |   **Gjeldende standard**   | falsk | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 2.25 | 

###  **ListePrivateDatasett** 

Beskrivelse
Avgjør om private datasett (De som krever autentisering) vises i hovedlisten.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | falsk | 
 |   **Langsiktige mål**   | falsk | 
 |   **Historie**   | Lagt til i 1.20 | 

###  **politiske bøker** 

Beskrivelse
Kontrollere om politiske grenser kan tegnes på kart.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 1.80 | 

##  **📂 Metadata og standarder** 

###  **fgdcActive** 

Beskrivelse
Oppretter og tjener FGDC (forbundsgeografisk Datakomiteen) metadata.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 1.38 | 

###  **iso19115 Aktiv** 

Beskrivelse
Oppretter og betjener ISO 19115 metadata.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 1.38 | 

###  **brukSisISO19115** 

Beskrivelse
Bruker Apache SIS-biblioteket til å generere ISO 19115 metadata i stedet for arvegeneratoren. Hvis dette er på og brukSisISO19139 ikke er på, vil standard IOS 19115 metadata være i ISO19115_3_2016-format. Hvis dette er feil, vil standardformatet være i det tidligere endret ISO19115_2-formatet.

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
Genererer og tjener JSON-LD (Linkede data) metadata.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Legacy | 

###  **genererCroissantSchema** 

Beskrivelse
Oppretter "Croissant" metadata skjema som standard skjema for maskinlæring beredskap.

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
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | Sett som ønsket | 
 |   **Historie**   | Legacy | 

###  **NcCFSubsetVariables** 

Beskrivelse
Legacy-adferd var å generere undergruppevariabler kun for EDDTableFromNcCFFiles-datasett. Dette ble lagt til standard atferd for EDDTableFromNcCFFiles å være i samsvar med andre datasett typer. Hvis du trenger arven automatisk subsetVariables Du kan aktivere dette. Den bedre løsningen vil være å legge til subsetVariables til definisjonen av datasett.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Testing | 
 |   **Gjeldende standard**   | falsk | 
 |   **Langsiktige mål**   | falsk | 
 |   **Historie**   | Lagt til i 2.26 | 

##  **🔔 Abonnementer og varsler** 

###  **abonnement SystemActive** 

Beskrivelse
Aktiverer e-postabonnementssystemet for datasettoppdateringer.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 1.14 | 

###  **abonnentToRemoteErddapDataset** 

Beskrivelse
Tillater dette ERDDAP eksempel å abonnere på fjernkontrollen ERDDAP datasett for oppdateringer.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 1.70 | 

###  **updateSubsRssOnFileChanges** 

Beskrivelse
Abonnement og RSS Oppdaterer når underliggende filer endres. Den gamle oppførselen var bare å gjøre oppdateringer på datasett reload (som noen servere hadde så sjelden som ukentlig) ..

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 2.26 | 

###  **aktiver MqttBroker** 

Beskrivelse
Starter en intern MQTT megler i programmet for å håndtere meldinger.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Testing | 
 |   **Gjeldende standard**   | falsk | 
 |   **Langsiktige mål**   | Sett som ønsket | 
 |   **Historie**   | Lagt til i 2.29.0 | 

###  **publiseringMqttNotif** 

Beskrivelse
Aktiverer publisering av varslinger (som endringer i datasett) til MQTT megler.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Testing | 
 |   **Gjeldende standard**   | falsk | 
 |   **Langsiktige mål**   | Sett som ønsket | 
 |   **Historie**   | Lagt til i 2.29.0 | 

##  **🌐 Webtopptekster/konfigurasjon** 

###  **brukHeadersFor Url** 

Beskrivelse
Tillater bruk av HTTP-overskrifter å bestemme forespørselens URL-detaljer (Nyttig bak proxies) ..

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Standard endret til sant i 2.28.0, lagt til i 2.27.0 | 

###  **aktiver Cors** 

Beskrivelse
Aktiverer deling av ressurser på krysset (CORS) overskrifter på HTTP-svar.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | falsk | 
 |   **Langsiktige mål**   | Sett som ønsket | 
 |   **Historie**   | Lagt til i 2.26 | 

##  **🔍 Søk** 

###  **brukLuceneSearchEngine** 

Beskrivelse
Bytter den interne søkemotoren for å bruke Apache Lucene.

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
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 1.58 | 

###  **omformereActive** 

Beskrivelse
Aktiverer konverteringsverktøy i UI.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 1.44 | 

###  **slideSorterActive** 

Beskrivelse
Aktiverer lysbildesorteringen.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 1.44 | 

###  **dataProviderFormActive** 

Beskrivelse
Aktiverer skjemaet som gjør det mulig for dataleverandører å skrive inn metadata.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Legacy | 

###  **outOfDateDatasettActive** 

Beskrivelse
Aktiverer rapportering av utdaterte datasett.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 1.82 | 

###  **wmsActive** 

Beskrivelse
Aktiverer webkarttjenesten ( WMS ) grensesnitt.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Lagt til i 1.44 | 

###  **wmsClientActive** 

Beskrivelse
Aktiverer det interne WMS Kundefunksjoner.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Stable | 
 |   **Gjeldende standard**   | sant | 
 |   **Langsiktige mål**   | sant | 
 |   **Historie**   | Legacy | 

###  **GeoServicesRestActive** 

Beskrivelse
Aktiverer RESTful grensesnitt for Geospatial Services. Ikke fullt implementert.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Under konstruksjon | 
 |   **Gjeldende standard**   | falsk (Hardcoded)   | 
 |   **Langsiktige mål**   | sant | 

###  **wcsActive** 

Beskrivelse
Aktiverer nettdekningstjenesten ( WCS ) grensesnitt. Ikke fullt implementert.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Under konstruksjon | 
 |   **Gjeldende standard**   | falsk (Hardcoded)   | 
 |   **Langsiktige mål**   | sant | 

###  **sosActive** 

Beskrivelse
Aktiverer sensorobservasjonstjenesten ( SOS ) grensesnitt.

 | Eiendom | Detaljer | 
 | ---- | ---- | 
 |   **Livssyklus**   | Under konstruksjon | 
 |   **Gjeldende standard**   | falsk (Hardcoded)   | 
 |   **Langsiktige mål**   | sant | 
