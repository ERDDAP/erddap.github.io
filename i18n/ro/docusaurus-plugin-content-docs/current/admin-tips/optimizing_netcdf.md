Acest conţinut se bazează pe [mesaj de la Roy Mendelssohn la ERDDAP grupul de utilizatori](https://groups.google.com/g/erddap/c/JWoS_y3cygg/m/zCpcNTxNAAAJ) .

1. Optimizarea fișierelor netcdf pentru cloud
- Da.

a. reambalare și dimensiunea paginii

Recent în a face unele cercetări am dat peste acest articol foarte interesant:

https://nsidc.github.io/cloud-optimized-icesat2/

Nimic nu pare a inflama pasiuni cum ar fi discuții de limbaje de programare, editori, și formate de fișiere, și aceasta nu este o recomandare de ce format (s) ar trebui să utilizați, dar mai degrabă pentru a înțelege ceea ce este în acea lucrare și pentru a vedea cât de mult se poate obține îmbunătățirea ( ERDDAP™ a încercat întotdeauna să fie agnostic despre o mulțime de aceste probleme, mai degrabă alegerea de a încerca și de a lucra cu modul în care oamenii de fapt lucrează cu date) .

Documentul vizează în principal situațiile în care datele sunt stocate într-un magazin de obiecte precum Amazon S3. Magazinele de obiecte sunt accesate prin intermediul rețelei http  (s) comenzi, în comparație cu stocarea cu o conexiune directă la (virtual) server, există o mult mai latență, deoarece cererea trebuie să facă o excursie dus-întors. Pentru magazinele de obiecte doriți să faceți cât mai puține cereri, dar dacă faceți doar cereri foarte mari pentru a reduce numărul de apeluri, puteți accesa mai multe date decât aveți nevoie, ceea ce poate fi la fel de lent dacă nu mai mult. Deci, trucul este de a realiza un echilibru între acești doi factori. Și chiar dacă accesul la datele privind magazinele de obiecte s-a îmbunătățit foarte mult, astfel încât are acces la stocarea direct atașată. În cercetarea acestor estimări sunt:

Disc local:
• Timp căutare: 0.1ms
• 6 caută: 0,6ms (neglijabil) 
• Citirea metadatelor dispersate este rapidă
Cloud HTTP:
• Cerere latență: 100-200ms
• 6 cereri: 600-1200ms (Foarte încet&#33;) 
• Fiecare cerere are timp de călătorie în rețea

Al doilea lucru de înţeles este că fişierele netcdf4/hdf5 sunt stocate în bucăţi şi returnate în pagini, astfel încât dimensiunea relativă a fiecăruia dintre acestea poate afecta într-adevăr viteza de acces atunci când accesul este dintr-un magazin de obiecte, şi că, implicit, metadatele despre fişier sunt împrăştiate pe tot parcursul fişierului, astfel obţinerea metadatelor poate lua mai multe cereri. Punctul principal al lucrării este că dimensiunea implicită a paginii pentru fișierele netcdf4/hdf5 este de 4096 octeți (4KB) - (Ceea ce e groaznic pentru nor&#33;) Deoarece numai dimensiunea metadatelor este probabil mai mare decât aceasta și mai mult decât probabil dimensiunile dvs. bucăți sunt, de asemenea, mai mari decât aceasta. Deci, un extract va necesita o mulțime rotund-excursii, care este lent. Ceea ce doriți să faceți este să reîmpachetați fișierul astfel încât toate metadatele să fie la partea de sus a fișierului, și că dimensiunea paginii este cel puțin la fel de mare ca dimensiunea metadatelor plus dimensiunea unei bucăți. De asemenea, în mod implicit dimensiunea paginii nu este fixă, dar utilizează o strategie care variază. Ceea ce s-a descoperit în ziar este că utilizarea unei pagini fixe a produs rezultate mai bune.

Deci, cum pot determina dimensiunea metadatelor fișierului?

> h5stat yourfile.nc | grep "File metadata" # metadata size
>

Și cum pot determina dimensiunea bucății:

> h5dump -pH MUR41_file.nc | grep -A3 CHUNKED
>

sau

> ncdump -sh MUR41_file.nc | grep ChunkSizes
>

Și cum pot determina strategia de dimensionare a paginii:

> h5stat yourfile.nc | grep "File space management strategy"
>

Cel mai probabil această comandă se va întoarce 

Cum pot reambala fișierul meu netcdf astfel încât toate metadatele este în față, și schimba strategia, astfel încât o dimensiune a paginii fixe este utilizat, și ce dimensiune pagină pentru a utiliza? Regulile degetul mare pe care le-am găsit sunt:

Selecţie dimensiune pagină:
• Trebuie să fie ≥ dimensiunea totală a metadatelor fișierului (critic&#33;) 
• Ar trebui să fie puterea de 2 (4MB, 8MB, 16MB, etc.) 
• Nu o lua razna mare - 32MB este de obicei max practic
• Luați în considerare dimensiunile bucății - dimensiunea paginii ar trebui să găzduiască bucăți mai mari

După cum s-a spus mai sus, dimensiunea ar trebui să fie mai mare decât dimensiunea metadatelor plus dimensiunea unei bucăți. Studiul a constatat că, pentru o mulțime de seturi de date dimensiunea paginii 8MB este un compromis bun, este, probabil, mai mare decât dimensiunea metadatelor + dimensiunea bucății, și nu trage cale mai multe date decât aveți nevoie. Pentru a realiza acest lucru:

h5repack -S PAGINA -G 8388608 fișierul dvs. .nc fişier_optimizat .nc 

Aici sunt valorile de utilizat pentru a obține diferite dimensiuni pagini:

444304 (4MO) 
8388608 (8MO) 
16777216 (16 MO) 
33554432 (32MO) 

b. Există beneficii dacă utilizaţi fişiere şi la nivel local?

Ziarul și alte lucruri pe care le-am găsit sugerează că chiar și la nivel local poate exista un câștig de viteză oriunde de 10%-30%. În testele mele exhaustive am găsit câștiguri de viteză de aproximativ 10% atunci când cererile sunt relativ mici în comparație cu dimensiunea totală a fișierului, iar creșterea vitezei scade pe măsură ce cererea devine mai mare, dar nu am constatat niciodată că este mai lentă.

c. TANSTAAFL

Ah, dar există o mulțime de captură undeva, acest lucru pare ca un prânz gratuit. Și captura este că dimensiunea paginii fixe crește dimensiunea fișierului. Pentru unele cazuri am încercat:

617M mur1 .nc 
632M mur1_optimizat .nc 
608M mur2 .nc 
616M mur2_optimizat .nc 
29M chla1 .nc 
40M chla1_optimizat .nc 
30M chla2 .nc 
40M chla2_optimizat .nc 

Deci, compromisul este că există o creștere nu nesemnificativă a dimensiunii fișierului.

d. Dar dacă trebuie să reprocesez fişierele...?

O întrebare bună este dacă trebuie să scriu un scenariu pentru a reprocesa fișierele, de ce nu scrie doar un script pentru a traduce într-un format cum ar fi spune zarr? Zarr are mulți susținători și dacă sunteți interesat în Zarr face doar o căutare rapidă rațăduckgo și există o mulțime de posturi bune, o vedere poate mai echilibrată este lahttps://www.youtube.com/watch?v=IEAcCmcOdJs  (Este interesant că multe dintre punctele pe care le ridică sunt ceea ce formatul ghețar încearcă să abordeze) . Deci, de ce s-ar putea să nu doriți să traduceți fișierele la ceva de genul zarr, În primul rând, dacă creați în mod regulat fișiere netcdf, ați putea începe optimizarea fișierelor de acum încolo, care de-a lungul timpului va vedea câștiguri de viteză și nu va trebui să reformuleze fișierele trecute, și ERDDAP™ va fi încă în măsură să se compare peste fișiere, chiar dacă unele dintre setările interne diferă. În al doilea rând, s-ar putea avea o mulțime de instrumente care depinde de fișiere netcdf, și această abordare ar însemna să nu trebuiască să reevalueze ceea ce ar putea fi o cantitate extinsă de cod. Ideea este de a fi conștienți de opțiuni și de a alege ceea ce funcționează cel mai bine pentru situația dumneavoastră. La fel ca un memento, dacă alegeți să utilizați fișiere zarr cu ERDDAP™ , acestea trebuie să fie format zarr v2.

a. Date mari - o parte

Se vorbesc mult despre date importante, dar cât de mari sunt datele pe care majoritatea oamenilor le folosesc şi cum se compară asta cu capacităţile laptopurilor moderne (da laptopuri, nu servere) . O abordare interesantă este:

https://www.youtube.com/watch?v=GELhdezYmP0Începeţi în jurul minutului 37 deşi toată discuţia e interesantă.

Studiul menţionat este la:

https://motherduck.com/blog/redshift-files-hunt-for-big-data/

Deci există un procent relativ mic de utilizatori care au nevoie într-adevăr să manivela puterea, dar majoritatea copleșitoare a utilizatorilor pot face analizele lor pe un laptop, 26TB drive-uri externe sunt acum sub 300 $ și zvonurile sunt că 60TB drive-uri externe vor fi disponibile până la sfârșitul anului. Ceva la care să te gândeşti.

2. Utilizarea ERDDAP™ cu Google Cloud Platform sau alți furnizori de cloud pe lângă AWS
--------------------------------------------------------------------------

În acest moment ERDDAP™ este cunoscut doar pentru a lucra cu magazine de obiecte AWS (S3) , deși îmbunătățirea și generalizarea ERDDAP™ Suport magazin obiect este pe lista de todo (Vezi?https://github.com/ERDDAP/erddap/issues/158) . Deci, ce să fac dacă vi se spune că trebuie să rulați dvs. ERDDAP™ pe Google Cloud Platform (GCP) sau o platformă similară? În primul rând, majoritatea platformelor de cloud oferă diferite niveluri de stocare, inclusiv, de obicei, unul similar cu cel de stocare locală și este recunoscut de sistemul de operare, unul care este conectat peste rețea, folosind de obicei NFS pentru acces (din nou accesibil direct de către SG) Şi unul care e un magazin de obiecte. Prima soluţie este să nu folosiţi magazine de obiecte şi aţi fi gata de plecare. Dar, ca întotdeauna, TanstaaFL și dezavantajul în acest caz este ca te duci de la magazin obiect -&gt; Acces NFS -&gt; magazin local costurile de asemenea cresc. (Aș adăuga că NFS este de asemenea accesat prin rețea și are propriile probleme de latență, acest lucru ar beneficia și de optimizarea fișierelor) .

Dacă trebuie să utilizați magazin obiect, sau poate permite doar un magazin obiect, răspunsul este un sistem de fișiere FUSE (https://github.com/libfuse/libfuse) . Pe GCP, acest lucru se numește GCSfuse, și pașii pentru a instala sunt:

• Instalați gcsfuse pe imaginea GCP Linux:
sudo apt update
sudo apt install gcsfuse
• Autentificarea GCP (dacă nu sunt deja autentificate) :
Asigurați-vă că aveți acreditările corecte, de obicei prin intermediul contului de servicii sau prin rularea auth auth login.
• Montați găleata GCS la un director local:
Montați găleata GCS la un director local folosind GCSfuse. Acest lucru permite instanţei GCP să acceseze datele ca şi cum ar face parte din sistemul de fişiere locale.
gcsfuze your-bucket-name /pat/to/munt/dosar

Și acum magazinul dvs. obiect poate fi accesat ca aceasta face parte din sistemul de fișiere Linux, astfel încât va lucra cu ERDDAP™ . Acest lucru pare a fi magie, obtinerea cele mai bune din ambele lumi, trebuie să existe o captură. Şi există. Sistemele de fișiere FUSE sunt un pic mai lente decât accesarea directă a magazinului de obiecte (Practic, ați adăugat un alt strat la acces) . În estimările mele de cercetare a cât de mult mai lent sunt peste tot pe hartă, așa că nu am nici o idee cât de mult mai lent. Dar dacă sunteți într-o situație în care trebuie să rulați pe GCP folosind magazine de obiecte, aveți o soluție pentru acum care va lucra cu ERDDAP™ .

3. Ce poţi face acum pentru a ajuta.


Dacă aveți timp și capacitatea de a testa unele dintre aceste lucruri și să raporteze pe rezultatele tale, care ar fi mare. Mai ales dacă aveți acces la GCP sau similare și a vedea cât de mult mai lent ERDDAP™ acces este folosind FUSE (bine de fapt, puteți testa acest lucru pe AWS, de asemenea,) . Dacă pedeapsa cu viteza nu este prea mare, ar fi minunat, pentru că am motive să cred că unii oameni vor trebui să ruleze în curând lor ERDDAP™ s pe GCP cu magazin obiect. Deci nu e doar o chestiune de interes teoretic.
