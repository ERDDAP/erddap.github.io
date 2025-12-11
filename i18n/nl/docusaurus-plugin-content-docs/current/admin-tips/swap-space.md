Deze inhoud is gebaseerd op een [bericht van Roy Mendelssohn aan de ERDDAP gebruikersgroep](https://groups.google.com/g/erddap/c/1U0OByOasu4/m/JM39reEsBAAJ) .

Veel van de hulp verzoeken die we krijgen betrekken problemen met geheugengebruik in ERDDAP™ . Dit komt deels door veranderingen in geheugenbeheer in Java , en ook interacties met Linux OS geheugenbeheer. Begin ik geloof in Java 17, Java gebruikt meer geheugen dan wat er wordt neergezet in de hopen instellingen. Je kunt dit zien als je kijkt naar je hopen instellingen en vervolgens commando's zoals top, htop, of btop gebruiken om het geheugengebruik van toepassingen te controleren. Dus bijvoorbeeld onze zwaar gebruikte ERDDAP™ heeft hoop ruimte ingesteld op 21GB, maar eigenlijk geheugengebruik kan lopen tot 28GB-30GB, soms hoger. Deze waarde kan pieken als er veel gelijktijdige grote verzoeken aan het systeem.

Op de meeste Linux systemen, zodra het geheugengebruik boven de 50% komt, zal het OS beginnen met het uitwisselen van geheugen. Bovendien, voor de meeste systemen wissel ruimte is geen vuilnis verzameld totdat absoluut noodzakelijk, die voor ERDDAP™ is te laat, en kan veroorzaken ERDDAP™ om te bevriezen. En wisselruimte is traag, die voor grote datasets.xml kan leiden tot grote updates niet te voltooien, die vervolgens de problemen samen.

Wat kun je hieraan doen? Eerst, ontdek het echte geheugengebruik of uw systeem, en heb genoeg RAM zodat het geheugen gebruik niet meer dan 50%. Maar er zijn ook twee instellingen die dit gedrag kunnen veranderen, vm.swappiness. en vm.vfs_cache_pressure.

vm.swappiness bepaalt hoe agressief de Linux kernel swapruimte gebruikt. U kunt de huidige waarde controleren met:

> cat /proc/sys/vm/swappiness
>
• Standaard is meestal 60 (op een schaal van 0 tot 100) .
• Lagere waarden maken het systeem minder waarschijnlijk om te ruilen.
• Een waarde van 10 of 1 wordt vaak gebruikt voor systemen met veel RAM.


Om de waarde te veranderen tot het opnieuw opstarten, zeg naar 10:

> sudo sysctl vm.swappiness=10
>

En om permanent te veranderen:

> sudo nano /etc/sysctl.conf
>

En bewerk de waarde voor vm.swappiness. Daarna de wijziging toepassen:

> sudo sysctl -p
>

vm.vfs_cache_pressure. vertelt het systeem hoe agressief te zijn in het herstellen van geheugen. Hogere waarden. (100 of meer) Vertel het systeem om agressiever te zijn, Om de huidige waarde te controleren:

> cat /proc/sys/vm/vfs_cache_pressure
>

Om de waarde te wijzigen tot de volgende herstart:

> sudo sysctl vm.vfs_cache_pressure=150
>

De waarde permanent wijzigen:

> sudo nano /etc/sysctl.conf
>

En dan de regel toevoegen of bijwerken:

> vm.vfs_cache_pressure = 100
>

En dan de verandering toepassen:

> sudo sysctl -p
>


Wat kunt u doen als u uw ruilruimtegebruik in de gaten houdt en u merkt dat het swapgebruik begint te stijgen? Er is een commando dat wisselruimte leegmaakt en de inhoud naar het geheugen verplaatst. Voordat u dit gebruikt, moet u ervoor zorgen dat het beschikbare geheugen groter is dan het swapgebruik. Ik zeg beschikbaar geheugen omdat in Linux-systemen met zwaar diskgebruik het geheugen vrij hoog kan zijn, dus zal het vrije geheugen tonen dat het erg laag is, maar het geheugen van de cache zal beschikbaar worden gesteld indien nodig voor opdrachten als deze.

> sudo swapoff -a && sudo swapon -a
>

Voor de zekerheid. Ik dwing vuilnis collectie ook na het doen van dit:

> sudo jcmd $(pgrep java) GC.run
>

Nogmaals, ik hoop dat sommige mensen deze informatie nuttig vinden. We willen maken ERDDAP™ zo robuust mogelijk, en om zo naadloos mogelijk te werken met hoe mensen eigenlijk werken.
