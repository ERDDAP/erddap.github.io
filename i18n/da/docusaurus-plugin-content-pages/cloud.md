---
title: "ERDDAP™ and the Cloud"
---
# ERDDAP™og Cloud

## Hvad er skyen

Den enkleste definition er ikke lokale servere. Dette er meget bredt og kan betyde mange forskellige opsætninger. For eksempel kunne det være en dedikeret fysisk server i et datacenter, en virtuel privat server, en delt server, serverløs eller noget andet.

### Hvorfor Cloud

Der er mange grunde til, at organisationer vil flytte til skyen. Den vigtigste er fleksibiliteten, det giver til beregning/storage behov sammenlignet med at købe fysisk hardware.

Dette eliminerer behovet for at opretholde et datacenter/serverrum. Det giver også mulighed for at afskalere beregningsressourcer til dine nuværende behov. Meget som skyen kan betyde mange forskellige ting, at være i stand til at skalere dine ressourcer også. Det kunne betyde at betale for mere (eller mindre) serverløse ressourcer. Det kunne betyde at bevæge sig fra en delt server til en privat server. Det kunne betyde opgradering til en større dedikeret fysisk server.

## Kan man købeERDDAP™Kør i skyen?

Ja.

ERDDAP™er designet til at køre inden for Tomcat, som kan køre lokalt eller i skymiljøer. Der er fællesskabsstøtte til at køre i Docker og der er[officielle officielle Docker support kommer snart](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md).

Det sagde:ERDDAP™blev designet på et tidspunkt, hvor dedikerede servere var normen. Det er ikke serverløs, og ville være ekstremt vanskeligt, hvis ikke umuligt at gøre det serverløst.

### Kan man købeERDDAP™skala?

SkaleringERDDAP™er mere kompliceret end bare at bruge flere serverløse ressourcer. Vi har nogle gode dokumenter på[Sådan skal du skalaerERDDAP™](https://erddap.github.io/docs/server-admin/scaling). Gør det nemmere at skalereERDDAP™er noget, vi er interesseret i.

### Hvad forhindrer automatisk afkalkning?

ERDDAP™gør mange ting, herunder at holde datasæt opdateret, underrette abonnenter om ændringer i datasæt, cacheching data, håndtering af brugeranmodninger og mere. Til en tilstrækkelig storERDDAP™server som server[Billeder af CoastWatch](https://coastwatch.pfeg.noaa.gov/erddap/index.html)Det betyder, at det hele tiden gør noget. Fortsat brug er faktisk en ekstremt dyr situation for serverløse muligheder (du betaler en stor præmie til beregning, når du gør serverløs, og så den største fordel er, når du kun lejlighedsvis foretager opkald) . Derudover forsøger at flytte alt fraERDDAP™’s forskellige funktionalitet til serverløse versioner ville ende med en signifikant mere kompliceret opsætning nødvendig for administratorer.

### Kan man købeERDDAP™Brug Cloud Storage?

Ja.

ERDDAP™understøtter cloud-lagring (herunder AWS S3) og forbedre denne støtte (for eksempel ikke-AWS S3) er en høj prioritet på denERDDAP™udvikling roadmap.ERDDAP™er også i stand til at trække data fra mange eksisterende onlinetjenester. For mere information anbefaler jeg at kigge igennem vores[Datasæt type dokumentation](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types).
