Dette indhold er baseret på en [besked fra Roy Mendelssohn til te ERDDAP Brugere gruppe](https://groups.google.com/g/erddap/c/JWoS_y3cygg/m/zCpcNTxNAAAJ) .

1. Optimering af netcdf-filer til skyen
—————————————————————

a. ompakning og sidestørrelse

For nylig i at gøre nogle forskning kom jeg over denne meget interessante artikel:

https://nsidc.github.io/cloud-optimized-icesat2/

Intet synes at inflame lidenskaber som diskussioner af programmeringssprog, redaktører og filformater, og dette er ikke en anbefaling om, hvad format (s s s) du bør bruge, men snarere til at forstå, hvad der er i denne papir og for at se, hvor meget forbedring kan opnås ( ERDDAP™ har altid forsøgt at være engnosticering om en masse af disse spørgsmål, snarere at vælge at prøve og arbejde med, hvordan folk rent faktisk arbejder med data) .

Papiret er primært rettet mod situationer, hvor dataene gemmes i en objekt butik såsom Amazon S3. Objektbutikker er tilgængelige over netværket ved hjælp af http  (s s s) kommandoer, så sammenlignet med opbevaring med en direkte forbindelse til opbevaring (virtuel virtuel virtuel virtuel virtuel) serveren, der er en meget længere ventetid, som anmodningen skal gøre en runde tur. For objektbutikker, du ønsker at foretage så få anmodninger som muligt, men hvis du bare foretager virkelig store anmodninger om at mindske antallet af opkald, kan du få adgang til mere data, end du har brug for, hvilket kan være lige så langsom, hvis ikke mere er så. Så tricket er at opnå en balance mellem disse to faktorer. Og selvom adgang til data på objektbutikker har meget forbedret, så har adgang til direkte vedhæftet opbevaring. I at undersøge dette er nogle skøn:

Lokal Disk:
• • • • Sek tid: 0.1ms
• 6 søger: 0.6ms (negligible) 
• • • • Læse spredte metadata er hurtigt
Cloud HTTP:
• • • • Anmod om ventetid: 100-200ms
• 6 anmodninger: 600-1200ms (meget langsom&#33;) 
• • • • Hver anmodning har netværk rundrejsetid

Den anden ting at forstå er, at netcdf4/hdf5-filer gemmes i bidder og returneres i sider, så den relative størrelse af hver af disse kan virkelig påvirke adgangshastighed, når adgang er fra en objekt butik, og at som standard metadata om filen er spredt i hele filen, så få metadata kan tage flere anmodninger. Det vigtigste punkt i papiret er, at standardsidens størrelse for netcdf4/hdf5 filer er 4096 bytes (4KB) - - - - (som er forfærdeligt for cloud&#33;) Da metadatastørrelsen alene er sandsynligt større end dette og mere end sandsynligt, at dine chunk størrelser er også større end dette. Så et ekstrakt vil kræve en masse runde ture, der er langsom. Hvad du ønsker at gøre er at pakke filen, så alle metadata er på "top" af filen, og at sidestørrelsen er mindst lige så stor som metadatastørrelsen plus størrelsen på en chunk. Også som standard er sidestørrelsen ikke rettet, men bruger en strategi, der varierer. Hvad det papir, der findes, bruger en fast sidestørrelse, der produceres bedre resultater.

Så hvordan kan jeg bestemme filmets størrelse?

> h5stat yourfile.nc | grep "File metadata" # metadata size
>

Og hvordan kan jeg bestemme størrelse:

> h5dump -pH MUR41_file.nc | grep -A3 CHUNKED
>

eller eller eller

> ncdump -sh MUR41_file.nc | grep ChunkSizes
>

Og hvordan kan jeg bestemme sidetilpasningsstrategi:

> h5stat yourfile.nc | grep "File space management strategy"
>

Mest sandsynligt vil denne kommando returnere “H5F_FSPACE_STRATEGY_FSM_AGGR”, som er standard strategien, og hvad vi ønsker det at vende tilbage er “H5F_FSPACE_STRATEGY_PAGE”

Hvordan kan jeg pakke min netcdf-fil, så alle metadata er foran, og ændre strategien, så en fast sidestørrelse bruges, og hvilken sidestørrelse der skal bruges? Regler for tommelfinger, at jeg fandt er:

Sidestørrelsesvalg:
• • • • Skal være ≥ total fil metadata størrelse (kritisk&#33;) 
• • • • Skal være strøm af 2 (4 MB, 8 MB, 16 MB, etc.) 
• • • • Må ikke gå skøre store - 32MB er normalt den praktiske max
• • • • Overvej chunk størrelser - sidestørrelse skal rumme største bidder

Som sagt ovenfor bør størrelsen være større end metadatastørrelsen plus størrelsen på en klump. Hvad undersøgelsen fundet er, at for en masse datasæt den 8MB sidestørrelse er en god tradeoff, er det sandsynligvis større end metadata størrelse + chunk størrelse, og trækker ikke mere data, end du har brug for. For at opnå dette:

h5repack -S PAGE -G 8388608 din fil .nc Din fil_optimized .nc 

Her er værdierne til brug for at få forskellige sidestørrelser:

4194304 (4 MB) 
8388608 (8 MB) 
16777216 (16 MB) 
33554432 (32 MB) 

b. Er der fordele, hvis du bruger filer lokalt også?

Papiret og andre ting jeg har fundet tyder på, at selv lokalt kan der være en hastighedsforøgelse overalt fra 10%-30%. I mit andet, men udtømmende tests fandt jeg hastighedsgevinster på omkring 10%, når forespørgslerne er relativt lille sammenlignet med den samlede filstørrelse, og hastigheden øges, da anmodningen bliver større, men jeg fandt det aldrig at være langsommere.

c. TANSTAAFL

Ah men der er en fangst et sted, dette synes som en gratis frokost. Og fangsten er, at den faste sidestørrelse øger størrelsen af filen. For nogle af de tilfælde, jeg forsøgte:

617M væg1 .nc 
632M væg1_optimized .nc 
608M væg2 .nc 
616M væg2_optimized .nc 
29M chla1 .nc 
40M chla1_optimized .nc 
30M chla2 .nc 
40M chla2_optimized .nc 

Så byttet er der en ikke ubetydelig stigning i filstørrelse.

d. Men hvis jeg skal behandle filerne alligevel......?

Et godt spørgsmål er, hvis jeg skal skrive et script til at behandle filerne, hvorfor ikke bare skrive et script til at oversætte til et format som sige zarr? zarr har mange profeter og hvis du er interesseret i zarr bare gøre en hurtig ænderduckgo søgning, og der er mange gode indlæg, en måske mere afbalanceret udsigt er påhttps://www.youtube.com/watch?v=IEAcCmcOdJs  (Det er interessant, at mange af de punkter, han rejser, er, hvad ischunk format forsøger at løse) . Så hvorfor måske du ikke ønsker at oversætte dine filer til noget som zarr, først, hvis du opretter netcdf-filer regelmæssigt, kan du begynde at optimere filerne fra nu, som over tid vil se hastighed gevinster, og du vil ikke nødt til at omformatere tidligere filer og og ERDDAP™ vil stadig være i stand til at aggregere over filerne, selvom nogle af de interne indstillinger afviger. For det andet, kan du have en masse værktøj, der afhænger af netcdf-filer, og denne tilgang ville betyde, at ikke at skulle retool, hvad kunne være en omfattende kode. Pointen er at være opmærksom på muligheder og vælge, hvad der fungerer bedst for din situation. Bare som påmindelse, hvis du vælger at bruge zarr-filer med ERDDAP™ , de skal være zarr format v2 filer.

e. Store data - en side

Store data er talt om en masse, men hvor stor er de data, som de fleste bruger, og hvordan gør det, der sammenligner med de moderne bærbares kapaciteter (ja bærbare, ikke servere) . En interessant take er på:

https://www.youtube.com/watch?v=GELhdezYmP0Start omkring minut 37, selvom hele talen er interessant

Undersøgelsen, han nævner, er på:

https://motherduck.com/blog/redshift-files-hunt-for-big-data/

Så der er en relativt lille procentdel af brugere, der virkelig har brug for at kreere strømmen, men det overvældende flertal af brugerne kan gøre deres analyser på en bærbar computer, 26TB eksterne drev er nu under $300 og rygter er, at 60TB eksterne drev vil være tilgængelige ved udgangen af året. Noget at tænke på.

2. Brug af brug ERDDAP™ med Google Cloud Platform eller andre cloududbydere udover AWS
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

I øjeblikket ERDDAP™ er kun kendt for at arbejde med AWS objektbutikker (S3) , selvom du forbedrer og generaliserer ERDDAP™ ’s objekt butik support er på todo-listen (Se sehttps://github.com/ERDDAP/erddap/issues/158) . Så hvad du skal gøre, hvis du får besked, skal du køre din ERDDAP™ på Google Cloud Platform (GCP) eller en lignende platform? Først tilbyder de fleste cloud-platforme forskellige lagerniveauer, normalt herunder en, der ligner lokal opbevaring og er anerkendt af operativsystemet, en, der er forbundet over netværket normalt ved hjælp af NFS for adgang (igen direkte tilgængelig af OS) , og en, der er en objekt butik. Den første løsning er ikke at bruge objektbutikker, og du ville være god til at gå. Men som altid, TANSTAAFL og ulempen i dette tilfælde er som du går fra objekt butik -&gt; NFS adgang -&gt; lokal butik dine omkostninger også gå op. (Jeg vil tilføje, at NFS også er tilgået over netværket, og har sine egne latens problemer, dette vil også gavn af fil optimering) .

Hvis du skal bruge objekt butik, eller kun har råd til en objekt butik, svaret er et FUSE-filsystem (https://github.com/libfuse/libfuse) . På GCP kaldes dette gcsfuse, og trinnene til at installere det er:

• Installer gcsfuse på dit GCP Linux-billede:
sudo apt opdatering
sudo apt installation gcsfuse
• Autentisk til GCP (hvis ikke allerede godkendt) :
Sørg for, at du har de rigtige legitimationsoplysninger, typisk via servicekontoen eller ved at køre gCloud auth login.
• • • • Montering af GCS skovl til en lokal mappe:
Montering af din GCS spand til en lokal mappe ved hjælp af gcsfuse. Dette gør det muligt for din GCP-instans at få adgang til de data, som om det var en del af det lokale filsystem.
gcsfuse dit-bucket-name /path/to/mount/directory

Og nu kan din objekt butik tilgås som det er en del af Linux filsystem, så vil arbejde med med ERDDAP™ . Dette synes som magi, at få det bedste af begge verdener, skal der være en fangst. Og der er. FUSE filsystemer er en god smule langsommere end at få adgang til objektbutikken direkte (Dybest set har du tilføjet et andet lag til adgangen) . I min forskning skøn over hvor meget langsommere er over kortet, så jeg har ingen idé om, hvor meget langsommere. Men hvis du er i en situation, hvor du skal køre på GCP ved hjælp af objektbutikker, har du en løsning til nu, der vil arbejde med ERDDAP™ .

3. Hvad du kan gøre nu for at hjælpe.
————————————————————————————

Hvis du har tid og evne til at teste nogle af disse ting og rapportere tilbage på dine resultater, det ville være fantastisk. Især hvis du har adgang til GCP eller lignende og se, hvor meget langsommere ERDDAP™ adgang er ved hjælp af FUSE (faktisk kan du teste dette på AWS også) . Hvis hastighedsgrænsen ikke er for stor, det ville være vidunderligt, fordi jeg har grund til at tro nogle vil snart nødt til at køre deres ERDDAP™ s på GCP med objekt butik. så dette er ikke bare et spørgsmål om teoretisk interesse.
