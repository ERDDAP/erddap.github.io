Dieser Inhalt basiert auf einer [Nachricht von Roy Mendelssohn an die ERDDAP Benutzergruppe](https://groups.google.com/g/erddap/c/1U0OByOasu4/m/JM39reEsBAAJ) .

Viele der Hilfe-Anfragen, die wir bekommen Probleme mit der Speichernutzung in ERDDAP™ . Einige davon stammen aus Änderungen im Speichermanagement in Java , und auch Interaktionen mit Linux OS Speichermanagement. Anfangs glaube ich an Java ANHANG Java verwendet mehr Speicher als das, was in den Haufen-Einstellungen gesetzt wird. Sie können dies sehen, wenn Sie Ihre Heap-Einstellungen betrachten und dann Befehle wie Top, Htop oder btop verwenden, um die Speichernutzung von Anwendungen zu überprüfen. So zum Beispiel unsere stark genutzte ERDDAP™ hat Heap-Raum auf 21GB gesetzt, aber tatsächlich Speicher verwenden kann zu 28GB-30GB laufen, manchmal höher. Dieser Wert kann spike, wenn es viele gleichzeitig große Anforderungen an das System gibt.

Bei den meisten Linux-Systemen, wenn die Speichernutzung über etwa 50% steigt, wird das Betriebssystem das Austauschen von Speichern beginnen. Außerdem ist für die meisten Systeme Swap-Raum nicht Müll gesammelt, bis absolut notwendig, für ERDDAP™ ist zu spät und kann verursachen ERDDAP™ zu frieren. Und Swap-Raum ist langsam, was für groß datasets.xml können große Updates nicht abgeschlossen werden, die dann die Probleme verbinden.

Was können Sie dagegen tun? Zuerst finden Sie die wahre Speichernutzung oder Ihr System, und haben genug RAM, so dass die Speichernutzung 50% nicht übersteigt. Aber es gibt auch zwei Einstellungen, die dieses Verhalten ändern können, vm.swappiness. und vm.vfs_cache_druck.

vm.swappiness kontrolliert, wie aggressiv der Linux-Kernel Swap-Raum verwendet. Sie können seinen aktuellen Wert mit:

> cat /proc/sys/vm/swappiness
>
• Standard ist normalerweise 60 (in einer Skala von 0 bis 100) .
• Niedrigere Werte machen das System weniger wahrscheinlich zu schlucken.
• Ein Wert von 10 oder 1 wird häufig für Systeme mit viel RAM verwendet.


Um den Wert bis zum Neustart zu ändern, sagen Sie zu 10:

> sudo sysctl vm.swappiness=10
>

Und sich dauerhaft zu ändern:

> sudo nano /etc/sysctl.conf
>

Und den Wert für vm.swappiness bearbeiten. Dann die Änderung anzuwenden:

> sudo sysctl -p
>

vm.vfs_cache_druck. sagt dem System, wie aggressiv in Erinnerung sein. Höhere Werte. (100 oder mehr) Sagen Sie dem System aggressiver zu sein, um den aktuellen Wert zu überprüfen:

> cat /proc/sys/vm/vfs_cache_pressure
>

Um den Wert bis zum nächsten Neustart zu ändern:

> sudo sysctl vm.vfs_cache_pressure=150
>

Um den Wert dauerhaft zu ändern:

> sudo nano /etc/sysctl.conf
>

Und dann die Zeile hinzufügen oder aktualisieren:

> vm.vfs_cache_pressure = 100
>

Und dann die Änderung anwenden:

> sudo sysctl -p
>


Was können Sie tun, wenn Sie Ihre Swap-Raum-Nutzung überwachen und Sie bemerken, dass Swap-Nutzung beginnt zu erhöhen? Es gibt einen Befehl, der den Swap-Raum leert und den Inhalt in den Speicher bewegt. Bevor Sie diese verwenden, müssen Sie sicherstellen, dass verfügbare Speicher größer ist als Swap-Nutzung. Ich sage verfügbare Speicher, weil in Linux-Systemen mit schweren Festplatten-Nutzung “cached Memory” kann ziemlich hoch sein, so “freien Speicher” wird als sehr niedrig zeigen, aber “Cache-Speicher” wird bereitgestellt werden, wenn für solche Befehle benötigt.

> sudo swapoff -a && sudo swapon -a
>

Nur um sicher zu sein Ich möchte auch die Müllentnahme nach diesem Artikel zwingen:

> sudo jcmd $(pgrep java) GC.run
>

Wieder hoffe ich, dass einige Leute diese Informationen nützlich finden. Wir wollen machen ERDDAP™ so robust wie möglich, und so nahtlos wie möglich zu arbeiten, wie Menschen tatsächlich arbeiten.
