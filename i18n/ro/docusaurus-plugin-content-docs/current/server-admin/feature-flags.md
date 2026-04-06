# Indicatoare de caracteristici

Această pagină documentează steagurile de configurare disponibile în sistem. Aceste steaguri controlează diverse caracteristici, capacități experimentale și comportamente moștenite.

##  **Steag Lifecycle Legend** 

*  **Stabil:** Intentat ca steaguri pe termen lung pentru a permite adminilor să schimbe funcționalitatea. Sigur pentru producţie.
*  **Testare:** Caracteristici care sunt gata pentru testare. Acestea vor fi fie absolvite la "Stabil," fie vor fi stabilite în cele din urmă la valoarea lor țintă și vor fi eliminate steagul.
*  **În construcție:** În prezent, codate să fals în cod, indiferent de configurare. Funcția nu este încă gata de utilizare.

##  ** Optimizări în încercări** 

Acestea sunt steaguri susceptibile de a fi eliminate în viitor.

###  **Atingeți Thread Only WhenIthements** 

Descriere
Steagul optimizării. Dacă este adevărat, firul tactil se execută numai atunci când există elemente de procesat.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Testare | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Adăugat la 2.29.0 | 

###  **askCacheClear** 

Descriere
Activează sarcina de fundal care șterge elementele expirate din cache.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Adăugat la 2.27.0 | 

###  **ncHeadermakeFile** 

Descriere
Dacă este adevărat, serverul va genera întregul fișier NC înainte de a crea rezultatul NCheader. Noul (preferat) comportamentul atunci când fals este de a genera direct rezultatul NCheader.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Testare | 
 |   **Implicit curent**   | fals | 
 |   **Obiectiv pe termen lung**   | fals | 
 |   **Istoric**   | Adăugat la 2.29.0 | 

###  **utilizareEddReflection** 

Descriere
Activează utilizarea Java Reflectarea pentru a instanția EDD ( ERDDAP Setare date) Cursuri.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Testare | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Implicit modificat la adevărat în 2.28.0, adăugat la 2.25 | 

###  **@ info: whatsthis** 

Descriere
Permite crearea tabelelor de subset în fire de fundal pentru a îmbunătăți timpul de încărcare a seturilor de date.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Testare | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Adăugat la 2.29.0 | 

###  **UtilizareNcMetadataForFileTable** 

Descriere
Utilizare NetCDF metadate pentru a popula vizualizarea tabelului de fișiere. În special în cazul în care un fișier NC include actual_interval pentru fiecare variabilă, încărcarea setului de date poate sări peste citirea întregului fișier.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Adăugat la 2.29.0 | 

##  **** 

###  **email Este activă** 

Descriere
Controlează dacă sistemul încearcă să trimită e-mail-uri reale (De exemplu, pentru actualizările de abonament sau rapoartele de eroare) prin serverul SMTP configurat.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | fals | 
 |   **Obiectiv pe termen lung**   | Adevărat. (Dependent de admin config)   | 
 |   **Istoric**   | Moştenire | 

:::info Logic
Acest steag este calculat dinamic la pornire. Este implicit să fals cu excepția cazului în care toate acreditările SMTP necesare (gazda, port, utilizator, parola, de la adresa) sunt strict furnizate în setup.xml.
::

###  **aratăLoadErrorsOnStatusPage** 

Descriere
Determină dacă erorile detaliate privind încărcarea setului sunt afișate public pe pagina de stare.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | setați după cum se dorește | 
 |   **Istoric**   | Adăugat în 2.25 | 

###  **Dosare accesibile implicit** 

Descriere
Setează comportamentul implicit pentru dacă fișierele subiacente unui set de date pot fi accesate în serviciul fișierelor.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | fals | 
 |   **Obiectiv pe termen lung**   | fals | 
 |   **Istoric**   | Adaugat la 2.10 | 

##  **Seturi de date** 

###  **Reporneşte rapid** 

Descriere
Dacă este activat, sistemul încearcă să pornească mai repede prin sărind peste anumite verificări profunde de validare a seturilor de date în timpul inițializării.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Adaugat la 1.38 | 

