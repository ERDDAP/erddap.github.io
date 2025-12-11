---
sidebar_position: 2
---

# Programmørens veiledning

Dette er ting som bare en programmerer som har til hensikt å jobbe med ERDDAP 's Java klasser må vite.

###  **Få kildekoden**  {#getting-the-source-code} 
   

  - Via Source Code på GitHub
Kildekoden for nylige offentlige versjoner og versjoner i utvikling er også tilgjengelig via [GitHub](https://github.com/ERDDAP) .. Les gjerne [Wiki](https://github.com/ERDDAP/erddap/wiki) For det prosjektet. Hvis du vil endre kildekoden (og muligens har endringene i standarden ERDDAP™ distribusjon) Dette er den anbefalte tilnærming.

###  ** ERDDAP™ avhengighet**  {#erddap-dependencies} 
 ERDDAP™ bruker Maven til å laste kodeavhengigheter samt noen statiske referansefiler (WEB-INF/ref) .. Dette gjøres for å unngå å lagre mange store filer i lageret.
Du kan bruke `mvn kompilering` Og det vil hente avhengighetene og ref filer. Du kan også bruke `mvn-pakke` å generere en krigsfil.
Du kan laste ned ref-filene manuelt:

  -  [etopo1\\_ice\\_g\\_i2 .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip) og zip det inn i /WEB-INF/ref/ .

  -  [ref-_filer .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip) og zip det inn i /WEB-INF/ref/ .

  -  [erddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.1/erddapContent.zip)   (versjon 1.0.0, 20333 bytes, MD(2005)2B8D2AE5ED73E3A42B529C168C60B5, datert 2024-10-14) og zip det inn i _tomcat_, opprette _tomcat_/content/erddap ..

MERK: Som standard vil Maven cache statisk referanse og test dataarkiv nedlastinger og bare trekke dem ut når en ny versjon lastes ned. Hvis du vil hoppe over nedlastingen helt kan du angi `Hopp overResourceDownload` og/eller `Hopp overTestResource Last ned` eiendommer til Maven (f.eks. `mvn -DskipResource Last ned pakke` ) .. For å tvinge ekstraksjon, sett `-Ddownload.unpack=true` og `-Ddownload.unpackWhenchanged=false` ..

-  ERDDAP™ og underkomponentene har svært liberale, åpne kilder [lisenser](/license) , så du kan bruke og endre kildekoden til ethvert formål, for-profit eller ikke-for-profit. Merk at ERDDAP™ og mange underkomponenter har lisenser som krever at du anerkjenner kilden til koden du bruker. Se [Kreditter](/credits) .. Enten det er nødvendig eller ikke, er det bare bra å anerkjenne alle disse bidragsyterne.
  

-  **Bruk koden til andre prosjekter** 

Mens du er velkommen til å bruke deler av ERDDAP™ kode for andre prosjekter, bli advaret om at koden kan og vil endre seg. Vi lover ikke å støtte andre bruksområder. Git og GitHub vil være dine viktigste løsninger for å håndtere dette - Git lar deg slå våre endringer sammen i dine endringer.
   **For mange situasjoner hvor du kan bli fristet til å bruke deler av ERDDAP™ I prosjektet ditt tror vi at det er mye lettere å installere og bruke ERDDAP™ som det er,** og deretter skrive andre tjenester som bruker ERDDAP Tjenestene. Du kan sette opp din egen ERDDAP™ installasjon råt i en time eller to. Du kan sette opp din egen ERDDAP™ installasjon på en polert måte på noen dager (avhengig av antall og kompleksitet av dine datasett) .. Men hacking ut deler av ERDDAP™ For ditt eget prosjekt vil sannsynligvis ta uker (og måneder til å fange subtiliteter) og du vil miste evnen til å inkludere endringer og feilrettinger fra etterfølgende ERDDAP™ Utgivelser. Vi (Selvfølgelig) Tror det er mange fordeler å bruke ERDDAP™ som er og gjør din ERDDAP™ installasjon offentlig tilgjengelig. Men i noen tilfeller vil du kanskje ikke gjøre din ERDDAP™ installasjon offentlig tilgjengelig. Deretter kan tjenesten din få tilgang til og bruke din private ERDDAP™ Og dine kunder trenger ikke vite om ERDDAP™ ..

  ####  **Halvveis** 

Eller det er en annen tilnærming som du kan finne nyttig som er halvveis mellom å gå inn i ERDDAP kode og bruk ERDDAP™ som en frittstående webtjeneste: I EDD-klassen er det en statisk metode som lar deg gjøre et tilfelle av et datasett (basert på spesifikasjonen i datasets.xml ) :)
`oneFraDataset Xml (String TDatasetID) 
«Det returnerer en instans av en EDDtabell eller EDDGrid - Datasett. På grunn av dette kan du ringe -
`makeNewFileForDapQuery (StrengebrukerDapQuery, Strengemappe, StrengefilName, Strengefil TypeName) 
`for å fortelle instansen å lage en datafil, av en bestemt filtype, med resultatene fra en brukerspørsel. Dette er en enkel måte å bruke ERDDAP metoder til å be om data og få en fil som svar, akkurat som en klient ville bruke ERDDAP™ Nettapplikasjon. Men denne tilnærmingen virker i din Java programmet og omgår behovet for en applikasjonsserver som Tomcat. Vi bruker denne tilnærmingen til mange av enhetens tester av EDDTable og EDDGrid underklasser, så du kan se eksempler på dette i kildekoden for alle disse klassene.

###  **Utviklingsmiljø**  {#development-environment} 

  - Det er konfigurasjoner for [Jetty](https://github.com/ERDDAP/erddap/blob/main/development/jetty) og [Docker](https://github.com/ERDDAP/erddap/blob/main/development/docker) i GitHub, men utgivelser forventes å kjøre i Tomcat.

  -  **Valgfritt** :) Sett opp ERDDAP™ i Tomcat\\
Siden ERDDAP™ er hovedsakelig ment å være en server som kjører i Tomcat, anbefaler vi sterkt at du følger standarden [installasjonsinstruksjoner](/docs/server-admin/deploy-install) å installere Tomcat, og deretter installere ERDDAP™ i Tomcats webapps-katalog. blant annet, ERDDAP™ var designet for å bli installert i Tomcats katalogstruktur og forventer Tomcat å gi noen .jar-filer.

  -  ERDDAP™ trenger ikke en bestemt IDE (Chris bruker hovedsakelig Visual Studio Code, Bob brukte EditPlus) .. Vi bruker ikke Eclipse, Ant, etc.; heller ikke tilbyr vi ERDDAP - relatert støtte til dem. Prosjektet bruker Maven.

  - Vi bruker en batchfil som sletter alle .class-filer i kildetreet for å sikre at vi har en ren kompilering (med javac) ..

  - Vi bruker for tiden Adoptiums javac jdk-21.0.3+9 til å samle gov.noaa.pfeg.coastwatch.TestAll (den har koblinger til noen klasser som ikke vil bli kompilert ellers) Kjør testene. Av sikkerhetsgrunner er det nesten alltid best å bruke de siste versjonene av Java 21 og Tomcat 10.

    - Når vi kjører javac eller java, er den gjeldende katalogen _tomcat_/webapps/erddap/WEB-INF .

    - Javac og java classpath er
       `klasser;./.././lib/servlet-api.jar;lib/*` 

    - Så din Javac kommando linje vil være noe som -
       `javac -encoding UTF-8 -cp klasser;../././lib/servlet-api.jar;lib/* klasser/gov/noaa/pfel/coastwatch/TestAll.java` 

    - Og din java kommando linje vil være noe som -
 `java -cp klasser;../././lib/servlet-api.jar;lib/* -Xmx4000M -Xms4000M klasser/gov/noaa/pfel/coastwatch/TestAlle
       `Valgfritt: Du kan legge til` -verbose:gc', som forteller Java å skrive ut søppelinnsamlingsstatistikk.

    - Hvis test Alle kompileringer, alt ERDDAP™ Det er samlet behov. Noen få klasser er samlet som ikke er nødvendig for ERDDAP™ .. Hvis det lykkes å utarbeide TestAll, men ikke kompilere noen klasse, er den klassen ikke nødvendig. (Det er noen uferdige/ubrukte klasser.) 

  - I noen tilfeller bruker vi 3rd party kildekode i stedet for .jar filer (særlig for DODS ) og har endret dem litt for å unngå problemer å samle sammen med Java 21. Vi har ofte gjort andre små endringer (spesielt til DODS ) av andre grunner.

  - De fleste klasser har testmetoder i sin tilhørende src/testfil. Du kan kjøre JUnit-testene med `mvn-test` kommando. Dette vil laste ned flere zip-filer av data som testene er avhengig av fra den siste utgivelsen av [ ERDDAP /erddap Test](https://github.com/ERDDAP/erddapTest/releases/) .\\
     
MERK: Maven caches laster ned, men vil fjernezip de nedlastede arkivene ved hver køyring, som tar tid. For å hoppe over nedlasting
og fjerner testdataarkiver, kan du angi `Hopp overTestResource Last ned` eiendom til Maven (f.eks. `mvn -DskipTestResourceDownload pakke` ) ..

###   **Viktige klasser**  {#important-classes} 

Hvis du vil se på kildekoden og prøve å finne ut hvordan ERDDAP™ Vær så snill.

  - Koden har Java Doc kommentarer, men Java Docs er ikke generert. Føl deg fri til å generere dem.

  - De viktigste klassene (inkludert de som er nevnt nedenfor) er i gov/noaa/pfel/erddap.

  - Den ERDDAP™ Klassen har de høyeste nivåmetoder. Det strekker seg HttpServlet.

  -  ERDDAP™ passerer anmodninger til tilfeller av underklasser av EDDGrid EDDTable, som representerer individuelle datasett.

  - EDStatic har mesteparten av statisk informasjon og innstillinger (f.eks. fra oppsettet.xml og meldinger.xml-filer) og tilbyr statiske tjenester (f.eks. å sende e-post) ..

  -  EDDGrid og EDDTable-underklasser tolker forespørselen, får data fra underklassespesifikke metoder, og formaterer deretter dataene for responsen.

  -  EDDGrid Underklasser skyver data inn i GridDataAccessor (den interne databeholderen for rutenettede data) ..

  - EDDTable underklasser pusher data inn i TableWriter underklasser, som skriver data til en bestemt filtype på flyet.

  - Andre klasser (For eksempel lavnivåklasser) Det er også viktig, men det er mindre sannsynlig at du vil jobbe for å endre dem.
     

###  **Kodebidrag**  {#code-contributions} 

- GitHub problemer
Hvis du ønsker å bidra, men ikke har et prosjekt, se listen over [GitHub problemer](https://github.com/ERDDAP/erddap/issues) Mange av dem er prosjekter du kan ta på. Hvis du vil jobbe med et problem, vennligst tilordne det til deg selv for å indikere til andre du jobber med det. GitHub-spørsmålet er det beste stedet å diskutere eventuelle spørsmål for hvordan man skal fortsette med arbeidet med det problemet.

- Hvis endringen du ønsker å gjøre er en av de nedenfor vanlige tilfellene, vennligst lag en [GitHub-spørsmål](https://github.com/ERDDAP/erddap/issues) angi hvilken endring du vil gjøre. Når endringen er fullført, gjør en trekkforespørsel om å be om fletting. De vanlige endringene inkluderer:

  - Du vil skrive en annen underklasse av EDDGrid eller EDDTable for å håndtere en annen type datakilde. I så fall anbefaler vi at du finner den nærmeste eksisterende underklassen og bruker koden som utgangspunkt.

  - Du vil skrive en annen SaveAs_FileType_ metode. I så fall anbefaler vi at du finner den nærmeste eksisterende SaveAs_FileType_-metoden i EDDGrid eller EDDTable og bruk koden som utgangspunkt.

Disse situasjonene har den fordelen at koden du skriver er selvstendig. Du trenger ikke å vite alle detaljene i ERDDAP Innvendig. Det vil være enkelt for oss å inkludere koden din i ERDDAP .. Legg merke til at hvis du sender inn kode, vil lisensen trenge kompatibel med ERDDAP™   [lisens](/license)   (f.eks. [Apache](https://www.apache.org/licenses/) , [BSD](https://www.opensource.org/licenses/bsd-license.php) , eller [MIT-X](https://www.opensource.org/licenses/mit-license.php) ) .. Vi vil presentere ditt bidrag i [kreditter](/credits) ..

- Hvis du har en funksjon som ikke er dekket over som du vil legge til i ERDDAP , det anbefales å først opprette en diskusjonstråd i [GitHub diskusjoner](https://github.com/ERDDAP/erddap/discussions/categories/ideas) .. For vesentlige funksjoner/endringer vil det tekniske styret diskutere dem og bestemme om å godkjenne å legge det til ERDDAP™ ..

###  **Å dømme dine kodebidrag**  {#judging-your-code-contributions} 
Hvis du vil sende inn kode eller andre endringer som skal inkluderes i ERDDAP Det er bra. Ditt bidrag må oppfylle visse kriterier for å bli akseptert. Hvis du følger retningslinjene nedenfor, øker du risikoene for at bidraget ditt blir akseptert.
   

  - Den ERDDAP™ Prosjektet styres av en NATD ( NOAA Utpekt teknisk direktør) Input fra et teknisk styre.
Fra 2007 (begynnelsen på ERDDAP ) 2022, det var Bob Simons (Også grunnleggeren-Leader) .. Fra januar 2023 er det Chris John. I utgangspunktet er NATD ansvarlig for ERDDAP S/s har det siste ordet om beslutninger om ERDDAP™ kode, spesielt om utformingen og om det vil bli akseptert eller ikke. Det må være slik delvis av effektivitetsgrunner (Det fungerer bra for Linus Torvalds og Linux) og delvis av sikkerhetsgrunner: Noen må fortelle IT-sikkerhet folk som han/hun tar ansvar for sikkerhet og integritet av koden.
     

  - NATD garanterer ikke at s/han vil godta koden din.
Hvis et prosjekt ikke fungerer så godt som vi hadde håpet, og hvis det ikke kan reddes, vil NATD ikke inkludere prosjektet i ERDDAP™ Fordeling. Ikke føler deg dårlig. Noen ganger fungerer ikke prosjektene så godt som håpet. Det skjer med alle programvareutviklere. Hvis du følger retningslinjene nedenfor, øker du risikoen for suksess.
     

  - Det er best om endringene er av generell interesse og nytte.
Hvis koden er spesifikk for organisasjonen din, er det sannsynligvis best å opprettholde en egen gren av ERDDAP™ til din bruk. Axiom gjør dette. Heldigvis gjør Git det enkelt. NATD ønsker å opprettholde en konsekvent visjon for ERDDAP , ikke la det bli et kjøkkenvask prosjekt der alle legger til en egen funksjon for prosjektet.
     

  - Følg Java Kodekonvensjoner.
Generelt bør koden din være god kvalitet og bør følge originalen [ Java Kodekonvensjoner](https://www.oracle.com/technetwork/java/codeconventions-150003.pdf) : sette .class filer på riktig sted i katalogstrukturen, gi .class filer et passende navn, inkluderer riktig Java Dokumentkommentarer, inkludere //kommentarer i begynnelsen av hvert punkt i kode, innrykk med 4 mellomrom (ikke fane) , unngå linjer &gt; 80 tegn, etc. Konvensjonene endres og kildekoden er ikke alltid helt oppdatert. Når du er i tvil, samsvare kode til konvensjonene og ikke eksisterende kode.

- Bruk beskrivende klasse, metode og variabelnavn.
Dette gjør koden lettere for andre å lese.
   

- Unngå fin kode.
I det lange løp må du eller andre finne ut koden for å opprettholde den. Så bruk enkle kodingsmetoder som er lettere for andre (Inkludert deg i fremtiden) å finne ut. Selvfølgelig, hvis det er en reell fordel å bruke noen fancy Java programmeringsfunksjonen, bruk den, men dokumenter mye hva du gjorde, hvorfor og hvordan den fungerer.
   

- Arbeid med det tekniske styret før du starter.
Hvis du håper å få kodeendringene trukket inn ERDDAP™ , Den tekniske styre vil definitivt ønsker å snakke om hva du skal gjøre og hvordan du skal gjøre det før du gjør noen endringer i koden. På den måten kan vi unngå at du gjør endringer som NATD til slutt ikke aksepterer. Når du gjør arbeidet, er NATD og teknisk styre villig til å svare på spørsmål som hjelper deg med å finne ut den eksisterende koden og (samlet) Hvordan håndtere prosjektet ditt.
   

- Arbeide uavhengig (Så mye som mulig) Når du starter.
I motsetning til det ovennevnte " Arbeid med det tekniske styret", etter at du har begynt på prosjektet, oppfordrer NATD deg til å jobbe så uavhengig som mulig. Hvis NATD må fortelle deg nesten alt og svare på mange spørsmål (Spesielt de som du kan ha svart ved å lese dokumentasjonen eller koden) , så innsatsen din er ikke en tidsbesparing for NATD og s/han kan like godt gjøre arbeidet dem selv. Det er den [Mytisk mann måned](https://en.wikipedia.org/wiki/The_Mythical_Man-Month) - Problem. Selvfølgelig bør vi fortsatt kommunisere. Det vil være bra å regelmessig se arbeidet ditt i gang for å sikre at prosjektet er på sporet. Jo mer du kan jobbe uavhengig (etter at det tekniske styret samtykker i oppgaven ved hånden og den generelle tilnærmingen) Jo bedre.
   

- Unngå feil.
Hvis en feil ikke er fanget før en utgivelse, forårsaker det problemer for brukerne (i beste fall) , returnerer feil informasjon (I verste fall) , er en blot på ERDDAP omdømme, og vil vare på utdatert ERDDAP™ installasjoner i årevis. Arbeid veldig hardt for å unngå feil. En del av dette er å skrive ren kode (Det er lettere å se problemer) .. En del av dette er å skrive enhetsprøver. En del av dette er en konstant holdning til feil unngåelse når du skriver kode. Ikke gjør NATD angre å legge koden til ERDDAP™ ..
   

- Skriv en enhetstest eller tester.
For ny kode, bør du skrive JUnit-test i en testfil.
Vennligst skriv minst én enkelt testmetode som grundig tester koden du skriver og legger den til i klassens JUnit-testfil slik at den kjører automatisk. Enhet (og relatert) tester er en av de beste måtene å fange bugs, i utgangspunktet, og i det lange løp (Som andre ting endres i ERDDAP™ ) .. Som Bob sa, - Enhetsprøver er det som lar meg sove om natten -
   

- Gjør det enkelt for NATD å forstå og godta endringene i trekkforespørselen.
En del av dette er å skrive en enhetstestmetode (s) .. En del av dette begrenser dine endringer til én del av koden (eller én klasse) om mulig. NATD vil ikke akseptere noen trekkforespørsel med hundrevis av endringer gjennom hele koden. NATD forteller it-sikkerhetsfolk som han tar ansvar for sikkerheten og integriteten til koden. Hvis det er for mange endringer eller de er for vanskelige å finne ut, så er det bare for vanskelig å bekrefte at endringene er riktige og ikke introduser feil eller sikkerhetsproblemer.
   

- Hold det enkelt.
Et godt tema for koden din er: Hold det enkelt. Enkel kode er lett for andre (Inkludert deg i fremtiden) å lese og vedlikeholde. Det er lett for NATD å forstå og dermed akseptere.
   

- Utfør langsiktig ansvar for koden din.
I det lange løp, det er best om du påtar deg løpende ansvar for å opprettholde koden din og svare på spørsmål om den (f.eks. i ERDDAP™ Google Group) .. Som noen forfattere merker, er kode et ansvar samt en aktiva. Hvis en feil oppdages i fremtiden, er det best hvis du fikser det fordi ingen kjenner koden bedre enn du (også slik at det er et incitament til å unngå bugs i første omgang) .. NATD ber ikke om en fast forpliktelse til å gi kontinuerlig vedlikehold. NATD sier bare at det å gjøre vedlikeholdet vil bli svært verdsatt.
