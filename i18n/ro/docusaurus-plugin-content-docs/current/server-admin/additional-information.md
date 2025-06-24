---
sidebar_position: 4
---
# Informații suplimentare

## Lucruri pe care trebuie să le ştii{#things-you-need-to-know} 
     
###    **[Erori proxy](#proxy-errors)**  {#proxy-errors} 
Uneori, o cerere deERDDAP™va returna o eroare Proxy, o eroare HTTP 502 Bad Gateway, sau o eroare similară. Aceste erori sunt aruncate de Apache sau Tomcat, nuERDDAP™în sine.
* În cazul în care fiecare cerere generează aceste erori, mai ales atunci când sunteți prima configurare dvs.ERDDAP™, atunci este, probabil, un proxy sau eroare poarta de acces rău, și soluția este, probabil, de a repara[ERDDAPconfigurări proxy](/docs/server-admin/deploy-install#proxypass). Acest lucru poate fi, de asemenea, problema atunci când un stabilitERDDAP™Începe brusc să arunce aceste erori pentru fiecare cerere.
* În caz contrar, erorile "proxy" sunt de obicei erori de pauză aruncate de Apache sau Tomcat. Chiar și atunci când acestea se întâmplă relativ repede, este un fel de răspuns de la Apache sau Tomcat care apare atunci cândERDDAP™este foarte ocupat, cu memorie limitată sau limitat de o altă resursă. În aceste cazuri, a se vedea sfatul de mai jos pentru a face față[ERDDAP™răspuns lent](#responding-slowly).
        
Solicitări pe termen lung (&gt; 30 de puncte de timp) dintr-un set de date în grilă sunt predispuse la eșecuri în timp, care apar adesea ca erori Proxy, deoarece este nevoie de timp semnificativ pentruERDDAP™pentru a deschide toate fișierele de date unu câte unu. DacăERDDAP™este altfel ocupat în timpul cererii, problema este mai probabil să apară. Dacă fișierele setului de date sunt comprimate, problema este mai probabil să apară, deși este greu pentru un utilizator să determine dacă fișierele unui set de date sunt comprimate.
Soluția este de a face mai multe cereri, fiecare cu un interval de timp mai mic. Cât de mic este intervalul de timp? Îţi sugerez să începi foarte mic. (~30 de puncte de timp?) , atunci (aproximativ) Dublează intervalul de timp până când cererea eşuează, apoi du-te înapoi o dublare. Apoi face toate cererile (fiecare pentru o altă bucată de timp) Nevoie pentru a obține toate datele.
AnERDDAP™administratorul poate diminua această problemă prin creșterea[Configurări timeout apache](/docs/server-admin/deploy-install#apache-timeout).
        
### Monitorizare{#monitoring} 
Cu toţii vrem ca serviciile noastre de date să-şi găsească audienţa şi să fie folosite pe scară largă, dar uneori şi pe tine.ERDDAP™pot fi utilizate prea mult, provocând probleme, inclusiv răspunsuri foarte lente pentru toate cererile. Planul nostru de a evita problemele este:

* MonitorERDDAP™prin intermediul[status.html pagina web](#status-page).
Are o mulţime de informaţii utile. Dacă vedeți că un număr mare de cereri vin, sau tone de memorie fiind utilizate, sau tone de cereri eșuate, sau fiecare set de date majore este de a lua o lungă perioadă de timp, sau a vedea orice semn de lucruri obtinerea împotmolit în jos și să răspundă încet, apoi priviți înERDDAP's[fișier log.txt](#log)să văd ce se întâmplă.
    
De asemenea, este util să se observe cât de repede răspunde pagina de stare. Dacă răspunde încet, acesta este un indicator important căERDDAP™este foarte ocupat.
    
* MonitorERDDAP™prin intermediul[Raport zilnic](#daily-report)E-mail.
     
* Fiți atenți la seturile de date depășite prin intermediul *BaseUrl* /erddap/outOfDateDatasets.htmlpagina web care se bazează pe opțional[testOutOfDate](/docs/server-admin/datasets#testoutofdate)atribut global.
     
#### Monitoare externe{#external-monitors} 
Metodele enumerate mai sus sunt:ERDDAP"s moduri de monitorizare în sine. De asemenea, este posibil să faceţi sau să utilizaţi sisteme externe pentru a vă monitorizaERDDAP. Un proiect pentru a face acest lucru este[Proiectul erddap-metric al Axiom](https://github.com/axiom-data-science/erddap-metrics). Astfel de sisteme externe au unele avantaje:
* Ele pot fi personalizate pentru a oferi informațiile pe care doriți, afișate în modul în care doriți.
* Ele pot include informații despreERDDAP™căERDDAP™nu pot accesa ușor sau deloc (de exemplu, utilizarea procesorului, spațiul liber pe disc,ERDDAP™timpul de răspuns văzut din perspectiva utilizatorului;ERDDAP™uptime;
* Acestea pot furniza alerte (emailuri, apeluri telefonice, mesaje) administratorilor atunci când problemele depășesc un anumit prag.
             
### Multiple simultane Cereri{#multiple-simultaneous-requests} 
*    **Utilizatorii Blacklist fac mai multe cereri simultane&#33;** 
Dacă este clar că un utilizator face mai multe cereri simultane, în mod repetat și continuu, atunci adăugați adresa IP laERDDAP's [&lt;cerere Lista neagră &gt;] (/docs/server-admin/sets#request blacklist) îndatasets.xmlDosar. Uneori, cererile sunt toate de la o adresă IP. Uneori sunt de la mai multe adrese IP, dar în mod clar același utilizator. Puteți, de asemenea, lista neagră oameni care fac tone de cereri invalide sau tone de cereri de minte-numbling ineficient.
    
Apoi, pentru fiecare cerere pe care o fac,ERDDAP™întoarce:
    
    > HTTP ERROR 403 - Access Forbidden --  
    > Your IP address is on this ERDDAP's request blacklist.  
    > Did you often submit more than one request at a time?  
    > Did you often submit identical requests in a short period of time?  
    > Did you submit a large number of invalid requests?  
    > If you are ready to avoid these problems, please email \\[ERDDAP™ administrator's email address\\] to request to be taken off of the blacklist.
    
Să sperăm că utilizatorul va vedea acest mesaj și vă va contacta pentru a afla cum să rezolve problema și să iasă de pe lista neagră. Uneori, doar schimbă adresele IP şi încearcă din nou.
    
E ca balanţa puterii dintre armele ofensive şi cele defensive în război. Aici, armele defensive. (ERDDAP) au o capacitate fixă, limitată de numărul de nuclee din CPU, banda de acces a discului și banda de bandă a rețelei. Dar armele ofensive (utilizatori, în special scenarii) au capacitate nelimitată:
    
    * O singură cerere de date din multe puncte de timp poate cauzaERDDAPpentru a deschide un număr mare de fișiere (în ordine sau parțial multifilate) . În cazuri extreme, o cerere "simplu" poate lega cu ușurință RAID atașatERDDAP™pentru un minut, blocarea eficientă a gestionării altor cereri.
         
    * O singură cerere poate consuma o bucată mare de memorie (chiar dacăERDDAP™este codat pentru a minimiza memoria necesară pentru a gestiona cererile mari) .
         
    * Paralelizare -
Este ușor pentru un utilizator inteligent să paralelizeze o sarcină mare prin generarea de o mulțime de fire, fiecare dintre care prezintă o cerere separată (care pot fi mari sau mici) . Acest comportament este încurajat de comunitatea informatică ca o modalitate eficientă de a face față unei mari probleme (și paralelizarea este eficientă în alte circumstanțe) . Revenind la analogia de război: utilizatorii pot face un număr nelimitat de cereri simultane cu costul fiecăreia fiind în esență zero, dar costul fiecărei cereri vine înERDDAP™poate fi mare șiERDDAPCapacitatea de răspuns este finită. În mod clar,ERDDAP™va pierde această bătălie, dacă nuERDDAP™Administrator Blacklists utilizatorii care fac mai multe cereri simultane care sunt în mod nedrept aglomerarea altor utilizatori.
         
    * Scripturi multiple -
Gândiți-vă la ce se întâmplă când există mai mulți utilizatori inteligenți care rulează fiecare scripturi paralele. Dacă un utilizator poate genera atât de multe cereri că alți utilizatori sunt aglomerate, atunci mai mulți astfel de utilizatori pot genera atât de multe cereri careERDDAP™devine copleşită şi aparent nereceptivă. Este eficient[Atacul DDOS](https://en.wikipedia.org/wiki/Denial-of-service_attack)Din nou, singura apărare pentruERDDAP™este de a lista neagră utilizatorii face mai multe cereri simultane care sunt în mod nedrept aglomerarea altor utilizatori.
         
    * Aşteptări umflate -
În această lume a marilor companii de tehnologie (Amazon, Google, Facebook, ...) , utilizatorii au ajuns să se aștepte în esență capacități nelimitate de la furnizori. Având în vedere că aceste companii sunt operațiuni de luare de bani, cu cât au mai mulți utilizatori, cu atât au mai multe venituri pentru a-și extinde infrastructura IT. Ca să-şi permită o infrastructură IT masivă pentru a face faţă cererilor. Și limitează în mod inteligent numărul de cereri și costuri ale fiecărei cereri de la utilizatori prin limitarea tipurilor de cereri pe care utilizatorii le pot face astfel încât nicio cerere unică să nu fie împovărătoare și nu există niciodată un motiv (sau o cale) pentru utilizatori să facă mai multe cereri simultane. Deci aceste companii tech imense pot avea mult mai mulți utilizatori decâtERDDAP™, dar ele au masiv mai multe resurse și moduri inteligente de a limita cererile de la fiecare utilizator. Este o situaţie gestionabilă pentru marile companii IT (şi se îmbogăţesc&#33;) dar nu pentruERDDAP™instalații. Din nou, singura apărare pentruERDDAP™este de a lista neagră utilizatorii face mai multe cereri simultane care sunt în mod nedrept aglomerarea altor utilizatori.
         
    
Deci utilizatorii: Nu face cereri simultane multiple sau vei fi pus pe lista neagră&#33;
     

În mod evident, este cel mai bine dacă serverul are o mulțime de nuclee, o mulțime de memorie (astfel încât să puteți aloca o mulțime de memorieERDDAP™, mai mult decât are nevoie vreodată) , și o conexiune la internet de înaltă lățime de bandă. Apoi, memoria este rareori sau niciodată un factor de limitare, dar banda de bandă de rețea devine factorul de limitare mai comun. Practic, pe măsură ce există tot mai multe cereri simultane, viteza către un anumit utilizator scade. Acest lucru încetinește în mod natural numărul de cereri care vin în cazul în care fiecare utilizator este doar depunerea unei cereri la un moment dat.
    
### ERDDAP™Obținerea de date de la THREDS{#erddap-getting-data-from-thredds} 
DacăERDDAP™primeste o parte din datele sale de la un THREDS la site-ul dvs., există unele avantaje pentru a face o copie a fișierelor de date THREDDDS (cel puțin pentru cele mai populare seturi de date) pe un alt RAID căERDDAP™are acces la astfel încâtERDDAP™poate servi datele din fișiere direct. LaERDFacem asta pentru cele mai populare seturi de date.

*   ERDDAP™poate obține datele direct și nu trebuie să aștepte ca THREDS să reîncărcați setul de date sau ...
*   ERDDAP™poate observa și include fișiere noi de date imediat, astfel încât nu trebuie să pester THREDS frecvent pentru a vedea dacă setul de date sa schimbat. Vezi [&lt;updateEveryNMillis&gt;] (/docs/server-admin/sets#datate everyenmmillis) .
* Încărcătura este împărţită între 2 servere RAIDS şi 2 servere, în loc ca cererea să fie grea pentru ambeleERDDAP™şi THREDS.
* Evitaţi problema nepotrivirii cauzate de THREDS având un mic (în mod implicit) dimensiunea maximă a cererii.ERDDAP™are un sistem de abordare a nepotrivirii, dar evitarea problemei este mai bună.
* Aveți o copie de rezervă a datelor care este întotdeauna o idee bună.

În orice caz, nu rulați niciodată TREIDS șiERDDAP™în acelaşi Tomcat. Rulați-le în Tomcats separate, sau mai bine, pe servere separate.

Găsim că THREDS ajunge periodic într-o stare în care cererile doar stau. DacăERDDAP™obţine date de la un THREDS şi THREDS este în această stare,ERDDAP™are o apărare (Spune că setul de date bazat pe TREDDS nu este disponibil) , dar este încă supărător pentruERDDAP™pentru căERDDAP™trebuie să aștepte până la timeout de fiecare dată când încearcă să reîncărcați un set de date dintr-un Hung THREDS. Unele grupuri (inclusivERD) evita acest lucru prin repornirea proactivă a THREDS frecvent (De exemplu, noaptea într-o slujbă de cron) .

### Răspuns lent{#responding-slowly} 
*    **DacăERDDAP™Răspunde încet** sau dacă doar anumite cereri răspund lent,
ați putea să vă dați seama dacă lentoarea este rezonabilă și temporară (de exemplu, din cauza multor cereri din scripturi sauWMSutilizatori) , sau dacă ceva este inexplicabil greșit și trebuie să[Închide și reporniți Tomcat șiERDDAP™](#shut-down-and-restart).
    
DacăERDDAP™răspunde încet, vezi sfatul de mai jos pentru a determina cauza, care sperăm că vă va permite pentru a rezolva problema.
Este posibil să aveți un punct de plecare specific (De exemplu, un URL specific pentru cerere) sau un punct de plecare vag (de exemplu,ERDDAP™este lent) .
S-ar putea ști utilizatorul implicat (de exemplu, pentru că ţi-au trimis un e-mail) Sau nu.
S-ar putea avea alte indicii, sau nu.
Deoarece toate aceste situații și toate cauzele posibile ale problemelor se estompează împreună, sfatul de mai jos încearcă să se ocupe de toate punctele de plecare posibile și toate problemele posibile legate de răspunsuri lente.
    
    *    **Caută indicii în[ERDDAPFișier jurnal](#log)**   ( *Big ParentDirectory* /logs/log.txt) .
        \\[În rare ocazii, există indicii în[Fișier jurnal Tomcat](#tomcat-logs)  ( *Tomcat* /loguri/catalina.out) .\\]  
Caută mesaje de eroare.
Caută un număr mare de cereri de la unul (sau câteva) utilizatori și poate hogging o mulțime de resurse serverului (memorie, timp procesor, acces disc, lățime de bandă internet) .
        
Dacă problema este legată de **un utilizator** , puteți obține de multe ori un indiciu despre cine este utilizatorul prin intermediul serviciilor web ca[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)care vă pot oferi informații legate de adresa IP a utilizatorului (pe care le puteți găsi înERDDAP's[log.txt](#log)fișier) .
        
        * Dacă utilizatorul pare a fi un **bot** se comportă rău (în special, un motor de căutare care încearcă să completezeERDDAP™forme cu fiecare posibilă permutare a valorilor de intrare) , Asigurați-vă că ați configurat în mod corespunzător serverului dumneavoastră[roboți.txt](#robotstxt)Dosar.
        * Dacă utilizatorul pare a fi un **script (s) ** care face mai multe cereri simultane, contactați utilizatorul, explicați-vă căERDDAP™are resurse limitate (De exemplu, memorie, timp procesor, acces disc, lățime de bandă internet) , și să le ceară să fie atent de alți utilizatori și să facă doar o cerere la un moment dat. Poţi să mai menţionezi că le vei lista neagră dacă nu se retrag.
        * Dacă utilizatorul pare a fi un **script** efectuarea unui număr mare de cereri consumatoare de timp, cere utilizatorului să fie atent de alți utilizatori prin punerea unei mici pauza (2 secunde?) în scenariul dintre cereri.
        *    **WMSsoftware client** poate fi foarte exigent. Un client va cere adesea 6 imagini personalizate la un moment dat. Dacă utilizatorul pare a fi unWMSclient care face cereri legitime, puteți:
            * Ignoră-l. (recomandat, pentru că vor merge mai departe destul de curând) 
            * Închide serverulWMSserviciu prin intermediulERDDAPStabilește fișierul.html. (nu este recomandată) 
        * Dacă cererile par **prost, nebun, excesiv, sau răutăcios,** sau dacă nu se poate rezolva problema nici un alt mod, ia în considerare adăugarea temporară sau permanentă adresa IP a utilizatorului la [&lt;cerere Lista neagră &gt; îndatasets.xmlfișier] (/docs/server-admin/sets#request blacklist) .
             
    *    **Încearcă să copiezi problema de pe computer.**   
Să ne dăm seama dacă problema este legată de un set de date sau toate seturile de date, pentru un utilizator sau pentru toți utilizatorii, pentru doar anumite tipuri de cereri etc.
Dacă puteți duplica problema, încercați să restrângeți problema.
Dacă nu puteți duplica problema, atunci problema poate fi legată de computerul utilizatorului, conexiunea la internet a utilizatorului sau conexiunea la internet a instituției dumneavoastră.
         
    * Dacă doar **un set de date** răspunde lent (Poate doar pentru **un tip de cerere** de la un utilizator) , problema poate fi:
        *   ERDDAP"accesul la datele sursă ale setului de date (în special din bazele de date relaționale, Cassandra și seturi de date la distanță) poate fi temporar sau permanent lent. Încercați să verificați viteza sursei independent deERDDAP. Dacă este lentă, poate o poţi îmbunătăţi.
        * Este problema legată de cererea specifică sau de tipul general de cerere?
Cu cât este mai mare subgrupul solicitat de un set de date, cu atât cererea va eşua mai probabil. Dacă utilizatorul face cereri uriașe, cereți utilizatorului să facă cereri mai mici care sunt mai susceptibile de a obține un răspuns rapid și de succes.
            
Aproape toate seturile de date sunt mai bune la gestionarea unor tipuri de cereri decât alte tipuri de cereri. De exemplu, atunci când un set de date stochează diferite bucăți de timp în diferite fișiere, cererile de date dintr-un număr imens de puncte de timp pot fi foarte lente. Dacă cererile actuale sunt de tip dificil, ia în considerare oferirea unei variante a setului de date optimizat pentru aceste cereri. Sau pur și simplu să explice utilizatorului că acest tip de cerere este dificil și consumatoare de timp, și cere răbdare lor.
            
        * Setul de date nu poate fi configurat în mod optim. Ați putea să efectuați modificări ale setului de datedatasets.xmlbucată pentru a ajutaERDDAP™să se ocupe mai bine de set. De exemplu,
            
            *   EDDGridSeturile de date din NcFiles care accesează date din fișierele comprimate nc4/hdf5 sunt lente atunci când obțin date pentru întreaga gamă geografică (de exemplu, pentru o hartă mondială) pentru că întregul fişier trebuie decomprimat. Ai putea converti fișierele în fișiere necomprimate, dar apoi cerința de spațiu pe disc va fi mult, mult mai mare. Este probabil mai bine să acceptăm că aceste seturi de date vor fi lente în anumite circumstanțe.
            * Configurația [&lt;subsetVariables&gt;] (/docuri/server-admin/seturi de date#subsetvariabile) Tag are o mare influenţă asupra modului în careERDDAP™se ocupă de seturi de date EDD.
            * Ați putea fi capabil să crească[viteza unui tabel EDD din baza de date](/docs/server-admin/datasets#database-speed)Set de date.
            * Multe seturi de date ale tabelului EDD pot fi accelerate de[stocarea unei copii a datelor înNetCDFFișiere Contiguous Ragged Array](/docs/server-admin/datasets#eddtablefromfiles), careERDDAP™poate citi foarte repede.
            
Dacă doriți să ajutați la accelerarea unui set de date specific, includeți o descriere a problemei și bucata setului de date dedatasets.xmlşi să ne vedem[secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support).
             
    * Dacă **totul** înERDDAP™este **Întotdeauna** lent, problema poate fi:
        * Computerul care ruleazăERDDAP™este posibil să nu aibă suficientă memorie sau putere de procesare. E bine să fugi.ERDDAP™pe un server multi-core modern. Pentru utilizare grea, serverul ar trebui să aibă un sistem de operare de 64 de biți și 8 GB sau mai mult de memorie.
        * Computerul care ruleazăERDDAP™pot fi, de asemenea, difuzate alte aplicații care consumă o mulțime de resurse de sistem. Dacă da, puteți obține un server dedicat pentruERDDAP? De exemplu. (Asta nu e o aprobare.) , puteți obține un quad-core Mac Mini Server cu 8 GB de memorie pentru ~ 1100 $.
             
    * Dacă **totul** înERDDAP™este **temporar** Încet, priveşte-ţiERDDAP's[ **/erddap/status.htmlpagină** ](#status-page)în browserul tău.
        * AreERDDAP™Pagina de stare nu reușește să încarce?
Dacă da,[restarteazăERDDAP™](#shut-down-and-restart).
        * A făcutERDDAP™stare încărcare pagină încet (De exemplu, &gt; 5 secunde) ?
Acesta este un semn că totul înERDDAP™se execută încet, dar nu este neapărat probleme.ERDDAP™ar putea fi foarte ocupat.
        * Pentru "Răspundere timp eșuat (de la ultimele seturi majore de date privind sarcina) ", este n = un număr mare?
Acest lucru indică faptul că au existat o mulțime de cereri eșuate recent. Asta ar putea fi probleme sau începutul necazurilor. Timpul median pentru eșecuri este adesea mare (de exemplu, 210000 ms) ,
Ceea ce înseamnă că au fost (Da?) Multe fire active.
care legau multe resurse (Cum ar fi memoria, fişierele deschise, prizele deschise...) ,
Ceea ce nu e bine.
        * Pentru "Responsa a avut succes timp (de la ultimele seturi majore de date privind sarcina) ", este n = un număr mare?
Acest lucru indică faptul că au existat o mulțime de cereri de succes recent. Nu sunt probleme. Înseamnă doar...ERDDAP™devine o utilizare grea.
        * Este "Numărul de fire non-Tomcat în așteptare" dublu o valoare tipică?
Acest lucru este de multe ori probleme grave care vor provocaERDDAP™să încetinească şi să îngheţe. Dacă acest lucru persistă ore, s-ar putea dori să proactiv[restarteazăERDDAP™](#shut-down-and-restart).
        * În partea de jos a listei "Memoria de utilizare rezumat," este ultima "Memorie: în prezent folosind" valoare foarte mare?
Acest lucru poate indica doar utilizare ridicată, sau poate fi un semn de probleme.
        * Uită-te la lista de fire și statutul lor. Sunt un număr neobişnuit de ei fac ceva neobişnuit?
             
    * Este **conexiunea la internet a instituției dumneavoastră** În prezent lent?
Cauta pe internet pentru "test de viteză Internet" și de a utiliza unul dintre testele online gratuite, cum ar fi[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Dacă conexiunea la internet a instituției dumneavoastră este lentă, atunci conexiunile dintreERDDAP™și sursele de date la distanță vor fi lente, și conexiuni întreERDDAP™iar utilizatorul va fi lent. Uneori, puteți rezolva acest lucru prin oprirea utilizării inutile a internetului (De exemplu, persoanele care se uită la videoclipuri sau la videoconferință) .
         
    * Este **conexiunea la internet a utilizatorului** În prezent lent?
Au utilizatorul căutați pe internet pentru "test de viteză Internet" și de a folosi unul dintre testele online gratuite, cum ar fi[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Dacă conexiunea la internet a utilizatorului este lentă, aceasta încetinește accesul acestora laERDDAP. Uneori, ei pot rezolva acest lucru prin oprirea utilizării inutile a internetului la instituția lor (De exemplu, persoanele care se uită la videoclipuri sau la videoconferință) .
         
    *    **Blocat?**   
A se vedea noastre[secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support).

### Închideți și reîncepeți{#shut-down-and-restart} 
*    **Cum să se închidă și să repornească Tomcat șiERDDAP™**   
Nu aveți nevoie pentru a închide și reporniți Tomcat șiERDDAPdacăERDDAP™este temporar lent, lent pentru un motiv cunoscut (cum ar fi o mulțime de cereri din scripturi sauWMSutilizatori) , sau de a aplica modificăridatasets.xmlDosar.
    
Ai nevoie pentru a închide și reporniți Tomcat șiERDDAP™dacă trebuie să aplicaţi modificări la fişierul setup.xml, sau dacăERDDAP™Îngheaţă, atârnă sau închide. În circumstanţe extreme,Javapoate congela timp de un minut sau două în timp ce face o colectare completă de gunoi, dar apoi recupera. Deci, este bine să aștepte un minut sau două pentru a vedea dacăJava/ERDDAP™este foarte înghețat sau dacă este doar de a face o colecție lungă de gunoi. (Dacă colectarea gunoiului este o problemă comună,[alocă mai multă memorie lui Tomcat](/docs/server-admin/deploy-install#memory).) 
    
Nu recomand utilizarea Tomcat Web Application Manager pentru a porni sau opri Tomcat. Dacă nu închideți complet și porniți Tomcat, mai devreme sau mai târziu veți avea probleme de memorie PermGen.
    
Pentru a opri și reporni Tomcat șiERDDAP:
    
    * Dacă utilizaţi Linux sau Mac:
         (Dacă ați creat un utilizator special pentru a rula Tomcat, de exemplu, Tomcat, amintiți-vă să faceți următorii pași ca acel utilizator.)   
         
        1. Folosește cd *Tomcat* /bin
             
        2. Utilizați ps -ef|grep tomcat pentru a găsi procesul Java / Tomcat ID (Să sperăm că doar un singur proces va fi listat) , care vom apela *javaProcessID* Mai jos.
             
        3. DacăERDDAP™este congelat/hung/blocat, se utilizează ucide -3 *javaProcessID* pentru a spuneJava  (care rulează Tomcat) pentru a face o scurgere de fir la fișierul jurnal Tomcat: *Tomcat* /logs/catalina.out. După repornirea, puteți diagnostica problema prin găsirea informațiilor grămada de fire (și orice alte informații utile de mai sus) în *Tomcat* /loguri/catalina.out și, de asemenea, prin citirea părților relevante ale[ERDDAP™arhiva jurnal](#log). Dacă doriți, puteți include aceste informații și a vedea noastre[secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support).
             
        4. Foloseşte./închide. sh
             
        5. Utilizați ps -ef|Grep tomcat repetat până când procesul Java/Tomcat nu este listat.
            
Uneori, procesul Java/Tomcat va dura până la două minute până se va închide complet. Motivul este:ERDDAP™trimite un mesaj la firele sale de fundal pentru a le spune să se oprească, dar uneori este nevoie de aceste fire de mult timp pentru a ajunge la un loc bun de oprire.
            
        6. Daca dupa un minut sau cam asa ceva, Java/Tomcat nu se opreste de la sine, poti folosi
ucide -9 *javaProcessID*   
să forţeze procesul Java/Tomcat să se oprească imediat. Dacă este posibil, utilizați acest lucru doar ca o ultimă soluție. Comutatorul -9 este puternic, dar poate provoca diverse probleme.
             
        7. Pentru a reporniERDDAP™, utilizați ./startup.sh
             
        8. VizualizareERDDAP™în browser pentru a verifica dacă repornirea a reușit. (Uneori, trebuie să aştepţi 30 de secunde şi să încerci să încarci.ERDDAP™din nou în browser pentru ca acesta să reuşească.)   
             
    * Dacă utilizați Windows:
         
        1. Folosește cd *Tomcat* /bin
             
        2. Utilizareshutdown.bat  
             
        3. Este posibil să doriți/trebuie să utilizați Windows Task Manager (accesibil prin Ctrl Alt Del) să se asigure căJava/ Tomcat/ERDDAP™procesul/aplicarea s-a oprit complet.
Uneori, procesul/cererea va dura până la două minute pentru a închide. Motivul este:ERDDAP™trimite un mesaj la firele sale de fundal pentru a le spune să se oprească, dar uneori este nevoie de aceste fire de mult timp pentru a ajunge la un loc bun de oprire.
             
        4. Pentru a reporniERDDAP™, utilizați startup.bat
             
        5. VizualizareERDDAP™în browser pentru a verifica dacă repornirea a reușit. (Uneori, trebuie să aştepţi 30 de secunde şi să încerci să încarci.ERDDAP™din nou în browser pentru ca acesta să reuşească.)   
             
### Crashs frecvente sau Freezes{#frequent-crashes-or-freezes} 
DacăERDDAP™devine lent, se blochează sau îngheță, ceva este greșit. Uită-te în[ERDDAPFișier jurnal](#log)pentru a încerca să dau seama cauza. Dacă nu puteți, vă rugăm să includeți detaliile și a vedea noastre[secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support).

Cea mai comună problemă este un utilizator supărător care rulează mai multe script-uri la o dată și/sau cineva face un număr mare de cereri invalide. Dacă se întâmplă acest lucru, ar trebui, probabil, lista neagră că utilizatorul. Când un utilizator listat pe lista neagră face o cerere, mesajul de eroare în răspuns îi încurajează să vă e-mail pentru a lucra la problemele. Apoi, le puteți încuraja să ruleze doar un scenariu la un moment dat și pentru a rezolva problemele din scenariul lor (de exemplu, solicitarea datelor dintr-un set de date de la distanță care nu pot răspunde înainte de sincronizare) . Vezi [&lt;cerere Lista neagră &gt; îndatasets.xmlfișier] (/docs/server-admin/sets#request blacklist) .

În circumstanţe extreme,Javapoate congela timp de un minut sau două în timp ce face o colectare completă de gunoi, dar apoi recupera. Deci, este bine să aștepte un minut sau două pentru a vedea dacăJava/ERDDAP™este foarte înghețat sau dacă este doar de a face o colecție lungă de gunoi. (Dacă colectarea gunoiului este o problemă comună,[alocă mai multă memorie lui Tomcat](/docs/server-admin/deploy-install#memory).) 

DacăERDDAP™devine lent sau îngheață și problema nu este un utilizator supărător sau o colecție lungă de gunoi, puteți rezolva de obicei problema de[repornireERDDAP™](#shut-down-and-restart). Experienţa mea este căERDDAP™poate rula luni de zile fără a avea nevoie de o repornire.
     

### Monitor{#monitor} 
Puteți monitoriza dvs.ERDDAPStarea lui uitându-se la[/erddap/status.htmlpagină](#status-page), în special statisticile din secțiunea de top. DacăERDDAP™devine lent sau înghețe și problema nu este doar utilizarea extrem de grea, puteți rezolva de obicei problema de[repornireERDDAP™](#shut-down-and-restart). Există indicatori suplimentari disponibili prin integrarea Prometheus la /erddap /metrice.

Experienţa mea este căERDDAP™poate rula luni de zile fără a avea nevoie de o repornire. Trebuie să îl reporniţi numai dacă doriţi să aplicaţi unele modificări laERDDAP's setup.xml sau atunci când aveți nevoie pentru a instala noi versiuni aleERDDAP™,Java, Tomcat, sau sistemul de operare. Dacă trebuie să reporniţiERDDAP™frecvent, ceva nu e în regulă. Uită-te în[ERDDAPFișier jurnal](#log)pentru a încerca să dau seama cauza. Dacă nu puteți, vă rugăm să includeți detaliile și a vedea noastre[secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support). Ca soluţie temporară, aţi putea încerca să utilizaţi[Monit](https://mmonit.com/monit/)pentru a monitoriza dumneavoastrăERDDAP™și reporniți-l dacă este necesar. Sau, ai putea face un loc de muncă cron pentru a reporniERDDAP™  (proactiv) periodic. Ar putea fi un pic dificil să scrii un scenariu pentru a automatiza monitorizarea și repornireaERDDAP. Unele sfaturi care ar putea ajuta:

* Puteți simplifica testarea în cazul în care procesul Tomcat este încă rulează prin utilizarea comutatorului -c cu grep:
ps - u *Tomcat Utilizator*  |grep -c java
Acest lucru va reduce producția la "1" dacă procesul Tomcat este încă în viață, sau "0" dacă procesul a încetat.
     
* Dacă sunteți bun cu gawk, puteți extrage procesidul din rezultatele
ps - u *Tomcat Utilizator*  |grep java, și de a utiliza proceseID în alte linii ale script-ului.
     

Daca faci infiintat Monit sau un loc de munca Cron, ar fi minunat daca ai putea impartasi detaliile astfel incat altii ar putea beneficia vedea noastre[secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support)pentru unde poţi împărţi.

#### Permgen{#permgen} 
Dacă utilizați în mod repetat Tomcat Manager pentru a reîncărca (sau Stop și Start)  ERDDAP™,ERDDAP™poate nu reușesc să înceapă și arunca Java.lang. OutofMemoryError: PermGen. Soluţia trebuie administrată periodic. (sau de fiecare dată?)  [Închideți și reporniți Tomcat șiERDDAP™](#shut-down-and-restart), în loc de doar reîncărcareERDDAP.
\\[Actualizare: Această problemă a fost mult minimalizată sau fixată înERDDAP™versiunea 1.24.\\]  
     
#### Jurnal{#log} 
*    **[log.txt](#log)**   
DacăERDDAP™nu porneşte sau dacă ceva nu funcţionează aşa cum era de aşteptat, este foarte util să ne uităm la mesajele de eroare şi diagnostic dinERDDAP™fișier jurnal.
    * Fișierul jurnal este *Big ParentDirectory* /logs/log.txt
         ( *Big ParentDirectory* este specificat în[setup.xml](/docs/server-admin/deploy-install#setupxml)) . Dacă nu există nici un jurnal. fișier txt sau dacă jurnalul. fișierul txt nu a fost actualizat de când ați reluatERDDAP™, uite în[Fișiere jurnal Tomcat](#tomcat-logs)pentru a vedea dacă există un mesaj de eroare acolo.
    * Tipuri de mesaje de diagnosticare în fișierul jurnal:
        * Cuvântul "eroare" este folosit atunci când ceva a mers atât de greșit încât procedura nu a reușit să se finalizeze. Deși este enervant pentru a obține o eroare, eroarea te forțează să se ocupe de problema. Gândirea noastră este că este mai bine să arunce o eroare decât să aibăERDDAP™Hobble de-a lungul, de lucru într-un mod nu te așteptai.
        * Cuvântul "avertizare" este folosit atunci când ceva a mers prost, dar procedura a putut fi finalizată. Acestea sunt destul de rare.
        * Orice altceva este doar un mesaj informativ. Puteți controla cât de multe informații este autentificat cu [&lt;Nivel log&gt;] (/docs/server-admin/datesets#loglevel)  datasets.xml.
        * Reîncărcarea datelor și răspunsurile utilizatorilor care durează &gt; 10 secunde pentru a termina (cu succes sau fără succes) sunt marcate cu " (&gt;10s&#33;) ". Astfel, puteți căuta fișierul log.txt pentru această frază pentru a găsi seturile de date care au fost lente pentru a reîncărca sau numărul de cerere al cererilor care au fost lent pentru a termina. Apoi puteți privi mai sus în fișierul log.txt pentru a vedea care a fost problema setului de date sau care a fost cererea utilizatorului și de la cine a fost. Aceste sarcini lente ale setului de date și cereri de utilizare sunt uneori taxateERDDAP. Astfel, faptul de a şti mai multe despre aceste cereri vă poate ajuta să identificaţi şi să rezolvaţi probleme.
    * Informații este scris la fișierul jurnal pe unitatea de disc în bucăți destul de mari. Avantajul este că acest lucru este foarte eficient -ERDDAP™nu va bloca niciodata asteptarea ca informatiile sa fie scrise in fisierul jurnal. Dezavantajul este că jurnalul se va termina aproape întotdeauna cu un mesaj parțial, care nu va fi finalizat până la următoarea bucată este scris. Poţi s-o faci la zi. (pentru o clipă) prin vizualizareaERDDAPStarea paginii web la https://*your.domain.org*/erddap/status.html   (sauhttp://dacăhttpsnu este activat) .
    * Când fișierele log.txt ajunge la 20 MB,
fișierul este redenumit jurnal. txt.exterior și un nou fișier log.txt este creat. Deci jurnalele nu se acumulează.
        
În setup.xml, puteți specifica o dimensiune maximă diferită pentru fișierul jurnal, în MegaBytes. Minimul permis este 1 (MB) . Maximul permis este 2000 (MB) . Implicit este de 20 (MB) . De exemplu:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```

    * Ori de câte ori repornițiERDDAP™,
        ERDDAP™face o copie arhivă a jurnalului.txt și jurnal. Dosarele anterioare cu un timbru pe numele fişierului. Dacă au existat probleme înainte de repornire, ar putea fi util pentru a analiza aceste fișiere arhivate pentru indicii cu privire la ceea ce a fost problema. Puteți șterge fișierele de arhivă dacă acestea nu mai sunt necesare.
         
##### Parsing log.txt{#parsing-logtxt} 
ERDDAPJurnalul lui. fișier txt nu este proiectat pentru parsare (deşi ai putea crea expresii regulate care extrag informaţiile dorite) . Este conceput pentru a ajuta un om să-şi dea seama ce se întâmplă când ceva nu merge bine. Când trimiteți un raport bug sau problemeERDDAP™dezvoltatorii, atunci când este posibil, vă rugăm să includeți toate informațiile din fișierul log.txt legate de cererea supărătoare.

Din motive de eficiență,ERDDAP™Scrie doar informaţii de logat. txt după o mare bucată de informații a acumulat. Deci, dacă vizitați jurnal. txt imediat după ce a avut loc o eroare, este posibil ca informațiile legate de eroare să nu fi fost încă scrise pentru log.txt. Pentru a obține informații perfect actualizate de la log.txt, vizitațiERDDAP's[status.html page](#status-page). CândERDDAP™procese care solicită, se spală toate informațiile în așteptare pentru a log.txt.

PentruERDDAP™statistici de utilizare, vă rugăm să utilizați[Fișiere de jurnal Apache și/sau Tomcat](#tomcat-logs)în loc deERDDAPE log.txt. Notă:ERDDAP's[status.html page](#status-page)  (unele) şi[Raport zilnic](#daily-report)  (mai mult) au un număr mare de statistici de utilizare precalculate pentru tine.
    
### Jurnale Tomcat{#tomcat-logs} 
DacăERDDAP™nu porneste deoarece o eroare a avut loc foarte devreme inERDDAPStartup, mesajul de eroare va apărea în fișierele jurnal Tomcat ( *Tomcat* /logs/catalina. *Astăzi* .log sau *Tomcat* /loguri/catalina.out) , nu în[ERDDAPFișierul log.txt](#log).

Statistici de utilizare: Pentru majoritatea informațiilor pe care oamenii doresc să le adune dintr-un fișier jurnal (De exemplu, statistici privind utilizarea) Vă rugăm folosiţi fişierele Apache şi/sau Tomcat. Ele sunt frumos formatate și au acest tip de informații. Există numeroase instrumente pentru analiza lor, de exemplu,[AWStats](https://www.awstats.org),[Kibana lui ElasticSearch](https://www.elastic.co/products/kibana), și[JMeter](https://jmeter.apache.org), dar căutați web pentru a găsi instrumentul potrivit pentru scopurile dumneavoastră.

Rețineți că fișierele jurnal identifică doar utilizatorii ca adrese IP. Există site-uri web pentru a vă ajuta să obțineți informații legate de o adresă IP dată, de exemplu,[Ce este MyIPAddress](https://whatismyipaddress.com/ip-lookup)Dar în mod normal nu vei putea găsi numele utilizatorului.

De asemenea, din cauza[DHCP](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol), adresa IP a unui anumit utilizator poate fi diferită în zile diferite, sau utilizatorii diferiți pot avea aceeași adresă IP în momente diferite.

Alternativ, puteți folosi ceva de genul[Google Analytics](https://analytics.google.com/analytics/web/provision/?authuser=0#/provision). Dar aveţi grijă: când utilizaţi servicii externe precum Google Analytics, renunţaţi la intimitatea utilizatorilor dvs. oferind Google acces deplin la activitatea lor pe site-ul pe care Google (Şi alţii?) poate păstra pentru totdeauna și de a folosi pentru orice scop (poate nu tehnic, dar probabil în practică) . Utilizatorii dvs. nu au fost de acord cu acest lucru și, probabil, nu sunt conștienți că acestea vor fi urmărite pe site-ul dvs., la fel cum probabil nu sunt conștienți de măsura în care acestea sunt urmărite pe aproape toate site-urile web. În aceste zile, mulți utilizatori sunt foarte îngrijorați că tot ceea ce fac pe web este monitorizat de aceste companii mari (Google, Facebook, etc.) şi de către guvern, şi să găsească aceasta o intruziune nejustificată în viaţa lor (ca în carte, 1984) . Acest lucru a condus mulți utilizatori pentru a instala produse cum ar fi[Badger de confidențialitate](https://www.eff.org/privacybadger/faq)pentru a minimiza urmărirea, pentru a utiliza browsere alternative, cum ar fi[Navigator Tor](https://www.torproject.org/)  (sau opri urmărirea în browsere tradiționale) , și pentru a utiliza motoare de căutare alternative cum ar fi[Duck Duck Go](https://duckduckgo.com/). Dacă utilizați un serviciu precum Google Analytics, vă rugăm să documentați cel puțin utilizarea acestuia și consecințele modificării&lt;standardPrivacyPolicy&gt; tag inERDDAP's
\\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file.
    
### Jurnal de e-mail{#e-mail-log} 
*    **e-mailLogYEAR-MM-ZZ.txt**   
    ERDDAP™scrie întotdeauna textul tuturor mesajelor de e-mail în e-mailul din ziua curentă LogYEAR-LL-ZZ.txt fișier în *Big ParentDirectory* /loguri ( *Big ParentDirectory* este specificat în[setup.xml](/docs/server-admin/deploy-install#setupxml)) .
    * Dacă serverul nu poate trimite mesaje de e-mail, sau dacă ați configuratERDDAP™nu pentru a trimite mesaje de e-mail, sau dacă sunteți doar curios, acest fișier este un mod convenabil de a vedea toate mesajele de e-mail care au fost trimise.
    * Puteți șterge fișierele de jurnal de e-mail din zilele anterioare, dacă acestea nu mai sunt necesare.
         
### Raport zilnic{#daily-report} 
Daily Report are o mulțime de informații utile -- toate informațiile de la dvs.ERDDAP's[/erddap/status.htmlpagină](#status-page)şi mai mult.
    * Este cel mai complet rezumat al dumneavoastrăERDDAPStarea lui.
    * Printre alte statistici, aceasta include o listă de seturi de date care nu au încărcat și excepțiile pe care le-au generat.
    * Acesta este generat atunci când pornițiERDDAP™  (Imediat dupăERDDAP™termină încercarea de a încărca toate setările de date) și a generat la scurt timp după ora 7 am locale în fiecare dimineață.
    * Ori de câte ori este generat, este scris[ERDDAPFișierul log.txt](#log).
    * Ori de câte ori este generat, acesta este trimis prin e-mail&lt;e-mailDailyReportsTo&gt; și&lt;emailTotul To&gt; (care sunt specificate în[setup.xml](/docs/server-admin/deploy-install#setupxml)) cu condiția să fi înființat sistemul de e-mail (în setup.xml) .

### Pagina statutului{#status-page} 
Puteți vizualiza starea dumneavoastrăERDDAP™din orice browser prin mers la&lt;bazăUrl&gt;/erddap/status.html
* Această pagină este generată dinamic, așa că întotdeauna are statistici de până la moment pentru dvs.ERDDAP.
* Acesta include statistici privind numărul de cereri, utilizarea memoriei, urme de stive de fire, sarcinaThread, etc.
* Deoarece pagina Status poate fi vizualizat de oricine, aceasta nu include destul de multe informații ca[Raport zilnic](#daily-report).
         
### Adăugare/schimbare setări de date{#addingchanging-datasets} 
ERDDAP™de obicei reciteștedatasets.xmlfiecare *încarcăDateSetăriMinMinute*   (specificată în[setup.xml](/docs/server-admin/deploy-install#setupxml)) . Deci, puteți face modificări ladatasets.xmlîn orice moment, chiar și în timpERDDAP™Fuge.
Un nou set de date va fi detectat în curând, de obicei în *încarcăDateSetăriMinMinute* .
Un set de date modificat va fi reîncărcat atunci când este *reîncarcăEveryNMinutes* vechi (după cum se specifică îndatasets.xml) .
    
#### Steag{#flag} 
*    **[Fișier de pavilion](#flag)SpuneERDDAP™pentru a încerca să reîncărcați un set de date cât mai curând posibil** 
    
    *   ERDDAP™nu va observa nici o modificare a setului de date îndatasets.xmlpână laERDDAP™Reîncarcă setul de date.
         
    * Pentru a spuneERDDAP™pentru a reîncărca un set de date cât mai curând posibil (înainte de setul de date&lt;reîncărcareEveryNMinutes&gt; ar cauza reîncărcarea acestuia), a pus un fișier în *Big ParentDirectory* /flag ( *Big ParentDirectory* este specificat în[setup.xml](/docs/server-admin/deploy-install#setupxml)) care are același nume ca și setul de datedatasetID.
Asta spuneERDDAP™pentru a încerca să reîncărcați acel set de date cât mai curând posibil.
Vechea versiune a setului de date va rămâne disponibilă utilizatorilor până când noua versiune va fi disponibilă și va fi schimbată atomic.
PentruEDDGridDin fişiere şi tabel EDD De la Files, setul de date de reîncărcare va căuta fișiere noi sau modificate, le va citi și le va include în setul de date. Deci timpul pentru a reîncărca depinde de numărul de fișiere noi sau modificate.
În cazul în care setul de date este activ="fals,"ERDDAP™va elimina setul de date.
         
##### Steag fișiere rele{#bad-files-flag} 
* O variantă a /flag director este /badFilesFlag director. (AdăugatERDDAP™v2.12.)   
Dacă ați pus un fișier în *Big ParentDirectory* /BadFilesFlag director cu undatasetIDca nume de fișier (conținutul fișierului nu contează) , atunci imediat ceERDDAP™vede dosarele rele Fișier de pavilion;ERDDAP™va:
    
    1. Șterge fișierul BadFilesFlag.
    2. Șterge fișierele rele.ncfișier (dacă există una) , care are lista de fișiere rele pentru acel set de date.
Pentru seturi de date ca:EDDGridSideBySide care au copiiDatasets, acest lucru şterge, de asemenea, fişierele rele.ncfișier pentru toate setările de date pentru copii.
    3. Reîncarcă setul de date cât mai repede posibil.
    
Astfel, acest lucru cauzeazăERDDAP™pentru a încerca din nou să lucreze cu fișierele anterioare (În mod eronat?) Marcat la fel de rău.
         
##### Steag tare{#hard-flag} 
* O altă variantă a /flag director este /hardFlag director. (AdăugatERDDAP™v1.74.)   
Dacă puneți un fișier în *Big ParentDirectory* /hardFlag cu undatasetIDca nume de fișier (conținutul fișierului nu contează) , atunci imediat ceERDDAP™vede greu Fișier de pavilion;ERDDAP™va:
    
    1. Șterge fișierul hardFlag.
    2. Elimină setul de date dinERDDAP.
    3. Șterge toate informațiile careERDDAP™a stocat acest set de date.
PentruEDDGridDin fişiere şi tabel EDD Din subclasele Files, aceasta elimină baza de date internă a fișierelor de date și conținutul acestora.
Pentru seturi de date ca:EDDGridSideBySide care au copiiDatasets, acest lucru elimină, de asemenea, baza de date internă a fișierelor de date și conținutul acestora pentru toate setările de date pentru copii.
    4. Reîncarcă setul de date.
PentruEDDGridDin fişiere şi tabel EDD Din subclasele Fişierelor, asta cauzeazăERDDAP™pentru a reciti **toate** a fișierelor de date. Astfel, timpul de reîncărcare depinde de numărul total de fișiere de date din setul de date. Deoarece setul de date a fost eliminat dinERDDAP™atunci când hardFlag a fost observat, setul de date nu va fi disponibil până când setul de date nu va fi reîncărcat. Ai răbdare. Uită-te în[log.txt](#log)fișier dacă doriți să vedeți ce se întâmplă.
    
Varianta hardFlag șterge informațiile stocate ale setului de date chiar dacă setul de date nu este încărcat în prezentERDDAP.
    
Greu Steagurile sunt foarte utile atunci când faci ceva care cauzează o schimbare în modul în careERDDAP™citește și interpretează datele sursă, de exemplu, atunci când instalați o nouă versiune aERDDAP™sau atunci când ați modificat definiția unui set de date îndatasets.xml
    
* Conținutul steagului, BadFilesFlag, și fișiere hardFlag sunt irelevante.ERDDAP™doar se uită la numele fișierului pentru a obținedatasetID.
     
* Între reîncărcarea setului de date majore,ERDDAP™caută continuu steagul, fişierele BadFilesFlag şi hardFlag.
     
* Rețineți că atunci când un set de date este reîncărcat, toate fișierele din *Big ParentDirectory* /[cache](#cached-responses)/ *datasetID* directorul se elimină. Aceasta include.ncși fișiere imagine care sunt în mod normal cached pentru ~15 minute.
     
* Rețineți că dacă xml-ul setului include[active="fals"](/docs/server-admin/datasets#active), un steag va determina inactivarea setului de date (dacă este activ) , și în orice caz, nu reîncărcat.
     
* OricândERDDAP™ruleaza LoadDatasets pentru a face o reincarcare majora (timpul de reincarcare controlat de&lt;încarcăDateSeturiMinMinute&gt;) sau o reîncărcare minoră (ca urmare a unui steag extern sau intern) ,ERDDAP™citeste tot&lt;decomprimat CacheMaxGB&gt;,&lt;decomprimat CacheMaxMinutesOld&gt;,&lt;utilizator &gt;&lt;cerere Blacklist&gt;;&lt;lentTroubleMillis&gt; și&lt;abonareEmailBlacklist&gt; tag-uri și comutații la noile setări. Astfel încât să puteți utiliza un steag ca o modalitate de a obțineERDDAP™să observe modificările respectivelor etichete cât mai curând posibil.

##### Stabilește steagul Dataset{#set-dataset-flag} 
*  ERDDAP™are un serviciu web, astfel încât steagurile pot fi setate prin URL-uri.
    
    * De exemplu,
         https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789   
         (E un steag fals. Cheie) va stabili un steag pentru setul de date RPmelTao.
    * Există un steag diferit cheie pentru fiecaredatasetID.
    * Administratorii pot vedea o listă de URL-uri de pavilion pentru toate seturile de date prin căutarea la partea de jos a lor[Raport zilnic](#daily-report)E-mail.
    * Administratorii ar trebui să trateze aceste URL-uri ca fiind confidențiale, din moment ce dau cuiva dreptul de a reseta un set de date la voință.
    * Dacă credeți că steagul Cheile au căzut în mâinile cuiva care le abuzează, puteți schimba&lt;pavilionKeyKey&gt; în[setup.xml](/docs/server-admin/deploy-install#setupxml)și repornițiERDDAPsă forţezeERDDAP™să genereze și să utilizeze un set diferit de chei de pavilion.
    * Dacă vă schimbaţi&lt;pavilionKeyKey&gt;, șterge toate abonamentele vechi (vezi lista din Daily Report) și amintiți-vă să trimiteți noile URL-uri persoanelor pe care doriți să le aibă.
    
Sistemul de pavilion poate servi drept bază pentru un mecanism mai eficient pentru a spuneERDDAP™atunci când să reîncărcați un set de date. De exemplu, ai putea stabili un set de date&lt;reîncărcareEveryNMinutes&gt; la un număr mare (de exemplu 10080 = 1 săptămână) . Apoi, când ştii că setul de date s-a schimbat (Poate pentru că ai adăugat un fișier în dosarul de date al setului de date) , setează un steag astfel încât setul de date să fie reîncărcat cât mai curând posibil. Steagurile sunt de obicei văzute rapid. Dar dacă firul LoadDatasets este deja ocupat, poate fi un timp înainte de a fi disponibil pentru a acționa pe steag. Dar sistemul de pavilion este mult mai receptiv și mult mai eficient decât stabilirea&lt;reîncărcați EveryNMinutes&gt; la un număr mic.
    
#### Eliminarea seturilor de date{#removing-datasets} 
Dacă un set de date este activ înERDDAP™și doriți să-l dezactivați temporar sau permanent:
1. Îndatasets.xmlpentru setul de date, set[active="fals"](/docs/server-admin/datasets#active)în eticheta setului de date.
2. AşteptaţiERDDAP™pentru a elimina setul de date în timpul următoarei reîncărcări majore sau[setează un steag](#flag)pentru ca setul de date să indiceERDDAP™să observe această modificare cât mai curând posibil. Când faci asta,ERDDAP™nu aruncă nicio informație pe care ar fi putut-o stoca despre setul de date și cu siguranță nu face nimic datelor reale.
3. Apoi puteți lăsa setul de date activ="fals" îndatasets.xmlsau scoate-l.
         
#### Când sunt reîncărcate datele?{#when-are-datasets-reloaded} 
Un fir numit RunLoadDatasets este firul principal care controlează atunci când seturile de date sunt reîncărcate. RunLoad Setările de date sunt pentru totdeauna:

1. RunLoadDatasets notează ora curentă.
2. RunLoadDatasets începe un fir LoadDatasets pentru a face un "majorLoad." Puteţi vedea informaţii despre actual / anterior maiorLoad în partea de sus a dvs.ERDDAP's
    [/erddap/status.htmlpagină](#status-page)  (de exemplu,[exemplu pagină stare](https://coastwatch.pfeg.noaa.gov/erddap/status.html)) .
    
    1. LoadDatasets face o copie adatasets.xml.
    2. Seturile de date de încărcare citesc prin copia dedatasets.xmlși, pentru fiecare set de date, a se vedea dacă setul de date trebuie să fie (au) încărcat sau îndepărtat.
        * Dacă[pavilion](#flag)fișierul există pentru acest set de date, fișierul este șters și setul de date este eliminat dacă activ="fals" sau (au) încărcat dacă activ="true" (indiferent de vârsta setului de date) .
        * Dacă setul de date.xml bucată are activ="fals" și setul de date este încărcat în prezent (activă) , este descărcat (eliminate) .
        * Dacă setul de date are "adevărat" activ și setul de date nu este deja încărcat, acesta este încărcat.
        * În cazul în care setul de date are "adevărat" activ și setul de date este deja încărcat, setul de date este reîncărcat dacă vârsta setului de date (timp de la ultima încărcare) este mai mare decât&lt;reîncărcare Fiecare NMinute &gt; (implicit = 10080 minute) , altfel, setul de date este lăsat în pace.
    3. Setul de date se termină.
    
Firul RunLoadDatasets așteaptă ca firul LoadDatasets să se termine. În cazul în care datele de sarcină durează mai mult decât seturile de date de încărcare MinMinute (conform specificațiilor din setup.xml) , RunLoadDatasets întrerupe firul LoadDatasets. Ideal, LoadDatasets observă întreruperea și termină. Dar dacă nu observă întreruperea într-un minut, RunLoadDatasets sună la încărcareDatasets. Oprește-te () Ceea ce e de nedorit.
3. În timp ce timpul de la începutul ultimului maiorLoad este mai mic decât loadDatasets MinMinute (conform specificațiilor din setup.xml, de exemplu, 15 minute) , RunLoadDatasets caută în mod repetat[pavilion](#flag)fișiere în *Big ParentDirectory* /Flag director. Dacă se găsește unul sau mai multe fișiere de pavilion, acestea sunt șterse, iar RunLoadDatasets începe un fir de date pentru a face un "minorLoad" (MajorLoad=fals) . Nu puteți vedea informații minore Load pe dumneavoastrăERDDAP's[/erddap/status.htmlpagină](#status-page).
    1. LoadDatasets face o copie adatasets.xml.
    2. Seturile de date de încărcare citesc prin copia dedatasets.xmlși, pentru fiecare set de date pentru care a existat un fișier de pavilion:
        * Dacă setul de date.xml bucată are activ="fals" și setul de date este încărcat în prezent (activă) , este descărcat (eliminate) .
        * Dacă setul de date are "adevărat," setul de date este: (au) încărcat, indiferent de vârstă. Seturile de date neexplorate sunt ignorate.
    3. Setul de date se termină.
4. RunLoad Datasets revine la pasul 1.

Note:
* Startup
Când reporneştiERDDAP™, fiecare set de date cu "adevărat" activ este încărcat.
* Cache
Atunci când un set de date este (au) Încărcat, cache-ul său (inclusiv orice fișiere de răspuns la date și/sau fișiere de imagine) este golit.
* Multe seturi de date
Dacă aveți o mulțime de seturi de date și/sau unul sau mai multe seturi de date sunt lente la (au) sarcina, un fir LoadDatasets poate dura mult timp pentru a termina munca sa, poate chiar mai mult decât încarcaDatasets MinMinutes.
* Un fir de date de încărcare
Nu există niciodată mai mult de un fir LoadDatasets care rulează simultan. În cazul în care un steag este setat atunci când LoadDatasets este deja în funcțiune, steagul, probabil, nu va fi observat sau acționat până când firul LoadDatasets se termină de funcționare. Ai putea spune: "E o prostie. De ce nu începi o grămadă de fire noi pentru a încărca seturi de date?" Dar dacă aveți o mulțime de seturi de date care obține date de la un server de la distanță, chiar și un fir LoadDatasets va pune un stres substanțial pe serverul de la distanță. Acelaşi lucru este adevărat dacă aveţi o mulţime de seturi de date care obţin date din fişierele unui RAID. Există rapid diminuarea returnărilor de la a avea mai mult de un fir LoadDatasets.
* Steag = ASAP
Setarea unui steag doar semnalizează că setul de date ar trebui să fie (au) încărcat cât mai curând posibil, nu neapărat imediat. În cazul în care niciun fir de date de sarcină nu funcționează în prezent, setul de date va începe să fie reîncărcat în câteva secunde. Dar dacă un fir LoadDatasets rulează în prezent, setul de date probabil nu va fi reîncărcat decât după ce firul de date este terminat.
* Fișier de pavilion șters
În general, dacă ați pus un fișier de pavilion în *Big ParentDirectory* /erddap/flag director (prin vizitarea steagului setului de date Url sau punerea unui fișier real acolo) , setul de date va fi, de obicei, reîncărcat foarte curând după ce fișierul de pavilion este șters.
* Steag versus Reîncărcare mică Fiecare NMuta
Dacă aveţi un mod extern de a şti când trebuie reîncărcat un set de date şi dacă este convenabil pentru dumneavoastră, cea mai bună modalitate de a vă asigura că un set de date este întotdeauna actualizat este de a seta reîncărca Fiecare NMinutes la un număr mare (10080?) și a stabilit un steag (printr-un scenariu?) ori de câte ori trebuie să fie reîncărcat. Acesta este sistemul careEDDGridDe la Erddap și EDDTableFromErddap use primi mesaje că setul de date trebuie reîncărcat.
* Caută în jurnal.txt
Multe informaţii relevante sunt scrise *Big ParentDirectory* /logs/log.txt file. Dacă lucrurile nu merg aşa cum te aştepţi, uită-te la jurnal. Txt vă permite să diagnosticheze problema prin aflarea exact ceea ceERDDAP™Da.
    
    * Caută "majorLoad=true" pentru începutul principalelor fire LoadDataset.
    * Caută "majorLoad=fals" pentru începutul de fire minore LoadDatasets.
    * Caută un set de date datdatasetIDpentru informații despre aceasta fiind (au) încărcat sau interogat.
        
          
         
#### Răspunsurile cache{#cached-responses} 
În general,ERDDAP™Nu are cache (depozit) răspunsuri la cererile utilizatorilor. Raţionamentul a fost că majoritatea cererilor ar fi puţin diferite, astfel încât cache-ul să nu fie foarte eficient. Cele mai mari excepții sunt cererile de fișiere de imagine (care sunt cached deoarece browsere și programe cum ar fiGoogle Earthsolicită adesea imagini) și cererile.ncfișiere (pentru că nu pot fi create în zbor.) .ERDDAP™depozitează fișierele cache ale fiecărui set de date într-un alt director: *Big ParentDirectory* /cache/ *datasetID* Deoarece un singur director cache ar putea avea un număr imens de fișiere care ar putea deveni lent pentru a accesa.
Fișierele sunt eliminate din cache pentru unul din trei motive:
* Toate fișierele din acest cache sunt șterse atunci cândERDDAP™se reia.
* Periodic, orice fișier mai mult decât&lt;CacheMinute&gt;vechi (după cum se specifică în[setup.xml](/docs/server-admin/deploy-install#setupxml)) vor fi şterse. Eliminarea fișierelor din cache pe baza vârstei (neutilizate cel mai puțin recent) asigură că dosarele nu vor sta în cache foarte mult timp. Deși s-ar putea părea ca o cerere dată ar trebui să se întoarcă întotdeauna același răspuns, că nu este adevărat. De exemplu,tabledapcerere care include & timp&gt; *unele Timp* se modifică dacă sosesc date noi pentru setul de date. Și o cerere griddap care include\\[ultima\\]pentru dimensiunea temporală se va schimba dacă sosesc date noi pentru setul de date.
* Imagini care arată condiții de eroare sunt cached, dar numai pentru câteva minute (E o situaţie dificilă.) .
* De fiecare dată când un set de date este reîncărcat, toate fișierele din cache-ul acelui set de date sunt șterse. Deoarece cererile pot fi pentru"last"indexul dintr-un set de date grilat, fișierele din cache pot deveni invalide atunci când un set de date este reîncărcat.
         
#### Informații privind setul de date stocate{#stored-dataset-information} 
Pentru toate tipurile de seturi de date,ERDDAP™colectează o mulțime de informații atunci când un set de date este încărcat și păstrează asta în memorie. Acest lucru permiteERDDAP™să răspundă foarte rapid căutărilor, cererilor de liste de seturi de date și cererilor de informații cu privire la un set de date.

Pentru câteva tipuri de seturi de date (în specialEDDGridRecepţionat, EDDtableCopy,EDDGridDe la *Xxx* Fișiere și tabel EDDDe la *Xxx* Fișiere) ,ERDDAP™stochează pe disc unele informații despre setul de date care este reutilizat atunci când setul de date este reîncărcat. Acest lucru accelerează foarte mult procesul de reîncărcare.

* Unele dintre fișierele de informații privind seturile de date pot fi citite de om.jsonfișiere și sunt stocate în *Big ParentDirectory* /Set de date/ *Ultimele 2Scrisoare de dateID/datasetID* .
*   ERDDAP™șterge aceste fișiere în situații neobișnuite, de exemplu, dacă adăugați sau ștergeți o variabilă din setul de datedatasets.xmlChunk.
* Majoritatea modificărilor aduse unui set de datedatasets.xmlbucată (De exemplu, modificarea unui atribut global sau a unui atribut variabil) nu trebuie să ștergeți aceste fișiere. O reîncărcare regulată a setului de date va gestiona aceste tipuri de modificări. Se vede.ERDDAP™reîncărcarea unui set de date ASAP prin setarea unei[pavilion](#flag)pentru setul de date.
* În mod similar, adăugarea, ștergerea sau modificarea fișierelor de date vor fi tratate atunci cândERDDAP™reîncărca un set de date. Dar...ERDDAP™va observa acest tip de modificare în curând și automat în cazul în care setul de date utilizează [&lt;updateEveryNMillis&gt;] (/docs/server-admin/sets#datate everyenmmillis) sistem.
* Ar trebui doar rareori să fie necesar pentru a șterge aceste fișiere. Cea mai comună situaţie în care trebuie să forţeziERDDAP™pentru a șterge informațiile stocate (pentru că este depășit/incorect și nu va fi reparat automat deERDDAP) este atunci când face modificări la setul de datedatasets.xmlbucată care afectează modul în careERDDAP™interpretează datele din fișierele sursă de date, de exemplu, schimbând șirul de format al variabilei de timp.
* Pentru a șterge fișierele de informații stocate ale unui set de date dintr-oERDDAP™care rulează (chiar dacă setul de date nu este încărcat în prezent) , set a[tare Steag](#hard-flag)pentru acel set de date. Rețineți că, dacă un set de date este o agregarea unui număr mare de fișiere, reîncărcarea setului de date poate dura mult timp.
* Pentru a șterge fișierele de informații stocate ale unui set de date atunci cândERDDAP™Nu fuge, fugi.[DasDds](/docs/server-admin/datasets#dasdds)pentru acel set de date (care este mai ușor decât imaginind în care director informațiile este situat și ștergerea fișierelor de mână) . Rețineți că, dacă un set de date este o agregarea unui număr mare de fișiere, reîncărcarea setului de date poate dura mult timp.
         
### Stare memorie{#memory-status} 
ERDDAP™N-ar trebui să se prăbuşească sau să îngheţe. Dacă o face, una dintre cele mai probabile cauze este insuficienta memorie. Puteți monitoriza utilizarea memoriei uitându-vă la status.html pagina web, care include o linie asemănătoare

0 apeluri GC, 0 cereri vărsat, și 0 periculoase MemoryEmail-uri de la ultimele date importante

 (acestea sunt evenimente progresiv mai grave)   
și MB inUse și Gc Calls coloane în tabelul de statistici. Îţi poţi da seama cât de stresată îţi este memoria.ERDDAP™Este de vizionarea acestor numere. Numerele mai mari indică mai mult stres.

* MB InUse trebuie să fie întotdeauna mai puțin de jumătate din[Setarea memoriei \\-Xmx](/docs/server-admin/deploy-install#memory). Numerele mai mari sunt un semn rău.
* apeluri GC indică numărul de oriERDDAP™L-a sunat pe gunoier să încerce să atenueze folosirea memoriei. Dacă ajunge la &gt; 100, e un semn de probleme serioase.
* șopron indică numărul de cereri primite care au fost vărsate (cu numărul de eroare HTTP 503, serviciul Indisponibil) deoarece utilizarea memoriei era deja prea mare. În mod ideal, nici o cerere nu ar trebui să fie vărsat. Este în regulă dacă câteva cereri sunt vărsate, dar un semn de probleme serioase dacă multe sunt vărsate.
* periculoase MemoryEmail-uri - În cazul în care utilizarea memoriei devine periculos de mare,ERDDAP™trimite un e-mail la adresele de email enumerate în&lt;emailTotul To&gt; (în setup.xml) cu o listă a cererilor de utilizatori activi. După cum spune e-mailul, vă rugăm să transmiteţi aceste e-mailuri lui Chris. John la Noaa. Gov astfel încât să putem folosi informațiile pentru a îmbunătăți versiunile viitoare aleERDDAP.
     

DacăERDDAP™este stresată de memorie:
* Luați în considerare alocarea mai multor din memoria serverului dumneavoastrăERDDAP™prin schimbarea Tomcat[Setare memorie -Xmx](/docs/server-admin/deploy-install#memory).
* Dacă ați alocat deja la fel de mult memorie ca tine poateERDDAP™via -Xmx, ia în considerare cumpărarea mai multe amintiri pentru server. Memoria e ieftină. (în comparație cu prețul unui nou server sau timpul dumneavoastră) &#33; Apoi crește -Xmx.
* Îndatasets.xml, set&lt;nGridThreads&gt;-1 set&lt;nTabelThreads&gt; to 1, and set&lt;ipAddressMaxRequestsActive&gt; to 1.
* Uită-te la cererile în log.txt pentru ineficient sau supărător (dar legitim) cereri. Adaugă adresele IP&lt;cerere Lista neagră &gt; îndatasets.xml. Mesajul de eroare lista neagră includeERDDAP™adresa de e-mail a administratorului cu speranța că acei utilizatori vă vor contacta astfel încât să puteți lucra cu ei pentru a utilizaERDDAP™mai eficient. Este bine să păstreze o listă de adrese IP vă lista neagră și de ce, astfel încât să puteți lucra cu utilizatorii în cazul în care vă contactează.
* Uită-te la cererile în log.txt pentru cererile utilizatorilor maliţioşi. Adaugă adresele IP&lt;cerere Lista neagră &gt; îndatasets.xml. În cazul în care cereri similare provin de la mai multe adrese IP similare, puteți utiliza unele servicii Who-is (de exemplu,[ https://www.whois.com/whois/ ](https://www.whois.com/whois/)) pentru a afla gama de adrese IP de la acea sursă și lista neagră întreaga gamă. Vezi&lt;cerere Lista neagră &gt; documentare] (/docs/server-admin/sets#request blacklist) .
         
#### OutofMemoryError{#outofmemoryerror} 
Când configurațiERDDAP™, specificati cantitatea maxima de memorie careJavapoate fi utilizat prin[Setare \\-Xmx](/docs/server-admin/deploy-install#memory). DacăERDDAP™Are nevoie de mai multă memorie decât atât, va arunca o java. Lang. OutofMemoryError.ERDDAP™face o mulțime de verificare pentru a permite să se ocupe de această eroare grațios (De exemplu, o cerere supărătoare va eşua, dar sistemul îşi păstrează integritatea) . Dar, uneori, eroarea daune integritatea sistemului și trebuie să reporneascăERDDAP. Să sperăm că e rar.

Soluţia rapidă şi uşoară pentru un OutOfMemoryError este de a creşte[Setare \\-Xmx](/docs/server-admin/deploy-install#memory), dar nu ar trebui să crească niciodată -Xmx setarea la mai mult de 80% din memoria fizică în server (de exemplu, pentru un server 10GB, nu setați -Xmx peste 8GB) . Memoria este relativ ieftin, astfel încât poate fi o opțiune bună pentru a crește memoria în server. Dar dacă ați maximizat memoria în server sau din alte motive nu se poate crește, trebuie să se ocupe mai direct cu cauza OutOfMemoryError.

Dacă te uiţi în[log.txt](#log)fișier pentru a vedea ceERDDAP™a fost de a face atunci când eroarea a apărut, puteți obține, de obicei, un indiciu bun cu privire la cauza OutOfMemoryError. Există o mulțime de cauze posibile, inclusiv:

* Un singur fișier imens de date poate cauza OutOfMemoryError, în special, fișiere uriașe de date ASCII. Dacă aceasta este problema, ar trebui să fie evident, deoareceERDDAP™nu va încărca setul de date (pentru seturi de date tabelare) sau citiți datele din fișierul respectiv (pentru seturi de date în rețea) . Soluția, dacă este posibil, este de a împărți fișierul în mai multe fișiere. În mod ideal, puteți împărți fișierul în bucăți logice. De exemplu, în cazul în care fișierul are în valoare de 20 de luni de date, împărțit în 20 de fișiere, fiecare cu o lună de date. Dar există avantaje chiar dacă fişierul principal este împărţit arbitrar. Această abordare are multiple beneficii: a) Acest lucru va reduce memoria necesară pentru a citi fișierele de date la 1/20th, deoarece doar un singur fișier este citit la un moment dat. b) Adesea,ERDDAP™poate face față cererilor mult mai repede, deoarece trebuie doar să se uite într-unul sau câteva fișiere pentru a găsi datele pentru o anumită cerere. c) Dacă colectarea datelor este în curs de desfășurare, atunci cele 20 de fișiere existente pot rămâne neschimbate și trebuie doar să modificați unul, mic, nou fișier pentru a adăuga datele din luna următoare la setul de date.
* O singură cerere uriașă poate provoca OutOfMemoryError. În special, unele dintreorderByopțiunile au întregul răspuns în memorie pentru o secundă (de exemplu, pentru a face un fel de) . Dacă răspunsul este imens, poate duce la eroare. Vor exista întotdeauna unele cereri care sunt, în diferite moduri, prea mari. Puteți rezolva problema prin creșterea setarea -Xmx. Sau, puteți încuraja utilizatorul să facă o serie de cereri mai mici.
* Este puțin probabil ca un număr mare de fișiere să provoace indicele de fișier careERDDAP™creează să fie atât de mare încât acel fișier ar cauza eroarea. Dacă presupunem că fiecare fișier folosește 300 de octeți, atunci 1.000.000 de fișiere ar lua doar 300MB. Dar seturile de date cu un număr mare de fișiere de date cauzează alte probleme pentruERDDAPÎn special, durează mult timp.ERDDAP™să deschidă toate acele fișiere de date atunci când răspund la o cerere de date a utilizatorului. În acest caz, soluția poate fi de agrega fișierele astfel încât să existe mai puține fișiere de date. Pentru seturile de date tabulare, este adesea mare dacă salvați datele din setul de date curent în[CF Geometrii de eșantionare discrete (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Fișiere de date Contiguous Ragged Array (cerere.ncFișiere CF dinERDDAP) și apoi să facă un nou set de date. Aceste fișiere pot fi manipulate foarte eficient cuERDDAP's[Tabel EDD din NCFFile](/docs/server-admin/datasets#eddtablefromnccffiles). Dacă sunt organizate logic (fiecare cu date pentru o bucată de spațiu și timp) ,ERDDAP™poate extrage date de la ei foarte repede.
* Pentru seturile de date tabelare care utilizează [&lt;subsetVariables&gt;] (/docuri/server-admin/seturi de date#subsetvariabile) atribut;ERDDAP™face un tabel de combinații unice ale valorilor acestor variabile. Pentru seturi de date uriașe sau când&lt;subsetVariables&gt; este configurat greşit, acest tabel poate fi suficient de mare pentru a provoca OutOfMemoryErrors. Soluţia este de a elimina variabilele din lista de&lt;subsetVariables&gt; pentru care există un număr mare de valori sau se elimină variabilele necesare până când dimensiunea tabelului respectiv este rezonabilă. PărţileERDDAP™care utilizeazăsubsetVariablessistemul nu funcţionează bine. (De exemplu, paginile web încarcă foarte încet) atunci când există mai mult de 100.000 de rânduri în această masă.
* Este întotdeauna posibil ca mai multe cereri simultane mari (pe un foarte ocupatERDDAP) se pot combina pentru a provoca probleme de memorie. De exemplu, 8 cereri, fiecare folosind 1GB fiecare, ar cauza probleme pentru o configurare -Xmx=8GB. Dar este rar ca fiecare cerere să fie în vârful memoriei folosite simultan. Și v-ar fi ușor de a vedea că dvs.ERDDAP™este foarte ocupat cu cereri mari. Dar e posibil. Este greu să se ocupe de această problemă, altele decât prin creșterea setarea -Xmx.
* Există şi alte scenarii. Dacă te uiţi la[log.txt](#log)fișier pentru a vedea ceERDDAP™Când a apărut eroarea, de obicei poţi obţine un indiciu bun despre cauză. În majoritatea cazurilor, există o modalitate de a minimiza această problemă (vezi mai sus) Dar câteodată ai nevoie de mai multă memorie şi de o setare Xmx mai mare.
         
### Prea multe fișiere deschise{#too-many-open-files} 
Începând cuERDDAP™v2.12;ERDDAP™dispune de un sistem de monitorizare a numărului de fișiere deschise (care include prize și alte lucruri, nu doar fișiere) în Tomcat pe computere Linux. Dacă unele dosare nu se închid niciodată din greşeală (o "scurgere de resurse") , numărul de fișiere deschise poate crește până când depășește maximul permis de sistemul de operare și se întâmplă numeroase lucruri foarte rele. Deci, acum, pe calculatoare Linux (deoarece informațiile nu sunt disponibile pentru Windows) :

* Există o coloană "Deschide fișierele" pe partea dreaptă a statutului.html pagina web care arată procentul de fișiere max deschise. Pe Windows, arată doar "?"
* CândERDDAP™generează aceste informații la sfârșitul fiecărei reîncărcări majore a setului de date, va imprima în jurnal. fișier txt:
OpenFileCount= *curent* max = *max* % = *%* 
* Dacă procentul este &gt; 50%, se trimite un e-mail laERDDAP™administrator și e-mail Totul Pentru adrese de e-mail.

Dacă procentul este 100%,ERDDAP™are probleme teribile. Nu lăsa să se întâmple asta.
Dacă procentul este &gt;75%,ERDDAP™este aproape de probleme teribile. Nu e în regulă.
Dacă procentul este &gt;50%, este foarte posibil ca un vârf să determine procentul să atingă 100.
Dacă procentul este vreodată &gt; 50%, trebuie:
* Creșterea numărului maxim de fișiere deschise permise de:
    * Efectuarea acestor modificări de fiecare dată înainte de a începe Tomcat (Pune-le în dosarul Tomcat startup.sh?) :
ulimit - Hn 16384
ulimit - Sn 16384
    * Sau o schimbare permanentă prin editare (ca rădăcină) /etc/security/limite.conf și adăugarea liniilor:
tomcat soft nofile 16384
tomcat hard nofile 16384
Aceste comenzi presupune că utilizatorul care rulează Tomcat este numit "tomcat."
Pe multe variante Linux, trebuie să reporniți serverul pentru a aplica aceste modificări. Pentru ambele opțiuni, "16384" de mai sus este un exemplu. Tu alegi numărul care crezi că e cel mai bine.
* RepornireERDDAP. Sistemul de operare va închide orice fişiere deschise.
         
### Cereri eșuate{#failed-requests} 
*    **Activitatea neobișnuită: &gt;25% din cereri au eșuat**   
Ca parte din fiecare reîncărcare Date, care este de obicei la fiecare 15 minute,ERDDAP™analizează procentul cererilor care au eșuat de la ultima reîncărcareDate de date. Dacă este &gt; 25%,ERDDAP™trimite un e-mailERDDAP™administrator cu subiectul "Activitate neobișnuită: &gt;25% din cereri au eșuat." Acest e-mail include un punctaj în apropierea fundului intitulat "Requester's IP Address (Eșec)   (de la ultimele date de încărcare majore) ". Caută asta. Vă spune adresa IP a computerelor care fac cele mai multe cereri eșuate. Puteți căuta apoi pentru acele adrese IP în\\[Big ParentDirectory\\]/loguri/[log.txt](#log)fișier și a vedea ce tip de cereri pe care le fac.
    
Puteți utiliza numărul IP al utilizatorului (de exemplu, cu[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)) pentru a încerca să dau seama cine sau ce utilizator este. Uneori, care vă va spune destul de exact cine este utilizatorul (De exemplu, este un crawler web motor de căutare) . De cele mai multe ori îţi dă un indiciu. (De exemplu, este un computer Amazonaws, este de la o universitate, este cineva într-un anumit oraș) .
    
Prin examinarea cererii reale, a numărului IP și a mesajului de eroare (toate de la[log.txt](#log)) pentru o serie de erori, de obicei, puteți da seama ce se întâmplă în principiu greșit. Din experienţa mea, există patru cauze comune ale multor cereri eşuate:
    
1) Cererile sunt răutăcioase (De exemplu, în căutarea unor deficiențe de securitate sau în efectuarea de cereri și apoi anularea acestora înainte de finalizarea acestora) . Trebuie să utilizaţi&lt;cerere Lista neagră &gt; îndatasets.xmlPentru a lista negru aceste adrese IP.
    
2) Un motor de căutare încearcă naiv URL-urile enumerate înERDDAP™pagini web și documente ISO 19115. De exemplu, există multe locuri care enumeră bazaOPeNDAPURL, de exemplu, https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST , la care utilizatorul ar trebui să adauge un tip de fișier (de exemplu, .das, .dds, .html) . Dar motorul de căutare nu ştie asta. Cererea către URL-ul de bază eşuează. O situație similară este atunci când motorul de căutare generează cereri bizare sau încearcă să completeze formulare pentru a ajunge la pagini web "ascunse." Dar motoarele de căutare fac adesea o treabă proastă, ceea ce duce la eşecuri. Soluţia este:[roboți.txt](#robotstxt)Dosar.
    
3) Un utilizator rulează un script care cere în mod repetat ceva ce nu există. Poate că este un set de date care a existat, dar este plecat acum (temporar sau permanent) . Scripturile nu se asteapta de multe ori la asta, asa ca nu face fata inteligent. Deci scenariul continuă să facă cereri şi cererile continuă să eşueze. Dacă puteţi ghici cine este utilizatorul (din numărul IP de mai sus) , contactează-i și spune-le că setul de date nu mai este disponibil și cere-le să își schimbe scenariul.
    
4) Ceva este într-adevăr în neregulă cu unele seturi de date. De obicei,ERDDAP™va face setul de date tulburat inactiv. Uneori nu, aşa că toate cererile duc la erori. Dacă da, rezolvați problema cu setul de date sau (daca nu poti) Setează setul de date[active="fals"](/docs/server-admin/datasets#active). Desigur, acest lucru poate duce la problema nr. 2.
    
Uneori erorile nu sunt atât de rele, în special, dacăERDDAP™poate detecta eroarea și răspunde foarte repede (&lt;=1ms). Aşa că puteţi decide să nu acţionaţi.
    
Dacă toate celelalte nu reușesc, există o soluție universală: adăugați numărul IP al utilizatorului la [&lt;cerere Lista neagră &gt;] (/docs/server-admin/sets#request blacklist) . Acest lucru nu este la fel de rău sau la fel de drastic o opțiune cum ar putea părea. Utilizatorul va primi apoi un mesaj de eroare care spune s/el a fost listat negru și le spune (nuERDDAP™administratorului) adresa de e-mail. Uneori, utilizatorul vă va contacta și puteți rezolva problema. Uneori utilizatorul nu vă contactează și veți vedea exact același comportament provenind de la un număr IP diferit a doua zi. Blacklist noul număr IP și speră că vor primi mesajul în cele din urmă. (Ori aceasta este Ziua Cârtiţei din care nu veţi scăpa niciodată. Scuze.) 
    
### roboți.txt{#robotstxt} 
Companiile de motoare de căutare folosesc crawlere web (De exemplu, Google Bot) să examineze toate paginile de pe web pentru a adăuga conținutul la motoarele de căutare. PentruERDDAP™, care este practic bun.ERDDAP™are o mulțime de link-uri între pagini, astfel încât crawlers vor găsi toate paginile web și le adaugă la motoarele de căutare. Apoi, utilizatorii motoarelor de căutare vor putea găsi seturi de date pe dvs.ERDDAP.
    
Din păcate, unele crawlere web (De exemplu, Google Bot) completează și prezintă acum formulare pentru a găsi conținut suplimentar. Pentru site-uri comerciale pe web, acest lucru este mare. Dar asta e groaznic pentruERDDAP™pentru că doar duce la o **infinit** numărul de încercări nedorite și inutile de a târî datele reale. Acest lucru poate duce la mai multe cereri de date decât de la toți ceilalți utilizatori combinați. Şi umple motorul de căutare cu subseturi de date.
    
Pentru a spune crawlere web pentru a opri completarea formularelor și pur și simplu în general nu se uită la pagini web nu au nevoie să se uite la, aveți nevoie pentru a crea un fișier text numit[roboți.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)în directorul rădăcină al ierarhiei documentelor site-ului dvs., astfel încât acesta să poată fi privit de oricine ca, de exemplu, http://*www.your.domain*/robots.txt .
Dacă creaţi un nou robot. Txt fişier, acesta este un început bun:
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
     (Dar înlocuiţi *Dvs.institutii.url* cuERDDAPURL-ul de bază.)   
Este posibil să dureze câteva zile pentru ca motoarele de căutare să observe și ca modificările să intre în vigoare.
     
### sitemap.xml{#sitemapxml} 
Ca[ https://www.sitemaps.org ](https://www.sitemaps.org/)site-ul spune:

> Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. In its simplest form, a Sitemap is an XML file that lists URLs for a site along with additional metadata about each URL (when it was last updated, how often it usually changes, and how important it is, relative to other URLs on the site) so that search engines can more intelligently crawl the site.
> 
> Web crawlers usually discover pages from links within the site and from other sites. Sitemaps supplement this data to allow crawlers that support Sitemaps to pick up all URLs in the Sitemap and learn about those URLs using the associated metadata. Using the Sitemap protocol does not guarantee that web pages are included in search engines, but provides hints for web crawlers to do a better job of crawling your site.

De fapt, de cândERDDAP™esteRESTful, paianjeni motor de căutare poate târî cu ușurințăERDDAP. Dar ei tind să o facă mai des (Zilnic&#33;) decât este necesar (Lunar?) .

* Având în vedere că fiecare motor de căutare poate fi crawling întreagaERDDAP™În fiecare zi, acest lucru poate duce la o mulțime de cereri inutile.
* Deci...ERDDAP™generează un fișier sitemap.xml pentru dvs.ERDDAP™care spune motoarele de căutare că dumneavoastrăERDDAP™Trebuie doar să fie târât în fiecare lună.
* Ar trebui să adăugați o trimitere laERDDAP's sitemap.xml to your[roboți.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)fișier:
Harta site-ului: http://**www.yoursite.org**/erddap/sitemap.xml
 
* În cazul în care nu pare a fi obtinerea mesajul la crawlere, puteți spune diferite motoare de căutare despre fișierul sitemap.xml prin vizitarea acestor URL-uri (dar schimba **Instituţia dumneavoastră** acronimul sau abrevierea instituției dumneavoastră și **www.yoursite.org** la dumneavoastrăERDDAPURL- ul lui) :
    *    https://www.bing.com/webmaster/ping.aspx?siteMap=http://**www.yoursite.org**/erddap/sitemap.xml
 
    *    https://www.google.com/ping?sitemap=http://**www.yoursite.org**/erddap/sitemap.xml(I Trebuie doar să ping fiecare motor de căutare o dată, pentru totdeauna. Motoarele de căutare vor detecta apoi modificări la sitemap.xml periodic.
     
### Diseminarea datelor / Distribuirea datelor Rețele:PushşiPullTehnologie{#data-dissemination--data-distribution-networks-push-and-pull-technology} 
* În mod normal,ERDDAP™acționează ca intermediar: ia o cerere de la un utilizator; obține date de la o sursă de date la distanță; reformulează datele; și le trimite utilizatorului.
*   [PullTehnologie](https://en.wikipedia.org/wiki/Pull_technology):ERDDAP™are, de asemenea, capacitatea de a obține în mod activ toate datele disponibile de la o sursă de date la distanță și[stochează o copie locală a datelor](/docs/server-admin/datasets#eddgridcopy).
*   [PushTehnologie](https://en.wikipedia.org/wiki/Push_technology): FolosindERDDAP's[Servicii de abonament](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions), alte servere de date pot fi notificate de îndată ce sunt disponibile date noi, astfel încât acestea să poată solicita datele (trăgând datele) .
*   ERDDAP's[EDDGridFromErddap](/docs/server-admin/datasets#eddfromerddap)şi[Tabel EDD FromErddap](/docs/server-admin/datasets#eddfromerddap)AdministrareERDDAPservicii de abonament și[Sistemul de pavilion](#flag)pentru a fi notificate imediat când sunt disponibile date noi.
* Puteți combina acestea la efect mare: dacă ați împacheta unEDDGridCopiază în jurul unuiEDDGridSet de date de la Erddap (sau înfășurați un set de date EDD TableCopy în jurul unui set de date EDDFromErddap) ,ERDDAP™va crea și menține automat o copie locală a alteiaERDDAPSetul de date.
* Deoarece serviciile de abonament funcționează de îndată ce sunt disponibile noi date, împinge tehnologia difuzează datele foarte repede (în câteva secunde) .

Această arhitectură pune fiecareERDDAP™administrator însărcinat cu determinarea locului în care datele pentru persoana în cauzăERDDAP™vine de la.

* AlteleERDDAP™Administratorii pot face la fel. Nu este nevoie de coordonare între administratori.
* Dacă mulţiERDDAP™Administratorii se leagă între eiERDDAPs, se formează o rețea de distribuție a datelor.
* Datele vor fi difuzate rapid, eficient și automat din surse de date (ERDDAPs și alte servere) la siturile de redistribuire a datelor (ERDDAPs) oriunde în reţea.
* O datăERDDAP™poate fi atât o sursă de date pentru anumite seturi de date, cât și un sit de redistribuire pentru alte seturi de date.
* Reţeaua rezultată este aproximativ similară cu reţelele de distribuţie a datelor create cu programe precum[Unidata'S IDD/IDM](https://www.unidata.ucar.edu/projects/index.html#idd), dar mai puțin rigid structurat.
         
### Securitate, autentificare şi autorizare{#security-authentication-and-authorization} 
În mod implicit,ERDDAP™rulează ca un server în întregime public (cuhttpși/sauhttps) fără autentificare ([autentificare](https://en.wikipedia.org/wiki/Authentication)) sistem și nicio restricție privind accesul la date ([Autorizare](https://en.wikipedia.org/wiki/Authorization)) .

#### Securitatea{#security} 
Dacă doriţi să restricţionaţi accesul la unele sau toate seturi de date la unii utilizatori, puteţi utilizaERDDAPE un sistem de securitate încorporat. Atunci când sistemul de securitate este utilizat:

*   ERDDAP™utilizări[controlul accesului bazat pe rol;](https://en.wikipedia.org/wiki/Role-based_access_control).
    * ăERDDAP™administratorul definește utilizatorii cu [&lt;utilizator &gt;] (/docs/server-admin/sets#user) tag indatasets.xml. Fiecare utilizator are un nume de utilizator, o parolă (dacă autentificarea=custom) Şi unul sau mai multe roluri.
    * ăERDDAP™Administratorul definește rolurile care au acces la un anumit set de date prin intermediul [&lt;Access to&gt;] (/docs/server-admin/sets#accessibleto) tag indatasets.xmlpentru orice set de date care nu ar trebui să aibă acces public.
* Starea de autentificare a utilizatorului (și un link de logat/out) va fi afișat în partea de sus a fiecărei pagini web. (Dar un logat în utilizator va apăreaERDDAP™să nu fie autentificat dacă utilizeazăhttpURL.) 
* Dacă&lt;bazăUrl&gt; pe care le specificaţi în setup.xml este un **http** URL, utilizatorii care nu sunt autentificati pot utilizaERDDAP's **http** URL-uri. Dacă&lt;BazaHttpsUrl&gt; este, de asemenea, specificat, utilizatorii care nu sunt autentificate în poate utiliza, de asemenea,httpsURL-uri.
* Numai HTTPS... Dacă&lt;bazăUrl&gt; pe care le specificaţi în setup.xml este un **https** URL- ul, utilizatorii care nu sunt conectați sunt încurajați (neforțat) de utilizatERDDAP's **https** URL-uri -- toate link-urileERDDAP™pagini web se va referi lahttpsURL-uri.
    
Dacă doriți să forțați utilizatorii să utilizezehttpsURL, adăugați o linie permanentă Redirect în interiorul&lt;VirtualHost \\*:80&gt; sectiunea din fisierul dvs. de configurare Apache (de obiceihttpd.conf) , de exemplu,
    
```
    <VirtualHost \\*:80>
        \\[...\\]
        ServerName example.com
        Redirect permanent / https://example.com/
    </VirtualHost>
```

Dacă doriți, există o metodă suplimentară pentru a forța utilizareahttps: [HTTP Securitate strictă a transporturilor (HTS) ](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security). Pentru a-l folosi:
    
    1. Activează antetele Apache: antetele a2enmod
    2. Adăugați antetul suplimentar la directiva HTTPS VirtualHost. Vârsta maximă este măsurată în secunde și poate fi setată la o valoare lungă.
        
```
        <VirtualHost \\*:443>
            # Guarantee HTTPS for 1 Year including Sub Domains 
            Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
    
Vă rugăm să rețineți că acest antet este valabil doar pe un HTTPS VirtualHost.
    
Un motiv pentru a nu forța utilizatorii să utilizezehttpsURL-uri este: link-ul SSL/TLS de bază necesită timp pentru a stabili și apoi ia timp pentru a cripta și decripta toate informațiile transmise între utilizator și server. Dar unele instituţii cerhttpsDoar.
    
* Utilizatorii care sunt conectaţi TREBUIE să utilizezeERDDAP's **https** URL-uri. Dacă utilizeazăhttpURL-uri, acestea aparERDDAP™să nu fie autentificat. Acest lucru asigură confidențialitatea comunicațiilor și ajută la prevenirea[deturnare sesiune și devastarea](https://en.wikipedia.org/wiki/Session_hijacking).
* Oricine nu este conectat poate accesa şi folosi seturile de date publice. În mod implicit, seturile de date private nu apar în listele de seturi de date dacă un utilizator nu este conectat. Dacă administratorul a setat setup.xml&lt;listPrivateDatasets&gt; la adevărat, acestea vor apărea. Încercări de a solicita date din seturile de date private (dacă utilizatorul cunoaște URL-ul) va fi redirecționat către pagina de autentificare.
* Oricine este conectat va putea vedea și solicita date de la orice set de date publice și orice set de date private la care rolul lor le permite accesul. În mod implicit, seturile de date private la care un utilizator nu are acces nu apar în listele de seturi de date. Dacă administratorul a setat setup.xml&lt;listPrivateDatasets&gt; la adevărat, acestea vor apărea. Încercările de a solicita date din seturile de date private la care utilizatorul nu are acces vor fi redirecționate către pagina de autentificare.
* ăRSSinformații pentru seturi de date complet private sunt disponibile numai utilizatorilor (şiRSScititori) care sunt înregistrate și autorizate să utilizeze setul de date respectiv. Acest lucru faceRSSnu este foarte util pentru seturi de date private.
    
Dacă un set de date este privat, dar [&lt;grafice AccesibileTo&gt;] (/docs/server-admin/sets#grafsaccessible to) este setat public, setul de dateRSSeste accesibilă oricui.
    
* Abonamentele de e-mail pot fi create doar atunci când un utilizator are acces la un set de date. În cazul în care un utilizator subscrie la un set de date privat, abonamentul continuă să funcționeze după ce utilizatorul s-a logat.

##### Configurare securitate{#setup-security} 
Pentru a configura sistemul de securitate/autentificare/autorizare:

* Fă standardulERDDAP™ [configurare inițială](/docs/server-admin/deploy-install).
* În[setup.xml](/docs/server-admin/deploy-install#setupxml),
    * Adaugă/schimbă&lt;Autentificare &gt; valoare de la nimic la personalizat (Nu folosi asta.) , email (Nu folosi asta.) , Google (recomandată) , orcid (recomandată) , or oauth2 (care este Google+orcid, recomandat) . A se vedea comentariile referitoare la aceste opțiuni de mai jos.
    * Adaugă/schimbă&lt;valoarea bazei HttpsUrl&gt;.
    * Inserează/decomentează&loginInfo;în&lt;StartBodyHtml&gt; pentru a afișa jurnalul utilizatorului în/afară informații în partea de sus a fiecărei pagini web.
* Pentru testarea scopurilor pe computerul personal,[urmați aceste instrucțiuni pentru a configura Tomcat pentru a sprijini SSL](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html)  (bazahttpsconexiuni) prin crearea unui magazin de chei cu[certificat autosemnat](https://en.wikipedia.org/wiki/Self-signed_certificate)și prin modificarea *Tomcat* /conf/server.xml pentru a debloca conectorul pentru portul 8443. Pe Windows, va trebui să mutați .keystore de la "c:\\Users\\\ *Tu* \\.keystore" la "c:\\Users\\Default Utilizator\\\.keystore" sau "c:\\.keystore" (Vezi? *Tomcat* /logs/catalina. *Astăzi* .log dacă aplicația nu se încarcă sau utilizatorii nu pot vedea jurnalul în pagină) . Puteți vedea când certificatul .keystore va expira prin examinarea certificatului atunci când vă conectați.
    
Pentru un server accesibil publicului, în loc să utilizaţi un certificat autosemnat, este recomandat să cumpăraţi şi să instalaţi un certificat semnat de o[autoritatea de certificare](https://en.wikipedia.org/wiki/Certificate_authority), pentru că oferă clienților mai multă asigurare că acestea sunt într-adevăr conectarea la dvs.ERDDAP™, nu o versiune om-in-the-middle a dvs.ERDDAP. Mulţi vânzători vând certificate digitale. (Căutaţi web.) Nu sunt scumpe.
    
* Pe calculatoare Linux, dacă Tomcat rulează în Apache, modifica /etc /httpd/conf.d/ssl.conf pentru a permite traficul HTTPS către/de laERDDAP™fără a necesita numărul de port :8443 în URL:
    1. Modificare&lt;VirtualHost&gt; tag (dacă există una) , sau adăugați unul la sfârșitul fișierului astfel încât cel puțin are aceste linii:
```
        <VirtualHost \\_default\\_:443>
            SSLEngine on
            SSLProxyEngine On
            ProxyPass /erddap http://localhost:8443/erddap
            ProxyPassReverse /erddap http://localhost:8443/erddap
        </VirtualHost>
```

    2. Apoi reporniți Apache: /usr/sbin/apachectl - K graţios (dar uneori este într-un alt director) .
* În *Tomcat* /conf/server.xml, decomenteaza portul=8443&lt;Etichetă Conector &gt;:
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
şi să schimbe locaţia certificatului KeystoreFile.
##### Autorizare{#authorization} 
*   [Îndatasets.xml, creați o](#authorization)[&lt;utilizator &gt;] (/docs/server-admin/sets#user) etichetă pentru fiecare utilizator cu nume de utilizator, parolă (dacă autorizaţia=custom) , și roluri informații. Aceasta este partea de autorizare aERDDAPSistemul de securitate.
     
* Îndatasets.xml, adăugați o [&lt;Access to&gt;] (/docs/server-admin/sets#accessibleto) eticheta pe fiecare set de date care nu ar trebui să aibă acces public.&lt;AccessTo&gt; vă permite să specificați care roluri au acces la acel set de date.
     
* Reporneşte Tomcat. Probleme? Verifică jurnalele Tomcat.
     
* Verifică-ţi munca&#33; Orice greşeală ar putea duce la un defect de securitate.
     
* Verificați dacă pagina de autentificare foloseștehttps  (nuhttp) . Încercări de conectare prin intermediulhttptrebuie redirecţionat automat cătrehttpsși portul 8443 (cu toate că numărul portului poate fi ascuns printr-un proxy Apache) . Este posibil să fie necesar să lucrați cu administratorul de rețea pentru a permite cererilor externe de acces la portul 8443 de pe serverul dumneavoastră.
     
* Puteți schimba&lt;utilizator &gt; și&lt;accesibileTo&gt; tag-uri în orice moment. Modificările vor fi aplicate la următoarea reîncărcare regulată a oricărui set de date sau ASAP dacă utilizați o[pavilion](#flag).

##### Autentificare{#authentication} 
[ **Autentificare (logare) ** ](#authentication)  
Dacă nu doriți să permiteți utilizatorilor să se logheze, nu specificați o valoare pentru&lt;autentificare &gt; în setup.xml.
Dacă doriți să permiteți utilizatorilor să se logheze, trebuie să specificați o valoare pentru&lt;autentificare &gt;. În prezent,ERDDAP™Suporturi
[personalizat](#custom)  (Nu folosi asta.) ,
[email](#email)  (Nu folosi asta.) ,
[Google](#google)  (recomandată) ,
[orcid](#orcid)  (recomandată) , și
[oaut2](#oauth2)  (recomandată) pentru metoda de autentificare.
Dacă doriți să activați logarea, vă recomandăm cu fermitate opțiunile Google, orcid sau oauth2, deoarece vă eliberează de stocarea și manipularea parolelor utilizatorului (necesare pentru personalizare) și sunt mai sigure decât opțiunea de e-mail. Amintiți-vă că utilizatorii folosesc adesea aceeași parolă la diferite site-uri. Deci, acestea pot fi folosind aceeași parolă pentru dumneavoastrăERDDAP™cum fac la banca lor. Asta face parola lor foarte valoroasă -- mult mai valoroasă pentru utilizator decât doar datele pe care le solicită. Deci trebuie să faci cât mai mult pentru a păstra parolele private. E o mare responsabilitate. Opţiunile de e-mail, Google, Orcid şi Oauth2 au grijă de parole, astfel încât să nu trebuiască să adune, magazin, sau să lucreze cu ei. Deci eşti eliberat de această responsabilitate.

Toate&lt;autentificare&gt; opțiuni utilizate a[cookie](https://en.wikipedia.org/wiki/HTTP_cookie)pe computerul utilizatorului, astfel încât browser-ul utilizatorului trebuie setat pentru a permite cookie-uri. Dacă un utilizator este de a faceERDDAP™cereri dintr-un program de calculator (nu un browser) , cookie-urile și autentificarea sunt greu de lucrat cu . Aceasta este o problemă comună cu toate sistemele de autentificare. Scuze.

Detaliile&lt;autentificare &gt; opțiunile sunt:

###### Personalizat{#custom} 
obiceiul esteERDDAPSistemul personalizat pentru a permite utilizatorilor să se autentifice introducând numele de utilizator și parola într-un formular pe o pagină web. Dacă un utilizator încearcă și nu reușește să se logheze în 3 ori în 10 minute, utilizatorul este blocat de la încercarea de a se conecta timp de 10 minute. Acest lucru împiedică hackerii pur și simplu încearcă milioane de parole până când găsesc cel potrivit.

Acest lucru este oarecum sigur deoarece numele de utilizator și parola sunt transmise prin intermediulhttps  (nuhttp) , but autentification=google, orcid, orcid, or oauth2 are better because they free you from having to make passwords. Abordarea personalizată necesită colectarea numelui unui utilizator și digerarea hash a Parola lor (Foloseşte telefonul&#33; E-mailul nu e sigur&#33;) și le păstrați îndatasets.xmlîn [&lt;utilizator &gt;] (/docs/server-admin/sets#user) Etichete.

Cu opțiunea personalizată, nimeni nu se poate conecta până când (nuERDDAP™administrator) a crea o&lt;tag-ul pentru utilizator, precizând numele utilizatorului ca nume de utilizator, hash digera parola lor ca parola, și rolurile lor.

Nu este recomandat
Din cauza stânjenirii de a genera și transmite hash digera parola utilizatorului și din cauza riscurilor asociate cuERDDAP™deține hash digerațiile parolelor, această opțiune nu este recomandată.

Pentru a spori securitatea acestei opțiuni:

* TREBUIE să vă asigurați că alți utilizatori de pe server (și anume, utilizatorii Linux, nuERDDAP™utilizatori) nu pot citi fișiere în dosarul Tomcat (în specialdatasets.xmlDosar&#33;) sauERDDAPE mare ParentDirectory.
Pe Linux, ca utilizator=tomcat, utilizați:
chmod -R g-rwx *Big ParentDirectory*   
chmod -R o-rwx *Big ParentDirectory*   
chmod -R g-rwx *tomcatDirectory*   
chmod -R o-rwx *tomcatDirectory*   
     
* Utilizaţi UEPSHA256 pentru&lt;parolaEncoding&gt; in setup.xml.
     
* Utilizați o metodă atât de sigură ca posibilă pentru a trece hash digera parola utilizatorului de la utilizator laERDDAP™administrator (Telefon?) .
         
###### email{#email} 
Opțiunea de autentificare e-mail utilizează contul de e-mail al utilizatorului pentru autentificarea utilizatorului (prin trimiterea unui e-mail cu un link special pe care trebuie sa il acceseze pentru a se loga) . Spre deosebire de alte e-mailuri careERDDAP™trimite,ERDDAP™nu scrie aceste e-mailuri de invitație la fișierul jurnal de e-mail, deoarece acestea conțin informații confidențiale.
Teoretic, acest lucru nu este foarte sigur, deoarece e-mailurile nu sunt întotdeauna criptate, astfel încât un tip rău cu capacitatea de a intercepta e-mailuri ar putea abuza de acest sistem folosind adresa de e-mail a unui utilizator valid și interceptarea e-mail invitație.
În practică, dacă ați înființatERDDAP™pentru a utiliza un cont de e-mail Google pentru a trimite e-mailuri, și dacă l-ați configurat pentru a utiliza una dintre opțiunile TLS pentru conexiune, și dacă utilizatorul are un cont de e-mail Google, acest lucru este oarecum sigur, deoarece e-mailurile sunt criptate tot drumul de laERDDAP™la utilizator.

Pentru a spori securitatea acestei opțiuni:

* Asigurați-vă că alți utilizatori de pe server (și anume, utilizatorii Linux, nuERDDAP™utilizatori) nu pot citi fișiere în directorul Tomcat sauERDDAPE mare ParentDirectory.
Pe Linux, ca utilizator=tomcat, utilizați:
chmod -R g-rwx *Big ParentDirectory*   
chmod -R o-rwx *Big ParentDirectory*   
chmod -R g-rwx *tomcatDirectory*   
chmod -R o-rwx *tomcatDirectory*   
     
* Setați lucrurile pentru a obține de securitate de la un capăt la altul pentru e-mailurile trimise de laERDDAP™pentru utilizatori. De exemplu, ai putea face un sistem Google-centric prin crearea doar&lt;tag-uri pentru Google-managed adrese de e-mail și prin configurarea dvs.ERDDAP™utilizarea unui server de e-mail Google prin intermediul unei conexiuni securizate/TLS: în setup.xml, utilizați, de exemplu,
```
    <emailSmtpHost>smtp.gmail.com</emailSmtpHost>  
    <emailSmtpPort>587</emailSmtpPort>  
    <emailProperties>mail.smtp.starttls.enable|true</emailProperties>
```

Nu este recomandat
Opțiunea de autentificare e-mail nu este recomandată. Vă rugăm să utilizați opțiunea Google, orcid, sau oauth2.

Ca și cu Google, orcid, și oauth2, e-mail este foarte convenabil pentruERDDAP™Administratori -- nu trebuie să te ocupi niciodată de parole sau de digeraţiile lor. Tot ce ai nevoie pentru a crea este un [&lt;utilizator &gt;] (/docs/server-admin/sets#user) etichetă pentru un utilizator îndatasets.xmleste adresa de e-mail a utilizatorului, careERDDAP™folosește ca numele utilizatorului. (Atributul parolei nu este folosit atunci când autentificarea=email, Google, orcid sau oauth2.) 

Cu opțiunea de e-mail, numai utilizatorii care au un&lt;tag-ul utilizator &gt; indatasets.xmlpoate încerca să se logheze laERDDAP™prin furnizarea adresei lor de e-mail și făcând clic pe link-ul din e-mail căERDDAP™Le trimite.

ERDDAP™tratează adresele de e-mail ca fiind insensibile. Face acest lucru prin conversia adreselor de e-mail pe care le introduceți (în&lt;tag-uri utilizator &gt; sau utilizatori introduce (pe formularul de autentificare) la toate versiunea lor de jos.

Pentru a configura autentificare=email:

1. În setup.xml, schimba&lt;Valoarea tag-ului.
Pentru a experimenta / lucra pe computerul personal, utilizați
     https://localhost:8443   
Pentru publicERDDAP™, utilizare
     https://*your.domain.org*:8443   
sau fără :8443 dacă utilizaţi un apaş[proxypass](/docs/server-admin/deploy-install#proxypass)astfel încât numărul portului să nu fie necesar.
     
2. În setup.xml, schimba&lt;autentificare &gt; valoarea tag-ului la email:
```
    <authentication>email</authentication>  
```

3. În setup.xml, asigurați-vă că sistemul de e-mail este înființat prin toate&lt;e-mail ... &gt; tag-uri, astfel încâtERDDAP™poate trimite e-mailuri. Dacă este posibil, setați acest lucru pentru a utiliza o conexiune securizată (SSL / TLS) serverului de e-mail.
     
4. Îndatasets.xml, crea [&lt;utilizator &gt;] (/docs/server-admin/sets#user) etichete pentru fiecare utilizator care va avea acces la seturi de date private.
Utilizați adresa de e-mail a utilizatorului ca nume de utilizator în etichetă.
Nu specifica atributul parolei din eticheta de utilizator.
     
5. RepornireERDDAP™astfel încât modificările la setup.xml șidatasets.xmlsă-şi facă efectul.
         
###### Google, orcid, oauth2{#google-orcid-oauth2} 
*   [ **Google** ](#google),[ **orcid** ](#orcid), și[ **oaut2** ](#oauth2)   (recomandată)   
Toate cele trei opțiuni sunt recomandateERDDAP™opțiuni de autentificare. Sunt cele mai sigure opţiuni. Celelalte opțiuni au o securitate semnificativ mai slabă.
     
###### Google{#google} 
* Opțiunea de autentificare Google folosește[Semnează În cu Google](https://developers.google.com/identity/gsi/web/guides/overview), care este o punere în aplicare a[Protocol de autentificare OAuth 2.0](https://oauth.net/2/).ERDDAP™utilizatorii se conectează la contul lor de e-mail Google, inclusiv la conturile Google, cum ar fi@noaa.govconturi. Acest lucru permiteERDDAP™să verifice identitatea utilizatorului (numele și adresa de e-mail) și accesa imaginea lor de profil, dar nu dăERDDAP™acces la e-mailurile lor, Google Drive lor, sau orice alte informații private.
    
PentruERDDAP™v2.22 și mai jos,ERDDAP™folosit "Google Sign-In." Google spune că sistemul este depreciat după 31 martie 2023. Dacă nu ați făcut deja acest lucru, vă rugăm să comutați laERDDAP™v2.23+ pentru a utiliza noul sistem de autentificare bazat pe Google.
    
PentruERDDAP™v2.23 cazuri cu un conținut-Securitate-Politic configurat și folosind Google Autentificare, trebuie să adăugați https://accounts.google.com la lista de script-src permise (sau script-src-elem) .ERDDAP™nu se mai utilizează https://apis.google.com Dacă ai voie să-l scoţi acum.
    
PentruERDDAP™v2.24+ este posibil să fie necesar să adăugaţi https://accounts.google.com/gsi/style pentru a stlye-src și https://accounts.google.com/gsi/ pentru a conecta-src. Pentru script-src puteți utiliza acum https://accounts.google.com/gsi/client.
 
    
Pentru mai multe informații puteți merge la[Pagina Google](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)despre configurarea CSP. Dacă aveţi întrebări, contactaţi-l pe Chris.john de la Noa.gov.
         
###### Orcid{#orcid} 
* Opțiunea de autentificare orcid folosește[Autentificare orcidă](https://members.orcid.org/api/integrate/orcid-sign-in), care este o punere în aplicare a[Protocol de autentificare OAuth 2.0](https://oauth.net/2/).ERDDAP™utilizatorii semnează în[Cont orcid](https://members.orcid.org/api/integrate/orcid-sign-in), care este frecvent folosit de cercetători pentru a se identifica. Acest lucru permiteERDDAP™pentru a verifica identitatea orcida a utilizatorului si pentru a obtine numarul de cont Orcid, dar nu daERDDAP™accesul la alte informații privind contul Orcid.

###### Oauth2{#oauth2} 
* Opţiunea Oauth2 permite utilizatorilor să se înregistreze cu contul Google sau cu contul Orcid.

Opțiunile Google, orcid și oauth2 sunt succesorii opțiunii deschise, care a fost întreruptă dupăERDDAP™versiunea 1.68 și care a fost bazată pe o versiune deschisă ID-ul care este acum expirat. Vă rugăm să treceți la opțiunea Google, orcid, sau oauth2.

Aceste opțiuni sunt foarte convenabile pentruERDDAP™Administratori -- nu trebuie să te ocupi niciodată de parole sau de digeraţiile lor. Tot ce ai nevoie pentru a crea este un [&lt;utilizator &gt;] (/docs/server-admin/sets#user) etichetă pentru un utilizator îndatasets.xmlcare specifică adresa de e-mail Google a utilizatorului sau numărul de cont Orcid ca atributul numelui de utilizator. (Atributul parolei nu este folosit la autentificare=email, Google, orcid sau oauth2.) 

Cu aceste opțiuni, oricine poate conecta laERDDAP™prin semnarea în contul de e-mail Google sau în contul Orcid, dar nimeni nu va avea dreptul de a accesa seturile de date private până când (nuERDDAP™administrator) a crea o&lt;tag-ul de utilizator &gt;, specificând adresa de e-mail Google sau numărul de cont Orcid ca nume de utilizator, și specificând rolurile lor.

ERDDAP™tratează adresele de e-mail ca fiind insensibile. Face acest lucru prin conversia adreselor de e-mail pe care le introduceți (în&lt;tag-uri utilizator &gt; sau utilizatori introduce (pe formularul de autentificare) la toate versiunea lor de jos.

Pentru a configura Google, orcid, sau oauth2 autentificare:

* În setup.xml, schimba&lt;Valoarea tag-ului.
Pentru a experimenta / lucra pe computerul personal, utilizați
     https://localhost:8443   
Pentru publicERDDAP™, utilizare
     https://*your.domain.org*:8443   
sau, mai bine, fără :8443 dacă utilizați un apaș[proxypass](/docs/server-admin/deploy-install#proxypass)astfel încât numărul portului să nu fie necesar.
     
* În setup.xml, schimba&lt;autentificare &gt; valoarea etichetei pentru Google, Orcid sau Oauth2, de exemplu:
```
    <authentication>oauth2</authentication>  
```
###### Configurare Google{#google-setup} 
* Pentru opțiunile Google și Oauth2:
Urmaţi instrucţiunile de mai jos pentru a configura autentificarea Google pentru dumneavoastrăERDDAP.
     
    1. Dacă nu aveți un cont de e-mail Google,[creați unul](https://www.google.com/intl/en_us/mail/help/about.html)  
         
    2. Urmează[aceste instrucţiuni](https://developers.google.com/identity/sign-in/web/devconsole-project)pentru a crea un proiect Google Developers Console și de a obține un ID client.
        
Când formularul Google solicită autorizareaJavaOrigini script, introduceți valoarea de la&lt;BazaHttpsUrl&gt; de la computerul personalERDDAP™setup.xml, de exemplu,
         https://localhost:8443   
Pe o a doua linie, adăugați&lt;BazaHttpsUrl&gt; din partea publiculuiERDDAP™setup.xml, de exemplu,
         https://*your.domain.org*:8443
 
        
Nu specificaţi niciun URI autorizat.
        
Când vedeți ID-ul clientului pentru acest proiect, copiați și lipiți-l în setup.xml (de obicei, chiar mai jos&lt;autentificarea &gt; să fie ordonată, dar plasarea nu contează de fapt), în&lt;eticheta GoogleClientid&gt;, de exemplu,
        &lt;GoogleClientID&gt; *Clientul dumneavoastră* &lt;/googleClientID&gt;
ID-ul clientului va fi un șir de aproximativ 75 de caractere, probabil începând cu mai multe cifre și terminând cu .apps.googleusercontent.com .
         
        
    3. Îndatasets.xml, creați o [&lt;utilizator &gt;] (/docs/server-admin/sets#user) eticheta pentru fiecare utilizator care va avea acces la seturi de date private. Pentru atributul numelui de utilizator din etichetă:
        
        * Pentru utilizatorii care se vor conecta cu Google, utilizați adresa de e-mail Google a utilizatorului.
        * Pentru utilizatorii care se vor conecta cu orcid, utilizați numărul de cont Orcid al utilizatorului (cu dantelă) .
        
Nu specifica atributul parolei pentru eticheta de utilizator.
         
    4. RepornireERDDAP™astfel încât modificările la setup.xml șidatasets.xmlsă-şi facă efectul.
         
###### Configurare orcidă{#orcid-setup} 
* Pentru opțiunile orcide și oauth2:
Urmaţi instrucţiunile de mai jos pentru a configura autentificarea Orcid pentruERDDAP.
     (Pentru detalii, a se vedea[Documentația API de autentificare a lui Orcid](https://members.orcid.org/api/integrate/orcid-sign-in).)   
     
    1. Dacă nu aveți un cont Orcid,[creați unul](https://orcid.org/signin)  
         
    2. Autentifică-te în Orcid[ https://orcid.org/signin ](https://orcid.org/signin)folosind contul tău personal Orcid.
         
    3. Faceți clic pe "Instrumente de dezvoltare" (la "Pentru cercetători" în partea de sus) .
         
    4. Click pe "Registrul pentru API public gratuit ORCID." Introduceți această informație:
Nume:ERDDAP™la\\[organizația dumneavoastră\\]  
Site web:\\[dumneavoastrăERDDAPDomeniul lui\\]  
Descriere:ERDDAP™este un server de date științifice. Utilizatorii trebuie să se autentifice cu Google sau Orcid pentru a accesa seturile de date non-publice.
Redirecţionaţi URI:\\[dumneavoastrăERDDAPDomeniul lui\\]/erddap/loginOrcid.html
         
    5. Faceți clic pe pictograma Salvare (Arată ca un disc de 3.5&#33;) .
Puteți vedea apoi ID-ul dvs. ORCID APP Client și ORCID Client Secret.
         
    6. Copiază și lipește ID-ul clientului ORCID APP (care va începe cu "APP-") în setup.xml în&lt;orcidClientid&gt; tag, de exemplu,
```
        <orcidClientID>APP-*ALPHANUMERICCHARACTERS*</orcidClientID>
```
    7. Copiază şi lipeşte Clientul Secret ORCID (caractere alfa-numerice cu litere mici) în setup.xml în&lt;orcidClientSecret&gt; tag, de exemplu,
```
        <orcidClientSecret>*alpha-numeric-characters-with-dashes*</orcidClientSecret>
```

    8. Îndatasets.xml, creați o [&lt;utilizator &gt;] (/docs/server-admin/sets#user) eticheta pentru fiecare utilizator care va avea acces la seturi de date private. Pentru atributul numelui de utilizator din etichetă:
        
        * Pentru utilizatorii care se vor conecta cu Google, utilizați adresa de e-mail Google a utilizatorului.
        * Pentru utilizatorii care se vor conecta cu orcid, utilizați numărul de cont Orcid al utilizatorului (cu dantelă) .
        
Nu specifica atributul parolei pentru eticheta de utilizator.
         
    9. RepornireERDDAP™astfel încât modificările la setup.xml șidatasets.xmlsă-şi facă efectul.
             

###### Autentifică-te oricum{#log-in-either-way} 
Dacă utilizați opțiunile de autentificare Google, orcid sau oauth2, și Google Sign-In sau API de autentificare Orcid încetează brusc să funcționeze (Pentru orice motiv) sau încetează să mai lucreze caERDDAP™asteapta, utilizatorii nu vor putea sa se logheze la dvs.ERDDAP. Ca un temporar (sau permanent) solutie, puteti cere utilizatorilor sa se inscrie cu celalalt sistem (obține un cont de e-mail Google, sau obține un cont Orcid) . Pentru a face asta:

1. Schimbă&lt;tag-ul de autentificare&gt; astfel încât să permită celălalt sistem de autentificare. Opțiunea oauth2 permite utilizatorilor să se logheze cu oricare dintre sisteme.
2. Duplică fiecare&lt;tag-uri de utilizator &gt; și modificați atributul numelui de utilizator de la adresa de e-mail Google la numărul de cont Orcid corespunzător (sau viceversa) , dar să păstreze rolurile atribute același.

###### Deschis{#openid} 
ERDDAP™nu mai susține opțiunea de autentificare deschisă, care s-a bazat pe o versiune deschisă ID-ul care este acum expirat. Vă rugăm să utilizați Google, orcid, sau oauth2 opțiuni în schimb.

###### BAZA{#basic} 
ERDDAP™nu susține autentificarea BASIC deoarece:
* BASIC pare orientat spre pagini web predefinite care au nevoie de acces securizat sau patura de acces on/off la întregul site, darERDDAP™permite (acces restricționat) seturi de date care trebuie adăugate la zbor.
* Autentificare de bază nu oferă utilizatorilor o modalitate de a deconecta&#33;
* Se ştie că autentificarea de bază nu este sigură.

##### Surse de date sigure{#secure-data-sources} 
Dacă un set de date trebuie să aibă acces limitat laERDDAP™utilizatori, sursa de date (de undeERDDAP™Obţine datele) nu ar trebui să fie accesibile publicului. Deci, cum se poateERDDAP™obține datele pentru seturi de date de acces restricționate? Unele opțiuni sunt:

*   ERDDAP™poate servi date din fișierele locale (de exemplu, prin intermediul tabelului EDD De la Dosare sauEDDGridDin dosare) .
     
*   ERDDAP™poate fi într-o[DMZ](https://en.wikipedia.org/wiki/Demilitarized_zone_(computing)) și sursa de date (de exemplu, oOPeNDAPserver sau o bază de date) poate fi în spatele unui[firewall](https://en.wikipedia.org/wiki/Firewall), unde este accesibilERDDAP™Dar nu publicului.
     
* Sursa de date poate fi pe un site web public, dar necesită o autentificare pentru a obține datele. Cele două tipuri de seturi de date careERDDAP™se pot conecta la acces[Tabel EDD din baza de date](/docs/server-admin/datasets#eddtablefromdatabase)şi[Tabel EDD din Cassandra](/docs/server-admin/datasets#eddtablefromcassandra). Suportul acestor seturi de date (şi trebuie utilizat întotdeauna) nume de utilizator (creează oERDDAP™utilizator care are numai privilegii de citire) , parole, conexiuni SSL, și alte măsuri de securitate.
    
Dar, în general, în prezent,ERDDAP™nu se poate ocupa de aceste surse de date pentru că nu are dispoziții pentru logarea la sursa de date. Acesta este motivul pentru care accesul la[EDDGridDe la Erddap și tabelul EDD FromErddap](/docs/server-admin/datasets#eddfromerddap)Seturile de date nu pot fi restricţionate. În prezent, localERDDAP™nu are nici o modalitate de a conecta și accesa informațiile metadate de la distanțăERDDAP. Și pune "remote"ERDDAP™În spatele firewall-ului și eliminarea că setul de date este accesibil Restrictiile nu rezolva problema: deoarece utilizatorii solicita EDDXxx Datele FromErddap trebuie redirecționate către distanțăERDDAP™, telecomandaERDDAP™trebuie să fie accesibil.
    
#### Apărare împotriva hackerilor{#defenses-against-hackers} 
Există hackeri rău tip care încearcă să exploateze punctele slabe de securitate în software-ul server caERDDAP.ERDDAP™urmează sfatul comun de securitate pentru a avea mai multe straturi de apărare:

* Privilegii limitate - Una dintre cele mai importante apărare este de a rula Tomcat printr-un utilizator numit Tomcat care nu are o parolă (astfel încât nimeni nu se poate conecta ca acel utilizator) și are privilegii limitate ale sistemului de fișiere (De exemplu, accesul exclusiv la date) . Vezi?ERDDAPInstrucţiunile pentru[configurarea Tomcat](/docs/server-admin/deploy-install#tomcat).
* Utilizare grea - În general,ERDDAP™este construit pentru utilizare grea, inclusiv prin scenarii care fac zeci de mii de cereri, unul după altul. Este greu pentruERDDAP™să se deschidă simultan la o utilizare legitimă grea şi să se apere de abuzuri. Uneori este greu să se diferențieze utilizarea legitimă grea, utilizarea legitimă excesivă și utilizarea nelegitimă (şi uneori e foarte uşor.) . Printre altele de apărare,ERDDAP™conştient nu permite unei singure cereri să utilizeze o fracţiune exagerată din resursele sistemului (cu excepția cazului în care sistemul nu este activ) .
* Identifică utilizatorii problematici - DacăERDDAP™încetineşte sau îngheaţă (Poate pentru că un utilizator naiv sau un robot rulează mai multe scripturi pentru a depune mai multe cereri simultan sau poate din cauza unui tip rău[Negarea serviciului](https://en.wikipedia.org/wiki/Denial-of-service_attack)atac) Poţi să te uiţi la[E-mail Raport zilnic](#daily-report)  (și mai frecvente informații identice în[ERDDAP™fișier jurnal](#log)) care afișează numărul de cereri făcute de cei mai activi utilizatori (a se vedea adresa IP a solicitantului (Permis) ") .ERDDAP™trimite de asemenea e-mailuri administratorului ori de câte ori există["Activitate neobișnuită: &gt;25% din cereri au eșuat"](#failed-requests). Apoi te poţi uita înERDDAP™jurnal pentru a vedea natura cererilor lor. Dacă simţi că cineva face prea multe cereri, cereri bizare (N-o să-ţi vină să crezi ce-am văzut, poate ai crede.) , sau cereri de tip atac, puteți adăuga adresa IP la lista neagră.
* Lista neagră... Puteți adăuga adresa IP a utilizatorilor supărătoare, boți, și[Negarea serviciului](https://en.wikipedia.org/wiki/Denial-of-service_attack)atacatori laERDDAP [Lista neagră](/docs/server-admin/datasets#requestblacklist), astfel încât cererile viitoare de la ei vor fi imediat respinse. Acest cadru este îndatasets.xmlastfel încât să puteți adăuga rapid o adresă IP la listă și apoi[pavilion](#flag)un set de date astfel încâtERDDAP™notifică imediat și aplică modificarea. Mesajul de eroare trimis utilizatorilor listați pe lista neagră îi încurajează să contactezeERDDAP™Administrator dacă ei cred că au fost puse greşit pe lista neagră. (În experiența noastră, mai mulți utilizatori nu au fost conștienți de faptul că au fost difuzate mai multe scripturi simultan, sau că scripturile lor au fost a face cereri de prostii.) 
* Securitatea datelor - Unele tipuri de seturi de date (în special, tabelul EDD din baza de date) prezintă riscuri suplimentare de securitate (De exemplu, injecţie cu SQL) şi au propriile lor măsuri de securitate. A se vedea informațiile pentru aceste tipuri de seturi de date din[Lucrul cudatasets.xmlFișier](/docs/server-admin/datasets), în special[Tabel EDD Din securitatea bazei de date](/docs/server-admin/datasets#database-security).
* Audit de securitate... Deşi...NOAASecuritatea IT a refuzat cererile noastre de scanări ani de zile, acum îmi scanează de rutină (Bob's)  ERDDAP™instalare. Deşi scanările iniţiale au găsit unele probleme pe care le-am rezolvat apoi, scanările ulterioare nu au găsit probleme cuERDDAP. Scanările îşi fac griji pentru multe lucruri: în special, deoarecetabledapcererile arata ca cereri SQL, ei griji cu privire la vulnerabilitățile de injectare SQL. Dar aceste preocupări sunt nefondate deoareceERDDAP™întotdeauna parsează și validează întrebările și apoi construiește separat interogarea SQL într-un mod care evită vulnerabilitățile de injectare. Celălalt lucru de care se plâng uneori este căJavaversiunea sau versiunile Tomcat nu sunt la fel de actualizate ca acestea doresc, așa că le actualizați ca răspuns. M-am oferit anterior să arăt oamenilor rapoartele de securitate, dar acum mi s-a spus că nu pot face asta.

#### Întrebări? Sugestii?{#questions-suggestions} 
Dacă aveți întrebări despreERDDAPsistemul de securitate sau au orice întrebări, îndoieli, preocupări sau sugestii cu privire la modul în care este înființat, a se vedea noastre[secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support).
    

## Lucruri pe care nu trebuie să le ştii{#things-you-dont-need-to-know} 

Astea sunt detalii pe care nu trebuie să le ştii până nu apare o nevoie.

### Al doileaERDDAP™ {#second-erddap} 
*    **Configurarea unei secundeERDDAP™pentru testare/dezvoltare**   
Dacă doriți să faceți acest lucru, există două abordări:
    *    (Cel mai bun) Instalați Tomcat șiERDDAP™pe un calculator altul decât computerul care are publiculERDDAP. Dacă utilizați computerul personal:
        1. Fă instalarea pas cu pas. Pune-l pe Tomcat primul.
Când Tomcat rulează, managerul Tomcat ar trebui să fie la
            [ http://127.0.0.1:8080/manager/html/ ](http://127.0.0.1:8080/manager/html/)  (sau poate[ http://localhost:8080/manager/html/ ](http://localhost:8080/manager/html/)) 
        2. InstaleazăERDDAP.
        3. Nu folosi ProxyPass pentru a elimina numărul portului dinERDDAP™URL.
        4. În[setup.xml](/docs/server-admin/deploy-install#setupxml), set baseUrl to http://127.0.0.1:8080
 
        5. După ce începi astaERDDAP™, ar trebui să fie capabil să-l vadă la
            [ http://127.0.0.1:8080/erddap/status.html ](http://127.0.0.1:8080/erddap/status.html)  (sau poate[ http://localhost:8080/erddap/status.html ](http://localhost:8080/erddap/status.html)) 
#### Al doilea Tomcat{#second-tomcat} 
*    (Al doilea cel mai bun) Instalați un alt Tomcat pe același computer ca publicul dumneavoastrăERDDAP.
    1. Fă instalarea pas cu pas. Pune-l pe Tomcat primul.
Schimbă toate numerele portului asociate cu al doilea Tomcat (De exemplu, schimbarea 8080 la 8081)   (vezi[Tomcat multiplu Secţiunea instanţe](https://tomcat.apache.org/tomcat-8.0-doc/RUNNING.txt)la jumătatea drumului prin acel document) .
    2. InstaleazăERDDAP™în noul Tomcat.
    3. Nu folosi ProxyPass pentru a elimina numărul portului dinERDDAP™URL.
    4. În[setup.xml](/docs/server-admin/deploy-install#setupxml), set baseUrl to http://www.*yourDomainName*:8081
 
    5. După ce începi astaERDDAP™, ar trebui să fie capabil să-l vadă la
         http://www.*yourDomainName*:8081/erddap/status.html   
             
### Motoare de stat solide{#solid-state-drives} 
*    **Motoare de stat solide (SSD) Sunt grozave&#33;**   
Cel mai rapid, mai simplu şi mai ieftin mod de a acceleraERDDAPaccesul la datele tabulare este de a pune fișierele de date pe o unitate Solid State (SSD) . Cele mai multe seturi de date tabulare sunt relativ mici, astfel încât o 1 sau 2 TB SSD este, probabil, suficient pentru a deține toate fișierele de date pentru toate seturile de date tabulare. SSD se epuizează în cele din urmă dacă scrii date într-o celulă, le ştergi şi scrii date noi în acea celulă de prea multe ori. Deci, dacă utilizați doar SSD-ul pentru a scrie datele o dată și citiți-l de multe ori, chiar și un SSD de consum ar trebui să dureze foarte mult timp, probabil mult mai mult decât orice Hard Disk Drive (HDD) . SSD-urile de consum sunt acum ieftine (în 2018, ~200$ pentru 1 TB sau ~400$ pentru 2 TB) şi preţurile încă scad rapid. CândERDDAP™accesează un fișier de date, un SSD oferă atât latență mai scurtă (~0.1ms, versus ~3ms pentru un HDD, versus ~10 (?) Ms pentru un RAID, versus ~55ms pentru Amazon S3) şi mai mare (~500 MB/S, versus ~75 MB/s pentru un HDD, versus ~500 MB/s pentru un RAID) . Astfel încât să puteți obține un impuls de performanță mare (până la 10X versus un HDD) pentru 200 $&#33; Comparativ cu cele mai multe alte modificări posibile ale sistemului dumneavoastră (Un nou server pentru 10.000 de dolari? un nou RAID pentru 35.000 dolari? un nou comutator de rețea pentru 5000 $? etc.) , acest lucru este de departe cel mai bun Return On Investment (ROI) . Dacă/atunci când SSD moare (în 1, 2, ... 8 ani) , înlocuiți-l. Nu te baza pe asta ca pe o stocare pe termen lung, arhivare a datelor, doar pentru copia din faţă a datelor.\\[SSD-urile ar fi grozave şi pentru datele în reţea, dar majoritatea seturilor de date sunt mult mai mari, ceea ce face SSD foarte scump.\\]
    
Dacă serverul dvs. nu este încărcat cu memorie, memoria suplimentară pentru serverul dvs. este, de asemenea, un mod mare și relativ ieftin de a accelera toate aspecteleERDDAP.
     
    
### [Încărcături grele / Constrângeri](#heavy-loads--constraints) **  {#heavy-loads--constraints} 
Cu o utilizare grea, un standaloneERDDAP™pot fi constrânse de diverse probleme. Pentru mai multe informaţii, a se vedea[lista constrângerilor și soluțiilor](/docs/server-admin/scaling#heavy-loads--constraints).
     
### Grile, clustere şi Federaţii{#grids-clusters-and-federations} 
Sub o utilizare foarte grea, un singur independentERDDAP™se vor confrunta cu una sau mai multe constrângeri și chiar soluțiile propuse vor fi insuficiente. Pentru astfel de situații,ERDDAP™are caracteristici care fac ușor pentru a construi grile scalabile (De asemenea, numite clustere sau federații) dinERDDAPs care permit sistemului să se ocupe de o utilizare foarte grea (de exemplu, pentru un centru mare de date) . Pentru mai multe informații, a se vedea[grile, clustere și federații aleERDDAPs](/docs/server-admin/scaling).
     
### Calculare nori{#cloud-computing} 
Mai multe companii încep să ofere[servicii de cloud computing](https://en.wikipedia.org/wiki/Cloud_computing)  (de exemplu,[Amazon Web Services](https://aws.amazon.com/)) .[Societăţi de găzduire web](https://en.wikipedia.org/wiki/Web_hosting_service)au oferit servicii mai simple de la mijlocul anilor '90, dar serviciile "cloud" au extins considerabil flexibilitatea sistemelor și gama de servicii oferite. Puteți utiliza aceste servicii pentru a configura un singurERDDAP™sau o grilă/cluster deERDDAPs să se ocupe de o utilizare foarte grea. Pentru mai multe informații, a se vedea[cloud computing cuERDDAP™](/docs/server-admin/scaling#cloud-computing).

### Amazon{#amazon} 
*    **[Amazon Web Services (AWS) Prezentare generală a instalației CE2](#amazon)**   
    [Amazon Web Services (AWS) ](https://aws.amazon.com/)este[servicii de cloud computing](https://en.wikipedia.org/wiki/Cloud_computing)care oferă o gamă largă de infrastructuri informatice pe care le puteți închiria cu ora. Puteți instalaERDDAP™pe[Nor de calcul elastic (CE2) ](https://aws.amazon.com/ec2/)exemplu (numele lor pentru un calculator pe care îl puteți închiria cu ora) . AWS are un excelent[Ghid utilizator AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)și puteți utiliza Google pentru a găsi răspunsuri la întrebări specifice pe care le-ați putea avea. Pregăteşte-te -- este o muncă destul de mare pentru început. Dar odată ce ai un server în funcţiune, poţi închiria cu uşurinţă cât mai multe resurse suplimentare (servere, baze de date, spațiu SSD etc.) Cum ai nevoie, la un preţ rezonabil.\\[Aceasta nu este o recomandare sau o aprobare de Amazon Web Services. Mai sunt şi alţi furnizori de nori.\\]
    
O imagine de ansamblu a lucrurilor pe care trebuie să le faci pentru a obțineERDDAP™Rularea pe AWS este:
    
    * În general, vei face toate lucrurile descrise în[Ghid utilizator AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html).
    * Aranjează un cont AWS.
    * Configurați un utilizator AWS în acel cont cu privilegii de administrator. Autentifică-te ca acest utilizator pentru a face toate etapele următoare.
    * Stocare în bloc elastică (EBS) este echivalentul AWS al unui hard disk atașat la server. Unele spații EBS vor fi alocate atunci când creați prima instanță EC2. Este o stocare persistentă -- informaţia nu se pierde când opreşti instanţa CE2. Și dacă schimbați tipurile de instanță, spațiul EBS se atașează automat la noua instanță.
    * Creați o adresă IP elastică astfel încât instanța dumneavoastră EC2 să aibă un URL public stabil (spre deosebire de doar un URL privat care se schimbă de fiecare dată când reporniți instanța) .
    * Crearea și inițierea unei instanțe CE2 (computer) . Există o gamă largă de[tipuri de instanță](https://aws.amazon.com/ec2/instance-types/)Fiecare la un preţ diferit. Un m4.mare sau m4.xmare instanta este puternic și este, probabil, potrivit pentru cele mai multe utilizări, dar alege orice satisface nevoile dumneavoastră. Probabil că va dori să folosească Linux Amazon ca sistemul de operare.
    * Dacă computerul desktop/laptop este un computer Windows, puteți utiliza[PuTTY](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html), un client SSH gratuit pentru Windows, pentru a obține acces la linia de comandă EC2 instanță. Sau, s-ar putea să ai un alt program SSH pe care îl preferi.
    * Când vă conectați în instanța CE2, veți fi autentificat ca utilizator administrativ cu numele de utilizator "ec2-user." Utilizatorul ec2 are privilegii sudo. Deci, atunci când aveți nevoie pentru a face ceva ca utilizator rădăcină, utilizați: sudo *Unele command* 
    * Dacă computerul desktop/laptop este un computer Windows, puteți utiliza[FileZilla](https://stackoverflow.com/questions/16744863/connect-to-amazon-ec2-file-directory-using-filezilla-and-sftp), un program SFTP gratuit, pentru a transfera fișiere la / de la instanța CE2. Sau, s-ar putea avea un alt program SFTP pe care le preferați.
    *   [Instalează apache](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html)în instanţa CE2.
    * Urmează standardul[ERDDAP™instrucțiuni de instalare](/docs/server-admin/deploy-install).
         
### Aşteaptă&#33;{#waitthentryagain-exception} 
Un utilizator poate primi un mesaj de eroare ca
Aşteaptă&#33;
Nu a fost un (temporar?) problemă. Stai puţin, apoi încearcă din nou. (Într-un browser, faceți clic pe butonul Reload.)   
Detalii: GridDataAccesor.increment: Rezulte partiale\\[0\\]="125542730" urma să fie "123532800."

Explicaţia generală a WaitThenTryAgainException este:
CândERDDAP™răspunde unei cereri de utilizare, poate exista o eroare neașteptată cu setul de date (De exemplu, o eroare în citirea datelor din fișier sau o eroare în accesarea unui set de date la distanță) . Aşteaptă.ERDDAP™că cererea a eșuat (Până acum) dar astaERDDAP™ar trebui să încerce să reîncărcați rapid setul de date (Sună[CerereReloadASP](#requestreloadasap)) şi să încercăm din nou cererea. Adesea, acest lucru reușește, iar utilizatorul vede doar că răspunsul la cerere a fost lent. Alteori, reîncărcarea nu reușește sau este prea lent, sau încercarea ulterioară de a face față cererii, de asemenea, nu reușește și aruncă un alt WaitThenTryAgain. Dacă se întâmplă asta,ERDDAP™marchează setul de date pentru reîncărcare, dar spune utilizatorului (printr-un waitThenTryAgain Exception) că a existat un eșec în timp ce răspunde la cerere.

Acesta este comportamentul normal. Acest sistem poate rezolva multe probleme comune.
Dar este posibil ca acest sistem să fie declanşat excesiv. Cea mai comună cauză este căERDDAP's încărcarea setului de date nu vede o problemă, darERDDAPRăspunsul la o cerere de date vede problema. Indiferent care este cauza, soluția este pentru tine de a face cu orice este în neregulă cu setul de date. Uită-te în log.txt pentru a vedea mesajele de eroare reale și de a face cu problemele. Dacă o mulțime de fișiere au antete valide, dar date invalide (un fișier corupt) , înlocuiți fișierele cu fișiere necorupte. În cazul în care conexiunea la un RAID este fulley, repara. În cazul în care conexiunea la un serviciu de la distanță este fulgey, găsi o modalitate de a nu fulkey sau descărca toate fișierele de la sursa de la distanță și de a servi datele din fișierele locale.

Explicația detaliată a acestei erori specifice (mai sus) este:
Pentru fiecareEDDGridSet de date;ERDDAP™păstrează valorile variabile ale axei în memorie. Acestea sunt folosite, de exemplu, pentru a converti valorile axei solicitate care utilizează " () " format în numere index. De exemplu, dacă valorile axei sunt "10, 15, 20, 25," o cerere de (20) va fi interpretată ca o cerere pentru indicele # 2 (Indici pe bază de 0) . CândERDDAP™primește o cerere de date și obține datele de la sursă, verifică faptul că valorile axei pe care le are de la sursă corespund valorilor axei din memorie. În mod normal, ei fac. Dar uneori sursa de date s-a schimbat semnificativ: de exemplu, valorile indicelui de la începutul variabilei axei pot fi eliminate (De exemplu, "10, 15, 20, 25" poate deveni "20, 25, 30") . Dacă se întâmplă asta, e clar căERDDAPinterpretarea cererii (de exemplu, " (20) " is index # 2) Acum greşeşte. Deci...ERDDAP™aruncă o excepție și solicită ReloadASAP.ERDDAP™va actualiza în curând setul de date (adesea în câteva secunde, de obicei într-un minut) . Altele, probleme similare arunca, de asemenea, WaitThenTryAgain excepție.
    
#### CerereReloadASP{#requestreloadasap} 
Puteți vedea "RequestReloadASAP" în fișierul log.txt imediat după un mesaj de eroare și adesea în apropierea unui[Aşteaptă&#33;](#waitthentryagain-exception). Este practic un mod intern, programatic pentruERDDAP™setarea[pavilion](#flag)să semnaleze că setul de date ar trebui reîncărcat cât mai curând posibil.
     
### Fișierele nu sunt șterse{#files-not-being-deleted} 
Pentru câţiva.ERDDAP™instalații, a existat o problemă cu unele fișiere temporare create deERDDAP™Stau deschis (Greşit.) și astfel să nu fie șterse. În câteva cazuri, multe dintre aceste fișiere au acumulat și preluat o cantitate semnificativă de spațiu pe disc.

Să sperăm că aceste probleme sunt rezolvate (înERDDAP™v2.00) . Dacă vedeți această problemă, vă rugăm să trimiteți un e-mail directorului + numelor fișierelor ofensatoare către Chris. John la Noaa.gov. Aveţi câteva opţiuni pentru rezolvarea problemei:

* Dacă fişierele nu sunt mari şi nu te fac să rămâi fără spaţiu pe disc, poţi ignora problema.
* Cea mai simplă soluţie este să oprim Tomcat/ERDDAP™  (după ore, astfel mai puțini utilizatori sunt afectați) . În timpul închiderii, dacă sistemul de operare nu șterge fișierele, ștergeți-le manual. Apoi repornițiERDDAP.
         
### JSON-ld{#json-ld} 
*    **[Semantic Markup of Datasets with json-ld (JSON Date legate) ](#json-ld)**   
    ERDDAP™acum folosește[Json-ld (JSON Date legate) ](https://json-ld.org)pentru a face catalogul de date și seturi de date parte a[web semantic](https://en.wikipedia.org/wiki/Semantic_Web), care este ideea lui Tim Berners-Lee de a face conținutul web mai ușor de citit și mașină "de înțeles." Conținutul json-ld folosește[schema.org](https://schema.org/)termeni și definiții. Motoare de căutare ([Google în special](https://developers.google.com/search/docs/data-types/datasets)) și alte instrumente semantice pot folosi acest marcaj structurat pentru a facilita descoperirea și indexarea. Markup-ul structurat Json apare ca invizibil-la-oameni&lt;script&gt; codul https://.../erddap/info/index.html pagina web (care este un web semantic[DataCatalog](https://schema.org/DataCatalog)) şi pe fiecare https://.../erddap/info/*datasetID*/index.html pagina web (care este un web semantic[Set de date](https://schema.org/Dataset)) . (Mulțumiri speciale pentru Adam Leadbetter și Rob Fuller de la Institutul Marine din Irlanda pentru a face partea grea a muncii pentru a face această parte dinERDDAP.)   
     
### URL- uri externe{#out-of-date-urls} 
Încet, dar sigur, URL-urile pe care furnizorii de date le-au scris în fișiere de date devin depășite (de exemplu,httpdevinehttps, site-urile sunt rearanjate, și organizații precum NODC/NGDC/NCDC sunt reorganizate în NCEI) . Legăturile rupte rezultate sunt o problemă tot mai prezentă cu care se confruntă toate site-urile web. Pentru a face față acestui lucru,ERDDAP™are acum un sistem de actualizare automată a URL-urilor out-of-date. Dacă Generează date Xml vede un URL out-of-date, adaugă URL-ul actualizat la&lt;addAttributes&gt;. De asemenea, atunci când un set de date se încarcă, dacăERDDAP™vede un URL expirat, îl schimbă în tăcere la URL-ul actualizat. Schimbările sunt controlate de o serie de perechi de căutare-for/replace-with definite în&lt;updateUrls&gt; înERDDAP's
\\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file. Puteți face schimbări acolo. Dacă aveți sugestii pentru schimbări, sau dacă credeți că acest lucru ar trebui să fie transformat într-un serviciu (ca Convertorii) Te rog trimite-i un e-mail lui Chris. John la Noaa.gov.
     
### CORS{#cors} 
* CORS ([Schimbul de resurse între autoritățile de reglementare](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing))   
"este un mecanism care permite limitarea resurselor (de exemplu, fonturi sauERDDAP™date) pe o pagină web care urmează să fie solicitată dintr-un alt domeniu din afara domeniului din care a fost servită prima resursă" (Arun Ranganathan) . Practic, CORS este un mesaj care poate fi pus în antetul HTTP de un răspuns, spunând în esență, "este în regulă cu acest site dacă anumite alte site-uri (cele specifice sau toate) ia resurse (De exemplu, date) de pe acest site și să-l facă disponibil pe site-ul lor." Astfel, este o alternativă la[JSONP](https://en.wikipedia.org/wiki/JSONP).
    
DezvoltatoriiERDDAP™nu pretind a fi experți în securitate. Nu suntem pe deplin clari cu privire la problemele de securitate legate de CORS. Nu vrem să facem nicio declaraţie care să susţină o acţiune care să reducă securitatea. Aşa că vom rămâne neutri şi vom lăsa totul în seama fiecăruia.ERDDAP™admin pentru a decide dacă beneficiile sau permițând un antet CORS merită riscurile. Ca întotdeauna, dacă dumneavoastrăERDDAP™are orice seturi de date private, este o idee bună să fie foarte atent cu privire la securitate.
    
Dacă doriți să activați CORS pentru dumneavoastrăERDDAP™, Există[instrucțiuni disponibile imediat](https://enable-cors.org/index.html)descrierea modului în care administratorii site-ului pot activa un antet CORS prin intermediul software-ului serverului de nivel inferior (de exemplu, Apache sau nginx) .
    
### Palete{#palettes} 
* Paletele sunt folosite deERDDAP™să transforme o gamă de valori ale datelor într-o gamă de culori atunci când se fac grafice și hărți.
    
Fiecare paleta este definita intr-un fisier .cpt-stil paleta, astfel cum este utilizat de[GMT](https://www.soest.hawaii.edu/gmt/). ToateERDDAP™Fișierele .cpt sunt valide GMT .cpt fișiere, dar opusul nu este adevărat. A se utiliza înERDDAP™Fişierele .cpt au:
    
    * Comentarii opționale linii la începutul fișierului, începând cu "#."
    * O secțiune principală cu o descriere a segmentelor paletei, un segment pe linie. Fiecare linie de descriere a segmentului are 8 valori:
Start Valoare, startRed, start Verde, start Albastru, EndValue, EndRed, EndGreen, EndBlue.
Pot exista mai multe segmente.ERDDAP™utilizează interpolarea liniară între startRed/Green/Blue și endRed/Green/Blue pentru fiecare segment.
        
Vă recomandăm ca fiecare segment să specifice un început și o culoare de sfârșit care sunt diferite, și ca culoarea de început a fiecărui segment să fie aceeași cu culoarea de sfârșit a segmentului anterior, astfel încât paleta să descrie un amestec continuu de culori.ERDDAP™are un sistem de creare on-the-fly o paleta de culori discrete dintr-o paleta cu un amestec continuu de culori. AnERDDAP™utilizatorul poate specifica dacă doresc ca paleta să fie continuă (originalul) sau Discret (derivat din original) . Dar există motive legitime pentru a nu urma aceste recomandări pentru unele palete.
        
    * StartValue și endValues trebuie să fie numere întregi.
Primul segment trebuie să aibă StartValue = 0 și endValue=1.
Al doilea segment trebuie să aibă startValue=1 și endValue=2.
Etc.
    * Valorile roșii, verzi și albastre trebuie să fie numere întregi de la 0 (niciuna) ... 255 (complet) .
    * Sfârșitul fișierului trebuie să aibă 3 linii cu:
        1. O culoare rgb de fundal pentru valori de date mai mici decât minimum bara de culoare, de exemplu: B 128 128 128
Este de multe ori startRed, startGreen, și startBlue primul segment.
        2. O culoare RGB de prim plan pentru valori de date mai mult decât maximul barei de culori, de exemplu: F 128 0 0
Acesta este de multe ori EndRed, EndGreen și EndBlue al ultimului segment.
        3. O culoare rgb pentru valorile datelor NaN, de exemplu, N 128 128 128
Este de multe ori gri mijlociu (128 128 128) .
    * Valorile de pe fiecare linie trebuie separate prin file, fără spații străine.
    
Un eșantion de fișier .cpt este BlueWhiteRed.cpt:
    
\\# Aici BlueWhiteRed.cpt.
0 0 0
1 0 0 255 2 0 255 255
2 0 255 255 3 255 255
3 255 255 4 255 255
4 255 255
5 255 0 0
B 0 0 128
F 128 0 0
N 128 128 128
    
A se vedea fișierele .cpt existente pentru alte exemple. Dacă există probleme cu un fișier .cpt,ERDDAP™va arunca, probabil, o eroare atunci când fișierul .cpt este parsed (Care este mai bine decât utilizarea greșită a informațiilor) .
    
Puteți adăuga palete suplimentareERDDAP. Le puteți face singur sau le găsi pe web (de exemplu, la[cpt-oraş](http://soliton.vm.bytemark.co.uk/pub/cpt-city/)) deşi probabil va trebui să editaţi formatul lor uşor pentru a se conformaERDDAPCerinţele .cpt. Pentru a obțineERDDAP™pentru a utiliza un nou fișier .cpt, stoca fișierul în *Tomcat* /webapps/erddap/WEB-INF/cptfiles (va trebui sa faci asta pentru fiecare noua versiune aERDDAP) și fie:
    
    * Dacă utilizați fișierul mesaje implicit.xml: adăugați numele fișierului la&lt;palets&gt; tag in
         *Tomcat* /webapps/erddap/WEB-INF/classes/gov/noaaa/pfel/erddap/util/messages.xml.
Dacă faci asta, trebuie să o faci de fiecare dată când faci upgradeERDDAP.
    * Dacă utilizați un mesaj personalizat.xml fișier: adăugați numele fișierului la&lt;palettes &gt; tag-ul din fișierul personalizat.xml: *Tomcat* /content/erddap/messages.xml . Dacă faci asta, trebuie s-o faci doar o dată. (dar există o altă lucrare pentru a menține un mesaj personalizat.xml fișier) .
    
Apoi repornițiERDDAP™Deci...ERDDAP™observă schimbările. Un avantaj al acestei abordări este că puteți specifica ordinea de palete din lista prezentată utilizatorilor. Dacă adăugați o colecție, vă încurajăm să adăugați un prefix cu inițialele autorilor (de exemplu, "KT\\_") numele fiecărei palete pentru a identifica colecția și pentru a putea exista mai multe palete care altfel ar avea același nume.
    
Vă rugăm să nu eliminați sau să modificați oricare dintre paletele standard. Ele sunt o caracteristică standard a tuturorERDDAP™instalații. Dacă credeţi că o paleta sau o colecţie de palete ar trebui să fie incluse în standardulERDDAP™distributie deoarece ar fi de uz general, va rugam sa le trimiteti email lui Chris. John la Noaa.gov.
    
### Bare de culoare{#colorbars} 
*    **CumERDDAP™genera culorile într-o bara de culori?** 
    
    1. Utilizatorul selectează una dintre predefinite[Palete](#palettes)sau utilizează implicit, de exemplu, Rainbow. Paletele sunt stocate/definite in fisiere GMT-stil .cpt Color Palette Table. FiecareERDDAPPaletele predefinite au o gamă simplă de numere întregi, de exemplu 0 la 1 (dacă există doar o secțiune în paleta) , sau 0-4 (dacă există patru secțiuni în paleta) . Fiecare segment din fișier acoperă n la n+1, începând cu n=0,
    2.  ERDDAP™generează un nou fișier .cpt pe-the-fly, prin scalarea gama paleta predefinită (de exemplu, 0-4) la gama de paleta necesare de către utilizator (de exemplu, 0,1 până la 50) și apoi generarea unei secțiuni în noua paleta pentru fiecare secțiune a noii palete (De exemplu, o scară log cu căpușe la 0,1, 0,5, 1, 5, 10, 50 vor avea 5 secțiuni) . Culoarea pentru punctul final al fiecărei secțiuni este generată de găsirea secțiunii relevante a paletei în fișierul .cpt, apoi interpolarea liniară a valorilor R, G și B. (E acelaşi lucru cu modul în care GMT generează culori din fişierele sale color Palette Table.) Acest sistem permiteERDDAP™pentru a începe cu palete generice (De exemplu, Rainbow cu 8 segmente, în total între 0 și 8) și de a crea palete personalizate pe-the-fly (De exemplu, un curcubeu personalizat, care se referă de la 0,1 la 50 mg/l la culorile curcubeului) .
    3.  ERDDAP™apoi foloseste acel nou fisier .cpt pentru a genera culoarea pentru fiecare pixel colorat diferit in bara de culoare (și ulterior pentru fiecare punct de date atunci când complotează date pe un grafic sau hartă) , găsind din nou secțiunea relevantă a paletei în fișierul .cpt, apoi interpolând liniar valorile R, G și B.
    
Acest proces poate părea inutil de complicat. Dar rezolvă probleme legate de solzi log care sunt greu de rezolvat alte moduri.
    
Deci, cum poți imita ceea ceERDDAP™Face? Nu e uşor. Practic, aveți nevoie pentru a duplicat procesul căERDDAP™se utilizează. Dacă sunteţiJavaProgramator, puteți folosi acelașiJavaclasă careERDDAP™folosește pentru a face toate acestea:
     *Tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/coastwatch/sgt/CompoundColorMap.java.
    
### Orientări pentru sistemele de distribuție a datelor{#guidelines-for-data-distribution-systems} 
Se pot găsi opinii mai generale cu privire la proiectarea și evaluarea sistemelor de distribuție a datelor[Aici.](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html).
     
### ArchiveADataset{#archiveadataset} 
Inclus înERDDAP™instalarea este un instrument de linie de comandă numit ArchiveADataset care vă poate ajuta să faceți o arhivă (a.zipsau.tar.gzfișier) cu o parte sau toate seturile de date stocate într-o serie de netcdf-3.ncfișiere de date într-un format de fișier care este adecvat pentru transmiterea laNOAAArhiva NCEI (.ncpentru seturi de date în rețea sau[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)pentru seturile de date tabelare, astfel cum se specifică de către[NCEINetCDFȘabloane v2.0](https://www.ncei.noaa.gov/data/oceans/ncei/formats/netcdf/v2.0/index.html)) .

Arhiva A Dataset poate face două formate diferite de arhivă:

* Formatul "original" urmează următoarele:[Orientări privind arhivarea NCEI](https://www.ncdc.noaa.gov/atrac/guidelines.html), acest ghid pentru[Arhivarea datelor la NCEI](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook?pli=1), și legate[Practici de asigurare a integrității datelor](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook/data-integrity).
* Formatul "BagIt" face[Fișiere BagIt](https://en.wikipedia.org/wiki/BagIt), un format standardizat de arhivă promovat de Biblioteca Congresului SUA, astfel cum este specificat de către[BagIt v0.97 specificație](https://tools.ietf.org/html/draft-kunze-bagit-14).NOAANCEI poate standardiza fișierele BagIt pentru transmiterea către arhivă.

Nu este surprinzător,[metadate globale și variabile](/docs/server-admin/datasets#global-attributes)căERDDAP™încurajează/necesități este aproape exact același în fișier CF și metadate ACDD pe care NCEI le încurajează/necesită, astfel încât toate seturile de date ar trebui să fie pregătite pentru transmiterea către NCEI prin intermediul[Trimite2NCEI](https://www.nodc.noaa.gov/s2n/)sau[ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)  (Instrument avansat de urmărire și resurse NCEI pentru colecții arhivă) .

Dacă (nuERDDAP™administrator) Utilizaţi ArchiveADataset pentru a trimite date către NCEI, apoi (nu NCEI) va determina când să transmită o bucată de date la NCEI și ce acea bucată va fi, pentru că veți ști când există date noi și cum să specifice că bucată (si NCEI nu va) . Astfel, ArchiveADataset este un instrument pentru tine de a utiliza pentru a crea un pachet pentru a trimite la NCEI.

Arhiva A Datele pot fi utile în alte situații, de exemplu,ERDDAP™administratori care trebuie să convertească un subset de seturi de date (pe un privatERDDAP) din formatul de fișier nativ într-un set de[.ncFișiere CF](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA), astfel încât un publicERDDAP™poate servi datele din.ncFișiere CF în loc de fișierele originale.

Odată ce ați înființatERDDAP™si sa-l ruleze (cel puțin o dată) , puteți găsi și utiliza ArchiveADataset în *Tomcat* /webapps/erddap/WEB-INF director. Există un script shell (ArchiveADataset.sh) pentru Linux/Unix și un fișier lot (ArchiveADataset.bat) pentru Windows.

Pe Windows, prima dată când executați ArchiveADataset, aveți nevoie pentru a edita ArchiveADataset. fișier liliac cu un editor de text pentru a schimba calea către java. exe fişier astfel încât Windows poate găsiJava.

Când executați ArchiveADataset, vă va pune o serie de întrebări. Pentru fiecare întrebare, tastaţi un răspuns, apoi apăsaţi Enter. Sau apăsați ^C pentru a ieși dintr-un program în orice moment.

Sau, puteți pune răspunsurile la întrebări, în ordine, pe linia de comandă. Pentru a face acest lucru, executați programul o dată și tastați și scrieți răspunsurile. Apoi, puteți crea o singură linie de comandă (cu răspunsurile ca parametri) care rulează programul și răspunde la toate întrebările.
Utilizați cuvântul implicit dacă doriți să utilizați valoarea implicită pentru un parametru dat.
Folosește "" (două citate duble) ca locator pentru un sir gol.
Specificarea parametrilor pe linia de comandă poate fi foarte convenabil, de exemplu, dacă utilizați ArchiveADataset o dată pe lună pentru a arhiva datele în valoare de o lună. Odată ce ați generat linia de comandă cu parametrii și salvat că în note sau într-un script shell, aveți nevoie doar pentru a face mici modificări în fiecare lună pentru a face arhiva lunii respective.

Întrebările pe care ArchiveADataset vi le pune vă permit:

* Specificați ambalajul original sau ambalajul de fișiere Bagit. Pentru NCEI, utilizaţi Bagit.
* Specificați zip sau gudron.gzcompresie pentru pachet. Pentru NCEI, se utilizează gudron.gz.
* Specificați o adresă de e-mail de contact pentru această arhivă (va fi scris în fișierul READ\\_ME.txt din arhivă) .
* A se precizadatasetIDa setului de date pe care doriți să arhivați.
* Specificați ce variabile de date doriți să arhivați (de obicei, toate) .
* Specificați care subset al setului de date pe care doriți să-l arhivați. Trebuie să formatați subgrupul în același mod în care ați formata un subset pentru o cerere de date, astfel încât acesta să fie diferit pentru grilă față de seturile de date tabulare.
    * Pentru seturile de date în grilă, puteți specifica o serie de valori ale celei mai din stânga dimensiuni, de obicei aceasta este o gamă de timp. ArchiveADataset va face o cerere separată și va genera un fișier de date separat pentru fiecare valoare în gama de valori. Deoarece seturile de date cu grilă sunt de obicei mari, aproape întotdeauna va trebui să specificați un subset mic în raport cu dimensiunea întregului set de date.
De exemplu,\\[ (2015-12-01) : (2015-12-31) \\]\\[\\]\\[\\]\\[\\]
    * Pentru seturile de date tabulare, puteți specifica orice colectare de constrângeri, dar este adesea o gamă de timp. Deoarece seturile de date tabulare sunt de obicei mici, adesea este posibil să se specifice nicio restricție, astfel încât întregul set de date să fie arhivat.
De exemplu, &time&gt;=2015-12-01&time&lt;Se aplică de la 1 ianuarie 2016.
* Pentru seturile de date tabulare: se specifică o listă separată de 0 sau mai multe variabile care vor determina modul în care datele arhivate sunt incluse în mai multe fișiere de date. Pentru seturi de date care au
    [cdm\\_date\\_type](/docs/server-admin/datasets#cdm_data_type)\\=TimeSeries|TimeSeriesProfile|Traiectorie|Dosar Traiectorie
Aproape întotdeauna trebuie să specificaţi variabila care are cf\\_rolul=timeseries\\_id (de exemplu,stationID) sau cf\\_role=traiectorie\\_id atribut. ArchiveADataset va face o cerere separată și va genera un fișier de date separat pentru fiecare combinație a valorilor acestor variabile, de exemplu, pentru fiecarestationID.
Pentru toate celelalte seturi de date tabulare, probabil că nu va specifica orice variabile în acest scop.
Avertisment: Dacă subsetul setului de date pe care îl arhivați este foarte mare (&gt;2GB) și nu există nici o variabilă adecvată în acest scop, atunci ArchiveADataset nu este utilizabil cu acest set de date. Ar trebui să fie rar.
* Specificați formatul fișierului pentru fișierele de date care vor fi create.
Pentru seturile de date în rețea, pentru NCEI, se utilizează.nc.
Pentru seturile de date tabelare, pentru NCEI, se utilizează[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)dacă este o opțiune; în caz contrar, utilizați.nc.
* Specificați tipul de fișier digerat care trebuie creat pentru fiecare fișier de date și pentru întregul pachet arhivă: MD5, SHA-1, sau SHA-256. Digerarea fișierului oferă o modalitate pentru client (De exemplu, NCEI) pentru a verifica dacă fișierul de date a devenit corupt. În mod tradiţional, acestea erau[Fișiere .md5](https://en.wikipedia.org/wiki/MD5), dar acum există opțiuni mai bune. Pentru NCEI, utilizaţi SHA-256.

După ce răspundeți la toate întrebările, ArchiveADataset va:

1. Face o serie de cereri la setul de date și etapa fișierele de date rezultate în *Big ParentDirectory* /ArchiveADataset/ *datasetID\\_timestamp* /.
Pentru seturile de date în rețea, va exista un fișier pentru fiecare valoare a celei mai din stânga dimensiuni (De exemplu, timpul) . Numele fișierului va fi acea valoare (De exemplu, valoarea timpului) .
Pentru seturile de date tabulare, va exista un fișier pentru fiecare valoare a variabilei ... (s) . Numele fișierului va fi acea valoare. Dacă există mai multe variabile, variabilele din stânga vor fi utilizate pentru a face nume subdosar, iar cea mai dreaptă variabilă va fi utilizată pentru a face numele fișierelor.
Fiecare fișier de date trebuie să fie&lt;2GB (maximul permis de.ncversiunea 3 fișiere) .
2. Faceți un fișier legat de fiecare fișier de date cu digerarea fișierului de date. De exemplu, dacă fișierul de date este 46088.ncși tipul digerat este .sha256, apoi fișierul digerat va avea numele 46088.nc- Sha256.
3. Faceți un fișier READ\\_ME.txt cu informații despre arhivă, inclusiv o listă cu toate setările specificate pentru a genera această arhivă.
4. Face 3 fișiere în *Big ParentDirectory* /ArchiveADataset/ :
    
    * A.zipsau.tar.gzfișier arhivă numit *datasetID\\_timestamp* .zip  (sau.tar.gz) conținând toate fișierele de date înscenate și fișierele digerate. Acest fișier poate fi orice dimensiune, limitată numai de spațiu pe disc.
    * Un fișier digerat pentru fișierul arhivă, de exemplu, *datasetID\\_timestamp* .zip.sha256.txt
    * Pentru tipul de arhivă "original," un fișier text numit *datasetID\\_timestamp* .zip.listofFiles.txt (sau.tar.gz) care enumeră toate fișierele din.zip  (sau.tar.gz) Dosar.
    
Daca pregatesti arhiva pentru NCEI, acestea sunt fisierele pe care le vei trimite la NCEI, poate prin intermediul[Trimite2NCEI](https://www.nodc.noaa.gov/s2n/)sau[ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)  (Instrument avansat de urmărire și resurse NCEI pentru colecții arhivă) .
5. Șterge toate fișierele înscenate astfel încât doar fișierul arhivă (de exemplu,.zip) Digerat (de exemplu, .sha256.txt) al arhivei; și (opțional) Fişierele .listofFiles.txt rămân.

#### ISO 19115.xml Fișiere metadate{#iso-19115-xml-metadata-files} 
Pachetul arhivă ArchiveADataset nu include fișierul de metadate ISO 19115 .xml pentru setul de date. Dacă doriți/trebuie să trimiteți un fișier ISO 19115 pentru setul de date către NCEI, le puteți trimite fișierul de metadate ISO 19115 .xml careERDDAP™create pentru setul de date (darNMFSoamenii ar trebui să obțină fișierul ISO 19115 pentru seturile lor de date de la InPort dacăERDDAP™nu este deja de servire acel fișier) .

Probleme? Sugestii? ArchiveADataset este nou. Dacă aveţi probleme sau sugestii, consultaţi[secțiunea privind obținerea de sprijin suplimentar](/docs/intro#support).
     
