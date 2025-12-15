Tento obsah je založen na [Zpráva od Roye Mendelssohna ERDDAP skupina uživatelů](https://groups.google.com/g/erddap/c/1U0OByOasu4/m/JM39reEsBAAJ) .

Mnoho žádostí o pomoc dostaneme zahrnovat problémy s použitím paměti v ERDDAP™ . Některé z nich pocházejí ze změn v řízení paměti v Java , a také interakce s Linux OS správy paměti. Začínám věřit v Java 17, Java používá více paměti, než co je uvedeno v nastavení hromady. Můžete to vidět, pokud se podíváte na nastavení hromady a pak použít příkazy, jako je top, htop, nebo btop pro kontrolu využití paměti aplikací. Takže například naše těžce používané ERDDAP™ má hromadu prostoru nastavené na 21GB, ale ve skutečnosti použití paměti může běžet na 28GB-30GB, někdy vyšší. Tato hodnota se může zvýšit, pokud existuje mnoho současných velkých požadavků na systém.

Ve většině Linuxových systémů, jakmile se využití paměti dostane nad 50%, OS začne vyměňovat paměť. Kromě toho, pro většinu systémů vyměnit prostor není sběr odpadků, dokud zcela nezbytné, které pro ERDDAP™ je příliš pozdě a může způsobit ERDDAP™ Zmrazit. A výměna prostoru je pomalá, což pro velké datasets.xml může způsobit, že hlavní aktualizace nedokončí, což pak složit problémy.

Co s tím můžeš dělat? Za prvé, zjistit skutečné využití paměti nebo váš systém, a mít dostatek RAM tak, aby využití paměti nepřesahuje 50%. Ale existují také dvě nastavení, která mohou toto chování změnit, vm.swappiness. a tlak vm.vfs_cache_.

vm.swappiness kontroluje, jak agresivně Linuxové jádro využívá výměnného prostoru. Aktuální hodnotu si můžete ověřit pomocí:

> cat /proc/sys/vm/swappiness
>
• Výchozí je obvykle 60 (na stupnici od 0 do 100) .
• Nižší hodnoty snižují pravděpodobnost výměny systému.
• Pro systémy se spoustou RAM se často používá hodnota 10 nebo 1.


Chcete-li změnit hodnotu až do restartu, řekněte 10:

> sudo sysctl vm.swappiness=10
>

A natrvalo změnit:

> sudo nano /etc/sysctl.conf
>

A upravte hodnotu pro vm.swappiness. Pak použít změnu:

> sudo sysctl -p
>

vm.vfs_cache_pressure. říká systému, jak agresivní je být při získávání paměti. Vyšší hodnoty. (100 nebo více) Řekněte systému, aby byl agresivnější, Chcete-li zkontrolovat současnou hodnotu:

> cat /proc/sys/vm/vfs_cache_pressure
>

Pro změnu hodnoty do dalšího restartu:

> sudo sysctl vm.vfs_cache_pressure=150
>

Pro trvalou změnu hodnoty:

> sudo nano /etc/sysctl.conf
>

A pak přidat nebo aktualizovat řádek:

> vm.vfs_cache_pressure = 100
>

A pak použijeme změnu:

> sudo sysctl -p
>


Co můžete dělat, pokud sledujete své využití prostoru pro výměnu a všimnete si, že používání výměny se začíná zvyšovat? Existuje příkaz, který vyprázdní prostor a přenese obsah do paměti. Před použitím tohoto je třeba zajistit, aby dostupná paměť byla větší než používání výměny. Říkám dostupná paměť, protože v Linuxových systémech s těžkým používáním disku může být poměrně vysoká paměť, takže bez paměti ukáže, že je velmi nízká, ale paměť ¶cache bude k dispozici v případě potřeby pro příkazy, jako je tato.

> sudo swapoff -a && sudo swapon -a
>

Jen pro jistotu. Ráda nutím sbírku odpadků i po tomhle:

> sudo jcmd $(pgrep java) GC.run
>

Doufám, že někteří lidé budou tyto informace považovat za užitečné. Chceme udělat ERDDAP™ tak robustní, jak je to možné, a pracovat tak hladce, jak je to možné s tím, jak lidé skutečně pracují.
