Dieser Inhalt basiert auf einer [Nachricht von Roy Mendelssohn an die ERDDAP Benutzergruppe](https://groups.google.com/g/erddap/c/JWoS_y3cygg/m/zCpcNTxNAAAJ) .

1. Optimierung von Netcdf-Dateien für die Cloud
——————————

a. Umpacken und Seitengröße

Vor kurzem bei der Durchführung einiger Forschung kam ich über diesen sehr interessanten Artikel:

https://nsidc.github.io/cloud-optimized-icesat2/

Nichts scheint Leidenschaften wie Diskussionen über Programmiersprachen, Editoren und Dateiformate zu entzünden, und das ist keine Empfehlung für das Format (S) Sie sollten verwenden, sondern zu verstehen, was in diesem Papier ist und zu sehen, wie viel Verbesserung erhalten werden kann ( ERDDAP™ hat immer versucht, agnostisch über viele dieser Fragen zu sein, anstatt zu versuchen, mit, wie Menschen tatsächlich mit Daten arbeiten) .

Das Papier richtet sich hauptsächlich an Situationen, in denen die Daten in einem Objektspeicher wie Amazon S3 gespeichert werden. Objektspeicher werden über das Netzwerk mit Hilfe von http  (S) Befehle, also im Vergleich zur Speicherung mit einer direkten Verbindung zum (virtuelle) Server, es gibt eine viel längere Latenz, da die Anfrage eine Rundreise machen muss. Für Objekt-Stores, die Sie so wenig Anfragen wie möglich machen möchten, aber wenn Sie nur wirklich große Anfragen machen, um die Anzahl der Anrufe zu verringern, können Sie auf mehr Daten zugreifen, als Sie brauchen, die gleich langsam sein können, wenn nicht mehr. Der Trick ist also, ein Gleichgewicht zwischen diesen beiden Faktoren zu erreichen. Und auch wenn der Zugriff auf Daten auf Objektspeichern stark verbessert ist, hat also Zugang zu direkt angeschlossenen Speichern. In der Forschung sind einige Schätzungen:

Lokale Festplatte:
• Suchzeit: 0,1ms
• 6 sucht: 0,6ms (vernachlässigbar) 
• Das Lesen von verstreuten Metadaten ist schnell
Cloud HTTP:
• Anfrage Latenz: 100-200ms
• 6 Anfragen: 600-1200m (sehr langsam&#33;) 
• Jede Anfrage hat Netzwerk-Rundreisezeit

Das zweite, was zu verstehen ist, dass netcdf4/hdf5-Dateien in Stücken gespeichert und in Seiten zurückgegeben werden, so dass die relative Größe jedes dieser Dateien wirklich die Zugriffsgeschwindigkeit beeinflussen kann, wenn der Zugriff aus einem Objektspeicher ist, und dass standardmäßig die Metadaten über die Datei in der Datei verstreut werden, so dass die Metadaten mehrere Anfragen annehmen können. Der Hauptpunkt des Papiers ist, dass die Standard-Seitengröße für netcdf4/hdf5-Dateien 4096 Bytes (4KB) - Ja. (Das ist schrecklich für die Wolke&#33;) da die Metadatengröße allein wahrscheinlich größer ist als dies und mehr als wahrscheinlich sind auch Ihre Bruchgrößen größer als dies. So wird ein Extrakt eine Menge Rundfahrten erfordern, die langsam ist. Was Sie tun möchten, ist das Umpacken der Datei, so dass alle Metadaten auf dem “top” der Datei sind, und dass die Seitengröße mindestens so groß ist wie die Metadatengröße plus die Größe eines Stücks. Auch standardmäßig wird die Seitengröße nicht festgelegt, sondern verwendet eine Strategie, die variiert. Was das gefundene Papier ist die Verwendung einer festen Seitengröße produziert bessere Ergebnisse.

Wie kann ich also die Datei-Metadatengröße bestimmen?

> h5stat yourfile.nc | grep "File metadata" # metadata size
>

Und wie kann ich die Stückgröße bestimmen:

> h5dump -pH MUR41_file.nc | grep -A3 CHUNKED
>

oder

> ncdump -sh MUR41_file.nc | grep ChunkSizes
>

Und wie kann ich die Seitengrößenstrategie bestimmen:

> h5stat yourfile.nc | grep "File space management strategy"
>

Am wahrscheinlichsten wird dieser Befehl “H5F_FSPACE_STRATEGY_FSM_AGGR” zurückgeben, die die Standardstrategie ist und was wir wollen, dass es zurückkehrt ist “H5F_FSPACE_STRATEGY_PAGE”

Wie kann ich meine netcdf-Datei so umpacken, dass alle Metadaten vorne sind, und die Strategie ändern, so dass eine feste Seitengröße verwendet wird, und welche Seitengröße zu verwenden? Daumenregeln, die ich gefunden habe, sind:

Seitengröße Auswahl:
• Muss ≥ Gesamtdatei-Metadatengröße (kritisch&#33;) 
• Sollte Macht von 2 sein (4MB, 8MB, 16MB, etc.) 
• Nicht verrückt groß - 32MB ist in der Regel die praktische max
• Betrachten Sie Stückgrößen - Seitengröße sollte die größten Stücke unterbringen

Wie oben erwähnt, sollte idealerweise die Größe größer sein als die Metadatengröße plus die Größe eines Bruchs. Was die Studie gefunden ist, dass für viele Datensätze die 8MB Seitengröße ist ein guter Tradeoff, es ist wahrscheinlich größer als die Metadatengröße + chunk-Größe, und zieht nicht mehr Daten als Sie brauchen. Um dies zu erreichen:

h5repack -S PAGE -G 8388608 yourfile .nc Ihrfile_optimiert .nc 

Hier sind die Werte zu verwenden, um verschiedene Seitengrößen zu erhalten:

4194304 (4MB) 
8388608 (8MB) 
16777216 (16MB) 
335544 (32MB) 

B. Gibt es Vorteile, wenn die Verwendung von Dateien lokal auch?

Das Papier und andere Dinge, die ich gefunden habe, schlagen vor, dass es auch lokal einen Geschwindigkeitsgewinn von 10%-30% geben kann. In meinen allem, aber erschöpfenden Tests fand ich Geschwindigkeitszuwächse von etwa 10%, wenn die Anfragen relativ klein sind im Vergleich zur Gesamtdateigröße, und die Geschwindigkeitszunahme verringert sich, wenn die Anfrage größer wird, aber ich fand es nie langsamer.

c. TANSTAAFL

Ah, aber es gibt irgendwo einen Fang, das scheint wie ein kostenloses Mittagessen. Und der Fang ist, dass die feste Seitengröße die Größe der Datei erhöht. Für einige der Fälle habe ich versucht:

617M mur1 .nc 
632M mur1_optimiert .nc 
608M mur2 .nc 
616M mur2_optimiert .nc 
29M chla1 .nc 
40M chla1_optimiert .nc 
30M chla2 .nc 
40M chla2_optimiert .nc 

So gibt es eine nicht unbedeutende Zunahme der Dateigröße.

d. Aber wenn ich die Dateien trotzdem wieder verarbeiten muss...?

Eine gute Frage ist, ob ich ein Skript schreiben muss, um die Dateien neu zu bearbeiten, warum nicht nur ein Skript schreiben, um in ein Format wie zarr zu übersetzen? zarr hat viele Befürworter und wenn Sie Interesse an zarr nur tun eine schnelle Enteduckgo-Suche und es gibt viele gute Beiträge, eine vielleicht ausgewogenere Ansicht ist beihttps://www.youtube.com/watch?v=IEAcCmcOdJs  (Es ist interessant, dass viele der Punkte, die er aufwirft, das sind, was das eiskalte Format versucht,) . Also warum sollten Sie Ihre Dateien nicht in etwas wie zarr übersetzen möchten, zuerst, wenn Sie netcdf-Dateien regelmäßig erstellen, könnten Sie beginnen, die Dateien von jetzt an zu optimieren, die im Laufe der Zeit Geschwindigkeit Gewinne sehen und Sie müssen nicht zu reformieren Vergangenheit Dateien, und ERDDAP™ wird immer noch in der Lage sein, über die Dateien zu aggregieren, obwohl einige der internen Einstellungen unterschiedlich sind. Zweitens, Sie könnten eine Menge Tooling haben, die von netcdf-Dateien abhängt, und dieser Ansatz würde bedeuten, nicht zu retoolen, was eine umfangreiche Menge an Code sein könnte. Der Punkt ist, sich der Optionen bewusst zu sein und zu wählen, was am besten für Ihre Situation funktioniert. Genau wie eine Erinnerung, wenn Sie zarr Dateien mit ERDDAP™ , sie müssen zarr format v2 Dateien sein.

e. Big Data - a side

Große Daten werden über viel gesprochen, aber wie groß sind die Daten, die die meisten Menschen verwenden und wie funktioniert das mit den Fähigkeiten der modernen Laptops vergleichen. (ja Laptops, nicht Server) . Ein interessanter Take ist:

https://www.youtube.com/watch?v=GELhdezYmP0Starten Sie um die Minute 37, obwohl das ganze Gespräch interessant ist

Die von ihm erwähnte Studie lautet:

https://motherduck.com/blog/redshift-files-hunt-for-big-data/

So gibt es einen relativ kleinen Prozentsatz der Benutzer, die wirklich die Macht kurbeln müssen, aber die überwältigende Mehrheit der Benutzer können ihre Analysen auf einem Laptop, 26TB externe Laufwerke sind jetzt unter $300 und Gerüchte sind, dass 60TB externe Laufwerke bis Ende des Jahres zur Verfügung stehen. Etwas zu denken.

2. Verwendung ERDDAP™ mit Google Cloud Platform oder anderen Cloud-Anbietern neben AWS
---------------

Im Moment ERDDAP™ nur mit AWS-Objektspeichern arbeiten (S3) , obwohl Verbesserung und Verallgemeinerung ERDDAP™ ’s object store support is on the todo list (siehehttps://github.com/ERDDAP/erddap/issues/158) . Also, was zu tun, wenn man dir sagt, dass du deine ERDDAP™ auf Google Cloud Plattform (GCP) oder eine ähnliche Plattform? Erstens bieten die meisten Cloud-Plattformen unterschiedliche Speicherstufen an, in der Regel auch eine, die dem lokalen Speicher ähnlich ist und vom Betriebssystem erkannt wird, eine, die über das Netzwerk in der Regel mit NFS für den Zugriff verbunden ist (wieder direkt zugänglich durch das Betriebssystem) , und eine, die ein Objektspeicher ist. Die erste Lösung ist nicht, Objekt-Shops zu verwenden, und Sie wären gut zu gehen. Aber wie immer, TANSTAAFL und der Nachteil in diesem Fall ist, wie Sie von Objekt-Store gehen -&gt; NFS-Zugang -&gt; lokaler Speicher Ihre Kosten auch steigen. (Ich würde hinzufügen, dass NFS auch über das Netzwerk zugegriffen wird und eigene Latenzprobleme hat, würde dies auch von der Dateioptimierung profitieren) .

Wenn Sie Objektspeicher verwenden müssen oder nur einen Objektspeicher leisten können, ist die Antwort ein FUSE-Dateisystem (https://github.com/libfuse/libfuse) . Auf GCP wird dies gcsfuse genannt, und die Schritte, um es zu installieren sind:

• Installieren Sie gcsfuse auf Ihrem GCP Linux-Bild:
sudo apt update
sudo apt install gcsfuse
• Authenticate to GCP (wenn nicht bereits authentifiziert) :
Stellen Sie sicher, dass Sie die richtigen Anmeldeinformationen haben, typischerweise über das Service-Konto oder durch den Betrieb von gcloud auth login.
• Mount the GCS Bucket in ein lokales Verzeichnis:
Fügen Sie Ihren GCS-Bucket in ein lokales Verzeichnis mit gcsfuse. Damit kann Ihre GCP-Instanz auf die Daten zugreifen, als ob sie Teil des lokalen Dateisystems wäre.
gcsfuse your-bucket-name /path/to/mount/directory

Und jetzt kann Ihr Objekt-Store aufgerufen werden, wie es Teil des Linux-Dateisystems ist, so wird mit ERDDAP™ . Das scheint wie Magie, das Beste beider Welten zu bekommen, es muss einen Haken geben. Und da ist es. FUSE-Dateisysteme sind etwas langsamer als der Zugriff auf den Objektspeicher direkt (im Grunde haben Sie eine weitere Schicht zum Zugriff hinzugefügt) . In meiner Forschung Schätzungen, wie viel langsamer sind auf der ganzen Karte, so habe ich keine Ahnung, wie viel langsamer. Aber wenn Sie sich in einer Situation befinden, in der Sie mit Objekt-Stores auf GCP laufen müssen, haben Sie jetzt eine Lösung, die mit ERDDAP™ .

3. Was du jetzt tun kannst, um zu helfen.
——————————

Wenn Sie die Zeit und die Fähigkeit haben, einige dieser Dinge zu testen und Ihre Ergebnisse zu melden, wäre das großartig. Besonders wenn Sie Zugriff auf GCP oder ähnliche haben und sehen, wie viel langsamer ERDDAP™ Zugriff auf FUSE (Sie können dies auch auf AWS testen) . Wenn die Geschwindigkeitsstrafe nicht zu groß ist, wäre das wunderbar, denn ich habe Grund zu glauben, dass einige Menschen bald ihre ERDDAP™ s auf GCP mit Objektspeicher. so ist dies nicht nur eine Frage von theoretischem Interesse.
