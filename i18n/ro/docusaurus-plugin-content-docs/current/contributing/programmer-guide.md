---
sidebar_position: 2
---

# Ghidul programatorului

Acestea sunt lucruri pe care doar un programator care intenționează să lucreze cu ERDDAP 's Java Cursurile trebuie să ştie.

###  **Obținerea codului sursă**  {#getting-the-source-code} 
   

  - Prin codul sursă al GitHub
Codul sursă pentru versiunile publice recente și versiunile în dezvoltare este de asemenea disponibil prin intermediul [GitHub](https://github.com/ERDDAP) . Vă rugăm să citiţi [Wiki](https://github.com/ERDDAP/erddap/wiki) pentru acel proiect. Dacă doriți să modificați codul sursă (și eventual au modificările încorporate în standard ERDDAP™ distribuţie) Aceasta este abordarea recomandată.

###  ** ERDDAP™ dependențe**  {#erddap-dependencies} 
 ERDDAP™ folosește Maven pentru a încărca dependențe cod, precum și unele fișiere de referință statice (WEB-INF/REF) . Acest lucru se face pentru a evita stocarea mai multor fișiere mari în depozit.
Poţi folosi `mvn compilare` şi asta va aduce dependenţele şi dosarele. De asemenea, puteți folosi `pachet mvn` pentru a genera un dosar de război.
Puteți descărca manual fișierele ref:

  -  [Etopo1_ice\\_g\\_i2 .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip) şi desface-l în /WEB-INF/ref/ .

  -  [fișiere ref\\_ .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip) şi desface-l în /WEB-INF/ref/ .

  -  [erddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.1/erddapContent.zip)   (versiunea 1.0.0, 20333 octeți, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, datată 2024-10-14) și desfaceți-l în _tomcat_, creând _tomcat_/content/erddap .

NOTĂ: În mod implicit, Maven va înregistra referințe statice și va testa descărcarea arhivei datelor și le va extrage numai atunci când o nouă versiune este descărcată. Pentru a sări peste descărcarea în întregime, puteți seta `SkipResourceDownload` și/sau `SkipTestResourceDownload` proprietăți către Maven (De exemplu: `mvn -DskipResourceDescarcă pachetul` ) . Pentru a forța extracția, set `-Ddownload.unpack=adevărat` şi `-Ddownload.unpack WhenChanged=fals` .

-  ERDDAP™ şi subcomponentele sale au o sursă foarte liberală [licențe](/license) , astfel încât să puteți utiliza și modifica codul sursă pentru orice scop, pentru-profit sau non-profit. Notă: ERDDAP™ și multe subcomponente au licențe care necesită să recunoașteți sursa codului pe care îl utilizați. Vezi? [Credite](/credits) . Fie că este necesar sau nu, este doar o formă bună pentru a recunoaște toți acești contribuitori.
  

-  **Utilizarea codului pentru alte proiecte** 

În timp ce sunteți binevenit să utilizați părți ale ERDDAP™ cod pentru alte proiecte, fiţi avertizaţi că codul poate şi se va schimba. Nu promitem să sprijinim alte utilizări ale codului nostru. Git şi GitHub vor fi principalele soluţii pentru a face faţă acestei situaţii -- Git vă permite să fuzionaţi modificările noastre cu modificările dumneavoastră.
   **Pentru multe situații în care s-ar putea fi tentat să folosească părți din ERDDAP™ în proiectul dumneavoastră, credem că veţi găsi mult mai uşor de instalat şi utilizat ERDDAP™ așa cum este,** și apoi scrie alte servicii care utilizează ERDDAP Serviciile lui. Puteți configura propria ta ERDDAP™ instalarea brută într-o oră sau două. Puteți configura propria ta ERDDAP™ instalare în mod lustruit în câteva zile (în funcție de numărul și complexitatea seturilor de date) . Dar hacking părți din ERDDAP™ pentru proiectul dumneavoastră este probabil să dureze săptămâni (şi luni pentru a prinde subtilităţi) și veți pierde capacitatea de a include modificări și soluții bug de la următoarele ERDDAP™ Eliberari. Noi (Evident.) cred că există multe beneficii pentru utilizarea ERDDAP™ cum este și de a face dumneavoastră ERDDAP™ instalare accesibilă publicului. Cu toate acestea, în unele circumstanțe, s-ar putea să nu doriți să facă dvs. ERDDAP™ instalare accesibilă publicului. Apoi, serviciul dvs. poate accesa și utiliza dvs. privat ERDDAP™ si clientii tai nu trebuie sa stie despre ERDDAP™ .

  ####  **La jumătatea drumului** 

Sau, există o altă abordare pe care s-ar putea găsi util, care este la jumătatea distanţei între căutarea în ERDDAP Codul și utilizarea ERDDAP™ ca serviciu web independent: În clasa EDD, există o metodă statică care vă permite să faceți o instanță de un set de date (pe baza caietului de sarcini datasets.xml ) :
One From Daysset Xml (Siring tDatesetID) 
Se întoarce o instanță a unui tabel EDD sau EDDGrid Set de date. Având în vedere acest caz, puteți apela\\
Face NewFileForDapQuery (Siring userDapQuery, String dir, String fileName, String file Nume tip) 
 Astfel, aceasta este o modalitate simplă de a utiliza ERDDAP metodele de a solicita date și de a obține un fișier ca răspuns, la fel cum ar folosi un client ERDDAP™ aplicație web. Dar această abordare funcționează în interiorul dumneavoastră Java program și ocolește necesitatea unui server de aplicații ca Tomcat. Folosim această abordare pentru multe dintre testele unitare ale EDDtable și EDDGrid subclase, astfel încât să puteți vedea exemple de acest lucru în codul sursă pentru toate aceste clase.

###  **Mediu de dezvoltare**  {#development-environment} 

  - Există configuraţii pentru [Jetty](https://github.com/ERDDAP/erddap/blob/main/development/jetty) şi [Docker](https://github.com/ERDDAP/erddap/blob/main/development/docker) în GitHub, deși este de așteptat ca lansările să aibă loc în Tomcat.

  -  **Opțional** : Configurați ERDDAP™ în Tomcat\\
De când ERDDAP™ este destinat in principal sa fie o serveta care rulează în Tomcat, vă recomandăm cu tărie să urmați standardul [instrucțiuni de instalare](/docs/server-admin/deploy-install) pentru a instala Tomcat, și apoi instala ERDDAP™ în directorul lui Tomcat. Printre altele, ERDDAP™ a fost proiectat pentru a fi instalat în structura directoarei Tomcat și se așteaptă ca Tomcat să furnizeze unele fișiere .jar.

  -  ERDDAP™ nu necesită o IDE specifică (Chris utilizează în principal codul Visual Studio, Bob a folosit EditPlus) . Noi nu folosim Eclipse, Ant, etc; nici nu oferim ERDDAP - sprijin asociat pentru ei. Proiectul foloseşte Maven.

  - Folosim un fișier lot care șterge toate fișierele .class din arborele sursă pentru a ne asigura că avem o compilație curată (cu javac) .

  - În prezent folosim javac jdk-25.0.1+8 pentru a compila gov.noaa.pfeg.coastwatch.testAll (are legături cu câteva clase care nu ar fi compilate altfel) Şi fă testele. Din motive de securitate, este aproape întotdeauna cel mai bine să utilizați cele mai recente versiuni ale Java 25 şi Tomcat 10.

    - Când rulăm javac sau java, directorul curent este _tomcat_/webapps/erddap/WEB-INF.

    - Clasa noastră Javava şi Java este
       `clase;./../../lib/servlet-api.jar;lib/*` 

    - Deci linia de comandă Javac va fi ceva de genul
       `Javac-incoding UTF-8 -cp class;../../../lib/servlet-api.jar;lib/* classs/gov/noa/pfel/coastwatch/Testall.java` 

    - Şi linia de comandă Java va fi ceva de genul
 clase/gov/noaa/pfel/coastwatch/TestAll
       `Opțional: puteți adăuga` -verbose:gc Java pentru a imprima statistici privind colectarea gunoiului.

    - Dacă testul Toate compilaţiile, totul ERDDAP™ au fost elaborate nevoi. Câteva clase sunt compilate care nu sunt necesare pentru ERDDAP™ . Dacă compilarea TestAll reușește, dar nu compila o anumită clasă, acea clasă nu este necesară. (Există câteva clase neterminate/nefolosite.) 

  - În câteva cazuri, folosim codul sursă 3rd Party în loc de fișiere .jar (în special pentru DODS ) și le-au modificat ușor pentru a evita problemele de compilare cu Java 25. Am făcut de multe ori alte mici modificări (în special DODS ) din alte motive.

  - Cele mai multe clase au metode de testare în dosarul asociat Src/test. Puteți rula testele Junit cu `Încercarea mvn` Comanda. Acest lucru va descărca mai multe fişiere zip de date pe care testele se bazează de la ultima versiune de [ ERDDAP /erddap Test](https://github.com/ERDDAP/erddapTest/releases/) .\\
     
NOTĂ: Maven caches descarcă, dar va deschide arhivele descărcate pe fiecare execuție, care necesită timp. Pentru a sări peste descărcarea
și deschiderea arhivelor de date de testare, puteți specifica `SkipTestResourceDownload` proprietate către Maven (De exemplu: `mvn -DskipTestResourceDescarcă pachetul` ) .

###   **Clase importante**  {#important-classes} 

Dacă doriți să se uite la codul sursă și să încerce să dau seama cum ERDDAP™ Merge, te rog.

  - Codul are Java Doc comentarii, dar Java Docs nu au fost generate. Poţi să le generezi.

  - Cele mai importante clase (inclusiv cele menţionate mai jos) sunt în interiorul gov/noaa/pfel/erddap.

  - ă ERDDAP™ Clasa are cele mai înalte metode. Se extinde HttpServlet.

  -  ERDDAP™ trece cererile la cazurile de subclase de EDDGrid sau tabelul EDD, care reprezintă seturi de date individuale.

  - EDStatic are cele mai multe dintre informațiile și setările statice (de exemplu, din fișierele setup.xml și mesaje.xml) și oferă servicii statice (de exemplu, trimiterea de e-mailuri) .

  -  EDDGrid și subclase EDDtable pars cererea, obține date de la metode specifice subclase, apoi formatați datele pentru răspuns.

  -  EDDGrid subclase împinge date în GridDataAccesor (containerul de date interne pentru date în rețea) .

  - Subclasele EDD Table introduc date în subclasele TableWriter, care scriu date într-un anumit tip de fişier.

  - Alte clase (De exemplu, clase de nivel scăzut) sunt, de asemenea, importante, dar este mai puțin probabil că veți lucra pentru a le schimba.
     

###  **Contribuţii de cod**  {#code-contributions} 

- Probleme GitHub
Dacă doriți să contribuie, dar nu au un proiect, a se vedea lista de [Probleme GitHub](https://github.com/ERDDAP/erddap/issues) , multe dintre care sunt proiecte ai putea lua pe. Dacă doriţi să lucraţi la o problemă, vă rugăm să o atribuiţi dumneavoastră pentru a indica altora că lucraţi la aceasta. Problema GitHub este cel mai bun loc pentru a discuta orice întrebări pentru a continua cu munca pe această temă.

- Dacă schimbarea pe care doriți să o faceți este una dintre cazurile comune de mai jos, vă rugăm să creați o [Problema GitHub](https://github.com/ERDDAP/erddap/issues) indicând schimbarea pe care intenţionaţi să o faceţi. Apoi, odată ce schimbarea este completă, face o cerere de tragere pentru a solicita unirea. Modificările comune includ:

  - Vrei să scrii o altă subclasă de EDDGrid sau tabelul EDD pentru a gestiona un alt tip de sursă de date. Dacă da, vă recomandăm să găsiți cea mai apropiată subclasă existentă și să utilizați acest cod ca punct de plecare.

  - Doriți să scrieți o altă metodă SaveAs_FileType_. Dacă da, vă recomandăm să găsiți cea mai apropiată metodă de salvare existentăAs_FileType_ în EDDGrid fie tabelul EDD și utilizați codul ca punct de plecare.

Aceste situații au avantajul că codul pe care îl scrieți este autonom. Nu va trebui să ştii toate detaliile ERDDAP E ceva intern. Și va fi ușor pentru noi să încorporăm codul în ERDDAP . Rețineți că, dacă depuneți codul, licența va avea nevoie de compatibil cu ERDDAP™   [licență](/license)   (de exemplu, [Apache](https://www.apache.org/licenses/) , [BSD](https://www.opensource.org/licenses/bsd-license.php) , sau [MIT-X](https://www.opensource.org/licenses/mit-license.php) ) . Vom lista contribuția în [credite](/credits) .

- Dacă aveți o caracteristică care nu este acoperită mai sus, la care ați dori să adăugați ERDDAP , este recomandat să se creeze mai întâi un fir de discuție în [Discuţii GitHub](https://github.com/ERDDAP/erddap/discussions/categories/ideas) . Pentru caracteristici/modificări semnificative, consiliul tehnic le va discuta și va decide dacă să aprobe adăugarea acestuia la ERDDAP™ .

###  **Judecând contribuțiile de cod**  {#judging-your-code-contributions} 
Dacă doriți să prezentați codul sau alte modificări care trebuie incluse în ERDDAP E grozav. Contribuția dumneavoastră trebuie să îndeplinească anumite criterii pentru a fi acceptată. Dacă urmaţi instrucţiunile de mai jos, creşteţi considerabil şansele ca contribuţia dumneavoastră să fie acceptată.
   

  - ă ERDDAP™ Proiectul este gestionat de NATD ( NOAA Director tehnic desemnat) cu informații de la un consiliu tehnic.
Din 2007 (începutul ERDDAP ) prin 2022, acela era Bob Simons. (De asemenea, fondatorul-lider) . Începând din ianuarie 2023, acesta este Chris John. Practic, NATD este responsabil pentru ERDDAP , deci s / el are cuvântul final despre decizii ERDDAP™ codul, în special în ceea ce privește proiectul și dacă o anumită cerere de retragere va fi acceptată sau nu. Acesta trebuie să fie în acest fel parțial din motive de eficiență (functioneaza foarte bine pentru Linus Torvalds si Linux) și parțial din motive de securitate: Cineva trebuie să spună oamenilor de la securitatea IT că îşi asumă responsabilitatea pentru securitatea şi integritatea codului.
     

  - NATD nu garantează că va accepta codul tău.
Dacă un proiect pur și simplu nu funcționează la fel de bine ca am sperat și dacă nu poate fi salvat, NATD nu va include proiectul în ERDDAP™ distribuţie. Te rog să nu te simţi prost. Uneori proiectele nu funcţionează la fel de bine cum speram. Se întâmplă tuturor dezvoltatorilor de software. Dacă urmaţi instrucţiunile de mai jos, creşteţi mult şansele de succes.
     

  - Este mai bine dacă schimbările sunt de interes general și utilitate.
Dacă codul este specific organizației dumneavoastră, este, probabil, cel mai bine pentru a menține o ramură separată de ERDDAP™ pentru uzul dumneavoastră. Axiom face asta. Din fericire, Git face acest lucru ușor de făcut. NATD vrea să mențină o viziune consecventă pentru ERDDAP , nu permite să devină un proiect chiuveta bucătărie în cazul în care toată lumea adaugă o caracteristică personalizată pentru proiectul lor.
     

  - Urmează Java Convenţii de Cod.
În general, codul dumneavoastră ar trebui să fie de bună calitate și ar trebui să urmeze originalul [ Java Convenții de cod](https://www.oracle.com/technetwork/java/codeconventions-150003.pdf) : pune fișiere .class în locul potrivit în structura director, da .class fișiere un nume adecvat, include adecvat Java Comentarii Doc, includ //comentarii la începutul fiecărui punct de cod, liniuță cu 4 spații (nu tab) , evita liniile &gt;80 caractere, etc. Convențiile se schimbă și codul sursă nu este întotdeauna complet actualizat. Atunci când există îndoieli, se potrivește cu codul convențiilor și nu există codul existent.

- Utilizați clase descriptive, metode și nume variabile.
Asta face codul mai uşor de citit pentru alţii.
   

- Evitați codul fantezie.
Pe termen lung, tu sau alte persoane va trebui să dau seama codul pentru a-l menține. Deci, vă rugăm să utilizați metode simple de codificare care sunt astfel mai ușor pentru alții (inclusiv tu în viitor) să-mi dau seama. Evident, dacă există un avantaj real de a folosi unele fantezie Java caracteristică de programare, utilizați-l, dar documentați pe scară largă ceea ce ai făcut, de ce, și cum funcționează.
   

- Lucrează cu Consiliul Tehnic înainte de a începe.
Dacă sperați să obțineți modificările de cod tras în ERDDAP™ , Consiliul Tehnic va dori cu siguranta sa vorbeasca despre ceea ce ai de gand sa faci si cum o vei face inainte de a face orice modificari ale codului. În acest fel, putem evita să faci schimbări pe care NATD, în cele din urmă, nu le acceptă. Atunci când faci munca, NATD și Comitetul tehnic este dispus să răspundă la întrebări pentru a vă ajuta să dau seama codul existent și (global) cum să abordezi proiectul.
   

- Lucrează independent (cât mai mult posibil.) după ce începi.
Spre deosebire de "Lucrarea cu Consiliul Tehnic" de mai sus, după ce ați început proiectul, NATD vă încurajează să lucrați cât mai independent posibil. Dacă NATD trebuie să-ţi spună aproape totul şi să răspundă la multe întrebări (mai ales cele la care ai fi putut răspunde citind documentația sau codul) , atunci eforturile tale nu sunt o economie de timp pentru NATD și s / el ar putea face la fel de bine munca ei înșiși. Este [Luna om mitic](https://en.wikipedia.org/wiki/The_Mythical_Man-Month) problemă. Desigur, ar trebui să comunicăm. Ar fi minunat să vedem periodic activitatea dumneavoastră în curs pentru a vă asigura că proiectul este pe drumul cel bun. Dar cu cât poţi lucra mai mult independent (după ce comitetul tehnic este de acord cu privire la sarcina în cauză și abordarea generală) Cu cât mai bine.
   

- Evitaţi insectele.
În cazul în care un bug nu este prins înainte de o eliberare, provoacă probleme pentru utilizatori (cel mult) , returnează informațiile greșite (cel mai rău) , este o pata pe ERDDAP reputatia lui, si va persista pe out-of-date ERDDAP™ instalații de ani de zile. Munca foarte greu pentru a evita bug-uri. O parte din acest lucru este scris cod curat (deci este mai uşor să vezi probleme) . O parte din aceasta este scris teste unitate. O parte din aceasta este o atitudine constantă de evitare a insectelor atunci când scrie cod. Nu face NATD regret adăugarea codului la ERDDAP™ .
   

- Scrie un test sau teste unitate.
Pentru un nou cod, ar trebui să scrieți testele JUnit într-un fișier de testare.
Vă rugăm să scrieți cel puțin o metodă individuală de testare care testează în detaliu codul pe care îl scrieți și îl adăugați la fișierul de testare JUnit al clasei, astfel încât acesta să fie rulat automat. Unitate (și legate) Testele sunt una dintre cele mai bune modalități de a prinde bug-uri, inițial, și pe termen lung (ca alte lucruri schimba in ERDDAP™ ) . Aşa cum a spus Bob, "Anchetele de Unităţi mă lasă să dorm noaptea."
   

- Fă-l ușor pentru NATD să înțeleagă și să accepte modificările în cererea dumneavoastră de tragere.
O parte din aceasta este scrierea unei metode de încercare unitare (s) . O parte din aceasta este limitarea modificărilor la o secțiune de cod (sau o singură clasă) dacă este posibil. NATD nu va accepta nici o cerere de tragere cu sute de modificări în tot codul. NATD spune oamenilor de securitate IT că şi-a asumat responsabilitatea pentru securitatea şi integritatea codului. Dacă există prea multe schimbări sau sunt prea greu de dat seama, atunci este prea greu pentru a verifica modificările sunt corecte și nu introduce bug-uri sau probleme de securitate.
   

- Să fie simplu.
O temă de ansamblu bună pentru codul tău este: Păstrați-l simplu. Codul simplu este ușor pentru alții (inclusiv tu în viitor) să citească şi să menţină. E uşor pentru NATD să înţeleagă şi să accepte.
   

- Preia responsabilitatea pe termen lung pentru codul tău.
Pe termen lung, este cel mai bine dacă vă asumaţi responsabilitatea permanentă pentru menţinerea codului şi răspunsul la întrebări despre aceasta (de exemplu, în ERDDAP™ Google Group) . După cum observă unii autori, codul este o datorie, precum și un activ. Dacă un bug este descoperit în viitor, este mai bine dacă-l repara pentru că nimeni nu știe codul mai bine decât tine (de asemenea, astfel încât există un stimulent pentru a evita bug-uri, în primul rând) . NATD nu cere un angajament ferm de a asigura întreținerea în curs. NATD spune doar că efectuarea întreținerii va fi foarte apreciat.
