---
title: "ERDDAP™ - Changes"
---
#  ERDDAP™ Modificări

 ERDDAP™ este un mare exemplu de [Inovarea bazată pe utilizator](https://en.wikipedia.org/wiki/User_innovation) , unde inovarea produselor vine adesea de la consumatori ( ERDDAP™ utilizatori) , nu doar producătorii ( ERDDAP™ dezvoltatori) . De-a lungul anilor, majoritatea ideilor pentru noi caracteristici și schimbări în ERDDAP™ provin de la utilizatori. Acești utilizatori sunt creditați mai jos pentru ideile lor mari. Mulţumesc&#33; Vă rugăm să păstrați aceste sugestii mari vin&#33;

Aici sunt modificările asociate cu fiecare ERDDAP™ Eliberare.


## Versiunea 2.29.0{#version-2290} 
 (eliberat în 2025-12-15) 

Acţiune necesară.

 ERDDAP™ versiunea 2.29.0 necesită jdk 25 sau mai târziu. Vă rugăm să actualizați versiunea JDK. Dacă asta e o problemă, poţi construi ERDDAP™ pentru un jdk mai vechi (înapoi la cel puțin 17) prin schimbarea fișierului pom.xml. JDK 25 este o versiune LTS de Java și include multe îmbunătățiri, în special îmbunătățirea performanței.

*    **Noi caracteristici și schimbări (pentru utilizatori) :** 
    * Versiuni ISO 19115: Vezi mai jos pentru informaţii admin. Pentru utilizatori, puteți solicita acum versiuni specifice ale metadatelor ISO 19115. Face acest lucru din griddap / tabledap pagini pentru un set de date cu tipul de fișier picătură în jos. Aceste versiuni vor fi independente de implicit server.

*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * O caracteristică nouă, suport MQTT. Pentru detalii Vă recomandăm să citiţi [O pagină nouă despre asta.](/docs/server-admin/mqtt-integration.md) Aceasta include posibilitatea de a construi seturi de date din mesajele MQTT și publicarea mesajelor MQTT atunci când se modifică un set de date. Este oprit în mod implicit, așa că dacă doriți să-l utilizați, trebuie să-l activați.

Mulţumită lui Ayush Singh pentru că a lucrat la MQTT&#33;

    * Îmbunătăţiri S3: Adăugare suport pentru S3 URI cacheFromUrl valoare. Acest lucru va permite ERDDAP pentru a sprijini găleți private găzduit pe amazonaws.com De asemenea, a abordat o problemă S3 scurgere de memorie.

Datorită @SethChampagneNRL pentru munca pe S3&#33;

    * Versiuni ISO 19115: Există acum suport pentru 3 versiuni diferite ale metadatelor ISO 19115. Versiunea implicită este controlată de setările din setup.xml. Dacă utilizareaSissISO19115 este falsă, serverul va furniza implicit NOAA modificat ISO19115_2. Dacă utilizareaSissISO19115 este adevărată, atunci serverul va utiliza o versiune diferită în funcție de valoarea utilizăriiSisISO19139. Dacă utilizareaSisISO19139 este adevărată, implicitul va fi ISO19139_2007, dacă utilizareaSisISO19139 este falsă, implicitul va fi ISO19115_3_2016. Vă recomandăm utilizarea SisISO19115=adevărat și utilizareSisISO19139=fals. Organizația dumneavoastră poate necesita diferite setări.

    * Migrat la java. biblioteca timpului (în loc de java.util. GregorianCalendar) . Acest lucru ar trebui să ofere îmbunătățiri ale performanței în ceea ce privește întrebările care implică coloane de date/ora. Nu ar trebui să existe un impact vizibil pentru marea majoritate a seturilor de date. Singurul caz cunoscut care cauzează o schimbare este dacă setul de date utilizează `zile de la 0000-01-01` sau similare. Dacă aceasta este o problemă pentru o variabilă, puteți adăuga ` <att name="legacy_time_adjust"> Adevărat. </att> ` la addAttributes secţiunea a dataVariable sau axisVariable .
    
    *    datasets.xml este acum procesată de o [Substitutor string](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Acest lucru are multe utilizări, inclusiv stabilirea valorilor private (ca parole) utilizarea variabilelor de mediu. Acest lucru poate fi dezactivat prin setarea activEnvParsing la fals în configurare.xml.

    * Axa de presiune: Adăugați un caz special pentru creșterile definite de presiune. Aceasta se utilizează în principal în seturile de date meteorologice care definesc creșterile verticale ale nivelurilor izobare. NOTĂ: Valorile de presiune mai mici înseamnă creșteri mai mari, astfel încât axa se execută în dreptul creșterilor normale definite în metri sau picioare.

Mulţumită [SethChampagneNRL](https://github.com/ERDDAP/erddap/pull/373) 

    *    EDDGrid FromNcFiles cu dimensiuni diferite: Există (experimental) sprijin pentru EDDGrid De la NcFiles seturi de date pentru a avea variabile care nu folosesc același set de axe. Vă rugăm să raportați înapoi cu privire la modul în care acest lucru funcționează pentru tine, sau în cazul în care comportamentul nu pare destul de corect.

    * Există o colecție de optimizari care ar trebui să fie în siguranță, dar au steaguri pentru a reveni la comportamentul vechi, dacă este necesar. Dacă găsiți necesitatea de a seta oricare dintre steaguri, vă rugăm să depuneți un bug. Dacă nu auzim de probleme cele mai multe dintre acestea vor fi eliminate cu noul comportament implicit în viitor. Există o [pagină nouă despre steagurile caracteristicilor](/docs/server-admin/feature-flags.md) unde puteți citi despre aceste și alte steaguri.

      * atingere Fire Numai WhenItems: Aceasta este o schimbare astfel încât touchThread va fi difuzate numai atunci când există elemente în coada de a atinge. Un fir mai puțin rulează este o optimizare minoră, dar încă util. Implicit faţă de adevăr.

      * utilizareNcMetadata Pentru tabel: Această modificare permite tabelul de fișiere interne pentru a utiliza atributele NC, în special un atribut real_interval variabil pentru a evita citirea întregului fișier NC. Acest lucru poate accelera drastic încărcarea inițială a seturilor de date pe baza fișierelor NC în cazul în care valoarea reală_interval pentru fiecare variabilă din fiecare fișier este inclusă ca atribut. Rețineți că acest lucru are încredere în valoare, așa că dacă este greșit, tabelul de fișiere interne va avea informații incorecte. Implicit faţă de adevăr.

      * ncHeader MakeFile: Această modificare permite generarea fișierelor antet NC fără a genera mai întâi fișierul NC reprezentativ. Aceasta este o optimizare mică pentru tabelul EDD, dar o optimizare uriașă pentru mulți EDDGrid cereri. Implicite față de false (ca în fals este comportamentul optimizat intenționat) .

      * fundal Creeazăsubset Tabele: Această modificare duce o parte din prelucrarea inițială a seturilor de date la un fir de fundal. Acest lucru ar trebui să îmbunătățească timpul pentru încărcarea seturilor de date. Mai exact, partea întârziată este tabelele de subset, care sunt, de asemenea, generate atunci când este necesar în cazul în care prelucrarea întârziată nu sa întâmplat încă. Implicit faţă de adevăr.

    * Unele mici modificări, bug fixs (Mulțumesc Italo Borrelli pentru fixarea pentru EDDtableFromAggregateRows, Mulţumesc. @SethChampagneNRL pentru a permite longitudinea mai mare de 360 in EDDGrid LonPM180 și alte câteva soluții de bug) Şi optimizări.

*    **Pentru ERDDAP™ Dezvoltatori:** 
    * Optimizări suplimentare, inclusiv timpul de testare de tăiere în jumătate.

    * Profiluri de încercare noi pentru foarte fulgi (extern) sau extrem de lent (SlowAWS) teste.

## Versiunea 2.28.1{#version-2281} 
 (eliberat în 2025-09-05) 

*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * Suport adăugat pentru X-Forwarded-Prefix. Acest lucru este de interes special pentru admins rulează servere pe un subpat. Vă rugăm să citiți documentația actualizată pentru [Apache](/docs/server-admin/deploy-install#apache) şi [Nginx](/docs/server-admin/deploy-install#nginx) pentru mai multe informații.

Mulţumită [@srstsavage](https://github.com/srstsavage) 

## Versiunea 2.28.0{#version-2280} 
 (eliberat în 2025-08-29) 

*    **Noi caracteristici și schimbări (pentru utilizatori) :** 
    *    [Schema croissant](https://docs.mlcommons.org/croissant/docs/croissant-spec.html) este acum disponibil. Admins poate controla dacă metadatele implicite utilizează Croissant, dar începând cu 2.28.0 puteți solicita definiția Croissant pentru noul tip de fișier de export ".croissant" (care oferă un fișier jsonld) .

*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * Docker nou Imagine creată pe fiecare cerere de tragere fuzionată. Acestea sunt cladiri alfa, nu sunt versiuni. Ei vor avea o etichetă ca "20250814T034025," care indică atunci când a fost construit. Dacă doriți să încercați cele mai recente caracteristici puteți utiliza aceste. Daca doriti ceva mai stabil utiliza lansările noastre cu un tag versiune semantica (de exemplu 2,28.0) . Întotdeauna ne propunem ca eliberarea alfa să fie utilă, dar există mai puţine teste pentru ei decât versiunile noastre. Vă recomandăm întotdeauna să utilizați ceva cel puțin la fel de nou ca nostru "ultima" versiune, care va fi cea mai recentă versiune versiune.

    * Docker Imagini disponibile acum pe [GitHub](https://github.com/ERDDAP/erddap/pkgs/container/erddap) pe lângă [DockerHub](https://hub.docker.com/r/erddap/erddap) .

Mulţumită [@ocefpaf](https://github.com/ocefpaf) , [@abkfenris](https://github.com/abkfenris) , [@srstsavage](https://github.com/srstsavage) , și [MathewBiddle](https://github.com/MathewBiddle) la contribuțiile lor în jurul Docker Images. Aceasta a inclus primele contribuții din partea tuturor, cu excepția @stsavage&#33;
    
    * Există acum sprijin pentru generarea [Schema croissant](https://docs.mlcommons.org/croissant/docs/croissant-spec.html) Dosare. Este în mod implicit. Puteți dezactiva schema Croissant în setup.xml cu (NU RECOMANDAT- Vă rugăm să ajungeţi sau să completaţi o problemă privind GitHub dacă este necesar să faceţi acest lucru) :
    ```
        <generateCroissantSchema>false</generateCroissantSchema>
    ```

    * Unele setări au modificat valorile implicite. Utilizați anteteleForUrl și utilizațiEddReflection acum ambele implicit la adevărat. Dacă ei cauzează o problemă și trebuie să le setați să fals, vă rugăm să creați o problemă. Intenția este de a le elimina într-o viitoare versiune.

    * Unele setări au fost eliminate. UtilizareSharedWatchService și redirecționareDocumentare ToGitHubIo a fost setat la adevărat în mod implicit pentru mai multe versiuni și a fost destul de bine testat în acest moment. Îndepărtez astea permise pentru o curăţare de coduri.

    * Câteva mici schimbări, reparaţii de insecte şi optimizări.

*    **Pentru ERDDAP™ Dezvoltatori:** 
    * O mulțime de cod mort eliminat. Multe avertismente fixate.

## Versiunea 2.27.0{#version-2270} 
 (eliberat în 2025-06-11) 

*    **Noi caracteristici și schimbări (pentru utilizatori) :** 
    * Date noi pentru convertorul bara de culoare pe servere la /erddap/convert/color.html

*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * Comportamentul implicit este că cache-ul va fi eliminat acum independent de sarcina seturilor de sarcini majore. Acest lucru va permite o compensare mai fiabile și regulate de fișiere vechi cache. Există lucrări suplimentare pentru a îmbunătăți comportamentul serverului atunci când este scăzut pe spațiu pe disc (returnarea unei erori pentru cererile susceptibile de a face serverul să rămână fără spațiu, și curățarea cache-ului mai frecvent în circumstanțe de disc scăzut pentru a încerca să prevină erorile) . În datasets.xml   (sau configurare. xml) puteți adăuga/seta noua cache ClearMinutes parametru pentru a controla cât de frecvent verifică serverul pentru a șterge cache-ul. Notă, parametrul cacheMinutes existent controlează vârsta fișierelor care trebuie păstrate, noul cache ClearMinutes este pentru cât de des pentru a face un Chache clar.
    ```
        <cacheClearMinutes>15</cacheClearMinutes>
    ```
Puteți dezactiva noile controale cache clare prin setarea askCacheClear la fals în setup.xml, deși care nu este recomandat.
cache ClearMinutes este, de asemenea, în [Documentația seturilor de date](/docs/server-admin/datasets#cacheclearminutes) .
    
    * Suport de metadate de date localizate. Acesta susține localizarea valorilor într-o addAttributes Sectiunea. Pur și simplu adăugați un atribut cu tag-ul suplimentar xml:lang. De exemplu, pentru a adăuga un titlu francez la un set de date dumneavoastră addAttributes secțiunea va include:
    ```
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
    ```
Detalii suplimentare disponibile în [documentație de metadate localizate](/docs/server-admin/localized-metadata) .

    * Docker nou Compune fişier cu opţiuni pentru SSL şi un server Prometheus. Mulţumită lui Shane St. Savage pentru SSL şi Jiahui Hu pentru Prometheus.

    * Suport pentru utilizarea informațiilor din antete pentru a determina URL-ul serverului în loc să se bazeze pe fișierul de configurare. Acest lucru va permite accesul unui server cu mai multe nume și poate simplifica anumite configurații. Vă rugăm să activați și să trimiteți feedback.
    ```
        <useHeadersForUrl>true</useHeadersForUrl>
    ```

    * Câteva mici schimbări, reparaţii de insecte şi optimizări.

*    **Pentru ERDDAP™ Dezvoltatori:** 
    * Refactor la modul în care tipurile de fișiere de ieșire sunt definite în cod. Acest lucru ar trebui să facă astfel încât tipurile de fișiere pot fi adăugate fără a fi nevoie să atingă mai multe locuri de cod.

## Versiunea 2.26{#version-226} 
 (eliberat în 2025-03-31) 

*    **Pentru toți:** 
    * Actualizare mare la site-ul nostru de documentare:https://erddap.github.io/
În afară de aspectul actualizat există o navigare îmbunătățită, căutare, traducere, și ar trebui să fie mai ușor pentru a menține merge mai departe&#33;

*    **Noi caracteristici și schimbări (pentru utilizatori) :** 
    * Abonamente și RSS actualizări ar trebui să se întâmple mai fiabil pentru seturile de date care se actualizează frecvent din modificările fișierelor.

*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * Eliberarea implicită necesită/suporturi Java Versiunea 21. Înapoi în această versiune este posibilitatea de a face cu ușurință o Java 17 binare compatibile.

    * O caracteristică nouă pentru personalizarea informațiilor afișate despre seturile de date din UI. Ne așteptăm ca acest lucru să fie deosebit de util pentru a adăuga lucruri cum ar fi citări de seturi de date. Pentru mai multe detalii puteți citi [documentație nouă](/docs/server-admin/display-info) . Mulţumită lui Ayush Singh pentru contribuţie&#33;

    * Indicatori suplimentari Prometheus. Cel mai mare este ` http _Cere_durata_secunde` care include timpii de răspuns la cerere descriși prin: "cerere_type," "dataset_id," "dataset_type," "file_type," "lang_code," "status_code"
Acest format lizibil va permite o mai bună colectare de indicatori pentru a înțelege modul în care utilizatorii folosesc serverul.

    * Mod nou de a genera fișiere XML ISO19115. Acesta utilizează SIS Apache și este o nouă opțiune în această versiune. Vă rugăm să activați și să trimiteți feedback.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * UI va crea acum link-uri individuale pentru fiecare url în domenii ca infoUrl şi sumar.

    * Abonamente și RSS actualizări ar trebui să se întâmple mai fiabil pentru seturile de date care se actualizează frecvent din modificările fișierelor. Dacă acest lucru cauzează probleme, vă rugăm să ajungeți pe GitHub și dezactivați funcționalitatea prin adăugarea steagului de mai jos la setup.xml.
NECOMANDAT
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * Variabilele secundare nu vor mai fi generate automat pentru tipul de set de date EDDTabelFromNcCFFiles. Dacă te bazai pe comportament, nici tu nu puteai. (soluţie preferată) se adaugă subsetVariables la definiția setului de date din datasets.xml , sau adăugați steagul de mai jos la setup.xml. Dacă simţiţi nevoia de a porni acest lucru, vă rugăm să ajungeţi pe GitHub astfel încât să putem sprijini mai bine cazul dumneavoastră de utilizare merge mai departe.
NECOMANDAT
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * Serverul va redirecționa acum cererile de documentație (în timpul descărcărilor/care este documentaţia care a fost migrată) la noul site de documentare. Dacă este necesar, puteți dezactiva acest lucru cu un steag în setup.xml:
NECOMANDAT
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Câteva mici schimbări şi reparaţii de insecte.

*    **Pentru ERDDAP™ Dezvoltatori:** 
    * Mai multe îmbunătăţiri ale calităţii codului şi curăţarea codului mort. Aceasta include optimizări minore, o mai bună gestionare a resurselor closabile și migrarea departe de tipurile de date vechi (ca Vector) .

    * Refactoring mare la EDStatic pentru a scoate cea mai mare parte a config, mesaj, și codul metric. De asemenea, mai bine încapsulat inițializarea și manipularea traseelor directoare (Ultimele două au mai multe de făcut.) 

    * O mulțime de progrese către o imagine Docker susținut oficial. Planul este de a finaliza și de a elibera după ERDDAP™ 2.26 eliberarea este disponibilă.

## Versiunea 2.25{#version-225} 
 (eliberat 2024-10-31) 

*    **Noi caracteristici și schimbări (pentru utilizatori) :** 
    * Tabelul EDDFromFiles poate sprijini acum întrebări cu rezultate doar derivate (Globale, script jexl, sau variabile) .
         
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * Versiunea 2.25 necesită Java 21 sau mai nou. Aceasta este versiunea LTS și este disponibilă de peste un an.
         
    * Serviciul SharedWatch este acum implicit. Dacă trebuie să-l dezactivaţi, vă rugăm să-l contactaţi pe Chris. John la Noaa.gov să-mi spună, ca să-l pot îmbunătăţi în versiunile viitoare şi să adaug:
        &lt;UtilizareService SharedWatch&gt;fals&lt;/useSharedWatchService&gt; to your setup.xml.
         
    * ă ERDDAP™ servlet va porni acum la pornirea serverului. Ceea ce înseamnă că seturile de date vor începe să se încarce imediat în loc să aştepte până se va face o cerere.
         
    * Parametrul RVM eliminat în tabelul EDDFromMultidimNcFiles va avea acum un efect. Setarea acesteia la false poate accelera în mod semnificativ unele întrebări, dar acest lucru nu poate fi potrivit pentru toate seturile de date. Pentru mai multe informații, a se vedea [descrierea parametrului](/docs/server-admin/datasets#removemvrows) .
         
    * Setări de date (Tabel EDDFromNcFiles și EDDGrid DinNcFiles) utilizarea de fișiere Zarr sunt acum suportate. Acestea trebuie să includă "zarr" în fişierulNameRegex sau pathRegex. Vezi [zarr secion în documentația seturilor de date](/docs/server-admin/datasets#zarr) pentru mai multe detalii.
         
    * Noul tip de set de date, tabelul EDDFromParquetFiles este acum sprijinit. Vezi [Tabel EDD Din dosarul de parchet secţiunea din documentaţia seturilor de date](/docs/server-admin/datasets#eddtablefromparquetfiles) pentru mai multe detalii.
         
    *    [Prometheus metrics](https://prometheus.io/) sunt acum disponibile la /erddap /metrice.
         
    * Este disponibilă o nouă implementare a parserului XML. Acest nou parser permite utilizarea XInclude in datasets.xml . Mulţumită lui Ayush Singh pentru această caracteristică.
         
    * Parametru nou în datasets.xml pentru a controla e-mailuri de activitate neobișnuite. activitate neobişnuită FailProcent implicit la vechea valoare de 25%. Mulţumită lui Ayush Singh pentru această caracteristică.
         
    * Parametru nou în setup.xml care controlează dacă erorile de încărcare a setului sunt afișate pe pagina status.html. Este implicit adevarat, pentru a dezactiva erori de setare pe pagina de stare, set aratăLoadErrorsOnStatusPage la fals:&lt;aratăLoadErrorsOnStatusPage&gt;fals&lt;/showLoadErrorsOnStatusPage&gt;
         
    * Câteva mici schimbări şi reparaţii de insecte.
         
*    **Pentru ERDDAP™ Dezvoltatori:** 
    * Testarea separată la unitate și integrare (lent) teste. De asemenea, mai multe teste activate și teste au fost făcute mai puțin fulg.
         
    * Eroare Prone (unele controale sunt încă dezactivate) și Spot Bugs integrate prin Maven.
         
    * Cod complet formatat pentru a se potrivi cu Google Style Guide.
         

## Versiunea 2.24{#version-224} 
 (eliberat 2024-06-07) 

*    **Noi caracteristici și schimbări (pentru utilizatori) :** 
    * Noua paleta de culori EK80 pentru seturi de date acustice disponibile. Mulţumită lui Rob Cermak pentru asta.
         
    * Fixați o problemă în cazul în care EDDtableAggregateRows nu a arătat intervale adecvate de la toți copiii. Mulţumită lui Marco Alba pentru raportul de urgenţă.
         
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * DE FACUT: SCHIMBĂRI DE SECURITATE: Autentificarea Google ar putea necesita modificări la CSP.
        
Mai exact, s-ar putea să trebuiască să adăugațihttps://accounts.google.com/gsi/stylepentru a stlye-src șihttps://accounts.google.com/gsi/pentru a conecta-src. Pentru script-src puteți utiliza acumhttps://accounts.google.com/gsi/client.
        
Pentru mai multe informații puteți merge la [Pagina Google](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy) despre configurarea CSP.
         
        
    * Noul serviciu de ceas partajat. Aceasta este o opțiune nouă pentru vizionarea directoarelor pentru actualizări. Are un fir pentru fiecare sistem de fișiere în loc de un fir pentru fiecare set de date. Cel mai probabil, acest lucru va reduce drastic numărul de fire utilizate pentru a urmări modificările. Aceasta înseamnă că toate seturile de date se actualizează împreună în loc ca fiecare set de date să aibă propria frecvență de actualizare. Cel mai probabil, acest lucru va însemna actualizări mai frecvente pentru majoritatea seturilor de date.
        
Pentru a activa această adăugare&lt;UtilizareService SharedWatch&gt;true&lt;/useSharedWatchService&gt; to your setup.xml.
        
          
Vă rog să încercaţi asta şi să raportaţi cum funcţionează pentru Chris. John la Noaa.gov.
         
    * Fix pentru nume de var incorecte în jurnale. Mulţumită lui Ayush Singh pentru reparaţie.
         
    * Câteva mici schimbări şi reparaţii de insecte.
         
*    **Îmbunătăţiri pentru ERDDAP™ dezvoltatori:** 
    * Suport pentru dezvoltare locală folosind Docker. Mulţumesc Matt Hopson şi Roje.
         
    * Sprijin pentru dezvoltarea locală, utilizând Jetty şi îmbunătăţiri ale documentaţiei. Mulţumesc, Micah Wengren.
         
    * Modificări ale testelor pentru a reduce problemele de platformă transversală. Mulţumesc. Shane St. Savage.
         

## Versiunea 2.23{#version-223} 
 (eliberat 2023-02-27) 

Remarcaţi că această eliberare a fost făcută de Bob Simons, arătând astfel că el este încă în jurul şi activ în timpul tranziţiei la Chris John, succesorul său. Stating cu această versiune, toate modificările de cod sunt făcute de Chis John, cu excepția cazului în care se specifică altfel.

*    **Noi caracteristici și schimbări (pentru utilizatori) :** 
    *    (Niciuna)   
         
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * DE FACUT: SCHIMBĂRI DE SECURITATE: Autentificarea Google se realizează acum prin intermediul noii biblioteci Google Identity Services, care face parte din "Sign In with Google." Suportul Google pentru vechiul sistem Google Sign In va fi întrerupt 2023-03-31. Deci dacă utilizați Google Autentificare în ERDDAP™ instalare, trebuie să actualizați la ERDDAP™ v2.23+ până atunci. (Lui Bob îi pare rău că ne-a anunţat. E vina lui Bob.)   
         
    * NCCSV este acum v1.2. Modificarea este că fișierele sunt acum fișiere UTF-8 codificate (ei au fost ASCII) și astfel poate include acum orice caracter Unicode așa cum este, fără codare ca \\ \\u_hhhh_, deși care este încă permis.
Atunci când scrie fișiere NCCSV, ERDDAP™ Acum scrie fişiere v1.2.
         ERDDAP™ va citi încă fișiere NCCSV care urmează specificațiile v1.0 și v1.1.1.
Datorită Pauline-Chauvet, n-a-t-e, și thogar-computer pentru a sugera acest lucru și de a face testele pentru a asigura diferite programe foi de calcul poate importa fișiere UTF-8. Mulţumită lui Bob Simons pentru schimbarea codului.
         
    * NOU: Starea paginii web.html dispune acum de o linie în apropierea vârfului care indică ce sarcină de set de date se încarcă în prezent și statistici aferente, sau niciuna dacă nu este încărcat niciun set de date. Acest lucru poate fi foarte util ERDDAP™ Administratorii încearcă să afle de ce încarcă Datasets durează atât de mult. De asemenea, datele nGridDatasets, nTableDatasets, și nuTotalDatasets contează mai jos, care sunt acum instantanee (Anterior, acestea au fost la sfârșitul ultimei sarcini majore Setări de date) .
Această schimbare este pentru Roy Mendelssohn. Mulţumită lui Bob Simons pentru schimbarea codului.
         
    * IMPROVED: Generează date Xml modifică acum la CF-1.10 (a fost CF-1,6) în atributele "convenții."
Mulţumită lui Bob Simons pentru schimbarea codului.
         
    * Câteva mici schimbări şi reparaţii de insecte.
         

## Versiunea 2.22{#version-222} 
 (eliberat 2022-12-08) 

Rețineți că această eliberare a fost făcută de Bob Simons, arătând astfel că el este încă în jurul și activ în timpul tranziției către succesorul său.

*    **Noi caracteristici și schimbări (pentru utilizatori) :** 
    *    (Niciuna)   
         
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * Nimic.
         
    * Security BUG FIX: A fost o eroare legată de Scripting Cross în codul pentru selectarea limbajului. Mulţumită NOAA Scanări de securitate pentru a prinde asta. Acest lucru arată că NOAA securitatea caută în mod activ și în mod curent deficiențe de securitate în ERDDAP .
         
    * FIX DE SECURITATE: Multe biblioteci folosite de ERDDAP™ au fost actualizate, ca de obicei, ca parte a acestei eliberări. De data aceasta, aceasta a inclus actualizarea driver-ului PostgreSQL (care a avut un microfon de securitate) la 42.5.1.
         
    * IMPROVAT: schimbări mai mici la ERDDAP Sistemul de management al memoriei ar trebui să reducă şansele unei anumite cereri care eşuează din cauza lipsei memoriei disponibile.
         
    * Câteva mici schimbări şi reparaţii de insecte.
         

## Versiunea 2.21{#version-221} 
 (eliberat 2022-10-09) 

*    **Noi caracteristici și schimbări (pentru utilizatori) :** 
    *    (Niciuna)   
         
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * DE FACUT: Pentru Java 17, nu trebuie să utilizați \\-d64 în JAVA\\_OPTS în setenv.bat sau setenv.sh. Deci, dacă este acolo, vă rugăm să-l eliminați. Cred că modul 64 bit este acum selectat atunci când descărcați o versiune de 64 bit de Java . Mulţumită lui Sam Woodman.
         
    * BUG FIX: Uneori, noul sistem de e-mail a încercat să se logheze prea des, ceea ce a determinat serverele Google E-mail să respingă toate viitoarele jurnale în încercări. Acum, sistemul de e-mail evită acest lucru și probleme conexe.
         

## Versiunea 2.20{#version-220} 
 (eliberat 2022-09-30) 

*    **Nu utilizaţi v2.20. E defect.** Dar administratorii încă mai trebuie să facă TO DO elementele enumerate mai jos atunci când modernizarea la v2.21+.
     
*    **Noi caracteristici și schimbări (pentru utilizatori) :** 
    *    (Niciuna)   
         
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * Am reactivat vechiul sistem de management al memoriei. (Math2.securityMemoryAvailable) și a modificat noul sistem de management al memoriei (EDStatic.shedThisRequest) să lucreze mai bine cu ea. Vezi? [Stare memorie](/docs/server-admin/additional-information#memory-status) pentru detalii.
         
    * MODIFICAT: Implicit pentru&lt;ipAddressMaxRequests&gt; în datasets.xml a crescut de la 7 la 15. Este clar că unele legitime WMS clienții pot genera mai mult de 7 cereri simultane.
         

## Versiunea 2.19{#version-219} 
 (eliberat 2022-09-01) 

*    **Nu utilizaţi v2.19. E defect.** Dar administratorii încă mai trebuie să facă TO DO elementele enumerate mai jos atunci când actualizarea la v2.20+.
     
*    **Noi caracteristici și schimbări (pentru utilizatori) :** 
    * NEW: Există o nouă funcție de server-side, orderBy Coborâre, care funcționează ca orderBy , dar fel în ordine descendentă. Mulţumită lui Adam Leadbetter.
         
    * Acum, grafice (dar nu și hărți) se va extinde pentru a umple spațiul disponibil pe pânză, adică spațiul nefolosit de legendă. Puteți obține grafice înalte, grafice pătrate, sau grafice largi prin adăugarea și manipularea &.size=_latime_ | Parametru _înălțime_ (unde lățimea și înălțimea specifică dimensiunea pânzei, în pixeli) la cererea URL. (Aceasta nu este o opțiune pe pagina de web .graf. Trebuie să-l adăugați manual la URL.) Dacă nu specificaţi parametrul &.size, cereri pentru .miciPng, .png, .marimePng, .miciPdf, .pdf, şi .marime.pdf au dimensiuni predefinite panza, astfel încât graficul se va extinde pentru a umple spaţiul disponibil, dar de obicei va fi aproximativ pătrat. Mulţumită lui Bob Fleming.
         
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * DE FACUT: ERDDAP™ Acum cere Java 17 şi Tomcat 10. Trebuie să urmezi ERDDAP™ instrucțiuni de instalare (sau echivalentul, de exemplu, pentru Docker) de instalat Java 17 şi Tomcat 10 şi copiaţi \\[ Tomcat \\] /content director de la dvs. Tomcat 8 instalare în noul \\[ Tomcat \\] Director. Nu există alte schimbări pe care trebuie să le faci ERDDAP instalare legată de această modificare. Cu alte cuvinte, ERDDAP™ Funcţionează ca înainte.
        
Nu uita să faci ERDDAP - modificări legate de server.xml Tomcat și context.xml atunci când upgrade Tomcat. Vezi? ERDDAP 's [Instrucțiuni de instalare Tomcat](/docs/server-admin/deploy-install#tomcat) .
        
Impresia mea de Java 17 este că preferă mai multă putere de procesare și memorie pentru aplicații de lungă durată, cum ar fi ERDDAP™ , așa că funcționează ușor mai lent decât Java 8 cu computere de joasă putere (de exemplu, 2 nuclee și RAM minim) și funcționează ușor mai repede decât Java 8 cu computere de mare putere (de exemplu, 4+ nuclee și RAM abundente) . Deci, dacă vedeți performanță slabă, utilizați programe ca Linux [sus](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/) să verifice utilizarea resurselor și să ia în considerare acordarea ERDDAP™ mai multe resurse, în special mai multă memorie. Memoria e ieftină&#33; Majoritatea telefoanelor au mai multe procesoare și memorie decât serverele pe care unii dintre voi le folosesc pentru a rula ERDDAP &#33;
Mulţumită lui Erin Turnbull.
         
        
    * TO DO: Dacă utilizaţi ERDDAP™ pentru a accesa Cassandra, pentru Cassandra, trebuie să păstrați folosind versiunea de Java pe care o foloseai ca să conduci Cassandra. Doar comutați pe Java 17 pentru Tomcat. ERDDAP .
         
    * RECOMANDAT: În cazul în care CPU serverul are 4+ nuclee și 8+ GB de RAM, ia în considerare trecerea la aceste setări în dumneavoastră datasets.xml fișier:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Dacă serverul dumneavoastră are mai puține resurse, rămâneți la "1" pentru ambele setări.
Sistemele nThreads pentru EDDGrid Din fişiere şi tabel EDD Din Dosare s-au îmbunătăţit semnificativ. Aceste schimbări au dus la o îmbunătățire uriașă a vitezei (de exemplu, viteza 2X atunci când nThreads este setat la 2 sau mai mult) pentru cele mai dificile cereri (atunci când un număr mare de fișiere trebuie prelucrate pentru a aduna rezultatele) . Unele schimbări legate de Chris John va duce, de asemenea, la o viteză generală în întreaga ERDDAP . Codul acestor schimbări a fost contribuit de Chris John. Mulţumesc. Chris&#33;
         
    * AVERTISMENT: hyphens in datasetID Ale lui sunt depreciate și nu mai sunt susținute (Deşi tehnic încă permis) . Probabil vor fi respinse în următoarea lansare. Dacă utilizați hyphens, treceți la accente acum pentru a evita probleme. Dacă faci schimbarea acum, e la viteza ta. Dacă aştepţi până la următoarea eliberare, vei fi în panică şi va trebui să te ocupi de asta în acea zi.
         
    * NEW: Acum, pentru .htmlTable răspunsurile la date, în cazul în care datele dintr-o celulă de coarde conțin date:imagine/png;baza64, urmată de o imagine de bază64 codificată .png; ERDDAP™ va afișa o pictogramă (astfel încât utilizatorul poate vedea imaginea în cazul în care plutesc peste ea) și butoane pentru a salva textul sau imaginea în clipboard. Mulţumită lui Marco Alba (care au contribuit cu codul) şi Bob Simons (care au modificat-o uşor) .
         
    * NOU: -Nu adăugați nume standard
Dacă includeți \\-doNotAdd StandardNames ca parametru de linie de comandă atunci când executați generați Setări de date Xml, genera Setări de date Xml nu va adăuga standard\\_name la addAttributes pentru orice variabile, altele decât variabilele numite latitudine, longitudine, altitudine, adâncime sau timp (care au evident standard\\_name s) . Acest lucru poate fi util dacă utilizați ieșirea de la generarea Setări de date Xml direct în ERDDAP™ fără editarea ieșirii, deoarece generează Setări de date Xml ghicește adesea standard\\_name nu este corect. (Rețineți că vă recomandăm întotdeauna să editați ieșirea înainte de a o utiliza în ERDDAP .) Folosind acest parametru va avea alte efecte minore legate de deoarece ghicit standard\\_name este adesea utilizat în alte scopuri, de exemplu pentru a crea un nou long\\_name , și pentru a crea setările colorBar . Mulţumită lui Kevin O'Brien.
         
    * NEW: Puteți pune acum&lt;updateMaxEvenimente&gt;10&lt;/updateMaxEvenimente&gt; în datasets.xml   (cu celelalte setări lângă partea de sus) pentru a modifica numărul maxim de modificări de fișier (implicit=10) care va fi procesat de sistemul de actualizareEveryNMillis. Un număr mai mare (100?) poate fi util atunci când este foarte important ca setul de date să fie actualizat întotdeauna. Vezi [updateMaxEvenimente documentaţie](/docs/server-admin/datasets#updatemaxevents) . Mulţumită lui John Maurer.
         
    * NOU: Sprijin suplimentar pentru global " real\\_time = adevărat | fals" atribut String.
Dacă acest lucru este fals (implicit) și dacă setul de date nu utilizează actualizarea EveryNMillis, ERDDAP™ va cache răspunsuri la cererile de tipuri de fișiere în care întregul fișier trebuie creat înainte ERDDAP™ poate incepe sa trimita raspunsul utilizatorului si sa le reutilizeze timp de aproximativ 15 minute (de exemplu, .nc ,.png) .
Dacă acest lucru este setat la adevărat sau dacă setul de date utilizează actualizarea EveryNMillis, ERDDAP™ nu va cache fișierele de răspuns și va reveni întotdeauna fișiere nou create.
Mulţumită lui John Maurer.
         
    * NOU: E-mailurile sunt trimise acum într-un e-mail separatThread. Acest lucru face seturi de date de încărcare și alte acțiuni care generează e-mailuri mai repede, deoarece setări de încărcareData nu trebuie să aștepte pentru e-mail să fie trimis, care uneori durează mult timp. Noul sistem poate trimite mai multe e-mailuri pe sesiune de e-mail, reducând astfel numărul de login-uri server de e-mail și reducând riscul de cei care nu reușesc, deoarece acestea sunt prea frecvente. Există statistici pentru e-mailThread pe status.html și mesaje de diagnosticare în log.txt -- căutați "emailThread." Rețineți că un Tally de nEmailsPerSession=0, indică probleme, adică o sesiune de e-mail nu a fost în măsură să trimită nici un e-mail.
Mulţumită lui Bob Simons.
         
    * MODIFICAT: Emailurile sunt trimise acum cu un cod uşor diferit (din cauza Java 17 și schimbarea în e-mailThread) . Dacă aveți probleme trimiterea de e-mailuri, vă rugăm să e-mail erd.data at noaa.gov .
         
    * NOU: Acţiuni de abonare care "atingeţi" un URL de la distanţă sunt acum manipulate într-un touchThread separat. Acest lucru face ca seturile de date de încărcare și alte acțiuni care ating URL-uri mai repede, deoarece setări de sarcină nu trebuie să aștepte ca atingerea să fie finalizată, care uneori durează mult timp. Există statistici pentru touchThread pe status.html page și mesaje de diagnosticare în log.txt - căutați "touchThread."
Mulţumită lui Bob Simons.
         
    * NEW: Pe pagina status.html, în seria "Maior LoadDatasets Time Series," există o nouă coloană "shed" care indică numărul de cereri care au fost vărsate deoarece curent ERDDAP™ utilizarea memoriei a fost prea mare. Cererile care sunt vărsate vor returna codul de stare HTTP 503 "Servicii disponibile." Aceste cereri nu au fost neapărat o problemă. Tocmai au sosit într-un moment ocupat. Aceasta a fost o parte a unei restructurări a modului în care ERDDAP™ se ocupă cu utilizarea de înaltă memorie.
         
    * NOU: Pe calculatoarele Unix/Linux, există acum o linie "OS Info" pe status.html pagina web cu informații curente ale sistemului de operare, inclusiv sarcina procesorului și utilizarea memoriei.
         
    * Acum, când ERDDAP™ se reia și se reporneşte rapid=adevărat, tabelul EDDFromFiles settings va refolosi subsetul .nc şi distinct .nc . Pentru anumite seturi de date, acest lucru scade foarte mult timpul de încărcare a setului de date (de exemplu, de la 60 de secunde la 0,3s) . Împreună cu noul e-mailThread și sarcinaThread (vezi mai sus) , acest lucru ar trebui să accelereze foarte mult repornirea ERDDAP™ pentru mulţi ERDDAP™ instalații. Mulţumită lui Ben Adams şi John Kerfoot.
         
    * MODIFICAT: Anterior, seturi de date orfane (seturi de date care trăiesc în ERDDAP™ dar nu sunt în datasets.xml ) au fost pur și simplu notate pe statut. html și în log.txt după fiecare sarcină majorăDatasets. Acum, acestea sunt automat eliminate din ERDDAP™ și notat pe status.html și în log.txt, și e-mail la e-mail Totul. Deci, dacă doriți să eliminați un set de date din ERDDAP™ , acum tot ce trebuie să faceți este să eliminați bucata sa de xml în datasets.xml și va fi eliminat în următoarele seturi majore de date. Mulţumită lui Bob Simons.
         
    * BUG CUNOSCUT în netcdf-java v5.2 și v.5.3: ă EDDGrid Din trei mii Opţiune catalog în GenerateDateName Xml folosit pentru a lucra pentru cataloage THREDDS care includ referințe la seturi de date în cataloage THREDD la distanță. Acum nu. Am raportat problema dezvoltatorilor netcdf-java.
         
    * BUG FIX: Pentru utilizatorii Docker setarea parametrilor.xml prin intermediul ERDDAP \\___paramName_: pentru parametrii int și boolean (De exemplu, e-mail SmtpPort) , ERDDAP™ a fost incorect în căutarea pentru doar _paramName_. Acum se pare pentru _ ERDDAP \\_paramName_. Mulţumită lui Alessandro De Donno.
         
    * SCHIMBARE: ERDDAP™ sistemul de testare utilizează acum un sistem automat pentru a verifica dacă imaginile de testare nou create sunt exact cum se aștepta. Mulţumită lui Chris John pentru sugestie şi Bob Simons pentru implementare.
         

## Versiunea 2.18{#version-218} 
 (Eliberat în 2022-02-23) 

*    **Noi caracteristici și schimbări (pentru utilizatori) :** 
    * NONE
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * BUG FIX: .nc Dosarele nu au fost închise în anumite circumstanţe. Acum sunt. Mulţumită lui Marco Alba, Roland Schweitzer, John Maurer şi altora.
         

## Versiunea 2.17{#version-217} 
 (eliberat 2022-02-16) 

*    **Noi caracteristici și schimbări (pentru utilizatori) :** 
    * BUG FIX: După modificări la orderBy sistem în urmă cu câțiva ani, Tabledap's Make A Graph nu a manipulat în mod corespunzător multe întrebări care au folosit orderBy _Xxx_. Acum da. Mulţumită lui Maurice Libes.
         
    * Din episoadele anterioare: ERDDAP™ cererile respinse. transparent Png este atunci când valorile latitudinei și/sau longitudinei au fost parțial sau integral în afara intervalului. ( ERDDAP™ GitHub Issues #19, postat de Rob Fuller -- multumesc pentru postarea lui Rob) Acum returneaza pixeli transparenti pentru orice arie extravaganta a imaginii. Acest lucru este util pentru multe aplicații client. Modificările de cod pentru a face această schimbare au fost făcute în întregime de Chris John. Mulţumesc foarte mult, Chris&#33;
         
    * Din episoadele anterioare: ERDDAP™ cereri respinse privind griddap, în cazul în care valorile indicelui pentru o anumită dimensiune \\[ ridicat: scăzut \\] . Acum face ca aceste cereri să fie valabile prin schimbarea valorilor scăzute și ridicate. Acest lucru rezolvă o problemă de lungă durată pentru utilizatori și pentru programe externe, cum ar fi xtracto, care a trebuit să țină evidența câtorva seturi de date care au valori de latitudine care variază de la mare la mică pentru a face cerere ca \\[  (50) : (20)  \\] astfel încât cererea în spațiu index a fost \\[ joasa:mare \\] . Vezi?https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.htmlAcum, o cerere ca \\[  (20) : (50)  \\] pentru unul dintre aceste seturi de date se interpretează automat ca: \\[  (50) : (20)  \\] .
         
    * MODIFICAT: .esriAscii solicită să declanşeze acum o casetă de dialog "Fişier: Salvaţi As" în browserul utilizatorului. Mulţumită lui Joel Van Noord.
         
    * BUG FIX: Acum, dacă variabila de longitudine a unui set de date pentru copii a unui EDDGrid LonPM180 sau EDDGrid Setul de date Lon0360 are un valid\\_min și/sau valid\\_max atribut, acestea sunt eliminate în EDDGrid LonPM180 sau EDDGrid Set de date Lon0360. Mulţumită lui Roy Mendelssohn.
         
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * DO: Dacă ați fi stabilit&lt;DateProviderFormActive&gt; pentru a falsifica să se ocupe temporar de vulnerabilitatea XSS, vă rugăm să-l setați înapoi la adevărat.
         
    * Security BUG FIX: Fix XSS vulnerabilitate în formularul furnizor de date. Mulţumită lui Genaro Contreras Gutiérrez.
         
    * BUG FIX: Atunci când un AWS S3 dirctor a avut mai mult de 10000 de fișiere, ERDDAP™ a aruncat o " Eroare internă." Acest lucru este acum fix. Mulţumită lui Andy Ziegler.
         
    * BUG FIX: EDDGrid SideBySide nu a permis variabilei sourceName e în seturi de date pentru copii diferite pentru a fi la fel. Acum da. Mulţumită lui Joshua Stanford.
         

## Versiunea 2.16{#version-216} 
 (eliberat 2021-12-17) 

*    **Noi caracteristici și schimbări (pentru utilizatori) :** 
    * MODIFICĂRI/BURG FIXES: Numeroase mici modificări ale sistemului de traducere datorită sugestiilor editorilor specifici limbii. Datorită Melanie Abekassis, Marco Alba, Jessy Barrette, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian şi Mike Smit.
         
    * ADDED o renunțare adecvată și atribuirea pentru Google Translate, conform condițiilor Google Traduce. De asemenea,&lt;html&gt; tag-ul în HTML pentru fiecare pagină web acum identifică în mod corespunzător pagini web non-English ca fiind a fost masina de tradus. Mulţumită lui Mike Smit.
         
    * BUG FIX: Paginile web de autentificare funcționează în mod corespunzător cu diferite setări lingvistice. Mulţumită lui Mike Smit.
         
    * NOU orderBy Filtru de suma. Și nou Verificați toate și Anulați toate butoanele de pe EDDGrid Data Access Form pagina web. Datorită contribuției de cod de Marco Alba.
         
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * DE FACUT: Dacă aveţi
        &lt;ÎntrebareMarkImageFile&gt;ÎntrebareMark.jpg&lt;/questionMarkImageFile&gt;
în fișierul setup.xml, trebuie să fie eliminați întreaga etichetă (recomandat, astfel încât fișierul implicit este utilizat) sau modificați-l la:
        &lt;ÎntrebareMarkImageFile&gt;ÎntrebareMark.png&lt;/questionMarkImageFile&gt;
         
    * Ca să ştii, [Adoptată](https://adoptium.net/?variant=openjdk8) a înlocuit openJDK ca sursă principală/recomandată de Java   (OpenJDK) .
         
    * MODIFICARE: Fișierele jurnal din ERDDAP™ , Generează date Xml, și DasDds sunt acum UTF-8, nu setul de caractere implicite al calculatorului. Am făcut o mulțime de verificare și a făcut câteva modificări pentru a se asigura că ERDDAP™ întotdeauna specifică setul de caractere corespunzătoare atunci când citiți sau scrieți tot felul de fișiere, și nu mai mult (în mai multe cazuri) se bazează pe setul implicit de caractere al calculatorului. Acest lucru a corectat câteva greșeli și sa mutat cât mai aproape de scopul de a utiliza UTF-8 pentru cât mai multe tipuri de fișiere posibil (de exemplu, .log, .xml, .html; .json , .json l, .nc Antet) . Rețineți că multe tipuri de fișiere mai vechi sunt necesare pentru a utiliza ISO-8859-1 (de exemplu, OPeNDAP .das,.dds,.csv, .tsv , .nc 3, .nccsv , .cpt) . Am încercat anterior să lucrez cu grupul CF și cu Unidata pentru a adăuga suport pentru UTF-8 în .nc 3 fișiere; ambele au fost rezistente.
         
    * NEW: La descărcarea fișierelor de pe AWS S3, ERDDAP E cache De la sistemul Url în EDDGrid Din fişiere şi tabel EDD FromFiles folosește acum noul AWS Transfer Manager pentru a descărca fișiere prin bucăți paralele (Deci foarte repede.) . Tinta de trecere este setat la 20 Gbps, pe fisier, asa ca functioneaza bine cu toate tipurile de instanta AWS, dar mai ales cele care au excelenta "Retworking Performance." Cu această schimbare ERDDAP E cache De la sistemul Url oferă acum viteze comparabile cu abordarea Xarray a descărcărilor paralele de fișiere pre-aglomerate, dar fără necesitatea de a converti fișierele sursă de la .nc şi .hdf în fişiere Xarray. De fapt, ERDDAP Sistemul este mai bun dacă există o cerere ulterioară de a citi din același fișier, deoarece ERDDAP™ Acum are o copie locală a dosarului. Comunitatea noastră a petrecut ani de zile standardizare pe .nc şi .hdf Dosare. Acum nu trebuie să aruncăm toate astea doar ca să obţinem performanţe bune când stocăm date în AWS S3. Mulţumită lui Rich Signell.
         
    * Change: searchEngine=Lucene este, deocamdată, depreciat. Este un sistem complex care produce adesea rezultate care sunt ușor diferite de comportamentul mai dorit de căutareEngine=original. Pentru aproape toţi ERDDAP™ Instalaţiile, economiile de timp ale Lucenei nu compensează diferenţele de rezultate. Vă rugăm să utilizați searchEngine=original, dacă este posibil. Dacă asta cauzează probleme, trimite-i un e-mail lui Bob.
         
    * MODIFICĂRI: Motorul de căutare Lucene acum se comportă mai mult ca motorul de căutare original. Nu mai există cazuri în care Lucene crede că un set de date se potriveşte şi original nu. De asemenea, clasamentul lui Lucene este acum egal cu clasamentul original (Deoarece original este acum folosit întotdeauna pentru a calcula clasamentele) .
         
    * BUG FIX: Începând cu o versiune recentă, ERDDAP™ a încetat să mai vadă mai mult decât primele 1000 de obiecte într-o anumită găleată AWS S3. Acum, ERDDAP™ Vede din nou toate obiectele. Mulţumită lui Andy Ziegler.
         
    * BUG FIX: Acum EDDtableAgregare Rândurile elimină actual\\_range atribut ori de câte ori unul sau mai multe seturi de date pentru copii nu își cunosc niciodată variabilele ' actual\\_range   (De exemplu, tabelul EDD din baza de date) . Mulţumită lui Erik Geletti.
         

## versiunea 2.15{#version-215} 
 (eliberat 2021-11-19) 

*    **Noi caracteristici și schimbări (pentru utilizatori) :** 
    *    ERDDAP™ are un sistem nou pentru a permite utilizatorului să specifice limba care urmează să fie utilizat pentru toate paginile web. Dacă ERDDAP™ instalarea este stabilită pentru a o utiliza, lista de limbi va apărea în colţul din dreapta sus al fiecărei pagini web. ERDDAP™ URL-ul este înainte ca această versiune să continue să funcţioneze şi să returneze întotdeauna conţinutul englezesc, ca înainte.
        
Nu toate textele sau toate paginile web au fost traduse. Au existat constrângeri de timp în acest proiect care au împiedicat Qi și Bob să ajungă la 100%.
        
Întrebarea evidentă este: de ce am depus atât de mult efort în acest sens atunci când Chrome va traduce pagini web pe-the-fly? Răspunsul este: în acest fel, obţinem mult mai mult control asupra modului în care se face traducerea. În special, există o mulțime de cuvinte care nu ar trebui traduse pe paginile web, de exemplu, titlurile și rezumatele seturilor de date, numele variabilelor, parametrii, unitățile și organizațiile. O mare parte din efortul de traducere a fost identificarea cuvinte și fraze care nu ar trebui traduse. De asemenea, traducerile maşinii tindeau să manipuleze anumite tipuri de marcaj HTML. Gestionarea traducerii ne-a permis să minimizăm această problemă.
        
Proiectul de traducere a fost realizat de Qi Zeng (o vară Google de cod intern) și Bob Simons folosind serviciul de traducere Google. A fost un proiect uriaş. Mulţumesc. Qi&#33;
        
    * BUG FIX: ERDDAP™ Acum permite ID-ului ORCID să aibă X ca ultima cifră. Mulţumită lui Maurice Libes.
         
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * DE FACUT:
        
        * Trebuie să faci câteva schimbări legate de ERDDAP noul sistem care permite utilizatorilor să specifice limba pentru pagini web.
            * Pe prima linie de setup.xml și datasets.xml fișiere, modificați la: codare="UTF-8" și modificați codarea documentului în editorul de text astfel încât acesta să fie salvat ca un fișier UTF-8. Generează dateName Xml presupune acum că datasets.xml este un fișier UTF-8.
            * Programatori care compilează ERDDAP : Toate ERDDAP™ Fișierele Java ar trebui tratate ca fișiere UTF-8 implicit. S-ar putea să fie nevoie să adăugaţi "-encodarea UTF-8" la linia de comandă Javac. (Da.) 
            * Pentru a activa acest sistem (bine recomandată) , în&lt;StartBodyHtml5&gt; etichetă pe care o specificați în datasets.xml , schimba "&amp&#33;loginInfo;" în "&amp; loginInfo; | &amp; limbă;" astfel încât lista de limbi apare în colțul din dreapta sus al fiecărui ERDDAP™ Pagina web.
            *    ERDDAP™ utilizează numai&lt;StartBodyHtml5&gt; etichetă pe care o specificați în datasets.xml pentru a specifica conținutul HTML pentru bannerul din partea de sus a fiecărui ERDDAP™ pagina web, indiferent de limba pe care o alege utilizatorul. Dacă schimbaţi eticheta în funcţie de utilizare
" &EasierAccessToScientificData; "în loc de "acces mai ușor la date științifice" și
" &BroughtToYouBy; "în loc de "Adus de tine," ERDDAP™ va folosi versiuni traduse ale acestor fraze în banner.
            * În mod similar, noul implicit&lt;ShortDescriptionHtml&gt; in datasets.xml este
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
Ultimele 3 linii de conținut sunt lucruri care vor fi înlocuite cu textul tradus. Dacă converti oricare dintre ele (în special AspectErddap;) sau toate acestea la textul explicit în datasets.xml   (care are prioritate, dacă este prezent) sau mesaje.xml, acest text va apărea indiferent de limba pe care o alege utilizatorul. Acest lucru nu este perfect, dar m-am gândit că puțini administratori ar dori să editeze&lt;TheShortDescriereHtml&gt; în 35 de fișiere diferite pentru a oferi 35 de versiuni diferite traduse ale acestei etichete.
        
          
         
    * MODIFICAT: Unele erori sunt tratate acum ușor diferit și astfel pot fi adăugate la Tally de "Cereri eșuate" privind statutul.html și în Daily Report Email. Deci aceste numere pot fi ceva mai mari decât înainte.
         
    * BUG FIX: Generează date Xml pentru EDDGrid Lon0360 și EDDGrid LonPM180 exclude acum seturi de date sursă cu datasetID =~."\\*\\_LonPM180" și datasetID =~."\\*\\_Lon0360," respectiv.
         

## Versiunea 2.14{#version-214} 
 (eliberat 2021-0072) 

*    **Noi caracteristici și schimbări (pentru utilizatori) :** 
    *    (niciuna)   
         
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * NOU: EDDGrid Lon0360 care face un set de date în grilă cu valori de longitudine &gt; 0,0 și&lt;=360 dintr-un set de date cu valori de longitudine &gt; =-180 și&lt;=180. Vezi [ EDDGrid Documentație Lon0360](/docs/server-admin/datasets#eddgridlon0360) . Mulţumită lui Dale Robinson.
         
    * NOU: ERDDAP™ administratorii pot trece acum orice valoare în setup.xml prin intermediul unei variabile de mediu numit ERDDAP \\__valueName_ înainte de rulare ERDDAP . De exemplu, utilizarea ERDDAP \\_baseUrl suprascrie&lt;valoare bazăUrl&gt;. Acest lucru poate fi util atunci când se desfășoară ERDDAP™ cu un container, după cum puteți pune setările standard în setup.xml și apoi furniza setări speciale prin variabile de mediu. Dacă furnizați informații secrete ERDDAP™ prin această metodă, asiguraţi-vă că informaţiile vor rămâne secrete. ERDDAP™ citeste doar variabilele de mediu o data pe pornire, in prima secunda de pornire, deci o modalitate de a utiliza acest lucru este: setati variabilele de mediu, incepe ERDDAP™ , așteptați până ERDDAP™ este pornit, apoi se destabilizează variabilele de mediu. Mulţumită lui Marc Portier.
         
    * Acum, în cazul în care unele fișiere într-un EDDtableFrom... Setul de fișiere cu o mulțime de fișiere au unele valori foarte lungi String, setul de date va încărca mult mai repede și va răspunde la cereri mult mai repede. Anterior, ERDDAP™ ar aloca o mulțime de spațiu pentru valorile min și max String în fișierele care sunt stocate cu informații de fișier pentru astfel de seturi de date. Dosarul rezultat a fost imens, ceea ce a făcut să fie scris și citit încet. Mulţumită OBIS.
         
    * Acum, ERDDAP™ face o treabă mai bună de interpretare a secvențelor de caractere neobișnuite și invalide în fișierele CSV. Mulţumită OBIS.
         
    * FIX: După un an de probleme cu Cassandra, am instalat în cele din urmă cu succes Cassandra (v2) Din nou și așa a fost capabil de a relua testele cu Cassandra v2. Acum pot spune cu mai multă încredere că ERDDAP™ lucrează cu Cassandra v2 și v3. Mulţumită lui ONC.
         

## Versiunea 2.12{#version-212} 
 (eliberat 2021-05-14) 

*    **Noi caracteristici și schimbări (pentru utilizatori) :** 
    * BUG FIX: Dacă eşti pe lista neagră de abonamente, nu poţi cere o listă cu abonamentele tale.
         
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * DE făcut: NOU: sistem de limitare automată a capacității utilizatorilor rău intenționati și a utilizatorilor legitimi excesiv de agresivi de a face un număr mare de cereri simultane care ar degrada performanța sistemului pentru alți utilizatori. Există 3 noi etichete opționale în datasets.xml pe care le puteți/ar trebui să adăugați imediat după&lt;graficColor fundal&gt; :
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

Pentru informații suplimentare, a se vedea [ipAddressMaxRequests](/docs/server-admin/datasets#ipaddressmaxrequests) . ERDDAP™ de asemenea, acum printează "Numărul de utilizatori unici (de la pornire) " pe pagina status.html.
Mulţumită persoanei din China care m-a atacat ERDDAP™ instalare.
         
    * SCHIMBARE la comportamentul șoferului Postgresql: Când am actualizat driver-ul Postgresql, numele coloanelor din lista de tabele generată de Postgresql și GenerateDatesetsXml s-au întors toate Uppercase, în loc de toate cazurile mici, ca înainte. Nu ştiu dacă asta va afecta alte lucruri, deoarece bazele de date consideră adesea că aceste nume sunt insensibile. Setul meu de testare încă funcţionează corect. Dar dacă setul tău de date nu mai lucrează cu asta ERDDAP™ Actualizare, aceasta este cauza posibilă pentru a urmări mai întâi.
         
    * BUG FIX: ERDDAP™ acum se ocupă, de asemenea, fişiere private AWS S3 corect. Au existat și alte îmbunătățiri legate de manipularea fișierelor AWS S3. Mulţumită lui Michael Gangl şi Dylan Pugh.
         
    * NOU: EDDGrid De laNcFiles și EDDGrid DinNcFiles Despachetat poate citi acum date din "structuri" în .nc 4 și .hdf 4 dosare. Pentru a identifica o variabilă dintr-o structură,&lt; sourceName &gt; trebuie să utilizeze formatul: _fullStructureName_ | _membru Nume_, de exemplu grup1/mystruct | Membrul meu. Mulţumită NRL.
         
    * MODIFICAT: Acum, în cazul în care utilizarea memoriei curente plus această cerere este chiar ușor de mare, seturi de griddap NThreads pentru această cerere la 1. Astfel, ERDDAP™ Păstrează memoria atunci când memoria este limitată. Mulţumită persoanei din China care m-a atacat ERDDAP™ instalare.
         
    * NOU sistem de monitorizare a numărului de fișiere deschise (care include prize și alte lucruri, nu doar fișiere) în Tomcat pe computere Linux. În cazul în care unele fișiere nu se închide din greșeală, numărul de fișiere deschise poate crește până când depășește maximul permis și numeroase lucruri foarte rele se întâmplă. Deci, acum, pe calculatoare Linux (informațiile nu sunt disponibile pentru Windows) :
        
        * Există o nouă coloană "Deschide fișiere" pe partea dreaptă a statutului.html pagina web care arată procentul de fișiere max deschise. Pe Windows, arată doar "?"
        * Când ERDDAP™ generează aceste informații la sfârșitul fiecărei reîncărcări majore a setului de date, va imprima în jurnal. fișier txt:
openFileCount=_curent_ de max=_max_%=_0%_
        * Dacă procentul este &gt; 50%, se trimite un e-mail la ERDDAP™ administrator și e-mail Totul Pentru adrese de e-mail.
        
Pentru a afla mai multe, sau dacă vedeți această problemă pe dvs. ERDDAP™ , vezi [Prea multe fișiere deschise](/docs/server-admin/additional-information#too-many-open-files) .
Mulţumită persoanei din China care m-a atacat ERDDAP™ instalare.
         
    * NEW: Am adăugat o mulțime de verificare și manipulare a "Prea multe fișiere deschise," astfel încât sarcina doar se oprește și utilizatorul vede mesajul de eroare. Fișierele de date nu vor mai fi marcate la fel de rău dacă citirea lor duce la o eroare "Prea multe fișiere deschise."
         
    * NOU \\[ Big ParentDirectory \\] /BadFilesFlag director:
Dacă ați pus un fișier în acest director cu un datasetID ca nume de fișier (conținutul fișierului nu contează) , ERDDAP™ va șterge fișierele rele .nc fișier pentru acel set de date (dacă este cazul) și reîncărcați setul de date cât mai curând posibil. Acest lucru cauzează ERDDAP™ pentru a încerca din nou să lucreze cu fișierele anterioare (În mod eronat?) Marcat la fel de rău. Mulţumită lui Marco Alba.
         
    * MODIFICAT: La pornire, dacă o EDDGrid Din... Dosare sau EDD Table From... Setul de fișiere are inițial 0 fișiere în lista sa de fișiere cunoscute valabile (De exemplu, este un set de date nou) , atunci ERDDAP™ amână încărcarea acestuia și stabilește un steag astfel încât acesta să fie încărcat cât mai curând posibil după ce se termină seturile majore de date. Acest lucru accelerează pornirea inițială atunci când există seturi de date noi.
         
    * MODIFICAT: FileVisitorDNLS.testAWSS3 () și FileVisitorSubdir.testAWSS3 () ; acum utilizați AWS v2 (nu v1) SDK. Deci acum Git ERDDAP™ distribuția include acum toate fișierele necesare și nu mai este nevoie să adăugați manual masiv v1 AWS borcan SDK fișier.
         
    * MODIFICAT: Am trecut la utilizarea Maven pentru a detecta / aduna dependențe (fișierele .jar în /lib) . Modificarea la v2 a AWS SDK a necesitat acest lucru. Acesta va fi necesar pentru alte coduri importate în viitor. Un imens datorită Kyle Wilcox care a furnizat pom.xml el a creat și folosește, care a rezolvat mai multe probleme pentru mine.
         
    * MODIFICAT: Parametrul de clasă (-Cp) folosit în GenerateDateXml, DasDds și alte programe mici care vin cu ERDDAP™ , și în sfatul programatorilor este acum mult mai simplu și nu ar trebui să se schimbe din nou, deoarece se referă la directorul, nu fișierele individuale:
\\-cp classs;C:\\programs\\\_tomcat\\lib\\servlet-api.jar;lib\\\*
         (fie ":" în loc de ";";" pentru Linux și Macs) .
         (Trebuia să fac asta cu ani în urmă când a devenit o opţiune.)   
         
    * NOU: Generează date Xml are o nouă opțiune de utilitate: găseșteDuplicateTime care va căuta printr-o colecție de rețele .nc   (și legate) fișiere pentru a găsi fișiere cu valori duplicate ale timpului. Vezi? [gindesteDuplicat Timp](/docs/server-admin/datasets#findduplicatetime)   
         
    * NOU: datasets.xml poate include acum&lt;eticheta palettes &gt; care suprascrie&lt;palettes &gt; tag-ul valorii de mesaje.xml (sau revine la valoarea mesajelor.xml dacă este gol) . Acest lucru vă permite să modificați lista de palete disponibile în timp ce ERDDAP™ Fuge. De asemenea, dacă aveți un subdosar Cptfiles în ERDDAP™ directorul de conținut; ERDDAP™ va copia toate fișierele \\*.cpt în acel director în \\[ Tomcat \\] /webapps/erddap/WEB-INF/cptfiles directore de fiecare dată ERDDAP™ Începe. Împreună, aceste modificări vă permit să adăugați palete și au modificările persistă atunci când instalați o nouă versiune a ERDDAP . Vezi [documentație paleți](/docs/server-admin/datasets#palettes)   
Mulţumită lui Jennifer Sevadjian, Melanie Abecassis şi poate altor oameni de pe CoastWatch.
         
    * MODIFICAT: [&lt;lentTroubleMillis&gt;] (/docs/server-admin/sets#slowdowntroublemillis) este acum folosit pentru toate cererile eșuate, nu doar câteva tipuri.
         
    * MODIFICAT: Firul RunLoadDatasete întrerupe acum firul de date de sarcină la 3/4 Setări de date de sarcină MaxMinutes astfel încât există mai mult timp pentru LoadDatasets pentru a observa întreruperea și ieșirea grațios. De asemenea, există mesaje de diagnosticare mai multe și mai bune pentru acest lucru.
         
    * SCHIMBAT de la vechea versiune a Lucenei la v8.7.0.
         
    * SCHIMBARE: E-mail-uri trimise de ERDDAP™ Acum apar cu un font de lățime fixă.
         
    * SCHIMBARE: EDDGrid FromFiles primește acum valori ale axei, precum și atribute de la PRIMUL | Ultimul fișier, astfel cum se specifică în&lt;Metadate From&gt;. Mulţumesc. (nu) la Ken Casey, et al.
         
    * Suport ADDED pentru unitățile invalide "grad\\_Nord" și "grad\\_Est" care sunt utilizate în mod eronat de fișierele recente (din 2020-10-01) în versiunea AVHRR Pathfinder 5.3 L3-collat (L3C) Seturi de date SST (ceniPH53 sst d1zi și ceniPH53 sst n1 zi) . ERDDAP™ le poate standardiza acum la unități valabile. Mulţumesc. (nu) la Ken Casey, et al.
         

## Versiunea 2.11{#version-211} 
 (lansat în 2020-12-04) 

*    **Noi caracteristici și schimbări (pentru utilizatori) :** 
    * BUG FIX: OrderByMean a aruncat un NullPointerException în cazul în care o variabilă a avut doar una din \\_FillValue sau lipsă\\_ Valoare definită. Acum se ocupă corect de situaţie. Mulţumită lui Marco Alba.
         
    * BUG FIX: Au existat probleme cu fișierele de text ODV create de ERDDAP™ în v2.10. Aceste probleme sunt rezolvate. Mulţumită lui Shaun Bell.
         
    * BUG FIX: Doar în ERDDAP™ v2.10: În cazul în care limitele lat lon au fost specificate în URL, caseta de legare nu a fost desenat pe harta lumii. Acum este din nou. Mulţumită lui John Maurer.
         
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * BUG FIX: Doar în ERDDAP™ v2.10: Fișierele script pentru ArchiveADataset, GenerateDatesets Xml și DasDds nu au de lucru pentru că nu au avut modificările la clasapath care au fost adăugate cu ERDDAP™ Acum au. Mulţumită lui Marco Alba.
         
    * NOU: În datasets.xml , puteți avea acum eticheta:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

În prezent, dacă este adevărat (sau dacă eticheta este goală, sau dacă eticheta nu este în fișier) , atunci când cererea unui utilizator duce la o NullPointerException, ERDDAP™ va e-mail stiva urme la erd.data at noaa.gov   (nu ERDDAP™ echipa de dezvoltare) . Acest lucru ar trebui să fie sigur și sigur, deoarece nu există informații confidențiale (De exemplu, cerereaUrl) este inclus în e-mail. Acest lucru ar trebui să facă posibil pentru a prinde orice gândaci obscure, total neașteptate care duc la NullPointerExcepții. În caz contrar, utilizatorul vede excepțiile, dar ERDDAP™ Dezvoltatorii nu ştiu, aşa că nu ştim dacă există o problemă care trebuie rezolvată.
        
Este posibil ca acest tag va duce la alte, informații similare de diagnostic fiind trimis prin e-mail erd.data at noaa.gov în viitor. Conținutul e-mailului va fi întotdeauna minim și legat de bug-uri, și nu, de exemplu, informații de utilizare. Mulţumită lui Marco Alba.
         
        
    * MODIFICAT: Acum, tipuri comune de fișiere comprimate ( .bz2 , .gz , .gzip , .tar , .tgz , .z , .zip ) sunt, de asemenea, interzise pentru cererile de gamă octet. Acest lucru este specificat prin&lt;ExtensiiNoRangeRequests&gt; in message.xml.
         
    * PROBLEMA CUNOSCUTA: Ca şi cu ERDDAP™ 2.10 .nc Fișiere ml care încearcă să schimbe un atribut, nu schimba atributul. Acesta este un virus cunoscut în netcdf-java pe care l-am raportat şi se spune că va fi fixat în următoarea versiune a netcdf-java.
         

## Versiunea 2.10{#version-210} 
 (a lansat 2020-11-05) 

*    **Noi caracteristici și schimbări (pentru utilizatori) :** 
    * NOU: Noul [Interpolat](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html) convertorul interpolează eficient valorile unui set de date în rețea. Prin urmare, este deosebit de util pentru cercetătorii care lucrează cu datele de pe urmele animalelor. Acest convertor ia într-o masă cu latitudine, longitudine și coloane de timp (și poate alte coloane) și returnează un tabel cu coloane suplimentare cu valori interpolate. Astfel, acest lucru este similar cu popularul [Xtractomatică](https://coastwatch.pfeg.noaa.gov/xtracto) script creat inițial de Dave Foley, dar oferă avantajul de procesare de până la 100 de puncte pe cerere. Mulţumită lui Dave Foley şi Jordan Watson ( NMFS ) .
         
    * IMPROVED: Căutare avansată este acum strict pentru cererile non-.html. Acesta va arunca acum excepții pentru cererile care au erori permanente (De exemplu, cereri în cazul cărora minLat &gt; maxLat) sau erori temporare (de exemplu, cereri pentru o standard\\_name care nu există) . Pentru cererile .html, Căutarea avansată este neschimbată: la fel ca în căutările Google, face cele mai bune și în tăcere remediază sau ignoră erorile. Mulţumită lui Rich Signell.
         
    * Harta de pe pagina de căutare avansată este acum mai mare (tot trebuie să te uiţi, dar mai puţin) și semnificativ mai precis (dar încă nu perfect) . Mulţumită lui John Maurer.
         
    * IMPROVED: Setarea "Masca de teren Draw" pe Make A Graf pagini web și pamântul &.... setarea în URL-uri care solicită o hartă acceptă acum încă două opțiuni:
"Outline" atrage doar conturul mască de teren, granițe politice, lacuri și râuri.
"Off" nu atrage nimic.
Vezi [&. teren=... documentație](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) .
Mulţumită lui John Maurer.
         
    * IMPROVED: Grafice și hărți create de ERDDAP™ poate folosi acum trei tipuri noi de marcaje: Piaţa plină fără margini, Cercul plin fără margini, Triunghiul plin fără margini. Codul pentru aceasta a fost contribuit de Marco Alba de ETT / EMODnet Fizică. Mulţumită lui Marco Alba.
         
    * NOU: "files" sistemul suportă acum simplu Răspunsuri la tipul de fișier (.csv, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv , sau .xhtml .) , de exemplu, [https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv) .
Mulţumită lui Kyle Wilcox.
         
    * IMPROVED: URL-urile generate atunci când un utilizator utilizează un formular de acces la date (.html) sau un Make-A-Graph (.graph) pagina web acum corect-codează personajele \\[ şi \\] . Acest lucru face URL-urile un pic mai greu pentru oameni să citească, dar este mai bine din punct de vedere al securității web. Administratorii au acum opțiunea de a stabili relaxat QueryChars = ' \\[  \\]  | ' în serverul Tomcat.xml (mai puțin sigure) sau nu (mai sigur) .
Mulţumită lui Antoine Queric, Dominic Fuller-Rowell şi altora.
         
    * NOU: Dacă o cerere adresată unui set de date ale tabelului EDD include &add Variabile Unde (_atribut Nume, atribut Valoare_) , ERDDAP™ va adăuga toate variabilele care au _attribute Nume=attribut Valoarea_ la lista variabilelor solicitate.
Vezi [& Add Variabile În cazul în care documentația](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere) . Mulţumită lui Aurelie Briand, et al.
         
    * MODIFICAT: ERDDAP™ acum refuză cererile de interval de octeți la /files/ .nc sau .hdf Dosare. Nu încercați să vă conectați la distanță .nc sau .hdf dosare ca şi cum ar fi dosare locale. Este oribil ineficient și cauzează adesea alte probleme. În schimb:
        * Utilizare(OPeN)DAPsoftware client pentru a se conecta la ERDDAP 's DAP servicii pentru acest set de date (care au /griddap / sau / tabledap / în URL) . Asta e ceea ce DAP Este pentru.
        * Utilizați formularul de acces la date al setului de date pentru a solicita un subset de date.
        * Dacă aveți nevoie de întregul fișier sau de acces repetat pe o perioadă lungă de timp, utilizați curl , wget , sau browser-ul pentru a descărca întregul fișier, apoi accesați datele din copia locală a fișierului.
             
    * Improved: .odv Opțiunea de ieșire Txt a fost rescrisă pentru a sprijini noua versiune a ODV .txt fișiere și pentru a sprijini reprezentarea corespunzătoare a traiectoriei, timeseries, și date de profil.
         
    * Termenii de căutare în ghilimele duble sunt interpretați ca un șir Json, astfel încât să poată avea caractere codificate. Printre altele, acest lucru vă permite să căutați o potrivire exactă pentru un atribut, de exemplu, "instituție = NOAA  \\n "nu va potrivi un set de date cu instituția= NOAA   NMFS . Mulţumită lui Dan Nowacki.
         
    * IMPROVAT: În locuri suplimentare, numerele punctelor plutitoare (în special float-uri transformate în duble) Acum apar ca o versiune ușor mai rotunjită a numărului în locuri suplimentare, de exemplu, un float prezentat anterior ca dublu ca 32.27998779296875, ar putea apărea acum ca 32.28. Mulţumită lui Kyle Wilcox.
         
    * BUG FIX: fișierele audio nesemnate au fost citite ușor incorect. Acum sunt citite corect.
         
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * ATENŢIE: Prima dată când fugi ERDDAP™ v2.10, unele seturi de date bazate pe fișiere de date locale vor încărca **foarte** încet, deoarece ERDDAP™ trebuie să își recreeze baza de date a informațiilor din fișiere. După reîncărcarea inițială lentă, se vor încărca rapid, ca înainte. Te rog să ai răbdare.
         
    * Lucruri pe care trebuie să le faci:
        * Când rulați pentru prima dată v2.10, unele seturi de date nu pot încărca deoarece ERDDAP™ este acum mai strict despre unele metadate. Ca înainte, ERDDAP™ vă va trimite un raport zilnic atunci când se încarcă primul. Aceasta va include mesajele de eroare pentru fiecare set de date care nu au încărcat. Citiți mesajele de eroare pentru a rezolva problemele. În majoritatea cazurilor, trebuie doar să facă o mică schimbare a metadatelor setului de date pentru a rezolva problema.
             
        * În datasets.xml , caută&lt; sourceName &gt; (notaţi '=' semn, care identifică o [valoare fixă sourceName ](/docs/server-admin/datasets#fixed-value-sourcenames) ) . Pentru majoritatea ERDDAP™ Setup-uri, acestea sunt rare. Dacă oricare dintre valori după '=' sunt corzi (nu numere) Acum trebuie să închizi şirul în două citate. De exemplu,
Înainte:&lt; sourceName &gt; = KZ401&lt;/ sourceName &gt;
După:&lt; sourceName &gt;="KZ401"&lt;/ sourceName &gt;
             
        * NOU: Există o nouă setare opţională în setup.xml,&lt;implicitAccesibilViaFiles&gt;, care stabilește implicit&lt;accessableViaFiles&gt; pentru fiecare set de date. Implicit pentru acest nou tag este fals, care imită precedent ERDDAP™ comportament. Acest nivel inferior poate fi respins de un set de date dat&lt;setare accesibilViaFiles&gt;.
            
RECOMANDAT (Pentru că există utilizatori care doresc acest lucru) :
Dacă vrei să faci toate EDD... Seturi de fișiere accesibile prin sistemul de fișiere, apoi
            
            1. Adaugă această etichetă la fișierul setup.xml:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Opțional) Elimină toate
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
în datasets.xml Deoarece implicit este acum adevărat.
                 
        * Adaugă Atribute \\_FillValue:
             ERDDAP™ folosit pentru a avea un implicit \\_FillValue pentru toate variabilele întregi: valoarea maximă a tipului de date (de exemplu, 127 pentru variabilele octet) . Acum nu. Pentru a evita ca aceste valori să fie prezentate ca valori ale datelor (valori care nu lipsesc) , aveți nevoie pentru a preciza în mod explicit aceste prin \\_FillValue atribute. De acum înainte, de fiecare dată când începi ERDDAP™ , acesta va trimite administratorului un e-mail cu un tabel .csv cu o listă de variabile sursă întreg care nu au \\_FillValue sau missing\\_value atribute și noile atribute \\_FillValue propuse. Vezi? [Adaugă \\_Fill Atribute valorice](/docs/server-admin/datasets#add-_fillvalue-attributes) pentru mai multe informații și instrucțiuni.
             
        * Dacă compilați ERDDAP™ , aveți nevoie pentru a modifica parametrul clasapat pe liniile de comandă javac pentru a adăuga o referință la aceste noi borcan: lib/commons-jexl.jar;lib/aws-java-sdk.jar;lib/jackson-annotații.jar;lib/jackson-core.jar;lib/jackson-databind.jar .
             
    * SCHIMBAT: Tomcat 9 este acum versiunea recomandată de Tomcat pentru ERDDAP . Cea mai recentă versiune a Tomcat 8.5+ este, de asemenea, bine pentru moment. Am făcut curat. ERDDAP 's [Instrucțiuni de instalare Tomcat](/docs/server-admin/deploy-install#tomcat) .
        
Ultima versiune a Java 8 (nu Java 9, 10, 11, ...) din [Adoptă Deschide JDK](https://adoptopenjdk.net/) rămâne versiunea recomandată a Java pentru ERDDAP . Java 8 are suport pe termen lung de la AdoptăOpenJDK astfel încât rămâne sigur de utilizat, dar amintiți-vă pentru a obține cea mai recentă versiune a acestuia periodic din motive de securitate.
        
    * NOU: Script SourceNames / Derived Variables in Tabular Datasets
Tabel EDDFromFiles, EDDtableFromDatabase, și EDDTableFromFileNames settings pot include acum expresii și scripturi în sourceName . Acest lucru vă permite să creați noi variabile bazate pe variabilele existente în fișierele sursă. Calculul pentru o variabilă nouă dată se face într-un rând de rezultate, în mod repetat pentru toate rândurile. De exemplu, pentru a face o longitudine variabilă cu valori în intervalul -180 - 180° de la o variabilă cu valori în intervalul 0 - 360°:
        &lt; sourceName &gt;=Materie2.anglePM180 (rând.coloanăDublu ("Lon") ) &lt;/ sourceName &gt;
Pentru detalii, a se vedea [Nume sursă script](/docs/server-admin/datasets#script-sourcenamesderived-variables)   
Mulţumită lui Bob Simons (care au plănuit asta înainte ERDDAP™ v1.0 și în cele din urmă a găsit o modalitate de a implementa) , Kevin O'Brien, Roland Schweitzer, John Maurer, și biblioteca Apache JEXL pentru a face partea foarte greu (si o fac bine) .
         
    * NOU: Tipuri de date întregi nesemnate (ubyte, ushort, uint, ulong) sunt acum susţinute. Rețineți că multe tipuri de fișiere (de exemplu, .das, .dds, .nc 3) nu susţin toate aceste noi tipuri de date. Vezi [Date Documentație de tip](/docs/server-admin/datasets#data-types) pentru detalii despre cum ERDDAP™ se ocupă de aceste diferențe. În mod special, deoarece(OPeN)DAP, în special raspunsul .dds, nu suporta semnat octeti, longs, sau ulongs, s-ar putea dori să utilizați ERDDAP Reprezentarea tabulară a lui .das și .das așa cum se vede în http .../erddap/ **info** /_ datasetID _.html pagina web (de exemplu, [https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html)  ) care puteți obține, de asemenea, în alte tipuri de fișiere sau .nccsv Răspunsul la metadate (de exemplu, [https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)  ) , ambele dintre acestea sprijină toate tipurile de date în toate situațiile.
        
ATENŢIONARE: Pentru seturile de date care sunt afectate de această modificare, este posibil să vedeţi probleme cu setul de date deoarece datele care ERDDAP™ citeste din sursa poate fi diferit (De exemplu, variabilele citite anterior ca numere întregi semnate pot fi acum citite ca numere întregi nesemnate) . Printre problemele care rezultă se numără: noile fișiere care nu sunt adăugate la setul de date și/sau erori atunci când încercați să accesați datele. În cazul în care un set de date are probleme, primul lucru pentru a încerca este să [set un greu Steag](/docs/server-admin/additional-information#hard-flag) pentru setul de date. Dacă asta nu rezolvă problema, atunci trebuie să te uiţi la jurnal. txt pentru a vedea mesajele de eroare, îngropa în datasets.xml pentru setul de date și/sau poate rerula generaDatasets.xml pentru setul de date.
Datorită netcdf-java 5.x (care a forțat problema) şi viitoarea FC 1.9.
        
    * Există acum [documentație/advice mai bună](/docs/server-admin/datasets#s3-buckets) pentru a crea un set de date din fișierele din găleți AWS S3. Mulţumită lui Micah Wengren.
         
    * MODIFICĂRI: Există mai multe modificări legate de "files" sistem.
        * Codul a fost rescris pentru a fi folosit de mai multe clase.
             
        * NEW: Solicitările utilizatorilor pentru listarea dosarelor pot solicita acum ca răspunsul să fie unul dintre tipurile standard de tabel simplu prin adăugarea extensiei de fișiere dorite: .csv, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv , sau .xhtml ). De exemplu,
             [https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)   
Mulţumită lui Kyle Wilcox şi Shane St Savage.
             
        * Acum, Generează Setări de date Xml nu va include un&lt;eticheta ViaFiles &gt; accesibilă la ieșire. Se presupune că setul de date se va baza pe valoarea noului&lt;implicitAccesibilViaFiles&gt; etichetă în setup.xml. Vezi? [accesibil ViaFiles](/docs/server-admin/datasets#accessibleviafiles) .
             
        * IMPROVED: Tipuri suplimentare de seturi de date sunt acum accesibile ViaFiles: EDDGrid SideBySide, EDDGrid Agregat ExistingDimension, EDDGrid De la Erddap, EDD Table FromErddap, EDDGrid Tabelul DE LA EDDD EDDGrid , și EDDGrid De la Etopo. Pentru acestea, fișierele dintr-un set de date la distanță/copil dat vor fi accesibile numai dacă atât setul părintelui, cât și cel de la distanță/copilului sunt accesibile ViaFiles set to true (probabil via&lt;implicitAccesibilViaFiles&gt;). Mulţumită lui Damian Smyth şi Rob Fuller.
             
        * DO / RECOMANDARE: Vă recomandăm să faceți accesibile toate seturile de date relevante prin intermediul sistemului de fișiere prin setare&lt;implicitAccessibleViaFiles&gt; adevarat in setup.xml deoarece exista un grup de utilizatori pentru care acesta este modul preferat de a obtine datele. Printre alte motive, "files" sistemul face ușor pentru utilizatori să vadă ce fișiere sunt disponibile și când au schimbat ultima dată, făcând astfel ușor pentru un utilizator să își mențină propria copie a întregului set de date. Dacă în general nu doriți să faceți seturile de date accesibile prin intermediul sistemului de fișiere, setați&lt;implicitAccesibilViaFiles&gt; la fals. În ambele cazuri, folosiţi&lt;accessViaFiles&gt; pentru puținele seturi de date care sunt excepții de la politica generală stabilită de&lt;implicitAccesibilViaFiles&gt; (de exemplu, atunci când setul de date utilizează .nc fișiere ml, care nu sunt foarte utile utilizatorilor) .
             
    * IMPROVED: Acum, în cazul în care un set de date sursă are grilă CF\\_mapping informații, genera Setări de date Xml pentru seturi de date în rețea va adăuga informațiile la nivel global&lt;addAtt&gt;, iar informațiile vor fi adăugate la nivel global&lt;sursăAtt&gt; de fiecare dată datele sunt citite din fișier. Informațiile vor apărea în atributele globale ale setului de date ca un set de atribute cu grila prefix\\_mapping\\_ .
         
    * IMPROVAT: Suport pentru grupuri la citire .nc 4 (şi într- o anumită măsură în .hdf 5) Dosare. În general, ERDDAP™ Setul de date va fi construit din variabilele din unul dintre grupurile fișierului. De asemenea, Generează date Xml pentru EDDGrid De laNcFiles și EDDGrid DinNcFiles Despachetat cere acum un "grup" (de exemplu, "" pentru toate grupurile, "unele grupuri," "unele grupuri/unele grupuri" sau " \\[ rădăcină \\] " pentru doar grupul rădăcină) . Mulţumită lui Charles Carleton şi Jessica Hausman.
         
    * IMPROVED: Generează date Xml pentru EDDGrid De laNcFiles și EDDGrid DinNcFiles Despachetat suport acum un parametru opțional "DimensionsCSV," care vă permite să specificați numele sursă ale dimensiunilor pe care doriți ca acest set de date să le utilizeze. Utilizați "" pentru a obține variabilele care folosesc cele mai multe dimensiuni, ca înainte. De asemenea, un mic bug legat care a avut loc cu acest tip de fișier este acum fix. Mulţumită lui Sujal Manandhar.
         
    * BUG FIX: Generează date Xml listează acum în mod corespunzător "EDDtable From JsonlCSVFiles" (nu "EDD TABLE From JsonlCSV") ca una dintre opțiunile EDDType. Mulţumită lui Andy Ziegler.
         
    * Improvizat: EDDGrid DinNcFiles Despachetat standardizează acum atributele "unităţilor" către unităţile ud standard/canonice (aceeași metodă ca convertorul de unități) . De exemplu, "meter per second" , "meters/second" , "m.s^-1" , și "m s-1" toate devin "m s-1" . Mulţumită lui Andy Ziegler.
        
ATENŢIONARE: Este posibil ca acest lucru să creeze probleme pentru unele seturi de date existente (de exemplu, pentru a determina ca noile fișiere să fie etichetate "rău") . Dacă da, [set un greu Steag](/docs/server-admin/additional-information#hard-flag) pentru setul de date astfel încât toate fișierele sursă să fie recitite cu noul sistem.
        
    * Acum, o variabilă&lt; sourceName &gt; pot specifica o valoare fixă a =NaN și variabila poate avea o actual\\_range atribut care specifică o gamă finită. Acest lucru este uneori util, astfel încât un set de date (în special un set de date EDDFromNames) poate avea variabila manechin (s)   (De exemplu, latitudine, longitudine, timp) cu valori fixe de NaN, dar cu o valoare valabilă actual\\_range   (așa cum este stabilit de atribut) . Apoi, în Advanced Search un utilizator poate căuta seturi de date care au date într-o anumită latitudine, longitudine, interval de timp și acest set de date va putea spune că are date relevante (deși toate rândurile reale de date vor arăta NaN) . Vezi [documentația privind valoarea fixă](/docs/server-admin/datasets#fixed-value-sourcenames) .
Mulţumită lui Mathew Biddle.
         
    * NOU: datasets.xml bucată pentru un tabel EDDFromAsciiFiles sau EDDTableFromColumnarAsciiFiles Set de date poate include o etichetă care spune ERDDAP™ să ignore toate liniile din partea de sus a fișierului până la și inclusiv linia care se potrivește expresiei regulate specificate. De exemplu,
        &lt;SkipHeaderToRegex&gt;\\\\*\\\\*\\\\*Capăt de cap.\\*&lt;/skipHeaderToRegex&gt;
va ignora toate liniile până la și inclusiv o linie care începe cu "\\*\\*\\* SFÂRŞIT DE CAP. Vezi&lt;Comment (/docs/server-admin/datesets#skipheadertoregex) .
Mulţumită lui Eli Hunter
         
    * NOU: datasets.xml bucată pentru un tabel EDDFromAsciiFiles sau EDDtableFromColumnarAsciiFilesdataset poate include o etichetă care spune ERDDAP™ să ignore toate liniile din fișier care corespund expresiei regulate specificate. De exemplu,
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

va sări peste toate liniile care încep cu "#." Vezi&lt;sarLinesRegex&gt; documentation] (/docs/server-admin/datesets#skiplinesregex) .
Mulţumită lui Eli Hunter.
         
    * NOU: datasets.xml bucată pentru orice set de date EDD Tabel poate include acum &add Variabile Unde (_attributeNamesCSV_) . Dacă o face, ERDDAP™ va adăuga un widget pentru fiecare atribut specificat Nume ale formularului de acces la date al setului de date (Pagina web .html) pentru a facilita adăugarea &add pentru utilizatori Variabile Unde (_atribut Nume, atribut Valoare_) la cerere.
Vezi [& Add Variabile În cazul în care documentația](/docs/server-admin/datasets#addvariableswhere) .
Mulţumită lui Aurelie Briand, et al.
         
    * NOU Instrumentul pentru partea a treia: ERDDAP - Lint.
         ERDDAP -Lint este un program de la Rob Fuller și Adam Leadbetter al Institutului Irish Marine pe care îl puteți folosi pentru a îmbunătăți metadatele de dvs. ERDDAP™ Seturi de date. ERDDAP -Lint "conţine reguli şi o aplicaţie web statică simplă pentru efectuarea unor teste de verificare împotriva dumneavoastră ERDDAP™ server. Toate testele sunt efectuate în browserul web." Ca [Unix/Linux scame instrument](https://en.wikipedia.org/wiki/Lint_(software) ), puteți edita normele existente sau adăuga noi reguli. Vezi? [ ERDDAP - Lint.](https://github.com/IrishMarineInstitute/erddap-lint) pentru mai multe informații.
        
Acest instrument este deosebit de util pentru seturile de date pe care le-ați creat cu ceva timp în urmă și acum doriți să aduceți la zi preferințele dumneavoastră actuale de metadate. De exemplu, versiunile timpurii ale Seturilor de Date Generate Xml nu a depus niciun efort în crearea globală creator\\_name , creator\\_email , creator\\_type; sau creator\\_url metadate. Ai putea folosi ERDDAP -intru in identificarea seturilor de date care lipsesc acele atribute de metadate.
        
Datorită Rob și Adam pentru crearea acestui instrument și punerea la dispoziția ERDDAP™ comunitate.
        
    * NOU: Acum este în regulă dacă unele dintre fișierele într-o EDDGrid Setul de date din Dosare nu are toate variabilele setului de date. Fișierele vor fi incluse ca și cum ar avea variabilele (cu toate valorile lipsă) .
Mulţumită lui Dale Robinson şi Doug Latornell.
         
    * NEW: Există noi statistici de utilizare în fișierul jurnal și Daily Report pentru a ajuta administratorii să identifice utilizatorii care cauzează probleme de memorie. Statisticile sunt numite "OutOfMemory" (Dimensiune array) "Out Of Memory (Prea mare) "şi "Out Of Memory" (Prea mare) ". Acestea arată adresele IP ale utilizatorilor care au făcut cereri în aceste categorii și numărul de cereri pe care le-au făcut. Dacă nu au existat cereri supărătoare, aceste statistici nu vor apărea. "OutofMemory (Dimensiune array) " și "OutofMemory (Prea mare) "Cererile nu sunt de obicei o problemă, deoarece cererile au fost atât de mari încât ERDDAP™ I-am prins repede şi am trimis un mesaj de eroare. "OutofMemory" (Prea mare) "cererile sunt mai periculoase deoarece ERDDAP™ a făcut ceva efort înainte de a realiza că nu a fost suficientă memorie disponibilă în prezent pentru a gestiona cererea (deși problema poate fi alte cereri chiar înainte de aceste cereri) .
        
Există, de asemenea, noi statistici numite "Cerere mare, adresă IP" care arată adresele IP ale utilizatorilor care au făcut cereri mari (în prezent, în rețea .nc fișiere &gt; 1GB) .
        
De asemenea, tabelul de serie de timp pe status.html pagina include acum o coloană "memFail" care arată numărul de cereri care a eșuat cu "OutOfMemory" (Prea mare) " erori de la ultimele seturi majore de date privind încărcarea. Orice alt număr în afară de 0 aici este cel puţin un motiv de îngrijorare.
Mulţumită lui Bob Simons.
        
    * NOU: Noua versiune a Hyrax afișează liste de directoare diferit de cel de dinainte. ERDDAP™ poate citi acum listele vechi și noi directoare.
         
    * NOU: Reîncărcarea datelor și răspunsurile utilizatorilor care durează &gt; 10 secunde pentru a termina (cu succes sau fără succes) sunt marcate cu " (&gt;10s&#33;) ". Astfel, puteți căuta fișierul log.txt pentru această frază pentru a găsi seturile de date care au fost lente pentru a reîncărca sau numărul de cerere al cererilor care au fost lent pentru a termina. Apoi puteți privi mai sus în fișierul log.txt pentru a vedea care a fost problema setului de date sau care a fost cererea utilizatorului și de la cine a fost. Aceste sarcini lente ale setului de date și cereri de utilizare sunt uneori taxate ERDDAP . Astfel, faptul de a şti mai multe despre aceste cereri vă poate ajuta să identificaţi şi să rezolvaţi probleme.
    * IMPROVAT: La validarea unui set de date CF DSG, ERDDAP™ acum asigură că variabilele cu atributele cf\\_rol sunt în lista cdm\\_...\\_variabile și nu sunt în alte liste cdm\\_...\\_variabile. De exemplu, în cazul în care un set de date "Station\\_id" are o variabilă "stație\\_id" care are cf\\_rol=timeseries\\_id atribut, atunci "Station\\_id" trebuie să fie în cf\\_timeseries\\_variabiles list, dar nu trebuie să fie în cf\\_profil\\_variabile lista.
Mulţumită lui Micah Wengren.
         
    * Improvizat: "Simplify" este acum mai rapid, folosește mai puțină memorie, și poate reveni LongArray. Mulţumită Unidata .
         
    * IMPROVED: quickRestart este acum mult mai rapid pentru tabelul EDDDe la (legate de nc) Fișiere (cu excepția tabelului EDD din NCFFile și a tabelului EDD din InvalidCRAFile) pentru că face Preconizat (şi un alt loc) Acum citeşte metadatele fişierului în loc să citească toate datele. Mulţumită Jessicăi Austin.
         
    * IMPROVED: În prezent, există sprijin pentru siruri de timp cu precizie mai mare decât până la milisecundă dacă cifrele suplimentare sunt de 0, de exemplu, "2020-05-22T01:02:03.456000000Z." Mulţumită lui Yibo Jiang.
         
    * IMPROVEDAT: GenereazăDatesetsXml's EDD.suggestDestinationName used to remove '(' and everything after. Acum se îndepărtează (.\\*) numai dacă acesta este sfârşitul sourceName . Acum, de asemenea, elimină \\[ .\\* \\] numai dacă acesta este sfârşitul sourceName . Mulţumită lui Julien Paul.
         
    * IMPROVED: Generează date Xml face acum variabila destinationName s unic prin adăugarea \\_2, \\_3, ..., după cum este necesar. Mulţumită lui Julien Paul.
         
    * IMPROVED: Când Calendar2.parseDateTime parses dd, hh, sau HH, prima " cifră" poate fi acum un spațiu.
    * PROBLEMA CUNOSCUTA: Începând cu ERDDAP™ 2.10 .nc Fișiere ml care încearcă să schimbe un atribut, nu schimba atributul. Acesta este un virus cunoscut în netcdf-java pe care l-am raportat şi se spune că va fi fixat în următoarea versiune a netcdf-java.
         
    * BROKEN LINKS Fix: Am făcut un sistem adecvat de testare pentru link-uri rupte în ERDDAP™ pagini web, astfel încât ar trebui să existe acum foarte puține link-uri rupte (cel puțin de la fiecare dată de lansare -- apar adesea noi legături rupte) .
         
    * BUG FIX: EDDtableFromHttpGet a eșuat cu anumite tipuri de cereri. Acum nu. Mulţumită Emmei de la BODC.
         
    * BUG FIX: Pentru a face față unor cereri, EDDtable a făcut un fișier temporar pentru fiecare variabilă solicitată, cu un nume de fișier care se încheie în numele variabilei. Dacă numele variabilei a fost, de asemenea, un tip de compresie (De exemplu, Z.) , ERDDAP ar încerca (și nu reușesc) pentru a decomprima fișierul temporar. Numele de fişiere temporare se termină în "temp." Mulţumită lui Mathew Biddle.
         
    * BUG FIX: GenereazăDatesetsXml și Calendar2.convertTo Java Data Formatul este acum mult mai puțin probabil să facă o schimbare incorectă atunci când încearcă să stabilească un format posibil invalid data. În special, nu va fi modificat nici un format de dată automată. Mulţumită lui Mathew Biddle.
         
    * BUG FIX: Dacă a existat o eroare în timp ce obțineți conținut de la un URL la distanță, și în cazul în care conținutul de eroareStream este comprimat, ERDDAP™ Acum descompune corect mesajul de eroare. Mulţumită lui Bob Simons.
         
    * BUG FIX:&lt;abonareToRemoteErddapDataset&gt; nu a fost aplicată atunci când EDD... Din Erddap a fost un set de date pentru copii. Acum este. Mulţumită lui Chris Romsos.
         
    * BUG FIX: Generează date Xml nu mai crede că un nume variabil sursă începând cu "latin" ar putea fi latitudine. Mulţumită lui Vincent Luzzo.
         
    * BUG FIX: Acum, un OutOfMemoryError în timp ce citiți un fișier de date în timp ce procesați cererea unui utilizator nu este un motiv pentru a adăuga un fișier la lista BadFiles. Mulţumită lui Bob Simons.
         

## Versiunea 2.02{#version-202} 
 (a lansat 2019-08-21) 

*    **Noi caracteristici și schimbări (pentru utilizatori) :** 
    * NOU: Există acum două moduri de a căuta seturi de date pe mai multe ERDDAP c. Ele funcționează ușor diferit și au interfețe și opțiuni diferite.
        
        *    [Caută Multiple ERDDAP s.html](/SearchMultipleERDDAPs.html) de la Bob Simons/ NOAA   NMFS   SWFSC   ERD .
        *    [http://erddap.com](http://erddap.com) de la Rob Fuller/The Marine Institute of Ireland.
        
Mulţumită lui Tylar Murray pentru cererea originală.
         
    * IMPROVAT: o cerere adresată "files" sistem de descărcare a unui fișier care este de fapt la un site la distanță (De exemplu, AWS S3) acum duce la o redirecționare, astfel încât utilizatorul va descărca de fapt datele de la sursă, în loc de a utiliza ERDDAP™ ca intermediar. Mulţumită lui Andy Ziegler şi NOAA .
         
    * NEW: Ca un exemplu al noilor caracteristici AWS S3, și pentru a face mai ușor pentru oricine să navigheze și să descarce fișiere din galeți AWS S3, am creat
         [~110 seturi de date pentru eșantioane](https://registry.opendata.aws/) care permite oricui să navigheze conținutul aproape toate
         [AWS S3 Deschideți gălețile de date](https://registry.opendata.aws/) . Dacă faceţi clic pe "files" link-ul pentru oricare dintre aceste seturi de date eșantion, puteți naviga copacul director și fișiere în acea găleată S3. Din cauza modului în care funcționează aceste seturi de date, aceste liste directoare sunt întotdeauna perfect actualizate deoarece ERDDAP™ îi face să zboare. Dacă faceți clic pe arborele director pentru un nume de fișier real și faceți clic pe numele fișierului, ERDDAP™ va redirecționa cererea la AWS S3 astfel încât să puteți descărca fișierul direct de la AWS. ERDDAP™ Administratorii pot
         [citeste directiile pentru cum se face acest lucru pentru alte galeti S3](/docs/server-admin/datasets#working-with-aws-s3-files) . Mulţumită lui Andy Ziegler şi NOAA .
         
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * Lucruri pe care trebuie să le faci: niciunul
         
    * Improvizat: ERDDAP Metoda de stocare a array-urilor de corzi (StringArray) este acum mult mai eficient de memorie. String Array-urile sunt utilizate pe tot parcursul ERDDAP™ , în special atunci când citiți tabular fișiere de date ASCII. De asemenea, alte modificări fac lectură CSV/TSV / SSV ASCII, coloană ASCII, și JsonlCSV tabular fișiere de date mai rapid și mult mai eficient de memorie. Rezultatul este: pentru un fișier de testare 764 MB ASCII date (dar comprimat la un 52MB .gz fișier) cu 3,503,266 rânduri și 33 coloane, utilizarea maximă a memoriei a trecut de la 10GB la 0,6GB (la vârf) . Timpul pentru a citi a trecut de la ~7 minute (dar variază foarte mult cu câtă memorie fizică este în computer) până la ~36 secunde (inclusiv 10 pentru simplificare () care este utilizat numai de GenerateDatasets Xml) . Multe alte locuri în ERDDAP™ va beneficia de această eficiență sporită a memoriei. Mulţumită lui Tylar Murray şi Mathew Biddle.
        
Am explorat o soluţie diferită. (stocarea corzilor în StringArray ca array-uri UTF-8 codificate) . Asta reduce utilizarea memoriei un alt ~33%, dar cu costul de ~33% încetinire. Comparativ cu sistemul care este acum folosit, care părea un schimb prost off. E mai uşor să dai mai multă memorie unui computer. (cumpara mai multe amintiri pentru ~ 200 $) Decât să-l facă mai rapid (Cumpara un calculator cu totul nou) .
        
Dacă este convenabil, este întotdeauna o idee bună de a împărți fișiere de date tabulare uriașe în mai multe fișiere mai mici pe baza unor criterii cum ar fi stationID şi/sau timpul. ERDDAP™ va trebui adesea să deschidă doar unul dintre fișierele mici ca răspuns la cererea unui utilizator, și astfel să poată răspunde mult mai repede.
        
    * Există acum [ ERDDAP™ Documentația AWS S3](/docs/server-admin/datasets#working-with-aws-s3-files) , care descrie cum să obțineți ERDDAP™ pentru a lucra cu fișiere de date în găleți AWS S3.
De asemenea, ERDDAP™ Acum folosește noi caracteristici în AWS S3 Java API.
De asemenea, ERDDAP™ permite acum URL-uri AWS S3 pentru a include caractere suplimentare (perioada, cratimă, subliniere) în nume de găleată.
De asemenea, ERDDAP™ Acum necesită ca URL-urile AWS S3 să fie identificate într-un mod specific:
          https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/  
unde prefixul este opțional.
Mulţumită lui Andy Ziegler şi NOAA .
         
    * IMPROVED: Generează date Xml tratează acum în mod suplimentar frecvente missing\\_value S stand-in-uri ca valori lipsă și astfel este mai probabil să transforme o coloană într-un tip de date numerice. De asemenea, Array primitiv.simplifică () acum jurnalele care au determinat-o să trateze o anumită coloană ca pe o coloană de șiruri. Mulţumită lui Mathew Biddle.
         
    * Improvizat:&lt;cerere Blacklist&gt; acceptă acum .\\*.\\*  (sau:\\*:\\*pentru IPv6) la sfârșitul adreselor IP, astfel încât să puteți lista neagră o bucată mai mare de adrese IP, de exemplu, 110.52.\\*.\\*  (China Unicom Tianjin) . A se vedea documentația pentru [&lt;cerere Lista neagră &gt;] (/docs/server-admin/sets#request blacklist) Datorită China Unicom și China Telecom.
         
    * În cazul în care sursa unui set de date nu specifică o "institution" atribute, GenerateDateName Xml și încărcareDataset acum obține de la un atribut "creator\\_instituție" (dacă este disponibil) . Mulţumită lui Micah Wengren.
         
    * BUG FIX: standardizează Ceea ce nu a fost întotdeauna aplicat fișierelor de date ASCII.
De asemenea, tabelul EDD nu a gestionat în mod corespunzător constrângerile privind valorile timpului atunci când sursa avea valori ale timpului de string și standardizează Ce era folosit.
Mulţumită Paloma de la Vallee.
        
Nu am spus clar înainte: ar trebui să foloseşti standardizarea. Ce caracteristici când ai nevoie de ele (de exemplu, atunci când diferite fișiere sursă păstrează valorile timpului în moduri diferite) , pentru că unele cereri de seturi de date care utilizează standardiza Ceea ce va fi procesat un pic mai lent.
        
    * BUG FIX: Un bug în cod folosit de EDDGrid Din NcFiles a făcut să nu reușească cu .nc 4 și .hdf 5 fişiere care au "lung" (int64) variabile. Acest lucru este acum fix. Mulţumită lui Friedemann Wobus.
         
    * BUG FIX: Mici modificări ale fișierelor ISO 19115 pentru a face fericit un alt validator. Mulţumită lui Chris MacDermaid şi Anna Milan.
         

## Versiunea 2.01{#version-201} 
 (eliberat în 2019-0072) 

*    **Noi caracteristici și schimbări (pentru utilizatori) :** 
    * Niciuna.
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * BUG FIX: Un bug în codul care generează formularul de acces la date pentru tabledap Seturile de date au determinat ca pagina web să fie goală pentru anumite seturi de date. De asemenea, am îmbunătățit gestionarea erorilor neașteptate pe toate paginile HTML astfel încât acestea vor (de obicei) afișează un mesaj de eroare. Mulţumită lui Marco Alba.
    * IMPROVED: Generează date Xml nu mai imprima un avertisment lung în partea de sus a producției. În schimb, vă rugăm să vedeți [Editare generator Setări de date Ieșire Xml](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better) . Mulţumită lui Steven Baum.
    * IMPROVED: Generează date Xml face acum recomandări ușor diferite în situații diferite pentru&lt;updateEveryNMillis&gt; pentru EDD...De la...Seturi de fișiere. De asemenea, Generează date Xml descurajează acum sistemul original "extract" pentru seturi de date EDDTabelFromFiles.

## Versiunea 2.00{#version-200} 
 (eliberat 2019-06-26) 

*    ** ERDDAP™ V2.00 este în sfârşit aici&#33; Da&#33;**   
     
    * Ne cerem scuze pentru lunga întârziere necesară pentru a termina această versiune.
Mulţumesc pentru răbdare.
         
    * Vestea bună este că timpul suplimentar a fost folosit pentru a adăuga mai multe dintre caracteristicile pe care utilizatorii au solicitat. Vestea proastă este că, chiar și cu întârziere, nu toate caracteristicile solicitate au fost adăugate. Ne pare rău, dar părea mai important pentru a obține această eliberare decât să întârzie mai mult (Pentru totdeauna?) adăugarea continuă de noi caracteristici. Promitem să revenim la eliberări mai frecvente în viitor.
         
    * "Versiunea 2?&#33; Există schimbări mari şi incompatibilităţi?"
Noi caracteristici mari? Da.
Incompatibilităţi mari sau schimbări pentru administratori sau utilizatori? Nu.
Am sărit de la v1.82 la v2.00:
        * parţial pentru a sărbători 10 ani (acum 11) de la prima versiune publică a ERDDAP™   (v1.00 pe 2008-05-06, care în exterior arăta remarcabil ca v2.00) . În acel timp, ERDDAP™ a trecut de la o instalație la aproape 100 de instalații în cel puțin 12 țări (Australia, Belgia, Canada, Franța, India, Irlanda, Italia, Africa de Sud, Spania, Thailanda, Marea Britanie, SUA) .
        * parţial pentru a marca o adăugare majoră într-o direcţie complet nouă: ERDDAP™ are acum un sistem de ingerare a datelor pentru a merge cu serviciile existente server de date (Vezi? [Tabel EDD de la HttpGet](#eddtablefromhttpget) ) ,
        * şi parţial pentru că nu a fost un salt mare de la 1.82 la 2.00 numeric, aşa că asta părea momentul potrivit.
             
    * Cealaltă veste bună este că există acum alte două grupuri care contribuie la codul ERDDAP™   (în această versiune și cu indicații vor continua) : Rob Fuller and Adam Leadbetter of Ireland's Marine Institute, and Roland Schweitzer of PMEL and Weathertop Consulting. Mulţumesc foarte mult. Este adevărat că ei lucrează la proiecte pe care le aleg singuri, dar acesta este modelul clasic de dezvoltare open-source -- grupurile contribuie cu cod pentru caracteristicile pe care ar dori cel mai mult să le vadă adăugate. Beneficiul adăugat pentru contribuitori: ei ajung să utilizeze noile caracteristici de îndată ce acestea sunt terminate; ei nu trebuie să aștepte următoarea versiune de ERDDAP . Grupul tău este binevenit să contribuie, de asemenea&#33; Vezi [ ERDDAP™ Ghidul programatorului](/docs/contributing/programmer-guide) .
         
    * Sperăm să vă placă. ERDDAP™ v2.00. Aşteptăm cu nerăbdare următorii 10 ani de ERDDAP™ dezvoltarea și utilizarea tot mai mult în întreaga lume.
         
*    **Noi caracteristici și schimbări (pentru utilizatori) :**   
     
    * NOU: orderByMean filtru
pentru tabledap Seturile de date vor calcula mijloacele pentru grupurile specificate. De asemenea, toate orderBy opțiunile sprijină acum o modalitate suplimentară de definire a grupurilor: _numericVariable \\[ /număr \\[ timeunits \\]  \\[ :offset \\]  \\] _, de exemplu, ora/ziua sau adâncimea/10:5. De exemplu, stationID ,time,waterTemp& orderByMean  (" stationID ,timp/zi") ar sorta rezultatele de stationID şi timpul, apoi calculaţi şi returnaţi media de apăTemp pentru fiecare stationID pentru fiecare zi. Acestea sunt remarcabil de utile și noi caracteristici puternice. Noul cod pentru aceste caracteristici și modificările aduse vechiului cod au fost aduse de Rob Fuller și Adam Leadbetter de la Institutul Marine din Irlanda și depuse prin intermediul Git. Mulţumesc. Rob şi Adam&#33;
         
    * NOU: tipul de fișier de ieșire pentru seturile de date tabelare: [.date Tabel](https://developers.google.com/chart/interactive/docs/reference#dataparam) ,
un fişier JSON formatat pentru utilizare cu Google Visualization biblioteca client ( Google Charts ) . Codul pentru aceasta a fost contribuit de Roland Schweitzer și prezentat prin intermediul Git. Mulţumesc. Roland&#33;
         
    * NOU: tipul de fișier de ieșire pentru seturile de date tabelare: [ .jsonlCSV1 ](https://jsonlines.org/examples/) ,
care este ca existent .jsonlCSV opţiune, dar cu nume pe prima linie. Mulţumită lui Eugene Burger.
         
    * NEW: În cazul în care administratorul permite, utilizatorii se pot conecta acum cu lor [ORCID](https://orcid.org) Cont.
Este un sistem de autentificare OAuth 2.0, la fel ca autentificarea Google. ORCID este utilizat pe scară largă de cercetători pentru a se identifica în mod unic. Conturile ORCID sunt gratuite și nu au problemele de confidențialitate pe care le au conturile Google. Vezi? ERDDAP 's [Instrucțiuni de autentificare Orcid](/docs/server-admin/additional-information#orcid) . Mulţumită BCO-DMO (Adam Shepard, Danie Kinkade, etc.) .
         
    * NOU: Un nou convertor URL convertește URL-uri out-of-date în URL-uri actualizate.
A se vedea .../erddap/convert/urls.html pe orice ERDDAP™ instalare, de exemplu,
         [acest link către convertorul din ERD   ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html) . Acest lucru ar trebui să fie util managerilor de date. Acest lucru este, de asemenea, folosit intern de GenerateDatasetsXml. Mulţumită lui Bob Simons şi Sharon Mesick.
         
    * IMPROVED: [Convertor timp](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) are acum opțiuni pentru a converti orice timp de șir comun într-un timp de șir ISO8601, sau converti un UDUNITS - cum ar fi unităţile de timp şir într-o corespunzătoare UDUNITS unităţile temporale şir. Acest lucru ar trebui să fie, de asemenea, util ERDDAP™ administratorii care trebuie să știe ce format pentru a specifica pentru atributul "unități" pentru variabilele timpului de string. Acest lucru este, de asemenea, utilizat intern de GenerateDatesetsXml și standardizareCe caracteristică a EDDtableFromFiles. Mulţumită lui Bob Simons.
         
    * NOU: [Convertor unități](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) are o nouă opțiune "Standardize UDUnits."
De exemplu, "deg\\_C/m" și "grade\\_C metre-1" sunt ambele convertite în
"grade\\_C m-1." Această caracteristică este, de asemenea, utilizată de standardizareCe caracteristică a EDDtableFromFiles. Mulţumită lui Bob Simons.
         
    * NOU: Pentru grafice (altele decât graficele de suprafață) pe griddap și tabledap Paginile web Make A Graph, atunci când axa x nu este o axă temporală, dacă numai un subset al intervalului variabilei x este vizibil, există acum butoane deasupra graficului pentru a muta axa X spre stânga sau spre dreapta. Mulţumită lui Carrie Wall Bell / proiectului Hydrophone.
         
    * NOU: Pentru grafice, axa X și/sau Y poate folosi acum o scară log.
Utilizatorii pot controla scala Axei Y printr-un nou widget drop-down pe griddap și tabledap Faceți o pagină web grafică. Vezi [.xRange și . Documentație yRange](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange) . Mulţumită lui Carrie Wall Bell / proiectului Hydrophone.
         
    * Improvizat: ERDDAP™ acum utilizează mai bine diferite coduri de eroare HTTP și acum întoarce un(OPeN)DAPv2.0-format mesaj de eroare sarcina utilă. Vezi? [detaliile](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors) . Mulţumită lui Antoine Queric şi Aurelie Briand.
         
    * IMPROVED: Nu utilizaţi Netcdf-java/c sau alte instrumente software pentru a vă conecta la .nc sau .hdf fișiere deservite de ERDDAP Dosare/sistem ca şi cum ar fi fi fişiere locale. ERDDAP™ Acum refuză aceste cereri. Este oribil ineficient și cauzează adesea alte probleme. În schimb:
        
        * Utilizare(OPeN)DAPsoftware client pentru a se conecta la ERDDAP 's DAP servicii pentru setul de date (care au /griddap / sau / tabledap / în URL) . Asta e ceea ce DAP este pentru și face atât de bine.
        * Sau, utilizați formularul de acces la date al setului de date pentru a solicita un subset de date.
        * Sau, dacă aveți nevoie de întregul fișier sau acces repetat pe o perioadă lungă de timp, utilizați curl , wget , sau browser-ul pentru a descărca întregul fișier, apoi accesați datele din copia locală a fișierului.
        
          
         
    * IMPROVAT: ERDDAP™ homepage, Full Text Search este acum mai sus "View a List of All Datasets," deoarece este cel mai bun punct de plecare pentru majoritatea utilizatorilor. Mulţumită lui Didier Mallarino şi Maurice Libes.
         
    * Improved: on DataProviderForm3.html există acum liste de abandon comun standard\\_name c. Mulţumită cuiva de la şedinţa IOOS DMAC.
         
    * Improved: Pe /files/ pagini web, există acum un link către noul "Ce pot face cu aceste fișiere?" secțiunea /files/documentations. Această secțiune descrie diferite tipuri de fișiere și oferă sugestii pentru modul de lucru cu acestea. Mulţumită lui Maurice Libes.
         
    * Aproape fiecare cerere către ERDDAP™ Ar trebui să fie un pic mai rapid, şi uneori mult mai rapid.
         
    * BUG FIX: În anumite circumstanțe, atunci când un set de date EDD Table a salvat date în unele tipuri de .nc fișierele, atributul global "id" a fost setat pe numele sugerat al fișierului, care include un hash pentru a face unic la această cerere. Acum "id" este lăsat corect neschimbat (dacă este specificat) sau setat pe setul de date datasetID   (dacă nu este specificat) . Mulţumită lui John Maurer.
         
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:**   
     
    * Această eliberare va dura ceva timp şi va funcţiona de la tine. Vă rugăm să aveţi răbdare şi să planificaţi să luaţi câteva ore pentru a face modificările necesare şi câteva ore pentru a experimenta cu noi caracteristici.
         
    * TO DO: Pentru siguranță, faceți o copie de rezervă a setup-ului curent.xml și datasets.xml fișiere astfel încât să puteți reveni la ele în cazul puțin probabil în care aveți nevoie pentru a reveni la ERDDAP™ v1.82.
         
    * TO DO: Recomandările Java este acum Adoptarea OpenJDK lui OpenJDK 8 (LTS) + HotSpot.
Aceasta este o variantă open source a Java care nu are restricții de utilizare (spre deosebire de Oracle 's Java distribuţie) . Acesta este derivat din Oracle 's Java pe cale continuă, cu Oracle Binecuvântarea lui. Din motive de securitate, este important să păstreze dumneavoastră Java versiunea actualizată. Vezi? ERDDAP 's [ Java instrucțiuni de instalare](/docs/server-admin/deploy-install#java) .
         
    * DE FĂCUT: Adoptarea OpenJDK's Java are nevoie de o mică adăugare la instalarea Tomcat: a se vedea [Instrucțiuni privind cache-ul de resurse](/docs/server-admin/deploy-install#contentxml) . Cred că acesta este un înlocuitor pentru -XX:MaxPermSize setarea, care (Adoptare) OpenJDK nu mai suportă.
         
    * TO DO: Noul implicit și recomandă&lt;Setarea fontului în setup.xml este
DejaVu Sans care sunt construite în AdoptăJDK's Java . Vezi
         [instrucțiuni revizuite de instalare fonturi](/docs/server-admin/deploy-install#fonts) .
         
    * TO DO: Multe etichete se deplasează de la setup.xml la datasets.xml . Avantajul este că puteți schimba valorile lor în timp ce ERDDAP™ rulează, fără repornire ERDDAP . În special, te poţi schimba uşor.&lt;StartBodyHtml5&gt; pentru a afișa un mesaj temporar pe ERDDAP™ pagina de start (De exemplu, "Verificați noul set de date JPL MUR SST v4.1 ..." sau "Acest lucru ERDDAP™ va fi offline pentru întreținere 2019-05-08T17:00 PDT până în 2019-05-08T20:00 PDT.") . Dacă/atunci când modificați aceste etichete în datasets.xml , modificările vor intra în vigoare data viitoare ERDDAP™ citeste datasets.xml .
         
        
        1. Copiați acest conținut în datasets.xml fișier (oriunde lângă începutul fișierului, după&lt;erddapDatasets&gt;:
```
            <!-- The tags below are described in setupDatasetsXml.html.
                 The defaults listed below are as of ERDDAP™ v2.00. -->
            <cacheMinutes></cacheMinutes>                                     <!-- default=60 --> 
            <decompressedCacheMaxGB></decompressedCacheMaxGB>                 <!-- default=10 --> 
            <decompressedCacheMaxMinutesOld></decompressedCacheMaxMinutesOld> <!-- default=15 --> 
            <drawLandMask></drawLandMask>                                     <!-- "over" or "under" (default) -->
            <graphBackgroundColor></graphBackgroundColor>                     <!-- 0xAARRGGBB, default is 0xffccccff -->
            <loadDatasetsMinMinutes></loadDatasetsMinMinutes>                 <!-- usually=default=15 -->
            <loadDatasetsMaxMinutes></loadDatasetsMaxMinutes>                 <!-- default=60 -->
            <logLevel></logLevel> <!-- "warning" (fewest messages), "info" (default), or "all" (most messages) -->
            <nGridThreads></nGridThreads>                                     <!-- default=1 -->
            <nTableThreads></nTableThreads>                                   <!-- default=1 -->
            <partialRequestMaxBytes></partialRequestMaxBytes>                 <!-- default=490000000 -->
            <partialRequestMaxCells></partialRequestMaxCells>                 <!-- default=10000000 -->
            <slowDownTroubleMillis></slowDownTroubleMillis>                   <!-- default=1000 -->
            <unusualActivity></unusualActivity>                               <!-- default=10000 -->
            <!-- The defaults for the following tags are in messages.xml. -->
            <startHeadHtml5></startHeadHtml5>                                
            <startBodyHtml5></startBodyHtml5>                                 <!-- This is often customized. -->
            <theShortDescriptionHtml></theShortDescriptionHtml>               <!-- This is often customized. -->
            <endBodyHtml5></endBodyHtml5>
            <standardLicense></standardLicense>
            <standardContact></standardContact>
            <standardDataLicenses></standardDataLicenses>
            <standardDisclaimerOfEndorsement></standardDisclaimerOfEndorsement>
            <standardDisclaimerOfExternalLinks></standardDisclaimerOfExternalLinks>
            <standardGeneralDisclaimer></standardGeneralDisclaimer>
            <standardPrivacyPolicy></standardPrivacyPolicy>
```

        2. Unu câte unu, copiaţi valoarea. (dacă este cazul) pentru fiecare dintre aceste etichete din fișierul setup.xml în noua etichetă pe care tocmai ai lipit (mai sus) în datasets.xml . De exemplu, dacă ați fi folosit o valoare de 30&lt;CacheMinute&gt; în setup.xml, ar trebui să copiați această valoare în noul&lt;cacheMinutes&gt; tag in datasets.xml   (deși dacă valoarea este aceeași cu noua valoare implicită, cel mai bine este să lăsați eticheta în datasets.xml gol) .
            
Dacă valoarea ta este diferită de cea nouă sugerată implicit (alta decât pentru&lt;StartBodyHtml5&gt; și&lt;scurtDescriereHtml&gt;, care sunt utile pentru personalizarea dvs. ERDDAP™ instalare), vă rugăm să luați în considerare trecerea la noile valori implicite. Acest lucru este deosebit de adevărat&lt;Cerere parțialăMaxBytes&gt; și&lt;ParțialRequestMax Ferries&gt;, în cazul în care valoarea implicită/sugerată s-a modificat semnificativ de-a lungul anilor.
            
După ce copiați fiecare valoare, ștergeți eticheta și descrierea de pe setup.xml. Este mai bine să aibă aceste etichete în datasets.xml . Și există acum descrieri mai bune în [setupDatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file) .
            
        
Un capriciu al noului sistem este că prima pagină web atunci când porniți ERDDAP va fi implicit ERDDAP™ Pagina web. Fiecare pagină web ulterioară va utiliza conținutul ...Html specificat în datasets.xml .
        
    * ATENŢIE: Prima dată când fugi ERDDAP™ v2.0, seturile de date bazate pe fișiere de date locale vor încărca **foarte** încet, deoarece ERDDAP™ trebuie să își recreeze baza de date a fișierelor într-un format ușor diferit. După reîncărcarea inițială lentă, se vor încărca rapid, ca înainte. Te rog să ai răbdare.
         
#### Tabel EDD de la HttpGet{#eddtablefromhttpget} 
    *    [MAREA NOUĂ FEATURĂ: EDDTADE LA HTTPGet](#eddtablefromhttpget)   
Până acum, ERDDAP™ citeste datele si pune-le la dispozitia utilizatorilor. Acum, ERDDAP™ are un sistem simplu și eficient pentru ingerarea datelor în timp real de la senzori. Printre alte caracteristici, acest set de date oferă o versiune fină: își amintește fiecare modificare a setului de date, atunci când a fost făcut și de către cine. De obicei, utilizatorii vor dori doar ultima versiune a setului de date, cu toate modificările aplicate. Cu toate acestea, există posibilitatea ca utilizatorii să solicite date din setul de date, așa cum a fost în orice moment. Acest lucru facilitează o știință reproductibilă. Astfel, spre deosebire de majoritatea altor seturi de date în timp aproape real, aceste seturi de date sunt eligibile pentru [ DOI s](https://en.wikipedia.org/wiki/Digital_object_identifier) . pentru că ei întâlnesc DOI cerința ca setul de date să nu se schimbe, cu excepția agregării. Vezi? [Tabel EDD de la HttpGet](/docs/server-admin/datasets#eddtablefromhttpget) . Mulţumită lui OOI (de mult timp în urmă şi acum) pentru a vorbi despre nevoia de acest lucru și Eugene Burger pentru memento despre lucru la ceea ce este important.
         
    * MARE NOU FEATURĂ: ERDDAP™ poate servi acum date direct din fișiere de date externe, inclusiv .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 , sau .Z. Datasets poate include un amestec de fișiere electronice externe (Poate fişierele mai vechi?) și non-extern-comprimat fișiere, și puteți comprima / decomprima un fișier în orice moment.
        
Merge grozav&#33;
În majoritatea cazurilor, încetinirea legată de decompresia fișierelor este minoră. Vă încurajăm cu tărie să încercați acest lucru, în special pentru seturile de date și/sau fișierele de date care sunt utilizate rar.
        
Acest lucru vă poate salva 30.000 dolari sau mai mult&#33;
Aceasta este una dintre puținele ERDDAP™ caracteristici care vă pot economisi o mulțime de bani -- dacă comprimați o mulțime de fișiere de date, veți avea nevoie de mult mai puține RAID/hard drive-uri pentru a stoca datele, sau invers, puteți servi mult mai multe date (până la 10x) cu RAID-urile pe care le ai deja. Dacă această caracteristică te salvează de la cumpărarea unui alt RAID, atunci te-a salvat aproximativ 30.000 dolari.
        
Vezi [Documentație fișiere comprimate extern](/docs/server-admin/datasets#externally-compressed-files) . Mulţumită lui Benoit Perrimond şi Paloma de la Vallee.
        
    * MARE NOU FEATURĂ: Toate EDDGrid Din Dosare și toate tabelele EDDFromFile Set de date sprijină&lt;cacheFromurl&gt; tag și a&lt;CacheSizeGB&gt; tag. Dacă CacheSizeGB nu este specificat, acest lucru va descărca și menține o copie completă a fișierelor unui set de date la distanță. Dacă CacheSizeGB este specificat și este &gt;0, acest lucru va descărca fișiere din setul de date de la distanță, după cum este necesar, într-un cache local cu o dimensiune limitată, care este util atunci când lucrează cu cloud-based (De exemplu, S3) fișiere de date. Vezi [cache Din documentația Url](/docs/server-admin/datasets#cachefromurl) pentru detalii. Mulţumită lui Bob Simons şi Roy Mendelssohn (care de ani de zile au scris script-uri pentru a se ocupa de a face copii locale de fișiere de set de date la distanță) , Lloyd Cotten, Eugene Burger, Conor Delaney (când era la Amazon Web Services) , și platforma Google Cloud.
         
    * NOU: Noul tabel EDD de la JsonlCSV clasa poate citi date tabulare de la
         [JSON Linii fișiere CSV](https://jsonlines.org/examples/)   ("Mai bine decât CSV") . Datorită oamenilor de la Institutul Marine din Irlanda pentru a-mi spune despre acest format și la Eugene Burger și PMEL pentru cererea de a sprijini ca un tip de intrare.
         
    * NOU: Toate EDDGrid și toate tabelele EDDFromFiles settingssupport an&lt;nThreads&gt; setarea, care spune ERDDAP™ câte fire să folosească atunci când răspunde la o cerere. Vezi [nThreads documentation](/docs/server-admin/datasets#nthreads) pentru detalii. Datorită lui Rob Bochenek de la Axiom Data Science, Eugene Burger, Conor Delaney (când era la Amazon Web Services) , și Google Cloud Platform.
         
    * NOU standardizat Ce pentru toate subclasele EDD Table FromFiles -
Anterior, dacă pentru o anumită variabilă, valorile atributelor importante (de exemplu, scale\\_factor , add\\_offset , missing\\_value , \\_FillValue, unități) nu au fost coerente, EDDtableFromFiles ar alege o valoare pentru fiecare atribut să fie "validă" și marca fișiere cu alte valori atribute ca "Fișiere Bad." Acum, există un sistem pentru a standardiza fișierele de îndată ce EDDtableFromFiles citește fișierele. Vezi? [Tabel EDDDe la standardizarea fişierului Ce?](/docs/server-admin/datasets#standardizewhat) . Unul din ERDDAP Principalele obiective ale acestuia sunt de a face accesibile în mod consecvent fişierele de date şi seturile de date. standardizează Ce este un instrument nou important pentru a face din asta o realitate. Mulţumită lui Marco Alba, Margaret O'Brien (și alți utilizatori ai EML) , BCO-DMO și utilizatorii InPort.
         
    * NEW EDDtableFromInvalidCRAFiles permite realizarea unui set de date dintr-o colecție de NetCDF   (v3 sau v4)   .nc fișiere care utilizează o variantă specifică, invalidă, a CF DSG Contiguous Ragged Array (CRA) Dosare. Fișiere eșantion pentru acest tip de set de date pot fi găsite lahttps://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[ 2020-10-21 Acest server nu este acum disponibil în mod fiabil \\] . Deşi... ERDDAP™ acceptă acest tip de fișier, este un tip de fișier invalid pe care nimeni nu ar trebui să înceapă să-l utilizeze. Grupurile care utilizează în prezent acest tip de fișier sunt puternic încurajate să utilizeze ERDDAP™ să genereze fișiere DSG CRA valabile și să înceteze să mai utilizeze aceste fișiere. Mulţumită lui Ajay Krishnan şi Tim Boyer.
         
    * Tabel EDD de la trei fișiere și tabel EDD de la Hyrax Dosarele sunt acum depreciate. Comută la tabelul EDDFromNcFiles (sau o variantă) plus&lt;Cache FromUrl&gt;. În cazul în care nu funcționează pentru un motiv oarecare, e-mail erd.data at noaa.gov . Dacă nu există plângeri înainte de 2020, aceste tipuri de seturi de date pot fi eliminate.
         
    * Improvizat... Sistemul pentru conversia automata a non-ISO 8601 ori in ISO 8601 ori (v1,82) a fost extins foarte mult pentru a face față unui număr mare de formate suplimentare. Acest lucru afectează GenerateDatasetsXml și ERDDAP Manipularea metadatelor sursă.
         
    * Improvizat... Cu a treia revizuire majoră a sistemului de parsare a timpului de coarde (şi să sperăm că ultima) , ERDDAP™ nu se mai utilizează Java DataTimeFormaterie din cauza bug-uri care afectează uneori ori extreme (ani&lt;=0000). ERDDAP™ Acum foloseste propriul sistem pentru parsing siruri de timp.
         
    * ATENŢIE: Noul sistem de parsare a timpului String este oarecum mai strict. În cazul în care unul dintre seturile de date dintr-o dată nu are decât valori lipsă pentru valorile timpului, cauza este aproape sigur că șir de timp format este ușor greșit. Ar trebui să fie mesaje de eroare în jurnal. txt legat de valorile timpului care nu se potrivesc formatului de timp -- care ar trebui să vă ajute să reparați șirul formatului de timp pentru acel set de date. Dacă aveți nevoie de ajutor, utilizați opțiunea în ERDDAP Convertor de timp care "Convert \\[ s \\] orice timp de șir comun într-un timp de șir ISO 8601" -- indică formatul pe care convertorul l-a folosit pentru a desena șirul sursă.
         
    * RECOMANDARE: Cea mai rapidă, mai ușoară și mai ieftină modalitate de a accelera ERDDAP accesul la datele tabulare este de a pune fișierele de date pe o unitate Solid State (SSD) . Cele mai multe seturi de date tabulare sunt relativ mici, astfel încât o 1 sau 2 TB SSD este, probabil, suficient pentru a deține toate fișierele de date pentru toate seturile de date tabulare. SSD se epuizează în cele din urmă dacă scrii date într-o celulă, le ştergi şi scrii date noi în acea celulă de prea multe ori. În schimb, recomand asta. (cât mai mult posibil.) foloseşti SSD-ul pentru a scrie datele o dată şi le citeşti de multe ori. Apoi, chiar și un SSD de consum ar trebui să dureze foarte mult timp, probabil mult mai mult decât orice Hard Disk Drive (HDD) . SSD-urile de consum sunt acum ieftine (în 2018, ~200$ pentru 1 TB sau ~400$ pentru 2 TB) şi preţurile încă scad rapid. Când ERDDAP™ accesează un fișier de date, un SSD oferă ambele
        
        * Latență mai scurtă (~0.1ms, versus ~3ms pentru un HDD, versus ~10 (?) Ms pentru un RAID, versus ~55ms pentru Amazon S3) , și
        * mai mare (~500 MB/S, versus ~75 MB/s pentru un HDD versus ~500 MB/s pentru un RAID) .
        
Astfel încât să puteți obține până la un impuls de performanță ~10X (vs a HDD) pentru 200 $&#33; Comparativ cu cele mai multe alte modificări posibile ale sistemului dumneavoastră (Un nou server pentru 10.000 de dolari? un nou RAID pentru 35.000 dolari? un nou comutator de rețea pentru 5.000 dolari? etc.) , acest lucru este de departe cel mai bun Return On Investment (ROI) . Dacă serverul dvs. nu este încărcat cu memorie, memoria suplimentară pentru serverul dvs. este, de asemenea, un mod mare și relativ ieftin de a accelera toate aspectele ERDDAP .
         \\[ SSD-urile ar fi grozave şi pentru datele în reţea, dar majoritatea seturilor de date sunt mult mai mari, ceea ce face SSD foarte scump. \\]   
         
    * NEW: Toată lumea care este conectat devine rol = \\[ oricine logat În \\] , chiar dacă nu există&lt;tag-ul pentru utilizator &gt; datasets.xml . Dacă setați setul de date&lt;accesibile pentru &gt; \\[ oricine logat În \\] , apoi oricine care a conectat la ERDDAP™   (de exemplu, prin intermediul contului Gmail sau Orcid) va fi autorizat să acceseze setul de date, chiar dacă nu ați specificat un&lt;tag-ul pentru utilizator &gt; datasets.xml . Mulţumită lui Maurice Libes.
         
    * IMPROVED: UDUNITS Convertorul de unități /UCUM a fost îmbunătățit pe scară largă.
Se ocupă mai bine de unităţile invalide. (de la punerea accentului pe păstrarea informaţiei, în loc să se aplice valabilitatea) . De asemenea, rezultatele au acum o sintaxă standardizată.
         
    * NOU: UDUNITS Convertor unități /UCUM are o opțiune nouă de standardizare a UDUNITS Sfoara.
Acest lucru funcționează bine pentru valid UDUNITS siruri de caractere și destul de bine pentru non-standard / invalid UDUNITS siruri de caractere. De exemplu, de exemplu, UDUNITS "metri pe secundă," "metru/secundă," "m.s^-1" , și "m s-1" va reveni toate "m.s-1." Acest lucru a fost necesar pentru noul standardiza Ce sistem descris mai sus. Mulţumită lui Marco Alba, Margaret O'Brien (și alți utilizatori ai EML) , BCO-DMO și utilizatorii InPort.
         
    * NOU: MASA DE EDD DIN MULTIDIMNCFiles are acum o [tratateDimensionsAs](/docs/server-admin/datasets#treatdimensionsas) optiune, care spune ERDDAP™ pentru a trata anumite dimensiuni (De exemplu, LAT și LON) ca şi cum ar fi alte dimensiuni (DE ex., TIMP) . Acest lucru este util pentru unele fișiere incorecte care folosesc diferite dimensiuni pentru variabile diferite atunci când acestea ar fi trebuit să folosească doar o singură dimensiune (DE ex., TIMP) . Mulţumită lui Marco Alba şi Maurice Libes.
         
    * NOU: Acum, toate EDDGrid De la ... Fişiere seturi de date sprijină o nouă axă specială sourceName care spune ERDDAP™ pentru a extrage informații din denumirea fișierului (doar numele fișierului.) și să utilizeze valoarea **înlocuire** valoarea cea mai stângă a axei existente. Formatul este
        \\*\\*\\*replaceFromFileName,_dataType_,_extractRegex_,_captureGroupNumber_
Vezi? [Această documentație](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) . Mulţumită NOAA Setul zilnic de agregare Pathfinder.
         
    * NOU: Acum, toate EDDGrid De la ... Fişiere seturi de date sprijină o nouă axă specială sourceName care spune ERDDAP™ pentru a extrage informații din numele de cale al fișierului (Dosare + nume fișier.ext)   
        \\*\\*\\*patchName,_dataType_,_extractRegex_,_captureGroupNumber_
Pentru asta, numele căii o foloseşte întotdeauna. '/' ca caracter separator director, niciodată "\\\."
Vezi? [Această documentație](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) . Mulţumită Paloma de la Vallee.
         
    * Acum, toate mesele de la... Seturile de date ale fișierelor susțin o pseudo variabilă suplimentară sourceName s care extrage informații din numele fișierului (doar numele fișierului.)   (Vezi? [\\*\\*\\*FileName](/docs/server-admin/datasets#filename-sourcenames) ) sau din numele complet al fișierului (/dir1/dir2/filename.ext)   (Vezi? [\\*\\*\\*pathName](/docs/server-admin/datasets#pathname-sourcenames) ) . Mulţumită Paloma de la Vallee.
         
    * NOU: Dacă o EDDGrid Setul are una sau mai multe dimensiuni foarte mari (de exemplu, milioane de valori) care preia o mulțime de memorie, puteți seta noul [&lt;dimensionValuesInMemory&gt;] (/docs/server-admin/datesets#dimensionvaluesinmemory) setarea la fals (implicit este adevărat) , care determină setul de date să stocheze valorile pe disc și să le recupereze atunci când este necesar. Mulţumită lui David Rodriguez şi Rich Signell (te: EDDGrid De la AudioFiles) .
         
    * Anterior, dacă ați reordonat dataVariable s pentru un set de date EDDFromFiles și reîncărcat setul de date, tabelul EDDFromFiles va reciti toate fișierele de date. Acum, se poate ocupa cu reordonarea fără a reciti toate fișierele de date. Mulţumită lui Roland Schweitzer.
         
    * Acum, când ERDDAP™ citeste ASCII, NCCSV, si JSON Lines fisiere de date tabulare CSV, daca gaseste o eroare pe o linie data (De exemplu, numărul incorect de articole) , înregistrează un mesaj de avertizare ("WARNING: Skipping line #..." "numar neasteptat de obiecte...") la [fișier log.txt](/docs/server-admin/additional-information#log) şi apoi continuă să citească restul fişierului de date. Astfel, este responsabilitatea ta să te uiţi periodic (sau scrie un scenariu pentru a face acest lucru) pentru mesajul din jurnal. txt astfel încât să puteți rezolva problemele din fișierele de date. ERDDAP™ este configurat astfel încât utilizatorii să poată continua să citească toate datele disponibile valabile, chiar dacă unele linii ale fișierului au defecte. Anterior, ERDDAP™ a marcat fișierul ca fiind "rău" și l-a scos din set.
         
    * IMPROVATĂ: Când sunt timpuri precise (de exemplu, până la cea mai apropiată secundă sau milisecundă) sunt stocate la sursă ca "minute de la..." (sau unități mai mari) , ERDDAP™ Acum le rotunjește la cea mai apropiată milisecundă când citesc valorile în ERDDAP . În caz contrar, numerele punctelor plutitoare sunt zdrobite și cererile de date la anumite momente (De exemplu, &timp=2018-06-15T01:30:00) va eşua. Anterior, le-a calculat cât mai precis posibil (și încă o face dacă unitățile sunt, de exemplu, "secunde de la ..." sau "milisecunde de la ...") . Cel mai bine este să evităm această problemă prin faptul că nu folosim unităţi mari (de exemplu, minute sau ore) pentru a stoca valori precise ale timpului (De exemplu, microsecunde) -- computerele fac o treabă proastă de manipulare zecimală. Mulţumită lui Marco Alba.
         
    * MODIFICĂRI ÎN MATERIE DE EDD EDDGrid ceea ce face mult mai bine. Tabel EDD din EDDGrid permite utilizatorilor să interogheze seturi de date grupate ca și cum ar fi seturi de date tabulare ("Cerință după valoare") .
        
        * Acum susţine&lt;maxAxis0&gt; tag (implicit=10) care specifică numărul maxim de axe \\[ 0 \\]   (de obicei "time" ) valori care pot fi interogate imediat. Acest lucru previne cererile naive de a obţine tabelul EDDDe la EDDGrid pentru a căuta printr-un întreg set de date grilate (care ar eșua cu o eroare timeout) .
        * Generează dateName Xml are acum o opțiune de a genera tabelul EDDDe la EDDGrid Seturi de date pentru toate seturile de date în rețea dintr-o dată ERDDAP™ care se potrivesc cu un regex specificat (Utilizați .\\* pentru a potrivi toate setările de date) . Seturile de date pe care le creează au informații suplimentare în atributul rezumat care indică faptul că aceasta este o versiune tabelară a unui set de date în rețea. Și lor datasetID este datasetID a setului de date grilat, plus "\\_ASATable."
        * Există o viteză mare pentru configurarea cea mai comună: atunci când setul de date grided este un EDDGrid Din setul de date Erddap care este în același ERDDAP .
        
Mulţumită lui James Gallagher şi Ed Armstrong.
         
    * NOU: genera Setări de date Xml pentru toate tipurile de seturi de date este acum mult mai probabil pentru a adăuga un \\_FillValue sau missing\\_value atributul unei variabile numerice addAttributes . De exemplu, acest lucru se întâmplă atunci când markerii de valoare lipsă șir (De exemplu, "," "," "," "?", "NA," "d," "NaN") pentru acea variabilă din fișierul de eșantionare sunt convertite în ERDDAP 's valori lipsă native (127 în coloane octet, 32767 în coloane scurte, 2147483647 în coloane int, 9223372036854775807 în coloane lungi și NaN în variabile plutitoare și duble) . Acesta apare, de asemenea, pentru valorile NaN în variabile floate și duble. De asemenea, "n" a fost adăugat pe lista markerilor comuni care lipsesc din coloanele de date numerice care ERDDAP™ ar trebui să caute. Mulţumită lui Matt Biddle de la BCO-DMO.
         
    * IMPROVED: opțiunea ncdump în generare Setări de date Xml este acum mai mult ca ncdump (dar încă utilizează versiunea netcdf-java a NCdump) . Acum, imprima o noua lista de optiuni. Acum, .nc fişiere ml, printează ieşirea ncdump pentru rezultatul .nc modificări de fișier ml aplicate suportului .nc sau .hdf Dosar.
         
    * BUG FIX: Nu a fost o scurgere mâner fișier (în cele din urmă cauzează ERDDAP™ să îngheţe) cauzate de crearea unor tipuri de fișiere de ieșire, de exemplu, .geotif, în special atunci când au avut loc erori în timpul creării. Sper că acum totul e aranjat. Dacă încă mai vezi probleme, te rog spune-mi tipul de set de date (grilă sau tabel) și tipul de fișier care cauzează problema. Mulţumită lui Steven Beale, Lynn DeWitt, Jibei Zhao şi altora.
         
    * BUG FIX: ă WMS   Leaflet Demo-ul nu a convertit în întregime / în mod corespunzător axa "deep" la "elevație." Acum, o face, și cererile de legendă rupte sunt fixe. De asemenea, toate opțiunile axelor din listele de drop-down sunt întotdeauna în ordine ascendentă sortate. Mulţumită lui Antoine Queric şi Aurelie Briand.
         
    * BUG FIX: EDDTableFromFiles suportă acum corect constrângerile asupra variabilelor String care au fost create din variabilele char din fișierele de date. Mulţumită lui Antoine Queric şi Aurelie Briand.
         
    * BUG FIX: Acum, când un set de date devine indisponibil, setul de date încearcă să notifice (cu mesajul "Acest set de date nu este disponibil în prezent.") abonații săi, acțiunile enumerate, RSS, și seturile de date lonPM180 care se bazează pe aceasta. Mulţumită lui Roy Mendelssohn şi Bob Simons.
         
    * BUG FIX: Două microfoane legate de EDD TableCopy. Mulţumită lui Sam McClatchie.
         
    * IMPROVED: Numărul de cereri eșuate afișate pe pagina status.html va crește deoarece mai multe lucruri sunt considerate ca eșecuri decât înainte.
         
    * Improvizat: ERDDAP Starea lui.html arată acum "Cereri (media ori în ms) " în seria de timp. Anterior, acesta a arătat median ori trunchiate la secunde întregi.
         
    * IMPROVED: În producția Jsonld, Jsonld "nume" vine acum de la setul de date "title" în ERDDAP , și Jsonld "headline" acum vine de la setul de date " datasetID " în ERDDAP . Anterior, a fost inversat. Acest lucru mi se pare greșit pentru că în uzul normal în limba engleză, "numele" este de obicei un scurt, (ideal) identificator unic care rareori/niciodată se modifică (De exemplu, Robert Simons) , nu o descriere care nu este unică și care se poate schimba ușor și adesea (de exemplu, "Un tip care scrie software pentru NOAA Un tip înalt care scrie software pentru NOAA ") . Gee, ar fi grozav dacă definiția schema.org [Nume](https://schema.org/name) , în contextul unui Dataset, au fost mai specifice. Dezvoltatorii de software ar trebui să fie în măsură să scrie o punere în aplicare a unei specificații bazate exclusiv pe caietul de sarcini, fără îndrumarea experților. Dar am amâna la Google (în special Natasha. Noy) , NCEI (în special John Relph) Şi Rob Fuller.
         
    * IMPROVED: În producția Jsonld, cele patru valori "spatialCoverage GeoShape" sunt acum minLat minLon maxLat maxLon. Din episoadele anterioare: Gee, ar fi grozav dacă definiția schema.org [GeoShape](https://schema.org/GeoShape) a specificat ordinea corectă. Dezvoltatorii de software ar trebui să fie în măsură să scrie o punere în aplicare a unei specificații bazate exclusiv pe caietul de sarcini, fără îndrumarea experților. Mulţumită lui Natasha Noy şi Rob Fuller.

## Versiunea 1.82{#version-182} 
 (lansat 2018-01-26) 

*    **Caracteristici noi (pentru utilizatori) :**   
     
    * Numeroase schimbări subtile la aspectul și sentimentul ERDDAP™ pagini web.
        * Improvizat: ERDDAP™ Acum folosește HTML 5 și utilizează mai bine CSS.
        * Paginile web au fost ușor modificate pentru a le face mai curate și mai puțin "ocupate." (Ele sunt încă dense și există încă lucruri pe care le-ar putea plânge despre, dar sperăm mult mai puțin decât înainte.) Mulţumită lui John Kerfoot pentru câteva comentarii.
        * Paginile web arată mult mai bine pe telefoanele mobile și pe alte dispozitive mici, în special dacă le folosiți în orientarea peisajului. De asemenea, arată mai bine în ferestre foarte mici și foarte mari în browserele desktop.
        * IMPROVED: Pentru a îmbunătăți securitatea și alte motive, utilizarea unei versiuni Openlayers învechite pentru WMS Paginile demonstrative au fost înlocuite cu Leaflet .
        * NOU: suport pentru previzualizări de imagini, audio, și fișiere video în "files" sistem (de exemplu, [acest set de date de încercare](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/) ) și în .htmlTable răspunsuri atunci când o celulă are URL-ul unei imagini, fișiere audio sau video (de exemplu, [Această cerere](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22) ) . Dacă planați peste o pictogramă '?', ar trebui să vedeți o imagine, audio, sau previzualizare fișier video. De asemenea, puteți face clic pe link-ul de fișier pentru a vedea fișierul ecran complet în browser-ul tău. Vezi [Documentație fișiere media](/docs/server-admin/datasets#media-files) . Rețineți că diferite browsere suportă diferite tipuri de fișiere, astfel încât exemplele să nu funcționeze în browser-ul dumneavoastră.
Datorită acestor persoane / link-uri pentru idei și codul de eșantion pentru CSS-numai instrumente de imagine (a fost lahttps://codepen.io/electricalbah/pen/eJRLVd) și încărcare de imagini amânate (a fost lahttps://varvy.com/pagespeed/defer-images.html)   (cu toate că codul a fost modificat înainte de utilizare ERDDAP ) .
Datorită Cara Wilson, Matthew Austin, și Adam Shepherd / BCO-DMO pentru cereri de sprijin imagine.
Datorită Jim Potemra, Rich Signell, OOI, și Carrie Wall Bell pentru cereri de suport fișiere audio/hidrofon.
Datorită OOI pentru a arăta nevoia de suport video.
        * NOU: Un subset de date de la orice ERDDAP™ Set de date (dar, de obicei, un set de date din fișiere audio) poate fi acum salvat într-un fișier audio .wav. ( [documentația](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav) ) Datorită Jim Potemra, Rich Signell, OOI, și Carrie Wall Bell pentru cereri de suport fișiere audio/hidrofon.
        * IMPROVED: Formatul pentru dosarele accesibile Web (WAF)   (de exemplu, fișierele/dosarele) a fost actualizat pentru a utiliza un tabel HTML. Noul format imită versiunea mai recentă a paginilor web de listare director create de versiuni mai recente ale Apache. Oamenii vor constata că schimbările facilitează citirea informaţiilor. Software care parseaza aceste documente (de exemplu, software care recoltează documente ISO 19115 de la ERDDAP ) va trebui revizuit, dar noul format va fi mai ușor de analizat decât formatul anterior. (Atenţie, Anna Milan.) 
        * NOU outOfDateDatasets.html pagina. ( [exemplu](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) ) Această pagină web prezintă un tabel cu toate seturile de date în timp aproape real care au un&lt; testOutOfDate &gt; etichetă (vezi mai jos) , clasificate după modul în care seturi de date sunt depășite. Acest bord ar trebui să fie util pentru ERDDAP™ administratorii și utilizatorii finali atunci când doresc să știe ce seturi de date sunt depășite. Pentru seturile de date expirate, există probabil o problemă cu sursa de date, astfel încât ERDDAP™ nu poate vedea/obține date din puncte de timp mai recente.
Administratori: Dacă nu doriți o pagină web Out-Out-Of-Date Datasets, adăugați acest lucru la setup.xml:
            &lt;OutofDatesetsActive&gt;fals&lt;/outofDatesetsActive&gt;
Există acum testOutOfDate și afară OfDate coloane în allDatasets Set de date.
Mulțumită lui Bob Simons, care a vrut acest lucru de ani de zile, și oamenilor inteligenți ai Institutului de Marină din Irlanda care mi-a dat inspirația prin intermediul lor dedicat Raspberry Pi și monitor care arată întotdeauna un ecran ca acesta în biroul lor.
        * Improvizat: .htmlTable şi .xhtml răspuns sunt acum mai bine formatate, mai compacte, și astfel încărcați mai repede. Datorită HTML5 și CSS.
    * NOU tip de fișier de ieșire pentru seturile de date Griddap: .timeGaps. Aceasta arată o listă de lacune ale valorilor timpului care sunt mai mari decât decalajul median. ( [exemplu](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps) ) Acest lucru este util pentru ERDDAP™ administratorii și utilizatorii finali atunci când doresc să știe dacă există lacune neașteptate în valorile de timp pentru un set de date care este de așteptat să aibă în mod regulat valori ale timpului șters. Mulţumită lui Bob Simons şi Roy Mendelssohn care aveau nevoie de această caracteristică.
    * IMPROVED: Graficul implicit pentru allDatasets Setul de date este acum o hartă cu x=maxLon și y=maxLat. Mulţumită lui John Kerfoot, Rich Signell şi OOI-CI.
    * NOU: [erddapy](https://github.com/ioos/erddapy) - nu este un ERDDAP™ caracteristică, dar va fi de interes pentru mulți ERDDAP™ utilizatori. Erddapy ( ERDDAP™ + Python ) este Python biblioteca creata de Filipe Fernandes care " profita de ERDDAP 's RESTful servicii web și creează ERDDAP™ URL pentru orice cerere precum căutarea seturilor de date, achiziționarea metadatelor, descărcarea datelor etc." Mulţumită lui Filipe Fernandes.
    * Ar fi trebuit să menţionez înainte: Există un pachet R terţ conceput pentru a facilita lucrul cu ERDDAP™ din cadrul R: [rerddap](https://github.com/ropensci/rerddap#rerddap) . Mulţumită [rOpenSci](https://ropensci.org/) şi Roy Mendelssohn.
         
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:**   
     
    * TO DO: În setup.xml, chiar mai jos&lt;adminInstitution&gt;, vă rugăm să adăugați o&lt;adminInstitutionUrl&gt; tag care specifică un URL pentru instituția dumneavoastră (sau grup) .
    * Aceste 3 etichete în setup.xml nu mai sunt folosite:
        &lt;Start HeadHtml&gt;,&lt;StartBodyHtml&gt; și&lt;EndBodyHtml&gt;. Acestea sunt înlocuite cu
        &lt;StartHeadHtml5&gt;,&lt;StartBodyHtml5&gt; și&lt;endBodyHtml5&gt;, care au valori implicite specificate în mesaje.xml (şi prezentate mai jos) .
        
Vă recomandăm utilizarea implicit&lt;StartHeadHtml5&gt; și&lt;EndBodyHtml5&gt;.
Vă recomandăm: Dacă ați făcut modificări la originalul&lt;StartBodyHtml&gt; și/sau doriți să personalizați ERDDAP™ Acum, vă rugăm să copiați noul&lt;startBodyHtml5&gt; tag (de mai jos) în setup.xml și modificați-l pentru a personaliza dvs. ERDDAP™ astfel încât ERDDAP Paginile web reflectă organizaţia ta, nu NOAA   ERD . În mod special, vă rugăm să modificați "Adus pentru tine de" la organizația dumneavoastră (s) . Dacă aveți nevoie de ajutor, vă rugăm să e-mail erd.data at noaa.gov . (Dacă nu doriți să personalizați dvs. ERDDAP™ Acum, utilizați implicit&lt;StartBodyHtml5&gt;.)
        
Apoi ștergeți cele 3 etichete vechi din setup.xml care nu mai sunt utilizate.

```
        <startBodyHtml5><!\\[CDATA\\[ 
        <body>
        <table class="compact nowrap" style="width:100%; background-color:#128CB5;"> 
          <tr> 
            <td style="text-align:center; width:80px;"><a rel="bookmark"
              href="https://www.noaa.gov/"><img 
              title="National Oceanic and Atmospheric Administration" 
              src="&erddapUrl;/images/noaab.png" alt="NOAA"
              style="vertical-align:middle;"></a></td> 
            <td style="text-align:left; font-size:x-large; color:#FFFFFF; ">
              <strong>ERDDAP</strong>
              <br><small><small><small>Easier access to scientific data</small></small></small>
              </td> 
            <td style="text-align:right; font-size:small;"> 
              &loginInfo; &nbsp; &nbsp;
              <br>Brought to you by 
              <a title="National Oceanic and Atmospheric Administration" rel="bookmark"
              href="https://www.noaa.gov">NOAA</a>  
              <a title="National Marine Fisheries Service" rel="bookmark"
              href="https://www.fisheries.noaa.gov">NMFS</a>  
              <a title="Southwest Fisheries Science Center" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/southwest-fisheries-science-center">SWFSC</a> 
              <a title="Environmental Research Division" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center">ERD</a>  
              &nbsp; &nbsp;
              </td> 
          </tr> 
        </table>
        \\]\\]></startBodyHtml5>
```

Există şi alte modalităţi prin care poţi [personalizează ERDDAP™ ](/docs/server-admin/deploy-install#customize) Deci... ERDDAP Paginile web reflectă organizaţia ta în loc de NOAA   ERD .
        
    * DE FACUT:&lt; EDDGrid ...Example&gt; tag-uri (începând cu&lt; EDDGrid IdExample&gt; și&lt;Tabel EDD... Exemplu &gt; etichete (începând cu&lt;EDD TableIdExample&gt;) în fișierul setup.xml sunt folosite pentru a crea exemple în griddap și tabledap documentația. pagini web html în ERDDAP .
        
Dacă nu ați personalizat aceste etichete, vă rugăm să le ștergeți din fișierul setup.xml. Acum toate acestea au implicit în mesaje.xml care se referă la seturi de date în Bob ERDDAP™ lahttps://coastwatch.pfeg.noaa.gov/erddap/index.html. Deci, nu mai trebuie să aveți seturi de date specifice în dumneavoastră ERDDAP . Dacă doriți să suprascrieți implicits, copia unele sau toate aceste etichete în setup.xml și modifica valorile lor.
Dacă doriți ca exemplele să indice la dvs. ERDDAP™ Cea mai uşoară metodă este:
        
        1. Includeţi aceste două seturi de date în ERDDAP™ prin adăugarea acestui la dumneavoastră datasets.xml :
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Adăugați această etichetă la setup.xml, dar schimba URL-ul la dvs. ERDDAP 's ( https ?) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Dacă ați personalizat aceste etichete, lăsați-le așa cum este și vă rugăm să adăugați aceste 2 etichete noi la setup.xml pentru a specifica ERDDAP™ URL pentru aceste seturi de date, dar schimba URL-ul la dvs. ERDDAP 's ( https ?) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * DE FACUT: ERDDAP™ Acum foloseşte un fişier CSS numit erddap2.cs. Dacă ați făcut modificări la \\[ Tomcat \\] /webapps/erddap/images/erddap.css, ia în considerare efectuarea unor modificări similare la erddap2.css (în același director) .
    * NOU: ERDDAP Paginile web au acum un număr mare de legături interne aproape invizibile. (textul este negru și nu este subliniat) . Dacă treci peste una din aceste legături (de obicei, primele câteva cuvinte ale rubricilor și paragrafelor) , cursorul devine o mână. Dacă dați click pe link, URL-ul este link-ul intern către acea secțiune a documentului. Acest lucru face mai ușor să se refere la anumite secțiuni ale documentației. Mulţumită lui Bob Simons, care a vrut asta ani de zile.
    * NOU: ERDDAP™ acum sprijină [Range octet / Accept-ranges](https://en.wikipedia.org/wiki/Byte_serving) cereri de porțiuni de fișiere / fișiere. Acest lucru a fost necesar pentru a sprijini telespectatorii audio și video în browsere.
    * Pentru a îmbunătăţi securitatea, dacă aţi specificat&lt;bazăHttpsUrl&gt; în configurare.xml (și astfel să sprijine https ) , steagul recomandat Url este un https URL cu un steag mai sigur. Dacă da, orice pavilion anterior Urls/flagKeys va deveni invalid. Admins: Dacă aceste modificări sunt valabile pentru dumneavoastră ERDDAP™ şi dacă ERDDAP™ a EDDGrid De la Erddap și tabelul EDD De la Erddap care subscrie la distanță ERDDAP S, atunci, după ce actualizați ERDDAP , dumneavoastră ERDDAP™ va încerca automat să se aboneze cu noul pavilionUrl, astfel încât ar trebui să ștergeți vechile abonamente și valida noile abonamente atunci când veți obține noile e-mailuri de validare abonament.
    * DE FACUT: Dacă dumneavoastră ERDDAP™ a EDDGrid Seturi din Erddap pentru seturi de date ErdVH3 pe ceasul de coastă al lui Bob ERDDAP™ , vă rugăm să le modificați pentru a face trimitere la noile seturi de date ErdVH2018.
    * TO DO: Dacă includeți oricare dintre setările de date ale eșantionului JplAquariusSSS în ERDDAP™ , vă rugăm să modificaţi "V4" în datasetID E la "V5."
    * DE FACUT: actual\\_range este acum un atribut standard CF (la nivelul CF-1,7) și în mod clar spune că, dacă variabila folosește add\\_offset și/sau scale\\_factor pentru a împacheta valorile datelor, apoi actual\\_range valorile trebuie să utilizeze tipul de date despachetate și să fie despachetate. Din păcate, acest lucru intră în conflict cu sfatul nostru anterior. Generează dateName Xml despachetează acum actual\\_range valori, dar care nu va stabili seturi de date existente în dumneavoastră datasets.xml Dosar.
        
Vă rugăm să verificați seturile de date: dacă valorile unei variabile sunt ambalate și dacă actual\\_range este specificat ca valori ale datelor ambalate, adăugați o&lt; addAttributes &gt; actual\\_range valoarea pentru a specifica valorile despachetate. În caz contrar, setul de date nu se încarcă ERDDAP . Un mod simplu și aproape perfect de a face acest lucru este de a căuta dvs. datasets.xml pentru sursă Atribute care au
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
şi scale\\_factor altele decât 1.0. Acestea sunt actual\\_range atribute pe care s-ar putea să trebuiască să le repari.
        
Pentru variabilele axei în EDDGrid seturi de date; ERDDAP™ întotdeauna setează actual\\_range atribut pentru a fi gama reală a valorilor, deoarece cunoaște aceste valori.
        
Pentru variabilele axei cu valori descendente (De exemplu, unele variabile de latitudine) , ERDDAP™ create actual\\_range cu \\[ 0 \\] ... \\[ ultima \\] valori, care au fost ridicate ... scăzut. Acum foloseşte întotdeauna valori scăzute... înalte pentru a face noua definiţie a CF.
        
Corectitudinea actual\\_range valorile sunt deosebit de importante pentru seturile de date ale tabelului EDD, deoarece ERDDAP™ va respinge rapid cererile utilizatorilor pentru valori ale datelor mai mici decât actual\\_range valoarea minimă sau care sunt mai mari decât valoarea actual\\_range valoarea maximă.
        
Legate: actual\\_min, actual\\_max, data\\_min şi data\\_max atributele sunt acum depreciate. Vă rugăm să convertiți setările de date pentru a utiliza actual\\_range În schimb.
        
    * DE FACUT (opțională, dar recomandată) : Pentru fiecare set de date în timp aproape real și prognozat în ERDDAP™ , vă rugăm să adăugați un [&lt; testOutOfDate &gt;] (/docs/server-admin/sets#testofdate) etichetă cu o valoare în formă now- _NUnits_, de exemplu, now- 2 zile. Dacă valoarea maximă a timpului pentru setul de date este mai mare decât valoarea respectivă, setul de date este considerat depășit și va fi marcat ca atare pe [ outOfDateDatasets.html ](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) Pagina web. Acest lucru vă oferă o modalitate ușoară de a vedea când ceva este în neregulă cu sursa unui set de date.
    *    [NOU: Markup semantic de date cu json-ld (JSON Date legate) ](/docs/server-admin/additional-information#json-ld)   
         ERDDAP™ acum folosește [Json-ld (JSON Date legate) ](https://json-ld.org) pentru a face catalogul de date și seturi de date parte a [web semantic](https://en.wikipedia.org/wiki/Semantic_Web) , care este ideea lui Tim Berners-Lee de a face conținutul web mai ușor de citit și mașină "de înțeles." Motoare de căutare ( [Google în special](https://developers.google.com/search/docs/data-types/datasets) ) și alte instrumente semantice pot folosi acest marcaj structurat pentru a facilita descoperirea și indexarea. Markup-ul structurat Json apare ca invizibil-la-oameni&lt;script&gt; codulhttp://.../erddap/info/index.htmlpagina web (care este un web semantic [DataCatalog](https://schema.org/DataCatalog) ) şi pe fiecarehttp://.../erddap/info/_datasetID_/index.htmlpagina web (care este un web semantic [Set de date](https://schema.org/Dataset) ) . (Mulțumiri speciale pentru Adam Leadbetter și Rob Fuller de la Institutul Marine din Irlanda pentru a face partea grea a muncii pentru a face această parte din ERDDAP .) 
    * NOU: Există noi tipuri de seturi de date care pot citi date din fișiere audio:
         [ EDDGrid De la AudioFiles](/docs/server-admin/datasets#eddfromaudiofiles) , care tratează datele audio ca date în rețea.
         [Tabel EDD din fișiere audio](/docs/server-admin/datasets#eddfromaudiofiles) , care tratează datele audio ca date tabulare. Datorită Jim Potemra, Rich Signell, OOI, și Carrie Wall Bell pentru cereri de suport fișiere audio/hidrofon.
    * Modificări ale datelor generate Xml (și modificările aferente) :
        * NOU: ERDDAP™ acum are un sistem automat [Actualizează URL-urile în afara datei](/docs/server-admin/additional-information#out-of-date-urls) atât în GenerateDatasets Xml și la încărcarea seturilor de date. Dacă aveți sugestii pentru URL-uri suplimentare care ar trebui să fie capturate și actualizate, sau dacă credeți că acest lucru ar trebui să fie transformat într-un serviciu (ca Convertorii) , vă rugăm să e-mail erd.data at noaa.gov .
        * NOU: Acum, dacă GenereazăDateName Xml vede un CF standard\\_name   (care ar trebui să fie toate cele mici) cu un caracter superior, se adaugă toate versiunea de jos la&lt; addAttributes &gt;. De asemenea, atunci când un set de date se încarcă, dacă ERDDAP™ vede un CF standard\\_name cu un caracter superior, se schimbă în tăcere la standard\\_name . Mulţumită lui Rich Signell.
        * NOU: Acum, dacă GenereazăDateName Xml vede un atribut cu un timp care nu este în format ISO 8601, adaugă timpul formatat ISO 8601 la&lt; addAttributes &gt;. Dacă ERDDAP™ Nu recunoaşte formatul, lasă timpul neschimbat. Dacă vedeți un format care ERDDAP™ Nu recunoaşte şi nu repară, te rog trimite-l prin e-mail. erd.data at noaa.gov .
        * IMPROVED: Codul de nivel scăzut pentru EDDGrid Din trei mii Opţiune catalog în GenerateDateName Xml se bazează acum pe Unidata cod netcdf-java catalog crawler (Trei. clase de catalog) astfel încât să se poată ocupa de toate cataloagele TREDDS (care poate fi surprinzător de complex) . Datorită Roland Schweitzer pentru a sugera această schimbare și datorită Unidata pentru cod.
        * NOU: Generează date Xml pentru EDDGrid FromDap adaugă acum ", începe an-sfârșit" la sfârșitul titlului pe baza valorilor reale ale axei temporale. EndYear="prezent" dacă există date în ultimele 150 de zile.
        * NOU: Generează date Xml pentru EDDGrid FromDap adaugă: " \\[ rezoluție \\] °" la titlu dacă setul de date este uniform distanţat şi acelaşi lucru pentru lat şi ln.
        * IMPROVED: Convertorul de timp are acum caracteristici suplimentare, în special capacitatea de a converti timpii stringurilor într-o gamă largă de formate comune în șiruri de caractere ISO 8601 sau într-un număr compatibil cu UDUnits. Toate caracteristicile susţinute anterior continuă să funcționeze, neschimbate.
        * BUG FIX: Generează date Xml și convertorul de cuvinte cheie includ acum "Earth Science &gt; " la începutul GCMD Science Keywords. Atunci când un set de date este încărcat ERDDAP™ , ERDDAP™ Acum fixează orice cuvinte cheie GCMD în atributul cuvinte cheie care nu începe cu "Earth Science &gt; " sau care folosesc orice altceva decât titlu (unde prima literă a fiecărui cuvânt este capitalizată) .
        * Atunci când sugerează:&lt; destinationName &gt; datele generate Xml pentru tabelul EDDFromAsciiFiles a folosit doar capătul cozii sourceName s cu '/'   (unele au fost nume de fișier ca) . Acum foloseşte întregul sourceName (de exemplu, "blahblah (m/s) ." Această schimbare va fi bună pentru unele seturi de date și nu pentru altele, dar este un comportament mai sigur. Mulţumită lui Maurice Libes.
        * BUG FIX: Generează date Xml și constructorii de seturi de date se asigură acum că nu există nume duplicate ale coloanei. Mulţumită lui Maurice Libes.
        * BUG FIX: Generează date Xml pentru tabelul EDD Din AsciiFiles nu a scris&lt;coloanaSeparator&gt; la ieșire. Acum da. Mulţumită lui Maurice Libes.
    * NOU: Instrumentul DasDds tipărește acum informații despre decalajul de timp (nu [.timeGaps informaţii](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps) ) în cazul în care setul de date este un set de date în rețea.
    * NOU: Căutare avansată acceptă acum valorile timpului "now_\\-nUnits_." Mulţumită lui Rich Signell.
    * IMPROVED: Pentru a îmbunătăți securitatea, atunci când o adresă de e-mail din metadatele sau datele unui set de date este scrisă pe o pagină web html, "@" se înlocuiește cu " la ." Acest lucru surprinde doar adrese de e-mail care sunt întregul metadate sau valoarea datelor, nu adrese de e-mail încorporate în valori mai lungi.
    * IMPRUMUT: pentru a spori securitatea, RSS informații pentru seturile de date private sunt acum disponibile numai utilizatorilor (şi RSS cititori) care sunt înregistrate și autorizate să utilizeze setul de date respectiv.
    * NOU: Acum, când un set de date este încărcat, dacă date\\_created , date\\_issued , date\\_modified , sau data\\_metadate\\_modified atribute are o valoare a timpului care nu este în formatul ISO 8601; ERDDAP™ îl modifică în timpul formatat ISO 8601. Dacă ERDDAP™ Nu recunoaşte formatul, lasă timpul neschimbat. Dacă vedeți un format care ERDDAP™ Nu recunoaşte şi nu repară, te rog trimite-l prin e-mail. erd.data at noaa.gov .
    * .dods raspunsuri de la EDDGrid Seturile de date ar trebui să fie acum mult mai rapide. Mulţumită lui Rich Signell.
    * Modificări legate de ERDDAP "crearea documentelor ISO 19115:
        * BUG FIX: atunci când se creează documente ISO 19115; dataVariable unitățile nu au fost HTML Attribute codificate și la sută codificate. Acum sunt. Datorită validatorului NGDC ISO 19115.
        * BUG FIX: atunci când se creează documente ISO 19115; date\\_created a fost folosit așa cum este, atât de des a fost format greșit. Acum este convertit în șir ISO 8601 Z. Datorită validatorului NGDC ISO 19115.
        * BUG FIX: atunci când se creează documente ISO 19115; ERDDAP™ acum mai mult scrie date cu anul=0,000 (la fel ca în cazul seturilor de date privind climatologia) , pentru că schema ISO 19115 nu permite datele cu anul=0,000. Datorită validatorului NGDC ISO 19115.
    * NOU: Ca înainte de o cerere la http .../erddap/versiune va returna doar numărul versiunii (ca text) , de exemplu, " ERDDAP \\_versiune=1.82."
Acum, o cerere http .../erddap/versiune\\_string va returna un număr și un sufix opțional de "\\_" plus textul ASCII (fără spații sau caractere de control) , de exemplu, " ERDDAP Johns Fork. Oamenii care fac furculita va specifica acest lucru prin schimbarea EDStatic.erddapVersion. Acest mod de a face acest lucru nu cauzează probleme pentru versiunile anterioare ale ERDDAP . Mulţumită lui Axiom (Mai ales, Kyle Wilcox) și Institutul Marinei din Irlanda (în special, Rob Fuller) .
    * BUG FIX: Pentru versiunea WMS=1.3.0, cerere= GetMap , crs=EPSG:4326 (nu SIR:84) cereri: comanda bbox trebuie să fie minLat,minLon,maxLat,maxLon. Pentru SIR:84 cereri, ca înainte, comanda bbox trebuie să fie minLon,minLat,maxLon,maxLat. Acest lucru poate rezolva utilizarea ERDDAP 's WMS 1.3.0 service în ArcGIS   (Mulţumită lui Paola Arce) . Mulţumesc. (nu) la OGC pentru a face acest lucru atât de complicat. Mulţumită Leaflet pentru a rezolva corect şi pentru a-mi oferi o cale de a testa asta.
    * IMPROVED: Anterior, link-ul sugerat pentru RSS și abonamente de e-mail are http URL pentru adresa dumneavoastră ERDDAP . Acum este https URL, dacă este activ.
    * NOU: EDDGrid Copiază acum suportă o etichetă opțională&lt;Numai de la &gt;_someValue_&lt;/doar începând cu &gt;, în cazul în care valoarea este un timp specific format ISO-8601 sau a now- nuniți (de exemplu, now- 2 ani) Timpul. Vezi [numai Din moment ce documentația](/docs/server-admin/datasets#onlysince) . Mulţumită lui Drew P.
    * IMPRUMUT: Dacă este disponibil, ERDDAP™ va arăta https URL (din&lt;bazăHttpsUrl&gt;, dacă este disponibil) în loc de http URL-ul atunci când spune utilizatorilor URL-ul pentru a adăuga/valida/elimina/lista un abonament.
    * BUG FIX: ERDDAP™ permite acum o acțiune de abonament pentru a începe cu "https://". (Bob pălmuieşte fruntea.) Mulţumită lui Jennifer Sevadjian.
    * BUG FIX: .jsonlKVP acum folosește ":" între fiecare cheie și valoare, în loc de '=' . (Bob pălmuieşte fruntea.) Mulţumită lui Alexander Barth.
    * BUG FIX: Anterior, dacă aţi reluat ERDDAP™ cu quickRestart=adevărat, și dacă, înainte ca setul de date să fie reîncărcat în mod normal, ați făcut un apel la un set de date EDDFromFiles care a folosit updateEveryNMillis, iar dacă un fișier de date ar fi fost doar schimbat, cererea ar fi eșuat cu o eroare pointer nulă. Acum cererea va reuşi. Mulţumită lui John Kerfoot.
    * NOU: Când un set de date este încărcat în ERDDAP™ , cuvintele cheie sunt acum rearanjate în ordine sortate și orice caractere de linie nouă sunt eliminate.
    * Acum, dacă un .geoJson, .json sau .nc cererea oJson are .json parametru p, tipul de mimă de răspuns este aplicație/javascript. Notă: .json p nu este suportat pentru .jsonlCSV sau .jsonlKVP , din moment ce nu ar funcționa. Mulţumită lui Rob Fuller.
    * IMPROVED: Tipul de mim pentru fileType lines json este acum "application/x-jsonlines." A fost aplicatie/jsonl. În prezent, nu există o alegere corectă definitivă.
    * IMPROVED: Numărul de cereri eșuate afișate pe pagina status.html va crește, deoarece mai multe lucruri sunt considerate ca eșecuri decât înainte, de exemplu, ClientAbortException.
    * Acum, dacă un răspuns de la ERDDAP™ nu este comprimat, apoi antetul răspunsului va include "Content-Encoding"="identitate."
    * Atributul "licență" nu a fost necesar. Acum, dacă nu este specificat, standardulLicense de mesaje.xml (sau de la setup.xml dacă este prezent) este utilizat ca implicit.
    * NOU: Există acum o opțiune [AccessSuffix atribut](/docs/server-admin/datasets#fileaccessbaseurl) . care pot fi utilizate cu cele existente [Atribut fileAccessBaseUrl](/docs/server-admin/datasets#fileaccessbaseurl) .
    * Pentru a spori securitatea, această versiune a fost compilată cu cele mai recente Java JDK v8u162.
    * NOU: Pentru a spori securitatea, mai multe domenii comune care oferă adrese de e-mail temporare (de exemplu, @mailinator.com) sunt acum pe o listă neagră de e-mail permanentă pentru sistemul de abonamente.
    * NOU: Pentru a spori securitatea, punctele slabe din raportul zilnic includ acum:
SetDataset Adresa IP a pavilionului a eșuat (de la ultimul raport zilnic)   
SetDataset Adresa IP a pavilionului a eșuat (de la pornire)   
SetDataset Adresa IP a pavilionului a reușit (de la ultimul raport zilnic)   
SetDataset Adresa IP a pavilionului a reușit (de la pornire)   
The "Failed" tallies vă permit să vedeți cine (Un hacker?) încearcă să stabilească un steag, dar nu reuşeşte.
    * IMPROVED: Pentru a spori securitatea, adrese de e-mail în&lt;abonareEmailBlacklist&gt; in your datasets.xml sunt acum considerate a fi insensibile la caz.
         

## Versiunea 1.80{#version-180} 
 (lansat 2017-08-04) 

*    **Caracteristici noi (pentru utilizatori) :**   
     
    * NOU orderByCount  () filtru vă permite să specificaţi modul în care tabelul de rezultate va fi sortate (sau nu) și doar returnează câte un rând pentru fiecare grup, cu numărul de valori care nu lipsesc pentru fiecare variabilă.
De exemplu, orderByCount  (" stationID ") va sorta după stationID şi întoarce câte un rând pentru fiecare stationID , cu o numărătoare a numărului de valori care nu lipsesc pentru fiecare variabilă.
Dacă ați specifica doar orderByCount  (") , răspunsul va fi doar un rând cu numărul de non-valori lipsă pentru fiecare variabilă de date.
Vezi [ orderBy ... documentația](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy) Mulţumită lui Ben Adams.
    * NOU .nc fișier oJson Opţiune tip pentru seturile de date grilate şi tabulare. Această opțiune face o NCO lvl=2 "pedantic" JSON fişier cu toate informaţiile găsite în mod normal în a .nc Dosar. Vezi? [http://nco.sourceforge.net/nco.html#json](https://nco.sourceforge.net/nco.html#json) Mulţumită lui Charlie Zender.
    * BUG FIX: ă orderBy ... () opțiunile de pe pagina web Make A Graph sunt acum tratate corect.
    * BUG FIX: .geoJson de ieșire acum nu imprima rânduri în cazul în care valorile lat sau lon lipsesc. De asemenea, valorile de altitudine (dacă este disponibil) sunt acum incluse în coordonate, nu ca valori de date. Mulţumită lui Jonathan Wilkins.
         
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:**   
     
    * EMISIE DE SECURITATE: Biblioteca protocoale.js utilizate pentru OpenLayers Demo pe WMS pagini în ERDDAP™ este expirat și are un virus care poate permite utilizarea abuzivă a acestuia. (Din păcate, actualizarea OpenLayers şi protocoale. JS nu este ușor.) Asta deschide posibilitatea ca biblioteca să poată fi creată pentru a permite o vulnerabilitate încrucişată. Cu toate acestea, deoarece ERDDAP™ numai utilizări OpenLayers într-un mod prestabilit specific și numai cu specific ERDDAP -surse de date bazate pe date, credem că nu există vulnerabilitate la faţa locului ERDDAP 's utilizarea OpenLayers și protocoale.js. Cu toate acestea, dacă nu crezi acest lucru, puteți dezactiva acum utilizarea OpenLayers Demo pe WMS pagini ale paginilor ERDDAP™ prin adăugarea
```
        <openLayersActive>false</openLayersActive>  
```
la fișierul setup.xml. Implicit este "adevărat." Mulţumită lui Charles Carleton şi NCEI.
    * MODIFICĂRI DE SECURITATE: Fișiere .jar neutilizate și duplicate fișiere .jar (deoarece acestea sunt, de asemenea, în netcdfAll.jar) au fost eliminate din ERDDAP™ distribuţie. Fișierele .jar expirate au fost actualizate. Mulţumită lui Charles Carleton şi NCEI.
    * MODIFICĂRI DE SECURITATE: Fișierul netcdfall.jar distribuit cu ERDDAP™ este ultima versiune (în prezent 4.6.10) , dar încă conține fișiere interne Jackson .jar care sunt cunoscute a fi depășite și au vulnerabilități de securitate, în special bibliotecile Jackson care sunt utilizate doar atunci când accesează surse de date Amazon S3. Dacă nu accesați date prin intermediul Amazon S3 (Ai şti dacă ai fi) Aceste vulnerabilităţi nu sunt relevante.
        
Prin urmare, Comisia consideră că, în conformitate cu articolul 107 alineatul (3) litera (c) din Tratatul privind funcționarea Uniunii Europene, nu există motive întemeiate să se considere că LuxOpCo nu ar trebui să fie considerată ajutor de stat. Vezi? [https://github.com/Unidata/thredds/issues/866](https://github.com/Unidata/thredds/issues/866) . Îi cred. Dacă mai aveți preocupări cu privire la acest lucru, vă rugăm să contactați dezvoltatorii netcdf-java. (Rețineți că, dacă nu credeți dezvoltatorii netcdf-java și se gândesc să nu folosească ERDDAP™ Din acest motiv, nu ar trebui să utilizați THREDDS, fie, deoarece THREDDDS utilizează netcdf-java mai fundamental și mai extensiv decât ERDDAP .) 
        
Detalii: Codul supărător şi avertismentele de vulnerabilitate sunt:
netcdfall-ultimul.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml
Vezi?https://nvd.nist.gov/vuln/detail/CVE-2016-7051-- Ridicat
netcdfAll-ultimul.jar/META-INF/maven/com.fasterxml.jackson.dataformat/jackson-dataformat-cbor/pom.xml
Vezi?https://nvd.nist.gov/vuln/detail/CVE-2016-7051-- Ridicat
netcdfAll-ultimul.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-annotations/pom.xml
Vezi?https://nvd.nist.gov/vuln/detail/CVE-2016-7051-- Ridicat
Vezi?https://nvd.nist.gov/vuln/detail/CVE-2016-3720- Critic
netcdfall-ultimul.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml
Vezi?https://nvd.nist.gov/vuln/detail/CVE-2016-7051-- Ridicat
Vezi?https://nvd.nist.gov/vuln/detail/CVE-2016-3720- Critic
"For version 4.6.10, aws-java-sdk-core pulls in version 26.6 of jackson-\\* artefacts." (e-mail de la oameni netcdf-java) .
Mulţumită lui Charles Carleton şi NCEI.
        
    * SCHIMBĂRI DE COMPILARE: Dacă recompilaţi ERDDAP™ , rețineți că parametrul clasapat CP necesar pentru linia de comandă este acum mult mai scurt decât înainte. A se vedea noul -cp setarea în [Această documentație](/docs/contributing/programmer-guide#development-environment) . Mulţumită lui Charles Carleton şi NCEI.
    * NOUA OPŢIUNE în setul de date Generate Xml: EDDtableFromBcodmo, care este doar pentru uz intern la BCO-DMO.
Mulţumită lui Adam Shepherd şi BCODMO.
    * NOU ATRIBUT ȘI FEATURĂ: Dacă o coloană a tabelului EDD are nume de fișiere web accesibile (De exemplu, imagini, video sau fișiere audio) , puteți adăuga
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
pentru a specifica URL-ul de bază (se încheie cu /) necesare pentru a face numele de fișier în URL-uri complete. Atunci pentru .htmlTable răspunsuri; ERDDAP™ va arăta numele fișierului ca un link către URL-ul combinat (baza Url plus numele fișierului) .
Dacă vrei ERDDAP™ pentru a servi fișierele aferente, face un set de date EDDTableFromFileNames separat pentru aceste fișiere (poate fi un set de date privat) .
Mulţumită lui Adam Shepherd şi BCODMO.
    * RECOMANDARE NEW ATTRIBUTE: În cazul în care o coloană EDD Table are nume de fișiere web accesibile (De exemplu, imagini, video sau fișiere audio) care sunt accesibile prin intermediul unei arhive (de exemplu, .zip fișier) accesibil printr-un URL, utilizare
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
pentru a specifica URL-ul pentru arhivă.
Dacă vrei ERDDAP™ pentru a servi fișierul arhivă, face un set de date EDDTableFromFileNames separat pentru acel fișier (poate fi un set de date privat) .
Mulţumită lui Adam Shepherd şi BCODMO.
    * IMPRUMUTII la generarea datelor Xml pentru a elimina cauzele de invalid / rău&lt; subsetVariables &gt; sugestii şi duplicate/recomandate nume variabile etc. Mulţumită lui Rich Signell, Adam Shepherd şi BCO-DMO.
    * Noua opţiune: Informaţiile privind graniţele politice distribuite cu ERDDAP este de la un terț și oarecum învechit. De asemenea, există limite disputate în mai multe locuri din lume, unde diferite persoane vor avea idei diferite despre ceea ce este corect. Nu ne bazăm pe corectitudinea datelor politice care vin cu ERDDAP . Dacă nu vă place informaţia politică care vine cu ERDDAP™ Acum îţi poţi da seama. ERDDAP™ să nu atragă niciodată limite politice prin adăugarea
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
la fișierul setup.xml. Implicit este "adevărat." Mulţumită lui Raju Devender.
    * NOUA METADATA TAG: În datasets.xml pentru un set de date, puteți specifica acum numărul implicit de culoare Secţiuni bare pentru dataVariable pe grafice și hărți cu
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (implicit=-1, care spune să lase ERDDAP™ decide) . Vezi [culoare Configurări bare](/docs/server-admin/datasets#color-bar-attributes) .
    * Culoarea de pe hărţi era mov. (Deep Purple for you Baby Boomers) . Acum e gri. (între graniţa naţională gri şi gri) .
    * BUG FIX:&lt;iso19115File&gt; și&lt;fgdcFile &gt; în datasets.xml nu au fost întotdeauna tratate corect. Acum sunt. Mulţumită BCO-DMO.

## Versiunea 1.78{#version-178} 
 (lansat 2017-05-27) 

*    **Caracteristici noi (pentru utilizatori) :**   
     
    *    (niciuna)   
         
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:**   
     
    * IMPROVED: Ordinea de linii în "Maior LoadDatasets Time Series" pe status.html pagina este acum cel mai nou pe partea de sus la cea mai veche din partea de jos.
    * BUG FIX: ERDDAP™ Acum scrie .nccsv fișiere cu variabila timpului actual\\_range ca un timp ISO-8601 String. Acest lucru repară bug-ul cu EDDtableFromErddap parsing info dintr-un set de date de la distanță și din fișierul Restart rapid pentru toate EDD TableFrom... Seturi de fișiere. (Timpul actual\\_range va fi greșit prima dată când setul de date se încarcă în v1.78, dar corect după ce este reîncărcat, de exemplu, dacă semnalizați setul de date.) 

## Versiunea 1.76{#version-176} 
 (lansat 2017-05-12) 

*    **Caracteristici noi (pentru utilizatori) :**   
     
    * SCHIMBARE în Tomcat: Pentru cereri ERDDAP™ provenind din alte programe decât browserele web (de exemplu, curl R. Matlab , Python , Java ) :
Similar cu modificările anterioare în versiunile de Tomcat (software-ul de nivel inferior care rulează ERDDAP ) de la începutul anului 2016, din ce în ce mai multe caractere din partea de interogare a URL-ului cererii trebuie să fie [ **Procent codificat** ](/docs/server-admin/datasets#infourl) din motive de securitate. Navigatorii au grijă de codarea la sută pentru tine. deci folosind ERDDAP™ într-un browser nu este afectat cu excepția cazului în care cererea devine redirecționat la altul ERDDAP .
    * Anterior, ERDDAP™ tratate **variabile char** mai mult ca numere scurte nesemnate decât caractere. Acum le tratează mai mult ca 1-personaj lung UCS-2 (Unicode) Strings. Vezi [documentație char](/docs/server-admin/datasets#char) . Mulţumită lui Aurelie Briand şi proiectului Argo.
    * Anterior, ERDDAP™ a oferit puțin sprijin pentru **Caractere unicode** deasupra personajului #255 în Strings. Acum, intern, ERDDAP™ suporta pe deplin 2 octeți UCS-2 chars (caractere numerotate 0 până la 65535) în Strings. Atunci când datele String este scris la diferite tipuri de fișiere, ERDDAP™ face tot ce poate pentru a sprijini 2-byte chars. Un alt exemplu este .csv fișiere care ERDDAP™ scrie cu charset ISO-8859-1 (un charset de 1 octet) , deci ERDDAP™ scrie orice caractere de mai sus personaj #255 cu JSON-ca \\ \\u_hhh_ sintaxa. Vezi? [Date privind stringurile](/docs/server-admin/datasets#string) .
    * IMPROVAT: .nc fișiere scrise de ERDDAP™ , variabile Char care urmează să fie interpretate ca strings va avea atributul
         **\\_Encoding=ISO-8859-1**   
În .nc fișiere citite de ERDDAP™ , variabilele char cu "\\_Encoding" vor fi interpretate ca strings cu setul de caractere specificat.
    * REMINDER: ERDDAP™ Suporturi **Traducerea şi adaptarea:** de caractere speciale atunci când specificați constrângerile variabilelor char și String. Astfel, puteți solicita ceva de genul &myString="\\ \\u20ac" atunci când doriți rânduri de date în cazul în care myString=€ deoarece 20ac este versiunea hexazecimala a punctului de cod pentru simbolul Euro. Mai multe surse de pe web arată numerele punctelor de cod pentru simbolurile Unicode, de exemplu, [https://en.wikipedia.org/wiki/Unicode](https://en.wikipedia.org/wiki/Unicode) .
    * Anterior, ERDDAP™ a oferit sprijin limitat pentru **număr întreg lung** variabile. Acum ERDDAP™ sprijină pe deplin pe plan intern și face tot posibilul atunci când scrie date lungi pentru diferite tipuri de fișiere. . Vezi [documentație lungă](/docs/server-admin/datasets#long) . Datorită Institutului Marine din Irlanda, Craig Risien, Rich Signell, Christopher Wingard şi OOI.
    * NOU: tipul de fișier de ieșire pentru griddap și tabledap : ** .nccsv ** , ceea ce face o NetCDF - cum ar fi, ASCII, fişierul CSV care conţine, de asemenea, toate metadatele care ar fi într-o comparaţie .nc Dosar. Vezi [NCCSV Specificații](/docs/user/nccsv-1.00) . Mulţumită lui Steve Hankin.
    * NOU: ** orderByClosest filtru** permite să specificaţi modul în care tabelul de rezultate va fi sortate şi un interval (de exemplu, 2 ore) . În cadrul fiecărui grup de sortare, vor fi păstrate numai rândurile cele mai apropiate de interval. De exemplu, orderByClosest  (" stationID , timp, 2 ore") va sorta după stationID şi timpul, dar înapoiaţi rândurile pentru fiecare stationID unde ultima orderBy coloană (timp) este cel mai apropiat interval de 2 ore. Acesta este cel mai apropiat lucru în tabledap pentru a parcurge valori într-o cerere de grilă. Această opțiune poate fi specificată prin orice tabledap Web page .html, .graph pagina web, și de orice URL pe care le generați. Datorită Institutului de Marine şi Ocean Networks Canada din Irlanda.
    * NOU: ** orderByLimit filtru** permite să specificaţi modul în care tabelul de rezultate va fi sortate şi un număr limită (de exemplu 100) . În cadrul fiecărui grup de sortare, vor fi păstrate doar primele rânduri "limitate." De exemplu, orderByMax  (" stationID , 100") va sorta după stationID , dar returnează doar primele 100 de rânduri pentru fiecare stationID . Acest lucru este similar cu clauza de limitare a SQL. Această opțiune poate fi specificată prin orice tabledap Web page .html, .graph pagina web, și de orice URL pe care le generați. Datorită Institutului de Marine şi Ocean Networks Canada din Irlanda.
    * NOU: Două noi tipuri de fișiere de răspuns, ** .jsonlCSV şi .jsonlKVP ** sunt disponibile pentru cereri de seturi de date, seturi de date tabulare și multe alte locuri în ERDDAP   (De exemplu, cereri de informații despre seturi de date) . Fișierele sunt fișiere JSON Lines ( [https://jsonlines.org/](https://jsonlines.org/) ) unde fiecare linie are un obiect JSON separat. .jsonlCSV are doar valorile într-un format CSV. .jsonlKVP are cheie: Perechi de valoare. Fiecare linie e pe cont propriu. Liniile nu sunt închise într-o matrice JSON mai mare sau obiect. De exemplu, vezi [cererea de eșantionare](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z) . Mulţumită lui Damian Smyth, Rob Fuller, Adam Leadbetter şi Institutului Marine din Irlanda.
    * NOU: Există noi documente care descriu [ **Cum se accesează datele private în ERDDAP™ prin scripturi** ](/docs/user/AccessToPrivateDatasets) . Mulţumită lui Lynn DeWitt.
    * IMPROVED: Dimensiunea minimă a ** OpenLayers ** harta a fost de 2 grade și este acum 4 pixeli de date. Mulţumită lui Rusty Holleman.
    * IMPRUMUT: În unele cazuri comune, cererile includ o **expresie regulată** constrângerea va fi procesată mult mai repede.
         
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:**   
     
    *    **Slow primul startup:** Prima dată când porniți această nouă versiune, va dura mult timp pentru ERDDAP™ pentru a încărca toate seturile de date, deoarece trebuie să recitească toate fișierele de date sursă (deşi doar antetul pentru fişierele de date în reţea) . Dacă te uiți la jurnale puteți vedea mesaje de eroare care spun "vechi / nesusținute îmbunătățit Versiune" a unor fișiere interne -- e în regulă -- ERDDAP™ va face noile versiuni ale fișierelor interne. Te rog să ai răbdare.
    * ACŢIUNI: ERDDAP™ Acum foloseşte noul **Java. timp** clase (cunoscut și sub numele de JSR 310) în loc de Joda să parse String ori în timp numeric. Note:
        * Dacă ERDDAP™ brusc are probleme parsing șir ori pentru un set de date dat și, prin urmare, doar convertește cel mai mult sau toate timpurile la NaN (Valori lipsă) , problema este aproape întotdeauna cu data Name Noul sistem are uneori nevoie de un şir uşor diferit de format DataTime.
        * Dacă lunile numerice și zilele în dataTime siruri de caractere nu sunt 0 caddled (de exemplu, "3/7/2016") , asigurați-vă că formatul are doar un singur M și d (De exemplu, "M/d/aaaa," nu "LL/zz/aaaa") .
        * Modificați orice specificație fracțională de secunde care utilizează o specificație cu litere mici (de exemplu, .ss în yyyy-MM-dd 'T'HH:mm:ss.ss.) , în capitală S, (de exemplu, yyyy-MM-dd 'T'HH:mm:ss.SSS) .
        *    ERDDAP™ nu mai suportă data șirului Formate de timp cu doi ani (yy) cu un secol implicit (de exemplu, 1900 sau 2000) . Întreprinderile au cheltuit miliarde de dolari pentru a rezolva această problemă la sfârşitul anilor 1990. Oamenii de ştiinţă nu ar trebui să folosească doi ani cifre. Reparați fișierul sursă (s) prin conversia la 4 cifre ani, apoi se utilizează aaaa la data Format de timp.
        * Puteţi utiliza aaaa sau AAAA (care ERDDAP™ convertește în uuuu) de patru ani cifre, inclusiv ani negativi, de exemplu, -4712 (care este 4713 î.Hr.) . Mulţumită SeaDataNet, Thomas Gardner şi BODC.
        * Vă rugăm să continuați să utilizați Z într-un format dataTime pentru a obține ERDDAP pentru a analiza o compensare temporală (De exemplu, Z, +0200, -08, -0800, -08:30) .
        *    **Asiguraţi- vă că utilizaţi Java versiunea 1.8.0\\_21 sau mai mare.** 
        * Programatori -- Dacă scrii Java programe care rulează ERDDAP™ Cod, trebuie să eliminați trimiterea la Joda-timp. borcanul din parametrul traseului clasei.
    * NOU: ERDDAP 's [Arhiva A Unealtă de set de date](/docs/server-admin/additional-information#archiveadataset) poate crea acum [ **Fișiere BagIt** ](https://en.wikipedia.org/wiki/BagIt) . NCEI poate standardiza acest format. Mulţumită lui Scott Cross şi John Relph.
    * IMPROVED: link-urile pentru a descărca erddap. război pe ERDDAP™ pagini web indică acum la **GitHub** . (Sunt legături publice, aşa că nu trebuie să te alături lui GitHub.) Acest lucru înseamnă descărcări mult mai rapide (până la 12Mb/s față de 1Mb/s) şi puţine probleme cu descărcările. Datorită lui Damian Smyth, Rob Fuller, Adam Leadbetter, Conor Delaney şi Institutului de Marină al Irlandei.
    * IMPROVED: **status.html page and the daily Status Report email** include acum o secțiune "Maior LoadDatasets Time Series" care arată statistici despre ERDDAP™ la sfârșitul fiecărei sarcini majoreDate de date pentru ultimele 100 de seturi majore de date. Datorită RAID nostru supărător.
    * NOU: un nou, opţional (dar recomandată) parametru pentru tabelul EDDDe la seturi de date Cassandra: [ ** &lt;partițieKeyCSV&gt; ** ] (/docs/server-admin/datasets#partitionkeycsv) . Mulţumită Ocean Networks Canada.
    * NOU: TABELUL EDDFromAsciiFiles suportă acum ** &lt;coloanaSeparator&gt; ** parametru. Dacă nul sau "," clasa va ghici, ca și înainte, altfel, primul caracter va fi folosit ca separator de coloană atunci când citiți fișierele. Datorită lui Sky Bristol şi Abigail Benson.
    * Nou: noul tip de set de date; [ **Tabel EDD de la NCCSvFiles** ](/docs/server-admin/datasets#eddtablefromnccsvfiles) , poate face un set de date prin agregare [Fișiere NCCSV .csv](/docs/user/nccsv-1.00) . Mulţumită lui Steve Hankin.
    * Improvizat: **Tabel EDD FromErddap** acum folosește .nccsv pentru a obține informații de la distanță ERDDAP s și pentru arhiva locală a acestor informații metadate. Acest lucru permite suport deplin pentru tipurile de date char și lung, și pentru Unicode (UCS-2) Charset pentru Chars and Strings. Mulţumită lui Rob Fuller şi Institutului de Marină al Irlandei.
    * IMPRUMUT: tabel EDDFromErddap și EDDGrid De la Erddap acum sprijin ** &lt;redirecţionare &gt; falşi&lt;/redirect&gt; ** care spune ERDDAP™ să nu redirecţionaţi niciodată cererea către telecomandă ERDDAP . Implicit este adevărat. Acest lucru este util atunci când telecomanda ERDDAP™ este un privat ERDDAP . Mulţumită lui Damian Smyth, Rob Fuller şi Institutului Marine din Irlanda.
    * Improvizat: ERDDAP™ Acum prinde. **cereri de utilizator anulate** Mai devreme. Şi... ERDDAP™ Acum se închide mai repede pentru că firele de nivel scăzut se închid mai repede. Datorită RAID nostru supărător.
    *    **Generează dateName Xml:** 
        * NOU: Noul EDDType special "ncdump" printează o [ncdump](https://linux.die.net/man/1/ncdump) \\-ca imprimarea antetului unui .nc Dosar. De asemenea, puteți imprima valorile datelor pentru variabilele specificate (sau introduceți "nimic" pentru a nu imprima valori de date) . Acest lucru este util deoarece, fără ncdump este greu să știi ce este într-un fișier și, prin urmare, care EDDType ar trebui să specifice pentru GenerateDatasetsXml. Mulţumită lui Craig Risien, Rich Signell, Christopher Wingard şi OOI.
        * NOU: Pentru SeaDate Date nete:
După caz, Generează date Xml face acum o conversie semantică specifică folosind o interogare SPARQL la distanță: dacă metadatele sursă ale unei variabile includ un sdn\\_parametru\\_urn, de exemplu, sdn\\_parametru\\_urn = "SDN:P01::PSLTZZ01," GenerateDatesets Xml va adăuga atributul P02 corespunzător, de exemplu, sdn\\_P02\\_urn = "SDN:P02::PSAL." Dacă aveți seturi de date care utilizează aceste atribute, și dacă dumneavoastră ERDDAP 's&lt; categoryAttributes &gt; în setup.xml include sdn\\_parametru\\_urn și sdn\\_P02\\_urn, utilizatorii vor putea utiliza ERDDAP™ Sistem de căutare de categorie pentru a căuta seturi de date cu valori specifice ale acestor atribute. Mulţumită BODC şi Alexandra Kokkinkaki.
        * IMPROVED: Generează date Xml acum schimba multe http:// referințe în metadate la https:// după caz.
        * IMPROVED: Generează date Xml încearcă acum să ghicească creator\\_type și editor\\_type.
        * IMPROVED: Tipurile de date ale variabilei sugerate de GenerateDatasets Xml va fi acum un pic mai bine. Mulţumită lui Margaret O'Brien, LTER şi EML.
        * IMPROVED: Generează date Xml este mai bun la specificarea&lt;cdm\\_data\\_type&gt; și adăugarea atributelor aferente (de exemplu,&lt;cdm\\_timeseries\\_variables&gt;), astfel încât să puteți furniza aceste informații. Mulţumită lui Rich Signell.
        * IMPROVED: În setul de date Generate Xml, pentru seturi de date EDD Table, sugestia pentru&lt; subsetVariables &gt; este acum mult mai conservatoare. Mulţumită lui John Kerfoot.
        * IMPRUMUT: Dacă datasets.xml pentru un set de date specifică featureType dar nu cdm\\_date\\_type, featureType va fi folosit ca cdm\\_data\\_type. Mulţumită lui Rich Signell.
        * BUG FIX: genera Setări de date Xml sugerează acum corect&lt;DataType&gt; pentru variabilele de date care au scale\\_factor , add\\_offset și/sau atribute nesemnate.
    * IMPROVAT: ERDDAP™ deschide o .nc dosar care este **mai scurt** decât ar trebui să fie (De exemplu, nu a fost copiată complet pe loc.) , ERDDAP™ Acum tratează dosarul la fel de rău. Anterior, ERDDAP™ a revenit valorile lipsă pentru orice parte lipsă a fișierului, deoarece acesta este comportamentul implicit pentru netcdf-java. ERDDAP™ acum foloseste ucar .nc 2.iosp.netcdf3.N3header.dezallowFileTrancation = true; Mulţumită lui RAID şi Christian Ward-Garrison.
    * IMPROVED: autorul ISO 19115 face uz de **creator\\_type** , dacă este prezent.
    * Improvizat: ERDDAP™ acum utilizează cele mai recente netcdf-java v4.6.9 care pot citi tipuri suplimentare de **fișiere netcdf-4** . Mulţumită lui Craig Risien, Rich Signell, Christopher Wingard şi OOI.
    * BUG FIX: evita probleme în cazul în care diferite fișiere sursă au diferite tipuri de date pentru o anumită variabilă. Mulţumită lui Roy Mendelssohn şi Eugene Burger.
    * BUG FIX: **Conversii ale formatului timpului** sunt acum mai bine protejaţi împotriva valorilor timpului nepotrivit. Mulţumită NDBC.
    * BUG FIX: EDDGrid DinNcFiles Despachetat se ocupă acum de valorile timpului cu **"luni de la..." şi "ani de la..."** corect (prin creșterea lunii sau a anului, nu prin adăugarea brută, de exemplu, a 30 de zile în mod repetat) . Datorită Soda3.3.1.
    * BUG FIX: doar în v1.74, **Abonamente** necesară o acțiune (de exemplu, http:// ...) , care a fost și ar trebui să fie opțional.
    * BUG FIX: EDDGrid De la MergeIRFiles.lowGetSourceMetadata () nu a adăugat niciun atribut global. Acum da.
         

## Versiunea 1.74{#version-174} 
 (lansat 2016-10-07) 

*    **Caracteristici noi (pentru utilizatori) :**   
     
    * Acum, când o listă de date (Toate, sau de la o căutare) este afișat pe o pagină web, titlurile lungi sunt afișate pe mai multe linii. Anterior, mijlocul unui titlu lung a fost înlocuit cu " ... ." Mulţumită lui Margaret O'Brien, LTER şi EML.
         
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:**   
     
    * TO DO: Pe calculatoarele Linux, modificați setările timeout Apache, astfel încât cererile utilizatorului consumatoare de timp nu timeout (cu ceea ce apare adesea ca o eroare "Proxy" sau "Bad Gateway") . Ca utilizator rădăcină:
        
        1. Modificaţi apaşii http fișier d.conf (de obicei în/etc/ http d/conf/) :
Schimbare existentă&lt;Setare pauză &gt; (sau adăugați unul la sfârșitul fișierului) până la 3600 (secunde) , în loc de 60 sau 120 secunde implicite.
Schimbare existentă&lt;ProxyTimeout&gt; setare (sau adăugați unul la sfârșitul fișierului) până la 3600 (secunde) , în loc de 60 sau 120 secunde implicite.
        2. Restart Apache: /usr/sbin/apachectl - K graţios (dar uneori este într-un alt director) .
        
Mulţumită lui Thomas Oliver.
         
    * NOU: \\[ Big ParentDirectory/hard Dosarul steagului
Acest lucru funcționează ca directorul de pavilion, dar versiunea hardFlag șterge, de asemenea, toate informațiile set de date cache. Nu există URL-uri pentru a seta un hardFlag. Acest lucru poate fi folosit doar prin punerea unui fișier în acel director.
tare Steagurile sunt foarte utile atunci când faci ceva care cauzează o schimbare în modul în care ERDDAP™ citește și interpretează datele sursă, de exemplu, atunci când instalați o nouă versiune a ERDDAP™ sau atunci când ați efectuat anumite modificări ale definiției unui set de date în datasets.xml . Vezi? [Această documentație](/docs/server-admin/additional-information#hard-flag) . Mulţumită lui John Kerfoot şi tuturor grupurilor Argo.
         
    * NOU: Generează date Xml are acum o opțiune EDDTabelulFromEML
care citește o descriere a setului de date într-o limbă de metadate ecologice (EML) fișier, descarcă fișierul de date aferente, și generează o bucată de datasets.xml astfel încât setul de date să poată fi adăugat ERDDAP . Există, de asemenea, un EDDtableFromEMLBatch care face același lucru pentru toate fișierele EML într-un director. Acest lucru funcționează foarte bine, deoarece EML face o treabă excelentă de a descrie setul de date și pentru că KNB și LTER fac disponibile fișierele reale de date.
EML plus ERDDAP™ ar putea fi o combinatie mare, deoarece ERDDAP™ ar putea oferi utilizatorilor acces mai direct la bogăția datelor KNB și LTER și ar putea ajuta aceste proiecte să îndeplinească cerințele guvernului SUA [Accesul public la rezultatele cercetării (PARR) Cerințe](https://nosc.noaa.gov/EDMC/PD.DSP.php) prin punerea la dispoziție a datelor prin intermediul unui serviciu web.
Vezi? [Această documentație](/docs/server-admin/EDDTableFromEML) . Mulţumită lui Margaret O'Brien, LTER şi EML.
         
    * NOU: Generează date Xml are acum o opțiune EDDTable FromInPort
care citește o descriere a setului într-un fișier XML InPort și încearcă să genereze o bucată de datasets.xml astfel încât setul de date să poată fi adăugat ERDDAP . Acest lucru rareori creează o bucată gata de utilizare a XML pentru datasets.xml , dar va crea un proiect bun dur care este un bun punct de plecare pentru editarea de către un om.
Ar fi grozav dacă oamenii care folosesc InPort să-şi documenteze setările de date ar folosi şi ele ERDDAP™ să pună la dispoziție datele reale prin intermediul ERDDAP 's servicii web și, prin urmare, să îndeplinească guvernului SUA și NOAA 's [Accesul public la rezultatele cercetării (PARR) Cerințe](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research) prin punerea la dispoziție a datelor prin intermediul unui serviciu web. Aceasta este o soluţie care ar putea fi folosită acum. ( erd.data at noaa.gov este fericit să ajute.)   
Vezi? [Această documentație](/docs/server-admin/datasets#eddtablefrominport) . Mulţumită lui Evan Howell şi Melanie Abecassis.
         
    * Improvizat: ERDDAP™ Acum folosește netcdf-java 4.6.6.
Cu versiuni anterioare, netcdf-java citește unele valori de umplere (Poate, doar în netcdf-4 fișiere) ca 0. Acum se spune că unele dintre ele reprezintă valoarea standard netăcdf: -127 pentru octeți, -32767 pentru pantaloni scurți, -2147483647 pentru int. Unidata spune noul comportament este comportamentul adecvat. Dacă o variabilă dintr-un set de date începe să arate una dintre aceste valori în cazul în care acestea au folosit pentru a arăta 0 lui, puteți adăuga, de exemplu,
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
la variabila addAttributes pentru a spune ERDDAP™ pentru a trata această valoare ca o missing\\_value /\\_Fill Valoare. Cu toate acestea, în multe cazuri, acest lucru nu va produce rezultatul dorit: 0s. Dacă da, luaţi în considerare modificarea fişierelor cu NCO sau rescrierea dosarelor. Plângeri? Vă rugăm să contactaţi Unidata ;-)
         
    * Topografie nouă Paleta Depth
Te incurajez sa schimbi toate seturile de date care folosesc paleta OceanDepth pentru a folosi noua paleta TopographyDepth, care este ca Topography cu exceptia culorilor răsturnate, astfel incat este potrivit pentru valorile de adâncime (pozitiv=jos) , în loc de valorile de altitudine (pozitiv=up) . Configurările recomandate pentru această paleta sunt:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * NOUA FEATURĂ: String missing\\_value și/sau \\_FillValue
Dacă o variabilă String definește o missing\\_value și/sau \\_FillValue; ERDDAP™ va elimina acum aceste valori din date și le va înlocui cu un șir gol, astfel încât valorile lipsă să apară ca șiruri de caractere goale, ca și cu alte seturi de date din ERDDAP . Mulţumită lui Margaret O'Brien, LTER şi EML.
         
    * NOUA FEATURĂ: Sprijin pentru timpurile locale
Variabilele timbrării temporale cu date sursă din Strings pot specifica acum o zonă temporală prin intermediul unei " time\\_zone " atribut care conduce ERDDAP™ pentru a converti timpul local-zonă de sursă ori (unele în timp standard, unele în lumina zilei de economisire a timpului) în Zulu ori. Lista numelor de fus orar valabile este probabil identică cu lista din coloana TZ din [Acest tabel](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) . Implicit este " Zulu ". Zonele orare comune din SUA sunt: SUA/Hawaii, SUA/Alaska, SUA/Pacific, SUA/Mountain, SUA/Arizona, SUA/Central, SUA/Est. Pentru variabilele de timp cu date de sursă numerice, puteți specifica " time\\_zone " atribut, dar valoarea trebuie să fie " Zulu "sau "UTC." Mulţumită lui Margaret O'Brien, LTER şi EML.
         
    * NOU FEATURĂ: EDDTABLEFromAsciiFiles suportă acum fișiere separate de semicolon
și este mai inteligent despre imaginind separator. Mulţumită lui Margaret O'Brien, LTER şi EML.
         
    * NOUA FEATURĂ: Dacă există o eroare semnificativă în setările de încărcareData (majore sau minore, de exemplu, lipsă sau invalidă datasets.xml document) , ERDDAP™ va indica acum în stare.html, chiar sub "n Datasets Eșec la încărcare" ca ERROR: în timpul prelucrării datasets.xml : a se vedea log.txt pentru detalii.
         
    * NOUA FEATURĂ: ERDDAP™ Caută orfani.
Când ERDDAP™ face o sarcină majoră Datasets, acum caută seturi de date orfane. (Seturi de date din ERDDAP™ dar nu în datasets.xml ) . Dacă sunt găsite, acestea sunt enumerate în stare.html, chiar sub "n Datasets Eșec la încărcare" ca ERROR: n Orphan Datasets (Seturi de date în ERDDAP™ dar nu în datasets.xml ) = ....
Dacă doriți să eliminați (descarcă) un orfan de la ERDDAP™ , trebuie să adăugați
        &lt;Set de date type="_anyValidType_" datasetID ="_theDatasetID_"activ="fals" /&gt;
la datasets.xml până când setul de date este descărcat în timpul următoarelor seturi majore de date.
         
    * BUG FIX: În cazul în care un set de date are o variabilă a timpului numerică cu alte unități decât "seconds since 1970-01-01T00:00:00Z" şi cu&lt;updateEveryNMillis&gt; sistem activ, intervalul variabilei timbrului temporal a fost stabilit incorect la actualizarea setului de date. Mulţumită lui John Kerfoot.
         
    * BUG FIX: Dacă&lt;QuickRestart&gt; a fost adevărat în setup.xml și ați solicitat date de la un EDD TableFrom... Set de fișiere care a utilizat&lt;updateEveryNMillis&gt;, prima solicitare a setului de date ar eşua, însă cererile ulterioare ar avea succes. Prima cerere nu va eşua. Mulţumită lui John Kerfoot.
         
    * BUG FIX: GenerateDatesetsXml.sh și .bat nu au funcționat cu &gt;9 parametri pe linia de comandă. Acum o fac. Mulţumită lui John Kerfoot.
         
    * BUG FIX: Noul tabel EDDFromMultidimNcFiles nu a eliminat în mod constant spaţiile de urmărire din corzi. Acum da. În mod special, acest lucru a afectat fișiere ARGO. Mulţumită lui Kevin O'Brien şi Roland Schweitzer.
         
    * BUG FIX: Accesul la distanţă DAP Serviciile sunt acum iniţiate de un cod mai modern. Acest lucru stabilește eroarea "conectare închisă" la accesarea unor seturi de date EDDTableFromErddap. Mulţumită lui Kevin O'Brien.
         
    * BUG FIX: Gestionarea orderBy ... () şi distinct () sunt acum înapoi la modul în care acestea au fost înainte de modificările recente: o cerere dată poate avea mai multe orderBy ... () și/sau un distinct () filtru; ERDDAP™ se va ocupa de ele în ordinea în care sunt specificate. Mulţumită lui David Karuga.
         
    * BUG FIX: Dacă setul de date este EDDTabelFromDatabase și o interogare are [sursăCanderBy](/docs/server-admin/datasets#sourcecanorderby) și/sau [sursăCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct) , atunci baza de date poate (în funcţie de setările datasets.xml ) mâner parțial sau complet **Doar primul**   orderBy .. () sau distinct () . Mulţumită lui David Karuga.
         
    * BUG FIX: Recentul codare suplimentară a cauzat probleme cu unele întrebări pentru .nc Fișiere CF, de exemplu, "HTTP Status 500 - Eroare de întrebare: variabila=stație este listată de două ori în lista variabilelor rezultate." Mulţumită lui Kevin O'Brien.
         
    * BUG FIX: EDDTableFromFiles a avut probleme cu încărcarea unui set de date atunci când una dintre coloane a fost o coloană char adevărată. Mulţumită lui Roland Schweitzer.
         
    * BUG FIX: EDDGrid DinNcFiles Despachetat acum, de asemenea, convertiți missing\\_value și \\_FillValue la valori standard astfel încât fișierele cu valori diferite să poată fi agregate. Din cauza acestei schimbări, după ce instalați această nouă versiune a ERDDAP™ , vă rugăm să setați un [tare Steag](/docs/server-admin/additional-information#hard-flag) pentru fiecare EDDGrid DinNcFiles Set de date despachetat în ERDDAP .
         
    * IMPROVED: EDDTABLEFromNcCFFiles poate acum ocupa fișiere care au mai multe probe\\_dimensiuni. Un set de date dat trebuie să utilizeze doar variabilele care utilizează una dintre eșantioanele\\_dimensiuni. Mulţumită lui Ajay Krishnan.
         
    * Pentru tabelul EDD din... fişiere,&lt;sortFilesBySourceNames &gt; permite acum separat de virgulă (recomandată) sau liste separate de denumiri de surse variabile. În ambele cazuri, numele variabilelor individuale pot fi înconjurate de citate duble, de exemplu, dacă denumirea are un spațiu intern.

## Versiunea 1.72{#version-172} 
 (lansat 2016-05-12) 

*    **Caracteristici noi (pentru utilizatori) :** Niciuna.
     
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * NOU tabel EDD DIN MULTIDIMNCFiles [Tabel EDD Din mai multe DosareNc](/docs/server-admin/datasets#eddtablefrommultidimncfiles) este o nouă alternativă la tabelul EDDFromNcFiles. Acesta este conceput pentru a face față grupurilor de fișiere cu mai multe variabile cu dimensiuni comune, de exemplu, var1 \\[ a \\]  \\[ b \\] , var2 \\[ a \\] , var3 \\[ b \\] , ScararVar. Datorită proiectului Argo, Aurélie Briand şi Roland Schweitzer.
    * BUG FIX: ERDDAP™   (prin clasa FileVisitorDNLS și FileVistorSubdir) Acum urmează link-uri simbolice pe Linux. ERDDAP™ Tot nu ne urmăreşte.
    * BUG FIX de bug introdus în 1.70: distinct + orderBy nu au fost permise împreună într-o singură cerere. Acum sunt din nou. Nu se exclud reciproc/redundant. Mulţumită lui David Karuga.
    * MODIFICĂRI LA datasets.xml lista neagră a adreselor IP:
Adrese IP v4 par să ERDDAP™ 4 numere de hex separate pe perioadă.
Cred că adresele IP v6 apar sub forma a 8 numere de hex separate de colon.
Deci... ERDDAP™ acum susține colonul în adresele IP din lista respectivă și:\\* la sfârșitul listei pentru a bloca o serie de adrese.
    * Improvizat: ERDDAP™ Acum folosește NetcdfFileWriter pentru a scrie .nc fișiere în loc de NetcdfFileWriteable depreciate. Nu ar trebui să existe nici o schimbare perceptibil la fișierele rezultate. Acest lucru deschide posibilitatea de a face mare .nc fișiere care utilizează .nc 3 extensii de 64 de biţi. Dacă doriți / nevoie de asta, vă rugăm să trimiteți o cerere la erd.data at noaa.gov .
    * Multe dintre link-urile către site-uri de la distanță au fost depășite. Acum sunt la zi şi folosesc https: în loc de http : ori de câte ori este posibil.
    * Multe mici schimbări.

## Versiunea 1.70{#version-170} 
 (lansat 2016-04-15) 

*    **Caracteristici noi (pentru utilizatori) :** Niciuna.
     
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** Mai jos, există mai multe modificări recomandate ale documentației în fișierul setup.xml.
Vă rog să faceţi aceste schimbări acum.
30 de minute de muncă te pot scuti de ore de confuzie în viitor.
    * Fix bug: Problema a fost că cererile care au fost redirecționate la o distanță ERDDAP nu a reușit cu un caracter invalid " | Mesaj de eroare. Acest lucru a avut loc doar cu versiuni recente ale Tomcat. Mulţumită lui Rusty Holleman, Conor Delaney şi Roy Mendelssohn.
    * Fix bug: ERDDAP™ Acum folosește o versiune actualizată a netcdf-java (E o poveste lungă.) care include suport actualizat pentru NcML, care rezolvă problema cu NcML LogicReduce care nu funcţionează conform aşteptărilor. Pot exista câteva mici modificări ale metadatelor care ERDDAP™ citește prin netcdf-java de la .nc , .hdf , Grib, și fișiere .bufr. Mulţumită lui Favio Medrano.
    * Noul [EDD TabelAgregareRows](/docs/server-admin/datasets#eddtableaggregaterows) permite efectuarea unui set de date EDD Table fuzionat din două sau mai multe seturi de date EDD Table care au aceleași variabile de date utilizând aceleași unități. Mulţumită lui Kevin O'Brien.
    * Opțiuni noi pentru tabelul EDDFrom Database ( [sursăCanderBy](/docs/server-admin/datasets#sourcecanorderby) şi [sursăCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct) ) vă rugăm să precizați dacă ERDDAP™ , baza de date sau ambele, manipula distinct și orderBy   (și toate variantele) constrângeri. Mulţumită lui David Karuga.
    * Acum puteți pune graficele și metadatele unui set de date privat la dispoziția publicului prin intermediul noului [&lt;grafice Accesibile către publicul larg&lt;/grafiAccesibileTo&gt;] (/docs/server-admin/sets#grafsaccessible to) Tag. Mulţumită lui Emanuele Lombardi.
    * Acum, dacă o coardă a trecut la GenerateDatasets Xml sau DasDds este înconjurat de citate duble, este necitat (ca şi cum ar fi o coardă JSON) . Mulţumită lui John Kerfoot şi Melanie Abekassis.
    * Generează dateName Xml suportă acum "default" pentru a obține implicit și "nimic" pentru a obține un șir gol (lucrează cu sau fără citate) . Acest lucru rezolvă unele probleme legate de trecerea siruri de caractere goale.
    * Acum, în GenerateDatesets Xml, pentru toți EDDGrid Din fişiere şi tabel EDD Seturile de date din dosare, dacă eșantionul Numele fișierului specificat este "" (șirul gol) , va folosi ultimul nume de fișier de potrivire din director + regex + recursiv=adevărat.
    * Actualizat: AfisajulInBrowser cod care este folosit pentru a afișa rezultatele GenerateDateSetsXml și DasDds pe calculatoare Linux a fost depășit și a dat un mesaj ciudat despre Netscape. Acum, acest lucru folosește un instrument modern Linux: xdg-deschis. Mulţumită lui Melanie Abekassis.
    * ă allDatasets Setul de date are acum o "files" coloană, care indică URL-ul de bază al link-ului /fișierelor (dacă există una) pentru setul de date.
    * Creșterea securității generale a dumneavoastră ERDDAP™ prin schimbarea permisiunilor asociate cu directorul Tomcat si marele ParentDirector:
         (Comenzile de mai jos sunt pentru Linux. Pentru alte OS, face modificări similare.) 
        * Schimbă "grupul" pentru a fi Tomcat, numele de utilizator, sau numele unui grup mic care include Tomcat și toți administratorii Tomcat / ERDDAP , de exemplu,
chgrp -R _yourUserName_ apache-tomcat-_8.23_
chgrp - R _your Nume utilizator mareParentDirectory_
        * Schimbați permisiunile astfel încât Tomcat și grupul să citească, să scrie, să execute privilegii, de exemplu.
chmod -R ug+rwx apache-tomcat-_8.23_
chmod -R ug+rwx _bigParentDirectory_
        * Eliminați permisiunile utilizatorului "altul" pentru a citi, scrie sau executa:
Chmod -R o-rwx apache-tomcat-_8.23_
chmod -R o-rwx _bigParentDirectory_
Acest lucru este important, deoarece împiedică alţi utilizatori să citească informaţii sensibile în ERDDAP™ configurare fișiere, jurnal fișiere, și fișiere cu informații despre seturi de date private.
    * Sistemul de autentificare/login a fost reamenajat. Mulţumită lui Thomas Gardner, Emanuele Lombardi şi guvernului american [Standard numai pentru HTTPS](https://home.dotgov.gov/management/preloading/dotgovhttps/) .
        * Autentificare=opțiunea de oprire a fost eliminată. Era demodat.
        * Noul, recomandat, [autentificare=google](/docs/server-admin/additional-information#google) opțiuni de utilizare Conectare Google (bazat pe OAuth 2.0) pentru a permite oricui cu un cont de e-mail Google (inclusiv Conturi gestionate Google, cum ar fi @noaa.gov ) să se logheze.
        * Noul, [autentificare=email](/docs/server-admin/additional-information#email) opțiunea este un back-up pentru autentificare=google. Permite utilizatorilor cu&lt;tag-ul utilizator &gt; in datasets.xml să se logheze prin trimiterea unui e-mail cu un link special.
        * În setup.xml, vă rugăm să modificați descrierea pentru&lt;autentificarea &gt; care urmează să fie
```
            <!-- If you want to restrict access to some datasets, 
            you need to specify the method used for logging on (authentication).
            See the info at 
            https://erddap.github.io/setup.html#security
            Currently, the options are: "" (logins not supported, the default), 
            "custom", "email", and "google" (recommended).  
            \\[No longer supported: "basic", "openid"\\]
            -->
```

        * În setup.xml, vă rugăm să adăugați acest drept sub&lt;autentificare &gt; etichetă
```
            <!-- If authentication=google, you must supply your Google Client ID. 
            See
            https://developers.google.com/identity/sign-in/web/devconsole-project
            When setting this up, for Authorized JavaScript origins, 
            for testing on your computer, use the domain "localhost" 
            (e.g., origin=https://localhost:8443), 
            not "127.0.0.1" (because Google Sign-In doesn't work with anything 
            at that domain).
            This will be a string of about 75 characters, probably starting with
            several digits and ending with .apps.googleusercontent.com .
            -->
            <googleClientID></googleClientID>
```

        * Utilizatorii care nu sunt logaţi pot folosi http sau https URL- uri (dacă aţi configurat&lt;bazăHttpsUrl&gt; în setup.xml). Mulţumită noului guvern american [Standard numai pentru HTTPS](https://https.cio.gov/) .
        * Acum, puteți încuraja toți utilizatorii să utilizeze https   (nu http ) prin setare&lt;bazaUrl&gt; să fie o https URL. Pentru a forța utilizatorii să utilizeze numai https , trebuie să facă, de asemenea, modificări la setup Apache / Tomcat pentru a bloca non- https Acces. Mulţumită noului guvern american [Standard numai pentru HTTPS](https://https.cio.gov/) .
            
În setup.xml, vă rugăm să modificați descrierea pentru&lt;bazaUrl&gt;
```
            <!-- baseUrl is the start of the public URL, to which "/erddap" 
            is appended. For example:
            For running/testing on your personal computer:
              <baseUrl>http://localhost:8080</baseUrl>     
              (127.0.0.1 doesn't work with authentication=google).
            If you want to encourage all users to use https (not http), 
              make the baseUrl the same as the baseHttpsUrl (see below).
            For ERD releases, we used to use
              <baseUrl>http://coastwatch.pfeg.noaa.gov</baseUrl>    
            For ERD releases, we now use
              <baseUrl>https://coastwatch.pfeg.noaa.gov</baseUrl>    
            -->
```

        * Opțiunile&lt;parolăEncoding&gt; schimbat. În setup.xml, vă rugăm să modificați descrierea pentru&lt;parolaEncoding&gt;
```
            <!-- For "custom" authentication, this specifies how you have 
            stored passwords in the roles tags in datasets.xml.
            If you aren't storing any passwords, this is irrelevant.
            The options (in order of increasing security) are: 
            "MD5", "UEPMD5" (MD5(UserName:ERDDAP:Password)), 
            "SHA256", "UEPSHA256" (SHA256(UserName:ERDDAP:Password), 
            the default).
            You should only use "MD5" or "SHA256" if you need to match 
            values stored that way in an external password database.
            See the info at 
            https://erddap.github.io/setup.html#security
            --> 
```

        * În setup.xml, vă rugăm să modificați descrierea pentru&lt;Baza HttpsUrl&gt;
```
            <!-- This is a variant of <baseUrl> which is used when 
            authentication is active and the user is logged in.
            In general, you take the <baseUrl>, change "http" to "https", 
            and change/add ":8443". This must begin with "https://".
            If you make a proxy so that ":8443" isn't needed, 
            then don't use ":8443" here.
            This is relevant even if <authentication> is "".
            See the instructions at 
            https://erddap.github.io/setup.html#security
            For example:
            For running/testing on your personal computer:
              <baseHttpsUrl>https://localhost:8443</baseHttpsUrl>                  
            For releases at ERD, we use:
              <baseHttpsUrl>https://coastwatch.pfeg.noaa.gov</baseHttpsUrl>  
            If you want to encourage all users to use https (not http), 
              make the baseUrl (see above) the same as the baseHttpsUrl.
            --> 
```

        * Acum, dacă listaPrivateDatesets=adevărat în setup.xml, vor fi afișate și mai puține informații despre seturile de date la care un utilizator nu are acces.
    * Acum, mai ales atunci când sunteţi iniţial stabilirea dvs. ERDDAP Acum îţi poţi da seama. ERDDAP™ să nu încerce să se aboneze la distanță ERDDAP™ Seturi de date. Mulţumită lui Filipe Rocha Freire.
În setup.xml, chiar înainte&lt;fontFamily&gt;, vă rugăm să adăugați
```
        <!-- Normally, if you have a EDDGridFromErddap or EDDTableFromErddap 
        dataset in your datasets.xml, it will try to subscribe to the remote 
        ERDDAP™ dataset so that the local dataset is kept perfectly up-to-date.
        If this ERDDAP™ is not publicly accessible (http://localhost), or its
        IP address will change soon, or you have some other reason, 
        you can tell this ERDDAP™ to not try to subscribe to the remote 
        ERDDAP™ datasets by setting this to false. (default=true) 
        This is the overall setting for this ERDDAP. It can be overridden by
        the same tag (with a different value) in the datasets.xml chunk for 
        a given EDD...FromErddap dataset. 
        For each fromErddap dataset that doesn't subscribe to the remote 
        ERDDAP™ dataset, you should set <reloadEveryNMinutes> to a smaller 
        number so that the local dataset stays reasonably up-to-date. -->
        <subscribeToRemoteErddapDataset>true</subscribeToRemoteErddapDataset>
```

    * În setup.xml, în instrucțiunile de mai sus&lt;emailFromAddress&gt;, vă rugăm să introduceți:
Dacă este posibil, setați acest lucru pentru a utiliza o conexiune securizată (SSL / TLS) serverului de e-mail.
Dacă configurarea dumneavoastră nu utilizează o conexiune sigură la serverul de e-mail, vă rugăm să faceți modificările pentru a face acest lucru.
    * În datasets.xml , vă rugăm să adăugați această linie la descrierea&lt;abonareEmailBlacklist&gt; in your datasets.xml :
Poţi folosi numele "\\*"pentru lista neagră a unui întreg domeniu, de exemplu,\\*@exemplu.com.
    * Deoarece modificarea sistemului de logare în v1.66, fișierul jurnal nu este niciodată actualizat. Există întotdeauna mesaje sau părți de mesaje care așteaptă să fie scrise în fișierul jurnal. Acum, puteți face-l la zi (pentru o clipă) prin vizualizarea ERDDAP Starea paginii web lahttp://_your.domain.org_/erddap/status.html.
    * HashDigest...
    * O mică schimbare. (la String2.canonic) care ar trebui să ajute să păstreze lucrurile în mișcare rapid atunci când ERDDAP™ este foarte ocupat și, de asemenea, mai bine se ocupă cu un număr foarte mare de seturi de date.
    * Puternic Recomandat: opriți utilizarea&lt;converteste-te la PublicSourceUrl&gt; în datasets.xml pentru a converti un număr IP într-un set de date&lt; sourceUrl &gt; (de exemplu,http://192.168.#.#/) în nume de domeniu (de exemplu, http :my. domain.org/) . De acum înainte, noi abonamente lahttp://localhost,http://127.0.0.1, șihttp://192.168.#.#URL-urile nu vor fi permise din motive de securitate. Deci, vă rugăm să utilizați întotdeauna numele domeniului public în&lt; sourceUrl &gt; etichetă (dacă este necesar din cauza problemelor DNS) , puteți folosi [/etc / masa gazdelor de pe server](https://linux.die.net/man/5/hosts) pentru a rezolva problema prin conversia numelor de domenii locale la numere IP fără a utiliza un server DNS. Puteți testa dacă un nume de domeniu dat devine rezolvat în mod corespunzător prin utilizarea
ping _some.main.name_
    * În generareDatasets.xml, pentru seturi de date la distanță (De exemplu, de la un server THREDS) , generat automat datasetID s sunt neschimbate pentru majoritatea domeniilor. Pentru câteva domenii, prima parte (și anume numele) a generat automat datasetID va fi un pic diferit. În mod special, numele care au avut o parte sunt acum mai susceptibile de a avea două părți. De exemplu, seturi de date dinhttp://oos.soest.hawaii.edua condus la datasetID S care a început cu Hawaii, dar acum duce la datasetID S care începe cu Hawaii\\_soest\\_. Dacă asta îţi cauzează probleme, te rog trimite-mi un e-mail. S-ar putea să fie ceva de rezolvat.
    * Şoferul Cassandra a fost actualizat la Cassandra-driver-core-3.0.0.jar şi astfel pentru Cassandra v3. EDDtableFromCassandra nu profită de noi caracteristici în Cassandra v3. Indexurile din Cassandra pot fi acum mai complexe, dar ERDDAP™ încă utilizează modelul de indice Cassandra v2, care presupune că o coloană indexată poate fi interogată direct cu '=' constrângeri. Generează dateName Xml pentru tabelul EDDFromCassandra nu mai detectează coloane cu indexuri; dacă un index este simplu, trebuie să-l specificați în datasets.xml de mână. Dacă aveți nevoie de suport pentru indexuri mai complexe sau alte caracteristici noi, vă rugăm să trimiteți e-mail erd.data at noaa.gov .
&#33; Dacă mai utilizaţi Cassandra 2.x, vă rugăm să continuaţi să utilizaţi ERDDAP™ v1.68 până la upgrade la utilizarea Cassandra 3.x.
    * Jars și Classpath -- Aproape toate fișierele incluse terțe părți .jar au fost actualizate la ultimele lor versiuni.
        * slf4j.jar a fost adăugat la /lib și clasapath.
        * Joid. Borcan şi Tsik. Borcanul a fost scos din /lib și clasapat.
        * Dacă primiți mesaje de eroare despre clase care nu sunt găsite atunci când compilați sau executați ERDDAP™ sau una dintre uneltele sale, compara clasapath linia de comandă la ERDDAP 's [classpath curent](/docs/contributing/programmer-guide#development-environment) să-mi dau seama care dintre ei lipseşte.

## Versiunea 1.68{#version-168} 
 (lansat 2016-02-08) 

*    **Caracteristici noi (pentru utilizatori) :** Niciuna.
     
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    *    [ EDDGrid Agregarea fișierelor prin nume de fișiere sau metadate globale](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) --
Toate variaţiile EDDGrid FromFiles poate acum agrega un grup de fișiere prin adăugarea unei noi dimensiuni stângace, de obicei timp, bazat pe o valoare derivată din fiecare nume de fișier sau din valoarea unui atribut global care este în fiecare fișier.
    * IMPROVED: Am sugerat anterior că ați putea dori să creați un EDDGrid Set de date FromErddap în datasets.xml care a făcut referire și a re-servat JplMU RSS Set de date T în ERDDAP . Deoarece în prezent există o versiune mai nouă a setului de date, acest set de date este acum depreciat. Deci, dacă aveți acel set de date în dumneavoastră ERDDAP™ , vă rugăm să adăugați acest nou set de date
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Dacă doriți să eliminați vechiul jplMU RSS Set de date T din ERDDAP™   (E alegerea ta.) , schimba setarea activa de la "adevărat" la "fals."
    * Fix bug: Vă rugăm să verificați BigParentDirectory pe care ați specificat în setup.xml. Dacă nu ai pus o tăietură la sfârşitul&lt;Nume mare ParentDirector&gt;, apoi ERDDAP™ va fi creat mai multe directoare prin adăugarea de cuvinte direct la numele pe care l-ați specificat, în loc de a crea subdirecții. Începând cu versiunea 1.68, ERDDAP™ adaugă o tăietură la sfârșitul numelui directorului dacă nu ați specificat unul. Deci, dacă anterior nu a specificat o tăietură la sfârșitul anului, atunci când instalați ERDDAP™ v1.68 aveți nevoie pentru a muta și redenumi aceste directoare **după** Ai închis vechiul ERDDAP™ şi **înainte** tu porneşti noul ERDDAP . De exemplu, dacă ați specificat greșit BigParentDirectory ca /home/erddapBPD (nici o tăietură) şi ERDDAP™ a creat din greşeală directoare ca
/home/erddapBPcache
/home/erddapBPDcopy
/home/erddapBPDdataset
/home/erddapBPDflag
/home/erddapBPDlogs
/acasă/erddapBPDlucene
și un fișier numit / home/erddapBPDsubscriptionsV1.txt;
Atunci trebuie să te mişti şi să le redenumeşti.
/home/erddapBPD/cache
/home/erddapBPD/copy
/home/erddapBPD/set de date
/home/erddapBPD/flag
/home/erddapBPD/logs
/home/erddapBPD/lucene
și/home/erddapBPD/subscripțiiV1.txt
    * Fix bug: Erau gândaci înăuntru. EDDGrid LonPM180 în ERDDAP™ v1.66 care a avut loc atunci când setul de date pentru copii este un EDDGrid De la Erddap.
    * Fix bug: Nu a fost un bug în EDDGrid Din fişiere şi tabel EDD Din fişiere în ERDDAP™ v1.66 care a cauzat&lt;ActualizeazăEveryNMillis&gt; care trebuie ignorată prima dată când setul de date a fost încărcat după o repornire.
    * Fixare bug/Caracteristică nouă: Dacă un set de date pentru copii EDDGrid Agregat ExistingDimension, EDDGrid Recepţionat. EDDGrid De la tabelul EDD, EDDGrid LonPM180, EDDGrid SidebySide, EDD TableCopy, sau EDDTABLEFrom EDDGrid este un ...De la setul de date Erddap, acel set de date mamă se abonează acum la baza ERDDAP™ Set de date. Dacă elementul de bază ERDDAP™ Setul de date este în același ERDDAP™ , abonamentul și validarea sa sunt efectuate direct; nu veți primi un e-mail vă cere să valideze abonamentul. În caz contrar, dacă sistemul de abonament pentru dumneavoastră ERDDAP™ este oprit, setați&lt;ReîncarcăEveryNMinutes&gt; setarea setului de date părinte la un număr mic (60?) ca să rămână la zi.
    * Fixare bug/Caracteristică nouă: Dacă un set de date pentru copii EDDGrid Agregat ExistingDimension, EDDGrid Recepţionat. EDDGrid De la tabelul EDD, EDDGrid LonPM180, EDDGrid SidebySide, EDD TableCopy, sau EDDTABLEFrom EDDGrid are activ="fals," că setul de date pentru copii este acum omis.

## Versiunea 1.66{#version-166} 
 (lansat 2016-01-19) 

*    **Caracteristici noi (pentru utilizatori) :** 
    * Grafice (nu hărți) poate avea acum valori descendente pe axe. Pentru a obține acest lucru atunci când utilizați o pagină web Make A Graf, modificați noua Axă Y: Setare ascendentă (implicit) la coborâre. Sau, într-un URL care solicită un grafic, utilizați noul 3rd opțional " | " parametru pentru [&.x Distanţa şi/sau &. Comutatoare yRange](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) , care poate fi nimic (implicit) , adevărat, sau t pentru a obține valori ascendente, sau de a folosi fals sau f pentru a obține valori descendente. Adevăratul | Valorile false sunt insensibile la caz. Mulţumită lui Chris Fullive, John Kerfoot, Luke Campbell şi Cara Wilson.
    * Utilizatorii pot specifica acum culoarea de fundal pentru grafice prin adăugarea unui &.bgColor=0x_ AARGGBB_ comutați la URL-ul care solicită graficul. A se vedea .bgColor în secțiunea Comenzi grafice a [griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) şi [ tabledap ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands) documentația. Mulţumită lui John Kerfoot şi Luke Campbell.
    * Pentru seturile de date tabulare, constrângerile se pot referi acum la min (_unele Nume variabil_) sau max (_unele Nume variabil_) . Vezi? [min () și max. () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min) . Mulţumită lui John Kerfoot.
    * Pentru seturile de date tabelare, constrângeri de timp care utilizează [Acum](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) poate specifica acum unităţi de timp de milisecunde sau milis.
    * O cerere pentru o imagine a unui set de date tabular face acum o hartă (nu un grafic) dacă variabilele x și y sunt variabile de tip longitudine și latitudine (unități compatibile) . Mulţumită lui Rich Signell.
    * Fix Bug: Etichetele și căpușele axei temporale au avut uneori nereguli ciudate atunci când se solicită grafice multiple simultan (de exemplu, pe o pagină web) . Problema a fost un bug în biblioteca grafică SGT care ERDDAP™ utilizări (O singură variabilă era "static" care nu ar fi trebuit să fie) . Mulţumită lui Bradford Butman.
         
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * Este un risc de securitate pentru a pune parola de e-mail într-un fișier text simplu ca setup.xml. Pentru a atenua această problemă, vă recomandăm cu tărie:
        1. Configurare un cont de e-mail doar pentru ERDDAP 's use, de ex., erddap@ yourInstitution.org. Acest lucru are și alte beneficii; în special, mai multe ERDDAP™ Administratorul poate avea acces la acel cont de e-mail.
        2. Face permisiunile de configurare.xml fișier rw (citeste+ scriere) pentru utilizatorul care va rula Tomcat și ERDDAP™   (user=tomcat?) şi fără permisiuni. (nu citesc sau nu scriu) pentru grup și alți utilizatori. Mulţumită lui Filipe Rocha Freire.
    * Noul [ArchiveADataset](/docs/server-admin/additional-information#archiveadataset) instrument simplifică crearea .tar  .gz arhiva cu un subset de seturi de date într-un format adecvat pentru arhivare (în special, la NOAA 's NCEI) . Acest lucru ar trebui să fie util pentru mulți ERDDAP™ administratori în multe situații, dar în special pentru grupuri din NOAA .
    * Noul tip de set de date [ EDDGrid De la NCFilesDespachetat](/docs/server-admin/datasets#eddgridfromncfilesunpacked) este o variantă de EDDGrid De la NCFiles. Diferenţa este că această clasă despachetează fiecare fişier de date înainte EDDGrid FromFiles se uită la fișiere:
        
        * Acesta despachetează variabile ambalate care utilizează scale\\_factor și/sau add\\_offset .
        * Acesta promovează variabile întregi care au \\_Unsigned=Atribuții reale unui tip de date întreg mai mare, astfel încât valorile să apară ca valori nesemnate. De exemplu, un octet nesemnat (8 biți) variabila devine un scurt semnat (16 biți) variabilă.
        * Se convertește \\_FillValue și missing\\_value valorile care urmează să fie ale NaN (sau MAX\\_VADIU pentru tipuri de date întregi) .
        
Marele avantaj al acestei clase este că oferă o modalitate de a face față diferitelor valori ale scale\\_factor , add\\_offset , \\_FillValue, sau missing\\_value în diferite fișiere dintr-o colecție. În caz contrar, ar trebui să utilizați un instrument ca [NcML](/docs/server-admin/datasets#ncml-files) sau [ NCO ](/docs/server-admin/datasets#netcdf-operators-nco) pentru a modifica fiecare fișier pentru a elimina diferențele astfel încât fișierele să poată fi manipulate de EDDGrid De la NCFiles. Pentru ca această clasă să funcționeze corect, fișierele trebuie să respecte standardele CF pentru atributele aferente. Mulţumită lui Philippe Makowski.
    * Noul tip de set de date [ EDDGrid LonPM180](/docs/server-admin/datasets#eddgridlonpm180) permite schimbarea seturilor de date care au unele valori de longitudine mai mare de 180 (De exemplu, intervalul 0 - 360) în seturi de date cu valori de longitudine cuprinse între 180 și 180 (Longitudine Plus sau Minus 180, prin urmare numele) . Marele avantaj pentru a oferi seturi de date cu valori de longitudine în intervalul -180 la 180 este că OGC servicii (de exemplu, WMS ) necesită valori de longitudine în acest interval. Mulţumită lui Lynne Tabewski, Fabien Guichard, Philippe Makowski şi Martin Spel.
2016-01-26 Update: Eeek&#33; Acest lucru are un bug care apare atunci când setul de date pentru copii este un EDDGrid De la Erddap care face trimitere la un set de date în același ERDDAP . Acest bug este fixat în ERDDAP™ V1.68.
    * În [GenereazăSeturi de dateXml](/docs/server-admin/datasets#generatedatasetsxml) , un nou tip special de set de date; EDDGrid LonPM180FromErddapCatalog, vă permite să generaţi datasets.xml pentru EDDGrid Set de date LonPM180 din toate EDDGrid Seturi de date într-un ERDDAP care au valori de longitudine mai mari de 180.
    * Pentru toţi EDDGrid seturi de date, în datasets.xml acum puteti folosi optiunea
[&lt;accesibil Via WMS &gt; Adevărat | fals&lt;/accesibil Via WMS &gt;] (/docs/server-admin/sets#accessibleviawms)   (implicit=adevărat) . Setarea acest lucru pentru a dezactiva forțat fals WMS servicii pentru acest set de date. Dacă este adevărat, setul de date poate să nu fie încă accesibil prin intermediul WMS din alte motive (de exemplu, fără axe lat sau lon) . Acest lucru este deosebit de util pentru seturile de date care există pe cont propriu și înfășurate de EDDGrid LonPM180, astfel încât numai versiunea LonPM180 este accesibilă prin intermediul WMS .
    * În setup.xml, puteți specifica o culoare implicită diferită pentru fundalul graficelor. Culoarea este specificată ca o valoare hexazecimală de 8 cifre în forma 0x_AAARGGBB_, unde AA, RR, GG și BB sunt componentele opacității, roșii, verzi și, respectiv, albastre, specificate ca numere hexazecimale de 2 cifre. Rețineți că pânza este întotdeauna opac alb, astfel încât o (semi -) culoare de fundal grafic transparent se amestecă în panza alb. Implicit este albastru deschis:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
Mulţumită lui John Kerfoot şi Luke Campbell.
    * În setup.xml, puteți specifica acum dimensiunea maximă pentru [fișier jurnal](/docs/server-admin/additional-information#log)   (atunci când este redenumit în jurnal. TXT. anterior și un nou jurnal. txt este creat) În MegaBytes. Minimul permis este 1. Maximul permis este 2000. Implicit este de 20 (MB) . De exemplu:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * În datasets.xml , [&lt;fgdcFile&gt;] (/docs/server-admin/datesets#fgdcfile) sau [&lt;izo19115File&gt;] (/docs/server-admin/datasets#iso19115file) poate fi acum un fișier local (ca înainte) sau un URL (care va fi descărcat astfel încât există o copie locală) . Dacă ERDDAP™ nu poate descărca fișierul, încărcarea setului de date va continua, dar setul de date nu va avea un fișier fgdc sau iso19115.
    *    EDDGrid Din fişiere şi tabel EDD Seturile de date de la Dosare pot face acum o repornire rapidă (sistemul care ERDDAP™ încearcă să utilizeze atunci când seturile de date sunt încărcate pentru prima dată când ERDDAP™ se reia) . Acest lucru accelerează repornirea ERDDAP .
2016-01-26 Update: Eeek&#33; Acest lucru are un bug care cauzează&lt;ActualizeazăEveryNMillis&gt; care trebuie ignorată prima dată când setul de date este încărcat după repornire. Acest bug este fixat în ERDDAP™ V1.68.
    * O îmbunătățire generală a sistemului QuickRestart permite ERDDAP™ pentru a încărca seturi de date mai repede atunci când ERDDAP™ se reia.
    * Toate EDDGrid Din fişiere şi tabel EDD Subclasele FromFiles acceptă acum un nou&lt;eticheta pathRegex&gt;, de obicei specificată mai jos&lt;recursiv&gt;. Dacă recursivul este "adevărat," numai căi complete subdosar care se potrivesc cu caleaRegex (implicit=".\\*") va fi acceptat. În mod similar, a&lt; sourceUrl s &gt; tag in an EDDGrid AgregatExistingDimension poate include acum un atribut caleRegex (implicit=".\\*") .
    * Implicit pentru&lt;parţialRequestMaxBytes&gt; in setup.xml is now 490000000 (~490 MO) . Acest lucru evită unele probleme / temporizări legate de obtinerea de date de la serverele de date TREDDS. Mulţumită lui Leslie Thorne.
    * O mică modificare a sistemului log ar trebui să permită ERDDAP™ pentru a fi mai receptiv atunci când este foarte, foarte ocupat. Informaţiile sunt acum scrise în fişierul jurnal de pe unitatea de disc în bucăţi destul de mari. Avantajul este că acest lucru este foarte eficient - ERDDAP™ nu va bloca niciodata asteptarea ca informatiile sa fie scrise in fisierul jurnal. Dezavantajul este că jurnalul se va termina aproape întotdeauna cu un mesaj parțial, care nu va fi finalizat până la următoarea bucată este scris.
    * Fix Bug legate de inotificare și [&lt;updateEveryNMillis&gt;] (/docs/server-admin/sets#datate everyenmmillis) sistem de EDDGrid Din fişiere şi tabel EDD Seturi de fișiere: Nu mai este necesar să se specifice o mare de fs.inotify.max\\_user\\_măsură sau fs.inotify.max\\_user\\_instances. Există un bug în Java care cauzează unele părți ale Java 's inotify/WatchDirectory system to not to be collected when they are finalized; în cele din urmă, numărul de zombie inotifica ceasuri sau cazuri ar depăși numărul maxim specificat. ERDDAP™ Acum lucrează în jurul acestui Java Bug.
De asemenea, numărul de fire inotify este listat pe status.html pagina web, astfel încât să puteți păstra un ochi pe utilizarea sa. De obicei, există 1 fir inotificat pe EDDGrid Din fişiere şi tabel EDD De la Fişiere.
    * Fix Bug: în multe locuri, în loc de o eroare fiind rethrown, a fost generată o nouă eroare, care a inclus doar o versiune scurtă a mesajului de eroare original și fără urmă stiva. Acum, când o nouă eroare este generată, include în mod corespunzător întreaga excepție originală, de exemplu, arunca noua excepție ("un mesaj nou," e) ;
Mulţumită lui Susan Perkins.
    * Fix Bug: până de curând (V1.64?) , dacă un .../ datasetID URL a fost solicitat, ERDDAP™ ar adăuga .html la URL. În v1.64, aceasta a eșuat (a fost generat un URL formatat incorect și apoi a eșuat) . Acum, acest lucru funcționează din nou. Mulţumită lui Chris Fullive.

## Versiunea 1.64{#version-164} 
 (lansat 2015-08-19) 

*    **Caracteristici noi (pentru utilizatori) :** 
    * Există acum orientări pentru accesarea privatului protejat cu parolă ERDDAP™ Seturi de date ( https:// ) prin curl şi Python . Vezi [ curl ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl) şi [ Python ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python) instrucţiuni.
Mulţumită lui Emilio Mayorga de la NANOOS şi Paul Janecek de la Spyglass Technologies.
         
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    *    ERDDAP™ Acum cere Java 1.8+.
         Java 1.7 a ajuns la [Sfârşitul vieţii](https://www.oracle.com/technetwork/java/eol-135779.html)   (Gata cu actualizările de securitate) în aprilie 2015. Această versiune ERDDAP™ nu va funcționa cu versiuni ale Java sub 1.8. Dacă actualizați de la Java 1,7x (sau mai devreme) Ar trebui să-l actualizezi şi pe Tomcat. Vezi [ ERDDAP™ Configurare instrucțiuni](/docs/server-admin/deploy-install) pentru link-uri de descărcare și sfaturi.
    * Formular nou furnizor de date.
Când un furnizor de date vine la tine în speranța de a adăuga unele date la dvs. ERDDAP™ , poate fi dificil și consumatoare de timp pentru a colecta toate metadatele necesare pentru a adăuga setul de date în ERDDAP . Multe surse de date (de exemplu, fișiere .csv; Fișiere Excel, baze de date) nu au metadate interne, deci ERDDAP™ are un nou formular de furnizor de date care colectează metadate de la furnizorul de date și oferă furnizorului de date alte orientări, inclusiv orientări extinse pentru datele din bazele de date. Informațiile transmise se convertesc în datasets.xml format și apoi e-mailat la ERDDAP™ administrator (Tu) şi scris (anexată) la BigParentDirector/loguri/dateProviderForm.log . Astfel, forma semi-automate procesul de a obține un set de date în ERDDAP™ Dar ERDDAP™ administratorul încă trebuie să completeze datasets.xml bucată și se ocupă cu obținerea fișierului de date (s) de la furnizor sau conectarea la baza de date. Pentru mai multe informaţii, a se vedea [Furnizor de date Descrierea formularului](/docs/server-admin/datasets#data-provider-form) .
    * Nou&lt;MatchAxisNDigits&gt;
poate fi utilizat de EDDGrid Din dosare (și astfel de la NCFiles și de la MergeIRFiles) , EDDGrid Agregat ExistingDimension, EDDGrid Recepţionat. EDDGrid Seturile de date SideBySide pentru a specifica cât de exact trebuie să fie egalul valorilor axei în diferite fișiere (câte cifre) : 0=nicio verificare (Nu folosi asta&#33;) , 1-18 pentru creșterea preciziei, sau 20 (implicit) pentru egalitate exactă. Pentru n=1-18, ERDDAP™ asigură că primele n cifre ale valorilor duble (sau (n+1) Diviziunea 2 pentru valorile flotoare) sunt egali.
        &lt;MatchAxisNDigits&gt; înlocuiește&lt;asiguraAxisValuesAreEqual&gt;, care este acum depreciat. O valoare de "adevărat" va fi convertită în potrivire cu AxisNDigits=20. O valoare de "fals" (Nu face asta&#33;) va fi convertit în potrivire AxisNDigits=0.
    *    EDDGrid Din fişiere şi tabel EDD FromFiles va încărca foarte lent prima dată când utilizați această versiune a ERDDAP .
         ERDDAP™ Acum stochează informațiile din dosarul intern un pic diferit, astfel încât tabelul de fișiere interne pentru fiecare dintre aceste seturi de date trebuie să fie reconstruite. Aşa că nu-ţi face griji. Nu s-a întâmplat nimic. E o singură dată.
    * Fișiere sursă la distanță
         EDDGrid FromNcFiles, EDDtableFromNcFiles, EDDtableFromNcFFiles permite acum fișierelor să fie fișiere la distanță într-un director accesibil de http://   (şi probabil https:// și ftp://, dar acestea sunt netestate) dacă serverul de la distanță suportă [Solicitări de interval](https://en.wikipedia.org/wiki/Byte_serving) în antetul cererii. THREDDS și Amazon S3 suport Range Cereri, Hyrax Nu. Acest sistem vă permite să accesați date în fișiere la distanță fără a descărca fișierele (care este util în cazul în care fișierele la distanță sunt prea voluminoase) , dar accesul la aceste fișiere va fi mult mai lent decât accesul la fișiere locale sau chiar la o distanță OPeNDAP Sursa.
Aceasta include "files" într-o găleată Amazon S3, deoarece acestea sunt accesibile prin intermediul http:// . Dacă numele obiectului S3 sunt ca numele fișierelor (cu interior / e ca un director Linux) , ERDDAP™ poate face, de asemenea, fișierele accesibile prin intermediul ERDDAP 's "files" sistem. Pentru ca acest lucru să funcționeze, acreditările S3 trebuie să fie în ~/.aws / credibilități (pe Linux, OS X sau Unix) , or C:\\Users\\USERNAME\\.aws\\credentials (pe Windows) pe server cu ERDDAP . Vezi [Documentația Amazon SDK](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1) .
    * Generează dateName Xml are o opțiune nouă, neobișnuită: EDDsFromFiles.
Acest lucru va trece printr-un sistem de fișiere (chiar și un sistem de la distanță ca un Amazon S3 în cazul în care obiectele au nume de tip fișier) şi creează datasets.xml bucăți pentru o serie de seturi de date. Kilometrajul poate varia. Acest lucru funcționează bine dacă fișierele sunt organizate astfel încât toate fișierele de date dintr-un anumit director (și subdirecțiile sale) sunt adecvate pentru un set de date (De exemplu, toate compozitele SST de 1 zi) . Altfel... (de exemplu, dacă un director conține unele fișiere SST și unele fișiere Clorofill-a) , acest lucru funcționează prost, dar poate fi încă util.
    * Programatori: fișiere noi /lib .jar.
Dacă compilați ERDDAP™ , vă rugăm să rețineți noile fișiere .jar în parametrul Classpath -cp enumerate în ERDDAP™   [Ghidul programatorului](/docs/contributing/programmer-guide) .
    * Sea\\_water\\_practical\\_salinity
Dacă utilizați denumirea standard CF mare\\_apă\\_salinitate pentru orice variabilă, vă încurajez să treceți la mare\\_apă\\_practic\\_salinitate, care este disponibil în [versiunea 29 a tabelului de denumire standard CF](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)   (și unele versiuni anterioare - nu știam că) . Această denumire indică faptul că aceasta este într-adevăr o valoare practică a salinității folosind Practical Salinity Units   ( PSU ) , spre deosebire de o valoare mai mare g/kg. Unităţile canonice sunt diferite, dar totuşi incredibil de nefolositoare: 1 (presupun că implică PSU /PSS-78) , spre deosebire de 1e-3 (se presupune că implică g/kg) pentru apa de mare. \\[ Hei, Unidata și CF: Identificăm valorile care folosesc alte solzi, de exemplu Fahrenheit sau Celsius, printr-un şir de unităţi care este numele scalei sau o anumită variaţie. De ce nu putem identifica unitățile de salinitate prin scala lor, de exemplu, PSS-78? Ştiu: valorile PSS-78 sunt "unite," dar există o scară implicită, nu-i aşa? Dacă inventez o nouă scară practică a salinităţii unde valorile sunt de 0,87 ori mai mari decât valorile PSS-78, ar trebui ca unităţile canonice să fie încă "1? Cum le-ar putea deosebi un utilizator? Unitățile de 1e-3 și 1 nu sunt nici descriptive, nici utile utilizatorilor care încearcă să își dea seama ce indică numerele. \\] 

## Versiunea 1.62{#version-162} 
 (lansat 2015-06-08) 

*    **Caracteristici noi (pentru utilizatori) :** 
    * Pentru EDDGrid Seturi de date, utilizatorii pot face acum Tip grafic: Grafice de suprafață cu orice combinație de axe numerice, nu doar longitudine față de latitudine. Asta îţi permite să faci x versus y (proiectat) grafice și diverse [Diagrame Hovmöller](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram) , de exemplu, complot longitudine versus adâncime, sau timp versus adâncime. \\[ Notă: dacă adâncimea este pe axa Y, va fi probabil răsturnată din ceea ce vrei. Ne pare rău, un-flipping nu este încă o opțiune. \\] Mulţumită Carei Wilson şi Lynn DeWitt.
    * Există o nouă [Convertor oceanic/atmosferic](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html) care vă permite să convertiți un acronim comun oceanic/atmosferic la/de la un nume complet.
    * Există o nouă [Oceanic/Atmosferă Convertor nume variabile](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html) care vă permite să convertiți un nume comun variabil oceanic/atmosferic la/de la un nume complet.
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    *    Java 7/8
         Oracle nu mai suportă (oferă dispozitive de securitate bug pentru)   Java 7. ERDDAP™ încă susține Java 7, dar vă rugăm să mutați la Java 8. Următoarea versiune ERDDAP™ va necesita probabil Java 8.
    *    valid\\_min /max/interval
Din episoadele anterioare... dataVariable a avut scale\\_factor şi add\\_offset metadate; ERDDAP™ despachetează valorile datelor și elimină metadatele. Anterior, ERDDAP™ nu a modificat/despachetat valid\\_range , valid\\_min , valid\\_max metadate (care de obicei/ar trebui să conțină valori ambalate) de scale\\_factor şi add\\_offset . Acum da. Vă rugăm să căutați ERDDAP™ pentru "valid\\_" și asigurați-vă că toate variabilele care au valid\\_range , valid\\_min , sau valid\\_max au valorile corecte atunci când seturile de date apar în noua versiune a ERDDAP . Vezi? [ valid\\_range /min/maxim documentation](/docs/server-admin/datasets#valid_range) .
    * ACDD- 1, 3
Anterior, ERDDAP™   (Generează date Xml) utilizat/recomandat originalul (1, 0) versiunea [ NetCDF Atribuie Convenția pentru descoperirea datelor](https://wiki.esipfed.org/ArchivalCopyOfVersion1) care a fost menționată ca " Unidata Dataset Discovery v1.0" în convenţiile globale şi Metadata\\_Conventions atribute. Acum, vă recomandăm [Versiunea ACDD 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) care a fost ratificată la începutul anului 2015 și este denumită "ACDD-1.3.." Din fericire, ACDD-1.3 este compatibil cu versiunea 1.0. RECOMANDĂM că [Comută la ACDD-1.3](/docs/server-admin/datasets#switch-to-acdd-13) . Nu e greu.
    * Generează dateName Atribute Xml
Au existat un număr mare de modificări pentru a îmbunătăți&lt; addAttributes &gt; valori sugerate de GenerateDatasets Xml pentru convenţiile globale, creator\\_name /email/url, cuvinte cheie, rezumat și atribute titlu și pentru variabila long\\_name atribut. Unele modificări sunt legate de noua utilizare a ACDD-1.3.
    * Tabel EDD din SOS Seturi de date
Cu adăugarea ocazională de noi tipuri de SOS servere și modificări la serverele vechi, este din ce în ce mai greu pentru ERDDAP™ pentru a detecta automat tipul serverului din răspunsurile serverului. Utilizarea [&lt;sosServerType&gt;] (/docs/server-admin/datesets#eddtablefromsos-scheleton-xml)   (cu o valoare de IOOS\\_NDBC, IOOS\\_NOS, OOSTethys , sau WHOI) este acum recomandată în mod puternic. Dacă oricare dintre seturile dumneavoastră de date de acest tip au probleme în noua versiune a ERDDAP , încercați re-running GenerateDatasets Xml pentru SOS server pentru a genera o nouă bucată de datasets.xml pentru acel set de date. Generează dateName Xml vă va lăsa să încercați diferite&lt;sosServerType&gt; opțiuni până când găsiți cel potrivit pentru un server dat. Dacă mai aveți probleme, vă rugăm să-mi spuneți problema pe care o vedeți și URL-ul serverului și voi încerca să vă ajut.
    * Tabel EDD din seturile de date pentru fileNames
Unele atribute recomandate addAttributes sunt acum surseAtributuri. Probabil nu trebuie să schimbi nimic pentru setările de date existente. datasets.xml .
    * fix bug legat de anumite cereri la tabelul EDDFromNcFFiles settings.
De asemenea, am adăugat un număr mare de teste unitare la numărul mare de teste unitare existente ale metodelor subiacente (Sunt 100 de scenarii.) . Mulţumită lui Eli Hunter.
    * Fixare bug / mici modificări la EDDGrid Din Mergeir.
Mulţumită lui Jonathan Lafite şi Philippe Makowski
    * Fix bug: EDDGrid De la Erddap funcționează acum chiar dacă un set de date la distanță nu are ioos\\_category atribute variabile.
Mulţumită lui Kevin O'Brien.
    * Fix Bug în .graph pagina web pentru EDDGrid Seturi de date atunci când există o singură variabilă de axă cu mai mult de o valoare.
Mulţumită lui Charles Carleton.
    * Au existat şi alte mici îmbunătăţiri, schimbări şi reparaţii de insecte.

## Versiunea 1.60{#version-160} 
 (lansat 2015-03-12) 

*    **Caracteristici noi (pentru utilizatori) :** niciuna
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * RECOMANDAT PUTERNIC: Actualizează serverul [roboți.txt](/docs/server-admin/additional-information#robotstxt) fișier de inclus:
Dezactivează: /erddap/files/
    * Anunță problema și soluția:
Pe calculatoare Linux, dacă utilizați&lt;updateEveryNMillis&gt; cu seturi de date cu tip = EDDGrid Din Dosare, EDD Table FromFiles, EDDGrid Copiați, EDDtableCopy, sau subclasele lor, puteți vedea o problemă în cazul în care un set de date nu se încarcă (ocazional sau constant) cu mesajul de eroare: "IOException: User limit of inotify instances touch or too many open files." Dacă da, puteţi rezolva această problemă sunând (ca rădăcină) :
ecou fs.inotify.max\\_user\\_temes=65536 | tee -a /etc/sysctl.conf
ecou fs.inotify.max\\_user\\_stances=1024 | tee -a /etc/sysctl.conf
sysctl-p
Sau, folosiţi numere mai mari dacă problema persistă. Implicit pentru ceasuri este 8192. Situația implicită a cazurilor este 128. \\[ UPDATE: există un bug în Java care determină neotificarea cazurilor să nu fie colectate gunoiul. Această problemă este evitată în ERDDAP™ V1.66 şi mai sus. Deci, soluția mai bună este de a trece la ultima versiune a ERDDAP . \\] 
    * NoSuchFileException Fix Bug:
Nu a fost un bug care ar putea provoca seturi de date de tip = EDDGrid Din Dosare, EDD Table FromFiles, EDDGrid Copiați, EDDtableCopy, sau subclasele lor pentru a nu încărca ocazional cu eroarea "NoSuchFileException: _uneleFileName_." Gândacul este legat de utilizările FileVisitor și a fost introdus în ERDDAP™ v1.56. Problema este rară și este cel mai probabil să afecteze seturile de date cu un număr mare de fișiere de date care se schimbă frecvent.
    * Au existat unele îmbunătăţiri mici, schimbări, şi soluţii bug.

## Versiunea 1.58{#version-158} 
 (lansat 2015-02-25) 

*    **Caracteristici noi (pentru utilizatori) :** 
    * Noul [ "files" ](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) sistem permite navigarea unui sistem virtual de fișiere și descărcarea fișierelor sursă de date din multe ERDDAP™ Seturi de date. ă "files" sistemul este activ în mod implicit, dar ERDDAP™ Administratorii pot dezactiva prin punerea
```
        <filesActive>false</filesActive>  
```
în ERDDAP™ Setup.xml file. Mulțumiri speciale pentru Philippe Makowski, care a persistat când am fost lent pentru a aprecia frumusețea acestei idei.
    * destinația timpului; Max... Anterior, variabila temporală a seturilor de date EDD Table cu date în timp aproape real a avut o destinațieMax of NaN, care a implicat faptul că valoarea maximă a timpului pentru setul de date este recentă, dar nu tocmai cunoscută și în schimbare frecvent. Acum, destinaţiaMax are o valoare reală, indicând ultima dată cunoscută în prezent. Multe seturi de date au actualizat continuu datele. ERDDAP™ sprijină accesarea celor mai recente date, chiar dacă este după ultima dată cunoscută în prezent. Rețineți că noul [&lt;updateEveryNMillis&gt;] (/docs/server-admin/sets#datate everyenmmillis) sprijin în EDDGrid Din fişiere şi tabel EDD De la Fişiere seturi de date actualizează destinaţia variabilei de timpMax. O altă consecință a acestei schimbări este că datasetID = allDatasets Setul de date include acum ultima dată cunoscută în coloanele maxTime. Mulţumită lui John Kerfoot.
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * RECOMANDAT PUTERNIC: Actualizează serverul [roboți.txt](/docs/server-admin/additional-information#robotstxt) fișier de inclus:
Dezactivează: /Fişiere/
Dezactivează: /erddap/files/
    * Eșantion datasets.xml -- Anul trecut, am recomandat mai multe seturi de date excelente în ceasul de coastă ERDDAP™ că ai putea adăuga la dvs. ERDDAP™ doar prin adăugarea câteva linii la dvs. datasets.xml . Dacă ați adăugat seturile de date ErdVH, vă rugăm să treceți la seturile de date ErdVH2:
        * Faceți o copie a tuturor seturilor de date ErdVH și modificați copia datasetID E de la ErdVH... la ErdVH2... şi schimbă referinţa. sourceUrl de la ErdVH... la ErdVH2...
        * Setează setul de date ErdVH la "fals."
    * Toate EDDGrid Din fişiere şi tabel EDD Subclasele FromFiles sprijină acum [&lt;accessableViaFiles&gt;] (/docs/server-admin/sets#accesibilviafiles) pentru a face accesibile fișierele sursă de date prin intermediul "files" sisteme. În mod implicit, acest sistem este oprit pentru fiecare set de date. Trebuie să adăugați eticheta pentru a-l activa. Mulţumită lui Philippe Makowski.
    * Toate EDDGrid Din fişiere şi tabel EDD Subclasele FromFiles sprijină acum [&lt;updateEveryNMillis&gt;] (/docs/server-admin/sets#datate everyenmmillis) . În mod implicit, acest sistem este oprit pentru fiecare set de date. Trebuie să adăugați eticheta pentru a-l activa. Mulţumită lui Dominic Fuller-Rowell şi NGDC.
    * Noul [Tabel EDDFromFileNames](/docs/server-admin/datasets#eddtablefromfilenames) creează un set de date din informații despre un grup de fișiere din sistemul de fișiere al serverului, dar nu servește date din interiorul fișierelor. De exemplu, acest lucru este util pentru distribuirea de colecții de fișiere de imagine, fișiere audio, fișiere video, fișiere de procesare a cuvintelor și fișiere de foi de calcul. Acest lucru funcționează mână în mână cu noul [ "files" ](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) sistem, astfel încât utilizatorii pot descărca fișierele. Mulțumiri speciale pentru Philippe Makowski, care a persistat când am fost lent pentru a aprecia frumusețea acestei idei.
    * Noul [ EDDGrid Tabel de la EDD](/docs/server-admin/datasets#eddgridfromeddtable) vă permite să convertiți un set de date tabular într-un set de date grilat. Mulţumită Ocean Networks Canada.
    * Noul [ EDDGrid De la MergeIRFiles](/docs/server-admin/datasets#eddgridfrommergeirfiles) date agregate dintr-un grup de CombeIR locale .gz Dosare. EDDGrid FromMergeIRFiles are distincţia de a fi prima bucată de cod a contribuit la ERDDAP . A fost făcută în întregime fără ajutorul nostru. Trei urale şi mulţumiri speciale pentru Jonathan Lafite şi Philippe Makowski de la R.Tech Engineering.
    * Există o nouă, opțional setup.xml tag,&lt;UnitateaTestDataDir&gt;, care specifică directorul cu unitățile de testare a fișierelor de date disponibile prin intermediul unui nou depozit GitHub: [https://github.com/ERDDAP/erddapTest](https://github.com/ERDDAP/erddapTest) . De exemplu:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
Acest lucru nu este util încă, dar face parte din mișcarea spre a face cât mai multe teste de unitate runnable de către alte persoane posibil. Mulţumită lui Terry Rankine.
    * Au fost multe îmbunătăţiri mici, schimbări şi reparaţii de insecte.

## Versiunea 1.56{#version-156} 
 (lansat 2014-12-16) 

*    **Caracteristici noi (pentru utilizatori) :**   (Niciuna) 
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * Probabil stii deja despre [ EDDGrid FromErddap](/docs/server-admin/datasets#eddfromerddap) şi [Tabel EDD FromErddap](/docs/server-admin/datasets#eddfromerddap) care vă permite să conectați la seturi de date în alte ERDDAP S şi le au apar în dumneavoastră ERDDAP . Cererile utilizatorilor de date reale din aceste seturi de date sunt direcţionate invizibil către sursă ERDDAP™ , astfel încât datele să nu curgă prin sistemul dumneavoastră sau să utilizeze banda de bandă. Există în prezent o listă largă de seturi de date recomandate în eșantion datasets.xml în erddapContent .zip . Pentru a le include în dumneavoastră ERDDAP™ Tot ce trebuie să faci este să copiezi şi să lipeşti cele pe care le vrei. datasets.xml . Mulţumită lui Conor Delaney.
    * Dacă compilați ERDDAP™ Trebuie să adaugi ceva nou. fișiere borcan la dvs. [switch-classepath](/docs/contributing/programmer-guide#development-environment) pentru Javac şi Java.
    * Noul [Tabel EDD din Cassandra](/docs/server-admin/datasets#eddtablefromcassandra) se ocupă de obținerea datelor de la [Cassandra.](https://cassandra.apache.org/) . Mulţumită Ocean Networks Canada.
    * Noul [Tabel EDDDinColumnarAsciiFiles](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles) se ocupă de obţinerea datelor din fişierele de date ASCII cu coloane fixe. Mulţumită lui Philippe Makowski.
    * Toate EDDGrid Din fişiere şi tabel EDD Subclasele FromFiles folosesc acum o nouă metodă, FileVisitor (adăugat la Java în 1, 7) pentru a aduna informații despre fișiere. Acest lucru nu poate avea nici un beneficiu pentru prima colectare de informații de fișiere pentru un anumit set de date, dar se pare că au un beneficiu imens pentru adunările ulterioare, dacă au făcut în curând, în timp ce SG încă are cache-ul de informații. Mulţumită NGDC.
        
Vă recomandăm: Dacă un set de date are un număr mare de fișiere (De exemplu, &gt; 1000) , sistemul de operare (şi astfel EDDGrid Din fişiere şi tabel EDD din dosare) va funcționa mult mai eficient dacă stocați fișierele într-o serie de subdirecții (unul pe an sau unul pe lună pentru seturi de date cu fișiere foarte frecvente) , astfel încât nu există niciodată un număr mare de fișiere într-un director dat.
        
    * Câteva mici îmbunătățiri la tabelul EDD FromAsciiFiles.
    * Unele îmbunătățiri la tabelul EDDFromAsciiServiceNOS, în special pentru a obține câteva coloane suplimentare de informații de la sursă. Mulţumită lui Lynn DeWitt.
    * Unele mici dispozitive bug legate de ISO 19115 care ERDDAP™ generează. Mulţumită Annei Milan.

## Versiunea 1.54{#version-154} 
 (lansat 2014-10-24) 

*    **Caracteristici noi (pentru utilizatori) :** 
    * Unele variabile lucrează acum cu timpul la precizia milisecundelor, de exemplu 2014-10-24T16:41:22.485Z. Mulţumită lui Dominic Fuller-Rowell.
*    **Modificări mici/Reparații de bug:** 
    * Fix Bug: cu o anumită combinație de circumstanțe, EDDGrid Seturile de date din NcFile returnate cu precizie redusă (De exemplu, plutește în loc de duble) . Acest lucru ar putea afecta doar valorile datelor cu &gt; 8 cifre semnificative. Scuzele mele. (Și a fost un bug programator clasic: un personaj greșit.) Mulţumită lui Dominic Fuller-Rowell.
    * Multe mici schimbări.
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * Seturile de date Griddap sprijină acum variabilele axei de timp și variabilele de date (și anume variabile cu valori ale timpului, dar destinationName altele decât "time" ) . Mulţumită lui Dominic Fuller-Rowell.
    *    ERDDAP™ acum corect suporta milisecunde time\\_precision "1970-01-01T00:00.000Z." O ciudățenie intenționată: atunci când scrieți momente către fișiere orientate către oameni (de exemplu, .csv, .tsv , .json , .xhtml ) , ERDDAP™ utilizează specificațiile time\\_precision dacă include secunde și/sau secunde zecimale; în caz contrar, utilizează secunde time\\_precision "1970-01-01T00:00:00Z" (pentru consistență și compatibilitate înapoi) . Mulţumită lui Dominic Fuller-Rowell.
    *    EDDGrid FromNcFiles suportă acum citirea String dataVariable c.
    *    .nc fișiere scrise de griddap poate avea acum String dataVariable c.
    * Generează dateName Xml include acum mai multă culoare () apeluri pentru a evita problema de informații care nu sunt scrise la fișiere. Mulţumită lui Thierry Valero.
    * Documentatia pentru GenerateDatesetsXml a fost imbunatatita, in special pentru a sublinia faptul ca -i comutatorul functioneaza doar daca specificati toate raspunsurile de pe linia de comanda (De exemplu, modul script) . Și modul script este explicat. Mulţumită lui Thierry Valero.
    *    ERDDAP™ nu mai permite ca două variabile dintr-un set de date să aibă aceeași valoare sourceName . (Dacă cineva a făcut-o înainte, probabil a dus la mesaje de eroare.) Ca înainte, ERDDAP™ nu permite două variabile într-un set de date să aibă aceeași destinationName .

## Versiunea 1.52{#version-152} 
 (lansat 2014-10-03) 

*    **Caracteristici noi:**   (niciuna) 
*    **Modificări mici/Reparații de bug:** 
    * Altul. (mai mici) schimbare de făcut ERDDAP™ Mai repede.
    * Îmbunătățirea fișierelor ISO 19115 generate de ERDDAP : adăugat nou recomandat&lt;gmd:protocol&gt; valori (informații, căutare, OPeNDAP : OPeNDAP , ERDDAP :griddap, și ERDDAP : tabledap ) în&lt;gmd:CI\\_OnlineResource&gt; Mulţumită lui Derrick Snowden şi John Maurer.
    * Multe mici schimbări.
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * Fix Bug: GenerateDatesetsXml.sh și DasDds.sh nu au fost în erddap.war pentru 1.48 și 1.50. Acum sunt. Mulţumită lui Thierry Valero.
    * Mici modificări la unele teste de viteză în TestAll pentru a le face mai puțin susceptibile la șansă. Mulţumită lui Terry Rankine.

## Versiunea 1.50{#version-150} 
 (lansat 2014-09-06) 

*    **Caracteristici noi:**   (niciuna) 
*    **Modificări mici/Reparații de bug:** 
    * Asta. ERDDAP™ ar trebui să fie mult mai rapid decât versiunile recente.
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:**   (Nimic.) 

## Versiunea 1.48{#version-148} 
 (lansat 2014-09-04) 

*    **Caracteristici noi:** 
    *    ERDDAP™ acum creează întotdeauna un set de date tabelar, datasetID = allDatasets , care are un tabel de informații cu privire la toate seturile de date în acest sens ERDDAP . Poate fi interogat ca orice alt set de date. Aceasta este o alternativă utilă la sistemul curent pentru obținerea de informații despre seturile de date programatic.
    * Există două tipuri de fișiere de ieșire noi pentru EDDtable și EDDGrid , .csv0 și .tsv 0. Acestea sunt fişiere cu valoare separată şi virgulă care nu au linii cu nume de coloană sau unităţi. Datele încep pe prima linie. Ele sunt deosebit de utile pentru scripturi care doresc doar o bucată de informații de la ERDDAP .
*    **Modificări mici/Reparații de bug:** 
    * Hărțile pot fi acum făcute la longitudinea din intervalul -720-720.
    * Noul .nc Tipul de fișier de răspuns ml este disponibil pentru toți EDDGrid Seturi de date. Se întoarce [NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html) \\-formulat descrierea setului de date (similar cu un combinat .dds + .das) .
    * Fix Bug: Salvarea datelor tabulare la o .nc fișier a fost limitat la 100.000 de valori pe variabilă. Acum este doar limitat la 2 GB dimensiunea totală a fișierului. Mulţumită lui Kevin O'Brien.
    * Fix bug: salvaAs Matlab metodele se asigură acum că datasetID s sunt convertite în condiții de siguranță Matlab nume variabile. Dar tot vă recomand să creaţi datasetID s care sunt nume variabile valabile: începând cu o literă și apoi folosind doar A-Z, a-z, 0-9, și \\_. Vezi? [ datasetID ](/docs/server-admin/datasets#datasetid) . Mulţumită lui Luke Campbell.
    * Fixarea gândacilor în tabelul EDDDin baza de date: Cu unele tipuri de baze de date, un NO\\_ Răspunsul datelor din baza de date a dus la o întârziere inutilă de 30 de secunde în ERDDAP . Mulţumită lui Greg Williams.
    * Fix bug: EDDGrid Faceți un grafic cu tip grafic = linii (sau markeri sau markeri și linii) forțat x axa variabilă pentru a fi timp. Acum poate fi orice axă. Mulţumită lui Lynn DeWitt.
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * RECOMANDAT PUTERNIC: Actualizare Java   
Această versiune ERDDAP™ necesită Java 7 sau mai mare, dar Java 7 își va atinge sfârșitul vieții în aprilie 2015 (Curând&#33;) , deci acum este un moment bun pentru a trece la Java 8. Deci Java 8 este modificat puternic. Testez cu Java 8. Observaţi că Java 6 și-a atins sfârșitul vieții în februarie 2013 (Gata cu dispozitivele de securitate&#33;) .
    * RECOMANDAT PUTERNIC: Actualizează Tomcat
Dacă utilizați Tomcat, vă rugăm să treceți la ultima versiune a Tomcat. Tomcat 8 este conceput pentru a lucra cu Java 8.
    * " ERDDAP "nu mai este un acronim. Acum e doar un nume. Nu vreau ca numele să evidențieze ERD . Vreau ERDDAP™ pentru a evidenţia instituţia şi datele dumneavoastră.
    * Te rog. [personaliza aspectul dumneavoastră ERDDAP™ instalare pentru a evidenția instituția și datele dumneavoastră](/docs/server-admin/deploy-install#customize) . Cu o oră de muncă, poţi face îmbunătăţiri frumoase care vor dura o veşnicie.
    * În setup.xml,&lt;AfișareDiagnosticInfo&gt; opțiunea este acum întotdeauna ignorată și tratată ca și cum valoarea ar fi falsă.
RECOMANDAT: Îndepărtaţi&lt;afiseazaDiagnosticInfo&gt; tag-ul si informatiile aferente de la setup.xml.
    * În setup.xml, implicit pentru&lt; drawLandMask &gt; a fost "peste," dar acum este "sub," care este un implicit general mai bun (funcționează bine cu toate setările de date) .
    * Scripturile GenerateDatasetsXml.sh și DaddDds.sh Linux folosesc acum bash în loc de csh, și au extensia .sh. Mulţumită lui Emilio Mayorga
    * Generează dateName Xml și DasDds creează acum propriile fișiere jurnal (GenereazăDatesetsXml.log și DasDds.log) și fișiere de ieșire (GenereazăDatesetsXml.out și DadDds.out) în _bigParentDirectory_/logs/, și niciodată nu a pus rezultatele lor pe clipboard.
    * Generează dateName Xml suportă acum parametrul liniei de comandă -i care introduce ieșirea în fișierul specificat într-un loc specificat. Vezi [documentația](/docs/server-admin/datasets#generatedatasetsxml) . Mulţumită lui Terry Rankine.
    * Tabel EDDDe la baza de date susţine acum&lt;coloanaNameQuotes&gt;&lt;/coloanăNameQuotes&gt;, cu valori valabile " (implicit) Sau nimic. Acest personaj (dacă este cazul) va fi utilizat înainte și după numele coloanei în întrebările SQL. Diferite tipuri de baze de date, create în moduri diferite, vor avea nevoie de diferite ghilimele.
    * Variabilele de latitudine tabulară și longitudine pot fi acum personalizate long\\_name E, de exemplu, profil Latitude. Anterior, ar putea fi doar Latitudine şi Longitudine.
    * De acum înainte, specificați "defaultDataQuery" și "defaultGraphQuery" ca atribute ale metadatelor globale ale setului de date (adică,&lt;addAtt&gt;), nu separat&lt;implicitDataQuery&gt; și&lt;tag-uri implicitGraphQuery&gt;. (Deși, dacă le mai specificați prin intermediul etichetelor, ERDDAP™ va crea automat atribute globale cu informațiile.) 

## Versiunea 1.46{#version-146} 
 (lansat 2013-07-09) 

*    **Caracteristici noi:** 
    *    (Niciuna) 
*    **Modificări mici/Reparații de bug:** 
    * Fix Bug: in EDDTableFromDatabase, numai in versiunea 1.44, ERDDAP™ citat în mod necorespunzător numele de masă al bazei de date în declarațiile SQL. Acum e reparat. Mulţumită lui Kevin O'Brien.
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    *    ** Dacă nu modificați mesajele standard în mesaje.xml,
Șterge \\[ Tomcat \\] /content/erddap/messages.xml . **   
Fișierul implicit.xml este acum în erddap. fișier de război, nu erdapContent .zip . Deci, nu mai trebuie să actualizați manual mesajele.xml .
    * Dacă modificați mesajele în mesaje.xml, de acum înainte, de fiecare dată când actualizați ERDDAP™ , fie:
        * Face aceleași modificări ai făcut înainte de a noua
             \\[ Tomcat \\] /webapps/erddap/WEB-INF/classes/gov/noaaa/pfel/erddap/util/messages.xml.
Și de data asta: ștergeți \\[ Tomcat \\] /content/erddap/messages.xml .
        * Sau, dau seama ce sa schimbat în noile mesaje.xml (prin diff) , și modificați
             \\[ Tomcat \\] /content/erddap/messages.xml fișier în consecință.

## Versiunea 1.44{#version-144} 
 (lansat 2013-05-30) 

*    **Caracteristici noi:** 
    * Interogări către setul de date al tabelului EDD orderBy Min (...) şi & orderByMinMax  (...)   (care returneaza doua randuri in fiecare grup, cu minimul si maximul ultimei orderBy valoare) . Mulţumită lui Lynn DeWitt.
    * Există două noi tabledap tipuri de fișiere: .nc CFHeader și .nc CFMAheader (care returnează antetul ncdump al antetului corespunzător .nc CF și .nc Tipuri de fișiere CFMA) . Mulţumită lui Steve Hankin.
*    **Modificări mici/Reparații de bug:** 
    * Fix Bug: încărcarea paginilor web .graph și .html pentru seturi de date cu o mulțime de valori de timp a fost lentă deoarece ERDDAP™ a fost lent atunci când a generat opțiunile slider timp. Acum este întotdeauna rapid. Mulţumită lui Michael Barry, OOICI şi Kristian Sebastian Blalid.
    * Fix bug: În unele tipuri de seturi de date EDD, constrângerile de timp nu au fost întotdeauna tratate corect. Acum sunt. Mulţumită lui John Maurer şi Kevin O'Brien.
    * Fix Bug: seturi de date nu s-ar încărca atunci când toate subsetVariables au fost variabile cu valoare fixă. Acum o vor face. Mulţumită lui Lynn DeWitt şi John Peterson.
    * Improved: acum, toate întrebările pentru variabilele doar subset acționează ca și cum &distinct () face parte din cerere.
    * Improved: acum, pentru întrebări care includ & .json p=_functionName_, _function Nume_ TREBUIE să fie acum o serie de 1 sau mai mult (perioadă separată) cuvinte. Fiecare cuvânt trebuie să înceapă cu o literă ISO 8859 sau "\\_" și să fie urmat de 0 sau mai multe litere ISO 8859, cifre sau "\\_." Da, acest lucru este mai restrictiv decât Java Cerințele scriptului pentru numele funcțiilor.
    * Axa timpului pe grafice funcționează acum bine pentru intervale de timp mai lungi (80 - 10000 ani) și intervale de timp mai scurte (0,003 - 180 secunde) .
    *    ERDDAP™ este acum mai iertător atunci când analizăm variaţiile datelor de timp ISO-8601-format.
    * Au fost multe alte mici schimbări și soluții bug.
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    *    **Trebuie să actualizați la ultima versiune pentru a fi sigur.**   
         ERDDAP™ a fost supus unui audit de securitate. Au existat unele bug-uri și slăbiciuni. Versiunea 1.44 include mai multe soluții importante de securitate bug și mai multe modificări pentru a crește securitatea și accesibilitatea (De exemplu, pentru utilizatorii cu deficiențe de vedere) . Versiunea 1.44 a trecut de auditul de securitate. Datorită tuturor oamenilor buni de la USGS şi Acunetix care au făcut acest lucru posibil. (Nu ar trebui NOAA să fac asta?) 
    * Noul [Tabel EDD din WFS Fișiere](/docs/server-admin/datasets#eddtablefromwfsfiles) face o copie locală a tuturor datelor dintr-o ArcGIS MapServer WFS server și astfel datele pot fi re-servate rapid la ERDDAP™ utilizatori. Mulţumită lui Christy Caudill.
    * Noul [Tabel EDD din EDDGrid ](/docs/server-admin/datasets#eddtablefromeddgrid) permite crearea unui set de date EDD Table dintr-o EDDGrid Set de date. Unele motive comune sunt:
        * Acest lucru permite setului de date să fie interogat cu OPeNDAP constrângeri de selecție (pe care un utilizator le-ar fi putut solicita) .
        * Setul de date este în mod inerent un set de date tabelar. Mulţumită lui OOICI, Jim Potemra, Roy Mendelssohn.
    * Denumirea variabilă "deep" este acum o alternativă specială la "altitudine." Unitățile trebuie să fie o variantă de "metri." Valorile datelor trebuie să fie pozitive=jos. ERDDAP™ este acum pe deplin conștient de sensul de "aprofundat" și o susține oriunde altitudinea este susținută (de exemplu, ca componentă a unui CF DSG cdm\\_data\\_type=profil de date) . Un set de date nu trebuie să aibă atât variabile "aprofundate," cât și variabile de "altitudine."
    * În datasets.xml , Vă rugăm să eliminați orice utilizare a&lt;Att name="cdm\\_altitudine\\_proxy vinohedindeep&lt;/att&gt; deoarece adâncimea este acum o alternativă specială la altitudine și astfel nu trebuie să fie identificate în mod special.
    * În datasets.xml , Vă rugăm să eliminați orice utilizare a&lt;altitudineMetersPersourceUnit&gt;, cu excepția tabelului EDD De la SOS .
Când valoarea este 1, şterge-o.
Atunci când valoarea este -1, ia în considerare schimbarea numelui variabil în profunzime.
Pentru alte valori, adăugați la&lt; addAttributes &gt;, de exemplu:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Toate seturile de date sprijină acum
        
        *   &lt;defaultDataQuery&gt; care este utilizat dacă .html este solicitat fără interogare.
            * Probabil că rareori va trebui să foloseşti asta.
            * Pentru seturile de date griddap, o utilizare comună a acestora este aceea de a specifica o valoare diferită a adâncimii implicite sau a dimensiunii altitudinii. (de exemplu, \\[ 0 \\] în loc de \\[ ultima \\] ) .
În orice caz, trebuie să listați întotdeauna toate variabilele, să utilizați întotdeauna aceleași valori de dimensiune pentru toate variabilele, și aproape întotdeauna să utilizați \\[ 0 \\] , \\[ ultima \\] , sau \\[ 0:ultima \\] pentru valorile de dimensiune.
De exemplu:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * Pentru tabledap Seturi de date, cea mai frecventă utilizare a acestora este de a specifica un interval de timp implicit diferit (relativ la acum, de exemplu, &time&gt;= now- 1 zi) .
Amintiți-vă că solicitarea nu variabile de date este aceeași cu specificarea tuturor variabilelor de date, astfel încât, de obicei, puteți specifica doar noua constrângere de timp.
De exemplu:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;implicitGraphQuery&gt; care este utilizat dacă .graph este solicitat fără interogare.
            * Probabil că rareori va trebui să foloseşti asta.
            * Pentru seturile de date griddap, cea mai frecventă utilizare a acestora este de a specifica o valoare diferită a dimensiunii de adâncime implicită sau altitudine (de exemplu, \\[ 0 \\] în loc de \\[ ultima \\] ) și/sau să specifice faptul că o anumită variabilă este grafică.
În orice caz, vei folosi aproape întotdeauna \\[ 0 \\] , \\[ ultima \\] , sau \\[ 0:ultima \\] pentru valorile de dimensiune.
De exemplu:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * Pentru tabledap Seturile de date, cele mai frecvente utilizări ale acestora sunt să specifice variabile diferite care trebuie grafice, un interval de timp implicit diferit (relativ la acum, de exemplu, &time&gt;= now- 1 zi) și/sau diferite setări grafice implicite (De exemplu, tipul de marcaj) .
De exemplu:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

Amintiți-vă că aveți nevoie pentru XML-code sau la sută encode (fie unul, dar nu ambele) întrebările implicite, deoarece acestea sunt într-un document XML. De exemplu, devine &amp; ,&lt;devine &amp;lt; , și &gt; devine &amp;gt; .
Și vă rugăm să verificați munca ta. E uşor să faci o greşeală şi să nu obţii ce vrei.
Mulţumită lui Charles Carleton, Kevin O'Brien, Luke Campbell şi altora.
    *    EDDGrid De la Dap, EDDGrid FromErddap, and EDDtable From EDDGrid dispune de un nou sistem de gestionare a seturilor de date care se modifică frecvent (la fel de des ca la fiecare 0.5 s) . Spre deosebire de ERDDAP "sistem regulat, proactiv pentru încărcarea completă a fiecărui set de date, acest sistem suplimentar opțional este reactiv (declanșată de o cerere a utilizatorului) și incremental (doar actualizarea informațiilor care trebuie actualizate) . De exemplu, dacă o cerere a EDDGrid Setul de date din Dap apare mai mult decât numărul specificat de milisecunde de la ultima actualizare; ERDDAP™ va vedea dacă există valori noi pentru stânga (de obicei "time" ) dimensiunea și, dacă da, doar descărcați aceste valori noi înainte de a gestiona cererea utilizatorului. Acest sistem este foarte bun la păstrarea la zi a unui set de date în schimbare rapidă, cu cerințe minime privind sursa de date, dar cu costul de a încetini ușor procesarea unor cereri de utilizator. Vezi [&lt;updateEveryNMillis&gt;] (/docs/server-admin/sets#datate everyenmmillis)   
Mulţumită lui Michael Barry şi OOICI.
    *    EDDGrid DinNcFiles, EDDTableFromNcFiles, și EDDTabelFromNcFFiles suport acum [NcML .nc ml](/docs/server-admin/datasets#ncml-files) fișiere sursă în loc de .nc Dosare. Mulţumită lui Jose B Rodriguez Rueda.
    * Pentru EDDGrid Agregat ExistingDimension, ERDDAP™ suportă o nouă opțiune serverType="dodsindex" pentru atributul serverType al&lt; sourceUrl S &gt; tag. Acest lucru funcționează cu pagini web care au liste de fișiere în interiorul&lt;pre&gt;&lt;/pre &gt; și adesea sub o OPeNDAP logo. Un exemplu este: [https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html) .
    * Pentru tabelul EDD de la SOS acum suportă o etichetă opțională
```  
        <sosServerType>_serverType_</sosServerType>  
```
astfel încât să puteți specifica tipul de SOS server (Deci... ERDDAP™ nu trebuie să-l dau seama) . Valori valabile ale&lt;_serverType_\\&gt; sunt IOOS\\_NDBC, IOOS\\_NOS, OOSTethys , și WHOI (un server nou susținut Tip) . Vezi? [Tabel EDD din SOS ](/docs/server-admin/datasets#eddtablefromsos) . Mulţumită lui Derrick Snowden şi Janet Fredericks.
    * Toate EDDGrid De la... fişiere, EDD Table From... Dosare, EDDGrid Copiere și tabel EDD Copiază acum suportă o etichetă opțională
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
care pot spune ERDDAP™ pentru a păstra fișierul Tabel (cu informații despre fiecare fișier sursă de date) în memorie în loc de doar pe disc (implicit) . Păstrarea tabelului de fișier în memoria accelerează cererile de date (în special dacă există &gt; 1000 fișiere sursă de date) Dar foloseşte mai multă memorie. Dacă setați acest lucru la adevărat pentru orice set de date, fiți cu ochii pe memorie: în prezent, utilizând linia de la _Domeniul tău_ /erddap/status.html să se asigure că ERDDAP™ Încă are o mulţime de memorie liberă. Mulţumită lui Fredrik Stray.
    * Tabel EDDDe la ASCIIFILE susţine acum&lt;Charset&gt;. Cele mai comune carsete (sensibil la caz&#33;) sunt ISO-8859-1 (implicit) şi UTF-8.
    * Recomandat: în setup.xml, în&lt;StartHeadHtml&gt;, vă rugăm să modificați&lt;html&gt; în
        &lt;html lang="en-USrück (sau un alt [Codul lingvistic](https://www.w3schools.com/tags/ref_language_codes.asp) dacă ați tradus mesaje.xml) .
    * setup.xml are noi etichete opționale pentru a dezactiva părți ale ERDDAP :
        *   &lt;ConvertizoareActive&gt;false&lt;/convertoareActive&gt;&lt;--- implicitul este adevărat --&gt;
        *   &lt;diapozitivSorterActive&gt;fals&lt;/slideSorterActive&gt;&lt;--- implicitul este adevărat --&gt;
        *   &lt;wmsActive&gt;fals&lt;/wmsActive&gt;&lt;âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ âTMŞ
    * Generează dateName Xml scrie acum rezultatele la _bigParentDirectory_/logs/generateDatasetsXmlLog.txt, nu log.txt. Mulţumită lui Kristian Sebastian Blalid.
    * Generează dateName Xml face acum o sugestie bună pentru&lt;reîncărcare În fiecare minut. Mulţumită NOAA Proiectul UAF.
    * Multe îmbunătățiri mici la GenerateDatasetsXml. Mulţumită NOAA Proiectul UAF.

## Versiunea 1.42{#version-142} 
 (lansat în 2012-11-26) 

*    **Caracteristici noi:** 
    *    (Nu sunt caracteristici noi majore.) 
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * Dacă sunteți actualizarea de la ERDDAP™ 1.38 sau 1.40, nu au existat modificări care vă solicită să efectuați modificări la fișierele de configurare (dar trebuie să utilizați noul fișier mesaje.xml) .
    *    ERDDAP™ încă o dată poate rula cu Java 1.6. ( ERDDAP™ v1,40 necesar Java 1.7.) Vă recomandăm încă puternic folosind cea mai recentă versiune de Java 1.7.
    * Un nou tip de set de date, [Tabel EDD din Fişiere AwsXml](/docs/server-admin/datasets#eddtablefromawsxmlfiles) , poate citi datele dintr-un set de Statie Meteo Automată (AWS) Fișiere de date XML. Mulţumită lui Lynn Dewitt şi Exploratoriului.
*    **Modificări mici/Reparații de bug:** 
    * Ajustat la modificări ale NDBC SOS servere de date sursă.
    * Ajustat la modificările la serviciile NOS COOPS ASCII.
    * A făcut mai multe modificări mici și remedieri bug.

## Versiunea 1.40{#version-140} 
 (lansat în 2012-10-25) 

*    **Caracteristici noi:** 
    * Există un nou format de fișier de ieșire pentru tabledap Seturi de date: .nc CFMA, care salvează datele solicitate în a .nc fișier care este conform cu CF [Geometrii de eșantionare discrete](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Opțiuni multidimensionale de array și care, prin urmare, sunt conforme cu modelele NODC \\[ 2021: acum [Șabloane NCEI](https://www.ncei.noaa.gov/netcdf-templates)  \\] pentru stocarea acestui tip de date. Mulţumită NODC.
    *    tabledap cererile pot include acum constrângeri de timp, cum ar fi & timp&gt; now- 5 zile. Vezi [documentația](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) . Mulţumită lui James Gosling.
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * Dacă sunteți actualizarea de la ERDDAP™ 1.38, nu au existat modificări care să vă ceară să efectuați modificări la fișierele de configurare (dar trebuie să utilizați noul fișier mesaje.xml) .
    *    ERDDAP™ Comunicate publice și repere interne sunt disponibile prin [ ERDDAP™ privind GitHub](https://github.com/ERDDAP) . Pentru mai multe informaţii, a se vedea [Wiki](https://github.com/ERDDAP/erddap/wiki) pentru ERDDAP™ proiect, precum și mai general [ ERDDAP™ Ghidul programatorului](/docs/contributing/programmer-guide) . (Acest lucru a fost anunțat separat la câteva săptămâni după ERDDAP™ 1.38 eliberare.) 
    * Generează dateName Xml a fost îmbunătăţit.
        * Scenariul a fost revizuit aşa că ar trebui să funcţioneze corect pe toate computerele Linux (Nu doar câteva.) .
        * Acum adaugă creator\\_name , creator\\_email , și creator\\_url ori de câte ori este posibil.
        * Multe alte mici îmbunătăţiri.
    * Mod rafinat ERDDAP™ se ocupă de timp.
        * Intern, ERDDAP™ Acum se ocupă de timpi la o precizie milisecundă (nu secunde) .
        * Acum puteți specifica opțional precizia timpului pentru un anumit set de date, a se vedea [ time\\_precision ](/docs/server-admin/datasets#time_precision) . De exemplu, s-ar putea stabili un set de date pentru a afișa valorile timpului cu precizie de dată (De exemplu, 1970-01-01) .
        * Seturile de date actuale vor utiliza setările implicite, astfel încât acestea nu sunt afectate de aceste modificări și vor continua să afișeze timp cu precizie secunde. Mulţumită lui Servet Cizmeli şi Philip Goldstein.
    *    [Tabel EDD din NCFFile](/docs/server-admin/datasets#eddtablefromnccffiles) este un nou tip de set de date pe care îl puteți utiliza în datasets.xml Dosar. Acesta poate citi date din oricare dintre numeroasele formate de fișiere definite de [CF Geometrii de eșantionare discrete](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Convenţii. Datorită NODC și datorită special Kyle Wilcox pentru a face fișiere de probă pentru numărul mare de formate de fișiere DSG valide și pentru a le face publice.
*    **Modificări mici/Reparații de bug:** 
    * Extins [Repornire rapidă](#quick-restart) sistem la toate datele relevante EDDGrid și subclase EDD Table.
    * Documentație îmbunătățită, în special legată de modul de utilizare [griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType) şi [ tabledap ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType) de la diverse software client.
    * Căutare avansată modificată pentru a sprijini minTime și/sau maxTime exprimată ca epocăSeconds. Mulţumită lui Lynn Dewitt.
    * Modificat .htmlTable ieșire pentru a afișa urls și adrese de e-mail ca link-uri.
    * Adăugat "rel=" și "rev=" la relevant&lt;a href&gt; tags. Mulţumită lui Pat Cappelaere de la OGC   REST proiect.
    * Îmbunătățirea protecției împotriva cererilor de date nerealist de mari, în special în cadrul tabledap Unde e o problemă mai grea.
    * Mutat mai multe mesaje la mesaje.xml.
    * Am făcut îmbunătăţiri de viteză.
    * Fixat EDDGrid Din Dosare pentru a permite sortate axe descendente. Mulţumită lui Maricel Etchegaray.
    * Referințe eliminate la iGoogle deoarece va fi întreruptă.
    * A făcut mai multe modificări mici și remedieri bug.

## Versiunea 1.38{#version-138} 
 (lansat 2012-04-21) 

*    **Caracteristici noi:** 
    * ISO 19115 și FGDC -- ERDDAP™ poate genera automat fișiere de metadate XML ISO 19115 și FGDC pentru fiecare set de date. Linkurile către fișiere sunt vizibile pe fiecare listă de seturi de date (De exemplu, de la căutarea completă a textului) și, de asemenea, în dosare accesibile Web (WAF)   (vezi [FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/) şi [ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/) ) . Mulţumită lui Ted Habermann, Dave Neufeld şi multor altora.
    * Complete Text Cauta date acum suport \\-_ excludedWord _ și \\-"_ fraza exclusivă_" . Mulţumită lui Rich Signell.
    * Caută seturi de date acum returnează o pagină la un moment dat. Implicit folosește șirul parametrului: pagina=1&itemPerPage=1000, dar puteți modifica valorile în URL-ul cererii dumneavoastră. Mulţumită lui Steve Hankin şi proiectului UAF.
    *    OpenSearch -- ERDDAP™ acum sprijină [ OpenSearch 1, 1](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html) standard pentru căutarea seturilor de date. Printre altele, acest lucru permite catalogul de agregare site-uri pentru a face căutări distribuite (transmite o cerere de căutare fiecărui catalog despre care știe) .
    * Comă separată Valoare (CSV) Fişierele... ERDDAP™ acum generează fișiere CSV cu doar o virgulă între valori (pe care Excel îl preferă) , în loc de virgulă + spațiu. Mulţumită lui Jeff deLaBeaujardiere.
    * Milioane de date... S-au făcut mai multe modificări pentru a sprijini ERDDAP S având un număr mare de seturi de date, poate chiar un milion. Mulţumită lui Steve Hankin şi proiectului UAF.
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
#### Repornire rapidă{#quick-restart} 
*    [A](#quick-restart) Repornire rapidă a sistemului permite ERDDAP™ Pentru a reporni mult mai repede.
     **Vă rugăm să adăugați acest lucru la fișierul setup.xml** imediat după&lt;/seturi de dateRegex&gt;:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * Căutarea completă a seturilor de date se poate face acum cu motorul de căutare Lucene (Deși recomandăm motorul de căutare original dacă aveți mai puțin de 10.000 de seturi de date) sau sistemul de căutare original.
         **Vă rugăm să adăugați acest lucru la fișierul setup.xml** imediat după&lt;/displayDiagnosticInfo&gt;:
```
              <!-- ERDDAP™ lets you choose between two search engines for full text searches:
              \\* original (the default) -- is the best choice if your ERDDAP™ has fewer 
                than about 10,000 datasets.  It is very robust and trouble free. 
              \\* lucene -- is the best choice for more than about 10,000 datasets.
                The advantages are that with any number of datasets it works fast 
                and uses very little memory.
                But there are many things that might go wrong with individual 
                queries and with the whole system. 
                And although its behaviour (the datasets it finds and the order that
                it ranks them) is almost identical to the original search engine,
                it has a few quirky, subtle, small differences.
              -->
              <searchEngine>original</searchEngine>
```

    * În setup.xml, puteți/ar trebui să adăugați acum două categorii noi la lista separată de virgulă a&lt; categoryAttributes &gt;:
        * global:cuvinte cheie (adauga-l imediat dupa global:institutie) -- un nou caz special care parsează o listă separată de cuvinte cheie de atributul de cuvinte cheie globale pentru a face o intrare separată pentru fiecare cuvânt cheie.
        * variabilă Nume (adăugați-l la sfârșitul) -- un nou caz special care clasifică fiecare dataVariable   destinationName c.
    * În setup.xml, puteți (Dar de ce?) Spune ERDDAP™ să nu ofere metadate FGDC și/sau ISO 19115 pentru niciun set de date prin includerea
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

Valorile implicite pentru aceste setări sunt adevărate.
    * În datasets.xml , vă rugăm să luați în considerare îmbunătățirea metadatelor pentru seturile de date. ERDDAP™ Acum generează automat fișiere de metadate XML ISO 19115 și FGDC pentru fiecare set de date pe baza metadatelor setului de date.
Deci, **Metadatele bune ale setului de date duc la rezultate bune ERDDAP -generat ISO 19115 și metadate FGDC.**   
         **A se vedea noua documentație pentru numeroasele noi RECOMANDATE [Atribute globale](/docs/server-admin/datasets#global-attributes) .** 
    * În datasets.xml , dacă vrei să spui ERDDAP™ să utilizeze un fișier FGDC pre-made și/sau ISO 19115 care este undeva pe sistemul de fișiere al serverului în loc să aibă ERDDAP™ genera aceste fișiere, utilizați:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Dacă _fullFileName_\\="" sau fișierul nu este găsit, setul de date nu va avea metadate FGDC și/sau ISO 19115. Acest lucru este util și dacă doriți să suprimați metadatele FGDC și/sau ISO 19115 pentru un set de date specific.
    * În datasets.xml , pentru toate EDDGrid SideBySide și EDDGrid Seturi de date de identificare agregate, asigurați-vă că seturi de date pentru copii au diferite datasetID s decât seturile lor de date parentale și decât ceilalți copii. (De exemplu, ai putea urma sistemul simplu dar eficient al lui George Foreman pentru numirea copiilor săi.) Dacă orice nume dintr-o familie sunt exact la fel, setul de date nu va încărca (cu mesajul de eroare că valorile axei agregate nu sunt în ordine sortate) .
    * În datasets.xml , au existat unele modificări la lista de valid ioos\\_category valorile metadatelor:
        * "pCO2" a fost schimbat în "CO2.
        * A fost adăugată "Oceanografia fizică."
        * "Soils" a fost adăugat.
    * În datasets.xml , ERDDAP™ nu mai permite "." într-o datasetID . A fost permis, dar descurajat. (Scuze.) 
    * În datasets.xml , configurarea pentru tabelul EDD de la trei fişiere şi tabel EDD de la Hyrax Fișierele s-au schimbat ușor pentru că ambele clase au fost doar rescrise pentru a fi mai eficiente (ambele clase acum face întotdeauna o copie locală a tuturor fișierelor de date la distanță) . A se vedea documentația pentru stabilirea acestor clase: [Tabel EDD din Hyrax Fișiere](/docs/server-admin/datasets#eddtablefromhyraxfiles) şi [Tabel EDD de la trei fișiere](/docs/server-admin/datasets#eddtablefromthreddsfiles) . În special, a se vedea observațiile revizuite cu privire la&lt;fileDir&gt; (Acum irelevant) şi&lt; sourceUrl &gt; (acum esential) . De asemenea, nu ar trebui să înfășurați această clasă în EDD TableCopy pentru eficiență.
    * În datasets.xml , dacă utilizaţi EDDtableFromDatabase cu o Oracle baza de date, ar trebui să includă o conexiune Proprietate cum ar fi
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
să specifice câte rânduri de date să aducă la un moment dat, deoarece implicit este 10, care este oribil de ineficient. Vezi [ Oracle documentația](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm) . MySql și PostgreSQL par să aibă implicituri mai bune pentru această setare. Mulţumită lui Kevin O'Brien.
    * Dacă utilizaţi EDDTableFromDatabase, consultaţi îmbunătăţirea [Documentație "viteză"](/docs/server-admin/datasets#eddtablefromdatabase) pentru sugestii suplimentare în vederea îmbunătățirii performanței. Mulţumită lui Kevin O'Brien.
    * În datasets.xml , pentru toate tabelele EDD... seturi de date, în convenţii şi Metadata\\_Conventions atribute globale, vă rugăm să consultați CF-1.6. (nu CF-1,0, 1,1, 1,2, 1,3, 1,4 sau 1,5) , deoarece CF-1.6 este prima versiune care include modificările legate de Geometria de eșantionare Discrete.
    * Programatori care compilează ERDDAP™ codul trebuie să adauge lib/lucene-core.jar la lista de fișiere borcan în căile lor javac și Java linie de comandă.
    *    ERDDAP™ are [serviciu nou](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html) pentru a converti un nume standard CF la/de la un cuvânt cheie GCMD Science. Puteți găsi acest lucru util atunci când se generează metadate de cuvinte cheie globale pentru seturile de date din ERDDAP .
    * Să te ocupi de Bots... Vă rugăm să citiţi acest sfat [preveniți roboți de la crawling ERDDAP™ într-un mod stupid](/docs/server-admin/additional-information#robotstxt) .
    * Traducerea... Textul privind ERDDAP Paginile web ale lui este acum mai ales în mesaje.xml și atât de potrivite pentru traducerea în diferite limbi (de exemplu, germană, franceză) . Mesajele folosesc adesea MesajFormat pentru formatare, de asemenea pentru a ajuta la realizarea traducerilor. Dacă sunteți interesat în a face o traducere, vă rugăm să e-mail erd dot data at noaa dot gov .
    * Eșantion datasets.xml -- Au existat mai multe erori mici, dar semnificative în eșantion datasets.xml . Dacă utilizați aceste seturi de date, vă rugăm să obțineți versiunile mai noi din noul eșantion datasets.xml în noul erddapContent .zip Dosar. Mulţumită lui James Wilkinson.
    * Du-te... Voi încerca din greu pentru a face ERDDAP™ un proiect GitHub ASAP după această versiune.
*    **Modificări mici/Reparații de bug:** 
    * O nouă paleta, OceanDepth, este utilă pentru valorile adâncimii (pozitiv este în jos) , de exemplu, 0 (superficial) până la 8000 (adânc) .
    * ă .kml ieșire de la tabledap folosește o pictogramă mai bună (Nu e neclar.) . Și plutind peste un marker face acum mai mare.
    * Tabel EDDFromFiles - În ultimul upgrade, noua bibliotecă netcdf-java a avut restricții mai stricte pentru nume variabile în .nc Dosare. Care a cauzat probleme pentru EDDtableFromFiles dacă o variabilă sourceName A avut anumite personaje punctuaţie. Tabelul EDDFromFiles este acum modificat pentru a evita această problemă. Mulţumită lui Thomas Holcomb.
    * Pagina .subset suportă acum 0/10/1000/1000/100000 în locul unei căsuțe de verificare pentru date conexe. Informaţia avertizează că 100000 pot cauza prăbuşirea browser-ului. Mulţumită lui Annette DesRochers, Richard (Abe) Coughlin şi Proiectul Biologic IOOS.
    * .../erddap/info/_ datasetID _/index.html pagini web arată acum urls și adrese de e-mail ca link-uri clickable. Mulţumită lui Richard (Abe) Coughlin şi Proiectul Biologic IOOS.
    * Fixare bug: în tabledap , pentru seturi de date cu altitudine MetersPerSourceUnit&lt;0, întrebările privind constrângerile de altitudine au fost tratate incorect. Mulţumită lui Kyle Wilcox.
    * Fix bug: EDDGrid AgregateFromExistingDimension suportă acum mai diverse URL-uri TDS. Mulţumită?

## Versiunea 1.36{#version-136} 
 (lansat 2011-08-01) 

*    **Caracteristici noi:** 
    * Nicio modificare semnificativă din punctul de vedere al utilizatorului.
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * Setul de date PmelTao care a fost adesea utilizat ca set de date pentru eșantion tabledap   
documentația nu mai este disponibilă. ERDDAP™ Administratorii TREBUIE să efectueze aceste modificări:
        * În datasets.xml , dacă aveţi datasetID Set de date "pmelTao," adăugați
active="fals" chiar înainte de "&gt;" la sfârșitul acestei linii.
        * În setup.xml, dacă&lt;EDD TableIdExample&gt; este pmelTao, apoi:
            * Dacă datasets.xml nu are un set de date cu datasetID ="erdGlobecBottle," adăugați
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * În setup.xml, înlocui toate etichetele de la&lt;EDD TableIdExample&gt; prin
                &lt;Tabel EDD Matlab PlotExample&gt; cu
```
                <!-- Tabledap Examples
                This group of settings is used to make examples for the tabledap documentation 
                that appears at \\[baseUrl\\]/erddap/tabledap/documentation.html and elsewhere.
                If you include the erdGlobecBottle dataset in your datasets.xml (recommended), 
                you don't need to change these.
                If you don't, you MUST change these before you make your ERDDAP™ public; 
                otherwise, none of the examples will work!
                The new settings should be very similar to the defaults.
                If your ERDDAP™ won't serve any tabular datasets, use "NOT\\_APPLICABLE" for all of the entities.
                In .xml files like this, ampersand, lessThan, and greaterThan have to be 
                HTML encoded as "&amp;", "&lt;", "&gt;".
                -->
                <!-- This is the datasetID for an EDDTable dataset that is served by your ERDDAP.
                     This dataset is used as the basis for all of the EDDGrid examples below. 
                     Ideally, it is a dataset that has longitude, latitude, and time variables (among others). 
                     ('time' allows for making a time series graph. 'latitude' and 'longitude' allow for making a map.)
                     The dataset can have longitude values -180 to 180, or 0 to 360. -->
                <EDDTableIdExample>erdGlobecBottle</EDDTableIdExample>
                <!-- This is a comma-separated list of variables from the dataset.
                     It is useful if it is "longitude,latitude,time," plus a data variable name. -->
                <EDDTableVariablesExample>longitude,latitude,time,bottle\\_posn,temperature1</EDDTableVariablesExample>
                <!-- This is the constraints example which is appended to EDDTableVariablesExample. -->
                <EDDTableConstraintsExample>&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableConstraintsExample>
                <!-- This is an example data query using an ISO-formatted time. 
                     You could generate your example via your dataset's Data Access Form in ERDDAP.  -->
                <EDDTableDataTimeExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableDataTimeExample>
                <!-- This is an equivalent example data query, but which specifies time as seconds-since-1970-01-01. 
                     If you need to convert a date/time to "seconds since 1970-01-01", use
                     https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html -->
                <EDDTableDataValueExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=1029542400&amp;time&lt;=1029788280</EDDTableDataValueExample>
                <!-- This is an example query which generates a graph. 
                     You could generate your example via your dataset's Make A Graph form in ERDDAP.  -->
                <EDDTableGraphExample>bottle\\_posn,temperature1&amp;time=2002-08-19T10:06:00Z&amp;.draw=lines</EDDTableGraphExample>
                <!-- This is an example query which generates a map. 
                     In the default mapExample, temperature1, time, bottle\\_posn are useful 
                     because they appear in GoogleEarth with the .kml example 
                     and are ignored by the other image file types. -->
                <EDDTableMapExample>longitude,latitude,temperature1,time,bottle\\_posn&amp;time&gt;=2002-08-13T00:00:00Z&amp;time&lt;=2002-08-20T00:00:00Z&amp;bottle\\_posn=1&amp;.draw=markers&amp;.marker=5|5</EDDTableMapExample>
                <!-- This is a Matlab example which uses data from the EDDTableGraphExample.
                     Note the Matlab notation datasetName.variableName.  -->
                <EDDTableMatlabPlotExample>plot(erdGlobecBottle.bottle\\_posn, erdGlobecBottle.temperature1)</EDDTableMatlabPlotExample>
```
                
    * Pentru seturile de date în care tipul este o subclasă de EDDTableFromFiles, puteți face acum date din metadate.
Mai exact, puteți face acum o variabilă din valorile unui atribut al uneia dintre variabilele originale.
De exemplu, în datasets.xml , în&lt; dataVariable &gt; etichetă, dacă utilizaţi
```
        <sourceName>variable:cruise:PI</sourceName>  
```
         ERDDAP™ va face o variabilă cu valorile atributului PI a variabilei de croazieră.
Datorită WOD.
*    **Modificări:** 
    * Modificări minore

## Versiunea 1.34{#version-134} 
 (lansat 2011-06-15) 

*    **Modificări:** 
    * Fix bug: A reparat o scurgere de memorie care a avut loc pe unele 64-biți Java instalații.
    * Fix bug: ERDDAP™ Acum stabilește corect aceste atribute globale atunci când valorile dimensiunii latitudinii variază de la înaltă la joasă: geospațială\\_lat\\_min, geospațială\\_lat\\_max, Southernmost\\_Northing, Northernmost\\_Northing.
        
Notă: actual\\_range este nemodificată: poate avea valori scăzute, ridicate sau valori scăzute, deoarece este destinată să indice intervalul și ordinea depozitării.
        
    * Mici schimbări.
    *    ERDDAP™ administratorii nu au nevoie pentru a face orice modificări la setup.xml lor sau datasets.xml .

## Versiunea 1.32{#version-132} 
 (lansat 2011-05-20) 

*    **Modificări:** 
    * Sprijin pentru geometriile nou ratificate, CF Discrete de eșantionare (care, din păcate, nu este încă disponibil online) , care înlocuiește convențiile de observare a punctelor CF propuse.
         ERDDAP™ utilizatorii vor vedea că cdm\\_feature\\_type=Station este înlocuit de TimeSeries și există mici modificări ale fișierelor create pentru .nc Tipul fișierului CF (plat\\_dimensiuni este acum numit eșantion\\_dimensiuni) .
         ERDDAP™ Administratorii vor trebui să facă aceste schimbări în datasets.xml :
        * cdm\\_data\\_type=Station ar trebui schimbat în cdm\\_data\\_type=TimeSeries.
        * cdm\\_data\\_type=StationProfile ar trebui schimbat în cdm\\_data\\_type=TimeSeriesProfile.
        * cdm\\_station\\_variables ar trebui schimbat în cdm\\_timeseries\\_variabile.
        * cf\\_role=stație\\_id ar trebui schimbat în cf\\_role=timeseries\\_id.
    * Nou ioos\\_category opțiuni: "Materiale organice colorate dizolvate," "pCO2," "fluxul de vis," "Material total suspendat."
    * Soluție posibilă la o posibilă scurgere de memorie pe 64 biți Java . \\[ Nu a mers. \\] 
    * Mici schimbări.

## Versiunea 1.30{#version-130} 
 (lansat 2011-04-29) 

*    **Caracteristici noi:** 
    * Suport pentru 64 biți Java . Atunci când se utilizează cu 64 biți Java , ERDDAP™ poate folosi acum mult mai mult memorie morman și să se ocupe de mai multe cereri simultane.
    * Suport pentru .nc cereri de fișiere până la 2GB (chiar şi fără 64 biţi Java ) prin utilizarea mai bună a ERDDAP Manipularea datelor în bucăţi.
    * Multe îmbunătăţiri de viteză 2X în cod şi 2X creşte viteza de la Java 1. 6 make ERDDAP™ 2X la 4X mai repede decât înainte.
    * Îmbunătățiri de economisire a memoriei semnificativ mai mici ERDDAP Folosirea memoriei de bază.
    * Pentru seturi de date tabelare, ERDDAP™ este acum pe deplin conştient de cdm\\_data\\_type-ul unui set de date şi de modul în care datele se referă la tipul CDM. Vezi [CF Specificarea Geometriilor de eșantionare discrete](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) . Poate că într-o zi în curând, acel fișier Word va fi convertit la .html și va înlocui informațiile actuale "OBSOLETE" de pe acea pagină web. Mulţumită NOAA Proiectul UAF.
    * Pentru majoritatea seturilor de date ale tabelului EDD, o nouă opțiune de tip fișier de ieșire, .nc CF, creează Contiguous Ragged Array .nc fișiere care respectă ultima versiune a [CF Convenţii privind eşantionarea geografică discretă](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) . Aceste fișiere sunt structurate pentru a reflecta tipul de date CDM al setului de date. Deoarece convențiile propuse tocmai s-au schimbat, începând cu această scriere, biblioteca netcdf-java nu suportă încă citirea formatelor de fișiere create de ERDDAP şi interpretarea lor ca fişiere de date CDM. Probabil în curând. Mulţumită NOAA Proiectul UAF.
    * View : Opţiunea Distinct Data de pe pagina web .Subset este acum o listă drop-down care permite utilizatorilor să specifice numărul maxim de rânduri de date distincte care trebuie vizualizate (implicit = 1000) . Această schimbare, și altele, permite ERDDAP™ să lucreze cu seturi de date care au un număr foarte mare de rânduri de date distincte. (Numărul de valori unice pentru orice variabilă este încă o problemă, dar poate fi destul de mare (20.000?) înainte de .subset și alte pagini web încarcă foarte încet.) Mulţumită NOAA Proiectul UAF.
    * .Subset pagini web au o nouă opțiune: Vezi numere de date diferite. Datorită proiectului GTOPP.
    * Pentru a ajuta utilizatorii, valorile distincte (De exemplu, numele postului) sunt prezentate acum pe formularele Make-A-Graph și Data Access. Mulţumită NOAA Proiectul UAF.
    * Transparent Solicitările Png sprijină acum toate tipurile de grafice și reprezentări de date. Acesta atrage doar datele - fără axe, legende, mască de teren, sau orice altceva. Acest lucru face posibilă realizarea de imagini ca straturi de Png transparente. Dacă &.size=_lățime_ | _înălțime_ este specificată în cerere (recomandată) , este onorat. Implicit este 360x360 pixeli. Singura excepţie este EDDGrid &.draw=suprafață, unde implicit (ca înainte) este o imagine cu ~1/pixel per punct de date (până la 3000 x și y pixeli) . Mulţumită lui Fred Hochstaedter.
    * ă WMS pagini web arată acum bara de culoare pentru variabila setului de date (s) . Mulţumită lui Emilio Mayorga şi altora.
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * Această eliberare implică multe schimbări. Toate sunt importante. Vă rugăm să aveţi răbdare şi să lucraţi la toate modificările enumerate mai jos.
    * Această versiune este împinsă afară mai devreme decât intenţionat să se ocupe cu unele Java Microfoane de securitate. Din păcate, mai multe caracteristici/fixe destinate pentru aceasta ERDDAP™ versiunea nu este în această versiune. Scuze. Să sperăm că următoarea versiune va fi relativ curând (și mult mai ușor de actualizat la) .
    * Pentru a evita mai multe microfoane de securitate în Java 6 actualizare 23 și mai jos, descărcați și instalați cea mai recentă versiune a Java   ( Java 6 actualizare 24 sau mai mare) . Dacă aveți un sistem de operare de 64 de biți, vă rugăm să obțineți o versiune de 64 de biți a Java .
    * Dacă utilizaţi Tomcat 5, trebuie să faceţi upgrade la Tomcat 6 sau 7 (preferat) . Dacă utilizați Tomcat 6, luați în considerare actualizarea la Tomcat versiunea 7.
    * Urmaţi toate instrucţiunile pentru [crearea unui nou ERDDAP™ ](/docs/server-admin/deploy-install) , dar dacă este cazul, veți copia fișiere de la vechea instalare la noua instalație, în special \\[ Tomcat \\] /content/erddap director și fișiere. Ca parte a acestui lucru, notaţi [noi recomandări de configurare Tomcat](/docs/server-admin/deploy-install#tomcat) .
    * Erddap.css implicit este acum inclus în fișierul erddap.war.
        * Pentru a utiliza erddap.css implicit, **Șterge** Bătrânul tău \\[ Tomcat \\] /content/erddap/images/erddap.css.
        * Dacă ați modificat \\[ Tomcat \\] /content/erddap/images/erddap.css, și doriți să păstrați utilizarea acestuia: lăsați-l în loc și înlocuiți&lt;secțiunea input&gt; cu:
```
            /\\* Small input items let more be shown on one screen  
            (esp. Chrome and Safari). Google Chrome and Safari have  
            default margin 2px, while others are 0. This sets all to 0.  
            .skinny is used e.g., for the buttons above the image on  
            a Make A Graph page. \\*/  
            input\\[type=button\\], input\\[type=submit\\], button {  
              margin:0px; padding:0px 3px; }  
            input\\[type=checkbox\\], input\\[type=password\\],  
              input\\[type=text\\], select, textarea {  
              margin:0px; padding:0px; }  
            input\\[type=radio\\] {margin:0px 2px; padding:0px; }  
            input.skinny {padding:0px 1px; }
```

    * În \\[ Tomcat \\] /content/erddap/setup.xml:
        * Se înlocuiesc observațiile și etichetele referitoare la&lt;Cerere parțialăMaxBytes&gt; și&lt;Request parţialMax1/2000&gt; cu
```
            <!-- When possible (and it isn't always possible),  
            ERDDAP™ breaks source data requests into chunks to  
            conserve memory. See the description of these tags in  
            messages.xml. You can override the default chunk sizes  
            here with  
            For grids:  
             <partialRequestMaxBytes>100000000</partialRequestMaxBytes>  
            For tables:  
             <partialRequestMaxCells>100000</partialRequestMaxCells>  
            \\-->
```
        * Se înlocuiesc observațiile referitoare la&lt; categoryAttributes &gt; şi să ia în considerare modificarea valorii etichetei:
```
            <!-- This is the comma-separated list (recommended:  
            in alphabetical order) of the global attribute and  
            variable attribute names which will be used to  
            categorize the datasets and shown to clients at urls  
            like .../erddap/categorize/ioos\\_category/index.html  
            (ioos\\_category is unusual, but is used at ERD).  
            If an attribute is a global attribute, identify it by  
            prefixing it with "global:".  
            \\-->  
            <categoryAttributes>global:institution, ioos\\_category,  
            long\\_name, standard\\_name</categoryAttributes>  
```

Persoana&lt; categoryAttributes &gt; care sunt atribute globale acum trebuie identificate prin prefixul global: (De exemplu, la nivel global:instituție) . Alte atribute sunt considerate atribute variabile (de exemplu, standard\\_name ) . De asemenea, valorile instituției (Singurii) au fost lăsate în cazul original. Acum toate valorile categoriei sunt convertite în minus.
    * În \\[ Tomcat \\] /content/erddap/ datasets.xml :
        * Mare improvizat: ERDDAP™ are noi cerințe legate de cdm\\_data\\_type-ul unui set de date tabular. În special, fiecare set de date trebuie să aibă metadatele și variabilele corecte legate de cdm\\_data\\_type. Dacă nu, setul de date nu va încărca și va arunca o eroare. A se vedea documentația pentru [cdm\\_date\\_type](/docs/server-admin/datasets#cdm_data_type) .
        * FYI: Există un nou tip de set de date: EDDTabelFromAsciiServiceNOS.
        * FYI: Sunt trei noi permise ioos\\_category opțiuni: Hidrologie, calitate (de exemplu, pentru steaguri de calitate) , and Statistics (De exemplu, medie) .
        * Pentru tabelul EDDDe la... Set de date fișiere, elimina orice&lt;nDimensions&gt; tags. Nu mai sunt necesare sau folosite.
        * Pentru variabile cu destinationName =altitudine, ERDDAP™ nu mai forţează long\\_name să fie Altitudine. Te rog să treci prin tine. datasets.xml și caută în mod repetat&lt; destinationName &gt;altitudine și adăugare la variabila respectivă&lt; addAttributes &gt;:
```
              <att name="long\\_name">Altitude</att>  
```
             (sau un pic diferit long\\_name în cazuri speciale) .
        * Opțional: Toate variabilele suport EDDTableFromFiles subclases [ sourceName =global:...](/docs/server-admin/datasets#global-sourcenames) să transforme metadatele globale din fiecare fișier într-o variabilă de date. Mulţumită lui Lynn DeWitt.
    * Tabel EDDDe la utilizatorii bazei de date - ERDDAP™ vine cu un nou şofer JDBC 4 pentru Postgres. Pentru alte baze de date, verificați web pentru ultimul fișier JDBC .jar pentru baza de date. De când ERDDAP™ acum folosește Java 1,6+, JDBC 4 (nu 3) este probabil recomandat.
    * FYI
        *    EDDGrid De la... Dosare și tabel EDD De la... Seturi de fișiere stochează acum informațiile din tabela fișierelor
             \\[ Big ParentDirectory \\] /Set de date Informaţii/ \\[  datasetID  \\] /\\* .nc Dosare.
De asemenea, seturile de date ale tabelului EDD păstrează acum informațiile subsetului în
             \\[ Big ParentDirectory \\] /Set de date Informaţii/ \\[  datasetID  \\] /\\* .nc Dosare. Aceste fișiere folosit pentru a fi
             \\[ Big ParentDirectory \\] /Set de date Informaţii/ \\[  datasetID  \\] \\* .json Dosare.
Fișierele vechi vor fi șterse automat atunci când ERDDAP™ Începe. Sau, puteți șterge toate fișierele (Dar lasă subdirectoarele goale.) în \\[ Big ParentDirectory \\] /datasetInfo/.
        * Am lucrat la un nou tabel EDDFromNcCFFiles care va citi date din fișiere locale și la distanță utilizând noile convenții de observare a punctelor CF propuse. Dar nu este în această versiune. Există probleme în bibliotecile netcdf-java legate de unele metode pentru citirea acestor fișiere. Și au existat unele modificări foarte recente la convențiile de observare a punctelor CF propuse. Când biblioteca netcdf-java va fi fixată şi actualizată la ultima propunere, voi relua lucrările la aceasta.
        * Rularea ERDDAP™ pe Windows pot avea probleme: în special, puteți vedea în \\[ BigParentDirectory/logs/log.txt fișier care ERDDAP™ uneori nu poate șterge și/sau redenumi rapid fișierele. Acest lucru se datorează software-ului antivirus (De exemplu, din McAfee și Norton) care verifică fișierele pentru viruși. Dacă dai peste această problemă (care poate fi văzut prin mesaje de eroare în fișierul log.txt ca "Nu se poate șterge ...") , modificarea setărilor software-ului antivirus poate atenua parţial problema.
Dacă ERDDAP™ în Windows este doar un test care rulează pe desktop, aceasta este doar o enervare.
Dacă ERDDAP™ în Windows este publicul dumneavoastră ERDDAP™ , ia în considerare trecerea la un server Linux.
    * Slow First Startup... Prima dată când fugi ERDDAP™ după modernizare, ERDDAP™ pot fi lente la încărcarea seturilor de date. Calea ERDDAP™ stochează informații despre fișierele agregate sa schimbat, așa ERDDAP™ va trebui să recitească unele informații din toate aceste fișiere. Va dura ceva timp.
    * Erori la pornire - Având în vedere modificările legate de cdm\\_data\\_type, este probabil ca unele dintre seturi de date să nu se încarce și să arunce erori. Citiți cu atenție e-mailul Daily Report care ERDDAP™ Te trimite când ERDDAP™ S-a terminat pornirea. Acesta va avea o listă de seturi de date care nu au încărcat (la partea de sus) şi motivul pentru care nu au încărcat (Lângă fund.) .
    * Dacă te blochezi sau ai alte întrebări, trimite-mi detaliile: erd.data at noaa.gov .
    * Programatori -- Dacă scrii Java programe care rulează ERDDAP™ cod, aveți nevoie pentru a modifica unele dintre referințele parametrilor liniei de comandă:
        * Schimbă-l pe Joda-time-1.6.2.jar cu Joda-time. borcan
        * Schimbă trimiterea postgres JDBC .jar la postgresql.jdbc.jar
*    **Mici modificări și reparații bug:** 
    
    * O mai bună manipulare a conexiunii pentru a evita firele atârnate.
    * Îmbunătăţirea practicilor de convalescenţă pentru gestionarea mai eficientă a cererilor aproape simultane identice.
    *    ERDDAP™ acum folosește netcdfAll-4.2.jar (redenumită în netcdAll-ultima. borcan) . Acest comutator a necesitat mai multe modificări interne și a cauzat câteva mici modificări externe, de exemplu, modificări ale modului în care fișierele grib sunt citite și mici modificări ale .nc Ieșire antet.
    * Caracteristici noi: \\[ erddap \\] /convert/fipscounty.html convertește FIPS Coduri judeţene către/din numele judeţului.
    * Pe hărţi, graniţele statului sunt acum violete întunecate, aşa că ele se remarcă mai bine pe toate culorile de fundal.
    * Tabular .kml ieșire din nou utilizează o pictogramă circulară pentru a marca puncte (nu pictograma avionului Google a trecut recent la) .
    * Seturile de date ErdCalcofi au fost rearanjate și sunt acum servite din fișierele locale (Mai repede.) .
    * Generează dateName Xml de la De trei ori Catalogul creează acum un fișier de rezultate:
         \\[ Tomcat \\] /webapps/erddap/WEB-INF/temp/ EDDGrid De la ThreddsCatalog.xml . Mulţumită lui Kevin O'Brien.
    * Generează dateName Xml de la De trei ori Catalog acum încearcă să elimine numerele de port inutile din URL-urile sursă (De exemplu, :8080 și :8081 pot fi uneori eliminate) . Mulţumită NOAA Echipa centrală de securitate.
    * Pentru .subset pagini web, Harta de date Distinct are acum o gamă variabilă lat lon.
    * Mai multe liste în ERDDAP™   (De exemplu, tabelul care prezintă toate seturile de date) au fost sortate astfel încât A.Z sortat înainte de un. .z . Acum sortează într-un mod insensibil.
    * Mici modificări ale paginilor web .subset, inclusiv: unități sunt acum indicate.
    * Generează dateName Xml și DasDds nu mai arunca o excepție în cazul în care nu mai poate pune rezultatele pe clipboard-ul de sistem sau afișareInBrowser. Mulţumită lui Eric Bridger şi Greg Williams.
    * Fix bug: Atunci când seturile de date sunt încărcate, ERDDAP™ acum elimină sau ajustează atributele geospaţiale globale. Mulţumită lui Charles Carleton.
    * Fix Bug: String2.getClassPath () Acum, în mod corespunzător, procentul-decade clasa Cale (în special, pe Windows, spațiile din numele de fișier au apărut sub numele de:) . Acest lucru a fost afectat ERDDAP™ EDStatic cheamă SSR.getContextDirectory () și găsirea conținutului/erddap. Mulţumită lui Abe Coughlin.
    * Fix bug: in EDDTableFromFiles related to getDataForDapQuery handling of distinct () cereri. Mulţumită lui Eric Bridger.
    * Fix bug: tabledap cererile nu au gestionat în mod corespunzător constrângerile de altitudine atunci când altitudinea setului de date MetersPerSourceUnit a fost -1. Mulţumită lui Eric Bridger.
    * Fix Bug: EDDtable From... Seturile de date ale fișierelor gestionează acum corect cererile care includ =NaNaN și &#33;=NaN.
    
## Versiunea 1.28{#version-128} 
 (lansat 2010-08-27) 

*    **Caracteristici noi:** Niciuna.
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** Niciuna.
*    **Fix Bug:** Fixați o greșeală de programare (numai în ver 1.26) care a făcut ERDDAP™ Foarte încet.
     

## Versiunea 1.26{#version-126} 
 (lansat în 2010-08-25) 

*    **Caracteristici noi:** Niciuna.
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** 
    * De la tine \\[ Tomcat \\] /content/erddap/setup.xml,
        * În&lt;legal&gt;, pe o nouă linie de mai jos \\[ standard Licențe de date \\] , introduceți \\[ standardContact \\] . \\[ standardContact \\] se referă la&lt;adminEmail&gt; specificat mai sus în setup.xml.
        * Elimină&lt;Tabelul ComunBGColor&gt; și&lt;Tabelul HighlightBGColor&gt;.
        * Recomandat: Modificare&lt;EndBodyHtml&gt;
```
            <endBodyHtml><!\\[CDATA\\[  
            <br>&nbsp;  
            <hr>  
            ERDDAP, Version &erddapVersion;  
            <br><a href="&erddapUrl;/legal.html">Disclaimers</a> |  
            <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy Policy</a> |  
            <a href="&erddapUrl;/legal.html#contact">Contact</a>  
            </body>  
            \\]\\]></endBodyHtml>
```

    * Necesar: Pentru tine \\[ Tomcat \\] /content/erddap/images/erddap.css și erddapAlt.css, adaugă în partea de jos:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Reparaţii de insecte şi mici modificări:** 
    
    * Fix Bug: în unele situații, formularele nu au funcționat în unele versiuni ale Internet Explorer. Mulţumită lui Greg Williams.
    * Fix bug: Butoanele Make A Graph nu au funcționat dacă setul de date a fost de la o distanță ERDDAP .
    * Fix bug: WMS Uneori nu a mers dacă setul de date era de la o telecomandă. ERDDAP .
    * Multe mici schimbări și soluții bug.
    

## Versiunea 1.24{#version-124} 
 (lansat 2010-08-06) 

*    **Caracteristici noi:** 
    * Nou [Subset pagini web](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html) Utilizați căutarea cu fațetă pentru a selecta subgrupe de seturi de date tabulare. Mulţumită lui POST.
    * Nou [Căutare avansată](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html) combină toate celelalte opţiuni de căutare şi adaugă longitudine, latitudine şi limite de timp. Mulţumită lui Ellyn Montgomery. (Scuze pentru întârziere.) 
    * Nou [Schimbă timpul](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) web page and service let you converteste numeric times to / from ISO string times.
    * Nou [Schimbă unitățile](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html) pagina web și serviciul vă permit să convertiți UDUNITS la/de la unitățile UCUM. Mulţumită NOAA IOOS SOS .
    * Dacă tabledap cerere include & unități ("UCUM") , numele unităților vor fi convertite din numele originale (de obicei UDUNITS ) la [UCUM](https://unitsofmeasure.org/ucum.html) Numele unităţilor. Acest lucru afectează numai unitățile\\*nume\\*, nu valori de date. Mulţumită NOAA IOOS SOS .
    * Îmbunătăţiri pentru a face un grafic pagini web şi grafice şi hărţi:
        * Dacă graficul este o hartă, există noi butoane Make A Graf pentru a mări / afară și o nouă opțiune pentru a face clic pentru a schimba punctul central al hărții. Mulţumită lui POST.
        * Setări filtru adăugat în apropiere de partea de jos. Mulţumită lui Greg Williams.
        * Construit în fişiere de date de coastă au fost actualizate la GSHHS v2.0. Mulţumită lui POST.
        * Hărţile includ acum lacuri şi râuri. Mulţumită lui POST. (Ne pare rău, Sacramento River Delta lipsește pentru că nici datele de coastă, nici setul de date lac / râu se ocupă cu ea.) 
        * Construcţia în fişiere naţionale/state derivate din pscoast a fost actualizată. Mulţumită lui POST.
        * Topografia.cpt a fost uşor modificată. (Îmi pare rău dacă acest lucru te afectează negativ.) Mulţumită lui POST.
        * În Griddap's Make A Graph, în cazul în care un utilizator schimbă o variabilă, formularul este repus în mod automat în așa fel încât axisVariable Show StartAndStop reflectă întotdeauna variabilele grafice. Mulţumită lui Joaquin Trinanes.
        * Pentru URL-uri imagine png și pdf:
            * Noul teren =_valoare_, unde _valoare_ poate fi "sub" (arată topografie) sau "terminat" (Arata doar bathymetry) . Dacă nu este specificat, implicit este setat de [ drawLandMask ](/docs/server-admin/datasets#global-drawlandmask) în datasets.xml sau setup.xml. Mulţumită lui POST.
            * Noi: liniile din legenda care sunt prea lungi sunt rupte automat în mai multe linii. Mulţumită lui POST.
        * Pentru URL-uri imagine png:
            * Noua legendă =_valoare_, unde _valoare_ poate fi "jos" (implicit) , "Off" sau "Numai." Acest lucru vă permite să includă legenda, exclude legenda, sau de a lua doar legenda. Mulţumită Carei Wilson.
            * & Nou Pixels_ lasă o frontieră de nPixels (de exemplu 10) în partea de jos a imaginii. Se aplică după .legend=Off. Mulţumită Carei Wilson.
            * & Dimensiune nouă=_lățime_ | _înălțime_ vă permite să specificați lățimea și înălțimea imaginii, în pixeli.
    * Formate de fișiere de ieșire noi:
        * .csvp și .tsv P - cum ar fi .csv și .tsv , dar cu " (_unități_) " anexat la numele coloanei pe prima linie.
        * .odvTxt - face un fișier .txt care simplifică obținerea de date în [Date privind oceanul Vizualizare (ODV) ](https://odv.awi.de/) .
        * .esriCsv - face un fişier .csv potrivit pentru import în ESRI ArcGIS . (numai seturi de date tabulare) Mulţumită lui Jan Mason, Jeff de La Beaujardiere şi NOAA IOOS SOS proiect.
    * Îmbunătățiri ale sistemului grafic [Categorie](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html) pagini web. De asemenea, valorile clasificate (altele decât instituția) sunt acum toate minuscule. Cererile care nu fac obiectul unei cereri sunt acceptate (redirecționat) pentru compatibilitatea inversată. Mulţumită lui Roy Mendelssohn.
    * Mesajele de eroare sunt acum chiar mai scurte și mai orientate către utilizatori. Mulţumită lui Greg Williams.
    * O schimbare internă care reduce foarte mult ERDDAP Folosirea memoriei de bază.
    * Multe caracteristici noi care sunt relevante doar pentru proiectul POST.
*    **Lucruri ERDDAP™ Administratorii trebuie să cunoască și să facă:** Sunt multe schimbări. Scuze. Dar fiecare aduce unele beneficii frumoase.
    * Schimbări mari în GenerateDatasetXml -- acum pune adesea mai multe întrebări (a se vedea datele relevante [Set de date Tipuri](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) informații) și acum generează întotdeauna conținut în esență gata de utilizare datasets.xml . Sunteți încă responsabil pentru configurare, așa că ar trebui să revizuiască încă datasets.xml conținutul înainte de utilizare. Un om care depune eforturi în proiect va face întotdeauna mai bine decât un program de calculator. Datorită proiectului UAF.
    * REquired: În setup.xml, trebuie să revizuiască WMS Sectiunea. Ar trebui să includă acum aceste etichete (dar nu ezitați să modificați valorile) :
```
        <!-- These default accessConstraints, fees, and keywords are used 
        by the SOS, WCS, and WMS services.
        They can be overridden by "accessConstraints", "fees", "keywords" 
        attributes in a dataset's global metadata.
        If a dataset that has an "accessibleTo" tag doesn't override 
        "accessConstraints", then the default for "accessConstraints" is the
        "accessRequiresAuthorization" value.  
        -->
        <accessConstraints>NONE</accessConstraints>
        <accessRequiresAuthorization>only accessible to authorized
        users</accessRequiresAuthorization>
        <fees>NONE</fees>
        <keywords>Earth science, oceans</keywords> 
        
        <!-- This appears on the erddap/legal.html web page after the 
        General Disclaimer. 
        You can replace any of the \\[standardParts\\] with your own HTML. -->
        <legal><!\\[CDATA\\[
        \\[standardDisclaimerOfEndorsement\\]
        \\[standardDisclaimerOfExternalLinks\\]
        \\[standardPrivacyPolicy\\]
        \\[standardDataLicenses\\]
        \\]\\]></legal>
        
        <!-- Specify the default units standard (e.g., "UDUNITS" 
        (the default) or "UCUM") that you (the ERDDAP™ admin) are using to 
        specify units.  The value is case-sensitive.
        This is used by ERDDAP's SOS server to determine if the units need to
        be converted to UCUM units for WMS and SOS GetCapabilities responses. 
        -->
        <units\\_standard>UDUNITS</units\\_standard>
        
        <!-- For the wms examples, pick one of your grid datasets that has
        longitude and latitude axes.
        The sample variable must be a variable in the sample grid dataset.
        The bounding box values are minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>
```

    * REquired: În setup.xml, copiați și lipiți acest nou sugerat&lt;StartHeadHtml&gt; pentru a înlocui versiunea veche. Dar nu ezitați să faceți schimbări pentru preferințele dumneavoastră.
```
        <!-- startHeadHtml has the start of the HTML document and the 
        'head' tags (starting at "<!DOCTYPE>", but not including 
        "</head>") for all HTML web pages. 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, 
          css files, etc. must be in \\[tomcat\\]/content/erddap/images or a 
          subdirectory and must be referenced here with 
          &erddapUrl;/images/\\[fileName\\].
        
        favicon.ico is the image that browsers associate with your website.
        For more information, see https://en.wikipedia.org/wiki/Favicon .
        You can use your own favicon.ico file by putting it in 
          \\[tomcat\\]/content/erddap/images. 
        
        \\*\\*\\* Optional: you can change the appearance of all of your 
        ERDDAP's HTML pages by changing the CSS <style> settings below.
        
        For an example of a very different style, change the import reference
        to <tomcat>/content/erddap/images/erddapAlt.css
        
        \\*\\*\\* If your CSS style includes links to files (e.g., images), that 
        style information must be inline in the style tag below, after the
        'import' line, not in the .css file.  
        Put all of the (e.g., image) files in the 
        \\[tomcat\\]/content/erddap/images directory (or a subdirectory) and 
        reference them below starting with &erddapUrl;.
        Why? On ERDDAP™ https: web pages, \\*all\\* links should use "https:" 
        (not "http:"); otherwise, most browsers consider the web page not 
        fully secure.  Because ERDDAP™ would use the same .css file for 
        http: and https: web pages, the links within the .css file wouldn't 
        switch between http: and https:.  There doesn't seem to be a way 
        around this other than using inline style information.
        -->
        <startHeadHtml><!\\[CDATA\\[ 
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
          "http://www.w3.org/TR/html4/loose.dtd">
        <html>
        <head>
        <title>ERDDAP</title>
        <link rel="shortcut icon" href="&erddapUrl;/images/favicon.ico">
        <style type="text/css">
        <!--
          @import "&erddapUrl;/images/erddap.css";
        -->
        </style>
        \\]\\]></startHeadHtml>
        
        <!-- The tableCommonBGColor MUST be the same color as the 
           table.commonBGColor in erddap.css above. Suggested is #f1ecd8. 
           But if you use erddapAlt.css, change this to #e7dec5. -->
        <tableCommonBGColor>#f1ecd8</tableCommonBGColor>
        
        <!-- This is used, e.g., for the type=variable rows on the metadata
          info tables. -->
        <tableHighlightBGColor>#cceecc</tableHighlightBGColor>
```

Mulţumită lui POST, Hans Vedo şi Rick Blair.
    * În setup.xml, în&lt;StartBodyHtml&gt;, modificați&lt;corp &gt; etichetă pentru a fi doar&lt;Body&gt;, deoarece stilul este acum stabilit de erddap.css.
    * REquired: În setup.xml, se schimbă în acest&lt;EndBodyHtml&gt; (dar schimba adresa de e-mail la adresa de e-mail și nu ezitați să facă alte modificări) :
```
        <!-- The end of the body of the HTML code for all HTML web pages
          (with "</body>" at the end). 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, etc. 
          must be in \\[tomcat\\]/content/erddap/images or a subdirectory
          and must be referenced here with &erddapUrl;/images/\\[fileName\\].
        
        You can change this, but please keep "ERDDAP, Version &erddapVersion;"
        and these references to the Disclaimers and Privacy Policy. -->
        <endBodyHtml><!\\[CDATA\\[ 
        <br>&nbsp;
        <hr>
        ERDDAP, Version &erddapVersion;
        <br><font class="subduedColor">Questions, comments, 
          suggestions?  Please send an email to 
          <tt>erd dot data at noaa dot gov</tt>
        <br>and include the ERDDAP™ URL directly related to your question
          or comment.
        <br>
          <a href="&erddapUrl;/legal.html">Disclaimers</a> | 
          <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy 
            Policy</a>
        </font>
        </body>
        \\]\\]></endBodyHtml>
```

    * În setup.xml, recomandat&lt;TheShortDescriereHtml&gt; este acum
```
        <theShortDescriptionHtml><!\\[CDATA\\[ 
        <h1>ERDDAP</h1>
        This website (the Environmental Research Division's Data Access 
        Program) aggregates scientific data from diverse local and remote 
        sources and offers you a simple, consistent way to download subsets 
        of the data in common file formats and make graphs and maps.
        This particular ERDDAP™ installation has oceanographic data
        (for example, data from satellites and buoys).
        
        \\[standardShortDescriptionHtml\\]
        \\]\\]></theShortDescriptionHtml>
```

Puteţi schimba acest lucru, în special ultima frază de la primul paragraf.
    * In setup.xml, emailEverythingTo and emailDailyReport Pentru a putea fi acum liste separate de e-mail. Primul e-mailTotul Pentru a fi special, de exemplu, abonamente la seturi de date EDDXxxFromorthErddap folosesc acea adresă de e-mail. Mulţumită lui John Maurer.
    * Erorile de e-mail sunt acum logate la \\[ Big ParentDirectory \\] /loguri/emailLogAAAAA-LL-ZZ.txt fișier.
    * În setup.xml, există un nou parametru opţional pentru stabilirea proprietăţilor contului de e-mail (de obicei imediat după&lt;Parolă e-mail&gt;:
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

Implicit nu este nimic. Mulţumită lui Rich Signell.
    * NECESAR: Dacă utilizaţi EDDtableCopy sau EDDGrid Recepţionat, trebuie să ştergi tot. \\[ Big ParentDirectory \\] /copie / directoare și fișiere care conțin "xh" în director sau nume de fișiere după oprirea vechi ERDDAP™ şi înainte de a începe noul ERDDAP™ Astfel încât aceste fișiere vor fi re-copiate. Îmi pare foarte rău, dar a fost important să facă schimbarea și sperăm că afectează puțini admini și câteva fișiere.
În Linux, puteți găsi aceste fișiere cu, cd \\[ Big ParentDirectory \\] /copie
Găseşte.\\*xh\\*  
În Windows, puteți găsi aceste fișiere cu, Start | Caută
Ce doriţi să căutaţi: Documente
Toate sau o parte din numele fișierului: xh
Caută în: Navighează - &gt; \\[ Big ParentDirectory \\] /copie
Faceți clic pe "Caută"
^A pentru a selecta toate
Del pentru a le șterge pe toate
    * REquired: in datasets.xml , pentru tabelul EDDDe la seturile de date, pentru variabilele de date și de timp, modificați datele Tip la dublu și unitățile la secunde de la 1970-01-01T 00:00:00Z. Necesităm ca tu stochezi datele de timp în baza de date\\*cu\\*un fus orar. Fără informații despre fusul orar, întrebările care ERDDAP™ trimite la baza de date și rezultatele care ERDDAP™ devine din baza de date prin JDBC sunt ambigue și sunt susceptibile de a fi greșit. Am încercat, dar nu am găsit o cale sigură de a ne ocupa de datele "timpului fără fusul orar." Oricum, credem că e o practică bună. Până la urmă, datele "timpului fără fus orar" au un fus orar implicit. Deși este minunat că fusul orar este evident pentru admin baza de date, este logic să se specifice în mod explicit, astfel încât alte software-ul poate interacționa în mod corespunzător cu baza de date. Mulţumesc, scuze, Michael Urzen.
    * RECOMANDAT: datasets.xml , pentru a activa .Subset pagini web pentru căutarea facited a seturilor de date tabulare, aveți nevoie pentru a adăuga [&lt; subsetVariables &gt;] (/docuri/server-admin/seturi de date#subsetvariabile) la atributele globale ale setului de date.
    * RECOMANDAT: datasets.xml , dacă aveți setul de date cu datasetID ="pmelGtsppp," vă rugăm să-l schimbe să fie
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * RECOMANDAT: datasets.xml , există noi opțiuni valabile pentru [&lt;cdm\\_date\\_type&gt;] (/docs/server-admin/datasets#cdm_data_type) atribut global, astfel încât ar trebui să revizuiască / modifica valoarea pentru seturile de date.
    * În datasets.xml , noul [&lt;sursaNecesităexpandedFP\\_EQ&gt;] (/docs/server-admin/sets#sourceneedsexpandedfp_eq) este util în cazul în care serverul sursă nu se ocupă în mod constant &_variabil_\\=_valoare_ teste corect (din cauza [dificultatea generală de a testa egalitatea numerelor de puncte plutitoare](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) ) . sursaNecesităextindereFP\\_EQ este setat la adevărat în mod implicit (cel mai sigur cadru) Nu trebuie să faci schimbări.
    * Nou [Tabel EDD din AsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles) . Mulţumită lui Jerry Yun Pan.
    * Nou [Tabel EDD de la trei fișiere](/docs/server-admin/datasets#eddtablefromthreddsfiles) . Mulţumită lui Roy Mendelssohn.
    * Modificări la [Tabel EDDFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles) permite utilizarea cu o gamă mai largă de fișiere.
    * Tabelul EDDFromBMDE a fost dezactivat. Nu mai există surse de date active, adecvate.
    * În GenerateDatasetXml, noul EDDGrid Din trei mii Catalogul recoltează un întreg catalog THREDS (sau un subset) și generează datasets.xml Conţinut. Datorită proiectului UAF.
    * Generează dateName Xml și DasDds pune acum, de asemenea, rezultatele lor în \\[ Big ParentDirectory \\] /logs/log.txt. Mulţumită lui Rich Signell şi Charles Carleton.
    * Multe îmbunătățiri ale sistemului de autentificare. Mulţumită lui POST.
*    **Lucruri ERDDAP™ Programatori Trebuie să ştim şi să facem:** 
    * Au existat modificări în /WEB-INF/lib/ director. Vă rugăm să modificaţi setările Javac şi Java classpath în mod corespunzător.
    * Există o nouă \\[ dumneavoastră Url \\] Serviciul /erddap/versiune pentru a determina versiunea unui ERDDAP . Răspunsul este text, de exemplu, ERDDAP \\_versiune=1.24 Dacă primiți un mesaj de eroare HTTP 404 Negăsit, tratați ERDDAP™ ca versiune 1.22 sau mai mică. Mulţumită lui POST.
*    **Mici modificări și reparații bug:** 
    
    * Tabel EDD din Modificări SOS:
        * Suport scăzut pentru citirea IOOS SOS Răspunsurile XML.
        * Suport adăugat pentru citirea IOOS SOS text/csv. (Deci, NOS SOS serverele nu sunt acceptate.) 
        * A făcut multe schimbări legate de IOOS SOS detalii server.
        * Suport adăugat pentru întrebări BOX pentru IOOS SOS şi OOSTethys   SOS servere. Aceste modificări duc la o accelerare mare a cererilor de date relevante. Datorită IOOS SOS .
    * Text în .mat Fișierele de date tabulare sunt acum salvate corect. Mulţumită lui Roy Mendelssohn.
    *    WMS 
        *    OpenLayers este acum legat cu ERDDAP™ pentru utilizare pe WMS pagini web. Acest lucru rezolvă problema cauzată atunci când OpenLayers s-a schimbat acum câteva luni şi previne problemele viitoare.
        * În WMS   GetCapabilities răspuns,&lt;Resursa online&gt; valoarea este acum URL- ul WMS service. Mulţumită lui Charlton Galvarino.
        * O legendă este afișată pe WMS pagina web pentru a arăta bara de culori. Mulţumită lui Emilio Mayorga.
    *    EDDGrid AgregatExistingDimension constructor a avut probleme în cazul în care sursa unei axe Valorile nu erau egale cu destinaţia lor. Valori, de exemplu, dacă timpul de sursă a fost altceva decât "seconds since 1970-01-01" . Mulţumită Todd Spindler.
    * În tabelWriterGeoJson, excesul ',' după bbox \\[ ... \\] a fost eliminat. Mulţumită lui Greg Williams.
    * Multe mici schimbări și soluții bug.
    
## Versiunea 1.22{#version-122} 
 (lansat 2009-07-05) 

* Bug-ul SlideSorter introdus în 1.20 este fix.
* Microbul OBIS introdus în 1.20 este reparat.
* Referințele la seturile de date Jason de pe pagina imagini/gadget-uri/GoogleGadgets au fost eliminate.
     
## Versiunea 1.20{#version-120} 
 (eliberat în 2009-00-02) 

*    ERDDAP™ administratori, vă rugăm să adăugați acest lucru la fișierul setup.xml:
```
    <!-- If you want to restrict access to some datasets, you need to 
    specify the method used for logging on (authentication). See the info 
    at https://erddap.github.io/setup.html#security
    Currently, the options are: "" (logins not supported, the default),
    "custom", "openid". Note that openid login doesn't work when testing 
    with localhost (https://127.0.0.1:8443).
    -->
    <authentication></authentication>
    
    <!-- This specifies how you have stored passwords in the roles tags 
    in datasets.xml. If you aren't storing any passwords this is irrelevant.
    The options (in order of increasing security) are: "plaintext", "MD5", 
    or "UEPMD5" (MD5(UserName:ERDDAP:Password), the default).
    You should only use "plaintext" or "MD5" if you need to match values 
    stored that way in an external password database.  See the info at
    https://erddap.github.io/setup.html#security
    -->
    <passwordEncoding>UEPMD5</passwordEncoding>
    
    <!-- This determines whether datasets that the user doesn't currently
    have access to (because he isn't logged in or because his roles don't
    allow access) should be shown on lists of data sets 
    (e.g., from full text search, categorize, view all datasets, ...).
    The options are: "true", or "false" (the default).
    If false, no information about the dataset (even its existence) is 
      shown to users who don't have access to it.
    If true, some information about the dataset (title, summary, etc) is
      shown to users who don't have access to it.  
      If the user clicks on a link to a dataset he doesn't have access to,
      he will get an error message and be prompted to log in.
    -->
    <listPrivateDatasets>false</listPrivateDatasets>
    
    <!-- If the number of requests between two runs of LoadDatasets 
    exceeds unusualActivity, an email is sent to emailEverythingTo.
    The default is 10000.
    -->
    <unusualActivity>10000</unusualActivity>
```

* Noi tipuri de seturi de date [ EDDGrid Copiază](/docs/server-admin/datasets#eddgridcopy) şi [EDDCommentCopy](/docs/server-admin/datasets#eddtablecopy) face și menține o copie locală a unei alte EDDGrid sau datele setului de date al tabelului EDD și să servească date din copia locală. Acestea sunt foarte usor de utilizat si foarte eficiente **soluții la unele dintre cele mai mari probleme cu furnizarea datelor din surse de date la distanță:** 
    
    * Accesul la date dintr-o sursă de date la distanță poate fi lent (din diverse motive) .
    * Setul de date la distanță este uneori indisponibil (din nou, pentru o varietate de motive) .
    * Să te bazezi pe o singură sursă de date nu e bine (de exemplu, atunci când mulți utilizatori și mulți ERDDAP s utilizaţi) .
    
În plus, copia locală este o copie de rezervă a originalului, care este util în cazul în care se întâmplă ceva cu originalul.
    
Nu este nimic nou despre a face o copie locală a unui set de date. Ce este nou aici este că aceste clase fac\\*Uşor.\\*crearea și\\*menţine\\*o copie locală a datelor de la o\\*soi\\*tipurile de surse de date la distanță și\\*adăuga metadate\\*copierea datelor.
    
Aceste tipuri de seturi de date fac parte dintr-un set complet de caracteristici care simplifică crearea [grile/clustere/federații ale ERDDAP s](/docs/server-admin/scaling) să se ocupe de sarcini foarte grele (de exemplu, într-un centru de date) .
    
* Tip nou de set de date [Tabel EDD din baza de date](/docs/server-admin/datasets#eddtablefromdatabase) obține date de la o masă de baze de date locală sau de la distanță.
*    ERDDAP™ acum are un [securitate](/docs/server-admin/additional-information#security) sistem care suportă autentificarea (permite utilizatorilor să se logheze) şi autorizaţie (acordarea accesului la anumite seturi de date private) .
* Există [două instrumente noi, linia de comandă](/docs/server-admin/datasets#tools) pentru a ajuta ERDDAP™ Administratorii generează XML-ul pentru un nou set de date în datasets.xml :
    * Generează dateName Xml poate genera un proiect dur al XML-ului setului de date pentru aproape orice tip de seturi de date.
    * DasDds vă ajută să testați și să rafinați în mod repetat XML-ul pentru un set de date. ERDDAP Generează date Pagini web Xml au fost eliminate. Din motive de securitate, acestea au sprijinit doar câteva tipuri de seturi de date. Noile instrumente de linie de comandă sunt o soluție mai bună.
* Noul [pagina de stare](/docs/server-admin/additional-information#status-page) lasă pe oricine (dar în special administratorii) vezi starea unei ERDDAP™ din orice browser prin mers la \\[ BaseUrl \\]  /erddap/status.html .
* Tabledap acceptă acum [Funcții ale serverului](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions) :
    * & distinct () elimină rândurile duplicate din tabelul de răspuns;
    * & orderBy  (...) vă permite să precizați modul în care tabelul de răspuns ar trebui să fie sortate,
    * & orderByMax  (...) vă permite să precizați modul în care tabelul de răspuns trebuie sortate și elimină toate rândurile, cu excepția rândurilor cu valorile maxime din ultima coloană specificată. Acest lucru poate fi folosit, de exemplu, pentru a obține ultimele date disponibile pentru fiecare stație.
* Seturile de date tabelare pot include acum variabile suplimentare dataTime care nu sunt numite "time" . Aceste variabile sunt recunoscute prin metadatele lor "unități," care trebuie să conțină " since "   (pentru data numerică Timpuri) sau "yy" sau "YY" (pentru data formatării StringTimes) . Dar vă rugăm să utilizați încă destinationName   "time" pentru data principală Variabila timpului.
*    ERDDAP™ acum generează un [sitemap.xml](/docs/server-admin/additional-information#sitemapxml) fișier, care spune motoarelor de căutare că ERDDAP Trebuie doar să fie târât în fiecare lună. ERDDAP™ Administratori, vă rugăm să urmaţi [aceste instrucţiuni](/docs/server-admin/additional-information#sitemapxml) pentru a notifica motoarele de căutare despre noul fișier sitemap.xml.
*    ERDDAP Mesajele de eroare sunt acum mult mai scurte și orientate către clienți (fără programatori) . Mulţumită lui Greg Williams.
* [&lt;cerere Lista neagră &gt;] (/docs/server-admin/sets#request blacklist) Acum susține și adresele IP în care ultimul număr a fost înlocuit cu \\*.
* Solicitări .json și .geoJson fișiere pot include acum o opțiune [JSONP](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/) cerere prin adăugarea "& .json p=_functionName_" până la sfârșitul cererii. Practic, asta spune doar ERDDAP™ pentru a adăuga "_functionName_ (" la începutul răspunsului şi ") " până la sfârşitul răspunsului. În cazul în care inițial nu a existat nici o cerere, lăsați "&" în interogare. Mulţumită lui Greg Williams.
* O mulțime de statistici noi au fost adăugate [Raport zilnic](/docs/server-admin/additional-information#daily-report) .
* Pe paginile web cu liste de seturi de date, instituția și ID sunt acum la dreapta. Acest lucru mută abonamentul și alte coloane mai utile în vedere pe ecrane înguste de calculator.
* Pe toate paginile web, titlul paginii (pe baza&lt;titlul &gt; în&lt;startHeadHtml&gt; pe care le defini în setup.xml) este modificat pentru a include o mai bună descriere a paginii web (de exemplu, prin includerea titlului și a instituției setului de date curent) .
* Informațiile Xmx sunt acum incluse cu informațiile de memorie tipărite în log.txt, Daily Report și pe status.html. Mulţumită lui Ellyn Montgomery.
*    ERDDAP™ are protecție suplimentară, generală împotriva tuturor erorilor (De exemplu, OutOfMemoryError) . Mulţumită lui Charles Carleton.
* Îmbunătățiri ale gestionării erorilor în cazul în care răspunsul a fost deja comis.
* IMPRUMUT: tabel EDDFromFiles și EDDGrid FromFiles acum permite doar&lt;MetadateDe la primul sau ultimul. penultima nu mai este suportată. Şi prima şi ultima se bazează acum pe ultima dată când dosarele sunt codificate.
* Fix bug: in EDDtableFrom SOS , informații nevalabile pentru o stație aruncat o excepție și a cauzat întregul set de date să fie respins. Aceste staţii sunt ignorate. (și mesajul de eroare este logat la log.txt) . Mulţumită lui Rick Blair.
     

## Versiunea 1.18{#version-118} 
 (lansat în 2009-04-08) 

* Fix Bug: Începând cu 1.14, formularul de acces la date EDDtable și Faceți o pagină web grafică nu a abordat în mod corespunzător constrângerile citate.
* Fix Bug: Incepand cu 1.14, EDDtable FromDapSequence nu a tratat corect constrângerile de timp daca unitatile de timp sursă nu au fost "secunde din 1970-01-01T00:00."
     

## Versiunea 1.16{#version-116} 
 (lansat 2009-03-26) 

*    ERDDAP™ administratori:
    * Aceasta este o eliberare importantă pentru că stabilește un bug care a lăsat un ERDDAP™ rulare file dacă ați folosit Tomcat Manager pentru a opri / Start sau Reload ERDDAP . Deci, atunci când instalaţi 1.16, nu utilizaţi doar Tomcat manager pentru a desface vechi ERDDAP™ și de a implementa noul ERDDAP . În schimb: **Dezactivează vechiul ERDDAP™ , Reporni Tomcat (sau serverul) , apoi implementați noul ERDDAP .** Întotdeauna e o idee bună să faci asta când instalezi o nouă versiune.
    * Vă rugăm să adăugați [&lt;cerere Lista neagră &gt;&lt;/Cerere Blacklist&gt;] (/docs/server-admin/sets#request blacklist) la dumneavoastră datasets.xml . Acest lucru poate fi folosit pentru a specifica o listă de adrese IP client pentru a fi blocate (De exemplu, pentru a evita un atac al serviciului sau un robot web prea zelos) .
* Există acum o \\[ Big ParentDirectory \\] /logs director to hold the ERDDAP™ jurnal fişiere. Când începi ERDDAP™ , face o copie arhivă a jurnalului.txt și jurnal. Dosarele anterioare cu timbru. Dacă au existat probleme înainte de repornire, ar putea fi util pentru a analiza aceste fișiere.
*    ERD 's ERDDAP™ Acum sistemul de abonamente este pornit.
*    ERDDAP™ încă o dată permite (dar tot nu recomandă) codarea "% 26" a "&" în URL-uri de cerere (vezi [modificare v1.14 asociată](#percent26) ) .
* Mai multe noi completări la secțiunea Tally a [Raport zilnic](/docs/server-admin/additional-information#daily-report) .
* Mici dispozitive bug în generaDatesetsXml.
* Câteva mici soluţii pentru gândaci.
     

## Versiunea 1.14{#version-114} 
 (lansat în 2009-03-17) 

* Modificări pentru utilizatori:
    * În cererile de date privind rețeaua, ERDDAP™ Acum acceptă: [ultimul n](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last) unde n este un număr întreg de indici și [ (Ultima-d) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses) unde d este o valoare numerică (pentru timp, este în câteva secunde) .
    * În cererile de date tabulare, constrângerile String necesită acum [ghilimele duble](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings) în jurul valorii, de exemplu, &id="NDBC40121" Acest lucru este necesar de către DAP Protocolul.
    * În cererile de date tabelare, ERDDAP™ Acum cere ca [toate constrângerile să fie codate în mod corespunzător la sută](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode) . Browser-ul face acest lucru automat, astfel încât acest lucru afectează mai ales programele/scriptoarele de calculator care accesează ERDDAP .
#### Procent26{#percent26} 
*    [Anterior,](#percent26) nu [înglobat o pagină web grafică](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html) şi [ ERDDAP™ Pagina web Google Gadget](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html) a spus să înlocuiască "&" în URL-ul imaginii cu "%26." De acum înainte, ar trebui să înlocuiți "&" în URL-ul imaginii cu "&amp;." Deci, trebuie să înlocuiți orice "% 26" în paginile web existente și Google Gadgets cu "&amp;." (Scuze.) 
*    ERDDAP™ Administratori, vă rog:
    * Adaugă următoarele [setup.xml](/docs/server-admin/deploy-install#setupxml) fișier (şi să schimbe steagul Valoare cheie) :
```
        <!-- ERDDAP™ has a service that lets remote users set a flag
        to notify ERDDAP™ to try to reload a dataset.
        These requests use a key which is generated based
        on baseUrl/warName, a datasetID, and flagKeyKey.
        \\*\\*\\* Change this once, to any text (a favorite quote? random text? 
        It doesn't matter). Normally, you won't ever change this again.
        But if you think someone is abusing the flag system,
        change this text again, restart ERDDAP™, and send
        all of the users of the flag system the relevant new flagKeys
        (see the list in the Daily Report). -->
        <flagKeyKey>A stitch in time saves nine. CHANGE THIS!!!</flagKeyKey>
        
        <!-- ERDDAP™ has an email/URL subscription system which sends a user
        an email or pings a url whenever a dataset of interest changes.
        (This is different from the RSS system, which is always active.)
        The system relies on the server being able to send out 
        emails to people to validate their subscription requests.
        The emails appear to come from the emailFromAddress below.
        So if your server can't send out emails, don't make this system active.
        You may choose (for whatever reason) to make this system active or not, 
        so valid values below are "true" (the default) and "false".
        Note that if you change this and restart ERDDAP™, the list of 
        subscriptions (in \\[bigParentDirectory\\]/subscriptionsV1.txt) isn't
        affected. See also the subscriptionEmailBlacklist in datasets.xml.
        -->
        <subscriptionSystemActive>true</subscriptionSystemActive>  
```

    * Pe linie după&lt;e-mailUserName&gt; in your [setup.xml](/docs/server-admin/deploy-install#setupxml) fișier, adăuga
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
şi introduceţi parola reală.
    * Te poţi schimba.&lt;wmsSampleBBox&gt; în dumneavoastră [setup.xml](/docs/server-admin/deploy-install#setupxml) fișier pentru a include valorile de longitudine până la 360, de exemplu;
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * În datasets.xml fișier, redenumește tipul de set de date EDDTabelFromNc4DFiles to EDDTabelFromNcFiles (care suportă acum fișiere cu orice număr de dimensiuni) . Dacă ați avut un set de date EDD de la NC4DFiles:
        
        1. TREBUIE să treceți la tipul="EDDtableFromNcFiles" în seturile de date. Fișier XML.
        2. Trebuie să adăugaţi&lt;nDimensions&gt; 4&lt;/nDimensions&gt; tag pe XML-ul setului de date.
        3. Puteți adăuga noul&lt;sortFilesBySourceNames&gt; tag pentru a specifica ordinea internă pentru fișiere, care determină ordinea generală a datelor returnate.
        
Pentru detalii, a se vedea [Tabel EDD din dosare](/docs/server-admin/datasets#eddtablefromfiles) .
    * În trecut, pentru tabelul EDD From DapSequence, pentru OPeNDAP Servere DRDS, în datasets.xml , am folosit&lt;sursăCanConstrainStringsRegex&gt;~=&lt;/sursaCanConstrainStringRegex&gt;. Dar acum vedem că sprijinul DRDS regex este mai limitat decât ERDDAP Aşa că vă recomandăm&lt;sursăCanConstrainStringsRegex&gt;&lt;/sursaCanConstrainStringRegex&gt; astfel încât constrângerile regex nu sunt trecute la sursă, dar sunt manipulate de ERDDAP .
    * Revamped manipulare a sursei CanConstrain... în datasets.xml de [Tabel EDD din DapSequence](/docs/server-admin/datasets#eddtablefromdapsequence) şi (intern) toate tipurile de seturi de date EDD. Noul sistem este mai simplu și reflectă mai bine variabilitatea diferitelor surse de date. S-ar putea să fie necesar să modificați XML-ul pentru seturile dumneavoastră de date în datasets.xml .
* Există mai multe caracteristici noi care sunt utile de la sine, dar atunci când sunt combinate, facilitează, de asemenea, crearea de [grile/clustere/federații ale ERDDAP s](/docs/server-admin/additional-information#grids-clusters-and-federations) .
    * Noi tipuri de seturi de date:
        *    [ EDDGrid FromErddap](/docs/server-admin/datasets#eddfromerddap) şi [Tabel EDD FromErddap](/docs/server-admin/datasets#eddfromerddap) care lasa unul ERDDAP™ include un set de date de la altul ERDDAP™ într-un mod foarte simplu şi foarte eficient.
        *    [ EDDGrid Din dosare](/docs/server-admin/datasets#eddgridfromfiles)   (și subclasa sa, [ EDDGrid DinNcFiles](/docs/server-admin/datasets#eddgridfromncfiles) care poate citi NetCDF   .nc , GRIB.grb și HDF   .hdf fișiere) .
        *    [Tabel EDDFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles) care poate citi NetCDF   .nc care au o structură asemănătoare unei mese.
    * RunLoadDatasets și LoadDatasets au fost reamenajate astfel încât ERDDAP™ este foarte receptiv la reîncărcarea seturilor de date bazate pe fișiere din [pavilion](/docs/server-admin/additional-information#flag) director (adesea&lt;5 secunde daca incarcatura principalaDatele se fac in prezent).
    * Serviciu nou care să permită [un URL pentru crearea unui fișier de pavilion](/docs/server-admin/additional-information#set-dataset-flag) pentru un anumit set de date, de exemplu,
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
creează un fișier de pavilion în directorul de pavilion pentru rPmelTao (deşi steagul Cheia e greşită.) .
    * Nou [abonament](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions) serviciu astfel încât orice client să poată specifica o acțiune care va fi efectuată atunci când se creează un set de date specific (când ERDDAP™ se reia) și ori de câte ori setul de date se modifică în orice mod. Acest sistem poate fi dezactivat prin intermediul&lt;abonareSystemActive&gt; in your [setup.xml](/docs/server-admin/deploy-install#setupxml) Dosar. ă ERDDAP™   [Raport zilnic](/docs/server-admin/additional-information#daily-report) Acum enumeră toate abonamentele și include URL-ul necesar pentru a anula fiecare, în cazul în care simțiți că sistemul este abuzat. În datasets.xml , există un nou, opţional [&lt;abonament E-mailBlacklist&gt;] (/docs/server-admin/datasets#subscriptionemail blacklist) tag astfel încât administratorii să poată specifica o listă separată de adrese de e-mail care sunt listate imediat pe lista neagră de la sistemul de abonament.
    * Nou [&lt;privind schimbarea &gt;] (/docs/server-admin/sets#onchange) atribut în datasets.xml les ERDDAP™ Administratorul specifică o acțiune care va fi efectuată atunci când se creează un set de date specific (când ERDDAP™ se reia) și ori de câte ori setul de date se modifică în orice mod.
    * Îmbunătățiri la căutarea completă text: stocarea șir de căutare pentru fiecare set de date folosește acum 1/2 memoria. Algoritmul de căutare (Boyer-Moore-ca) este acum cu 3X mai rapid.
    * E-mailuri de la ERDDAP™ acum întotdeauna prepend subiectul și conținutul cu \\[ erddap Url \\] , astfel încât va fi clar care ERDDAP™ asta a venit de la (în cazul administrării multiple ERDDAP s) .
    * Culegerea mai extinsă de statistici pentru [Raport zilnic](/docs/server-admin/additional-information#daily-report) E-mail.
    * Fișier jurnal nou \\[ Big ParentDirectory \\] /emailLogYEAR-MM-ZZ.txt înregistrează toate emailurile trimise de ERDDAP™ în fiecare zi. Acest lucru este deosebit de util în cazul în care serverul dvs. nu poate trimite de fapt e-mailuri - le puteți cel puțin citi în jurnal.
    *    ERDDAP™ Acum face o \\[ Big ParentDirectory \\] /cache/ ( datasetID ) director pentru fiecare set de date, deoarece pot exista o mulțime de fișiere cached.
* Nou [ RSS 2, 01](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions) furaje pentru fiecare set de date (Caută portocala. RSS Pictograme pe liste de seturi de date, formulare de acces la date și Faceți pagini web grafice) .
*    EDDGrid   .kml răspunsurile utilizează acum imagini tiliate ("superplays" -- imagini generate dinamic de quadtree) . Imaginea inițială se încarcă în GoogleEarth mult mai repede decât înainte. Rezoluția hărții crește pe măsură ce măriți, până la rezoluția completă a setului de date. Recomandă: utilizatorii ar trebui să solicite .kml pentru un moment, dar întreaga longitudine a setului de date, raza de altitudine. Din păcate, sprijinul pentru intervale de timp a fost eliminat (Sper că se va întoarce.) .
*    ERDDAP™ Acum adaugă [Expiră și antete pentru controlul cache-urilor](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) la toate fișierele solicitate din directorul /imagini. Acest lucru reduce foarte mult numărul de cereri de fișiere statice trimise la ERDDAP şi astfel accelerează cel mai mult ERDDAP™ Pagină încărcată. De asemenea, multe Java Referințe de fișier script mutat la partea de jos a paginilor lor HTML, care accelerează, de asemenea, multe ERDDAP™ Pagină încărcată. Datorită cărții "High Performance Web Sites" de Steve Souders și adăugarea ySlow la plugin-ul FireBug în FireFox.
*    ERDDAP™ a trecut de la netcdf-java 2.2.2 la netcdf-java 4.0. Printre altele, acest lucru permite EDDGrid De laNcFiles la citire HDF   .hdf , precum și GRIB.grb și NetCDF   .nc Dosare.
*    EDDGrid FromDap și EDDGrid De laNcFiles susţine acum şi DArray (precum și DGrid)   dataVariable c. Dacă o dimensiune nu are o variabilă de coordonate corespunzătoare, ERDDAP™ creează o variabilă a axei cu valorile indicelui (De exemplu, 0, 1, 2, ..., 311, 312) . Deci toate celelalte aspecte ale EDDGrid rămân la fel:
\\* Acesta servește în continuare toate seturile de date ca grinzi, cu o variabilă de axă pentru fiecare dimensiune.
\\* Interogările pot solicita în continuare valori din variabilele axei.
Mulţumită lui Charles Carleton, Thomas Im, Dorian Raymer şi altora.
* ă WMS   OpenLayers Paginile au acum o longitudine implicită, un interval de altitudine care este un pic mai mare decât gama setului de date (nu gama exactă, astfel încât contextul de seturi de date mici este mai evident) . Intervalul implicit poate fi acum de la 0 la 360, ceea ce permite afișarea acum a întregii game de seturi de date. Mulţumită Todd Spindler.
* Noi diapozitive pe unele formulare de acces la date și de a face o pagină web grafică. Ele simplifică (brut) specificațiile datelor dorite și oferă feedback vizual bun.
* O nouă opțiune pentru&lt;Set de date &gt; etichete în datasets.xml : [active="fals"](/docs/server-admin/datasets#active) .
* Referințe la ERD 's ERDDAP™ schimbat din Coastwatch.pfel (încă funcționează prin proxy) la Coastwatch.pfeg (preferat) .
* Sprijin nou pentru [ data\\_min şi data\\_max ](/docs/server-admin/datasets#data_min-and-data_max) atributele metadatelor variabile.
* O soluţie parţială [AșteptațiThenTryAgain / Rezultate parțiale excepție](/docs/server-admin/additional-information#waitthentryagain-exception) : Acum, unele cereri care anterior au eșuat atunci când a fost detectată o schimbare a sursei de date vor reuși deoarece ERDDAP™ va reîncărca setul de date și va solicita datele în mod automat, toate în contextul cererii inițiale.
* Fix Bug: genera Setări de date Xml a fost dezactivat la ERDDAP™ Versiunea 1.12. Mulţumită lui Ellyn Montgomery pentru că a subliniat asta.
* Mici schimbări în manipularea erorilor.
* Multe îmbunătățiri pentru a evita/a face cu posibile condiții de rasă (și anume posibilele probleme care decurg din natura multifilată a ERDDAP ) care a cauzat probleme mici, rare.
* Acum, dacă un mesaj de eroare este scris pe o imagine, imaginea va rămâne doar în cache pentru ~5-10 minute (nu 60) . Mulţumită Carei Wilson.
* Mesajul standard atunci când nu există date este acum "Documentul dvs. nu a produs rezultate potrivite.", care este mai scurt, mai precis, și meciuri OPeNDAP servere.
*    EDDGrid nu mai permite valori ale axei legate.
* Mici modificări la .ver și .help cereri.
* Multe mici schimbări și soluții bug.
     

## Versiunea 1.12{#version-112} 
 (lansat în 2008-10-31) 

* Tabel EDD din SOS încă o dată lucrează cu NDBC SOS şi lucrează cu noul NOS SOS .
* Tabelul EDDDe la BMDE necesită acum ERDDAP™ admin de specificat dataVariable c.
*    EDDGrid nu mai este nevoie ca lat şi lon să fie egal distanţate pentru. transparent Png sau .kml . Mulţumită Todd Spindler.
* Câteva mici schimbări.
     

## Versiunea 1.10{#version-110} 
 (lansat în 2008-10-14) 

* Metadate noi "colorBar" pentru variabilele de date în datasets.xml definește setările implicite ale barei de culori pentru grafice și hărți. Vezi? [mai multe informaţii](/docs/server-admin/datasets#color-bar-attributes) . Acest lucru este important deoarece îmbunătăţeşte foarte mult aspectul graficelor şi hărţilor implicite produse de Make A Graph şi deoarece graficele şi hărţile implicite au acum o bară de culori consistentă chiar şi atunci când clientul schimbă intervalul de timp cerut sau geografic. De asemenea, acest lucru a fost necesar pentru WMS .
*    ERDDAP™ acum servește cele mai multe date de rețea prin a WMS service. Acest lucru este important deoarece arată că, în plus față de obținerea de date de la mai multe tipuri de servere de date, ERDDAP™ poate distribui date prin diferite protocoale ( DAP , WMS , ... mai mult în viitor) . Vezi [documentația clientului](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html) . Sau [documentația administratorilor](/docs/server-admin/datasets#wms) . Sau [Încearcă.](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html) .
* Suport nou pentru valorile de longitudine &gt; 180 .kml Dosare.
* Nou cdm\\_date\\_type: Altele .
*    ERDDAP™ acum acceptă datele sursă "boolean." Vezi? [mai multe informaţii](/docs/server-admin/datasets#boolean-data) Acest lucru va deveni util pentru viitorul tabel EDDFromDatabase.
* Noile tabele EDDFromBMDE sprijină sursele de date DiGIR/BMDE.
* EDVGridAxis permite acum reducerea valorilor sortate. Seturile de date PmelOscar aveau nevoie de asta.
*    ERDDAP™ acum întoarce erorile HTTP (De exemplu, "404 pentru resurse/pagină care nu au fost găsite") în mai multe situații, în loc de pagini HTML cu mesaje de eroare.
* Multe modificări/addiții ERDDAP™ documentația.
* Multe mici schimbări.
* Nişte soluţii pentru gândaci.
*    **Lucruri ERDDAP™ administratorii ar trebui să facă upgrade la această versiune:** 
    * În datasets.xml , pentru orice tabel EDDDe la SOS Seturi de date, modificați metadatele "observateProperty" la "SourceObservedProperty."
    * Regulile pentru axisVariable sau dataVariable 's destinationName sunt acum [mai stricte](/docs/server-admin/datasets#datavariable-addattributes) . Trebuie să verificați dacă numele dumneavoastră variabile sunt valabile. Ori le verifici manual, ori fugi. ERDDAP™ și uita-te la mesajele de eroare din raport, care este trimis prin e-mail administratorului.
    * În datasets.xml , dacă doriți ca o variabilă de date de rețea să fie accesibilă prin intermediul WMS , aveți nevoie pentru a adăuga metadate colorBar. Cel puţin, de exemplu,&lt;att name=" colorBarMinimum " type="dublu [50]0&lt;/att&gt;
```
          <att name="colorBarMaximum" type="double">32</att>  
```
Vezi? [mai multe informaţii](/docs/server-admin/datasets#wms) .
    * Adaugă următoarele [setup.xml](/docs/server-admin/deploy-install#setupxml) fișier (dar personalizează-l cu informaţiile tale.) :

```
        <!-- drawLand specifies the default Make A Graph setting for 
        whether the landmask should be drawn "over" (the default) or "under" 
        surface data on maps. "over" is recommended for primarily 
        oceanographic data (so that grid data over land is obscured by the 
        landmask). "under" is recommended for all other data.
        -->
        <drawLand>over</drawLand>  
        
        <!-- Information about the ERDDAP™ administrator is used for the 
        SOS and WMS servers. You MUST CHANGE these to describe your 
        installation. 
        -->
        <adminInstitution>NOAA Environmental Research 
        Division</adminInstitution>
        <adminIndividualName>Your Name</adminIndividualName>
        <adminPosition>Webmaster</adminPosition>
        <adminPhone>your-phone-number</adminPhone>
        <adminAddress>99 Pacific St, Suite 255A</adminAddress>
        <adminCity>Monterey</adminCity>
        <adminStateOrProvince>CA</adminStateOrProvince>
        <adminPostalCode>93940</adminPostalCode>
        <adminCountry>USA</adminCountry>
        <adminEmail>yourName@yourSite</adminEmail>
        
        <!-- Information about the ERDDAP™ administrator is used for ERDDAP's
        SOS server. You MUST CHANGE these to describe your installation. 
        -->
        <sosTitle>NOAA Environmental Research Division SOS</sosTitle>
        <sosAbstract>NOAA Environmental Research Division's ERDDAP™ makes 
          data from multiple sources available via the SOS 
          protocol.</sosAbstract>
        <sosKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</sosKeywords>
        <sosAccessConstraints>NONE</sosAccessConstraints>
        <sosFees>NONE</sosFees>
        
        <!-- Information about the ERDDAP™ administrator is used for 
        ERDDAP's WMS server. You MUST CHANGE these to describe your 
        installation. -->
        <wmsTitle>NOAA Environmental Research Division 
        WMS</wmsTitle>
        <wmsAbstract>NOAA Environmental Research Division's ERDDAP™ makes
        data from multiple sources available via the WMS 
        protocol.</wmsAbstract>
        <wmsKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</wmsKeywords> 
        <wmsAccessConstraints>NONE</wmsAccessConstraints>
        <wmsFees>NONE</wmsFees>
        <!-- For the wms examples, pick one of your grid datasets that has 
        longitude and latitude axes. The sample variable must be a variable 
        in the sample grid dataset.  The bounding box values are 
        minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <wmsSampleBBox>0,-75,180,75</wmsSampleBBox>
```

## Versiunea 1.08{#version-108} 
 (lansat în 2008-07-13) 

* Un nou serviciu web în ERDDAP™ , genera Setări de date Xml, ajută ERDDAP™ Administratori prin crearea unui proiect brut al XML-ului necesar pentru a descrie un set de date în datasets.xml 
* Unele modificări/fixe de bug legate de a permite griddap să fie văzut de netcdf-java ca un server opendap, inclusiv: metadate globale este acum etichetat "NC\\_GLOBAL" (în loc de "GLOBAL") .
* ă EDDGrid și EDDTable Data Access Forms utilizează acum informații de interogare în URL. Deci, de exemplu, dacă un utilizator trece de la un formular Make A Graph la un formular de acces la date, constrângerile sunt acum transferate în mod corespunzător.
*    tabledap 's Make A Graph permite acum constrângeri asupra variabilelor String.
* EDDtable's Make A Graph permite acum constrângeri NaN. Mulţumită lui Steve Hankin.
* Fix bug: EDDTable salvează AsImage nu a recunoscut în mod corespunzător min. colorbar și valorile maxime. Mulţumită lui Steve Hankin
* Multe îmbunătățiri pentru configurareDatasetsXml. Mulţumită lui Ellyn Montgomery.
* Cererile Griddap permit acum () -stilul cere ușor în afara intervalului real al axei. Acest lucru este adecvat deoarece () - valorile sunt rotunjite la cea mai apropiată valoare reală. Mulţumită lui Cindy Bessey
* Am făcut testul FloatArray şi DoubleArray al lui EvenlySpaced mult mai sofisticat. Acesta va fi întotdeauna imperfect (pentru că testul ar trebui să fie personalizat pentru fiecare set de date) Dar ar trebui să fie mai bine. Mulţumită lui Ellyn Montgomery.
* Am mutat setup.html și setupDatasets Xml.html erddap /download director și codate hard toate link-urile la ele. Acum, pot face modificări și actualiza informațiile de configurare imediat.
* Multe mici schimbări. Câteva mici soluţii pentru gândaci.
*    **Lucruri ERDDAP™ administratorii ar trebui să facă upgrade la această versiune:** 
    * Mişcă.&lt;scurtăDescriere Html&gt; de la mesajele.xml la dvs. [setup.xml](/docs/server-admin/deploy-install#setupxml) Dosar. Se specifică textul care apare în mijlocul partea stângă a ERDDAP™ Pagina principală. De asemenea, adăugați&lt;h1&gt; ERDDAP &lt;/h1&gt; (sau un alt titlu) la partea de sus a acesteia. **Sau,** Copiază&lt;scurtDescriereHtml&gt; în noul [setup.xml](/docs/server-admin/deploy-install#setupxml) fișier (din noul ErddapContent .zip ) în setup.xml.
         

## Versiunea 1.06{#version-106} 
 (lansat în 2008-06-20) 

* Sprijin nou pentru IOOS DIF SOS surse de date.
* Multe mici schimbări. Câteva mici soluţii pentru gândaci.
     

## Versiunea 1.04{#version-104} 
 (lansat în 2008-06-10) 

* Funcţie nouă Slide Sorter.
* Pagina de Google Gadgets noi și exemple.
* Fixare bug în EDDGrid .saveAsNc pentru variabila cu scala si addoffset.
     

## Versiunea 1.02{#version-102} 
 (lansat în 2008-05-26) 

* Nou EDDGrid SideBySide permite diferite axisVariable s \\[ 0 \\] sursă Valori.
* Toate curenţii şi seturile de vânturi s-au unit în EDDGrid SideBySide settings.
* Imaginile din cererile de imagine sunt acum blocate timp de o oră.
     

## Versiunea 1.00{#version-100} 
 (lansat 2008-05-06) 

* Faceți un grafic pagini web și comenzi grafice în URL-uri.
* Suport pentru fişierele de pavilion pentru a forţa încărcarea unui set de date.
* Tip de set nou: EDDTabelFrom4DFiles (prima subclasă a tabelului EDDFromFiles) .
