Tento obsah je založen na [Zpráva od Roye Mendelssohna ERDDAP skupina uživatelů](https://groups.google.com/g/erddap/c/JWoS_y3cygg/m/zCpcNTxNAAAJ) .

1. Optimalizace netcdf souborů pro cloud
Ahoj.

a. přebalování a velikost stránek

Nedávno jsem narazil na tento velmi zajímavý článek:

https://nsidc.github.io/cloud-optimized-icesat2/

Zdá se, že nic nezanítí vášně jako diskuse o programovacích jazycích, editorech a formátech souborů, a to není doporučení jakého formátu (án) Měli byste použít, ale spíše pochopit, co je v této knize a vidět, jak velké zlepšení lze získat ( ERDDAP™ vždy se snažil být agnostik ohledně mnoha těchto záležitostí, spíše se rozhodl zkusit a pracovat s tím, jak lidé skutečně pracují s daty) .

Tento dokument je zaměřen především na situace, kdy jsou údaje uloženy v objektu, jako je Amazon S3. Obchody objektů jsou přístupné přes síť pomocí http  (án) příkazy, ve srovnání s úložným prostorem s přímým připojením k (virtuální) Server, tam je mnohem delší latence, protože žádost musí udělat zpáteční cestu. Pro sklady objektů chcete učinit co nejméně požadavků, ale pokud jen učiníte opravdu velké žádosti o snížení počtu hovorů, můžete mít přístup k mnohem více dat, než potřebujete, které mohou být stejně pomalé, ne-li více. Trik je v dosažení rovnováhy mezi těmito dvěma faktory. A i když přístup k datům na skladech objektů se výrazně zlepšil, má přístup k přímo připojenému úložiště. Při výzkumu jsou některé odhady:

Místní disk:
• Hledat čas: 0.1ms
• 6 hledá: 0.6ms (zanedbatelné) 
• Čtení rozptýlených metadat je rychlé
Cloud HTTP:
• Požadavek latence: 100-200ms
• 6 žádostí: 600-1200ms (Pomalu&#33;) 
• Každý požadavek má síťový kruhový čas

Druhou věcí je pochopit, že netcdf4/hdf5 soubory jsou uloženy v kouscích a vráceny na stránkách, takže relativní velikost každého z nich může mít skutečný vliv na rychlost přístupu, když je přístup z úložiště objektů, a že ve výchozím nastavení metadata o souboru jsou roztroušena po celém souboru, takže získání metadat může trvat několik požadavků. Hlavním bodem papíru je, že výchozí velikost stránky pro soubory netcdf4/hdf5 je 4096 bytes (4KB) - (což je hrozné pro mraky&#33;) Protože samotná velikost metadat je pravděpodobně větší než tato a větší než je pravděpodobné, že vaše velikost je větší než tato. Takže extrakt bude vyžadovat hodně kulatých cest, které jsou pomalé. Co chcete udělat, je znovu zabalit soubor tak, aby všechna metadata je na vrcholu souboru, a že velikost stránky je alespoň stejně velká jako velikost metadat plus velikost jednoho kusu. Také výchozí velikost stránky není pevná, ale používá strategii, která se liší. Co papír nalezený je pomocí pevné velikosti stránky přinesl lepší výsledky.

Jak tedy mohu určit velikost metadat souboru?

> h5stat yourfile.nc | grep "File metadata" # metadata size
>

A jak můžu určit velikost kusu:

> h5dump -pH MUR41_file.nc | grep -A3 CHUNKED
>

nebo

> ncdump -sh MUR41_file.nc | grep ChunkSizes
>

A jak můžu určit strategii velikosti stránky:

> h5stat yourfile.nc | grep "File space management strategy"
>

Nejpravděpodobněji tento příkaz vrátí H5F_FSPACE_STRATEGY_FSM_AGGRláte, což je výchozí strategie a my chceme, aby se vrátila, je H5F_FSPACE_STRATEGY_PAGE.

Jak mohu přebalit soubor netcdf tak, aby všechna metadata byla na přední straně a změnit strategii tak, aby byla použita pevná velikost stránky a jakou velikost stránky použít? Pravidla, která jsem našel, jsou:

Výběr velikosti stránky:
• Musí být ≥ celková velikost metadat souboru (kritické&#33;) 
• Měl by být výkon 2 (4MB, 8MB, 16MB atd.) 
• Neblázněte velké - 32MB je obvykle praktický max
• Uvažujte o velikostech kusu - velikost stránky by měla ubytovat největší kusy

Jak bylo uvedeno výše, v ideálním případě by velikost měla být větší než velikost metadat plus velikost jednoho kusu. Studie zjistila, že u mnoha souborů dat je velikost 8MB stránky dobrý obchod, je pravděpodobně větší než velikost metadat + kus velikost, a nedává táhnout mnohem více dat, než potřebujete. Abychom toho dosáhli:

h5repack - STRANA -G 8388608 yourfile .nc Váš soubor_optimalizován .nc 

Zde jsou hodnoty pro získání různých velikostí stránek:

414304 (4MB) 
8388608 (8MB) 
16777216 (16MB) 
33554432 (32MB) 

b. Existují výhody, pokud použití souborů lokálně také?

Papír a další věci, které jsem našel, naznačují, že i lokálně může být zisk rychlosti kdekoliv od 10% do 30%. Ve svých testech, ale vyčerpávajících, jsem zjistil, že rychlost zisky asi 10%, když požadavky jsou relativně malé ve srovnání s celkovým formátem souboru, a zvýšení rychlosti se snižuje, jak žádost se zvyšuje, ale nikdy jsem zjistil, že je pomalejší.

c. TANSTAAFL

Ale někde je háček, tohle vypadá jako oběd zdarma. A háček je, že pevná velikost stránky zvyšuje velikost souboru. Pro některé případy jsem se snažil:

617M mur1 .nc 
632M mur1_optimalizováno .nc 
608M mur2 .nc 
616M mur2_optimalizováno .nc 
29M chla1 .nc 
40M chla1_optimalizováno .nc 
30M chla2 .nc 
40M chla2_optimalizováno .nc 

Takže obchod je nezanedbatelný nárůst velikosti souboru.

d. Ale když budu muset ty soubory přepracovat...?

Dobrá otázka je, když musím napsat skript, abych mohl soubory zpracovat, proč prostě nenapsat skript, který přeloží do formátu, jako je "zarr"? Zarr má mnoho zastánců a pokud máte zájem o Zarr jen udělat rychlé hledání kachnaduckgo a tam mnoho dobrých pracovních míst, možná vyváženější pohled je nahttps://www.youtube.com/watch?v=IEAcCmcOdJs  (Je zajímavé, že mnoho bodů, které zvedá jsou to, co Icechunk formát se snaží řešit) . Tak proč nechcete přeložit soubory na něco jako Zarr, Za prvé, pokud vytvoříte netcdf soubory pravidelně, můžete začít optimalizovat soubory od teď, které v průběhu času uvidí rychlost zisky a nebudete muset reformovat minulé soubory, a ERDDAP™ bude stále schopen shrnout přes soubory, i když některá interní nastavení se liší. Za druhé, můžete mít mnoho nástrojů, které závisí na netcdf soubory, a tento přístup by znamenalo, že nemusí retool, co by mohlo být rozsáhlé množství kódu. Jde o to, abyste si byli vědomi možností a vybrali si, co nejlépe funguje pro vaši situaci. Jen jako připomínka, pokud se rozhodnete použít soubory Zarr s ERDDAP™ , musí to být zarr formát v2 soubory.

e. Velká data - stranou

Velké údaje se mluví o hodně, ale jak velké jsou údaje, které většina lidí používá a jak se to srovnává s schopnostmi moderních notebooků (ano notebooky, ne servery) . Zajímavý záběr je:

https://www.youtube.com/watch?v=GELhdezYmP0Začněte kolem minuty 37 i když celý rozhovor je zajímavý

Studie, kterou zmiňuje, je na:

https://motherduck.com/blog/redshift-files-hunt-for-big-data/

Existuje tedy relativně malé procento uživatelů, kteří skutečně potřebují zvýšit výkon, ale drtivá většina uživatelů může provést analýzu na notebooku, 26TB externí disky jsou nyní pod 300 dolarů a drby jsou, že 60TB externí disky budou k dispozici do konce roku. Něco k přemýšlení.

2. Použití ERDDAP™ s Google Cloud Platform nebo jinými poskytovateli cloudů kromě AWS
-------------------------------------------------------------------------------- ---------------------------------------

V tuto chvíli ERDDAP™ je známo pouze pracovat s AWS objekty obchody (S3) , i když zlepšení a zobecnění ERDDAP™ Podpora pro ukládání objektů je na seznamu úkolů (vizhttps://github.com/ERDDAP/erddap/issues/158) . Takže co dělat, když vám řeknou, že musíte běžet ERDDAP™ na platformě Google Cloud (GCP) nebo podobnou platformu? Za prvé, většina cloudových platforem nabízí různé úrovně úložišť, obvykle včetně těch, které jsou podobné lokálnímu úložišti a jsou uznávány operačním systémem, který je připojen po síti obvykle pomocí NFS pro přístup (opět přímo přístupné OS) , a jeden, který je obchod objektů. Prvním řešením je nepoužívat sklady objektů a vy byste mohli jít. Ale jako vždy, TANSTAAFL a nevýhoda v tomto případě je jak si jít z obchodu objektů -&gt; Přístup NFS - &gt; místní sklad Vaše náklady také rostou. (Rád bych dodal, že NFS je také přístupný přes síť, a má své vlastní problémy s latencí, to by také mělo prospěch z optimalizace souborů) .

Pokud máte používat ukládání objektů nebo si můžete dovolit pouze uložení objektů, odpověď je FUSE souborový systém (https://github.com/libfuse/libfuse) . Na GCP se tomu říká gcsfuse a kroky k jeho instalaci jsou:

• Nainstalujte gcsfuse na obrázek GCP Linux:
sudo apt update
sudo apt install gcsfusion
• Ověření GCP (není-li již ověřeno) :
Ujistěte se, že máte správné pověření, obvykle prostřednictvím servisního účtu nebo spuštěním Gcloud Auth login.
• Připojte kbelík GCS do místního adresáře:
Připojte svůj GCS kbelík do místního adresáře pomocí gcsfuse. To umožňuje vašemu GCP instanci přístup k datům, jako by byla součástí místního souborového systému.
gcsfuse your-bucket-name /path/to/mount/directory

A nyní je váš obchod objektů přístupný, jako by byl součástí Linuxového systému, takže bude pracovat s ERDDAP™ . Tohle vypadá jako magie, dostat to nejlepší z obou světů, musí tu být háček. A je. FUSE souborové systémy jsou o něco pomalejší než přístup k objektu ukládat přímo (V podstatě jste přidali další vrstvu k přístupu) . Podle mých výzkumů odhadujeme, o kolik jsou pomaleji na mapě, takže nemám ponětí, jak moc pomaleji. Ale pokud jste v situaci, kdy musíte běžet na GCP pomocí objektových obchodů, máte řešení, které bude pracovat s ERDDAP™ .

3. Co můžete udělat, abyste pomohl.
?

Pokud máte čas a schopnost otestovat některé z těchto věcí a hlásit své výsledky, to by bylo skvělé. Zvlášť pokud máte přístup k GCP nebo podobné a uvidíte, o kolik pomalejší ERDDAP™ přístup je pomocí FUSE (Vlastně to můžete otestovat i na AWS.) . Pokud trest za rychlost není příliš velký, to by bylo skvělé, protože mám důvod věřit, že někteří lidé budou brzy muset běžet jejich ERDDAP™ s na GCP s obchodem objektů. Takže to není jen věc teoretického zájmu.
