Dette innholdet er basert på en [melding fra Roy Mendelssohn til ERDDAP brukergruppe](https://groups.google.com/g/erddap/c/1U0OByOasu4/m/JM39reEsBAAJ) ..

Mange av hjelpforespørslene vi får involvere problemer med minnebruk i ERDDAP™ .. Noe av dette kommer fra endringer i hukommelseshåndtering i Java , og også samspill med Linux OS minnestyring. Jeg begynner å tro på Java 17, Java bruker mer minne enn det som er lagt ned i hauginnstillingene. Du kan se dette hvis du ser på hauginnstillingene og deretter bruke kommandoer som topp, htop eller btop for å sjekke minnebruken av programmer. For eksempel vår mye brukte ERDDAP™ har haug plass satt på 21GB, men faktisk minnebruk kan kjøres til 28GB-30GB, noen ganger høyere. Denne verdien kan pigge hvis det er mange samtidige store forespørsler til systemet.

På de fleste Linux-systemer, når minnebruken kommer over omtrent 50%, vil OS begynne å bytte ut minne. Videre for de fleste systemer bytte plass er ikke søppel samlet før absolutt nødvendig, som for ERDDAP™ For sent og kan forårsake ERDDAP™ å fryse. Swap plass er langsom, som for store datasets.xml kan føre til store oppdateringer ikke å fullføre, som deretter sammensette problemene.

Hva kan du gjøre med dette? For det første kan du finne ut riktig minnebruk eller systemet, og har nok RAM slik at minnebruken ikke overstiger 50%. Men det er også to innstillinger som kan endre denne oppførselen, vm.svelgsomhet. vm.vfs_cache_pressure.

vm.swappiness styrer hvor aggressiv Linux kjernen bruker swap space. Du kan sjekke dens nåværende verdi med:

> cat /proc/sys/vm/swappiness
>
• Standard er vanligvis 60 (på en skala fra 0 til 100) ..
• Lavere verdier gjør systemet mindre sannsynlig å bytte.
• En verdi på 10 eller 1 brukes ofte til systemer med mye RAM.


For å endre verdien til omstart, si til 10:

> sudo sysctl vm.swappiness=10
>

For å endre seg permanent:

> sudo nano /etc/sysctl.conf
>

Og rediger verdien for vm.swappiness. Deretter gjelder endringen:

> sudo sysctl -p
>

vm.vfs_cache_pressure. forteller systemet hvor aggressivt å være i gjenvinne minne. Høyere verdier. (100 eller mer) si til systemet å være mer aggressiv, For å sjekke den nåværende verdien:

> cat /proc/sys/vm/vfs_cache_pressure
>

Hvis du vil endre verdien til neste omstart:

> sudo sysctl vm.vfs_cache_pressure=150
>

For å endre verdien permanent:

> sudo nano /etc/sysctl.conf
>

Legg til eller oppdater linjen:

> vm.vfs_cache_pressure = 100
>

og deretter bruke endringen:

> sudo sysctl -p
>


Hva kan du gjøre hvis du overvåker bruken av swap-plasser, og du legger merke til at swap-bruken begynner å øke? Det er en kommando som vil tømme bytteplass og flytte innholdet til minne. Før du bruker dette, må du sørge for at tilgjengelig minne er større enn swap bruk. Jeg sier tilgjengelig hukommelse, fordi i Linux-systemer med tung diskbruk “kakede minne” kan være ganske høy, så “gratis minne” vil vise seg å være svært lavt, men “kakeminne” vil bli gjort tilgjengelig om nødvendig for kommandoer som dette.

> sudo swapoff -a && sudo swapon -a
>

For å være sikker Jeg liker å tvinge søppelsamlingen også etter å ha gjort dette:

> sudo jcmd $(pgrep java) GC.run
>

Jeg håper noen finner denne informasjonen nyttig. Vi vil lage ERDDAP™ Så robust som mulig, og å jobbe så sømløst som mulig med hvordan folk faktisk fungerer.
