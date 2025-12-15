Dette innholdet er basert på en [melding fra Roy Mendelssohn til ERDDAP brukergruppe](https://groups.google.com/g/erddap/c/JWoS_y3cygg/m/zCpcNTxNAAAJ) ..

1. Optimerer netcdf-filer for skyen
——————————————-

a. ompakning og sidestørrelse

Nylig i å gjøre noen forskning jeg kom over denne veldig interessante artikkelen:

https://nsidc.github.io/cloud-optimized-icesat2/

Ingenting synes å inflamme lidenskaper som diskusjoner om programmeringsspråk, redaktører og filformater, og dette er ikke en anbefaling om hvilket format (s) du bør bruke, men heller å forstå hva som er i det papiret og å se hvor mye forbedring kan fås ( ERDDAP™ har alltid prøvd å være agnostikert om mange av disse sakene, snarere å velge å prøve og jobbe med hvordan folk faktisk jobber med data) ..

Papiret er hovedsakelig rettet mot situasjoner der dataene lagres i en gjenstandsbutikk som Amazon S3. Objektbutikker er tilgjengelig over nettverket ved hjelp av http  (s) kommandoer, så sammenlignet med lagring med en direkte tilkobling til (virtuell) server, det er en mye lengre latens som forespørselen må gjøre en rundtur. For objektbutikker du ønsker å gjøre så få forespørsler som mulig, men hvis du bare gjør veldig store forespørsler om å redusere antall samtaler, kan du få tilgang til mer data enn du trenger, som kan være like sakte hvis ikke mer. Så trikset er å oppnå en balanse mellom disse to faktorene. Og selv om tilgangen til data på objektbutikker har blitt kraftig forbedret, så har tilgang til direkte vedlagt lagring. I forskning av dette er noen estimater:

Lokal disk:
• Søketid: 0.1ms
 • 6 søk: 0.6ms (ubetydelig) 
• Å lese spredte metadata er raskt
Sky HTTP:
• Forespørsel latens: 100-200ms
• 6 forespørsler: 600-1200ms (Veldig sakte&#33;) 
• Hver forespørsel har nettrundetid

Den andre ting å forstå er at netcdf4/hdf5-filer lagres i biter og returneres på sider, slik at den relative størrelsen på hver av disse virkelig kan påvirke tilgangshastigheten når tilgangen er fra en objektbutikk, og at metadata om filen som standard er spredt gjennom hele filen, så å få metadata kan ta flere forespørsler. Hovedpunktet i papiret er at standard sidestørrelse for netcdf4/hdf5-filer er 4096 bytes (4KB) - (som er forferdelig for skyen&#33;) siden metadatastørrelsen alene sannsynligvis er større enn dette og mer enn sannsynlig er din bitstørrelse også større enn dette. Så et ekstrakt vil kreve mye runder som er langsom. Hva du vil gjøre er å pakke filen på nytt slik at alle metadataene er på \"toppen\" av filen, og at sidens størrelse er minst like stor som metadatastørrelsen pluss størrelsen på én del. Også som standard er sidens størrelse ikke fast, men bruker en strategi som varierer. Det papiret fant er å bruke en fast sidestørrelse ga bedre resultater.

Så hvordan kan jeg bestemme filmetadatastørrelsen?

> h5stat yourfile.nc | grep "File metadata" # metadata size
>

Og hvordan kan jeg bestemme bitstørrelse:

> h5dump -pH MUR41_file.nc | grep -A3 CHUNKED
>

eller

> ncdump -sh MUR41_file.nc | grep ChunkSizes
>

Og hvordan kan jeg bestemme sidens størrelsesstrategi:

> h5stat yourfile.nc | grep "File space management strategy"
>

Mest sannsynlig vil denne kommandoen returnere \"H5F_FSPACE_STRATEGY_FSM_AGGR\" som er standardstrategien og det vi vil at det skal returnere er \"H5F_FSPACE_STRATEGY_PAGE\"

Hvordan kan jeg pakke min netcdf-fil på nytt slik at alle metadata er foran, og endre strategien slik at en fast sidestørrelse brukes, og hvilken sidestørrelse skal brukes? Tummen jeg fant er:

Sidestørrelsesvalg:
• Må være ≥ total filmetadatastørrelse (kritisk&#33;) 
• Bør være makt 2 (4MB, 8MB, 16MB osv.) 
• Ikke gå gal store - 32 MB er vanligvis den praktiske max
• Vurder bitstørrelser - sidestørrelse bør romme største biter

Som nevnt ovenfor, bør størrelsen helst være større enn metadatastørrelsen pluss størrelsen på én del. Hva studien fant er at for mange datasett er 8MB sidestørrelsen en god tradeoff, det er sannsynligvis større enn metadatastørrelse + bitstørrelse, og trekker ikke mer data enn du trenger. For å oppnå dette:

h5repack -S PATH -G 8388608 din fil .nc din file_optimert .nc 

Her er verdiene som skal brukes til å få forskjellige sidestørrelser:

4194304 (4MB) 
8388608 (8 MB) 
16777216 (16 MB) 
3354432 (32 MB) 

b. Er det fordeler ved å bruke filer lokalt også?

Papiret og andre ting jeg har funnet, tyder på at selv lokalt kan det være en hastighetsgevinst hvor som helst fra 10%-30%. I mine alt annet enn uttømmende tester fant jeg hastighetsgevinster på rundt 10 % når forespørsler er relativt små i forhold til den generelle filstørrelsen, og hastighetsøkningen reduseres ettersom forespørselen blir større, men jeg fant det aldri å være langsommere.

C. TANSTAAFL

Men det finnes mye fangst et sted, dette virker som en gratis lunsj. Og fangsten er at den faste sidestørrelsen øker størrelsen på filen. I noen tilfeller prøvde jeg:

617M mur1 .nc 
632M mur1_optimert .nc 
608M mur2 .nc 
616M mur2_optimert .nc 
29M chla1 .nc 
40M chla1_optimert .nc 
30M chla2 .nc 
40M chla2_optimert .nc 

Så tradeoff er det en ikke ubetydelig økning i filstørrelse.

d. Men hvis jeg må behandle filene uansett...

Et godt spørsmål er om jeg må skrive et skript for å rebehandle filene, hvorfor ikke bare skrive et skript for å oversette til et format som si zarr? Zarr har mange tilhengere og hvis du er interessert i zarr bare gjøre en rask andduckgo søk og det mange gode innlegg, en kanskje mer balansert utsikt er påhttps://www.youtube.com/watch?v=IEAcCmcOdJs  (Det er interessant at mange av poengene han hever er det ischunk-formatet prøver å adressere) .. Så hvorfor vil du ikke oversette filene dine til noe som zarr, først, hvis du oppretter netcdf-filer regelmessig, kan du begynne å optimalisere filene fra nå av, som over tid vil se hastighet gevinster og du trenger ikke å reformatere tidligere filer, og ERDDAP™ vil fortsatt være i stand til å aggregere over filene selv om noen av de interne innstillingene er forskjellig. For det andre kan du ha mye verktøy som avhenger av netcdf-filer, og denne tilnærmingen ville bety å ikke måtte retool hva som kan være en omfattende mengde kode. Poenget er å være oppmerksom på alternativer og velge hva som fungerer best for din situasjon. Akkurat som en påminnelse, hvis du velger å bruke zarr filer med ERDDAP™ , de må være zarr format v2 filer.

E. Big data - en side

Store data snakkes om mye, men hvor store er dataene som de fleste bruker og hvordan sammenlignes det med funksjonene til moderne bærbare datamaskiner (ja bærbare datamaskiner, ikke servere) .. En interessant take er på:

https://www.youtube.com/watch?v=GELhdezYmP0Start rundt minutt 37 selv om hele samtalen er interessant

Studien han nevner er på:

https://motherduck.com/blog/redshift-files-hunt-for-big-data/

Så det er en relativt liten prosentandel av brukerne som virkelig trenger å veive opp kraften, men det overveldende flertallet av brukerne kan gjøre sine analyser på en bærbar PC, 26TB eksterne stasjoner er nå under $300 og rykter er at 60TB eksterne stasjoner vil være tilgjengelig innen slutten av året. Noe å tenke på.

2. Bruker ERDDAP™ med Google Cloud Platform eller andre skyleverandører i tillegg til AWS
-------------------------------------------------------------------

I øyeblikket ERDDAP™ er kjent bare for å jobbe med AWS-objektbutikker (S3) Selv om de forbedrer og generaliserer ERDDAP™ Støtten for objektbutikk er på Todo-listen (sehttps://github.com/ERDDAP/erddap/issues/158) .. Så hva du skal gjøre hvis du får beskjed om at du må kjøre din ERDDAP™ Google Cloud Platform (GCP) Eller en lignende plattform? For det første tilbyr de fleste skyplattformer forskjellige lagringsnivåer, vanligvis inkludert en som ligner lokal lagring og gjenkjennes av operativsystemet, en som er tilkoblet over nettverket som vanligvis bruker NFS for tilgang (På nytt direkte tilgjengelig av OS) En som er en objektbutikk. Den første løsningen er ikke å bruke objektbutikker, og du vil være god til å gå. Men som alltid, er TANSTAAFL og ulempen i dette tilfellet som du går fra objektbutikk -&gt; NFS-tilgang -&gt; Lokale lagre kostnadene dine går også opp. (Jeg vil legge til at NFS er også tilgjengelig over nettverket, og har sine egne latensproblemer, vil dette også dra nytte av filoptimering) ..

Hvis du må bruke objektbutikken eller bare har råd til en objektbutikk, er svaret et FUSE-filsystem (https://github.com/libfuse/libfuse) .. På GCP kalles dette gcsfuse, og trinnene for å installere det er:

• Installer gcsfuse på GCP Linux-bildet ditt:
sudo apt-oppdatering
sudo apt installer gcsfuse
Autentisk til GCP (Hvis ikke allerede autentisert) :)
Sørg for at du har de riktige legitimasjonene, vanligvis gjennom tjenestekontoen eller ved å kjøre gcloud auth-innlogging.
• Monter GCS bøtte til en lokal katalog:
Monter GCS-bøtte til en lokal katalog ved hjelp av gcsfuse. Dette gjør det mulig for GCP-instansen å få tilgang til dataene som om det var en del av det lokale filsystemet.
gcsfuse din-bucket-name /path/to/mount/directory

Og nå kan du få tilgang til objektbutikken din som den er en del av Linux-filsystemet, så vil fungere med ERDDAP™ .. Dette virker som magi, å få det beste av begge verdener, det må være en fangst. Og det er det. FUSE-filsystemer er litt langsommere enn å få tilgang til objektbutikken direkte (I utgangspunktet har du lagt til et annet lag til tilgangen) .. I min forskning anslår jeg hvor mye langsommere som er over hele kartet, så jeg vet ikke hvor mye langsommere. Men hvis du er i en situasjon der du må kjøre på GCP ved hjelp av objektbutikker, har du en løsning for nå som vil fungere med ERDDAP™ ..

3. Hva du kan gjøre nå for å hjelpe.
—————————————————————

Hvis du har tid og evne til å teste noen av disse tingene og rapportere tilbake på resultatene dine, ville det være bra. Spesielt hvis du har tilgang til GCP eller lignende og se hvor mye langsommere ERDDAP™ Tilgang bruker FUSE (Du kan faktisk også teste dette på AWS) .. Hvis hastighetsstraffen ikke er for stor, ville det være fantastisk, fordi jeg har grunn til å tro at noen vil snart måtte kjøre sin ERDDAP™ på GCP med objektbutikk. Dette er ikke bare et spørsmål om teoretisk interesse.
