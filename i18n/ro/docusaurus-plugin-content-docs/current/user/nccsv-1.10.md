---
title: "NCCSV 1.10"
---

# NCCSV -
A NetCDF -Fişier CSV compatibil ASCII,
Versiunea 1.10

Bob Simons şi Steve Hankin
"NCCSV" de Bob Simons şi Steve Hankin este licenţiat [CC cu 4.0](https://creativecommons.org/licenses/by/4.0/) 

##  [Introducere](#introduction)  {#introduction} 

Acest document precizează un format de fișier text ASCII CSV care poate conține toate informațiile (metadate și date) care pot fi găsite în NetCDF   .nc fișier care conține un tabel de date asemănător cu fișierul CSV. Extensia fișierului pentru un fișier text ASCII CSV care urmează acestei specificații trebuie să fie .csv, astfel încât să poată fi citită cu ușurință și corect în programe de foi de calcul precum Excel și Google Sheets. Bob Simons va scrie software-ul pentru a converti un fișier NCCSV într-o NetCDF - 3 (şi poate şi un NetCDF - 4)   .nc fișier, și invers, cu nici o pierdere de informații. Bob Simons a modificat [ ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) pentru a sprijini citirea și scrierea acestui tip de fișier.

Formatul NCCSV este conceput astfel încât software-ul foii de calcul precum Excel și Google Sheets să poată importa un fișier NCCSV ca fișier CSV, cu toate informațiile din celulele foii de calcul gata de editare. Sau, o foaie de calcul poate fi creată de la zero în urma convențiilor NCCSV. Indiferent de sursa foii de calcul, în cazul în care este apoi exportat ca un fișier .csv, se va conforma cu specificațiile NCCSV și nu vor fi pierdute informații. Singurele diferențe între fișierele NCCSV și fișierele similare foii de calcul care urmează acestor convenții sunt:

* Fișierele NCCSV au valori pe o linie separată de virgule.
Foile de calcul au valori pe o linie în celulele adiacente.
* Stringurile din fișierele NCCSV sunt adesea înconjurate de citate duble.
Stringurile din foile de calcul nu sunt niciodată înconjurate de citate duble.
* Citate duble interne (") în Strings în fișiere NCCSV apar ca 2 citate duble.
Intern dublu cotații în foi de calcul apar ca 1 citat dublu.

Vezi [Fișă de calcul](#spreadsheets) secțiunea de mai jos pentru mai multe informații.

### Streamable{#streamable} 
Precum fişierele CSV în general, fişierele NCCSV pot fi transmise. Astfel, în cazul în care un NCSV este generat on-the-fly de un server de date, cum ar fi [ ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) , serverul poate începe să transmită date către solicitant înainte de colectarea tuturor datelor. Aceasta este o caracteristică utilă și de dorit. NetCDF În schimb, dosarele nu pot fi transmise.

###  ERDDAP™  {#erddap} 
Această specificație este concepută astfel încât fișierele NCCSV și .nc fișiere care pot fi create din ele pot fi folosite de către o [ ERDDAP™ server de date](https://coastwatch.pfeg.noaa.gov/erddap/index.html)   (prin intermediul [Tabel EDD de la NCCSvFiles](/docs/server-admin/datasets#eddtablefromnccsvfiles) şi [Tabel EDDFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles) Tipuri de seturi de date) , dar această specificație este externă ERDDAP . ERDDAP™ are mai multe atribute globale necesare și multe atribute globale și variabile recomandate, în principal bazate pe atributele CF și ACDD (a se vedea
 [/docs/server-admin/datesets#global-attributes](/docs/server-admin/datasets#global-attributes) ).

### Sold{#balance} 
Concepția formatului NCCSV este un echilibru de mai multe cerințe:

* Fișierele trebuie să conțină toate datele și metadatele care ar fi într-un tabel NetCDF fișier, inclusiv tipuri specifice de date.
* Fișierele trebuie să poată fi citite și apoi scrise dintr-o foaie de calcul fără pierderi de informații.
* Fişierele trebuie să fie uşor de creat, editat, citit şi înţeles.
* Fişierele trebuie să fie protejate fără echivoc de programe de calculator.

Dacă o cerinţă din acest document pare ciudată sau pretenţioasă, este probabil necesară îndeplinirea uneia dintre aceste cerinţe.

### Alte specificații{#other-specifications} 
Această specificație se referă la mai multe alte specificații și biblioteci cu care este concepută pentru a lucra, dar această specificație nu face parte din oricare dintre aceste alte specificații și nici nu are nevoie de modificări ale acestora și nici nu intră în conflict cu acestea. Dacă nu se specifică aici un detaliu legat de unul dintre aceste standarde, a se vedea specificațiile aferente. În special, aceasta include:

* Convenţia de atribuire a datelor (ACDD) standard de metadate:
     [https://wiki.esipfed.org/Attribute\\_Convention\\_for\\_Data\\_Discovery\\_1-3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) .
* Clima şi prognoza (CF) standard de metadate:
     [https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) .
* ă NetCDF Ghid utilizator (NUG) :
     [https:///docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html) .
* ă NetCDF biblioteci software ca NetCDF - Java şi NetCDF -c:
     [https://www.unidata.ucar.edu/software/netcdf/](https://www.unidata.ucar.edu/software/netcdf/) . Aceste biblioteci nu pot citi fișiere NCCSV, dar pot citi .nc fișiere create din fișiere NCCSV.
* JSON: [https://www.json.org/](https://www.json.org/) 

### Număr{#notation} 
În prezenta specificație, paranteze, \\[   \\] , indică elemente opționale.

##  [Structura fișierului](#file-structure)  {#file-structure} 

Un fișier complet NCCSV constă din două secțiuni: secțiunea metadate, urmată de secțiunea de date.

Fișierele NCCSV trebuie să conțină doar caractere ASCII de 7 biți. Din acest motiv, setul de caractere sau codificarea utilizate pentru a scrie și citi fișierul poate fi orice set de caractere sau codare care este compatibil cu setul de caractere ASCII de 7 biți, de exemplu ISO-8859-1. ERDDAP™ citeste si scrie fisiere NCCSV cu setul ISO-8859-1.

Fișierele NCCSV pot utiliza oricare linie nouă ( \\n )   (care este comună pe Linux și Mac OS X calculatoare) sau transportReturn plus linie nouă ( \\r\\n )   (care este comună pe computerele Windows) ca markeri de final de linie, dar nu ambele.

###  .nccsv Metadate{#nccsvmetadata} 
Atunci când atât creatorul cât și cititorul îl așteaptă, este, de asemenea, posibil și uneori util să se facă o variantă a unui fișier NCCSV care conține doar secțiunea metadate (inclusiv\\*SFÂRŞIT\\*linie) . Rezultatul oferă o descriere completă a atributelor fișierului, a numelor variabile și a tipurilor de date, servind astfel același scop ca și răspunsurile .das plus .dds de la o OPeNDAP server. ERDDAP™ va returna această variație dacă solicitați fișierul Tip = .nccsv Metadate de la o ERDDAP™ Set de date.

##  [Secțiunea Metadate](#the-metadata-section)  {#the-metadata-section} 

Într-un fișier NCCSV, fiecare linie a secțiunii metadate utilizează formatul
 [variabilă Nume](#variablename) , [atribut Nume](#attributename) , [valoare1](#value)  \\[ ,valoare2 \\]  \\[ ,valoare3 \\]  \\[ ,valoare4 \\]  \\[ ... \\]   
Spațiile înainte sau după elemente nu sunt permise pentru că acestea cauzează probleme atunci când importa fișierul în programele foii de calcul.

### Convenții{#conventions} 
Prima linie a unui fișier NCCSV este prima linie a secțiunii metadate și trebuie să aibă o [\\*GLOBAL\\*](#global) Convențiile atribuie listarea tuturor convențiilor utilizate în dosar ca string care conține o listă CSV, de exemplu:
\\*GLOBAL\\*, Conventions," COARDS , CF-1.6, ACDD-1.3, NCCSV-1.1"
Una dintre convențiile enumerate trebuie să fie NCCSV-1.1 care se referă la versiunea actuală a prezentei specificații.

### END_METADATA{#end_metadata} 
Sfârșitul secțiunii de metadate a unui fișier NCCSV trebuie să fie indicat printr-o linie numai cu
\\*SFÂRŞIT\\*

Se recomandă, dar nu este necesar ca toate atributele pentru o anumită variabilă să apară pe liniile adiacente ale secțiunii metadate. Dacă un fișier NCCSV este convertit în NetCDF fișier, ordinea că numele variabile apar mai întâi în secțiunea metadate va fi ordinea variabilelor în NetCDF Dosar.

Liniile opţionale goale sunt permise în secţiunea metadate după prima linie cu [\\*GLOBAL\\*](#global)   [Convenții](#conventions) informații (vezi mai jos) și înainte de ultima linie necesară cu\\*SFÂRŞIT\\*.

În cazul în care o foaie de calcul este creată dintr-un fișier NCCSV, secțiunea de date privind metadatele va apărea cu denumiri variabile în coloana A, denumirile atributelor din coloana B și valorile din coloana C.

În cazul în care o foaie de calcul care urmează acestor convenții este salvată ca fișier CSV, vor exista adesea comunicații suplimentare la sfârșitul liniilor în secțiunea metadate. Software-ul care convertește fișiere NCCSV în .nc Dosarele vor ignora virgule suplimentare.

###  [variabilă Nume](#variablename)  {#variablename} 

 *variabilă Nume* este denumirea sensibilă la caz a unei variabile din fișierul de date. Toate denumirile variabile trebuie să înceapă cu o literă ASCII de 7 biți sau cu o subliniere și să fie compuse din litere ASCII de 7 biți, accente și cifre ASCII de 7 biți.
#### GLOBAL{#global} 
Variabila specială Denumire [\\*GLOBAL\\*](#global) este utilizat pentru a desemna metadate globale.

###  [atribut Nume](#attributename)  {#attributename} 

 *atribut Nume* este denumirea sensibilă la caz a unui atribut asociat unei variabile sau [\\*GLOBAL\\*](#global) . Toate denumirile atributelor trebuie să înceapă cu o literă ASCII de 7 biți sau să fie evidențiate și compuse din litere ASCII de 7 biți, accente și cifre ASCII de 7 biți.

#### SCALAR{#scalar} 
Atributul special Nume\\*SCALAR\\*poate fi folosit pentru a crea o variabilă de date scalare și pentru a defini valoarea acesteia. Tipul de date al\\*SCALAR\\*definește tipul de date pentru variabilă, astfel încât să nu se specifice a\\*DATE\\_TYPE\\*atribut pentru variabile scalare. Rețineți că nu trebuie să existe date pentru variabila scalară din secțiunea de date a fișierului NCCSV.

De exemplu, pentru a crea o variabilă scalară numită "navă" cu valoarea "Okeanos Explorer" și un atribut cf\\_rol, utilizați:
nava;\\*SCALAR\\*"Okeanos Explorer"
nava,cf\\_rol,traiectorie\\_id
Atunci când o variabilă de date scalare este citită în ERDDAP™ , valoarea scalară este convertită într-o coloană din tabelul de date cu aceeași valoare pe fiecare rând.

###  [valoare](#value)  {#value} 

 *valoare* este valoarea atributului metadatelor și trebuie să fie un array cu unul sau mai multe fie un octet, ubit, scurt, scurt, scurt, int, uint, lung, lung, float, dublu, String, sau Char. Nu sunt sprijinite alte tipuri de date. Atributele fără valoare vor fi ignorate. În cazul în care există mai mult de o subvaloare, subvalorile trebuie să fie toate de același tip de date și separate prin virgulă, de exemplu:
 sst , actual\\_range ,0.17f,23.58f
Dacă există valori ale stringurilor multiple, utilizaţi un singur String cu \\n   (linie nouă) Personaje care separă corzile.

Definițiile tipurilor de date privind atributele sunt:

#### octet{#byte} 
* valori atribute bite (8 biți, semnat) trebuie să fie scris cu sufixul "b," de exemplu -7b, 0b, 7b. Gama de valori octet valabile este -128 la 127. Un număr care arată ca un octet dar este invalid (de exemplu, 128b) va fi convertită la o valoare lipsă sau va genera un mesaj de eroare.
    
#### ubyte{#ubyte} 
* valori atribute ubyte (8 biți, nesemnat) trebuie să fie scris cu sufixul "ub," de exemplu, 0ub, 7ub, 250ub. Gama de valori valide ale octeților este cuprinsă între 0 și 255. Un număr care arată ca un ubyte dar este invalid (De exemplu, 256ub) va fi convertită la o valoare lipsă sau va genera un mesaj de eroare. Când este posibil, utilizați octet în loc de ubyte, pentru că multe sisteme nu suportă octeți nesemnate (de exemplu atribute în NetCDF -3 fișiere) .
    
#### scurt{#short} 
* valori ale atributelor scurte (16 biți, semnat) trebuie să fie scrise cu sufixul 's', de exemplu -30000, 0s, 30000. Gama de valori scurte valabile este -32768 -32767. Un număr care arată ca un scurt, dar este invalid (de exemplu, 32768s) va fi convertită la o valoare lipsă sau va genera un mesaj de eroare.
     
#### scurt{#ushort} 
* valori ale atributelor scurte (16 biți, nesemnat) trebuie să fie scris cu sufixul "noi," de exemplu 0us, 30000us, 60000us. Gama de valori scurte valabile este de 0 până la 65535. Un număr care arată ca un scurt, dar este invalid (de exemplu, 65536us) va fi convertită la o valoare lipsă sau va genera un mesaj de eroare. Când este posibil, utilizați scurt în loc de scurt, deoarece multe sisteme nu suportă octeți nesemnate (de exemplu atribute în NetCDF -3 fișiere) .
     
#### int{#int} 
* valorile atributelor int (32 biți, semnat) trebuie să fie scrise sub formă de int JSON fără punct zecimal sau exponent, dar cu sufixul "i," de exemplu -12067978i, 0i, 12067978i. Intervalul valorilor int valabile este -2147483648 -2147483647. Un numar care arata ca un int dar este invalid (De exemplu, 2147483648i) va fi convertită la o valoare lipsă sau va genera un mesaj de eroare.
     
#### uint{#uint} 
* valori atribute uint (32 biți, nesemnat) trebuie să fie scrise sub formă de int JSON fără punct zecimal sau exponent, dar cu sufixul "ui," de exemplu, 0ui, 12067978ui, 41234456789ui. Gama valorilor int valabile este de la 0 la 4294967295. Un număr care arată ca un uint dar este invalid (de exemplu, 2147483648ui) va fi convertită la o valoare lipsă sau va genera un mesaj de eroare. Când este posibil, utilizați int în loc de uint, pentru că multe sisteme nu suportă octeți nesemnate (de exemplu atribute în NetCDF -3 fișiere) .
     
#### lung{#long} 
* valori ale atributelor lungi (64 de biți, semnat, susținut în prezent de NUG și ERDDAP™ dar nu încă sprijinit de CF) trebuie să fie scris fără punct zecimal și cu sufixul "L," de exemplu -12345678987654321L, 0L, 12345678987654321L. Dacă utilizați software-ul de conversie pentru a converti un fișier NCCSV cu valori lungi în a NetCDF -3 fişier, orice valoare lungă va fi convertită în valori duble. Gama de valori lungi valabile este -9223372036854775808 până la 9223372036854775807. Un număr care arată ca un lung, dar este invalid (de exemplu, 9223372036854775808L) va fi convertită la o valoare lipsă sau va genera un mesaj de eroare. Când este posibil, utilizaţi dublu în loc de lung, deoarece multe sisteme nu suport mult timp (de exemplu, NetCDF -3 fișiere) .
     
#### ulong{#ulong} 
* valori ale atributelor lungi (64 de biți, nesemnată, susținută în prezent de GNU și ERDDAP™ dar nu încă sprijinit de CF) trebuie să fie scrise fără punct zecimal și cu sufixul "uL," de exemplu, 0uL, 12345678987654321uL, 9007199254740992uL. Dacă utilizați software-ul de conversie pentru a converti un fișier NCCSV cu valori lungi în a NetCDF -3 fişier, orice valoare lungă va fi convertită în valori duble. Gama de valori lungi valabile este cuprinsă între 0 şi 184467440737095511615. Un număr care arată ca un lung, dar este invalid (de exemplu, 18446744407370955116uL) va fi convertită la o valoare lipsă sau va genera un mesaj de eroare. Când este posibil, utilizați dublu în loc de lung, pentru că multe sisteme nu suport semnat sau nesemnat mult timp (de exemplu, NetCDF -3 fișiere) .
     
#### float{#float} 
* Valorile atributelor float (32 biți) trebuie să fie scris cu sufixul "f" și poate avea un punct zecimal și/sau un exponent, de exemplu, 0f, 1f, 12,34f, 1e12f, 1,23e+12f, 1,23e12f, 1,87E-7f. Utilizați NaNf pentru o naN plutitoare (lipsă) valoare. Gama de flotoare este de aproximativ +/-3.40282347E+38f (~7 cifre zecimale semnificative) . Un număr care arată ca un float dar este invalid (de exemplu, 1,0e39f) va fi convertită la o valoare lipsă sau va genera un mesaj de eroare.
     
#### dublu{#double} 
* Valorile atributelor duble (64 biți) trebuie să fie scris cu sufixul "d" și poate avea un punct zecimal și/sau un exponent, de exemplu, 0d, 1d, 12,34d, 1e12d, 1,23e+12d, 1,23e12d, 1,87E-7d. Utilizaţi NaNd pentru un NaN dublu (lipsă) valoare. Gama de duble este de aproximativ +/-1.79769313486231570E+308d (~15 cifre zecimale semnificative) . Un număr care arată ca un dublu, dar este invalid (de exemplu, 1,0e309d) va fi convertită la o valoare lipsă sau va genera un mesaj de eroare.
     
#### String{#string} 
* Valorile atributelor string sunt o secvență de caractere UCS-2 (și anume, caractere unicode de 2 octeți, ca în Java ) , care trebuie să fie scrise ca 7-bit ASCII, JSON-ca siruri de caractere, astfel încât să poată fi specificate caractere non-ASCII.
    * Citate duble (") trebuie codificate ca două citate duble (") . Aceasta este ceea ce programele foii de calcul necesită atunci când citiți fișiere .csv. Aceasta este ceea ce programe de foi de calcul scrie atunci când salvați o foaie de calcul ca un fișier .csv.
    * Personajele speciale JSON trebuie codificate ca în JSON (în special \\n (Newline), dar, de asemenea, \\\\ (backslash), \\f (formfeed), \\t (tab), \\r (retur de transport) sau cu [\\u *hhhh* ](#uhhhh) Sintaxă. Într-o foaie de calcul, nu utilizați Alt Enter pentru a specifica o nouă linie într-o celulă de text; în schimb, utilizați \\n   (2 caractere: backslash and 'n ') pentru a indica o nouă linie.
#####  uhhhh  {#uhhhh} 
    * \\u *hhhh - Toate personajele mai puțin decât caracterul #32 sau mai mare decât caracterul #126, și nu altfel codificate, trebuie să fie codificate cu sintaxa \\ \\u* hhhh*, unde hhhh este numărul hexazecimal de 4 cifre al personajului, de exemplu, semnul Euro este \\ \\u20AC. A se vedea paginile de cod menționate la [https://en.wikipedia.org/wiki/Unicode](https://en.wikipedia.org/wiki/Unicode) să găsească numerele hexazecimale asociate cu caractere specifice Unicode sau să folosească o bibliotecă de software.
    * În cazul în care String are un spațiu la început sau la sfârșit, sau include " (citat dublu) sau o virgulă sau conține valori care altfel ar fi interpretate ca alte tipuri de date (de exemplu, un int) , sau este cuvântul "null," întregul String trebuie să fie inclus în ghilimele duble; altfel, spre deosebire de JSON, ghilimelele duble incluse sunt opționale. Vă recomandăm: atunci când sunteți în îndoială, anexați întregul String în ghilimele duble. Spaţiile de la începutul sau sfârşitul unei coarde sunt puternic descurajate.
    * Pentru moment, utilizarea caracterelor mai mari decât #255 este descurajată. NCCSV le sprijină. ERDDAP™ îi sprijină intern. Unele tipuri de fișiere de ieșire le susțin (de exemplu, .json şi .nccsv ) . Dar multe tipuri de fișiere de ieșire nu le susțin. De exemplu, NetCDF -3 fişiere nu suportă astfel de caractere deoarece NetCDF fişierele folosesc caractere de 1 octet şi CF în prezent nu are un sistem pentru a specifica modul în care caracterele Unicode sunt codificate în NetCDF Coarde (De exemplu, UTF-8) . Acest lucru se va îmbunătăţi probabil în timp.
         
#### char{#char} 
* Valorile atributelor char sunt un singur caracter UCS-2 (și anume, caractere unicode de 2 octeți, ca în Java ) , care trebuie să fie scrise ca 7-bit ASCII, JSON-ca caractere, astfel încât alte caractere pot fi specificate (vezi definiția String de mai sus pentru codificarea caracterelor speciale, cu adăugarea codării unui singur citat ca \\ ') . Valorile atributelor Char trebuie incluse în ghilimele unice (citatele interioare) și citate duble (citatele exterioare) , de exemplu, "'a'," "'"""" (un caracter dublu) , "'\\'" (un singur caracter citat) , "'\\t'" (o filă) , "'\\u20AC'" (un caracter Euro) . Acest sistem de utilizare a ghilimelelor simple și duble este ciudat și greoaie, dar este o modalitate de a distinge valorile Char de Strings într-un mod care funcționează cu foile de calcul. O valoare care arata ca un char, dar este invalid va genera un mesaj de eroare. Ca și în cazul Strings, utilizarea caracterelor mai mari decât #255 este în prezent descurajată.

### Sufix{#suffix} 
Notă: în secțiunea atribute a unui fișier NCCSV, toate valorile atributelor numerice trebuie să aibă o literă sufixă (de exemplu, "b") identificarea tipului de date numerice (de exemplu, octet) . Dar în secțiunea de date a unui fișier NCCSV, valorile datelor numerice nu trebuie să aibă niciodată aceste litere sufixe (cu excepția "L" pentru numere întregi lungi și "ul" pentru numere întregi lungi) Tipul de date este specificat de\\*DATE\\_TYPE\\*atributul variabilei.

### Date_TIP{#data_type} 
Tipul de date pentru fiecare non- [scalar](#scalar) variabila trebuie să fie specificată de un\\*DATE\\_TYPE\\*atribut care poate avea o valoare de octet, ubyte, scurt, ushort, int, uint, lung, lung, lung, float, dublu, String, sau char (insensibil la caz) . De exemplu,
qc\\_flag,\\*DATE\\_TYPE\\*,byte
ATENŢIONARE: Specificarea corectă\\*DATE\\_TYPE\\*este responsabilitatea ta. Specificarea tipului de date greșit (de exemplu, atunci când ar fi trebuit să specificați float) nu va genera un mesaj de eroare și poate determina pierderea informațiilor (De exemplu, valorile float vor fi rotunjite la int) atunci când fișierul NCCSV este citit de ERDDAP™ sau transformat într-o NetCDF Dosar.

### Char Descurajat{#char-discouraged} 
Utilizarea valorilor datelor char este descurajată deoarece acestea nu sunt susținute pe scară largă în alte tipuri de fișiere. Valorile char pot fi scrise în secțiunea de date ca caractere unice sau ca strings (în special, dacă aveți nevoie pentru a scrie un caracter special) . În cazul în care un String este găsit, primul caracter al String va fi folosit ca valoare Char. Lungime zero Strings și valorile lipsă vor fi convertite în caracter \\ \\uFFFF. Notă: NetCDF fișiere numai suport o singură chars byte, astfel încât orice Chars mai mare decât char #255 va fi convertit la "?," atunci când scrie NetCDF Dosare. Cu excepția cazului în care se utilizează un atribut charset pentru a specifica un set de caractere diferit pentru o variabilă char, se va utiliza setul de caractere ISO-8859-1.

### Lung şi nesemnat{#long-and-unsigned-discouraged} 
Deși multe tipuri de fișiere (de exemplu, NetCDF - 4 şi Json.) şi ERDDAP™ suport lung și nesemnat (ubyte, ushort, uint, ulong) valorile, utilizarea valorilor lungi și nesemnate în fișierele NCCSV sunt în prezent descurajate, deoarece acestea nu sunt în prezent susținute de Excel, CF și NetCDF - 3 dosare. Dacă doriți să specificați valori lungi sau nesemnate într-un fișier NCCSV (sau în foaia de calcul Excel corespunzătoare) , trebuie să utilizați sufixul "L" astfel încât Excel să nu trateze numerele ca numere de puncte plutitoare cu precizie mai mică. În prezent, în cazul în care un fișier NCCSV este transformat în NetCDF - 3 .nc valorile de date de lung şi lung vor fi convertite în valori duble, cauzând o pierdere de precizie pentru valori foarte mari (mai mică de -2^53 pentru mult timp sau mai mare de 2^53 pentru mult timp și lung) . În NetCDF - 3 .nc fișierele, ubyte, ushort, și variabile uint apar ca byte, scurt, și int cu atributul \\_Unsigned=real metadate. În NetCDF - 3 .nc fișiere, ubyte, ushort, și atribute uint apar ca octet, scurt, și atribute int care conțin valoarea corespunzătoare două-complement (De exemplu, 255ub apare ca -1b) . Acest lucru este în mod evident o problemă, astfel încât tipurile de date semnate ar trebui utilizate în loc de tipuri de date nesemnate ori de câte ori este posibil.

### CF, ACDD și ERDDAP™ Metadate{#cf-acdd-and-erddap-metadata} 
Deoarece se prevede că cele mai multe fișiere NCCSV, sau .nc fișiere create din ele, vor fi citite în ERDDAP , se recomandă cu fermitate ca fișierele NCCSV să includă atributele metadatelor care sunt necesare sau recomandate de ERDDAP™ (vezi
 [/docs/server-admin/datesets#global-attributes](/docs/server-admin/datasets#global-attributes) ). Atribuțiile sunt aproape toate din standardele de metadate CF și ACDD și servesc la descrierea corectă a setului de date. (Cine, ce, când, unde, de ce, cum) cuiva care altfel nu ştie nimic despre set. De o importanță deosebită, aproape toate variabilele numerice ar trebui să aibă un atribut de unități cu un UDUNITS -valoare compatibilă, de exemplu,
 sst , Unităţi,grad\\_C

Este bine să se includă atribute suplimentare care nu sunt din standardele CF sau ACDD sau din ERDDAP .

##  [Secțiunea pentru date](#the-data-section)  {#the-data-section} 

###  [Structura](#structure)  {#structure} 

Prima linie a secțiunii de date trebuie să aibă o listă de nume variabile sensibile la caz, separate de virgulă. Toate variabilele din această listă trebuie descrise în secțiunea metadate și invers (altele decât [\\*GLOBAL\\*](#global) atribute și [\\*SCALAR\\*](#scalar) variabile) .

Al doilea prin penultima linie a secţiunii de date trebuie să aibă o listă de valori separată de virgulă. Fiecare rând de date trebuie să aibă același număr de valori ca și lista separată de denumiri variabile. Spațiile înainte sau după valori nu sunt permise deoarece acestea cauzează probleme atunci când importa fișierul în programele foii de calcul. Fiecare coloană din această secțiune trebuie să conțină numai valorile\\*DATE\\_TYPE\\*specificată pentru variabila respectivă de către\\*DATE\\_TYPE\\*atribut pentru acea variabilă. Spre deosebire de secțiunea atribute, valorile numerice din secțiunea de date nu trebuie să aibă litere sufixe pentru a desemna tipul de date. Spre deosebire de secțiunea atribute, valorile char din secțiunea de date pot omite cotațiile unice aferente dacă acestea nu sunt necesare pentru dezamagire (Prin urmare, "" și "\\"" trebuie citate astfel cum se arată aici) . Poate exista orice număr de aceste rânduri de date într-un fișier NCCSV, dar în prezent ERDDAP™ poate citi doar fișiere NCCSV cu până la aproximativ 2 miliarde de rânduri. În general, se recomandă să împărțiți seturi mari de date în mai multe fișiere de date NCCSV cu mai puțin de 1 milion de rânduri fiecare.

#### END_DATA{#end_data} 
Sfârşitul secţiunii de date trebuie indicat printr-o linie numai cu
\\*SFÂRŞIT\\*

Dacă există conținut suplimentar în fișierul NCCSV după\\*SFÂRŞIT\\*linie, acesta va fi ignorat atunci când fișierul NCCSV este convertit într-o .nc Dosar. Prin urmare, acest conţinut este descurajat.

Într-o foaie de calcul care urmează acestor convenții, denumirile variabile și valorile datelor vor fi în mai multe coloane. A se vedea exemplul de mai jos.

###  [Valori lipsă](#missing-values)  {#missing-values} 

Valorile lipsă numerice pot fi scrise ca valoare numerică identificată de o missing\\_value sau atribut \\_FillValue pentru acea variabilă. De exemplu, a se vedea a doua valoare a acestui rând de date:
Bell M. Shimada,99,123.4
Acesta este modul recomandat de a trata valorile lipsă pentru variabilele octet, ubit, scurt, scurt, int, int, uint, lung și lung.

valorile variabile sau duble ale NaN pot fi scrise ca NaN. De exemplu, a se vedea a doua valoare a acestui rând de date:
Bell M. Shimada, NaN,123.4

Valorile lipsă ale stringurilor și numerice pot fi indicate de un câmp gol. De exemplu, a se vedea a doua valoare a acestui rând de date:
Bell M. Shimada, 123.4

Pentru variabilele octet, ubyte, scurt, scurt, scurt, int, uint, lung și lung, utilitatea convertorului NCCSV și ERDDAP™ va converti un câmp gol în valoarea maximă permisă pentru acel tip de date (De exemplu, 127 pentru octeți) . Dacă faceți acest lucru, asigurați-vă că pentru a adăuga un missing\\_value sau atributul \\_FillValue pentru acea variabilă pentru identificarea acestei valori, de exemplu,
 *variabilă Nume* ,\\_FillValue,127b
Pentru variabilele float și dublu, un câmp gol va fi convertit la NaN.

###  [Valori de dată](#datetime-values)  {#datetime-values} 

Valori dateTime (inclusiv valorile de dată care nu au o componentă de timp) pot fi reprezentate ca numere sau ca strings în fișiere NCCSV. O variabilă datăTime poate avea numai valori String sau numai valori numerice, nu ambele. Software-ul NCCSV va converti valorile String dateTime în dată numerică Valori ale timpului la crearea .nc fișiere (conform cerințelor CF) . Valorile String dateTime au avantajul de a fi ușor de citit de către oameni.

Valorile DataTime reprezentate ca valori numerice trebuie să aibă un atribut de unități care specifică " *unități* din *data Timp* " conform cerințelor CF și specificate de UDUNITS , de exemplu,
timp, unităţi, secunde din 1970-01-01T00:00:00Z

Valorile dateTime reprezentate ca valori String trebuie să aibă o coardă\\*DATE\\_TYPE\\*atribut și atribut de unități care specifică o dată Tipul de timp specificat de către Java DataTimeFormatery class
 ( [https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) ) . De exemplu,
timp, unități; yyyy-MM-dd 'T'HH:mm:ssZ
Toate valorile dateTime pentru o anumită variabilă de date trebuie să utilizeze același format.
În majoritatea cazurilor, modelul dataTime de care aveți nevoie pentru atributul unități va fi o variație a unuia dintre aceste formate:

*    yyyy-MM-dd 'T'HH:mm:ss.  (E) data Format de timp. S-ar putea să fie nevoie de o versiune scurtată a acestui lucru, de exemplu, yyyy-MM-dd 'T'HH:mm:ssZ (singurul format recomandat) sau yyyy-MM-dd . Dacă schimbi formatul valorilor dateTime, NCCSV recomandă cu fermitate schimbarea în acest format (Poate scurtat.) . Acesta este formatul care ERDDAP™ va utiliza atunci când scrie fișiere NCCSV.
* YYammddHHmmss.SSS  Format de timp. Este posibil să aveți nevoie de o versiune scurtată a acesteia, de exemplu, aaaammdd.
* M/d/aaaa H:mm:ss. Ce se ocupă de date și date în stil american, cum ar fi "3/23/2017 16:22:03.000." S-ar putea să fie nevoie de o versiune scurtată a acestui lucru, de exemplu, M/d/aaaa.
* aaaaddDHHmmssSS  (De exemplu, 001 = 1 ianuarie 365 = 31 decembrie într-un an neleap; acest lucru este uneori numit în mod eronat data Julian) . Este posibil să aveți nevoie de o versiune scurtată a acestui lucru, de exemplu, aaaaDD.

#### Precizie{#precision} 
Când o bibliotecă de software convertește o .nc fișier într-un fișier NCCSV, toată data Valorile timpului vor fi scrise ca stringuri cu ISO 8601:2004 (E) data Format orar, de exemplu 1970-01-01T00:00:00Z . Puteți controla precizia cu ERDDAP - atribut specific time\\_precision . Vezi?
 [/docs/server-admin/sets# time\\_precision ](/docs/server-admin/datasets#time_precision) .

#### Zona temporală{#time-zone} 
Perioada de timp implicită pentru dată Valorile timpului este Zulu   (sau GMT) fusul orar, care nu are perioade de timp de vară. Dacă o variabilă dataTime are valori dataTime dintr-un fus orar diferit, trebuie să specificaţi acest lucru cu ERDDAP - atribut specific time\\_zone . Aceasta este o cerință pentru ERDDAP™ (vezi
 [/docs/server-admin/sets# time\\_zone ](/docs/server-admin/datasets#time_zone) ).

###  [Valori de grad](#degree-values)  {#degree-values} 

Conform cerințelor CF, toate valorile gradelor (De exemplu, pentru longitudine și latitudine) trebuie să fie specificate ca valori duble de gradul zecimal, nu ca un gradomin'sec" String sau ca variabile separate pentru grade, minute, secunde. Designatoarele de direcție N, S, E și W nu sunt permise. Utilizaţi valori negative pentru longitudinea vestică şi pentru latitudinea sudică.

##  [DSG Tipuri de caracteristici](#dsg-feature-types)  {#dsg-feature-types} 

Un fișier NCCSV poate conține Geometria de eșantionare a discretelor CF
 ( [https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) ) date. Este atributele care fac acest lucru:

1. În conformitate cu cerințele CF, fișierul NCCSV trebuie să includă o linie în secțiunea metadate care identifică [\\*GLOBAL\\*](#global)   featureType atribut, de exemplu,
    \\*GLOBAL\\*, featureType ,traiectorie
2. A se utiliza în ERDDAP™ , fișierul NCCSV trebuie să includă o linie sau linii în secțiunea metadate care identifică cf\\_rolul=...\\_id variabile, de exemplu,
nava,cf\\_rol,traiectorie\\_id
Acest lucru este opțional pentru CF, dar este necesar în NCCSV.
3. A se utiliza în ERDDAP™ , fișierul NCCSV trebuie să includă o linie sau linii în secțiunea metadate care să identifice variabilele asociate cu fiecare serie de timp, traiectorie sau profil, conform cerințelor ERDDAP™ (vezi
     [/docs/server-admin/datasets#cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type) ), de exemplu,
    \\*GLOBAL\\*,cdm\\_traiectorie\\_variabile,"navă"
sau
    \\*GLOBAL\\*,cdm\\_timeseries\\_variables,"station\\_id,lat,lon"

##  [Fișier eșantion](#sample-file)  {#sample-file} 

Aici este un fișier eșantion care demonstrează multe dintre caracteristicile unui fișier NCCSV:
```
\\*GLOBAL\\*,Conventions,"COARDS, CF-1.6, ACDD-1.3, NCCSV-1.1"
\\*GLOBAL\\*,cdm\\_trajectory\\_variables,"ship"
\\*GLOBAL\\*,creator\\_email,erd.data@noaa.gov
\\*GLOBAL\\*,creator\\_name,Bob Simons
\\*GLOBAL\\*,creator\\_type,person
\\*GLOBAL\\*,creator\\_url,https://www.pfeg.noaa.gov
\\*GLOBAL\\*,featureType,trajectory
\\*GLOBAL\\*,infoUrl,https://erddap.github.io/docs/user/nccsv-1.10
\\*GLOBAL\\*,institution,"NOAA NMFS SWFSC ERD, NOAA PMEL"
\\*GLOBAL\\*,license,"""NCCSV Demonstration"" by Bob Simons and Steve Hankin is
    licensed under CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ ."
\\*GLOBAL\\*,keywords,"NOAA, sea, ship, sst, surface, temperature, trajectory"
\\*GLOBAL\\*,standard\\_name\\_vocabulary,CF Standard Name Table v55
\\*GLOBAL\\*,subsetVariables,"ship"
\\*GLOBAL\\*,summary,"This is a paragraph or two describing the dataset."
\\*GLOBAL\\*,title,"NCCSV Demonstration"
ship,\\*DATA\\_TYPE\\*,String
ship,cf\\_role,trajectory\\_id
time,\\*DATA\\_TYPE\\*,String
time,standard\\_name,time
time,units,"yyyy-MM-dd'T'HH:mm:ssZ"
lat,\\*DATA\\_TYPE\\*,double
lat,units,degrees\\_north
lon,\\*DATA\\_TYPE\\*,double
"lon","units","degrees\\_east"
status,\\*DATA\\_TYPE\\*,char
status,comment,"From http://some.url.gov/someProjectDocument , Table C"
testByte,\\*DATA\\_TYPE\\*,byte
testByte,units,1
testUByte,\\*DATA\\_TYPE\\*,ubyte
testUByte,units,1
testLong,\\*DATA\\_TYPE\\*,long
testLong,units,1
testULong,\\*DATA\\_TYPE\\*,ulong
testULong,units,1
sst,\\*DATA\\_TYPE\\*,float
sst,standard\\_name,sea\\_surface\\_temperature
sst,actual\\_range,0.17f,23.58f
sst,units,degree\\_C
sst,missing\\_value,99f
sst,testBytes,-128b,0b,127b
sst,testShorts,-32768s,0s,32767s
sst,testInts,-2147483648i,0i,2147483647i
sst,testLongs,-9223372036854775808L,0L,9223372036854775807L
sst,testFloats,-3.40282347e38f,0f,3.40282347E+38f
sst,testDoubles,-1.79769313486231570e308d,0d,1.79769313486231570E+308d
sst,testChars,"','","'""'","'\\u20AC'"
sst,testStrings," a~,\\n'z""\\u20AC"
sst,testUBytes,0ub,127ub,255ub
sst,testUInts,0ui,2147483647ui,4294967295ui
sst,testULongs,0uL,9223372036854775807uL,18446744073709551615uL
sst,testUShorts,0us,32767us,65535us

\\*END\\_METADATA\\*
ship,time,lat,lon,status,testByte,testUByte,testLong,testULong,sst
Bell M. Shimada,2017-03-23T00:45:00Z,28.0002,-130.2576,A,-128, 0,-9223372036854775808L,0uL,10.9
Bell M. Shimada,2017-03-23T01:45:00Z,28.0003,-130.3472,\\u20AC,0,127,-9007199254740992L,9223372036854775807uL,10.0
"Bell M. Shimada","2017-03-23T02:45:00Z",28.0001,-130.4305,"'\\t'",126,254,9223372036854775806L,18446744073709551614uL,99
"Bell M. Shimada",2017-03-23T12:45:00Z,27.9998,-131.5578,"'""'",127,255,9223372036854775807L,18446744073709551615uL,NaN
```
Note:

* Acest fișier eșantion include multe cazuri dificile (de exemplu, variabilele char și lungi și valorile dificile ale stringurilor) . Cele mai multe fișiere NCCSV vor fi mult mai simple.
* Linia de licență este rupt în două linii aici, dar este doar o linie în fișierul eșantion.
* \\ \\u20AC este codificarea caracterului Euro și \\ \\u00FC este codificarea ü.
* Multe Strings in the example are address by double cotations even though they don't have to be, ex., many global atributs including the title, the lon units atributed, and the 3rd line of data.)
* Ar fi mai clar și mai bine dacă unitățile atribute pentru variabila testLong ar fi scrise în ghilimele duble care indică faptul că este o valoare string. Dar reprezentarea actuală (1, fără citate) va fi interpretată corect ca o coardă, nu ca un întreg, deoarece nu există sufix "i."
* Spre deosebire de alte tipuri de date numerice, valorile lungi din secțiunea de date au sufixul ('L') care identifică tipul lor de date numerice. Acest lucru este necesar pentru a împiedica foile de calcul să interpreteze valorile ca numere de puncte plutitoare și, astfel, să piardă precizia.

##  [Foi de calcul](#spreadsheets)  {#spreadsheets} 

Într-o foaie de calcul, ca într-un fișier NCCSV:

* Scrie valorile atributelor numerice specificate pentru fișierele NCCSV (de exemplu, cu o literă sufixă, de exemplu, "f," pentru a identifica tipul de date al atributului) .
* În Strings, scrie toate personajele mai puțin decât ASCII personaj #32 sau mai mare decât caracterul #126 ca fie un personaj backslashed JSON (de exemplu, \\n pentru linia nouă) sau ca număr de caracter hexazecimal Unicode (insensibil la caz) cu sintaxa [\\u *hhhh* ](#uhhhh)   (de exemplu, \\ \\u20AC pentru semnul Euro) . Utilizare \\n   (2 caractere: backslash and 'n ') pentru a indica o nouă linie, nu Alt Enter.

Singurele diferențe dintre fișierele NCCSV și foaia de calcul similară care urmează acestor convenții sunt:

* Fișierele NCCSV au valori pe o linie separată de virgule.
Foile de calcul au valori pe o linie în celulele adiacente.
* Stringurile din fișierele NCCSV sunt adesea înconjurate de citate duble.
Stringurile din foile de calcul nu sunt niciodată înconjurate de citate duble.
* Citate duble interne (") în Strings în fișiere NCCSV apar ca 2 citate duble.
Intern dublu cotații în foi de calcul apar ca 1 citat dublu.

În cazul în care o foaie de calcul care urmează acestor convenții este salvată ca un fișier CSV, vor exista adesea virgule suplimentare la sfârșitul multor linii. Software-ul care convertește fișiere NCCSV în .nc Dosarele vor ignora virgule suplimentare.

###  [Excelează](#excel)  {#excel} 

Pentru a importa un fișier NCCSV în Excel:

1. Alegeți fișierul: Deschideți .
2. Schimbă tipul de fișier în fișiere text (\\*.prn;\\*.txt; \\*csv) .
3. Căutați directoarele și faceți clic pe fișierul NCCSV .csv.
4. Click Open .

Pentru a crea un fișier NCCSV dintr-o foaie de calcul Excel:

1. Alegeți fișierul: Salvați ca .
2. Schimbă Salvare ca tip: pentru a fi CSV (Comma delimitat)   (\\*.csv) .
3. Ca răspuns la avertismentul de compatibilitate, faceți clic pe Da .
4. Fișierul .csv rezultat va avea viraje suplimentare la sfârșitul tuturor rândurilor, altele decât rândurile CSV. Îi poţi ignora.

În Excel, eșantionul de fișier NCCSV de mai sus apare ca

![eșantionExcel. png](/img/sampleExcel.png)

###  [Fișe Google](#google-sheets)  {#google-sheets} 

Pentru a importa un fișier NCCSV în foi Google:

1. Alegeți fișierul: Deschideți .
2. Alegeți să încărcați un fișier și faceți clic pe Încărcați un fișier din calculator. Selectaţi fişierul, apoi faceţi clic pe Deschide .
      
Sau, alege My Drive și de a schimba tipul de fișier picătură în jos selecție la toate tipurile de fișiere. Selectaţi fişierul, apoi faceţi clic pe Deschide .

Pentru a crea un fișier NCCSV dintr-o foaie de calcul a foilor Google:

1. Alegeți fișierul: Salvați ca .
2. Schimbă Salvare ca tip: pentru a fi CSV (Comma delimitat)   (\\*.csv) .
3. Ca răspuns la avertismentul de compatibilitate, faceți clic pe Da .
4. Fișierul .csv rezultat va avea viraje suplimentare la sfârșitul tuturor rândurilor, altele decât rândurile CSV. Ignoră-i.

##  [Probleme/Atenționări](#problemswarnings)  {#problemswarnings} 

* Dacă creați un fișier NCCSV cu un editor de text sau dacă creați o foaie de calcul similară într-un program de calcul, editorul de text sau programul foii de calcul nu va verifica dacă ați urmat corect aceste convenții. Depinde de tine să urmezi aceste congrese în mod corect.
* Transformarea unei foi de calcul care urmează acestei convenții într-un fișier Csv (astfel, un fișier NCCSV) va duce la comunicații suplimentare la sfârșitul tuturor rândurilor, altele decât rândurile de date CSV. Ignoră-i. Software-ul apoi convertește fișiere NCCSV în .nc Dosarele le vor ignora.
* În cazul în care un fișier NCCSV are viraje în exces la sfârșitul rândurilor, le puteți elimina prin conversia fișierului NCCSV într-o NetCDF fișier și apoi convertirea NetCDF fișier înapoi într-un fișier NCCSV.
* Când încercați să convertiți un fișier NCCSV într-o NetCDF fişier, unele erori vor fi detectate de software-ul şi vor genera mesaje de eroare, ceea ce duce la eşecul conversiei. Alte probleme sunt greu sau imposibil de prins și nu va genera mesaje de eroare sau avertismente. Alte probleme (De exemplu, virgule în exces la sfârșitul rândurilor) vor fi ignorate. Convertorul de fișiere va face doar verificarea minimă a corectitudinii rezultatului NetCDF dosar, de exemplu, în ceea ce privește conformitatea CF. Este responsabilitatea creatorului de fișiere și a utilizatorului de fișiere să verifice dacă rezultatele conversiei sunt cele dorite și corecte. Două moduri de a verifica sunt:
    * Tipărește conținutul .nc fișier cu ncdump
         ( [https://linux.die.net/man/1/ncdump](https://linux.die.net/man/1/ncdump)  ) .
    * Vezi conţinutul datelor în ERDDAP .

##  [Modificări](#changes)  {#changes} 

* Modificări Prezentat în v1.10 (Aprilie 2020) :
    * Adaugat suport pentru ubyte, scurt, uint, lung.
