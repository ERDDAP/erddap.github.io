Acest conţinut se bazează pe [mesaj de la Roy Mendelssohn la ERDDAP grupul de utilizatori](https://groups.google.com/g/erddap/c/1U0OByOasu4/m/JM39reEsBAAJ) .

O mulțime de cereri de ajutor ne implică probleme cu utilizarea memoriei în ERDDAP™ . Unele dintre acestea provin din schimbări în managementul memoriei în Java , precum și interacțiuni cu Linux OS de gestionare a memoriei. Incepand cred in Java 17, Java foloseşte mai multă memorie decât ceea ce este pus în setările grămezii. Puteți vedea acest lucru dacă vă uitați la setările dvs. grămadă și apoi utilizați comenzi, cum ar fi partea de sus, htop, sau btop pentru a verifica utilizarea memoriei de aplicații. Deci, de exemplu, noastre puternic utilizate ERDDAP™ are un spaţiu la 21GB, dar de fapt utilizarea memoriei poate rula la 28GB-30GB, uneori mai mare. Această valoare poate crește dacă există o mulțime de cereri simultane mari la sistem.

Pe majoritatea sistemelor Linux, odată ce utilizarea memoriei ajunge peste 50%, sistemul de operare va începe să schimbe memoria. Mai mult decât atât, pentru majoritatea sistemelor spațiul de swap nu este colectat gunoiul până la absolut necesar, care pentru ERDDAP™ e prea târziu şi poate cauza ERDDAP™ să îngheţe. Si spatiul de schimb este lent, care pentru mare datasets.xml poate cauza actualizări majore nu pentru a finaliza, care apoi combinate problemele.

Ce poţi face în legătură cu asta? În primul rând, aflați adevărata utilizare a memoriei sau sistemul dumneavoastră, și au suficient RAM astfel încât utilizarea memoriei să nu depășească 50%. Dar există, de asemenea, două setări care pot schimba acest comportament, vm.swappiness. și vm.vfs_cache_pressure.

Vm.Swappiness controlează cât de agresiv kernel Linux folosește spațiu swap. Puteți verifica valoarea sa curentă cu:

> cat /proc/sys/vm/swappiness
>
• Implicit este de obicei 60 (pe o scară cuprinsă între 0 și 100) .
• Valorile inferioare fac ca sistemul să fie mai puțin susceptibil de a face schimb.
• O valoare de 10 sau 1 este adesea folosit pentru sisteme cu o multime de RAM.


Pentru a schimba valoarea până la repornire, spune la 10:

> sudo sysctl vm.swappiness=10
>

Și pentru a schimba permanent:

> sudo nano /etc/sysctl.conf
>

Și editați valoarea pentru VM.Swappiness. Apoi, pentru a aplica modificarea:

> sudo sysctl -p
>

Vm.vfs_cache_pressure. Spune sistemului cât de agresiv să fie în recuperarea memoriei. Valori mai mari. (100 sau mai mult) spune sistemului să fie mai agresiv, pentru a verifica valoarea actuală:

> cat /proc/sys/vm/vfs_cache_pressure
>

Pentru a schimba valoarea până la următoarea repornire:

> sudo sysctl vm.vfs_cache_pressure=150
>

Pentru a modifica valoarea permanent:

> sudo nano /etc/sysctl.conf
>

Și apoi adăugați sau actualizați linia:

> vm.vfs_cache_pressure = 100
>

Și apoi se aplică modificarea:

> sudo sysctl -p
>


Ce puteți face dacă monitorizați utilizarea spațiului swap și observați că utilizarea swap-ului începe să crească? Există o comandă care va goli spaţiul şi va muta conţinutul în memorie. Înainte de a utiliza acest lucru, trebuie să vă asigurați că memoria disponibilă este mai mare decât utilizarea swap. Spun memorie disponibilă, deoarece în Linux sisteme cu utilizare disk grele poate fi destul de mare, astfel încât memoria liber va arăta ca fiind foarte scăzut, dar 

> sudo swapoff -a && sudo swapon -a
>

Doar pentru a fi siguri Îmi place să forţez colecţia de gunoi şi după ce fac asta:

> sudo jcmd $(pgrep java) GC.run
>

Sper din nou că unii oameni găsesc această informaţie utilă. Vrem să facem ERDDAP™ cât mai robust posibil, și să lucreze cât mai perfect posibil cu modul în care oamenii lucrează de fapt.
