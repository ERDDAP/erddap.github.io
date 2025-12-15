---
sidebar_position: 3
---
# Lucrul cu datasets.xml Fișier

 \\[ Această pagină web va fi doar de interes ERDDAP™ Administratori. \\] 

După ce aţi urmat ERDDAP™   [instrucțiuni de instalare](/docs/server-admin/deploy-install) , trebuie să editați datasets.xml fișier în *Tomcat* /content/erddap/ pentru a descrie seturile de date pe care le ERDDAP™ instalarea va servi.

Puteți vedea un exemplu [ datasets.xml privind GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .

- - -

##  [Introducere](#introduction)  {#introduction} 

### Unele adunări sunt necesare{#some-assembly-required} 
Crearea unui set de date în ERDDAP™ nu este doar o chestiune de a indica la directorul setului de date sau URL. Trebuie să scrii o bucată de XML pentru datasets.xml care descrie setul de date.

* Pentru seturile de date grupate, pentru a face setul de date conform cu ERDDAP "Structura de date pentru datele în rețea, trebuie să identifice un subset de variabile ale setului de date care au aceleași dimensiuni. ( [De ce?](#why-just-two-basic-data-structures)   [Cum?](#dimensions) ) 
* Metadatele curente ale setului de date sunt importate automat. Dar dacă doriți să modificați metadatele sau să adăugați alte metadate, trebuie să-l specificați în datasets.xml . Şi... ERDDAP™ necesită alte metadate, inclusiv [atribute globale](#global-attributes)   (cum ar fi infoUrl , instituţie, sourceUrl , rezumat și titlu) şi [atribute variabile](#variable-addattributes)   (cum ar fi long\\_name și unități) . La fel cum metadatele care se află în prezent în setul de date adaugă informații descriptive setului de date, metadatele solicitate de ERDDAP™ adaugă informații descriptive setului de date. Metadate suplimentare este o completare bună la setul de date și ajută ERDDAP™ face o treabă mai bună de a prezenta datele dumneavoastră utilizatorilor care nu sunt familiarizați cu ea.
*    ERDDAP™ trebuie să faci lucruri speciale cu [longitudine, latitudine, altitudine (sau adâncime) , și variabile de timp](#destinationname) .

Dacă cumpărați în aceste idei și cheltui efortul de a crea XML pentru datasets.xml , ai toate avantajele de ERDDAP™ , inclusiv:

* Căutare text complet pentru seturi de date
* Caută seturi de date pe categorii
* Formulare de acces la date ( * datasetID * .html) astfel încât să puteți solicita un subset de date în multe formate de fișiere diferite
* Formulare pentru solicitarea graficelor și hărților ( * datasetID * .graph) 
* Serviciul harta web ( WMS ) pentru seturi de date în rețea
*    RESTful acces la datele dumneavoastră

Realizarea datasets.xml necesită eforturi considerabile pentru primele seturi de date, dar **Devine mai uşor.** . După primul set de date, puteți folosi adesea o mulțime de muncă pentru următorul set de date. Din fericire, ERDDAP™ vine cu două [Unelte](#tools) pentru a vă ajuta să creați XML pentru fiecare set de date în datasets.xml .
Dacă te blochezi, ne vezi [secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support) .

### Variabile în datasets.xml  {#varaibles-in-datasetsxml} 

Ca de ERDDAP™ versiunea 2.29.0, datasets.xml este acum (opțional) prelucrate de o [Substitutor string](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Acest lucru are multe utilizări, inclusiv stabilirea valorilor private (ca parole) utilizarea variabilelor de mediu. Acest lucru poate fi dezactivat prin setarea activEnvParsing la fals în configurare.xml.

### Furnizor de date Forma{#data-provider-form} 
Când un furnizor de date vine la tine în speranța de a adăuga unele date la dvs. ERDDAP , poate fi dificil și consumatoare de timp pentru a colecta toate metadatele (informații privind setul de date) necesar pentru adăugarea setului de date în ERDDAP . Multe surse de date (de exemplu, fișiere .csv; Fișiere Excel, baze de date) nu au metadate interne, deci ERDDAP™ are un formular de furnizor de date care colectează metadate de la furnizorul de date și oferă furnizorului de date alte orientări, inclusiv orientări extinse pentru [Date în baze de date](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html#databases) . Informațiile transmise se convertesc în datasets.xml format și apoi e-mailat la ERDDAP™ administrator (Tu) şi scris (anexată) la *Big ParentDirectory* /loguri/dateProviderForm.log . Astfel, forma semi-automate procesul de a obține un set de date în ERDDAP Dar ERDDAP™ administratorul încă trebuie să completeze datasets.xml bucată și se ocupă cu obținerea fișierului de date (s) de la furnizor sau conectarea la baza de date.

Prezentarea de fișiere de date reale din surse externe este un risc imens de securitate, astfel încât ERDDAP™ nu se ocupă cu asta. Trebuie să găsiți o soluție care funcționează pentru dvs. și furnizorul de date, de exemplu, e-mail (pentru fișiere mici) , trage din nor (de exemplu, DropBox sau Google Drive) , un site sftp (cu parole) , sau adidași Net (un hard disk USB sau un hard disk extern) . Probabil că ar trebui să accepţi doar dosarele celor pe care îi cunoşti. Va trebui să scanați fișierele pentru viruși și să luați alte măsuri de precauție de securitate.

Nu există nicio legătură. ERDDAP™ la forma furnizorului de date (de exemplu, pe ERDDAP™ pagina de start) . În schimb, atunci când cineva vă spune că doresc să aibă datele lor deservite de dvs. ERDDAP , le puteți trimite un e-mail spunând ceva de genul:
Da, putem obține datele dumneavoastră în ERDDAP . Pentru a începe, vă rugăm să completați formularul lahttps://*yourUrl*/erddap/dataProviderForm.html  (sau http:// dacă https:// nu este activat) .
După ce termini, te voi contacta pentru a stabili detaliile finale.
Dacă vrei doar să te uiţi la formular (fără a completa) , puteți vedea formularul pe ERD 's ERDDAP : [Introducere](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm.html) , [Partea 1](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html) , [Partea 2](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm2.html) , [Partea 3](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm3.html) , și [Partea 4](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm4.html) . Aceste link-uri pe ERD   ERDDAP™ trimite-mi informaţii, nu tu, aşa că nu trimite informaţii cu ei decât dacă vrei să adaugi date ERD   ERDDAP .

Dacă doriți să eliminați formularul de furnizor de date din ERDDAP™ , pune
```
<dataProviderFormActive>false</dataProviderFormActive>  
```
în fișierul setup.xml.

Impulsul pentru acest lucru a fost NOAA 's 2014 [Accesul public la rezultatele cercetării (PARR) Directiva](https://www.glerl.noaa.gov/review2016/reviewer_docs/NOAA_PARR_Plan_v5.04.pdf) , care necesită că toate NOAA datele de mediu finanțate prin dolari contribuabili să fie puse la dispoziție prin intermediul unui serviciu de date (nu doar fișiere) în termen de 12 luni de la creare. Deci există un interes crescut în utilizarea ERDDAP™ punerea la dispoziție a seturilor de date prin intermediul unui serviciu ASAP. Aveam nevoie de un mod mai eficient de a trata un număr mare de furnizori de date.

Feedback/Sugestii? Acest formular este nou, așa că vă rugăm să e-mail erd dot data at noaa dot gov dacă aveți orice feedback sau sugestii pentru îmbunătățirea acestui lucru.

### Unelte{#tools} 
 ERDDAP™ vine cu două programe de linie de comandă care sunt instrumente pentru a vă ajuta să creați XML pentru fiecare set de date pe care doriți dvs. ERDDAP™ pentru a servi. Odată ce ați înființat ERDDAP™ si sa-l ruleze (cel puțin o dată) , puteți găsi și utiliza aceste programe în *Tomcat* /webapps/erddap/WEB-INF director. Există Linux / Unix scripturi shell (cu extensia .sh) și Windows scripturi (cu extensia .bat) pentru fiecare program. \\[ Pe Linux, executați aceste instrumente ca același utilizator (Tomcat?) care va rula Tomcat. \\] Când executați fiecare program, vă va pune întrebări. Pentru fiecare întrebare, tastaţi un răspuns, apoi apăsaţi Enter. Sau apăsați ^C pentru a ieși dintr-un program în orice moment.

#### Programul nu va rula?{#program-wont-run} 

* Dacă aveţi un program necunoscut (sau similare) mesaj de eroare, problema este, probabil, că sistemul de operare nu a putut găsi Java . Trebuie să-ţi dai seama unde Java este pe computerul dvs., apoi editați referința java în .bat sau .sh fișier pe care încercați să utilizați.
* Dacă obțineți un fișier borcan care nu a fost găsit sau o clasă de mesaje de eroare găsite, atunci Java nu a putut găsi una dintre clasele enumerate în .bat sau .sh fișier încercați să utilizați. Soluţia este să ne dăm seama unde este acel fişier .jar şi să edităm referinţa java la acesta în fişierul .bat sau .sh.
* Dacă utilizaţi o versiune de Java care este prea vechi pentru un program, programul nu va rula și veți vedea un mesaj de eroare ca
Excepție în fir "main" java.lang.Clasă nesuportatăVersiuneError:
     *unele/clasă/nume* : versiune majoră nesusţinută.minor *un număr*   
Soluţia este de a actualiza la cea mai recentă versiune a Java și asigurați-vă că fișierul .sh sau .bat pentru programul este folosind.

#### Instrumentele tipăresc diferite mesaje de diagnosticare:{#the-tools-print-various-diagnostic-messages} 

* Cuvântul "ERROR" este folosit atunci când ceva a mers atât de greșit încât procedura nu a reușit să se finalizeze. Deși este enervant pentru a obține o eroare, eroarea te forțează să se ocupe de problema.
* Cuvântul "WORGING" este folosit atunci când ceva a mers prost, dar procedura a fost în măsură să fie finalizată. Acestea sunt destul de rare.
* Orice altceva este doar un mesaj informativ. Puteți adăuga \\-verbose la [GenereazăSeturi de dateXml](#generatedatasetsxml) sau [DasDds](#dasdds) linie de comandă pentru a obține mesaje suplimentare informative, care ajută uneori rezolva probleme.

Cele două instrumente sunt un mare ajutor, dar tot trebuie să citiţi cu atenţie toate aceste instrucţiuni de pe această pagină şi să luaţi singuri decizii importante.

### GenereazăSeturi de dateXml{#generatedatasetsxml} 
*    **GenereazăSeturi de dateXml** este un program de linie de comandă care poate genera un proiect dur al XML-ului setului de date pentru aproape orice tip de set de date.
    
RECOMANDĂM STRÂNGEL că folosiţi Seturi de Date Generate Xml în loc de a crea bucăți de datasets.xml de mână deoarece:
    
    * Generează dateName Xml funcționează în câteva secunde. Să faci asta manual e cel puţin o oră de muncă, chiar şi când ştii ce faci.
    * Generează dateName Xml face o treabă mai bună. Faptul de a face acest lucru cu mâna necesită cunoştinţe ample despre cum ERDDAP™ funcţionează. Este puţin probabil să faceţi o treabă mai bună manual. (Bob Simons folosește întotdeauna GenerateDatasets Xml pentru prima schiță, și el a scris ERDDAP .) 
    * Generează dateName Xml generează întotdeauna o bucată validă de datasets.xml . Orice bucată de datasets.xml că scrie va avea, probabil, cel puțin câteva erori care previn ERDDAP™ din încărcarea setului de date. Adesea le ia ore întregi oamenilor să diagnosticheze aceste probleme. Nu-ţi pierde timpul. Să generăm Setări de date Xml face munca grea. Apoi puteți rafina .xml de mână, dacă doriți.
    
Când utilizați GenerateDateSets Program Xml:
    
    * Pe Windows, prima dată când executați GenerateDatesetsXml, aveți nevoie pentru a edita fișierul GenerateDatesetsXml.bat cu un editor de text pentru a schimba calea către Java. exe fişier astfel încât Windows poate găsi Java .
    * Generează dateName Xml vă cere mai întâi să specificați EDDType (Erd Dap Dataset Tip) a setului de date. Vezi [Lista tipurilor de seturi de date](#list-of-types-datasets)   (în prezentul document) să își dea seama care este tipul adecvat pentru setul de date la care lucrați. Pe lângă EDDTypes regulate, există, de asemenea, câteva [Tipuri speciale de date/Pseudo](#specialpseudo-dataset-types)   (de exemplu, unul care se târăște un catalog THREDS pentru a genera o bucată de datasets.xml pentru fiecare set de date din catalog) .
    * Generează dateName Xml vă pune apoi o serie de întrebări specifice acestui EDDType. Întrebările adună informaţiile necesare ERDDAP™ pentru a accesa sursa setului de date. Pentru a înțelege ce ERDDAP™ cere, a se vedea documentația pentru EDDType pe care ați specificat-o făcând clic pe același tip de set de date în [Lista tipurilor de seturi de date](#list-of-types-datasets) .
        
Dacă aveți nevoie pentru a introduce un șir de caractere speciale (de exemplu, caractere whitespace la început sau la sfârșit, caractere non-ASCII) , introduceţi o [Sfoara JSON](https://www.json.org/json-en.html)   (cu caractere speciale scăpat cu caractere \\\) . De exemplu, pentru a introduce doar un personaj tab, introduceți "\\t" (cu ghilimele duble din jur, care spun ERDDAP™ că aceasta este o coardă stil JSON.
        
    * De multe ori, unul dintre raspunsurile tale nu va fi ceea ce GenerateDatasetsXml are nevoie. Puteți încerca din nou, cu răspunsuri revizuite la întrebări, până la GenerateDatesets Xml poate găsi și înțelege cu succes datele sursă.
    * Dacă răspundeţi corect la întrebări (sau suficient de corect) , Generează date Xml se va conecta la sursa setului de date și va colecta informații de bază (de exemplu, nume și metadate variabile) .
Pentru seturile de date de la nivel local NetCDF   .nc și fișiere conexe, GenerateDatasets Xml va imprima adesea structura ncdump-ca a fișierului după ce citește mai întâi fișierul. Acest lucru vă poate oferi informații pentru a răspunde mai bine la întrebări pe o buclă ulterioară prin GenerateDateSetsXml.
    * Generează dateName Xml va genera apoi un proiect dur al XML-ului setului de date pentru acel set de date.
    * Informații de diagnosticare și proiectul dur al setului de date XML vor fi scrise la *Big ParentDirectory* /logs/GenerateDatasetsXml.log .
    * Proiectul brut al setului de date XML va fi scris la *Big ParentDirectory* /logs/GenerateDatasetsXml.out.
#### "0 fișiere" Mesaj eroare{#0-files-error-message} 
Dacă executați GenerateDatasets Xml sau [DasDds](#dasdds) , sau dacă încercați să încărcați un EDDGrid Din... Dosare sau EDD Table From... Set de fișiere în ERDDAP™ , și veți obține un mesaj de eroare "0 fișiere" indicând faptul că ERDDAP™ găsit 0 fișiere de potrivire în dosar (atunci când crezi că există fișiere de potrivire în acel director) :
* Verificați dacă ați specificat numele complet al dosarului. Și dacă ați specificat numele de fișier al eșantionului, asigurați-vă că ați specificat numele complet al fișierului, inclusiv numele dosarului complet.
* Verificați dacă fișierele sunt într-adevăr în acel director.
* Verifică ortografia numelui directorului.
* Verificați fișierulNameRegex. E foarte uşor să faci greşeli cu regexurile. Pentru teste, încercați regex .\\* care ar trebui să se potrivească cu toate numele de fișiere. (Vezi asta? [documentația regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) şi [tutorial regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) 
* Verificați dacă utilizatorul care rulează programul (de exemplu, utilizator=tomcat (?) pentru Tomcat/ ERDDAP ) are permisiunea "citeste" pentru acele fisiere.
* În unele sisteme de operare (de exemplu, SELinux) și în funcție de setările de sistem, utilizatorul care a rulat programul trebuie să aibă permisiune "citește" pentru întregul lanț de directoare care duce la directorul care are fișierele.


* Dacă ai probleme pe care nu le poţi rezolva, [solicitarea de sprijin](/docs/intro#support) cu cât mai multe informaţii posibil. În mod similar, în cazul în care se pare că EDDType adecvat pentru un anumit set de date nu funcționează cu acel set de date sau în cazul în care nu există un EDDType adecvat, vă rugăm să completați un dosar [problema GitHub](https://github.com/ERDDAP/erddap/issues) cu detaliile (și un fișier de eșantionare, dacă este cazul) .
         
#### Aveți nevoie pentru a edita ieșire de la GenerateDatasets Xml pentru a face mai bine.{#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better} 
         
* Disclamer:
CHUNK datasets.xml MADE BE GenerateDateName Xml nu e perfect. Trebuie să citiți și să editați XML-ul înainte de a-l utiliza într-un public ERDDAP . Generează dateName Releele Xml pe o mulțime de reguli-of-thumb care nu sunt întotdeauna corecte. Sunteți responsabil pentru asigurarea corectitudinii XML pe care le adăugați ERDDAP 'S datasets.xml Dosarul.
    
     (Nu ţip. Din motive juridice istorice, disclamaţii trebuie să fie scrise în toate capacele.) 
    
Producția de GenerateDatasetsXml este un proiect dur.
Aproape întotdeauna va trebui să-l editați.
Am făcut și continuăm să facem un efort imens pentru a face producția cât mai gata de plecare posibil, dar există limite. Adesea, informațiile necesare nu sunt pur și simplu disponibile din metadatele sursă.
    
O problemă fundamentală este că cerem un program de calculator (GenereazăSeturi de dateXml) Pentru a face o sarcină în cazul în care, dacă ați dat aceeași sarcină la 100 de persoane, v-ar obține 100 de rezultate diferite. Nu există un singur răspuns corect. Evident, programul vine cel mai aproape de citirea minții lui Bob (Nu a ta.) , dar chiar și așa, nu este un program all-înțelegere AI, doar o grămadă de euristics cobbled împreună pentru a face o sarcină AI-ca. (Acea zi a unui program All-înțelegere AI poate veni, dar nu a încă. Dacă da, noi oamenii putem avea probleme mai mari. Ai grijă ce-ţi doreşti.) 
    
* În scopuri informaţionale, rezultatele arată sursa globalăAttributes şi sursa variabilăAttributes ca comentarii. ERDDAP™ combină sursaAttributes și addAttributes   (care au prioritate) pentru a face combinat Atribute care sunt afișate utilizatorului. (Și alte atribute sunt adăugate automat la longitudine, latitudine, altitudine, adâncime și variabile de timp atunci când ERDDAP™ face de fapt setul de date) .
     
* Dacă nu vă place o sursăAttribute, suprascrieți-l prin adăugarea unui addAttribute cu același nume, dar o valoare diferită (sau nici o valoare, dacă doriți să-l eliminați) .
     
* Toate addAttributes sunt sugestii generate de calculator. Editează-le&#33; Dacă nu-ţi place un addAttribute, schimbă-l.
     
* Dacă doriți să adăugați altele addAttributes , adăugați-le.
     
* Dacă vrei să schimbi destinationName Schimbă-l. Dar nu te schimba. sourceName c.
     
* Puteți schimba ordinea dataVariable s sau eliminaţi oricare dintre acestea.


    * Puteți folosi apoi [DasDds](#dasdds)   (vezi mai jos) pentru a testa în mod repetat XML-ul pentru acel set de date pentru a se asigura că setul de date rezultat apare așa cum doriți să apară în ERDDAP .
    * Simțiți-vă liber pentru a face mici modificări la datasets.xml bucată care a fost generată, de exemplu, furnizarea unei mai bune infoUrl , rezumat, sau titlu.
#### nu adăugați denumiri standard{#donotaddstandardnames} 
Dacă includeți \\-doNotAdd StandardNames ca parametru de linie de comandă atunci când executați generați Setări de date Xml, genera Setări de date Xml nu va adăuga standard\\_name la addAttributes pentru orice variabile, altele decât variabilele numite latitudine, longitudine, altitudine, adâncime sau timp (care au evident standard\\_name s) . Acest lucru poate fi util dacă utilizați ieșirea de la generarea Setări de date Xml direct în ERDDAP™ fără editarea ieșirii, deoarece generează Setări de date Xml ghicește adesea standard\\_name nu este corect. (Rețineți că vă recomandăm întotdeauna să editați ieșirea înainte de a o utiliza în ERDDAP .) Folosind acest parametru va avea alte efecte minore legate de deoarece ghicit standard\\_name este adesea utilizat în alte scopuri, de exemplu pentru a crea un nou long\\_name , și pentru a crea setările colorBar .
#### Scriptare{#scripting} 
Ca alternativă la răspunsul interactiv la întrebări la tastatură și la buclarea pentru a genera seturi de date suplimentare, puteți oferi argumente linia de comandă pentru a răspunde la toate întrebările pentru a genera un set de date. Generează dateName Xml va procesa acei parametri, scrie ieșire la fișierul de ieșire, și ieși din program.
        
Pentru a configura acest lucru, utilizați mai întâi programul în modul interactiv și scrieți răspunsurile. Iată un exemplu parțial:
Să spunem că rulați script-ul: ./GenerateDatasetsXml.sh
Apoi introduceți: EDD Tabel FromAsciiFiles
Apoi introduceți: /u00/data/
Apoi introduceți: .\\\ . Asc
Apoi introduceți: /u00/data/probaFile.asc
Apoi introduceți: ISO-8859-1
        
Pentru a rula acest lucru într-un mod inactiv, utilizați această linie de comandă:
./GenerateDatesetsXml.sh EDDTabel FromAsciiFiles /u00/data/.\\.asc /u00/data/probaFile.asc ISO-8859-1
Deci, în principiu, trebuie doar lista toate răspunsurile pe linia de comandă.
Acest lucru ar trebui să fie util pentru seturile de date care se modifică frecvent într-un mod care necesită refuncționarea datelor generate Xml (în special EDDGrid De la ThreddsCatalog) .
        
Detalii:

* Dacă un parametru conține un spațiu sau un caracter special, atunci codați parametrul ca o [Sfoara JSON](https://www.json.org/json-en.html) , de exemplu, "parametrul meu cu spații și două \\n linii."
* Dacă doriți să specificați un șir gol ca parametru, utilizați: nimic
* Dacă doriți să specificați valoarea implicită a unui parametru, utilizați: implicit
             
* Generează dateName Xml suportă a -i *Seturi de date XmlName* # *Nume etichetă* parametrul liniei de comandă care introduce ieșirea în specificat datasets.xml fișier (implicit este *Tomcat* /content/erddap/ datasets.xml ) . Generează dateName Xml caută două linii în seturi de date XmlName:
```
        <!-- Begin GenerateDatasetsXml #*tagName someDatetime* -->  
```
şi
```
        <!-- End GenerateDatasetsXml #*tagName someDatetime* -->  
```
şi înlocuieşte totul între aceste linii cu noul conţinut, şi schimbă cevaDatetime.
* Comutatorul-i este doar procesat (și modificări ale datasets.xml sunt făcute doar) dacă executați GenerateDatasets Xml cu argumente linia de comandă care specifică toate răspunsurile la toate întrebările pentru o buclă a programului. (A se vedea "Scripting" de mai sus.)   (Gândirea este: Acest parametru este utilizat cu scripturi. Dacă utilizați programul în modul interactiv (tastarea informațiilor de pe tastatură) , sunt susceptibile de a genera unele bucăți incorecte de XML înainte de a genera cel pe care doriți.) 
* Dacă liniile de început și de sfârșit nu sunt găsite, atunci aceste linii și noul conținut sunt introduse chiar înainte de&lt;/erddapDatasets&gt;.
* Există, de asemenea, un -I (Capitalul i) comutator în scopuri de testare care funcționează la fel ca -i, dar creează un fișier numit datasets.xml  *Data* și nu face modificări la datasets.xml .
* Nu rulați GenerateDatesets Xml cu -i în două procese simultan. Există o şansă ca un singur set de schimbări să fie păstrat. S-ar putea să fie probleme serioase. (de exemplu, fișiere corupte) .
    
Dacă utilizați "GenerateDatesetsXml -verbose," acesta va imprima mai multe mesaje de diagnosticare decât de obicei.
    
#### Tipuri speciale de date/Pseudo{#specialpseudo-dataset-types} 
În general, opțiunile EDDType în GenerateDatasets Potrivire Xml a tipurilor de EDD descrise în acest document (vezi [Lista tipurilor de seturi de date](#list-of-types-datasets) ) și să genereze unul datasets.xml bucată pentru a crea un set de date dintr-o sursă de date specifică. Există câteva excepţii şi cazuri speciale:
    
#####  EDDGrid FromErddap{#eddgridfromerddap} 
Acest Tip EDD generează toate datasets.xml bucăți necesare pentru a face [ EDDGrid FromErddap](#eddfromerddap) seturi de date din toate EDDGrid Seturi de date la distanță ERDDAP . Veți avea opțiunea de a păstra originalul datasetID s (care poate duplica unele datasetID e deja în dumneavoastră ERDDAP ) sau generarea de nume noi care vor fi unice (dar de obicei nu sunt atât de uşor de citit.) .
     
##### Tabel EDD FromErddap{#eddtablefromerddap} 
Acest Tip EDD generează toate datasets.xml bucăți necesare pentru a face [Tabel EDD FromErddap](#eddfromerddap) Seturi de date din toate seturile de date ale tabelului EDD într-o telecomandă ERDDAP . Veți avea opțiunea de a păstra originalul datasetID s (care poate duplica unele datasetID e deja în dumneavoastră ERDDAP ) sau generarea de nume noi care vor fi unice (dar de obicei nu sunt atât de uşor de citit.) .
     
#####  EDDGrid De la ThreddsCatalog{#eddgridfromthreddscatalog} 
Acest Tip EDD generează toate datasets.xml bucăți necesare pentru toate [ EDDGrid FromDap](#eddgridfromdap) seturi de date pe care le poate găsi târându-se recursiv printr-un THREDS (sub) catalog. Există multe forme de URL-uri catalog THREDS. Această opțiune REquires a THREDS .xml URL cu /catalog / în ea, de exemplu,
https://oceanwatch.pfeg.noaa.gov/thredds/catalog/catalog.xmlsau
https://oceanwatch.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml  
(un catalog legat de .html este la
https://oceanwatch.pfeg.noaa.gov/thredds/Satellite/aggregsatMH/chla/catalog.html, care nu este acceptabil pentru EDDGrid FromThreddsCatalog).
Dacă aveţi probleme cu EDDGrid Din trei mii Catalog:
* Asigurați-vă că URL-ul pe care îl utilizați este valid, include /catalog/, și se termină cu /catalog.xml .
* Dacă este posibil, utilizați o adresă IP publică (de exemplu,https://oceanwatch.pfeg.noaa.gov) în URL, nu o adresă locală numerică IP (de exemplu,https://12.34.56.78) . Dacă THREDDS este accesibil numai prin intermediul adresei IP numerice locale, puteți utiliza [&lt;Traducerea şi adaptarea: (#convertto publicsourceurl) Deci... ERDDAP™ utilizatorii văd adresa publică, chiar dacă ERDDAP™ Obţine date de la adresa numerică locală.
* Dacă ai probleme pe care nu le poţi rezolva, [Verificați vârfurile de depanare](#troubleshooting-tips) .
* Codul de nivel scăzut pentru acest lucru folosește acum Unidata cod netcdf-java catalog crawler (Trei. clase de catalog) astfel încât să se poată ocupa de toate cataloagele TREDDS (care poate fi surprinzător de complex) Mulţumită Unidata pentru acel cod.
         
#####  EDDGrid LonPM180FromErddapCatalog{#eddgridlonpm180fromerddapcatalog} 
Acest Tip EDD generează datasets.xml pentru a face [ EDDGrid LonPM180](#eddgridlonpm180) seturi de date din toate EDDGrid Seturi de date într-un ERDDAP care au valori de longitudine mai mari de 180.
* Dacă este posibil, utilizați o adresă IP publică (de exemplu,https://oceanwatch.pfeg.noaa.gov) în URL, nu o adresă locală numerică IP (de exemplu,https://12.34.56.78) . Dacă ERDDAP™ este accesibil numai prin intermediul adresei IP numerice locale, puteți utiliza [&lt;Traducerea şi adaptarea: (#convertto publicsourceurl) Deci... ERDDAP™ utilizatorii văd adresa publică, chiar dacă ERDDAP™ Obţine date de la adresa numerică locală.
         
#####  EDDGrid Lon0360FromErddapCatalog{#eddgridlon0360fromerddapcatalog} 
Acest Tip EDD generează datasets.xml pentru a face [ EDDGrid Lon0360](#eddgridlon0360) seturi de date din toate EDDGrid Seturi de date într-un ERDDAP care au valori de longitudine mai mici de 0.
* Dacă este posibil, utilizați o adresă IP publică (de exemplu,https://oceanwatch.pfeg.noaa.gov) în URL, nu o adresă locală numerică IP (de exemplu,https://12.34.56.78) . Dacă ERDDAP™ este accesibil numai prin intermediul adresei IP numerice locale, puteți utiliza [&lt;Traducerea şi adaptarea: (#convertto publicsourceurl) Deci... ERDDAP™ utilizatorii văd adresa publică, chiar dacă ERDDAP™ Obţine date de la adresa numerică locală.
         
##### EDD din dosare{#eddsfromfiles} 
Având în vedere un director de pornire, acest lucru traversează directorul și toate subdirectoarele și încearcă să creeze un set de date pentru fiecare grup de fișiere de date pe care le găsește.
* Acest lucru presupune că, atunci când se găsește un set de date, setul include toate subdirecțiile.
* În cazul în care se găsește un set de date, directoarele similare vor fi tratate ca seturi de date separate (De exemplu, directoarele pentru anii 1990, 2000, 2010 vor genera seturi de date separate) . Acestea ar trebui să fie ușor de combinat manual -- doar modificați primul set de date&lt;fileDir&gt; la directorul-mamă și ștergeți toate setările de date pentru frați ulterioare.
* Acest lucru va încerca doar să genereze o bucată de datasets.xml pentru cel mai comun tip de extensie a fișierului într-un director (fără numărarea .md5, care este ignorat) . Deci, dat un director cu 10 .nc fișiere și 5 fișiere .txt, va fi generat un set de date pentru .nc Doar dosare.
* Aceasta presupune că toate fișierele dintr-un director cu aceeași extensie aparțin aceluiași set de date. Dacă un director are ceva .nc fișiere cu date SST și unele .nc fișiere cu date clorofila, doar un eșantion .nc fișierul va fi citit (SST? clorofilă?) și doar un set de date va fi creat pentru acest tip de fișier. Acest set de date nu va fi probabil încărcat din cauza complicațiilor de la încercarea de a încărca două tipuri de fișiere în același set de date.
* Dacă există mai puțin de 4 fișiere cu cea mai comună extensie într-un director, acest lucru presupune că acestea nu sunt fișiere de date și pur și simplu sare peste director.
* Dacă există 4 sau mai multe fișiere într-un director, dar acest lucru nu poate genera cu succes o bucată de datasets.xml pentru fișiere (de exemplu, un tip de fișier nesuportat) , acest lucru va genera un [Tabel EDDFromFileNames](#eddtablefromfilenames) Set de date pentru fișiere.
* La sfârșitul diagnosticului că acest lucru scrie la fișierul jurnal, chiar înainte de datasets.xml Bucăţi, asta va imprima o masă cu un rezumat al informaţiilor adunate traversând toate subdirectoarele. Tabelul va lista fiecare subdosar și va indica cel mai comun tip de extensie a fișierului, numărul total de fișiere și ce tip de set de date a fost creat pentru aceste fișiere (dacă este cazul) . Dacă vă confruntaţi cu o structură complexă, adânc cuibărită de fişiere, luaţi în considerare funcţionarea GenerateDatesets Xml cu EDDType=EDDsFromFiles doar pentru a genera aceste informații,
* Această opțiune nu poate face o treabă bună de ghicit cel mai bun EDDType pentru un anumit grup de fișiere de date, dar este rapid, ușor, și merită o încercare. Dacă fișierele sursă sunt potrivite, funcționează bine și este un bun prim pas în generarea datasets.xml pentru un sistem de fișiere cu multe subdirectoare, fiecare cu fișiere de date din seturi de date diferite.
         
##### Tabel EDDFromEML și tabel EDDFromEMLBatch{#eddtablefromeml-and-eddtablefromemlbatch} 
Aceste tipuri speciale de EDD generează datasets.xml pentru a face o [Tabel EDD din AsciiFiles](#eddtablefromasciifiles) Set de date din fiecare tabel descris într-un [Limbajul metadatelor ecologice](https://knb.ecoinformatics.org/external//emlparser/docs/index.html) Fișier XML. Varianta "Batch" funcționează pe toate fișierele EML într-un director local sau la distanță. Vă rugăm să vedeți separat [documentaţie pentru tabelul EDDFromEML](/docs/server-admin/EDDTableFromEML) .
     
##### Tabel EDD dinspre interior{#eddtablefrominport} 
Acest tip special de EDD generează datasets.xml pentru a face o [Tabel EDD din AsciiFiles](#eddtablefromasciifiles) Setul de date din informațiile dintr-o [inport- xml](https://inport.nmfs.noaa.gov/inport) Dosar. Dacă puteți obține acces la fișierul sursă de date (fișierul inport-xml ar trebui să aibă indicii pentru unde să-l găsească) , puteți face un set de date de lucru în ERDDAP .

Următoarele etape prezintă modul de utilizare GenerateDatasets Xml cu un fișier inport-xml pentru a obține un set de date de lucru în ERDDAP .

1. Odată ce aveți acces la fișierul inport-xml (fie ca URL sau ca fișier local) : run GenerateDatesets Xml, specificați EDDType=EDDtableFromInPort, specificați URL-ul în port-xml sau numele întreg al fișierului, specificați care Child=0 și specificați celelalte informații solicitate (dacă este cunoscut) . (În acest moment, nu trebuie să aveți fișierul sursă de date sau să specificați numele acesteia.) @ info: whatsthis Xml pentru a scrie informațiile pentru **toate** al&lt;informații privind atributul entității &gt;&lt;entitate &gt; este în fișierul inport-xml (dacă există) . De asemenea, imprima un rezumat de fundal, inclusiv toate de descărcare-url enumerate în fișierul inport-xml.
2. Uită-te prin toate aceste informații (inclusiv informațiile de fond care generează date Amprente Xml) și vizitați descărcarea-url (s) pentru a încerca să găsească fișierul sursă de date (s) . Dacă o poţi găsi (Ei...) , descarca-l (Ei...) într-un director accesibil ERDDAP . (Dacă nu găsiţi nici un fişier sursă de date, nu are rost să continuaţi.) 
3. Generează rulează Setări de date Din nou Xml.
Dacă fișierul de date sursă corespunde cu unul dintre fișierele inport-xml&lt;informații privind atributul entității &gt;&lt;entity&gt;'s, specifica whichChild= *că numărul lui Entity*   (De exemplu, 1, 2, 3, ...) . ERDDAP™ va încerca să se potrivească numele coloanei din fișierul de date sursă cu numele din informațiile entității și va încerca să accepte/rejecteze/remedieze orice discrepanțe.
Sau, în cazul în care fișierul inport-xml nu are nici&lt;informații privind atributul entității &gt;&lt;entity&gt;'s, specifica care Child=0.
4. În bucata de datasets.xml care a fost făcută de GenerateDatasets Xml, revizuiește [global&lt; addAttributes &gt;] (#atribute globale) după cum este necesar/dorit.
5. În bucata de datasets.xml care a fost făcută de GenerateDatasetsXml, adăugați/revizuiți [&lt; dataVariable &gt;] (#date variabile) informații necesare/dorite pentru a descrie fiecare dintre variabile. Asiguraţi-vă că identificaţi corect fiecare variabilă
[&lt; sourceName &gt;] (#sourcename)   (așa cum apare în sursă) ,
[&lt; destinationName &gt;] (#destinationname)   (care are mai multe limitări asupra caracterelor permise decât sourceName ) ,
[&lt;unități &gt;] (# Unităţi)   (mai ales dacă este [Variabila timpului sau a momentului](#timestamp-variables) unde unitățile trebuie să specifice formatul) , și
[&lt; missing\\_value &gt;] (Valoarea_missing) ,
6. Când sunteţi aproape de a termina, utilizaţi în mod repetat [DasDds](#dasdds) instrument pentru a vedea rapid dacă descrierea setului de date este valabilă și dacă setul de date va apărea în ERDDAP™ Cum vrei tu.
     

Ar fi minunat dacă grupurile care utilizează InPort pentru a documenta seturile lor de date ar folosi, de asemenea, ERDDAP™ să pună la dispoziție datele reale:

*    ERDDAP™ este o solutie care poate fi folosita chiar acum astfel incat sa puteti indeplini NOAA 's [Accesul public la rezultatele cercetării (PARR) Cerințe](https://nosc.noaa.gov/EDMC/PD.DSP.php) Chiar acum, nu într-un moment vag în viitor.
*    ERDDAP™ pune datele reale la dispoziția utilizatorilor, nu doar a metadatelor. (La ce bun metadatele fără date?) 
*    ERDDAP™ acceptă metadatele (în special, unitățile variabilelor) , spre deosebire de alte software server de date fiind luate în considerare. (La ce sunt bune datele fără metadate?) Pentru a utiliza software-ul care nu suportă metadatele este de a invita datele să fie înțelese greșit și utilizate în mod abuziv.
*    ERDDAP™ este software liber și open-source, spre deosebire de alte software-uri luate în considerare. Dezvoltarea continuă a ERDDAP™ este deja plătit. Suport pentru ERDDAP™ utilizatorii sunt liberi.
*    ERDDAP Aparența lui poate fi ușor personalizat pentru a reflecta și evidenția grupul dumneavoastră (nu ERD sau ERDDAP ) .
*    ERDDAP™ oferă o modalitate coerentă de acces la toate setările de date.
*    ERDDAP™ poate citi date din mai multe tipuri de fișiere de date și din bazele de date relaționale.
*    ERDDAP™ pot face față unor seturi mari de date, inclusiv seturilor de date în care datele sursă se află în numeroase fișiere de date.
*    ERDDAP™ poate scrie date la mai multe tipuri de fișiere de date, la cererea utilizatorului, inclusiv tipuri de fișiere de date științifice, cum ar fi netCDF, ESRI .csv, și ODV .txt .
*    ERDDAP™ poate face grafice personalizate și hărți ale subseturilor de date, pe baza specificațiilor utilizatorului.
*    ERDDAP™ se pot ocupa de seturile de date nedate, cum ar fi colectarea de imagini, video sau fișiere audio.
*    ERDDAP™ a fost instalat și utilizat la [peste 60 de instituții din întreaga lume](/#who-uses-erddap) .
*    ERDDAP™ este listat ca unul dintre serverele de date recomandate pentru utilizare în NOAA în [ NOAA Directiva privind procedura de acces la date](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) Spre deosebire de alte programe luate în considerare.
*    ERDDAP™ este un produs al NMFS / NOAA , deci folosindu-l în NMFS şi NOAA Ar trebui să fie un punct de mândrie pentru NMFS şi NOAA .

Te rog da ERDDAP™ o încercare. Dacă aveţi nevoie de ajutor, vă rugăm să postaţi un mesaj în ERDDAP™ Grupul Google.
     
##### addFillValueAttributes{#addfillvalueattributes} 
Această opțiune specială EDDType nu este un tip de set de date. Este un instrument care poate adăuga atribute \\_FillValue la unele variabile din anumite seturi de date. Vezi? [addFillValueAttributes](#add-_fillvalue-attributes) .
     
##### gindesteDuplicat Timp{#findduplicatetime} 
Această opțiune specială EDDType nu este un tip de set de date. În schimb, spune GenerateDatasets Xml pentru a căuta printr-o colecție de gridded .nc   (și legate) fișiere pentru a găsi și imprima o listă de fișiere cu valori ale timpului duplicat. Când se uită la valorile de timp, le transformă din unitățile originale în "seconds since 1970-01-01" în cazul în care diferite fișiere folosesc diferite unități siruri de caractere. Trebuie să furnizeze directorul de pornire (cu sau fără tăietura de cale) , expresia regulată a numelui fișierului (De exemplu, .\\*\\\ .nc  ) , și numele variabilei de timp în fișiere.
     
##### ncdump{#ncdump} 
Această opțiune specială EDDType nu este un tip de set de date. În schimb, spune GenerateDatasets Xml pentru a imprima un [ncdump](https://linux.die.net/man/1/ncdump) \\-ca imprimarea unui .nc , .nc ml sau .hdf Dosar. Foloseşte netcdf-java. [NCdump](https://docs.unidata.ucar.edu/netcdf-java/5.4/javadoc/ucar/nc2/write/Ncdump.html) , care este un instrument mai limitat decât versiunea C a NCdump. Dacă utilizați această opțiune, GenerateDatasetsXml vă va cere să utilizați una dintre opțiunile: "-h" (antet) , "-C" (coordonate vars) , "-vall" (implicit) , "-v var1;var2," "-v var1 (0,0:10,0:20) ". Acest lucru este util pentru că, fără ncdump este greu să știi ce este într-o .nc , .nc ml sau .hdf fișier și astfel care EDDType ar trebui să specifice pentru GenerateDatasets Xml. Pentru .nc ml fișier, acest lucru va imprima ieșire ncdump pentru rezultatul .nc modificări de fișier ml aplicate suportului .nc sau .hdf Dosar.
         
### DasDds{#dasdds} 
*    [ **DasDds** ](#dasdds) este un program de linie de comandă pe care îl puteți utiliza după ce ați creat o primă încercare la XML pentru un nou set de date în datasets.xml . Cu DasDds, puteți testa și rafina în mod repetat XML. Când utilizați programul DasDds:
    1. Pe Windows, prima dată când executați DasDds, aveți nevoie pentru a edita DasDds. fișier liliac cu un editor de text pentru a schimba calea către java. exe fişier astfel încât Windows poate găsi Java .
    2. DasDds vă cere pentru datasetID pentru setul de date la care lucraţi.
    3. DasDds încearcă să creeze setul de date cu care datasetID .
        * DasDds imprima întotdeauna o mulțime de mesaje de diagnosticare.
Dacă utilizați "DasDds -verbose," DasDds va imprima mai multe mesaje de diagnosticare decât de obicei.
        * Pentru siguranță, DasDds șterge întotdeauna toate informațiile privind setul de date cache (fișiere) pentru setul de date înainte de a încerca să creeze setul de date. Acesta este echivalentul stabilirii [steag tare](/docs/server-admin/additional-information#hard-flag) Deci, pentru seturi de date agregate, ați putea dori să ajustați temporar fișierulNameRegex pentru a limita numărul de fișiere găsite de constructorul de date.
        * Dacă setul de date nu se încarcă (Pentru orice motiv) , DasDds se va opri și vă va arăta mesajul de eroare pentru prima eroare pe care o găsește.
             **Nu încerca să ghiceşti care ar putea fi problema. Citiţi cu atenţie mesajul ERROR.**   
Dacă este necesar, citiți mesajele de diagnosticare precedente pentru a găsi mai multe indicii și informații, de asemenea.
        *    **Face o schimbare la XML-ul setului de date pentru a încerca să rezolve această problemă**   
și să DasDds încerca să creeze din nou setul de date.
        *    **Dacă rezolvați în mod repetat fiecare problemă, veți rezolva în cele din urmă toate problemele**   
iar setul de date se va încărca.
    4. Toate rezultatele DASDd (diagnostice și rezultate) sunt scrise pe ecran și la *Big ParentDirectory* /logs/DasDds.log .
    5. Dacă DasDds poate crea setul de date, DasDds vă va arăta apoi [.das (Structura de atribuire a datelor) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_das) , [.dds (Descriptor de date Structura) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_dds) , și [.time Gaps (intervale de timp) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps) informații pentru setul de date de pe ecran și scrieți-le *Big ParentDirectory* /logs/DasDds.out.
    6. Adesea, veți dori să faceți unele mici modificări la XML-ul setului de date pentru a curăța metadatele setului de date și a rerula DasDds.

### Bonus Instrumentul pentru partea a treia: ERDDAP - Lint.{#bonus-third-party-tool-erddap-lint} 
 ERDDAP -Lint este un program de la Rob Fuller și Adam Leadbetter al Institutului Irish Marine pe care îl puteți folosi pentru a îmbunătăți metadatele de dvs. ERDDAP™ Seturi de date. ERDDAP -Lint "conţine reguli şi o aplicaţie web statică simplă pentru efectuarea unor teste de verificare împotriva dumneavoastră ERDDAP™ server. Toate testele sunt efectuate în browserul web." Ca [Unix/Linux scame instrument](https://en.wikipedia.org/wiki/Lint_(software) ), puteți edita normele existente sau adăuga noi reguli. Vezi? [ ERDDAP - Lint.](https://github.com/IrishMarineInstitute/erddap-lint) pentru mai multe informații.

Acest instrument este deosebit de util pentru seturile de date pe care le-ați creat cu ceva timp în urmă și acum doriți să aduceți la zi preferințele dumneavoastră actuale de metadate. De exemplu, versiunile timpurii ale Seturilor de Date Generate Xml nu a depus niciun efort în crearea globală creator\\_name , creator\\_email , creator\\_type; sau creator\\_url metadate. Ai putea folosi ERDDAP -intru in identificarea seturilor de date care lipsesc acele atribute de metadate.

Datorită Rob și Adam pentru crearea acestui instrument și punerea la dispoziția ERDDAP™ comunitate.
 
## Structura de bază a datasets.xml Fișier{#the-basic-structure-of-the-datasetsxml-file} 
Etichetele obligatorii și opționale permise în a datasets.xml fișier (și numărul de ori acestea pot apărea) sunt prezentate mai jos. În practică, dumneavoastră datasets.xml va avea o mulțime de&lt;Etichetele setului de date &gt; și se utilizează numai celelalte etichete din cadrul&lt;erddapDatasets &gt; dacă este necesar.

  >&nbsp;&lt;&#63;xml version="1.0" encoding="ISO-8859-1" &#63;>  
  >&nbsp;&lt;erddapDatasets>  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeUnits>](#angulardegreeunits)...&lt;/angularDegreeUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeTrueUnits>](#angulardegreetrueunits)...&lt;/angularDegreeTrueUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;cacheMinutes>](#cacheminutes)...&lt;/cacheMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;commonStandardNames>](#commonstandardnames)...&lt;/commonStandardNames> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateRequestCSVExample />](#convertinterpolaterequestcsvexample) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateDatasetIDVariableList />](#convertinterpolatedatasetidvariablelist) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertToPublicSourceUrl />](#converttopublicsourceurl) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxGB>](#decompressed-cache)...&lt;/decompressedCacheMaxGB> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxMinutesOld>](#decompressed-cache)...&lt;/decompressedCacheMaxMinutesOld> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;drawLandMask>](#drawlandmask)...&lt;/drawLandMask> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;emailDiagnosticsToErdData>](#emaildiagnosticstoerddata)...&lt;/emailDiagnosticsToErdData> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;graphBackgroundColor>](#graphbackgroundcolor)...&lt;/graphBackgroundColor> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequests>](#ipaddressmaxrequests)...&lt;/ipAddressMaxRequests> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequestsActive>](#ipaddressmaxrequestsactive)...&lt;ipAddressMaxRequestsActive> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressUnlimited>](#ipaddressunlimited)...&lt;ipAddressUnlimited> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMinMinutes>](#loaddatasetsminminutes)...&lt;/loadDatasetsMinMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMaxMinutes>](#loaddatasetsmaxminutes)...&lt;/loadDatasetsMaxMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;logLevel>](#loglevel)...&lt;/logLevel> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nGridThreads>](#nthreads)...&lt;/nGridThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nTableThreads>](#nthreads)...&lt;/nTableThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;palettes>](#palettes)...&lt;/palettes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxBytes>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxBytes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxCells>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxCells> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;requestBlacklist>](#requestblacklist)...&lt;/requestBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;slowDownTroubleMillis>](#slowdowntroublemillis)...&lt;/slowDownTroubleMillis> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;subscriptionEmailBlacklist>](#subscriptionemailblacklist)...&lt;/subscriptionEmailBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;unusualActivity>](#unusualactivity)...&lt;/unusualActivity> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;updateMaxEvents>](#updatemaxevents)...&lt;/updateMaxEvents> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;standardLicense>](#standard-text)...&lt;/standardLicense> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardContact>](#standard-text)...&lt;/standardContact> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDataLicenses>](#standard-text)...&lt;/standardDataLicenses> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfEndorsement>](#standard-text)...&lt;/standardDisclaimerOfEndorsement> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfExternalLinks>](#standard-text)...&lt;/standardDisclaimerOfExternalLinks> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardGeneralDisclaimer>](#standard-text)...&lt;/standardGeneralDisclaimer> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardPrivacyPolicy>](#standard-text)...&lt;/standardPrivacyPolicy> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startHeadHtml5>](#standard-text)...&lt;/startHeadHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startBodyHtml5>](#standard-text)...&lt;/startBodyHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;theShortDescriptionHtml>](#standard-text)...&lt;/theShortDescriptionHtml> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;endBodyHtml5>](#standard-text)...&lt;/endBodyHtml5> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;user username="..." password="..." roles="..." />](#user) &lt;!-- 0 or more -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;dataset>](#list-of-types-datasets)...&lt;/dataset> &lt;!-- 1 or more -->  
  >&nbsp;&lt;/erddapDatasets>  

Este posibil ca alte codări să fie permise în viitor, dar pentru moment, se recomandă doar ISO-8859-1.
 
### XIclude{#xinclude} 
Nou în versiunea 2.25 este suport pentru XIInclude. Acest lucru necesită utilizarea parserului SAX&lt;UtilizareSaxParser&gt;true&lt;/useSaxParser&gt; in your setup.xml. Acest lucru vă poate permite să scrieți fiecare set de date în propriul său fișier, apoi să le includă pe toate în principal datasets.xml , refolosirea părților din definițiile setului de date sau ambele. Dacă doriți să vedeți un exemplu, [EDDTestDataset.java](https://github.com/ERDDAP/erddap/blob/main/src/test/java/testDataset/EDDTestDataset.java) stabilește XIinclusiv pentru reutilizarea definițiilor variabile.
 

- - -

## Note{#notes} 

Lucrul cu datasets.xml Dosarul este un proiect non-trivial. Vă rugăm să citiţi cu atenţie toate aceste note. După ce alegeți un [Tipul setului de date](#list-of-types-datasets) Vă rugăm să citiţi cu atenţie descrierea detaliată a acesteia.
     
### Alegerea tipului de set de date{#choosing-the-dataset-type} 
În cele mai multe cazuri, există doar unul ERDDAP™ tipul setului de date care este adecvat pentru o anumită sursă de date. În câteva cazuri (de exemplu, .nc fișiere) Sunt câteva posibilităţi, dar de obicei una dintre ele e cea mai bună. Prima şi cea mai mare decizie pe care trebuie să o luaţi este: este potrivit să trataţi setul de date ca pe un grup de matrice multidimensionale (dacă da, vezi [ EDDGrid Tipuri de seturi de date](#eddgrid) ) sau ca un tabel de date de tip bază de date (dacă da, vezi [Tipuri de seturi de date EDD](#eddtable) ) .
     
### Servirea datelor aşa cum este{#serving-the-data-as-is} 
De obicei, nu este necesară modificarea sursei de date (De exemplu, converti fișierele la un alt tip de fișier) astfel încât ERDDAP™ poate servi. Una dintre ipotezele ERDDAP™ este că sursa de date va fi utilizată așa cum este. De obicei merge bine. Unele excepții sunt:
* Baza de date relaţională şi Cassandra -- ERDDAP™ pot servi date direct din bazele de date relaționale și Cassandra. Dar pentru securitate, echilibrarea sarcinii, și probleme de performanță, puteți alege să configurați o altă bază de date cu aceleași date sau salva datele la NetCDF v3 .nc fișiere și au ERDDAP™ să servească datele din noua sursă de date. Vezi? [Tabel EDD din baza de date](#eddtablefromdatabase) şi [Tabel EDD din Cassandra](#eddtablefromcassandra) .
* Surse de date nesusţinute... ERDDAP™ poate sprijini un număr mare de tipuri de surse de date, dar lumea este plină de 1000 (milioane?) din diferite surse de date (în special, structurile de fișiere de date) . Dacă ERDDAP™ nu suportă sursa ta de date:
    * Dacă sursa de date este NetCDF   .nc fișiere, puteți utiliza [NcML](#ncml-files) modificarea fișierelor de date la zbor sau utilizarea [ NCO ](#netcdf-operators-nco) modificarea permanentă a fișierelor de date.
    * Puteți scrie datele unui tip de sursă de date care ERDDAP™ sprijină. NetCDF - 3 .nc fișierele sunt o recomandare bună, generală, deoarece acestea sunt fișiere binare care ERDDAP™ poate citi foarte repede. Pentru datele tabulare, ia în considerare stocarea datelor într-o colecție de .nc fișiere care utilizează [CF Geometrii de eșantionare discrete (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Structuri de date Contiguous Ragged Array și astfel pot fi manipulate cu ERDDAP 's [Tabel EDD din NCFFile](#eddtablefromnccffiles) ). Dacă sunt organizate logic (fiecare cu date pentru o bucată de spațiu și timp) , ERDDAP™ poate extrage date de la ei foarte repede.
    * Puteți solicita ca sprijinul pentru această sursă de date să fie adăugat la ERDDAP™ prin e-mail Chris. John la Noaa.gov.
    * Puteți adăuga suport pentru această sursă de date scriind codul pentru a-l descurca singur. Vezi? [nu ERDDAP™ Ghidul programatorului](/docs/contributing/programmer-guide) 
* Viteza... ERDDAP™ poate citi date din unele surse de date mult mai repede decât altele. De exemplu, citirea NetCDF v3 .nc Fișierele sunt rapide și citirea fișierelor ASCII este mai lentă. Și dacă există o mare (&gt; 1000) sau uriaş (&gt; 10000) numărul de fișiere sursă de date; ERDDAP™ va răspunde încet la unele solicitări de date. De obicei, diferenţa nu poate fi observată pentru oameni. Cu toate acestea, dacă credeţi ERDDAP™ este lent pentru un anumit set de date, puteți alege pentru a rezolva problema prin scrierea datelor la o configurare mai eficientă (de obicei: câteva, bine structurate, NetCDF v3 .nc fișiere) . Pentru date tabulare, a se vedea [acest sfat](#millions-of-files) .
         
### Indiciu{#hint} 
Este adesea mai ușor să se genereze XML-ul pentru un set de date prin efectuarea unei copii a unei descrieri a setului de date de lucru în set.xml și apoi modificarea acestuia.
    
### Codare caractere speciale{#encoding-special-characters} 
De când datasets.xml este un fișier XML, trebuie [& Cod](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML) "&,"&lt;" și "&gt;" în orice conținut ca "&amp;,"&lt;" şi "&gt;."
Greșit:&lt;Titlul &gt; Timp & Tides&lt;/titlu&gt;
Dreapta:&lt;Titlul &gt; Timp și Tides&lt;/titlu&gt;
     
### XML nu tolerează erorile de sintaxă{#xml-doesnt-tolerate-syntax-errors} 
După ce ați editat fișierul Setting.xml, este o idee bună pentru a verifica că rezultatul este [XML bine format](https://www.w3schools.com/xml/xml_dtd.asp) prin lipirea textului XML într-un checker XML ca [Validare xml](https://www.xmlvalidation.com/) .
     
### Sfaturi de depanare{#troubleshooting-tips} 
*    **Alte modalități de a diagnostica probleme cu datele**   
Pe lângă cele două principale [Unelte](#tools) ,
    *    [log.txt](/docs/server-admin/additional-information#log) este un fișier jurnal cu toate ERDDAP Mesajele de diagnosticare.
    * ă [Raport zilnic](/docs/server-admin/additional-information#daily-report) are mai multe informații decât pagina de stare, inclusiv o listă de seturi de date care nu au încărcat și excepțiile (erori) au generat.
    * ă [Pagina statutului](/docs/server-admin/additional-information#status-page) este un mod rapid de a verifica ERDDAP Starea lui de la orice browser web. Acesta include o listă de seturi de date care nu au încărcat (cu toate că nu excepțiile aferente) și statistici Thread (care demonstrează progresul [ EDDGrid Copiază](#eddgridcopy) şi [EDDCommentCopy](#eddtablecopy) Seturi de date și orice [ EDDGrid Din dosare](#eddgridfromfiles) sau [Tabel EDD din dosare](#eddtablefromfiles) Seturi de date care utilizează [cacheFromUrl](#cachefromurl)   (dar nu cache Dimensiune GB) ) .
    * Dacă te blochezi, ne vezi [secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support) .
         
### Variabile speciale{#special-variables} 
*    ** [longitudinea, latitudinea, altitudinea, adâncimea, presiunea și timpul (LLAT) variabilă](#destinationname)   [ destinationName ](#destinationname) S sunt speciale.** 
    * În general:
        * Variabilele LLAT sunt cunoscute ERDDAP™ dacă variabila axei (pentru EDDGrid Seturi de date) sau variabila datelor (pentru seturi de date ale tabelului EDD)   [ destinationName ](#destinationname) este "longitudine," "latitudine," "altitudine," "aprofundat" sau "time" .
        * Vă încurajăm cu tărie să utilizați aceste nume standard pentru aceste variabile ori de câte ori este posibil. Nici unul dintre ele nu este necesar. Dacă nu utilizați aceste nume variabile speciale, ERDDAP™ Nu vor recunoaşte semnificaţia lor. De exemplu, variabilele LLAT sunt tratate special de Make A Graph ( * datasetID * .graph) : dacă variabila Axei X este "longitudine," iar variabila Axei Y este "latitudine," veți primi o hartă (utilizarea unei proiecții standard și cu o mască de teren, limite politice etc.) în loc de un grafic.
        *    ERDDAP™ va adăuga automat o mulțime de metadate la variabilele LLAT (de exemplu, " [ ioos\\_category ](#ioos_category) "," [unități](#units) " și mai multe atribute legate de standarde cum ar fi "\\_CoordonatAxisType") .
        *    ERDDAP™ va adăuga automat, on-the-fly, o mulțime de metadate globale legate de valorile LLAT ale subgrupului de date selectate (de exemplu, "geospatial\\_lon\\_min") .
        * Clienții care susțin aceste standarde de metadate vor putea profita de metadatele adăugate pentru a poziționa datele în timp și spațiu.
        * Clienții vor găsi mai ușor de a genera întrebări care includ variabile LLAT, deoarece numele variabilei sunt aceleași în toate seturile de date relevante.
    * Pentru variabila "longitudine" și variabila "latitudine":
        * Utilizaţi [ destinationName ](#destinationname) "Longitudine" şi "latitudine" numai dacă [unități](#units) Sunt grade est şi grade nord. Dacă datele dumneavoastră nu corespund acestor cerințe, utilizați diferite nume variabile (de exemplu, x, y, londians, latRadians) .
        * Dacă aveți date de longitudine și latitudine exprimate în unități diferite și astfel cu diferite destinationName s, de exemplu, lonRadieni și latRadieni, Make A Graph ( * datasetID * .graph) va face grafice (de exemplu, serii de timp) în loc de hărţi.
    * Pentru variabila "altitudine," "asigurare" sau "aprofundat":
        * Utilizaţi [ destinationName ](#destinationname) "altitudine" pentru identificarea distanței datelor peste nivelul mării (valori pozitive="up") . Opțional, puteți folosi "altitudine" pentru distanțe sub nivelul mării dacă valorile sunt negative sub mare (sau dacă utilizați, de exemplu,
[&lt;att name=" scale\\_factor " type="intrück- 1&lt;/att&gt;] (#scale_factor) să transforme valorile adâncimii în valori ale altitudinii.
        * Utilizaţi destinationName "aprofundat" pentru a identifica distanța datelor sub nivelul mării (valori pozitive="jos") .
        * Alternativ, pentru creșterile definite de nivelurile presiunii aerului (cum ar fi [izobari](https://en.wikipedia.org/wiki/Contour_line#Barometric_pressure) ) , ar trebui să setați destinationName la "presiune." Aceasta susține unitățile din "hPa," "Pa" și "mbar" (valori pozitive="jos") .
        * Un set de date poate avea o singură variabilă "altitudine," "presiune" sau "aprofundat."
        * Pentru aceste variabile "altitudine" și "aprofundat," [unități](#units) trebuie să fie "m," "metru," sau "metri." Dacă unităţile sunt diferite (de exemplu, stânjeni) , puteți folosi
[&lt;att name=" scale\\_factor "&gt; *unele Valoare* &lt;/att&gt;] (#scale_factor) şi [&lt;Att name="supermetri&lt;/att&gt;] (# Unităţi) pentru a converti unitățile în metri.
        * Dacă datele dumneavoastră nu corespund acestor cerințe, utilizați un alt destinationName   (De exemplu, deasupra solului, distanţa ToBottom) .
        * Dacă știți SIR-ul vertical, vă rugăm să precizați în metadate, de exemplu, "EPSG:5829" (înălțimea instantanee deasupra nivelului mării) "EPSG:5831" (adâncime instantanee sub nivelul mării) , sau "EPSG:5703" (Înălțimea NAVD88) .
    * Pentru "time" variabilă:
        * Utilizaţi [ destinationName ](#destinationname)   "time" numai pentru variabilele care includ întreaga dată+timp (sau data, dacă asta este tot) . Dacă, de exemplu, există coloane separate pentru data și ora zilei, nu utilizați denumirea variabilă "time" .
        * Vezi? [unități](#time-units) pentru mai multe informații despre atributul unităților pentru timp și variabile Stamp.
        * Variabila temporală și legată [timp Variabilele timbrelor](#timestamp-variables) sunt unice prin care convertesc întotdeauna valorile datelor din formatul temporal al sursei (Orice ar fi) într-o valoare numerică (secunde de la 1970-01-01T00:00:00Z) sau o valoare de coardă (ISO 8601:2004 (E) format) Depinde de situaţie.
        * Atunci când un utilizator solicită date de timp, acestea pot solicita prin specificarea timpului ca valoare numerică (secunde de la 1970-01-01T00:00:00Z) sau o valoare de coardă (ISO 8601:2004 (E) format) .
        *    ERDDAP™ are o utilitate [Schimbă un numeric Timpul până la/de la un timp de coardă](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) .
        * Vezi? [Cum ERDDAP Se ocupă de timp](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) .
            
### De ce doar două structuri de date de bază?{#why-just-two-basic-data-structures} 
* Deoarece este dificil pentru clienții umani și clienții de calculatoare să se ocupe de un set complex de structuri posibile de seturi de date, ERDDAP™ utilizează doar două structuri de date de bază:
    * a [structura de date grided](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)   (de exemplu, pentru datele prin satelit și pentru datele de model) şi
    * a [Structura datelor tabulare](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)   (de exemplu, pentru geamandura in situ, stația și datele traiectoriei) .
* Desigur, nu toate datele pot fi exprimate în aceste structuri, dar o mare parte poate. Tabelele, în special, sunt structuri de date foarte flexibile (uita-te la succesul programelor de baze de date relationale) .
* Astfel, întrebările privind datele sunt mai ușor de construit.
* Acest lucru face ca răspunsurile la date să aibă o structură simplă, ceea ce facilitează utilizarea datelor într-o varietate mai largă de tipuri de fișiere standard (care adesea sprijină doar structuri simple de date) . Acesta este principalul motiv pentru care am înființat ERDDAP™ Pe aici.
* Acest lucru, la rândul său, face foarte ușor pentru noi (sau oricine) pentru a scrie software client care funcționează cu toate ERDDAP™ Seturi de date.
* Acest lucru facilitează compararea datelor din diferite surse.
* Suntem foarte conștienți de faptul că, dacă sunteți obișnuit să lucrați cu date în alte structuri de date, ați putea crede inițial că această abordare este simplistă sau insuficientă. Dar toate structurile de date au compromisuri. Niciuna nu e perfectă. Chiar și structurile do-it-all au dezavantajele lor: lucrul cu ele este complex și fișierele pot fi scrise sau citite numai cu biblioteci speciale de software. Dacă accepţi ERDDAP Abordare suficient pentru a încerca să lucreze cu ea, s-ar putea găsi că are avantajele sale (în special sprijinul pentru mai multe tipuri de fișiere care pot deține răspunsurile la date) . ă [ ERDDAP™ slide show](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html)   (în special [diapozitiv structuri de date](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html#dataStructures) ) Vorbeşte mult despre aceste probleme.
* Și chiar dacă această abordare sună ciudat pentru tine, cele mai multe ERDDAP™ clienții nu vor observa niciodată -- vor vedea pur și simplu că toate seturile de date au o structură simplă și vor fi recunoscători că pot obține date dintr-o mare varietate de surse returnate într-o mare varietate de formate de fișiere.
         
### Dimensiuni{#dimensions} 
*    **Ce se întâmplă dacă variabilele de rețea din setul de date sursă NU împărtășesc aceleași variabile ale axei?**   
În EDDGrid Seturi de date, toate variabilele de date TREBUIE utilizate (cotă) toate variabilele axei. Deci, dacă un set de date sursă are unele variabile cu un set de dimensiuni, și alte variabile cu un set diferit de dimensiuni, va trebui să facă două seturi de date în ERDDAP . De exemplu, s-ar putea face unul ERDDAP™ Set de date intitulat "Unele titluri (la suprafață) " să dețină variabile care folosesc doar \\[ timp \\]  \\[ latitudine \\]  \\[ longitudine \\] dimensiuni și să facă altul ERDDAP™ Set de date intitulat "Unele titluri (la adâncimi) " să dețină variabilele care utilizează \\[ timp \\]  \\[ altitudine \\]  \\[ latitudine \\]  \\[ longitudine \\] . Sau poate puteți schimba sursa de date pentru a adăuga o dimensiune cu o singură valoare (de exemplu, altitudinea = 0.) pentru a face variabilele coerente.
    
     ERDDAP™ nu se ocupă de seturi de date mai complicate (de exemplu, modele care utilizează o plasă de triunghiuri) Bine. Puteți servi aceste seturi de date în ERDDAP™ prin crearea a două sau mai multe seturi de date în ERDDAP™   (astfel încât toate variabilele de date din fiecare set de date nou să aibă același set de variabile ale axei) Dar nu asta vor utilizatorii. Pentru unele seturi de date, ați putea lua în considerare realizarea unei versiuni regulate în grilă a setului de date și oferirea acestuia în plus față de datele originale. Unele software-ul client poate face doar cu o grilă regulat, astfel încât prin a face acest lucru, ajunge la clienți suplimentari.
     
    
### Date proiectate pentru grid{#projected-gridded-data} 
Unele date în reţea au o structură complexă. De exemplu, nivelul satelitului 2 ("de-a lungul drumului") datele nu utilizează o proiecție simplă. Modelatoare (şi altele) de multe ori lucrează cu date în rețea pe diverse proiecții non-cilindrile (de exemplu, conic, stereografic polar, tripolar) sau în rețele nestructurate (o structură de date mai complexă) . Unii utilizatori finali doresc aceste date ca este, astfel încât nu există nici o pierdere de informații. Pentru acei clienti, ERDDAP™ poate servi datele, așa cum este, numai dacă ERDDAP™ administratorul rupe setul de date original în câteva seturi de date, fiecare parte incluzând variabile care au aceleași variabile ale axei. Da, asta pare ciudat pentru oamenii implicați și este diferit de majoritatea OPeNDAP servere. Dar... ERDDAP™ subliniază punerea la dispoziție a datelor în mai multe formate. Acest lucru este posibil deoarece ERDDAP™ utilizează/necesită o structură de date mai uniformă. Deşi e puţin ciudat. (și anume, diferit de cel așteptat) , ERDDAP™ poate distribui datele proiectate.

 \\[ Da. ERDDAP™ ar putea avea cerințe mai slabe pentru structura de date, dar să păstreze cerințele pentru formatele de ieșire. Dar acest lucru ar duce la confuzie în rândul multor utilizatori, în special noi, deoarece multe cereri aparent valabile de date cu diferite structuri ar fi invalide, deoarece datele nu s-ar potrivi în tipul de fișier. Ne tot întoarcem la designul sistemului curent. \\] 

Unii utilizatori finali doresc date într-o proiecţie cilindrică lat lon cum ar fi Equirectangular / plăci carrée sau Mercator) pentru uşurinţă de utilizare în diferite situaţii. Pentru aceste situații, încurajăm ERDDAP™ administrator pentru a utiliza un alt software ( NCO ? Matlab ? R? IDV? ...?) să reproiecteze datele pe o zonă geografică (Proiecţie echirectangulară / farfurie carrée) sau alte proiecții cilindrice și care servesc această formă de date în ERDDAP™ ca un set de date diferit. Acest lucru este similar cu ceea ce fac oamenii atunci când convertesc datele de nivel satelit 2 în datele de nivel 3. Un astfel de instrument este [ NCO ](https://nco.sourceforge.net/nco.html#Regridding) care oferă opțiuni de extensie pentru recuperarea datelor.

#### GIS și datele de reproiectare{#gis-and-reprojecting-data} 
Deoarece lumea GIS este adesea orientată pe hartă, programele GIS oferă de obicei suport pentru reproiectarea datelor, adică complotarea datelor pe o hartă cu o proiecție diferită.

În prezent, ERDDAP™ nu dispune de instrumente de reproiectare a datelor. În schimb, vă recomandăm să utilizați un instrument extern pentru a face o variantă a setului de date, în cazul în care datele au fost reproiectate din forma sa originală pe o formă dreptunghiulară (longitudine latitudine) array adecvat pentru ERDDAP .

În opinia noastră, CF/ DAP Lumea este puţin diferită de lumea GIS şi funcţionează la un nivel uşor inferior. ERDDAP™ reflectă asta. În general, ERDDAP™ este conceput să funcționeze în principal cu date (nu hărți) şi nu vrea să se schimbe. (De exemplu, reproiectarea) datele. Pentru ERDDAP™ , datele în rețea sunt adesea/de obicei/preferabil asociate cu valorile lat lon și o proiecție cilindrică, și nu cu valorile x,y ale unor proiecții. În orice caz, ERDDAP™ nu face nimic cu proiecția datelor; doar transmite datele prin, așa cum este, cu proiecția sa actuală, pe teoria că o reproiectare este o schimbare semnificativă a datelor și ERDDAP™ nu vrea să fie implicat în schimbări semnificative. De asemenea, utilizatorii ulteriori ar putea reproiecta naiv datele din nou, ceea ce nu ar fi la fel de bun ca doar o reproiectare. (Deci, dacă ERDDAP™ administratorul doreste sa ofere datele intr-o proiectie diferita, bine; doar sa reproiecteze datele offline si sa ofere ca un set de date diferit in ERDDAP . O mulțime de seturi de date bazate pe satelit sunt oferite ca ceea ce NASA numește Nivelul 2 (lebădă) și ca nivel 3 (Proiecţie echirectangulară) versiuni.) Când ERDDAP™ face hărți (direct sau prin WMS sau KML) , ERDDAP™ în prezent oferă doar pentru a face hărți cu proiecția Equirectangular / placă carrée care, din fericire, este acceptat de majoritatea programelor de cartografiere.

Încurajăm ERDDAP™ administratori pentru a utiliza un alt software ( NCO ? Matlab ? R? IDV? ...?) să reproiecteze datele pe o zonă geografică (Proiecţie echirectangulară / farfurie carrée) sau alte proiecții cilindrice și care servesc această formă de date în ERDDAP™ ca un set de date diferit. Acest lucru este similar cu ceea ce fac oamenii atunci când convertesc datele de nivel satelit 2 în datele de nivel 3. Un astfel de instrument este [ NCO ](https://nco.sourceforge.net/nco.html#Regridding) care oferă opțiuni de extensie pentru recuperarea datelor.

Sperăm că ERDDAP™ va avea instrumente integrate pentru a oferi hărți cu alte proiecții în viitor. De asemenea, sperăm să avem legături mai bune cu lumea GIS în viitor (altele decât curentul WMS serviciu) . Este groaznic că în această lume "modernă," legăturile dintre CF/ DAP Lumea şi lumea GIS sunt încă atât de slabe. Ambele lucruri sunt pe lista To Do. (Dacă doriți să ajutați, în special cu conectarea ERDDAP™ la MapServer, te rog trimite-i un e-mail lui Chris. John la Noaa.gov.) 
    
### Tipuri de date{#data-types} 
 ERDDAP™ sprijină următoarele tipuri de date
 (numele sunt sensibile la caz; 'u' prefixul înseamnă "nesemnat"; numărul multor nume din alte sisteme este numărul de biți) :

#### octet{#byte} 
*    **octet** a semnat valori întregi cu o gamă de -128-127.
În alte sisteme, acest lucru se numește uneori int8.
Asta se numeşte "tinyint" de SQL şi Cassandra.
     ERDDAP™ convertiți [boolean](#boolean-data) din anumite surse (De exemplu, SQL și Cassandra) în octeți ERDDAP™ cu o valoare de 0=fals, 1=adevărat, și 127= missing\\_value .
#### ubyte{#ubyte} 
*    **ubyte** are valori întregi nesemnate cu o gamă de la 0 la 255.
În alte sisteme, aceasta se numeşte uneori uint8.
#### scurt{#short} 
*    **scurt** a semnat valori întregi cu un interval cuprins între -32768 și 32767.
În alte sisteme, acest lucru se numește uneori int16.
Se numeşte "micuţ" de SQL şi Cassandra.
#### scurt{#ushort} 
*    **scurt** are valori întregi nesemnate cu un interval de la 0 la 65535.
În alte sisteme, acest lucru se numește uneori Uint16.
#### int{#int} 
*    **int** a semnat valori întregi cu o gamă de -2147483648 până la 2147483647.
În alte sisteme, acest lucru se numește uneori int32.
Asta se numeşte "integer." | numeric (?) " by SQL and "int" by Cassandra.
#### uint{#uint} 
*    **uint** are valori întregi nesemnate cu o gamă cuprinsă între 0 și 4294967295.
În alte sisteme, acest lucru se numește uneori uint32.
#### lung{#long} 
*    **lung** a semnat valori întregi cu o gamă de -9223372036854775808 la 9223372036854775807.
În alte sisteme, acest lucru se numește uneori int64.
Asta se numeşte "bigint." | numeric (?) " by SQL and "bigint" by Cassandra.
Deoarece multe tipuri de fișiere nu susțin date lungi, utilizarea lor este descurajată. Când este posibil, utilizați dublu în schimb (vezi mai jos) .
#### ulong{#ulong} 
*    **ulong** are valori întregi nesemnate cu un interval cuprins între 0 și 184467440737095511615
În alte sisteme, acest lucru este uneori numit Uint64.
Deoarece multe tipuri de fișiere nu susțin date lungi, utilizarea lor este descurajată. Când este posibil, utilizați dublu în schimb (vezi mai jos) .
#### float{#float} 
*    **float** este un float IEEE 754 cu o gamă de aproximativ +/- 3.402823466e+38.
În alte sisteme, aceasta se numește uneori float32.
Asta se numeşte "real" | float (?)  | zecimală (?)  | numeric (?) " by SQL and "float" by Cassandra.
Valoarea specială NaN înseamnă Nu-un-Număr.
     ERDDAP™ convertește valorile infinitului pozitiv și negativ la NaN.
#### dublu{#double} 
*    **dublu** este un IEEE 754 dublu cu o gamă de aproximativ
+/- 1,7976931348623157E+308.
În alte sisteme, aceasta se numește uneori float64.
Asta se numeşte "precizie dublă" | float (?)  | zecimală (?)  | numeric (?) " by SQL and "dublu" by Cassandra.
Valoarea specială NaN înseamnă Nu-un-Număr.
     ERDDAP™ convertește valorile infinitului pozitiv și negativ la NaN.
#### char{#char} 
*    **char** este un singur, 2 octet (16 biți)   [Caracter Unicode UCS-2](https://en.wikipedia.org/wiki/UTF-16) variind din \\u0000   (#0) prin \\uffff   (#65535) .
     \\uffff Definiţia lui nu este un "Character," similar unei valori duble a NaN.
Utilizarea de char este descurajat deoarece multe tipuri de fișiere fie nu susțin chars sau numai suport 1-byte chars (vezi mai jos) . Ia în considerare utilizarea String în schimb.
Utilizatorii pot folosi variabile char pentru a face grafice. ERDDAP™ va converti caracterele la numărul de cod Unicode, care poate fi folosit ca date numerice.
#### String{#string} 
*    **String** este o secvență de 0 sau mai mult, 2 octeți (16 biți)   [Unicode UCS-2 caractere](https://en.wikipedia.org/wiki/UTF-16) .
     ERDDAP™ utilizează/interpretează un șir de 0 lungimi ca valoare lipsă. ERDDAP™ nu suportă o coardă nulă adevărată.
Lungimea maximă teoretică a șirului este de 2147483647 caractere, dar există, probabil, diferite probleme în diferite locuri chiar și cu corzi oarecum mai scurte.
Utilizare ERDDAP 's String for SQL's caracter, varchar, caracter various, binar, varbinary, interval, array, multiset, xml, și orice alt tip de date de baze de date care nu se potrivește curat cu orice alt ERDDAP™ tipul de date.
Utilizare ERDDAP 's String for Cassandra's "text" and any other Cassandra data type that doesn't potrivesc cleanly with any other ERDDAP™ tipul de date.
     

Înainte ERDDAP™ v2.10; ERDDAP™ nu a sprijinit tipurile întregi nesemnate pe plan intern și a oferit sprijin limitat cititorilor și scriitorilor de date.
    
### Limitări de tip date{#data-type-limitations} 
Te poţi gândi la ERDDAP™ un sistem care dispune de seturi de date virtuale și care funcționează prin citirea datelor dintr-o sursă de date dintr-un set de date într-un model intern de date și prin scrierea datelor către diferite servicii (de exemplu,(OPeN)DAP, WMS ) și tipuri de fișiere ca răspuns la cererile utilizatorilor.

* Fiecare cititor de intrare suportă un subset de tipuri de date care ERDDAP™ sprijină. Deci, citirea datelor în ERDDAP Structurile interne de date nu sunt o problemă.
* Fiecare scriitor de ieșire suportă, de asemenea, un subset de tipuri de date. Asta e o problemă pentru că ERDDAP trebuie să stoarcă, de exemplu, date lungi în tipuri de fișiere care nu susțin date lungi.
     

Mai jos sunt explicaţiile limitărilor (sau niciunul) de diverși scriitori de ieșire și cum ERDDAP™ se ocupă de probleme. Aceste complicaţii sunt o parte inerentă a ERDDAP Scopul lui de a face sistemele disparate interoperabile.

#### ASCII{#ascii} 
* ASCII (.csv, .tsv , etc.) fișiere text -
    * Toate datele numerice sunt scrise prin reprezentarea String (cu valorile lipsă ale datelor care apar sub formă de șiruri de caractere cu lungime egală cu zero) .
    * Deşi... ERDDAP™ scrie corect valori lungi şi lungi la fişierele text ASCII, mulţi cititori (De exemplu, programe de foi de calcul) nu se pot ocupa corect cu valori lungi și lungi și în schimb convertiți-le la valori duble (cu pierderea preciziei în unele cazuri) .
    * Datele Char și String sunt scrise prin JSON Strings, care se ocupă de toate caracterele Unicode (în special, personajele "neobişnuite" dincolo de ASCII #127, de exemplu, caracterul Euro apare ca "\\u20ac") .
    
        
#### JSON{#json} 
* JSON ( .json , .jsonlCSV , etc.) fișiere text -
    * Toate datele numerice sunt scrise prin reprezentarea String.
    * Datele Char și String sunt scrise ca JSON Strings, care se ocupă de toate caracterele Unicode (în special, personajele "neobişnuite" dincolo de ASCII #127, de exemplu, caracterul Euro apare ca "\\u20ac") .
    * Valorile lipsă pentru toate tipurile de date numerice par nule.
         
####  .nc 3 fișiere{#nc3-files} 
*    .nc 3 fișiere nu susțin nativ orice tipuri de date întregi nesemnate. Înainte de CF v1.9, CF nu a sprijinit tipuri întregi nesemnate. Pentru a face față acestui lucru, ERDDAP™ 2.10+ urmează standardul NUG și adaugă întotdeauna un atribut "\\_Nesemnat" cu o valoare de "adevărat" sau "fals" pentru a indica dacă datele provin dintr-o variabilă nesemnată sau semnată. Toate atributele întregi sunt scrise ca atribute semnate (de exemplu, octet) cu valori semnate (de exemplu, un ubit actual\\_range atributul cu valorile de la 0 la 255, apare ca un atribut octet cu valorile de la 0 la -1 (inversul valorii complementului celor două a valorii din afara intervalului). Nu există nici o modalitate ușoară de a ști care (semnat) atribute întregi ar trebui să fie citite ca atribute nesemnate. ERDDAP™ acceptă atributul "\\_ Nesemnat" atunci când citește .nc 3 dosare.
*    .nc 3 fișiere nu suportă tipurile de date lungi sau lungi. ERDDAP™ se ocupă de acest lucru prin conversia temporară a acestora pentru a fi variabile duble. Dublu pot reprezenta exact toate valorile până la +/- 9,007,199,254,740,992 care este 2^53. Aceasta este o soluţie imperfectă. Unidata refuză să facă un upgrade minor la .nc 3 pentru a rezolva această problemă și problemele conexe, citând .nc 4 (o schimbare majoră) ca soluţie.
* Specificațiile CF (înainte de v1. 9) a declarat că sprijină un tip de date de tip char, dar nu este clar dacă Char este destinat doar ca elemente de bază ale matricelor char, care sunt în mod eficient Strings. Întrebările la lista lor de corespondenţă au dat doar răspunsuri confuze. Din cauza acestor complicații, este cel mai bine pentru a evita variabilele char în ERDDAP™ și să utilizeze variabile String ori de câte ori este posibil.
* Tradiţional, .nc 3 fişiere acceptate numai siruri de caractere cu ASCII-codate (7 biți; #0 - #127) Personaje. NUG (şi ERDDAP ) se extinde (începând cu ~2017) prin includerea atributului "\\_Encoding" cu o valoare de "ISO-8859-1" (o extensie a ASCII care definește toate valorile 256 ale fiecărui caracter pe 8 biți) sau "UTF-8" pentru a indica modul în care sunt codificate datele String. Alte codări pot fi legale, dar sunt descurajate.
         
####  .nc 4 fișiere{#nc4-files} 
*    .nc 4 fișiere suportă toate ERDDAP Sunt tipuri de date.
    
#### Fișiere NCCSV{#nccsv-files} 
Fișierele NCCSV 1.0 nu suportă niciun tip de date întregi nesemnate.
 [Fișiere NCCSV 1.1+](/docs/user/nccsv-1.00) să sprijine toate tipurile de date întregi nesemnate.
     
####  DAP  {#dap} 
*   (OPeN)DAP  (.das, .dds, .sc fișiere ASCII, și .dods fișiere binare) -
    *   (OPeN)DAPse ocupă scurt, scurt, int, uint, float și valori duble corect.
    *   (OPeN)DAPare un tip de date "byte" pe care le definește ca nesemnate, în timp ce istoric, THREDS și ERDDAP™ au tratat "octet" ca fiind semnat în(OPeN)DAPServicii. Pentru a face cu acest lucru mai bine, ERDDAP™ 2.10+ urmează standardul NUG și adaugă întotdeauna un atribut "\\_Nesemnat" cu o valoare de "adevărat" sau "fals" pentru a indica dacă datele sunt ceea ce ERDDAP™ Apeluri octet sau ubyte. Toate atributele octeți și ubiti sunt scrise ca atribute "octeți" cu valori semnate (de exemplu, un ubit actual\\_range atributul cu valorile de la 0 la 255, apare ca un atribut octet cu valorile de la 0 la -1 (inversul valorii complementului celor două a valorii din afara intervalului). Nu există nici o modalitate ușoară de a ști ce atribute "byte" ar trebui să fie citite ca atribute ubyte.
    *   (OPeN)DAPnu suportă perioade lungi semnate sau nesemnate. ERDDAP™ se ocupă de acest lucru prin conversia temporară a acestora pentru a fi variabile și atribute duble. Dublu pot reprezenta exact toate valorile până la 9,007,199,254,740,992 care este 2^53. Aceasta este o soluţie imperfectă. OPeNDAP   (organizația) refuză să facă un upgrade minor la DAP 2.0 să se ocupe de acest lucru și probleme conexe, citând DAP 4 (o schimbare majoră) ca soluţie.
    * Pentru că(OPeN)DAPnu are un tip separat de date de tip char și, din punct de vedere tehnic, suportă doar caractere ASCII de 1 octet (#0 - #127) în Strings, variabilele de date char vor apărea sub formă de coarde cu 1 caracter lung în(OPeN)DAP.das, .dds, și .dods răspunsuri.
    * Tehnic,(OPeN)DAPSpecificaţia suportă doar siruri de caractere cu caractere codate ASCII (#0 - #127) . NUG (şi ERDDAP ) se extinde (începând cu ~2017) prin includerea atributului "\\_Encoding" cu o valoare de "ISO-8859-1" (o extensie a ASCII care definește toate valorile 256 ale fiecărui caracter pe 8 biți) sau "UTF-8" pentru a indica modul în care sunt codificate datele String. Alte codări pot fi legale, dar sunt descurajate.
         
### Tip de date Comentarii{#data-type-comments} 
* Din cauza suportului slab pentru date de lungă durată, ulong și char în multe tipuri de fișiere, descurajăm utilizarea acestor tipuri de date în ERDDAP . Când este posibil, utilizați dublu în loc de lung și lung, și utilizați String în loc de char.
     
* Metadate - Deoarece(OPeN)DAPrăspunsurile .das și .dds nu susțin atribute lungi sau lungi sau tipuri de date (şi în loc să le arate ca dublu) , ați putea dori în schimb să utilizați ERDDAP Reprezentarea tabelară a metadatelor, așa cum se vede în http .../erddap/ **info** / * datasetID * Pagina web .html (de exemplu, [https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html)  )   (pe care le puteți obține și în alte tipuri de fișiere, de exemplu, .csv, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv , .xhtml ) sau .nccsv Răspunsul la metadate (de exemplu, [https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) de .nccsv Metadatele sunt disponibile numai pentru seturile de date tabulare) , ambele dintre care sprijină toate tipurile de date (în special, lung, lung și Char) .
         
### Fișiere media{#media-files} 
Nu toate datele sunt array-uri de numere sau text. Unele seturi de date constau în sau includ fișiere media, cum ar fi imagini, fișiere audio și video. ERDDAP™ are unele caracteristici speciale pentru a facilita accesul utilizatorilor la fișiere media. E un proces în două etape:
 

1. Face fiecare fișier accesibil prin intermediul propriului URL, printr-un sistem care suportă cererile de gamă octet.
Cel mai simplu mod de a face acest lucru este de a pune fișierele într-un director care ERDDAP™ are acces la. (Dacă acestea sunt într-un container ca un .zip fișier, deschide-le, deși este posibil să doriți să oferiți .zip fișier pentru utilizatori prea.) Atunci fă-o. [Tabel EDDFromFileNames](#eddtablefromfilenames) Set de date pentru a face aceste fișiere accesibile prin intermediul ERDDAP™ , în special prin ERDDAP 's [ "files" sistem](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) .
    
Toate fișierele accesibile prin intermediul EDDTableFromFileNames și ERDDAP 's "files" suport sistem [cereri de interval de octeți](https://en.wikipedia.org/wiki/Byte_serving) . În mod normal, atunci când un client (de exemplu, un browser) face o cerere la un URL, devine întregul fișier ca răspuns. Dar cu o cerere de gamă de octeți, cererea specifică o gamă de octeți din fișier, iar serverul returnează doar acei octeți. Acest lucru este relevant aici deoarece jucătorii audio şi video din browsere funcţionează numai dacă fişierul poate fi accesat prin intermediul cererilor de gamă octet.
    
Opțional: Dacă aveți mai mult de un set de date cu fișiere media asociate, puteți face doar un singur EDDtableFromFileNames care are un subdosar pentru fiecare grup de fișiere. Avantajul este că atunci când doriți să adăugați noi fișiere media pentru un nou set de date, tot ce trebuie să faceți este să creați un nou dosar și să introduceți fișierele în acel dosar. Dosarul și fișierele vor fi adăugate automat la setul de date EDDTableFromFileNames.
    
2. Opțional: Dacă aveți un set de date care include trimiteri la fișiere media, adăugați-l la ERDDAP .
De exemplu, este posibil să aveți un fișier .csv cu un rând pentru fiecare dată când cineva a văzut o balenă și o coloană care include numele unui fișier imagine legate de acea observare. Dacă numele fișierului imagine este doar numele fișierului, de exemplu, Img20141024T192403Z, nu un URL complet, atunci trebuie să adăugați [AccessBase fișier Url și/sau fileAccessSuffix](#fileaccessbaseurl) atributele metadatelor pentru aceasta dataVariable care specifică baza și sufixul acestor nume de fișier. Dacă ați făcut fișierele accesibile prin intermediul EDDtableFromFileNames, URL-ul va fi în formă
     *BaseUrl* /erddap/files/ * datasetID * /
De exemplu,
```
        <att name="fileAccessBaseUrl">*someBaseURL*</a>  
        <att name="fileAccessSuffix">.png</a>
```
        
Dacă există o .zip sau alt fișier container cu toate fișierele media legate de o variabilă de date, vă recomandăm să faceți acel fișier accesibil utilizatorilor (vezi pasul 1 de mai sus) şi apoi să-l identifice cu un [AccessArchive Url](#fileaccessarchiveurl) atribut.
    

 \\[ Începând cu ERDDAP™ v1, 82 \\] Dacă faceţi primul pas de mai sus (sau ambii pași) , atunci când un utilizator vede ERDDAP™   "files" sistem pentru respectivul set de date (sau solicită să se consulte un subset al setului de date prin intermediul unui .htmlTable cerere, dacă ați făcut al doilea pas) , ERDDAP™ va arăta o "?," pictogramă la stânga numelui fișierului. În cazul în care utilizatorul plutește peste acea pictogramă, ei vor vedea un popup care arată imaginea, sau un player audio, sau un player video. Navigatorii susțin doar un număr limitat de tipuri de

* imagine (de obicei .gif, .jpg, și .png) ,
* audio (De obicei .mp3, .ogg, și .wav) , și
* fișiere video (De obicei .mp4, .ogv, și . webm) .

Suportul variază cu diferite versiuni ale diferitelor browsere pe diferite sisteme de operare. Deci, dacă aveți o alegere a tipului de fișier de oferit, este logic să ofere aceste tipuri.

Sau, dacă un utilizator face clic pe numele de fișier afișat pe un ERDDAP™ pagina web, browser-ul lor va afișa imaginea, fișierul audio sau video ca o pagină web separată. Acest lucru este foarte util pentru a vedea o imagine foarte mare sau video scalat la ecran complet, în loc de într-un popup.
    
### Lucrul cu fișiere AWS S3{#working-with-aws-s3-files} 
 [Amazon Web Service (AWS) ](https://aws.amazon.com) este un vânzător de [cloud computing](https://en.wikipedia.org/wiki/Cloud_computing) Servicii. [S3](https://aws.amazon.com/s3/) este un sistem de stocare a obiectelor oferit de AWS. În locul sistemului ierarhic de directoare și fișiere ale unui sistem tradițional de fișiere (ca un hard disk în PC-ul tău) , S3 oferă doar "buchete" care dețin "obiecte" (Îi vom suna. "files" ) .

Pentru fișierele ASCII (de exemplu, .csv.) , ERDDAP™ poate lucra cu fișierele în găleți direct. Singurul lucru pe care trebuie să faci este să specifice&lt;fileDir&gt; pentru setul de date utilizând un format specific pentru găleata AWS, de exemplu,https://*bucketName*.s3.*aws-region*.amazonaws.com/*subdirectory*/. Nu trebuie să utilizaţi&lt;Cache FromUrl&gt;. A se vedea mai jos pentru detalii.

Dar pentru fișiere binare (de exemplu, .nc ,.grib,.bufr, și .hdf fișiere) , trebuie să utilizați&lt;CacheFromUrl&gt; sistem descris mai jos. ERDDAP , netcdf-java (care ERDDAP™ folosește pentru a citi date din aceste fișiere) , și alte software-ul de date științifice sunt concepute pentru a lucra cu fișiere într-un sistem tradițional de fișiere care oferă [nivel bloc](https://en.wikipedia.org/wiki/Block-level_storage) acces la fișiere (care permite citirea bucăților unui fișier) , dar S3 oferă doar [nivel fișier (obiect) ](https://en.wikipedia.org/wiki/Block-level_storage) acces la fișiere (care permite numai citirea întregului fișier) . AWS oferă o alternativă la S3, [Magazin Elastic Block (EBS) ](https://aws.amazon.com/ebs/) ), care susține accesul la nivel bloc la fișiere, dar este mai scump decât S3, astfel încât este rar utilizat pentru stocarea în vrac a unor cantități mari de fișiere de date. (Deci, atunci când oamenii spun stocarea datelor în nor (S3) este ieftin, este, de obicei, o comparație mere la portocale.) 

#### Găleți S3{#s3-buckets} 
 **Conţinutul unei găleţi. Cheile. Obiecte.Delimitatoare.**   
Tehnic, găleți S3 nu sunt organizate într-o structură ierarhică de fișiere ca un sistem de fișiere pe un calculator. În schimb, găleţile conţin doar "obiecte" (fișiere) Fiecare are o cheie. (un nume) . Un exemplu de cheie în această găleată noaa-goes17 este

```
ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc
```
URl corespunzătoare pentru acel obiect este

 [https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc](https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR_ABI-L1b-RadC-M6C01_G17_s20192352201196_e20192352203569_c20192352204013.nc) 

AWS suportă o mică variație în modul în care URL-ul este construit, dar ERDDAP™ necesită acest format specific:
  https://*bucketName*.s3.*region*.amazonaws.com/*key*  

Ca de ERDDAP v2.29, puteți utiliza acum `s3://` Format URI în loc de URL-ul găleată. Acesta este formatul utilizat de [AWS s3 cli](https://docs.aws.amazon.com/cli/latest/reference/s3/) .
s3:// *nume găleată* / *cheie* 

ă *regiune* pentru URI S3 pot fi specificate în unul din trei moduri:
- ă *regiune* în numele utilizatorului Tomcat `~/.aws/config` profil
- ă `AWS_DEFAULT_REGION` variabilă de mediu
- ă `aws.regiune` Variabila JVM (în setenv.sh pentru Tomcat) 

Este o practică obişnuită, ca şi în cazul acestui exemplu, să faci numele cheie să arate ca o cale ierarhică plus un nume de fişier, dar tehnic nu sunt. Deoarece este comun și util, ERDDAP™ tratează cheile cu /'s ca și cum acestea sunt o cale ierarhică plus numele fișierului, iar această documentație se va referi la ei ca atare. Dacă cheile unei găleți nu folosesc /'s (de exemplu, o cheie ca
ABI-Lib.2018.052.22.OR\\_ABI-L1b-RadM2-M3C10\\_G16\\_s201805222447575), apoi ERDDAP™ va trata doar întreaga cheie ca un nume de fișier lung.

Private vs Public Buckets -- Administratorul găleții S3 poate face găleata și conținutul acesteia publice sau private. Dacă este public, orice fișier din găleată poate fi descărcat de oricine utilizează URL-ul pentru fișier. Amazon are o [Deschide date](https://aws.amazon.com/opendata/) program care găzduiește seturi de date publice (inclusiv date din NOAA , NASA și USGS) gratuit și nu percepe nimeni pentru a descărca fișierele din aceste găleți. Dacă o găleată este privată, fișierele din găleată sunt accesibile numai utilizatorilor autorizați și AWS percepe o taxă (De obicei plătit de proprietarul găleții) pentru descărcarea fișierelor pe un computer S3. ERDDAP™ poate lucra cu date în găleți publice și private.

#### AWS Acreditari{#aws-credentials} 
Pentru a face astfel încât ERDDAP™ poate citi conținutul de găleți private, aveți nevoie de acreditări AWS și aveți nevoie pentru a stoca un fișier de acreditare în locul standard astfel încât ERDDAP™ pot găsi informaţiile. A se vedea AWS SDK pentru Java 2.x documentație: [Stabilește acreditări implicite](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials) . (Opțiunea de a stoca valorile ca Java parametrii liniei de comandă în \\[ Tomcat \\] /bin/setenv.sh poate fi o opțiune bună.) 
#### AWS / fișiere/{#aws-files} 
* /File/sistem -- ă ERDDAP™   [/Fişiere/sistem](#accessibleviafiles) permite utilizatorilor să descarce fișierele sursă pentru un set de date. Vă recomandăm să activați acest lucru pentru toate seturile de date cu fișiere sursă deoarece mulți utilizatori doresc să descarce fișierele sursă originale.
    * Dacă fișierele sunt într-o găleată S3, cererea utilizatorului de a descărca un fișier va fi manipulată de către ERDDAP™ , care va citi datele din fișier și apoi le transmite utilizatorului, crescând astfel sarcina pe dvs. ERDDAP™ , folosind banda de intrare și de ieșire, și de a face tine (nu ERDDAP™ administrator) plătește taxa de ieșire a datelor către AWS.
    * Dacă fișierele sunt într-o găleată publică S3, cererea utilizatorului de a descărca un fișier va fi redirecționată către URL-ul AWS S3 pentru acel fișier, astfel încât datele nu vor curge prin ERDDAP™ , reducând astfel sarcina pe ERDDAP . Și dacă fișierele sunt într-un Amazon Open Data (gratuit) Găleată publică, apoi tu (nu ERDDAP™ administrator) nu va trebui să plătească nici o taxă de ieșire date la AWS. Astfel, există un mare avantaj deservind datele publice (nu privat) S3 găleți, și un avantaj imens pentru a servi date de la Amazon Open Data (gratuit) Găleţi.

 ERDDAP de asemenea, sprijină acreditările anonime pentru găleți publice. Pentru a utiliza acreditări anonime, adăugați ` <useAwsAnonymous> Adevărat. </useAwsAnonymous> ` la setup.xml.

#### Puncte finale S3 personalizate{#custom-s3-endpoints} 
Pentru stocarea de obiecte compatibile S3 nu este găzduită de Amazon, trebuie să configurați [final_url](https://docs.aws.amazon.com/sdkref/latest/guide/feature-ss-endpoints.html) împreună cu documentarea găleată / cheie folosind un `s3://` URI.

ă *final_url* pot fi specificate în unul din trei moduri:
- ă *final_url* în numele utilizatorului Tomcat `~/.aws/config` profil
- ă `AWS_ENDpoint_URL` variabilă de mediu
- ă `aws.endpoint Url` Variabila JVM (în setenv.sh pentru Tomcat) 

Pentru o listă completă a variabilelor de configurare S3, [A se vedea documentația Amazon](https://docs.aws.amazon.com/cli/latest/topic/config-vars.html) .

 **Certificate autosemnate** 
Pentru găleți S3 auto-hosted, veți avea adesea certificate SSL auto-semnate. Pentru ERDDAP Pentru a citi din aceste găleți, trebuie să adăugați lanțul de certificate la magazinul JVM la `$JAVA_HOME/jre/lib/security/cacerts` . În plus, ERDDAP utilizează [Runtime comun AWS](https://docs.aws.amazon.com/sdkref/latest/guide/common-runtime.html) pentru a accesa găleata asincronic. Acest lucru stimulează performanța, dar necesită, de asemenea, ca certificatele auto-semnate să fie adăugate la magazinul dvs. de OS specifice. Dacă doriți să evitați acest lucru, puteți dezactiva AWS CRT cu ` <useAwsCrt> fals </useAwsCrt> ` în setup.xml.

####  ERDDAP™ și AWS S3 Buckets{#erddap-and-aws-s3-buckets} 
 [ ** ERDDAP™ și AWS S3 Buckets** ](#erddap-and-aws-s3-buckets)   
Din fericire, după mult efort, ERDDAP™ are o serie de caracteristici care îi permit să facă față problemelor inerente de a lucra cu accesul S3 la dosarele la nivel de bloc într-un mod rezonabil eficient:

*    \\[ Disclaimer: Lucrul cu găleți AWS S3 este o mulțime de muncă în plus. AWS este un ecosistem imens de servicii și caracteristici. Sunt multe de învăţat. Este nevoie de timp și efort, dar este realizabil. Ai răbdare şi vei face lucrurile să meargă. Caută/ cere ajutor
( [Documentația AWS](https://aws.amazon.com/documentation/gettingstarted/) , site-uri ca [Overflow stiva](https://stackoverflow.com/) , și regulat
     [ ERDDAP™ opțiuni de sprijin](/docs/intro#support) ) dacă/când te blochezi. \\]   
     
* Acesta poate fi greu de a afla chiar structura director și numele fișierelor într-o găleată S3. ERDDAP™ are o solutie pentru aceasta problema: EDDtableFromFileNames are o speciala [\\*\\*# From The Fly #](#fromonthefly) opțiunea care vă permite să faceți un set de date EDDTableFromFileNames care permite utilizatorilor să navigheze conținutul unei găleți S3 (și descărcați fișiere) prin intermediul setului de date "files" Opţiune. Există o [exemplu de mai jos](#viewing-the-contents-of-a-bucket) .
     
*    ERDDAP™ poate citi date de la [fișiere de date externe comprimate](#externally-compressed-files) , deci este bine dacă fișierele de pe S3 sunt stocate ca .gz , .gzip , .bz2 ,.Z, sau alte tipuri de fișiere de date externe comprimate, care pot dramatic (2 - 20X) reducerea costurilor de stocare a fișierelor. Adesea nu există nici o penalizare de timp pentru utilizarea fișierelor comprimate extern, deoarece timpul salvat prin transferul unui fișier mai mic de la S3 la ERDDAP echilibrează aproximativ timpul suplimentar necesar ERDDAP™ Pentru a decomprima fişierul. Pentru a utiliza această caracteristică, trebuie doar să vă asigurați că setul de date&lt;fileNameRegex&gt; permite tipul de fișier comprimat (de exemplu, prin adăugarea ( |  .gz ) până la sfârşitul regexului) .
     
* Pentru cel mai comun caz, în cazul în care aveți o ERDDAP™ instalat pe PC-ul dvs. pentru testare/dezvoltare și în cazul în care setul de date are fișiere binare care sunt stocate ca obiecte într-o găleată S3, o abordare pentru a obține setul de date în ERDDAP™ este:
    1. Creați un director pe PC pentru a deține câteva fișiere de date de testare.
    2. Descărcaţi două fişiere de date din sursă în directorul pe care tocmai l-aţi creat.
    3. Utilizare [GenereazăSeturi de dateXml](#generatedatasetsxml) pentru a genera bucata de datasets.xml pentru setul de date bazat pe cele două fișiere de date locale.
    4. Verificați dacă setul de date funcționează conform cerințelor [DasDds](#dasdds) și/sau local ERDDAP .
        
         **Următoarele etape fac o copie a setului de date (care va obține date de la găleata S3) pe un public ERDDAP .** 
        
    5. Copiază bucata de datasets.xml pentru setul de date la datasets.xml pentru public ERDDAP™ care va servi datelor.
    6. Creează un director în public ERDDAP Hard disk local pentru a deține un depozit de fișiere temporare. Directorul nu va folosi mult spaţiu pe disc. (vezi cacheSizeGB de mai jos) .
    7. Modificarea valorii setului de date&lt;tag fileDir&gt; astfel încât să indice la directorul tocmai ați creat (chiar dacă directorul este gol) .
    8. Adaugă o [cacheFromUrl](#cachefromurl) etichetă care specifică numele cupei setului de date și prefixul opțional (și anume directorul) în specific [AWs S3 URL Format care ERDDAP™ necesită](#accessing-files-in-an-aws-s3-bucket) .
    9. Se adaugă o [&lt;CacheSizeGB&gt;] (#cachefromurl) tag-ul pe xml-ul setului de date (De exemplu, 10 este o valoare bună pentru majoritatea seturilor de date) pentru a spune ERDDAP™ limitarea dimensiunii cache-ului local (Adică, nu încercați să cache toate fișierele de la distanță) .
    10. Vezi dacă funcţionează în public. ERDDAP . Rețineți că prima dată ERDDAP™ încarcă setul de date, va dura mult până se încarcă, deoarece ERDDAP™ trebuie să descarce și să citească toate fișierele de date.
        
În cazul în care setul de date este o colecție uriașă de fișiere de date cu grilă uriașă, acest lucru va dura foarte mult timp și nu va fi practic. În unele cazuri, pentru fișiere de date în rețea, ERDDAP™ poate extrage informațiile necesare (De exemplu, momentul pentru datele dintr-un fișier de date în rețea) din numele fișierului și pentru a evita această problemă. Vezi? [Agregare prin Nume fișiere](#aggregation-via-file-names-or-global-metadata) .
        
    11. Opțional (dar în special pentru tabelul EDDFromFiles settings) , puteți adăuga un [nThreads](#nthreads) tag-ul setului de date ERDDAP să utilizeze mai mult de 1 fir atunci când răspunde la cererea unui utilizator de date. Acest lucru minimizează efectele întârzierii care apare atunci când ERDDAP™ citește fișierele de date din (distant) AWS S3 găleți în cache-ul local și (Poate.) Îi decomprimăm.

#### AWS S3 Date deschise{#aws-s3-open-data} 
Ca parte din NOAA 's [Program Big Data](https://www.noaa.gov/nodd/about) , NOAA are parteneriate cu cinci organizații, inclusiv AWS, "pentru a explora beneficiile potențiale ale stocării de copii ale observațiilor-cheie și a rezultatelor modelului în Cloud pentru a permite calcularea directă a datelor fără a necesita o distribuție ulterioară." AWS include seturile de date de la NOAA ca parte a programului său de a oferi publicului acces la o mare colecție de [Open data on AWS S3](https://registry.opendata.aws/) de la orice calculator, dacă este vorba de o instanță de calcul Amazon (un computer închiriat) pe rețeaua AWS sau propriul PC pe orice rețea. Exemplul de mai jos presupune că lucrați cu un set de date accesibil publicului.

#### Accesarea fișierelor într-o găleată AWS S3{#accessing-files-in-an-aws-s3-bucket} 
Pentru o găleată de date S3, proprietarul găleţii trebuie să vă dea acces la găleată. (A se vedea documentația AWS.) 

În toate cazurile, veți avea nevoie de un cont AWS deoarece AWS SDK pentru Java   (care ERDDAP™ folosește pentru a prelua informații despre conținutul unei găleți) necesită acreditarea contului AWS. (mai multe pe aceasta mai jos) 

 ERDDAP™ poate accesa găleți AWS S3 numai dacă specificați [&lt;CacheFromUrl&gt;] (#cachefromurl) (sau&lt;fileDir&gt;) într-un format specific:
https://*bucketName*.s3.*aws-region*.amazonaws.com/*prefix/*  
unde

* Numele găleții este forma scurtă a numelui găleții, de exemplu noa-goes17.
* Regiunea-aws, de exemplu, ne-est-1, este din coloana "Region" într-una din tabelele de [Puncte finale ale serviciului AWS](https://docs.aws.amazon.com/general/latest/gr/rande.html) unde se află găleata.
* Prefixul este opţional. Dacă este prezent, trebuie să se termine cu '/' .

De exemplu,https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/  
Acest format URL este una dintre recomandările AWS S3: a se vedea [Accesarea unei găleţi](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html) şi [această descriere a prefixelor](https://docs.aws.amazon.com/AmazonS3/latest/dev/ListingKeysHierarchy.html) . ERDDAP™ cere să combinaţi URL- ul găleată şi prefixul opţional într-un URL pentru a specifica&lt;CacheFromUrl&gt; (sau&lt;fileDir&gt;) în cazul în care fișierele sunt situate.

#### Testați găleți AWS S3{#test-public-aws-s3-buckets} 
Pentru găleți publice, puteți și ar trebui să testați URL-ul găleții din directorul AWS S3 din browser, de exemplu,
 [https://noaa-goes17.s3.us-east-1.amazonaws.com](https://noaa-goes17.s3.us-east-1.amazonaws.com) Dacă URL-ul găleată este corect și adecvat pentru ERDDAP , va returna un document XML care are (parţial) lista conţinutului găleţii. Din păcate, URL-ul complet (Adică URL- ul găleții plus prefix) că ERDDAP™ nu funcţionează într-un browser. AWS nu oferă un sistem pentru a naviga ierarhia unei găleți ușor în browser. (Dacă nu e corect, trimite-i un e-mail lui Chris. John la Noaa.gov. În caz contrar, Amazon, vă rugăm să adăugați sprijin pentru acest lucru&#33;) 

#### Vizualizarea conţinutului unei găleţi{#viewing-the-contents-of-a-bucket} 
Găleți S3 conțin adesea câteva categorii de fișiere, într-un cuplu de subdirecții pseudo, care ar putea deveni un cuplu de ERDDAP™ Seturi de date. Pentru a face ERDDAP™ Seturi de date, trebuie să știți directorul de pornire pentru&lt;CacheFromUrl&gt; (sau&lt;fileDir&gt;) și formatul numelor fișierelor care identifică acel subset de fișiere. Dacă încercați să vizualizați întregul conținut al unei găleți într-un browser, S3 vă va arăta doar primele 1000 de fișiere, ceea ce este insuficient. În prezent, cel mai bun mod pentru tine de a vedea tot conținutul unei găleți este de a face o [Tabel EDDFromFileNames](#eddtablefromfilenames) Set de date (pe PC-uri ERDDAP™ și/sau pe publicul dumneavoastră ERDDAP ) , care vă oferă, de asemenea, o modalitate ușoară de a naviga structura director și de a descărca fișiere. ă&lt;fileDir&gt; for that will be the URL you made above, ex.,https://noaa-goes17.s3.us-east-1.amazonaws.com. \\[ De ce AWS S3 nu oferă o modalitate rapidă și ușoară pentru oricine să facă acest lucru fără un cont AWS? \\] Rețineți că atunci când fac acest lucru pe PC-ul meu pe o rețea non-Amazon, se pare că Amazon încetinește răspunsul la un firicel (aproximativ 100 (?) fișiere pe bucată) după primele câteva bucăți (din 1000 de fișiere pe bucată) sunt descărcate. Deoarece gălețile pot avea un număr mare de fișiere (noaa-goes17 are 26 de milioane) , obtinerea tot continutul unei galeti poate lua EDDtableFromFileNames câteva ore (De exemplu, 12&#33;) pentru a termina. \\[ Amazon, nu-i aşa?&#33; \\] 

#### Realizarea unui tabel EDD De la FileNames Dataset cu un AWS S3 Bucket{#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket} 
Dacă aveți un nume găleată, dar nu aveți deja o listă de fișiere în găleata S3 sau prefixul care identifică locația fișierelor relevante în găleată, utilizați instrucțiunile de mai jos pentru a face un set de date EDDDe la FileNames astfel încât să puteți naviga în ierarhia directoarelor găleată S3 prin ERDDAP 's "files" sistem.

1. Deschide un cont AWS
     ERDDAP™ utilizează [AWS SDK pentru Java ](https://docs.aws.amazon.com/sdk-for-java/index.html) pentru a obține informații găleată de la AWS, așa că trebuie să [creează și activează un cont AWS](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/) . E o treabă destul de importantă, cu multe lucruri de învăţat.
     
2. Pune-ţi AWS-urile unde ERDDAP™ le pot găsi.
Urmaţi instrucţiunile la [Înființarea AWS Acreditative și Regiune pentru Dezvoltare](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials) Deci... ERDDAP™   (în special, AWS SDK pentru Java ) va fi capabil să găsească și să utilizeze acreditările AWS. Dacă ERDDAP™ nu pot găsi acreditările, veți vedea o
Java.lang. Argument ilegal Excepție: fișierul profil nu poate fi o eroare nulă în ERDDAP Dosarul log.txt.
    
Indiciu pentru Linux și Mac OS: fișierul de acreditare trebuie să fie în directorul de origine al utilizatorului care rulează Tomcat (şi ERDDAP )   (pentru acest paragraf, vom presupune utilizator=tomcat) într-un fișier numit ~/.aws/credentials . Nu presupune că ~ este / home/tomcat - de fapt, utilizați cd ~ pentru a afla unde crede sistemul de operare ~ pentru utilizator = Tomcat este. Creează directorul dacă nu există. De asemenea, după ce ați pus fișierul de acreditare în loc, asigurați-vă că utilizatorul și grupul pentru fișier sunt Tomcat și apoi utilizați chmod 400 acreditări pentru a vă asigura că fișierul este citit-doar pentru utilizator=tomcat.
    
3. Creează URL- ul găleată în [format care ERDDAP™ necesită](#accessing-files-in-an-aws-s3-bucket) , de exemplu,
     [https://noaa-goes17.s3.us-east-1.amazonaws.com](https://noaa-goes17.s3.us-east-1.amazonaws.com) , și (pentru găleți publice) testați-l într-un browser pentru a vă asigura că returnează un document XML care are o listă parțială a conținutului acelei găleți.
     
4. Utilizare [GenereazăSeturi de dateXml](#generatedatasetsxml) pentru a crea un [Tabel EDDFromFileNames](#eddtablefromfilenames) Set de date:
    * Pentru directorul de pornire, utilizați această sintaxă:
        \\*\\*\\ *de la OnTheFly,* Bucketurl
de exemplu,
        \\*\\*De la OnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/
    * Numele fișierului regex? \\*
    * Recursiv? Adevărat.
    * reîncărcare Fiecare NMinutes? 10080
    *    infoUrl ?https://registry.opendata.aws/noaa-goes/
    * Instituţie? NOAA 
    * Un rezumat? Nimic. ( ERDDAP™ va crea automat un rezumat decent.) 
    * Titlul? Nimic. ( ERDDAP™ va crea automat un titlu decent.) Ca de obicei, ar trebui să editați XML-ul rezultat pentru a verifica corectitudinea și a face îmbunătățiri înainte de bucata de seturi de date folosindu-l în datasets.xml .
5. Dacă urmați instrucțiunile de mai sus și încărcați setul de date în ERDDAP , ați creat un set de date EDD TableFromFiles. Ca un exemplu, și pentru a face mai ușor pentru oricine să navigheze și să descarce fișiere din galețile AWS Open Data, am creat seturi de date EDDTabelFromFileNames (a se vedea lista de la
     [https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files\\_](https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files_) ) pentru aproape toate [AWS S3 Deschideți gălețile de date](https://registry.opendata.aws/) .
     \\[ Cele câteva găleți pe care nu le-am inclus fie au un număr mare de fișiere în directorul rădăcină (mai mult decât poate fi descărcat într-un timp rezonabil) , sau nu permit accesul public (Nu ar trebui să fie toate publice?) , sau sunt cereri de plată găleți (De exemplu, Sentinel) . \\]   
Dacă faceţi clic pe "files" link-ul pentru unul dintre aceste seturi de date, puteți naviga copacul director și fișiere în acea găleată S3. Din cauza drumului\\*\\*\\* De la OnTheFly EDD TableFromFiles works, aceste liste directoare sunt întotdeauna perfect actualizate deoarece ERDDAP™ îi face să zboare. Dacă faceți clic pe arborele director pentru un nume de fișier real și faceți clic pe numele fișierului, ERDDAP™ va redirecționa cererea la AWS S3 astfel încât să puteți descărca fișierul direct de la AWS. Poţi să verifici dosarul.
    
Probleme?
În cazul în care tabelul EDDFromFiles nu va încărca în ERDDAP™   (sau DasDds) , căutați în fișierul log.txt pentru un mesaj de eroare. Dacă vezi un
Java.lang. Argument ilegal Excepție: fișierul profil nu poate fi eroare nulă, problema este că AWS SDK pentru Java   (utilizat de ERDDAP ) nu este găsirea dosarului de acreditare. A se vedea instrucțiunile de acreditare de mai sus.
     

Este regretabil că AWS nu permite pur și simplu oamenilor să folosească un browser pentru a vedea conținutul unei găleți publice.

 **Apoi, puteți face ERDDAP™ seturi de date care oferă utilizatorilor acces la datele din fișiere.**   
Vezi instrucţiunile din [ ERDDAP™ și S3 Buckets](#erddap-and-aws-s3-buckets)   (mai sus) .
Pentru setul de date EDDtableFromFileNames pe care l-ați făcut mai sus, dacă faceți un pic poking în jurul cu directorul și numele de fișiere în arborele director, devine clar că numele directoarelor de nivel superior (De exemplu, ABI-L1b-RadC) corespunde cu ceea ce ERDDAP™ ar numi seturi de date separate. Găleata cu care lucrezi poate fi similară. Ați putea apoi să creați seturi de date separate în ERDDAP™ pentru fiecare dintre aceste seturi de date, utilizând, de exemplu,
https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/  
ca&lt;Cache FromUrl&gt;. Din păcate, pentru acest exemplu special, seturile de date din găleată toate par a fi de nivel 1 sau de nivel 2, care ERDDAP™   [nu este deosebit de bun la](#dimensions) , deoarece setul de date este o colecție mai complicată de variabile care utilizează diferite dimensiuni.
     
    
### Fișiere NcML{#ncml-files} 
Fișierele NcML vă permit să specificați modificările la una sau mai multe surse originale NetCDF   (v3 sau v4)   .nc ,.grib,.bufr, sau .hdf   (v4 sau v5) fișiere, și apoi au ERDDAP™ trataţi .nc fișiere ml ca fișiere sursă. ERDDAP™ Seturile de date vor accepta .nc fișiere ml ori de câte ori .nc Dosarele sunt aşteptate. Fișierele NcML TREBUIE să aibă extensia .nc ml. Vezi [ Unidata Documentația NcML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html) . NcML este util pentru că puteți face unele lucruri cu ea (de exemplu, modificarea diferitelor fișiere dintr-o colecție, inclusiv adăugarea unei dimensiuni cu o valoare specifică unui fișier) , care nu se poate face cu ERDDAP 's datasets.xml .

* Modificări ale .nc Ultima oră codificată a fișierului ml va determina reîncărcarea fișierului ori de câte ori setul de date este reîncărcat, dar modificările aduse suportului .nc Fişierele de date nu vor fi observate direct.
* NcML este\\*foarte\\*sensibil la ordinea unor elemente din fișierul NcML. Gândiți-vă la NcML ca specificând o serie de instrucțiuni în ordinea specificată, cu intenția de a schimba fișierele sursă (starea la începutul/topul fișierului NcML) în fișierele de destinație (starea de la sfârșitul/josul fișierului NcML) .

O alternativă la NcML este [ NetCDF Operatorii ( NCO ) ](#netcdf-operators-nco) . Marea diferență este că NcML este un sistem pentru a face schimbări pe-the-fly (Astfel încât fișierele sursă nu sunt modificate) , întrucât NCO poate fi folosit pentru a face modificări la (sau versiuni noi ale) Dosarele. Ambele NCO și NcML sunt foarte, foarte flexibile și vă permit să facă aproape orice schimbare vă puteți gândi la fișierele. Pentru ambele, poate fi o provocare să ne dăm seama exact cum să facem ceea ce vrem să facem -- verificați web pentru exemple similare. Ambele sunt instrumente utile pentru pregătirea netCDF și HDF fișiere pentru utilizare cu ERDDAP , în special, pentru a face schimbări dincolo de ceea ce ERDDAP Sistemul de manipulare e bun.

Exemplul #1: Adăugarea unei dimensiuni a timpului cu o valoare unică
Iată un .nc fișier ml care creează o nouă dimensiune exterioară (timp, cu 1 valoare: 1041379200) și adaugă această dimensiune la variabila pic în fișierul numit A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km .nc :
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'>
      <variable name='time' type='int' shape='time' />
      <aggregation dimName='time' type='joinNew'>
        <variableAgg name='pic'/>
        <netcdf location='A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc' coordValue='1041379200'/>
      </aggregation>
    </netcdf>
```
Exemplul #2: Schimbarea valorii timpului existent
Uneori sursa .nc fișier are deja o dimensiune a timpului și valoarea timpului, dar valoarea este incorectă (pentru scopurile dumneavoastră) . Asta. .nc fişierul ml spune: pentru fişierul de date numit ""198108252300-NCEI..." pentru variabila dimensiune "time" , setați atributul unităților să fie "secunde din 1970-01-01T00:00:00Z" și setați valoarea de timp pentru a fi 367588800.
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'
      location="19810825230030-NCEI-L3C\\_GHRSST-SSTskin-AVHRR\\_Pathfinder-PFV5.3\\_NOAA07\\_G\\_1981237\\_day-v02.0-fv01.0.nc">
      <variable name="time">
        <attribute name='units' value='seconds since 1970-01-01T00:00:00Z' />
        <values>367588800</values>
      </variable>
    </netcdf>
```
###  NetCDF Operatorii ( NCO )  {#netcdf-operators-nco} 
"Operatorii netCDF ( NCO ) cuprinde o duzină de programe independente, linia de comandă care iau netCDF \\[ v3 sau v4 \\] , HDF   \\[ v4 sau v5 \\] , \\[ Grib, .bufr, \\] și/sau DAP fișiere ca intrare, apoi funcționează (De exemplu, obține date noi, statistici de calcul, print, hiperslab, manipulează metadate) și de ieșire rezultatele pentru a ecrana sau fișiere în format text, binar, sau netCDF. NCO ajută la analiza datelor ştiinţifice. Stilul shell-comand al NCO permite utilizatorilor să manipuleze și să analizeze interactiv fișiere sau cu scripturi expresive care să evite unele medii de programare de nivel superior." (de la [ NCO ](https://nco.sourceforge.net/) prima pagină) .

O alternativă la NCO este [NcML](#ncml-files) . Marea diferență este că NcML este un sistem pentru a face schimbări pe-the-fly (Astfel încât fișierele sursă nu sunt modificate) , întrucât NCO poate fi folosit pentru a face modificări la (sau versiuni noi ale) Dosarele. Ambele NCO și NcML sunt foarte, foarte flexibile și vă permit să facă aproape orice schimbare vă puteți gândi la fișierele. Pentru ambele, poate fi o provocare să ne dăm seama exact cum să facem ceea ce vrem să facem -- verificați web pentru exemple similare. Ambele sunt instrumente utile pentru pregătirea netCDF și HDF fișiere pentru utilizare cu ERDDAP , în special, pentru a face schimbări dincolo de ceea ce ERDDAP Sistemul de manipulare e bun.

De exemplu, puteți folosi NCO pentru a face unitățile variabilei de timp consistente într-un grup de fișiere în cazul în care acestea nu au fost coerente inițial. Sau, puteți folosi NCO se aplică scale\\_factor şi add\\_offset într-un grup de fișiere unde scale\\_factor şi add\\_offset au valori diferite în diferite fișiere sursă.
 (Sau, puteți face acum cu aceste probleme în ERDDAP™ prin [ EDDGrid De la NCFilesDespachetat](#eddgridfromncfilesunpacked) , care este o variantă de EDDGrid DinNcFiles care despachetează date ambalate și standardizează valorile timpului la un nivel scăzut pentru a face față unor fișiere de colectare care au diferite scale\\_factor s şi add\\_offset , sau unități de timp diferite.) 

 NCO este Free and Open Source Software care utilizează [GPL 3. 0](https://www.gnu.org/licenses/gpl-3.0.html) Permisul.

Exemplul #1: Unități de luare în concordanță
 EDDGrid Din fişiere şi tabel EDD Din fișiere insistă că unitățile pentru o anumită variabilă să fie identice în toate fișierele. Dacă unele dintre fişiere sunt banale (nefuncțional) diferite de altele (de exemplu, unități de timp ale
"secunde din 1970-01-01 00:00 UTC" versus
 "seconds since 1970-01-01T00:00:00Z" , ai putea folosi NCO 's [ncatted](https://nco.sourceforge.net/nco.html#ncatted-netCDF-Attribute-Editor) . pentru a schimba unitățile din toate fișierele pentru a fi identice cu
NCO/Ncatted -a units,time,o,c,'secunde from 1970-01-01T00:00:00Z' \\* .nc   
 \\[ Pentru multe probleme ca aceasta în EDD Table From... Seturi de fișiere, puteți utiliza acum [standardizează Ce?](#standardizewhat) pentru a spune ERDDAP pentru a standardiza fișierele sursă ca acestea sunt citite în ERDDAP . \\] 
    
### Limite la dimensiunea unui set de date{#limits-to-the-size-of-a-dataset} 
Veți vedea mai multe referințe la "2 miliarde" de mai jos. Mai exact, aceasta este o referire la 2,147,483,647 (2^31-1) , care este valoarea maximă a unui număr întreg semnat pe 32 de biți. În unele limbi ale calculatorului, de exemplu Java   (care ERDDAP™ este scris în) , care este cel mai mare tip de date care poate fi folosit pentru mai multe structuri de date (de exemplu, dimensiunea unui array) .

Pentru valorile stringurilor (de exemplu, pentru denumirile variabile, denumirile atributelor, valorile atributelor String și valorile datelor String) , numărul maxim de caractere per coardă în ERDDAP™ este ~2 miliarde. Dar în aproape toate cazurile, vor exista probleme mici sau mari dacă o coardă depășește o dimensiune rezonabilă (de exemplu 80 de caractere pentru nume variabile și nume atribute și 255 de caractere pentru majoritatea valorilor atributelor string și a valorilor datelor) . De exemplu, paginile web care afișează nume variabile lungi vor avea nume variabile ciudat de largi și lungi vor fi trunchiate dacă depășesc limita tipului de fișier de răspuns.

Pentru seturi de date grupate:

* Numărul maxim de axisVariable S este ~2 miliarde.
Numărul maxim de dataVariable S este ~2 miliarde.
Dar dacă un set de date are &gt; 100 de variabile, va fi dificil pentru utilizatori să utilizeze.
Și dacă un set de date are &gt; 1 milion de variabile, serverul va avea nevoie de o mulțime de memorie fizică și vor exista alte probleme.
* Dimensiunea maximă a fiecărei dimensiuni ( axisVariable ) este ~2 miliarde de valori.
* Cred că numărul total maxim de celule (produsul tuturor dimensiunilor) este nelimitat, dar poate fi ~9e18.

Pentru seturile de date tabelare:

* Numărul maxim de dataVariable S este ~2 miliarde.
Dar dacă un set de date are &gt; 100 de variabile, va fi dificil pentru utilizatori să utilizeze.
Și dacă un set de date are &gt; 1 milion de variabile, serverul va avea nevoie de o mulțime de memorie fizică și vor exista alte probleme.
* Numărul maxim de surse (de exemplu, fișiere) care pot fi agregate este ~2 miliarde.
* În unele cazuri, numărul maxim de rânduri dintr-o sursă individuală (de exemplu, un fișier, dar nu o bază de date) este ~2 miliarde de rânduri.
* Nu cred că există alte limite.

Atât pentru seturile de date în grilă, cât și pentru tabulare, există anumite limite interne privind dimensiunea subsetului care pot fi solicitate de un utilizator într-o singură cerere (adesea legate de &gt;2 miliarde de ceva sau ~9e18 de ceva) , dar este mult mai probabil ca un utilizator va lovi limitele specifice de tip de fișier.

*    NetCDF Versiunea 3 .nc fișierele sunt limitate la 2GB octeți. (Dacă e o problemă pentru cineva, anunţă-mă: Aș putea adăuga sprijin pentru NetCDF Versiunea 3 .nc Extensie pe 64 de biți sau NetCDF Versiunea 4, care ar mări semnificativ limita, dar nu infinit.) 
* Browser-ul se prăbuşeşte după doar ~500MB de date, aşa că ERDDAP™ limitează răspunsul la .htmlTable cereri la ~400MB de date.
* Multe programe de analiză a datelor au limite similare (de exemplu, dimensiunea maximă a unei dimensiuni este adesea ~2 miliarde de valori) , astfel încât nu există nici un motiv să lucreze din greu pentru a obține în jurul limitelor specifice de tip fișier.
* Limitele specifice fișierelor sunt utile pentru a preveni cererile naive pentru cantități uriașe de date (de exemplu, "dă-mi toate aceste seturi de date" atunci când setul de date conține 20TB) , care ar dura săptămâni sau luni pentru a descărca. Cu cât descărcarea este mai lungă, cu atât va eşua din mai multe motive.
* Limitele specifice de tip de fișier sunt utile pentru a forța utilizatorul să se ocupe de subansambluri de dimensiuni rezonabile (de exemplu, abordarea unui set de date cu grilă mare prin intermediul fișierelor cu date dintr-un punct de timp fiecare) .
         
### Comută la ACDD-1.3{#switch-to-acdd-13} 
Noi (în special [GenereazăSeturi de dateXml](#generatedatasetsxml) ) recomandă în prezent [Versiunea ACDD 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) , care a fost ratificată la începutul anului 2015 și care este denumită "ACDD-1.3" în atributul Convenției mondiale. Înainte de ERDDAP™ versiunea 1.62 (lansat în iunie 2015) , ERDDAP™ utilizat/recomandat originalul, versiunea 1.0, al [ NetCDF Atribuie Convenția pentru descoperirea datelor](https://wiki.esipfed.org/ArchivalCopyOfVersion1) care a fost menționată ca " Unidata Dataset Discovery v1.0" în convenţiile globale şi Metadata\\_Conventions atribute.

Dacă seturile dumneavoastră de date folosesc versiuni anterioare ale ACDD, RECOMANDăm să treceți la ACDD-1.3. Nu e greu. ACDD-1.3 este compatibil cu versiunea 1.0. Pentru a comuta, pentru toate seturile de date (cu excepţia EDDGrid De la Erddap și tabelul EDD Seturi de date din Erddap) :

1. Elimină noul depreciat global Metadata\\_Conventions atribut prin adăugarea (sau prin schimbarea celor existente Metadata\\_Conventions atribut)   
```
        <att name="Metadata\\_Conventions">null</att>  
```
la nivelul global al setului de date&lt; addAttributes &gt;.
     
2. Dacă setul de date are un atribut al convenţiilor la nivel global&lt; addAttributes &gt;, modifică toate " Unidata Dataset Discovery v1.0" se referă la "ACDD-1.3."
Dacă setul de date nu are un atribut al convenţiilor la nivel global&lt; addAttributes &gt;, apoi se adaugă una care se referă la ACDD-1.3. De exemplu,
```
        <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
```
         
3. Dacă setul de date are o valoare globală standard\\_name\\_vocabulary atribut, vă rugăm să modificați formatul valorii în, de exemplu,
```
        <att name="standard\\_name\\_vocabulary">CF Standard Name Table v65</att>  
```
Dacă trimiterea este la o versiune mai veche a [Tabelul cu denumirea standard CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) . este, probabil, o idee bună pentru a trece la versiunea curentă (65, în timp ce scriem asta) , deoarece la acest tabel se adaugă noi nume standard cu versiuni ulterioare, dar numele standard vechi sunt rareori depreciate și niciodată eliminate.
     
4. Deși ACDD-1.0 a inclus atribute globale pentru creator\\_name , creator\\_email , creator\\_url , [GenereazăSeturi de dateXml](#generatedatasetsxml) nu le-a adăugat în mod automat până când cândva în jurul valorii de ERDDAP™ v1.50. Acestea sunt informaţii importante:
        
    *    creator\\_name permite utilizatorilor să cunoască/să citeze creatorul setului de date.
    *    creator\\_email le spune utilizatorilor adresa de e-mail preferată pentru contactarea creatorului setului de date, de exemplu dacă au întrebări cu privire la setul de date.
    *    creator\\_url oferă utilizatorilor o modalitate de a afla mai multe despre creator.
    *    ERDDAP™ utilizează toate aceste informații atunci când generează documente de metadate FGDC și ISO 19115-2/19139 pentru fiecare set de date. Aceste documente sunt adesea utilizate de serviciile externe de căutare.
    
Vă rugăm să adăugați aceste atribute la nivelul global al setului de date&lt; addAttributes &gt;.
```
        <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
        <att name="creator\\_email">erd.data@noaa.gov</att>  
        <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
```
    
Asta e. Sper că nu a fost prea greu.
     
### Zarr{#zarr} 
Din versiunea 2.25 ERDDAP™ poate citi local Fișiere Zarr care utilizează [Tabel EDDFromNcFiles](#eddtablefromncfiles) şi [ EDDGrid DinNcFiles](#eddgridfromncfiles) .

 (Începând din august 2019) Am putea fi ușor de greșit, dar nu suntem încă convinși că [Zarr](https://github.com/zarr-developers/zarr-python) , sau sisteme similare care sparg fișiere de date în bucăți mai mici, sunt soluții mari la problema de ERDDAP™ citirea datelor stocate în servicii cloud precum Amazon AWS S3. Zarr este o mare tehnologie care şi-a arătat utilitatea într-o varietate de situaţii, nu suntem siguri că ERDDAP +S3 va fi una dintre aceste situații. În mare parte spunem: înainte de a ne grăbi să facem efortul de a stoca toate datele noastre în Zarr, să facem niște teste pentru a vedea dacă este de fapt o soluție mai bună.

Problemele cu accesarea datelor în cloud sunt latența (decalajul pentru a obține mai întâi date) și accesul la nivel de fișiere (mai degrabă decât accesul la nivel de bloc) . Zarr rezolvă problema accesului la nivel de fișier, dar nu face nimic despre latență. Comparativ cu doar descărcarea fișierului (astfel încât să poată fi citit ca un fișier local cu acces la nivel de bloc) , Zarr poate exacerba chiar problema latenței deoarece, cu Zarr, citirea unui fișier acum implică o serie de mai multe apeluri pentru a citi diferite părți ale fișierului (fiecare cu propriul decalaj) . Problema latenței poate fi rezolvată prin paralelizarea cererilor, dar aceasta este o soluție de nivel superior, nu dependentă de Zarr.

Şi cu Zarr (ca și în bazele de date relaționale) , pierdem confortul de a avea un fișier de date fi un simplu, singur fișier pe care le puteți verifica cu ușurință integritatea, sau face / descărca o copie a.

 ERDDAP™   (în V2) are un sistem pentru menținerea unui cache local de fișiere dintr-o sursă URL (De exemplu, S3) (a se vedea&lt;CacheFromUrl&gt; și&lt;CacheMaxGB&gt;] (#cachefromurl) ). Şi noul [&lt;nThreads&gt;] (#Nămoluri) ar trebui să minimizeze problema latenței prin paralelizarea recuperării datelor la un nivel ridicat.&lt;CacheFromUrl&gt; pare să funcționeze foarte bine pentru multe scenarii. (Nu suntem siguri cât de benefice&lt;nThreads&gt; este fără alte teste.) Recunoastem ca nu am facut teste de sincronizare pe o instanta AWS cu o buna conexiune la retea, dar am testat cu succes cu diferite surse URL la distanta de fisiere. Şi... ERDDAP 's&lt;cacheFromUrl&gt; funcționează cu orice tip de fișier de date (de exemplu, .nc , .hdf ,.csv, .jsonlCSV ) , chiar dacă comprimat extern (de exemplu, .gz ) , fără modificări ale fișierelor (De exemplu, rescrierea lor ca colecții Zarr) .

Este probabil că diferite scenarii vor favoriza diferite soluții, de exemplu, trebuie doar să citiți o parte a unui fișier o singură dată (Zarr va câştiga.) , vs. nevoie pentru a citi toate un fișier o dată, vs. trebuie să citească o parte sau toate de un fișier în mod repetat (&lt;CacheFromUrl&gt; va câştiga).

În mare parte spunem: înainte de a ne grăbi să facem efortul de a stoca toate datele noastre în Zarr, să facem niște teste pentru a vedea dacă este de fapt o soluție mai bună.

- - -
## Lista seturilor de date de tip{#list-of-types-datasets} 
Dacă aveți nevoie de ajutor pentru a alege tipul corect de set de date, a se vedea [Alegerea tipului de set de date](#choosing-the-dataset-type) .

Tipurile de seturi de date se încadrează în două categorii. ( [De ce?](#why-just-two-basic-data-structures) ) 

###  EDDGrid  {#eddgrid} 
*    [ ** EDDGrid ** ](#eddgrid) Seturile de date manipulează date în rețea.
    * În EDDGrid Seturile de date, variabilele de date sunt array-uri multidimensionale de date.
    * Trebuie să existe o variabilă a axei pentru fiecare dimensiune. Variabilele axei trebuie specificate în ordinea în care variabilele de date le utilizează.
    * În EDDGrid Seturi de date, toate variabilele de date TREBUIE utilizate (cotă) toate variabilele axei.
         ( [De ce?](#why-just-two-basic-data-structures)   [Şi dacă nu o fac?](#dimensions) ) 
Nou în ERDDAP™ versiunea 2.29.0 cu EDDGrid FromNcFiles este suport experimental pentru variabilele de date care nu suportă toate variabilele axei (sau după cum unii au numit-o date 1D și 2D în același set de date) .
    * Valori de dimensiune sortare - În total EDDGrid Seturile de date, fiecare dimensiune trebuie să fie în ordine sortate (ascendentă sau descendentă) . Fiecare poate fi spaţiată neregulat. Nu pot exista legături. Aceasta este o cerinţă a [Standardul metadatelor CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) . Dacă valorile oricărei dimensiuni nu sunt în ordine sortate, setul de date nu va fi încărcat și ERDDAP™ va identifica prima valoare nesortate în fișierul jurnal; *Big ParentDirectory* /logs/log.txt.
        
Câteva subclase au restricții suplimentare (în special, EDDGrid Dimensiunea totală necesită ca dimensiunea exterioară (cea mai stângă, prima) să fie ascendentă.
        
Valorile de dimensiune nesortate indică aproape întotdeauna o problemă cu setul de date sursă. Acest lucru se întâmplă cel mai frecvent atunci când un fișier cu nume greșite sau nepotrivit este inclus în agregare, ceea ce duce la o dimensiune a timpului nesortate. Pentru a rezolva această problemă, consultați mesajul de eroare din ERDDAP™ log.txt fișier pentru a găsi valoarea de timp ofensatoare. Apoi căutați în fișierele sursă pentru a găsi fișierul corespunzător (sau una înainte sau una după) care nu aparține în agregare.
        
    * Vezi descrierea mai completă a [ EDDGrid model de date](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel) .
    * ă EDDGrid Tipurile de seturi de date sunt:
        *    [ EDDGrid De la AudioFiles](#eddfromaudiofiles) agregate de date dintr-un grup de fișiere audio locale.
        *    [ EDDGrid FromDap](#eddgridfromdap) Manipulează date din rețea DAP servere.
        *    [ EDDGrid Tabel de la EDD](#eddgridfromeddtable) vă permite să convertiți un set de date tabular într-un set de date grilat.
        *    [ EDDGrid FromErddap](#eddfromerddap) Manipulează datele de la distanță ERDDAP .
        *    [ EDDGrid De la Etopo](#eddgridfrometopo) Doar se ocupă de datele de topografie ETOPO încorporate.
        *    [ EDDGrid Din dosare](#eddgridfromfiles) este superclasa tuturor EDDGrid De la... clase de fişiere.
        *    [ EDDGrid De la MergeIRFiles](#eddgridfrommergeirfiles) date agregate dintr-un grup de CombeIR locale .gz Dosare.
        *    [ EDDGrid DinNcFiles](#eddgridfromncfiles) date agregate dintr-un grup de locali NetCDF   (v3 sau v4)   .nc și fișierele aferente.
        *    [ EDDGrid De la NCFilesDespachetat](#eddgridfromncfilesunpacked) este o variantă dacă EDDGrid FromNcFiles care, de asemenea, agregate date dintr-un grup de locale NetCDF   (v3 sau v4)   .nc și fișiere aferente, care ERDDAP™ Despachetează la un nivel scăzut.
        *    [ EDDGrid LonPM180](#eddgridlonpm180) modifică valorile de longitudine ale unui copil EDDGrid astfel încât acestea sunt în intervalul -180 la 180.
        *    [ EDDGrid Lon0360](#eddgridlon0360) modifică valorile de longitudine ale unui copil EDDGrid astfel încât acestea sunt în intervalul 0 - 360.
        *    [ EDDGrid SideBySide](#eddgridsidebyside) agregate două sau mai multe EDDGrid seturi de date cot la cot.
        *    [ EDDGrid Dimensiune agregată](#eddgridaggregateexistingdimension) agregate două sau mai multe EDDGrid seturi de date, fiecare dintre acestea având o gamă diferită de valori pentru prima dimensiune, dar valori identice pentru celelalte dimensiuni.
        *    [ EDDGrid Copiază](#eddgridcopy) poate face o copie locală a unui alt EDDGrid datele și servește date de la copia locală.
             
    * Toate EDDGrid Seturile de date susțin o setare nThreads, care spune ERDDAP™ câte fire să folosească atunci când răspunde la o cerere. Vezi [nThreads](#nthreads) documentația pentru detalii.
         
### Tabel EDD{#eddtable} 
*    [ **Tabel EDD** ](#eddtable) Seturile de date manipulează date tabulare.
    * Datele tabelare pot fi reprezentate ca un tabel de baze de date cu rânduri și coloane. Fiecare coloană (o variabilă de date) are un nume, un set de atribute și stochează un singur tip de date. Fiecare rând are o observație (sau grup de valori conexe) . Sursa de date poate avea datele într-o structură de date diferită, o structură de date mai complicată și/sau mai multe fișiere de date, dar ERDDAP™ trebuie să fie în măsură să aplatizeze datele sursă într-un tabel similar bazei de date pentru a prezenta datele ca un set de date tabular utilizatorilor de ERDDAP .
    * Vezi descrierea mai completă a [Model de date EDDName](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel) .
    * Tipurile de seturi de date ale tabelului EDD sunt:
        *    [Tabel EDD din toate datele](#eddtablefromalldatasets) este un set de date de nivel superior care are informații despre toate celelalte seturi de date din ERDDAP .
        *    [Tabel EDD din AsciiFiles](#eddtablefromasciifiles) date agregate din fişierele de date conta-, file-, semicolon- sau tabulare separate de spaţiu ASCII.
        *    [Tabel EDD De la Serviciul Ascii](#eddtablefromasciiservice) Este superclasa tuturor EDD Table FromAsciiService... clase.
        *    [Tabel EDD din AsciiServiceNOS](#eddtablefromasciiservicenos) se ocupă de date de la unele dintre NOAA Servicii web NOS.
        *    [Tabel EDD din fișiere audio](#eddfromaudiofiles) agregate de date dintr-un grup de fișiere audio locale.
        *    [Tabel EDD din Fişiere AwsXml](#eddtablefromawsxmlfiles) date agregate dintr-un set de stații meteo automate (AWS) Fișiere XML.
        *    [Tabel EDD din Cassandra](#eddtablefromcassandra) se ocupă de datele tabulare de la o masă Cassandra.
        *    [Tabel EDDDinColumnarAsciiFiles](#eddtablefromcolumnarasciifiles) date agregate din fişierele de date ASCII tabulare cu coloane de date cu lăţime fixă.
        *    [Tabel EDD din DapSequence](#eddtablefromdapsequence) manevrează date tabulare de la DAP servere de secvenţe.
        *    [Tabel EDD din baza de date](#eddtablefromdatabase) se ocupă de datele tabulare dintr-o bază de date.
        *    [Tabel EDD din EDDGrid ](#eddtablefromeddgrid) permite crearea unui set de date EDD Table dintr-o EDDGrid Set de date.
        *    [Tabel EDD FromErddap](#eddfromerddap) mânuiește date tabulare de la o distanță ERDDAP .
        *    [Tabel EDDFromFileNames](#eddtablefromfilenames) creează un set de date din informații despre un grup de fișiere din sistemul de fișiere al serverului, dar nu servește date din interiorul fișierelor.
        *    [Tabel EDD din dosare](#eddtablefromfiles) este superclasa tuturor EDD Tablelor din... clase de fişiere.
        *    [Tabel EDD de la HttpGet](#eddtablefromhttpget) este ERDDAP numai sistemul pentru importul de date, precum și exportul de date.
        *    [Tabel EDD din Hyrax Fișiere](#eddtablefromhyraxfiles)   (DEPRECAT) agregate date din fișiere cu mai multe variabile cu dimensiuni comune deservite de a [ Hyrax   OPeNDAP server](https://www.opendap.org/software/hyrax-data-server) .
        *    [Tabel EDD din InvalidCRAFile](#eddtablefrominvalidcrafiles) date agregate din NetCDF   (v3 sau v4)   .nc fișiere care utilizează o variantă specifică, invalidă, a CF DSG Contiguous Ragged Array (CRA) Dosare. Deşi... ERDDAP™ acceptă acest tip de fișier, este un tip de fișier invalid pe care nimeni nu ar trebui să înceapă să-l utilizeze. Grupurile care utilizează în prezent acest tip de fișier sunt puternic încurajate să utilizeze ERDDAP™ să genereze fișiere DSG CRA valabile și să înceteze să mai utilizeze aceste fișiere.
        *    [Tabel EDD De la JsonlCSVFiles](#eddtablefromjsonlcsvfiles) date agregate din [JSON Linii fișiere CSV](https://jsonlines.org/examples/) .
        *    [Tabel EDD Din mai multe DosareNc](#eddtablefrommultidimncfiles) date agregate din NetCDF   (v3 sau v4)   .nc fișiere cu mai multe variabile cu dimensiuni comune.
        *    [Tabel EDD din Mqtt](/docs/server-admin/mqtt-integration) construiește un set de date bazat pe mesajele MQTT. Notă documentaţia este pe o pagină dedicată. Rețineți că există o mulțime de similitudini cu [Tabel EDD de la HttpGet](#eddtablefromhttpget) .
        *    [Tabel EDDFromNcFiles](#eddtablefromncfiles) date agregate din NetCDF   (v3 sau v4)   .nc fișiere cu mai multe variabile cu dimensiuni comune. Este bine să continuăm să folosim acest tip de set de date pentru seturile de date existente, dar pentru noi seturi de date recomandăm utilizarea tabelului EDDFromMultidimNcFiles în schimb.
        *    [Tabel EDD din NCFFile](#eddtablefromnccffiles) date agregate din NetCDF   (v3 sau v4)   .nc fișiere care utilizează unul dintre formatele de fișiere specificate de [CF Geometrii de eșantionare discrete (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Convenţii. Dar pentru fișiere care utilizează una dintre variantele multidimensionale CF DSG, utilizați [Tabel EDD Din mai multe DosareNc](#eddtablefrommultidimncfiles) În schimb.
        *    [Tabel EDD de la NCCSvFiles](#eddtablefromnccsvfiles) date agregate din [NCCSV](/docs/user/nccsv-1.00) Fișiere ASCII.csv.
        *    [Tabel EDDFromNOS](#eddtablefromnos)   (DEPRECAT) manevrează date tabulare de la serverele XML NOS.
        *    [Tabel EDD FromOBIS](#eddtablefromobis) se ocupă de datele tabulare de la serverele OBIS.
        *    [Tabel EDD din dosare de parchet](#eddtablefromparquetfiles) se ocupă de datele de la [Parchet](https://parquet.apache.org/) .
        *    [Tabel EDD din SOS ](#eddtablefromsos) manevrează date tabulare de la SOS servere.
        *    [Tabel EDD de la trei fișiere](#eddtablefromthreddsfiles)   (DEPRECAT) agregate date din fișiere cu mai multe variabile cu dimensiuni comune deservite de a [PREGĂTIRI OPeNDAP server](https://www.unidata.ucar.edu/software/tds/) .
        *    [Tabel EDD din WFS Fișiere](#eddtablefromwfsfiles)   (DEPRECAT) face o copie locală a tuturor datelor dintr-o ArcGIS MapServer WFS server astfel încât datele să poată fi re-servate rapid la ERDDAP™ utilizatori.
        *    [EDD TabelAgregareRows](#eddtableaggregaterows) poate face un set de date EDD Table dintr-un grup de seturi de date EDD.
        *    [EDDCommentCopy](#eddtablecopy) poate face o copie locală a mai multor tipuri de seturi de date EDDTable și apoi să rezerve rapid datele din copia locală.

  
- - -

## Descrierea detaliată a tipurilor de seturi de date{#detailed-descriptions-of-dataset-types} 

###  EDDGrid FromDap{#eddgridfromdap} 
 [ ** EDDGrid FromDap** ](#eddgridfromdap) se ocupă de variabilele rețelei din [ DAP ](https://www.opendap.org/) servere.

* Vă recomandăm cu tărie utilizarea [Generează dateName Programul Xml](#generatedatasetsxml) să facă un proiect dur al datasets.xml bucată pentru acest set de date. Puteți colecta informațiile de care aveți nevoie pentru a modifica că sau de a crea propriul XML pentru o EDDGrid Set de date FromDap prin examinarea fișierelor DDS și DAS ale setului sursă din browser (prin adăugarea .das și .dds la sourceUrl , de exemplu, [https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds](https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds) ) .
     
*    EDDGrid FromDap poate obține date de la orice variabilă multidimensională de la o DAP server de date. (Anterior, EDDGrid Din Dap s-a limitat la variabilele numite "grid," dar asta nu mai este o cerinţă.)   
     
* Valori de dimensiune sortare - Valorile pentru fiecare dimensiune trebuie sortate (ascendentă sau descendentă) . Valorile pot fi șterse neregulat. Nu pot exista legături. Aceasta este o cerinţă a [Standardul metadatelor CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) . Dacă valorile oricărei dimensiuni nu sunt în ordine sortate, setul de date nu va fi încărcat și ERDDAP™ va identifica prima valoare nesortate în fișierul jurnal; *Big ParentDirectory* /logs/log.txt.
    
Valorile de dimensiune nesortate indică aproape întotdeauna o problemă cu setul de date sursă. Acest lucru se întâmplă cel mai frecvent atunci când un fișier cu nume greșite sau nepotrivit este inclus în agregare, ceea ce duce la o dimensiune a timpului nesortate. Pentru a rezolva această problemă, consultați mesajul de eroare din ERDDAP™ log.txt fișier pentru a găsi valoarea de timp ofensatoare. Apoi căutați în fișierele sursă pentru a găsi fișierul corespunzător (sau una înainte sau una după) care nu aparține în agregare.
    
####  EDDGrid Schelet de la Dap XML{#eddgridfromdap-skeleton-xml} 

 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset type="EDDGridFromDap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromDap, this gets the remote .dds and then gets the new  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

     
###  EDDGrid Tabel de la EDD{#eddgridfromeddtable} 
 [ ** EDDGrid Tabel de la EDD** ](#eddgridfromeddtable) permite convertirea unui set de date tabelar EDD Tabular într-o EDDGrid Set de date cu grilă. Ţine minte asta. ERDDAP™ tratează seturi de date ca oricare [Seturi de date cu grilă (subclase de EDDGrid ) sau seturi de date tabelare (subclase ale tabelului EDD) ](#why-just-two-basic-data-structures) .

* În mod normal, dacă ați grilat date, tocmai ați înființat un EDDGrid Set de date direct. Uneori acest lucru nu este posibil, de exemplu, atunci când aveți datele stocate într-o bază de date relație care ERDDAP™ poate accesa numai prin intermediul EDDtableFromDatabase. EDDGrid De la clasa de tabel EDD vă permite să remediați această situație.
     
* În mod evident, datele din setul de date EDD trebuie să fie (Practic) date în rețea, dar într-o formă tabelară. De exemplu, setul de date al tabelului EDD poate avea date privind CTD: măsurători ale curentului spre est și spre nord, la mai multe adâncimi, de mai multe ori. Deoarece adâncimile sunt la fel în fiecare moment, EDDGrid Din tabelul DEDD se poate crea un set de date în grilă, cu o dimensiune de timp și adâncime care accesează datele prin intermediul setului de date EDD.
     
* Generează dateName Xml... Vă recomandăm cu tărie utilizarea [Generează dateName Programul Xml](#generatedatasetsxml) să facă un proiect dur al datasets.xml bucată pentru acest set de date. Puteți aduna informațiile de care aveți nevoie pentru a îmbunătăți proiectul dur.
     
* Atribute sursă -- Ca și în cazul tuturor celorlalte tipuri de seturi de date, EDDGrid Fromtable are ideea că există surse globaleAttributes și [global addAttributes ](#global-attributes)   (specificată în datasets.xml ) , care sunt combinate pentru a face global combinat Atribute, care sunt ceea ce văd utilizatorii. Pentru sursele globaleAttributes, EDDGrid Tabelul de la EDD folosește combinatul global Atribute ale setului de date al tabelului EDD. (Dacă te gândeşti puţin, are sens.) 
    
În mod similar, pentru fiecare axisVariable 's şi dataVariable 's [ addAttributes ](#addattributes) , EDDGrid Din tabelul DEDD se folosește combinatul variabilei Atribute din setul de date al tabelului EDD aferent EDDGrid Din baza de date a variabilei EDD TableAttributes. (Dacă te gândeşti puţin, are sens.) 
    
În consecință, dacă tabelul EDD are metadate bune, EDDGrid De la tabelul DEDD are adesea nevoie de foarte puține addAttributes metadate - doar câteva trucuri aici și acolo.
    
*    dataVariable s comparativ cu axisVariable S - Tabelul EDD suport are numai dataVariable c. An EDDGrid Setul de date din tabelul DEDD va avea unele axisVariable s (create din unele din tabelul EDD dataVariable s) și unele dataVariable s (create din tabelul EDD rămas dataVariable s) . [GenereazăSeturi de dateXml](#generatedatasetsxml) va face o presupunere cu privire la care tabel EDD dataVariable Pr EDDGrid Tabel de la EDD axisVariable S, dar este doar o presupunere. Aveți nevoie pentru a modifica producția de GenerateDateSetsXml pentru a specifica care dataVariable S va deveni axisVariable S, și în care ordine.
     
* axeValues -- Nu este nimic despre tabelul EDD de spus EDDGrid Tabelul de la DEDD valorile posibile ale axisVariable s în versiunea grilă a setului de date, astfel încât trebuie să furnizați aceste informații pentru fiecare axisVariable prin intermediul unuia dintre aceste atribute:
    
    * AxisValues -- vă permite să specificați o listă de valori. De exemplu,
        &lt;att name="axisValues" [type="dubluList"](#attributetype) \\&gt;2, 2.5, 3, 3.5, 4&lt;/att&gt;
Notă privind utilizarea [tipul de date](#data-types) plus cuvântul List. De asemenea, tipul de listă (de exemplu, dublu) , TREBUIE să se potrivească datelor Tipul variabilei din tabelul EDD și EDDGrid Seturi de date din tabelul DED.
    * AxisValuesStartStrideStop -- vă permite să specificaţi o secvenţă de valori spaţiale în mod regulat, specificând valorile de pornire, de mers şi de oprire. Iată un exemplu echivalent cu exemplul AxisValues de mai sus:
        &lt;numele att="axisValuesStartStrideStop" [type="dubluList"](#attributetype) \\&gt;2, 0,5, 4&lt;/att&gt;
Din nou, notați utilizarea unui tip de listă de date. De asemenea, tipul de listă (de exemplu, dublu) , TREBUIE să se potrivească datelor Tipul variabilei din tabelul EDD și EDDGrid Seturi de date din tabelul DED.
         
    
Actualizări... La fel cum nu există nici o cale pentru EDDGrid Din tabelul DEDD pentru a determina inițial valorile axei din tabelul EDD, nu există nici o modalitate fiabilă pentru EDDGrid Din tabelul DEDD pentru a determina din tabelul EDD când valorile axei s-au schimbat (în special, atunci când există valori noi pentru variabila temporală) . În prezent, singura soluție este modificarea atributului axValues în datasets.xml și reîncărcați setul de date. De exemplu, ai putea scrie un scenariu
    
    1. Caută datasets.xml pentru
         datasetID =" *DatasetID* "
Deci lucrezi cu setul de date corect.
    2. Caută datasets.xml pentru următoarea apariţie a
         <sourceName>  *The VariaablesSourceName*  </sourceName>   
Deci lucrezi cu variabila corectă.
    3. Caută datasets.xml pentru următoarea apariţie a
```
        <att name="axisValuesStartStrideStop" type="doubleList">  
```
Deci ştii poziţia de start a etichetei.
    4. Caută datasets.xml pentru următoarea apariţie a
```
        </att>  
```
Deci ştii poziţia finală a valorilor axei.
    5. Înlocuiți vechiul start, pas, opriți valorile cu noile valori.
    6. Contactaţi [URL- ul steagului](/docs/server-admin/additional-information#set-dataset-flag) pentru ca setul de date să indice ERDDAP™ pentru a reîncărca setul de date.
    
Nu e ideal, dar merge.
     
* precizie - Când EDDGrid Din tabelul DEDD răspunde la solicitarea unui utilizator de date, acesta mută un rând de date din tabelul de răspuns al tabelului EDD în EDDGrid Reţeaua de răspuns. Pentru a face acest lucru, trebuie să-și dea seama dacă valorile "axei" pe un anumit rând din tabel corespund unei combinații de valori ale axei din rețea. Pentru tipurile de date întregi, este ușor să se determine dacă două valori sunt egale. Dar pentru flotoare și duble, acest lucru aduce problema oribil de numere de puncte plutitoare [nu se potrivesc exact](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) . (de exemplu, 0. 2 comparativ cu 0. 199999999999996) . La (încearcă să) Ocupă-te de asta. EDDGrid De la Tabel vă permite să specificați un atribut de precizie pentru oricare dintre axisVariable s, care precizează numărul total de cifre zecimale care trebuie să fie identice.
    * De exemplu,&lt;att name="precision" type="int/65"&lt;/att&gt;
    * Pentru diferite tipuri de variabile de date, există valori diferite de precizie implicită. De obicei, valorile implicite sunt adecvate. Dacă nu sunt, trebuie să specificaţi valori diferite.
    * Pentru axisVariable s care sunt [timp sau timp Variabilele timbrelor](#timestamp-variables) , implicit este precizia completă (o potrivire exactă) .
    * Pentru axisVariable s care sunt flotoare, precizia implicită este 5.
    * Pentru axisVariable s care sunt duble, precizia implicită este 9.
    * Pentru axisVariable s care au tipuri de date întregi; EDDGrid De la EDDtable ignoră atributul de precizie și utilizează întotdeauna precizia completă (o potrivire exactă) .
         
    *    **AVERTISMENT&#33;** Atunci când efectuează conversia unei bucăți de date tabulare într-o bucată de date grile, dacă EDDGrid De la EDDDtable nu se poate potrivi cu o valoare "axă" a tabelului EDD la una dintre valorile așteptate EDDGrid Valorile axei din tabelul DEDD EDDGrid Tabelul de la EDD în tăcere (nicio eroare) aruncă datele din acel rând al tabelului. De exemplu, pot exista alte date (nu pe grilă) în setul de date al tabelului EDD. (Și dacă pas &gt; 1, nu este evident să EDDGrid De la Tabel care valori ale axei sunt valorile dorite și care dintre ele trebuie să fie omise din cauza pasului.) Deci, în cazul în care valorile de precizie sunt prea mari, utilizatorul va vedea valorile lipsă în răspunsul datelor atunci când există valori de date valabile.
        
Invers, în cazul în care valorile de precizie sunt stabilite prea mici, valorile de "axă" ale tabelului EDD care nu ar trebui să se potrivească EDDGrid Valorile axei de la EDDD (în mod eronat) Potrivire.
        
Aceste probleme potențiale sunt oribile, deoarece utilizatorul primește date greșite (sau valori lipsă) atunci când acestea ar trebui să obțină datele corecte (sau cel puțin un mesaj de eroare) .
Acesta nu este un defect în EDDGrid De la Table. EDDGrid De la Table nu poate rezolva această problemă. Problema este inerentă conversiei datelor tabulare în date grupate (Dacă nu se pot face alte presupuneri, dar nu se pot face aici.) .
Depinde de tine. ERDDAP™ administrator; **testaţi EDDGrid Tabelul de la EDD** să se asigure că valorile de precizie sunt stabilite pentru a evita aceste probleme potențiale.
        
#### gol Threshold{#gapthreshold} 
*    [gol Threshold](#gapthreshold) -- Acesta este un tip foarte neobişnuit de set de date. Deoarece tipurile de întrebări care pot fi adresate (manipulate de) a EDDGrid Set de date (legate de intervalele și pașii axisVariable s) sunt foarte diferite de tipurile de întrebări care pot fi adresate (manipulate de) un set de date al tabelului EDD (doar legate de intervalele de unele variabile) , performanța EDDGrid Seturile de date ale tabelului DEDD variază foarte mult în funcție de cererea exactă care se face și de viteza setului de date al tabelului EDD. Pentru cererile care au o valoare de pas &gt; 1, EDDGrid Tabelul DEDD poate solicita tabelul EDD suport pentru o bucată relativ mare de date (ca și cum pas=1) şi apoi să cercetăm rezultatele, păstrând datele din unele rânduri şi aruncând datele de la alţii. În cazul în care trebuie să caute prin o mulțime de date pentru a obține datele de care are nevoie, cererea va dura mai mult pentru a completa.
    
Dacă EDDGrid Din tabelul DEDD se poate spune că vor exista lacune mari (cu rânduri de date nedorite) între rândurile cu datele dorite; EDDGrid De la tabelul DEDD pot alege să facă mai multe subcereri la tabelul EDD de bază în loc de o cerere mare, prin urmare, sărind peste rândurile nedorite de date în lacunele mari. Sensibilitatea pentru această decizie este controlată de diferența dintre valoarea de referință și valoarea specificată în&lt;golThreshold&gt; tag (implicit=1000 rânduri de date sursă) . Stabilirea decalajuluiThreshold la un număr mai mic va duce la crearea setului de date (în general) mai multe cereri. Stabilirea decalajuluiThreshold la un număr mai mare va duce la crearea setului de date (în general) mai puţine cereri.
    
Dacă gaura Threshold e prea mică, EDDGrid De la EDDtable va funcționa mai lent, deoarece cheltuielile generale ale cererilor multiple vor fi mai mari decât timpul economisit prin obținerea unor date suplimentare. Dacă gaura Threshold e prea mare, EDDGrid Din tabelul DEDD va funcționa mai lent, deoarece atât de multe date în exces vor fi extrase din tabelul EDD, doar pentru a fi eliminate. (După cum Goldilocks a descoperit, mijlocul este "just dreapta.") În general, pentru diferite tipuri de seturi de date EDD Table variază foarte mult, astfel încât singura modalitate de a cunoaște cea mai bună setare reală pentru setul de date este prin experimentare. Dar nu va merge prea departe greșit lipirea la implicit.
    
Un exemplu simplu este: Imaginați-vă un EDDGrid De la Tabel cu doar unul axisVariable   (timp, cu o dimensiune de 100000) , unu dataVariable   (temperatura) , și decalaj implicitThreshold 1000.
    
    * Dacă un utilizator solicită temperatură \\[ 0&#58;100&#58;5000 \\] , pas este 100, astfel încât dimensiunea decalajului este 99, care este mai mică decât decalajul Threshold. Deci... EDDGrid De la Tabel se va face doar o cerere la tabelul EDD pentru toate datele necesare pentru cerere (echivalent cu temperatura \\[ 0:5000 \\] ) şi aruncă toate rândurile de date de care nu are nevoie.
    * Dacă un utilizator solicită temperatură \\[ 0: 2500:5000 \\] , că pas este 2500, astfel încât dimensiunea decalajului este 2499, care este mai mare decât decalajul Threshold. Deci... EDDGrid De la Tabel vor face cereri separate la tabelul EDD care sunt echivalente cu temperatura \\[ 0 \\] temperatura \\[ 2500 \\] temperatura \\[ 5000 \\] .
    
Calculul dimensiunii decalajului este mai complicat atunci când există mai multe axe.
    
Pentru fiecare cerere a utilizatorului, EDDGrid De la EDDTable printează mesaje de diagnosticare legate de acest lucru în [log.txt](/docs/server-admin/additional-information#log) Dosar.
    
    * Dacă [&lt;Nivel log&gt;] (#loglevel) în datasets.xml este setat la info, acest lucru imprima un mesaj ca
\\* nOuterAxes=1 din 4 nOuterRequests=22
Dacă nOuterAxes=0, golulThreshold nu a fost depășit și se va face o singură cerere la tabelul EDD.
În cazul în care nOuterAxes&gt;0, decalajThreshold a fost depășit și nuOuterRequests vor fi făcute la EDDtable, corespunzătoare fiecărei combinații solicitate de cele mai din stânga nOuterAxes. De exemplu, dacă setul de date are 4 axisVariable s şi dataVariable E ca la est. \\[ timp \\]  \\[ latitudine \\]  \\[ longitudine \\]  \\[ adâncime \\] , la stânga (Prima dată) Variabila axei este timpul.
    * Dacă&lt;Nivel log&gt; în datasets.xml este setat pentru toate, informații suplimentare este scris în fișierul log.txt.
         
####  EDDGrid Schelet de tabel de la EDD XML{#eddgridfromeddtable-skeleton-xml} 
 >&nbsp;&lt;dataset type="EDDGridFromEDDTable" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromEDDTable, this only works if the underlying EDDTable  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;supports updateEveryNMillis. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;gapThreshold>](#gapthreshold)...&lt;/gapThreshold> &lt;!-- 0 or 1. The default is 1000. >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The underlying source EDDTable dataset. -->  
 >&nbsp;&lt;/dataset>  

### EDD*De la ERDDAP  {#eddfromerddap} 
 ** EDDGrid FromErddap** Manipulează datele de la distanță ERDDAP™ server.
 **Tabel EDD FromErddap** mânuiește date tabulare de la o distanță ERDDAP™ server.

*    EDDGrid De la Erddap și EDDTabelFromErddap se comportă diferit față de toate celelalte tipuri de seturi de date din ERDDAP .
    * Ca și alte tipuri de seturi de date, aceste seturi de date obțin informații despre setul de date de la sursă și îl păstrează în memorie.
    * Ca alte tipuri de seturi de date, atunci când ERDDAP™ caută seturi de date, afișează formularul de acces la date ( * datasetID * .html) , sau afișează formularul Make A Graph ( * datasetID * .graph) , ERDDAP™ utilizează informațiile despre setul de date care este în memorie.
    *    EDDGrid De la Erddap și tabelul EDD FromErddap sunt baza pentru [Grile/clustere/federații](/docs/server-admin/scaling) din ERDDAP s, care distribuie eficient utilizarea procesorului (mai ales pentru a face hărți) , utilizarea memoriei, stocarea setului de date și utilizarea benzii de bandă a unui mare centru de date.
#### Redirecționează{#redirect} 
* Spre deosebire de alte tipuri de seturi de date, atunci când ERDDAP™ primește o cerere de date sau imagini din aceste seturi de date; ERDDAP   [redirecționări](https://en.wikipedia.org/wiki/URL_redirection) cererea la distanță ERDDAP™ server. Rezultatul este:
    * Acest lucru este foarte eficient (CPU, memorie și lățime de bandă) , pentru că altfel
        1. Compozitul ERDDAP™ trebuie să trimită cererea celeilalte ERDDAP™   (care necesită timp) .
        2. Celălalt. ERDDAP™ trebuie să obţină datele, să le reformuleze şi să transmită datele compozitului ERDDAP .
        3. Compozitul ERDDAP™ trebuie să primească datele (utilizarea benzii de bandă) , reformat-o (utilizarea procesorului și memoriei) , și transmite datele către utilizator (utilizarea benzii de bandă) . Prin redirecționarea cererii și permițându-i celuilalt ERDDAP™ pentru a trimite răspunsul direct către utilizator, compozit ERDDAP™ nu petrece în esență nici timp CPU, memorie, sau lățime de bandă la cerere.
    * Redirecţionarea este transparentă pentru utilizator indiferent de software-ul client (un browser sau orice alt software sau instrument de linie de comandă) .
*    [Se vede. ERDDAP™ ](#redirect) să nu redirecționeze nicio cerere de utilizare prin setare&lt;redirecţionare &gt; falşi&lt;/redirect&gt;, dar acest lucru neagă cele mai multe dintre avantajele ...De la Erddap Set de date de tip (în special, dispersarea sarcinii pe partea din față ERDDAP™ la distanță/spate ERDDAP ) .
         
     
#### Abonamente{#subscriptions} 
În mod normal, atunci când EDDGrid De la Erddap și tabelul EDD FromErddap sunt (au) încărcat pe dumneavoastră ERDDAP , încearcă să adauge un abonament la setul de date de la distanță prin telecomandă ERDDAP e-mail/URL sistem de abonament. Astfel, ori de câte ori se schimbă setul de date de la distanță, telecomanda ERDDAP™ contactează [setDataset URL- ul steagului](/docs/server-admin/additional-information#set-dataset-flag) pe dumneavoastră ERDDAP™ astfel încât setul de date local să fie reîncărcat ASAP și astfel încât setul local să fie întotdeauna perfect actualizat și să imite setul de date de la distanță. Deci, prima dată când acest lucru se întâmplă, ar trebui să obțineți un e-mail care solicită validarea abonamentului. Cu toate acestea, dacă local ERDDAP™ nu pot trimite un e-mail sau dacă telecomanda ERDDAP Sistemul de e-mail/abonare RURL nu este activ, ar trebui să trimiteți un e-mail la distanță ERDDAP™ administrator și cere ca s/el adăuga manual [&lt;privind schimbarea &gt;] (#Onchange) ...&lt;/onChange&gt; tags to all of the relevant settings to call your settings [setDataset URL- uri pentru pavilion](/docs/server-admin/additional-information#set-dataset-flag) . Vezi-ţi ERDDAP™ raport zilnic pentru o listă de setDataset URL-uri de pavilion, dar trimite doar cele pentru EDDGrid De la seturi de date Erddap și EDDDe la seturi de date Erddap la distanță ERDDAP™ administrator.
    
Nu merge? Seturile de date locale nu sunt sincronizate cu seturile de date de la distanţă?
Mai multe lucruri trebuie să funcţioneze corect pentru ca acest sistem să funcţioneze astfel încât seturile de date să rămână actualizate. Verificați fiecare dintre aceste lucruri în ordine:
    
    1. Al tău ERDDAP™ trebuie să poată trimite e-mailuri. Vezi setările de e-mail din setup.xml.
    2. În general (dar nu întotdeauna.) , dumneavoastră ERDDAP 's&lt;bazăUrl&gt; și&lt;BazaHttpsUrl&gt; nu trebuie să aibă un număr de port (De exemplu, :8080, :8443) . Dacă o fac, utilizați un [proxypass](/docs/server-admin/deploy-install#proxypass) pentru a scoate portul din Url.
    3. În setup.xml,&lt;abonatToRemoteErddapDataset&gt; trebuie să fie setat la adevărat.
    4. Când EDD-ul local... Setul de date de la Erddap este reîncărcat, ar trebui să trimită o cerere la distanță ERDDAP™ să se aboneze la setul de date de la distanță. Uită-te în log.txt pentru a vedea dacă acest lucru se întâmplă.
    5. Ar trebui să primeşti un e-mail prin care să-ţi ceri să validezi cererea de abonament.
    6. Trebuie să faceți clic pe link-ul din acel e-mail pentru a valida cererea de abonament.
    7. Telecomanda. ERDDAP™ ar trebui să spună că validarea a avut succes. În orice moment, puteți solicita un e-mail de la distanță ERDDAP™ cu o listă a abonamentelor în curs și valabile. Vezi formularul la *RemoteErddapBase Url* /erddap/subscriptions/list.html .
    8. Atunci când setul de date la distanță se schimbă (De exemplu, primește date suplimentare) , telecomanda ERDDAP™ trebuie să încercaţi să contactaţi flagURL pe dumneavoastră ERDDAP . Nu poţi verifica asta, dar poţi întreba administratorul telecomenzii. ERDDAP™ pentru a verifica acest lucru.
    9. Al tău ERDDAP™ ar trebui să primească o cerere de stabilire a pavilionului respectiv. Uită-te în jurnal.txt pentru "setDatasetFlag.txt?" cerere (s) și a vedea dacă există un mesaj de eroare asociat cu cererile.
    10. Al tău ERDDAP™ ar trebui să încerce apoi să reîncărcați acel set de date (Poate nu imediat, dar cât mai repede.) .
         
#### max. actualizat (timp) ?{#up-to-date-maxtime} 
 EDDGrid /TabelFromErddap settings modifică informațiile stocate despre fiecare set de date sursă numai atunci când setul de date sursă este ["reîncărcat"](#reloadeverynminutes) şi unele modificări de metadate (De exemplu, variabila timpului actual\\_range ) , generând astfel o notificare de subscriere. Dacă setul de date sursă conține date care se modifică frecvent (de exemplu, date noi în fiecare secundă) și utilizează ["actualizare"](#updateeverynmillis) sistemul de notificare a modificărilor frecvente ale datelor subiacente; EDDGrid /TabelFromErddap nu va fi notificat cu privire la aceste modificări frecvente până la următorul set de date "reîncărcare," astfel încât EDDGrid /Table FromErddap nu va fi perfect actualizat. Puteți minimiza această problemă prin modificarea setului de date sursă&lt;reîncărcareEveryNMinutes&gt; la o valoare mai mică (60? 15?) astfel încât să existe mai multe notificări de abonament pentru a spune EDDGrid /TableFromErddap pentru a actualiza informațiile sale despre setul de date sursă.

Sau, în cazul în care sistemul de gestionare a datelor știe când setul de date sursă are date noi (de exemplu, prin intermediul unui script care copiază un fișier de date în loc) , și în cazul în care nu este foarte frecvent (de exemplu, la fiecare 5 minute sau mai puțin frecvente) , există o soluție mai bună:

1. Nu folosi&lt;ActualizeazăEveryNMillis&gt; pentru a menține setul sursă la zi.
2. Setează setul de date sursă&lt;reîncărcareEveryNMinutes&gt; la un număr mai mare (1440?) .
3. Pune scriptul să contacteze setul de date sursă [URL- ul steagului](/docs/server-admin/additional-information#set-dataset-flag) imediat după ce copiază un nou fișier de date în loc.
     

Acest lucru va duce la actualizarea perfectă a setului de date sursă și va determina generarea unei notificări de subscriere, care va fi trimisă către EDDGrid /Table FromErddap Set de date. Asta va conduce EDDGrid Set de date pentru a fi perfect actualizat (în termen de 5 secunde de la adăugarea de date noi) . Și tot ce se va face eficient (fără reîncărcari inutile de seturi de date) .
     
#### Nu. addAttributes , axisVariable , sau dataVariable  {#no-addattributes-axisvariable-or-datavariable} 
Spre deosebire de alte tipuri de seturi de date, tabelul EDDFromErddap și EDDGrid Seturile de date de la Erddap nu permit global&lt;addAttributes&gt;,&lt; axisVariable &gt; sau&lt; dataVariable &gt; secţiuni în datasets.xml pentru acel set de date. Problema este că permiterea acestora ar duce la neconcordanțe:
    
1. Să spunem că a fost permis și ai adăugat un nou atribut global.
2. Când un utilizator întreabă ERDDAP™ pentru atributele globale, va apărea noul atribut.
3. Dar când un utilizator întreabă ERDDAP™ pentru un fișier de date, dvs. ERDDAP™ redirecționează cererea către sursă ERDDAP . Asta ERDDAP™ nu cunoaşte noul atribut. Deci, dacă creează un fișier de date cu metadate, de exemplu, a .nc fişier, metadatele nu vor avea noul atribut.

Există două lucruri:

1. Convinge adminul sursei ERDDAP™ pentru a face modificările pe care doriți să metadate.
2. În loc de tabelul EDDFromErddap, utilizați [Tabel EDD din DapSequence](#eddtablefromdapsequence) . Sau în loc de EDDGrid FromErddap, utilizare [ EDDGrid FromDap](#eddgridfromdap) . Aceste tipuri de EDD vă permit să vă conectați eficient la un set de date de la distanță ERDDAP™   (dar fără redirecționarea cererilor de date) și vă permit să includeți global&lt;addAttributes&gt;,&lt; axisVariable &gt; sau&lt; dataVariable &gt; secţiuni în datasets.xml . O altă diferență: va trebui să vă abonați manual la setul de date de la distanță, astfel încât setul de date de pe dvs. ERDDAP™ va fi notificat (prin intermediul [URL- ul steagului](/docs/server-admin/additional-information#set-dataset-flag) ) atunci când există modificări ale setului de date la distanță. Astfel, creaţi un nou set de date, în loc să vă conectaţi la un set de date de la distanţă.
         
#### Alte note{#other-notes} 
* Din motive de securitate, EDDGrid De la Erddap și tabelul EDD FromErddap nu sprijină [&lt;Access to&gt;] (#accesibil la) etichetă și nu poate fi utilizat cu seturi de date de la distanță care necesită logare (pentru că acestea utilizează [&lt;Access to&gt;] (#accesibil la) ).. Vezi? ERDDAP 's [sistem de securitate](/docs/server-admin/additional-information#security) limitarea accesului la anumite seturi de date către unii utilizatori.
     
* Începând cu ERDDAP™ v2.10; EDDGrid De la Erddap și EDDtableFromErddap sprijină [&lt;accessableViaFiles&gt;] (#accesibilviafiles) Tag. Spre deosebire de alte tipuri de seturi de date, implicit este adevărat, dar fișierele setului de date vor fi accesibileViaFiles numai în cazul în care setul de date sursă are, de asemenea,&lt;accessableViaFiles&gt; set to true.
     
* Puteţi folosi [Generează dateName Programul Xml](#generatedatasetsxml) pentru a face datasets.xml bucată pentru acest tip de set de date. Dar puteți face aceste tipuri de seturi de date ușor de mână.
     
####  EDDGrid Schelet FromErddap XML{#eddgridfromerddap-skeleton-xml} 
*    EDDGrid Schelet FromErddap Setul XML este foarte simplu, deoarece intenția este doar de a imita setul de date de la distanță, care este deja potrivit pentru utilizarea în ERDDAP :
 >&nbsp;&nbsp;&lt;dataset type="EDDGridFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)...&lt;/accessibleViaFiles> &lt;!-- 0 or 1, default=true. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromErddap, this gets the remote .dds and then gets  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the new leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
 >&nbsp;&nbsp;&lt;/dataset>  

#### Tabel EDDFromErddap schelet XML{#eddtablefromerddap-skeleton-xml} 
* Name ERDDAP :
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid De la Etopo{#eddgridfrometopo} 
 [ ** EDDGrid De la Etopo** ](#eddgridfrometopo) doar serveşte [ETOPO1 Set global de date privind creșterea cu 1 minut](https://www.ngdc.noaa.gov/mgg/global/global.html)   (Ice Surface, grilă înregistrată, binar, 2byte int: etopo1\\_ice\\_g\\_i2 .zip ) care este distribuit cu ERDDAP .

* Doar doi. datasetID s sunt suportate pentru EDDGrid De la Etopo, astfel încât să puteți accesa datele cu valorile de longitudine -180 la 180, sau valorile de longitudine 0 la 360.
* Nu există niciodată sub tag-uri, deoarece datele sunt deja descrise în ERDDAP .
* Deci, cele două opțiuni pentru EDDGrid Seturile de date de la Etopo sunt (literalmente) :
```
      <!-- etopo180 serves the data from longitude -180 to 180 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo180" /> 
      <!-- etopo360 serves the data from longitude 0 to 360 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo360" /> 
```

###  EDDGrid Din dosare{#eddgridfromfiles} 
 [ ** EDDGrid Din dosare** ](#eddgridfromfiles) este superclasa tuturor EDDGrid De la... clase de fişiere. Nu poţi folosi EDDGrid De la Dosare direct. În schimb, utilizați o subclasă de EDDGrid FromFiles pentru a gestiona tipul specific de fișier:

*    [ EDDGrid De la MergeIRFiles](#eddgridfrommergeirfiles) se ocupă de datele din rețea [CombeIR .gz ](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README) Dosare.
*    [ EDDGrid De la AudioFiles](#eddfromaudiofiles) agregate de date dintr-un grup de fișiere audio locale.
*    [ EDDGrid DinNcFiles](#eddgridfromncfiles) se ocupă de datele din rețea [GRIB.grb](https://en.wikipedia.org/wiki/GRIB) fișiere; [ HDF   (v4 sau v5)   .hdf ](https://www.hdfgroup.org/) fișiere; [ .nc ml](#ncml-files) fișiere și [ NetCDF   (v3 sau v4)   .nc ](https://www.unidata.ucar.edu/software/netcdf/) Dosare. Acest lucru poate funcționa cu alte tipuri de fișiere (de exemplu, BUFR) N-am testat-o. Vă rugăm să ne trimiteţi nişte dosare dacă sunteţi interesat.
*    [ EDDGrid De la NCFilesDespachetat](#eddgridfromncfilesunpacked) este o variantă de EDDGrid De laNcFiles care se ocupă de datele din rețea NetCDF   (v3 sau v4)   .nc și fișiere aferente, care ERDDAP™ Despachetează la un nivel scăzut.

În prezent, nu sunt acceptate alte tipuri de fișiere. Dar este, de obicei, relativ ușor pentru a adăuga suport pentru alte tipuri de fișiere. Contactaţi-ne dacă aveţi o cerere. Sau, în cazul în care datele dvs. este într-un format de fișier vechi pe care doriți să se mute departe, vă recomandăm convertirea fișierelor să fie NetCDF v3 .nc Dosare. NetCDF este un format binar pe scară largă, permite accesul aleatoriu rapid la date și este deja sprijinit de ERDDAP .

#### Din detaliile fișierelor{#from-files-details} 
Următoarele informații se aplică tuturor subclaselor din EDDGrid De la Dosare.

##### Agregarea unei dimensiuni existente{#aggregation-of-an-existing-dimension} 
Toate variaţiile EDDGrid FromFiles poate agrega date din fișiere locale, în cazul în care fiecare fișier are 1 (sau mai mult) valori diferite pentru stânga (Prima dată) dimensiune, de obicei \\[ timp \\] , care va fi agregată. De exemplu, dimensiunile ar putea fi \\[ timp \\]  \\[ altitudine \\]  \\[ latitudine \\]  \\[ longitudine \\] , și fișierele ar putea avea datele pentru unul (sau câteva) valoarea timpului (s) pe fișier. Setul de date rezultat apare ca și cum toate datele fișierului ar fi fost combinate. Marile avantaje ale agregării sunt:

* Dimensiunea setului de date agregate poate fi mult mai mare decât un singur fișier poate fi convenabil (~2GB) .
* Pentru datele aproape în timp real, este ușor să adăugați un nou fișier cu cea mai recentă bucată de date. Nu trebuie să rescrii întregul set de date.

Cerințele privind agregarea sunt:
* Dosarele locale nu trebuie să aibă acelaşi lucru. dataVariable s (astfel cum este definit în setul de date datasets.xml ) . Setul de date va avea dataVariable s definit în datasets.xml . Dacă un anumit fișier nu are un dat dataVariable , ERDDAP™ va adăuga valorile lipsă după cum este necesar.
* Toate dataVariable Trebuie să utilizaţi acelaşi medicament. axisVariable S/dimensiuni (astfel cum este definit în setul de date datasets.xml ) . Fișierele vor fi agregate pe baza primului (cea mai stângă) dimensiune, sortate în ordine ascendentă.
* Fiecare fișier poate avea date pentru una sau mai multe valori ale primei dimensiuni, dar nu poate exista nicio suprapunere între fișiere. Dacă un fișier are mai mult de o valoare pentru prima dimensiune, valorile trebuie sortate în ordine ascendentă, fără legături.
* Toate fișierele TREBUIE să aibă exact aceleași valori pentru toate celelalte dimensiuni. Precizia încercării este determinată de [Potrivire AxisNDigits](#matchaxisndigits) .
* Toate fișierele TREBUIE să aibă exact același lucru [unități](#units) metadate pentru toți axisVariable s şi dataVariable c. Dacă aceasta este o problemă, ați putea fi capabil de a utiliza [NcML](#ncml-files) sau [ NCO ](#netcdf-operators-nco) pentru a rezolva problema.
         
##### Agregare prin nume de fișiere sau metadate globale{#aggregation-via-file-names-or-global-metadata} 
Toate variaţiile EDDGrid FromFiles poate, de asemenea, agrega un grup de fișiere prin adăugarea unui nou stanga (Prima dată) dimensiune, de obicei timp, bazat pe o valoare derivată din fiecare nume de fișier sau din valoarea unui atribut global care este în fiecare fișier. De exemplu, numele fișierului poate include valoarea timpului pentru datele din fișier. ERDDAP™ ar crea apoi o nouă dimensiune temporală.

Spre deosebire de caracteristica similară în THREDS, ERDDAP™ întotdeauna creează o axisVariable cu valori numerice (conform cerințelor CF) , valori niciodată coarde (care nu sunt permise de CF) . De asemenea, ERDDAP™ va sorta fișierele din agregarea bazată pe numeric axisVariable valoarea care este atribuită fiecărui fișier, astfel încât variabila axei să fi sortate întotdeauna valorile cerute de CF. Abordarea THREDS de a face un fel lexicografic bazat pe numele de fișiere duce la agregari în cazul în care valorile axei nu sunt sortate (care nu este permisă de CF) atunci când numele fișierelor sortează diferit față de cele derivate axisVariable valori.

Pentru a stabili una dintre aceste agregari în ERDDAP™ , veți defini o nouă stânga (Prima dată)   [ axisVariable ](#axisvariable) cu un pseudo special&lt; sourceName &gt;, care spune ERDDAP™ unde și cum să găsiți valoarea pentru noua dimensiune din fiecare fișier.

* Formatul pseudo sourceName care obține valoarea dintr-un nume de fișier (doar numele fișierului.) este
    \\*\\*\\ *nume fișier;*  [date Tip](#data-types)  *,* extractRegex *,* captGroupNumber
* Formatul pseudo sourceName care obține valoarea de la numele de cale absolută a unui fișier este
    \\*\\*\\ *numele trasei;*  [date Tip](#data-types)  *,* extractRegex *,* captGroupNumber
     \\[ Pentru asta, numele căii o foloseşte întotdeauna. '/' ca caracter separator director, niciodată "\\\." \\] 
* Formatul pseudo sourceName care obține valoarea de la un atribut global este
    \\*\\*\\ *global:* atribut Nume *,*  [date Tip](#data-types)  *,* extractRegex *,* captGroupNumber
* Acest pseudo sourceName opţiunea funcţionează diferit de celelalte: în loc să creeze un nou stangas (Prima dată)   axisVariable , aceasta înlocuiește valoarea curentului axisVariable cu o valoare extrasă din numele fișierului (doar numele fișierului.) . Formatul este
    \\*\\*\\ *înlocuire De la FileName,*  [date Tip](#data-types)  *,* extractRegex *,* captGroupNumber
     

Descrierile părţilor pe care trebuie să le oferiţi sunt:

*    *atribut Nume* - numele atributului global care se află în fiecare fişier şi care conţine valoarea dimensiunii.
*    *date Tip* -- Aceasta specifică tipul de date care va fi utilizat pentru a stoca valorile. A se vedea lista standard a [date Tipuri](#data-types) că ERDDAP™ acceptă, cu excepția faptului că String nu este permis aici, deoarece variabilele axei în ERDDAP™ Nu pot fi variabile String.
    
Există un pseudo dataType suplimentar, timeFormat = *șir TimpFormat* , care spune ERDDAP™ că valoarea este un timp StringStamp [unități adecvate pentru timpii corzilor](#string-time-units) . În majoritatea cazurilor, stringTimeFormat de care aveți nevoie va fi o variație a unuia dintre aceste formate:
    
    *    yyyy-MM-dd 'T'HH:mm:ss.SSSZ -- care ISO 8601:2004 (E) formatul datei. S-ar putea să fie nevoie de o versiune scurtată a acestui lucru, de exemplu, yyyy-MM-dd 'T'HH:mm:ss sau yyyy-MM-dd .
    * aaaallmddHhmmss.SSS -- care este versiunea compactă a formatului datei ISO 8601. Este posibil să aveți nevoie de o versiune scurtată a acestui lucru, de exemplu, aaaammddHmmss sau aaaammdd.
    * M/d/aaaa H:mm:ss.SSS -- care este formatul U.S. slash data format. S-ar putea să fie nevoie de o versiune scurtată a acestui lucru, de exemplu, M/d/aaaa.
    * aaaaddDHHmmssSS -- care este anul plus ziua cu zero căptuşită a anului (De exemplu, 001 = 1 ianuarie 365 = 31 decembrie într-un an neleap; acest lucru este uneori numit în mod eronat data Julian) . Este posibil să aveți nevoie de o versiune scurtată a acestui lucru, de exemplu, aaaaDD.
    
Dacă utilizați acest pseudo dataType, adăugați acest lucru la noua variabilă&lt; addAttributes &gt;:
```
        <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Dacă doriți să modificați toate valorile timpului, schimbați valoarea timpului în unități, de exemplu,
1970-01-01T12:00Z.
*    *extractRegex* -- Aceasta este [expresie regulată](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) care include un grup de capturare (în paranteze) care descrie modul de extragere a valorii din numele fișierului sau valoarea atributului global. De exemplu, dat un nume de fișier ca S19980011998031.L3b\\_MO\\_CHL .nc , captura grupul #1, "\\ \\dtutorial ", în expresia regulată S (\\ \\dtutorial ) \\ \\dtutorial \\.L3b.\\* va captura primele 7 cifre după 'S': 1998001.
*    *număr grup de captură* -- Acesta este numărul grupului de capturare (într-o pereche de paranteze) în expresia regulată care conține informațiile de interes. De obicei este 1, primul grup de capturare. Uneori trebuie să utilizați grupuri de captare în alte scopuri în regex, astfel încât atunci numărul important al grupului de captare va fi 2 (al doilea grup de capturare) sau 3 (al treilea) , etc.

Un exemplu complet de o axisVariable care face un set de date agregat cu o nouă axă temporală care obține valorile timpului din numele fiecărui fișier este
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
      </axisVariable>
```
Când utilizaţi "timeFormat=" pseudo date Tip, ERDDAP™ va adăuga 2 atribute axisVariable astfel încât acestea par să vină de la sursă:
```
    <att name="standard\\_name">time</att>  
    <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Deci, în acest caz, ERDDAP™ va crea o nouă axă numită "time" cu valori duble (secunde de la 1970-01-01T00:00:00Z) prin extragerea celor 7 cifre după 'S' și înainte de ".L3m" în numele fișierului și interpretarea acestora ca valori ale timpului formatate în 'YYDDD.

Puteți suprascrie timpul de bază implicit (1970-01-01T 00:00:00Z) prin adăugarea unui [addAtribut](#addattributes) care specifică un atribut de unități diferite cu un timp de bază diferit. O situaţie comună este: există grupuri de fişiere de date, fiecare cu un compus de 1 zi dintr-un set de date satelit, în cazul în care doriţi ca valoarea de timp să fie la prânz a zilei menţionate în numele fişierului (ora centrată a fiecărei zile) și doresc variabila lui long\\_name să fie "Ora Centrată." Un exemplu care face acest lucru este:
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
        <addAttributes>
          <att name="long\\_name">Centered Time</att>
          <att name="units">seconds since 1970-01-01T12:00:00Z</att>
        </addAttributes>
      </axisVariable>
```
Notă ore=12 în timpul de bază, care adaugă 12 ore în raport cu timpul de bază original de 1970-01-01T00:00:00Z.

Un exemplu complet de o axisVariable care face un set de date agregat cu o nouă axă "run" (cu valori int) care obține valorile de rulare de la atributul global "runID" în fiecare fișier (cu valori cum ar fi "r17\\_global," unde 17 este numărul run) este
```
      <axisVariable> 
        <sourceName>\\*\\*\\*global:runID,int,(r|s)(\\d+)\\_global,2</sourceName>
        <destinationName>run</destinationName>
        <addAttributes>
          <att name="ioos\\_category">Other</att>
          <att name="units">count</att>
        </addAttributes>
      </axisVariable>
```
Observați utilizarea grupului de capturare numărul 2 pentru a captura cifrele care apar după 'r' sau 's' și înainte de "\\_global." Acest exemplu arată, de asemenea, cum să adăugați atribute suplimentare (de exemplu, ioos\\_category și unități) la variabila axei.
     
#### Fișiere comprimate extern{#externally-compressed-files} 
* Seturi de date care sunt subseturi de EDDGrid Din fişiere şi tabel EDD FromFiles poate servi date direct din fișiere de date externe comprimate, inclusiv .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 , și fișiere .Z .
     
*    **Acest lucru funcționează surprinzător de bine&#33;**   
În majoritatea cazurilor, încetinirea legată de decompresia fișierelor de date mici și mijlocii este minoră. Dacă trebuie să conservaţi spaţiul discului, vă încurajăm să utilizaţi această caracteristică, în special pentru fişierele mai vechi care sunt rareori accesate.
     
*    **Economiseşte bani&#33;**   
Aceasta este una dintre puținele caracteristici în ERDDAP™ care vă oferă o șansă de a economisi o mulțime de bani (cu toate că, la costul de performanță ușor scăzut) . Dacă raportul de compresie este, de exemplu, 6:1 (Uneori va fi mult mai mare.) , apoi fişierele de date ale setului vor avea nevoie doar de 1/6 spaţiul discului. Atunci poate reuşeşti cu 1 RAID. (de o dimensiune dată) în loc de 6 RAIDS (de aceeași dimensiune) . Aceasta este o economie enormă de costuri. Din fericire, capacitatea de a comprima unele fișiere într-o colecție (Cei mai în vârstă?) și nu comprima pe alții (Cele noi?) Şi pentru a schimba asta în orice moment, să minimalizăm dezavantajul compresării unor fişiere. (acces mai lent) . Și dacă alegerea este între stocarea fișierelor pe bandă (și accesibile numai la cerere, după o întârziere) vs stocarea lor comprimate pe un RAID (și accesibile prin intermediul ERDDAP ) , apoi există un avantaj imens de a utiliza compresie, astfel încât utilizatorii să devină interactive și (relativ) acces rapid la date. Și dacă acest lucru vă poate salva de la achiziționarea unui RAID suplimentar, această caracteristică vă poate salva aproximativ 30.000 dolari.
     
* Pentru toţi EDDGrid Din subclasele Fişiere, dacă fişierele de date au o extensie care indică faptul că acestea sunt fişiere comprimate extern (în prezent: .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 , sau .Z) , ERDDAP™ va decomprima fișierele în directorul cache al setului de date atunci când le citește (în cazul în care nu sunt deja în cache) . Același lucru este valabil și pentru fișierul binar (de exemplu, .nc ) subclase de EDDtableFromFiles.
     
* Pentru subclase EDD TableFromFiles pentru fișiere non-binare (de exemplu, .csv.) , fișiere de date cu o extensie care indică faptul că acestea sunt fișiere comprimate extern vor fi decomprimate pe-the-fly ca fișierul este citit.
     
* REquirement: Dacă tipul de fișier comprimat extern utilizat (de exemplu, .tgz sau .zip ) suportă mai mult de 1 fișier în interiorul fișierului comprimat, fișierul comprimat trebuie să conțină doar 1 fișier.
     
* REquirement: Această caracteristică presupune că conținutul fișierelor comprimate externe nu se schimbă, astfel încât un fișier decomprimat cache să poată fi reutilizat. Dacă unele sau toate fişierele unui set de date sunt uneori schimbate, nu comprimaţi acele fişiere. Acest lucru este în concordanță cu utilizarea comună, deoarece oamenii nu compresează în mod normal fișiere pe care uneori trebuie să le schimbe.
     
*   &lt;fileNameRegex&gt; Pentru a face acest lucru, setul de date&lt;fileNameRegex&gt; trebuie să se potrivească cu numele fișierelor comprimate. Evident, regexuri ca.\\*va potrivi toate numele fișierelor. Dacă specificați un anumit tip de fișier, de exemplu, .\\*\\\ .nc , apoi aveți nevoie pentru a modifica regex pentru a include extensia de compresie prea, de exemplu, .\\ *\\\ .nc \\\ .gz (dacă toate fișierele vor fi* ceva * .nc  .gz fișiere) .
     
* Este în regulă dacă setul de date include un amestec de fișiere comprimate și nu comprimate. Acest lucru poate fi util dacă credeți că unele fișiere (De exemplu, fișiere mai vechi) va fi folosit mai rar și, prin urmare, ar fi util pentru a salva spațiu pe disc prin comprimarea lor. Pentru a face acest lucru,&lt;fileNameRegex&gt; trebuie să se potrivească cu numele fișierelor comprimate și nu comprimate, de exemplu.\\*sau .\\*\\\ .nc  ( | \\\ .gz ) (în cazul în care grupul de capturare de la sfârșitul anului care precizează că .gz este opțional.
     
* Este bine dacă comprimați sau decomprimați fișiere specifice din colecție în orice moment.
Dacă setul de date nu utilizează [&lt;updateEveryNMillis&gt;] (#Update everythingnmillis) , setează setul de date [pavilion](/docs/server-admin/additional-information#flag) pentru a spune ERDDAP™ să reîncarce setul de date și, astfel, să observe modificările. Interesant, ai putea folosi algoritmi de compresie diferite și setări pentru diferite fișiere în același set de date (de exemplu, .bz2 pentru fișiere rare utilizate, .gz pentru fișiere care nu sunt adesea utilizate și nicio compresie pentru fișiere utilizate frecvent) , doar asigurați-vă că regex sprijină toate extensiile de fișier care sunt în uz, de exemplu, .\\*\\\ .nc  ( | \\\ .gz  | \\\ .bz2 ) .
     
* Desigur, raportul de compresie și vitezele pentru diferiți algoritmi de compresie variază cu fișierul sursă și setările (De exemplu, nivelul de compresie) . Dacă doriți să optimizați acest sistem pentru fișierele dvs., faceți un test al diferitelor metode de compresie cu fișierele dvs. și cu o gamă de setări de compresie. Dacă vrei un bun de încredere (nu neapărat cel mai bun) configurare, vom recomanda ușor gzip   ( .gz ) . gzip nu face cel mai mic fișier comprimat (E destul de aproape.) , dar comprimă fișierul foarte repede și (mai important pentru ERDDAP™ utilizatori) Decompresează fişierul foarte repede. În plus, gzip software-ul vine standard cu fiecare instalare Linux și Mac OS și este disponibil pentru Windows prin instrumente gratuite, cum ar fi 7Zip și Linux add-ons ca Git Bash. De exemplu, pentru a comprima un fișier sursă în .gz versiunea fișierului (același nume de fișier, dar cu .gz anexată) , utilizare (în Linux, Mac OS şi Git Bash)   
     gzip   * sourceName *   
Pentru a decomprima un .gz fișier înapoi la original, utilizați
Gunzip * sourceName  .gz *   
Pentru a comprima fiecare dintre fișierele sursă în director și subdirectoarele sale, recursiv, utilizați
     gzip -r *DirectorName*   
Pentru a decomprima fiecare dintre .gz fișiere în director și subdirectorii sale , recursiv, utilizare
Gunzip - r *DirectorName*   
     
* ATENŢIE: Nu comprimaţi extern ( gzip ) fișiere care sunt deja comprimate intern&#33;
Multe fișiere au deja date comprimate pe plan intern. Dacă gzip aceste fișiere, fișierele rezultate nu vor fi mult mai mici (&lt;5%) și ERDDAP™ va pierde timpul decomprimându-le atunci când trebuie să le citească. De exemplu:
    
    * fișiere de date: de exemplu, .nc 4, și .hdf 5 fișiere: Unele fișiere folosesc compresie internă; altele nu. Cum se spune: variabilele comprimate au atribute "\\_ChunkSize." De asemenea, dacă un grup de grilă .nc sau .hdf fișierele sunt de diferite dimensiuni, acestea sunt probabil comprimate intern. Dacă toate au aceeaşi mărime, nu sunt comprimate intern.
    * fișiere imagine: de exemplu, .gif, .jpg, și .png
    * fișiere audio: de exemplu, mp3, și .ogg.
    * fișiere video: de exemplu, mp4, .ogv, și .webm.
    
        
Un caz nefericit ciudat: .wav fișiere audio sunt imense și nu intern comprimat. Ar fi frumos să comprimăm ( gzip ) ele, dar în general nu ar trebui pentru că dacă o faci, utilizatorii nu vor putea să joace fișierele comprimate în browserul lor.
     
* Caz de încercare: compresie (cu gzip ) un set de date cu 1523 grile .nc Dosare.
    
    * Datele din fișierele sursă au fost rare (multe valori lipsă) .
    * Spațiu total disc a trecut de la 57 GB înainte de compresie la 7 GB după.
    * O cerere pentru o mulțime de date de la 1 punct de timp este&lt;1 s înainte și după compresie.
    * O cerere de 1 punct de date pentru 365 de puncte de timp (situația în cel mai rău caz) a trecut de la 4 s la 71 s.
         
    
Pentru mine, acesta este un compromis rezonabil pentru orice set de date și, cu siguranță, pentru seturile de date care sunt utilizate rar.
     
* Compresie internă versus externă...
Comparativ cu compresie de fișiere interne oferite de .nc 4 și .hdf 5 fișiere; ERDDAP Abordarea pentru fişierele binare comprimate externe are avantaje şi dezavantaje. Dezavantajul este: pentru o singură dată citit de o mică parte dintr-un singur fișier, compresie internă este mai bună deoarece EDDGrid FromFiles trebuie doar să decomprime câteva bucăți (s) al dosarului, nu al întregului dosar. Dar... ERDDAP Abordarea lui are unele avantaje:
    
    *    ERDDAP™ suportă compresia tuturor tipurilor de fișiere de date (binar și non-binar, de exemplu, .nc 3 și .csv) Nu doar .nc 4 și .hdf 4.
    * Dacă cea mai mare parte a unui fișier trebuie să fie citit de mai multe ori într-o perioadă scurtă de timp, atunci economisește timp pentru a decomprima fișierul o dată și citiți-l de multe ori. Acest lucru se întâmplă în ERDDAP™ atunci când un utilizator utilizează Make-A-Graph pentru setul de date și face o serie de mici modificări ale graficului.
    * Capacitatea de a avea fișiere comprimate și nu fișiere comprimate în aceeași colecție, vă permite mai mult control asupra căror fișiere sunt comprimate și care nu sunt. Și acest control adăugat vine fără a modifica cu adevărat fișierul sursă (din moment ce puteți comprima un fișier cu, de exemplu, .gz și apoi decomprimați-l pentru a obține fișierul original) .
    * Capacitatea de a modifica în orice moment dacă un anumit fișier este comprimat și modul în care este comprimat (algoritmi și setări diferite) vă oferă mai mult control asupra performanței sistemului. Și puteți recupera cu ușurință fișierul original necomprimat în orice moment.
    
Deși niciuna dintre abordări nu este un câștigător în toate situațiile, este clar că ERDDAP capacitatea de a servi date din fişiere externe comprimate face compresie externă o alternativă rezonabilă la compresia internă oferită de .nc 4 și .hdf 5. Acest lucru este semnificativ având în vedere că compresie internă este unul dintre principalele motive pentru care oamenii aleg să utilizeze .nc 4 și .hdf 5.
     
##### Cache decomprimat{#decompressed-cache} 
 ERDDAP™ face o versiune decomprimată a oricărui binar comprimat (de exemplu, .nc ) fișier de date atunci când trebuie să citească fișierul. Fișierele decomprimate sunt păstrate în dosarul setului de date din *Big ParentDirectory* /decomprimat/ . Fișierele decomprimate care nu au fost utilizate recent vor fi șterse pentru a elibera spațiul atunci când dimensiunea cumulativă a fișierului este &gt;10GB. Puteți schimba asta prin setarea&lt;decompressedCacheMaxGB&gt; (implicit=10) în seturi de date Xml. xml, de exemplu,
```
        <decompressedCacheMaxGB>40</decompressedCacheMaxGB>  
```
De asemenea, fișierele decomprimate care nu au fost utilizate în ultimele 15 minute vor fi șterse la începutul fiecărei reîncărcări majore a setului de date. Puteți schimba asta prin setarea&lt;Decomprimat CacheMaxMinutesOld&gt; (implicit=15) în seturi de date Xml. xml, de exemplu,
```
        <decompressedCacheMaxMinutesOld>60</decompressedCacheMaxMinutesOld>  
```
Numere mai mari sunt frumos, dar dimensiunea cumulativă a fișierelor decomprimate poate provoca *Big ParentDirectory* să rămână fără spațiu pe disc, ceea ce cauzează probleme grave.
     
* Deoarece decompresia unui fișier poate dura o cantitate semnificativă de timp (0.1 până la 10 secunde) , seturi de date cu fișiere comprimate pot beneficia de setarea setului de date [&lt;nThreads&gt;] (#Nămoluri) setarea la un număr mai mare (2? 3? 4?) . Dezavantajele la numere chiar mai mari (De exemplu, 5? 6? 7?) reduc veniturile și că cererea unui utilizator poate utiliza apoi un procent ridicat din resursele sistemului, încetinind astfel semnificativ procesarea cererilor altor utilizatori. Astfel, nu există setări ideale nThreads, doar consecințe diferite în diferite situații cu diferite setări.
         
#### Valori de dimensiune selectate{#sorted-dimension-values} 
Valorile pentru fiecare dimensiune trebuie sortate (ascendent sau descendent, cu excepția primei (cea mai stângă) dimensiune care trebuie să se ridice) . Valorile pot fi șterse neregulat. Nu poate fi nici o legătură. Aceasta este o cerinţă a [Standardul metadatelor CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) . Dacă valorile oricărei dimensiuni nu sunt în ordine sortate, setul de date nu va fi încărcat și ERDDAP™ va identifica prima valoare nesortate în fișierul jurnal; *Big ParentDirectory* /logs/log.txt.
    
Valorile de dimensiune nesortate indică aproape întotdeauna o problemă cu setul de date sursă. Acest lucru se întâmplă cel mai frecvent atunci când un fișier cu nume greșite sau nepotrivit este inclus în agregare, ceea ce duce la o dimensiune a timpului nesortate. Pentru a rezolva această problemă, consultați mesajul de eroare din ERDDAP™ log.txt fișier pentru a găsi valoarea de timp ofensatoare. Apoi căutați în fișierele sursă pentru a găsi fișierul corespunzător (sau una înainte sau una după) care nu aparține în agregare.
    
#### Directori{#directories} 
Fișierele pot fi într-un singur director, sau într-un director și subdirectoarele sale (recursiv) . Dacă există un număr mare de fișiere (de exemplu &gt; 1, 000) , sistemul de operare (şi astfel EDDGrid Din dosare) va funcționa mult mai eficient dacă stocați fișierele într-o serie de subdirecții (unul pe an sau unul pe lună pentru seturi de date cu fișiere foarte frecvente) , astfel încât nu există niciodată un număr mare de fișiere într-un director dat.
     
#### &lt;CacheFromUrl&gt;{#cachefromurl} 
Toate EDDGrid Din Dosare și toate seturile de date EDDFromFiles susțin un set de etichete care indică ERDDAP™ pentru a descărca și menține o copie a tuturor fișierelor unui set de date la distanță, sau un depozit de câteva fișiere (descărcat după cum este necesar) . Acest lucru poate fi incredibil de util. Vezi [cache Din documentația Url](#cachefromurl) .
    
#### Directore la distanţă şi cereri la distanţă HTTP{#remote-directories-and-http-range-requests} 
 (AKA Byte Serving, Octet Range Applications, Accept-Ranges http antet)   
 EDDGrid DinNcFiles, EDDTableFromMultidimNcFiles, EDD TableFromNcFiles, și EDDTableFromNcFFiles, pot *uneori* să servească date din .nc fișiere pe servere la distanță și accesate prin HTTP dacă serverul suportă [Servire octet](https://en.wikipedia.org/wiki/Byte_serving) prin cereri din domeniul HTTP (mecanismul HTTP pentru servirea octetului) . Acest lucru este posibil deoarece netcdf-java (care ERDDAP™ folosește pentru a citi .nc fișiere) suportă citirea datelor de la distanță .nc fișiere prin cereri de gamă HTTP.

 **Nu face asta&#33;** Este oribil de ineficient și lent.
În schimb, utilizați [&lt;cacheFromUrl&gt; sistem] (#cachefromurl) .

Accesare ERDDAP™ Seturile de date ca fișiere prin cereri de intervale de octeți -
Flipping acest lucru în jurul valorii de, având în vedere că puteți (în teorie) Gândiți-vă la un set de date în ERDDAP™ ca un gigant .nc fișier prin adăugare " .nc " la baza OPen DAP URL pentru un set de date dat (de exemplu,https://myserver.org/erddap/griddap/datasetID.ncși, de asemenea, prin adăugarea unui ?query după aceea pentru a specifica un subset) , este probabil rezonabil să întreb dacă puteți utiliza netcdf-java , Ferret , sau alte NetCDF software client pentru a citi datele prin intermediul Solicitări pentru intervalul HTTP ERDDAP . Răspunsul este nu, pentru că nu există într-adevăr un imens " .nc " dosar. Dacă doriți să faceți acest lucru, faceți în schimb una dintre aceste opțiuni:

* Utilizare(OPeN)DAPsoftware client pentru a se conecta la serviciile Griddap oferite de ERDDAP . Asta este ceea ce DAP   (şi astfel ERDDAP ) a fost proiectat pentru. Este foarte eficient.
* Sau, descărcați fișierul sursă (s) de la "files" sistem (sau un fișier subset prin intermediul a .nc ? interogare) la computer și de a utiliza netcdf-java, Ferret , sau alte NetCDF software client pentru a citi (Acum) fișier local (s) .
         
#### Informații despre fișier cached{#cached-file-information} 
Când EDDGrid Setul de fișiere este primul încărcat, EDDGrid FromFiles citește informații din toate fișierele relevante și creează tabele (un rând pentru fiecare fișier) cu informații despre fiecare fișier valabil și fiecare "rău" (diferită sau invalidă) Dosar.
* Tabelele sunt, de asemenea, stocate pe disc, ca NetCDF v3 .nc fișiere în *Big ParentDirectory* /Set de date/ *Ultima 2CharsOfDatasetID* / * datasetID * / în fișiere numite:
dirtable .nc   (care deţine o listă cu nume de directoare unice) ,
fișier Tabel .nc   (care conține tabelul cu informațiile fiecărui fișier valabil) ,
Dosare rele .nc   (care deține tabelul cu informațiile fiecărui fișier rău) .
* Pentru a accelera accesul la un EDDGrid Set de fișiere (dar în detrimentul utilizării mai multor amintiri) , puteți folosi [&lt;Tabel fișier în memorie &gt; adevărat&lt;/FiletableInMemory&gt;] (#Filetableinmemory) pentru a spune ERDDAP™ pentru a păstra o copie a tabelelor de informații fișiere în memorie.
* Copia tabelelor de informații fișiere pe disc este, de asemenea, utilă atunci când ERDDAP™ este închis și repornit: salvează EDDGrid De la Dosare de la necesitatea de a reciti toate fișierele de date.
* Atunci când un set de date este reîncărcat, ERDDAP™ trebuie doar să citească datele din fișiere și fișiere noi care s-au schimbat.
* Dacă un fișier are o structură diferită de celelalte fișiere (de exemplu, un tip de date diferit pentru una dintre variabile sau o valoare diferită pentru " [unități](#units) " atribut) , ERDDAP adaugă fișierul la lista de fișiere "rele." Informații despre problema cu fișierul va fi scris la *Big ParentDirectory* /logs/log.txt file.
* Nu ar trebui niciodată să ștergeți sau să lucrați cu aceste fișiere. O excepție este: dacă sunteți încă face modificări la un set de date datasets.xml configurare, ați putea dori să ștergeți aceste fișiere pentru a forța ERDDAP™ pentru a reciti toate fișierele, deoarece fișierele vor fi citite/interpretate diferit. Dacă vreodată trebuie să ștergeți aceste fișiere, o puteți face atunci când ERDDAP™ Fuge. (Apoi setați un [pavilion](/docs/server-admin/additional-information#set-dataset-flag) pentru a reîncărca setul de date cât mai curând posibil.) Cu toate acestea, ERDDAP™ de obicei observă că datasets.xml informațiile nu se potrivesc cu fișierul Informații de masă și șterge automat tabelele de fișiere.
* Dacă doriți să încurajați ERDDAP™ actualizarea informațiilor privind seturile de date stocate (de exemplu, dacă ați adăugat, eliminat sau ați schimbat unele fișiere în dosarul de date al setului de date) , utilizaţi [Sistemul de pavilion](/docs/server-admin/additional-information#flag) să forţeze ERDDAP™ pentru a actualiza informațiile din fișierul cached.
         
#### Cereri de manipulare{#handling-requests} 
Atunci când cererea de date a unui client este procesată, EDDGrid FromFiles poate privi rapid în tabel cu informațiile valide de fișier pentru a vedea ce fișiere au datele solicitate.
     
#### Actualizarea informațiilor din fișierul Cached{#updating-the-cached-file-information} 
Ori de câte ori setul de date este reîncărcat, informațiile din fișier cache sunt actualizate.
    
* Setul de date este reîncărcat periodic, astfel cum este determinat de&lt;reîncărcareEveryNMinutes&gt; în informațiile setului de date în datasets.xml .
* Setul de date este reîncărcat cât mai curând posibil ori de câte ori ERDDAP™ detectează că ați adăugat, eliminat, [Touch'd](https://en.wikipedia.org/wiki/Touch_(Unix) ) (pentru a schimba ultimul fișier Timp modificat) Sau a schimbat un fişier de date.
* Setul de date este reîncărcat cât mai curând posibil dacă utilizaţi [Sistemul de pavilion](/docs/server-admin/additional-information#flag) .

Atunci când setul de date este reîncărcat, ERDDAP™ compară fișierele disponibile în prezent cu tabelele de informații despre fișiere cache. Fişierele noi sunt citite şi adăugate la tabelul de fişiere valide. Fișierele care nu mai există sunt retrase din tabelul de fișiere valide. Fișierele în care marca temporală a fișierului a fost modificată sunt citite și informațiile lor sunt actualizate. Noile tabele înlocuiesc mesele vechi din memorie și pe disc.
     
#### Fișiere proaste{#bad-files} 
Tabelul de fișiere rele și motivele pentru care fișierele au fost declarate rele (fișier corupt, variabile lipsă etc.) este trimis prin e-mail Totul Adresa de email (Probabil tu.) de fiecare dată când setul de date este reîncărcat. Ar trebui să înlocuiți sau să reparați aceste fișiere cât mai curând posibil.
     
#### Variabile lipsă{#missing-variables} 
Dacă unele dintre dosare nu au unele dintre dataVariable s definite în setul de date datasets.xml Chunk, e în regulă. Când EDDGrid FromFiles citește unul dintre acele fișiere, se va acționa ca și cum fișierul ar avea variabila, dar cu toate valorile lipsă.
     
#### Probleme FTP/Advice{#ftp-troubleadvice} 
Dacă FTP fișiere de date noi la ERDDAP™ server în timp ce ERDDAP™ se execută, există posibilitatea ca ERDDAP™ va reîncărca setul de date în timpul procesului FTP. Se întâmplă mai des decât crezi&#33; Dacă se întâmplă, fișierul va părea a fi valid (are un nume valabil) Dar dosarul nu e încă valabil. Dacă ERDDAP™ încearcă să citească date din acel fișier invalid, eroarea rezultată va determina adăugarea fișierului în tabelul fișierelor invalide. Asta nu e bine. Pentru a evita această problemă, utilizați un nume de fișier temporar atunci când FTP'ing fișierul, de exemplu, ABC2005 .nc \\_TEMP. Apoi, testul de fișierNameRegex (vezi mai jos) va indica faptul că acesta nu este un fișier relevant. După finalizarea procesului FTP, redenumește fișierul pe numele corect. Procesul de redenumit va face ca fișierul să devină relevant într-o clipă.
     
#### "0 fișiere" Mesaj eroare{#0-files-error-message-1} 
Dacă fugi [GenereazăSeturi de dateXml](#generatedatasetsxml) sau [DasDds](#dasdds) , sau dacă încercați să încărcați un EDDGrid De la... Set de fișiere în ERDDAP™ , și veți obține un mesaj de eroare "0 fișiere" indicând faptul că ERDDAP™ găsit 0 fișiere de potrivire în dosar (atunci când crezi că există fișiere de potrivire în acel director) :
    * Verificați dacă fișierele sunt într-adevăr în acel director.
    * Verifică ortografia numelui directorului.
    * Verificați fișierulNameRegex. E foarte uşor să faci greşeli cu regexurile. Pentru teste, încercați regex .\\* care ar trebui să se potrivească cu toate numele de fișiere. (Vezi asta? [documentația regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) şi [tutorial regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) 
    * Verificați dacă utilizatorul care rulează programul (de exemplu, utilizator=tomcat (?) pentru Tomcat/ ERDDAP ) are permisiunea "citeste" pentru acele fisiere.
    * În unele sisteme de operare (de exemplu, SELinux) și în funcție de setările de sistem, utilizatorul care a rulat programul trebuie să aibă permisiune "citește" pentru întregul lanț de directoare care duce la directorul care are fișierele.
         
####  EDDGrid Dinfile schelete XML{#eddgridfromfiles-skeleton-xml} 
*    **Name** pentru toţi EDDGrid Subclasele FromFiles este:

>&nbsp;&nbsp;&lt;dataset type="EDDGridFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromFiles subclasses, this uses Java's WatchDirectory system   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file names, for example, ".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadata from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDD*FromAudioFiles{#eddfromaudiofiles} 
 ** EDDGrid De la AudioFiles** şi **Tabel EDD din fișiere audio** date agregate dintr-o colecție de fișiere audio locale. (Acestea au apărut pentru prima dată în ERDDAP™ v1.82.) Diferenţa este că EDDGrid De la AudioFiles tratează datele ca pe un set de date multidimensionale (de obicei cu 2 dimensiuni: \\[ pornire fișier Timp \\] şi \\[ A expirat Timp într-un fișier \\] ) În timp ce tabelul EDDFromAudioFiles tratează datele ca date tabulare (de obicei cu coloane pentru pornirea fișierului Timpul scurs cu fișierul și datele de la canalele audio) . EDDGrid De la AudioFiles cere ca toate fișierele să aibă același număr de eșantioane, așa că dacă acest lucru nu este adevărat, trebuie să utilizați EDDtableFromAudioFiles. Altfel, alegerea tipului de EDD de utilizat este în întregime alegerea ta. Un avantaj al EDD TableFromAudioFiles: puteți adăuga alte variabile cu alte informații, de exemplu, stationID , StationType. În ambele cazuri, lipsa unei variabile unificate a timpului face mai dificilă colaborarea cu datele de la aceste tipuri de TED, însă nu există o modalitate bună de a crea o variabilă a timpului unificată.

Vezi aceste superclase, [ EDDGrid Din dosare](#eddgridfromfiles) şi [Tabel EDD din dosare](#eddtablefromfiles) , pentru informaţii generale despre cum funcţionează această clasă şi cum să o folosească.

Vă recomandăm cu tărie utilizarea [Generează dateName Programul Xml](#generatedatasetsxml) să facă un proiect dur al datasets.xml bucată pentru acest set de date. Deoarece fişierele audio nu au alte metadate decât informaţii legate de codificarea datelor de sunet, va trebui să editaţi ieşirea din GenerateDatasets Xml pentru a furniza informații esențiale (de exemplu, titlu, rezumat; creator\\_name , instituţie, istorie) .

Detalii:

* Există un număr mare de formate de fișiere audio. În prezent, ERDDAP™ poate citi date din majoritatea fișierelor .wav și .au. În prezent nu poate citi alte tipuri de fișiere audio, de exemplu, .aiff sau .mp3. Dacă aveți nevoie de suport pentru alte formate de fișiere audio sau alte variante de .wav și .au, vă rugăm să trimiteți cererea dvs. la Chris. John la Noaa.gov. Sau, ca un workaround puteți utiliza chiar acum, puteți converti fișierele audio în PCM\\_ Semnat (pentru date întregi) sau PCM\\_FLOAT (pentru date privind punctele plutitoare) .wav fișiere astfel încât ERDDAP™ pot lucra cu ei.
* În prezent, ERDDAP™ poate citi fișiere audio cu ce Java 's AudioFormat class calls PCM\\_FLOAT, PCM\\_signed, PCM\\_UNSIGNED, ALAW și ULAW codes. ERDDAP™ convertește valorile PCM\\_UNIGNED (de exemplu, între 0 și 255) în valori semnate (de exemplu, -128 - 128) prin rearanjarea biților din valorile datelor. ERDDAP™ convertește ALAW și ULAW codificate din formatul lor nativ codificat pe scurt (int16) valori. De când Java vrea date adevărate, ERDDAP™ rearanjează octeții datelor stocate cu bigEndian=fals (puțin endian) pentru a citi corect valorile. Pentru toate celelalte codări (PCM) , ERDDAP™ citeste datele asa cum este.
* Când ERDDAP™ citește date din fișiere audio, convertește metadatele audio disponibile ale fișierului în atribute globale. Acest lucru va include întotdeauna (cu valorile eșantionului prezentate) 
    
Siring audioBigEndian "fals"; / True sau fals
audio int Canalele 1;
audioEncoding string "PCM\\_SIGNED";
Float audioFrameRate 9600.0; / pe secundă
int audioFrameSize 2; //# of data bytes per frame
weather forecast
int audioSampleSizeInBits 16; // # de biți pe canal pe eșantion
    
Pentru ERDDAP "Scopurile, un cadru este sinonim cu un eșantion, care este datele pentru un punct în timp.
Atribuțiile în ERDDAP™ va avea informațiile care descriu datele așa cum au fost în fișierele sursă. ERDDAP™ va fi adesea schimbat acest lucru în timp ce citiți datele, de exemplu, PCM\\_UNSIGNED, ALAW, și ULAW datele codificate sunt convertite în PCM\\_SIGNED, și bigEndian= date false este convertit la bigEndian= date reale (care este modul în care Java vrea s-o citească.) . În final, valorile datelor în ERDDAP™ va fi întotdeauna [PCM codificat](https://en.wikipedia.org/wiki/Pulse-code_modulation) valorile datelor (Adică, eșantioane simple digitalizate ale undei sonore) .
* Când ERDDAP™ citeste date din fisiere audio, citeste intregul fisier. ERDDAP™ pot citi aproape 2 miliarde de mostre pe canal. De exemplu, dacă rata de eșantionare este de 44,100 de eșantioane pe secundă, 2 miliarde de eșantioane se traduce la aproximativ 756 de minute de date sonore per fișier. Dacă aveți fișiere audio cu mai mult decât această cantitate de date, aveți nevoie pentru a rupe fișierele în bucăți mai mici, astfel încât ERDDAP™ Le pot citi.
* Pentru că ERDDAP™ citește fișiere audio întregi, ERDDAP™ trebuie să aibă acces la o cantitate mare de memorie pentru a lucra cu fișiere audio mari. Vezi? [ ERDDAP setările memoriei](/docs/server-admin/deploy-install#memory) . Din nou, dacă aceasta este o problemă, un lucru în jurul pe care le puteți folosi chiar acum este de a sparge fișierele în bucăți mai mici, astfel încât ERDDAP™ le pot citi cu mai puţină memorie.
* Unele fișiere audio au fost scrise incorect. ERDDAP™ face un mic efort pentru a rezolva astfel de cazuri. Dar, în general, atunci când există o eroare, ERDDAP™ va arunca o excepție (și respinge acest fișier) sau (dacă eroarea este nedetectabilă) citeste datele (dar datele vor fi incorecte) .
*    ERDDAP™ nu verifică sau modifică volumul sunetului. În mod ideal, datele audio întregi sunt scalate pentru a utiliza întreaga gamă a tipului de date.
* Fișiere audio și playere audio nu au nici un sistem pentru valorile lipsă (De exemplu, -999 sau Float.NaNaN) . Deci datele audio nu ar trebui să aibă valori lipsă. Dacă există valori lipsă (de exemplu, dacă aveți nevoie pentru a prelungi un fișier audio) , utilizați o serie de 0 care va fi interpretată ca tăcere perfectă.
* Când ERDDAP™ citeste date din fisiere audio, intotdeauna creeaza o coloana numita expirata Timpul pentru fiecare probă, în secunde (stocate ca duble) , în raport cu primul eșantion (care este atribuit expirat Timp = 0,0 s) . Cu EDDGrid De la AudioFiles, aceasta devine variabila axei timp scurs.
*    EDDGrid Din AudioFiles se cere ca toate fișierele să aibă același număr de eșantioane. Deci, dacă acest lucru nu este adevărat, trebuie să utilizați EDDtableFromAudioFiles.
* Pentru EDDGrid De la AudioFiles, vă recomandăm să setați [&lt;dimensionValuesInMemory&gt;] (#dimensiuni valori în memorie) la fals (așa cum este recomandat de GenerateDatasets Xml) , deoarece dimensiunea timpului are adesea un număr imens de valori.
* Pentru EDDGrid De la AudioFiles, ar trebui să utilizați aproape întotdeauna EDDGrid Sistem de fișiere pentru [Agregare prin Nume fișiere](#aggregation-via-file-names-or-global-metadata) , aproape întotdeauna prin extragerea data de începere a înregistrării Timpul de la fişiere. De exemplu,
```
    <sourceName>\\*\\*\\*fileName,"timeFormat=yyyyMMdd'\\_'HHmmss",aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Generează dateName Xml va încuraja acest lucru și vă va ajuta cu acest lucru.
* Pentru tabelul EDDFromAudioFiles, ar trebui să utilizați aproape întotdeauna tabelul EDDFromFiles sistem pentru [\\*\\*\\*FileName pseudo sourceName s](#filename-sourcenames) pentru a extrage informații din numele fișierului (aproape întotdeauna data de începere Timpul pentru înregistrare) și să o promoveze ca fiind o coloană de date. De exemplu,
```
    <sourceName>\\*\\*\\*fileName,aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Formatul timpului ar trebui să fie specificat ca atribut al unităților:&lt;Att name="tootyyymdd"\\_'Hhmmss&lt;/att&gt;
     
###  EDDGrid De la MergeIRFiles{#eddgridfrommergeirfiles} 
 [ ** EDDGrid De la MergeIRFiles** ](#eddgridfrommergeirfiles) date agregate de la nivel local; [CombeIR](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README) fișiere, care sunt de la [Misiunea de măsurare a ploii tropicale (TRMM) ](https://trmm.gsfc.nasa.gov) , care este o misiune comună între NASA și Agenția Japoneză de Explorare Aerospațială (JAXA) . Combină Fișierele IR pot fi descărcate de la [NASA](ftp://disc2.nascom.nasa.gov/data/s4pa/TRMM_ANCILLARY/MERG/) .

 EDDGrid De la MergeIRFiles.java a fost scris și a contribuit la ERDDAP™ proiect de Jonathan Lafite și Philippe Makowski de la R.Tech Engineering (licență: open source cu drepturi de autor) .

 EDDGrid Din MergeIRFiles este un pic neobișnuit:

*    EDDGrid FromMergeIRFiles suportă fișiere de date sursă comprimate sau necomprimate, în orice combinație, în același set de date. Acest lucru vă permite, de exemplu, să comprimați fișiere mai vechi care sunt rareori accesate, dar să decomprimați fișiere noi care sunt adesea accesate. Sau, puteți schimba tipul de compresie de la original. Z la, de exemplu, .gz .
* Dacă aveți versiuni comprimate și necomprimate ale acelorași fișiere de date în același director, vă rugăm să vă asigurați că&lt;fileNameRegex&gt; pentru setul de date se potrivește cu numele fișierelor pe care doriți să le potriviți și nu se potrivește cu numele fișierelor pe care nu doriți să le potriviți.
* Fișierele de date sursă necomprimate nu trebuie să aibă extensie de fișier (Adică nu "." în numele fișierului) .
* Fișierele de date sursă comprimate trebuie să aibă o extensie a fișierului, dar ERDDAP™ determină tipul de compresie prin verificarea conținutului fișierului, nu prin examinarea extensiei fișierului (De exemplu, ".Z") . Tipurile de compresie acceptate includ "gz," "bzip2," "xz," "lzma," "snappy-raw," "snappy-framed," "pack200" și "z." Când ERDDAP™ citeste fisiere comprimate, se descompune pe zbor, fara a scrie intr-un fisier temporar.
* Toate fișierele de date sursă trebuie să utilizeze sistemul original de denumire a fișierului: adică, merc\\_ *AAAAMMDDH* \\_4km-pixel (unde *AAAAMMDDH* indică timpul asociat cu datele din fișier) , plus o extensie a fișierului dacă fișierul este comprimat.

Vezi această clasă super clasă, [ EDDGrid Din dosare](#eddgridfromfiles) , pentru informaţii generale despre cum funcţionează această clasă şi cum să o folosească.

Vă recomandăm cu tărie utilizarea [Generează dateName Programul Xml](#generatedatasetsxml) să facă un proiect dur al datasets.xml bucată pentru acest set de date. Puteți apoi edita asta pentru a-l acorda fin.
 
###  EDDGrid DinNcFiles{#eddgridfromncfiles} 
 [ ** EDDGrid DinNcFiles** ](#eddgridfromncfiles) date agregate de la nivel local, regrupate; [GRIB.grb și .grb2](https://en.wikipedia.org/wiki/GRIB) fișiere; [ HDF   (v4 sau v5)   .hdf ](https://www.hdfgroup.org/) fișiere; [ .nc ml](#ncml-files) fișiere; [ NetCDF   (v3 sau v4)   .nc ](https://www.unidata.ucar.edu/software/netcdf/) fișiere și [Zarr](https://github.com/zarr-developers/zarr-python) fișiere (din versiunea 2.25) . Fișierele Zarr au un comportament ușor diferit și necesită fie fișierulNameRegex, fie caleaRegex pentru a include "zarr."

Nou în ERDDAP™ versiunea 2.29.0 este suport experimental pentru variabilele de date care nu suportă toate variabilele axei (sau după cum unii au numit-o date 1D și 2D în același set de date) . Vă rugăm să ajungeţi la GitHub (discuții sau probleme) cu feedback și bug-uri.

Acest lucru poate funcționa cu alte tipuri de fișiere (de exemplu, BUFR) Nu l-am testat. Vă rugăm să ne trimiteţi nişte dosare.

* Pentru fișierele GRIB, ERDDAP™ va face un fișier index .gbx prima dată când citește fiecare fișier GRIB. Deci, fișierele GRIB trebuie să fie într-un director în cazul în care "utilizator" care a fugit Tomcat a citit + scrie permisiunea.
* Vezi această clasă super clasă, [ EDDGrid Din dosare](#eddgridfromfiles) , pentru informații privind modul în care funcționează această clasă și cum să-l folosească.
* Începând cu ERDDAP™ v2.12; EDDGrid De laNcFiles și EDDGrid DinNcFiles Despachetat poate citi date din "structuri" in .nc 4 și .hdf 4 dosare. Pentru a identifica o variabilă dintr-o structură,&lt; sourceName &gt; trebuie să utilizeze formatul: *completStructureName*  |  *nume membru* , de exemplu grupul1/myStruct | Membrul meu.
* Vă recomandăm cu tărie utilizarea [Generează dateName Programul Xml](#generatedatasetsxml) să facă un proiect dur al datasets.xml bucată pentru acest set de date. Puteți apoi edita asta pentru a-l acorda fin.
    
#### Grupuri în fișiere NC grid{#groups-in-gridded-nc-files} 
     [Fișierele Netcdf4 pot conține grupuri.](#groups-in-gridded-nc-files)   ERDDAP™ face doar un set de date din variabilele dintr-un singur grup și toate grupurile sale-mamă. Puteți specifica un nume de grup specific în GenerateDatasets Xml (Omiteţi tăietura de urmărire) , sau utilizaţi "" pentru a avea GenerateDatasets Xml căutați toate grupurile pentru variabilele care utilizează cele mai multe dimensiuni, sau de a folosi " \\[ rădăcină \\] "pentru a avea GenerateDatasets doar uita-te pentru variabile în grupul rădăcină.
    
Primul lucru pe care GenerateDatasetsXml îl face pentru acest tip de set de date după ce răspundeți la întrebări este să imprimați structura ncdump-like a fișierului eșantion. Deci, dacă introduceți câteva răspunsuri prostesc pentru prima buclă prin GenerateDatesets Xml, cel puţin vei putea vedea dacă ERDDAP™ poate citi fișierul și a vedea ce dimensiuni și variabile sunt în fișier. Apoi, puteți da răspunsuri mai bune pentru a doua buclă prin GenerateDatasetsXml.
    

###  EDDGrid De la NCFilesDespachetat{#eddgridfromncfilesunpacked} 
 [ ** EDDGrid De la NCFilesDespachetat** ](#eddgridfromncfilesunpacked) este o variantă de [ EDDGrid DinNcFiles](#eddgridfromncfiles) care agregate de date de la locale, grilate NetCDF   (v3 sau v4)   .nc și fișierele aferente. Diferenţa este că această clasă despachetează fiecare fişier de date înainte EDDGrid FromFiles se uită la fișiere:

* Acesta despachetează variabile care sunt ambalate cu [ scale\\_factor și/sau add\\_offset ](#scale_factor) .
* Se convertește \\_FillValue și missing\\_value valorile care urmează să fie ale NaN (sau MAX\\_VADIU pentru tipuri de date întregi) .
* Conversia valorilor timpului şi timpului în "seconds since 1970-01-01T00:00:00Z" .

Marele avantaj al acestei clase este că oferă o modalitate de a face față diferitelor valori ale scale\\_factor , add\\_offset , \\_FillValue, missing\\_value , sau unități de timp în diferite fișiere sursă într-o colecție. În caz contrar, ar trebui să utilizați un instrument ca [NcML](#ncml-files) sau [ NCO ](#netcdf-operators-nco) pentru a modifica fiecare fișier pentru a elimina diferențele astfel încât fișierele să poată fi manipulate de EDDGrid De la NCFiles. Pentru ca această clasă să funcționeze corect, fișierele trebuie să respecte standardele CF pentru atributele aferente.

* Dacă încercaţi să faceţi o EDDGrid DinNcFiles Despachetat dintr-un grup de fișiere cu care ați încercat anterior și nu ați reușit să utilizați EDDGrid De laNcFiles, cd la
     *Big ParentDirectory* /Set de date/ *ultima2Scrisoare* / * datasetID * /
unde *ultima2Scrisoare* este ultimele 2 litere ale datasetID ,
și șterge toate fișierele din acel director.
* Începând cu ERDDAP™ v2.12; EDDGrid De laNcFiles și EDDGrid DinNcFiles Despachetat poate citi date din "structuri" in .nc 4 și .hdf 4 dosare. Pentru a identifica o variabilă dintr-o structură,&lt; sourceName &gt; trebuie să utilizeze formatul: *completStructureName*  |  *nume membru* , de exemplu grupul1/myStruct | Membrul meu.
* Vă recomandăm cu tărie utilizarea [Generează dateName Programul Xml](#generatedatasetsxml) să facă un proiect dur al datasets.xml bucată pentru acest set de date. Puteți apoi edita asta pentru a-l acorda fin.
    
Fișierele Netcdf4 pot conține grupuri. Vezi? [Această documentație](#groups-in-gridded-nc-files) .
    
Primul lucru GenerateDateSetsXml face pentru acest tip de set de date după ce răspundeți la întrebări este imprimarea structurii ncdump-like a fișierului eșantion **înainte** Este despachetat. Deci, dacă introduceți câteva răspunsuri prostesc pentru prima buclă prin GenerateDatesets Xml, cel puţin vei putea vedea dacă ERDDAP™ poate citi fișierul și a vedea ce dimensiuni și variabile sunt în fișier. Apoi, puteți da răspunsuri mai bune pentru a doua buclă prin GenerateDatasetsXml.
    
###  EDDGrid LonPM180{#eddgridlonpm180} 
 [ ** EDDGrid LonPM180** ](#eddgridlonpm180) modifică valorile de longitudine ale unui copil (închis)   EDDGrid Set de date care are valori de longitudine mai mari de 180 (de exemplu, de la 0 la 360) astfel încât acestea sunt în intervalul -180 la 180 (Longitudine Plus sau Minus 180, prin urmare numele) .

* Acest lucru oferă o modalitate de a realiza seturi de date care au valori de longitudine mai mari de 180 conforme în/cu OGC servicii (de exemplu WMS server în ERDDAP ) , din moment ce toate OGC serviciile necesită valori de longitudine cuprinse între -180 și 180.
* Lucrul în apropierea unei discontinuităţi cauzează probleme, indiferent dacă discontinuitatea este la longitudine 0 sau la longitudine 180. Acest tip de set de date vă permite să evitați aceste probleme pentru toată lumea, oferind două versiuni ale aceluiași set de date:
unul cu valori de longitudine în intervalul 0 - 360 ("Pacificcentric"?) ,
una cu valori de longitudine în intervalul 180 - 180 ("Atlanticatic"?) .
* Pentru seturile de date pentru copii cu toate valorile longitudinei mai mari de 180, toate valorile noii longitudine sunt cu 360 de grade mai mici. De exemplu, un set de date cu valori de longitudine cuprinse între 180 și 240 ar deveni un set de date cu valori de longitudine cuprinse între -180 și -120.
* Pentru seturi de date pentru copii care au valori de longitudine pentru întregul glob (de la aproximativ 0 la 360) , noua valoare longitudine va fi rearanjat pentru a fi (aproximativ) - 180 la 180:
Valorile originale de la 0 la aproape 180 sunt neschimbate.
Valorile originale 180 la 360 sunt convertite la -180 la 0 și mutate la începutul matricei de longitudine.
* Pentru seturile de date pentru copii care se întind pe 180 dar nu acoperă globul, ERDDAP™ introduce valori lipsă, după caz, pentru a face un set de date care acoperă globul. De exemplu, un set de date pentru copii cu valori de longitudine de 140-200 ar deveni un set de date cu valori de -180-180.
Valorile copilului de la 180 la 200 ar deveni -180 la -160.
Se introduc noi valori ale longitudinii de la -160 la 140. Valorile corespunzătoare ale datelor vor fi \\_FillValues.
Valorile copilului de la 140 la aproape 180 ar fi neschimbate.
Introducerea valorilor lipsă poate părea ciudată, dar evită mai multe probleme care rezultă de la valori de longitudine care salt brusc (de exemplu, de la -160 la 140) .
* În [GenereazăSeturi de dateXml](#generatedatasetsxml) , există un "tip de set de date" special, EDDGrid LonPM180FromErddapCatalog, care vă permite să generaţi datasets.xml pentru EDDGrid Set de date LonPM180 din fiecare EDDGrid Seturi de date într-un ERDDAP care au valori de longitudine mai mari de 180. Acest lucru facilitează oferirea a două versiuni ale acestor seturi de date:
originalul, cu valori de longitudine cuprinse între 0 și 360;
și noul set de date, cu valori de longitudine cuprinse între 180 și 180.
    
Setul de date pentru copii din fiecare EDDGrid Setul de date LonPM180 va fi un EDDGrid Din setul de date Erddap care indică setul de date original.
Noul set de date datasetID va fi numele setului de date original plus "\\_LonPM180."
De exemplu,
```
    <dataset type="EDDGridLonPM180" datasetID="erdMBsstdmday\\_LonPM180" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_LonPM180Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=120.0 maxLon=320.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Pune EDDGrid Set de date LonPM180 **jos** Setul de date original în datasets.xml . Asta evită unele probleme posibile.
    
Alternativ, puteți înlocui EDDGrid Set de date pentru copii din Erddap cu setul de date original datasets.xml . Apoi, va exista o singură versiune a setului de date: cea cu valori de longitudine cuprinse între -180 și 180. Te descurajăm pentru că există momente când fiecare versiune a setului de date este mai convenabilă.
    
* Dacă oferiți două versiuni ale unui set de date, de exemplu, una cu longitudine 0 - 360 și una cu longitudine -180 - 180:
    * Puteți utiliza opțional [&lt;accesibil Via WMS &gt; Fals&lt;/accesibil Via WMS &gt;] (#accessibleviawms) cu setul de date 0-360 pentru a dezactiva forțat WMS servicii pentru acel set de date. Apoi, numai versiunea LonPM180 a setului de date va fi accesibilă prin intermediul WMS .
    * Există câteva modalități de a menține la zi setul de date LonPM180 cu modificări ale setului de date suport:
        * Dacă setul de date pentru copii este a EDDGrid Din setul de date Erddap care face trimitere la un set de date din același set de date ERDDAP™ , setul de date LonPM180 va încerca să subscrie direct la setul de date suport, astfel încât acesta să fie întotdeauna actualizat. Abonamentele directe nu generează e-mailuri care vă cer să validați abonamentul - validarea trebuie să se facă automat.
        * Dacă setul de date pentru copii nu este un EDDGrid Set de date din Erddap care este pe aceeași ERDDAP™ , Setul de date LonPM180 va încerca să utilizeze sistemul de subscriere regulat pentru a subscrie la setul de date suport. Dacă aveţi sistemul de abonare în ERDDAP™ Pornit, ar trebui să obțineți e-mailuri cerându-vă să valideze abonamentul. Te rog.
        * Dacă aveţi sistemul de abonare în ERDDAP™ închis, setul de date LonPM180 poate avea uneori metadate depășite până când setul de date LonPM180 este reîncărcat. Deci, dacă sistemul de abonament este oprit, ar trebui să setați [&lt;reîncărcare Fiecare NMuta &gt;] (#Încarcă fiecare minut) stabilirea setului de date LonPM180 la un număr mai mic, astfel încât este mai probabil ca acesta să prindă modificări ale setului de date pentru copii mai devreme.

* Pentru seturile de date cu longitudine maximă &gt; 360, utilizați următoarea configurație opțională pentru a stabili valoarea maximă, iar setul de date va fi corectat la -180 la 180.
```
    <maxSourceLon>540</maxSourceLon>
```

####  EDDGrid Schelet LonPM180 XML{#eddgridlonpm180-skeleton-xml} 

>&nbsp;&nbsp;&lt;dataset type="EDDGridLonPM180" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid Lon0360{#eddgridlon0360} 
 [ ** EDDGrid Lon0360** ](#eddgridlon0360) modifică valorile de longitudine ale unui copil (închis)   EDDGrid Set de date care are valori de longitudine mai mici de 0 (De exemplu, -180 la 180) astfel încât acestea să fie în intervalul 0 - 360 (prin urmare, denumirea) .

* Lucrul în apropierea unei discontinuităţi cauzează probleme, indiferent dacă discontinuitatea este la longitudine 0 sau la longitudine 180. Acest tip de set de date vă permite să evitați aceste probleme pentru toată lumea, oferind două versiuni ale aceluiași set de date:
una cu valori de longitudine în intervalul 180 - 180 ("Atlanticatic"?) .
unul cu valori de longitudine în intervalul 0 - 360 ("Pacificcentric"?) ,
* Pentru seturile de date pentru copii cu toate valorile longitudinei mai mici de 0, toate valorile noii longitudine sunt cu 360 de grade mai mari. De exemplu, un set de date cu valori de -180 până la -120 de longitudine ar deveni un set de date cu valori de longitudine cuprinse între 180 și 240.
* Pentru seturi de date pentru copii care au valori de longitudine pentru întregul glob (aproximativ -180 la 180) , noua valoare longitudine va fi rearanjat pentru a fi (aproximativ) 0 - 360:
Valorile originale -180 la 0 sunt convertite la 180 la 360 și mutate la sfârșitul matricei de longitudine.
Valorile originale de la 0 la aproape 180 sunt neschimbate.
* Pentru seturile de date pentru copii care se întind între 0 și 2, dar nu acoperă globul, ERDDAP™ introduce valori lipsă, după caz, pentru a face un set de date care acoperă globul. De exemplu, un set de date pentru copii cu valori de -40-20 longitudine ar deveni un set de date cu valori de longitudine cuprinse între 0 și 360.
Valorile copilului de la 0 la 20 ar fi neschimbate.
Se vor introduce noi valori ale longitudinii de la 20 la 320. Valorile corespunzătoare ale datelor vor fi \\_FillValues.
Valorile copilului de la -40 la 0 ar deveni 320 la 360.
Introducerea valorilor lipsă poate părea ciudată, dar evită mai multe probleme care rezultă de la valori de longitudine care salt brusc (de exemplu de la 20 la 320) .
* În [GenereazăSeturi de dateXml](#generatedatasetsxml) , există un "tip de set de date" special, EDDGrid Lon0360De la ErddapCatalog, care vă permite să generaţi datasets.xml pentru EDDGrid Seturi de date Lon0360 din fiecare EDDGrid Seturi de date într-un ERDDAP care au valori de longitudine mai mari de 180. Acest lucru facilitează oferirea a două versiuni ale acestor seturi de date:
originalul, cu valori de longitudine cuprinse între 0 și 360;
și noul set de date, cu valori de longitudine cuprinse între 180 și 180.
    
Setul de date pentru copii din fiecare EDDGrid Setul de date Lon0360 va fi un EDDGrid Din setul de date Erddap care indică setul de date original.
Noul set de date datasetID va fi numele setului de date original plus "\\_Lon0360."
De exemplu,
```
    <dataset type="EDDGridLon0360" datasetID="erdMBsstdmday\\_Lon0360" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_Lon0360Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=-40.0 maxLon=20.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Pune EDDGrid Set de date Lon0360 **jos** Setul de date original în datasets.xml . Asta evită unele probleme posibile.
    
Alternativ, puteți înlocui EDDGrid Set de date pentru copii din Erddap cu setul de date original datasets.xml . Apoi, va exista o singură versiune a setului de date: cea cu valori de longitudine cuprinse între 0 și 360. Te descurajăm pentru că există momente când fiecare versiune a setului de date este mai convenabilă.
    
* Dacă oferiți două versiuni ale unui set de date, de exemplu, una cu longitudine 0 - 360 și una cu longitudine -180 - 180:
    * Puteți utiliza opțional [&lt;accesibil Via WMS &gt; Fals&lt;/accesibil Via WMS &gt;] (#accessibleviawms) cu setul de date 0 - 360 pentru a dezactiva forțat WMS servicii pentru acel set de date. Apoi, numai versiunea de la -180 la 180 a setului de date va fi accesibilă prin intermediul WMS .
    * Există câteva modalități de a menține la zi setul de date Lon0360 cu modificări ale setului de date suport:
        * Dacă setul de date pentru copii este a EDDGrid Din setul de date Erddap care face trimitere la un set de date din același set de date ERDDAP™ , Setul de date Lon0360 va încerca să subscrie direct la setul de date suport, astfel încât acesta să fie întotdeauna actualizat. Abonamentele directe nu generează e-mailuri care vă cer să validați abonamentul - validarea trebuie să se facă automat.
        * Dacă setul de date pentru copii nu este un EDDGrid Set de date din Erddap care este pe aceeași ERDDAP™ , setul de date Lon0360 va încerca să utilizeze sistemul de subscriere regulat pentru a subscrie la setul de date suport. Dacă aveţi sistemul de abonare în ERDDAP™ Pornit, ar trebui să obțineți e-mailuri cerându-vă să valideze abonamentul. Te rog.
        * Dacă aveţi sistemul de abonare în ERDDAP™ închis, setul de date Lon0360 poate avea uneori metadate depășite până când setul de date Lon0360 este reîncărcat. Deci, dacă sistemul de abonament este oprit, ar trebui să setați [&lt;reîncărcare Fiecare NMuta &gt;] (#Încarcă fiecare minut) stabilirea setului de date Lon0360 la un număr mai mic, astfel încât este mai probabil ca acesta să prindă modificări ale setului de date pentru copii mai devreme.
####  EDDGrid Schelet Lon0360 XML{#eddgridlon0360-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridLon0360" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid SideBySide{#eddgridsidebyside} 
 [ ** EDDGrid SideBySide** ](#eddgridsidebyside) agregate două sau mai multe EDDGrid Seturi de date (copii) una lângă alta.

* Setul de date rezultat conține toate variabilele din toate setările de date pentru copii.
* Setul de date părinte și toate seturile de date pentru copii TREBUIE să aibă diferite datasetID c. Dacă orice nume dintr-o familie sunt exact la fel, setul de date nu va încărca (cu mesajul de eroare că valorile axei agregate nu sunt în ordine sortate) .
* Toţi copiii TREBUIE să aibă aceleaşi valori sursă pentru axisVariable s \\[ 1+ \\]   (de exemplu, latitudine, longitudine) . Precizia încercării este determinată de [Potrivire AxisNDigits](#matchaxisndigits) .
* Copiii pot avea valori sursă diferite pentru axisVariable s \\[ 0 \\]   (de exemplu, timpul) Dar de obicei sunt la fel.
* Setul de date părinte va părea să aibă toate axisVariable s \\[ 0 \\] valori sursă de la toți copiii.
* De exemplu, acest lucru vă permite să combinaţi un set de date sursă cu u-componenta vectorului şi un alt set de date sursă cu componenta V a vectorului, astfel încât datele combinate să poată fi deservite.
* Copiii creaţi prin această metodă sunt ţinuţi în particular. Acestea nu sunt seturi de date accesibile separat (de exemplu, prin cereri de date ale clienților sau prin [Fișiere de pavilion](/docs/server-admin/additional-information#flag) ) .
* Metadatele globale și setările pentru părinte provin din metadatele globale și setările pentru primul copil.
* În cazul în care există o excepție în timpul creării primului copil, părintele nu va fi creat.
* Dacă există o excepție în timp ce se creează alți copii, acest lucru trimite un e-mail pentru a e-mailEverythingTo (după cum se specifică în [setup.xml](/docs/server-admin/deploy-install#setupxml) ) şi continuă cu ceilalţi copii.
####  EDDGrid SideBySide schelet XML{#eddgridsidebyside-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridSideBySide" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 2 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid Dimensiune agregată{#eddgridaggregateexistingdimension} 
 [ ** EDDGrid Dimensiune agregată** ](#eddgridaggregateexistingdimension) agregate două sau mai multe EDDGrid seturi de date fiecare dintre care are o gamă diferită de valori pentru prima dimensiune, dar valori identice pentru celelalte dimensiuni.

* De exemplu, un set de date pentru copii ar putea avea 366 de valori (pentru 2004) pentru dimensiunea timpului și un alt copil ar putea avea 365 valori (pentru 2005) pentru dimensiunea timpului.
* Toate valorile pentru toate celelalte dimensiuni (de exemplu, latitudine, longitudine) TREBUIE să fie identic pentru toţi copiii. Precizia încercării este determinată de [Potrivire AxisNDigits](#matchaxisndigits) .
* Valori de dimensiune sortare - Valorile pentru fiecare dimensiune trebuie sortate (ascendentă sau descendentă) . Valorile pot fi șterse neregulat. Nu pot exista legături. Aceasta este o cerinţă a [Standardul metadatelor CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) . Dacă valorile oricărei dimensiuni nu sunt în ordine sortate, setul de date nu va fi încărcat și ERDDAP™ va identifica prima valoare nesortate în fișierul jurnal; *Big ParentDirectory* /logs/log.txt.
    
Valorile de dimensiune nesortate indică aproape întotdeauna o problemă cu setul de date sursă. Acest lucru se întâmplă cel mai frecvent atunci când un fișier cu nume greșite sau nepotrivit este inclus în agregare, ceea ce duce la o dimensiune a timpului nesortate. Pentru a rezolva această problemă, consultați mesajul de eroare din ERDDAP™ log.txt fișier pentru a găsi valoarea de timp ofensatoare. Apoi căutați în fișierele sursă pentru a găsi fișierul corespunzător (sau una înainte sau una după) care nu aparține în agregare.
    
* Setul de date părinte și setul de date pentru copii trebuie să fie diferite datasetID c. Dacă orice nume dintr-o familie sunt exact la fel, setul de date nu va încărca (cu mesajul de eroare că valorile axei agregate nu sunt în ordine sortate) .
* În prezent, setul de date pentru copii trebuie să fie un EDDGrid Setul de date de la Dap și TREBUIE să aibă cele mai mici valori ale dimensiunii agregate (de obicei cele mai vechi valori ale timpului) . Toți ceilalți copii TREBUIE să fie seturi de date aproape identice (diferă doar în valorile pentru prima dimensiune) și sunt specificate de doar lor sourceUrl .
* Setul de date agregat primeşte metadatele sale de la primul copil.
* ă [Generează dateName Programul Xml](#generatedatasetsxml) poate face un proiect dur de datasets.xml pentru EDDGrid AgregatExistingDimension bazat pe un set de fișiere deservite de o Hyrax sau server THREDS. De exemplu, utilizați această intrare pentru program ("/1988" în URL face exemplul rula mai repede) :
    ```
      EDDType? EDDGridAggregateExistingDimension  
      Server type (hyrax, thredds, or dodsindex)? hyrax  
      Parent URL (for example, for hyrax, ending in "contents.html";  
        for thredds, ending in "catalog.xml")  
      ? https://opendap.jpl.nasa.gov/opendap/ocean\\_wind/ccmp/L3.5a/data/  
        flk/1988/contents.html  
      File name regex (for example, ".\\*\\.nc")? month.\\*flk\\.nc\\.gz  
      ReloadEveryNMinutes (for example, 10080)? 10080  
    ```
Puteți folosi rezultatul&lt; sourceUrl &gt; etichete sau ștergeți-le și decomentați&lt; sourceUrl &gt; etichetă (astfel încât fişierele noi să fie observate de fiecare dată când setul de date este reîncărcat.
####  EDDGrid Schelet de dezvoltare globală XML{#eddgridaggregateexistingdimension-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridAggregateExistingDimension" [datasetID](#datasetid)\\="..."  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- This is a regular [EDDGridFromDap](#eddgridfromdap) dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description child with the lowest values for the aggregated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl> &lt;!-- 0 or many; the sourceUrls for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;other children.  These children must be listed in order of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrls serverType="..." regex="..." recursive="true"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[pathRegex](#pathregex)\\=".\\*"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>https://*someServer/someDirectory/someSubdirectory*/catalog.xml&lt;/sourceUrls>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1. This specifies how to find the other children,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instead of using separate sourceUrl tags for each child.  The  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advantage of this is: new children will be detected each time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the dataset is reloaded. The serverType must be "thredds",  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hyrax", or "dodsindex". 
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) (regex)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) is .\\*\\.nc  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recursive can be "true" or "false".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Only directory names which match the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(default=".\\*") will be accepted.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A thredds catalogUrl MUST include "/thredds/catalog/".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a thredds catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chla/catalog.xml](https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a hyrax catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flk/1988/contents.html](https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/1988/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a dodsindex URL is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Note the "OPeNDAP logo at the top of the page.)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When these children are sorted by filename, they must be in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order of ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid Copiază{#eddgridcopy} 
 [ ** EDDGrid Copiază** ](#eddgridcopy) face și menține o copie locală a unui alt EDDGrid datele și servește date de la copia locală.

*    EDDGrid Copiază (și pentru date tabelare; [EDDCommentCopy](#eddtablecopy) ) este un foarte usor de utilizat si un foarte eficient
     **soluţie la unele dintre cele mai mari probleme cu furnizarea datelor dintr-o sursă de date la distanţă:** 
    * Accesul datelor dintr-o sursă de date la distanță poate fi lent.
        * Acesta poate fi lent, deoarece este inerent lent (de exemplu, un tip ineficient de server) ,
        * pentru că este copleşit de prea multe cereri,
        * sau pentru că serverul sau serverul de la distanță este limitat de lățime de bandă.
    * Setul de date la distanță este uneori indisponibil (din nou, pentru o varietate de motive) .
    * Să te bazezi pe o singură sursă de date nu e bine (de exemplu, atunci când mulți utilizatori și mulți ERDDAP s utilizaţi) .
         
* Cum funcţionează... EDDGrid Copierea rezolvă aceste probleme prin realizarea și menținerea automată a unei copii locale a datelor și furnizarea de date din copia locală. ERDDAP™ poate servi datele de pe copia locală foarte, foarte repede. Şi făcând o copie locală uşurează povara serverului de la distanţă. Iar copia locală este o copie de rezervă a originalului, care este util în cazul în care se întâmplă ceva cu originalul.
    
Nu este nimic nou despre a face o copie locală a unui set de date. Ce este nou aici este că această clasă face\\*Uşor.\\*crearea și\\*menţine\\*o copie locală a datelor de la o\\*soi\\*tipurile de surse de date la distanță și\\*adăuga metadate\\*copierea datelor.
    
* Bucati de date... EDDGrid Copie face copia locală a datelor prin solicitarea bucăților de date de la distanță&lt;Set de date&gt;. Va fi o bucată pentru fiecare valoare a celui mai stâng (Prima dată) variabila axei. EDDGrid Copia nu se bazează pe numerele index ale setului de date la distanță pentru axă -- acestea se pot schimba.
    
ATENŢIE: Dacă mărimea unei bucăţi de date este atât de mare (&gt; 2GB) că provoacă probleme; EDDGrid Copia nu poate fi folosită. (Ne pare rău, sperăm să avem o soluție pentru această problemă în viitor.) 
    
*    \\[ O alternativă la EDDGrid Copiază
Dacă datele de la distanță sunt disponibile prin intermediul fișierelor descărcabile, nu printr-un serviciu web, utilizați [cache Opţiunea dinspre Url pentru EDDGrid Din dosare](#cachefromurl) , care face o copie locală a fișierelor la distanță și servește datele din fișierele locale. \\] 
* Fișiere locale - Fiecare bucată de date este stocată separat NetCDF fișier într-un subdosar al *Big ParentDirectory* /copie / * datasetID * / (după cum se specifică în [setup.xml](/docs/server-admin/deploy-install#setupxml) ) . Numele de fișier create din valorile axei sunt modificate pentru a le face file-name-safe (de exemplu, hyphens se înlocuiesc cu "x2D") - asta nu afectează datele reale.
     
* Date noi -- De fiecare dată EDDGrid Copia e reîncărcată, verifică telecomanda.&lt;Set de date&gt; pentru a vedea ce bucăți sunt disponibile. În cazul în care fișierul pentru o bucată de date nu există deja, o cerere pentru a obține bucata se adaugă la o coadă. ERDDAP SarcinaThread procesează toate cererile coadă pentru bucăți de date, unu câte unu. Puteți vedea statistici pentru activitatea Thread pe [Pagina statutului](/docs/server-admin/additional-information#status-page) şi în [Raport zilnic](/docs/server-admin/additional-information#daily-report) . (Da. ERDDAP™ ar putea atribui mai multe sarcini acestui proces, dar care ar folosi până o mulțime de lățime de bandă de date sursă de la distanță, memorie, și timp CPU, și o mulțime de locale ERDDAP Lăţimea de bandă, memoria şi timpul procesorului, nici una dintre ele nu este o idee bună.) 
    
NOTĂ: Prima dată EDDGrid Copia este încărcată, (dacă totul merge bine) o mulțime de cereri de bucăți de date vor fi adăugate la coada sarciniiThread, dar nu vor fi create fișiere de date locale. Astfel constructorul va eșua, dar sarcinaThread va continua să lucreze și să creeze fișiere locale. Dacă totul merge bine, sarcinaThread va face unele fișiere de date locale și următoarea încercare de a reîncărca setul de date (în 15 minute) va reuși, dar inițial cu o cantitate foarte limitată de date.
    
NOTĂ: După ce setul de date local are unele date și apare în ERDDAP , în cazul în care setul de date la distanță nu este accesibil temporar sau permanent, setul local va funcționa în continuare.
    
ATENŢIONARE: Dacă setul de date de la distanţă este mare şi/sau serverul de la distanţă este lent (Asta e problema, nu-i aşa?) Va dura mult să facem o copie locală completă. În unele cazuri, timpul necesar va fi inacceptabil. De exemplu, transmiterea 1 TB a datelor pe o linie T1 (0,15 GB/s) durează cel puțin 60 de zile, în condiții optime. În plus, utilizează o mulțime de lățime de bandă, memorie, și timp CPU pe computerele de la distanță și locale. Soluţia este să trimiteţi un hard disk administratorului setului de date la distanţă, astfel încât s/el să poată face o copie a setului de date şi să vă trimită hard disk-ul înapoi. Utilizarea acestor date ca punct de plecare și EDDGrid Copierea va adăuga date. (Acesta este un mod în care [Serviciul de cloud computing al Amazon2](https://aws.amazon.com/importexport/) se ocupă de problemă, chiar dacă sistemul lor are o mulțime de lățime de bandă.) 
    
ATENŢIONARE: Dacă o valoare dată pentru stânga (Prima dată) variabila axei dispare din setul de date la distanță; EDDGrid Copiere NU șterge fișierul copiat local. Dacă vrei, poţi să-l ştergi singur.
    
#### Copiază sursa de verificare Date{#grid-copy-checksourcedata} 
ă datasets.xml pentru acest set de date poate avea o etichetă opțională
```
    <checkSourceData>true</checkSourceData>  
```
Valoarea implicită este adevărată. Dacă/atunci când setați fals, setul de date nu va verifica niciodată setul de date sursă pentru a vedea dacă există date suplimentare disponibile.

#### Doar pentru că{#onlysince} 
Se vede. EDDGrid Copie pentru a face o copie a unui subset al setului de date sursă, în locul întregului set de date sursă, prin adăugarea unei etichete în formular&lt;Doar din &gt; *unele Valoare* &lt;/doar de la&gt; la setul de date datasets.xml Chunk. EDDGrid Copierea va descărca doar valorile datelor legate de valorile primei dimensiuni (de obicei dimensiunea timpului) care sunt mai mari decât *unele Valoare* . *unele Valoare* pot fi:
    * Un timp relativ specificat prin now-  *nuniți* .
De exemplu,&lt;Doar din &gt; now- 2 ani&lt;/doarÎncepând cu&gt; spune setului de date să facă doar copii locale ale datelor pentru datele în care valorile dimensiunii exterioare (de obicei, valorile timpului) sunt în ultimii 2 ani (care este reevaluată de fiecare dată când setul de date este reîncărcat, adică atunci când caută date noi de copiat) . Vezi [ now-  *nuniți* Descrierea sintaxei](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) . Acest lucru este util în cazul în care prima dimensiune are date de timp, pe care le face de obicei.
        
         EDDGrid Copiere nu șterge fișierele de date locale care au date care, în timp, devin mai vechi decât now-  *nuniți* . Puteți șterge aceste fișiere în orice moment, dacă alegeți să. Dacă o faci, vă recomandăm cu tărie să setați un [pavilion](/docs/server-admin/additional-information#flag) după ce ștergeți fișierele de spus EDDGrid Copiază pentru a actualiza lista de fișiere cache.
        
    * Un punct fix în timp specificat ca un șir ISO 8601 yyyy-MM-ddTHH:mm:ssZ .
De exemplu,&lt;Numai din 2000-01-01T00:00Z&lt;/Doar din&gt; spune setului de date doar pentru a face copii locale ale datelor unde valoarea primei dimensiuni este \\&gt;=2000-01-01T00:00:00Z. Acest lucru este util în cazul în care prima dimensiune are date de timp, pe care le face de obicei.
         
    * Un număr plutitor.
De exemplu,&lt;Doar de la 94668480.0&lt;Doar de atunci. Unităţile vor fi unităţile de destinaţie din prima dimensiune. De exemplu, pentru dimensiunile timpului, unitățile în ERDDAP™ sunt întotdeauna "seconds since 1970-01-01T00:00:00Z" . Deci, 946684800. "seconds since 1970-01-01T00:00:00Z" este echivalent cu 2000-01-01T00:00Z. Aceasta este întotdeauna o opțiune utilă, dar este deosebit de utilă atunci când prima dimensiune nu are timp.

####  EDDGrid Copiază utilizarea recomandată{#eddgridcopy-recomended-use} 
1. Creează&lt;Set de date &gt; intrare (tipul nativ, nu EDDGrid Copiază) pentru sursa de date la distanță.
     **Funcţionează corect, inclusiv toate metadatele dorite.** 
2. Dacă este prea lent, adăugați codul XML pentru a-l înfășura într-o EDDGrid Copiază setul de date.
    * Foloseşte un alt datasetID   (Poate prin schimbarea datasetID din vechiul datasetID uşor) .
    * Copiază&lt;accesibil To&gt;,&lt;reîncărcareEveryNMinutes&gt; și&lt;OnChange&gt; de la distanță EDDGrid 's XML to the EDDGrid Copia e XML. (Valorile lor pentru EDDGrid Copy matter; valorile lor pentru setul de date intern devin irelevante.) 
3.   ERDDAP™ va face și va menține o copie locală a datelor.
         
* ATENŢIONARE: EDDGrid Copia presupune că valorile datelor pentru fiecare bucată nu se schimbă niciodată. Dacă / atunci când o fac, trebuie să ștergeți manual fișierele bucată în *Big ParentDirectory* /copie / * datasetID * / care sa schimbat și [pavilion](/docs/server-admin/additional-information#flag) setul de date care trebuie reîncărcat astfel încât bucățile eliminate să fie înlocuite. Dacă aveți un abonament prin e-mail la setul de date, veți primi două e-mailuri: unul când setul de date reîncărcați prima dată și începe să copieze datele, iar altul când setul de date se încarcă din nou (automat) și detectează noile fișiere locale de date.
     
* Toate valorile axei trebuie să fie egale.
Pentru fiecare dintre axe, cu excepția celui mai stâng (Prima dată) Toate valorile trebuie să fie egale pentru toţi copiii. Precizia încercării este determinată de [Potrivire AxisNDigits](#matchaxisndigits) .
     
* Configurări, Metadate, Variabile - EDDGrid Copiază folosește setările, metadatele și variabilele din setul de date sursă închis.
     
* Schimbă metadatele -- Dacă aveţi nevoie pentru a schimba orice addAttributes sau să modifice ordinea variabilelor asociate setului de date sursă:
    1. Schimbă addAttributes pentru setul de date sursă din datasets.xml , după cum este necesar.
    2. Șterge unul dintre fișierele copiate.
    3. Set a [pavilion](/docs/server-admin/additional-information#flag) pentru a reîncărca setul de date imediat. Dacă utilizați un steag și aveți un abonament e-mail la setul de date, veți primi două e-mailuri: una când setul de date reîncărcați prima dată și începe să copieze datele, iar alta când setul de date se încarcă din nou (automat) și detectează noile fișiere locale de date.
    4. Fișierul șters va fi regenerat cu noile metadate. În cazul în care setul de date sursă nu este disponibil vreodată, EDDGrid Setul de date copiat va obține metadate din fișierul regenerat, deoarece este cel mai tânăr fișier.
####  EDDGrid Copiază scheletul XML{#eddgridcopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#grid-copy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onlySince>](#onlysince)...&lt;/onlySince> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Tabel EDD din Cassandra{#eddtablefromcassandra} 
 [ **Tabel EDD din Cassandra** ](#eddtablefromcassandra) se ocupă de date de la unul [Cassandra.](https://cassandra.apache.org/) Masa. Cassandra este o bază de date NOSQL.

*    ERDDAP™ poate lucra cu Cassandra v2 și v3 fără modificări sau diferențe în configurare. Am testat cu [Cassandra v2 și v3 de la Apache](https://cassandra.apache.org/download/) . Este probabil ca ERDDAP™ poate lucra și cu Cassandra descărcată de pe DataStatx.
     
* Pentru Aug 2019 - Mai 2021, am avut probleme obtinerea Cassandra pentru a lucra cu AdoptăOpenJdk Java v8. A aruncat o EXCEPTIE\\_ACCESS\\_VIOLARE). Dar acum (Mai 2021) , această problemă este plecat: putem utiliza cu succes Cassandra v2.1.22 și adoptaOpenJdk jdk8u292-b10.
     
#### O masă{#one-table} 
Cassandra nu susţine "se alătură" aşa cum fac bazele de date relaţionale. Unu. ERDDAP™ Tabel EDDDe la hărțile setului de date Cassandra la una (poate un subset de unul) Masa Cassandra.

#### Cassandra. datasets.xml  {#cassandra-datasetsxml} 
*    ERDDAP™ vine cu Cassandra Java Şofer, nu trebuie să-l instalezi separat.
* Citiți cu atenție toate informațiile acestui document despre EDDtable FromCassandra. Unele detalii sunt foarte importante.
* Cassandra Java Şoferul este destinat să lucreze cu Apache Cassandra (1,2+) și DataStatx Enterprise (3.1+) . Dacă utilizați Apache Cassandra 1.2.x, trebuie să editați fișierul Cassandra.yaml pentru fiecare nod pentru a seta start\\_native\\_transport: adevărat, apoi reporniți fiecare nod.
* Vă recomandăm cu tărie utilizarea [Generează dateName Programul Xml](#generatedatasetsxml) să facă un proiect dur al datasets.xml bucată pentru acest set de date. Puteți apoi edita asta pentru a-l acorda fin (în special [&lt;partiție KeySourceNames&gt;] (#partitionkeysource names) ). Puteți aduna majoritatea informațiilor de care aveți nevoie pentru a crea XML-ul pentru un set de date EDDTableFromCassandra contactând administratorul Cassandra și prin căutarea web-ului.
    
Generează dateName Xml are două opțiuni speciale pentru tabelul EDDFromCassandra:
    
    1. Dacă introduceți "&#33;&#33;LIST&#33;&#33;" (fără citate) pentru keyspace, programul va afisa o lista de spatii cheie
    2. Dacă introduceți un anumit spațiu cheie și apoi introduceți "&#33;&#33;LIST&#33;&#33;&#33;" (fără citate) pentru numele de tabel, programul va afișa o listă de tabele în acel spațiu cheie și coloanele lor.
##### Sensibilitate la caz{#case-sensitivity} 
* Keyspace insensibil și denumirile de masă -
Cassandra tratează keyspace și nume de masă într-un mod insensibil caz. Din cauza asta, nu trebuie să foloseşti niciodată un cuvânt rezervat. (dar cu un caz diferit) ca un keyspace Cassandra sau nume de masă.
* Nume de coloană insensibile --
În mod implicit, Cassandra tratează numele coloanei într-un mod insensibil. Dacă utilizați unul dintre cuvintele rezervate Cassandra ca un nume coloană (Te rog, nu&#33;) , TREBUIE să utilizaţi
```
        <columnNameQuotes>"<columnNameQuotes>  
```
în datasets.xml pentru acest set de date astfel încât Cassandra și ERDDAP™ va trata numele coloanei într-un mod sensibil. Aceasta va fi probabil o durere de cap masivă pentru tine, pentru că este greu de determinat versiunile sensibile ale numelor coloanei -- Cassandra afişează aproape întotdeauna numele coloanei ca fiind toate cele de jos, indiferent de cazul adevărat.
* Lucrează îndeaproape cu administratorul Cassandra, care poate avea experiență relevantă. Dacă setul de date nu se încarcă, citiți [mesaj de eroare](#troubleshooting-tips) Cu grijă pentru a afla de ce.
         
#### Cassandra.&lt;conexiune Proprietate &gt;{#cassandra-connectionproperty} 
Cassandra are proprietăți de conectare care pot fi specificate în datasets.xml . Multe dintre acestea vor afecta performanţele Cassandrei... ERDDAP™ Conexiune. Din păcate, proprietățile Cassandra trebuie stabilite programatic în Java , deci ERDDAP™ trebuie să aibă cod pentru fiecare proprietate ERDDAP™ sprijină. În prezent, ERDDAP™ susține aceste proprietăți:
 (Implicațiile afișate sunt ceea ce vedem. Neplata sistemului tău poate fi diferită.) 

*    **Opțiuni generale**   
    &lt;conexiune Denumirea proprietății=" **compresie** "&gt; *niciuna | LZ4 | irascibil* &lt;/conectare Proprietate &gt; (insensibil caz, implicit = zero)   
     (Consultanţă generală de compresie: utilizaţi "nici unul" dacă conexiunea dintre Cassandra şi ERDDAP™ este local/rapid și utilizează "LZ4" dacă conexiunea este la distanță/înceată.)   
    &lt;conexiune Denumirea proprietății=" **acreditări** "&gt; *Nume utilizator/parolă* &lt;/conectare Proprietate &gt; (Asta e literal. '/' )   
    &lt;conexiune Denumirea proprietății=" **Indicatori** "&gt; *Adevărat. | fals* &lt;/conectare Proprietate &gt; (2021-01-25 a fost implicit=adevărat, acum ignorat și întotdeauna fals)   
    &lt;conexiune Denumirea proprietății=" **port** "&gt; *anInteger* &lt;/conectare Proprietate &gt; (implicit pentru protocolul binar nativ=9042)   
    &lt;conexiune Denumirea proprietății=" **ssl** "&gt; *Adevărat. | fals* &lt;/conectare Proprietate &gt; (implicit = fals)   
     (Încercarea mea rapidă de a folosi SSL a eşuat. Dacă reuşeşti, spune-mi cum ai reuşit.) 
*    **Opțiuni întrebări**   
    &lt;conexiune Denumirea proprietății=" **consistență Nivel** "&gt; *toate | orice | fiecare\\_quorum | local\\_one | local\\_quorum | local\\_serial | unu | cvorum | serial | trei | doi* &lt;/conectare Proprietate &gt; (insensibil caz, implicit = ONE)   
    &lt;conexiune Denumirea proprietății=" **address** "&gt; *anInteger* &lt;/conectare Proprietate &gt; (implicit = 5000)   
     (Nu setați makeSize la o valoare mai mică.)   
    &lt;conexiune Denumirea proprietății=" **Nivel de coexistență în serie** "&gt; *toate | orice | fiecare\\_quorum | local\\_one | local\\_quorum | local\\_serial | unu | cvorum | serial | trei | doi* &lt;/conectare Proprietate &gt; (caz insensibil, implicit = SERIAL) 
*    **Opțiuni Socket**   
    &lt;conexiune Denumirea proprietății=" **Conectează TimeoutMillis** "&gt; *anInteger* &lt;/conectare Proprietate &gt; (implicit = 5000)   
     (Nu setați conexiunea TimeoutMillis la o valoare mai mică.)   
    &lt;conexiune Denumirea proprietății=" **KeepAlive** "&gt; *Adevărat. | fals* &lt;/conectare Proprietate &gt;
    &lt;conexiune Denumirea proprietății=" **citeste Timeout Millis** "&gt; *anInteger* &lt;/conectare Proprietate &gt;
     (Citește implicit Cassandra TimeoutMillis este 12000, dar ERDDAP™ schimbă valoarea implicită la 120000. În cazul în care Cassandra este aruncat citindTimeouts, creșterea acest lucru nu poate ajuta, deoarece Cassandra uneori le aruncă înainte de acest moment. Problema este mai probabil că sunteți stocarea prea multe date pe partiție Combinaţie cheie.)   
    &lt;conexiune Denumirea proprietății=" **a primi BufferSize** "&gt; *anInteger* &lt;/conectare Proprietate &gt;
     (Este neclar ceea ce primiți implicitBufferSize este. Nu setați acest lucru la o valoare mică.)   
    &lt;conexiune Denumirea proprietății=" **soLinger** "&gt; *anInteger* &lt;/conectare Proprietate &gt;
    &lt;conexiune Denumirea proprietății=" **tcpNoDelay** "&gt; *Adevărat. | fals* &lt;/conectare Proprietate &gt; (implicit=null) 

Dacă aveți nevoie pentru a putea stabili alte proprietăți de conectare, consultați [secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support) .

Pentru o pornire dată de Tomcat, conexiuneProperties sunt utilizate doar prima dată când un set de date este creat pentru un anumit URL Cassandra. Toate reîncărcarea setului de date și a tuturor seturilor de date ulterioare care partajează același URL vor utiliza acele properități originale de conectare.
    
#### CQL{#cql} 
Limba de întrebare Cassandra (CQL) este superficial ca SQL, limba de interogare utilizată de bazele de date tradiționale. Pentru că OPeNDAP Cererile de date tabulare au fost concepute pentru a imita cererile de date tabulare SQL, este posibil pentru ERDDAP™ pentru a converti cererile de date tabulare în CQL Bound/PreparatedStatements. ERDDAP™ înregistrează declarația în [log.txt](/docs/server-admin/additional-information#log) cum
declarație ca text: *DeclaraţiaAsText*   
Versiunea declarației pe care o vedeți va fi o reprezentare text a declarației și va avea doar "?" unde vor fi plasate valori de constrângere.
       
Nu atât de simplu... Din păcate, CQL are multe restricții cu privire la care coloane pot fi interogate cu care tipuri de constrângeri, de exemplu, coloane cheie de partiție pot fi constrânse cu = și IN, astfel ERDDAP™ trimite unele constrângeri Cassandrei și aplică toate constrângerile după primirea datelor de la Cassandra. Pentru a ajuta ERDDAP™ A face eficient cu Cassandra, aveți nevoie pentru a specifica [&lt;partiție KeySourceNames&gt;] (#partitionkeysource names) , [&lt;clusterColumnSourceNames&gt;] (#clustercoloanăsource names) , și [&lt;indexColumnSourceNames&gt;] (#Indicesourcenames) în datasets.xml pentru acest set de date. Acestea sunt cele mai importante moduri de a ajuta ERDDAP™ să lucreze eficient cu Cassandra. Dacă nu spui ERDDAP™ aceste informații, setul de date va fi dureros de lent în ERDDAP™ și de a folosi tone de resurse Cassandra.
     
#### &lt;partiție KeySourceNames&gt;{#partitionkeysourcenames} 
Deoarece tastele de partiție joacă un rol central în mesele Cassandra, ERDDAP™ trebuie să ştie sourceName s şi, dacă este cazul, alte informaţii despre modul de lucru cu acestea.
* TREBUIE să specificați o listă separată de nume de coloane sursă de partiție datasets.xml prin&lt;partiție KeySourceNames.
Un exemplu simplu,
```
        <partitionKeySourceNames>station, deviceid<partitionKeySourceNames>  
```
Un exemplu mai complex,
```
        <partitionKeySourceNames>deviceid=1007, date/sampletime/1970-01-01<partitionKeySourceNames>
```
* TimeStamp Partition Keys - În cazul în care una dintre coloanele de tastatură de partiție este o coloană cu timbru de timp care are o versiune mai grosolană a unei alte coloane cu timbru de timp, specificați acest lucru prin
     *partițieKeySourcName/otherColumnSourceName/ time\\_precision *   
unde time\\_precision este unul dintre [ time\\_precision ](#time_precision) siruri de caractere utilizate în altă parte în ERDDAP .
Z traseu în time\\_precision șirul este implicit, deci nu contează dacă time\\_precision șir se termină în Z sau nu.
De exemplu, ERDDAP™ va interpreta data/ora de eșantionare/1970-01-01 ca "Constrângerile de dată pot fi construite din constrângeri privind timpul de eșantionare prin utilizarea acestui time\\_precision ." Conversia efectivă a constrângerilor este mai complexă, dar aceasta este imaginea de ansamblu.
     **Utilizați acest lucru ori de câte ori este relevant.** Permite ERDDAP™ să lucreze eficient cu Cassandra. Dacă această relație între coloane există într-o masă Cassandra și nu spune ERDDAP™ , setul de date va fi dureros de lent în ERDDAP™ și de a folosi tone de resurse Cassandra.
* Single Value Partition Keys - Dacă vrei ERDDAP™ Set de date pentru a lucra cu o singură valoare a unei chei de partiție, specificați *partițieKeySourceName=valoare* .
Nu folosi citate pentru o coloană numerică, de exemplu, dispozitivid=1007
Folosește citate pentru o coloană String, de exemplu, statiid="Point Pinos"
* Ordinea implicită de sortare a datelor -- Ordinea cheii de partiție&lt; dataVariable &gt; datasets.xml determină ordinea implicită de sortare a rezultatelor de la Cassandra. Desigur, utilizatorii pot solicita o comandă de sortare diferită pentru un anumit set de rezultate prin adăugarea & orderBy  (" *Lista variabilelor separate de virgulă* ") până la sfârşitul interogării lor.
* În mod implicit, Cassandra și ERDDAP™ tratează denumirile coloanelor într-un mod insensibil. Dar dacă setați [coloanăNameQuotes](#case-sensitivity) " ERDDAP™ va trata numele coloanei Cassandra într-un mod sensibil.
         
#### &lt;partiție KeyCSV&gt;{#partitionkeycsv} 
Dacă acest lucru este specificat, ERDDAP™ va folosi în loc de a cere Cassandra pentru partiție Informații cheie de fiecare dată când setul de date este reîncărcat. Aceasta oferă lista de valori cheie distincte de partiție, în ordinea în care vor fi utilizate. Timpurile trebuie specificate ca secunde de la 1970-01-01T 00:00:00Z. Dar există, de asemenea, două moduri alternative speciale de a specifica ori (fiecare codificat ca un șir) :

1) timp (aISO8601 Timp)   (POATE fi codificat ca un șir)   
2) "timpuri (anISO8601StartTime, pasSeconds, stopTime) " (TREBUIE să fie codificat ca un șir de caractere)   
Oprește-te Timpul poate fi un ISO8601 Timp sau un " now- timp nUnits" (de exemplu, " now- 3 minute") .
Oprește-te Timpul nu trebuie să fie un meci exact de început Timp + x pasSeconds.
Un rând cu un timp () valoarea se extinde în mai multe rânduri înainte de fiecare interogare, astfel încât lista de partiție Cheile pot fi întotdeauna perfect actualizate.
De exemplu,
```
    <partitionKeyCSV>
    deviceid,date
    1001,"times(2014-11-01T00:00:00Z, 86400, 2014-11-02T00:00:00Z)"
    1007,"time(2014-11-07T00:00:00Z)"
    1008,time(2014-11-08T00:00:00Z)
    1009,1.4154912E9
    </partitionKeyCSV>
```
se extinde în acest tabel de combinații cheie partiție:
```
    deviceid,date
    1001,1.4148E9
    1001,1.4148864E9
    1007,1.4153184E9
    1008,1.4154048E9
    1009,1.4154912E9 
```
#### &lt;clusterColumnSourceNames&gt;{#clustercolumnsourcenames} 
Cassandra acceptă constrângeri de tipul SQL pe coloanele de grup, care sunt coloanele care formează a doua parte a cheii primare (după tasta partiției (s) ) . Deci, este esențial să identifice aceste coloane prin intermediul&lt;clusterColumnSourceNames. Acest lucru permite ERDDAP™ să lucreze eficient cu Cassandra. Dacă există coloane de grup şi nu spui ERDDAP , setul de date va fi dureros de lent în ERDDAP™ și de a folosi tone de resurse Cassandra.
    * De exemplu,&lt;clusterColumnSourceNames &gt; *MyClusterColumn1, myClusterColumn2* &lt;/clusterColumnSourceNames &gt;
    * Dacă un tabel Cassandra nu are coloane cluster, nici nu specifică&lt;clusterColumnSourceNames &gt; sau specificați-l fără valoare.
    * În mod implicit, Cassandra și ERDDAP™ tratează denumirile coloanelor într-un mod insensibil. Dar dacă setați [coloanăNameQuotes](#case-sensitivity) " ERDDAP™ va trata numele coloanei Cassandra într-un mod sensibil.
         
#### &lt;indexColumnSourceNames &gt;{#indexcolumnsourcenames} 
Cassandra acceptă '=' constrângeri privind coloanele de indici secundari, care sunt coloanele pentru care ați creat în mod explicit indexuri prin intermediul
```
    CREATE INDEX *indexName* ON *keyspace.tableName* (*columnName*);  
```
 (Da, parantezele sunt necesare.)   
Deci, este foarte util dacă identificați aceste coloane prin intermediul&lt;indexColumnSourceNames &gt;. Acest lucru permite ERDDAP™ să lucreze eficient cu Cassandra. Dacă există coloane index şi nu spui ERDDAP , unele întrebări vor fi inutil, dureros lent în ERDDAP™ și de a folosi tone de resurse Cassandra.
* De exemplu,&lt;indexColumnSourceNames &gt; *MyIndexColumn1, myIndexColumn2* &lt;/indexColumnSourceNames &gt;
* Dacă un tabel Cassandra nu are coloane index, fie nu specifică&lt;indexColumnSourceNames &gt; sau specificați-l fără valoare.
* ATENŢIE: indexurile Cassandra nu sunt ca indexurile bazei de date. Cassandra indexes ajută doar cu '=' constrângeri. Şi sunt doar [recomandată](https://cassandra.apache.org/doc/latest/cql/indexes.html) pentru coloanele care au valori mult mai mici decât valorile totale.
* În mod implicit, Cassandra și ERDDAP™ tratează denumirile coloanelor într-un mod insensibil. Dar dacă setați [coloanăNameQuotes](#case-sensitivity) " ERDDAP™ va trata numele coloanei Cassandra într-un mod sensibil.
         
#### &lt;maxRequestFraction&gt;{#maxrequestfraction} 
Când ERDDAP™   (au) încarcă un set de date; ERDDAP™ Primește de la Cassandra lista de combinații distincte ale cheilor de partiție. Pentru un set de date imens, numărul de combinații va fi imens. Dacă doriți să împiedicați cererile utilizatorilor să solicite majoritatea sau întregul set de date (sau chiar o cerere care cere ERDDAP™ pentru a descărca majoritatea sau toate datele pentru a o filtra în continuare) , se poate spune ERDDAP™ numai pentru a permite cererile care reduc numărul de combinații cu o anumită sumă prin intermediul&lt;maxRequestFraction&gt;, care este un număr de punct plutitor între 1e-10 (ceea ce înseamnă că cererea nu poate avea nevoie de mai mult de o combinație într-un miliard) și 1 (implicit, ceea ce înseamnă că cererea poate fi pentru întregul set de date) .
De exemplu, dacă un set de date are 10000 de combinații distincte ale cheilor de partiție și maxRequestFraction este setat la 0.1;
atunci cererile care necesită date de la 1001 sau mai multe combinații vor genera un mesaj de eroare;
dar vor fi permise cereri care necesită date de la 1000 sau mai puține combinații.
    
În general, cu cât setul de date este mai mare, cu atât trebuie setat mai jos&lt;maxRequestFraction&gt;. Deci, s-ar putea seta la 1 pentru un set de date mic, 0.1 pentru un set de date de dimensiuni medii, 0,01 pentru un set de date mare, și 0,0001 pentru un set de date uriaș.
    
Această abordare este departe de a fi perfectă. Aceasta va duce la respingerea unor cereri rezonabile și la acceptarea unor cereri prea mari. Dar este o problemă dificilă și această soluție este mult mai bună decât nimic.
    
#### Cassandra. subsetVariables  {#cassandra-subsetvariables} 
Ca și în cazul altor seturi de date ale tabelului EDD, puteți specifica o listă separată de date referitoare la virgulă&lt; dataVariable &gt; destinationName s într-un atribut global numit " [ subsetVariables ](#subsetvariables) " pentru identificarea variabilelor care au un număr limitat de valori. Setul de date va avea apoi o pagină web .subset și va prezenta liste de valori distincte pentru aceste variabile în listele de drop-down pe multe pagini web.
    
Inclusiv doar variabile cheie de partiție și coloane statice în listă este STRONGLY E NCO Urat. Cassandra va putea genera lista combinațiilor distincte foarte rapid și ușor de fiecare dată când setul de date este reîncărcat. O excepție este tastele de partiție cu timbru temporal care sunt versiuni grosolane ale unei alte coloane de timbru temporal -- probabil că cel mai bine este să le lăsăm în afara listei de subsetVariables deoarece există un număr mare de valori și acestea nu sunt foarte utile pentru utilizatori.
    
Dacă includeți cheia non-partiție, variabile non-statice în listă, acesta va fi, probabil, **foarte** Calculabil scump pentru Cassandra de fiecare dată când setul de date este reîncărcat, deoarece ERDDAP™ trebuie să se uite prin fiecare rând al setului de date pentru a genera informațiile. De fapt, interogarea este probabil să eşueze. Deci, cu excepția unor seturi de date foarte mici, acest lucru este puternic distorsionate.
    
#### Tipuri de date Cassandra{#cassandra-datatypes} 
Pentru că există o ambiguitate despre care [Tipuri de date Cassandra](https://cassandra.apache.org/doc/latest/cql/types.html) harta către care ERDDAP™ tipuri de date, aveți nevoie pentru a specifica un [&lt;DataType &gt;] (#Tipul de date) etichetă pentru fiecare [&lt; dataVariable &gt;] (#date variabile) pentru a spune ERDDAP™ ce tip de date să utilizeze. Standardul ERDDAP™ date Tipuri (și cele mai frecvente tipuri de date corespunzătoare Cassandra) sunt:
    
*    [boolean](#boolean-data)   (boolean) , care ERDDAP™ apoi depozitează ca octeți
* octet (int, dacă intervalul este -128 până la 127) 
* scurt (int, dacă intervalul este -32768 -32767) 
* int (Int, contor, varint?, în cazul în care intervalul este -2147483648 la 2147483647) 
* lung (bigint, contra?, varint?, în cazul în care gama este -9223372036854775808 la 9223372036854775807) 
* float (float) 
* dublu (dublă, zecimală (cu posibila pierdere a preciziei) , timbru temporal) 
* char (Ascii sau text, în cazul în care nu au mai mult de 1 caracter) 
* String (Ascii, text, varchar, inet, uuid, timeuid, blob, map, set, lista?) 

Cassandra's [marca temporală](#cassandra-timestamp-data) este un caz special: utilizare ERDDAP Datele duble Tip.

Dacă specificați un tip de date String în ERDDAP™ pentru o hartă Cassandra, set sau listă, harta, set sau lista de pe fiecare rând Cassandra va fi convertită într-un singur șir pe un singur rând în ERDDAP™ Masa. ERDDAP™ are un sistem alternativ pentru liste; a se vedea mai jos.

 *tip* Liste... ERDDAP 's [&lt;DataType &gt;] (#Tipul de date) etichetă pentru Cassandra dataVariable s poate include regulat ERDDAP™ date Tipuri (vezi mai sus) plus mai multe tipuri de date speciale care pot fi folosite pentru coloanele de listă Cassandra: booleanList, byteList, ubyteList, shortList, ushortList, intList, uintList, longList, ulongList, floatList, doubleList, charList, StringList. Când una dintre aceste coloane listă este în rezultatele fiind transmise la ERDDAP™ , fiecare rând de date sursă va fi extins la listă. dimensiune () rânduri de date în ERDDAP ; date simple Tipuri (de exemplu, int) în acel rând de date sursă va fi dublată lista. dimensiune () ori. În cazul în care rezultatele conțin mai multe variabile ale listei, toate listele de date de pe un anumit rând trebuie să aibă aceeași dimensiune și trebuie să fie liste "paralel," sau ERDDAP™ va genera un mesaj de eroare. De exemplu, pentru măsurarea curenților dintr-un ADCP,
adâncime \\[ 0 \\] , uCurrent \\[ 0 \\] , vCurrent \\[ 0 \\] , și zCurrent \\[ 0 \\] sunt legate și
adâncime \\[ 1 \\] , uCurrent \\[ 1 \\] , vCurrent \\[ 1 \\] , și zCurrent \\[ 1 \\] sunt toate legate, ...
Alternativ, dacă nu vrei ERDDAP™ să extindă o listă în mai multe rânduri în ERDDAP™ tabel, specificați String ca dataVariable datele Tip astfel încât întreaga listă va fi reprezentată ca un șir pe un rând în ERDDAP .
    
#### Cassandra TimeStamp Data{#cassandra-timestamp-data} 
Datele de pe ora Cassandrei sunt întotdeauna conştiente de fusurile temporale. Dacă introduceți date cu timbru de timp fără a specifica un fus orar, Cassandra presupune că timbrul de timp utilizează fusul orar local.
    
 ERDDAP™ acceptă date privind marca temporală și prezintă întotdeauna datele în Zulu /GMT fus orar. Deci, dacă introduceți date de timbru în Cassandra folosind un alt fus orar decât Zulu /GMT, amintiți-vă că aveți nevoie pentru a face toate întrebările pentru datele marca de timp în ERDDAP™ utilizând Zulu /GMT fus orar. Deci, nu fi surprins când valorile timbru care ies din ERDDAP sunt deplasate cu câteva ore din cauza trecerii fusului orar de la local la Zulu /GMT timp.

* În ERDDAP 's datasets.xml , în&lt; dataVariable &gt; tag-ul pentru o variabilă timbru, set
```
          <dataType>double</dataType>  
```
și în&lt; addAttributes &gt; set
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Sugestie: Dacă datele sunt un interval de timp, este util să se facă referire la centrul intervalului temporal implicit (De exemplu, la prânz.) . De exemplu, dacă un utilizator are date pentru 2010-03-26T13:00Z dintr-un alt set de date și doresc cele mai apropiate date din acest set de date Cassandra care are date pentru fiecare zi, atunci datele pentru 2010-03-26T12:00Z (reprezentând datele Cassandra pentru acea dată) Este evident cel mai bun (spre deosebire de miezul nopții înainte sau după, în cazul în care este mai puțin evident care este cel mai bun) .
*    ERDDAP™ are o utilitate [Schimbă un numeric Timpul până la/de la un timp de coardă](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) .
* Vezi? [Cum ERDDAP™ Se ocupă de timp](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) .
         
#### Integer nuls{#integer-nulls} 
Cassandra suportă nuls în Cassandra int ( ERDDAP™ int) şi bigint ( ERDDAP™ lung) coloane, dar ERDDAP™ nu suportă nuluri reale pentru orice tip de date întregi.
În mod implicit, nuluri întregi Cassandra vor fi convertite în ERDDAP™ până la 2147483647 pentru coloanele int sau 9223372036854775807 pentru coloanele lungi. Acestea vor apărea ca "NaN" în unele tipuri de fișiere de ieșire text (de exemplu, .csv) , "" în alte tipuri de fișiere de ieșire text (de exemplu, .htmlTable ) , și numărul specific (2147483647 pentru valorile int lipsă) în alte tipuri de fișiere (de exemplu, fișiere binare ca .nc și mat) . Un utilizator poate căuta rânduri de date cu acest tip de valoare lipsă referindu-se la "NaN," de exemplu "&windSpeed=NaNaN."
    
Dacă utilizaţi alte valori întregi pentru a indica valorile lipsă în tabelul Cassandra, vă rugăm să identificaţi această valoare în datasets.xml :

>    &lt;att name="missing\\_value" [type="int"](#attributetype)\\>-999&lt;/att>

Pentru coloanele de puncte plutitoare Cassandra, nulii se convertesc la NaNs în ERDDAP . Pentru tipurile de date Cassandra care sunt convertite în strings in ERDDAP™ Nulurile se convertesc în corzi goale. Asta n-ar trebui să fie o problemă.
    
#### "WARNING: Re-pregătirea deja pregătit interogare"{#warning-re-preparing-already-prepared-query} 
* "WARNING: Re-pregătirea deja pregătit interogare" în *Tomcat* /loguri/catalina.out (sau un alt fișier jurnal Tomcat)   
Documentaţia Cassandra spune că există probleme dacă aceeaşi întrebare este făcută într-o stare de pregătire de două ori (sau mai mult) . (Vezi asta? [Raport de eroare](https://datastax-oss.atlassian.net/browse/JAVA-236) .) Pentru a evita a face Cassandra nebun, ERDDAP™ Cache toate stările Pregătite astfel încât să le poată refolosi. Cache-ul e pierdut dacă Tomcat... ERDDAP™ este repornit, dar cred că este în regulă deoarece Statele Pregătite sunt asociate cu o sesiune dată (între Java şi Cassandra.) , care este, de asemenea, pierdut. Deci, puteți vedea aceste mesaje. Nu cunosc altă soluţie. Din fericire, este un avertisment, nu o eroare. (deşi Cassandra ameninţă că poate duce la probleme de performanţă) .
    
Cassandra susţine că Statiunile Pregătite sunt bune pentru totdeauna. ERDDAP Statele Pregătite nu ar trebui să devină niciodată expirate/invalide. Dacă acest lucru nu este adevărat, și veți obține erori cu privire la anumite State Pregătite fiind out-of-data/invalid, atunci aveți nevoie pentru a reporni ERDDAP™ pentru a șterge ERDDAP Cache-ul Statelor Pregătite.
    
#### Securitatea Cassandra{#cassandra-security} 
Vezi? [Securizarea Cassandra](https://cassandra.apache.org/doc/latest/operating/security.html) 

Atunci când lucrați cu Cassandra, trebuie să faceți lucruri cât mai sigure și mai sigure pentru a evita să permiteți unui utilizator rău intenționat să vă afecteze Cassandra sau să obțineți acces la date la care nu ar trebui să aibă acces. ERDDAP™ încearcă să facă lucrurile într-un mod sigur, de asemenea.

* Vă încurajăm să configurați ERDDAP™ pentru a se conecta la Cassandra ca utilizator Cassandra, care are doar acces la **relevante** tabel (s) şi are doar privilegii de citire.
* Vă încurajăm să configurați conexiunea de la ERDDAP™ pentru Cassandra astfel încât aceasta
    * Întotdeauna foloseşte SSL,
    * permite doar conexiuni de la o adresă IP (sau un bloc de adrese) şi de la unul ERDDAP™ utilizator și
    * Numai transferuri de parole în formularul lor hashed MD5.
*    \\[ PROBLEME CUNOSCUTE \\] ConexiuneaProperties (Inclusiv parola&#33;) sunt stocate ca text simplu în datasets.xml . Nu am găsit o cale de a permite administratorului să introducă parola Cassandra în timpul ERDDAP A început în Tomcat (care are loc fără intrarea utilizatorului) , astfel încât parola trebuie să fie accesibil într-un fișier. Pentru a face acest lucru mai sigur:
    * Tu (nu ERDDAP™ administrator) ar trebui să fie proprietarul datasets.xml ci citeşte şi scrie.
    * Faceți un grup care include doar utilizator=tomcat. Utilizați chgrp pentru a face ca grupul pentru datasets.xml , cu doar privilegii de citit.
    * Utilizați chmod pentru a atribui privilegii o-rwx (fără acces READ sau SCRIS pentru "alți" utilizatori) pentru datasets.xml .
* Când în ERDDAP™ , parola și alte proprietăți de conectare sunt stocate în "privat" Java variabile.
* Solicitările clienților sunt parsed și verificate pentru valabilitate înainte de a genera cererile CQL pentru Cassandra.
* Solicitările adresate Cassandrei sunt făcute cu CQL Legat/PreparedStates, pentru a preveni injectarea CQL. În orice caz, Cassandra este mai puțin sensibilă la injectarea CQL decât bazele de date tradiționale la [Injecţie cu SQL](https://en.wikipedia.org/wiki/SQL_injection) .
         
#### Viteza Cassandra{#cassandra-speed} 
Cassandra poate fi rapidă sau lentă. Există unele lucruri pe care le puteți face pentru a face rapid:
* În general -
Natura CQL este că întrebările sunt [declarativ](https://en.wikipedia.org/wiki/Declarative_programming) . Ei specifică doar ce vrea utilizatorul. Ele nu includ o specificație sau indicii pentru modul în care interogarea trebuie manipulată sau optimizată. Deci nu există nici o cale pentru ERDDAP™ să genereze interogarea astfel încât să o ajute pe Cassandra să optimizeze interogarea (sau în orice mod specifică modul în care interogarea trebuie tratată) . În general, este de până la administratorul Cassandra pentru a configura lucrurile (de exemplu, indici) să optimizeze anumite tipuri de întrebări.
     
* Specificarea coloanelor de timbru temporal care sunt legate de tastele de partiție cu timbru temporal mai gros prin intermediul [&lt;partiție KeySourceNames&gt;] (#partitionkeysource names) este cel mai important mod de a ajuta ERDDAP™ să lucreze eficient cu Cassandra. Dacă această relaţie există într-o masă Cassandra şi nu spui ERDDAP™ , setul de date va fi dureros de lent în ERDDAP™ și de a folosi tone de resurse Cassandra.
     
* Specificarea coloanelor de grup prin [&lt;clusterColumnSourceNames&gt;] (#clustercoloanăsource names) este al doilea cel mai important mod de a ajuta ERDDAP™ să lucreze eficient cu Cassandra. Dacă există coloane de grup şi nu spui ERDDAP , un subset mare de posibile întrebări pentru date va fi inutil, dureros lent în ERDDAP™ și de a folosi tone de resurse Cassandra.
     
* Marca [Indice](https://cassandra.apache.org/doc/latest/cql/indexes.html) pentru variabilele obişnuite -
Puteți accelera câteva întrebări prin crearea de indici pentru coloanele Cassandra care sunt adesea constrânse cu "constrângeri=".
    
Cassandra nu poate face indexuri pentru listă, set, sau coloane de hartă.
    
* Specificarea coloanelor index prin [&lt;indexColumnSourceNames&gt;] (#Indicesourcenames) este o modalitate importantă de a ajuta ERDDAP™ să lucreze eficient cu Cassandra. Dacă există coloane index şi nu spui ERDDAP , unele întrebări pentru date va fi inutil, dureros lent în ERDDAP™ și de a folosi tone de resurse Cassandra.
     
#### Cassandra Stats{#cassandra-stats} 
*    [Mesaje de diagnostic "Cassandra stats"](#cassandra-stats) -- Pentru fiecare ERDDAP™ interogarea utilizatorului către un set de date Cassandra; ERDDAP™ va imprima o linie în fișierul jurnal, *Big ParentDirectory* /logs/log.txt, cu unele statistici legate de interogare, de exemplu,
```
        \\* Cassandra stats: partitionKeyTable: 2/10000=2e-4 < 0.1 nCassRows=1200 nErddapRows=12000 nRowsToUser=7405  
```
Folosind numerele din exemplul de mai sus, aceasta înseamnă:

* Când ERDDAP™ ultima (au) a încărcat acest set de date, a declarat Cassandra ERDDAP™ că au existat 10000 de combinații distincte ale cheilor de partiție. ERDDAP™ a cached toate combinațiile distincte într-un fișier.
* Din cauza constrângerilor utilizatorului, ERDDAP™ a identificat 2 combinații din 10000 care ar putea avea datele dorite. Deci, ERDDAP™ va efectua 2 apeluri către Cassandra, câte unul pentru fiecare combinație a cheilor de partiție. (Asta cere Cassandra.) În mod evident, este problematic dacă un set de date mare are un număr mare de combinații ale cheilor de partiție și o cerere dată nu reduce drastic acest lucru. Puteți solicita ca fiecare cerere să reducă spațiul-cheie prin setarea [&lt;maxRequestFraction&gt;] (Numărul maxim de cereri) . Aici, 2/10000=2e-4, care este mai mică decât maxRequestFraction (0, 1) , astfel încât cererea a fost permisă.
* După aplicarea constrângerilor asupra cheilor de partiție, [coloane grupate](#clustercolumnsourcenames) , și [coloane index](#indexcolumnsourcenames) care au fost trimise de ERDDAP™ , Cassandra returnat 1200 de rânduri de date la ERDDAP™ în ResultSet.
* Rezultatul Set trebuie să fi avut [date Tip = *un anumit tip* Listă](#cassandra-datatypes) Coloane (cu o medie de 10 articole pe listă) , pentru că ERDDAP™ a extins cele 1200 de rânduri din Cassandra în 12000 de rânduri în ERDDAP .
*    ERDDAP™ aplică întotdeauna toate constrângerile utilizatorului la datele de la Cassandra. În acest caz, constrângerile pe care Cassandra nu le-a manipulat au redus numărul de rânduri la 7405. Acesta este numărul de rânduri trimise utilizatorului.

Cea mai importantă utilizare a acestor mesaje de diagnosticare este de a vă asigura că ERDDAP™ face ceea ce crezi că face. Dacă nu este (De exemplu, nu reduce numărul de combinații distincte, după cum se aștepta?) Atunci poţi folosi informaţiile ca să-ţi dai seama ce se întâmplă.
 
* Cercetare și experiment pentru a găsi și stabili mai bine [&lt;conexiuneProperty&gt;] (#casilonia-connectionproperty) A lui.
 
* Verificați viteza conexiunii de rețea dintre Cassandra și ERDDAP . Dacă conexiunea este lentă, vezi dacă o poți îmbunătăți. Cea mai bună situaţie este când ERDDAP™ rulează pe un server atașat la același (Rapid) comutați ca serverul care rulează nodul Cassandra la care vă conectați.
 
* Te rog să ai răbdare. Citiți cu atenție informațiile aici și în documentația Cassandra. Experiment. Verifică-ţi munca. Dacă Cassandra... ERDDAP™ conexiunea este încă mai lent decât vă așteptați, vă rugăm să includeți schema masa Cassandra și schema ta ERDDAP™ bucată de datasets.xml şi să ne vedem [secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support) .
 
* Dacă toate celelalte nu reușesc,
ia în considerare stocarea datelor într-o colecție de NetCDF v3 .nc fișiere (Mai ales .nc fișiere care utilizează [CF Geometrii de eșantionare discrete (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Structuri de date Contiguous Ragged Array și astfel pot fi manipulate cu ERDDAP 's [Tabel EDD din NCFFile](#eddtablefromnccffiles) ) . Dacă sunt organizate logic (fiecare cu date pentru o bucată de spațiu și timp) , ERDDAP™ poate extrage date de la ei foarte repede.
         
#### Tabel EDDDe la scheletul Cassandra XML{#eddtablefromcassandra-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromCassandra" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;ipAddress>](#sourceurl)...&lt;/ipAddress>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The Cassandra URL without the port number, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;127.0.0.1 REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#cassandra-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "readTimeoutMillis") and values  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;of the Cassandra properties that ERDDAP™ needs to change.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;keyspace>...&lt;/keyspace> &lt;!-- The name of the keyspace that has  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the table. REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName> &lt;!-- The name of the table, default = "".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;partitionKeySourceNames>](#partitionkeysourcenames)...&lt;partitionKeySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;clusterColumnSourceNames>](#clustercolumnsourcenames)...&lt;clusterColumnSourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;indexColumnSourceNames>](#indexcolumnsourcenames)...&lt;indexColumnSourceNames> &lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;maxRequestFraction>](#maxrequestfraction)...&lt;maxRequestFraction>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL double between 1e-10 and 1 (the default). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#case-sensitivity)...&lt;columnNameQuotes> &lt;!-- OPTIONAL.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Options: \\[nothing\\] (the default) or ". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include a [&lt;dataType>](#datatype) tag. See  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Cassandra DataTypes](#cassandra-datatypes).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For [Cassandra timestamp columns](#cassandra-timestamp-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Tabel EDD din DapSequence{#eddtablefromdapsequence} 
 [ **Tabel EDD din DapSequence** ](#eddtablefromdapsequence) se ocupă de variabile în cadrul secvențelor 1 și 2 nivele de la [ DAP ](https://www.opendap.org/) servere cum ar fi DAP PER (a fost lahttps://www.pmel.noaa.gov/epic/software/dapper/, acum se întrerupe) .

* Vă recomandăm cu tărie utilizarea [Generează dateName Programul Xml](#generatedatasetsxml) să facă un proiect dur al datasets.xml bucată pentru acest set de date. Puteți apoi edita asta pentru a-l acorda fin. Puteți aduna informațiile de care aveți nevoie uitându-vă la fișierele DDS și DAS ale setului sursă din browser (prin adăugarea de .das și .dds la sourceUrl (un exemplu a fost lahttps://dapper.pmel.noaa.gov/dapper/epic/tao\\_time\\_series.cdp.dds).
    
* O variabilă este într- o DAP Secvența în cazul în care răspunsul .dds indică faptul că structura de date care deține variabila este o "secvență" (insensibil la caz) .
* În unele cazuri, veţi vedea o secvenţă într-o secvenţă, o secvenţă de 2 nivele -- EDDtableFromDapSequence se ocupă şi de acestea.
#### Tabel EDD De la scheletul de precizie Dap XML{#eddtablefromdapsequence-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDapSequence" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;outerSequenceName>...&lt;/outerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the outer sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;innerSequenceName>...&lt;/innerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the inner sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is OPTIONAL; use it if the DAP data is a two level  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sequence. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringEQNE>](#sourcecanconstrainstringeqne)true|false&lt;/sourceCanConstrainStringEQNE>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringGTLT>](#sourcecanconstrainstringgtlt)true|false&lt;/sourceCanConstrainStringGTLT>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringRegex>](#sourcecanconstrainstringregex)...&lt;/sourceCanConstrainStringRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;skipDapperSpacerRows>...&lt;/skipDapperSpacerRows>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- skipDapperSpacerRows specifies whether the dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;will skip the last row of each innerSequence other than the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last innerSequence (because Dapper servers put NaNs in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;row to act as a spacer).  This tag is OPTIONAL. The default  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is false.  It is recommended that you set this to true for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;all Dapper sources and false for all other data sources. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### Tabel EDD din baza de date{#eddtablefromdatabase} 
 [ **Tabel EDD din baza de date** ](#eddtablefromdatabase) se ocupă de datele dintr-un tabel de baze de date relaționale sau [vedere](https://en.wikipedia.org/wiki/View_(database) ).

#### O masă sau vizualizare{#one-table-or-view} 
Dacă datele pe care doriți să le utilizați sunt în două sau mai multe tabele (şi, astfel, are nevoie de o asociaţie pentru a extrage date din ambele tabele simultan) Trebuie să faci una. [denormalizat](https://en.wikipedia.org/wiki/Denormalization)   (deja alăturat) tabel sau [vedere](https://en.wikipedia.org/wiki/View_(SQL) ) cu toate datele pe care doriți să le puneți la dispoziție ca un set de date în ERDDAP .

Pentru baze de date mari, complexe, poate fi logic să separe mai multe bucăți ca tabele denormalizate, fiecare cu un tip diferit de date, care vor deveni seturi de date separate în ERDDAP .

Efectuarea unei mese denormalizate pentru utilizare în ERDDAP™ Poate ţi se pare o idee nebună. Ai încredere în noi. Există mai multe motive pentru care ERDDAP™ funcționează cu tabele denormalizate:

* E mult mai uşor pentru utilizatori.
Când ERDDAP™ prezintă setul de date ca unul, simplu, denormalizat, un singur tabel, este foarte ușor pentru oricine să înțeleagă datele. Cei mai mulți utilizatori nu au auzit niciodată de tabele normalizate, și foarte puțini înțeleg cheile, cheile străine, sau se alătură mesei, și aproape sigur nu știu detaliile diferitelor tipuri de uniri, sau cum să specifice SQL pentru a face o alăturare (sau mai multe îmbinări) Corect. Folosirea unei mese denormalizate evită toate aceste probleme. Numai acest motiv justifică utilizarea unui singur tabel denormalizat pentru prezentarea unui set de date ERDDAP™ utilizatori.
     
* Tabele normalizate (tabele multiple legate de coloane cheie) sunt mari pentru stocarea datelor într-o bază de date.
Dar chiar și în SQL, rezultatul care este returnat utilizatorului este un denormalizat (unite) O singură masă. Deci, pare rezonabil să prezinte setul de date utilizatorilor ca un imens, denormalizat, singur tabel din care pot solicita apoi subseturi (De exemplu, arată-mi rândurile din tabel unde temperatura &gt; 30) .
     
* Puteți face schimbări pentru ERDDAP™ fără să vă schimbaţi mesele.
     ERDDAP™ are câteva cerințe care pot fi diferite de modul în care ați înființat baza de date.
De exemplu, ERDDAP™ solicită ca datele de timp să fie stocate în câmpurile "timbru temporal cu fus orar."
Prin realizarea unui tabel/vizual separat pentru ERDDAP™ , puteți face aceste modificări atunci când face tabelul denormalizat pentru ERDDAP . Astfel, nu trebuie să faci schimbări la mesele tale.
     
*    ERDDAP™ va recrea unele dintre structura tabelelor normalizate.
Puteți specifica coloanele de date care provin din tabelele "exterior" și, prin urmare, au un număr limitat de valori distincte. ERDDAP™ va colecta toate combinațiile diferite de valori în aceste coloane și le prezintă utilizatorilor pe un special . pagina web subset care ajută utilizatorii să aleagă rapid subseturile setului de date. Valorile distincte pentru fiecare coloană sunt prezentate, de asemenea, în listele de scădere pe celelalte pagini web ale setului de date.
     
* Un tabel denormalizat face ca datele să fie transmise de la tine la ERDDAP Administrator uşor.
Tu eşti expertul pentru acest set de date, deci are sens să iei deciziile despre care tabele şi ce coloane să te alături şi cum să te alături lor. Deci, nu trebuie să ne predea (sau mai rău, utilizatorii finali) mai multe tabele şi instrucţiuni detaliate pentru cum să li se alăture, trebuie doar să ne dea acces la masa denormalizat.
     
* Un tabel denormalizat permite accesul eficient la date.
Forma denormalizată este de obicei mai rapid de acces decât forma normalizată. Alăturările pot fi lente. Multiple îmbinări pot fi foarte lente.
     

Pentru a obține datele din două sau mai multe tabele din baza de date ERDDAP™ , există trei opțiuni:
 

* Opțiunea recomandată:
Puteţi crea un fişier cu valoare separată de virgulă sau filă cu date din tabelul denormalizat.
Dacă setul de date este imens, atunci este logic să se creeze mai multe fișiere, fiecare cu un subset coeziv al tabelului denormalizat (de exemplu, date dintr-un interval de timp mai mic) .
    
Marele avantaj aici este că ERDDAP™ va fi capabil să se ocupe de cererile utilizatorilor pentru date fără nici un efort suplimentar din baza de date. Deci... ERDDAP™ Nu va fi o povară în baza ta de date sau un risc de securitate. Aceasta este cea mai bună opțiune în aproape toate circumstanțele, deoarece ERDDAP™ poate obține de obicei date din fișiere mai repede decât dintr-o bază de date (dacă vom converti fișierele .csv la .nc Fișiere CF) . (O parte din motiv este că ERDDAP +files este un sistem numai pentru citire și nu trebuie să se ocupe cu efectuarea de modificări în timp ce furnizarea [ACID](https://en.wikipedia.org/wiki/ACID)   (Atomicitate, coerență, izolare, durabilitate) .) De asemenea, probabil nu veți avea nevoie de un server separat deoarece putem stoca datele pe una dintre RAID-urile noastre și să-l acceseze cu un existent ERDDAP™ pe un server existent.
    
* Bine, opţiune:
Ai creat o nouă bază de date pe un calculator diferit cu doar masa denormalizată.
Deoarece această bază de date poate fi o bază de date gratuită și open source cum ar fi MariaDB, MySQL, și PostgreSQL, această opțiune nu trebuie să coste mult.
    
Marele avantaj aici este că ERDDAP™ va fi capabil să se ocupe de cererile utilizatorilor pentru date fără nici un efort suplimentar de baza de date curentă. Deci... ERDDAP™ Nu va fi o povară pentru baza ta de date. Acest lucru elimină, de asemenea, o mulțime de probleme de securitate deoarece ERDDAP™ nu va avea acces la baza de date curentă.
    
* Opțiunea descurajată:
Ne putem conecta. ERDDAP™ la baza de date curentă.
Pentru a face acest lucru, trebuie să:
    
    * Creați o masă separată sau o vizualizare cu tabelul de date denormalizate.
    * Creați un utilizator "erddap" care are acces numai la citire la numai tabelul denormalizat (s) .
         
    
Aceasta este o opțiune în cazul în care datele se schimbă foarte frecvent și doriți să oferiți ERDDAP™ utilizatorii acces instant la aceste modificări; totuși, chiar și așa, poate avea sens să utilizați opțiunea de fișier de mai sus și periodic (La fiecare 30 de minute?) înlocuiți fișierul care are datele de astăzi.
Dezavantajele enorme ale acestei abordări sunt: ERDDAP™ cererile utilizatorilor vor plasa probabil o povară insuportabil de mare în baza de date și că ERDDAP™ conexiunea este un risc de securitate (Deși putem minimiza / gestiona riscul) .

Realizarea mesei denormalizate sau vedere pentru ERDDAP™ este o bună oportunitate de a face câteva schimbări care ERDDAP™ Nevoile, într-un mod care nu afectează mesele originale:

* Modificarea câmpurilor/coloanelor de dată și oră pentru a utiliza tipul de date pe care îl cheamă Postgres [timbru temporal cu fus orar](#database-date-time-data)   (sau echivalentul din baza de date) .
Ștampile temporale fără informații despre fusul orar nu funcționează corect în ERDDAP .
* Asigurați indexuri pentru coloanele pe care utilizatorii caută adesea.
* Fiți foarte conștienți de [cazul denumirilor de câmp/coloană](#quotes-for-names-and-case-sensitivity)   (de exemplu, utilizați toate cazurile mici) când le scrii.
* Nu folosi cuvinte rezervate pentru tabel și pentru numele de câmp/coloană.

Dacă aveți nevoie de ajutor pentru a face masa sau vizualizarea denormalizată, vă rugăm să contactați administratorul bazei de date.
Dacă doriți să vorbiți despre această abordare sau să strategize cum cel mai bine pentru a face acest lucru, vă rugăm să trimiteți un e-mail Chris. John la Noaa.gov.
    
#### bază de date în datasets.xml  {#database-in-datasetsxml} 
Este dificil de a crea corect datasets.xml informații necesare pentru ERDDAP™ să stabilească o conexiune la baza de date. Ai răbdare. Fii metodic.
* Vă recomandăm cu tărie utilizarea [Generează dateName Programul Xml](#generatedatasetsxml) să facă un proiect dur al datasets.xml bucată pentru acest set de date. Puteți apoi edita asta pentru a-l acorda fin.
        
Generează dateName Xml are trei opțiuni speciale pentru tabelul EDDFromDatabase:
1. Dacă introduceți "&#33;&#33;LIST&#33;&#33;" (fără citate) pentru numele catalogului, programul va afișa o listă cu numele catalogului.
2. Dacă introduceți "&#33;&#33;LIST&#33;&#33;" (fără citate) pentru numele schema, programul va afișa o listă a numelor schema.
3. Dacă introduceți "&#33;&#33;LIST&#33;&#33;" (fără citate) pentru numele de tabel, programul va afișa o listă de tabele și coloanele lor. Prima intrare "&#33;&#33;LIST&#33;&#33;" pe care o faci este cea care va fi folosită.
* Citiţi cu atenţie toate informaţiile acestui document despre tabelul EDDFromDatabase.
* Puteți colecta majoritatea informațiilor de care aveți nevoie pentru a crea XML-ul pentru un set de date EDDDe la baza de date prin contactarea administratorului bazei de date și prin căutarea web-ului.
* Deși bazele de date tratează adesea numele și denumirile coloanelor într-un mod insensibil, acestea sunt sensibile la caz în ERDDAP . Deci, dacă un mesaj de eroare din baza de date spune că un nume de coloană este necunoscut (de exemplu, "Identificator necunoscut= ' *coloană\\_nume* '") chiar dacă știi că există, încercați să utilizați toate capitalele, de exemplu, *COLUMN\\_NAME* , care este de multe ori versiunea adevărată, caz-sensibilă a numelui coloanei.
* Lucrează îndeaproape cu administratorul bazei de date, care poate avea experiență relevantă. Dacă setul de date nu se încarcă, citiți [mesaj de eroare](#troubleshooting-tips) Cu grijă pentru a afla de ce.
         
#### Driver JDBC{#jdbc-driver} 
* [JDBC Driver și&lt;driverName&gt;] (#jdbc-driver) -- Trebuie să obțineți JDBC 3 corespunzătoare sau JDBC 4 driver .jar fișier pentru baza de date și
Pune-l în *Tomcat* /webapps/erddap/WEB-INF/lib după ce instalați ERDDAP . Apoi, în datasets.xml pentru acest set de date, trebuie să specificați&lt;driverName&gt; pentru acest conducător auto, care este (Din păcate) diferit de numele fișierului. Căutați pe web pentru driver-ul JDBC pentru baza de date și driverName care Java trebuie să-l folosească.
    
    * Pentru MariaDB, încearcă [https://mariadb.com/kb/en/about-the-mariadb-java-client/](https://mariadb.com/kb/en/about-the-mariadb-java-client/)   
ă&lt;Numele conducătorului auto &gt; utilizat în datasets.xml   (vezi mai jos) este probabil org.mariadb.jdbc. Şofer.
    * Pentru MySQL și Amazon RDS, încercați [https://dev.mysql.com/downloads/connector/j/](https://dev.mysql.com/downloads/connector/j/)   
ă&lt;Numele conducătorului auto &gt; utilizat în datasets.xml   (vezi mai jos) este probabil com.mysql.jdbc. Şofer.
    * Pentru Oracle , incearca [https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html) .
ă&lt;Numele conducătorului auto &gt; utilizat în datasets.xml   (vezi mai jos) este probabil Oracle.jdbc.driver. Oracle Şofer.
    * Pentru Postgresql, avem şoferul JDBC 4 de la [https://mvnrepository.com/artifact/org.postgresql/postgresql](https://mvnrepository.com/artifact/org.postgresql/postgresql)   
ă&lt;Numele conducătorului auto &gt; utilizat în datasets.xml   (vezi mai jos) este probabil org.postgresql. Şofer.
    * Pentru SQL Server, puteți obține driver-ul JTDS JDBC de la [https://jtds.sourceforge.net](https://jtds.sourceforge.net) .
ă&lt;Numele conducătorului auto &gt; utilizat în datasets.xml   (vezi mai jos) este probabil net.sourceforge.jtds.jdbc. Şofer.
    
După ce l-ai pus pe şoferul JDBC. ERDDAP™ directorul lib, aveți nevoie pentru a adăuga o referință la acel fișier .jar în .bat și/sau .sh script fișiere pentru GenerateDatasets Xml, DasDds, și ArchiveADataset care sunt în *Tomcat* /webapps/erddap/WEB-INF/ director; în caz contrar, veți obține o ClassNotFoundException atunci când executați aceste scripturi.
    
Din păcate, JDBC este uneori sursa problemelor. În rolul său de intermediar între ERDDAP™ si baza de date, uneori face modificari subtile la baza de date standard/generica SQL solicita ca ERDDAP™ creează, provocând astfel probleme (de exemplu, legate de [identificatori superiori/subclase](#quotes-for-names-and-case-sensitivity) și legate de [fus orar/date](#database-date-time-data) ) . Vă rugăm să aveţi răbdare, citiţi cu atenţie informaţiile de aici, verificaţi-vă munca, şi a vedea noastre [secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support) .
    
#### Baza de date&lt;conexiune Proprietate &gt;{#database-connectionproperty} 
* [&lt;conexiuneProperty&gt;] (#database-connectionproperty) -- În datasets.xml pentru setul de date, trebuie să definiţi mai multe conexiuni Etichete de proprietate de spus ERDDAP™ cum să vă conectaţi la baza de date (de exemplu, pentru a specifica numele de utilizator, parola, conexiunea SSL și [marime](#set-the-fetch-size) ) . Acestea sunt diferite pentru fiecare situație și sunt un pic cam greu de dat seama. Căutați pe web exemple de utilizare a unui driver JDBC pentru a vă conecta la baza de date. ă&lt;ConexiuneNumeleProperty&gt; (de exemplu, "user," "parola" și "ssl") , și unele dintre valorile de conexiuneProperty pot fi găsite prin căutarea web pentru "JDBC proprietăți de conexiune *baza de date Tip* " (de exemplu, Oracle , MySQL, Amazon RDS, MariaDB, PostgreSQL) .
     
#### Citări pentru nume și sensibilitate caz{#quotes-for-names-and-case-sensitivity} 
*    [Citate pentru nume de câmp/Culoare; Sensibilitate de caz](#quotes-for-names-and-case-sensitivity) - In mod implicit, EDDtableFromDatabase pune ansi-SQL-standard de ghilimele duble in jurul numelor de camp/coloane in declaratiile SELECT in cazul in care ati folosit un cuvant rezervat ca nume de camp/coloană, sau un caracter special intr-un nume de camp/coloană. De asemenea, citatele duble împiedică anumite tipuri de atacuri de injectare SQL. Se vede. ERDDAP™ să folosească " sau nici un citat prin intermediul&lt;coloanaNameQuotes&gt; în datasets.xml pentru acest set de date.
    
Pentru mai multe baze de date, utilizarea oricărui tip de cotații determină baza de date să lucreze cu nume de câmp/coloană într-un mod sensibil (în loc de cazul de bază de date implicit insensibil) . Bazele de date afişează adesea numele fişierelor/coloanelor ca toate cazurile superioare, când, în realitate, forma sensibilă a cazului este diferită. În ERDDAP™ , vă rugăm să tratați întotdeauna numele coloanei de bază ca fiind sensibile caz.
    
    * Pentru Maria DB, trebuie să rulați baza de date cu [\\--sql-mode=ANSI\\_quotes](https://mariadb.com/kb/en/mysql-command-line-client/) .
    * Pentru MySQL și Amazon RDS, trebuie să rulați baza de date cu [\\--sql-mode=ANSI\\_quotes](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_ansi_quotes) .
    *    Oracle suportă cotații duble standard ANSI-SQL [în mod implicit](https://docs.oracle.com/database/121/SQLRF/sql_elements008.htm#SQLRF00223) .
    * PostgreSQL suportă cotații duble standard ANSI-SQL în mod implicit.
    
      
Nu folosi un cuvânt rezervat pentru o bază de date, catalog, schema sau numele mesei. ERDDAP™ nu pune citate în jurul lor.
    
Dacă este posibil, utilizaţi toate cazurile mai mici pentru baza de date, catalog, schema, numele de masă şi numele de teren atunci când se creează tabelul de baze de date (sau vedere) și atunci când se face trimitere la denumirile de câmp/coloană din datasets.xml în ERDDAP . În caz contrar, puteți obține un mesaj de eroare spunând baza de date, catalog, schema, masă, și / sau câmp nu a fost găsit. Dacă obțineți acest mesaj de eroare, încercați să utilizați versiunea caz-sensibil, toate versiunea de sus-case, și toate versiunea de jos a numelui în ERDDAP . Unul dintre ei poate funcţiona. Dacă nu, aveți nevoie pentru a schimba numele de bază de date, catalog, schema, și / sau masa la toate cele mai mici-caz.
    
#### Baza de date&lt;date Tip&gt;{#database-datatype} 
*    [Baza de date](#database-datatype) [&lt;DataType &gt;] (#Tipul de date) Etichete... Pentru că există o ambiguitate despre care [tipuri de date din baza de date](https://www.w3schools.com/sql/sql_datatypes_general.asp) harta către care ERDDAP™ tipuri de date, aveți nevoie pentru a specifica un [&lt;DataType &gt;] (#Tipul de date) etichetă pentru fiecare [&lt; dataVariable &gt;] (#date variabile) pentru a spune ERDDAP™ ce tip de date să utilizeze. O parte a problemei este că diferite seturi de date folosesc termeni diferiţi pentru diferite tipuri de date -- aşa că întotdeauna încercaţi să potriviţi definiţiile, nu doar numele. A se vedea descrierea [standard ERDDAP™ date Tipuri](#data-types) , care include trimiteri la tipurile de date SQL corespunzătoare. [Data și ora](#database-date-time-data) sunt cazuri speciale: utilizare ERDDAP Datele duble Tip.
     
#### Date de dată a bazei de date{#database-date-time-data} 
Unele coloane de date nu au fus orar explicit. Astfel de coloane sunt probleme pentru ERDDAP . Bazele de date sprijină conceptul de dată (cu sau fără timp) fără fus orar, ca o gamă aproximativă de timp. Dar... Java   (şi astfel ERDDAP ) se ocupă doar cu date instantanee + ori cu un fus orar. Deci s-ar putea să ştiţi că data datelor se bazează pe un fus orar local (cu sau fără timp de economisire în timpul zilei) sau GMT/ Zulu fus orar, dar Java   (şi ERDDAP ) Nu. Iniţial am crezut că putem rezolva această problemă. (De exemplu, prin specificarea unui fus orar pentru coloană) , dar baza de date + JDBC + Java interacţiunile au făcut din aceasta o soluţie nesigură.
* Deci, ERDDAP™ cere ca tu stochezi toate datele de data si data din tabelul de baze de date cu un tip de date de baza de date care corespunde cu tipul JDBC "timpul cu fusul orar" (ideal, care utilizează GMT / Zulu fusul orar) .
* În ERDDAP 's datasets.xml , în&lt; dataVariable &gt; tag-ul pentru o variabilă timbru, set
    >     [&lt;dataType>double&lt;/dataType>](#datatype)  

și în&lt; addAttributes &gt; set
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Sugestie: Dacă datele sunt un interval de timp, este util să se facă referire la centrul intervalului temporal implicit (De exemplu, la prânz.) . De exemplu, în cazul în care un utilizator are date pentru 2010-03-26T13:00Z de la un alt set de date și doresc cele mai apropiate date dintr-un set de date care are date pentru fiecare zi, atunci datele bazei de date pentru 2010-03-26T12:00Z (reprezentând date pentru această dată) Este evident cel mai bun (spre deosebire de miezul nopții înainte sau după, în cazul în care este mai puțin evident care este cel mai bun) .
*    ERDDAP™ are o utilitate [Schimbă un numeric Timpul până la/de la un timp de coardă](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) .
* Vezi? [Cum ERDDAP Se ocupă de timp](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) .
       
#### Integer nuls{#integer-nulls-1} 
Baza de date suportă nuluri în număr întreg (int, smallint, smallint) coloane, dar ERDDAP™ nu susţine nulii adevăraţi.
Datele nule vor fi convertite în ERDDAP™ 127 pentru coloanele de octet, 255 pentru coloanele de ubit, 32767 pentru coloanele scurte, 65535 pentru coloanele scurte, 2147483647 pentru coloanele int, 4294967295 pentru coloanele uint, 9,223,372,036,854,775,807 pentru coloanele lungi, sau 184467440737095511615 pentru coloanele lungi. Dacă utilizați aceste cazuri implicite, vă rugăm să le identificați missing\\_value s pentru utilizatorii setului de date în ERDDAP™ cu

>    &lt;att name="\\_FillValue" [type="int"](#attributetype)\\>2147483647&lt;/att>  

sau

>    &lt;att name="\\_FillValue" [type="short"](#attributetype)\\>32767&lt;/att>  

Alternativ, puteți utiliza " missing\\_value " atribut în loc de "\\_FillValue."
Generează dateName Xml adaugă automat aceste atribute \\_FillValue atunci când generează sugestiile datasets.xml pentru seturile de date.

Pentru coloanele din baza de date plutitoare, nulii se convertesc la NaNs în ERDDAP .
Pentru tipurile de date din baza de date care sunt convertite în Strings in ERDDAP™ Nulurile se convertesc în corzi goale.
    
#### Securitatea bazei de date{#database-security} 
* Atunci când lucrați cu baze de date, trebuie să faceți lucruri cât mai sigure și în cel mai sigur mod posibil pentru a evita să permiteți unui utilizator rău intenționat să vă strice baza de date sau să obțineți acces la date la care nu ar trebui să aibă acces. ERDDAP™ încearcă să facă lucrurile într-un mod sigur, de asemenea.
    * Luați în considerare replicarea, pe un calculator diferit, baza de date și tabelele de baze de date cu datele pe care doriți ERDDAP™ pentru a servi. (Da, pentru baze de date comerciale ca Oracle , aceasta implică taxe de licențiere suplimentare. Dar pentru bazele de date deschise, cum ar fi PostgreSQL, MySQL, Amazon RDS, și MariaDB, acest lucru nu costă nimic.) Acest lucru vă oferă un nivel ridicat de securitate și, de asemenea, previne ERDDAP™ cereri de încetinire a bazei de date originale.
    * Vă încurajăm să configurați ERDDAP™ să se conecteze la baza de date ca utilizator al bazei de date care are acces numai la **relevante** baza de date (s) şi are doar privilegii de citire.
    * Vă încurajăm să configurați conexiunea de la ERDDAP™ la baza de date astfel încât să
        * Întotdeauna foloseşte SSL,
        * permite doar conexiuni de la o adresă IP (sau un bloc de adrese) şi de la unul ERDDAP™ utilizator și
        * Numai transferuri de parole în formularul lor hashed MD5.
    *    \\[ PROBLEME CUNOSCUTE \\] ConexiuneaProperties (Inclusiv parola&#33;) sunt stocate ca text simplu în datasets.xml . Nu am găsit o cale de a permite administratorului să introducă parola bazei de date în timpul ERDDAP A început în Tomcat (care are loc fără intrarea utilizatorului) , astfel încât parola trebuie să fie accesibil într-un fișier. Pentru a face acest lucru mai sigur:
        * Tu (nu ERDDAP™ administrator) ar trebui să fie proprietarul datasets.xml ci citeşte şi scrie.
        * Faceți un grup care include doar utilizator=tomcat. Utilizați chgrp pentru a face ca grupul pentru datasets.xml , cu doar privilegii de citit.
        * Utilizați chmod pentru a atribui privilegii o-rwx (fără acces READ sau SCRIS pentru "alți" utilizatori) pentru datasets.xml .
    * Când în ERDDAP™ , parola și alte proprietăți de conectare sunt stocate în "privat" Java variabile.
    * Cererile clienților sunt parsed și verificate pentru valabilitate înainte de a genera cererile SQL pentru baza de date.
    * Solicitările în baza de date sunt făcute cu SQL Pregătite Statements, pentru a preveni [Injecţie cu SQL](https://en.wikipedia.org/wiki/SQL_injection) .
    * Cererile către baza de date sunt depuse odată cu executarea Interogare (neexecutareaStatement) limitarea cererilor de citire numai (astfel încât încercarea de injectare SQL pentru a modifica baza de date va eșua din acest motiv, de asemenea,) .
         
#### SQL{#sql} 
* Pentru că OPeNDAP Cererile de date tabulare au fost concepute pentru a imita cererile de date tabulare SQL, este ușor pentru ERDDAP™ pentru a converti cererile de date tabulare în state simple SQL Pregătite. De exemplu, ERDDAP™ cerere
```
    time,temperature&time>=2008-01-01T00:00:00Z&time&lt;=2008-02-01T00:00:00Z  
```
va fi transformat în stare de pregătire SQL
```
    SELECT "time", "temperature" FROM *tableName*  
    WHERE "time" >= 2008-01-01T00:00:00Z AND "time" &lt;= 2008-02-01T00:00:00Z  
```
 ERDDAP™ cereri cu &distinct () și/sau & orderBy  ( *variabile* ) va adăuga DISTINCT și/sau ORDIN DE *variabile* la declarația SQL pregătită. În general, acest lucru va încetini foarte mult răspunsul din baza de date.
 ERDDAP™ înregistrează starea de pregătire în [log.txt](/docs/server-admin/additional-information#log) cum
```
    statement=*thePreparedStatement*  
```
Acesta va fi un text de reprezentare a statului pregătit, care poate fi ușor diferit de statul pregătit efectiv. De exemplu, în statul pregătit, vremurile sunt codificate într-un mod special. Dar în reprezentarea textului, acestea apar ca ISO 8601 data ori.
     
#### Viteza bazei de date{#database-speed} 
* Baza de date poate fi lentă. Există unele lucruri pe care le puteți face:
    * În general -
Natura SQL este că întrebările sunt [declarativ](https://en.wikipedia.org/wiki/Declarative_programming) . Ei specifică doar ce vrea utilizatorul. Ele nu includ o specificație sau indicii pentru modul în care interogarea trebuie manipulată sau optimizată. Deci nu există nici o cale pentru ERDDAP™ să genereze interogarea astfel încât să ajute baza de date să optimizeze interogarea (sau în orice mod specifică modul în care interogarea trebuie tratată) . În general, este de până la administratorul de baze de date pentru a configura lucrurile (de exemplu, indici) să optimizeze anumite tipuri de întrebări.
##### Stabilește dimensiunea{#set-the-fetch-size} 
Bazele de date returnează datele ERDDAP™ în bucăţi. În mod implicit, diferite baze de date returnează un număr diferit de rânduri în bucăți. Adesea, acest număr este foarte mic şi foarte ineficient. De exemplu, implicit pentru Oracle 10&#33; Citiți documentația JDBC pentru driver-ul JDBC al bazei de date pentru a găsi proprietatea de conectare pentru a stabili pentru a crește acest lucru, și adăugați acest lucru la descrierea setului de date în datasets.xml . De exemplu,
Pentru MySQL și Amazon RDS, utilizați
```
        <connectionProperty name="defaultFetchSize">10000</connectionProperty>  
```
Pentru MariaDB, în prezent nu există nici o modalitate de a schimba dimensiunea de preluare. Dar este o caracteristică solicitată, așa că căutați web pentru a vedea dacă acest lucru a fost implementat.
Pentru Oracle , utilizare
```
        <connectionProperty name="defaultRowPrefetch">10000</connectionProperty>  
```
Pentru PostgreSQL, utilizare
```
        <connectionProperty name="defaultRowFetchSize">10000</connectionProperty>  
```
dar nu ezitaţi să schimbaţi numărul. Setarea numărului prea mare va cauza ERDDAP™ pentru a folosi o mulțime de memorie și să fie mai probabil să rămână fără memorie.
#### Properties de conexiune{#connectionproperties} 
Fiecare bază de date are alte proprietăți de conectare care pot fi specificate în datasets.xml . Multe dintre acestea vor afecta performanța bazei de date ERDDAP™ Conexiune. Vă rugăm să citiți documentația pentru driver-ul JDBC al bazei de date pentru a vedea opțiunile. Dacă găsiţi proprietăţi de conexiune care sunt utile, vă rugăm să trimiteţi un e-mail cu detaliile erd dot data at noaa dot gov .
* Fă o masă...
Veți obține, probabil, răspunsuri mai rapide dacă periodic (În fiecare zi? ori de câte ori există date noi?) generează un tabel real (Similar cu modul în care a generat A vizualiza) şi spune ERDDAP™ pentru a obține date din tabel în loc de vedere. Deoarece orice solicitare la tabel poate fi îndeplinită fără a se alătura unui alt tabel, răspunsul va fi mult mai rapid.
* Aspiraţi tabelul -
MySQL și Amazon RDS va răspunde mult mai repede dacă utilizați [TABEL DE OPTIMIZĂ](https://dev.mysql.com/doc/refman/5.7/en/optimize-table.html) .
Maria. DB va răspunde mult mai repede dacă utilizaţi [TABEL DE OPTIMIZĂ](https://mariadb.com/kb/en/optimize-table/) .
PostgreSQL va răspunde mult mai repede dacă [VACUUM](https://www.postgresql.org/docs/8.3/static/sql-vacuum.html) Masa.
     Oracle nu are sau are nevoie de o comandă similară.
* Marca [Indice](https://en.wikipedia.org/wiki/Database_index) pentru variabilele obişnuite -
Puteți accelera mai multe/cele mai multe întrebări prin crearea de indici în baza de date pentru variabile (care baze de date numesc "coloane") care sunt adesea constrânse în interogarea utilizatorului. În general, acestea sunt aceleași variabile specificate de [&lt; subsetVariables &gt;] (#Subsetvariables) și/sau latitudinea, longitudinea și variabilele temporale.
##### Folosește gruparea conexiunii{#use-connection-pooling} 
În mod normal, ERDDAP™ face o conexiune separată la baza de date pentru fiecare cerere. Aceasta este cea mai sigură abordare. Alternativa mai rapidă este utilizarea unei DataSource care sprijină punerea în comun a conexiunilor. Pentru a seta, specifica (de exemplu)   
```
        <dataSourceName>java:comp/env/jdbc/postgres/erddap</dataSourceName>  
```
chiar lângă&lt; sourceUrl &gt;,&lt;numele conducătorului auto&gt; și&lt;conexiune Proprietate.
Şi în *Tomcat* /conf/context.xml, defini o resursă cu aceleași informații, de exemplu,
```
        <Resource  
        name="jdbc/postgres/erddap" auth="Container" type="javax.sql.DataSource"  
        driverClassName="org.postgresql.Driver"  
        url="*jdbc:postgresql://somehost:5432/myDatabaseName*"  
        username="*myUsername*" password="*myPassword*"  
        initialSize="0" maxActive="8" minIdle="0" maxIdle="0" maxWait="-1"/>  
```
Informaţii generale despre utilizarea unei DataSource este la [https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html) .
Vezi? [Informaţii despre Tomcat DataSource](https://tomcat.apache.org/tomcat-7.0-doc/jndi-resources-howto.html#JDBC_Data_Sources) şi [Tomcat DataSource exemple](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html) sau căutați pe web exemple de utilizare a DataSources cu alte servere de aplicații.
* Dacă toate celelalte nu reușesc,
ia în considerare stocarea datelor într-o colecție de NetCDF v3 .nc fișiere (Mai ales .nc fișiere care utilizează [CF Geometrii de eșantionare discrete (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Structuri de date Contiguous Ragged Array și astfel pot fi manipulate cu ERDDAP 's [Tabel EDD din NCFFile](#eddtablefromnccffiles) ) . Dacă sunt organizate logic (fiecare cu date pentru o bucată de spațiu și timp) , ERDDAP™ poate extrage date de la ei foarte repede.
         
#### Tabel EDD De la scheletul bazei de date XML{#eddtablefromdatabase-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDatabase" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The format varies for each type of database, but will be  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;something like:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MariaDB:    jdbc:mariadb://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MySql       jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Amazon RDS: jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Oracle:     jdbc:oracle:thin:@*xxx.xxx.xxx.xxx*:1521:*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Postgresql: jdbc:postgresql://*xxx.xxx.xxx.xxx*:5432/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where *xxx.xxx.xxx.xxx* is the host computer's numeric IP address  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;followed by :*PortNumber* (4 digits), which may be different for your  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;database.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[driverName](#jdbc-driver)\\>...&lt;/driverName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The high-level name of the database driver, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"org.postgresql.Driver".  You need to put the actual database  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;driver .jar file (for example, postgresql.jdbc.jar) in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*tomcat*/webapps/erddap/WEB-INF/lib.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#database-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "user", "password", and "ssl")  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and values of the properties needed for ERDDAP™ to establish  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the connection to the database.  0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataSourceName>](#use-connection-pooling)...&lt;/dataSourceName>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;catalogName>...&lt;/catalogName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the catalog which has the schema which has the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  OPTIONAL.  Some databases don't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;schemaName>...&lt;/schemaName> &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schema which has the table, default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName>  &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#quotes-for-names-and-case-sensitivity)&lt;columnNameQuotes> &lt;!-- OPTIONAL. Options:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" (the default), ', \\[nothing\\]. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderBy>...&lt;/orderBy>  &lt;!-- A comma-separated list of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[sourceName](#sourcename)s to be used in an ORDER BY clause at the end of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;every query sent to the database (unless the user's request  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;includes an &orderBy() filter, in which case the user's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;orderBy is used).  The order of the sourceNames is important.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The leftmost (first) sourceName is most important; subsequent  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are only used to break ties.  Only relevant  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are included in the ORDER BY clause for a given user  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;request.  If this is not specified, the order of the returned  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;values is not specified. Default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanOrderBy>](#sourcecanorderby)no(default)|partial|yes&lt;/sourceCanOrderBy>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanDoDistinct>](#sourcecandodistinct)no(default)|partial|yes&lt;/sourceCanDoDistinct>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each dataVariable MUST include a [&lt;dataType>](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See [Database DataTypes](#database-datatype).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For [database date and timestamp columns](#database-date-time-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Tabel EDD din EDDGrid  {#eddtablefromeddgrid} 
 [ **Tabel EDD din EDDGrid ** ](#eddtablefromeddgrid) permite crearea unui set de date EDD Table din orice EDDGrid Set de date.

* Unele motive comune sunt:
    * Acest lucru permite setului de date să fie interogat cu OPeNDAP constrângeri de selecție, care este un tip de "query by Value" (pe care un utilizator le-ar fi putut solicita) .
    * Setul de date este în mod inerent un set de date tabelar.
* Valoarea atributului global "maxAxis0" (de obicei de tip="int") , (implicit este 10) va fi utilizat pentru a limita numărul de axe \\[ 0 \\]   (de obicei "time" axă) valorile închise EDDGrid Set de date care pot fi accesate per cerere de date. Dacă nu doriți să existe nici o limită, specificați o valoare de 0. Această setare este importantă deoarece, în caz contrar, ar fi prea ușor pentru un utilizator să ceară tabelul EDDDe la EDDGrid să se uite prin toate datele setului de date. Asta ar dura mult timp şi aproape sigur ar eşua cu o eroare de pauză. Aceasta este setarea care face sigur pentru a avea EDDtableFrom EDDGrid seturile de date din ERDDAP fără teama că vor duce la o utilizare nerezonabilă a resurselor informatice.
* Dacă sunt închise EDDGrid este [ EDDGrid FromErddap](#eddfromerddap) şi ERDDAP™ E la fel. ERDDAP , apoi EDDtableFrom EDDGrid va utiliza întotdeauna versiunea disponibilă în prezent a setului de date menționat în mod direct. Acesta este un mod foarte eficient pentru tabelul EDDFrom EDDGrid pentru a accesa datele grupate.
* Clasa asta e...&lt;reîncărcare Fiecare NMuta &gt;] (#Încarcă fiecare minut) Este ceea ce contează. Închis EDDGrid 's&lt;ReloadEveryNMinutes&gt; este ignorat.
* Dacă o valoare pentru [&lt;updateEveryNMillis&gt;] (#Update everythingnmillis) este furnizat pentru acest set de date, este ignorat. Închis EDDGrid 's&lt;updateEveryNMillis&gt; este ceea ce contează.
*    [GenereazăSeturi de dateXml](#generatedatasetsxml) are o opțiune pentru tipul de set de date=EDDtabelFrom EDDGrid care cere URL- ul unui ERDDAP   (De obicei la fel. ERDDAP )   (se încheie cu "/erddap/") şi o expresie normală. Generează dateName Xml va genera apoi XML pentru un tabel EDDFrom EDDGrid Set de date pentru fiecare set de date în rețea ERDDAP™ care are datasetID care se potrivește expresiei regulate (Utilizați .\\* pentru a potrivi toate datasetID s pentru seturi de date în rețea) .
    
Bucata de XML generată de GenerateDatasetsXml pentru fiecare set de date include:
    
    * A datasetID care este EDDGrid 's datasetID plus "\\_ASATable."
    * Un nou atribut global rezumat care este EDDGrid "sumarul plus un nou prim paragraf care descrie ce este acest set de date.
    * Un nou titlu de atribut global, care este EDDGrid titlul lui plus, (Tabelul A) ".
    * Un nou atribut maxAxis0 global cu o valoare de 10.
#### Tabel EDD din EDDGrid Name{#eddtablefromeddgrid-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromEDDGrid" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromEDDGrid, this calls lowUpdate() of the underlying  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGrid. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataset>](#eddgrid)...&lt;/dataset> &lt;!-- 1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Any type of EDDGrid dataset.  You can even use an  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EDDGridFromERDDAP™ to access an independent EDDGrid dataset on  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this server. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### Tabel EDDFromFileNames{#eddtablefromfilenames} 
 [ **Tabel EDDFromFileNames** ](#eddtablefromfilenames) creează un set de date din informații despre un grup de fișiere din sistemul de fișiere al serverului, inclusiv un URL pentru fiecare fișier, astfel încât utilizatorii să poată descărca fișierele prin intermediul ERDDAP 's [ "files" sistem](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) . Spre deosebire de toate [Tabel EDD din dosare](#eddtablefromfiles) subclase, acest tip de set de date nu servește date din interiorul fișierelor.

* Tabel EDDFromFileNames este util atunci când:
    * Aveți un grup de fișiere pe care doriți să le distribuiți ca fișiere întregi deoarece acestea nu conțin "date" în același mod în care fișierele de date regulate au date. De exemplu, fișiere de imagine, fișiere video, documente Word, fișiere Excel foi de calcul, fișiere de prezentare PowerPoint sau fișiere text cu text nestructurat.
    * Aveți un grup de fișiere care au date într-un format care ERDDAP™ Încă nu ştiu să citesc. De exemplu, un format binar specific proiectului, personalizat.
         
#### Tabel EDDDe la fileName{#eddtablefromfilenames-data} 
*    [Datele dintr-un set de date EDDFromFileNames](#eddtablefromfilenames-data) este o masă care ERDDAP™ creează on-the-fly cu informații despre un grup de fișiere locale. În tabel, există un rând pentru fiecare fișier. Patru atribute speciale în [ datasets.xml pentru acest set de date](#eddtablefromfilenames-skeleton-xml) să stabilească ce fișiere vor fi incluse în acest set de date:
    
##### fișier Dir{#filedir} 
    *   &lt;fileDir&gt; -- Acest lucru specifică directorul sursă în sistemul de fișiere al serverului cu fișierele pentru acest set de date. Fișierele care sunt de fapt situate în sistemul de fișiere al serverului în&lt;fileDir&gt; va apărea în coloana url a acestui set de date într-un director virtual numithttps://*serverUrl*/erddap/files/*datasetID/*.
De exemplu, dacă datasetID este jplMU RSS T,
şi&lt;fileDir&gt; is /home/data/mur/ ,
și că directorul are un fișier numit JplMU RSS T20150103000000.png;
atunci URL-ul care va fi afișat utilizatorilor pentru acel fișier va fi
        https://*serverUrl*/erddap/jplMURSST/jplMURSST20150103000000.png.
        
Pe lângă utilizarea unui director local pentru&lt;fileDir&gt;, puteți specifica, de asemenea, URL-ul unei pagini web de la distanță, cum ar fi directorul. Acest lucru funcționează cu:
        
        * Seturi de date neexhaustive în THREDS, de exemplu,
            https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[ 2020-10-21 Acest server nu mai este disponibil în mod fiabil. \\] 
        * Seturi de date neagregate în Hyrax , de exemplu,
             [https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/) 
        * Cele mai multe liste de dosare Apache, de exemplu,
             [https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/](https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/) 
##### de la OnTheFly{#fromonthefly} 
 [\\*\\*# From The Fly #](#fromonthefly) -- Pentru nişte găleţi uriaşe S3 (cum ar fi noaa-goes17, care are 26 de milioane de fișiere) , poate dura ERDDAP™ până la 12 ore pentru a descărca toate informațiile despre conținutul găleții (și apoi există alte probleme) . Pentru a obține în jurul valorii de acest lucru, există o modalitate specială de a utiliza&lt;fileDir&gt; în EDDtableFromFileNames pentru a face un set de date cu directorul și numele fișierelor dintr-o găleată AWS S3. Setul de date nu va avea lista tuturor directoarelor și numelor de fișiere ale găleții S3 pe care un utilizator le poate căuta prin intermediul cererilor adresate setului de date. Dar setul de date va primi numele directoarelor și fișierelor pe zbor în cazul în care utilizatorul traversează ierarhia directoarelor cu setul de date "files" Opţiune. Astfel, acest lucru permite utilizatorilor să navigheze în ierarhia de fișiere și fișiere ale găleții S3 prin intermediul setului de date "files" sistem. Pentru a face acest lucru, în loc de a specifica URL-ul pentru găleata S3 ca "Starting director" (Comment Xml) sau&lt;fileDir&gt; (în datasets.xml ) , utilizați:
```
\\*\\*\\*fromOnTheFly,*theS3BucketUrl*  
```
de exemplu:
```
\\*\\*\\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/  
```
A se vedea documentația pentru [lucrează cu S3 Buckets în ERDDAP™ ](#working-with-aws-s3-files) , în special descrierea formatului specific care trebuie utilizat pentru URL-ul S3. Şi vezi
 [aceste detalii și un exemplu](#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket) de utilizare\\*\\*De la OnThe Fly.
        
##### recursiv{#recursive} 
*   &lt;recursiv&gt; -- Fișiere în subdirecții ale&lt;fileDir&gt; cu nume care se potrivesc&lt;fileRegex&gt; va apărea în aceleași subdirecții în "files" URL dacă&lt;Respinsiv&gt; este setat la adevărat. Implicit este fals.
* [&lt;CaleaRegex&gt;] (#patregex) -- Dacă recursiv=adevărat, Numai numele de director care se potrivesc cu caleaRegex (implicit=".\\*") va fi acceptat. Dacă recursiv = fals, acest lucru este ignorat. Acest lucru este rar folosit, dar poate fi foarte util în circumstanțe neobișnuite. (Vezi asta? [documentația regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) şi [tutorial regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) 
##### fileRegex{#fileregex} 
*   &lt;fileRegex&gt; -- Numai numele fișierului în cazul în care numele întregului fișier (care nu include numele dosarului) se potrivesc&lt;fileRegex&gt; va fi inclus în acest set de date. De exemplu, JplMU RSS T. &#123;14&#125;\\. png. (Vezi asta? [documentația regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) şi [tutorial regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .)   
         
##### Din numele fișierului Cuprinsul tabelului de date{#from-file-names-data-table-contents} 
În tabel vor fi coloane cu:
* Url... URL-ul pe care utilizatorii îl pot folosi pentru a descărca fișierul prin intermediul ERDDAP 's [ "files" sistem](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) .
* Numele -- Numele fișierului (fără nume de director) .
* Ultima codificată... Data la care fişierul a fost modificat ultima dată. (stocate ca dubluri cu "seconds since 1970-01-01T00:00:00Z" ) . Această variabilă este utilă deoarece utilizatorii pot vedea dacă/atunci când conținutul unui anumit fișier a fost modificat ultima dată. Această variabilă este o [timp Variabilă ștampila](#timestamp-variables) , astfel încât datele pot apărea ca valori numerice (secunde de la 1970-01-01T00:00:00Z) sau o valoare de coardă (ISO 8601:2004 (E) format) Depinde de situaţie.
* mărimea -- Dimensiunea fișierului în octeți, stocate ca duble. Acestea sunt stocate ca duble, deoarece unele fişiere pot fi mai mari decât permit int-uri şi lungi nu sunt acceptate în unele tipuri de fişiere de răspuns. Dublu va da dimensiunea exactă, chiar și pentru fișiere foarte mari.
* coloane de adăugare definite de ERDDAP™ administrator cu informații extrase din numele fișierului (de exemplu, timpul asociat cu datele din fișier) pe baza a două atribute pe care le specificați în metadate pentru fiecare coloană suplimentară/ dataVariable :
    
    * extractRegex... Aceasta este o [expresie regulată](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) . Întregul regex trebuie să corespundă întregului nume de fișier (care nu include numele dosarului) . Regexul trebuie să includă cel puțin un grup de capturare (o secțiune a unei expresii regulate care este închisă de paranteze) care ERDDAP™ folosește pentru a determina care secțiune a numelui fișierului pentru a extrage datele.
    * extract Grupul... Acesta este numărul grupului de capturare (#1 este primul grup de capturare) în expresia regulată. Implicit este 1. Un grup de capturare este o secțiune a unei expresii regulate care este închisă de paranteze.
    
Iată două exemple:
```
            <dataVariable>
                <sourceName>time</sourceName>
                <destinationName>time</destinationName>
                <dataType>String</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST(.{14})\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="units">yyyyMMddHHmmss</att>
                </addAttributes>
            </dataVariable>
```
```
            <dataVariable>
                <sourceName>day</sourceName>
                <destinationName>day</destinationName>
                <dataType>int</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST.{6}(..).{6}\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="ioos\\_category">Time</att>
                </addAttributes>
            </dataVariable> 
```
În cazul variabilei de timp, dacă un fișier are numele jplMU RSS T20150103000000.png, extractulRegex va potrivi numele fișierului, va extrage caracterele care se potrivesc cu primul grup de captură ("20150103000000") ca DataType = String, apoi utilizați [unități adecvate pentru timpii corzilor](#string-time-units) pentru a măsura șirurile în valorile datelor de timp (2015-01-03T00:00:00Z) .

În cazul variabilei de zi, dacă un fișier are numele jplMU RSS T20150103000000.png, extractulRegex va potrivi numele fișierului, va extrage caracterele care se potrivesc cu primul grup de captură ("03") ca [&lt;DataType &gt;] (#Tipul de date) \\=int, producând o valoare a datelor de 3.
        
#### Alte informații{#other-information} 
* Nu [&lt;updateEveryNMillis&gt;] (#Update everythingnmillis) -- Acest tip de set de date nu are nevoie și nu poate utiliza&lt;updateEveryNMillis&gt; tag deoarece informaţiile deservite de EDDtableFromFileNames sunt întotdeauna perfect actualizate deoarece ERDDAP™ Interoghează sistemul de fișiere pentru a răspunde fiecărei cereri de date. Chiar dacă există un număr mare de dosare, această abordare ar trebui să funcționeze destul de bine. Un răspuns poate fi lent dacă există un număr mare de fișiere și setul de date nu a fost interogat pentru o vreme. Dar pentru câteva minute după aceea, sistemul de operare păstrează informaţia într-un depozit, aşa că răspunsurile ar trebui să fie foarte rapide.
     
* Puteţi folosi [Generează dateName Programul Xml](#generatedatasetsxml) pentru a face datasets.xml bucată pentru acest tip de set de date. Puteți adăuga/defini coloane suplimentare cu informații extrase din numele fișierului, după cum se arată mai sus.
     
#### Tabel EDD FromFileNames schelete XML{#eddtablefromfilenames-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromFileNames" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileDir>](#eddtablefromfilenames-data)...&lt;/fileDir>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;recursive>](#eddtablefromfilenames-data)...&lt;/recursive>  &lt;!-- true or false (the default) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileNameRegex>](#eddtablefromfilenames-data)...&lt;/fileNameRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include [&lt;dataType>](#datatype) tag. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Tabel EDD din dosare{#eddtablefromfiles} 
 [ **Tabel EDD din dosare** ](#eddtablefromfiles) este superclasa tuturor EDD Tablelor din... clase de fişiere. Nu poţi folosi direct tabelul EDDFromFiles. În schimb, utilizați o subclasă de EDDTableFromFiles pentru a gestiona tipul specific de fișier:

*    [Tabel EDD din AsciiFiles](#eddtablefromasciifiles) date agregate din fişierele de date conta-, file-, semicolon- sau tabulare separate de spaţiu ASCII.
*    [Tabel EDD din fișiere audio](#eddfromaudiofiles) agregate de date dintr-un grup de fișiere audio locale.
*    [Tabel EDD din Fişiere AwsXml](#eddtablefromawsxmlfiles) date agregate dintr-un set de stații meteo automate (AWS) Fișiere XML.
*    [Tabel EDDDinColumnarAsciiFiles](#eddtablefromcolumnarasciifiles) date agregate din fişierele de date ASCII tabulare cu coloane de date cu lăţime fixă.
*    [Tabel EDD din Hyrax Fișiere](#eddtablefromhyraxfiles)   (DEPRECAT) date agregate cu mai multe variabile, fiecare cu dimensiuni comune (de exemplu, timpul, altitudinea (sau adâncime) , latitudine, longitudine) , și servit de un [ Hyrax   OPeNDAP server](https://www.opendap.org/software/hyrax-data-server) .
*    [Tabel EDD din InvalidCRAFile](#eddtablefrominvalidcrafiles) date agregate din NetCDF   (v3 sau v4)   .nc fișiere care utilizează o variantă specifică, invalidă, a CF DSG Contiguous Ragged Array (CRA) Dosare. Deşi... ERDDAP™ acceptă acest tip de fișier, este un tip de fișier invalid pe care nimeni nu ar trebui să înceapă să-l utilizeze. Grupurile care utilizează în prezent acest tip de fișier sunt puternic încurajate să utilizeze ERDDAP™ să genereze fișiere DSG CRA valabile și să înceteze să mai utilizeze aceste fișiere.
*    [Tabel EDD De la JsonlCSVFiles](#eddtablefromjsonlcsvfiles) date agregate din [JSON Linii fișiere CSV](https://jsonlines.org/examples/) .
*    [Tabel EDD Din mai multe DosareNc](#eddtablefrommultidimncfiles) date agregate din NetCDF   (v3 sau v4)   .nc   (sau [ .nc ml](#ncml-files) ) fișiere cu mai multe variabile, fiecare cu dimensiuni comune (de exemplu, timpul, altitudinea (sau adâncime) , latitudine, longitudine) .
*    [Tabel EDDFromNcFiles](#eddtablefromncfiles) date agregate din NetCDF   (v3 sau v4)   .nc   (sau [ .nc ml](#ncml-files) ) fișiere cu mai multe variabile, fiecare cu dimensiuni comune (de exemplu, timpul, altitudinea (sau adâncime) , latitudine, longitudine) . Este bine să continuăm să folosim acest tip de set de date pentru seturile de date existente, dar pentru noi seturi de date recomandăm utilizarea tabelului EDDFromMultidimNcFiles în schimb.
*    [Tabel EDD din NCFFile](#eddtablefromnccffiles) date agregate din NetCDF   (v3 sau v4)   .nc   (sau [ .nc ml](#ncml-files) ) fișiere care utilizează unul dintre formatele de fișiere specificate de [CF Geometrii de eșantionare discrete (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Convenţii. Dar pentru fișiere care utilizează una dintre variantele multidimensionale CF DSG, utilizați [Tabel EDD Din mai multe DosareNc](#eddtablefrommultidimncfiles) În schimb.
*    [Tabel EDD de la NCCSvFiles](#eddtablefromnccsvfiles) date agregate din [NCCSV](/docs/user/nccsv-1.00) Fișiere ASCII.csv.
*    [Tabel EDD din dosare de parchet](#eddtablefromparquetfiles) se ocupă de datele de la [Parchet](https://parquet.apache.org/) .
*    [Tabel EDD de la trei fișiere](#eddtablefromthreddsfiles)   (DEPRECAT) agregate date din fișiere cu mai multe variabile cu dimensiuni comune deservite de a [PREGĂTIRI OPeNDAP server](https://www.unidata.ucar.edu/software/tds/) .
*    [Tabel EDD din WFS Fișiere](#eddtablefromwfsfiles)   (DEPRECAT) face o copie locală a tuturor datelor dintr-o ArcGIS MapServer WFS server astfel încât datele să poată fi re-servate rapid la ERDDAP™ utilizatori.

În prezent, nu sunt acceptate alte tipuri de fișiere. Dar este, de obicei, relativ ușor pentru a adăuga suport pentru alte tipuri de fișiere. Contactaţi-ne dacă aveţi o cerere. Sau, în cazul în care datele dvs. este într-un format de fișier vechi pe care doriți să se mute departe, vă recomandăm convertirea fișierelor să fie NetCDF v3 .nc fișiere (şi în special .nc fișiere cu [CF Geometrii de eșantionare discrete (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Structura de date Contiguous Ragged Array - ERDDAP™ poate extrage date de la ei foarte repede) . NetCDF este un format binar pe scară largă, permite accesul aleatoriu rapid la date și este deja sprijinit de ERDDAP .

#### Detalii din dosare{#fromfiles-details} 
Următoarele informații se aplică tuturor subclaselor de EDDtableFromFiles.
##### Agregare{#aggregation} 
Această clasă agregate date din fișiere locale. Fiecare fișier deține un (relativ) tabel mic de date.
    * Setul de date rezultat apare ca și cum toate tabelele fișierului ar fi fost combinate (toate rândurile de date din fișierul #1, plus toate rândurile din fișierul #2, ...) .
    * Fişierele nu trebuie să aibă toate variabilele specificate. Dacă un anumit fișier nu are o variabilă specificată, ERDDAP™ va adăuga valorile lipsă după cum este necesar.
    * Variabilele din toate fișierele TREBUIE să aibă aceleași valori pentru [ add\\_offset ](#scale_factor) , [ missing\\_value ](#missing_value) , [\\_Fill Valoare](#missing_value) , [ scale\\_factor ](#scale_factor) , și [unități](#units) atribute (dacă este cazul) . ERDDAP™ controale, dar este un test imperfect - dacă există valori diferite, ERDDAP nu știe ce este corect și, prin urmare, care fișiere sunt invalide. Dacă aceasta este o problemă, ați putea fi capabil de a utiliza [NcML](#ncml-files) sau [ NCO ](#netcdf-operators-nco) pentru a rezolva problema.
         
##### Fișiere comprimate{#compressed-files} 
Fișierele sursă de date pentru toate subclasele EDDTableFromFiles pot fi comprimate extern (de exemplu, .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 , sau .Z) . Vezi [Documentație fișiere comprimate extern](#externally-compressed-files) .
     
##### Informații despre fișier cached{#cached-file-information-1} 
* Când un set de date EDDFromFiles este încărcat pentru prima dată, tabelul EDDFromFiles citește informații din toate fișierele relevante și creează tabele (un rând pentru fiecare fișier) cu informații despre fiecare fișier valabil și fiecare "rău" (diferită sau invalidă) Dosar.
    * Tabelele sunt, de asemenea, stocate pe disc, ca NetCDF v3 .nc fișiere în *Big ParentDirectory* /Set de date/ *Ultima 2CharsOfDatasetID* / * datasetID * / în fișiere numite:
dirtable .nc   (care deţine o listă cu nume de directoare unice) ,
fișier Tabel .nc   (care conține tabelul cu informațiile fiecărui fișier valabil) ,
Dosare rele .nc   (care deține tabelul cu informațiile fiecărui fișier rău) .
    * Pentru a accelera accesul la un set de date EDDFromFiles (dar în detrimentul utilizării mai multor amintiri) , puteți folosi
[&lt;Tabel fișier în memorie &gt; adevărat&lt;/FiletableInMemory&gt;] (#Filetableinmemory)   
pentru a spune ERDDAP™ pentru a păstra o copie a tabelelor de informații fișiere în memorie.
    * Copia tabelelor de informații fișiere pe disc este, de asemenea, utilă atunci când ERDDAP™ este închis și repornit: salvează tabelul EDD De la Dosare de la necesitatea de a reciti toate fișierele de date.
    * Atunci când un set de date este reîncărcat, ERDDAP™ trebuie doar să citească datele din fișiere și fișiere noi care s-au schimbat.
    * Dacă un fișier are o structură diferită de celelalte fișiere (de exemplu, un tip de date diferit pentru una dintre variabile sau o valoare diferită pentru " [unități](#units) " atribut) , ERDDAP adaugă fișierul la lista de fișiere "rele." Informații despre problema cu fișierul va fi scris la *Big ParentDirectory* /logs/log.txt file.
    * Nu ar trebui niciodată să ștergeți sau să lucrați cu aceste fișiere. O excepție este: dacă sunteți încă face modificări la un set de date datasets.xml configurare, ați putea dori să ștergeți aceste fișiere pentru a forța ERDDAP™ pentru a reciti toate fișierele, deoarece fișierele vor fi citite/interpretate diferit. Dacă vreodată trebuie să ștergeți aceste fișiere, o puteți face atunci când ERDDAP™ Fuge. (Apoi setați un [pavilion](/docs/server-admin/additional-information#set-dataset-flag) pentru a reîncărca setul de date cât mai curând posibil.) Cu toate acestea, ERDDAP™ de obicei observă că datasets.xml informațiile nu se potrivesc cu fișierul Informații de masă și șterge automat tabelele de fișiere.
    * Dacă doriți să încurajați ERDDAP™ actualizarea informațiilor privind seturile de date stocate (de exemplu, dacă ați adăugat, eliminat sau ați schimbat unele fișiere în dosarul de date al setului de date) , utilizaţi [Sistemul de pavilion](/docs/server-admin/additional-information#flag) să forţeze ERDDAP™ pentru a actualiza informațiile din fișierul cached.
         
##### Cereri de manipulare{#handling-requests-1} 
*    ERDDAP™ Cererile de date tabulare pot impune constrângeri asupra oricărei variabile.
    * Atunci când cererea de date a unui client este procesată, EDDtableFromFiles poate căuta rapid în tabel cu informațiile valabile din fișier pentru a vedea care fișiere ar putea avea date relevante. De exemplu, în cazul în care fiecare fișier sursă are datele pentru o geamandură cu localizare fixă, EDDtableFromFiles poate determina foarte eficient care fișiere ar putea avea date într-o anumită gamă de longitudine și latitudine.
    * Deoarece tabelul de informații de fișiere valide include valoarea minimă și maximă a fiecărei variabile pentru fiecare fișier valabil, EDDTableFromFiles poate adesea să gestioneze și alte întrebări destul de eficient. De exemplu, în cazul în care unele dintre geamanduri nu au un senzor de presiune a aerului, și un client solicită date pentru AirPressure&#33;=NaNaN, EDDtableFromFiles poate determina eficient care geamanduri au date privind presiunea aerului.
         
##### Actualizarea informațiilor din fișierul Cached{#updating-the-cached-file-information-1} 
Ori de câte ori setul de date este reîncărcat, informațiile din fișier cache sunt actualizate.
    
* Setul de date este reîncărcat periodic, astfel cum este determinat de&lt;reîncărcareEveryNMinutes&gt; în informațiile setului de date în datasets.xml .
* Setul de date este reîncărcat cât mai curând posibil ori de câte ori ERDDAP™ detectează că ați adăugat, eliminat, [Touch'd](https://en.wikipedia.org/wiki/Touch_(Unix) ) (pentru a schimba ultimul fișier Timp modificat) Sau a schimbat un fişier de date.
* Setul de date este reîncărcat cât mai curând posibil dacă utilizaţi [Sistemul de pavilion](/docs/server-admin/additional-information#flag) .

Atunci când setul de date este reîncărcat, ERDDAP™ compară fișierele disponibile în prezent cu tabelul de informații privind fișierul cached. Fişierele noi sunt citite şi adăugate la tabelul de fişiere valide. Fișierele care nu mai există sunt retrase din tabelul de fișiere valide. Fișierele în care marca temporală a fișierului a fost modificată sunt citite și informațiile lor sunt actualizate. Noile tabele înlocuiesc mesele vechi din memorie și pe disc.
     
##### Fișiere proaste{#bad-files-1} 
Tabelul de fișiere rele și motivele pentru care fișierele au fost declarate rele (fișier corupt, variabile lipsă, valori incorecte ale axei etc.) este trimis prin e-mail Totul Adresa de email (Probabil tu.) de fiecare dată când setul de date este reîncărcat. Ar trebui să înlocuiți sau să reparați aceste fișiere cât mai curând posibil.
     
##### Variabile lipsă{#missing-variables-1} 
Dacă unele dintre dosare nu au unele dintre dataVariable s definite în setul de date datasets.xml Chunk, e în regulă. Când EDDtableFromFiles citește unul dintre aceste fișiere, va acționa ca și cum fișierul ar avea variabila, dar cu toate valorile lipsă.
     
##### Date în timp real{#near-real-time-data} 
* EDDTabelFromFiles tratează cererile de date foarte recente ca un caz special. Problema: Dacă fișierele care alcătuiesc setul de date sunt actualizate frecvent, este probabil ca setul de date să nu fie actualizat de fiecare dată când un fișier este modificat. Deci, EDD TableFromFiles nu va fi conștient de fișierele modificate. (Ai putea folosi [Sistemul de pavilion](/docs/server-admin/additional-information#flag) , dar acest lucru ar putea duce la ERDDAP™ reîncărcarea setului de date aproape continuu. În majoritatea cazurilor, nu-l recomandăm.) În schimb, tabelul EDDFromFiles tratează acest lucru prin următorul sistem: Când ERDDAP™ primește o cerere de date în ultimele 20 de ore (De exemplu, acum 8 ore până acum) , ERDDAP™ va căuta toate fișierele care au orice date în ultimele 20 de ore. Astfel, ERDDAP™ nu trebuie să aibă date perfect actualizate pentru toate fișierele pentru a găsi cele mai recente date. Ar trebui să setați încă [&lt;reîncărcare Fiecare NMuta &gt;] (#Încarcă fiecare minut) la o valoare relativ mică (de exemplu, 60) , dar nu trebuie să fie mic (de exemplu, 3) .
     
    *    **Nu se recomandă** organizarea de date aproape în timp real în fișiere: Dacă, de exemplu, aveți un set de date care stochează date pentru numeroase stații (sau geamandură sau traiectorie, ...) Timp de mulți ani, ai putea aranja fișierele astfel încât, de exemplu, există un fișier pe stație. Dar apoi, de fiecare dată când sosesc date noi pentru o stație, trebuie să citiți un fișier mare vechi și să scrieți un fișier mare nou. Şi când ERDDAP™ reîncarcă setul de date, observă că unele fișiere au fost modificate, așa că citește acele fișiere complet. E ineficient.
         
    *    **Recomandat** organizarea de date aproape în timp real în fișiere: A se păstra datele în bucăți, de exemplu, toate datele pentru o stație/buoy/traiectorie timp de un an (sau o lună) . Apoi, atunci când un nou Datum soseşte, numai dosarul cu acest an (sau luna) datele sunt afectate.
        
        * Cel mai bun: Utilizare NetCDF v3 .nc fișiere cu dimensiune nelimitată (timp) . Apoi, pentru a adăuga date noi, puteți adăuga doar noile date fără a fi nevoie să citiți și să rescrieți întregul fișier. Schimbarea se face foarte eficient și în esență atomic, astfel încât fișierul nu este niciodată într-o stare inconsecventă.
        * În caz contrar: Dacă nu/nu puteți utiliza .nc fișiere cu dimensiune nelimitată (timp) , apoi, atunci când aveți nevoie pentru a adăuga date noi, trebuie să citiți și să rescrieți întregul fișier afectat (Sper că e mică pentru că are doar un an. (sau luna) valoarea datelor) . Din fericire, toate fișierele pentru anii precedenți (sau luni) pentru că staţia rămâne neschimbată.
        
În ambele cazuri, când ERDDAP™ reîncărcați setul de date, majoritatea fișierelor sunt neschimbate; doar câteva, fișiere mici s-au schimbat și trebuie citite.
         
##### Directori{#directories-1} 
Fișierele pot fi într-un singur director, sau într-un director și subdirectoarele sale (recursiv) . Dacă există un număr mare de fișiere (de exemplu &gt; 1, 000) , sistemul de operare (şi astfel tabelul EDDFromFiles) va funcționa mult mai eficient dacă stocați fișierele într-o serie de subdirecții (unul pe an sau unul pe lună pentru seturi de date cu fișiere foarte frecvente) , astfel încât nu există niciodată un număr mare de fișiere într-un director dat.
     
##### Directore la distanţă şi cereri la distanţă HTTP{#remote-directories-and-http-range-requests-1} 
*    **Directore la distanţă şi cereri la distanţă HTTP**   (AKA BYTE Serving, Octet Range Cereri) --
     EDDGrid DinNcFiles, EDDTabelFromMultidimNcFiles, EDDTabelFromNcFiles, și EDDTabelFromNcFFiles, poate servi uneori date de la .nc fișiere pe servere la distanță și accesate prin HTTP dacă serverul suportă [Servire octet](https://en.wikipedia.org/wiki/Byte_serving) prin cereri din domeniul HTTP (mecanismul HTTP pentru servirea octetului) . Acest lucru este posibil deoarece netcdf-java (care ERDDAP™ folosește pentru a citi .nc fișiere) suportă citirea datelor de la distanță .nc fișiere prin cereri de gamă HTTP.
    
     **Nu face asta&#33;**   
În schimb, utilizați [&lt;cacheFromUrl&gt; sistem] (#cachefromurl) .
    
##### CacheFromUrl{#cachefromurl} 
* [ ** &lt;CacheFromUrl&gt; ** ] (#cachefromurl) -
Toate EDDGrid Din Dosare și toate seturile de date EDDFromFiles susțin un set de etichete care indică ERDDAP™ pentru a descărca și menține o copie a tuturor fișierelor unui set de date la distanță, sau un depozit de câteva fișiere (descărcat după cum este necesar) . **Aceasta este o caracteristică incredibil de utilă.** 
    * ă&lt;cacheFromurl&gt; tag vă permite să specificați un URL cu o listă a fișierelor unui set de date la distanță dintr-o listă de fișiere la distanță.
        
        * Seturi de date neexhaustive în THREDS, de exemplu,
            https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[ 2020-10-21 Acest server nu mai este disponibil în mod fiabil. \\] 
        * Seturi de date neagregate în Hyrax , de exemplu,
             [https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/) 
        * Cele mai multe liste de dosare Apache, de exemplu,
             [https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/](https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/) 
        * găleți S3, de exemplu,
             [https://noaa-goes17.s3.us-east-1.amazonaws.com/](https://noaa-goes17.s3.us-east-1.amazonaws.com/)   
Cu toate acestea, acest lucru poate necesita un cont AWS și mai multe configurare.
Vezi? [lucrează cu S3 Buckets în ERDDAP™ ](#working-with-aws-s3-files) .
De asemenea, de obicei nu trebuie să utilizați cache FromUrl cu fișiere în găleți S3 dacă fișierele sunt fișiere ASCII (de exemplu, .csv.) , pentru că ERDDAP™ poate citi eficient datele din găleată direct printr-un pârâu.
        
         ERDDAP™ va copia sau cache aceste fișiere în setul de date&lt;fileDir&gt; director. Dacă aveți nevoie de sprijin pentru un alt tip de listă de fișiere la distanță (De exemplu, FTP) Te rog trimite-i cererea ta lui Chris. John la Noaa.gov.
        
        * Valoarea implicită pentru&lt;tag-ul nul. Dacă nu specificaţi o valoare pentru&lt;cacheFromurl&gt; tag, sistemul de copiere/cache nu va fi utilizat pentru acest set de date.
        * Dacă setul de date este&lt;fileRegex&gt; Setarea este altceva decât .\\*, ERDDAP™ va descărca doar fișiere care se potrivesc cu fișierulRegex.
        * Dacă setul de date este&lt;Setarea recursivă &gt; este adevărată și fișierele la distanță sunt în subdirecții; ERDDAP™ va căuta în subdirectoare de la distanță care se potrivesc setului de date [&lt;CaleaRegex&gt;] (#patregex) , crea aceeași structură director local, și a pus fișierele locale în aceleași subdirecții.
        * In Genereaza date Xml, dacă specificați un&lt;cacheFromUrl&gt; valoare, Genera Setări de date Xml va crea local&lt;fileDir&gt; director și copia 1 fișier la distanță în ea. Generează dateName Xml va genera apoi datasets.xml bucată bazată pe acel fișier de eșantionare (specificați eșantionul Fișier=nimic) .
        * Dacă sursa de date este la distanță ERDDAP™ , utilizare [ EDDGrid FromErddap](#eddfromerddap) sau [Tabel EDD FromErddap](#eddfromerddap) în loc de&lt;Cache FromUrl&gt;. În acest fel, local ERDDAP™ va părea să aibă setul de date, dar nu va trebui să stocheze datele la nivel local. Singurul motiv pentru a utiliza&lt;CacheFromurl&gt; pentru a obține date de la o distanță ERDDAP™ este atunci când aveți un alt motiv pentru care doriți să aveți o copie locală a fișierelor de date. În acest caz:
            * Acest set de date va încerca să subscrie la setul de date de la distanță ERDDAP astfel încât modificările setului de date să numească steagul acestui set de date Url, provocând acest set de date locale pentru a reîncărca și descărca fișierele de la distanță modificate. Astfel, setul de date local va fi actualizat foarte curând după efectuarea modificărilor la setul de date la distanță.
            * Ar trebui să trimiteți un e-mail administratorului telecomenzii ERDDAP™ să ceară datasets.xml pentru setul de date de la distanță, astfel încât să puteți face setul de date în local ERDDAP™ arata ca setul de date în telecomanda ERDDAP .
        * Dacă sursa de date este la distanță ERDDAP™ , setul de date local va încerca să se aboneze la setul de date de la distanță.
            * Dacă abonamentul reușește, ori de câte ori telecomanda ERDDAP reîncarcă și are date noi, va contacta flagURL pentru acest set de date, determinându-l să reîncărcați și să descarce noile fișiere de date și/sau modificate.
            * Dacă abonamentul nu reușește (Pentru orice motiv) sau dacă doriți pur și simplu să vă asigurați că setul de date local este actualizat, puteți stabili un [pavilion](/docs/server-admin/additional-information#flag) pentru setul de date local, astfel încât acesta va reîncărca, astfel încât va verifica pentru noi și/sau a schimbat fișiere de date la distanță.
        * Dacă sursa de date nu este o telecomandă ERDDAP : setul de date va verifica fișierele noi și/sau modificate de la distanță ori de câte ori reîncărca. În mod normal, acest lucru este controlat de [&lt;reîncărcare Fiecare NMuta &gt;] (#Încarcă fiecare minut) . Dar dacă știi când există noi fișiere de la distanță, puteți seta un [pavilion](/docs/server-admin/additional-information#flag) pentru setul de date local, astfel încât acesta va reîncărca și verifica pentru fișiere noi și/sau modificate de la distanță. Dacă acest lucru se întâmplă de obicei la un anumit moment al zilei (De exemplu, la ora 7:00.) , puteți face un loc de muncă cron pentru a utiliza curl pentru a contacta steagul Url pentru acest set de date, astfel încât va reîncărca și verifica pentru noi și / sau a schimbat fișiere de date la distanță.
    * ă&lt;cacheSizeGB&gt; etichetă specifică dimensiunea cache-ului local. Probabil trebuie să foloseşti asta doar atunci când lucrezi cu sisteme de stocare a norilor. [Amazon S3](https://aws.amazon.com/s3/) care este un sistem de stocare utilizat în mod obișnuit care face parte din [Amazon Web Services (AWS) ](https://aws.amazon.com/) . Implicit este -1.
        * Dacă valoarea este&lt;0, 0 (de exemplu, valoarea implicită de -1) ,
             ERDDAP™ va descărca și menține o **copie completă** din toate fișierele setului de date la distanță din setul de date&lt;fileDir&gt;.
            * Acesta este setul recomandat ori de câte ori este posibil.
            * De fiecare dată când setul de date este reîncărcat, el compară numele, dimensiunile, și ultimaModificare ori fișierelor la distanță și fișierele locale, și descarcă orice fișiere la distanță care sunt noi sau s-au schimbat.
            * Dacă un fișier care a fost pe serverul de la distanță dispare, ERDDAP™ nu va șterge fișierul local corespunzător (Altfel, dacă ceva a fost temporar în neregulă cu serverul de la distanță, ERDDAP™ s-ar putea șterge unele sau toate fișierele locale&#33;) .
            * Cu acest cadru, de obicei, va stabili&lt;Actualizează EveryNMillis&gt; to -1, deoarece setul de date este conştient de momentul în care a copiat noile fişiere de date în vigoare.
        * Dacă valoarea este &gt; 0,
             ERDDAP™ va descărca fișiere din setul de date de la distanță, după cum este necesar într-un local **cache** (în setul de date)&lt;fileDir&gt;) cu un prag al numărului specificat de GB.
            * Cache-ul trebuie să fie suficient de mare pentru a deține cel puțin mai multe fișiere de date.
            * În general, cu atât mai mare cache, cu atât mai bine, deoarece următorul fișier de date solicitate va fi mai probabil să fie deja în cache.
            * Cachingul trebuie utilizat numai atunci când: ERDDAP™ rulează într-un server de cloud computing (De exemplu, o instanță de calcul AWS) și fișierele la distanță într-un sistem de stocare în cloud (De exemplu, AWS S3) .
            * Atunci când spațiul de disc utilizat de fișierele locale depășește cache SizeGB, ERDDAP™ în curând (Poate nu imediat.) șterge unele dintre fișierele cached (în prezent, pe baza celor mai puțin utilizate recent (LRU) algoritm) până când spațiul de disc utilizat de fișierele locale este&lt;0,75\\*cacheSizeGB ("Scopul") . Da, există cazuri în care LRU efectuează foarte rău -- nu există un algoritm perfect.
            *    ERDDAP™ nu va încerca niciodată să ștergeți un fișier cached care ERDDAP™ a început să se utilizeze în ultimele 10 secunde. Acesta este un sistem imperfect pentru a face față sistemului cache și sistemului de citire a fișierelor de date fiind doar slab integrat. Din cauza acestei reguli, ERDDAP™ s-ar putea să nu poată șterge suficiente fișiere pentru a-și atinge scopul, caz în care va imprima un avertisment către fișierul log.txt, iar sistemul va pierde o mulțime de timp încercând să taie cache-ul, și este posibil ca dimensiunea fișierelor din cache să depășească foarte mult cacheSizeGB. În cazul în care acest lucru se întâmplă vreodată, utilizați un CacheSizeGB mai mare setarea pentru acel set de date.
            * În prezent, ERDDAP™ nu verifică niciodată dacă serverul de la distanță are o versiune mai nouă a unui fișier care este în cache-ul local. Dacă aveți nevoie de această caracteristică, vă rugăm să trimiteți un e-mail lui Chris. John la Noaa.gov.
        * Deși utilizarea acelorași nume de etichete ar putea implica faptul că sistemul de copiere și sistemul de cache utilizează același sistem de bază, acest lucru nu este corect.
            * Sistemul de copiere începe proactiv sarcinileThread pentru a descărca fișiere noi și modificate de fiecare dată când setul de date este reîncărcat. Numai fișierele care au fost de fapt copiate în directorul local sunt disponibile prin intermediul ERDDAP™ Set de date.
            * Sistemul de cache primește lista de fișiere la distanță de fiecare dată când setul de date este reîncărcat și pretinde că toate aceste fișiere sunt disponibile prin intermediul ERDDAP™ Set de date. Interesant, toate fișierele de la distanță apar chiar și în /fișierele/ paginile web ale setului de date și sunt disponibile pentru descărcare (deși poate doar după o întârziere în timp ce fișierul este descărcat pentru prima dată de la serverul de la distanță la cache-ul local.) 
        * Datele care utilizează cacheSizeGB pot beneficia de utilizarea unui [nThreads](#nthreads) setarea mai mare de 1, deoarece acest lucru va permite setului de date să descarce mai mult de 1 fișier la distanță la un moment dat.
    * ă&lt;tag-ul cachePartialPathRegex&gt; este o etichetă rar utilizată care poate specifica o alternativă pentru setul de date [&lt;CaleaRegex&gt;] (#patregex) . Implicit este nul.
        * Utilizați acest lucru numai dacă copiați întregul set de date prin implicit&lt;cacheSizeGB&gt; valoarea de -1. cu&lt;CacheSizeGB&gt; valori de &gt;1, acest lucru va fi ignorat deoarece este lipsit de sens.
        * A se vedea [documentaţia pentru&lt;CaleaRegex&gt;] (#patregex) pentru ghidarea modului de construire a regexului.
        * Dacă acest lucru este specificat, acesta va fi utilizat de fiecare dată când setul de date este reîncărcat, cu excepția primei reîncărcări a setului de date la începutul unei luni.
        * Acest lucru este util atunci când setul de date de la distanță este stocat într-un labirint de subdirecții și când marea majoritate a acestor fișiere rareori, dacă vreodată, se schimbă. (&lt;tuse &gt; NASA&lt;tuse &gt;) Aţi putea, de exemplu, să specificaţi&lt;CachePartialPathRegex&gt; care se potrivește doar anul curent sau luna curentă. Aceste reguli sunt foarte dificil de specificat, deoarece toate numele parţiale şi complete ale traseului trebuie să se potrivească&lt;cachePartialPathRegex&gt; și deoarece&lt;CachePartialPathRegex&gt; trebuie să lucreze cu URL-urile la distanță și directoarele locale. Un exemplu real este:
```
            <cacheFromUrl>https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/</cacheFromUrl>  
            \\>!-- \\[2020-10-21 This server is no longer reliably available.\\] For most types of remote directories, omit the filename (e.g., contents.html for Hyrax). -->  
            <fileDir>/u00/satellite/MUR41/</fileDir>  
            <fileNameRegex>\\*\\.nc</fileNameRegex>  
            <recursive>true</recursive>  
            <pathRegex>.\\*</pathRegex>  
            <cachePartialPathRegex>.\\*/v4\\.1/(|2018/(|01./))</cachePartialPathRegex>  
```
URL-ul eșantion de mai sus are fișiere în subdirectoare bazate pe an (De exemplu, 2018) și ziua anului (De exemplu, 001, 002, ..., 365 sau 366) .
Notă:&lt;cachePartialPathRegex&gt; începe cu .\\*,
are apoi un subdosar specific care este comun URL-urilor la distanță și directoarelor locale, de exemplu, /v4\\.1/
apoi are o serie de grupuri de capturare cuiburi în cazul în care prima opțiune este nimic
și a doua opțiune este o valoare specifică.
            
Exemplul de mai sus se va potrivi doar cu directoarele pentru a doua zi a anului 2018, de exemplu,
            https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/2018/010/  \\[ 2020-10-21 Acest server nu mai este disponibil în mod fiabil. \\]   
și ziua 011, 012, ..., 019.
             (Vezi asta? [documentația regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) şi [tutorial regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .)   
Dacă ai nevoie de ajutor pentru a crea&lt;cachePartialPathRegex&gt;, vă rugăm să trimiteți e-mail&lt;Cache FromUrl&gt; to Chris. John la Noaa.gov.
            
        * O abordare comună: Dacă doriţi să utilizaţi&lt;cachePartialPathRegex&gt;, nu-l utilizați inițial, pentru că doriți ERDDAP™ pentru a descărca toate fișierele inițial. După ERDDAP™ a descărcat toate fișierele, adăugați-l la bucata setului de date de datasets.xml .
             
##### Mii de fișiere{#thousands-of-files} 
În cazul în care setul de date are multe mii de fișiere, ERDDAP™ pot fi lente pentru a răspunde cererilor de date din setul respectiv. Sunt două probleme aici:
 

1. Numărul de fișiere pe director.
Intern, ERDDAP™ funcționează cu aceeași viteză, indiferent dacă n fișierele sunt într-un singur director sau sunt dispersate în mai multe directoare.
     
Dar există o problemă: Cu cât mai multe fișiere într-un anumit director, cu atât mai lent sistemul de operare este la returnarea lista de fișiere în directorul (pe fișier) la ERDDAP . Timpul de răspuns ar putea fi O (n log n) . Este greu de spus cât de multe fișiere într-un director este prea multe, dar 10.000 este, probabil, prea multe. Deci, în cazul în care configurarea dumneavoastră generează o mulțime de fișiere, o recomandare aici ar putea fi: pune fișierele în subdirecții organizate logic (De exemplu, stație sau stație/an) .
    
Un alt motiv pentru a utiliza subdirecții: în cazul în care un utilizator dorește să utilizeze ERDDAP 's "files" sistem de a găsi numele celui mai vechi fișier pentru stația X, este mai rapid și mai eficient în cazul în care fișierele sunt în subdirecții stație/an, deoarece mult mai puține informații trebuie să fie transferate.
    
2. Numărul total de dosare.
Pentru seturi de date tabelare, ERDDAP™ păstrează evidența gamei de valori pentru fiecare variabilă din fiecare fișier. Când un utilizator face o cerere, ERDDAP™ trebuie să citească toate datele din toate fișierele care ar putea avea date care corespund cererii utilizatorului. Dacă utilizatorul solicită date dintr-un timp limitat (de exemplu, o zi sau o lună) , atunci ERDDAP™ nu va trebui să deschidă prea multe fișiere în setul de date. Dar există cazuri extreme în care aproape fiecare fișier ar putea avea date de potrivire (De exemplu, atunci când apaTemperatură=13.2C) . Din moment ce este nevoie ERDDAP™ un pic de timp (parţial timpul de căutare pe HDD, parţial timpul pentru a citi antetul fişierului) doar pentru a deschide un anumit fișier (și mai mult dacă există o mulțime de fișiere în directorul) , există o penalizare de timp semnificativă în cazul în care numărul total de dosare care ERDDAP™ Trebuie să se deschidă este foarte mare. Chiar şi deschiderea a 1000 de fişiere necesită timp semnificativ. Deci există beneficii pentru consolidarea periodică a fișierelor zilnice în bucăți mai mari (De exemplu, 1 stație pentru 1 an) . Am înțeles că s-ar putea să nu doriți să faceți acest lucru din diferite motive, dar duce la răspunsuri mult mai rapide. În cazuri extreme (de exemplu, am de-a face cu un set de date GTSPP care are ~35 milioane de fișiere sursă) , servirea datelor dintr-un număr mare de fișiere sursă este practic deoarece ERDDAP Răspunsul la întrebări simple poate dura ore întregi şi poate folosi tone de memorie. Prin consolidarea fișierelor sursă într-un număr mai mic (pentru GTSPP, am 720 acum, 2 pe lună) , ERDDAP™ poate răspunde rezonabil de repede. Vezi? [Milioane de fișiere](#millions-of-files)   
     

N.B. Solid State Drives sunt grozave&#33; Cel mai rapid, mai simplu, cel mai ieftin mod de a ajuta ERDDAP™ se ocupă cu un număr mare de (mici) Fişierele trebuie să folosească o unitate de stat solidă. Vezi? [Solid State Drives sunt mari&#33;](/docs/server-admin/additional-information#solid-state-drives)   
     
##### Milioane de fișiere{#millions-of-files} 
* Unele seturi de date au milioane de fișiere sursă. ERDDAP™ se poate ocupa de acest lucru, dar cu rezultate mixte.
    
    * Pentru cererile care implică doar variabile enumerate în [&lt; subsetVariables &gt;] (#Subsetvariables) , ERDDAP™ are toate informațiile necesare deja extrase din fișierele de date și stocate într-un singur fișier, astfel încât să poată răspunde foarte, foarte repede.
    * Pentru alte cereri, ERDDAP™ poate scana setul de date [Informații despre fișier cache](#cached-file-information) și să ne dăm seama că doar câteva dintre fișiere ar putea avea date relevante pentru cerere și, prin urmare, să răspundă rapid.
    * Dar pentru alte cereri (de exemplu, temperatura apei=18 grade\\_C) în cazul în care orice fișier poate avea date relevante; ERDDAP™ trebuie să deschidă un număr mare de fișiere pentru a vedea dacă fiecare dintre fișiere are date relevante pentru cerere. Fişierele sunt deschise secvenţial. Pe orice sistem de operare și orice sistem de fișiere (altele decât cele de stare solidă) , Acest lucru ia o lungă perioadă de timp (Deci... ERDDAP™ răspunde încet.) și leagă într-adevăr sistemul de fișiere (Deci... ERDDAP™ răspunde încet la alte cereri) .
    
Din fericire, există o soluţie.
    
    1. Stabilește setul de date pe un non-public ERDDAP™   (computerul tău personal?) .
    2. Creați și executați un script care solicită o serie de .nc Fișiere CF, fiecare cu o mare parte din setul de date, de obicei o perioadă de timp (de exemplu, toate datele pentru o anumită lună) . @ info: whatsthis (dar sperăm că mai mare de 1GB) . Dacă setul de date are date în timp aproape real, executați scriptul pentru a regenera fișierul pentru perioada curentă (de exemplu, luna aceasta) frecvente (La fiecare 10 minute? În fiecare oră?) . Solicitări ERDDAP™ pentru .nc Fișiere CF creează o NetCDF v3 .nc fișier care utilizează [CF Geometrii de eșantionare discrete (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Structuri de date Contigue Ragged Array).
    3. Configurați o [Tabel EDD din NCFFile](#eddtablefromnccffiles) Set de date privind publicul ERDDAP™ care obţine date de la .nc  (CF) Dosare. ERDDAP™ poate extrage date din aceste fișiere foarte repede. Şi din moment ce acum sunt zeci sau sute (în loc de milioane) de fișiere, chiar dacă ERDDAP™ trebuie să deschidă toate fișierele, se poate face atât de repede.
    
Da, acest sistem ia ceva timp și efort pentru a configura, dar funcționează foarte, foarte bine. Majoritatea cererilor de date pot fi tratate de 100 de ori mai repede decât înainte.
     \\[ Bob ştia că e o posibilitate, dar Kevin O'Brien a făcut asta prima dată şi a arătat că funcţionează bine. Acum, Bob folosește acest lucru pentru setul de date GTSPP care are aproximativ 18 milioane de fișiere sursă și care ERDDAP™ acum serveşte prin aproximativ 500 .nc  (CF) Dosare. \\] 
    
N.B. Solid State Drives sunt grozave&#33; Cel mai rapid, mai simplu, cel mai ieftin mod de a ajuta ERDDAP™ se ocupă cu un număr mare de (mici) Fişierele trebuie să folosească o unitate de stat solidă. Vezi? [Solid State Drives sunt mari&#33;](/docs/server-admin/additional-information#solid-state-drives)   
     
    
##### Fișiere uriașe{#huge-files} 
* Un singur fișier imens de date (în special fișiere de date ASCII uriașe) poate provoca un OutOfMemoryError. Dacă aceasta este problema, ar trebui să fie evident, deoarece ERDDAP™ nu va încărca setul de date. Soluția, dacă este posibil, este de a împărți fișierul în mai multe fișiere. În mod ideal, puteți împărți fișierul în bucăți logice. De exemplu, în cazul în care fișierul are în valoare de 20 de luni de date, împărțit în 20 de fișiere, fiecare cu o lună de date. Dar există avantaje chiar dacă fişierul principal este împărţit arbitrar. Această abordare are multiple beneficii: a) Acest lucru va reduce memoria necesară pentru a citi fișierele de date la 1/20th, deoarece doar un singur fișier este citit la un moment dat. b) Adesea, ERDDAP™ poate face față cererilor mult mai repede, deoarece trebuie doar să se uite într-unul sau câteva fișiere pentru a găsi datele pentru o anumită cerere. c) Dacă colectarea datelor este în curs de desfășurare, atunci cele 20 de fișiere existente pot rămâne neschimbate și trebuie doar să modificați unul, mic, nou fișier pentru a adăuga datele din luna următoare la setul de date.
     
##### Probleme FTP/Advice{#ftp-troubleadvice-1} 
* Dacă FTP fișiere de date noi la ERDDAP™ server în timp ce ERDDAP™ se execută, există posibilitatea ca ERDDAP™ va reîncărca setul de date în timpul procesului FTP. Se întâmplă mai des decât crezi&#33; Dacă se întâmplă, fișierul va părea a fi valid (are un nume valabil) Dar dosarul nu e valabil. Dacă ERDDAP™ încearcă să citească date din acel fișier invalid, eroarea rezultată va determina adăugarea fișierului în tabelul fișierelor invalide. Asta nu e bine. Pentru a evita această problemă, utilizați un nume de fișier temporar atunci când FTP'ing fișierul, de exemplu, ABC2005 .nc \\_TEMP. Apoi, testul de fișierNameRegex (vezi mai jos) va indica faptul că acesta nu este un fișier relevant. După finalizarea procesului FTP, redenumește fișierul pe numele corect. Procesul de redenumit va face ca fișierul să devină relevant într-o clipă.
    
##### Extras nume fișier{#file-name-extracts} 
 \\[ Această caracteristică este DEPRECATĂ. Vă rugăm să utilizați [\\*\\*\\*FileName pseudo sourceName ](#filename-sourcenames) În schimb. \\]   
EDDtableFromFiles dispune de un sistem de extragere a unei stringuri din fiecare nume de fișier și utilizarea acestuia pentru a face o variabilă pseudo date. În prezent, nu există nici un sistem pentru a interpreta aceste Strings ca date/timpuri. Există mai multe etichete XML pentru a configura acest sistem. Dacă nu aveți nevoie de o parte sau de tot acest sistem, pur și simplu nu specificați aceste etichete sau utilizați "" valori.

* preExtractRegex este o [expresie regulată](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) folosit pentru a identifica textul care trebuie eliminat de la începutul numelui fișierului. Eliminarea are loc numai dacă regexul este potrivit. Acest lucru începe de obicei cu "^" pentru a se potrivi cu începutul numelui de fișier.
* după ExtractRegex este o expresie regulată utilizată pentru identificarea textului care trebuie eliminat de la sfârșitul numelui fișierului. Eliminarea are loc numai dacă regexul este potrivit. Acest lucru se termină de obicei cu "$" pentru a se potrivi cu sfârșitul numelui fișierului.
* extractRegex Dacă este prezent, această expresie regulată este utilizată după preExtractRegex și dupăExtractRegex pentru a identifica un șir care trebuie extras din numele fișierului (de exemplu, stationID ) . În cazul în care regexul nu este potrivit, întregul nume de fișier este utilizat (minus preExtract și post Extract) . Utilizați ".\\*" pentru a se potrivi întregului nume de fișier care este lăsat după preExtractRegex și postExtractRegex.
* coloană NameForExtract este denumirea sursei coloanei de date pentru stringurile extrase. A dataVariable cu aceasta [ sourceName ](#sourcename) trebuie să fie în dataVariable Lista s (cu orice tip de date, dar de obicei String) .

De exemplu, dacă un set de date are fișiere cu nume precum XYZAble .nc , XYZBaker .nc , XYZCharlie .nc , ... și doriți să creați o nouă variabilă ( stationID ) atunci când fiecare fișier este citit care va avea valori de identificare a postului (Able, Baker, Charlie, ...) extras din numele fișierelor, ați putea folosi aceste etichete:

*   &lt;preExtractRegex &gt;^XYZ&lt;/pretractRegex&gt;
Inițial ^ este o expresie regulată caracter special care forțează ERDDAP™ să caute XYZ la începutul numelui de fișier. Acest lucru determină eliminarea XYZ, dacă se găsește la începutul numelui fișierului (de exemplu, numele fișierului XYZABLE .nc devine Able .nc ) .
*   &lt;PostExtractRegex&gt;\\\ .nc $&lt;/postExtractRegex&gt;
$ la sfârşit este o expresie regulată caracter special care forţează ERDDAP™ pentru a căuta .nc la sfârșitul numelui fișierului. Deoarece . este un caracter special expresie regulat (care se potrivește cu orice caracter) , este codificat ca \\. Aici. (deoarece 2E este numărul de caracter hexazecimal pentru o perioadă) . Acest lucru cauzează .nc , dacă se găsește la sfârșitul numelui fișierului, care urmează să fie eliminat (de exemplu, numele de fișier parțial Capabil .nc devine Able) .
*   &lt;extractRegex&gt;.\\*&lt;/ExtractRegex&gt;
Expresia .\\* regulată se potrivește cu toate personajele rămase (de exemplu, numele de fișier parțial Able devine extract pentru primul fișier) .
*   &lt;coloanaDenumireaForExtract&gt; stationID &lt;/coloanăNumeForExtract&gt;
Asta spune ERDDAP™ pentru a crea o nouă coloană sursă numită stationID atunci când citiți fiecare fișier. Fiecare rând de date pentru un anumit fișier va avea textul extras din numele fișierului său (de exemplu, Capabil) ca valoare în stationID coloana.

În majoritatea cazurilor, există numeroase valori pentru aceste etichete de extragere care vor produce aceleași rezultate - expresiile regulate sunt foarte flexibile. Dar în câteva cazuri, există o singură cale de a obţine rezultatele dorite.
     
##### Pseudo sourceName s{#pseudo-sourcenames} 
Fiecare variabilă din fiecare set de date ERDDAP™ are o&lt; sourceName &gt;] (#sourcename) care specifică numele sursei variabilei. EDDTableFromFiles suportă câteva pseudo sourceName s care extrag o valoare dintr-un alt loc (De exemplu, numele fișierului sau valoarea unui atribut global) și să promoveze această valoare ca fiind o coloană de valori constante pentru acea bucată de date (De exemplu, tabelul datelor fișierului) . Pentru aceste variabile, trebuie să specificați tipul de date al variabilei prin intermediul [&lt;DataType &gt;] (#Tipul de date) Tag. Dacă informaţia extrasă este un şir de dateTime, specificaţi formatul şir de dateTime în [atribut unități](#string-time-units) . pseudo sourceName opțiunile sunt:
 
###### global: sourceName s{#global-sourcenames} 
Un atribut de metadate globale în fiecare fișier de date sursă poate fi promovat ca fiind o coloană de date. Dacă o variabilă&lt; sourceName &gt; are formatul
```
        <sourceName>global:*attributeName*</sourceName>
```
atunci când ERDDAP™ este citirea datelor dintr-un fișier; ERDDAP™ va căuta un atribut global al acestui nume (de exemplu, IP) și să creeze o coloană plină cu valoarea atributului. Acest lucru este util atunci când atributul are valori diferite în diferite fișiere sursă, deoarece altfel, utilizatorii ar vedea doar una dintre aceste valori pentru întregul set de date. De exemplu,
```
        <sourceName>global:PI</sourceName>
```
Când promovați un atribut pentru a fi date, ERDDAP™ elimină atributul corespunzător. Acest lucru este adecvat deoarece valoarea este probabil diferită în fiecare fișier; întrucât în setul de date agregat în ERDDAP™ va avea o singură valoare. Dacă doriți, puteți adăuga o nouă valoare pentru atributul pentru întregul set de date prin adăugarea&lt;att name=" *atribut Nume* "&gt; *nou Valoare* &lt;/att&gt; la nivel global al setului de date [&lt; addAttributes &gt;] (#addattributes) . Pentru atributele globale care ERDDAP™ necesită, de exemplu, o instituție, trebuie să adăugați o nouă valoare pentru atribut.
     
###### variabilă: sourceName s{#variable-sourcenames} 
Atributul metadatelor unei variabile în fiecare fișier poate fi promovat ca o coloană de date. Dacă o variabilă&lt; [ sourceName ](#sourcename) \\&gt; are formatul
```
        <sourceName>variable:*variableName*:*attributeName*<sourceName>
```
atunci când ERDDAP™ este citirea datelor dintr-un fișier; ERDDAP™ va căuta atributul specificat (de exemplu, ID) a variabilei specificate (de exemplu, instrument) și să creeze o coloană plină cu valoarea atributului. Variabila părinte (de exemplu, instrument) Nu trebuie să fie unul dintre dataVariable s incluse în definiția setului de date în ERDDAP . De exemplu,
```
        <sourceName>variable:instrument:ID</sourceName>
```
Acest lucru este util atunci când atributul are valori diferite în diferite fișiere sursă, deoarece altfel, utilizatorii ar vedea doar una dintre aceste valori pentru întregul set de date.

Când promovați un atribut pentru a fi date, ERDDAP™ elimină atributul corespunzător. Acest lucru este adecvat deoarece valoarea este probabil diferită în fiecare fișier; întrucât în setul de date agregat în ERDDAP™ va avea o singură valoare. Dacă doriți, puteți adăuga o nouă valoare pentru atributul pentru întregul set de date prin adăugarea&lt;att name=" *atribut Nume* "&gt; *nou Valoare* &lt;/att&gt; la variabila [&lt; addAttributes &gt;] (#addattributes) . Pentru atribute care ERDDAP™ necesită, de exemplu, ioos\\_category   (în funcție de configurarea) , TREBUIE să adăugați o nouă valoare pentru atribut.
        
###### Nume fișier sourceName s{#filename-sourcenames} 
Puteți extrage o parte dintr-un fișier de nume și să promoveze că pentru a fi o coloană de date. Formatul acestui pseudo [&lt; sourceName &gt;] (#sourcename) este
```
        <sourceName>\\*\\*\\*fileName,*regex*,*captureGroupNumber*</sourceName>
```
De exemplu,
```
        <sourceName>\\*\\*\\*fileName,A(\\d{12})\\.slcpV1.nc,1</sourceName>
```
Când EDDtableFromFiles citeşte datele dintr-un fişier, se va asigura că numele fişierului (de exemplu, A201807041442.slcpV1 .nc ) se potrivește expresiei regulate specificate ("regex") și extrageți specificațiile (în acest caz, primul) grup de captură (care este o parte înconjurată de paranteze) , de exemplu, "201807041442." (Vezi asta? [documentația regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) şi [tutorial regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) Regexul poate fi specificat ca șir cu sau fără citate din jur. Dacă regexul este specificat ca un șir cu citate din jur, șirul trebuie să fie [Sfoara JSON](https://www.json.org/json-en.html)   (cu caractere speciale scăpat cu caractere \\\) . Numărul grupului de capturare este de obicei 1 (primul grup de capturare) Dar poate fi orice număr.
     
###### numele căii sourceName s{#pathname-sourcenames} 
Puteți extrage o parte din calea completă a unui fișier Nume (/direcții/fileName.ext) și să promoveze ca fiind o coloană de date. Formatul acestui pseudo [&lt; sourceName &gt;] (#sourcename) este
```
        <sourceName>\\*\\*\\*pathName,*regex*,*captureGroupNumber*<sourceName>
```
De exemplu,
```
        <sourceName>\\*\\*\\*pathName,/data/myDatasetID/(\\[A-Z0-9\\]\\*)/B(\\d{12}).nc,1</sourceName>
```
Când EDDTableFromFiles citeşte datele dintr-un fişier, se va asigura că numele complet al căii (de exemplu, /data/myDatasetID/BAY17/B201807041442 .nc . Pentru acest test, separatoarele directoare vor fi întotdeauna '/' Niciodată. ') se potrivește expresiei regulate specificate ("regex") și extrageți specificațiile (în acest caz, primul) grup de captură (care este o parte înconjurată de paranteze) De exemplu, "BAY17." (Vezi asta? [documentația regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) şi [tutorial regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) Regexul poate fi specificat ca șir cu sau fără citate din jur. Dacă regexul este specificat ca un șir cu citate din jur, șirul trebuie să fie un [Sfoara JSON](https://www.json.org/json-en.html)   (cu caractere speciale scăpat cu caractere \\\) . Numărul grupului de capturare este de obicei 1 (primul grup de capturare) Dar poate fi orice număr.
         
##### "0 fișiere" Mesaj eroare{#0-files-error-message-2} 
* Dacă fugi [GenereazăSeturi de dateXml](#generatedatasetsxml) sau [DasDds](#dasdds) , sau dacă încercați să încărcați un EDDtable From... Set de fișiere în ERDDAP™ , și veți obține un mesaj de eroare "0 fișiere" indicând faptul că ERDDAP™ găsit 0 fișiere de potrivire în dosar (atunci când crezi că există fișiere de potrivire în acel director) :
    * Verificați dacă fișierele sunt într-adevăr în acel director.
    * Verifică ortografia numelui directorului.
    * Verificați fișierulNameRegex. E foarte uşor să faci greşeli cu regexurile. Pentru teste, încercați regex .\\* care ar trebui să se potrivească cu toate numele de fișiere. (Vezi asta? [documentația regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) şi [tutorial regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) 
    * Verificați dacă utilizatorul care rulează programul (de exemplu, utilizator=tomcat (?) pentru Tomcat/ ERDDAP ) are permisiunea "citeste" pentru acele fisiere.
    * În unele sisteme de operare (de exemplu, SELinux) și în funcție de setările de sistem, utilizatorul care a rulat programul trebuie să aibă permisiune "citește" pentru întregul lanț de directoare care duce la directorul care are fișierele.
         
##### standardizează Ce?{#standardizewhat} 
* Atunci când orice subclasă de EDDTableFromFiles agregază un set de fișiere sursă, pentru o anumită variabilă, toate fișierele sursă TREBUIE să aibă valori atribute identice pentru mai multe atribute: scale\\_factor , add\\_offset , \\_ Nesemnat, missing\\_value , \\_FillValue și unități). Gândiți-vă: dacă un fișier are unități windSpeed=note și altul are unități windSpeed=m/s, atunci valorile datelor din cele două fișiere nu ar trebui incluse în același set de date agregate. Deci, atunci când EDDTableFromFiles creează mai întâi setul de date, acesta citește valorile atributelor dintr-un singur fișier, apoi respinge toate fișierele care au valori diferite pentru acele atribute importante. Pentru majoritatea colecțiilor de fișiere, aceasta nu este o problemă, deoarece atributele tuturor variabilelor sunt coerente. Cu toate acestea, pentru alte colecții de fișiere, acest lucru poate duce la 1%, 10%, 50%, 90% sau chiar 99% din fișiere fiind respinse ca fișiere "rele." Asta e o problemă.
    
EDDtableDe la fișiere are un sistem pentru a face față acestei probleme: standardiza Ce. Standardizarea Ce setare spune EDDtableFromFiles pentru a standardiza fișierele de îndată ce le citește, înainte de EDDtableFromFiles se uită la atributele pentru a vedea dacă acestea sunt coerente.
    
Partea opusă este: în cazul în care setul de date nu are această problemă, nu utilizați standardiza Ce. standardizează Care sunt riscurile potenţiale (discutate mai jos) şi ineficienţe. Deci, dacă nu aveți nevoie de fapt caracteristicile standardiza Ce, nu este nevoie să se confrunte cu riscurile și ineficiențele potențiale. Cea mai mare ineficiență este: Când diferite standardiza Ce opțiuni sunt utilizate de un set de date, implică faptul că fișierele sursă stochează date în moduri semnificativ diferite (de exemplu, cu diferite scale\\_factor şi add\\_offset , sau cu siruri de timp folosind diferite formate) . Astfel, pentru o anumită constrângere într-o cerere de utilizator, nu există nici o cale pentru ERDDAP™ pentru a crea o singură constrângere la nivelul sursei care poate fi aplicată tuturor fișierelor sursă. Deci... ERDDAP™ pot aplica constrângerile afectate numai la un nivel mai ridicat. Deci... ERDDAP™ trebuie să citească datele din mai multe fișiere înainte de a aplica constrângerile mai ridicate, la nivel de destinație. Deci solicită seturi de date care utilizează standardiza Ceea ce ia mai mult timp pentru a fi prelucrate.
    
Pentru a utiliza acest sistem, aveți nevoie pentru a specifica
```
    <standardizeWhat>*standardizeWhat*</standardizeWhat>  
```
în [ datasets.xml pentru tabelul EDDFrom... Set de fișiere](#eddtablefromfiles-skeleton-xml) (în&lt;Set de date&gt; tag).
    
ă *standardizează Ce?* valoarea specifică care modificări ale tabelului EDDFromFiles ar trebui să încerce să se aplice. Modificările reprezintă suma unei combinații de:
    
1. Despachetează
Acest lucru face multe operațiuni comune și sigure pentru a standardiza coloane numerice în fișierele:
    * Dacă scale\\_factor și/sau add\\_offset atributele sunt prezente, le elimină și le aplică pentru a despacheta valorile datelor.
    * Despacheta atributele ambalate (de exemplu, actual\\_min, actual\\_max, actual\\_range , data\\_min , data\\_max , data\\_range, valid\\_min , valid\\_max , valid\\_range ) , dacă este prezentă, dacă variabila a fost ambalată și dacă valorile atributului au fost ambalate (Acest lucru este dificil, dar rezonabil de încredere) .
    * Dacă \\_FillValue și/sau missing\\_value sunt prezente, converti aceste valori ale datelor la ERDDAP Valorile "standard" lipsă: MAX\\_VALUEN pentru tipurile întregi (de exemplu 127 pentru octeți, 32,767 pentru scurt și 2,147,483,647 pentru int, 9223372036854775807 pentru mult timp) și NaN pentru duble și plutește.
    * Elimină vechea \\_FillValue și/sau missing\\_value atribute (dacă este cazul) , și să le înlocuiască cu doar \\_FillValue = \\[ nu ERDDAP™ valoarea standard lipsă \\] .
         
2. Standardizează timpurile numerice
Dacă o coloană numerică are unități de timp numerice în stil CF (" *timeunits* din *timp de bază* ", de exemplu, "zile din 1900-01-01") , acest lucru convertește data Valorile timpului în "seconds since 1970-01-01T00:00:00Z" valorile și modificările atribuite unităților pentru a indica acest lucru.
Dacă acest lucru este selectat și există o șansă ca această variabilă are scale\\_factor sau add\\_offset , #1 TREBUIE să fie selectate, de asemenea.
     
3. Aplică șir missing\\_value   
Dacă coloana String are \\_FillValue și/sau missing\\_value atribute, acest lucru convertește aceste valori la "" și elimină atributele.
     
4. Găsește Numeric missing\\_value   
Dacă o coloană numerică nu are \\_FillValue sau missing\\_value atribute, acest lucru încearcă să identifice un numeric nedefinit missing\\_value   (de exemplu, -999, 9999, 1e37f) și convertirea cazurilor sale la valorile "standard" (MAX\\_VADIU pentru tipuri întregi, și NAN pentru duble și plutește) .
     **Această opțiune are un risc:** în cazul în care cea mai mare sau mai mică valoare de date valabilă arată ca o valoare lipsă (de exemplu, 999) , atunci aceste valori valabile ale datelor vor fi convertite în valori lipsă (De exemplu, NaN) .
     
5. Schimbă coarda "N/A" în ""
Pentru fiecare coloană de coarde, converti mai multe șiruri de caractere utilizate în mod obișnuit pentru a indica o valoare de coarde lipsă la "". În prezent, acest lucru caută "," ..."," "-," "?", "??", "N/A," "NA," "nici unul," "nu se aplică," "nul," "necunoscut," "nespecificat." Căutarea stringurilor este insensibilă şi aplicată după ce corzile sunt tăiate. "n" și "altele" nu sunt în mod specific pe listă.
     **Această opțiune are un risc:** Stringurile pe care le consideraţi valori valide pot fi transformate în "".
     
6. Standardizeaza la sfoara ISO 8601 DateTimes
Pentru fiecare coloană de coarde, încercați să convertiți data de coarde nu doar numerotate (De exemplu, "Jan 2, 2018") la data de referință ISO 8601 ("2018-01-02") .
     **Notă** că toate valorile datelor pentru coloană trebuie să utilizeze același format, în caz contrar, această opțiune nu va aduce modificări unei anumite coloane.
     **Această opțiune are un risc:** Dacă există o coloană cu valori ale corzilor care se întâmplă să arate ca o dată comună Format de timp, acestea vor fi convertite în ISO 8601 Data stringTimes.
     
7. Standardizeaza datele CompactTimes to ISO 8601 DateTimes
Pentru fiecare coloană de coarde sau de tip întreg, încercați să convertiți data de coarde pur numerotatăTimes (de exemplu, "20180102") la data de referință ISO 8601 ("2018-01-02") .
     **Notă** că toate valorile datelor pentru coloană trebuie să utilizeze același format, în caz contrar, această opțiune nu va aduce modificări unei anumite coloane.
     **Această opțiune are un risc:** Dacă există o coloană cu valori care nu sunt compacte data Timpuri, dar arata ca data compactTimes, acestea vor fi convertite în ISO 8601 Data stringTimes.
     
8. Unități standardizate
Acest lucru încearcă să standardizeze șir de unități pentru fiecare variabilă. De exemplu, "metri pe secundă," "metru/secundă," "m.s^-1" , "m s-1" , "m.s-1" va fi transformat în "m.s-1." Asta nu schimbă valorile datelor. Acest lucru funcționează bine pentru valid UDUNITS units strings, but can have problems with invalid or complex strings. Puteți face față problemelor specificând de la-la perechi în&lt;standardizeazăUdunities&gt; în ERDDAP 's
     \\[ Tomcat \\] /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file. Te rog trimite-i lui Chris orice modificări. John la noaa.gov astfel încât acestea să poată fi încorporate în mesajele implicite.xml.
     **Această opțiune are un risc:** Acest lucru poate manipula unele unități complexe sau invalide; cu toate acestea, puteți folosi de lucru-în jurul descris mai sus pentru a eluda problemele în cazul în care acestea apar.
         
    
Valoarea implicită a standardizării Ce este 0, care nu face nimic.

Dacă/atunci când modificați valoarea standardizării Ce, data viitoare când setul de date este reîncărcat, ERDDAP™ va reciti toate fisierele de date ale setului de date pentru a reconstrui mini-baza de date cu informatii despre fiecare fisier. Dacă setul de date are multe dosare, va dura mult timp.
    
Note:

* Un lucru complicat este -
Standardizarea Ce setare se utilizează pentru toate coloanele din fișierul sursă. Deci, de exemplu, folosind #2048 s-ar putea converti cu succes o coloană de compact String dateTimes în ISO 8601 Data StringTimes, dar s-ar putea converti, de asemenea, greșit o coloană cu Strings care se întâmplă să arate ca data compactTimes.
     
*    datasets.xml și Generează date Xml -
Este deosebit de dificil pentru a obține setările corecte în datasets.xml Pentru a face seturile de date să funcționeze așa cum doriți. Cea mai bună abordare (ca întotdeauna) este:
    1. Utilizare [GenereazăSeturi de dateXml](#generatedatasetsxml) si specifica valoarea standardizarii Ce ai vrea să foloseşti.
    2. Utilizare [DasDds](#dasdds) pentru a se asigura că setul de date se încarcă corect și reflectă standardizarea Ce setare ai specificat.
    3. Încercarea setului de date manual atunci când acesta este în ERDDAP™ să se asigure că variabilele afectate funcționează conform așteptărilor.
         
* Riscuri -
Opțiunile #256 și mai sus sunt mai riscante, adică există o șansă mai mare ca ERDDAP™ va face o schimbare care nu ar trebui să fie făcută. De exemplu, opțiunea #2048 s-ar putea converti accidental o variabilă cu siruri de caractere de statie care toate se întâmplă să arate ISO 8601 "compact" date (De exemplu, 20180102) în ISO 8601 "extended" date ("2018-01-02") .
     
* Încet după o schimbare...
Din moment ce valoarea standardiza Ce modifică valorile de date pe care EDDtableFromFiles le vede pentru fiecare fișier de date, dacă modificați standardizarea Ce setare, EDDtableFromFiles va arunca toate informațiile cache despre fiecare fișier (care include min și max pentru fiecare variabilă de date din fiecare fișier) și recitiți fiecare fișier de date. În cazul în care un set de date are un număr mare de fișiere, acest lucru poate fi foarte consumatoare de timp, astfel încât va dura mult timp pentru setul de date pentru a reîncărca prima dată ERDDAP™ Îl încarcă după ce faci schimbarea.
     
* Euristică -
Opțiunile #256 și de mai sus folosesc euristica pentru a face modificările lor. Dacă întâlniţi o situaţie în care euristica ia o decizie proastă, vă rugăm să trimiteţi o descriere a problemei lui Chris. John la Noaa. Gov ca să putem îmbunătăţi euristica.
     
* Alternative...
Dacă unul dintre standardiza Ce opțiuni nu rezolvă o problemă pentru un set de date dat, s-ar putea fi capabil de a rezolva problema prin crearea unui [ .nc Fișier ml](#ncml-files) pentru a paralela fiecare fișier de date și a defini modificările la lucrurile din fișiere, astfel încât fișierele să fie coerente. Apoi, spune tabelul EDD de la ... Setul de fișiere pentru agregarea .nc Fișiere ml.
    
Sau, folosi [ NCO ](#netcdf-operators-nco) pentru a face de fapt modificări la fișiere, astfel încât fișierele sunt coerente.
        
##### Coloane separate pentru an, lună, dată, oră, minut, secundă{#separate-columns-for-year-month-date-hour-minute-second} 
Este destul de comun pentru fişierele de date tabulare să aibă coloane separate pentru an, lună, dată, oră, minut, secundă. Înainte ERDDAP™ v2.10, singura soluție a fost editarea fișierului de date pentru a combina aceste coloane într-o coloană de timp unificată. Cu ERDDAP™ 2.10+, puteți utiliza
[&lt; sourceName &gt; *expresie* &lt; sourceName &gt;] (#sourcename) pentru a spune ERDDAP™ cum să combine coloanele sursă pentru a face o coloană de timp unificată, astfel încât să nu mai trebuie să editați fișierul sursă.
##### &lt;SkipHeaderToRegex&gt;{#skipheadertoregex} 
* [&lt;SkipHeaderToRegex&gt;] (#Skipheadertoregex) --
OPTIONAL. (Pentru tabelul EDDFromAsciiFiles și tabelul EDDFromColumnarAsciiFiles settings only.)   
Când EDDtableFromAsciiFiles citește un fișier de date, acesta va ignora toate liniile până la și inclusiv linia care se potrivește cu această expresie regulată. Implicit este "" care nu utilizează această opțiune. Un exemplu este:
```
    <skipHeaderToRegex>\\\*\\\*\\\* END OF HEADER.\\*<skipHeaderToRegex>  
```
care va ignora toate liniile până la și inclusiv o linie care începe cu "\\*\\*\\* SFÂRŞIT DE CAP.

Când utilizați această etichetă,&lt;coloanaNamesRow&gt; și&lt;PrimaDataRow&gt; acționează ca și cum antetul a fost îndepărtat înainte de citirea fișierului. De exemplu, ați folosi coloanaNamesRow=0 dacă numele coloanelor sunt pe rând imediat după antet.

Dacă doriți să utilizați genera Setări de date Xml cu un set de date care are nevoie de această etichetă:

1. Face un fișier nou, temporar, eșantion prin copierea unui fișier existent și eliminarea antetului.
2. Generează rularea Setări de date Xml și specifică că fișierul eșantion.
3. Se adaugă manual&lt;SkipHeaderToRegex&gt; tag to the datasets.xml Chunk.
4. Ștergeți fișierul temporar, eșantion.
5. Utilizați setul de date în ERDDAP .
##### &lt;SkipLinesRegex&gt;{#skiplinesregex} 
OPTIONAL. (Pentru tabelul EDDFromAsciiFiles și tabelul EDDFromColumnarAsciiFiles settings only.)   
Când EDDtableFromAsciiFiles citește un fișier de date, va ignora toate liniile care se potrivesc cu această expresie regulată. Implicit este "" care nu utilizează această opțiune. Un exemplu este:
```
    <skipLinesRegex>#.\\*<skipLinesRegex>  
```
care va ignora toate liniile care încep cu "#."

Când utilizați această etichetă,&lt;coloanaNamesRow&gt; și&lt;PrimaDataRow&gt; acționează ca și cum toate liniile de potrivire ar fi fost eliminate înainte de citirea fișierului. De exemplu, ați folosi coloanaNamesRow=0 chiar dacă există mai multe linii începând cu, de exemplu, "#" la începutul fișierului.
    
#### Name{#eddtablefromfiles-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;nDimensions>...&lt;/nDimensions>  &lt;!-- This was used prior to ERDDAP™  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version 1.30, but is now ignored. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromFiles subclasses, this uses Java's WatchDirectory system  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;standardizeWhat>](#standardizewhat)...&lt;/standardizeWhat> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;specialMode>*mode*&lt;/specialMode>  &lt;-- This rarely-used, OPTIONAL tag  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;can be used with EDDTableFromThreddsFiles to specify that special,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hard-coded rules should be used to determine which files should  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;be downloaded from the server. Currently, the only valid *mode*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is SAMOS which is used with datasets from  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://tds.coaps.fsu.edu/thredds/catalog/samos to download only the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files with the last version number. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  &lt;-- For subclasses like  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromHyraxFiles and EDDTableFromThreddsFiles, this is where  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you specify the base URL for the files on the remote server.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For subclasses that get data from local files, ERDDAP™ doesn't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this information to get the data, but does display the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;information to users. So I usually use "(local files)". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data file names, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get metadata  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;charset>...&lt;/charset>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This OPTIONAL tag specifies the character set (case  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sensitive!) of the source files, for example, ISO-8859-1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default) and UTF-8.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipHeaderToRegex>](#skipheadertoregex)...&lt;/skipHeaderToRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipLinesRegex>](#skiplinesregex)...&lt;/skipLinesRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNamesRow>...&lt;/columnNamesRow> &lt;-- (For EDDTableFromAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the row with the column  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;names in the files. (The first row of the file is "1".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default = 1.)  If you specify 0, ERDDAP™ will not look for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;column names and will assign names: Column#1, Column#2, ... -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;firstDataRow>...&lt;/firstDataRow>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the first row with data in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. (The first row of the file is "1". Default = 2.) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dimensionsCSV>...&lt;/dimensionsCSV> &lt;-- (For EDDTableFromNcFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and EDDTableFromMultidimNcFiles only) This is a comma-separated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list of dimension fullNames. If specified, ERDDAP™ will only read  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variables in the source files which use some or all of these  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions, plus all of the scalar variables. If a dimension  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is in a group, you must specify its fullName,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g., "*groupName/dimensionName*". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The next four tags are DEPRECATED. For more information, see  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[File Name Extracts](#filename-sourcenames). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;preExtractRegex>...&lt;/preExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;postExtractRegex>...&lt;/postExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractRegex>...&lt;/extractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNameForExtract>...&lt;/columnNameForExtract>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortedColumnSourceName>...&lt;/sortedColumnSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The [sourceName](#sourcename) of the numeric column that the data files are  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;usually already sorted by within each file, for example, "time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Don't specify this or use an empty string if no variable is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suitable. It is ok if not all files are sorted by this column.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If present, this can greatly speed up some data requests.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromHyraxFiles, EDDTableFromNcFiles and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, this must be the leftmost (first) axis variable.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromMultidimNcFiles ignores this because it has a better  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;system. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortFilesBySourceNames>...&lt;/sortFilesBySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- This is a space-separated list of [sourceName](#sourcename)s  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which specifies how the internal list of files should be sorted  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(in ascending order), for example "id time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is the minimum value of the specified columns in each file  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;that is used for sorting.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When a data request is filled, data is obtained from the files  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in this order. Thus it determines the overall order of the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the response.  If you specify more than one column name, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;second name is used if there is a tie for the first column; the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;third is used if there is a tie for the first and second  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;columns; ... This is OPTIONAL (the default is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fileDir+fileName order). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For EDDTableFromHyraxFiles, EDDTableFromMultidimNcFiles,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromNcFiles, EDDTableFromNccsvFiles, and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, the source's axis variables (for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;example, time) needn't be first or in any specific order. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Tabel EDD De la Serviciul Ascii{#eddtablefromasciiservice} 
 [ **Tabel EDD De la Serviciul Ascii** ](#eddtablefromasciiservice) este, în esență, un racletă ecran. Este destinat să se ocupe de sursele de date care au un serviciu web simplu pentru solicitarea datelor (adesea un formular HTML pe o pagină web) si care pot returna datele intr-un format structurat ASCII (de exemplu, un format text ASCII separat de virgulă sau coloană, adesea cu alte informații înainte și/sau după date) .

Masa EDD FromAsciiService este superclasa tuturor EDD Table FromAsciiService... class. Nu puteți utiliza direct EDD Table FromAsciiService. În schimb, utilizaţi o subclasă de EDDtable FromAsciiService pentru a gestiona anumite tipuri de servicii:

*    [Tabel EDD din AsciiServiceNOS](#eddtablefromasciiservicenos) obține date de la NOAA Serviciile ASCII ale NOS.

În prezent, nu sunt sprijinite alte tipuri de servicii. Dar, de obicei, este relativ uşor să sprijinim alte servicii dacă acestea funcţionează în mod similar. Contactaţi-ne dacă aveţi o cerere.

#### Detalii{#details} 
Următoarele informații se aplică tuturor subclaselor de EDDtableFromAsciiService.

* Constrângeri... ERDDAP™ Cererile de date tabulare pot impune constrângeri asupra oricărei variabile. Serviciul suport poate sau nu poate permite constrângeri asupra tuturor variabilelor. De exemplu, multe servicii sprijină doar constrângerile privind numele staţiilor, latitudinea, longitudinea şi timpul. Astfel, atunci când o subclasă de EDDtableFromAsciiService primește o cerere pentru un subset de seturi de date, aceasta transmite cât mai multe constrângeri serviciului de date sursă și apoi aplică constrângerile rămase datelor returnate de către serviciu, înainte de a transmite datele către utilizator.
* Distanţa valabilă... Spre deosebire de multe alte tipuri de seturi de date, EDDtableFromAsciiService de obicei nu cunoaște gama de date pentru fiecare variabilă, astfel încât nu poate respinge rapid cererile de date din afara intervalului valabil.
* Parerea raspunsului text ASCII - Atunci când EDDTableFromAsciiService primește un răspuns de la un serviciu de text ASCII, trebuie să valideze faptul că răspunsul are formatul și informațiile preconizate și apoi să extragă datele. Puteți specifica formatul folosind diferite etichete speciale în bucata de XML pentru acest set de date:
    *   &lt;înainte deData1&gt; prin&lt;Înainte deData10&gt; tags - Puteți specifica o serie de piese de text (Cât de multe vrei, până la 10) ca EDDtableFromAsciiService trebuie să caute în antetul textului ASCII returnat de către serviciu cu&lt;înainte deData1&gt; prin&lt;înainte de Data10&gt;. De exemplu, acest lucru este util pentru a verifica dacă răspunsul include variabilele preconizate utilizând unitățile preconizate. Ultima etichetă de date pe care o specificați identifică textul care apare chiar înainte ca datele să înceapă.
    *   &lt;afterData&gt; -- Aceasta precizează textul pe care EDDTabelFromAsciiService îl va căuta în textul ASCII returnat de către serviciul care înseamnă sfârșitul datelor.
    *   &lt;noData&gt; -- În cazul în care EDDtableFromAsciiService găsește acest text în textul ASCII returnat de serviciu, acesta concluzionează că nu există date care să corespundă cererii.
#### EDDCommentFromAsciiScheletservice XML{#eddtablefromasciiservice-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromAsciiService..." [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData1>...&lt;beforeData1> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData10>...&lt;beforeData10> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;afterData>...&lt;afterData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;noData>...&lt;noData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Tabel EDD din AsciiServiceNOS{#eddtablefromasciiservicenos} 
 [ **Tabel EDD din AsciiServiceNOS** ](#eddtablefromasciiservicenos) face seturile de date ale tabelului EDD din serviciile de date ale textului ASCII oferite de NOAA 's [Serviciul național pentru ocean (NOS) ](https://oceanservice.noaa.gov/) . Pentru informaţii despre cum funcţionează această clasă şi cum să o folosiţi, consultaţi superclasa acestei clase [Tabel EDD De la Serviciul Ascii](#eddtablefromasciiservice) . Este puţin probabil ca altcineva decât Bob Simons să trebuiască să folosească această subclasă.

Deoarece datele din cadrul unui serviciu NOS utilizează un format de text ASCII coloanar, variabilele de date, altele decât latitudinea și longitudinea, trebuie să aibă un atribut special care să specifice ce caractere ale fiecărei linii de date conțin datele variabilei respective, de exemplu,
```
<att name="responseSubstring">17, 25</att>  
```
 
### Tabel EDD din toate datele{#eddtablefromalldatasets} 
 [ **Tabel EDD din toate datele** ](#eddtablefromalldatasets) este un set de date de nivel superior care are informații despre toate celelalte seturi de date care sunt încărcate în prezent în ERDDAP . Spre deosebire de alte tipuri de seturi de date, nu există o specificație pentru allDatasets Set de date în datasets.xml . ERDDAP™ creează automat un set de date EDD (cu datasetID = allDatasets ) . Astfel, o allDatasets Setul de date va fi creat în fiecare ERDDAP™ instalare și va funcționa la fel în fiecare ERDDAP™ instalare.

ă allDatasets Setul de date este un set de date tabelar. Acesta are un rând de informații pentru fiecare set de date. Are coloane cu informații despre fiecare set de date, de exemplu, datasetID , accesibil, institutie, titlu, minLongitudine, maximLatitudine, maxLatitudine, minTime, maxTime, etc. Pentru că allDatasets este un set de date tabular, îl puteți interoga în același mod puteți interoga orice alt set de date tabular în ERDDAP™ , și puteți specifica tipul de fișier pentru răspuns. Acest lucru permite utilizatorilor să caute seturi de date de interes în moduri foarte puternice.
 
### Tabel EDD din AsciiFiles{#eddtablefromasciifiles} 
 [ **Tabel EDD din AsciiFiles** ](#eddtablefromasciifiles) date agregate din fişierele de date conta-, file-, semicolon- sau tabulare separate de spaţiu ASCII.

* Cel mai adesea, fișierele vor avea nume de coloane pe primul rând și date începând de la al doilea rând. (Aici, primul rând al fișierului este numit rândul numărul 1.) Dar poţi folosi&lt;coloanaNamesRow&gt; și&lt;Prima datăRow &gt; în datasets.xml fișier pentru a specifica un număr de rând diferit.
*    ERDDAP™ permite rândurilor de date să aibă numere diferite de valori ale datelor. ERDDAP™ presupune că valorile lipsă ale datelor sunt coloanele finale din rând. ERDDAP™ atribuie valorile standard lipsă pentru valorile lipsă ale datelor. (adăugat v1.56) 
* Fişierele ASCII sunt uşor de lucrat cu, dar acestea nu sunt cel mai eficient mod de a stoca / recupera date. Pentru o mai mare eficiență, salva fișierele ca NetCDF v3 .nc fișiere (cu o singură dimensiune, "rând," împărţit cu toate variabilele) În schimb. Poţi [Administrare ERDDAP™ să genereze noile fișiere](#millions-of-files) .
* Vezi această clasă super clasă, [Tabel EDD din dosare](#eddtablefromfiles) , pentru informații privind modul în care funcționează această clasă și cum să-l folosească.
* Vă recomandăm cu tărie utilizarea [Generează dateName Programul Xml](#generatedatasetsxml) să facă un proiect dur al datasets.xml bucată pentru acest set de date. Din cauza lipsei totale de metadate în fișiere ASCII, va trebui întotdeauna să editați rezultatele GenerateDatesetsXml.
* ATENŢIONARE: Când ERDDAP™ citeste fisierele de date ASCII, daca gaseste o eroare pe o linie data (De exemplu, numărul incorect de articole) , înregistrează un mesaj de avertizare ("DEVĂRARE: linie proastă (s) de date" ... cu o listă de linii rele pe liniile ulterioare) la [fișier log.txt](/docs/server-admin/additional-information#log) şi apoi continuă să citească restul fişierului de date. Astfel, este responsabilitatea ta să te uiţi periodic (sau scrie un scenariu pentru a face acest lucru) pentru mesajul din jurnal. txt astfel încât să puteți rezolva problemele din fișierele de date. ERDDAP™ este configurat astfel încât utilizatorii să poată continua să citească toate datele disponibile valabile, chiar dacă unele linii ale fișierului au defecte.
     
### Tabel EDD din Fişiere AwsXml{#eddtablefromawsxmlfiles} 
 [ **Tabel EDD din Fişiere AwsXml** ](#eddtablefromawsxmlfiles) date agregate dintr-un set de stații meteo automate (AWS) Fișiere de date XML folosind WeatherBug Rest XML API (care nu mai este activă) .

* Acest tip de fișier este un mod simplu, dar ineficient de a stoca datele, deoarece fiecare fișier de obicei pare să conțină observarea de la doar un moment dat. Deci ar putea fi un număr mare de dosare. Dacă doriţi să îmbunătăţiţi performanţa, luaţi în considerare consolidarea grupurilor de observaţii (O săptămână?) în NetCDF v3 .nc fișiere (Cel mai bun: .nc fișiere cu [CF Geometrii de eșantionare discrete (DSG) Format Contiguous Ragged Array](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) ) şi utilizarea [Tabel EDD Din mai multe DosareNc](#eddtablefrommultidimncfiles)   (sau [Tabel EDD din NCFFile](#eddtablefromnccffiles) ) pentru a servi datele. Poţi [Administrare ERDDAP™ să genereze noile fișiere](#millions-of-files) .
* Vezi această clasă super clasă, [Tabel EDD din dosare](#eddtablefromfiles) , pentru informații privind modul în care funcționează această clasă și cum să-l folosească.
     
### Tabel EDDDinColumnarAsciiFiles{#eddtablefromcolumnarasciifiles} 
 [ **Tabel EDDDinColumnarAsciiFiles** ](#eddtablefromcolumnarasciifiles) date agregate din fișiere de date tabulare ASCII cu coloane cu lățime fixă.

* Cel mai adesea, fișierele vor avea nume de coloane pe primul rând și date începând de la al doilea rând. Prima linie / rând din fișier se numește rândul # 1. Dar poţi folosi&lt;coloanaNamesRow&gt; și&lt;Prima datăRow &gt; în datasets.xml fișier pentru a specifica un număr de rând diferit.
* ă&lt; addAttributes &gt; pentru fiecare&lt; dataVariable &gt; pentru aceste seturi de date trebuie să includă aceste două atribute speciale:
    
    *   &lt;Att name="startColumn vulgaris *Număr întreg* &lt;att&gt; -- specifică coloana de caractere din fiecare linie care este începutul acestei variabile de date.
    *   &lt;att name="stopColumn vulgaris *Număr întreg* &lt;att&gt; -- specifică coloana de caractere din fiecare linie care este 1 după sfârșitul acestei variabile de date.
    
Prima coloană de caractere se numește coloana #0.
De exemplu, pentru acest fișier care are valori de timp about valorile temperaturii:
```
      0         1         2        <-- character column number 10's digit
      0123456789012345678901234567 <-- character column number 1's digit
      time                temp
      2014-12-01T12:00:00Z12.3
      2014-12-02T12:00:00Z13.6
      2014-12-03T12:00:00Z11.0
```
variabila datelor temporale
```
      <att name="startColumn">0<att>  
      <att name="stopColumn">20<att>  
```
şi variabila datelor temporale
```
      <att name="startColumn">20<att>  
      <att name="stopColumn">24<att>  
```
Aceste atribute trebuie specificate pentru toate variabilele, cu excepția [valoare fixă](#fixed-value-sourcenames) şi [nume sursă de fișiere](#filename-sourcenames) variabile.
* Fișierele ASCII sunt ușor de utilizat, dar nu sunt o modalitate eficientă de a stoca/retrieva date. Pentru o mai mare eficiență, salva fișierele ca NetCDF v3 .nc fișiere (cu o singură dimensiune, "rând," împărţit cu toate variabilele) În schimb. Poţi [Administrare ERDDAP™ să genereze noile fișiere](#millions-of-files) .
* Vezi această clasă super clasă, [Tabel EDD din dosare](#eddtablefromfiles) , pentru informații privind modul în care funcționează această clasă și cum să-l folosească.
* Vă recomandăm cu tărie utilizarea [Generează dateName Programul Xml](#generatedatasetsxml) să facă un proiect dur al datasets.xml bucată pentru acest set de date. Din cauza dificultatii de a determina pozitiile de start si de sfarsit pentru fiecare coloana de date si lipsa totala de metadate in fisierele ASCII, va trebui mereu sa editati rezultatele de la GenerateDatesetsXml.
     
### Tabel EDD de la HttpGet{#eddtablefromhttpget} 
Tabel EDD De la HttpGet este diferit de toate celelalte tipuri de seturi de date din ERDDAP™ prin faptul că dispune de un sistem prin care "autori" specifici pot adăuga date, revizui date sau șterge datele din set de date prin intermediul unui sistem regulat HTTP GET sau [POST](#http-post) cereri dintr-un program de calculator, un script sau un browser. Setul de date este interogat de utilizatori în același mod în care toate celelalte seturi de date ale tabelului EDD sunt interogate în ERDDAP . A se vedea descrierea superclasei acestei clase, [Tabel EDD din dosare](#eddtablefromfiles) , pentru a citi despre caracteristicile care sunt moștenite de la acea superclasă.

Caracteristicile unice ale EDDtableFromHttpGet sunt descrise mai jos. Trebuie să citiți toată această secțiune inițială și să o înțelegeți; altfel, s-ar putea să aveți așteptări nerealiste sau să intrați în belele greu de rezolvat.

#### Utilizare preconizată{#intended-use} 
Acest sistem este destinat:

* Tabular (in situ) date, nu date în rețea.
* Date în timp real -
Scopul este de a permite unui autor (De exemplu, senzorul, un script QC automat sau un anumit om) modificarea setului de date (prin [.se introduce sau .se șterge comanda](#insert-and-delete) ) și să facă această schimbare accesibilă ERDDAP™ utilizatori, toate în mai puțin de o secundă, și, eventual, mult mai repede. Cea mai mare parte din acea secundă este timpul de rețea. ERDDAP™ poate procesa cererea în aproximativ 1 ms, iar datele sunt imediat accesibile utilizatorilor. Aceasta este o [Rapid](#httpget-speed) , [robust](#robust) , și [sistem fiabil](#system-reliability) .
* Aproape orice frecvenţă de date -
Acest sistem poate accepta date rare (De exemplu, zilnic) prin date foarte frecvente (de exemplu, date de 100 Hz) . Dacă optimizați sistemul, se poate ocupa de date de frecvență mai mare (poate 10 KHz date dacă mergi la extreme) .
* Date de la un senzor sau o colecție de senzori similari.
*    [Versiune](#versioning) / [Ştiinţă reproducabilă](https://en.wikipedia.org/wiki/Reproducibility) / DOI S -
Situaţii în care trebuie să puteţi face schimbări ale datelor (de exemplu, modificarea unui steag de control al calității) , știu care autor a făcut fiecare schimbare, știu marca de timp a atunci când autorul a făcut schimbarea, și (la cerere) să poată vedea datele originale înainte de efectuarea modificării. Astfel, aceste seturi de date sunt eligibile pentru [ DOI s](https://en.wikipedia.org/wiki/Digital_object_identifier) . pentru că ei întâlnesc DOI cerința ca setul de date să nu se schimbe, cu excepția agregării. În general, seturile de date în timp aproape real nu sunt eligibile pentru DOI s deoarece datele sunt adesea modificate retroactiv (de exemplu, pentru scopuri QA/QC) .
     

Odată ce datele se găsesc într-un set de date EDDFromHttpGet, orice utilizator poate solicita date în același mod în care solicită date de la orice alt set de date al tabelului EDD.
     
#### Experimental: Ai grijă.{#experimental-be-careful} 
Deoarece acest sistem este nou și din moment ce datele de mediu pierdute nu pot fi redobândite, ar trebui să tratați EDDtableFromHttpGet ca experimental. Dacă sunteți în tranziție de la un alt sistem, vă rugăm să rulați vechiul sistem și noul sistem în paralel până când sunteți încrezător că noul sistem funcționează bine (săptămâni sau luni, nu doar ore sau zile) . În toate cazurile, vă rugăm să vă asigurați că sistemul dvs. arhivează separat URL-urile .Inserați și .delete care sunt trimise la tabelul EDDFromHttpGet Set de date (chiar dacă doar în jurnalele apaşilor şi/sau Tomcat) Cel puţin pentru o vreme. Și, în toate cazurile, asigurați-vă că fișierele de date create de setul de date EDDFromHttpGet sunt susținute în mod obișnuit la dispozitivele externe de stocare a datelor. (Notă: [rsync](https://en.wikipedia.org/wiki/Rsync) . poate susţine fişierele de date create de EDDtableFromHttpGet foarte eficient.)   
     
#### .se introduce și .selete{#insert-and-delete} 

Pentru orice set de date din ERDDAP™ , atunci când trimiteți o cerere ERDDAP™ pentru un subset de date dintr-un set de date, specificați tipul de fișier pe care îl doriți pentru răspuns, de exemplu, .csv; .htmlTable , .nc , .json . Tabel EDDFromHttp Obține extinde acest sistem pentru a sprijini două "tipuri de fișiere" suplimentare, care pot introduce (sau schimbare) sau ștergeți datele din set de date:

* .se introduce
    * Cererea este formatată ca un răspuns standard format HTML, cu cheie = perechi de valoare, separate de "&." De exemplu,
        https://*some.erddap.url*/erddap/tabledap/myDataset**.insert**?stationID=46088&time=2016-03-30T12:37:55Z&latitude=10.1&longitude=-150.1&airTemp=17.23&waterTemp=12.3&author=JohnSmith\\_someKey1  
spune ERDDAP™ pentru a adăuga sau modifica datele pentru stationID =46088 pentru timpul specificat.
    * Autorul acestei schimbări este JohnSmith și cheia este unele cheie1.
    * URL- ul trebuie să includă valori valabile (valori care nu lipsesc) pentru toate [ http GetRequiredVariables](#httpgetrequiredvariables-global-attribute) 
    * Dacă valorile http Obține solicitarea Variabile în cerere (de exemplu, stationID şi timp) se potrivesc valorile pe un rând deja în setul de date, noile valori suprascrie în mod eficient valorile vechi (cu toate că valorile vechi sunt încă accesibile dacă utilizatorul solicită date dintr-un precedent [versiune](#versioning) din setul de date) .
    * URL- ul .Inserați nu trebuie să includă ștampila &timp= ( ERDDAP™ generează această valoare) & comandă = (care este specificată de .inserați (care este comanda=0) sau .delete (care este comanda = 1) ) .
    * Dacă .inserați URL-ul nu specifică valorile pentru alte coloane care sunt în setul de date, acestea sunt considerate a fi valorile lipsă native (MAX\\_VALUEN pentru tipuri întregi de date, NaN pentru flotoare și duble, și "" pentru șiruri) .
             
    * .delete
        * Cererea este formatată ca un răspuns standard format HTML, cu cheie = perechi de valoare, separate de "&." De exemplu,
            https://*some.erddap.url*/erddap/tabledap/myDataset**.delete**?stationID=46088&time=2016-03-30T12:37:55Z&author=JohnSmith\\_someKey1  
spune ERDDAP™ pentru a șterge datele pentru stationID =46088 la ora specificată.
        * Autorul acestei schimbări este JohnSmith și cheia este unele cheie1.
        * URL- ul trebuie să specifice [ http GetRequiredVariables](#httpgetrequiredvariables-global-attribute) în cerere (de exemplu, stationID şi timp) . Dacă aceste valori corespund valorilor de pe un rând deja incluse în setul de date (pe care de obicei o vor face) , vechile valori sunt efectiv eliminate (cu toate că valorile vechi sunt încă accesibile în cazul în care un utilizator solicită date de la un precedent [versiune](#versioning) din setul de date) .
        * Nu este necesar să se specifice valori pentru non-HttpGetVariables, altele decât autorul, care este necesar pentru autentificarea cererii.
             
    
Detalii:
    * .Inserați și .delete cereri sunt formatate ca standard HTML formă răspunsuri, cu cheie = valoare perechi, separate prin '&'. Valorile trebuie să fie [% codificat](https://en.wikipedia.org/wiki/Percent-encoding) . Astfel, trebuie să codifici caractere speciale în forma %HH, unde HH este valoarea hexazecimală de 2 cifre a caracterului. De obicei, trebuie doar să convertiți câteva dintre personajele punctuației: % în%25, & în%26, " în% 2;&lt;în% 3C, = în% 3D, &gt; în% 3E, + în% 2B; | în % 7C; \\[ în% 5B; \\] în %5D, spațiu în%20, și converti toate personajele de mai sus #127 în forma lor UTF-8 și apoi la sută codați fiecare octet din forma UTF-8 în formatul %HH (Cere ajutorul unui programator) .
    * .Inserați și .delete cereri trebuie să includă [ http GetRequiredVariables](#httpgetrequiredvariables-global-attribute) , de exemplu, stationID şi timpul. Pentru .Inserați cereri, variabile care nu sunt specificate în cerere se presupune că lipsesc valori (MAX\\_VALUEN pentru variabile întregi, NaN pentru variabile float și duble, și un string gol pentru variabile string) . Pentru cereri .delete, valori pentru non-HttpGetquired Variabile (altele decât autorul, care este necesar) sunt ignorate.
    * .Inserați și .delete cereri trebuie să includă numele autorului și cheia autorului prin intermediul unui parametru în forma autorului = *autor\\_key* ca ultimul parametru din cerere. Cerînd ca acest lucru să fie ultimul asigură că întreaga cerere a fost primită de către ERDDAP . Doar autorul. (nu cheia.) vor fi stocate în fișierul de date. Trebuie să specificaţi lista permiselor *autor\\_key* 's prin atributul global [ http Get Keys](#httpgetkeys) 
    * .Inserați și .delete parametrii pot fi scalari (unică) valori sau array-uri de orice lungime în formă \\[ Valoarea 1, valoarea 2, valoarea 3,..., valoarea N \\] . Pentru o cerere dată, toate variabilele cu matrice trebuie să aibă array-uri cu același număr de valori (altfel este o eroare.) . Dacă o cerere are valori scalare și array, valorile scalare sunt replicate pentru a deveni array-uri cu aceeași lungime ca și array-urile specificate, de exemplu, & stationID =46088 poate fi tratat ca stationID = \\[ 46088, 46088, 46088 \\] . Array-urile sunt cheia [debit mare](#httpget-speed) . Fără array-uri, va fi dificil să introduceți sau .delete mai mult de 8 rânduri de date pe secundă de la un autor la distanță (din cauza tuturor cheltuielilor generale ale rețelei) . Cu array-uri, va fi ușor de .inserați sau .delete mai mult de 1000 de rânduri de date pe secundă de la un senzor de la distanță.
    * .Inserați și .delete accepta (fără mesaj de eroare) numărul punctelor plutitoare atunci când se așteaptă numere întregi. În aceste cazuri, setul de date rotunjește valorile la numere întregi.
    * .Inserați și .delete accepta (fără mesaj de eroare) Numere de puncte întregi și plutitoare care sunt în afara intervalului tipului de date al variabilei. În aceste cazuri, setul de date stochează valorile ca ERDDAP 's native lipseste valori pentru acest tip de date (MAX\\_VALUEN pentru tipuri întregi și NaN pentru flotoare și duble) .
         
#### Răspuns{#response} 
Dacă URL-ul .inserați sau .delete reușește, codul de răspuns HTTP va fi 200 (Bine.) iar răspunsul va fi text cu .json obiect, de exemplu,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-11-05T22:12:19.517Z",
    "numericTimestamp":1.541455939517+E9
    }
```
Notează că marcajele temporale au o precizie de milisecundă.

Dacă URL-ul .inserați sau .delete nu reușește, veți obține un cod de răspuns HTTP altul decât 200 (Bine.) , de exemplu, eroare 403 Interzis dacă trimiţi un autor incorect. ERDDAP™ trimite codul de răspuns HTTP (nu, de exemplu, o .json Eroare de formatare) pentru că așa se fac lucrurile pe internet și pentru că erorile pot apărea oriunde în sistem (de exemplu, în rețea, care returnează o eroare HTTP) . Dacă eroarea este de la ERDDAP™ , răspunsul poate include un text (nu .json ) cu o explicație mai detaliată a ceea ce a mers prost, dar codul de răspuns HTTP (200 = Bine, orice altceva este probleme) este modalitatea corectă de a verifica dacă .inserați sau .deletul a reușit. Dacă verificarea codului de răspuns HTTP nu este posibilă sau este incomodă, căutați "status" "succes" în textul de răspuns care ar trebui să fie o indicație fiabilă a succesului.
    
#### Fișiere jurnal{#log-files} 
Atunci când EDDtableFromHttpGet primește .Inserați și .delete comenzi, pur și simplu atașează informațiile la fișierul relevant într-un set de fișiere jurnal, fiecare dintre acestea fiind o masă stocată într-o [JSON Fișier CSV linii](https://jsonlines.org/examples/) . Atunci când un utilizator face o cerere de date, ERDDAP™ citeşte rapid fişierele jurnal relevante, aplică modificările setului de date în ordinea în care au fost făcute şi apoi filtrează cererea prin constrângerile utilizatorului ca oricare alta ERDDAP™ cerere de date. Partierea datelor în diferite fișiere jurnal, stocarea diferitelor informații (De exemplu, marca de timp a comenzii și dacă comanda a fost .inserați sau .delete) , și diverse aspecte ale setului de date, toate face posibil pentru ERDDAP să stocheze și să recupereze date din acest set de date foarte rapid și foarte eficient.
     
#### Securitate și autor{#security-and-author} 
Fiecare comandă .inserați și .delete trebuie să includă &autor= *autor\\_key* ca ultimul parametru, în cazul în care autorul\\_cheie este compus din identificatorul autorului (Ați ales: nume, inițiale, pseudonim, număr) , un accent, și o cheie secretă. ă ERDDAP™ administratorul va lucra cu autorii pentru a genera lista valorilor valide ale autorului\\_key, care pot fi schimbate în orice moment.
Când EDDtableFromHttpGet primește o comandă .Inserați sau .delete, se asigură că authorID\\_key este ultimul parametru și valid. Pentru că este ultimul parametru, indică faptul că întreaga linie de comandă a ajuns ERDDAP™ și nu a fost trunchiat. Cheia secretă garantează că numai autorii specifici pot introduce sau șterge date în setul de date. ERDDAP™ apoi extrage authorID și salvează că în variabila autorului, astfel încât oricine poate vedea cine a fost responsabil pentru o anumită modificare a setului de date.
.Inserați și .delete comenzi pot fi făcute numai prin intermediul https:   (securizat)   ERDDAP™ URL-uri. Aceasta asigură păstrarea secretă a informațiilor transferate în timpul tranzitului.
     
#### marca temporală{#timestamp} 
Ca parte a sistemului log, EDDtableFromHttpGet adaugă un timbru temporal (momentul în care ERDDAP a primit cererea) la fiecare comandă pe care o stochează în fișierele jurnalului. Pentru că ERDDAP™ genereaza timbrul temporal, nu autorii, nu conteaza daca diferiti autori fac schimbari din computere cu ceasuri setate la momente usor diferite. Ștampila temporală indică în mod fiabil momentul în care modificarea a fost făcută setului de date.
     
#### HTTP POST{#http-post} 
*    ["Dar HTTP Post?"](#http-post)   
HTTP [POST](https://en.wikipedia.org/wiki/POST_(HTTP) ) este alternativa mai bună (comparativ cu HTTP GET ) pentru trimiterea de informații de la un client la un server HTTP. Dacă puteți, sau dacă doriți cu adevărat să îmbunătățiți securitatea, utilizați Post în loc de GET pentru a trimite informațiile la ERDDAP . Postul este mai sigur deoarece: cu GET și https , URL-ul este transmis într-un mod sigur, dar întregul URL (inclusiv parametrii, inclusiv autorul\\_cheie) vor fi scrise apaşilor, lui Tomcat şi ERDDAP™ jurnal de fișiere, în cazul în care cineva le-ar putea citi în cazul în care fișierele nu sunt securizate în mod corespunzător. Cu POST, parametrii sunt transmise într-un mod sigur și nu sunt scrise la fișierele jurnal. Post este un pic mai greu pentru clienții să lucreze cu și nu este susținut la fel de larg de software-ul client, dar limbajele de programare îl susțin. Conținutul pe care îl trimiteți setului de date prin GET sau POST va fi același, formatat într-un mod diferit.
     
####  http Obține solicitarea Variabile Atribut global{#httpgetrequiredvariables-global-attribute} 
O parte esențială a ceea ce face ca întregul sistem să funcționeze este atributul global necesar http Obține solicitarea Variabile, care este o listă separată de virgulă a dataVariable numele surselor care identifică în mod unic un rând de date. Acest lucru ar trebui să fie cât mai minim posibil și va include aproape întotdeauna variabila de timp. De exemplu, aici sunt recomandate http Obține solicitarea Variabile pentru fiecare [CF Geometrii de eșantionare discrete (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)   (Desigur, numele de identificare pot fi diferite în setul de date.) :

* Pentru TimeSeries: stationID , timp
* Pentru Traiectorie: Traiectorie ID, timp
* Pentru profil: timp (Presupunerea timpului este profilul\\_id) , adâncime
* Pentru TimeSeries Profil: stationID , timp (Presupunerea timpului este profilul\\_id) , adâncime
* Pentru Traiectorie Profil: Traiectorie ID, timp (Presupunerea timpului este profilul\\_id) , adâncime

    
Luarea de timpSeries ca exemplu:
Date fiind o comandă .inserați care include stationID =46088 și timp=2016-06-23T19:53:00Z (și alte valori pentru alte variabile) :
* Dacă nu există date existente pentru stația respectivă și pentru acea perioadă, atunci efectul va fi adăugarea datelor la setul de date.
* Dacă există date existente pentru acea stație și pentru acea perioadă, atunci efectul va fi înlocuirea rândului de date existent cu aceste date noi. (Desigur, deoarece ERDDAP™ păstrează jurnalul fiecărei comenzi pe care o primește, datele vechi sunt încă în jurnal. Dacă un utilizator solicită date dintr-o versiune a setului de date înainte de această modificare, acesta va vedea datele mai vechi.)   
         
####  http Get DirectoryStructure{#httpgetdirectorystructure} 
*    [ http Get Directory Structura Atribute globale și date (Jurnal) Nume fișiere](#httpgetdirectorystructure)   
O parte din ceea ce face acest sistem să funcționeze eficient este că ERDDAP™ creează un set de date (jurnal) fișiere, fiecare cu o altă bucată de set de date. Dacă acestea sunt stabilite bine, ERDDAP™ va putea răspunde rapid la majoritatea cererilor de date. Această configurare este specificată de către http GetDirectoryStructure global atribut, care este un String care arata ca un nume de fișier relativ, de exemplu, " stationID /10 ani," dar este de fapt o specificație pentru structura directorului. Părțile care indică modul în care directorul și numele de fișiere pentru date (jurnal) Dosarele vor fi construite.
    
    * Dacă o parte este un număr întreg (&gt; 1) plus un timpPeriod (milisecunde, al doilea, minut, oră, dată, lună, an sau pluralele acestora) , de exemplu, 10 ani, apoi setul de date EDDFromHttpGet va lua valoarea timpului pentru rândul de date (De exemplu, 2016-06-23T19:53:00Z) , calculează timpul trunchiat la acea precizie (de exemplu, 2010) , și să facă un dosar sau un nume de fișier din asta.
        
Scopul este de a obține o bucată rezonabilă de date în fiecare fișier, dar mult mai puțin de 2GB.
        
    * În caz contrar, partea din caietul de sarcini trebuie să fie: dataVariable 's sourceName , de exemplu, stationID . În acest caz, EDDtableFromHttpGet va face un dosar sau un nume de fișier din valoarea variabilei pentru noul rând de date (de exemplu, "46088") .
    
Deoarece datele de comandă .inserați și .delete sunt stocate în date specifice (jurnal) fișiere, EDDtableFromHttpGet de obicei trebuie doar să deschidă unul sau câteva date (jurnal) fișiere pentru a găsi datele pentru o cerere dată de utilizator. Și pentru că fiecare date (jurnal) fişier are toate informaţiile relevante pentru bucata sa de set de date, este rapid şi uşor pentru EDDTabelulFromHttpGet pentru a face o versiune specifică (sau versiunea curentă) a setului de date pentru datele din fișierul respectiv (și nu trebuie să genereze versiunea solicitată a întregului set de date) .
    
Orientările generale se bazează pe cantitatea și frecvența datelor. Dacă presupunem 100 de octeți pe rând de date, atunci ...
``` 
    | Frequency  <br>of measurements | Recommended  <br>httpGetDirectoryStructure |
    | --- | --- |
    | \\>=1 per second | *featureID*/1year/1day |
    | \\>=1 per minute | *featureID*/2months |
    | \\>=1 per hour | *featureID*/10years |
    | \\>=1 per day | *featureID* |
```
De exemplu, dacă structura directorului este stationID /2luni și introduceți date din două stații (46088 și 46155) cu valori ale timpului din decembrie 2015 până în mai 2016, EDDTABLEFromHttp Obțineți va crea directoare numite 46088 și 46155 și crea fișiere în fiecare numit 2015-11 .json L, 2016-01 .json L, 2016-03 .json L, 2016-05 .json l (fiecare exploatație în valoare de 2 luni de date pentru stația relevantă) . În orice moment în viitor, dacă utilizați .inserați sau .lete pentru a modifica sau șterge datele pentru, de exemplu, stația 46088 la 2016-04-05T14:45:00Z, EDDtableFromHtp Obțineți va adăuga această comandă la 46088/2016-03 .json l, datele relevante (jurnal) Dosar. Și în mod clar, este bine să se adauge date pentru alte stații în orice moment în viitor, deoarece setul de date va crea pur și simplu directoare suplimentare, după cum este necesar, pentru a deține datele de la noile stații.
    
####  http Get Keys{#httpgetkeys} 
Fiecare tabel EDD De la Http Obținerea setului de date trebuie să aibă un atribut global http GetKeys care specifică lista autorilor admiși și cheile lor secrete ca o listă separată de virgulă *autor\\_key* , de exemplu, JohnSmith\\_ someKey1, HOBOLogger\\_ some Key2, QCScript59\\_ some Key3.
* autor\\_key's sunt sensibile la caz și trebuie să fie în întregime caractere ASCII (#33 - #126, și fără nici o virgulă, " sau " caractere
* Cheile sunt ca parole, astfel încât acestea trebuie să fie &gt;8 caractere, greu de ghicit, și fără cuvinte dicționar intern. Ar trebui să le tratezi aşa cum ar trebui să tratezi parolele... să le ţii private.
* Primul personaj "\\_" separă autorul de cheie, astfel încât numele de autor nu poate include un "\\_" caracter (dar o cheie poate) .
* Orice autor dat poate avea unul sau mai mulţi autori, de exemplu JohnSmith Key1, JohnSmith\\_some Key7, etc.
* Puteți schimba valoarea acestui atribut oricând. Modificările intră în vigoare data viitoare când setul de date este încărcat.
* Aceste informații vor fi eliminate din Atributurile globale ale setului de date înainte de a fi făcute publice.
* Fiecare cerere adresată setului de date pentru introducerea sau ștergerea datelor trebuie să includă un &autor = *autor\\_key* parametru. după verificarea valabilității cheii, ERDDAP™ salvează doar partea de autor (nu cheia.) în fișierul de date.

#### Configurare{#set-up} 

Iată etapele recomandate pentru stabilirea unui set de date EDDFromHttpGet:

1. Asigurați directorul principal pentru a deține datele acestui set de date. De exemplu, să folosim /date/testGet/ . Utilizatorul care rulează GenerateDatasetsXml și utilizatorul care rulează ERDDAP™ ambele trebuie să aibă acces la acest director.
     
2. Utilizați un editor de text pentru a face un eșantion .json l Fișier CSV cu extensia .json Eu în acel director.
Numele nu este important. De exemplu, ai putea numi mostra .json l
Face o linie 2 .json l fișier CSV, cu nume de coloane pe prima linie și valori atipice/tipice (tipului corect de date) pe linia a doua. Aici este un fișier eșantion care este potrivit pentru o colecție de featureType =TimeSeries date care au măsurat temperatura aerului și a apei.
     \\[ Pentru featureType = Traiectorie, s-ar putea schimba stationID pentru a fi Traiectoria ID. \\]   
     \\[ Pentru featureType =Profil, s-ar putea schimba stationID a fi profilID și a adăuga o variabilă de adâncime. \\] 
    
     \\[ " stationID "; "time" , "latitudine," "longitudine," "airTemp," "waterTemp," "timestamp," "author," "comandant" \\] 
     \\[ "MyStation," "2018-06-25T17:00:00Z," 0.0, 0.0, 0.0, 0.0, "SomeBody," 0 \\] 
    
Notã:
    * Valorile reale ale datelor nu contează deoarece veți șterge în cele din urmă acest fișier, dar acestea ar trebui să fie de tipul corect de date. În special, variabila temporală ar trebui să utilizeze același format pe care îl vor utiliza datele reale din sursă.
    * Pentru toate variabilele, sourceName va egala destinationName , astfel încât să utilizeze numele variabile corecte / finale acum, inclusiv timp, latitudine, longitudine și uneori adâncime sau altitudine, dacă variabilele cu aceste informații vor fi incluse.
    * Aproape întotdeauna va exista o variabilă numită timp care înregistrează momentul în care a fost făcută observaţia. Acesta poate fi DataType String cu [unități adecvate pentru timpii corzilor](#string-time-units)   (de exemplu, yyyy-MM-dd 'T'HH:mm:ss.SSSZ) sau date Tip dublu cu [unități adecvate pentru perioade numerice](#time-units)   (De exemplu, secunde de la 1970-01-01T 00:00:00Z, sau un alt timp de bază) .
    * Trei coloane (De obicei, ultimele trei) Trebuie să fie timbru, autor, comandă.
    * Coloana de timbru temporal va fi utilizată de EDDTableFromHttpGet pentru a adăuga un timbru temporal care indică momentul în care a adăugat o anumită linie de date în fișierul de date. Acesta va avea dateType dublu și unități secunde din 1970-01-01T 00:00:00Z.
    * Coloana autorului cu DataType String va fi folosită pentru a înregistra ce autor autorizat a furnizat datele acestei linii. Autorii autorizaţi sunt specificaţi de către [ http Atributul global GetKeys](#httpgetkeys) . Deși cheile sunt specificate ca *autor\\_key* și sunt în URL-ul "Cererere" în această formă, numai partea de autor este salvată în fișierul de date.
    * Coloana de comandă cu octet de dateType va indica dacă datele de pe această linie sunt o inserție (0) sau o ștergere (1) .
         
3. Rulează datele generate Xml și spune-l
    
    1. Tipul setului de date este tabelul EDDFromHttpGet
    2. Dosarul este (de exemplu) /date/test Get/
    3. Fișierul de eșantionare este (de exemplu) /data/testGet/startup .json l
    4. ă http Obține solicitarea Variabilele sunt (de exemplu)   stationID , timp A se vedea descrierea [ http GetRequiredVariables](#httpgetrequiredvariables-global-attribute) Mai jos.
    5. Dacă datele sunt colectate la fiecare 5 minute, http GetDirectoryStructure pentru acest exemplu este stationID Două luni. A se vedea descrierea [ http Get DirectoryStructure](#httpgetdirectorystructure) Mai jos.
    6. ă [ http Get Keys](#httpgetkeys) 
    
Adaugă ieșirea (bucată de datasets.xml pentru setul de date) la datasets.xml .
     
4. Editează datasets.xml bucată pentru acest set de date pentru a face corect și complet.
În mod special, înlocui toate ???? cu conţinut corect.
     
5. Pentru&lt;Setare tabel fișier în memorie &gt;:
    * Setează acest lucru la adevărat în cazul în care setul de date va primi, de obicei, frecvente .inserați și/sau .delete cereri (de exemplu, mai des decât o dată la 10 secunde) . Acest lucru ajută EDDtableFromHttpGet să răspundă mai repede la .Inserați și/sau .delete cereri. Dacă setați acest lucru la adevărat, EDDtableFromHttpGet va salva în continuare tabelul de fișiere și informații aferente pe disc periodic (după cum este necesar, aproximativ la fiecare 5 secunde) .
    * Setați acest lucru la fals (implicit) în cazul în care setul de date devine, de obicei, rar .inserați și/sau .delete cereri (de exemplu, mai puțin de o dată la 10 secunde) .
         
6. Notã: Este posibil să se utilizeze&lt;cacheFromurl&gt; și setările asociate în datasets.xml pentru tabelul EDD De la Http Obțineți seturi de date ca o modalitate de a realiza și menține o copie locală a unui set de date EDD de la distanțăFromHttpGet pe un alt set de date ERDDAP . Cu toate acestea, în acest caz, acest set de date local va respinge orice cereri .inserați și .delete.

#### Utilizarea tabelului EDD De la HttpGet Datasets{#using-eddtablefromhttpget-datasets} 

* Autorii pot face "cereri" care [introduceți date în sau ștergeți date din set de date](#insert-and-delete) .
     
* După introducerea datelor reale în setul de date, puteți și ar trebui să ștergeți fișierul original cu date din eșantion.
     
* Utilizatorii pot solicita date din setul de date, așa cum fac pentru orice alt set de date al tabelului EDD în ERDDAP . În cazul în care cererea nu include o constrângere asupra coloanei de timbru temporal, cererea primește date din versiunea curentă a setului de date (fișierul jurnal după procesarea tuturor comenzilor de inserare și ștergere și re-sortarea prin http GetRequiredVariables) .
     
* Utilizatorii pot face, de asemenea, cereri specifice tabelului EDDFromHttpGet settings:
    * Dacă cererea include&lt;sau&lt;= constrângerea coloanei de timp, apoi ERDDAP™ procesează rândurile fișierului jurnal până la data specificată. De fapt, acest lucru elimină temporar toate modificările aduse setului de date de la această valoare a timbrului temporal. Pentru mai multe informații, a se vedea [Versiune](#versioning) .
    * În cazul în care cererea include un &gt;, &gt; sau = constrângeri ale coloanei de timp, de exemplu, ștampilă & timp&lt;=0, apoi ERDDAP™ returnează datele din fișierele de date așa cum este, fără a procesa comenzile de inserare și ștergere.
* În viitor, ne imaginăm că instrumentele vor fi construite (De noi? De tine?) pentru a lucra cu aceste seturi de date. De exemplu, ar putea exista un script care citește fișierele de jurnal brut, aplică o ecuație de calibrare diferită și generează/actualizează un set de date diferit cu aceste informații derivate. Rețineți că script-ul poate obține datele originale printr-o cerere la ERDDAP™   (care devine datele în formatul de fișier, care este mai ușor pentru script-ul să lucreze cu) și să genereze/actualizeze noul set de date prin .inserați "cererile" către ERDDAP . Scenariul nu are nevoie de acces direct la fişierele de date; poate fi pe computerul oricărui autor autorizat.
     

#### Informații detaliate despre tabelul EDDFromHttpGet{#detailed-information-about-eddtablefromhttpget} 

Subiectele sunt:

*    [Nu schimba aranjamentul&#33;](#dont-change-the-setup) 
*    [CRUD](#crud) 
*    [Solicitări nevalabile](#invalidrequests) 
*    [Viteza](#httpget-speed) 
*    [Robust](#robust) 
*    [Fiabilitatea sistemului](#system-reliability) 
*    [Versiune](#versioning) 
*    ["Dar HTTP Put şi DELETE?"](#https-put-and-delete) 
*    [Note](#httpget-notes) 
*    [Mulţumesc pentru ideea de bază.](#thanks) 

Iată informațiile detaliate:

##### Nu schimba aranjamentul&#33;{#dont-change-the-setup} 
Odată ce setul de date a fost creat și ați adăugat date la acesta:

* NU adăugați sau eliminați dataVariable c.
* Nu schimba sourceName sau destinationName al dataVariable c.
* Nu schimba datele Tipul dataVariable c. Dar poţi schimba dataVariable Metadatele.
* Nu schimba http Obține solicitarea Variabile atribut global.
* Nu schimba http Obţineţi atributul Global DirectoryStructure.

Dacă trebuie să modificați oricare dintre aceste lucruri, faceți un nou set de date și transferați toate datele în noul set de date.
     
##### CRUD{#crud} 
În informatică, cele patru comenzi fundamentale pentru lucrul cu un set de date sunt [Create, citite, actualizate, delete (CRUD) ](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) . SQL, limba de lucru cu baze de date relaţionale, are echivalentul în INSERT, SELECT, UPDATE şi DELETE. În tabelul EDD de la HttpGet,

* .inserați este o combinație de CREATE și UPDATE.
* Delete este DELETE.
* Sistemul regulat de solicitare a subseturilor de date este READ.

Astfel, tabelul EDDFromHttpGet suportă toate comenzile fundamentale pentru lucrul cu un set de date.
     
* .Inserați sau .delete cereri fără erori vor returna codul de stare HTTP=200 și un obiect JSON, de exemplu,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-03-26T15:34:05.552Z",
    "numericTimestamp":1.522078445552E9
    }
```
Cele două valori temporale se referă la aceeași milisecundă, care este milisecunda care va fi stocată în variabila timbrului temporal pentru rândurile de date care au fost introduse sau șterse. ERDDAP™ nu va schimba numele și formatarea acestor perechi de valori-cheie în viitor. ERDDAP™ pot adăuga perechi de valori-cheie suplimentare la obiectul JSON în viitor.
     
##### Solicitări nevalabile{#invalidrequests} 
Solicitările nevalabile .inserați sau .delete vor returna un cod de stare de eroare HTTP, altul decât status=200 și nu se va face nicio modificare a setului de date. Aceasta include cereri cu informații incorecte de autor, nume variabile incorecte, lungimi diferite de matrice pentru variabile diferite, variabilele lipsă necesare, lipsa valorilor variabile necesare, etc. În cazul în care cererea implică mai mult de un fișier de date, este posibil ca o parte din cerere să aibă succes și o parte să eșueze. Cu toate acestea, acest lucru nu ar trebui să fie o problemă în cazul în care senzorul trimiterea cererii tratează orice eșec ca un eșec complet. De exemplu, dacă vă spun ERDDAP™ de introdus (sau șterge) aceleași date de două ori la rând, cel mai rău caz este că informațiile sunt stocate de două ori, se închid împreună în fișierul jurnal. Este greu de văzut cum ar putea provoca probleme.
     
##### Viteza HttpGet{#httpget-speed} 
Pentru .inserați sau .delete cereri (fără numărare http cheltuieli generale) , cifrele ballpark viteza de .inserați sau .delete sunt
1ms per .inserați cu 1 rând de date
2ms per.Inserați cu 10 rânduri de date în matrice ( \\[  \\] )   
3m per .Inserați cu 100 de rânduri de date în matrice ( \\[  \\] )   
13m per .Inserați cu 1000 de rânduri de date în matrice ( \\[  \\] )   
În mod clar, array-urile sunt cheia [debit mare](#httpget-speed) . Fără array-uri, va fi dificil să introduceți sau .delete mai mult de 8 rânduri de date pe secundă de la un autor la distanță (din cauza tuturor cheltuielilor generale ale rețelei) . Cu array-uri, va fi ușor de .inserați sau .delete mai mult de 1000 de rânduri de date pe secundă de la un senzor de la distanță.

Cu cantități foarte mari de date pe cerere, veți atinge limita Tomcat la lungimea maximă de interogare (Implicit este 8KB?) , dar care pot fi crescute prin editarea maxHttpHeaderSize setarea în dumneavoastră *Tomcat* /conf/server.xml's HTTP/1.1 Intrare Conector.

Când ERDDAP™ citeste datele JSON Lines CSV (jurnal) Fişiere, există o mică penalizare în timp în comparaţie cu citirea fişierelor binare. Am simțit că acest timp penalizare atunci când citirea a fost un preț rezonabil pentru a plăti pentru viteza și robustețea sistemului atunci când scrie date (care este de importanță primară) .

##### SSD{#ssd} 
 [Pentru o viteză mai mare,](#ssd) a utiliza [Unitate de stat solidă (SSD) ](https://en.wikipedia.org/wiki/Solid-state_drive) pentru a stoca datele. Au un timp mult mai rapid de acces la fișiere (&lt;0.1ms) decât hard disk-urile (3 - 12 ms) . De asemenea, au o rată mai rapidă de transfer de date (200 - 2500 MB/s) decât hard disk-urile (~200 MB/s) . Costul lor a scăzut considerabil în ultimii ani. Deși SSD a avut probleme timpurii după un număr mare de scrieri într-un anumit bloc, această problemă este acum mult redusă. Dacă doar utilizați SSD pentru a scrie datele o dată apoi citiți-l de multe ori, chiar și un SSD de consum (care este considerabil mai puțin costisitoare decât o SSD de grad întreprindere) ar trebui să dureze mult timp.
    
##### Robust{#robust} 
Am încercat să facem acest sistem cât mai uşor şi cât mai robust posibil.
* Sistemul este proiectat pentru a avea fire multiple (De exemplu, senzorul, un script QC automatizat și un om) lucrează simultan la același set de date și chiar la același fișier. O mare parte din acest lucru este posibil prin utilizarea unei abordări jurnal de fișier pentru stocarea datelor și prin utilizarea unui tip de fișier foarte simplu, [JSON Linii fișiere CSV](https://jsonlines.org/examples/) , pentru a stoca datele.
* Un alt mare avantaj pentru JSON Lines CSV este că, în cazul în care un fișier vreodată devine corupt (De exemplu, invalidă din cauza unei erori pe o linie) , este ușor să se deschidă fișierul într-un editor de text și să se stabilească problema.
* Un alt avantaj este, dacă există o eroare pe o linie într-un fișier, sistemul poate citi în continuare toate datele de pe liniile înainte și după linia de eroare. Și sistemul poate loga încă informații suplimentare .Inserați și .delete.
* Un mare avantaj de a utiliza fișiere standard admin-accesibile (comparativ cu o bază de date relațională sau Cassandra sau alt software) : Nu există nici un alt software care trebuie să fie întreţinut şi care trebuie să funcţioneze pentru a stoca sau recupera date. Și este ușor să susțină fișierele standard în orice moment și într-un mod incremental, deoarece datele sunt în bucăți (după un timp, doar fișierul curent-timp pentru fiecare stație se va schimba) . În schimb, este nevoie de eforturi considerabile și de sistem în jos timp pentru a face fișiere externe de rezervă din baze de date și Cassandra.
         
##### Fiabilitatea sistemului{#system-reliability} 
Este rezonabil să se aștepte un server cu ERDDAP™ să ai 99,9% timp -- cam 9 ore de pauză pe an (Deși, puteți folosi că într-o noapte proastă&#33;) .
Dacă sunteți harnic și norocos, s-ar putea obține 99.99% uptime (53 minute pauză pe an) , din moment ce doar câteva reporniri pentru actualizări va dura atât de mult timp.
Ar trebui să iei măsuri extreme. (un server de rezervă separat, sursă de alimentare neîntreruptă, aer condiționat de rezervă, 24x7x365 personal pentru monitorizarea site-ului, etc.) să ai o şansă mică la 99,999% uptime (5,25 minute pauză pe an) . Chiar și atunci, este extrem de puțin probabil că veți atinge 99.999% uptime (sau chiar 99,99%) deoarece problemele sunt adesea în afara controlului dumneavoastră. De exemplu, Amazon Web Service și Google oferă servicii web uimitor de fiabile, dar secțiuni mari ale acestora sunt uneori în jos pentru ore.

Recunoaşte, toată lumea vrea ERDDAP™ pentru a avea 100% uptime, sau cel puțin vanat "șase nouari" (99.9999% uptime este egal cu 32 secunde downtime pe an) , dar nu există nici un fel ai de gând să-l indiferent de cât de mult timp, efort, și bani cheltuiți.

Dar... ERDDAP™ uptime nu este scopul real aici. Scopul este de a construi o încredere **sistem** Unul care nu pierde nicio informaţie. Aceasta este o problemă rezolvabilă.

Solutia este: sa construiesti toleranta defecta in software-ul computerului care trimite datele ERDDAP . Mai exact, acest software ar trebui să mențină o coadă de date care așteaptă să meargă la ERDDAP . Atunci când se adaugă date la coadă, software-ul trebuie să verifice răspunsul de la ERDDAP . Dacă răspunsul nu include datele primite. Nici o eroare., atunci software-ul ar trebui să lase datele în coadă. Atunci când sunt generate și adăugate mai multe date la coadă, software-ul ar trebui să încerce din nou să .inserați datele din coadă (Poate cu \\[  \\] sistem) . Va reuşi sau va eşua. Dacă eşuează, va încerca din nou mai târziu. Dacă scrieți software-ul pentru a lucra în acest fel și în cazul în care software-ul este pregătit să coadă câteva zile în valoare de date, aveți de fapt o șansă bună de încărcare 100% din datele senzorului la ERDDAP . Şi o vei face fără să te străduieşti prea mult.

 \\[ Context: Nu ne-am gândit la asta. [Acesta este modul în care rețelele informatice obțin fiabilitate.](https://en.wikipedia.org/wiki/Reliability_(computer_networking) ) Reţelele de calculatoare sunt în mod inerent nesigure. Deci, atunci când transferați un fișier de la un calculator la altul, software-ul de trimitere știe / așteaptă că unele pachete pot fi pierdute. Dacă nu primeşte o recunoaştere adecvată pentru un pachet dat de receptor, trimite pachetul pierdut. Cu această abordare, software-ul expeditor relativ simplu și receptor poate construi un sistem de transfer de fișiere fiabil pe partea de sus a unei rețele nesigure. \\] 
    
##### De ce JSON Lines CSV fișiere?&#33;{#why-json-lines-csv-files} 
Comment [JSON Linii fișiere CSV](https://jsonlines.org/examples/) - Pentru stocarea datelor. Motivele sunt:

* Motivul principal este: Simplitatea fișierelor JSON Lines CSV oferă un mod rapid, ușor și fiabil de a permite mai multor fire să scrie într-un anumit fișier (De exemplu, prin sincronizarea numelui fișierului) .
* Dacă un fișier JSON Lines CSV a devenit vreodată corupt (De exemplu, invalidă din cauza unei erori pe o linie) , EDDtable FromHttpGet ar putea citi în continuare toate datele de pe toate liniile înainte și după linia de eroare. Sistemul .Inserați și .delete ar putea continua să adauge date noi la fișierul de date.
* Deoarece fişierele JSON Lines CSV sunt fişiere ASCII, dacă un fişier a devenit vreodată corupt, ar fi uşor de reparat (într-un editor de text) .
* Suporturile JSON Lines CSV Unicode siruri de caractere.
* JSON Lines CSV suportă șiruri variabile de lungime (fără a se limita la o anumită lungime maximă) .
* JSON Lines CSV suportă numere întregi de 64 de biți (doruri) .
* Natura formală și sintaxa suplimentară a liniilor JSON CSV (vs CSV de modă veche) oferă o asigurare suplimentară că o anumită linie nu a fost coruptă.

Iniţial am încercat să folosim .nc 3 fișiere cu o dimensiune nelimitată. Cu toate acestea, au existat probleme:

* Principala problemă a fost: Nu există nici o modalitate de încredere pentru a permite mai multe fire pentru a scrie la o .nc 3 fișier, chiar dacă firele cooperează prin scrierea într-un mod sincronizat.
* Dacă .nc 3 fișier devine corupt, .Inserați și .delete sistem nu poate continua să utilizeze fișierul.
* Pentru că .nc 3 fișiere sunt binare, dacă un fișier devine corupt (pe care o fac din cauza problemei cu mai multe fire) sunt extrem de greu sau imposibil de reparat. Nu există unelte pentru reparaţii.
* CF nu are nici o modalitate de a specifica codificarea corzilor, astfel încât nu există nici o modalitate oficială de a sprijini Unicode, de exemplu, codarea UTF-8. Am încercat să obținem CF pentru a sprijini un atribut \\_Encoding, dar nu au putut face nici un progres. ( Unidata , la creditul lor, susține atributul \\_Encoding.) 
*    .nc 3 fişiere suport numai siruri de lungime fixă. Din nou, am încercat să obțineți CF și Unidata pentru a sprijini corzile de lungime variabilă, dar nu au putut face niciun progres.
*    .nc 3 fișiere nu susțin o modalitate ușoară de a distinge variabilele de caracter unic de variabilele String. Din nou, am încercat să obțineți CF și Unidata să sprijine un sistem de identificare a acestor două tipuri de date, dar nu au putut face niciun progres.
*    .nc 3 fișiere suportă doar caractere de 8 biți cu codare nespecificată. Din nou, am încercat să obțineți CF și Unidata să sprijine un sistem de specificare a codării, dar nu au putut face niciun progres.
*    .nc 3 fișiere nu suportă numere de 64 biți (doruri) . Din nou, am încercat să obțineți CF și Unidata să sprijine un sistem pentru mult timp, dar nu au putut face niciun progres.
         
##### Versiune{#versioning} 
Deoarece tabelul EDD De la Http Obțineți un jurnal al tuturor modificărilor aduse setului de date cu timbrul temporal și autorul fiecărei schimbări, acesta poate recrea rapid acel set de date din orice punct al timpului. Într-un fel, există o versiune pentru orice moment în timp. Dacă cererea de date a unui utilizator include o marcă temporală&lt;= constrângere, de exemplu, ștampilă &timp&lt;=2016-06-23T16:32:22.128Z (sau orice moment) , dar nici o constrângere de autor sau comandă, ERDDAP™ va răspunde cererii prin generarea unei versiuni a setului de date începând cu acel moment în timp. Apoi, ERDDAP™ aplică celelalte constrângeri ale utilizatorului, ca și în cazul oricărei alte cereri de date din ERDDAP . Tabelul EDDFromHttpGet este înființat astfel încât acest proces este foarte rapid și eficient, chiar și pentru seturi de date foarte mari.

În mod similar, un utilizator poate afla când setul de date a fost actualizat ultima dată prin solicitarea ...?timestamp&timemark=max (marca temporală) & distinct () 

Și pentru orice cerere de date, pentru orice versiune a setului de date, utilizatorii pot vedea ce autor a făcut modificările și când le-au făcut.

Acest sistem de versiune permite [Ştiinţă reproducabilă](https://en.wikipedia.org/wiki/Reproducibility) pentru că oricine, în orice moment, poate solicita date din versiunea setului de date în orice moment. Această versiune fină nu este posibilă cu nici un alt sistem pe care îl cunoaștem. Mecanismul de bază este foarte eficient, prin faptul că nu este nevoie de spațiu de stocare suplimentar, iar prelucrarea aeriană este cu adevărat minimă.

Nu toată lumea are nevoie de acest tip de versiune fină, dar este extrem de util, poate necesar, în contextul unei organizații mari de gestionare a datelor (De exemplu, OOI, Cubul Pământului, Data Unu și NOAA 's NCEI) unde un set de date poate avea mai mulți autori (De exemplu, senzorul, un script QC automatizat și un editor uman) .

 \\[ Istoric: Nevoia pentru acest tip de versiune a venit pentru mine (Bob.) atunci când citiți despre și discutarea OOI în 2008. La acea vreme, OOI avea un sistem greoi, lent, ineficient de versiune bazat pe Git. Git este mare pentru ceea ce a fost proiectat pentru, dar nu acest lucru. În 2008, în timp ce în cadrul unei discuții OOI, am proiectat un sistem extins, eficient alternativ la OOI pentru gestionarea datelor, inclusiv multe dintre caracteristicile pe care le-am adăugat ERDDAP™ de atunci, și inclusiv acest sistem de versiune. La acea vreme și de atunci, OOI a fost angajat la sistemul lor de versiune și nu interesat de alternative. În 2016, au apărut și alte aspecte ale acestui plan și am început să îl pun în aplicare. Pentru că au existat o mulțime de întreruperi pentru a lucra la alte proiecte, nu am terminat până în 2018. Chiar și acum, eu nu sunt conștient de orice alt sistem de date științifice care oferă acces atât de rapid și ușor la o versiune a datelor din orice punct în timp, pentru schimbarea frecventă a seturilor de date. Sistemele simple de fișiere nu oferă acest lucru. Bazele de date relaţionale nu. Cassandra nu. \\] 
    
##### Pune și șterge HTTPS{#https-put-and-delete} 
*    ["Dar HTTPS Put and DELETE?"](#https-put-and-delete)   
     [Protocolul de transfer al hipertextului (HTTP) ](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) este baza World Wide Web și motivul pentru care URL-urile paginii web încep cu "http://"sau "https://". HTTPS este HTTP cu un strat suplimentar de securitate. În fiecare zi, browsere, scripturi și programe de calculator fac miliarde de HTTP (S)   **GET** cereri pentru a obține informații din surse îndepărtate. HTTP (S) include și alte [verbe](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) , în special PUT (pentru a împinge datele către server) şi DELETE (la DELETE date de pe server) . Da, Put și DELETE sunt modul adecvat de a introduce date în, și șterge datele de la, un set de date prin HTTP (S) . GET este susținut de fiecare bucată de software care poate lucra cu HTTP (S) . E foarte uşor să lucrezi cu GET. Toată lumea știe deja cum să lucreze cu GET și mulți știu cum să utilizeze POST (care poate fi folosit în principal în același mod ca GET) , așa că am făcut EDD Table FromHttpGet de lucru cu GET și Post. Foarte puţini oameni (chiar puțini programatori de calculator) au lucrat vreodată cu PUT și DELETE. Put și DELETE sunt, în general, susținute numai de limbaje informatice, astfel încât utilizarea lor necesită un program abil. Așa că Put și DELETE sunt de obicei o abordare mult mai greoaie având în vedere modul în care instrumentele au evoluat.
     
##### Note HttpGet{#httpget-notes} 
*    [Note](#httpget-notes) 
    * Nu. dataVariable pot avea dateType=char. Utilizați DataType = String în schimb. Dacă ai nevoie de dateType=char, trimite-i un e-mail lui Chris. John la Noaa.gov.
         
##### Mulţumesc.{#thanks} 
*    [Mulţumesc pentru ideea de bază.](#thanks)   
Ideea de bază pentru tabelul EDD de la HttpGet (a. HTTP GET cerere de adăugare a datelor la un set de date) este de la UCAR (NCAA?)   [Servicii de date în timp real în cloud (MENŢIUNEA) ](https://github.com/earthcubeprojects-chords) proiect. Formatul parametrilor din cerere (Repetat *Denumire = valoare* , separate de &s) este același format standard care este folosit de formularele HTML pe pagini web. Este o idee simplă și genială și chiar mai mult pentru că se îmbină perfect cu ERDDAP e sistemul existent pentru tratarea datelor tabulare. Ideea este evidentă în retrospectivă, dar eu (Bob.) Nu m-am gândit la asta. Tabel EDDFromHttp Obțineți utilizări ca idee de bază, combinate cu ideile noastre despre cum să o implementăm, să facem un sistem în ERDDAP™ pentru încărcarea datelor. Altele decât ideea de bază de utilizare a GET pentru a împinge date în sistem, implementarea EDDTABLEFromHttpGet este complet diferită și complet independentă de Chwords și are caracteristici diferite (De exemplu, fișiere jurnal, bucăți de date, diferite sisteme de securitate, suport CRUD, date reproductibile) . Expunerea noastră la Chwords a fost doar un webinar. Nu ne-am uitat la codul lor sau am citit despre proiectul lor pentru că am ştiut imediat că vrem să implementăm sistemul într-un mod diferit. Dar le suntem recunoscători pentru ideea de bază. Referinţa completă la Ch MENŢIUNEA este:
Daniels, M. D., Kerkez, B., Chandrasekar, V., Graves, S., Stamps, D. S., Martin, C., Dye, M., Gooch, R., Bartos, M., Jones, J., Keiser, K. (2014) . Servicii de date în timp real pentru Geoștiințe (MENŢIUNEA) software. UCAR/NCAR -- Laboratorul de observare a Pământului. [https://doi.org/10.5065/d6v1236q](https://doi.org/10.5065/d6v1236q)   
     
### Tabel EDD din Hyrax Fișiere{#eddtablefromhyraxfiles} 
 [ **Tabel EDD din Hyrax Fișiere** ](#eddtablefromhyraxfiles)   (depreciat) agregate fișiere de date cu mai multe variabile, fiecare cu una sau mai multe dimensiuni comune (de exemplu, timpul, altitudinea (sau adâncime) , latitudine, longitudine) , și servit de un [ Hyrax   OPeNDAP server](https://www.opendap.org/software/hyrax-data-server) .

* Acest tip de set este **DEPRECAT** . Soluţia mai nouă şi mai generală este utilizarea [cache Opţiunea de la Url pentru tabelul EDD Din dosare](#cachefromurl)   (sau o variantă) , care face o copie locală a fișierelor la distanță și servește datele din fișierele locale. ă&lt;cacheFromurl&gt; opțiune poate fi utilizată cu orice tip de fișier de date tabular. **   
Dacă nu poţi face asta să meargă, trimite-i un e-mail lui Chris. John la Noaa.gov.
Dacă nu există plângeri înainte de 2020, acest tip de set de date poate fi eliminat. ** 
* Vă recomandăm cu tărie utilizarea [Generează dateName Programul Xml](#generatedatasetsxml) să facă un proiect dur al datasets.xml bucată pentru acest set de date. Puteți apoi edita asta pentru a-l acorda fin.
* În cele mai multe cazuri, fiecare fișier are valori multiple pentru stânga (Prima dată) dimensiunea, de exemplu, timpul.
* Dosarele de multe ori (dar nu trebuie să) au o valoare unică pentru celelalte dimensiuni (De exemplu, altitudinea (sau adâncime) , latitudine, longitudine) .
* Fișierele pot avea variabile de caracter cu o dimensiune suplimentară (de exemplu, nCharacters) .
*    Hyrax Serverele pot fi identificate prin "/dods-bin/nph-dods/" sau "/opendap/" în URL.
* Această clasă de ecran-zgârie Hyrax pagini web cu listele de fișiere din fiecare director. Din acest motiv, este foarte specific formatului actual al Hyrax pagini web. Vom încerca să se adapteze ERDDAP™ rapid dacă/atunci când versiunile viitoare ale Hyrax schimba modul în care fișierele sunt enumerate.
* ă&lt;Setarea fișierelor este ignorată. Deoarece această clasă descarcă și face o copie locală a fiecărui fișier de date la distanță, ERDDAP™ forțează fișierul Dir to be *Big ParentDirectory* /copie / * datasetID * /.
* Pentru&lt; sourceUrl &gt;, utilizaţi URL- ul dosarului de bază al setului de date în Hyrax server, de exemplu,
    &lt; sourceUrl &gt;http://edac-dap.northerngulfinstitute.org/dods-bin/nph-dods/WCOS/nmsp/wcos/&lt;/ sourceUrl &gt;
     (dar pune-l pe o linie)   (Îmi pare rău, acel server nu mai este disponibil.) .
ă sourceUrl pagina web are de obicei " OPeNDAP Index server \\[ nume director \\] "în vârf.
* Din moment ce această clasă descarcă întotdeauna și face o copie locală a fiecărui fișier de date la distanță, nu ar trebui să împacheteze acest set de date în [EDDCommentCopy](#eddtablecopy) .
* Vezi această clasă super clasă, [Tabel EDD din dosare](#eddtablefromfiles) , pentru informații privind modul în care funcționează această clasă și cum să-l folosească.
* A se vedea exemplele 1D, 2D, 3D și 4D pentru [Tabel EDDFromNcFiles](#eddtablefromncfiles) .
     
### Tabel EDD din InvalidCRAFile{#eddtablefrominvalidcrafiles} 
 [ **Tabel EDD din InvalidCRAFile** ](#eddtablefrominvalidcrafiles) date agregate din NetCDF   (v3 sau v4)   .nc fișiere care utilizează o variantă specifică, invalidă, a CF DSG Contiguous Ragged Array (CRA) Dosare. Deşi... ERDDAP™ acceptă acest tip de fișier, este un tip de fișier invalid pe care nimeni nu ar trebui să înceapă să-l utilizeze. Grupurile care utilizează în prezent acest tip de fișier sunt puternic încurajate să utilizeze ERDDAP™ să genereze fișiere DSG CRA valabile și să înceteze să mai utilizeze aceste fișiere.

Detalii: Aceste fișiere au mai multe variabile row\\_size, fiecare cu un atribut eșantion\\_dimensiune. Fișierele sunt fișiere non-CF-standard deoarece eșantionul multiplu (obs) dimensiunile trebuie să fie decodate și legate între ele cu această regulă suplimentară și să promită că nu face parte din specificațiile CF DSG: "puteți asocia o anumită valoare a temperaturii, de exemplu (dimensiunea temp\\_obs) cu o valoare dată a adâncimii (dimensiunea z\\_obs, dimensiunea cu cele mai multe valori) , pentru că: rândul de temperatură\\_size (pentru o anumită distribuţie) va fi fie 0 sau egal cu rândul de adâncime corespunzătoare\\_size (pentru acea distribuţie)   (Asta e regula.) . Deci, în cazul în care rândul de temperatură\\_size nu este 0, atunci N valorile de temperatură pentru care turnat se referă direct la N valorile de adâncime pentru care turnat (Asta e promisiunea.) ."

O altă problemă cu aceste fișiere: the Principal\\_Investigator row\\_size variabila nu are un atribut mostră\\_dimensiuni și nu respectă regula de mai sus.

Fișiere eșantion pentru acest tip de set de date pot fi găsite lahttps://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[ 2020-10-21 Acest server nu mai este disponibil în mod fiabil \\] .

Vezi această clasă super clasă, [Tabel EDD din dosare](#eddtablefromfiles) , pentru informații privind modul în care funcționează această clasă și cum să-l folosească.

Vă recomandăm cu tărie utilizarea [Generează dateName Programul Xml](#generatedatasetsxml) să facă un proiect dur al datasets.xml bucată pentru acest set de date. Puteți apoi edita asta pentru a-l acorda fin.

Primul lucru GenereazăDateSeturi Xml nu pentru acest tip de set de date după ce răspundeți la întrebările este imprima structura ncdump-ca a fișierului eșantion. Deci, dacă introduceți câteva răspunsuri prostesc pentru prima buclă prin GenerateDatesets Xml, cel puţin vei putea vedea dacă ERDDAP™ poate citi fișierul și a vedea ce dimensiuni și variabile sunt în fișier. Apoi, puteți da răspunsuri mai bune pentru a doua buclă prin GenerateDatasetsXml.
 
### Tabel EDD De la JsonlCSVFiles{#eddtablefromjsonlcsvfiles} 
 [ **Tabel EDD De la JsonlCSVFiles** ](#eddtablefromjsonlcsvfiles) date agregate din [JSON Linii fișiere CSV](https://jsonlines.org/examples/) . Vezi această clasă super clasă, [Tabel EDD din dosare](#eddtablefromfiles) , pentru informații privind modul în care funcționează această clasă și cum să-l folosească.

* După cum spune Jsonlines.org, acest format este "Mai bine decât CSV" (Şi legal, ca angajat federal, nu pot fi de acord sau nu cu ei -- cât de nebunesc e asta?) . CSV nu a fost niciodată definită oficial și este împiedicată de bagajele istorice legate de conectarea sa la programele originale de foi de calcul. JSON Lines CSV, în comparație, este pe deplin definită și beneficiază de conexiunea sa la standardul JSON utilizat pe scară largă, care, la rândul său, beneficiază de conexiunea sa la Java Script și Java . În special, există suport complet pentru numere întregi lungi și pentru caractere Unicode în siruri de caractere, și o modalitate clară de a include alte caractere speciale (în special file și linii noi) în corzi.
    
Acest format este deosebit de bun pentru seturile de date unde trebuie să adăugați periodic rânduri suplimentare la sfârșitul unui anumit fișier de date. Din acest motiv și altele (vezi mai sus) , [Tabel EDD de la HttpGet](#eddtablefromhttpget) folosește fișiere Json Lines CSV pentru stocarea datelor.
    
* Fișierele de intrare sunt considerate a fi UTF-8 codificate. Totuşi, având în vedere *dddd* format pentru codificarea caracterelor speciale (De exemplu, \\ \\u20ac este codificarea pentru caracterul Euro) , aveți opțiunea de a scrie fișierele astfel încât acestea să conțină doar 7-biți caractere ASCII prin utilizarea \\ \\u *dddd* Pentru a coda toate personajele de mai sus #127.
     
* Vă recomandăm cu tărie utilizarea [Generează dateName Programul Xml](#generatedatasetsxml) să facă un proiect dur al datasets.xml bucată pentru acest set de date. Puteți apoi edita asta pentru a-l acorda fin.
    
Primul lucru pe care GenerateDatasetsXml îl face pentru acest tip de set de date după ce răspundeți la întrebări este să imprimați structura ncdump-like a fișierului eșantion. Deci, dacă introduceți câteva răspunsuri prostesc pentru prima buclă prin GenerateDatesets Xml, cel puţin vei putea vedea dacă ERDDAP™ poate citi fișierul și a vedea ce dimensiuni și variabile sunt în fișier. Apoi, puteți da răspunsuri mai bune pentru a doua buclă prin GenerateDatasetsXml.
    
* ATENŢIONARE: Când ERDDAP™ citeste JSON Linii fișiere de date CSV, în cazul în care găsește o eroare pe o linie dată (De exemplu, numărul incorect de articole) , înregistrează un mesaj de avertizare ("DEVĂRARE: linie proastă (s) de date" ... cu o listă de linii rele pe liniile ulterioare) la [fișier log.txt](/docs/server-admin/additional-information#log) şi apoi continuă să citească restul fişierului de date. Astfel, este responsabilitatea ta să te uiţi periodic (sau scrie un scenariu pentru a face acest lucru) pentru mesajul din jurnal. txt astfel încât să puteți rezolva problemele din fișierele de date. ERDDAP™ este configurat astfel încât utilizatorii să poată continua să citească toate datele disponibile valabile, chiar dacă unele linii ale fișierului au defecte.
     
### Tabel EDD Din mai multe DosareNc{#eddtablefrommultidimncfiles} 
 [ **Tabel EDD Din mai multe DosareNc** ](#eddtablefrommultidimncfiles) date agregate din NetCDF   (v3 sau v4)   .nc   (sau [ .nc ml](#ncml-files) ) fișiere cu mai multe variabile, fiecare cu una sau mai multe dimensiuni comune. Fișierele pot avea variabile de caracter cu sau fără o dimensiune suplimentară (de exemplu, STRING14) . Vezi această clasă super clasă, [Tabel EDD din dosare](#eddtablefromfiles) , pentru informații privind modul în care funcționează această clasă și cum să-l folosească.

* Dacă fișierele sunt variante multidimensionale CF DSG, utilizați acest tip de set de date în loc de [Tabel EDD din NCFFile](#eddtablefromncfiles) .
     
* Pentru seturi de date tabulare noi din .nc fișiere, utilizați această opțiune înainte de a încerca mai vechi [Tabel EDDFromNcFiles](#eddtablefromncfiles) . Unele avantaje ale acestei clase sunt:
    * Această clasă poate citi mai multe variabile dintr-o varietate mai largă de structuri de fișiere. Dacă specificați DimensiuniCSV (o listă separată de nume de dimensiuni) Comment Xml (sau&lt;dimensiuniCSV&gt; în datasets.xml informații pentru unul dintre aceste seturi de date), apoi ERDDAP™ va citi doar variabilele din fișierele sursă care utilizează unele sau toate aceste dimensiuni, plus toate variabilele scalare. Dacă o dimensiune este într-un grup, trebuie să specificați numele complet al acestuia, de exemplu: " *nume grup/dimensiuneName* ".
    * Această clasă poate respinge de multe ori fișiere foarte repede dacă acestea nu se potrivesc constrângerilor unei cereri. Deci citirea datelor din colecţiile mari va merge mult mai repede.
    * Această clasă se ocupă de adevăratele variabile char (variabile non-coarde) Corect.
    * Această clasă poate reduce variabilele String atunci când creatorul nu a folosit Strings Netcdf-java (care adaugă char #0 pentru a marca sfârșitul șirului) .
    * Această clasă este mai bună la tratarea fișierelor individuale cărora le lipsesc anumite variabile sau dimensiuni.
    * Această clasă poate elimina blocurile de rânduri cu valori lipsă, astfel cum se specifică pentru [CF Geometrii de eșantionare discrete (DSG) Fișiere multidimensionale incomplete](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#_incomplete_multidimensional_array_representation)   
         
* Vă recomandăm cu tărie utilizarea [Generează dateName Programul Xml](#generatedatasetsxml) să facă un proiect dur al datasets.xml bucată pentru acest set de date. Puteți apoi edita asta pentru a-l acorda fin.
    
Primul lucru pe care GenerateDatasetsXml îl face pentru acest tip de set de date după ce răspundeți la întrebări este să imprimați structura ncdump-like a fișierului eșantion. Deci, dacă introduceți câteva răspunsuri prostesc pentru prima buclă prin GenerateDatesets Xml, cel puţin vei putea vedea dacă ERDDAP™ poate citi fișierul și a vedea ce dimensiuni și variabile sunt în fișier. Apoi, puteți da răspunsuri mai bune pentru a doua buclă prin GenerateDatasetsXml.
    
Grupul... Generează dateName Xml va cere un "grup." Puteți introduce "" pentru a avea căuta orice / toate grupurile, " *unele Grup* "sau " *unele grupuri/unele Subgrupuri* "să caute un anumit grup, sau " \\[ rădăcină \\] "să caute doar grupul de rădăcini. Sirul "grup" devine&lt;grupul &gt; în datasets.xml informații privind setul de date (deşi " \\[ rădăcină \\] "devine") .
    
DimensiuniCSV - Generează date Xml va cere un șir de caractere "DimensionsCSV." Aceasta este o listă de valori separate de virgulă a numelor de surse ale unui set de dimensiuni. Generează dateName Xml va citi doar variabilele de date din eșantion .nc fișiere care utilizează unele sau toate aceste dimensiuni (și nici alte dimensiuni) , plus toate variabilele scalare din fișier, și să facă setul de date din aceste variabile de date. Dacă o dimensiune este într-un grup, trebuie să specificați numele complet al acestuia, de exemplu: " *nume grup/dimensiuneName* ".
Dacă nu specificaţi nimic (un șir gol) , Generează date Xml va căuta variabilele cu cele mai multe dimensiuni, pe teoria că acestea vor fi cele mai interesante, dar pot exista momente când va dori să facă un set de date de la un alt grup de variabile de date care utilizează un alt grup de dimensiuni.
Dacă specificaţi doar un nume de dimensiune care nu există (De exemplu, NO\\_MATCH) , ERDDAP™ va găsi toate variabilele scalare.
Coarda "DimensionsCSV" devine&lt;dimensiuniCSV&gt; în datasets.xml informații privind setul de date.
    
#### tratateDimensionsAs{#treatdimensionsas} 
Există o categorie de invalid .nc fișiere (pentru că nu respectă regulile CF) care au dimensiuni multiple (de exemplu, lat, lon, time) atunci când ar fi trebuit să folosească doar o singură dimensiune (De exemplu, timpul) , de exemplu:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
        lat = 1437 ;
        lon = 1437 ;
    variables:
        double time(time) ;
        double lat(lat) ;
        double lon(lon) ;
        float temperature(time, depth) ;
```
Tabelul EDDDe la MultidimNcFiles are o caracteristică specială pentru a face față acestor fișiere: dacă adăugați atributul global "tratatDimensionsAs" la seturile de date globale addAttributes , se poate spune ERDDAP™ pentru a trata anumite dimensiuni (De exemplu, lat şi ln) ca şi cum ar fi o altă dimensiune (De exemplu, timpul) . Valoarea atributului trebuie să fie o listă separată de virgulă care să specifice dimensiunile "din" și apoi dimensiunea "în" de exemplu,
 <att name="treatDimensionsAs"> Lat, lon, time </att>   
Atunci ERDDAP™ va citi fișierul ca și cum ar fi:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
    variables:
        double time(time) ;
        double lat(time) ;
        double lon(time) ;
        float temperature(time, depth) ;
```
Desigur, dimensiunea curentă a fiecărei dimensiuni din listă trebuie să fie aceeași; altfel, ERDDAP™ va trata fişierul ca pe un "Bad File."

Rețineți că aceste fișiere nu sunt valide pentru că nu respectă regulile CF. Deci, chiar dacă ERDDAP™ le puteți citi, vă recomandăm cu tărie să nu creați fișiere ca acestea deoarece alte instrumente software bazate pe CF nu vor putea să le citească corect. Dacă aveți deja astfel de fișiere, vă recomandăm să le înlocuiți cu fișiere valide cât mai curând posibil.
    
### Tabel EDDFromNcFiles{#eddtablefromncfiles} 
 [ **Tabel EDDFromNcFiles** ](#eddtablefromncfiles) date agregate din NetCDF   (v3 sau v4)   .nc   (sau [ .nc ml](#ncml-files) ) fișiere și [Zarr](https://github.com/zarr-developers/zarr-python) fișiere (din versiunea 2.25) cu mai multe variabile, fiecare cu o singură dimensiune comună (de exemplu, timpul) sau mai multe dimensiuni comune (de exemplu, timpul, altitudinea (sau adâncime) , latitudine, longitudine) . Fişierele trebuie să aibă aceleaşi nume de dimensiune. Un anumit fișier poate avea valori multiple pentru fiecare dintre dimensiuni și valorile pot fi diferite în diferite fișiere sursă. Fișierele pot avea variabile de caracter cu o dimensiune suplimentară (de exemplu, STRING14) . Vezi această clasă super clasă, [Tabel EDD din dosare](#eddtablefromfiles) , pentru informații privind modul în care funcționează această clasă și cum să-l folosească.

Fișierele Zarr au un comportament ușor diferit și necesită fie fișierulNameRegex, fie caleaRegex pentru a include "zarr."

* Dacă .nc fișierele utilizează unul dintre [CF Geometrii de eșantionare discrete (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) formate de fișiere, încercați să utilizați [Tabel EDD din NCFFile](#eddtablefromncfiles) înainte de a încerca acest lucru.
     
* Pentru seturi de date tabulare noi din .nc fișiere, încercați mai nou [Tabel EDD Din mai multe DosareNc](#eddtablefrommultidimncfiles) Mai întâi.
     
* Vă recomandăm cu tărie utilizarea [Generează dateName Programul Xml](#generatedatasetsxml) să facă un proiect dur al datasets.xml bucată pentru acest set de date. Puteți apoi edita asta pentru a-l acorda fin.
    
Primul lucru pe care GenerateDatasetsXml îl face pentru acest tip de set de date după ce răspundeți la întrebări este să imprimați structura ncdump-like a fișierului eșantion. Deci, dacă introduceți câteva răspunsuri prostesc pentru prima buclă prin GenerateDatesets Xml, cel puţin vei putea vedea dacă ERDDAP™ poate citi fișierul și a vedea ce dimensiuni și variabile sunt în fișier. Apoi, puteți da răspunsuri mai bune pentru a doua buclă prin GenerateDatasetsXml.
    
DimensiuniCSV - Generează date Xml va cere un șir de caractere "DimensionsCSV." Aceasta este o listă de valori separate de virgulă a numelor de surse ale unui set de dimensiuni. Generează dateName Xml va găsi variabilele de date în .nc fișiere care utilizează unele sau toate aceste dimensiuni, plus toate variabilele scalare, și să facă setul de date din aceste variabile de date. Dacă nu specificaţi nimic (un șir gol) , Generează date Xml va căuta variabilele cu cele mai multe dimensiuni, pe teoria că acestea vor fi cele mai interesante, dar pot exista momente când va dori să facă un set de date de la un alt grup de variabile de date care utilizează un alt grup de dimensiuni.
    
* 1D Exemplu: Fișierele 1D sunt oarecum diferite de 2D, 3D, 4D, ... fișiere.
    * S-ar putea avea un set de .nc fișiere de date în care fiecare fișier are date în valoare de o lună dintr-o geamandură în derivă.
    * Fiecare fișier va avea o dimensiune, de exemplu, timp (dimensiune = \\[ multe \\] ) .
    * Fiecare fișier va avea una sau mai multe variabile 1D care utilizează această dimensiune, de exemplu, timp, longitudine, latitudine, temperatura aerului, ....
    * Fiecare fișier poate avea variabile de caracter 2D, de exemplu, cu dimensiuni (time,nCharacters) .
         
* Exemplu 2D:
    * S-ar putea avea un set de .nc fișiere de date în care fiecare fișier are date în valoare de o lună dintr-o geamandură în derivă.
    * Fiecare fișier va avea 2 dimensiuni, de exemplu, timp (dimensiune = \\[ multe \\] ) şi id (dimensiune = 1) .
    * Fiecare fișier va avea 2 variabile 1D cu aceleași nume ca și dimensiunile și folosind aceeași dimensiune, de exemplu, timp (timp) , id (id) . Aceste variabile 1D trebuie incluse în lista&lt; dataVariable &gt; este în XML-ul setului de date.
    * Fiecare fișier va avea una sau mai multe variabile 2D, de exemplu, longitudine, latitudine, temperatura aerului, temperatura apei, ...
    * Fiecare fișier poate avea variabile de caracter 3D, de exemplu, cu dimensiuni (time,id,nCharacters) .
         
* Exemplu 3D:
    * S-ar putea avea un set de .nc fișiere de date în care fiecare fișier are date în valoare de o lună dintr-o geamandură fixă.
    * Fiecare fișier va avea 3 dimensiuni, de exemplu, timp (dimensiune = \\[ multe \\] ) , lat (dimensiune = 1) , şi (dimensiune = 1) .
    * Fiecare fișier va avea 3 variabile 1D cu aceleași nume ca și dimensiunile și folosind aceeași dimensiune, de exemplu, timpul (timp) , lat (lat) , ul (Pr) . Aceste variabile 1D trebuie incluse în lista&lt; dataVariable &gt; este în XML-ul setului de date.
    * Fiecare fișier va avea una sau mai multe variabile 3D, de exemplu, temperatura aerului, temperatura apei, ...
    * Fiecare fișier poate avea variabile de caracter 4D, de exemplu, cu dimensiuni (time,lat,lon,nCharacters) .
    * Numele fişierului ar putea avea numele geamandurii pe numele fişierului.
         
* Exemplu 4D:
    * S-ar putea avea un set de .nc fișiere de date în cazul în care fiecare fișier are în valoare de o lună de date de la o stație. În fiecare moment, stația ia citiri la o serie de adâncimi.
    * Fiecare fișier va avea 4 dimensiuni, de exemplu, timp (dimensiune = \\[ multe \\] ) , adâncime (dimensiune = \\[ multe \\] ) , lat (dimensiune = 1) , şi (dimensiune = 1) .
    * Fiecare fișier va avea 4 variabile 1D cu aceleași nume ca și dimensiunile și folosind aceeași dimensiune, de exemplu, timp (timp) , adâncime (adâncime) , lat (lat) , ul (Pr) . Aceste variabile 1D trebuie incluse în lista&lt; dataVariable &gt; este în XML-ul setului de date.
    * Fiecare fișier va avea una sau mai multe variabile 4D, de exemplu, temperatura aerului, temperatura apei, ...
    * Fiecare fișier poate avea variabile de caracter 5D, de exemplu, cu dimensiuni (time,deep,lat,lon,nCharacters) .
    * Numele fişierului ar putea avea numele geamandurii pe numele fişierului.
         
### Tabel EDD din NCFFile{#eddtablefromnccffiles} 
 [ **Tabel EDD din NCFFile** ](#eddtablefromnccffiles) agregate date agregate date de la NetCDF   (v3 sau v4)   .nc   (sau [ .nc ml](#ncml-files) ) fișiere care utilizează unul dintre formatele de fișiere specificate de [CF Geometrii de eșantionare discrete (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Convenţii. Vezi această clasă super clasă, [Tabel EDD din dosare](#eddtablefromfiles) , pentru informații privind modul în care funcționează această clasă și cum să-l folosească.

Pentru fișierele care utilizează una dintre variantele multidimensionale CF DSG, utilizați [Tabel EDD Din mai multe DosareNc](#eddtablefrommultidimncfiles) În schimb.

Convențiile CF DSG definesc zeci de formate de fișiere și includ numeroase variații minore. Această clasă se ocupă de toate variaţiile pe care le cunoaştem, dar s-ar putea să fi ratat una. (sau mai mult) . Deci, dacă această clasă nu poate citi date din fișierele DSG CF, vă rugăm [să solicite sprijin suplimentar](/docs/intro#support) .

Vă recomandăm cu tărie utilizarea [Generează dateName Programul Xml](#generatedatasetsxml) să facă un proiect dur al datasets.xml bucată pentru acest set de date. Puteți apoi edita asta pentru a-l acorda fin.
 
### Tabel EDD de la NCCSvFiles{#eddtablefromnccsvfiles} 
 [ **Tabel EDD de la NCCSvFiles** ](#eddtablefromnccsvfiles) date agregate din [NCCSV](/docs/user/nccsv-1.00) Fișiere ASCII.csv. Vezi această clasă super clasă, [Tabel EDD din dosare](#eddtablefromfiles) , pentru informații privind modul în care funcționează această clasă și cum să-l folosească.

* Vă recomandăm cu tărie utilizarea [Generează dateName Programul Xml](#generatedatasetsxml) să facă un proiect dur al datasets.xml bucată pentru acest set de date. Puteți apoi edita asta pentru a-l acorda fin.
    
Primul lucru pe care GenerateDatasetsXml îl face pentru acest tip de set de date după ce răspundeți la întrebări este să imprimați structura ncdump-like a fișierului eșantion. Deci, dacă introduceți câteva răspunsuri prostesc pentru prima buclă prin GenerateDatesets Xml, cel puţin vei putea vedea dacă ERDDAP™ poate citi fișierul și a vedea ce dimensiuni și variabile sunt în fișier. Apoi, puteți da răspunsuri mai bune pentru a doua buclă prin GenerateDatasetsXml.
    
* ATENŢIONARE: Când ERDDAP™ citeste fisierele de date NCCSV, daca gaseste o eroare pe o linie data (De exemplu, numărul incorect de articole) , înregistrează un mesaj de avertizare ("DEVĂRARE: linie proastă (s) de date" ... cu o listă de linii rele pe liniile ulterioare) la [fișier log.txt](/docs/server-admin/additional-information#log) şi apoi continuă să citească restul fişierului de date. Astfel, este responsabilitatea ta să te uiţi periodic (sau scrie un scenariu pentru a face acest lucru) pentru mesajul din jurnal. txt astfel încât să puteți rezolva problemele din fișierele de date. ERDDAP™ este configurat astfel încât utilizatorii să poată continua să citească toate datele disponibile valabile, chiar dacă unele linii ale fișierului au defecte.
     
### Tabel EDDFromNOS{#eddtablefromnos} 
 [ **Tabel EDDFromNOS** ](#eddtablefromnos)   (DEPRECAT) se ocupă de date de la o NOAA   [NOS](https://opendap.co-ops.nos.noaa.gov/axis/) sursă, care utilizează [ SOAP+XML ](https://www.w3schools.com/xml/xml_soap.asp) pentru cereri și răspunsuri. Este foarte specific NOAA XML-ul lui NOS. A se vedea setul de date EDDFromNOS din seturile de date2.xml.
 
### Tabel EDD FromOBIS{#eddtablefromobis} 
 [ **Tabel EDD FromOBIS** ](#eddtablefromobis) gestionează datele dintr-un sistem de informații biogeografice oceanice (OBIS) server (a fosthttp://www.iobis.org ) . Este posibil să nu mai existe servere active care utilizează acest tip de server OBIS în prezent.

* Serverele OBIS așteaptă o cerere XML și returnează un răspuns XML.
* Deoarece toate serverele OBIS servesc aceleași variabile în același mod (a fosthttp://iobis.org/tech/provider/questions) , nu trebuie să specifice mult pentru a configura un set de date OBIS în ERDDAP .
* Trebuie să includeţi un " creator\\_email " atribut la nivel mondial addAttributes Din moment ce informaţia este folosită în licenţă. O adresă de e-mail adecvată poate fi găsită citind răspunsul XML de la sursăURL.
* Puteți sau nu poate fi capabil de a obține atributul global [&lt; subsetVariables &gt;] (#Subsetvariables) să lucreze cu un server OBIS dat. Dacă încerci, încearcă o variabilă. (De exemplu, denumirea științifică sau genus) .
#### Tabel EDD FromOBIS Name{#eddtablefromobis-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromOBIS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceCode>...&lt;/sourceCode>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- If you read the XML response from the sourceUrl, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source code (for example, GHMP) is the value from one of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;resource>&lt;code> tags. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- All ...SourceMinimum and Maximum tags are OPTIONAL -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMinimum>...&lt;/longitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMaximum>...&lt;/longitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMinimum>...&lt;/latitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMaximum>...&lt;/latitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For timeSource... tags, use yyyy-MM-dd'T'HH:mm:ssZ format. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMinimum>...&lt;/timeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMaximum>...&lt;/timeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1.  This MUST include  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"creator\\_email" -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Tabel EDD din dosare de parchet{#eddtablefromparquetfiles} 
 [ **Tabel EDD din dosare de parchet** ](#eddtablefromparquetfiles) se ocupă de datele de la [Parchet](https://parquet.apache.org/) . Vezi această clasă super clasă, [Tabel EDD din dosare](#eddtablefromfiles) , pentru informații privind modul în care funcționează această clasă și cum să-l folosească.

* Parchetul este proiectat pentru a comprima foarte eficient, astfel încât să vă poate oferi dimensiuni mai mici fișiere decât alte formate.
* Vă recomandăm cu tărie utilizarea [Generează dateName Programul Xml](#generatedatasetsxml) să facă un proiect dur al datasets.xml bucată pentru acest set de date. Puteți apoi edita asta pentru a-l acorda fin.
* ATENŢIONARE: Când ERDDAP™ citește fișierele de date Parquet, în cazul în care găsește o eroare pe o linie dată (De exemplu, numărul incorect de articole) , înregistrează un mesaj de avertizare ("DEVĂRARE: linie proastă (s) de date" ... cu o listă de linii rele pe liniile ulterioare) la [fișier log.txt](/docs/server-admin/additional-information#log) şi apoi continuă să citească restul fişierului de date. Astfel, este responsabilitatea ta să te uiţi periodic (sau scrie un scenariu pentru a face acest lucru) pentru mesajul din jurnal. txt astfel încât să puteți rezolva problemele din fișierele de date. ERDDAP™ este configurat astfel încât utilizatorii să poată continua să citească toate datele disponibile valabile, chiar dacă unele linii ale fișierului au defecte.
     
### Tabel EDD din SOS  {#eddtablefromsos} 
 [ **Tabel EDD din SOS ** ](#eddtablefromsos) tratează datele de la un serviciu de observare a senzorilor (USW/ [ SOS ](https://www.ogc.org/standards/sos) ) server.

* Acest tip de set de date agregate dintr-un grup de stații care sunt toate deservite de unul SOS server.
* Toate staţiile servesc acelaşi set de variabile. (Deși sursa pentru fiecare stație nu trebuie să servească toate variabilele) .
*    SOS serverele așteaptă o cerere XML și returnează un răspuns XML.
* Vă recomandăm cu tărie utilizarea [Generează dateName Programul Xml](#generatedatasetsxml) să facă un proiect dur al datasets.xml bucată pentru acest set de date. Puteți apoi edita asta pentru a-l acorda fin. Nu este ușor să generezi setul de date XML pentru SOS Seturi de date manual. Pentru a găsi informațiile necesare, trebuie să vizitați sourceUrl +"? service = SOS & Cerere = GetCapabilities " într-un browser; uita-te la XML; face o cerere GetObservation de mână; și uita-te la răspunsul XML la cerere.
* Cu adăugarea ocazională de noi tipuri de SOS servere și modificări la serverele vechi, este din ce în ce mai greu pentru ERDDAP™ pentru a detecta automat tipul serverului din răspunsurile serverului. Utilizarea&lt;sosServerType&gt; (cu o valoare de IOOS\\_NDBC, IOOS\\_NOS, OOSTethys , sau WHOI) este acum recomandată în mod puternic. Dacă aveți probleme cu orice seturi de date de acest tip, încercați re-running GenerateDatesets Xml pentru SOS server. Generează Setări de date Xml vă va lăsa să încercați diferite&lt;sosServerType&gt; opțiuni până când găsiți cel potrivit pentru un server dat.
*    SOS prezentare generală:
    * SWE (Activare Web senzor) şi SOS   (Serviciul de observare a senzorilor) sunt [Standarde OpenGIS®](https://www.ogc.org/standards) . Acel site are documentele standardelor.
    * ă OGC Servicii web Specificaţie comună ver 1.1.0 ( OGC 06-121r3) acoperă construirea de întrebări GET și Post (Vezi secţiunea 7.2.3 şi secţiunea 9) .
    * Dacă trimiteți o cerere GETCapabilități xml la o SOS server ( sourceUrl + "?service= SOS & Cerere = GetCapabilities ") , veți obține un rezultat xml cu o listă de stații și observate Proprietăți pentru care au date.
    * Un URI observat este o referire oficială la o proprietate. De exemplu, urn:ogc:fenomenon:longitudine:wgs84 sauhttps://mmisw.org/ont/cf/parameter/sea\\_water\\_temperature
    * O proprietate observată nu este o variabilă.
    * Pot fi observate mai multe variabile Proprietate (de exemplu, în interiorul și în afara Temp Tempul ar fi putut fi observat Proprietatehttps://mmisw.org/ont/cf/parameter/air\\_temperature) .
    * Dacă trimiteți o cerere getObservation xml la o SOS server, veți obține un rezultat xml cu descrieri ale numelor de câmp în răspuns, unități de câmp, și datele. Numele câmpului va include longitudine, latitudine, adâncime (Poate.) Şi timpul.
    * Fiecare dataVariable pentru un tabel EDDDe la SOS trebuie să includă un atribut "observedProperty," care identifică Property observat care trebuie solicitat de la server pentru a obține acea variabilă. De multe ori, mai multe dataVariable s va enumera aceeași structură observatăProperty.
    * Tipul de date pentru fiecare dataVariable nu poate fi specificat de server. Dacă da, trebuie să vă uitați la răspunsurile de date XML de pe server și să atribuiți corespunzător [&lt;DataType &gt;s] (#Tipul de date) în ERDDAP™ Set de date dataVariable definiții.
    *    (La momentul scrierii acestui) unele SOS serverele răspund la cererile de getObservation pentru mai mult de unul observat Proprietatea prin doar returnarea rezultatelor pentru prima dintre Properties observate. (Nici un mesaj de eroare&#33;) A se vedea cererea parametrului constructorului Properties ObservateSeparately.
* Tabel EDD din SOS adaugă automat
  >  <att name="[subsetVariables](#subsetvariables)">station\\_id, longitude, latitude</att>  
la atributele globale ale setului de date atunci când se creează setul de date.
*    SOS serverele exprimă de obicei [unități](#units) cu [UCUM](https://unitsofmeasure.org/ucum.html) sistem. Majoritatea ERDDAP™ servere express unități cu [ UDUNITS ](https://www.unidata.ucar.edu/software/udunits/) sistem. Dacă aveţi nevoie pentru a converti între cele două sisteme, puteţi utiliza [ ERDDAP Serviciul web pentru a converti unitățile UCUM la/de la UDUNITS ](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html) .
#### Tabel EDD din SOS Name{#eddtablefromsos-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromSOS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sosServerType>...&lt;/sosServerType> &lt;!-- 0 or 1, but STRONGLY  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RECOMMENDED. This lets you specify the type of SOS server  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(so ERDDAP™ doesn't have to figure it out).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Valid values are: IOOS\\_NDBC, IOOS\\_NOS, OOSTethys, and WHOI. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;responseFormat>...&lt;/responseFormat> &lt;!-- 0 or 1. Use this only if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you need to override the default responseFormat for the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;specified sosServerType.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;stationIdSourceName>...&lt;/stationIdSourceName> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default="station\\_id". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceName>...&lt;/longitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceName>...&lt;/latitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceName>...&lt;/altitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;altitudeMetersPerSourceUnit>](#altitudemeterspersourceunit)...&lt;/altitudeMetersPerSourceUnit>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceName>...&lt;/timeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceFormat>...&lt;/timeSourceFormat>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- timeSourceFormat MUST be either  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For numeric data: a [UDUnits](https://www.unidata.ucar.edu/software/udunits/)\\-compatible string (with the format  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"*units* since *baseTime*") describing how to interpret  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source time values (for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"seconds since 1970-01-01T00:00:00Z"), where the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;base time is an ISO 8601:2004(E) formatted date time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string (yyyy-MM-dd'T'HH:mm:ssZ).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For String date time data: specify  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[units suitable for string times](#string-time-units)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;describing how to interpret string times  (for example, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ISO8601TZ\\_FORMAT "yyyy-MM-dd'T'HH:mm:ssZ"). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;observationOfferingIdRegex>...&lt;/observationOfferingIdRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Only observationOfferings with IDs (usually the station names)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which match this [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) will be included  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the dataset (".+" will catch all station names). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;requestObservedPropertiesSeparately>true|false(default)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/requestObservedPropertiesSeparately>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the [dataType](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the observedProperty attribute.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For IOOS SOS servers, \\*every\\* variable returned in the text/csv  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response MUST be included in this ERDDAP™ dataset definition. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Tabel EDD de la trei fișiere{#eddtablefromthreddsfiles} 
 [ **Tabel EDD de la trei fișiere** ](#eddtablefromthreddsfiles)   (depreciat) agregate fișiere de date cu mai multe variabile, fiecare cu una sau mai multe dimensiuni comune (de exemplu, timpul, altitudinea (sau adâncime) , latitudine, longitudine) , și servit de un [PREGĂTIRI OPeNDAP server](https://www.unidata.ucar.edu/software/tds/) .

* Acest tip de set este **DEPRECAT** . Soluţia mai nouă şi mai generală este utilizarea [cache Opţiunea de la Url pentru tabelul EDD Din dosare](#cachefromurl)   (sau o variantă) , care face o copie locală a fișierelor la distanță și servește datele din fișierele locale. ă&lt;cacheFromurl&gt; opțiune poate fi utilizată cu orice tip de fișier de date tabular de la orice sursă web care publică o listă de fișiere asemănătoare unui director. **   
Dacă nu poţi face asta să meargă, trimite-i un e-mail lui Chris. John la Noaa.gov.
Dacă nu există plângeri înainte de 2020, acest tip de set de date poate fi eliminat. ** 
* Vă recomandăm cu tărie utilizarea [Generează dateName Programul Xml](#generatedatasetsxml) să facă un proiect dur al datasets.xml bucată pentru acest set de date. Puteți apoi edita asta pentru a-l acorda fin.
* În cele mai multe cazuri, fiecare fișier are valori multiple pentru stânga (Prima dată) dimensiunea, de exemplu, timpul.
* Dosarele de multe ori (dar nu trebuie să) au o valoare unică pentru celelalte dimensiuni (De exemplu, altitudinea (sau adâncime) , latitudine, longitudine) .
* Fișierele pot avea variabile de caracter cu o dimensiune suplimentară (de exemplu, nCharacters) .
* Serverele THREDS pot fi identificate prin "/thredds/" în URL-uri. De exemplu,
```
    https://www.ncei.noaa.gov/thredds/catalog/uv/6h\\_strs\\_agg/catalog.html
```
* Serverele THREDS au cataloage în diferite locuri. Această clasă REquires that the URL include "/thredds/catalog/." Puteți găsi, de obicei, această variabilă prin pornirea într-un browser în catalogul rădăcină, și apoi faceți clic pe subcatalogul dorit.
* Această clasă citește catalogul.xml fișiere deservite de THREDS cu listele de&lt;catalogRefs&gt; (referințe la cataloage suplimentare.xml sub-fișiere) şi&lt;Set de date&gt;s (fișiere de date) .
* ă&lt;Setarea fișierelor este ignorată. Deoarece această clasă descarcă și face o copie locală a fiecărui fișier de date la distanță, ERDDAP™ forțează fișierul Dir to be *Big ParentDirectory* /copie / * datasetID * /.
* Pentru&lt; sourceUrl &gt;, utilizează URL- ul catalogului.xml pentru setul de date din serverul THREDS, de exemplu: pentru acest URL care poate fi utilizat într-un browser web;
    https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.html  \\[ 2020-10-21 Acest server nu mai este disponibil în mod fiabil. \\] ,
Administrare&lt; sourceUrl &gt;https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.xml&lt;/ sourceUrl &gt;
     (dar pune-l pe o linie) .
* Din moment ce această clasă descarcă întotdeauna și face o copie locală a fiecărui fișier de date la distanță, nu ar trebui să împacheteze acest set de date în [EDDCommentCopy](#eddtablecopy) .
* Acest tip de set de date suportă o etichetă OPTIONALă, rareori utilizată, specială,&lt;Mod special &gt; *mod* &lt;/Mode special&gt; care poate fi folosit pentru a specifica că normele speciale, hard-codate ar trebui utilizate pentru a determina ce fișiere ar trebui descărcate de pe server. În prezent, singurul valid *mod* este SAMOS care este utilizat cu seturi de date dinhttps://tds.coaps.fsu.edu/thredds/catalog/samospentru a descărca doar fișierele cu ultimul număr de versiune.
* Vezi această clasă super clasă, [Tabel EDD din dosare](#eddtablefromfiles) , pentru informații privind modul în care funcționează această clasă și cum să-l folosească.
* A se vedea exemplele 1D, 2D, 3D și 4D pentru [Tabel EDDFromNcFiles](#eddtablefromncfiles) .
     
### Tabel EDD din WFS Fișiere{#eddtablefromwfsfiles} 
 [ **Tabel EDD din WFS Fișiere** ](#eddtablefromwfsfiles)   (DEPRECAT) face o copie locală a tuturor datelor dintr-o ArcGIS MapServer WFS server astfel încât datele să poată fi re-servate rapid la ERDDAP™ utilizatori.

* Trebuie să specificaţi un format special sourceUrl atribut global de spus ERDDAP™ cum să solicitați informații despre caracteristici de pe server. Vă rugăm să utilizați acest exemplu ca un șablon:
```
    <att name="sourceUrl">http://*someUrl/dir1/dir2*/MapServer/WFSServer?request=GetFeature&amp;service=WFS&amp;typename=aasg:BoreholeTemperature&amp;format=&quot;text/xml;%20subType=gml/3.1.1/profiles/gmlsf/1.0.0/0"</att>  
```
     (dar pune totul pe o linie) 
* Trebuie să adăugați un atribut global special pentru a spune ERDDAP™ modul de identificare a numelor bucăților de date care ar trebui descărcate. Acest lucru va funcționa, probabil, pentru toate tabelul EDDDe la WFS Seturi de fișiere:
```
    <att name="rowElementXPath">/wfs:FeatureCollection/gml:featureMember</att>
```
* Din moment ce această clasă descarcă întotdeauna și face o copie locală a fiecărui fișier de date la distanță, nu ar trebui să împacheteze acest set de date în [EDDCommentCopy](#eddtablecopy) .
* Vezi această clasă super clasă, [Tabel EDD din dosare](#eddtablefromfiles) , pentru informații suplimentare privind modul în care funcționează această clasă și modul de utilizare a acesteia.
     
### EDD TabelAgregareRows{#eddtableaggregaterows} 
 [ **EDD TabelAgregareRows** ](#eddtableaggregaterows) poate face un set de date EDD Table dintr-un grup de seturi de date EDD pentru copii.

* Aici sunt unele utilizări pentru EDDTabelulAggregateRows:
    * Ai putea face un set de date EDD TableAggregateRows din două tipuri diferite de fișiere sau surse de date, de exemplu, un set de date cu până la sfârșitul lunii trecute stocate în .nc Fișiere CF și un set de date pentru luna curentă stocate într-o bază de date relațională.
    * Ai putea face un set de date EDD TableAggregateRows pentru a face față unei modificări în fișierele sursă (de exemplu, formatul de timp modificat sau o denumire variabilă modificată sau date Tip/ scale\\_factor / add\\_offset modificat) . În acest caz, un copil ar obține date din fișiere făcute înainte de schimbare și celălalt copil ar obține date din fișierele făcute după schimbare. Această utilizare a EDDtableAggregateRows este o alternativă la utilizarea [NcML](#ncml-files) sau [ NCO ](#netcdf-operators-nco) . Dacă nu există o caracteristică distinctivă în numele fișierelor (astfel încât să puteți utiliza&lt;fileNameRegex&gt; pentru a determina care fișier aparține care set de date pentru copii), probabil trebuie să stocați fișierele pentru cele două seturi de date pentru copii în diferite dosare.
    * Puteți face un set de date EDD TableAggregateRows care are un subset comun de variabile de unul sau mai multe seturi de date similare, dar diferite, de exemplu, un set de date care face un set de profile din combinarea unui set de date de profil, a unui set de date TimeSeriesProfile și a unui set de date TraiectoryProfile (care au cateva variabile diferite si cateva variabile in comun -- caz in care va trebui sa faci variante speciale pentru seturile de date pentru copii, cu doar variabilele comune) .
    * Puteți avea mai multe seturi de date independente, fiecare cu același tip de date, dar de la o stație diferită. Puteţi lăsa aceste seturi de date intacte, dar şi să creaţi un set de date EDD TableAggregateRows care are date de la toate staţiile -- fiecare set de date pentru copii ar putea fi simplu [Tabel EDD FromErddap](#eddfromerddap) , care indică unul dintre seturile de date existente ale stațiilor. Dacă faceți acest lucru, dați fiecărui set de date EDDFromErddap un set de date diferit datasetID decât setul de date original independent, de exemplu prin adăugarea "Child" la originalul datasetID .
* Fiecare copil&lt;Setul de date &gt; trebuie să fie un set de date complet, ca și cum ar fi un set de date independent. Fiecare trebuie să aibă acelaşi lucru. [ dataVariable s](#datavariable) , în aceeași ordine, cu aceeași [ destinationName s](#destinationname) , [date Tipuri](#datatype) , [ missing\\_value s](#missing_value) , [\\_FillValues](#missing_value) , și [unități](#units) . Metadatele pentru fiecare variabilă pentru setul de date EDDTabelulAggregateRows provin din variabile din primul set de date pentru copii, dar EDDTabelulAggregateRows va actualiza [ actual\\_range ](#actual_range) metadatele să fie gama reală pentru toți copiii.
* Recomandare: Obține fiecare set de date pentru copii care funcționează ca seturi de date independente. Apoi încercați să faceți setul de date EDDTabelulAggregateRows prin tăierea și lipirea datasets.xml bucată pentru fiecare în noul EDDtableAggregate Set de caractere.
* Ordinea implicită de sortare a datelor -- Ordinea seturilor de date pentru copii determină ordinea generală implicită a rezultatelor. Desigur, utilizatorii pot solicita o comandă de sortare diferită pentru un anumit set de rezultate prin adăugarea & orderBy  (" *Lista variabilelor separate de virgulă* ") până la sfârşitul interogării lor.
* "Sursa" [global Atribute](#global-attributes) pentru tabelul EDDAggregateRows este combinatul Attributes global din primul set de date pentru copii. Agregarea tabelului EDD Rândurile pot avea un global&lt; addAttributes &gt; să furnizeze atribute globale suplimentare sau să anuleze atributele globale sursă.
#### Agregare tabel EDD Name{#eddtableaggregaterows-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableAggregateRows" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDCommentCopy{#eddtablecopy} 
 [ **EDDCommentCopy** ](#eddtablecopy) poate face o copie locală a mai multor tipuri de seturi de date EDDTable și apoi să rezerve rapid datele din copia locală.

* EDDCommentCopy (și pentru datele rețelei; [ EDDGrid Copiază](#eddgridcopy) ) este un foarte usor de utilizat si un foarte eficient **soluţionarea unora dintre cele mai mari probleme cu furnizarea datelor din surse de date la distanţă:** 
    * Accesul datelor dintr-o sursă de date la distanță poate fi lent.
        * Ele pot fi lent, deoarece acestea sunt în mod inerent lent (de exemplu, un tip ineficient de server) ,
        * pentru că sunt copleşiţi de prea multe cereri,
        * sau pentru că serverul sau serverul de la distanță este limitat de lățime de bandă.
    * Setul de date la distanță este uneori indisponibil (din nou, pentru o varietate de motive) .
    * Să te bazezi pe o singură sursă de date nu e bine (de exemplu, atunci când mulți utilizatori și mulți ERDDAP s utilizaţi) .
         
* Cum functioneaza -- EDDtableCopy rezolva aceste probleme prin realizarea si mentinerea automata a unei copii locale a datelor si servirea datelor din copia locala. ERDDAP™ poate servi datele de pe copia locală foarte, foarte repede. Şi făcând şi folosind o copie locală uşurează povara serverului de la distanţă. Iar copia locală este o copie de rezervă a originalului, care este util în cazul în care se întâmplă ceva cu originalul.
    
Nu este nimic nou despre a face o copie locală a unui set de date. Ce este nou aici este că această clasă face\\*Uşor.\\*crearea și\\*menţine\\*o copie locală a datelor de la o\\*soi\\*tipurile de surse de date la distanță și\\*adăuga metadate\\*copierea datelor.
    
#### EDDtableCopy vs.&lt;CacheFromurl&gt;{#eddtablecopy-vs-cachefromurl} 
&lt;CacheFromurl&gt; este o alternativă la EDDtableCopy. Funcţionează diferit.

* Tabel EDD Copiază lucrări prin solicitarea unor bucăți de date dintr-un serviciu de la distanță și stocarea acestor bucăți în fișierele locale. Astfel, EDDtableCopy este util în unele cazuri în care datele sunt accesibile prin intermediul unui serviciu la distanță.
* [&lt;CacheFromUrl&gt;] (#cachefromurl) descarcă fișierele existente enumerate pe un site web la distanță.&lt;cacheFromurl&gt; este mai ușor de utilizat și mai fiabil, deoarece poate spune cu ușurință când există un nou fișier de date la distanță sau când un fișier de date la distanță s-a schimbat și, prin urmare, trebuie descărcat.

Dacă există situații în care EDDtableCopy sau&lt;cacheFromUrl&gt; ar putea fi utilizat,&lt;CacheFromUrl&gt; deoarece este mai ușor și mai fiabil.
     
#### &lt;extractDestinație Nume &gt;{#extractdestinationnames} 
Tabel EDD Copia face copia locală a datelor prin solicitarea unor bucăți de date din setul de date la distanță. Tabel EDD Copie determină care bucăți la cerere prin solicitarea &distinct () valori pentru&lt;extractDestinationNames&gt; (specificată în datasets.xml , vezi mai jos) , care sunt denumirile de destinație separate de spațiu ale variabilelor din setul de date la distanță. De exemplu,
```
    <extractDestinationNames>drifter profile</extractDestinationNames>  
```
s-ar putea produce combinații de valori distincte de drifter=tig17,profil=1017, driwer=tig17,profil=1095, ... driwer=une12,profil=1223, driwer=une12,profil=1251, ....

În situațiile în care o coloană (de exemplu, profilul) poate fi tot ceea ce este necesar pentru a identifica în mod unic un grup de rânduri de date, în cazul în care există un număr foarte mare de profiluri, de exemplu, ar putea fi util să se specifice și un extras suplimentar Destinația Nume (de exemplu, vagabond) care servește la subdivizarea profilurilor. Acest lucru duce la mai puține fișiere de date într-un anumit director, ceea ce poate duce la acces mai rapid.
    
#### Fișiere locale{#local-files} 
Fiecare bucată de date este stocată separat NetCDF fișier într-un subdosar al *Big ParentDirectory* /copie / * datasetID * / (după cum se specifică în [setup.xml](/docs/server-admin/deploy-install#setupxml) ) . Există un singur nivel subdosar pentru toți, dar ultimul extractDestinationName. De exemplu, datele pentru tig17+1017, ar fi stocate în
     *Big ParentDirectory* /copie/probaDataset/tig17/1017 .nc .
De exemplu, datele pentru une12+1251, ar fi stocate în
     *Big ParentDirectory* /copie/probăDataset/une12/1251 .nc .
Director și nume de fișiere create din valorile de date sunt modificate pentru a le face file-name-safe (de exemplu, spațiile se înlocuiesc cu "x20") - asta nu afectează datele reale.
     
#### Date noi{#new-data} 
De fiecare dată când tabelul EDD Copia este reîncărcată, verifică setul de date de la distanță pentru a vedea ce bucăți distincte sunt disponibile. În cazul în care fișierul pentru o bucată de date nu există deja, o cerere pentru a obține bucata se adaugă la o coadă. ERDDAP SarcinaThread procesează toate cererile coadă pentru bucăți de date, unu câte unu. Puteți vedea statistici pentru activitatea Thread pe [Pagina statutului](/docs/server-admin/additional-information#status-page) şi în [Raport zilnic](/docs/server-admin/additional-information#daily-report) . (Da. ERDDAP™ ar putea atribui mai multe sarcini acestui proces, dar care ar folosi până o mulțime de lățime de bandă de date sursă de la distanță, memorie, și timp CPU, și o mulțime de locale ERDDAP Lăţimea de bandă, memoria şi timpul procesorului, nici una dintre ele nu este o idee bună.) 
    
NOTĂ: Prima dată când un EDDtableCopy este încărcat, (dacă totul merge bine) o mulțime de cereri de bucăți de date vor fi adăugate la coada sarciniiThread, dar nu vor fi create fișiere de date locale. Astfel constructorul va eșua, dar sarcinaThread va continua să lucreze și să creeze fișiere locale. Dacă totul merge bine, sarcinaThread va face unele fișiere de date locale și următoarea încercare de a reîncărca setul de date (în 15 minute) va reuși, dar inițial cu o cantitate foarte limitată de date.
    
NOTĂ: După ce setul de date local are unele date și apare în ERDDAP , în cazul în care setul de date la distanță nu este accesibil temporar sau permanent, setul local va funcționa în continuare.
    
ATENŢIONARE: Dacă setul de date de la distanţă este mare şi/sau serverul de la distanţă este lent (Asta e problema, nu-i aşa?) Va dura mult să facem o copie locală completă. În unele cazuri, timpul necesar va fi inacceptabil. De exemplu, transmiterea 1 TB a datelor pe o linie T1 (0,15 GB/s) durează cel puțin 60 de zile, în condiții optime. În plus, utilizează o mulțime de lățime de bandă, memorie, și timp CPU pe computerele de la distanță și locale. Soluţia este să trimiteţi un hard disk administratorului setului de date la distanţă, astfel încât s/el să poată face o copie a setului de date şi să vă trimită hard disk-ul înapoi. Utilizați datele ca punct de plecare și EDDtableCopy va adăuga date la acestea. (Acesta este modul în care serviciul de cloud computing EC2 al Amazonului se ocupa de această problemă, chiar dacă sistemul lor are o mulțime de lățime de bandă.) 
    
ATENŢIONARE: Dacă o anumită combinaţie de valori dispare dintr-un set de date de la distanţă, EDDtableCopy NU şterge fişierul copiat local. Dacă vrei, poţi să-l ştergi singur.
    
#### TableCopy&lt;checkSourceData&gt;{#tablecopy-checksourcedata} 
ă datasets.xml pentru acest set de date poate avea o etichetă opțională
```
    <checkSourceData>true</checkSourceData>  
```
Valoarea implicită este adevărată. Dacă/atunci când setați fals, setul de date nu va verifica niciodată setul de date sursă pentru a vedea dacă există date suplimentare disponibile.
     
#### Utilizare recomandată{#recommended-use} 
1. Creează&lt;Set de date &gt; intrare (tipul nativ, nu EDDtableCopy) pentru sursa de date la distanță. **Funcţionează corect, inclusiv toate metadatele dorite.** 
2. Dacă este prea lent, adăugați codul XML pentru a-l împacheta într-un set de date EDDTableCopy.
    * Foloseşte un alt datasetID   (Poate prin schimbarea datasetID din vechiul datasetID uşor) .
    * Copiază&lt;accesibil To&gt;,&lt;reîncărcareEveryNMinutes&gt; și&lt;OnChange&gt; de la XML-ul de la distanță al tabelului EDD la XML-ul EDD TableCopy. (Valorile lor pentru materia EDDtableCopy; valorile lor pentru setul de date interior devin irelevante.) 
    * Creează&lt;ExtractDestinationNames&gt; tag (vezi mai sus) .
    *   &lt;OrderExtractBy&gt; este o listă de nume variabile de destinație separate de spațiu OPTIONAL. Când fiecare bucată de date este descărcată de pe serverul de la distanță, bucata va fi sortate de aceste variabile (de prima variabilă, apoi de a doua variabilă dacă prima variabilă este legată, ...) . În unele cazuri, ERDDAP™ va putea extrage date mai repede din fișierele de date locale dacă prima variabilă din listă este o variabilă numerică ( "time" Contează ca variabilă numerică) . Dar alege aceste variabile într-un mod care este potrivit pentru setul de date.
3.   ERDDAP™ va face și va menține o copie locală a datelor.
         
* ATENŢIE: EDDtableCopy presupune că valorile datelor pentru fiecare bucată nu se schimbă niciodată. Dacă / atunci când o fac, trebuie să ștergeți manual fișierele bucată în *Big ParentDirectory* /copie / * datasetID * / care sa schimbat și [pavilion](/docs/server-admin/additional-information#flag) setul de date care trebuie reîncărcat astfel încât bucățile eliminate să fie înlocuite. Dacă aveți un abonament prin e-mail la setul de date, veți primi două e-mailuri: unul când setul de date reîncărcați prima dată și începe să copieze datele, iar altul când setul de date se încarcă din nou (automat) și detectează noile fișiere locale de date.
     
* Schimbă metadatele -- Dacă aveţi nevoie pentru a schimba orice addAttributes sau să modifice ordinea variabilelor asociate setului de date sursă:
    1. Schimbă addAttributes pentru setul de date sursă din datasets.xml , după cum este necesar.
    2. Șterge unul dintre fișierele copiate.
    3. Set a [pavilion](/docs/server-admin/additional-information#flag) pentru a reîncărca setul de date imediat. Dacă utilizați un steag și aveți un abonament e-mail la setul de date, veți primi două e-mailuri: una când setul de date reîncărcați prima dată și începe să copieze datele, iar alta când setul de date se încarcă din nou (automat) și detectează noile fișiere locale de date.
    4. Fișierul șters va fi regenerat cu noile metadate. Dacă setul de date sursă este vreodată indisponibil, setul de date EDDTableCopy va obține metadate din fișierul regenerat, deoarece este cel mai tânăr fișier.
         
*    [ EDDGrid Copiază](#eddgridcopy) este foarte asemănător cu EDD TableCopy, dar funcționează cu seturi de date în rețea.
#### Name{#eddtablecopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractDestinationNames>...&lt;/extractDestinationNames>  &lt;!-- 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderExtractBy>...&lt;/orderExtractBy> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#tablecopy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

- - -

## Detalii{#details-1} 

Aici sunt descrieri detaliate ale etichetelor și atributelor comune.

### &lt;Degree Units &gt;{#angulardegreeunits} 
* [ ** &lt;DegreeUnits &gt; ** ] (#unităţi de nivel angular) este o etichetă OPTONAL utilizată rar în&lt;erddapDatasets&gt; tag in datasets.xml care conține o listă separată de unități șiruri de caractere care ERDDAP™ trebuie tratate ca unităţi de grade unghiulare. Dacă o variabilă are una dintre aceste unități, tabledap 's orderByMean Filtrul va calcula media într-un mod special, apoi va raporta media ca valoare de la -180 la 180. Vezi? ERDDAP 's EDStatic.java source code file for the curent implicit list. Orice modificare a valorii acestei etichete va avea efect data viitoare ERDDAP™ citeste datasets.xml , inclusiv ca răspuns la un set de date [pavilion](/docs/server-admin/additional-information#flag) .
### &lt;Degree TrueUnits&gt;{#angulardegreetrueunits} 
* [ ** &lt;unghiular GradUnities&gt; ** ] (#Angular grade true units) este o etichetă OPTONAL utilizată rar în&lt;erddapDatasets&gt; tag in datasets.xml care conține o listă separată de unități șiruri de caractere care ERDDAP™ trebuie tratate ca unităţi unghiulare adevărate. Dacă o variabilă are una dintre aceste unități, tabledap 's orderByMean Filtrul va calcula media într-un mod special, apoi va raporta media ca valoare de la 0 la 360. Vezi? ERDDAP 's EDStatic.java source file for the curent implicit list. Orice modificare a valorii acestei etichete va avea efect data viitoare ERDDAP™ citeste datasets.xml , inclusiv ca răspuns la un set de date [pavilion](/docs/server-admin/additional-information#flag) .
     
### &lt;denumiri standard comune&gt;{#commonstandardnames} 
* [ ** &lt;denumiri standard comune &gt; ** ] (Nume standard comune) este o etichetă OPTONAL utilizată rar în&lt;erddapDatasets&gt; tag in datasets.xml să specifice o listă comună separată de virgulă [Denumire standard CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) . De exemplu,
```
    <commonStandardNames>air\\_pressure, ..., wind\\_to\\_direction</commonStandardNames>  
```
Această listă este utilizată în DataProviderForm3.html ca o comoditate pentru utilizatori.
Dacă doriți să furnizați aceste informații în datasets.xml , începe prin copierea listei implicite curente în&lt;DEFAULT\\_Denumiri standard comune &gt; în ERDDAP 's
 \\[ Tomcat \\] /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file.
     
### &lt;CacheMinute&gt;{#cacheminutes} 
* [ ** &lt;CacheMinute&gt; ** ] (#cacheminutes) este o etichetă OPTONAL utilizată rar în&lt;erddapDatasets&gt; tag in datasets.xml să specifice vârsta (în minute) la care fișierele din cache trebuie șterse (implicit=60) . De exemplu,
```
    <cacheMinutes>60</cacheMinutes>  
```
În general, numai fișiere de imagine (deoarece aceleași imagini sunt adesea solicitate în mod repetat) şi .nc fișiere (deoarece acestea trebuie să fie complet create înainte de trimiterea la utilizator) sunt cached. Deși s-ar putea părea ca o cerere dată ar trebui să se întoarcă întotdeauna același răspuns, că nu este adevărat. De exemplu, tabledap cerere care include timp&gt; *unele Timp* se modifică atunci când sosesc date noi pentru setul de date. Și o cerere griddap care include \\[ ultima \\] pentru dimensiunea temporală se va schimba atunci când sosesc date noi pentru setul de date. Orice modificare a valorii acestei etichete va avea efect data viitoare ERDDAP™ citeste datasets.xml , inclusiv ca răspuns la un set de date [pavilion](/docs/server-admin/additional-information#flag) . Înainte ERDDAP™ v2.00, acest lucru a fost specificat în setup.xml, care este încă permis, dar descurajat.

### &lt;CacheClearMinutes&gt;{#cacheclearminutes} 
* [ ** &lt;CacheClearMinute &gt; ** ] (#cacheclear minutes) este o etichetă OPTONAL utilizată rar în&lt;erddapDatasets&gt; tag in datasets.xml pentru a specifica frecvența pentru a verifica fișierele cache și a elimina cele vechi (în minute)   (implicit=15) . De exemplu,
```
    <cacheClearMinutes>15</cacheClearMinutes>  
```
Atunci când serverul termină de manipulare o cerere va verifica cât timp în urmă ultimul Cache clar a fost. Dacă a fost prea mult timp în urmă, acesta va coada o sarcină pe TaskThread pentru a șterge cache. Orice modificare a valorii acestei etichete va avea efect data viitoare ERDDAP™ citeste datasets.xml , inclusiv ca răspuns la un set de date [pavilion](/docs/server-admin/additional-information#flag) . Acest lucru poate fi specificat în specificat în setup.xml, dar care este descurajat.
     
### &lt;convertireInterpolateRequestCSVexample&gt;{#convertinterpolaterequestcsvexample} 
* [ ** &lt;convertireInterpolateRequestCSVexample&gt; ** ] (#convertininterpolate requestcsvexemplu) este o etichetă OPTIONALă în cadrul&lt;erddapDatasets&gt; tag in datasets.xml   \\[ începând cu ERDDAP™ v2.10 \\] care conține un exemplu care va fi afișat pe pagina web a convertorului Interpolat. Valoarea implicită este: jplMU RSS T41/analized\\_ sst /Biliniar/4.
### &lt;convertire InterpolateDatasetIDVariableList&gt;{#convertinterpolatedatasetidvariablelist} 
* [ ** &lt;converteșteIninterpolatDatasetIDVariableList&gt; ** ] (#convertininterpolatetedatasetidvariablelist) este o etichetă OPTIONALă în cadrul&lt;erddapDatasets&gt; tag in datasets.xml   \\[ începând cu ERDDAP™ v2.10 \\] care conține o listă CSV de datasetID /variabil Exemple de nume care vor fi folosite ca sugestii de pagina web a convertorului Interpolat. Valoarea implicită este: jplMU RSS T41/analized\\_ sst .
### &lt;convertitlapublicSourceUrl&gt;{#converttopublicsourceurl} 
* [ ** &lt;converteste-te la PublicSourceUrl&gt; ** ] (#convertto publicsourceurl) este o etichetă OPTIONALă în cadrul&lt;erddapDatasets&gt; tag in datasets.xml care conține un "de la" și un "la" atribut care specifică modul de a converti un meci local sourceUrl   (de obicei un număr IP) într-un public sourceUrl   (un nume de domeniu) "de la" trebuie să aibă forma " \\[ Ceva \\] - Da. \\[ Ceva \\] /." Pot exista 0 sau mai multe dintre aceste etichete. Pentru mai multe informații, a se vedea [&lt; sourceUrl &gt;] (#sourceurl) . De exemplu,
```
    <convertToPublicSourceUrl from="https://192.168.31.18/" to="https://oceanwatch.pfeg.noaa.gov/" />  
```
va provoca o potrivire locală sourceUrl   (cum ar fihttps://192.168.31.18/thredds/dodsC/satellite/BA/ssta/5day)   
într-un public sourceUrl   (https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day) .
Orice modificare a valorii acestei etichete va avea efect data viitoare ERDDAP™ citeste datasets.xml , inclusiv ca răspuns la un set de date [pavilion](/docs/server-admin/additional-information#flag) .

Dar, din motive de securitate și motive legate de sistemul de abonament, **Nu folosi TAG-ul ăsta&#33;**   
În schimb, utilizați întotdeauna numele domeniului public în&lt; sourceUrl &gt; eticheta şi utilizarea [/etc / masa gazdelor](https://linux.die.net/man/5/hosts) pe serverul dvs. pentru a converti numele de domenii locale la numere IP fără a utiliza un server DNS. Puteți testa dacă un nume de domeniu este convertit în mod corespunzător într-un număr IP utilizând:
ping *Unele.Domain.name*   
     
### date:imagine/png;base64;{#dataimagepngbase64} 
* Atunci când un utilizator solicită o .htmlTable răspuns de la ERDDAP™ , în cazul în care datele dintr-o celulă de string conțin date:imagine/png;base64, urmată de o imagine de bază64 codificată .png; ERDDAP™ va afișa o pictogramă (astfel încât utilizatorul poate vedea imaginea în cazul în care plutesc peste ea) și butoane pentru a salva textul sau imaginea în clipboard. Această caracteristică a fost adăugată în ERDDAP™ v2.19 de Marco Alba.
###  drawLandMask  {#drawlandmask} 
*    [ ** drawLandMask ** ](#drawlandmask) specifică setarea implicită care controlează momentul și modul în care ar trebui să fie desenată masca de teren atunci când ERDDAP™ desenează o hartă. Acesta poate fi specificat în trei locuri diferite în datasets.xml   (enumerate de la cea mai mică la cea mai mare prioritate) :
    
    1. Dacă drawLandMask este specificat în&lt;erddapDatasets&gt; (care nu sunt conectate la niciun set de date specific) , apoi specifică valoarea implicită a drawLandMask pentru toate variabilele din toate setările de date. De exemplu,
    ```
        <drawLandMask>under</drawLandMask>  
    ```
Orice modificare a valorii acestei etichete va avea efect data viitoare ERDDAP citeste datasets.xml .
Dacă această etichetă nu este prezentă, valoarea implicită de bază este sub.
         
    2. Dacă drawLandMask este specificat ca atribut global al unui set de date dat, apoi specifică valoarea implicită a drawLandMask pentru toate variabilele din setul de date respectiv, care depășesc orice cadru prioritar inferior. De exemplu,
    ```
        <att name="drawLandMask">under</att>  
    ```
Orice modificare a valorii acestei etichete va avea efect data viitoare ERDDAP™ Reîncarcă setul de date.
         
    3. Dacă drawLandMask este specificat ca atribut al unei variabile într-un set de date dat, apoi specifică valoarea implicită a drawLandMask pentru această variabilă din setul de date respectiv, care să depășească orice cadru prioritar inferior. De exemplu,
    ```
        <att name="drawLandMask">under</att>  
    ```
Orice modificare a valorii acestei etichete va avea efect data viitoare ERDDAP™ Reîncarcă setul de date.
    
Un utilizator poate suprascrie implicit (unde este specificat) prin selectarea unei valori pentru "Masca de teren" dintr-o listă dropdown de pe pagina web Make A Graph a setului, sau prin includerea &.land= *valoare* în URL care solicită o hartă de la ERDDAP .
    
În toate situațiile, există 4 valori posibile pentru atribut:
    
    * "sub" atrage masca de teren înainte de a trage date de pe hartă.
Pentru seturile de date gri, terenul apare ca o culoare gri constantă.
Pentru seturile de date tabulare, "sub" arată date topografice pe uscat și oceane.
    * "Peste" - Pentru seturile de date cu grilă, "peste" atrage masca de teren după ce extrage date pe hărți, astfel încât va masca orice date pe uscat. Pentru seturile de date tabulare, "peste" arată bathimetria oceanului și un gri deschis constant în cazul în care există teren, ambele trase sub date.
    * "Outline" atrage doar conturul măștii de teren, granițe politice, lacuri și râuri.
    * "Off" nu atrage nimic.
### &lt;e-mailDiagnosticiToErdData&gt;{#emaildiagnosticstoerddata} 
* [ ** &lt;e-mailDiagnosticsToErdData&gt; ** ] (#emaildiagnosticstoerddata) este o etichetă OPTONAL utilizată rar în&lt;erddapDatasets&gt; tag in datasets.xml . Valoarea etichetei poate fi adevărată (implicit) sau fals. Dacă e adevărat, ERDDAP™ va e-mail stiva urme la Chris. John la Noaa. gov (nu ERDDAP™ echipa de dezvoltare) . Acest lucru ar trebui să fie sigur și sigur, deoarece nu există informații confidențiale (De exemplu, cerereaUrl) este inclus în e-mail. Acest lucru ar trebui să facă posibil pentru a prinde orice gândaci obscure, total neașteptate care duc la NullPointerExcepții. În caz contrar, utilizatorul vede excepțiile, dar ERDDAP™ echipa de dezvoltare nu (Deci nu ştim dacă există o problemă care trebuie rezolvată.) .
     
### &lt;graficColor &gt;{#graphbackgroundcolor} 
* [ ** &lt;graficColor fundal&gt; ** ] (#graphbackgroundcolor) este o etichetă OPTONAL utilizată rar în&lt;erddapDatasets&gt; tag in datasets.xml pentru a specifica culoarea de fundal implicită pe grafice. Acest lucru afectează aproape toate graficele. Există câteva situații care nu sunt afectate. Culoarea este specificată ca o valoare hexazecimală de 8 cifre în forma 0xAAARGGBB, unde AA, RR, GG și BB sunt componentele opacitate, roșu, verde și respectiv albastru. "0x" este sensibil la caz, dar cifrele hexazecimale nu sunt sensibile la caz. De exemplu, un complet opac (ff) culoare verde-albastru cu roșu=22, verde=88, albastru=ee ar fi 0xff2288ee. Albul opac este 0xffffffff. Implicit este albastru deschis opac (0xffccff) , care are avantajul de a fi diferit de alb, care este o culoare importantă în multe palete utilizate pentru a desena date. De exemplu,
    ```
    <graphBackgroundColor>0xffffffff</graphBackgroundColor>  
    ```
Orice modificare a valorii acestei etichete va avea efect data viitoare ERDDAP™ citeste datasets.xml , inclusiv ca răspuns la un set de date [pavilion](/docs/server-admin/additional-information#flag) .
### &lt;ipAddressMaxRequests&gt;{#ipaddressmaxrequests} 
* [ ** &lt;ipAddressMaxRequests&gt; ** ] (#ippaddressmax cereri) este o etichetă opțională rar utilizată (cu ERDDAP™ v2.12) în&lt;erddapDatasets&gt; tag in datasets.xml care face parte dintr-un sistem de limitare a capacității utilizatorilor legitimi excesiv de agresivi și a utilizatorilor rău intenționati de a face un număr mare de cereri simultane care ar degrada performanța sistemului pentru alți utilizatori. ipAddress MaxRequests precizează numărul maxim de cereri simultane care vor fi acceptate de la orice adresă IP specifică. Cererile suplimentare vor primi o eroare HTTP 429: Prea multe cereri. Fişierele mici, statice în erddap/download/ şi erddap/images/ NU sunt scutite de acest număr. Implicit este 15. Maximul permis este 1000, ceea ce este foarte mare -- nu o face&#33; ERDDAP™ nu accepta un numar mai mic de 6 deoarece multi utilizatori legitimi (în special browserele web și WMS clienţi) se completează până la 6 cereri la un moment dat. ă ERDDAP™ Raportul zilnic și informațiile similare scrise în fișierul log.txt cu fiecare Dataset maior Reload vor include acum o serie de cereri ale acestor adrese IP sub titlul "Adresa IP a solicitantului" (Prea multe cereri) ".
Orice modificare a valorii acestei etichete va avea efect data viitoare ERDDAP™ citeste datasets.xml , inclusiv ca răspuns la un set de date [pavilion](/docs/server-admin/additional-information#flag) .
    
Sectiunea "Maior LoadDatasets Time Series" a statutului.html include o coloana "preamulte" care listeaza numarul de cereri care au depasit setarea ipAddressMaxRequests si astfel a vazut o eroare "Prea multe solicitari." Acest lucru vă permite să vedeți cu ușurință atunci când există utilizatori activi excesiv de agresivi legitime și utilizatori rău intenționate astfel încât să puteți (opțional) căutați în fișierul log.txt și decideți dacă doriți să listați negru acei utilizatori.
    
Nu e nimic în neregulă cu setarea asta unui număr mai mare. Depinde de tine. Dar făcând acest lucru permite/încurajează oamenii să instituie sisteme care folosesc un număr mare de fire pentru a lucra la proiecte și apoi le oferă nici un feedback că ceea ce fac nu le aduce niciun beneficiu.
### &lt;ipAddress MaxRequestsActive&gt;{#ipaddressmaxrequestsactive} 
* [ ** &lt;ipAddressMaxRequestsActive&gt; ** ] (#ippaddressmaxcereriactive) este o etichetă opțională rar utilizată (cu ERDDAP™ v2.12) în&lt;erddapDatasets&gt; tag in datasets.xml care face parte dintr-un sistem de limitare a capacității utilizatorilor legitimi excesiv de agresivi și a utilizatorilor rău intenționati de a face un număr mare de cereri simultane care ar degrada performanța sistemului pentru alți utilizatori. ipAddressMaxRequestsActive specifică numărul maxim de cereri simultane care vor fi prelucrate activ de la orice adresă IP specifică. Cererile suplimentare vor sta la coadă până la procesarea cererilor anterioare. Fişierele mici, statice în erddap/download/ şi erddap/images/ SUNT scutite de acest număr şi de agitaţia legată. Implicit este 2. Maximul permis este 100, ceea ce este foarte mare -- nu o face&#33; Puteți seta acest lucru la 1 să fie strict, mai ales dacă aveți probleme cu utilizatorii prea agresivi sau rău intenționate. Utilizatorii vor obține în continuare rapid toate datele pe care le solicită (până la ipAddressMaxRequests) , dar ei nu vor fi în măsură să hog resurse de sistem. Noi nu recomandăm setarea acest lucru la un număr mai mare, deoarece permite utilizatorilor legitime excesiv de agresive și utilizatorilor rău intenționate să domine ERDDAP Capacitatea de procesare.
Orice modificare a valorii acestei etichete va avea efect data viitoare ERDDAP™ citeste datasets.xml , inclusiv ca răspuns la un set de date [pavilion](/docs/server-admin/additional-information#flag) .
     
### &lt;ipAddress Unlimited&gt;{#ipaddressunlimited} 
* [ ** &lt;ipAddress nelimitat&gt; ** ] (#ippaddress unlimited) este o etichetă opțională rar utilizată (cu ERDDAP™ v2.12) în&lt;erddapDatasets&gt; tag in datasets.xml care face parte dintr-un sistem de limitare a capacității utilizatorilor legitimi excesiv de agresivi și a utilizatorilor rău intenționati de a face un număr mare de cereri simultane care ar degrada performanța sistemului pentru alți utilizatori. ipAddressUnlimited este o listă separată de adrese IP pe care doriți să permiteți accesul nelimitat la dvs. ERDDAP . Uită-te în jurnalul tău. txt fișier pentru a vedea ce format serverul este utilizat pentru adresele IP. Pe unele servere, adresele IP vor fi în format #.#.#.# (unde # este un număr întreg de la 0 la 255) ; întrucât pe altele va fi în format #:#:#:#:#:#:#:#:#:#:#:#:# . Solicitanţii de pe această listă nu sunt supuşi nici ipAddressMaxRequests, nici ipAddressMaxRequestsSetări active. Acest lucru ar putea fi un secundar ERDDAP™ sau pentru anumiți utilizatori sau servere din sistemul dumneavoastră. ERDDAP™ întotdeauna adaugă " (IPAddress necunoscut) " care ERDDAP™ utilizează atunci când adresa IP a solicitantului nu poate fi determinată, de exemplu, pentru alte procese care rulează pe același server.
Orice modificare a valorii acestei etichete va avea efect data viitoare ERDDAP™ citeste datasets.xml , inclusiv ca răspuns la un set de date [pavilion](/docs/server-admin/additional-information#flag) .
    
Dacă, dintr-un anumit motiv, toate cererile unui utilizator primesc mesajul de eroare "Timeout waiting for your other requests to processe.", atunci puteți rezolva problema prin adăugarea adresei IP a utilizatorului în lista ipAddressUnlimited, aplicând această schimbare, apoi eliminați-o din lista respectivă.
    
### &lt;încarcăDateSeturiMinMinute&gt;{#loaddatasetsminminutes} 
* [ ** &lt;încarcăDateSeturiMinMinute &gt; ** ] (#loaddatasetsminminutes) este o etichetă OPTONAL utilizată rar în&lt;erddapDatasets&gt; tag in datasets.xml să specifice timpul minim (în minute) între sarcina majoră Setări de date (când ERDDAP™ reprocesări datasets.xml , inclusiv verificarea fiecărui set de date pentru a vedea dacă trebuie reîncărcat în conformitate cu reîncărcarea acestuia @ info: tooltip) . De exemplu,
```
    <loadDatasetsMinMinutes>15</loadDatasetsMinMinutes>  
```
În cazul în care o anumită cursă de încărcareDatasets durează mai puțin de această dată, încărcătorul se uită în mod repetat la directorul de pavilion și/sau doarme până când timpul rămas a trecut. Implicit este de 15 minute, care ar trebui să fie bine pentru aproape toată lumea. Singurul dezavantaj pentru a stabili acest lucru la un număr mai mic este că va crește frecvența care ERDDAP™ retrimite seturi de date care au erori care împiedică încărcarea acestora (De exemplu, un server de la distanță este în jos) . În cazul în care există o mulțime de astfel de seturi de date și acestea sunt retestate frecvent, sursa de date ar putea considera că este dăunător/comportament agresiv. Orice modificare a valorii acestei etichete va avea efect data viitoare ERDDAP™ citeste datasets.xml , inclusiv ca răspuns la un set de date [pavilion](/docs/server-admin/additional-information#flag) . Înainte ERDDAP™ v2.00, acest lucru a fost specificat în setup.xml, care este încă permis, dar descurajat.
     
### &lt;incarcareDataseteMaxMinute&gt;{#loaddatasetsmaxminutes} 
* [ ** &lt;încarcăDatasetsMaxMinute &gt; ** ] (#seturi de date de încărcaremaxminute) este o etichetă OPTIONALă în cadrul&lt;erddapDatasets&gt; tag in datasets.xml să specifice timpul maxim (în minute) o sarcină majoră Efortul datelor este permis să ia (înainte de încărcare Fire de date tratate ca fiind "rulate" și sunt întrerupte)   (implicit=60) . De exemplu,
```
    <loadDatasetsMaxMinutes>60</loadDatasetsMaxMinutes>  
```
În general, acest lucru ar trebui să fie stabilit la cel puțin de două ori mai mult decât crezi în mod rezonabil că reîncărcarea tuturor seturilor de date (cumulativ) trebuie să luaţi (deoarece computerele și rețelele sunt uneori mai lente decât se aștepta) Acest lucru ar trebui să fie întotdeauna mult mai mult decât încarcăDatasetsMinMinutes. Implicit este de 60 de minute. Unii oameni vor stabili acest lucru pentru mai mult timp. Orice modificare a valorii acestei etichete va avea efect data viitoare ERDDAP™ citeste datasets.xml , inclusiv ca răspuns la un set de date [pavilion](/docs/server-admin/additional-information#flag) . Înainte ERDDAP™ v2.00, acest lucru a fost specificat în setup.xml, care este încă permis, dar descurajat.
     
### &lt;nivel log&gt;{#loglevel} 
* [ ** &lt;Nivel log&gt; ** ] (#loglevel) este o etichetă OPTIONALă în cadrul&lt;erddapDatasets&gt; tag in datasets.xml pentru a specifica câte mesaje de diagnosticare sunt trimise la fișierul log.txt. Acesta poate fi setat la "avertizare" (cele mai puţine mesaje) , "info" (implicit) , sau "toti" (cele mai multe mesaje) . De exemplu,
```
    <logLevel>info</logLevel>  
```
Orice modificare a valorii acestei etichete va avea efect data viitoare ERDDAP™ citeste datasets.xml , inclusiv ca răspuns la un set de date [pavilion](/docs/server-admin/additional-information#flag) . Înainte ERDDAP™ v2.00, acest lucru a fost specificat în setup.xml, care este încă permis, dar descurajat.
     
### &lt;Cerere parțialăMaxBytes&gt; și&lt;Request parţialMaxCells&gt;{#partialrequestmaxbytes-and-partialrequestmaxcells} 
* [ ** &lt;Request parţialMaxBytes&gt; **] (#Cerere parţialămaxbytes-and-partial requestcellsmax) şi [** &lt;Request parţialMax1/2000&gt; ** ] (#Cerere parţialămaxbytes-and-partial requestcellsmax) sunt rareori utilizate OPTIONAL tag- uri în cadrul&lt;erddapDatasets&gt; tag in datasets.xml . Când este posibil (şi nu este întotdeauna posibil) , ERDDAP™ rupe mari cereri de date în bucăți pentru a conserva memoria.
    
Cu 32 biți Java , în sens simplist, numărul maxim de simultane *mare* cereri este de aproximativ 3/4 din memoria disponibilă (valoarea Xmx a trecut la Tomcat) împărțit la dimensiunea bucății (de exemplu 1200 MB / 100 MB = &gt; 12 cereri) . Alte lucruri necesită memorie, deci numărul real de cereri va fi mai mic. În practică, scufundarea nu este întotdeauna posibilă. Deci, o mare sau câteva cereri foarte mari simultane non-chunkable ar putea provoca probleme pe 32 bit Java .

Cu 64 biți Java Valoarea Xmx poate fi mult mai mare. Deci, memoria este mult mai puțin probabil să fie o constrângere.

Puteți suprascrie dimensiunea implicită a bucății prin definirea acestor etichete în datasets.xml   (cu valori diferite faţă de cele prezentate aici) :
Pentru grile:&lt;RequestMaxBytes&gt;100000000&lt;/partialRequestMaxBytes&gt;
Pentru tabele:&lt;Request parţialMax1/2000&gt;1000000&lt;/partialRequestMaxCells&gt;

Request parţialMaxBytes este numărul maxim preferat de octeţi pentru o cerere parţială de date de reţea (o parte din cererea totală) . default=100000000 (10^8) . Marimi mai mari nu sunt neapărat mai bune (și nu merge peste 500 MB pentru că este limita implicită THREDS pentru DAP răspunsuri) . Dar dimensiuni mai mari pot necesita mai puține accese de tone de fișiere (Gândeşte-te la ERD Datele satelitului cu fiecare punct de timp dintr-un fișier separat - este mai bine să obțineți mai multe date din fiecare fișier în fiecare cerere parțială) .

parţialRequestMaxCells este numărul maxim preferat de celule (NRows nColumns în tabelul de date) pentru o cerere parțială de date privind tabelul (o parte din cererea totală) . Implicit = 100000. Marimi mai mari nu sunt neapărat mai bune. Acestea duc la o așteptare mai lungă pentru lotul inițial de date de la sursă.

Orice modificare a valorii acestei etichete va avea efect data viitoare ERDDAP™ citeste datasets.xml , inclusiv ca răspuns la un set de date [pavilion](/docs/server-admin/additional-information#flag) . Înainte ERDDAP™ v2.00, acestea au fost specificate în setup.xml, care este încă permis, dar descurajat.
     
### &lt;cerere Blacklist&gt;{#requestblacklist} 
* [ ** &lt;cerere Lista neagră &gt; ** ] (#Cerere lista neagră)   [este o etichetă OPTIONAL](/docs/server-admin/additional-information#frequent-crashes-or-freezes) în&lt;erddapDatasets&gt; tag in datasets.xml care conține o listă separată de adrese IP numerice care vor fi înscrise pe lista neagră. Orice modificare a valorii acestei etichete va avea efect data viitoare ERDDAP™ citeste datasets.xml , inclusiv ca răspuns la un set de date [pavilion](/docs/server-admin/additional-information#flag) .
    * Acest lucru poate fi folosit pentru a evita o [Negarea atacului serviciului](https://en.wikipedia.org/wiki/Denial_of_service) , un prea zelos [robot web](https://en.wikipedia.org/wiki/Internet_bot) , sau orice alt tip de utilizator supărător.
    * Utilizator supărător... Dacă ERDDAP™ încetinește la un crawl sau îngheță / opriri, cauza este adesea un utilizator supărător care rulează mai mult de un script la o dată și / sau de a face un număr mare de cereri foarte mari, extrem de ineficiente, sau invalide, sau cereri simultane. Uită-te în [log.txt](/docs/server-admin/additional-information#log) pentru a vedea dacă este cazul și pentru a găsi adresa IP numerică a utilizatorului supărător. În cazul în care aceasta este problema, ar trebui, probabil, lista neagră că utilizatorul.
        
Când ERDDAP™ primește o cerere de la o adresă IP listată pe lista neagră, aceasta va reveni eroare HTTP 403: Interzis. Mesajul de eroare text însoțitor încurajează utilizatorul să vă e-mail, ERDDAP administrator, pentru a rezolva problemele. Dacă au timp să citească mesajul de eroare (Multe aparent nu) și vă contactați, puteți lucra cu ei pentru a le obține pentru a rula doar un script la un moment dat, face cereri mai eficiente, rezolva problemele din scenariul lor (de exemplu, solicitarea de date dintr-un set de date la distanță care nu pot răspunde înainte de sincronizare) , sau orice altceva a fost sursa de probleme.
        
Adesea, utilizatorii nu ştiu că cererile lor sunt supărătoare. Adesea, ei nu cunosc insectele, ineficienţele grave sau alte probleme cu scripturile lor. De multe ori cred că pentru că dumneavoastră ERDDAP™ oferă date gratuit, pe care le pot cere cât de mult date doresc, de exemplu, prin rularea mai multor scripturi sau prin utilizarea mai multor fire simultan.
        
        * Le puteţi explica că fiecare ERDDAP™ , acum contează cât de mare și puternic, are resurse finite (Timp procesor, hard disk I/O, lățime de bandă de rețea etc.) și nu este corect dacă un utilizator solicită date într-un mod care mulțime afară alți utilizatori sau suprasarcină ERDDAP .
        * Odată ce un utilizator știe cum să facă 2 cereri simultane, adesea ei nu văd nici un motiv să nu facă 5, 10 sau 20 de cereri simultane, deoarece cererile suplimentare le costă nimic. Este ca un război asimetric: aici, armele ofensive au un avantaj enorm (Costuri zero) peste armele defensive (o instalație finită cu costuri reale) .
        * Menționați-le că se diminuează veniturile în ceea ce privește efectuarea de cereri din ce în ce mai simultane; cererile suplimentare blochează și mai mult cererile altor utilizatori; ele nu generează o îmbunătățire uriașă pentru ei.
        * Reaminteşte-le că există şi alţi utilizatori (atât utilizatorii ocazionali, cât și alți utilizatori care rulează scripturi) Aşa că nu e corect din partea lor să le ia pe toate. ERDDAP Resursele lui.
        * Arată că gigantii tech au indus utilizatorii să se aștepte resurse infinite de la servicii web. În timp ce există modalități de a configura [grile/clustere/federații ale ERDDAP s](/docs/server-admin/scaling) pentru a face o ERDDAP™ sistem cu mai multe resurse, majoritatea ERDDAP™ Administratorii nu au banii sau forţa de muncă pentru a crea astfel de sisteme, iar un astfel de sistem va fi încă finit. La ERD De exemplu, există o singură persoană. (eu) scris ERDDAP™ , administrarea a două ERDDAP s (Cu ajutorul şefului meu) , și gestionarea mai multor surse de date, toate cu un buget anual hardware de $0 (ne bazăm pe granturi ocazionale pentru a plăti pentru hardware) . Acest lucru nu este Google, Facebook, Amazon, etc cu 100 de ingineri, și milioane de dolari de venituri pentru a recicla în sisteme tot mai mari. Şi nu ne putem mişca ERDDAP™ să, de exemplu, Amazon AWS, deoarece costurile de stocare a datelor sunt mari și taxele de ieșire a datelor sunt mari și variabile, în timp ce bugetul nostru pentru serviciile externe este un fix $0.
        * Cererea mea pentru utilizatori este: pentru cererile non-sensibile (care este de departe cel mai comun caz) , sistemul lor ar trebui să facă doar o cerere la un moment dat. Dacă cererile sunt sensibile la timp (de exemplu, mai multe .png-uri pe o pagină web, mai multe plăci pentru o WMS client etc.) , atunci poate 4 cereri simultane ar trebui să fie maxim (și doar pentru un timp foarte scurt) .
        * Dacă explicați situația utilizatorului, majoritatea utilizatorilor vor înțelege și vor fi dispuși să facă modificările necesare, astfel încât să puteți elimina adresa IP de pe lista neagră.
             
    * Pentru lista neagră a unui utilizator, adăugați adresa IP numerică la lista de adrese IP separate de virgulă în&lt;cerere Lista neagră &gt; în datasets.xml Dosar. Pentru a găsi adresa IP a utilizatorului supărător, uita-te în ERDDAP™   *Big ParentDirectory* /logs/log.txt fișier ( *Big ParentDirectory* este specificat în [setup.xml](/docs/server-admin/deploy-install#setupxml) ) pentru a vedea dacă este cazul și pentru a găsi adresa IP a utilizatorului respectiv. Adresa IP pentru fiecare solicitare este listată pe liniile care încep cu "&#123;&#123;&#123;#" și este 4 numere separate pe perioade, de exemplu, 123.45.67.8 . Căutarea "ERROR" vă va ajuta să găsiți probleme, cum ar fi cereri invalide.
    * Puteți înlocui, de asemenea, ultimul număr într-o adresă IP cu\\*(de exemplu 202.109.200.\\*) să blocheze o gamă de adrese IP, 0-255.
    * Puteți înlocui, de asemenea, ultimele 2 numere într-o adresă IP cu\\*.\\*  (De exemplu, 121.204.\\*.\\*) să blocheze o gamă mai largă de adrese IP, 0-255.0-255.5.
    * De exemplu,
    ```
        <requestBlacklist>98.76.54.321, 202.109.200.\\*, 121.204.\\*.\\*</requestBlacklist>
    ```
    * Nu trebuie să reporneşti. ERDDAP™ pentru modificările&lt;solicita Blacklist&gt; pentru a intra în vigoare. Modificările vor fi detectate data viitoare. ERDDAP™ verifică dacă seturile de date trebuie reîncărcate. Sau, puteți accelera procesul prin vizitarea unui [setDataset URL- ul steagului](/docs/server-admin/additional-information#set-dataset-flag) pentru orice set de date.
    * Al tău ERDDAP™ raportul zilnic include o listă/talie a celor mai activi solicitanţi autorizaţi şi blocaţi.
    * Dacă doriți să vă dați seama ce domeniu/instituție este legată de o adresă IP numerică, puteți utiliza un serviciu web DNS gratuit, inversat, cum ar fi [https://network-tools.com/](https://network-tools.com/) .
    * Pot exista momente în care este logic să blocăm anumiţi utilizatori la un nivel mai ridicat, de exemplu, utilizatori maliţioşi. De exemplu, puteți bloca accesul lor la tot de pe server, nu doar ERDDAP . Pe Linux, o astfel de metodă este de a utiliza [iptables](https://www.linode.com/docs/guides/control-network-traffic-with-iptables/) . De exemplu, puteți adăuga o regulă care va bloca totul venind de la 198.51.100.0 cu comanda
iptables - I INPUT -s 198.51.100.0 -J DROP
       
### &lt;SlowTroubleMillis&gt;{#slowdowntroublemillis} 
* [ ** &lt;SlowTroubleMillis&gt; ** ] (#slow down troublemillis) este o etichetă OPTONAL utilizată rar în&lt;erddapDatasets&gt; tag in datasets.xml care conține un număr întreg specificând numărul de milisecunde (implicit = 1000) să se oprească atunci când răspunde la toate cererile eșuate, de exemplu, setul de date necunoscut, cerere prea mare, utilizator pe lista neagră. De exemplu,
    ```
    <slowDownTroubleMillis>2000</slowDownTroubleMillis>
    ```
Dacă un scenariu face o cerere imediat după alta, atunci s-ar putea face rapid o cerere proastă după alta. Cu această setare, puteți încetini un script care nu funcționează astfel ERDDAP™ nu este inundat de cereri rele. Dacă un om face o cerere proastă, ei nici măcar nu vor observa această întârziere. Recomandări:
    
    * În cazul în care problema este o negare distribuit de serviciu (DDOS) atac de la 100 + atacatori, setați acest lucru la un număr mai mic (100?) . Încetinindu-le pe toate pentru prea mult timp duce la prea multe fire active.
    * Dacă problema este de la 1-10 surse, setați acest lucru la 1000 ms (implicit) , dar un număr mai mare (cum ar fi 10000) este, de asemenea, rezonabil. Asta îi încetineşte ca să risipească mai puţine resurse de reţea. De asemenea, 1000 ms sau cam asa ceva nu va deranja utilizatorii umani care fac o cerere proasta.
    
Orice modificare a valorii acestei etichete va avea efect data viitoare ERDDAP™ citeste datasets.xml , inclusiv ca răspuns la un set de date [pavilion](/docs/server-admin/additional-information#flag) .
     
### &lt;abonareEmailBlacklist&gt;{#subscriptionemailblacklist} 
* [ ** &lt;abonament E-mailBlacklist&gt; ** ] (#subscriptionemail blacklist) este o etichetă OPTONAL utilizată rar în&lt;erddapDatasets&gt; tag in datasets.xml care conține o listă separată de adrese de e-mail care sunt imediat pe lista neagră de la [sistem de abonament](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions) , de exemplu
    ```
    <subscriptionEmailBlacklist>bob@badguy.com, john@badguy.com</subscriptionEmailBlacklist>  
    ```
Acesta este un sistem insensibil. Dacă se adaugă o adresă de e-mail la această listă, dacă adresa de e-mail are abonamente, abonamentele vor fi anulate. Dacă o adresă de e-mail de pe listă încearcă să se aboneze, cererea va fi refuzată. Orice modificare a valorii acestei etichete va avea efect data viitoare ERDDAP™ citeste datasets.xml , inclusiv ca răspuns la un set de date [pavilion](/docs/server-admin/additional-information#flag) .
     
### Text standard{#standard-text} 
*    [ **Text standard** ](#standard-text) -- Există mai multe etichete OPTIONAL (cele mai rare sunt utilizate) în&lt;erddapDatasets&gt; tag in datasets.xml pentru a specifica textul care apare în diferite locuri în ERDDAP . Dacă doriți să modificați textul implicit, copiați valoarea existentă din eticheta aceleiași denumiri din
     *Tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util.messages.xml în datasets.xml , apoi modificaţi conţinutul. Avantajul de a avea aceste în datasets.xml este că puteți specifica noi valori în orice moment, chiar și atunci când ERDDAP™ Fuge. Orice modificare a valorilor acestor etichete va avea efect data viitoare ERDDAP™ citeste datasets.xml , inclusiv ca răspuns la un set de date [pavilion](/docs/server-admin/additional-information#flag) . Numele etichetă descrie scopul lor, dar a se vedea conținutul implicit în mesaje.xml pentru o înțelegere mai profundă.
    
    *   &lt;standardLicense&gt;
    *   &lt;standardContact&gt;
    *   &lt;standardDataLicense&gt;
    *   &lt;standardDisclaimerOfEndorsement&gt;
    *   &lt;standardDisclaimerOfExternalLinks&gt;
    *   &lt;standardGeneralDisclaimer&gt;
    *   &lt;standard PrivacyPolicy&gt;
    *   &lt;StartHeadHtml5&gt;
    *   &lt;startBodyHtml5&gt; este o etichetă bună pentru a schimba pentru a personaliza aspectul de sus a fiecărei pagini web din dvs. ERDDAP . În special, puteți utiliza acest lucru pentru a adăuga cu ușurință un mesaj temporar pe ERDDAP™ pagina de start (De exemplu, "Verificați noul set de date JPL MUR SST v4.1 ..." sau "Acest lucru ERDDAP™ va fi offline pentru întreținere 2019-05-08T17:00 PDT până în 2019-05-08T20:00 PDT.") . Un capriciu de a pune această etichetă în datasets.xml este: când reporniţi ERDDAP , prima cerere ERDDAP™ va returna startul implicit BodyHtml5 HTML, dar fiecare cerere ulterioară va utiliza startBodyHtml5 HTML specificate în datasets.xml .
    *   &lt;scurtăDescriere Html&gt; este o etichetă bună pentru a schimba în scopul de a personaliza descrierea dvs. ERDDAP . Rețineți că puteți schimba cu ușurință acest mesaj pentru a adăuga un mesaj temporar pe pagina principală (de exemplu, "Acest lucru ERDDAP™ va fi offline pentru întreținere 2019-05-08T17:00 PDT până în 2019-05-08T20:00 PDT.") .
    *   &lt;EndBodyHtml5&gt;
    
      
Înainte ERDDAP™ v2.00, acestea au fost specificate în setup.xml, care este încă permis, dar descurajat.
     
### &lt;neobişnuit Activitate &gt;{#unusualactivity} 
* [ ** &lt;neobişnuit Activitate &gt; ** ] (#inutilitate) este o etichetă OPTONAL utilizată rar în&lt;erddapDatasets&gt; tag in datasets.xml să specifice numărul maxim de cereri între două serii de date de încărcare considerate normale (implicit=10000) . Dacă acest număr este depășit, un e-mail este trimis prin e-mailEverythingTo (conform specificațiilor din setup.xml) . De exemplu,
    ```
    <unusualActivity>10000</unusualActivity>  
    ```
Orice modificare a valorii acestei etichete va avea efect data viitoare ERDDAP™ citeste datasets.xml , inclusiv ca răspuns la un set de date [pavilion](/docs/server-admin/additional-information#flag) . Înainte ERDDAP™ v2.00, acest lucru a fost specificat în setup.xml, care este încă permis, dar descurajat.
     
### &lt;updateMaxEvenimente&gt;{#updatemaxevents} 
* [ ** &lt;updateMaxEvenimente &gt; ** ] (#actualizează evenimentele maxime) este o etichetă OPTONAL utilizată rar în&lt;erddapDatasets&gt; tag in datasets.xml să specifice numărul maxim de evenimente de schimbare a fișierului (implicit=10) care va fi manipulat de [&lt;updateEveryNMillis&gt;] (#Update everythingnmillis) sistem înainte de a comuta pentru a reîncărca setul de date. De exemplu,
    ```
    <updateMaxEvents>10</updateMaxEvents>  
    ```
Sistemul de actualizareEveryNMillis este destinat să ruleze foarte repede chiar înainte ca cererea unui utilizator să fie procesată. Dacă există o mulțime de evenimente de schimbare de fișier, atunci probabil că nu poate rula rapid, astfel încât în schimb solicită ca setul de date să fie reîncărcat. Dacă ERDDAP™ tratează seturile de date care trebuie să fie actualizate chiar și atunci când există modificări la un număr mare de fișiere de date, puteți seta acest lucru la un număr mai mare (100?) .

### &lt;utilizator &gt;{#user} 
* [ ** &lt;utilizator &gt; ** ] (#user) este o etichetă OPTIONALă în cadrul&lt;erddapDatasets&gt; tag in datasets.xml care identifică numele de utilizator, parola (dacă autentificarea=custom) , și roluri (o listă separată de virgulă) . Utilizarea numelui de utilizator și a parolei variază ușor în funcție de valoarea [&lt;autentificare&gt;] (/docs/server-admin/suplimental-information#autentification) în ERDDAP Dosarul lui setup.xml.
    * Asta face parte din ERDDAP 's [sistem de securitate](/docs/server-admin/additional-information#security) limitarea accesului la anumite seturi de date către unii utilizatori.
    * Fă-o separat.&lt;etichetă utilizator &gt; pentru fiecare utilizator. Opțional, dacă autentificare=oaut2, puteți configura două&lt;utilizator &gt; tag-uri pentru fiecare utilizator: unul pentru momentul în care utilizatorul se conectează prin intermediul Google, unul pentru atunci când utilizatorul se loghează prin Orcid, probabil cu aceleași roluri.
    * Dacă nu există&lt;tag-ul pentru un client, s/el va putea accesa doar seturile de date publice, adică seturile de date care nu au un [&lt;Access to&gt;] (#accesibil la) Tag.
    * nume utilizator
Pentru autentificare=custom, numele de utilizator este de obicei o combinație de litere, cifre, accente și perioade.
Pentru autentificare=email, numele de utilizator este adresa de e-mail a utilizatorului. Poate fi orice adresă de e-mail.
Pentru autentificare=google, numele de utilizator este adresa completă de e-mail Google a utilizatorului. Acestea includ conturi Google, cum ar fi @noaa.gov conturi.
Pentru autentificare=orcid, numele de utilizator este numărul de cont Orcid al utilizatorului (cu dantelă) .
Pentru autentificare=oauth2, numele de utilizator este adresa completă de e-mail Google sau numărul de cont Orcid al utilizatorului (cu dantelă) .
    * parolă
Pentru autentificare=email, Google, orcid sau oauth2, nu specificați un atribut de parolă.
Pentru autentificare=custom, trebuie să specificați un atribut de parolă pentru fiecare utilizator.
        * Parolele pe care le introduc utilizatorii sunt sensibile la caz și trebuie să aibă 8 sau mai multe caractere, astfel încât acestea sunt mai greu de spart. În zilele noastre, chiar și 8 caractere pot fi sparte rapid și ieftin prin forță brută folosind un grup de calculatoare pe AWS. ERDDAP™ aplică minimul de 8 caractere numai atunci când utilizatorul încearcă să se logheze (nu și atunci când&lt;tag-ul este procesat, deoarece acest cod vede doar hash digerarea parolei, nu parola text simplu).
        * setup.xml&lt;parolăEncoding&gt; determină modul în care parolele sunt stocate în&lt;utilizator &gt; etichete în datasets.xml . Pentru a spori securitatea, opțiunile sunt:
            *    [MD5](https://en.wikipedia.org/wiki/MD5)   (Nu folosi asta&#33;) -- pentru atributul parolei, specificaţi haşişul MD5 digerat al parolei utilizatorului.
            * UEPMD5 (Nu folosi asta&#33;) -- pentru atributul parolei, specificaţi haşişul MD5 digerat al *nume utilizator* : ERDDAP : *parolă* . Numele de utilizator și " ERDDAP " sunt folosite pentru [sare](https://en.wikipedia.org/wiki/Salt_(cryptography) ) valoarea hash, ceea ce face mai dificil de decodat.
            *    [SHA256](https://en.wikipedia.org/wiki/SHA-2)   (nu este recomandată) -- pentru atributul parolei, specificaţi haşişul SHA-256 digerat al parolei utilizatorului.
            * UEPSHA256 (implicit, parolă recomandatăEncoding. Dar mult mai bine: utilizați opțiunile de autentificare Google, Orhidee sau Oauth2.) -- pentru atributul parolei, specificaţi haşişul SHA-256 digerat al *nume utilizator* : ERDDAP : *parolă* . Numele de utilizator și " ERDDAP " sunt folosite pentru a sara valoarea hash, ceea ce face mai dificil de decodat.
        * Pe Windows, puteți genera valori de digerare a parolei MD5 prin descărcarea unui program MD5 (cum ar fi [MD5](https://www.fourmilab.ch/md5/) ) şi utilizarea (de exemplu) :
Md5 -djsmith: ERDDAP : *Parolă reală* 
        * Pe Linux/Unix, puteți genera valori digerate MD5 utilizând programul built-in md5sum (de exemplu) :
Echo-n "jsmith: ERDDAP : *Parolă reală* " | md5sum
        * Parolele de text simplu stocate sunt sensibile la caz. Formele stocate de parole MD5 și UEPMD5 nu sunt sensibile la caz.
        * De exemplu. (utilizarea UEPMD5) , în cazul în care numele de utilizator="jsmith" și parola="my Parola,"&lt;tag-ul este:
```
            <user username="jsmith"  
            password="57AB7ACCEB545E0BEB46C4C75CEC3C30"  
            roles="JASmith, JASmithGroup" />  
```
unde parola stocată a fost generată cu
Md5 -djsmith: ERDDAP :Parola mea
        * rolurile sunt o listă separată de roluri pentru care utilizatorul este autorizat. Orice&lt;Setul de date &gt; poate avea un [&lt;Access to&gt;] (#accesibil la) eticheta care enumeră rolurile care pot avea acces la setul de date respectiv. Pentru un anumit utilizator și un anumit set de date, dacă unul dintre rolurile din lista de roluri a utilizatorului corespunde unuia dintre rolurile din lista setului de date&lt;accessableTo&gt; rols, then the user is authorised to access that settle.
            
Fiecare utilizator care se logheaza este dat automat rolul \\[ oricine logat În \\] , dacă există o&lt;tag-ul pentru utilizator &gt; datasets.xml sau nu. Deci, dacă un set de date dat are
```
            <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
```
atunci orice utilizator care este conectat va fi autorizat să acceseze acel set de date, chiar dacă nu există&lt;tag-ul pentru utilizator &gt; datasets.xml .
            
    * Orice modificare a valorii acestei etichete va avea efect data viitoare ERDDAP™ citeste datasets.xml , inclusiv ca răspuns la un set de date [pavilion](/docs/server-admin/additional-information#flag) .
         
### &lt;caleRegex&gt;{#pathregex} 
* [ ** &lt;caleRegex&gt; ** ] (#patregex) vă permite să specificaţi o expresie regulată care limitează ce căi (care subdirecții) vor fi incluse în setul de date. Implicit este .\\*, care se potrivește toate căile. Aceasta este o etichetă OPTONALă utilizată rar, rareori necesară pentru EDDGrid Din seturile de date Dosare, din tabelul EDDFromFiles, și alte câteva tipuri de seturi de date. Totuşi, când ai nevoie de ea, chiar ai nevoie.
    
Pentru a face acest lucru, trebuie să fie foarte bun cu expresii regulate. Vezi asta? [documentația regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) şi [tutorial regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) . În special, trebuie să știți despre grupurile de capturare (ceva în interiorul parantezelor) , și "sau" simbol " | ".
Împreună, acestea vă permit să specificați orice număr de opțiuni, de exemplu, (opțiunea 1 | opțiunea 2 | opțiunea 3) .
De asemenea, oricare dintre opțiuni poate fi nimic, de exemplu, ( | opțiunea 2 | opțiunea 3) .
De asemenea, trebuie să știți că grupurile de capturare pot fi cuibărite, adică orice opțiune dintr-un grup de capturare poate conține un alt grup de capturare, de exemplu, ( | opțiunea 2 ( | opțiunea 2 b | opțiunea 2c)  | opțiunea 3) care spune că opțiunea2 poate fi urmată de nimic, sau opțiunea2b, sau opțiunea2c.
Pentru pathRegexes, fiecare opțiune va fi un nume de dosar urmat de un /, de exemplu, bar/ .
    
Partea complicată a căiiRegex este: ERDDAP™ Apare în mod recursiv arborele director, caleaRegex trebuie să accepte toate căile pe care le întâlnește în drum spre directoare cu date. Regex cu grupuri de capturare cuiburi sunt o modalitate bună de a face cu acest lucru.
    
Un exemplu:
Să presupunem că avem următoarea structură director:
    ```
    /foo/bar/D0001/a/\\*.nc  
    /foo/bar/D0001/b/\\*.nc  
    /foo/bar/D0002/a/\\*.nc  
    /foo/bar/D0002/b/\\*.nc  
    ...  
    /foo/bar/E0001/a/\\*.nc  
    ...  
    ```
iar fişierul specificat este /foo/bar/, şi vrem doar .nc fișiere în D \\[ 0-9 \\] &#123;4&#125;/a/ subdirectoare.
Soluţia este să setaţi caleaRegex la /foo/bar/ ( | D \\[ 0-9 \\] &#123;4&#125; / ( | a/) )   
Asta spune:
Calea trebuie să înceapă cu /foo/bar/
Acest lucru poate fi urmat de nimic sau D \\[ 0-9 \\] &#123;4&#125; /
Acest lucru poate fi urmat de nimic sau a /
    
Da, calea Regex poate fi incredibil de dificil de formulat. Dacă te blochezi, întreabă un programator. (Cel mai apropiat lucru din lumea reală de un vrăjitor care scuipă incantaţii?) sau trimite un e-mail lui Chris. John la Noaa.gov.
    
### &lt;Set de date &gt;{#dataset} 
* [ ** &lt;Set de date &gt; ** ] (#Set de date) es OPTONAL (dar întotdeauna folosit) etichetă în cadrul&lt;erddapDatasets&gt; tag in datasets.xml care (dacă includeţi toate informaţiile dintre&lt;Set de date &gt; și&lt;/Set de date&gt;) descrie complet un set de date. De exemplu,
    ```
    <dataset type="EDDGridFromDap" datasetID="erdPHssta8day" active="true"> ... </dataset>  
    ```
S-AR PUTEA să existe un număr de etichete de set în datasets.xml Dosar.
Trei atribute pot apărea în cadrul unui&lt;Set de date &gt; etichetă:
     
    *    **type=" *a Tip* "** este un atribut necesar în cadrul unei&lt;Set de date&gt; tag in datasets.xml care identifică tipul de set de date (de exemplu, dacă este EDDGrid Set de date/mărginite sau EDD) și sursa datelor (de exemplu, o bază de date, fișiere sau o telecomandă OPeNDAP server) . Vezi [ **Lista tipurilor de seturi de date** ](#list-of-types-datasets) .
         
#### Set de date Id{#datasetid} 
*    [ ** datasetID =" *aDatasetID* "** ](#datasetid) este un atribut necesar în cadrul unei&lt;Set de date &gt; eticheta care atribuie un scurt (de obicei,&lt;15 caractere), unic, care identifică numele unui set de date.
    * ă datasetID Trebuie să fie o scrisoare. (A-Z, a-z) urmată de orice număr de A-Z, a-z, 0-9, și \\_ (dar cel mai bine dacă&lt;32 de caractere în total).
    * Set de date ID-urile sunt sensibile la caz, dar nu crea două datasetID s care diferă numai în litere superioare/de jos. Acesta va provoca probleme pe computerele Windows (computerul dumneavoastră și/sau al unui utilizator) .
    * Cele mai bune practici: Vă recomandăm utilizarea [cămilă Caz](https://en.wikipedia.org/wiki/CamelCase) .
    * Cele mai bune practici: Vă recomandăm ca prima parte să fie un acronim sau o abreviere a numelui instituției sursă, iar a doua parte să fie un acronim sau o abreviere a numelui setului de date. Când este posibil, creăm un nume care reflectă numele sursei pentru setul de date. De exemplu, am folosit datasetID ="erdPH sst a8zi" pentru un set de date din NOAA   NMFS   SWFSC Divizia de cercetare în domeniul mediului ( ERD ) care este desemnată de sursa care urmează să fie satelit/PH/ sst 8 zile.
    * Dacă schimbi numele unui set de date, vechiul set de date (cu vechiul nume) va fi încă în direct ERDDAP . Acesta este un set de date "orfan," deoarece specificațiile pentru acesta în datasets.xml Acum s-a dus. Acest aspect trebuie abordat:
        1. Pentru ERDDAP™ V2.19 şi mai târziu, nu trebuie să faci nimic. ERDDAP™ va elimina automat aceste seturi de date orfane.
        2. Pentru ERDDAP™ v2.18 și mai devreme, trebuie să faci ceva pentru a elimina setările de date orfane: să facă un set de date "fals," de exemplu,
```
                <dataset type="EDDTableFromNcFiles" datasetID="*theOldName*" active="false" />  
```
După următoarea încărcătură majoră Seturi de date; Puteți elimina eticheta după ce vechiul set de date este inactiv.
                 
#### activă{#active} 
*    [ **active=" *boolean* "** ](#active) este un atribut OPTIONAL în cadrul&lt;Set de date&gt; tag in datasets.xml care indică dacă un set de date este activ (eligibile pentru utilizare în ERDDAP ) sau nu.
    * Valorile valide sunt adevărate (implicit) şi fals.
    * Deoarece implicit este adevărat, nu trebuie să utilizați acest atribut până când doriți să eliminați temporar sau permanent acest set de date de la ERDDAP .
    * Dacă eliminați doar un set de date "adevărat" activ datasets.xml , setul de date va fi încă activ în ERDDAP™ dar nu va fi niciodată actualizat. Un astfel de set de date va fi un "orfan" și va fi listat ca atare cu privire la statut. Pagina web html chiar sub lista de seturi de date care nu au putut fi încărcate.
    * Dacă setați activ="fals," ERDDAP™ va dezactiva setul de date data viitoare când va încerca să actualizeze setul de date. Când faci asta, ERDDAP™ nu aruncă nicio informație pe care ar fi putut-o stoca despre setul de date și cu siguranță nu face nimic datelor reale.
    * Pentru a elimina un set de date din ERDDAP™ , vezi [Eliminarea datelor privind forța](/docs/server-admin/additional-information#removing-datasets) .
         

 ** Mai multe etichete pot apărea între&lt;Set de date &gt; și&lt;/dataset&gt; tags. **   
Există o anumită variație în care etichetele sunt permise prin care tipuri de seturi de date. A se vedea documentația pentru un anumit [tipul setului de date](#list-of-types-datasets) pentru detalii.

#### &lt;accesibil To&gt;{#accessibleto} 
* [ ** &lt;accesibil To&gt; ** ] (#accesibil la) este o etichetă OPTIONALĂ în cadrul&lt;Set de date&gt; tag-ul care specifică o listă separată de virgulă [roluri](#user) care pot avea acces la acest set de date. De exemplu,
    ```
    <accessibleTo>RASmith, NEJones</accessibleTo>  
    ```
    * Asta face parte din ERDDAP 's [sistem de securitate](/docs/server-admin/additional-information#security) limitarea accesului la anumite seturi de date către unii utilizatori.
    * Dacă această etichetă nu este prezentă, toți utilizatorii (chiar dacă nu s-au logat) va avea acces la acest set de date.
    * Dacă această etichetă este prezentă, acest set de date va fi vizibil și accesibil numai utilizatorilor înregistrați care au unul dintre rolurile specificate. Acest set de date nu va fi vizibil pentru utilizatorii care nu sunt conectați.
    * Fiecare utilizator care se logheaza este dat automat rolul \\[ oricine logat În \\] , dacă există o&lt;tag-ul pentru utilizator &gt; datasets.xml sau nu. Deci, dacă un set de date dat are
    ```
        <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
    ```
atunci orice utilizator care este conectat va fi autorizat să acceseze acel set de date, chiar dacă nu există&lt;tag-ul pentru utilizator &gt; datasets.xml .
         
#### &lt;grafice Accesibile{#graphsaccessibleto} 
* [ ** &lt;grafice AccesibileTo&gt; ** ] (#grafsaccessible to) este o etichetă OPTIONALĂ în cadrul&lt;Set de date&gt; tag in datasets.xml care determină dacă grafica și metadatele pentru setul de date sunt disponibile publicului. Acesta oferă o modalitate de a suprascrie parțial setului de date [&lt;Access to&gt;] (#accesibil la) Setare. Valorile permise sunt:
    * Auto... Această valoare (sau absența&lt;graficsAccessibleTo&gt; tag-ul pentru setul de date) face accesul la grafice și metadate din setul de date să mimeze setul de date&lt;AccessableTo&gt; setting.
Deci, dacă setul de date este privat, graficele și metadatele sale vor fi private.
Și dacă setul de date este public, graficele și metadatele sale vor fi publice.
    * public -- Această setare face ca graficele și metadatele setului de date să fie accesibile oricui, chiar și utilizatorilor care nu sunt conectați, chiar dacă setul de date este altfel privat, deoarece are un&lt;accesibilTo&gt; tag.
         
#### &lt;accesibil ViaFiles&gt;{#accessibleviafiles} 
* [ ** &lt;Vise accesibile&gt; ** ] (#accesibilviafiles) este o etichetă OPTIONALĂ în cadrul&lt;Set de date&gt; tag in datasets.xml pentru [ EDDGrid Dimensiune agregată](#eddgridaggregateexistingdimension) , [ EDDGrid Copiază](#eddgridcopy) , [ EDDGrid Tabel de la EDD](#eddgridfromeddtable) , [ EDDGrid FromErddap](#eddfromerddap) , [ EDDGrid De la Etopo](#eddgridfrometopo) , [ EDDGrid Din dosare](#eddgridfromfiles)   (inclusiv toate subclasele) , [ EDDGrid SideBySide](#eddgridsidebyside) , [EDDCommentCopy](#eddtablecopy)   [Tabel EDD FromErddap](#eddfromerddap) , [Tabel EDD din EDDGrid ](#eddtablefromeddgrid) , și [Tabel EDD din dosare](#eddtablefromfiles)   (inclusiv toate subclasele) Seturi de date. Poate avea valoare adevărată sau falsă. De exemplu,
    ```
    <accessibleViaFiles>true</accessibleViaFiles>  
    ```
Dacă valoarea este adevărată, ERDDAP™ va face astfel încât utilizatorii să poată naviga și descărca fișierele sursă de date ale setului prin intermediul ERDDAP 's [ "files" sistem](https://coastwatch.pfeg.noaa.gov/erddap/files/) . Vezi "files" sisteme [documentația](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) pentru mai multe informații.
    
Valoarea implicită a&lt;Vise accesibile&gt; vine de la&lt;implicitAccesibilViaFiles&gt; în [setup.xml](/docs/server-admin/deploy-install#setupxml) . Ea are o valoare implicită de fals, dar vă recomandăm să adăugați că eticheta la setup.xml cu o valoare de adevărat.
    
Recomandarea... Vă recomandăm să faceți accesibile toate seturile de date relevante prin intermediul sistemului de fișiere prin setare&lt;implicitAccessibleViaFiles&gt; adevarat in setup.xml deoarece exista un grup de utilizatori pentru care acesta este modul preferat de a obtine datele. Printre alte motive, "files" sistemul face ușor pentru utilizatori să vadă ce fișiere sunt disponibile și când au schimbat ultima dată, făcând astfel ușor pentru un utilizator să își mențină propria copie a întregului set de date. Dacă în general nu doriți să faceți seturile de date accesibile prin intermediul sistemului de fișiere, setați&lt;implicitAccesibilViaFiles&gt; la fals. În ambele cazuri, folosiţi&lt;accessViaFiles&gt; pentru puținele seturi de date care sunt excepții de la politica generală stabilită de&lt;implicitAccesibilViaFiles&gt; (de exemplu, atunci când setul de date utilizează [ .nc ml](#ncml-files) fișiere, care nu sunt cu adevărat utile utilizatorilor) .
     
#### &lt;accesibil Via WMS &gt;{#accessibleviawms} 
* [ ** &lt;accesibil Via WMS &gt; ** ] (#accessibleviawms) este o etichetă OPTIONALĂ în cadrul&lt;Set de date&gt; tag in datasets.xml pentru toţi [ EDDGrid ](#eddgrid) Subclase. Ea poate avea o valoare de adevărat (implicit) sau fals. De exemplu,
    ```
    <accessibleViaWMS>true</accessibleViaWMS>  
    ```
Dacă valoarea este falsă, ERDDAP 's WMS serverul nu va fi disponibil pentru acest set de date. Acest lucru este utilizat în mod obișnuit pentru seturile de date care au valori de longitudine mai mari de 180 (care este invalidă din punct de vedere tehnic pentru WMS servicii) , și pentru care sunteți oferind, de asemenea, o variantă a setului de date cu valori de longitudine în întregime în intervalul -180 la 180 prin [ EDDGrid LonPM180](#eddgridlonpm180) .
Dacă valoarea este adevărată, ERDDAP™ va încerca să pună la dispoziție setul de date prin intermediul ERDDAP 's WMS server. Dar dacă setul de date este complet nepotrivit pentru WMS   (De exemplu, nu există date privind longitudinea sau latitudinea) , atunci setul de date nu va fi disponibil prin intermediul ERDDAP 's WMS server, indiferent de această setare.
     
#### &lt;adaugă Variabile Unde?{#addvariableswhere} 
* [&lt;addVariablesUnde&gt;] (#Addvarabilswhere) este o etichetă OPTIONALă în cadrul&lt;Set de date &gt; etichetă pentru toate seturile de date ale tabelului EDD.
    
Cererile adresate oricărui set de date al tabelului EDD pot include &add Variabile Unde (" *atribut Nume* "," *atribut Valoare* ") , care spune ERDDAP™ pentru a adăuga toate variabilele din setul de date unde *AtributeName=attributeValue* la lista variabilelor solicitate. De exemplu, dacă un utilizator adaugă &add Variabile Unde (" ioos\\_category ""Vânt") la o cerere, ERDDAP va adăuga toate variabilele din setul de date care au o ioos\\_category = Atributul Wind la lista variabilelor solicitate (de exemplu, windspeed, winddirection, windGustSpeed) . *atribut Nume* şi *atribut Valoare* sunt sensibile la caz.
    
În datasets.xml , în cazul în care bucata de set de date.xml pentru un set de date are
    ```
    <addVariablesWhere>*attributeNamesCSV*<addVariablesWhere>  
    ```
de exemplu,
    ```
    <addVariablesWhere>ioos\\_category,units<addVariablesWhere>  
    ```
formularul de acces la date (Pagina web .html) pentru setul de date va include un widget (pentru fiecare atribut Denumire în lista separată de virgulă) chiar sub lista variabilelor care permite utilizatorilor să specifice o valoare atribut. Dacă utilizatorul selectează o valoare a atributului pentru unul sau mai multe nume ale atributelor, acestea vor fi adăugate la cerere prin intermediul &add Variabile Unde (" *atribut Nume* "," *atribut Valoare* ") . Astfel, această etichetă în datasets.xml vă permite să specificați lista numelor atributelor care vor apărea pe formularul de acces la date pentru acel set de date și face ușor pentru utilizatori să adauge &addVariables Unde funcţionează cererea. ă *atributeNamesCSV* Lista este sensibilă la caz.
    
#### &lt;altitudineMetersPersourceUnit&gt;{#altitudemeterspersourceunit} 
* [ ** &lt;altitudineMetersPersourceUnit &gt; ** ] (#altitudinemetri per source unit) este o etichetă OPTIONALă în cadrul&lt;Set de date &gt; eticheta în seturi de date. xxml pentru tabelul EDDDe la SOS Seturi de date (Numai&#33;) care specifică un număr multiplicat cu valorile de altitudine sau adâncime ale sursei pentru a le converti în valori de altitudine (în metri deasupra nivelului mării) . De exemplu,
    ```
    <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>  
    ```
Această etichetă trebuie utilizată în cazul în care valorile axei verticale a setului nu sunt contoare, pozitive=up. În caz contrar, este OPTIONAL, deoarece valoarea implicită este 1. De exemplu,
    * Dacă sursa este deja măsurată în metri deasupra nivelului mării, utilizați 1 (sau nu utilizați această etichetă, deoarece 1 este valoarea implicită) .
    * Dacă sursa este măsurată în metri sub nivelul mării, se utilizează -1.
    ```
        <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>
    ```
    * Dacă sursa este măsurată în km deasupra nivelului mării, utilizați 0,001.
         
#### &lt;implicitDataQuery&gt;{#defaultdataquery} 
* [ ** &lt;implicitDataQuery&gt; ** ] (Date implicite) este o etichetă OPTIONALĂ în cadrul&lt;Set de date&gt; tag in datasets.xml care spune ERDDAP™ să utilizeze interogarea specificată (partea URL-ului după "?") dacă fișierul .html Tip (formularul de acces la date) este solicitat fără nicio cerere.
    * Probabil că rareori va trebui să foloseşti asta.
    * Trebuie să codați XML (necodat în procente) întrebările implicite, deoarece acestea sunt într-un document XML. De exemplu, & devine și ,&lt;devine&lt;&gt; devine &gt;
    * Verificaţi-vă munca. E uşor să faci o greşeală şi să nu obţii ce vrei. ERDDAP™ va încerca să cureţe greşelile tale - dar nu te baza pe asta, deoarece\\*Cum\\*Este curatat se poate schimba.
    * Pentru seturile de date griddap, o utilizare comună a acestora este aceea de a specifica o valoare diferită a adâncimii implicite sau a dimensiunii altitudinii. (de exemplu, \\[ 0 \\] în loc de \\[ ultima \\] ) .
În orice caz, trebuie să listați întotdeauna toate variabilele, să utilizați întotdeauna aceleași valori de dimensiune pentru toate variabilele, și aproape întotdeauna să utilizați \\[ 0 \\] , \\[ ultima \\] , sau \\[ 0:ultima \\] pentru valorile de dimensiune.
De exemplu:
    ```
        <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
    ```
    * Pentru tabledap Seturile de date, dacă nu se specifică nicio constrângere, cererea va returna întregul set de date, care poate fi practic mare, în funcție de setul de date. Dacă nu doriți să specifice orice constrângeri, mai degrabă decât au un gol&lt;implicitDataQuery&gt; (care este aceeași ca și cum nu ar fi specificat un implicit DataQuery) , aveți nevoie pentru a lista în mod explicit toate variabilele pe care doriți să le includă în defaultDataQuery.
    * Pentru tabledap Seturi de date, cea mai frecventă utilizare a acestora este de a specifica un interval de timp implicit diferit (max. (timp) , de exemplu, &time&gt;=max (timp) -1 zi, sau relativ la acum, de exemplu, &time&gt;= now- 1 zi) .
Amintiți-vă că solicitarea nu variabile de date este aceeași cu specificarea tuturor variabilelor de date, astfel încât, de obicei, puteți specifica doar noua constrângere de timp.
De exemplu:
    ```
        <defaultDataQuery>&amp;time&gt;=max(time)-1day</defaultDataQuery>  
    ```
sau
    ```
        <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>  
    ```
#### &lt;implicitGraphQuery&gt;{#defaultgraphquery} 
* [ ** &lt;implicitGraphQuery&gt; ** ] (# Impactgraphy) este o etichetă OPTIONALĂ în cadrul&lt;Set de date&gt; tag in datasets.xml care spune ERDDAP™ să utilizeze interogarea specificată (partea URL-ului după "?") dacă fișierul .graf Tip (forma grafică) este solicitat fără nicio cerere.
    * Probabil că rareori va trebui să foloseşti asta.
    * Trebuie să codați XML (necodat în procente) întrebările implicite, deoarece acestea sunt într-un document XML. De exemplu, & devine și ,&lt;devine&lt;&gt; devine &gt;
    * Verificaţi-vă munca. E uşor să faci o greşeală şi să nu obţii ce vrei. ERDDAP™ va încerca să cureţe greşelile tale - dar nu te baza pe asta, deoarece\\*Cum\\*Este curatat se poate schimba.
    * Pentru seturile de date griddap, cea mai frecventă utilizare a acestora este de a specifica o valoare diferită a dimensiunii de adâncime implicită sau altitudine (de exemplu, \\[ 0 \\] în loc de \\[ ultima \\] ) și/sau să specifice faptul că o anumită variabilă este grafică.
În orice caz, vei folosi aproape întotdeauna \\[ 0 \\] , \\[ ultima \\] , sau \\[ 0:ultima \\] pentru valorile de dimensiune.
De exemplu:
    ```
        <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>  
    ```
         (dar pune totul pe o linie) 
    * Pentru tabledap Seturile de date, dacă nu specificați nicio constrângere, cererea va grafica întregul set de date, care poate dura mult timp, în funcție de setul de date.
    * Pentru tabledap Seturi de date, cea mai frecventă utilizare a acestora este de a specifica un interval de timp implicit diferit (max. (timp) , de exemplu, &time&gt;=max (timp) -1 zi, sau relativ la acum, de exemplu, &time&gt;= now- 1 zi) .
Amintiți-vă că solicitarea nu variabile de date este aceeași cu specificarea tuturor variabilelor de date, astfel încât, de obicei, puteți specifica doar noua constrângere de timp.
De exemplu:
    ```
        <defaultGraphQuery>&amp;time&gt;=max(time)-1day</defaultGraphQuery>  
    ```
sau
    ```
        <defaultGraphQuery>&amp;time&gt;=now-1day</defaultGraphQuery>  
    ```
#### &lt;dimensionValuesInMemory&gt;{#dimensionvaluesinmemory} 
* [ ** &lt;dimensiune Valori în memorie &gt; ** ] (#dimensiuni valori în memorie)   (Adevărat. (implicit) sau fals) este o etichetă OPTIONALă şi rar utilizată în&lt;Set de date &gt; etichetă pentru orice EDDGrid Set de date care spune ERDDAP™ unde se păstrează valorile sursă ale dimensiunilor (cunoscut şi sub numele de axisVariable s) :
    
    * adevărat = în memorie (care este mai rapid dar foloseste mai multa memorie) 
    * fals = pe disc (care este mai lent, dar nu folosește nici o memorie) 
    
De exemplu,
    ```
    <dimensionValuesInMemory>false</dimensionValuesInMemory>  
    ```
Trebuie să utilizați acest lucru numai cu valoarea nedefaultă a falsului dacă ERDDAP™ are o mulțime de seturi de date cu dimensiuni foarte mari (de exemplu, milioane de valori, de exemplu, EDDGrid Seturi de date din AudioFiles) şi ERDDAP Folosirea memoriei în utilizare este întotdeauna prea mare. A se vedea Memoria: în prezent utilizând linia la \\[ Domain al tău \\]  /erddap/status.html să monitorizeze ERDDAP™ utilizarea memoriei.
     
#### &lt;tabel fișier în memorie &gt;{#filetableinmemory} 
* [ ** &lt;tabel fișier în memorie &gt; ** ] (#Filetableinmemory)   (adevărat sau fals (implicit) ) este o etichetă OPTIONALă în cadrul&lt;Set de date &gt; etichetă pentru orice EDDGrid Din fişiere şi tabel EDD Set de date din fișiere care spune ERDDAP™ unde se păstrează tabelul de fișiere (care are informații despre fiecare fișier sursă de date) :
    
    * adevărat = în memorie (care este mai rapid dar foloseste mai multa memorie) 
    * fals = pe disc (care este mai lent, dar nu folosește nici o memorie) 
    
De exemplu,
    ```
    <fileTableInMemory>true</fileTableInMemory>  
    ```
Dacă setați acest lucru la adevărat pentru orice set de date, păstrați un ochi pe memorie: în prezent, folosind linia la \\[ Domain al tău \\]  /erddap/status.html să se asigure că ERDDAP™ Încă are o mulţime de memorie liberă.
     
#### &lt;fgdcFile&gt;{#fgdcfile} 
* [ ** &lt;fgdcFile&gt; ** ] (#fgdcfile) este o etichetă OPTIONALĂ în cadrul&lt;Set de date&gt; tag in datasets.xml care spune ERDDAP™ să utilizeze un fișier FGDC prefabricat în loc să aibă ERDDAP™ încercaţi să generaţi fişierul. Utilizare:
```
    <fgdcFile>*fullFileName*</fgdcFile>  
```
     *complet Denumire fișier* se poate referi la un fișier local (undeva pe sistemul de fișiere al serverului) sau URL-ul unui fișier la distanță.
Dacă *complet Denumire fișier* \\="" sau fișierul nu este găsit, setul de date nu va avea metadate FGDC. Acest lucru este util și dacă doriți să suprimați metadatele FGDC pentru un set de date specific.
Sau, puteți pune&lt;fgdcActive&gt; False&lt;/fgdcActive&gt; in setup.xml to tell ERDDAP™ să nu ofere metadate FGDC pentru niciun set de date.
     
#### &lt;izo19115 Fișier&gt;{#iso19115file} 
* [ ** &lt;izo19115File&gt; ** ] (#iso19115file) este o etichetă OPTIONALĂ în cadrul&lt;Set de date&gt; tag in datasets.xml care spune ERDDAP™ utilizarea unui fișier ISO 19115 pre-made în loc să aibă ERDDAP™ încercaţi să generaţi fişierul. Utilizare:
    ```
    <iso19115File>*fullFileName*</iso19115File>  
    ```
     *complet Denumire fișier* se poate referi la un fișier local (undeva pe sistemul de fișiere al serverului) sau URL-ul unui fișier la distanță.
Dacă *complet Denumire fișier* \\="" sau fișierul nu este găsit, setul de date nu va avea metadate ISO 19115. Acest lucru este util și dacă doriți să suprimați metadatele ISO 19115 pentru un set de date specific.
Sau, puteți pune&lt;izo19115Active&gt;false&lt;/iso19115Active&gt; in setup.xml to tell ERDDAP™ să nu ofere metadate ISO 19115 pentru niciun set de date.
     
#### &lt;MatchAxis NDigits&gt;{#matchaxisndigits} 
* [ ** &lt;MatchAxisNDigits&gt; ** ] (#matchaxisndigits) este o etichetă OPTIONALă în cadrul EDDGrid  &lt;Set de date &gt; etichetă pentru EDDGrid seturile de date care sunt agregari, de exemplu agregarea fișierelor. De fiecare dată când setul de date este reîncărcat, ERDDAP™ verifică dacă valorile axei fiecărei componente a agregării sunt identice. Precizia încercării este determinată de [Potrivire AxisNDigits](#matchaxisndigits) , care specifică numărul total de cifre care trebuie să se potrivească la testarea valorilor axei de precizie dublă, 0 - 18 (implicit) . Atunci când se testează valorile axei floate, încercarea se face cu potrivireAxisNDigits/2 cifre. O valoare de 18 sau mai sus spune EDDGrid pentru a face un test exact. O valoare de 0 spune EDDGrid să nu facă nicio încercare, care nu este recomandată, cu excepția celor descrise mai jos.
    
Deşi... EDDGrid permite componentelor agregării să aibă valori ale axei ușor diferite, doar un set de valori ale axei este indicat utilizatorului. Setul provine din aceeași componentă care furnizează metadatele sursă ale setului de date. De exemplu, EDDGrid Seturi de date din dosare, specificate de către&lt;Setare metadateDe la &gt; (implicit=ultima) .
    
Utilizarea meciuluiAxisNDigits\\0 este puternic descurajată în cele mai multe cazuri, deoarece opreşte toate verificările. Chiar și verificarea minimă este utilă deoarece asigură că componentele sunt potrivite pentru agregare. Cu toţii presupunem că toate componentele sunt potrivite, dar nu este întotdeauna aşa. Prin urmare, acesta este un test de sănătate mintală important. Chiar și valorile meciuluiAxisNDigits1, 2, 3 sau 4 sunt descurajate deoarece diferitele valori ale axei indică adesea faptul că componentele au fost create (Aruncat?) un mod diferit și, prin urmare, nu sunt adecvate pentru agregarea.
    
Există un caz în care utilizarea matchAxisNDigits\\0 este utilă și recomandată: cu agregari de fișiere la distanță, de exemplu, date în găleți S3. În acest caz, în cazul în care setul de date folosește cacheFromurl, cacheSizeGB, meciAxisNDigits\\=0, și EDDGrid Sistem de fișiere pentru [Agregare prin Nume fișiere](#aggregation-via-file-names-or-global-metadata) , atunci EDDGrid nu trebuie să citească toate fișierele de la distanță pentru a face agregarea. Acest lucru permite seturilor de date realizate din datele din găleți S3 pentru a încărca foarte repede (spre deosebire de absurd încet dacă EDDGrid trebuie să descarce și să citească toate fișierele) .
    
#### &lt;nThreads&gt;{#nthreads} 
* Începând cu ERDDAP™ versiunea 2.0, atunci când orice subclasă de EDDTableFromFiles sau EDDGrid citeste date din sursa sa, poate citi o bucata de date (De exemplu, un fișier sursă) pe moment (într-un singur fir)   (Asta e implicit.) sau mai multe bucăți de date (de exemplu, Fișiere sursă 2+) pe moment (în două sau mai multe fire) procesarea fiecărei cereri.
     
    * Regula Thumb:
Pentru majoritatea seturilor de date de pe majoritatea sistemelor, utilizați nThreads=1, implicit. Dacă ai un computer puternic (Multe nuclee de procesor, multe amintiri) , apoi ia în considerare setarea nThreads la 2, 3, 4, sau mai mare (dar niciodată mai mult decât numărul de nuclee CPU în calculator) pentru seturi de date care ar putea beneficia de:
        
        * Cele mai multe seturi de date EDDFromFiles vor beneficia.
        * Seturile de date în care ceva cauzează un decalaj înainte ca o bucată de date să poată fi prelucrate vor beneficia, de exemplu:
            * Setări de date cu [exterioara-comprimat (de exemplu, .gz ) ](#externally-compressed-files) binar (de exemplu, .nc ) fișiere, deoarece ERDDAP™ trebuie să decomprimați întregul fișier înainte de a putea începe să citească fișierul.
            * Setări de date care utilizează [cacheSizeGB](#cachefromurl) , pentru că ERDDAP™ adesea trebuie să descarce fișierul înainte de a-l putea citi.
            * Setări de date cu fișiere de date stocate pe un sistem paralel de fișiere de bandă înaltă, deoarece poate furniza mai multe date, mai repede, atunci când este solicitat. Exemple de sisteme paralele de fișiere includ [JBOD](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures) , [PNFS](http://www.pnfs.com/) , [GlusterFS](https://en.wikipedia.org/wiki/Gluster) , Amazon S3, și Google Cloud Storage.
                 
        
Avertisment: Atunci când utilizați nThreads&gt;1, păstrați un ochi pe ERDDAP Folosirea memoriei, utilizarea firului şi reacţia generală (Vezi? [ ERDDAP Pagina de stare](/docs/server-admin/additional-information#status-page) ) . A se vedea comentariile privind aceste aspecte de mai jos.
         
    * Pentru un anumit set de date, setarea nThreads poate proveni din diferite locuri:
        
        * Dacă datasets.xml bucată pentru un set de date are o&lt;nThreads&gt; tag (în cadrul&lt;Set de date &gt; etichetă, nu ca atribut global) cu o valoare &gt; 1, această valoare a nThreads este utilizată. Deci, puteți specifica un număr diferit pentru fiecare set de date.
        * În caz contrar, dacă datasets.xml are&lt;nTabelThreads&gt; tag (pentru tabelul EDD Seturi de fișiere) sau&lt;nGridThreads&gt; tag (pentru EDDGrid Seturi de date) cu o valoare &gt; 1, în afara unui&lt;Set de date&gt; tag, această valoare a nThreads este utilizată.
        * În caz contrar, se utilizează 1 fir, care este o alegere sigură deoarece utilizează cea mai mică cantitate de memorie.
             
        
Pentru [original ERDDAP™ instalare](https://coastwatch.pfeg.noaa.gov/erddap/index.html) , folosim
        &lt;nTabelThreads&gt; 6&lt;/ntableThreads&gt; (E un server puternic.) Cererile dificile necesită acum 30% din timpul anterior.
         
##### Monitorizează utilizarea resurselor{#monitor-resource-usage} 
Când experimentați cu diferite nThreads setări (și poate face cereri de probă dificile la dvs. ERDDAP ) , puteți monitoriza utilizarea resurselor computerului dumneavoastră:
* Pe Macs, utilizați Finder: Aplicații: Utilități: Monitor de activitate
* On Linux, use top
* Pe Windows 10, utilizați *Ctrl + Shift + Esc* pentru a deschide administratorul de sarcini
             
##### Atenţie: Responsivitate scăzută{#warning-decreased-responsiveness} 
În izolare, ERDDAP™ va îndeplini o cerere la un set de date cu o setare mai mare nThreads mai rapidă decât dacă nThreads=1. Dar în timp ce această cerere este procesată, alte cereri ale altor utilizatori vor fi oarecum aglomerate și vor obține un răspuns mai lent. De asemenea, când ERDDAP™ răspunde unei cereri date, alte resurse de calcul (de exemplu, acces pe disc, lățime de bandă de bandă de rețea) pot fi limitate, în special cu setări nThreads mai mari. Astfel, cu setări mai mari nThreads, responsivitatea globală a sistemului va fi mai rea atunci când există mai multe cereri în curs de procesare -- acest lucru poate fi foarte enervant pentru utilizatori&#33; Din acest motiv: niciodată nu setați nThreads la mai mult de numărul de nuclee CPU în calculator. nThreads=1 este cel mai corect cadru de la fiecare cerere (printre mai multe cereri simultane) va primi o cotă egală din resursele de calcul. Dar cu cât computerul e mai puternic, cu atât va fi mai puţin o problemă.
         
##### Avertisment: memorie mai mare Utilizare pentru EDDGrid Setări de date{#warning-higher-memory-use-for-eddgrid-datasets} 
Utilizarea memoriei în timpul prelucrării cererilor este direct proporțională cu setarea nThreads. O regulă destul de sigură este: trebuie să setați [ ERDDAP setările memoriei](/docs/server-admin/deploy-install#memory) până la cel puțin 2GB + (2GB\\* nThreads) . Unele cereri la unele seturi de date vor avea nevoie de mai multă memorie decât atât. De exemplu, setarea nThreads=3 pentru orice EDDGrid Setul de date înseamnă că setarea -Xmx ar trebui să fie cel puțin -Xmx8000M. În cazul în care setarea memoriei este mai mare de 3/4 memoria fizică a computerului, reduce setarea nThreads astfel încât să puteți reduce setarea memoriei.

Utilizarea memoriei cererilor de procesare a firelor pentru seturi de date EDD Table este aproape întotdeauna mai mică, deoarece fișierele sunt de obicei mult mai mici. Cu toate acestea, în cazul în care un set de date EDD date are imens (De exemplu:) fișierele de date, apoi observațiile de mai sus se vor aplica și acestor seturi de date.

Oricare ar fi setarea nThreads, păstrați un ochi aproape pe statisticile de utilizare a memoriei pe [ ERDDAP Pagina de stare](/docs/server-admin/additional-information#status-page) . Nu ar trebui să te apropii niciodată de maximizarea utilizării memoriei în ERDDAP ; altfel vor exista erori grave și eșecuri.
        
##### Setat temporar la 1{#temporarily-set-to-1} 
În cazul în care utilizarea memoriei curente este chiar ușor mare, ERDDAP™ va stabili nThreads pentru această cerere la 1. Astfel, ERDDAP™ Păstrează memoria atunci când memoria este limitată.
         
##### Întoarcerea diminuării{#diminishing-returns} 
Există mai mici reveniri la creșterea setarea nThreads: 2 fire va fi mult mai bine decât 1 (dacă ignorăm overclocking dinamic) . Dar 3 va fi doar o bucată mai bună decât 2. Și 4 va fi doar marginal mai bine decât 3.

Într-o încercare de interogare dificilă la un set de date EDD Table mare, timpul de răspuns utilizând 1, 2, 3, 4, 5, 6 fire a fost 38, 36, 20, 18, 13, 11 secunde. (Folosim acum ntableThreads=6 pe acel server.) 

nThreads=2: Deși, adesea, există un beneficiu semnificativ pentru a specifica nThreads=2 în loc de nThreads=1, adesea nu va face mare diferență în timpul ceasului necesar pentru a răspunde la cererea unui anumit utilizator. Motivul este: cu nThreads=1, cel mai modern procesor de multe ori [overclock dinamic](https://en.wikipedia.org/wiki/Intel_Turbo_Boost)   (turbo impuls) să crească temporar viteza ceasului procesorului. Astfel, cu nThreads=1, un nucleu va fi adesea de lucru la o viteză a ceasului mai mare decât fiecare dintre cele două nuclee dacă ați folosit nThreads=2. Indiferent, noi încă mai credem că este mai bine să se utilizeze nThreads=2 mai degrabă decât nThreads=1, deoarece acest cadru va avea rezultate mai bune într-o varietate mai largă de situații. Și, desigur, dacă calculatorul are suficiente nuclee CPU, o setare chiar mai mare nThreads ar trebui să producă rezultate mai bune.

După cum s-a discutat mai sus, setările foarte ridicate nThreads pot duce la răspunsuri mai rapide la unele cereri, dar riscul de scădere globală ERDDAP™ responsivitate și utilizare înaltă a memoriei (după cum s-a menționat mai sus) în timp ce aceste cereri sunt procesate înseamnă că în general nu este o idee bună.
        
##### CPU Nuclee{#cpu-cores} 
Nu ar trebui să setați niciodată nThreads la un număr mai mare decât numărul de nuclee CPU în CPU calculatorului. Toate procesoarele moderne au nuclee multiple (de exemplu, 2, 4 sau 8) . Unele calculatoare au chiar multiple procesoare (De exemplu, 2 procesoare \\* 4 nuclee/CPU = 8 nuclee de procesor) . Pentru a afla câte procesoare şi nuclee are un computer:

* Pe Macs, utilizați *Cheia opțiunii* : Meniu Apple: Informaţii de sistem
* Pe Linux, utilizați pisica /proc/cpuinfo
* Pe Windows 10, utilizați *Ctrl + Shift + Esc* de deschis Administrator de sarcini: Performanță (Procesoarele logice arată numărul total de nuclee ale procesorului) 

Da, majoritatea procesoarelor din ziua de azi spun că susţin 2 fire pe miez (prin [hipertensionare](https://en.wikipedia.org/wiki/Hyper-threading) ) , dar cele 2 fire împărtășesc resursele de calcul, așa că nu veți vedea de două ori mai mult decât un procesor sub sarcină grea. De exemplu, un computer cu un procesor cu 4 nuclee poate pretinde să suporte până la 8 fire, dar nu ar trebui să depășească nThreads=4 în care ERDDAP . Amintiți-vă că:

* NThreads setarea în ERDDAP™ este la cerere. ERDDAP™ se ocupă de multe cereri simultan.
*    ERDDAP™ face alte lucruri decât cererile de proces, de exemplu, reîncărcarea seturilor de date.
* Când ERDDAP™ răspunde unei cereri date, alte resurse de calcul (de exemplu, acces pe disc, lățime de bandă de bandă de rețea) poate fi limitată. Cu cât setați nThreads, cu atât mai probabil că aceste alte resurse vor fi epuizate și va încetini ERDDAP Responsivitatea generală.
* Sistemul de operare face alte lucruri decât să ruleze ERDDAP .

Deci, este cel mai bine să nu setați nThreads setarea la mai mult de numărul de nuclee în CPU calculatorului.
         
##### Mileage May Vary (YMMV)  {#your-mileage-may-vary-ymmv} 
Rezultatele diferitelor setări nThreads vor varia foarte mult în cazul diferitelor cereri către seturi de date diferite privind diferite sisteme. Dacă doriți cu adevărat să știți efectul diferitelor nThreads setări, executați teste realiste.
         
##### De ce nThreads pe cerere?{#why-nthreads-per-request} 
Îi aud pe unii dintre voi gândindu-se "De ce nThreads la cerere? Dacă aş codifica asta, aş folosi un bazin permanent de lucru şi o coadă de mesagerie pentru performanţe mai bune." Problema cu utilizarea unui grup de fire de lucru și a unei cozi de mesagerie este că o cerere dificilă ar inunda coada cu numeroase sarcini lente. Asta ar bloca efectiv ERDDAP™ chiar de la începerea lucrărilor privind sarcinile legate de alte cereri până la solicitarea inițială (în esență) Terminat. Astfel, chiar şi simple cereri ulterioare ar răspunde foarte încet. ERDDAP Utilizarea nThreads la cerere duce la o utilizare mult mai echitabilă a resurselor de calcul.
         
##### nThreads vs. Multiple Calculatoare Worker{#nthreads-vs-multiple-worker-computers} 
Din păcate, ERDDAP Sistemul nThreads nu va fi niciodată la fel de eficient ca paralelizarea adevărată prin intermediul mai multor calculatoare muncitoare, fiecare lucrând la o bucată de date, în modul în care Hadoop sau Apache Spark sunt de obicei folosite. Atunci când sarcina este cu adevărat paralelizată/distribuită la mai multe calculatoare, fiecare computer poate utiliza toate resursele sale din partea sa de sarcină. Cu ERDDAP Sistemul nThreads, fiecare dintre fire concurează pentru banda de bandă a aceluiaşi computer, discuri, memorie etc. Din păcate, majoritatea dintre noi nu au resursele sau fondurile pentru a configura sau chiar chirie (pe Amazon Web Services (AWS) sau Google Cloud Platform (GCP) ) grile masive de calculatoare. De asemenea, spre deosebire de o bază de date relațională care este permis să returneze rândurile rezultate în orice ordine, ERDDAP™ face o promisiune de a returna rândurile rezultate într-o ordine consecventă. Această constrângere face ERDDAP NThreads implementare mai puțin eficientă. Dar... ERDDAP NThreads este util în multe cazuri.

Cu toate acestea, există modalități de a face ERDDAP™ scară pentru a gestiona un număr mare de cereri rapid prin crearea unui [grilă/cluster/federație a ERDDAP s](/docs/server-admin/scaling) .
         
#### &lt;palete&gt;{#palettes} 
* Începând cu ERDDAP™ versiunea 2.12, datasets.xml poate include&lt;eticheta palettes&gt; (în interiorul&lt;erddapDatasets&gt;) care suprascrie&lt;palettes &gt; tag-ul valorii de mesaje.xml (sau revine la valoarea de mesaje.xml dacă eticheta în datasets.xml este gol) . Acest lucru vă permite să modificați lista de palete disponibile în timp ce ERDDAP™ Fuge. De asemenea, vă permite să facă o schimbare și au persista atunci când instalați o nouă versiune de ERDDAP .
ATENŢIONARE: Paletele enumerate în datasets.xml trebuie să fie un superset de palete enumerate în mesaje.xml; altfel ERDDAP™ va arunca o excepție și opri prelucrarea datasets.xml . Acest lucru asigură că toate ERDDAP™ instalațiile cel puțin susțin aceleași palete de bază.
ATENŢIONARE: ERDDAP™ verifică dacă fișierele palete specificate în mesaje.xml există de fapt, dar nu verifică fișierele paletă enumerate în datasets.xml . E responsabilitatea ta să te asiguri că dosarele sunt prezente.
    
De asemenea, începând cu ERDDAP™ versiunea 2.12, dacă faceţi un subdosar cu fişiere Cpt în ERDDAP™ directorul de conținut; ERDDAP™ va copia toate fișierele \\*.cpt în acel director în \\[ Tomcat \\] /webapps/erddap/WEB-INF/cptfiles directore de fiecare dată ERDDAP™ Începe. Astfel, dacă ați pus fișiere CPT personalizate în acel director, acele fișiere vor fi utilizate de ERDDAP™ , cu nici un efort suplimentar din partea ta, chiar și atunci când instalați o nouă versiune de ERDDAP .
    
ATENŢIONARE: Dacă adăugaţi palete personalizate ERDDAP™ si tu ai EDDGrid FromErddap and/or EDDtableFromErddap settings in your ERDDAP™ , apoi utilizatorii vor vedea opțiunile de paleta personalizate pe ERDDAP™ Faceți pagini web A Graph, dar dacă utilizatorul încearcă să le folosească, ei vor primi un grafic cu implicit (de obicei Rainbow) Paleta. Asta pentru că imaginea e făcută de telecomandă. ERDDAP™ care nu are paleta personalizată. Singurele soluții acum sunt de a trimite e-mail la distanță ERDDAP™ administrator pentru a adăuga palete personalizate la ta / ea ERDDAP sau e-mail Chris. Ioan la noaa.gov pentru a cere ca paletele să fie adăugate la standardul ERDDAP™ distribuţie.
    
#### &lt;privind schimbarea&gt;{#onchange} 
* [ ** &lt;OnChange&gt; ** ] (#Onchange) este o etichetă OPTIONALĂ în cadrul&lt;Set de date&gt; tag in datasets.xml care specifică o acțiune care va fi efectuată în momentul creării acestui set de date (când ERDDAP™ se reia) și ori de câte ori acest set de date se schimbă în orice mod.
    * În prezent, pentru EDDGrid subclase, orice modificare a metadatelor sau a unei variabile a axei (de exemplu, un nou moment pentru datele în timp aproape real) este considerată o modificare, dar o reîncărcare a setului de date nu este considerată o modificare (de la sine) .
    * În prezent, pentru subclasele de tabele EDD, orice reîncărcare a setului de date este considerată o modificare.
    * În prezent, sunt permise doar două tipuri de acțiuni:
        * "http://"sau "https://"-- Dacă acțiunea începe cu "http://"sau "https://", ERDDAP™ va trimite un HTTP GET cerere la URL-ul specificat. Răspunsul va fi ignorat. De exemplu, URL-ul ar putea spune altor servicii web să facă ceva.
            * Dacă URL-ul are o parte de interogare (după "?") Trebuie să fie deja. [% codificat](https://en.wikipedia.org/wiki/Percent-encoding) . Trebuie să codifici caractere speciale în constrângeri (altele decât "&" inițială și principal '=' în constrângeri) în forma %HH, unde HH este valoarea hexazecimală de 2 cifre a caracterului. De obicei, trebuie doar să convertiți câteva dintre personajele punctuației: % în%25, & în%26, " în% 2;&lt;în% 3C, = în% 3D, &gt; în% 3E, + în% 2B; | în % 7C; \\[ în% 5B; \\] în %5D, spațiu în%20, și converti toate personajele de mai sus #127 în forma lor UTF-8 și apoi la sută codați fiecare octet din forma UTF-8 în formatul %HH (Cere ajutorul unui programator) .
De exemplu, & stationID Nr.
devine & stationID % 3E=% 2241004%22
Codarea procentuală este necesară în general atunci când accesați ERDDAP prin alte programe decât un browser. Navigatorii se ocupă de obicei de codarea ta.
În unele situații, aveți nevoie pentru a coda la sută toate personajele altele decât A-Za-z0-9\\_-&#33;~ ' () \\*, dar încă nu codifică "&" inițială sau principal '=' în constrângeri.
Limbile de programare au instrumente pentru a face acest lucru (de exemplu, a se vedea Java 's [ java.net.URLEncoder ](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html) şi Java Scenariul lui [encodeURIComponent()] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) ) și există
                 [site-uri care codează/decodează procente pentru tine](https://www.url-encode-decode.com/) .
            * De când datasets.xml este un fișier XML, trebuie, de asemenea, să & codați TOATE "&," "&lt;" și "&gt; " în URL ca "&amp; ," "&lt;" și "&gt; " după codificarea la sută.
            * Exemplu: Pentru un URL pe care îl puteți tasta într-un browser ca:
                https://www.company.com/webService?department=R%26D&param2=value2  
Trebuie să specificaţi&lt;onChange&gt; tag via (pe o linie) 
            ```
                <onChange>https://www.company.com/webService?department=R%26D&amp;param2=value2</onChange>
            ```
        * e-mail: -- Dacă acțiunea începe cu "mailto:," ERDDAP™ va trimite un e-mail la adresa de e-mail ulterioară indicând faptul că setul de date a fost actualizat/schimbat.
De exemplu:&lt;onChange&gt;mailto:john.smith@company.com&lt;/onChange&gt; Dacă aveți un motiv bun pentru ERDDAP™ pentru a sprijini un alt tip de acțiune, trimite-ne un e-mail descrie ceea ce vrei.
    * Această etichetă este OPTONAL. Pot fi câte etichete vrei. Utilizați una dintre aceste etichete pentru fiecare acțiune care trebuie efectuată.
    * Aceasta este similară cu ERDDAP e-mail / sistemul de abonament RIL, dar aceste actiuni nu sunt stocate persistent (Adică, acestea sunt stocate numai într-un obiect EDD) .
    * Pentru a elimina un abonament, elimina doar&lt;OnChange&gt; tag. Modificarea va fi notată data viitoare când setul de date va fi reîncărcat.
         
#### &lt;reîncărcareEveryNMinutes&gt;{#reloadeverynminutes} 
* [ ** &lt;reîncărcare Fiecare NMinute &gt; ** ] (#Încarcă fiecare minut) este o etichetă OPTIONALĂ în cadrul&lt;Set de date&gt; tag in datasets.xml dintre aproape toate tipurile de seturi de date care precizează cât de des ar trebui reîncărcat setul de date. De exemplu,
    ```
    <reloadEveryNMinutes>60</reloadEveryNMinutes>
    ```
    * În general, seturi de date care se modifică frecvent (de exemplu, obține fișiere de date noi) trebuie reîncărcată frecvent, de exemplu, la fiecare 60 de minute.
    * Datele care se schimbă rar trebuie reîncărcate rar, de exemplu la fiecare 1440 de minute. (zilnic) sau 10080 minute (săptămânal) .
    * Această etichetă este OPTONAL, dar este recomandată. Implicit este 10080.
    * Un exemplu este:&lt;reîncărcareEveryNMinutes&gt;1440&lt;/Încarcă Fiecare NMinute &gt;
    * Atunci când un set de date este reîncărcat, toate fișierele din *Big ParentDirectory* /cache/ * datasetID * directorul se elimină.
    * Indiferent ce se va întâmpla, un set de date nu va fi încărcat mai des decât&lt;încarcăDateSeturiMinMinute &gt; (implicit = 15) , astfel cum se specifică în [setup.xml](/docs/server-admin/deploy-install#setupxml) . Deci, dacă doriți ca seturile de date să fie reîncărcate foarte frecvent, trebuie să setați atât reîncărcareEveryNMinutes cât și încărcareDatasets MinMinute la valori mici.
    * Nu setați reîncărcareEveryNMinutes la aceeași valoare ca și încărcareDatasets MinMinutes, deoarece timpul scurs este probabil să fie (de exemplu) 14:58 sau 15:02, astfel încât setul de date va fi reîncărcat doar în aproximativ jumătate din reîncărcarea majoră. În loc de asta, foloseşte una mai mică. (de exemplu 10) sau mai mare (de exemplu, 20) reîncărcare Fiecare NMinutes valoare.
    * Indiferent de reîncărcareEveryNMinutes, puteți spune manual ERDDAP™ pentru a reîncărca un set de date specific cât mai curând posibil prin intermediul unei [fișier de pavilion](/docs/server-admin/additional-information#flag) .
    * Pentru programatori curioşi... ERDDAP™ , reîncărcarea tuturor seturilor de date este gestionată de două fire cu un singur scop. Un fir iniţiază o reîncărcare minoră dacă găseşte un fişier de pavilion sau o reîncărcare majoră (care verifică toate setările de date pentru a vedea dacă acestea trebuie reîncărcate) . Celălalt fir reîncărca efectiv seturile de date pe rând. Aceste fire funcționează în fundal, asigurând actualizarea tuturor seturilor de date. Firele care reincarca de fapt pregatesc o noua versiune a unui set de date apoi il schimba in loc (în esenţă înlocuirea vechii versiuni atomice) . Deci este foarte posibil ca urmatoarea secventa de evenimente sa apara (E un lucru bun.) :
        
        1.   ERDDAP™ începe reîncărcarea unui set de date (realizarea unei noi versiuni) în fundal.
        2. Utilizatorul "A" solicită setului de date. ERDDAP™ utilizează versiunea curentă a setului de date pentru a crea răspunsul. (Asta e bine. Nu a existat nici o întârziere pentru utilizator, iar versiunea curentă a setului de date nu ar trebui să fie niciodată foarte vechi.) 
        3.   ERDDAP™ termină crearea noii versiuni reîncărcate a setului de date și a swap-urilor pe acea nouă versiune în producție. Toate cererile noi ulterioare sunt tratate de noua versiune a setului de date. Pentru consistență, cererea utilizatorului A este încă completată de versiunea originală.
        4. Utilizatorul "B" solicită setului de date și ERDDAP™ utilizează noua versiune a setului de date pentru a crea răspunsul.
        5. În cele din urmă, cererile utilizatorului A și ale utilizatorului B sunt completate (Poate. A termină primul, poate B termină primul.) .
        
Aud pe cineva spunând, "Doar două treimi&#33; Ha&#33; E jalnic&#33; El ar trebui să configurați că, astfel încât reîncărcarea seturilor de date utilizează atât de multe fire cât sunt necesare, astfel încât totul se face mai repede și cu puțin sau fără decalaj." Da şi nu. Problema este că încărcarea mai multor seturi de date la un moment dat creează mai multe probleme noi și dificile. Toate trebuie rezolvate sau tratate. Sistemul actual funcționează bine și are probleme de gestionat (de exemplu, potențialul de lag înainte de a fi observat un steag) . (Dacă aveți nevoie de ajutor de gestionare a acestora, a se vedea nostru [secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support) .) Legate [actualizare EveryNMillis](#updateeverynmillis) . sistem funcționează în fire de răspuns, astfel încât poate și nu duce la mai multe seturi de date fiind actualizate (nu reîncărcarea completă) simultan.
##### Proactiv vs. Reactiv{#proactive-vs-reactive} 
 ERDDAP Sistemul de reîncărcare este proactiv -- seturile de date sunt reîncărcate la scurt timp după reîncărcarea lor Fiecare NMinutes timp este de până (Adică, ele devin "vechi," dar niciodată foarte vechi) , indiferent dacă setul de date primește cereri de la utilizatori sau nu. Deci... ERDDAP™ Seturile de date sunt întotdeauna actualizate și gata de utilizare. Acest lucru este în contrast cu abordarea reactivă a THREDS: cererea unui utilizator este ceea ce spune THREDS pentru a verifica dacă un set de date este vechi (poate fi foarte vechi) . Dacă este vechi, TREDDS face utilizatorul să aștepte (de multe ori pentru câteva minute) în timp ce setul de date este reîncărcat.
        
#### &lt;actualizare EveryMillis&gt;{#updateeverynmillis} 
* [ ** &lt;updateEveryNMillis&gt; ** ] (#Update everythingnmillis) este o etichetă OPTIONALĂ în cadrul&lt;Set de date&gt; tag in datasets.xml de anumite tipuri de seturi de date care ajută ERDDAP™ lucrează cu seturi de date care se schimbă foarte frecvent (la fel de des ca aproximativ fiecare secundă) . Spre deosebire de ERDDAP e regulat, proactiv,&lt;reîncărcare Fiecare NMuta &gt;] (#Încarcă fiecare minut) sistem pentru încărcarea completă a fiecărui set de date, acest sistem suplimentar OPTIONAL este reactiv (declanșată de o cerere a utilizatorului) și mai repede pentru că este incremental (doar actualizarea informațiilor care trebuie actualizate) . De exemplu, dacă o cerere a EDDGrid Setul de date din Dap apare mai mult decât numărul specificat de milisecunde de la ultima actualizare; ERDDAP™ va vedea dacă există valori noi pentru stânga (mai întâi, de obicei "time" ) dimensiunea și, dacă da, doar descărcați aceste valori noi înainte de a gestiona cererea utilizatorului. Acest sistem este foarte bun la păstrarea la zi a unui set de date în schimbare rapidă, cu cerințe minime privind sursa de date, dar cu costul de a încetini ușor procesarea unor cereri de utilizator.
    * Pentru a utiliza acest sistem, adăugați (de exemplu) :
        ```
        <updateEveryNMillis>1000</updateEveryNMillis>  
        ```
imediat după&lt;reîncărcareEveryNMinute &gt; etichetă pentru setul de date din datasets.xml . Numărul de milisecunde pe care le specificaţi poate fi la fel de mic ca 1 (pentru a se asigura că setul de date este întotdeauna actualizat) . O valoare de 0 (implicit) sau un număr negativ opreşte sistemul.
    * Datorită naturii lor incrementale, actualizările ar trebui să se termine foarte repede, astfel încât utilizatorii nu ar trebui să aștepte o lungă perioadă de timp.
    * În cazul în care o a doua cerere de date ajunge înainte de finalizarea actualizării anterioare, a doua cerere nu va declanșa o altă actualizare.
    * Pe parcursul documentaţiei, vom încerca să folosim cuvântul "reîncărcare" pentru reîncărcarea regulată, completă a setului de date şi "actualizare" pentru aceste noi actualizări elementare, parţiale.
    * Pentru testare, unele diagnostice sunt tipărite pentru log.txt dacă [&lt;Nivel log&gt;] (#loglevel) în datasets.xml este setat la "toate."
    * Dacă utilizați actualizări incrementale și mai ales dacă cel mai stâng (Prima dată) , de exemplu, timpul, axa este mare, s-ar putea dori să setați&lt;reîncărcareEveryNMinutes&gt; la un număr mai mare (1440?) , astfel încât actualizările fac cea mai mare parte a muncii pentru a menține setul de date la zi, și reîncărcarea completă se fac rar.
    * Notă: acest nou sistem actualizează metadatele (de exemplu, timpul actual\\_range , time\\_coverage\\_end, ...) dar nu declanşează schimbarea (e-mail sau touch URL) sau să schimbe RSS furaj (Poate ar trebui...) .
    * Pentru toate seturile de date care utilizează subclase de [ EDDGrid Din dosare](#eddgridfromfiles) şi [Tabel EDD din dosare](#eddtablefromfiles) :
        *    **ATENŢIONARE:** atunci când adăugați un nou fișier de date la un set de date prin copierea acestuia în directorul care ERDDAP™ Uită-te la, există un pericol care ERDDAP™ va observa fișierul parțial scris; încercați să-l citiți, dar nu pentru că fișierul este incomplet; declara fișierul să fie un fișier "rău" și eliminați-l (temporar) din setul de date.
Pentru a evita acest lucru, noi **RECOMANDĂ PUTERNICĂ** că copiați un fișier nou în director cu un nume temporar (de exemplu, 20150226 .nc Tmp) care nu se potrivește cu fișierul seturilor de date NumeRegex (\\*\\\ .nc ) , apoi redenumi fișierul la numele corect (de exemplu, 20150226 .nc ) . Dacă utilizați această abordare, ERDDAP™ va ignora fișierul temporar și va observa fișierul numit corect numai atunci când este complet și gata să fie utilizat.
        * Dacă modificaţi fişierele de date existente în loc (de exemplu, pentru a adăuga un nou punct de date) ,&lt;updateEveryNMillis&gt; va funcționa bine dacă modificările apar atomic (într-o clipă) și fișierul este întotdeauna un fișier valid. De exemplu, biblioteca netcdf-java permite adăugarea la dimensiunea nelimitată a unui "clasic" .nc fișier v3 pentru a fi făcute atomic.
            &lt;updateEveryNMillis&gt; va funcționa prost dacă fișierul este invalid în timp ce modificările sunt făcute.
        *   &lt;updateEveryNMillis&gt; va funcționa bine pentru seturi de date în cazul în care unul sau câteva fișiere se schimbă într-o perioadă scurtă de timp.
        *   &lt;updateEveryNMillis&gt; va funcționa prost pentru seturi de date în cazul în care un număr mare de fișiere se schimbă într-o perioadă scurtă de timp (cu excepția cazului în care modificările apar atomic) . Pentru aceste seturi de date, este mai bine să nu se utilizeze&lt;updateEveryNMillis&gt; și pentru a stabili o [pavilion](/docs/server-admin/additional-information#set-dataset-flag) pentru a spune ERDDAP™ pentru a reîncărca setul de date.
        *   &lt;updateEveryNMillis&gt; nu actualizează informațiile asociate cu [&lt; subsetVariables &gt;] (#Subsetvariables) . În mod normal, aceasta nu este o problemă, deoarece subsetVariables au informatii despre lucruri care nu se schimba foarte des (de exemplu, lista numelor stațiilor, a latitudinilor și a longitudinei) . Dacă subsetVariables modificări de date (de exemplu, atunci când se adaugă o nouă stație la setul de date) , apoi contactaţi [URL- ul steagului](/docs/server-admin/additional-information#set-dataset-flag) pentru ca setul de date să indice ERDDAP™ pentru a reîncărca setul de date. Altfel, ERDDAP™ nu va observa noul subset Informații variabile până la data viitoare când setul de date este reîncărcat (&lt;ReîncarcăEveryNMinutes&gt;).
        * Recomandarea noastră generică este să folosim:
        ```
            <reloadEveryNMinutes>1440</reloadEveryNMinutes>  
            <updateEveryNMillis>10000</updateEveryNMillis>
        ```
        * Probleme? Pe calculatoare Linux, dacă utilizați&lt;updateEveryNMillis&gt; cu EDDGrid De la Dosare sau EDDTableFromFiles classs, aveți posibilitatea să vedeți o problemă în cazul în care un set de date nu se încarcă (ocazional sau constant) cu mesajul de eroare: "IOException: User limit of inotify instances touch or too many open files." Cauza poate fi un bug în Java care determină neotificarea cazurilor să nu fie colectate gunoiul. Această problemă este evitată în ERDDAP™ V1.66 şi mai sus. Deci, cea mai bună soluție este de a schimba ultima versiune a ERDDAP .
În cazul în care nu rezolvă problema (adică, dacă aveți un număr foarte mare de seturi de date folosind&lt;ActualizațiEveryNMillis&gt;), puteți rezolva această problemă apelând:
            ```
            sudo sysctl fs.inotify.max\\_user\\_watches=65536  
            sudo sysctl fs.inotify.max\\_user\\_instances=1024  
            sudo sysctl -p  
            ```
Sau, folosiţi numere mai mari dacă problema persistă. Implicit pentru ceasuri este 8192. Situația implicită a cazurilor este 128.
    * Poţi pune&lt;updateMaxEvenimente&gt;10&lt;/updateMaxEvenimente&gt; în datasets.xml   (cu celelalte setări lângă partea de sus) pentru a modifica numărul maxim de modificări de fișier (implicit=10) care va fi procesat de sistemul de actualizareEveryNMillis. Un număr mai mare poate fi util pentru seturile de date în cazul în care este foarte important ca acestea să fie întotdeauna actualizate. Vezi [updateMaxEvenimente documentaţie](#updatemaxevents) .
    * Pentru programatori curioși -- aceste actualizări incrementale, spre deosebire de ERDDAP E plin. [reîncarcăEveryNMinutes](#reloadeverynminutes) sistem, apar în cadrul utilizatorului solicita fire. Deci, orice număr de seturi de date pot fi actualizate simultan. Există un cod. (și o blocare) să se asigure că un singur fir lucrează la o actualizare pentru orice set de date dat în orice moment. Permiterea de actualizări simultane multiple a fost ușor; permițând reîncărcari multiple simultane complete ar fi mai greu.
         
#### &lt;sursăCanConstrainStringEQNE&gt;{#sourcecanconstrainstringeqne} 
* [ ** &lt;sursăCanConstrainStringEQNE&gt; ** ] (#sursacanconstrainstreinstreingeqne) este o etichetă OPTIONALĂ în cadrul unui tabel EDD&lt;Set de date&gt; tag in datasets.xml care specifică dacă sursa poate constrânge variabilele String cu operatorii = și &#33;=.
    * Pentru tabelul EDDFromDapSequence, acest lucru se aplică numai variabilelor de string ale secvenței exterioare. Se presupune că sursa nu poate suporta nicio constrângere asupra variabilelor de secvenţă interioară.
    * Această etichetă este OPTONAL. Valorile valide sunt adevărate (implicit) şi fals.
    * Pentru tabelul EDD din DapSequence OPeNDAP Servere DRDS, acest lucru ar trebui să fie setat la adevărat (implicit) .
    * Pentru tabelul EDD din DapSequence Servere Dapper, acest lucru ar trebui să fie setat la fals.
    * Un exemplu este:
```
        <sourceCanConstrainStringEQNE>true</sourceCanConstrainStringEQNE>  
```
         
#### &lt;sursaCanConstrainStringGTLT&gt;{#sourcecanconstrainstringgtlt} 
* [ ** &lt;sursaCanConstrainStringGTLT&gt; ** ] (#Sourcecanconstringgtlt) este o etichetă OPTIONALĂ în cadrul unui tabel EDD&lt;Set de date &gt; eticheta care specifică dacă sursa poate constrânge variabilele String cu&lt;,&lt;A se vedea nota de subsol 1.
    * Pentru tabelul EDDFromDapSequence, acest lucru se aplică numai variabilelor de string ale secvenței exterioare. Se presupune că sursa nu poate suporta nicio constrângere asupra variabilelor de secvenţă interioară.
    * Valorile valide sunt adevărate (implicit) şi fals.
    * Această etichetă este OPTONAL. Implicit este adevărat.
    * Pentru tabelul EDD din DapSequence OPeNDAP Servere DRDS, acest lucru ar trebui să fie setat la adevărat (implicit) .
    * Pentru tabelul EDD din DapSequence Servere Dapper, acest lucru ar trebui să fie setat la fals.
    * Un exemplu este:
```
        <sourceCanConstrainStringGTLT>true</sourceCanConstrainStringGTLT>  
```
         
#### &lt;sursăCanConstrainStringRegex&gt;{#sourcecanconstrainstringregex} 
* [ ** &lt;sursăCanConstrainStringRegex&gt; ** ] (#Sourcecanconstringregex) este o etichetă OPTIONALĂ în cadrul unui tabel EDD&lt;Set de date &gt; etichetă care specifică dacă sursa poate constrânge variabilele String prin expresii regulate și dacă da, ce este operatorul.
    * Valorile valide sunt "=~" (nu DAP standard) , "~=" (Sprijinit greşit de mulţi DAP servere) , sau "" (indică faptul că sursa nu suportă expresii regulate) .
    * Această etichetă este OPTONAL. Implicit este "."
    * Pentru tabelul EDD din DapSequence OPeNDAP Servere DRDS, acest lucru ar trebui să fie setat la "" (implicit) .
    * Pentru tabelul EDD din DapSequence Servere Dapper, acest lucru trebuie setat la "" (implicit) .
    * Un exemplu este:
```
        <sourceCanConstrainStringRegex>=~</sourceCanConstrainStringRegex>  
```
#### &lt;sursa CanDoDistinct&gt;{#sourcecandodistinct} 
* [ ** &lt;sursăCanDoDistinct&gt; ** ] (#Sourcecandodistinct) este o etichetă OPTIONALĂ în cadrul unui tabel EDDFromDatabase&lt;Set de date &gt; eticheta care specifică dacă baza de date sursă ar trebui să se ocupe &distinct () constrângeri în ceea ce privește întrebările utilizatorilor.
    * Această etichetă este OPTONAL. Valorile valabile nu sunt ( ERDDAP™ se ocupă distinct; implicit) , parţial (sursa se ocupă distinct și ERDDAP™ Ma ocup din nou) , și da (sursa se ocupă distinct) .
    * Dacă utilizaţi nu şi ERDDAP™ se scurge din memorie atunci când manipularea distinct, utilizați da.
    * Dacă utilizați da și baza de date sursă se ocupă distinct prea lent, utilizați nr.
    * partial va ofera cel mai rau dintre cele doua: este lent, deoarece baza de date de manipulare a distinct este lent și poate alerga afară de memorie în ERDDAP .
    * Bazele de date interpretează DISTINCT ca o cerere pentru doar rânduri unice de rezultate, în timp ce ERDDAP™ o interpretează ca o cerere pentru o listă sortate de rânduri unice de rezultate. Dacă setați acest lucru la parțial sau da, ERDDAP™ spune automat, de asemenea, baza de date pentru a sorta rezultatele.
    * O mică diferenţă în rezultate:
Cu nu | parţial, ERDDAP™ va sorta "" la începutul rezultatelor (înainte de a nu "" siruri de caractere) .
Cu da, baza de date poate (Postgres va) sortează "" la sfârșitul rezultatelor (după non-""șiruri) .
Voi presupune că acest lucru va afecta, de asemenea, sortarea de cuvinte scurte versus cuvinte mai lungi care încep cu cuvântul scurt. De exemplu, ERDDAP™ va sorta "Simon" înainte de "Simons."
    * Un exemplu este:
```
        <sourceCanDoDistinct>yes</sourceCanDoDistinct>  
```
         
#### &lt;sursaCanderBy&gt;{#sourcecanorderby} 
* [ ** &lt;sursă CanOrderby&gt; ** ] (#Source canorder by) este o etichetă OPTIONALĂ în cadrul unui tabel EDDFromDatabase&lt;Set de date &gt; eticheta care specifică dacă baza de date sursă ar trebui să se ocupe de & orderBy  (...) constrângeri în ceea ce privește întrebările utilizatorilor.
    * Această etichetă este OPTONAL. Valorile valabile nu sunt ( ERDDAP™ mânere orderBy  (...) ; implicit) , parţial (mânerele sursei orderBy şi ERDDAP™ Ma ocup din nou) , și da (mânerele sursei orderBy  (...) ) .
    * Dacă utilizaţi nu şi ERDDAP™ se scurge din memorie atunci când manipularea orderBy  (...) Da.
    * Dacă utilizați da și baza de date sursă se ocupă orderBy  (...) Nu.
    * parţial vă oferă cel mai rău dintre cele două: este lent, deoarece baza de date de manipulare a orderBy  (...) este lent și poate rămâne fără memorie în ERDDAP .
    * O mică diferenţă în rezultate:
Cu nu | parţial, ERDDAP™ va sorta "" la începutul rezultatelor (înainte de a nu "" siruri de caractere) .
Cu da, baza de date poate (Postgres va) sortează "" la sfârșitul rezultatelor (după non-""șiruri) .
Acest lucru poate afecta, de asemenea, sortarea de cuvinte scurte versus cuvinte mai lungi care încep cu cuvântul scurt. De exemplu, ERDDAP™ va sorta "Simon" înainte de "Simons," dar nu sunt sigur cum o bază de date le va sorta.
    * Un exemplu este:
```
        <sourceCanOrderBy>yes</sourceCanOrderBy>  
```
         
#### &lt;sursa NeedsExpandedFP\\_EQ&gt;{#sourceneedsexpandedfp_eq} 
* [ ** &lt;sursaNevoiedeextindereFP\\_EQ&gt; ** ] (#Source needsexpanded fp_eq) este o etichetă OPTIONALĂ în cadrul unui tabel EDD&lt;Set de date &gt; eticheta care specifică (Adevărat. (implicit) sau fals) dacă sursa are nevoie de ajutor la întrebări cu&lt;numeric Variabila &gt; =&lt;plutitorPointValue&gt; (și&#33;=, &gt;&lt;=). De exemplu,
    ```
    <sourceNeedsExpandedFP\\_EQ>false</sourceNeedsExpandedFP\\_EQ>
    ```
    * Pentru unele surse de date, întrebări numerice care implică =, &#33;=,&lt;=, sau &gt; pot să nu funcționeze după cum se dorește cu numere de puncte plutitoare. De exemplu, o căutare de longitudine=220.2 poate să nu funcționeze dacă valoarea este stocată ca 220.20000000000001.
    * Această problemă apare deoarece numerele de puncte plutitoare sunt [nu sunt reprezentate exact în cadrul computerelor](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) .
    * În cazul în care sursaNevoiedeextindereFP\\_EQ este setat la adevărat (implicit) , ERDDAP™ modifică întrebările trimise sursei de date pentru a evita această problemă. Este întotdeauna sigur și bine să lase acest set la adevărat.
         
#### &lt; sourceUrl &gt;{#sourceurl} 
* [ ** &lt; sourceUrl &gt; ** ] (#sourceurl) este o etichetă comună în cadrul unui set de date global&lt; addAttributes &gt; eticheta care specifică URL- ul care este sursa datelor.
    * Un exemplu este:
    ```
        <sourceUrl>https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/VH/chla/1day</sourceUrl>  
    ```
         (dar pune totul pe o linie) 
    * În ERDDAP™ , toate seturile de date vor avea un " sourceUrl " în atributele globale combinate care sunt prezentate utilizatorilor.
    * Pentru majoritatea tipurilor de seturi de date, această etichetă este necesară. A se vedea descrierea tipului de set de date pentru a afla dacă aceasta este necesară sau nu.
    * Pentru anumite seturi de date, separat&lt; sourceUrl &gt; eticheta nu este permisă. În schimb, trebuie să oferi un " sourceUrl " [atribut global](#global-attributes) , de obicei, în global \\ &gt; addAttributes &lt;. Dacă nu există nici un URL sursă reală (de exemplu, dacă datele sunt stocate în fișiere locale) , acest atribut are de multe ori doar o valoare locația, de exemplu,&lt;nume att="name [62] (fișiere locale) &lt;/att&gt;.
    * Pentru majoritatea seturilor de date, aceasta este baza URL-ului care este utilizat pentru a solicita date. De exemplu, DAP servere, acesta este URL-ul la care .dods, .das, .dds, sau .html ar putea fi adăugat.
    * De când datasets.xml este un fișier XML, trebuie, de asemenea, să codați "&," "&lt;" și "&gt; " în URL ca "&amp; ," "&lt;' şi '&gt;'.
    * Pentru majoritatea tipurilor de seturi de date, ERDDAP™ adaugă originalul sourceUrl   ("Sursa locală" în codul sursă) la [atribute globale](#global-attributes)   (unde devine "publicSourceUrl" în codul sursă) . Atunci când sursa de date este fișiere locale, ERDDAP™ adaugă sourceUrl =" (fișiere locale) " atributelor globale ca măsură de precauţie. Când sursa de date este o bază de date, ERDDAP™ adaugă sourceUrl =" (baza de date sursă) " atributelor globale ca măsură de precauţie. Dacă unele seturi de date utilizate nu sunt publice sourceUrl 's (de obicei, deoarece computerul lor este în DMZ sau pe un LAN local) puteți utiliza [&lt;Traducerea şi adaptarea: (#convertto publicsourceurl) etichete pentru a specifica modul de a converti locale sourceUrl s pentru public sourceUrl c.
    * A sourceUrl poate începe cu http:// , https:// , ftp://, și poate alte prefixe. https conexiunile citesc și verifică certificatul digital al sursei pentru a se asigura că sursa este cine spun ei că sunt. În cazuri rare, acest control poate eșua cu eroarea "javax.net.ssl.SSLProtocol Excepție: alertă strângere de mână: nerecunoscut\\_name." Acest lucru se datorează probabil numelui de domeniu de pe certificat care nu corespunde numelui de domeniu pe care îl utilizați. Puteți și ar trebui să citiți detaliile sourceUrl Certificat în browser-ul dvs. web, în special lista de "DNS Name" din secțiunea "Subiect Alternative Name."
        
În unele cazuri, sourceUrl utilizaţi poate fi un alias al numelui de domeniu de pe certificat. De exemplu,
        https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/va arunca această eroare, dar
        https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/, care utilizează numele de domeniu pe certificat, nu va fi. Prin urmare, soluţia în aceste cazuri este găsirea şi utilizarea numelui de domeniu pe certificat. Dacă nu-l puteți găsi pe certificat, contactați furnizorul de date.
        
În alte cazuri, numele de domeniu al certificatului poate fi pentru un grup de nume. Dacă acest lucru se întâmplă sau problema este altfel de nerezolvat, vă rugăm să trimiteți un e-mail Chris. John de la Noaa.gov să raporteze problema.
         

#### &lt;addAttributes&gt; {#addattributes} 
* [ ** &lt; addAttributes &gt; ** ] (#addattributes) este o etichetă OPTIONALă pentru fiecare set de date și pentru fiecare variabilă care permite ERDDAP administratorii controlează atributele metadatelor asociate unui set de date și variabilelor acestuia.
    *    ERDDAP™ combină atributele din sursa setului de date ("sursa Atributes") şi " addAttributes "pe care le definiţi în datasets.xml   (care au prioritate) pentru a face "Attributes combinate," care sunt ceea ce ERDDAP™ utilizatorii văd. Astfel, puteți utiliza addAttributes pentru a redefini valorile surseiAtributes, adăuga noi atribute, sau elimina atributele.
    * ă&lt; addAttributes &gt; eticheta cuprinde 0 sau mai mult ** &lt;att&gt; ** subtag-uri, care sunt utilizate pentru a specifica atributele individuale.
    * Fiecare atribut constă dintr-o denumire și o valoare (care are un tip specific de date, de exemplu dublu) .
    * Nu poate fi doar un singur atribut cu un nume dat. Dacă există mai multe, ultimul are prioritate.
    * Valoarea poate fi o singură valoare sau o listă de valori separate de spațiu.
    * Sintaxă
        * Ordinul&lt;att&gt; subtag-uri în addAttributes Nu e important.
        * ă&lt;format att&gt; subtag este
        ```
            <att name="*name*" \\[type="*type*"\\] >*value*</att>
        ```
        * Numele de destinație al tuturor atributelor TREBUIE să înceapă cu o literă (A-Z, a-z) și TREBUIE să conțină numai caractere A-Z, a-z, 0-9, sau "\\_."
        * Dacă&lt;att&gt; subtag nu are valoare sau valoare nulă, acest atribut va fi eliminat din atributele combinate.
De exemplu,&lt;Att name="rows" /&gt; va elimina rândurile din atributele combinate.
De exemplu,&lt;Att name="coordinations&lt;/att&gt; va elimina coordonatele din atributele combinate.
##### atribut Tip{#attributetype} 
* [Valora de tip OPTIONAL pentru&lt;att&gt; subtags] (#attributetype) indică tipul de date pentru valori. Tipul implicit este String. Un exemplu de atribut String este:
    ```
    <att name="creator\\_name">NASA/GSFC OBPG</att>
    ```
    * Tipurile valabile pentru valori unice sunt octet (Număr întreg de 8 biți) , scurt (Numărul întreg semnat pe 16 biți) , int (Numărul întreg semnat pe 32 biți) , lung (Numărul întreg semnat pe 64 biți) , float (Punct plutitor de 32 biți) , dublu (Punct plutitor de 64 de biți) Char şi String. De exemplu,
        ```
        <att name="scale\\_factor" type="float">0.1</att>
        ```
A se vedea aceste note despre [tipul de date char](#char) .
A se vedea aceste note despre [tip de date lung](#long) .
        
    * Tipuri valabile de liste de valori separate de spațiu (sau valori unice) sunt byteList, shortList, nesemnatShortList, charList, intList, longList, floatList, double Lista. De exemplu,
        ```
        <att name="actual\\_range" type="doubleList">10.34 23.91</att>  
        ```
Un ShortList nesemnat vă permite să specificați o listă de pantaloni scurți nesemnate, dar acestea vor fi convertite într-o listă de caractere Unicode corespunzătoare (de exemplu, "65 67 69" vor fi convertite în "A C E."
Dacă specificați un charList, codați orice caractere speciale (de exemplu, spațiu, citate duble, backslash,&lt;#32, or &gt;#127) as you would code them in the data section of a NCCSV file (de exemplu, "," "\\" sau "," "\\\\\"," " \\n ", "\\u20ac") .
Nu există stringList. Păstraţi valorile String ca o coardă multi-line. De exemplu,
        ```
        <att name="history">2011-08-05T08:55:02Z ATAM - made CF-1.6 compliant.  
        2012-04-08T08:34:58Z ATAM - Changed 'height' from double to float.</att>  
                ```
                 
#### Atribute globale{#global-attributes} 
* [ ** Atribute globale / Global&lt; addAttributes &gt; ** ] (#atribute globale) --
    &lt; addAttributes &gt; este o etichetă OPTONALă în cadrul&lt;Set de date &gt; eticheta utilizată pentru modificarea atributelor care se aplică întregului set de date.
    
    *    ** Utilizați global&lt; addAttributes &gt; modificarea atributelor globale ale setului de date. **  ERDDAP™ combină atributele globale din sursa setului de date (** sursăAtribute **) și global**  addAttributes  **pe care le definiţi în datasets.xml   (care au prioritate) pentru a face global** Atribute combinate ** , care sunt ceea ce ERDDAP™ utilizatorii văd. Astfel, puteți utiliza addAttributes pentru a redefini valorile surseiAtributes, adăuga noi atribute, sau elimina atributele.
    * Vezi ** &lt; addAttributes &gt; **informații] (#addattributes) care se aplică la nivel global și variabil** &lt; addAttributes &gt; ** .
    *    [FGDC](https://www.fgdc.gov/standards/projects/FGDC-standards-projects/metadata/base-metadata/index_html) şi [ISO 19115-2/19139](https://en.wikipedia.org/wiki/Geospatial_metadata) Metadate -- În mod normal, ERDDAP™ va genera automat ISO 19115-2/19139 și FGDC (FGDC-STD-001-1998) Fișiere XML metadate pentru fiecare set de date utilizând informații din metadatele setului de date. Deci, **Metadatele bune ale setului de date duc la rezultate bune ERDDAP -generat ISO 19115 și metadate FGDC. Vă rugăm să luați în considerare punerea mult timp și efort în îmbunătățirea metadatelor seturilor de date (Care este un lucru bun de făcut oricum) .** Majoritatea atributelor metadatelor de set care sunt utilizate pentru a genera metadatele ISO 19115 și FGDC sunt din [Standard de metadate ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) și sunt atât de notate mai jos.
    * Multe atribute globale sunt speciale în acest sens ERDDAP™ le caută şi le foloseşte în diferite moduri. De exemplu, o legătură cu infoUrl este inclus pe paginile web cu liste de seturi de date și alte locuri, astfel încât utilizatorii să poată afla mai multe despre setul de date.
    * Atunci când un utilizator selectează un subset de date, Atribute globale legate de longitudinea variabilei, latitudine, altitudine (sau adâncime) , și intervale de timp (De exemplu, Southernest\\_Northing, Northernmost\\_Northing, time\\_coverage\\_start, time\\_coverage\\_end) sunt generate sau actualizate automat.
    * Un eșantion simplu global&lt; addAttributes &gt; este:
        ```
        <addAttributes> 
          <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>
          <att name="infoUrl">https://coastwatch.pfeg.noaa.gov/infog/PH\\_ssta\\_las.html</att>
          <att name="institution">NOAA CoastWatch, West Coast Node</att>
          <att name="title">SST, Pathfinder Ver 5.0, Day and Night, Global</att>
          <att name="cwhdf\\_version" />
        </addAttributes>  
        ```
Atributul gol cwhdf\\_version cauzează atributul sursă cwdf\\_versiune (dacă este cazul) să fie eliminate din lista de atribute finală, combinată.
    * Furnizarea acestor informaţii ajută ERDDAP™ face o treabă mai bună și ajută utilizatorii să înțeleagă setările de date.
Metadatele bune fac un set de date utilizabil.
Metadate insuficiente fac un set de date inutil.
Vă rugăm să luați timp pentru a face o treabă bună cu atribute metadate.
##### Atribuții globale speciale în ERDDAP™ 
###### recunoaștere{#acknowledgement} 
*    [ **recunoaștere** ](#acknowledgement) şi **recunoașterea**   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard de metadate) este o modalitate RECOMANDATĂ de a recunoaște grupul sau grupurile care au furnizat sprijin (în special, financiar) pentru proiectul care a creat aceste date. De exemplu,
    ```
    <att name="acknowledgment">AVISO</att>
    ```    
Rețineți că ACDD 1.0 și 1.1 au folosit ortografia "achnowledgment" (Care este ortografia obișnuită în SUA) , dar ACDD 1.3 a schimbat acest lucru în "cunoaștere" (Care este ortografia obișnuită în Marea Britanie) . Înțelegerea mea este că schimbarea a fost în esență un accident și că ei cu siguranță nu au recunoscut ramificațiile schimbării. Ce mizerie&#33; Acum sunt milioane de fişiere de date în întreaga lume care au "acunoaştere" şi milioane care au "cunoaştere." Aceasta scoate în evidenţă nebunia schimbărilor "simplu" la un standard şi subliniază necesitatea stabilităţii în standarde. Pentru că ACDD 1.3 (care este versiunea ACDD care ERDDAP™ Suporturi) spune "cunoastere," asta este ceea ce ERDDAP™   (Generează date Xml) încurajează.
     
###### cdm\\_altitudine\\_proxy{#cdm_altitude_proxy} 
*    [ **cdm\\_altitudine\\_proxy** ](#cdm_altitude_proxy) este doar pentru seturi de date EDD Table care nu au o variabilă altitudine sau adâncime, dar nu au o variabilă care este un proxy pentru altitudine sau adâncime (de exemplu, presiune, sigma, flaconNumăr) , puteți utiliza acest atribut pentru a identifica acea variabilă. De exemplu,
    ```
    <att name="cdm\\_altitude\\_proxy">pressure</att>  
    ```
Dacă [cdm\\_date\\_type](#cdm_data_type) este Profil profil sau TraiectorieProfil și nu există nici o variabilă de altitudine sau adâncime, cdm\\_altitudine\\_proxy TREBUIE să fie definit. Dacă cdm\\_altitudine\\_proxy este definit, ERDDAP™ va adăuga următoarele metadate la variabilă: \\_Coordonare AxisType = Înălțime și axă = Z.
     
###### cdm\\_date\\_type{#cdm_data_type} 
*    [ **cdm\\_date\\_type** ](#cdm_data_type)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard de metadate) este un atribut global care indică Unidata   [Model comun de date](https://www.unidata.ucar.edu/software/netcdf-java/v4.6/CDM/index.html) tipul de date pentru setul de date. De exemplu,
    ```
    <att name="cdm\\_data\\_type">Point</att>  
    ```
CDM încă evoluează şi se poate schimba din nou. ERDDAP™ respectă cerințele aferente și mai detaliate [Geometrii de eșantionare discrete (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) capitolul din [CF 1. 6](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) convențiile privind metadatele (A numit anterior Convenția de observare a punctelor CF) .
    * Fie setul de date este global [sursăAtribute](#global-attributes) sau global&lt; addAttributes &gt; TREBUIE să includă atributul cdm\\_date\\_type. Câteva tipuri de seturi de date (cum ar fi tabelul EDD FromObis) va seta asta automat.
    * Pentru EDDGrid Seturile de date, cdm\\_data\\_type opțiuni sunt Grid (implicit și de departe cel mai comun tip pentru EDDGrid Seturi de date) , MovingGrid, Other, Point, Profile, RadialSweep, TimeSeries, TimeSeriesProfile, Swath, Traiectory, and TraiectoryProfile. În prezent, EDDGrid nu necesită specificarea metadatelor aferente și nici nu verifică dacă datele corespund cdm\\_data\\_type. Asta se va schimba probabil în viitorul apropiat.
    * EDDTable folosește cdm\\_data\\_type într-un mod riguros, urmând mai degrabă specificațiile DSG ale CF decât CDM, care din anumite motive nu a fost actualizat pentru a fi în concordanță cu DSG. Dacă metadatele unui set de date nu respectă ERDDAP 's cdm\\_data\\_type's requirements (vezi mai jos) , setul de date nu va încărca și va genera un [mesaj de eroare](#troubleshooting-tips) . (Acesta este un lucru bun, în sensul că mesajul de eroare vă va spune ce este greșit, astfel încât să puteți repara.) Și dacă datele setului de date nu corespund cu configurarea metadatelor setului de date (De exemplu, în cazul în care există mai mult de o valoare de latitudine pentru o anumită stație într-un set de date timeseries) , unele cereri de date vor returna date incorecte în răspuns. Asigură-te că înţelegi bine.
        
Pentru toate aceste seturi de date, în convenţii şi Metadata\\_Conventions atribute globale, vă rugăm să consultați CF-1.6. (nu CF-1,0, 1,1, 1,2, 1,3, 1,4 sau 1,5) , deoarece CF-1.6 este prima versiune care include modificările legate de Geometria de eșantionare Discrete (DSG) Convenţii.
        *   ** ERDDAP™ nu are o relație simplă cu CF DSG** 
        *    ERDDAP™ poate face un set de date DSG valid dintr-un set de date sursă care este deja un fișier DSG valabil (s) , sau dintr-un set de date sursă care nu este înființat pentru DSG, dar poate fi făcut astfel prin modificări ale metadatelor (unele dintre care sunt ERDDAP -specifică pentru a oferi o abordare mai generală pentru a specifica structura DSG) .
        *    ERDDAP™ efectuează o mulțime de teste de valabilitate atunci când încarcă un set de date. Dacă setul de date care are cdm\\_date\\_type (sau featureType ) atribuie sarcini cu succes în ERDDAP™ , atunci ERDDAP™ spune că setul de date îndeplinește cerințele DSG (în caz contrar, ERDDAP™ va arunca o excepție explicând prima problemă pe care a găsit-o) .
ATENŢIONARE: Un set de date încărcat cu succes pare să îndeplinească cerinţele DSG (are combinaţia corectă de atribute) , dar încă pot fi stabilite incorect, ceea ce duce la rezultate incorecte în .nc CF și .nc Fișierele de răspuns CFMA. (Software-ul este inteligent în unele moduri și clueless în altele.) 
        * Când te uiți la metadatele setului de date în ERDDAP™ , Setul de date DSG pare a fi în ERDDAP Formatul intern (o masă gigantică, ca o bază de date) . Nu este într-unul din formatele DSG (De exemplu, dimensiunile și metadatele nu sunt corecte) , dar informațiile necesare pentru a trata setul de date ca un set de date DSG se află în metadate (de exemplu, cdm\\_data\\_type=TimeSeries and cdm\\_timeseries\\_variables= *aCsvListOfStationVarables* în metadatele globale și cf\\_role=timpuri\\_id pentru unele variabile) .
        * Dacă un utilizator solicită un subset al setului de date în a .nc CF (a .nc fișier în format de fișier Contiguous Ragged Array DSG) sau .nc Fișier CFMA (a .nc fișier în format de fișiere multidimensionale DSG) , acel fișier va fi un fișier DSG CF valid.
ATENŢIONARE: Cu toate acestea, dacă setul de date a fost creat incorect (astfel încât promisiunile făcute de metadate nu sunt adevărate) , atunci fișierul de răspuns va fi valabil din punct de vedere tehnic, dar va fi incorect într-un fel.
             
###### EDD Tabel cdm_tipuri de date
* Pentru seturile de date ale tabelului EDD, opțiunile cdm\\_data\\_type (și cerințele aferente în ERDDAP ) sunt
###### Punct{#point} 
*    [Punct](#point) - este pentru un set de măsurători efectuate în momente și locații fără legătură.
    * Ca și în cazul tuturor cdm\\_datelor\\_tipuri, altele decât altele, seturi de date punct trebuie să aibă longitudine, latitudine și variabile temporale.
###### Profil{#profile} 
*    [Profil](#profile) - este un set de masuratori toate luate la un moment dat, la o locatie longitudine latitudine, dar la mai mult de o adâncime (sau altitudine) . Setul de date poate fi o colecție a acestor profiluri, de exemplu, 7 profiluri din diferite locații. Acest cdm\\_data\\_type nu implică nici o legătură logică între oricare dintre profiluri.
    
* Una dintre variabile (de exemplu, profil\\_număr) TREBUIE să aibă atributul variabil cf\\_role=profil\\_id pentru a identifica variabila care identifică în mod unic profilurile.
    ```
    <att name="cf\\_role">profile\\_id</att>  
    ```
Dacă nicio altă variabilă nu este adecvată, ia în considerare utilizarea variabilei de timp.
###### cdm\\_profil\\_variabile{#cdm_profile_variables} 
* Setul de date trebuie să includă Atributul global [cdm\\_profil\\_variabile](#cdm_profile_variables) , în cazul în care valoarea este o listă separată de virgulă a variabilelor care au informații despre fiecare profil. Pentru un anumit profil, valorile acestor variabile trebuie să fie constante. De exemplu,
    ```
    <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
    ```
Lista TREBUIE să includă variabila cf\\_rol=profil\\_id și toate celelalte variabile cu informații despre profil, timp, latitudine și longitudine.
Lista nu va include niciodată altitudine, adâncime, sau orice variabile de observare.
     

 \\[ Aviz: cdm\\_data\\_type=Profile ar trebui rareori utilizat. În practică, un set de date dat este, de obicei, fie un TimesSeriesProfile (profile în poziție fixă) sau un fişier Traiectorial (profile pe o traiectorie) , și astfel ar trebui să fie identificate în mod corespunzător ca atare. \\]   
###### TimeSeries{#timeseries} 
*    [TimeSeries](#timeseries) - este o secvenţă de măsurători (De exemplu, temperatura apei de mare) luate la unu, fix, latitudine, longitudine, adâncime (sau altitudine) locaţia. (Gândeşte-te că e "staţie.") Setul de date poate fi o colecție a acestor serii temporale, de exemplu, o secvență din fiecare 3 locații diferite.
    * Una dintre variabile (De exemplu, stație\\_id) TREBUIE să aibă atributul variabil cf\\_rol=timeseries\\_id pentru a identifica variabila care identifică în mod unic stațiile.
        ```
        <att name="cf\\_role">timeseries\\_id</att>
        ```
###### cdm\\_timeseries\\_variabile{#cdm_timeseries_variables} 
* Setul de date trebuie să includă Atributul global [cdm\\_timeseries\\_variabile](#cdm_timeseries_variables) , în cazul în care valoarea este o listă separată de virgulă a variabilelor care au informații despre fiecare stație. Pentru o anumită stație, valorile acestor variabile trebuie să fie constante. De exemplu,
    ```
    <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
    ```
Lista TREBUIE să includă cf\\_rolul=timpuri\\_id variabile și toate celelalte variabile cu informații despre stație, care include aproape întotdeauna latitudine și longitudinea (și altitudine sau adâncime, dacă sunt prezente) .
Lista nu va include niciodată timp sau orice variabile de observare.
* Pentru unele geamanduri ancorate, un set de date poate avea două seturi de variabile de latitudine și longitudine:
    1. O pereche de valori latitudine și longitudine care sunt constante (și anume, locul fix al acostării) . În ERDDAP™ , da aceste variabile destinationName s de latitudine și longitudine și include aceste variabile în lista cdm\\_timeseries\\_variabile.
    2. Valori precise de latitudine și longitudine asociate cu fiecare observație. În ERDDAP™ , da aceste variabile diferite destinationName s (De exemplu, precisLat și precis Lon) și nu include aceste variabile în lista cdm\\_timeseries\\_variabile.
Motivul pentru aceasta este: dintr-o perspectivă teoretică, pentru un set de date DSG TimeSeries, latitudinea și longitudinea (și altitudine sau adâncime, dacă sunt prezente) Locaţia staţiei trebuie să fie constantă.
###### TimeSeriesProfile{#timeseriesprofile} 
*    [TimeSeriesProfile](#timeseriesprofile) -- este pentru o secventa de profile luate la unul, fix, longitudine locatia. Fiecare profil este un set de măsurători luate la mai multe altitudini sau adâncimi. Setul de date poate fi o colecție a acestor fișiere TimeSeries, de exemplu, o secvență de profiluri luate în fiecare din 12 locații diferite.
    * Una dintre variabile (De exemplu, stație\\_id) TREBUIE să aibă atributul variabil cf\\_rol=timeseries\\_id pentru a identifica variabila care identifică în mod unic stațiile.
    ```
        <att name="cf\\_role">timeseries\\_id</att>
    ```
    * Una dintre variabile (de exemplu, profil\\_număr) TREBUIE să aibă atributul variabil cf\\_role=profil\\_id pentru a identifica variabila care identifică în mod unic profilurile.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Un profil dat\\_id trebuie să fie unic doar pentru un anumit timesries\\_id.) Dacă nicio altă variabilă nu este adecvată, ia în considerare utilizarea variabilei de timp.
    * Setul de date trebuie să includă globalAttribute cdm\\_timeseries\\_variabile, în cazul în care valoarea este o listă separată de virgulă a variabilelor care au informații despre fiecare stație. Pentru o anumită stație, valorile acestor variabile trebuie să fie constante. De exemplu,
        ```
        <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
        ```
Lista TREBUIE să includă cf\\_role=timpuri\\_id variabile și toate celelalte variabile cu informații despre stație, care include aproape întotdeauna latitudine și longitudine.
Lista nu va include niciodată timp, altitudine, adâncime, sau orice variabile de observare.
    * Setul de date trebuie să includă globalAttribute cdm\\_profil\\_variabile, în cazul în care valoarea este o listă separată de virgulă a variabilelor care au informații despre fiecare profil. Pentru un anumit profil, valorile acestor variabile trebuie să fie constante. De exemplu,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time</att>
        ```
Lista TREBUIE să includă variabila cf\\_rol=profil\\_id și toate celelalte variabile cu informații despre profil, care include aproape întotdeauna timp.
Lista nu va include niciodată latitudine, longitudine, altitudine, adâncime sau orice variabile de observare.
###### Traiectorie{#trajectory} 
*    [Traiectorie](#trajectory) - este o secventa de masuratori luate de-a lungul unei traiectorie (o cale prin spaţiu şi timp)   (De exemplu, mare\\_apă\\_temperatura luată de o navă pe măsură ce trece prin apă) . Setul de date poate fi o colecție a acestor Traiectorii, de exemplu, o secvență de la fiecare 4 nave diferite.
    * Una dintre variabile (De exemplu, nava\\_id) TREBUIE să aibă atributul cf\\_rol=traiectorie\\_id pentru a identifica variabila care identifică în mod unic traiectoriile.
        ```  
        <att name="cf\\_role">trajectory\\_id</att>
        ```
###### cdm\\_traiectorie\\_variabile{#cdm_trajectory_variables} 
* Setul de date trebuie să includă Atributul global [cdm\\_traiectorie\\_variabile](#cdm_trajectory_variables) , unde valoarea este o listă separată de virgulă a variabilelor care au informații despre fiecare traiectorie. Pentru o anumită traiectorie, valorile acestor variabile trebuie să fie constante. De exemplu,
    ```
    <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
    ```
Lista TREBUIE să includă variabila cf\\_rol=traiectorie\\_id și toate celelalte variabile cu informații despre traiectorie.
Lista nu va include niciodată timp, latitudine, longitudine sau orice variabile de observare.
###### Dosar Traiectorie{#trajectoryprofile} 
*    [Dosar Traiectorie](#trajectoryprofile) -- este o secventa de profile luate de-a lungul unei traiectorie. Setul de date poate fi o colecție a acestor fișiere Traiectoriale, de exemplu, o secvență de profiluri luate de 14 nave diferite.
    * Una dintre variabile (De exemplu, nava\\_id) TREBUIE să aibă atributul variabil cf\\_rol=traiectorie\\_id pentru a identifica variabila care identifică în mod unic traiectoriile.
        ``` 
        <att name="cf\\_role">trajectory\\_id</att>
        ```
    * Una dintre variabile (de exemplu, profil\\_număr) TREBUIE să aibă atributul variabil cf\\_role=profil\\_id pentru a identifica variabila care identifică în mod unic profilurile.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Un profil dat\\_id trebuie să fie unic doar pentru o anumită traiectorie\\_id.) Dacă nicio altă variabilă nu este adecvată, ia în considerare utilizarea variabilei de timp.
    * Setul de date trebuie să includă globalAttribute cdm\\_traiectorie\\_variabile, în cazul în care valoarea este o listă separată de virgulă a variabilelor care au informații despre fiecare traiectorie. Pentru o anumită traiectorie, valorile acestor variabile trebuie să fie constante. De exemplu,
        ```
        <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
        ```
Lista TREBUIE să includă variabila cf\\_rol=traiectorie\\_id și toate celelalte variabile cu informații despre traiectorie.
Lista nu va include niciodată variabile legate de profil, timp, latitudine, longitudine sau orice variabile de observare.
    * Setul de date trebuie să includă globalAttribute cdm\\_profil\\_variabile, în cazul în care valoarea este o listă separată de virgulă a variabilelor care au informații despre fiecare profil. Pentru un anumit profil, valorile acestor variabile trebuie să fie constante. De exemplu,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
        ```
Lista TREBUIE să includă variabila cf\\_rol=profil\\_id și toate celelalte variabile cu informații despre profil, care include aproape întotdeauna timp, latitudine și longitudine.
Lista nu va include niciodată altitudine, adâncime, sau orice variabile de observare.
###### Altele{#other} 
*    [Altele](#other) - nu are cerinţe. Utilizați-l dacă setul de date nu corespunde uneia dintre celelalte opțiuni, în special în cazul în care setul de date nu include latitudinea, longitudinea și variabilele temporale.
     
###### Note conexe{#related-notes} 
* Toate seturile de date ale tabelului EDD cu un cdm\\_data\\_tip, altele decât "Alte" TREBUIE să aibă longitudine, latitudine și variabile temporale.
* Seturile de date cu profile TREBUIE să aibă o variabilă de altitudine, o variabilă de adâncime sau un [cdm\\_altitudine\\_proxy](#cdm_altitude_proxy) variabilă.
* Dacă nu puteți face un set de date să respecte toate cerințele pentru cdm\\_datele ideale\\_type, utilizați "Point" (care are puține cerințe) sau "altele" (care nu are cerințe) În schimb.
* Aceste informații sunt utilizate de ERDDAP™ în diferite moduri, de exemplu, dar mai ales pentru a face .nc Fișiere CF ( .nc fișiere care respectă Reprezentanțele Contiguous Ragged Array asociate cu cdm\\_data\\_type) şi .nc Fișiere CFMA ( .nc fișiere care respectă Reprezentanțele Array multidimensionale asociate cdm\\_data\\_type) aşa cum este definit în [Geometrii de eșantionare discrete (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) capitolul din [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) convențiile privind metadatele, care au fost denumite anterior "Convențiile de observare a punctelor de control al FC."
* Indiciu: Pentru aceste seturi de date, setarea corectă pentru [ subsetVariables ](#subsetvariables) este, de obicei, combinația dintre toate variabilele enumerate în atributele cdm\\...\\_variabile. De exemplu, pentru TimeSeriesProfile, utilizați cdm\\_timeseries\\_variabile plus cdm\\_profil\\_variabile.
######  contributor\\_name  {#contributor_name} 
*    [ ** contributor\\_name ** ](#contributor_name)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard de metadate) este modalitatea RECOMANDATĂ de a identifica o persoană, o organizație sau un proiect care a contribuit la acest set de date (de exemplu, creatorul original al datelor, înainte de a fi reprelucrat de creatorul acestui set de date) . De exemplu,
    ```
        <att name="contributor\\_name">NOAA OceanWatch - Central Pacific</att>  
    ```
Dacă "contributor" nu se aplică într-adevăr unui set de date, omite acest atribut. Comparativ cu [ creator\\_name ](#creator_name) , acest lucru este uneori mai concentrat pe sursa de finanțare.
######  contributor\\_role  {#contributor_role} 
*    [ ** contributor\\_role ** ](#contributor_role)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard de metadate) este modalitatea RECOMANDATĂ de a identifica rolul [ contributor\\_name ](#creator_name) . De exemplu,
    ```
        <att name="contributor\\_role">Source of Level 2b data</att>  
    ```
Dacă "contributor" nu se aplică într-adevăr unui set de date, omite acest atribut.
###### Convenții{#conventions} 
*    [ **Convenții** ](#conventions)   (de la [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) standard de metadate) este modificat în mod puternic. (Acesta poate fi solicitat în viitor.) Valoarea este o listă separată de standarde de metadate care urmează acestui set de date. De exemplu:
    ```
    <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
    ```
Convențiile comune privind metadatele utilizate în ERDDAP™ sunt:
    
    *    [ COARDS Convenții](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) este precursorul CF.
    *    [Climă și prognoze (CF) Convenții](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) este sursa multor atribute recomandate și necesare în ERDDAP . Versiunea actuală a CF este identificată ca fiind "CF-1.6.."
    * ă NetCDF Atribuie Convenția pentru descoperirea datelor (ACDD) este sursa multor atribute recomandate și necesare în ERDDAP . Versiunea originală 1.0 a ACDD (O lucrare genială de Ethan Davis) , a fost identificat ca [ Unidata Dataset Discovery v1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1) Actualul (începând din 2015) 1.3 Versiunea ACDD este identificată ca [ACDD- 1, 3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) . Dacă seturile de date au fost utilizate Unidata Dataset Discovery v1.0, vă încurajăm să [comutați seturile de date pentru a utiliza ACDD-1.3](#switch-to-acdd-13) .
    
Dacă setul dumneavoastră de date urmează un standard suplimentar de metadate, vă rugăm să adăugați numele în lista CSV din atributul Convențiilor.
######  coverage\\_content\\_type  {#coverage_content_type} 
*    [ ** coverage\\_content\\_type ** ](#coverage_content_type)   (de la [ISO 19115](https://en.wikipedia.org/wiki/Geospatial_metadata) standard de metadate) este modalitatea RECOMANDATĂ de identificare a tipului de date în rețea (în EDDGrid Seturi de date) . De exemplu,
    ```
    <att name="coverage\\_content\\_type">modelResult</att>  
    ```
Singurele valori permise sunt informaţii auxiliare, imagine, modelResult, fizice Măsurători (implicit atunci când se generează metadatele ISO 19115) , informații de calitate, informații de referință și Classificare tematică. (Nu utilizaţi această etichetă pentru seturi de date EDD Table.)   
######  creator\\_name  {#creator_name} 
*    [ ** creator\\_name ** ](#creator_name)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard de metadate) este modalitatea RECOMANDATĂ de a identifica persoana, organizația sau proiectul (dacă nu o anumită persoană sau organizație) , cel mai responsabil pentru crearea (sau cea mai recentă reprelucrare) a acestor date. De exemplu,
    ```
    <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
    ```
Dacă datele au fost reprocesate pe scară largă (de exemplu, date prin satelit de la nivelul 2 la nivelul 3 sau 4) , apoi, de obicei, reprocesorul este listat ca creator și creatorul original este listat prin [ contributor\\_name ](#contributor_name) . Comparativ cu [proiect](#project) , acest lucru este mai flexibil, deoarece poate identifica o persoană, o organizație, sau un proiect.
######  creator\\_email  {#creator_email} 
*    [ ** creator\\_email ** ](#creator_email)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard de metadate) este modalitatea RECOMANDATĂ de identificare a unei adrese de email (formatat corect) care oferă o modalitate de a contacta creatorul. De exemplu,
    ```
    <att name="creator\\_email">erd.data@noaa.gov</att>  
    ```
######  creator\\_url  {#creator_url} 
*    [ ** creator\\_url ** ](#creator_url)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard de metadate) este modalitatea RECOMANDATĂ de a identifica un URL pentru organizația care a creat setul de date sau un URL cu informațiile creatorului despre acest set de date (dar acesta este mai mult scopul [ infoUrl ](#infourl) ) . De exemplu,
    ```
    <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
    ```
######  date\\_created  {#date_created} 
*    [ ** date\\_created ** ](#date_created)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard de metadate) este modalitatea RECOMANDATĂ de identificare a datei la care au fost create datele (de exemplu, prelucrate în această formă) , în format ISO 8601. De exemplu,
    ```
    <att name="date\\_created">2010-01-30</att>  
    ```
Dacă datele sunt adăugate periodic la setul de date, aceasta este prima dată când au fost puse la dispoziție datele originale.
######  date\\_modified  {#date_modified} 
*    [ ** date\\_modified ** ](#date_modified)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard de metadate) este modalitatea RECOMANDATĂ de identificare a datei la care datele au fost modificate ultima dată (de exemplu, atunci când a fost stabilită o eroare sau când au fost adăugate cele mai recente date) , în format ISO 8601. De exemplu,
    ```
    <att name="date\\_modified">2012-03-15</att>  
    ```
######  date\\_issued  {#date_issued} 
*    [ ** date\\_issued ** ](#date_issued)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard de metadate) este modalitatea RECOMANDATĂ de a identifica data la care datele au fost puse pentru prima dată la dispoziția altora, în format ISO 8601, de exemplu 2012-03-15. De exemplu,
    ```
    <att name="date\\_issued">2010-07-30</att>  
    ```
De exemplu, setul de date poate avea un [ date\\_created ](#date_created) din 2010-01-30, dar a fost pus la dispoziția publicului numai 2010-07-30. date\\_issued este mai puţin frecvent utilizat decât date\\_created şi date\\_modified . Dacă date\\_issued este omisă, se presupune că este aceeași cu date\\_created .
###### global drawLandMask  {#global-drawlandmask} 
*    [ ** drawLandMask ** ](#global-drawlandmask) -- Acesta este un atribut OPTIONAL global utilizat de ERDDAP™   (și fără standarde de metadate) care specifică valoarea implicită a opțiunii "Masca de teren brut" pe formularul Make A Graph al setului de date ( * datasetID * .graph) și pentru parametrul de teren într-un URL care solicită o hartă a datelor. De exemplu,
    ```
    <att name="drawLandMask">over</att>  
    ```
Vezi [ drawLandMask prezentare generală](#drawlandmask) .
######  featureType  {#featuretype} 
*    [ ** featureType ** ](#featuretype)   (de la [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) standard de metadate) este IGNORAT și/sau REPLACED. Dacă setul de date este [cdm\\_date\\_type](#cdm_data_type) este adecvat, ERDDAP™ va utiliza automat pentru a crea un featureType atribut. Deci nu e nevoie să-l adaugi.
    
Totuşi, dacă utilizaţi [Tabel EDD din NCFFile](#eddtablefromnccffiles) crearea unui set de date din fișierele care urmează [CF Geometrii de eșantionare discrete (DSG) standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) , fișierele în sine trebuie să aibă featureType definit corect, astfel încât ERDDAP™ poate citi corect fișierele. Aceasta face parte din cerințele CF DSG pentru acest tip de fișier.
     
###### istoric{#history} 
*    [ **istoric** ](#history)   (de la [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) şi [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standarde privind metadatele) este un atribut global de string multiline RECOMANDAT cu o linie pentru fiecare etapă de prelucrare pe care au fost supuse datele. De exemplu,
    ```
    <att name="history">2011-08-05T08:55:02Z CMOR: Rewrote data to comply with CF standards.  
    2012-04-08T08:34:58Z CMOR: Converted 'height' type from 'd' to 'f'.</att>
    ```
    * În mod ideal, fiecare linie are un ISO 8601:2004 (E) Data formatării+timeZ (De exemplu, 2011-08-05T08:55:02Z) urmată de o descriere a etapei de prelucrare.
    *    ERDDAP™ creează asta dacă nu există deja.
    * Dacă există deja, ERDDAP™ va adăuga noi informații la informațiile existente.
    * Istoria este importantă pentru că permite clienților să se întoarcă la sursa originală a datelor.
######  infoUrl  {#infourl} 
*    [ ** infoUrl ** ](#infourl) este un atribut global REquired cu URL-ul unei pagini web cu mai multe informații despre acest set de date (de obicei pe site-ul instituției-sursă) . De exemplu,
    ```
    <att name="infoUrl">http://www.globec.org/</att>
    ```
    * Fie setul de date este global [sursăAtribute](#global-attributes) sau global&lt; addAttributes &gt; TREBUIE să includă acest atribut.
    *    infoUrl este important pentru că permite clienților să afle mai multe despre datele din sursa originală.
    *    ERDDAP™ afișează un link către infoUrl privind formularul de acces la date al setului de date ( * datasetID * .html) Faceți o pagină web grafică ( * datasetID * .graph) , și alte pagini web.
    * Dacă URL-ul are o parte de interogare (după "?") Trebuie să fie deja. [% codificat](https://en.wikipedia.org/wiki/Percent-encoding) . Trebuie să codifici caractere speciale în constrângeri (altele decât "&" inițială și principal '=' , dacă există) în forma %HH, unde HH este valoarea hexazecimală de 2 cifre a caracterului. De obicei, trebuie doar să convertiți câteva dintre personajele punctuației: % în%25, & în%26, " în% 2;&lt;în% 3C, = în% 3D, &gt; în% 3E, + în% 2B; | în % 7C; \\[ în% 5B; \\] în %5D, spațiu în%20, și converti toate personajele de mai sus #127 în forma lor UTF-8 și apoi la sută codați fiecare octet din forma UTF-8 în formatul %HH (Cere ajutorul unui programator) .
De exemplu, & stationID Nr.
devine & stationID % 3E=% 2241004%22
Codarea procentuală este necesară în general atunci când accesați ERDDAP prin alte programe decât un browser. Navigatorii se ocupă de obicei de codarea ta.
În unele situații, aveți nevoie pentru a coda la sută toate personajele altele decât A-Za-z0-9\\_-&#33;~ ' () \\*, dar încă nu codifică "&" inițială sau principal '=' .
Limbile de programare au instrumente pentru a face acest lucru (de exemplu, a se vedea Java 's [ java.net.URLEncoder ](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)   
şi Java Scenariul lui [encodeURIComponent()] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) ) și există
         [site-uri care codează/decodează procente pentru tine](https://www.url-encode-decode.com/) .
    * De când datasets.xml este un fișier XML, trebuie, de asemenea, să & codați TOATE "&," "&lt;" și "&gt; " în URL ca "&amp; ," "&lt;" și "&gt; " după codificarea la sută.
    *    infoUrl este unică ERDDAP . Nu este de la nici un standard de metadate.
###### instituție{#institution} 
*    [ **instituție** ](#institution)   (de la [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) şi [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standarde privind metadatele) este un atribut global REquired cu versiunea scurtă a denumirii instituției care este sursa acestor date (de obicei un acronim, de obicei&lt;20 de caractere). De exemplu,
    ```
    <att name="institution">NASA GSFC</att>
    ```
    * Fie setul de date este global [sursăAtribute](#global-attributes) sau global&lt; addAttributes &gt; TREBUIE să includă acest atribut.
    *    ERDDAP™ afișează instituția ori de câte ori prezintă o listă de seturi de date. Dacă aici numele unei instituții este mai mare de 20 de caractere, numai primele 20 de caractere vor fi vizibile în lista seturilor de date (dar întreaga instituție poate fi văzută prin punerea cursorului mouse-ului peste pictograma adiacentă "?) .
    * Dacă adăugați instituția la lista de&lt; categoryAttributes &gt; în ERDDAP 's [setup.xml](/docs/server-admin/deploy-install#setupxml) fișier, utilizatorii pot găsi cu ușurință seturi de date de la aceeași instituție prin intermediul ERDDAP 's "Caută date pe categorii" pe pagina principală.
###### Cuvinte cheie{#keywords} 
*    [ **Cuvinte cheie** ](#keywords)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard de metadate) este o listă separată de cuvinte și fraze scurte RECOMANDATE (de exemplu, [GCMD Cuvinte cheie pentru știință](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Access) ) care descriu setul de date într-un mod general și care nu presupun nicio altă cunoaștere a setului de date (de exemplu, pentru datele oceanografice, include oceanul) . De exemplu,
    ```
    <att name="keywords">ano, circulation, coastwatch, currents, derived, Earth Science &gt; Oceans &gt; Ocean Circulation &gt; Ocean Currents, eastward, eastward\\_sea\\_water\\_velocity, experimental, hf radio, meridional, noaa, northward, northward\\_sea\\_water\\_velocity, nuevo, ocean, oceans, radio, radio-derived, scan, sea, seawater, velocity, water, zonal</att>  
    ```
De când datasets.xml este un document XML, caracterele &;&lt;, și &gt; într-un atribut ca cuvinte cheie (De exemplu, &gt; caractere în cuvinte cheie ale științei GCMD) trebuie codificat ca &amp;;&lt;, și &gt;, respectiv.
Atunci când un set de date este încărcat ERDDAP ,
    
    * "Earth Science &gt; " se adaugă la începutul oricărui cuvânt cheie GCMD care îi lipseşte.
    * Cuvinte cheie GCMD sunt convertite în Case titlu (Adică primele litere sunt capitalizate) .
    * Cuvintele cheie sunt rearanjate în ordine sortate și orice caractere de linie nouă sunt eliminate.
     
######  keywords\\_vocabulary  {#keywords_vocabulary} 
*    [ ** keywords\\_vocabulary ** ](#keywords_vocabulary)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard de metadate) este un atribut RECOMANDAT: dacă urmați un ghid pentru cuvintele/frazele din atributul cuvinte cheie (De exemplu, GCMD Science Keywords) Pune numele ghidului aici. De exemplu,
    ```
    <att name="keywords\\_vocabulary">GCMD Science Keywords</att>  
    ```
###### licență{#license} 
*    [ **licență** ](#license)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard de metadate) este un atribut global RECOMANDAT PUTERNIC cu restricţiile de licenţă şi/sau utilizare. De exemplu,
    ```
    <att name="license">\\[standard\\]</att>
    ```
    * Dacă " \\[ standard \\] " apare în valoarea atributului, acesta va fi înlocuit cu standardul ERDDAP™ licență de la&lt;standardLicense&gt; tag in ERDDAP 's
         \\[ Tomcat \\] /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file.
         
######  Metadata\\_Conventions  {#metadata_conventions} 
*    [ ** Metadata\\_Conventions ** ](#metadata_conventions) este de la învechite [ACDD 1, 0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)   (care a fost identificată în Metadata\\_Conventions " Unidata Dataset Discovery v1.0") standardul metadatelor. Valoarea atributului a fost o listă separată de convenţii de metadate utilizate de acest set de date.
În cazul în care un set de date utilizează ACDD 1.0, acest atribut este RECOMANDAT PUTERNIC, de exemplu,
    ```
    <att name="Metadata\\_Conventions">COARDS, CF-1.6, Unidata Dataset Discovery v1.0</att>  
    ```
Dar... ERDDAP™ Acum recomandă ACDD-1.3. Dacă aveţi [ați schimbat setările de date pentru a utiliza ACDD-1.3](#switch-to-acdd-13) , utilizarea Metadata\\_Conventions este puternic distorsionat: doar utilizaţi [&lt;Convenții &gt;] (#convenții) În schimb.
######  processing\\_level  {#processing_level} 
*    [ ** processing\\_level ** ](#processing_level)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard de metadate) este o descriere textuală RECOMANDATĂ a prelucrării (de exemplu, [Nivelul de prelucrare a datelor sistemului de observare a Pământului al NASA](https://www.earthdata.nasa.gov/learn/earth-observation-data-basics/data-processing-levels) , de exemplu, nivelul 3) sau nivelul de control al calității (De exemplu, Calitate Ştiinţifică) a datelor. De exemplu,
    ```
    <att name="processing\\_level">3</att>  
    ```
###### proiect{#project} 
*    [ **proiect** ](#project)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard de metadate) este un atribut OPTIONAL pentru identificarea proiectului din care face parte setul de date. De exemplu,
    ```
    <att name="project">GTSPP</att>  
    ```
Dacă setul de date nu face parte dintr-un proiect, nu utilizaţi acest atribut. Comparativ cu [ creator\\_name ](#creator_name) , acest lucru este axat pe proiect (nu o persoană sau o organizație, care poate fi implicată în proiecte multiple) .
######  publisher\\_name  {#publisher_name} 
*    [ ** publisher\\_name ** ](#publisher_name)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard de metadate) este modalitatea RECOMANDATĂ de a identifica persoana, organizația sau proiectul care publică acest set de date. De exemplu,
    ```
    <att name="publisher\\_name">JPL</att>  
    ```
De exemplu, sunteţi editorul dacă o altă persoană sau grup [create](#creator_name) Setul de date şi îl rezervi prin ERDDAP . Dacă "publicator" nu se aplică într-adevăr unui set de date, omite acest atribut. Comparativ cu [ creator\\_name ](#creator_name) , editorul probabil că nu a modificat sau reprocesat semnificativ datele; editorul face doar datele disponibile într-un loc nou.
######  publisher\\_email  {#publisher_email} 
*    [ ** publisher\\_email ** ](#publisher_email)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard de metadate) este modalitatea RECOMANDATĂ de identificare a unei adrese de email (corect formatate, de exemplu, John\\_smith@great.org) care oferă o modalitate de a contacta editorul. De exemplu,
    ```
    <att name="publisher\\_email">john\\_smith@great.org</att>  
    ```
Dacă "publicator" nu se aplică într-adevăr unui set de date, omite acest atribut.
######  publisher\\_url  {#publisher_url} 
*    [ ** publisher\\_url ** ](#publisher_url)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard de metadate) este modalitatea RECOMANDATĂ de a identifica un URL pentru organizația care a publicat setul de date sau un URL cu informațiile editorului despre acest set de date (dar acesta este mai mult scopul [ infoUrl ](#infourl) ) . De exemplu,
    ```
    <att name="publisher\\_url">https://podaac.jpl.nasa.gov</att>  
    ```
Dacă "publicator" nu se aplică într-adevăr unui set de date, omite acest atribut.
######  real\\_time  {#real_time} 
*    [ ** real\\_time ** ](#real_time) este un atribut global String (nu din niciun standard) indicând dacă acesta este un set de date în timp real. De exemplu,
    ```
    <att name="real\\_time">true</att>  
    ```
Dacă acest lucru este fals (implicit) , ERDDAP™ va cache răspunsuri la cererile de tipuri de fișiere în care întregul fișier trebuie creat înainte ERDDAP™ poate incepe sa trimita raspunsul utilizatorului si sa le reutilizeze timp de aproximativ 15 minute (de exemplu, .nc ,.png) .
Dacă acest lucru este setat la adevărat, ERDDAP™ nu va cache fișierele de răspuns și va reveni întotdeauna fișiere nou create.
######  sourceUrl atribut{#sourceurl-attribute} 
*    [ ** sourceUrl ** ](#sourceurl-attribute) este un atribut global cu URL-ul sursei datelor. De exemplu,
    ```
    <att name="sourceUrl">https://opendap.co-ops.nos.noaa.gov/ioos-dif-sos/SOS</att>  
    ```
     (dar pune totul pe o linie) 
    *    ERDDAP™ de obicei creează acest atribut global automat. Două excepții sunt tabelul EDDDe la Hyrax Fişiere şi tabele EDDFromThreddsFiles.
    * Dacă sursa este fişiere locale şi fişierele au fost create de către organizaţia dumneavoastră, utilizaţi
    ```
        <att name="sourceUrl">(local files)</att>
    ```
    * Dacă sursa este baza de date locală și datele au fost create de organizația dumneavoastră, utilizați
    ```
        <att name="sourceUrl">(local database)</att>
    ```
    *    sourceUrl este important pentru că permite clienților să se întoarcă la sursa originală a datelor.
    *    sourceUrl este unică ERDDAP . Nu este de la nici un standard de metadate.
        
######  standard\\_name\\_vocabulary  {#standard_name_vocabulary} 
*    [ ** standard\\_name\\_vocabulary ** ](#standard_name_vocabulary)   (de la [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard de metadate) este un atribut RECOMANDAT pentru identificarea denumirii vocabularului controlat din care variabilă [ standard\\_name ](#standard_name) Sunt luate. De exemplu,
    ```
    <att name="standard\\_name\\_vocabulary">CF Standard Name Table v77</att>  
    ```
pentru versiunea 77 a [Tabelul cu denumirea standard CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) .
         
#####  subsetVariables  {#subsetvariables} 
*    ** subsetVariables **   (numai pentru seturile de date ale tabelului EDD) este un atribut global RECOMANDAT care vă permite să specificați o listă separată de virgulă de [&lt; dataVariable &gt;] (#date variabile)   [ destinationName ](#destinationname) s identificarea variabilelor care au un număr limitat de valori (a declarat un alt mod: variabile pentru care fiecare dintre valori are multe duplicate) . De exemplu,
    ```
        <att name="subsetVariables">station\\_id, longitude, latitude</att>  
    ```
Dacă acest atribut este prezent, setul de date va avea un * datasetID * .Subset pagina web (și un link către acesta pe fiecare listă de seturi de date) care permite utilizatorilor să aleagă rapid și ușor diferite subseturi de date.
    * De fiecare dată când un set de date este încărcat, ERDDAP sarcini și magazine pe disc o masă cu toate distincte () combinații ale subgrupului Valorile variabilei. ERDDAP™ poate citi că subsetVariables masa si proceseaza-l foarte repede (în special în comparație cu citirea multor fișiere de date sau obținerea de date dintr-o bază de date sau alt serviciu extern) .
    * Asta permite ERDDAP™ pentru a face 3 lucruri:
        1. Permite ERDDAP™ pentru a pune o listă de valori posibile într-o listă dropdown pe formularul de acces la date, face o pagină web grafică, și .subset pagini web.
        2. Permite ERDDAP™ să ofere o pagină web .subset pentru acest set de date. Această pagină este interesantă pentru că face ușor de găsit combinații valide ale valorilor acestor variabile, care pentru unele seturi de date și unele variabile este foarte, foarte greu (Aproape imposibil.) . Apoi, toate cererile de utilizator pentru distinct () subset Datele variabile vor fi foarte rapide.
        3. Dacă există o cerere a utilizatorului care se referă numai la un subset al acestor variabile, ERDDAP™ poate citi rapid subsetVariables masa, și răspunde la cerere. Care poate salva o tona de timp si efort pentru ERDDAP .
    * Ordinul destinationName s ați specificat determină ordinea de sortare pe * datasetID * .subset pagina web, astfel încât va specifica de obicei cele mai importante variabile mai întâi, apoi cel mai puțin important. De exemplu, pentru seturile de date cu serii de timp pentru mai multe stații, ați putea folosi, de exemplu,
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
astfel încât valorile sunt sortate de stație\\_id.
    * Evident, este alegerea ta ce variabile să includă în subsetVariables lista, dar utilizarea sugerată este:
        
În general, include variabile pentru care doriți ERDDAP™ pentru a afișa o listă de opțiuni în scădere pe formularul de acces la date al setului de date (.html) și Make-A-Graph (.graph) pagini web.
        
În general, include variabile cu informații despre caracteristicile setului de date (stații, profiluri și/sau traiectorii, în special din [cdm\\_timeseries\\_variabile](#cdm_timeseries_variables) , [cdm\\_profil\\_variabile](#cdm_profile_variables) , [cdm\\_traiectorie\\_variabile](#cdm_trajectory_variables) ) . Există doar câteva valori diferite pentru aceste variabile, astfel încât acestea funcționează bine cu listele drop-down.
        
Nu includeți niciodată variabile de date asociate cu observațiile individuale (de exemplu, timpul, temperatura, salinitatea, viteza curentă) în subsetVariables lista. Există prea multe valori diferite pentru aceste variabile, astfel încât o listă de drop-down ar fi lent pentru a încărca și să fie greu de lucrat cu (sau nu funcționează) .
        
    * Dacă numărul de combinații distincte ale acestor variabile este mai mare decât aproximativ 1.000.000, ar trebui să ia în considerare restrângerea subsetVariables pe care le specificaţi pentru a reduce numărul de combinaţii distincte la sub 1.000.000; altfel, * datasetID * .Se pot genera încet pagini web. În cazuri extreme, setul de date nu poate fi încărcat ERDDAP™ Pentru că generarea listei de combinaţii distincte foloseşte prea multă memorie. Dacă da, trebuie să eliminaţi unele variabile din subsetVariables lista.
    * În cazul în care numărul de valori distincte ale unei variabile subset este mai mare de aproximativ 20.000, nu ar trebui să ia în considerare includerea acelei variabile în lista de subsetVariables ; altfel, este nevoie de mult timp pentru a transmite * datasetID * . Subset, * datasetID * .graph, și * datasetID * .html pagini web. De asemenea, pe un Mac, este foarte greu de a face selecţii dintr-o listă picătură în jos cu mai mult de 500 de elemente din cauza lipsei unui bara de sul. Un compromis este: eliminarea variabilelor din listă atunci când utilizatorii nu sunt susceptibile de a selecta valori dintr-o listă descendentă.
    * Trebuie să testaţi fiecare set de date pentru a vedea dacă subsetVariables Setarea este în regulă. Dacă serverul de date sursă este lent și durează prea mult (sau nu reușește) pentru a descărca datele, fie reduce numărul de variabile specificate sau elimina subsetVariables atribut global.
    * Subset Variabilele sunt foarte utile. Deci, în cazul în care setul de date este potrivit, vă rugăm să creați un subsetVariables atribut.
    * Tabel EDD din SOS adaugă automat
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
atunci când setul de date este creat.
        * Avertisment posibil: dacă un utilizator utilizează * datasetID * .subset pagina web alege o valoare care are un transportReturn sau caracter newline, * datasetID * Subset va eșua. ERDDAP™ nu pot lucra în jurul acestei probleme din cauza unor detalii HTML. În orice caz, este aproape întotdeauna o idee bună pentru a elimina transportulReturn și caracterele Newline din date. Pentru a vă ajuta să rezolvați problema, în cazul în care tabelul EDD. subsetVariables Metoda tabelului de date în ERDDAP detecteaza valori de date care vor provoca probleme, va trimite un e-mail cu o lista de valori ofensatoare la email Totul Pentru adresele de email specificate în setup.xml. Aşa, ştii ce trebuie reparat.
        *    **Tabele de subgrupe pregenerate.** În mod normal, când ERDDAP™ încarcă un set de date, solicită distinct () Tabelul de date privind variabilele subsetului din sursa de date, doar prin intermediul unei cereri de date normale. În unele cazuri, aceste date nu sunt disponibile de la sursa de date sau de la sursa de date poate fi greu pe serverul sursă de date. Dacă da, puteți furniza o masă cu informațiile în .json sau .csv fișier cu numele *Tomcat* /content/erddap/subset/ * datasetID *  .json   (sau .csv) . Dacă sunt prezente, ERDDAP™ o va citi o dată când setul de date este încărcat și îl va utiliza ca sursă a datelor de subset.
            * Dacă există o eroare în timpul citirii, setul de date nu va fi încărcat.
            * Ea trebuie să aibă exact aceleași nume de coloană (de exemplu, acelaşi caz) cum&lt; subsetVariables &gt;, dar coloanele pot fi în orice ordine.
            * Acesta poate avea coloane suplimentare (Acestea vor fi eliminate și noi rânduri redundante vor fi eliminate) .
            * Valorile lipsă ar trebui să lipsească (nu numere false ca -99) .
            *    .json fișierele pot fi un pic mai greu de creat, dar se ocupă cu caractere Unicode bine. .json fișiere sunt ușor de creat dacă le creați cu ERDDAP .
            * Fişierele .csv sunt uşor de lucrat cu, dar potrivite doar pentru ISO 8859-1 caractere. Fișierele .csv TREBUIE să aibă nume de coloane pe primul rând și date pe rândurile ulterioare.
        * Pentru seturi de date uriașe sau când&lt; subsetVariables &gt; este configurat greşit, tabelul de combinaţii de valori poate fi suficient de mare pentru a cauza prea multe date sau erori OutOfMemory. Soluţia este de a elimina variabilele din lista de&lt; subsetVariables &gt; pentru care există un număr mare de valori sau se elimină variabilele necesare până când dimensiunea tabelului respectiv este rezonabilă. Indiferent de eroare, părțile ERDDAP™ care utilizează subsetVariables sistemul nu funcţionează bine. (De exemplu, paginile web încarcă foarte încet) când sunt prea multe rânduri (De exemplu, peste un milion) în acea masă.
        *    subsetVariables nu are nimic de-a face cu specificarea variabilelor pe care utilizatorii le pot utiliza în constrângeri, și anume modul în care utilizatorii pot solicita subgrupe ale setului de date. ERDDAP™ permite întotdeauna constrângerile să se refere la oricare dintre variabile.
###### Unități de timp{#time-units} 
 [Ora și ora](#time-units) Articolul 478 din CRR (E) Data formatării + ora Coarde Z (De exemplu, 1985-01-31T15:31:00Z) .
             
###### rezumat{#summary} 
*    [ **rezumat** ](#summary)   (de la [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) şi [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standarde privind metadatele) este un atribut global solicitat cu o descriere lungă a setului de date (de obicei&lt;500 de caractere). De exemplu,
    ```
    <att name="summary">VIIRSN Level-3 Standard Mapped Image, Global, 4km, Chlorophyll a, Daily. The Visible and Infrared Imager/Radiometer Suite (VIIRS) is a multi-disciplinary instrument that flies on the National Polar-orbiting Operational Environmental Satellite System (NPOESS) series of spacecraft, including the NPOESS Preparatory Project (NPP).</att>
    ```
    * Fie setul de date este global [sursăAtribute](#global-attributes) sau global&lt; addAttributes &gt; TREBUIE să includă acest atribut.
    * Rezumatul este foarte important deoarece permite clienților să citească o descriere a setului de date care are mai multe informații decât titlul și, prin urmare, să înțeleagă rapid ce este setul de date.
    * Sfaturi: vă rugăm să scrieți rezumatul astfel încât să funcționeze pentru a descrie setul de date unei persoane aleatoare vă întâlniți pe stradă sau unui coleg. Nu uitaţi să includeţi [Cinci W şi un H](https://en.wikipedia.org/wiki/Five_Ws) : Cine a creat setul de date? Ce informaţii au fost colectate? Când au fost colectate datele? Unde a fost colectat? De ce a fost colectat? Cum a fost colectat?
    *    ERDDAP™ afișează rezumatul formularului de acces la date al setului de date ( * datasetID * .html) Faceți o pagină web grafică ( * datasetID * .graph) , și alte pagini web. ERDDAP™ utilizează rezumatul la crearea documentelor FGDC și ISO 19115.
######  testOutOfDate  {#testoutofdate} 
*    [ ** testOutOfDate ** ](#testoutofdate)   (opţional ERDDAP - atribut de metadate globale specifice, nu de la orice standard) precizează, într-un mod simplist, atunci când datele pentru un set de date în timp aproape real sunt considerate depășite, specificate ca: now-  *nuniți* , de exemplu, now- 2 zile pentru datele care apar de obicei la 24-48 ore după valoarea timpului. Pentru datele previzionale, utilizați acum **+**  *nuniți* , de exemplu, acum+6 zile pentru datele previzionale, adică cel mult 8 zile în viitor. (Vezi [ now-  *nuniți* Descrierea sintaxei](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) .) Dacă valoarea maximă a timpului pentru setul de date este mai recentă decât perioada specificată, setul este considerat actualizat. Dacă valoarea maximă a timpului este mai mare decât timpul specificat, setul de date este considerat actualizat. Pentru seturile de date expirate, există probabil o problemă cu sursa de date, deci ERDDAP™ nu poate accesa date din puncte de timp mai recente.
    
ă testOutOfDate valoarea este afișată ca coloană în [ allDatasets Set de date](#eddtablefromalldatasets) în ERDDAP . Se utilizează, de asemenea, pentru calcularea indicelui OutOfDate, care este o altă coloană din allDatasets Set de date.
Dacă indicele este&lt;1, setul de date este considerat actualizat.
Dacă indicele este&lt;=1, setul de date este considerat expirat.
Dacă indicele este&lt;=2, setul de date este considerat foarte învechit.
    
ă testOutOfDate valoarea este de asemenea utilizată de ERDDAP™ generareahttps://*yourDomain*/erddap/outOfDateDatasets.htmlpagina web ( [exemplu](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) ) care indică seturile de date care au&lt; testOutOfDate &gt; tag-uri, cu seturile de date clasificate după cum sunt depăşite. Dacă modificați tipul de fișier (de la .html la .csv, .jsonlCSV , .nc , .tsv , ...) , puteți obține această informație în diferite formate de fișiere.
    
Când este posibil, [GenereazăSeturi de dateXml](#generatedatasetsxml) adaugă testOutOfDate atribut global addAttributes unui set de date. Această valoare este o sugestie bazată pe informațiile disponibile pentru GenerateDatasetsXml. Dacă valoarea nu este adecvată, schimbă-o.
    
"Out-of-date" aici este foarte diferit de [&lt;reîncărcare Fiecare NMuta &gt;] (#Încarcă fiecare minut) , care se ocupă de modul în care sunt actualizate ERDDAP Cunoaşterea setului de date este. ă&lt; testOutOfDate &gt; sistemul presupune că ERDDAP Cunoaşterea setului de date este actualizată. Întrebarea&lt; testOutOfDate &gt; tratează este: pare să fie ceva în neregulă cu sursa datelor, ceea ce face ca datele mai recente să nu fie accesibile prin ERDDAP ?
    
###### titlu{#title} 
*    [ **titlu** ](#title)   (de la [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) şi [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standarde privind metadatele) este un atribut global solicitat cu descrierea scurtă a setului de date (de obicei&lt;=95 caractere). De exemplu,
    ```
    <att name="title">VIIRSN Level-3 Mapped, Global, 4km, Chlorophyll a, Daily</att>
    ```
    * Fie setul de date este global [sursăAtribute](#global-attributes) sau global&lt; addAttributes &gt; TREBUIE să includă acest atribut.
    * Titlul este important deoarece fiecare listă de seturi de date prezentate de ERDDAP   (altele decât rezultatele căutării) enumeră setul de date în ordine alfabetică, pe titlu. Deci, dacă doriți să specificați ordinea seturilor de date, sau să aveți unele seturi de date grupate împreună, trebuie să creați titluri având în vedere acest lucru. Multe liste de seturi de date (de exemplu, ca răspuns la căutarea unei categorii) , arată un subset al listei complete și într-o ordine diferită. Prin urmare, titlul fiecărui set de date ar trebui să rămână pe cont propriu.
    * Dacă titlul conţine cuvântul "DEPRECAT" (toate majusculele) , apoi setul de date va primi un clasament mai mic în căutare.
             
##### &lt; axisVariable &gt;{#axisvariable} 
* [ ** &lt; axisVariable &gt; ** ] (#axisvariabil) este utilizat pentru a descrie o dimensiune (De asemenea, numit "axa") .
Pentru EDDGrid Seturi de date, unul sau mai multe axisVariable Etichetele sunt obligatorii şi toate [ dataVariable s](#datavariable) Împărțiți/utilizați întotdeauna toate variabilele axei. ( [De ce?](#why-just-two-basic-data-structures)   [Şi dacă nu o fac?](#dimensions) )   
Trebuie să existe o variabilă a axei pentru fiecare dimensiune a variabilelor de date.
Variabilele axei trebuie specificate în ordinea în care variabilele de date le utilizează.
(Seturile de date ale tabelului EDD NU pot fi utilizate&lt; axisVariable &gt; etichete.)
Un exemplu încruntat este:

>&nbsp;&nbsp;&lt;axisVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>MT&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>time&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">days since 1902-01-01T12:00:00Z&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/axisVariable>  

&lt; axisVariable &gt; acceptă următoarele subtag-uri:
###### &lt; sourceName \\&gt;{#sourcename} 
* [&lt; sourceName \\&gt;] (#sourcename) -- numele sursei de date pentru variabila. Acesta este numele care ERDDAP™ va utiliza la solicitarea datelor din sursa de date. Acesta este numele care ERDDAP™ va căuta când datele sunt returnate de la sursa de date. E un caz sensibil. Acest lucru este solicitat.
###### &lt; destinationName \\&gt;{#destinationname} 
* [&lt; destinationName \\&gt;] (#destinationname) este denumirea variabilei care va fi afișată și utilizată de ERDDAP™ utilizatori.
    * Acest lucru este OPTIONAL. Dacă absenţa sourceName se utilizează.
    * Acest lucru este util pentru că vă permite să schimbați un criptic sau ciudat sourceName .
    *    destinationName este un caz sensibil.
    *    destinationName S TREBUIE să înceapă cu o scrisoare (A-Z, a-z) și TREBUIE să fie urmate de 0 sau mai multe caractere (A-Z, a-z, 0-9, și \\_) . ("-" a fost permis înainte ERDDAP™ Versiunea 1.10.) Această restricție permite ca denumirile variabilelor axei să fie identice în ERDDAP™ , în fișierele de răspuns, și în toate software-ul în care vor fi utilizate aceste fișiere, inclusiv limbajele de programare (ca Python , Matlab , și Java Script) în cazul în care există restricții similare privind denumirile variabile.
    * În EDDGrid seturi de date, [longitudine, latitudine, altitudine, adâncime și timp](#destinationname) Variabilele axei sunt speciale.
         
######  axisVariable  &lt;addAttributes&gt; {#axisvariable-addattributes} 
* [&lt; addAttributes &gt;] (#variable-addattributes) definește un set OPTIONAL de atribute ( *Nume* = *valoare* ) care sunt adăugate atributelor sursei pentru o variabilă, pentru a face atributele combinate pentru o variabilă.
Dacă variabila este [sursăAtribute](#variable-addattributes) sau&lt; addAttributes &gt; includ [ scale\\_factor și/sau add\\_offset ](#scale_factor) atribute, valorile lor vor fi folosite pentru a despacheta datele din sursa inainte de distribuirea catre client
     (rezultat Valoare = sursă Valoare \\ * scale\\_factor + add\\_offset ) . Variabila despachetată va fi de același tip de date (de exemplu, plutesc) ca scale\\_factor şi add\\_offset valori.
         
##### &lt; dataVariable &gt;{#datavariable} 
* [ ** &lt; dataVariable &gt; ** ] (#date variabile) este o necesitate (pentru aproape toate setările de date) etichetă în interiorul&lt;Set de date &gt; eticheta utilizată pentru a descrie o variabilă de date. Trebuie să existe 1 sau mai multe cazuri ale acestei etichete. Un exemplu încruntat este:

>&nbsp;&nbsp;&lt;dataVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>waterTemperature&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>sea\\_water\\_temperature&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataType>](#datatype)float&lt;/dataType>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Water Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[standard\\_name](#standard_name)">sea\\_water\\_temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/dataVariable>  

&lt; dataVariable &gt; acceptă următoarele subtag-uri:
###### &lt; sourceName &gt;{#sourcename-1} 
* [&lt; sourceName &gt;] (#sourcename) -- numele sursei de date pentru variabila. Acesta este numele care ERDDAP™ va utiliza la solicitarea datelor din sursa de date. Acesta este numele care ERDDAP™ va căuta când datele sunt returnate de la sursa de date. E un caz sensibil. Acest lucru este solicitat.
###### Grupuri{#groups} 
FC a adăugat sprijin pentru grupurile cu CF v1.8. Începând cu ~2020, NetCDF instrumente suport punerea variabilelor în grupuri într-o .nc Dosar. În practică, aceasta înseamnă doar că variabilele au un nume lung care identifică grupul (s) și denumirea variabilă, de exemplu, grupa1a/grup2c/varName). ERDDAP™ suportă grupurile prin conversia "/" în variabila&lt; sourceName &gt; în "\\_" în variabila&lt; destinationName &gt;, de exemplu, grupul1a\\_grup2c\\_varName. (Când vezi asta, ar trebui să realizezi că grupurile nu sunt mai mult decât o convenţie de sintaxă.) Atunci când variabilele sunt enumerate în ERDDAP™ , toate variabilele dintr-un grup vor apărea împreună, mimând grupul de bază. \\[ Dacă ERDDAP™ , în special GenerateDatasets Xml, nu funcționează la fel de bine ca ar putea cu fișiere sursă care au grupuri, vă rugăm să trimiteți un fișier eșantion la Chris. John la Noaa.gov. \\] 

Tabel EDDDe la seturi de date cu fișiere poate folosi unele special codificate, pseudo sourceName s să definească noi variabile de date, de exemplu, pentru a promova un atribut global pentru a fi o variabilă de date. Vezi? [Această documentație](#pseudo-sourcenames) .
######  HDF Structuri{#hdf-structures} 
Începând cu ERDDAP™ v2.12; EDDGrid De laNcFiles și EDDGrid DinNcFiles Despachetat poate citi date din "structuri" in .nc 4 și .hdf 4 dosare. Pentru a identifica o variabilă dintr-o structură,&lt; sourceName &gt; trebuie să utilizeze formatul: *completStructureName*  |  *nume membru* , de exemplu grupul1/myStruct | Membrul meu.

###### Denumire sursă valoare fixă{#fixed-value-sourcenames} 
Într-un set de date EDD Table, dacă doriți să creați o variabilă (cu o valoare unică, fixă) care nu este în setul de date sursă, utilizați:
```
    <sourceName>=*fixedValue*</sourceName>  
```
Iniţial egal semn spune ERDDAP™ că un fix Va urma valoarea.

* Pentru variabilele numerice, valoarea fixă trebuie să fie o valoare finită unică sau NaN (caz insensibil, de exemplu, \\=NaN) .
* Pentru variabilele string, valoarea fixă trebuie să fie unică; [Sfoara JSON](https://www.json.org/json-en.html)   (cu caractere speciale scăpat cu caractere \\\) , de exemplu, \\="My \\"Special\\\" String" .
* Pentru o variabilă cu timbru temporal, specificați valoarea fixă ca număr în "seconds since 1970-01-01T00:00:00Z" şi utilizare
unități=secunde din 1970-01-01T00:00:00Z .
    
Celelalte etichete pentru&lt; dataVariable &gt; activitatea ca şi cum aceasta ar fi o variabilă regulată.
De exemplu, pentru a crea o variabilă numită altitudine cu o valoare fixă de 0.0 (float) , utilizați:

>        &lt;sourceName>=0&lt;/sourceName>  
>        [&lt;destinationName\\>](#destinationname)altitude&lt;/destinationName>  
>        [&lt;dataType>float&lt;/dataType>](#datatype)  

Pentru situații neobișnuite, puteți specifica chiar o actual\\_range AdăugaţiAttribute, care va suprascrie valorile aşteptate ale destinaţieiMin şi destinaţieMax (care altfel ar fi egal cu fix Valoare) .
 
###### Script SourceNames/Dividende variabile{#script-sourcenamesderived-variables} 
Începând cu ERDDAP™ v2.10, în [Tabel EDD din dosare](#eddtablefromfiles) , [Tabel EDD din baza de date](#eddtablefromdatabase) , sau [Tabel EDDFromFileNames](#eddtablefromfilenames) Set de date,&lt; sourceName &gt; poate fi
o expresie (o ecuație care evaluează la o singură valoare) , folosind formatul
```
    <sourceName>=*expression*</sourceName>  
```
sau un scenariu (o serie de declarații care returnează o singură valoare) , folosind formatul
```
    <sourceName>=*script*</sourceName>  
```
 ERDDAP™ se bazează pe [Proiectul Apache](https://www.apache.org/)   [ Java Limba expresiei (JEXL) ](https://commons.apache.org/proper/commons-jexl/)   (licență: [Apache](https://www.apache.org/licenses/LICENSE-2.0) ) pentru a evalua expresiile și a rula scripturile.
Calculul pentru o variabilă nouă dată se face într-un rând de rezultate, în mod repetat pentru toate rândurile.
Expresiile și scripturile folosesc un Java - şi Java Sintaxa script-ca și poate folosi oricare dintre
 [operatori și metode care sunt construite în JEXL](https://commons.apache.org/proper/commons-jexl/reference/syntax.html) .
Scenariile pot folosi şi metode (funcții) din aceste clase:
*    [Calendar2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2) , care este un ambalaj pentru unele dintre metodele statice, de timp și calendar în com.cohort.util.Calendar2 ( [licență](/acknowledgements#cohort-software) ) . De exemplu,
Calendar2.parsetoEpochSeconds ( *timp sursă, dată TimpFormat* ) va analiza sursa Time string via the dateFormat string and return a "seconds since 1970-01-01T00:00:00Z"   (EpocaSeconds) valoare dublă.
*    [Matematica](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math) , care este un ambalaj pentru aproape toate metodele statice, legate de matematică în [Java.lang. Matematica](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html) . De exemplu, Math.atan2 ( *y, x* ) ia în coordonate dreptunghiulare (y, x) şi întoarce coordonatele polare (o gamă de duble cu \\[ r, theta \\] ) .
*    [Matematica 2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2) , care este un ambalaj pentru aproape toate metodele statice, legate de matematică în com.cohort.util. Matematica 2 ( [licență](/acknowledgements#cohort-software) ) . De exemplu,
Matematica2.rotund ( *d, nplaces* ) se rotunjește d la numărul specificat de cifre la dreapta punctului zecimal.
* String, care vă oferă acces la toate metodele statice, legate de string în [Java.lang. String](https://docs.oracle.com/javase/8/docs/api/java/lang/String) . Obiecte de coarde în ERDDAP™ expresiile și scripturile pot folosi oricare dintre acestea asociate Java metodele descrise în java.lang. Documentaţia corzilor. De exemplu, String.ValueOf (d) va converti valoarea dublă d într-o coardă (deși puteți folosi și ""+d) .
*    [String2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2) , care este un ambalaj pentru majoritatea metodelor statice, string- și matrice legate în com.cohort.util.String2 ( [licență](/acknowledgements#cohort-software) ) . De exemplu, String2 .z eroPad ( *număr, nDigits* ) va adăuga 0's la stânga numărului String astfel încât numărul total de cifre este nDigits (de exemplu, șir2 .z eroPad ("6," 2) va reveni "06") .
*    [rând](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-row) , care dispune de metode non-statice pentru accesarea datelor din diferitele coloane din rândul curent al tabelului cu date sursă. De exemplu, rând.coloană șir ("an") se citește valoarea din coloana "an" ca și string, în timp ce rândul. Int ("an") citește valoarea din coloana "an" ca întreg.

Din motive de securitate, expresiile şi scenariile nu pot folosi alte clase decât cele 6. ERDDAP™ aplică această limitare prin crearea unei liste negre implicite (care lista neagră toate clasele) şi apoi o listă albă (care permite în mod specific cele 6 clase descrise mai sus) . Daca aveti nevoie de alte metode si/sau alte clase pentru a va face munca, va rugam sa trimiteti e-mail cererile catre Chris. John la Noaa.gov.
    
###### Eficiență
Pentru tabelul EDDDe la seturi de date Dosare, există doar un foarte, foarte minim (probabil nu se observă) încetinirea cererilor de date din aceste variabile. Pentru tabelul EDDFromDatabase, există o penalizare uriaşă pentru viteza cererilor care includ constrângeri asupra acestor variabile (de exemplu, (&longitude0360&gt;30&longitudine0360&lt;40) deoarece constrângerile nu pot fi transmise în baza de date, astfel încât baza de date trebuie să returneze mult mai multe date ERDDAP™   (care consumă foarte mult timp) astfel încât ERDDAP™ poate crea noua variabilă și aplica constrângerea. Pentru a evita cel mai rău caz (în cazul în care nu există constrângeri care să fie transmise bazei de date) , ERDDAP™ aruncă un mesaj de eroare astfel încât baza de date nu trebuie să returneze întregul conținut al tabelului. (Dacă doriți să ocoliți acest lucru, adăugați o constrângere la o coloană non-script care va fi întotdeauna adevărat, de exemplu, &time&lt;3000-01-01.) Din acest motiv, cu EDDtableFromDatabase, este, probabil, întotdeauna mai bine pentru a crea o coloană derivată în baza de date mai degrabă decât utilizarea sourceName =Script în ERDDAP .

###### Privire de ansamblu a modului în care o expresie (Sau script) Se utilizează:
Ca răspuns la cererea unui utilizator de date tabulare, ERDDAP™ Obţine date dintr-o serie de fişiere sursă. Fiecare fișier sursă va genera un tabel de prime (direct de la sursă) date. ERDDAP™ va trece apoi prin tabelul de date brute, rând cu rând, și să evalueze expresia sau script-ul o dată pentru fiecare rând, în scopul de a crea o nouă coloană care are această expresie sau script ca o sourceName .
    
###### GenereazăSeturi de dateXml
Notează că Generează date Xml nu este complet conștient atunci când există o nevoie de a crea o variabilă cu&lt; sourceName &gt; *expresie* &lt;/ sourceName &gt;. Trebuie să creezi variabila în datasets.xml de mână.

###### Exemple de exprimare:
Iată câteva exemple complete de variabile de date care folosesc o expresie pentru a crea o nouă coloană de date. Ne așteptăm ca aceste exemple (și variante ale acestora) va acoperi aproximativ 95% din utilizarea tuturor expresiilor derivate sourceName c.

###### Combinând "data" separată și "time" coloane într-o coloană de timp unificată:
```
    <dataVariable>
        <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("date") + "T" + 
            row.columnString("time") + "Z", "yyyy-MM-dd'T'HH:mm:ss'Z'")</sourceName> 
        <destinationName>time</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">seconds since 1970-01-01</att>
        </addAttributes>
    </dataVariable>
```
Asta sourceName expresia face un nou "time" coloana prin concaterarea valorilor String din "data" ( yyyy-MM-dd ) şi "time"   (HH:mm:ss) coloane pe fiecare rând al fișierului sursă, și prin transformarea că șir de caractere într-o "seconds since 1970-01-01"   (EpocaSeconds) valoare dublă.

Sau desigur, va trebui să personalizați șirul formatului de timp pentru a face față formatului specific din coloanele sursă și timp ale fiecărui set de date, a se vedea
 [documentația unităților de timp](#string-time-units) .

Tehnic, nu trebuie să foloseşti Calendar2.parsetoEpochSeconds () pentru a converti data + ora combinată în epocăSeconds. Ai putea trece doar data + ora String la ERDDAP™ și să specifice formatul (de exemplu,
 yyyy-MM-dd "T'HH:mm:ss'Z") prin atributul unităților. Dar există avantaje semnificative pentru convertirea în epocăSeconds -- în special, EDDtableFromFiles poate urmări cu ușurință intervalul de valori ale timpului din fiecare fișier și decide atât de repede dacă să se uite într-un anumit fișier atunci când răspunde la o cerere care are constrângeri de timp.

O problemă legată este necesitatea de a crea o coloană de date+timp unificată dintr-o sursă cu an, lună, dată, oră, minut, secundă. Solutia este foarte similara, dar de multe ori va trebui sa zero-pad multe dintre domeniile, astfel incat, de exemplu, luna (1 - 12) și data (1 - 31) Întotdeauna au două cifre. Iată un exemplu cu an, lună, dată:
```
    <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("year") + 
        String2.zeroPad(row.columnString("month"), 2) + 
        String2.zeroPad(row.columnString("date"), 2), "yyyyMMdd")</sourceName>
```
O problemă legată este necesitatea creării unei coloane unificate de latitudine sau longitudine prin combinarea datelor în gradele, minutele și coloanele secunde ale tabelului sursă, fiecare fiind stocat ca număr întreg. De exemplu,
```
    <sourceName>=row.columnInt("deg") + row.columnInt("min")/60.0 + 
        row.columnInt("sec")/3660.0</sourceName>
```
###### Conversia unei coloane numite "lon" cu valori de longitudine de la 0 - 360° într-o coloană numită "longitudine" cu valori de la -180 - 180°
```
    <dataVariable>
        <sourceName>=Math2.anglePM180(row.columnDouble("lon"))</sourceName> 
        <destinationName>longitude</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">degrees\\_east</att>
        </addAttributes>
    </dataVariable>
```
Asta sourceName expresie face o nouă coloană "longitudine" prin convertirea valorii duble din coloana "lon" pe fiecare rând al fișierului sursă (probabil cu valori 0 - 360) Şi transformând-o într-o valoare dublă de 180 la 180.

Dacă doriţi în schimb să convertiţi valorile de longitudine sursă de -180 - 180° în 0 - 360°, utilizaţi
```
    <sourceName>=Math2.angle0360(row.columnDouble("lon"))</sourceName>
```
Naming cele două variabile Longitudine:
Dacă setul de date va avea 2 variabile de longitudine, vă recomandăm utilizarea destinationName = Longitudine pentru variabila -180 - 180° și destinationName =longitudine0360 (și LongName=\\"Longitudine 0-360°") pentru variabila 0 - 360°. Acest lucru este important deoarece utilizatorii folosesc uneori Advanced Search pentru a căuta date într-o anumită gamă de longitudine. Această căutare va funcționa mai bine dacă longitudinea are în mod constant -180 - 180° valori pentru toate seturile de date. De asemenea, atributele geospaţiale\\_lon\\_min ale setului de date, geospaţiale\\_lon\\_max, Westernmost\\_Easting și Easternmest\\_Eastings global vor fi apoi stabilite într-un mod coerent (cu valori de longitudine -180-180°) ;
    
###### Conversia unei coloane numite "tempF" cu valori ale temperaturii în grad\\_ F într-o coloană numită "tempC" cu temperaturi în grad\\_ C:
```
    <dataVariable>
        <sourceName>=(row.columnFloat("tempF")-32)\\*5/9</sourceName> 
        <destinationName>tempC</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_C</att>
        </addAttributes>
    </dataVariable>
```
Asta sourceName expresia face o nouă coloană "tempC" prin conversia gradul float\\_ F valoarea din coloana "tempF" pe fiecare rând al fișierului sursă într-un grad float\\_ Valoarea C.

Rețineți că setul de date poate avea ambele temperatura inițială Variabila F și noua temperatură Variabilă C cu o altă variabilă
```
    <sourceName>tempF</sourceName>
```
###### Conversia coloanelor "viteză" și "direcție" de vânt în două coloane cu componentele u,v
* Pentru a face o variabilă u, utilizați
```
    <sourceName>=row.columnFloat("speed") \\* Math.cos(row.columnFloat("direction"))</sourceName>
```
* Pentru a face o variabilă v, utilizați
```
    <sourceName>=row.columnFloat("speed") \\* Math.sin(row.columnFloat("direction"))</sourceName>
```
Sau, având în vedere u,v:
* Pentru a face o variabilă de viteză, utilizați
```
    <sourceName>=Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[0\\]</sourceName>
```
* Pentru a face o direcție variabilă, utilizați
```
    <sourceName>=Math.toDegrees(Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[1\\])</sourceName>
```
    
###### Exemplu script:
Iată un exemplu de a folosi un scenariu, nu doar o expresie, ca o sourceName . Ne așteptăm că scenariile, spre deosebire de expresii, nu va fi nevoie de multe ori. În acest caz, scopul este de a returna o valoare care nu lipsește (-99) pentru valori ale temperaturii în afara unui interval specific. Rețineți că scenariul este partea după "=".
```
    <dataVariable>
        <sourceName>=var tc=row.columnFloat("tempC"); return tc&gt;35 || tc&lt;-5? -99.0f : tc\\*9/5+32;</sourceName> 
        <destinationName>tempF</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_F</att>
        </addAttributes>
    </dataVariable>
```
###### Steag tare
Dacă schimbați expresia sau scenariul definit într-o sourceName , trebuie să setați un [steag tare](/docs/server-admin/additional-information#hard-flag) pentru setul de date astfel încât ERDDAP™ șterge toate informațiile cache pentru setul de date și recitește fiecare fișier de date (folosind noua expresie sau script) data viitoare când încarcă setul de date. Alternativ, puteți utiliza [DasDds](#dasdds) care face echivalentul stabilirii unui steag dur.

###### Cod procent
Acest lucru este doar rar relevant: Pentru că expresiile și scripturile sunt scrise în datasets.xml , care este un document XML, trebuie sa codifici orice&lt;, \\&gt; și & caractere în expresii și scripturi ca&lt;, &gt; și .

###### Probleme frecvente
O problemă comună este că vă creați o variabilă cu sourceName = *expresie* dar coloana care rezultă din date are doar valori lipsă. Alternativ, unele rânduri ale noii coloane au valori lipsă şi crezi că nu ar trebui. Problema de bază este că ceva este în neregulă cu expresia și ERDDAP transformă această eroare într-o valoare lipsă. Pentru a rezolva problema,

* Uită-te la expresia pentru a vedea care ar putea fi problema.
* Uită-te în [log.txt](/docs/server-admin/additional-information#log) , care va arăta primul mesaj de eroare generat în timpul creării fiecărei coloane noi.

Cauzele comune sunt:

* Ai folosit cazul greşit. Expresiile şi scenariile sunt sensibile la caz.
* Ai omis numele clasei. De exemplu, trebuie să utilizați Math.abs () Nu doar abdomenul. () .
* Nu ai făcut conversii. De exemplu, dacă tipul de date al unui parametru este String și aveți o valoare dublă, trebuie să convertiți o dublură într-o șir prin ""+d.
* Numele coloanei din expresie nu corespunde exact cu numele coloanei din fișier (sau numele ar putea fi diferit în unele fișiere) .
* Există o eroare de sintaxă în expresie (De exemplu, o lipsă sau un extra ") ").

Dacă te blochezi sau ai nevoie de ajutor,
Vă rugăm să includeți detaliile și a se vedea noastre [secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support) .
        
###### &lt; destinationName &gt;{#destinationname-1} 
* [&lt; destinationName &gt;] (#destinationname) - numele variabilei care va fi afişată şi folosită de ERDDAP™ utilizatori.
    * Acest lucru este OPTIONAL. Dacă absenţa [ sourceName ](#sourcename) se utilizează.
    * Acest lucru este util pentru că vă permite să schimbați un criptic sau ciudat sourceName .
    *    destinationName este un caz sensibil.
    *    destinationName S TREBUIE să înceapă cu o scrisoare (A-Z, a-z) și TREBUIE să fie urmate de 0 sau mai multe caractere (A-Z, a-z, 0-9, și \\_) . ("-" a fost permis înainte ERDDAP™ Versiunea 1.10.) Această restricție permite ca denumirile variabilelor de date să fie identice în ERDDAP™ , în fișierele de răspuns, și în toate software-ul în care vor fi utilizate aceste fișiere, inclusiv limbajele de programare (ca Python , Matlab , și Java Script) în cazul în care există restricții similare privind denumirile variabile.
    * În seturile de date ale tabelului EDD, [longitudine, latitudine, altitudine (sau adâncime) , și timp](#destinationname) variabilele de date sunt speciale.
             
###### &lt;date Tip&gt;{#datatype} 
* [&lt;DataType &gt;] (#Tipul de date) - specifică tipul de date care vine de la sursă. (În unele cazuri, de exemplu, atunci când se citesc date din fișierele ASCII, se specifică modul în care trebuie stocate datele provenite de la sursă.) 
    * Acest lucru este solicitat de unele tipuri de seturi de date și IGNORED de alții. Tipuri de date care necesită acest lucru pentru tipurile lor dataVariable s sunt: EDDGrid FromXxxFiles, EDDtableFromXxxFiles, EDDtableFromM WFS , EDDTABLEFromNOS, EDDTABLE From SOS . Alte tipuri de seturi de date ignoră această etichetă deoarece primesc informațiile de la sursă.
         
    * Valorile valabile sunt oricare dintre standardele [ ERDDAP™ tipuri de date](#data-types) plus boolean (vezi mai jos) . Numele tipului de date sunt sensibile la caz.
         
###### date booleane{#boolean-data} 
*    ["boolean"](#boolean-data) este un caz special.
    * Intern, ERDDAP™ nu susţine un tip boolean pentru că Booleans nu poate stoca valorile lipsă şi majoritatea fişierelor nu susţin booleans. De asemenea, DAP nu suportă booleans, așa că nu ar fi nici o modalitate standard de a interoga variabile booleane.
    * Specificarea "boolean" pentru date Tip în datasets.xml va determina stocarea și reprezentarea valorilor booleene ca octeți: 0=Fals, 1=adevărat, 127= missing\\_value .
    * Utilizatorii pot specifica constrângerile prin utilizarea valorilor numerice (de exemplu, "isAlive=1") .
    *    ERDDAP™ Administratorii trebuie uneori să utilizeze datele "boolean" Tip în datasets.xml pentru a spune ERDDAP™ modul de interacţiune cu sursa de date (de exemplu, pentru a citi valorile booleane dintr-o bază de date relațională și a le converti la 0, 1 sau 127) .
         
* Dacă doriți să modificați o variabilă de date din tipul de date din fișierele sursă (de exemplu, scurt) în alte date Tip din setul de date (de exemplu, int) , nu folosi&lt;DataType &gt; pentru a specifica ce doriţi. (Acesta funcționează pentru unele tipuri de seturi de date, dar nu altele.) În schimb:
    * Utilizare&lt;DataType&gt; pentru a specifica ce este în fișiere (de exemplu, scurt) .
    * În&lt; addAttributes &gt; pentru variabilă, se adaugă a [ scale\\_factor ](#scale_factor) atribut cu noile date Tip (de exemplu, int) și o valoare de 1, de exemplu,
```
            <att name="scale\\_factor" type="int">1</att>  
```
######  dataVariable  &lt;addAttributes&gt; {#datavariable-addattributes} 
* [&lt; addAttributes &gt;] (#variable-addattributes) -- defineşte un set de atribute ( *Nume* = *valoare* ) care sunt adăugate atributelor sursei pentru o variabilă, pentru a face atributele combinate pentru o variabilă. Acest lucru este OPTIONAL.
Dacă variabila este [sursăAtribute](#variable-addattributes) sau&lt; addAttributes &gt; includ [ scale\\_factor și/sau add\\_offset ](#scale_factor) atribute, valorile lor vor fi folosite pentru a despacheta datele din sursa inainte de distributie catre client. Variabila despachetată va fi de același tip de date (de exemplu, plutesc) ca scale\\_factor şi add\\_offset valori.
        
###### Variabilă&lt;addAttributes&gt; {#variable-addattributes} 
* [ ** Atribute variabile / Variabile&lt; addAttributes &gt; ** ] (#variable-addattributes) --&lt; addAttributes &gt; este o etichetă OPTIONALĂ în cadrul&lt; axisVariable &gt; sau&lt; dataVariable &gt; eticheta utilizată pentru modificarea atributelor variabilei.
    
    *    ** Utilizați o variabilă&lt; addAttributes &gt; modificarea atributelor variabilei. **  ERDDAP™ combină atributele unei variabile din sursa setului de date (** sursăAtribute **) și variabila**  addAttributes  **pe care le definiţi în datasets.xml   (care au prioritate) pentru a face variabila "** Atribute combinate ** "care sunt ceea ce ERDDAP™ utilizatorii văd. Astfel, puteți utiliza addAttributes pentru a redefini valorile surseiAtributes, adăuga noi atribute, sau elimina atributele.
    * Vezi ** &lt; addAttributes &gt; **informații] (#addattributes) care se aplică la nivel global și variabil** &lt; addAttributes &gt; ** .
    *    ERDDAP™ caută și folosește multe dintre aceste atribute în diferite moduri. De exemplu, valorile ColorBar sunt necesare pentru a face o variabilă disponibilă prin intermediul WMS , astfel încât hărțile pot fi făcute cu ColorBars consistente.
    *    [longitudine, latitudine, altitudine (sau adâncime) , și variabile de timp](#destinationname) obține automat o mulțime de metadate adecvate (de exemplu, [unități](#units) ) .
    * Un eșantion&lt; addAttributes &gt; pentru o variabilă de date este:

    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="actual\\_range" type="doubleList">10.34 23.91&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMinimum" type="double">0&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMaximum" type="double">32&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Surface Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="numberOfObservations" />  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  

Atributul numărului golOfObservations cauzează atributul sursăOfObservations (dacă este cazul) să fie eliminate din lista de atribute finală, combinată.
    * Furnizarea acestor informaţii ajută ERDDAP™ face o treabă mai bună și ajută utilizatorii să înțeleagă setările de date.
Metadatele bune fac un set de date utilizabil.
Metadate insuficiente fac un set de date inutil.
Vă rugăm să luați timp pentru a face o treabă bună cu atribute metadate.
    
###### Comentarii despre atributele variabile care sunt speciale în ERDDAP :

######  actual\\_range  {#actual_range} 
*    [ ** actual\\_range ** ](#actual_range) este un atribut variabil RECOMANDAT. De exemplu,

>    &lt;att name="actual\\_range" [type="floatList"](#attributetype)\\>0.17 23.58&lt;/att>

* Acest atribut este de la [CDC COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) şi [CF 1,7+](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) standarde privind metadatele.
* Dacă este prezent, acesta trebuie să fie o serie de două valori ale aceluiași tip de date cu tipul de date de destinație al variabilei, specificând data reală (nu teoretic sau permis) valorile minime și maxime ale datelor pentru acea variabilă.
* Dacă datele sunt ambalate cu [ scale\\_factor și/sau add\\_offset ](#scale_factor) , actual\\_range trebuie să aibă valori despachetate și să fie de același tip de date cu valorile despachetate.
* Pentru unele surse de date (De exemplu, toate EDD Table From... Seturi de fișiere) , ERDDAP™ determină actual\\_range din fiecare variabilă și stabilește actual\\_range atribut. Cu alte surse de date (de exemplu, baze de date relaționale, Cassandra, DAP PER, Hyrax ) , ar putea fi supărător sau împovărător pentru sursa pentru a calcula gama , așa ERDDAP™ nu o cere. În acest caz, este cel mai bine dacă puteți stabili actual\\_range   (în special pentru variabilele longitudine, latitudine, altitudine, adâncime și timp) prin adăugarea unui actual\\_range atributul fiecărei variabile [&lt; addAttributes &gt;] (#addattributes) pentru acest set de date în datasets.xml , de exemplu,

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>-180 180&lt;/att>

* Pentru numere [variabile de timp și de timp](#time-units) , valorile specificate ar trebui să fie sursa relevantă (fără destinație) valori numerice. De exemplu, dacă valorile timpului de sursă sunt stocate ca "zile din 1985-01-01," atunci actual\\_range ar trebui să fie specificate în "zile din 1985-01-01." Și dacă doriți să vă referiți la ACUM ca a doua valoare pentru datele aproape în timp real, care este actualizată periodic, ar trebui să utilizați NaN. De exemplu, pentru a specifica o gamă de date de 1985-01-17 până în prezent, utilizați

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>16 NaN&lt;/att>

* Dacă actual\\_range este cunoscută ERDDAP™ calculându-l sau adăugându-l prin&lt; addAttributes &gt;), ERDDAP™ va afișa utilizatorul pe formularul de acces la date ( * datasetID * .html) și să facă un grafic pagini web ( * datasetID * .graph) pentru setul de date respectiv și să îl utilizeze la generarea metadatelor FGDC și ISO 19115. De asemenea, ultimele 7 zile de timp actual\\_range sunt utilizate ca subset de timp implicit.
* Dacă actual\\_range este cunoscut, utilizatorii pot utiliza [min () și max. () funcții](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min) în cereri, care este adesea foarte util.
* Pentru toate tabelele EDD... seturi de date, dacă actual\\_range Frecvente (fie prin precizarea sau prin ERDDAP™ calcularea) , ERDDAP™ va putea respinge rapid orice solicitare de date în afara acestui interval. De exemplu, în cazul în care valoarea cea mai mică a setului de date corespunde cu 1985-01-17, atunci o cerere pentru toate datele din 1985-01-01 până în 1985-01-16 va fi respinsă imediat cu mesajul de eroare "Interogatoriul dvs. nu a produs rezultate corespunzătoare." Acest lucru face actual\\_range o piesă foarte importantă de metadate, după cum poate salva ERDDAP™ o mulțime de efort și de a salva utilizatorul o mulțime de timp. Și acest lucru subliniază că actual\\_range valorile nu trebuie să fie mai mici decât gama efectivă a datelor; altfel; ERDDAP™ pot spune în mod eronat "Nu există date corespunzătoare" atunci când, de fapt, există date relevante.
* Atunci când un utilizator selectează un subset de date și solicită un tip de fișier care include metadate (de exemplu, .nc ) , ERDDAP™ modificări actual\\_range în fișierul de răspuns pentru a reflecta intervalul subgrupului.
* Vezi şi [ data\\_min şi data\\_max ](#data_min-and-data_max) , care sunt o modalitate alternativă de a specifica actual\\_range . Cu toate acestea, acestea sunt depreciate acum că actual\\_range este definit de CF 1.7+.
         
###### Atribute ale barei de culoare{#color-bar-attributes} 
Există mai multe atribute variabile OPTIONAL care specifică atributele implicite sugerate pentru o bară de culoare (folosit pentru a converti valorile datelor în culori pe imagini) pentru această variabilă.
* Dacă sunt prezente, aceste informații sunt utilizate ca informații implicite prin griddap și tabledap ori de câte ori solicitați o imagine care utilizează o bară de culoare.
* De exemplu, atunci când datele longitudinea latitudinii sunt grupate ca o acoperire pe o hartă, bara de culori specifică modul în care valorile datelor sunt convertite în culori.
* Având aceste valori permite ERDDAP™ pentru a crea imagini care folosesc o bară de culoare consistentă în diferite cereri, chiar și atunci când valorile de timp sau alte dimensiuni variază.
* Aceste nume de atribut au fost create pentru utilizare în ERDDAP . Nu sunt de la un standard de metadate.
* atributele legate de bara de culoare sunt:
    *    ** colorBarMinimum ** specifică valoarea minimă pe bara de culoare. De exemplu,

    >    &lt;att name="colorBarMinimum" [type="double"](#attributetype)\\>-5&lt;/att>  

    * Dacă datele sunt ambalate cu [ scale\\_factor și/sau add\\_offset ](#scale_factor) , specifică colorBarMinimum ca valoare despachetată.
    * Valori ale datelor mai mici decât colorBarMinimum sunt reprezentate de aceeasi culoare cu colorBarMinimum valori.
    * Atributul ar trebui să fie de [type="dublu"](#attributetype) , indiferent de tipul variabilei de date.
    * Valoarea este, de obicei, un număr rotund frumos.
    * Cele mai bune practici: Vă recomandăm o valoare ușor mai mare decât valoarea minimă a datelor.
    * Nu există nicio valoare implicită.
*    ** colorBarMaximum ** specifică valoarea maximă pe colorBar. De exemplu,

    >    &lt;att name="colorBarMaximum" [type="double"](#attributetype)\\>5&lt;/att>  

    * Dacă datele sunt ambalate cu [ scale\\_factor și/sau add\\_offset ](#scale_factor) , specifică colorBarMinimum ca valoare despachetată.
    * Valori ale datelor mai mari decât colorBarMaximum sunt reprezentate de aceeasi culoare cu colorBarMaximum valori.
    * Atributul ar trebui să fie de [type="dublu"](#attributetype) , indiferent de tipul variabilei de date.
    * Valoarea este, de obicei, un număr rotund frumos.
    * Cele mai bune practici: Vă recomandăm o valoare ușor mai mică decât valoarea maximă a datelor.
    * Nu există nicio valoare implicită.
*    **culoare BarPalette** specifica paleta pentru ColorBar. De exemplu,
    ```
            <att name="colorBarPalette">WhiteRedBlack</att>
    ```
    * Toate ERDDAP™ instalaţiile susţin aceste palete standard: BlackBlueWhite, BlackRedWhite, BlackWhite, BlueWhiteRed, LightRainbow, Ocean, OceanDepth, Rainbow, RedWhiteBlue, ReverseRainbow, TopographyDepth \\[ se adaugă în v1.74 \\] , White Black, WhiteBlueBlack, și WhiteRedBlack.
    * Dacă ați instalat [Palete suplimentare](/docs/server-admin/additional-information#palettes) Te poţi referi la unul dintre ei.
    * Dacă acest atribut nu este prezent, implicit este BlueWhiteRed dacă \\-1\\* colorBarMinimum = colorBarMaximum ; altfel implicit este Rainbow.
*    **colorBarScale** specifică scala pentru ColorBar. De exemplu,
    ``` 
            <att name="colorBarScale">Log</att>
    ```
    * Valorile valide sunt liniare și jurnale.
    * Dacă valoarea este log, colorBarMinimum trebuie să fie mai mare de 0.
    * Dacă acest atribut nu este prezent, implicit este Linear.
*    **culoare BarContinuous** specifică dacă colorBar are o paleta continuă de culori, sau dacă colorBar are câteva culori discrete. De exemplu,
    ```
            <att name="colorBarContinuous">false</att>
    ```
    * Valorile valabile sunt corzile adevărate şi false.
    * Dacă acest atribut nu este prezent, implicit este adevărat.
*    **Secțiune colorBarN** specifică numărul implicit de secțiuni de pe colorBar. De exemplu,
    ```
            <att name="colorBarNSections" type="int">6</att>
    ```
    * Valorile valabile sunt numere întregi pozitive.
    * Dacă acest atribut nu este prezent, implicit este \\-1, care spune ERDDAP™ pentru a alege numărul de secțiuni bazate pe gama de ColorBar.
######  WMS  {#wms} 
Principalele cerințe pentru ca o variabilă să fie accesibilă prin intermediul ERDDAP 's WMS serverul sunt:
* Setul de date trebuie să fie un EDDGrid ... Set de date.
* Variabila de date trebuie să fie o variabilă cu grilă.
* Variabila de date trebuie să aibă variabile ale axei de longitudine și latitudine. (Alte variabile ale axei sunt OPTIONAL.) 
* Trebuie să existe valori de longitudine între -180 şi 180.
* ă colorBarMinimum şi colorBarMaximum Trebuie specificate atributele. (Alte atribute de bare de culoare sunt OPTIONAL.) 

######  data\\_min şi data\\_max  {#data_min-and-data_max} 
*    [ ** data\\_min ** şi ** data\\_max ** ](#data_min-and-data_max) -- Acestea sunt atribute variabile depreciate definite în Experimentul de Circulaţie a Oceanului Mondial (WOCE) descrierea metadatelor. De exemplu,

    >    &lt;att name="data\\_min" [type="float"](#attributetype)\\>0.17&lt;/att>  
    >    &lt;att name="data\\_max" [type="float"](#attributetype)\\>23.58&lt;/att>

    * Vă recomandăm să utilizați [ actual\\_range ](#actual_range) , în loc de data\\_min şi data\\_max , pentru că actual\\_range este acum definită în caietul de sarcini al CF.
    * Dacă sunt prezente, acestea trebuie să fie de același tip de date cu tipul de date de destinație al variabilei și să specifice tipul real de date de destinație (nu teoretic sau permis) valorile minime și maxime ale datelor pentru acea variabilă.
    * Dacă datele sunt ambalate cu [ scale\\_factor și/sau add\\_offset ](#scale_factor) , data\\_min şi data\\_max trebuie să fie valori despachetate utilizând tipul de date despachetat.
         
###### variabilă drawLandMask  {#variable-drawlandmask} 
*    [ ** drawLandMask ** ](#variable-drawlandmask) -- Acesta este un atribut variabil OPTIONAL utilizat de ERDDAP™   (și fără standarde de metadate) care specifică valoarea implicită a opțiunii "Masca de teren brut" pe formularul Make A Graph al setului de date ( * datasetID * .graph) și pentru parametrul de teren într-un URL care solicită o hartă a datelor. De exemplu,
    ```
        <att name="drawLandMask">under</att>  
    ```
Vezi [ drawLandMask prezentare generală](#drawlandmask) .
###### Codare{#encoding} 
*    [ **Codare** ](#encoding) 
    * Acest atribut poate fi utilizat numai cu variabile String.
    * Acest atribut este recomandat cu fermitate.
    * Acest atribut este de la [ NetCDF Ghidul utilizatorului (NUG) ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html) .
    * Intern în ERDDAP™ , Strings sunt o secvență de caractere de 2 octeți care folosesc [Set de caractere Unicode UCS-2](https://en.wikipedia.org/wiki/UTF-16) .
    * Multe tipuri de fișiere suportă doar caractere de 1 octet în Strings și, prin urmare, au nevoie de acest atribut pentru a identifica un asociat
         [charset (Pagina de cod AKA) ](https://en.wikipedia.org/wiki/Code_page) care definește modul de a cartografia cele 256 de valori posibile unui set de 256 de caractere extrase din setul de caractere UCS-2 și/sau din sistemul de codificare, de exemplu, [UTF-8](https://en.wikipedia.org/wiki/UTF-8)   (care necesită între 1 și 4 octeți per caracter) .
    * Valorile pentru \\_Encoding sunt insensibile.
    * Teoretic, ERDDAP™ ar putea sprijini \\_Encoding identificatori de la [această listă IANA](https://www.iana.org/assignments/character-sets/character-sets.xhtml) , dar în practică, ERDDAP™ în prezent doar sprijină
        * ISO-8859-1 (Notă că are brichete, nu subliniază) , care are avantajul că este identic cu primele 256 de caractere ale Unicode, și
        * UTF-8.
    * La citirea fișierelor sursă, valoarea implicită este ISO-8859-1, cu excepția fișierelor netcdf-4, unde implicitul este UTF-8.
    * Aceasta este o problemă problematică în curs de desfășurare, deoarece multe fișiere sursă folosesc carsete sau codări care sunt diferite de ISO-8859-1, dar nu identifică charset sau codare. De exemplu, multe fișiere sursă de date au unele metadate copiate și lipite de Microsoft Word pe Windows și astfel au hyphens fantezie și apostrophes dintr-un charset specific Windows în loc de hyphens ASCII și apostrophes. Aceste personaje apar apoi ca personaje ciudate sau "? " in ERDDAP .
         
###### AccessBaseUrl{#fileaccessbaseurl} 
*    ** [AccessBaseUrl](#fileaccessbaseurl) și AccessSuffix** sunt foarte rar utilizate atribute care nu sunt de la orice standard. Dacă o coloană a tabelului EDD are nume de fișiere web accesibile (De exemplu, imagini, video sau fișiere audio) , puteți adăuga
```
    <att name="fileAccessBaseUrl">*someBaseURL*</a>  
```
pentru a specifica URL-ul de bază (se încheie cu /) necesare pentru a face numele de fișier în URL-uri complete. În cazuri neobișnuite, cum ar fi atunci când o coloană are trimiteri la fișiere .png dar valorile lipsesc ".png," puteți adăuga
```
    <att name="fileAccessSuffix">*someSuffix*</a>  
```
(de exemplu,&lt;att name="fileAccessSuffice.png&lt;/a&gt;)
să specifice un sufix care trebuie adăugat pentru a face numele de fișier în URL-uri complete. Atunci pentru .htmlTable răspunsuri; ERDDAP™ va arăta numele fișierului ca un link la URL-ul complet (baza Url plus numele fișierului plus sufixul) .

Dacă vrei ERDDAP™ pentru a servi fișierele aferente, face un separat [Tabel EDDFromFileNames](#eddtablefromfilenames) Set de date pentru aceste fișiere (poate fi un set de date privat) .
    
###### AccessArchive Url{#fileaccessarchiveurl} 
*    [ **AccessArchive Url** ](#fileaccessarchiveurl) este un atribut foarte rar utilizat, care nu este de la orice standard. Dacă o coloană a tabelului EDD are nume de fișiere web accesibile (De exemplu, imagini, video sau fișiere audio) care sunt accesibile prin intermediul unei arhive (de exemplu, .zip fișier) accesibil printr-un URL, utilizare&lt;att name="fileAccessArchiveUrl [59] *TheURL* &lt;/att&gt; pentru a specifica URL-ul pentru arhivă.
    
Dacă vrei ERDDAP™ pentru a servi fișierul arhivă, face un separat [Tabel EDDFromFileNames](#eddtablefromfilenames) Set de date pentru fișierul respectiv (poate fi un set de date privat) .
    
######  ioos\\_category  {#ioos_category} 
*    [ ** ioos\\_category ** ](#ioos_category) -- Acesta este un atribut variabil necesar dacă&lt;variabileMustHaveIoosCategoria&gt; este setat la adevărat (implicit) în [setup.xml](/docs/server-admin/deploy-install#setupxml) ; altfel, este OPTIONAL.
De exemplu,&lt;att name=" ioos\\_category "&gt;Salinitatea&lt;/att&gt;
Categoriile sunt din [ NOAA Sistemul integrat de observare a oceanelor (IOOS) ](https://ioos.noaa.gov/) .
    
    *    (Ca de scris acest) Nu suntem conştienţi de definiţiile formale ale acestor nume.
    * Numele de bază sunt de la Zdenka Willis .ppt "Integrated Ocean Observating System (IOOS)   NOAA 's Approach to Building a Initial Operating capacity' and from the [US IOOS Plan](https://www.iooc.us/wp-content/uploads/2010/11/US-IOOS-Blueprint-for-Full-Capability-Version-1.0.pdf)   (pagina 1-5) .
    * Este probabil ca această listă să fie revizuită în viitor. Dacă aveţi cereri, trimiteţi-i un e-mail lui Chris. John la Noaa.gov.
    *    ERDDAP™ susține o listă mai mare de categorii decât IOOS face pentru că Bob Simons adăugat nume suplimentare (mai ales pe baza numelor de domenii stiintifice, de exemplu, Biologie, Ecologie, Meteorologie, Statistica, Taxonomie) pentru alte tipuri de date.
    * Valorile actuale valabile în ERDDAP™ sunt Bathymtry, Biology, Bottom Character, CO2, Colored Dizolvated Organic Matter, Contaminants, Curents, Dizolvat Nutrients, Dizolvat O2, Ecologie, Fish Abundance, Fish Species, Heat Flux, Hydroology, Ice Distribution, Identifier, Location, Meteorology, Ocean Color, Optical Properties, Other, Patogens, Phitoplancton Species, Pressure, Productivitate, Quality, Salinity, Sea Level, Statistics, Stream Flow, Surface Waves, Taxononomie, Temperature, Time, Total Suspended Matter, Necunoscut, Wind, Zooplankton Species, and Zooplankton Abundance.
    * Există o suprapunere și ambiguitate între termeni diferiți -- faceți tot posibilul.
    * Dacă adăugaţi ioos\\_category la lista&lt; categoryAttributes &gt; în ERDDAP 's [setup.xml](/docs/server-admin/deploy-install#setupxml) fișier, utilizatorii pot găsi cu ușurință seturi de date cu date similare prin intermediul ERDDAP 's "Caută date pe categorii" pe pagina principală.
         [Încercaţi să utilizaţi ioos\\_category să caute seturi de date de interes.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000) 
    * Nu a fost [o discuție despre ERDDAP™ şi ioos\\_category în ERDDAP™ Google Group.](https://groups.google.com/forum/#!topic/erddap/TnwbgzpSS0w) 
    
Ai putea fi tentat să setați&lt;variabileMustHaveIoosCategoria&gt; să fals astfel încât acest atribut nu este necesar. ("Pfft&#33; Ce-mi pasă mie?") Unele motive pentru a lăsa să fie adevărat (implicit) şi utilizare ioos\\_category sunt:
    
    * Dacă setup.xml&lt;variabileCategoria MustHaveIoos&gt; este setat la adevărat, [GenereazăSeturi de dateXml](#generatedatasetsxml) întotdeauna creează/sugerează ioos\\_category atribut pentru fiecare variabilă din fiecare set de date nou. Deci, de ce nu-l lăsați în?
    *    ERDDAP™ permite utilizatorilor să caute seturi de date de interes pe categorii. ioos\\_category este o categorie de căutare foarte utilă deoarece ioos\\_categorii (de exemplu, temperatura) sunt destul de largi. Acest lucru face ioos\\_category mult mai bine în acest scop decât, de exemplu, FC mult mai fin standard\\_name s (care nu sunt atât de bune în acest scop din cauza tuturor sinonimelor și variații ușoare, de exemplu, mare\\_suprafață\\_temperatură versus mare\\_apă\\_temperatură) .
(Utilizarea ioos\\_category în acest scop este controlat de&lt; categoryAttributes &gt; în fișierul setup.xml.)
         [Încercaţi să utilizaţi ioos\\_category să caute seturi de date de interes.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000) 
    * Aceste categorii sunt din [ NOAA Sistemul integrat de observare a oceanelor (IOOS) ](https://ioos.noaa.gov/) . Aceste categorii sunt fundamentale pentru descrierea IOOS a misiunii IOOS. Dacă vă aflaţi în NOAA , suport ioos\\_category este un bun Unu... NOAA lucru de făcut. (Uita-te la asta [Unu. NOAA video](https://www.youtube.com/watch?v=nBnCsMYm2yQ) şi fii inspirat&#33;) Dacă sunteți într-o altă agenție americană sau internațională, sau să lucrați cu agenții guvernamentale, sau să lucrați cu alte Ocean Observating System, nu este o idee bună să cooperați cu biroul U.S. IOOS?
    * Mai devreme sau mai târziu, s-ar putea dori un alt ERDDAP™ pentru a vă conecta la seturile de date prin intermediul [ EDDGrid FromErddap](#eddfromerddap) şi [Tabel EDD FromErddap](#eddfromerddap) . Dacă celălalt ERDDAP™ necesită ioos\\_category , seturi de date trebuie să aibă ioos\\_category pentru EDDGrid De la Erddap şi EDD Table FromErddap la muncă.
    * Este mult mai uşor psihologic de a include ioos\\_category atunci când creați setul de date (Este doar un alt lucru care ERDDAP™ cere adăugarea setului de date la ERDDAP ) , decât să-l adăugați după fapt (dacă te-ai decis să-l folosească în viitor) .
         
######  long\\_name  {#long_name} 
*    [ ** long\\_name ** ](#long_name)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) , [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) şi [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standarde privind metadatele) este un atribut variabil RECOMANDAT în ERDDAP . De exemplu,
    ```
        <att name="long\\_name">Eastward Sea Water Velocity</att>
    ```
    *    ERDDAP™ utilizează long\\_name pentru etichetarea axelor pe grafice.
    * Cele mai bune practici: Capitalizează cuvintele din long\\_name ca si cum ar fi un titlu (valorifica primul cuvânt și toate cuvintele non-article) . Nu includeţi unităţile din long\\_name . Numele lung nu ar trebui să fie foarte lung (de obicei,&lt;20 de caractere), dar ar trebui să fie mai descriptive decât [ destinationName ](#destinationname) , care este adesea foarte concis.
    * Dacă " long\\_name " nu este definit în variabila [sursăAtribute](#variable-addattributes) sau&lt; addAttributes &gt;, ERDDAP™ va genera prin curățarea [ standard\\_name ](#standard_name)   (dacă este prezent) sau destinationName .
         
######  missing\\_value  {#missing_value} 
*    [ ** missing\\_value ** ](#missing_value) şi **\\_Fill Valoare**   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) şi [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) ) sunt atribute variabile care descriu un număr (De exemplu, -9999) care este utilizat pentru a reprezenta o valoare lipsă. De exemplu,

>  &lt;att name="missing\\_value" [type="double"](#attributetype)\\>-9999&lt;/att>  

Pentru variabilele String, implicit pentru ambele este "" (șirul gol) .
Pentru variabilele numerice, implicit pentru ambele este NaN.
*    ERDDAP™ sprijină ambele missing\\_value și \\_FillValue, deoarece unele surse de date le atribuie sensuri ușor diferite.
* Dacă sunt prezente, acestea ar trebui să fie de același tip de date cu variabila.
* Dacă datele sunt ambalate cu [ scale\\_factor și/sau add\\_offset ](#scale_factor) , missing\\_value şi valorile FillValue trebuie, de asemenea, ambalate. În mod similar, pentru o coloană cu date de string/timp valori care utilizează un local [ time\\_zone ](#time_zone) , missing\\_value și \\_FillValue ar trebui să utilizeze fusul orar local.
* Dacă o variabilă utilizează aceste valori speciale, missing\\_value și/sau atributele \\_FillValue sunt obligatorii.
* Pentru [variabile de timp și de timp](#time-units)   (dacă sursa este siruri de caractere sau numeric) , missing\\_value s și \\_FillValues apar ca "" (șirul gol) atunci când timpul este scris ca o coardă și ca NaN atunci când timpul este scris ca o dublură. Valorile sursă pentru missing\\_value și \\_FillValue nu va apărea în metadatele variabilei.
* Pentru variabilele String, ERDDAP™ întotdeauna convertește orice missing\\_value s sau \\_FillValue date valori în "" (șirul gol) . Valorile sursă pentru missing\\_value și \\_FillValue nu va apărea în metadatele variabilei.
* Pentru variabile numerice:
ă missing\\_value și \\_FillValue va apărea în metadatele variabilei.
Pentru unele formate de date de ieșire, ERDDAP™ va lăsa aceste numere speciale intacte, de exemplu, veți vedea -9999.
Pentru alte formate de date de ieșire (în special formate de tip text, cum ar fi .csv și .htmlTable ) , ERDDAP™ va înlocui aceste numere speciale cu NaN sau ""
* Unele tipuri de date au markeri de valoare care nu trebuie identificaţi explicit cu missing\\_value sau atributele \\_FillValue: variabilele float și dublu au NaN (Nu este un număr) , Valorile string folosesc șir gol, și valorile de Char au caracter \\uffff   (caracter #65535, care este valoarea Unicode pentru Nu un caracter) . Tipurile de date Integer nu au markere de valoare lipsă inerente.
* Dacă o variabilă întreg are o valoare lipsă (de exemplu, o poziție goală într-un fișier .csv) , ERDDAP™ va interpreta valoarea definită missing\\_value sau \\_FillValue pentru acea variabilă. Dacă niciunul nu este definit, ERDDAP™ va interpreta valoarea ca valoare lipsă implicită pentru tipul de date respectiv, care este întotdeauna valoarea maximă care poate fi deținută de tipul de date respectiv:
127 pentru variabilele octet, 32767 pentru scurt, 2147483647 pentru int, 9223372036854775807 pentru mult timp,
255 pentru ubyte, 65535 pentru ushort, 4294967295 pentru uint și 1844667440737095511615 pentru ulong.
######  ADD \\_FillValue ATTRIBUTES ?{#add-_fillvalue-attributes} 
*    [ ADD \\_FillValue ATTRIBUTES ?](#add-_fillvalue-attributes)   
De fiecare dată ERDDAP™ încarcă un set de date, verifică dacă variabilele cu tipuri de date de sursă întregi au o definiție missing\\_value sau atribut \\_FillValue. Dacă o variabilă nu, atunci ERDDAP™ imprimă un mesaj în fișierul jurnal (începând cu "Add \\_FillValue Attribute?") recomandarea ERDDAP™ administrator adăugați un \\_Fill Atributul valorii pentru această variabilă în datasets.xml . Este foarte util pentru fiecare variabilă să aibă un \\_FillValue sau missing\\_value deoarece valorile lipsă sunt întotdeauna posibile, de exemplu, dacă un anumit fișier dintr-un set de date nu are o anumită variabilă; ERDDAP™ trebuie să poată prezenta acea variabilă ca având toate valorile lipsă pentru acea variabilă. Dacă decideți că o variabilă nu ar trebui să aibă un atribut \\_FillValue, puteți adăuga
    &lt;att names="\\_FillValue 2016/13null&lt;/att&gt; în schimb, care va suprima mesajul pentru că datasetID + Combinație variabilă în viitor.
    
De fiecare dată ERDDAP™ începe, colectează toate aceste recomandări într-un mesaj care este scris în fișierul jurnal (începând cu " ADD \\_FillValue ATTRIBUTES ?") , prin e-mail ERDDAP™ administrator și scris într-un fișier de date CSV în \\[ Big ParentDirectory \\] /loguri/dosar. Dacă doriți, puteți utiliza programul GenerateDateSXml (și opțiunea AddFillValueAttributes) să aplice toate sugestiile din dosarul CSV datasets.xml Dosar. Pentru oricare dintre datasetID / Combinații variabile în acel fișier, dacă decideți că nu este nevoie să adăugați atributul atribuit, puteți schimba atributul la&lt;att names="\\_FillValue 2016/13null&lt;/att&gt; pentru a suprima recomandarea pentru că datasetID + Combinație variabilă în viitor.
    
E important&#33;
Aşa cum a spus Bob de multe ori: ar fi rău (şi jenant.) dacă unele dovezi ale încălzirii globale au fost cauzate de valori lipsă neidentificate în date (de exemplu, valori ale temperaturilor de 99 sau 127 grade C care ar fi trebuit să fie marcate ca valori lipsă și, prin urmare, să fi modificat statisticile medii și/sau medii mai mari) .

* \\_FillValue și missing\\_value valorile pentru o anumită variabilă din diferite fișiere sursă trebuie să fie coerente; în caz contrar, ERDDAP™ va accepta fișiere cu un set de valori și respinge toate celelalte fișiere ca "Fișiere rele." Pentru a rezolva problema,
    * În cazul în care fișierele sunt în rețea .nc fișiere, puteți utiliza [ EDDGrid De la NCFilesDespachetat](#eddgridfromncfilesunpacked) .
    * Dacă fișierele sunt fișiere de date tabulare, puteți utiliza EDDtableFrom...Files ' [standardizează Ce?](#standardizewhat) pentru a spune ERDDAP pentru a standardiza fișierele sursă ca acestea sunt citite în ERDDAP .
    * Pentru probleme mai grele, puteți folosi [NcML](#ncml-files) sau [ NCO ](#netcdf-operators-nco) pentru a rezolva problema.
             
######  scale\\_factor  {#scale_factor} 
*    [ ** scale\\_factor ** ](#scale_factor)   (implicit = 1) şi ** add\\_offset **   (implicit = 0)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) şi [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) ) sunt atribute variabile OPTIONALe care descriu datele ambalate într-un tip de date mai simplu printr-o simplă transformare.
    * Dacă sunt prezente, tipul lor de date este diferit de tipul de date sursă și descrie tipul de date al valorilor de destinație.
De exemplu, o sursă de date ar fi putut stoca valori ale datelor float cu o cifră zecimală ambalată ca int-uri scurte (int16) , folosind scale\\_factor = 0,1 și add\\_offset = 0. De exemplu,

    >    &lt;att name="scale\\_factor" [type="float"](#attributetype)\\>0.1&lt;/att>  
    >    &lt;att name="add\\_offset" [type="float"](#attributetype)\\>0&lt;/att>  

În acest exemplu, ERDDAP™ va despacheta datele și le va prezenta utilizatorului ca valori ale datelor floate.
    * Dacă sunt prezente, ERDDAP™ va extrage valorile din aceste atribute, va elimina atributele și va despacheta automat datele pentru utilizator:
destinație Valoare = sursă Valoare \\ * scale\\_factor + add\\_offset   
Sau, a declarat un alt mod:
despachetatValue = ambalat Valoare \\ * scale\\_factor + add\\_offset 
    * ă scale\\_factor şi add\\_offset valorile pentru o anumită variabilă din diferite fișiere sursă trebuie să fie coerente; în caz contrar, ERDDAP™ va accepta fișiere cu un set de valori și respinge toate celelalte fișiere ca "Fișiere rele." Pentru a rezolva problema,
        * În cazul în care fișierele sunt în rețea .nc fișiere, puteți utiliza [ EDDGrid De la NCFilesDespachetat](#eddgridfromncfilesunpacked) .
        * Dacă fișierele sunt fișiere de date tabulare, puteți utiliza EDDtableFrom...Files ' [standardizează Ce?](#standardizewhat) pentru a spune ERDDAP pentru a standardiza fișierele sursă ca acestea sunt citite în ERDDAP .
        * Pentru probleme mai grele, puteți folosi [NcML](#ncml-files) sau [ NCO ](#netcdf-operators-nco) pentru a rezolva problema.
             
######  standard\\_name  {#standard_name} 
*    [ ** standard\\_name ** ](#standard_name)   (de la [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) standard de metadate) este un atribut variabil RECOMANDAT în ERDDAP . CF menține lista permiselor [Denumire standard CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) . De exemplu,
    ```
        <att name="standard\\_name">eastward\\_sea\\_water\\_velocity</att>
    ```
    * Dacă adăugaţi standard\\_name la atributele variabilelor și adăugare standard\\_name la lista&lt; categoryAttributes &gt; în ERDDAP 's [setup.xml](/docs/server-admin/deploy-install#setupxml) fișier, utilizatorii pot găsi cu ușurință seturi de date cu date similare prin intermediul ERDDAP 's "Caută date pe categorii" pe pagina principală.
    * Dacă specificați un CF standard\\_name pentru o variabilă, atributul unităților pentru variabila nu trebuie să fie identic cu unitățile canonice specificate pentru denumirea standard în tabelul de nume standard CF, dar unitățile trebuie să fie convertibile la unitățile canonice. De exemplu, toate FC legate de temperatură standard\\_name s au "K" (Kelvin) ca Unităţile Canonice. Deci, o variabilă cu o temperatură legată standard\\_name TREBUIE să aibă unități de K, grad\\_C, grad\\_F, sau unele varianta UDUnits ale acestor nume, deoarece acestea sunt toate inter-convertibile.
    * Cele mai bune practici: Parte din puterea [vocabulare controlate](https://en.wikipedia.org/wiki/Controlled_vocabulary) provine din utilizarea doar a termenilor din listă. Vă recomandăm să respectaţi termenii definiţi în vocabularul controlat şi vă recomandăm să nu inventaţi un termen dacă nu există unul potrivit în listă. Dacă aveți nevoie de termeni suplimentari, a se vedea dacă comitetul de standarde le va adăuga la vocabularul controlat.
    *    standard\\_name valorile sunt singurele valori ale atributelor CF care sunt sensibile la caz. Întotdeauna sunt mici. Începând cu ERDDAP™ v1.82, GenerateDatasets va converti litere mari la litere mici. Și când un set de date este încărcat în ERDDAP , litere de sus sunt schimbate în tăcere în litere mici.
         
######  time\\_precision  {#time_precision} 
*    time\\_precision este un atribut OPTIONAL utilizat de ERDDAP™   (și fără standarde de metadate) pentru [variabile de timp și de timp](#time-units) , care pot fi incluse în seturi de date grupate sau în seturi de date tabelare și în axisVariable s sau dataVariable c. De exemplu,
    ```
        <att name="time\\_precision">1970-01-01</att>  
    ```
     time\\_precision specifică precizia care trebuie utilizată ori de câte ori ERDDAP™ formatează valorile timpului din acea variabilă ca șiruri de caractere pe pagini web, inclusiv .htmlTable răspunsuri. În formatele de fișiere unde ERDDAP™ formate ori ca siruri de caractere (de exemplu, .csv și .json ) , ERDDAP™ utilizează numai time\\_precision - format specificat dacă include secunde fracţionale; altfel, ERDDAP™ folosește 1970-01-01T00:00:00 Format Z.
* Valorile valabile sunt 1970-01, 1970-01-01, 1970-01-01T00Z, 1970-01-01T00:00Z, 1970-01-01T00:00:00Z (implicit) , 1970-01-01T00:00.0Z, 1970-01-01T00:00.00Z, 1970-01-01T00:00.000Z. \\[ 1970 nu este o opțiune pentru că este un singur număr, așa ERDDAP™ nu pot şti dacă este un şir formatat de timp (un an) sau dacă este un număr de secunde de la 1970-01-01T00:00:00Z. \\] 
* Dacă time\\_precision nu este specificat sau valoarea nu este egalată, valoarea implicită va fi utilizată.
* Aici, ca în alte părți ale ERDDAP™ , orice câmpuri din timpul formatat care nu sunt afișate se presupune a avea valoarea minimă. De exemplu, 1985-07, 1985-07-01, 1985-07-01T00Z, 1985-07-01T00:00Z şi 1985-07-01T00:00:00 Z sunt considerate toate echivalente, deși cu diferite niveluri de precizie implicate. Acest lucru se potrivește [ISO 8601:2004 "extended" Specificarea formatului de timp](https://www.iso.org/iso/date_and_time_format) .
*    **ATENŢIONARE:** Trebuie să utilizaţi numai o cantitate limitată time\\_precision dacă **toate** a valorilor de date pentru variabilă au numai valoarea minimă pentru toate câmpurile care sunt ascunse.
    * De exemplu, puteți utiliza un time\\_precision din 1970-01-01 în cazul în care toate valorile datelor au oră=0, minute = 0 și a doua valoare = 0 (de exemplu 2005-03-04T00:00Z și 2005-03-05T00:00:00Z) .
    * De exemplu, nu folosi un time\\_precision din 1970-01-01 dacă există valori non-0 oră, minut sau secunde, (de exemplu 2005-03-05T12:00:00Z) pentru că valoarea non-default a orei nu ar fi afișată. În caz contrar, în cazul în care un utilizator solicită toate datele cu timpul=2005-03-05, cererea va eșua neașteptat.
             
######  time\\_zone  {#time_zone} 
*    [ ** time\\_zone ** ](#time_zone) 
    *    time\\_zone este un atribut OPTIONAL utilizat de ERDDAP™   (și fără standarde de metadate) pentru [variabile de timp și de timp](#time-units) , care pot fi incluse în seturi de date grupate sau în seturi de date tabelare.
    * Implicit este " Zulu " (care este versiunea modernă a zonei timpului a GMT) .
    * Informaţii de fond: "timp compensat" (De exemplu, Pacific Standard Time, -08:00, GMT-8) sunt fixe, specifice, compensare în raport cu Zulu   (GMT) . În schimb, "zonele temporale" sunt lucruri mult mai complexe care sunt afectate de Daylight Saving (de exemplu, "US/Pacific") , care au avut reguli diferite în locuri diferite în momente diferite. Zonele orare au întotdeauna nume, deoarece nu pot fi rezumate printr-o simplă valoare compensată. (a se vedea coloana "Denumirile bazei de date TZ" din tabel la [https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) ) . ERDDAP 's time\\_zone atributul vă ajută să se ocupe de datele locale de timp din unele fus orar (De exemplu, 1987-03-25T17:32:05 Pacific Timp) . Dacă aveți șir sau date numerice privind timpul cu a (fix) timpul de compensare, ar trebui pur și simplu ajustați datele la Zulu   (care este ceea ce ERDDAP™ Vreau) prin specificarea unui timp de bază diferit în atributul unităților (De exemplu, "ore din 1970-01-01T08:00Z," notați T08 pentru a specifica timpul de compensare) , și întotdeauna verificați rezultatele pentru a vă asigura că obțineți rezultatele dorite.
    * Pentru variabilele timbru cu date sursă de la Strings, acest atribut vă permite să specificați o zonă de timp care conduce ERDDAP™ pentru a converti timpul local-zonă de sursă ori (unele în timp standard, unele în lumina zilei de economisire a timpului) în Zulu ori (care sunt întotdeauna în timp standard) . Lista numelor de fus orar valabile este probabil identică cu lista din coloana TZ la [https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) . Zonele orare comune din SUA sunt: SUA/Hawaii, SUA/Alaska, SUA/Pacific, SUA/Mountain, SUA/Arizona, SUA/Central, SUA/Est.
    * Pentru variabilele de timp cu date de sursă numerice, puteți specifica " time\\_zone " atribut, dar valoarea trebuie să fie " Zulu "sau "UTC." Dacă aveți nevoie de sprijin pentru alte zone de timp, vă rugăm să trimiteți un e-mail lui Chris. John la Noaa.gov.
         
###### moștenire_timp_adjust{#legacy_time_adjust} 
*    [ **moștenire_timp_adjust** ](#legacy_time_adjust) Începând cu ERDDAP™ 2.29.0, variabilele timpului funcţionează uşor diferit. În cazuri rare, cel mai probabil atunci când se utilizează `zile de la` și cu un an înainte de 1582 (Deci... `zile de la 0000-01-01` sau `zile de la 1-1-1 00:00:0.0` ) va trebui să indicaţi pentru o ajustare la data variabilei. Motivul pentru acest lucru este ERDDAP™ foloseste biblioteca Java.time pentru a gestiona datele interne. Există unele seturi de date care necesită utilizarea vechii biblioteci GregorianCalendar pentru a îndura datele corecte.

```
<axisVariable>
    <sourceName>time</sourceName>
    <destinationName>time</destinationName>
    <!-- sourceAttributes>
        ... removed several lines ...
        <att name="units">days since 1-1-1 00:00:0.0</att>
    </sourceAttributes -->
    <addAttributes>
        ... removed several lines ...
        <att name="legacy_time_adjust">true</att>
    </addAttributes>
</axisVariable>
```

###### unități{#units} 
*    [ **unități** ](#units)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) , [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) şi [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) standard de metadate) definește unitățile valorilor datelor. De exemplu,
    ```
        <att name="units">degree\\_C</att>
    ```
    * "Unități" este necesar fie ca sursăAttribute, fie ca addAttribute pentru "time" variabile și este RECOMANDAT în mod puternic pentru alte variabile ori de câte ori este cazul (Care este aproape întotdeauna) .
    * În general, vă recomandăm [UDUNTI](https://www.unidata.ucar.edu/software/udunits/) \\-unităţi compatibile care sunt cerute de [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) şi [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) standarde.
    * Un alt standard comun este [UCUM](https://unitsofmeasure.org/ucum.html) -- Codul Unificat pentru Unităţi de Măsură. [ OGC ](https://www.ogc.org/) servicii precum: [ SOS ](https://www.ogc.org/standards/sos) , [ WCS ](https://www.ogc.org/standards/wcs) , și [ WMS ](https://www.ogc.org/standards/wms) necesită UCUM şi adesea se referă la UCUM ca UOM (Unități de măsură) .
    * Vă recomandăm să utilizați un standard de unități pentru toate setările de date din ERDDAP . Ar trebui să spui ERDDAP™ ce standard utilizaţi cu&lt;unități\\_standard&gt;, în [setup.xml](/docs/server-admin/deploy-install#setupxml) Dosar.
    * Unitățile pentru o anumită variabilă din diferite fișiere sursă trebuie să fie coerente. Dacă aveți o colecție de fișiere de date în care un subset de fișiere utilizează valori diferite de unități decât unul sau mai multe subseturi de fișiere (de exemplu,
"zile din 1985-01-01" versus "zile din 2000-01-01,"
"grade\\_Celsius" versus "deg\\_C" sau
"noduri" versus "m/s") trebuie să găsiți o modalitate de a standardiza valorile unităților, altfel, ERDDAP™ va încărca doar un subset de fișiere. Gândiți-vă: dacă un fișier are unități windSpeed=note și altul are unități windSpeed=m/s, atunci valorile din cele două fișiere nu ar trebui incluse în același set de date agregate.
        * În cazul în care fișierele sunt în rețea .nc fișiere, în multe situații puteți utiliza [ EDDGrid De la NCFilesDespachetat](#eddgridfromncfilesunpacked) .
        * În cazul în care fișierele sunt fișiere de date tabulare, în multe situații puteți utiliza EDDtableFrom...Files ' [standardizează Ce?](#standardizewhat) pentru a spune ERDDAP pentru a standardiza fișierele sursă ca acestea sunt citite în ERDDAP .
        * Pentru probleme mai grele, puteți folosi [NcML](#ncml-files) sau [ NCO ](#netcdf-operators-nco) pentru a rezolva problema.
    * Standardul CF secțiunea 8.1 spune că dacă datele unei variabile sunt ambalate prin intermediul [ scale\\_factor și/sau add\\_offset ](#scale_factor) , "Unitatile unei variabile ar trebui sa fie reprezentative pentru datele despachetate."
    *    [Pentru variabile de timp și de timp,](#time-units) fie variabila [sursăAtribute](#variable-addattributes) sau&lt; addAttributes &gt; (care are prioritate) TREBUIE [unități](#units) care este fie
        
        * Pentru variabilele axei temporale sau variabilele datelor temporale cu date numerice: [UDUNTI](https://www.unidata.ucar.edu/software/udunits/) \\-sfoara compatibila (cu formatul *unități* din *timp de bază* ) descrierea modului de interpretare a valorilor timpului de sursă (De exemplu, secunde din 1970-01-01T 00:00:00Z) .
            
         *unități* poate fi oricare dintre:
        ```
            ms, msec, msecs, millis, millisec, millisecs, millisecond, milliseconds,  
            s, sec, secs, second, seconds, m, min, mins, minute, minutes, h, hr, hrs, hour, hours,  
            d, day, days, week, weeks, mon, mons, month, months, yr, yrs, year, or years.  
        ```
Tehnic, ERDDAP™ NU urmează UDUNITS standard la conversie "years since" şi "months since" valorile timpului la "seconds since" . ă UDUNITS standard definește un an ca valoare fixă, unică: 3.15569259747e7 secunde. Şi... UDUNITS definește o lună ca an/12. Din păcate, majoritatea/toate seturile de date pe care le-am văzut că utilizarea "years since" sau "months since" intenționează în mod clar valorile să fie ani calendaristici sau luni calendaristice. De exemplu, 3 "months since 1970-01-01" este destinat, de obicei, să însemne 1970-04-01. Deci, ERDDAP™ interpreţi "years since" şi "months since" ca ani calendaristici și luni și nu urmează strict UDUNITS standard.
            
ă *timp de bază* trebuie să fie un ISO 8601:2004 (E) șir de date formatate ( yyyy-MM-dd 'T'HH:mm:SSZ, de exemplu, 1970-01-01T00:00:00Z) , sau o anumită variație a acestui (de exemplu, cu piese lipsă la sfârșit) . ERDDAP™ încearcă să lucreze cu o gamă largă de variante ale acestui format ideal, de exemplu, "1970-1-1 0:0:0." În cazul în care informațiile despre fusul orar lipsește, se presupune că este Zulu fusul orar (AKA GMT) . Chiar dacă se specifică o altă compensare temporală, ERDDAP™ Niciodată nu foloseşte Daylight Saving Time. Dacă bazaTime folosește un alt format, trebuie să utilizați&lt; addAttributes &gt; să specifice un şir nou de unităţi care utilizează o variaţie a ISO 8601:2004 (E) format (de exemplu, zile de schimbare de la 1 ianuarie 1985 în zile din 1985-01-01.
        
Puteți testa ERDDAP capacitatea de a face față unui anumit *unități* din *timp de bază* cu ERDDAP 's [Convertor timp](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) . Din fericire, puteți conecta la un număr (prima dată valoarea de la sursa de date?) și un șir de unități, faceți clic pe Conversie, și ERDDAP™ va putea fi transformat într-un ISO 8601:2004 (E) Sirul de date formatate. Convertorul va returna un mesaj de eroare dacă şirul unităţilor nu poate fi recunoscut.

###### Unități de timp pentru coarde{#string-time-units} 
*    [Pentru unitățile atribute pentru variabilele datelor de timp sau de timp cu date String,](#string-time-units) trebuie să specificaţi [Java. timp.DateTimeFormaterie](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) model (care este în mare parte compatibil cu Java.text. SimpleDateFormat) care descrie cum să interpreteze timpurile corzilor.
    
Pentru formatele de timp utilizate în mod obișnuit, care sunt variații ale ISO 8601:2004 (E) format standard (De exemplu, 2018-01-02T00:00:00Z) , puteți specifica variațiile yyyy-MM-dd 'T'HH:mm:ssZ, de exemplu, utilizați yyyy-MM-dd în cazul în care timpul șir are doar o dată. Pentru orice format care începe cu aaaa-M, ERDDAP folosește un parser special care este foarte iertător de variații minore în format. Parser-ul se poate ocupa de zonele de timp în formatul "Z," "UTC," "GMT," ±XX:XX, ±XXXX și ±XX formate. Dacă nu sunt specificate părți ale datei (de exemplu, minute și secunde) , ERDDAP™ presupune cea mai mică valoare pentru acest câmp (de exemplu, în cazul în care nu sunt specificate secunde, se presupune că se înregistrează secunde=0) .
    
Pentru toate celelalte formate de timp de string, trebuie să specificaţi cu precizie un şir de timp compatibil cu dataTimeFormatetter. Ca yyyy-MM-dd 'T'HH:mm:ssZ, aceste siruri de caractere sunt construite din caractere care identifică un anumit tip de informație din șirul de timp, de exemplu, m înseamnă minut-de-oră. Dacă repetați caracterul format de mai multe ori, acesta rafinează în continuare sensul, de exemplu, m înseamnă că valoarea poate fi specificată prin orice număr de cifre, mm înseamnă că valoarea trebuie specificată cu 2 cifre. ă Java documentaţia pentru DataTimeFormaterie este o imagine de ansamblu brută şi nu face aceste detalii clare. Deci, aici este o listă de variații de caractere format și sensul lor în ERDDAP™   (care este uneori ușor diferit de Java Data'sTimeFormatery) :
    
     | Caractere | Exemple | Semnificație | 
     | --- | --- | --- | 
     | U, y, Y | \\-4712, 0, 1, 10, 100, 2018 | un număr de an, orice număr de cifre. ERDDAP™ nu (an-of-era) şi Y (săptămână pe bază de an, pentru că acest lucru este adesea utilizat în mod greșit în loc de y) ca u, [numărul astronomic al anului](https://en.wikipedia.org/wiki/Astronomical_year_numbering) . Anii astronomici sunt pozitivi sau negativi întregi care nu folosesc BCE (BC) sau CE (AD) era designers: 2018=2018CE, ..., 2=2CE, 1=1CE, 0=1BCE, -1=2BCE, -2=3BCE, ... | 
     | Uuuu, aaaa, AAAA | \\-4712, 0000, 0001, 0010, 0100, 2018 | un număr astronomic de 4 cifre (ignorarea orice precedent '-')   | 
     | Pr | 1, 01, 12 | un număr de lună, orice număr de cifre (1 = ianuarie)   | 
     | MM | 01, 12 | a 2 cifre (Zero căptușit) numărul lunii | 
     | MMM | Jan, Jan, JAN | a 3 litere numele lunii engleze, caz insensibil | 
     | Mmmmm | Jan, Jan, Jan, Ianuarie, January | a 3 litere sau nume complet de lună engleză, caz insensibil | 
     | d | 1, 01, 31 | un număr de zi de lună, orice număr de cifre | 
     | ♪ | 01, 31 | a 2 cifre (Zero căptușit) zi de lună. Prima " cifră" poate fi un spațiu. | 
     | D | 1, 001, 366 | zi de an, orice număr de cifre, 001=Jan 1 | 
     | DDD | 001, 366 | zi de an, 3 cifre, 001=Jan 1 | 
     | EEE | Thu, THU, Thu | o zi de 3 litere a săptămânii, valoarea este ignorată atunci când parsing | 
     | EEE | Thu, THU, Thu, joi, joi, joi | o valoare de 3 litere sau o zi întreagă de săptămână în limba engleză, caz insensibil, este ignorată atunci când se analizează | 
     | H | 0, 00, 23 | H oră-de-zi (0-23) , orice număr de cifre | 
     | HH | 00, 23 | HH oră-de-zi (00-23) , 2 cifre. Prima " cifră" poate fi un spațiu. | 
     | a | AM, AM, PM, PM | AM sau PM, caz insensibil | 
     | h | 12, 1, 01, 11 | ceas-oră-de-am-pm (12, 1, 2, ... 11) , orice număr de cifre | 
     | hh | 12, 01, 11 | ceas-oră-de-am-pm (12, 1, 2, ... 11) , 2 cifre. Prima " cifră" poate fi un spațiu. | 
     | K | 0, 1, 11 | ora-de-am-pm (0, 1, ... 11) , orice număr de cifre | 
     | KK | 00, 01, 11 | ora-de-am-pm, 2 cifre | 
     | m | 0, 00, 59 | minute-ore, orice număr de cifre | 
     | mm | 00, 59 | minute-ore, 2 cifre | 
     | s | 0, 00, 59 | al doilea de minut, orice număr de cifre | 
     | ss | 00, 59 | al doilea de minut, 2 cifre | 
     | S | 0, 000, 9, 999 | fracţiune de secundă, ca şi cum ar urma o zecimală, orice număr de cifre | 
     | SS | 00, 99 | 100 de secunde, 2 cifre | 
     | SSS | 000, 999 | mii de secunde, 3 cifre | 
     | A | 0, 0000, 86399999 | milisecundă de zi, orice număr de cifre | 
     | AAAAAAA | 00000000, 86399999 | milisecundă de zi, 8 cifre | 
     | N | 0, 00000000000000, 86399999999999 | nanosecundă de zi, orice număr de cifre. În ERDDAP™ , Acest lucru este trunchiat la nMillis. | 
     | NNNNNNNNNNNN | 00000000000000, 86399999999 | nanosecundă de zi, 14 cifre. În ERDDAP™ Acest lucru este trunchiat la nMillis. | 
     | n | 0, 00000000000, 59999999999 | nanosecundă de secundă, orice număr de cifre. În ERDDAP™ Acest lucru este trunchiat la nMillis. | 
     | Nnnnnnnnnnnnnnnnnnn | 00000000000, 59999999999 | nanosecundă de secundă, 11 cifre. În ERDDAP™ Acest lucru este trunchiat la nMillis. | 
     | XXX, ZZZ | Z, -08:00, +01:00 | o zonă temporală cu formatul "Z" sau ± (Offset pe 2 cifre) : (2 cifre minute offset) . Acest tratament *spațiu* ca + (nestandardizate) . ZZZ care sprijină "Z" nu este standard, dar tratează o eroare de utilizator comună. | 
     | XX, ZZ | Z -0800, +0100 | o zonă temporală cu formatul "Z" sau ± (Offset pe 2 cifre) : (2 cifre minute offset) . Acest tratament *spațiu* ca + (nestandardizate) . ZZ care sprijină "Z" nu este standard, dar se ocupă cu o eroare de utilizator comună. | 
     | X, Z | Z, -08, +01 | o zonă temporală cu formatul "Z" sau ± (Offset pe 2 cifre) : (2 cifre minute offset) . Acest tratament *spațiu* ca + (nestandardizate) . Z suport "Z" este non-standard, dar se ocupă cu o eroare de utilizator comun. | 
     | xxx | \\-08:00, +01:00 | a fus orar cu formatul ± (Offset pe 2 cifre) : (2 cifre minute offset) . Acest tratament *spațiu* ca + (nestandardizate) . | 
     | xx | \\-00800, +0000 | a fus orar cu formatul ± (Offset pe 2 cifre)  (2 cifre minute offset) . Acest tratament *spațiu* ca + (nestandardizate) . | 
     | x | \\- 08, +01 | a fus orar cu formatul ± (Offset pe 2 cifre) . Acest tratament *spațiu* ca + (nestandardizate) . | 
     | ' | "T," "Z," "GMT" | începutul și sfârșitul unei serii de caractere literale | 
     | ' ' (două citate unice)   | ' ' | două citate unice indică un singur citat literal | 
     |   \\[  \\]   |   \\[   \\]   | startul (" \\[ ") și se încheie (" \\] ") unei secțiuni opționale. Această notație este susținută doar pentru caractere literale și la sfârșitul șir de format. | 
     | #, &#123;, &#125; | #, &#123;, &#125; | rezervate pentru utilizare viitoare | 
     | G,L,Q,e,c,V,z,O,p |       | Aceste caractere de formatare sunt susținute de Java DataTimeFormaterie, dar în prezent nu este susținută de ERDDAP . Dacă aveți nevoie de sprijin pentru ei, e-mail Chris. John la Noaa.gov. | 
    
Note:
    
    * Într-o dată cu punctuaţie, valorile numerice pot avea un număr variabil de cifre (de exemplu, în formatul "1/2/1985," luna și data pot fi 1 sau 2 cifre) astfel încât formatul trebuie să utilizeze jetoane din 1 litere, de exemplu, M/d/aaaa, care acceptă orice număr de cifre pentru lună și dată.
    * În cazul în care numărul de cifre pentru un element este constant, de exemplu 01/02/1985, atunci se specifică numărul de cifre în format, de exemplu, MM/zz/aaaa pentru o lună de 2 cifre, data de 2 cifre și anul de 4 cifre.
    * Aceste formate sunt dificil de lucrat cu. Un format dat poate lucra pentru majoritatea, dar nu toate, siruri de timp pentru o anumită variabilă. Verificaţi întotdeauna dacă formatul specificat funcţionează conform aşteptărilor. ERDDAP pentru toate corzile timpului unei variabile.
    * Când este posibil, GenerateDatasetXml va sugera siruri de caractere format timp.
    * Dacă aveți nevoie de ajutor generarea unui șir de format, vă rugăm să trimiteți un e-mail Chris. John la Noaa.gov.

Variabila de date timp principal (pentru seturi de date tabelare) și variabila axei temporale principale (pentru seturi de date în rețea) sunt recunoscute de [ destinationName ](#destinationname) Timpul. Metadatele unităților lor trebuie să fie un șir de unități compatibile UDUnits pentru valori numerice ale timpului, de exemplu "zile din 1970-01-01" (pentru seturi de date tabulare sau grile) , sau [unități adecvate pentru timpii corzilor](#string-time-units) , de exemplu, "M/d/aaaa" (pentru seturi de date tabelare) .

Unități de timp diferite în diferite griduri .nc Fișiere - Dacă aveţi o colecţie de grilă .nc fișiere în care, pentru variabila temporală, un subset de fișiere utilizează unități de timp diferite de unul sau mai multe subseturi ale fișierelor, puteți utiliza [ EDDGrid De la NCFilesDespachetat](#eddgridfromncfilesunpacked) . Transformă valorile timpului în "seconds since 1970-01-01T00:00:00Z" la un nivel inferior, ascunde astfel diferențele, astfel încât să puteți face un set de date din colectarea de fișiere heterogene.

###### Variabile TimeStamp{#timestamp-variables} 
 [Variabile TimeStamp](#timestamp-variables) -- Orice altă variabilă ( axisVariable sau dataVariable , în EDDGrid sau Setul de date al tabelului EDD) poate fi o variabilă de timp Stamp. Variabilele de timbru temporal sunt variabile care au unități legate de timp și date de timp, dar au o&lt; destinationName &gt; altele decât timpul. Variabilele TimeStamp se comporta ca variabila de timp principala in care convertesc formatul de timp al sursei in "seconds since 1970-01-01T00:00:00Z" și/sau ISO 8601:2004 (E) format). ERDDAP™ recunoaşte timpul Variabilele timbrelor în funcție de timp " [unități](#units) " metadate, care trebuie să se potrivească acestei expresii regulate " \\[ a-zA-Z \\] + + de la + \\[ 0-9 \\] .+" (pentru data numerică Times, de exemplu, "seconds since 1970-01-01T00:00:00Z" ) sau să fie o dată Conector de timp care conține "uuuu," "aaaa" sau "AAAA" (de exemplu, " yyyy-MM-dd 'T'HH:mm:ssZ') . Dar vă rugăm să utilizați încă destinationName   "time" pentru data principală Variabila timpului.

 **Verificați întotdeauna munca pentru a fi siguri că datele de timp care apar în ERDDAP™ este datele corecte ale timpului.** Lucrul cu datele timpului este întotdeauna dificil și predispus la erori.

Vezi? [mai multe informaţii despre variabilele timpului](#destinationname) .
 ERDDAP™ are o utilitate [Schimbă un numeric Timpul până la/de la un timp de coardă](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) .
Vezi? [Cum ERDDAP™ Se ocupă de timp](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) .
         
        
######  valid\\_range  {#valid_range} 
*    [ ** valid\\_range ** , sau ** valid\\_min ** şi ** valid\\_max ** ](#valid_range) -- Acestea sunt atribute variabile OPTIONALE definite în [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) convenţii privind metadatele. De exemplu,

    >    &lt;att name="valid\\_range" [type="floatList"](#attributetype)\\>0.0 40.0&lt;/att>  

sau

    >    &lt;att name="valid\\_min" [type="float"](#attributetype)\\>0.0&lt;/att>  
    >    &lt;att name="valid\\_max" [type="float"](#attributetype)\\>40.0&lt;/att>  

    * Dacă sunt prezente, acestea ar trebui să fie de același tip de date cu variabila și să specifice valorile minime și maxime valabile ale datelor pentru variabila respectivă. Utilizatorii ar trebui să considere valorile din afara acestui interval ca fiind invalide.
    *    ERDDAP™ nu se aplică valid\\_range . A spus un alt mod: ERDDAP™ nu convertește valorile datelor în afara valid\\_range la \\_Fill Valoare sau missing\\_value . ERDDAP™ doar trece pe aceste metadate și lasă cererea până la tine.
De ce? Pentru asta sunt metadatele. Dacă furnizorul de date ar fi vrut, furnizorul de date ar fi putut converti valorile datelor în afara valid\\_range să fie \\_FillValues. ERDDAP™ nu a doua ghici furnizorul de date. Această abordare este mai sigură: dacă se demonstrează ulterior că valid\\_range a fost prea îngust sau incorect, ERDDAP™ Nu va fi şters datele.
    * Dacă datele sunt ambalate cu [ scale\\_factor și/sau add\\_offset ](#scale_factor) , valid\\_range , valid\\_min şi valid\\_max trebuie să fie tipul şi valorile de date ambalate. De când ERDDAP™ se aplică scale\\_factor şi add\\_offset atunci când încarcă setul de date, ERDDAP™ va despacheta valid\\_range , valid\\_min şi valid\\_max valori astfel încât metadatele de destinație (afișate utilizatorilor) va indica tipul și gama de date despachetate.
Sau, dacă un despachetat valid\\_range atributul este prezent, va fi redenumit valid\\_range când ERDDAP™ încarcă setul de date.
##### &lt;eliminați RVM&gt;{#removemvrows} 
* [ ** &lt;Elimină RVM&gt; ** ] (#Removemvrows) este o etichetă OPTIONALă în cadrul unei etichete datasets.xml pentru tabelul EDDFromFiles (inclusiv toate subclasele) Seturi de date, deși este utilizat numai pentru tabelul EDDDe la MultidimNcFiles. Poate avea valoare adevărată sau falsă. De exemplu, adevărat
Acest lucru elimină orice bloc de rânduri de la sfârșitul unui grup în care toate valorile sunt missing\\_value , \\_FillValue, sau CoHort ...Array valoare lipsă nativ (sau char=#32 pentru CharArrays) . Acest lucru este pentru CF DSG Multidimensional Array tip de fișier și fișiere similare. Dacă este adevărat, acest lucru face testul adecvat și, astfel, întotdeauna încarcă toate variabilele dim maxim, astfel încât poate dura timp suplimentar.
Valoarea implicită este falsă.
Recomandarea... Dacă este posibil pentru setul de date, vă recomandăm setarea MVRows la fals. Setarea MVRows elimina la adevărat poate încetini în mod semnificativ cererile, deși poate fi necesar pentru unele seturi de date.
