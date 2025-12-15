Detta innehåll är baserat på en [från Roy Mendelssohn till ERDDAP användare grupp](https://groups.google.com/g/erddap/c/1U0OByOasu4/m/JM39reEsBAAJ) .

Många av de hjälpförfrågningar vi får involverar problem med minnesanvändning i ERDDAP™ . Några av detta kommer från förändringar i minneshantering i Java och även interaktioner med Linux OS minneshantering. Börjar jag tror på Java 17, Java Använder mer minne än vad som läggs ner i höginställningarna. Du kan se detta om du tittar på dina höga inställningar och sedan använder kommandon som topp, htop eller btop för att kontrollera minnesanvändningen av applikationer. Till exempel vår tungt använda ERDDAP™ har ett högutrymme på 21 GB, men faktiskt minnesanvändning kan köras till 28 GB-30 GB, ibland högre. Detta värde kan spika om det finns många samtidiga stora förfrågningar till systemet.

På de flesta Linux-system, när minnesanvändningen blir över cirka 50%, kommer operativsystemet att börja byta ut minne. Dessutom, för de flesta system byta utrymme är inte sopor samlas in förrän absolut nödvändigt, vilket för ERDDAP™ är för sent, och kan orsaka ERDDAP™ att frysa. Och byta utrymme är långsamt, vilket för stora datasets.xml kan orsaka stora uppdateringar att inte slutföra, vilket sedan sammanfogar problemen.

Vad kan du göra åt detta. Först ta reda på den sanna minnesanvändningen eller ditt system och ha tillräckligt med RAM så att minnesanvändningen inte överstiger 50%. Men det finns också två inställningar som kan ändra detta beteende, vm.swappiness. och vm.vfs_cache_pressure.

vm.swappiness kontrollerar hur aggressivt Linux-kärnan använder swap utrymme. Du kan kontrollera dess nuvarande värde med:

> cat /proc/sys/vm/swappiness
>
•• Standard är vanligtvis 60 (i en skala från 0 till 100) .
•• Lägre värden gör systemet mindre benägna att byta.
•• Ett värde på 10 eller 1 används ofta för system med mycket RAM.


För att ändra värdet till omstart, säg till 10:

> sudo sysctl vm.swappiness=10
>

Och att ändra permanent:

> sudo nano /etc/sysctl.conf
>

Och redigera värdet för vm.swappiness. För att tillämpa förändringen:

> sudo sysctl -p
>

vm.vfs_cache_pressure. berättar för systemet hur aggressivt det är att återta minnet. Högre värden. (100 eller mer) Berätta för att systemet ska vara mer aggressivt, för att kontrollera nuvarande värde:

> cat /proc/sys/vm/vfs_cache_pressure
>

För att ändra värdet till nästa omstart:

> sudo sysctl vm.vfs_cache_pressure=150
>

För att ändra värdet permanent:

> sudo nano /etc/sysctl.conf
>

Lägg sedan till eller uppdatera raden:

> vm.vfs_cache_pressure = 100
>

Och sedan tillämpa förändringen:

> sudo sysctl -p
>


Vad kan du göra om du övervakar din swap utrymme användning och du märker att swap användning börjar öka? Det finns ett kommando som kommer att tömma swap utrymme och flytta innehållet till minnet. Innan du använder detta måste du se till att tillgängligt minne är större än bytesanvändning. Jag säger att tillgängligt minne eftersom i Linux-system med tung diskanvändning "cached memory" kan vara ganska högt, så "gratis minne" kommer att visa som mycket lågt, men "cacheminne" kommer att göras tillgänglig om det behövs för kommandon som detta.

> sudo swapoff -a && sudo swapon -a
>

Bara för att vara säker Jag gillar att tvinga sopor samling också efter att ha gjort detta:

> sudo jcmd $(pgrep java) GC.run
>

Återigen hoppas jag att vissa människor tycker att denna information är användbar. Vi vill göra ERDDAP™ så robust som möjligt, och att arbeta så sömlöst som möjligt med hur människor faktiskt fungerar.
