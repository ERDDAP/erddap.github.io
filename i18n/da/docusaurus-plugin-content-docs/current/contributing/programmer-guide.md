---
sidebar_position: 2
---

# Programmeringsguide

Disse er ting, som kun en programmør, der har til hensigt at arbejde med ERDDAP 's Java klasser skal vide.

###  **Sådan får du kildekoden**  {#getting-the-source-code} 
   

  - Via Source Code på GitHub
Kildekoden for de seneste offentlige versioner og in-udvikling versioner er også tilgængelig via [GitHub](https://github.com/ERDDAP) . Læs venligst læse [Wikimedia Commons](https://github.com/ERDDAP/erddap/wiki) for projektet. Hvis du vil ændre kildekoden (og muligvis har ændringerne indarbejdet i standarden ERDDAP™ distribution af distribution) , dette er den anbefalede tilgang.

###  ** ERDDAP™ afhængigheder**  {#erddap-dependencies} 
 ERDDAP™ bruger Maven til at indlæse kode afhængigheder samt nogle statiske referencefiler (WEB-INF/ref) . Dette gøres for at undgå at gemme mange store filer i lageret.
Du kan bruge `etcn kompilere` og det vil hente afhængigheder og nægte filer. Du kan også bruge `mvn pakke` at generere en krig fil.
Du kan manuelt downloade ref-filer:

  -  [\\_ice\\_g\\_i2 .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip) og unzip det ind /WEB-INF / .

  -  [ref \\_files .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip) og unzip det ind /WEB-INF / .

  -  [ErddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.1/erddapContent.zip)   (Version 1.0.0, 20333 bytes, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, af 2024-10-14-14-14) og indpakke det ind i _tomcat_, oprettelse _tomcat_/content/erddap .

BEMÆRK: Som standard vil Maven cache statisk reference og test data arkiv downloads og kun udtrække dem, når en ny version downloades. At springe hen over at downloade helt, kan du indstille `JumpResourceDownload` og/eller `JumpTestResourceDownload` ejendomme til Maven (f.eks. `mvn -DskipResourceDownload pakke` ) . For at styrke udsugning, sæt `-Ddownload.unpack=true` og og og `-Ddownload.unpackNårChanged=false` .

-  ERDDAP™ og dens underkomponenter har meget liberal, open-source [licenser](/license) , så du kan bruge og ændre kildekoden til ethvert formål, for-profit eller ikke-for-profit. Bemærk, at ERDDAP™ og mange underkomponenter har licenser, der kræver, at du anerkender kilden til den kode, du bruger. Se endnu [Credits](/credits) . Uanset om det er nødvendigt eller ej, er det bare god form til at anerkende alle disse bidragydere.
  

-  **Brug koden til andre projekter** 

Mens du er velkommen til at bruge dele af delene ERDDAP™ kode for andre projekter, advares om, at koden kan og vil ændre. Vi lover ikke at støtte andre anvendelser af vores kode. Git og GitHub vil være dine vigtigste løsninger til at håndtere dette - Git giver dig mulighed for at fusionere vores ændringer i dine ændringer.
   **I mange situationer, hvor du kan blive fristet til at bruge dele af ERDDAP™ i dit projekt, vi tror, du vil finde det meget nemmere at installere og bruge ERDDAP™ som er,** og derefter skrive andre tjenester, der bruger ERDDAP 's tjenester. Du kan oprette din egen ERDDAP™ installation er i en time eller to. Du kan oprette din egen ERDDAP™ installation på en poleret måde på et par dage (Afhængigt af antallet og kompleksiteten af dine datasæt) . Men hacking af dele af ERDDAP™ for dit eget projekt er sandsynligt at tage uger (og måneder til at fange finesser) og du vil miste evnen til at indarbejde ændringer og fejlrettelser fra efterfølgende ERDDAP™ udgivelser. Vi vi vi vi (selvfølgelig) tror der er mange fordele at bruge ERDDAP™ som er og gør din ERDDAP™ Installation af offentligt tilgængelige. Men i nogle tilfælde, vil du muligvis ikke gøre din ERDDAP™ Installation af offentligt tilgængelige. Så kan din tjeneste få adgang til og bruge din private ERDDAP™ og dine kunder behøver ikke vide om ERDDAP™ .

  ####  **Halvvejs** 

Eller der er en anden tilgang, som du kan finde nyttige, som er halvvejs mellem at trække ind ERDDAP 's kode og brug ERDDAP™ som en selvstændig webtjeneste: I EDD-klassen er der en statisk metode, der lader dig foretage en forekomst af et datasæt (baseret på specifikationen datasets.xml ) :
`oneFraDataset Xml (Streng tDatasetID) 
"Det returnerer en forekomst af en EDDTabel eller EDDGrid Datasæt. I betragtning af, at du kan ringe til \\
‘makeNewFileForDapQuery (String brugerDapQuery, String dir, String filnavn, String fil Typenavn) 
‘at fortælle instansen til at lave en datafil, af en bestemt filType, med resultaterne fra en brugerforespørgsel. Dette er således en simpel måde at bruge ERDDAP 's metoder til at anmode data og få en fil i svar, ligesom en klient ville bruge den ERDDAP™ web ansøgning. Men denne tilgang arbejder inden for jeres Java program og omgå behovet for en applikationsserver som Tomcat. Vi bruger denne tilgang til mange af enhedstestene af EDDTable og EDDGrid subclasses, så du kan se eksempler på dette i kildekoden for alle disse klasser.

###  **Udviklingsmiljø**  {#development-environment} 

  - Der er konfigurationer til [Jetty](https://github.com/ERDDAP/erddap/blob/main/development/jetty) og og og [Docker](https://github.com/ERDDAP/erddap/blob/main/development/docker) I GitHub forventes udgivelser at køre i Tomcat.

  -  **Valgfrit ekstraudstyr** : Opsæt op ERDDAP™ I nærheden af Tomcat\\
Siden ERDDAP™ er primært beregnet til at være en servlet, der kører i Tomcat, vi anbefaler stærkt, at du følger standarden [installationsvejledning](/docs/server-admin/deploy-install) at installere Tomcat, og derefter installere ERDDAP™ i Tomcats webapps-katalog. Blandt andet, ERDDAP™ blev designet til at blive installeret i Tomcats mappe struktur og forventer Tomcat at give nogle .jar filer.

  -  ERDDAP™ kræver ikke en specifik IDE (Chris bruger primært Visual Studio Code, Bob brugte EditPlus) . Vi bruger ikke Eclipse, Ant osv.; og vi tilbyder heller ikke ERDDAP -relateret støtte til dem. Projektet bruger Maven.

  - Vi bruger en batch-fil, der sletter alle .class-filer i kildetræet for at sikre, at vi har en ren kompilere (med javac) .

  - Vi bruger i øjeblikket Adoptiums javac jdk-25.0.1+8 til at kompilere gov.noaa.pfeg.coastwatch.TestAll (det har links til et par klasser, der ikke ville blive kompileret ellers) og køre testen. Af sikkerhedsmæssige årsager er det næsten altid bedst at bruge de nyeste versioner af Java 25 og Tomcat 10.

    - Når vi kører javac eller java, er den nuværende mappe _tomcat_/webapps/erddap/WEB-INF.

    - Vores javac og java klassepat er
       `klasser;../../lib/servlet-api.jar;lib/*` 

    - Så din javac kommandolinje vil være noget som \\
       `javac -encoding UTF-8 -cp klasser;../../../lib/servlet-api.jar;lib/* klasser/gov/noaa/pfel/coastwatch/TestAll.java` 

    - Og din java kommandolinje vil være noget som \\
`java -cp klasser;../../lib/servlet-api.jar;lib/* -Xmx4000M -Xms4000M klasser/gov/noaa/pfel/coastwatch/TestAll
       `Valgfrit: Du kan tilføje` -verbose:gc`, som fortæller Java til at udskrive affaldsopsamlingsstatistik.

    - Hvis test Alle kompilerer, alt ERDDAP™ Der er udarbejdet behov. Et par klasser kompileres, der ikke er nødvendige for at ERDDAP™ . Hvis du kompilerer TestAll lykkes, men ikke kompilere nogle klasse, er denne klasse ikke nødvendig. (Der er nogle ubehandlede klasser.) 

  - I et par tilfælde bruger vi 3. parts kildekode i stedet for .jar filer (særligt for DODS ) og har ændret dem lidt for at undgå problemer med at kompilere med Java 25. Vi har ofte lavet andre små ændringer (særligt til DODS ) af andre grunde.

  - De fleste klasser har testmetoder i deres tilknyttede src/test-fil. Du kan køre JUnit-testerne med `mvn test` kommando. Dette vil downloade flere zip-filer af data, som testen er afhængige af fra den seneste udgivelse af [ ERDDAP /erddap Test af test](https://github.com/ERDDAP/erddapTest/releases/) .\\
     
BEMÆRK: Maven caches downloads, men vil unzip de downloadede arkiver på hver udførelse, som tager tid. Sådan springes
og unzipping testdata arkiver, kan du angive `JumpTestResourceDownload` Ejendomme til Maven (f.eks. `mvn -DskipTestResourceDownload pakke` ) .

###   **Vigtige klasser**  {#important-classes} 

Hvis du vil se på kildekoden og forsøge at finde ud af, hvordan ERDDAP™ Vær venlig at gøre.

  - Koden har Java Doc kommentarer, men Java Docs er ikke blevet genereret. Du er velkommen til at generere dem.

  - De vigtigste klasser (herunder dem, der er nævnt nedenfor) er inden for gov/noaa/pfel/erddap.

  - The The The The The The The ERDDAP™ klasse har de højeste niveau metoder. Det udvider HttpServlet.

  -  ERDDAP™ anmodninger om forekomster af underklasser af EDDGrid eller EDDTable, som repræsenterer individuelle datasæt.

  - EDStatic har de fleste af de statiske oplysninger og indstillinger (f.eks. fra opsætningen.xml og meddelelser.xml-filer) og tilbyder statiske tjenester (f.eks. sende e-mails) .

  -  EDDGrid og EDDTable subclasses parse anmodningen, få data fra subclass-specifikke metoder, og derefter formatere dataene for svaret.

  -  EDDGrid Underklasser skubbe data til GridDataAccessor (den interne databeholder til gitterded data) .

  - EDDTable subclasses skubber data ind i TableWriter subclasses, som skriver data til en bestemt filtype på farten.

  - Andre klasser (f.eks. lav niveau klasser) er også vigtigt, men det er mindre sandsynligt, at du vil arbejde for at ændre dem.
     

###  **Kodebidrag**  {#code-contributions} 

- GitHub problemer
Hvis du gerne vil bidrage, men ikke har et projekt, kan du se listen over [GitHub problemer](https://github.com/ERDDAP/erddap/issues) , mange af hvilke projekter du kunne tage på. Hvis du vil arbejde på et problem, skal du tildele det til dig selv for at angive andre, du arbejder på det. GitHub-problemet er det bedste sted at diskutere eventuelle spørgsmål for, hvordan man kan fortsætte med at arbejde på problemet.

- Hvis den ændring, du gerne vil gøre, er en af de nedenstående fælles sager, skal du oprette en [GitHub Issue](https://github.com/ERDDAP/erddap/issues) angiver den ønskede ændring. Så når ændringen er færdig, skal du foretage en pull anmodning om at anmode om fusioneren. De almindelige ændringer omfatter:

  - Du ønsker at skrive en anden underklasse af EDDGrid eller EDDTable at håndtere en anden datakilde type. Hvis det er tilfældet, anbefaler vi, at du finder den nærmeste eksisterende underklasse og bruger koden som udgangspunkt.

  - Du ønsker at skrive en anden SaveAs_FileType_ metode. Hvis det er tilfældet, anbefaler vi, at du finder den nærmeste eksisterende SaveAs_FileType_ metode i EDDGrid eller EDDTable og brug koden som udgangspunkt.

Disse situationer har den fordel, at den kode, du skriver, er selvstændig. Du behøver ikke at vide alle detaljer om ERDDAP 's interne. Og det vil være nemt for os at indarbejde din kode i ERDDAP . Bemærk, at hvis du indsender kode, skal licensen være kompatibel med licensen ERDDAP™   [licenslicens](/license)   (fx, [Apache Apache](https://www.apache.org/licenses/) , [BSD](https://www.opensource.org/licenses/bsd-license.php) eller [MIT-X](https://www.opensource.org/licenses/mit-license.php) ) . Vi vil liste dit bidrag på [kreditter](/credits) .

- Hvis du har en funktion ikke dækket over, at du gerne vil tilføje til ERDDAP , det anbefales at først oprette en diskussionstråd i den [GitHub diskussioner](https://github.com/ERDDAP/erddap/discussions/categories/ideas) . For væsentlige funktioner/ændringer vil den tekniske bestyrelse diskutere dem og beslutte, om du vil godkende tilføjelsen til det ERDDAP™ .

###  **Vurderinger af din kode**  {#judging-your-code-contributions} 
Hvis du vil indsende kode eller andre ændringer, der skal medtages i ERDDAP , det er fantastisk. Dit bidrag skal opfylde visse kriterier for at blive accepteret. Hvis du følger retningslinjerne nedenfor, kan du øge chancerne for dit bidrag blive accepteret.
   

  - The The The The The The The ERDDAP™ Projektet administreres af en NATD ( NOAA Udpeget teknisk direktør) med input fra en teknisk bestyrelse.
Fra 2007 (begyndelsen af ERDDAP ) gennem 2022, der var Bob Simons (også grundlæggeren-Leader) . Begyndende i januar 2023, det er Chris John. Dybest set er NATD ansvarlig for ERDDAP , så s/he har det endelige ord om beslutninger om ERDDAP™ kode, især om designet og om en given pull anmodning vil blive accepteret eller ej. Det skal være på denne måde delvist af effektive årsager (det virker fantastisk til Linus Torvalds og Linux) og dels af sikkerhedsmæssige årsager: Nogen skal fortælle IT-sikkerhedsfolk, der s/he tager ansvar for sikkerheden og integriteten af koden.
     

  - NATD garanterer ikke, at s/he vil acceptere din kode.
Hvis et projekt bare ikke virker ud, og vi havde håbet, og hvis det ikke kan blive løftet, vil NATD ikke inkludere projektet i projektet i projektet ERDDAP™ distribution. Du føler ikke dårligt. Nogle gange arbejder projekter ikke ud og håber. Det sker for alle softwareudviklere. Hvis du følger nedenstående retningslinjer, øger du dine chancer for succes.
     

  - Det er bedst, hvis ændringerne er af generel interesse og anvendelighed.
Hvis koden er bestemt til din organisation, er det sandsynligvis bedst at opretholde en separat gren af ERDDAP™ til din brug. Axiom gør dette. Heldigvis gør Git det nemt at gøre. NATD ønsker at opretholde en konsekvent vision for ERDDAP , ikke tillade det at blive et køkkenvask projekt, hvor alle tilføjer en brugerdefineret funktion til deres projekt.
     

  - Følg instruktionerne på skærmen Java Code Konventioner.
Generelt skal din kode være god kvalitet og skal følge originalen [ Java Code Konventioner](https://www.oracle.com/technetwork/java/codeconventions-150003.pdf) : sætte .class filer i det rigtige sted i mappen struktur, give .class filer et passende navn, omfatter ordentlig Java Doc kommentarer, omfatter //komster i starten af hvert afsnit af kode, indrykning med 4 mellemrum (Ingen fane) , undgå linjer &gt;80 tegn osv. Konventioner ændres og kildekoden er ikke altid helt opdateret. Når du er i tvivl, skal du matche koden til konventionerne og ikke eksisterende kode.

- Brug beskrivende klasse, metode og variable navne.
Det gør koden nemmere for andre at læse.
   

- Undgå fancy kode.
I det lange løb skal du eller andre mennesker finde ud af koden for at opretholde det. Så brug venligst enkle kodningsmetoder, der dermed er lettere for andre (herunder dig i fremtiden) at finde ud af. Naturligvis, hvis der er en reel fordel at bruge nogle fancy Java programmeringsfunktion, brug det, men i vid udstrækning dokumentere, hvad du gjorde, hvorfor og hvordan det virker.
   

- Arbejd med det tekniske Board, før du starter.
Hvis du håber at få dine kodeændringer trukket ind ERDDAP™ , Den tekniske bestyrelse vil helt sikkert gerne tale om, hvad du skal gøre, og hvordan du skal gøre det, før du foretager ændringer i koden. På den måde kan vi undgå, at du foretager ændringer, som NATD, i sidste ende, ikke accepterer. Når du gør arbejdet, er NATD og Technical Board villig til at besvare spørgsmål for at hjælpe dig med at finde ud af den eksisterende kode og (Samlet set) hvordan du håndterer dit projekt.
   

- Arbejd selvstændigt (så meget som muligt) efter du starter.
I modsætning til ovenstående "Work with te Technical Board", efter du er begyndt på projektet, opfordrer NATD dig til at arbejde så selvstændigt som muligt. Hvis NATD skal fortælle dig næsten alt og svare på mange spørgsmål (især dem, du kunne have besvaret ved at læse dokumentationen eller koden) , så din indsats ikke er en tidsbesparelse for NATD og s/he kan også gøre arbejdet dem selv. Det er det [Mytisk mand måned](https://en.wikipedia.org/wiki/The_Mythical_Man-Month) problem. Selvfølgelig bør vi stadig kommunikere. Det ville være fantastisk til periodisk at se dit arbejde i fremskridt for at sikre, at projektet er på vej. Men jo mere du kan arbejde selvstændigt (efter den tekniske bestyrelse accepterer opgaven ved hånden og den generelle tilgang) , jo bedre.
   

- Undgå fejl.
Hvis en fejl ikke er fanget før en udgivelse, forårsager det problemer for brugerne (Bedst til bedste) , returnere de forkerte oplysninger (værste i værste fald) , er en slet på ERDDAP 's ry, og vil fortsætte på forældet ERDDAP™ installationer i årevis. Arbejd meget hårdt for at undgå bugs. En del af dette er at skrive ren kode (så det er nemmere at se problemer) . En del af dette er skrive enhedstest. En del af dette er en konstant holdning til fejl undgåelse, når du skriver kode. Gør ikke NATD fortryde at tilføje din kode til ERDDAP™ .
   

- Skriv en enhedstest eller test.
For ny kode skal du skrive JUnit tests i en testfil.
Skriv mindst en individuel testmetode, der grundigt tester den kode, du skriver, og tilføj den til klassens JUnit testfil, så den kører automatisk. En enheds enhed (og relateret) tests er en af de bedste måder at fange bugs, i første omgang og på lang sigt (som andre ting ændrer sig i ERDDAP™ ) . Da Bob sagde, "Unit tests er, hvad lader mig sove om natten."
   

- Gør det nemt for NATD at forstå og acceptere ændringerne i din pull-forespørgsel.
En del af det er at skrive en enhedstest metode (s s s) . En del af dette begrænser dine ændringer til et afsnit af kode (eller en klasse) hvis det er muligt. NATD vil ikke acceptere nogen pull anmodning med hundredvis af ændringer i koden. NATD fortæller de IT-sikkerhedsfolk, der s/he tager ansvar for sikkerheden og integriteten af koden. Hvis der er for mange ændringer, eller de er for svært at finde ud af, så er det bare for svært at kontrollere ændringerne er korrekte og ikke introducere fejl eller sikkerhedsproblemer.
   

- Hold den enkel.
Et godt overordnet tema for din kode er: Hold den enkel. Enkel kode er let for andre (herunder dig i fremtiden) at læse og vedligeholde. Det er nemt for NATD at forstå og dermed acceptere.
   

- Overdrag langsigtet ansvar for din kode.
I det lange løb er det bedst, hvis du antager løbende ansvar for at opretholde din kode og besvare spørgsmål om det (f.eks. i te ERDDAP™ Google Group) . Som nogle forfattere bemærker, er kode et ansvar samt et aktiv. Hvis en fejl er opdaget i fremtiden, er det bedst, hvis du løser det, fordi ingen kender din kode bedre end dig (også så der er et incitament til at undgå bugs på det første sted) . NATD beder ikke om et fast tilsagn om løbende vedligeholdelse. NATD siger bare, at vedligeholdelsen vil blive meget værdsat.
