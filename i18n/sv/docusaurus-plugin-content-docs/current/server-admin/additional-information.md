---
sidebar_position: 4
---
# Ytterligare information

## Saker du behöver veta{#things-you-need-to-know} 
     
###    ** [Proxy fel](#proxy-errors) **  {#proxy-errors} 
Ibland en begäran att ERDDAP™ kommer att returnera ett proxyfel, en HTTP 502 Bad Gateway-fel eller något liknande fel. Dessa fel kastas av Apache eller Tomcat, inte ERDDAP™ sig själv.
* Om varje förfrågan genererar dessa fel, särskilt när du först ställer in din ERDDAP™ , då är det förmodligen en proxy eller dålig gateway fel, och lösningen är förmodligen att fixa [ ERDDAP Proxy Inställningar](/docs/server-admin/deploy-install#proxypass) . Detta kan också vara problemet när en etablerad ERDDAP™ plötsligt börjar kasta dessa fel för varje begäran.
* Annars är "proxy" fel oftast faktiskt timeout fel kastas av Apache eller Tomcat. Även när de inträffar relativt snabbt, är det något slags svar från Apache eller Tomcat som uppstår när ERDDAP™ är mycket upptagen, minnesbegränsad eller begränsad av någon annan resurs. I dessa fall, se råd nedan för att hantera [ ERDDAP™ svarar långsamt](#responding-slowly) .
        
Förfrågningar för en lång tidsintervall (&gt;30 tidspoäng) från en rutnät datamängd är benägna att avbryta misslyckanden, som ofta visas som proxyfel, eftersom det tar betydande tid för ERDDAP™ Öppna alla datafiler en-för-en. Om ERDDAP™ är annars upptagen under begäran, problemet är mer sannolikt att inträffa. Om datamängdens filer komprimeras är problemet mer sannolikt att inträffa, även om det är svårt för en användare att avgöra om en datamängds filer komprimeras.
Lösningen är att göra flera förfrågningar, var och en med ett mindre tidsintervall. Hur liten av ett tidsintervall? Jag föreslår att starta riktigt liten (30 tidspoäng?) Sedan (ungefär) dubbla tidsintervallet tills begäran misslyckas, sedan gå tillbaka en fördubbling. Gör sedan alla förfrågningar (varje för en annan bit av tiden) behövs för att få all data.
Ett ERDDAP™ administratören kan minska detta problem genom att öka [Apache timeout inställningar](/docs/server-admin/deploy-install#apache-timeout) .
        
### Övervakning{#monitoring} 
Vi vill alla att våra datatjänster ska hitta sin publik och användas i stor utsträckning, men ibland din ERDDAP™ kan användas för mycket, vilket orsakar problem, inklusive super långsamma svar för alla önskemål. Vår plan att undvika problem är:

* Monitor ERDDAP™ via [status.html webbsida](#status-page) .
Det har massor av användbar information. Om du ser att ett stort antal förfrågningar kommer in, eller massor av minne som används, eller massor av misslyckade förfrågningar, eller varje Major LoadDatasets tar lång tid, eller se några tecken på att saker och ting går ner och svarar långsamt, titta in ERDDAP "S [Log.txt fil](#log) För att se vad som händer.
    
Det är också användbart att helt enkelt notera hur snabbt statussidan svarar. Om det svarar långsamt är det en viktig indikator som ERDDAP™ är mycket upptagen.
    
* Monitor ERDDAP™ via [Daglig rapport](#daily-report) e-post.
     
* Titta på out-of-date datasets via *basUrl*  /erddap/outOfDateDatasets.html webbsida som är baserad på valfri [ testOutOfDate ](/docs/server-admin/datasets#testoutofdate) globala attribut.
     
#### Externa monitorer{#external-monitors} 
De metoder som anges ovan är ERDDAP Sätt att övervaka sig själv. Det är också möjligt att göra eller använda externa system för att övervaka dina ERDDAP . Ett projekt att göra detta är [Axioms erddap-metriprojekt](https://github.com/axiom-data-science/erddap-metrics) . Sådana externa system har vissa fördelar:
* De kan anpassas för att ge den information du vill ha, visas på det sätt du vill.
* De kan inkludera information om ERDDAP™ att ERDDAP™ kan inte komma åt enkelt eller alls (till exempel CPU-användning, diskfritt utrymme, ERDDAP™ svarstid som sett ur användarens perspektiv, ERDDAP™ Uptime,
* De kan ge varningar (e-post, telefonsamtal, texter) administratörer när problem överstiger viss tröskel.
             
### Multipel samtidig Förfrågningar{#multiple-simultaneous-requests} 
*    **Blacklist-användare gör flera samtidiga förfrågningar&#33;** 
Om det är klart att vissa användare gör mer än en samtidig begäran, upprepade gånger och kontinuerligt, lägg sedan till sin IP-adress till ERDDAP och [så]&lt;FörfråganBlacklist] (/docs/server-admin/datasets#requestblacklist) i din datasets.xml fil. Ibland är förfrågningarna alla från en IP-adress. Ibland är de från flera IP-adresser, men tydligt samma användare. Du kan också svartlista människor som gör massor av ogiltiga förfrågningar eller massor av mind-numbingly ineffektiva förfrågningar.
    
för varje förfrågan de gör, ERDDAP™ returnerar:
    
    > HTTP ERROR 403 - Access Forbidden --  
    > Your IP address is on this ERDDAP's request blacklist.  
    > Did you often submit more than one request at a time?  
    > Did you often submit identical requests in a short period of time?  
    > Did you submit a large number of invalid requests?  
    > If you are ready to avoid these problems, please email \\[ERDDAP™ administrator's email address\\] to request to be taken off of the blacklist.
    
Förhoppningsvis kommer användaren att se detta meddelande och kontakta dig för att ta reda på hur du åtgärdar problemet och få av svartlistan. Ibland byter de bara IP-adresser och försöker igen.
    
Det är som maktbalansen mellan offensiva och defensiva vapen i krig. Här, defensiva vapen ( ERDDAP ) har en fast kapacitet, begränsad av antalet kärnor i CPU, diskåtkomstbandbredd och nätverksbandbredd. Men offensiva vapen (användare, särskilt skript) har obegränsad kapacitet:
    
    * En enda begäran om data från många tidspunkter kan orsaka ERDDAP Öppna ett stort antal filer (i sekvens eller delvis multi-threaded) . I extrema fall kan en "enkel" begäran enkelt knyta upp RAID kopplad till ERDDAP™ i en minut, effektivt blockera hanteringen av andra förfrågningar.
         
    * En enda begäran kan konsumera en stor bit minne (Även om ERDDAP™ kodas för att minimera det minne som behövs för att hantera stora förfrågningar) .
         
    * Parallellisering -
Det är lätt för en smart användare att parallellisera en stor uppgift genom att generera massor av trådar, som alla skickar en separat begäran. (som kan vara stor eller liten) . Detta beteende uppmuntras av datavetenskap gemenskapen som ett effektivt sätt att hantera ett stort problem (och parallellisering är effektiv under andra omständigheter) . Att gå tillbaka till krigsanalysen: användare kan göra ett i huvudsak obegränsat antal samtidiga förfrågningar med kostnaden för varje varelse i huvudsak noll, men kostnaden för varje förfrågan kommer in ERDDAP™ kan vara stor och ERDDAP "Svarsförmåga är ändlig. Tydligt, ERDDAP™ kommer att förlora denna strid, om inte ERDDAP™ administratör svartlistar användare som gör flera samtidiga förfrågningar som orättvist tränger ut andra användare.
         
    * Flera skript -
Tänk nu på vad som händer när det finns flera smarta användare som kör parallella skript. Om en användare kan generera så många förfrågningar att andra användare är trånga, kan flera sådana användare generera så många förfrågningar att ERDDAP™ blir överväldigad och till synes oansvarig. Det är effektivt en [DDOS attack](https://en.wikipedia.org/wiki/Denial-of-service_attack) Återigen det enda försvaret för ERDDAP™ är att svartlista användare gör flera samtidiga förfrågningar som orättvist tränger ut andra användare.
         
    * Uppblåsta förväntningar -
I denna värld av massiva teknikföretag (Amazon, Google, Facebook, ...) Användare har kommit att förvänta sig i huvudsak obegränsade möjligheter från leverantörerna. Eftersom dessa företag är penningverksamhet, desto fler användare de har, desto mer intäkter måste de utöka sin IT-infrastruktur. Så de har råd med en massiv IT-infrastruktur för att hantera förfrågningar. Och de begränsar smart antalet förfrågningar och kostnader för varje förfrågan från användarna genom att begränsa de typer av förfrågningar som användarna kan göra så att ingen enskild begäran är betungande, och det finns aldrig en anledning. (Eller ett sätt) För användare att göra flera samtidiga förfrågningar. Så dessa stora teknikföretag kan ha mycket mer användare än ERDDAP™ Men de har massivt mer resurser och smarta sätt att begränsa förfrågningarna från varje användare. Det är en hanterbar situation för de stora IT-företagen (Och de blir rika&#33;) men inte för ERDDAP™ installationer. Återigen det enda försvaret för ERDDAP™ är att svartlista användare gör flera samtidiga förfrågningar som orättvist tränger ut andra användare.
         
    
Så användare: Gör inte flera samtidiga förfrågningar eller du kommer att svartlistas&#33;
     

Det är klart bäst om din server har många kärnor, mycket minne (så att du kan fördela mycket minne till ERDDAP™ mer än det någonsin behöver) och en hög bandbredd internetanslutning. Sedan är minnet sällan eller aldrig en begränsande faktor, men nätverksbandbredd blir den vanligaste gränsfaktorn. I grund och botten, eftersom det finns fler och fler samtidiga förfrågningar, minskar hastigheten till en viss användare. Det saktar naturligtvis antalet förfrågningar som kommer in om varje användare bara skickar en förfrågan åt gången.
    
###  ERDDAP™ Få data från TREDDS{#erddap-getting-data-from-thredds} 
Om din ERDDAP™ Få några av sina data från en TREDDS på din webbplats, det finns några fördelar med att göra en kopia av THREDDS datafiler (åtminstone för de mest populära datamängderna) på en annan RAID som ERDDAP™ har tillgång till så att ERDDAP™ kan tjäna data från filerna direkt. på At at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at ERD Det gör vi för våra mest populära dataset.

*    ERDDAP™ kan få data direkt och inte behöva vänta på att TREDDDS ska ladda om datamängden eller ...
*    ERDDAP™ kan märka och införliva nya datafiler omedelbart, så det behöver inte pestera THREDDS ofta för att se om datamängden har ändrats. Se [Läs mer]&lt;updateEveryNMillis &gt;] (/docs/server-admin/datasets#updateeverynmillis) .
* Belastningen delas mellan 2 RAIDS och 2 servrar, istället för att begäran är hård på båda ERDDAP™ och TREDDS.
* Du undviker felmatchproblemet som orsakas av att TREDDS har en liten (Som standard) maximal begäran storlek. ERDDAP™ har ett system för att hantera felmatchen, men att undvika problemet är bättre.
* Du har en säkerhetskopia av data som alltid är en bra idé.

I vilket fall som helst, kör aldrig TREDDS och ERDDAP™ I samma Tomcat. Kör dem i separata Tomcats, eller bättre, på separata servrar.

Vi finner att TREDDS periodiskt kommer i ett tillstånd där förfrågningar bara hänger. Om din ERDDAP™ får data från en TREDDS och TREDDDS är i detta tillstånd. ERDDAP™ har ett försvar (Det säger att THREDDS-baserade dataset inte är tillgängligt) Men det är fortfarande besvärligt för ERDDAP™ för att för ERDDAP™ måste vänta till timeout varje gång det försöker ladda om en datamängd från en hängd TREDDS. Vissa grupper (inklusive ERD ) Undvik detta genom att proaktivt starta TREDDS ofta (t.ex. nattligt i ett cronjobb) .

### Svara långsamt{#responding-slowly} 
*    **Om ERDDAP™ Svarar långsamt** om vissa förfrågningar svarar långsamt,
du kanske kan räkna ut om långsamheten är rimlig och tillfällig (t.ex. på grund av många förfrågningar från skript eller WMS användare) om något är oförklarligt fel och du måste [Stäng av och starta om Tomcat och ERDDAP™ ](#shut-down-and-restart) .
    
Om ERDDAP™ svarar långsamt, se råden nedan för att bestämma orsaken, vilket förhoppningsvis gör att du kan åtgärda problemet.
Du kan ha en specifik utgångspunkt (t.ex. en specifik begäran URL) eller en vag utgångspunkt (t.ex., ERDDAP™ är långsam) .
Du kan känna användaren involverad (t.ex. för att de mailade dig) eller inte.
Du kan ha andra ledtrådar, eller inte.
Eftersom alla dessa situationer och alla möjliga orsaker till problemen suddas ihop försöker råden nedan hantera alla möjliga utgångspunkter och alla möjliga problem relaterade till långsamma svar.
    
    *    **Leta efter ledtrådar i [ ERDDAP "S log file"](#log) **   ( *bigParentDirectory* /logs/log.txt) .
         \\[ Vid sällsynta tillfällen finns ledtrådar i [Tomcats logfil](#tomcat-logs)   ( *Tomcat* /logs/catalina.out) . \\]   
Leta efter felmeddelanden.
Leta efter ett stort antal förfrågningar som kommer från en (eller några) användare och kanske hogging mycket av din servers resurser (minne, CPU tid, diskåtkomst, internet bandbredd) .
        
Om problemet är knutet till **en användare** Du kan ofta få en ledtråd om vem användaren är via webbtjänster som [https://whatismyipaddress.com/ip-lookup](https://whatismyipaddress.com/ip-lookup) som kan ge dig information relaterad till användarens IP-adress (som du hittar i ERDDAP "S [Log.txt](#log) fil) .
        
        * Om användaren verkar vara en **Bot** Att bete sig dåligt (En sökmotor som försöker fylla i ERDDAP™ former med varje möjlig permutation av inträdesvärden) Se till att du har ordentligt konfigurerat din server [robots.txt](#robotstxt) fil.
        * Om användaren verkar vara en **skript (s) ** Det gör flera samtidiga förfrågningar, kontakta användaren, förklara att din ERDDAP™ har begränsade resurser (t.ex. minne, CPU-tid, diskåtkomst, internetbandbredd) , och be dem att överväga andra användare och bara göra en begäran i taget. Du kan också nämna att du kommer att svartlista dem om de inte backar av.
        * Om användaren verkar vara en **skript** göra ett stort antal tidskrävande förfrågningar, be användaren att överväga andra användare genom att lägga en liten paus (2 sekunder?) i manuset mellan förfrågningar.
        *    ** WMS klient programvara** kan vara mycket krävande. En klient kommer ofta att be om 6 anpassade bilder åt gången. Om användaren verkar vara en WMS Kund som gör legitima förfrågningar, kan du:
            * Ignorera det. (Rekommenderas, eftersom de kommer att fortsätta ganska snart) 
            * Stäng av serverns WMS Service via ERDDAP s setup.html fil. (inte rekommenderat) 
        * Om förfrågningarna verkar **dum, galen, överdriven eller skadlig,** eller om du inte kan lösa problemet på annat sätt, överväga att tillfälligt eller permanent lägga till användarens IP-adress till&lt;requestBlacklist &gt; i din datasets.xml fil] (/docs/server-admin/datasets#requestblacklist) .
             
    *    **Försök att duplicera problemet själv, från din dator.**   
Figurera om problemet är med en datamängd eller alla datamängder, för en användare eller alla användare, för vissa typer av förfrågningar etc.
Om du kan duplicera problemet, försök att begränsa problemet.
Om du inte kan kopiera problemet kan problemet vara knutet till användarens dator, användarens internetanslutning eller din institutions internetanslutning.
         
    * Om bara **En dataset** svarar långsamt (kanske bara för **En typ av begäran** från en användare) Problemet kan vara:
        *    ERDDAP tillgång till datasetets källdata (i synnerhet från relationsdatabaser, Cassandra och fjärrdataset) kan vara tillfälligt eller permanent långsamt. Försök att kontrollera källans hastighet oberoende av ERDDAP . Om det är långsamt kan du kanske förbättra det.
        * Är problemet relaterat till den specifika begäran eller den allmänna typen av begäran?
Ju större den begärda delmängden av en datamängd, desto mer sannolikt kommer begäran att misslyckas. Om användaren gör stora förfrågningar, be användaren att göra mindre förfrågningar som är mer benägna att få ett snabbt och framgångsrikt svar.
            
Nästan alla datamängder är bättre på att hantera vissa typer av förfrågningar än andra typer av förfrågningar. Till exempel, när en dataset lagrar olika tidskrävningar i olika filer, kan förfrågningar om data från ett stort antal tidspunkter vara mycket långsamma. Om de aktuella förfrågningarna är av en svår typ, överväga att erbjuda en variant av datamängden som är optimerad för dessa förfrågningar. Eller bara förklara för användaren att den typen av begäran är svår och tidskrävande, och be om deras tålamod.
            
        * Datasetet kan inte vara optimalt konfigurerat. Du kanske kan göra ändringar i datasetets datasets.xml chunk för att hjälpa ERDDAP™ hantera dataset bättre. Till exempel,
            
            *    EDDGrid FrånNcFiles datamängder som åtkomst data från komprimerade nc4 / hdf5 filer är långsamma när få data för hela geografiska intervallet (till exempel för en världskarta) Eftersom hela filen måste dekomprimeras. Du kan konvertera filerna till okomprimerade filer, men sedan diskutrymme krav kommer att vara mycket, mycket större. Det är nog bättre att bara acceptera att sådana datamängder kommer att vara långsamma under vissa omständigheter.
            * Konfigurationen av [&lt; subsetVariables &gt;] (/docs/server-admin/datasets#subsetvariables) tag har ett stort inflytande på hur ERDDAP™ hanterar EDDTable dataset.
            * Du kanske kan öka [hastighet av en EDDTableFromDatabase](/docs/server-admin/datasets#database-speed) dataset.
            * Många EDDTable dataset kan spridas av [lagra en kopia av data i NetCDF Contiguous Ragged Array-filer](/docs/server-admin/datasets#eddtablefromfiles) som ERDDAP™ kan läsa mycket snabbt.
            
Om du vill ha hjälp att påskynda en viss datamängd, inkludera en beskrivning av problemet och datamängdens bit av datasets.xml och se vår [sektion om att få ytterligare stöd](/docs/intro#support) .
             
    * Om **Allt allt** in i ERDDAP™ är att **alltid alltid alltid** Långsamt, problemet kan vara:
        * Datorn som kör ERDDAP™ kanske inte har tillräckligt med minne eller bearbetningskraft. Det är bra att springa ERDDAP™ på en modern, multi-core server. För tung användning bör servern ha ett 64-bitars operativsystem och 8 GB eller mer minne.
        * Datorn som kör ERDDAP™ kan också köra andra applikationer som konsumerar massor av systemresurser. Om så är fallet kan du få en dedikerad server för ERDDAP ?? Till exempel (Detta är inte ett godkännande) Du kan få en quad-core Mac Mini Server med 8 GB minne för ~ $ 1100.
             
    * Om **Allt allt** in i ERDDAP™ är att **tillfälligt** långsamt, se din ERDDAP "S [ ** /erddap/status.html sida** ](#status-page) i din webbläsare.
        * Gör det ERDDAP™ Statussidan misslyckas med att ladda?
Om så är fallet, [omstart ERDDAP™ ](#shut-down-and-restart) .
        * Gjorde det ERDDAP™ Statussidan ladda långsamt (t.ex. &gt;5 sekunder) ??
Det är ett tecken på att allt i ERDDAP™ kör långsamt, men det är inte nödvändigtvis problem. ERDDAP™ Kan bara vara riktigt upptagen.
        * För "Response Failed Time" (Sedan senaste stora LoadDatasets) Är n= ett stort antal?
Det indikerar att det har funnits många misslyckade förfrågningar nyligen. Det kan vara problem eller början på problem. Mediantiden för misslyckandet är ofta stor (t.ex. 210000 ms) ,
vilket innebär att det fanns (Är?) massor av aktiva trådar.
som binder upp massor av resurser (som minne, öppna filer, öppna uttag, ...) ,
som inte är bra.
        * För "Response Succeed Time" (Sedan senaste stora LoadDatasets) Är n= ett stort antal?
Det indikerar att det har varit många framgångsrika förfrågningar nyligen. Detta är inte problem. Det betyder bara din ERDDAP™ Får tung användning.
        * Är "Antalet icke-Tomcat-vänta trådar" dubbelt ett typiskt värde?
Detta är ofta allvarliga problem som kommer att orsaka ERDDAP™ att sakta ner och så småningom frysa. Om detta kvarstår i timmar, kanske du vill proaktivt [omstart ERDDAP™ ](#shut-down-and-restart) .
        * Längst ner i listan "Memory Use Summary" är den sista "Memory: för närvarande använder" värdet mycket högt?
Det kan bara indikera hög användning, eller det kan vara ett tecken på problem.
        * Titta på listan över trådar och deras status. Är ett ovanligt antal av dem något ovanligt?
             
    * Är **din institutions internetanslutning** För närvarande långsamt?
Sök på internet för "internethastighetstest" och använd ett av de gratis online-testerna, till exempel [https://www.speakeasy.net/speedtest/](https://www.speakeasy.net/speedtest/) . Om din institutions internetanslutning är långsam, då är anslutningar mellan ERDDAP™ fjärrdatakällor kommer att vara långsamma, och kopplingar mellan ERDDAP™ Och användaren kommer att vara långsam. Ibland kan du lösa detta genom att stoppa onödig internetanvändning (t.ex. personer som tittar på streamingvideor eller på videokonferenssamtal) .
         
    * Är **användarens internetanslutning** För närvarande långsamt?
Har användaren sök på internet för "internethastighetstest" och använd ett av de gratis online-testerna, till exempel [https://www.speakeasy.net/speedtest/](https://www.speakeasy.net/speedtest/) . Om användarens internetanslutning är långsam, saktar den ner deras tillgång till ERDDAP . Ibland kan de lösa detta genom att stoppa onödig internetanvändning på sin institution. (t.ex. personer som tittar på streamingvideor eller på videokonferenssamtal) .
         
    *    **Stuck?**   
Se vår [sektion om att få ytterligare stöd](/docs/intro#support) .

### Shut Down och Restart{#shut-down-and-restart} 
*    **Hur man stänger av och startar om Tomcat ERDDAP™ **   
Du behöver inte stänga av och starta om Tomcat och ERDDAP om ERDDAP™ är tillfälligt långsam, långsam av någon känd anledning (som många förfrågningar från skript eller WMS användare) eller att tillämpa ändringar på datasets.xml fil.
    
Du måste stänga av och starta om Tomcat och ERDDAP™ om du behöver tillämpa ändringar i setup.xml-filen, eller om ERDDAP™ fryser, hänger eller låser upp. Under extrema omständigheter, Java kan frysa i en minut eller två medan det gör en full sopsamling, men sedan återhämta sig. Så det är bra att vänta en minut eller två för att se om Java /// ERDDAP™ är verkligen frusen eller om det bara gör en lång soporsamling. (Om sopor samling är ett vanligt problem, [Tilldela mer minne till Tomcat](/docs/server-admin/deploy-install#memory) .) 
    
Jag rekommenderar inte att du använder Tomcat Web Application Manager för att starta eller stänga av Tomcat. Om du inte helt stänger och startar Tomcat, kommer du förr eller senare att ha PermGen minnesproblem.
    
Att stänga av och starta om Tomcat och ERDDAP Från:
    
    * Om du använder Linux eller Mac:
         (Om du har skapat en speciell användare för att köra Tomcat, t.ex. tomcat, kom ihåg att göra följande steg som den användaren.)   
         
        1. Använd cd *Tomcat* /bin
             
        2. Använd ps -ef | grep tomcat för att hitta java/tomcat-processen ID (Förhoppningsvis kommer bara en process att listas) som vi kallar *JavaProcessID* nedanför.
             
        3. Om ERDDAP™ fryst/hung/låst upp, använd kill -3 *JavaProcessID* Att berätta Java   (som kör Tomcat) för att göra en tråd dumpning till Tomcat log fil: *Tomcat* /logs/catalina.out. När du startar om kan du diagnostisera problemet genom att hitta tråddumpinformationen (och annan användbar information ovanför den) in i *Tomcat* /logs/catalina.out och även genom att läsa relevanta delar av [ ERDDAP™ Log Arkiv](#log) . Om du vill kan du inkludera den informationen och se vår [sektion om att få ytterligare stöd](/docs/intro#support) .
             
        4. Använd ./shutdown. Skräck
             
        5. Använd ps -ef | grep tomcat upprepade gånger tills java/tomcat-processen inte är listad.
            
Ibland tar Java/tomcat-processen upp till två minuter för att helt stänga av. Anledningen är: ERDDAP™ skickar ett meddelande till sina bakgrundstrådar för att berätta för dem att sluta, men ibland tar det dessa trådar lång tid att komma till en bra stoppplats.
            
        6. Om efter en minut eller så, java/tomkat inte stannar själv, kan du använda
Döda -9 *JavaProcessID*   
Att tvinga Java/tomcat-processen att sluta omedelbart. Om möjligt, använd detta endast som en sista utväg. -9 switchen är kraftfull, men det kan orsaka olika problem.
             
        7. Att starta om ERDDAP™ Använd ./startup.sh
             
        8. Utsikt ERDDAP™ i din webbläsare för att kontrollera att omstarten lyckades. (Ibland måste du vänta 30 sekunder och försöka ladda ERDDAP™ igen i din webbläsare för att det ska lyckas.)   
             
    * Om du använder Windows:
         
        1. Använd cd *Tomcat* /bin
             
        2. Användning shutdown.bat   
             
        3. Du kanske vill/behöver använda Windows Task Manager (Tillgänglig via Ctrl Alt Del) säkerställa att Java /Tomcat/ ERDDAP™ Process/applikation har helt slutat.
Ibland tar processen/applikationen upp till två minuter att stänga av. Anledningen är: ERDDAP™ skickar ett meddelande till sina bakgrundstrådar för att berätta för dem att sluta, men ibland tar det dessa trådar lång tid att komma till en bra stoppplats.
             
        4. Att starta om ERDDAP™ Använd Startup.bat
             
        5. Utsikt ERDDAP™ i din webbläsare för att kontrollera att omstarten lyckades. (Ibland måste du vänta 30 sekunder och försöka ladda ERDDAP™ igen i din webbläsare för att det ska lyckas.)   
             
### Frekventa kraschar eller fryser{#frequent-crashes-or-freezes} 
Om ERDDAP™ blir långsamma, kraschar eller fryser, något är fel. Titta in [ ERDDAP "S log file"](#log) För att försöka räkna ut orsaken. Om du inte kan, vänligen inkludera detaljerna och se våra [sektion om att få ytterligare stöd](/docs/intro#support) .

Det vanligaste problemet är en besvärande användare som kör flera skript samtidigt och / eller någon som gör ett stort antal ogiltiga förfrågningar. Om detta händer, bör du förmodligen svartlista den användaren. När en svartlistad användare gör en förfrågan uppmuntrar felmeddelandet i svaret dem att maila dig för att träna problemen. Då kan du uppmuntra dem att köra bara ett manus i taget och att åtgärda problemen i deras manus. (e.g. begära data från en fjärrdatamängd som inte kan svara innan du tar ut) . Se [Säkert]&lt;requestBlacklist &gt; i din datasets.xml fil] (/docs/server-admin/datasets#requestblacklist) .

Under extrema omständigheter, Java kan frysa i en minut eller två medan det gör en full sopsamling, men sedan återhämta sig. Så det är bra att vänta en minut eller två för att se om Java /// ERDDAP™ är verkligen frusen eller om det bara gör en lång soporsamling. (Om sopor samling är ett vanligt problem, [Tilldela mer minne till Tomcat](/docs/server-admin/deploy-install#memory) .) 

Om ERDDAP™ blir långsamma eller fryser och problemet är inte en besvärande användare eller en lång soporsamling, du kan vanligtvis lösa problemet genom att [omstart ERDDAP™ ](#shut-down-and-restart) . Min erfarenhet är att ERDDAP™ kan springa i månader utan att behöva en omstart.
     

### Monitor{#monitor} 
Du kan övervaka din ERDDAP status genom att titta på [ /erddap/status.html sida](#status-page) I synnerhet statistiken i det övre avsnittet. Om ERDDAP™ blir långsamma eller fryser och problemet är inte bara extremt tung användning, du kan vanligtvis lösa problemet genom att [omstart ERDDAP™ ](#shut-down-and-restart) . Det finns ytterligare mätvärden tillgängliga genom Prometheus-integrationen på /erddap/metri.

Min erfarenhet är att ERDDAP™ kan springa i månader utan att behöva en omstart. Du bör bara behöva starta om det om du vill tillämpa några ändringar du gjort för att ERDDAP s setup.xml eller när du behöver installera nya versioner av ERDDAP™ , Java Tomcat eller operativsystemet. Om du behöver starta om ERDDAP™ Ofta är något fel. Titta in [ ERDDAP "S log file"](#log) För att försöka räkna ut orsaken. Om du inte kan, vänligen inkludera detaljerna och se våra [sektion om att få ytterligare stöd](/docs/intro#support) . Som en tillfällig lösning kan du försöka använda [Monit](https://mmonit.com/monit/) för att övervaka din ERDDAP™ och starta om det vid behov. Eller du kan göra ett cron jobb att starta om ERDDAP™   (proaktivt) periodiskt. Det kan vara lite utmanande att skriva ett manus för att automatisera övervakning och starta om ERDDAP . Några tips som kan hjälpa:

* Du kan förenkla testningen om Tomcat-processen fortfarande körs genom att använda -c-brytaren med grep:
Ps -u *Tomcat Användare*   | grep -c java
Det kommer att minska produktionen till "1" om tomkatprocessen fortfarande lever, eller "0" om processen har slutat.
     
* Om du är bra med gawk kan du extrahera processid från resultaten av
Ps -u *Tomcat Användare*   | grep java och använd processID i andra linjer av manuset.
     

Om du ställer in Monit eller ett cronjobb, skulle det vara bra om du kunde dela detaljerna så att andra kunde gynna se vår [sektion om att få ytterligare stöd](/docs/intro#support) för var du kan dela.

#### Permgen{#permgen} 
Om du upprepade gånger använder Tomcat Manager för att ladda om (Stoppa och börja)   ERDDAP™ , ERDDAP™ kan inte starta och kasta java.lang. OutOfMemoryError: PermGen. Lösningen är att periodiskt (Eller varje gång?)   [Stäng av och starta om tomcat och ERDDAP™ ](#shut-down-and-restart) I stället för att bara ladda ERDDAP .
 \\[ Uppdatering: Detta problem var kraftigt minimerad eller fast i ERDDAP™ version 1.24. \\]   
     
#### Logga in{#log} 
*    ** [Log.txt](#log) **   
Om ERDDAP™ startar inte upp eller om något inte fungerar som förväntat, är det mycket användbart att titta på fel och diagnostiska meddelanden i ERDDAP™ Log file.
    * Logfilen är *bigParentDirectory* /logs/log.txt
         ( *bigParentDirectory* specificeras i [setup.xml](/docs/server-admin/deploy-install#setupxml) ) . Om det inte finns någon logg. txt fil eller om loggen. Txt-filen har inte uppdaterats sedan du startade om ERDDAP™ Titta i [Tomcat Log Files](#tomcat-logs) se om det finns ett felmeddelande där.
    * Typer av diagnostiska meddelanden i logfilen:
        * Ordet "fel" används när något gick så fel att förfarandet inte slutfördes. Även om det är irriterande att få ett fel, tvingar felet dig att hantera problemet. Vårt tänkande är att det är bättre att kasta ett fel än att ha ERDDAP™ hobble tillsammans, arbeta på ett sätt som du inte förväntade dig.
        * Ordet "varning" används när något gick fel, men förfarandet kunde slutföras. Dessa är ganska sällsynta.
        * Allt annat är bara ett informativt meddelande. Du kan kontrollera hur mycket information som är inloggad med [&lt;LogLevel&gt;] (/docs/server-admin/datasets#loglevel)   datasets.xml .
        * Dataset reloads och användarrespons som tar &gt;10 sekunder att slutföra (framgångsrikt eller misslyckat) är märkta med " (&gt;10&#33;) ". Således kan du söka log.txt-filen för den här frasen för att hitta de datamängder som var långsamma att ladda om eller begäran antal för de förfrågningar som var långsamma att slutföra. Du kan sedan titta högre i log.txt-filen för att se vad datasetproblemet var eller vad användarens begäran var och vem det var från. Dessa långsamma datamängder och användarförfrågningar beskattar ibland på ERDDAP . Att veta mer om dessa förfrågningar kan hjälpa dig att identifiera och lösa problem.
    * Information skrivs till loggfilen på diskenheten i ganska stora bitar. Fördelen är att detta är mycket effektivt - ERDDAP™ kommer aldrig att blockera väntar på att information ska skrivas till loggfilen. Nackdelen är att loggen nästan alltid slutar med ett partiellt meddelande, som inte slutförs förrän nästa bit skrivs. Du kan göra det uppdaterat (För ett ögonblick) genom att se din ERDDAP status webbsida påhttps://*your.domain.org*/erddap/status.html  (eller http:// om https är inte aktiverat) .
    * När log.txt-filerna kommer till 20 MB,
filen döptes till logg. txt.previous och en ny log.txt-fil skapas. Så loggfiler ackumuleras inte.
        
I setup.xml kan du ange en annan maximal storlek för logfilen, i MegaBytes. Det minsta tillåtna är 1 (MB) . Det högsta tillåtna är 2000 (MB) . Standarden är 20 (MB) . Till exempel:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```

    * När du startar om ERDDAP™ ,
         ERDDAP™ Gör en arkivkopia av log.txt och log. txt.previous filer med en tidsstämpel i filens namn. Om det fanns problem innan omstarten, kan det vara användbart att analysera dessa arkiverade filer för ledtrådar om vad besväret var. Du kan ta bort arkivfilerna om de inte längre behövs.
         
##### Parsing log.txt{#parsing-logtxt} 
 ERDDAP "S log. Txt-filen är inte utformad för parsing (Även om du kanske kan skapa regelbundna uttryck som extraherar önskad information) . Det är utformat för att hjälpa en människa att räkna ut vad som går fel när något går fel. När du skickar in en fel- eller problemrapport till ERDDAP™ utvecklare, när det är möjligt, vänligen inkludera all information från log.txt-filen relaterad till den besvärliga begäran.

Av effektivitetsskäl, ERDDAP™ Skriver bara information för att logga. txt efter en stor del av informationen har samlats. Om du besöker log. txt direkt efter ett fel har inträffat, information relaterad till felet kanske ännu inte har skrivits till log.txt. För att få helt uppdaterad information från log.txt, besök din ERDDAP "S [status.html page](#status-page) . När när ERDDAP™ processer som begär, det spolas all väntande information till log.txt.

För ERDDAP™ användningsstatistik, vänligen använd [Apache och/eller Tomcat-loggfiler](#tomcat-logs) istället för ERDDAP log.txt. Observera att ERDDAP "S [status.html page](#status-page)   (vissa) och [Daglig rapport](#daily-report)   (mer mer mer) har ett stort antal användningsstatistik för dig.
    
### Tomcat Logs{#tomcat-logs} 
Om ERDDAP™ startar inte eftersom ett fel inträffade mycket tidigt i ERDDAP start, felmeddelandet kommer att visas i Tomcats loggfiler ( *Tomcat* /loggar/catalina. *idag idag idag* .log eller *Tomcat* /logs/catalina.out) inte in [ ERDDAP Log.txt-fil](#log) .

Användningsstatistik: För de flesta av de uppgifter som folk vill samla in från en loggfil (t ex användningsstatistik) Använd Apache- och/eller Tomcat-loggfilerna. De är snyggt formaterade och har den typen av information. Det finns många verktyg för att analysera dem, till exempel [AWStats](https://www.awstats.org) , [ElasticSearchs Kibana](https://www.elastic.co/products/kibana) och [JMeter](https://jmeter.apache.org) Men sök på webben för att hitta rätt verktyg för dina ändamål.

Observera att loggfilerna endast identifierar användare som IP-adresser. Det finns webbplatser som hjälper dig att få information relaterad till en viss IP-adress, t.ex. [WhatIsMyIPAddress](https://whatismyipaddress.com/ip-lookup) Men du brukar inte kunna hitta användarens namn.

På grund av [DHCP](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol) En viss användares IP-adress kan vara annorlunda på olika dagar, eller olika användare kan ha samma IP-adress vid olika tidpunkter.

Alternativt kan du använda något som [Google analys](https://analytics.google.com/analytics/web/provision/?authuser=0#/provision) . Men akta dig: När du använder externa tjänster som Google Analytics ger du upp användarnas integritet genom att ge Google full tillgång till deras aktivitet på din webbplats som Google (och andra?) kan hålla för evigt och använda för alla ändamål (kanske inte tekniskt, men förmodligen i praktiken) . Dina användare har inte samtyckt till detta och är förmodligen inte medvetna om att de kommer att spåras på din webbplats, precis som de förmodligen inte är medvetna om i vilken utsträckning de spåras på nästan alla webbplatser. Idag är många användare mycket oroade över att allt de gör på webben övervakas av dessa stora företag. (Google, Facebook, etc.) och av regeringen, och finna detta ett obefogat intrång i deras liv (som i boken, 1984) . Detta har drivit många användare att installera produkter som [Privacy Badger](https://www.eff.org/privacybadger/faq) minimera spårning, att använda alternativa webbläsare som [Tor Browser](https://www.torproject.org/)   (eller stänga av spårning i traditionella webbläsare) och att använda alternativa sökmotorer som [Duck Duck Go](https://duckduckgo.com/) . Om du använder en tjänst som Google Analytics kan du åtminstone dokumentera dess användning och konsekvenserna genom att ändra&lt;standardPrivacyPolicy&gt; tagga in ERDDAP "S
 \\[ Tomcat \\] /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml-fil.
    
### E-Mail Log{#e-mail-log} 
*    **emailLogYEAR-MM-DD.txt**   
     ERDDAP™ Skriv alltid texten till alla pågående e-postmeddelanden i dagens e-postmeddelande LogYEAR-MM-DD.txt-fil i *bigParentDirectory* /loggar ( *bigParentDirectory* specificeras i [setup.xml](/docs/server-admin/deploy-install#setupxml) ) .
    * Om servern inte kan skicka ut e-postmeddelanden, eller om du har konfigurerat ERDDAP™ inte skicka ut e-postmeddelanden, eller om du bara är nyfiken, är den här filen ett bekvämt sätt att se alla e-postmeddelanden som har skickats ut.
    * Du kan ta bort tidigare dagars e-postloggfiler om de inte längre behövs.
         
### Daglig rapport{#daily-report} 
Dagsrapporten har massor av användbar information - all information från din ERDDAP "S [ /erddap/status.html sida](#status-page) och mer.
    * Det är den mest kompletta sammanfattningen av din ERDDAP status.
    * Bland annan statistik innehåller den en lista över datamängder som inte laddades och de undantag de genererade.
    * Det genereras när du startar ERDDAP™   (strax efter ERDDAP™ Slutar försöka ladda alla datamängder) och genereras strax efter 7 är lokal tid varje morgon.
    * När den genereras, skrivs den till [ ERDDAP Log.txt-fil](#log) .
    * När den genereras skickas den till&lt;emailDailyReportsTo&gt; och&lt;e-postAllt Till&gt; (som anges i [setup.xml](/docs/server-admin/deploy-install#setupxml) ) förutsatt att du har ställt in e-postsystemet (i setup.xml) .

### Status Page{#status-page} 
Du kan se statusen för din ERDDAP™ från någon webbläsare genom att gå till&lt;BasUrl&gt; /erddap/status.html 
* Den här sidan genereras dynamiskt, så den har alltid uppdaterad statistik för din ERDDAP .
* Den innehåller statistik om antalet förfrågningar, minnesanvändning, trådstack spår, uppgiftThread, etc.
* Eftersom statussidan kan ses av någon, innehåller den inte lika mycket information som den [Daglig rapport](#daily-report) .
         
### Lägga till / Ändra data{#addingchanging-datasets} 
 ERDDAP™ vanligtvis rereads datasets.xml Var och en *loadDatasetsMinutes*   (specificeras i [setup.xml](/docs/server-admin/deploy-install#setupxml) ) . Så du kan göra ändringar i datasets.xml När som helst, även när ERDDAP™ kör.
En ny dataset kommer att upptäckas snart, vanligtvis inom *loadDatasetsMinutes* .
En ändrad dataset kommer att laddas om när den är *ReloadEveryNMinutes* gamla gamla (som anges i datasets.xml ) .
    
#### Flaggan{#flag} 
*    ** [Flag File](#flag) Tells ERDDAP™ Försök att ladda om en dataset så snart som möjligt** 
    
    *    ERDDAP™ kommer inte att märka några ändringar i en dataset inställning i datasets.xml fram till ERDDAP™ reloads dataset.
         
    * Att berätta ERDDAP™ att ladda om en dataset så snart som möjligt (före datasetets&lt;reloadEveryNMinutes&gt; skulle orsaka att den laddas om, lägga en fil i *bigParentDirectory* Flagga ( *bigParentDirectory* specificeras i [setup.xml](/docs/server-admin/deploy-install#setupxml) ) Det har samma namn som datasetets datasetID .
Detta berättar ERDDAP™ För att försöka ladda om dataset ASAP.
Den gamla versionen av datamängden kommer att förbli tillgänglig för användare tills den nya versionen är tillgänglig och bytte atomiskt på plats.
För EDDGrid FromFiles och EDDTable FrånFiles kommer reloading dataset leta efter nya eller ändrade filer, läsa dem och införliva dem i datasetet. Så tiden att ladda om är beroende av antalet nya eller ändrade filer.
Om datasetet har aktivt = "falskt", ERDDAP™ kommer att ta bort datasetet.
         
##### Dåliga filer flagga{#bad-files-flag} 
* En variant av /flag katalogen är /badFilesFlag katalogen. (Tillagd i ERDDAP™ v2.12.)   
Om du lägger en fil i *bigParentDirectory* /badFilesFlag katalog med en datasetID som filnamn (filinnehåll spelar ingen roll) Så snart ERDDAP™ ser badFiles Flag Fil, ERDDAP™ Kommer:
    
    1. Ta bort badFilesFlag-filen.
    2. Ta bort badFiles .nc fil (Om det finns en) , som har listan över dåliga filer för den datamängden.
För dataset som EDDGrid SideBySide som har barnDatasets, detta tar också bort de dåliga filerna .nc fil för alla barn datamängder.
    3. Reload the dataset ASAP.
    
Således orsakar detta ERDDAP™ försök igen att arbeta med filerna tidigare (felaktigt?) markerad som dålig.
         
##### Hård flagga{#hard-flag} 
* En annan variant av /flag katalogen är /hardFlag katalogen. (Tillagd i ERDDAP™ v1.74.)   
Om du lägger en fil i *bigParentDirectory* /hardFlag med en datasetID som filnamn (filinnehåll spelar ingen roll) Så snart ERDDAP™ Ser den hårda Flag Fil, ERDDAP™ Kommer:
    
    1. Ta bort hardFlag-filen.
    2. Ta bort datamängden från ERDDAP .
    3. Ta bort all information som ERDDAP™ har lagrat om denna dataset.
För EDDGrid FromFiles och EDDTable FrånFiles underklasser tar detta bort den interna databasen med datafiler och deras innehåll.
För dataset som EDDGrid SideBySide som har barnDatasets, tar detta också bort den interna databasen med datafiler och deras innehåll för alla barndatamängder.
    4. Reload the dataset.
För EDDGrid FromFiles och EDDTable FrånFiles underklasser, detta orsakar ERDDAP™ att läsa **Alla alla** av datafilerna. Således är reloadtiden beroende av det totala antalet datafiler i datamängden. Eftersom datasetet togs bort från ERDDAP™ När hardFlag märktes kommer datamängden att vara otillgänglig tills datamängden avslutar reloading. Var tålmodig. Titta i [Log.txt](#log) fil om du vill se vad som händer.
    
HardFlag-varianten raderar datamängdens lagrade information även om datamängden för närvarande inte laddas in ERDDAP .
    
Hård Flaggor är mycket användbara när du gör något som orsakar en förändring i hur ERDDAP™ läser och tolkar källdata, till exempel när du installerar en ny version av ERDDAP™ eller när du har ändrat en datamängds definition i datasets.xml 
    
* Innehållet i flaggan, badFilesFlag och hardFlag filer är irrelevanta. ERDDAP™ Tittar bara på filnamnet för att få datasetID .
     
* mellan stora dataset-reloader, ERDDAP™ ser kontinuerligt för flagga, badFilesFlag och hardFlag-filer.
     
* Observera att när en dataset laddas om, alla filer i *bigParentDirectory* /// [Cache](#cached-responses) /// * datasetID * Katalogen raderas. Detta inkluderar .nc och bildfiler som normalt är cachade i ~15 minuter.
     
* Observera att om datasetets xml inkluderar [aktiv="falsk"](/docs/server-admin/datasets#active) En flagga kommer att orsaka att datamängden görs inaktiv (om det är aktivt) och i alla fall inte laddas om.
     
* Varje gång ERDDAP™ kör LoadDatasets för att göra en stor reload (tidsreload kontrollerad av&lt;loadDatasetsMinutes &gt;) eller en mindre reload (till följd av en extern eller intern flagga) , ERDDAP™ Läser allt&lt;DecompressedCacheMaxGB&gt;,&lt;DecompressedCacheMaxMinutesOld&gt;,&lt;användaren&gt;,&lt;begäranBlacklist&gt;,&lt;slowDownTroubleMillis &gt; och&lt;abonnemangEmailBlacklist&gt; taggar och växlar till de nya inställningarna. Så du kan använda en flagga som ett sätt att få ERDDAP™ för att märka ändringar i dessa taggar ASAP.

##### Set Dataset Flag{#set-dataset-flag} 
*   ERDDAP™ har en webbtjänst så att flaggor kan ställas in via webbadresser.
    
    * Till exempel,
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
         (Det är en falsk flagga Nyckeln) kommer att sätta en flagga för rPmelTao dataset.
    * Det finns en annan flaggKey för varje datasetID .
    * Administratörer kan se en lista över flagg-adresser för alla datamängder genom att titta längst ner på deras [Daglig rapport](#daily-report) e-post.
    * Administratörer bör behandla dessa webbadresser som konfidentiella, eftersom de ger någon rätt att återställa en datamängd efter behag.
    * Om du tror att flaggan har fallit i händerna på någon som missbrukar dem, kan du ändra&lt;flagKeyKey &gt; i [setup.xml](/docs/server-admin/deploy-install#setupxml) och omstart ERDDAP Att tvinga ERDDAP™ för att generera och använda en annan uppsättning flaggKeys.
    * Om du ändrar&lt;flagKeyKey &gt;, ta bort alla gamla prenumerationer (se listan i din dagliga rapport) Och kom ihåg att skicka de nya webbadresserna till de människor som du vill ha dem.
    
Flaggsystemet kan fungera som grund för en effektivare mekanism för att berätta ERDDAP™ När du ska ladda om en dataset. Du kan till exempel ställa in en dataset&lt;ReloadEveryNMinutes &gt; till ett stort antal (10080 = 1 vecka) . När du vet att datamängden har ändrats (Kanske för att du lade till en fil till datasetets datakatalog) Ange en flagga så att datamängden laddas om så snart som möjligt. Flaggor ses vanligen snabbt. Men om LoadDatasets tråd redan är upptagen, kan det vara ett tag innan det är tillgängligt för att agera på flaggan. Men flaggsystemet är mycket mer responsivt och mycket effektivare än inställningen.&lt;ReloadEveryNMinutes &gt; till ett litet antal.
    
#### Ta bort dataset{#removing-datasets} 
Om en dataset är aktiv i ERDDAP™ och du vill inaktivera det tillfälligt eller permanent:
1. Inom datasets.xml för dataset, set [aktiv="falsk"](/docs/server-admin/datasets#active) i dataset tag.
2. Vänta på ERDDAP™ för att ta bort dataset under nästa stora reload eller [Ställ en flagga](#flag) för dataset att berätta ERDDAP™ att märka denna förändring så snart som möjligt. När du gör detta, ERDDAP™ slänger inte ut någon information som den kan ha lagrat om datamängden och gör verkligen ingenting för de faktiska uppgifterna.
3. Då kan du lämna den aktiva = "falska" dataset i datasets.xml eller ta bort den.
         
#### När laddas dataset?{#when-are-datasets-reloaded} 
En tråd som kallas RunLoadDatasets är huvudtråden som styr när datamängder laddas om. RunLoad Datasets loopar för alltid:

1. RunLoadDatasets noterar aktuell tid.
2. RunLoadDatasets startar en LoadDatasets tråd för att göra en "majorLoad". Du kan se information om den aktuella/föregående majorLoad högst upp på din ERDDAP "S
     [ /erddap/status.html sida](#status-page)   (till exempel, [Statussidan Exempel](https://coastwatch.pfeg.noaa.gov/erddap/status.html) ) .
    
    1. LoadDatasets gör en kopia av datasets.xml .
    2. LoadDatasets läser genom kopian av datasets.xml för varje datamängd, se om datamängden måste vara (Retur) laddad eller borttagen.
        * Om en [flagga](#flag) filen finns för denna datamängd, filen raderas och datamängden tas bort om aktiv = "falsk" eller (Retur) laddad om aktiv = "sann" (Oavsett datamängdens ålder) .
        * Om datasetets dataset.xml chunk har aktivt = "falskt" och datasetet laddas för närvarande. (aktiv aktiv aktiv aktiv) Den är lossad (bort) .
        * Om datamängden har aktiv = "sann" och datamängden inte redan är laddad, laddas den.
        * Om datamängden har aktiv = "sann" och datamängden redan är laddad, laddas datamängden om datamängdens ålder (Tid sedan senaste lasten) är större än dess&lt;Reload EveryNMinutes &gt; (Standard = 10080 minuter) Annars lämnas dataset ensam.
    3. LoadDatasets slutar.
    
RunLoadDatasets tråd väntar på LoadDatasets tråd att avsluta. Om LoadDatasets tar längre tid än loadDatasets MinMinutes (som anges i setup.xml) RunLoadDatasets avbryter tråden LoadDatasets. Idealiskt, LoadDatasets märker avbrott och finish. Men om det inte märker avbrottet inom en minut, kallar RunLoadDatasets loadDatasets. Sluta stoppa () som är oönskade.
3. Medan tiden sedan starten av den sista majorLoad är mindre än loadDatasets MinMinutes (som anges i setup.xml, t.ex. 15 minuter) RunLoadDatasets söker upprepade gånger [flagga](#flag) filer i *bigParentDirectory* /flag katalog. Om en eller flera flaggfiler hittas raderas de och RunLoadDatasets startar en LoadDatasets-tråd för att göra en "minorLoad" (majorLoad=false) . Du kan inte se mindreLoad information om din ERDDAP "S [ /erddap/status.html sida](#status-page) .
    1. LoadDatasets gör en kopia av datasets.xml .
    2. LoadDatasets läser genom kopian av datasets.xml och för varje dataset där det fanns en flaggfil:
        * Om datasetets dataset.xml chunk har aktivt = "falskt" och datasetet laddas för närvarande. (aktiv aktiv aktiv aktiv) Den är lossad (bort) .
        * Om datamängden har aktiv = "sann", är datamängden aktiv. (Retur) laddad, oavsett ålder. Icke-flaggade dataset ignoreras.
    3. LoadDatasets slutar.
4. RunLoad Dataset går tillbaka till steg 1.

Anteckningar:
* Startup
När du startar om ERDDAP™ Varje dataset med aktiv = "sann" laddas.
* Cache
När en dataset är (Retur) laddad, dess cache (inklusive alla dataresponsfiler och/eller bildfiler) är tömd.
* Massor av dataset
Om du har många datamängder och/eller en eller flera datamängder är långsamma (Retur) last, en LoadDatasets tråd kan ta lång tid att avsluta sitt arbete, kanske ännu längre än loadDatasets MinMinutes.
* En LoadDatasets Thread
Det finns aldrig mer än en LoadDatasets tråd som körs på en gång. Om en flagga är inställd när LoadDatasets redan körs, kommer flaggan förmodligen inte att märkas eller ageras på tills LoadDatasets tråd slutar löpa. Du kanske säger: "Det är dumt. Varför startar du inte bara ett gäng nya trådar för att ladda datamängder? Men om du har massor av datamängder som får data från en fjärrserver, kommer även en LoadDatasets tråd att lägga stor stress på fjärrservern. Detsamma gäller om du har massor av datamängder som får data från filer på en RAID. Det finns snabbt minskande avkastning från att ha mer än en LoadDatasets tråd.
* Flagga = ASAP
Att ställa in en flagga signalerar bara att datamängden ska vara (Retur) laddas så snart som möjligt, inte nödvändigtvis omedelbart. Om ingen LoadDatasets tråd för närvarande körs, kommer datamängden att börja laddas om inom några sekunder. Men om en LoadDatasets tråd för närvarande körs, kommer datamängden förmodligen inte att laddas om förrän efter att LoadDatasets tråd är klar.
* Flag File raderad
I allmänhet, om du lägger en flaggfil i *bigParentDirectory* /erddap/flag katalog (genom att besöka datasetets flagga Url eller sätta en faktisk fil där) Datasetet kommer vanligtvis att laddas om mycket snart efter att flaggfilen raderas.
* Flagga kontra liten reload EveryNMinutes
Om du har något externt sätt att veta när en datamängd måste laddas om och om det är bekvämt för dig, är det bästa sättet att se till att en datamängd alltid är aktuell är att ställa in sin omlastning. EveryNMinutes till ett stort antal (10080?) och sätta en flagga (via ett manus?) när den behöver laddas om. Det är det system som EDDGrid FromErddap och EDDTableFromErddap-användning får meddelanden om att datamängden måste laddas om.
* Titta i Log.txt
Massor av relevant information skrivs till *bigParentDirectory* /logs/log.txt fil. Om saker inte fungerar som du förväntar dig, titta på loggen. txt låter dig diagnostisera problemet genom att ta reda på exakt vad ERDDAP™ gjorde.
    
    * Sök efter "majorLoad=true" för början av stora LoadDataset trådar.
    * Sök efter "majorLoad=false" för början av mindre LoadDatasets trådar.
    * Sök efter en viss dataset datasetID för information om att det är (Retur) laddad eller queried.
        
          
         
#### Cachade svar{#cached-responses} 
I allmänhet, ERDDAP™ inte cache (butik) svar på användarförfrågningar. Förnuftet var att de flesta förfrågningar skulle vara något annorlunda så cache skulle inte vara mycket effektiv. De största undantagen är förfrågningar om bildfiler (som är cachade sedan webbläsare och program som Google Earth Ofta re-request bilder) och begäran om .nc filer filer (eftersom de inte kan skapas på flygningen) . ERDDAP™ lagrar varje dataset cachade filer i en annan katalog: *bigParentDirectory* /cache/ * datasetID * Eftersom en enda cache katalog kan ha ett stort antal filer som kan bli långsamma att komma åt.
Filer tas bort från cache av en av tre skäl:
* Alla filer i denna cache raderas när ERDDAP™ omstartas.
* Periodiskt, någon fil mer än&lt;cacheminutes &gt; gamla (som anges i [setup.xml](/docs/server-admin/deploy-install#setupxml) ) kommer att raderas. Ta bort filer i cache baserat på ålder (Inte minst-nyligen-använd) säkerställer att filer inte kommer att stanna i cache mycket länge. Även om det kan verka som en viss begäran bör alltid returnera samma svar, är det inte sant. Till exempel en tabledap Förfrågan som inkluderar &time&gt; *vissa Tid* kommer att ändras om nya data kommer till datamängden. Och en griddap begäran som inkluderar \\[ Sista sista \\] för tidsdimensionen kommer att ändras om nya data kommer till datamängden.
* Bilder som visar felförhållanden är cachade, men bara några minuter (Det är en svår situation) .
* Varje gång en dataset laddas om, raderas alla filer i datasetets cache. Eftersom förfrågningar kan vara för "last" Index i en rutnät dataset, filer i cache kan bli ogiltiga när en dataset laddas om.
         
#### Stored Dataset Information{#stored-dataset-information} 
För alla typer av dataset, ERDDAP™ samlar in massor av information när en dataset laddas och håller det i minnet. Detta tillåter ERDDAP™ att svara mycket snabbt på sökningar, förfrågningar om listor över datamängder och förfrågningar om information om ett datamängd.

För några typer av dataset (i synnerhet EDDGrid Kopiera, EDDTableCopy, EDDGrid Från *Xxx* Filer och EDDTableFrom *Xxx* Filer) , ERDDAP™ lagrar på disk viss information om datamängden som återanvänds när datamängden laddas om. Detta snabbar kraftigt reloading processen.

* Några av dataset informationsfilerna är mänskligt läsbara .json filer och lagras i *bigParentDirectory* /dataset/ *Last2LettersOfDatasetID/ datasetID * .
*    ERDDAP™ raderar endast dessa filer i ovanliga situationer, t.ex. om du lägger till eller tar bort en variabel från datamängdens datasets.xml chunk.
* De flesta förändringar i en dataset's datasets.xml chunk (t.ex. att ändra ett globalt attribut eller en variabel attribut) inte kräver att du tar bort dessa filer. En vanlig dataset-reload kommer att hantera dessa typer av förändringar. Du kan berätta ERDDAP™ för att ladda om en dataset ASAP genom att ange en [flagga](#flag) för dataset.
* På samma sätt hanteras tillägg, radering eller ändring av datafiler när ERDDAP™ laddar om en dataset. Men ERDDAP™ kommer att märka denna typ av förändring snart och automatiskt om datamängden använder [&lt;updateEveryNMillis &gt;] (/docs/server-admin/datasets#updateeverynmillis) system.
* Det bör endast sällan vara nödvändigt för dig att radera dessa filer. Den vanligaste situationen där du behöver tvinga ERDDAP™ för att radera lagrad information (eftersom det är out-of-date/inkorrekt och kommer inte att fixas automatiskt ERDDAP ) När du gör ändringar i datasetets datasets.xml chunk som påverkar hur ERDDAP™ tolkar data i källdatafilerna, till exempel ändrar tidsvariabelns formatsträng.
* För att radera en dataset lagrade informationsfiler från en ERDDAP™ Det springer (även om datamängden för närvarande inte är laddad) Sätt en [hård hård Flaggan](#hard-flag) för denna dataset. Kom ihåg att om en datamängd är en aggregering av ett stort antal filer, kan reloading datamängden ta lång tid.
* För att radera en dataset lagrade informationsfiler när ERDDAP™ inte springa, spring [DasDds](/docs/server-admin/datasets#dasdds) för denna dataset (vilket är lättare än att räkna i vilken katalog informationen ligger och radera filerna för hand) . Kom ihåg att om en datamängd är en aggregering av ett stort antal filer, kan reloading datamängden ta lång tid.
         
### Minnesstatus{#memory-status} 
 ERDDAP™ ska aldrig krascha eller frysa upp. Om det gör det är en av de mest sannolika orsakerna otillräckligt minne. Du kan övervaka minnesanvändningen genom att titta på status.html webbsidan, som innehåller en linje som

0 gc samtal, 0 förfrågningar skjul och 0 farliga MemoryEmails sedan senaste stora LoadDatasets

 (Dessa är progressivt allvarligare händelser)   
och MB inUse och gc Calls kolumner i tabellen över statistik. Du kan berätta hur minnet stressade din ERDDAP™ är genom att titta på dessa siffror. Högre antal indikerar mer stress.

* MB inUse bör alltid vara mindre än hälften av [Xmx minnesinställning](/docs/server-admin/deploy-install#memory) . Större siffror är ett dåligt tecken.
* GC-samtal indikerar antalet gånger ERDDAP™ kallas sopor samlare för att försöka lindra hög minne användning. Om det blir &gt;100 är det ett tecken på allvarliga problem.
* shed anger antalet inkommande förfrågningar som skjul (HTTP-fel nummer 503, Service Unavailable) eftersom minnesanvändningen redan var för hög. Helst bör inga förfrågningar spridas. Det är okej om några förfrågningar skjul, men ett tecken på allvarliga problem om många skjul.
* farligt farligt farligt MemoryEmails - Om minnesanvändningen blir farligt hög ERDDAP™ skickar ett e-postmeddelande till de e-postadresser som anges i&lt;e-postAllt Till&gt; (i setup.xml) med en lista över aktiva användarförfrågningar. Som e-postmeddelandet säger, skicka dessa e-postmeddelanden till Chris. John på noaa. Gov så att vi kan använda informationen för att förbättra framtida versioner av ERDDAP .
     

Om din ERDDAP™ Minne Stressed:
* Överväg att fördela mer av din servers minne till ERDDAP™ Genom att ändra Tomcat [Xmx minnesinställning](/docs/server-admin/deploy-install#memory) .
* Om du redan har tilldelats så mycket minne som du kan till ERDDAP™ via -Xmx, överväga att köpa mer minne för din server. Minne är billigt (jämfört med priset på en ny server eller din tid) &#33;&#33; Öka sedan -Xmx.
* Inom datasets.xml , set&lt;nGridThreads&gt; till 1, set&lt;nTableThreads&gt; till 1, och set&lt;ipAddressMaxRequestsActive &gt; till 1.
* Titta på förfrågningarna i log.txt för ineffektiva eller besvärliga (men legitim) Förfrågningar. Lägg till deras IP-adresser för att&lt;requestBlacklist &gt; in i datasets.xml . Svartlista felmeddelandet innehåller ERDDAP™ administratörens e-postadress med hopp om att dessa användare kommer att kontakta dig så att du kan arbeta med dem för att använda ERDDAP™ mer effektivt. Det är bra att hålla en lista över IP-adresser du svartlista och varför, så att du kan arbeta med användarna om de kontaktar dig.
* Titta på förfrågningarna i log.txt för förfrågningar från skadliga användare. Lägg till deras IP-adresser för att&lt;requestBlacklist &gt; in i datasets.xml . Om liknande förfrågningar kommer från flera liknande IP-adress kan du använda vissa vem-is-tjänster (t.ex., [https://www.whois.com/whois/](https://www.whois.com/whois/) ) för att ta reda på utbudet av IP-adresser från den källan och svartlista hela sortimentet. och se [den]&lt;requestBlacklist &gt; dokumentation] (/docs/server-admin/datasets#requestblacklist) .
         
#### OutOfMemoryError{#outofmemoryerror} 
När du ställer in ERDDAP™ Du anger den maximala mängden minne som Java kan använda via [\\-Xmx inställning](/docs/server-admin/deploy-install#memory) . Om ERDDAP™ Allt behöver mer minne än så, det kommer att kasta en java. lang. OutOfMemoryError. ERDDAP™ Gör mycket kontroll för att göra det möjligt att hantera det felet graciöst (t.ex. en besvärlig begäran kommer att misslyckas, men systemet behåller sin integritet.) . Men ibland skadar felet systemets integritet och du måste starta om ERDDAP . Förhoppningsvis är det sällsynt.

Den snabba och enkla lösningen på en OutOfMemoryError är att öka [\\-Xmx inställning](/docs/server-admin/deploy-install#memory) Men du bör aldrig öka inställningen -Xmx till mer än 80% av det fysiska minnet i servern. (t.ex. för en 10 GB-server, sätt inte in -Xmx över 8GB) . Minnet är relativt billigt, så det kan vara ett bra alternativ för att öka minnet i servern. Men om du har maxat ut minnet i servern eller av andra skäl inte kan öka det, måste du hantera mer direkt med orsaken till OutOfMemoryError.

Om du tittar i [Log.txt](#log) fil för att se vad ERDDAP™ När felet uppstod kan du vanligtvis få en bra ledtråd om orsaken till OutOfMemoryError. Det finns många möjliga orsaker, inklusive:

* En enda stor datafil kan orsaka OutOfMemoryError, särskilt stora ASCII datafiler. Om detta är problemet, bör det vara uppenbart eftersom ERDDAP™ kommer att misslyckas med att ladda dataset (för tabular dataset) eller läs data från den filen (för gridded datasets) . Lösningen, om möjligt, är att dela filen i flera filer. Helst kan du dela filen i logiska bitar. Om filen till exempel har 20 månaders värde av data, dela den i 20 filer, var och en med 1 månads värde av data. Men det finns fördelar även om huvudfilen delas upp godtyckligt. Detta tillvägagångssätt har flera fördelar: a) Detta kommer att minska det minne som behövs för att läsa datafilerna till 1/20: e, eftersom endast en fil läses i taget. b) b) Ofta, ERDDAP™ kan hantera förfrågningar mycket snabbare eftersom det bara måste titta i en eller några filer för att hitta data för en viss begäran. c) c) Om datainsamling pågår kan de befintliga 20 filerna förbli oförändrade, och du behöver bara ändra en, liten, ny fil för att lägga till nästa månads värde av data till datamängden.
* En enda stor begäran kan orsaka OutOfMemoryError. I synnerhet några av de orderBy alternativ har hela svaret i minnet för en andra (t.ex. att göra ett slag) . Om svaret är stort kan det leda till felet. Det kommer alltid att finnas några förfrågningar som på olika sätt är för stora. Du kan lösa problemet genom att öka inställningen -Xmx. Eller du kan uppmuntra användaren att göra en serie mindre förfrågningar.
* Det är osannolikt att ett stort antal filer skulle orsaka filindexet att ERDDAP™ skapar så stor att den filen skulle orsaka felet. Om vi antar att varje fil använder 300 byte, skulle 1 000 000 filer bara ta upp 300 MB. Men datamängder med ett stort antal datafiler orsakar andra problem för ERDDAP Framför allt tar det lång tid för ERDDAP™ att öppna alla dessa datafiler när du svarar på en användarbegäran om data. I det här fallet kan lösningen vara att aggregera filerna så att det finns färre datafiler. För tabelldatamängder är det ofta bra om du sparar data från den aktuella datamängden i [CF Diskret sampling geometrier (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Ragged Array datafiler (begäran om begäran .nc CF-filer från ERDDAP ) och sedan göra en ny dataset. Dessa filer kan hanteras mycket effektivt med ERDDAP "S [EDDTableFromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles) . Om de är logiskt organiserade (var och en med data för en bit av utrymme och tid) , ERDDAP™ kan utvinna data från dem mycket snabbt.
* För tabular dataset som använder [&lt; subsetVariables &gt;] (/docs/server-admin/datasets#subsetvariables) attribut, ERDDAP™ gör en tabell med unika kombinationer av värden för dessa variabler. För stora datamängder eller när&lt; subsetVariables &gt; är felkonfigurerad, denna tabell kan vara stor nog för att orsaka OutOfMemoryErrors. Lösningen är att ta bort variabler från listan över&lt; subsetVariables för vilka det finns ett stort antal värden, eller ta bort variabler efter behov tills storleken på tabellen är rimlig. De delar av ERDDAP™ som använder subsetVariables System fungerar inte bra (t.ex. webbsidor laddas mycket långsamt) När det finns mer än 100 000 rader i den tabellen.
* Det är alltid möjligt att flera samtidigt stora förfrågningar (på en riktigt upptagen ERDDAP ) kan kombinera för att orsaka minnesproblem. Till exempel, 8 förfrågningar, var och en använder 1 GB vardera, skulle orsaka problem för en -Xmx = 8 GB-installation. Men det är sällsynt att varje förfrågan skulle vara på toppen av minnesanvändningen samtidigt. Och du skulle lätt kunna se att din ERDDAP™ är verkligen upptagen med stora förfrågningar. Men det är möjligt. Det är svårt att hantera detta problem annat än genom att öka Xmx-inställningen.
* Det finns andra scenarier. Om du tittar på [Log.txt](#log) fil för att se vad ERDDAP™ När felet uppstod kan du vanligtvis få en bra ledtråd om orsaken. I de flesta fall finns det ett sätt att minimera problemet. (Se ovan) Men ibland behöver du bara mer minne och en högre Xmx-inställning.
         
### För många öppna filer{#too-many-open-files} 
Börja med ERDDAP™ v2.12, ERDDAP™ har ett system för att övervaka antalet öppna filer (som inkluderar uttag och andra saker, inte bara filer) I Tomcat på Linux-datorer. Om vissa filer felaktigt aldrig blir stängda (En "resursläcka") Antalet öppna filer kan öka tills det överstiger det högsta tillåtna av operativsystemet och många riktigt dåliga saker händer. Så nu på Linux-datorer (eftersom informationen inte är tillgänglig för Windows) Från:

* Det finns en "Öppna filer" kolumn längst till höger om status.html webbsida som visar procenten av max filer öppna. På Windows visar det bara "?".
* När när ERDDAP™ genererar den informationen i slutet av varje större dataset-reload, den kommer att skrivas ut till loggen. txt fil:
OpenFileCount= *nuvarande* Max = *max max max max max* % = *procent* 
* Om andelen är &gt;50% skickas ett e-postmeddelande till ERDDAP™ administratör och e-post Allting Allt Till e-postadresser.

Om procentsatsen är 100%, ERDDAP™ är i fruktansvärda problem. Låt inte detta hända.
Om andelen är &gt;75%, ERDDAP™ är nära fruktansvärda problem. Det är inte okej.
Om andelen är &gt;50%, är det mycket möjligt att en spik kommer att orsaka andelen att träffa 100.
Om procentsatsen någonsin är &gt;50%, bör du:
* Öka det maximala antalet öppna filer som tillåts av antingen:
    * Gör dessa ändringar varje gång innan du börjar tomcat (Lägg dem i Tomcat Startup.sh-filen?) Från:
ulimit -Hn 16384
ulimit -Sn 16384
    * Eller göra en permanent förändring genom redigering (Som root) /etc/security/limits.conf och lägga till raderna:
tomcat mjuk nofil 16384
Tomcat hard nofile 16384
Dessa kommandon antar att användaren som kör Tomcat kallas "tomcat".
På många Linux-varianter måste du starta om servern för att tillämpa dessa ändringar. För båda alternativen är "16384" ovan ett exempel. Du väljer det nummer som du tycker är bäst.
* Restart ERDDAP . operativsystemet kommer att stänga alla öppna filer.
         
### Misslyckade begäran{#failed-requests} 
*    **Ovanlig aktivitet: &gt;25% av förfrågningarna misslyckades**   
Som en del av varje reloadDatasets, som vanligtvis är var 15: e minut, ERDDAP™ tittar på andelen förfrågningar som misslyckats sedan de senaste reloadDatasets. Om det är &gt;25%, ERDDAP™ Skickar ett e-postmeddelande till ERDDAP™ administratör med ämnet "Ovanlig aktivitet: &gt;25% av förfrågningarna misslyckades". Det e-postmeddelandet innehåller en tal nära botten med titeln "Requesters IP-adress (Misslyckades)   (Senaste Major LoadDatasets) ". Sök efter det. Det berättar IP-adressen för datorerna som gör de mest misslyckade förfrågningarna. Du kan sedan söka efter dessa IP-adresser i \\[ bigParentDirectory \\] /loggar/ [Log.txt](#log) fil och se vilken typ av förfrågningar de gör.
    
Du kan använda användarens IP-nummer (till exempel med [https://whatismyipaddress.com/ip-lookup](https://whatismyipaddress.com/ip-lookup) ) För att försöka lista ut vem eller vad användaren är. Ibland kommer det att berätta ganska exakt vem användaren är (e.g., det är en sökmotors webbcrawler) . För det mesta ger det bara dig en ledtråd (Det är en amazonaws-dator, det är från ett universitet, det är någon i en viss stad.) .
    
Genom att titta på den faktiska begäran, IP-numret och felmeddelandet (Allt från [Log.txt](#log) ) För en serie fel kan du vanligtvis räkna ut i princip vad som går fel. Enligt min erfarenhet finns det fyra vanliga orsaker till många misslyckade förfrågningar:
    
1) Förfrågningarna är skadliga (t.ex. letar efter säkerhetssvagheter, eller gör förfrågningar och sedan avbryter dem innan de är färdiga.) . Du bör använda&lt;requestBlacklist &gt; in i datasets.xml svartlista dessa IP-adresser.
    
2) En sökmotor försöker naivt de webbadresser som anges i ERDDAP™ webbsidor och ISO 19115 dokument. Det finns till exempel många platser som listar basen OPeNDAP URL, till exempel,https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSSTtill vilken användaren ska lägga till en filtyp (t.ex. .das, .dds, .html) . Men sökmotorn vet inte detta. Och begäran till bas URL misslyckas. En relaterad situation är när sökmotorn genererar bisarra förfrågningar eller försöker fylla i formulär för att komma till "dolda" webbsidor. Men sökmotorerna gör ofta ett dåligt jobb av detta, vilket leder till misslyckanden. Lösningen är: skapa en [robots.txt](#robotstxt) fil.
    
Vissa användare kör ett manus som upprepade gånger ber om något som inte finns. Kanske är det en dataset som brukade existera, men är borta nu (tillfälligt eller permanent) . Skript förväntar sig ofta inte detta och hanterar det inte intelligent. Så skriptet håller bara att göra förfrågningar och förfrågningarna fortsätter att misslyckas. Om du kan gissa vem användaren är (från IP-numret ovan) Kontakta dem och berätta för dem att datamängden inte längre är tillgänglig och be dem att ändra sitt manus.
    
4) Något är riktigt fel med vissa dataset. Vanligtvis, ERDDAP™ kommer att göra de oroliga dataset inaktiva. Ibland gör det inte, så alla förfrågningar till det leder bara till fel. Om så är fallet, åtgärda problemet med datamängden eller (om du inte kan) ange dataset för att [aktiv="falsk"](/docs/server-admin/datasets#active) . Detta kan naturligtvis leda till problem #2.
    
Ibland är felen inte så dåliga, särskilt om ERDDAP™ kan upptäcka felet och reagera mycket snabbt (&lt;=1ms). Så du kan besluta att inte vidta någon åtgärd.
    
Om allt annat misslyckas finns det en universell lösning: lägg till användarens IP-nummer till&lt;FörfråganBlacklist] (/docs/server-admin/datasets#requestblacklist) . Detta är inte så dåligt eller så drastiskt ett alternativ som det kan verka. Användaren kommer då att få ett felmeddelande som säger s / han har svartlistats och berätta för dem din (och ERDDAP™ Administratörens) e-postadress. Ibland kontaktar användaren dig och du kan lösa problemet. Ibland kontaktar användaren inte dig och du kommer att se samma beteende som kommer från ett annat IP-nummer nästa dag. Blacklist det nya IP-numret och hoppas att de så småningom kommer att få meddelandet. (Detta är din Groundhog Day, från vilken du aldrig kommer att fly. Förlåt.) 
    
### robots.txt{#robotstxt} 
Sökmotorföretag använder webbcrawlers (Till exempel Google Bot) att undersöka alla sidor på webben för att lägga till innehållet i sökmotorerna. För ERDDAP™ Det är i grunden bra. ERDDAP™ har massor av länkar mellan sidor, så krypskyttarna hittar alla webbsidor och lägger till dem i sökmotorerna. Sedan kommer användare av sökmotorerna att kunna hitta datamängder på din ERDDAP .
    
Tyvärr, vissa web crawlers (Till exempel Google Bot) nu fylla i och skicka in formulär för att hitta ytterligare innehåll. För web commerce webbplatser är detta bra. Men detta är fruktansvärt för ERDDAP™ eftersom det bara leder till en **Infinite** antal oönskade och meningslösa försök att krypa de faktiska uppgifterna. Detta kan leda till fler förfrågningar om data än från alla andra användare tillsammans. Och det fyller sökmotorn med goofy, meningslösa delmängder av de faktiska data.
    
För att berätta för webbkrypare att sluta fylla i formulär och bara i allmänhet inte titta på webbsidor som de inte behöver titta på, måste du skapa en textfil som heter. [robots.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard) i rotkatalogen på din webbplats dokumenthierarki så att den kan ses av någon som, t.ex.http://*www.your.domain*/robots.txt.
Om du skapar en ny robot. txt fil, detta är en bra start:
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
     (Men ersätta *your.institutions.url* med din ERDDAP bas URL.)   
Det kan ta några dagar för sökmotorerna att märka och för ändringarna att träda i kraft.
     
### Sitemap.xml{#sitemapxml} 
Som den [https://www.sitemaps.org](https://www.sitemaps.org/) Webbplatsen säger:

> Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. In its simplest form, a Sitemap is an XML file that lists URLs for a site along with additional metadata about each URL (when it was last updated, how often it usually changes, and how important it is, relative to other URLs on the site) so that search engines can more intelligently crawl the site.
> 
> Web crawlers usually discover pages from links within the site and from other sites. Sitemaps supplement this data to allow crawlers that support Sitemaps to pick up all URLs in the Sitemap and learn about those URLs using the associated metadata. Using the Sitemap protocol does not guarantee that web pages are included in search engines, but provides hints for web crawlers to do a better job of crawling your site.

Egentligen, sedan ERDDAP™ är att RESTful , sökmotor spindlar kan enkelt krypa din ERDDAP . Men de tenderar att göra det oftare (dagligen&#33;) än nödvändigt (månadsvis?) .

* Med tanke på att varje sökmotor kan krypa hela ERDDAP™ Varje dag kan detta leda till många onödiga förfrågningar.
* Så ERDDAP™ genererar en sitemap.xml-fil för din ERDDAP™ som berättar sökmotorer att din ERDDAP™ behöver bara krypas varje månad.
* Du bör lägga till en referens till ERDDAP Sitemap.xml till din [robots.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard) Fil:
Sitemap:http://**www.yoursite.org**/erddap/sitemap.xml
* Om det inte verkar få meddelandet till krypskyttarna kan du berätta för de olika sökmotorerna om sitemap.xml-filen genom att besöka dessa webbadresser (men förändring **Din institution** din institutions akronym eller förkortning och **www.yoursite.org** till din ERDDAP URL) Från:
    *   https://www.bing.com/webmaster/ping.aspx?siteMap=http://**www.yoursite.org**/erddap/sitemap.xml
    *   https://www.google.com/ping?sitemap=http://**www.yoursite.org**/erddap/sitemap.xml(IDu behöver bara pinga varje sökmotor en gång, för alltid. Sökmotorerna kommer sedan att upptäcka ändringar i sitemap.xml periodiskt.
     
### Datadissemination / Datadistribution Nätverk: Push och Pull Teknikteknik{#data-dissemination--data-distribution-networks-push-and-pull-technology} 
* Normalt, ERDDAP™ fungerar som en mellanhand: det tar en begäran från en användare; får data från en fjärrdatakälla; reformerar data; och skickar den till användaren.
*    [ Pull Teknikteknik](https://en.wikipedia.org/wiki/Pull_technology) Från: ERDDAP™ har också möjlighet att aktivt få alla tillgängliga data från en fjärrdatakälla och [lagra en lokal kopia av data](/docs/server-admin/datasets#eddgridcopy) .
*    [ Push Teknikteknik](https://en.wikipedia.org/wiki/Push_technology) Från: Genom att använda ERDDAP "S [Prenumerationstjänster](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions) Andra dataservrar kan meddelas så snart nya data finns tillgängliga så att de kan begära data (genom att dra data) .
*    ERDDAP "S [ EDDGrid FrånErddap](/docs/server-admin/datasets#eddfromerddap) och [EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap) Användning ERDDAP abonnemangstjänster och [Flagga system](#flag) så att det meddelas omedelbart när nya uppgifter finns tillgängliga.
* Du kan kombinera dessa till stor effekt: om du slår en EDDGrid Kopiera runt en EDDGrid FrånErddap dataset (eller wrap en EDDTableCopy runt en EDDTableFromErddap dataset) , ERDDAP™ Skapa och upprätthålla en lokal kopia av en annan ERDDAP "s dataset.
* Eftersom abonnemangstjänsterna fungerar så snart nya data finns tillgängliga, sprider trycktekniken data mycket snabbt. (inom några sekunder) .

Denna arkitektur sätter varje ERDDAP™ administratör som ansvarar för att bestämma var uppgifterna för hans/hennes ERDDAP™ kommer från.

* Andra ERDDAP™ administratörer kan göra detsamma. Det finns inget behov av samordning mellan administratörer.
* Om många ERDDAP™ administratörer länkar till varandras ERDDAP ett datadistributionsnät bildas.
* Data kommer snabbt, effektivt och automatiskt att spridas från datakällor ( ERDDAP och andra servrar) till data omfördelningswebbplatser ( ERDDAP s) någonstans i nätverket.
* En given ERDDAP™ kan vara både en datakälla för vissa datamängder och en omfördelningswebbplats för andra datamängder.
* Det resulterande nätverket liknar ungefär datadistributionsnätverk som inrättats med program som [ Unidata IDD/IDM](https://www.unidata.ucar.edu/projects/index.html#idd) Men mindre styvt strukturerad.
         
### Säkerhet, autentisering och auktorisation{#security-authentication-and-authorization} 
Som standard, ERDDAP™ körs som en helt offentlig server (Använda http och/eller https ) utan inloggning ( [Autentisering](https://en.wikipedia.org/wiki/Authentication) ) system och inga begränsningar för dataåtkomst ( [Tillstånd](https://en.wikipedia.org/wiki/Authorization) ) .

#### Säkerhet{#security} 
Om du vill begränsa åtkomsten till vissa eller alla datamängder till vissa användare kan du använda ERDDAP Inbyggda säkerhetssystem. När säkerhetssystemet används:

*    ERDDAP™ Användning [rollbaserad åtkomstkontroll](https://en.wikipedia.org/wiki/Role-based_access_control) .
    * och ERDDAP™ administratören definierar användare med [&lt;Användare&gt;] (/docs/server-admin/datasets#user) tagga in datasets.xml . Varje användare har ett användarnamn, ett lösenord (om autentisering = anpassad) och en eller flera roller.
    * och ERDDAP™ administratören definierar vilka roller som har tillgång till en viss dataset via [&lt;tillgänglig för&gt;] (/docs/server-admin/datasets#accessibleto) tagga in datasets.xml för alla datamängder som inte bör ha offentlig tillgång.
* användarens inloggningsstatus (och en länk för att logga in/out) visas högst upp på varje webbsida. (Men en inloggad användare verkar ERDDAP™ inte vara inloggad om han använder en http URL.) 
* Om&lt;baseUrl&gt; som du anger i din setup.xml är en ** http ** URL, användare som inte är inloggade kan använda ERDDAP "S ** http ** URL:er. Om&lt;baseHttpsUrl&gt; anges också, användare som inte är inloggade kan också använda https URL:er.
* HTTPS Endast - Om&lt;baseUrl&gt; som du anger i din setup.xml är en ** https ** URL, användare som inte är inloggade uppmuntras (Inte tvingad) att använda ERDDAP "S ** https ** URL - alla länkar på ERDDAP™ webbsidor kommer att hänvisa till https URL:er.
    
Om du vill tvinga användare att använda https URL, lägg till en omdirigerad permanent linje inuti&lt;VirtualHost \\*:80&gt; sektion i din Apache konfigfil (vanligen vanligen vanligen vanligtvis http d.conf) t.ex.,
    
```
    <VirtualHost \\*:80>
        \\[...\\]
        ServerName example.com
        Redirect permanent / https://example.com/
    </VirtualHost>
```

Om du vill finns det en extra metod för att tvinga användningen av https:   [HTTP Strict Transport Security (HSTS) ](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security) . För att använda den:
    
    1. Apache Headers Module: a2enmod headers
    2. Lägg till den extra rubriken till HTTPS VirtualHost-direktivet. Max-ålder mäts på några sekunder och kan ställas in på något långt värde.
        
```
        <VirtualHost \\*:443>
            # Guarantee HTTPS for 1 Year including Sub Domains 
            Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
    
Observera att denna rubrik endast är giltig på en HTTPS VirtualHost.
    
En anledning att inte tvinga användare att använda https URL: Den underliggande SSL / TLS-länken tar tid att etablera och tar sedan tid att kryptera och dekryptera all information som överförs mellan användaren och servern. Men vissa institutioner kräver https Bara.
    
* Användare som är inloggade i MÅSTE använda ERDDAP "S ** https ** URL:er. Om de använder http URL:er, de verkar ERDDAP™ att inte vara inloggad. Detta säkerställer kommunikationens integritet och hjälper till att förhindra [session kapning och sidejacking](https://en.wikipedia.org/wiki/Session_hijacking) .
* Den som inte är inloggad kan komma åt och använda de offentliga datamängderna. Som standard visas privata datamängder inte i listor över datamängder om en användare inte är inloggad. Om administratören har setup.xml's&lt;listPrivateDatasets&gt; till sant, de kommer att visas. Försök att begära data från privata datamängder (Om användaren känner till URL) omdirigeras till inloggningssidan.
* Den som är inloggad kommer att kunna se och begära data från alla offentliga datamängder och eventuella privata datamängder som deras roll tillåter dem att komma åt. Som standard visas privata datamängder som en användare inte har tillgång till i listor över datamängder. Om administratören har setup.xml's&lt;listPrivateDatasets&gt; till sant, de kommer att visas. Försök att begära data från privata datamängder som användaren inte har tillgång till omdirigeras till inloggningssidan.
* och RSS Information för fullständiga privata datamängder är endast tillgänglig för användare (och RSS läsare) som är inloggade och bemyndigade att använda denna dataset. Detta gör RSS Inte särskilt användbart för helt privata datamängder.
    
Om en datamängd är privat, men dess&lt;graferAccessibleTo&gt;] (/docs/server-admin/datasets#graphsaccessibleto) är inställd på allmänheten, datasetets RSS är tillgänglig för alla.
    
* E-postabonnemang kan endast ställas in när en användare har tillgång till en dataset. Om en användare prenumererar på en privat dataset fortsätter prenumerationen att fungera efter att användaren har loggat ut.

##### Setup Security{#setup-security} 
För att inrätta säkerhets-/autentiserings-/auktoriseringssystem:

* Gör standarden ERDDAP™   [initial setup](/docs/server-admin/deploy-install) .
* Inom [setup.xml](/docs/server-admin/deploy-install#setupxml) ,
    * Add/change the&lt;Autentiska &gt; värde från ingenting till anpassat (Använd inte detta) , e-post (Använd inte detta) Google (rekommenderas) Orcid (rekommenderas) eller oauth2 (som är google+orcid, rekommenderad) . Se kommentarerna om dessa alternativ nedan.
    * Add/change the&lt;BasHttpsUrl&gt; värde.
    * Infoga/uncomment &loginInfo; in i&lt;StartBodyHtml&gt; för att visa användarens logga in/out info högst upp på varje webbsida.
* För teständamål på din dator, [Följ dessa instruktioner för att konfigurera tomcat för att stödja SSL](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html)   (Grunden för https anslutningar) genom att skapa en keystore med en [Självsignerat certifikat](https://en.wikipedia.org/wiki/Self-signed_certificate) och genom att ändra *Tomcat* /conf/server.xml för att kommentera kontakten för port 8443. På Windows kan du behöva flytta .keystore från "c:\\Users\\ *Du du* Keystore till "c:\\Users\\Default User\\.keystore" eller "c:\\.keystore" (se *Tomcat* /loggar/catalina. *idag idag idag* .log om programmet inte laddas eller användare inte kan se loggen på sidan) . Du kan se när .keystore-certifikatet löper ut genom att undersöka certifikatet när du loggar in.
    
För en allmänt tillgänglig server, i stället för att använda ett självsignerat certifikat, rekommenderas det starkt att du köper och installerar ett certifikat signerat av en [Intygsmyndighet](https://en.wikipedia.org/wiki/Certificate_authority) eftersom det ger dina kunder mer säkerhet att de verkligen ansluter till din ERDDAP™ inte en man-in-the-middle version av din ERDDAP . Många leverantörer säljer digitala certifikat. (Sök efter webb.) De är inte dyra.
    
* På Linux-datorer, om Tomcat körs i Apache, ändra /etc/ http d/conf.d/ssl.conf-fil för att tillåta HTTPS-trafik till/från ERDDAP™ utan att kräva:8443 portnummer i URL:
    1. Ändra befintliga&lt;VirtualHost&gt; taggen (Om det finns en) , eller lägga till en i slutet av filen så att den åtminstone har dessa rader:
```
        <VirtualHost \\_default\\_:443>
            SSLEngine on
            SSLProxyEngine On
            ProxyPass /erddap http://localhost:8443/erddap
            ProxyPassReverse /erddap http://localhost:8443/erddap
        </VirtualHost>
```

    2. Starta sedan om Apache: /usr/sbin/apachectl K graciös (Men ibland är det i en annan katalog) .
* Inom *Tomcat* /conf/server.xml, uncomment the port=8443&lt;Connector &gt; tag:
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
och ändra platsen för certifikatetKeystoreFile.
##### Tillstånd{#authorization} 
*    [Inom datasets.xml Skapa en](#authorization) [Och [Gud]&lt;Användare&gt;] (/docs/server-admin/datasets#user) tagga för varje användare med användarnamn, lösenord (om auktorisation = anpassad) och rollinformation. Detta är tillståndsdelen av ERDDAP säkerhetssystemet.
     
* Inom datasets.xml Lägg till en [&lt;tillgänglig för&gt;] (/docs/server-admin/datasets#accessibleto) tagga till varje dataset som inte bör ha allmänhetens tillgång.&lt;AccessTo&gt; låter dig ange vilka roller som har tillgång till den datamängden.
     
* Restart Tomcat. Problem? Kontrollera Tomcat loggar.
     
* Skicka ditt jobb&#33; Alla misstag kan leda till en säkerhetsfel.
     
* Kontrollera att inloggningssidan använder https   (Inte inte http ) . Försök att logga in via http ska automatiskt omdirigeras till https och port 8443 (Även om portnumret kan döljas via en Apache proxy) . Du kan behöva arbeta med din nätverksadministratör för att tillåta externa webbförfrågningar att komma åt port 8443 på din server.
     
* Du kan ändra&lt;användaren&gt; och&lt;tillgängliga&gt; taggar när som helst. Ändringarna kommer att tillämpas vid nästa regelbundna omlastning av alla datamängder eller ASAP om du använder en [flagga](#flag) .

##### Autentisering{#authentication} 
 [ **Autentisering (Logging in) ** ](#authentication)   
Om du inte vill låta användare logga in, ange inte ett värde för&lt;autentisering &gt; i setup.xml.
Om du vill låta användare logga in måste du ange ett värde för&lt;autentisering&gt;. För närvarande, ERDDAP™ stöd
 [anpassade](#custom)   (Använd inte detta) ,
 [e-post e-post e-post e-post e-post e-post e-post](#email)   (Använd inte detta) ,
 [Google](#google)   (rekommenderas) ,
 [Orcid](#orcid)   (rekommenderas) och
 [oauth2](#oauth2)   (rekommenderas) för autentiseringsmetoden.
Om du vill aktivera inloggning rekommenderar vi starkt google, orcid eller oauth2-alternativ eftersom de frigör dig från att lagra och hantera användarens lösenord. (behövs för anpassad) och är säkrare än e-postalternativet. Kom ihåg att användare ofta använder samma lösenord på olika webbplatser. Så de kan använda samma lösenord för ditt ERDDAP™ som de gör på sin bank. Det gör sitt lösenord mycket värdefullt - mycket mer värdefullt för användaren än bara de data de begär. Så du måste göra så mycket som möjligt för att hålla lösenorden privata. Det är ett stort ansvar. E-post, google, orcid och oauth2 alternativ tar hand om lösenord, så du behöver inte samla, lagra eller arbeta med dem. Så du befrias från det ansvaret.

Allt allt&lt;autentisering &gt; alternativ använder en [cookie](https://en.wikipedia.org/wiki/HTTP_cookie) på användarens dator, så användarens webbläsare måste ställas in för att tillåta cookies. Om en användare gör ERDDAP™ Förfrågningar från ett datorprogram (Inte en webbläsare) Cookies och autentisering är svåra att arbeta med. Det är ett vanligt problem med alla autentiseringssystem. Förlåt.

detaljerna i detaljerna&lt;autentisering &gt; alternativ är:

###### Anpassad{#custom} 
anpassad är ERDDAP "S anpassade system för att låta användare logga in genom att ange sitt användarnamn och lösenord i ett formulär på en webbsida. Om en användare försöker och inte loggar in 3 gånger inom 10 minuter, är användaren blockerad från att försöka logga in i 10 minuter. Detta hindrar hackare från att helt enkelt försöka miljontals lösenord tills de hittar rätt.

Detta är något säkert eftersom användarnamn och lösenord överförs via https   (Inte inte http ) , men autentisering = Google, orcid eller oauth2 är bättre eftersom de frigör dig från att behöva hantera lösenord. Det anpassade tillvägagångssättet kräver att du samlar in en användares namn och en hash smälter av sitt lösenord (Använd din telefon&#33; E-post är inte säker&#33;) och lagra dem i datasets.xml och [i]&lt;Användare&gt;] (/docs/server-admin/datasets#user) taggar.

Med det anpassade alternativet kan ingen logga in tills du (och ERDDAP™ Administratör) skapa en&lt;användaren&gt; tagga för användaren, ange användarens namn som användarnamn, hash smälter av sitt lösenord som lösenord och deras roller.

Inte rekommenderat
På grund av besväret att generera och överföra hash smälta av användarens lösenord och på grund av riskerna i samband med ERDDAP™ hålla hash smälter av lösenorden, detta alternativ rekommenderas inte.

För att öka säkerheten för detta alternativ:

* Du måste se till att andra användare på servern (Linux-användare, inte ERDDAP™ användare) Kan inte läsa filer i Tomcat-katalogen (särskilt datasets.xml Fil&#33;) eller ERDDAP BigParentDirectory.
På Linux, som användar=tomcat, använd:
chmod -R g-rwx *bigParentDirectory*   
chmod -R o-rwx *bigParentDirectory*   
chmod -R g-rwx *tomcatDirectory*   
chmod -R o-rwx *tomcatDirectory*   
     
* Använd UEPSHA256 för&lt;passwordEncoding &gt; i setup.xml.
     
* Använd en as-secure-as-posible metod för att passera hash smälta av användarens lösenord från användaren till användaren ERDDAP™ Administratör (Telefon?) .
         
###### e-post e-post e-post e-post e-post e-post e-post{#email} 
Alternativet e-postautentisering använder en användares e-postkonto för att autentisera användaren (genom att skicka ett e-postmeddelande med en särskild länk som de måste komma åt för att logga in) . Till skillnad från andra e-postmeddelanden som ERDDAP™ Skickar, ERDDAP™ Skriv inte dessa inbjudningsmail till e-postloggfilen eftersom de innehåller konfidentiell information.
I teorin är detta inte särskilt säkert, eftersom e-post inte alltid krypteras, så en dålig kille med förmågan att avlyssna e-post kan missbruka detta system genom att använda en giltig användares e-postadress och avlyssna inbjudan e-post.
I praktiken, om du ställer in ERDDAP™ att använda ett Google-e-postkonto för att skicka e-postmeddelanden, och om du ställer in det för att använda en av TLS-alternativen för anslutningen, och om användaren har ett Google-e-postkonto, är detta något säkert eftersom e-postmeddelandena krypteras hela vägen från ERDDAP™ till användaren.

För att öka säkerheten för detta alternativ:

* Se till att andra användare på servern (Linux-användare, inte ERDDAP™ användare) kan inte läsa filer i Tomcat-katalogen eller ERDDAP BigParentDirectory.
På Linux, som användar=tomcat, använd:
chmod -R g-rwx *bigParentDirectory*   
chmod -R o-rwx *bigParentDirectory*   
chmod -R g-rwx *tomcatDirectory*   
chmod -R o-rwx *tomcatDirectory*   
     
* Ställ in saker för att få slut på säkerheten för de e-postmeddelanden som skickas från ERDDAP™ till användarna. Du kan till exempel göra ett Google-centrerat system genom att bara skapa ett&lt;användare&gt; taggar för Google-hanterade e-postadresser och genom att ställa in din ERDDAP™ för att använda en Google e-postserver via en säker / TLS-anslutning: i din setup.xml, använd t.ex.
```
    <emailSmtpHost>smtp.gmail.com</emailSmtpHost>  
    <emailSmtpPort>587</emailSmtpPort>  
    <emailProperties>mail.smtp.starttls.enable|true</emailProperties>
```

Inte rekommenderat
Alternativet e-postautentisering rekommenderas inte. Använd google, orcid eller oauth2 alternativet istället.

Som med google, orcid och oauth2 alternativ, e-post är mycket bekvämt för ERDDAP™ administratörer - du behöver aldrig hantera lösenord eller deras hash smälter. Allt du behöver för att skapa är en&lt;Användare&gt;] (/docs/server-admin/datasets#user) tag för en användare i datasets.xml är användarens e-postadress, som ERDDAP™ Används som användarens namn. (Lösenordsattributet används inte när autentisering = e-post, google, orcid eller oauth2.) 

Med e-postalternativet, bara användare som har en&lt;Användare&gt; tagga in datasets.xml kan försöka logga in på ERDDAP™ genom att tillhandahålla sin e-postadress och klicka på länken i e-postmeddelandet som ERDDAP™ Skickar dem.

 ERDDAP™ behandlar e-postadresser som case-insensitive. Det gör detta genom att konvertera e-postadresser du anger (i&lt;användare&gt; taggar) eller användare anger (på inloggningsformuläret) till deras all lowcase version.

För att ställa in autentisering = e-post:

1. I din setup.xml, ändra&lt;baseHttpsUrl&gt; tags värde.
För att experimentera/arbeta på din dator, använd
    https://localhost:8443  
För din publik ERDDAP™ Använd
    https://*your.domain.org*:8443  
eller utan 8443 om du använder en apache [Proxypass](/docs/server-admin/deploy-install#proxypass) så att portnumret inte behövs.
     
2. I din setup.xml, ändra&lt;autentisering &gt; tags värde till e-post:
```
    <authentication>email</authentication>  
```

3. I din setup.xml, se till att e-postsystemet är inställt via alla&lt;e-post ...&gt; taggar, så att ERDDAP™ kan skicka ut e-postmeddelanden. Om möjligt, ställa in detta för att använda en säker anslutning (SSL / TLS) till e-postservern.
     
4. I din datasets.xml och skapa [en]&lt;Användare&gt;] (/docs/server-admin/datasets#user) taggar för varje användare som har tillgång till privata datamängder.
Använd användarens e-postadress som användarnamnet i taggen.
Ange inte lösenordsattributet i användartaggen.
     
5. Restart ERDDAP™ så att ändringarna i setup.xml och datasets.xml Ta effekt.
         
###### Google, orcid, oauth2{#google-orcid-oauth2} 
*    [ **Google** ](#google) , [ **Orcid** ](#orcid) och [ **oauth2** ](#oauth2)    (rekommenderas)   
Alla tre av dessa alternativ är de rekommenderade ERDDAP™ Autentiseringsalternativ. De är alla de säkraste alternativen. De andra alternativen har betydligt svagare säkerhet.
     
###### Google Google Google Google{#google} 
* Alternativet google autentisering använder [Tecken med Google](https://developers.google.com/identity/gsi/web/guides/overview) , vilket är ett genomförande av [OAuth 2.0 autentiseringsprotokoll](https://oauth.net/2/) . ERDDAP™ användare loggar in på sitt Google-e-postkonto, inklusive Google-hanterade konton som @noaa.gov konton. Detta tillåter ERDDAP™ verifiera användarens identitet (namn och e-postadress) och tillgång till deras profilbild, men ger inte ERDDAP™ tillgång till deras e-postmeddelanden, deras Google Drive eller annan privat information.
    
För ERDDAP™ v2.22 och nedan, ERDDAP™ Använd "Google Sign-In". Google säger att systemet avskrivs efter 31 mars 2023. Om du inte redan har gjort det, vänligen byt till ERDDAP™ v2.23+ för att använda det nya ”Sign In with Google”-baserade autentiseringssystemet.
    
För ERDDAP™ v2.23 instanser med en Content-Security-Policy konfigurerad och med hjälp av Google Authentication, måste du lägga tillhttps://accounts.google.comtill listan över tillåtna script-src (eller script-src-elem) . ERDDAP™ inte längre använderhttps://apis.google.comSå om du har det tillåtet kan du kanske ta bort det nu.
    
För ERDDAP™ v2.24+ Du kan också behöva lägga tillhttps://accounts.google.com/gsi/styleatt stlye-src ochhttps://accounts.google.com/gsi/att ansluta-src. För script-src kan du nu användahttps://accounts.google.com/gsi/client.
    
För mer information kan du gå till [Google page](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy) CSP konfiguration. Om du har några frågor, kontakta chris.john på noaa.gov.
         
###### Orcid{#orcid} 
* Orcid autentiseringsalternativet använder [Orcid autentisering](https://members.orcid.org/api/integrate/orcid-sign-in) , vilket är ett genomförande av [OAuth 2.0 autentiseringsprotokoll](https://oauth.net/2/) . ERDDAP™ användare loggar in i deras [Orcid konto](https://members.orcid.org/api/integrate/orcid-sign-in) , som ofta används av forskare för att identifiera sig. Detta tillåter ERDDAP™ verifiera användarens Orcid-identitet och få sitt Orcid-kontonummer, men ger inte ERDDAP™ tillgång till deras andra Orcid-kontoinformation.

###### Oauth2{#oauth2} 
* Alternativet oauth2 låter användare logga in med antingen deras Google-konto eller deras Orcid-konto.

Google, orcid och oauth2 alternativ är efterföljarna till det öppna alternativet, som avbröts efter ERDDAP™ version 1.68 och som var baserad på en version av öppen version ID som nu är out-of-date. Vänligen växla till google, orcid eller oauth2 alternativet.

Dessa alternativ är mycket bekväma för ERDDAP™ administratörer - du behöver aldrig hantera lösenord eller deras hash smälter. Allt du behöver för att skapa är en&lt;Användare&gt;] (/docs/server-admin/datasets#user) tag för en användare i datasets.xml som anger användarens Google-e-postadress eller Orcid-kontonummer som användarnamnsattribut. (Lösenordsattributet används inte när autentisering = e-post, google, orcid eller oauth2.) 

Med dessa alternativ kan vem som helst logga in på ERDDAP™ genom att logga in på deras Google-e-postkonto eller Orcid-konto, men ingen kommer att ha rätt att komma åt privata datamängder tills du (och ERDDAP™ Administratör) skapa en&lt;användare&gt; tagga, ange deras Google-e-postadress eller Orcid-kontonummer som användarnamn och ange deras roller.

 ERDDAP™ behandlar e-postadresser som case-insensitive. Det gör detta genom att konvertera e-postadresser du anger (i&lt;användare&gt; taggar) eller användare anger (på inloggningsformuläret) till deras all lowcase version.

För att ställa in google, orcid eller oauth2 autentisering:

* I din setup.xml, ändra&lt;baseHttpsUrl&gt; tags värde.
För att experimentera/arbeta på din dator, använd
    https://localhost:8443  
För din publik ERDDAP™ Använd
    https://*your.domain.org*:8443  
Eller bättre, utan 8443 om du använder en Apache [Proxypass](/docs/server-admin/deploy-install#proxypass) så att portnumret inte behövs.
     
* I din setup.xml, ändra&lt;autentisering &gt; tags värde för google, orcid eller oauth2, till exempel:
```
    <authentication>oauth2</authentication>  
```
###### Google setup{#google-setup} 
* För google och oauth2 alternativ:
Följ instruktionerna nedan för att ställa in Google-autentisering för din ERDDAP .
     
    1. Om du inte har ett Google-e-postkonto, [Skapa en](https://www.google.com/intl/en_us/mail/help/about.html)   
         
    2. Följ [Dessa instruktioner](https://developers.google.com/identity/sign-in/web/devconsole-project) skapa ett Google Developers Console-projekt och få ett klient-ID.
        
När Google-formuläret begär tillstånd Java Skript ursprung, ange värdet från&lt;baseHttpsUrl&gt; från din dators ERDDAP™ setup.xml, till exempel,
        https://localhost:8443  
På en andra rad, lägg till&lt;baseHttpsUrl&gt; från din publik ERDDAP™ setup.xml, till exempel,
        https://*your.domain.org*:8443
        
Ange inte några auktoriserade omdirigerade URI:er.
        
När du ser ditt klient-ID för detta projekt, kopiera och klistra in det i din setup.xml (vanligen strax nedanför&lt;autentisering &gt; att vara ordnad, men placering spelar egentligen ingen roll), i&lt;googleClientID&gt; tag, t.ex.
        &lt;GoogleClientID &gt; *YourClientID* &lt;/googleClientID&gt;
Klient-ID kommer att vara en sträng av cirka 75 tecken, förmodligen börjar med flera siffror och slutar med .apps.googleusercontent.com .
         
        
    3. I din datasets.xml skapa en [en]&lt;Användare&gt;] (/docs/server-admin/datasets#user) tagga för varje användare som har tillgång till privata datamängder. För användarnamnet attribut i taggen:
        
        * För användare som loggar in med Google, använd användarens Google-e-postadress.
        * För användare som loggar in med orcid, använd användarens Orcid-kontonummer (Med Dashes) .
        
Ange inte lösenordsattributet för användartaggen.
         
    4. Restart ERDDAP™ så att ändringarna i setup.xml och datasets.xml Ta effekt.
         
###### Orcid setup{#orcid-setup} 
* För orcid och oauth2 alternativ:
Följ instruktionerna nedan för att ställa in Orcid autentisering för din ERDDAP .
     (För detaljer, se [Orcids autentisering API dokumentation](https://members.orcid.org/api/integrate/orcid-sign-in) .)   
     
    1. Om du inte har ett Orcid-konto, [Skapa en](https://orcid.org/signin)   
         
    2. Logga in i Orcid [https://orcid.org/signin](https://orcid.org/signin) Använd ditt personliga Orcid-konto.
         
    3. Klicka på "Developer Tools" (Under "For Researchers" på toppen) .
         
    4. Klicka på "Register för det fria ORCID offentliga API". Ange denna information:
Namn: ERDDAP™ vid \\[ Din organisation \\]   
Webbplats: \\[ Dina dina ERDDAP s domän \\]   
Beskrivning: ERDDAP™ är en vetenskaplig dataserver. Användare måste autentisera med Google eller Orcid för att komma åt icke-offentliga datamängder.
Omdirigera URI:er: \\[ Dina dina ERDDAP s domän \\] /erddap/loginOrcid.html
         
    5. Klicka på Spara ikonen (Det ser ut som en 3,5" disk&#33;) .
Du kan sedan se ditt ORCID APP Client ID och ORCID Client Secret.
         
    6. Kopiera och klistra in ORCID APP Client ID (som börjar med "APP-") i setup.xml i&lt;orcidClientID&gt; tag, t.ex.
```
        <orcidClientID>APP-*ALPHANUMERICCHARACTERS*</orcidClientID>
```
    7. Kopiera och klistra in ORCID Client Secret (sänka alfa-numeriska tecken med streck) i setup.xml i&lt;orcidClientSecret&gt; tag, t.ex.
```
        <orcidClientSecret>*alpha-numeric-characters-with-dashes*</orcidClientSecret>
```

    8. I din datasets.xml skapa en [en]&lt;Användare&gt;] (/docs/server-admin/datasets#user) tagga för varje användare som har tillgång till privata datamängder. För användarnamnet attribut i taggen:
        
        * För användare som loggar in med Google, använd användarens Google-e-postadress.
        * För användare som loggar in med orcid, använd användarens Orcid-kontonummer (Med Dashes) .
        
Ange inte lösenordsattributet för användartaggen.
         
    9. Restart ERDDAP™ så att ändringarna i setup.xml och datasets.xml Ta effekt.
             

###### Logga in Hursomhelst{#log-in-either-way} 
Om du använder Google, orcid eller oauth2-autentiseringsalternativ och Google Sign-In eller Orcids Authentication API upphör plötsligt att fungera. (oavsett anledning) eller upphör att fungera som ERDDAP™ Förväntningar, användare kommer inte att kunna logga in på din ERDDAP . Som tillfällig (eller permanent) Lösning, du kan be användare att registrera dig med det andra systemet (få ett Google-e-postkonto eller få ett Orcid-konto) . För att göra detta:

1. Ändra förändringen&lt;autentisering&gt; tag så att den tillåter det andra autentiseringssystemet. Alternativet oauth2 tillåter användare att logga in med antingen system.
2. Duplicera var och en av&lt;användare&gt; taggar och ändra användarnamnsattributet från Googles e-postadress till motsvarande Orcid-kontonummer (eller vice versa) Men håll rollerna attribut samma.

###### OpenId{#openid} 
 ERDDAP™ inte längre stöder alternativet öppen autentisering, som var baserat på en version av öppen ID som nu är out-of-date. Använd google, orcid eller oauth2 alternativ istället.

###### BASIC{#basic} 
 ERDDAP™ Stöder inte BASIC-autentisering eftersom:
* BASIC verkar inriktad mot fördefinierade webbsidor som behöver säker åtkomst eller filt på/av åtkomst till hela webbplatsen, men ERDDAP™ tillåter tillåter tillåter tillåter (begränsad tillgång) datamängder som ska läggas på flygningen.
* BASIC-autentisering erbjuder inte ett sätt för användare att logga ut&#33;
* BASIC-autentisering är känd för att inte vara säker.

##### Säkra datakällor{#secure-data-sources} 
Om en datauppsättning ska ha begränsad tillgång till ERDDAP™ användare, datakällan (Därifrån ERDDAP™ Får data) bör inte vara offentligt tillgänglig. Så hur kan ERDDAP™ Få data för begränsade åtkomstdataset? Vissa alternativ är:

*    ERDDAP™ kan tjäna data från lokala filer (Till exempel via EDDTable FrånFiles eller EDDGrid FrånFiles) .
     
*    ERDDAP™ Kan vara i en [DMZ](https://en.wikipedia.org/wiki/Demilitarized_zone_(computing) ) och datakällan (t.ex. en OPeNDAP Server eller en databas) kan vara bakom en [Brandvägg](https://en.wikipedia.org/wiki/Firewall) där den är tillgänglig för ERDDAP™ Men inte för allmänheten.
     
* Datakällan kan vara på en offentlig webbplats, men kräver en inloggning för att få data. De två typerna av dataset som ERDDAP™ kan logga in på access [EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase) och [EDDTableFromCassandra](/docs/server-admin/datasets#eddtablefromcassandra) . Dessa dataset stöder (och bör alltid använda) Användarnamn (skapa en ERDDAP™ Användare som bara har lätta privilegier) lösenord, SSL-anslutningar och andra säkerhetsåtgärder.
    
Men i allmänhet, för närvarande, ERDDAP™ kan inte hantera dessa datakällor eftersom det inte har några bestämmelser för att logga in på datakällan. Detta är anledningen till tillgång till [ EDDGrid FromErddap och EDDTable FrånErddap](/docs/server-admin/datasets#eddfromerddap) Dataset kan inte begränsas. För närvarande lokal ERDDAP™ har inget sätt att logga in och komma åt metadatainformationen från fjärrkontrollen ERDDAP . Och sätta "fjärrkontrollen" ERDDAP™ bakom din brandvägg och ta bort datamängdens tillgängliga För restriktioner löser inte problemet: eftersom användaren begär EDDXxx FrånErddap-data måste omdirigeras till fjärrkontrollen ERDDAP™ Fjärrkontrollen ERDDAP™ måste vara tillgänglig.
    
#### Försvar mot hackare{#defenses-against-hackers} 
Det finns dåliga kille hackare som försöker utnyttja säkerhetssvagheter i serverprogram som ERDDAP . ERDDAP™ följer den gemensamma säkerhetsrådgivningen för att ha flera lager av försvar:

* Begränsade privilegier - Ett av de viktigaste försvaren är att köra Tomcat via en användare som kallas tomcat som inte har ett lösenord (Ingen kan logga in som den användaren) och har begränsade filsystem privilegier (t.ex. läs-bara tillgång till data) . Se ERDDAP instruktioner för [Inrätta tomcat](/docs/server-admin/deploy-install#tomcat) .
* Tung användning - I allmänhet, ERDDAP™ är byggd för tung användning, bland annat genom skript som gör tiotusentals förfrågningar, en efter en. Det är svårt för ERDDAP™ samtidigt öppna sig för tung legitim användning och skydda sig från missbruk. Det är ibland svårt att skilja tung legitim användning, överdriven legitim användning och olaglig användning. (och ibland är det verkligen lätt) . Bland annat försvar, ERDDAP™ Medvetet tillåter inte en enda begäran att använda en oordnad bråkdel av systemets resurser. (om inte systemet annars inte är aktivt) .
* Identifiera besvärliga användare - Om ERDDAP™ saktar ner eller fryser (Kanske för att en naiv användare eller en bot kör flera skript för att skicka flera förfrågningar samtidigt eller kanske på grund av en dålig kille [Denial-of-service](https://en.wikipedia.org/wiki/Denial-of-service_attack) attack) Du kan titta på [Daglig rapport e-post](#daily-report)   (och mer frekvent identisk information i [ ERDDAP™ Log Fil](#log) ) som visar antalet förfrågningar som gjorts av de mest aktiva användarna (Se "Requesters IP-adress (Tillåten) ") . ERDDAP™ skickar också e-post till administratören när det finns [Ovanlig aktivitet: &gt;25% av förfrågningarna misslyckades](#failed-requests) . Du kan sedan titta i ERDDAP™ logga in för att se arten av deras förfrågningar. Om du känner att någon gör för många förfrågningar, bisarra förfrågningar (Du skulle inte tro vad jag har sett, ja, kanske du skulle) , eller attack-typ förfrågningar, kan du lägga till deras IP-adress till svartlistan.
* Blacklist - Du kan lägga till IP-adressen för besvärliga användare, bots och [Denial-of-service](https://en.wikipedia.org/wiki/Denial-of-service_attack) angripare till ERDDAP   [svartlista](/docs/server-admin/datasets#requestblacklist) Så att framtida förfrågningar från dem omedelbart avvisas. Denna inställning är i datasets.xml så att du snabbt kan lägga till en IP-adress i listan och sedan [flagga](#flag) en dataset så att ERDDAP™ omedelbart märker och tillämpar förändringen. Felmeddelandet som skickas till svartlistade användare uppmuntrar dem att kontakta ERDDAP™ administratör om de känner att de felaktigt har lagts på svartlistan. (Enligt vår erfarenhet har flera användare varit omedvetna om att de körde flera skript samtidigt, eller att deras skript gjorde nonsensförfrågningar.) 
* Dataset Security - vissa typer av dataset (Framför allt EDDTableFromDatabase) presentera ytterligare säkerhetsrisker (t.ex. SQL injektion) och har egna säkerhetsåtgärder. Se informationen för dessa typer av datamängder i [Arbeta med datasets.xml Fil](/docs/server-admin/datasets) , särskilt [EDDTableFromDatabase säkerhet](/docs/server-admin/datasets#database-security) .
* Säkerhetsrevision - Även om NOAA IT-säkerhet vägrade våra förfrågningar om skanningar i åratal, de skannar nu rutinmässigt mina (Bobs)   ERDDAP™ installation. Även om de första skanningarna hittade några problem som jag sedan fixade, har efterföljande skanningar inte funnit problem med. ERDDAP . Skanningarna oroar sig för många saker: särskilt eftersom tabledap Förfrågningar ser ut som SQL-förfrågningar, de oroar sig för sårbarheter i SQL. Men dessa problem är ogrundade eftersom ERDDAP™ Parses och validerar alltid frågor och bygger sedan separat SQL-frågan på ett sätt som undviker sårbarheter. Det andra de ibland klagar på är att vårt Java version eller Tomcat versioner är inte lika aktuella som de vill, så vi uppdaterar dem som svar. Jag har tidigare erbjudit mig att visa människor säkerhetsrapporterna, men jag har nu sagt att jag inte kan göra det.

#### Frågor? Förslag?{#questions-suggestions} 
Om du har några frågor om ERDDAP säkerhetssystem eller har några frågor, tvivel, oro eller förslag på hur det är inrättat, se vår [sektion om att få ytterligare stöd](/docs/intro#support) .
    

## Saker du inte behöver veta{#things-you-dont-need-to-know} 

Det här är detaljer som du inte behöver veta förrän ett behov uppstår.

### Andra ERDDAP™  {#second-erddap} 
*    **Ställa in en andra ERDDAP™ för testning/utveckling**   
Om du vill göra detta finns det två metoder:
    *    (Bästa bästa bästa) Installera Tomcat och ERDDAP™ på en annan dator än datorn som har din publik ERDDAP . Om du använder din dator:
        1. Gör installationen ett steg åt gången. Få Tomcat upp och spring först.
När Tomcat körs, bör Tomcat Manager vara på
             [http://127.0.0.1:8080/manager/html/](http://127.0.0.1:8080/manager/html/)   (eller kanske [http://localhost:8080/manager/html/](http://localhost:8080/manager/html/) ) 
        2. Installera ERDDAP .
        3. Använd inte ProxyPass för att eliminera portnumret från ERDDAP™ URL.
        4. Inom [setup.xml](/docs/server-admin/deploy-install#setupxml) Sätt basUrl tillhttp://127.0.0.1:8080
        5. När du har börjat detta ERDDAP™ Du bör kunna se den på
             [http://127.0.0.1:8080/erddap/status.html](http://127.0.0.1:8080/erddap/status.html)   (eller kanske [http://localhost:8080/erddap/status.html](http://localhost:8080/erddap/status.html) ) 
#### Andra Tomcat{#second-tomcat} 
*    (Andra bästa) Installera en annan Tomcat på samma dator som din publik ERDDAP .
    1. Gör installationen ett steg åt gången. Få Tomcat upp och spring först.
Ändra alla portnummer i samband med andra Tomcat (ändra 8080 till 8081)   (se [Multipel Tomcat Instances sektion](https://tomcat.apache.org/tomcat-8.0-doc/RUNNING.txt) halvvägs genom det dokumentet) .
    2. Installera ERDDAP™ I den nya Tomcat.
    3. Använd inte ProxyPass för att eliminera portnumret från ERDDAP™ URL.
    4. Inom [setup.xml](/docs/server-admin/deploy-install#setupxml) Sätt basUrl tillhttp://www.*yourDomainName*:8081
    5. När du har börjat detta ERDDAP™ Du bör kunna se den på
        http://www.*yourDomainName*:8081/erddap/status.html  
             
### Solid State Drives{#solid-state-drives} 
*    **Solid State Drives (SSDs) är bra&#33;**   
Det snabbaste, enklaste och billigaste sättet att snabba upp ERDDAP tillgång till tabelldata är att sätta datafilerna på en Solid State Drive (SSD) . De flesta tabelldatamängder är relativt små, så en 1 eller 2 TB SSD är förmodligen tillräcklig för att hålla alla datafiler för alla dina tabelldatamängder. SSD sliter så småningom ut om du skriver data till en cell, raderar den och skriver nya data till den cellen för många gånger. Så om du bara använder din SSD för att skriva data en gång och läsa det många gånger, även en konsument-grade SSD bör vara länge, förmodligen mycket längre än någon hård disk Drive. (HDD) . Konsumentkvalitet SSD är nu billiga (2018, ~ $ 200 för 1 TB eller ~ $ 400 för 2 TB) Och priserna faller fortfarande snabbt. När när ERDDAP™ åtkomst till en datafil, en SSD erbjuder både kortare latens (~0.1ms, jämfört med ~3ms för en HDD, jämfört med ~10 (??) ms för en RAID, jämfört med ~ 55ms för Amazon S3) och högre genomströmning (~500 MB / S, jämfört med ~ 75 MB / s för en HDD, jämfört med ~ 500 MB / s för en RAID) . Så du kan få en stor prestationsökning (Upp till 10X jämfört med en HDD) För $200&#33; Jämfört med andra möjliga ändringar i ditt system (En ny server för 10 000 dollar? En ny RAID för 35 000 dollar? En ny nätverksbrytare för 5000 dollar? etc.) Detta är den absolut bästa avkastningen på investeringar (Roi) . Om/när SSD dör (1, 2, ... 8 år) ersätta den. Lita inte på det som på lång sikt, arkiv lagring av data, bara för front-end kopia av data. \\[ SSD skulle också vara bra för ruttna data, men de flesta ruttna datamängder är mycket större, vilket gör SSD mycket dyrt. \\] 
    
Om din server inte är laddad med minnet, är ytterligare minne för din server också ett bra och relativt billigt sätt att påskynda alla aspekter av ERDDAP .
     
    
###  [Tunga laster / begränsningar](#heavy-loads--constraints)  **  {#heavy-loads--constraints} 
Med tung användning, en fristående ERDDAP™ kan begränsas av olika problem. För mer information, se [Lista över begränsningar och lösningar](/docs/server-admin/scaling#heavy-loads--constraints) .
     
### Gridar, kluster och federationer{#grids-clusters-and-federations} 
Under mycket tung användning, en enda fristående ERDDAP™ kommer att stöta på en eller flera begränsningar och även de föreslagna lösningarna kommer att vara otillräckliga. För sådana situationer, ERDDAP™ har funktioner som gör det enkelt att bygga skalbara nät (även kallade kluster eller federationer) av ERDDAP s som gör att systemet kan hantera mycket tung användning (till exempel för ett stort datacenter) . För mer information, se [nät, kluster och federationer av ERDDAP s](/docs/server-admin/scaling) .
     
### Cloud Computing{#cloud-computing} 
Flera företag börjar erbjuda [molntjänster](https://en.wikipedia.org/wiki/Cloud_computing)   (t.ex., [Amazon Web Services](https://aws.amazon.com/) ) . [Web hosting företag](https://en.wikipedia.org/wiki/Web_hosting_service) har erbjudit enklare tjänster sedan mitten av 1990-talet, men "moln" tjänster har kraftigt utökat flexibiliteten i systemen och utbudet av tjänster som erbjuds. Du kan använda dessa tjänster för att skapa en enda ERDDAP™ eller ett nät/kluster ERDDAP för att hantera mycket tung användning. För mer information, se [cloud computing med ERDDAP™ ](/docs/server-admin/scaling#cloud-computing) .

### Amazon Amazon Amazon Amazon{#amazon} 
*    ** [Amazon Web Services (AWS) EC2 Installationsöversikt](#amazon) **   
     [Amazon Web Services (AWS) ](https://aws.amazon.com/) är en [cloud computing service](https://en.wikipedia.org/wiki/Cloud_computing) Det erbjuder ett brett utbud av datorinfrastruktur som du kan hyra per timme. Du kan installera ERDDAP™ på en [Elastic Compute Cloud (EC2) ](https://aws.amazon.com/ec2/) Till exempel (deras namn på en dator som du kan hyra i timmen) . AWS har ett utmärkt [AWS användarguide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) Du kan använda Google för att hitta svar på specifika frågor du kan ha. Brace själv - det är en hel del arbete att komma igång. Men när du får en server igång kan du enkelt hyra så många ytterligare resurser (servrar, databaser, SSD-rymden etc.) som du behöver, till ett rimligt pris. \\[ Detta är inte en rekommendation eller godkännande av Amazon Web Services. Det finns andra molnleverantörer. \\] 
    
En översikt över saker du behöver göra för att få ERDDAP™ Att köra på AWS är:
    
    * I allmänhet kommer du att göra allt som beskrivs i [AWS användarguide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) .
    * Skapa ett AWS-konto.
    * Ställ in en AWS-användare på det kontot med administratörsprivilegier. Logga in som den här användaren att göra alla följande steg.
    * Elastisk blocklagring (EBS) är AWS motsvarande en hårddisk som är fäst på din server. Vissa EBS utrymme kommer att fördelas när du först skapar en EC2 instans. Det är ihållande lagring - informationen går inte förlorad när du stoppar din EC2-instans. Och om du ändrar instanstyper blir ditt EBS-utrymme automatiskt fäst vid det nya exemplet.
    * Skapa en elastisk IP-adress så att din EC2-instans har en stabil, offentlig URL (i motsats till en privat webbadress som ändras varje gång du startar om ditt instans) .
    * Skapa och starta en EC2-instans (dator) . Det finns ett brett utbud av [falltyper](https://aws.amazon.com/ec2/instance-types/) Var och en till ett annat pris. En m4.large eller m4.xlarge instans är kraftfull och är förmodligen lämplig för de flesta användningsområden, men välj vad som än uppfyller dina behov. Du kommer förmodligen vilja använda Amazons Linux som operativsystem.
    * Om din stationära / bärbara dator är en Windows-dator kan du använda [Putty](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html) En gratis SSH-klient för Windows, för att få tillgång till din EC2-instans kommandorad. Eller kanske du har något annat SSH-program som du föredrar.
    * När du loggar in i din EC2-instans loggas du in som den administrativa användaren med användarnamnet "ec2-användare". ec2-användare har sudo privilegier. Så när du behöver göra något som rotanvändaren, använd: sudo *SomeCommand* 
    * Om din stationära / bärbara dator är en Windows-dator kan du använda [FileZilla](https://stackoverflow.com/questions/16744863/connect-to-amazon-ec2-file-directory-using-filezilla-and-sftp) Ett gratis SFTP-program, för att överföra filer till/från din EC2-instans. Eller kanske du har något annat SFTP-program som du föredrar.
    *    [Installera Apache](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html) på din EC2-instans.
    * Följ standarden [ ERDDAP™ installationsanvisningar](/docs/server-admin/deploy-install) .
         
### WaitThenTryAgain Exception{#waitthentryagain-exception} 
En användare kan få ett felmeddelande som
WaitThenTryAgainException:
Det fanns en (tillfälligt?) Problem. Vänta en minut, försök igen. (I en webbläsare klickar du på knappen Reload.)   
Detaljer: GridDataAccessor.increment: partiellResultat \\[ 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 \\] ="123542730" förväntades vara "123532800".

Den allmänna förklaringen av WaitThenTryAgainException är:
När när ERDDAP™ svarar på en användarbegäran, det kan finnas ett oväntat fel med datamängden (t.ex. ett fel när du läser data från filen eller ett fel som har åtkomst till en fjärrdataset) . WaitThenTryAgain signalerar till ERDDAP™ att begäran misslyckades (hittills) men det ERDDAP™ bör försöka ladda datamängden snabbt (Det kallar [RequestReloadASAP](#requestreloadasap) ) och retry begäran. Ofta lyckas detta och användaren ser bara att svaret på begäran var långsamt. Andra gånger misslyckas reloaden eller är för långsam, eller det efterföljande försöket att hantera begäran misslyckas också och kastar en annan WaitThenTryAgain. Om det händer, ERDDAP™ markerar dataset för reloading men berättar för användaren (via en WaitThenTryAgain Exception) att det fanns ett misslyckande när man svarade på begäran.

Det är det normala beteendet. Detta system kan hantera många vanliga problem.
Men det är möjligt för detta system att bli utlöst överdrivet. Den vanligaste orsaken är att ERDDAP "S belastning av datamängden ser inte ett problem, men ERDDAP "Svaret på en begäran om data ser problemet. Oavsett vad orsaken är, är lösningen för dig att hantera vad som är fel med datamängden. Titta i log.txt för att se de faktiska felmeddelandena och hantera problemen. Om många filer har giltiga rubriker men ogiltiga data (En skadad fil) Byt ut filerna med okorrupta filer. Om anslutningen till en RAID är flakey, fixa den. Om anslutningen till en fjärrtjänst är flakey, hitta ett sätt att göra det inte flakey eller ladda ner alla filer från fjärrkällan och servera data från de lokala filerna.

Den detaljerade förklaringen av det specifika felet (ovanför) är:
För varje EDDGrid dataset, ERDDAP™ håller axelvariabelvärdena i minnet. De används till exempel för att konvertera begärda axelvärden som använder " () format till indexnummer. Till exempel, om axelvärdena är "10, 15, 20, 25", en begäran om (20 20 20 20) tolkas som en begäran om index #2 (0-baserade index) . När när ERDDAP™ Får en begäran om data och får data från källan, verifierar det att axelvärdena som den fick från källan matchar axelvärdena i minnet. Normalt gör de. Men ibland har datakällan förändrats på ett betydande sätt: till exempel kan indexvärden från början av axelvariabeln ha tagits bort. (t.ex. "10, 15, 20, 25" kan ha blivit "20, 25, 30") . Om det händer är det klart att ERDDAP tolkning av begäran (t.ex. " (20 20 20 20) är index #2) är nu fel. Så ERDDAP™ kastar ett undantag och kallar RequestReloadASAP. ERDDAP™ kommer att uppdatera dataset snart (ofta på några sekunder, vanligtvis inom en minut) . Andra liknande problem kastar också WaitThenTryAgain undantag.
    
#### RequestReloadASAP{#requestreloadasap} 
Du kan se RequestReloadASAP i log.txt-filen direkt efter ett felmeddelande och ofta nära en [WaitThenTryAgain Exception](#waitthentryagain-exception) . Det är i grunden ett internt, programmatiskt sätt för ERDDAP™ att ställa in en [flagga](#flag) signalera att datamängden ska laddas om ASAP.
     
### Filer som inte raderas{#files-not-being-deleted} 
För några ERDDAP™ installationer, det har varit ett problem med vissa tillfälliga filer som skapats av ERDDAP™ Att vara öppen (felaktigt) och därmed inte raderas. I några fall har många av dessa filer samlats in och tagit upp en betydande mängd diskutrymme.

Förhoppningsvis är dessa problem fixerade (från ERDDAP™ v2.00) . Om du ser detta problem, vänligen maila katalogen + namnen på de förolämpande filerna till Chris. John på noaa.gov. Du har några alternativ för att hantera problemet:

* Om filerna inte är stora och inte orsakar att du går ur diskutrymme, kan du ignorera problemet.
* Den enklaste lösningen är att stänga ner tomcat/ ERDDAP™   (efter timmar så färre användare påverkas) . Under nedstängningen, om operativsystemet inte raderar filerna, radera dem för hand. Sedan omstart ERDDAP .
         
### JSON-ld{#json-ld} 
*    ** [Semantisk märkning av datamängder med json-ld (JSON Länkade data) ](#json-ld) **   
     ERDDAP™ nu använder [Json-ld (JSON Länkade data) ](https://json-ld.org) för att göra din datakatalog och datamängder en del av [Semantisk webb](https://en.wikipedia.org/wiki/Semantic_Web) , som är Tim Berners-Lee idé att göra webbinnehåll mer maskinläsbart och maskin "förståeligt". json-ld innehåll använder [schema.org](https://schema.org/) termer och definitioner. Sökmotorer ( [Google i synnerhet](https://developers.google.com/search/docs/data-types/datasets) ) och andra semantiska verktyg kan använda denna strukturerade märkning för att underlätta upptäckt och indexering. Den json-ld strukturerade markeringen visas som osynliga-till-människor&lt;script&gt; kod påhttps://.../erddap/info/index.htmlWebbsidan (som är en semantisk webb [DataCatalog](https://schema.org/DataCatalog) ) och på var och enhttps://.../erddap/info/*datasetID*/index.htmlWebbsidan (som är en semantisk webb [Dataset](https://schema.org/Dataset) ) . (Särskilt tack till Adam Leadbetter och Rob Fuller från Marine Institute i Irland för att göra de hårda delarna av arbetet för att göra denna del av ERDDAP .)   
     
### Out-Of-Date URLs{#out-of-date-urls} 
Långsamt men säkert, de webbadresser som dataleverantörer har skrivit i datafiler blir out-of-date (till exempel, http Blir https Webbplatser omarrangeras och organisationer som NODC/NGDC/NCDC omorganiseras till NCEI) . De resulterande brutna länkarna är ett ständigt närvarande problem som alla webbplatser står inför. För att hantera detta, ERDDAP™ Nu har ett system för att automatiskt uppdatera out-of-date-adresser. Om GenerateDatasets Xml ser en out-of-date URL, det lägger till up-to-date URL till&lt; addAttributes &gt;. När en dataset laddas, om ERDDAP™ Ser en out-of-date URL, det tyst ändrar det till den aktuella URL. Ändringarna styrs av en serie sök-för/ersätt-med par definierade i&lt;updateUrls&gt; in i ERDDAP "S
 \\[ Tomcat \\] /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml-fil. Du kan göra ändringar där. Om du har förslag på ändringar, eller om du tror att detta ska omvandlas till en tjänst (som konverterarna) Vänligen e-post Chris. John på noaa.gov.
     
### Kor{#cors} 
* Kor ( [Cross-Origin Resource Sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) )   
"är en mekanism som tillåter begränsade resurser (t.ex. teckensnitt eller ERDDAP™ Datadata data) på en webbsida som begärs från en annan domän utanför den domän från vilken den första resursen serverades. (Arun Ranganathan) . I grund och botten är CORS ett meddelande som kan sättas i HTTP-rubriken för ett svar och säger i huvudsak, "det är okej med denna webbplats om vissa andra webbplatser (specifika, eller alla) Ta resurser (t.ex. data) från denna webbplats och gör den tillgänglig på deras webbplats.” Det är ett alternativ till [JSONP](https://en.wikipedia.org/wiki/JSONP) .
    
Utvecklarna av ERDDAP™ inte påstår sig vara säkerhetsexperter. Vi är inte helt tydliga med säkerhetsfrågor relaterade till CORS. Vi vill inte göra något uttalande som stöder en åtgärd som minskar säkerheten. Så vi stannar bara neutralt och lämnar det upp till varje ERDDAP™ administrera om fördelarna eller möjliggöra en CORS-rubrik är värda riskerna. Som alltid, om din ERDDAP™ har några privata datamängder, det är en bra idé att vara extra försiktig med säkerheten.
    
Om du vill aktivera Cors för din ERDDAP™ Det finns [Lätt tillgängliga instruktioner](https://enable-cors.org/index.html) beskriva hur webbplatsadministratörer kan aktivera en CORS-rubrik via deras lägre nivå serverprogramvara (t.ex., Apache eller nginx) .
    
### Palettes{#palettes} 
* Palettes används av ERDDAP™ omvandla en rad datavärden till en rad färger när du gör grafer och kartor.
    
Varje palett definieras i en .cpt-stil palettfil som används av [GMT](https://www.soest.hawaii.edu/gmt/) . Allt allt ERDDAP™ .cpt-filer är giltiga GMT .cpt-filer, men motsatsen är inte sant. För användning i ERDDAP™ .cpt-filer har:
    
    * Valfria kommentarer linjer i början av filen, börjar med "#".
    * En huvuddel med en beskrivning av segmenten i paletten, ett segment per rad. Varje segmentsbeskrivningslinje har 8 värden:
Börja Värde, startRed, start Grönt, börja Blå, endValue, endRed, endGreen, endBlue.
Det kan finnas ett antal segment. ERDDAP™ använder linjär interpolering mellan startRed/Green/Blue och endRed/Green/Blue i varje segment.
        
Vi rekommenderar att varje segment anger en start- och slutfärg som är olika, och att startfärgen för varje segment är densamma som slutfärgen i det tidigare segmentet, så att paletten beskriver en kontinuerlig blandning av färger. ERDDAP™ har ett system för att skapa en palett av diskreta färger från en palett med en kontinuerlig blandning av färger. Ett ERDDAP™ användare kan ange om de vill att paletten ska vara kontinuerlig (originalet) eller diskret (härrör från originalet) . Men det finns legitima skäl för att inte följa dessa rekommendationer för vissa paletter.
        
    * StartValue och endValues måste vara heltal.
Det första segmentet måste ha startValue=0 och endValue=1.
Det andra segmentet måste ha startValue=1 och endValue=2.
Etc.
    * De röda, gröna och blå värdena måste vara heltal från 0 (Ingen) 255 (full på) .
    * Slutet på filen måste ha 3 rader med:
        1. En bakgrundsrgb färg för data värden mindre än färgfältet minimum, t.ex.: B 128 128 128 128
Det är ofta startRed, startGreen och startBlue i det första segmentet.
        2. En förgrundsrgb-färg för datavärden mer än färgfältet maximalt, t.ex.: F 128 0
Det är ofta endRed, endGreen och endBlue av det sista segmentet.
        3. En rgb färg för NaN datavärden, t.ex. N 128 128 128 128
Det är ofta mitten grå (128 128 128 128) .
    * Värdena på varje rad måste separeras av flikar, utan yttre utrymmen.
    
Ett prov .cpt-fil är BlueWhiteRed.cpt:
    
\\######. Detta är BlueWhiteRed.cpt.
0 0 128 1 0 255 0 0 0 0 0
1 0 255 2 0 255 255 255
2 0 255 255 3 255 255 255 255
3 255 255 255 4 255 255 0
4 255 255 0 5 255 0 0
5 255 0 6 128 0 0
B 0 0 128
F 128 0 0
N 128 128 128
    
Se de befintliga .cpt-filerna för andra exempel. Om det finns problem med en .cpt-fil, ERDDAP™ Kommer förmodligen att kasta ett fel när .cpt-filen är parsed (som är bättre än att missbruka informationen) .
    
Du kan lägga till ytterligare paletter till ERDDAP . Du kan göra dem själv eller hitta dem på webben (till exempel vid [Cpt-City](http://soliton.vm.bytemark.co.uk/pub/cpt-city/) ) Även om du förmodligen måste redigera sitt format något för att överensstämma med ERDDAP .cpt krav. För att få ERDDAP™ att använda en ny .cpt-fil, lagra filen i *Tomcat* /webapps/erddap/WEB-INF/cptfiles (Du måste göra det för varje ny version av ERDDAP ) och antingen:
    
    * Om du använder standardmeddelandena.xml-filen: lägg till filnamnet till filnamnet&lt;Palettes&gt; tagga in
         *Tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml.
Om du gör det måste du göra det varje gång du uppgraderar ERDDAP .
    * Om du använder en anpassad messages.xml-fil: lägg till filnamnet till filnamnet&lt;Palettes&gt; tagga i din anpassade meddelanden.xml-fil: *Tomcat* /content/erddap/messages.xml. Om du gör det behöver du bara göra det en gång (men det finns annat arbete för att upprätthålla en anpassad meddelanden.xml-fil) .
    
Sedan startar om ERDDAP™ Så ERDDAP™ märker ändringarna. En fördel med detta tillvägagångssätt är att du kan ange beställningen av paletterna i listan som presenteras för användare. Om du lägger till en samling uppmuntrar vi dig att lägga till ett prefix med författarna initialer (t.ex. " KT\\_ ") till namnet på varje palett för att identifiera samlingen och så att det kan finnas flera paletter som annars skulle ha samma namn.
    
Ta inte bort eller ändra någon av standardpaletterna. De är en standardfunktion för alla ERDDAP™ installationer. Om du tror att en palett eller samling paletter bör ingå i standarden ERDDAP™ distribution eftersom det / de skulle vara av allmän användning, vänligen maila dem till Chris. John på noaa.gov.
    
### Colorbars{#colorbars} 
*    **Hur gör ERDDAP™ generera färgerna i en färgfält?** 
    
    1. Användaren väljer en av de fördefinierade [paletter](#palettes) eller använder standarden, t.ex. Rainbow. Palettes lagras/definieras i GMT-stil .cpt Color Palette Table-filer. Var och en av ERDDAP "S fördefinierade paletter har ett enkelt heltalsintervall, t.ex. 0 till 1 (Om det bara finns ett avsnitt i paletten) eller 0 till 4 (om det finns fyra avsnitt i paletten) . Varje segment i filen täcker n till n+1, med start på n=0.
    2.   ERDDAP™ genererar en ny .cpt-fil på flygningen, genom att skala den fördefinierade palettens sortiment (t.ex. 0 till 4) till intervallet av den palett som användaren behöver (t.ex. 0,1 till 50) och sedan generera ett avsnitt i den nya paletten för varje del av den nya paletten (t.ex. en loggskala med fästingar vid 0,1, 0,5, 1, 5, 10, 50 kommer att ha 5 sektioner) . Färgen för slutpunkten i varje avsnitt genereras genom att hitta den relevanta delen av paletten i .cpt-filen, sedan linjärt interpolera R, G och B-värden. (Det är samma som hur GMT genererar färger från sina färgpalettbordsfiler.) Detta system tillåter ERDDAP™ Börja med generiska paletter (t.ex. Rainbow med 8 segment, totalt spänner 0 till 8) och skapa anpassade paletter på flygningen (t.ex. en anpassad regnbåge, som kartlägger 0,1 till 50 mg/L till regnbågsfärgerna) .
    3.   ERDDAP™ sedan använder den nya .cpt-filen för att generera färgen för varje annan färgad pixel i färgfältet (och senare för varje datapunkt när du planerar data på en graf eller karta) återigen genom att hitta den relevanta delen av paletten i .cpt-filen, sedan linjärt interpolera R, G och B-värden.
    
Denna process kan verka i onödan komplicerad. Men det löser problem relaterade till loggskalor som är svåra att lösa andra sätt.
    
Så hur kan du efterlikna vad ERDDAP™ Gör? Det är inte lätt. I grund och botten måste duplicera processen som ERDDAP™ Använder. Om du är en Java programmerare, du kan använda samma Java klass som ERDDAP™ Använder för att göra allt detta:
     *Tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/coastwatch/sgt/CompoundColorMap.java.
    
### Riktlinjer för datadistributionssystem{#guidelines-for-data-distribution-systems} 
Fler allmänna yttranden om utformning och utvärdering av datadistributionssystem kan hittas [här här här](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html) .
     
### ArchiveADataset{#archiveadataset} 
Ingår i din ERDDAP™ installation är ett kommandoradsverktyg som heter ArchiveADataset som kan hjälpa dig att göra ett arkiv (en .zip eller .tar  .gz fil) med del eller all dataset som lagras i en serie netcdf-3 .nc datafiler i ett filformat som är lämpligt för inlämning till NOAA NCEI-arkivet ( .nc för ruttna datamängder eller [ .nc CFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA) för tabular dataset, enligt vad som anges av [NCEI NetCDF Mallar v2.0](https://www.ncei.noaa.gov/data/oceans/ncei/formats/netcdf/v2.0/index.html) ) .

ArchiveA Dataset kan göra två olika arkivformat:

* Det "ursprungliga" formatet följer dessa [NCEI Arkiveringsriktlinjer](https://www.ncdc.noaa.gov/atrac/guidelines.html) Denna guide för [Arkivera dina data på NCEI](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook?pli=1) och relaterade [Övningar för att säkerställa dataintegritet](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook/data-integrity) .
* "BagIt" formatet gör [BagIt filer](https://en.wikipedia.org/wiki/BagIt) ett standardiserat arkivformat som främjas av den amerikanska kongressbiblioteket, enligt vad som anges av [BagIt v0.97 specifikation](https://tools.ietf.org/html/draft-kunze-bagit-14) . NOAA NCEI kan standardisera på BagIt-filer för inlämningar till arkivet.

Inte överraskande, [Global och variabel metadata](/docs/server-admin/datasets#global-attributes) att ERDDAP™ uppmuntrar/kräver är nästan exakt samma infilerade CF- och ACDD-metadata som NCEI uppmuntrar/kräver, så alla datamängder bör vara redo för inlämning till NCEI via [Send2NCEI](https://www.nodc.noaa.gov/s2n/) eller [ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)   (NCEI:s avancerade spårnings- och resursverktyg för arkivsamlingar) .

Om du (och ERDDAP™ Administratör) Använd ArchiveADataset för att skicka in data till NCEI, då du (Inte NCEI) kommer att avgöra när du skickar en bit data till NCEI och vad den biten kommer att vara, eftersom du vet när det finns nya data och hur du anger den biten. (NCEI kommer inte) . Därför är ArchiveADataset ett verktyg för dig att använda för att skapa ett paket för att skicka in till NCEI.

ArchiveA Dataset kan vara användbart i andra situationer, till exempel för ERDDAP™ administratörer som behöver konvertera en delmängd av en datamängd (på en privat ERDDAP ) från dess ursprungliga filformat till en uppsättning av [ .nc CF filer](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA) Så att en offentlig ERDDAP™ kan tjäna data från .nc CF-filer istället för originalfilerna.

När du har ställt upp ERDDAP™ och springa den (minst en gång) Du kan hitta och använda ArchiveADataset i *Tomcat* /webapps/erddap/WEB-INF-katalogen. Det finns ett skal skript (ArchiveADataset.sh) För Linux/Unix och en batchfil (ArchiveADataset.bat) för Windows.

På Windows, första gången du kör ArchiveADataset, måste du redigera ArchiveADataset. bat fil med en text redaktör för att ändra vägen till java. exe fil så att Windows kan hitta Java .

När du kör ArchiveADataset kommer det att ställa dig en rad frågor. För varje fråga, skriv ett svar, tryck sedan på Enter. Eller tryck på ^ C för att avsluta ett program när som helst.

Eller så kan du ställa svaren på frågorna, i ordning, på kommandoraden. För att göra detta, kör programmet en gång och skriv in och skriv ner dina svar. Sedan kan du skapa en enda kommandorad (med svaren som parametrar) som driver programmet och svarar på alla frågor.
Använd ordet standard om du vill använda standardvärdet för en viss parameter.
Använd "" (Två dubbla citat) Som platshållare för en tom sträng.
Ange parametrar på kommandoraden kan vara mycket bekvämt, till exempel om du använder ArchiveADataset en gång i månaden för att arkivera en månads värde av data. När du har genererat kommandoraden med parametrar och sparat det i dina anteckningar eller i ett skalskript behöver du bara göra små ändringar varje månad för att göra månadens arkiv.

De frågor som ArchiveADataset ställer tillåter dig att:

* Ange original- eller Bagit-filförpackningar. För NCEI, använd Bagit.
* Ange zip eller tjära .gz komprimering för paketet. För NCEI, använd tjära .gz .
* Ange en kontakt e-postadress för detta arkiv (Det kommer att skrivas i READ_ME.txt-filen i arkivet) .
* Ange datasetID av dataset du vill arkivera.
* Ange vilka datavariabler du vill arkivera (vanligtvis alla) .
* Ange vilken delmängd av datamängden du vill arkivera. Du måste formatera delmängden på samma sätt som du skulle formatera en delmängd för en databegäran, så det kommer att vara annorlunda för rutnät än för tabelldatamängder.
    * För ruttna datamängder kan du ange en rad värden av den vänstra dimensionen, vanligtvis är det en rad tid. ArchiveADataset kommer att göra en separat förfrågan och generera en separat datafil för varje värde i värdeområdet. Eftersom ruttna datamängder vanligtvis är stora måste du nästan alltid ange en liten delmängd i förhållande till storleken på hela datamängden.
Till exempel, \\[  (2015-12-01) Från: (2015-12-31)  \\]  \\[  \\]  \\[  \\]  \\[  \\] 
    * För tabelldataset kan du ange alla insamlingar av begränsningar, men det är ofta en rad tid. Eftersom tabelldatamängder vanligtvis är små är det ofta möjligt att ange inga begränsningar, så att hela datamängden arkiveras.
Till exempel, &time&gt;=2015-12-01 & tid&lt;2016-01-01
* För tabelldataset: ange en komma separerad lista över 0 eller fler variabler som kommer att avgöra hur arkiverade data ytterligare subsetts i olika datafiler. För dataset som har
     [cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type) TimeSeries | TimeSeriesProfil | Trajektor | TrajectoryProfile
Du bör nästan alltid ange variabeln som har cf\\_role=timeseries\\_id (t.ex., stationID ) cf\\_role=trajectory\\_id attribut. ArchiveADataset kommer att göra en separat begäran och generera en separat datafil för varje kombination av värdena för dessa variabler, t.ex. för varje stationID .
För alla andra tabelldataset kommer du förmodligen inte att ange några variabler för detta ändamål.
Varning: Om datamängden du arkiverar är mycket stor (&gt;2GB) Och det finns ingen lämplig variabel för detta ändamål, då är ArchiveADataset inte användbart med denna dataset. Detta bör vara sällsynt.
* Ange filformatet för de datafiler som skapas.
För ruttna datamängder, för NCEI, användning .nc .
För tabular dataset, för NCEI, använd [ .nc CFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA) om det är ett alternativ; annars använda .nc .
* Ange vilken typ av filsmälta som ska skapas för varje datafil och för hela arkivpaketet: MD5, SHA-1 eller SHA-256. Filen smälter ger ett sätt för kunden (t.ex. NCEI) för att testa om datafilen har blivit skadad. Traditionellt var dessa [.md5 filer](https://en.wikipedia.org/wiki/MD5) Men nu finns det bättre alternativ. För NCEI, använd SHA-256.

När du svarar på alla frågor kommer ArchiveADataset att:

1. Gör en serie förfrågningar till datamängden och iscensätta de resulterande datafilerna i *bigParentDirectory* /ArchiveADataset/ * datasetID \\_timestamp* /.
För ruttna datamängder kommer det att finnas en fil för varje värde av den vänstra dimensionen (t.ex. tid) . Namnet på filen är det värdet (t.ex. tidsvärde) .
För tabelldataset kommer det att finnas en fil för varje värde av ... variabeln (s) . Namnet på filen är det värdet. Om det finns mer än en variabel kommer de vänstra variablerna att användas för att göra underkatalognamn, och den högra variabeln kommer att användas för att göra filnamnen.
Varje datafil måste vara&lt;2GB (det högsta tillåtna med .nc version 3 filer) .
2. Gör en fil relaterad till varje datafil med smältan av datafilen. Om till exempel datafilen är 46088 .nc och smälttypen är .sha256, då kommer smältfilen att ha namnet 46088 .nc .sha256.
3. Gör en READ\\_ME.txt-fil med information om arkivet, inklusive en lista över alla inställningar du angav för att generera detta arkiv.
4. Gör 3 filer i *bigParentDirectory* /ArchiveADataset/:
    
    * Ett .zip eller .tar  .gz arkivfil som heter * datasetID \\_timestamp*  .zip   (eller .tar  .gz ) innehålla alla de iscensatta datafilerna och smälta filer. Den här filen kan vara vilken storlek som helst, begränsad endast av diskutrymme.
    * En smältfil för arkivfilen, till exempel * datasetID \\_timestamp*  .zip .sha256.txt
    * För den "ursprungliga" typen av arkiv, en textfil som heter * datasetID \\_timestamp*  .zip .listOfFiles.txt (eller .tar  .gz ) som listar alla filer i .zip   (eller .tar  .gz ) fil.
    
Om du förbereder arkivet för NCEI är dessa filer som du skickar till NCEI, kanske via [Send2NCEI](https://www.nodc.noaa.gov/s2n/) eller [ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)   (NCEI:s avancerade spårnings- och resursverktyg för arkivsamlingar) .
5. Ta bort alla de iscensatta filerna så att endast arkivfilen (t.ex., .zip ) , den smälta (t.ex. .sha256.txt) arkivet, och (valfritt) .listOfFiles.txt-filer kvarstår.

#### ISO 19115.xml Metadatafiler{#iso-19115-xml-metadata-files} 
ArkivADataset arkivpaket innehåller inte ISO 19115 .xml metadatafil för dataset. Om du vill/behöver skicka in en ISO 19115-fil för din dataset till NCEI kan du skicka dem ISO 19115 .xml metadatafil som ERDDAP™ skapad för dataset (men NMFS personer ska få ISO 19115-filen för sina datamängder från InPort om ERDDAP™ Ser inte redan den filen) .

Problem? Förslag? ArchiveADataset är nytt. Om du har problem eller förslag, se våra [sektion om att få ytterligare stöd](/docs/intro#support) .
     
