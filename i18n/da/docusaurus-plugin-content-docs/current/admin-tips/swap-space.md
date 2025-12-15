Dette indhold er baseret på en [besked fra Roy Mendelssohn til te ERDDAP Brugere gruppe](https://groups.google.com/g/erddap/c/1U0OByOasu4/m/JM39reEsBAAJ) .

En masse af de hjælpeanmodninger, vi får, involverer problemer med hukommelsesbrug i ERDDAP™ . Nogle af dette kommer fra ændringer i hukommelsesstyring i Java , og også interaktioner med Linux OS hukommelse management. Jeg tror på Java 17, Java Brug mere hukommelse, end hvad der er sat ned i heap-indstillingerne. Du kan se dette, hvis du ser på dine heap indstillinger og derefter bruge kommandoer som top, htop eller btop til at kontrollere hukommelsesforbruget af applikationer. Så for eksempel vores stærkt brugte ERDDAP™ har hæap plads sæt på 21 GB, men faktisk hukommelse brug kan køre til 28 GB-30 GB, nogle gange højere. Denne værdi kan spike, hvis der er en masse samtidig store anmodninger til systemet.

På de fleste Linux-systemer, når hukommelsesforbruget kommer over omkring 50%, vil OS begynde at udskifte hukommelsen. Desuden, for de fleste systemer swap plads er ikke affald indsamlet indtil absolut nødvendigt, som for de fleste systemer ERDDAP™ er for sent, og kan forårsage ERDDAP™ at fryse. Og swap plads er langsom, som til stor datasets.xml kan forårsage store opdateringer ikke at fuldføre, som derefter forbinder problemerne.

Hvad kan du gøre ved dette. Først finder du den sande hukommelsesforbrug eller dit system, og har nok RAM, så hukommelsesforbruget ikke overstiger 50%. Men der er også to indstillinger, der kan ændre denne adfærd, vm.swappiness. og vm.vfs_cache_press.

vm.swappiness styrer, hvor aggressivt Linux-kernen bruger swap plads. Du kan kontrollere dens nuværende værdi med:

> cat /proc/sys/vm/swappiness
>
• • • • Standard er normalt 60 (på en skala fra 0 til 100) .
• • • • Lavere værdier gør systemet mindre sandsynligt at bytte.
• • • • En værdi på 10 eller 1 bruges ofte til systemer med masser af RAM.


For at ændre værdien, indtil genstart, siger til 10:

> sudo sysctl vm.swappiness=10
>

Og for at ændre permanent:

> sudo nano /etc/sysctl.conf
>

Og redigere værdien for vm.swappiness. Så for at anvende ændringen:

> sudo sysctl -p
>

vm.vfs_cache_press. fortæller systemet, hvor aggressivt at blive i genudråbende hukommelse. Højere værdier. (100 eller mere) Fortæl systemet til at være mere aggressiv, for at kontrollere den nuværende værdi:

> cat /proc/sys/vm/vfs_cache_pressure
>

For at ændre værdien, indtil næste genstart:

> sudo sysctl vm.vfs_cache_pressure=150
>

For at ændre værdien permanent:

> sudo nano /etc/sysctl.conf
>

Og tilføj eller opdater linjen:

> vm.vfs_cache_pressure = 100
>

Og derefter anvende ændringen:

> sudo sysctl -p
>


Hvad kan du gøre, hvis du overvåger din swap rum brug, og du bemærker, at swap brug begynder at øge? Der er en kommando, der vil tømme swap plads og flytte indholdet til hukommelse. Før du bruger dette, skal du sørge for, at tilgængelig hukommelse er større end at bytte brug. Jeg siger tilgængelig hukommelse, fordi i Linux-systemer med tung diskforbrug "cached hukommelse" kan være ret høj, så "gratis hukommelse" vil vise som at være meget lav, men "cache hukommelse" vil blive gjort tilgængelig, hvis det er nødvendigt for kommandoer som dette.

> sudo swapoff -a && sudo swapon -a
>

Bare at være sikker Jeg kan godt lide at tvinge affaldsopsamling også efter at gøre dette:

> sudo jcmd $(pgrep java) GC.run
>

Igen håber jeg, at nogle mennesker finder disse oplysninger nyttige. Vi ønsker at gøre ERDDAP™ så robust som muligt, og for at arbejde så problemfrit som muligt med, hvordan folk rent faktisk arbejder.