###  **enableEnvParsing** 

Descriere
Activează procesarea datasets.xml fișier cu [Substitutor string](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Acest lucru are multe utilizări, inclusiv stabilirea valorilor private (cum ar fi parole) utilizarea variabilelor de mediu.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | setați după cum se dorește | 
 |   **Istoric**   | Adăugat la 2.29.0 | 

###  **UtilizareSaxParser** 

Descriere
Comută motorul intern de parsare XML pentru a utiliza un SAX (API simplu pentru XML) Parser în loc de parser DOM. Acest lucru permite unele caracteristici noi avansate, cum ar fi XInclude, și [atribute personalizate de afișare](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) .

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Testare | 
 |   **Implicit curent**   | fals | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Adăugat în 2.25 | 

###  **listăSeturi de date private** 

Descriere
Determină dacă seturile de date private (cei care necesită autentificare) să apară în lista de seturi de date principală.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | fals | 
 |   **Obiectiv pe termen lung**   | fals | 
 |   **Istoric**   | Adăugat în 1.20 | 

###  **limite politiceActive** 

Descriere
Controlează dacă graniţele politice pot fi trase pe hărţi.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Adăugat în 1.80 | 

###  **forceSynchronousLoading** 

Descriere
Încarcă seturi de date sincrone în loc de încărcare întârziată de fundal.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | fals | 
 |   **Obiectiv pe termen lung**   | fals | 
 |   **Istoric**   | Adăugat în 2.30 | 

##  **** 

###  **fgdcActive** 

Descriere
Generează și servește FGDC (Federal Geographic Comitetul pentru date) metadate.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Adaugat la 1.38 | 

###  **izo19115 Activ** 

Descriere
Generează și servește metadate ISO 19115.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Adaugat la 1.38 | 

###  **Utilizare SisISO19115** 

Descriere
Folosește biblioteca Apache SIS pentru a genera metadate ISO 19115 în locul generatorului moștenit. Dacă acest lucru este pornit și utilizareaSissISO19139 nu este pornit, metadatele IOS 19115 implicite vor fi în format ISO19115_3_2016. Dacă acest lucru este fals, formatul implicit va fi în formatul ISO19115_2.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Testare | 
 |   **Implicit curent**   | fals | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Adăugat în 2.26 | 

###  **Utilizare SisISO19139** 

Descriere
Folosește biblioteca Apache SIS pentru a genera metadate ISO19139_2007.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Testare | 
 |   **Implicit curent**   | fals | 
 |   **Obiectiv pe termen lung**   | fals | 
 |   **Istoric**   | Adăugat la 2.29.0 | 

###  **jsonldActive** 

Descriere
Generează și servește JSON-LD (Date legate) metadate.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Moştenire | 

###  **generează CroissantSchema** 

Descriere
Generează schema de metadate "Croissant" ca schema implicită pentru pregătire de învățare mașină.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Testare | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Se adaugă la 2,28.0 | 

###  **variabileCategoria Must haveIoos** 

Descriere
Forțe pe care variabilele trebuie să le aibă un atribut din categoria IOOS.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | setați după cum se dorește | 
 |   **Istoric**   | Moştenire | 

###  **includeNCCFSubsetVariables** 

Descriere
Comportamentul de moștenire a fost de a genera variabile subset numai pentru EDDTabelFromNcCFFiles settings. Acest lucru a fost adăugat implicit pentru ca EDDTabelFromNcCFFiles să fie în concordanță cu alte tipuri de seturi de date. Dacă aveți nevoie de moștenirea automată subsetVariables Puteți permite acest lucru. O soluţie mai bună ar fi să adăugăm subsetVariables la definiția setului de date.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Testare | 
 |   **Implicit curent**   | fals | 
 |   **Obiectiv pe termen lung**   | fals | 
 |   **Istoric**   | Adăugat în 2.26 | 

##  **** 

###  **abonareSystemActive** 

Descriere
Activează sistemul de abonament e-mail pentru actualizările setului de date.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Adaugat la 1.14 | 

###  **abonareToRemoteErddapDataset** 

Descriere
Permite acest lucru ERDDAP instanţă de subscriere la distanţă ERDDAP Seturi de date pentru actualizări.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Adăugat în 1.70 | 

###  **updateSubsRssOnFileChanges** 

Descriere
Abonare de declanșare și RSS actualizări atunci când se schimbă fișierele subiacente. Comportamentul moștenit a fost doar de a face actualizări pe reîncărcare set de date (pe care unele servere le aveau rareori ca săptămânal) .

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Adăugat în 2.26 | 

###  **permite MqttBroker** 

Descriere
Începe un broker intern MQTT în cadrul aplicației pentru gestionarea mesajelor.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Testare | 
 |   **Implicit curent**   | fals | 
 |   **Obiectiv pe termen lung**   | setați după cum se dorește | 
 |   **Istoric**   | Adăugat la 2.29.0 | 

###  **publicăMqttNotif** 

Descriere
Permite publicarea notificărilor (modificări ale setului de date) brokerului MQTT.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Testare | 
 |   **Implicit curent**   | fals | 
 |   **Obiectiv pe termen lung**   | setați după cum se dorește | 
 |   **Istoric**   | Adăugat la 2.29.0 | 

##  **** 

###  **antet utilizarePentru Url** 

Descriere
Permite utilizarea antetelor HTTP pentru a determina datele URL ale cererii (utile în spatele proxy) .

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Implicit modificat la adevărat în 2.28.0, adăugat la 2.27.0 | 

###  **permite Cors** 

Descriere
Activează schimbul de resurse între ore (CORS) Afişează răspunsurile HTTP.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | fals | 
 |   **Obiectiv pe termen lung**   | setați după cum se dorește | 
 |   **Istoric**   | Adăugat în 2.26 | 

##  **Caută** 

###  **LuceneSearchEngine** 

Descriere
Schimbă motorul intern de căutare pentru a utiliza Apache Lucene.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Testare | 
 |   **Implicit curent**   | fals | 
 |   **Obiectiv pe termen lung**   | ? | 
 |   **Istoric**   | Moştenire | 

##  **Servicii și protocoale** 

###  **fișiereActive** 

Descriere
Activează vizualizarea browserului "Fişiere" pentru seturile de date care îl sprijină.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Adăugat în 1.58 | 

###  **convertoareActive** 

Descriere
Activează instrumentele de conversie în UI.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Adaugat la 1.44 | 

###  **slideSorterActive** 

Descriere
Activează Sortatorul Slide.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Adaugat la 1.44 | 

###  **dateProviderFormActive** 

Descriere
Activează formularul care permite furnizorilor de date să introducă metadate.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Moştenire | 

###  **OutofDatesetsActive** 

Descriere
Activează raportarea seturilor de date expirate.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Adaugat la 1.82 | 

###  **wmsActive** 

Descriere
Activează serviciul de hărți web ( WMS ) Interfață.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Adaugat la 1.44 | 

###  **wmsClientActive** 

Descriere
Activează interiorul WMS caracteristici client.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | Stabil | 
 |   **Implicit curent**   | Adevărat. | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
 |   **Istoric**   | Moştenire | 

###  **geoServiciiRestActive** 

Descriere
Activează RESTful interfață pentru serviciile geospațiale. Nu este pe deplin implementat.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | În construcție | 
 |   **Implicit curent**   | fals (Codificat)   | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 

###  **wcsActive** 

Descriere
Activează serviciul de acoperire web ( WCS ) Interfață. Nu este pe deplin implementat.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | În construcție | 
 |   **Implicit curent**   | fals (Codificat)   | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 

###  **sosActive** 

Descriere
Activează serviciul de observare a senzorilor ( SOS ) Interfață.

 | Proprietate | Detalii | 
 | :----- | :----- | 
 |   **Ciclul de viață**   | În construcție | 
 |   **Implicit curent**   | fals (Codificat)   | 
 |   **Obiectiv pe termen lung**   | Adevărat. | 
