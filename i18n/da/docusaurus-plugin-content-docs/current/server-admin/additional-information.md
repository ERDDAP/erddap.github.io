ERDDAP™- Opsæt din egenERDDAP™    

## Ting du har brug for at vide{#things-you-need-to-know} 
     
###    **[Proxy fejl](#proxy-errors)**  {#proxy-errors} 
Nogle gange, en anmodning omERDDAP™vil returnere en Proxy Fejl, en HTTP 502 Bad Gateway Fejl, eller en lignende fejl. Disse fejl bliver kastet af Apache eller Tomcat, ikkeERDDAP™selv.
* Hvis hver anmodning genererer disse fejl, især når du først opretter din anmodningERDDAP™, så er det sandsynligvis en proxy eller dårlig gateway fejl, og løsningen er sandsynligvis at fastsætte[ERDDAP's proxy indstillinger](/docs/server-admin/deploy-install#proxypass). Dette kan også være problemet, når et etableretERDDAP™pludselig begynder at smide disse fejl for hver anmodning.
* Ellers, "proxy" fejl er normalt tidspunkt ud fejl smidt af Apache eller Tomcat. Selv når de sker relativt hurtigt, er det en slags svar fra Apache eller Tomcat, der opstår, når de sker,ERDDAP™er meget optaget, hukommelsesbegrænset, eller begrænset af nogle andre ressourcer. I disse tilfælde, se råd nedenfor for at beskæftige sig med[ERDDAP™reagerer langsomt](#responding-slowly).
        
Anmodninger i lang tidsinterval (&gt;30 point) fra et netded datasæt er tilbøjelig til at time ud af fejl, som ofte vises som Proxy fejl, fordi det tager betydelig tid for at opnå en betydelig tidERDDAP™for at åbne alle datafiler en-by-one. HvisERDDAP™er ellers optaget under anmodning, problemet er mere sandsynligt at forekomme. Hvis datasættets filer er komprimeret, er problemet mere sandsynligt at forekomme, selvom det er svært for en bruger at afgøre, om et datasæts filer er komprimeret.
Løsningen er at lave flere anmodninger, hver med et mindre tidsinterval. Hvor lille af et tidsinterval? Jeg foreslår at begynde virkelig lille (~30 tid point?) , så (ca. ca.) dobbelt tidsintervallet, indtil anmodningen fejler, så gå tilbage en doubling. Så foretage alle anmodninger (hver for et andet stykke tid) nødvendige for at få alle data.
An An An An AnERDDAP™Administrator kan mindske dette problem ved at øge problemet[Apache tidsindstillinger](/docs/server-admin/deploy-install#apache-timeout).
        
### Overvågning af overvågning{#monitoring} 
Vi ønsker alle vores datatjenester til at finde deres publikum og blive grundigt brugt, men nogle gange dinERDDAP™kan bruges for meget, hvilket forårsager problemer, herunder super langsomme reaktioner for alle anmodninger. Vores plan for at undgå problemer er:

* Skærm skærmERDDAP™via via[Status.html side](#status-page).
Det har tonsvis af nyttige oplysninger. Hvis du ser, at et stort antal anmodninger kommer i, eller tonsvis af hukommelse, der bruges, eller tonsvis af mislykkede anmodninger, eller hver Major LoadDatasets tager lang tid, eller se alle tegn på ting, der går ned og reagerer langsomt, så kig påERDDAP's[log.txt-fil](#log)for at se, hvad der foregår.
    
Det er også nyttigt at blot bemærke, hvor hurtigt statussiden reagerer. Hvis det reagerer langsomt, er det en vigtig indikator, derERDDAP™er meget optaget.
    
* Skærm skærmERDDAP™via via[Daglig rapport](#daily-report)email.
     
* Se efter opdaterede datasæt via *baseUrl* /erddap/outOfDateDatasets.htmlwebside, der er baseret på den valgfrie[testOutOfDate](/docs/server-admin/datasets#testoutofdate)global egenskab.
     
#### Eksterne skærme{#external-monitors} 
Metoderne ovenfor erERDDAP's måder at overvåge sig selv. Det er også muligt at gøre eller bruge eksterne systemer til at overvåge dinERDDAP. Et projekt til at gøre dette er[Axiom's erddap-metrics projekt](https://github.com/axiom-data-science/erddap-metrics). Sådanne eksterne systemer har nogle fordele:
* De kan tilpasses til at give de oplysninger, du ønsker, vises på den måde, du ønsker.
* De kan indeholde oplysninger omERDDAP™den, derERDDAP™kan ikke få adgang til nemt eller på alle (f.eks. CPU-forbrug, diskplads,ERDDAP™responstid som set fra brugerens perspektiv,ERDDAP™oppetid,
* De kan give advarsler (e-mails, telefonopkald, tekster) til administratorer, når problemer overstiger nogle tærskel.
             
### Flere Simultane Anmodninger{#multiple-simultaneous-requests} 
*    **Blacklist brugere gør flere samtidige anmodninger&#33;** 
Hvis det er klart, at nogle bruger gør mere end én samtidig anmodning, gentagne gange og kontinuerligt, skal du tilføje deres IP-adresse tilERDDAP[]&lt;Anmod om Blacklist&gt;] (/docs/server-admin/datasets#requestblacklist) i din indbakkedatasets.xmlfil. Nogle gange er anmodningerne alle fra én IP-adresse. Nogle gange er de fra flere IP-adresser, men tydeligt den samme bruger. Du kan også blacklist folk gør tonsvis af ugyldige anmodninger eller tonsvis af mind-numbingly ineffektive anmodninger.
    
Så for hver anmodning de laver,ERDDAP™afkast:
    
    > HTTP ERROR 403 - Access Forbidden --  
    > Your IP address is on this ERDDAP's request blacklist.  
    > Did you often submit more than one request at a time?  
    > Did you often submit identical requests in a short period of time?  
    > Did you submit a large number of invalid requests?  
    > If you are ready to avoid these problems, please email \\[ERDDAP™ administrator's email address\\] to request to be taken off of the blacklist.
    
Forhåbentlig vil brugeren se denne besked og kontakte dig for at finde ud af, hvordan man løser problemet og får af blacklist. Nogle gange skal de bare skifte IP-adresser og prøve igen.
    
Det er ligesom balancen mellem offensive og defensive våben i krig. Her, de defensive våben (ERDDAP) har en fast kapacitet, begrænset af antallet af kerner i CPU, diskadgangsbredden og netværksbredden. Men de offensive våben (brugere, især scripts) har ubegrænset kapacitet:
    
    * En enkelt anmodning om data fra en masse tid point kan forårsageERDDAPfor at åbne et stort antal filer (i rækkefølge eller delvist multi-threaded) . I ekstreme tilfælde kan en "simple" anmodning nemt binde RAID fastgjort tilERDDAP™i et minut blokerer effektivt håndteringen af andre anmodninger.
         
    * En enkelt anmodning kan forbruge en stor mængde hukommelse (selvom selvomERDDAP™er kodet for at minimere den hukommelse, der er nødvendig for at håndtere store anmodninger) .
         
    * Parallelisering - - - -
Det er nemt for en klog bruger at parallelisere en stor opgave ved at generere masser af tråde, hver især sender en separat anmodning (som kan være stor eller lille) . Denne adfærd tilskyndes af computervidenskabssamfundet som en effektiv måde at håndtere et stort problem (og parallelisering er effektiv i andre forhold) . Tag tilbage til krigen analogi: Brugere kan gøre et stort ubegrænset antal samtidige anmodninger med omkostningerne ved hvert enkelt væsen stort set nul, men omkostningerne ved hver anmodning kommer ind iERDDAP™kan være stor ogERDDAP's reaktionsevne er begrænset. klart, klart,ERDDAP™vil miste denne kamp, medmindreERDDAP™administrator blacklists brugere, der foretager flere samtidige anmodninger, som er urimeligt at crowding andre brugere.
         
    * Flere scripts -
Tænk nu på, hvad der sker, når der er flere smarte brugere, hver kører parallelle scripts. Hvis en bruger kan generere så mange anmodninger, at andre brugere er overfyldt ud, så kan flere sådanne brugere generere så mange anmodninger, somERDDAP™bliver overvældet og tilsyneladende uansvarlig. Det er effektivt en[DDOS angreb](https://en.wikipedia.org/wiki/Denial-of-service_attack)Igen, det eneste forsvar forERDDAP™er til blacklist-brugere, der gør flere samtidige anmodninger, der er urimeligt crowding ud andre brugere.
         
    * Oppustede forventninger -
I denne verden af massive tekniske virksomheder (Amazon, Google, Facebook,...) , brugerne er kommet til at forvente væsentlige ubegrænsede kapaciteter fra udbydere. Da disse virksomheder tjener aktiviteter, har de flere brugere, desto flere indtægter, de skal udvide deres IT-infrastruktur. Så de har råd til en massiv IT-infrastruktur til at håndtere anmodninger. Og de begrænser klogt antallet af anmodninger og omkostninger ved hver anmodning fra brugere ved at begrænse de anmodninger, som brugerne kan gøre, så ingen anmodning er byrdefuld, og der er aldrig en grund til (eller en måde) for brugere at foretage flere samtidige anmodninger. Så disse store tekniske virksomheder kan have langt flere brugere endERDDAP™, men de har enormt flere ressourcer og smarte måder at begrænse anmodninger fra hver bruger. Det er en overskuelig situation for de store IT-virksomheder (og de bliver rige&#33;) men ikke forERDDAP™installationer. Igen, det eneste forsvar forERDDAP™er til blacklist-brugere, der gør flere samtidige anmodninger, der er urimeligt crowding ud andre brugere.
         
    
Så brugere: Foretag ikke flere samtidige anmodninger, eller du vil blive sortlistet&#33;
     

Det er klart bedst, hvis din server har en masse kerner, en masse hukommelse (så du kan allokere en masse hukommelse tilERDDAP™, mere end det nogensinde har brug for) , og en høj båndbredde internetforbindelse. Så hukommelsen er sjældent eller aldrig en begrænsning faktor, men netværksbredden bliver den mere almindelige begrænsende faktor. Dybest set, da der er flere og flere samtidige anmodninger, hastigheden til enhver given bruger falder. Det bremser naturligvis antallet af anmodninger, der kommer i, hvis hver bruger kun sender en anmodning ad gangen.
    
### ERDDAP™At få data fra THREDDS{#erddap-getting-data-from-thredds} 
Hvis du vilERDDAP™Få nogle af dens data fra en THREDDS på dit websted, er der nogle fordele for at gøre en kopi af THREDDS data filer (mindst for de mest populære datasæt) på en anden RAID, derERDDAP™har adgang til, såERDDAP™kan tjene data fra filerne direkte. At tage påERD, vi gør det for vores mest populære datasæt.

*   ERDDAP™kan få data direkte og ikke skal vente på, at THREDDS kan indlæse datasættet eller...
*   ERDDAP™kan se og inkorporere nye datafiler med det samme, så det behøver ikke at Pester THREDDS ofte at se, om datasættet har ændret sig. Se [&lt;OpdaterEveryNMillis&gt;] (/docs/server-admin/datasets#updateeverynmillis) .
* belastningen er delt mellem 2 RAIDS og 2 servere, i stedet for, at anmodningen er hård på begge siderERDDAP™og EDTH.
* Du undgår forkert problem forårsaget af THREDDS med en lille (som standard) maksimal anmodningsstørrelse.ERDDAP™har et system til at håndtere forkert kamp, men undgå problemet er bedre.
* Du har en sikkerhedskopi af de data, der altid er en god ide.

I alle tilfælde, behøver du ikke nogensinde køre THREDDS ogERDDAP™i samme Tomcat. Kør dem i separate Tomcats, eller bedre, på separate servere.

Vi finder, at THREDDS regelmæssigt bliver i en tilstand, hvor anmodninger bare hænger. Hvis du vilERDDAP™bliver data fra en THREDDS og THREDDS i denne tilstand,ERDDAP™har et forsvar (Det siger, at THRDS-baseret datasæt ikke er tilgængelig) , men det er stadig besværlig forERDDAP™fordiERDDAP™skal vente, indtil tiden hver gang det forsøger at indlæse et datasæt fra en hængt THREDDS. Nogle grupper (herunderERD) undgå dette ved proaktivt at genstarte THREDDS ofte (f.eks. Priserne på et cron job) .

### At reagere langsomt{#responding-slowly} 
*    **HvisERDDAP™Svarer langsomt** eller hvis blot visse anmodninger reagerer langsomt,
Du kan muligvis finde ud af, om forsinkelsen er rimelig og midlertidig (f.eks. på grund af mange anmodninger fra scripts ellerWMSbrugere) , eller hvis noget er uforudsigeligt forkert, og du er nødt til at[Luk og genstart Tomcat ogERDDAP™](#shut-down-and-restart).
    
HvisERDDAP™reagerer langsomt, se råd nedenfor for at afgøre årsagen, som forhåbentlig vil give dig mulighed for at løse problemet.
Du kan have et bestemt startpunkt (f.eks. en specifik anmodningsadresse) eller et vryg udgangspunkt (fx,ERDDAP™er langsom) .
Du kan kende brugeren (f.eks. fordi de e-mailede dig) eller ej.
Du kan have andre spor eller ej.
Da alle disse situationer og alle de mulige årsager til problemerne slører sammen, forsøger rådne nedenfor at håndtere alle mulige startpunkter og alle mulige problemer relateret til langsomme reaktioner.
    
    *    **Kig efter spor i[ERDDAP's logfil](#log)**   ( *bigParentDirectory* /logs/log.txt) .
        \\[Ved sjældne lejligheder, er der spor i[Tomcat's logfil](#tomcat-logs)  ( *Tomcat* /logs/catalina.out) .\\]  
Kig efter fejlmeddelelser.
Kig efter et stort antal anmodninger, der kommer fra én (eller et par) Brugere og måske hogging en masse af din servers ressourcer (hukommelse, CPU tid, disk adgang, internet båndbredde) .
        
Hvis problemet er bundet til **en bruger** , du kan ofte få en anelse om, hvem brugeren er via webtjenester som[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)der kan give dig oplysninger relateret til brugerens IP-adresse (som du kan finde iERDDAP's[log.txt](#log)filfil) .
        
        * Hvis brugeren synes at være en **bot** At dyrke dårligt (Især en søgemaskine forsøger at udfylde søgemaskinenERDDAP™former med hver mulig permutation af indgangsværdier) Sørg for, at du har konfigureret din servers korrekt[robotter.txt](#robotstxt)fil.
        * Hvis brugeren synes at være en **script script script (s s s) ** der gør flere samtidige anmodninger, kontakt brugeren, forklare, at dinERDDAP™har begrænsede ressourcer (f.eks. hukommelse, CPU-tid, diskadgang, internet båndbredde) , og bede dem om at overveje andre brugere og bare foretage en anmodning ad gangen. Du kan også nævne, at du vil blacklist dem, hvis de ikke vender tilbage.
        * Hvis brugeren synes at være en **script script script** at foretage et stort antal tidskrævende anmodninger, bede brugeren om at overveje andre brugere ved at sætte en lille pause (2 sekunder?) i scriptet mellem anmodninger.
        *    **WMSklient software** kan være meget krævende. En klient vil ofte bede om 6 brugerdefinerede billeder på et tidspunkt. Hvis brugeren synes at være enWMSklient, der foretager legitime anmodninger, kan du:
            * Ignorer det. (anbefalet, fordi de vil flytte på temmelig hurtigt) 
            * Sluk din serversWMSservice viaERDDAP's setup.html fil. (Ikke anbefalet) 
        * Hvis anmodninger synes **dum, sindssyg, overdreven eller skadelig,** eller hvis du ikke kan løse problemet nogen anden måde, skal du overveje midlertidigt eller permanent tilføje brugerens IP-adresse til [&lt;Anmod om Blacklist&gt; i dindatasets.xmlfil] (/docs/server-admin/datasets#requestblacklist) .
             
    *    **Prøv at duplikere problemet selv, fra din computer.**   
Hvis problemet er med et datasæt eller alle datasæt, for en bruger eller alle brugere, for blot visse typer anmodninger osv.
Hvis du kan duplikere problemet, skal du prøve at indsnævre problemet.
Hvis du ikke kan duplikere problemet, kan problemet være bundet til brugerens computer, brugerens internetforbindelse eller din institutions internetforbindelse.
         
    * Hvis bare **En datasæt** reagerer langsomt (måske kun for **en anmodningstype** fra én bruger) , problemet kan være:
        *   ERDDAP's adgang til datasættet's kildedata (Især fra relationelle databaser, Cassandra og fjerndatasæt) kan være midlertidigt eller permanent langsom. Prøv at kontrollere kildens hastighed uafhængigt afERDDAP. Hvis det er langsom, måske kan du forbedre det.
        * Er problemet relateret til den specifikke anmodning eller generel anmodningstype?
Jo større den ønskede del af et datasæt, desto mere sandsynligt vil anmodningen mislykkes. Hvis brugeren foretager enorme anmodninger, skal du spørge brugeren til at foretage mindre anmodninger, der er mere tilbøjelige til at få et hurtigt og vellykket svar.
            
Næsten alle datasæt er bedre til håndtering af nogle typer anmodninger end andre typer anmodninger. For eksempel, når et datasæt gemmer forskellige tidsbidder i forskellige filer, anmodninger om data fra et stort antal tidspunkter kan være meget langsom. Hvis de aktuelle anmodninger er af en vanskelig type, skal du overveje at tilbyde en variant af det datasæt, der er optimeret til disse anmodninger. Eller bare forklare for brugeren, at den type anmodning er vanskelig og tidskrævende, og bede om deres tålmodighed.
            
        * Datasættet kan ikke konfigureres optimalt. Du kan muligvis foretage ændringer i datasættets datasætdatasets.xmlbidder til at hjælpeERDDAP™håndtere datasættet bedre. For eksempel,
            
            *   EDDGridFraNcFiles-datasæt, der får adgang til data fra komprimeret nc4/hdf5-filer, er langsom, når de får data til hele det geografiske område (f.eks. for et verdenskort) fordi hele filen skal undertrykkes. Du kan konvertere filerne til ukomprimerede filer, men så vil diskrummets krav være meget, meget større. Det er sandsynligvis bedre at bare acceptere, at sådanne datasæt vil være langsom under visse omstændigheder.
            * Konfiguration af [&lt;subsetVariables&gt;] (/docs/server-admin/datasæt #subsetvariables) tag har en enorm indflydelse på, hvordanERDDAP™håndterer EDDTable datasæt.
            * Du kan være i stand til at øge[hastighed af en EDDTableFraDatabase](/docs/server-admin/datasets#database-speed)Datasæt.
            * Mange EDDTable datasæt kan blive spækket med[lagring af en kopi af dataene iNetCDFContiguous Ragged Array filer](/docs/server-admin/datasets#eddtablefromfiles), somERDDAP™kan læse meget hurtigt.
            
Hvis du vil hjælpe med at fremskynde et bestemt datasæt, skal du inkludere en beskrivelse af problemet og datasættets klump afdatasets.xmlog se vores[sektion om at få ekstra støtte](/docs/intro#support).
             
    * Hvis **alt alt alt** i in in in inERDDAP™er det er **altid altid altid** langsom, problemet kan være:
        * Den computer, der kørerERDDAP™kan ikke have nok hukommelse eller forarbejdning magt. Det er godt at køreERDDAP™på en moderne, multi-core server. Til tung brug skal serveren have et 64-bit operativsystem og 8 GB eller mere hukommelse.
        * Den computer, der kørerERDDAP™kan også køre andre applikationer, der spiser masser af systemressourcer. Hvis det er tilfældet, kan du få en dedikeret server tilERDDAP? For eksempel (Dette er ikke en godkendelse) , kan du få en quad-core Mac Mini Server med 8 GB hukommelse for ~ $100.
             
    * Hvis **alt alt alt** i in in in inERDDAP™er det er **midlertidigt eller permanent** langsom, se dinERDDAP's[ **/erddap/status.htmlsideside** ](#status-page)I din browser.
        * Gøre detERDDAP™Statusside undlader at indlæse?
Hvis ja,[genstartERDDAP™](#shut-down-and-restart).
        * Modtog duERDDAP™Statusside belastning langsomt (f.eks. &gt;5 sekunder) ?
Det er et tegn på, at alt iERDDAP™kører langsomt, men det er ikke nødvendigvis besvær.ERDDAP™Måske bare være virkelig optaget.
        * Søgeresultat for "Response Failed Time (siden sidste store LoadDatasets) ", er n= et stort antal?
Det indikerer, at der har været masser af mislykkede anmodninger for nylig. Det kan være besvær eller starten af problemer. Den medianske tid for fiaskoerne er ofte stor (fx 210000 ms) ,
hvilket betyder, at der var (er?) masser af aktive tråde.
som var at binde masser af ressourcer (som hukommelse, åbne filer, åbne stik,...) ,
som ikke er godt.
        * Søgeresultat for "Response Succeed Time (siden sidste store LoadDatasets) ", er n= et stort antal?
Det indikerer, at der har været mange vellykkede anmodninger for nylig. Dette er ikke besvær. Det betyder bare dinERDDAP™bliver tung brug.
        * Er "Antal af ikke-Tomcat-waiting tråde" dobbelt en typisk værdi?
Dette er ofte alvorlige problemer, der vil forårsageERDDAP™at bremse og til sidst fryse. Hvis dette fortsætter i timevis, kan du være proaktivt[genstartERDDAP™](#shut-down-and-restart).
        * I bunden af listen "Memory Use Resumé" er den sidste "Memory: i øjeblikket ved hjælp af" værdi meget højt?
Det kan bare angive høj brug, eller det kan være et tegn på problemer.
        * Kig på listen over tråde og deres status. Er et usædvanligt antal af dem, der gør noget usædvanligt?
             
    * Is **din institutions internetforbindelse** i øjeblikket langsom?
Søg internettet for "Internet speed test" og brug en af de gratis online tests, såsom[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Hvis din institutions internetforbindelse er langsom, så forbindelser mellemERDDAP™og fjerndatakilder vil være langsom, og forbindelser mellemERDDAP™og brugeren vil være langsom. Nogle gange kan du løse dette ved at stoppe unødvendige internet brug (f.eks. ser folk streaming videoer eller på videokonferenceopkald) .
         
    * Is **brugerens internetforbindelse** i øjeblikket langsom?
Har brugeren søg på internettet for "Internet speed test" og brug en af de gratis online tests, såsom[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Hvis brugerens internetforbindelse er langsom, bremser den deres adgang tilERDDAP. Nogle gange kan de løse dette ved at stoppe unødvendig brug på deres institution (f.eks. ser folk streaming videoer eller på videokonferenceopkald) .
         
    *    **Stuck?**   
Se vores udvalg[sektion om at få ekstra støtte](/docs/intro#support).

### Luk ned og genstart{#shut-down-and-restart} 
*    **Sådan lukkes du ned og genstart Tomcat ogERDDAP™**   
Du behøver ikke at lukke og genstarte Tomcat ogERDDAPhvisERDDAP™er midlertidigt langsom, langsom af nogen kendt grund (som masser af anmodninger fra scripts ellerWMSbrugere) , eller for at anvende ændringer tildatasets.xmlfil.
    
Du behøver at lukke og genstarte Tomcat ogERDDAP™hvis du har brug for at anvende ændringer i setup.xml-filen, eller hvis du har brug forERDDAP™fryser, hænger eller låser op. Under ekstreme omstændigheder,Javakan fryse i et minut eller to, mens det gør en fuld affaldsopsamling, men derefter genvinde. Så det er godt at vente et minut eller to at se omJava/ / / /ERDDAP™er virkelig frosset, eller hvis det bare gør en lang affalds samling. (Hvis affaldsopsamling er et fælles problem,[afsætte mere hukommelse til Tomcat](/docs/server-admin/deploy-install#memory).) 
    
Jeg anbefaler ikke at bruge Tomcat Web Application Manager til at starte eller lukke Tomcat. Hvis du ikke er helt lukket og starter Tomcat, før eller senere vil du have PermGen hukommelse problemer.
    
At lukke og genstarte Tomcat ogERDDAP:
    
    * Hvis du bruger Linux eller en Mac:
         (Hvis du har oprettet en speciel bruger til at køre Tomcat, f.eks. tomcat, skal du huske at gøre følgende trin som brugeren.)   
         
        1. Brug cd *Tomcat* /bin
             
        2. Brug ps -ef|grep tomcat for at finde java/tomcat proces ID (Forhåbentlig vil bare én proces blive opført) , som vi kalder *I nærheden af javaProcessID* nedenfor.
             
        3. HvisERDDAP™er frosset/hung/låset op, brug dræbe -3 *I nærheden af javaProcessID* at fortælleJava  (som kører Tomcat) at gøre en gevind dump til Tomcat logfil: *Tomcat* /logs/catalina.out . Når du genstarter, kan du diagnosticere problemet ved at finde tråden dump information (og andre nyttige oplysninger ovenfor) i in in in in *Tomcat* /logs/catalina.out og også ved at læse relevante dele af[ERDDAP™log arkiv](#log). Hvis du vil, kan du inkludere disse oplysninger og se vores[sektion om at få ekstra støtte](/docs/intro#support).
             
        4. Brug ./shutdown. sh sh
             
        5. Brug ps -ef|Sværme tomcat gentagne gange, indtil java/tomcat-processen ikke er opført.
            
Nogle gange vil java/tomcat-processen tage op til to minutter for fuldt lukket. Årsagen er:ERDDAP™sender en besked til sine baggrundstråde for at fortælle dem at stoppe, men nogle gange tager det disse tråde lang tid at komme til et godt stop sted.
            
        6. Hvis java/tomcat efter et minut eller så ikke stopper af sig selv, kan du bruge
drab -9 *I nærheden af javaProcessID*   
at tvinge java/tomcat-processen til at stoppe med det samme. Hvis det er muligt, skal du kun bruge dette som et sidste feriested. -9 switch er kraftfuld, men det kan forårsage forskellige problemer.
             
        7. Sådan genstartesERDDAP™, brug ./startup.sh
             
        8. Udsigt til udsigtERDDAP™I din browser for at kontrollere, at genstarten lykkedes. (Nogle gange skal du vente 30 sekunder og prøve at indlæseERDDAP™igen i din browser for det at lykkes.)   
             
    * Hvis du bruger Windows:
         
        1. Brug cd *Tomcat* /bin
             
        2. Brugshutdown.bat  
             
        3. Du vil muligvis gerne bruge Windows Task Manager (tilgængelig via Ctrl Alt Del) for at sikre, atJava/Tomcat /ERDDAP™proces/application er helt stoppet.
Nogle gange vil processen/applikationen tage op til to minutter at lukke ned. Årsagen er:ERDDAP™sender en besked til sine baggrundstråde for at fortælle dem at stoppe, men nogle gange tager det disse tråde lang tid at komme til et godt stop sted.
             
        4. Sådan genstartesERDDAP™, brug af opstart.bat
             
        5. Udsigt til udsigtERDDAP™I din browser for at kontrollere, at genstarten lykkedes. (Nogle gange skal du vente 30 sekunder og prøve at indlæseERDDAP™igen i din browser for det at lykkes.)   
             
### Hyppige Crashs eller Fryser{#frequent-crashes-or-freezes} 
HvisERDDAP™bliver langsom, nedbrud eller fryser, noget er forkert. Kig ind i[ERDDAP's logfil](#log)at forsøge at finde ud af årsagen. Hvis du ikke kan, kan du inkludere detaljerne og se vores[sektion om at få ekstra støtte](/docs/intro#support).

Det mest almindelige problem er en besværlig bruger, der kører flere scripts på én gang og/eller nogen, der foretager et stort antal ugyldige anmodninger. Hvis dette sker, skal du sandsynligvis blacklist, som bruger. Når en blacklistet bruger gør en anmodning, opfordrer fejlmeddelelsen i svaret dem til at sende dig en e-mail til at arbejde ud af problemerne. Så kan du opfordre dem til at køre blot et script på et tidspunkt og til at løse problemerne i deres script (f.eks. anmode om data fra et fjerndatasæt, der ikke kan svare før timingen ud) . Se [&lt;Anmod om Blacklist&gt; i dindatasets.xmlfil] (/docs/server-admin/datasets#requestblacklist) .

Under ekstreme omstændigheder,Javakan fryse i et minut eller to, mens det gør en fuld affaldsopsamling, men derefter genvinde. Så det er godt at vente et minut eller to at se omJava/ / / /ERDDAP™er virkelig frosset, eller hvis det bare gør en lang affalds samling. (Hvis affaldsopsamling er et fælles problem,[afsætte mere hukommelse til Tomcat](/docs/server-admin/deploy-install#memory).) 

HvisERDDAP™bliver langsom eller fryser, og problemet er ikke en besværlig bruger eller en lang affalds samling, kan du normalt løse problemet ved[genstartERDDAP™](#shut-down-and-restart). Min oplevelse er, atERDDAP™kan køre i måneder uden at skulle bruge en genstart.
     

### Skærm skærm{#monitor} 
Du kan overvåge dinERDDAP's status ved at kigge på[/erddap/status.htmlsideside](#status-page)Især statistikken i topsektionen. HvisERDDAP™bliver langsom eller fryser, og problemet er ikke bare ekstremt tung brug, kan du normalt løse problemet ved[genstartERDDAP™](#shut-down-and-restart). Der er yderligere målinger tilgængelige via Prometheus integration på /erddap/metrics.

Min oplevelse er, atERDDAP™kan køre i måneder uden at skulle bruge en genstart. Du bør kun genstarte det, hvis du ønsker at anvende nogle ændringer, du har foretaget forERDDAP's setup.xml eller når du har brug for at installere nye versioner afERDDAP™,Java, Tomcat eller operativsystemet. Hvis du har brug for at genstarteERDDAP™Ofte, noget er forkert. Kig ind i[ERDDAP's logfil](#log)at forsøge at finde ud af årsagen. Hvis du ikke kan, kan du inkludere detaljerne og se vores[sektion om at få ekstra støtte](/docs/intro#support). Som midlertidig løsning kan du prøve at bruge[Monit](https://mmonit.com/monit/)til at overvåge dinERDDAP™og genstart det, hvis det er nødvendigt. Eller kan du lave et cron job for at genstarteERDDAP™  (proaktivt proaktivt) periodisk. Det kan være lidt udfordrende at skrive et script til at automatisere overvågning og genstartERDDAP. Nogle tips, der kan hjælpe:

* Du kan forenkle testen, hvis Tomcat-processen stadig kører ved at bruge -c-kontakten med grep:
Ps -u *Tomcat Bruger Bruger Bruger Bruger Bruger Bruger Bruger*  |grep -c java
Det vil reducere output til "1" hvis tomcat proces stadig er i live, eller "0" hvis processen er stoppet.
     
* Hvis du er god med gawk, kan du udtrække procesID fra resultaterne af
Ps -u *Tomcat Bruger Bruger Bruger Bruger Bruger Bruger Bruger*  |grep java, og brug procesID i andre linjer af scriptet.
     

Hvis du opretter Monit eller et cron job, vil det være fantastisk, hvis du kunne dele detaljerne, så andre kunne nyde vores[sektion om at få ekstra støtte](/docs/intro#support)for hvor du kan dele.

#### Permgen{#permgen} 
Hvis du gentagne gange bruger Tomcat Manager til Reload (eller stop og start)  ERDDAP™,ERDDAP™Kan ikke starte op og kaste java.lang. Fejl: PermGen. Løsningen er at periodisk (eller hver gang?)  [lukket ned og genstart tomcat ogERDDAP™](#shut-down-and-restart), i stedet for bare at indlæseERDDAP.
\\[Opdater: Dette problem var stærkt minimeret eller rettet iERDDAP™version 1.24.\\]  
     
#### Log ind{#log} 
*    **[log.txt](#log)**   
HvisERDDAP™starter ikke, eller hvis noget ikke fungerer som forventet, er det meget nyttigt at se på fejlen og diagnostiske meddelelser i fejlen og diagnosticeringsmeddelelserERDDAP™logfil.
    * Logfilen er *bigParentDirectory* /logs/log.txt
         ( *bigParentDirectory* er angivet i[opsætning.xml](/docs/server-admin/deploy-install#setupxml)) . Hvis der ikke er log. txt-fil eller hvis loget. txt-filen er ikke blevet opdateret, da du genstartedeERDDAP™, se på den[Tomcat Log filer](#tomcat-logs)for at se, om der er en fejlmeddelelse der.
    * Typer af diagnostiske meddelelser i logfilen:
        * Ordet "error" bruges, når noget gik så galt, at proceduren mislykkedes at fuldføre. Selvom det er irriterende at få en fejl, de fejlkræfter, du kan håndtere problemet. Vores tænkning er, at det er bedre at smide en fejl, end at haveERDDAP™komfurer sammen, arbejde på en måde, du ikke forventede.
        * Ordet "krig" bruges, når noget gik galt, men proceduren var i stand til at blive afsluttet. Disse er temmelig sjældne.
        * Alt andet er bare en informativ besked. Du kan kontrollere, hvor mange oplysninger der er logget ind&lt;LogLevel&gt;] (/docs/server-admin/datasæt#logniveau)  datasets.xml.
        * Dataset reloads og brugerreaktioner, der tager &gt;10 sekunder for at afslutte (succes eller mislykkedes) er markeret med " (&gt;10s&#33;) ". Således kan du søge log.txt-filen for denne sætning for at finde de datasæt, der var langsom til at indlæse eller anmodningsnummeret af de anmodninger, der var langsom til slut. Du kan derefter se højere i log.txt-filen for at se, hvad datasættet problem var, eller hvad brugerens anmodning var, og hvem det var fra. Disse langsomme datasæt belastninger og brugeranmodninger er nogle gange skattende påERDDAP. Så vel vidende mere om disse anmodninger kan hjælpe dig med at identificere og løse problemer.
    * Oplysninger er skrevet til logfilen på diskdrevet i ret store stykker. Fordelen er, at dette er meget effektivt --ERDDAP™vil aldrig blokere vente på, at oplysninger skal skrives til logfilen. Ulempen er, at loget næsten altid ender med en delvis meddelelse, som ikke vil blive afsluttet, indtil næste klump er skrevet. Du kan gøre det opdateret (for et øjeblik) ved at se dinERDDAP's statusside på siden https://*your.domain.org*/erddap/status.html   (eller eller ellerhttp://hvishttpser ikke aktiveret) .
    * Når log.txt-filer bliver til 20 MB,
filen er omdøbt log. txt.tidligere og en ny log.txt-fil oprettes. Så log filer akkumuleres ikke.
        
I setup.xml, kan du angive en anden maksimal størrelse for logfilen, i MegaBytes. Mindst tilladt er 1 (MB MB) . Det maksimale tilladt er 2000 (MB MB) . Standarden er 20 (MB MB) . For eksempel:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```

    * Når du genstarterERDDAP™,
        ERDDAP™gør en arkivkopi af log.txt og log. txt.tidligere filer med et tidsstempel i filens navn. Hvis der var problemer før genstart, kan det være nyttigt at analysere disse arkiverede filer for spor som for, hvad problemet var. Du kan slette arkiverne, hvis de ikke længere er nødvendige.
         
##### Parsing log.txt{#parsing-logtxt} 
ERDDAP's log. txt-filen er ikke designet til parsing (selvom du måske kan skabe regelmæssige udtryk, der udtrækker ønskede oplysninger) . Det er designet til at hjælpe en menneskelig figur ud af, hvad der går galt, når noget går galt. Når du indsender en fejl eller problemrapport tilERDDAP™udviklere, når det er muligt, skal du inkludere alle oplysninger fra log.txt-filen relateret til den besværlige anmodning.

Af effektive grunde,ERDDAP™Skriv kun oplysninger til at logge. txt efter en stor del af oplysninger er akkumuleret. Så hvis du besøger log. txt lige efter en fejl er opstået, oplysninger relateret til fejlen er endnu ikke blevet skrevet til log.txt. For at få perfekt opdaterede oplysninger fra log.txt kan du besøge din konto.ERDDAP's[Status.html side](#status-page). Hvornår Hvornår skal man HvornårERDDAP™processer, der anmoder om, skyller den alle nødvendige oplysninger til at logge.txt.

For For For For ForERDDAP™Brug statistik, brug venligst[Apache og/eller Tomcat log filer](#tomcat-logs)i stedet forERDDAP's log.txt. Bemærk, atERDDAP's[Status.html side](#status-page)  (nogle af nogle) og og og[Daglig rapport](#daily-report)  (mere mere) har et stort antal brugsstatistik forudberegnet for dig.
    
### Tomcat Logs{#tomcat-logs} 
HvisERDDAP™starter ikke, fordi en fejl opstod meget tidligt iERDDAP's opstart, vil fejlmeddelelsen dukke op i Tomcat's log filer ( *Tomcat* /logs/catalina. *i dag i dag* .log eller *Tomcat* /logs/catalina.out) , ikke i[ERDDAP's log.txt-fil](#log).

Brugsstatistik: For de fleste af de oplysninger, som folk ønsker at indsamle fra en logfil (f.eks. brugsstatistik) , skal du bruge Apache og/eller Tomcat log filer. De er pænt formateret og har den type oplysninger. Der er mange værktøjer til at analysere dem, for eksempel,[AWStats](https://www.awstats.org),[ElasticSearch's Kibana](https://www.elastic.co/products/kibana), og[JMeter](https://jmeter.apache.org), men søg på nettet for at finde det rigtige værktøj til dine formål.

Bemærk, at logfilerne kun identificerer brugere som IP-adresser. Der er hjemmesider til at hjælpe dig med at få oplysninger relateret til en given IP-adresse, f.eks.[Hvad erMyIPAddress](https://whatismyipaddress.com/ip-lookup), men du vil normalt ikke kunne finde navnet på brugeren.

Også på grund af[DHCP](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol), en given brugers IP-adresse kan være forskellige på forskellige dage, eller forskellige brugere kan have samme IP-adresse på forskellige tidspunkter.

Alternativt kan du bruge noget som helst[Google Analytics](https://analytics.google.com/analytics/web/provision/?authuser=0#/provision). Men pas på: Når du bruger eksterne tjenester som Google Analytics, giver du dine brugeres privatliv ved at give Google fuld adgang til deres aktivitet på dit websted, som Google bruger (og andre?) kan holde for evigt og bruge til ethvert formål (måske ikke teknisk, men sandsynligvis i praksis) . Dine brugere har ikke samtykket til dette, og er sandsynligvis ikke klar over, at de vil blive sporet på din hjemmeside, ligesom de sandsynligvis ikke er opmærksomme på, i det omfang de bliver sporet på næsten alle websteder. Disse dage, mange brugere er meget bekymrede over, at alt, hvad de foretager på internettet, overvåges af disse store virksomheder (Google, Facebook osv.) og af regeringen, og find dette en ubesejret indtrængen i deres liv (som i bogen, 1984) . Dette har drevet mange brugere til at installere produkter som[Beskyttelse af personlige oplysninger](https://www.eff.org/privacybadger/faq)at minimere sporing, til at bruge alternative browsere som[Tor Browser](https://www.torproject.org/)  (eller slå sporingen fra i traditionelle browsere) , og til at bruge alternative søgemaskiner som[Hoteller i nærheden af Duck Go](https://duckduckgo.com/). Hvis du bruger en tjeneste som Google Analytics, skal du mindst dokumentere brugen og konsekvenserne ved at ændre konsekvenserne&lt;standard privacyPolicy&gt; tag iERDDAP's
\\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml-fil.
    
### E-Mail Log{#e-mail-log} 
*    **EmailLogYEAR-MM-DD.txt**   
    ERDDAP™skriver altid teksten på alle out-going e-mails i den aktuelle dags e-mail LogYEAR-MM-DD.txt-filen i *bigParentDirectory* /loger ( *bigParentDirectory* er angivet i[opsætning.xml](/docs/server-admin/deploy-install#setupxml)) .
    * Hvis serveren ikke kan sende mailbeskeder, eller hvis du har konfigureretERDDAP™ikke at sende e-mail beskeder, eller hvis du bare er nysgerrig, er denne fil en praktisk måde at se alle de e-mails, der er blevet sendt ud.
    * Du kan slette tidligere dages e-mail log filer, hvis de ikke længere er nødvendige.
         
### Daglig rapport{#daily-report} 
Daily Report har masser af nyttige oplysninger - alle oplysninger fra dineERDDAP's[/erddap/status.htmlsideside](#status-page)og mere.
    * Det er den mest komplette oversigt over dinERDDAP's status.
    * Blandt andre statistikker indeholder det en liste over datasæt, der ikke indlæses, og de undtagelser, de har genereret.
    * Det genereres, når du starter opERDDAP™  (lige efterERDDAP™Afslutte at indlæse alle datasæt) og genereret snart efter 7 er lokal tid hver morgen.
    * Når det er genereret, er det skrevet til[ERDDAP's log.txt-fil](#log).
    * Når det genereres, e-mailes det til&lt;e-mail-nyhedsbeskrivelserTo&gt; og&lt;EmailEverything Til&gt; (som er angivet i[opsætning.xml](/docs/server-admin/deploy-install#setupxml)) Har du oprettet e-mailsystemet (i opsætning.xml) .

### Status side{#status-page} 
Du kan se status for dinERDDAP™fra enhver browser ved at gå til&lt;Håndbold&gt;/erddap/status.html
* Denne side genereres dynamisk, så den altid har up-to-the-time statistik for dinERDDAP.
* Det omfatter statistik vedrørende antallet af anmodninger, hukommelsesforbrug, tråd stack spor, opgaveThread osv.
* Fordi Statussiden kan ses af nogen, omfatter det ikke helt så meget information som statussiden.[Daglig rapport](#daily-report).
         
### Tilføjelse / ophængning af datasæt{#addingchanging-datasets} 
ERDDAP™Normalt relæsseredatasets.xmlhver eneste hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver eneste hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver hver *belastningDatasetsMinMinutes*   (angivet i[opsætning.xml](/docs/server-admin/deploy-install#setupxml)) . Så du kan foretage ændringerdatasets.xmlenhver tid, selv mensERDDAP™kører.
Et nyt datasæt vil blive opdaget snart, normalt inden for *belastningDatasetsMinMinutes* .
Et ændret datasæt vil blive genindlæst, når det er *reloadEveryNMinutes* gammel gammel gammel gammel (som angivet idatasets.xml) .
    
#### Flag{#flag} 
*    **[En Flag fil](#flag)FortællingerERDDAP™Prøv at indlæse et datasæt så hurtigt som muligt** 
    
    *   ERDDAP™Du vil ikke bemærke ændringer i en datasæts opsætning idatasets.xmlindtil indtil indtilERDDAP™Genindlæs datasættet.
         
    * At fortælleERDDAP™at genindlæse et datasæt så hurtigt som muligt (før datasættets datasæt)&lt;reloadEveryNMinutes&gt; ville forårsage det at blive genindlæst), sætte en fil i *bigParentDirectory* / flag ( *bigParentDirectory* er angivet i[opsætning.xml](/docs/server-admin/deploy-install#setupxml)) der har samme navn som datasættetsdatasetID.
Dette fortællerERDDAP™for at forsøge at indlæse, at datasæt ASAP.
Den gamle version af datasættet vil forblive tilgængelig for brugere, indtil den nye version er tilgængelig og udskiftet atomisk på plads.
For For For For ForEDDGridFraFiles og EDDTable FraFiles vil genindlæsning af datasæt se efter nye eller ændrede filer, læse dem og inkorporere dem i datasættet. Så tiden til at indlæse er afhængig af antallet af nye eller ændrede filer.
Hvis datasættet har aktivetfalse",ERDDAP™fjerner datasættet.
         
##### Dårlige filer Flag{#bad-files-flag} 
* En variant af /flag-mappen er /badFilesFlag-mappen. (Tilføjet iERDDAP™v2.12.)   
Hvis du lægger en fil i *bigParentDirectory* /badFilesFlag mappe med endatasetIDsom filnavnet (filindholdet betyder ikke) , så snartERDDAP™Se de dårligeFiles Flag-fil,ERDDAP™vil:
    
    1. Slette den dårligeFilesFlag-fil.
    2. Slette de dårlige filer.ncfilfil (hvis der er en) , som har listen over dårlige filer til den datasæt.
Til datasæt somEDDGridSideBySide, der har barnDatasets, dette også sletter de dårligeFiles.ncfil til alle barns datasæt.
    3. Genindlæs datasæt ASAP.
    
Således, dette årsagerERDDAP™at prøve igen for at arbejde med de filer tidligere (Erigt?) markeret som dårligt.
         
##### Hard Flag{#hard-flag} 
* En anden variant af /flag-mappen er /hardFlag-mappen. (Tilføjet iERDDAP™v1.74.)   
Hvis du lægger en fil i *bigParentDirectory* /hardFlag med endatasetIDsom filnavnet (filindholdet betyder ikke) , så snartERDDAP™ser den hårde Flag-fil,ERDDAP™vil:
    
    1. Slette harddiskenFlag-filen.
    2. Fjern datasættet fraERDDAP.
    3. Slette alle de oplysninger, der erERDDAP™har gemt om denne datasæt.
For For For For ForEDDGridFraFiles og EDDTable FraFiles subclasses sletter denne den interne database af datafiler og deres indhold.
Til datasæt somEDDGridSideBySide, der har børneDatasets, sletter også den interne database af datafiler og deres indhold til alle barns datasæt.
    4. Genindlæs datasættet.
For For For For ForEDDGridFraFiles og EDDTable FraFiles subclasses, dette årsagerERDDAP™at læse **alle** af datafiler. Således afhænger genindlæsningstiden af det samlede antal datafiler i datasættet. Fordi datasættet blev fjernet fraERDDAP™Når harddisken blev bemærket, vil datasættet være utilgængelig, indtil datasættet afslutter reloading. Vær tålmodig. Kig ind i[log.txt](#log)fil, hvis du vil se, hvad der foregår.
    
HardFlag-varianten sletter datasættets lagrede oplysninger, selvom datasættet ikke er indlæst i øjeblikket.ERDDAP.
    
Hårdt hårdt Flag er meget nyttige, når du gør noget, der forårsager en ændring i, hvordanERDDAP™Læser og fortolker kildedata, f.eks. når du installerer en ny version afERDDAP™eller når du har foretaget en ændring til en datasæts definition idatasets.xml
    
* Indholdet af flaget, dårligeFilesFlag, og harddiske filer er irrelevante.ERDDAP™ser bare ud på filnavnet for at få filnavnetdatasetID.
     
* I mellem store datasæt reloads,ERDDAP™ser kontinuerligt ud til flag, dårligeFilesFlag, og hårdeFlag filer.
     
* Bemærk, at når et datasæt er indlæst, alle filer i den *bigParentDirectory* / / / /[cache cache cache cache](#cached-responses)/ / / / *datasetID* mappen slettes. Dette inkluderer.ncog billedfiler, der normalt caches i ~15 minutter.
     
* Bemærk, at hvis datasættets xml indeholder[aktivt arbejde](/docs/server-admin/datasets#active), et flag vil forårsage, at datasættet skal gøres inaktiv (hvis det er aktivt) , og i alle tilfælde ikke reloaded.
     
* Enhver tidERDDAP™Kører LoadDatasets for at gøre en større reload (den timed reload kontrolleret af&lt;belastningDatasetsMinMinutes&gt;) eller en mindre reload (som følge af et eksternt eller indre flag) ,ERDDAP™Læser alle&lt;dekomprimeretCacheMaxGB&gt;,&lt;dekomprimeretCacheMaxMinutesOld&gt;,&lt;Bruger&gt;,&lt;Anmod om Blacklist&gt;,&lt;langsomDownTroubleMillis&gt;, og&lt;AbonnementEmailBlacklist&gt; tags og kontakter til de nye indstillinger. Så du kan bruge et flag som en måde at komme påERDDAP™for at se ændringer i disse tags ASAP.

##### Indstil datasæt Flag{#set-dataset-flag} 
*  ERDDAP™har en webtjeneste, så flag kan indstilles via webadresser.
    
    * For eksempel,
         https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789   
         (det er et falsk flag Nøglenøgle) vil indstille et flag til rPmelTao datasættet.
    * Der er en anden flagnøgle for hverdatasetID.
    * Administratorer kan se en liste over flag URL'er for alle datasæt ved at se nederst i deres[Daglig rapport](#daily-report)email.
    * Administratorer bør behandle disse webadresser så fortrolige, da de giver nogen ret til at nulstille et datasæt på vilje.
    * Hvis du tror, at flagnøglerne er faldet i hænderne på nogen, der er ved at bruge dem, kan du ændre&lt;flagKey&gt; i[opsætning.xml](/docs/server-admin/deploy-install#setupxml)og genstartERDDAPat tvingeERDDAP™at generere og bruge et andet sæt flagKeys.
    * Hvis du ændrer&lt;flagKey&gt;, slette alle de gamle abonnementer (Se listen i din daglige rapport) Husk at sende de nye webadresser til de personer, du ønsker at have dem.
    
Flagsystemet kan tjene som grundlag for en mere effektiv mekanisme til at fortælleERDDAP™når du vil indlæse et datasæt. Du kan f.eks. indstille et datasæts&lt;reloadEveryNMinutes&gt; til et stort antal (f.eks. 10080 = 1 uge) . Så når du kender datasættet har ændret sig (Måske fordi du har tilføjet en fil til datasættets datakatalog) Angiv et flag, så datasættet bliver genindlæst så hurtigt som muligt. Flag ses normalt hurtigt. Men hvis LoadDatasets tråde allerede er optaget, kan det være et stykke tid, før den er tilgængelig for at handle på flaget. Men flagsystemet er meget mere lydhør og meget mere effektiv end indstilling&lt;reloadEveryNMinutes&gt; til et lille nummer.
    
#### Fjernelse af data{#removing-datasets} 
Hvis et datasæt er aktivt iERDDAP™og du vil deaktivere det midlertidigt eller permanent:
1. I nærheden af In In In In In In In In In In In In In Indatasets.xmlfor datasættet, sæt[aktivt arbejde](/docs/server-admin/datasets#active)i datasættet tag.
2. Vent påERDDAP™for at fjerne datasættet under den næste store reload eller[Indstil et flag](#flag)for datasættet til at fortælleERDDAP™for at se denne ændring så hurtigt som muligt. Når du gør dette,ERDDAP™smider ikke nogen oplysninger, det kan have gemt om datasættet og gør bestemt ikke noget til de faktiske data.
3. Så kan du forlade aktivefalse" datasæt idatasets.xmleller fjern det.
         
#### Hvornår er Datasets Reloaded?{#when-are-datasets-reloaded} 
En tråd kaldet RunLoadDatasets er mestertråden, der styrer, når datasæt er genindlæst. Løb Datasets sløjfer for evigt:

1. RunLoadDatasets noterer den aktuelle tid.
2. RunLoadDatasets starter en LoadDatasets tråd for at gøre en "majorLoad". Du kan se oplysninger om den aktuelle/tidligere storeLoad øverst på dinERDDAP's
    [/erddap/status.htmlsideside](#status-page)  (for eksempel,[Status sideeksempel](https://coastwatch.pfeg.noaa.gov/erddap/status.html)) .
    
    1. LoadDatasets gør en kopi afdatasets.xml.
    2. LoadDatasets læser gennem kopi afdatasets.xmlog for hvert datasæt kan du se, om datasættet skal være (gen igen) indlæst eller fjernet.
        * Hvis du vil[flag flag flag flag](#flag)fil findes for denne datasæt, filen slettes, og datasættet fjernes, hvis aktiv billedbehandling" eller (gen igen) indlæst, hvis aktiv pisand" (uanset datasættets alder) .
        * Hvis datasættets datasæt.xml chunk har aktivefalse" og datasættet er i øjeblikket indlæst (aktiv aktiv aktiv aktiv) , det er ubelastet (fjernet) .
        * Hvis datasættet ikke allerede er indlæst, er det indlæst.
        * Hvis datasættet allerede er indlæst, bliver datasættet genindlæst, hvis datasættet er alder (tid siden sidste belastning) er større end dens&lt;reload Alle rettigheder&gt; (Standard = 10080 minutter) , ellers er datasættet alene tilbage.
    3. LoadDatasets afslutter.
    
RunLoadDatasets tråd venter på LoadDatasets tråd til finish. Hvis LoadDatasets tager længere tid end loadDatasets Minutes (som angivet i opsætning.xml) , RunLoadDatasets afbryder LoadDatasets tråd. Ideelt set bemærker LoadDatasets afbryder og finish. Men hvis det ikke bemærker afbryderen inden for et minut, kalder RunLoadDatasets belastningDatasetsets. stop () , som er uønsket.
3. Mens tiden siden starten af den sidste storeLoad er mindre end loadDatasetsets Minutes (som angivet i opsætning.xml, f.eks. 15 minutter) , RunLoadDatasets gentagne gange ser efter[flag flag flag flag](#flag)filer i filerne *bigParentDirectory* / flag mappe. Hvis en eller flere flag filer findes, slettes de, og RunLoadDatasets starter en LoadDatasets tråd for at gøre en "minorLoad" (Større plads =false) . Du kan ikke se mindre oplysninger om dine oplysningerERDDAP's[/erddap/status.htmlsideside](#status-page).
    1. LoadDatasets gør en kopi afdatasets.xml.
    2. LoadDatasets læser gennem kopi afdatasets.xmlog for hver datasæt, som der var en flagfil:
        * Hvis datasættets datasæt.xml chunk har aktivefalse" og datasættet er i øjeblikket indlæst (aktiv aktiv aktiv aktiv) , det er ubelastet (fjernet) .
        * Hvis datasættet har aktiv sædvane, er datasættet (gen igen) indlæst, uanset alder. Ikke-flagede datasets ignoreres.
    3. LoadDatasets afslutter.
4. Løb Datasets går tilbage til trin 1.

Noter:
* Start op
Når du genstarterERDDAP™, hver datasæt med aktiv plov" er indlæst.
* Cache
Når et datasæt er (gen igen) indlæst, dens cache (herunder dataresponsfiler og/eller billedfiler) er tømt.
* Masser af datasæt
Hvis du har en masse datasæt og/eller en eller flere datasæt er langsom til (gen igen) belastning, en LoadDatasets tråd kan tage lang tid at afslutte sit arbejde, måske endnu længere end belastningDatasetsetsets MinMinutes.
* En LoadDatasets Tråd
Der er aldrig mere end én LoadDatasets tråd, der kører på én gang. Hvis et flag er indstillet, når LoadDatasets allerede kører, vil flaget sandsynligvis ikke blive bemærket eller reageret på, indtil LoadDatasets tråd afsluttes. Du kan sige: "Det er dum. Hvorfor starter du ikke bare en masse nye tråde for at indlæse datasæt? Men hvis du har masser af datasæt, der får data fra en fjern server, vil selv én LoadDatasets tråd sætte betydelig stress på fjernserveren. Det samme er sandt, hvis du har masser af datasæt, der får data fra filer på en RAID. Der er hurtigt faldende afkast fra at have mere end én LoadDatasets tråd.
* Flag = ASAP
Indstilling af et flag signalerer bare, at datasættet skal være (gen igen) indlæst så hurtigt som muligt, ikke nødvendigvis umiddelbart. Hvis ingen LoadDatasets tråd i øjeblikket kører, vil datasættet begynde at blive indlæst inden for et par sekunder. Men hvis en LoadDatasets tråd i øjeblikket kører, vil datasættet sandsynligvis ikke blive genindlæst, indtil efter at LoadDatasets tråd er færdig.
* Markér fil Slettet
Generelt, hvis du sætter en flagfil i den *bigParentDirectory* /erddap/flag mappe (ved at besøge datasættets flag Url eller sætte en reel fil der) , datasættet vil normalt blive indlæst meget snart, efter at flagfilen er slettet.
* Flag mod små reload EveryNMinutes
Hvis du har en ekstern måde at vide, når et datasæt skal indlæses, og hvis det er praktisk for dig, er den bedste måde at sikre, at et datasæt altid er up-to-date, at sætte dens genindlæsser EveryNMinutes til et stort antal (10080?) og sæt et flag (via et script?) når det skal læsses. Det er det system, der erEDDGridFraErddap og EDDTableFraErddap bruger beskeder, som datasættet skal indlæses.
* Kig i log.txt
Masser af relevante oplysninger er skrevet til *bigParentDirectory* /logs/log.txt-fil. Hvis ting ikke fungerer, som du forventer, ser på log. txt lader dig diagnosticere problemet ved at finde ud af præcis, hvadERDDAP™gjorde.
    
    * Søg efter "majorLoad=true" for starten af store LoadDataset tråde.
    * Søg efter "majorLoad=false" for starten af mindre LoadDatasets tråde.
    * Søg efter et givet datasæt'sdatasetIDfor information om, at det bliver (gen igen) indlæst eller queried.
        
          
         
#### Cachede svar{#cached-responses} 
Generelt,ERDDAP™cachen ikke (Store butik) svar på brugeranmodninger. rationalet var, at de fleste anmodninger ville være lidt anderledes, så cachen ikke ville være meget effektiv. De største undtagelser er anmodninger om billedfiler (som caches siden browsere og programmer somGoogle EarthOfte re-request billeder) og anmodninger om.ncfiler filer filer (fordi de ikke kan skabes på farten) .ERDDAP™gemmer hver datasæts cachelagrede filer i en anden mappe: *bigParentDirectory* / cache / *datasetID* Da en enkelt cache mappe kan have et stort antal filer, der kan blive langsom til at få adgang.
Filer fjernes fra cachen af en af tre grunde:
* Alle filer i denne cache slettes, nårERDDAP™genstartes.
* Periodisk, enhver fil mere end&lt;cacheMinutes&gt; gamle (som angivet i[opsætning.xml](/docs/server-admin/deploy-install#setupxml)) vil blive slettet. Fjernelse af filer i cachen baseret på alder (Ikke Mindst-Brugt) sikrer, at filer ikke forbliver i cachen meget lang. Selvom det kan synes som en given anmodning bør altid returnere den samme svar, det er ikke sandt. For eksempel ettabledapanmodning, der indeholder &time&gt; *nogle af nogle Tidstid* vil ændre, hvis nye data ankommer til datasættet. Og en gitteretap anmodning, der omfatter\\[sidst\\]for tidsdimensionen vil ændre, hvis nye data ankommer til datasættet.
* Billeder, der viser fejlforhold, caches, men kun i et par minutter (det er en vanskelig situation) .
* Hver gang et datasæt indlæses, slettes alle filer i den datasæts cache. Fordi anmodninger kan være for te"last"indeks i et gitterded datasæt, filer i cachen kan blive ugyldige, når et datasæt er indlæst.
         
#### Oplysninger om lagring af datasæt{#stored-dataset-information} 
Til alle typer datasæt,ERDDAP™Indsamler masser af oplysninger, når et datasæt er indlæst og holder det i hukommelse. Dette giver mulighed forERDDAP™at svare meget hurtigt på søgninger, anmodninger om lister over datasæt og anmodninger om oplysninger om et datasæt.

For et par typer datasæt (mærkbartEDDGridKopier, EDDTableCopy,EDDGridFra Fra Fra Fra Fra Fra *MILF* Filer og EDDTableFra *MILF* Filer) ,ERDDAP™gemmer på disken nogle oplysninger om det datasæt, der genbruges, når datasættet er genindlæst. Dette fremskynder i høj grad reloadingsprocessen.

* Nogle af datasættets informationsfiler er menneskelæsbare.jsonfiler og gemmes i *bigParentDirectory* / Datasæt / *Seneste2LettersOfDatasetID/datasetID* .
*   ERDDAP™sletter kun disse filer i usædvanlige situationer, f.eks. hvis du tilføjer eller sletter en variabel fra datasættetsdatasets.xmlLidt.
* De fleste ændringer i et datasæt'sdatasets.xmlbidder (f.eks. at ændre en global egenskab eller en variabel egenskab) Ikke nødvendigt, at du sletter disse filer. En almindelig dataset-reload vil håndtere disse typer ændringer. Du kan fortælleERDDAP™at indlæse et datasæt ASAP ved at indstille en[flag flag flag flag](#flag)for datasættet.
* På samme måde vil tilføjelse, sletning eller ændring af datafiler håndteres, nårERDDAP™Genindlæs en datasæt. Men men men men menERDDAP™vil bemærke denne type ændring snart og automatisk, hvis datasættet bruger [&lt;OpdaterEveryNMillis&gt;] (/docs/server-admin/datasets#updateeverynmillis) system.
* Det bør kun sjældent være nødvendigt for dig at slette disse filer. Den mest almindelige situation, hvor du skal tvingeERDDAP™at slette de lagrede oplysninger (fordi det er forældet/incorrect og vil ikke blive automatisk rettet afERDDAP) Når du foretager ændringer i datasættets datasætdatasets.xmlDet påvirker, hvordanERDDAP™fortolker data i kildedatafiler, f.eks. ved at ændre tidsvariets formatstreng.
* Sådan sletter du en datasæts gemte datafiler fra enERDDAP™der kører (selvom datasættet ikke er i øjeblikket indlæst) , sæt en[hårdt hårdt Flag](#hard-flag)for denne datasæt. Husk, at hvis et datasæt er en sammenlægning af et stort antal filer, kan genindlæsing af datasættet tage betydelig tid.
* Sådan sletter du en datasæts gemte datafiler, nårERDDAP™kører ikke, kører[Billeder af DasDds](/docs/server-admin/datasets#dasdds)for denne datasæt (som er nemmere end at finde ud af, hvor oplysningerne er placeret og slette filerne ved hånden) . Husk, at hvis et datasæt er en sammenlægning af et stort antal filer, kan genindlæsing af datasættet tage betydelig tid.
         
### Hukommelsesstatus{#memory-status} 
ERDDAP™bør ikke nogensinde gå ned eller fryse op. Hvis det gør, er en af de mest sandsynlige årsager utilstrækkelig hukommelse. Du kan overvåge hukommelsesforbruget ved at se på status.html-websiden, som indeholder en linje som

0 gc opkald, 0 anmodninger skurer, og 0 farligt HukommelseE-mails siden sidste store LoadDatasets

 (de er progressive mere alvorlige begivenheder)   
og MB ibrug og gc Calls kolonner i tabellen af statistikker. Du kan fortælle, hvordan hukommelsen stressede dinERDDAP™er ved at se disse tal. Højere tal angiver mere stress.

* MB ibrug bør altid være mindre end halvdelen af[\\-Xmx hukommelse indstilling](/docs/server-admin/deploy-install#memory). Større tal er et dårligt tegn.
* gc opkald angiver antallet af gangeERDDAP™kaldet skraldespanden til at forsøge at lindre høj hukommelse brug. Hvis dette bliver &gt;100, er det et tegn på alvorlig problemer.
* skur angiver antallet af indgående anmodninger, der blev kastet (med HTTP-fejlnummer 503, Service) fordi hukommelse brug allerede var for høj. Ideelt set bør ingen anmodninger kastes. Det er okay, hvis et par anmodninger er skuret, men et tegn på alvorlig besvær, hvis mange er kaste.
* farlig fare HukommelseE-mails - Hvis hukommelsesbrug bliver farligt højt,ERDDAP™sender en e-mail til de e-mailadresser, der er angivet i&lt;EmailEverything Til&gt; (i opsætning.xml) med en liste over de aktive brugeranmodninger. Når e-mailen siger, bedes du videresende disse e-mails til Chris. John på noaa. gov, så vi kan bruge oplysningerne til at forbedre fremtidige versioner afERDDAP.
     

Hvis du vilERDDAP™er hukommelsesstresset:
* Overvej alt, hvad der er mere af din servers hukommelseERDDAP™ved at ændre Tomcat[‐Xmx hukommelse indstilling](/docs/server-admin/deploy-install#memory).
* Hvis du allerede har tildelt så meget hukommelse, som du kan tilERDDAP™via -Xmx, overveje at købe mere hukommelse til din server. Hukommelse er billig (sammenlignet med prisen på en ny server eller din tid) &#33; Derefter øges -Xmx.
* I nærheden af In In In In In In In In In In In In In Indatasets.xml, sæt&lt;nGridThreads&gt; til 1, sæt&lt;nTableThreads&gt; til 1, og sæt&lt;ipAddressMaxRequestsActive&gt; til 1.
* Kig på anmodninger i log.txt for ineffektiv eller besværsome (men legitime) anmodninger. Tilføj deres IP-adresser til&lt;Anmod om Blacklist&gt; i in in in indatasets.xml. Den sorte liste fejlmeddelelse indeholderERDDAP™administratorens e-mailadresse med håb om, at brugerne kontakter dig, så du kan arbejde med dem for at brugeERDDAP™mere effektivt. Det er godt at holde en liste over IP adresser dig blacklist og hvorfor, så du kan arbejde med brugerne, hvis de kontakter dig.
* Kig på anmodninger i log.txt for anmodninger fra ondsindede brugere. Tilføj deres IP-adresser til&lt;Anmod om Blacklist&gt; i in in in indatasets.xml. Hvis lignende anmodninger kommer fra flere lignende IP-adresse, kan du bruge nogle, der er tjenester (fx,[ https://www.whois.com/whois/ ](https://www.whois.com/whois/)) for at finde ud af rækken af IP-adresser fra denne kilde og blacklist hele serien. Se [&lt;anmodning Blacklist&gt; dokumentation] (/docs/server-admin/datasets#requestblacklist) .
         
#### FjerneMemoryFejl{#outofmemoryerror} 
Når du opsætterERDDAP™, du angiver den maksimale mængde hukommelse, derJavakan bruge via[\\-Xmx indstilling](/docs/server-admin/deploy-install#memory). HvisERDDAP™nogensinde har brug for mere hukommelse end det, vil det smide en java. lang. Fejl ved fejl.ERDDAP™gør en masse kontrol for at gøre det muligt at håndtere den fejl yndefuldt (f.eks. vil en besværlig anmodning mislykkes, men systemet bevarer sin integritet) . Men nogle gange, fejlen skader system integritet og du er nødt til at genstarteERDDAP. Forhåbentlig er det sjældent.

Den hurtige og nemme løsning til en OutOfMemory fejl er at øge den[\\-Xmx indstilling](/docs/server-admin/deploy-install#memory), men du bør ikke nogensinde øge indstillingen -Xmx til mere end 80% af den fysiske hukommelse i serveren (f.eks. for en 10 GB server, skal du ikke indstille -Xmx over 8 GB) . Hukommelse er relativt billig, så det kan være en god mulighed for at øge hukommelsen i serveren. Men hvis du har maxed hukommelsen i serveren eller af andre grunde ikke kan øge det, skal du håndtere mere direkte med årsagen til OutOfMemory Error.

Hvis du ser på det[log.txt](#log)fil for at se, hvadERDDAP™Når fejlen opstod, kan du normalt få en god anelse til årsagen til OutOfMemory fejl. Der er mange mulige årsager, herunder:

* En enkelt enorm datafil kan forårsage OutOfMemory fejl, især store ASCII datafiler. Hvis dette er problemet, bør det være indlysende, fordiERDDAP™vil ikke indlæse datasættet (for tabulære datasæt) eller læse data fra denne fil (til gitterede datasæt) . Løsningen, hvis det er muligt, er at opdele filen i flere filer. Ideelt, kan du opdele filen i logiske chunks. Hvis filen f.eks. har 20 måneders værdi af data, opdele den i 20 filer, hver med 1 måneds dataværdi. Men der er fordele, selvom hovedfilen opdeles tilfældigt. Denne tilgang har flere fordele: a) Dette vil reducere den hukommelse, der er nødvendig for at læse datafiler til 1/20th, fordi kun én fil læses på et tidspunkt. b) Ofte,ERDDAP™kan håndtere anmodninger meget hurtigere, fordi det kun skal se i et eller et par filer for at finde dataene til en given anmodning. c) Hvis dataindsamling løbende, kan de eksisterende 20 filer forblive uændret, og du behøver kun at ændre en, lille, ny fil for at tilføje den næste måneds dataværdi til datasættet.
* En enorm anmodning kan forårsage OutOfMemory fejl. Især nogle af deorderByMuligheder har hele svar på hukommelse for et sekund (f.eks. at gøre en slags) . Hvis svaret er enorm, kan det føre til fejlen. Der vil altid være nogle anmodninger, som er på forskellige måder, for store. Du kan løse problemet ved at øge indstillingen -Xmx. Eller kan du opfordre brugeren til at foretage en række mindre anmodninger.
* Det er usandsynligt, at et stort antal filer ville forårsage filindekset, atERDDAP™skaber at være så stor, at filen ville forårsage fejlen. Hvis vi antager, at hver fil bruger 300 bytes, så ville 1.000.000 filer kun tage op 300 MB. Men datasæt med et stort antal datafiler forårsager andre problemer forERDDAP, især, det tager lang tid forERDDAP™for at åbne alle disse datafiler, når du reagerer på en brugerkonto for data. I dette tilfælde kan løsningen være at aggregere filerne, så der er færre datafiler. For tabulære datasæt, er det ofte fantastisk, hvis du gemmer dataene fra den aktuelle datasæt i[CF Diskret Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Konguous Ragged Array data filer (anmodning.ncCF-filer fraERDDAP) og derefter lave et nyt datasæt. Disse filer kan håndteres meget effektivt medERDDAP's[EDDTableFraNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles). Hvis de er logisk organiseret (hver med data til en smule plads og tid) ,ERDDAP™kan udtrække data fra dem meget hurtigt.
* Til tabulære datasæt, der bruger [&lt;subsetVariables&gt;] (/docs/server-admin/datasæt #subsetvariables) attribut,ERDDAP™gør en tabel af unikke kombinationer af værdierne for disse variabler. Til store datasæt eller når&lt;subsetVariables&gt; er forkert konfigureret, kan denne tabel være stor nok til at forårsage OutOfMemory fejl. Løsningen er at fjerne variabler fra listen over&lt;subsetVariables&gt; for hvilke der er et stort antal værdier eller fjerne variabler efter behov, indtil størrelsen af tabellen er rimelig. Dele afERDDAP™der bruger densubsetVariablessystem fungerer ikke godt (f.eks., websider indlæse meget langsomt) når der er mere end 100.000 rækker i tabellen.
* Det er altid muligt, at flere samtidig store anmodninger (på en virkelig travlERDDAP) kan kombinere til at forårsage hukommelse problemer. For eksempel, 8 anmodninger, hver med 1 GB hver, ville forårsage problemer for en -Xmx=8GB opsætning. Men det er sjældent, at hver anmodning ville være på toppen af sin hukommelse brug samtidig. Og du vil nemt kunne se, at dinERDDAP™er virkelig optaget med store anmodninger. Men det er muligt. Det er svært at håndtere dette problem andre end ved at øge indstillingen -Xmx.
* Der er andre scenarier. Hvis du ser på det[log.txt](#log)fil for at se, hvadERDDAP™Når fejlen opstod, kan du normalt få en god anelse til årsagen. I de fleste tilfælde er der en måde at minimere problemet (Se ovenstående) , men nogle gange behøver du bare mere hukommelse og en højere -Xmx indstilling.
         
### For mange åbne filer{#too-many-open-files} 
Begyndende medERDDAP™v2.12,ERDDAP™har et system til at overvåge antallet af åbne filer (som indeholder stik og nogle andre ting, ikke bare filer) i Tomcat på Linux-computere. Hvis nogle filer fejlagtigt aldrig bliver lukket (en "kilde lækage") , antallet af åbne filer kan stige, indtil det overstiger det maksimale tilladt af operativsystemet og mange virkelig dårlige ting sker. Så nu på Linux-computere (fordi oplysningerne ikke er tilgængelige for Windows) :

* Der er en "Open Files" kolonne på den langt højre side af status.html-websiden, der viser procent af max-filer åbne. På Windows viser det bare "?".
* Hvornår Hvornår skal man HvornårERDDAP™genererer, at oplysninger i slutningen af hvert større datasæt reload, vil den udskrive til loget. txt-fil:
I nærheden af openFileCount= *nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende nuværende* af max= *max* % = *procent procent procent* 
* Hvis procentdelen er &gt;50%, sendes en e-mail til denERDDAP™administrator og e-mail Alt alt Til e-mail-adresser.

Hvis procentdelen er 100%,ERDDAP™er i forfærdeligt besvær. Lad ikke dette ske.
Hvis procentdelen er &gt;75%,ERDDAP™er tæt på forfærdeligt besvær. Det er ikke okay.
Hvis procentdelen er &gt;50%, er det meget muligt, at en pigge vil forårsage procentdelen at ramme 100.
Hvis procentdelen er nogensinde &gt;50%, skal du:
* Forøg det maksimale antal åbne filer tilladt af enten:
    * Sådan ændrer du hver gang, før du starter tomcat (sætte dem i Tomcat opstart.sh-filen?) :
Begrænsninger -Hn 16384
-Sn 16384
    * Eller lav en permanent ændring ved at redigere (som rod) /etc/security/ limits.conf og tilføje linjer:
tomcat blød nofile 16384
tomcat harddisk 16384
Disse kommandoer antager, at brugeren kører Tomcat kaldes "tomcat".
På mange Linux-varianter skal du genstarte serveren for at anvende ændringerne. For begge muligheder, "16384" ovenfor er et eksempel. Du vælger det nummer, du tror er bedst.
* Genstart genstartERDDAP. operativsystemet vil lukke alle åbne filer.
         
### Detaljerede anmodninger{#failed-requests} 
*    **Usædvanlig aktivitet: &gt;25% af anmodninger mislykkedes**   
Som en del af hver reloadDatasets, som normalt er hver 15 minutter,ERDDAP™ser på den procentdel af anmodninger, der mislykkedes, da den sidste reloadDatasets. Hvis det er &gt;25%,ERDDAP™Sende en mail til e-mailenERDDAP™administrator med emnet "Unusual Activity: &gt;25% af anmodninger mislykkedes". Denne e-mail indeholder et talligt nær bunden med titlen "Requester's IP Adresse (Detaljeret)   (siden sidste major LoadDatasets) ". Søg efter det. Det fortæller dig IP-adressen på computere, der gør de mest mislykkede anmodninger. Du kan derefter søge efter de IP-adresser i IP-adressen\\[bigParentDirectory\\]/loger /[log.txt](#log)fil og se, hvilken type anmodninger de laver.
    
Du kan bruge brugerens IP-nummer (f.eks. med[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)) at forsøge at finde ud af, hvem eller hvad brugeren er. Nogle gange vil det fortælle dig temmelig præcist, hvem brugeren er (f.eks. er det en søgemaskines web crawler) . De fleste af tiden giver det bare dig en anelse (f.eks. er det en amazonaws computer, det er fra nogle universitet, det er en person i en bestemt by) .
    
Ved at se på den faktiske anmodning, IP-nummeret og fejlmeddelelsen (alt fra[log.txt](#log)) for en række fejl, kan du normalt finde ud af dybest set, hvad der foregår forkert. I min erfaring er der fire fælles årsager til mange mislykkede anmodninger:
    
1) Anmodningerne er ondsindede (f.eks. på udkig efter sikkerhedssvagheder eller anmodninger og derefter annullere dem, før de er afsluttet) . Du bør bruge&lt;Anmod om Blacklist&gt; i in in in indatasets.xmltil blacklist disse IP-adresser.
    
2) En søgemaskine forsøger naivt de webadresser, der er anført iERDDAP™websider og ISO 19115 dokumenter. For eksempel er der mange steder, der angiver basenOPeNDAPURL, for eksempel https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST , hvortil brugeren skal tilføje en filtype (f.eks. .das, .dds, .html) . Men søgemaskinen ved ikke dette. Og anmodningen til basen URL mislykkes. En relateret situation er, når søgemaskine genererer bizarre anmodninger eller forsøger at udfylde formularer for at komme til "skjulte" websider. Men søgemaskinerne gør ofte et dårligt job af dette, hvilket fører til fejl. Løsningen er: Opret en[robotter.txt](#robotstxt)fil.
    
3) Nogle bruger kører et script, der gentagne gange beder om noget, der ikke er der. Måske er det et datasæt, der bruges til at eksistere, men er gået nu (midlertidigt eller permanent) . scripts forventer ofte ikke dette, og så behøver du ikke håndtere det intelligent. Så scriptet bare holder anmodninger og anmodninger holder fejl. Hvis du kan gætte, hvem brugeren er (fra IP-nummeret ovenfor) , kontakt dem og fortæl dem, at datasættet ikke længere er tilgængelige og bede dem om at ændre deres script.
    
4) Noget er virkelig forkert med nogle datasæt. Normalt,ERDDAP™vil gøre det besværlige datasæt inaktive. Nogle gange kan det ikke, så alle anmodninger til det bare føre til fejl. Hvis det er tilfældet, skal du rette problemet med datasættet eller (hvis du ikke kan) Indstil datasættet til[aktivt arbejde](/docs/server-admin/datasets#active). Selvfølgelig kan dette føre til problem #2.
    
Nogle gange er fejlene ikke så slemt, især, hvisERDDAP™kan opdage fejlen og reagere meget hurtigt (&lt; =ms). Så du kan beslutte at tage ingen handling.
    
Hvis alt andet mislykkes, er der en universel løsning: tilføje brugerens IP-nummer til [&lt;Anmod om Blacklist&gt;] (/docs/server-admin/datasets#requestblacklist) . Dette er ikke så slemt eller som drastisk en mulighed, som det kan synes. Brugeren vil derefter få en fejlmeddelelse, der siger s/he, er blevet blacklistet og fortæller dem din (te te te teERDDAP™administratorens administrator) e-mailadresse. Nogle gange vil brugeren kontakte dig, og du kan løse problemet. Nogle gange kontakter brugeren ikke dig, og du vil se den nøjagtige samme adfærd, der kommer fra et andet IP-nummer den næste dag. Blacklist det nye IP-nummer og håber, at de i sidste ende får beskeden. (Eller dette er din Groundhog Day, hvorfra du aldrig vil flygte. Desværre.) 
    
### robotter.txt{#robotstxt} 
Søgemaskineselskaberne bruger web crawlere (f.eks. Google Bot Bot) for at undersøge alle siderne på internettet for at tilføje indholdet til søgemaskinerne. For For For For ForERDDAP™, det er dybest set godt.ERDDAP™har masser af links mellem sider, så crawlers vil finde alle websider og tilføje dem til søgemaskinerne. Så vil brugerne af søgemaskinerne kunne finde datasæt på din computer.ERDDAP.
    
Desværre, nogle web crawlere (f.eks. Google Bot Bot) udfylder nu og indsender formularer for at finde yderligere indhold. For webhandel sites, er dette fantastisk. Men dette er forfærdeligt forERDDAP™fordi det bare fører til en **uendelig uendelig uendelig uendelig uendelig uendelig** Antallet af uønskede og meningsløse forsøg på at gennemgå de faktiske data. Dette kan føre til flere anmodninger om data end fra alle andre brugere kombineret. Og det udfylder søgemaskinen med goofy, pointless subsets af de faktiske data.
    
For at fortælle web crawlere at stoppe udfylde formularer og bare generelt ikke se på websider, de ikke behøver at se på, skal du oprette en tekstfil kaldet[robotter.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)i rodmappen på dit websteds dokumenthierarki, så det kan ses af alle som f.eks. http://*www.your.domain*/robots.txt .
Hvis du opretter en ny robotter. txt-filen, dette er en god start:
```
    User-Agent: \\*
    Disallow: /erddap/files/ 
    Disallow: /files/ 
    Disallow: /images/ 
    Disallow: /\\*?
    Disallow: /\\*?\\*
    Disallow: /\\*.asc\\*
    Disallow: /\\*.csv\\*
    Disallow: /\\*.dods\\*
    Disallow: /\\*.esriAscii\\*
    Disallow: /\\*.esriCsv\\*
    Disallow: /\\*.geoJson\\*
    Disallow: /\\*.htmlTable\\*
    Disallow: /\\*.json\\*
    Disallow: /\\*.mat\\*
    Disallow: /\\*.nc\\*
    Disallow: /\\*.odvTxt\\*
    Disallow: /\\*.tsv\\*
    Disallow: /\\*.xhtml\\*
    Disallow: /\\*.geotif\\*
    Disallow: /\\*.itx\\*
    Disallow: /\\*.kml\\*
    Disallow: /\\*.pdf\\*
    Disallow: /\\*.png\\*
    Disallow: /\\*.large\\*
    Disallow: /\\*.small\\*
    Disallow: /\\*.transparentPng\\*
    Sitemap: http://***your.institutions.url***/erddap/sitemap.xml
```
     (Men udskifte *Din. Institutions.url* med dinERDDAP's base URL.)   
Det kan tage et par dage for søgemaskinerne at bemærke og for ændringer, der skal tage effekt.
     
### sitemap.xml{#sitemapxml} 
Som det[ https://www.sitemaps.org ](https://www.sitemaps.org/)website siger:

> Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. In its simplest form, a Sitemap is an XML file that lists URLs for a site along with additional metadata about each URL (when it was last updated, how often it usually changes, and how important it is, relative to other URLs on the site) so that search engines can more intelligently crawl the site.
> 
> Web crawlers usually discover pages from links within the site and from other sites. Sitemaps supplement this data to allow crawlers that support Sitemaps to pick up all URLs in the Sitemap and learn about those URLs using the associated metadata. Using the Sitemap protocol does not guarantee that web pages are included in search engines, but provides hints for web crawlers to do a better job of crawling your site.

Faktisk, sidenERDDAP™er det erRESTful, søgemaskine edderkopper kan nemt crawle dinERDDAP. Men de har tendens til at gøre det oftere (daglig&#33;) end nødvendigt (månedligt?) .

* I betragtning af, at hver søgemaskine kan crawle hele dinERDDAP™Hver dag kan dette føre til en masse unødvendige anmodninger.
* SåERDDAP™genererer en sitemap.xml-fil til dinERDDAP™som fortæller søgemaskiner, at dineERDDAP™behøver kun at blive crawlet hver måned.
* Du skal tilføje en henvisning tilERDDAP's sitemap.xml til din[robotter.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)fil:
Sitemap: http://**www.yoursite.org**/erddap/sitemap.xml
 
* Hvis det ikke synes at få beskeden til crawlers, kan du fortælle de forskellige søgemaskiner om sitemap.xml-filen ved at besøge disse webadresser (men ændring **Din institution** til din institutions akronym eller forkortelse og **www.yoursite.org** til dinERDDAP's URL') :
    *    https://www.bing.com/webmaster/ping.aspx?siteMap=http://**www.yoursite.org**/erddap/sitemap.xml
 
    *    https://www.google.com/ping?sitemap=http://**www.yoursite.org**/erddap/sitemap.xml(I Tænk) du skal bare ping hver søgemaskine én gang, for hele tiden. Søgemaskinerne vil derefter opdage ændringer i sitemap.xml periodisk.
     
### Datadistribution / Datadistribution Netværk:Pushog og ogPullTeknologiteknologi{#data-dissemination--data-distribution-networks-push-and-pull-technology} 
* Normalt,ERDDAP™fungerer som formidler: Det tager en anmodning fra en bruger; får data fra en fjern datakilde; omformaterer dataene; og sender den til brugeren.
*   [PullTeknologiteknologi](https://en.wikipedia.org/wiki/Pull_technology):ERDDAP™har også mulighed for aktivt at få alle de tilgængelige data fra en fjern datakilde og[gemme en lokal kopi af dataene](/docs/server-admin/datasets#eddgridcopy).
*   [PushTeknologiteknologi](https://en.wikipedia.org/wiki/Push_technology): Ved brug afERDDAP's[Abonnementstjenester](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions), andre dataservere kan få besked, så snart nye data er tilgængelige, så de kan anmode om dataene (ved at trække dataene) .
*   ERDDAP's[EDDGridFraErddap](/docs/server-admin/datasets#eddfromerddap)og og og[EDDTableFraErddap](/docs/server-admin/datasets#eddfromerddap)Brug af brugERDDAPAbonnementstjenester og[flagsystem](#flag)så det vil blive underrettet umiddelbart, når nye data er tilgængelige.
* Du kan kombinere disse til stor effekt: hvis du pakker enEDDGridKopier rundt om enEDDGridFraErddap datasæt (eller indpakning af en EDDTableCopy omkring en EDDTableFraErddap datasæt) ,ERDDAP™vil automatisk oprette og vedligeholde en lokal kopi af en andenERDDAP's datasæt.
* Da abonnementstjenesterne arbejder så snart nye data er tilgængelige, vil push-teknologi sprede data meget hurtigt (inden for få sekunder) .

Denne arkitektur sætter hverERDDAP™Administrator med henblik på at afgøre, hvor oplysningerne for hans/hendesERDDAP™kommer fra.

* Andre andreERDDAP™Administratorer kan gøre det samme. Der er ikke behov for koordinering mellem administratorer.
* Hvis mangeERDDAP™Administratorer linker til hinandensERDDAPs, et datadistributionsnet dannes.
* Data vil blive hurtigt, effektivt og automatisk formidlet fra datakilder (ERDDAPs og andre servere) til datadistributionssteder (ERDDAPs s s) overalt i netværket.
* En givenERDDAP™kan være både en kilde til data til nogle datasæt og en omfordelingswebsted for andre datasæt.
* Det resulterende netværk svarer til omkring datadistributionsnetværk oprettet med programmer som[UnidataVærelserne er udstyrede med private badeværelser.](https://www.unidata.ucar.edu/projects/index.html#idd), men mindre stiv strukturelt.
         
### Sikkerhed, godkendelse og godkendelse{#security-authentication-and-authorization} 
Som standard,ERDDAP™kører som en helt offentlig server (ved brug afhttpog/ellerhttps) uden login ([Godkendelse af godkendelse](https://en.wikipedia.org/wiki/Authentication)) system og ingen begrænsninger for dataadgang ([Godkendelse af tilladelse](https://en.wikipedia.org/wiki/Authorization)) .

#### Sikkerhed for sikkerhed{#security} 
Hvis du vil begrænse adgang til nogle eller alle datasæt til nogle brugere, kan du brugeERDDAP's indbyggede sikkerhedssystem. Når sikkerhedssystemet er i brug:

*   ERDDAP™Brug af anvendelser[rollebaseret adgangskontrol](https://en.wikipedia.org/wiki/Role-based_access_control).
    * The The The The The The TheERDDAP™Administrator definerer brugere med [&lt;Bruger&gt;] (/docs/server-admin/datasets#user) tag i tagdatasets.xml. Hver bruger har et brugernavn, en adgangskode (hvis godkendelse = brugerdefineret) , og en eller flere roller.
    * The The The The The The TheERDDAP™Administrator definerer, hvilke roller der har adgang til et givet datasæt via [&lt;tilgængeligtil&gt;] (/docs/server-admin/datasæt #accessibleto) tag i tagdatasets.xmlfor alle datasæt, der ikke bør have offentlig adgang.
* Brugerens loginstatus (og et link til at logge ind/out) vises øverst på hver webside. (Men en logget ind bruger vises tilERDDAP™at være logget ind, hvis han bruger enhttpURL.) 
* Hvis det er tilfældet&lt;baseUrl&gt;, som du angiver i din opsætning.xml er en **http** URL, brugere, der ikke er logget ind, kan brugeERDDAP's **http** URL'er. Hvis&lt;baseHttpsUrl&gt; er også angivet, brugere, der ikke er logget ind, kan også brugehttpsURL'er.
* HTTPS Only -- Hvis det er tilfældet&lt;baseUrl&gt;, som du angiver i din opsætning.xml er en **https** URL, brugere, der ikke er logget ind, opfordres (ikke tvunget) til brugERDDAP's **https** URL'er - alle links påERDDAP™websider henviser tilhttpsURL'er.
    
Hvis du vil tvinge brugere til at brugehttpsURL, tilføj en lukket linje inde i den&lt;VirtualHost \\*:80&gt; sektion i din Apache config-fil (normalthttpd.conf) f.eks.
    
```
    <VirtualHost \\*:80>
        \\[...\\]
        ServerName example.com
        Redirect permanent / https://example.com/
    </VirtualHost>
```

Hvis du ønsker, er der en ekstra metode til at tvinge brugen afhttps: [HTTP Strict Transport Sikkerhed (HSTS) ](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security). At bruge det:
    
    1. Aktiver Apache-overhoveder modulet: a2enmod overskrifter
    2. Tilføj den ekstra side til HTTPS VirtualHost-direktivet. Max-age måles på få sekunder og kan indstilles til en lang værdi.
        
```
        <VirtualHost \\*:443>
            # Guarantee HTTPS for 1 Year including Sub Domains 
            Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
    
Bemærk venligst, at denne side kun gælder på en HTTPS VirtualHost.
    
En grund til ikke at tvinge brugere til at brugehttpsURL'er er: det underliggende SSL/TLS-link tager tid til at etablere og derefter tager tid til at kryptere og dekryptere alle oplysninger, der overføres mellem brugeren og serveren. Men nogle institutioner kræverhttpskun.
    
* Brugere, der er logget ind, skal brugeERDDAP's **https** URL'er. Hvis de brugerhttpURL'er, de vises tilERDDAP™at være logget ind. Dette sikrer kommunikationens privatliv og hjælper med at forhindre[session kapløb og sidejacking](https://en.wikipedia.org/wiki/Session_hijacking).
* Alle, der ikke er logget ind, kan få adgang til og bruge de offentlige datasæt. Som standard vises private datasæt ikke på lister over datasæt, hvis en bruger ikke er logget ind. Hvis administratoren har konfigureret opsætning.xml's&lt;listePrivateDatasets&gt; for at tro, de vil vises. Forsøg på at anmode data fra private datasæt (hvis brugeren kender webadressen) vil blive omdirigeret til loginsiden.
* Enhver, der er logget ind, vil være i stand til at se og anmode data fra enhver offentlig datasæt og enhver privat datasæt, som deres rolle giver dem adgang. Som standard har private datasæt, som en bruger ikke har adgang til, ikke vises på lister over datasæt. Hvis administratoren har konfigureret opsætning.xml's&lt;listePrivateDatasets&gt; for at tro, de vil vises. Forsøg på at anmode data fra private datasæt, som brugeren ikke har adgang, bliver omdirigeret til loginsiden.
* The The The The The The TheRSSOplysninger til fuldt private datasæt er kun tilgængelige for brugere (og og ogRSSlæsere) hvem er logget ind og godkendt til at bruge disse datasæt. Dette gørRSSIkke meget nyttigt for fuldt private datasæt.
    
Hvis et datasæt er privat, men dets [&lt;GraferAccessibleTo&gt;] (/docs/server-admin/datasets#graphsaccessibleto) er indstillet til offentligheden, datasættetsRSSer tilgængelig for alle.
    
* E-mail-abonnementer kan kun konfigureres, når en bruger har adgang til et datasæt. Hvis en bruger abonnerer på et privat datasæt, fortsætter abonnementet med at fungere efter brugeren har logget ud.

##### Opsætning af sikkerhed{#setup-security} 
For at konfigurere sikkerheds-/autentiseringssystemet:

* Gør standardenERDDAP™ [indledende opsætning](/docs/server-admin/deploy-install).
* I nærheden af In In In In In In In In In In In In In In[opsætning.xml](/docs/server-admin/deploy-install#setupxml),
    * Tilføj/ændre&lt;Ansættelse&gt; værdi fra intet til brugerdefineret (Brug ikke dette) e-mail (Brug ikke dette) , Google (anbefalet anbefalet) , eller (anbefalet anbefalet) , eller oauth2 (som er google+orcid, anbefalet) . Se nedenstående kommentarer.
    * Tilføj/ændre&lt;baseHttpsUrl&gt; værdi.
    * Indsæt/ubrug&loginInfo;i in in in in&lt;StartBodyHtml&gt; for at vise brugerens log ind / ud info på toppen af hver webside.
* Til test af formål på din personlige computer,[Følg disse instruktioner for at konfigurere tomcat til at understøtte SSL](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html)  (grundlaget forhttpsForbindelsesforbindelser) ved at oprette en nøglebutik med en[selvsigned certifikat](https://en.wikipedia.org/wiki/Self-signed_certificate)og ved at ændre *Tomcat* /conf/server.xml til at undlade forbindelsen til port 8443. På Windows skal du flytte .keystore fra "c: "Brugere" *dig du* "keystore" til "c: "Brugere"Default Bruger".keystore" eller "c:".keystore" (Se se *Tomcat* /logs/catalina. *i dag i dag* .log, hvis programmet ikke indlæses, eller brugerne ikke kan se log på side) . Du kan se, hvornår certifikatet udløber ved at undersøge certifikatet, når du logger ind.
    
For en offentligt tilgængelig server, i stedet for at bruge et selvsigned certifikat, anbefales det kraftigt, at du køber og installerer et certifikat, der er underskrevet af en[certifikat myndighed](https://en.wikipedia.org/wiki/Certificate_authority), fordi det giver dine kunder mere sikkerhed for, at de faktisk er forbundet til dine kunderERDDAP™, ikke en mand-in-the-middle version af dinERDDAP. Mange sælgere sælger digitale certifikater. (Søg efter web.) De er ikke dyre.
    
* På Linux-computere, hvis Tomcat kører i Apache, ændre /etc /httpd/conf.d/ssl.conf-filen til at tillade HTTPS-trafik til/fraERDDAP™uden at kræve :8443 portnummeret i URL:
    1. Ændre den eksisterende&lt;VirtualHost&gt; tag (hvis der er en)  eller tilføje en i slutningen af filen, så den mindst har disse linjer:
```
        <VirtualHost \\_default\\_:443>
            SSLEngine on
            SSLProxyEngine On
            ProxyPass /erddap http://localhost:8443/erddap
            ProxyPassReverse /erddap http://localhost:8443/erddap
        </VirtualHost>
```

    2. Genstart derefter Apache: /usr/sbin/apachectl -k yndefuld (Men nogle gange er det i en anden mappe) .
* I nærheden af In In In In In In In In In In In In In In *Tomcat* /conf/server.xml, uoverensstemmelse havnen=8443&lt;Connector&gt; tag:
```
    <Connector port="8443" 
        protocol="org.apache.coyote.http11.Http11NioProtocol"
        maxThreads="150" SSLEnabled="true">
        <SSLHostConfig>
        <Certificate certificateKeystoreFile="conf/localhost-rsa.jks" 
            type="RSA" />
        </SSLHostConfig>
    </Connector>
```
og ændre placeringen af certifikatKeystoreFile.
##### Udførelse{#authorization} 
*   [I nærheden af In In In In In In In In In In In In In Indatasets.xml, oprette en](#authorization)[ []&lt;Bruger&gt;] (/docs/server-admin/datasets#user) tag for hver bruger med brugernavn, adgangskode (hvis tilladelse=kunde) , og roller information. Dette er godkendelsesdelen afERDDAP's sikkerhedssystem.
     
* I nærheden af In In In In In In In In In In In In In Indatasets.xmlTilføj en [&lt;tilgængeligtil&gt;] (/docs/server-admin/datasæt #accessibleto) tag til hvert datasæt, der ikke bør have offentlig adgang.&lt;AccessTo&gt; lader dig angive, hvilke roller der har adgang til det datasæt.
     
* Genstart Tomcat. Har du lyst? Tjek Tomcat-logerne.
     
* Tjek din indsats&#33; Enhver fejl kunne føre til en sikkerhedsfejl.
     
* Tjek, at loginsiden brugerhttps  (Ikke ikkehttp) . Forsøg at logge ind viahttpbør automatisk blive omdirigeret tilhttpsog port 8443 (selvom portnummeret kan være skjult via en Apache proxy) . Du skal muligvis arbejde med din netværksadministrator for at tillade eksterne webanmodninger at få adgang til port 8443 på din server.
     
* Du kan ændre ændringen&lt;Bruger&gt; og&lt;tilgængeligeTo&gt; tags til enhver tid. Ændringerne vil blive anvendt på den næste regelmæssige genindlæsning af datasæt, eller ASAP, hvis du bruger en[flag flag flag flag](#flag).

##### Autenticering{#authentication} 
[ **Autenticering (Log ind) ** ](#authentication)  
Hvis du ikke ønsker at tillade brugere at logge ind, skal du ikke angive en værdi for&lt;Godkendelse&gt; i opsætning.xml.
Hvis du ønsker at tillade brugere at logge ind, skal du angive en værdi for&lt;Godkendelse&gt;. I øjeblikket,ERDDAP™understøtter
[brugerdefinerede](#custom)  (Brug ikke dette) ,
[e-mail](#email)  (Brug ikke dette) ,
[Google google](#google)  (anbefalet anbefalet) ,
[orcid](#orcid)  (anbefalet anbefalet) , og
[I nærheden af oauth2](#oauth2)  (anbefalet anbefalet) til godkendelsesmetoden.
Hvis du vil aktivere logning i, anbefaler vi stærkt google, orcid eller oauth2 muligheder, fordi de frigør dig fra at gemme og håndtere brugers adgangskoder (nødvendig for custom) og er mere sikker end e-mail mulighed. Husk, at brugerne ofte bruger den samme adgangskode på forskellige websteder. Så de kan bruge den samme adgangskode til din adgangskodeERDDAP™som de gør på deres bank. Det gør deres adgangskode meget værdifuldt - meget mere værdifuldt for brugeren end blot de data, de anmoder om. Så du skal gøre så meget, som du kan holde adgangskoderne private. Det er et stort ansvar. e-mailen, google ellercid, og oauth2 muligheder tager sig af adgangskoder, så du ikke behøver at indsamle, gemme eller arbejde med dem. Så du er frigjort fra det ansvar.

Alle&lt;Indstillinger for godkendelse&gt;[Cookie cookie](https://en.wikipedia.org/wiki/HTTP_cookie)på brugerens computer, så brugerens browser skal være indstillet til at tillade cookies. Hvis en bruger laverERDDAP™anmodninger fra et computerprogram (Ikke en browser) , cookies og godkendelse er svære at arbejde med. Det er et almindeligt problem med alle godkendelsessystemer. Desværre.

Detaljerne om&lt;Godkendelse&gt; Valgmuligheder er:

###### Tilpasset tilpasset{#custom} 
brugerdefinerede erERDDAP's custom system til at lade brugerne logge ind ved at indtaste deres brugernavn og adgangskode i en formular på en webside. Hvis en bruger forsøger at logge ind på 3 gange inden for 10 minutter, blokeres brugeren fra at forsøge at logge på i 10 minutter. Dette forhindrer hackere fra blot at prøve millioner af adgangskoder, indtil de finder den rigtige.

Dette er noget sikkert, fordi brugernavn og adgangskode overføres viahttps  (Ikke ikkehttp) , men godkendelse=google, orcid eller oauth2 er bedre, fordi de fri dig fra at skulle håndtere adgangskoder. Den brugerdefinerede tilgang kræver, at du indsamler en brugers navn og en hash fordøje af deres adgangskode (Brug din telefon&#33; e-mail er ikke sikker&#33;) og gemme dem idatasets.xmli [&lt;Bruger&gt;] (/docs/server-admin/datasets#user) tags.

Med den brugerdefinerede mulighed kan ingen logge ind, indtil du (te te te teERDDAP™Administrator) Opret en&lt;Bruger&gt; tag for brugeren, angive brugernavnet som brugernavnet, hash fordøjes af deres adgangskode som adgangskode og deres roller.

Ikke anbefalet
På grund af den akavethed af at generere og overføre hash fordøje af brugerens adgangskode og på grund af de risici, der er forbundet medERDDAP™At holde hash fordøje af adgangskoder, denne mulighed anbefales ikke.

For at øge sikkerheden af denne mulighed:

* Du skal sørge for, at andre brugere på serveren (f.eks. Linux-brugere, ikkeERDDAP™brugere) kan ikke læse filer i Tomcat-mappen (isærdatasets.xmlfil&#33;) eller eller ellerERDDAP's storeParentDirectory.
På Linux, som bruger=tomcat, brug:
chmod -R g-rwx *bigParentDirectory*   
chmod -R o-rwx *bigParentDirectory*   
chmod -R g-rwx *TomcatDirectory*   
chmod -R o-rwx *TomcatDirectory*   
     
* Brug UEPSHA256 til at&lt;Adgangskode nulstilling&gt; i opsætning.xml.
     
* Brug en så usikker metode til at videregive hash fordøjet af brugerens adgangskode fra brugeren til brugerenERDDAP™Administrator (telefon?) .
         
###### e-mail{#email} 
E-mailgodkendelsen bruger en brugerkonto til at godkende brugeren (ved at sende dem en e-mail med et særligt link, som de skal tilgå for at logge ind) . I modsætning til andre e-mails, derERDDAP™Sende,ERDDAP™Skriv ikke disse invitationsmails til e-mail-filen, fordi de indeholder fortrolige oplysninger.
I teorien er dette ikke meget sikkert, fordi e-mails ikke altid er krypteret, så en dårlig fyr med evnen til at opfange e-mails kan misbruge dette system ved at bruge en gyldig brugers e-mailadresse og opfange invitationsmailen.
I praksis, hvis du opsætterERDDAP™at bruge en Google-mail-konto til at sende e-mails, og hvis du indstiller det til at bruge en af TLS-indstillingerne til forbindelsen, og hvis brugeren har en Google-mail-konto, er dette noget sikkert, fordi e-mails krypteres hele vejen fraERDDAP™til brugeren.

For at øge sikkerheden af denne mulighed:

* Sørg for, at andre brugere på serveren (f.eks. Linux-brugere, ikkeERDDAP™brugere) kan ikke læse filer i Tomcat-mappen ellerERDDAP's storeParentDirectory.
På Linux, som bruger=tomcat, brug:
chmod -R g-rwx *bigParentDirectory*   
chmod -R o-rwx *bigParentDirectory*   
chmod -R g-rwx *TomcatDirectory*   
chmod -R o-rwx *TomcatDirectory*   
     
* Indstil tingene op for at få end-to-end sikkerhed for de e-mails, der sendes fraERDDAP™til brugerne. Du kan f.eks. foretage et Google-centrisk system ved kun at oprette&lt;Bruger&gt; tags for Google-managed e-mail-adresser og ved at konfigurere dineERDDAP™at bruge en Google-mail-server via en sikker/TLS-forbindelse: i din opsætning.xml, brug f.eks.
```
    <emailSmtpHost>smtp.gmail.com</emailSmtpHost>  
    <emailSmtpPort>587</emailSmtpPort>  
    <emailProperties>mail.smtp.starttls.enable|true</emailProperties>
```

Ikke anbefalet
Din e-mailgodkendelse er ikke anbefalet. Brug venligst google, orcid eller oauth2 mulighed i stedet.

Som med google, orcid og oauth2 muligheder, e-mail er meget praktisk forERDDAP™Administratorer - du behøver ikke nogensinde at beskæftige sig med adgangskoder eller deres hash fordøjes. Alt hvad du behøver for at oprette er en [&lt;Bruger&gt;] (/docs/server-admin/datasets#user) tag for en bruger idatasets.xmler brugerens e-mailadresse, somERDDAP™Brug som brugerens navn. (Adgangskode attributten bruges ikke, når godkendelse=email, google ellercid eller oauth2.) 

Med e-mail-indstillingen, kun brugere, der har en&lt;Bruger&gt; tag idatasets.xmlkan forsøge at logge ind påERDDAP™ved at give deres e-mailadresse og klikke på linket i den e-mail, somERDDAP™sender dem.

ERDDAP™Behandle e-mail adresser som case-infølsomme. Det gør dette ved at konvertere e-mail-adresser, du indtaster (in)&lt;Bruger&gt; tags) eller brugere indtaster (på loginformularen) til deres alle undermapper version.

Sådan konfigureres godkendelse=email:

1. I din opsætning.xml skal du ændre indstillingen&lt;baseHttpsUrl&gt; tag værdi.
Til eksperimentering/arbejde på din personlige computer, brug
     https://localhost:8443   
Til din offentligeERDDAP™, brug
     https://*your.domain.org*:8443   
eller uden :8443, hvis du bruger en Apache[proxypass](/docs/server-admin/deploy-install#proxypass)så portnummeret ikke er nødvendig.
     
2. I din opsætning.xml skal du ændre indstillingen&lt;Godkendelse&gt; Mærkes værdi til e-mail:
```
    <authentication>email</authentication>  
```

3. I din opsætning.xml skal du sørge for, at e-mail-systemet er oprettet via alle af e-mailen.&lt;mail...&gt; tags, så atERDDAP™kan sende e-mails. Hvis det er muligt, skal du indstille dette op til at bruge en sikker forbindelse (SSL / TLS) til e-mailserveren.
     
4. I din indbakkedatasets.xmlOpret [&lt;Bruger&gt;] (/docs/server-admin/datasets#user) tags for hver bruger, der vil have adgang til private datasæt.
Brug brugerens e-mailadresse som brugernavnet i mærket.
Angiv ikke adgangskode attributten i brugernavnet.
     
5. Genstart genstartERDDAP™så ændringerne til opsætning.xml ogdatasets.xmltage virkning.
         
###### Google, orcid, oauth2{#google-orcid-oauth2} 
*   [ **Google google** ](#google),[ **orcid** ](#orcid), og[ **I nærheden af oauth2** ](#oauth2)   (anbefalet anbefalet)   
Alle tre af disse muligheder er den anbefaledeERDDAP™Indstillinger for godkendelse. De er alle de mest sikre muligheder. De andre muligheder har signifikant svagere sikkerhed.
     
###### Google Google Google Google{#google} 
* Indstillinger for Google-godkendelse[Log ind Med Google](https://developers.google.com/identity/gsi/web/guides/overview), som er en implementering af[OAuth 2.0 godkendelse protokol](https://oauth.net/2/).ERDDAP™Brugere logger ind på deres Google-mail-konto, herunder Google-managed-konti såsom@noaa.govKontoer. Dette giver mulighed forERDDAP™at bekræfte brugerens identitet (navn og e-mailadresse) og få adgang til deres profilbillede, men giver ikkeERDDAP™adgang til deres e-mails, deres Google Drive eller andre private oplysninger.
    
For For For For ForERDDAP™v2.22 og nedenfor,ERDDAP™"Google Sign-In". Google siger, at systemet er forældet efter 31. marts 2023. Hvis du ikke allerede har gjort det, skal du skifte tilERDDAP™v2.23+ for at bruge det nye "Log ind med Google"-baseret godkendelsessystem.
    
For For For For ForERDDAP™v2.23 forekomster med en Content-Sikkerhed-Policy konfigureret og brug af Google Authentication, skal du tilføje https://accounts.google.com til listen over tilladt script-src (eller script-src-elem) .ERDDAP™ikke længere brug https://apis.google.com , så hvis du har det tilladt, kan du være i stand til at fjerne det nu.
    
For For For For ForERDDAP™v2.24+ kan du også bruge til at tilføje https://accounts.google.com/gsi/style til stlye-src og https://accounts.google.com/gsi/ at oprette forbindelse. Til script-src kan du nu bruge https://accounts.google.com/gsi/client.
 
    
For mere information kan du gå til den[Google-side](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)om CSP konfiguration. Hvis du har spørgsmål, kan du kontakte chris.john på noaa.gov.
         
###### Orcid{#orcid} 
* Muligheden for godkendelse[Orcid-godkendelse](https://members.orcid.org/api/integrate/orcid-sign-in), som er en implementering af[OAuth 2.0 godkendelse protokol](https://oauth.net/2/).ERDDAP™Brugere logger ind på deres[Orcid-konto](https://members.orcid.org/api/integrate/orcid-sign-in), som ofte anvendes af forskere til at identificere sig selv. Dette giver mulighed forERDDAP™at verificere brugerens identitet og få deres Orcid-kontonummer, men giver ikkeERDDAP™adgang til deres andre Orcid-kontooplysninger.

###### Oauth2{#oauth2} 
* oauth2 mulighed lader brugerne logge ind med enten deres Google-konto eller deres Orcid-konto.

Google, orcid og oauth2 muligheder er efterfølgerne til den åbne løsning, som blev afbrudt efterERDDAP™version 1.68, og som var baseret på en version af åben ID, der nu er forældet. Skift til Google, orcid eller oauth2 valgmulighed.

Disse muligheder er meget praktiske forERDDAP™Administratorer - du behøver ikke nogensinde at beskæftige sig med adgangskoder eller deres hash fordøjes. Alt hvad du behøver for at oprette er en [&lt;Bruger&gt;] (/docs/server-admin/datasets#user) tag for en bruger idatasets.xmlsom angiver brugerens Google-mailadresse eller Orcid-kontonummer som brugernavn attributten. (Adgangskode attributten bruges ikke, når godkendelse=email, google ellercid eller oauth2.) 

Med disse muligheder kan alle logge ind for atERDDAP™ved at logge ind på deres Google-mail-konto eller Orcid-konto, men ingen vil have ret til at få adgang til private datasæt, indtil du (te te te teERDDAP™Administrator) Opret en&lt;Bruger&gt; tag, angive deres Google-mailadresse eller Orcid-kontonummer som brugernavnet og angive deres roller.

ERDDAP™Behandle e-mail adresser som case-infølsomme. Det gør dette ved at konvertere e-mail-adresser, du indtaster (in)&lt;Bruger&gt; tags) eller brugere indtaster (på loginformularen) til deres alle undermapper version.

For at oprette Google, orcid eller oauth2 godkendelse:

* I din opsætning.xml skal du ændre indstillingen&lt;baseHttpsUrl&gt; tag værdi.
Til eksperimentering/arbejde på din personlige computer, brug
     https://localhost:8443   
Til din offentligeERDDAP™, brug
     https://*your.domain.org*:8443   
eller bedre, uden :8443, hvis du bruger en Apache[proxypass](/docs/server-admin/deploy-install#proxypass)så portnummeret ikke er nødvendig.
     
* I din opsætning.xml skal du ændre indstillingen&lt;Godkendelse&gt; tags værdi til google, orcid eller oauth2, for eksempel:
```
    <authentication>oauth2</authentication>  
```
###### Google-opsætning{#google-setup} 
* Til Google og oauth2 muligheder:
Følg instruktionerne herunder for at oprette Google-godkendelse til din computer.ERDDAP.
     
    1. Hvis du ikke har en Google-mail-konto,[Opret en](https://www.google.com/intl/en_us/mail/help/about.html)  
         
    2. Følg Følg Følg Følg[disse instruktioner](https://developers.google.com/identity/sign-in/web/devconsole-project)Opret et Google Developers Console-projekt og få et klient-id.
        
Når Google-formularen beder om godkendtJavaScript oprindelser, indtast værdien fra&lt;baseHttpsUrl&gt; fra din personlige computerERDDAP™opsætning.xml, f.eks.
         https://localhost:8443   
På en anden linje, tilføje tilføjelsen&lt;baseHttpsUrl&gt; fra din offentligeERDDAP™opsætning.xml, f.eks.
         https://*your.domain.org*:8443
 
        
Angiv ikke nogen Authorized redirect URIs.
        
Når du ser dit klient-id til dette projekt, skal du kopiere og indsætte det i din opsætning.xml (normalt lige nedenfor).&lt;autentificering&gt; at bestilles, men placering er ikke noget, i&lt;GoogleClientID&gt; tag, f.eks.
        &lt;GoogleClientID&gt; *Din ClientID* &lt;/googleClientID&gt;
Klient-id'et vil være en streng af omkring 75 tegn, sandsynligvis begynde med flere cifre og slutter med .apps.googleusercontent.com .
         
        
    3. I din indbakkedatasets.xmlOpret en [&lt;Bruger&gt;] (/docs/server-admin/datasets#user) tag for hver bruger, der vil have adgang til private datasæt. For brugernavn attributten i mærket:
        
        * For brugere, der vil logge ind med google, skal du bruge brugerens Google-mailadresse.
        * For brugere, der logger ind med orcid, skal du bruge brugerens Orcid-kontonummer (med puder) .
        
Angiv ikke adgangskode attributten for brugertag.
         
    4. Genstart genstartERDDAP™så ændringerne til opsætning.xml ogdatasets.xmltage virkning.
         
###### Orcid opsætning{#orcid-setup} 
* Til orcid og oauth2 muligheder:
Følg instruktionerne herunder til at oprette Orcid-godkendelse for dinERDDAP.
     (For detaljer, se[Orcid's godkendelse API-dokumentation](https://members.orcid.org/api/integrate/orcid-sign-in).)   
     
    1. Hvis du ikke har en Orcid-konto,[Opret en](https://orcid.org/signin)  
         
    2. Log ind Orcid[ https://orcid.org/signin ](https://orcid.org/signin)Brug din personlige Orcid-konto.
         
    3. Klik på "Developer Tools" (under "For forskere" på toppen) .
         
    4. Klik på "Tilmeld dig gratis ORCID offentlig API". Indtast disse oplysninger:
Navn:ERDDAP™spiste på\\[din organisation\\]  
Hjemmeside:\\[Dit din egenERDDAP's domæne\\]  
Beskrivelse:ERDDAP™er en videnskabelig dataserver. Brugere skal godkende med Google eller Orcid for at få adgang til ikke-offentlige datasæt.
Angiv URI'er:\\[Dit din egenERDDAP's domæne\\]/erddap/loginOrcid.html
         
    5. Klik på ikonet Gem (det ligner en 3,5" disk&#33;) .
Du kan derefter se din ORCID APP Client ID og ORCID Client Secret.
         
    6. Kopier og indsæt ORCID APP Client ID (som vil starte med "APP-") i opsætning.xml i te&lt;orcidClientID&gt; tag, f.eks.
```
        <orcidClientID>APP-*ALPHANUMERICCHARACTERS*</orcidClientID>
```
    7. Kopier og indsæt ORCID Client Secret (nedrecase alfanumeriske tegn med bindestreger) i opsætning.xml i te&lt;orcidClientSecret&gt; tag, f.eks.
```
        <orcidClientSecret>*alpha-numeric-characters-with-dashes*</orcidClientSecret>
```

    8. I din indbakkedatasets.xmlOpret en [&lt;Bruger&gt;] (/docs/server-admin/datasets#user) tag for hver bruger, der vil have adgang til private datasæt. For brugernavn attributten i mærket:
        
        * For brugere, der vil logge ind med google, skal du bruge brugerens Google-mailadresse.
        * For brugere, der logger ind med orcid, skal du bruge brugerens Orcid-kontonummer (med puder) .
        
Angiv ikke adgangskode attributten for brugertag.
         
    9. Genstart genstartERDDAP™så ændringerne til opsætning.xml ogdatasets.xmltage virkning.
             

###### Log ind på en eller anden måde{#log-in-either-way} 
Hvis du bruger Google, orcid eller oauth2 godkendelsesmuligheder, og Google Sign-In eller Orcid's Authentication API pludselig ophører med at arbejde (uanset årsag) eller ophører med at arbejde somERDDAP™forventer, at brugerne ikke kan logge ind på din kontoERDDAP. Som midlertidig (eller permanent) løsning, kan du bede brugerne om at tilmelde dig med det andet system (få en Google-mail-konto, eller få en Orcid-konto) . For at gøre dette:

1. Ændre ændringen&lt;Godkendelse&gt; tag så det giver det andet godkendelsessystem. oauth2 mulighed giver brugerne mulighed for at logge ind med enten system.
2. Dubler hver af&lt;Bruger&gt; tags og ændre brugernavn attributten fra Google-mail-adressen til det tilsvarende Orcid-kontonummer (eller omvendt) , men holde roller attributten den samme.

###### Åbn filen{#openid} 
ERDDAP™understøtter ikke længere den åbne godkendelsesindstilling, som var baseret på en version af åben ID, der nu er forældet. Brug venligst google, orcid eller oauth2 muligheder i stedet.

###### BASIC{#basic} 
ERDDAP™understøtter ikke BASIC-godkendelse, fordi:
* BASIC virker gearet til foruddefinerede websider, der har brug for sikker adgang eller tæppe på/fra adgang til hele webstedet, menERDDAP™tillader mulighed (Begrænset adgang) Datasæt, der skal tilføjes på farten.
* BASIC-godkendelse tilbyder ikke en måde for brugere at logge ud&#33;
* BASIC-godkendelse er kendt for at være ikke sikker.

##### Sikker datakilder{#secure-data-sources} 
Hvis et datasæt er at have begrænset adgang tilERDDAP™Brugere, datakilden (hvorfraERDDAP™få data) bør ikke være offentligt tilgængelige. Så hvordan kan duERDDAP™få data til begrænsede datasæt? Nogle muligheder er:

*   ERDDAP™kan tjene data fra lokale filer (f.eks. via EDDTable FraFiles ellerEDDGridFraFiles) .
     
*   ERDDAP™Kan være i en[DMZ](https://en.wikipedia.org/wiki/Demilitarized_zone_(computing)) og datakilden (f.eks. en a.OPeNDAPserver eller database) kan være bag en[firewall firewall](https://en.wikipedia.org/wiki/Firewall), hvor det er tilgængeligt forERDDAP™men ikke til offentligheden.
     
* Datakilden kan være på et offentligt websted, men kræver et login for at få dataene. De to typer datasæt, derERDDAP™Log på for at få adgang til[EDDTableFraDatabase](/docs/server-admin/datasets#eddtablefromdatabase)og og og[EDDTableFraCassandra](/docs/server-admin/datasets#eddtablefromcassandra). Disse datasæt understøtter (og bør altid bruge) Brugernavne (Opret enERDDAP™bruger, der kun har læserettigheder) , adgangskoder, SSL-forbindelser og andre sikkerhedsforanstaltninger.
    
Men generelt, i øjeblikket,ERDDAP™kan ikke håndtere disse datakilder, fordi det ikke har nogen bestemmelser til at logge på datakilden. Dette er grunden til, at adgang til[EDDGridFra Erddap og EDDTable FraErddap](/docs/server-admin/datasets#eddfromerddap)Datasets kan ikke begrænses. I øjeblikket, den lokaleERDDAP™har ingen måde at logge ind og få adgang til metadataoplysningerne fra fjernbetjeningenERDDAP. Og sætte "remote"ERDDAP™bag din firewall og fjerne den datasæt's tilgængelige Hvis restriktioner ikke løser problemet: Da brugeren anmoder om EDDXxx FraErddap-data skal omdirigeres til fjernbetjeningenERDDAP™, fjernbetjeningenERDDAP™skal være tilgængelig.
    
#### Mod Hackere{#defenses-against-hackers} 
Der er dårlige fyr hackere, der forsøger at udnytte sikkerhedssvagheder i server software somERDDAP.ERDDAP™følger den fælles sikkerhedsrådgivning for at have flere lag af forsvar:

* Begrænsede Privileges -- Et af de vigtigste forsvar er at køre Tomcat via en bruger kaldet tomcat, der ikke har en adgangskode (så ingen kan logge ind som den bruger) og har begrænsede filsystemrettigheder (f.eks. læsebeskyttet adgang til dataene) . Se endnuERDDAP's instruktioner til[opsætning af tomcat](/docs/server-admin/deploy-install#tomcat).
* Kraftig brug - Generelt,ERDDAP™er bygget til tung brug, herunder af scripts, der gør titusinder af anmodninger, en efter en anden. Det er svært forERDDAP™til samtidig at åbne sig op til tung legitim brug og skjold sig fra misbrug. Det er nogle gange svært at differentiere tung legitim brug, overdreven legitim brug og illegitimate brug (og nogle gange er det virkelig nemt) . Blandt andre forsvar,ERDDAP™bevidst tillader ikke en enkelt anmodning om at bruge en inordinate fraktion af systemets ressourcer (med mindre systemet ikke er aktivt) .
* Identificer Troublesome Brugere - HvisERDDAP™er langsommere eller nedfrysning (måske fordi en naiv bruger eller en bot kører flere scripts til at indsende flere anmodninger samtidigt eller måske på grund af en dårlig fyrs[Denial-of-service](https://en.wikipedia.org/wiki/Denial-of-service_attack)angreb angreb) , du kan se på[Daglig rapport e-mail](#daily-report)  (og hyppigere identiske oplysninger i[ERDDAP™logfil](#log)) som viser antallet af anmodninger fra de mest aktive brugere (Se "Requester's IP Adresse (tilladt) " " " ") .ERDDAP™sender også e-mails til administratoren, når der er["Usædvanlig aktivitet: &gt;25% af anmodninger mislykkedes"](#failed-requests). Du kan så kigge ind iERDDAP™logfil for at se karakteren af deres anmodninger. Hvis du føler, at nogen gør for mange anmodninger, bizarre anmodninger (du ville ikke tro, hvad jeg har set, godt, måske ville du) , eller angreb-type anmodninger, kan du tilføje deres IP-adresse til blacklist.
* Sortlist -- Du kan tilføje IP-adressen på besværlige brugere, bots og[Denial-of-service](https://en.wikipedia.org/wiki/Denial-of-service_attack)angribere til deERDDAP [blacklist](/docs/server-admin/datasets#requestblacklist), så fremtidige anmodninger fra dem straks vil blive afvist. Denne indstilling er idatasets.xmlså du hurtigt kan tilføje en IP-adresse til listen og derefter[flag flag flag flag](#flag)et datasæt, såERDDAP™straks meddelelser og anvende ændringen. Fejlmeddelelsen sendt til blacklistede brugere opfordrer dem til at kontakte deERDDAP™Administrator, hvis de føler, at de er blevet fejlagtigt sat på blacklist. (I vores erfaring har flere brugere været uvidende om, at de kørte flere scripts samtidigt, eller at deres scripts gjorde ikke anmodninger.) 
* Dataset Security - Nogle typer datasæt (Især EDDTableFraDatabase) Yderligere sikkerhedsrisici (f.eks. SQL injektion) og har deres egne sikkerhedsforanstaltninger. Se oplysningerne for disse typer datasæt i[Arbejde med arbejdetdatasets.xmlFilen fil](/docs/server-admin/datasets), især[EDDTableFraDatabase sikkerhed](/docs/server-admin/datasets#database-security).
* Sikkerhedsrevision -- Selv om selvomNOAAIT-sikkerhed afviste vores anmodninger om scanninger i årevis, de nu rutinemæssigt scanne min (I nærheden af Bob's)  ERDDAP™installation. Selvom de første scanninger fandt nogle problemer, som jeg så faste, har efterfølgende scanninger ikke fundet problemer medERDDAP. scanningerne bekymrer sig om en masse ting: særligt, databledapanmodninger ligner SQL-anmodninger, de bekymrer sig om SQL-indsprøjtning sårbarheder. Men disse bekymringer er ubegrundet, fordiERDDAP™altid parses og validerer forespørgsler og derefter separat opbygger SQL-forespørgsel på en måde, der undgår injektionssårbarheder. Det andet, de undertiden klager over, er, at voresJavaversion eller Tomcat versioner er ikke så opdateret som de ønsker, så vi opdaterer dem som svar. Jeg har tidligere tilbudt at vise folk sikkerhedsrapporter, men jeg har nu fortalt, at jeg ikke kan gøre det.

#### Spørgsmål? Forslag?{#questions-suggestions} 
Hvis du har spørgsmål tilERDDAP's sikkerhedssystem eller har spørgsmål, tvivl, bekymringer eller forslag om, hvordan det er konfigureret, se vores[sektion om at få ekstra støtte](/docs/intro#support).
    

## Ting du behøver ikke at vide{#things-you-dont-need-to-know} 

Disse er detaljer, at du ikke behøver at vide, indtil et behov opstår.

### AndetERDDAP™ {#second-erddap} 
*    **Opsætning af et sekundERDDAP™Til test/udvikling**   
Hvis du vil gøre dette, er der to tilgange:
    *    (Bedste) Installer Tomcat ogERDDAP™på en anden computer end den computer, der har din offentligeERDDAP. Hvis du bruger din personlige computer:
        1. Gør installationen et trin på et tidspunkt. Få Tomcat op og køre først.
Når Tomcat kører, skal Tomcat Manager være på
            [ http://127.0.0.1:8080/manager/html/ ](http://127.0.0.1:8080/manager/html/)  (eller måske[ http://localhost:8080/manager/html/ ](http://localhost:8080/manager/html/)) 
        2. Installer installationERDDAP.
        3. Brug ikke ProxyPass til at fjerne portnummeret fraERDDAP™URL.
        4. I nærheden af In In In In In In In In In In In In In In[opsætning.xml](/docs/server-admin/deploy-install#setupxml), sæt baseUrl til http://127.0.0.1:8080
 
        5. Når du starter detteERDDAP™, du skal kunne se det på
            [ http://127.0.0.1:8080/erddap/status.html ](http://127.0.0.1:8080/erddap/status.html)  (eller måske[ http://localhost:8080/erddap/status.html ](http://localhost:8080/erddap/status.html)) 
#### Anden Tomcat{#second-tomcat} 
*    (Bedste) Installer en anden Tomcat på samme computer som din offentligeERDDAP.
    1. Gør installationen et trin på et tidspunkt. Få Tomcat op og køre først.
Ændre alle de portnumre, der er forbundet med den anden Tomcat (f.eks., skift 8080 til 8081)   (Se det her[Flere Tomcat Instances sektion](https://tomcat.apache.org/tomcat-8.0-doc/RUNNING.txt)halvvejs gennem dette dokument) .
    2. Installer installationERDDAP™i den nye Tomcat.
    3. Brug ikke ProxyPass til at fjerne portnummeret fraERDDAP™URL.
    4. I nærheden af In In In In In In In In In In In In In In[opsætning.xml](/docs/server-admin/deploy-install#setupxml), sæt baseUrl til http://www.*yourDomainName*:8081
 
    5. Når du starter detteERDDAP™, du skal kunne se det på
         http://www.*yourDomainName*:8081/erddap/status.html   
             
### Solid State Drives{#solid-state-drives} 
*    **Solid State Drives (SSD'er) er fantastisk&#33;**   
Den hurtigste, nemmeste og billigste måde at fremskyndeERDDAP's adgang til tabulære data er at sætte datafiler på en Solid State Drive (SSD) . De fleste tabulære datasæt er relativt små, så en 1 eller 2 TB SSD sandsynligvis er tilstrækkelige til at holde alle datafiler for alle dine tabulære datasæt. SSD'er bruger til sidst, hvis du skriver data til en celle, slette det og skrive nye data til denne celle for mange gange. Så hvis du bare bruger din SSD til at skrive data én gang og læse det mange gange, selv en forbruger-grade SSD bør vare meget lang tid, sandsynligvis meget længere end nogen harddisk Drive (harddisk) . Forbruger-grade SSD'er er nu billig (i 2018, ~$200 for 1 TB eller ~ $ 400 for 2 TB) og priser falder stadig hurtigt. Hvornår Hvornår skal man HvornårERDDAP™adgang til en datafil, en SSD tilbyder både kortere ventetid (~0.1ms, versus ~3ms for en harddisk, versus ~10 (?) ms til en RAID, versus ~55ms til Amazon S3) og højere gennemløb (~500 MB/S, versus ~75 MB/s for en harddisk, versus ~500 MB/s for en RAID) . Så du kan få en stor præstation boost (op til 10X mod en harddisk) for $200&#33; Sammenlignet med de fleste andre mulige ændringer i dit system (en ny server til $10.000? en ny RAID for $5.000? en ny netværkskontakt til $5000? osv.) , dette er langt den bedste Return On Investment (ROI) . Hvis / når SSD dør (i 1, 2, ... 8 år) , udskifte det. Du må ikke bruge det så længe, arkivlagring af data, bare for den forreste kopi af dataene.\\[SSD's ville være fantastisk til gitterded data, også, men de fleste gitterede datasets er meget større, hvilket gør SSD meget dyrt.\\]
    
Hvis din server ikke er indlæst med hukommelse, ekstra hukommelse for din server er også en stor og relativt billig måde at fremskynde alle aspekter afERDDAP.
     
    
### [Heavy Loads / Kontrainer](#heavy-loads--constraints) **  {#heavy-loads--constraints} 
Med tung brug, en enkeltståendeERDDAP™kan være begrænset af forskellige problemer. Du kan finde flere oplysninger i afsnittet[liste over begrænsninger og løsninger](/docs/server-admin/scaling#heavy-loads--constraints).
     
### Gitter, Clusters og føderationer{#grids-clusters-and-federations} 
Under meget tung brug, en enkelt standaloneERDDAP™vil køre ind i en eller flere begrænsninger, og selv de foreslåede løsninger vil være utilstrækkelig. Til sådanne situationer,ERDDAP™har funktioner, der gør det nemt at konstruere skalerbare gitter (også kaldet klynger eller føderationer) afERDDAPs, som tillader systemet at håndtere meget tung brug (f.eks. for et stort datacenter) . For mere information, se[gitter, klynger og føderationer afERDDAPs s s](/docs/server-admin/scaling).
     
### Cloud Computing{#cloud-computing} 
Flere virksomheder begynder at tilbyde[cloud computing tjenester](https://en.wikipedia.org/wiki/Cloud_computing)  (fx,[Amazon Web Services](https://aws.amazon.com/)) .[Web hostingfirmaer](https://en.wikipedia.org/wiki/Web_hosting_service)Siden midten af1990'erne har "cloud"-tjenesterne udvidet fleksibiliteten ved systemerne og de tjenester, der tilbydes. Du kan bruge disse tjenester til at oprette en enkeltERDDAP™eller en gitter / cluster afERDDAPs til at håndtere meget tung brug. For mere information, se[cloud computing medERDDAP™](/docs/server-admin/scaling#cloud-computing).

### Amazon Amazon{#amazon} 
*    **[Amazon Web Services (AWS) Oversigt over EC2](#amazon)**   
    [Amazon Web Services (AWS) ](https://aws.amazon.com/)er en[cloud computing service](https://en.wikipedia.org/wiki/Cloud_computing)der tilbyder en bred vifte af computerinfrastruktur, som du kan leje i timen. Du kan installereERDDAP™på en måde[Elastisk Compute Cloud (EC2) ](https://aws.amazon.com/ec2/)f.eks. (deres navn for en computer, som du kan leje i timen) . AWS har en fremragende[Brugerguide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)og du kan bruge Google til at finde svar på specifikke spørgsmål, du måtte have. Brace selv - det er en fair mængde arbejde at komme i gang. Men når du får en server op og kører, kan du nemt leje så mange ekstra ressourcer (servere, databaser, SSD-space osv.) som du har brug for, til en rimelig pris.\\[Dette er ikke en anbefaling eller godkendelse af Amazon Web Services. Der er andre cloududbydere.\\]
    
Et overblik over ting, du skal gøre for at fåERDDAP™løb på AWS er:
    
    * Generelt vil du gøre alle de ting, der er beskrevet i de[Brugerguide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html).
    * Angiv en AWS-konto.
    * Angiv en AWS-bruger inden for denne konto med administratorrettigheder. Log ind som denne bruger for at gøre alle følgende trin.
    * Elastisk blok opbevaring (EBS) AWS svarer til en harddisk knyttet til din server. Nogle EBS-plads vil blive tildelt, når du først opretter en EC2-instans. Det er vedvarende opbevaring -- oplysningerne er ikke tabt, når du stopper din EC2-instans. Og hvis du ændrer forekomststyper, bliver din EBS-plads automatisk knyttet til det nye eksempel.
    * Opret en Elastisk IP-adresse, så din EC2-instans har en stabil, offentlig URL (i modsætning til blot en privat URL, der ændrer hver gang du genstarter din forekomst) .
    * Oprette og starte en EF2-instans (computercomputer) . Der er en bred vifte af[instanstyper](https://aws.amazon.com/ec2/instance-types/), hver til en anden pris. En m4. stor eller m4.xlarge forekomst er kraftfuld og er sandsynligvis velegnet til de fleste anvendelser, men vælg hvad der opfylder dine behov. Du vil sandsynligvis bruge Amazons Linux som operativsystem.
    * Hvis din computer er en Windows-computer, kan du bruge[PuTTY](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html), en gratis SSH-klient til Windows, for at få adgang til din EC2-instanss kommandolinje. Eller kan du have nogle andre SSH program, som du foretrækker.
    * Når du logger ind på din EC2-instans, vil du blive logget ind som den administrative bruger med brugernavnet "ec2-bruger". ec2-user har sudo privilegier. Så når du skal gøre noget som root-brugeren, skal du bruge: sudo *nogleCommand* 
    * Hvis din computer er en Windows-computer, kan du bruge[FileZilla](https://stackoverflow.com/questions/16744863/connect-to-amazon-ec2-file-directory-using-filezilla-and-sftp), et gratis SFTP-program, til at overføre filer til / fra din EC2-instans. Eller kan du have nogle andre SFTP program, som du foretrækker.
    *   [Installer Apache](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html)på din EC2-instans.
    * Følg standarden[ERDDAP™installationsvejledning](/docs/server-admin/deploy-install).
         
### Vent såTryAgain Undtagelse{#waitthentryagain-exception} 
En bruger kan få en fejlmeddelelse som
VentDaTryAgainException:
Der var en (midlertidig?) problem. Vent et minut, og prøv igen. (Klik på knappen Reload i en browser.)   
Detaljer: GridDataAccessor.inkret: delvisResults\\[0\\]"123532800".

Den generelle forklaring på WaitDaTryAgainException er:
Hvornår Hvornår skal man HvornårERDDAP™reagerer på en brugerkonto, der kan være en uventet fejl med datasættet (f.eks. en fejl, mens du læser data fra filen, eller en fejladgang til et fjerndatasæt) . VentDaTryAgain signaler tilERDDAP™at anmodningen mislykkedes (indtil langt) men detERDDAP™bør forsøge at indlæse datasættet hurtigt (det opkald[Anmod om tilgængelighed](#requestreloadasap)) og genindrer anmodningen. Ofte, dette lykkes, og brugeren ser bare, at svaret på anmodningen var langsom. Andre gange fejler reloaden eller er for langsom, eller det efterfølgende forsøg på at håndtere anmodningen også mislykkes og kaster en anden WaitDaTryAgain. Hvis det sker,ERDDAP™markerer datasættet til at indlæse, men fortæller brugeren (via en WaitDaTryAgain Undtagelse) at der var en fejl, mens de reagerer på anmodningen.

Det er den normale adfærd. Dette system kan håndtere mange almindelige problemer.
Men det er muligt for dette system at få udløst overdrevent. Den mest almindelige årsag er, atERDDAP's indlæsning af datasættet ser ikke et problem, menERDDAP's svar på en anmodning om data ser problemet. Uanset hvad årsagen er, er løsningen for dig at håndtere hvad der er galt med datasættet. Kig i log.txt for at se de faktiske fejlmeddelelser og håndtere problemerne. Hvis mange filer har gyldige overskrifter, men ugyldige data (en ødelagt fil) , erstatte filer med ukorrupted filer. Hvis forbindelsen til en RAID er flakey, skal du rette den. Hvis forbindelsen til en fjerntjeneste er flakey, kan du finde en måde at gøre det ikke flakey eller downloade alle filer fra fjernkilden og tjene dataene fra de lokale filer.

Den detaljerede forklaring på den specifikke fejl (ovenfor) er:
For hverEDDGriddatasæt,ERDDAP™holder de akse variable værdier i hukommelsen. De bruges f.eks. til at konvertere ønskede akseværdier, der bruger " () "format i indeksnumre. For eksempel, hvis akseværdierne er "10, 15, 20, 25", en anmodning om anmodning om (20 20 20) fortolkes som anmodning om indeks #2 (0-baseret indekser) . Hvornår Hvornår skal man HvornårERDDAP™får en anmodning om data og får data fra kilden, det bekræfter, at de akseværdier, som den fik fra kilden matcher akseværdierne i hukommelsen. Normalt gør de. Men nogle gange har datakilden ændret sig på en betydelig måde: For eksempel kan indeksværdierne fra starten af aksevariablen fjernes (f.eks. "10, 15, 20, 25" kan være "20, 25, 30") . Hvis det sker, er det klart, atERDDAPtolkning af anmodningen (f.eks. " (20 20 20) " er indeks #2) er nu forkert. SåERDDAP™smider en undtagelse og kalder AnmodReloadASAP.ERDDAP™vil opdatere datasættet snart (ofte i et par sekunder, normalt inden for et minut) . Andre, lignende problemer også smide WaitDaTryAgain undtagelse.
    
#### Anmod om tilgængelighed{#requestreloadasap} 
Du kan se RequestReloadASAP i log.txt-filen lige efter en fejlmeddelelse og ofte i nærheden af en fejlmeddelelse[Vent såTryAgain Undtagelse](#waitthentryagain-exception). Det er dybest set en intern, programmatisk måde forERDDAP™at indstille et[flag flag flag flag](#flag)at signalere, at datasættet skal indlæses ASAP.
     
### Filer Ikke at blive slettet{#files-not-being-deleted} 
For et parERDDAP™installationer, der har været et problem med nogle midlertidige filer, der er oprettet afERDDAP™Ophold åbent (fejlagtigt) og dermed ikke blive slettet. I et par tilfælde har mange af disse filer akkumuleret og taget en betydelig mængde diskplads.

Forhåbentlig er disse problemer rettet (som afERDDAP™v2.00) . Hvis du ser dette problem, skal du sende dig e-mail til de fornærmede filer til Chris. John på noaa.gov. Du har et par muligheder for at håndtere problemet:

* Hvis filerne ikke er store og ikke forårsager dig at køre ud af diskplads, kan du ignorere problemet.
* Den enkleste løsning er at lukke tomcat /ERDDAP™  (efter timer, så færre brugere påvirkes) . Under nedlukningen sletter operativsystemerne ikke filerne, slette dem ved hånden. Så genstartERDDAP.
         
### JSON-ld{#json-ld} 
*    **[Semantic Markup af Datasets med json-ld (JSON Disse data) ](#json-ld)**   
    ERDDAP™bruger nu nu[json-ld (JSON Disse data) ](https://json-ld.org)for at gøre dit datakatalog og datasæt en del af[semantisk web](https://en.wikipedia.org/wiki/Semantic_Web), som er Tim Berners-Lees ide at gøre webindhold mere maskinlæsbar og maskine "underholdbare". json-ld-indholdet bruger[schema.org](https://schema.org/)Betingelser og definitioner. Søgemaskiner ([Google især](https://developers.google.com/search/docs/data-types/datasets)) og andre semantiske værktøjer kan bruge denne strukturerede markering til at lette opdagelse og indeksering. json-ld strukturerede markup vises som usynlig-til-humaner&lt;script&gt; kode på koden https://.../erddap/info/index.html webside (som er en semantisk web[DataCatalog](https://schema.org/DataCatalog)) og på hver https://.../erddap/info/*datasetID*/index.html webside (som er en semantisk web[Datasæt](https://schema.org/Dataset)) . (Special takket være Adam Leadbetter og Rob Fuller of te Marine Institute i Irland for at gøre de hårde dele af arbejdet til at gøre denne del afERDDAP.)   
     
### Out-Of-Date webadresser{#out-of-date-urls} 
Langsomt men sikkert, de webadresser, som dataudbydere har skrevet til datafiler, bliver forældet (for eksempel,httpbliver bliver bliverhttps, websteder er bagudrettede, og organisationer som NODC/NGDC/NCDC reorganiseres i NCEI) . Det resulterende brudte links er et evigtpræsent problem, der står over for alle hjemmesider. At håndtere dette,ERDDAP™Nu har et system til automatisk at opdatere forældede webadresser. Hvis GenererDatasets Xml ser en forældet URL, den tilføjer den opdaterede URL-adresse til&lt;addAttributes&gt;. Også, når en datasæt belastninger, hvisERDDAP™Se en forældet URL, det ændrer sig roligt til den opdaterede URL. Ændringerne styres af en række søge-til/replace-med par defineret i&lt;OpdaterUrls&gt; i in in in inERDDAP's
\\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml-fil. Du kan foretage ændringer der. Hvis du har forslag til ændringer, eller hvis du mener, at dette skal gøres til en tjeneste (som omformere) , venligst e-mail Chris. John på noaa.gov.
     
### CORS{#cors} 
* CORS ([Cross-Origin Ressourcedeling](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing))   
" er en mekanisme, der giver begrænsede ressourcer (f.eks. skrifttyper ellerERDDAP™Datadata) på en webside, der skal anmodes fra et andet domæne uden for domænet, hvorfra den første ressource blev serveret" (I nærheden af Arun Ranganathan) . Dybest set, CORS er en meddelelse, der kan sættes i HTTP-hovedet af et svar, og siger i det væsentlige, "det er okay med dette websted, hvis visse andre websteder (specifikke, eller alle) Grib ressourcer (f.eks. data) fra dette websted og gøre det tilgængeligt på deres hjemmeside. Således er det et alternativ til[JSONP](https://en.wikipedia.org/wiki/JSONP).
    
Udviklerne afERDDAP™påstår ikke at være sikkerhedseksperter. Vi er ikke helt klar over sikkerhedsproblemer relateret til CORS. Vi ønsker ikke at foretage nogen erklæring, der afslutter en handling, der nedsætter sikkerheden. Så vi vil bare forblive neutral og forlade det op til hverERDDAP™Administrator for at afgøre, om fordelene eller aktivering af en CORS-headset er de risici, der er værd. Som altid, hvis dinERDDAP™har alle private datasæt, det er en god ide at være ekstra forsigtig med sikkerhed.
    
Hvis du ønsker at aktivere CORS for dinERDDAP™, der er[let tilgængelige instruktioner](https://enable-cors.org/index.html)beskrive, hvordan webstedsadministratorer kan aktivere en CORS-overskrift via deres lavere serversoftware (fx, Apache eller nginx) .
    
### Billeder af Palettes{#palettes} 
* Palettes bruges afERDDAP™til at konvertere en række dataværdier til en række farver, når du laver diagrammer og kort.
    
Hver palet defineres i en .cpt-style palet fil som bruges af[GMT GMT](https://www.soest.hawaii.edu/gmt/). AlleERDDAP™.cpt filer er gyldige GMT .cpt filer, men det modsatte er ikke sandt. Til brug iERDDAP™, .cpt filer har:
    
    * Valgfrie kommentarer linjer i starten af filen, startende med "#".
    * Et hovedafsnit med en beskrivelse af palettens segmenter, et segment pr. linje. Hver segmentbeskrivelse linje har 8 værdier:
startstart Værdi, startRed, start Grøn, start Blå, slutValue, endeRed, endegrøn, endeblå.
Der kan være en række segmenter.ERDDAP™Brug lineær interpolation mellem startRed/Green/Blue og slutRed/Green/Blue af hvert segment.
        
Vi anbefaler, at hvert segment angiver en start- og slutfarve, der er forskellige, og at startfarven i hvert segment er den samme som slutfarven i det forrige segment, så paletten beskriver en kontinuerlig blanding af farver.ERDDAP™har et system til at skabe on-the-fly en palet af diskrete farver fra en palet med en kontinuerlig blanding af farver. An An An An AnERDDAP™Brugeren kan angive, om de ønsker, at paletten skal være kontinuerlig (den originale) eller Diskret (afledt af originalen) . Men der er legitime grunde til ikke at følge disse anbefalinger af nogle paletter.
        
    * StartValue og slutValues skal være integers.
Det første segment skal have startValue=0 og slutValue = =0.
Det andet segment skal have startValue =2.
Etc.
    * De røde, grønne og blå værdier skal være integers fra 0 (Ingen ingen ingen) ... 255 (Fuld på) .
    * Slutningen af filen skal have 3 linjer med:
        1. En baggrund rgb farve til dataværdier mindre end farvelinjen minimum, f.eks.: B 128 128
Det er ofte startRed, startGreen og startBlue af det første segment.
        2. En forgrunds rgb farve til dataværdier mere end farvelinjen maksimum, f.eks.: F 128 0 0
Det er ofte slutrød, endGreen, og slutBlue af det sidste segment.
        3. En rgb farve til NaN dataværdier, f.eks. N 128 128 128
Det er ofte mellemgrå (128 128) .
    * Værdierne på hver linje skal være adskilt af faner, uden ekstra mellemrum.
    
En prøve .cpt fil er BlueWhiteRed.cpt:
    
\\# Dette er BlueWhiteRed.cpt.
0 0 0 0 128 1 0 255
1 0 0 255 2 0 255 255
2 0 255 255 255 255 255 255
3 255 255 255 255 255 255 0 0
4 255 255 0 5 255 0 0 0 0 0
5 255 0 0 6 128 0
B 0 128
F 128 0 0
N 128 128
    
Se de eksisterende .cpt-filer for andre eksempler. Hvis der er problemer med en .cpt fil,ERDDAP™vil sandsynligvis smide en fejl, når .cpt-filen er parsed (som er bedre end at misbruge de oplysninger) .
    
Du kan tilføje flere paletter tilERDDAP. Du kan gøre dem selv eller finde dem på nettet (f.eks. på[Storhed](http://soliton.vm.bytemark.co.uk/pub/cpt-city/)) selvom du sandsynligvis skal redigere deres format lidt for at overholdeERDDAP's .cpt krav. Sådan får duERDDAP™at bruge en ny .cpt fil, gemme filen i *Tomcat* /webapps/erddap/WEB-INF/cptfiles (Du skal gøre det for hver ny version afERDDAP) og enten:
    
    * Hvis du bruger standardmeddelelser.xml-filen: tilføje filnavnet til filnavnet&lt;paletter&gt; tag i
         *Tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml.
Hvis du gør dette, skal du gøre det hver gang du opgradererERDDAP.
    * Hvis du bruger en brugerdefineret meddelelser.xml-fil: tilføje filnavnet til filnavnet&lt;paletter&gt; tag i dine brugerdefinerede beskeder.xml-fil: *Tomcat* /content/erddap/messages.xml . Hvis du gør dette, skal du kun gøre det én gang (men der er andre værker til at opretholde en brugerdefinerede meddelelser.xml-fil) .
    
Så genstartERDDAP™så så sådanERDDAP™bemærker ændringerne. En fordel ved denne tilgang er, at du kan angive rækkefølgen af paletterne på listen præsenteret for brugere. Hvis du tilføjer en samling, opfordrer vi dig til at tilføje et præfiks med forfatterne initialer (f.eks. "KT\\_" " " ") til navnet på hver palet for at identificere kollektionen og så der kan være flere paletter, som ellers ville have det samme navn.
    
Fjern ikke eller ændre nogen af standardpallerne. De er en standard funktion af alleERDDAP™installationer. Hvis du tror, at en palet eller samling af paletter skal indgå i standardenERDDAP™distribution, fordi det/de ville være af generel brug, bedes du sende dem til Chris. John på noaa.gov.
    
### Farvebarer{#colorbars} 
*    **Hvordan gør detERDDAP™generere farverne i en farvebar?** 
    
    1. Brugeren vælger en af de foruddefinerede[paletter](#palettes)eller bruger standarden, f.eks. Rainbow. Palettes gemmes/definéres i GMT-stil .cpt Color Palette Tabel filer. Hver afERDDAP's foruddefinerede paletter har et simpelt udvalg, f.eks. 0 til 1 (hvis der kun er én sektion i paletten) , eller 0 til 4 (hvis der er fire sektioner i paletten) . Hvert segment i filen dækker n til n+1, startende på n=0.
    2.  ERDDAP™genererer en ny .cpt fil på-the-fly, ved at afskalere den foruddefinerede palets sortiment (f.eks. 0 til 4) til den vifte af paletten, der kræves af brugeren (f.eks. 0,1 til 50) og derefter generere en sektion i den nye palet for hver sektion af den nye palet (f.eks. en log skala med krydsninger på 0,1, 0,5, 1, 5, 10, 50 vil have 5 sektioner) . Farven for slutningen af hvert afsnit genereres ved at finde den relevante del af paletten i .cpt-filen, og derefter lineært at krydse R, G og B-værdierne. (Det er det samme, som hvordan GMT genererer farver fra sin Color Palette Table-filer.) Dette system tilladerERDDAP™at starte med generiske paletter (f.eks. Rainbow med 8 segmenter, i alt strækker 0 til 8) og skabe brugerdefinerede paletter på farten (f.eks. en custom Rainbow, som kortlægger 0,1 til 50 mg/L til regnbuefarverne) .
    3.  ERDDAP™derefter bruger den nye .cpt-fil til at generere farven for hver anden farvet pixel i farvelinjen (og senere for hvert datapunkt, når du plotter data på en graf eller et kort) , igen ved at finde den relevante del af paletten i .cpt-filen, og derefter lineært at krydse R, G og B-værdierne.
    
Denne proces kan synes unødvendigt kompliceret. Men det løser problemer relateret til log skalaer, der er svært at løse andre måder.
    
Så hvordan kan du efterligne hvadERDDAP™gør? Det er ikke nemt. Dybest set skal du duplikere den proces, derERDDAP™bruger. Hvis du er enJavaprogrammør, du kan bruge den sammeJavaklasse, derERDDAP™bruger til at gøre alt dette:
     *Tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/coastwatch/sgt/CompoundColorMap.java.
    
### Retningslinjer for datadistributionssystemer{#guidelines-for-data-distribution-systems} 
Flere generelle meninger om design og evaluering af datadistributionssystemer kan findes[her her](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html).
     
### ArchiveADataset{#archiveadataset} 
Inkluderet i dit værelseERDDAP™installation er et kommandolinjeværktøj kaldet ArchiveADataset, som kan hjælpe dig med at lave et arkiv (a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a.zipeller eller eller.tar.gzfilfil) med del eller alle datasæt gemt i en serie af netcdf-3.ncdatafiler i et filformat, der er egnet til indsendelse tilNOAA's NCEI arkiv (.nctil gitterede datasæt eller[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)for tabulære datasæt, som angivet af[NCEINetCDFSkabeloner v2.0](https://www.ncei.noaa.gov/data/oceans/ncei/formats/netcdf/v2.0/index.html)) .

Arkiv Dataset kan lave to forskellige arkivformater:

* Det "originale" format følger disse[Vejledning om NCEI](https://www.ncdc.noaa.gov/atrac/guidelines.html), denne guide til[Arkivering af dine data på NCEI](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook?pli=1), og den relaterede[Øvelser for at sikre dataintegritet](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook/data-integrity).
* The "BagIt" format gør[BagIt filer](https://en.wikipedia.org/wiki/BagIt), et standardiseret arkivformat fremmet af U.S. Library of Congress, som er angivet af[BagIt v0.97 specifikation](https://tools.ietf.org/html/draft-kunze-bagit-14).NOAA's NCEI kan standardisere på BagIt-filer til indsendelser til arkivet.

Ikke overraskende,[globale og variable metadata](/docs/server-admin/datasets#global-attributes)den, derERDDAP™tilskynder/requires er næsten præcis det samme i-fil CF og ACDD metadata, som NCEI opfordrer/requires, så alle dine datasæt skal være klar til indsendelse af NCEI via[Send2NCEI](https://www.nodc.noaa.gov/s2n/)eller eller eller[ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)  (NCEI's Advanced Tracking and Resource værktøj til arkivsamlinger) .

Hvis du (te te te teERDDAP™Administrator) Brug ArkivADataset til at indsende data til NCEI, så du (Ikke NCEI) vil afgøre, hvornår du indsender en smule data til NCEI, og hvad der skal være, fordi du vil vide, hvornår der er nye data, og hvordan du angiver, at klumpen (og NCEI vil ikke) . Således er ArchiveADataset et værktøj til dig at bruge til at oprette en pakke til at indsende til NCEI.

Arkiv Datasæt kan være nyttige i andre situationer, for eksempel forERDDAP™Administratorer, der har brug for at konvertere et sæt datasæt (på privatERDDAP) fra dets oprindelige filformat i et sæt af[.ncCF-filer](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA), så en offentligERDDAP™kan tjene dataene fra.ncCF-filer i stedet for de oprindelige filer.

Når du har oprettetERDDAP™og køre det (mindst én gang) , du kan finde og bruge ArkivADataset i te *Tomcat* /webapps/erddap/WEB-INF-mappen. Der er et shell script (ArkivADataset.sh) til Linux/Unix og en batch-fil (ArkivADataset.bat) til Windows.

På Windows, den første gang du kører ArchiveADataset, skal du redigere ArkivADataset. bat fil med en tekst editor til at ændre stien til java. exe fil, så Windows kan findeJava.

Når du kører ArkivADataset, vil det spørge dig en række spørgsmål. Skriv et svar, og tryk derefter på Enter. Eller tryk på ^C for at afslutte et program til enhver tid.

Eller du kan sætte svarene på spørgsmålene, for at kunne på kommandolinjen. For at gøre dette, køre programmet en gang og skrive ind og skrive ned dine svar. Derefter kan du oprette en enkelt kommandolinje (med svarene som parametre) som kører programmet og svarer alle spørgsmål.
Brug ordet standard, hvis du ønsker at bruge standardværdien for en given parameter.
Brug "" (to dobbelte citater) som pladsholder til en tom streng.
Angive parametre på kommandolinjen kan være meget praktisk, for eksempel, hvis du bruger ArkivADataset en gang om måneden til at arkivere en måneds dataværdi. Når du har genereret kommandolinjen med parametre og gemt, at i dine noter eller i et shell-script, skal du blot foretage små ændringer hver måned for at foretage denne måneds arkiv.

De spørgsmål, som ArchiveADataset beder dig om:

* Angiv original eller Bagit-filemballage. Til NCEI, brug Bagit.
* Angiv lynlås eller tar.gzkompression til pakken. Til NCEI, brug tar.gz.
* Angiv en kontaktmailadresse til dette arkiv (den vil blive skrevet i READ\\_ME.txt-filen i arkivet) .
* Angive feltetdatasetIDaf det datasæt, du vil arkivere.
* Angiv hvilke datavariabler du vil arkivere (Normalt alle) .
* Angiv, hvilken del af det datasæt, du vil arkivere. Du skal formatere undersættet på samme måde, du ville formatere et subset for en dataforespørgsel, så det vil være anderledes for gitteret end for tabulære datasæt.
    * For gitterede datasæt, kan du angive en række værdier af venstre yderste dimension, normalt det er en række tid. ArkivADataset vil gøre en separat anmodning og generere en separat datafil for hver værdi i intervallet værdier. Da gitterded datasæt normalt er store, skal du næsten altid angive en lille delsæt i forhold til størrelsen af hele datasættet.
For eksempel,\\[ (2015-12-01) : (2015-12-31) \\]\\[\\]\\[\\]\\[\\]
    * For tabulære datasæt, kan du angive enhver samling af begrænsninger, men det er ofte en række tid. Da tabulære datasæt normalt er små, er det ofte muligt at angive ingen begrænsninger, så hele datasættet er arkiveret.
For eksempel, &time&gt;=2015-12-01&tid&lt;2016-01-01
* For tabulære datasæt: angive en komma adskilt liste over 0 eller flere variabler, der vil afgøre, hvordan de arkiverede data er yderligere opdelt i forskellige datafiler. Til datasæt, der har
    [CDm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type)\\=TimeSeries|TimeSeriesProfil|Trajectory|TrajectoryProfil
du skal næsten altid angive den variable, der har cf\\_role=timeseries\\_id (fx,stationID) eller cf\\_role=trajectory\\_id attribut. ArkivADataset vil lave en separat anmodning og generere en separat datafil for hver kombination af værdierne af disse variabler, f.eks. for hver enkeltstationID.
For alle andre tabulære datasæt, vil du sandsynligvis ikke angive variabler til dette formål.
Advarsel: Hvis den del af datasættet, du er arkivering, er meget stor (&gt;2 GB) og der er ingen egnet variabel til dette formål, så er ArchiveADataset ikke anvendelig med denne datasæt. Dette skal være sjældent.
* Angiv filformatet for de datafiler, der vil blive oprettet.
Til gitterdatasæt, til NCEI, brug.nc.
Til tabulære datasæt, til NCEI, brug[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)hvis det er en mulighed; ellers bruge.nc.
* Angiv den type fil, der fordøjes for hver datafil og for hele arkivpakken: MD5, SHA-1 eller SHA-256. Den fil duest giver en måde for klienten (f.eks. NCEI) at teste, om datafilen er blevet ødelagt. Traditionelt, disse var[.md5 filer](https://en.wikipedia.org/wiki/MD5), men nu er der bedre muligheder. Til NCEI, brug SHA-256 .

Når du besvarer alle spørgsmål, vil ArchiveADataset:

1. Lav en række anmodninger til datasættet og trin resultatet af datafiler i *bigParentDirectory* /ArchiveADataset / *datasetID\\_timestamp* /.
For gitterded datasæt, vil der være en fil for hver værdi af den venstre største dimension (f.eks. tid) . Navnet på filen vil være den værdi (f.eks. tidsværdien) .
For tabulære datasæt, vil der være en fil for hver værdi af den... variable (s s s) . Navnet på filen vil være den værdi. Hvis der er mere end én variabel, vil de venstre variabler blive brugt til at lave undermapper, og den rigtige variabel vil blive brugt til at gøre filnavnene.
Hver datafil skal være&lt;2 GB (den maksimale tilladt af.ncversion 3 filer) .
2. Lav en fil relateret til hver datafil med den fordøje af datafilen. Hvis datafilen f.eks. er 46088.ncog den fordøje type er .sha256, og den fordøje fil vil have navnet 46088.nc.sha256.
3. Lav en READ\\_ME.txt-fil med oplysninger om arkivet, herunder en liste over alle de indstillinger, du har angivet for at generere dette arkiv.
4. Lav 3 filer i *bigParentDirectory* /ArchiveADataset / :
    
    * A A A A A A.zipeller eller eller.tar.gzArkiv fil ved navn *datasetID\\_timestamp* .zip  (eller eller eller.tar.gz) indeholdende alle de trinvise datafiler og fordøje filer. Denne fil kan være enhver størrelse, begrænset kun af diskplads.
    * En digital fil til arkivfilen, f.eks. *datasetID\\_timestamp* .zip.sha256.txt
    * For den "original" type arkiv, en tekstfil opkaldt *datasetID\\_timestamp* .zip.listOfFiles.txt (eller eller eller.tar.gz) som viser alle filer i filerne.zip  (eller eller eller.tar.gz) fil.
    
Hvis du forbereder arkivet for NCEI, er disse de filer, du sender til NCEI, måske via[Send2NCEI](https://www.nodc.noaa.gov/s2n/)eller eller eller[ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)  (NCEI's Advanced Tracking and Resource værktøj til arkivsamlinger) .
5. Slette alle de trinvise filer, så kun arkivfilen (fx,.zip) , fordøje (f.eks. .sha256.txt) af arkivet og (valgfrit) .listOfFiles.txt-filer forbliver.

#### ISO 19115 .xml Metadata filer{#iso-19115-xml-metadata-files} 
ArkivADataset-arkivpakken indeholder ikke ISO 19115 .xml metadata-fil til datasættet. Hvis du vil/need til at indsende en ISO 19115-fil til din datasæt til NCEI, kan du sende dem ISO 19115 .xml-metadatafil, derERDDAP™skabt til datasættet (men men menNMFSpersoner skal få ISO 19115-filen til deres datasæt fra InPort, hvisERDDAP™tjener ikke allerede denne fil) .

Problemer? Forslag? ArchiveADataset er nyt. Hvis du har problemer eller forslag, kan du se vores[sektion om at få ekstra støtte](/docs/intro#support).
     
