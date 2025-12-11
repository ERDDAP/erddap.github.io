Ez a tartalom egy [Roy Mendelssohn üzenete a ERDDAP felhasználók csoport](https://groups.google.com/g/erddap/c/JWoS_y3cygg/m/zCpcNTxNAAAJ) ...

1. A netcdf fájlok optimalizálása a felhő számára
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

a. visszacsomagolás és oldalméret

Nemrégiben néhány kutatást találtam át ebben a nagyon érdekes cikkben:

https://nsidc.github.io/cloud-optimized-icesat2/

Semmi sem tűnik olyan szenvedélyeket gyulladásnak, mint a programozási nyelvek, szerkesztők és fájlformátumok megvitatása, és ez nem ajánlás arra, hogy milyen formátumú (s) használni kell, de inkább megérteni, mi van ebben a papírban, és látni, hogy mennyi javulást lehet elérni ( ERDDAP™ mindig megpróbált agnosztikus lenni sok ilyen ügyben, inkább úgy döntött, hogy megpróbálja és dolgozzon azzal, hogy az emberek valójában dolgoznak az adatokkal) ...

A papír elsősorban olyan helyzetekre irányul, ahol az adatokat egy olyan objektumboltban tárolják, mint az Amazon S3. Az objekt áruházak a hálózaton keresztül érhetők el http  (s) parancsok, így összehasonlítva a tárolással egy közvetlen kapcsolatot a (virtuális virtuális) szerver, van egy sokkal hosszabb latencia, mivel a kérelem kell, hogy egy kerek utazás. Az objektumboltok esetében a lehető legtöbb kérést szeretné elérni, de ha csak nagyon nagy kéréseket tesz, hogy csökkentse a hívások számát, akkor több adathoz juthat, mint amire szüksége van, ami ugyanolyan lassú lehet, ha nem így van. Tehát a trükk az egyensúly elérése e két tényező között. És bár az objektumboltokkal kapcsolatos adatokhoz való hozzáférés nagymértékben javult, így közvetlenül csatolt tárolókhoz jut. E becslések kutatása során:

Helyi lemez:
• Keress időt: 0,1ms
6 keresi: 0,6 ms (elhanyagolható) 
• A szétszórt metaadata olvasása gyors
Cloud HTTP:
• Kérés: 100-200ms
6 kérés: 600-1200ms (Nagyon lassan&#33;) 
• Minden kérésnek van hálózati forduló-csavarási ideje

A második dolog, hogy megértsük, hogy a netcdf4/hdf5 fájlokat zsunkban tárolják, és oldalakon térnek vissza, így ezek relatív mérete valóban befolyásolhatja a hozzáférési sebességet, amikor a hozzáférés egy objektumboltból származik, és hogy az alapértelmezett metaadat a fájlról az egész fájlban szétszóródik, így a metadata több kérést is igénybe vehet. A papír fő pontja, hogy a netcdf4/hdf5 fájlok alapértelmezett oldalmérete 4096 byte (4KB) - (ami szörnyű a felhő számára&#33;) Mivel a metaadat mérete önmagában valószínűleg nagyobb, mint ez, és több, mint valószínű, hogy a részeg méretek is nagyobb, mint ez. Tehát egy kivonat sok fordulószalagot igényel, ami lassú. Amit meg akarsz csinálni, az a fájl visszacsomagolása, hogy az összes metaadat a fájl "top"-ján van, és hogy az oldal mérete legalább olyan nagy, mint a metaadat mérete, plusz egy darab mérete. Alapértelmezés szerint az oldal mérete nem rögzített, de olyan stratégiát használ, amely változik. Amit a papír talált, egy rögzített oldal méretet használ, jobb eredményeket eredményezett.

Hogyan tudom meghatározni a fájl metaadata méretét?

> h5stat yourfile.nc | grep "File metadata" # metadata size
>

És hogyan tudom meghatározni a cunk méretét:

> h5dump -pH MUR41_file.nc | grep -A3 CHUNKED
>

vagy

> ncdump -sh MUR41_file.nc | grep ChunkSizes
>

És hogyan tudom meghatározni az oldal méretezési stratégiáját:

> h5stat yourfile.nc | grep "File space management strategy"
>

Valószínűleg ez a parancs visszatér a "H5F_FSPACE_STRATEGY_FSM_AGGGR" -hoz, ami az alapértelmezett stratégia, és amit szeretnénk, hogy visszatérjen, az "H5F_FSPACE_STRATEGY_PAGE"

Hogyan tudom visszaszerezni a netcdf fájlomat, hogy minden metaadat elülső legyen, és megváltoztatja a stratégiát, hogy rögzített oldalméretetet használjon, és milyen oldalméretetet használjon? A hüvelykujjszabályok, amelyeket találtam:

Page Size kiválasztás:
• Legyen ≥ teljes fájl metaadata méret (kritikus&#33;) 
• Hatalom kell legyen 2 (4MB, 8MB, 16MB stb.) 
• Ne menj őrült nagy - 32 MB általában a gyakorlati max
• Fontolja meg a cunk méreteket - az oldalméretnek a legnagyobb darabokat kell befogadnia

Mint fentebb említettük, ideális esetben a méretnek nagyobbnak kell lennie, mint a metaadat mérete, plusz egy darab mérete. Amit a tanulmány megállapított, hogy sok adatkészlet esetében a 8MB oldal mérete jó szakadék, valószínűleg nagyobb, mint a metaadat mérete + darab mérete, és nem húzza több adatot, mint amire szüksége van. Hogy ezt elérjük:

H5repack -S PAGE -G 8388608 tefil .nc Yourfile_optimizált .nc 

Íme az értékek, hogy különböző oldalméreteket kapjanak:

4194304 (4MB) 
8388608 (8MB) 
16777216 (16 MB) 
33554432 (32 MB) 

b) Vannak-e előnyök, ha helyileg is használnak fájlokat?

A papír és más dolgok, amiket találtam, azt sugallják, hogy még helyileg is lehet gyorsaság bárhol 10-30%-ról. Bármi, de kimerítő tesztek szerint sebességnövekedések körülbelül 10%, amikor a kérések viszonylag kicsi, mint a teljes fájlméret, és a sebességnövekedés csökken, mint a kérés kap nagyobb, de soha nem találtam, hogy lassabb.

c. TANSTAAFL

Ó, de sok van egy fogás valahol, ez úgy tűnik, mint egy ingyenes ebéd. És a fogás az, hogy a rögzített oldal mérete növeli a fájl méretét. Néhány esetben megpróbáltam:

617 Mur1 .nc 
632M mur1_optimizált .nc 
608M mur2 .nc 
616M mur2_optimizált .nc 
29M chla1 .nc 
40M chla1_optimizált .nc 
30M chla2 .nc 
40M chla2_optimizált .nc 

Tehát a szakadék a fájlméret nem jelentéktelen növekedése.

d. De ha újra kell feldolgoznom a fájlokat...?

Jó kérdés, ha írnom kell egy szkriptet, hogy újra feldolgozza a fájlokat, miért nem csak írni egy szkriptet, hogy lefordítson egy formátumot, mint például zarr? A zarrnak számos előadója van, és ha érdekli a zarr, csak egy gyors kacsengo keresést végez, és sok jó poszt van, egy talán kiegyensúlyozottabb nézet vanhttps://www.youtube.com/watch?v=IEAcCmcOdJs  (Érdekes, hogy az általa felvetett pontok közül sok az, amit a icechunk formátum próbál kezelni) ... Tehát miért nem akarja lefordítani a fájlokat valami olyanra, mint a zarr, Először, ha rendszeresen hoz létre netcdf fájlokat, elkezdheti optimalizálni a fájlokat mostantól, ami idővel meglátja a sebességgyarapodást, és nem kell megreformálnia a korábbi fájlokat, és ERDDAP™ Még mindig képes lesz a fájlok átadására, még akkor is, ha néhány belső beállítás különbözik. Másodszor, lehet, hogy egy csomó eszköz, amely függ a netcdf fájlok, és ez a megközelítés azt jelenti, hogy nem kell újraindítani, hogy mi lehet egy kiterjedt mennyiségű kód. A lényeg, hogy tisztában legyünk a lehetőségekkel, és válasszuk ki, mi működik a legjobban a helyzetedben. Mint emlékeztető, ha úgy dönt, hogy zarr fájlokat használ ERDDAP™ zarr formátumú v2 fájlnak kell lenniük.

E. Nagy adatok - félre

A nagy adatok sokat beszélnek, de mennyire nagy az adatok, amelyeket a legtöbb ember használ, és hogyan hasonlít a modern laptopok képességeivel (Igen laptopok, nem szerverek) ... Érdekes vétel:

https://www.youtube.com/watch?v=GELhdezYmP0Indítsa el a 37 percet, bár az egész beszélgetés érdekes

A tanulmány, amit megemlít, az:

https://motherduck.com/blog/redshift-files-hunt-for-big-data/

Tehát van egy viszonylag kis százaléka a felhasználóknak, akiknek tényleg fel kell szorítani a hatalmat, de a felhasználók túlnyomó többsége képes elvégezni elemzéseiket egy laptopon, 26TB külső meghajtások jelenleg $ 300 és pletykák, hogy 60TB külső meghajtók lesz elérhető az év végéig. Valami, amire gondolni kell.

2. Használat ERDDAP™ a Google Cloud Platform vagy más felhő szolgáltatókkal az AWS mellett
---------------------------------------------------------------------------------------------------------------------------------------------

Jelenleg ERDDAP™ csak az AWS objektumboltokkal dolgozhat (S3) de javulás és általánosítás ERDDAP™ Az objektumbolt támogatása a todo listán (lásd:https://github.com/ERDDAP/erddap/issues/158) ... Mi a teendő, ha azt mondják, hogy futtassa a te ERDDAP™ Google Cloud platform (GCP) vagy hasonló platform? Először is, a legtöbb felhő platform különböző tárolási szintet kínál, általában olyan, amely hasonló a helyi tárolóhoz, és az operációs rendszer felismeri, amely a hálózaton keresztül kapcsolódik, általában NFS-t használ a hozzáféréshez. (ismét közvetlenül hozzáférhető az OS) és az egyik, ami egy objektumbolt. Az első megoldás nem objektumboltokat használ, és jó lenne menni. De mint mindig, a TANSTAAFL és a hátrány ebben az esetben, mint megy a tárgybolt -&gt; NFS-hozzáférés -&gt; helyi áruház a költségek is mennek fel. (Hozzátenném, hogy az NFS a hálózaton keresztül is elérhető, és saját latenciaproblémái vannak, ez szintén profitálna a fájloptimalizálásból.) ...

Ha objektumboltot kell használnia, vagy csak egy objektumboltot engedhet meg, a válasz egy FUSE fájlrendszer (https://github.com/libfuse/libfuse) ... A GCP-n ezt gcsfusenek nevezik, és a telepítendő lépések:

• Telepítse a GCP Linux képét:
sudo apt frissítés
sudo apt install gcsfuse
• Hitelesítés GCP (ha nem hitelesített) :
Győződjön meg róla, hogy a megfelelő hitelesítő anyagok, általában a szolgáltatási fiókon keresztül, vagy a gcloud auth login futtatásával.
• Mount the GCS vödör egy helyi könyvtárba:
Mount Your GCS bucket to a helyi könyvtár gcsfuse. Ez lehetővé teszi a GCP-példa számára, hogy hozzáférjen az adatokhoz, mintha a helyi fájlrendszer része lenne.
gcsfuse Your-bucket-name /path/to/mount/directory

És most az objektumboltod hozzáférhet, mint a Linux fájlrendszer része, így működni fog ERDDAP™ ... Ez úgy tűnik, mint a varázslat, a legjobb mindkét világ, kell egy fogás. És ott van. A FUSE fájlrendszerek jóval lassabbak, mint közvetlenül hozzáférnek az objektumbolthoz (alapvetően hozzáadott egy másik réteget a hozzáféréshez) ... Kutatásomban becslésem szerint mennyi lassabb a térképen, így fogalmam sincs, hogy mennyi lassabb. De ha olyan helyzetben van, ahol objektumboltokat kell futtatnia a GCP-n, akkor megoldása van arra, hogy most dolgozzon együtt. ERDDAP™ ...

3. Amit most tehetünk, hogy segítsünk.
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

Ha van ideje és képessége, hogy tesztelje ezeket a dolgokat, és jelentse vissza az eredményeket, ez nagyszerű lenne. Különösen, ha hozzáfér a GCP-hez vagy hasonlóhoz, és lásd, mennyi lassabb ERDDAP™ hozzáférés használata FUSE (jól tesztelheti ezt az AWS-en is) ... Ha a sebességbüntetés nem túl nagy, ez csodálatos lenne, mert van okom azt hinni, hogy néhány embernek hamarosan futnia kell ERDDAP™ s a GCP objektumbolttal. Ez nem csak elméleti érdek kérdése.
