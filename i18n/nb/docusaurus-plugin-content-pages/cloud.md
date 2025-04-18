---
title: "ERDDAP™ and the Cloud"
---
# ERDDAP™og skyen

## Hva er skyen

Den enkleste definisjonen er ikke lokale servere. Dette er svært bredt og kan bety mange forskjellige oppsett. For eksempel kan det være en dedikert fysisk server i et datasenter, en virtuell privat server, en delt server, serverløs eller noe annet.

### Hvorfor sky

Det er mange grunner til at organisasjoner ønsker å flytte til skyen. Den viktigste er fleksibiliteten den gir for beregning / lagring behov sammenlignet med å kjøpe fysisk maskinvare.

Dette eliminerer behovet for å opprettholde et datasenter/serverrom. Det gir også mulighet til å beregne ressurser til dine nåværende behov. Mye som skyen kan bety mange forskjellige ting, å være i stand til å skalere ressursene dine gjør det også. Det kan bety å betale for mer (eller mindre) serverløse ressurser. Det kan bety å flytte fra en delt server til en privat server. Det kan bety oppgradering til en større dedikert fysisk server.

## KanERDDAP™Spring i skyen?

Ja.

ERDDAP™er designet for å kjøre i Tomcat som kan kjøres lokalt eller i skymiljøer. Det er felles støtte til drift i Docker og det er[offisiell Docker støtte kommer snart](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md)..

Som sagt:ERDDAP™ble designet på et tidspunkt da dedikerte servere var normen. Det er ikke serverløst, og ville være ekstremt vanskelig hvis ikke umulig å gjøre det serverløst.

### KanERDDAP™Skaler?

SkaleringERDDAP™Er mer komplisert enn bare å bruke mer serverløse ressurser. Vi har god dokumentasjon på[Hvordan skalereERDDAP™](https://erddap.github.io/docs/server-admin/scaling).. Gjør det lettere å skalereERDDAP™Er noe vi er interessert i.

### Hva hindrer autoscaling?

ERDDAP™gjør mange ting inkludert å holde datasett oppdatert, varsle abonnenter om endringer i datasett, cacheing data, håndtering av brukerforespørsler og mer. For en tilstrekkelig storERDDAP™server som[CoastWatch](https://coastwatch.pfeg.noaa.gov/erddap/index.html)Det betyr at det hele tiden gjør noe. Kontinuerlig bruk er faktisk en ekstremt dyr situasjon for serverløse alternativer (du betaler en stor premie for beregning når du gjør serverløs, og så den største fordelen er når du bare av og til foretar samtaler) .. I tillegg prøver å flytte heleERDDAP™De ulike funksjonene til serverløse versjoner ville ende opp med et betydelig mer komplisert oppsett som kreves for administratorer.

### KanERDDAP™Bruk skylagring?

Ja.

ERDDAP™støtter skylagring (inkludert AWS S3) Forbedre denne støtten (For eksempel ikke-AWS S3) Høy prioritet iERDDAP™utviklingsveikart.ERDDAP™er også i stand til å trekke data fra mange eksisterende online tjenester. For mer informasjon anbefaler jeg å se gjennom vår[Datasett typedokumentasjon](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types)..
