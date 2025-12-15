Ez a tartalom egy [Roy Mendelssohn üzenete a ERDDAP felhasználók csoport](https://groups.google.com/g/erddap/c/1U0OByOasu4/m/JM39reEsBAAJ) ...

Rengeteg segítséget kérünk, problémákat okozunk a memóriahasználattal ERDDAP™ ... Néhány ilyen a memóriamenedzsment változásaiból származik Java , valamint a Linux OS memóriakezeléssel való interakciók. Kezdve hiszek benne Java 17, Java több memóriát használ, mint amit a heap beállításokba helyeznek. Láthatja ezt, ha megnézi a heap beállításait, majd olyan parancsokat használ, mint a felső, htop vagy btop, hogy ellenőrizze az alkalmazások memóriahasználatát. Így például a nagymértékben használt ERDDAP™ 21 GB-ban van heap hely, de valójában a memóriahasználat 28 GB-30 GB-ig futhat, néha magasabb. Ez az érték elronthatja, ha van egy csomó egyidejű nagy kérés a rendszer.

A legtöbb Linux rendszeren, ha a memóriafelhasználás meghaladja az 50% -ot, az OS elkezdi a memóriát. Sőt, a legtöbb rendszer swap hely nem gyűjtött szemetet, amíg teljesen szükséges, ami a ERDDAP™ túl késő, és okozhat ERDDAP™ fagyasztani. És az úszás helye lassú, ami nagy datasets.xml súlyos frissítéseket okozhat, amelyek nem teljesülnek, ami aztán összeveti a problémákat.

Mit tehetsz erről. Először megtudja az igazi memóriahasználatot vagy a rendszert, és elég RAM-ot tartalmaz, hogy a memóriahasználat ne haladja meg az 50% -ot. De van még két beállítás, amelyek megváltoztathatják ezt a viselkedést, a vm.swappiness. vm.vfs_cache_pressure.

vm.swappiness ellenőrzi, hogy agresszív módon a Linux kernel használja a swap helyet. Ellenőrizheti jelenlegi értékét:

> cat /proc/sys/vm/swappiness
>
• Az alapértelmezés általában 60 (skálán 0-100) ...
• Az alacsonyabb értékek kevésbé valószínűsítik a rendszert.
• A 10-es vagy 1-es érték gyakran sok RAM rendszerhez használható.


Ahhoz, hogy megváltoztassa az értéket, amíg újraindul, mondjuk 10:

> sudo sysctl vm.swappiness=10
>

És hogy állandóan változtassunk:

> sudo nano /etc/sysctl.conf
>

És szerkesztse a vm.swappiness értéket. Ezután alkalmazza a változást:

> sudo sysctl -p
>

vm.vfs_cache_pressure. azt mondja a rendszernek, hogy mennyire agresszív a memória visszaszerzésében. Magasabb értékek. (100 vagy annál több) mondja el a rendszert, hogy agresszívabb legyen, hogy ellenőrizze a jelenlegi értéket:

> cat /proc/sys/vm/vfs_cache_pressure
>

Az érték megváltoztatása a következő újraindításig:

> sudo sysctl vm.vfs_cache_pressure=150
>

Az érték állandó megváltoztatása:

> sudo nano /etc/sysctl.conf
>

Ezután add hozzá vagy frissítsd a sort:

> vm.vfs_cache_pressure = 100
>

Ezután alkalmazza a változást:

> sudo sysctl -p
>


Mit tehetsz, ha figyelemmel kíséred a swap űrfelhasználást, és észreveszed, hogy a swap használat elkezd növekedni? Van egy parancs, amely üres helyet cserél, és a tartalmakat memóriába helyezi. Mielőtt ezt használni, meg kell tennie, hogy a rendelkezésre álló memória nagyobb, mint a swap használat. Azt mondom, hogy rendelkezésre álló memória, mert a nehéz lemezhasználatú "csatolt memóriával" rendelkező Linux rendszerekben nagyon magas lehet, így a "szabad memória" nagyon alacsony, de a "gyors memória" akkor lesz elérhető, ha ehhez hasonló parancsokra van szükség.

> sudo swapoff -a && sudo swapon -a
>

Csak bizonyos Szeretem kényszeríteni a szemétgyűjtést is ezt követően:

> sudo jcmd $(pgrep java) GC.run
>

Remélem, hogy néhány ember hasznosnak találja ezt az információt. Meg akarjuk csinálni ERDDAP™ a lehető legerősebb, és a lehető legigényesebben dolgozhat azon, hogy az emberek hogyan működnek valójában.
