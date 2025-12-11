---
sidebar_position: 4
---
# Tilleggsinformasjon

## Ting du trenger å vite{#things-you-need-to-know} 
     
###    ** [Proxyfeil](#proxy-errors) **  {#proxy-errors} 
Noen ganger en forespørsel til ERDDAP™ vil returnere en proxy-feil, en HTTP 502 Bad Gateway-feil eller en lignende feil. Disse feilene kastes av Apache eller Tomcat, ikke ERDDAP™ Selv.
* Hvis hver forespørsel genererer disse feilene, spesielt når du først konfigurerer din ERDDAP™ , så er det sannsynligvis en proxy eller dårlig gateway feil, og løsningen er sannsynligvis å fikse [ ERDDAP Proxyinnstillinger](/docs/server-admin/deploy-install#proxypass) .. Dette kan også være problemet når en etablert ERDDAP™ Plutselig begynner å kaste disse feilene for hver forespørsel.
* Ellers feil er vanligvis faktisk time ut feil kastet av Apache eller Tomcat. Selv når de skjer relativt raskt, er det en slags respons fra Apache eller Tomcat som oppstår når ERDDAP™ er svært travel, minnebegrenset eller begrenset av noen annen ressurs. I disse tilfellene, se råd nedenfor for å håndtere [ ERDDAP™ Svarer sakte](#responding-slowly) ..
        
Forespørsler i lang tid (&gt;30 tidspunkter) fra et gitted datasett er utsatt for tidsavbrudd, som ofte vises som proxy feil, fordi det tar betydelig tid for ERDDAP™ å åpne alle datafilene én for én. Hvis ERDDAP™ Er ellers opptatt under forespørselen, er problemet mer sannsynlig å skje. Hvis datasettets filer er komprimert, er problemet mer sannsynlig å skje, selv om det er vanskelig for en bruker å bestemme om et datasetts filer er komprimert.
Løsningen er å gjøre flere forespørsler, hver med et mindre tidsintervall. Hvor lite tidsintervall? Jeg anbefaler å starte veldig lite (30 poeng?) , så (ca.) doble tidsintervallet til forespørselen mislykkes, og gå deretter tilbake én dobling. Gjør alle forespørsler (Hver for en annen del av tiden) måtte få alle dataene.
An ERDDAP™ administrator kan redusere dette problemet ved å øke [Tidsgrenseinnstillinger for Apache](/docs/server-admin/deploy-install#apache-timeout) ..
        
### Overvåkning{#monitoring} 
Vi ønsker alle at våre datatjenester skal finne publikum og bli mye brukt, men noen ganger din ERDDAP™ Kan brukes for mye, forårsake problemer, inkludert super sakte svar for alle forespørsler. Vår plan om å unngå problemer er:

* Overvåk ERDDAP™ via [Status.html nettside](#status-page) ..
Det har masse nyttig informasjon. Hvis du ser at et stort antall forespørsler kommer inn, eller tonnevis av minne som brukes, eller tonnevis av mislykkede forespørsler, eller hver Major LoadDatasett tar lang tid, eller se noen tegn på ting som blir lagt ned og svare sakte, så se i ERDDAP 's [log.txt-fil](#log) For å se hva som skjer.
    
Det er også nyttig å bare merke seg hvor raskt statussiden reagerer. Hvis det reagerer sakte, er det en viktig indikator som ERDDAP™ er veldig opptatt.
    
* Overvåk ERDDAP™ via [Daglig rapport](#daily-report) e-post.
     
* Se etter utdaterte datasett via *baseUrl*  /erddap/outOfDateDatasets.html nettside som er basert på valgfrie [ testOutOfDate ](/docs/server-admin/datasets#testoutofdate) global attributt.
     
#### Eksterne skjermer{#external-monitors} 
De ovennevnte metodene er ERDDAP Måter å overvåke seg selv på. Det er også mulig å lage eller bruke eksterne systemer til å overvåke din ERDDAP .. Et prosjekt å gjøre dette er [Axioms erddap-metriske prosjekt](https://github.com/axiom-data-science/erddap-metrics) .. Slike eksterne systemer har noen fordeler:
* De kan tilpasses for å gi informasjonen du vil ha, som vises på den måten du vil.
* De kan inkludere informasjon om ERDDAP™ som ERDDAP™ kan ikke få tilgang til lett eller i det hele tatt (for eksempel CPU-bruk, diskfri plass, ERDDAP™ responstid som sett fra brukerens perspektiv, ERDDAP™ oppetid,
* De kan gi varsler (e-poster, telefonsamtaler, tekster) til administratorer når problemer overstiger noen terskel.
             
### Flere simultan Forespørsler{#multiple-simultaneous-requests} 
*    **Svartliste brukere som gjør flere samtidige forespørsler&#33;** 
Hvis det er klart at noen brukere gjør mer enn én samtidig forespørsel, gjentatte ganger og kontinuerlig, så legge til sin IP-adresse til ERDDAP «[&lt;forespørselBlacklist&gt;] (/docs/server-admin/datasett#requestblacklist) i din datasets.xml fil. Noen ganger er forespørsler alle fra én IP-adresse. Noen ganger kommer de fra flere IP-adresser, men klart samme bruker. Du kan også svarteliste mennesker som gjør tonnevis av ugyldige forespørsler eller tonnevis av sinnssinnelige ineffektive forespørsler.
    
For hver forespørsel de gjør, ERDDAP™ returnerer:
    
    > HTTP ERROR 403 - Access Forbidden --  
    > Your IP address is on this ERDDAP's request blacklist.  
    > Did you often submit more than one request at a time?  
    > Did you often submit identical requests in a short period of time?  
    > Did you submit a large number of invalid requests?  
    > If you are ready to avoid these problems, please email \\[ERDDAP™ administrator's email address\\] to request to be taken off of the blacklist.
    
Forhåpentligvis vil brukeren se denne meldingen og kontakte deg for å finne ut hvordan du fikser problemet og komme av svartelisten. Noen ganger bytter de bare IP-adresser og prøver igjen.
    
Det er som maktbalansen mellom offensive og defensive våpen i krig. Her defensive våpen ( ERDDAP ) har en fast kapasitet, begrenset av antall kjerner i CPU, disktilgang båndbredde og nettverksbredde. Men offensive våpen (brukere, spesielt skript) har ubegrenset kapasitet:
    
    * En enkelt forespørsel om data fra mye tid kan føre til ERDDAP Å åpne et stort antall filer (i rekkefølge eller delvis flertrådet) .. I ekstreme tilfeller kan en "simpel" forespørsel enkelt binde opp RAID festet til ERDDAP™ i et minutt, effektivt blokkere håndtering av andre forespørsler.
         
    * En enkelt forespørsel kan konsumere en stor del av minnet (Selv om ERDDAP™ kodes for å minimere minnet som er nødvendig for å håndtere store forespørsler) ..
         
    * Parallalisering -
Det er enkelt for en smart bruker å parallelisere en stor oppgave ved å generere mange tråder, som hver innsender en egen forespørsel (som kan være store eller små) .. Denne atferden oppfordres av datavitenskapssamfunnet som en effektiv måte å håndtere et stort problem på (parallelisering er effektiv under andre omstendigheter) .. Gå tilbake til krigsanalogi: brukere kan gjøre et i det vesentlig ubegrenset antall samtidige forespørsler med kostnadene for hver er vesentlig null, men kostnadene for hver forespørsel kommer til ERDDAP™ kan være stort og ERDDAP Responsfunksjonen er fin. Klart, ERDDAP™ vil miste denne kampen, med mindre ERDDAP™ administrator svartelister brukere som gjør flere samtidige forespørsler som er urettferdig overfylte andre brukere.
         
    * Flere skript -
Tenk på hva som skjer når det er flere smarte brukere som kjører parallelliserte skript. Hvis en bruker kan generere så mange forespørsler som andre brukere er overfylt, kan flere slike brukere generere så mange forespørsler som ERDDAP™ blir overveldet og tilsynelatende uresponsiv. Det er faktisk et [DDOS angrep](https://en.wikipedia.org/wiki/Denial-of-service_attack) Det eneste forsvaret for ERDDAP™ er å svarteliste brukere som gjør flere samtidige forespørsler som er urettferdig overfylte andre brukere.
         
    * Oppblåste forventninger -
I denne verden av massive tech-selskaper (Amazon, Google, Facebook...) , brukere har kommet til å forvente i det vesentlige ubegrensede evner fra leverandørene. Siden disse selskapene er penger å gjøre virksomhet, jo flere brukere de har, jo mer inntekter må de utvide sin IT-infrastruktur. Så de har råd til en massiv IT-infrastruktur for å håndtere forespørsler. Og de begrenser smart antall forespørsler og kostnader til hver forespørsel fra brukere ved å begrense typen forespørsler som brukere kan gjøre slik at ingen enkelt forespørsel er belastende, og det er aldri en grunn (eller på en måte) for brukerne å gjøre flere samtidige forespørsler. Disse store tech-selskapene kan ha langt flere brukere enn ERDDAP™ , men de har massivt flere ressurser og smarte måter å begrense forespørsler fra hver bruker. Det er en håndterbar situasjon for de store IT-selskapene (De blir rike&#33;) Men ikke for ERDDAP™ installasjoner. Det eneste forsvaret for ERDDAP™ er å svarteliste brukere som gjør flere samtidige forespørsler som er urettferdig overfylte andre brukere.
         
    
Så brukere: Ikke gjør flere samtidige forespørsler eller du vil bli svartlistet&#33;
     

Selvfølgelig er det best om serveren har mange kjerner, mye minne (så du kan tildele mye minne til ERDDAP™ Mer enn det noen gang trenger) og høy båndbredde Internett-tilkobling. Deretter er hukommelsen sjelden eller aldri en begrensende faktor, men nettverksbredde blir den vanligste begrensende faktoren. I utgangspunktet, ettersom det er flere og flere samtidige forespørsler, hastigheten til enhver gitt bruker reduseres. Det bremser naturligvis antall forespørsler som kommer inn hvis hver bruker bare sender én forespørsel om gangen.
    
###  ERDDAP™ Få data fra TREDDS{#erddap-getting-data-from-thredds} 
Hvis din ERDDAP™ får noen av sine data fra en THREDDS på nettstedet ditt, det er noen fordeler å gjøre en kopi av TREDDS datafiler (I det minste for de mest populære datasettene) på en annen RAID som ERDDAP™ har tilgang til slik at ERDDAP™ kan tjene data fra filene direkte. På ERD Det gjør vi for våre mest populære datasett.

*    ERDDAP™ kan få dataene direkte og ikke trenger å vente på THREDDS å laste om datasettet eller ...
*    ERDDAP™ kan legge merke til og inkludere nye datafiler umiddelbart, så det trenger ikke å pester THREDDS ofte å se om datasettet har endret seg. Se [&lt;OppdaterEveryNMillis&gt;] (/docs/server-admin/datasett) ..
* Lasten deles mellom 2 RAIDS og 2 servere, i stedet for at forespørselen er vanskelig på begge ERDDAP™ og tredder.
* Du unngår feilproblemet forårsaket av THREDDS har en liten (som standard) maksimal forespørselsstørrelse. ERDDAP™ har et system for å håndtere feilen, men å unngå problemet er bedre.
* Du har en sikkerhetskopi av data som alltid er en god ide.

I alle fall, ikke løp TREDDS og ERDDAP™ I samme Tomcat. Kjør dem i separate Tomcats eller bedre på separate servere.

Vi finner at TREDDS jevnlig kommer i en tilstand der forespørsler bare henger. Hvis din ERDDAP™ er å få data fra en TREDDS og THREDDS er i denne tilstanden, ERDDAP™ har et forsvar (Det står at det THREDDS-baserte datasettet ikke er tilgjengelig) Men det er fortsatt vanskelig for ERDDAP™ fordi ERDDAP™ må vente til tidsavbruddet hver gang den prøver å laste en datasett fra en hengt THREDDS. Noen grupper (inkludert ERD ) unngå dette ved proaktivt å restarte TREDDS ofte (For eksempel nattlig i en kronjobb) ..

### Svarer sakte{#responding-slowly} 
*    **Hvis ERDDAP™ Svarer sakte** eller om visse forespørsler svarer sakte,
Du kan være i stand til å finne ut om langsomheten er rimelig og midlertidig (f.eks. på grunn av mange forespørsler fra skript eller WMS brukere) , eller hvis noe er uforklarlig galt og du trenger å [steng ned og omstart Tomcat og ERDDAP™ ](#shut-down-and-restart) ..
    
Hvis ERDDAP™ er å svare sakte, se rådene nedenfor for å bestemme årsaken, som forhåpentligvis vil gjøre det mulig å løse problemet.
Du kan ha et bestemt utgangspunkt (f.eks. en spesifikk forespørselsadresse) eller et uklart utgangspunkt (f.eks. ERDDAP™ er langsom) ..
Du kan vite den involverte brukeren (For eksempel fordi de sendte deg e-post) Eller ikke.
Du kan ha andre ledetråder eller ikke.
Siden alle disse situasjonene og alle mulige årsaker til problemene sløres sammen, forsøker rådet nedenfor å håndtere alle mulige utgangspunkter og alle mulige problemer relatert til langsomme svar.
    
    *    **Se etter spor i [ ERDDAP Loggfil](#log) **   ( *bigParentDirectory* /logg/log.txt) ..
         \\[ Ved sjeldne anledninger er det spor i [Tomcats loggfil](#tomcat-logs)   ( *tomcat* /logs/catalina.out) .. \\]   
Søk etter feilmeldinger.
Se etter et stort antall forespørsler som kommer fra en (eller noen få) brukere og kanskje hogging mye av serverens ressurser (minne, CPU-tid, disktilgang, internett båndbredde) ..
        
Hvis problemet er bundet til **En bruker** , kan du ofte få et hint om hvem brukeren er via webtjenester som [https://whatismyipaddress.com/ip-lookup](https://whatismyipaddress.com/ip-lookup) som kan gi deg informasjon relatert til brukerens IP-adresse (som du kan finne i ERDDAP 's [log.txt](#log) fil) ..
        
        * Hvis brukeren synes å være en **bot** å oppføre seg dårlig (spesielt en søkemotor som prøver å fylle ut ERDDAP™ skjemaer med alle mulige permutasjon av inngangsverdier) Pass på at du har satt opp serverens [robots.txt](#robotstxt) fil.
        * Hvis brukeren synes å være en **skript (s) ** som gjør flere samtidige forespørsler, kontakt brukeren, forklare at din ERDDAP™ har begrensede ressurser (For eksempel, minne, CPU-tid, disktilgang, internettbredde) , og be dem om å være hensynsfulle av andre brukere og bare gjøre en forespørsel om gangen. Du kan også nevne at du vil svarte om de ikke trekker seg.
        * Hvis brukeren synes å være en **skript** å gjøre et stort antall tidskrevende forespørsler, be brukeren om å være omtenksom på andre brukere ved å sette en liten pause (2 sekunder?) i manus mellom forespørsler.
        *    ** WMS Kundeprogramvare** Kan være svært krevende. En klient vil ofte be om 6 tilpassede bilder om gangen. Hvis brukeren synes å være en WMS Kunde som gjør legitime forespørsler, kan du:
            * Ignorer det. (anbefalt, fordi de vil gå på ganske snart) 
            * Slå av serverens WMS service via ERDDAP config.html-fil. (Ikke anbefalt) 
        * Hvis forespørselen virker **dum, gal, overdreven, eller skadelig,** eller hvis du ikke kan løse problemet på annen måte, bør du vurdere midlertidig eller permanent å legge brukerens IP-adresse til [&lt;forespørselBlacklist&gt; i din datasets.xml fil] (/docs/server-admin/datasett#requestblacklist) ..
             
    *    **Prøv å kopiere problemet selv, fra datamaskinen.**   
Finn ut om problemet er med ett datasett eller alle datasett, for én bruker eller alle brukere, for bare visse typer forespørsler osv.
Hvis du kan duplisere problemet, prøv å begrense problemet.
Hvis du ikke kan kopiere problemet, kan problemet være bundet til brukerens datamaskin, brukerens Internett-tilkobling eller din institusjons internettilkobling.
         
    * Hvis bare **ett datasett** Svarer sakte (Kanskje bare for **En type forespørsel** fra én bruker) Problemet kan være:
        *    ERDDAP tilgang til datasettets kildedata (spesielt fra relasjonelle databaser, Cassandra og fjerndatasett) kan være midlertidig eller permanent sakte. Prøv å sjekke kildens hastighet uavhengig av ERDDAP .. Hvis den er langsom, kan du kanskje forbedre den.
        * Er problemet relatert til den spesifikke forespørselen eller den generelle typen forespørsel?
Jo større den etterspurde underdelen av et datasett, jo mer sannsynlig vil forespørselen mislykkes. Hvis brukeren gjør store forespørsler, be brukeren om å gjøre mindre forespørsler som er mer sannsynlig å få en rask og vellykket respons.
            
Nesten alle datasett er bedre til å håndtere noen typer forespørsler enn andre typer forespørsler. For eksempel, når et datasett lagrer forskjellige tidsbiter i ulike filer, kan forespørsler om data fra et stort antall tidspunkter være svært sakte. Hvis nåværende forespørsler er av vanskelig type, bør du vurdere å tilby en variant av datasettet som er optimalisert for disse forespørselene. Eller bare forklare brukeren at den typen forespørsel er vanskelig og tidkrevende, og be om deres tålmodighet.
            
        * Datasettet kan ikke konfigureres optimalt. Du kan gjøre endringer i datasettets datasets.xml bit å hjelpe ERDDAP™ håndtere datasettet bedre. For eksempel
            
            *    EDDGrid FraNcFiles datasett som får tilgang til data fra komprimerte nc4/hdf5-filer er langsomme når du får data for hele det geografiske området (For eksempel for et verdenskart) fordi hele filen må dekomprimeres. Du kan konvertere filene til ukomprimerte filer, men da vil kravet om plass være mye, mye større. Det er sannsynligvis bedre å bare akseptere at slike datasett vil bli langsomme under visse omstendigheter.
            * Konfigurasjonen av [&lt; subsetVariables &gt;] (/docs/server-admin/datasett#subsetvariables) Tagge har stor innflytelse på hvordan ERDDAP™ håndtere EDDTable datasett.
            * Du kan kanskje øke [hastigheten på en EDDTableFraDatabase](/docs/server-admin/datasets#database-speed) - Datasett.
            * Mange EDDTable-datasett kan tilpasses av [Lagre en kopi av dataene i NetCDF Kontinuous Tagged Array filer](/docs/server-admin/datasets#eddtablefromfiles) som ERDDAP™ Kan lese veldig raskt.
            
Hvis du vil ha hjelp med å fremskynde et bestemt datasett, kan du inkludere en beskrivelse av problemet og datasettets bit av datasets.xml se vår [Seksjon om å få ekstra støtte](/docs/intro#support) ..
             
    * Hvis **alt** i ERDDAP™ er **alltid** sakte kan problemet være:
        * Datamaskinen som kjører ERDDAP™ Kanskje ikke har nok minne eller prosessorkraft. Det er bra å løpe ERDDAP™ på en moderne, multi-core server. For tung bruk bør serveren ha et 64-biters operativsystem og 8 GB eller mer minne.
        * Datamaskinen som kjører ERDDAP™ kan også kjøre andre applikasjoner som forbruker mange systemressurser. Hvis det er det, kan du få en dedikert server for ERDDAP ? For eksempel (Dette er ikke en støtte) , kan du få en quad-core Mac Mini Server med 8 GB minne for ~ $1100.
             
    * Hvis **alt** i ERDDAP™ er **midlertidig** Late, se din ERDDAP 's [ ** /erddap/status.html side** ](#status-page) i nettleseren din.
        * Gjør det ERDDAP™ Statussiden mislykkes å laste?
I så fall, [omstart ERDDAP™ ](#shut-down-and-restart) ..
        * gjorde ERDDAP™ statussidelast sakte (f.eks. &gt;5 sekunder) ?
Det er et tegn på at alt i ERDDAP™ løper sakte, men det er ikke nødvendigvis problemer. ERDDAP™ Kanskje bare er veldig opptatt.
        * For " Response Mislykket tid (siden siste store Lastedatasett) Er n= et stort tall?
Det indikerer at det nylig har vært mange mislykkede forespørsler. Det kan være problemer eller starten på problemer. Mediantiden for sviktene er ofte stor (f.eks. 210000 ms) ,
som betyr at det var (Er det?) Mange aktive tråder.
som knyttet mange ressurser (som hukommelse, åpne filer, åpne sokker, ...) ,
som ikke er bra.
        * For " Response lykkes (siden siste store Lastedatasett) Er n= et stort tall?
Det indikerer at det har vært mange vellykkede forespørsler nylig. Dette er ikke problemer. Det betyr bare din ERDDAP™ Det blir tungt bruk.
        * Er antall ikke-Tomcat-ventende tråder" dobbel en typisk verdi?
Dette er ofte alvorlige problemer som vil føre til ERDDAP™ For å bremse og til slutt fryse. Hvis dette varer i timevis, kan du ønske å proaktivt [omstart ERDDAP™ ](#shut-down-and-restart) ..
        * Nederst i listMemory Use Summary"-listen, er den siste "Memory: bruker currently verdi veldig høy?
Dette kan bare indikere høy bruk, eller det kan være et tegn på problemer.
        * Se på listen over tråder og deres status. Er det uvanlig mange som gjør noe uvanlig?
             
    * Er **institusjonens internettforbindelse** For tiden sakte?
Søk på Internett for "internet hastighetstest" og bruk en av de gratis online testene, som [https://www.speakeasy.net/speedtest/](https://www.speakeasy.net/speedtest/) .. Hvis institusjonens internettforbindelse er langsom, så forbindelser mellom ERDDAP™ og eksterne datakilder vil være langsomme, og forbindelser mellom ERDDAP™ Og brukeren vil være langsom. Noen ganger kan du løse dette ved å stoppe unødvendig internettbruk (For eksempel personer som ser på streamingvideoer eller på videokonferansesamtaler) ..
         
    * Er **Internett-tilkobling** For tiden sakte?
Få brukeren til å søke på Internett for "internet hastighetstest" og bruk en av de gratis online testene, som [https://www.speakeasy.net/speedtest/](https://www.speakeasy.net/speedtest/) .. Hvis brukerens Internett-tilkobling er langsom, bremser det deres tilgang til ERDDAP .. Noen ganger kan de løse dette ved å stoppe unødvendig internettbruk på sin institusjon (For eksempel personer som ser på streamingvideoer eller på videokonferansesamtaler) ..
         
    *    **Stuck?**   
Se vår [Seksjon om å få ekstra støtte](/docs/intro#support) ..

### Slå av og på nytt{#shut-down-and-restart} 
*    **Hvordan slå ned og starte Tomcat på nytt og ERDDAP™ **   
Du trenger ikke å stenge ned og omstarte Tomcat og ERDDAP hvis ERDDAP™ er midlertidig langsom, langsom av en kjent grunn (som mange forespørsler fra skript eller WMS brukere) , eller å anvende endringer på datasets.xml fil.
    
Du trenger å stenge ned og starte Tomcat på nytt og ERDDAP™ hvis du trenger å bruke endringer i config.xml-filen, eller hvis ERDDAP™ fryser, henger eller låser. I ekstreme tilfeller, Java kan fryse i et minutt eller to mens det gjør en full søppelsamling, men deretter gjenopprette. Så det er bra å vente et minutt eller to for å se om Java / ERDDAP™ er virkelig frossen eller hvis det bare gjør en lang søppelsamling. (Hvis søppelkolleksjon er et vanlig problem, [tildel mer minne til Tomcat](/docs/server-admin/deploy-install#memory) ..) 
    
Jeg anbefaler ikke å bruke Tomcat Web Application Manager til å starte eller stenge Tomcat. Hvis du ikke helt stenger og starter Tomcat, vil du tidligere eller senere ha problemer med minneproblemene i PermGen.
    
å slå av og starte Tomcat på nytt og ERDDAP :)
    
    * Hvis du bruker Linux eller Mac:
         (Hvis du har opprettet en spesiell bruker for å kjøre Tomcat, for eksempel tomcat, huske å gjøre følgende trinn som den brukeren.)   
         
        1. Bruk CD *tomcat* /bin
             
        2. Bruk ps-ef | grep tomcat å finne java/tomcat prosessen ID (Forhåpentligvis vil bare én prosess bli oppført) som vi vil ringe *javaProcessID* Nedenfor.
             
        3. Hvis ERDDAP™ er frossen/hung/låst opp, bruk kill -3 *javaProcessID* å fortelle Java   (som kjører Tomcat) å gjøre en tråd dump til Tomcat loggfil: *tomcat* /logs/catalina.out. Når du starter på nytt, kan du diagnostisere problemet ved å finne tråd dump informasjon (og all annen nyttig informasjon over den) i *tomcat* /logs/catalina.out og også ved å lese relevante deler av [ ERDDAP™ loggarkiv](#log) .. Hvis du vil, kan du inkludere denne informasjonen og se vår [Seksjon om å få ekstra støtte](/docs/intro#support) ..
             
        4. Bruk ./hutdown. sh
             
        5. Bruk ps-ef | Grap tomcat gjentatte ganger til java/tomcat prosessen ikke er oppført.
            
Noen ganger vil java/tomcat-prosessen ta opptil to minutter å helt stenge ned. Årsaken er: ERDDAP™ sender en melding til sine bakgrunnstråder for å fortelle dem å stoppe, men noen ganger tar det disse trådene lang tid å komme til en god stoppeplass.
            
        6. Hvis etter et minutt eller så, java/tomcat ikke stopper av seg selv, kan du bruke
kill -9 *javaProcessID*   
å tvinge java/tomcat prosessen til å stoppe umiddelbart. Hvis mulig, bruk dette bare som en siste utvei. -9 bryteren er kraftig, men det kan forårsake ulike problemer.
             
        7. Omstart ERDDAP™ ./startup.sh
             
        8. Vis ERDDAP™ i nettleseren din for å sjekke at omstarten lykkes. (Noen ganger må du vente 30 sekunder og prøve å laste ERDDAP™ igjen i nettleseren for at det skal lykkes.)   
             
    * Hvis du bruker Windows:
         
        1. Bruk CD *tomcat* /bin
             
        2. Bruk shutdown.bat   
             
        3. Du vil kanskje ha / trenger å bruke Windows Task Manager (tilgjengelig via Ctrl Alt Del) å sikre at Java /Tomcat/ ERDDAP™ Prosess/søknad er helt stoppet.
Noen ganger vil prosessen/søknaden ta opptil to minutter å stenge ned. Årsaken er: ERDDAP™ sender en melding til sine bakgrunnstråder for å fortelle dem å stoppe, men noen ganger tar det disse trådene lang tid å komme til en god stoppeplass.
             
        4. Omstart ERDDAP™ , bruk oppstart.bat
             
        5. Vis ERDDAP™ i nettleseren din for å sjekke at omstarten lykkes. (Noen ganger må du vente 30 sekunder og prøve å laste ERDDAP™ igjen i nettleseren for at det skal lykkes.)   
             
### Hyppige krasj eller fryser{#frequent-crashes-or-freezes} 
Hvis ERDDAP™ blir langsom, krasjer eller fryser, noe er galt. Se inn [ ERDDAP Loggfil](#log) å prøve å finne ut årsaken. Hvis du ikke kan, kan du inkludere detaljene og se våre [Seksjon om å få ekstra støtte](/docs/intro#support) ..

Det vanligste problemet er en vanskelig bruker som kjører flere skript samtidig og/eller noen som gjør et stort antall ugyldige forespørsler. Hvis dette skjer, bør du sannsynligvis svarteliste den brukeren. Når en svartlistet bruker forespørsel, oppfordrer feilmeldingen i svaret dem til å e-poste deg til å løse problemene. Deretter kan du oppfordre dem til å kjøre bare ett skript om gangen og å løse problemene i deres skript (For eksempel, be om data fra et fjerndatasett som ikke kan svare før timing ut) .. Se [&lt;forespørselBlacklist&gt; i din datasets.xml fil] (/docs/server-admin/datasett#requestblacklist) ..

I ekstreme tilfeller, Java kan fryse i et minutt eller to mens det gjør en full søppelsamling, men deretter gjenopprette. Så det er bra å vente et minutt eller to for å se om Java / ERDDAP™ er virkelig frossen eller hvis det bare gjør en lang søppelsamling. (Hvis søppelkolleksjon er et vanlig problem, [tildel mer minne til Tomcat](/docs/server-admin/deploy-install#memory) ..) 

Hvis ERDDAP™ blir langsom eller fryser og problemet er ikke en vanskelig bruker eller en lang søppelsamling, kan du vanligvis løse problemet ved [Start på nytt ERDDAP™ ](#shut-down-and-restart) .. Min erfaring er at ERDDAP™ kan kjøres i måneder uten å trenge en omstart.
     

### Overvåk{#monitor} 
Du kan overvåke din ERDDAP status ved å se på [ /erddap/status.html side](#status-page) Spesielt statistikken i den øverste delen. Hvis ERDDAP™ blir langsom eller fryser og problemet er ikke bare ekstremt tung bruk, kan du vanligvis løse problemet ved [Start på nytt ERDDAP™ ](#shut-down-and-restart) .. Det er ekstra metrikk tilgjengelig gjennom Prometheus integrasjon på /erddap/metri.

Min erfaring er at ERDDAP™ kan kjøres i måneder uten å trenge en omstart. Du trenger bare å omstarte det hvis du vil bruke noen endringer du gjorde på ERDDAP 's setup.xml eller når du trenger å installere nye versjoner av ERDDAP™ , Java , Tomcat eller operativsystemet. Hvis du må omstarte ERDDAP™ Ofte er det noe galt. Se inn [ ERDDAP Loggfil](#log) å prøve å finne ut årsaken. Hvis du ikke kan, kan du inkludere detaljene og se våre [Seksjon om å få ekstra støtte](/docs/intro#support) .. Som en midlertidig løsning kan du prøve å bruke [Monit](https://mmonit.com/monit/) å overvåke din ERDDAP™ og omstart det om nødvendig. Eller, kan du gjøre en kron jobb å starte om ERDDAP™   (proaktivt) periodisk. Det kan være litt utfordrende å skrive et skript for å automatisere overvåking og omstarte ERDDAP .. Noen tips som kan hjelpe:

* Du kan forenkle testingen hvis Tomcat-prosessen fortsatt kjører ved å bruke -c-bryteren med grep:
ps-u *tomcat Bruker*   | grep-c java
Det vil redusere utgangen til "1 hvis tomkatprosessen fortsatt er i live, eller " hvis prosessen har stoppet.
     
* Hvis du er god med gawk, kan du trekke ut prosessenID fra resultatene av
ps-u *tomcat Bruker*   | grep java, og bruk prosessenID i andre linjer av skriptet.
     

Hvis du setter opp Monit eller en cron jobb, ville det være bra hvis du kan dele detaljene slik at andre kan dra nytte av å se vår [Seksjon om å få ekstra støtte](/docs/intro#support) der du kan dele.

#### Permgen{#permgen} 
Hvis du gjentatte ganger bruker Tomcat Manager til å laste om (eller stopp og start)   ERDDAP™ , ERDDAP™ Kan ikke starte opp og kaste java.lang. OutOfMemoryError: PermGen. Løsningen er å periodisk (Eller hver gang?)   [stenge ned og starte på nytt tomcat og ERDDAP™ ](#shut-down-and-restart) I stedet for å bare laste om ERDDAP ..
 \\[ Oppdatering: Dette problemet ble sterkt minimert eller løst i ERDDAP™ versjon 1.24. \\]   
     
#### Logg{#log} 
*    ** [log.txt](#log) **   
Hvis ERDDAP™ starter ikke opp eller hvis noe ikke fungerer som forventet, er det veldig nyttig å se på feilen og diagnostiske meldinger i ERDDAP™ Loggfil.
    * Loggfilen er *bigParentDirectory* /logg/log.txt
         ( *bigParentDirectory* er spesifisert i [config.xml](/docs/server-admin/deploy-install#setupxml) ) .. Hvis det ikke er logg. txt fil eller hvis loggen. txt-filen har ikke blitt oppdatert siden du startet på nytt ERDDAP™ Se i [Tomcat loggfiler](#tomcat-logs) For å se om det er en feilmelding der.
    * Typer diagnostiske meldinger i loggfilen:
        * Ordet terror brukes når noe gikk så galt at prosedyren ikke klarte å fullføre. Selv om det er irriterende å få en feil, tvinger feilen deg til å håndtere problemet. Vår tanke er at det er bedre å kaste en feil, enn å ha ERDDAP™ Hobble langs, jobber på en måte du ikke forventet.
        * Ordet warning brukes når noe gikk galt, men prosedyren var i stand til å bli fullført. De er ganske sjeldne.
        * Alt annet er bare en informativ melding. Du kan kontrollere hvor mye informasjon som er logget med [&lt;loggnivå&gt;] (/docs/server-admin/datasett#loglevel)   datasets.xml ..
        * Datasett reloads og brukerresponser som tar &gt; 10 sekunder for å fullføre (vellykket eller vellykket) er merket med " (&gt;10s&#33;)  ". Derfor kan du søke i log.txt-filen for å finne datasettene som var langsomme å laste på nytt eller forespørselsnummer på forespørsler som var langsomme å fullføre. Du kan deretter se høyere ut i log.txt-filen for å se hva datasettet problem var eller hva brukerforespørselen var og hvem det var fra. Disse sakte datasett belastninger og brukerforespørsler er noen ganger skatt på ERDDAP .. Så å vite mer om disse forespørsler kan hjelpe deg å identifisere og løse problemer.
    * Informasjon er skrevet til loggfilen på diskstasjonen i ganske store biter. Fordelen er at dette er svært effektivt - ERDDAP™ vil aldri blokkere venter på at informasjonen skal skrives til loggfilen. Ulempen er at loggen nesten alltid vil avsluttes med en delvis melding, som ikke vil bli fullført før den neste delen er skrevet. Du kan gjøre det oppdatert (Et øyeblikk) ved å se på din ERDDAP Status nettside påhttps://*your.domain.org*/erddap/status.html  (eller http:// hvis https er ikke aktivert) ..
    * Når log.txt-filene kommer til 20 MB,
Filen er omdøpt logg. txt.første og en ny log.txt-fil opprettes. Loggfiler samles ikke.
        
I setup.xml kan du angi en annen maksimal størrelse for loggfilen i Megabytes. Minimum tillatt er 1 (MB) .. Maks tillatt er 2000 (MB) .. Standarden er 20 (MB) .. For eksempel:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```

    * Når du starter på nytt ERDDAP™ ,
         ERDDAP™ gjør en arkivkopi av log.txt og logg. txt.første filer med et tidsmerke i filens navn. Hvis det var problemer før omstart, kan det være nyttig å analysere disse arkiverte filene for ledetråder om hva problemet var. Du kan slette arkivfilene hvis de ikke lenger er nødvendig.
         
##### Fordeler log.txt{#parsing-logtxt} 
 ERDDAP Loggen. txt-filen er ikke designet for å tolke (Selv om du kan være i stand til å skape regelmessige uttrykk som trekke ønsket informasjon) .. Det er designet for å hjelpe et menneske å finne ut hva som går galt når noe går galt. Når du sender en feil eller problemrapport til ERDDAP™ Utviklere, når det er mulig, vennligst inkludere all informasjonen fra log.txt-filen relatert til den problematiske forespørselen.

Av effektivitetsgrunner, ERDDAP™ Skriver kun informasjon for å logge. txt etter en stor bit informasjon har samlet seg. Hvis du besøker loggen. txt rett etter at en feil har skjedd, kan det hende at opplysninger relatert til feilen ennå ikke er skrevet til log.txt. For å få perfekt oppdatert informasjon fra log.txt, besøk din ERDDAP 's [status.html siden](#status-page) .. Når ERDDAP™ prosesser som forespørsel, spyler den all påventende informasjon for å logge.txt.

For ERDDAP™ bruksstatistikk, bruk [Apache og/eller Tomcat loggfiler](#tomcat-logs) i stedet for ERDDAP Log.txt. Merk at ERDDAP 's [status.html siden](#status-page)   (Noen) og [Daglig rapport](#daily-report)   (mer) har et stort antall bruksstatistikk forhåndsberegnet for deg.
    
### Tomcat Logs{#tomcat-logs} 
Hvis ERDDAP™ starter ikke fordi en feil oppstod tidlig i ERDDAP oppstarten av feilmeldingen vises i Tomcats loggfiler ( *tomcat* /logg/catalina. *i dag* .log eller *tomcat* /logs/catalina.out) Ikke i [ ERDDAP log.txt-fil](#log) ..

Bruksstatistikk: For de fleste av informasjonen som folk vil samle fra en loggfil (f.eks. bruksstatistikk) , vennligst bruk Apache og/eller Tomcat loggfiler. De er godt formatert og har den typen informasjon. Det er mange verktøy for å analysere dem, for eksempel [AWstats](https://www.awstats.org) , [ElasticSearch's Kibana](https://www.elastic.co/products/kibana) , og [JMetter](https://jmeter.apache.org) , men søk på nettet for å finne det riktige verktøyet for dine formål.

Merk at loggfilene kun identifiserer brukere som IP-adresser. Det er nettsteder som hjelper deg med å få informasjon relatert til en gitt IP-adresse, f.eks. [WhatIsMyIPAssass](https://whatismyipaddress.com/ip-lookup) , men du normalt ikke kan finne navnet på brukeren.

Også på grunn av [DHCP](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol) , kan en gitt brukers IP-adresse være annerledes på forskjellige dager, eller ulike brukere kan ha samme IP-adresse på forskjellige tidspunkter.

Alternativt kan du bruke noe som [Google Analytics](https://analytics.google.com/analytics/web/provision/?authuser=0#/provision) .. Men pass på: Når du bruker eksterne tjenester som Google Analytics, gir du opp brukernes personvern ved å gi Google full tilgang til aktiviteten sin på nettstedet ditt som Google (og andre?) kan holde evig og bruke til ethvert formål (Ikke teknisk, men sannsynligvis i praksis) .. Brukerne dine har ikke samtykket til dette og er sannsynligvis ikke klar over at de vil bli sporet på nettstedet ditt, akkurat som de sannsynligvis ikke er klar over den grad de blir sporet på nesten alle nettsteder. I disse dager er mange brukere veldig bekymret for at alt de gjør på nettet blir overvåket av disse store selskapene (Google, Facebook osv.) og av regjeringen, og finne dette et ulovlig innbrudd i deres liv (som i boken 1984) .. Dette har drevet mange brukere til å installere produkter som [Personvern Badger](https://www.eff.org/privacybadger/faq) å minimere sporing, å bruke alternative nettlesere som [Tor nettleser](https://www.torproject.org/)   (eller slå av sporing i tradisjonelle nettlesere) og å bruke alternative søkemotorer som [Duck Duck Go](https://duckduckgo.com/) .. Hvis du bruker en tjeneste som Google Analytics, vennligst dokumenter bruken og konsekvensene ved å endre&lt;standard PersonvernPolicy&gt; tag in ERDDAP 's
 \\[ tomcat \\] /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml fil.
    
### E-postlogg{#e-mail-log} 
*    **emailLogYEAR-MM-DD.txt**   
     ERDDAP™ Alltid skriver teksten til alle utgående e-postmeldinger i dagens e-post LogYEAR-MM-DD.txt-fil i *bigParentDirectory* /logs ( *bigParentDirectory* er spesifisert i [config.xml](/docs/server-admin/deploy-install#setupxml) ) ..
    * Hvis serveren ikke kan sende ut e-postmeldinger, eller hvis du har konfigurert ERDDAP™ ikke å sende e-postmeldinger, eller hvis du bare er nysgjerrig, er denne filen en praktisk måte å se alle e-postmeldingene som er sendt ut.
    * Du kan slette tidligere dagers e-post loggfiler hvis de ikke lenger er nødvendig.
         
### Daglig rapport{#daily-report} 
Daily Report har mye nyttig informasjon -- all informasjon fra din ERDDAP 's [ /erddap/status.html side](#status-page) og mer.
    * Det er det mest komplette sammendraget av din ERDDAP Status.
    * Blant annet statistikk inneholder det en liste over datasett som ikke lastet og unntakene de genererte.
    * Det genereres når du starter ERDDAP™   (Like etter ERDDAP™ avslutter forsøk på å laste alle datasettene) og generert kort tid etter 7 er lokal tid hver morgen.
    * Når det genereres, er det skrevet til [ ERDDAP log.txt-fil](#log) ..
    * Når det genereres, blir det sendt til&lt;e-postDailyReportsTo&gt; og&lt;e-post Alt Til &gt; (som er angitt i [config.xml](/docs/server-admin/deploy-install#setupxml) ) Hvis du har konfigurert e-postsystemet (i setup.xml) ..

### Statusside{#status-page} 
Du kan se statusen til din ERDDAP™ fra enhver nettleser ved å gå til&lt;baseUrl&gt; /erddap/status.html 
* Denne siden genereres dynamisk, så den har alltid oppdatert statistikk for din ERDDAP ..
* Det inkluderer statistikk om antall forespørsler, minnebruk, trådstabelspor, oppgavenTread, etc.
* Siden statussiden kan ses av alle, inkluderer den ikke så mye informasjon som [Daglig rapport](#daily-report) ..
         
### Legge til/henge datasett{#addingchanging-datasets} 
 ERDDAP™ Vanligvis omleses datasets.xml hver *LastDatasettMinminuter*   (angitt i [config.xml](/docs/server-admin/deploy-install#setupxml) ) .. Du kan gjøre endringer i datasets.xml Når som helst, selv mens ERDDAP™ Jeg løper.
Et nytt datasett vil bli oppdaget snart, vanligvis innen *LastDatasettMinminuter* ..
Et endret datasett vil bli lastet på nytt når det er *reloadEveryNMinutes* gammel (som angitt i datasets.xml ) ..
    
#### Flag{#flag} 
*    ** [En flaggfil](#flag) Forteljinger ERDDAP™ Prøv å laste datasett på nytt så snart som mulig** 
    
    *    ERDDAP™ vil ikke merke noen endringer i et datasetts oppsett i datasets.xml inntil ERDDAP™ Laster datasettet på nytt.
         
    * Å fortelle ERDDAP™ å laste om et datasett så snart som mulig (før datasettets&lt;reloadEveryNMinutes&gt; vil føre til at den lastes på nytt), legger en fil i *bigParentDirectory* /flag ( *bigParentDirectory* er spesifisert i [config.xml](/docs/server-admin/deploy-install#setupxml) ) Det har samme navn som datasettets datasetID ..
Dette forteller ERDDAP™ å prøve å laste datasettet på nytt.
Den gamle versjonen av datasettet vil forbli tilgjengelig for brukerne inntil den nye versjonen er tilgjengelig og byttet atomisk på plass.
For EDDGrid Fra Filer og EDDTable FraFiles, vil reloading datasettet se etter nye eller endret filer, lese dem og inkludere dem i datasettet. Så tiden å laste på er avhengig av antall nye eller endret filer.
Hvis datasettet har active="false", ERDDAP™ vil fjerne datasettet.
         
##### Dårlige filer flagg{#bad-files-flag} 
* En variant av /flag-katalogen er /badFilesFlag-katalogen. (Lagt til i ERDDAP™ v2.12.)   
Hvis du legger en fil i *bigParentDirectory* /badFilesFlag katalog med en datasetID som filtypen (Filinnholdet spiller ingen rolle) Så så så snart ERDDAP™ Ser de dårlige Filene Flaggfil, ERDDAP™ vil:
    
    1. Slett BadFilesFlag-filen.
    2. Slett de dårlige filene .nc fil (Hvis det finnes en) , som har listen over dårlige filer for det datasettet.
For datasett som EDDGrid SideBySide som har barnedatasett, sletter dette også dårligFiles .nc fil for alle barnedatasett.
    3. Last datasettet ASAP på nytt.
    
Dette fører til ERDDAP™ å prøve igjen å jobbe med filene tidligere (Feilaktig?) Merket som dårlig.
         
##### Hard Flag{#hard-flag} 
* En annen variant av / flagg-katalogen er /hardFlag-katalogen. (Lagt til i ERDDAP™ v1.74.)   
Hvis du legger en fil i *bigParentDirectory* /hardFlag med en datasetID som filtypen (Filinnholdet spiller ingen rolle) Så så så snart ERDDAP™ Se den harde Flaggfil, ERDDAP™ vil:
    
    1. Slett HardFlag-filen.
    2. Fjern datasettet fra ERDDAP ..
    3. Slett all informasjon som ERDDAP™ har lagret om dette datasettet.
For EDDGrid Fra Filer og EDDTable FraFiles underklasser sletter dette den interne databasen over datafiler og innholdet.
For datasett som EDDGrid SideBySide som har barnedatasett, sletter dette også den interne databasen over datafiler og deres innhold for alle barnedatasett.
    4. Last datasettet på nytt.
For EDDGrid Fra Filer og EDDTable FraFiles underklasser, dette forårsaker ERDDAP™ å lese om **alle** av datafilene. Derfor er reloadtiden avhengig av det totale antall datafiler i datasettet. Fordi datasettet ble fjernet fra ERDDAP™ Når det hardFlag ble lagt merke til, vil datasettet være utilgjengelig inntil datasettet avsluttes på nytt. Vær tålmodig. Se inn i [log.txt](#log) fil hvis du vil se hva som skjer.
    
HardFlag-varianten sletter datasettets lagrede informasjon, selv om datasettet for tiden ikke lastes inn ERDDAP ..
    
Hard Flaggene er svært nyttige når du gjør noe som forårsaker en endring i hvordan ERDDAP™ leser og tolker kildedataene, for eksempel når du installerer en ny versjon av ERDDAP™ eller når du har gjort endringer i et datasetts definisjon i datasets.xml 
    
* Innholdet i flagget, badFilesFlag og hardFlag-filer er irrelevant. ERDDAP™ Bare se på filnavnet for å få datasetID ..
     
* I mellom store datasett reloads, ERDDAP™ ser kontinuerlig for flagg, badFilesFlag, og hardFlag filer.
     
* Merk at når et datasett lastes på nytt, alle filer i *bigParentDirectory* / [cache](#cached-responses) / * datasetID * Katalogen slettes. Dette inkluderer .nc og bildefiler som vanligvis er cached i ~ 15 minutter.
     
* Merk at dersom datasettets xml inkluderer [aktiv="falsk"](/docs/server-admin/datasets#active) et flagg vil gjøre datasettet inaktivt (hvis den er aktiv) , og i alle fall ikke lastet på nytt.
     
* Når som helst ERDDAP™ kjører LoadDatasett for å gjøre en større reload (den tidsstyrte reload kontrollert av&lt;loadDatasetsMinMinMinutes&gt;) eller en mindre reload (som følge av et eksternt eller internt flagg) , ERDDAP™ Leser alle&lt;dekomprimertCacheMaxGB&gt;,&lt;dekomprimertCacheMaxMinutesOld&gt;,&lt;bruker&gt;,&lt;forespørselBlacklist&gt;,&lt;sakteDownTroubleMillis&gt;, og&lt;emailBlacklist&gt; tagger og bytter til de nye innstillingene. Så du kan bruke et flagg som en måte å få ERDDAP™ Legg merke til endringer i disse taggene ASAP.

##### Sette Datasett-flagg{#set-dataset-flag} 
*   ERDDAP™ har en webtjeneste slik at flagg kan settes via nettadresser.
    
    * For eksempel
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
         (Det er et falskt flagg Nøkkel) vil sette et flagg for RPmelTao datasett.
    * Det finnes en annen flaggKey for hver datasetID ..
    * Administratorer kan se en liste over flaggadresser for alle datasett ved å se på bunnen av deres [Daglig rapport](#daily-report) e-post.
    * Administratorer bør behandle disse URL-ene som konfidensielle, siden de gir noen rett til å tilbakestille et datasett på viljen.
    * Hvis du tror at flaggetKeys har falt i hendene på noen som misbruger dem, kan du endre&lt;flaggKeyKey&gt; i [config.xml](/docs/server-admin/deploy-install#setupxml) og omstart ERDDAP å tvinge ERDDAP™ å generere og bruke et annet sett av flaggKeys.
    * Hvis du endrer deg&lt;flaggKeyKey&gt;, slette alle de gamle abonnementene (Se listen i din daglige rapport) Og husk å sende de nye URL-ene til de som du vil ha dem.
    
Flaggsystemet kan fungere som grunnlag for en mer effektiv mekanisme for å fortelle ERDDAP™ Når å laste datasettet på nytt. Du kan for eksempel sette et datasetts&lt;reloadEveryNMinutes&gt; til et stort antall (For eksempel 10080 = 1 uke) .. Når du vet at datasettet har endret seg (kanskje fordi du la til en fil i datasettets datakatalog) , angi et flagg slik at datasettet lastes på nytt så snart som mulig. Flaggene blir vanligvis sett raskt. Men hvis LoadDatasets-tråden allerede er opptatt, kan det være en stund før den er tilgjengelig å handle på flagget. Men flaggsystemet er mye mer responsivt og mye mer effektivt enn å sette&lt;reloadEveryNMinutes&gt; til et lite tall.
    
#### Fjerne datasett{#removing-datasets} 
Hvis et datasett er aktivt i ERDDAP™ og du vil deaktivere den midlertidig eller permanent:
1. I datasets.xml For datasettet, sett [aktiv="falsk"](/docs/server-admin/datasets#active) i datasettsmerket.
2. Vent på ERDDAP™ å fjerne datasettet i neste store reload eller [Sett et flagg](#flag) for datasett å fortelle ERDDAP™ å se denne endringen så snart som mulig. Når du gjør dette, ERDDAP™ ikke kaste ut noen informasjon det kan ha lagret om datasettet og absolutt ikke gjør noe mot de faktiske dataene.
3. Deretter kan du forlate det aktive=-falske - datasett i datasets.xml eller fjerne det.
         
#### Når lastes datasettene på nytt?{#when-are-datasets-reloaded} 
En tråd kalt RunLoadDatasets er hovedtråden som styrer når datasett lastes på nytt. RunLoad Datasett loops for alltid:

1. RunLoadDatasett merker gjeldende tid.
2. RunLoadDatasets starter en LoadDatasets tråd for å gjøre en "majorLoad". Du kan se informasjon om den gjeldende/tidligere store Last øverst på din ERDDAP 's
     [ /erddap/status.html side](#status-page)   (For eksempel [eksempel på statusside](https://coastwatch.pfeg.noaa.gov/erddap/status.html) ) ..
    
    1. Lastedatasett gjør en kopi av datasets.xml ..
    2. LasteDatasett leser gjennom kopien av datasets.xml og for hvert datasett, se om datasettet må være (re) Lastet eller fjernet.
        * Hvis a [flagg](#flag) filen eksisterer for dette datasettet, filen slettes og datasettet fjernes dersom aktiv="falsk" eller (re) Lastet hvis aktiv=" True" (Uavhengig av datasettets alder) ..
        * Hvis datasettets datasett.xml-del har aktiv="falsk" og datasettet lastes for tiden (aktiv) , den er losset (fjernet) ..
        * Hvis datasettet har aktiv=" true" og datasettet ikke allerede lastes inn, er det lastet.
        * Hvis datasettet har aktiv=" sant" og datasettet allerede er lastet inn, lastes datasettet på nytt hvis datasettets alder (tid siden siste belastning) er større enn dens&lt;Last på nytt Hver NMinutes &gt; (standard = 10080 minutter) Ellers er datasettet alene.
    3. Lastedatasett er ferdig.
    
RunLoadDataset-tråden venter på at LoadDataset-tråden skal avsluttes. Hvis lastedatasett tar lengre tid enn lastdatasett MinMinutes (som spesifisert i setup.xml) , RunLoadDatasett avbryter LoadDatasett tråden. Ideelt sett legger LoadDataset merke til avbruddet og avslutter. Men hvis det ikke merker avbruddet i løpet av et minutt, ringer RunLoadDatasetts lastDatasett. stopp () som er uønsket.
3. Mens tiden siden starten på den siste store lasten er mindre enn lastdatasett MinMinutes (som angitt i oppsett.xml, f.eks. 15 minutter) , RunLoadDatasett gjentatte ganger ser etter [flagg](#flag) Filer i *bigParentDirectory* /flag katalog. Hvis en eller flere flaggfiler finnes, slettes de, og RunLoadDatasets starter en LastDatasetts-tråd for å gjøre en "minorLoad" (majorLoad=falske) .. Du kan ikke se mindre Last informasjon om din ERDDAP 's [ /erddap/status.html side](#status-page) ..
    1. Lastedatasett gjør en kopi av datasets.xml ..
    2. LasteDatasett leser gjennom kopien av datasets.xml og for hvert datasett som det var en flaggfil for:
        * Hvis datasettets datasett.xml-del har aktiv="falsk" og datasettet lastes for tiden (aktiv) , den er losset (fjernet) ..
        * Hvis datasettet har aktiv=" sant", er datasettet (re) Lastet, uansett alder. Ikke-flaggede datasett ignoreres.
    3. Lastedatasett er ferdig.
4. RunLoad Datasett går tilbake til trinn 1.

Merknader:
* Start
Når du starter på nytt ERDDAP™ Hvert datasett med aktiv=" sant" er lastet.
* Cache
Når et datasett er (re) lastet, dens cache (inkludert dataresponsfiler og/eller bildefiler) er tømt.
* Mange datasett
Hvis du har mange datasett og/eller et eller flere datasett er langsomme til (re) last, en Lastdatasetts tråd kan ta lang tid å fullføre arbeidet sitt, kanskje enda lengre enn lastdatasett Minminuter.
* En lastdatasett tråd
Det er aldri mer enn én lastdatasett tråd som kjører på én gang. Hvis et flagg er satt når Lastedatasett allerede kjører, vil flagget sannsynligvis ikke bli lagt merke til eller handlet på før den Lastedatasett tråden er ferdig. Du kan si: Det er dumt. Hvorfor ikke bare starte en rekke nye tråder for å laste datasett?" Men hvis du har mange datasett som får data fra en ekstern server, vil selv én LoadDatasets tråd sette betydelig stress på den eksterne serveren. Det samme gjelder hvis du har mange datasett som får data fra filer på én RAID. Det er raskt reduserende avkastning fra å ha mer enn én LastDatasett tråd.
* Flagg = ASAP
Å sette et flagg bare signaler om at datasettet skal være (re) Lastet så snart som mulig, ikke nødvendigvis umiddelbart. Hvis det ikke er noen LastDatasets-tråd som kjører, starter datasettet på nytt innen få sekunder. Men hvis en LoadDatasets tråd kjører for tiden, vil datasettet sannsynligvis ikke bli lastet på nytt før etter det er LoadDatasets tråd ferdig.
* Flagfil slettet
Generelt, hvis du legger en flaggfil i *bigParentDirectory* /erddap/flag katalog (ved å besøke datasettets flagg Url eller legg en faktisk fil der) Datasettet vil vanligvis bli lastet på nytt umiddelbart etter at flaggfilen er slettet.
* Flagg mot liten reload Alle NMinutes
Hvis du har en ekstern måte å vite når et datasett må lastes på nytt, og hvis det er praktisk for deg, er den beste måten å sørge for at et datasett alltid er oppdatert å angi sin reload Alle NMinutes til et stort antall (10080?) og satt et flagg (via et manus?) Når det må lastes på nytt. Det er systemet som EDDGrid FraErddap og EDDTableFromErddap bruk mottar meldinger som datasettet må lastes på nytt.
* Sjekk inn log.txt
Mye relevant informasjon er skrevet til *bigParentDirectory* /logs/log.txt fil. Hvis ting ikke fungerer som du forventer, se på logg. txt lar deg diagnostisere problemet ved å finne ut nøyaktig hva ERDDAP™ Det gjorde jeg.
    
    * Søk etter "majorLoad=true" for å starte store LastDataset-tråder.
    * Søk etter "majorLoad=false" for å starte mindre Lastedatasetts tråder.
    * Søk etter et gitt datasett datasetID for informasjon om det å være (re) Lastet eller spurt.
        
          
         
#### Cachede svar{#cached-responses} 
Generelt, ERDDAP™ ikke cache (lager) svar på brukerforespørsler. Rasjonaliteten var at de fleste forespørsler ville være litt annerledes så cache ville ikke være veldig effektiv. De største unntakene er forespørsler om bildefiler (som er cached siden nettlesere og programmer som Google Earth Ofte spør jeg om bilder) Forespørsler om .nc filer (Fordi de ikke kan opprettes på flugen) .. ERDDAP™ lagrer hvert datasetts cachede filer i en annen mappe: *bigParentDirectory* /cache/ * datasetID * siden en enkelt cache-mappe kan ha et stort antall filer som kan bli langsomme å få tilgang til.
Filene fjernes fra cache av en av tre grunner:
* Alle filer i denne bufferen slettes når ERDDAP™ er på nytt.
* Periodisk, noen fil mer enn&lt;cacheMinutes&gt; gammel (som angitt i [config.xml](/docs/server-admin/deploy-install#setupxml) ) vil bli slettet. Fjerne filer i cache basert på alder (Ikke minst brukt) sikrer at filer ikke vil bo i cache veldig lenge. Selv om det kan virke som en gitt forespørsel bør alltid returnere det samme svaret, er det ikke sant. For eksempel en tabledap forespørsel som inkluderer &time&gt; *Noen Tid* vil endre seg dersom nye data kommer til datasettet. Og en forespørsel som inkluderer \\[ siste \\] for tidsdimensjonen vil endres hvis nye data kommer til datasettet.
* Bilde som viser feilbetingelser er cached, men bare i noen minutter (Det er en vanskelig situasjon) ..
* Hver gang et datasett lastes på nytt, slettes alle filer i det datasettets cache. Fordi forespørsler kan være for "last" indeks i et rutenettet datasett, kan filer i bufferen bli ugyldige når et datasett lastes på nytt.
         
#### Lagret datasettinformasjon{#stored-dataset-information} 
For alle typer datasett, ERDDAP™ samler mye informasjon når et datasett lastes og holder det i minnet. Dette tillater ERDDAP™ å svare veldig raskt på søk, forespørsler om lister over datasett og forespørsler om informasjon om et datasett.

For noen typer datasett (spesielt EDDGrid Kopier, EDDTableCopy, EDDGrid Fra *Xxx* Filer og EDDTableFra *Xxx* Filer) , ERDDAP™ lagrer på disken litt informasjon om datasettet som gjenbrukes når datasettet lastes på nytt. Dette øker i høy grad reloading prosessen.

* Noen av datasett-informasjonsfilene er menneskelige leselige .json filer og lagres i *bigParentDirectory* /datasett/ *Last2LettersOfDatasetID/ datasetID * ..
*    ERDDAP™ Sletter bare disse filene i uvanlige situasjoner, for eksempel hvis du legger til eller sletter en variabel fra datasettets datasets.xml En bit.
* De fleste endringer i et datasett datasets.xml bunt (For eksempel å endre en global attributt eller en variabel attributt) Ikke nødvendig at du sletter disse filene. En regelmessig datasett reload vil håndtere disse typene endringer. Du kan fortelle ERDDAP™ å laste om et datasett ASAP ved å sette en [flagg](#flag) For datasettet.
* På samme måte vil tillegg, sletting eller endring av datafiler håndteres når ERDDAP™ Laster om et datasett. Men ERDDAP™ vil merke denne typen endring snart og automatisk hvis datasettet bruker [&lt;OppdaterEveryNMillis&gt;] (/docs/server-admin/datasett) systemet.
* Det bør bare sjelden være nødvendig for deg å slette disse filene. Den vanligste situasjonen der du trenger å tvinge ERDDAP™ slette den lagrede informasjonen (fordi det er utdatert/inkorrekt og ikke vil bli automatisk fikset av ERDDAP ) Når du gjør endringer i datasettets datasets.xml bit som påvirker hvordan ERDDAP™ tolker data i kildedatafiler, for eksempel endring av tidsvariabelens formatstreng.
* Hvis du vil slette et datasetts lagrede informasjonsfiler fra en ERDDAP™ Det kjører (Selv om datasettet ikke er lastet for tiden) , sette en [hard Flag](#hard-flag) For det datasettet. Husk at hvis et datasett er en sammenslåing av et stort antall filer, kan det ta betydelig tid å laste datasettet på nytt.
* Hvis du vil slette et datasetts lagrede informasjonsfiler når ERDDAP™ ikke løper, løper [DasDds](/docs/server-admin/datasets#dasdds) For det datasettet (som er lettere enn å finne ut i hvilken mappe informasjonen er plassert og slette filene for hånd) .. Husk at hvis et datasett er en sammenslåing av et stort antall filer, kan det ta betydelig tid å laste datasettet på nytt.
         
### Minnestatus{#memory-status} 
 ERDDAP™ Bør aldri krasje eller fryse. Hvis det gjør det, er en av de mest sannsynlige årsakene utilstrekkelig hukommelse. Du kan overvåke minnebruken ved å se på status.html nettsiden, som inkluderer en linje som

0 gc-samtaler, 0 forespørsler skure og 0 farlige Minne e-post siden siste store lastdatasett

 (Dette er gradvis mer alvorlige hendelser)   
MB iBruk og gc ringer kolonner i statistikktabellen. Du kan fortelle hvordan minnestressert din ERDDAP™ ved å se på disse tallene. Høyere antall indikerer mer stress.

* MB i bruk bør alltid være mindre enn halvparten av [\\-Xmx minneinnstilling](/docs/server-admin/deploy-install#memory) .. Større tall er et dårlig tegn.
* gc-samtaler indikerer antall ganger ERDDAP™ kalt søppelsamler for å prøve å lindre høy minnebruk. Hvis dette blir &gt; 100, er det et tegn på alvorlige problemer.
* skur indikerer antall innkommende forespørsler som ble kastet (med HTTP-feilnummer 503, Service Utilgjengelig) Fordi minnebruken allerede var for høy. Ideelt sett bør ingen forespørsler kastes. Det er greit hvis noen forespørsler er kastet, men et tegn på alvorlig problemer hvis mange er kastet.
* farlig Minneemails - Hvis minnebruken blir farlig høy, ERDDAP™ Sender en e-post til e-postadressene som er oppført i&lt;e-post Alt Til &gt; (i setup.xml) med en liste over de aktive brukerforespørsler. Som e-posten sier, vennligst send disse e-postene til Chris. John ved noaa. gov slik at vi kan bruke informasjonen til å forbedre fremtidige versjoner av ERDDAP ..
     

Hvis din ERDDAP™ er minnestressert:
* Vurder å gi mer av serverens minne til ERDDAP™ Ved å endre Tomcat [‐Xmx minneinnstilling](/docs/server-admin/deploy-install#memory) ..
* Hvis du allerede har tildelt så mye minne som du kan ERDDAP™ via -Xmx, vurdere å kjøpe mer minne til serveren din. Minne er billig (i forhold til prisen på en ny server eller din tid) &#33; Deretter øke -Xmx.
* I datasets.xml , sett&lt;nGridThreads &gt; til 1, sett&lt;nTabellTreads&gt; til 1, og sett&lt;ipAdresseMaxRequestsActive &gt; til 1.
* Se på forespørsler i log.txt for ineffektive eller problemer (men lovlig) Forespørsler. Legg til IP-adresser i&lt;forespørselBlacklist&gt; i datasets.xml .. Den svarte listen feilmelding inkluderer ERDDAP™ administratorens e-postadresse med håp om at brukerne vil kontakte deg slik at du kan jobbe med dem for å bruke ERDDAP™ mer effektivt. Det er bra å holde en liste over IP-adresser du svarteliste og hvorfor, slik at du kan jobbe med brukerne hvis de kontakter deg.
* Se på forespørsler i log.txt for forespørsler fra ondsinnede brukere. Legg til IP-adresser i&lt;forespørselBlacklist&gt; i datasets.xml .. Hvis lignende forespørsler kommer fra flere lignende IP-adresse, kan du bruke noen som-er tjenester (f.eks. [https://www.whois.com/whois/](https://www.whois.com/whois/) ) å finne ut rekkevidden av IP-adresser fra den kilden og svartliste hele området. Se [&lt;forespørselBlacklist&gt; dokumentasjon] (/docs/server-admin/datasett#requestblacklist) ..
         
#### OutOfMemory feil{#outofmemoryerror} 
Når du setter opp ERDDAP™ , du angir den maksimale mengden minne som Java kan brukes via [\\-Xmx innstilling](/docs/server-admin/deploy-install#memory) .. Hvis ERDDAP™ Noen gang trenger mer minne enn det, vil det kaste en java. Lang. OutOfMemory feil. ERDDAP™ gjør mye kontroll for å gjøre det mulig å håndtere den feilen graciøst (F.eks. vil en vanskelig forespørsel mislykkes, men systemet beholder sin integritet) .. Men noen ganger skader feilen systemets integritet, og du må omstarte ERDDAP .. Jeg håper det er sjeldent.

Den raske og enkle løsningen på en OutOfMemoryError er å øke [\\-Xmx innstilling](/docs/server-admin/deploy-install#memory) , men du bør aldri øke innstillingen -Xmx til mer enn 80% av det fysiske minnet på serveren (For eksempel, for en 10GB-server, ikke sett -Xmx over 8GB) .. Minne er relativt billig, så det kan være et godt alternativ å øke minnet på serveren. Men hvis du har maximert minnet i serveren eller av andre grunner ikke kan øke det, må du håndtere mer direkte med årsaken til OutOfMemoryError.

Hvis du ser i [log.txt](#log) fil for å se hva ERDDAP™ gjorde når feilen oppstod, kan du vanligvis få en god ledetråd om årsaken til OutOfMemoryError. Det er mange mulige årsaker, blant annet:

* En enkelt enorm datafil kan forårsake OutOfMemoryError, spesielt enorme ASCII-datafiler. Hvis dette er problemet, bør det være åpenbar fordi ERDDAP™ vil ikke laste datasettet (for tabelldatasett) eller lese data fra den filen (for nettbaserte datasett) .. Løsningen, hvis det er mulig, er å dele filen i flere filer. Ideelt sett kan du dele filen i logiske deler. Hvis filen for eksempel har 20 måneders dataverdi, kan den deles i 20 filer, hver med 1 måneds dataverdi. Men det er fordeler selv om hovedfilen er delt opp vilkårlig. Denne tilnærmingen har flere fordeler: a) Dette vil redusere minnet som trengs for å lese datafilene til 1/20, fordi bare én fil leses om gangen. b) Ofte, ERDDAP™ kan håndtere forespørsler mye raskere fordi det bare må se i en eller noen få filer for å finne data for en gitt forespørsel. c) Hvis datainnsamlingen pågår, kan de eksisterende 20 filene forbli uendret, og du trenger bare å endre en, liten, ny fil for å legge til neste måneds dataverdi i datasettet.
* En enkelt stor forespørsel kan føre til OutOfMemoryError. Spesielt noen av orderBy alternativer har hele responsen i minnet i et sekund (For eksempel å gjøre en slags) .. Hvis svaret er enormt, kan det føre til feilen. Det vil alltid være noen forespørsler som på ulike måter er for store. Du kan løse problemet ved å øke -Xmx-innstillingen. Eller du kan oppfordre brukeren til å gjøre en rekke mindre forespørsler.
* Det er usannsynlig at et stort antall filer vil forårsake filindeksen som ERDDAP™ skaper å være så stor at filen ville forårsake feilen. Hvis vi antar at hver fil bruker 300 bytes, vil 1.000.000 filer bare ta opp 300 MB. Men datasett med et stort antall datafiler forårsaker andre problemer for ERDDAP Spesielt tar det lang tid å ERDDAP™ å åpne alle disse datafilene når du svarer på en brukerforespørsel om data. I dette tilfellet kan løsningen være å samle filene slik at det er færre datafiler. For tabelldatasett er det ofte flott hvis du lagrer dataene fra det aktuelle datasettet i [CF Diskret prøvetakingsgeometri (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Tagged Array datafiler (forespørsel .nc CF-filer fra ERDDAP ) Deretter lager vi et nytt datasett. Disse filene kan håndteres svært effektivt med ERDDAP 's [EDDTableFraNcCFFiler](/docs/server-admin/datasets#eddtablefromnccffiles) .. Hvis de er logisk organisert (hver med data for en bit plass og tid) , ERDDAP™ kan raskt trekke ut data fra dem.
* For tabelldatasett som bruker [&lt; subsetVariables &gt;] (/docs/server-admin/datasett#subsetvariables) attributt, ERDDAP™ gjør en tabell med unike kombinasjoner av verdiene til disse variablene. For store datasett eller når&lt; subsetVariables Denne tabellen kan være stor nok til å forårsake OutOfMemoryErrors. Løsningen er å fjerne variabler fra listen over&lt; subsetVariables &gt; som det er et stort antall verdier for, eller fjerne variabler etter behov til størrelsen på tabellen er rimelig. Delene av ERDDAP™ som bruker subsetVariables Systemet fungerer ikke bra (For eksempel lastes nettsider svært sakte) Når det er mer enn 100 000 rader i tabellen.
* Det er alltid mulig at flere samtidige store forespørsler (på en veldig travel ERDDAP ) kan kombineres for å forårsake hukommelsesproblemer. For eksempel vil 8 forespørsler, som hver bruker 1 GB hver, forårsake problemer for et -Xmx=8 GB oppsett. Men det er sjelden at hver forespørsel vil være på toppen av minnebruken samtidig. Og du vil lett kunne se at din ERDDAP™ Jeg er veldig opptatt av store forespørsler. Men det er mulig. Det er vanskelig å håndtere dette problemet annet enn ved å øke innstillingen -Xmx.
* Det er andre scenarier. Hvis du ser på [log.txt](#log) fil for å se hva ERDDAP™ gjorde da feilen oppstod, kan du vanligvis få en god ledetråd om årsaken. I de fleste tilfeller er det en måte å minimere dette problemet på (Se ovenfor) , men noen ganger trenger du bare mer minne og en høyere -Xmx innstilling.
         
### For mange åpne filer{#too-many-open-files} 
Begynner med ERDDAP™ v2.12, ERDDAP™ har et system til å overvåke antall åpne filer (som inkluderer sokkel og andre ting, ikke bare filer) i Tomcat på Linux datamaskiner. Hvis noen filer feilaktig aldri blir stengt (a "ressourcelekkasje) , antall åpne filer kan øke til det overstiger maksimum tillatt av operativsystemet og mange virkelig dårlige ting skjer. Så nå på Linux datamaskiner (fordi informasjonen ikke er tilgjengelig for Windows) :)

* Det er en "Open Files" kolonne lengst til høyre for status.html nettside som viser prosent av max filer åpne. På Windows viser det bare --.
* Når ERDDAP™ genererer denne informasjonen i slutten av hver større datasett reload, den vil skrive ut til loggen. txt-fil:
OpenFileCount= *Nåværende* av max= *max* %= *prosent* 
* Hvis prosenten er &gt; 50%, sendes en e-post til ERDDAP™ administrator og e-post Alt Til e-postadresser.

Hvis prosentandelen er 100%, ERDDAP™ Det er i forferdelige problemer. Ikke la dette skje.
Hvis prosentandelen er &gt; 75%, ERDDAP™ I nærheten av forferdelige problemer. Det er ikke greit.
Hvis prosentandelen er &gt; 50%, er det svært mulig at en pigg vil føre til at prosentandelen treffer 100.
Hvis andelen er &gt; 50%, bør du:
* Øk det maksimale antall åpne filer som tillates av enten:
    * Gjør disse endringene hver gang før du starter tomcat (sette dem i Tomcat oppstart.sh-filen?) :)
ulimit -Hn 16384
ulimit -Sn 16384
    * Eller gjøre en permanent endring ved å redigere (som rot) /etc/security/limits.conf og legger til linjene:
tomcat myk nofil 16384
tomcat hard nofil 16384
Disse kommandoene antar at brukeren som kjører Tomcat kalles "tomcat".
På mange Linux-varianter må du starte serveren på nytt for å bruke disse endringene. For begge alternativene er "16384" et eksempel. Du velger det nummer som du mener er best.
* Start på nytt ERDDAP .. Operativsystemet vil lukke alle åpne filer.
         
### Mislykkede forespørsler{#failed-requests} 
*    **Uvanlig aktivitet: &gt; 25% av forespørsler mislyktes**   
Som en del av alle reloaddatasett, som vanligvis er hvert 15. minutt, ERDDAP™ se på prosenten av forespørsler som ikke mislyktes siden siste reloaddatasett. Hvis det er &gt;25%, ERDDAP™ Sender e-post til ERDDAP™ administrator med emnet "Uvanlig aktivitet: &gt; 25% av forespørsler mislyktes". Denne e-posten inneholder en høy nær bunnen med tittelen "Requesters IP-adresse (Mislykkedes)   (Siden siste store lastedatasett)  ". Søk etter det. Det forteller deg IP-adressen til datamaskinene som gjør de mest mislykkede forespørsler. Du kan søke etter IP-adresser i \\[ bigParentDirectory \\] /logg/ [log.txt](#log) fil og se hvilken type forespørsler de gjør.
    
Du kan bruke brukerens IP-nummer (For eksempel med [https://whatismyipaddress.com/ip-lookup](https://whatismyipaddress.com/ip-lookup) ) å prøve å finne ut hvem eller hva brukeren er. Noen ganger vil det fortelle deg ganske nøyaktig hvem brukeren er (For eksempel, det er en søkemotors web crawler) .. Mesteparten av tiden gir det deg bare et spor (For eksempel, det er en Amazonaws-datamaskin, det er fra noe universitet, det er noen i en bestemt by) ..
    
Ved å se på den faktiske forespørselen, IP-nummeret og feilmeldingen (Alt fra [log.txt](#log) ) For en rekke feil kan du vanligvis finne ut hva som går galt. I min erfaring er det fire vanlige årsaker til mange mislykkede forespørsler:
    
1) Forespørsler er skadelig (f.eks. på utkikk etter sikkerhetssvakheter eller pålegg om forespørsler og deretter kansellere dem før de er fullført) .. Du bør bruke&lt;forespørselBlacklist&gt; i datasets.xml For å finne ut hvilke IP-adresser.
    
2) En søkemotor prøver naivt URL-ene som er oppført i ERDDAP™ nettsider og ISO 19115 dokumenter. For eksempel er det mange steder som lister basen OPeNDAP URL for eksempelhttps://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST, som brukeren skal legge til en filtype (f.eks. .das, .dds, .html) .. Men søkemotoren vet ikke dette. Forespørselen til grunnadressen mislykkes. En relatert situasjon er når søkemotoren genererer bizarre forespørsler eller prøver å fylle ut skjemaer for å komme til " skjult" nettsider. Men søkemotorene gjør ofte en dårlig jobb i dette, noe som fører til feil. Løsningen er: Skap en [robots.txt](#robotstxt) fil.
    
3) Noen bruker kjører et skript som gjentatte ganger ber om noe som ikke er der. Kanskje det er et datasett som pleide å eksistere, men er borte nå (midlertidig eller permanent) .. Reporter forventer ofte ikke dette og så ikke håndtere det intelligent. Så manuset fortsetter å gjøre forespørsler og forespørslene fortsetter å mislykkes. Hvis du kan gjette hvem brukeren er (fra IP-nummeret ovenfor) , kontakt dem og fortell dem at datasettet ikke lenger er tilgjengelig og be dem om å endre sitt skript.
    
4) Noe er virkelig galt med noen datasett. Vanligvis, ERDDAP™ vil gjøre det forstyrrede datasettet inaktivt. Noen ganger det ikke, så alle forespørsler til det bare føre til feil. I så fall, løse problemet med datasettet eller (Hvis du ikke kan) Sett datasettet til [aktiv="falsk"](/docs/server-admin/datasets#active) .. Dette kan føre til problem #2.
    
Noen ganger er feilene ikke så dårlige, spesielt hvis ERDDAP™ kan oppdage feilen og reagere veldig raskt (&lt;=1ms). Så du kan velge å ikke gjøre noe.
    
Hvis alt annet mislykkes, finnes det en universell løsning: Legg brukerens IP-nummer til [&lt;forespørselBlacklist&gt;] (/docs/server-admin/datasett#requestblacklist) .. Dette er ikke så ille eller så drastisk som det kan virke. Brukeren vil deretter få en feilmelding som sier s/han har blitt svartelistet og forteller dem din (den ERDDAP™ administratorens) e-postadresse. Noen ganger vil brukeren kontakte deg og du kan løse problemet. Noen ganger kontakter brukeren deg ikke, og du vil se nøyaktig samme oppførsel kommer fra et annet IP-nummer neste dag. Blacklist det nye IP-nummeret og håper de til slutt får meldingen. (Dette er din jordedag, som du aldri vil unnslippe fra. Beklager.) 
    
### robots.txt{#robotstxt} 
Søkemotorselskapene bruker web crawlers (f.eks. Google Bot) å undersøke alle sidene på nettet for å legge til innholdet i søkemotorene. For ERDDAP™ Det er i utgangspunktet bra. ERDDAP™ har mange lenker mellom sider, så kryperne vil finne alle nettsidene og legge dem til i søkemotorene. Da vil brukere av søkemotorene kunne finne datasett på din ERDDAP ..
    
Dessverre, noen web crawlers (f.eks. Google Bot) Fyller ut og sender inn skjemaer for å finne ekstra innhold. For nettsider er dette flott. Men dette er forferdelig for ERDDAP™ For det fører til et **uendelig** antall uønskede og meningsløse forsøk på å krype de faktiske dataene. Dette kan føre til flere forespørsler om data enn fra alle andre brukere. Og det fyller søkemotoren med goofy, meningsløse undergrupper av de faktiske dataene.
    
For å fortelle web crawlers å slutte å fylle ut skjemaer og bare generelt ikke se på nettsider de ikke trenger å se på, må du opprette en tekstfil kalt [robots.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard) i rotkatalogen til nettstedets dokumenthierarki slik at det kan ses av alle som f.eks.http://*www.your.domain*/robots.txt..
Hvis du lager nye roboter. txt-fil, dette er en god start:
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
     (Men erstatte *din.institutions.url* med din ERDDAP Base URL.)   
Det kan ta noen dager for søkemotorene å legge merke til og for at endringene skal tre i kraft.
     
### Sitemap.xml{#sitemapxml} 
Som [https://www.sitemaps.org](https://www.sitemaps.org/) Nettsiden sier:

> Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. In its simplest form, a Sitemap is an XML file that lists URLs for a site along with additional metadata about each URL (when it was last updated, how often it usually changes, and how important it is, relative to other URLs on the site) so that search engines can more intelligently crawl the site.
> 
> Web crawlers usually discover pages from links within the site and from other sites. Sitemaps supplement this data to allow crawlers that support Sitemaps to pick up all URLs in the Sitemap and learn about those URLs using the associated metadata. Using the Sitemap protocol does not guarantee that web pages are included in search engines, but provides hints for web crawlers to do a better job of crawling your site.

Faktisk, siden ERDDAP™ er RESTful , søkemotor edderkopper kan enkelt krype din ERDDAP .. Men de har en tendens til å gjøre det oftere (daglig&#33;) enn nødvendig (Månedlig?) ..

* Siden hver søkemotor kan krype hele din ERDDAP™ Hver dag kan det føre til mange unødvendige forespørsler.
* Så ERDDAP™ genererer en sitemap.xml-fil for din ERDDAP™ som forteller søkemotorer at din ERDDAP™ Bare må krypes hver måned.
* Du bør legge til en referanse til ERDDAP 's sitemap.xml til din [robots.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard) fil:
Sitemap:http://**www.yoursite.org**/erddap/sitemap.xml
* Hvis det ikke ser ut til å få meldingen til crawlers, kan du fortelle de ulike søkemotorene om sitemap.xml-filen ved å besøke disse URL-ene (Men endring **Din institusjon** til din institusjons akronym eller forkortelse og **www.yoursite.org** til din ERDDAP URL) :)
    *   https://www.bing.com/webmaster/ping.aspx?siteMap=http://**www.yoursite.org**/erddap/sitemap.xml
    *   https://www.google.com/ping?sitemap=http://**www.yoursite.org**/erddap/sitemap.xml(ITenk) du trenger bare å ping hver søkemotor en gang, for all tid. Søkemotorene vil deretter oppdage endringer i sitemap.xml periodisk.
     
### Datadistribusjon / Datadistribusjon Nettverk: Push og Pull Teknologi{#data-dissemination--data-distribution-networks-push-and-pull-technology} 
* Vanligvis, ERDDAP™ fungerer som en mellommann: det tar en forespørsel fra en bruker; får data fra en fjerndatakilde; omformaterer dataene; og sender dem til brukeren.
*    [ Pull Teknologi](https://en.wikipedia.org/wiki/Pull_technology) :) ERDDAP™ har også muligheten til aktivt å få alle tilgjengelige data fra en fjerndatakilde og [lagre en lokal kopi av dataene](/docs/server-admin/datasets#eddgridcopy) ..
*    [ Push Teknologi](https://en.wikipedia.org/wiki/Push_technology) :) Ved å bruke ERDDAP 's [abonnementstjenester](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions) Andre dataservere kan varsles så snart nye data er tilgjengelige slik at de kan be om dataene. (Ved å trekke dataene) ..
*    ERDDAP 's [ EDDGrid FraErddap](/docs/server-admin/datasets#eddfromerddap) og [EDDTableFraErddap](/docs/server-admin/datasets#eddfromerddap) bruk ERDDAP abonnementstjenester og [flaggsystem](#flag) slik at det vil bli varslet umiddelbart når nye data er tilgjengelige.
* Du kan kombinere disse til stor effekt: hvis du pakker en EDDGrid Kopier rundt en EDDGrid FraErddap datasett (eller pakke en EDDTableCopy rundt et EDDTableFraErddap datasett) , ERDDAP™ vil automatisk opprette og vedlikeholde en lokal kopi av en annen ERDDAP Datasett.
* Siden abonnementstjenestene fungerer så snart nye data er tilgjengelige, sprer push-teknologien data svært raskt. (I løpet av sekunder) ..

Denne arkitekturen setter hver ERDDAP™ administrator som har ansvaret for å bestemme hvor opplysningene til ham/henne ERDDAP™ Kommer fra.

* Andre ERDDAP™ administratorer kan gjøre det samme. Det er ikke behov for koordinering mellom administratorer.
* Hvis mange ERDDAP™ administratorer lenker til hverandres ERDDAP Det dannes et datadistribusjonsnettverk.
* Data vil bli raskt, effektivt og automatisk distribuert fra datakilder ( ERDDAP S og andre servere) til datadistribusjonsnettsteder ( ERDDAP s) hvor som helst i nettverket.
* En gitt ERDDAP™ kan være både en kilde til data for enkelte datasett og et omfordelingsnettsted for andre datasett.
* Det resulterende nettverket er omtrent lik datadistribusjonsnettverk som er satt opp med programmer som [ Unidata IDD/IDM](https://www.unidata.ucar.edu/projects/index.html#idd) Men mindre stivt strukturert.
         
### Sikkerhet, autentisering og godkjenning{#security-authentication-and-authorization} 
Som standard, ERDDAP™ kjører som en helt offentlig server (å bruke http og/eller https ) uten innlogging ( [autentisering](https://en.wikipedia.org/wiki/Authentication) ) system og ingen begrensninger på datatilgang ( [autorisasjon](https://en.wikipedia.org/wiki/Authorization) ) ..

#### Sikkerhet{#security} 
Hvis du ønsker å begrense tilgangen til noen eller alle datasett til enkelte brukere, kan du bruke ERDDAP Innbygget sikkerhetssystem. Når sikkerhetssystemet er i bruk:

*    ERDDAP™ bruk [rollebasert tilgangskontroll](https://en.wikipedia.org/wiki/Role-based_access_control) ..
    * Den ERDDAP™ administrator definerer brukere med [&lt;bruker&gt;] (/docs/server-admin/datasett#bruker) Merke i datasets.xml .. Hver bruker har et brukernavn, et passord (hvis autentisering=kunde) En eller flere roller.
    * Den ERDDAP™ administrator definerer hvilke roller som har tilgang til et gitt datasett via [&lt;tilgjengeligTil&gt;] (/docs/server-admin/datasett#tilgjengeligtil) Merke i datasets.xml For alle datasett som ikke skal ha offentlig tilgang.
* Brukerens innloggingsstatus (og en lenke til å logge inn/ut) vil bli vist øverst på hver nettside. (Men en logget inn bruker vil synes å ERDDAP™ å ikke være logget inn hvis han bruker en http URL.) 
* Hvis&lt;baseUrl&gt; som du angir i setup.xml er en ** http ** URL, brukere som ikke er logget på kan bruke ERDDAP 's ** http ** URL. Hvis&lt;baseHttpsUrl&gt; er også spesifisert, brukere som ikke er logget på kan også bruke https URL.
* Bare HTTPS -- Hvis&lt;baseUrl&gt; som du angir i setup.xml er en ** https ** URL, brukere som ikke er logget på oppfordres (Ikke tvunget) å bruke ERDDAP 's ** https ** URLs - alle koblingene på ERDDAP™ Nettsider vil referere til https URL.
    
Hvis du vil tvinge brukerne til å bruke https URL, legg til en Redirect permanent linje inne i&lt;VirtualHost \\*:80&gt; delen i Apaches konfigurasjonsfil (vanligvis http d.conf) f.eks.
    
```
    <VirtualHost \\*:80>
        \\[...\\]
        ServerName example.com
        Redirect permanent / https://example.com/
    </VirtualHost>
```

Hvis du vil, er det en annen metode å tvinge bruk av https:   [HTTP Streng transportsikkerhet (HSTS) ](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security) .. Å bruke den:
    
    1. Aktiver Apache- headermodulen: a2enmod- headers
    2. Legg til den ekstra headeren i HTTPS VirtualHost-direktivet. Maks alder måles i sekunder og kan settes til noen lang verdi.
        
```
        <VirtualHost \\*:443>
            # Guarantee HTTPS for 1 Year including Sub Domains 
            Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
    
Vær oppmerksom på at dette headeren kun er gyldig på en HTTPS VirtualHost.
    
En grunn til ikke å tvinge brukerne til å bruke https URL-adresser er: Den underliggende SSL/TLS-lenken tar tid å etablere og tar seg deretter tid til å kryptere og dekryptere all informasjon som overføres mellom brukeren og serveren. Noen institusjoner krever https Bare.
    
* Brukere som er logget på må bruke ERDDAP 's ** https ** URL. Hvis de bruker http Nettadresser, de ser ut til å ERDDAP™ Å ikke være logget på. Dette sikrer privatlivet til kommunikasjonen og bidrar til å forhindre [sesjon kapring og sidejacking](https://en.wikipedia.org/wiki/Session_hijacking) ..
* Alle som ikke er logget inn, kan få tilgang til og bruke offentlige datasett. Som standard vises ikke private datasett i lister over datasett hvis en bruker ikke er logget på. Hvis administratoren har satt config.xml&lt;ListePrivateDatasett&gt; til sant, vil de vises. Forsøk på å be om data fra private datasett (Hvis brukeren kjenner URL-en) vil bli omdirigert til innloggingssiden.
* Alle som er logget inn vil kunne se og be om data fra alle offentlige datasett og alle private datasett som deres rolle gir dem tilgang til. Som standard vises ikke private datasett som en bruker ikke har tilgang til i lister over datasett. Hvis administratoren har satt config.xml&lt;ListePrivateDatasett&gt; til sant, vil de vises. Forsøk på å be om data fra private datasett som brukeren ikke har tilgang til, vil bli omdirigert til påloggingssiden.
* Den RSS Informasjon for fullt private datasett er kun tilgjengelig for brukerne (og RSS Lesere) som er logget inn og autorisert til å bruke dette datasettet. Dette gjør RSS Ikke spesielt nyttig for fullt private datasett.
    
Hvis et datasett er privat, men dets [&lt;graferAccessibleTo&gt;] (/docs/server-admin/datasett) er satt til offentlig, datasettets RSS er tilgjengelig for alle.
    
* E-postabonnementer kan kun konfigureres når en bruker har tilgang til et datasett. Hvis en bruker abonnerer på et privat datasett, fortsetter abonnementet å fungere etter at brukeren har logget ut.

##### Konfigurasjon Sikkerhet{#setup-security} 
For å opprette sikkerhets-/godkjenningssystemet:

* Gjør standarden ERDDAP™   [første oppsett](/docs/server-admin/deploy-install) ..
* I [config.xml](/docs/server-admin/deploy-install#setupxml) ,
    * Legg til / endre&lt;autentis&gt; verdi fra ingenting til egendefinert (Ikke bruk dette) e-post (Ikke bruk dette) , google (Anbefalt) , orcid (Anbefalt) , eller oauth2 (som er google+orcid, anbefalt) .. Se kommentarene om disse alternativene nedenfor.
    * Legg til / endre&lt;baseHttpsUrl&gt; verdi.
    * Sett inn/utkom &loginInfo; i&lt;startBodyHtml&gt; for å vise brukerens logg inn/ut-informasjon øverst på hver nettside.
* For å teste på din personlige datamaskin, [Følg disse instruksjonene for å konfigurere tomcat for å støtte SSL](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html)   (grunnlaget for https tilkoblinger) ved å opprette en keystore med en [Selvsignert sertifikat](https://en.wikipedia.org/wiki/Self-signed_certificate) og ved å endre *tomcat* /conf/server.xml å fjerne koblingen for port 8443. På Windows kan du måtte flytte .keystore fra  "c:\\Brukere\\ *du* \\.keystore" til  "c:\\Brukere\\Forvalgt bruker\\.keystore" eller  "c:\\.keystore" (se *tomcat* /logg/catalina. *i dag* .log hvis programmet ikke laster eller brukere ikke kan se loggen på siden) .. Du kan se når .keystore-sertifikatet vil utløpe ved å undersøke sertifikatet når du logger på.
    
For en offentlig tilgjengelig server, i stedet for å bruke et selvsignert sertifikat, anbefales det sterkt at du kjøper og installerer et sertifikat signert av en [sertifikatmyndighet](https://en.wikipedia.org/wiki/Certificate_authority) Fordi det gir dine kunder mer forsikring om at de faktisk er koblet til din ERDDAP™ Ikke en mann i midtens versjon av din ERDDAP .. Mange leverandører selger digitale sertifikater. (Søk etter web.) De er ikke dyre.
    
* På Linux datamaskiner, hvis Tomcat kjører i Apache, endre / etc/ http d/conf.d/ssl.conf-fil for å tillate HTTPS trafikk til/fra ERDDAP™ uten å kreve : 8443 portnummer i URL:
    1. Endre eksisterende&lt;VirtualHost&gt; tag (Hvis det finnes en) , eller legg til én på slutten av filen slik at den i det minste har disse linjene:
```
        <VirtualHost \\_default\\_:443>
            SSLEngine on
            SSLProxyEngine On
            ProxyPass /erddap http://localhost:8443/erddap
            ProxyPassReverse /erddap http://localhost:8443/erddap
        </VirtualHost>
```

    2. Start på nytt Apache: /usr/sbin/apachectl -K graciøs (Men noen ganger er det i en annen katalog) ..
* I *tomcat* /conf/server.xml, uncomment porten=8443&lt;Kontakt&gt; tag:
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
og endre plasseringen av sertifikatKeystoreFile.
##### Godkjenning{#authorization} 
*    [I datasets.xml Skap en](#authorization) [&lt;bruker&gt;] (/docs/server-admin/datasett#bruker) Tagg for hver bruker med brukernavn, passord (om autorisasjon=custom) og rolleinformasjon. Dette er autorisasjonen del av ERDDAP - Sikkerhetssystemet.
     
* I datasets.xml Legg til en [&lt;tilgjengeligTil&gt;] (/docs/server-admin/datasett#tilgjengeligtil) Tagge til hvert datasett som ikke bør ha offentlig tilgang.&lt;TilgjengeligTil&gt; lar deg angi hvilke roller som har tilgang til det datasettet.
     
* Start Tomcat på nytt. Problemer? Sjekk Tomcat-loggene.
     
* KJØK ditt arbeid&#33; Enhver feil kan føre til en sikkerhetsfeil.
     
* Sjekk at påloggingssiden bruker https   (ikke http ) .. Forsøk på å logge inn via http skal automatisk omdirigeres til https og port 8443 (Selv om portnummeret kan skjules via en Apache-proxy) .. Du må kanskje jobbe sammen med nettverksadministratoren for å tillate eksterne webforespørsler om å få tilgang til port 8443 på serveren din.
     
* Du kan endre&lt;bruker&gt; og&lt;tilgjengeligTil&gt; tagger til enhver tid. Endringene vil bli utført ved neste regelmessige reload av alle datasett, eller ASAP hvis du bruker en [flagg](#flag) ..

##### Autentisering{#authentication} 
 [ **Autentisering (Logg inn) ** ](#authentication)   
Hvis du ikke vil tillate brukerne å logge på, ikke angi en verdi for&lt;autentisering&gt; i oppsett.xml.
Hvis du vil tillate brukerne å logge inn, må du angi en verdi for&lt;autentisering&gt;. I dag, ERDDAP™ støtter
 [tilpasset](#custom)   (Ikke bruk dette) ,
 [e-post](#email)   (Ikke bruk dette) ,
 [google](#google)   (Anbefalt) ,
 [orcid](#orcid)   (Anbefalt) , og
 [Oauth2](#oauth2)   (Anbefalt) for autentiseringsmetoden.
Hvis du vil aktivere logging, anbefaler vi sterkt google, orcid eller oauth2 alternativer fordi de frigjør deg fra lagring og håndtering av brukerens passord (nødvendig for tilpasset) Og er sikrere enn e-postalternativet. Husk at brukere ofte bruker det samme passordet på ulike nettsteder. Så de kan bruke det samme passordet til din ERDDAP™ Som de gjør i banken. Det gjør passordet deres svært verdifullt - mye mer verdifullt for brukeren enn bare dataene de ber om. Så du må gjøre så mye som du kan for å holde passordene private. Det er et stort ansvar. E-posten, google, orcid og oauth2-alternativene tar vare på passord, slik at du ikke trenger å samle, lagre eller jobbe med dem. Du er frigjort fra det ansvaret.

Alle&lt;autentisering&gt; alternativer bruker en [informasjonskapsel](https://en.wikipedia.org/wiki/HTTP_cookie) På brukerens datamaskin, så brukerens nettleser må konfigureres for å tillate informasjonskapsler. Hvis en bruker lager ERDDAP™ forespørsler fra et dataprogram (ikke en nettleser) , cookies og autentisering er vanskelig å jobbe med. Det er et vanlig problem med alle autentiseringssystemer. Beklager.

detaljer i&lt;autentisering&gt; Alternativer er:

###### Tilpasset{#custom} 
Tilpasset er ERDDAP Det egendefinerte systemet for å la brukerne logge inn ved å skrive inn brukernavn og passord i et skjema på en nettside. Hvis en bruker prøver å logge inn 3 ganger innen 10 minutter, blokkeres brukeren fra å prøve å logge inn i 10 minutter. Dette hindrer hackere i å bare prøve millioner av passord til de finner den riktige.

Dette er noe sikkert fordi brukernavnet og passordet overføres via https   (ikke http ) , men autentisering = google, orcid eller oauth2 er bedre fordi de frigjør deg fra å måtte håndtere passord. Tilpasset tilnærming krever at du samler inn brukerens navn og hashfordøyelse av passordet (Bruk telefonen din&#33; E-post er ikke sikkert&#33;) og lagre dem i datasets.xml i [&lt;bruker&gt;] (/docs/server-admin/datasett#bruker) Tags.

Med det egendefinerte alternativet kan ingen logge inn før du (den ERDDAP™ administrator) Lag en&lt;bruker&gt; tag for brukeren, som angir brukerens navn som brukernavn, hash fordøyelse av passordet som passord og roller.

Ikke anbefalt
På grunn av vanskeligheten av å generere og overføre hashfordøyelsen av brukerens passord og på grunn av risikoene forbundet med ERDDAP™ holde hash-fordøyelsen av passordene, dette alternativet anbefales ikke.

For å øke sikkerheten til dette alternativet:

* Du må sørge for at andre brukere på serveren (Linux-brukere, ikke ERDDAP™ brukere) kan ikke lese filer i Tomcat-katalogen (spesielt datasets.xml fil&#33;) eller ERDDAP StorparentDirectory.
På Linux, som bruker=tomcat, bruk:
chmod-R g-rwx *bigParentDirectory*   
chmod-R o-rwx *bigParentDirectory*   
chmod-R g-rwx *TomcatDirectory*   
chmod-R o-rwx *TomcatDirectory*   
     
* Bruk UEPSHA256 for&lt;passordkoding&gt; i config.xml.
     
* Bruk en as-secure-som-mulig metode for å passere hashfordøyelsen av brukerens passord fra brukeren til ERDDAP™ administrator (Telefon?) ..
         
###### e-post{#email} 
Alternativet e-postautentisering bruker en brukers e-postkonto for å autentisere brukeren (ved å sende dem en e-post med en spesiell lenke som de har tilgang til for å logge inn) .. I motsetning til andre e-poster som ERDDAP™ Sender, ERDDAP™ ikke skriver disse invitasjonse-postene til e-postloggfilen fordi de inneholder konfidensiell informasjon.
I teorien er dette ikke veldig sikkert, fordi e-post ikke alltid er kryptert, så en dårlig fyr med evnen til å avlytte e-post kan misbruke dette systemet ved å bruke en gyldig brukers e-postadresse og avlytte invitasjon e-post.
I praksis, hvis du setter opp ERDDAP™ å bruke en e-postkonto på Google til å sende e-post, og hvis du konfigurerer den til å bruke et av TLS-alternativene for tilkoblingen, og hvis brukeren har en Google e-postkonto, er dette noe sikkert fordi e-postene er kryptert hele veien fra ERDDAP™ til brukeren.

For å øke sikkerheten til dette alternativet:

* Pass på at andre brukere på serveren (Linux-brukere, ikke ERDDAP™ brukere) kan ikke lese filer i Tomcat-katalogen eller ERDDAP StorparentDirectory.
På Linux, som bruker=tomcat, bruk:
chmod-R g-rwx *bigParentDirectory*   
chmod-R o-rwx *bigParentDirectory*   
chmod-R g-rwx *TomcatDirectory*   
chmod-R o-rwx *TomcatDirectory*   
     
* Sett ting opp for å få slutt til slutt sikkerhet for e-postene som sendes fra ERDDAP™ til brukerne. For eksempel kan du lage et Google-sentrisk system ved å bare skape&lt;bruker&gt; tagger for Google-managerte e-postadresser og ved å konfigurere dine ERDDAP™ å bruke en Google e-postserver via en sikker/TLS-tilkobling: i config.xml, bruk for eksempel,
```
    <emailSmtpHost>smtp.gmail.com</emailSmtpHost>  
    <emailSmtpPort>587</emailSmtpPort>  
    <emailProperties>mail.smtp.starttls.enable|true</emailProperties>
```

Ikke anbefalt
E-post-autentiseringsalternativet anbefales ikke. Vennligst bruk google, orcid eller oauth2 alternativet i stedet.

Som med google, orcid og oauth2 alternativer, e-post er veldig praktisk for ERDDAP™ administratorer - du trenger ikke å håndtere passord eller hash fordøyelse. Alt du trenger å lage er en [&lt;bruker&gt;] (/docs/server-admin/datasett#bruker) Tagg for en bruker i datasets.xml er brukerens e-postadresse, som ERDDAP™ Brukes som brukerens navn. (Passordattributten brukes ikke når autentisering=email, google eller oauth2.) 

Med e-post-alternativet, er det bare brukere som har en&lt;user&gt; tag in datasets.xml kan logge på ERDDAP™ ved å oppgi e-postadressen og klikke på lenken i e-postadressen som ERDDAP™ Sender dem.

 ERDDAP™ behandler e-postadresser som ufølsomme. Det gjør det ved å konvertere e-postadresser du skriver inn (i&lt;bruker&gt; tags) eller brukere skriver (på innloggingsskjemaet) til alle små bokstaver.

For å konfigurere autentisering=email:

1. I ditt oppsett.xml, endre&lt;baseHttpsUrl&gt; tags verdi.
For å eksperimentere/arbeide på din personlige datamaskin, bruk
    https://localhost:8443  
For offentligheten din ERDDAP™ , bruk
    https://*your.domain.org*:8443  
eller uten :8443 hvis du bruker en Apache [proxypass](/docs/server-admin/deploy-install#proxypass) For at portnummeret ikke er nødvendig.
     
2. I ditt oppsett.xml, endre&lt;autentisering&gt; Merkeverdi til e-post:
```
    <authentication>email</authentication>  
```

3. I din setup.xml, sørg for at e-postsystemet er satt opp via alle&lt;e-post...&gt; tags, så det ERDDAP™ kan sende ut e-post. Hvis det er mulig, konfigurer dette til å bruke en sikker tilkobling (SSL/TLS) til e-postserveren.
     
4. I din datasets.xml , skape [&lt;bruker&gt;] (/docs/server-admin/datasett#bruker) Tags for hver bruker som vil ha tilgang til private datasett.
Bruk brukerens e-postadresse som brukernavn i etiketten.
Ikke angi passordattributten i brukermerket.
     
5. Start på nytt ERDDAP™ slik at endringene til oppsett.xml og datasets.xml tre i kraft.
         
###### Google, oauth2{#google-orcid-oauth2} 
*    [ **google** ](#google) , [ **orcid** ](#orcid) , og [ **Oauth2** ](#oauth2)    (Anbefalt)   
Alle tre alternativene er anbefalt ERDDAP™ autentiseringsalternativer. De er alle de sikreste alternativene. De andre alternativene har betydelig svakere sikkerhet.
     
###### Google{#google} 
* Google-autentiseringsalternativet bruker [Sign Med Google](https://developers.google.com/identity/gsi/web/guides/overview) som er en implementering av [OAuth 2.0 autentiseringsprotokoll](https://oauth.net/2/) .. ERDDAP™ brukere logger på sin Google e-postkonto, inkludert Google-styrte kontoer som @noaa.gov kontoer. Dette tillater ERDDAP™ å verifisere brukerens identitet (navn og e-postadresse) og få tilgang til deres profilbilde, men gir ikke ERDDAP™ tilgang til deres e-poster, deres Google Drive eller annen privat informasjon.
    
For ERDDAP™ v2.22 og nedenfor, ERDDAP™ brukt " Google Logg inn". Google sier at systemet er utdatert etter 31. mars 2023. Hvis du ikke allerede har gjort det, kan du bytte til ERDDAP™ v2.23+ å bruke det nye "Logg inn med Google"-basert autentiseringssystem.
    
For ERDDAP™ v2.23 tilfeller med en Content-Security-Policy konfigurert og ved å bruke Google-autentisering, må du legge tilhttps://accounts.google.comtil listen over tillatte script-src (eller script-src-elem) .. ERDDAP™ Bruker ikke lengerhttps://apis.google.comHvis du har lov til det, kan du fjerne det nå.
    
For ERDDAP™ v2.24+ du kan også måtte legge tilhttps://accounts.google.com/gsi/styletil stlye-src oghttps://accounts.google.com/gsi/å koble til. For script-src kan du nå brukehttps://accounts.google.com/gsi/client.
    
For mer informasjon kan du gå til [Google-side](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy) om CSP konfigurasjon. Hvis du har spørsmål, kontakt chris.john på noaa.gov.
         
###### Orcid{#orcid} 
* Orcid-autentiseringsalternativet bruker [Orcid-autentisering](https://members.orcid.org/api/integrate/orcid-sign-in) som er en implementering av [OAuth 2.0 autentiseringsprotokoll](https://oauth.net/2/) .. ERDDAP™ brukere logger seg inn på deres [Orcid-konto](https://members.orcid.org/api/integrate/orcid-sign-in) som vanligvis brukes av forskere til å identifisere seg. Dette tillater ERDDAP™ å verifisere brukerens Orcid-identitet og få sitt Orcid-kontonummer, men gir ikke ERDDAP™ tilgang til deres andre kontoinformasjon.

###### Oauth2{#oauth2} 
* Oauth2-alternativet lar brukerne logge på enten sin Google-konto eller sin Orcid-konto.

Google, orcid, og oauth2-alternativene er etterfølgerne til openid-alternativet, som ble avsluttet etter ERDDAP™ versjon 1.68, og som var basert på en versjon av åpen ID som nå er utdatert. Vennligst skift til google, orcid eller oauth2.

Disse alternativene er svært praktiske for ERDDAP™ administratorer - du trenger ikke å håndtere passord eller hash fordøyelse. Alt du trenger å lage er en [&lt;bruker&gt;] (/docs/server-admin/datasett#bruker) Tagg for en bruker i datasets.xml som angir brukerens Google-e-postadresse eller Orcid-kontonummer som brukernavnattributt. (Passordattributten brukes ikke når autentisering=email, google, orcid eller oauth2.) 

Med disse alternativene kan alle logge på ERDDAP™ ved å logge inn på Googles e-postkonto eller Orcid-konto, men ingen har rett til å få tilgang til private datasett før du (den ERDDAP™ administrator) Lag en&lt;bruker&gt; tag, som angir deres Google e-postadresse eller Orcid-kontonummer som brukernavn, og angir deres roller.

 ERDDAP™ behandler e-postadresser som ufølsomme. Det gjør det ved å konvertere e-postadresser du skriver inn (i&lt;bruker&gt; tags) eller brukere skriver (på innloggingsskjemaet) til alle små bokstaver.

Å sette opp google, orcid eller oauth2-autentisering:

* I ditt oppsett.xml, endre&lt;baseHttpsUrl&gt; tags verdi.
For å eksperimentere/arbeide på din personlige datamaskin, bruk
    https://localhost:8443  
For offentligheten din ERDDAP™ , bruk
    https://*your.domain.org*:8443  
eller bedre, uten :8443 hvis du bruker en Apache [proxypass](/docs/server-admin/deploy-install#proxypass) For at portnummeret ikke er nødvendig.
     
* I ditt oppsett.xml, endre&lt;autentisering&gt; Tags verdi til google, orcid eller oauth2, for eksempel:
```
    <authentication>oauth2</authentication>  
```
###### Google-oppsett{#google-setup} 
* For google og oauth2 alternativer:
Følg instruksjonene nedenfor for å konfigurere Google-autentisering for din ERDDAP ..
     
    1. Hvis du ikke har en e-postkonto på Google, [Opprette en](https://www.google.com/intl/en_us/mail/help/about.html)   
         
    2. Følg [disse instruksjonene](https://developers.google.com/identity/sign-in/web/devconsole-project) å opprette et Google Developers Console-prosjekt og få en klient-ID.
        
Når Google-skjemaet ber om autorisert Java Script opprinnelse, skriv inn verdien fra&lt;baseHttpsUrl&gt; fra din personlige datamaskins ERDDAP™ setup.xml, f.eks.
        https://localhost:8443  
På en annen linje, legg til&lt;baseHttpsUrl&gt; fra publikum ERDDAP™ setup.xml, f.eks.
        https://*your.domain.org*:8443
        
Ikke angi noen autorisert omdirigeringsadresser.
        
Når du ser Client ID for dette prosjektet, kopiere og lim det inn i config.xml (vanligvis like under&lt;autentisitet&gt; å være ordnet, men plasseringen spiller ingen rolle, i&lt;GoogleClientID&gt; tag, f.eks.
        &lt;googleClientID&gt; *dinClientID* &lt;/googleClientID&gt;
Kunde-ID vil være en streng på ca 75 tegn, sannsynligvis starter med flere siffer og slutter med .apps.googleusercontent.com .
         
        
    3. I din datasets.xml Skap en [&lt;bruker&gt;] (/docs/server-admin/datasett#bruker) Tagg for hver bruker som vil ha tilgang til private datasett. For brukernavn-attributten i merket:
        
        * For brukere som vil logge inn med google, bruker bruker brukerens Google-e-postadresse.
        * For brukere som vil logge på med orcid, bruk brukerens Orcid-kontonummer (Med stikker) ..
        
Ikke angi passordattributten for brukermerket.
         
    4. Start på nytt ERDDAP™ slik at endringene til oppsett.xml og datasets.xml tre i kraft.
         
###### Orcid-oppsett{#orcid-setup} 
* For orcid og oauth2 alternativer:
Følg instruksjonene nedenfor for å konfigurere Orcid-autentisering for din ERDDAP ..
     (For detaljer, se [Orcids API-dokumentasjon](https://members.orcid.org/api/integrate/orcid-sign-in) ..)   
     
    1. Hvis du ikke har en Orcid-konto, [Opprette en](https://orcid.org/signin)   
         
    2. Logg inn Orcid [https://orcid.org/signin](https://orcid.org/signin) Bruke din personlige Orcid-konto.
         
    3. Klikk på "Developer Tools" (under "For forskere" øverst) ..
         
    4. Klikk på "Registrer deg gratis ORCID offentlig API". Oppgi denne informasjonen:
Navn: ERDDAP™ på \\[ organisasjonen \\]   
Nettsted: \\[ din ERDDAP Domene \\]   
Beskrivelse: ERDDAP™ En vitenskapelig dataserver. Brukere må autentisere med Google eller Orcid for å få tilgang til ikke-offentlige datasett.
Redirect URIs: \\[ din ERDDAP Domene \\] /erddap/loginOrcid.html
         
    5. Klikk på Lagre-ikonet (Det ser ut som en 3,5 - disk&#33;) ..
Du kan se din ORCID APP-klient-ID og ORCID-klienthemmelighet.
         
    6. Kopier og lim inn ORCID APP-klient-ID-en (som starter med APP-) i setup.xml i&lt;orcidClientID&gt; tag, f.eks.
```
        <orcidClientID>APP-*ALPHANUMERICCHARACTERS*</orcidClientID>
```
    7. Kopier og lim inn ORCID klientens hemmelighet (små bokstavar alfa-numeriske tegn med streker) i setup.xml i&lt;orcidClientSecret&gt; tag, f.eks.
```
        <orcidClientSecret>*alpha-numeric-characters-with-dashes*</orcidClientSecret>
```

    8. I din datasets.xml Skap en [&lt;bruker&gt;] (/docs/server-admin/datasett#bruker) Tagg for hver bruker som vil ha tilgang til private datasett. For brukernavn-attributten i merket:
        
        * For brukere som vil logge inn med google, bruker bruker brukerens Google-e-postadresse.
        * For brukere som vil logge på med orcid, bruk brukerens Orcid-kontonummer (Med stikker) ..
        
Ikke angi passordattributten for brukermerket.
         
    9. Start på nytt ERDDAP™ slik at endringene til oppsett.xml og datasets.xml tre i kraft.
             

###### Logg inn på annen måte{#log-in-either-way} 
Hvis du bruker Google, orcid eller oauth2-autentiseringsalternativene, og Google Logg inn eller Orcids API-godkjenning slutter plutselig å fungere (uansett grunn) eller slutter å jobbe som ERDDAP™ Forventer at brukere ikke vil kunne logge inn på din ERDDAP .. Som midlertidig (eller permanent) løsning, kan du be brukerne om å registrere seg med det andre systemet (Få en e-postkonto på Google, eller få en Orcid-konto) .. For å gjøre dette:

1. Endre&lt;autentisering&gt; tag slik at det tillater det andre autentiseringssystemet. Oauth2-alternativet gjør det mulig for brukerne å logge inn med enten system.
2. Dupliserer hver av&lt;bruker&gt; tagger og endre brukernavn attributt fra Google e-postadressen til det tilsvarende Orcid-kontonummeret (eller omvendt) Men hold rollene tilskriver det samme.

###### OpenId{#openid} 
 ERDDAP™ ikke lenger støtter openid autentisering alternativet, som var basert på en versjon av åpen ID som nå er utdatert. Vennligst bruk google, orcid eller oauth2 alternativer i stedet.

###### BASIC{#basic} 
 ERDDAP™ Støtter ikke BASIC-autentisering fordi:
* BASIC virker rettet mot forhåndsdefinerte nettsider som trenger sikker tilgang eller teppe på/av tilgang til hele nettstedet, men ERDDAP™ tillater (begrenset tilgang) datasett som skal legges til på flyet.
* BASIC-autentisering tilbyr ikke en måte for brukere å logge ut&#33;
* BASIC-godkjenning er kjent for å ikke være sikker.

##### Sikkere datakilder{#secure-data-sources} 
Hvis et datasett skal ha begrenset tilgang til ERDDAP™ brukere, datakilden (fra hvor ERDDAP™ Få dataene) bør ikke være offentlig tilgjengelig. Hvordan kan ERDDAP™ Få dataene for begrensede tilgangsdatasett? Noen alternativer er:

*    ERDDAP™ kan betjene data fra lokale filer (For eksempel via EDDTable Fra Filer eller EDDGrid FraFiles) ..
     
*    ERDDAP™ Kan være i en [DMZ](https://en.wikipedia.org/wiki/Demilitarized_zone_(computing) ) og datakilden (f.eks. en OPeNDAP server eller database) kan ligge bak en [brannmur](https://en.wikipedia.org/wiki/Firewall) hvor det er tilgjengelig ERDDAP™ Men ikke til publikum.
     
* Datakilden kan være på en offentlig nettside, men krever en innlogging for å få dataene. De to typer datasett som ERDDAP™ kan logge på for å få tilgang [EDDTableFraDatabase](/docs/server-admin/datasets#eddtablefromdatabase) og [EDDTableFraCassandra](/docs/server-admin/datasets#eddtablefromcassandra) .. Disse datasettene støtter (og bør alltid bruke) brukernavn (Opprette en ERDDAP™ bruker som bare har skrivebeskyttede privilegier) , passord, SSL-tilkoblinger og andre sikkerhetstiltak.
    
Men generelt i dag, ERDDAP™ kan ikke håndtere disse datakildene fordi det ikke har noen bestemmelser for å logge på datakilden. Dette er grunnen til at tilgang til [ EDDGrid FraErddap og EDDTable FraErddap](/docs/server-admin/datasets#eddfromerddap) Datasett kan ikke begrenses. For tiden, den lokale ERDDAP™ har ingen mulighet til å logge inn og få tilgang til metadatainformasjon fra fjernkontrollen ERDDAP .. Og å sette den " remote" ERDDAP™ bak brannmuren og fjerne det datasettet som er tilgjengelig Til restriksjoner løser ikke problemet: siden brukerforespørsler om EDDXxx FraErddap-data må omdirigeres til fjernkontrollen ERDDAP™ , fjernkontrollen ERDDAP™ Må være tilgjengelig.
    
#### Forsvar mot hackere{#defenses-against-hackers} 
Det er dårlig fyr hackere som prøver å utnytte sikkerhets svakheter i server programvare som ERDDAP .. ERDDAP™ følger felles sikkerhetsråd om å ha flere lag av forsvar:

* Begrensede privilegier - En av de viktigste forsvarene er å kjøre Tomcat via en bruker kalt tomcat som ikke har et passord (Ingen kan logge inn som den brukeren) og har begrensede privilegier i filsystemet (For eksempel, lesebeskyttet tilgang til dataene) .. Se ERDDAP instruksjoner til [konfigurere tomcat](/docs/server-admin/deploy-install#tomcat) ..
* Tung bruk - Generelt, ERDDAP™ er bygget til tung bruk, inkludert ved skript som gjør titusenvis av forespørsler, hver etter en annen. Det er vanskelig for ERDDAP™ å samtidig åpne seg for tung legitim bruk og beskytte seg mot misbruk. Det er noen ganger vanskelig å differensiere tung legitim bruk, overdreven legitim bruk, og ulovlig bruk (Noen ganger er det virkelig enkelt) .. blant andre forsvar, ERDDAP™ bevisst tillater ikke en enkelt forespørsel om å bruke en inordinert fraksjon av systemets ressurser (Med mindre systemet ikke er aktivt) ..
* Identifiser problemer brukere - Hvis ERDDAP™ bremser eller fryser (kanskje fordi en naiv bruker eller en bot kjører flere skript for å sende inn flere forespørsler samtidig eller kanskje på grunn av en dårlig fyrs [Denial-av-service](https://en.wikipedia.org/wiki/Denial-of-service_attack) angrep) Du kan se på [Daglig rapport e-post](#daily-report)   (og hyppigere identisk informasjon i [ ERDDAP™ loggfil](#log) ) som viser antall forespørsler fra de mest aktive brukerne (Se "Requesters IP-adresse (Tillatt) ") .. ERDDAP™ Sender e-post til administratoren når det er ["Uvanlig aktivitet: &gt; 25% av forespørsler mislyktes"](#failed-requests) .. Du kan se i ERDDAP™ loggfil for å se arten av deres forespørsler. Hvis du føler at noen gjør for mange forespørsler, bizarre forespørsler (Du ville ikke tro det jeg har sett, vel, kanskje du ville) , eller forespørsler om angrepstype, kan du legge til sin IP-adresse til svartelisten.
* Svartliste -- Du kan legge til IP-adressen til slitsomme brukere, bots og [Denial-av-service](https://en.wikipedia.org/wiki/Denial-of-service_attack) Angripere til ERDDAP   [svartliste](/docs/server-admin/datasets#requestblacklist) , slik at fremtidige anmodninger fra dem umiddelbart vil bli avvist. Denne innstillingen er i datasets.xml slik at du raskt kan legge til en IP-adresse i listen og deretter [flagg](#flag) en datasett slik at ERDDAP™ Legg umiddelbart merke til og bruk endringen. Feilmeldingen som sendes til svartelistede brukere oppfordrer dem til å kontakte ERDDAP™ administrator hvis de føler at de har blitt feilaktig satt på svartelisten. (I vår erfaring har flere brukere vært uvitende om at de kjørte flere skript samtidig, eller at deres skript gjorde tullforespørsler.) 
* Datasett Security - Noen typer datasett (spesielt EDDTableFromDatabase) utgjør ytterligere sikkerhetsrisiko (f.eks. SQL injeksjon) og ha sine egne sikkerhetstiltak. Se informasjonen for disse typer datasett i [Arbeide med datasets.xml Fil](/docs/server-admin/datasets) spesielt [EDDTableFraDatabase sikkerhet](/docs/server-admin/datasets#database-security) ..
* Sikkerhetsrevisjon - Selv om NOAA IT-sikkerhet avviste våre forespørsler om skanner i årevis, de nå rutinemessig skanner min (Bobs)   ERDDAP™ installasjon. Selv om de første skannene fant noen problemer som jeg da fikset, har påfølgende skanninger ikke funnet problemer med ERDDAP .. Skannene bekymrer seg for mange ting: spesielt siden tabledap Forespørsler ser ut som SQL-forespørsler, de bekymrer seg om SQL injeksjon sårbarheter. Men disse bekymringene er ubegrunnet fordi ERDDAP™ alltid tolker og validerer forespørsler og deretter separat bygger SQL-spørselen på en måte som unngår injeksjonsproblemer. Det andre de noen ganger klager på er at vi Java versjon eller Tomcat-versjoner er ikke så oppdaterte som de vil, så vi oppdaterer dem som svar. Jeg har tidligere tilbudt å vise folk sikkerhetsrapporter, men det kan jeg ikke.

#### Spørsmål? Forslag?{#questions-suggestions} 
Hvis du har spørsmål om ERDDAP Sikkerhetssystemet eller har spørsmål, tvil, bekymringer eller forslag til hvordan det er satt opp, se vår [Seksjon om å få ekstra støtte](/docs/intro#support) ..
    

## Ting du ikke trenger å vite{#things-you-dont-need-to-know} 

Dette er detaljer som du ikke trenger å vite før det oppstår behov.

### Andre ERDDAP™  {#second-erddap} 
*    **Sette opp et sekund ERDDAP™ For test/utvikling**   
Hvis du vil gjøre dette, er det to tilnærminger:
    *    (Beste) Installer Tomcat og ERDDAP™ på en annen datamaskin enn datamaskinen som har din offentlige ERDDAP .. Hvis du bruker din personlige datamaskin:
        1. Gjør installasjonen ett skritt om gangen. Få Tomcat opp og løp først.
Når Tomcat kjører, bør Tomcat Manager være på
             [http://127.0.0.1:8080/manager/html/](http://127.0.0.1:8080/manager/html/)   (eller kanskje [http://localhost:8080/manager/html/](http://localhost:8080/manager/html/) ) 
        2. Installer ERDDAP ..
        3. Ikke bruk ProxyPass til å fjerne portnummeret fra ERDDAP™ URL.
        4. I [config.xml](/docs/server-admin/deploy-install#setupxml) , satt baseUrl tilhttp://127.0.0.1:8080
        5. Når du har startet dette ERDDAP™ Du bør kunne se det på
             [http://127.0.0.1:8080/erddap/status.html](http://127.0.0.1:8080/erddap/status.html)   (eller kanskje [http://localhost:8080/erddap/status.html](http://localhost:8080/erddap/status.html) ) 
#### Andre Tomcat{#second-tomcat} 
*    (nest beste) Installer en annen Tomcat på samme datamaskin som din offentlige ERDDAP ..
    1. Gjør installasjonen ett skritt om gangen. Få Tomcat opp og løp først.
Endre alle portnumrene tilknyttet den andre Tomcat (For eksempel endres 8080 til 8081)   (Se [Flere Tomcat Instansseksjon](https://tomcat.apache.org/tomcat-8.0-doc/RUNNING.txt) Halvveis gjennom det dokumentet) ..
    2. Installer ERDDAP™ I den nye Tomcat.
    3. Ikke bruk ProxyPass til å fjerne portnummeret fra ERDDAP™ URL.
    4. I [config.xml](/docs/server-admin/deploy-install#setupxml) , satt baseUrl tilhttp://www.*yourDomainName*:8081
    5. Når du har startet dette ERDDAP™ Du bør kunne se det på
        http://www.*yourDomainName*:8081/erddap/status.html  
             
### Solid State Drives{#solid-state-drives} 
*    **Solid State Drives (SSDs) Det er flott&#33;**   
Den raskeste, enkleste og billigste måten å fremskynde ERDDAP tilgang til tabelldata er å legge datafilene på en solid State Drive (SSD) .. De fleste tabellbaserte datasett er relativt små, så en 1 eller 2 TB SSD er sannsynligvis tilstrekkelig til å holde alle datafilene for alle dine tabelldatasett. SSD er til slutt slitt ut hvis du skriver data til en celle, sletter den og skriver nye data til den cellen for mange ganger. Så hvis du bare bruker SSD til å skrive dataene en gang og lese det mange ganger, bør selv en forbruker-klasse SSD vare svært lang tid, sannsynligvis mye lenger enn noen harddisk (HDD) .. Forbrukerklasse SSD er nå billig (i 2018, ~$200 for 1 TB eller ~$400 for 2 TB) Prisene faller stadig raskt. Når ERDDAP™ tilgang til en datafil, en SSD tilbyr begge kortere latens (~0.1ms, versus ~3ms for en HDD, versus ~10 (?) ms for en RAID, versus ~ 55ms for Amazon S3) høyere gjennomstrømning (~ 500 MB/S, mot ~ 75 MB/s for en HDD, mot ~ 500 MB/s for en RAID) .. Så du kan få en stor ytelsesforsterkning (opp til 10X mot en HDD) For 200 dollar&#33; Sammenlignet med de fleste andre mulige endringer i systemet ditt (En ny server for $ 10.000? En ny RAID for $ 35 000? En ny nettverksbryter for $5000? etc.) Dette er langt den beste avkastningen på investering (ROI) .. Hvis/når SSD dør (om 1, 2, 8 år) Erstatt det. Ikke stole på det som på lang sikt, arkivering lagring av data, bare for front-end kopi av dataene. \\[ SSD vil også være bra for nettbaserte data, men de fleste nettbaserte datasett er mye større, noe som gjør SSD svært dyrt. \\] 
    
Hvis serveren ikke er lastet med minne, er ekstra minne for serveren din også en god og relativt billig måte å fremskynde alle aspekter av ERDDAP ..
     
    
###  [Tunge belastninger / ulemper](#heavy-loads--constraints)  **  {#heavy-loads--constraints} 
Med tung bruk, en frittstående ERDDAP™ kan begrenses av ulike problemer. For mer informasjon, se [Liste over begrensninger og løsninger](/docs/server-admin/scaling#heavy-loads--constraints) ..
     
### Grids, Clusters og Føderasjoner{#grids-clusters-and-federations} 
Under svært tung bruk, en enkelt frittstående ERDDAP™ vil gå i én eller flere begrensninger, og selv de foreslåtte løsningene vil være utilstrekkelige. For slike situasjoner, ERDDAP™ har funksjoner som gjør det enkelt å bygge skalerbare rutenett (Også kalt klynger eller forbund) av ERDDAP som tillater systemet å håndtere svært tung bruk (f.eks. for et stort datasenter) .. For mer informasjon, se [nett, klynger og forbund ERDDAP s](/docs/server-admin/scaling) ..
     
### Sky Computing{#cloud-computing} 
Flere selskaper begynner å tilby [sky databehandling tjenester](https://en.wikipedia.org/wiki/Cloud_computing)   (f.eks. [Amazon Web Services](https://aws.amazon.com/) ) .. [Web hosting selskaper](https://en.wikipedia.org/wiki/Web_hosting_service) har tilbudt enklere tjenester siden midten av 1990-tallet, men "cloud"-tjenestene har i stor grad utvidet fleksibiliteten til systemene og tilbys. Du kan bruke disse tjenestene til å konfigurere en enkelt ERDDAP™ eller et gitter/cluster ERDDAP For å håndtere svært tung bruk. For mer informasjon, se [cloud computing med ERDDAP™ ](/docs/server-admin/scaling#cloud-computing) ..

### Amazon{#amazon} 
*    ** [Amazon Web Services (AWS) EC2 installasjonsoversikt](#amazon) **   
     [Amazon Web Services (AWS) ](https://aws.amazon.com/) er en [cloud computing service](https://en.wikipedia.org/wiki/Cloud_computing) som tilbyr et bredt spekter av datamaskininfrastruktur som du kan leie innen timen. Du kan installere ERDDAP™ på en [Elastisk beregne sky (EC2) ](https://aws.amazon.com/ec2/) instans (Navnet på en datamaskin som du kan leie av timen) .. AWS har en utmerket [AWS Brukerveiledning](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) og du kan bruke Google til å finne svar på bestemte spørsmål du måtte ha. Brace deg selv - det er en rettferdig mengde arbeid å komme i gang. Men når du får en server opp og kjører, kan du enkelt leie så mange ekstra ressurser (servere, databaser, SSD-rom, etc.) Som du trenger, til en rimelig pris. \\[ Dette er ikke en anbefaling eller påtegning av Amazon Web Services. Det finnes andre skyleverandører. \\] 
    
En oversikt over ting du trenger å gjøre for å få ERDDAP™ Kjøring på AWS er:
    
    * Generelt vil du gjøre alle de tingene som er beskrevet i [AWS Brukerveiledning](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) ..
    * Opprette en AWS-konto.
    * Sett opp en AWS-brukere på den kontoen med administratorprivilegier. Logg inn som denne brukeren for å gjøre alle følgende trinn.
    * Elastisk blokklagring (EBS) er AWS tilsvarende en harddisk som er knyttet til serveren din. Noen EBS-plass vil bli tildelt når du først oppretter en EC2-instans. Det er vedvarende lagring - informasjonen går ikke tapt når du stopper EC2-instansen. Og hvis du endrer forekomststyper, blir EBS-plassen automatisk knyttet til den nye instansen.
    * Opprett en elastisk IP-adresse slik at EC2-instansen din har en stabil, offentlig URL (i motsetning til bare en privat URL som endres hver gang du starter forekomsten på nytt) ..
    * Opprett og start opp en EC2-instans (datamaskin) .. Det finnes en rekke [eksempeltyper](https://aws.amazon.com/ec2/instance-types/) Hver til en annen pris. En m4.stor eller m4.xstor instans er kraftig og er sannsynligvis egnet for de fleste bruk, men velg hva som passer dine behov. Du vil sannsynligvis bruke Amazon Linux som operativsystem.
    * Hvis datamaskinen/datamaskinen er en Windows-datamaskin, kan du bruke [PuTTY](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html) , en gratis SSH-klient for Windows, for å få tilgang til EC2-instansens kommandolinje. Du kan ha et annet SSH-program som du foretrekker.
    * Når du logger deg inn i din EC2-instans, vil du bli logget på som den administrative brukeren med brukernavnet "ec2-brukeren". ec2-brukere har sudo-privilegier. Så, når du trenger å gjøre noe som root-brukeren, bruk: sudo *someCommand* 
    * Hvis datamaskinen/datamaskinen er en Windows-datamaskin, kan du bruke [FileZilla](https://stackoverflow.com/questions/16744863/connect-to-amazon-ec2-file-directory-using-filezilla-and-sftp) , et gratis SFTP-program, for å overføre filer til / fra din EC2-instans. Eller du kan ha noe annet SFTP-program som du foretrekker.
    *    [Installer Apache](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html) på din EC2-instans.
    * Følg standarden [ ERDDAP™ installasjonsinstruksjoner](/docs/server-admin/deploy-install) ..
         
### Vent såForsøk på nytt Unntak{#waitthentryagain-exception} 
En bruker kan få en feilmelding som
Vent såForsøk på nyttException:
Det var en (midlertidig?) - Problem. Vent litt, så prøv igjen. (I en nettleser klikker du på Last inn knappen.)   
Detaljer: GridDataAccessor.increment: delvise resultater \\[ 0 \\] ="12352730" var forventet å være "123532800".

Den generelle forklaringen på WaitTorTroughException er:
Når ERDDAP™ er å svare på en brukerforespørsel, det kan være en uventet feil med datasettet (For eksempel, en feil under lesing av data fra filen, eller en feil ved tilgang til et eksternt datasett) .. Vent deretter Prøv igjen signaler til ERDDAP™ Forespørselen mislyktes (Så langt) Men det ERDDAP™ bør prøve å laste datasettet på nytt raskt (Det kaller [ForespørselReloadASAP](#requestreloadasap) ) og prøv på nytt forespørselen. Ofte lykkes det, og brukeren ser bare at responsen på forespørselen var langsom. Andre ganger mislykkes eller er reloaden for sakte, eller det påfølgende forsøket på å håndtere forespørselen mislykkes også og kaster en annen WaitTorPrøv igjen. Hvis det skjer, ERDDAP™ markerer datasettet for lasting, men forteller brukeren (via et venteforsøk på nytt unntak) Det var en feil mens han svarte på forespørselen.

Dette er den normale oppførselen. Dette systemet kan håndtere mange vanlige problemer.
Men det er mulig for dette systemet å bli utløst for mye. Den vanligste årsaken er at ERDDAP 's lasting av datasettet ser ikke et problem, men ERDDAP Svar på en forespørsel om data ser problemet. Uansett hva årsaken er, er løsningen for deg å håndtere hva som er galt med datasettet. Se inn log.txt for å se de faktiske feilmeldingene og håndtere problemene. Hvis mange filer har gyldige overskrifter, men ugyldige data (en ødelagt fil) , erstatte filene med ukorrupte filer. Hvis tilkoblingen til en RAID er flakey, fikse det. Hvis tilkoblingen til en ekstern tjeneste er flakey, kan du finne en måte å gjøre den ikke flakey eller laste ned alle filene fra fjernkilden og betjene data fra de lokale filene.

Den detaljerte forklaringen på den spesifikke feilen (over) er:
For hver EDDGrid datasett, ERDDAP™ holder aksevariable verdier i minnet. De brukes for eksempel til å konvertere etterspurte akseverdier som bruker " () Formater i indekstall. For eksempel, hvis akseverdiene er -10, 15, 20, 25 - en forespørsel om (20) vil bli tolket som en forespørsel om indeks #2 (0-baserte indekser) .. Når ERDDAP™ får en forespørsel om data og får data fra kilden, det verifiserer at aksens verdier som den fikk fra kilden samsvarer med aksens verdier i minnet. Normalt gjør de det. Men noen ganger har datakilden endret seg på en betydelig måte: f.eks. kan indeksverdier fra begynnelsen av aksevariabelen ha blitt fjernet (For eksempel, "10, 15, 20, 25" kan ha blitt "20, 25, 30") .. Hvis det skjer, er det klart at ERDDAP Fortolkning av anmodningen (f.eks. (20) " er indeks #2) Er nå feil. Så ERDDAP™ Sender et unntak og anrop ReloadASAP. ERDDAP™ Oppdaterer datasettet snart (Ofte på noen sekunder, vanligvis innen et minutt) .. Andre, lignende problemer også kaste WaitTorTry remote unntak.
    
#### ForespørselReloadASAP{#requestreloadasap} 
Du kan se RequestReloadASAP i log.txt-filen rett etter en feilmelding og ofte nær en [Vent såForsøk på nytt Unntak](#waitthentryagain-exception) .. Det er i utgangspunktet en intern, programmatisk måte for ERDDAP™ å sette en [flagg](#flag) for å signalere at datasettet bør lastes på nytt ASAP.
     
### Filer som ikke slettes{#files-not-being-deleted} 
For noen få ERDDAP™ installasjoner, det har vært et problem med noen midlertidige filer opprettes av ERDDAP™ Hold deg åpen (Feil) og ikke slettes. I noen tilfeller har mange av disse filene akkumulert og tatt opp en betydelig mengde diskplass.

Forhåpentligvis er disse problemene løst (som ERDDAP™ v2.00) .. Hvis du ser dette problemet, vennligst e-post katalog + navn på de fornærmende filene til Chris. John på noaa.gov. Du har noen muligheter til å håndtere problemet:

* Hvis filene ikke er store og ikke får deg til å løpe tom for diskplass, kan du ignorere problemet.
* Den enkleste løsningen er å stenge tomkat/ ERDDAP™   (etter timer så færre brukere påvirkes) .. Hvis operativsystemet ikke sletter filene, sletter du dem for hånd. Start på nytt ERDDAP ..
         
### JSON-ld{#json-ld} 
*    ** [Semantisk markering av datasett med json-ld (JSON Linkede data) ](#json-ld) **   
     ERDDAP™ Nå bruker [Json-ld (JSON Linkede data) ](https://json-ld.org) å gjøre din datakatalog og datasett en del av [Semantisk web](https://en.wikipedia.org/wiki/Semantic_Web) , som er Tim Berners-Lees ide om å gjøre webinnhold mer maskinlesbar og maskin " klarere". Json-ld-innholdet bruker [Schema.org](https://schema.org/) vilkår og definisjoner. Søkemotorer ( [Særlig Google](https://developers.google.com/search/docs/data-types/datasets) ) og andre semantiske verktøy kan bruke denne strukturerte markeringen for å lette oppdagelse og indeksering. Json-ld strukturert markering vises som usynlig-til-mennesker&lt;script&gt; kode påhttps://.../erddap/info/index.htmlNettside (som er en semantisk web [DataCatalog](https://schema.org/DataCatalog) ) og på hverhttps://.../erddap/info/*datasetID*/index.htmlNettside (som er en semantisk web [Datasett](https://schema.org/Dataset) ) .. (Spesielt takket være Adam Leadbetter og Rob Fuller fra Marine Institute i Irland for å gjøre de harde delene av arbeidet for å gjøre denne delen av ERDDAP ..)   
     
### Eksterne nettadresser{#out-of-date-urls} 
Sakte, men sikkert, blir webadresser som dataleverandører har skrevet til datafiler utdatert (For eksempel http blir https , nettsteder er omorganisert, og organisasjoner som NODC/NGDC/NCDC omorganiseres i NCEI) .. De resulterende ødelagte koblingene er et stadig eksisterende problem som alle nettsteder står overfor. For å håndtere dette, ERDDAP™ nå har et system som automatisk oppdaterer utdaterte adresser. Hvis Generer datasett Xml ser en utdatert URL, den legger oppdatert URL til&lt; addAttributes &gt;. Også når et datasett laster, hvis ERDDAP™ ser en utdatert URL, endrer den stille til oppdatert URL. Endringene styres av en serie søk-for/replace-med par definert i&lt;updateUrls&gt; i ERDDAP 's
 \\[ tomcat \\] /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml fil. Du kan gjøre endringer der. Hvis du har forslag til endringer, eller hvis du mener at dette bør gjøres til en tjeneste (som omformerne) Vennligst send en e-post til Chris. John på noaa.gov.
     
### CORS{#cors} 
* CORS ( [Kors-Origin ressursdeling](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) )   
" er en mekanisme som tillater begrensede ressurser (f.eks. skrifter eller ERDDAP™ Data) på en nettside som skal be om fra et annet domene utenfor domenet der den første ressursen ble servert" (Arun Ranganathan) .. I utgangspunktet er CORS en melding som kan plasseres i HTTP-hodet for et svar, som i hovedsak sier, " det er greit med dette nettstedet hvis visse andre nettsteder (spesifikke eller alle) Ta ressurser (f.eks. data) fra dette nettstedet og gjøre det tilgjengelig på deres nettsted". Derfor er det et alternativ til [JSONP](https://en.wikipedia.org/wiki/JSONP) ..
    
Utviklere av ERDDAP™ Ikke hevder å være sikkerhetseksperter. Vi er ikke helt klar over sikkerhetsproblemene knyttet til CORS. Vi ønsker ikke å si noe om en handling som reduserer sikkerheten. Så vi vil bare holde oss nøytrale og la det opp til hver ERDDAP™ admin å bestemme om fordelene eller å aktivere et CORS-hode er verdt risikoen. Som alltid, hvis din ERDDAP™ har alle private datasett, det er en god ide å være ekstra forsiktig med sikkerhet.
    
Hvis du vil aktivere CORS for din ERDDAP™ , det er [Tilgjengelige instruksjoner](https://enable-cors.org/index.html) Beskrivelse av hvordan nettstedsadministratorer kan aktivere et CORS-hode via deres lavere nivå server programvare (f.eks. Apache eller nginx) ..
    
### Paletter{#palettes} 
* Paletter brukes av ERDDAP™ å konvertere en rekke dataverdier til en rekke farger når du lager grafer og kart.
    
Hver palett er definert i en .cpt-stil palettfil som brukt av [GMT](https://www.soest.hawaii.edu/gmt/) .. Alle ERDDAP™ .cpt-filer er gyldige GMT.cpt-filer, men det motsatte er ikke sant. Til bruk i ERDDAP™ , .cpt-filer har:
    
    * Valgfrie kommentarer linjer i begynnelsen av filen, starter med "#".
    * En hovedseksjon med en beskrivelse av segmentene i paletten, ett segment per linje. Hver segmentbeskrivelse linje har 8 verdier:
start Verdi, startRed, start Grønn, start Blå, endValue, endRed, endGreen, endBlue.
Det kan være et antall segmenter. ERDDAP™ bruker lineær interpolasjon mellom startRed/Green/Blue og endRed/Green/Blue i hvert segment.
        
Vi anbefaler at hvert segment angir en start- og sluttfarge som er annerledes, og at startfargen til hvert segment er den samme som sluttfargen til det forrige segmentet, slik at paletten beskriver en kontinuerlig blanding av farger. ERDDAP™ har et system for å skape on-the-fly en palett av diskrete farger fra en palett med en kontinuerlig blanding av farger. An ERDDAP™ brukeren kan angi om paletten vil være kontinuerlig (originalen) eller diskret (avledet fra originalen) .. Men det er legitime grunner til ikke å følge disse anbefalingene for noen paletter.
        
    * StartValue og sluttverdier må være heltall.
Det første segmentet må ha startValue=0 og endValue=1.
Det andre segmentet må ha startValue=1 og endValue=2.
Etc.
    * De røde, grønne og blå verdiene må være heltal fra 0 (ingen) ... 255 (Full på) ..
    * Slutten av filen må ha 3 linjer med:
        1. En bakgrunns-rgb-farge for dataverdier som er mindre enn fargelinjens minimum, f.eks.: B 128 128 128
Det er ofte startenRed, startGreen og startBlue av det første segmentet.
        2. En forgrunns-rgb-farge for dataverdier mer enn fargelinjens maksimale, f.eks.: F 128 0 0
Det er ofte endRed, endGreen og endBlue av det siste segmentet.
        3. En Rgb-farge for NaN-dataverdier, f.eks. N 128 128 128
Det er ofte mellomgrå (128 128) ..
    * Verdiene på hver linje må separeres av faner, uten ekstrarom.
    
En prøve .cpt fil er BlueWhiteRed.cpt:
    
 \\# Dette er BlueWhiteRed.cpt.
0 0 0 128 1 0 0 255
1 0 0 255 2 0 255 255
2 0 255 255 3 255 255 255 255
3 255 255 255 4 255 255 0
4 255 255 0 5 255 0 0 0
5 255 0 0 6 128 0 0
B 0 0 128
F 128 0 0
N 128 128 128
    
Se eksisterende .cpt-filer for andre eksempler. Hvis det er problemer med en .cpt-fil, ERDDAP™ vil sannsynligvis kaste en feil når .cpt-filen tolkes (som er bedre enn å misbruke informasjonen) ..
    
Du kan legge til flere paletter i ERDDAP .. Du kan gjøre dem selv eller finne dem på nettet (For eksempel på [Cpt-by](http://soliton.vm.bytemark.co.uk/pub/cpt-city/) ) Selv om du sannsynligvis må redigere deres format litt for å samsvare med ERDDAP cpt-krav. For å få ERDDAP™ å bruke en ny .cpt-fil, lagre filen i *tomcat* /webapps/erddap/WEB-INF/cptfiles (Du må gjøre det for hver ny versjon av ERDDAP ) og også:
    
    * Hvis du bruker standard messages.xml-filen: Legg til filnamnet i filen&lt;paletter&gt; tag in
         *tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml.
Hvis du gjør dette, må du gjøre det hver gang du oppgraderer ERDDAP ..
    * Hvis du bruker en egendefinert meldinger.xml-fil: Legg til filnamnet i&lt;paletter&gt; tag i din egendefinerte meldinger.xml fil: *tomcat* /content/erddap/messages.xml . Hvis du gjør dette, trenger du bare å gjøre det én gang. (men det er annet arbeid for å opprettholde en egendefinert meldinger.xml-fil) ..
    
Start på nytt ERDDAP™ så ERDDAP™ Legg merke til endringene. En fordel med denne tilnærmingen er at du kan angi rekkefølgen på palettene i listen presentert for brukerne. Hvis du legger til en samling, oppfordrer vi deg til å legge til et prefiks med forfatter initialer (f.eks. KT\\_ ") til navnet på hver palett for å identifisere samlingen og slik at det kan være flere paletter som ellers hadde samme navn.
    
Ikke fjern eller endre noen av de standard palettene. De er et standardtrekk hos alle ERDDAP™ installasjoner. Hvis du tror en palett eller samling av paletter bør inkluderes i standarden ERDDAP™ Fordeling fordi det/de ville være til generell bruk, vennligst send dem til Chris. John på noaa.gov.
    
### Colorbars{#colorbars} 
*    **Hvordan ERDDAP™ Opprette fargene i en fargelinje?** 
    
    1. Brukeren velger en av de forhåndsdefinerte [paletter](#palettes) eller bruker standard, for eksempel regnbue. Paletter er lagret/definert i GMT-stil .cpt Color Palett Tabellfiler. Hver av ERDDAP De forhåndsdefinerte palettene har et enkelt heltallsområde, f.eks. 0 til 1 (Hvis det bare er én del i paletten) eller 0 til 4 (dersom det er fire seksjoner i paletten) .. Hvert segment i filen dekker n til n + 1, fra n = 0.
    2.   ERDDAP™ genererer en ny .cpt-fil på flyet, ved å skalere den forhåndsdefinerte palettens område (f.eks. 0 til 4) til området av paletten som brukeren trenger (f.eks. 0,1 til 50) og deretter generere en del i den nye paletten for hver del av den nye paletten (f.eks. vil en loggskala med flåter ved 0,1, 0,5, 1, 5, 10, 50 ha 5 seksjoner.) .. Fargen for sluttpunktet til hver seksjon genereres ved å finne den relevante delen av paletten i .cpt-filen, og deretter lineært interpolere R, G og B-verdiene. (Slik genererer GMT farger fra fargepaletttabellfilene.) Dette systemet tillater ERDDAP™ å starte med generiske paletter (f.eks. regnbue med 8 segmenter, i alt 0 til 8) og opprette egendefinerte paletter på flyet (f.eks. en egendefinert regnbue som kartlegger 0,1 til 50 mg/l til regnbuefargene) ..
    3.   ERDDAP™ deretter bruker den nye .cpt-filen til å generere fargen for hver forskjellige farget piksel i fargelinjen (og senere for hvert datapunkt når du planlegger data på en graf eller kart) , igjen ved å finne den relevante delen av paletten i .cpt-filen, deretter lineært interpolere R, G og B-verdiene.
    
Denne prosessen kan virke unødvendig komplisert. Men det løser problemer relatert til logg skalaer som er vanskelige å løse andre måter.
    
Hvordan kan du etterlikne det ERDDAP™ Gjør du det? Det er ikke lett. I utgangspunktet trenger du å kopiere prosessen som ERDDAP™ bruker. Hvis du er en Java programmerer, kan du bruke det samme Java klasse som ERDDAP™ Bruker til å gjøre alt dette:
     *tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/coastwatch/sgt/CompoundColorMap.java.
    
### Retningslinjer for datadistribusjonssystemer{#guidelines-for-data-distribution-systems} 
Flere generelle meninger om utforming og evaluering av datadistribusjonssystemer finner du [her](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html) ..
     
### ArkivADataset{#archiveadataset} 
Inkludert i din ERDDAP™ installasjon er et kommandolinjeverktøy kalt ArchiveADataset som kan hjelpe deg å lage et arkiv (a .zip eller .tar  .gz fil) med deler eller alle datasett lagret i en rekke netcdf-3 .nc datafiler i et filformat som er egnet for innsending til NOAA NCEI-arkivet ( .nc for nettbaserte datasett eller [ .nc CFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA) for tabelldatasett som angitt av [NCEI NetCDF Maler v2.0](https://www.ncei.noaa.gov/data/oceans/ncei/formats/netcdf/v2.0/index.html) ) ..

ArkivA Datasett kan lage to forskjellige arkivformater:

* Det opprinnelige formatet følger disse [NCEI Arkiveringsretningslinjer](https://www.ncdc.noaa.gov/atrac/guidelines.html) Denne guiden til [Arkivere dine data hos NCEI](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook?pli=1) , og det relaterte [Øvelser for å sikre dataintegritet](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook/data-integrity) ..
* "BagIt-format gjør [BagIt-filer](https://en.wikipedia.org/wiki/BagIt) , et standardisert arkivformat fremmet av det amerikanske bibliotek of Congress, som angitt av [BagIt v0.97 spesifikasjon](https://tools.ietf.org/html/draft-kunze-bagit-14) .. NOAA NCEI kan standardisere på BagIt-filer for innsendelser til arkivet.

Ikke overraskende, [globale og variable metadata](/docs/server-admin/datasets#global-attributes) som ERDDAP™ oppmuntring/behov er nesten nøyaktig det samme i filen CF og ACDD-metadata som NCEI oppfordrer/krever, så alle datasettene dine bør være klare til å sende til NCEI via [Send2NCEI](https://www.nodc.noaa.gov/s2n/) eller [ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)   (NCEIs avanserte sporings- og ressursverktøy for arkivsamlinger) ..

Hvis du (den ERDDAP™ administrator) bruk ArkivADataset til å sende data til NCEI, så du (ikke NCEI) vil bestemme når du skal sende en del data til NCEI og hva den delen vil være, fordi du vil vite når det er nye data og hvordan du angir den delen (NCEI vil ikke) .. Således er ArchiveADataset et verktøy som du kan bruke til å opprette en pakke for å sende til NCEI.

ArkivA Datasett kan være nyttig i andre situasjoner, for eksempel ERDDAP™ administratorer som trenger å konvertere en undergruppe av et datasett (på en privat ERDDAP ) fra det opprinnelige filformatet til et sett [ .nc CF-filer](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA) slik at en offentlig ERDDAP™ kan betjene data fra .nc CF-filer i stedet for de opprinnelige filene.

Når du har satt opp ERDDAP™ og kjøre den (minst en gang) , kan du finne og bruke ArchiveADataset i *tomcat* /webapps/erddap/WEB-INF-katalog. Det er et skallskript (ArkivADataset.sh) Linux/unix og en batchfil (ArkivADataset.bat) for Windows.

På Windows, første gang du kjører ArchiveADataset, må du redigere ArkivADataset. flaggermusfil med en tekstredigering for å endre banen til java. exe-fil slik at Windows kan finne Java ..

Når du kjører ArchiveADataset, vil det stille deg en rekke spørsmål. For hvert spørsmål, skriv inn et svar, trykk deretter Enter. Eller trykk ^ C for å avslutte et program når som helst.

Eller du kan legge svar på spørsmålene, i rekkefølge, på kommandolinjen. For å gjøre dette, kjør programmet en gang og skriv inn og skriv ned svarene. Deretter kan du opprette en enkelt kommandolinje (med svarene som parametere) som kjører programmet og svarer på alle spørsmålene.
Bruk ordstandard hvis du vil bruke standardverdien for en gitt parameter.
Bruk (2 doble sitater) som plassholder for en tom streng.
Oppgi parametere på kommandolinjen kan være svært praktiske, for eksempel hvis du bruker ArchiveADataset en gang i måneden for å arkivere en måneds dataverdi. Når du har generert kommandolinjen med parametere og lagret det i notatene eller i et skallskript, må du bare gjøre små endringer hver måned for å gjøre den månedens arkiv.

Spørsmålene som ArkivADataset stiller tillater deg å:

* Oppgi original eller Bagit-filemballasje. For NCEI, bruk Bagit.
* Oppgi zip eller tar .gz Kompresjon for pakken. For NCEI, bruk tjære .gz ..
* Oppgi en kontakt-e-postadresse for dette arkivet (det vil bli skrevet i LES\\_ME.txt-filen i arkivet) ..
* Oppgi datasetID av datasettet du vil arkivere.
* Angi hvilke datavariabler du vil arkivere (Vanligvis alle) ..
* Angi hvilken delgruppe av datasettet du vil arkivere. Du må formatere underdelen på samme måte som du vil formatere en undergruppe for en dataforespørsel, så det vil være annerledes for rutenettet enn for tabelldatasett.
    * For nettbaserte datasett kan du angi en rekke verdier i den venstre meste dimensjonen, vanligvis det er et tidsområde. ArkivADataset vil gjøre en separat forespørsel og generere en separat datafil for hver verdi i verdiområdet. Siden nettbaserte datasett vanligvis er store, må du nesten alltid angi en liten undergruppe i forhold til størrelsen på hele datasettet.
For eksempel \\[  (2015-12-01) :) (2015-12-31)  \\]  \\[  \\]  \\[  \\]  \\[  \\] 
    * For tabellbaserte datasett kan du angi enhver samling av begrensninger, men det er ofte et tidsområde. Siden tabelldatasett vanligvis er små, er det ofte mulig å angi ingen begrensninger, slik at hele datasettet er arkivert.
For eksempel, &time&gt;=2015-12-01&time&lt;2016-01-01
* For tabelldatasett: angi en kommaseparert liste med 0 eller flere variabler som vil avgjøre hvordan de arkiverte dataene blir videre delt i ulike datafiler. For datasett som har
     [CDm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type)  \\=TimeSeries | TimeSeriesProfil | Trajectory | TrajectoryProfil
du bør nesten alltid spesifisere variabelen som har cf-_role=times-_id (f.eks. stationID ) eller cf__role=trajectory__id-attributt. ArkivADataset vil gjøre en egen forespørsel og generere en separat datafil for hver kombinasjon av verdiene til disse variablene, for eksempel for hver enkelt stationID ..
For alle andre tabelldatasett vil du sannsynligvis ikke angi noen variabler for dette formålet.
Advarsel: Hvis underdelen av datasettet du er arkivert er svært stor (&gt;2GB) og det er ingen egnet variabel for dette formålet, deretter er ArchiveADataset ikke brukbart med dette datasettet. Dette burde være sjeldent.
* Oppgi filformatet for datafilene som skal opprettes.
For gitte datasett, for NCEI, bruk .nc ..
For tabelldatasett, for NCEI, bruk [ .nc CFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA) Hvis det er et alternativ, ellers bruk .nc ..
* Angi typen filfordøyelse som skal opprettes for hver datafil og for hele arkivpakken: MD5, SHA-1 eller SHA-256. Filfordøyelsen gir en måte for klienten (f.eks. NCEI) å teste om datafilen har blitt ødelagt. Tradisjonelt var disse [.md5 filer](https://en.wikipedia.org/wiki/MD5) Men nå er det bedre alternativer. For NCEI, bruk SHA-256.

Etter at du har svart på alle spørsmålene, vil ArchiveADataset:

1. Gjør en rekke forespørsler til datasettet og stadiet de resulterende datafilene i *bigParentDirectory* /ArchiveADataset/ * datasetID \\_Timestamp* /.
For rutenettede datasett vil det være en fil for hver verdi i venstre dimensjon (f.eks. tid) .. Navnet på filen vil være den verdien (For eksempel tidsverdien) ..
For tabulær datasett vil det være en fil for hver verdi av ... variabel (s) .. Navnet på filen vil være den verdien. Hvis det er mer enn én variabel, vil de venstre variablene bli brukt til å lage underkatalognavn, og den høyrest variable vil bli brukt til å lage filnavn.
Hver datafil må være&lt;2GB (maksimalt tillatt av .nc versjon 3 filer) ..
2. Lag en fil knyttet til hver datafil med fordøyelse av datafilen. Hvis datafilen for eksempel er 46088 .nc og fordøyelsestypen er .sha256, så vil fordøyelsesfilen ha navnet 46088 .nc .sha256 .
3. Lag en READ\\_ME.txt-fil med informasjon om arkivet, inkludert en liste over alle innstillingene du spesifiserte for å generere dette arkivet.
4. Lag 3 filer i *bigParentDirectory* /ArchiveADataset/ :
    
    * A .zip eller .tar  .gz arkivfil som heter * datasetID \\_Timestamp*  .zip   (eller .tar  .gz ) inneholder alle de iscenesatte datafiler og fordøyelsesfiler. Denne filen kan være hvilken som helst størrelse, bare begrenset med diskplass.
    * En fordøyelsesfil for arkivfilen, for eksempel * datasetID \\_Timestamp*  .zip .sha256.txt
    * For den opprinnelige typen arkiv, en tekstfil som heter * datasetID \\_Timestamp*  .zip .listOfFiles.txt (eller .tar  .gz ) som lister alle filene i .zip   (eller .tar  .gz ) fil.
    
Hvis du forbereder arkivet for NCEI, er dette filene som du vil sende til NCEI, kanskje via [Send2NCEI](https://www.nodc.noaa.gov/s2n/) eller [ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)   (NCEIs avanserte sporings- og ressursverktøy for arkivsamlinger) ..
5. Slett alle iscenesatte filer slik at bare arkivfilen (f.eks. .zip ) , fordøyelsen (f.eks. .sha256.txt) Arkivet, og (Valgfritt) .listOfFiles.txt-filer forblir.

#### ISO 19115.xml Metadatafiler{#iso-19115-xml-metadata-files} 
ArkivADataset-arkivpakken inneholder ikke ISO 19115 .xml-metadatafilen for datasettet. Hvis du vil/må sende en ISO 19115 fil for datasettet til NCEI, kan du sende dem ISO 19115 .xml metadatafilen som ERDDAP™ opprettet for datasettet (men NMFS personer bør få ISO 19115 filen for sine datasett fra InPort hvis ERDDAP™ betjener ikke den filen allerede) ..

Problemer? Forslag? ArkivADataset er nytt. Hvis du har problemer eller forslag, se våre [Seksjon om å få ekstra støtte](/docs/intro#support) ..
     
