Deze inhoud is gebaseerd op een [bericht van Roy Mendelssohn aan de ERDDAP gebruikersgroep](https://groups.google.com/g/erddap/c/JWoS_y3cygg/m/zCpcNTxNAAAJ) .

1. Netcdf-bestanden optimaliseren voor de cloud
Wat is er?

a. herverpakking en paginagrootte

Onlangs in het doen van wat onderzoek kwam ik dit zeer interessante artikel:

https://nsidc.github.io/cloud-optimized-icesat2/

Niets lijkt passie te ontvlammen zoals discussies over programmeertalen, editors en bestandsformaten, en dit is geen aanbeveling van welk formaat (s) je zou moeten gebruiken, maar liever om te begrijpen wat er in dat document en om te zien hoeveel verbetering kan worden verkregen ( ERDDAP™ heeft altijd geprobeerd om agnostisch te zijn over veel van deze zaken, liever kiezen om te proberen en werken met hoe mensen eigenlijk werken met gegevens) .

Het papier is voornamelijk gericht op situaties waarin de gegevens worden opgeslagen in een objectopslag zoals Amazon S3. Object stores zijn toegankelijk via het netwerk met behulp van http  (s) commando's, dus vergeleken met opslag met een directe verbinding met de (virtueel) server, er is een veel langere latency als het verzoek moet een ronde trip te maken. Voor objectopslags die je zo weinig mogelijk verzoeken wilt doen, maar als je gewoon echt grote verzoeken doet om het aantal oproepen te verminderen, kun je veel meer gegevens benaderen dan je nodig hebt, wat even traag kan zijn als niet meer. Dus de truc is om een evenwicht te bereiken tussen deze twee factoren. En ook al is de toegang tot gegevens over object stores sterk verbeterd, zo heeft toegang tot direct aangesloten opslag. Bij het onderzoek naar dit zijn enkele schattingen:

Lokale schijf:
• Zoektijd: 0.1ms
• 6 zoekopdrachten: 0,6ms (verwaarloosbaar) 
• Het lezen van verspreide metadata is snel
Cloud HTTP:
• Verzoek latentie: 100-200m
• 6 aanvragen: 600-1200ms (Heel langzaam.) 
• Elke aanvraag heeft netwerk ronde reistijd

Het tweede ding om te begrijpen is dat netcdf4/hdf5 bestanden worden opgeslagen in brokken en geretourneerd in pagina's, zodat de relatieve grootte van elk van deze kan echt invloed hebben op de toegang snelheid wanneer de toegang is uit een object store, en dat standaard de metadata over het bestand zijn verspreid over het bestand, dus het krijgen van de metadata kan verschillende verzoeken. Het belangrijkste punt van het papier is dat de standaard pagina grootte voor netcdf4/hdf5 bestanden is 4096 bytes (4KB) - (Dat is verschrikkelijk voor de wolk&#33;) aangezien de metadata grootte alleen waarschijnlijk groter is dan dit en meer dan waarschijnlijk uw brok maten zijn ook groter dan dit. Dus een extract zal veel ronde-trips nodig hebben die traag zijn. Wat je wilt doen is het bestand opnieuw inpakken zodat alle metadata aan de top van het bestand liggen, en dat de paginagrootte minstens zo groot is als de metadatagrootte plus de grootte van één stuk. Ook standaard is de paginagrootte niet vast, maar gebruikt een strategie die varieert. Wat het papier gevonden is met behulp van een vaste pagina grootte leverde betere resultaten.

Hoe kan ik de grootte van de bestandsmetadata bepalen?

> h5stat yourfile.nc | grep "File metadata" # metadata size
>

En hoe kan ik brokgrootte bepalen:

> h5dump -pH MUR41_file.nc | grep -A3 CHUNKED
>

of

> ncdump -sh MUR41_file.nc | grep ChunkSizes
>

En hoe kan ik de pagina grootte strategie bepalen:

> h5stat yourfile.nc | grep "File space management strategy"
>

Het meest waarschijnlijk is dat dit commando zal terugkeren naar 

Hoe kan ik mijn netcdf bestand herpakken zodat alle metadata aan de voorkant is, en de strategie veranderen zodat een vaste paginagrootte wordt gebruikt, en welke paginagrootte te gebruiken? Vuistregels die ik vond zijn:

Paginagrootteselectie:
• Moet ≥ totale bestandsmetadata grootte hebben (kritiek&#33;) 
• Moet vermogen van 2 zijn (4MB, 8MB, 16MB, enz.) 
• Niet gek groot - 32MB is meestal de praktische max
• Beschouw brok grootte - pagina grootte moet plaats maken voor de grootste brokken

Zoals hierboven gezegd, idealiter moet de grootte groter zijn dan de metadata grootte plus de grootte van een brok. Wat de studie vond is dat voor veel datasets de 8MB pagina grootte is een goede tradeoff, het is waarschijnlijk groter dan de metadata grootte + brok grootte, en niet trekt veel meer gegevens dan je nodig hebt. Om dit te bereiken:

h5repack -S PAGE -G 8388608 yourfile .nc yourfile_geoptimaliseerd .nc 

Hier zijn de waarden te gebruiken om verschillende paginagroottes te krijgen:

4194304 (4MB) 
8388608 (8MB) 
16777216 (16MB) 
33554432 (32MB) 

b. Zijn er voordelen als u bestanden ook lokaal gebruikt?

Het papier en andere dingen die ik heb gevonden suggereren dat zelfs lokaal kan er een snelheidswinst overal van 10%-30%. In mijn alles behalve uitputtende tests vond ik snelheidswinst van ongeveer 10% wanneer de verzoeken zijn relatief klein in vergelijking met de totale bestandsgrootte, en de snelheidsverhoging neemt af als het verzoek groter wordt, maar ik vond nooit langzamer.

c. TANSTAFL

Ah maar er is ergens veel aan de hand, dit lijkt op een gratis lunch. En de vangst is dat de vaste pagina grootte verhoogt de grootte van het bestand. Voor sommige gevallen heb ik geprobeerd:

617M mur1 .nc 
632M mur1_geoptimaliseerd .nc 
608M mur2 .nc 
616M mur2geoptimaliseerd .nc 
29M chla1 .nc 
40M geoptimaliseerd .nc 
30M chla2 .nc 
40M chla2geoptimaliseerd .nc 

Dus de tradeoff is er een niet onbelangrijke toename van de bestandsgrootte.

d. Maar als ik de bestanden toch moet herwerken......?

Een goede vraag is of ik een script moet schrijven om de bestanden te reprocesseren, waarom niet gewoon een script schrijven om te vertalen naar een formaat zoals say zarr? Zarr heeft veel voorstanders en als je geïnteresseerd bent in zarr doe gewoon een snelle deckduckgo zoeken en er veel goede posten, een misschien meer evenwichtige mening is ophttps://www.youtube.com/watch?v=IEAcCmcOdJs  (Het is interessant dat veel van de punten die hij naar voren brengt zijn wat het ijschunk formaat proberen aan te pakken) . Dus waarom zou je misschien niet wilt om uw bestanden te vertalen naar iets als zarr, Ten eerste, als je netcdf bestanden regelmatig te maken, kunt u beginnen met het optimaliseren van de bestanden vanaf nu, die na verloop van tijd snelheid winsten zal zien en je zult niet hoeven te formatteren bestanden uit het verleden, en ERDDAP™ zal nog steeds kunnen aggregeren over de bestanden, hoewel sommige van de interne instellingen verschillen. Ten tweede, je zou kunnen hebben een heleboel tooling die afhankelijk is van netcdf bestanden, en deze aanpak zou betekenen dat niet hoeft te retoolen wat een uitgebreide hoeveelheid code kan zijn. Het punt is om bewust te zijn van opties en te kiezen wat het beste werkt voor uw situatie. Net als een herinnering, als u ervoor kiest om zarr bestanden te gebruiken met ERDDAP™ , ze moeten zarr formaat v2 bestanden.

e. Big data - een terzijde

Big data wordt veel besproken, maar hoe groot is de data die de meeste mensen gebruiken en hoe verhoudt dat zich met de mogelijkheden van moderne laptops (ja laptops, geen servers) . Een interessante take is:

https://www.youtube.com/watch?v=GELhdezYmP0Begin rond minuut 37 al is het hele gesprek interessant

De studie die hij noemt is op:

https://motherduck.com/blog/redshift-files-hunt-for-big-data/

Dus er zijn een relatief klein percentage van de gebruikers die echt nodig hebben om de macht te stimuleren, maar de overgrote meerderheid van de gebruikers kunnen hun analyses doen op een laptop, 26TB externe schijven zijn nu onder $ 300 en geruchten zijn dat 60TB externe schijven beschikbaar zullen zijn tegen het einde van het jaar. Iets om over na te denken.

2. Gebruik ERDDAP™ met Google Cloud Platform of andere cloudproviders naast AWS
--------------------------------------------------------------------------------------------------------------------------------------

Op dit moment ERDDAP™ is alleen bekend om te werken met AWS object stores (S3) , hoewel verbeteren en generaliseren ERDDAP™ Ondersteuning voor objectenopslag staat op de todolijst (ziehttps://github.com/ERDDAP/erddap/issues/158) . Dus wat te doen als u wordt verteld dat u uw ERDDAP™ op Google Cloud Platform (GCP) of een soortgelijk platform? Ten eerste, de meeste cloud platforms bieden verschillende niveaus van opslag, meestal met inbegrip van een die vergelijkbaar is met lokale opslag en wordt erkend door het besturingssysteem, een die is aangesloten over het netwerk meestal met behulp van NFS voor toegang (opnieuw direct toegankelijk door het OS) , en een die is een object winkel. De eerste oplossing is het niet gebruiken van object winkels, en je zou goed zijn om te gaan. Maar zoals altijd, Tanstaafl en het nadeel in dit geval is als je gaat van object store -&gt; NFS toegang -&gt; lokale opslag uw kosten ook omhoog gaan. (Ik wil toevoegen dat NFS is ook toegankelijk via het netwerk, en heeft zijn eigen latency problemen, dit zou ook profiteren van bestand optimalisatie) .

Als u object store moet gebruiken, of alleen een object store kunt veroorloven, is het antwoord een FUSE bestandssysteem (https://github.com/libfuse/libfuse) . Op GCP heet dit gcsfuse, en de stappen om het te installeren zijn:

• Installeer gcsfuse op je GCP Linux image:
sudo apt update
sudo apt install gcsfuse
• Authenticeren naar GCP (indien nog niet geauthenticeerd) :
Zorg ervoor dat u de juiste referenties, meestal via de service account of door het uitvoeren van gcloud auth login.
• Koppel de GCS-emmer aan een lokale map:
Monteer je GCS-emmer naar een lokale map met gcsfuse. Hierdoor heeft uw GCP instantie toegang tot de gegevens alsof het deel uitmaakte van het lokale bestandssysteem.
gcsfuse je-bucket-naam /path/to/mount/directory

En nu kan je object store worden benaderd alsof het deel uitmaakt van het Linux bestandssysteem, dus zal werken met ERDDAP™ . Dit lijkt op magie, om het beste van beide werelden te krijgen, moet er een vangst zijn. En dat is er ook. FUSE-bestandssystemen zijn een stuk langzamer dan direct toegang tot de objectopslag (in principe heb je een andere laag aan de toegang toegevoegd) . In mijn onderzoek schattingen van hoeveel langzamer zijn over de hele kaart, dus ik heb geen idee hoeveel langzamer. Maar als je in een situatie waarin je moet draaien op GCP met behulp van object stores, heb je een oplossing voor nu die zal werken met ERDDAP™ .

3. Wat je nu kunt doen om te helpen.
Wat?

Als je tijd en vermogen hebt om sommige van deze dingen te testen en verslag uit te brengen over je resultaten, zou dat geweldig zijn. Vooral als je toegang hebt tot GCP of vergelijkbaar en ziet hoeveel langzamer ERDDAP™ toegang gebruikt FUSE (Goed eigenlijk kunt u dit ook testen op AWS) . Als de snelheidsstraf niet te groot is, zou dat geweldig zijn, want ik heb reden om te geloven dat sommige mensen binnenkort hun ERDDAP™ s op GCP met objectopslag. Dus dit is niet alleen een kwestie van theoretisch belang.
