---
title: "ERDDAP™ and the Cloud"
---
#  ERDDAP™ och molnet

## Vad är molnet

Den enklaste definitionen är inte lokala servrar. Detta är mycket brett och kan betyda många olika inställningar. Det kan till exempel vara en dedikerad fysisk server i ett datacenter, en virtuell privat server, en delad server, serverlös eller något annat.

### Varför Cloud

Det finns många anledningar organisationer vill flytta till molnet. Den viktigaste är den flexibilitet det ger för beräkning / lagringsbehov jämfört med att köpa fysisk hårdvara.

Detta eliminerar behovet av att upprätthålla ett datacenter / serverrum. Det möjliggör också skalning av beräkningsresurser till dina nuvarande behov. Mycket som molnet kan betyda många olika saker, att kunna skala dina resurser gör också. Det kan innebära att betala för mer (eller mindre) serverlösa resurser. Det kan innebära att man flyttar från en delad server till en privat server. Det kan innebära uppgradering till en större dedikerad fysisk server.

## Kan ERDDAP™ Kör i molnet?

Ja.

 ERDDAP™ är utformad för att köras inom Tomcat som kan köras lokalt eller i molnmiljöer. Det finns gemenskapsstöd för att springa i Docker och det finns [officiella officiella Docker stöd kommer snart](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .

Som sagt, ERDDAP™ designades vid en tidpunkt då dedikerade servrar var normen. Det är inte serverlöst och skulle vara extremt svårt om inte omöjligt att göra det serverlöst.

### Kan ERDDAP™ Skala?

Scaling ERDDAP™ är mer komplicerat än att bara använda mer serverlösa resurser. Vi har en bra dokumentation om [Hur man ska skala ERDDAP™ ](https://erddap.github.io/docs/server-admin/scaling) . Gör det lättare att skala ERDDAP™ är något vi är intresserade av.

### Vad förhindrar autoscaling?

 ERDDAP™ gör många saker, inklusive att hålla datamängder uppdaterade, meddelar abonnenter av ändringar i datamängder, caching data, hantera användarförfrågningar och mer. För en tillräckligt stor ERDDAP™ Server som [CoastWatch](https://coastwatch.pfeg.noaa.gov/erddap/index.html) Det betyder att det ständigt gör något. Fortlöpande användning är faktiskt en extremt dyr situation för serverlösa alternativ (du betalar en stor premie för beräkning när du gör serverlös och så är den största fördelen när du bara ibland ringer) . Dessutom försöker man flytta alla ERDDAP™ olika funktionalitet till serverlösa versioner skulle sluta med en betydligt mer komplicerad installation som krävs för administratörer.

### Kan ERDDAP™ Använd Cloud Storage?

Ja.

 ERDDAP™ stöder molnlagring (inklusive AWS S3) och förbättra detta stöd (Till exempel icke-AWS S3) är en hög prioritet på ERDDAP™ utvecklingsfärdplan. ERDDAP™ kan också dra data från många befintliga onlinetjänster. För mer information rekommenderar jag att du tittar igenom vår [Dataset typ dokumentation](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) .
