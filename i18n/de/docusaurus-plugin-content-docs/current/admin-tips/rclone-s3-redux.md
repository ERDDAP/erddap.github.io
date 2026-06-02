Dieser Inhalt basiert auf einer [Nachricht von Roy Mendelssohn an die ERDDAP Benutzergruppe](https://groups.google.com/g/erddap/c/H-vJoGP42TI) .

Laufen ERDDAP™ in der Cloud ist ein heißes Thema geworden. Ich sollte darauf hinweisen, dass ERDDAP™ hat immer in der Cloud laufen, nur die meiste Zeit nicht auf einem Server, der von einem kommerziellen Cloud-Anbieter zur Verfügung gestellt wird, und die große Behinderung für den Betrieb ERDDAP™ auf einem kommerziellen Cloud-Anbieter ist, wenn Sie S3 Speicher verwenden, was keinen normalen Linux-Block-Zugriff erlaubt. Wenn Sie bereit sind, mehr zu zahlen, um die von Ihrem kommerziellen Cloud-Anbieter bereitgestellten Blockzugriffsoptionen zu nutzen, als auf einem kommerziellen Cloud-Server zu laufen, ist im Wesentlichen die gleiche wie auf Ihrem eigenen Gerät, außer natürlich die Kosten.

Nachdem ich das gesagt habe, schrieb ich am 1. Dezember 2025 einen Beitrag “Krelon und S3” und das ist eine Folge. In dieser E-Mail habe ich die GOES17 Sümpfe montiert und eine Datei überprüft, aber ich habe sie nicht den ganzen Weg in ERDDAP™ zu sehen, dass alles reibungslos funktioniert. Und ja, Kinder, Sie können das zu Hause versuchen und Sie müssen nicht mit einem Anwalt oder medizinischen Berater zu konsultieren, es sollte alles sicher sein. Hier montiere ich die NCDC OI sst avhrr v2.1, das ist auf AWS, setzen Sie es in ERDDAP™ und die Ergebnisse zeigen.

- Schritt 1: Definieren Sie den Endpunkt in Rclone

rclone config erstellen oi sst S3
Anbieter AWS \\
region us-east-1 \\
Location_constraint us-east-1 \\
env_auth false \\
anonym wahr


- Schritt 2: Erstellen Sie einen Montagepunkt für den Datensatz

-p /mnt/oi sst 
sudo chown "$USER:$USER" /mnt/oi sst 

- Schritt 3: die S3 Lagerung an der Montagestelle befestigen

Berechtigungen, Berechtigungen, Berechtigungen, Berechtigungen.... (Mit Entschuldigung für Steve Ballmer, wenn Sie wissen, dass Sie wissen) ,

Die Halterung muss so ausgeführt werden, dass jeder Benutzer Ihren tomcat, in der Regel Benutzer “tomcat”, auf die Daten zugreifen kann. „rclone“ installiert den Datensatz mit Eigentümer und Gruppe des Benutzers, der den Mount-Befehl ausführt und Informationen im Home-Verzeichnis des Benutzers speichern möchte (dies wird wahrscheinlich gemildert, wenn Sie dies als System Level-Prozess einrichten - siehe unten) . Wenn Sie also können, führen Sie den Befehl mount als ’tomcat’ aus, aber wenn wie wir Ihr tomcat kein Home-Verzeichnis hat, müssen Sie den Befehl mount als einen anderen Benutzer ausführen. So bearbeiten Sie die Sicherung. Datei:

1. wohnzimmer.de

2. Uncomment oder Add:

Benutzer_allow_other

3. Sparen und aussteigen.


Die tatsächlichen Daten sind mehrere Schichten tief, und ich bin auf der Datenebene, nicht auf der oberen Ebene, und führen den Befehl in einem tmux-Terminal, so dass der Befehl weiter läuft:

rclone -vv mount oi sst :noaa-cdr-sea-oberfläche-temp-optimum-interpolation-pds/data/v2.1/avhrr /mnt/oi sst (
--nur lesen \\
--allow-other \\
--vfs-cache-mode voll \\
--vfs-cache-max-size 1G \\
--vfs-cache-poll-interval 1 m
--vfs-read-chunk-size 64M
--vfs-read-chunk-size-limit 1G \\
--vfs-read-ahead 256M
--buffer-ize 64M \\
--dir-cache-time 24h \\
--attr-timeout 1s \\
--kein-modtime


- Schritt 4: Verwenden Sie GenerateDatasets Xml wie normal,

Verwendung EDDGrid FromNcFiles als Datentyp und das Verzeichnis /mnt/oi sst /. Der erste Pass war ziemlich gut und arbeitete problemlos. Ich habe drei Änderungen an dem xml-Schnipsel vorgenommen, die während des Laufens von GenerateDatasets geschehen könnten. Xml und das waren:

1. Änderung der Datenmenge sst _rclone

2. Das Verzeichnis enthält eine Mischung von Dateien, die in “ enden .nc "und andere enden in "vorläufig .nc ” und nur der erstere sind erwünscht. Um dies zu tun, ändern Sie den Dateinamen regex:

 <fileNameRegex> O sst - Ja. .nc  </fileNameRegex> 

Ich habe oft gesagt, dass ich Regex finde, um eine der Mysterien des Lebens zu sein, und es gibt vielleicht bessere Möglichkeiten, den Regex zu tun. Aber das hat funktioniert.

3. Die ioos_category wurde nicht gesetzt, ich habe die hinzugefügt.

Für permanente Produktionsarbeiten kann der xml Schnipsel ein wenig mehr Bearbeitung verwenden, um vollständiger zu sein.

- Schritt 5: Fügen Sie den xml Schnipsel zum datasets.xml und die Flagge einstellen

Dies dauert lange, um den ersten Pass zu laden, also finden Sie andere Dinge für den Rest des Tages zu tun.

Das Endergebnis ist:

 https://upwell.pfeg.noaa.gov/erddap/griddap/oisst_rclone.graph
 

Jetzt sehen Sie, das war nicht zu schmerzhaft&#33;

Wenn Sie mit dem Ergebnis spielen, beachten Sie zunächst, dass die Rclone-Einstellungen eine erste Vermutung sind und auf Optimierung getestet werden sollten. Jonathan Sherman von unserer Gruppe hat sich das einige angesehen und kann in seinem Vortrag beim IOOS DMAC-Treffen darüber reden. Er deckt auch viel mehr Themen im Zusammenhang mit der Einrichtung in der Google Cloud Platform ab, wie man die Einrichtung des VM orchestriert, den S3-Bucket eingerichtet, um einen hierarchischen Namensraum zu haben, der auf GCP schneller und nur ein wenig teurer ist, und wenn Sie Verarbeitungsskripte ausführen, um die von der ERDDAP™ wie man die aufstellt. Wenn dieses Thema Sie interessiert, ermutige ich Sie, auf sein Gespräch zu hören. Die ERDDAP™ ist auf und ab, nur es ist nicht zugänglich im Moment von außerhalb der NMFS Netzwerk.

Zweitens ist dies kein AWS VM-Montage ein AWS S3 Bucket, das ist einer unserer Server und unser Rohr ist in diesen Tagen völlig gesättigt, so würden Sie erwarten, dass das ehemalige Setup schneller ist als das, was ich getan habe. (gut unser Rohr ist nicht sehr groß - danke NMFS &#33; - aber sind wir immer gesättigt - die Nachfrage nach Daten ist phänomenal) .

Endlich wunderst du dich - ich will selbst rollen, wo fange ich darüber hinaus an? Ich habe eine Sache gefunden, an der LLMs gut sind Informationen, die bekannt und gut dokumentiert sind, und die AIs, die ich überprüft habe (es geht alle meine Token&#33;&#33;) alle kennen Rclone und AWS und GCP ziemlich gut und können die meisten der Setup für Sie tun. In der Tat suchte ich einen Datensatz, der gut zu demo wäre, und eine KI gab mir mehrere Vorschläge und generierte die meisten von dem, was oben ist, obwohl ich einige Edits für meine eigene Einrichtung gemacht.

Denken Sie auch daran, Seth schrieb eine neue S3 für die aktuelle Version (2.30) von ERDDAP™ - Ich habe keine Geschwindigkeiten verglichen, und ich stelle mir vor, je nachdem, was Sie tun, jeder wird seine Vorteile haben. Zum Portieren über ein bestehendes ERDDAP™ Installation, mit rclone kann den Prozess vereinfachen.

-Roy.

PS - Und denken Sie daran, dass Rclone über eine breite Palette von Anbietern funktioniert, ist dies nicht auf AWS beschränkt und nur einige Änderungen an den „rclone config“-Einstellungen werden für einen anderen Anbieter benötigt.


Machen Sie einen Systemdienst (Modifizieren Sie sich entsprechend für Benutzer usw.) :
——————————

(Unit)
Beschreibung=Rclone Halterung für NOAA OISST auf AWS
Was ist los? .tar &#33;
Nach=network-online .tar &#33;

[Service]
Typ=Bekanntgabe
User=yourUser
Gruppe

ExecStart=/usr/bin/rclon mount oi sst :noaa-cdr-sea-oberfläche-temp-optimum-interpolation-pds/data/v2.1/avhrr /mnt/oi sst (
--nur lesen \\
--allow-other \\
--dir-perms 0755 \\
--file-perms 0644 \\
--vfs-cache-mode voll \\
--vfs-cache-max-size 1G \\
--vfs-cache-poll-interval 1 m
--vfs-read-chunk-size 64M
--vfs-read-chunk-size-limit 1G \\
--vfs-read-ahead 256M
--buffer-ize 64M \\
--dir-cache-time 24h \\
--attr-timeout 1s \\
--kein-modtime

ExecStop=/bin/fusermount -uz /mnt/oi sst 
Restart=on-failure
Neustart:

[Installieren]
WilledBy=multi-user .tar &#33;
