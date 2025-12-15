---
title: "ERDDAP™ and the Cloud"
---
#  ERDDAP™ en de wolk

## Wat is de wolk?

De eenvoudigste definitie is niet lokale servers. Dit is zeer breed en kan veel verschillende opstellingen betekenen. Het kan bijvoorbeeld een dedicated fysieke server zijn in een datacenter, een Virtual Private Server, een gedeelde server, serverloos of iets anders.

### Waarom Cloud

Er zijn vele redenen waarom organisaties willen verhuizen naar de cloud. De belangrijkste is de flexibiliteit die het biedt voor het berekenen / opslaan van behoeften in vergelijking met het kopen van fysieke hardware.

Dit elimineert de noodzaak om een datacenter/serverruimte te behouden. Het maakt het ook mogelijk om de middelen te schalen naar uw huidige behoeften. Net als de cloud kan betekenen veel verschillende dingen, in staat zijn om uw middelen te schalen doet ook. Het kan betekenen dat je voor meer betaalt. (of minder) serverloze bronnen. Het kan betekenen dat je van een gedeelde server naar een privéserver gaat. Het kan betekenen dat je naar een grotere dedicated fysieke server moet upgraden.

## Kan ERDDAP™ In de wolk rennen?

Ja.

 ERDDAP™ is ontworpen om te draaien binnen Tomcat die lokaal of in cloud omgevingen kan worden uitgevoerd. Er is communautaire steun voor hardlopen in Docker en er is [officieel Docker ondersteuning binnenkort](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .

Dat gezegd hebbende, ERDDAP™ werd ontworpen in een tijd waarin dedicated servers de norm waren. Het is niet serverloos, en zou zeer moeilijk, zo niet onmogelijk zijn om het serverloos te maken.

### Kan ERDDAP™ Schaal?

Schalen ERDDAP™ is ingewikkelder dan het gebruik van meer serverloze middelen. We hebben een aantal geweldige documentatie over [Hoe te schalen ERDDAP™ ](https://erddap.github.io/docs/server-admin/scaling) . Het makkelijker maken om te schalen ERDDAP™ Is iets waar we in geïnteresseerd zijn.

### Wat voorkomt autoscaling?

 ERDDAP™ doet veel dingen zoals het bijhouden van datasets up-to-date, het informeren van abonnees van wijzigingen in datasets, caching gegevens, het behandelen van gebruikersverzoeken, en meer. Voor een voldoende grote ERDDAP™ server zoals [Kustwacht](https://coastwatch.pfeg.noaa.gov/erddap/index.html) Dit betekent dat het voortdurend iets doet. Continu gebruik is eigenlijk een extreem dure situatie voor serverloze opties (u betaalt een grote premie voor het berekenen bij het doen van serverless en dus het belangrijkste voordeel is wanneer u slechts af en toe te bellen) . Bovendien, proberen te verplaatsen van alle van ERDDAP™ De verschillende functionaliteit naar serverloze versies zou eindigen met een aanzienlijk ingewikkelder setup nodig voor admins.

### Kan ERDDAP™ Cloud Storage gebruiken?

Ja.

 ERDDAP™ ondersteunt cloudopslag (Met inbegrip van AWS S3) en verbetering van deze steun (bijvoorbeeld niet-AWS S3) is een hoge prioriteit op de ERDDAP™ ontwikkelingsplan. ERDDAP™ is ook in staat om gegevens uit vele bestaande online diensten te halen. Voor meer informatie raad ik aan om door onze [documentatie over het datasettype](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) .
