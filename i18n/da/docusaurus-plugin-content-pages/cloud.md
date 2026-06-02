---
title: "ERDDAP™ and the Cloud"
---
#  ERDDAP™ og Cloud

## Hvad er skyen

Den enkleste definition er ikke lokale servere. Dette er meget bredt og kan betyde mange forskellige opsætninger. For eksempel kunne det være en dedikeret fysisk server i et datacenter, en virtuel privat server, en delt server, serverløs eller noget andet.

### Hvorfor Cloud

Der er mange grunde til, at organisationer vil flytte til skyen. Den vigtigste er fleksibiliteten, det giver til beregning/storage behov sammenlignet med at købe fysisk hardware.

Dette eliminerer behovet for at opretholde et datacenter/serverrum. Det giver også mulighed for at afskalere beregningsressourcer til dine nuværende behov. Meget som skyen kan betyde mange forskellige ting, at være i stand til at skalere dine ressourcer også. Det kunne betyde at betale for mere (eller mindre) serverløse ressourcer. Det kunne betyde at bevæge sig fra en delt server til en privat server. Det kunne betyde opgradering til en større dedikeret fysisk server.

## Kan man købe ERDDAP™ Kør i skyen?

Ja.

 ERDDAP™ er designet til at køre inden for Tomcat, som kan køre lokalt eller i skymiljøer. Den officielle Docker billede er tilgængelig på [Docker Hub](https://hub.docker.com/r/erddap/erddap) . The The The The The The The `Erddap:alpha-latest` tag er en bygge baseret på de seneste ændringer (noget som en "natlig" udgivelse, [alpha-latest detaljer](https://hub.docker.com/layers/erddap/erddap/alpha-latest/) ) , mens `Erddap:latest` er den seneste testede udgivelse ( [seneste detaljer](https://hub.docker.com/layers/erddap/erddap/latest/) ) . Du kan også gennemse GitHub containerposters.dk. [Pakkerejser til GitHub](https://github.com/ERDDAP/erddap/pkgs/container/erddap) . Du kan læse mere om brugen ERDDAP™ med med [Docker](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .

For Kubernetes udrulninger, se de nye udrulninger [dokumentationsdokumentation](https://erddap.github.io/docs/server-admin/admin-tips/deploy-kubernetes) .

Det sagde: ERDDAP™ blev designet på et tidspunkt, hvor dedikerede servere var normen. Det er ikke serverløs, og ville være ekstremt vanskeligt, hvis ikke umuligt at gøre det serverløst.

### Kan man købe ERDDAP™ skala?

Skalering ERDDAP™ er mere kompliceret end bare at bruge flere serverløse ressourcer. Vi har nogle gode dokumenter på [Sådan skal du skalaer ERDDAP™ ](https://erddap.github.io/docs/server-admin/scaling) . Gør det nemmere at skalere ERDDAP™ er noget, vi er interesseret i.

### Hvad forhindrer automatisk afkalkning?

 ERDDAP™ gør mange ting, herunder at holde datasæt opdateret, underrette abonnenter om ændringer i datasæt, cacheching data, håndtering af brugeranmodninger og mere. Til en tilstrækkelig stor ERDDAP™ server som server [Billeder af CoastWatch](https://coastwatch.pfeg.noaa.gov/erddap/index.html) Det betyder, at det hele tiden gør noget. Fortsat brug er faktisk en ekstremt dyr situation for serverløse muligheder (du betaler en stor præmie til beregning, når du gør serverløs, og så den største fordel er, når du kun lejlighedsvis foretager opkald) . Derudover forsøger at flytte alt fra ERDDAP™ ’s forskellige funktionalitet til serverløse versioner ville ende med en signifikant mere kompliceret opsætning nødvendig for administratorer.

### Kan man købe ERDDAP™ Brug Cloud Storage?

Ja.

 ERDDAP™ understøtter cloud-lagring (herunder AWS S3) og forbedre denne støtte (for eksempel ikke-AWS S3) er en høj prioritet på den ERDDAP™ udvikling roadmap. ERDDAP™ er også i stand til at trække data fra mange eksisterende onlinetjenester. For mere information anbefaler jeg at kigge igennem vores [Datasæt type dokumentation](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) .
