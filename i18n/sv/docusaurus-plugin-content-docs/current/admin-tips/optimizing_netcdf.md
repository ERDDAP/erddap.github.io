Detta innehåll är baserat på en [från Roy Mendelssohn till ERDDAP användare grupp](https://groups.google.com/g/erddap/c/JWoS_y3cygg/m/zCpcNTxNAAAJ) .

1. Optimera netcdf-filer för molnet
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

a. ompackning och sidstorlek

Nyligen när jag gjorde lite forskning kom jag över denna mycket intressanta artikel:

https://nsidc.github.io/cloud-optimized-icesat2/

Ingenting verkar inflammera passioner som diskussioner om programmeringsspråk, redaktörer och filformat, och detta är inte en rekommendation om vilket format. (s) Du bör använda, men snarare för att förstå vad som finns i det papperet och för att se hur mycket förbättring kan bli ( ERDDAP™ har alltid försökt att vara agnostisk över en hel del av dessa frågor, snarare välja att försöka arbeta med hur människor faktiskt arbetar med data.) .

Papperet riktar sig främst till situationer där data lagras i en objektbutik som Amazon S3. Objektbutiker nås via nätverket med http  (s) kommandon, så jämfört med lagring med en direkt anslutning till (virtuell virtuell virtuell) Server, det finns en mycket längre latens eftersom begäran måste göra en rund resa. För objektbutiker du vill göra så få förfrågningar som möjligt, men om du bara gör riktigt stora förfrågningar att minska antalet samtal, kan du komma åt mer data än du behöver, vilket kan vara lika långsamt om inte mer så. Så tricket är att uppnå en balans mellan dessa två faktorer. Och även om tillgång till data på objektbutiker har förbättrats kraftigt, så har tillgång till direkt fäst lagring. I forskningen är vissa uppskattningar:

Lokal disk:
•• Söktid: 0,1 ms
6 söker: 0,6 ms (Försumbar) 
•• Läsa spridda metadata är snabb
Cloud HTTP:
•• Begär latens: 100-200ms
6 förfrågningar: 600-1200ms (Mycket långsam&#33;) 
•• Varje begäran har nätverksrundturstid

Det andra att förstå är att netcdf4/hdf5-filer lagras i bitar och returneras i sidor, så den relativa storleken på var och en av dessa kan verkligen påverka åtkomsthastigheten när åtkomsten är från en objektbutik, och att metadata om filen sprids över filen, så att få metadata kan ta flera förfrågningar. Huvudpunkten i papperet är att standardsidan storlek för netcdf4 / hdf5 filer är 4096 byte (4KB) - (Vilket är hemskt för molnet&#33;) Eftersom metadatastorleken ensam är större än detta och mer än troligt är dina bitstorlekar också större än detta. Så ett extrakt kommer att kräva mycket rundturer som är långsam. Vad du vill göra är att packa om filen så att alla metadata är på filens "topp" och att sidstorleken är minst lika stor som metadatastorleken plus storleken på en bit. Även som standard är sidstorleken inte fast, men använder en strategi som varierar. Vad papperet hittade är att använda en fast sidstorlek gav bättre resultat.

Så hur kan jag bestämma fil metadata storlek?

> h5stat yourfile.nc | grep "File metadata" # metadata size
>

Och hur kan jag bestämma chunk storlek:

> h5dump -pH MUR41_file.nc | grep -A3 CHUNKED
>

eller

> ncdump -sh MUR41_file.nc | grep ChunkSizes
>

Och hur kan jag bestämma sidstorleksstrategin:

> h5stat yourfile.nc | grep "File space management strategy"
>

Troligtvis kommer detta kommando att returnera "H5F_FSPACE_STRATEGY_FSM_AGGR" som är standardstrategin och vad vi vill att den ska returneras är "H5F_FSPACE_STRATEGY_PAGE"

Hur kan jag packa om min netcdf-fil så att alla metadata är på framsidan och ändra strategin så att en fast sidstorlek används och vilken sidstorlek som ska användas? Tumregler som jag hittade är:

Sidstorleksval:
•• Måste vara ≥ total fil metadata storlek (Kritisk&#33;) 
•• Bör vara kraft 2 (4MB, 8MB, 16MB, etc.) 
•• Gå inte galet stort - 32 MB är vanligtvis den praktiska maxen
•• Överväga bitstorlekar - sidstorlek bör rymma största bitar

Som sagt ovan, helst storleken bör vara större än metadata storlek plus storleken på en bit. Vad studien fann är att för många datamängder är 8MB-sidstorleken en bra avvägning, det är förmodligen större än metadatastorleken + bitstorlek och inte drar mycket mer data än du behöver. För att uppnå detta:

h5repack -S PAGE -G 8388608 yourfile .nc Yourfile_optimerad .nc 

Här är värdena att använda för att få olika sidstorlekar:

4194304 (4MB) 
8388608 (8MB) 
16777216 (16MB) 
33554432 (32MB) 

b. Finns det fördelar om du använder filer lokalt också?

Papperet och annat jag har funnit tyder på att även lokalt kan det finnas en hastighetsvinst någonstans från 10% till 30%. I mitt allt annat än uttömmande test hittade jag hastighetsvinster på cirka 10% när förfrågningarna är relativt små jämfört med den totala filstorleken, och hastighetsökningen minskar när begäran blir större, men jag fann aldrig att det var långsammare.

c. c. TANSTAAFL

Åh men det finns mycket en fångst någonstans, det verkar som en gratis lunch. Och fångsten är att den fasta sidstorleken ökar filens storlek. För några av de fall jag försökte:

617M mur1 .nc 
632M mur1_optimerad .nc 
608M mur2 .nc 
616M mur2_optimerad .nc 
29M chla1 .nc 
40M chla1_optimerad .nc 
30M chla2 .nc 
40M chla2_optimerad .nc 

Så avvägningen är att det finns en inte obetydlig ökning av filstorleken.

d. d. Men om jag måste reprocessa filerna ändå...?

En bra fråga är om jag måste skriva ett manus för att reparera filerna, varför inte bara skriva ett manus för att översätta till ett format som att säga zarr? zarr har många förespråkare och om du är intresserad av zarr gör du bara en snabb duckduckgo-sökning och det finns många bra inlägg, en kanske mer balanserad vy är påhttps://www.youtube.com/watch?v=IEAcCmcOdJs  (Det är intressant att många av de punkter han höjer är vad ischunk-formatet försöker adressera.) . Så varför kanske du inte vill översätta dina filer till något som zarr, Först, om du skapar netcdf-filer regelbundet, kan du börja optimera filerna från och med nu, som med tiden kommer att se hastighetsvinster och du behöver inte reformera tidigare filer, och ERDDAP™ kommer fortfarande att kunna aggregera över filerna även om några av de interna inställningarna skiljer sig. För det andra kan du ha mycket verktyg som beror på netcdf-filer, och detta tillvägagångssätt skulle innebära att du inte behöver retool vad som kan vara en omfattande mängd kod. Poängen är att vara medveten om alternativ och välja vad som fungerar bäst för din situation. Precis som en påminnelse, om du väljer att använda zarrfiler med ERDDAP™ De måste vara zarr format v2 filer.

e. Big data - en åt sidan

Stora data pratas mycket, men hur stora är de data som de flesta använder och hur jämför det med moderna bärbara datorers kapacitet. (Ja bärbara datorer, inte servrar) . En intressant take är på:

https://www.youtube.com/watch?v=GELhdezYmP0Börja runt minuten 37 men hela samtalet är intressant

Studien han nämner är på:

https://motherduck.com/blog/redshift-files-hunt-for-big-data/

Så det finns en relativt liten andel av användare som verkligen behöver vrida upp kraften, men den överväldigande majoriteten av användarna kan göra sina analyser på en bärbar dator, 26TB externa enheter är nu under $ 300 och rykten är att 60TB externa enheter kommer att vara tillgängliga i slutet av året. Något att tänka på.

2. Använda ERDDAP™ Google Cloud Platform eller andra molnleverantörer förutom AWS
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

För tillfället ERDDAP™ är endast känd för att arbeta med AWS objektbutiker (S3) men förbättra och generalisera ERDDAP™ objektbutiksupport finns på todo-listan (sehttps://github.com/ERDDAP/erddap/issues/158) . Så vad du ska göra om du får höra att du måste köra din ERDDAP™ på Google Cloud Platform (GCP) Eller en liknande plattform? För det första erbjuder de flesta molnplattformar olika lagringsnivåer, vanligtvis inklusive en som liknar lokal lagring och erkänns av operativsystemet, en som är ansluten över nätverket som vanligtvis använder NFS för åtkomst. (Återigen direkt tillgänglig via OS) och en som är en objektbutik. Den första lösningen är inte att använda objektbutiker, och du skulle vara bra att gå. Men som alltid är TANSTAAFL och nackdelen i det här fallet när du går från objektaffären -&gt; NFS åtkomst -&gt; lokal butik dina kostnader går också upp. (Jag skulle tillägga att NFS också nås via nätverket och har egna latensproblem, detta skulle också gynnas av filoptimering.) .

Om du måste använda objektbutik, eller bara har råd med en objektbutik, är svaret ett FUSE-filsystem. (https://github.com/libfuse/libfuse) . På GCP kallas detta gcsfuse, och stegen för att installera det är:

• Installera gcsfuse på din GCP Linux-bild:
sudo apt update
sudo apt installera gcsfuse
• Autentisera till GCP (om inte redan autentiserats) Från:
Se till att du har rätt referenser, vanligtvis via servicekontot eller genom att köra gcloud auth inloggning.
•• Montera GCS hink till en lokal katalog:
Montera din GCS hink till en lokal katalog med gcsfuse. Detta gör det möjligt för din GCP-instans att komma åt data som om det var en del av det lokala filsystemet.
gcsfuse your-bucket-name/path/to/mount/directory

Och nu kan din objektbutik nås som det är en del av Linux-filsystemet, så fungerar med ERDDAP™ . Detta verkar som magi, få det bästa av båda världarna, det måste finnas en fångst. Och det finns. FUSE-filsystem är lite långsammare än att komma åt objektbutiken direkt (I grund och botten har du lagt till ett annat lager till tillgången) . I mina forskningsuppskattningar av hur mycket långsammare är över hela kartan, så jag har ingen aning om hur mycket långsammare. Men om du är i en situation där du måste köra på GCP med objektbutiker, har du en lösning för nu som kommer att fungera med ERDDAP™ .

3. Vad du kan göra nu för att hjälpa.
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

Om du har tid och förmåga att testa några av dessa saker och rapportera tillbaka om dina resultat, skulle det vara bra. Särskilt om du har tillgång till GCP eller liknande och se hur mycket långsammare ERDDAP™ Access använder FUSE (Du kan faktiskt testa detta på AWS också) . Om hastighetsstraffet inte är för stort, skulle det vara underbart, eftersom jag har anledning att tro att vissa människor snart kommer att behöva springa. ERDDAP™ s på GCP med objekt store. Detta är inte bara en fråga om teoretiskt intresse.
