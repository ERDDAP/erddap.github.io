---
title: "EDDTableFromEML"
sidebar_position: 6
---
# Tabelul EDDFromEML și tabelul EDDFromEMLBatch Opțiuni în setări de date generate Xml

 \\[ Această pagină web va fi doar de interes ERDDAP™ administratori care lucrează cu fișiere EML.
Acest document a fost creat inițial în 2016. A fost editat ultima dată în 2020-11-30. \\] 

 [ ** ERDDAP™ ** ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) este un server de date care oferă utilizatorilor un mod simplu, consistent de a descărca subseturi de seturi de date științifice în formate de fișiere comune și de a face grafice și hărți. ERDDAP™ funcționează cu un anumit set de date ca fie un grup de variabile multidimensionale în rețea (De exemplu, date satelit sau model) sau ca tabel de baze de date (cu o coloană pentru fiecare tip de informații și un rând pentru fiecare observație) . ERDDAP™ este Free and Open Source Software, astfel încât oricine poate [descărcare și instalare ERDDAP™ ](/docs/server-admin/deploy-install) pentru a servi datele lor.

Pentru a adăuga un set de date la un ERDDAP™ instalare, ERDDAP™ Administratorul trebuie să adauge o bucată de XML care descrie setul de date la un fișier numit datasets.xml . (Există [documentaţie completă pentru datasets.xml ](/docs/server-admin/datasets) .) Deși este posibil să se genereze bucata de XML pentru datasets.xml în întregime de mână, ERDDAP™ vine cu un instrument numit [ **GenereazăSeturi de dateXml** ](/docs/server-admin/datasets#tools) care poate genera proiectul brut al bucății de XML necesare pentru un anumit set de date bazat pe o anumită sursă de informații despre setul de date.

Primul lucru GenereazăDateSeturi Xml întreabă ce tip de set de date doriți să creați. Generează dateName Xml are o opțiune specială, **Tabel EDDFromEML** , care utilizează informațiile într-un [Limbajul metadatelor ecologice (EML) ](https://knb.ecoinformatics.org/external//emlparser/docs/index.html) Fișier XML pentru a genera bucata de XML pentru datasets.xml pentru a crea un [Tabel EDD din AsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles) Set de date din fiecare tabel de date dintr-un fișier EML. Acest lucru funcționează foarte bine pentru majoritatea fișierelor EML, mai ales pentru că fișierele EML fac o treabă excelentă de stocare a tuturor metadatelor necesare pentru un set de date într-un format ușor de lucrat-cu. Informațiile care GenereazăDatesetsXml trebuie să creeze seturile de date este în fișierul EML, inclusiv URL-ul pentru fișierul de date, care GenereazăDatesetsXml descărcări, parses, și se compară cu descrierea din fișierul EML. (Multe grupuri ar face bine să treacă la EML, care este un sistem mare pentru documentarea oricărui set de date științifice tabulare, nu doar date ecologice. Și multe grupuri care creează scheme XML ar face bine să utilizeze EML ca un studiu de caz pentru schema XML care sunt clare, la punctul, nu excesiv de adânc (și anume, prea multe niveluri) , și ușor pentru oameni și calculatoare să lucreze cu .) 

## Întrebări{#questions} 

Aici sunt toate întrebările GenereazăDateSeturi Xml va întreba, cu comentarii despre modul în care ar trebui să răspundă dacă doriți să procesați doar un fișier EML sau un lot de fișiere EML:

* Care EDDType?
Dacă doriți să procesați doar un fișier, răspundeți: EDDTABLEFromEML
Dacă doriți să procesați un grup de fișiere, răspundeți: EDDtableFromEMLBatch
* Director pentru a stoca fișiere?
Introduceți numele dosarului care va fi utilizat pentru a stoca fișierele EML și/sau date descărcate.
Dacă directorul nu există, va fi creat.
*    (Pentru tabelul EDDFromEML numai) URL EML sau nume de fișier local?
Introduceți URL-ul sau numele de fișier local al unui fișier EML.
*    (Numai pentru tabelul EDDFromEMLBatch) EML dir (URL sau locale) ?
Introduceți numele dosarului cu fișierele EML (un URL sau un dir local) .
De exemplu:http://sbc.lternet.edu/data/eml/files/
*    (Numai pentru tabelul EDDFromEMLBatch) Numele fișierului regex?
Introduceți expresia regulată care va fi utilizat pentru a identifica fișierele EML dorite în directorul EML.
De exemplu: knb-lter-sbc\\.\\d.
* Utilizați fișierele locale dacă sunt prezente (Adevărat. | fals) ?
Introduceți adevărat pentru a utiliza fișierele EML locale existente și fișiere de date, dacă acestea există.
Introduceți fals pentru a re-downloada întotdeauna fișierele EML și/sau fișierele de date.
* accesibil La?
Dacă doriți ca noile seturi de date să fie seturi de date private în ERDDAP , specifică numele grupului (s) care va avea acces.
Recomandat pentru grupurile LTER: combina "lter" plus grupul, de exemplu, lter SBC.
Dacă introduceți "null," nu va fi nici&lt;accesibil To&gt; eticheta în ieșire.
Vezi? [accesibil La](/docs/server-admin/datasets#accessibleto) .
* locale TimeZone (De exemplu, SUA/Pacific) ?
Dacă o variabilă temporală indică faptul că are valori locale ale timpului, această fus orar va fi atribuit.
Aceasta trebuie să fie o valoare de la [Lista coloanelor TZ a numelor fusului orar](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) .
Observați toate numele ușor de utilizat "US/..." de la sfârșitul listei.
Dacă mai târziu găsiți că a fi incorect, puteți schimba time\\_zone în bucată de datasets.xml .

EML plus ERDDAP™ este o combinatie mare, deoarece ERDDAP™ poate oferi utilizatorilor acces mai direct la bogăția de [Reţeaua de cunoaştere pentru biocomplexitate (KNB) ](https://knb.ecoinformatics.org/) şi [Cercetare ecologică pe termen lung (LTER) ](https://lternet.edu/) date și ajută aceste proiecte să îndeplinească cerințele guvernului SUA [Accesul public la rezultatele cercetării (PARR) Cerințe](https://nosc.noaa.gov/EDMC/PD.DSP.php) prin punerea la dispoziție a datelor prin intermediul unui serviciu web. De asemenea, EML plus ERDDAP™ pare a fi un pod mare între oamenii de știință în domeniul academic / NSF-finanțate și oamenii de știință în agenția federală ( NOAA , NASA, USGS) Tărâmul.

A se vedea noastre [secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support) .
 
## Detalii de proiectare{#design-details} 

Aici sunt detaliile de proiectare ale opțiunii EDDTabelulFromEML în GenerateDatesetsXml.
Unele sunt legate de diferențe în modul în care EML și ERDDAP™ face lucruri și cum GenereazăDatesets Xml se ocupă cu aceste probleme.

### Un tabel de date devine unul ERDDAP™ Set de date{#one-datatable-becomes-one-erddap-dataset} 
Un fișier EML poate avea mai multe&lt;date Tabel&gt;s. ERDDAP™ face unul ERDDAP™ Set de date pentru EML Tabel. ă datasetID pentru setul de date este
 *EMLName* \\_t *Număr tabel*   (atunci când EMLname este text) sau
 *sistem\\_EMLName* \\_t *Număr tabel*   (atunci când EMLname este un număr) .
De exemplu, tabelul #1 în fișierul knb-lter-sbc.28, devine ERDDAP™   datasetID = knb\\_lter\\_sbc\\_28\\_t1,
     
### EML comparativ cu CF+ACDD{#eml-versus-cfacdd} 
Aproape toate metadatele din fișierele EML devine în ERDDAP , dar într-un format diferit. ERDDAP™ utilizează [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) şi [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standarde privind metadatele. Acestea sunt sisteme de metadate complementare care utilizează perechi cheie = valori pentru metadate globale și pentru metadatele fiecărei variabile.
Da, reprezentarea EML a metadatelor este mai frumoasă decât reprezentarea CF+ACDD. Nu sugerez utilizarea reprezentării CF+ACDD ca un înlocuitor pentru EML. Gândiți-vă la CF+ACDD ca parte a podului de la lumea EML la OPeNDAP /CF/ACDD lume.
     
### Modificări minore{#small-changes} 
 ERDDAP™ face o mulțime de mici schimbări. De exemplu, ERDDAP™ utilizează EML non- DOI alternator Identificatorul plus un număr de tabel de date ERDDAP™   datasetID , dar uşor se schimbă alternativ Identificator pentru a face din acesta un nume variabil valabil în majoritatea limbilor computerizate, de exemplu date knb-lter-sbc.33 Tabelul #1 devine knb\\_lter\\_sbc\\_33\\_t1.
     
### DocBook{#docbook} 
EML folosește sistemul de marcare al DocBook pentru a asigura structura blocurilor de text din fișierele EML. CF și ACDD impun ca metadatele să fie text simplu. Generează date Xml convertește textul marcat în text simplu care arată ca versiunea formatată a textului. Etichetele de linie sunt igienizate cu paranteze pătrate, de exemplu, \\[ accentuat \\] , și lăsat în textul simplu.
     
### Fișiere de date{#data-files} 
Deoarece tabelul de date EML include URL-ul fișierului de date real, GenerateDatesets Xml va:
1. Descărcaţi fişierul de date.
2. Păstrați-l în același director ca fișierul EML.
3. Citeşte datele.
4. Comparați descrierea datelor din EML cu datele reale din fișier.
5. Dacă Generează date Xml găsește diferențe, se ocupă cu ele, sau întreabă operatorul dacă diferențele sunt în regulă, sau returnează un mesaj de eroare. Detaliile sunt în diferite articole de mai jos.
         
###  .zip 'd Fișiere de date{#zipd-data-files} 
Dacă fișierul cu date de referință este a .zip Dosarul trebuie să conţină un singur dosar. Acest fișier va fi utilizat pentru ERDDAP™ Set de date. Dacă există mai mult de 1 fișier. ERDDAP™ va respinge acest set de date. Dacă este necesar, acest lucru ar putea fi modificat. (În practică, toate fișierele SBC LTER zip au doar un fișier de date.)   
     
### Tip de stocare{#storagetype} 
Dacă depozitarea unei coloane Tipul nu este specificat, ERDDAP™ folosește cea mai bună presupunere pe baza datelor din fișierul de date. Acest lucru funcționează destul de bine.
     
### Unități{#units} 
 ERDDAP™ utilizări [ UDUNITS formatare pentru unități](https://www.unidata.ucar.edu/software/udunits/) . Generează dateName Xml este capabil de a converti unitățile EML la UDUNITS curat aproximativ 95% din timp. Restul de 5% rezultă într-o descriere lizibilă a unităților, de exemplu, "biomassDensityUnitPerAbundanceUnit" în EML devine "unitate de densitate a biomasei per unitate de abundență" în ERDDAP . Tehnic, acest lucru nu este permis. Nu cred că e atât de rău în aceste circumstanţe. \\[ Dacă este necesar, unitățile care nu pot fi realizate UDUNITS compatibil ar putea fi mutat la atributul de comentariu al variabilei. \\]   
     
### Versiunea EML 2.1.1{#eml-version-211} 
Acest suport pentru fișiere EML v2.1.1 a fost adăugat la GenerateDatasets Xml în 2016 cu speranța că va exista o anumită absorbție în comunitatea EML. Din 2020, acest lucru nu s-a întâmplat. ă ERDDAP™ dezvoltatorii ar fi bucuroși să adauge suport pentru versiunile mai recente ale EML, dar numai în cazul în care noile caracteristici vor fi utilizate efectiv. Vă rugăm să e-mail erd.data at noaa.gov dacă doriți sprijin pentru versiuni mai recente ale EML și va folosi de fapt această caracteristică.
     

## Probleme cu fișierele EML{#issues-with-the-eml-files} 

Există unele probleme/probleme cu fișierele EML care cauzează probleme atunci când un client software (cum ar fi opțiunea EDDTabelFromEML în GenerateDatesetsXML) încearcă să interpreteze/proceseze fișierele EML.

* Deși există mai multe probleme enumerate aici, acestea sunt în mare parte mici, probleme rezolvabile. În general, EML este un sistem mare și a fost plăcerea mea de a lucra cu ea.
* Acestea sunt sortate aproximativ de la cel mai rău / cel mai comun la cel mai puțin rău / mai puțin frecvente.
* Cele mai multe sunt legate de mici probleme în anumite fișiere EML (care nu sunt vina lui EML) .
* Majoritatea pot fi fixate prin simple modificări ale fișierului EML sau a fișierului de date.
* Având în vedere că oamenii LTER construiesc un checker EML pentru a testa valabilitatea fișierelor EML, am adăugat câteva sugestii mai jos cu privire la caracteristicile care ar putea fi adăugate la checker.

Iată problemele:

### Coloanele de date și timp separate{#separate-date-and-time-columns} 
Unele fişiere de date au coloane separate pentru data şi pentru timp, dar nici o coloană dată + oră unificată. În prezent, Generează date Xml creează un set de date cu aceste coloane separate, dar nu este ideal pentru că:

* Este cel mai bine dacă seturile de date în ERDDAP™ au o dată + oră combinată coloană numită "time" .
* Adesea, setul de date nu se încarcă ERDDAP™ pentru că "time" coloana nu are date data + ora.

Există două soluţii posibile:
1. Editează fișierul de date sursă pentru a adăuga o coloană nouă în fișierul de date (și descrie-l în EML) atunci când coloanele de date și de timp sunt fuzionate într-o singură coloană. Apoi rerulați GenerateDateName Xml astfel încât să găsească noua coloană.
2. Utilizaţi [Variabile derivate](/docs/server-admin/datasets#script-sourcenamesderived-variables) caracteristică în ERDDAP™ definirea unei noi variabile în datasets.xml care este creat prin concatenare a datei și a coloanelor de timp. Unul dintre exemple se referă în mod specific la această situație.
         
### Nume de coloană inconsecvente{#inconsistent-column-names} 
Fișierele EML enumeră coloanele fișierului de date și numele acestora. Din păcate, acestea sunt adesea diferite de numele coloanei din fișierul de date reale. În mod normal, ordinea coloanei din fișierul EML este aceeași cu ordinea coloanei din fișierul de date, chiar dacă numele variază ușor, dar nu întotdeauna. Generează dateName Xml încearcă să se potrivească cu numele coloanei. Când nu se poate (care este frecventă) , se va opri, vă arată EML / perechi de nume de fișiere de date, și întrebați dacă acestea sunt aliniate corect. Dacă introduceți 's' pentru a sări peste o masă, GenerateDatasetsXml va imprima un mesaj de eroare și du-te la masa următoare.
Soluția este de a modifica numele greșite ale coloanei din fișierul EML pentru a se potrivi cu numele coloanei din fișierul de date.
     
### Ordine coloană diferită{#different-column-order} 
Există mai multe cazuri în care EML a specificat coloanele într-o ordine diferită decât există în fișierul de date. Generează dateName Xml se va opri și va întreba operatorul dacă meciurile sunt în regulă sau dacă setul de date ar trebui să fie omis. Dacă este omis, va exista un mesaj de eroare în fișierul cu rezultate, de exemplu:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
      datasetID=knb\\_lter\\_sbc\\_17\\_t1
      dataFile=all\\_fish\\_all\\_years\\_20140903.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        SURVEY\\_TIMING        = notes
        NOTES                = survey\\_timing
      --&gt;
```
Soluția este de a fixa ordinea coloanei în aceste fișiere EML, astfel încât acestea să se potrivească cu ordinea din fișierele de date.

Ar fi frumos dacă checker EML verificat că coloanele și ordinea coloanei în fișierul sursă se potrivesc coloane și ordine coloană în fișierul EML.
    
### Incorect numheaderLines{#incorrect-numheaderlines} 
Mai multe date Tabelele numHeaderLines=1, de exemplu, ...sf.4011. Acest lucru cauzează ERDDAP™ să citească prima linie de date ca nume de coloane. Am încercat manual să SKIP toate aceste tabele de date. Acestea sunt evidente, deoarece numele sursă col neîncheiat sunt toate valorile de date. Și dacă există fișiere care au incorect numHeaderLines=0, sistemul meu nu face evident. Iată un exemplu din dosarul SBC LTER:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3017\\_t1
      dataFile=MC06\\_allyears\\_2012-03-03.txt
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        2008-10-01T00:00     = timestamp\\_local
        2008-10-01T07:00     = timestamp\\_UTC
        2.27                 = discharge\\_lps
        -999.0               = water\\_temperature\\_celsius
      --&gt;
```
Deci eroarea poate apărea ca și cum GenerateDatasets Xml crede că prima linie cu date din fișier (De exemplu, cu 2008-10-01T00:00 etc.) este linia cu numele coloanei (ca și cum 2008-10-01T00:00 ar fi un nume de coloană) .

Ar fi frumos dacă checker EML verificat valoarea numHeaderLines.
    
### numHeaderLines = 0{#numheaderlines--0} 
Unele fişiere sursă nu au nume de coloană. ERDDAP™ acceptă că, în cazul în care EML descrie același număr de coloane.

În opinia mea, acest lucru pare foarte periculos. Ar putea fi coloane într-o ordine diferită sau cu diferite unități (vezi mai jos) Și nu există nici o modalitate de a prinde aceste probleme. Este mult mai bine dacă toate fișierele de date ASCII au un rând cu numele coloanei.
    
### Format de date{#datetime-format-strings} 
EML are un mod standard de a descrie formatele de date. dar există o variație considerabilă în utilizarea sa în fișierele EML. (M-am înşelat în legătură cu asta. Văd documentația EML pentru format String care pare să se potrivească [ Java DataTimeFormatery](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html) , dar care nu are liniile directoare importante cu privire la utilizarea sa, cu rezultatul că formatString este adesea / de obicei folosit necorespunzător.) Există mai multe cazuri cu caz incorect și/sau suprapunere incorectă a unei litere și/sau formatare nestandardizată. Asta pune o povară nerezonabilă asupra clienților, în special clientilor software cum ar fi GenerateDatasetsXml. Generează dateName Xml încearcă să transforme formatele definite incorect în fișierele EML
 [data/ora în care ERDDAP™ necesită](/docs/server-admin/datasets#string-time-units) , care este aproape identic cu pentru Java /Joda format timp specificație, dar este puțin mai iertător.

Ar fi frumos dacă checker EML necesită respectarea strictă a Java Joda ERDDAP specificațiile unităților de timp și au verificat dacă valorile timpului de dată din tabelul de date ar putea fi măsurate corect cu formatul specificat.
    
### Data, dar fără fus orar{#datetime-but-no-time-zone} 
Generează dateName Xml caută o coloană cu data Timpul și o anumită fus orar (fie Zulu : din unități de timp care se termină în "Z" sau o denumire a coloanei sau o definiție a atributului care include "gmt" sau "utc" sau locală: de la "local" în denumirea coloanei sau definiția atributului) . De asemenea, acceptabil este un fișier cu o coloană dată, dar nu coloană de timp. De asemenea, acceptabil este un fișier fără informații data sau ora.

Generează dateName Xml tratează toate "local" ori ca fiind din fusul orar pe care le puteți specifica pentru un anumit lot de fișiere, de exemplu, pentru SBC LTER, utilizați US/Pacific. Informațiile sunt uneori în comentarii, dar nu într-o formă care este ușor pentru un program de calculator pentru a da seama.

Fișierele care nu îndeplinesc acest criteriu sunt respinse cu mesajul "NU DATA BUNĂ (TIMP) Variabil." Problemele comune sunt:

* Există o coloană cu date și o coloană cu ore, dar nu data Coloana timpului.
* Sunt unităţi de timp, dar fusul orar nu este specificat.

Alte observații:
Dacă există o dată bună + timp cu coloana fus orar, acea coloană va fi numită "time" în ERDDAP . ERDDAP™ cere ca datele din coloana timpului să fie ușor de înțeles/convertibile Zulu /UTC/GMT data fusului orarTimes. \\[ Credinta mea este: folosind ora locala si diferite formate data/ora (2 cifre ani&#33; mm/zz/yy vs dd/mm/yy vs ...) în fişierele de date forţează utilizatorul final să facă conversii complicate la Zulu timp pentru a compara datele dintr-un set de date cu datele de la altul. Deci... ERDDAP™ standardizează toate datele din timp: Pentru orele de coarde, ERDDAP™ utilizează întotdeauna ISO 8601:2004 (E) format standard, de exemplu, 1985-01-02T 00:00:00Z. Pentru perioade numerice, ERDDAP™ întotdeauna folosește "seconds since 1970-01-01T00:00:00Z" . ERDDAP™ Foloseşte întotdeauna Zulu   (UTC, GMT) fusul orar pentru a elimina dificultățile de lucru cu diferite zone de timp și timp standard față de timpul de vară. Generează date Xml caută o coloană de date EML cu data + ora Zulu . Acest lucru este greu, deoarece EML nu utilizează un vocabular / sistem formal (ca [ Java Format timp / Joda](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html) ) pentru specificarea datelor Format timp:
Dacă există un col cu valori numerice ale timpului (de exemplu, Matlab ori) şi Zulu fus orar (sau doar date, fără coloane temporale) , este utilizat ca "time" .
Dacă există un col cu date privind data şi ora, utilizând Zulu fusul orar, este utilizat ca "time" și orice altă dată sau coloană de timp este eliminată.
În caz contrar, dacă se găsește un col cu date exacte, acesta este utilizat ca "time" variabilă (fără fus orar) .
Dacă există o coloană de date și o coloană de timp și nicio dată combinată Setul de date este respins, dar setul de date poate fi utilizat prin adăugarea unei date combinate Coloana temporală (preferabil, Zulu fusul orar) la fișierul de date și adăugarea descrierii sale în fișierul EML.
EXEMPLU DE LA SBC LTER: [https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/) Tabelul de date #2.

Ar fi frumos dacă EML/LTER ar solicita includerea unei coloane cu Zulu   (UTC, GMT) timp de timp în toate fișierele relevante de date sursă. Următorul cel mai bun este de a adăuga un sistem la EML pentru a specifica o time\\_zone atribut folosind nume standard (de la [Coloana TZ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) ) .
    
### Lipsă missing\\_value  {#missing-missing_value} 
Unele coloane folosesc un missing\\_value dar nu-l listați în metadatele EML, de exemplu, precipitații\\_mm în knb-lter-sbc.5011 folosește -999. În cazul în care nicio valoare lipsă nu este specificată în EML, GenerateDatasetsXml caută automat valori comune lipsă (de exemplu 99, -99, 999, -999, 9999, -9999, etc.) şi creează aceste metadate. Dar alte lipseste missing\\_value Nu sunt prinşi.

Ar fi frumos dacă checker EML uitat pentru lipsă missing\\_value c.
    
### Probleme mici{#small-problems} 
Sunt multe probleme mici. (ortografie, punctuaţie) care va fi probabil găsită doar de un om care inspectează fiecare set de date.

Ar fi frumos dacă checker EML ar căuta ortografie și erori gramaticale. Aceasta este o problemă dificilă, deoarece cuvintele din știință sunt adesea marcate de dame de vrajă. Editarea umană este probabil necesară.
    
### Caractere unicode nevalide{#invalid-unicode-characters} 
Unele dintre conținutul EML conține caractere invalide Unicode. Acestea sunt, probabil, caractere din charset Windows care au fost copiate incorect și lipite în fișierele UTF-8 EML. Generează dateName Xml igienizează aceste caractere la, de exemplu, \\[ #128 \\] , astfel încât acestea sunt ușor de căutat în ERDDAP™   datasets.xml Dosar.

Ar fi frumos dacă checker EML verificat pentru asta. Este uşor de găsit şi uşor de reparat.
    
### Unități de coloană diferite] (#DiferitColumnUnits)  {#different-column-unitsdifferentcolumnunits} 
Unele tabele de date EML definesc coloane care nu sunt conforme cu coloanele din fișierul de date, în special pentru că au unități diferite. Generează dateName Astea sunt steaguri Xml. Depinde de operator să decidă dacă diferenţele sunt în regulă sau nu. Acestea apar în fișierul de eșecuri sub formă de tabele de date "SKIPPED." Exemplu în fișierul SBC LTER eșecuri:
```
      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3\\_t1
      dataFile=SBCFC\\_Precip\\_Daily\\_active\\_logger.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        Daily\\_Precipitation\\_Total\\_mm = Daily\\_Precipitation\\_Total\\_inch
        Flag\\_Daily\\_Precipitation\\_Total\\_mm = Flag\\_Daily\\_Precipitation\\_Total\\_inch
      -->
```
Ar fi frumos dacă checker EML verificat că unitățile se potrivesc. Din păcate, acest lucru este, probabil, imposibil de prins și apoi imposibil de rezolvat fără a contacta creatorul de seturi de date, având în vedere că fișierul sursă nu include unități. Discrepanța de exemplu de mai sus a fost vizibilă numai deoarece unitățile au fost incluse în denumirea coloanei sursă și numele coloanei EML. Câte alte tabele de date au această problemă, dar sunt nedetectabile?
    
### Variante diferite ale EML{#different-versions-of-eml} 
Generează dateName Xml este conceput pentru a lucra cu EML 2.1.1. Alte versiuni de EML va funcționa în măsura în care acestea se potrivesc 2.1.1 sau că GenerateDateSetsXml are cod special pentru a face față cu ea. Aceasta este o problemă rară. Când apare, soluția este de a converti fișierele la EML 2.1.1, sau trimite fișierul EML la erd.data at noaa.gov , astfel încât să pot face modificări la GenerateDatasets Xml pentru a face față diferențelor.

Bob a adăugat suport pentru fișiere EML la GenerateDatasets Xml în 2016 cu speranța că va exista o anumită absorbție în comunitatea EML. Din 2020, acest lucru nu s-a întâmplat. Bob este fericit pentru a adăuga suport pentru versiuni mai recente de EML, dar numai în cazul în care noile caracteristici vor fi utilizate de fapt. Vă rugăm să e-mail erd.data at noaa.gov dacă doriți sprijin pentru versiuni mai recente ale EML și va folosi de fapt această caracteristică.
    
### Probleme la analiza fișierului de date{#trouble-parsing-the-data-file} 
Rar, un tabel de date poate fi respins cu eroarea "numărul neașteptat de articole pe linia #120 (observate=52, aşteptate=50) " Un mesaj de eroare ca acesta înseamnă că o linie din fișierul de date avea un număr diferit de valori decât celelalte linii. Acesta poate fi o problemă în ERDDAP™   (De exemplu, nu se analizează corect fișierul) sau în dosar. EXEMPLU DE LA SBC LTER:
 [https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/) Tabelul de date #3, a se vedea fișierul de date=LTER\\_lunly\\_bottledata\\_înregistrat\\_stații\\_2014044.txt
