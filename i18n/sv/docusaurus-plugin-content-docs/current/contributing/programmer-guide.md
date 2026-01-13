---
sidebar_position: 2
---

# Programmers guide

Det är saker som bara en programmerare som har för avsikt att arbeta med ERDDAP "S Java Klasser behöver veta.

###  **Få källkoden**  {#getting-the-source-code} 
   

  - Via källkod på GitHub
Källkoden för senaste offentliga versioner och utvecklingsversioner finns också tillgänglig via [GitHub](https://github.com/ERDDAP) . Vänligen läs The [Wiki](https://github.com/ERDDAP/erddap/wiki) för det projektet. Om du vill ändra källkoden (och eventuellt har de ändringar som införlivats i standarden ERDDAP™ distribution) Detta är den rekommenderade metoden.

###  ** ERDDAP™ beroende**  {#erddap-dependencies} 
 ERDDAP™ använder Maven för att ladda kodberoende samt vissa statiska referensfiler (WEB-INF/ref) . Detta görs för att undvika att lagra många stora filer i förvaret.
Du kan använda `mvn kompil` Och det kommer att hämta beroenden och ref-filer. Du kan också använda `mvn paket` för att skapa en krigsfil.
Du kan manuellt ladda ner ref-filerna:

  -  [etopo1\\_ice\\_g\\_i2 .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip) och unzip det i /WEB-INF / ref / .

  -  [Ref\\_files .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip) och unzip det i /WEB-INF / ref / .

  -  [ErddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.1/erddapContent.zip)   (version 1.0.0, 20333 byte, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, daterad 2024-10-14) och unzip det i _tomcat_, skapa _tomcat_/content/erddap .

OBS: Som standard kommer Maven att cache statisk referens och testa data arkivnedladdningar och bara extrahera dem när en ny version laddas ner. För att hoppa över att ladda ner helt kan du ställa in `skipResourceDownload` och/eller `skipTestResourceDownload` egenskaper till Maven (t.ex. `mvn -DskipResourceDownload-paket` ) . För att tvinga extraktion, set `-Ddownload.unpack=true` och `-Ddownload.unpackWhenChanged=false` .

-  ERDDAP™ och dess underkomponenter har mycket liberal, öppen källkod [licenser](/license) Så du kan använda och ändra källkoden för alla ändamål, vinstdrivande eller icke-vinstdrivande. Observera att ERDDAP™ och många underkomponenter har licenser som kräver att du bekräftar källan till den kod som du använder. Se [Krediter](/credits) . Oavsett om det krävs eller inte, är det bara bra att erkänna alla dessa bidragsgivare.
  

-  **Använd koden för andra projekt** 

Medan du är välkommen att använda delar av ERDDAP™ kod för andra projekt, varnas för att koden kan och kommer att ändras. Vi lovar inte att stödja andra användningar av vår kod. Git och GitHub kommer att vara dina viktigaste lösningar för att hantera detta - Git låter dig slå samman våra förändringar i dina förändringar.
   **För många situationer där du kan frestas att använda delar av ERDDAP™ I ditt projekt tror vi att du kommer att finna det mycket lättare att installera och använda ERDDAP™ som är,** och sedan skriva andra tjänster som använder ERDDAP Tjänster. Du kan skapa din egen ERDDAP™ installationen grovt på en timme eller två. Du kan skapa din egen ERDDAP™ installation på ett polerat sätt om några dagar (beroende på antalet och komplexiteten i dina datamängder) . Men hacka ut delar av ERDDAP™ för ditt eget projekt kommer sannolikt att ta veckor (och månader att fånga subtiliteter) och du kommer att förlora förmågan att införliva förändringar och buggfixar från efterföljande ERDDAP™ releaser. Vi vi (uppenbarligen) Tänk att det finns många fördelar med att använda ERDDAP™ som är och gör din ERDDAP™ Installera offentligt tillgänglig. Men under vissa omständigheter kanske du inte vill göra din ERDDAP™ Installera offentligt tillgänglig. Då kan din tjänst komma åt och använda din privata ERDDAP™ och dina kunder behöver inte veta om ERDDAP™ .

  ####  **Halvvägs** 

Eller det finns ett annat tillvägagångssätt som du kan hitta användbart som är halvvägs mellan att dyka in i ERDDAP kod och användning ERDDAP™ Som en fristående webbtjänst: I EDD-klassen finns en statisk metod som låter dig göra en instans av en dataset. (baserat på specifikationen i datasets.xml ) Från:
OneFromDataset Xml (Sträng tDatasetID) 
"Det returnerar en instans av en EDDTable eller EDDGrid dataset. Med tanke på detta fall kan du ringa
MakeNewFileForDapQuery (String userDapQuery, String dir, String fileName, String file Typename) 
"för att tala om för instansen att göra en datafil, en specifik filtyp, med resultaten från en användarfråga. Detta är ett enkelt sätt att använda ERDDAP metoder för att begära data och få en fil som svar, precis som en klient skulle använda ERDDAP™ webbapplikation. Men detta tillvägagångssätt fungerar inom din Java program och kringgår behovet av en applikationsserver som Tomcat. Vi använder detta tillvägagångssätt för många av enhetstesterna av EDDTable och EDDGrid underklasser, så du kan se exempel på detta i källkoden för alla dessa klasser.

###  **Utvecklingsmiljö**  {#development-environment} 

  - Det finns konfigurationer för [Jetty](https://github.com/ERDDAP/erddap/blob/main/development/jetty) och [Docker](https://github.com/ERDDAP/erddap/blob/main/development/docker) i GitHub, men utgåvor förväntas löpa i Tomcat.

  -  **Valfritt** Från: Ställ in ERDDAP™ I Tomcat
Sedan dess ERDDAP™ är främst avsett att vara en servlet i Tomcat, vi rekommenderar starkt att du följer standarden. [installationsanvisningar](/docs/server-admin/deploy-install) installera Tomcat och sedan installera ERDDAP™ i Tomcats webapps katalog. Bland annat, ERDDAP™ var utformad för att installeras i Tomcats katalogstruktur och förväntar sig att Tomcat tillhandahåller några .jar-filer.

  -  ERDDAP™ inte kräver ett specifikt IDE (Chris använder huvudsakligen Visual Studio Code, Bob använde EditPlus) . Vi använder inte Eclipse, Ant, etc.; inte heller erbjuder vi ERDDAP - relaterat stöd för dem. Projektet använder Maven.

  - Vi använder en batchfil som tar bort alla .class-filer i källträdet för att säkerställa att vi har en ren kompilator (med javac) .

  - Vi använder för närvarande Adoptium javac jdk-25.0.1+8 för att sammanställa gov.noaa.pfeg.coastwatch.TestAll (Det har länkar till några klasser som inte skulle sammanställas annars) och kör testerna. Av säkerhetsskäl är det nästan alltid bäst att använda de senaste versionerna av Java 25 och Tomcat 10.

    - När vi kör javac eller java är den aktuella katalogen _tomcat_/webapps/erddap/WEB-INF.

    - Vår javac och java classpath är
       `klasser;./../../lib/servlet-api.jar;lib/*` 

    - Så din javac kommandorad kommer att vara något som
       `javac -kodning UTF-8-cp klasser;./././lib/servlet-api.jar;lib/* klasser/gov/noaa/pfel/coastwatch/TestAll.java` 

    - Och din java kommandorad kommer att vara något som
`java-cp klasser;./.././lib/servlet-api.jar;lib/* -Xmx4000M -Xms4000M klasser/gov/noaa/pfel/coastwatch/TestAll
       `Valfritt: Du kan lägga till` -verbose:gc, som säger Java för att skriva ut sopor insamling statistik.

    - Om test Alla kompileringar, allt ERDDAP™ behov har sammanställts. Några klasser sammanställs som inte behövs för ERDDAP™ . Om du sammanställer TestAll lyckas men inte sammanställer någon klass, behöver den klassen inte. (Det finns några oavslutade / oanvända klasser.) 

  - I några fall använder vi tredjepartskällkod istället för .jar-filer. (särskilt för DODS ) och har ändrat dem något för att undvika problem som sammanställs med Java Vi har ofta gjort andra små ändringar (Notably till DODS ) Av andra skäl.

  - De flesta klasser har testmetoder i sin associerade src/testfil. Du kan köra JUnit-testet med `Mvn test` kommandot. Detta kommer att ladda ner flera zip-filer av data som testerna förlitar sig på från den senaste versionen av [ ERDDAP /erddap Testa test](https://github.com/ERDDAP/erddapTest/releases/) . \\
     
Obs&#33;: Maven caches nedladdningar men kommer att unzip nedladdade arkiv på varje utförande, vilket tar tid. För att hoppa över nedladdning
och unzipping test data arkiv, kan du ange `skipTestResourceDownload` egendom till Maven (t.ex. `mvn -DskipTestResourceDownload-paket` ) .

###   **Viktiga klasser**  {#important-classes} 

Om du vill titta på källkoden och försöka räkna ut hur ERDDAP™ Verk, snälla gör.

  - Koden har Java Doc kommenterar, men Java Docs har inte genererats. Känn dig fri att generera dem.

  - De viktigaste klasserna (inklusive de som nämns nedan) finns inom gov/noa/pfel/erddap.

  - och ERDDAP™ klass har högsta nivå metoder. Den sträcker sig HttpServlet.

  -  ERDDAP™ passerar förfrågningar till fall av underklasser av EDDGrid eller EDDTable, som representerar enskilda datamängder.

  - EDStatic har de flesta statiska uppgifter och inställningar (e.g., från setup.xml och messages.xml-filer) och erbjuder statiska tjänster (t.ex. skicka e-post) .

  -  EDDGrid och EDDTable underklasser analysera begäran, få data från underklassspecifika metoder, sedan formatera data för svaret.

  -  EDDGrid underklasser driver data till GridDataAccessor (Den interna databehållaren för nätdata) .

  - EDDTable underklasser driver data till TableWriter underklasser, som skriver data till en specifik filtyp on-the-fly.

  - Andra klasser (t.ex. låga nivåklasser) är också viktigt, men det är mindre troligt att du kommer att arbeta för att ändra dem.
     

###  **Kodbidrag**  {#code-contributions} 

- GitHub frågor
Om du vill bidra men inte har ett projekt, se listan över [GitHub frågor](https://github.com/ERDDAP/erddap/issues) Många är projekt du kan ta på. Om du vill arbeta på ett problem, vänligen tilldela det till dig själv att ange till andra du arbetar på det. GitHub frågan är det bästa stället att diskutera frågor för hur man går vidare med arbetet i den frågan.

- Om ändringen du vill göra är ett av de nedan vanliga fallen, vänligen skapa en [GitHub är](https://github.com/ERDDAP/erddap/issues) Anger den förändring du tänker göra. Sedan när förändringen är klar, gör en pull request för att begära sammanslagningen. De gemensamma förändringarna inkluderar:

  - Du vill skriva en annan underklass av EDDGrid eller EDDTable för att hantera en annan datakälla typ. I så fall rekommenderar vi att du hittar den närmaste befintliga underklassen och använder den koden som utgångspunkt.

  - Du vill skriva en annan sparaAs_FileType_-metod. Om så är fallet rekommenderar vi att du hittar den närmaste befintliga sparaAs_FileType_-metoden. EDDGrid eller EDDTable och använd den koden som utgångspunkt.

Dessa situationer har fördelen att koden du skriver är självinnehållen. Du behöver inte veta alla detaljer om ERDDAP Inre. Och det blir lätt för oss att införliva din kod i ERDDAP . Observera att om du skickar in kod behöver licensen vara kompatibel med ERDDAP™   [licens](/license)   (t.ex., [Apache](https://www.apache.org/licenses/) , [BSD](https://www.opensource.org/licenses/bsd-license.php) eller [MIT-X](https://www.opensource.org/licenses/mit-license.php) ) . Vi listar ditt bidrag i [krediter](/credits) .

- Om du har en funktion som inte täcks ovan som du vill lägga till ERDDAP Det rekommenderas att först skapa en diskussionstråd i [GitHub diskussioner](https://github.com/ERDDAP/erddap/discussions/categories/ideas) . För betydande funktioner/förändringar kommer styrelsen att diskutera dem och besluta om att godkänna att lägga till den för att ERDDAP™ .

###  **Att döma dina kodbidrag**  {#judging-your-code-contributions} 
Om du vill skicka in kod eller andra ändringar som ska ingå i ERDDAP Det är bra. Ditt bidrag måste uppfylla vissa kriterier för att accepteras. Om du följer riktlinjerna nedan ökar du avsevärt chanserna att ditt bidrag accepteras.
   

  - och ERDDAP™ Projektet hanteras av en NATD ( NOAA Utsedd teknisk direktör) med input från en teknisk styrelse.
Från 2007 (början på ERDDAP ) 2022 var det Bob Simons (Founder-Leader) . Från och med januari 2023 är det Chris John. I grund och botten är NATD ansvarig för ERDDAP Så han/hon har det sista ordet om beslut om ERDDAP™ kod, särskilt om designen och om en viss dragförfrågan kommer att accepteras eller inte. Det måste vara så delvis av effektivitetsskäl (Det fungerar bra för Linus Torvalds och Linux) och delvis av säkerhetsskäl: Någon måste berätta för IT-säkerhetspersonerna att han tar ansvar för kodens säkerhet och integritet.
     

  - NATD garanterar inte att han/hon kommer att acceptera din kod.
Om ett projekt inte fungerar lika bra som vi hade hoppats och om det inte kan räddas kommer NATD inte att inkludera projektet i projektet. ERDDAP™ distribution. Känn dig inte dålig. Ibland fungerar inte projekt lika bra som hoppades. Det händer alla mjukvaruutvecklare. Om du följer riktlinjerna nedan ökar du kraftigt dina chanser att lyckas.
     

  - Det är bäst om förändringarna är av allmänt intresse och användbarhet.
Om koden är specifik för din organisation, är det förmodligen bäst att upprätthålla en separat gren av ERDDAP™ för din användning. Axiom gör detta. Lyckligtvis gör Git det enkelt att göra. NATD vill behålla en konsekvent vision för ERDDAP Låt det inte bli ett diskbänkprojekt där alla lägger till en egen funktion för sitt projekt.
     

  - Följ Java Kodkonventioner.
I allmänhet bör din kod vara god kvalitet och bör följa originalet. [ Java Kodkonventioner](https://www.oracle.com/technetwork/java/codeconventions-150003.pdf) .class filer på rätt plats i katalogen struktur, ge .class filer ett lämpligt namn, inkluderar korrekt Java Doc-kommentarer, inkluderar //kommentarer i början av varje stycke kod, strecksats med 4 utrymmen (inte tab) Undvik rader &gt;80 tecken, etc. Konventioner ändras och källkoden är inte alltid helt uppdaterad. När du är osäker, matcha kod till konventionerna och inte befintlig kod.

- Använd beskrivande klass, metod och variabla namn.
Det gör koden lättare för andra att läsa.
   

- Undvik fancy kod.
På lång sikt måste du eller andra personer räkna ut koden för att behålla den. Så använd enkla kodningsmetoder som därmed är enklare för andra (inklusive dig i framtiden) för att räkna ut. Självklart, om det finns en verklig fördel att använda lite fantasi Java programmering funktion, använd den, men i stor utsträckning dokumentera vad du gjorde, varför och hur det fungerar.
   

- Arbeta med tekniska styrelsen innan du börjar.
Om du hoppas få dina kodändringar dras in ERDDAP™ Den tekniska styrelsen kommer definitivt att vilja prata om vad du ska göra och hur du ska göra det innan du gör några ändringar i koden. På så sätt kan vi undvika att du gör ändringar som NATD i slutändan inte accepterar. När du utför arbetet är NATD och Technical Board villig att svara på frågor som hjälper dig att räkna ut den befintliga koden och (övergripande övergripande) Hur man hanterar ditt projekt.
   

- Arbeta självständigt (så mycket som möjligt) När du börjar.
I motsats till ovanstående "Arbeta med Technical Board", efter att du kommit igång med projektet, uppmuntrar NATD dig att arbeta så självständigt som möjligt. Om NATD måste berätta nästan allt och svara på många frågor (Särskilt de som du kunde ha svarat genom att läsa dokumentationen eller koden) Dina ansträngningar är inte en tidsbesparingar för NATD och han kan också göra jobbet själv. Det är det [Mytiska människan månad](https://en.wikipedia.org/wiki/The_Mythical_Man-Month) Problem. Naturligtvis bör vi fortfarande kommunicera. Det skulle vara bra att regelbundet se ditt arbete pågår för att se till att projektet är på rätt spår. Men ju mer du kan arbeta självständigt (efter det att den tekniska styrelsen instämmer i uppgiften och den allmänna strategin) Ju bättre.
   

- Undvik buggar.
Om en bugg inte fångas före en release, orsakar det problem för användare (i bästa fall) returnerar fel information (i värsta fall) är en blot på ERDDAP "Syfte, och kommer att fortsätta på out-of-date" ERDDAP™ installationer i flera år. Arbeta mycket hårt för att undvika buggar. En del av detta är att skriva ren kod (Det är lättare att se problem) . En del av detta är att skriva enhetstest. En del av detta är en ständig attityd av bugg undvikande när du skriver kod. Gör inte NATD ångra att lägga till din kod för att ERDDAP™ .
   

- Skriv ett enhetstest eller test.
För ny kod ska du skriva JUnit-test i en testfil.
Skriv minst en individuell testmetod som noggrant testar koden du skriver och lägger till den i klassens JUnit-testfil så att den körs automatiskt. Enhet (och relaterade) tester är ett av de bästa sätten att fånga buggar, initialt, och på lång sikt (som andra saker förändras ERDDAP™ ) . Som Bob sa: "Unit-test är det som låter mig sova på natten."
   

- Gör det enkelt för NATD att förstå och acceptera ändringarna i din pull request.
En del av det är att skriva en enhetstestmetod (s) . En del av detta begränsar dina ändringar till en del av koden (eller en klass) om möjligt. NATD kommer inte att acceptera någon pull request med hundratals ändringar i hela koden. NATD berättar för IT-säkerhetspersonerna att han tar ansvar för kodens säkerhet och integritet. Om det finns för många förändringar eller de är för svåra att räkna ut, är det bara för svårt att verifiera ändringarna är korrekta och inte införa buggar eller säkerhetsproblem.
   

- Håll det enkelt.
Ett bra övergripande tema för din kod är: Håll det enkelt. Enkel kod är lätt för andra (inklusive dig i framtiden) att läsa och underhålla. Det är lätt för NATD att förstå och därmed acceptera.
   

- Anta långsiktigt ansvar för din kod.
På lång sikt är det bäst om du tar ansvar för att behålla din kod och svara på frågor om den. (t.ex. i ERDDAP™ Google Group) . Som vissa författare noterar är kod ett ansvar samt en tillgång. Om en bugg upptäcks i framtiden är det bäst om du fixar det eftersom ingen vet din kod bättre än du. (också så att det finns ett incitament att undvika buggar i första hand) . NATD ber inte om ett fast åtagande att tillhandahålla pågående underhåll. NATD säger bara att underhållet kommer att uppskattas mycket.
