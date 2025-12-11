---
sidebar_position: 3
---
# Arbeiten mit dem datasets.xml Datei

 \\[ Diese Webseite wird nur von Interesse sein ERDDAP™ Administratoren. \\] 

Nachdem Sie dem ERDDAP™   [Installationsanleitung](/docs/server-admin/deploy-install) , Sie müssen die datasets.xml Datei in *Tomcat* /content/erddap/ um die Datensätze zu beschreiben, die Sie ERDDAP™ Installation wird dienen.

Sie können ein Beispiel sehen [ datasets.xml auf GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .

- - Ja.

##  [Einleitung](#introduction)  {#introduction} 

### Einige Montage erforderlich{#some-assembly-required} 
Einrichten eines Datensatzes ERDDAP™ Es geht nicht nur darum, auf das Verzeichnis oder die URL des Datensatzes hinzuweisen. Sie müssen ein Stück XML schreiben für datasets.xml die den Datensatz beschreibt.

* Für gegitterte Datensätze, um den Datensatz konform zu machen ERDDAP 's Datenstruktur für netzgebundene Daten, müssen Sie eine Teilmenge der Variablen des Datensatzes identifizieren, die die gleichen Dimensionen teilen. ( [Warum?](#why-just-two-basic-data-structures)   [Wie?](#dimensions) ) 
* Die aktuellen Metadaten des Datensatzes werden automatisch importiert. Aber wenn Sie diese Metadaten ändern oder andere Metadaten hinzufügen möchten, müssen Sie sie in datasets.xml . Und ERDDAP™ andere Metadaten benötigt, einschließlich [Globale Attribute](#global-attributes)   (wie folgt: infoUrl , Institution, sourceUrl , Zusammenfassung und Titel) und [Variable Attribute](#variable-addattributes)   (wie folgt: long\\_name und Einheiten) . Wie die Metadaten, die derzeit im Datensatz enthalten sind, dem Datensatz beschreibende Informationen hinzufügen, werden die von ERDDAP™ fügt dem Datensatz beschreibende Informationen hinzu. Die zusätzlichen Metadaten sind eine gute Ergänzung zu Ihrem Datensatz und hilft ERDDAP™ tun Sie eine bessere Aufgabe, Ihre Daten an Benutzer zu präsentieren, die nicht mit ihr vertraut sind.
*    ERDDAP™ Sie müssen besondere Dinge mit der [Länge, Breite, Höhe (oder Tiefe) und Zeitvariablen](#destinationname) .

Wenn Sie in diese Ideen einkaufen und den Aufwand zur Erstellung des XML für datasets.xml , Sie erhalten alle Vorteile von ERDDAP™ , einschließlich:

* Volltextsuche nach Datensätzen
* Suche nach Datensätzen nach Kategorie
* Datenzugriffsformulare ( * datasetID * .html) so können Sie eine Untermenge von Daten in vielen verschiedenen Dateiformaten anfordern
* Formulare für Diagramme und Karten ( * datasetID * .graph) 
* Web Map Service ( WMS ) für gegitterte Datensätze
*    RESTful Zugriff auf Ihre Daten

Das machen datasets.xml nimmt großen Aufwand für die ersten wenigen Datensätze, **es wird leichter** . Nach dem ersten Datensatz können Sie oft eine Menge Ihrer Arbeit für den nächsten Datensatz wiederverwenden. Glücklicherweise, ERDDAP™ kommt mit zwei [Werkzeuge](#tools) um Ihnen zu helfen, das XML für jeden Datensatz zu erstellen datasets.xml .
Wenn du feststeckst, siehst du unsere [Abschnitt zum Erhalt zusätzlicher Unterstützung](/docs/intro#support) .

### Datenanbieter Formblatt{#data-provider-form} 
Wenn ein Datenanbieter zu Ihnen kommt, in der Hoffnung, einige Daten zu Ihrem hinzufügen ERDDAP , kann es schwierig und zeitraubend sein, alle Metadaten zu sammeln (Informationen zum Datensatz) benötigt, um den Datensatz in ERDDAP . Viele Datenquellen (z.B. .csv-Dateien, Excel-Dateien, Datenbanken) keine internen Metadaten haben, also ERDDAP™ hat ein Data Provider-Formular, das Metadaten des Datenanbieters erfasst und dem Datenanbieter eine andere Anleitung gibt, einschließlich umfassender Anleitung für [Daten in Datenbanken](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html#databases) . Die vorgelegten Informationen werden in die datasets.xml Format und dann an die ERDDAP™ Administrator (du) und geschrieben (anhängig) bis *BigParentDirectory* /logs/dataProviderForm.log . So automatisiert die Form den Prozess der Eingabe eines Datensatzes in ERDDAP , aber die ERDDAP™ Der Administrator muss die datasets.xml chunk und behandeln Sie die Datendatei (S) vom Anbieter oder der Verbindung zur Datenbank.

Die Einreichung von Datendateien aus externen Quellen ist ein großes Sicherheitsrisiko, also ERDDAP™ damit nicht umgehen. Sie müssen eine Lösung finden, die für Sie und den Datenanbieter funktioniert, zum Beispiel E-Mail (für kleine Dateien) , ziehen aus der Wolke (zum Beispiel DropBox oder Google Drive) , eine Sftp-Seite (mit Passwörtern) , oder Sneaker Netto (USB-Stick oder externe Festplatte) . Sie sollten wahrscheinlich nur Dateien von Menschen akzeptieren, die Sie kennen. Sie müssen die Dateien für Viren scannen und andere Sicherheitsvorkehrungen.

Es gibt keinen Link in ERDDAP™ zum Datenträgerformular (z.B. auf der ERDDAP™ Startseite) . Stattdessen, wenn jemand Ihnen sagt, sie wollen ihre Daten von Ihrem ERDDAP , Sie können ihnen eine E-Mail senden und so etwas sagen:
Ja, wir können Ihre Daten in ERDDAP . Um zu beginnen, füllen Sie bitte das Formular aushttps://*yourUrl*/erddap/dataProviderForm.html  (oder http:// wenn https:// ist nicht aktiviert) .
Nachdem Sie fertig sind, werde ich Sie kontaktieren, um die letzten Details auszuarbeiten.
Wenn Sie sich das Formular ansehen möchten (ohne Ausfüllen) , Sie können das Formular auf ERD ' ERDDAP : [Einleitung](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm.html) , [Teil 1](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html) , [Teil 2](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm2.html) , [Teil 3](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm3.html) , und [Teil 4](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm4.html) . Diese Links auf der ERD   ERDDAP™ senden Sie mir Informationen, nicht Sie, also senden Sie keine Informationen mit ihnen, es sei denn, Sie möchten tatsächlich Daten an die ERD   ERDDAP .

Wenn Sie das Data Provider-Formular von Ihrem entfernen möchten ERDDAP™ , gesetzt
```
<dataProviderFormActive>false</dataProviderFormActive>  
```
in der Datei setup.xml.

Der Impuls dafür war NOAA 2014 [Öffentlicher Zugang zu Forschungsergebnissen (PARR) Richtlinie](https://www.glerl.noaa.gov/review2016/reviewer_docs/NOAA_PARR_Plan_v5.04.pdf) , die alles erfordert NOAA über Steuergelder finanzierte Umweltdaten werden über einen Datendienst bereitgestellt (nicht nur Dateien) innerhalb von 12 Monaten der Schöpfung. So gibt es ein erhöhtes Interesse an der Nutzung ERDDAP™ Datensätze über einen Service ASAP zur Verfügung zu stellen. Wir brauchten einen effizienteren Umgang mit einer Vielzahl von Datenanbietern.

Feedback/Vorschläge? Dieses Formular ist neu, bitte E-Mail erd dot data at noaa dot gov wenn Sie Feedback oder Vorschläge zur Verbesserung dieser haben.

### Werkzeuge{#tools} 
 ERDDAP™ kommt mit zwei Befehlszeilenprogrammen, die Tools sind, um Ihnen zu helfen, das XML für jeden Datensatz zu erstellen, den Sie möchten ERDDAP™ zu dienen. Sobald Sie eingerichtet haben ERDDAP™ und lauf es (mindestens ein Mal) , Sie können diese Programme im *Tomcat* /webapps/erdap/WEB-INF-Verzeichnis. Es gibt Linux/Unix Shell-Skripte (mit der Erweiterung .sh) und Windows-Scripte (mit der Erweiterung .bat) für jedes Programm. \\[ Führen Sie diese Tools auf Linux wie derselbe Benutzer aus (Tomcat?) Das wird Tomcat laufen. \\] Wenn Sie jedes Programm ausführen, wird es Ihnen Fragen stellen. Geben Sie für jede Frage eine Antwort ein und drücken Sie dann Enter. Oder drücken Sie ^C, um ein Programm jederzeit zu verlassen.

#### Das Programm läuft nicht?{#program-wont-run} 

* Wenn Sie ein unbekanntes Programm erhalten (oder ähnliches) Fehlermeldung, das Problem ist wahrscheinlich, dass das Betriebssystem nicht finden konnte Java . Sie müssen herausfinden, wo Java ist auf Ihrem Computer, dann bearbeiten Sie die Java-Referenz in der .bat oder .sh-Datei, die Sie versuchen zu verwenden.
* Wenn Sie eine jar-Datei erhalten, die nicht gefunden wurde oder die Klasse nicht die Fehlermeldung gefunden hat, dann Java konnte keine der in der .bat oder .sh-Datei aufgeführten Klassen finden, die Sie verwenden möchten. Die Lösung ist herauszufinden, wo die .jar-Datei ist, und bearbeiten Sie die java Referenz auf sie in der .bat oder .sh-Datei.
* Wenn Sie eine Version von Java Das ist zu alt für ein Programm, das Programm wird nicht laufen und Sie werden eine Fehlermeldung wie sehen
Ausnahme im Gewinde "main" java.lang.UnsupportedClassVersionError:
     *einige/Klasse/Name* : Unsupported major.minor version *EinigeNumber*   
Die Lösung ist, die neueste Version zu aktualisieren Java und stellen Sie sicher, dass die .sh- oder .bat-Datei für das Programm es verwendet.

#### Die Werkzeuge drucken verschiedene Diagnosenachrichten:{#the-tools-print-various-diagnostic-messages} 

* Das Wort "ERROR" wird verwendet, wenn etwas so falsch ging, dass das Verfahren nicht abgeschlossen. Obwohl es ärgerlich ist, einen Fehler zu bekommen, zwingt der Fehler, sich mit dem Problem zu befassen.
* Das Wort "WARNING" wird verwendet, wenn etwas schief ging, aber das Verfahren konnte abgeschlossen werden. Das sind ziemlich selten.
* Alles andere ist nur eine informative Nachricht. Sie können \\-verbose hinzufügen [GenerateDatasetsXml](#generatedatasetsxml) oder [DasDds](#dasdds) Befehlszeile, um zusätzliche informative Nachrichten zu erhalten, die manchmal hilft, Probleme zu lösen.

Die beiden Werkzeuge sind eine große Hilfe, aber Sie müssen noch alle diese Anweisungen auf dieser Seite sorgfältig lesen und wichtige Entscheidungen selbst treffen.

### GenerateDatasetsXml{#generatedatasetsxml} 
*    **GenerateDatasetsXml** ist ein Befehlszeilenprogramm, das einen groben Entwurf des Datensatzes XML für nahezu jede Art von Datensatz erzeugen kann.
    
Wir STRONGLY EMPFEHLEN, dass Sie GenerateDatasets verwenden Xml statt Stücke von datasets.xml von Hand, weil:
    
    * Datensätze generieren Xml funktioniert in Sekunden. Das mit der Hand zu tun ist mindestens eine Stunde Arbeit, selbst wenn Sie wissen, was Sie tun.
    * Datensätze generieren Xml macht einen besseren Job. Dies von Hand zu tun erfordert umfangreiche Kenntnisse, wie ERDDAP™ Arbeiten. Es ist unwahrscheinlich, dass Sie einen besseren Job von Hand tun. (Bob Simons verwendet immer GenerateDatasets Xml für den ersten Entwurf, und er schrieb ERDDAP .) 
    * Datensätze generieren Xml generiert immer ein gültiges Stück datasets.xml . Irgendein Stück datasets.xml dass Sie schreiben wird wahrscheinlich mindestens ein paar Fehler, die verhindern ERDDAP™ vom Laden des Datensatzes. Es dauert oft Stunden, um diese Probleme zu diagnostizieren. Verschwende deine Zeit nicht. Let Generate Datensätze Xml machen die harte Arbeit. Dann können Sie die .xml per Hand verfeinern, wenn Sie wollen.
    
Wenn Sie die GenerateDatasets verwenden Xml Programm:
    
    * Unter Windows, das erste Mal, wenn Sie GenerateDatasetsXml ausführen, müssen Sie die Datei GenerateDatasetsXml.bat mit einem Texteditor bearbeiten, um den Pfad zur Java zu ändern. exe Datei, so dass Windows Java .
    * Datensätze generieren Xml bittet Sie zunächst, den EDDType anzugeben (Erd Dap Dataset Typ) des Datensatzes. Siehe [Liste der Datensätze](#list-of-types-datasets)   (in diesem Dokument) um herauszufinden, an welchem Typ für den Datensatz Sie arbeiten. Neben den regulären EDDTypen gibt es auch einige [Sonder-/Pseudo-Datensatztypen](#specialpseudo-dataset-types)   (z.B. einen, der einen THREDDS-Katalog kriechen, um einen Bruch von datasets.xml für jeden der Datensätze im Katalog) .
    * Datensätze generieren Xml stellt Ihnen dann eine Reihe von Fragen, die speziell auf diesen EDDType. Die Fragen sammeln die für ERDDAP™ Zugriff auf die Quelle des Datensatzes. Was zu verstehen ERDDAP™ fragt nach, siehe die Dokumentation für den EDDType, die Sie durch Klicken auf den gleichen Datensatztyp im [Liste der Datensätze](#list-of-types-datasets) .
        
Wenn Sie einen String mit Sonderzeichen eingeben müssen (z.B. Weißraumzeichen am Anfang oder Ende, Nicht-ASCII-Zeichen) , geben Sie ein [JSON-Stil String](https://www.json.org/json-en.html)   (mit speziellen Zeichen entkommen mit \\ Zeichen) . Zum Beispiel, um nur ein Tab-Zeichen eingeben, geben Sie "\t" (mit den umliegenden Doppel-Zitaten, die sagen, ERDDAP™ dass dies ein JSON-Strang ist.
        
    * Oft wird eine Ihrer Antworten nicht das sein, was GenerateDatasetsXml braucht. Sie können dann wieder versuchen, mit überarbeiteten Antworten auf die Fragen, bis GenerateDatasets Xml kann die Quelldaten erfolgreich finden und verstehen.
    * Wenn Sie die Fragen richtig beantworten (oder ausreichend korrekt) , GenerateDatasets Xml wird sich mit der Datenquelle verbinden und grundlegende Informationen sammeln (z.B. variable Namen und Metadaten) .
Für Datensätze, die von lokalen NetCDF   .nc und verwandten Dateien, GenerateDatasets Xml druckt oft die ncdump-ähnliche Struktur der Datei, nachdem sie die Datei zuerst liest. Dies kann Ihnen Informationen geben, um die Fragen besser auf einer nachfolgenden Schleife durch GenerateDatasetsXml zu beantworten.
    * Datensätze generieren Xml generiert dann einen groben Entwurf des Datensatzes XML für diesen Datensatz.
    * Diagnostische Informationen und der grobe Entwurf des Datensatzes XML werden in *BigParentDirectory* /logs/GenerateDatasetsXml.log .
    * Der grobe Entwurf des Datensatzes XML wird in *BigParentDirectory* /logs/GenerateDatasetsXml.out .
#### "0 Dateien" Fehlermeldung{#0-files-error-message} 
Wenn Sie GenerateDatasets ausführen Xml oder [DasDds](#dasdds) , oder wenn Sie versuchen, eine EDDGrid Von...Files oder EDDTableFrom... Dateien-Datensatz in ERDDAP™ , und Sie erhalten eine "0 Dateien" Fehlermeldung, dass ERDDAP™ gefunden 0 passende Dateien im Verzeichnis (wenn Sie denken, dass es passende Dateien in diesem Verzeichnis) :
* Überprüfen Sie, ob Sie den vollständigen Namen des Verzeichnisses angegeben haben. Und wenn Sie den Beispieldateinamen angegeben haben, stellen Sie sicher, dass Sie den vollständigen Namen der Datei, einschließlich des vollständigen Verzeichnisnamens, angegeben haben.
* Überprüfen Sie, ob die Dateien wirklich in diesem Verzeichnis sind.
* Überprüfen Sie die Rechtschreibung des Verzeichnisnamens.
* Überprüfen Sie die DateiNameRegex. Es ist wirklich, wirklich einfach, Fehler mit Regexes zu machen. Für Testzwecke, versuchen Sie die regex .\\*, die alle Dateinamen entsprechen sollte. (Siehe [regex dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) und [Nach oben](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) 
* Überprüfen Sie, ob der Benutzer, der das Programm läuft (z.B., user=tomcat (?) für Tomcat/ ERDDAP ) hat 'lesen' Erlaubnis für diese Dateien.
* In einigen Betriebssystemen (zum Beispiel SELinux) und je nach Systemeinstellungen, muss der Benutzer, der das Programm ausgeführt hat, 'lesen' Berechtigung für die gesamte Kette von Verzeichnissen, die zu dem Verzeichnis führen, das die Dateien hat.


* Wenn Sie Probleme haben, die Sie nicht lösen können, [Anfrage Support](/docs/intro#support) mit so viel Information wie möglich. Ähnlich, wenn es wie der entsprechende EDDType für einen bestimmten Datensatz scheint, funktioniert nicht mit diesem Datensatz, oder wenn es keinen entsprechenden EDDType gibt, bitte eine Datei einreichen [Problem bei GitHub](https://github.com/ERDDAP/erddap/issues) mit den Details (und eine Musterdatei, falls relevant) .
         
#### Sie müssen die Ausgabe von GenerateDatasets bearbeiten Xml, um es besser zu machen.{#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better} 
         
* DISCLAIMER:
DER CHUNK datasets.xml MADE BE GenerateDatasets Xml ISN'T PERFECT. Sie müssen die XML BEFORE in einem ÖFFENTLICHEN ERDDAP . Datensätze generieren Xml RELIES ON A LOT of RULES-OF-THUMB WHICH AREN'T ALWAYS CORRECT. Sie haben die Möglichkeit, den CORRECTNESS des XML so zu ändern, dass Sie auf ERDDAP S datasets.xml FILE.
    
     (Fun Fact: Ich schreie nicht. Aus historischen Rechtsgründen müssen Disclaimer in allen Kappen geschrieben werden.) 
    
Die Ausgabe von GenerateDatasetsXml ist ein grober Entwurf.
Sie werden es fast immer bearbeiten müssen.
Wir haben enorme Anstrengungen unternommen, um die Produktion so schnell wie möglich fertig zu machen, aber es gibt Grenzen. Oft sind benötigte Informationen einfach nicht aus den Quell-Metadaten verfügbar.
    
Ein grundlegendes Problem ist, dass wir ein Computerprogramm fragen (GenerateDatasetsXml) eine Aufgabe zu tun, wo, wenn Sie die gleiche Aufgabe zu 100 Personen, würden Sie 100 verschiedene Ergebnisse erhalten. Es gibt keine einzige "richtige" Antwort. Offensichtlich kommt das Programm am nächsten, um Bobs Geist zu lesen (nicht deine) , aber auch so, es ist nicht ein all-verstehendes KI-Programm, nur ein Haufen von Heuristiken kobbelt zusammen, um eine KI-ähnliche Aufgabe zu tun. (An jenem Tag eines allverständigen KI-Programms kann kommen, aber es hat noch nicht. Wenn/wenn es das tut, können wir Menschen größere Probleme haben. Seien Sie vorsichtig, was Sie wünschen.) 
    
* Für Informationszwecke zeigt die Ausgabe die globale QuelleAttribute und variable sourceAttributes als Kommentare. ERDDAP™ verbindet sourceAttributes und addAttributes   (die vorangegangen sind) um die Kombination zu machen Attribute, die dem Benutzer angezeigt werden. (Und andere Attribute werden automatisch zu Längen-, Breiten-, Höhen-, Tiefen- und Zeitvariablen hinzugefügt, wenn ERDDAP™ macht tatsächlich den Datensatz) .
     
* Wenn Sie kein sourceAttribute mögen, überschreiben Sie es, indem Sie ein addAttribute mit dem gleichen Namen, aber einen anderen Wert (oder kein Wert, wenn Sie es entfernen möchten) .
     
* Alle addAttributes sind computergenerierte Vorschläge. Bearbeiten Sie sie&#33; Wenn du kein AddAttribute magst, ändere es.
     
* Wenn Sie andere hinzufügen möchten addAttributes Füge sie hinzu.
     
* Wenn Sie eine destinationName , ändern. Aber nicht ändern sourceName S.
     
* Sie können die Reihenfolge der dataVariable s oder sie entfernen.


    * Sie können dann verwenden [DasDds](#dasdds)   (siehe unten) wiederholt das XML für diesen Datensatz testen, um sicherzustellen, dass der resultierende Datensatz angezeigt wird, wie Sie es in ERDDAP .
    * Fühlen Sie sich frei, kleine Änderungen an der datasets.xml chunk, die beispielsweise erzeugt wurde, liefern eine bessere infoUrl , Zusammenfassung oder Titel.
#### doNotAddStandardNames{#donotaddstandardnames} 
Wenn Sie \\-doNotAddStandardNames als Befehlszeilenparameter einschließen, wenn Sie ausführen Datensätze Xml, erzeugen Datensätze Xml wird nicht hinzugefügt standard\\_name in der addAttributes für andere Variablen als Variablen, genannt Breite, Länge, Höhe, Tiefe oder Zeit (die offensichtlich sind standard\\_name S) . Dies kann nützlich sein, wenn Sie die Ausgabe aus der Erzeugung verwenden Datensätze Xml direkt in ERDDAP™ ohne die Ausgabe zu bearbeiten, weil Datensätze Xml erraten oft standard\\_name s falsch. (Beachten Sie, dass wir immer empfehlen, dass Sie die Ausgabe bearbeiten, bevor Sie sie in ERDDAP .) Mit diesem Parameter werden andere kleinere verwandte Effekte haben, weil die erraten standard\\_name häufig für andere Zwecke verwendet wird, z.B. um ein neues zu schaffen long\\_name , und die colorBar-Einstellungen zu erstellen.
#### Schrift{#scripting} 
Als Alternative zur interaktiven Beantwortung der Fragen an der Tastatur und Schleife, um zusätzliche Datensätze zu erzeugen, können Sie Befehlszeilenargumente bereitstellen, um alle Fragen zu beantworten, um einen Datensatz zu erzeugen. Datensätze generieren Xml verarbeitet diese Parameter, schreibt die Ausgabe in die Ausgabedatei und verlässt das Programm.
        
Um dies einzurichten, verwenden Sie zuerst das Programm im interaktiven Modus und schreiben Sie Ihre Antworten auf. Hier ist ein Teilbeispiel:
Sagen wir, Sie führen das Skript: ./GenerateDatasetsXml.sh
Geben Sie dann ein: EDDTableFromAsciiFiles
Geben Sie dann ein: /u00/data/
Geben Sie dann ein:
Geben Sie dann ein: /u00/data/sampleFile.asc
Geben Sie dann ein: ISO-8859-1
        
Um dies nicht interaktiv auszuführen, verwenden Sie diese Befehlszeile:
./GenerateDatasetsXml.sh EDDTableFromAsciiFiles /u00/data/ .\\*\\.asc /u00/data/sampleFile.asc ISO-8859-1
Also im Grunde, Sie nur alle Antworten auf der Kommandozeile.
Dies sollte für Datensätze nützlich sein, die sich häufig in einer Weise ändern, die re-running GenerateDatasets erfordert Xml (insbesondere EDDGrid VonThreddsCatalog) .
        
Details:

* Enthält ein Parameter einen Raum oder ein bestimmtes Zeichen, so kodiert der Parameter als ein [JSON-Stil String](https://www.json.org/json-en.html) , z.B. "mein Parameter mit Räumen und zwei \\n Linien".
* Wenn Sie einen leeren String als Parameter angeben möchten, verwenden Sie: nichts
* Wenn Sie den Standardwert eines Parameters angeben möchten, verwenden Sie: default
             
* Datensätze generieren Xml unterstützt a -i *Datensätze XmlName* # *Tag und Tag* Befehlszeilenparameter, der den Ausgang in den angegebenen datasets.xml Datei (Der Standard ist *Tomcat* /Fortsetzung/Erlaubung/ datasets.xml ) . Datensätze generieren Xml sucht zwei Zeilen in Datensätzen XmlName:
```
        <!-- Begin GenerateDatasetsXml #*tagName someDatetime* -->  
```
und
```
        <!-- End GenerateDatasetsXml #*tagName someDatetime* -->  
```
und ersetzt alles zwischen diesen Zeilen durch den neuen Inhalt, und ändert die irgendwannDatetime.
* Der -i-Schalter wird nur bearbeitet (und Änderungen datasets.xml werden nur gemacht) wenn Sie GenerateDatasets ausführen Xml mit Kommandozeilen-Argumenten, die alle Antworten auf alle Fragen für eine Schleife des Programms angeben. (Siehe oben 'Schrift'.)   (Das Denken ist: Dieser Parameter ist für die Verwendung mit Skripten. Wenn Sie das Programm im interaktiven Modus verwenden (Eingabe von Informationen auf der Tastatur) , Sie werden wahrscheinlich einige falsche chunks von XML generieren, bevor Sie die, die Sie wollen.) 
* Werden die Anfangs- und Endzeilen nicht gefunden, so werden diese Zeilen und der neue Inhalt vorab eingefügt.&lt;/erddapDatasets&gt;.
* Es gibt auch eine (Kapital i) Schalter für Testzwecke, die das gleiche wie -i, aber erstellt eine Datei namens datasets.xml  *Datum* und ändert sich nicht datasets.xml .
* Nicht ausführen GenerateDatasets Xml mit -i in zwei Prozessen auf einmal. Es gibt eine Chance, dass nur eine Reihe von Änderungen beibehalten werden. Es könnte ernste Probleme geben (zum Beispiel beschädigte Dateien) .
    
Wenn Sie "GenerateDatasetsXml -verbose" verwenden, wird es mehr Diagnosenachrichten als üblich drucken.
    
#### Sonder-/Pseudo-Datensatztypen{#specialpseudo-dataset-types} 
Im Allgemeinen die EDDType Optionen in GenerateDatasets Xml Übereinstimmung der in diesem Dokument beschriebenen EDD-Typen (siehe [Liste der Datensätze](#list-of-types-datasets) ) und erzeugen eines datasets.xml chunk, um einen Datensatz aus einer bestimmten Datenquelle zu erstellen. Es gibt einige Ausnahmen und Sonderfälle:
    
#####  EDDGrid Von Erddap{#eddgridfromerddap} 
Dieser EDDType generiert alle datasets.xml benötigte Stücke [ EDDGrid Von Erddap](#eddfromerddap) Datensätze aus allen EDDGrid Datensets in einer Fernbedienung ERDDAP . Sie haben die Möglichkeit, das Original zu halten datasetID S (die einige duplizieren können datasetID schon in deiner ERDDAP ) oder neue Namen generieren, die einzigartig werden (aber in der Regel nicht als menschlich lesbar) .
     
##### EDDTableFromErddap{#eddtablefromerddap} 
Dieser EDDType generiert alle datasets.xml benötigte Stücke [EDDTableFromErddap](#eddfromerddap) Datensätze von allen EDDTable-Datensätzen in einer Fernbedienung ERDDAP . Sie haben die Möglichkeit, das Original zu halten datasetID S (die einige duplizieren können datasetID schon in deiner ERDDAP ) oder neue Namen generieren, die einzigartig werden (aber in der Regel nicht als menschlich lesbar) .
     
#####  EDDGrid VonThreddsCatalog{#eddgridfromthreddscatalog} 
Dieser EDDType generiert alle datasets.xml für alle [ EDDGrid VonDap](#eddgridfromdap) Datensätze, die sie finden können, indem sie durch einen THREDDS wiederkehren (Teil) Katalog. Es gibt viele Formen von THREDDS Katalog URLs. Diese Option REQUIRES eine THREDDS .xml URL mit /catalog/ darin zum Beispiel
https://oceanwatch.pfeg.noaa.gov/thredds/catalog/catalog.xmloder
https://oceanwatch.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml  
(ein verwandter .html-Katalog ist bei
https://oceanwatch.pfeg.noaa.gov/thredds/Satellite/aggregsatMH/chla/catalog.html, die für EDDGrid VonThreddsCatalog).
Wenn Sie Probleme mit EDDGrid VonThredds Katalog:
* Stellen Sie sicher, dass die URL, die Sie verwenden, gültig ist, enthält /catalog/ und endet mit /catalog.xml .
* Wenn möglich, nutzen Sie eine öffentliche IP-Adresse (zum Beispiel,https://oceanwatch.pfeg.noaa.gov) in der URL keine lokale numerische IP-Adresse (zum Beispiel,https://12.34.56.78) . Wenn die THREDDS nur über die lokale numerische IP-Adresse erreichbar ist, können Sie [&lt;ConvertToPublicSourceUrl&gt;] (#converttopublicsourceurl) also ERDDAP™ Benutzer sehen die öffentliche Adresse, obwohl ERDDAP™ erhält Daten von der lokalen numerischen Adresse.
* Wenn Sie Probleme haben, die Sie nicht lösen können, [die Fehlersuche Tipps überprüfen](#troubleshooting-tips) .
* Der Low-Level-Code hierfür verwendet jetzt die Unidata netcdf-java Katalog Raupencode (Drredds. Katalogklassen) so dass es alle THREDDS Kataloge handhaben kann (die überraschenderweise komplex sein kann) Dank Unidata für diesen Code.
         
#####  EDDGrid LonPM180FromErddapCatalog{#eddgridlonpm180fromerddapcatalog} 
Dieser EDDType erzeugt die datasets.xml zu machen [ EDDGrid LonPM180](#eddgridlonpm180) Datensätze aus allen EDDGrid Datensätze in einem ERDDAP die alle Längenwerte größer als 180 haben.
* Wenn möglich, nutzen Sie eine öffentliche IP-Adresse (zum Beispiel,https://oceanwatch.pfeg.noaa.gov) in der URL keine lokale numerische IP-Adresse (zum Beispiel,https://12.34.56.78) . Wenn ERDDAP™ nur über die lokale numerische IP-Adresse erreichbar ist, können Sie [&lt;ConvertToPublicSourceUrl&gt;] (#converttopublicsourceurl) also ERDDAP™ Benutzer sehen die öffentliche Adresse, obwohl ERDDAP™ erhält Daten von der lokalen numerischen Adresse.
         
#####  EDDGrid Lon0360FromErddapCatalog{#eddgridlon0360fromerddapcatalog} 
Dieser EDDType erzeugt die datasets.xml zu machen [ EDDGrid Lon0360](#eddgridlon0360) Datensätze aus allen EDDGrid Datensätze in einem ERDDAP die Längenwerte kleiner als 0 haben.
* Wenn möglich, nutzen Sie eine öffentliche IP-Adresse (zum Beispiel,https://oceanwatch.pfeg.noaa.gov) in der URL keine lokale numerische IP-Adresse (zum Beispiel,https://12.34.56.78) . Wenn ERDDAP™ nur über die lokale numerische IP-Adresse erreichbar ist, können Sie [&lt;ConvertToPublicSourceUrl&gt;] (#converttopublicsourceurl) also ERDDAP™ Benutzer sehen die öffentliche Adresse, obwohl ERDDAP™ erhält Daten von der lokalen numerischen Adresse.
         
##### EDDsFromFiles{#eddsfromfiles} 
Bei einem Startverzeichnis durchläuft diese das Verzeichnis und alle Unterverzeichnisse und versucht, für jede Gruppe von Datendateien einen Datensatz zu erstellen, den es findet.
* Dies geht davon aus, dass der Datensatz, wenn ein Datensatz gefunden wird, alle Unterverzeichnisse enthält.
* Wird ein Datensatz gefunden, werden ähnliche Geschwister als separate Datensätze behandelt. (z.B. werden die Verzeichnisse für die 1990er Jahre, die 2000er Jahre, die 2010er Jahre, separate Datensätze generieren) . Sie sollten leicht von Hand zu kombinieren sein -- ändern Sie einfach den ersten Datensatz&lt;fileDir&gt; zum Stammverzeichnis und alle nachfolgenden Geschwisterdatensätze löschen.
* Dies wird nur versuchen, ein Stück von datasets.xml für den häufigsten Dateierweiterungstyp in einem Verzeichnis (nicht Zählen .md5, die ignoriert wird) . Also, gegeben ein Verzeichnis mit 10 .nc Dateien und 5.txt Dateien, ein Datensatz wird für die .nc Nur Dateien.
* Dies geht davon aus, dass alle Dateien in einem Verzeichnis mit der gleichen Erweiterung im selben Datensatz gehören. Wenn ein Verzeichnis einige .nc Dateien mit SST-Daten und einigen .nc Dateien mit Chlorophyll-Daten, nur eine Probe .nc Datei wird gelesen (SST? Chlorophyll?) und nur ein Datensatz wird für diese Art von Datei erstellt. Dieser Datensatz wird wahrscheinlich nicht laden, weil Komplikationen versuchen, zwei Arten von Dateien in den gleichen Datensatz laden.
* Wenn es weniger als 4 Dateien mit der häufigsten Erweiterung in einem Verzeichnis gibt, wird davon ausgegangen, dass sie keine Datendateien sind und nur das Verzeichnis überspringen.
* Wenn es 4 oder mehr Dateien in einem Verzeichnis, aber dies kann nicht erfolgreich ein Stück von datasets.xml für die Dateien (zum Beispiel einen nicht unterstützten Dateityp) , dies wird eine [EDDTableFromFileNames](#eddtablefromfilenames) Datensatz für die Dateien.
* Am Ende der Diagnosen, die dies in die Log-Datei schreibt, kurz vor der datasets.xml chunks, dies wird eine Tabelle mit einer Zusammenfassung von Informationen, die durch alle Unterverzeichnisse gesammelt werden. Die Tabelle listet alle Unterverzeichnisse auf und gibt die häufigsten Arten von Dateierweiterungen an, die Gesamtzahl der Dateien und welche Art von Datensätzen für diese Dateien erstellt wurden. (wenn) . Wenn Sie mit einer komplexen, tief geschachtelten Dateistruktur konfrontiert sind, beachten Sie die Ausführung von GenerateDatasets Xml mit EDDType=EDDsFromFiles nur um diese Informationen zu generieren,
* Diese Option kann nicht eine große Aufgabe, den besten EDDType für eine bestimmte Gruppe von Datendateien zu erraten, aber es ist schnell, einfach und lohnt einen Versuch. Wenn die Quelldateien geeignet sind, funktioniert es gut und ist ein guter erster Schritt bei der Generierung der datasets.xml für ein Dateisystem mit vielen Unterverzeichnissen, jeweils mit Datendateien aus verschiedenen Datensätzen.
         
##### EDDTableFromEML und EDDTableFromEMLBatch{#eddtablefromeml-and-eddtablefromemlbatch} 
Diese spezielle EDDType erzeugt die datasets.xml um ein [EDDTableFromAsciiFiles](#eddtablefromasciifiles) Datensatz aus jedem der in einer [Ökologische Metadatensprache](https://knb.ecoinformatics.org/external//emlparser/docs/index.html) XML-Datei. Die "Batch"-Variante arbeitet an allen EML-Dateien in einem lokalen oder Remote-Verzeichnis. Bitte sehen Sie die separate [Dokumentation für EDDTableFromEML](/docs/server-admin/EDDTableFromEML) .
     
##### EDDTableFromInPort{#eddtablefrominport} 
Diese spezielle EDDType erzeugt die datasets.xml um ein [EDDTableFromAsciiFiles](#eddtablefromasciifiles) Datensatz aus der Information in einem [Inport-xml](https://inport.nmfs.noaa.gov/inport) Datei. Wenn Sie Zugriff auf die Quelldatendatei erhalten können (die inport-xml-Datei sollte Hinweise haben, wo sie finden) , Sie können einen Arbeitsdatensatz in ERDDAP .

Die folgenden Schritte zeigen, wie man GenerateDatasets verwendet Xml mit einer inport-xml-Datei, um einen Arbeitsdatensatz in ERDDAP .

1. Sobald Sie Zugriff auf die inport-xml-Datei haben (entweder als URL oder als lokale Datei) : Run GenerateDatasets Xml, geben Sie EDDType=EDDTableFromInPort an, geben Sie die inport-xml URL oder den vollständigen Dateinamen an, welcheChild=0 und geben Sie die anderen angeforderten Informationen an (wenn bekannt) . (An dieser Stelle müssen Sie nicht die Quelldatendatei haben oder ihren Namen angeben.) Die Einstellung, dieChild=0 sagt GenerateDatasets Xml zum Ausschreiben der Informationen für **alle** von&lt;Entity-attribute-Information&gt;&lt;Entity&gt;'s in der inport-xml-Datei (wenn es) . Es druckt auch eine Hintergrundinformationen Zusammenfassung, einschließlich aller Download-urls in der inport-xml-Datei aufgelistet.
2. Sehen Sie durch alle Informationen (einschließlich der Hintergrundinformationen, die Datasets generieren Xml Drucke) und besuchen Sie das download-url (S) um zu versuchen, die Quelldatendatei zu finden (S) . Wenn Sie es finden (sie) , herunterladen (sie) in ein Verzeichnis, das zugänglich ist ERDDAP . (Wenn Sie keine Quelldaten-Dateien finden können, gibt es keinen Punkt beim Weiterfahren.) 
3. Start Generieren Datensätze Xml wieder.
Wenn die Quelldatendatei einer der inport-xml-Datei entspricht&lt;Entity-attribute-Information&gt;&lt;Unternehmen&gt;'s, angeben, welcheChild= *Das ist die Sache.*   (z.B. 1, 2, 3, ...) . ERDDAP™ wird versuchen, die Spaltennamen in der Quelldatendatei an Namen in der Entity-Information anzupassen, und die Aufforderung, Abweichungen zu akzeptieren/abzuwerfen/fixieren.
Oder wenn die inport-xml-Datei keine hat&lt;Entity-attribute-Information&gt;&lt;Entity&gt;'s, angeben, welcheChild=0.
4. Im Stück datasets.xml die von GenerateDatasets gemacht wurde Xml, die [globale&lt; addAttributes &gt; (#global-attributes) nach Bedarf/erwartet.
5. Im Stück datasets.xml die von GenerateDatasetsXml gemacht wurde, fügen Sie die [&lt; dataVariable &gt; (#datavariable) Informationen nach Bedarf/erwartet, um jede der Variablen zu beschreiben. Stellen Sie sicher, dass Sie jede Variable richtig identifizieren
(&lt; sourceName &gt; (#sourcename)   (wie es in der Quelle erscheint) ,
(&lt; destinationName &gt; (#destinationname)   (die mehr Einschränkungen auf erlaubten Zeichen als sourceName ) ,
(&lt;Einheiten (#units)   (besonders wenn es [Zeit- oder Zeitstempelvariable](#timestamp-variables) wo die Einheiten das Format angeben müssen) , und
(&lt; missing\\_value &gt; (#missing_value) ,
6. Wenn Sie in der Nähe der Fertigstellung sind, verwenden Sie wiederholt die [DasDds](#dasdds) Tool, um schnell zu sehen, ob die Datensatzbeschreibung gültig ist und ob der Datensatz in ERDDAP™ wie du willst.
     

Es wäre toll, wenn Gruppen, die InPort verwenden, ihre Datensätze zu dokumentieren, auch verwenden würden ERDDAP™ die tatsächlichen Daten zur Verfügung zu stellen:

*    ERDDAP™ ist eine Lösung, die sofort verwendet werden kann, damit Sie erfüllen können NOAA ' [Öffentlicher Zugang zu Forschungsergebnissen (PARR) Anforderungen](https://nosc.noaa.gov/EDMC/PD.DSP.php) Im Moment, nicht zu einer gewissen Zeit in der Zukunft.
*    ERDDAP™ stellt die tatsächlichen Daten den Nutzern zur Verfügung, nicht nur die Metadaten. (Wie gut sind Metadaten ohne Daten?) 
*    ERDDAP™ unterstützt Metadaten (insbesondere die Einheiten von Variablen) , im Gegensatz zu anderen Datenserver-Software berücksichtigt werden. (Wie gut sind Daten ohne Metadaten?) Um Software zu verwenden, die keine Metadaten unterstützt, ist es, die Daten einzuladen, missverstanden und missverwendet zu werden.
*    ERDDAP™ ist frei und Open-Source-Software im Gegensatz zu einer anderen Software betrachtet werden. Fortschreitende Entwicklung ERDDAP™ wird bereits bezahlt. Unterstützung für ERDDAP™ Benutzer sind kostenlos.
*    ERDDAP 's Aussehen kann leicht angepasst werden, um Ihre Gruppe zu reflektieren und hervorzuheben (nicht ERD oder ERDDAP ) .
*    ERDDAP™ bietet einen konsistenten Zugriff auf alle Datensätze.
*    ERDDAP™ kann Daten aus vielen Arten von Datendateien und aus relationalen Datenbanken lesen.
*    ERDDAP™ kann mit großen Datensätzen umgehen, einschließlich Datensätze, in denen die Quelldaten in vielen Datendateien liegen.
*    ERDDAP™ kann auf Anfrage des Nutzers Daten an viele Arten von Datendateien schreiben, einschließlich wissenschaftlicher Datendateitypen wie netCDF, ESRI .csv und ODV .txt .
*    ERDDAP™ kann benutzerdefinierte Grafiken und Karten von Untergruppen der Daten erstellen, basierend auf den Spezifikationen des Benutzers.
*    ERDDAP™ kann mit Nicht-Daten-Datensätzen wie Sammlungen von Bild-, Video- oder Audiodateien umgehen.
*    ERDDAP™ wurde installiert und verwendet [mehr als 60 Institutionen weltweit](/#who-uses-erddap) .
*    ERDDAP™ wird als einer der Datenserver aufgeführt, die für die Nutzung innerhalb der NOAA in der [ NOAA Datenschutzrichtlinie](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) , im Gegensatz zu einer anderen Software betrachtet werden.
*    ERDDAP™ ist ein Produkt von NMFS / NOAA , so verwenden Sie es innerhalb NMFS und NOAA sollte ein Punkt des Stolzes sein NMFS und NOAA .

Bitte geben Sie ERDDAP™ einen Versuch. Wenn Sie Hilfe benötigen, schreiben Sie bitte eine Nachricht in der ERDDAP™ Google-Gruppe.
     
##### AddFillValueAttribute{#addfillvalueattributes} 
Diese spezielle EDDType Option ist kein Datensatztyp. Es ist ein Tool, das \\_FillValue Attribute zu einigen Variablen in einigen Datensätzen hinzufügen kann. Vgl. [AddFillValueAttribute](#add-_fillvalue-attributes) .
     
##### findenDuplicate Zeit{#findduplicatetime} 
Diese spezielle EDDType Option ist kein Datensatztyp. Stattdessen sagt es GenerateDatasets Xml zur Suche durch eine Sammlung von gegitterten .nc   (und verwandt) Dateien, um eine Liste von Dateien mit doppelten Zeitwerten zu finden und auszudrucken. Wenn es die Zeitwerte betrachtet, wandelt es sie von den ursprünglichen Einheiten in "seconds since 1970-01-01" falls verschiedene Dateien verschiedene Einheiten Strings verwenden. Sie müssen das Startverzeichnis bereitstellen (mit oder ohne Nachschub) , der Dateiname regulärer Ausdruck (z.B., .nc  ) , und der Name der Zeitvariable in den Dateien.
     
##### ncdump{#ncdump} 
Diese spezielle EDDType Option ist kein Datensatztyp. Stattdessen sagt es GenerateDatasets Xml zum Drucken [ncdump](https://linux.die.net/man/1/ncdump) \\-ähnlicher Ausdruck eines .nc , .nc ml oder .hdf Datei. Es verwendet tatsächlich die netcdf-java's [NCdump](https://docs.unidata.ucar.edu/netcdf-java/5.4/javadoc/ucar/nc2/write/Ncdump.html) , die ein begrenzteres Werkzeug als die C-Version von NCdump ist. Wenn Sie diese Option verwenden, GenerateDatasetsXml wird Sie bitten, eine der Optionen zu verwenden: "-h" (Kopf) , "-c" (Koordinaten vars) , "-vall" (Standard) "-v var1;var2", "-v var1 (0,0:10,0:20) ". Dies ist nützlich, denn ohne ncdump ist es schwer zu wissen, was in einem .nc , .nc ml oder .hdf Datei und damit, welche EDDType Sie für GenerateDatasets festlegen sollten Xml. Für einen .nc ml-Datei, dies wird die ncdump Ausgabe für das Ergebnis der .nc Änderungen der Datei in der zugrunde liegenden Datei .nc oder .hdf Datei.
         
### DasDds{#dasdds} 
*    [ **DasDds** ](#dasdds) ist ein Befehlszeilenprogramm, das Sie verwenden können, nachdem Sie einen ersten Versuch im XML für einen neuen Datensatz in datasets.xml . Mit DasDds können Sie das XML wiederholt testen und verfeinern. Wenn Sie das DasDds-Programm verwenden:
    1. Unter Windows, das erste Mal, wenn Sie DasDds ausführen, müssen Sie das DasDds bearbeiten. bat-Datei mit einem Text-Editor, um den Pfad zur Java zu ändern. exe Datei, so dass Windows Java .
    2. DasDds fragt Sie nach dem datasetID für den Datensatz, an dem Sie arbeiten.
    3. DasDds versucht, den Datensatz mit diesem zu erstellen datasetID .
        * DasDds druckt immer viele Diagnosenachrichten.
Wenn Sie "DasDds -verbose" verwenden, wird DasDds mehr Diagnosenachrichten als üblich drucken.
        * Für die Sicherheit löscht DasDds immer alle Datensatzinformationen (Dateien) für den Datensatz vor dem Versuch, den Datensatz zu erstellen. Dies entspricht der Einstellung a [harte Flagge](/docs/server-admin/additional-information#hard-flag) Für aggregierte Datensätze können Sie die DateiNameRegex vorübergehend anpassen, um die Anzahl der Dateien zu begrenzen, die der Datenkonstruktor findet.
        * Wenn der Datensatz nicht geladen wird (aus welchem Grund) , DasDds wird Ihnen die Fehlermeldung für den ersten Fehler anzeigen.
             **Versuchen Sie nicht zu erraten, was das Problem sein könnte. Lesen Sie die ERROR-Nachricht sorgfältig.**   
Falls erforderlich, lesen Sie die vorhergehenden Diagnosenachrichten, um weitere Hinweise und Informationen zu finden.
        *    **Machen Sie eine Änderung im XML des Datensatzes, um THAT Problem zu lösen**   
und lass DasDds versuchen, den Datensatz wieder zu erstellen.
        *    **Wenn Sie immer wieder jedes Problem lösen, werden Sie schließlich alle Probleme lösen**   
und der Datensatz wird geladen.
    4. Alle DasDds Ausgänge (Diagnosen und Ergebnisse) auf den Bildschirm geschrieben und *BigParentDirectory* /logs/DasDds.log .
    5. Wenn DasDds den Datensatz erstellen kann, zeigt DasDds Ihnen dann die [.das (Datensatz Attributstruktur) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_das) , [.ddd (Datensatz Deskriptor Struktur) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_dds) , und [.timeGaps (Zeitlücken) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps) Informationen für den Datensatz auf Ihrem Bildschirm und schreiben Sie sie an *BigParentDirectory* /logs/DasDds.out .
    6. Oft möchten Sie eine kleine Änderung im XML des Datensatzes vornehmen, um die Metadaten des Datensatzes zu reinigen und DasDds neu zu führen.

### Bonus Drittanbieter-Tool: ERDDAP - Lint{#bonus-third-party-tool-erddap-lint} 
 ERDDAP -lint ist ein Programm von Rob Fuller und Adam Leadbetter des Irish Marine Institute, das Sie verwenden können, um die Metadaten Ihrer ERDDAP™ Datensätze. ERDDAP -lint "enthält Regeln und eine einfache statische Web-Anwendung für die Durchführung einiger Überprüfungstests gegen Ihre ERDDAP™ Server. Alle Tests werden im Webbrowser durchgeführt." Wie die [Unix/Linux Lint Tool](https://en.wikipedia.org/wiki/Lint_(software) ), Sie können die bestehenden Regeln bearbeiten oder neue Regeln hinzufügen. Vgl. [ ERDDAP - Lint](https://github.com/IrishMarineInstitute/erddap-lint) für weitere Informationen.

Dieses Tool ist besonders nützlich für Datensätze, die Sie vor einiger Zeit erstellt haben und jetzt mit Ihren aktuellen Metadatenpräferenzen aktualisiert werden wollen. Zum Beispiel frühe Versionen von GenerateDatasets Xml hat sich nicht darum bemüht, weltweit zu schaffen creator\\_name , creator\\_email , creator\\_type oder creator\\_url Metadaten. Sie könnten benutzen ERDDAP -die Datensätze zu identifizieren, die diesen Metadaten-Attributen fehlen.

Dank Rob und Adam für die Erstellung dieses Tools und die Bereitstellung ERDDAP™ Gemeinschaft.
 
## Die Grundstruktur der datasets.xml Datei{#the-basic-structure-of-the-datasetsxml-file} 
Die gewünschten und optionalen Tags in a datasets.xml Datei (und die Anzahl der Zeiten, die sie erscheinen können) sind unten dargestellt. In der Praxis, Ihr datasets.xml wird viel haben&lt;dataset&gt;s Tags und nur die anderen Tags innerhalb&lt;erdddapDatasets&gt; nach Bedarf.

  >&nbsp;&lt;&#63;xml version="1.0" encoding="ISO-8859-1" &#63;>  
  >&nbsp;&lt;erddapDatasets>  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeUnits>](#angulardegreeunits)...&lt;/angularDegreeUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeTrueUnits>](#angulardegreetrueunits)...&lt;/angularDegreeTrueUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;cacheMinutes>](#cacheminutes)...&lt;/cacheMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;commonStandardNames>](#commonstandardnames)...&lt;/commonStandardNames> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateRequestCSVExample />](#convertinterpolaterequestcsvexample) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateDatasetIDVariableList />](#convertinterpolatedatasetidvariablelist) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertToPublicSourceUrl />](#converttopublicsourceurl) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxGB>](#decompressed-cache)...&lt;/decompressedCacheMaxGB> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxMinutesOld>](#decompressed-cache)...&lt;/decompressedCacheMaxMinutesOld> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;drawLandMask>](#drawlandmask)...&lt;/drawLandMask> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;emailDiagnosticsToErdData>](#emaildiagnosticstoerddata)...&lt;/emailDiagnosticsToErdData> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;graphBackgroundColor>](#graphbackgroundcolor)...&lt;/graphBackgroundColor> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequests>](#ipaddressmaxrequests)...&lt;/ipAddressMaxRequests> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequestsActive>](#ipaddressmaxrequestsactive)...&lt;ipAddressMaxRequestsActive> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressUnlimited>](#ipaddressunlimited)...&lt;ipAddressUnlimited> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMinMinutes>](#loaddatasetsminminutes)...&lt;/loadDatasetsMinMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMaxMinutes>](#loaddatasetsmaxminutes)...&lt;/loadDatasetsMaxMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;logLevel>](#loglevel)...&lt;/logLevel> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nGridThreads>](#nthreads)...&lt;/nGridThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nTableThreads>](#nthreads)...&lt;/nTableThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;palettes>](#palettes)...&lt;/palettes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxBytes>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxBytes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxCells>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxCells> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;requestBlacklist>](#requestblacklist)...&lt;/requestBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;slowDownTroubleMillis>](#slowdowntroublemillis)...&lt;/slowDownTroubleMillis> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;subscriptionEmailBlacklist>](#subscriptionemailblacklist)...&lt;/subscriptionEmailBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;unusualActivity>](#unusualactivity)...&lt;/unusualActivity> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;updateMaxEvents>](#updatemaxevents)...&lt;/updateMaxEvents> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;standardLicense>](#standard-text)...&lt;/standardLicense> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardContact>](#standard-text)...&lt;/standardContact> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDataLicenses>](#standard-text)...&lt;/standardDataLicenses> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfEndorsement>](#standard-text)...&lt;/standardDisclaimerOfEndorsement> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfExternalLinks>](#standard-text)...&lt;/standardDisclaimerOfExternalLinks> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardGeneralDisclaimer>](#standard-text)...&lt;/standardGeneralDisclaimer> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardPrivacyPolicy>](#standard-text)...&lt;/standardPrivacyPolicy> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startHeadHtml5>](#standard-text)...&lt;/startHeadHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startBodyHtml5>](#standard-text)...&lt;/startBodyHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;theShortDescriptionHtml>](#standard-text)...&lt;/theShortDescriptionHtml> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;endBodyHtml5>](#standard-text)...&lt;/endBodyHtml5> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;user username="..." password="..." roles="..." />](#user) &lt;!-- 0 or more -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;dataset>](#list-of-types-datasets)...&lt;/dataset> &lt;!-- 1 or more -->  
  >&nbsp;&lt;/erddapDatasets>  

Es ist möglich, dass in Zukunft andere Kodierungen erlaubt werden, aber jetzt wird nur ISO-8859-1 empfohlen.
 
### XI{#xinclude} 
Neu in Version 2.25 ist Unterstützung für XInclude. Dies erfordert, dass Sie den SAX Parser verwenden&lt;VerwendungSaxParser&gt;true&lt;/useSaxParser&gt; in Ihrem setup.xml. Dies kann es Ihnen ermöglichen, jeden Datensatz in einer eigenen Datei zu schreiben, dann enthalten sie alle in der Hauptsache datasets.xml , Teile von Datensatzdefinitionen wiederverwenden, oder beide. Wenn Sie ein Beispiel sehen möchten, [EDDTestDataset.java](https://github.com/ERDDAP/erddap/blob/main/src/test/java/testDataset/EDDTestDataset.java) setzt XInclude ein, um variable Definitionen wiederzuverwenden.
 

- - Ja.

## Anmerkungen{#notes} 

Arbeiten mit dem datasets.xml Datei ist ein nicht-triviales Projekt. Bitte lesen Sie alle diese Notizen sorgfältig. Nach der Auswahl [Datensatztyp](#list-of-types-datasets) , bitte lesen Sie die ausführliche Beschreibung davon sorgfältig.
     
### Auswahl des Datensatztyps{#choosing-the-dataset-type} 
In den meisten Fällen gibt es nur einen ERDDAP™ Datensatztyp, der für eine bestimmte Datenquelle geeignet ist. In einigen Fällen (z.B., .nc Dateien) , es gibt ein paar Möglichkeiten, aber in der Regel eine von ihnen ist definitiv am besten. Die erste und größte Entscheidung, die Sie treffen müssen, ist: ist es angemessen, den Datensatz als Gruppe von multidimensionalen Arrays zu behandeln (wenn ja, sehen Sie [ EDDGrid Datensatztypen](#eddgrid) ) oder als Datenbank-ähnliche Datentabelle (wenn ja, sehen Sie [EDDTable Datensatztypen](#eddtable) ) .
     
### Die Daten als I{#serving-the-data-as-is} 
In der Regel gibt es keine Notwendigkeit, die Datenquelle zu ändern (z.B. die Dateien in einen anderen Dateityp konvertieren) und ERDDAP™ kann es dienen. Eine der Annahmen von ERDDAP™ ist, dass die Datenquelle verwendet wird, wie es ist. Normalerweise funktioniert das gut. Einige Ausnahmen sind:
* Beziehungsdatenbanken und Cassandra -- ERDDAP™ können Daten direkt aus relationalen Datenbanken und Cassandra dienen. Aber für Sicherheits-, Lastausgleichs- und Leistungsprobleme können Sie eine andere Datenbank mit den gleichen Daten einrichten oder die Daten speichern. NetCDF V3 .nc Dateien und haben ERDDAP™ den Daten aus der neuen Datenquelle dienen. Vgl. [EDDTableFromDatabase](#eddtablefromdatabase) und [EDDTableFromCassandra](#eddtablefromcassandra) .
* Nicht unterstützte Datenquellen -- ERDDAP™ kann eine große Anzahl von Arten von Datenquellen unterstützen, aber die Welt ist gefüllt mit 1000's (Millionen?) von verschiedenen Datenquellen (insbesondere Datendateistrukturen) . wenn ERDDAP™ unterstützt Ihre Datenquelle nicht:
    * Ist die Datenquelle NetCDF   .nc Dateien, können Sie verwenden [NcML](#ncml-files) die Datendateien auf dem Flug ändern oder verwenden [ NCO ](#netcdf-operators-nco) um die Datendateien dauerhaft zu ändern.
    * Sie können die Daten an einen Datenquellentyp schreiben, der ERDDAP™ unterstützt. NetCDF -3 .nc Dateien sind eine gute, allgemeine Empfehlung, weil sie binäre Dateien sind, die ERDDAP™ kann sehr schnell lesen. Für tabellarische Daten, betrachten Sie die Speicherung der Daten in einer Sammlung .nc Dateien, die die [CF Diskrete Sampling Geometrien (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Ragged Array Datenstrukturen und so mit ERDDAP ' [EDDTableFromNcCFFiles](#eddtablefromnccffiles) ) Wenn sie logisch organisiert sind (jeder mit Daten für ein Stück Raum und Zeit) , ERDDAP™ kann Daten sehr schnell aus ihnen extrahieren.
    * Sie können verlangen, dass die Unterstützung dieser Datenquelle hinzugefügt wird ERDDAP™ durch E-Mail an Chris. John bei noaa.gov.
    * Sie können die Unterstützung für diese Datenquelle hinzufügen, indem Sie den Code schreiben, um es selbst zu handhaben. Vgl. [die ERDDAP™ Programmer's Guide](/docs/contributing/programmer-guide) 
* Geschwindigkeit -- ERDDAP™ kann Daten aus einigen Datenquellen viel schneller als andere lesen. Zum Beispiel lesen NetCDF V3 .nc Dateien sind schnell und lesen ASCII Dateien ist langsamer. Und wenn es ein großes (&gt;1000) oder groß (&gt; 10.000) Anzahl der Quelldatendateien, ERDDAP™ wird auf einige Datenanfragen langsam reagieren. Normalerweise ist der Unterschied für den Menschen nicht spürbar. Allerdings, wenn Sie denken ERDDAP™ ist für einen bestimmten Datensatz langsam, Sie können das Problem lösen, indem Sie die Daten zu einem effizienteren Setup schreiben (meist: ein paar, gut strukturiert, NetCDF V3 .nc Dateien) . Für tabellarische Daten siehe [dieser Rat](#millions-of-files) .
         
### Hinweis{#hint} 
Es ist oft einfacher, das XML für einen Datensatz zu generieren, indem eine Kopie einer Arbeitsdatensatz-Beschreibung in dataset.xml erstellt und dann modifiziert wird.
    
### Kodierung von Sonderzeichen{#encoding-special-characters} 
Seit datasets.xml ist eine XML-Datei, Sie müssen [&amp; Codierung](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML) "&", "&lt;", und "&gt;" in allen Inhalten als "&amp", "&lt;", und "&gt".
Falsch:&lt;Titel Zeit und Zeit&lt;/Titel
Richtig:&lt;Titel Zeit und Zeit&lt;/Titel
     
### XML toleriert keine Syntaxfehler{#xml-doesnt-tolerate-syntax-errors} 
Nachdem Sie die dataset.xml-Datei bearbeiten, ist es eine gute Idee, zu überprüfen, ob das Ergebnis ist [gut ausgebildetes XML](https://www.w3schools.com/xml/xml_dtd.asp) indem Sie den XML-Text in einen XML-Checker wie einfügen [xmlvalidierung](https://www.xmlvalidation.com/) .
     
### Tipps zur Fehlerbehebung{#troubleshooting-tips} 
*    **Andere Möglichkeiten, Probleme mit Datensätzen zu diagnostizieren**   
Zusätzlich zu den beiden wichtigsten [Werkzeuge](#tools) ,
    *    [Pressemitteilung](/docs/server-admin/additional-information#log) ist eine Log-Datei mit allen ERDDAP Diagnosenachrichten.
    * Die [Tagesbericht](/docs/server-admin/additional-information#daily-report) hat mehr Informationen als die Statusseite, einschließlich einer Liste von Datensätzen, die nicht geladen und die Ausnahmen (Fehler) sie generierten.
    * Die [Statusseite](/docs/server-admin/additional-information#status-page) ist eine schnelle Möglichkeit zu überprüfen ERDDAP 's Status von jedem Web-Browser. Es enthält eine Liste von Datensätzen, die nicht geladen wurden (jedoch nicht die damit verbundenen Ausnahmen) und AufgabeDurchlesen von Statistiken (den Fortschritt zeigen [ EDDGrid Kopie](#eddgridcopy) und [EDDTableCopy](#eddtablecopy) Datensätze und alle [ EDDGrid VonFiles](#eddgridfromfiles) oder [EDDTableFromFiles](#eddtablefromfiles) Datensätze, die [CacheFromUrl](#cachefromurl)   (nicht kache GrößeGB) ) .
    * Wenn du feststeckst, siehst du unsere [Abschnitt zum Erhalt zusätzlicher Unterstützung](/docs/intro#support) .
         
### Sondervariablen{#special-variables} 
*    ** [Die Länge, Breite, Höhe, Tiefe, Druck und Zeit (LLAT) Variable](#destinationname)   [ destinationName ](#destinationname) s sind besonders.** 
    * Im Allgemeinen:
        * LLAT-Variablen werden bekannt gemacht ERDDAP™ wenn die Achsgröße (für EDDGrid Datensätze) oder Datenvariablen (für EDDTable-Datensätze)   [ destinationName ](#destinationname) ist "Länge", "Länge", "Halte", "Tiefe" oder "time" .
        * Wir ermutigen Sie dringend, diese Standardnamen für diese Variablen zu verwenden, wenn möglich. Keiner von ihnen ist erforderlich. Wenn Sie diese speziellen Variablennamen nicht verwenden, ERDDAP™ wird ihre Bedeutung nicht erkennen. Beispielsweise werden LLAT-Variablen speziell von Make A Graph behandelt ( * datasetID * .graph) : Wenn die X Axis-Variable "Länge" ist und die Y Axis-Variable "Länge" ist, erhalten Sie eine Karte (mit einer Standardprojektion, und mit einer Landmaske, politischen Grenzen, etc.) anstatt eines Diagramms.
        *    ERDDAP™ wird automatisch viele Metadaten zu LLAT-Variablen hinzufügen (zum Beispiel " [ ioos\\_category ](#ioos_category) ", " [Einheiten](#units) ", und mehrere standardbezogene Attribute wie "\\_CoordinateAxisType") .
        *    ERDDAP™ automatisch, on-the-fly, addieren viele globale Metadaten bezogen auf die LLAT-Werte des ausgewählten Datensubsets (zum Beispiel "geospatial\\_lon\\_min") .
        * Clients, die diese Metadatenstandards unterstützen, können die zusätzlichen Metadaten nutzen, um die Daten in Zeit und Raum zu positionieren.
        * Clients werden es leichter finden, Abfragen zu generieren, die LLAT-Variablen enthalten, weil die Variablennamen in allen relevanten Datensätzen gleich sind.
    * Für die Variable "Länge" und die Variable "Länge":
        * Verwenden Sie die [ destinationName ](#destinationname) "Länge" und "Länge" nur, wenn [Einheiten](#units) sind Grad\\_östlich bzw. Grad\\_north. Wenn Ihre Daten diesen Anforderungen nicht entsprechen, verwenden Sie verschiedene Variablennamen (z.B. x, y, lonRadians, latRadians) .
        * Wenn Sie Längen- und Breitendaten in verschiedenen Einheiten ausgedrückt haben und somit mit unterschiedlichen destinationName s, zum Beispiel, lonRadians und latRadians, Machen Sie einen Graph ( * datasetID * .graph) wird Grafiken machen (z.B. Zeitreihen) anstatt Karten.
    * Für die "Halte", "Vorgabe" oder "tiefe" Variable:
        * Verwenden Sie die [ destinationName ](#destinationname) "Höhe" zur Identifizierung der Entfernung der Daten über dem Meeresspiegel (positive="up"-Werte) . Optional können Sie "Höhe" für Entfernungen unterhalb des Meeresspiegels verwenden, wenn die Werte unter dem Meer negativ sind (oder wenn Sie beispielsweise verwenden,
(&lt;att name=" scale\\_factor "typ="int"&gt;- 1&lt;/att&gt; (#scale_factor) die Tiefenwerte in Höhenwerte umwandeln.
        * Verwenden Sie die destinationName "tiefe" zur Identifizierung der Datenabstand unter dem Meeresspiegel (positive="down"-Werte) .
        * Alternativ zu Höhen, die durch Luftdruckniveaus definiert sind (wie folgt: [Isobars](https://en.wikipedia.org/wiki/Contour_line#Barometric_pressure) ) , Sie sollten die destinationName zu "Druck". Dies unterstützt Einheiten in "hPa", "Pa", und "mbar" (positive="down"-Werte) .
        * Ein Datensatz kann nur eine "Höhe", "Druck" oder "tiefe" Variable haben.
        * Für diese "Höhe" und "tiefen" Variablen, die [Einheiten](#units) muss "m", "Meter" oder "Meter" sein. Wenn die Einheiten anders sind (zum Beispiel, Fathoms) , Sie können verwenden
(&lt;att name=" scale\\_factor &gt; *einige Wert* &lt;/att&gt; (#scale_factor) und [&lt;att name="units"&gt;meter&lt;/att&gt; (#units) die Einheiten in Meter umwandeln.
        * Wenn Ihre Daten diesen Anforderungen nicht entsprechen, verwenden Sie eine andere destinationName   (z.B. oberhalbGround, Entfernung Zum Thema) .
        * Wenn Sie das vertikale CRS kennen, geben Sie es bitte in den Metadaten an, z.B. "EPSG:5829" (momentane Höhe über dem Meeresspiegel) , "EPSG:5831" (momentane Tiefe unter dem Meeresspiegel) , oder "EPSG:5703" (NAVD88 Höhe) .
    * Für "time" Variable:
        * Verwenden Sie die [ destinationName ](#destinationname)   "time" nur für Variablen, die das gesamte Datum+Zeit enthalten (oder Datum, wenn das alles vorhanden ist) . Wenn zum Beispiel separate Spalten für Datum und Uhrzeit vorhanden sind, verwenden Sie nicht den variablen Namen "time" .
        * Vgl. [Einheiten](#time-units) für weitere Informationen über das Attribut Einheiten für Zeit und ZeitStamp-Variablen.
        * Die Zeitvariable und verwandt [Zeit Stamp Variablen](#timestamp-variables) sind einzigartig, indem sie immer Datenwerte aus dem Zeitformat der Quelle konvertieren (Was auch immer es ist) in einen numerischen Wert (Sekunden seit 1970-0100:00Z) oder einen String-Wert (ISO 8601:2004 (E) Format) , je nach Situation.
        * Wenn ein Benutzer Zeitdaten anfordert, können sie ihn anfordern, indem er die Zeit als Zahlenwert angibt. (Sekunden seit 1970-0100:00Z) oder einen String-Wert (ISO 8601:2004 (E) Format) .
        *    ERDDAP™ hat ein Dienstprogramm [Numerisch umrechnen Zeit für/von einer Streichzeit](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) .
        * Vgl. [Wie ERDDAP Angebote mit Zeit](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) .
            
### Warum nur zwei grundlegende Datenstrukturen?{#why-just-two-basic-data-structures} 
* Da es für menschliche Kunden und Computer-Clients schwierig ist, mit einem komplexen Satz von möglichen Datensatzstrukturen umzugehen, ERDDAP™ verwendet nur zwei grundlegende Datenstrukturen:
    * eine [Datenstruktur](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)   (beispielsweise für Satellitendaten und Modelldaten) und
    * eine [tabellarische Datenstruktur](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)   (beispielsweise für In-situ-Buoy-, Stations- und Trajektoriendaten) .
* Sicherlich können nicht alle Daten in diesen Strukturen ausgedrückt werden, aber viel davon kann. Insbesondere Tabellen sind sehr flexible Datenstrukturen (den Erfolg von relationalen Datenbankprogrammen ansehen) .
* Dies erleichtert die Datenabfrage.
* Dadurch haben Datenantworten eine einfache Struktur, die es einfacher macht, die Daten in einer größeren Vielfalt von Standarddateitypen zu bedienen (die oft nur einfache Datenstrukturen unterstützen) . Das ist der Hauptgrund, warum wir ERDDAP™ Hier entlang.
* Dies wiederum macht es für uns sehr einfach (oder jeder) um Client-Software zu schreiben, die mit allen arbeitet ERDDAP™ Datensätze.
* Dies erleichtert den Vergleich von Daten aus verschiedenen Quellen.
* Wir sind uns sehr bewusst, dass Sie, wenn Sie mit Daten in anderen Datenstrukturen arbeiten, zunächst denken können, dass dieser Ansatz vereinfacht oder unzureichend ist. Aber alle Datenstrukturen haben Abschlüsse. Keine ist perfekt. Selbst die do-it-all Strukturen haben ihre Nachteile: Die Zusammenarbeit mit ihnen ist komplex und die Dateien können nur mit speziellen Softwarebibliotheken geschrieben oder gelesen werden. Wenn Sie annehmen ERDDAP 's Ansatz genug, um mit ihm zu arbeiten, können Sie feststellen, dass es seine Vorteile hat (insbesondere die Unterstützung für mehrere Dateitypen, die die Datenantworten halten können) . Die [ ERDDAP™ Diashow](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html)   (insbesondere die [Datenstrukturen Folie](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html#dataStructures) ) spricht viel über diese Probleme.
* Und selbst wenn dieser Ansatz für Sie seltsam klingt, die meisten ERDDAP™ Clients werden nie bemerken -- sie werden einfach sehen, dass alle Datensätze eine schöne einfache Struktur haben und sie werden dankbar sein, dass sie Daten aus einer Vielzahl von Quellen in einer Vielzahl von Dateiformaten zurückgegeben bekommen können.
         
### Abmessungen{#dimensions} 
*    **Was ist, wenn die Rastervariablen im Quelldatensatz DON'T die gleichen Achsenvariablen teilen?**   
In EDDGrid datasets, alle Datenvariablen MUST (Anteil) alle Achsgrößen. Wenn also ein Quelldatensatz einige Variablen mit einem Satz von Dimensionen und andere Variablen mit einem anderen Satz von Dimensionen aufweist, müssen Sie zwei Datensätze in ERDDAP . Zum Beispiel könnten Sie einen machen ERDDAP™ Datensatz mit dem Titel "Einige Titel (an der Oberfläche) ", um Variablen zu halten, die nur verwenden \\[ Zeit \\]  \\[ Breite \\]  \\[ Länge \\] Abmessungen und eine andere ERDDAP™ Datensatz mit dem Titel "Einige Titel (in Tiefen) "um die Variablen zu halten, die \\[ Zeit \\]  \\[ Höhe \\]  \\[ Breite \\]  \\[ Länge \\] . Oder vielleicht können Sie die Datenquelle ändern, um eine Dimension mit einem einzigen Wert hinzuzufügen (z.B. Höhe =) die Variablen konsistent zu machen.
    
     ERDDAP™ nicht mit komplizierteren Datensätzen umgehen (zum Beispiel Modelle, die ein Netz von Dreiecken verwenden) Gut. Sie können diese Datensätze in ERDDAP™ indem zwei oder mehr Datensätze in ERDDAP™   (so dass alle Datenvariablen in jedem neuen Datensatz den gleichen Satz von Achsenvariablen teilen) , aber das ist nicht, was die Nutzer wollen. Für einige Datensätze können Sie eine regelmäßige netzgebundene Version des Datensatzes und das Angebot berücksichtigen, dass zusätzlich zu den ursprünglichen Daten. Einige Client-Software kann nur mit einem regulären Netz umgehen, so dass Sie dadurch zusätzliche Clients erreichen.
     
    
### Projektierte Gridded Data{#projected-gridded-data} 
Einige Gitterdaten haben eine komplexe Struktur. Zum Beispiel Satellitenebene 2 ("Unterweg") Daten verwenden keine einfache Projektion. Modelle (und andere) oft mit gegitterten Daten auf verschiedenen nicht-zylindrischen Projektionen arbeiten (z.B. conic, polar stereographic, tripolar) oder in unstrukturierten Gittern (eine komplexere Datenstruktur) . Einige Endbenutzer wollen diese Daten, wie es ist, so gibt es keinen Verlust an Informationen. Für diese Kunden, ERDDAP™ den Daten dienen kann, wie dies ist, nur wenn ERDDAP™ Administrator bricht den ursprünglichen Datensatz in ein paar Datensätze, wobei jeder Teil Variablen enthält, die die gleichen Achsenvariablen teilen. Ja, das scheint den Beteiligten seltsam zu sein und es ist anders als die meisten OPeNDAP Server. Aber... ERDDAP™ betont die Bereitstellung der Daten in vielen Formaten. Das ist möglich, weil ERDDAP™ verwendet/erfordert eine einheitlichere Datenstruktur. Obwohl es ein wenig abscheulich ist (d.h., anders als erwartet) , ERDDAP™ kann die projizierten Daten verbreiten.

 \\[ Ja. ERDDAP™ könnte lockerere Anforderungen an die Datenstruktur haben, aber die Anforderungen an die Ausgabeformate behalten. Aber das würde zu Verwirrung unter vielen Benutzern führen, insbesondere Neulinge, da viele scheinbar gültige Anfragen an Daten mit unterschiedlichen Strukturen ungültig wären, weil die Daten nicht in den Dateityp passen würden. Wir kommen immer wieder zum aktuellen Systemdesign. \\] 

Einige Endbenutzer wollen Daten in einer Lat lon zylindrischen Projektion wie Equirectangular / Plate Carrée oder Mercator) für einfache Handhabung in verschiedenen Situationen. Für diese Situationen ermutigen wir die ERDDAP™ Administrator, um einige andere Software zu verwenden ( NCO ? Matlab ? R? IDV? ...?) um die Daten auf eine geographische (Equirectangular Projektion / Platte Carrée) oder anderen zylindrischen Vorsprung und dienen dieser Form der Daten in ERDDAP™ als anderer Datensatz. Dies ist ähnlich, was Menschen tun, wenn sie Satelliten Level 2 Daten in Level 3 Daten konvertieren. Ein solches Werkzeug ist [ NCO ](https://nco.sourceforge.net/nco.html#Regridding) die Erweiterungsoptionen für Regrid-Daten bietet.

#### GIS und Reprojektion von Daten{#gis-and-reprojecting-data} 
Da die GIS-Welt oft kartenorientiert ist, bieten GIS-Programme in der Regel Unterstützung für die Reprojektierung der Daten, d.h. die Aufzeichnung der Daten auf einer Karte mit einer anderen Projektion.

Derzeit, ERDDAP™ hat keine Werkzeuge, um Daten neu zu projizieren. Stattdessen empfehlen wir Ihnen, ein externes Werkzeug zu verwenden, um eine Variante des Datensatzes zu erstellen, wo Daten aus seiner ursprünglichen Form auf ein rechteckiges neu projiziert wurden. (Länge der Breite) Array geeignet für ERDDAP .

Unserer Meinung nach die CF/ DAP Die Welt ist etwas anders als die GIS-Welt und arbeitet auf etwas niedrigerem Niveau. ERDDAP™ reflektiert das. Im Allgemeinen, ERDDAP™ ist in erster Linie mit Daten zu arbeiten (nicht Karten) und will sich nicht ändern (z.B. Reprojekt) diese Daten. Für ERDDAP™ , Gitterdaten werden oft/normal/vorzugsweise mit Lat-lon-Werten und einem zylindrischen Vorsprung und nicht einigen x-y-Werten der Projektion zugeordnet. In jedem Fall ERDDAP™ nichts mit der Projektion der Daten zu tun; es leitet die Daten einfach durch, wie mit seiner aktuellen Projektion, über die Theorie, dass eine Reprojektion eine signifikante Änderung der Daten ist und ERDDAP™ will nicht mit signifikanten Veränderungen involviert sein. Auch spätere Nutzer könnten die Daten naiv wieder neu projizieren, was nicht so gut wäre wie nur eine Reprojektion. (Also, wenn die ERDDAP™ Administrator will die Daten in einer anderen Projektion anbieten, fein; nur die Daten offline neu projizieren und anbieten, dass als ein anderer Datensatz in ERDDAP . Viele satellitengestützte Datensätze werden als das angeboten, was die NASA Level 2 nennt (Schweine) und als Ebene 3 (Ausgewählte Projektion) Versionen.) Wann ERDDAP™ Karten machen (direkt oder via WMS oder KML) , ERDDAP™ derzeit nur bietet, Karten mit der Equirectangular / Platte Carrée Projektion zu machen, die glücklicherweise von den meisten Mapping-Programmen akzeptiert wird.

Wir ermutigen ERDDAP™ Administratoren verwenden einige andere Software ( NCO ? Matlab ? R? IDV? ...?) um die Daten auf eine geographische (Equirectangular Projektion / Platte Carrée) oder anderen zylindrischen Vorsprung und dienen dieser Form der Daten in ERDDAP™ als anderer Datensatz. Dies ist ähnlich, was Menschen tun, wenn sie Satelliten Level 2 Daten in Level 3 Daten konvertieren. Ein solches Werkzeug ist [ NCO ](https://nco.sourceforge.net/nco.html#Regridding) die Erweiterungsoptionen für Regrid-Daten bietet.

Wir hoffen, dass ERDDAP™ werden in Zukunft Karten mit anderen Projektionen anbieten können. Wir hoffen auch, in Zukunft bessere Verbindungen zur GIS-Welt zu haben (andere als der Strom WMS Service) . Es ist schrecklich, dass in dieser "modernen" Welt die Verbindungen zwischen den CF/ DAP Die Welt und die GIS-Welt sind immer noch so schwach. Beides ist auf der To Do-Liste. (Wenn Sie helfen möchten, vor allem mit der Verbindung ERDDAP™ auf MapServer, bitte E-Mail Chris. John bei noaa.gov.) 
    
### Datentypen{#data-types} 
 ERDDAP™ unterstützt die folgenden Datentypen
 (die Namen sind empfindlich; 'u' prefix steht für "unsigned"; die Anzahl der Namen in anderen Systemen ist die Anzahl der Bits) :

#### Byte{#byte} 
*    **Byte** ganze Werte mit einem Bereich von -128 bis 127 signiert.
In anderen Systemen wird dies manchmal int8 genannt.
Das nennt man "tinyint" von SQL und Cassandra.
     ERDDAP™ konvertiert [Borolen](#boolean-data) aus einigen Quellen (z.B. SQL und Cassandra) in Bytes in ERDDAP™ mit einem Wert von 0=false, 1=true und 127= missing\\_value .
#### Ubyte{#ubyte} 
*    **Ubyte** unsignierte ganze Werte mit einem Bereich von 0 bis 255 aufweist.
In anderen Systemen wird dies manchmal uint8 genannt.
#### kurz{#short} 
*    **kurz** hat ganze Werte mit einem Bereich von -32768 bis 32767 signiert.
In anderen Systemen wird dies manchmal int16 genannt.
Das nennt man "smallint" von SQL und Cassandra.
#### Ussur{#ushort} 
*    **Ussur** unsignierte ganze Werte mit einem Bereich von 0 bis 65535 aufweist.
In anderen Systemen wird dies manchmal uint16 genannt.
#### in{#int} 
*    **in** hat ganze Werte mit einem Bereich von -2147483648 bis 2147483647 signiert.
In anderen Systemen wird dies manchmal int32 genannt.
Dies nennt man "integer | Numerisch (?) " von SQL und "int" von Cassandra.
#### U.S.{#uint} 
*    **U.S.** unsignierte ganze Werte mit einem Bereich von 0 bis 4294967295 aufweist.
In anderen Systemen wird dies manchmal uint32 genannt.
#### lang{#long} 
*    **lang** hat ganze Werte mit einem Bereich von -9223372036854775808 bis 9223372036854775807 unterschrieben.
In anderen Systemen wird dies manchmal int64 genannt.
Das nennt man "bigint | Numerisch (?) " von SQL und "bigint" von Cassandra.
Weil viele Dateitypen keine langen Daten unterstützen, wird ihre Verwendung entmutigt. Wenn möglich, verwenden Sie doppelt statt (siehe unten) .
#### Ulong{#ulong} 
*    **Ulong** unsignierte ganze Werte mit einem Bereich von 0 bis 18446744073709551615
In anderen Systemen wird dies manchmal uint64 genannt.
Da viele Dateitypen ulong-Daten nicht unterstützen, wird ihre Verwendung entmutigt. Wenn möglich, verwenden Sie doppelt statt (siehe unten) .
#### Flossen{#float} 
*    **Flossen** ist ein IEEE 754 Schwimmer mit einer Reichweite von etwa +/- 3.402823466e+38.
In anderen Systemen wird dies manchmal Float32 genannt.
Dies nennt man "real | Flossen (?)  | Dezimal (?)  | Numerisch (?) " von SQL und "float" von Cassandra.
Der Sonderwert NaN bedeutet Nicht-a-Number.
     ERDDAP™ konvertiert positive und negative Infinity-Werte in NaN.
#### Doppelzimmer{#double} 
*    **Doppelzimmer** ist ein IEEE 754 Doppel mit einer Reichweite von ca.
+/- 1.7976931348623157E+308.
In anderen Systemen wird dies manchmal Float64 genannt.
Dies nennt man "Doppelpräzision | Flossen (?)  | Dezimal (?)  | Numerisch (?) " von SQL und "double" von Cassandra.
Der Sonderwert NaN bedeutet Nicht-a-Number.
     ERDDAP™ konvertiert positive und negative Infinity-Werte in NaN.
#### &#33;{#char} 
*    **&#33;** ist ein Single, 2-Byte (16-Bit)   [Unicode UCS-2 Zeichen](https://en.wikipedia.org/wiki/UTF-16) von \\u0000   (#0) durch \\uffff   (#65535) .
     \\uffff 's Definition ist nicht-a-Character, analog zu einem doppelten Wert von NaN.
Die Verwendung von char ist entmutigt, weil viele Dateitypen entweder keine Zeichen unterstützen oder nur 1-Byte Zeichen unterstützen (siehe unten) . Betrachten Sie stattdessen String.
Benutzer können Char-Variablen verwenden, um Grafiken zu erstellen. ERDDAP™ die Zeichen in ihre Unicode-Code-Punkt-Nummer umwandeln, die als numerische Daten verwendet werden können.
#### Streichung{#string} 
*    **Streichung** eine Sequenz von 0 oder mehr, 2-Byte (16-Bit)   [Unicode UCS-2 Zeichen](https://en.wikipedia.org/wiki/UTF-16) .
     ERDDAP™ verwendet/interpretiert eine 0-Länge-String als fehlender Wert. ERDDAP™ unterstützt keine echte Null-String.
Die theoretische maximale Stringlänge beträgt 2147483647 Zeichen, aber es gibt wahrscheinlich verschiedene Probleme an verschiedenen Stellen auch bei etwas kürzeren Strings.
Verwendung ERDDAP 's String for SQL's Charakter, varchar, Charakter variierend, binär, varbinary, Intervall, Array, Multiset, xml, und jeder andere Datenbank-Datentyp, der nicht sauber mit jedem anderen passt ERDDAP™ Datentyp.
Verwendung ERDDAP 's String for Cassandras "Text" und jeder andere Cassandra-Datentyp, der nicht sauber mit jedem anderen passt ERDDAP™ Datentyp.
     

Vor ERDDAP™ v2.10, ERDDAP™ nicht unterstützte unsignierte ganze Typen intern und bot begrenzte Unterstützung in seinen Datenlesern und Autoren.
    
### Datentyp Einschränkungen{#data-type-limitations} 
Sie können denken, ERDDAP™ als System mit virtuellen Datensätzen, das durch das Lesen von Daten aus der Quelle eines Datensatzes in ein internes Datenmodell und Schreiben von Daten an verschiedene Dienste (z.(OPeN)DAP, WMS ) und Dateitypen in Reaktion auf Benutzeranfragen.

* Jeder Eingabeleser unterstützt eine Teilmenge der Datentypen, die ERDDAP™ unterstützt. So lesen Sie Daten in ERDDAP Die internen Datenstrukturen sind kein Problem.
* Jeder Ausgabeschreiber unterstützt auch eine Teilmenge von Datentypen. Das ist ein Problem, weil ERDDAP muss beispielsweise lange Daten in Dateitypen drücken, die keine langen Daten unterstützen.
     

Im Folgenden sind Erläuterungen zu den Einschränkungen (oder keine) von verschiedenen Output-Autoren und wie ERDDAP™ behandelt die Probleme. Solche Komplikationen sind ein inhärenter Bestandteil ERDDAP Das Ziel, verschiedene Systeme interoperabel zu machen.

#### ASCII{#ascii} 
* ASCII (.csv, .tsv , usw.) Textdateien -
    * Alle numerischen Daten werden über ihre String-Darstellung geschrieben (mit fehlenden Datenwerten, die als 0-Länge-Strings angezeigt werden) .
    * Obwohl ERDDAP™ schreibt lange und ulong Werte korrekt an ASCII Textdateien, viele Leser (z.B. Tabellenkalkulationsprogramme) kann nicht richtig mit langen und ulong Werten umgehen und sie stattdessen in doppelte Werte umwandeln (mit Präzisionsverlust in einigen Fällen) .
    * Char- und String-Daten werden über JSON Strings geschrieben, die alle Unicode-Zeichen verarbeiten (insbesondere die "ungewöhnlichen" Zeichen jenseits der ASCII #127, z.B. der Euro-Zeichen erscheint als "\\u20ac") .
    
        
#### JSON{#json} 
* JSON ( .json , .jsonlCSV , usw.) Textdateien -
    * Alle numerischen Daten werden über ihre String-Darstellung geschrieben.
    * Char- und String-Daten werden als JSON Strings geschrieben, die alle Unicode-Zeichen verarbeiten (insbesondere die "ungewöhnlichen" Zeichen jenseits der ASCII #127, z.B. der Euro-Zeichen erscheint als "\\u20ac") .
    * Fehlende Werte für alle numerischen Datentypen erscheinen als Null.
         
####  .nc 3 Dateien{#nc3-files} 
*    .nc 3 Dateien unterstützen keine unsignierten Ganzzahl-Datentypen. Vor CF v1.9 unterstützte CF nicht unbezeichnete Ganzzahltypen. Um damit zu umgehen, ERDDAP™ 2.10+ folgt dem NUG-Standard und fügt immer ein "\\_Unsigned"-Attribut mit einem Wert von "true" oder "false" hinzu, um anzuzeigen, ob die Daten aus einer nicht signierten oder signierten Variablen stammen. Alle Ganzzahl-Attribute werden als signierte Attribute geschrieben (z.B. Byte) mit signierten Werten (z.B. ein Ubyte actual\\_range Attribut mit den Werten 0 bis 255 erscheint als Byte-Attribut mit den Werten 0 bis -1 (die Inverse des Komplementwerts der beiden Out-of-Range-Werte). Es gibt keine einfache Möglichkeit zu wissen, welche (signierten) Ganzzahl-Attribute als unbesignierte Attribute gelesen werden sollen. ERDDAP™ unterstützt das Attribut "\\_Unsigned", wenn es liest .nc 3 Dateien.
*    .nc 3 Dateien unterstützen nicht die langen oder ulong Datentypen. ERDDAP™ behandelt dies, indem sie vorübergehend in Doppelvariablen umwandeln. Doppel können alle Werte bis zu +/- 9,007,199,254,740,992 genau darstellen 2^53. Das ist eine unvollkommene Lösung. Unidata weigert sich, ein kleineres Upgrade zu machen .nc 3 dies und die damit verbundenen Probleme zu behandeln, indem .nc ANHANG (eine große Veränderung) als Lösung.
* Die CF-Spezifikation (Vor v1.9) sagte er unterstützt einen Datentyp, aber es ist unklar, ob char nur als Bausteine von Zeichenarrays gedacht ist, die effektiv Strings sind. Fragen an ihre Mailingliste ergaben nur verwirrende Antworten. Wegen dieser Komplikationen ist es am besten, Char Variablen in zu vermeiden ERDDAP™ und verwenden String-Variablen wann immer möglich.
* Traditionell, .nc 3 Dateien nur unterstützt Strings mit ASCII-codiert (7-Bit, #0 - #127) Zeichen. NUG (und ERDDAP ) sich ausdehnen (~2017 ~) mit dem Attribut "\\_Encoding" mit einem Wert von "ISO-8859-1" (eine Erweiterung von ASCII, die alle 256 Werte jedes 8-Bit-Zeichens definiert) oder "UTF-8", um anzuzeigen, wie die String-Daten kodiert werden. Andere Kodierungen können legal sein, werden aber entmutigt.
         
####  .nc 4 Dateien{#nc4-files} 
*    .nc 4 Dateien unterstützen alle ERDDAP Datentypen.
    
#### NCCSV Dateien{#nccsv-files} 
NCCSV 1.0-Dateien unterstützen keine unsignierten ganzzahligen Datentypen.
 [NCCSV 1.1+ Dateien](/docs/user/nccsv-1.00) alle unsignierten Ganzzahl-Datentypen unterstützen.
     
####  DAP  {#dap} 
*   (OPeN)DAP  (.das, .dds, .asc ASCII Dateien und .dods binäre Dateien) - Ja.
    *   (OPeN)DAPbehandelt kurze, ushort, int, uint, Float und doppelte Werte richtig.
    *   (OPeN)DAPhat einen "byte" Datentyp, den er als unbezeichnet definiert, während historisch THREDDS und ERDDAP™ haben "byte" wie unterschrieben behandelt(OPeN)DAPDienstleistungen. Um das besser zu behandeln, ERDDAP™ 2.10+ folgt dem NUG-Standard und fügt immer ein "\\_Unsigned"-Attribut mit einem Wert von "true" oder "false" hinzu, um anzuzeigen, ob die Daten das sind, was ERDDAP™ telefonieren perte oder ubyte. Alle Byte- und Ubyte-Attribute werden als "byte"-Attribute mit signierten Werten geschrieben (z.B. ein Ubyte actual\\_range Attribut mit den Werten 0 bis 255 erscheint als Byte-Attribut mit den Werten 0 bis -1 (die Inverse des Komplementwerts der beiden Out-of-Range-Werte). Es gibt keinen einfachen Weg zu wissen, welche "byte" Attribute als Ubyte-Attribute gelesen werden sollen.
    *   (OPeN)DAPunterstützt nicht unterzeichnete oder unbezeichnete Sehnen. ERDDAP™ behandelt dies, indem sie vorübergehend zu Doppelvariablen und Attributen umwandeln. Doppel können alle Werte bis 9,007,199,254,740,992 genau darstellen 2^53. Das ist eine unvollkommene Lösung. OPeNDAP   (die Organisation) weigert sich, ein kleineres Upgrade zu machen DAP 2.0, um sich mit diesem und verwandten Problemen zu befassen, DAP ANHANG (eine große Veränderung) als Lösung.
    * Weil(OPeN)DAPhat keinen separaten Zeichentyp und unterstützt technisch nur 1-Byte ASCII Zeichen (#0 - #127) in Strings, char-Datenvariablen erscheinen als 1-Charakter-lange Strings in(OPeN)DAP.das, .ddds und .dods Antworten.
    * Technisch gesehen,(OPeN)DAPSpezifikation unterstützt nur Strings mit ASCII-codierten Zeichen (#0 - #127) . NUG (und ERDDAP ) sich ausdehnen (~2017 ~) mit dem Attribut "\\_Encoding" mit einem Wert von "ISO-8859-1" (eine Erweiterung von ASCII, die alle 256 Werte jedes 8-Bit-Zeichens definiert) oder "UTF-8", um anzuzeigen, wie die String-Daten kodiert werden. Andere Kodierungen können legal sein, werden aber entmutigt.
         
### Datentyp Kommentare{#data-type-comments} 
* Aufgrund der schlechten Unterstützung für lange, ulong und Char-Daten in vielen Dateitypen, entmutigen wir die Verwendung dieser Datentypen in ERDDAP . Wenn möglich, verwenden Sie doppelt statt lang und ulong, und verwenden Sie String anstelle von char.
     
* Metadaten - Weil(OPeN)DAP's .das und .dds Antworten unterstützen nicht lange oder ulong Attribute oder Datentypen (und stattdessen zeigen sie als Doppel) , Sie können stattdessen verwenden ERDDAP 's tabellarische Darstellung von Metadaten, wie in der http .../erdap/ **Informationen** / * datasetID * .html Webseite (zum Beispiel, [https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html)  )   (die Sie auch in anderen Dateitypen erhalten können, z.B. .csv, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv , .xhtml ) oder .nccsv Antwort von Metadaten (zum Beispiel, [https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) wenn .nccsv Metadaten sind nur für tabellarische Datensätze verfügbar) , die beide alle Datentypen unterstützen (insbesondere, lang, ulong und char) .
         
### Mediendateien{#media-files} 
Nicht alle Daten sind Arrays von Zahlen oder Text. Einige Datensätze bestehen aus oder beinhalten Mediendateien, wie Bild-, Audio- und Videodateien. ERDDAP™ hat einige Besonderheiten, um es Benutzern zu erleichtern, Zugang zu Mediendateien zu erhalten. Es ist ein zweistufiger Prozess:
 

1. Machen Sie jede Datei über eine eigene URL zugänglich, über ein System, das Byte Range Requests unterstützt.
Der einfachste Weg, dies zu tun, ist, die Dateien in einem Verzeichnis, das ERDDAP™ hat Zugang zu. (Wenn sie in einem Container wie ein .zip Datei, entpacken Sie sie, obwohl Sie die .zip auch für Benutzer.) Dann machen Sie einen [EDDTableFromFileNames](#eddtablefromfilenames) Datensatz, um diese Dateien über ERDDAP™ , insbesondere über ERDDAP ' [ "files" System](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) .
    
Alle Dateien, die über EDDTableFromFileNames und ERDDAP ' "files" Systemunterstützung [Byte-Range-Anfragen](https://en.wikipedia.org/wiki/Byte_serving) . Normalerweise, wenn ein Client (z.B. ein Browser) stellt eine Anfrage an eine URL, es bekommt die gesamte Datei als Antwort. Aber mit einer Byte-Range-Anfrage gibt die Anfrage eine Reihe von Bytes aus der Datei an, und der Server gibt nur diese Bytes zurück. Dies ist hier relevant, weil die Audio- und Videoplayer in Browsern nur funktionieren, wenn die Datei über Byte-Range-Anfragen aufgerufen werden kann.
    
Optional: Wenn Sie mehr als einen Datensatz mit zugehörigen Mediendateien haben, können Sie nur einen EDDTableFromFileNames erstellen, der für jede Gruppe von Dateien einen Unterordner hat. Der Vorteil ist, dass, wenn Sie neue Mediendateien für einen neuen Datensatz hinzufügen möchten, alles, was Sie tun müssen, einen neuen Ordner erstellen und die Dateien in diesen Ordner stecken. Der Ordner und Dateien werden automatisch zum EDDTableFromFileNames-Datensatz hinzugefügt.
    
2. Optional: Wenn Sie einen Datensatz haben, der Referenzen zu Mediendateien enthält, fügen Sie ihn hinzu ERDDAP .
Zum Beispiel können Sie eine .csv-Datei mit einer Zeile für jedes Mal, wenn jemand einen Wal und eine Spalte sah, die den Namen einer Bilddatei, die mit diesem Sehen zusammenhängt, enthält. Wenn der Name der Bilddatei nur der Dateiname ist, z.B. Img20141024T192403Z, keine vollständige URL, dann müssen Sie hinzufügen [DateiAccessBase Url und/oder DateiAccessSuffix](#fileaccessbaseurl) Attribute zu den Metadaten dafür dataVariable die die baseURL und Suffix für diese Dateinamen angibt. Wenn Sie die Dateien über EDDTableFromFileNames zugänglich gemacht haben, wird die URL im Formular
     *BasisUrl* /erddap/files/ * datasetID * /
Zum Beispiel
```
        <att name="fileAccessBaseUrl">*someBaseURL*</a>  
        <att name="fileAccessSuffix">.png</a>
```
        
Wenn es .zip oder eine andere Containerdatei mit allen Mediendateien, die mit einer Datenvariable zusammenhängen, empfehlen wir Ihnen, diese Datei auch für Benutzer zugänglich zu machen. (Schritt 1 oben) und dann mit einem [DateiAccessArchive Url](#fileaccessarchiveurl) Attribut.
    

 \\[ Beginnen ERDDAP™ V1.82 \\] Wenn Sie den ersten Schritt oben tun (oder beide Schritte) , dann, wenn ein Benutzer die ERDDAP™   "files" System für diesen Datensatz (oder fragt, ob eine Teilmenge des Datensatzes über eine .htmlTable Bitte, wenn Sie den zweiten Schritt getan haben) , ERDDAP™ wird links vom Dateinamen ein '?'-Symbol zeigen. Wenn der Benutzer über dieses Symbol schwebt, werden sie einen Popup sehen, der das Bild oder einen Audioplayer oder einen Videoplayer zeigt. Browser unterstützen nur eine begrenzte Anzahl von Arten von

* Bild (in der Regel .gif, .jpg und .png) ,
* Audio (in der Regel .mp3, .ogg und .wav) , und
* Videodateien (in der Regel .mp4, .ogv und . Weber) .

Der Support variiert mit verschiedenen Versionen verschiedener Browser auf verschiedenen Betriebssystemen. Wenn Sie also eine Wahl haben, welche Dateityp zu bieten ist, ist es sinnvoll, diese Typen anzubieten.

Oder, wenn ein Benutzer auf den Dateinamen auf einen ERDDAP™ Web-Seite, ihr Browser zeigt die Bild-, Audio- oder Videodatei als separate Webseite. Dies ist meist nützlich, um ein sehr großes Bild oder Video skaliert auf Vollbild zu sehen, anstatt in einem Popup.
    
### Arbeiten mit AWS S3 Dateien{#working-with-aws-s3-files} 
 [Amazon Web Service (AWS) ](https://aws.amazon.com) ist ein Verkäufer [Cloud Computing](https://en.wikipedia.org/wiki/Cloud_computing) Dienstleistungen. [S3](https://aws.amazon.com/s3/) ist ein von AWS angebotenes Objektspeichersystem. Anstelle des hierarchischen Systems von Verzeichnissen und Dateien eines traditionellen Dateisystems (wie eine Festplatte in Ihrem PC) , S3 bietet nur "Buckets", die "Objekte" halten (wir rufen sie an "files" ) .

Für ASCII-Dateien (z.B., .csv) , ERDDAP™ kann mit den Dateien in den Eimern direkt arbeiten. Das einzige, was Sie tun müssen, ist, die&lt;fileDir&gt; für den Datensatz mit einem bestimmten Format für den AWS-Bucket, z.https://*bucketName*.s3.*aws-region*.amazonaws.com/*subdirectory*/. Sie sollten nicht verwenden&lt;CacheFromUrl&gt;. Siehe unten für Details.

Aber für binäre Dateien (z.B., .nc , .grib, .bufr .hdf Dateien) , Sie müssen die&lt;ccheFromUrl&gt; System unten beschrieben. ERDDAP , netcdf-java (die ERDDAP™ verwendet, um Daten aus diesen Dateien zu lesen) , und andere wissenschaftliche Datensoftware entwickelt, um mit Dateien in einem traditionellen Dateisystem zu arbeiten, das bietet [Blockhöhe](https://en.wikipedia.org/wiki/Block-level_storage) Zugriff auf Dateien (die es erlaubt, Stücke einer Datei zu lesen) , aber S3 nur Angebote [Dateiebene (Gegenstand) ](https://en.wikipedia.org/wiki/Block-level_storage) Zugriff auf Dateien (die nur das Lesen der gesamten Datei erlaubt) . AWS bietet eine Alternative zu S3, [Elastic Block Store (EBS) ](https://aws.amazon.com/ebs/) ), die den Zugriff auf den Blockpegel auf Dateien unterstützt, aber es ist teurer als S3, so wird es selten für die Massenspeicherung großer Mengen von Datendateien verwendet. (Also, wenn Leute sagen, Daten in der Cloud zu speichern (S3) ist billig, es ist in der Regel ein Äpfel zu Orangen Vergleich.) 

#### S3 Schnallen{#s3-buckets} 
 **Der Inhalt eines Eimers. Schlüssel. Objekte.**   
Technisch sind S3 Eimer nicht in einer hierarchischen Dateistruktur wie ein Dateisystem auf einem Computer organisiert. Stattdessen enthalten Eimer nur "Objekte" (Dateien) , von denen jeder einen "Schlüssel" hat (Name) . Ein Beispiel für einen Schlüssel darin, dass noaaa-goes17 Bucket ist

```
ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc
```
Das entsprechende URl für dieses Objekt ist

 [https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc](https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR_ABI-L1b-RadC-M6C01_G17_s20192352201196_e20192352203569_c20192352204013.nc) 

AWS unterstützt eine kleine Variation, wie diese URL aufgebaut ist, aber ERDDAP™ erfordert dieses ein bestimmtes Format:
  https://*bucketName*.s3.*region*.amazonaws.com/*key*  

Ab ERDDAP v2.29, können Sie jetzt die `S3://` URI Format anstelle der Bucket URL. Dies ist das Format, das von der [AWS s3 cli](https://docs.aws.amazon.com/cli/latest/reference/s3/) .
S3:// *Der Name ist:* / *Schlüssel* 

Die *Gebiet* für die S3 URI kann auf eine von drei Arten spezifiziert werden:
- Die *Gebiet* im Tomcat Benutzer `~/.aws/config` Profil
- Die `AWS_DEFAULT_REGION` Umgebungsvariable
- Die `aws.region` JVM Variable (in setenv.sh für Tomcat) 

Es ist üblich, wie mit diesem Beispiel, Schlüsselnamen wie einen hierarchischen Pfad plus einen Dateinamen aussehen zu lassen, aber technisch nicht. Da es üblich und nützlich ist, ERDDAP™ behandelt Schlüssel mit /'s, als ob sie ein hierarchischer Pfad plus Dateiname sind, und diese Dokumentation wird sich auf sie als solche beziehen. Wenn die Schlüssel eines Eimers nicht verwenden /'s (z.B. ein Schlüssel wie
ABI-Lib.2018.052.22.OR\\_ABI-L1b-RadM2-M3C10\\_G16\\_s20180522247575), dann ERDDAP™ wird nur den ganzen Schlüssel als langen Dateinamen behandeln.

Private vs Öffentliche Buckets -- Der Administrator für den S3 Eimer kann den Eimer und seinen Inhalt öffentlich oder privat machen. Falls öffentlich, kann jede Datei im Bucket von jedem heruntergeladen werden, der die URL für die Datei verwendet. Amazon hat eine [Offene Daten](https://aws.amazon.com/opendata/) Programm, das öffentliche Datensätze beherbergt (einschließlich Daten von NOAA , NASA und USGS) kostenlos und lädt nicht für jeden, die Dateien von diesen Eimern herunterladen. Wenn ein Eimer privat ist, sind Dateien im Eimer nur für autorisierte Benutzer zugänglich und AWS berechnet eine Gebühr (normalerweise vom Besitzer des Eimers bezahlt) zum Herunterladen von Dateien auf einen nicht-AWS S3 Computer. ERDDAP™ kann mit Daten in öffentlichen und privaten Eimern arbeiten.

#### AWS Credentials{#aws-credentials} 
Um es so zu machen, ERDDAP™ kann den Inhalt von privaten Eimern lesen, Sie benötigen AWS Anmeldeinformationen und Sie müssen eine Anmeldedatei an der Standard Stelle speichern, so ERDDAP™ die Informationen finden. Siehe das AWS SDK für Java 2.x Dokumentation: [Standard-Anmeldeinformationen festlegen](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials) . (Die Option, die Werte als zu speichern Java Kommandozeilenparameter in \\[ Tomcat \\] /bin/setenv.sh kann eine gute Option sein.) 
#### AWS / Dateien/{#aws-files} 
* /Dateien/ System -- Die ERDDAP™   [/Dateien/ System](#accessibleviafiles) ermöglicht es Benutzern, die Quelldateien für einen Datensatz herunterzuladen. Wir empfehlen Ihnen, dies für alle Datensätze mit Quelldateien zu aktivieren, da viele Benutzer die Original-Quelldateien herunterladen möchten.
    * Wenn die Dateien in einem privaten S3-Bucket sind, wird die Anfrage des Benutzers, eine Datei herunterzuladen, von ERDDAP™ , die die Daten aus der Datei liest und dann an den Benutzer übermittelt, wodurch die Last auf Ihrem ERDDAP™ , mit eingehender und ausgehender Bandbreite, und machen Sie (die ERDDAP™ Administrator) die Datenausgangsgebühr an AWS bezahlen.
    * Wenn die Dateien in einem öffentlichen S3-Bucket sind, wird die Anfrage des Benutzers, eine Datei herunterzuladen, auf die AWS S3 URL für diese Datei umgeleitet, so dass die Daten nicht durchlaufen werden ERDDAP™ , so dass die Belastung ERDDAP . Und wenn die Dateien in einem Amazon Open Data sind (kostenlos) öffentliche Eimer, dann Sie (die ERDDAP™ Administrator) muss keine Daten-Egressgebühr an AWS zahlen. So gibt es einen großen Vorteil, Daten von der Öffentlichkeit zu bedienen (nicht privat) S3 Eimer und ein großer Vorteil, um Daten von Amazon Open Data zu bedienen (kostenlos) Eimer.

 ERDDAP unterstützt auch anonyme Anmeldeinformationen für öffentliche Eimer. Um anonyme Anmeldeinformationen zu verwenden, fügen Sie hinzu ` <useAwsAnonymous> wahr </useAwsAnonymous> ` auf Ihre setup.xml.

#### Kundenspezifische S3 Endpunkte{#custom-s3-endpoints} 
Für S3 kompatible Objektspeicher, die nicht von Amazon gehostet werden, müssen Sie die Konfiguration der [Endpoint_url](https://docs.aws.amazon.com/sdkref/latest/guide/feature-ss-endpoints.html) zusammen mit spekulieren Sie Ihren Eimer / Schlüssel mit einem `S3://` URI.

Die *Endpoint_url* kann auf eine von drei Arten angegeben werden:
- Die *Endpoint_url* im Tomcat Benutzer `~/.aws/config` Profil
- Die `AWS_ENDPOINT_URL` Umgebungsvariable
- Die `aws.endpoint Url` JVM Variable (in setenv.sh für Tomcat) 

Für eine vollständige Liste von S3-Konfigurationsvariablen, [Siehe Amazon-Dokumentation](https://docs.aws.amazon.com/cli/latest/topic/config-vars.html) .

 **Selbstsignierte Zertifikate** 
Für selbstgehostete S3-Buckets haben Sie oft selbstsignierte SSL-Zertifikate. Für ERDDAP um von diesen Eimern zu lesen, müssen Sie Ihre Zertifikatskette in den JVM Truststore hinzufügen `$JAVA_HOME/jre/lib/security/cacerts` . Zusätzlich, ERDDAP Verwendung von [AWS Common Runtime](https://docs.aws.amazon.com/sdkref/latest/guide/common-runtime.html) asynchron auf den Eimer zuzugreifen. Dies steigert die Leistung, erfordert aber auch, dass Ihre selbstsignierten Zertifikate zu Ihrem OS-spezifischen Truststore hinzugefügt werden. Wenn Sie dies vermeiden möchten, können Sie AWS CRT mit deaktivieren ` <useAwsCrt> falsch </useAwsCrt> ` in Ihrem Setup.xml.

####  ERDDAP™ und AWS S3 Buckets{#erddap-and-aws-s3-buckets} 
 [ ** ERDDAP™ und AWS S3 Buckets** ](#erddap-and-aws-s3-buckets)   
Glücklicherweise, nach viel Mühe, ERDDAP™ hat eine Reihe von Funktionen, die es ermöglichen, mit den inhärenten Problemen der Arbeit mit S3 Block-Level-Zugang zu Dateien auf eine vernünftige Weise effizient zu behandeln:

*    \\[ Disclaimer: Die Arbeit mit AWS S3 Eimern ist viel extra Arbeit. AWS ist ein riesiges Ökosystem von Dienstleistungen und Funktionen. Es gibt viel zu lernen. Es braucht Zeit und Mühe, aber es ist machbar. Sei geduldig und du kriegst Sachen. Hilfe suchen
( [AWS Dokumentation](https://aws.amazon.com/documentation/gettingstarted/) , Webseiten wie [Stack Overflow](https://stackoverflow.com/) , und
     [ ERDDAP™ Support-Optionen](/docs/intro#support) ) wenn/wenn du feststeckst. \\]   
     
* Es kann schwer sein, sogar die Verzeichnisstruktur und Dateinamen der Dateien in einem S3 Bucket zu finden. ERDDAP™ hat eine Lösung für dieses Problem: EDDTableFromFileNames hat ein besonderes [\\*\\*Mehr Informationen](#fromonthefly) Option, mit der Sie einen EDDTableFromFileNames-Datensatz erstellen können, mit dem Benutzer den Inhalt eines S3-Buckets durchsuchen können (und Dateien herunterladen) über den Datensatz "files" Option. Es gibt eine [Beispiel dafür unten](#viewing-the-contents-of-a-bucket) .
     
*    ERDDAP™ kann Daten auslesen [extern komprimierte Datendateien](#externally-compressed-files) , so ist es gut, wenn die Dateien auf S3 gespeichert werden, wie .gz , .gzip , .bz2 , .Z oder andere Arten von extern komprimierten Datendateien, die dramatisch (2 - 20X) die Kosten für die Dateispeicherung senken. Es gibt oft keine Zeitstrafe für die Verwendung von extern komprimierten Dateien, da die Zeit gespeichert, indem eine kleinere Datei von S3 auf ERDDAP die für ERDDAP™ die Datei zu dekomprimieren. Um diese Funktion zu nutzen, müssen Sie nur sicherstellen, dass der Datensatz&lt;DateiNameRegex&gt; ermöglicht den komprimierten Dateityp (z.B. durch Hinzufügen ( |  .gz ) bis zum Ende des Regex) .
     
* Für den häufigsten Fall, wo Sie eine ERDDAP™ installiert auf Ihrem PC für Test/Entwicklung und wo der Datensatz binäre Datendateien hat, die als Objekte in einem S3-Bucket gespeichert werden, ein Ansatz, um den Datensatz in ERDDAP™ ist:
    1. Erstellen Sie ein Verzeichnis auf Ihrem PC, um ein paar Testdateien zu halten.
    2. Laden Sie zwei Datendateien von der Quelle in das gerade erstellte Verzeichnis herunter.
    3. Verwendung [GenerateDatasetsXml](#generatedatasetsxml) um den Haufen von datasets.xml für den Datensatz basierend auf den beiden lokalen Datendateien.
    4. Überprüfen Sie, ob der Datensatz beliebig funktioniert mit [DasDds](#dasdds) und/oder Ihr Lokal ERDDAP .
        
         **Die folgenden Schritte machen eine Kopie dieses Datensatzes (die Daten vom S3-Bucket erhalten) in der Öffentlichkeit ERDDAP .** 
        
    5. Kopieren Sie das Stück datasets.xml für den Datensatz datasets.xml für die Öffentlichkeit ERDDAP™ die den Daten dienen.
    6. Erstellen Sie ein Verzeichnis in der Öffentlichkeit ERDDAP 's lokale Festplatte, um einen Cache von temporären Dateien zu halten. Das Verzeichnis wird nicht viel Speicherplatz verwenden (siehe cacheSizeGB unten) .
    7. Änderung des Wertes des Datensatzes&lt;fileDir&gt; tag so dass es auf das gerade erstellte Verzeichnis verweist (obwohl das Verzeichnis leer ist) .
    8. Eine [CacheFromUrl](#cachefromurl) tag, der den Namen des Datensatzes und optionales Präfix angibt (i.e., Verzeichnis) in der [S3 URL Formatieren Sie das ERDDAP™ Anforderungen](#accessing-files-in-an-aws-s3-bucket) .
    9. Fügen Sie ein [&lt;CacheSizeGB&gt; (#cachefromurl) tag to the dataset's xml (z.B. 10 ist ein guter Wert für die meisten Datensätze) zu sagen ERDDAP™ die Größe des lokalen Caches zu begrenzen (d.h., versuchen Sie nicht, alle Remote-Dateien) .
    10. Sehen Sie, ob das in der Öffentlichkeit funktioniert ERDDAP . Beachten Sie, dass das erste Mal ERDDAP™ lädt den Datensatz, es dauert eine lange Zeit zu laden, weil ERDDAP™ muss alle Datendateien herunterladen und lesen.
        
Wenn der Datensatz eine riesige Sammlung von riesigen Datendateien ist, wird dies sehr lange dauern und unpraktisch sein. In einigen Fällen für netzgebundene Datendateien, ERDDAP™ kann die benötigten Informationen extrahieren (z.B. der Zeitpunkt für die Daten in einer netzgebundenen Datendatei) aus dem Dateinamen und vermeiden Sie dieses Problem. Vgl. [Aggregat über Dateinamen](#aggregation-via-file-names-or-global-metadata) .
        
    11. Optional (aber vor allem für EDDTableFromFiles-Datensätze) , Sie können ein [nThreads](#nthreads) tag zum Datensatz zu sagen ERDDAP mehr als 1 Thread zu verwenden, wenn Sie auf die Anforderung eines Benutzers für Daten reagieren. Dies minimiert die Auswirkungen der Verzögerung, die auftritt, wenn ERDDAP™ liest Datendateien von (Fernbedienung) AWS S3 Eimer in den lokalen Cache und (vielleicht) sie zu dekomprimieren.

#### AWS S3 Open Data{#aws-s3-open-data} 
Als Teil des NOAA ' [Großes Datenprogramm](https://www.noaa.gov/nodd/about) , NOAA hat Partnerschaften mit fünf Organisationen, darunter AWS, "um die potenziellen Vorteile der Speicherung von Kopien von Schlüsselbeobachtungen und Modellausgängen in der Cloud zu untersuchen, um das Computing direkt auf die Daten zu ermöglichen, ohne dass eine weitere Distribution erforderlich ist". AWS enthält die Datensätze, die von NOAA im Rahmen seines Programms den öffentlichen Zugang zu einer großen Sammlung von [Daten auf AWS S3 öffnen](https://registry.opendata.aws/) von jedem Computer, ob es sich um eine Amazon-Compute-Instanz handelt (einen gemieteten Computer) auf dem AWS-Netzwerk oder Ihrem eigenen PC auf jedem Netzwerk. Das folgende Beispiel geht davon aus, dass Sie mit einem öffentlich zugänglichen Datensatz arbeiten.

#### Zugriff auf Dateien in einem AWS S3 Bucket{#accessing-files-in-an-aws-s3-bucket} 
Für einen privaten S3-Datenbecher muss der Besitzer des Eimers Ihnen den Zugang zum Eimer geben. (Siehe die AWS-Dokumentation.) 

In allen Fällen benötigen Sie ein AWS-Konto, da das AWS SDK für Java   (die ERDDAP™ verwendet, um Informationen über den Inhalt eines Eimers abzurufen) erfordert AWS-Account-Anmeldeinformationen. (Mehr dazu unten) 

 ERDDAP™ kann nur auf AWS S3 Eimer zugreifen, wenn Sie die [&lt;CacheFromUrl&gt; (#cachefromurl) (oder&lt;DateiDir&gt;) in einem bestimmten Format:
https://*bucketName*.s3.*aws-region*.amazonaws.com/*prefix/*  
wenn

* Der bucketName ist die kurze Form des Bucketnamens, z.B. noaa-goes17 .
* Die aws-Region, z.B. us-east-1, stammt aus der Spalte "Region" in einem der Tabellen der [AWS Service Endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html) wo sich der Eimer tatsächlich befindet.
* Das Präfix ist optional. Wenn vorhanden, muss es enden mit '/' .

Zum Beispielhttps://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/  
Dieses URL-Format ist eine der AWS S3 Empfehlungen: siehe [Zugang zu einem Eimer](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html) und [diese Beschreibung von Präfixen](https://docs.aws.amazon.com/AmazonS3/latest/dev/ListingKeysHierarchy.html) . ERDDAP™ erfordert, dass Sie die Bucket-URL und das optionale Präfix in eine URL kombinieren, um die&lt;ccheFromUrl&gt; (oder&lt;DateiDir&gt;), wo sich die Dateien befinden.

#### Test Public AWS S3 Buckets{#test-public-aws-s3-buckets} 
Für öffentliche Eimer können und sollten Sie die Eimer-URL des AWS S3 Verzeichnisses in Ihrem Browser testen, z.B.
 [https://noaa-goes17.s3.us-east-1.amazonaws.com](https://noaa-goes17.s3.us-east-1.amazonaws.com) Wenn die Bucket-URL korrekt ist und für ERDDAP , es wird ein XML-Dokument zurückgeben, das (Teil) Auflistung der Inhalte dieses Eimers. Leider die volle URL (d.h., Bucket URL plus Präfix) dass ERDDAP™ will für einen bestimmten Datensatz funktioniert nicht in einem Browser. AWS bietet kein System, um die Hierarchie eines Eimers einfach in Ihrem Browser zu durchsuchen. (Wenn das falsch ist, mailen Sie Chris. John bei noaa.gov. Ansonsten, Amazon, bitte fügen Sie Unterstützung für diese&#33;) 

#### Die Inhalte eines Bucket ansehen{#viewing-the-contents-of-a-bucket} 
S3 Eimer enthalten oft ein paar Kategorien von Dateien, in einigen Pseudo-Unterverzeichnissen, die ein paar werden könnte ERDDAP™ Datensätze. Um die ERDDAP™ datasets, Sie müssen das Startverzeichnis für&lt;ccheFromUrl&gt; (oder&lt;fileDir&gt;) und das Format der Dateinamen, die diese Untermenge von Dateien identifizieren. Wenn Sie versuchen, den gesamten Inhalt eines Eimers in einem Browser anzuzeigen, S3 zeigt Ihnen nur die ersten 1000 Dateien, die nicht ausreichend sind. Derzeit ist der beste Weg für Sie, alle Inhalte eines Eimers anzusehen, um einen [EDDTableFromFileNames](#eddtablefromfilenames) Datensatz (auf Ihrem PC ERDDAP™ und/oder ERDDAP ) , die Ihnen auch eine einfache Möglichkeit gibt, die Verzeichnisstruktur zu durchsuchen und Dateien herunterzuladen. Die&lt;fileDir&gt; dafür wird die oben gemachte URL sein, z.B.https://noaa-goes17.s3.us-east-1.amazonaws.com. \\[ Warum bietet AWS S3 nicht einen schnellen und einfachen Weg, um das ohne AWS-Konto zu tun? \\] Beachten Sie, dass, wenn ich dies auf meinem PC auf einem nicht-Amazon-Netzwerk, es scheint, dass Amazon verlangsamt die Antwort auf einen Trickle (etwa 100 (?) Dateien pro Stück) nach den ersten paar Stücken (von 1000 Dateien pro Stück) werden heruntergeladen. Da Eimer möglicherweise eine große Anzahl von Dateien haben (noaaa-goes17 hat 26 Millionen) , alle Inhalte eines Eimers zu erhalten, kann EDDTableFromFileNames mehrere Stunden dauern (z.B. 12&#33;) zu beenden. \\[ Amazon, ist das richtig?&#33; \\] 

#### EDDTable erstellen FromFileNames Dataset mit AWS S3 Bucket{#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket} 
Wenn Sie einen Bucket-Namen haben, aber nicht bereits eine Liste von Dateien im S3-Bucket oder das Präfix, das den Standort der entsprechenden Dateien im Bucket identifiziert, verwenden Sie die folgenden Anweisungen, um einen EDDTableFromFileNames-Datensatz zu erstellen, so dass Sie die Verzeichnishierarchie des S3-Buckets über ERDDAP ' "files" System.

1. AWS-Konto eröffnen
     ERDDAP™ Verwendung von [AWS SDK für Java ](https://docs.aws.amazon.com/sdk-for-java/index.html) Bucket-Informationen von AWS zu erhalten, also müssen Sie [ein AWS-Konto erstellen und aktivieren](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/) . Das ist ein ziemlich großer Job, mit vielen Dingen zu lernen.
     
2. Legen Sie Ihre AWS-Ergebnisse, wo ERDDAP™ kann sie finden.
Folgen Sie den Anweisungen bei [AWS-Erstellungs- und Entwicklungsregion einrichten](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials) also ERDDAP™   (speziell das AWS SDK für Java ) wird in der Lage sein, Ihre AWS-Anmeldeinformationen zu finden und zu verwenden. wenn ERDDAP™ die Anmeldeinformationen nicht finden können, sehen Sie eine
java.lang. IllegalArgumentException: Profildatei kann nicht null Fehler sein ERDDAP 's log.txt-Datei.
    
Hinweis für Linux und Mac OS: Die Anmeldedatei muss im Home-Verzeichnis des Benutzers sein, der Tomcat läuft (und ERDDAP )   (für diesen Absatz übernehmen wir user=tomcat) in einer Datei namens ~/.aws/credentials . Nehmen Sie nicht an, dass ~ /home/tomcat -- tatsächlich verwenden cd ~ um herauszufinden, wo das Betriebssystem denkt ~ für user=tomcat ist. Erstellen Sie das Verzeichnis, wenn es nicht existiert. Auch, nachdem Sie die Anmeldeinformationen Datei in Platz gesetzt, stellen Sie sicher, dass der Benutzer und die Gruppe für die Datei sind tomcat und dann verwenden chmod 400 Anmeldeinformationen, um sicherzustellen, dass die Datei nur für user=tomcat gelesen wird.
    
3. Erstellen Sie die Bucket URL in der [Format: ERDDAP™ Anforderungen](#accessing-files-in-an-aws-s3-bucket) , z.
     [https://noaa-goes17.s3.us-east-1.amazonaws.com](https://noaa-goes17.s3.us-east-1.amazonaws.com) , und (für öffentliche Eimer) testen Sie es in einem Browser, um sicherzustellen, dass es ein XML-Dokument zurückgibt, das eine teilweise Auflistung der Inhalte dieses Eimers hat.
     
4. Verwendung [GenerateDatasetsXml](#generatedatasetsxml) um ein [EDDTableFromFileNames](#eddtablefromfilenames) Datensatz:
    * Für das Startverzeichnis verwenden Sie diese Syntax:
        \\*\\*( *vonOnTheFly,* IhrBucketUrl*
zum Beispiel,
        \\*\\*\\*vonTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/
    * Dateiname regex? .
    * Rekursiv? wahr
    * Nachladen EveryNMinutes? 10080
    *    infoUrl ?https://registry.opendata.aws/noaa-goes/
    * Institution? NOAA 
    * Zusammenfassung? nichts ( ERDDAP™ wird automatisch eine anständige Zusammenfassung erstellen.) 
    * Titel? nichts ( ERDDAP™ wird automatisch einen anständigen Titel erstellen.) Wie üblich, sollten Sie das resultierende XML bearbeiten, um die Korrektheit zu überprüfen und Verbesserungen vor dem Bruch von Datensätzen vorzunehmen, indem Sie es in datasets.xml .
5. Wenn Sie die oben genannten Anweisungen befolgen und den Datensatz laden ERDDAP , Sie haben einen EDDTableFromFiles Datensatz erstellt. Als Beispiel haben wir EDDTableFromFileNames-Datensätze erstellt, um es jedem zu erleichtern, Dateien aus den AWS Open Data-Buckets zu durchsuchen und herunterzuladen.
     [https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files\\_](https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files_) ) für fast alle [AWS S3 Open Data Eimer](https://registry.opendata.aws/) .
     \\[ Die wenigen Eimer, die wir nicht enthalten haben entweder eine große Anzahl von Dateien im Rootverzeichnis (mehr als in angemessener Zeit heruntergeladen werden kann) , oder den öffentlichen Zugang nicht zulassen (sollen sie nicht alle öffentlich sein?) , oder sind Forderer bezahlt Eimer (z.B. Sentinel) . \\]   
Wenn Sie auf die "files" Link für einen dieser Datensätze, Sie können den Verzeichnisbaum und Dateien in diesem S3 Bucket durchsuchen. Wegen des Weges\\*\\*\\*fromOnTheFly EDDTableFromFiles funktioniert, diese Verzeichnis-Listen sind immer perfekt aktuell, weil ERDDAP™ sie auf-die-fly. Wenn Sie den Verzeichnisbaum auf einen tatsächlichen Dateinamen klicken und auf den Dateinamen klicken, ERDDAP™ wird Ihre Anfrage an AWS S3 umleiten, damit Sie die Datei direkt von AWS herunterladen können. Sie können diese Datei dann inspizieren.
    
Ärger?
Wenn Ihr EDDTableFromFiles nicht geladen wird ERDDAP™   (oder DasDds) , suchen Sie in der log.txt-Datei für eine Fehlermeldung. Wenn Sie eine
java.lang. IllegalArgumentException: Profildatei kann nicht null Fehler sein, das Problem ist, dass das AWS SDK für Java   (verwendet, ERDDAP ) die Anmeldedatei nicht finden. Siehe oben die Anmeldehinweise.
     

Es ist bedauerlich, dass AWS nicht einfach Menschen erlaubt, einen Browser zu verwenden, um den Inhalt eines öffentlichen Eimers anzuzeigen.

 **Dann können Sie ERDDAP™ Datensätze, die den Benutzern Zugriff auf die Daten in den Dateien geben.**   
Siehe die Anweisungen in [ ERDDAP™ und S3 Schnallen](#erddap-and-aws-s3-buckets)   (oben) .
Für den Datensatz EDDTableFromFileNames, den Sie oben gemacht haben, wenn Sie mit dem Verzeichnis und den Dateinamen im Verzeichnisbaum ein wenig herumspielen, wird deutlich, dass die Verzeichnisnamen der obersten Ebene (z.B. ABI-L1b-RadC) entsprechen, was ERDDAP™ würde separate Datensätze anrufen. Der Eimer, mit dem Sie arbeiten, kann ähnlich sein. Sie könnten dann die Erstellung von separaten Datensätzen in ERDDAP™ für jeden dieser Datensätze, z.
https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/  
als&lt;ccheFromUrl&gt;. Leider scheinen für dieses spezielle Beispiel die Datensätze im Eimer alle Level 1 oder Level 2 Datensätze zu sein, die ERDDAP™   [ist nicht besonders gut](#dimensions) , weil der Datensatz eine kompliziertere Erfassung von Variablen ist, die verschiedene Dimensionen verwenden.
     
    
### NcML-Dateien{#ncml-files} 
NcML-Dateien lassen Sie on-the-fly Änderungen an einer oder mehreren Originalquelle angeben NetCDF   (v3 oder v4)   .nc .grib, .bufr oder .hdf   (v4 oder v5) Dateien und dann haben ERDDAP™ behandeln die .nc ml Dateien als Quelldateien. ERDDAP™ datasets akzeptiert .nc ml Dateien wann immer .nc Dateien werden erwartet. Die NcML-Dateien haben die Erweiterung .nc ml. Siehe [ Unidata NcML-Dokumentation](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html) . NcML ist nützlich, weil Sie einige Dinge damit machen können (zum Beispiel verschiedene Änderungen an verschiedenen Dateien in einer Sammlung vorzunehmen, einschließlich Hinzufügen einer Dimension mit einem bestimmten Wert zu einer Datei) , dass Sie nicht mit ERDDAP ' datasets.xml .

* Änderungen an einer .nc Die letzteModified-Zeit der ml-Datei wird dazu führen, dass die Datei neu geladen wird, wenn der Datensatz neu geladen wird, aber Änderungen an der zugrunde liegenden .nc Datendateien werden nicht direkt bemerkt.
* Hinweis: NcML ist\\*sehr\\*empfindlich auf die Reihenfolge einiger Elemente in der NcML-Datei. Denken Sie an NcML als Angabe einer Reihe von Anweisungen in der angegebenen Reihenfolge, mit der Absicht, die Quelldateien zu ändern (der Zustand am Start/top der NcML-Datei) in die Zieldateien (der Zustand am Ende/unten der NcML-Datei) .

Eine Alternative zu NcML ist die [ NetCDF Betreiber ( NCO ) ](#netcdf-operators-nco) . Der große Unterschied ist, dass NcML ein System ist, um Änderungen zu machen (so dass die Quelldateien nicht verändert werden) , während NCO kann verwendet werden, um Änderungen an (oder neue Versionen) die Dateien. Beide NCO und NcML sind sehr, sehr flexibel und ermöglichen es Ihnen, fast jede Änderung, die Sie an die Dateien denken können. Für beide kann es schwierig sein, genau herauszufinden, wie Sie tun, was Sie tun wollen -- überprüfen Sie das Web für ähnliche Beispiele. Beide sind nützliche Werkzeuge zur Vorbereitung von netCDF und HDF Dateien zur Verwendung mit ERDDAP , vor allem, um Änderungen darüber hinaus vorzunehmen, was ERDDAP 's Manipulation System kann tun.

Beispiel #1: Hinzufügen einer Zeitdimension mit einem Einzelwert
Hier ist ein .nc ml-Datei, die eine neue äußere Dimension erzeugt (Zeit, mit 1 Wert: 1041379200) und fügt diese Dimension der Bildvariablen in der Datei A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km hinzu .nc :
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'>
      <variable name='time' type='int' shape='time' />
      <aggregation dimName='time' type='joinNew'>
        <variableAgg name='pic'/>
        <netcdf location='A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc' coordValue='1041379200'/>
      </aggregation>
    </netcdf>
```
Beispiel #2: Änderung eines bestehenden Zeitwerts
Manchmal die Quelle .nc Datei hat bereits eine Zeitdimension und Zeitwert, aber der Wert ist falsch (für Ihre Zwecke) . Das .nc ml-Datei sagt: für die Datendatei ""19810825230030-NCEI...", für die Dimensionsvariable "time" , setzen Sie die Einheiten Attribut 'Sekunden seit 1970-01T00:00:00Z' und setzen Sie den Zeitwert auf 367588800.
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'
      location="19810825230030-NCEI-L3C\\_GHRSST-SSTskin-AVHRR\\_Pathfinder-PFV5.3\\_NOAA07\\_G\\_1981237\\_day-v02.0-fv01.0.nc">
      <variable name="time">
        <attribute name='units' value='seconds since 1970-01-01T00:00:00Z' />
        <values>367588800</values>
      </variable>
    </netcdf>
```
###  NetCDF Betreiber ( NCO )  {#netcdf-operators-nco} 
"Die Netzbetreiber ( NCO ) umfassen ein Dutzend Standalone, Kommandozeilenprogramme, die netCDF \\[ v3 oder v4 \\] , HDF   \\[ v4 oder v5 \\] , \\[ .grib, .bufr, \\] und/oder DAP Dateien als Eingabe, dann bedienen (z.B. neue Daten ableiten, Statistiken berechnen, Druck, Hyperslab, Metadaten manipulieren) und die Ergebnisse auf Bildschirm oder Dateien in Text-, Binär- oder NetCDF-Formaten ausgeben. NCO Unterstützung bei der Analyse von netzgebundenen wissenschaftlichen Daten. Der Shell-Command-Stil NCO ermöglicht es Benutzern, Dateien interaktiv zu manipulieren und zu analysieren, oder mit ausdrucksstarken Skripten, die einige Overhead von höheren Programmierumgebungen vermeiden." (von [ NCO ](https://nco.sourceforge.net/) Homepage) .

Eine Alternative zu NCO ist [NcML](#ncml-files) . Der große Unterschied ist, dass NcML ein System ist, um Änderungen zu machen (so dass die Quelldateien nicht verändert werden) , während NCO kann verwendet werden, um Änderungen an (oder neue Versionen) die Dateien. Beide NCO und NcML sind sehr, sehr flexibel und ermöglichen es Ihnen, fast jede Änderung, die Sie an die Dateien denken können. Für beide kann es schwierig sein, genau herauszufinden, wie Sie tun, was Sie tun wollen -- überprüfen Sie das Web für ähnliche Beispiele. Beide sind nützliche Werkzeuge zur Vorbereitung von netCDF und HDF Dateien zur Verwendung mit ERDDAP , vor allem, um Änderungen darüber hinaus vorzunehmen, was ERDDAP 's Manipulation System kann tun.

Zum Beispiel können Sie verwenden NCO die Einheiten der Zeitvariablen in einer Gruppe von Dateien konsistent zu machen, wo sie ursprünglich nicht konsistent waren. Oder Sie können verwenden NCO Anwendung scale\\_factor und add\\_offset in einer Gruppe von Dateien, in denen scale\\_factor und add\\_offset verschiedene Werte in verschiedenen Quelldateien haben.
 (Oder Sie können jetzt mit diesen Problemen in ERDDAP™ über [ EDDGrid VonNcFilesUnpacked](#eddgridfromncfilesunpacked) , die eine Variante von EDDGrid FromNcFiles, die gepackte Daten entpackt und Zeitwerte auf einem niedrigen Niveau standardisiert, um mit einer Sammlungsdatei zu umgehen, die verschiedene scale\\_factor s und add\\_offset , oder verschiedene Zeiteinheiten.) 

 NCO ist Freie und Open Source Software, die die [GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.html) Lizenz.

Beispiel #1: Einheiten konsistent machen
 EDDGrid VonFiles und EDDTable Aus Dateien bestehen darauf, dass die Einheiten für eine bestimmte Variable in allen Dateien identisch sein. Wenn einige der Dateien trivial sind (nicht funktionell) anders als andere (z.B. Zeiteinheiten von
"Sekunden seit 1970-01 00:00:00 Uhr UTC" versus
 "seconds since 1970-01-01T00:00:00Z" , Sie könnten verwenden NCO ' [nkaten](https://nco.sourceforge.net/nco.html#ncatted-netCDF-Attribute-Editor) . die Einheiten in allen Dateien zu ändern identisch mit
nco/ncatted -a units,time,o,c,'seconds since 1970-01-01T00:00Z' \\* .nc   
 \\[ Für viele Probleme wie diese in EDDTableFrom... Dateien Datensätze, können Sie jetzt verwenden [Standardisierung Was?](#standardizewhat) zu sagen ERDDAP die Quelldateien zu standardisieren, wie sie eingelesen werden ERDDAP . \\] 
    
### Grenzwerte für die Größe eines Datensatzes{#limits-to-the-size-of-a-dataset} 
Sie werden viele Hinweise auf "2 Milliarden" unten sehen. Genauer gesagt, das ist ein Hinweis auf 2,147,483.647 (2^31-1) , das ist der maximale Wert einer 32-Bit signierten Ganzzahl. In einigen Computersprachen zum Beispiel Java   (die ERDDAP™ wird eingeschrieben) , das ist der größte Datentyp, der für viele Datenstrukturen verwendet werden kann (beispielsweise die Größe eines Arrays) .

Für Streichwerte (beispielsweise für Variablennamen, Attributnamen, String Attributwerte und String-Datenwerte) , die maximale Anzahl der Zeichen pro String in ERDDAP™ ist ~2 Milliarden. Aber in fast allen Fällen wird es kleine oder große Probleme geben, wenn ein String eine angemessene Größe überschreitet (z.B. 80 Zeichen für variable Namen und Attributnamen und 255 Zeichen für die meisten String Attributwerte und Datenwerte) . Zum Beispiel werden Webseiten, die lange Variablennamen anzeigen, umständlich breit und lange Variablennamen gekürzt, wenn sie die Grenze des Antwortdateityps überschreiten.

Für gegitterte Datensätze:

* Die maximale Anzahl axisVariable s ist ~2 Milliarden.
Die maximale Anzahl dataVariable s ist ~2 Milliarden.
Aber wenn ein Datensatz &gt; 100 Variablen hat, wird es für Benutzer schwer zu verwenden sein.
Und wenn ein Datensatz &gt; 1 Million Variablen hat, wird Ihr Server eine Menge physischen Speicher benötigen und es werden andere Probleme.
* Die maximale Größe jeder Dimension ( axisVariable ) ist ~2 Milliarden Werte.
* Ich denke, die maximale Gesamtzahl der Zellen (das Produkt aller Dimensionsgrößen) ist unbegrenzt, aber es kann ~9e18 sein.

Für tabellarische Datensätze:

* Die maximale Anzahl dataVariable s ist ~2 Milliarden.
Aber wenn ein Datensatz &gt; 100 Variablen hat, wird es für Benutzer schwer zu verwenden sein.
Und wenn ein Datensatz &gt; 1 Million Variablen hat, wird Ihr Server eine Menge physischen Speicher benötigen und es werden andere Probleme.
* Die maximale Anzahl der Quellen (zum Beispiel Dateien) Das kann aggregiert werden ist ~2 Milliarden.
* In einigen Fällen die maximale Anzahl von Zeilen aus einer einzelnen Quelle (zum Beispiel eine Datei, aber keine Datenbank) ist ~2 Milliarden Zeilen.
* Ich glaube nicht, dass es andere Grenzen gibt.

Für sowohl gitterförmige als auch tabellarische Datensätze gibt es einige interne Grenzwerte für die Größe der Teilmenge, die von einem Benutzer in einer einzigen Anfrage angefordert werden können (oft mit &gt;2 Milliarden von etwas oder ~9e18 von etwas verwandt) , aber es ist viel wahrscheinlicher, dass ein Benutzer die datentypspezifischen Grenzen trifft.

*    NetCDF Version 3 .nc Dateien sind auf 2GB Bytes begrenzt. (Wenn das wirklich ein Problem für jemanden ist, lassen Sie mich wissen: Ich könnte Unterstützung für die NetCDF Version 3 .nc 64-Bit-Erweiterung oder NetCDF Version 4, die die Grenze deutlich erhöhen würde, aber nicht unendlich.) 
* Browser abstürzen nach nur ~500MB der Daten, so ERDDAP™ die Antwort auf .htmlTable Anfragen an ~400MB der Daten.
* Viele Datenanalyseprogramme haben ähnliche Grenzen (zum Beispiel, die maximale Größe einer Dimension ist oft ~2 Milliarden Werte) , so gibt es keinen Grund, hart zu arbeiten um die datentypspezifischen Grenzen zu bekommen.
* Die datentypspezifischen Grenzen sind nützlich, indem sie naive Anfragen für wirklich riesige Datenmengen verhindern (z.B. "Gib mir all diesen Datensatz", wenn der Datensatz 20TB von Daten aufweist) , die Wochen oder Monate dauern würde, um herunterzuladen. Je länger der Download, desto wahrscheinlicher wird es aus verschiedenen Gründen scheitern.
* Die datentypspezifischen Grenzen sind nützlich, indem sie den Benutzer dazu zwingen, sich mit maßgebenden Teilmengen zu befassen. (z.B. über Dateien mit Daten von jeweils einem Zeitpunkt einen großen netzgebundenen Datensatz zu behandeln) .
         
### Wechseln zu ACDD-1.3{#switch-to-acdd-13} 
Wir (insbesondere [GenerateDatasetsXml](#generatedatasetsxml) ) aktuell empfehlen [ACDD-Version 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) , die Anfang 2015 ratifiziert wurde und im globalen Konventsattribut als "ACDD-1.3" bezeichnet wird. Vorher ERDDAP™ Version 1.62 (veröffentlicht im Juni 2015) , ERDDAP™ das Original, Version 1.0, des [ NetCDF Attribut Convention for Dataset Discovery](https://wiki.esipfed.org/ArchivalCopyOfVersion1) die als " bezeichnet wurde Unidata Dataset Discovery v1.0" in den globalen Konventionen und Metadata\\_Conventions Attribute.

Wenn Ihre Datensätze frühere Versionen von ACDD verwenden, freuen wir uns, dass Sie auf ACDD-1.3 wechseln. Es ist nicht schwer. ACDD-1.3 ist sehr rückwärtskompatibel mit Version 1.0. Um zu wechseln, für alle Datensätze (ausgenommen EDDGrid VonErddap und EDDTable AusErddap-Datensätze) :

1. Entfernen Sie die neu deprecated global Metadata\\_Conventions Attribut durch Hinzufügen (oder durch Änderung der bestehenden Metadata\\_Conventions Eigenschaften)   
```
        <att name="Metadata\\_Conventions">null</att>  
```
zum globalen Datensatz&lt; addAttributes &gt;.
     
2. Wenn der Datensatz ein Attribute von Konventionen im globalen&lt; addAttributes &gt;, alle ändern " Unidata Dataset Discovery v1.0" verweist auf "ACDD-1.3".
Wenn der Datensatz kein Konventsattribut im globalen&lt; addAttributes &gt;, dann fügen Sie einen, der sich auf ACDD-1.3 bezieht. Zum Beispiel
```
        <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
```
         
3. Wenn der Datensatz global ist standard\\_name\\_vocabulary Attribut, ändern Sie bitte das Format des Wertes auf z.B.
```
        <att name="standard\\_name\\_vocabulary">CF Standard Name Table v65</att>  
```
Wenn die Referenz auf eine ältere Version der [CF Standard-Namenstabelle](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) . es ist wahrscheinlich eine gute Idee, auf die aktuelle Version zu wechseln (65, wie wir das schreiben) , da neue Standardnamen zu dieser Tabelle mit folgenden Versionen hinzugefügt werden, aber alte Standardnamen werden selten depreciert und nie entfernt.
     
4. Obwohl ACDD-1.0 globale Attribute für creator\\_name , creator\\_email , creator\\_url , [GenerateDatasetsXml](#generatedatasetsxml) hat sie nicht automatisch hinzugefügt, bis irgendwann um ERDDAP™ v1.50. Dies sind wichtige Informationen:
        
    *    creator\\_name lässt Benutzer den Schöpfer des Datensatzes erkennen/ ansagen.
    *    creator\\_email erklärt den Benutzern die bevorzugte E-Mail-Adresse, um den Schöpfer des Datensatzes zu kontaktieren, beispielsweise wenn sie Fragen zum Datensatz haben.
    *    creator\\_url gibt Benutzern einen Weg, um mehr über den Schöpfer zu erfahren.
    *    ERDDAP™ verwendet alle diese Informationen bei der Generierung von FGDC und ISO 19115-2/19139 Metadatendokumenten für jeden Datensatz. Diese Dokumente werden oft von externen Suchdiensten verwendet.
    
Bitte fügen Sie diese Attribute dem globalen Datensatz hinzu&lt; addAttributes &gt;.
```
        <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
        <att name="creator\\_email">erd.data@noaa.gov</att>  
        <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
```
    
Das ist es. Ich hoffe, das war nicht zu hart.
     
### Zar{#zarr} 
Ab Version 2.25 ERDDAP™ kann lokal lesen Zarr Dateien mit [EDDTableFromNcFis](#eddtablefromncfiles) und [ EDDGrid Von NcFiles](#eddgridfromncfiles) .

 (Ab August 2019) Wir könnten leicht falsch sein, aber wir sind noch nicht überzeugt, dass [Zar](https://github.com/zarr-developers/zarr-python) , oder ähnliche Systeme, die Datendateien in kleinere Stücke zerlegen, sind große Lösungen für das Problem der ERDDAP™ Daten, die in Cloud-Diensten wie Amazon AWS S3 gespeichert werden. Zarr ist eine großartige Technologie, die ihre Nützlichkeit in einer Vielzahl von Situationen gezeigt hat, wir sind einfach nicht sicher, dass ERDDAP +S3 wird eine dieser Situationen sein. Meistens sagen wir: Bevor wir die Mühe machen, alle unsere Daten in Zarr zu speichern, machen wir einige Tests, um zu sehen, ob es tatsächlich eine bessere Lösung ist.

Die Probleme mit dem Zugriff auf Daten in der Cloud sind Latenz (die Verzögerung zuerst Daten erhalten) und Zugriff auf Dateiebene (anstatt zu blockieren) . Zarr löst das Problem auf Dateiebene, tut aber nichts über Latenz. Im Vergleich zum Download der Datei (so kann es als lokale Datei mit Block-Level-Zugang gelesen werden) , Zarr kann sogar das Latenz-Problem verschlimmern, weil mit Zarr, Lesen einer Datei jetzt eine Reihe von mehreren Aufrufen beinhaltet, um verschiedene Teile der Datei zu lesen (mit eigener Lagune) . Das Latenzproblem kann durch Parallelisierung der Anträge gelöst werden, das ist jedoch eine höhere Lösung, die nicht von Zarr abhängig ist.

Und mit Zarr (wie bei relationalen Datenbanken) , wir verlieren die Bequemlichkeit, eine Datendatei zu haben, ist eine einfache, einzelne Datei, die Sie leicht die Integrität zu überprüfen, oder eine Kopie von machen / herunterladen können.

 ERDDAP™   (als v2) hat ein System zur Aufrechterhaltung eines lokalen Cache von Dateien aus einer URL-Quelle (z.B. S3) (siehe [&lt;ccheFromUrl&gt; und&lt;CacheMaxGB&gt; (#cachefromurl) ) Und der neue&lt;nThreads&gt;] (#nthreads) sollte das Latenzproblem durch Parallelisierung der Datenabrufung auf hohem Niveau minimieren.&lt;ccheFromUrl&gt; scheint für viele Szenarien sehr gut zu arbeiten. (Wir sind nicht sicher, wie nützlich&lt;nThreads&gt; ist ohne weitere Tests.) Wir geben zu, dass wir keine Timing-Tests an einer AWS-Instanz mit einer guten Netzwerkverbindung gemacht haben, aber wir haben erfolgreich mit verschiedenen Remote-URL-Quellen von Dateien getestet. Und ERDDAP '&lt;cacheFromUrl&gt; arbeitet mit jeder Art von Datendatei (z.B., .nc , .hdf , .csv, .jsonlCSV ) , auch wenn extern komprimiert (z.B., .gz ) , ohne Änderungen der Dateien (z.B. sie als Zarr-Sammlungen neu schreiben) .

Es ist wahrscheinlich, dass verschiedene Szenarien verschiedene Lösungen bevorzugen, z.B. nur einen Teil einer Datei einmal lesen müssen (Zarr gewinnt) , vs. müssen alle Datei einmal lesen, vs. müssen Teil oder alle Datei mehrmals lesen (&lt;ccheFromUrl&gt; gewinnt).

Meistens sagen wir: Bevor wir die Mühe machen, alle unsere Daten in Zarr zu speichern, machen wir einige Tests, um zu sehen, ob es tatsächlich eine bessere Lösung ist.

- - Ja.
## Liste der Arten Datensätze{#list-of-types-datasets} 
Wenn Sie Hilfe benötigen, um den richtigen Datensatztyp auszuwählen, siehe [Auswahl des Datensatztyps](#choosing-the-dataset-type) .

Die Arten von Datensätzen fallen in zwei Kategorien. ( [Warum?](#why-just-two-basic-data-structures) ) 

###  EDDGrid  {#eddgrid} 
*    [ ** EDDGrid ** ](#eddgrid) datasets verarbeiten netzgebundene Daten.
    * In EDDGrid Datensätze, Datenvariablen sind mehrdimensionale Datenfelder.
    * Für jede Dimension muss eine Achsgröße vorhanden sein. Axis-Variablen MUST werden in der Reihenfolge angegeben, in der die Datenvariablen sie verwenden.
    * In EDDGrid datasets, alle Datenvariablen MUST (Anteil) alle Achsgrößen.
         ( [Warum?](#why-just-two-basic-data-structures)   [Und wenn sie es nicht tun?](#dimensions) ) 
    * Sortierte Maßwerte - In allen EDDGrid Datensätze, jede Dimension MUST in sortierter Reihenfolge (aufsteigen oder absteigen) . Jeder kann unregelmäßig beabstandet sein. Es kann keine Krawatten geben. Dies ist eine Forderung der [CF metadata standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) . Wenn die Werte der Dimension nicht in sortierter Reihenfolge sind, wird der Datensatz nicht geladen und ERDDAP™ den ersten ungebrochenen Wert in der Protokolldatei identifizieren, *BigParentDirectory* /logs/log.txt .
        
Einige Unterklassen haben zusätzliche Einschränkungen (insbesondere EDDGrid AggregateExistingDimension erfordert, dass die äußere (links, erste) Dimension aufsteigt.
        
Unsortierte Dimensionswerte geben fast immer ein Problem mit dem Quelldatensatz an. Dies geschieht am häufigsten, wenn in der Aggregation eine fehlerhafte oder unangemessene Datei enthalten ist, die zu einer ungestörten Zeitdimension führt. Um dieses Problem zu lösen, siehe die Fehlermeldung in der ERDDAP™ log.txt Datei, um den absteigenden Zeitwert zu finden. Dann schauen Sie in die Quelldateien, um die entsprechende Datei zu finden (oder vor oder nach) Das gehört nicht zur Aggregation.
        
    * Siehe die vollständigere Beschreibung der [ EDDGrid Datenmodell](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel) .
    * Die EDDGrid Datensatztypen sind:
        *    [ EDDGrid VonAudioFiles](#eddfromaudiofiles) aggregiert Daten aus einer Gruppe von lokalen Audiodateien.
        *    [ EDDGrid VonDap](#eddgridfromdap) netzgebundene Daten von DAP Server.
        *    [ EDDGrid VonEDDTable](#eddgridfromeddtable) Sie können einen tabellarischen Datensatz in einen netzgebundenen Datensatz konvertieren.
        *    [ EDDGrid Von Erddap](#eddfromerddap) netzgebundene Daten von einer Fernbedienung ERDDAP .
        *    [ EDDGrid Von Etopo](#eddgridfrometopo) behandelt nur die eingebauten ETOPO-Topographiedaten.
        *    [ EDDGrid VonFiles](#eddgridfromfiles) ist die Superklasse von allen EDDGrid Von...Files-Kursen.
        *    [ EDDGrid VonMergeIRFiles](#eddgridfrommergeirfiles) aggregierte Daten aus einer Gruppe von lokalen MergeIR .gz Dateien.
        *    [ EDDGrid Von NcFiles](#eddgridfromncfiles) aggregierte Daten aus einer Gruppe von lokalen NetCDF   (v3 oder v4)   .nc und verwandte Dateien.
        *    [ EDDGrid VonNcFilesUnpacked](#eddgridfromncfilesunpacked) eine Variante ist, wenn EDDGrid FromNcFiles, die auch Daten aus einer Gruppe von lokalen NetCDF   (v3 oder v4)   .nc und verwandten Dateien, die ERDDAP™ entpackt auf einem niedrigen Niveau.
        *    [ EDDGrid LonPM180](#eddgridlonpm180) die Längenwerte eines Kindes modifiziert EDDGrid so dass sie im Bereich -180 bis 180 liegen.
        *    [ EDDGrid Lon0360](#eddgridlon0360) die Längenwerte eines Kindes modifiziert EDDGrid so dass sie im Bereich 0 bis 360 liegen.
        *    [ EDDGrid SideByside](#eddgridsidebyside) Aggregate zwei oder mehr EDDGrid Datensätze nebeneinander.
        *    [ EDDGrid GesamtexistierteDimension](#eddgridaggregateexistingdimension) Aggregate zwei oder mehr EDDGrid Datensätze, die jeweils einen unterschiedlichen Wertebereich für die erste Dimension aufweisen, jedoch gleiche Werte für die anderen Dimensionen.
        *    [ EDDGrid Kopie](#eddgridcopy) kann eine lokale Kopie eines anderen machen EDDGrid 's Daten und dient Daten aus der lokalen Kopie.
             
    * Alle EDDGrid datasets unterstützen eine nThreads-Einstellung, die ERDDAP™ wie viele Threads zu verwenden, wenn auf eine Anfrage reagiert. Siehe [nThreads](#nthreads) Dokumentation für Details.
         
### EDDTable{#eddtable} 
*    [ **EDDTable** ](#eddtable) datasets verarbeiten tabellarische Daten.
    * Tabulardaten können als Datenbank-ähnliche Tabelle mit Zeilen und Spalten dargestellt werden. Jede Spalte (eine Datengröße) hat einen Namen, eine Reihe von Attributen und speichert nur eine Art von Daten. Jede Zeile hat eine Beobachtung (oder Gruppe von verwandten Werten) . Die Datenquelle kann die Daten in einer anderen Datenstruktur, einer komplizierteren Datenstruktur und/oder mehreren Datendateien aufweisen, aber ERDDAP™ muss in der Lage sein, die Quelldaten in eine Datenbank-ähnliche Tabelle zu platzieren, um die Daten als tabellarischer Datensatz an Nutzer von ERDDAP .
    * Siehe die vollständigere Beschreibung der [EDDTable Datenmodell](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel) .
    * Die EDDTable-Datensatztypen sind:
        *    [EDDTableFromAllDatasets](#eddtablefromalldatasets) ist ein hochrangiger Datensatz, der Informationen über alle anderen Datensätze in Ihrem ERDDAP .
        *    [EDDTableFromAsciiFiles](#eddtablefromasciifiles) aggregiert Daten aus Komma-, Tab-, Semikolon- oder platzgetrennten tabellarischen ASCII-Datendateien.
        *    [EDDTableFromAsciiService](#eddtablefromasciiservice) ist die Superklasse aller EDDTableFromAsciiService... Klassen.
        *    [EDDTableFromAsciiServiceNOS](#eddtablefromasciiservicenos) behandelt Daten von einigen der NOAA NOS Web Services.
        *    [EDDTableFromAudioFiles](#eddfromaudiofiles) aggregiert Daten aus einer Gruppe von lokalen Audiodateien.
        *    [EDDTableFrom AwsXmlFiles](#eddtablefromawsxmlfiles) aggregierte Daten von einem Satz von Automatischer Wetterstation (AWS) XML-Dateien.
        *    [EDDTableFromCassandra](#eddtablefromcassandra) behandelt tabellarische Daten von einer Cassandra Tabelle.
        *    [EDDTableFromColumnarAsciiFiles](#eddtablefromcolumnarasciifiles) aggregiert Daten aus tabellarischen ASCII-Datendateien mit festbreiten Datenspalten.
        *    [EDDTableFromDapSequenz](#eddtablefromdapsequence) handhabt tabellarische Daten von DAP Sequenzserver.
        *    [EDDTableFromDatabase](#eddtablefromdatabase) behandelt tabellarische Daten aus einer Datenbanktabelle.
        *    [EDDTableFrom EDDGrid ](#eddtablefromeddgrid) lässt Sie einen EDDTable-Datensatz aus einem EDDGrid Datensatz.
        *    [EDDTableFromErddap](#eddfromerddap) behandelt tabellarische Daten von einer Fernbedienung ERDDAP .
        *    [EDDTableFromFileNames](#eddtablefromfilenames) erstellt einen Datensatz aus Informationen über eine Gruppe von Dateien im Dateisystem des Servers, aber es dient nicht Daten aus innerhalb der Dateien.
        *    [EDDTableFromFiles](#eddtablefromfiles) ist die Superklasse aller EDDTableFrom...Files-Klassen.
        *    [EDDTableFromHtpGet](#eddtablefromhttpget) ist ERDDAP Das einzige System für den Datenimport sowie den Datenexport.
        *    [EDDTableFrom Hyrax Dateien](#eddtablefromhyraxfiles)   (DEPRECATE) aggregierte Daten aus Dateien mit mehreren Variablen mit gemeinsamen Dimensionen, die von einem [ Hyrax   OPeNDAP Server](https://www.opendap.org/software/hyrax-data-server) .
        *    [EDDTableFromInvalidCRAFiles](#eddtablefrominvalidcrafiles) aggregierte Daten aus NetCDF   (v3 oder v4)   .nc Dateien, die eine bestimmte, ungültige Variante des CF DSG Contiguous Ragged Array verwenden (CRA) Dateien. Obwohl ERDDAP™ unterstützt diesen Dateityp, es ist ein ungültiger Dateityp, den niemand verwenden sollte. Gruppen, die derzeit diesen Dateityp verwenden, werden stark ermutigt, ERDDAP™ um gültige CF DSG CRA-Dateien zu generieren und mit diesen Dateien zu stoppen.
        *    [EDDTableFromJsonlCSVFis](#eddtablefromjsonlcsvfiles) aggregierte Daten aus [JSON Zeilen CSV-Dateien](https://jsonlines.org/examples/) .
        *    [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) aggregierte Daten aus NetCDF   (v3 oder v4)   .nc Dateien mit mehreren Variablen mit gemeinsamen Abmessungen.
        *    [EDDTableFromNcFis](#eddtablefromncfiles) aggregierte Daten aus NetCDF   (v3 oder v4)   .nc Dateien mit mehreren Variablen mit gemeinsamen Abmessungen. Es ist gut, diesen Datensatztyp für bestehende Datensätze weiterzuverwenden, aber für neue Datensätze empfehlen wir stattdessen EDDTableFromMultidimNcFiles.
        *    [EDDTableFromNcCFFiles](#eddtablefromnccffiles) aggregierte Daten aus NetCDF   (v3 oder v4)   .nc Dateien, die eines der durch die [CF Diskrete Sampling Geometrien (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Konventionen. Aber für Dateien mit einer der multidimensionalen CF DSG-Varianten verwenden [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) statt.
        *    [EDDTableFromNccsvFiles](#eddtablefromnccsvfiles) aggregierte Daten aus [NCCSV](/docs/user/nccsv-1.00) ASCII .csv Dateien.
        *    [EDDTableFromNOS](#eddtablefromnos)   (DEPRECATE) behandelt tabellarische Daten von NOS XML-Servern.
        *    [EDDTableFromOBIS](#eddtablefromobis) behandelt tabellarische Daten von OBIS-Servern.
        *    [EDDTableFromParquetFis](#eddtablefromparquetfiles) Daten von [Parkett](https://parquet.apache.org/) .
        *    [EDDTableFrom SOS ](#eddtablefromsos) handhabt tabellarische Daten von SOS Server.
        *    [EDDTableFromThreddsFiles](#eddtablefromthreddsfiles)   (DEPRECATE) aggregierte Daten aus Dateien mit mehreren Variablen mit gemeinsamen Dimensionen, die von einem [THRED OPeNDAP Server](https://www.unidata.ucar.edu/software/tds/) .
        *    [EDDTableFrom WFS Dateien](#eddtablefromwfsfiles)   (DEPRECATE) eine lokale Kopie aller Daten aus einer ArcGIS Kartenserver WFS Server so dass die Daten dann schnell reserviert werden können, um ERDDAP™ Benutzer.
        *    [EDDTableAggregateRows](#eddtableaggregaterows) kann einen EDDTable-Datensatz aus einer Gruppe von EDDTable-Datensätzen machen.
        *    [EDDTableCopy](#eddtablecopy) kann eine lokale Kopie von vielen Arten von EDDTable-Datensätzen erstellen und dann die Daten schnell aus der lokalen Kopie speichern.

  
- - Ja.

## Detaillierte Beschreibungen von Datensatztypen{#detailed-descriptions-of-dataset-types} 

###  EDDGrid VonDap{#eddgridfromdap} 
 [ ** EDDGrid VonDap** ](#eddgridfromdap) Griffe Rastervariablen von [ DAP ](https://www.opendap.org/) Server.

* Wir empfehlen dringend die Verwendung der [Datensätze generieren Xml Programm](#generatedatasetsxml) einen groben Entwurf der datasets.xml für diesen Datensatz. Sie können die Informationen sammeln, die Sie benötigen, um diese zu tweak oder erstellen Sie Ihr eigenes XML für ein EDDGrid FromDap dataset durch einen Blick auf die DDS- und DAS-Dateien des Quelldatensatzes in Ihrem Browser (durch Hinzufügen von .das und .dds zu sourceUrl z.B. [https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds](https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds) ) .
     
*    EDDGrid FromDap kann Daten von jeder mehrdimensionalen Variablen aus einer DAP Datenserver. (Zuvor, EDDGrid VonDap war auf Variablen beschränkt, die als "Grid" bezeichnet werden, aber das ist keine Anforderung mehr.)   
     
* Sortierte Maßwerte - Die Werte für jede Dimension MUST sind in sortierter Reihenfolge (aufsteigen oder absteigen) . Die Werte können unregelmäßig beabstandet sein. Es kann keine Krawatten geben. Dies ist eine Forderung der [CF metadata standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) . Wenn die Werte der Dimension nicht in sortierter Reihenfolge sind, wird der Datensatz nicht geladen und ERDDAP™ den ersten ungebrochenen Wert in der Protokolldatei identifizieren, *BigParentDirectory* /logs/log.txt .
    
Unsortierte Dimensionswerte geben fast immer ein Problem mit dem Quelldatensatz an. Dies geschieht am häufigsten, wenn in der Aggregation eine fehlerhafte oder unangemessene Datei enthalten ist, die zu einer ungestörten Zeitdimension führt. Um dieses Problem zu lösen, siehe die Fehlermeldung in der ERDDAP™ log.txt Datei, um den absteigenden Zeitwert zu finden. Dann schauen Sie in die Quelldateien, um die entsprechende Datei zu finden (oder vor oder nach) Das gehört nicht zur Aggregation.
    
####  EDDGrid VonDap Skelett XML{#eddgridfromdap-skeleton-xml} 

 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset type="EDDGridFromDap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromDap, this gets the remote .dds and then gets the new  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

     
###  EDDGrid VonEDDTable{#eddgridfromeddtable} 
 [ ** EDDGrid VonEDDTable** ](#eddgridfromeddtable) Sie können einen EDDTable tabular dataset in ein EDDGrid netzgebundener Datensatz. Denken Sie daran, ERDDAP™ behandelt Datensätze als entweder [netzgebundene Datensätze (Unterklassen EDDGrid ) oder tabellarische Datensätze (Unterklassen von EDDTable) ](#why-just-two-basic-data-structures) .

* In der Regel, wenn Sie gegitterte Daten haben, haben Sie einfach eine EDDGrid Datensatz direkt. Manchmal ist dies beispielsweise nicht möglich, wenn Sie die in einer relationalen Datenbank gespeicherten Daten haben, die ERDDAP™ kann nur über EDDTableFromDatabase zugreifen. EDDGrid VonEDDTable Klasse können Sie diese Situation beheben.
     
* Offensichtlich müssen die Daten im zugrunde liegenden EDDTable-Datensatz sein (grundsätzlich) netzgebundene Daten, aber in tabellarischer Form. Beispielsweise kann der EDDTable-Datensatz CTD-Daten aufweisen: Messungen von Ost- und Nordstrom, in mehreren Tiefen, mehrmals. Da die Tiefen an jedem Zeitpunkt gleich sind, EDDGrid FromEDDTable kann einen netzgebundenen Datensatz mit einer Zeit und einer Tiefendimension erstellen, die über den zugrunde liegenden EDDTable-Datensatz auf die Daten zugreift.
     
* Datensätze generieren Xml -- Wir empfehlen dringend die Verwendung der [Datensätze generieren Xml Programm](#generatedatasetsxml) einen groben Entwurf der datasets.xml für diesen Datensatz. Sie können die Informationen sammeln, die Sie benötigen, um den groben Entwurf zu verbessern.
     
* Quelle Attributes -- Wie bei allen anderen Arten von Datensätzen, EDDGrid FromTable hat die Idee, dass es globale SourceAttribute und [weltweit addAttributes ](#global-attributes)   (spezifiziert datasets.xml ) , die zusammengeführt werden, um die globale Attribute, die Nutzer sehen. Für globale SourceAttributes, EDDGrid FromEDDTable nutzt die globale Kombination Attribute des zugrunde liegenden EDDTable-Datensatzes. (Wenn Sie eine Minute darüber nachdenken, ergibt es Sinn.) 
    
In ähnlicher Weise für jede axisVariable und dataVariable ' [ addAttributes ](#addattributes) , EDDGrid FromEDDTable verwendet die Variables kombiniert Attribute aus dem zugrunde liegenden EDDTable-Datensatz als der EDDGrid FromEDDTable Variables sourceAttributes. (Wenn Sie eine Minute darüber nachdenken, ergibt es Sinn.) 
    
Infolgedessen, wenn das EDDTable gute Metadaten hat, EDDGrid FromEDDTable braucht oft sehr wenig addAttributes metadata -- nur ein paar Tweets hier und da.
    
*    dataVariable s vers axisVariable -- Der zugrunde liegende EDDTable hat nur dataVariable S. Eine EDDGrid VonEDDTable Datensatz wird einige axisVariable S (erstellt von einigen der EDDTable dataVariable S) und einige dataVariable S (erstellt aus dem verbleibenden EDDTable dataVariable S) . [GenerateDatasetsXml](#generatedatasetsxml) wird raten, was EDDTable dataVariable s sollte EDDGrid VonEDDTable axisVariable s, aber es ist nur eine Vermutung. Sie müssen die Ausgabe von GenerateDatasetsXml ändern, um anzugeben, welche dataVariable s will werden axisVariable s, und in welcher Reihenfolge.
     
* -- Es gibt nichts über die zugrunde liegende EDDTable zu sagen EDDGrid FromEDDTable die möglichen Werte der axisVariable s in der gerasteten Version des Datensatzes, so dass Sie diese Informationen für jeden axisVariable über eines dieser Attribute:
    
    * axiValues -- lässt Sie eine Liste von Werten angeben. Zum Beispiel
        &lt;att name="axisWerte" [Typ="doubleList"](#attributetype) \\&gt;2, 2,5, 3, 3,5, 4&lt;/att&gt;
die Verwendung eines [Datentyp](#data-types) und das Wort List. Auch die Art der Liste (zum Beispiel doppelt) , MUST entspricht den Daten Typ der Variable im EDDTable und EDDGrid VonEDDTable Datensätze.
    * achsValuesStartStrideStop -- lässt Sie eine Folge von regelmäßigen Abstandswerten angeben, indem Sie die Start-, Stride- und Stoppwerte angeben. Hier ein Beispiel, das der obigen Achse entspricht:
        &lt;att name="axisValuesStartStrideStop" [Typ="doubleList"](#attributetype) \\&gt;2, 0,5, 4&lt;/att&gt;
Beachten Sie erneut die Verwendung eines Listendatentyps. Auch die Art der Liste (zum Beispiel doppelt) , MUST entspricht den Daten Typ der Variable im EDDTable und EDDGrid VonEDDTable Datensätze.
         
    
Updates -- So wie es keinen Weg gibt EDDGrid VonEDDTable zur Bestimmung der AchsenWerte aus dem EDDTable gibt es auch keine zuverlässige Möglichkeit für EDDGrid VonEDDTable aus dem EDDTable zu bestimmen, wenn sich die AchsenWerte geändert haben (insbesondere bei neuen Werten für die Zeitvariable) . Derzeit ist die einzige Lösung, das axiValues Attribut in datasets.xml und den Datensatz neu laden. Zum Beispiel könnten Sie ein Skript schreiben, um
    
    1. Suche datasets.xml für
         datasetID = *Die DatensatzID* "
so arbeiten Sie mit dem richtigen Datensatz.
    2. Suche datasets.xml für das nächste Auftreten
         <sourceName>  *DerVariablesSourceName*  </sourceName>   
so arbeiten Sie mit der richtigen Variable.
    3. Suche datasets.xml für das nächste Auftreten
```
        <att name="axisValuesStartStrideStop" type="doubleList">  
```
so dass Sie die Startposition des Tags kennen.
    4. Suche datasets.xml für das nächste Auftreten
```
        </att>  
```
so kennen Sie die Endposition der Achsenwerte.
    5. Ersetzen Sie die alten Start-, Stride-, Stop-Werte mit den neuen Werten.
    6. Kontakt [Zurück zur Übersicht](/docs/server-admin/additional-information#set-dataset-flag) für den Datensatz zu sagen ERDDAP™ um den Datensatz neu zu laden.
    
Das ist nicht ideal, aber es funktioniert.
     
* Präzision -- Wann EDDGrid FromEDDTable reagiert auf die Anforderung eines Benutzers für Daten, es bewegt eine Reihe von Daten aus der EDDTable Antworttabelle in die EDDGrid Antwortgitter. Dazu muss es herausfinden, ob die "Achse"-Werte auf einer bestimmten Zeile in der Tabelle eine Kombination von Achswerten im Raster übereinstimmen. Für ganzzahlige Datentypen ist es leicht festzustellen, ob zwei Werte gleich sind. Aber für Schwimmer und Doppel bringt dies das schreckliche Problem der schwimmenden Punktzahlen auf [nicht genau übereinstimmen](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) . (beispielsweise 0,2 versus 0,199999999999999996) . Zu (versuchen,) damit umgehen, EDDGrid FromTable lässt Sie ein Präzisionsattribut für jedes der axisVariable s, die die Gesamtzahl der Dezimalstellen angibt, die identisch sein muss.
    * Zum Beispiel&lt;beit name="precision" type="int"&gt;5&lt;/att&gt;
    * Für verschiedene Arten von Datenvariablen gibt es unterschiedliche Standardgenauigkeitswerte. Die Standardeinstellungen sind in der Regel angemessen. Wenn sie nicht sind, müssen Sie verschiedene Werte angeben.
    * Für axisVariable s, die [Zeit oder Zeit Stamp Variablen](#timestamp-variables) , der Standard ist volle Präzision (eine genaue Übereinstimmung) .
    * Für axisVariable s, die Floaten sind, die Standardgenauigkeit ist 5.
    * Für axisVariable s, die doppelt sind, die Standardgenauigkeit ist 9.
    * Für axisVariable s mit ganzzahligen Datentypen, EDDGrid FromEDDTable ignoriert das Präzisionsattribut und verwendet immer volle Präzision (eine genaue Übereinstimmung) .
         
    *    **WARNING&#33;** Bei der Umwandlung eines Bruchs von tabellarischen Daten in einen Bruch von netzgebundenen Daten, wenn EDDGrid FromEDDTable kann nicht mit einem EDDTable "axis" Wert zu einem der erwarteten EDDGrid VonEDDTable Achswerte, EDDGrid FromEDDTable leise (kein Fehler) wirft die Daten von dieser Zeile der Tabelle weg. Es können beispielsweise andere Daten vorliegen (nicht auf dem Gitter) im EDDTable-Datensatz. (Und wenn Stride &gt; 1, es ist nicht offensichtlich, EDDGrid VonTabelle, welche Achswerte Sollwerte sind, und welche derjenige ist, der wegen des Verlaufs übersprungen werden soll.) Wenn also die Genauigkeitswerte zu hoch sind, sieht der Benutzer bei der Datenantwort fehlende Werte, wenn tatsächlich gültige Datenwerte vorliegen.
        
Umgekehrt, wenn die Präzisionswerte zu niedrig gesetzt werden, EDDTable "Achse" Werte, die nicht übereinstimmen sollten EDDGrid VonEDDTable Achswerte werden (fälschlich) Match.
        
Diese potentiellen Probleme sind schrecklich, weil der Benutzer die falschen Daten erhält (oder fehlende Werte) wenn sie die richtigen Daten erhalten sollten (oder zumindest eine Fehlermeldung) .
Das ist kein Fehler. EDDGrid VonTabelle. EDDGrid FromTable kann dieses Problem nicht lösen. Das Problem ist die Umwandlung von tabellarischen Daten in netzgebundene Daten. (wenn nicht andere Annahmen gemacht werden können, aber sie können hier nicht gemacht werden) .
Es liegt an dir, die ERDDAP™ Administrator, an **Testen Sie Ihre EDDGrid Ausgewählt** um sicherzustellen, dass die Genauigkeitswerte eingestellt werden, um diese potenziellen Probleme zu vermeiden.
        
#### LückeThreshold{#gapthreshold} 
*    [LückeThreshold](#gapthreshold) -- Dies ist eine sehr ungewöhnliche Art von Datensatz. Da die Arten von Abfragen, die gemacht werden können (von) eine EDDGrid Datensatz (mit den Bereichen und Striden der axisVariable S) sind sehr verschieden von den Arten von Abfragen, die gemacht werden können (von) ein EDDTable Datensatz (nur mit den Bereichen einiger Variablen verbunden) , die Leistung EDDGrid VonEDDTable-Datensätzen werden je nach exakter Anforderung und der Geschwindigkeit des zugrunde liegenden EDDTable-Datensatzes stark variieren. Für Anträge mit einem Stridewert &gt; 1. EDDGrid FromEDDTable kann das zugrunde liegende EDDTable für einen relativ großen Datenbruch fragen (als ob Stride=1) und dann durch die Ergebnisse, halten die Daten aus einigen Zeilen und wegwerfen die Daten von anderen. Wenn es eine Menge Daten durchsieben muss, um die benötigten Daten zu erhalten, wird die Anfrage länger dauern, um zu füllen.
    
wenn EDDGrid FromEDDTable kann sagen, dass es große Lücken werden (mit Zeilen von unerwünschten Daten) zwischen den Zeilen mit gewünschten Daten, EDDGrid FromEDDTable kann wählen, um mehrere Subrequests zum zugrunde liegenden EDDTable anstelle einer großen Anfrage zu machen, wodurch die unerwünschten Datenzeilen in den großen Lücken überspringen. Die Sensitivität für diese Entscheidung wird durch den in der&lt;LückeThreshold&gt; tag (default=1000 Zeilen Quelldaten) . Einstellen von LückeThreshold zu einer kleineren Zahl führt zu dem Datensatz (allgemein) mehr Unterforderungen. Einstellen von LückeThreshold zu einer größeren Zahl führt zu dem Datensatz (allgemein) weniger Unterforderungen.
    
Wenn LückeThreshold zu klein gesetzt ist, EDDGrid FromEDDTable wird langsamer arbeiten, weil die Überleitung von mehreren Anfragen größer als die Zeit, die gespeichert wird, indem Sie einige überschüssige Daten erhalten. Wenn LückeThreshold zu groß ist, EDDGrid FromEDDTable wird langsamer arbeiten, weil so viel überschüssige Daten aus dem EDDTable abgerufen werden, nur um verworfen zu werden. (Wie Goldilocks entdeckte, ist die Mitte "nur richtig".) Der Overhead für verschiedene Arten von EDDTable-Datensätzen variiert stark, so dass die einzige Möglichkeit, die eigentliche beste Einstellung für Ihren Datensatz zu kennen, über Experimente besteht. Aber Sie gehen nicht zu weit falsch an der Standardeinstellung festhalten.
    
Ein einfaches Beispiel ist: Imagine an EDDGrid FromTable mit nur einem axisVariable   (Zeit mit einer Größe von 100000) , eins dataVariable   (Temperatur) , und die StandardlückeThreshold von 1000.
    
    * Wenn ein Benutzer Temperatur anfordert \\[ 0&#58;100&#58;5000 \\] , der Streifen ist 100, so dass die Spaltgröße 99 ist, die kleiner ist als die LückeThreshold. So. EDDGrid FromTable stellt nur eine Anfrage an EDDTable für alle Daten, die für die Anfrage benötigt werden (äquivalent zur Temperatur \\[ 0:5000 \\] ) und alle Datenreihen wegwerfen, die es nicht braucht.
    * Wenn ein Benutzer Temperatur anfordert \\[ 0:2500:5000 \\] , dass Streifen ist 2500, so dass die Spaltgröße 2499, die größer als die LückeThreshold ist. So. EDDGrid FromTable stellt separate Anfragen an EDDTable, die der Temperatur entsprechen \\[ 0) \\] Temperatur \\[ 2500 \\] Temperatur \\[ 5000 \\] .
    
Die Berechnung der Spaltgröße ist komplizierter, wenn mehrere Achsen vorhanden sind.
    
Für jede Benutzeranforderung, EDDGrid FromEDDTable druckt Diagnose-Nachrichten dazu in der [Pressemitteilung](/docs/server-admin/additional-information#log) Datei.
    
    * wenn&lt;logLevel&gt; (#loglevel) in datasets.xml wird auf info gesetzt, dies druckt eine Nachricht wie
\\* nOuterAxes=1 von 4 nOuterRequests=22
Wenn nOuterAxes=0, LückeThreshold wurde nicht überschritten und nur eine Anfrage an EDDTable gestellt.
Wenn nOuterAxes&gt;0, LückeThreshold wurde überschritten und nOuterRequests auf EDDTable gestellt werden, entsprechend jeder gewünschten Kombination der linkssten nOuterAxes. Hat der Datensatz beispielsweise 4 axisVariable s und dataVariable Wie östlich \\[ Zeit \\]  \\[ Breite \\]  \\[ Länge \\]  \\[ Tiefe \\] , links (erste) Achsgröße ist Zeit.
    * wenn&lt;logLevel&gt; in datasets.xml wird auf alle gesetzt, weitere Informationen werden in der log.txt-Datei geschrieben.
         
####  EDDGrid VonEDDTable Skelett XML{#eddgridfromeddtable-skeleton-xml} 
 >&nbsp;&lt;dataset type="EDDGridFromEDDTable" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromEDDTable, this only works if the underlying EDDTable  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;supports updateEveryNMillis. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;gapThreshold>](#gapthreshold)...&lt;/gapThreshold> &lt;!-- 0 or 1. The default is 1000. >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The underlying source EDDTable dataset. -->  
 >&nbsp;&lt;/dataset>  

### EDD*From ERDDAP  {#eddfromerddap} 
 ** EDDGrid Von Erddap** netzgebundene Daten von einer Fernbedienung ERDDAP™ Server.
 **EDDTableFromErddap** behandelt tabellarische Daten von einer Fernbedienung ERDDAP™ Server.

*    EDDGrid FromErddap und EDDTableFromErddap verhalten sich anders als alle anderen Arten von Datensätzen in ERDDAP .
    * Wie andere Arten von Datensätzen erhalten diese Datensätze Informationen über den Datensatz aus der Quelle und halten es im Speicher.
    * Wie andere Arten von Datensätzen, wenn ERDDAP™ sucht nach Datensätzen, zeigt das Datenzugriffsformular an ( * datasetID * .html) , oder zeigt das Formular Make A Graph ( * datasetID * .graph) , ERDDAP™ verwendet die Information über den Datensatz, der im Speicher ist.
    *    EDDGrid VonErddap und EDDTable FromErddap ist die Basis für [Netz/Kunden/Föderationen](/docs/server-admin/scaling) von ERDDAP s, die die CPU-Nutzung effizient verteilen (meist für Kartenherstellung) , Speichernutzung, Datenspeicherung und Bandbreitennutzung eines großen Rechenzentrums.
#### Redirect{#redirect} 
* Im Gegensatz zu anderen Arten von Datensätzen, wenn ERDDAP™ von diesen Datensätzen eine Anforderung an Daten oder Bilder erhält, ERDDAP   [Umleitungen](https://en.wikipedia.org/wiki/URL_redirection) die Anfrage an die Fernbedienung ERDDAP™ Server. Das Ergebnis ist:
    * Dies ist sehr effizient (CPU, Speicher und Bandbreite) , weil sonst
        1. Der Verbund ERDDAP™ muss die Anfrage an den anderen senden ERDDAP™   (die Zeit braucht) .
        2. Der andere ERDDAP™ die Daten zu erhalten, zu reformieren und die Daten an den Verbund zu übermitteln ERDDAP .
        3. Der Verbund ERDDAP™ muss die Daten empfangen (mit Bandbreite) , reformieren (mit CPU und Speicher) , und die Daten an den Benutzer übertragen (mit Bandbreite) . Durch Umleitung des Antrags und Genehmigung des anderen ERDDAP™ die Antwort direkt an den Benutzer zu senden, den Verbund ERDDAP™ verbringt im Wesentlichen keine CPU-Zeit, Speicher oder Bandbreite auf der Anfrage.
    * Die Umleitung ist für den Benutzer unabhängig von der Client-Software transparent (ein Browser oder ein anderes Software- oder Befehlszeilentool) .
*    [Sie können es sagen ERDDAP™ ](#redirect) keine Benutzerwünsche durch Einstellung umleiten&lt;Umleitung&gt;false&lt;/redirect&gt;, aber diese negiert die meisten der Vorteile des ...FromErddap dataset Typs (insbesondere die Belastung des vorderen Endes ERDDAP™ in der Ferne/Backd ERDDAP ) .
         
     
#### Abonnements{#subscriptions} 
Normalerweise, wenn ein EDDGrid VonErddap und EDDTable Von Erddap sind (Wiederholen) beladen auf Ihre ERDDAP , sie versuchen, ein Abonnement zum Remote-Datensatz über die Fernbedienung hinzuzufügen ERDDAP 's E-Mail/URL Abonnement System. Auf diese Weise, wenn sich der Remote-Datensatz ändert, die Fernbedienung ERDDAP™ Kontakte [Pressemitteilungen Seite nicht gefunden](/docs/server-admin/additional-information#set-dataset-flag) auf deiner ERDDAP™ so dass der lokale Datensatz ASAP neu geladen wird und der lokale Datensatz immer perfekt aktuell ist und den Remote-Datensatz mimiert. So, das erste Mal, dass dies passiert, sollten Sie eine E-Mail anfordern, dass Sie das Abonnement validieren. jedoch, wenn die lokale ERDDAP™ kann keine E-Mail senden oder wenn die Fernbedienung ERDDAP 's E-Mail/URL-Abonnement-System ist nicht aktiv, Sie sollten die Fernbedienung e-Mail ERDDAP™ verwalter und anfordern, dass s/he manuell hinzufügen [&lt;onChange&gt; (#onchange) ...&lt;/onChange&gt;-Tags zu allen relevanten Datensätzen, um Ihren Datensatz zu nennen [Pressemitteilungen Flaggen-URL](/docs/server-admin/additional-information#set-dataset-flag) . Sehen Sie? ERDDAP™ täglicher Bericht für eine Liste von setDataset Fahnen-URLs, aber senden Sie einfach die für EDDGrid FromErddap und EDDTableFromErddap-Datensätze zur Fernbedienung ERDDAP™ Administrator.
    
Funktioniert das nicht? Sind Ihre lokalen Datensätze nicht mit den entfernten Datensätzen synchron?
Mehrere Dinge müssen für dieses System korrekt funktionieren, damit Ihre Datensätze aktuell bleiben. Überprüfen Sie jedes dieser Dinge in Ordnung:
    
    1. Ihr ERDDAP™ muss in der Lage sein, E-Mails auszusenden. Sehen Sie die E-Mail-Einstellungen in Ihrem setup.xml.
    2. Allgemein (aber nicht immer) , du ERDDAP '&lt;baseUrl&gt; und&lt;baseHttpsUrl&gt;must keine Portnummer haben (:8080, :8443) . Wenn sie es tun, benutzen Sie eine [Proxypass](/docs/server-admin/deploy-install#proxypass) den Hafen vom Url zu entfernen.
    3. In Ihrem Setup.xml,&lt;abonnierenToRemoteErdddapDataset&gt; muss auf true gesetzt werden.
    4. Wenn Ihr lokaler EDD... FromErddap-Datensatz wird neu geladen, es sollte eine Anfrage an die Fernbedienung senden ERDDAP™ den Remote-Datensatz abonnieren. Sieh log.txt an, um zu sehen, ob das passiert.
    5. Sie sollten eine E-Mail, die Sie bitten, die Abonnement-Anfrage zu validieren.
    6. Sie müssen auf den Link in dieser E-Mail klicken, um die Abonnement-Anfrage zu validieren.
    7. Die Fernbedienung ERDDAP™ sollte sagen, dass die Validierung erfolgreich war. Zu jeder Zeit können Sie eine E-Mail von der Fernbedienung anfordern ERDDAP™ mit einer Liste Ihrer ausstehenden und gültigen Abonnements. Siehe das Formular *RemoteErddapBase Url* /erddap/subscriptions/list.html .
    8. Wenn sich der Remote-Datensatz ändert (z.B. erhält zusätzliche Daten) , die Fernbedienung ERDDAP™ sollte versuchen, das FlagURL auf Ihrem ERDDAP . Sie können das nicht überprüfen, aber Sie können den Administrator der Fernbedienung fragen ERDDAP™ um das zu überprüfen.
    9. Ihr ERDDAP™ eine Aufforderung zur Festlegung dieses FlagURL erhalten. Schauen Sie in Ihrem log.txt für "setDatasetFlag.txt?" Anfrage (S) und sehen, ob eine Fehlermeldung mit den Anfragen verknüpft ist.
    10. Ihr ERDDAP™ sollte dann versuchen, diesen Datensatz neu zu laden (vielleicht nicht sofort, aber ASAP) .
         
#### Aktuelles max (Zeit) ?{#up-to-date-maxtime} 
 EDDGrid /TableFromErddap-Datensätze ändern nur ihre gespeicherten Informationen über jeden Quelldatensatz, wenn der Quelldatensatz ["Reload"](#reloadeverynminutes) und einige Metadatenänderungen (z.B. die Zeitvariable actual\\_range ) , wodurch eine Abonnement-Benachrichtigung erzeugt wird. Hat der Quelldatensatz Daten, die sich häufig ändern (zum Beispiel neue Daten jede Sekunde) und nutzt die ["update"](#updateeverynmillis) System, um häufige Änderungen der zugrunde liegenden Daten zu bemerken, EDDGrid /TableFromErddap wird nicht über diese häufigen Änderungen informiert, bis der nächste Datensatz "Reload", also die EDDGrid /TableFromErddap wird nicht perfekt auf dem neuesten Stand sein. Sie können dieses Problem durch Änderung des Quelldatensatzes minimieren&lt;reloadEveryNMinutes&gt; auf einen kleineren Wert (60? 15?) so dass es mehr Abonnement-Benachrichtigungen, um die EDDGrid /TableFromErddap, um seine Informationen über den Quelldatensatz zu aktualisieren.

Oder wenn Ihr Datenmanagementsystem weiß, wann der Quelldatensatz neue Daten hat (z.B. über ein Skript, das eine Datendatei kopiert) , und wenn das nicht super häufig ist (z.B. alle 5 Minuten oder weniger häufig) Es gibt eine bessere Lösung:

1. Nicht verwenden&lt;updateEveryNMillis&gt;, um den Quelldatensatz aktuell zu halten.
2. Den Quelldatensatz festlegen&lt;reloadEveryNMinutes&gt; auf eine größere Anzahl (1440?) .
3. Lassen Sie das Skript den Quelldatensatz kontaktieren [Zurück zur Übersicht](/docs/server-admin/additional-information#set-dataset-flag) rechts nachdem es eine neue Datendatei kopiert.
     

Dies führt dazu, dass der Quelldatensatz perfekt aktuell ist und dazu führt, dass er eine Abonnement-Benachrichtigung generiert, die an die EDDGrid /TableFromErddap Datensatz. Das führt EDDGrid /TableFromErddap-Datensatz ist perfekt auf dem neuesten Stand (gut, innerhalb von 5 Sekunden neue Daten hinzugefügt) . Und alles, was effizient getan wird (ohne unnötige Datensatz-Reloads) .
     
#### Nein addAttributes , axisVariable , oder dataVariable  {#no-addattributes-axisvariable-or-datavariable} 
Im Gegensatz zu anderen Arten von Datensätzen, EDDTableFromErddap und EDDGrid FromErddap-Datensätze erlauben keine globale&lt;addAttributes&gt;,&lt; axisVariable &gt; oder&lt; dataVariable &gt; Abschnitte im datasets.xml für diesen Datensatz. Das Problem besteht darin, dass es zu Unstimmigkeiten führen würde:
    
1. Sagen wir, es war erlaubt und Sie haben ein neues globales Attribut hinzugefügt.
2. Wenn ein Benutzer fragt ERDDAP™ für die globalen Attribute erscheint das neue Attribut.
3. Aber wenn ein Benutzer fragt ERDDAP™ für eine Datendatei, ERDDAP™ leitet die Anfrage an die Quelle um ERDDAP . Das ERDDAP™ ist sich des neuen Attributs nicht bewusst. Wenn es also eine Datendatei mit Metadaten erstellt, z.B. a .nc Datei, die Metadaten haben nicht das neue Attribut.

Es gibt zwei Work-arounds:

1. Überzeugen Sie den Admin der Quelle ERDDAP™ die Änderungen vorzunehmen, die Sie den Metadaten wünschen.
2. Statt EDDTableFromErddap verwenden [EDDTableFromDapSequenz](#eddtablefromdapsequence) . Oder statt EDDGrid AusErdddap, verwenden [ EDDGrid VonDap](#eddgridfromdap) . Diese EDD-Typen ermöglichen es Ihnen, effizient mit einem Datensatz auf einem Remote zu verbinden ERDDAP™   (aber ohne Umleitung von Datenanfragen) und sie ermöglichen es Ihnen, die globale&lt;addAttributes&gt;,&lt; axisVariable &gt; oder&lt; dataVariable &gt; Abschnitte im datasets.xml . Ein anderer Unterschied: Sie müssen manuell den Remote-Datensatz abonnieren, so dass der Datensatz auf Ihrem ERDDAP™ wird notifiziert (über die [Zurück zur Übersicht](/docs/server-admin/additional-information#set-dataset-flag) ) wenn Änderungen am Remote-Datensatz vorhanden sind. So erstellen Sie einen neuen Datensatz, anstatt mit einem Remote-Datensatz zu verknüpfen.
         
#### Anmerkungen{#other-notes} 
* Aus Sicherheitsgründen EDDGrid VonErddap und EDDTable FromErdddap unterstützt nicht die [&lt;zugänglichzu&gt; (#accessibleto) tag und kann nicht mit Remote-Datensätzen verwendet werden, die einloggen müssen (weil sie verwenden [&lt;zugänglichzu&gt; (#accessibleto) ) Vgl. ERDDAP ' [Sicherheitssystem](/docs/server-admin/additional-information#security) zur Einschränkung des Zugriffs auf einige Datensätze auf einige Benutzer.
     
* Beginnen mit ERDDAP™ v2.10, EDDGrid FromErddap und EDDTableFromErdap unterstützen die [&lt;zugänglichViaFiles&gt;] (#accessibleviafiles) tag. Im Gegensatz zu anderen Arten von Datensätzen ist der Standard zwar zutreffend, aber die Dateien des Datensatzes werden nur dann zugänglich sein, wenn der Quelldatensatz auch&lt;zugänglichViaFiles&gt; auf true gesetzt.
     
* Sie können die [Datensätze generieren Xml Programm](#generatedatasetsxml) um die datasets.xml chunk für diese Art von Datensatz. Aber Sie können diese Arten von Datensätzen leicht von Hand.
     
####  EDDGrid VonErddap Skelett XML{#eddgridfromerddap-skeleton-xml} 
*    EDDGrid VonErddap Skelett XML-Datensatz ist sehr einfach, da die Absicht nur ist, den Remote-Datensatz zu mimieren, der bereits für den Einsatz in ERDDAP :
 >&nbsp;&nbsp;&lt;dataset type="EDDGridFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)...&lt;/accessibleViaFiles> &lt;!-- 0 or 1, default=true. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromErddap, this gets the remote .dds and then gets  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the new leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
 >&nbsp;&nbsp;&lt;/dataset>  

#### EDDTableFromErddap Skelett XML{#eddtablefromerddap-skeleton-xml} 
* Das skeleton XML für einen EDDTableFromErdap-Datensatz ist sehr einfach, da die Absicht nur den entfernten Datensatz mimieren soll, der bereits für den Einsatz in ERDDAP :
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid Von Etopo{#eddgridfrometopo} 
 [ ** EDDGrid Von Etopo** ](#eddgridfrometopo) dient nur [ETOPO1 Global 1-Minute Gridded Eleved Datensatz](https://www.ngdc.noaa.gov/mgg/global/global.html)   (Eisoberfläche, Gitter registriert, binär, 2byte int: etopo1\\_ice\\_g\\_i2 .zip ) die mit ERDDAP .

* Nur zwei datasetID s werden unterstützt EDDGrid FromEtopo, so dass Sie auf die Daten mit Längenwerten -180 bis 180 oder Längenwerte 0 bis 360 zugreifen können.
* Es gibt niemals Sub-Tags, da die Daten bereits innerhalb beschrieben werden ERDDAP .
* Also die beiden Optionen für EDDGrid FromEtopo-Datensätze sind (wörtlich) :
```
      <!-- etopo180 serves the data from longitude -180 to 180 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo180" /> 
      <!-- etopo360 serves the data from longitude 0 to 360 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo360" /> 
```

###  EDDGrid VonFiles{#eddgridfromfiles} 
 [ ** EDDGrid VonFiles** ](#eddgridfromfiles) ist die Superklasse von allen EDDGrid Von...Files-Kursen. Sie können nicht verwenden EDDGrid VonFiles direkt. Verwenden Sie stattdessen eine Unterklasse von EDDGrid VonFiles zum Umgang mit dem spezifischen Dateityp:

*    [ EDDGrid VonMergeIRFiles](#eddgridfrommergeirfiles) Daten von netzgebundenen [MergeIR .gz ](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README) Dateien.
*    [ EDDGrid VonAudioFiles](#eddfromaudiofiles) aggregiert Daten aus einer Gruppe von lokalen Audiodateien.
*    [ EDDGrid Von NcFiles](#eddgridfromncfiles) Daten von netzgebundenen [GRIB .grb](https://en.wikipedia.org/wiki/GRIB) Dateien, [ HDF   (v4 oder v5)   .hdf ](https://www.hdfgroup.org/) Dateien, [ .nc ml](#ncml-files) Dateien und [ NetCDF   (v3 oder v4)   .nc ](https://www.unidata.ucar.edu/software/netcdf/) Dateien. Dies kann mit anderen Dateitypen funktionieren (zum Beispiel BUFR) , wir haben es einfach nicht getestet -- bitte senden Sie uns einige Musterdateien, wenn Sie interessiert sind.
*    [ EDDGrid VonNcFilesUnpacked](#eddgridfromncfilesunpacked) eine Variante von EDDGrid FromNcFiles, die Daten von netzgebundenen NetCDF   (v3 oder v4)   .nc und verwandten Dateien, die ERDDAP™ entpackt auf einem niedrigen Niveau.

Derzeit werden keine anderen Dateitypen unterstützt. Aber es ist in der Regel relativ einfach, Unterstützung für andere Dateitypen hinzuzufügen. Kontaktieren Sie uns, wenn Sie eine Anfrage haben. Oder, wenn Ihre Daten in einem alten Dateiformat sind, von dem Sie wegziehen möchten, empfehlen wir, die Dateien zu konvertieren NetCDF V3 .nc Dateien. NetCDF ist ein breit unterstütztes, binäres Format, ermöglicht schnellen Zugriff auf die Daten und wird bereits von ERDDAP .

#### Von Dateien Details{#from-files-details} 
Die folgenden Informationen gelten für alle Unterklassen von EDDGrid VonFiles.

##### Aggregation einer vorhandenen Dimension{#aggregation-of-an-existing-dimension} 
Alle Variationen EDDGrid FromFiles kann Daten aus lokalen Dateien zusammenfassen, wobei jede Datei 1 (oder mehr) unterschiedliche Werte für links (erste) Dimension, in der Regel \\[ Zeit \\] , die aggregiert werden. Beispielsweise könnten die Abmessungen \\[ Zeit \\]  \\[ Höhe \\]  \\[ Breite \\]  \\[ Länge \\] , und die Dateien können die Daten für eine (oder ein paar) Zeitwert (S) pro Datei. Der resultierende Datensatz erscheint, als ob alle Daten der Datei zusammengefasst wurden. Die großen Vorteile der Aggregation sind:

* Die Größe des aggregierten Datensatzes kann viel größer sein als eine einzelne Datei kann bequem sein (~2GB) .
* Für Nah-Real-Time-Daten ist es einfach, eine neue Datei mit dem neuesten Datenklumpen hinzuzufügen. Sie müssen den gesamten Datensatz nicht neu schreiben.

Die Aggregationsanforderungen sind:
* Die lokalen Dateien müssen nicht die gleichen haben dataVariable S (wie im Datensatz definiert datasets.xml ) . Der Datensatz wird dataVariable s definiert in datasets.xml . Wenn eine bestimmte Datei keine gegebene Datei hat dataVariable , ERDDAP™ wird bei Bedarf fehlende Werte hinzufügen.
* Alle dataVariable UMWELT axisVariable s/Dimensionen (wie im Datensatz definiert datasets.xml ) . Die Dateien werden basierend auf dem ersten aggregiert (links-most) Dimension, in aufsteigender Reihenfolge sortiert.
* Jede Datei MAY hat Daten für einen oder mehrere Werte der ersten Dimension, aber es kann keine Überschneidung zwischen Dateien sein. Wenn eine Datei mehr als einen Wert für die erste Dimension hat, werden die Werte MUST in aufsteigender Reihenfolge sortiert, ohne Krawatten.
* Alle Dateien haben genau die gleichen Werte für alle anderen Dimensionen. Die Genauigkeit der Prüfung wird durch [MatchAxisNDigits](#matchaxisndigits) .
* Alle Dateien haben genau das gleiche [Einheiten](#units) Metadaten für alle axisVariable s und dataVariable S. Wenn dies ein Problem ist, können Sie [NcML](#ncml-files) oder [ NCO ](#netcdf-operators-nco) um das Problem zu beheben.
         
##### Aggregation über Dateinamen oder globale Metadaten{#aggregation-via-file-names-or-global-metadata} 
Alle Variationen EDDGrid FromFiles kann auch eine Gruppe von Dateien aggregieren, indem ein neues linkmost (erste) Dimension, in der Regel Zeit, basierend auf einem Wert, der von jedem Dateinamen oder vom Wert eines globalen Attributs abgeleitet wird, das in jeder Datei ist. Beispielsweise kann der Dateiname den Zeitwert für die Daten in der Datei enthalten. ERDDAP™ würde dann eine neue Zeitdimension schaffen.

Im Gegensatz zu der ähnlichen Funktion in THREDDS, ERDDAP™ immer schafft axisVariable mit Zahlenwerten (nach Bedarf durch CF) , nie String Werte (die von CF nicht zugelassen werden) . Auch, ERDDAP™ wird die Dateien in der Aggregation basierend auf der numerischen axisVariable Wert, der jeder Datei zugeordnet ist, so dass die Achsgröße immer sortierte Werte nach CF haben wird. Der THREDDS-Ansatz, basierend auf den Dateinamen eine lexicographische Sortierung durchzuführen, führt zu Aggregationen, bei denen die Achsenwerte nicht sortiert werden (die von CF nicht zugelassen werden) wenn die Dateinamen anders sortieren als die abgeleiteten axisVariable Werte.

Um eine dieser Aggregate einzurichten ERDDAP™ , Sie definieren ein neues linkmost (erste)   [ axisVariable ](#axisvariable) mit einem speziellen Pseudo&lt; sourceName &gt;, die ERDDAP™ wo und wie man den Wert für die neue Dimension aus jeder Datei findet.

* Das Format für das Pseudo sourceName der den Wert eines Dateinamens erhält (nur Dateiname.ext) ist
    \\*\\*( *DateiName,*  [Daten Typ](#data-types)  *,* ExtraktRegex *,* FanggruppeAnzahl*
* Das Format für das Pseudo sourceName die den Wert von dem absoluten Pfadnamen einer Datei erhält
    \\*\\*( *PfadName,*  [Daten Typ](#data-types)  *,* ExtraktRegex *,* FanggruppeAnzahl*
     \\[ Dazu verwendet der Pfadname immer '/' als Verzeichniszeichen, nie '\'. \\] 
* Das Format für das Pseudo sourceName die den Wert eines globalen Attributs erhält
    \\*\\*( *global:* Eigenschaften Name *,*  [Daten Typ](#data-types)  *,* ExtraktRegex *,* FanggruppeAnzahl*
* Dieses Pseudo sourceName Die Option funktioniert anders als die anderen: anstatt ein neues linkmost zu erstellen (erste)   axisVariable , dies ersetzt den Wert des Stroms axisVariable mit einem Wert aus dem Dateinamen (nur Dateiname.ext) . Das Format ist
    \\*\\*( *ersetzen FromFileName,*  [Daten Typ](#data-types)  *,* ExtraktRegex *,* FanggruppeAnzahl*
     

Die Beschreibungen der zu liefernden Teile sind:

*    *Eigenschaften Name* -- der Name des globalen Attributs, das in jeder Datei ist und den Dimensionswert enthält.
*    *Daten Typ* -- Dies gibt den Datentyp an, mit dem die Werte gespeichert werden. Siehe die Standardliste [Daten Arten](#data-types) dass ERDDAP™ unterstützt, außer dass String hier nicht erlaubt ist, da Achsengrößen in ERDDAP™ kann nicht String-Variablen sein.
    
Es gibt einen zusätzlichen PseudodatenTyp, timeFormat= *Zeichen Zeitformat* , was sagt ERDDAP™ dass der Wert ein String timeStamp ist [Einheiten geeignet für Stringzeiten](#string-time-units) . In den meisten Fällen wird das stringTimeFormat, das Sie benötigen, eine Variation eines dieser Formate sein:
    
    *    yyyy-MM-dd 'T'HH:mm:ss.SSSZ -- die ISO 8601:2004 (E) Datum Zeitformat. Sie können eine verkürzte Version davon benötigen, z.B. yyyy-MM-dd 'T'HH:mm:ss oder yyyy-MM-dd .
    * yyyyMMddHHmmss.SSS -- die kompakte Version des ISO 8601 Datumsformats. Sie können eine verkürzte Version dieser benötigen, z.B. yyyyMMdHHmmss oder yyyyMMddd.
    * M/d/yyyy H:mm:ss.SSS -- das ist das US-Slash-Datumsformat. Sie können eine verkürzte Version dieser, z.B. M/d/yyyy benötigen.
    * yyyyDDDHHmmsSSS -- das ist das Jahr plus der null-gepolsterte Tag des Jahres (z.B. 001 = Jan 1, 365 = Dec 31 in einem Nicht-Leap-Jahr; dies wird manchmal irrtümlich als das Julianische Datum bezeichnet) . Sie können eine verkürzte Version dieser benötigen, z.B. yyyyDDD .
    
Wenn Sie diesen Pseudodatentyp verwenden, fügen Sie diese der neuen Variablen hinzu&lt; addAttributes &gt;
```
        <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Wenn Sie alle Zeitwerte verschieben möchten, verschieben Sie den Zeitwert in Einheiten, z.
1970-01T12:00Z.
*    *ExtraktRegex* -- Das ist die [regelmäßiger Ausdruck](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [Tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) die eine Fanggruppe umfasst (in Klammern) die beschreibt, wie der Wert aus dem Dateinamen oder dem globalen Attributwert extrahiert wird. Zum Beispiel bei einem Dateinamen wie S19980011998031.L3b\\_MO\\_CHL .nc , Fanggruppe #1, "\\ \\dTutorial ", im regulären Ausdruck S (( \\dTutorial ) ( \\dTutorial \\.L3b.\\* erfasst die ersten 7 Ziffern nach 'S': 1998001.
*    *FanggruppeNumber* -- Dies ist die Anzahl der Fanggruppe (innerhalb eines Klammerpaares) im regelmäßigen Ausdruck, der die Informationen von Interesse enthält. Es ist in der Regel 1, die erste Fanggruppe. Manchmal müssen Sie Capture-Gruppen für andere Zwecke im Regex verwenden, so dass dann die wichtige Capture-Gruppe Nummer 2 (die zweite Fanggruppe) oder 3 (die dritte) , usw.

Ein vollständiges Beispiel eines axisVariable die einen aggregierten Datensatz mit einer neuen Zeitachse macht, die die Zeitwerte aus dem Dateinamen jeder Datei erhält
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
      </axisVariable>
```
Wenn Sie die Pseudodaten "timeFormat=" verwenden Art, ERDDAP™ 2 Attribute zu dem axisVariable so dass sie von der Quelle kommen scheinen:
```
    <att name="standard\\_name">time</att>  
    <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Also in diesem Fall, ERDDAP™ eine neue Achse namens "time" mit Doppelwerten (Sekunden seit 1970-0100:00Z) durch Extrahieren der 7 Ziffern nach 'S' und vor ".L3m" im Dateinamen und Dolmetschen der als yyyyDDD formatierten Zeitwerte.

Sie können die Standard-Basiszeit überschreiben (1970-01T00:00 UhrZ) durch Hinzufügen eines [AddAttribute](#addattributes) die ein anderes Einheitenattribut mit einer anderen Basiszeit angibt. Eine häufige Situation ist: Es gibt Gruppen von Datendateien, jede mit einem 1 Tag zusammengesetzt eines Satellitendatensatzes, wo Sie wollen, dass der Zeitwert Mittag des im Dateinamen genannten Tages sein (die zentrierte Zeit jedes Tages) und wollen die Variable long\\_name "Mitte Zeit" zu sein. Ein Beispiel dafür ist:
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
        <addAttributes>
          <att name="long\\_name">Centered Time</att>
          <att name="units">seconds since 1970-01-01T12:00:00Z</att>
        </addAttributes>
      </axisVariable>
```
Anmerkung Stunden=12 in der Basiszeit, die 12 Stunden relativ zur ursprünglichen Basiszeit von 1970-01-01T00:00Z addiert.

Ein vollständiges Beispiel eines axisVariable die einen aggregierten Datensatz mit einer neuen "run" Achse macht (mit Int-Werten) die die Run-Werte aus dem "runID" globalen Attribut in jeder Datei erhält (mit Werten wie "r17\\_global", wobei 17 die Laufnummer ist) ist
```
      <axisVariable> 
        <sourceName>\\*\\*\\*global:runID,int,(r|s)(\\d+)\\_global,2</sourceName>
        <destinationName>run</destinationName>
        <addAttributes>
          <att name="ioos\\_category">Other</att>
          <att name="units">count</att>
        </addAttributes>
      </axisVariable>
```
Beachten Sie die Verwendung der Erfassungsgruppe Nummer 2 zur Erfassung der nach 'r' oder 's' auftretenden Stellen und vor "\\_global". Dieses Beispiel zeigt auch, wie man zusätzliche Attribute hinzufügt (z.B., ioos\\_category und Einheiten) zur Achsgröße.
     
#### Extern komprimierte Dateien{#externally-compressed-files} 
* Datensätze, die Teilmengen von EDDGrid VonFiles und EDDTable FromFiles kann Daten direkt von extern komprimierten Datendateien, einschließlich .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 , und .Z Dateien.
     
*    **Das funktioniert überraschend gut&#33;**   
In den meisten Fällen ist die Verlangsamung im Zusammenhang mit der Dekomprimierung kleiner und mittlerer Dateien gering. Wenn Sie Speicherplatz benötigen, empfehlen wir die Verwendung dieser Funktion, insbesondere für ältere Dateien, die selten aufgerufen werden.
     
*    **Sparen Sie Geld&#33;**   
Dies ist eine der wenigen Features in ERDDAP™ das bietet Ihnen eine Chance, viel Geld zu sparen (obwohl zu den Kosten der leicht verringerten Leistung) . Ist das Kompressionsverhältnis z.B. 6:1 (manchmal wird es viel höher) , dann werden die Datendateien des Datensatzes nur 1/6 des Speicherplatzes benötigen. Dann können Sie vielleicht mit 1 RAID (einer bestimmten Größe) anstatt 6 RAIDS (der gleichen Größe) . Das ist eine enorme Kostenersparnis. Hoffentlich die Fähigkeit, einige Dateien in einer Sammlung zu komprimieren (die älteren?) und nicht komprimieren andere (die neueren?) , und um das jederzeit zu ändern, lassen Sie uns den Nachteil minimieren, einige der Dateien zu komprimieren (langsamer Zugang) . Und wenn die Wahl zwischen dem Speichern der Dateien auf Band (und nur auf Anfrage nach einer Verzögerung zugänglich) vs speichern sie komprimiert auf einem RAID (und via ERDDAP ) , dann gibt es einen großen Vorteil mit Kompression, so dass Benutzer interaktiv und (relativ) schnellen Zugriff auf die Daten. Und wenn dies Sie vor dem Kauf einer zusätzlichen RAID speichern kann, kann diese Funktion Sie ungefähr $30.000 speichern.
     
* Für alle EDDGrid FromFiles Subclasses, wenn die Datendateien eine Erweiterung haben, die angibt, dass sie extern komprimierte Dateien sind (aktuell: .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 oder .Z) , ERDDAP™ dekomprimiert die Dateien in das Cache-Verzeichnis des Datensatzes, wenn es sie liest (wenn sie nicht schon im Cache sind) . Das gleiche gilt für binäre Datei (z.B., .nc ) Unterklassen von EDDTableFromFiles.
     
* Für EDDTableFromFiles Unterklassen für nicht-binäre Dateien (z.B., .csv) , Datendateien mit einer Erweiterung, die angeben, dass sie extern komprimierte Dateien sind, werden beim Lesen der Datei auf-the-fly komprimiert.
     
* ANFORDERUNG: Wenn die Art der extern komprimierten Datei verwendet wird (z.B., .tgz oder .zip ) unterstützt mehr als 1 Datei innerhalb der komprimierten Datei, die komprimierte Datei muss nur 1 Datei enthalten.
     
* ANFORDERUNG: Diese Funktion geht davon aus, dass sich der Inhalt der extern komprimierten Dateien nicht ändert, so dass eine cached dekomprimierte Datei wieder verwendet werden kann. Wenn einige oder alle Datendateien eines Datensatzes manchmal geändert werden, komprimieren Sie diese Dateien nicht. Dies entspricht der gemeinsamen Nutzung, da Menschen normalerweise keine Dateien komprimieren, die sie manchmal ändern müssen.
     
*   &lt;DateiNameRegex&gt; Um diese Arbeit zu machen, ist der Datensatz&lt;fileNameRegex&gt; muss den Namen der komprimierten Dateien entsprechen. Natürlich, regexes wie .\\*wird alle Dateinamen entsprechen. Wenn Sie einen bestimmten Dateityp angeben, z.B., .\\*\\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ .nc , dann müssen Sie den Regex ändern, um die Kompressionserweiterung zu enthalten, z.B., .\\ *\\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ .nc \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ .gz (wenn alle Dateien werden* Was? .nc  .gz Dateien) .
     
* Es ist gut, wenn Ihr Datensatz eine Mischung aus komprimierten und nicht komprimierten Dateien enthält. Dies kann nützlich sein, wenn Sie glauben, dass einige Dateien (z.B. ältere Dateien) wird weniger oft verwendet werden und daher wäre es nützlich, Speicherplatz durch Zusammendrücken zu speichern. Um diese Arbeit zu machen, die&lt;fileNameRegex&gt; muss den komprimierten und nicht komprimierten Dateien Namen entsprechen, z.B. .\\*oder\\*\\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ .nc  ( | \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ .gz ) (wo die Fanggruppe am Ende davon angibt, dass .gz ist optional.
     
* Es ist in Ordnung, wenn Sie bestimmte Dateien in der Sammlung jederzeit komprimieren oder dekomprimieren.
Wenn der Datensatz nicht verwendet wird [&lt;UpdateEveryNMillis&gt;] (#updateeverynmillis) , den Datensatz einstellen [Flagge](/docs/server-admin/additional-information#flag) zu sagen ERDDAP™ um den Datensatz neu zu laden und so die Änderungen zu bemerken. Interessanterweise können Sie verschiedene Kompressionsalgorithmen und Einstellungen für verschiedene Dateien im gleichen Datensatz verwenden (z.B., .bz2 für selten verwendete Dateien, .gz für nicht häufig verwendete Dateien und keine Komprimierung für häufig verwendete Dateien) , stellen Sie einfach sicher, dass der regex alle in Gebrauch befindlichen Dateierweiterungen unterstützt, z.B. .\\*\\ .nc  ( | \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ .gz  | \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\ n \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ .bz2 ) .
     
* Selbstverständlich variieren Kompressionsverhältnisse und Geschwindigkeiten für die verschiedenen Kompressionsalgorithmen mit der Quelldatei und den Einstellungen (z.B. Druckniveau) . Wenn Sie dieses System für Ihre Dateien optimieren möchten, machen Sie einen Test der verschiedenen Kompressionsmethoden mit Ihren Dateien und mit einer Reihe von Kompressionseinstellungen. Wenn Sie sicher gut wollen (nicht unbedingt das Beste) Setup, wir werden leicht empfehlen gzip   ( .gz ) . gzip macht die kleinste komprimierte Datei nicht (es ist ziemlich nah) , aber es komprimiert die Datei sehr schnell und (wichtiger für ERDDAP™ Benutzer) dekomprimiert die Datei sehr schnell. Plus, gzip Software kommt standardmäßig mit jeder Linux- und Mac OS-Installation und ist für Windows über kostenlose Tools wie 7Zip und Linux Add-ons wie Git Bash verfügbar. Zum Beispiel, um eine Quelldatei in die .gz Version der Datei (gleichen Dateinamen, aber mit .gz anhängig) , Verwendung (in Linux, Mac OS und Git Bash)   
     gzip   * sourceName *   
Um eine .gz zurück zum Original, verwenden
Pistolenverschluss * sourceName  .gz *   
Um jede der Quelldateien im Verzeichnis und seinen Unterverzeichnissen zu komprimieren, verwenden Sie
     gzip -r *RegieName*   
Um jeden der .gz Dateien im Verzeichnis und dessen Unterverzeichnisse, wiederkehrend, verwenden
Reißverschlüsse *RegieName*   
     
* WARNING: Nicht extern komprimieren ( gzip ) Dateien, die bereits intern komprimiert sind&#33;
Viele Dateien haben bereits komprimierte Daten intern. Wenn Sie gzip diese Dateien, die resultierenden Dateien werden nicht viel kleiner sein (&lt;5 % und ERDDAP™ wird Zeit verlieren, sie zu dekomprimieren, wenn es sie lesen muss. Zum Beispiel:
    
    * Datendateien: z. .nc 4 und .hdf 5 Dateien: Einige Dateien verwenden interne Kompression; einige nicht. Wie zu sagen: komprimierte Variablen haben "\\_ChunkSize" Attribute. Auch, wenn eine Gruppe von Gittern .nc oder .hdf Dateien sind alle unterschiedlichen Größen, sie sind wahrscheinlich intern komprimiert. Sind sie alle gleich groß, werden sie nicht intern komprimiert.
    * Bilddateien: z.B. .gif, .jpg und .png
    * Audiodateien: z.B. .mp3, und .ogg.
    * Videodateien: z.B. .mp4, .ogv und .webm.
    
        
Ein unglücklicher seltsamer Fall: .wav Audiodateien sind riesig und nicht intern komprimiert. Es wäre schön zu komprimieren ( gzip ) Sie, aber in der Regel sollten Sie nicht, weil, wenn Sie tun, Benutzer nicht in der Lage, die komprimierten Dateien in ihrem Browser zu spielen.
     
* Testfall: Komprimierung (mit gzip ) ein Datensatz mit 1523 gerastet .nc Dateien.
    
    * Die Daten in den Quelldateien waren spärlich (viele fehlende Werte) .
    * Der gesamte Speicherplatz ging von 57 GB vor der Kompression auf 7 GB nach.
    * Eine Anfrage für viele Daten ab einem Zeitpunkt ist&lt;1 s vor und nach der Kompression.
    * Eine Anfrage an 1 Datenpunkt für 365 Zeitpunkte (die schlimmste Situation) von 4 s auf 71 s.
         
    
Für mich ist das ein vernünftiger Kompromiss für jeden Datensatz, und sicherlich für Datensätze, die selten verwendet werden.
     
* Interne gegen externe Kompression --
Im Vergleich zur internen Dateikompression, die von .nc 4 und .hdf 5 Dateien, ERDDAP 's Ansatz für extern komprimierte binäre Dateien hat Vorteile und Nachteile. Der Nachteil ist: Zum einen ist die interne Komprimierung eines kleinen Teils einer Datei besser, weil EDDGrid FromFiles muss nur ein paar Stück dekomprimieren (S) der Datei, nicht die gesamte Datei. Aber... ERDDAP 's Ansatz hat einige Vorteile:
    
    *    ERDDAP™ unterstützt die Komprimierung aller Arten von Dateien (binär und nichtbinär, z. .nc 3 und csv) nicht nur .nc 4 und .hdf 4.
    * Wenn der Großteil einer Datei mehr als einmal in kurzer Zeit gelesen werden muss, spart es Zeit, die Datei einmal zu dekomprimieren und mehrmals zu lesen. Das passiert. ERDDAP™ wenn ein Benutzer Make-A-Graph für den Datensatz verwendet und eine Reihe von kleinen Änderungen im Diagramm macht.
    * Die Fähigkeit, komprimierte Dateien und nicht komprimierte Dateien in derselben Sammlung zu haben, ermöglicht Ihnen mehr Kontrolle darüber, welche Dateien komprimiert werden und welche nicht. Und diese zusätzliche Kontrolle kommt ohne wirklich die Quelldatei ändern (da Sie eine Datei mit z.B. komprimieren können, .gz und dann dekomprimieren es, um die ursprüngliche Datei zu erhalten) .
    * Die Fähigkeit, jederzeit zu ändern, ob eine bestimmte Datei komprimiert wird und wie sie komprimiert wird (verschiedene Algorithmen und Einstellungen) gibt Ihnen mehr Kontrolle über die Leistung des Systems. Und Sie können leicht die ursprüngliche unkomprimierte Datei jederzeit wiederherzustellen.
    
Während weder Ansatz ein Gewinner in allen Situationen ist, ist klar, dass ERDDAP Die Fähigkeit, Daten von extern komprimierten Dateien zu bedienen, macht die externe Komprimierung zu einer vernünftigen Alternative zur internen Komprimierung, die von .nc 4 und .hdf 5. Das ist wichtig, da die interne Komprimierung einer der Hauptgründe ist, aus denen die Menschen wählen, zu verwenden .nc 4 und .hdf 5.
     
##### Dekomprimiert Cache{#decompressed-cache} 
 ERDDAP™ macht eine dekomprimierte Version jeder komprimierten binären (z.B., .nc ) Datendatei, wenn sie die Datei lesen muss. Die dekomprimierten Dateien werden innerhalb des Verzeichnisses des Datensatzes gespeichert *BigParentDirectory* /dekomprimiert/ . Dekomprimierte Dateien, die vor kurzem nicht verwendet wurden, werden gelöscht, um Platz zu freizuschalten, wenn die kumulative Dateigröße &gt;10GB ist. Sie können das durch Einstellung ändern&lt;dekomprimiertCacheMaxGB&gt; (Standardeinstellungen) in Datensätzen Xml.xml, z.
```
        <decompressedCacheMaxGB>40</decompressedCacheMaxGB>  
```
Auch dekomprimierte Dateien, die in den letzten 15 Minuten nicht verwendet wurden, werden zu Beginn jedes großen Datensatz-Reloads gelöscht. Sie können das durch Einstellung ändern&lt;dekomprimiertCacheMaxMinutesAlt&gt; (Standardeinstellungen) in Datensätzen Xml.xml, z.
```
        <decompressedCacheMaxMinutesOld>60</decompressedCacheMaxMinutesOld>  
```
Größere Zahlen sind nett, aber die kumulative Größe der dekomprimierten Dateien kann verursachen *BigParentDirectory* aus dem Festplattenraum zu laufen, was schwere Probleme verursacht.
     
* Weil eine Datei dekomprimiert kann eine erhebliche Zeit dauern (0,1 bis 10 Sekunden) , Datensätze mit komprimierten Dateien können von der Einstellung des Datensatzes profitieren [&lt;nThreads&gt;] (#nthreads) Einstellung zu einer höheren Zahl (2? 3? 4?) . Die Nachteile zu noch höheren Zahlen (z.B. 5? 6? 7?) schwächende Renditen sind und dass die Anfrage eines Benutzers dann einen hohen Prozentsatz der Ressourcen des Systems verwenden kann, wodurch die Bearbeitung der Anfragen anderer Benutzer erheblich verlangsamt wird. So gibt es keine ideale nThreads Einstellung, nur verschiedene Konsequenzen in verschiedenen Situationen mit unterschiedlichen Einstellungen.
         
#### Sortierte Maßwerte{#sorted-dimension-values} 
Die Werte für jede Dimension MUST sind in sortierter Reihenfolge (aufsteigend oder absteigend, mit Ausnahme der ersten (links-most) Dimension, die aufsteigen muss) . Die Werte können unregelmäßig beabstandet sein. Es gibt keine Krawatten. Dies ist eine Forderung der [CF metadata standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) . Wenn die Werte der Dimension nicht in sortierter Reihenfolge sind, wird der Datensatz nicht geladen und ERDDAP™ den ersten ungebrochenen Wert in der Protokolldatei identifizieren, *BigParentDirectory* /logs/log.txt .
    
Unsortierte Dimensionswerte geben fast immer ein Problem mit dem Quelldatensatz an. Dies geschieht am häufigsten, wenn in der Aggregation eine fehlerhafte oder unangemessene Datei enthalten ist, die zu einer ungestörten Zeitdimension führt. Um dieses Problem zu lösen, siehe die Fehlermeldung in der ERDDAP™ log.txt Datei, um den absteigenden Zeitwert zu finden. Dann schauen Sie in die Quelldateien, um die entsprechende Datei zu finden (oder vor oder nach) Das gehört nicht zur Aggregation.
    
#### Verzeichnisse{#directories} 
Die Dateien MAY sind in einem Verzeichnis oder in einem Verzeichnis und seinen Unterverzeichnissen (rekursiv) . Wenn es eine große Anzahl von Dateien (zum Beispiel &gt; 1.000) , das Betriebssystem (und damit EDDGrid VonFiles) wird viel effizienter arbeiten, wenn Sie die Dateien in einer Reihe von Unterverzeichnissen speichern (eins pro Jahr, oder eins pro Monat für Datensätze mit sehr häufigen Dateien) , so dass es nie eine große Anzahl von Dateien in einem bestimmten Verzeichnis.
     
#### &lt;ccheFromUrl&gt;{#cachefromurl} 
Alle EDDGrid FromFiles und alle EDDTableFromFiles-Datensätze unterstützen eine Reihe von Tags, die sagen ERDDAP™ eine Kopie aller Dateien eines entfernten Datensatzes herunterladen und aufrecht erhalten, oder einen Cache von wenigen Dateien (nach Bedarf heruntergeladen) . Das kann unglaublich nützlich sein. Siehe [Cache VonUrl Dokumentation](#cachefromurl) .
    
#### Remote Directories und HTTP Range Requests{#remote-directories-and-http-range-requests} 
 (AKA Byte Servieren, Byte Range Anfragen, Akzept-Ranges http Kopf)   
 EDDGrid VonNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles und EDDTableFromNcCFFiles, kann *manchmal* Daten von .nc Dateien auf Remoteservern und über HTTP aufgerufen, wenn der Server unterstützt [Byte Servieren](https://en.wikipedia.org/wiki/Byte_serving) über HTTP-Bereichsanfragen (der HTTP-Mechanismus für Byte-Dienst) . Dies ist möglich, weil netcdf-java (die ERDDAP™ Anwendungen zum Lesen .nc Dateien) unterstützt Lesedaten von Remote .nc Dateien über HTTP-Bereichsanfragen.

 **Tu das nicht&#33;** Es ist schrecklich ineffizient und langsam.
Verwenden Sie stattdessen die [&lt;cacheFromUrl&gt; System) (#cachefromurl) .

Zugang ERDDAP™ datasets als Dateien über Byte range Requests --
Wenn du das hier umdrehst, (in der Theorie) einen Datensatz in ERDDAP™ als Riese .nc Datei per Appending " .nc " zur Basis OPen DAP URL für einen bestimmten Datensatz (z.B.,https://myserver.org/erddap/griddap/datasetID.ncund auch durch Hinzufügen einer ?query danach eine Untermenge angeben) , es ist vielleicht vernünftig zu fragen, ob Sie netcdf-java verwenden können, Ferret , oder andere NetCDF Client-Software zum Lesen von Daten über HTTP Range Anfragen von ERDDAP . Die Antwort ist nein, denn es gibt nicht wirklich eine riesige " .nc " Datei. Wenn Sie dies tun möchten, tun Sie stattdessen eine dieser Optionen:

* Verwendung(OPeN)DAPClient-Software zur Verbindung mit den von ERDDAP . Das ist, was DAP   (und damit ERDDAP ) wurde entworfen. Es ist sehr effizient.
* Oder die Quelldatei herunterladen (S) von "files" System (oder eine Subsetdatei über eine .nc ? Anfrage) auf Ihren Computer und verwenden netcdf-java, Ferret , oder andere NetCDF Client-Software zum Lesen der (Jetzt) lokale Datei (S) .
         
#### Gespeicherte Dateiinformationen{#cached-file-information} 
Wenn EDDGrid FromFiles-Datensatz wird zuerst geladen, EDDGrid FromFiles liest Informationen aus allen relevanten Dateien und erstellt Tabellen (eine Zeile für jede Datei) mit Informationen über jede gültige Datei und jedes "bad" (anders oder ungültig) Datei.
* Die Tabellen werden auch auf der Festplatte gespeichert, wie NetCDF V3 .nc Dateien in *BigParentDirectory* /Datensatz/ *Letzte2CharsOfDatasetID* / * datasetID * / in Dateien benannt:
schmutzig .nc   (die eine Liste der eindeutigen Verzeichnisnamen enthält) ,
Datei Tabelle .nc   (die die Tabelle mit den Informationen jeder gültigen Datei hält) ,
BadFiles .nc   (die die Tabelle mit den Informationen jeder schlechten Datei hält) .
* Um den Zugang zu einem zu beschleunigen EDDGrid VonFiles-Datensatz (aber auf Kosten der Verwendung von mehr Speicher) , Sie können verwenden [&lt;DateiTableInMemory&gt;wahr&lt;/fileTableInMemory&gt;] (#filetableinmemory) zu sagen ERDDAP™ eine Kopie der Dateiinformationstabellen im Speicher zu halten.
* Die Kopie der Datei-Informationstabellen auf der Festplatte ist auch nützlich, wenn ERDDAP™ wird geschlossen und neu gestartet: es spart EDDGrid VonFiles, alle Datendateien neu zu lesen.
* Wenn ein Datensatz neu geladen wird, ERDDAP™ muss nur die Daten in neuen Dateien und Dateien lesen, die sich geändert haben.
* Wenn eine Datei eine andere Struktur als die anderen Dateien hat (beispielsweise einen anderen Datentyp für eine der Variablen oder einen anderen Wert für die " [Einheiten](#units) " Attribut) , ERDDAP fügt die Datei in die Liste der "schlechten" Dateien. Informationen Ã1⁄4ber das Problem mit der Datei werden in der *BigParentDirectory* /logs/log.txt Datei.
* Sie sollten nie mit diesen Dateien löschen oder arbeiten müssen. Eine Ausnahme ist: wenn Sie noch Änderungen an einem Datensatz vornehmen datasets.xml setup, Sie können diese Dateien löschen möchten, um zu zwingen ERDDAP™ alle Dateien neu zu lesen, da die Dateien anders gelesen/interpretiert werden. Wenn Sie jemals diese Dateien löschen müssen, können Sie es tun, wenn ERDDAP™ läuft. (Dann setzen Sie ein [Flagge](/docs/server-admin/additional-information#set-dataset-flag) um den Datensatz ASAP neu zu laden.) Allerdings ERDDAP™ in der Regel bemerkt, dass datasets.xml Informationen passen nicht zur Datei Tabelleninformationen und löschen die Dateitabellen automatisch.
* Wenn Sie fördern möchten ERDDAP™ zur Aktualisierung der gespeicherten Datensatzinformationen (zum Beispiel, wenn Sie gerade hinzugefügt, entfernt oder geändert einige Dateien in das Datenverzeichnis des Datensatzes) , benutzen Sie die [Flaggensystem](/docs/server-admin/additional-information#flag) in Kraft ERDDAP™ um die Cache-Dateiinformationen zu aktualisieren.
         
#### Bearbeitungsanforderungen{#handling-requests} 
Wenn die Datenanforderung eines Clients bearbeitet wird, EDDGrid FromFiles kann schnell in der Tabelle mit den gültigen Dateiinformationen sehen, welche Dateien die angeforderten Daten haben.
     
#### Aktualisierung der Cached File Information{#updating-the-cached-file-information} 
Wenn der Datensatz neu geladen wird, wird die geätzte Dateiinformation aktualisiert.
    
* Der Datensatz wird, wie durch die&lt;reloadEveryNMinutes&gt; in den Informationen des Datensatzes in datasets.xml .
* Der Datensatz wird so schnell wie möglich nachgeladen, wenn ERDDAP™ erkennt, dass Sie hinzugefügt, entfernt, [anfassend](https://en.wikipedia.org/wiki/Touch_(Unix) ) (um die letzte Datei zu ändern Geänderte Zeit) , oder eine Datendatei geändert.
* Der Datensatz wird so schnell wie möglich nachgeladen, wenn Sie den [Flaggensystem](/docs/server-admin/additional-information#flag) .

Wenn der Datensatz neu geladen wird, ERDDAP™ vergleicht die aktuell verfügbaren Dateien mit den Cache-Datei-Informationstabellen. Neue Dateien werden gelesen und der gültigen Dateitabelle hinzugefügt. Dateien, die nicht mehr vorhanden sind, werden von der gültigen Dateitabelle fallen gelassen. Dateien, in denen sich der Dateizeitstempel geändert hat, werden gelesen und ihre Informationen werden aktualisiert. Die neuen Tabellen ersetzen die alten Tabellen im Speicher und auf der Festplatte.
     
#### Schlechte Dateien{#bad-files} 
Die Tabelle der schlechten Dateien und die Gründe, die die Dateien für schlecht erklärt wurden (beschädigte Datei, fehlende Variablen, etc.) wird an die E-Mail geschickt Alles Zur E-Mail-Adresse (wahrscheinlich du) jedes Mal, wenn der Datensatz neu geladen wird. Sie sollten diese Dateien so schnell wie möglich ersetzen oder reparieren.
     
#### Fehlende Variablen{#missing-variables} 
Wenn einige der Dateien nicht einige der dataVariable s definiert im Datensatz datasets.xml chunk, das ist okay. Wann EDDGrid FromFiles liest eine dieser Dateien, es wird als ob die Datei die Variable, aber mit allen fehlenden Werten.
     
#### FTP-Fehler/Advice{#ftp-troubleadvice} 
Wenn Sie FTP neue Datendateien an die ERDDAP™ Server während ERDDAP™ es läuft, es besteht die Chance, ERDDAP™ wird den Datensatz während des FTP-Prozesses neu geladen. Es passiert öfter, als Sie denken könnten&#33; Wenn es passiert, erscheint die Datei gültig (es hat einen gültigen Namen) , aber die Datei ist noch nicht gültig. wenn ERDDAP™ versucht, Daten aus dieser ungültigen Datei zu lesen, der resultierende Fehler wird dazu führen, dass die Datei in der Tabelle der ungültigen Dateien hinzugefügt wird. Das ist nicht gut. Um dieses Problem zu vermeiden, verwenden Sie einen temporären Dateinamen, wenn FTP die Datei, zum Beispiel ABC2005 .nc \\_TEMP . Dann der DateiNameRegex-Test (siehe unten) wird angeben, dass dies keine relevante Datei ist. Nachdem der FTP-Prozess abgeschlossen ist, umbenennen Sie die Datei in den richtigen Namen. Der Umbenennvorgang bewirkt, dass die Datei in einem Augenblick relevant wird.
     
#### "0 Dateien" Fehlermeldung{#0-files-error-message-1} 
Wenn Sie [GenerateDatasetsXml](#generatedatasetsxml) oder [DasDds](#dasdds) , oder wenn Sie versuchen, eine EDDGrid Von...Files dataset in ERDDAP™ , und Sie erhalten eine "0 Dateien" Fehlermeldung, dass ERDDAP™ gefunden 0 passende Dateien im Verzeichnis (wenn Sie denken, dass es passende Dateien in diesem Verzeichnis) :
    * Überprüfen Sie, ob die Dateien wirklich in diesem Verzeichnis sind.
    * Überprüfen Sie die Rechtschreibung des Verzeichnisnamens.
    * Überprüfen Sie die DateiNameRegex. Es ist wirklich, wirklich einfach, Fehler mit Regexes zu machen. Für Testzwecke, versuchen Sie die regex .\\*, die alle Dateinamen entsprechen sollte. (Siehe [regex dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) und [Nach oben](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) 
    * Überprüfen Sie, ob der Benutzer, der das Programm läuft (z.B., user=tomcat (?) für Tomcat/ ERDDAP ) hat 'lesen' Erlaubnis für diese Dateien.
    * In einigen Betriebssystemen (zum Beispiel SELinux) und je nach Systemeinstellungen, muss der Benutzer, der das Programm ausgeführt hat, 'lesen' Berechtigung für die gesamte Kette von Verzeichnissen, die zu dem Verzeichnis führen, das die Dateien hat.
         
####  EDDGrid VonFiles Skelett XML{#eddgridfromfiles-skeleton-xml} 
*    **Das skeleton XML** für alle EDDGrid VonFiles Unterklassen ist:

>&nbsp;&nbsp;&lt;dataset type="EDDGridFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromFiles subclasses, this uses Java's WatchDirectory system   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file names, for example, ".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadata from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDD*FromAudioFiles{#eddfromaudiofiles} 
 ** EDDGrid VonAudioFiles** und **EDDTableFromAudioFiles** aggregierte Daten aus einer Sammlung lokaler Audiodateien. (Diese ersten erschienen in ERDDAP™ v1.82.) Der Unterschied ist: EDDGrid FromAudioFiles behandelt die Daten als mehrdimensionaler Datensatz (in der Regel mit 2 Abmessungen: \\[ Dateistart Zeit \\] und \\[ abgelaufen Zeit innerhalb einer Datei \\] ) , während EDDTableFromAudioFiles die Daten als tabellarische Daten behandelt (in der Regel mit Spalten für die Datei startTime, die elapsedTime mit der Datei, und die Daten aus den Audiokanälen) . EDDGrid FromAudioFiles erfordert, dass alle Dateien die gleiche Anzahl von Proben haben, also wenn das nicht wahr ist, müssen Sie EDDTableFromAudioFiles verwenden. Ansonsten ist die Wahl, welche EDD-Typ zu verwenden ist ganz Ihre Wahl. Ein Vorteil von EDDTableFromAudioFiles: Sie können andere Variablen mit anderen Informationen hinzufügen, z. stationID StationType. In beiden Fällen erschwert das Fehlen einer einheitlichen Zeitvariable die Arbeit mit den Daten dieser EDD-Typen, aber es gab keine gute Möglichkeit, eine einheitliche Zeitvariable einzurichten.

Sehen Sie die Superklassen dieser Klasse, [ EDDGrid VonFiles](#eddgridfromfiles) und [EDDTableFromFiles](#eddtablefromfiles) , für allgemeine Informationen, wie diese Klasse funktioniert und wie sie verwendet werden.

Wir empfehlen dringend die Verwendung der [Datensätze generieren Xml Programm](#generatedatasetsxml) einen groben Entwurf der datasets.xml für diesen Datensatz. Da Audiodateien keine anderen Metadaten als Informationen zur Kodierung der Tondaten haben, müssen Sie die Ausgabe von GenerateDatasets bearbeiten. Xml zur Bereitstellung wesentlicher Informationen (z.B. Titel, Zusammenfassung, creator\\_name , Institution, Geschichte) .

Details:

* Es gibt eine Vielzahl von Audio-Dateiformaten. Derzeit, ERDDAP™ kann Daten aus den meisten .wav und .au Dateien lesen. Es kann derzeit keine anderen Arten von Audiodateien lesen, z.B. .aiff oder .mp3. Wenn Sie Unterstützung für andere Audiodateiformate oder andere Varianten von .wav und .au benötigen, senden Sie bitte Ihre Anfrage an Chris. John bei noaa.gov. Oder als Workaround können Sie Ihre Audiodateien in PCM\\_ konvertieren SIGNIEREN (für ganze Zahlen) oder PCM\\_FLOAT (für schwimmende Punktdaten) .wav Dateien so, dass ERDDAP™ kann mit ihnen arbeiten.
* Derzeit, ERDDAP™ kann Audiodateien lesen mit was Java Die AudioFormat-Klasse ruft PCM\\_FLOAT, PCM\\_SIGNED, PCM\\_UNSIGNED, ALAW und ULAW-Kodierungen an. ERDDAP™ wandelt PCM\\_UNSIGNED-Werte um (z.B. 0 bis 255) in signierten Werten (z.B. -128 bis 128) durch Neuanordnung der Bits in den Datenwerten. ERDDAP™ ALAW und ULAW kodiert aus ihrem nativen kodierten Byte-Format in Kürze (In den Warenkorb) Werte. Seit Java will bigEndian=true data, ERDDAP™ die Bytes der mit bigEndian=false gespeicherten Daten umwandeln (kleine ende) um die Werte korrekt zu lesen. Für alle anderen Kodierungen (PCM) , ERDDAP™ liest die Daten wie es ist.
* Wann ERDDAP™ liest Daten aus Audiodateien, es wandelt die verfügbaren Audio-Metadaten der Datei in globale Attribute um. Dies wird immer (mit angezeigten Probenwerten) 
    
String audioBigEndian "false"; //wahr oder falsch
In den Warenkorb Kanäle 1
String Audiocodierung "PCM\\_SIGNED";
Float AudioFrameRate 96000.0; //per Sekunde
int audioFrameSize 2; //# von Datenbytes pro Frame
Schwimmer AudioSampleRate 96000.0; //per Sekunde
int audioSampleSizeInBits 16; //# von Bits pro Kanal pro Probe
    
Für ERDDAP 's Zwecke, ein Rahmen ist synonym für eine Probe, die die Daten für einen Zeitpunkt.
Die Attribute in ERDDAP™ die Informationen, die die Daten beschreiben, wie es in den Quelldateien war. ERDDAP™ hat dies beim Lesen der Daten oft geändert, z.B. werden PCM\\_UNSIGNED, ALAW und ULAW kodierte Daten in PCM\\_SIGNED umgewandelt und BigEndian=false Daten in BigEndian=true-Daten umgewandelt. (wie Java will es lesen) . Am Ende werden Datenwerte in ERDDAP™ wird immer [PCM-codiert](https://en.wikipedia.org/wiki/Pulse-code_modulation) Datenwerte (d.h. einfache digitalisierte Proben der Schallwelle) .
* Wann ERDDAP™ liest Daten aus Audiodateien, es liest die gesamte Datei. ERDDAP™ kann so viele wie etwa 2 Milliarden Proben pro Kanal lesen. Wenn die Probenrate beispielsweise 44.100 Proben pro Sekunde beträgt, überträgt 2 Milliarden Proben etwa 756 Minuten Schalldaten pro Datei. Wenn Sie Audiodateien mit mehr als dieser Datenmenge haben, müssen Sie die Dateien in kleinere Stücke zerlegen, so dass ERDDAP™ kann sie lesen.
* Weil ERDDAP™ liest ganze Audiodateien, ERDDAP™ muss Zugriff auf eine große Menge Speicher haben, um mit großen Audiodateien zu arbeiten. Vgl. [ ERDDAP Speichereinstellungen](/docs/server-admin/deploy-install#memory) . Auch wenn dies ein Problem ist, ist ein Workaround, den Sie jetzt verwenden können, um die Dateien in kleinere Stücke zu zerlegen, so dass ERDDAP™ kann sie mit weniger Gedächtnis lesen.
* Einige Audiodateien wurden falsch geschrieben. ERDDAP™ macht einen kleinen Aufwand, sich mit solchen Fällen zu beschäftigen. Aber im Allgemeinen, wenn es einen Fehler gibt, ERDDAP™ wird eine Ausnahme werfen (und lehnen diese Datei ab) oder (wenn der Fehler nicht erkennbar ist) die Daten lesen (aber die Daten werden falsch sein) .
*    ERDDAP™ die Lautstärke nicht überprüft oder verändert. Idealerweise werden ganzzahlige Audiodaten für den gesamten Bereich des Datentyps skaliert.
* Audiodateien und Audioplayer haben kein System für fehlende Werte (z.B. -999 oder Float.NaN) . Audiodaten sollten also keine fehlenden Werte haben. Wenn fehlende Werte vorhanden sind (z.B., wenn Sie eine Audiodatei verlängern müssen) , verwenden Sie eine Reihe von 0's, die als perfekte Stille interpretiert werden.
* Wann ERDDAP™ liest Daten aus Audiodateien, es erstellt immer eine Spalte namens elapsed Zeit mit der Zeit für jede Probe, in Sekunden (als Doppel gespeichert) , relativ zur ersten Probe (die abgelaufen ist Zeit = 0,0 s) . mit EDDGrid FromAudioFiles, dies wird die elapsedTime-Achsenvariable.
*    EDDGrid FromAudioFiles erfordert, dass alle Dateien die gleiche Anzahl von Proben haben. Wenn das nicht wahr ist, müssen Sie EDDTableFromAudioFiles verwenden.
* Für EDDGrid FromAudioFiles, wir empfehlen, dass Sie [&lt;DimensionValuesInMemory&gt;] (#dimensionvaluesinmemory) zu falsch (wie empfohlen von GenerateDatasets Xml) , weil die Zeitdimension oft eine große Anzahl von Werten hat.
* Für EDDGrid VonAudioFiles sollten Sie fast immer die EDDGrid FromFiles System für [Aggregat über Dateinamen](#aggregation-via-file-names-or-global-metadata) , fast immer durch Extraktion des Anfangsdatums der Aufnahme Zeit aus den Dateinamen. Zum Beispiel
```
    <sourceName>\\*\\*\\*fileName,"timeFormat=yyyyMMdd'\\_'HHmmss",aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Datensätze generieren Xml wird dies fördern und Ihnen dabei helfen.
* Für EDDTableFromAudioFiles sollten Sie fast immer das EDDTableFromFiles-System für [\\*\\*\\*fileName pseudo sourceName S](#filename-sourcenames) Informationen aus dem Dateinamen zu extrahieren (fast immer das Startdatum Zeit für die Aufnahme) und fördern es, eine Datenspalte zu sein. Zum Beispiel
```
    <sourceName>\\*\\*\\*fileName,aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Das Zeitformat sollte dann als Attribute der Einheiten angegeben werden:&lt;att name="units"&gt;yyMMdd'\\_'HHmmss&lt;/att&gt;
     
###  EDDGrid VonMergeIRFiles{#eddgridfrommergeirfiles} 
 [ ** EDDGrid VonMergeIRFiles** ](#eddgridfrommergeirfiles) aggregierte Daten von lokalen, [MergeIR](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README) Dateien, die von der [Tropische Regenmessmission (TRMM) ](https://trmm.gsfc.nasa.gov) , die eine gemeinsame Mission zwischen der NASA und der Japan Aerospace Exploration Agency ist (JAXA) . Verschmelzung IR-Dateien können von [NASA](ftp://disc2.nascom.nasa.gov/data/s4pa/TRMM_ANCILLARY/MERG/) .

 EDDGrid VonMergeIRFiles.java wurde geschrieben und zum ERDDAP™ Projekt von Jonathan Lafite und Philippe Makowski von R.Tech Engineering (Lizenz: urheberrechtlich geschützte Open Source) .

 EDDGrid FromMergeIRFiles ist ein wenig ungewöhnlich:

*    EDDGrid FromMergeIRFiles unterstützt komprimierte oder unkomprimierte Quelldatendateien in jeder Kombination in demselben Datensatz. So können Sie zum Beispiel ältere Dateien komprimieren, die selten aufgerufen werden, aber neue Dateien, die oft aufgerufen werden, nicht komprimieren. Oder Sie können die Art der Kompression aus dem Original ändern. Z beispielsweise .gz .
* Wenn Sie komprimierte und unkomprimierte Versionen der gleichen Datendateien im gleichen Verzeichnis haben, stellen Sie bitte sicher, dass&lt;fileNameRegex&gt; für Ihren Datensatz stimmt mit den Dateinamen überein, die Sie übereinstimmen möchten und nicht mit den Dateinamen überein, die Sie nicht übereinstimmen möchten.
* Unkomprimierte Quelldatendateien dürfen keine Dateierweiterung haben (d.h. kein "." im Dateinamen) .
* Komprimierte Quelldatendateien müssen eine Dateierweiterung haben, aber ERDDAP™ bestimmt die Art der Komprimierung, indem Sie den Inhalt der Datei inspizieren, nicht indem Sie die Dateierweiterung der Datei ansehen (zum Beispiel ".Z") . Die unterstützten Kompressionstypen umfassen "gz", "bzip2", "xz", "lzma", "snappy-raw", "snappy-framed", "pack200" und "z". Wann ERDDAP™ liest komprimierte Dateien, es dekomprimiert on-the-fly, ohne in eine temporäre Datei zu schreiben.
* Alle Quelldatendateien müssen das ursprüngliche Dateinamenssystem verwenden: d.h. merg\\_ *YYYMMDDH* \\_4km-pixel (wenn *YYYMMDDH* die der Daten in der Datei zugeordnete Zeit angibt) , plus eine Dateierweiterung, wenn die Datei komprimiert wird.

Sehen Sie die Superklasse dieser Klasse, [ EDDGrid VonFiles](#eddgridfromfiles) , für allgemeine Informationen, wie diese Klasse funktioniert und wie sie verwendet werden.

Wir empfehlen dringend die Verwendung der [Datensätze generieren Xml Programm](#generatedatasetsxml) einen groben Entwurf der datasets.xml für diesen Datensatz. Das können Sie dann bearbeiten, um es zu verfeinern.
 
###  EDDGrid Von NcFiles{#eddgridfromncfiles} 
 [ ** EDDGrid Von NcFiles** ](#eddgridfromncfiles) aggregierte Daten von lokalen, netzgebundenen, [GRIB .grb und .grb2](https://en.wikipedia.org/wiki/GRIB) Dateien, [ HDF   (v4 oder v5)   .hdf ](https://www.hdfgroup.org/) Dateien, [ .nc ml](#ncml-files) Dateien, [ NetCDF   (v3 oder v4)   .nc ](https://www.unidata.ucar.edu/software/netcdf/) Dateien und [Zar](https://github.com/zarr-developers/zarr-python) Dateien (ab Version 2.25) . Zarr-Dateien haben etwas anderes Verhalten und erfordern entweder die DateiNameRegex oder den PfadRegex, um "zarr" einzuschließen.

Dies kann mit anderen Dateitypen funktionieren (zum Beispiel BUFR) , wir haben es einfach nicht getestet -- bitte senden Sie uns einige Musterdateien.

* Für GRIB-Dateien, ERDDAP™ wird eine .gbx-Index-Datei zum ersten Mal, wenn sie jede GRIB-Datei liest. So müssen die GRIB-Dateien in einem Verzeichnis sein, in dem der "Benutzer", der Tomcat lief, die Lese- und Schreibgenehmigung hat.
* Sehen Sie die Superklasse dieser Klasse, [ EDDGrid VonFiles](#eddgridfromfiles) , für Informationen, wie diese Klasse funktioniert und wie sie verwendet werden.
* Beginnen mit ERDDAP™ V2.12, EDDGrid VonNcFiles und EDDGrid Von NcFiles Entpackt können Daten von "Strukturen" in .nc 4 und .hdf 4 Dateien. Um eine Variable zu identifizieren, die von einer Struktur stammt,&lt; sourceName &gt; muss das Format verwenden: *Vollständiger StructureName*  |  *MitgliedName* , zum Beispiel group1/myStruct | myMember .
* Wir empfehlen dringend die Verwendung der [Datensätze generieren Xml Programm](#generatedatasetsxml) einen groben Entwurf der datasets.xml für diesen Datensatz. Das können Sie dann bearbeiten, um es zu verfeinern.
    
#### Gruppen in Gridded Nc Dateien{#groups-in-gridded-nc-files} 
     [Netcdf4 Dateien können Gruppen enthalten.](#groups-in-gridded-nc-files)   ERDDAP™ macht nur einen Datensatz aus den Variablen in einer Gruppe und all ihren Elterngruppen. Sie können einen bestimmten Gruppennamen in GenerateDatasets angeben Xml (den nachlaufenden Wimpern) , oder verwenden Sie ", um GenerateDatasets zu haben Xml sucht alle Gruppen für die Variablen, die die meisten Dimensionen verwenden, oder " \\[ Wurzeln \\] " GenerateDatasets nur nach Variablen in der Wurzelgruppe suchen.
    
Das erste, was GenerateDatasetsXml für diese Art von Datensätzen tut, nachdem Sie die Fragen beantworten, ist Drucken der ncdump-ähnlichen Struktur der Sample-Datei. Also, wenn Sie ein paar goofy Antworten für die erste Schleife durch GenerateDatasets eingeben Xml, zumindest können Sie sehen, ob ERDDAP™ kann die Datei lesen und sehen, welche Dimensionen und Variablen in der Datei sind. Dann können Sie bessere Antworten für die zweite Schleife durch GenerateDatasetsXml geben.
    

###  EDDGrid VonNcFilesUnpacked{#eddgridfromncfilesunpacked} 
 [ ** EDDGrid VonNcFilesUnpacked** ](#eddgridfromncfilesunpacked) eine Variante von [ EDDGrid Von NcFiles](#eddgridfromncfiles) die Daten von lokalen, netzgebundenen NetCDF   (v3 oder v4)   .nc und verwandte Dateien. Der Unterschied ist, dass diese Klasse jede Datendatei entpackt, bevor EDDGrid FromFiles betrachtet die Dateien:

* Es entpackt Variablen, die mit [ scale\\_factor und/oder add\\_offset ](#scale_factor) .
* Es konvertiert \\_FillValue und missing\\_value Werte für NaN's (oder MAX\\_VALUE für ganze Datentypen) .
* Es wandelt Zeit- und Zeitstempelwerte in "seconds since 1970-01-01T00:00:00Z" .

Der große Vorteil dieser Klasse ist, dass es eine Möglichkeit bietet, mit verschiedenen Werten von scale\\_factor , add\\_offset , \\_FillValue, missing\\_value , oder Zeiteinheiten in verschiedenen Quelldateien in einer Sammlung. Ansonsten müsst ihr ein Werkzeug wie [NcML](#ncml-files) oder [ NCO ](#netcdf-operators-nco) um jede Datei zu ändern, um die Unterschiede zu entfernen, so dass die Dateien von EDDGrid Von NcFiles. Damit diese Klasse richtig funktioniert, müssen die Dateien den CF-Standards für die zugehörigen Attribute folgen.

* Wenn versuchen, einen zu machen EDDGrid Von NcFiles Entpackt aus einer Gruppe von Dateien, mit denen Sie vorher versucht und nicht verwendet EDDGrid VonNcFiles, cd bis
     *BigParentDirectory* /Datensatz/ *Letzte2Briefe* / * datasetID * /
wenn *Letzte2Briefe* die letzten 2 Buchstaben der datasetID ,
und alle Dateien in diesem Verzeichnis löschen.
* Beginnen mit ERDDAP™ V2.12, EDDGrid VonNcFiles und EDDGrid Von NcFiles Entpackt können Daten von "Strukturen" in .nc 4 und .hdf 4 Dateien. Um eine Variable zu identifizieren, die von einer Struktur stammt,&lt; sourceName &gt; muss das Format verwenden: *Vollständiger StructureName*  |  *MitgliedName* , zum Beispiel group1/myStruct | myMember .
* Wir empfehlen dringend die Verwendung der [Datensätze generieren Xml Programm](#generatedatasetsxml) einen groben Entwurf der datasets.xml für diesen Datensatz. Das können Sie dann bearbeiten, um es zu verfeinern.
    
Netcdf4 Dateien können Gruppen enthalten. Vgl. [Diese Dokumentation](#groups-in-gridded-nc-files) .
    
Das erste, was GenerateDatasetsXml für diese Art von Datensätzen tut, nachdem Sie die Fragen beantwortet haben, ist Drucken der ncdump-ähnlichen Struktur der Sample-Datei **vor** Es ist ausgepackt. Also, wenn Sie ein paar goofy Antworten für die erste Schleife durch GenerateDatasets eingeben Xml, zumindest können Sie sehen, ob ERDDAP™ kann die Datei lesen und sehen, welche Dimensionen und Variablen in der Datei sind. Dann können Sie bessere Antworten für die zweite Schleife durch GenerateDatasetsXml geben.
    
###  EDDGrid LonPM180{#eddgridlonpm180} 
 [ ** EDDGrid LonPM180** ](#eddgridlonpm180) die Längenwerte eines Kindes modifiziert (eingeschlossen)   EDDGrid Datensatz, der Längenwerte größer als 180 aufweist (beispielsweise 0 bis 360) so dass sie im Bereich -180 bis 180 liegen (Longitude Plus oder Minus 180, daher der Name) .

* Dies bietet eine Möglichkeit, Datensätze zu erstellen, die Längenwerte über 180 konform in/mit haben OGC Dienstleistungen (zum Beispiel die WMS Server in ERDDAP ) , seit allem OGC Dienstleistungen benötigen Längenwerte innerhalb von -180 bis 180.
* Die Arbeit in der Nähe einer Diskontinuität verursacht Probleme, unabhängig davon, ob die Diskontinuität in der Länge 0 oder in der Länge 180 liegt. Dieser Datensatztyp lässt Sie diese Probleme für jeden vermeiden, indem Sie zwei Versionen desselben Datensatzes anbieten:
mit Längenwerten im Bereich 0 bis 360 ("Pacificentric"?) ,
mit Längenwerten im Bereich -180 bis 180 ("Atlanticentric"?) .
* Für Kinderdatensätze mit allen Längenwerten größer als 180 sind alle neuen Längenwerte einfach um 360 Grad niedriger. Beispielsweise würde ein Datensatz mit Längenwerten von 180 bis 240 zu einem Datensatz mit Längenwerten von -180 bis -120 werden.
* Für Kinderdatensätze, die Längenwerte für den gesamten Globus haben (etwa 0 bis 360) , der neue Längenwert wird umgerechnet (grob) - 180 bis 180:
Die ursprünglichen 0 bis fast 180 Werte sind unverändert.
Die ursprünglichen 180 bis 360 Werte werden in -180 bis 0 umgerechnet und zum Beginn des Longitude-Arrays verschoben.
* Für Kinderdatensätze, die sich um 180, aber nicht um die Welt kümmern, ERDDAP™ fügt fehlende Werte nach Bedarf ein, um einen Datensatz zu erstellen, der den Globus abdeckt. Beispielsweise würde ein Kinderdatensatz mit Längenwerten von 140 bis 200 zu einem Datensatz mit Längenwerten von -180 bis 180 werden.
Die Kinderwerte von 180 bis 200 werden -180 bis -160.
Neue Längenwerte würden von -160 bis 140 eingefügt. Die entsprechenden Datenwerte sind \\_FillValues.
Die Kinderwerte von 140 bis fast 180 wären unverändert.
Das Einfügen von fehlenden Werten mag seltsam erscheinen, aber es vermeidet mehrere Probleme, die sich daraus ergeben, dass Längenwerte plötzlich springen (z.B. von -160 bis 140) .
* In [GenerateDatasetsXml](#generatedatasetsxml) , gibt es einen speziellen "Datensatztyp", EDDGrid LonPM180FromErddapCatalog, mit dem Sie die datasets.xml für EDDGrid LonPM180 Datensätze aus jedem der EDDGrid Datensätze in einem ERDDAP die alle Längenwerte größer als 180 haben. Dies erleichtert das Angebot von zwei Versionen dieser Datensätze:
das Original, mit Längenwerten im Bereich 0 bis 360,
und den neuen Datensatz mit Längenwerten im Bereich -180 bis 180.
    
Der Kinderdatensatz innerhalb jedes EDDGrid LonPM180 Datensatz wird ein EDDGrid VonErddap-Datensatz, der auf den ursprünglichen Datensatz verweist.
Der neue Datensatz datasetID wird der Name des ursprünglichen Datensatzes plus "\\_LonPM180" sein.
Zum Beispiel
```
    <dataset type="EDDGridLonPM180" datasetID="erdMBsstdmday\\_LonPM180" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_LonPM180Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=120.0 maxLon=320.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Legen Sie die EDDGrid LonPM180 Datensatz **unten** den ursprünglichen Datensatz in datasets.xml . Das vermeidet mögliche Probleme.
    
Alternativ können Sie die EDDGrid FromErddap Kinderdatensatz mit dem Originaldatensatz datasets.xml . Dann wird es nur eine Version des Datensatzes geben: die mit Längenwerten innerhalb von -180 bis 180. Wir entmutigen dies, weil es Zeiten gibt, in denen jede Version des Datensatzes bequemer ist.
    
* Wenn Sie zwei Versionen eines Datensatzes anbieten, zum Beispiel eine mit Länge 0 bis 360 und eine mit Länge -180 bis 180:
    * Sie können die optionale [&lt;zugänglich Via WMS &gt;false&lt;/erreichbar Via WMS &gt; (#accessibleviawms) mit dem 0-360 Datensatz, um die WMS Service für diesen Datensatz. Dann wird nur die LonPM180 Version des Datensatzes über WMS .
    * Es gibt ein paar Möglichkeiten, den LonPM180-Datensatz mit Änderungen am zugrunde liegenden Datensatz aktuell zu halten:
        * Wenn der Kinderdatensatz ein EDDGrid FromErddap-Datensatz, der einen Datensatz im gleichen ERDDAP™ , der LonPM180-Datensatz versucht, den zugrunde liegenden Datensatz direkt zu abonnieren, so dass er immer aktuell ist. Direkte Abonnements erzeugen keine E-Mails, die Sie bitten, das Abonnement zu validieren - Validierung sollte automatisch erfolgen.
        * Wenn der Kinderdatensatz nicht ein EDDGrid FromErddap-Datensatz, der auf der gleichen ERDDAP™ , der LonPM180-Datensatz wird versuchen, das reguläre Abonnement-System zu verwenden, um den zugrunde liegenden Datensatz zu abonnieren. Wenn Sie das Abonnementsystem in Ihrem ERDDAP™ Sie sollten E-Mails bekommen, die Sie bitten, das Abonnement zu validieren. Bitte.
        * Wenn Sie das Abonnementsystem in Ihrem ERDDAP™ Ausgeschaltet, der LonPM180-Datensatz kann manchmal veraltete Metadaten haben, bis der LonPM180-Datensatz neu geladen wird. Wenn das Abonnement-System ausgeschaltet ist, sollten Sie die [&lt;Nachladen AllNMinutes&gt;] (#reloadeverynminutes) Einstellung des LonPM180-Datensatzes auf eine kleinere Anzahl, so dass es wahrscheinlicher ist, Änderungen des Kinderdatensatzes früher zu erfassen.

* Für Datensätze mit maximaler Länge &gt; 360 verwenden Sie die folgende optionale Konfiguration, um den Maximalwert einzustellen und der Datensatz wird auf -180 bis 180 korrigiert.
```
    <maxSourceLon>540</maxSourceLon>
```

####  EDDGrid LonPM180 Skelett XML{#eddgridlonpm180-skeleton-xml} 

>&nbsp;&nbsp;&lt;dataset type="EDDGridLonPM180" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid Lon0360{#eddgridlon0360} 
 [ ** EDDGrid Lon0360** ](#eddgridlon0360) die Längenwerte eines Kindes modifiziert (eingeschlossen)   EDDGrid Datensatz, der einige Längenwerte unter 0 hat (z.B. -180 bis 180) so dass sie im Bereich von 0 bis 360 liegen (also der Name) .

* Die Arbeit in der Nähe einer Diskontinuität verursacht Probleme, unabhängig davon, ob die Diskontinuität in der Länge 0 oder in der Länge 180 liegt. Dieser Datensatztyp lässt Sie diese Probleme für jeden vermeiden, indem Sie zwei Versionen desselben Datensatzes anbieten:
mit Längenwerten im Bereich -180 bis 180 ("Atlanticentric"?) .
mit Längenwerten im Bereich 0 bis 360 ("Pacificentric"?) ,
* Für Kinderdatensätze mit allen Längenwerten unter 0 sind alle neuen Längenwerte einfach um 360 Grad höher. Beispielsweise würde ein Datensatz mit Längenwerten von -180 bis -120 zu einem Datensatz mit Längenwerten von 180 bis 240 werden.
* Für Kinderdatensätze, die Längenwerte für den gesamten Globus haben (etwa -180 bis 180) , der neue Längenwert wird umgerechnet (grob) 0 bis 360:
Die ursprünglichen -180 bis 0-Werte werden in 180 bis 360 umgerechnet und zum Ende des Längenfeldes verschoben.
Die ursprünglichen 0 bis fast 180 Werte sind unverändert.
* Für Kinder-Datensätze, die lon=0 überspannen, aber nicht den Globus abdecken, ERDDAP™ fügt fehlende Werte nach Bedarf ein, um einen Datensatz zu erstellen, der den Globus abdeckt. Beispielsweise würde ein Kinderdatensatz mit Längenwerten von -40 bis 20 zu einem Datensatz mit Längenwerten von 0 bis 360 werden.
Die Kinderwerte von 0 bis 20 wären unverändert.
Von 20 bis 320 würden neue Längenwerte eingefügt. Die entsprechenden Datenwerte sind \\_FillValues.
Die Kinderwerte von -40 bis 0 würden 320 bis 360 werden.
Das Einfügen von fehlenden Werten mag seltsam erscheinen, aber es vermeidet mehrere Probleme, die sich daraus ergeben, dass Längenwerte plötzlich springen (z.B. von 20 bis 320) .
* In [GenerateDatasetsXml](#generatedatasetsxml) , gibt es einen speziellen "Datensatztyp", EDDGrid Lon0360Von ErddapCatalog, mit dem Sie die datasets.xml für EDDGrid Lon0360 Datensätze von jedem der EDDGrid Datensätze in einem ERDDAP die alle Längenwerte größer als 180 haben. Dies erleichtert das Angebot von zwei Versionen dieser Datensätze:
das Original, mit Längenwerten im Bereich 0 bis 360,
und den neuen Datensatz mit Längenwerten im Bereich -180 bis 180.
    
Der Kinderdatensatz innerhalb jedes EDDGrid Lon0360 Datensatz wird ein EDDGrid VonErddap-Datensatz, der auf den ursprünglichen Datensatz verweist.
Der neue Datensatz datasetID wird der Name des ursprünglichen Datensatzes plus "\\_Lon0360" sein.
Zum Beispiel
```
    <dataset type="EDDGridLon0360" datasetID="erdMBsstdmday\\_Lon0360" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_Lon0360Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=-40.0 maxLon=20.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Legen Sie die EDDGrid Datensatz von Lon0360 **unten** den ursprünglichen Datensatz in datasets.xml . Das vermeidet mögliche Probleme.
    
Alternativ können Sie die EDDGrid FromErddap Kinderdatensatz mit dem Originaldatensatz datasets.xml . Dann wird es nur eine Version des Datensatzes geben: die mit Längenwerten innerhalb von 0 bis 360. Wir entmutigen dies, weil es Zeiten gibt, in denen jede Version des Datensatzes bequemer ist.
    
* Wenn Sie zwei Versionen eines Datensatzes anbieten, zum Beispiel eine mit Länge 0 bis 360 und eine mit Länge -180 bis 180:
    * Sie können die optionale [&lt;zugänglich Via WMS &gt;false&lt;/erreichbar Via WMS &gt; (#accessibleviawms) mit dem Datensatz von 0 bis 360, um die WMS Service für diesen Datensatz. Dann wird nur die -180 bis 180 Version des Datensatzes über WMS .
    * Es gibt ein paar Möglichkeiten, den Lon0360 Datensatz mit Änderungen am zugrunde liegenden Datensatz aktuell zu halten:
        * Wenn der Kinderdatensatz ein EDDGrid FromErddap-Datensatz, der einen Datensatz im gleichen ERDDAP™ , der Lon0360-Datensatz wird versuchen, den zugrunde liegenden Datensatz direkt zu abonnieren, so dass er immer aktuell ist. Direkte Abonnements erzeugen keine E-Mails, die Sie bitten, das Abonnement zu validieren - Validierung sollte automatisch erfolgen.
        * Wenn der Kinderdatensatz nicht ein EDDGrid FromErddap-Datensatz, der auf der gleichen ERDDAP™ , der Lon0360-Datensatz wird versuchen, das reguläre Abonnementsystem zu verwenden, um den zugrunde liegenden Datensatz zu abonnieren. Wenn Sie das Abonnementsystem in Ihrem ERDDAP™ Sie sollten E-Mails bekommen, die Sie bitten, das Abonnement zu validieren. Bitte.
        * Wenn Sie das Abonnementsystem in Ihrem ERDDAP™ Ausgeschaltet, der Lon0360 Datensatz kann manchmal veraltete Metadaten haben, bis der Lon0360 Datensatz neu geladen wird. Wenn das Abonnement-System ausgeschaltet ist, sollten Sie die [&lt;Nachladen AllNMinutes&gt;] (#reloadeverynminutes) Setzen des Lon0360 Datensatzes auf eine kleinere Anzahl, so dass es wahrscheinlicher ist, Änderungen des Kinderdatensatzes früher zu erfassen.
####  EDDGrid Lon0360 Skelett XML{#eddgridlon0360-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridLon0360" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid SideByside{#eddgridsidebyside} 
 [ ** EDDGrid SideByside** ](#eddgridsidebyside) Aggregate zwei oder mehr EDDGrid Datensätze (die Kinder) Seite an Seite.

* Der resultierende Datensatz hat alle Variablen aus allen Kinderdatensätzen.
* Der Elterndatensatz und alle Kinderdatensätze MUST haben verschiedene datasetID S. Wenn alle Namen in einer Familie genau die gleichen sind, wird der Datensatz nicht geladen (mit der Fehlermeldung, dass die Werte der aggregierten Achse nicht sortiert sind) .
* Alle Kinder haben die gleichen Quellwerte für axisVariable S \\[ 1+ \\]   (zum Beispiel Breite, Länge) . Die Genauigkeit der Prüfung wird durch [MatchAxisNDigits](#matchaxisndigits) .
* Die Kinder können unterschiedliche Quellwerte für axisVariable S \\[ 0) \\]   (zum Beispiel, Zeit) , aber sie sind in der Regel weitgehend gleich.
* Der Elterndatensatz scheint alle zu haben axisVariable S \\[ 0) \\] Quellenwerte aller Kinder.
* So können Sie beispielsweise einen Quelldatensatz mit einem Vektor u-Komponente und einem anderen Quelldatensatz mit einem Vektor v-Komponente kombinieren, so dass die kombinierten Daten bedient werden können.
* Kinder, die durch diese Methode geschaffen werden, werden privat gehalten. Sie sind nicht separat zugängliche Datensätze (beispielsweise durch Client-Datenanfragen oder durch [Flaggen-Dateien](/docs/server-admin/additional-information#flag) ) .
* Die globalen Metadaten und Einstellungen für den Elternteil stammen aus den globalen Metadaten und Einstellungen für das erste Kind.
* Wenn es eine Ausnahme beim Erstellen des ersten Kindes gibt, wird der Elternteil nicht erstellt.
* Wenn es eine Ausnahme beim Erstellen von anderen Kindern gibt, sendet dies eine E-Mail an emailEverythingTo (wie angegeben [Setup.xml](/docs/server-admin/deploy-install#setupxml) ) und geht mit den anderen Kindern weiter.
####  EDDGrid SideBySide Skelett XML{#eddgridsidebyside-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridSideBySide" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 2 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid GesamtexistierteDimension{#eddgridaggregateexistingdimension} 
 [ ** EDDGrid GesamtexistierteDimension** ](#eddgridaggregateexistingdimension) Aggregate zwei oder mehr EDDGrid Datensätze, die jeweils einen unterschiedlichen Wertebereich für die erste Dimension aufweisen, jedoch gleiche Werte für die anderen Dimensionen.

* Beispielsweise kann ein Kind-Datensatz 366 Werte haben (für 2004) für die Zeitdimension und ein anderes Kind könnte 365 Werte haben (für 2005) für die Zeitdimension.
* Alle Werte für alle anderen Abmessungen (zum Beispiel Breite, Länge) Seien Sie einfach für alle Kinder identisch. Die Genauigkeit der Prüfung wird durch [MatchAxisNDigits](#matchaxisndigits) .
* Sortierte Maßwerte - Die Werte für jede Dimension MUST sind in sortierter Reihenfolge (aufsteigen oder absteigen) . Die Werte können unregelmäßig beabstandet sein. Es kann keine Krawatten geben. Dies ist eine Forderung der [CF metadata standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) . Wenn die Werte der Dimension nicht in sortierter Reihenfolge sind, wird der Datensatz nicht geladen und ERDDAP™ den ersten ungebrochenen Wert in der Protokolldatei identifizieren, *BigParentDirectory* /logs/log.txt .
    
Unsortierte Dimensionswerte geben fast immer ein Problem mit dem Quelldatensatz an. Dies geschieht am häufigsten, wenn in der Aggregation eine fehlerhafte oder unangemessene Datei enthalten ist, die zu einer ungestörten Zeitdimension führt. Um dieses Problem zu lösen, siehe die Fehlermeldung in der ERDDAP™ log.txt Datei, um den absteigenden Zeitwert zu finden. Dann schauen Sie in die Quelldateien, um die entsprechende Datei zu finden (oder vor oder nach) Das gehört nicht zur Aggregation.
    
* Der Elterndatensatz und der Kinderdatensatz MUST haben unterschiedliche datasetID S. Wenn alle Namen in einer Familie genau die gleichen sind, wird der Datensatz nicht geladen (mit der Fehlermeldung, dass die Werte der aggregierten Achse nicht sortiert sind) .
* Derzeit ist der Kinderdatensatz MUST ein EDDGrid FromDap-Datensatz und MUST haben die niedrigsten Werte der aggregierten Dimension (meist die ältesten Zeitwerte) . Alle anderen Kinder müssen fast identische Datensätze sein (nur in den Werten für die erste Dimension) und werden von nur ihren sourceUrl .
* Der aggregierte Datensatz erhält seine Metadaten vom ersten Kind.
* Die [Datensätze generieren Xml Programm](#generatedatasetsxml) einen groben Entwurf des datasets.xml für eine EDDGrid AggregateExistingDimension basiert auf einer Reihe von Dateien, die von einem Hyrax oder THREDDS-Server. Verwenden Sie beispielsweise diesen Eingang für das Programm (das "/1988" in der URL macht das Beispiel schneller) :
    ```
      EDDType? EDDGridAggregateExistingDimension  
      Server type (hyrax, thredds, or dodsindex)? hyrax  
      Parent URL (for example, for hyrax, ending in "contents.html";  
        for thredds, ending in "catalog.xml")  
      ? https://opendap.jpl.nasa.gov/opendap/ocean\\_wind/ccmp/L3.5a/data/  
        flk/1988/contents.html  
      File name regex (for example, ".\\*\\.nc")? month.\\*flk\\.nc\\.gz  
      ReloadEveryNMinutes (for example, 10080)? 10080  
    ```
Sie können das Ergebnis verwenden&lt; sourceUrl &gt; tags oder löschen sie und uncomment the&lt; sourceUrl &gt; tag (so dass neue Dateien jedes Mal bemerkt werden, wenn der Datensatz neu geladen wird.
####  EDDGrid GesamtexistierteDimension Skelett XML{#eddgridaggregateexistingdimension-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridAggregateExistingDimension" [datasetID](#datasetid)\\="..."  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- This is a regular [EDDGridFromDap](#eddgridfromdap) dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description child with the lowest values for the aggregated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl> &lt;!-- 0 or many; the sourceUrls for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;other children.  These children must be listed in order of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrls serverType="..." regex="..." recursive="true"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[pathRegex](#pathregex)\\=".\\*"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>https://*someServer/someDirectory/someSubdirectory*/catalog.xml&lt;/sourceUrls>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1. This specifies how to find the other children,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instead of using separate sourceUrl tags for each child.  The  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advantage of this is: new children will be detected each time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the dataset is reloaded. The serverType must be "thredds",  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hyrax", or "dodsindex". 
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) (regex)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) is .\\*\\.nc  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recursive can be "true" or "false".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Only directory names which match the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(default=".\\*") will be accepted.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A thredds catalogUrl MUST include "/thredds/catalog/".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a thredds catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chla/catalog.xml](https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a hyrax catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flk/1988/contents.html](https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/1988/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a dodsindex URL is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Note the "OPeNDAP logo at the top of the page.)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When these children are sorted by filename, they must be in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order of ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

###  EDDGrid Kopie{#eddgridcopy} 
 [ ** EDDGrid Kopie** ](#eddgridcopy) macht und pflegt eine lokale Kopie eines anderen EDDGrid 's Daten und dient Daten aus der lokalen Kopie.

*    EDDGrid Kopie (und für tabellarische Daten, [EDDTableCopy](#eddtablecopy) ) ist sehr einfach zu bedienen und sehr effektiv
     **Lösung für einige der größten Probleme mit der Verwendung von Daten aus einer entfernten Datenquelle:** 
    * Der Zugriff auf Daten von einer entfernten Datenquelle kann langsam sein.
        * Es kann langsam sein, weil es inhärent langsam ist (beispielsweise eine ineffiziente Art von Servern) ,
        * weil es von zu vielen Anträgen überwältigt wird,
        * oder weil Ihr Server oder der Remoteserver Bandbreite begrenzt ist.
    * Der Remote-Datensatz ist manchmal nicht verfügbar (wieder, aus verschiedenen Gründen) .
    * Die Wiederherstellung auf einer Quelle für die Daten skaliert nicht gut (zum Beispiel, wenn viele Benutzer und viele ERDDAP s nutzen es) .
         
* Wie es funktioniert -- EDDGrid Kopieren löst diese Probleme durch automatisches Erstellen und Aufrechterhalten einer lokalen Kopie der Daten und das Servieren von Daten aus der lokalen Kopie. ERDDAP™ kann sehr schnell Daten aus der lokalen Kopie bedienen. Und eine lokale Kopie entlastet die Last auf dem Remoteserver. Und die lokale Kopie ist eine Sicherung des Originals, was nützlich ist, falls etwas mit dem Original passiert.
    
Es gibt nichts Neues über eine lokale Kopie eines Datensatzes. Was hier neu ist, ist, dass diese Klasse es macht\\*leicht\\*zu erstellen und\\*Pflege\\*eine lokale Kopie von Daten aus einer\\*Sorte\\*von Arten von Remote-Datenquellen und\\*Metadaten hinzufügen\\*beim Kopieren der Daten.
    
* Datenbestände -- EDDGrid Kopieren macht die lokale Kopie der Daten, indem Sie Daten von der Fernbedienung anfordern&lt;Datensatz&gt;. Es wird ein Stück für jeden Wert des linken (erste) Achse variabel. EDDGrid Kopieren verlässt sich nicht auf die Indexnummern des Remote-Datensatzes für die Achse - die können sich ändern.
    
WARNING: Wenn die Größe eines Datens so groß ist (&gt; 2GB) dass es Probleme verursacht, EDDGrid Kopie kann nicht verwendet werden. (Wir hoffen, dass wir in Zukunft eine Lösung für dieses Problem haben.) 
    
*    \\[ Eine Alternative zu EDDGrid Kopieren -
Wenn die Remote-Daten über herunterladbare Dateien verfügbar sind, nicht über einen Webservice, verwenden Sie [Cache AusUrl Option für EDDGrid VonFiles](#cachefromurl) , die eine lokale Kopie der Remote-Dateien macht und die Daten aus den lokalen Dateien bedient. \\] 
* Lokale Dateien Jeder Datenbruch wird in einem separaten NetCDF Datei in einem Unterverzeichnis *BigParentDirectory* / Kopieren/ * datasetID * / (wie angegeben [Setup.xml](/docs/server-admin/deploy-install#setupxml) ) . Dateinamen, die von Achsenwerten erstellt werden, werden geändert, um sie Datei-Name-sicher zu machen (z.B. werden Bindestriche durch "x2D" ersetzt) -- das beeinflusst die tatsächlichen Daten nicht.
     
* Neue Daten -- Jedes Mal EDDGrid Kopie wird neu geladen, es prüft die Fernbedienung&lt;dataset&gt;, um zu sehen, welche Stücke zur Verfügung stehen. Wenn die Datei für einen Datenklumpen nicht bereits vorhanden ist, wird eine Anfrage, den Bruch zu bekommen, zu einer Warteschlange hinzugefügt. ERDDAP 's taskThread verarbeitet alle gelöschten Anfragen nach Datenschlangen, einzeln. Sie können Statistiken für die Aufgabe sehenDeine Tätigkeit auf der [Statusseite](/docs/server-admin/additional-information#status-page) und [Tagesbericht](/docs/server-admin/additional-information#daily-report) . (Ja. ERDDAP™ könnte diesem Prozess mehrere Aufgaben zuordnen, aber das würde viele der Bandbreite, Speicher und CPU-Zeit der Remote-Datenquelle nutzen, und viele der lokalen ERDDAP Bandbreite, Speicher und CPU-Zeit, von denen keine gute Idee ist.) 
    
HINWEIS: Das erste Mal ein EDDGrid Kopie wird geladen, (wenn alles gut geht) Es werden viele Anfragen an Datenknöpfe der TaskThread's Queue hinzugefügt, aber keine lokalen Datendateien werden erstellt. So wird der Konstrukteur scheitern, aber TaskThread wird weiterhin arbeiten und lokale Dateien erstellen. Wenn alles gut geht, wird die TaskThread einige lokale Datendateien machen und der nächste Versuch, den Datensatz neu zu laden (in ~15 Minuten) wird erfolgreich, aber zunächst mit einer sehr begrenzten Datenmenge.
    
HINWEIS: Nachdem der lokale Datensatz einige Daten und erscheint in Ihrem ERDDAP , wenn der Remote-Datensatz vorübergehend oder dauerhaft nicht zugänglich ist, wird der lokale Datensatz noch funktionieren.
    
WARNING: Wenn der Remote-Datensatz groß ist und/oder der Remote-Server langsam ist (Das ist das Problem, oder?&#33;) , es dauert eine lange Zeit, um eine vollständige lokale Kopie zu machen. In einigen Fällen wird die erforderliche Zeit inakzeptabel sein. Beispielsweise sendet 1 TB von Daten über eine T1-Leitung (0,15 GB/s) mindestens 60 Tage unter optimalen Bedingungen. Darüber hinaus verwendet es viele Bandbreite, Speicher und CPU-Zeit auf den Remote- und lokalen Computern. Die Lösung besteht darin, eine Festplatte an den Administrator des Remote-Datensatzes zu senden, damit s/he eine Kopie des Datensatzes erstellen und die Festplatte wieder an Sie senden kann. Verwenden Sie diese Daten als Ausgangspunkt und EDDGrid Kopieren wird dazu Daten hinzufügen. (Das ist eine Art [Amazons EC2 Cloud Service](https://aws.amazon.com/importexport/) behandelt das Problem, auch wenn ihr System viel Bandbreite hat.) 
    
WARNING: Wenn ein bestimmter Wert für das linkeste (erste) Achsgröße verschwindet vom entfernten Datensatz, EDDGrid Kopieren löscht NICHT die lokale kopierte Datei. Wenn Sie wollen, können Sie es selbst löschen.
    
#### Grid Copy checkSource Daten{#grid-copy-checksourcedata} 
Die datasets.xml für diesen Datensatz kann ein optionales Tag
```
    <checkSourceData>true</checkSourceData>  
```
Der Standardwert ist wahr. Wenn/wenn Sie es auf false setzen, wird der Datensatz niemals den Quelldatensatz überprüfen, um zu sehen, ob zusätzliche Daten verfügbar sind.

#### Nur für{#onlysince} 
Sie können es sagen EDDGrid Kopieren, um eine Kopie einer Untermenge des Quelldatensatzes anstelle des gesamten Quelldatensatzes zu erstellen, indem ein Tag in der Form hinzugefügt wird&lt;nurSince&gt; *einige Wert* &lt;/onlySince&gt; auf den Datensatz datasets.xml Blödsinn. EDDGrid Kopieren wird nur Datenwerte herunterladen, die mit den Werten der ersten Dimension zusammenhängen (in der Regel die Zeitdimension) die größer sind als *einige Wert* . *einige Wert* kann sein:
    * Eine über now-  *nUnits* .
Zum Beispiel&lt;nurSince&gt; now- 2 Jahre&lt;/onlySince&gt; sagt dem Datensatz, nur lokale Kopien der Daten für Daten zu machen, wo die Werte der äußeren Dimension (meist Zeitwerte) sind innerhalb der letzten 2 Jahre (die jedes Mal neu bewertet wird, wenn der Datensatz neu geladen wird, was ist, wenn es nach neuen Daten sucht, um zu kopieren) . Siehe [ now-  *nUnits* Syntax Beschreibung](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) . Dies ist nützlich, wenn die erste Dimension Zeitdaten hat, was sie gewöhnlich tut.
        
         EDDGrid Kopieren gelöscht keine lokalen Datendateien, die Daten haben, die im Laufe der Zeit älter werden als now-  *nUnits* . Sie können diese Dateien jederzeit löschen, wenn Sie wählen. Wenn Sie das tun, empfehlen wir Ihnen, eine [Flagge](/docs/server-admin/additional-information#flag) nach dem Löschen der Dateien EDDGrid Kopieren, um die Liste der Cache-Dateien zu aktualisieren.
        
    * Ein fester Zeitpunkt, der als ISO 8601-String angegeben ist yyyy-MM-ddTHH:mm:ssZ .
Zum Beispiel&lt;NurSeit 2000&gt;-01T00:00 UhrZ&lt;/onlySince&gt; sagt den Datensatz nur, um lokale Kopien von Daten zu machen, wo der Wert der ersten Dimension \\&gt;=2000-01T00:00Z . Dies ist nützlich, wenn die erste Dimension Zeitdaten hat, was sie gewöhnlich tut.
         
    * Eine schwimmende Punktzahl.
Zum Beispiel&lt;nurSince&gt;946684800.0&lt;/onlySince&gt; . Die Einheiten werden die Zieleinheiten der ersten Dimension sein. Beispielsweise für Zeitabmessungen die Einheiten in ERDDAP™ immer "seconds since 1970-01-01T00:00:00Z" . So 946684800.0 "seconds since 1970-01-01T00:00:00Z" entspricht 2000-01T00:00Z. Dies ist immer eine nützliche Option, ist aber besonders nützlich, wenn die erste Dimension keine Zeitdaten hat.

####  EDDGrid Kopie Recomended use{#eddgridcopy-recomended-use} 
1. Erstellen Sie die&lt;Datensatz&gt; Eintrag (der einheimische Typ, nicht EDDGrid Kopie) für die Remote-Datenquelle.
     **Machen Sie es richtig, einschließlich aller gewünschten Metadaten.** 
2. Wenn es zu langsam ist, fügen Sie XML-Code hinzu, um es in einem EDDGrid Datensatz kopieren.
    * Verwenden Sie ein anderes datasetID   (vielleicht durch Veränderung datasetID von der alten datasetID leicht) .
    * Kopieren Sie die&lt;zugänglich Zu&gt;&lt;reloadEveryNMinutes&gt; und&lt;aufChange&gt; von der Fernbedienung EDDGrid XML in der EDDGrid Copy's XML. (Ihre Werte für EDDGrid Kopieren von Materie; ihre Werte für den inneren Datensatz sind irrelevant.) 
3.   ERDDAP™ eine lokale Kopie der Daten erstellen und pflegen.
         
* WARNING: EDDGrid Kopieren geht davon aus, dass sich die Datenwerte für jedes Stück nie ändern. Wenn/wenn sie es tun, müssen Sie die chunk-Dateien manuell löschen *BigParentDirectory* / Kopieren/ * datasetID * / die geändert und [Flagge](/docs/server-admin/additional-information#flag) der zu ladende Datensatz, so dass die gelöschten Stücke ersetzt werden. Wenn Sie ein E-Mail-Abonnement zum Datensatz haben, erhalten Sie zwei E-Mails: eine, wenn der Datensatz zuerst neu geladen und die Daten kopiert, und eine andere, wenn der Datensatz wieder geladen wird. (automatisch) und erkennt die neuen lokalen Datendateien.
     
* Alle Achswerte müssen gleich sein.
Für jede der Achsen mit Ausnahme des linken (erste) , alle Werte müssen für alle Kinder gleich sein. Die Genauigkeit der Prüfung wird durch [MatchAxisNDigits](#matchaxisndigits) .
     
* Einstellungen, Metadaten, Variablen -- EDDGrid Kopieren verwendet Einstellungen, Metadaten und Variablen aus dem beigefügten Quelldatensatz.
     
* Metadaten ändern -- Wenn Sie etwas ändern müssen addAttributes oder die Reihenfolge der dem Quelldatensatz zugeordneten Variablen ändern:
    1. Änderung der addAttributes für den Quelldatensatz in datasets.xml , wie nötig.
    2. Löschen Sie eine der kopierten Dateien.
    3. Stellen Sie ein [Flagge](/docs/server-admin/additional-information#flag) um den Datensatz sofort neu zu laden. Wenn Sie ein Flag verwenden und ein E-Mail-Abonnement zum Datensatz haben, erhalten Sie zwei E-Mails: eine, wenn der Datensatz zuerst neu geladen wird und die Daten kopiert, und eine andere, wenn der Datensatz wieder geladen wird. (automatisch) und erkennt die neuen lokalen Datendateien.
    4. Die gelöschte Datei wird mit den neuen Metadaten regeneriert. Wenn der Quelldatensatz jemals nicht verfügbar ist, EDDGrid Kopieren von Datensatz erhält Metadaten aus der regenerierten Datei, da es die jüngste Datei ist.
####  EDDGrid Kopie Skelett XML{#eddgridcopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#grid-copy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onlySince>](#onlysince)...&lt;/onlySince> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromCassandra{#eddtablefromcassandra} 
 [ **EDDTableFromCassandra** ](#eddtablefromcassandra) behandelt Daten von einem [Cassandra](https://cassandra.apache.org/) Tisch. Cassandra ist eine NoSQL-Datenbank.

*    ERDDAP™ kann mit Cassandra v2 und v3 ohne Änderungen oder Unterschiede im Setup arbeiten. Wir haben getestet mit [Cassandra v2 und v3 von Apache](https://cassandra.apache.org/download/) . Wahrscheinlich ERDDAP™ kann auch mit Cassandra von DataStax heruntergeladen arbeiten.
     
* Für Aug 2019 - Mai 2021 hatten wir Probleme, Cassandra mit AdoptOpenJdk zu arbeiten Java v8. Es war eine EXCEPTION\\_ACCESS\\_VIOLATION. Aber jetzt (Mai 2021) , dieses Problem ist weg: wir können Cassandra v2.1.22 und AdoptOpenJdk jdk8u292-b10 erfolgreich verwenden.
     
#### Eine Tabelle{#one-table} 
Cassandra unterstützt "Joins" nicht so, wie relationale Datenbanken funktionieren. Ein ERDDAP™ EDDTableFromCassandra dataset maps to one (vielleicht eine Untermenge eines) Cassandra Tisch.

#### Cassandra datasets.xml  {#cassandra-datasetsxml} 
*    ERDDAP™ kommt mit der Cassandra Java Treiber, so dass Sie es nicht separat installieren müssen.
* Lesen Sie sorgfältig alle Informationen dieses Dokuments über EDDTableFromCassandra. Einige der Details sind sehr wichtig.
* Die Cassandra Java der Fahrer soll mit Apache Cassandra arbeiten (1.2+) und DataStax Enterprise (3.1+) . Wenn Sie Apache Cassandra 1.2.x verwenden, müssen Sie die cassandra.yaml-Datei für jeden Knoten bearbeiten, um start\\_native\\_transport einzustellen: true, dann starten Sie jeden Knoten neu.
* Wir empfehlen dringend die Verwendung der [Datensätze generieren Xml Programm](#generatedatasetsxml) einen groben Entwurf der datasets.xml für diesen Datensatz. Sie können das dann bearbeiten, um es abzustimmen (insbesondere [&lt;Partition KeySourceNames&gt;] (#partitionkeysourcenames) ) Sie können die meisten Informationen sammeln, die Sie benötigen, um das XML für einen EDDTableFromCassandra-Datensatz zu erstellen, indem Sie den Cassandra-Administrator kontaktieren und das Internet durchsuchen.
    
Datensätze generieren Xml hat zwei spezielle Optionen für EDDTableFromCassandra:
    
    1. Wenn Sie "&#33;&#33;&#33;LIST&#33;&#33;&#33;" eingeben (ohne die Zitate) für den Schlüsselbereich wird das Programm eine Liste von Schlüsselbereichen anzeigen
    2. Wenn Sie einen bestimmten Schlüsselbereich eingeben und dann "&#33;&#33;&#33;LIST&#33;&#33;&#33;" eingeben (ohne die Zitate) für den Tabellennamen wird das Programm eine Liste von Tabellen in diesem Schlüsselraum und ihren Spalten anzeigen.
##### Fallempfindlichkeit{#case-sensitivity} 
* Case-insensitiver Schlüsselraum und Tabellennamen -
Cassandra behandelt Schlüssel- und Tischnamen auf fallunempfindliche Weise. Aus diesem Grund verwenden Sie NIE ein reserviertes Wort (aber mit einem anderen Fall) als Cassandra-Schlüsselraum oder Tischname.
* Fallunempfindliche Säulennamen --
Cassandra behandelt standardmäßig Spaltennamen auf fallunempfindliche Weise. Wenn Sie eines der reservierten Wörter von Cassandra als Spaltenname verwenden (Bitte nicht&#33;) , Sie müssen verwenden
```
        <columnNameQuotes>"<columnNameQuotes>  
```
in datasets.xml für diesen Datensatz, so dass Cassandra und ERDDAP™ wird die Spaltennamen auf eine fallempfindliche Weise behandeln. Dies wird wahrscheinlich ein massiver Kopfschmerz für Sie sein, weil es schwer ist, die case-sensitiven Versionen der Spaltennamen zu bestimmen -- Cassandra zeigt fast immer die Spaltennamen als alle Kleinbuchstaben, unabhängig vom wahren Fall.
* Arbeiten Sie eng mit dem Cassandra-Administrator zusammen, der möglicherweise über relevante Erfahrungen verfügt. Wenn der Datensatz nicht geladen wird, lesen Sie die [Fehlermeldung](#troubleshooting-tips) sorgfältig, um herauszufinden, warum.
         
#### Cassandra&lt;Verbindung Eigentum &gt;{#cassandra-connectionproperty} 
Cassandra verfügt über Verbindungseigenschaften, die in datasets.xml . Viele von ihnen werden die Leistung der Cassandra- ERDDAP™ Verbindung. Leider müssen Cassandra-Eigenschaften programmatisch in Java , so ERDDAP™ muss Code für jede Eigenschaft haben ERDDAP™ unterstützt. Derzeit, ERDDAP™ unterstützt diese Eigenschaften:
 (Die gezeigten Standardeinstellungen sind das, was wir sehen. Die Standardeinstellungen Ihres Systems können unterschiedlich sein.) 

*    **Allgemeine Optionen**   
    &lt;Verbindung Immobilienname=" **Kompression** &gt; *keine | LZ4 | knackig* &lt;/ Verbindung Insgesamt (Case-insensitive, default=none)   
     (Allgemeine Kompressionsberatung: Verwenden Sie 'none', wenn die Verbindung zwischen Cassandra und ERDDAP™ ist lokal / schnell und verwenden Sie 'LZ4', wenn die Verbindung entfernt / langsam ist.)   
    &lt;Verbindung Immobilienname=" **Anmeldeinformationen** &gt; *Benutzername/Passwort* &lt;/ Verbindung Insgesamt (Das ist ein Literal '/' )   
    &lt;Verbindung Immobilienname=" **Metriken** &gt; *wahr | falsch* &lt;/ Verbindung Insgesamt (2021-01-25 war default=true, jetzt ignoriert und immer falsch)   
    &lt;Verbindung Immobilienname=" **Hafen** &gt; *Integer* &lt;/ Verbindung Insgesamt (Standard für natives binäres Protokoll=9042)   
    &lt;Verbindung Immobilienname=" **Sl.** &gt; *wahr | falsch* &lt;/ Verbindung Insgesamt (default=false)   
     (Mein schneller Versuch, Ssl zu benutzen, hat versagt. Wenn es dir gelingt, sag mir bitte, wie du es getan hast.) 
*    **Abfrageoptionen**   
    &lt;Verbindung Immobilienname=" **Konsistenz Ebene** &gt; *alle | alle | je\\_quorum | Lokalität | Lokalität | Lokalität | eine | quorum | Serie | drei | zwei* &lt;/ Verbindung Insgesamt (Case-insensitive, default=ONE)   
    &lt;Verbindung Immobilienname=" **fetchSize** &gt; *Integer* &lt;/ Verbindung Insgesamt (Standard=5000)   
     (Setzen Sie fetchSize nicht auf einen kleineren Wert.)   
    &lt;Verbindung Immobilienname=" **SeriellConsistencyLevel** &gt; *alle | alle | je\\_quorum | Lokalität | Lokalität | Lokalität | eine | quorum | Serie | drei | zwei* &lt;/ Verbindung Insgesamt (Case-insensitive, default=SERIAL) 
*    **Socket Optionen**   
    &lt;Verbindung Immobilienname=" **Verbindung TimeoutMillis** &gt; *Integer* &lt;/ Verbindung Insgesamt (Standard=5000)   
     (Nicht anschließen TimeoutMillis auf einen kleineren Wert.)   
    &lt;Verbindung Immobilienname=" **haltenAlive** &gt; *wahr | falsch* &lt;/ Verbindung Insgesamt
    &lt;Verbindung Immobilienname=" **lesenTimeoutMillis** &gt; *Integer* &lt;/ Verbindung Insgesamt
     (Cassandra's default readTimeoutMillis ist 12000, aber ERDDAP™ ändert den Standard auf 120000. Wenn Cassandra ReadTimeouts wirft, kann dies nicht helfen, denn Cassandra wirft sie manchmal vor dieser Zeit. Das Problem ist wahrscheinlicher, dass Sie zu viele Daten pro Partition speichern Schlüsselkombination.)   
    &lt;Verbindung Immobilienname=" **erhaltenBufferSize** &gt; *Integer* &lt;/ Verbindung Insgesamt
     (Es ist unklar, was der StandardempfangBufferSize ist. Setzen Sie das nicht auf einen kleinen Wert.)   
    &lt;Verbindung Immobilienname=" **In den Warenkorb** &gt; *Integer* &lt;/ Verbindung Insgesamt
    &lt;Verbindung Immobilienname=" **tcpNoDelay** &gt; *wahr | falsch* &lt;/ Verbindung Insgesamt (Standard=null) 

Wenn Sie in der Lage sein müssen, andere Verbindungseigenschaften einzustellen, siehe unsere [Abschnitt zum Erhalt zusätzlicher Unterstützung](/docs/intro#support) .

Für ein gegebenes Starten von Tomcat werden die Verbindungseigenschaften nur zum ersten Mal verwendet, wenn ein Datensatz für eine bestimmte Cassandra URL erstellt wird. Alle Reloads dieses Datensatzes und alle nachfolgenden Datensätze, die die gleiche URL teilen, werden diese Originalverbindung verwenden.
    
#### CQL{#cql} 
Die Cassandra Query Sprache (CQL) oberflächlich wie SQL, die von traditionellen Datenbanken verwendete Abfragesprache. Weil OPeNDAP 's tabellarische Datenanfragen wurden entworfen, um SQL tabular Datenanfragen zu mimieren, ist es möglich, ERDDAP™ um tabellarische Datenanforderungen in CQL Bound/PreparedStatements zu konvertieren. ERDDAP™ protokolliert die Aussage in [Pressemitteilung](/docs/server-admin/additional-information#log) wie
Erklärung als Text: *theStatementAsText*   
Die Version der Erklärung, die Sie sehen, wird eine Textdarstellung der Erklärung sein und wird nur "?" haben, wo die Strengewerte platziert werden.
       
Nicht so einfach... Leider hat CQL viele Einschränkungen, auf denen Spalten abgefragt werden können, mit welchen Zwängen z.B. Partitionsschlüsselspalten mit = und IN eingeschränkt werden können. ERDDAP™ sendet einige Zwänge an Cassandra und wendet alle Zwänge an, nachdem die Daten von Cassandra empfangen wurden. Hilfe ERDDAP™ Sie müssen effizient mit Cassandra umgehen [&lt;Partition KeySourceNames&gt;] (#partitionkeysourcenames) , [&lt;ClusterColumnSourceNamen&gt;] (#clustercolumnsourcenames) , und&lt;IndexColumnSourceNames&gt;] (#indexcolumnsourcenames) in datasets.xml für diesen Datensatz. Dies sind die wichtigsten Möglichkeiten, um zu helfen ERDDAP™ effizient mit Cassandra arbeiten. Wenn du es nicht sagst ERDDAP™ diese Informationen, der Datensatz wird schmerzlich langsam in ERDDAP™ und nutzen Tonnen von Cassandra-Ressourcen.
     
#### &lt;Partition KeySourceNames&gt;{#partitionkeysourcenames} 
Weil Partitionsschlüssel eine zentrale Rolle in Cassandra Tabellen spielen, ERDDAP™ muss sie kennen sourceName s und gegebenenfalls weitere Informationen darüber, wie mit ihnen gearbeitet werden kann.
* Sie müssen eine comma-separierte Liste der Partitionsschlüssel Quellspaltennamen in datasets.xml über&lt;Partition KeySourceNames&gt;.
Einfaches Beispiel,
```
        <partitionKeySourceNames>station, deviceid<partitionKeySourceNames>  
```
Mehr komplexes Beispiel,
```
        <partitionKeySourceNames>deviceid=1007, date/sampletime/1970-01-01<partitionKeySourceNames>
```
* TimeStamp Partition Keys -- Ist eine der Partitionsschlüsselspalten eine Zeitstempelsäule, die eine gröbere Version einer anderen Zeitstempelsäule aufweist, geben Sie diese über
     *PartitionKeySourcName/otherColumnSourceName/ time\\_precision *   
wenn time\\_precision ist einer der [ time\\_precision ](#time_precision) Strings, anderweitig in ERDDAP .
Der Weg Z im time\\_precision string ist der Standard, also spielt es keine Rolle, ob die time\\_precision String endet in Z oder nicht.
Zum Beispiel ERDDAP™ Datum/Sampletime/1970-01 "Datumskonstraten können aus den Einschränkungen der Stichprobenzeit aufgebaut werden, indem diese time\\_precision ." Die tatsächliche Umwandlung von Zwängen ist komplexer, aber das ist der Überblick.
     **Verwenden Sie dies, wenn es relevant ist.** Es ermöglicht ERDDAP™ effizient mit Cassandra arbeiten. Wenn diese Beziehung zwischen Spalten in einer Cassandra-Tabelle existiert und Sie nicht sagen ERDDAP™ , der Datensatz wird schmerzlich langsam in ERDDAP™ und nutzen Tonnen von Cassandra-Ressourcen.
* Einheit Werte Partitionsschlüssel -- Wenn du willst ERDDAP™ Datensatz, um mit nur einem Wert einer Partitionsschlüssel zu arbeiten, *PartitionKeySourceName=Wert* .
Verwenden Sie keine Zitate für eine numerische Spalte, beispielsweise deviceid=1007
Verwenden Sie Zitate für eine String-Säule, z.B. stationid="Point Pinos"
* Datensatz Standard Sortieren von Bestellung -- Die Reihenfolge der Partitionsschlüssel&lt; dataVariable &gt; in datasets.xml bestimmt die Standard-Sortenfolge der Ergebnisse von Cassandra. Natürlich können Benutzer eine andere Sortierreihenfolge für eine bestimmte Reihe von Ergebnissen durch Appending & anfordern orderBy  (" *Komma-separierte Variablenliste* ") bis zum Ende ihrer Abfrage.
* Standardmäßig, Cassandra und ERDDAP™ Behandeln Sie Spaltennamen auf fallunempfindliche Weise. Aber wenn Sie setzen [SpalteNameQuotes](#case-sensitivity) zu " ERDDAP™ wird Cassandra Spaltennamen auf eine fallempfindliche Weise behandeln.
         
#### &lt;Partition Schlüsselwörter &gt;{#partitionkeycsv} 
Wenn dies angegeben ist, ERDDAP™ wird es verwenden, anstatt Cassandra für die Partition zu fragen Schlüsselinformationen jedes Mal, wenn der Datensatz neu geladen wird. Dies liefert die Liste der verschiedenen Partitionsschlüsselwerte, in der Reihenfolge, die sie verwendet werden. Die Zeiten müssen als Sekunden seit 1970-01-01T00:00Z angegeben werden. Aber es gibt auch zwei spezielle alternative Möglichkeiten, Zeiten festzulegen (jeder als Zeichenkette kodiert) :

1) Zeit (CAS-Nr. Zeit)   (MAY als String kodiert werden)   
2) "Zeiten (anISO8601StartTime, strideSeconds, stopTime) " (MUST als String kodiert)   
Stopp Zeit kann ein ISO8601 Zeit oder ein " now- nUnits" Zeit (z.B. " now- 3 Minuten") .
Stopp Zeit muss kein genaues Spiel des Starts sein Zeit + x strideSeconds.
Eine Reihe mit einer Zeit () Wert wird in mehrere Zeilen vor jeder Abfrage erweitert, so dass die Liste der Partition Schlüssel können immer perfekt aktuell sein.
Zum Beispiel
```
    <partitionKeyCSV>
    deviceid,date
    1001,"times(2014-11-01T00:00:00Z, 86400, 2014-11-02T00:00:00Z)"
    1007,"time(2014-11-07T00:00:00Z)"
    1008,time(2014-11-08T00:00:00Z)
    1009,1.4154912E9
    </partitionKeyCSV>
```
erweitert sich in diese Tabelle der Partitionsschlüsselkombinationen:
```
    deviceid,date
    1001,1.4148E9
    1001,1.4148864E9
    1007,1.4153184E9
    1008,1.4154048E9
    1009,1.4154912E9 
```
#### &lt;ClusterColumnSourceNames&gt;{#clustercolumnsourcenames} 
Cassandra akzeptiert SQL-ähnliche Einschränkungen auf Clusterspalten, die die Spalten sind, die den zweiten Teil des Primärschlüssels bilden (nach dem Partitionsschlüssel (S) ) . So ist es wichtig, dass Sie diese Spalten über&lt;ClusterColumnSourceNames&gt;. Dies ermöglicht ERDDAP™ effizient mit Cassandra arbeiten. Wenn es Clusterspalten gibt und Sie nicht sagen ERDDAP , der Datensatz wird schmerzlich langsam in ERDDAP™ und nutzen Tonnen von Cassandra-Ressourcen.
    * Zum Beispiel&lt;ClusterColumnSourceNamen&gt; *myClusterColumn1, myClusterColumn2* &lt;/clusterColumnSourceNamen&gt;
    * Wenn eine Cassandra-Tabelle keine Clusterspalten hat, geben Sie entweder nicht an&lt;ClusterColumnSourceNames&gt; oder ohne Wert angeben.
    * Standardmäßig, Cassandra und ERDDAP™ Behandeln Sie Spaltennamen auf fallunempfindliche Weise. Aber wenn Sie setzen [SpalteNameQuotes](#case-sensitivity) zu " ERDDAP™ wird Cassandra Spaltennamen auf eine fallempfindliche Weise behandeln.
         
#### &lt;indexColumnSourceNames&gt;{#indexcolumnsourcenames} 
Cassandra akzeptiert '=' Zwänge auf sekundären Indexspalten, die die Spalten sind, die Sie explizit Indexe für via erstellt haben
```
    CREATE INDEX *indexName* ON *keyspace.tableName* (*columnName*);  
```
 (Ja, die Klammern sind erforderlich.)   
So ist es sehr nützlich, wenn Sie diese Spalten über&lt;indexColumnSourceNames&gt;. Dies ermöglicht ERDDAP™ effizient mit Cassandra arbeiten. Wenn es Indexspalten gibt und Sie nicht sagen ERDDAP , einige Fragen werden unnötig sein, schmerzlich langsam in ERDDAP™ und nutzen Tonnen von Cassandra-Ressourcen.
* Zum Beispiel&lt;indexColumnSourceNamen&gt; *myIndexColumn1, myIndexColumn2* &lt;/indexColumnSourceNamen&gt;
* Wenn eine Cassandra-Tabelle keine Indexspalten hat, geben Sie entweder nicht an&lt;indexColumnSourceNames&gt; oder ohne Wert angeben.
* WARNING: Cassandra-Indizes sind nicht wie Datenbankindizes. Cassandra-Indizes helfen nur mit '=' Einschränkungen. Und sie sind nur [empfohlen](https://cassandra.apache.org/doc/latest/cql/indexes.html) für Spalten, die deutlich weniger als Gesamtwerte aufweisen.
* Standardmäßig, Cassandra und ERDDAP™ Behandeln Sie Spaltennamen auf fallunempfindliche Weise. Aber wenn Sie setzen [SpalteNameQuotes](#case-sensitivity) zu " ERDDAP™ wird Cassandra Spaltennamen auf eine fallempfindliche Weise behandeln.
         
#### &lt;maxRequestFraction&gt;{#maxrequestfraction} 
Wann ERDDAP™   (Wiederholen) einen Datensatz lädt, ERDDAP™ bekommt von Cassandra die Liste der verschiedenen Kombinationen der Partitionsschlüssel. Für einen riesigen Datensatz wird die Anzahl der Kombinationen groß sein. Wenn Sie verhindern möchten, dass Nutzeranfragen den meisten oder allen Datensatz anfordern (oder sogar eine Anfrage, die fragt ERDDAP™ die meisten oder alle Daten herunterladen, um sie weiter zu filtern) , you can tell ERDDAP™ nur um Anträge zuzulassen, die die Anzahl der Kombinationen um einen gewissen Betrag reduzieren&lt;maxRequestFraction&gt;, die eine schwimmende Punktzahl zwischen 1e-10 ist (was bedeutet, dass der Antrag nicht mehr als 1 Kombination in einer Milliarde benötigen kann) und 1 (der Standard, was bedeutet, dass die Anforderung für den gesamten Datensatz sein kann) .
Wenn beispielsweise ein Datensatz 10000 verschiedene Kombinationen der Partitionsschlüssel aufweist und maxRequestFraction auf 0,1 gesetzt ist,
dann Anfragen, die Daten aus 1001 oder mehr Kombinationen benötigen, eine Fehlermeldung erzeugen,
jedoch Anträge, die Daten von 1000 oder weniger Kombinationen benötigen, sind zulässig.
    
Im Allgemeinen, je größer der Datensatz, desto niedriger sollten Sie festlegen&lt;maxRequestFraction&gt;. So können Sie es auf 1 für einen kleinen Datensatz, 0,1 für einen mittleren Datensatz, 0,01 für einen großen Datensatz und 0,0001 für einen riesigen Datensatz setzen.
    
Dieser Ansatz ist nicht perfekt. Es wird dazu führen, dass einige vernünftige Anträge abgelehnt werden und einige zu große Anträge erlaubt werden. Aber es ist ein schwieriges Problem, und diese Lösung ist viel besser als nichts.
    
#### Cassandra subsetVariables  {#cassandra-subsetvariables} 
Wie bei anderen EDDTable-Datensätzen können Sie eine komma-separierte Liste angeben&lt; dataVariable &gt; destinationName s in einem globalen Attribut namens " [ subsetVariables ](#subsetvariables) " Variablen zu identifizieren, die eine begrenzte Anzahl von Werten aufweisen. Der Datensatz hat dann eine .subset-Webseite und zeigt Listen von verschiedenen Werten für diese Variablen in Dropdown-Listen auf vielen Webseiten.
    
Inklusive nur Partitionsschlüsselgrößen und statische Spalten in der Liste ist STRONGLY E NCO URAGED. Cassandra wird in der Lage sein, die Liste der verschiedenen Kombinationen sehr schnell und einfach zu erzeugen, wenn der Datensatz neu geladen wird. Eine Ausnahme sind Zeitstempel-Partitionsschlüssel, die grobe Versionen einer anderen Zeitstempelsäule sind -- es ist wahrscheinlich am besten, diese aus der Liste der subsetVariables da es eine große Anzahl von Werten gibt und sie für Benutzer nicht sehr nützlich sind.
    
Wenn Sie nicht-Partition-Taste, nicht-statische Variablen in der Liste enthalten, wird es wahrscheinlich sein **sehr** rechnerisch teuer für Cassandra jedes Mal, wenn der Datensatz neu geladen wird, weil ERDDAP™ muss jede Zeile des Datensatzes durchschauen, um die Informationen zu generieren. In der Tat ist die Abfrage wahrscheinlich scheitern. Abgesehen von sehr kleinen Datensätzen ist dies also STRONGLY DISCOURAGED.
    
#### Datentypen von Cassandra{#cassandra-datatypes} 
Denn es gibt etwas Mehrdeutigkeit darüber [Cassandra Datentypen](https://cassandra.apache.org/doc/latest/cql/types.html) Karte, die ERDDAP™ Datentypen, Sie müssen eine [&lt;DatenTyp&gt;] (#datatype) Tag für jeden [&lt; dataVariable &gt; (#datavariable) zu sagen ERDDAP™ welche Datentyp zu verwenden. Der Standard ERDDAP™ Daten Arten (und den häufigsten entsprechenden Cassandra-Datentypen) sind:
    
*    [Borolen](#boolean-data)   (Borolen) , die ERDDAP™ dann speichert als Bytes
* Byte (int, wenn der Bereich -128 bis 127) 
* kurz (int, wenn der Bereich -32768 bis 32767) 
* in (int, Zähler?, varint?, wenn der Bereich ist -2147483648 bis 2147483647) 
* lang (bigint, counter?, varint?, wenn der Bereich ist -9223372036854775808 bis 9223372036854775807) 
* Flossen (Flossen) 
* Doppelzimmer (doppelt, dezimal (mit möglichem Präzisionsverlust) , Zeitstempel) 
* &#33; (ascii oder text, wenn sie nie mehr als 1 Zeichen haben) 
* Streichung (ascii, text, varchar, inet, uuid, timeuuid, blob, map, set, list?) 

Cassandra's [Zeitstempel](#cassandra-timestamp-data) ist ein Sonderfall: ERDDAP Doppeldaten Typ.

Wenn Sie einen String-Datentyp angeben ERDDAP™ für eine Cassandra-Karte, Set oder Liste, die Karte, das Set oder die Liste auf jeder Cassandra-Reihe wird in eine einzelne Zeile in der ERDDAP™ Tisch. ERDDAP™ hat ein alternatives System für Listen; siehe unten.

 *Typ* Listen -- ERDDAP 's [&lt;DatenTyp&gt;] (#datatype) Tag für Cassandra dataVariable s kann die regelmäßige ERDDAP™ Daten Arten (siehe oben) plus mehrere spezielle DatenTypen, die für Cassandra Listenspalten verwendet werden können: booleanList, byteList, ubyteList, shortList, ushortList, intList, uintList, longList, ulongList, floatList, doubleList, charList, StringList. Wenn eine dieser Listenspalten sich in den Ergebnissen befindet, die an ERDDAP™ , jede Zeile der Quelldaten wird auf Liste erweitert. Größe () Datenreihen in ERDDAP ; einfache Daten Arten (z.B. int) in dieser Quelldatenzeile wird doppelte Liste. Größe () Zeiten. Wenn die Ergebnisse mehr als eine Listenvariable enthalten, haben alle Listen auf einer bestimmten Datenzeile die gleiche Größe und müssen "parallele" Listen sein, oder ERDDAP™ wird eine Fehlermeldung generieren. Beispielsweise bei Strommessungen aus einem ADCP,
Tiefe \\[ 0) \\] , uCurrent \\[ 0) \\] , vCurrent \\[ 0) \\] und zCurrent \\[ 0) \\] alle verwandt sind und
Tiefe \\[ 1 \\] , uCurrent \\[ 1 \\] , vCurrent \\[ 1 \\] und zCurrent \\[ 1 \\] sind alle verwandt, ...
Alternativ, wenn Sie nicht wollen ERDDAP™ eine Liste in mehrere Zeilen in der ERDDAP™ Tabelle, String als die dataVariable Daten Geben Sie so die gesamte Liste als ein String auf einer Zeile in ERDDAP .
    
#### Cassandra TimeStamp Daten{#cassandra-timestamp-data} 
Die Zeitstempeldaten von Cassandra sind sich immer der Zeitzonen bewusst. Wenn Sie Zeitstempeldaten ohne Angabe einer Zeitzone eingeben, geht Cassandra davon aus, dass der Zeitstempel die lokale Zeitzone nutzt.
    
 ERDDAP™ unterstützt Zeitstempeldaten und stellt immer die Daten in der Zulu /GMT Zeitzone. Also, wenn Sie Zeitstempeldaten in Cassandra mit einer anderen Zeitzone als Zulu /GMT, denken Sie daran, dass Sie alle Anfragen für Zeitstempeldaten in ERDDAP™ Verwendung von Zulu /GMT Zeitzone. Also nicht überrascht sein, wenn die Zeitstempelwerte, die aus ERDDAP werden wegen des Zeitzonenschalters von Ort zu Ort um mehrere Stunden verschoben Zulu -GMT-Zeit.

* In ERDDAP ' datasets.xml in der&lt; dataVariable &gt; tag für eine Zeitstempelvariable, Set
```
          <dataType>double</dataType>  
```
und in&lt; addAttributes &gt; eingestellt
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Vorschlag: Wenn die Daten ein Zeitbereich sind, ist es sinnvoll, die Zeitstempelwerte auf die Mitte des implizierten Zeitbereichs bezogen zu haben. (zum Beispiel, Mittag) . Wenn zum Beispiel ein Benutzer Daten für 2010-03-26T13:00Z von einem anderen Datensatz hat und die nächsten Daten von diesem Cassandra Datensatz, der Daten für jeden Tag hat, dann die Daten für 2010-03-26T12:00Z (die Cassandra-Daten zu diesem Zeitpunkt) ist offensichtlich das Beste (im Gegensatz zur Mitternacht vor oder nach, wo es weniger offensichtlich ist, was am besten ist) .
*    ERDDAP™ hat ein Dienstprogramm [Numerisch umrechnen Zeit für/von einer Streichzeit](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) .
* Vgl. [Wie ERDDAP™ Angebote mit Zeit](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) .
         
#### Integer null{#integer-nulls} 
Cassandra unterstützt Nullen in Cassandra int ( ERDDAP™ in) und Bigint ( ERDDAP™ lang) Spalten, aber ERDDAP™ unterstützt keine wahren Nullen für einen ganzzahligen Datentyp.
Standardmäßig werden Cassandra ganze Nulls in ERDDAP™ bis 2147483647 für Int-Säulen oder 9223372036854775807 für lange Spalten. Diese erscheinen als "NaN" in einigen Arten von Textausgabedateien (z.B. .csv) , "" in anderen Textausgabedateien (zum Beispiel, .htmlTable ) , und die spezifische Zahl (2147483647 für fehlende Intwerte) in anderen Arten von Dateien (zum Beispiel binäre Dateien wie .nc und Matte) . Ein Benutzer kann nach Zeilen von Daten mit dieser Art von fehlendem Wert suchen, indem er sich auf "NaN", z.B. "&windSpeed=NaN" bezieht.
    
Wenn Sie einen anderen Ganzzahlwert verwenden, um fehlende Werte in Ihrer Cassandra-Tabelle anzuzeigen, bitte diesen Wert in datasets.xml :

>    &lt;att name="missing\\_value" [type="int"](#attributetype)\\>-999&lt;/att>

Für Cassandra Floating Point Spalten, Nullen werden in NaNs umgewandelt in ERDDAP . Für Cassandra-Datentypen, die in Strings umgewandelt werden ERDDAP™ , nulls werden in leere Strings umgewandelt. Das sollte kein Problem sein.
    
#### "WARNUNG: Re-preparing bereits vorbereitete Abfrage"{#warning-re-preparing-already-prepared-query} 
* "WARNUNG: Re-preparing bereits vorbereitete Abfrage" in *Tomcat* /logs/catalina.out (oder eine andere Tomcat Protokolldatei)   
Cassandra-Dokumentation sagt, dass es Probleme gibt, wenn die gleiche Abfrage in eine vorbereiteteStatement zweimal gemacht wird (oder mehr) . (Siehe [Fehlerbericht](https://datastax-oss.atlassian.net/browse/JAVA-236) .) Um Cassandra nicht sauer zu machen, ERDDAP™ Caches alle VorbereiteteStatements, so dass es sie wiederverwenden kann. Der Cache ist verloren, wenn/wenn Tomcat/ ERDDAP™ ist neu gestartet, aber ich denke, das ist okay, weil die Vorbereitungen mit einer bestimmten Sitzung verbunden sind (zwischen Java und Cassandra) , die auch verloren geht. Sie können diese Nachrichten sehen. Ich kenne keine andere Lösung. Glücklicherweise ist es eine Warnung, kein Fehler (Obwohl Cassandra droht, dass es zu Leistungsproblemen führen kann) .
    
Cassandra behauptet, dass Vorbereitete Bestimmungen für immer gut sind, also ERDDAP "s cached PreparedStatements sollten nie außer-of-date/invalid. Wenn das nicht wahr ist, und Sie Fehler über bestimmte VorbereiteteStatements erhalten, die nicht aktuell/ungültig sind, dann müssen Sie neu starten ERDDAP™ zu klären ERDDAP 's Cache of ReadydStatements.
    
#### Cassandra Sicherheit{#cassandra-security} 
Vgl. [Sicherung Cassandra](https://cassandra.apache.org/doc/latest/operating/security.html) 

Wenn Sie mit Cassandra arbeiten, müssen Sie die Dinge so sicher und sicher wie möglich zu tun, um einen bösartigen Benutzer zu vermeiden, um Ihre Cassandra zu beschädigen oder Zugriff auf Daten zu erhalten, die sie nicht haben sollten. ERDDAP™ versucht, die Dinge auch sicher zu machen.

* Wir ermutigen Sie zur Einrichtung ERDDAP™ um Cassandra als Cassandra-Nutzer zu verbinden, der nur Zugriff auf die **relevant** Tabelle (S) und hat nur READ Privilegien.
* Wir ermutigen Sie, die Verbindung von ERDDAP™ nach Cassandra, so dass es
    * immer verwendet SSL,
    * nur Verbindungen von einer IP-Adresse (oder einen Adressblock) und von der einen ERDDAP™ Benutzer und
    * nur Passwörter in ihrem MD5 Hashed-Form.
*    \\[ VERFAHREN \\] Die Verbindung Vorteile (einschließlich des Passworts&#33;) als Klartext gespeichert werden datasets.xml . Wir haben keinen Weg gefunden, damit der Administrator das Cassandra-Passwort eingeben kann. ERDDAP Start in Tomcat (die ohne Benutzereingabe erfolgt) , so muss das Passwort in einer Datei zugänglich sein. Um dies sicherer zu machen:
    * Du (die ERDDAP™ Administrator) sollte der Eigentümer sein datasets.xml und haben READ und WRITE Zugriff.
    * Machen Sie eine Gruppe, die nur user=tomcat enthält. Verwenden Sie chgrp, um die Gruppe für datasets.xml , mit nur READ Privilegien.
    * Verwenden Sie chmod, um o-rwx Privilegien zuzuordnen (kein READ- oder WRITE-Zugang für "andere" Benutzer) für datasets.xml .
* Wann ERDDAP™ , das Passwort und andere Verbindungseigenschaften werden in "private" gespeichert Java Variablen.
* Anfragen von Kunden werden vor der Generierung der CQL-Anfragen für Cassandra auf Gültigkeit geprüft.
* Anfragen an Cassandra werden mit CQL Bound/PreparedStatements gestellt, um CQL Injektion zu verhindern. In jedem Fall ist Cassandra inhärent weniger anfällig für CQL-Injektion als herkömmliche Datenbanken sind [SQL-Injektion](https://en.wikipedia.org/wiki/SQL_injection) .
         
#### Cassandra Geschwindigkeit{#cassandra-speed} 
Cassandra kann schnell oder langsam sein. Es gibt einige Dinge, die Sie tun können, um es schnell zu machen:
* Im Allgemeinen -
Die Art von CQL ist, dass Abfragen sind [declaration](https://en.wikipedia.org/wiki/Declarative_programming) . Sie geben nur an, was der Benutzer will. Sie enthalten keine Spezifikation oder Hinweise, wie die Abfrage bearbeitet oder optimiert werden soll. So gibt es keinen Weg ERDDAP™ die Abfrage so zu generieren, dass sie Cassandra hilft, die Abfrage zu optimieren (oder in irgendeiner Weise spezifiziert, wie die Abfrage bearbeitet werden soll) . Im Allgemeinen liegt es an dem Cassandra-Administrator, Dinge einzurichten (z.B. Indizes) für bestimmte Arten von Abfragen zu optimieren.
     
* Angabe der Zeitstempelsäulen, die mit gröberen Präzisions-Zeitstempel-Partitionschlüsseln über [&lt;Partition KeySourceNames&gt;] (#partitionkeysourcenames) ist der wichtigste Weg zu helfen ERDDAP™ effizient mit Cassandra arbeiten. Wenn diese Beziehung in einem Cassandra-Tisch existiert und Sie nicht sagen ERDDAP™ , der Datensatz wird schmerzlich langsam in ERDDAP™ und nutzen Tonnen von Cassandra-Ressourcen.
     
* Angabe der Clusterspalten über [&lt;ClusterColumnSourceNamen&gt;] (#clustercolumnsourcenames) ist der zweitwichtigste Weg zu helfen ERDDAP™ effizient mit Cassandra arbeiten. Wenn es Clusterspalten gibt und Sie nicht sagen ERDDAP , eine große Teilmenge der möglichen Abfragen für Daten wird unnötig, schmerzlich langsam in ERDDAP™ und nutzen Tonnen von Cassandra-Ressourcen.
     
* Make-up [Index](https://cassandra.apache.org/doc/latest/cql/indexes.html) für gebräuchliche Variablen --
Sie können einige Abfragen beschleunigen, indem Sie Indexe für Cassandra Spalten erstellen, die oft mit "=" Einschränkungen eingeschränkt sind.
    
Cassandra kann keine Indexe für Listen-, Set- oder Kartenspalten erstellen.
    
* Angabe der Indexspalten über [&lt;IndexColumnSourceNames&gt;] (#indexcolumnsourcenames) ist eine wichtige Hilfe ERDDAP™ effizient mit Cassandra arbeiten. Wenn es Indexspalten gibt und Sie nicht sagen ERDDAP , einige Abfragen für Daten werden unnötig, schmerzlich langsam in ERDDAP™ und nutzen Tonnen von Cassandra-Ressourcen.
     
#### Cassandra St. Petersburg{#cassandra-stats} 
*    ["Cassandra stats" Diagnosenachrichten](#cassandra-stats) -- Für jeden ERDDAP™ Benutzeranfrage an einen Cassandra-Datensatz, ERDDAP™ wird eine Zeile in der Protokolldatei drucken, *BigParentDirectory* /logs/log.txt, mit einigen Statistiken zur Abfrage, zum Beispiel
```
        \\* Cassandra stats: partitionKeyTable: 2/10000=2e-4 < 0.1 nCassRows=1200 nErddapRows=12000 nRowsToUser=7405  
```
Mit den Zahlen im obigen Beispiel bedeutet dies:

* Wann ERDDAP™ Letzter Beitrag (Wiederholen) diesen Datensatz geladen, Cassandra sagte ERDDAP™ dass es 10000 verschiedene Kombinationen der Partitionsschlüssel gab. ERDDAP™ alle verschiedenen Kombinationen in einer Datei kaschiert.
* Aufgrund der Zwänge des Benutzers, ERDDAP™ identifizierte 2 Kombinationen aus dem 10000, die die gewünschten Daten haben könnten. Also, ERDDAP™ 2 Anrufe nach Cassandra, eine für jede Kombination der Partitionsschlüssel. (Das erfordert Cassandra.) Offensichtlich ist es schwierig, wenn ein großer Datensatz eine große Anzahl von Kombinationen der Partitionsschlüssel hat und eine bestimmte Anfrage das nicht drastisch reduziert. Sie können verlangen, dass jede Anfrage den Schlüsselraum durch die Einstellung reduzieren [&lt;maxRequestFraction&gt; (#maxrequestfraction) . Hier, 2/10000=2e-4, das ist weniger als die maxRequestFraction (0,1 mg/kg) , so war die Anfrage erlaubt.
* Nach der Anwendung der Zwänge auf den Partitionsschlüsseln, [Clusterspalten](#clustercolumnsourcenames) , und [Indexspalten](#indexcolumnsourcenames) die von ERDDAP™ , Cassandra lieferte 1200 Datenzeilen an ERDDAP™ im ResultSet.
* Das Ergebnis sie/Sie hatten [Daten Typ *Art* Liste](#cassandra-datatypes) Spalten (mit einem Durchschnitt von 10 Artikeln pro Liste) , weil ERDDAP™ erweitert die 1200 Reihen von Cassandra in 12000 Reihen in ERDDAP .
*    ERDDAP™ alle Einschränkungen des Nutzers auf die Daten von Cassandra. In diesem Fall verringerten die Beschränkungen, die Cassandra nicht behandelt hatte, die Anzahl der Zeilen auf 7405. Das ist die Anzahl der Zeilen, die an den Benutzer gesendet werden.

Die wichtigste Verwendung dieser Diagnosenachrichten ist, sicherzustellen, dass ERDDAP™ tut, was du denkst, es tut. Wenn es nicht ist (z.B. reduziert sie die Anzahl der verschiedenen Kombinationen nicht wie erwartet?) , dann können Sie die Informationen verwenden, um herauszufinden, was falsch läuft.
 
* Forschung und Experimente, um besser zu finden und zu setzen [&lt;AnschlussProperty&gt; (#cassandra-connectionproperty) 's.
 
* Überprüfen Sie die Geschwindigkeit der Netzverbindung zwischen Cassandra und ERDDAP . Wenn die Verbindung langsam ist, sehen Sie, ob Sie sie verbessern können. Die beste Situation ist, wenn ERDDAP™ wird auf einem Server ausgeführt, der mit demselben verbunden ist (schnell) schaltet als Server den Cassandra-Knoten, an den Sie sich anschließen.
 
* Bitte geduldig sein. Lesen Sie die Informationen hier und in der Cassandra Dokumentation sorgfältig. Experiment. Überprüfen Sie Ihre Arbeit. Wenn die Cassandra... ERDDAP™ Verbindung ist immer noch langsamer als Sie erwarten, beinhalten Sie bitte das Schema Ihrer Cassandra-Tabelle und Ihr ERDDAP™ ein Stück datasets.xml und unsere [Abschnitt zum Erhalt zusätzlicher Unterstützung](/docs/intro#support) .
 
* Wenn alles versagt,
die Speicherung der Daten in einer Sammlung NetCDF V3 .nc Dateien (insbesondere .nc Dateien, die die [CF Diskrete Sampling Geometrien (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Ragged Array Datenstrukturen und so mit ERDDAP ' [EDDTableFromNcCFFiles](#eddtablefromnccffiles) ) . Wenn sie logisch organisiert sind (jeder mit Daten für ein Stück Raum und Zeit) , ERDDAP™ kann Daten sehr schnell aus ihnen extrahieren.
         
#### EDDTableFromCassandra Skelett XML{#eddtablefromcassandra-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromCassandra" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;ipAddress>](#sourceurl)...&lt;/ipAddress>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The Cassandra URL without the port number, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;127.0.0.1 REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#cassandra-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "readTimeoutMillis") and values  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;of the Cassandra properties that ERDDAP™ needs to change.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;keyspace>...&lt;/keyspace> &lt;!-- The name of the keyspace that has  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the table. REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName> &lt;!-- The name of the table, default = "".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;partitionKeySourceNames>](#partitionkeysourcenames)...&lt;partitionKeySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;clusterColumnSourceNames>](#clustercolumnsourcenames)...&lt;clusterColumnSourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;indexColumnSourceNames>](#indexcolumnsourcenames)...&lt;indexColumnSourceNames> &lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;maxRequestFraction>](#maxrequestfraction)...&lt;maxRequestFraction>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL double between 1e-10 and 1 (the default). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#case-sensitivity)...&lt;columnNameQuotes> &lt;!-- OPTIONAL.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Options: \\[nothing\\] (the default) or ". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include a [&lt;dataType>](#datatype) tag. See  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Cassandra DataTypes](#cassandra-datatypes).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For [Cassandra timestamp columns](#cassandra-timestamp-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromDapSequenz{#eddtablefromdapsequence} 
 [ **EDDTableFromDapSequenz** ](#eddtablefromdapsequence) behandelt Variablen innerhalb 1- und 2-Level-Sequenzen aus [ DAP ](https://www.opendap.org/) Server wie DAP PER (wart aufhttps://www.pmel.noaa.gov/epic/software/dapper/, jetzt eingestellt) .

* Wir empfehlen dringend die Verwendung der [Datensätze generieren Xml Programm](#generatedatasetsxml) einen groben Entwurf der datasets.xml für diesen Datensatz. Das können Sie dann bearbeiten, um es zu verfeinern. Sie können die Informationen sammeln, die Sie benötigen, indem Sie sich die DDS- und DAS-Dateien des Quelldatensatzes in Ihrem Browser anschauen ( indem Sie .das und .dds in den Browser einfügen. sourceUrl (ein Beispiel warhttps://dapper.pmel.noaa.gov/dapper/epic/tao\\_time\\_series.cdp.dds)
    
* Eine Variable ist in DAP Sequenz, wenn die Antwort .dds anzeigt, dass die Datenstruktur, die die Variable hält, eine "Sequenz" ist (Fall unempfindlich) .
* In einigen Fällen sehen Sie eine Sequenz innerhalb einer Sequenz, eine 2-stufige Sequenz -- EDDTableFromDapSequence behandelt diese auch.
#### EDDTableFromDapSequence Skelett XML{#eddtablefromdapsequence-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDapSequence" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;outerSequenceName>...&lt;/outerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the outer sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;innerSequenceName>...&lt;/innerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the inner sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is OPTIONAL; use it if the DAP data is a two level  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sequence. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringEQNE>](#sourcecanconstrainstringeqne)true|false&lt;/sourceCanConstrainStringEQNE>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringGTLT>](#sourcecanconstrainstringgtlt)true|false&lt;/sourceCanConstrainStringGTLT>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringRegex>](#sourcecanconstrainstringregex)...&lt;/sourceCanConstrainStringRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;skipDapperSpacerRows>...&lt;/skipDapperSpacerRows>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- skipDapperSpacerRows specifies whether the dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;will skip the last row of each innerSequence other than the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last innerSequence (because Dapper servers put NaNs in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;row to act as a spacer).  This tag is OPTIONAL. The default  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is false.  It is recommended that you set this to true for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;all Dapper sources and false for all other data sources. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromDatabase{#eddtablefromdatabase} 
 [ **EDDTableFromDatabase** ](#eddtablefromdatabase) behandelt Daten aus einer relationalen Datenbanktabelle oder [Blick](https://en.wikipedia.org/wiki/View_(database) )

#### Eine Tabelle oder Ansicht{#one-table-or-view} 
Wenn die Daten, die Sie bedienen möchten, in zwei oder mehr Tabellen (und braucht daher eine JOIN, um Daten aus beiden Tabellen auf einmal zu extrahieren) , Sie müssen einen machen [denormalisiert](https://en.wikipedia.org/wiki/Denormalization)   (bereits verbunden) Tabelle oder [Blick](https://en.wikipedia.org/wiki/View_(SQL) ) mit allen Daten, die Sie als Datensatz zur Verfügung stellen möchten ERDDAP .

Für große, komplexe Datenbanken kann es sinnvoll sein, mehrere Blöcke als denormalisierte Tabellen zu trennen, die jeweils mit einer anderen Art von Daten, die getrennte Datensätze in ERDDAP .

Eine denormalisierte Tabelle für den Einsatz in ERDDAP™ klingt wie eine verrückte Idee. Bitte vertrauen Sie uns. Es gibt mehrere Gründe, warum ERDDAP™ Arbeiten mit denormalisierten Tabellen:

* Es ist für Benutzer enorm einfacher.
Wann ERDDAP™ präsentiert den Datensatz als eine, einfache, denormalisierte, einzelne Tabelle, es ist sehr einfach für jeden, die Daten zu verstehen. Die meisten Benutzer haben nie von normalisierten Tabellen gehört, und sehr wenige verstehen Schlüssel, fremde Schlüssel, oder Tisch schließt, und sie fast sicher nicht wissen, die Details der verschiedenen Arten von Joins, oder wie man den SQL angeben, um einen Join zu tun (oder mehrere Verbindungen) richtig. Die Verwendung einer denormalisierten Tabelle vermeidet all diese Probleme. Allein aus diesem Grund wird die Verwendung einer denormalisierten Einzeltabelle zur Darstellung eines Datensatzes gerechtfertigt, ERDDAP™ Benutzer.
     
* Normalisierte Tabellen (mehrere Tabellen, die durch Schlüsselspalten verwandt sind) groß sind, um Daten in einer Datenbank zu speichern.
Aber auch in SQL ist das Ergebnis, das an den Benutzer zurückgegeben wird, ein denormalisiert (mit) Einzeltisch. So scheint es sinnvoll, den Datensatz den Benutzern als eine riesige, denormalisierte, einzelne Tabelle, aus der sie dann Subsets anfordern können (z.B., zeigen Sie mir Zeilen der Tabelle, wo Temperatur &gt; 30) .
     
* Sie können Änderungen vornehmen ERDDAP™ ohne Ihre Tische zu ändern.
     ERDDAP™ hat ein paar Anforderungen, die sich von der Einrichtung Ihrer Datenbank unterscheiden können.
Zum Beispiel ERDDAP™ erfordert, dass Zeitstempeldaten in "Zeitstempel mit Zeitzone"-Feldern gespeichert werden.
Durch eine separate Tabelle/Ansicht für ERDDAP™ , Sie können diese Änderungen vornehmen, wenn Sie die denormalisierte Tabelle für ERDDAP . So müssen Sie keine Änderungen an Ihren Tabellen vornehmen.
     
*    ERDDAP™ wird einige der Struktur der normalisierten Tabellen neu erstellen.
Sie können angeben, welche Datenspalten aus den Tabellen 'outer' stammen und daher eine begrenzte Anzahl von eindeutigen Werten aufweisen. ERDDAP™ wird alle verschiedenen Kombinationen von Werten in diesen Spalten sammeln und den Benutzern auf einem speziellen . subset web-Seite, die Benutzer hilft schnell wählen Untergruppen des Datensatzes. Die einzelnen Werte für jede Spalte werden auch in Dropdown-Listen auf den anderen Webseiten des Datensatzes angezeigt.
     
* Eine denormalisierte Tabelle macht die Daten von Ihnen auf die ERDDAP Administrator einfach.
Sie sind der Experte für diesen Datensatz, so ist es sinnvoll, dass Sie die Entscheidungen treffen, über welche Tabellen und welche Spalten Sie beitreten und wie Sie sie beitreten können. Du musst uns also nicht übergeben. (oder schlechter, die Endbenutzer) mehrere Tabellen und ausführliche Anweisungen, wie man ihnen beitritt, müssen Sie uns nur Zugang zu der denormalisierten Tabelle geben.
     
* Eine denormalisierte Tabelle ermöglicht einen effizienten Zugriff auf die Daten.
Die denormalisierte Form ist in der Regel schneller Zugang als die normalisierte Form. Teilnehmer können langsam sein. Mehrere Verbindungen können sehr langsam sein.
     

Um die Daten aus zwei oder mehr Tabellen in der Datenbank in ERDDAP™ , es gibt drei Optionen:
 

* Empfohlene Option:
Sie können eine Komma- oder Tab-Separated-Wert-Datei mit den Daten aus der denormalisierten Tabelle erstellen.
Wenn der Datensatz riesig ist, dann ist es sinnvoll, mehrere Dateien zu erstellen, jede mit einer zusammenhängenden Teilmenge der denormalisierten Tabelle (beispielsweise Daten aus einem kleineren Zeitbereich) .
    
Der große Vorteil hier ist, dass ERDDAP™ wird in der Lage sein, Benutzeranfragen für Daten ohne weiteren Aufwand durch Ihre Datenbank zu bearbeiten. So. ERDDAP™ wird keine Belastung für Ihre Datenbank oder ein Sicherheitsrisiko sein. Dies ist die beste Option unter fast allen Umständen, weil ERDDAP™ kann in der Regel Daten von Dateien schneller als von einer Datenbank erhalten (wenn wir die .csv-Dateien in .nc CF-Dateien) . (Teil des Grunds ist, dass ERDDAP +files ist ein schreibgeschütztes System und muss sich nicht mit Änderungen beschäftigen, während die Bereitstellung [INSGESAMT](https://en.wikipedia.org/wiki/ACID)   (Atomkraft, Konsistenz, Isolation, Haltbarkeit) .) Außerdem brauchen Sie wahrscheinlich keinen separaten Server, da wir die Daten auf einer unserer RAIDs speichern und mit einem vorhandenen Zugriff darauf zugreifen können. ERDDAP™ auf einem vorhandenen Server.
    
* Okay Option:
Sie haben eine neue Datenbank auf einem anderen Computer mit nur der denormalisierten Tabelle eingerichtet.
Da diese Datenbank eine kostenlose und offene Quelldatenbank wie MariaDB, MySQL und PostgreSQL sein kann, muss diese Option nicht viel kosten.
    
Der große Vorteil hier ist, dass ERDDAP™ wird in der Lage sein, Benutzeranfragen für Daten ohne weiteren Aufwand durch Ihre aktuelle Datenbank zu bearbeiten. So. ERDDAP™ wird keine Belastung für Ihre aktuelle Datenbank sein. Dies eliminiert auch viele Sicherheitsbedenken, da ERDDAP™ hat keinen Zugriff auf Ihre aktuelle Datenbank.
    
* Offene Option:
Wir können verbinden ERDDAP™ in Ihre aktuelle Datenbank.
Dazu müssen Sie:
    
    * Erstellen Sie eine separate Tabelle oder Ansicht mit der denormalisierten Datentabelle.
    * Erstellen Sie einen "erddap" Benutzer, der nur auf die denormalisierte Tabelle zugreifen kann (S) .
         
    
Dies ist eine Option, wenn sich die Daten sehr häufig ändern und Sie geben möchten ERDDAP™ Benutzer sofortigen Zugriff auf diese Änderungen; aber auch so kann es sinnvoll sein, die Dateioption oben und periodisch zu verwenden (alle 30 Minuten?) ersetzen Sie die Datei, die die heutigen Daten hat.
Die großen Nachteile dieses Ansatzes sind: ERDDAP™ Benutzeranfragen werden wahrscheinlich eine unerträglich große Belastung für Ihre Datenbank und ERDDAP™ Verbindung ist ein Sicherheitsrisiko (obwohl wir das Risiko minimieren / verwalten können) .

Den denormalisierten Tisch oder die Ansicht für ERDDAP™ ist eine gute Gelegenheit, einige Änderungen zu machen, die ERDDAP™ Bedürfnisse, in einer Weise, die Ihre ursprünglichen Tabellen nicht beeinflusst:

* Ändern Sie Datums- und Zeitstempelfelder/Spalten, um die Daten zu verwendenType, dass Postgres Anrufe [Zeitstempel mit Zeitzone](#database-date-time-data)   (oder das Äquivalent in Ihrer Datenbank) .
Timestamps ohne Zeitzoneninformationen funktionieren nicht korrekt in ERDDAP .
* Erstellen Sie Indexe für die Spalten, die Benutzer oft suchen.
* Seien Sie sehr bewusst [der Fall der Feld-/Spaltennamen](#quotes-for-names-and-case-sensitivity)   (zum Beispiel, verwenden Sie alle Kleinbuchstaben) wenn du sie eingibst.
* Verwenden Sie keine reservierten Wörter für die Tabelle und für die Feld-/Säulennamen.

Wenn Sie Hilfe benötigen, um die denormalisierte Tabelle oder Ansicht zu machen, wenden Sie sich bitte an Ihren Datenbankadministrator.
Wenn Sie über diesen ganzen Ansatz sprechen möchten oder überlegen möchten, wie es am besten zu tun ist, mailen Sie Chris. John bei noaa.gov.
    
#### Datenbank datasets.xml  {#database-in-datasetsxml} 
Es ist schwierig, das richtige zu schaffen datasets.xml Informationen, die für ERDDAP™ eine Verbindung zur Datenbank herzustellen. Sei geduldig. Sei methodisch.
* Wir empfehlen dringend die Verwendung der [Datensätze generieren Xml Programm](#generatedatasetsxml) einen groben Entwurf der datasets.xml für diesen Datensatz. Das können Sie dann bearbeiten, um es zu verfeinern.
        
Datensätze generieren Xml hat drei spezielle Optionen für EDDTableFromDatabase:
1. Wenn Sie "&#33;&#33;&#33;LIST&#33;&#33;&#33;" eingeben (ohne die Zitate) für den Katalognamen wird das Programm eine Liste der Katalognamen anzeigen.
2. Wenn Sie "&#33;&#33;&#33;LIST&#33;&#33;&#33;" eingeben (ohne die Zitate) für den Schemanamen wird das Programm eine Liste der Schemanamen anzeigen.
3. Wenn Sie "&#33;&#33;&#33;LIST&#33;&#33;&#33;" eingeben (ohne die Zitate) für den Tabellennamen wird das Programm eine Liste von Tabellen und deren Spalten anzeigen. Der erste Eintrag "&#33;&#33;&#33;LIST&#33;&#33;&#33;" ist derjenige, der verwendet wird.
* Lesen Sie sorgfältig alle Informationen dieses Dokuments über EDDTableFromDatabase.
* Sie können die meisten Informationen sammeln, die Sie benötigen, um das XML für einen EDDTableFromDatabase-Datensatz zu erstellen, indem Sie den Datenbankadministrator kontaktieren und das Internet durchsuchen.
* Obwohl Datenbanken häufig Spaltennamen und Tabellennamen auf fallunempfindliche Weise behandeln, sind sie in ERDDAP . Wenn eine Fehlermeldung aus der Datenbank sagt, dass ein Spaltenname unbekannt ist (z.B. "Unbekannte Kennung= ' *Spalte\\_Name* ") auch wenn Sie wissen, dass es existiert, versuchen Sie, alle Kapitale, zum Beispiel, *COLUMN* , die oft die wahre, case-sensitive Version des Spaltennamens ist.
* Arbeiten Sie eng mit dem Datenbankadministrator zusammen, der möglicherweise über relevante Erfahrungen verfügt. Wenn der Datensatz nicht geladen wird, lesen Sie die [Fehlermeldung](#troubleshooting-tips) sorgfältig, um herauszufinden, warum.
         
#### JDBC Treiber{#jdbc-driver} 
* [JDBC Treiber und&lt;FahrerName&gt; (#jdbc-Treiber) -- Sie müssen die entsprechende JDBC 3 oder JDBC 4 Treiber .jar-Datei für Ihre Datenbank erhalten und
in den Warenkorb *Tomcat* /webapps/erdap/WEB-INF/lib nach der Installation ERDDAP . Dann in deinem datasets.xml für diesen Datensatz müssen Sie die&lt;driverName&gt; für diesen Treiber, der (leider) anders als der Dateiname. Suche im Web für den JDBC-Treiber für Ihre Datenbank und den TreiberNamen, dass Java muss es benutzen.
    
    * Für MariaDB versuchen [https://mariadb.com/kb/en/about-the-mariadb-java-client/](https://mariadb.com/kb/en/about-the-mariadb-java-client/)   
Die&lt;TreiberName&gt; zur Verwendung in datasets.xml   (siehe unten) ist wahrscheinlich org.mariadb.jdbc. Fahrer .
    * Für MySQL und Amazon RDS versuchen [https://dev.mysql.com/downloads/connector/j/](https://dev.mysql.com/downloads/connector/j/)   
Die&lt;TreiberName&gt; zur Verwendung in datasets.xml   (siehe unten) ist wahrscheinlich com.mysql.jdbc. Fahrer .
    * Für Oracle , versuchen [https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html) .
Die&lt;TreiberName&gt; zur Verwendung in datasets.xml   (siehe unten) ist wahrscheinlich oracle.jdbc.driver. Oracle Fahrer .
    * Für Postgresql haben wir den JDBC 4 Treiber von [https://mvnrepository.com/artifact/org.postgresql/postgresql](https://mvnrepository.com/artifact/org.postgresql/postgresql)   
Die&lt;TreiberName&gt; zur Verwendung in datasets.xml   (siehe unten) ist wahrscheinlich org.postgresql. Fahrer .
    * Für SQL Server können Sie den JTDS JDBC Treiber von [https://jtds.sourceforge.net](https://jtds.sourceforge.net) .
Die&lt;TreiberName&gt; zur Verwendung in datasets.xml   (siehe unten) ist wahrscheinlich net.sourceforge.jtds.jdbc. Fahrer .
    
Nachdem Sie den JDBC Treiber .jar in ERDDAP™ lib-Verzeichnis, müssen Sie einen Verweis auf die .jar-Datei in den .bat und/oder .sh-Scriptdateien für GenerateDatasets hinzufügen Xml, DasDds und ArchiveADataset, die im *Tomcat* /webapps/erddap/WEB-INF/ Verzeichnis; andernfalls erhalten Sie eine ClassNotFoundException, wenn Sie diese Skripte ausführen.
    
Leider ist JDBC manchmal die Quelle der Probleme. In seiner Rolle als zwischengeschaltet ERDDAP™ und die Datenbank, es manchmal macht subtile Änderungen an der Standard/generischen Datenbank SQL-Anforderung, dass ERDDAP™ schafft und dadurch Probleme verursacht (zum Beispiel, bezogen auf [obere/niedrige Kennungen](#quotes-for-names-and-case-sensitivity) und im Zusammenhang mit [Datum/Zeitzone](#database-date-time-data) ) . Bitte geduldig sein, die Informationen hier sorgfältig lesen, Ihre Arbeit überprüfen und unsere [Abschnitt zum Erhalt zusätzlicher Unterstützung](/docs/intro#support) .
    
#### Datenbank&lt;Verbindung Eigentum &gt;{#database-connectionproperty} 
* (&lt;AnschlussProperty&gt; (#database-connectionproperty) -- In der datasets.xml für Ihren Datensatz müssen Sie mehrere Verbindung definieren Objekt-Tags zu sagen ERDDAP™ wie Sie mit Ihrer Datenbank verbinden (zum Beispiel, um den Benutzernamen, das Passwort, die ssl-Verbindung anzugeben, und [Fanggröße](#set-the-fetch-size) ) . Diese sind für jede Situation anders und sind etwas schwer zu finden. Suchen Sie im Web Beispiele für die Verwendung eines JDBC-Treibers, um mit Ihrer Datenbank zu verbinden. Die&lt;VerbindungProperty&gt; Namen (zum Beispiel "Benutzer", "Passwort", und "ssl") , und ein Teil der Verbindung Werte erhalten Sie, indem Sie das Web nach "JDBC-Verbindungseigenschaften suchen *Datenbank Typ* " (zum Beispiel, Oracle , MySQL, Amazon RDS, MariaDB, PostgreSQL) .
     
#### Zitate für Namen und Case Sensitivity{#quotes-for-names-and-case-sensitivity} 
*    [Zitate für Field/Column Names; Case Sensitivity](#quotes-for-names-and-case-sensitivity) - Standardmäßig legt EDDTableFromDatabase ANSI-SQL-Standard-Doppel-Zitate um Feld-/Spaltennamen in SELECT-Anweisungen, falls Sie ein reserviertes Wort als Feld/Spalte-Name verwendet haben, oder ein besonderes Zeichen in einem Feld/Spalte-Namen. Die doppelten Zitate vereiteln auch bestimmte Arten von SQL-Injektionsangriffen. Du kannst es sagen. ERDDAP™ ", ', oder keine Zitate über&lt;SpalteNameQuotes&gt; in datasets.xml für diesen Datensatz.
    
Für viele Datenbanken führt die Verwendung beliebiger Zitate dazu, dass die Datenbank mit Feld-/Spaltennamen in einem Fall empfindlich arbeitet (anstatt des Standard-Datenbank-Falls unempfindlich) . Datenbanken zeigen oft Datei-/Spaltennamen als alle Großbuchstaben, wenn in der Realität das Fall sensible Form ist anders. In ERDDAP™ , bitte behandeln Sie immer Datenbankspalten Namen als Case sensitive.
    
    * Für Maria DB, Sie müssen die Datenbank mit [\\--sql-Modus=ANSI\\_QUOTES](https://mariadb.com/kb/en/mysql-command-line-client/) .
    * Für MySQL und Amazon RDS müssen Sie die Datenbank mit [\\--sql-Modus=ANSI\\_QUOTES](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_ansi_quotes) .
    *    Oracle unterstützt ANSI-SQL-Standard doppelte Zitate [Standardmäßig](https://docs.oracle.com/database/121/SQLRF/sql_elements008.htm#SQLRF00223) .
    * PostgreSQL unterstützt standardmäßig ANSI-SQL-Standard-Doppelquoten.
    
      
Verwenden Sie kein reserviertes Wort für den Namen einer Datenbank, eines Katalogs, eines Schemas oder einer Tabelle. ERDDAP™ keine Zitate um sie herum.
    
Wenn möglich, verwenden Sie alle Kleinbuchstaben für Datenbank, Katalog, Schema, Tabellennamen und Feldnamen bei der Erstellung der Datenbanktabelle (oder Ansicht) und wenn es um die Feld-/Spaltennamen in datasets.xml in ERDDAP . Ansonsten können Sie eine Fehlermeldung erhalten, dass die Datenbank, Katalog, Schema, Tabelle und/oder Feld nicht gefunden wurde. Wenn Sie diese Fehlermeldung erhalten, versuchen Sie mit der case-sensitiven Version, der gesamten Großbuchstabenversion und der gesamten Kleinbuchstabenversion des Namens in ERDDAP . Einer von ihnen kann arbeiten. Falls nicht, müssen Sie den Namen der Datenbank, Katalog, Schema und/oder Tabelle in alle Kleinbuchstaben ändern.
    
#### Datenbank&lt;Daten Art und Weise{#database-datatype} 
*    [Datenbank](#database-datatype) (&lt;DatenTyp&gt;] (#datatype) Tags -- Denn es gibt etwas Mehrdeutigkeit darüber [Datenbank-Datentypen](https://www.w3schools.com/sql/sql_datatypes_general.asp) Karte, die ERDDAP™ Datentypen, Sie müssen eine [&lt;DatenTyp&gt;] (#datatype) Tag für jeden [&lt; dataVariable &gt; (#datavariable) zu sagen ERDDAP™ welche DatenTyp zu verwenden. Ein Teil des Problems ist, dass verschiedene Datensätze unterschiedliche Begriffe für die verschiedenen Datentypen verwenden -- also versuchen Sie immer, die Definitionen zu entsprechen, nicht nur die Namen. Siehe die Beschreibung der [Standard ERDDAP™ Daten Arten](#data-types) , die Hinweise auf die entsprechenden SQL-Datentypen enthält. [Datum und Uhrzeit](#database-date-time-data) sind spezielle Fälle: ERDDAP Doppeldaten Typ.
     
#### Datenbank Datum Zeitdaten{#database-date-time-data} 
Einige Datenbankterminzeitspalten haben keine explizite Zeitzone. Solche Spalten sind Schwierigkeiten für ERDDAP . Datenbanken unterstützen das Konzept eines Datums (mit oder ohne Zeit) ohne Zeitzone, als ungefährer Zeitbereich. Aber... Java   (und damit ERDDAP ) beschäftigt sich nur mit aktuellen Datums-Zeiten mit einer Zeitzone. So können Sie wissen, dass die Datumsdaten auf einer lokalen Zeitzone basieren (mit oder ohne Sommerzeit) oder das GMT/ Zulu Zeitzone, aber Java   (und ERDDAP ) Nicht. Wir dachten, wir könnten dieses Problem lösen. (z.B. durch Angabe einer Zeitzone für die Spalte) , aber die Datenbank+JDBC+ Java Interaktionen machten das zu einer unzuverlässigen Lösung.
* Also, ERDDAP™ erfordert, dass Sie alle Datums- und Datumszeitdaten in der Datenbanktabelle mit einem Datenbankdatentyp speichern, der dem JDBC-Typ "Zeitstempel mit Zeitzone" entspricht (ideal, die den GMT/ Zulu Zeitzone) .
* In ERDDAP ' datasets.xml in der&lt; dataVariable &gt; tag für eine Zeitstempelvariable, Set
    >     [&lt;dataType>double&lt;/dataType>](#datatype)  

und in&lt; addAttributes &gt; eingestellt
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Vorschlag: Wenn die Daten ein Zeitbereich sind, ist es sinnvoll, die Zeitstempelwerte auf die Mitte des implizierten Zeitbereichs bezogen zu haben. (zum Beispiel, Mittag) . Wenn zum Beispiel ein Benutzer Daten für 2010-03-26T13:00Z von einem anderen Datensatz hat und die nächsten Daten von einem Datenbankdatensatz, der Daten für jeden Tag hat, dann die Datenbankdaten für 2010-03-26T12:00Z (Daten zu diesem Zeitpunkt) ist offensichtlich das Beste (im Gegensatz zur Mitternacht vor oder nach, wo es weniger offensichtlich ist, was am besten ist) .
*    ERDDAP™ hat ein Dienstprogramm [Numerisch umrechnen Zeit für/von einer Streichzeit](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) .
* Vgl. [Wie ERDDAP Angebote mit Zeit](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) .
       
#### Integer null{#integer-nulls-1} 
Datenbanken unterstützen Nullen in ganzzahliger (Int, klein, winzig) Spalten, aber ERDDAP™ unterstützt keine wahren Nullen.
Datenbank-Nulls werden in ERDDAP™ 127 für Byte-Säulen, 255 für Ubyte-Säulen, 32767 für kurze Spalten, 65535 für ushort-Säulen, 2147483647 für Int-Säulen, 4294967295 für uint-Säulen, 9,223,372,036,854,775.807 für lange Spalten, oder 18446744073709551615 für ulong-Säulen. Wenn Sie diese Standardeinstellungen verwenden, identifizieren Sie diese missing\\_value s für die Benutzer des Datensatzes in ERDDAP™ mit

>    &lt;att name="\\_FillValue" [type="int"](#attributetype)\\>2147483647&lt;/att>  

oder

>    &lt;att name="\\_FillValue" [type="short"](#attributetype)\\>32767&lt;/att>  

Alternativ können Sie das " missing\\_value "Attribut statt "\\_FillValue".
Datensätze generieren Xml fügt automatisch diese \\_FillValue-Attribute hinzu, wenn es die vorgeschlagenen generiert datasets.xml für Datenbankdatensätze.

Für Datenbank-Schwebungspunktspalten werden Nullen in NaNs umgewandelt ERDDAP .
Für Datenbank-Datentypen, die in Strings umgewandelt werden ERDDAP™ , nulls werden in leere Strings umgewandelt.
    
#### Datenbank Sicherheit{#database-security} 
* Wenn Sie mit Datenbanken arbeiten, müssen Sie die Dinge so sicher und sicher wie möglich tun, um zu vermeiden, dass ein schädlicher Benutzer Ihre Datenbank beschädigen oder Zugriff auf Daten gewinnen, auf die sie nicht zugreifen sollten. ERDDAP™ versucht, die Dinge auch sicher zu machen.
    * In Anbetracht der Replikation, auf einem anderen Computer, die Datenbank und Datenbanktabellen mit den Daten, die Sie wollen ERDDAP™ zu dienen. (Ja, für kommerzielle Datenbanken wie Oracle , dies beinhaltet zusätzliche Lizenzgebühren. Aber für Open Source-Datenbanken wie PostgreSQL, MySQL, Amazon RDS und MariaDB kostet dies nichts.) Dies gibt Ihnen ein hohes Maß an Sicherheit und verhindert auch ERDDAP™ Anfragen von der Verlangsamung der ursprünglichen Datenbank.
    * Wir ermutigen Sie zur Einrichtung ERDDAP™ eine Verbindung zur Datenbank als Datenbankbenutzer, der nur Zugriff auf die **relevant** Datenbank (S) und hat nur READ Privilegien.
    * Wir ermutigen Sie, die Verbindung von ERDDAP™ in die Datenbank, so dass es
        * immer verwendet SSL,
        * nur Verbindungen von einer IP-Adresse (oder einen Adressblock) und von der einen ERDDAP™ Benutzer und
        * nur Passwörter in ihrem MD5 Hashed-Form.
    *    \\[ VERFAHREN \\] Die Verbindung Vorteile (einschließlich des Passworts&#33;) als Klartext gespeichert werden datasets.xml . Wir haben keinen Weg gefunden, damit der Administrator das Datenbank-Passwort eingeben kann. ERDDAP Start in Tomcat (die ohne Benutzereingabe erfolgt) , so muss das Passwort in einer Datei zugänglich sein. Um dies sicherer zu machen:
        * Du (die ERDDAP™ Administrator) sollte der Eigentümer sein datasets.xml und haben READ und WRITE Zugriff.
        * Machen Sie eine Gruppe, die nur user=tomcat enthält. Verwenden Sie chgrp, um die Gruppe für datasets.xml , mit nur READ Privilegien.
        * Verwenden Sie chmod, um o-rwx Privilegien zuzuordnen (kein READ- oder WRITE-Zugang für "andere" Benutzer) für datasets.xml .
    * Wann ERDDAP™ , das Passwort und andere Verbindungseigenschaften werden in "private" gespeichert Java Variablen.
    * Anfragen von Clients werden vor der Generierung der SQL-Anfragen für die Datenbank auf Gültigkeit geprüft.
    * Anfragen an die Datenbank werden mit SQL-Vorbereitungen gestellt, um zu verhindern [SQL-Injektion](https://en.wikipedia.org/wiki/SQL_injection) .
    * Anfragen an die Datenbank werden mit Ausführung eingereicht Abfrage (nicht ausgeführtStatement) um nur zu lesende Anfragen zu begrenzen (so versuchte SQL-Injektion, um die Datenbank zu ändern, aus diesem Grund auch) .
         
#### SQL{#sql} 
* Weil OPeNDAP 's tabellarische Datenanfragen wurden entworfen, um SQL tabular Datenanfragen zu mimieren, es ist einfach für ERDDAP™ um tabellarische Datenanforderungen in einfache SQL-vorbereiteteStatements zu konvertieren. Zum Beispiel die ERDDAP™ Anfrage senden
```
    time,temperature&time>=2008-01-01T00:00:00Z&time&lt;=2008-02-01T00:00:00Z  
```
wird in die SQL-Vorbereitung umgewandelt
```
    SELECT "time", "temperature" FROM *tableName*  
    WHERE "time" >= 2008-01-01T00:00:00Z AND "time" &lt;= 2008-02-01T00:00:00Z  
```
 ERDDAP™ Anfragen an &distinct () und/oder orderBy  ( *Variablen* ) DISTINCT und/oder ORDER BY hinzufügen *Variablen* auf die SQL vorbereitete Aussage. In der Regel wird dies die Antwort aus der Datenbank stark verlangsamen.
 ERDDAP™ protokolliert die Vorbereitete [Pressemitteilung](/docs/server-admin/additional-information#log) wie
```
    statement=*thePreparedStatement*  
```
Dies wird eine Textdarstellung des Vorbereitenden Staates sein, die sich von der eigentlichen Vorbereitung unterscheiden kann. Beispielsweise werden in der Vorbereitung Zeiten in besonderer Weise kodiert. Aber in der Textdarstellung erscheinen sie als ISO 8601 Datumszeiten.
     
#### Datenbankgeschwindigkeit{#database-speed} 
* Datenbanken können langsam sein. Es gibt einige Dinge, die Sie tun können:
    * Im Allgemeinen -
Die Natur von SQL ist, dass Abfragen sind [declaration](https://en.wikipedia.org/wiki/Declarative_programming) . Sie geben nur an, was der Benutzer will. Sie enthalten keine Spezifikation oder Hinweise, wie die Abfrage bearbeitet oder optimiert werden soll. So gibt es keinen Weg ERDDAP™ die Abfrage so zu generieren, dass sie der Datenbank hilft, die Abfrage zu optimieren (oder in irgendeiner Weise spezifiziert, wie die Abfrage bearbeitet werden soll) . Im Allgemeinen liegt es an dem Datenbankadministrator, Dinge einzurichten (z.B. Indizes) für bestimmte Arten von Abfragen zu optimieren.
##### Legen Sie die Federgröße{#set-the-fetch-size} 
Datenbanken geben die Daten an ERDDAP™ in Stücken. Standardmäßig geben verschiedene Datenbanken eine andere Anzahl von Zeilen in den Stücken zurück. Oft ist diese Zahl sehr klein und so sehr ineffizient. Zum Beispiel der Standard für Oracle 10&#33; Lesen Sie die JDBC-Dokumentation für den JDBC-Treiber Ihrer Datenbank, um die eingestellte Verbindungseigenschaft zu finden, um dies zu erhöhen, und fügen Sie diese der Beschreibung des Datensatzes in datasets.xml . Zum Beispiel
Für MySQL und Amazon RDS verwenden
```
        <connectionProperty name="defaultFetchSize">10000</connectionProperty>  
```
Für MariaDB gibt es derzeit keine Möglichkeit, die Fetchgröße zu ändern. Aber es ist eine angeforderte Funktion, so suchen Sie das Web, um zu sehen, ob dies umgesetzt wurde.
Für Oracle , Verwendung
```
        <connectionProperty name="defaultRowPrefetch">10000</connectionProperty>  
```
Für PostgreSQL verwenden
```
        <connectionProperty name="defaultRowFetchSize">10000</connectionProperty>  
```
aber fühlen Sie sich frei, die Zahl zu ändern. Setzen der Zahl zu groß wird verursachen ERDDAP™ viel Speicher zu verwenden und wahrscheinlicher aus dem Speicher laufen.
#### Verbindungsvorteile{#connectionproperties} 
Jede Datenbank verfügt über andere Verbindungseigenschaften, die in datasets.xml . Viele von ihnen werden die Leistung der Datenbank beeinflussen ERDDAP™ Verbindung. Bitte lesen Sie die Dokumentation für den JDBC Treiber Ihrer Datenbank, um die Optionen zu sehen. Wenn Sie Verbindungseigenschaften finden, die nützlich sind, senden Sie bitte eine E-Mail mit den Details an erd dot data at noaa dot gov .
* Tisch machen --
Sie werden wahrscheinlich schneller reagieren, wenn Sie periodisch (täglich? Wann gibt es neue Daten?) eine aktuelle Tabelle erstellen (wie Sie die VIEW generiert haben) und sagen ERDDAP™ um Daten von der Tabelle anstelle der VIEW zu erhalten. Da jede Anforderung an die Tabelle dann erfüllt werden kann, ohne eine andere Tabelle zu JOINing, wird die Antwort viel schneller sein.
* Vakuum der Tabelle -
MySQL und Amazon RDS werden viel schneller reagieren, wenn Sie [TABELLE OPTIMISCHUNG](https://dev.mysql.com/doc/refman/5.7/en/optimize-table.html) .
Maria DB wird viel schneller reagieren, wenn Sie [TABELLE OPTIMISCHUNG](https://mariadb.com/kb/en/optimize-table/) .
PostgreSQL wird viel schneller reagieren, wenn Sie [VACUUM](https://www.postgresql.org/docs/8.3/static/sql-vacuum.html) die Tabelle.
     Oracle hat oder braucht keinen analogen Befehl.
* Make-up [Index](https://en.wikipedia.org/wiki/Database_index) für gebräuchliche Variablen --
Sie können viele / die meisten Abfragen beschleunigen, indem Sie Indexe in der Datenbank für die Variablen erstellen (welche Datenbanken "Spalten" nennen) die oft in der Abfrage des Benutzers eingeschränkt sind. Im allgemeinen sind dies die gleichen Variablen, die von [&lt; subsetVariables &gt; (#subsetvariables) und/oder die Breite, Länge und Zeitvariablen.
##### Verwenden Sie die Verbindung Pooling{#use-connection-pooling} 
Normalerweise, ERDDAP™ eine separate Verbindung zur Datenbank für jede Anfrage. Dies ist der zuverlässigste Ansatz. Die schnellere Alternative besteht darin, eine DataSource zu verwenden, die die Verbindung Pooling unterstützt. Um es einzurichten, geben Sie an (beispielsweise)   
```
        <dataSourceName>java:comp/env/jdbc/postgres/erddap</dataSourceName>  
```
Direkt nebenan&lt; sourceUrl &gt;&lt;TreiberName&gt;, und&lt;Verbindung Eigentum.
Und in *Tomcat* /conf/context.xml, definieren Sie eine Ressource mit den gleichen Informationen, zum Beispiel
```
        <Resource  
        name="jdbc/postgres/erddap" auth="Container" type="javax.sql.DataSource"  
        driverClassName="org.postgresql.Driver"  
        url="*jdbc:postgresql://somehost:5432/myDatabaseName*"  
        username="*myUsername*" password="*myPassword*"  
        initialSize="0" maxActive="8" minIdle="0" maxIdle="0" maxWait="-1"/>  
```
Allgemeine Informationen über die Nutzung einer DataSource finden Sie unter [https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html) .
Vgl. [Tomcat DataSource Informationen](https://tomcat.apache.org/tomcat-7.0-doc/jndi-resources-howto.html#JDBC_Data_Sources) und [Tomcat DataSource Beispiele](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html) oder das Web nach Beispielen der Verwendung von DataSources mit anderen Anwendungsservern suchen.
* Wenn alles versagt,
die Speicherung der Daten in einer Sammlung NetCDF V3 .nc Dateien (insbesondere .nc Dateien, die die [CF Diskrete Sampling Geometrien (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Ragged Array Datenstrukturen und so mit ERDDAP ' [EDDTableFromNcCFFiles](#eddtablefromnccffiles) ) . Wenn sie logisch organisiert sind (jeder mit Daten für ein Stück Raum und Zeit) , ERDDAP™ kann Daten sehr schnell aus ihnen extrahieren.
         
#### EDDTableFromDatenbank Skelett XML{#eddtablefromdatabase-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDatabase" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The format varies for each type of database, but will be  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;something like:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MariaDB:    jdbc:mariadb://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MySql       jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Amazon RDS: jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Oracle:     jdbc:oracle:thin:@*xxx.xxx.xxx.xxx*:1521:*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Postgresql: jdbc:postgresql://*xxx.xxx.xxx.xxx*:5432/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where *xxx.xxx.xxx.xxx* is the host computer's numeric IP address  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;followed by :*PortNumber* (4 digits), which may be different for your  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;database.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[driverName](#jdbc-driver)\\>...&lt;/driverName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The high-level name of the database driver, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"org.postgresql.Driver".  You need to put the actual database  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;driver .jar file (for example, postgresql.jdbc.jar) in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*tomcat*/webapps/erddap/WEB-INF/lib.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#database-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "user", "password", and "ssl")  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and values of the properties needed for ERDDAP™ to establish  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the connection to the database.  0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataSourceName>](#use-connection-pooling)...&lt;/dataSourceName>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;catalogName>...&lt;/catalogName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the catalog which has the schema which has the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  OPTIONAL.  Some databases don't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;schemaName>...&lt;/schemaName> &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schema which has the table, default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName>  &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#quotes-for-names-and-case-sensitivity)&lt;columnNameQuotes> &lt;!-- OPTIONAL. Options:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" (the default), ', \\[nothing\\]. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderBy>...&lt;/orderBy>  &lt;!-- A comma-separated list of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[sourceName](#sourcename)s to be used in an ORDER BY clause at the end of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;every query sent to the database (unless the user's request  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;includes an &orderBy() filter, in which case the user's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;orderBy is used).  The order of the sourceNames is important.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The leftmost (first) sourceName is most important; subsequent  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are only used to break ties.  Only relevant  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are included in the ORDER BY clause for a given user  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;request.  If this is not specified, the order of the returned  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;values is not specified. Default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanOrderBy>](#sourcecanorderby)no(default)|partial|yes&lt;/sourceCanOrderBy>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanDoDistinct>](#sourcecandodistinct)no(default)|partial|yes&lt;/sourceCanDoDistinct>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each dataVariable MUST include a [&lt;dataType>](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See [Database DataTypes](#database-datatype).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For [database date and timestamp columns](#database-date-time-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFrom EDDGrid  {#eddtablefromeddgrid} 
 [ **EDDTableFrom EDDGrid ** ](#eddtablefromeddgrid) lässt Sie einen EDDTable-Datensatz von jedem erstellen EDDGrid Datensatz.

* Einige häufige Gründe dafür sind:
    * Damit kann der Datensatz mit OPeNDAP Auswahlzwänge, die eine Art von "Quicky by Value" sind (die ein Benutzer angefordert haben kann) .
    * Der Datensatz ist inhärent ein tabellarischer Datensatz.
* Der Wert des globalen Attributs "maxAxis0" (in der Regel von Typ="int") , (der Standard ist 10) wird verwendet, um die Anzahl der Achsen zu begrenzen \\[ 0) \\]   (in der Regel "time" Achse) Werte der eingeschlossenen EDDGrid Datensatz, auf den pro Datenanforderung zugegriffen werden kann. Wenn Sie nicht wollen, dass es eine Grenze gibt, geben Sie einen Wert von 0 an. Diese Einstellung ist wichtig, denn sonst wäre es für einen Benutzer zu einfach, EDDTableFrom zu fragen EDDGrid alle Daten des netzgebundenen Datensatzes durchschauen. Das würde lange dauern und mit einem Timeout-Fehler fast sicher scheitern. Dies ist die Einstellung, die es sicher macht, EDDTableFrom haben EDDGrid Datensätze in Ihrem ERDDAP ohne Angst, dass sie zu einer unangemessenen Nutzung von Rechenressourcen führen.
* wenn der eingeschlossene EDDGrid ein [ EDDGrid Von Erddap](#eddfromerddap) und ERDDAP™ gleich ERDDAP , dann EDDTableFrom EDDGrid wird immer die aktuell verfügbare Version des referenzierten Datensatzes direkt verwenden. Dies ist ein sehr effizienter Weg für EDDTableFrom EDDGrid Zugriff auf die gegitterten Daten.
* Diese Klasse ist [&lt;Nachladen AllNMinutes&gt;] (#reloadeverynminutes) zählt. Die eingeschlossenen EDDGrid '&lt;reloadEveryNMinutes&gt; wird ignoriert.
* Wenn ein Wert für [&lt;UpdateEveryNMillis&gt;] (#updateeverynmillis) wird für diesen Datensatz geliefert, wird ignoriert. Die eingeschlossenen EDDGrid '&lt;updateEveryNMillis&gt; ist, was zählt.
*    [GenerateDatasetsXml](#generatedatasetsxml) hat eine Option für dataset type=EDDTableFrom EDDGrid die nach der URL eines ERDDAP   (in der Regel gleich ERDDAP )   (Ende in "/erddap/") und einen regelmäßigen Ausdruck. Datensätze generieren Xml generiert dann das XML für ein EDDTableFrom EDDGrid Datensatz für jeden netzgebundenen Datensatz im ERDDAP™ die datasetID die dem regulären Ausdruck entspricht (verwenden .\\* für alle datasetID s für Rasterdatensätze) .
    
Das von GenerateDatasetsXml für jeden Datensatz generierte XML-Qucks umfasst:
    
    * A datasetID die EDDGrid ' datasetID plus "\\_AsATable".
    * Ein neues globales Gesamtattribut, das EDDGrid Zusammenfassung plus einen neuen ersten Absatz, der beschreibt, was dieser Datensatz ist.
    * Ein neues Titel globales Attribut, das EDDGrid Titel plus ", (Als Tabelle) ".
    * Ein neues maxAxis0 globales Attribut mit einem Wert von 10.
#### EDDTableFrom EDDGrid Skelette XML{#eddtablefromeddgrid-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromEDDGrid" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromEDDGrid, this calls lowUpdate() of the underlying  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGrid. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataset>](#eddgrid)...&lt;/dataset> &lt;!-- 1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Any type of EDDGrid dataset.  You can even use an  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EDDGridFromERDDAP™ to access an independent EDDGrid dataset on  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this server. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromFileNames{#eddtablefromfilenames} 
 [ **EDDTableFromFileNames** ](#eddtablefromfilenames) erstellt einen Datensatz aus Informationen über eine Gruppe von Dateien im Dateisystem des Servers, einschließlich einer URL für jede Datei, so dass Benutzer die Dateien über herunterladen können ERDDAP ' [ "files" System](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) . Im Gegensatz zu allen [EDDTableFromFiles](#eddtablefromfiles) Unterklassen, dieser Datensatztyp dient nicht Daten innerhalb der Dateien.

* EDDTableFromFileNames ist nützlich, wenn:
    * Sie haben eine Gruppe von Dateien, die Sie als ganze Dateien verbreiten möchten, weil sie nicht enthalten "Daten" in der gleichen Weise, dass regelmäßige Datendateien haben Daten. Zum Beispiel Bilddateien, Videodateien, Word-Dokumente, Excel-Tabellendateien, PowerPoint-Präsentationsdateien oder Textdateien mit unstrukturiertem Text.
    * Sie haben eine Gruppe von Dateien, die Daten in einem Format haben, das ERDDAP™ kann noch nicht gelesen werden. Beispielsweise ein projektspezifisches, benutzerdefiniertes, binäres Format.
         
#### EDDTableFromFileNames Daten{#eddtablefromfilenames-data} 
*    [Die Daten in einem EDDTableFromFileNames-Datensatz](#eddtablefromfilenames-data) ist eine Tabelle, die ERDDAP™ erstellt on-the-fly mit Informationen über eine Gruppe von lokalen Dateien. In der Tabelle gibt es eine Zeile für jede Datei. Vier spezielle Attribute in der [ datasets.xml für diesen Datensatz](#eddtablefromfilenames-skeleton-xml) bestimmen, welche Dateien in diesem Datensatz enthalten sind:
    
##### Datei R{#filedir} 
    *   &lt;DateiDir&gt; -- Dies gibt das Quellverzeichnis im Dateisystem des Servers mit den Dateien für diesen Datensatz an. Die Dateien, die tatsächlich im Dateisystem des Servers in&lt;fileDir&gt; erscheint in der url Spalte dieses Datensatzes innerhalb eines virtuellen Verzeichnisses namenshttps://*serverUrl*/erddap/files/*datasetID/*.
Zum Beispiel, wenn datasetID ist jplMU RSS T,
und&lt;DateiDir&gt; ist /home/data/mur/
und das Verzeichnis hat eine Datei namens jplMU RSS T20150103000000.png,
dann wird die URL, die den Benutzern für diese Datei angezeigt wird,
        https://*serverUrl*/erddap/jplMURSST/jplMURSST20150103000000.png.
        
Neben der Verwendung eines lokalen Verzeichnisses für die&lt;fileDir&gt;, Sie können auch die URL einer entfernten, verzeichnisartigen Webseite angeben. Das funktioniert mit:
        
        * Nicht aggregierte Datensätze in THREDDS, z.
            https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[ 2020-10-21 Dieser Server ist nicht mehr zuverlässig verfügbar. \\] 
        * Unaggregatierte Datensätze in Hyrax , z.
             [https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/) 
        * Die meisten Apache-ähnlichen Verzeichnislisten, z.B.
             [https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/](https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/) 
##### vonOnTheFly{#fromonthefly} 
 [\\*\\*Mehr Informationen](#fromonthefly) -- Für einige riesige S3 Eimer (wie noaa-goes17, die 26 Millionen Dateien hat) , es kann nehmen ERDDAP™ bis zu 12 Stunden, um alle Informationen über den Inhalt des Eimers herunterzuladen (und dann gibt es andere Probleme) . Um dies zu erreichen, gibt es eine besondere Art zu verwenden&lt;fileDir&gt; in EDDTableFromFileNames, um einen Datensatz mit dem Verzeichnis und Dateinamen aus einem AWS S3 Bucket zu erstellen. Der Datensatz verfügt nicht über die Liste aller S3-Bucket-Verzeichnisse und Dateinamen, die ein Benutzer über Anfragen an den Datensatz suchen kann. Aber der Datensatz wird die Namen von Verzeichnissen und Dateien auf dem Flug erhalten, wenn der Benutzer die Verzeichnishierarchie mit dem Datensatz durchläuft "files" Option. Dadurch können Benutzer die Dateihierarchie und Dateien des S3-Buckets über den Datensatz durchsuchen "files" System. Um dies zu tun, anstatt die URL für den S3 Bucket als "Starting-Verzeichnis" anzugeben (in GenerateDatasets Xml) oder&lt;DateiDir&gt; (in datasets.xml ) , verwenden:
```
\\*\\*\\*fromOnTheFly,*theS3BucketUrl*  
```
zum Beispiel:
```
\\*\\*\\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/  
```
Siehe Dokumentation für [Arbeiten mit S3 Buckets in ERDDAP™ ](#working-with-aws-s3-files) , insbesondere die Beschreibung des spezifischen Formats, das für S3 bucket URL verwendet werden muss. Und sehen
 [diese Details und ein Beispiel](#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket) Verwendung\\*\\*\\* von OnTheFly.
        
##### rekursiv{#recursive} 
*   &lt;recursive&gt; -- Dateien in Unterverzeichnissen&lt;DateiDir&gt; mit Namen übereinstimmen&lt;DateiRegex&gt; erscheint in den gleichen Unterverzeichnissen in der "files" URL, wenn&lt;recursive&gt; ist auf true gesetzt. Der Standard ist falsch.
* (&lt;PfadRegex&gt; (#pathregex) -- Wenn recursive=true, Nur Verzeichnisnamen, die dem Pfad entsprechenRegex (Standard="\\*") wird akzeptiert. Wenn recursive=false, wird dies ignoriert. Dies wird selten verwendet, kann aber unter ungewöhnlichen Umständen sehr nützlich sein. (Siehe [regex dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) und [Nach oben](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) 
##### DateiRegex{#fileregex} 
*   &lt;DateiRegex&gt; -- Nur die Dateinamen, in denen der ganze Dateiname (nicht einschließlich des Verzeichnisnamens) mit der&lt;fileRegex&gt; wird in diesem Datensatz enthalten sein. Zum Beispiel jplMU RSS T.&#123;14&#125;\\.png. (Siehe [regex dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) und [Nach oben](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .)   
         
##### Aus Dateinamen Datentabelle Inhalt{#from-file-names-data-table-contents} 
In der Tabelle gibt es Spalten mit:
* url -- Die URL, mit der Benutzer die Datei herunterladen können ERDDAP ' [ "files" System](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) .
* Name -- Der Name der Datei (ohne Verzeichnisnamen) .
* Zuletzt geändert -- Als die Datei zuletzt geändert wurde (als Doppelspeicher mit "seconds since 1970-01-01T00:00:00Z" ) . Diese Variable ist nützlich, weil Benutzer sehen können, ob / wenn der Inhalt einer bestimmten Datei zuletzt geändert wird. Diese Variable ist [Zeit Stempelvariable](#timestamp-variables) , so können die Daten als numerische Werte erscheinen (Sekunden seit 1970-0100:00Z) oder einen String-Wert (ISO 8601:2004 (E) Format) , je nach Situation.
* -- Die Größe der Datei in Bytes, gespeichert als Doppel. Sie werden als Doppel gespeichert, da einige Dateien größer sein können als Ints erlauben und lange nicht in einigen Antwort-Dateitypen unterstützt werden. Doubles geben die genaue Größe, auch für sehr große Dateien.
* durch die ERDDAP™ Administrator mit Informationen aus dem Dateinamen (beispielsweise die den Daten in der Datei zugeordnete Zeit) basierend auf zwei Attributen, die Sie in den Metadaten für jede weitere Spalte/ dataVariable :
    
    * AuszugRegex -- Das ist ein [regelmäßiger Ausdruck](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [Tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) . Der gesamte Regex muss mit dem gesamten Dateinamen übereinstimmen (nicht einschließlich des Verzeichnisnamens) . Der Regex muss mindestens eine Fanggruppe umfassen (einen Abschnitt eines regelmäßigen Ausdrucks, der von Klammern umschlossen wird) die ERDDAP™ verwendet, um festzustellen, welcher Abschnitt des Dateinamens zu extrahieren, um Daten zu werden.
    * Extrakt Gruppe -- Dies ist die Anzahl der Fanggruppe (#1 ist die erste Fanggruppe) im regulären Ausdruck. Der Standard ist 1. Eine Fanggruppe ist ein Teil eines regelmäßigen Ausdrucks, der von Klammern eingeschlossen wird.
    
Hier sind zwei Beispiele:
```
            <dataVariable>
                <sourceName>time</sourceName>
                <destinationName>time</destinationName>
                <dataType>String</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST(.{14})\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="units">yyyyMMddHHmmss</att>
                </addAttributes>
            </dataVariable>
```
```
            <dataVariable>
                <sourceName>day</sourceName>
                <destinationName>day</destinationName>
                <dataType>int</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST.{6}(..).{6}\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="ioos\\_category">Time</att>
                </addAttributes>
            </dataVariable> 
```
Im Falle der Zeitvariable, wenn eine Datei den Namen jplMU hat RSS T20150103000000.png, der ExtraktRegex wird mit dem Dateinamen übereinstimmen, die Zeichen, die der ersten Erfassungsgruppe entsprechen, extrahieren („20150103000000“) als dataType=String, dann verwenden Sie die [Einheiten geeignet für Stringzeiten](#string-time-units) die Strings in Zeitdatenwerte zu parsieren (2015-01-03T00:00:00Z) .

Im Falle der Tagesvariable, wenn eine Datei den Namen jplMU hat RSS T20150103000000.png, der ExtraktRegex wird mit dem Dateinamen übereinstimmen, die Zeichen, die der ersten Erfassungsgruppe entsprechen, extrahieren ("03") wie folgt:&lt;DatenTyp&gt;] (#datatype) \\=int, ergibt einen Datenwert von 3.
        
#### Weitere Informationen{#other-information} 
* Nein.&lt;UpdateEveryNMillis&gt;] (#updateeverynmillis) -- Diese Art von Datensatz braucht nicht und kann die&lt;updateEveryNMillis&gt; tag, weil die von EDDTableFromFileNames gelieferten Informationen immer perfekt aktuell sind, weil ERDDAP™ sucht das Dateisystem, um auf jede Anforderung von Daten zu reagieren. Auch wenn es eine große Anzahl von Dateien gibt, sollte dieser Ansatz vernünftig funktionieren. Eine Antwort kann langsam sein, wenn es eine große Anzahl von Dateien und der Datensatz wurde nicht für eine Weile abgefragt. Aber für einige Minuten danach, das Betriebssystem hält die Informationen in einem Cache, so dass Antworten sollten sehr schnell sein.
     
* Sie können die [Datensätze generieren Xml Programm](#generatedatasetsxml) um die datasets.xml chunk für diese Art von Datensatz. Sie können zusätzliche Spalten hinzufügen/definieren mit Informationen aus dem Dateinamen, wie oben gezeigt.
     
#### EDDTableFromFileNames skeleton XML{#eddtablefromfilenames-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromFileNames" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileDir>](#eddtablefromfilenames-data)...&lt;/fileDir>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;recursive>](#eddtablefromfilenames-data)...&lt;/recursive>  &lt;!-- true or false (the default) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileNameRegex>](#eddtablefromfilenames-data)...&lt;/fileNameRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include [&lt;dataType>](#datatype) tag. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromFiles{#eddtablefromfiles} 
 [ **EDDTableFromFiles** ](#eddtablefromfiles) ist die Superklasse aller EDDTableFrom...Files-Klassen. Sie können EDDTableFromFiles nicht direkt verwenden. Verwenden Sie stattdessen eine Unterklasse von EDDTableFromFiles, um den spezifischen Dateityp zu handhaben:

*    [EDDTableFromAsciiFiles](#eddtablefromasciifiles) aggregiert Daten aus Komma-, Tab-, Semikolon- oder platzgetrennten tabellarischen ASCII-Datendateien.
*    [EDDTableFromAudioFiles](#eddfromaudiofiles) aggregiert Daten aus einer Gruppe von lokalen Audiodateien.
*    [EDDTableFrom AwsXmlFiles](#eddtablefromawsxmlfiles) aggregierte Daten von einem Satz von Automatischer Wetterstation (AWS) XML-Dateien.
*    [EDDTableFromColumnarAsciiFiles](#eddtablefromcolumnarasciifiles) aggregiert Daten aus tabellarischen ASCII-Datendateien mit festbreiten Datenspalten.
*    [EDDTableFrom Hyrax Dateien](#eddtablefromhyraxfiles)   (DEPRECATE) aggregierte Daten mit mehreren Variablen, jeweils mit gemeinsamen Abmessungen (zum Beispiel Zeit, Höhe (oder Tiefe) , Breite, Länge) , und serviert von [ Hyrax   OPeNDAP Server](https://www.opendap.org/software/hyrax-data-server) .
*    [EDDTableFromInvalidCRAFiles](#eddtablefrominvalidcrafiles) aggregierte Daten aus NetCDF   (v3 oder v4)   .nc Dateien, die eine bestimmte, ungültige Variante des CF DSG Contiguous Ragged Array verwenden (CRA) Dateien. Obwohl ERDDAP™ unterstützt diesen Dateityp, es ist ein ungültiger Dateityp, den niemand verwenden sollte. Gruppen, die derzeit diesen Dateityp verwenden, werden stark ermutigt, ERDDAP™ um gültige CF DSG CRA-Dateien zu generieren und mit diesen Dateien zu stoppen.
*    [EDDTableFromJsonlCSVFis](#eddtablefromjsonlcsvfiles) aggregierte Daten aus [JSON Zeilen CSV-Dateien](https://jsonlines.org/examples/) .
*    [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) aggregierte Daten aus NetCDF   (v3 oder v4)   .nc   (oder [ .nc ml](#ncml-files) ) Dateien mit mehreren Variablen, jeweils mit gemeinsamen Abmessungen (zum Beispiel Zeit, Höhe (oder Tiefe) , Breite, Länge) .
*    [EDDTableFromNcFis](#eddtablefromncfiles) aggregierte Daten aus NetCDF   (v3 oder v4)   .nc   (oder [ .nc ml](#ncml-files) ) Dateien mit mehreren Variablen, jeweils mit gemeinsamen Abmessungen (zum Beispiel Zeit, Höhe (oder Tiefe) , Breite, Länge) . Es ist gut, diesen Datensatztyp für bestehende Datensätze weiterzuverwenden, aber für neue Datensätze empfehlen wir stattdessen EDDTableFromMultidimNcFiles.
*    [EDDTableFromNcCFFiles](#eddtablefromnccffiles) aggregierte Daten aus NetCDF   (v3 oder v4)   .nc   (oder [ .nc ml](#ncml-files) ) Dateien, die eines der durch die [CF Diskrete Sampling Geometrien (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Konventionen. Aber für Dateien mit einer der multidimensionalen CF DSG-Varianten verwenden [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) statt.
*    [EDDTableFromNccsvFiles](#eddtablefromnccsvfiles) aggregierte Daten aus [NCCSV](/docs/user/nccsv-1.00) ASCII .csv Dateien.
*    [EDDTableFromParquetFis](#eddtablefromparquetfiles) Daten von [Parkett](https://parquet.apache.org/) .
*    [EDDTableFromThreddsFiles](#eddtablefromthreddsfiles)   (DEPRECATE) aggregierte Daten aus Dateien mit mehreren Variablen mit gemeinsamen Dimensionen, die von einem [THRED OPeNDAP Server](https://www.unidata.ucar.edu/software/tds/) .
*    [EDDTableFrom WFS Dateien](#eddtablefromwfsfiles)   (DEPRECATE) eine lokale Kopie aller Daten aus einer ArcGIS Kartenserver WFS Server so dass die Daten dann schnell reserviert werden können, um ERDDAP™ Benutzer.

Derzeit werden keine anderen Dateitypen unterstützt. Aber es ist in der Regel relativ einfach, Unterstützung für andere Dateitypen hinzuzufügen. Kontaktieren Sie uns, wenn Sie eine Anfrage haben. Oder, wenn Ihre Daten in einem alten Dateiformat sind, von dem Sie wegziehen möchten, empfehlen wir, die Dateien zu konvertieren NetCDF V3 .nc Dateien (und insbesondere .nc Dateien mit der [CF Diskrete Sampling Geometrien (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Ragged Array Datenstruktur -- ERDDAP™ Daten aus ihnen sehr schnell extrahieren) . NetCDF ist ein breit unterstütztes, binäres Format, ermöglicht schnellen Zugriff auf die Daten und wird bereits von ERDDAP .

#### VonFiles Details{#fromfiles-details} 
Die folgenden Informationen gelten für alle Unterklassen von EDDTableFromFiles.
##### Aggregat{#aggregation} 
Diese Klasse aggregiert Daten aus lokalen Dateien. Jede Datei hält eine (relativ) kleine Datentabelle.
    * Der resultierende Datensatz erscheint, als wären alle Tabellen der Datei zusammengefasst worden. (alle Zeilen von Daten aus Datei #1, plus alle Zeilen aus Datei #2, ...) .
    * Die Dateien müssen nicht alle angegebenen Variablen haben. Wenn eine bestimmte Datei keine angegebene Variable hat, ERDDAP™ wird bei Bedarf fehlende Werte hinzufügen.
    * Die Variablen in allen Dateien MUST haben für die [ add\\_offset ](#scale_factor) , [ missing\\_value ](#missing_value) , [) Wert](#missing_value) , [ scale\\_factor ](#scale_factor) , und [Einheiten](#units) Attribute (wenn) . ERDDAP™ Kontrollen, aber es ist ein unvollkommener Test -- wenn es verschiedene Werte gibt, ERDDAP weiß nicht, was richtig ist und daher welche Dateien ungültig sind. Wenn dies ein Problem ist, können Sie [NcML](#ncml-files) oder [ NCO ](#netcdf-operators-nco) um das Problem zu beheben.
         
##### Komprimierte Dateien{#compressed-files} 
Die Quelldatendateien für alle EDDTableFromFiles Unterklassen können extern komprimiert werden (z.B., .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 oder .Z) . Siehe [Extern komprimierte Dateien Dokumentation](#externally-compressed-files) .
     
##### Gespeicherte Dateiinformationen{#cached-file-information-1} 
* Wenn ein EDDTableFromFiles-Datensatz zuerst geladen wird, liest EDDTableFromFiles Informationen aus allen relevanten Dateien und erstellt Tabellen (eine Zeile für jede Datei) mit Informationen über jede gültige Datei und jedes "bad" (anders oder ungültig) Datei.
    * Die Tabellen werden auch auf der Festplatte gespeichert, wie NetCDF V3 .nc Dateien in *BigParentDirectory* /Datensatz/ *Letzte2CharsOfDatasetID* / * datasetID * / in Dateien benannt:
schmutzig .nc   (die eine Liste der eindeutigen Verzeichnisnamen enthält) ,
Datei Tabelle .nc   (die die Tabelle mit den Informationen jeder gültigen Datei hält) ,
BadFiles .nc   (die die Tabelle mit den Informationen jeder schlechten Datei hält) .
    * Um den Zugriff auf einen EDDTableFromFiles Datensatz zu beschleunigen (aber auf Kosten der Verwendung von mehr Speicher) , Sie können verwenden
(&lt;DateiTableInMemory&gt;wahr&lt;/fileTableInMemory&gt;] (#filetableinmemory)   
zu sagen ERDDAP™ eine Kopie der Dateiinformationstabellen im Speicher zu halten.
    * Die Kopie der Datei-Informationstabellen auf der Festplatte ist auch nützlich, wenn ERDDAP™ wird geschlossen und neu gestartet: es speichert EDDTable VonFiles, alle Datendateien neu zu lesen.
    * Wenn ein Datensatz neu geladen wird, ERDDAP™ muss nur die Daten in neuen Dateien und Dateien lesen, die sich geändert haben.
    * Wenn eine Datei eine andere Struktur als die anderen Dateien hat (beispielsweise einen anderen Datentyp für eine der Variablen oder einen anderen Wert für die " [Einheiten](#units) " Attribut) , ERDDAP fügt die Datei in die Liste der "schlechten" Dateien. Informationen Ã1⁄4ber das Problem mit der Datei werden in der *BigParentDirectory* /logs/log.txt Datei.
    * Sie sollten nie mit diesen Dateien löschen oder arbeiten müssen. Eine Ausnahme ist: wenn Sie noch Änderungen an einem Datensatz vornehmen datasets.xml setup, Sie können diese Dateien löschen möchten, um zu zwingen ERDDAP™ alle Dateien neu zu lesen, da die Dateien anders gelesen/interpretiert werden. Wenn Sie jemals diese Dateien löschen müssen, können Sie es tun, wenn ERDDAP™ läuft. (Dann setzen Sie ein [Flagge](/docs/server-admin/additional-information#set-dataset-flag) um den Datensatz ASAP neu zu laden.) Allerdings ERDDAP™ in der Regel bemerkt, dass datasets.xml Informationen passen nicht zur Datei Tabelleninformationen und löschen die Dateitabellen automatisch.
    * Wenn Sie fördern möchten ERDDAP™ zur Aktualisierung der gespeicherten Datensatzinformationen (zum Beispiel, wenn Sie gerade hinzugefügt, entfernt oder geändert einige Dateien in das Datenverzeichnis des Datensatzes) , benutzen Sie die [Flaggensystem](/docs/server-admin/additional-information#flag) in Kraft ERDDAP™ um die Cache-Dateiinformationen zu aktualisieren.
         
##### Bearbeitungsanforderungen{#handling-requests-1} 
*    ERDDAP™ tabellarische Datenanforderungen können Einschränkungen auf jede Variable setzen.
    * Wenn die Datenanforderung eines Clients bearbeitet wird, können EDDTableFromFiles schnell in die Tabelle mit den gültigen Dateiinformationen schauen, um zu sehen, welche Dateien relevante Daten haben könnten. Wenn z.B. jede Quelldatei die Daten für einen Fix-Location-Buoy hat, kann EDDTableFromFiles sehr effizient bestimmen, welche Dateien Daten in einem bestimmten Längenbereich und Breitenbereich haben können.
    * Da die gültige Dateiinformationstabelle den minimalen und maximalen Wert jeder Variablen für jede gültige Datei enthält, kann EDDTableFromFiles oft mit anderen Abfragen ganz effizient umgehen. Wenn zum Beispiel einige der Bojen keinen Luftdrucksensor haben und ein Client Daten für airPressure anfordert&#33;=NaN, EDDTableFromFiles kann effizient bestimmen, welche Bojen Luftdruckdaten haben.
         
##### Aktualisierung der Cached File Information{#updating-the-cached-file-information-1} 
Wenn der Datensatz neu geladen wird, wird die geätzte Dateiinformation aktualisiert.
    
* Der Datensatz wird, wie durch die&lt;reloadEveryNMinutes&gt; in den Informationen des Datensatzes in datasets.xml .
* Der Datensatz wird so schnell wie möglich nachgeladen, wenn ERDDAP™ erkennt, dass Sie hinzugefügt, entfernt, [anfassend](https://en.wikipedia.org/wiki/Touch_(Unix) ) (um die letzte Datei zu ändern Geänderte Zeit) , oder eine Datendatei geändert.
* Der Datensatz wird so schnell wie möglich nachgeladen, wenn Sie den [Flaggensystem](/docs/server-admin/additional-information#flag) .

Wenn der Datensatz neu geladen wird, ERDDAP™ vergleicht die aktuell verfügbaren Dateien mit der Cache-Datei-Informationstabelle. Neue Dateien werden gelesen und der gültigen Dateitabelle hinzugefügt. Dateien, die nicht mehr vorhanden sind, werden von der gültigen Dateitabelle fallen gelassen. Dateien, in denen sich der Dateizeitstempel geändert hat, werden gelesen und ihre Informationen werden aktualisiert. Die neuen Tabellen ersetzen die alten Tabellen im Speicher und auf der Festplatte.
     
##### Schlechte Dateien{#bad-files-1} 
Die Tabelle der schlechten Dateien und die Gründe, die die Dateien für schlecht erklärt wurden (beschädigte Datei, fehlende Variablen, falsche Achsenwerte, etc.) wird an die E-Mail geschickt Alles Zur E-Mail-Adresse (wahrscheinlich du) jedes Mal, wenn der Datensatz neu geladen wird. Sie sollten diese Dateien so schnell wie möglich ersetzen oder reparieren.
     
##### Fehlende Variablen{#missing-variables-1} 
Wenn einige der Dateien nicht einige der dataVariable s definiert im Datensatz datasets.xml chunk, das ist okay. Wenn EDDTableFromFiles eine dieser Dateien liest, wird es handeln, als ob die Datei die Variable hatte, aber mit allen fehlenden Werten.
     
##### In Echtzeit Daten{#near-real-time-data} 
* EDDTableFromFiles behandelt Anträge auf sehr aktuelle Daten als Sonderfall. Das Problem: Wenn die Dateien, die den Datensatz erstellen, häufig aktualisiert werden, ist es wahrscheinlich, dass der Datensatz nicht jedes Mal aktualisiert wird, wenn eine Datei geändert wird. EDDTableFromFiles wird sich also der geänderten Dateien nicht bewusst sein. (Sie könnten die [Flaggensystem](/docs/server-admin/additional-information#flag) , aber das könnte dazu führen ERDDAP™ Nachladen des Datensatzes fast kontinuierlich. In den meisten Fällen empfehlen wir es nicht.) Stattdessen befasst sich EDDTableFromFiles mit dem folgenden System: Wann ERDDAP™ innerhalb der letzten 20 Stunden eine Anfrage an Daten (zum Beispiel vor 8 Stunden bis jetzt) , ERDDAP™ wird alle Dateien, die alle Daten in den letzten 20 Stunden suchen. So ERDDAP™ muss nicht perfekt aktuelle Daten für alle Dateien haben, um die neuesten Daten zu finden. Sie sollten immer noch einstellen [&lt;Nachladen AllNMinutes&gt;] (#reloadeverynminutes) zu einem recht kleinen Wert (beispielsweise 60) , aber es muss nicht winzig sein (beispielsweise 3) .
     
    *    **Nicht empfohlen** Organisation von Echtzeitdaten in den Dateien: Wenn Sie beispielsweise einen Datensatz haben, der Daten für zahlreiche Stationen speichert (oder Boje, oder Trajektorie, ...) für viele Jahre, Sie könnten die Dateien so arrangieren, dass zum Beispiel gibt es eine Datei pro Station. Aber dann, jedes Mal, wenn neue Daten für eine Station ankommen, müssen Sie eine große alte Datei lesen und eine große neue Datei schreiben. Und wann ERDDAP™ reloadt den Datensatz, es bemerkt, dass einige Dateien geändert wurden, so dass es diese Dateien vollständig liest. Das ist ineffizient.
         
    *    **Empfohlen** Organisation von Echtzeitdaten in den Dateien: Speichern Sie die Daten in Stücken, zum Beispiel alle Daten für eine Station/Buoy/Trajektorie für ein Jahr (oder einen Monat) . Dann, wenn ein neues Datum ankommt, nur die Datei mit der diesjährigen (oder Monat) Daten sind betroffen.
        
        * Am besten: Verwendung NetCDF V3 .nc Dateien mit einer unbegrenzten Dimension (Zeit) . Dann, um neue Daten hinzuzufügen, können Sie einfach die neuen Daten anhängen, ohne die gesamte Datei lesen und neu schreiben zu müssen. Die Änderung wird sehr effizient und im Wesentlichen atomar gemacht, so dass die Datei nie in einem inkonsistenten Zustand ist.
        * Ansonsten: Wenn Sie nicht/kann nicht verwenden .nc Dateien mit einer unbegrenzten Dimension (Zeit) , dann, wenn Sie neue Daten hinzufügen müssen, müssen Sie die gesamte betroffene Datei lesen und neu schreiben (hoffentlich klein, weil es nur ein Jahr hat (oder Monat) Datenwert) . Glücklicherweise alle Dateien für die letzten Jahre (oder Monate) für diese Station unverändert bleiben.
        
In beiden Fällen, wenn ERDDAP™ reloadt den Datensatz, die meisten Dateien sind unverändert; nur wenige kleine Dateien haben sich geändert und müssen gelesen werden.
         
##### Verzeichnisse{#directories-1} 
Die Dateien können in einem Verzeichnis oder in einem Verzeichnis und seinen Unterverzeichnissen sein. (rekursiv) . Wenn es eine große Anzahl von Dateien (zum Beispiel &gt; 1.000) , das Betriebssystem (und damit EDDTableFromFiles) wird viel effizienter arbeiten, wenn Sie die Dateien in einer Reihe von Unterverzeichnissen speichern (eins pro Jahr, oder eins pro Monat für Datensätze mit sehr häufigen Dateien) , so dass es nie eine große Anzahl von Dateien in einem bestimmten Verzeichnis.
     
##### Remote Directories und HTTP Range Requests{#remote-directories-and-http-range-requests-1} 
*    **Remote Directories und HTTP Range Requests**   (AKA Byte Servieren, Byte Range Anfragen) --
     EDDGrid FromNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles und EDDTableFromNcCFFile können manchmal Daten von .nc Dateien auf Remoteservern und über HTTP aufgerufen, wenn der Server unterstützt [Byte Servieren](https://en.wikipedia.org/wiki/Byte_serving) über HTTP-Bereichsanfragen (der HTTP-Mechanismus für Byte-Dienst) . Dies ist möglich, weil netcdf-java (die ERDDAP™ Anwendungen zum Lesen .nc Dateien) unterstützt Lesedaten von Remote .nc Dateien über HTTP-Bereichsanfragen.
    
     **Tu das nicht&#33;**   
Verwenden Sie stattdessen die [&lt;cacheFromUrl&gt; System) (#cachefromurl) .
    
##### CacheFromUrl{#cachefromurl} 
* ( ** &lt;ccheFromUrl&gt; ** &#33; (#cachefromurl) - Ja.
Alle EDDGrid FromFiles und alle EDDTableFromFiles-Datensätze unterstützen eine Reihe von Tags, die sagen ERDDAP™ eine Kopie aller Dateien eines entfernten Datensatzes herunterladen und aufrecht erhalten, oder einen Cache von wenigen Dateien (nach Bedarf heruntergeladen) . **Dies ist eine unglaublich nützliche Funktion.** 
    * Die&lt;Mit dem ccheFromUrl&gt;-Tag können Sie eine URL mit einer Liste der Dateien eines entfernten Datensatzes aus einer entfernten Dateiliste angeben.
        
        * Nicht aggregierte Datensätze in THREDDS, z.
            https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[ 2020-10-21 Dieser Server ist nicht mehr zuverlässig verfügbar. \\] 
        * Unaggregatierte Datensätze in Hyrax , z.
             [https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/) 
        * Die meisten Apache-ähnlichen Verzeichnislisten, z.B.
             [https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/](https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/) 
        * S3 Eimer, z.
             [https://noaa-goes17.s3.us-east-1.amazonaws.com/](https://noaa-goes17.s3.us-east-1.amazonaws.com/)   
Dies kann jedoch ein AWS-Konto und mehr Setup erfordern.
Vgl. [Arbeiten mit S3 Buckets in ERDDAP™ ](#working-with-aws-s3-files) .
Auch, Sie brauchen in der Regel nicht Cache verwenden FromUrl mit Dateien in S3 Buckets, wenn die Dateien sind ASCII Dateien (z.B., .csv) , weil ERDDAP™ die Daten aus dem Eimer effizient direkt über einen Stream lesen können.
        
         ERDDAP™ wird diese Dateien im Datensatz kopieren oder abspeichern&lt;DateiDir&gt; Verzeichnis. Wenn Sie Unterstützung für eine andere Art von Remote-Datei-Liste benötigen (z.B. FTP) , bitte E-Mail Ihre Anfrage an Chris. John bei noaa.gov.
        
        * Der Standardwert für die&lt;ccheFromUrl&gt; tag ist null. Wenn Sie keinen Wert für die&lt;ccheFromUrl&gt; tag, das Copy/cache-System wird nicht für diesen Datensatz verwendet werden.
        * Wenn der Datensatz&lt;DateiRegex&gt; Einstellung ist etwas anderes als .\\*, ERDDAP™ wird nur Dateien herunterladen, die mit der DateiRegex übereinstimmen.
        * Wenn der Datensatz&lt;rekursive&gt;-Einstellung ist wahr und die Remote-Dateien sind in Unterverzeichnissen, ERDDAP™ wird in Remote-Unterverzeichnisse, die dem Datensatz entsprechen [&lt;PfadRegex&gt; (#pathregex) , erstellen Sie die gleiche Verzeichnisstruktur lokal und setzen Sie die lokalen Dateien in die gleichen Unterverzeichnisse.
        * In GenerateDatasets Xml, wenn Sie eine&lt;cacheFromUrl&gt; Wert, Generieren Datensätze Xml erstellt die lokale&lt;fileDir&gt;-Verzeichnis und kopieren Sie 1 Remote-Datei in sie. Datensätze generieren Xml erzeugt dann datasets.xml chunk basierend auf dieser Sample-Datei (Angabe der Stichprobe Datei=nothing) .
        * Wenn die Datenquelle eine Fernbedienung ist ERDDAP™ , Verwendung [ EDDGrid Von Erddap](#eddfromerddap) oder [EDDTableFromErddap](#eddfromerddap) anstatt&lt;ccheFromUrl&gt;. So, Ihr Einheimischer ERDDAP™ erscheint, um den Datensatz zu haben, muss aber keine der Daten lokal speichern. Der einzige Grund zur Verwendung&lt;cacheFromUrl&gt;, um Daten von einer Fernbedienung zu erhalten ERDDAP™ ist, wenn Sie einen anderen Grund haben, warum Sie eine lokale Kopie der Datendateien haben möchten. In diesem Fall:
            * Dieser Datensatz versucht, den Datensatz auf der Fernbedienung zu abonnieren ERDDAP so dass Änderungen an diesem Datensatz die Flagge dieses Datensatzes rufen Url, wodurch dieser lokale Datensatz die geänderten Remote-Dateien neu laden und herunterladen. So wird der lokale Datensatz sehr bald nach Änderungen am Remote-Datensatz aktuell sein.
            * Sie sollten den Administrator der Fernbedienung e-Mail ERDDAP™ um die datasets.xml für den Remote-Datensatz, damit Sie den Datensatz in Ihrem lokalen ERDDAP™ aussehen wie der Datensatz in der Fernbedienung ERDDAP .
        * Wenn die Datenquelle eine Fernbedienung ist ERDDAP™ , der lokale Datensatz versucht, den Remote-Datensatz zu abonnieren.
            * Erfolgt das Abonnement, wann immer die Fernbedienung ERDDAP reloads und hat neue Daten, wird es das FlagURL für diesen Datensatz kontaktieren, wodurch es die neuen und/oder geänderten Datendateien neu laden und herunterladen kann.
            * Wenn das Abonnement versagt (aus welchem Grund) oder wenn Sie einfach sicherstellen möchten, dass der lokale Datensatz aktuell ist, können Sie eine [Flagge](/docs/server-admin/additional-information#flag) für den lokalen Datensatz, so wird es neu geladen, so wird es für neue und/oder geänderte Remote-Datendateien überprüfen.
        * Wenn die Datenquelle keine Fernbedienung ist ERDDAP : Der Datensatz überprüft nach neuen und/oder geänderten Remote-Dateien, wenn er neu geladen wird. Normalerweise wird dies von [&lt;Nachladen AllNMinutes&gt;] (#reloadeverynminutes) . Aber wenn Sie wissen, wann es neue Remote-Dateien gibt, können Sie eine [Flagge](/docs/server-admin/additional-information#flag) für den lokalen Datensatz, so wird es nach neuen und/oder geänderten Remote-Datendateien neu laden und überprüfen. Wenn dies routinemäßig zu einer bestimmten Tageszeit geschieht (z.B. um 7 Uhr) , Sie können einen Cron Job zu verwenden curl um die Flagge zu kontaktieren Url für diesen Datensatz, so wird es nach neuen und/oder geänderten Remote-Datendateien neu laden und überprüfen.
    * Die&lt;ccheSizeGB&gt; tag gibt die Größe des lokalen Cache an. Sie müssen dies wahrscheinlich nur bei der Arbeit mit Cloud-Speichersystemen wie [Amazon S3](https://aws.amazon.com/s3/) das ein häufig verwendetes Speichersystem ist, das Teil von [Amazon Web Services (AWS) ](https://aws.amazon.com/) . Der Standard ist -1.
        * Ist der Wert&lt;= 0 (z.B. der Standardwert von -1) ,
             ERDDAP™ wird herunterladen und pflegen **vollständige Kopie** alle Dateien des Remote-Datensatzes im Datensatz&lt;DateiDir&gt;.
            * Dies ist die Einstellung, die bei Bedarf empfohlen wird.
            * Jedes Mal, wenn der Datensatz neu geladen wird, vergleicht er die Namen, Größen und lastModified Zeiten der Remote-Dateien und der lokalen Dateien und lädt alle Remote-Dateien, die neu sind oder geändert haben.
            * Wenn eine Datei, die auf dem Remote-Server war, verschwindet, ERDDAP™ die entsprechende lokale Datei nicht löschen (ansonsten, wenn etwas vorübergehend falsch mit dem Remote-Server war, ERDDAP™ kann einige oder alle lokalen Dateien löschen&#33;) .
            * Mit dieser Einstellung, in der Regel werden Sie&lt;updateEveryNMillis&gt; bis -1, da sich der Datensatz bewusst ist, wann er neue Datendateien kopiert hat.
        * wenn der Wert &gt; 0 ist,
             ERDDAP™ wird Dateien vom Remote-Datensatz nach Bedarf in einen lokalen **Cache** (im Datensatz)&lt;fileDir&gt;) mit einer Schwellengröße dieser angegebenen Anzahl von GB.
            * Der Cache muss groß genug sein, um mindestens mehrere Dateien zu halten.
            * Generell, je größer der Cache, desto besser, weil die nächste angeforderte Datendatei wahrscheinlicher bereits im Cache sein wird.
            * Caching sollte nur verwendet werden, wenn ERDDAP™ läuft in einem Cloud Computing Server (z.B. eine AWS-Rechnungsinstanz) und die Remote-Dateien in einem Cloud-Speichersystem (z.B. AWS S3) .
            * Wenn der Speicherplatz der lokalen Dateien den Cache überschreitet GrößeGB, ERDDAP™ wird bald (vielleicht nicht sofort) Löschen Sie einige der Cache-Dateien (aktuell, basierend auf dem Least (LRU) Algorithmus) bis der von den lokalen Dateien verwendete Speicherplatz&lt;CacheSizeGB (die "Galerie") . Ja, es gibt Fälle, in denen LRU sehr schlecht ausführt -- es gibt keinen perfekten Algorithmus.
            *    ERDDAP™ wird nie versuchen, eine Cache-Datei zu löschen, die ERDDAP™ begann in den letzten 10 Sekunden zu verwenden. Dies ist ein unvollkommenes System, um das Cache-System zu behandeln und das Datendateileser-System nur lose integriert. Wegen dieser Regel, ERDDAP™ kann nicht in der Lage sein, genug Dateien zu löschen, um sein Ziel zu erreichen, in welchem Fall wird es eine WARNING auf die log.txt-Datei drucken, und das System wird viel Zeit verlieren, um den Cache zu streichen, und es ist möglich, dass die Größe der Dateien im Cache den cacheSizeGB erheblich überschreiten kann. Wenn dies jemals geschieht, verwenden Sie eine größere ccheSizeGB-Einstellung für diesen Datensatz.
            * Derzeit, ERDDAP™ nie überprüft, ob der Remote-Server eine neuere Version einer Datei hat, die sich im lokalen Cache befindet. Wenn Sie diese Funktion benötigen, mailen Sie bitte Chris. John bei noaa.gov.
        * Obwohl die Verwendung der gleichen Tag-Namen könnte bedeuten, dass das Kopiersystem und das Cache-System das gleiche zugrunde liegende System verwenden, das ist nicht korrekt.
            * Das Kopiersystem startet proaktiv TaskThread-Aufgaben zum Herunterladen neuer und geänderter Dateien jedes Mal, wenn der Datensatz neu geladen wird. Nur Dateien, die tatsächlich in das lokale Verzeichnis kopiert wurden, sind über die ERDDAP™ Datensatz.
            * Das Cache-System erhält die Remote-Dateiliste jedes Mal, wenn der Datensatz neu geladen wird und gibt vor, dass alle diese Dateien über die ERDDAP™ Datensatz. Interessanterweise erscheinen alle Remote-Dateien sogar in den /files/ Webseiten des Datensatzes und stehen zum Download bereit (obwohl vielleicht erst nach einer Verzögerung, während die Datei zuerst vom Remote-Server zum lokalen Cache heruntergeladen wird.) 
        * Datensätze, die cacheSizeGB verwenden, können von der Verwendung eines [nThreads](#nthreads) Setzen größer als 1, weil dies dem Datensatz ermöglicht, mehr als 1 Remote-Datei zu einem Zeitpunkt herunterzuladen.
    * Die&lt;cchePartialPathRegex&gt; tag ist ein selten verwendeter Tag, der eine Alternative für den Datensatz angeben kann [&lt;PfadRegex&gt; (#pathregex) . Der Standard ist null.
        * Verwenden Sie dies nur, wenn Sie den gesamten Datensatz über den Standard kopieren.&lt;ccheSizeGB&gt; Wert von -1. Mit&lt;ccheSizeGB&gt; Werte von &gt;1, dies wird ignoriert, weil es nicht-sensisch ist.
        * Siehe [die Dokumentation für&lt;PfadRegex&gt; (#pathregex) zur Anleitung zum Aufbau des Regex.
        * Wenn dies angegeben wird, wird es jedes Mal verwendet, wenn der Datensatz neu geladen wird, außer dass zum ersten Mal ein Datensatz zu Beginn eines Monats neu geladen wird.
        * Dies ist nützlich, wenn der Remote-Datensatz in einem Labyrinth von Unterverzeichnissen gespeichert ist und wenn die überwiegende Mehrheit dieser Dateien selten, wenn überhaupt, ändern. (&lt;Husten NASA&lt;Husten Sie könnten z.B. eine&lt;cachePartialPathRegex&gt; die gerade zum laufenden Jahr oder zum aktuellen Monat passt. Diese Regexes sind sehr knifflig zu spezifizieren, da alle Teil- und Vollwegnamen mit dem&lt;cchePartialPathRegex&gt; und weil&lt;cchePartialPathRegex&gt; muss mit den entfernten URLs und den lokalen Verzeichnissen arbeiten. Ein echtes Lebensbeispiel ist:
```
            <cacheFromUrl>https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/</cacheFromUrl>  
            \\>!-- \\[2020-10-21 This server is no longer reliably available.\\] For most types of remote directories, omit the filename (e.g., contents.html for Hyrax). -->  
            <fileDir>/u00/satellite/MUR41/</fileDir>  
            <fileNameRegex>\\*\\.nc</fileNameRegex>  
            <recursive>true</recursive>  
            <pathRegex>.\\*</pathRegex>  
            <cachePartialPathRegex>.\\*/v4\\.1/(|2018/(|01./))</cachePartialPathRegex>  
```
Die oben stehende Beispiel-URL hat Dateien in Unterverzeichnissen basierend auf dem Jahr (z.B., 2018) und Tag des Jahres (z.B. 001, 002, ..., 365 oder 366) .
Anmerkung:&lt;CachePartialPathRegex&gt; beginnt mit .\\*
hat dann ein bestimmtes Unterverzeichnis, das den entfernten URLs und den lokalen Verzeichnissen gemeinsam ist, z.B. /v4\\.1/
hat dann eine Reihe von geschachtelten Fanggruppen, wo die erste Option ist nichts
und die zweite Option ist ein bestimmter Wert.
            
Das obige Beispiel passt nur zu Verzeichnissen für die zweiten 10 Tage 2018, z.
            https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/2018/010/  \\[ 2020-10-21 Dieser Server ist nicht mehr zuverlässig verfügbar. \\]   
und Tag 011, 012, ..., 019.
             (Siehe [regex dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) und [Nach oben](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .)   
Wenn Sie Hilfe benötigen&lt;cachePartialPathRegex&gt;, bitte E-Mail an die&lt;ccheFromUrl&gt; zu Chris. John bei noaa.gov.
            
        * Ein gemeinsamer Ansatz: Wenn Sie verwenden möchten&lt;cachePartialPathRegex&gt;, benutzen Sie es nicht zunächst, weil Sie möchten ERDDAP™ alle Dateien zunächst herunterladen. Nach ERDDAP™ hat alle Dateien heruntergeladen, fügen Sie es zum Datensatz's chunk of datasets.xml .
             
##### Tausende von Dateien{#thousands-of-files} 
Wenn Ihr Datensatz viele Tausende von Dateien hat, ERDDAP™ kann langsam auf Datenanfragen aus diesem Datensatz reagieren. Es gibt hier zwei Fragen:
 

1. Die Anzahl der Dateien pro Verzeichnis.
Intern, ERDDAP™ arbeitet mit der gleichen Geschwindigkeit, unabhängig davon, ob n Dateien in einem Verzeichnis oder in mehreren Verzeichnissen dispergiert sind.
     
Aber es gibt ein Problem: Je mehr Dateien in einem bestimmten Verzeichnis, desto langsamer wird das Betriebssystem die Liste der Dateien im Verzeichnis zurückgeben (pro Datei) bis ERDDAP . Die Antwortzeit könnte O sein (n log n) . Es ist schwer zu sagen, wie viele Dateien in einem Verzeichnis zu viele sind, aber 10.000 sind wahrscheinlich zu viele. Wenn Ihr Setup viele Dateien generiert, könnte eine Empfehlung hier sein: setzen Sie die Dateien in logisch organisierte Unterverzeichnisse (z.B. Station oder Station/Jahr) .
    
Ein weiterer Grund, Unterverzeichnisse zu verwenden: wenn ein Benutzer verwenden möchte ERDDAP ' "files" System, um den Namen der ältesten Datei für Station X zu finden, ist es schneller und effizienter, wenn die Dateien in Station / Jahr Unterverzeichnisse sind, weil viel weniger Informationen übertragen werden müssen.
    
2. Die Gesamtzahl der Dateien.
Für tabellarische Datensätze, ERDDAP™ hält den Überblick über den Wertebereich für jede Variable in jeder Datei. Wenn ein Benutzer eine Anfrage macht, ERDDAP™ muss alle Daten aus allen Dateien lesen, die Daten haben könnten, die der Anfrage des Benutzers entsprechen. Wenn der Benutzer Daten aus einer begrenzten Zeit fordert (z.B. einen Tag oder einen Monat) , dann ERDDAP™ muss nicht zu viele Dateien in Ihrem Datensatz öffnen. Aber es gibt extreme Fälle, in denen fast jede Datei passende Daten haben könnte (z.B. bei WasserTemperatur = 13,2C) . Da es dauert ERDDAP™ ein wenig Zeit (zum Teil die Suchzeit auf der Festplatte, zum Teil die Zeit, die Datei Header zu lesen) nur um eine bestimmte Datei zu öffnen (und mehr, wenn es viele Dateien im Verzeichnis gibt) , es gibt eine erhebliche Zeitstrafe, wenn die Gesamtzahl der Dateien, die ERDDAP™ zu öffnen ist sehr groß. Sogar das Öffnen von 1000 Dateien dauert erhebliche Zeit. So gibt es Vorteile, die täglichen Dateien in größere Stücke periodisch zu konsolidieren (z.B. 1 Station für 1 Jahr) . Ich verstehe, dass Sie dies aus verschiedenen Gründen nicht tun wollen, aber es führt zu viel schnelleren Antworten. In extremen Fällen (z.B. beschäftige ich mich mit einem GTSPP-Datensatz, der ~35 Millionen Quelldateien hat) , die Verwendung von Daten aus einer großen Anzahl von Quelldateien ist unpraktisch, weil ERDDAP Die Antwort auf einfache Abfragen kann Stunden dauern und Tonnen des Speichers verwenden. Durch die Konsolidierung von Quelldateien in eine kleinere Anzahl (für GTSPP, ich habe jetzt 720, 2 pro Monat) , ERDDAP™ kann vernünftig schnell reagieren. Vgl. [Millionen von Dateien](#millions-of-files)   
     

N.B. Solid State Drives sind großartig&#33; Die schnellste, einfachste, günstigste Art zu helfen ERDDAP™ mit einer großen Anzahl von (klein) Dateien ist eine solide Zustand Laufwerk zu verwenden. Vgl. [Solid State Drives sind großartig&#33;](/docs/server-admin/additional-information#solid-state-drives)   
     
##### Millionen von Dateien{#millions-of-files} 
* Einige Datensätze haben Millionen Quelldateien. ERDDAP™ kann damit umgehen, aber mit gemischten Ergebnissen.
    
    * Für Anfragen, die nur Variablen beinhalten, die in [&lt; subsetVariables &gt; (#subsetvariables) , ERDDAP™ hat alle benötigten Informationen bereits aus den Datendateien extrahiert und in einer Datei gespeichert, so dass sie sehr, sehr schnell reagieren kann.
    * Für andere Anträge, ERDDAP™ kann den Datensatz scannen [Informationen zur Datei](#cached-file-information) und herauszufinden, dass nur einige der Dateien Daten haben könnten, die für die Anfrage relevant sind und so schnell reagieren.
    * Aber für andere Anfragen (z.B. WasserTemperatur = 18 Grad\\_C) wenn eine Datei relevante Daten haben könnte, ERDDAP™ muss eine große Anzahl von Dateien öffnen, um zu sehen, ob jede der Dateien Daten hat, die für die Anfrage relevant sind. Die Dateien werden sequentiell geöffnet. Auf jedem Betriebssystem und jedem Dateisystem (andere als Festkörperantriebe) , das dauert lange (also ERDDAP™ reagiert langsam) und wirklich bindet das Dateisystem (also ERDDAP™ reagiert langsam auf andere Anfragen) .
    
Glücklicherweise gibt es eine Lösung.
    
    1. Einrichten des Datensatzes auf einer Nicht-öffentlichkeit ERDDAP™   (Ihr Computer?) .
    2. Erstellen und Ausführen eines Skripts, das eine Reihe von .nc CF-Dateien, jeweils mit einem großen Stück des Datensatzes, in der Regel eine Zeitspanne (zum Beispiel alle Daten für einen bestimmten Monat) . Wählen Sie den Zeitraum, so dass alle resultierenden Dateien weniger als 2GB sind (aber hoffentlich größer als 1GB) . Wenn der Datensatz Daten in Echtzeit hat, führen Sie das Skript aus, um die Datei für den aktuellen Zeitraum zu regenerieren (z.B. diesen Monat) häufig (alle 10 Minuten? Jede Stunde?) . Anfragen an ERDDAP™ für .nc CF-Dateien erstellen NetCDF V3 .nc Datei, die die [CF Diskrete Sampling Geometrien (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Ragged Array Datenstrukturen).
    3. Einrichten eines [EDDTableFromNcCFFiles](#eddtablefromnccffiles) Datensatz auf Ihrem Publikum ERDDAP™ die Daten von der .nc  (CF) Dateien. ERDDAP™ kann Daten aus diesen Dateien sehr schnell extrahieren. Und da es jetzt Dutzende oder Hunderte gibt (statt Millionen) von Dateien, auch wenn ERDDAP™ muss alle Dateien öffnen, kann es so schnell.
    
Ja, dieses System braucht Zeit und Mühe, um einzurichten, aber es funktioniert sehr, sehr gut. Die meisten Datenanforderungen können 100 Mal schneller bearbeitet werden als zuvor.
     \\[ Bob wusste, dass dies eine Möglichkeit war, aber es war Kevin O'Brien, der das zuerst tat und zeigte, dass es gut funktioniert. Jetzt. Bob nutzt dies für den GTSPP-Datensatz, der über 18 Millionen Quelldateien verfügt und der ERDDAP™ dient nun über ca. 500 .nc  (CF) Dateien. \\] 
    
N.B. Solid State Drives sind großartig&#33; Die schnellste, einfachste, günstigste Art zu helfen ERDDAP™ mit einer großen Anzahl von (klein) Dateien ist eine solide Zustand Laufwerk zu verwenden. Vgl. [Solid State Drives sind großartig&#33;](/docs/server-admin/additional-information#solid-state-drives)   
     
    
##### Riesige Dateien{#huge-files} 
* Eine einzige riesige Datendatei (besonders große ASCII Datendateien) kann einen OutOfMemoryError verursachen. Wenn dies das Problem ist, sollte es offensichtlich sein, weil ERDDAP™ wird den Datensatz nicht laden. Die Lösung, wenn möglich, ist, die Datei in mehrere Dateien zu teilen. Idealerweise können Sie die Datei in logische Stücke teilen. Zum Beispiel, wenn die Datei 20 Monate Wert von Daten hat, teilen Sie sie in 20 Dateien, jeweils mit 1 Monat Wert von Daten. Aber es gibt Vorteile, auch wenn die Hauptdatei willkürlich aufgeteilt wird. Dieser Ansatz hat mehrere Vorteile: a) Dies reduziert den Speicher, der benötigt wird, um die Datendateien auf 1/20th zu lesen, da nur eine Datei zu einem Zeitpunkt gelesen wird. b) Oft, ERDDAP™ kann mit Anfragen viel schneller umgehen, weil es nur in einem oder einigen Dateien suchen muss, um die Daten für eine bestimmte Anfrage zu finden. c) Wenn die Datenerfassung fortgesetzt wird, können die vorhandenen 20 Dateien unverändert bleiben, und Sie müssen nur eine, kleine, neue Datei ändern, um den Datenwert des nächsten Monats zum Datensatz hinzuzufügen.
     
##### FTP-Fehler/Advice{#ftp-troubleadvice-1} 
* Wenn Sie FTP neue Datendateien an die ERDDAP™ Server während ERDDAP™ es läuft, es besteht die Chance, ERDDAP™ wird den Datensatz während des FTP-Prozesses neu geladen. Es passiert öfter, als Sie denken könnten&#33; Wenn es passiert, erscheint die Datei gültig (es hat einen gültigen Namen) , aber die Datei ist nicht gültig. wenn ERDDAP™ versucht, Daten aus dieser ungültigen Datei zu lesen, der resultierende Fehler wird dazu führen, dass die Datei in der Tabelle der ungültigen Dateien hinzugefügt wird. Das ist nicht gut. Um dieses Problem zu vermeiden, verwenden Sie einen temporären Dateinamen, wenn FTP die Datei, zum Beispiel ABC2005 .nc \\_TEMP . Dann der DateiNameRegex-Test (siehe unten) wird angeben, dass dies keine relevante Datei ist. Nachdem der FTP-Prozess abgeschlossen ist, umbenennen Sie die Datei in den richtigen Namen. Der Umbenennvorgang bewirkt, dass die Datei in einem Augenblick relevant wird.
    
##### Dateiname extrahiert{#file-name-extracts} 
 \\[ Diese Funktion ist DEPRECATED. Bitte benutzen [\\*\\*\\*fileName pseudo sourceName ](#filename-sourcenames) statt. \\]   
EDDTableFromFiles verfügt über ein System zum Extrahieren eines Strings aus jedem Dateinamen und dazu, eine Pseudodatenvariable zu machen. Derzeit gibt es kein System, diese Strings als Termine/Zeiten zu interpretieren. Es gibt mehrere XML-Tags, um dieses System einzurichten. Wenn Sie keinen Teil oder das ganze System benötigen, geben Sie diese Tags einfach nicht an oder verwenden Sie "" Werte.

* preExtractRegex ist ein [regelmäßiger Ausdruck](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)   ( [Tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) ) verwendet, um Text vom Anfang des Dateinamens zu entfernen. Die Entfernung erfolgt nur, wenn der Regex angepasst ist. Dies beginnt in der Regel mit "^" zum Beginn des Dateinamens.
* Post ExtractRegex ist ein regelmäßiger Ausdruck, der verwendet wird, um Text zu identifizieren, der vom Ende des Dateinamens entfernt wird. Die Entfernung erfolgt nur, wenn der Regex angepasst ist. Dies endet in der Regel mit "$" bis zum Ende des Dateinamens.
* ExtraktRegex Wenn vorhanden, wird dieser reguläre Ausdruck nach preExtractRegex und postExtractRegex verwendet, um einen String zu identifizieren, der aus dem Dateinamen extrahiert werden soll (zum Beispiel die stationID ) . Wenn der Regex nicht angepasst ist, wird der gesamte Dateiname verwendet (Minus preExtract und post Extrakt) . Verwenden Sie ".\\*", um den gesamten Dateinamen zu entsprechen, der nach preExtractRegex und postExtractRegex hinterlassen wird.
* Spalte NameForExtract ist der Datenspalten-Quellenname für die extrahierten Strings. A dataVariable mit diesem [ sourceName ](#sourcename) muss in der dataVariable s Liste (mit jedem Datentyp, aber in der Regel String) .

Zum Beispiel, wenn ein Datensatz Dateien mit Namen wie XYZAble hat .nc , XYZBaker .nc , XYZCharlie .nc , ... und Sie wollen eine neue Variable erstellen ( stationID ) wenn jede Datei gelesen wird, die Stations-ID-Werte hat (Able, Baker, Charlie, ...) aus den Dateinamen extrahiert, können Sie diese Tags verwenden:

*   &lt;VorExtractRegex&gt;^XYZ&lt;/preExtractRegex&gt;
Die erste ^ ist ein regulärer Ausdruck, der besondere Charakter hat, ERDDAP™ XYZ am Anfang des Dateinamens suchen. Dies bewirkt, dass XYZ, wenn am Anfang des Dateinamens gefunden, entfernt wird (zum Beispiel der Dateiname XYZAble .nc wird able .nc ) .
*   &lt;PostExtractRegex&gt;\\\\ .nc $&lt;/postExtractRegex&gt;
Die $ am Ende ist ein regelmäßiger Ausdruck besondere Charakter, die Kräfte ERDDAP™ um zu suchen .nc am Ende des Dateinamens. Da . ist ein regelmäßiger Ausdruck Spezialcharakter (die jedem Charakter entspricht) , es ist codiert als \\. Hier. (weil 2E die hexadezimale Zeichennummer für einen Zeitraum ist) . Diese Ursachen .nc , wenn am Ende des Dateinamens gefunden, entfernt werden (zum Beispiel den Teildateinamen Abgeltung .nc wird able) .
*   &lt;AuszugRegex&gt;&lt;/extractRegex&gt;
Der regelmäßige Ausdruck entspricht allen übrigen Zeichen (zum Beispiel den Teildateinamen Able wird der Extrakt für die erste Datei) .
*   &lt;SpalteNameForExtract&gt; stationID &lt;/columnNameForExtract&gt;
Das sagt: ERDDAP™ eine neue Quellspalte erstellen stationID beim Lesen jeder Datei. Jede Zeile der Daten für eine bestimmte Datei wird den Text aus seinem Dateinamen extrahiert (zum Beispiel, Ab) als der Wert in der stationID Spalte.

In den meisten Fällen gibt es zahlreiche Werte für diese Extrakt-Tags, die die gleichen Ergebnisse liefern -- regelmäßige Ausdrücke sind sehr flexibel. Aber in einigen Fällen gibt es nur eine Möglichkeit, die gewünschten Ergebnisse zu erhalten.
     
##### Pseudonym sourceName S{#pseudo-sourcenames} 
Jede Variable in jedem Datensatz ERDDAP™ hat eine&lt; sourceName &gt; (#sourcename) die den Namen der Quelle für die Variable angibt. EDDTableFromFiles unterstützt einige Pseudos sourceName s, die einen Wert von einem anderen Ort extrahieren (z.B. den Namen der Datei oder den Wert eines globalen Attributs) und fördern diesen Wert als eine Spalte konstanter Werte für den Datenspalt (z.B. die Datentabelle der Datei) . Für diese Variablen müssen Sie den Datentyp der Variable über die [&lt;DatenTyp&gt;] (#datatype) tag. Wenn die extrahierten Informationen ein DatumTime-String sind, geben Sie das Format der DatumTime-String in der [Eigenschaften](#string-time-units) . Das Pseudo sourceName Optionen sind:
 
###### global: sourceName S{#global-sourcenames} 
Ein globales Metadaten-Attribut in jeder Quelldatendatei kann als eine Datenspalte gefördert werden. Wenn eine Variable&lt; sourceName &gt; hat das Format
```
        <sourceName>global:*attributeName*</sourceName>
```
dann ERDDAP™ die Daten aus einer Datei liest, ERDDAP™ wird nach einem globalen Attribut dieses Namens suchen (z.B. PI) und erstellen Sie eine Spalte, die mit dem Wert des Attributs gefüllt ist. Dies ist nützlich, wenn das Attribut in verschiedenen Quelldateien unterschiedliche Werte hat, da ansonsten Benutzer nur einen dieser Werte für den gesamten Datensatz sehen würden. Zum Beispiel
```
        <sourceName>global:PI</sourceName>
```
Wenn Sie ein Attribut als Daten fördern, ERDDAP™ entfernt das entsprechende Attribut. Dies ist angemessen, weil der Wert in jeder Datei vermutlich unterschiedlich ist; während im aggregierten Datensatz in ERDDAP™ es wird nur einen Wert haben. Wenn Sie wollen, können Sie einen neuen Wert für das Attribut für den gesamten Datensatz hinzufügen, indem Sie&lt;att name=" *Eigenschaften Name* &gt; *neue Wert* &lt;/att&gt; zum globalen Datensatz [&lt; addAttributes &gt; (#addattributes) . Für globale Attribute, die ERDDAP™ erfordert z.B. Institution, Sie müssen einen neuen Wert für das Attribut hinzufügen.
     
###### Variable: sourceName S{#variable-sourcenames} 
Das Metadaten-Attribut einer Variablen in jeder Datei kann als Datenspalte gefördert werden. Wenn eine Variable&lt; [ sourceName ](#sourcename) \\&gt; hat das Format
```
        <sourceName>variable:*variableName*:*attributeName*<sourceName>
```
dann ERDDAP™ die Daten aus einer Datei liest, ERDDAP™ wird das angegebene Attribut suchen (z.B. ID) der angegebenen Größe (zum Beispiel Instrument) und erstellen Sie eine Spalte, die mit dem Wert des Attributs gefüllt ist. Die Elternvariable (zum Beispiel Instrument) muss nicht einer von dataVariable s in der Definition des Datensatzes in ERDDAP . Zum Beispiel
```
        <sourceName>variable:instrument:ID</sourceName>
```
Dies ist nützlich, wenn das Attribut in verschiedenen Quelldateien unterschiedliche Werte hat, da ansonsten Benutzer nur einen dieser Werte für den gesamten Datensatz sehen würden.

Wenn Sie ein Attribut als Daten fördern, ERDDAP™ entfernt das entsprechende Attribut. Dies ist angemessen, weil der Wert in jeder Datei vermutlich unterschiedlich ist; während im aggregierten Datensatz in ERDDAP™ es wird nur einen Wert haben. Wenn Sie wollen, können Sie einen neuen Wert für das Attribut für den gesamten Datensatz hinzufügen, indem Sie&lt;att name=" *Eigenschaften Name* &gt; *neue Wert* &lt;/att&gt; zur Variablen [&lt; addAttributes &gt; (#addattributes) . Für Attribute, die ERDDAP™ erfordert beispielsweise ioos\\_category   (je nach Einrichtung) , Sie müssen einen neuen Wert für das Attribut hinzufügen.
        
###### Dateiname sourceName S{#filename-sourcenames} 
Sie können einen Teil der Dateinamen einer Datei extrahieren und diese als Datenspalte fördern. Das Format für dieses Pseudo [&lt; sourceName &gt; (#sourcename) ist
```
        <sourceName>\\*\\*\\*fileName,*regex*,*captureGroupNumber*</sourceName>
```
Zum Beispiel
```
        <sourceName>\\*\\*\\*fileName,A(\\d{12})\\.slcpV1.nc,1</sourceName>
```
Wenn EDDTableFromFiles die Daten aus einer Datei liest, stellt sie sicher, dass die DateiName (zum Beispiel A201807041442.slcpV1 .nc ) entspricht dem angegebenen regulären Ausdruck ("regex") und die angegebenen (in diesem Fall die erste) Fanggruppe (das ein von Klammern umgebener Teil ist) , zum Beispiel "201807041442". (Siehe [regex dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) und [Nach oben](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) Der Regex kann als String mit oder ohne umliegende Zitate angegeben werden. Wenn der Regex als String mit umliegenden Zitaten angegeben ist, muss der String [JSON-Stil String](https://www.json.org/json-en.html)   (mit speziellen Zeichen entkommen mit \\ Zeichen) . Die Fanggruppe Nummer ist in der Regel 1 (die erste Fanggruppe) , aber kann jede Nummer sein.
     
###### PfadName sourceName S{#pathname-sourcenames} 
Sie können einen Teil des vollen Pfads einer Datei extrahieren Name (/verzeichnisse/fileName.ext) und fördern, dass es sich um eine Datenspalte handelt. Das Format für dieses Pseudo [&lt; sourceName &gt; (#sourcename) ist
```
        <sourceName>\\*\\*\\*pathName,*regex*,*captureGroupNumber*<sourceName>
```
Zum Beispiel
```
        <sourceName>\\*\\*\\*pathName,/data/myDatasetID/(\\[A-Z0-9\\]\\*)/B(\\d{12}).nc,1</sourceName>
```
Wenn EDDTableFromFiles die Daten aus einer Datei liest, wird es sicherstellen, dass der vollständige PfadName (zum Beispiel /data/myDatasetID/BAY17/B201807041442 .nc . Für diesen Test werden die Verzeichnistrenner immer '/' , nie ') entspricht dem angegebenen regulären Ausdruck ("regex") und die angegebenen (in diesem Fall die erste) Fanggruppe (das ein von Klammern umgebener Teil ist) , zum Beispiel "BAY17". (Siehe [regex dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) und [Nach oben](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) Der Regex kann als String mit oder ohne umliegende Zitate angegeben werden. Wenn der Regex als String mit umliegenden Zitaten angegeben ist, muss der String ein [JSON-Stil String](https://www.json.org/json-en.html)   (mit speziellen Zeichen entkommen mit \\ Zeichen) . Die Fanggruppe Nummer ist in der Regel 1 (die erste Fanggruppe) , aber kann jede Nummer sein.
         
##### "0 Dateien" Fehlermeldung{#0-files-error-message-2} 
* Wenn Sie [GenerateDatasetsXml](#generatedatasetsxml) oder [DasDds](#dasdds) , oder wenn Sie versuchen, ein EDDTableFrom zu laden... Dateien-Datensatz in ERDDAP™ , und Sie erhalten eine "0 Dateien" Fehlermeldung, dass ERDDAP™ gefunden 0 passende Dateien im Verzeichnis (wenn Sie denken, dass es passende Dateien in diesem Verzeichnis) :
    * Überprüfen Sie, ob die Dateien wirklich in diesem Verzeichnis sind.
    * Überprüfen Sie die Rechtschreibung des Verzeichnisnamens.
    * Überprüfen Sie die DateiNameRegex. Es ist wirklich, wirklich einfach, Fehler mit Regexes zu machen. Für Testzwecke, versuchen Sie die regex .\\*, die alle Dateinamen entsprechen sollte. (Siehe [regex dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) und [Nach oben](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) .) 
    * Überprüfen Sie, ob der Benutzer, der das Programm läuft (z.B., user=tomcat (?) für Tomcat/ ERDDAP ) hat 'lesen' Erlaubnis für diese Dateien.
    * In einigen Betriebssystemen (zum Beispiel SELinux) und je nach Systemeinstellungen, muss der Benutzer, der das Programm ausgeführt hat, 'lesen' Berechtigung für die gesamte Kette von Verzeichnissen, die zu dem Verzeichnis führen, das die Dateien hat.
         
##### Standardisierung Was?{#standardizewhat} 
* Wenn jede Unterklasse von EDDTableFromFiles eine Reihe von Quelldateien aggregiert, für eine bestimmte Variable, alle Quelldateien MUST haben identische Attributwerte für mehrere Attribute: scale\\_factor , add\\_offset , \\_Unsigned, missing\\_value , \\_FillValue und Einheiten). Denken Sie darüber nach: Wenn eine Datei WindSpeed-Einheiten=Knoten hat und eine andere WindSpeed-Einheiten=m/s hat, sollten die Datenwerte aus den beiden Dateien nicht in demselben aggregierten Datensatz enthalten sein. Wenn EDDTableFromFiles den Datensatz zuerst erstellt, liest er die Attributwerte aus einer Datei, lehnt dann alle Dateien ab, die für diese wichtigen Attribute unterschiedliche Werte haben. Für die meisten Sammlungen von Dateien ist dies kein Problem, weil die Attribute aller Variablen konsistent sind. Für andere Sammlungen von Dateien kann dies jedoch zu 1%, 10%, 50%, 90% oder sogar 99% der Dateien als "schlechte" Dateien abgelehnt. Das ist Ärger.
    
EDDTableFrom Dateien hat ein System, um dieses Problem zu lösen: standardisieren Was? Die Standardisierung Welche Einstellung sagt EDDTableFromFiles, um die Dateien zu standardisieren, sobald es sie liest, bevor EDDTableFromFiles die Attribute betrachtet, um zu sehen, ob sie konsistent sind.
    
Die Flip-Seite ist: Wenn der Datensatz dieses Problem nicht hat, verwenden Sie nicht standardisieren Was? Standardisierung Was potentielle Risiken hat (weiter unten) und Ineffizienzen. Also, wenn Sie nicht wirklich die Funktionen der Standardisierung benötigen Was, es gibt keine Notwendigkeit, sich den potenziellen Risiken und Unwirksamkeiten zu stellen. Die größte Ineffizienz ist: Wenn verschiedene Standardisierung Welche Optionen werden von einem Datensatz verwendet, es impliziert, dass die Quelldateien Daten auf signifikant unterschiedliche Weise speichern (z.B. mit unterschiedlichen scale\\_factor und add\\_offset , oder mit Zeitzeichenfolgen mit verschiedenen Formaten) . So gibt es für eine bestimmte Einschränkung in einer Benutzeranforderung keine Möglichkeit für ERDDAP™ um eine einzige Source-Level-Beschränkung zu machen, die auf alle Quelldateien angewendet werden kann. So. ERDDAP™ die betroffenen Zwänge nur auf höherer Ebene anwenden können. So. ERDDAP™ muss die Daten aus mehr Dateien vor der Anwendung der höheren, Ziel-Ebene Einschränkungen lesen. Anfragen an Datensätze, die standardisieren Was dauert länger zu verarbeiten.
    
Um dieses System zu verwenden, müssen Sie angeben
```
    <standardizeWhat>*standardizeWhat*</standardizeWhat>  
```
in der [ datasets.xml für den EDDTableFrom... Dateidatensatz](#eddtablefromfiles-skeleton-xml) (in der&lt;Datensatz&gt; tag).
    
Die *Standardisierung Was?* Wert gibt an, welche Änderungen EDDTableFromFiles versuchen sollten, anzuwenden. Die Änderungen sind die Summe einiger Kombinationen von:
    
1. Entpacken
Dies macht viele häufige und sichere Operationen, um numerische Spalten in den Dateien zu standardisieren:
    * wenn scale\\_factor und/oder add\\_offset Attribute sind vorhanden, entfernen und anwenden, um die Datenwerte auszupacken.
    * Entpacken Sie verpackte Attribute (z.B. Ist\\_min, Ist\\_max, actual\\_range , data\\_min , data\\_max , Daten\\_range, valid\\_min , valid\\_max , valid\\_range ) , wenn vorhanden, wenn die Variable verpackt wurde und wenn die Attributwerte verpackt wurden (das ist knifflig, aber vernünftig zuverlässig) .
    * Wenn \\_FillValue und/oder missing\\_value diese Datenwerte in ERDDAP "Standard" fehlende Werte: MAX\\_VALUE für ganze Typen (z.B. 127 für Bytes, 32,767 für kurz, und 2,147,483,647 für Ints, 9223372036854775807 für lange) und NaN für Doppel und Schwimmer.
    * Entfernen Sie die alte \\_FillValue und/oder missing\\_value Attribute (wenn) , und ersetzen sie mit nur \\_FillValue= \\[ die ERDDAP™ Standard fehlender Wert \\] .
         
2. Standardisierte numerische Zeiten
Wenn eine numerische Spalte numerische Zeiteinheiten im CF-Stil hat (" *ZeitEinstellungen* seit *Basiszeit* ", z.B. "Tage seit 1900-01-01") , Dies konvertiert das Datum Zeitwerte in "seconds since 1970-01-01T00:00:00Z" Werte und Änderungen des Attributs Einheiten, um das anzuzeigen.
Wenn dies gewählt wird und es besteht die Chance, dass diese Variable scale\\_factor oder add\\_offset , #1 MUST auch ausgewählt werden.
     
3. Anwenden von String missing\\_value   
Wenn eine String-Spalte \\_FillValue und/oder missing\\_value Attribute, dies wandelt diese Werte in "" um und entfernt die Attribute.
     
4. Finden Sie Numerisch missing\\_value   
Wenn eine numerische Spalte nicht \\_FillValue oder missing\\_value Attribute, dies versucht, eine undefinierte numerische missing\\_value   (z.B. -999, 9999, 1e37f) und die Instanzen davon in die "Standard"-Werte umwandeln (MAX\\_VALUE für ganzzahlige Typen und NAN für Doppel und Schwimmer) .
     **Diese Option hat ein Risiko:** wenn der größte oder kleinste gültige Datenwert wie ein fehlender Wert aussieht (z.B. 999) , dann werden diese gültigen Datenwerte in fehlende Werte umgewandelt (z.B. NaN) .
     
5. String "N/A" auf " ändern"
Für jede String-Spalte wandeln Sie mehrere Strings um, die häufig verwendet werden, um einen fehlenden String-Wert in " anzuzeigen. Derzeit sucht das nach ".", "...", "-", "?", "??", "N/A", "NA", "nein", "nicht anwendbar", "null", "unbekannt", "unspezifiziert". Die Stringsuche ist case-insensitive und nach dem Trimmen der Strings angewendet. "nd" und "ander" sind speziell nicht auf der Liste.
     **Diese Option hat ein Risiko:** Strings, die Sie als gültige Werte betrachten, können in " umgewandelt werden.
     
6. Standardisieren nach String ISO 8601 DatumZeiten
Für jede String-Spalte, versuchen Sie nicht-purely-numeric String dateTimes zu konvertieren (z.B. "Jan 2, 2018") nach ISO 8601 String dateTimes ("2018-01-02") .
     **Anmerkung** dass alle Datenwerte für die Spalte dasselbe Format verwenden müssen, andernfalls wird diese Option keine Änderungen in einer bestimmten Spalte vornehmen.
     **Diese Option hat ein Risiko:** Wenn es eine Spalte mit String-Werten gibt, die einfach wie ein gemeinsames Datum aussehen Zeitformat, werden sie in ISO 8601 String dateTimes umgewandelt.
     
7. Standardisieren Kompakte Datumszeiten nach ISO 8601 Datumszeiten
Für jede String- oder Ganzzahl-Spalte versuchen Sie, rein numerische String-DatumZeiten zu konvertieren (z.B. "20180102") nach ISO 8601 String dateTimes ("2018-01-02") .
     **Anmerkung** dass alle Datenwerte für die Spalte dasselbe Format verwenden müssen, andernfalls wird diese Option keine Änderungen in einer bestimmten Spalte vornehmen.
     **Diese Option hat ein Risiko:** Wenn es eine Spalte mit Werten gibt, die kein kompaktes Datum sind Zeiten aber aussehen wie kompakte DateTimes, werden sie in ISO 8601 String dateTimes umgewandelt.
     
8. Standardisieren von Einheiten
Dies versucht, die Einheiten String für jede Variable zu standardisieren. Zum Beispiel "Meter pro Sekunde", "Meter/Sekunde", "m.s^-1" , "m s-1" , "m.s-1" wird alle in "m.s-1" umgewandelt. Dies ändert die Datenwerte nicht. Dies funktioniert gut für gültig UDUNITS Einheiten Strings, aber kann Probleme mit ungültigen oder komplexen Strings haben. Sie können mit Problemen umgehen, indem Sie bestimmte von zu Paaren in&lt;StandardisierungEinheiten&gt; in ERDDAP '
     \\[ Tomcat \\] /webapps/erdap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml Datei. Bitte mailen Sie alle Änderungen an Chris. John bei noaaa.gov, so dass sie in die Standard-Nachrichten.xml integriert werden können.
     **Diese Option hat ein Risiko:** Dies kann einige komplexe oder ungültige Einheiten manipulieren; jedoch können Sie die oben beschriebene Arbeitsumgebung verwenden, um Probleme zu umgehen, wenn sie auftreten.
         
    
Der Standardwert der Standardisierung Was ist 0, was nichts tut.

Wenn/wenn Sie den Wert der Standardisierung ändern Was, das nächste Mal, wenn der Datensatz neu geladen wird, ERDDAP™ alle Datendateien für den Datensatz neu zu lesen, um die Mini-Datenbank mit Informationen über jede Datei neu zu erstellen. Wenn der Datensatz viele Dateien hat, dauert dies lange.
    
Anmerkungen:

* Ein Trick ist...
Die Standardisierung Welche Einstellung wird für alle Spalten in der Quelldatei verwendet. So, zum Beispiel mit #2048 könnte erfolgreich eine Spalte der kompakten String DateTimes in ISO 8601 String dateTimes umwandeln, aber es könnte auch irrtümlich eine Spalte mit Strings umwandeln, die einfach wie kompakte DateTimes aussehen.
     
*    datasets.xml und Datasets generieren Xml -
Es ist besonders schwierig, die Einstellungen richtig in datasets.xml um Ihren Datensatz so zu arbeiten, wie Sie es wollen. Der beste Ansatz (wie immer) ist:
    1. Verwendung [GenerateDatasetsXml](#generatedatasetsxml) und den Wert der Standardisierung angeben Was Sie gerne verwenden möchten.
    2. Verwendung [DasDds](#dasdds) um sicherzustellen, dass der Datensatz korrekt geladen und die Standardisierung reflektiert Welche Einstellung, die Sie angegeben haben.
    3. Testen Sie den Datensatz von Hand, wenn er in ERDDAP™ sicherzustellen, dass die betroffenen Variablen wie erwartet funktionieren.
         
* Risiken -
Optionen #256 und oben sind riskanter, d.h. es gibt eine größere Chance, dass ERDDAP™ wird eine Änderung vornehmen, die nicht gemacht werden sollte. Zum Beispiel, Option #2048 könnte versehentlich eine Variable mit Station ID-Strings konvertieren, die alle nur passieren, um ISO 8601 "compact" Termine aussehen (z.B., 20180102) ISO 8601 "extended" Datum ("2018-01-02") .
     
* Langsam nach einer Veränderung --
Da der Wert der Standardisierung Was ändert die Datenwerte, die EDDTableFromFiles für jede Datendatei sieht, wenn Sie die Standardisierung ändern Welche Einstellung, EDDTableFromFiles wird wegwerfen alle cached Informationen über jede Datei (die die min und max für jede Datengröße in jeder Datei enthält) und jede Datendatei erneut lesen. Wenn ein Datensatz eine große Anzahl von Dateien hat, kann dies sehr zeitaufwendig sein, so wird es lange dauern, bis der Datensatz zum ersten Mal neu geladen wird ERDDAP™ Nach der Änderung neu laden.
     
* Heuristik -
Die Optionen #256 und oben verwenden Heuristiken, um ihre Änderungen vorzunehmen. Wenn Sie über eine Situation kommen, in der die Heuristik eine schlechte Entscheidung treffen, senden Sie bitte eine Beschreibung des Problems an Chris. John bei Noaa. Wir können die Heuristik verbessern.
     
* Alternative --
Wenn eine der standardizeWelche Optionen kein Problem für einen bestimmten Datensatz löst, können Sie das Problem lösen, indem Sie ein [ .nc ml Datei](#ncml-files) Parallel zu jeder Datendatei und Definition von Änderungen an den Dateien, so dass die Dateien konsistent sind. Dann sagen Sie dem EDDTableFrom... Dateien-Datensatz zur Aggregation .nc ml Dateien.
    
Oder, verwenden [ NCO ](#netcdf-operators-nco) tatsächlich Änderungen an den Dateien vornehmen, so dass die Dateien konsistent sind.
        
##### Separate Säulen für Jahr, Monat, Datum, Stunde, Minute, Zweit{#separate-columns-for-year-month-date-hour-minute-second} 
Es ist ziemlich üblich für tabellarische Datendateien separate Spalten für Jahr, Monat, Datum, Stunde, Minute, Sekunde haben. Vor ERDDAP™ v2.10, die einzige Lösung war, die Datendatei zu bearbeiten, um diese Spalten in eine einheitliche Zeitspalte zu kombinieren. mit ERDDAP™ 2.10+, können Sie die
(&lt; sourceName &gt;=============================================================================================================================================================================================================================================================== *Ausdruck* &lt; sourceName &gt; (#sourcename) zu sagen ERDDAP™ wie Sie die Quellspalten kombinieren, um eine einheitliche Zeitspalte zu erstellen, so dass Sie die Quelldatei nicht mehr bearbeiten müssen.
##### &lt;ScheckHeaderToRegex&gt;{#skipheadertoregex} 
* (&lt;SkipHeaderToRegex&gt; (#skipheadertoregex) --
OPTIONAL. (Für EDDTableFromAsciiFiles und EDDTableFromColumnarAsciiFiles nur Datensätze.)   
Wenn EDDTableFromAsciiFiles eine Datendatei liest, wird es alle Zeilen bis und einschließlich der Zeile ignorieren, die diesem regulären Ausdruck entspricht. Der Standard ist ", was diese Option nicht nutzt. Ein Beispiel ist
```
    <skipHeaderToRegex>\\\*\\\*\\\* END OF HEADER.\\*<skipHeaderToRegex>  
```
die alle Zeilen bis und einschließlich einer Zeile ignorieren wird, die mit "\\*\\*\\* END DER HEADER".

Wenn Sie diesen Tag verwenden,&lt;SpalteNamesRow&gt; und&lt;firstDataRow&gt; fungieren als wenn der Header entfernt wurde, bevor die Datei gelesen wird. Sie würden beispielsweise SpalteNamesRow=0 verwenden, wenn die Spaltennamen direkt nach dem Header in der Zeile stehen.

Wenn Sie verwenden möchten generieren Datensätze Xml mit einem Datensatz, der diesen Tag benötigt:

1. Machen Sie eine neue, temporäre, Sample-Datei, indem Sie eine bestehende Datei kopieren und den Header entfernen.
2. Start generieren Datensätze Xml und geben Sie diese Musterdatei an.
3. Manuelles Hinzufügen der&lt;skipHeaderToRegex&gt; tag zum datasets.xml Blödsinn.
4. Löschen Sie die temporäre, Musterdatei.
5. Verwenden Sie den Datensatz in ERDDAP .
##### &lt;SkipLinesRegex&gt;{#skiplinesregex} 
OPTIONAL. (Für EDDTableFromAsciiFiles und EDDTableFromColumnarAsciiFiles nur Datensätze.)   
Wenn EDDTableFromAsciiFiles eine Datendatei liest, wird es alle Zeilen ignorieren, die diesem regulären Ausdruck entsprechen. Der Standard ist ", was diese Option nicht nutzt. Ein Beispiel ist
```
    <skipLinesRegex>#.\\*<skipLinesRegex>  
```
die alle Zeilen ignorieren, die mit "#" beginnen.

Wenn Sie diesen Tag verwenden,&lt;SpalteNamesRow&gt; und&lt;firstDataRow&gt; fungieren, als ob alle übereinstimmenden Zeilen entfernt worden wären, bevor die Datei gelesen wird. Zum Beispiel würden Sie die SpalteNamesRow=0 verwenden, auch wenn es mehrere Zeilen gibt, die zum Beispiel mit "#" beginnen.
    
#### EDDTableFromFiles Skelett XML{#eddtablefromfiles-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;nDimensions>...&lt;/nDimensions>  &lt;!-- This was used prior to ERDDAP™  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version 1.30, but is now ignored. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromFiles subclasses, this uses Java's WatchDirectory system  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;standardizeWhat>](#standardizewhat)...&lt;/standardizeWhat> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;specialMode>*mode*&lt;/specialMode>  &lt;-- This rarely-used, OPTIONAL tag  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;can be used with EDDTableFromThreddsFiles to specify that special,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hard-coded rules should be used to determine which files should  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;be downloaded from the server. Currently, the only valid *mode*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is SAMOS which is used with datasets from  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://tds.coaps.fsu.edu/thredds/catalog/samos to download only the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files with the last version number. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  &lt;-- For subclasses like  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromHyraxFiles and EDDTableFromThreddsFiles, this is where  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you specify the base URL for the files on the remote server.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For subclasses that get data from local files, ERDDAP™ doesn't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this information to get the data, but does display the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;information to users. So I usually use "(local files)". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data file names, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get metadata  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;charset>...&lt;/charset>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This OPTIONAL tag specifies the character set (case  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sensitive!) of the source files, for example, ISO-8859-1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default) and UTF-8.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipHeaderToRegex>](#skipheadertoregex)...&lt;/skipHeaderToRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipLinesRegex>](#skiplinesregex)...&lt;/skipLinesRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNamesRow>...&lt;/columnNamesRow> &lt;-- (For EDDTableFromAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the row with the column  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;names in the files. (The first row of the file is "1".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default = 1.)  If you specify 0, ERDDAP™ will not look for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;column names and will assign names: Column#1, Column#2, ... -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;firstDataRow>...&lt;/firstDataRow>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the first row with data in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. (The first row of the file is "1". Default = 2.) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dimensionsCSV>...&lt;/dimensionsCSV> &lt;-- (For EDDTableFromNcFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and EDDTableFromMultidimNcFiles only) This is a comma-separated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list of dimension fullNames. If specified, ERDDAP™ will only read  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variables in the source files which use some or all of these  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions, plus all of the scalar variables. If a dimension  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is in a group, you must specify its fullName,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g., "*groupName/dimensionName*". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The next four tags are DEPRECATED. For more information, see  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[File Name Extracts](#filename-sourcenames). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;preExtractRegex>...&lt;/preExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;postExtractRegex>...&lt;/postExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractRegex>...&lt;/extractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNameForExtract>...&lt;/columnNameForExtract>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortedColumnSourceName>...&lt;/sortedColumnSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The [sourceName](#sourcename) of the numeric column that the data files are  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;usually already sorted by within each file, for example, "time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Don't specify this or use an empty string if no variable is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suitable. It is ok if not all files are sorted by this column.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If present, this can greatly speed up some data requests.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromHyraxFiles, EDDTableFromNcFiles and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, this must be the leftmost (first) axis variable.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromMultidimNcFiles ignores this because it has a better  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;system. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortFilesBySourceNames>...&lt;/sortFilesBySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- This is a space-separated list of [sourceName](#sourcename)s  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which specifies how the internal list of files should be sorted  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(in ascending order), for example "id time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is the minimum value of the specified columns in each file  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;that is used for sorting.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When a data request is filled, data is obtained from the files  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in this order. Thus it determines the overall order of the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the response.  If you specify more than one column name, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;second name is used if there is a tie for the first column; the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;third is used if there is a tie for the first and second  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;columns; ... This is OPTIONAL (the default is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fileDir+fileName order). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For EDDTableFromHyraxFiles, EDDTableFromMultidimNcFiles,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromNcFiles, EDDTableFromNccsvFiles, and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, the source's axis variables (for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;example, time) needn't be first or in any specific order. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromAsciiService{#eddtablefromasciiservice} 
 [ **EDDTableFromAsciiService** ](#eddtablefromasciiservice) im wesentlichen ein Siebschaber ist. Es soll sich um Datenquellen handeln, die einen einfachen Webdienst zur Anforderung von Daten haben (oft ein HTML-Formular auf einer Webseite) und die die Daten in einem strukturierten ASCII-Format zurückgeben können (z.B. ein Komma-Separated-Wert oder Kolumnar ASCII Textformat, oft mit anderen Informationen vor und/oder nach den Daten) .

EDDTableFromAsciiService ist die Superklasse aller EDDTableFromAsciiService... Klassen. Sie können EDDTableFromAsciiService nicht direkt verwenden. Verwenden Sie stattdessen eine Unterklasse von EDDTableFromAsciiService, um bestimmte Arten von Dienstleistungen zu bewältigen:

*    [EDDTableFromAsciiServiceNOS](#eddtablefromasciiservicenos) erhält Daten von NOAA NOS ASCII-Dienste.

Derzeit werden keine anderen Servicetypen unterstützt. Aber es ist in der Regel relativ einfach, andere Dienste zu unterstützen, wenn sie in ähnlicher Weise arbeiten. Kontaktieren Sie uns, wenn Sie eine Anfrage haben.

#### Details{#details} 
Die folgenden Informationen gelten für alle Unterklassen von EDDTableFromAsciiService.

* Einschränkungen -- ERDDAP™ tabellarische Datenanforderungen können Einschränkungen auf jede Variable setzen. Der zugrunde liegende Dienst kann oder darf keine Einschränkungen für alle Variablen zulassen. Viele Dienstleistungen unterstützen z.B. nur die Einschränkungen bei den Stationsnamen, der Breite, der Länge und der Zeit. Wenn also eine Unterklasse von EDDTableFromAsciiService eine Anforderung für eine Untermenge eines Datensatzes erhält, geht sie dem Quelldatendienst möglichst viele Einschränkungen über und wendet dann die übrigen Einschränkungen auf die vom Dienst zurückgegebenen Daten an, bevor sie die Daten an den Benutzer übergeben.
* Gültige Reichweite -- Im Gegensatz zu vielen anderen Datensätzen kennt EDDTableFromAsciiService in der Regel nicht den Datenbereich für jede Variable, so dass es nicht schnell Anfragen für Daten außerhalb des gültigen Bereichs ablehnen kann.
* Parsing the ASCII Text Response -- Wenn EDDTableFromAsciiService eine Antwort von einem ASCII Text Service erhält, muss es bestätigen, dass die Antwort das erwartete Format und die Informationen hat und dann die Daten extrahiert. Für diesen Datensatz können Sie das Format angeben, indem Sie verschiedene spezielle Tags im XML-Chunk verwenden:
    *   &lt;VorData1&gt; durch&lt;vorData10&gt; tags -- Sie können eine Reihe von Texten angeben (so viele wie Sie wollen, bis zu 10) dass EDDTableFromAsciiService im Header des ASCII-Textes suchen muss, der vom Dienst zurückgegeben wird,&lt;VorData1&gt; durch&lt;vorData10&gt;. Dies ist zum Beispiel nützlich, um zu überprüfen, ob die Antwort die erwarteten Variablen mit den erwarteten Einheiten enthält. Der letzte vorData-Tag, den Sie angeben, identifiziert den Text, der unmittelbar vor dem Start der Daten auftritt.
    *   &lt;nachDaten&gt; -- Dies gibt den Text an, den EDDTableFromAsciiService im von dem Dienst zurückgegebenen ASCII-Text suchen wird, der das Ende der Daten bedeutet.
    *   &lt;Keine Daten -- Findet EDDTableFromAsciiService diesen Text im vom Service zurückgegebenen ASCII-Text, so ergibt sich daraus, dass keine Daten vorliegen, die der Anfrage entsprechen.
#### EDDTableFromAsciiService skeleton XML{#eddtablefromasciiservice-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromAsciiService..." [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData1>...&lt;beforeData1> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData10>...&lt;beforeData10> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;afterData>...&lt;afterData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;noData>...&lt;noData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromAsciiServiceNOS{#eddtablefromasciiservicenos} 
 [ **EDDTableFromAsciiServiceNOS** ](#eddtablefromasciiservicenos) macht EDDTable-Datensätze aus den von NOAA ' [National Ocean Service (NOS) ](https://oceanservice.noaa.gov/) . Informationen darüber, wie diese Klasse funktioniert und wie sie verwendet wird, siehe die Superklasse dieser Klasse [EDDTableFromAsciiService](#eddtablefromasciiservice) . Es ist unwahrscheinlich, dass jeder andere als Bob Simons diese Unterklasse verwenden muss.

Da die Daten innerhalb der Antwort eines NOS-Dienstes ein spaltäres ASCII-Textformat verwenden, müssen andere Datenvariablen als Breite und Länge ein spezielles Attribut aufweisen, das angibt, welche Zeichen jeder Datenzeile die Daten dieser Variablen enthalten, beispielsweise
```
<att name="responseSubstring">17, 25</att>  
```
 
### EDDTableFromAllDatasets{#eddtablefromalldatasets} 
 [ **EDDTableFromAllDatasets** ](#eddtablefromalldatasets) ist ein höherwertiger Datensatz, der Informationen über alle anderen Datensätze hat, die aktuell in Ihrem ERDDAP . Im Gegensatz zu anderen Arten von Datensätzen gibt es keine Spezifikation für die allDatasets Datensatz in datasets.xml . ERDDAP™ automatisch einen EDDTableFromAllDatasets Datensatz (mit datasetID = allDatasets ) . So eine allDatasets Datensatz wird in jedem ERDDAP™ Installation und wird in jedem ERDDAP™ Installation.

Die allDatasets dataset ist ein tabellarischer Datensatz. Es hat eine Reihe von Informationen für jeden Datensatz. Es hat Spalten mit Informationen über jeden Datensatz, z. datasetID , zugänglich, Institution, Titel, minLongitude, maxLongitude, minLatitude, maxLatitude, minTime, maxTime, etc. Weil allDatasets ist ein tabellarischer Datensatz, Sie können ihn genauso abfragen, wie Sie jede andere tabellarische Datenmenge in ERDDAP™ , und Sie können den Dateityp für die Antwort angeben. Dadurch können Benutzer nach Datensätzen von Interesse auf sehr leistungsfähige Weise suchen.
 
### EDDTableFromAsciiFiles{#eddtablefromasciifiles} 
 [ **EDDTableFromAsciiFiles** ](#eddtablefromasciifiles) aggregiert Daten aus Komma-, Tab-, Semikolon- oder platzgetrennten tabellarischen ASCII-Datendateien.

* Meistens haben die Dateien Spaltennamen in der ersten Zeile und Daten beginnend in der zweiten Zeile. (Hier wird die erste Zeile der Datei als Zeilennummer 1 bezeichnet.) Aber Sie können&lt;SpalteNamesRow&gt; und&lt;firstDataRow&gt; in Ihrem datasets.xml Datei, um eine andere Zeilennummer anzugeben.
*    ERDDAP™ die Zeilen der Daten unterschiedliche Zahlen von Datenwerten haben. ERDDAP™ nimmt an, dass die fehlenden Datenwerte die letzten Spalten in der Zeile sind. ERDDAP™ die standardmäßigen fehlenden Werte für die fehlenden Datenwerte zuordnet. (hinzugefügt v1.56) 
* ASCII-Dateien sind einfach zu arbeiten, aber sie sind nicht die effizienteste Weise, um Daten zu speichern / zu speichern. Für mehr Effizienz speichern Sie die Dateien als NetCDF V3 .nc Dateien (mit einer Dimension, "row", geteilt durch alle Variablen) statt. Sie können [Verwendung ERDDAP™ die neuen Dateien zu generieren](#millions-of-files) .
* Sehen Sie die Superklasse dieser Klasse, [EDDTableFromFiles](#eddtablefromfiles) , für Informationen, wie diese Klasse funktioniert und wie sie verwendet werden.
* Wir empfehlen dringend die Verwendung der [Datensätze generieren Xml Programm](#generatedatasetsxml) einen groben Entwurf der datasets.xml für diesen Datensatz. Aufgrund des gesamten Fehlens von Metadaten in ASCII-Dateien müssen Sie immer die Ergebnisse von GenerateDatasetsXml bearbeiten.
* WARNING: Wann ERDDAP™ liest ASCII-Datendateien, wenn es einen Fehler auf einer bestimmten Zeile findet (z.B. falsche Anzahl von Gegenständen) , es protokolliert eine Warnmeldung ("WARNUNG: Schlechte Linie (S) der Daten" ... mit einer Liste der schlechten Linien auf folgenden Zeilen) in der [log.txt Datei](/docs/server-admin/additional-information#log) und dann weiter den Rest der Datendatei lesen. So ist es Ihre Verantwortung, regelmäßig zu schauen (oder ein Skript schreiben, um dies zu tun) für diese Nachricht im Protokoll. txt, damit Sie die Probleme in den Datendateien beheben können. ERDDAP™ wird so eingerichtet, dass die Benutzer weiterhin alle verfügbaren gültigen Daten lesen können, obwohl einige Zeilen der Datei Fehler haben.
     
### EDDTableFrom AwsXmlFiles{#eddtablefromawsxmlfiles} 
 [ **EDDTableFrom AwsXmlFiles** ](#eddtablefromawsxmlfiles) aggregierte Daten von einem Satz von Automatischer Wetterstation (AWS) XML-Datendateien mit der WeatherBug Rest XML API (die nicht mehr aktiv ist) .

* Diese Art von Datei ist eine einfache, aber ineffiziente Weise, um die Daten zu speichern, weil jede Datei in der Regel scheint die Beobachtung von nur einem Zeitpunkt enthalten. Es gibt also eine große Anzahl von Dateien. Wenn Sie die Leistung verbessern möchten, betrachten Sie konsolidierende Gruppen von Beobachtungen (Eine Woche?) in NetCDF V3 .nc Dateien (am besten: .nc Dateien mit der [CF Diskrete Sampling Geometrien (DSG) Contiguous Ragged Array Format](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) ) und Verwendung [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)   (oder [EDDTableFromNcCFFiles](#eddtablefromnccffiles) ) die Daten zu bedienen. Du kannst [Verwendung ERDDAP™ die neuen Dateien zu generieren](#millions-of-files) .
* Sehen Sie die Superklasse dieser Klasse, [EDDTableFromFiles](#eddtablefromfiles) , für Informationen, wie diese Klasse funktioniert und wie sie verwendet werden.
     
### EDDTableFromColumnarAsciiFiles{#eddtablefromcolumnarasciifiles} 
 [ **EDDTableFromColumnarAsciiFiles** ](#eddtablefromcolumnarasciifiles) aggregiert Daten aus tabellarischen ASCII-Datendateien mit festbreiten Spalten.

* Meistens haben die Dateien Spaltennamen in der ersten Zeile und Daten beginnend in der zweiten Zeile. Die erste Zeile/Reihe in der Datei wird Zeile #1 aufgerufen. Aber Sie können&lt;SpalteNamesRow&gt; und&lt;firstDataRow&gt; in Ihrem datasets.xml Datei, um eine andere Zeilennummer anzugeben.
* Die&lt; addAttributes &gt; je&lt; dataVariable &gt; für diese Datensätze sind diese beiden speziellen Attribute enthalten:
    
    *   &lt;att name="startColumn"&gt; *ganze* &lt;att&gt; -- gibt die Zeichenspalte in jeder Zeile an, die der Beginn dieser Datengröße ist.
    *   &lt;att name="stopColumn"&gt; *ganze* &lt;att&gt; -- gibt die Zeichenspalte in jeder Zeile an, die die 1 nach dem Ende dieser Datengröße ist.
    
Die erste Zeichenspalte wird Spalte #0 genannt.
Beispielsweise für diese Datei, die an Temperaturwerten anliegende Zeitwerte aufweist:
```
      0         1         2        <-- character column number 10's digit
      0123456789012345678901234567 <-- character column number 1's digit
      time                temp
      2014-12-01T12:00:00Z12.3
      2014-12-02T12:00:00Z13.6
      2014-12-03T12:00:00Z11.0
```
die Zeitdatengröße hätte
```
      <att name="startColumn">0<att>  
      <att name="stopColumn">20<att>  
```
und die Zeitdatenvariable
```
      <att name="startColumn">20<att>  
      <att name="stopColumn">24<att>  
```
Diese Attribute müssen nur für alle Variablen angegeben werden [Festwert](#fixed-value-sourcenames) und [Datei-Name-Quelle-Namen](#filename-sourcenames) Variablen.
* ASCII-Dateien sind einfach zu arbeiten, aber sie sind keine effiziente Möglichkeit, Daten zu speichern / zu speichern. Für mehr Effizienz speichern Sie die Dateien als NetCDF V3 .nc Dateien (mit einer Dimension, "row", geteilt durch alle Variablen) statt. Sie können [Verwendung ERDDAP™ die neuen Dateien zu generieren](#millions-of-files) .
* Sehen Sie die Superklasse dieser Klasse, [EDDTableFromFiles](#eddtablefromfiles) , für Informationen, wie diese Klasse funktioniert und wie sie verwendet werden.
* Wir empfehlen dringend die Verwendung der [Datensätze generieren Xml Programm](#generatedatasetsxml) einen groben Entwurf der datasets.xml für diesen Datensatz. Aufgrund der Schwierigkeit, die Start- und Endpositionen für jede Datenspalte zu bestimmen und den gesamten Mangel an Metadaten in ASCII-Dateien, müssen Sie immer die Ergebnisse von GenerateDatasetsXml bearbeiten.
     
### EDDTableFromHtpGet{#eddtablefromhttpget} 
EDDTable FromHttpGet unterscheidet sich von allen anderen Arten von Datensätzen in ERDDAP™ dass es ein System hat, bei dem bestimmte "Autor" Daten hinzufügen, Daten überarbeiten oder Daten aus dem Datensatz durch regelmäßig löschen können HTTP GET oder [POST](#http-post) Anfragen von einem Computerprogramm, einem Skript oder einem Browser. Der Datensatz ist von Benutzern in der gleichen Weise abfragbar, dass alle anderen EDDTable-Datensätze in ERDDAP . Siehe die Beschreibung der Superklasse dieser Klasse, [EDDTableFromFiles](#eddtablefromfiles) , um über die Merkmale zu lesen, die von dieser Superklasse geerbt werden.

Die einzigartigen Eigenschaften von EDDTableFromHtpGet werden unten beschrieben. Sie müssen alle diesen ersten Abschnitt lesen und verstehen; andernfalls können Sie unrealistische Erwartungen haben oder sich in Schwierigkeiten, die schwer zu beheben ist.

#### Vorgesehener Einsatz{#intended-use} 
Dieses System ist für:

* Tabelle (in situ) Daten, nicht gegitterte Daten.
* Echtzeitdaten -
Ziel ist es, einen Autor zu ermöglichen (z.B. der Sensor, ein automatisiertes QC-Skript oder ein bestimmter Mensch) eine Änderung des Datensatzes vornehmen (über eine [.insert oder .delete Befehl](#insert-and-delete) ) und diese Änderung zugänglich machen ERDDAP™ Benutzer, alle in weniger als 1 Sekunde, und möglicherweise viel schneller. Die meisten dieser 1 Sekunde ist die Netzwerkzeit. ERDDAP™ kann die Anfrage in ca. 1 ms bearbeiten und die Daten sind den Benutzern sofort zugänglich. Das ist ein [schnell](#httpget-speed) , [robust](#robust) , und [zuverlässiges System](#system-reliability) .
* Fast jede Häufigkeit von Daten -
Dieses System kann selten Daten akzeptieren (z.B. täglich) durch sehr häufige Daten (z.B. 100 Hz Daten) . Wenn Sie das System optimieren, kann es höhere Frequenzdaten verarbeiten (vielleicht 10 KHz-Daten, wenn Sie zu Extremen gehen) .
* Daten aus einem Sensor oder einer Sammlung ähnlicher Sensoren.
*    [Ausführung](#versioning) / [Reproduzierbare Wissenschaft](https://en.wikipedia.org/wiki/Reproducibility) / DOI --
Situationen, in denen Sie Änderungen an den Daten vornehmen müssen (z.B. ein Qualitätskontroll-Flag ändern) , wissen, welchen Autor jede Änderung vorgenommen hat, wissen Sie, wann der Autor die Änderung vorgenommen hat, und (auf Anfrage) die ursprünglichen Daten vor der Änderung sehen zu können. Daher sind diese Datensätze für [ DOI S](https://en.wikipedia.org/wiki/Digital_object_identifier) . weil sie DOI Anforderung, dass der Datensatz nicht verändert wird, außer durch Aggregation. In der Regel sind nahe Echtzeit-Datensätze nicht für DOI s, weil die Daten oft rückwirkend geändert werden (z.B. für QA/QC Zwecke) .
     

Sobald Daten in einem EDDTableFromHtpGet-Datensatz sind, kann jeder Benutzer Daten in der gleichen Weise anfordern, dass er Daten von einem anderen EDDTable-Datensatz anfordert.
     
#### Experimentell: Sei vorsichtig{#experimental-be-careful} 
Da dieses System neu ist und verlorene Umweltdaten nicht benötigt werden können, sollten Sie EDDTableFromHttpGet als Experimental behandeln. Wenn Sie von einem anderen System wechseln, führen Sie bitte das alte System und das neue System parallel, bis Sie zuversichtlich sind, dass das neue System gut funktioniert (Wochen oder Monate, nicht nur Stunden oder Tage) . In allen Fällen stellen Sie sicher, dass Ihr System separat die .insert und .delete URLs archiviert, die an den EDDTableFromHtpGet-Datensatz gesendet werden. (auch wenn nur in den Apache- und/oder Tomcat-Logs) zumindest für eine Weile. Und in allen Fällen stellen Sie sicher, dass die von Ihrem EDDTableFromHtpGet-Datensatz erstellten Datendateien routinemäßig auf externe Datenspeicher gesichert werden. (Anmerkung: [rsync](https://en.wikipedia.org/wiki/Rsync) . kann die von EDDTableFromHtpGet erstellten Datendateien sehr effizient sichern.)   
     
#### .insert und .delete{#insert-and-delete} 

Für jeden Datensatz in ERDDAP™ , wenn Sie eine Anfrage senden ERDDAP™ für eine Untermenge der Daten in einem Datensatz geben Sie den Dateityp an, den Sie für die Antwort wünschen, z.B. .csv, .htmlTable , .nc , .json . EDDTableFromHtp Erweitern Sie dieses System, um zwei zusätzliche "Dateitypen" zu unterstützen, die einfügen können (oder ändern) oder Daten im Datensatz löschen:

* .insert
    * Die Anfrage wird wie eine Standard-HTML-Form-Antwort formatiert, mit Schlüssel=Wert-Paare, getrennt durch '&'. Zum Beispiel
        https://*some.erddap.url*/erddap/tabledap/myDataset**.insert**?stationID=46088&time=2016-03-30T12:37:55Z&latitude=10.1&longitude=-150.1&airTemp=17.23&waterTemp=12.3&author=JohnSmith\\_someKey1  
sagt ERDDAP™ die Daten für stationID = 46088 für die angegebene Zeit.
    * Der Autor dieser Änderung ist JohnSmith und der Schlüssel ist someKey1.
    * Die URL muss gültige Werte enthalten (nicht fehlende Werte) für alle [ http Erforderliche Optionen](#httpgetrequiredvariables-global-attribute) 
    * Wenn die Werte der http Erforderlich Variablen in der Anfrage (z.B., stationID und Zeit) die Werte in einer Zeile bereits im Datensatz übereinstimmen, die neuen Werte überschreiben die alten Werte effektiv (obwohl die alten Werte noch zugänglich sind, wenn der Benutzer Daten von einem vorherigen anfordert [Version](#versioning) des Datensatzes) .
    * Die .insert URL darf niemals mit &timestamp= ( ERDDAP™ erzeugt diesen Wert) oder &command= (die von .insert angegeben wird (der Befehl = 0) oder (das Kommando= 1) ) .
    * Wenn die .insert-URL keine Werte für andere Spalten angibt, die sich im Datensatz befinden, werden diese als native fehlende Werte angenommen. (MAX\\_VALUE für ganze Datentypen, NaN für Schwimmer und Doppel, und "" für Streicher) .
             
    * .delete
        * Die Anfrage wird wie eine Standard-HTML-Form-Antwort formatiert, mit Schlüssel=Wert-Paare, getrennt durch '&'. Zum Beispiel
            https://*some.erddap.url*/erddap/tabledap/myDataset**.delete**?stationID=46088&time=2016-03-30T12:37:55Z&author=JohnSmith\\_someKey1  
sagt ERDDAP™ um die Daten zu löschen stationID = 46088 zum angegebenen Zeitpunkt.
        * Der Autor dieser Änderung ist JohnSmith und der Schlüssel ist someKey1.
        * Die URL muss die [ http Erforderliche Optionen](#httpgetrequiredvariables-global-attribute) auf Anfrage (z.B., stationID und Zeit) . Wenn diese Werte den Werten in einer Zeile bereits im Datensatz entsprechen (die sie normalerweise) , die alten Werte werden effektiv gelöscht (obwohl die alten Werte noch zugänglich sind, wenn ein Benutzer Daten von einem vorherigen anfordert [Version](#versioning) des Datensatzes) .
        * Es ist nicht erforderlich, Werte für Nicht-HttpGetRequiredVariables, außer Autor, anzugeben, die zur Authentifizierung der Anfrage erforderlich sind.
             
    
Details:
    * .insert und .delete Anfragen werden wie Standard-HTML-Form-Antworte formatiert, mit Schlüssel=Wert-Paare, getrennt durch '&'. Die Werte müssen [Prozent kodiert](https://en.wikipedia.org/wiki/Percent-encoding) . So müssen Sie spezielle Zeichen in das Formular %HH kodieren, wobei HH der 2stellige hexadezimale Wert des Zeichens ist. Normalerweise müssen Sie nur ein paar der Pünktlichkeitszeichen umwandeln: % in %25, & in %26, " in %22,&lt;in %3C, = in %3D, &gt; in %3E, + in %2B, | in %7C, \\[ in %5B, \\] in %5D, Raum in %20, und alle Zeichen über #127 in ihr UTF-8-Formular umwandeln und dann prozentual jeden Byte des UTF-8-Formulars in das %HH-Format kodieren (einen Programmierer um Hilfe bitten) .
    * .insert und .delete Anfragen müssen die [ http Erforderliche Optionen](#httpgetrequiredvariables-global-attribute) , z. stationID und Zeit. Bei .insert-Anfragen werden als fehlende Werte Variablen angenommen, die in der Anfrage nicht angegeben sind. (MAX\\_VALUE für ganzzahlige Variablen, NaN für Schwimmer und Doppelvariablen und eine leere String für Streichvariablen) . Für .delete Anfragen, Werte für nicht-HttpGetErforderlich Variablen (außer Autor, der erforderlich ist) werden ignoriert.
    * .insert und .delete Anfragen müssen den Namen des Autors und den Schlüssel des Autors über einen Parameter in der Form auto= *Autor:* als letzter Parameter in der Anfrage. Letztes Ersuchen stellt sicher, dass die gesamte Anfrage eingegangen ist ERDDAP . Nur der Autor (nicht der Schlüssel) wird in der Datendatei gespeichert. Sie müssen die Liste der erlaubt *Autor:* 's über das globale Attribut [ http GetKeys](#httpgetkeys) 
    * .insert und .delete Parameter können skalar sein (nur) Werte oder Arrays jeder Länge in der Form \\[ Wert1, Wert2, Wert3,..., WertN \\] . Für eine bestimmte Anforderung müssen alle Variablen mit Arrays Arrays mit der gleichen Anzahl von Werten aufweisen (sonst ist es ein Fehler) . Wenn eine Anforderung Skalar- und Array-Werte hat, werden die Skalarwerte repliziert, um Arrays mit der gleichen Länge wie die angegebenen Arrays zu werden, z.B. & stationID = 46088 könnte als & behandelt werden stationID = \\[ 46088,46088,46088 \\] . Arrays sind der Schlüssel zu [hoher Durchsatz](#httpget-speed) . Ohne Arrays wird es schwierig sein, .insert oder .delete mehr als 8 Datenzeilen pro Sekunde von einem entfernten Autor (wegen der ganzen Oberleitung des Netzes) . Mit Arrays wird es einfach sein, .insert oder .delete mehr als 1000 Datenzeilen pro Sekunde von einem entfernten Sensor.
    * .insert und .delete akzeptieren (ohne Fehlermeldung) schwimmende Punktzahlen, wenn ganze Zahlen erwartet werden. In diesen Fällen rundet der Datensatz die Werte auf ganze Zahlen.
    * .insert und .delete akzeptieren (ohne Fehlermeldung) ganzzahlige und schwimmende Punktzahlen, die außerhalb des Datentyps der Variablen liegen. In diesen Fällen speichert der Datensatz die Werte als ERDDAP "Native fehlende Werte für diesen Datentyp (MAX\\_VALUE für ganze Typen und NaN für Schwimmer und Doppel) .
         
#### Antwort{#response} 
Wenn die .insert oder .delete URL erfolgreich ist, wird der HTTP-Antwortcode 200 sein. (Okay.) und die Antwort wird Text mit .json Objekt, z.B.
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-11-05T22:12:19.517Z",
    "numericTimestamp":1.541455939517+E9
    }
```
Beachten Sie, dass die Zeitstempel Millisekundengenauigkeit haben.

Wenn die .insert oder .delete URL ausfällt, erhalten Sie einen HTTP-Antwortcode außer 200 (Okay.) , z.B. Fehler 403 Verbieten Sie, wenn Sie einen falschen Autor\\_key Wert einreichen. ERDDAP™ sendet den HTTP-Antwortcode (nicht, z.B., a .json formatiert Fehler) weil so die Dinge im Internet gemacht werden und weil Fehler überall im System auftreten können (z.B. im Netzwerk, das einen HTTP-Fehler zurückgibt) . Wenn der Fehler aus ERDDAP™ , die Antwort kann einen Text enthalten (nicht .json ) mit einer ausführlicheren Erklärung, was schief ging, aber der HTTP-Antwortcode (200=Okay, alles andere ist Ärger) ist der richtige Weg, um zu überprüfen, ob die .insert oder .delete erfolgreich ist. Wenn die Überprüfung des HTTP-Antwort-Codes nicht möglich ist oder unbequem ist, suchen Sie nach "Status":"erfolg" im Antworttext, der ein verlässlicher Hinweis auf Erfolg sein sollte.
    
#### Logfiles{#log-files} 
Wenn EDDTableFromHttpGet .insert und .delete Befehle erhält, wird die Information einfach in einer Reihe von Logdateien an die betreffende Datei angehängt, von denen jede eine Tabelle ist, die in einer [JSON Zeilen CSV-Datei](https://jsonlines.org/examples/) . Wenn ein Benutzer eine Datenanforderung stellt, ERDDAP™ schnell die entsprechenden Protokolldateien liest, die Änderungen des Datensatzes in der von ihnen erstellten Reihenfolge anwendet und dann die Anfrage über die Einschränkungen des Benutzers wie jede andere filtert ERDDAP™ Datenanforderung. Die Partitionierung der Daten in verschiedene Log-Dateien, die Speicherung von verschiedenen Informationen (z.B. der Zeitstempel des Befehls, und ob der Befehl .insert oder .delete war) , und verschiedene Aspekte der Einrichtung des Datensatzes, alle ermöglichen, ERDDAP Daten von diesem Datensatz sehr schnell und sehr effizient speichern und abrufen.
     
#### Sicherheit und Autor{#security-and-author} 
Jeder .insert- und .delete-Befehl muss &author= *Autor:* als letzter Parameter, in dem Autor\\_key aus der Kennung des Autors zusammengesetzt ist (Sie wählten: Name, Initialen, Pseudonym, Nummer) , einen Unterstrich und einen geheimen Schlüssel. Die ERDDAP™ Administrator arbeitet mit Autoren zusammen, um die Liste der gültigen Autor\\_key-Werte zu erstellen, die jederzeit geändert werden können.
Wenn EDDTableFromHtpGet einen .insert oder .delete Befehl erhält, stellt es sicher, dass der AutorID\\_key der letzte Parameter ist und gültig ist. Weil es der letzte Parameter ist, gibt es an, dass die gesamte Befehlszeile erreicht ist ERDDAP™ und wurde nicht gekürzt. Der geheime Schlüssel sorgt dafür, dass nur bestimmte Autoren Daten in den Datensatz einfügen oder löschen können. ERDDAP™ dann extrahiert die AutorID und speichert das in der Autorvariable, so dass jeder sehen kann, wer für eine bestimmte Änderung des Datensatzes verantwortlich war.
.insert und .delete Befehle können nur über https:   (Sicherheit)   ERDDAP™ URLs. Dadurch wird sichergestellt, dass die übertragenen Informationen während des Transports geheim gehalten werden.
     
#### Zeitstempel{#timestamp} 
Im Rahmen des Log-Systems fügt EDDTableFromHtpGet einen Zeitstempel hinzu (die Zeit, die ERDDAP die Anfrage erhalten) zu jedem Befehl, dass es in den Log-Dateien speichert. Weil ERDDAP™ generiert den Zeitstempel, nicht die Autoren, es spielt keine Rolle, wenn verschiedene Autoren Änderungen von Computern mit Uhren auf etwas unterschiedliche Zeiten eingestellt machen. Der Zeitstempel gibt zuverlässig an, wann die Änderung an den Datensatz vorgenommen wurde.
     
#### POST{#http-post} 
*    ["Was ist mit HTTP POST?"](#http-post)   
HTTP [POST](https://en.wikipedia.org/wiki/POST_(HTTP) ) die bessere Alternative (verglichen mit HTTP GET ) zum Senden von Informationen von einem Client an einen HTTP-Server. Wenn Sie können, oder wenn Sie wirklich die Sicherheit verbessern möchten, verwenden Sie POST anstelle von GET, um die Informationen an ERDDAP . POST ist sicherer, weil: mit GET und https , die URL wird sicher übertragen, aber die gesamte URL (einschließlich der Parameter, einschließlich des Autors\\_key) wird in den Apache geschrieben, Tomcat und ERDDAP™ Log-Dateien, wo jemand sie lesen konnte, wenn die Dateien nicht richtig gesichert sind. Mit POST werden die Parameter sicher übertragen und nicht in die Protokolldateien geschrieben. POST ist ein wenig schwieriger für Kunden zu arbeiten und wird nicht so weit von Client-Software unterstützt, aber Programmiersprachen unterstützen es. Der Inhalt, den Sie über GET oder POST an den Datensatz senden, wird gleich sein, einfach anders formatiert.
     
####  http Erforderlich Variables Globales Attribut{#httpgetrequiredvariables-global-attribute} 
Ein wesentlicher Teil dessen, was diese ganze Systemarbeit macht, ist das notwendige globale Attribut http Erforderlich Variablen, die eine Komma getrennte Liste der dataVariable Quellnamen, die eine Reihe von Daten eindeutig identifizieren. Dies sollte möglichst minimal sein und fast immer die Zeitvariable beinhalten. Zum Beispiel sind hier die empfohlenen http Erforderlich Variablen für jede der [CF Diskrete Sampling Geometrien (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)   (Natürlich können die ID-Namen in Ihrem Datensatz unterschiedlich sein.) :

* Für die TimeSerie: stationID , Zeit
* Für Trajektorie: trajectoryID, Zeit
* Für Profil: Zeit (vorausgesetzt Zeit ist das Profil\\_id) , Tiefe
* Für die Zeitreihen Profil: stationID , Zeit (vorausgesetzt Zeit ist das Profil\\_id) , Tiefe
* Für Trajektorie Profil: trajectoryID, Zeit (vorausgesetzt Zeit ist das Profil\\_id) , Tiefe

    
TimeSerie als Beispiel:
Bei einem .insert Befehl, der stationID =46088 und Zeit=2016-06-23T19:53:00Z (und andere Werte für andere Variablen) :
* Gibt es für diese Station keine vorhandenen Daten und diese Zeit, so wird der Effekt die Daten zum Datensatz hinzufügen.
* Gibt es für diese Station bereits vorhandene Daten und diese Zeit, so wird der Effekt sein, die bestehende Datenreihe durch diese neuen Daten zu ersetzen. (Natürlich, seit ERDDAP™ hält das Protokoll von jedem Befehl, den er erhält, die alten Daten sind noch im Protokoll. Wenn ein Benutzer vor dieser Änderung Daten von einer Version des Datensatzes anfordert, werden die älteren Daten angezeigt.)   
         
####  http GetDirectoryStructure{#httpgetdirectorystructure} 
*    [ http GetDirectory Struktur Globales Attribut und Daten (Protokoll) Dateinamen](#httpgetdirectorystructure)   
Ein Teil dessen, was dieses ganze System effizient funktioniert, ist, dass ERDDAP™ erstellt einen Datensatz (Protokoll) Dateien, jeweils mit einem anderen Stück des Datensatzes. Wenn diese gut eingerichtet sind, ERDDAP™ kann schnell auf die meisten Datenanforderungen reagieren. Diese Einrichtung wird durch die http GetDirectoryStructure Global Attribut, das ist ein String, das wie ein relativer Dateiname aussieht, z.B. " stationID /10years", ist aber eigentlich eine Spezifikation für die Verzeichnisstruktur. Die Teile davon geben an, wie Verzeichnisse und Dateinamen für die Daten (Protokoll) Dateien werden erstellt.
    
    * Wenn ein Teil eine ganze Zahl ist (&gt;=============================================================================================================================================================================================================================================================== 1) plus eine ZeitPeriod (Millisekunden, Sekunde, Minute, Stunde, Datum, Monat, Jahr oder ihre Pluralen) , z.B. 10 Jahre, dann nimmt der EDDTableFromHtpGet-Datensatz den Zeitwert für die Datenzeile (z.B., 2016-06-23T19:53:00Z) , Berechnung der auf diese Genauigkeit verkürzten Zeit (z.B., 2010) , und machen Sie einen Ordner oder DateiName daraus.
        
Das Ziel ist es, ein ziemlich großes Stück Daten in jede Datei zu bekommen, aber weit weniger als 2GB.
        
    * Ansonsten muss der Teil der Spezifikation ein dataVariable ' sourceName , z. stationID . In diesem Fall macht EDDTableFromHtpGet einen Ordner oder Dateinamen aus dem Wert dieser Variablen für die neue Datenzeile (z.B. "46088") .
    
Weil die Befehlsdaten .insert und .delete in bestimmten Daten gespeichert werden (Protokoll) Dateien, EDDTableFromHtpGet muss in der Regel nur ein oder ein paar Daten öffnen (Protokoll) Dateien, um die Daten für eine bestimmte Benutzeranforderung zu finden. Und weil jede Daten (Protokoll) Datei hat alle relevanten Informationen für sein Stück des Datensatzes, es ist schnell und einfach für EDDTableFromHttpGet eine bestimmte Version zu machen (oder die aktuelle Version) des Datensatzes für die Daten in dieser Datei (und muss nicht die angeforderte Version des gesamten Datensatzes generieren) .
    
Allgemeine Leitlinien basieren auf der Menge und Häufigkeit der Daten. Wenn wir 100 Bytes pro Datenzeile annehmen, dann ...
``` 
    | Frequency  <br>of measurements | Recommended  <br>httpGetDirectoryStructure |
    | --- | --- |
    | \\>=1 per second | *featureID*/1year/1day |
    | \\>=1 per minute | *featureID*/2months |
    | \\>=1 per hour | *featureID*/10years |
    | \\>=1 per day | *featureID* |
```
Zum Beispiel, wenn die Verzeichnisstruktur stationID /2monate und Sie setzen Daten von zwei Stationen (46088 und 46155) mit Zeitwerten von Dezember 2015 bis Mai 2016, EDDTableFromHttp Get wird Verzeichnisse mit 46088 und 46155 erstellen und Dateien in jedem benannten 2015-11 erstellen .json L, 2016-01 .json L, 2016-03 .json L, 2016-05 .json L (je 2 Monate Daten für die betreffende Station) . Wenn Sie .insert oder .delete verwenden, um die Daten zu ändern oder zu löschen, zum Beispiel Station 46088 bei 2016-04-05T14:45:00Z, EDDTableFromHttp Holen Sie sich diesen Befehl an 46088/2016-03 .json l die relevanten Daten (Protokoll) Datei. Und klar ist es, in Zukunft jederzeit Daten für andere Stationen hinzuzufügen, da der Datensatz einfach zusätzliche Verzeichnisse erstellen wird, die benötigt werden, um die Daten von den neuen Stationen zu halten.
    
####  http GetKeys{#httpgetkeys} 
Jedes EDDTable VonHtp Erhalten Sie Datensatz muss ein globales Attribut http GetKeys, die die Liste der erlaubten Autoren und ihre geheimen Schlüssel als eine komparierte Liste von *Autor:* , z. JohnSmith\\_someKey1, HOBOLogger\\_someKey2, QCScript59\\_someKey3 .
* autor\\_key's sind case-sensitive und müssen vollständig ASCII Zeichen sein (#33 - #126, und ohne Komma, " oder " Zeichen
* Schlüssel sind wie Passwörter, so dass sie &gt;=8 Zeichen, schwer zu erraten, und ohne interne Wörterbuch Wörter. Sie sollten sie behandeln, wie Sie Passwörter behandeln -- halten sie privat.
* Das erste '\\_'-Zeichen trennt den Autor vom Schlüssel, so dass der Autorname kein '\\_'-Zeichen enthalten kann (aber ein Schlüssel kann) .
* Jeder Autor kann einen oder mehrere Autor\\_keys haben, z.B. JohnSmith\\_some Schlüssel 1, JohnSmith Schlüssel 7 usw.
* Sie können den Wert dieses Attributs jederzeit ändern. Die Änderungen wirken beim nächsten Laden des Datensatzes.
* Diese Informationen werden von den GlobalAttributes des Datensatzes entfernt, bevor sie veröffentlicht werden.
* Jede Anforderung an den Datensatz zum Einfügen oder Löschen von Daten muss ein &author= *Autor:* Parameter. nach Überprüfung der Gültigkeit des Schlüssels, ERDDAP™ speichert nur den Autor (nicht der Schlüssel) in der Datendatei.

#### Einrichten{#set-up} 

Hier sind die empfohlenen Schritte, um einen EDDTableFromHttpGet Datensatz einzurichten:

1. Machen Sie das Hauptverzeichnis, um die Daten des Datensatzes zu halten. In diesem Beispiel verwenden wir /data/testGet/ . Der Benutzer läuft GenerateDatasetsXml und der Benutzer läuft ERDDAP™ muss beide den Zugriff auf dieses Verzeichnis haben.
     
2. Verwenden Sie einen Texteditor, um eine Probe zu erstellen .json l CSV-Datei mit der Erweiterung .json In diesem Verzeichnis.
Der Name ist nicht wichtig. Zum Beispiel, Sie könnten es Probe nennen .json L
Machen Sie eine 2 Linie .json l CSV-Datei mit Spaltennamen auf der ersten Zeile und Dummy/typischen Werten (der korrekten Datenart) auf der zweiten Linie. Hier ist eine Probendatei, die für eine Sammlung von featureType =TimeSerie Daten, die Luft und Wassertemperatur gemessen.
     \\[ Für featureType =Trajektory, du könntest ändern stationID um trajectoryID zu sein. \\]   
     \\[ Für featureType = Profil, du könntest ändern stationID profilID sein und eine Tiefenvariable hinzufügen. \\] 
    
     \\[ " stationID ", "time" , "Latitude", "longitude", "airTemp", "waterTemp", "Timestamp", "Autor", "Befehl" \\] 
     \\[ "myStation", "2018-06-25T17:00Z", 0.0, 0.0, 0.0, 0.0, 0.0, "SomeBody", 0 \\] 
    
Anmerkung:
    * Die tatsächlichen Datenwerte sind nicht wichtig, weil Sie diese Datei schließlich löschen, aber sie sollten vom richtigen Datentyp sein. Insbesondere sollte die Zeitvariable das gleiche Format verwenden, das die tatsächlichen Daten aus der Quelle verwenden.
    * Für alle Variablen, die sourceName wird gleich sein destinationName , so verwenden Sie jetzt die richtigen/finalen Variablennamen, einschließlich Zeit, Breite, Länge und manchmal Tiefe oder Höhe, wenn Variablen mit diesen Informationen enthalten werden.
    * Es wird fast immer eine Variable namens Zeit geben, die die Zeit der Beobachtung aufzeichnet. Es kann sein dataTyp String mit [Einheiten geeignet für Stringzeiten](#string-time-units)   (z.B., yyyy-MM-dd 'T'HH:mm:ss.SSSZ) oder Daten Typ Doppel mit [Einheiten geeignet für numerische Zeiten](#time-units)   (z.B., Sekunden seit 1970-01-01T00:00Z, oder eine andere Basiszeit) .
    * Drei der Spalten (in der Regel die letzten drei) muss Zeitstempel, Autor, Befehl sein.
    * Die Zeitstempelspalte wird von EDDTableFromHttpGet verwendet, um einen Zeitstempel hinzuzufügen, der anzeigt, wann er eine bestimmte Datenzeile in die Datendatei eingefügt hat. Es wird DatenTyp Doppel-und Einheiten Sekunden seit 1970-01-01T00:00Z.
    * Die Autorenspalte mit dataType String wird verwendet, um festzustellen, welche autorisierten Autoren die Daten dieser Zeile zur Verfügung gestellt haben. Autoren werden von der [ http GetKeys globales Attribut](#httpgetkeys) . Obwohl die Schlüssel als *Autor:* und sind in der "Request" URL in diesem Formular, nur der Autor Teil wird in der Datendatei gespeichert.
    * Die Befehlsspalte mit dataTyp Byte gibt an, ob die Daten auf dieser Zeile ein Einfügen sind (0)) oder eine Löschung (1) .
         
3. Generieren Sie Datasets Xml und sagen es
    
    1. Der Datensatz-Typ ist EDDTableFromHtpGet
    2. Das Verzeichnis ist (für dieses Beispiel) /Daten/Test Steigt ein
    3. Die Stichprobendatei ist (für dieses Beispiel) /data/testGet/startup .json L
    4. Die http Erforderlich Variablen sind (für dieses Beispiel)   stationID , Zeit Siehe die Beschreibung [ http Erforderliche Optionen](#httpgetrequiredvariables-global-attribute) unten.
    5. Wenn die Daten alle 5 Minuten erhoben werden, http GetDirectoryStructure für dieses Beispiel ist stationID /2monate . Siehe die Beschreibung [ http GetDirectoryStructure](#httpgetdirectorystructure) unten.
    6. Die [ http GetKeys](#httpgetkeys) 
    
Ausgabe hinzufügen (das Stück datasets.xml für den Datensatz) bis datasets.xml .
     
4. Bearbeiten Sie die datasets.xml chunk für diesen Datensatz, um es richtig und vollständig zu machen.
Bemerkenswert, ersetzen alle?? mit korrektem Inhalt.
     
5. Für&lt;DateiTableInMemory&gt; Einstellung:
    * Legen Sie dies auf true, wenn der Datensatz in der Regel häufig .insert und/oder .delete Anfragen bekommen wird. (z.B. häufiger als einmal alle 10 Sekunden) . Dies hilft EDDTableFromHtpGet schneller auf .insert und/oder .delete Anfragen reagieren. Wenn Sie dies auf true setzen, wird EDDTableFromHttpGet die Datei noch speichernTabelle und verwandte Informationen auf Festplatte periodisch (nach Bedarf etwa alle 5 Sekunden) .
    * Legen Sie das auf false (Der Standard) wenn der Datensatz in der Regel selten .insert und/oder .delete Anfragen erhalten wird (z.B. weniger als einmal alle 10 Sekunden) .
         
6. Anmerkung: Es ist möglich,&lt;cacheFromUrl&gt; und zugehörige Einstellungen in datasets.xml für EDDTable VonHtp Erhalten Sie Datasets als Möglichkeit, eine lokale Kopie eines entfernten EDDTableFromHtpGet-Datensatzes auf einem anderen zu erstellen und zu pflegen ERDDAP . Allerdings wird in diesem Fall dieser lokale Datensatz alle .insert und .delete Anfragen ablehnen.

#### Verwendung von EDDTable VonHttpGet Datasets{#using-eddtablefromhttpget-datasets} 

* Autoren können "Requests" machen, die [Daten aus dem Datensatz einfügen oder löschen](#insert-and-delete) .
     
* Nachdem echte Daten in den Datensatz eingefügt wurden, können und sollten Sie die Original-Beispieldatendatei löschen.
     
* Benutzer können Daten aus dem Datensatz anfordern, wie sie für jeden anderen EDDTable-Datensatz in ERDDAP . Wenn die Anfrage keine Einschränkung auf der Zeitstempelspalte enthält, erhält die Anfrage Daten von der aktuellen Version des Datensatzes (die Protokolldatei nach der Bearbeitung aller Einfügen- und Löschbefehle und Neusortierung durch die http Erforderliche Optionen) .
     
* Benutzer können auch Anfragen stellen, die für EDDTableFromHttpGet-Datensätze spezifisch sind:
    * Wenn die Anfrage eine&lt;oder&lt;= Beschränkung der Zeitstempelsäule, dann ERDDAP™ verarbeitet Zeilen der Protokolldatei bis zum angegebenen Zeitstempel. In der Tat löscht dies vorübergehend alle Änderungen, die seit diesem Zeitstempelwert an den Datensatz vorgenommen wurden. Für weitere Informationen siehe [Ausführung](#versioning) .
    * Wenn die Anfrage eine &gt;, &gt;= oder = Beschränkung der Zeitstempelspalte enthält, z.B.&lt;=0, dann ERDDAP™ die Daten aus den Datendateien zurückgibt, ohne die Einfügen- und Löschbefehle zu bearbeiten.
* In Zukunft stellen wir fest, dass Werkzeuge gebaut werden (bei uns? von dir?) für die Arbeit mit diesen Datensätzen. Beispielsweise könnte es ein Skript geben, das die Roh-Log-Dateien liest, eine andere Kalibrierungsgleichung anwendet und einen anderen Datensatz mit diesen abgeleiteten Informationen erzeugt/ aktualisiert. Beachten Sie, dass das Skript die ursprünglichen Daten über eine Anfrage erhalten kann, ERDDAP™   (das die Daten im Dateiformat erhält, die am einfachsten für das Skript ist, mit) und den neuen Datensatz über .insert "Requests" generieren/aktualisieren ERDDAP . Das Skript benötigt keinen direkten Zugriff auf die Datendateien; es kann auf dem Computer eines autorisierten Autors sein.
     

#### Detaillierte Informationen zu EDDTableFromHtpGet{#detailed-information-about-eddtablefromhttpget} 

Die Themen sind:

*    [Nicht das Setup ändern&#33;](#dont-change-the-setup) 
*    [AUSBILDUNG](#crud) 
*    [InvalidRequests](#invalidrequests) 
*    [Geschwindigkeit](#httpget-speed) 
*    [Robust](#robust) 
*    [Systemzuverlässigkeit](#system-reliability) 
*    [Ausführung](#versioning) 
*    ["Was ist mit HTTP PUT und DELETE?&#33;"](#https-put-and-delete) 
*    [Anmerkungen](#httpget-notes) 
*    [Dank CHORDS für die Grundidee.](#thanks) 

Hier die detaillierten Informationen:

##### Nicht das Setup ändern&#33;{#dont-change-the-setup} 
Sobald der Datensatz erstellt wurde und Sie Daten dazu hinzugefügt haben:

* DON'T hinzufügen oder entfernen dataVariable S.
* DON'T ändern die sourceName oder destinationName von dataVariable S.
* DON'T die Daten ändern Art der dataVariable S. Aber Sie können die dataVariable Metadaten.
* DON'T ändern die http Erforderlich Variables Global Attribut.
* DON'T ändern die http GetDirectoryStructure globales Attribut.

Wenn Sie eines dieser Dinge ändern müssen, machen Sie einen neuen Datensatz und übertragen Sie alle Daten auf den neuen Datensatz.
     
##### AUSBILDUNG{#crud} 
In der Informatik sind die vier Grundbefehle für die Arbeit mit einem Datensatz [KREATE, READ, UPDATE, DELETE (AUSBILDUNG) ](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) . SQL, die Sprache für die Arbeit mit relationalen Datenbanken, hat das Äquivalent in INSERT, SELECT, UPDATE und DELETE. In EDDTableFromHtpGet,

* .insert ist eine Kombination aus CREATE und UPDATE.
* .delete ist DELETE.
* Das reguläre System zur Anforderung von Teilmengen von Daten ist READ.

So unterstützt EDDTableFromHtpGet alle grundlegenden Befehle für die Arbeit mit einem Datensatz.
     
* .insert oder .delete Anfragen ohne Fehler werden HTTP-Statuscode=200 und ein JSON-Objekt zurückgeben, z.
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-03-26T15:34:05.552Z",
    "numericTimestamp":1.522078445552E9
    }
```
Die beiden Zeitstempelwerte beziehen sich auf das gleiche Millisekunden, das ist die Millisekunde, die in der Zeitstempelvariable für die Zeilen von Daten gespeichert wird, die eingefügt oder gelöscht wurden. ERDDAP™ wird den Namen und die Formatierung dieser Schlüssel-Wert-Paare in Zukunft nicht ändern. ERDDAP™ kann dem JSON-Objekt in Zukunft zusätzliche Schlüsselwertpaare hinzufügen.
     
##### InvalidRequests{#invalidrequests} 
Invalid .insert oder .delete Anfragen werden einen anderen HTTP-Fehlerstatuscode als status=200 zurückgeben und keine Änderung an den Datensatz vorgenommen. Dazu gehören Anfragen mit falschen Autorinformationen, falsche Variablennamen, verschiedene Arraylängen für verschiedene Variablen, fehlende Variablen, fehlende Variablenwerte usw. Wenn die Anfrage mehr als eine Datendatei beinhaltet, ist es möglich, dass ein Teil der Anfrage erfolgreich ist und ein Teil ausfällt. Dies sollte jedoch kein Problem sein, wenn der Sensor, der die Anfrage sendet, einen Fehler als kompletten Ausfall behandelt. Zum Beispiel, wenn Sie sagen, ERDDAP™ zum Einsatz (oder löschen) die gleichen Daten zweimal in einer Zeile, das Schlimmste ist, dass diese Informationen zweimal gespeichert werden, schließen Sie zusammen in der Protokolldatei. Es ist schwer zu sehen, wie das Probleme verursachen könnte.
     
##### HttpGe-Geschwindigkeit{#httpget-speed} 
Für .insert oder .delete Anfragen (nicht zählen http Kopf) , ballpark die Geschwindigkeit von .insert oder .delete sind
1ms pro .insert mit 1 Datenzeile
2ms pro .insert mit 10 Datenzeilen in Arrays ( \\[  \\] )   
3ms pro .insert mit 100 Datenzeilen in Arrays ( \\[  \\] )   
13ms pro .insert mit 1000 Datenzeilen in Arrays ( \\[  \\] )   
Klare Arrays sind der Schlüssel zu [hoher Durchsatz](#httpget-speed) . Ohne Arrays wird es schwierig sein, .insert oder .delete mehr als 8 Datenzeilen pro Sekunde von einem entfernten Autor (wegen der ganzen Oberleitung des Netzes) . Mit Arrays wird es einfach sein, .insert oder .delete mehr als 1000 Datenzeilen pro Sekunde von einem entfernten Sensor.

Mit sehr großen Datenmengen pro Anfrage schlagen Sie Tomcats Grenze auf die maximale Abfragelänge (Standard ist 8KB?) , aber das kann durch die Bearbeitung der maxHtpHeaderSize Einstellung in Ihrem erhöht werden *Tomcat* /conf/server.xml's HTTP/1.1 Verbindungseingang.

Wann ERDDAP™ liest die JSON Lines CSV-Daten (Protokoll) Dateien, gibt es eine kleine Zeitstrafe im Vergleich zum Lesen binärer Datendateien. Wir fühlten, dass diese Zeit Strafe beim Lesen war ein angemessener Preis für die Geschwindigkeit und Robustheit des Systems beim Schreiben von Daten zu zahlen (die von besonderer Bedeutung ist) .

##### SSD{#ssd} 
 [Für größere Geschwindigkeit,](#ssd) Verwendung [Solid State Drive (SSD) ](https://en.wikipedia.org/wiki/Solid-state_drive) die Daten speichern. Sie haben eine viel schnellere Zugriffszeit (&lt;0,1ms) als Festplattenlaufwerke (3 - 12 ms) . Sie haben auch eine schnellere Datenübertragungsrate (200 - 2500 MB/s) als Festplattenlaufwerk (~200 MB/s) . Ihre Kosten sind in den letzten Jahren erheblich zurückgegangen. Obwohl die frühen SSD Probleme hatten, nachdem eine große Anzahl von Schriften zu einem bestimmten Block, dieses Problem ist jetzt stark reduziert. Wenn Sie nur die SSD verwenden, um die Daten einmal zu schreiben, dann lesen Sie sie oft, sogar eine verbraucherfähige SSD (die erheblich weniger teuer ist als eine unternehmenseigene SSD) sollte lange dauern.
    
##### Robust{#robust} 
Wir haben versucht, dieses System so einfach zu bedienen und so robust wie möglich.
* Das System ist so ausgelegt, dass es mehrere Fäden aufweist. (z.B. der Sensor, ein automatisiertes QC-Skript und ein Mensch) gleichzeitig an demselben Datensatz und sogar der gleichen Datei arbeiten. Ein Großteil davon wird durch Verwendung eines Log-Datei-Ansatzes zur Speicherung der Daten und durch Verwendung eines sehr einfachen Dateityps ermöglicht, [JSON Zeilen CSV-Dateien](https://jsonlines.org/examples/) , die Daten zu speichern.
* Ein weiterer großer Vorteil für JSON Lines CSV ist, dass, wenn eine Datei jemals beschädigt wird (z.B. ungültig wegen eines Fehlers auf einer Zeile) , es ist einfach, die Datei in einem Texteditor zu öffnen und das Problem zu beheben.
* Ein weiterer Vorteil ist, wenn in einer Datei ein Fehler auf einer Zeile vorliegt, kann das System noch alle Daten auf Zeilen vor und nach der Fehlerzeile lesen. Und das System kann noch weitere .insert und .delete Informationen protokollieren.
* Ein großer Vorteil der Verwendung von admin-accessible Standard-Dateien (verglichen mit einer relationalen Datenbank oder Cassandra oder einer anderen Software) : Es gibt keine andere Software, die aufrechterhalten werden muss und die ausgeführt werden muss, um Daten zu speichern oder abzurufen. Und es ist einfach, Standarddateien jederzeit und inkremental zu sichern, weil die Daten in Stücken sind (nach einer Weile ändert sich nur die aktuelle Datei für jede Station) . Im Gegensatz dazu braucht es erhebliche Anstrengung und System-Down-Zeit, um externe Backup-Dateien aus Datenbanken und von Cassandra zu machen.
         
##### Systemzuverlässigkeit{#system-reliability} 
Es ist vernünftig, einen Server mit ERDDAP™ um 99,9% zu haben -- das ist etwa 9 Stunden Ausfallzeit pro Jahr (obwohl, Sie können das in einer schlechten Nacht verwenden&#33;) .
Wenn Sie fleißig und glücklich sind, erhalten Sie 99,99% uptime (53 Minuten Ausfallzeit pro Jahr) , da nur ein paar Neustarts für Updates nehmen so viel Zeit.
Sie müssten extreme Maßnahmen ergreifen (einen separaten Backup-Server, unterbrechungsfreie Stromversorgung, Backup-Klimaanlage, 24x7x365 Personal, um die Website zu überwachen, etc.) eine schlanke Chance auf 99,999% uptime (5.25 Minuten Ausfallzeit pro Jahr) . Selbst dann ist es extrem unwahrscheinlich, dass Sie 99,999% uptime erreichen (oder sogar 99,99%) weil Probleme oft außerhalb Ihrer Kontrolle sind. Zum Beispiel bieten Amazon Web Service und Google erstaunlich zuverlässige Web-Dienste, aber große Teile davon sind manchmal für Stunden nach unten.

Angesicht, jeder will ERDDAP™ 100 % aufgebrauchen oder zumindest die "sechs neuns" (99,9999% Standzeit entspricht 32 Sekunden Ausfallzeit pro Jahr) , aber es gibt keine Möglichkeit, es zu bekommen, egal wie viel Zeit, Mühe und Geld Sie verbringen.

Aber... ERDDAP™ uptime ist hier nicht das eigentliche Ziel. Ziel ist es, eine zuverlässige **System** Eine, die keine Daten verliert. Das ist ein lösbares Problem.

Die Lösung ist: Erstellen Sie Fehlertoleranz in die Computersoftware, die die Daten an ERDDAP . Insbesondere sollte diese Software eine Warteschlange von Daten warten, um zu gehen, ERDDAP . Wenn Daten zur Warteschlange hinzugefügt werden, sollte die Software die Antwort von ERDDAP . Wenn die Antwort keine Daten enthält, die empfangen wurden. Keine Fehler., dann sollte die Software die Daten in der Warteschlange verlassen. Wenn mehr Daten generiert und der Warteschlange hinzugefügt werden, sollte die Software erneut versuchen, die Daten in der Warteschlange einzufügen. (vielleicht mit dem \\[  \\] System) . Es wird gelingen oder scheitern. Wenn es scheitert, wird es später wieder versuchen. Wenn Sie die Software auf diese Weise zu arbeiten schreiben und wenn die Software bereit ist, einige Tage Daten wert zu löschen, haben Sie tatsächlich eine gute Chance, 100% der Daten des Sensors hochzuladen, um ERDDAP . Und Sie werden es getan haben, ohne große Anstrengungen oder Kosten.

 \\[ Hintergrund: Das haben wir nicht gedacht. [So erreichen Computernetzwerke Zuverlässigkeit.](https://en.wikipedia.org/wiki/Reliability_(computer_networking) ) Computernetze sind inhärent unzuverlässig. Wenn Sie also eine Datei von einem Computer auf einen anderen übertragen, weiß/erwartet die Sendesoftware, dass einige Pakete verloren gehen können. Wenn es keine richtige Anerkennung für ein bestimmtes Paket aus dem Empfänger bekommt, resendiert es das verlorene Paket. Mit diesem Ansatz können relativ einfache Sender- und Empfängersoftware ein zuverlässiges Dateiübertragungssystem auf einem unzuverlässigen Netzwerk aufbauen. \\] 
    
##### Warum JSON Lines CSV-Dateien?&#33;{#why-json-lines-csv-files} 
EDDTableFromHtpGet verwendet [JSON Zeilen CSV-Dateien](https://jsonlines.org/examples/) . zur Speicherung der Daten. Die Gründe sind:

* Der Hauptgrund ist: Die Einfachheit von JSON Lines CSV-Dateien bietet eine schnelle, einfache und zuverlässige Möglichkeit, mehrere Threads in eine bestimmte Datei zu schreiben (z.B. durch Synchronisation auf dem Dateinamen) .
* Wenn eine JSON Lines CSV-Datei jemals beschädigt wurde (z.B. ungültig wegen eines Fehlers auf einer Zeile) , EDDTableFromHtpGet konnte noch alle Daten auf allen Zeilen vor und nach der Fehlerzeile lesen. Und das .insert und .delete System könnte weiterhin neue Daten in die Datendatei hinzufügen.
* Weil die JSON Lines CSV-Dateien ASCII-Dateien sind, wenn eine Datei jemals beschädigt wurde, wäre es einfach zu beheben (in einem Texteditor) .
* JSON Lines CSV unterstützt Unicode Strings.
* JSON Lines CSV unterstützt variable Längenstrings (nicht beschränkt auf eine maximale Länge) .
* JSON Lines CSV unterstützt 64-bit ganze Zahlen (Länge) .
* Die formale Natur und zusätzliche Syntax von JSON Lines CSV (vs Oldschool CSV) gibt zusätzliche Sicherheit, dass eine bestimmte Zeile nicht beschädigt wurde.

Wir haben zunächst versucht, .nc 3 Dateien mit einer unbegrenzten Dimension. Es gab jedoch Probleme:

* Das Hauptproblem war: Es gibt keine zuverlässige Möglichkeit, mehrere Threads zu schreiben zu einem .nc 3 Datei, auch wenn die Threads zusammenwirken, indem die Texte synchronisiert.
* Wenn .nc 3 Datei wird beschädigt, das .insert und .delete System kann nicht weiterhin die Datei verwenden.
* Weil .nc 3 Dateien sind binär, wenn eine Datei beschädigt wird (die sie aufgrund des Multi-Threading-Problems tun) sie sind extrem hart oder unmöglich zu beheben. Bei der Reparatur gibt es keine Werkzeuge.
* CF hat keine Möglichkeit, die Kodierung von Strings anzugeben, so gibt es keine offizielle Möglichkeit, Unicode zu unterstützen, z.B. die UTF-8 Kodierung. Wir versuchten, CF zu erhalten, um ein \\_Encoding-Attribut zu unterstützen, konnten aber keine Fortschritte erzielen. ( Unidata , auf ihren Kredit, unterstützt das \\_Encoding Attribut.) 
*    .nc 3 Dateien unterstützen nur feste Längenstrings. Auch hier versuchten wir, CF zu bekommen und Unidata zur Unterstützung variabler Längenstrings, aber nicht in der Lage, Fortschritte zu erzielen.
*    .nc 3 Dateien unterstützen keine einfache Möglichkeit, einzelne Charaktervariablen von String-Variablen zu unterscheiden. Auch hier versuchten wir, CF zu bekommen und Unidata zur Unterstützung eines Systems zur Unterscheidung dieser beiden Datentypen, aber keine Fortschritte erzielt werden konnten.
*    .nc 3 Dateien unterstützen nur 8-Bit-Zeichen mit einer nicht spezifizierten Kodierung. Auch hier versuchten wir, CF zu bekommen und Unidata Unterstützung eines Systems zur Angabe der Kodierung, aber keine Fortschritte erzielt werden konnten.
*    .nc 3 Dateien unterstützen nicht 64-bit ganze Zahlen (Länge) . Auch hier versuchten wir, CF zu bekommen und Unidata ein System für lange zu unterstützen, aber keine Fortschritte zu erzielen.
         
##### Ausführung{#versioning} 
Denn EDDTable VonHtp Speichern Sie ein Protokoll aller Änderungen des Datensatzes mit dem Zeitstempel und dem Autor jeder Änderung, es kann schnell diesen Datensatz zu jedem Zeitpunkt neu erstellen. In gewisser Weise gibt es eine Version für jeden Zeitpunkt. Wenn die Datenanforderung eines Benutzers einen Zeitstempel enthält&lt;= Strenge, z.B.&lt;= 2016-06-23T16:32:22.128Z (oder einen beliebigen Zeitpunkt) , aber keine Einschränkung von Autor oder Befehl, ERDDAP™ wird auf die Anfrage antworten, indem zunächst eine Version des Datensatzes ab diesem Zeitpunkt generiert wird. Dann, ERDDAP™ die anderen Einschränkungen des Benutzers, wie bei jeder anderen Anforderung von Daten aus ERDDAP . EDDTableFromHtpGet wird so eingerichtet, dass dieser Prozess auch für sehr große Datensätze sehr schnell und effizient ist.

Ebenso kann ein Benutzer herausfinden, wann der Datensatz zuletzt aktualisiert wurde, indem er ...?timestamp&timestamp=max (Zeitstempel) &distinkt () 

Und für jede Anforderung von Daten, für jede Version des Datensatzes, können Benutzer sehen, welche Autor gemacht, welche Änderungen, und wenn sie sie gemacht.

Dieses Versionssystem ermöglicht [Reproduzierbare Wissenschaft](https://en.wikipedia.org/wiki/Reproducibility) weil jeder jederzeit Daten von der Version des Datensatzes anfordern kann. Diese feinkörnige Versionierung ist mit jedem anderen System, das wir kennen, nicht möglich. Der zugrunde liegende Mechanismus ist sehr effizient, indem kein zusätzlicher Speicherplatz benötigt wird, und die Verarbeitung ist wirklich minimal.

Nicht jeder hat einen Bedarf an dieser Art von feinkörnigen Versionen, aber es ist außerordentlich nützlich, vielleicht notwendig, im Rahmen einer großen Datenverwaltungsorganisation (z.B. OOI, Earth Cube, Data One und NOAA NZEI) wo ein Datensatz mehrere Autoren haben kann (z.B. der Sensor, ein automatisiertes QC-Skript und ein menschlicher Editor) .

 \\[ Geschichte: Die Notwendigkeit für diese Art von Versioning kam zuerst für mich (Bob.) beim Lesen und Besprechen von OOI im Jahr 2008. Zur Zeit hatte OOI ein umständliches, langsames, ineffizientes System für die Versionierung auf Git. Git ist toll für das, was es entworfen wurde, aber nicht das. Im Jahr 2008 habe ich bei einer OOI-Diskussion ein umfangreiches, effizientes Alternativ-zu-OOI-System für das Datenmanagement entwickelt, darunter viele der Funktionen, die ich hinzugefügt habe. ERDDAP™ seitdem, und auch dieses Versioning-System. Zu dieser Zeit und seit, OOI war verpflichtet, ihre Versioning-System und nicht interessiert an Alternativen. 2016 fielen andere Aspekte dieses Plans auf und ich begann, ihn umzusetzen. Weil es viele Unterbrechungen gab, an anderen Projekten zu arbeiten, war ich erst 2018 fertig. Selbst jetzt weiß ich kein anderes wissenschaftliches Datensystem, das einen so schnellen und einfachen Zugriff auf eine Version der Daten von jedem Zeitpunkt an bietet, um häufig Datenmengen zu ändern. Einfache Dateisysteme bieten das nicht an. Beziehungsdatenbanken nicht. Cassandra nicht. \\] 
    
##### HTTPS setzen und löschen{#https-put-and-delete} 
*    ["Was ist mit HTTPS PUT und DELETE?&#33;"](#https-put-and-delete)   
     [Hypertext Transfer Protocol (HTTP) ](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) ist die Basis des World Wide Web und der Grund, warum Webseiten-URLs mit " beginnenhttp://"oder "https://". HTTPS ist HTTP mit einer zusätzlichen Sicherheitsschicht. Jeden Tag machen Browser, Skripte und Computerprogramme Milliarden von HTTP (S)   **GET** Anfragen, um Informationen von entfernten Quellen zu erhalten. HTTP (S) auch andere [Verben](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) , insbesondere PUT (um Daten auf den Server zu drücken) und DELETE (zu DELETE-Daten vom Server) . Ja, PUT und DELETE sind die richtige Möglichkeit, Daten in einen Datensatz über HTTP einzufügen und Daten zu löschen. (S) . GET wird von jeder Software unterstützt, die mit HTTP arbeiten kann (S) . GET ist wirklich einfach zu arbeiten. Jeder weiß schon, wie man mit GET arbeitet und viele wissen, wie man POST verwendet (die in im Wesentlichen gleicher Weise wie GET eingesetzt werden kann) , so haben wir EDDTableFromHtpGet mit GET und POST arbeiten. Sehr wenige Menschen (sogar wenige Computerprogrammierer) haben je mit PUT und DELETE gearbeitet. PUT und DELETE werden in der Regel nur von Computersprachen unterstützt, so dass sie ein geschicktes Programm benötigen. PUT und DELETE sind also in der Regel ein viel mühsamerer Ansatz, da sich die Werkzeuge entwickelt haben.
     
##### HttpGet Hinweise{#httpget-notes} 
*    [Anmerkungen](#httpget-notes) 
    * Nein dataVariable kann dataType=char haben. Verwenden Sie stattdessen dataType=String. Wenn Sie wirklich dataType=char benötigen, E-Mail Chris. John bei noaa.gov.
         
##### Danke.{#thanks} 
*    [Dank CHORDS für die Grundidee.](#thanks)   
Die Grundidee für EDDTableFromHtpGet (d.h. mit einem HTTP GET anfordern, Daten zu einem Datensatz hinzuzufügen) ist von UCAR's (NCAR's?)   [Cloud-Hosted Echtzeit-Datendienste (CHORDEN) ](https://github.com/earthcubeprojects-chords) Projekt. Das Format für die Parameter in der Anfrage (wiederholt *Name: Name* , getrennt von) ist das gleiche Standardformat, das von HTML-Formularen auf Webseiten verwendet wird. Es ist eine einfache und brillante Idee und noch mehr, weil es so perfekt mit ERDDAP Das bestehende System zum Umgang mit tabellarischen Daten. Die Idee ist offensichtlich, aber ich (Bob.) hat nicht daran gedacht. EDDTableFromHtp Nutzen Sie diese Grundidee, kombiniert mit unseren Ideen, wie man sie implementiert, um ein System in ERDDAP™ zum Hochladen von Daten. Die EDDTableFromHtpGet-Implementierung ist außer der Grundidee der Verwendung von GET, um Daten in das System zu schieben, völlig unterschiedlich und völlig unabhängig von CHORDS und hat verschiedene Funktionen (z.B. Logfiles, Aufschlüsselung von Daten, verschiedene Sicherheitssysteme, CRUD-Unterstützung, reproduzierbare Daten) . Unsere Exposition gegenüber CHORDS war nur ein Webinar. Wir haben ihren Code nicht angesehen oder über ihr Projekt gelesen, weil wir sofort wussten, dass wir das System anders umsetzen wollten. Aber wir sind ihnen für die Grundidee dankbar. Der vollständige Verweis auf CHORDS ist
Daniels, M. D., Kerkez, B., Chandrasekar, V., Graves, S., Stamps, D. S., Martin, C., Dye, M., Gooch, R., Bartos, M., Jones, J., Keiser, K. (2014) . Cloud-Hosted Echtzeit-Datendienste für die Geowissenschaften (CHORDEN) Software. UCAR/NCAR -- Erdbeobachtungslabor. [https://doi.org/10.5065/d6v1236q](https://doi.org/10.5065/d6v1236q)   
     
### EDDTableFrom Hyrax Dateien{#eddtablefromhyraxfiles} 
 [ **EDDTableFrom Hyrax Dateien** ](#eddtablefromhyraxfiles)   (depretiert) aggregiert Datendateien mit mehreren Variablen, jeweils mit einer oder mehreren gemeinsamen Abmessungen (zum Beispiel Zeit, Höhe (oder Tiefe) , Breite, Länge) , und serviert von [ Hyrax   OPeNDAP Server](https://www.opendap.org/software/hyrax-data-server) .

* Dieser Datensatztyp ist **DEPRECATE** . Die neuere und allgemeinere Lösung ist die [Cache AusUrl Option für EDDTable VonFiles](#cachefromurl)   (oder eine Variante) , die eine lokale Kopie der Remote-Dateien macht und die Daten aus den lokalen Dateien bedient. Die&lt;ccheFromUrl&gt; Option kann mit jeder Art von tabellarischen Datendatei verwendet werden. **   
Wenn Sie diese Arbeit aus irgendeinem Grund nicht machen können, mailen Sie Chris. John bei noaa.gov.
Wenn vor 2020 keine Beschwerden vorliegen, kann dieser Datensatztyp entfernt werden. ** 
* Wir empfehlen dringend die Verwendung der [Datensätze generieren Xml Programm](#generatedatasetsxml) einen groben Entwurf der datasets.xml für diesen Datensatz. Das können Sie dann bearbeiten, um es zu verfeinern.
* In den meisten Fällen hat jede Datei mehrere Werte für die linkeste (erste) Dimension, zum Beispiel Zeit.
* Die Dateien oft (aber muss nicht) einen einzigen Wert für die anderen Abmessungen haben (zum Beispiel Höhe (oder Tiefe) , Breite, Länge) .
* Die Dateien können Zeichenvariablen mit einer zusätzlichen Dimension aufweisen (zum Beispiel nCharacters) .
*    Hyrax Server können durch die "/dods-bin/nph-dods/" oder "/opendap/" in der URL identifiziert werden.
* Diese Klasse Bildschirm-Scrapes die Hyrax Web-Seiten mit den Listen von Dateien in jedem Verzeichnis. Deshalb ist es sehr spezifisch für das aktuelle Format von Hyrax Webseiten. Wir werden versuchen, sich anzupassen ERDDAP™ schnell, wenn/wenn zukünftige Versionen Hyrax ändern, wie die Dateien aufgelistet sind.
* Die&lt;fileDir&gt; Einstellung wird ignoriert. Da diese Klasse herunterladen und eine lokale Kopie jeder Remote-Datendatei macht, ERDDAP™ die Datei Dir zu sein *BigParentDirectory* / Kopieren/ * datasetID * /.
* Für&lt; sourceUrl &gt; die URL des Basisverzeichnisses des Datensatzes in der Hyrax Server zum Beispiel,
    &lt; sourceUrl &gt;http://edac-dap.northerngulfinstitute.org/dods-bin/nph-dods/WCOS/nmsp/wcos/&lt;/ sourceUrl &gt;
     (aber auf eine Linie setzen)   (Leider ist dieser Server nicht mehr verfügbar) .
Die sourceUrl Webseite hat in der Regel " OPeNDAP Serverindex \\[ Verzeichnisname \\] " oben.
* Da diese Klasse immer Downloads und eine lokale Kopie jeder Remote-Datendatei macht, sollten Sie diesen Datensatz niemals einpacken [EDDTableCopy](#eddtablecopy) .
* Sehen Sie die Superklasse dieser Klasse, [EDDTableFromFiles](#eddtablefromfiles) , für Informationen, wie diese Klasse funktioniert und wie sie verwendet werden.
* Siehe die Beispiele 1D, 2D, 3D und 4D für [EDDTableFromNcFis](#eddtablefromncfiles) .
     
### EDDTableFromInvalidCRAFiles{#eddtablefrominvalidcrafiles} 
 [ **EDDTableFromInvalidCRAFiles** ](#eddtablefrominvalidcrafiles) aggregierte Daten aus NetCDF   (v3 oder v4)   .nc Dateien, die eine bestimmte, ungültige Variante des CF DSG Contiguous Ragged Array verwenden (CRA) Dateien. Obwohl ERDDAP™ unterstützt diesen Dateityp, es ist ein ungültiger Dateityp, den niemand verwenden sollte. Gruppen, die derzeit diesen Dateityp verwenden, werden stark ermutigt, ERDDAP™ um gültige CF DSG CRA-Dateien zu generieren und mit diesen Dateien zu stoppen.

Details: Diese Dateien haben mehrere Zeilen\\_size-Variablen, jeweils mit einem Sample\\_dimension-Attribut. Die Dateien sind nicht-CF-Standard-Dateien, weil die mehrere Probe (Fette) Dimensionen sind decodiert und mit dieser zusätzlichen Regel und Verheißung, die nicht Teil der CF DSG-Spezifikation ist: "Sie können einen gegebenen z.B. Temperaturwert zuordnen (temp\\_obs Dimension) mit einem vorgegebenen Tiefenwert (z\\_obs Dimension, die Dimension mit den meisten Werten) , weil: die Temperaturzeile\\_size (für eine bestimmte Besetzung) entweder 0 oder gleich der entsprechenden Tiefenreihe\\_size (für die Besetzung)   (Das ist die Regel) . Wenn also die Temperaturzeile\\_size nicht 0 ist, dann beziehen sich die n Temperaturwerte für diesen Guß direkt auf die n Tiefenwerte für diesen Guß. (Das ist das Versprechen) ."

Ein weiteres Problem mit diesen Dateien: Die Principal\\_Investigatorzeile\\_size-Variable hat kein Sample\\_dimension-Attribut und folgt nicht der obigen Regel.

Beispieldateien für diesen Datensatztyp finden Sie unterhttps://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[ 2020-10-21 Dieser Server ist nicht mehr zuverlässig verfügbar \\] .

Sehen Sie die Superklasse dieser Klasse, [EDDTableFromFiles](#eddtablefromfiles) , für Informationen, wie diese Klasse funktioniert und wie sie verwendet werden.

Wir empfehlen dringend die Verwendung der [Datensätze generieren Xml Programm](#generatedatasetsxml) einen groben Entwurf der datasets.xml für diesen Datensatz. Das können Sie dann bearbeiten, um es zu verfeinern.

Das erste, was GenerateDatasets Xml tut für diese Art von Datensatz, nachdem Sie die Fragen beantworten ist drucken Sie die ncdump-ähnliche Struktur der Beispieldatei. Also, wenn Sie ein paar goofy Antworten für die erste Schleife durch GenerateDatasets eingeben Xml, zumindest können Sie sehen, ob ERDDAP™ kann die Datei lesen und sehen, welche Dimensionen und Variablen in der Datei sind. Dann können Sie bessere Antworten für die zweite Schleife durch GenerateDatasetsXml geben.
 
### EDDTableFromJsonlCSVFis{#eddtablefromjsonlcsvfiles} 
 [ **EDDTableFromJsonlCSVFis** ](#eddtablefromjsonlcsvfiles) aggregierte Daten aus [JSON Zeilen CSV-Dateien](https://jsonlines.org/examples/) . Sehen Sie die Superklasse dieser Klasse, [EDDTableFromFiles](#eddtablefromfiles) , für Informationen, wie diese Klasse funktioniert und wie sie verwendet werden.

* Wie jsonlines.org sagt, ist dieses Format "Better than CSV" (und rechtlich, als Bundesangestellter, kann ich ihnen nicht zustimmen oder widersprechen -- wie verrückt ist das?) . CSV wurde nie formal definiert und wird durch das historische Gepäck im Zusammenhang mit seiner Verbindung zu den ursprünglichen Tabellenkalkulationsprogrammen behindert. JSON Lines CSV ist im Vergleich vollständig definiert und profitiert von seiner Verbindung zum weit verbreiteten JSON-Standard, der wiederum von seiner Verbindung zu Java Script und Java . Insbesondere gibt es volle Unterstützung für lange ganze Zahlen und für Unicode-Zeichen in Strings, und eine klare Möglichkeit, andere Sonderzeichen aufzunehmen (insbesondere Tabs und Neuheiten) in Strings.
    
Dieses Format ist besonders gut für Datensätze, bei denen Sie am Ende einer bestimmten Datendatei periodisch zusätzliche Zeilen anhängen müssen. Aus diesem Grund und anderen (siehe oben) , [EDDTableFromHtpGet](#eddtablefromhttpget) verwendet Json Lines CSV-Dateien für die Datenspeicherung.
    
* Die Eingabedateien werden als UTF-8 codiert angenommen. Allerdings, angesichts der \\u *dddd* Format für die Kodierung von Sonderzeichen (z.B. \\u20ac ist die Kodierung für das Euro-Zeichen) , Sie haben die Möglichkeit, die Dateien zu schreiben, so dass sie nur 7-Bit ASCII Zeichen enthalten, indem Sie \\u *dddd* alle Zeichen über #127 codieren.
     
* Wir empfehlen dringend die Verwendung der [Datensätze generieren Xml Programm](#generatedatasetsxml) einen groben Entwurf der datasets.xml für diesen Datensatz. Das können Sie dann bearbeiten, um es zu verfeinern.
    
Das erste, was GenerateDatasetsXml für diese Art von Datensätzen tut, nachdem Sie die Fragen beantworten, ist Drucken der ncdump-ähnlichen Struktur der Sample-Datei. Also, wenn Sie ein paar goofy Antworten für die erste Schleife durch GenerateDatasets eingeben Xml, zumindest können Sie sehen, ob ERDDAP™ kann die Datei lesen und sehen, welche Dimensionen und Variablen in der Datei sind. Dann können Sie bessere Antworten für die zweite Schleife durch GenerateDatasetsXml geben.
    
* WARNING: Wann ERDDAP™ liest JSON Zeilen CSV-Datendateien, wenn es einen Fehler auf einer bestimmten Zeile findet (z.B. falsche Anzahl von Gegenständen) , es protokolliert eine Warnmeldung ("WARNUNG: Schlechte Linie (S) der Daten" ... mit einer Liste der schlechten Linien auf folgenden Zeilen) in der [log.txt Datei](/docs/server-admin/additional-information#log) und dann weiter den Rest der Datendatei lesen. So ist es Ihre Verantwortung, regelmäßig zu schauen (oder ein Skript schreiben, um dies zu tun) für diese Nachricht im Protokoll. txt, damit Sie die Probleme in den Datendateien beheben können. ERDDAP™ wird so eingerichtet, dass die Benutzer weiterhin alle verfügbaren gültigen Daten lesen können, obwohl einige Zeilen der Datei Fehler haben.
     
### EDDTableFromMultidimNcFiles{#eddtablefrommultidimncfiles} 
 [ **EDDTableFromMultidimNcFiles** ](#eddtablefrommultidimncfiles) aggregierte Daten aus NetCDF   (v3 oder v4)   .nc   (oder [ .nc ml](#ncml-files) ) Dateien mit mehreren Variablen, jeweils mit einer oder mehreren gemeinsamen Abmessungen. Die Dateien können Zeichenvariablen mit oder ohne zusätzliche Dimension aufweisen (zum Beispiel, STRING14) . Sehen Sie die Superklasse dieser Klasse, [EDDTableFromFiles](#eddtablefromfiles) , für Informationen, wie diese Klasse funktioniert und wie sie verwendet werden.

* Wenn die Dateien multidimensionale CF DSG-Varianten sind, verwenden Sie diesen Datensatztyp anstelle von [EDDTableFromNcCFFiles](#eddtablefromncfiles) .
     
* Für neue tabellarische Datensätze von .nc Dateien, verwenden Sie diese Option, bevor Sie die ältere [EDDTableFromNcFis](#eddtablefromncfiles) . Einige Vorteile dieser Klasse sind:
    * Diese Klasse kann mehr Variablen aus einer größeren Vielfalt von Dateistrukturen lesen. Wenn Sie DimensionsCSV angeben (eine gemeinschaftlich getrennte Liste von Dimensionsnamen) in GenerateDatasets Xml (oder&lt;AbmessungenCSV&gt; in der datasets.xml Info für einen dieser Datensätze), dann ERDDAP™ nur Variablen in den Quelldateien lesen, die einige oder alle diese Dimensionen verwenden, plus alle Skalarvariablen. Wenn sich eine Dimension in einer Gruppe befindet, müssen Sie ihren FullName angeben, z.B. " *GruppeName/DimensionName* ".
    * Diese Klasse kann Dateien oft sehr schnell ablehnen, wenn sie nicht den Einschränkungen einer Anfrage entsprechen. Das Lesen von Daten aus großen Sammlungen wird oft viel schneller gehen.
    * Diese Klasse behandelt echte Char Variablen (Nicht-String-Variablen) richtig.
    * Diese Klasse kann String-Variablen beschneiden, wenn der Schöpfer Netcdf-javas SchreibStrings nicht verwendet hat (die char #0 angibt, um das Ende des Strings zu markieren) .
    * Diese Klasse ist besser im Umgang mit einzelnen Dateien, die bestimmte Variablen oder Dimensionen fehlen.
    * Diese Klasse kann Blöcke von Zeilen mit fehlenden Werten entfernen, wie für [CF Diskrete Sampling Geometrien (DSG) Unvollständige Multidimensionale Array-Dateien](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#_incomplete_multidimensional_array_representation)   
         
* Wir empfehlen dringend die Verwendung der [Datensätze generieren Xml Programm](#generatedatasetsxml) einen groben Entwurf der datasets.xml für diesen Datensatz. Das können Sie dann bearbeiten, um es zu verfeinern.
    
Das erste, was GenerateDatasetsXml für diese Art von Datensätzen tut, nachdem Sie die Fragen beantworten, ist Drucken der ncdump-ähnlichen Struktur der Sample-Datei. Also, wenn Sie ein paar goofy Antworten für die erste Schleife durch GenerateDatasets eingeben Xml, zumindest können Sie sehen, ob ERDDAP™ kann die Datei lesen und sehen, welche Dimensionen und Variablen in der Datei sind. Dann können Sie bessere Antworten für die zweite Schleife durch GenerateDatasetsXml geben.
    
Gruppe -- Datensätze generieren Xml fragt nach einer "Gruppe". Sie können " eingeben, um es suchen, alle Gruppen, " *einige Gruppe* " oder " *Einige Gruppe/einige Gruppe* " eine bestimmte Gruppe suchen zu lassen, oder " \\[ Wurzeln \\] " es nur die Wurzelgruppe suchen zu lassen. Die "Gruppe"-String wird&lt;Gruppe datasets.xml Info zum Datensatz (obwohl " \\[ Wurzeln \\] " wird "") .
    
AbmessungenCSV -- Datensätze generieren Xml wird nach einem "DimensionsCSV"-String fragen. Dies ist eine Komma-separierte Werteliste von Quellnamen eines Maßsatzes. Datensätze generieren Xml liest nur Datenvariablen in der Probe .nc Dateien, die einige oder alle diese Abmessungen verwenden (und keine anderen Abmessungen) , plus alle Skalarvariablen in der Datei und machen den Datensatz aus diesen Datenvariablen. Wenn sich eine Dimension in einer Gruppe befindet, müssen Sie ihren FullName angeben, z.B. " *GruppeName/DimensionName* ".
Wenn Sie nichts angeben (ein leerer String) , GenerateDatasets Xml wird nach den Variablen mit den meisten Dimensionen suchen, auf der Theorie, dass sie die interessantesten sein werden, aber es kann Zeiten geben, wenn Sie einen Datensatz aus einer anderen Gruppe von Datenvariablen machen wollen, die eine andere Gruppe von Dimensionen verwenden.
Wenn Sie nur einen Dimensionsnamen angeben, der nicht existiert (z.B. NO\\_MATCH) , ERDDAP™ finden nur alle Skalarvariablen.
Die "DimensionsCSV"-String wird&lt;AbmessungenCSV&gt; in der datasets.xml Info für den Datensatz.
    
#### Leckerbissen{#treatdimensionsas} 
Es gibt eine Kategorie von Invaliden .nc Dateien (weil sie den CF-Regeln nicht folgen) mit mehreren Abmessungen (z.B. lat, lon, Zeit) wenn sie nur eine Dimension verwenden sollten (z.B. Zeit) , zum Beispiel:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
        lat = 1437 ;
        lon = 1437 ;
    variables:
        double time(time) ;
        double lat(lat) ;
        double lon(lon) ;
        float temperature(time, depth) ;
```
EDDTableFromMultidimNcFiles hat eine Besonderheit, sich mit diesen Dateien zu beschäftigen: Wenn Sie das globale Attribut "treatDimensionsAs" zu den Datensätzen global hinzufügen addAttributes , you can tell ERDDAP™ bestimmte Dimensionen zu behandeln (z.B. Lat undlon) als ob sie eine andere Dimension haben (z.B. Zeit) . Der Attributwert muss eine komma getrennte Liste sein, die die "aus" Dimensionen und dann die "zu" Dimension angibt, z.
 <att name="treatDimensionsAs"> lat, lon, Zeit </att>   
Dann ERDDAP™ die Datei als wäre sie:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
    variables:
        double time(time) ;
        double lat(time) ;
        double lon(time) ;
        float temperature(time, depth) ;
```
Natürlich muss die aktuelle Größe jeder der Abmessungen in der Liste gleich sein; andernfalls muss ERDDAP™ behandelt die Datei als "Bad File".

Beachten Sie, dass diese Dateien ungültig sind, weil sie nicht CF-Regeln folgen. Sogar wenn ERDDAP™ können sie lesen, empfehlen wir dringend, dass Sie solche Dateien nicht erstellen, weil andere CF-basierte Software-Tools sie nicht richtig lesen können. Wenn Sie solche Dateien bereits haben, empfehlen wir dringend, diese so schnell wie möglich durch gültige Dateien zu ersetzen.
    
### EDDTableFromNcFis{#eddtablefromncfiles} 
 [ **EDDTableFromNcFis** ](#eddtablefromncfiles) aggregierte Daten aus NetCDF   (v3 oder v4)   .nc   (oder [ .nc ml](#ncml-files) ) Dateien und [Zar](https://github.com/zarr-developers/zarr-python) Dateien (ab Version 2.25) mit mehreren Variablen, jeweils mit einer gemeinsamen Dimension (zum Beispiel, Zeit) oder mehr als eine gemeinsame Dimension (zum Beispiel Zeit, Höhe (oder Tiefe) , Breite, Länge) . Die Dateien müssen die gleichen Dimensionsnamen haben. Eine vorgegebene Datei kann mehrere Werte für jede der Abmessungen haben und die Werte können in verschiedenen Quelldateien unterschiedlich sein. Die Dateien können Zeichenvariablen mit einer zusätzlichen Dimension aufweisen (zum Beispiel, STRING14) . Sehen Sie die Superklasse dieser Klasse, [EDDTableFromFiles](#eddtablefromfiles) , für Informationen, wie diese Klasse funktioniert und wie sie verwendet werden.

Zarr-Dateien haben etwas anderes Verhalten und erfordern entweder die DateiNameRegex oder den PfadRegex, um "zarr" einzuschließen.

* Wenn .nc Dateien verwenden eine der [CF Diskrete Sampling Geometrien (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Dateiformate, versuchen Sie, [EDDTableFromNcCFFiles](#eddtablefromncfiles) vor dem Versuch.
     
* Für neue tabellarische Datensätze von .nc Dateien, versuchen Sie das neuere [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) zuerst.
     
* Wir empfehlen dringend die Verwendung der [Datensätze generieren Xml Programm](#generatedatasetsxml) einen groben Entwurf der datasets.xml für diesen Datensatz. Das können Sie dann bearbeiten, um es zu verfeinern.
    
Das erste, was GenerateDatasetsXml für diese Art von Datensätzen tut, nachdem Sie die Fragen beantworten, ist Drucken der ncdump-ähnlichen Struktur der Sample-Datei. Also, wenn Sie ein paar goofy Antworten für die erste Schleife durch GenerateDatasets eingeben Xml, zumindest können Sie sehen, ob ERDDAP™ kann die Datei lesen und sehen, welche Dimensionen und Variablen in der Datei sind. Dann können Sie bessere Antworten für die zweite Schleife durch GenerateDatasetsXml geben.
    
AbmessungenCSV -- Datensätze generieren Xml wird nach einem "DimensionsCSV"-String fragen. Dies ist eine Komma-separierte Werteliste von Quellnamen eines Maßsatzes. Datensätze generieren Xml findet die Datenvariablen in der .nc Dateien, die einige oder alle diese Dimensionen verwenden, sowie alle Skalarvariablen, und machen den Datensatz aus diesen Datenvariablen. Wenn Sie nichts angeben (ein leerer String) , GenerateDatasets Xml wird nach den Variablen mit den meisten Dimensionen suchen, auf der Theorie, dass sie die interessantesten sein werden, aber es kann Zeiten geben, wenn Sie einen Datensatz aus einer anderen Gruppe von Datenvariablen machen wollen, die eine andere Gruppe von Dimensionen verwenden.
    
* 1D Beispiel: 1D-Dateien sind etwas anders als 2D, 3D, 4D, ... Dateien.
    * Du hast vielleicht eine Menge .nc Datendateien, in denen jede Datei einen Monat Wert von Daten von einem driftenden Boje hat.
    * Jede Datei hat 1 Dimension, zum Beispiel Zeit (Größe = \\[ viele \\] ) .
    * Jede Datei hat eine oder mehrere 1D-Variablen, die diese Dimension verwenden, zum Beispiel Zeit, Länge, Breite, Breite, Lufttemperatur,....
    * Jede Datei kann beispielsweise 2D-Zeichenvariablen mit Abmessungen aufweisen (Zeit, nCharakter) .
         
* 2D Beispiel:
    * Du hast vielleicht eine Menge .nc Datendateien, in denen jede Datei einen Monat Wert von Daten von einem driftenden Boje hat.
    * Jede Datei hat 2 Dimensionen, zum Beispiel Zeit (Größe = \\[ viele \\] ) und (Größe = 1) .
    * Jede Datei hat 2 1D-Variablen mit den gleichen Namen wie die Dimensionen und mit der gleichen Namen-Dimension, zum Beispiel Zeit (Zeit) , id (id) . Diese 1D-Variablen sollten in die Liste der&lt; dataVariable &gt; ist im XML des Datensatzes.
    * Jede Datei hat eine oder mehrere 2D-Variablen, zum Beispiel Länge, Breite, Lufttemperatur, Wassertemperatur, ...
    * Jede Datei kann beispielsweise 3D-Zeichenvariablen mit Abmessungen aufweisen (Zeit,id,nCharacters) .
         
* 3D Beispiel:
    * Du hast vielleicht eine Menge .nc Datendateien, bei denen jede Datei einen Monat Daten von einem stationären Boje hat.
    * Jede Datei hat 3 Dimensionen, zum Beispiel Zeit (Größe = \\[ viele \\] ) , lat (Größe = 1) , und (Größe = 1) .
    * Jede Datei hat 3 1D-Variablen mit den gleichen Namen wie die Dimensionen und mit der gleichen Namen-Dimension, zum Beispiel Zeit (Zeit) , lat (Latein) , lon (lon) . Diese 1D-Variablen sollten in die Liste der&lt; dataVariable &gt; ist im XML des Datensatzes.
    * Jede Datei hat eine oder mehrere 3D-Variablen, zum Beispiel Lufttemperatur, Wassertemperatur, ...
    * Jede Datei kann beispielsweise 4D-Zeichenvariablen mit Abmessungen aufweisen (Zeit,lat,lon,nCharakter) .
    * Der Name der Datei kann den Namen des buoy innerhalb des Dateinamens haben.
         
* 4D Beispiel:
    * Du hast vielleicht eine Menge .nc Datendateien, in denen jede Datei einen Monat Daten von einer Station hat. Zu jedem Zeitpunkt nimmt die Station Messwerte in einer Reihe von Tiefen.
    * Jede Datei hat 4 Dimensionen, zum Beispiel Zeit (Größe = \\[ viele \\] ) , Tiefe (Größe = \\[ viele \\] ) , lat (Größe = 1) , und (Größe = 1) .
    * Jede Datei hat 4 1D-Variablen mit den gleichen Namen wie die Dimensionen und mit der gleichen Namen-Dimension, zum Beispiel Zeit (Zeit) , Tiefe (Tiefe) , lat (Latein) , lon (lon) . Diese 1D-Variablen sollten in die Liste der&lt; dataVariable &gt; ist im XML des Datensatzes.
    * Jede Datei hat eine oder mehrere 4D-Variablen, zum Beispiel Lufttemperatur, Wassertemperatur, ...
    * Jede Datei kann beispielsweise 5D-Zeichenvariablen mit Abmessungen aufweisen (Zeit, tief,lat,lon,nCharakter) .
    * Der Name der Datei kann den Namen des buoy innerhalb des Dateinamens haben.
         
### EDDTableFromNcCFFiles{#eddtablefromnccffiles} 
 [ **EDDTableFromNcCFFiles** ](#eddtablefromnccffiles) Datensammlungen Daten aus NetCDF   (v3 oder v4)   .nc   (oder [ .nc ml](#ncml-files) ) Dateien, die eines der durch die [CF Diskrete Sampling Geometrien (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Konventionen. Sehen Sie die Superklasse dieser Klasse, [EDDTableFromFiles](#eddtablefromfiles) , für Informationen, wie diese Klasse funktioniert und wie sie verwendet werden.

Für Dateien, die eine der multidimensionalen CF DSG-Varianten verwenden [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) statt.

Die CF DSG-Konventionen definieren Dutzende von Dateiformaten und beinhalten zahlreiche kleinere Variationen. Diese Klasse befasst sich mit allen Variationen, die wir kennen, aber wir haben vielleicht eine verpasst (oder mehr) . Wenn diese Klasse keine Daten aus Ihren CF DSG-Dateien lesen kann, bitte [für zusätzliche Unterstützung](/docs/intro#support) .

Wir empfehlen dringend die Verwendung der [Datensätze generieren Xml Programm](#generatedatasetsxml) einen groben Entwurf der datasets.xml für diesen Datensatz. Das können Sie dann bearbeiten, um es zu verfeinern.
 
### EDDTableFromNccsvFiles{#eddtablefromnccsvfiles} 
 [ **EDDTableFromNccsvFiles** ](#eddtablefromnccsvfiles) aggregierte Daten aus [NCCSV](/docs/user/nccsv-1.00) ASCII .csv Dateien. Sehen Sie die Superklasse dieser Klasse, [EDDTableFromFiles](#eddtablefromfiles) , für Informationen, wie diese Klasse funktioniert und wie sie verwendet werden.

* Wir empfehlen dringend die Verwendung der [Datensätze generieren Xml Programm](#generatedatasetsxml) einen groben Entwurf der datasets.xml für diesen Datensatz. Das können Sie dann bearbeiten, um es zu verfeinern.
    
Das erste, was GenerateDatasetsXml für diese Art von Datensätzen tut, nachdem Sie die Fragen beantworten, ist Drucken der ncdump-ähnlichen Struktur der Sample-Datei. Also, wenn Sie ein paar goofy Antworten für die erste Schleife durch GenerateDatasets eingeben Xml, zumindest können Sie sehen, ob ERDDAP™ kann die Datei lesen und sehen, welche Dimensionen und Variablen in der Datei sind. Dann können Sie bessere Antworten für die zweite Schleife durch GenerateDatasetsXml geben.
    
* WARNING: Wann ERDDAP™ liest NCCSV-Datendateien, wenn es einen Fehler auf einer bestimmten Zeile findet (z.B. falsche Anzahl von Gegenständen) , es protokolliert eine Warnmeldung ("WARNUNG: Schlechte Linie (S) der Daten" ... mit einer Liste der schlechten Linien auf folgenden Zeilen) in der [log.txt Datei](/docs/server-admin/additional-information#log) und dann weiter den Rest der Datendatei lesen. So ist es Ihre Verantwortung, regelmäßig zu schauen (oder ein Skript schreiben, um dies zu tun) für diese Nachricht im Protokoll. txt, damit Sie die Probleme in den Datendateien beheben können. ERDDAP™ wird so eingerichtet, dass die Benutzer weiterhin alle verfügbaren gültigen Daten lesen können, obwohl einige Zeilen der Datei Fehler haben.
     
### EDDTableFromNOS{#eddtablefromnos} 
 [ **EDDTableFromNOS** ](#eddtablefromnos)   (DEPRECATE) Daten von einem NOAA   [NOS](https://opendap.co-ops.nos.noaa.gov/axis/) Quelle, die verwendet [ SOAP+XML ](https://www.w3schools.com/xml/xml_soap.asp) für Anfragen und Antworten. Es ist sehr spezifisch NOAA NOS XML. Siehe die Probe EDDTableFromNOS Datensatz in datasets2.xml.
 
### EDDTableFromOBIS{#eddtablefromobis} 
 [ **EDDTableFromOBIS** ](#eddtablefromobis) behandelt Daten von einem Ocean Biogeographic Information System (OBIS) Server (warhttp://www.iobis.org ) . Es ist möglich, dass es keine aktiven Server mehr gibt, die diese jetzt außerhalb des aktuellen OBIS-Serversystems verwenden.

* OBIS-Server erwarten eine XML-Anfrage und geben eine XML-Antwort zurück.
* Weil alle OBIS-Server die gleichen Variablen wie (warhttp://iobis.org/tech/provider/questions) , Sie müssen nicht viel angeben, um einen OBIS-Datensatz einzurichten ERDDAP .
* Sie müssen ein " creator\\_email " Attribut im globalen addAttributes , da diese Informationen innerhalb der Lizenz verwendet werden. Eine geeignete E-Mail-Adresse kann durch das Lesen der XML-Antwort aus der QuellURL gefunden werden.
* Sie können oder können das globale Attribut nicht erhalten [&lt; subsetVariables &gt; (#subsetvariables) mit einem gegebenen OBIS-Server arbeiten. Wenn Sie versuchen, versuchen Sie einfach eine Variable (zum Beispiel ScientificName oder Genus) .
#### EDDTableFromOBIS Skelette XML{#eddtablefromobis-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromOBIS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceCode>...&lt;/sourceCode>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- If you read the XML response from the sourceUrl, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source code (for example, GHMP) is the value from one of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;resource>&lt;code> tags. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- All ...SourceMinimum and Maximum tags are OPTIONAL -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMinimum>...&lt;/longitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMaximum>...&lt;/longitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMinimum>...&lt;/latitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMaximum>...&lt;/latitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For timeSource... tags, use yyyy-MM-dd'T'HH:mm:ssZ format. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMinimum>...&lt;/timeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMaximum>...&lt;/timeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1.  This MUST include  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"creator\\_email" -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromParquetFis{#eddtablefromparquetfiles} 
 [ **EDDTableFromParquetFis** ](#eddtablefromparquetfiles) Daten von [Parkett](https://parquet.apache.org/) . Sehen Sie die Superklasse dieser Klasse, [EDDTableFromFiles](#eddtablefromfiles) , für Informationen, wie diese Klasse funktioniert und wie sie verwendet werden.

* Parkett ist entworfen, um sehr effizient zu komprimieren, so kann es Ihnen kleinere Dateigrößen als andere Formate geben.
* Wir empfehlen dringend die Verwendung der [Datensätze generieren Xml Programm](#generatedatasetsxml) einen groben Entwurf der datasets.xml für diesen Datensatz. Das können Sie dann bearbeiten, um es zu verfeinern.
* WARNING: Wann ERDDAP™ liest Parquet-Datendateien, wenn es einen Fehler auf einer bestimmten Zeile findet (z.B. falsche Anzahl von Gegenständen) , es protokolliert eine Warnmeldung ("WARNUNG: Schlechte Linie (S) der Daten" ... mit einer Liste der schlechten Linien auf folgenden Zeilen) in der [log.txt Datei](/docs/server-admin/additional-information#log) und dann weiter den Rest der Datendatei lesen. So ist es Ihre Verantwortung, regelmäßig zu schauen (oder ein Skript schreiben, um dies zu tun) für diese Nachricht im Protokoll. txt, damit Sie die Probleme in den Datendateien beheben können. ERDDAP™ wird so eingerichtet, dass die Benutzer weiterhin alle verfügbaren gültigen Daten lesen können, obwohl einige Zeilen der Datei Fehler haben.
     
### EDDTableFrom SOS  {#eddtablefromsos} 
 [ **EDDTableFrom SOS ** ](#eddtablefromsos) behandelt Daten von einem Sensor Observation Service (SCHWEIZ [ SOS ](https://www.ogc.org/standards/sos) ) Server.

* Dieser Datensatztyp aggregiert Daten aus einer Gruppe von Stationen, die alle von einer SOS Server.
* Die Stationen dienen alle dem gleichen Satz von Variablen (obwohl die Quelle für jede Station nicht alle Variablen bedienen muss) .
*    SOS Server erwarten eine XML-Anfrage und geben eine XML-Antwort zurück.
* Wir empfehlen dringend die Verwendung der [Datensätze generieren Xml Programm](#generatedatasetsxml) einen groben Entwurf der datasets.xml für diesen Datensatz. Das können Sie dann bearbeiten, um es zu verfeinern. Es ist nicht einfach, den Datensatz XML für SOS Datensätze von Hand. Um die benötigten Informationen zu finden, müssen Sie besuchen sourceUrl +? Service: SOS &request= GetCapabilities " in einem Browser; schauen Sie sich das XML an; stellen Sie eine GetObservation-Anfrage von Hand; und schauen Sie sich die XML-Antwort auf die Anfrage an.
* Mit der gelegentlichen Hinzufügung neuer Typen SOS Server und Änderungen an den alten Servern, es wird immer schwieriger für ERDDAP™ den Servertyp automatisch aus den Antworten des Servers zu erkennen. Verwendung&lt;sosServerTyp&gt; (mit einem Wert von IOOS\\_NDBC, IOOS\\_NOS, OOSTethys , oder) ist jetzt STRONGLY EMPFEHLEN. Wenn Sie Probleme mit irgendwelchen Datensätzen dieser Art haben, versuchen Sie erneut GenerateDatasets Xml für die SOS Server. Generieren Datensätze Xml lässt Sie ausprobieren&lt;sosServerType&gt; Optionen, bis Sie die richtige für einen bestimmten Server finden.
*    SOS Übersicht:
    * SCHWEIZ (Sensor Web Enablement) und SOS   (Sensor Observation Service) werden [OpenGIS® Standards](https://www.ogc.org/standards) . Diese Website hat die Standards Dokumente.
    * Die OGC Web Services Gemeinsame Spezifikation ver 1.1.0 ( OGC L 347 vom 20.12.2013, S. 1).) deckt den Bau von GET- und POST-Abfragen ab (siehe Abschnitt 7.2.3 und Abschnitt 9) .
    * Wenn Sie eine getCapabilities xml Anfrage an eine SOS Server ( sourceUrl + "?service= SOS &request= GetCapabilities ") , Sie erhalten ein xml Ergebnis mit einer Liste von Stationen und die beobachtet Eigenschaften, für die sie Daten haben.
    * Ein beobachtetesProperty ist ein formales URI-Bezug auf eine Eigenschaft. Zum Beispiel urn:ogc:phenomenon:longitude:wgs84 oderhttps://mmisw.org/ont/cf/parameter/sea\\_water\\_temperature
    * Eine beobachteteProperty ist keine Variable.
    * Mehr als eine Variable kann die gleiche beobachtet haben Eigentum (z.B. innerhalbTemp und außen Temp könnte beide beobachtet werden Eigentumhttps://mmisw.org/ont/cf/parameter/air\\_temperature) .
    * Wenn Sie eine getObservation xml Anfrage an eine SOS Server, Sie erhalten ein xml-Ergebnis mit Beschreibungen von Feldnamen in der Antwort, Feldeinheiten und die Daten. Die Feldnamen enthalten Länge, Breite, Tiefe (vielleicht) und Zeit.
    * Jedes dataVariable für ein EDDTableFrom SOS muss ein "observedProperty" Attribut enthalten, das die beobachteteProperty identifiziert, die vom Server angefordert werden muss, um diese Variable zu erhalten. Oft, mehrere dataVariable s wird den gleichen Composite beobachtetProperty.
    * Der Datentyp für jeden dataVariable darf nicht vom Server angegeben werden. Wenn dies der Fall ist, müssen Sie sich die XML-Datenantworten des Servers ansehen und angemessen zuordnen [&lt;DatenTyp&gt; (#datatype) in der ERDDAP™ Datensatz dataVariable Definitionen.
    *    (Zum Zeitpunkt des Schreibens dieses) einige SOS Server reagieren auf getBeobachtungsanfragen für mehr als einen beobachteten Eigentum durch nur Rückgabe der Ergebnisse für die ersten der beobachtetenProperties. (Keine Fehlermeldung&#33;) Siehe die Parameteranforderung des Konstrukteurs Beobachtete AngeboteSeparately.
* EDDTableFrom SOS automatisch hinzugefügt
  >  <att name="[subsetVariables](#subsetvariables)">station\\_id, longitude, latitude</att>  
auf die globalen Attribute des Datensatzes, wenn der Datensatz erstellt wird.
*    SOS Server in der Regel drücken [Einheiten](#units) mit [UCUM](https://unitsofmeasure.org/ucum.html) System. Die ERDDAP™ Server Express-Einheiten mit der [ UDUNITS ](https://www.unidata.ucar.edu/software/udunits/) System. Wenn Sie zwischen den beiden Systemen wechseln müssen, können Sie [ ERDDAP 's Web-Service, um UCUM-Einheiten zu / von UDUNITS ](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html) .
#### EDDTableFrom SOS Skelette XML{#eddtablefromsos-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromSOS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sosServerType>...&lt;/sosServerType> &lt;!-- 0 or 1, but STRONGLY  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RECOMMENDED. This lets you specify the type of SOS server  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(so ERDDAP™ doesn't have to figure it out).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Valid values are: IOOS\\_NDBC, IOOS\\_NOS, OOSTethys, and WHOI. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;responseFormat>...&lt;/responseFormat> &lt;!-- 0 or 1. Use this only if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you need to override the default responseFormat for the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;specified sosServerType.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;stationIdSourceName>...&lt;/stationIdSourceName> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default="station\\_id". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceName>...&lt;/longitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceName>...&lt;/latitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceName>...&lt;/altitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;altitudeMetersPerSourceUnit>](#altitudemeterspersourceunit)...&lt;/altitudeMetersPerSourceUnit>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceName>...&lt;/timeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceFormat>...&lt;/timeSourceFormat>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- timeSourceFormat MUST be either  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For numeric data: a [UDUnits](https://www.unidata.ucar.edu/software/udunits/)\\-compatible string (with the format  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"*units* since *baseTime*") describing how to interpret  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source time values (for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"seconds since 1970-01-01T00:00:00Z"), where the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;base time is an ISO 8601:2004(E) formatted date time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string (yyyy-MM-dd'T'HH:mm:ssZ).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For String date time data: specify  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[units suitable for string times](#string-time-units)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;describing how to interpret string times  (for example, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ISO8601TZ\\_FORMAT "yyyy-MM-dd'T'HH:mm:ssZ"). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;observationOfferingIdRegex>...&lt;/observationOfferingIdRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Only observationOfferings with IDs (usually the station names)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which match this [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) will be included  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the dataset (".+" will catch all station names). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;requestObservedPropertiesSeparately>true|false(default)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/requestObservedPropertiesSeparately>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the [dataType](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the observedProperty attribute.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For IOOS SOS servers, \\*every\\* variable returned in the text/csv  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response MUST be included in this ERDDAP™ dataset definition. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromThreddsFiles{#eddtablefromthreddsfiles} 
 [ **EDDTableFromThreddsFiles** ](#eddtablefromthreddsfiles)   (depretiert) aggregiert Datendateien mit mehreren Variablen, jeweils mit einer oder mehreren gemeinsamen Abmessungen (zum Beispiel Zeit, Höhe (oder Tiefe) , Breite, Länge) , und serviert von [THRED OPeNDAP Server](https://www.unidata.ucar.edu/software/tds/) .

* Dieser Datensatztyp ist **DEPRECATE** . Die neuere und allgemeinere Lösung ist die [Cache AusUrl Option für EDDTable VonFiles](#cachefromurl)   (oder eine Variante) , die eine lokale Kopie der Remote-Dateien macht und die Daten aus den lokalen Dateien bedient. Die&lt;ccheFromUrl&gt; Option kann mit jeder Art von tabellarischen Datendatei aus jeder webbasierten Quelle verwendet werden, die eine verzeichnisartige Liste von Dateien veröffentlicht. **   
Wenn Sie diese Arbeit aus irgendeinem Grund nicht machen können, mailen Sie Chris. John bei noaa.gov.
Wenn vor 2020 keine Beschwerden vorliegen, kann dieser Datensatztyp entfernt werden. ** 
* Wir empfehlen dringend die Verwendung der [Datensätze generieren Xml Programm](#generatedatasetsxml) einen groben Entwurf der datasets.xml für diesen Datensatz. Das können Sie dann bearbeiten, um es zu verfeinern.
* In den meisten Fällen hat jede Datei mehrere Werte für die linkeste (erste) Dimension, zum Beispiel Zeit.
* Die Dateien oft (aber muss nicht) einen einzigen Wert für die anderen Abmessungen haben (zum Beispiel Höhe (oder Tiefe) , Breite, Länge) .
* Die Dateien können Zeichenvariablen mit einer zusätzlichen Dimension aufweisen (zum Beispiel nCharacters) .
* THREDDS-Server können durch die "/thredds/" in den URLs identifiziert werden. Zum Beispiel
```
    https://www.ncei.noaa.gov/thredds/catalog/uv/6h\\_strs\\_agg/catalog.html
```
* THREDDS Server haben Kataloge an verschiedenen Orten. Diese Klasse REQUIRES, dass die URL "/thredds/catalog/" enthält. Sie können diese Variable in der Regel finden, indem Sie in einem Browser im Root-Katalog starten und dann auf den gewünschten Subkatalog klicken.
* Diese Klasse liest die katalog.xml Dateien, die von THREDDS mit den Listen von&lt;KatalogRefs&gt; (Referenzen zu zusätzlichen Katalog.xml Unterdateien) und&lt;Datensatz&gt; (Datendateien) .
* Die&lt;fileDir&gt; Einstellung wird ignoriert. Da diese Klasse herunterladen und eine lokale Kopie jeder Remote-Datendatei macht, ERDDAP™ die Datei Dir zu sein *BigParentDirectory* / Kopieren/ * datasetID * /.
* Für&lt; sourceUrl &gt; die URL der Catalog.xml-Datei für den Datensatz im THREDDS-Server verwenden, zum Beispiel: für diese URL, die in einem Webbrowser verwendet werden kann,
    https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.html  \\[ 2020-10-21 Dieser Server ist nicht mehr zuverlässig verfügbar. \\] ,
Verwendung&lt; sourceUrl &gt;https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.xml&lt;/ sourceUrl &gt;
     (aber auf eine Linie setzen) .
* Da diese Klasse immer Downloads und eine lokale Kopie jeder Remote-Datendatei macht, sollten Sie diesen Datensatz niemals einpacken [EDDTableCopy](#eddtablecopy) .
* Dieser Datensatztyp unterstützt ein OPTIONAL, selten verwendet, Sondertag,&lt;SpecialMode&gt; *Modus* &lt;/specialMode&gt;, die verwendet werden kann, um zu bestimmen, welche Dateien von dem Server heruntergeladen werden sollen. Derzeit ist die einzige gültig *Modus* ist SAMOS, die mit Datensätzen vonhttps://tds.coaps.fsu.edu/thredds/catalog/samosnur die Dateien mit der letzten Versionsnummer herunterladen.
* Sehen Sie die Superklasse dieser Klasse, [EDDTableFromFiles](#eddtablefromfiles) , für Informationen, wie diese Klasse funktioniert und wie sie verwendet werden.
* Siehe die Beispiele 1D, 2D, 3D und 4D für [EDDTableFromNcFis](#eddtablefromncfiles) .
     
### EDDTableFrom WFS Dateien{#eddtablefromwfsfiles} 
 [ **EDDTableFrom WFS Dateien** ](#eddtablefromwfsfiles)   (DEPRECATE) eine lokale Kopie aller Daten aus einer ArcGIS Kartenserver WFS Server so dass die Daten dann schnell reserviert werden können, um ERDDAP™ Benutzer.

* Sie müssen eine speziell formatierte sourceUrl globales Attribut zu sagen ERDDAP™ wie Sie Feature-Informationen vom Server anfordern können. Bitte verwenden Sie dieses Beispiel als Vorlage:
```
    <att name="sourceUrl">http://*someUrl/dir1/dir2*/MapServer/WFSServer?request=GetFeature&amp;service=WFS&amp;typename=aasg:BoreholeTemperature&amp;format=&quot;text/xml;%20subType=gml/3.1.1/profiles/gmlsf/1.0.0/0"</att>  
```
     (aber alles auf eine Linie setzen) 
* Sie müssen ein spezielles globales Attribut hinzufügen, um zu sagen ERDDAP™ wie man die Namen der Blöcke von Daten identifiziert, die heruntergeladen werden sollten. Dies wird wahrscheinlich für alle EDDTableFrom arbeiten WFS Dateien datasets:
```
    <att name="rowElementXPath">/wfs:FeatureCollection/gml:featureMember</att>
```
* Da diese Klasse immer Downloads und eine lokale Kopie jeder Remote-Datendatei macht, sollten Sie diesen Datensatz niemals einpacken [EDDTableCopy](#eddtablecopy) .
* Sehen Sie die Superklasse dieser Klasse, [EDDTableFromFiles](#eddtablefromfiles) , für zusätzliche Informationen, wie diese Klasse funktioniert und wie sie verwendet werden.
     
### EDDTableAggregateRows{#eddtableaggregaterows} 
 [ **EDDTableAggregateRows** ](#eddtableaggregaterows) kann einen EDDTable-Datensatz aus einer Gruppe von "Kind" EDDTable-Datensätzen machen.

* Hier sind einige Anwendungen für EDDTableAggregateRows:
    * Sie könnten einen EDDTableAggregateRows-Datensatz aus zwei verschiedenen Arten von Dateien oder Datenquellen machen, beispielsweise einen Datensatz mit Daten bis zum Ende des letzten Monats, der in .nc CF-Dateien und ein Datensatz mit Daten für den aktuellen Monat in einer relationalen Datenbank gespeichert.
    * Sie könnten einen EDDTableAggregateRows-Datensatz erstellen, um mit einer Änderung der Quelldateien zu umgehen (z.B. das Zeitformat geändert oder ein variabler Name geändert wird, oder Daten Typ scale\\_factor / add\\_offset geändert) . In diesem Fall würde ein Kind Daten von Dateien erhalten, die vor der Änderung gemacht werden, und das andere Kind würde Daten von Dateien nach der Änderung gemacht bekommen. Diese Verwendung von EDDTableAggregateRows ist eine Alternative zur Verwendung [NcML](#ncml-files) oder [ NCO ](#netcdf-operators-nco) . Es sei denn, es gibt ein Unterscheidungsmerkmal in den Dateinamen (so können Sie verwenden&lt;fileNameRegex&gt;, um zu bestimmen, welche Datei zu welcher Kind-Datensatz gehört), müssen Sie wahrscheinlich die Dateien für die beiden Kind-Datensätze in verschiedenen Verzeichnissen speichern.
    * Sie könnten einen EDDTableAggregateRows-Datensatz erstellen, der eine gemeinsame Teilmenge von Variablen eines oder mehrerer ähnlicher, aber unterschiedlicher Datensätze aufweist, beispielsweise einen Datensatz, der einen Profildatensatz aus der Kombination eines Profildatensatzes, eines TimeSeriesProfildatensatzes und eines TrajectoryProfile-Datensatzes macht. (die einige verschiedene Variablen und einige Variablen gemeinsam haben -- in welchem Fall müssen Sie spezielle Varianten für die Kinderdatensätze machen, mit nur den in-common Variablen) .
    * Sie könnten mehrere Standalone-Datensätze haben, jede mit der gleichen Art von Daten, aber von einer anderen Station. Sie könnten diese Datensätze intakt lassen, aber auch einen EDDTableAggregateRows-Datensatz erstellen, der Daten von allen Stationen hat -- jeder der Kinderdatensätze könnte ein einfacher [EDDTableFromErddap](#eddfromerddap) , die auf einen der vorhandenen Stationsdatensätze zeigt. Wenn Sie dies tun, geben Sie jedem der EDDTableFromErddap-Datensätze eine andere datasetID als die ursprünglichen Standalone-Datensätze, z.B. durch Anwenden von "Kind" an das Original datasetID .
* Jedes Kind&lt;dataset&gt;'s spezifiziert muss ein vollständiger Datensatz sein, als wäre es ein eigenständiger Datensatz. Jeder muss gleich sein [ dataVariable S](#datavariable) , in der gleichen Reihenfolge, mit der gleichen [ destinationName S](#destinationname) , [Daten Arten](#datatype) , [ missing\\_value S](#missing_value) , [\\_FillValues](#missing_value) , und [Einheiten](#units) . Die Metadaten für jede Variable für den EDDTableAggregateRows-Datensatz stammen aus Variablen im ersten Kinderdatensatz, aber EDDTableAggregateRows wird die [ actual\\_range ](#actual_range) Metadaten sind der eigentliche Bereich für alle Kinder.
* Empfehlung: Holen Sie sich jeden der Kinderdatensätze als eigenständige Datensätze. Dann versuchen Sie, den EDDTableAggregateRows Datensatz zu machen, indem Sie die datasets.xml chunk für jeden in das neue EDDTableAggregate Zeilendatensatz.
* Datensatz Standard Sortieren von Bestellung -- Die Reihenfolge der Kinderdatensätze bestimmt die Gesamt-Standard-Sortenfolge der Ergebnisse. Natürlich können Benutzer eine andere Sortierreihenfolge für eine bestimmte Reihe von Ergebnissen durch Appending & anfordern orderBy  (" *Komma-separierte Variablenliste* ") bis zum Ende ihrer Abfrage.
* Die "Quelle" [weltweit Attribute](#global-attributes) für den EDDTableAggregateRows ist der kombinierte GlobalAttributes aus dem ersten Kinderdatensatz. Das EDDTableAggregate Rows können eine globale&lt; addAttributes &gt; zur Bereitstellung zusätzlicher globaler Attribute oder übergeordneter globaler Attribute.
#### EDDTableAggregate Rows Skelett XML{#eddtableaggregaterows-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableAggregateRows" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableCopy{#eddtablecopy} 
 [ **EDDTableCopy** ](#eddtablecopy) kann eine lokale Kopie von vielen Arten von EDDTable-Datensätzen erstellen und dann die Daten schnell aus der lokalen Kopie speichern.

* EDDTableCopy (und für Netzdaten, [ EDDGrid Kopie](#eddgridcopy) ) ist sehr einfach zu bedienen und sehr effektiv **Lösung für einige der größten Probleme mit der Verwendung von Daten aus Remote-Datenquellen:** 
    * Der Zugriff auf Daten von einer entfernten Datenquelle kann langsam sein.
        * Sie können langsam sein, weil sie inhärent langsam sind (beispielsweise eine ineffiziente Art von Servern) ,
        * weil sie von zu vielen Anträgen überfordert sind,
        * oder weil Ihr Server oder der Remoteserver Bandbreite begrenzt ist.
    * Der Remote-Datensatz ist manchmal nicht verfügbar (wieder, aus verschiedenen Gründen) .
    * Die Wiederherstellung auf einer Quelle für die Daten skaliert nicht gut (zum Beispiel, wenn viele Benutzer und viele ERDDAP s nutzen es) .
         
* Wie es funktioniert -- EDDTableCopy löst diese Probleme automatisch, indem Sie eine lokale Kopie der Daten erstellen und erhalten und Daten aus der lokalen Kopie. ERDDAP™ kann sehr schnell Daten aus der lokalen Kopie bedienen. Und das Erstellen und Verwenden einer lokalen Kopie erleichtert die Last auf dem Remote-Server. Und die lokale Kopie ist eine Sicherung des Originals, was nützlich ist, falls etwas mit dem Original passiert.
    
Es gibt nichts Neues über eine lokale Kopie eines Datensatzes. Was hier neu ist, ist, dass diese Klasse es macht\\*leicht\\*zu erstellen und\\*Pflege\\*eine lokale Kopie von Daten aus einer\\*Sorte\\*von Arten von Remote-Datenquellen und\\*Metadaten hinzufügen\\*beim Kopieren der Daten.
    
#### EDDTableCopy vs&lt;ccheFromUrl&gt;{#eddtablecopy-vs-cachefromurl} 
&lt;ccheFromUrl&gt; ist eine Alternative zu EDDTableCopy. Sie arbeiten anders.

* EDDTable Kopieren Sie die Arbeiten, indem Sie die Daten von einem Remote-Service anfordern und diese Stücke in lokalen Dateien speichern. So ist EDDTableCopy in einigen Fällen nützlich, in denen die Daten über einen Remote-Service zugänglich sind.
* (&lt;CacheFromUrl&gt; (#cachefromurl) herunterladt die vorhandenen Dateien auf einer Remote-Website.&lt;ccheFromUrl&gt; ist einfacher zu bedienen und zuverlässiger, da es leicht sagen kann, wann es eine neue Remote-Datendatei gibt oder wenn sich eine Remote-Datendatei geändert hat und daher heruntergeladen werden muss.

Wenn es Situationen gibt, in denen EDDTableCopy oder&lt;cacheFromUrl&gt; könnte verwendet werden, verwenden&lt;ccheFromUrl&gt; weil es einfacher und zuverlässiger ist.
     
#### &lt;ExtraktDestination Name und Anschrift{#extractdestinationnames} 
EDDTable Das Kopieren macht die lokale Kopie der Daten durch das Anfordern von Datensätzen aus dem entfernten Datensatz. EDDTable Kopieren bestimmt, welche Stücke auf Anfrage durch Anfrage des &distinct () Werte für die&lt;ExtraktDestinationNamen&gt; (in der datasets.xml , siehe unten) , die die platzgetrennten Zielnamen von Variablen im Remote-Datensatz sind. Zum Beispiel
```
    <extractDestinationNames>drifter profile</extractDestinationNames>  
```
können verschiedene Wertekombinationen von Drifter=tig17,Profil=1017, Drifter=tig17,Profil=1095, ... Drifter=une12,Profil=1223, Drifter=une12,Profil=1251, ... ergeben.

In Situationen, in denen eine Spalte (z.B. Profil) kann alles sein, was erforderlich ist, um eine Gruppe von Zeilen von Daten eindeutig zu identifizieren, wenn es eine sehr große Anzahl von beispielsweise Profilen gibt, kann es nützlich sein, auch einen zusätzlichen Extrakt anzugeben Bestimmung Name (zum Beispiel Drift) die zur Unterteilung der Profile dient. Dies führt zu weniger Datendateien in einem bestimmten Verzeichnis, was zu einem schnelleren Zugriff führen kann.
    
#### Lokale Dateien{#local-files} 
Jeder Datenbruch wird in einem separaten NetCDF Datei in einem Unterverzeichnis *BigParentDirectory* / Kopieren/ * datasetID * / (wie angegeben [Setup.xml](/docs/server-admin/deploy-install#setupxml) ) . Es gibt eine Unterverzeichnisebene für alle, aber der letzte ExtraktDestinationName. Beispielsweise wären Daten für tig17+1017 in
     *BigParentDirectory* /copy/sampleDataset/tig17/1017 .nc .
Beispielsweise würden Daten für une12+1251 in
     *BigParentDirectory* /copy/sampleDataset/une12/1251 .nc .
Verzeichnisse und Dateinamen, die aus Datenwerten erstellt wurden, werden geändert, um sie Datei-Name-sicher zu machen (zum Beispiel werden Leerzeichen durch "x20" ersetzt) -- das beeinflusst die tatsächlichen Daten nicht.
     
#### Neue Daten{#new-data} 
Jedes Mal EDDTable Kopieren wird neu geladen, es überprüft den Remote-Datensatz, um zu sehen, was verschiedene Stücke zur Verfügung stehen. Wenn die Datei für einen Datenklumpen nicht bereits vorhanden ist, wird eine Anfrage, den Bruch zu bekommen, zu einer Warteschlange hinzugefügt. ERDDAP 's taskThread verarbeitet alle gelöschten Anfragen nach Datenschlangen, einzeln. Sie können Statistiken für die Aufgabe sehenDeine Tätigkeit auf der [Statusseite](/docs/server-admin/additional-information#status-page) und [Tagesbericht](/docs/server-admin/additional-information#daily-report) . (Ja. ERDDAP™ könnte diesem Prozess mehrere Aufgaben zuordnen, aber das würde viele der Bandbreite, Speicher und CPU-Zeit der Remote-Datenquelle nutzen, und viele der lokalen ERDDAP Bandbreite, Speicher und CPU-Zeit, von denen keine gute Idee ist.) 
    
HINWEIS: Das erste Mal, dass ein EDDTableCopy geladen wird, (wenn alles gut geht) Es werden viele Anfragen an Datenknöpfe der TaskThread's Queue hinzugefügt, aber keine lokalen Datendateien werden erstellt. So wird der Konstrukteur scheitern, aber TaskThread wird weiterhin arbeiten und lokale Dateien erstellen. Wenn alles gut geht, wird die TaskThread einige lokale Datendateien machen und der nächste Versuch, den Datensatz neu zu laden (in ~15 Minuten) wird erfolgreich, aber zunächst mit einer sehr begrenzten Datenmenge.
    
HINWEIS: Nachdem der lokale Datensatz einige Daten und erscheint in Ihrem ERDDAP , wenn der Remote-Datensatz vorübergehend oder dauerhaft nicht zugänglich ist, wird der lokale Datensatz noch funktionieren.
    
WARNING: Wenn der Remote-Datensatz groß ist und/oder der Remote-Server langsam ist (Das ist das Problem, oder?&#33;) , es dauert eine lange Zeit, um eine vollständige lokale Kopie zu machen. In einigen Fällen wird die erforderliche Zeit inakzeptabel sein. Beispielsweise sendet 1 TB von Daten über eine T1-Leitung (0,15 GB/s) mindestens 60 Tage unter optimalen Bedingungen. Darüber hinaus verwendet es viele Bandbreite, Speicher und CPU-Zeit auf den Remote- und lokalen Computern. Die Lösung besteht darin, eine Festplatte an den Administrator des Remote-Datensatzes zu senden, damit s/he eine Kopie des Datensatzes erstellen und die Festplatte wieder an Sie senden kann. Verwenden Sie diese Daten als Ausgangspunkt und EDDTableCopy wird die Daten dazu hinzufügen. (So hat der EC2 Cloud Service von Amazon das Problem bearbeitet, auch wenn sein System viel Bandbreite hat.) 
    
WARNING: Wenn eine bestimmte Kombination von Werten aus einem entfernten Datensatz verschwindet, löscht EDDTableCopy die lokale kopierte Datei NICHT. Wenn Sie wollen, können Sie es selbst löschen.
    
#### Tabelle&lt;CheckSourceData&gt;{#tablecopy-checksourcedata} 
Die datasets.xml für diesen Datensatz kann ein optionales Tag
```
    <checkSourceData>true</checkSourceData>  
```
Der Standardwert ist wahr. Wenn/wenn Sie es auf false setzen, wird der Datensatz niemals den Quelldatensatz überprüfen, um zu sehen, ob zusätzliche Daten verfügbar sind.
     
#### Empfohlene Verwendung{#recommended-use} 
1. Erstellen Sie die&lt;Datensatz&gt; Eintrag (der native Typ, nicht EDDTableCopy) für die Remote-Datenquelle. **Machen Sie es richtig, einschließlich aller gewünschten Metadaten.** 
2. Wenn es zu langsam ist, fügen Sie XML-Code hinzu, um es in einem EDDTableCopy-Datensatz zu wickeln.
    * Verwenden Sie ein anderes datasetID   (vielleicht durch Veränderung datasetID von der alten datasetID leicht) .
    * Kopieren Sie die&lt;zugänglich Zu&gt;&lt;reloadEveryNMinutes&gt; und&lt;aufChange&gt; von der Remote-EDDTable's XML in das XML von EDDTableCopy. (Ihre Werte für EDDTableCopy Materie; ihre Werte für den inneren Datensatz sind irrelevant.) 
    * Erstellen Sie die&lt;ExtraktDestinationNames&gt; tag (siehe oben) .
    *   &lt;orderExtractBy&gt; ist eine OPTIONAL-Raum getrennte Liste von Zielvariablennamen im Remote-Datensatz. Wenn jeder Datensprung vom Remote-Server heruntergeladen wird, wird der chunk nach diesen Variablen sortiert (durch die erste Variable, dann durch die zweite Variable, wenn die erste Variable gebunden ist, ...) . In einigen Fällen ERDDAP™ kann Daten schneller aus den lokalen Datendateien extrahieren, wenn die erste Variable in der Liste eine numerische Variable ist ( "time" zählt als numerische Variable) . Aber wählen Sie diese Variablen in einer für den Datensatz geeigneten Weise aus.
3.   ERDDAP™ eine lokale Kopie der Daten erstellen und pflegen.
         
* WARNING: EDDTableCopy geht davon aus, dass sich die Datenwerte für jedes Stück nie ändern. Wenn/wenn sie es tun, müssen Sie die chunk-Dateien manuell löschen *BigParentDirectory* / Kopieren/ * datasetID * / die geändert und [Flagge](/docs/server-admin/additional-information#flag) der zu ladende Datensatz, so dass die gelöschten Stücke ersetzt werden. Wenn Sie ein E-Mail-Abonnement zum Datensatz haben, erhalten Sie zwei E-Mails: eine, wenn der Datensatz zuerst neu geladen und die Daten kopiert, und eine andere, wenn der Datensatz wieder geladen wird. (automatisch) und erkennt die neuen lokalen Datendateien.
     
* Metadaten ändern -- Wenn Sie etwas ändern müssen addAttributes oder die Reihenfolge der dem Quelldatensatz zugeordneten Variablen ändern:
    1. Änderung der addAttributes für den Quelldatensatz in datasets.xml , wie nötig.
    2. Löschen Sie eine der kopierten Dateien.
    3. Stellen Sie ein [Flagge](/docs/server-admin/additional-information#flag) um den Datensatz sofort neu zu laden. Wenn Sie ein Flag verwenden und ein E-Mail-Abonnement zum Datensatz haben, erhalten Sie zwei E-Mails: eine, wenn der Datensatz zuerst neu geladen wird und die Daten kopiert, und eine andere, wenn der Datensatz wieder geladen wird. (automatisch) und erkennt die neuen lokalen Datendateien.
    4. Die gelöschte Datei wird mit den neuen Metadaten regeneriert. Wenn der Quelldatensatz jemals nicht verfügbar ist, erhält der EDDTableCopy-Datensatz Metadaten aus der regenerierten Datei, da es die jüngste Datei ist.
         
*    [ EDDGrid Kopie](#eddgridcopy) ist sehr ähnlich wie EDDTableCopy, arbeitet aber mit gerasteten Datensätzen.
#### EDDTableCopy Skelett XML{#eddtablecopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractDestinationNames>...&lt;/extractDestinationNames>  &lt;!-- 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderExtractBy>...&lt;/orderExtractBy> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#tablecopy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

- - Ja.

## Details{#details-1} 

Hier finden Sie detaillierte Beschreibungen von gemeinsamen Tags und Attributen.

### &lt;winkelDegreeUnits&gt;{#angulardegreeunits} 
* ( ** &lt;winkelDegreeUns&gt; ** &#33; (#angulardegreeunits) ist ein selten benutztes OPTIONAL-Tag innerhalb eines&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml die eine comma-separierte Liste von Einheiten Strings enthält, die ERDDAP™ sollte als Winkel Grad Einheiten behandeln. Hat eine Variable eine dieser Einheiten, tabledap ' orderByMean filter berechnet den Mittelwert in besonderer Weise, dann melden Sie den Mittelwert als Wert von -180 bis 180. Vgl. ERDDAP 's EDStatic.java Quellcode-Datei für die aktuelle Standardliste. Änderungen des Wertes dieses Tags werden das nächste Mal wirksam ERDDAP™ liest datasets.xml , einschließlich in Reaktion auf einen Datensatz [Flagge](/docs/server-admin/additional-information#flag) .
### &lt;winkelDegreeTrueUnits&gt;{#angulardegreetrueunits} 
* ( ** &lt;Winkel DegreeTrueUnits&gt; ** &#33; (#angulardegreetrueunits) ist ein selten benutztes OPTIONAL-Tag innerhalb eines&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml die eine comma-separierte Liste von Einheiten Strings enthält, die ERDDAP™ sollte als Winkel Grad echte Einheiten behandeln. Hat eine Variable eine dieser Einheiten, tabledap ' orderByMean filter berechnet den Mittelwert in besonderer Weise, dann melden Sie den Mittelwert als Wert von 0 bis 360. Vgl. ERDDAP 's EDStatic.java Quelldatei für die aktuelle Standardliste. Änderungen des Wertes dieses Tags werden das nächste Mal wirksam ERDDAP™ liest datasets.xml , einschließlich in Reaktion auf einen Datensatz [Flagge](/docs/server-admin/additional-information#flag) .
     
### &lt;CommonStandardNames&gt;{#commonstandardnames} 
* ( ** &lt;CommonStandardNames&gt; ** &#33; (#commonstandardnames) ist ein selten benutztes OPTIONAL-Tag innerhalb eines&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml eine gemeinschaftlich getrennte Liste der gemeinsamen [CF-Standardnamen](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) . Z.B.,
```
    <commonStandardNames>air\\_pressure, ..., wind\\_to\\_direction</commonStandardNames>  
```
Diese Liste wird in DataProviderForm3.html als Bequemlichkeit für Benutzer verwendet.
Wenn Sie diese Informationen in datasets.xml , durch Kopieren der aktuellen Standardliste in&lt;DEFAULT\\_commonStandardNames&gt; in ERDDAP '
 \\[ Tomcat \\] /webapps/erdap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml Datei.
     
### &lt;CacheMinutes&gt;{#cacheminutes} 
* ( ** &lt;CacheMinutes&gt; ** &#33; (#cacheminutes) ist ein selten benutztes OPTIONAL-Tag innerhalb eines&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml das Alter angeben (in Minuten) bei dem Dateien im Cache gelöscht werden sollten (Standard = 60) . Z.B.,
```
    <cacheMinutes>60</cacheMinutes>  
```
Im Allgemeinen nur Bilddateien (weil die gleichen Bilder oft wiederholt angefordert werden) und .nc Dateien (weil sie vor dem Senden an den Benutzer vollständig erstellt werden müssen) werden geätzt. Obwohl es scheint, als sollte eine bestimmte Anfrage immer die gleiche Antwort zurückgeben, das ist nicht wahr. Zum Beispiel a tabledap Anfrage, die Zeit umfasst *einige Zeit* ändert sich, wenn neue Daten für den Datensatz ankommen. Und eine Gridap-Anforderung, die beinhaltet \\[ Letzter Beitrag \\] für die Zeitdimension wird sich ändern, wenn neue Daten für den Datensatz ankommen. Änderungen des Wertes dieses Tags werden das nächste Mal wirksam ERDDAP™ liest datasets.xml , einschließlich in Reaktion auf einen Datensatz [Flagge](/docs/server-admin/additional-information#flag) . Vor ERDDAP™ v2.00, dies wurde in setup.xml angegeben, was noch erlaubt ist, aber entmutigt.

### &lt;ccheClearMinutes&gt;{#cacheclearminutes} 
* ( ** &lt;cacheClearMinutes&gt; ** &#33; (#cacheclearminutes) ist ein selten benutztes OPTIONAL-Tag innerhalb eines&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml die Häufigkeit anzugeben, um die geätzten Dateien zu überprüfen und alte zu entfernen (in Minuten)   (Standardeinstellungen) . Z.B.,
```
    <cacheClearMinutes>15</cacheClearMinutes>  
```
Wenn der Server die Bearbeitung einer Anfrage beendet, wird es überprüfen, wie lange der letzte Cache klar war. Wenn es zu lange her war, wird es eine Aufgabe auf dem TaskThread löschen, um den Cache. Änderungen des Wertes dieses Tags werden das nächste Mal wirksam ERDDAP™ liest datasets.xml , einschließlich in Reaktion auf einen Datensatz [Flagge](/docs/server-admin/additional-information#flag) . Dies kann in setup.xml angegeben werden, aber das ist entmutigt.
     
### &lt;konvertieren InterpolateRequestCSVExample&gt;{#convertinterpolaterequestcsvexample} 
* ( ** &lt;konvertierenInterpolateRequestCSVExamping&gt; ** &#33; (#convertinterpolaterequestcsvexample) ist ein OPTIONAL-Tag innerhalb eines&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml   \\[ beginnend mit ERDDAP™ V2.10 \\] die ein Beispiel enthält, das auf der Webseite des Interpolate-Konverters angezeigt wird. Der Standardwert ist: jplMU RSS T41/analysiert sst /Bilinear/4 .
### &lt;konvertiert InterpolateDatasetIDVariableList&gt;{#convertinterpolatedatasetidvariablelist} 
* ( ** &lt;konvertierenInterpolateDatasetIDVariableList&gt; ** &#33; (#convertinterpolatedatasetidvariablelist) ist ein OPTIONAL-Tag innerhalb eines&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml   \\[ beginnend mit ERDDAP™ V2.10 \\] die eine CSV-Liste enthält datasetID /variabel Namensbeispiele, die von der Interpolate-Konverter-Webseite als Anregungen verwendet werden. Der Standardwert ist: jplMU RSS T41/analysiert sst .
### &lt;ConvertToPublicSourceUrl&gt;{#converttopublicsourceurl} 
* ( ** &lt;konvertierenToPublicSourceUrl&gt; ** &#33; (#converttopublicsourceurl) ist ein OPTIONAL-Tag innerhalb eines&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml das ein "from" und ein "to" Attribut enthält, das angibt, wie man ein passendes Lokal umwandelt sourceUrl   (normalerweise eine IP-Nummer) in einer Öffentlichkeit sourceUrl   (einen Domainnamen) . "von" muss die Form haben " \\[ Was? \\] // \\[ Was? \\] ". Es können 0 oder mehr dieser Tags sein. Weitere Informationen siehe [&lt; sourceUrl &gt; (#sourceurl) . Zum Beispiel
```
    <convertToPublicSourceUrl from="https://192.168.31.18/" to="https://oceanwatch.pfeg.noaa.gov/" />  
```
wird ein passendes Lokal verursachen sourceUrl   (wie folgt:https://192.168.31.18/thredds/dodsC/satellite/BA/ssta/5day)   
in einer Öffentlichkeit sourceUrl   (https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day) .
Änderungen des Wertes dieses Tags werden das nächste Mal wirksam ERDDAP™ liest datasets.xml , einschließlich in Reaktion auf einen Datensatz [Flagge](/docs/server-admin/additional-information#flag) .

Aber aus Sicherheitsgründen und Gründen im Zusammenhang mit dem Abonnementsystem, **Nicht diese TAG&#33;**   
Verwenden Sie stattdessen immer den öffentlichen Domainnamen in der&lt; sourceUrl &gt; tag und verwenden [/etc/hosts Tabelle](https://linux.die.net/man/5/hosts) auf Ihrem Server lokale Domänennamen ohne Verwendung eines DNS-Servers in IP-Nummern konvertieren. Sie können testen, ob ein Domain-Name richtig in eine IP-Nummer umgewandelt wird, indem Sie:
p *ein paar.domain.name*   
     
### Daten:Bild/Png;base64,{#dataimagepngbase64} 
* Wenn ein Benutzer einen .htmlTable Antwort ERDDAP™ , falls die Daten in einer String-Zelle Daten enthalten:Bild/png;base64, gefolgt von einem base64 codierten .png-Bild, ERDDAP™ wird ein Symbol anzeigen (so kann der Benutzer das Bild sehen, wenn sie darüber schweben) und Tasten, um den Text oder das Bild in der Zwischenablage zu speichern. Diese Funktion wurde hinzugefügt ERDDAP™ v2.19 von Marco Alba.
###  drawLandMask  {#drawlandmask} 
*    [ ** drawLandMask ** ](#drawlandmask) gibt die Standardeinstellung an, die kontrolliert, wann und wie die Landmaske gezogen werden soll, wenn ERDDAP™ zieht eine Karte. Es kann an drei verschiedenen Orten in datasets.xml   (von der niedrigsten bis höchsten Priorität) :
    
    1. wenn drawLandMask innerhalb&lt;erdddapDatasets&gt; (nicht mit einem bestimmten Datensatz verbunden) , dann gibt es den Standardwert an drawLandMask für alle Variablen in allen Datensätzen. Zum Beispiel
    ```
        <drawLandMask>under</drawLandMask>  
    ```
Änderungen des Wertes dieses Tags werden das nächste Mal wirksam ERDDAP liest datasets.xml .
Wenn dieser Tag nicht vorhanden ist, ist der zugrunde liegende Standardwert unter.
         
    2. wenn drawLandMask wird als globales Attribut eines bestimmten Datensatzes angegeben, dann gibt es den Standardwert von drawLandMask für alle Variablen in diesem Datensatz, Überschreitung einer niedrigeren Prioritätseinstellung. Zum Beispiel
    ```
        <att name="drawLandMask">under</att>  
    ```
Änderungen des Wertes dieses Tags werden das nächste Mal wirksam ERDDAP™ den Datensatz neu lädt.
         
    3. wenn drawLandMask wird als Attribut einer Variable in einem bestimmten Datensatz angegeben, dann wird der Standardwert von drawLandMask für diese Variable in diesem Datensatz, übergeordnet jede untere Prioritätseinstellung. Zum Beispiel
    ```
        <att name="drawLandMask">under</att>  
    ```
Änderungen des Wertes dieses Tags werden das nächste Mal wirksam ERDDAP™ den Datensatz neu lädt.
    
Ein Benutzer kann den Standard überschreiben (wo immer es angegeben ist) durch die Auswahl eines Wertes für "Draw land mask" aus einer Dropdown-Liste auf der Website des Datensatzes Make A Graph oder durch einschließlich &.land= *Wert* in der URL, die eine Karte von ERDDAP .
    
In allen Situationen gibt es 4 mögliche Werte für das Attribut:
    
    * "unter" zieht die Landmaske, bevor sie Daten auf der Karte zieht.
Für gegitterte Datensätze erscheint Land als konstante hellgraue Farbe.
Für tabellarische Datensätze zeigt "unter" Topographiedaten über Land und Ozeane.
    * "über" -- Für gegitterte Datensätze zieht "over" die Landmaske, nachdem sie Daten auf Karten zieht, so dass sie alle Daten über Land maskieren wird. Für tabellarische Datensätze zeigt "over" die Bathymetrie des Ozeans und ein konstantes helles Grau, wo es Land gibt, beide unter den Daten gezeichnet.
    * "outline" zieht nur den Umriss der Landmasse, politische Grenzen, Seen und Flüsse.
    * "aus" zieht nichts.
### &lt;E-MailDiagnosticsToErdData&gt;{#emaildiagnosticstoerddata} 
* ( ** &lt;E-MailDiagnosticsToErdData&gt; ** &#33; (#emaildiagnosticstoerddata) ist ein selten benutztes OPTIONAL-Tag innerhalb eines&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml . Der Wert des Tags kann wahr sein (Der Standard) oder falsch. Wenn wahr, ERDDAP™ wird den Stack-Track zu Chris senden. John bei Noaa. Gov (die ERDDAP™ Entwicklungsteam) . Dies sollte sicher und sicher sein, da keine vertraulichen Informationen (z.B. die AnfrageUrl) ist in der E-Mail enthalten. Dies sollte es ermöglichen, alle unsicheren, völlig unerwarteten Fehler zu fangen, die zu NullPointerExceptions führen. Ansonsten sieht der Benutzer die Ausnahmen, aber die ERDDAP™ Entwicklungsteam nicht (Wir wissen nicht, dass ein Problem behoben werden muss) .
     
### &lt;GraphBackgroundColor&gt;{#graphbackgroundcolor} 
* ( ** &lt;GrafikBackgroundColor&gt; ** &#33; (#graphbackgroundcolor) ist ein selten benutztes OPTIONAL-Tag innerhalb eines&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml die Standard-Hintergrundfarbe auf Diagrammen angeben. Dies betrifft fast alle Grafiken. Es gibt einige Situationen, die nicht betroffen sind. Die Farbe wird als 8-stelliger hexadezimaler Wert in der Form 0xAARRGGBB angegeben, wobei AA, RR, GG und BB die Trübungs-, Rot-, Grün- und Blaukomponenten sind. "0x" ist case sensitive, aber die hexadezimalen Ziffern sind nicht Case sensitive. Zum Beispiel eine vollständig opake (ff.) grünlich-blaue Farbe mit rot=22, grün=88, blau=ee würde 0xff2288ee sein. Opaque white ist 0xffffffffff. Der Standard ist opak hellblau (0xffcc) , die den Vorteil hat, von Weiß verschieden zu sein, was eine wichtige Farbe in vielen Paletten ist, die verwendet werden, um Daten zu zeichnen. Zum Beispiel
    ```
    <graphBackgroundColor>0xffffffff</graphBackgroundColor>  
    ```
Änderungen des Wertes dieses Tags werden das nächste Mal wirksam ERDDAP™ liest datasets.xml , einschließlich in Reaktion auf einen Datensatz [Flagge](/docs/server-admin/additional-information#flag) .
### &lt;ipAddressMaxRequests&gt;{#ipaddressmaxrequests} 
* ( ** &lt;ipAddressMaxRequests&gt; ** &#33; (#ipaddressmaxrequests) ist ein selten verwendeter optionaler Tag (zuerst unterstützt mit ERDDAP™ ,2.12) innerhalb von&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml das Teil eines Systems ist, um die Fähigkeit von über aggressiven legitimen Benutzern und bösartigen Benutzern zu begrenzen, eine große Anzahl von gleichzeitigen Anfragen zu machen, die die Systemleistung für andere Benutzer beeinträchtigen würde. ipAddress MaxRequests gibt die maximale Anzahl von gleichzeitigen Anfragen an, die von einer bestimmten IP-Adresse akzeptiert werden. Zusätzliche Anfragen erhalten einen HTTP 429-Fehler: Zu viele Anfragen. Die kleinen, statischen Dateien in erddap/download/ und erddap/images/ sind NICHT von dieser Anzahl ausgenommen. Der Standard ist 15. Das Maximum erlaubt ist 1000, das ist verrückt hoch -- tun Sie es nicht&#33; ERDDAP™ nicht akzeptieren eine Zahl weniger als 6 weil viele legitime Benutzer (insbesondere Webbrowser und WMS Kunden) bis zu 6 Anfragen zu einem Zeitpunkt stellen. Die ERDDAP™ Der Daily Report und die ähnlichen Informationen, die in der log.txt-Datei mit jedem Major Dataset Reload geschrieben wurden, enthalten nun eine Tally der Anfragen dieser IP-Adressen unter dem Titel "Requesters IP Adresse (Zu viele Anfragen) ".
Änderungen des Wertes dieses Tags werden das nächste Mal wirksam ERDDAP™ liest datasets.xml , einschließlich in Reaktion auf einen Datensatz [Flagge](/docs/server-admin/additional-information#flag) .
    
Der Abschnitt "Major LoadDatasets Time Series" von status.html enthält eine Spalte "tooMany", in der die Anzahl der Anfragen aufgelistet ist, die die Einstellung ipAddressMaxRequests des Benutzers überschritten haben und somit einen Fehler "Too Many Requests" sahen. Dies lässt Sie leicht sehen, wenn es aktiv über aggressive legitime Benutzer und bösartige Benutzer, so dass Sie können (optional) suchen Sie in der log.txt-Datei und entscheiden Sie sich, ob Sie diese Benutzer Blacklist wünschen.
    
Es gibt nichts Besonderes daran, dies auf eine höhere Zahl zu setzen. Es liegt an dir. Aber dies ermöglicht/ermutigt die Menschen, Systeme einzurichten, die eine große Anzahl von Threads verwenden, um an Projekten zu arbeiten und gibt ihnen dann kein Feedback, dass das, was sie tun, ihnen keinen Nutzen bringt.
### &lt;ipAddressMaxRequestsActive&gt;{#ipaddressmaxrequestsactive} 
* ( ** &lt;ipAddressMaxRequestsActive&gt; ** &#33; (#ipaddressmaxrequestsactive) ist ein selten verwendeter optionaler Tag (zuerst unterstützt mit ERDDAP™ ,2.12) innerhalb von&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml das Teil eines Systems ist, um die Fähigkeit von über aggressiven legitimen Benutzern und bösartigen Benutzern zu begrenzen, eine große Anzahl von gleichzeitigen Anfragen zu machen, die die Systemleistung für andere Benutzer beeinträchtigen würde. ipAddressMaxRequestsActive gibt die maximale Anzahl der gleichzeitigen Anfragen an, die von jeder bestimmten IP-Adresse aktiv bearbeitet werden. Zusätzliche Anfragen stehen in einer Warteschlange, bis die vorherigen Anfragen bearbeitet wurden. Die kleinen, statischen Dateien in erddap/download/ und erddap/images/ ARE sind von dieser Zählung und der damit verbundenen Drosselung ausgenommen. Der Standard ist 2. Das Maximum erlaubt ist 100, das ist verrückt hoch -- tun Sie es nicht&#33; Sie können dies auf 1 setzen, um streng zu sein, vor allem, wenn Sie Probleme mit über aggressive oder bösartige Benutzer haben. Benutzer erhalten immer noch schnell alle Daten, die sie anfordern (bis zu ipAddressMaxRequests) , aber sie werden nicht in der Lage sein, Systemressourcen zu schüren. Wir empfehlen nicht, dies auf eine größere Anzahl zu setzen, weil es übermäßig aggressive legitime Benutzer und bösartige Benutzer zu dominieren ERDDAP die Verarbeitungskapazität.
Änderungen des Wertes dieses Tags werden das nächste Mal wirksam ERDDAP™ liest datasets.xml , einschließlich in Reaktion auf einen Datensatz [Flagge](/docs/server-admin/additional-information#flag) .
     
### &lt;ipAddressUnlimited&gt;{#ipaddressunlimited} 
* ( ** &lt;ipAddressUnlimited&gt; ** &#33; (#ipaddressunlimited) ist ein selten verwendeter optionaler Tag (zuerst unterstützt mit ERDDAP™ ,2.12) innerhalb von&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml das Teil eines Systems ist, um die Fähigkeit von über aggressiven legitimen Benutzern und bösartigen Benutzern zu begrenzen, eine große Anzahl von gleichzeitigen Anfragen zu machen, die die Systemleistung für andere Benutzer beeinträchtigen würde. ipAddressUnlimited ist eine komma-separierte Liste von IP-Adressen, die Sie unbegrenzten Zugriff auf Ihre ERDDAP . Sieh in dein Protokoll. txt Datei, um zu sehen, welches Format Ihr Server für die IP-Adressen verwendet. Auf einigen Servern werden die IP-Adressen im Format #.#.#.#.# (wobei # eine ganze Zahl von 0 bis 255 ist) ; während auf anderen wird es im Format #:#:#:#:#:#:#:#:#:#:#:#:# . Anfragen auf dieser Liste unterliegen weder den ipAddressMaxRequests noch den ipAddressMaxRequestsActive-Einstellungen. Dies könnte eine sekundäre ERDDAP™ oder für bestimmte Benutzer oder Server in Ihrem System. ERDDAP™ immer fügt " (unbekanntIPAdresse) ", die ERDDAP™ Verwendungen, wenn die IP-Adresse des Requesters nicht ermittelt werden kann, z.B. für andere Prozesse, die auf demselben Server laufen.
Änderungen des Wertes dieses Tags werden das nächste Mal wirksam ERDDAP™ liest datasets.xml , einschließlich in Reaktion auf einen Datensatz [Flagge](/docs/server-admin/additional-information#flag) .
    
Wenn aus irgendeinem Grund alle Anfragen eines Benutzers die Fehlermeldung erhalten "Timeout warten auf Ihre anderen Anfragen zu bearbeiten.", dann können Sie das Problem lösen, indem Sie die IP-Adresse des Benutzers in die ipAddressUnlimited-Liste hinzufügen, diese Änderung anwenden, dann entfernen Sie es aus dieser Liste.
    
### &lt;lastDatasetsMinutes&gt;{#loaddatasetsminminutes} 
* ( ** &lt;lastDatasetsMinutes&gt; ** &#33; (#loaddatasetsminminutes) ist ein selten benutztes OPTIONAL-Tag innerhalb eines&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml zur Angabe der Mindestzeit (in Minuten) zwischen Hauptlast Datensätze (wenn ERDDAP™ Wiederaufarbeitungen datasets.xml , einschließlich der Überprüfung jedes Datensatzes, um zu sehen, ob es nach seinem Nachladen neu geladen werden muss EveryNMinutes Einstellung, default=15) . Z.B.,
```
    <loadDatasetsMinMinutes>15</loadDatasetsMinMinutes>  
```
Wenn ein vorgegebener Ablauf von loadDatasets weniger dauert als dieses Mal, sieht der Ladegerät einfach immer wieder das Flag-Verzeichnis an und/oder schläft, bis die verbleibende Zeit vergangen ist. Die Standardeinstellung beträgt 15 Minuten, was für fast alle gut sein sollte. Der einzige Nachteil, dies auf eine kleinere Zahl zu stellen, ist, dass es die Frequenz erhöhen wird, dass ERDDAP™ rettet Datensätze, die Fehler haben, die sie nicht geladen werden (z.B. ein Remoteserver ist unten) . Wenn es viele solcher Datensätze gibt und sie häufig wieder getestet werden, könnte die Datenquelle sie als pestering/aggressive Verhalten betrachten. Änderungen des Wertes dieses Tags werden das nächste Mal wirksam ERDDAP™ liest datasets.xml , einschließlich in Reaktion auf einen Datensatz [Flagge](/docs/server-admin/additional-information#flag) . Vor ERDDAP™ v2.00, dies wurde in setup.xml angegeben, was noch erlaubt ist, aber entmutigt.
     
### &lt;LoadDatasetsMaxMinutes&gt;{#loaddatasetsmaxminutes} 
* ( ** &lt;lastDatasetsMaxMinutes&gt; ** &#33; (#loaddatasetsmaxminutes) ist ein OPTIONAL-Tag innerhalb eines&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml die maximale Zeit (in Minuten) eine große Last Datasets Aufwand ist erlaubt (vor der Last Datensätze, die als "gestaut" behandelt werden und unterbrochen werden)   (Standard = 60) . Z.B.,
```
    <loadDatasetsMaxMinutes>60</loadDatasetsMaxMinutes>  
```
Im Allgemeinen sollte dies auf mindestens doppelt so lange festgelegt werden, wie Sie vernünftigerweise denken, dass alle Datensätze neu geladen werden. (kumulativ) sollte (da Computer und Netzwerke manchmal langsamer sind als erwartet) Dies sollte immer viel länger sein als ladenDatasetsMinutes. Die Standardeinstellung beträgt 60 Minuten. Einige Leute werden das länger einstellen. Änderungen des Wertes dieses Tags werden das nächste Mal wirksam ERDDAP™ liest datasets.xml , einschließlich in Reaktion auf einen Datensatz [Flagge](/docs/server-admin/additional-information#flag) . Vor ERDDAP™ v2.00, dies wurde in setup.xml angegeben, was noch erlaubt ist, aber entmutigt.
     
### &lt;logLevel&gt;{#loglevel} 
* ( ** &lt;logLevel&gt; ** &#33; (#loglevel) ist ein OPTIONAL-Tag innerhalb eines&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml wie viele Diagnosenachrichten an die log.txt-Datei gesendet werden. Es kann auf "warning" gesetzt werden (die wenigen Nachrichten) , "info" (Der Standard) , oder "alle" (die meisten Nachrichten) . Z.B.,
```
    <logLevel>info</logLevel>  
```
Änderungen des Wertes dieses Tags werden das nächste Mal wirksam ERDDAP™ liest datasets.xml , einschließlich in Reaktion auf einen Datensatz [Flagge](/docs/server-admin/additional-information#flag) . Vor ERDDAP™ v2.00, dies wurde in setup.xml angegeben, was noch erlaubt ist, aber entmutigt.
     
### &lt;TeilRequestMaxBytes&gt und&lt;TeilRequestMaxZells &gt;{#partialrequestmaxbytes-and-partialrequestmaxcells} 
* ( ** &lt;TeilRequestMaxBytes&gt; **&#33; (#partialrequestmaxbytes-and-partialrequestmaxcells) und [** &lt;TeilRequestMaxZells&gt; ** &#33; (#partialrequestmaxbytes-and-partialrequestmaxcells) werden selten OPTIONAL Tags innerhalb einer&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml . Wann möglich (und es ist nicht immer möglich) , ERDDAP™ bricht große Datenanforderungen in Stücke, um Speicher zu erhalten.
    
mit 32 Bit Java , im einfachen Sinne, die maximale Anzahl der gleichzeitigen *groß* Anfragen sind etwa 3/4 des Speichers verfügbar (der -Xmx-Wert an Tomcat übergeben) geteilt durch die Stückgröße (z.B. 1200 MB / 100 MB =&gt; 12 Anfragen) . Andere Dinge benötigen Speicher, so dass die tatsächliche Anzahl der Anfragen weniger sein wird. In der Praxis ist es nicht immer möglich. So könnte eine große oder ein paar sehr große gleichzeitige nicht-kunkbare Anfragen Probleme auf 32 Bit verursachen Java .

mit 64 Bit Java , der -Xmx-Wert kann viel größer sein. So ist das Gedächtnis viel weniger wahrscheinlich eine Einschränkung zu sein.

Sie können die Standard-Chunk-Größe überschreiben, indem Sie diese Tags in datasets.xml   (mit unterschiedlichen Werten als hier dargestellt) :
Für Gitter:&lt;TeilRequestMaxBytes&gt;100000000&lt;/partialRequestMaxBytes&gt;
Für Tabellen:&lt;TeilRequestMaxZells&gt;1000000&lt;/partialRequestMaxZells&gt;

partiellRequestMaxBytes ist die bevorzugte maximale Anzahl von Bytes für eine Teilnetzdatenanforderung (ein Stück der gesamten Anfrage) . Standard=1000000000000 (10^8) . Größere Größen sind nicht unbedingt besser (und gehen Sie nicht über 500 MB, denn das ist THREDDS Standardlimit für DAP Antworten) . Aber größere Größen können weniger Zugriffe von Tonnen von Dateien erfordern (Denken ERD 's Satellitendaten mit jedem Zeitpunkt in einer separaten Datei - es ist besser, mehr Daten von jeder Datei in jeder Teilanforderung zu erhalten) .

partiellRequestMaxCells ist die bevorzugte maximale Anzahl von Zellen (nRows \\* nKolumnen in der Datentabelle) für eine teilweise TABELLE-Datenanforderung (ein Stück der gesamten Anfrage) . Standard = 100000. Größere Größen sind nicht unbedingt besser. Sie führen zu einem längeren Warten auf die anfängliche Datenmenge aus der Quelle.

Änderungen des Wertes dieses Tags werden das nächste Mal wirksam ERDDAP™ liest datasets.xml , einschließlich in Reaktion auf einen Datensatz [Flagge](/docs/server-admin/additional-information#flag) . Vor ERDDAP™ v2.00, diese wurden in setup.xml angegeben, was noch erlaubt ist, aber entmutigt.
     
### &lt;AnfrageBlacklist&gt;{#requestblacklist} 
* ( ** &lt;AnfrageBlacklist&gt; ** &#33; (#requestblacklist)   [ist ein OPTIONAL-Tag](/docs/server-admin/additional-information#frequent-crashes-or-freezes) innerhalb von&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml die eine komma-separierte Liste von numerischen IP-Adressen enthält, die schwarz aufgeführt werden. Änderungen des Wertes dieses Tags werden das nächste Mal wirksam ERDDAP™ liest datasets.xml , einschließlich in Reaktion auf einen Datensatz [Flagge](/docs/server-admin/additional-information#flag) .
    * Dies kann verwendet werden, um eine [Denial of Service Angriff](https://en.wikipedia.org/wiki/Denial_of_service) , ein übermäßig eifersüchtig [Web-Roboter](https://en.wikipedia.org/wiki/Internet_bot) , oder jede andere Art von störenden Benutzer.
    * Beunruhigender Benutzer -- wenn ERDDAP™ Slows to a crawl or freezes/stops, die Ursache ist oft ein störender Benutzer, der auf einmal mehr als ein Skript läuft und/oder eine große Anzahl von sehr großen, extrem ineffizienten oder ungültigen Anfragen oder gleichzeitigen Anfragen macht. Sieh mal. [Pressemitteilung](/docs/server-admin/additional-information#log) zu sehen, ob dies der Fall ist und die numerische IP-Adresse des störenden Benutzers zu finden. Wenn dies das Problem ist, sollten Sie wahrscheinlich Blacklist dieser Benutzer.
        
Wann ERDDAP™ erhält eine Anfrage von einer schwarzen Liste IP-Adresse, es wird HTTP Error 403: Forbidden zurückgeben. Die begleitende Text-Fehlermeldung ermutigt den Benutzer, Sie per E-Mail zu senden, ERDDAP Administrator, um die Probleme zu lösen. Wenn sie die Zeit nehmen, die Fehlermeldung zu lesen (viele offenbar nicht) und Sie kontaktieren, können Sie dann mit ihnen arbeiten, um sie zu einem Zeitpunkt nur ein Skript ausführen zu lassen, effizientere Anfragen zu stellen, die Probleme in ihrem Skript zu beheben (z.B. die Anforderung von Daten von einem entfernten Datensatz, der vor dem Zeitpunkt nicht reagieren kann) , oder was auch immer sonst die Quelle von Schwierigkeiten war.
        
Benutzer sind oft einfach nicht bewusst, dass ihre Anfragen sind störend. Sie sind oft nicht bewusst, dass Fehler, grobe Ineffizienzen oder andere Probleme mit ihren Skripten. Sie denken oft, dass, weil Sie ERDDAP™ bietet Daten kostenlos an, dass sie nach so vielen Daten fragen können, wie sie z.B. durch mehrere Skripte oder durch gleichzeitige Verwendung mehrerer Threads wünschen.
        
        * Sie können ihnen erklären, dass jeder ERDDAP™ , jetzt ist wichtig, wie groß und mächtig, hat endlich Ressourcen (CPU-Zeit, Festplatte I/O, Netzwerkbandbreite, etc.) und es ist nicht fair, wenn ein Benutzer Daten in einer Weise anfordert, die andere Benutzer oder Überbürden ausfüllt ERDDAP .
        * Sobald ein Benutzer weiß, wie man 2 gleichzeitige Anfragen macht, sehen sie oft keinen Grund, nicht 5, 10 oder 20 gleichzeitige Anfragen zu machen, da die zusätzlichen Anfragen sie nichts kosten. Es ist wie asymmetrische Kriegsführung: Hier haben die Offensive Waffen einen enormen Vorteil (Null Kosten) über die Verteidigungswaffen (eine endliche Installation mit realen Kosten) .
        * Sie weisen darauf hin, dass es immer weniger Rückgaben gibt, um mehr und mehr gleichzeitige Anfragen zu stellen; die zusätzlichen Anfragen blockieren die Anfragen anderer Benutzer weiter; sie geben ihnen keine große Verbesserung.
        * Erinnern Sie sich daran, dass es andere Benutzer (sowohl lässige Benutzer als auch andere Benutzer, die Skripte ausführen) , so ist es nicht fair, dass sie alle ERDDAP Ressourcen.
        * Beachten Sie, dass die Tech-Giganten die Nutzer dazu gebracht haben, unendliche Ressourcen von Web-Services zu erwarten. Während es Wege gibt, sich einzurichten [Netz/Kunden/Föderationen ERDDAP S](/docs/server-admin/scaling) um ein ERDDAP™ System mit mehr Ressourcen, die meisten ERDDAP™ Administratoren haben nicht das Geld oder die Arbeitskräfte, um solche Systeme einzurichten, und ein solches System wird noch endlich sein. Im ERD Zum Beispiel gibt es eine Person (ich) Schreiben ERDDAP™ , Verwaltung zwei ERDDAP S (mit Hilfe von meinem Chef) , und Verwaltung mehrerer Datenquellen, alle mit einem jährlichen Hardware-Budget von $0 (wir verlassen uns auf gelegentliche Zuwendungen für Hardware) . Dies ist nicht Google, Facebook, Amazon, etc. mit 100's von Ingenieuren, und Millionen von Dollar von Umsatz zu recyceln in immer größere Systeme. Und wir können uns nicht einfach bewegen ERDDAP™ zum Beispiel Amazon AWS, weil die Datenspeicherkosten groß sind und die Datenausgangsgebühren groß und variabel sind, während unser Budget für externe Dienstleistungen ein festes $0 ist.
        * Meine Anfrage an die Benutzer ist: für nicht-time-sensitive Anfragen (was bei weitem der häufigste Fall ist) , ihr System sollte nur eine Anfrage zu einer Zeit. Wenn die Anfragen zeitempfindlich sind (z.B. mehrere .pngs auf einer Webseite, mehrere Fliesen für eine WMS Client, etc.) , dann sollten vielleicht 4 gleichzeitige Anträge die max (und nur für eine sehr kurze Zeit) .
        * Wenn Sie die Situation dem Benutzer erklären, werden die meisten Benutzer verstehen und bereit sein, die notwendigen Änderungen vorzunehmen, damit Sie ihre IP-Adresse aus der Blacklist entfernen können.
             
    * Um einen Benutzer zu Blacklist zu verlinken, fügen Sie die numerische IP-Adresse in die komma getrennte Liste der IP-Adressen ein&lt;AnfrageBlacklist&gt; in Ihrem datasets.xml Datei. Um die lästige IP-Adresse des Benutzers zu finden, schauen Sie in der ERDDAP™   *BigParentDirectory* /logs/log.txt Datei ( *BigParentDirectory* wird angegeben in [Setup.xml](/docs/server-admin/deploy-install#setupxml) ) um zu sehen, ob dies der Fall ist und die IP-Adresse des Nutzers zu finden. Die IP-Adresse für jeden Antrag ist in den Zeilen aufgeführt, die mit "&#123;&#123;&#123;&#123;#" beginnen und 4 Zahlen, die durch Zeiträume getrennt sind, beispielsweise 123.45.67.8 . Die Suche nach "ERROR" hilft Ihnen, Probleme wie ungültige Anfragen zu finden.
    * Sie können auch die letzte Nummer in einer IP-Adresse ersetzen mit\\*(z.B. 202.109.200.\\*) eine Reihe von IP-Adressen zu blockieren, 0-255.
    * Sie können auch die letzten 2 Nummern in einer IP-Adresse ersetzen mit\\*.\\*  (beispielsweise 121.204.\\*.\\*) um ein breiteres Spektrum an IP-Adressen zu blockieren, 0-255.0-255.
    * Zum Beispiel
    ```
        <requestBlacklist>98.76.54.321, 202.109.200.\\*, 121.204.\\*.\\*</requestBlacklist>
    ```
    * Sie müssen nicht neu starten ERDDAP™ für die Änderungen&lt;AnfrageBlacklist&gt; zur Wirkung. Die Änderungen werden beim nächsten Mal erkannt ERDDAP™ überprüft, ob Datensätze neu geladen werden müssen. Oder Sie können den Prozess beschleunigen, indem Sie eine [Pressemitteilungen Seite nicht gefunden](/docs/server-admin/additional-information#set-dataset-flag) für jeden Datensatz.
    * Ihr ERDDAP™ Der tägliche Bericht enthält eine Liste/die meisten aktiven zugelassenen und blockierten Anfragenden.
    * Wenn Sie herausfinden möchten, welche Domain/Institution mit einer numerischen IP-Adresse zusammenhängt, können Sie einen kostenlosen, umgekehrten DNS-Webservice wie [https://network-tools.com/](https://network-tools.com/) .
    * Es kann Zeiten geben, in denen es sinnvoll ist, bestimmte Benutzer auf einer höheren Ebene zu blockieren, zum Beispiel bösartige Benutzer. Zum Beispiel können Sie den Zugriff auf alles auf Ihrem Server blockieren, nicht nur ERDDAP . Auf Linux ist eine solche Methode zu verwenden [iptables](https://www.linode.com/docs/guides/control-network-traffic-with-iptables/) . Zum Beispiel können Sie eine Regel hinzufügen, die alles ab 198.51.100.0 mit dem Befehl blockieren wird.
iptables -I INPUT -s 198.51.100.0 -j DROP
       
### &lt;langsamDownTroubleMillis&gt;{#slowdowntroublemillis} 
* ( ** &lt;langsamDownTroubleMillis&gt; ** &#33; (#slowdowntroublemillis) ist ein selten benutztes OPTIONAL-Tag innerhalb eines&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml die eine ganze Zahl enthält, die die Zahl der Millisekunden angibt (Standard=1000) bei der Reaktion auf alle fehlgeschlagenen Anfragen, z.B. unbekannter Datensatz, zu groß anfragen, Benutzer auf der Blacklist. Z.B.,
    ```
    <slowDownTroubleMillis>2000</slowDownTroubleMillis>
    ```
Wenn ein Skript eine Anfrage unmittelbar nach der anderen macht, dann könnte es schnell eine schlechte Anfrage nach der anderen machen. Mit dieser Einstellung können Sie ein fehlgeschlagenes Skript so verlangsamen ERDDAP™ ist nicht mit schlechten Anträgen überschwemmt. Wenn ein Mensch eine schlechte Bitte macht, werden sie diese Verzögerung nicht einmal bemerken. Empfehlungen:
    
    * Wenn das Problem ein verteilter Dienst (DDOS) Angriff von 100+ Angreifern, setzen Sie diese auf eine kleinere Anzahl (100?) . Die Verlangsamung führt zu zu zu vielen aktiven Fäden.
    * Wenn die Probleme von 1-10 Quellen sind, setzen Sie diese auf 1000 ms (Der Standard) , aber eine größere Zahl (wie 10000) ist auch vernünftig. Das verlangsamt sie, damit sie weniger Netzwerkressourcen verschwenden. Auch 1000 ms oder so werden keine ärgerlichen Menschen, die eine schlechte Anfrage machen.
    
Änderungen des Wertes dieses Tags werden das nächste Mal wirksam ERDDAP™ liest datasets.xml , einschließlich in Reaktion auf einen Datensatz [Flagge](/docs/server-admin/additional-information#flag) .
     
### &lt;AboEmailBlacklist&gt;{#subscriptionemailblacklist} 
* ( ** &lt;Abonnement EmailBlacklist&gt; ** &#33; (#subscriptionemailblacklist) ist ein selten benutztes OPTIONAL-Tag innerhalb eines&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml die eine comma-separierte Liste von E-Mail-Adressen enthält, die sofort von der [System des Abonnements](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions) z.B.
    ```
    <subscriptionEmailBlacklist>bob@badguy.com, john@badguy.com</subscriptionEmailBlacklist>  
    ```
Dies ist ein Fall-unempfindliches System. Wenn eine E-Mail-Adresse dieser Liste hinzugefügt wird, wenn diese E-Mail-Adresse Abonnements hat, werden die Abonnements storniert. Wenn eine E-Mail-Adresse auf der Liste zu abonnieren versucht, wird die Anfrage abgelehnt. Änderungen des Wertes dieses Tags werden das nächste Mal wirksam ERDDAP™ liest datasets.xml , einschließlich in Reaktion auf einen Datensatz [Flagge](/docs/server-admin/additional-information#flag) .
     
### Standardtext{#standard-text} 
*    [ **Standardtext** ](#standard-text) -- Es gibt mehrere OPTIONAL Tags (die meisten werden selten verwendet) innerhalb von&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml Text an verschiedenen Stellen angeben ERDDAP . Wenn Sie den Standardtext ändern möchten, kopieren Sie den vorhandenen Wert aus dem Tag des gleichen Namens in
     *Tomcat* /webapps/erdap/WEB-INF/classes/gov/noaa/pfel/erdap/util.messages.xml in datasets.xml , dann ändern Sie den Inhalt. Der Vorteil, diese in datasets.xml ist, dass Sie jederzeit neue Werte angeben können, auch wenn ERDDAP™ läuft. Änderungen der Werte dieser Tags werden das nächste Mal wirksam ERDDAP™ liest datasets.xml , einschließlich in Reaktion auf einen Datensatz [Flagge](/docs/server-admin/additional-information#flag) . Die Tagsnamen beschreiben ihren Zweck, sehen aber den Standardinhalt in message.xml für ein tieferes Verständnis.
    
    *   &lt;StandardLicense&gt;
    *   &lt;StandardKontakt &gt;
    *   &lt;StandardDataLicenses&gt;
    *   &lt;StandardDisclaimerOfEndorsement&gt;
    *   &lt;StandardDisclaimerOfExternalLinks&gt;
    *   &lt;StandardGeneralDisclaimer&gt;
    *   &lt;Standard DatenschutzPolicy&gt;
    *   &lt;StartHeadHtml5&gt;
    *   &lt;startBodyHtml5&gt; ist ein guter Tag zum Ändern, um das Aussehen der Oberseite jeder Webseite in Ihrer ERDDAP . Bemerkenswert, können Sie diese verwenden, um eine temporäre Nachricht auf dem ERDDAP™ Startseite (z.B. "Check out the new JPL MUR SST v4.1 dataset ..." oder "This ERDDAP™ wird offline für die Wartung 2019-05-08T17:00 PDT durch 2019-05-08T20:00 PDT sein.") . Eine Quirke dieses Tags in datasets.xml ist: wenn Sie neu starten ERDDAP , die erste Aufforderung, ERDDAP™ zurück zum Standardstart BodyHtml5 HTML, aber jede nachfolgende Anfrage wird den in datasets.xml .
    *   &lt;Die Beschreibung Html&gt; ist ein guter Tag zum Ändern, um die Beschreibung Ihres ERDDAP . Beachten Sie, dass Sie diese leicht ändern können, um eine temporäre Nachricht auf der Startseite hinzufügen (z.B.: "Das ERDDAP™ wird offline für die Wartung 2019-05-08T17:00 PDT durch 2019-05-08T20:00 PDT sein.") .
    *   &lt;EndBodyHtml5&gt;
    
      
Vor ERDDAP™ v2.00, diese wurden in setup.xml angegeben, was noch erlaubt ist, aber entmutigt.
     
### &lt;ungewöhnlich Tätigkeit &gt;{#unusualactivity} 
* ( ** &lt;Ungewöhnliche Wirksamkeit&gt; ** &#33; (#unusualaktivität) ist ein selten benutztes OPTIONAL-Tag innerhalb eines&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml die maximale Anzahl der Anfragen zwischen zwei Runs von LoadDatasets anzugeben, die als normal angesehen werden (Standard=10000) . Wenn diese Zahl überschritten wird, wird eine E-Mail an emailEverythingTo gesendet (wie in setup.xml angegeben) . Z.B.,
    ```
    <unusualActivity>10000</unusualActivity>  
    ```
Änderungen des Wertes dieses Tags werden das nächste Mal wirksam ERDDAP™ liest datasets.xml , einschließlich in Reaktion auf einen Datensatz [Flagge](/docs/server-admin/additional-information#flag) . Vor ERDDAP™ v2.00, dies wurde in setup.xml angegeben, was noch erlaubt ist, aber entmutigt.
     
### &lt;updateMaxEvents&gt;{#updatemaxevents} 
* ( ** &lt;updateMaxEvents&gt; ** &#33; (#updatemaxevents) ist ein selten benutztes OPTIONAL-Tag innerhalb eines&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml um die maximale Anzahl von Dateiwechselereignissen anzugeben (Standardeinstellungen) die von der [&lt;UpdateEveryNMillis&gt;] (#updateeverynmillis) System vor dem Umschalten, um den Datensatz neu zu laden. Zum Beispiel
    ```
    <updateMaxEvents>10</updateMaxEvents>  
    ```
Das updateEveryNMillis-System soll sehr schnell laufen, bevor die Anfrage eines Benutzers bearbeitet wird. Wenn es eine Menge Dateiänderungsereignisse gibt, kann es vermutlich nicht schnell laufen, so dass es stattdessen fordert, dass der Datensatz neu geladen wird. Wenn Sie ERDDAP™ befasst sich mit Datensätzen, die aktuell gehalten werden müssen, auch wenn es Änderungen an einer großen Anzahl von Datendateien gibt, können Sie diese auf eine größere Anzahl stellen (100?) .

### &lt;Benutzer &gt;{#user} 
* ( ** &lt;&gt; ** &#33; (#user) ist ein OPTIONAL-Tag innerhalb eines&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml dass den Benutzernamen eines Benutzers identifiziert, Passwort (wenn Authentifizierung = kunden) , und Rollen (eine gemeinsame Liste) . Die Verwendung von Benutzernamen und Passwort variiert leicht abhängig vom Wert von [&lt;Authentifizierung (/docs/server-admin/additional-information#authentication) in deiner ERDDAP 's setup.xml-Datei.
    * Das ist Teil von ERDDAP ' [Sicherheitssystem](/docs/server-admin/additional-information#security) zur Einschränkung des Zugriffs auf einige Datensätze auf einige Benutzer.
    * Machen Sie eine separate&lt;Benutzer-Tag für jeden Benutzer. Optional, wenn Authentifizierung = Oauth2, können Sie zwei einrichten&lt;&gt; tags für jeden Benutzer: ein für, wenn der Benutzer über Google, eine für, wenn der Benutzer über Orcid einloggt, vermutlich mit den gleichen Rollen.
    * Wenn es keine gibt&lt;Benutzer-Tag für einen Client, s/he kann nur auf öffentliche Datensätze zugreifen, d.h. Datensätze, die keine [&lt;zugänglichzu&gt; (#accessibleto) tag.
    * Benutzername
Für die Authentifizierung=custom ist der Benutzername in der Regel eine Kombination aus Buchstaben, Ziffern, Unterstrichen und Perioden.
Für die Authentifizierung=E-Mail ist der Benutzername die E-Mail-Adresse des Benutzers. Es kann jede E-Mail-Adresse sein.
Für die Authentifizierung = Google ist der Benutzername die volle Google-E-Mail-Adresse des Nutzers. Dazu gehören Google-managed-Konten wie @noaa.gov Konten.
Für die Authentifizierung=orcid ist der Benutzername die Orcid-Kontonummer des Benutzers (mit Bindestrichen) .
Für die Authentifizierung=oauth2 ist der Benutzername die volle Google-E-Mail-Adresse oder die Orcid-Kontonummer des Benutzers. (mit Bindestrichen) .
    * Passwort vergessen?
Für die Authentifizierung=E-Mail, google, orcid oder oauth2 geben Sie kein Passwort-Attribut an.
Für die Authentifizierung=custom müssen Sie für jeden Benutzer ein Passwort-Attribut angeben.
        * Die Passwörter, die Benutzer eingeben, sind case sensitive und müssen 8 oder mehr Zeichen haben, so dass sie schwerer zu knacken sind. Heutzutage können sogar 8 Zeichen schnell und kostengünstig durch brutale Kraft mit einem Cluster von Computern auf AWS gekrackt werden. ERDDAP™ nur das 8-Kennzeichen Minimum durchsetzt, wenn der Benutzer einloggt (nicht wenn der&lt;Benutzer-Tag wird verarbeitet, weil dieser Code nur die Hash-Verdauung des Passworts sieht, nicht das Klartext-Passwort).
        * setup.xml's&lt;Passwort Encoding&gt; ermittelt, wie Passwörter in der&lt;&gt; in den Warenkorb datasets.xml . Um die Sicherheit zu erhöhen, sind die Optionen:
            *    [MD5](https://en.wikipedia.org/wiki/MD5)   (Nicht benutzen&#33;) -- für das Passwort-Attribut, geben Sie den MD5 Hash-Dau des Benutzers Passwort an.
            * UEPMD5 (Nicht benutzen&#33;) -- für das Passwort-Attribut, geben Sie die MD5 Hash-Dau von *Benutzername* : ERDDAP : *Passwort vergessen?* . Der Benutzername und " ERDDAP " werden verwendet [Salz](https://en.wikipedia.org/wiki/Salt_(cryptography) ) den Hash-Wert, wodurch es schwieriger zu decodieren.
            *    [SHA256](https://en.wikipedia.org/wiki/SHA-2)   (nicht empfohlen) -- für das Passwort-Attribut, geben Sie die SHA-256 Hash-Verdauung des Benutzers Passwort.
            * UEPSHA256 (standard, empfohlen passwortEncoding. Aber viel besser: Verwenden Sie die Google-, Orchideen- oder oauth2-Authentifizierungsoptionen.) -- für das Passwort-Attribut, geben Sie die SHA-256 Hash-Verdauung *Benutzername* : ERDDAP : *Passwort vergessen?* . Der Benutzername und " ERDDAP " werden verwendet, um den Hash-Wert zu salzen, so dass es schwieriger zu decodieren.
        * Unter Windows können Sie MD5 Passwort-Verdauwerte generieren, indem Sie ein MD5-Programm herunterladen (wie folgt: [MD5](https://www.fourmilab.ch/md5/) ) und Verwendung (beispielsweise) :
md5 -djsmith: ERDDAP : *Ist dies der Fall?* 
        * Auf Linux/Unix können Sie mit dem integrierten md5sum-Programm MD5-Dauwerte generieren (beispielsweise) :
echo -n "jsmith: ERDDAP : *Ist dies der Fall?* " | md5sum
        * Gespeicherte Klartext-Passwörter sind case sensitive. Die gespeicherten Formen von MD5- und UEPMD5-Passwörtern sind nicht fallempfindlich.
        * Zum Beispiel (mit UEPMD5) , if username="jsmith" und passwort="myPasswort",&lt;Benutzer-Tag ist:
```
            <user username="jsmith"  
            password="57AB7ACCEB545E0BEB46C4C75CEC3C30"  
            roles="JASmith, JASmithGroup" />  
```
wo das gespeicherte Passwort generiert wurde
md5 -djsmith: ERDDAP : myPassword
        * Rollen ist eine komma-separierte Rollenliste, für die der Benutzer autorisiert ist. I&lt;Datensatz&gt; kann eine&lt;zugänglichzu&gt; (#accessibleto) tag, in dem die Rollen aufgelistet werden, die auf diesen Datensatz zugreifen dürfen. Für einen bestimmten Benutzer und einen bestimmten Datensatz, wenn eine der Rollen in der Rollenliste des Benutzers eine der Rollen in der Liste des Datensatzes über&lt;accessTo&gt; Rollen, dann ist der Benutzer berechtigt, auf diesen Datensatz zugreifen.
            
Jeder Benutzer, der sich einloggt, erhält automatisch die Rolle \\[ Wer ist hier? In \\] , ob es&lt;Benutzer-Tag für sie in datasets.xml oder nicht. Wenn ein bestimmter Datensatz
```
            <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
```
dann jeder Benutzer, der eingeloggt ist, wird berechtigt, auf diesen Datensatz zuzugreifen, auch wenn es nicht&lt;Benutzer-Tag für sie in datasets.xml .
            
    * Änderungen des Wertes dieses Tags werden das nächste Mal wirksam ERDDAP™ liest datasets.xml , einschließlich in Reaktion auf einen Datensatz [Flagge](/docs/server-admin/additional-information#flag) .
         
### &lt;pathRegex&gt;{#pathregex} 
* ( ** &lt;PfadRegex&gt; ** &#33; (#pathregex) geben Sie einen regelmäßigen Ausdruck an, der die Pfade begrenzt (die Unterverzeichnisse) wird im Datensatz enthalten sein. Der Standard ist .\\*, der alle Pfade übereinstimmt. Dies ist ein selten verwendet, selten benötigt, OPTIONAL-Tag für EDDGrid VonFiles-Datensätzen, EDDTableFromFiles-Datensätzen und einigen anderen Datensätzen. Aber wenn Sie es brauchen, brauchen Sie es wirklich.
    
Um diese Arbeit zu machen, müssen Sie wirklich gut mit regelmäßigen Ausdrücken sein. Siehe [regex dokumentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) und [Nach oben](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html) . Insbesondere müssen Sie über Fanggruppen wissen (etwas in Klammern) , und das "oder" Symbol " | ".
Gemeinsam lassen Sie diese eine beliebige Anzahl von Optionen angeben, z.B. (Option1 | Option2 | Option3) .
Auch jede der Optionen kann nichts sein, z.B., ( | Option2 | Option3) .
Sie müssen auch wissen, dass Fanggruppen geschachtelt werden können, d.h. jede Option in einer Fanggruppe kann eine andere Fanggruppe enthalten, z. ( | Option2 ( | Option2 B. | Option2c)  | Option3) die besagt, dass Option2 von nichts gefolgt werden kann, oder Option2b, oder Option2c.
Für pathRegexes wird jede Option ein Ordnername sein, gefolgt von einem /, z.B., bar/ .
    
Der knifflige Teil des PfadesRegex ist: Wann ERDDAP™ rekursiv absinkt der Verzeichnisbaum, der PfadRegex muss alle Pfade akzeptieren, die er auf seinem Weg zu den Verzeichnissen mit Daten trifft. Regex's mit geschachtelten Fanggruppen sind ein guter Weg, damit umzugehen.
    
Ein Beispiel:
Angenommen wir haben die folgende Verzeichnisstruktur:
    ```
    /foo/bar/D0001/a/\\*.nc  
    /foo/bar/D0001/b/\\*.nc  
    /foo/bar/D0002/a/\\*.nc  
    /foo/bar/D0002/b/\\*.nc  
    ...  
    /foo/bar/E0001/a/\\*.nc  
    ...  
    ```
und die angegebene DateiDirectory ist /foo/bar/, und wir wollen nur die .nc Dateien im D \\[ 0-9 \\] &#123;4&#125;/a/ Unterverzeichnisse
Die Lösung besteht darin, PfadRegex auf /foo/bar/ einzustellen ( | D \\[ 0-9 \\] &#123;4&#125; ( | a)) )   
Das sagt:
Der Pfad muss mit /foo/bar/ beginnen
Dem kann nichts oder D gefolgt werden \\[ 0-9 \\] &#123;4&#125;
Dies kann durch nichts oder a/
    
Ja, PfadRegex kann unglaublich schwierig zu formulieren sein. Wenn Sie hängen bleiben, fragen Sie einen Computer Programmierer (die nächste Sache in der realen Welt zu einem Zauberer, der Beschwörungen ausstöbert?) oder schicken Sie eine E-Mail an Chris. John bei noaa.gov.
    
### &lt;Datensatz &gt;{#dataset} 
* ( ** &lt;Datensatz&gt; ** &#33; (#dataset) ist ein OPTIONAL (aber immer verwendet) tag innerhalb eines&lt;erdddapDatasets&gt; in den Warenkorb datasets.xml dass (wenn Sie alle Informationen zwischen&lt;Datensatz&gt; und&lt;/dataset&gt;) beschreibt einen Datensatz vollständig. Zum Beispiel
    ```
    <dataset type="EDDGridFromDap" datasetID="erdPHssta8day" active="true"> ... </dataset>  
    ```
Gibt es eine beliebige Anzahl von Datensätzen in Ihrem datasets.xml Datei.
Drei Attribute MAY erscheinen in einem&lt;Datensatz&gt; tag:
     
    *    **Typ=" *eine Typ* "** ist ein REQUIRED-Attribut innerhalb eines&lt;Datensatz&gt; tag in datasets.xml die den Datensatztyp identifiziert (zum Beispiel, ob es sich um ein EDDGrid /gridded oder EDDTable/tabular dataset) und die Quelle der Daten (z.B. eine Datenbank, Dateien oder eine Fernbedienung OPeNDAP Server) . Siehe [ **Liste der Datensätze** ](#list-of-types-datasets) .
         
#### Datensatz I{#datasetid} 
*    [ ** datasetID = *ADatasetID* "** ](#datasetid) ist ein REQUIRED-Attribut innerhalb eines&lt;dataset&gt; tag, der einen kurzen (normalerweise) zuordnet&lt;15 Zeichen), einzigartig, Identifikationsname zu einem Datensatz.
    * Die datasetID s MUST ein Brief (A-Z, a-z) gefolgt von einer beliebigen Anzahl von A-Z, a-z, 0-9 und \\_ (aber am besten, wenn&lt;32 Zeichen insgesamt).
    * Datensatz IDs sind Case sensitive, aber DON'T erstellen zwei datasetID die sich nur in Großbuchstaben unterscheiden. Es wird Probleme auf Windows-Computern verursachen (Ihrem und/oder dem Computer eines Benutzers) .
    * Best Practices: Wir empfehlen [Kamel Rechtssache](https://en.wikipedia.org/wiki/CamelCase) .
    * Best Practices: Wir empfehlen, dass der erste Teil ein Akronym oder Abkürzung des Namens des Quellinstituts ist und der zweite Teil ein Akronym oder Abkürzung des Namens des Datensatzes ist. Wenn möglich erstellen wir einen Namen, der den Namen der Quelle für den Datensatz widerspiegelt. Zum Beispiel verwendeten wir datasetID = "erdPH sst a8day" für einen Datensatz von NOAA   NMFS   SWFSC Abteilung Umweltforschung ( ERD ) die mit der zu Satelliten/PH/ gehörenden Quelle bezeichnet wird sst a/8day.
    * Wenn Sie den Namen eines Datensatzes ändern, der alte Datensatz (mit dem alten Namen) wird noch leben in ERDDAP . Dies ist ein "orphan" Datensatz, weil die Spezifikation für ihn in datasets.xml ist jetzt weg. Dies muss behandelt werden:
        1. Für ERDDAP™ v2.19 und später musst du nichts tun. ERDDAP™ diese Waisendatensätze automatisch entfernen.
        2. Für ERDDAP™ v2.18 und früher, Sie müssen etwas tun, um die Waisendatensätze zu entfernen: Machen Sie einen aktiven="false" Datensatz, z.B.
```
                <dataset type="EDDTableFromNcFiles" datasetID="*theOldName*" active="false" />  
```
Nach der nächsten Hauptlast Datensätze, Sie können diesen Tag nach dem alten Datensatz inaktiv entfernen.
                 
#### Wirkstoff{#active} 
*    [ **Aktiv=" *Borolen* "** ](#active) ist ein OPTIONAL Attribut innerhalb einer&lt;Datensatz&gt; tag in datasets.xml die angibt, ob ein Datensatz aktiv ist (für die Verwendung in ERDDAP ) oder nicht.
    * Gültige Werte sind wahr (Der Standard) und falsch.
    * Da der Standard zutreffend ist, müssen Sie dieses Attribut nicht verwenden, bis Sie diesen Datensatz vorübergehend oder dauerhaft entfernen möchten. ERDDAP .
    * Wenn Sie nur einen aktiven="true"-Datensatz entfernen datasets.xml , der Datensatz wird noch aktiv sein ERDDAP™ aber wird nie aktualisiert werden. Ein solcher Datensatz wird ein "Orphan" sein und wird als solcher auf dem Status aufgeführt. html Webseite direkt unter der Liste der Datensätze, die nicht geladen wurden.
    * Wenn Sie active="false" setzen, ERDDAP™ wird den Datensatz beim nächsten Update des Datensatzes deaktivieren. Wenn du das tust, ERDDAP™ wirft keine Informationen heraus, die sie über den Datensatz gespeichert haben kann und macht sicherlich nichts mit den tatsächlichen Daten.
    * Um einen Datensatz von ERDDAP™ , siehe [Entfernen von Datensatz](/docs/server-admin/additional-information#removing-datasets) .
         

 ** Mehrere Tags können zwischen den&lt;Datensatz&gt; und&lt;/dataset&gt; Tags. **   
Es gibt einige Variationen, in denen Tags erlaubt werden, durch welche Arten von Datensätzen. Siehe die Dokumentation zu einem bestimmten [Art des Datensatzes](#list-of-types-datasets) für Details.

#### &lt;zugänglich Zu &gt;{#accessibleto} 
* ( ** &lt;zugänglich &gt; ** &#33; (#accessibleto) ist ein OPTIONAL-Tag innerhalb eines&lt;dataset&gt; tag, der eine komma getrennte Liste angibt [Rollen](#user) die Zugriff auf diesen Datensatz haben dürfen. Zum Beispiel
    ```
    <accessibleTo>RASmith, NEJones</accessibleTo>  
    ```
    * Das ist Teil von ERDDAP ' [Sicherheitssystem](/docs/server-admin/additional-information#security) zur Einschränkung des Zugriffs auf einige Datensätze auf einige Benutzer.
    * Wenn dieser Tag nicht vorhanden ist, alle Benutzer (auch wenn sie nicht eingeloggt sind) hat Zugriff auf diesen Datensatz.
    * Wenn dieser Tag vorhanden ist, wird dieser Datensatz nur für angemeldete Benutzer sichtbar und zugänglich sein, die eine der angegebenen Rollen haben. Dieser Datensatz wird für nicht eingeloggte Benutzer nicht sichtbar sein.
    * Jeder Benutzer, der sich einloggt, erhält automatisch die Rolle \\[ Wer ist hier? In \\] , ob es&lt;Benutzer-Tag für sie in datasets.xml oder nicht. Wenn ein bestimmter Datensatz
    ```
        <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
    ```
dann jeder Benutzer, der eingeloggt ist, wird berechtigt, auf diesen Datensatz zuzugreifen, auch wenn es nicht&lt;Benutzer-Tag für sie in datasets.xml .
         
#### &lt;GrafikenZugang zu +{#graphsaccessibleto} 
* ( ** &lt;GrafikenZugang zu&gt; ** &#33; (#graphsaccessibleto) ist ein OPTIONAL-Tag innerhalb eines&lt;Datensatz&gt; tag in datasets.xml die feststellt, ob Grafiken und Metadaten für den Datensatz öffentlich zugänglich sind. Es bietet eine Möglichkeit, den Datensatz teilweise zu überschreiben [&lt;zugänglichzu&gt; (#accessibleto) Einstellung. Die zulässigen Werte sind:
    * auto -- Dieser Wert (oder das Fehlen eines&lt;graphsAccessibleTo&gt; tag für den Datensatz) Zugriff auf Graphen und Metadaten aus dem Datensatz mimiert den Datensatz&lt;zugänglichTo&gt; Einstellung.
Wenn also der Datensatz privat ist, werden seine Grafiken und Metadaten privat sein.
Und wenn der Datensatz öffentlich ist, werden seine Grafiken und Metadaten öffentlich sein.
    * Öffentlichkeit -- Diese Einstellung macht die Graphiken und Metadaten des Datensatzes für jeden zugänglich, selbst Benutzer, die nicht eingeloggt sind, auch wenn der Datensatz ansonsten privat ist, weil er einen&lt;zugänglichTo&gt; tag.
         
#### &lt;zugänglich ViaFiles &gt;{#accessibleviafiles} 
* ( ** &lt;zugänglichViaFiles&gt; ** &#33; (#accessibleviafiles) ist ein OPTIONAL-Tag innerhalb eines&lt;Datensatz&gt; tag in datasets.xml für [ EDDGrid GesamtexistierteDimension](#eddgridaggregateexistingdimension) , [ EDDGrid Kopie](#eddgridcopy) , [ EDDGrid VonEDDTable](#eddgridfromeddtable) , [ EDDGrid Von Erddap](#eddfromerddap) , [ EDDGrid Von Etopo](#eddgridfrometopo) , [ EDDGrid VonFiles](#eddgridfromfiles)   (einschließlich aller Unterklassen) , [ EDDGrid SideByside](#eddgridsidebyside) , [EDDTableCopy](#eddtablecopy)   [EDDTableFromErddap](#eddfromerddap) , [EDDTableFrom EDDGrid ](#eddtablefromeddgrid) , und [EDDTableFromFiles](#eddtablefromfiles)   (einschließlich aller Unterklassen) Datensätze. Es kann einen Wert von wahr oder falsch haben. Zum Beispiel
    ```
    <accessibleViaFiles>true</accessibleViaFiles>  
    ```
Ist der Wert wahr, ERDDAP™ wird es so machen, dass Benutzer die Quelldatendateien des Datensatzes durchsuchen und herunterladen können ERDDAP ' [ "files" System](https://coastwatch.pfeg.noaa.gov/erddap/files/) . Siehe "files" System [Dokumentation](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) für weitere Informationen.
    
Der Standardwert&lt;zugänglichViaFiles&gt; kommt aus&lt;defaultAccessibleViaFiles&gt; in [Setup.xml](/docs/server-admin/deploy-install#setupxml) . Es hat einen Standardwert von false, aber wir empfehlen, dass Sie dieses Tag zu Ihrem setup.xml mit einem Wert von true hinzufügen.
    
Empfehlung -- Wir empfehlen, alle relevanten Datensätze über das Dateisystem zugänglich zu machen, indem wir&lt;defaultAccessibleViaFiles&gt; to true in setup.xml weil es eine Gruppe von Benutzern gibt, für die dies der bevorzugte Weg ist, um die Daten zu erhalten. Unter anderem "files" system macht es für Benutzer leicht, zu sehen, welche Dateien zur Verfügung stehen und wann sie zuletzt geändert werden, so dass es für einen Benutzer leicht ist, seine eigene Kopie des gesamten Datensatzes zu erhalten. Wenn Sie im Allgemeinen keine Datensätze über das Dateisystem zugänglich machen möchten, setzen&lt;defaultAccessibleViaFiles&gt; auf false. In jedem Fall nur verwenden&lt;zugänglichViaFiles&gt; für die wenigen Datensätze, die Ausnahmen von der von&lt;defaultAccessibleViaFiles&gt; (zum Beispiel, wenn der Datensatz verwendet [ .nc ml](#ncml-files) Dateien, die nicht wirklich nützlich für Benutzer sind) .
     
#### &lt;zugänglich Via WMS &gt;{#accessibleviawms} 
* ( ** &lt;zugänglich Via WMS &gt; ** &#33; (#accessibleviawms) ist ein OPTIONAL-Tag innerhalb eines&lt;Datensatz&gt; tag in datasets.xml für alle [ EDDGrid ](#eddgrid) Unterklassen. Es kann einen Wert von wahr haben (Der Standard) oder falsch. Zum Beispiel
    ```
    <accessibleViaWMS>true</accessibleViaWMS>  
    ```
Ist der Wert falsch, ERDDAP ' WMS Server wird nicht für diesen Datensatz verfügbar sein. Dies wird häufig für Datensätze verwendet, die einige Längenwerte größer als 180 haben (die technisch ungültig für WMS Dienstleistungen) , und für die Sie auch eine Variante des Datensatzes mit Längenwerten ganz im Bereich -180 bis 180 anbieten [ EDDGrid LonPM180](#eddgridlonpm180) .
Ist der Wert wahr, ERDDAP™ versucht, den Datensatz über ERDDAP ' WMS Server. Aber wenn der Datensatz völlig ungeeignet ist für WMS   (z.B. gibt es keine Längen- oder Breitendaten) , dann wird der Datensatz nicht über ERDDAP ' WMS Server, unabhängig von dieser Einstellung.
     
#### &lt;Hinzufügen Variablen Wo &gt;{#addvariableswhere} 
* (&lt;addVariablesWhere&gt;] (#addvariableswhere) ist ein OPTIONAL-Tag innerhalb der&lt;dataset&gt; tag für alle EDDTable-Datensätze.
    
Anfragen an einen EDDTable-Datensatz können &add Variablen Ort (" *Eigenschaften Name* "," *Eigenschaften Wert* ") , was sagt ERDDAP™ alle Variablen im Datensatz hinzuzufügen, wo *AttributName=attributeValue* in die Liste der angeforderten Variablen. Zum Beispiel, wenn ein Benutzer hinzufügen &add Variablen Ort (" ioos\\_category ","Wind") zu einer Abfrage, ERDDAP alle Variablen im Datensatz hinzufügen, die einen ioos\\_category =Wind-Attribut auf die Liste der gewünschten Variablen (zum Beispiel windSpeed, windDirection, windGustSpeed) . *Eigenschaften Name* und *Eigenschaften Wert* sind case-sensitive.
    
In datasets.xml , wenn der chunk von dataset.xml für einen Datensatz
    ```
    <addVariablesWhere>*attributeNamesCSV*<addVariablesWhere>  
    ```
zum Beispiel,
    ```
    <addVariablesWhere>ioos\\_category,units<addVariablesWhere>  
    ```
das Datenzugriffsformular (.html Webseite) für den Datensatz ein Widget enthalten (für jedes AttributName in der Komma-getrennten Liste) rechts unterhalb der Variablenliste, mit der Benutzer einen Attributwert angeben können. Wenn der Benutzer einen Attributwert für einen oder mehrere der Attributnamen auswählt, werden diese über &add der Anfrage hinzugefügt Variablen Ort (" *Eigenschaften Name* "," *Eigenschaften Wert* ") . So, dieses tag in datasets.xml lässt Sie die Liste der Attributnamen angeben, die auf dem Data Access-Formular für diesen Datensatz angezeigt werden und macht es Benutzern leicht, &addVariables hinzuzufügen Funktioniert auf die Anfrage. Die *AttributNamesCSV* Die Liste ist fallempfindlich.
    
#### &lt;HöhenmesserPerSourceUnit&gt;{#altitudemeterspersourceunit} 
* ( ** &lt;HöhenmeterPerSourceUnit&gt; ** &#33; (#altitudemeterspersourceunit) ist ein OPTIONAL-Tag innerhalb der&lt;dataset&gt; tag in datasets. xxml für EDDTableFrom SOS Datensätze (Nur&#33;) die eine Zahl angibt, die mit den Quell- oder Tiefenwerten multipliziert wird, um sie in Höhenwerte umzuwandeln (in Metern über dem Meeresspiegel) . Zum Beispiel
    ```
    <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>  
    ```
Dieser Tag MUST wird verwendet, wenn die vertikalen Achswerte des Datensatzes nicht Meter, positiv=up sind. Ansonsten ist es OPTIONAL, da der Standardwert 1 ist. Zum Beispiel
    * Wird die Quelle bereits in Metern über dem Meeresspiegel gemessen, verwenden Sie 1 (oder verwenden Sie diesen Tag nicht, da 1 der Standardwert ist) .
    * Wenn die Quelle in Metern unterhalb des Meeresspiegels gemessen wird, verwenden Sie -1.
    ```
        <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>
    ```
    * Wird die Quelle in km über dem Meeresspiegel gemessen, verwenden Sie 0,001.
         
#### &lt;defaultDataQuery&gt;{#defaultdataquery} 
* ( ** &lt;defaultDataQuery&gt; ** &#33; (#defaultdataquery) ist ein OPTIONAL-Tag innerhalb eines&lt;Datensatz&gt; tag in datasets.xml das sagt ERDDAP™ die angegebene Abfrage verwenden (der Teil der URL nach dem "?") wenn die .html-Datei Typ (das Datenzugriffsformular) wird ohne Anfrage angefordert.
    * Das brauchen Sie wahrscheinlich selten.
    * Sie müssen XML-encode (nicht prozentualer Code) die Standardabfragen, da sie in einem XML-Dokument sind. Zum Beispiel wird &amp; ,&lt;wird&lt;, &gt; wird &gt; .
    * Bitte überprüfen Sie Ihre Arbeit. Es ist einfach, einen Fehler zu machen und nicht zu bekommen, was Sie wollen. ERDDAP™ wird versuchen, Ihre Fehler zu reinigen -- aber nicht darauf verlassen, da\\*wie\\*es wird aufgeräumt kann sich ändern.
    * Bei Gridap-Datensätzen ist es üblich, einen anderen Standardtiefe- oder Höhendimensionswert anzugeben. (zum Beispiel, \\[ 0) \\] anstatt \\[ Letzter Beitrag \\] ) .
In jedem Fall sollten Sie immer alle Variablen auflisten, immer dieselben Dimensionswerte für alle Variablen verwenden, und fast immer verwenden \\[ 0) \\] , \\[ Letzter Beitrag \\] , oder \\[ 0:last \\] für die Dimensionswerte.
Zum Beispiel:
    ```
        <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
    ```
    * Für tabledap datasets, wenn Sie keine Einschränkung angeben, wird die Anfrage den gesamten Datensatz zurückgeben, der je nach Datensatz unpraktisch groß sein kann. Wenn Sie keine Einschränkungen festlegen möchten, anstatt leer zu sein&lt;defaultDataQuery&gt; (die die gleiche ist, wie keine Angabe eines Standards Datenblatt) , Sie müssen explizit alle Variablen, die Sie in der defaultDataQuery enthalten möchten, auflisten.
    * Für tabledap datasets, die häufigste Verwendung dieser ist, einen anderen Standardzeitbereich anzugeben (relativ zu max (Zeit) , z.B. &time&gt;=max (Zeit) -1day, oder relativ zu jetzt, z.B. &time&gt;= now- 1 Tag) .
Denken Sie daran, dass die Anforderung keine Datenvariablen ist die gleiche wie die Angabe aller Datenvariablen, so dass in der Regel können Sie einfach die neue Zeitkonstrat angeben.
Zum Beispiel:
    ```
        <defaultDataQuery>&amp;time&gt;=max(time)-1day</defaultDataQuery>  
    ```
oder
    ```
        <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>  
    ```
#### &lt;StandardGraphQuery&gt;{#defaultgraphquery} 
* ( ** &lt;StandardGraphQuery&gt; ** &#33; (#defaultgraphquery) ist ein OPTIONAL-Tag innerhalb eines&lt;Datensatz&gt; tag in datasets.xml das sagt ERDDAP™ die angegebene Abfrage verwenden (der Teil der URL nach dem "?") wenn die .graph-Datei Typ (Das Bild machen) wird ohne Anfrage angefordert.
    * Das brauchen Sie wahrscheinlich selten.
    * Sie müssen XML-encode (nicht prozentualer Code) die Standardabfragen, da sie in einem XML-Dokument sind. Zum Beispiel wird &amp; ,&lt;wird&lt;, &gt; wird &gt; .
    * Bitte überprüfen Sie Ihre Arbeit. Es ist einfach, einen Fehler zu machen und nicht zu bekommen, was Sie wollen. ERDDAP™ wird versuchen, Ihre Fehler zu reinigen -- aber nicht darauf verlassen, da\\*wie\\*es wird aufgeräumt kann sich ändern.
    * Bei Gridap-Datensätzen ist die häufigste Verwendung dieser Daten eine andere Standardtiefe oder Höhendimensionswert anzugeben. (zum Beispiel, \\[ 0) \\] anstatt \\[ Letzter Beitrag \\] ) und/oder anzugeben, dass eine bestimmte Variable grafisch dargestellt wird.
In jedem Fall werden Sie fast immer verwenden \\[ 0) \\] , \\[ Letzter Beitrag \\] , oder \\[ 0:last \\] für die Dimensionswerte.
Zum Beispiel:
    ```
        <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>  
    ```
         (aber alles auf eine Linie setzen) 
    * Für tabledap datasets, wenn Sie keine Einschränkung angeben, wird die Anfrage den gesamten Datensatz, der je nach Datensatz eine lange Zeit dauern kann, graphieren.
    * Für tabledap datasets, die häufigste Verwendung dieser ist, einen anderen Standardzeitbereich anzugeben (relativ zu max (Zeit) , z.B. &time&gt;=max (Zeit) -1day, oder relativ zu jetzt, z.B. &time&gt;= now- 1 Tag) .
Denken Sie daran, dass die Anforderung keine Datenvariablen ist die gleiche wie die Angabe aller Datenvariablen, so dass in der Regel können Sie einfach die neue Zeitkonstrat angeben.
Zum Beispiel:
    ```
        <defaultGraphQuery>&amp;time&gt;=max(time)-1day</defaultGraphQuery>  
    ```
oder
    ```
        <defaultGraphQuery>&amp;time&gt;=now-1day</defaultGraphQuery>  
    ```
#### &lt;DimensionValuesInMemory&gt;{#dimensionvaluesinmemory} 
* ( ** &lt;Dimension WerteInMemory&gt; ** &#33; (#dimensionvaluesinmemory)   (wahr (Der Standard) oder falsch) ist ein OPTIONAL und selten verwendete tag innerhalb der&lt;dataset&gt; tag für alle EDDGrid Datensatz, der sagt ERDDAP™ wobei die Quellwerte der Abmessungen beibehalten werden sollen (auch bekannt als axisVariable S) :
    
    * true = im Speicher (die schneller ist, aber mehr Speicher verwendet) 
    * false = auf der Festplatte (die langsamer ist, aber keinen Speicher verwendet) 
    
Zum Beispiel
    ```
    <dimensionValuesInMemory>false</dimensionValuesInMemory>  
    ```
Sie sollten dies nur mit dem nicht-Standard-Wert von false verwenden, wenn Sie ERDDAP™ hat viele Datensätze mit sehr großen Abmessungen (z.B. Millionen von Werten, z.B. in EDDGrid VonAudioFiles Datensätze) und ERDDAP 's In Use Speichernutzung ist immer zu hoch. Sehen Sie den Speicher: derzeit mit Zeile an \\[ IhreDomain \\]  /erddap/status.html zu überwachen ERDDAP™ Speichernutzung.
     
#### &lt;DateiTableInMemory&gt;{#filetableinmemory} 
* ( ** &lt;DateiTableInMemory&gt; ** &#33; (#filetableinmemory)   (wahr oder falsch (Der Standard) ) ist ein OPTIONAL-Tag innerhalb der&lt;dataset&gt; tag für alle EDDGrid VonFiles und EDDTable AusFiles-Datensatz, der sagt ERDDAP™ wo die Datei bleibtTabelle (die Informationen über jede Quelldatendatei hat) :
    
    * true = im Speicher (die schneller ist, aber mehr Speicher verwendet) 
    * false = auf der Festplatte (die langsamer ist, aber keinen Speicher verwendet) 
    
Zum Beispiel
    ```
    <fileTableInMemory>true</fileTableInMemory>  
    ```
Wenn Sie dies für einen beliebigen Datensatz festlegen, beachten Sie bitte den Speicher: \\[ IhreDomain \\]  /erddap/status.html um sicherzustellen, dass ERDDAP™ hat noch viel freies Gedächtnis.
     
#### &lt;fgdcFile&gt;{#fgdcfile} 
* ( ** &lt;FgdcFile&gt; ** &#33; (#fgdcfile) ist ein OPTIONAL-Tag innerhalb eines&lt;Datensatz&gt; tag in datasets.xml das sagt ERDDAP™ eine vorgefertigte FGDC-Datei verwenden, anstatt ERDDAP™ versuchen, die Datei zu erzeugen. Verwendung:
```
    <fgdcFile>*fullFileName*</fgdcFile>  
```
     *voll Dateiname* kann sich auf eine lokale Datei beziehen (irgendwo auf dem Dateisystem des Servers) oder die URL einer Remote-Datei.
wenn *voll Dateiname* \\="" oder die Datei wird nicht gefunden, der Datensatz hat keine FGDC-Metadaten. Dies ist also auch dann sinnvoll, wenn Sie die FGDC-Metadaten für einen bestimmten Datensatz unterdrücken möchten.
Oder, Sie können setzen&lt;fgdcActive&gt;false&lt;/fgdcActive&gt; in setup.xml zu sagen ERDDAP™ keine FGDC-Metadaten für jeden Datensatz anbieten.
     
#### &lt;Iso19115 Datei &gt;{#iso19115file} 
* ( ** &lt;Iso19115File&gt; ** &#33; (#iso19115file) ist ein OPTIONAL-Tag innerhalb eines&lt;Datensatz&gt; tag in datasets.xml das sagt ERDDAP™ eine vorgefertigte ISO 19115-Datei anstelle von ERDDAP™ versuchen, die Datei zu erzeugen. Verwendung:
    ```
    <iso19115File>*fullFileName*</iso19115File>  
    ```
     *voll Dateiname* kann sich auf eine lokale Datei beziehen (irgendwo auf dem Dateisystem des Servers) oder die URL einer Remote-Datei.
wenn *voll Dateiname* \\="" oder die Datei wird nicht gefunden, der Datensatz hat keine ISO 19115 Metadaten. Dies ist also auch dann sinnvoll, wenn Sie die ISO 19115-Metadaten für einen bestimmten Datensatz unterdrücken möchten.
Oder, Sie können setzen&lt;Iso19115Wirkstoff&gt;false&lt;/iso19115Aktiv&gt; in setup.xml zu sagen ERDDAP™ keine ISO 19115 Metadaten für jeden Datensatz anbieten.
     
#### &lt;MatchAxis NDigits&gt;{#matchaxisndigits} 
* ( ** &lt;MatchAxisNDigits&gt; ** &#33; (#matchaxisndigits) ist ein OPTIONAL-Tag innerhalb eines EDDGrid  &lt;Datensatz&gt; Tag für EDDGrid Datensätze, die Aggregationen sind, z.B. Aggregationen von Dateien. Jedes Mal, wenn der Datensatz neu geladen wird, ERDDAP™ prüft, ob die Achsenwerte jeder Komponente der Aggregation gleich sind. Die Genauigkeit der Prüfung wird durch die [MatchAxisNDigits](#matchaxisndigits) , die die Gesamtzahl der Ziffern angibt, die bei der Prüfung von doppelten Genauigkeits-Achsenwerten, 0 - 18 übereinstimmen müssen (Der Standard) . Beim Testen von Float-Achsenwerten wird der Test mit MatchAxisNDigits/2-stelligen durchgeführt. Ein Wert von 18 oder mehr sagt EDDGrid einen genauen Test durchzuführen. Ein Wert von 0 sagt EDDGrid keine Prüfung durchzuführen, die nicht empfohlen wird, außer wie unten beschrieben.
    
Obwohl EDDGrid die Komponenten der Aggregation leicht unterschiedliche Achswerte aufweisen können, ist dem Benutzer nur ein Satz von Achswerten dargestellt. Der Satz ist von der gleichen Komponente, die die Quell-Metadaten des Datensatzes liefert. Zum Beispiel, EDDGrid FromFiles-Datensätze, die von den&lt;metadataFrom&gt; Einstellung (Standardeinstellungen) .
    
Die Verwendung von matchAxisNDigits\\=0 wird in den meisten Fällen stark entmutigt, weil sie alle Überprüfungen ausschaltet. Auch eine minimale Überprüfung ist nützlich, da sie dafür sorgt, dass die Komponenten zur Aggregation geeignet sind. Wir gehen davon aus, dass alle Komponenten geeignet sind, aber das ist nicht immer so. Dies ist also ein wichtiger Sanitätstest. Selbst Werte der MatchAxisNDigits1, 2, 3 oder 4 werden entmutigt, da die unterschiedlichen Achswerte oft angeben, dass die Bauteile erzeugt wurden (binden?) eine andere Weise und sind somit nicht zur Aggregation geeignet.
    
Es gibt einen Fall, wo die Verwendung von matchAxisNDigits\\=0 nützlich und empfohlen ist: mit Aggregationen von Remote-Dateien, z.B. Daten in S3-Buckets. In diesem Fall, wenn der Datensatz cacheFromUrl, cacheSizeGB, matchAxisNDigits\\=0 verwendet, und die EDDGrid FromFiles System für [Aggregat über Dateinamen](#aggregation-via-file-names-or-global-metadata) , dann EDDGrid muss nicht alle Remote-Dateien lesen, um die Aggregation zu tun. Dies ermöglicht Datensätze aus Daten in S3 Buckets sehr schnell laden (im Gegensatz zu absurd langsam, wenn EDDGrid muss alle Dateien herunterladen und lesen) .
    
#### &lt;nThreads&gt;{#nthreads} 
* Beginnen mit ERDDAP™ Version 2.00, wenn jede Unterklasse von EDDTableFromFiles oder EDDGrid liest Daten aus seiner Quelle, es kann ein Stück Daten lesen (z.B. eine Quelldatei) zu einem Zeitpunkt (in einem Gewinde)   (Das ist der Standard) oder mehr als ein Stück Daten (z.B., 2+ Quelldateien) zu einem Zeitpunkt (in 2 oder mehr Fäden) bei der Bearbeitung jeder Anfrage.
     
    * Artikel von Thumb:
Für die meisten Datensätze auf den meisten Systemen verwenden Sie nThreads=1, den Standard. Wenn Sie einen leistungsfähigen Computer haben (viele CPU-Kerne, viel Speicher) , dann nThreads auf 2, 3, 4 oder höher (aber nie mehr als die Anzahl der CPU-Kerne im Computer) für Datensätze, die profitieren könnten:
        
        * Die meisten EDDTableFromFiles-Datensätze werden profitieren.
        * Datensätze, bei denen etwas eine Verzögerung vor einem Bruch von Daten verursacht, werden zum Beispiel profitieren:
            * Datensätze mit [außenkomprimiert (z.B., .gz ) ](#externally-compressed-files) bindend (z.B., .nc ) Dateien, weil ERDDAP™ muss die ganze Datei dekomprimieren, bevor sie die Datei lesen kann.
            * Datensätze, die [CacheSizeGB](#cachefromurl) , weil ERDDAP™ muss oft die Datei herunterladen, bevor sie es lesen kann.
            * Datensätze mit Datendateien, die auf einem hochbandbreiten parallelen Dateisystem gespeichert werden, weil es schnellere Daten liefern kann, wenn gewünscht. Beispiele für parallele Dateisysteme sind [JBOD](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures) , [PNFS](http://www.pnfs.com/) , [GlusterFS](https://en.wikipedia.org/wiki/Gluster) , Amazon S3, und Google Cloud Storage.
                 
        
Warnung: Bei Verwendung von nThreads&gt;1, achten Sie auf ERDDAP ' s Speichernutzung, Gewindenutzung und Gesamtreaktion (siehe [ ERDDAP Statusseite](/docs/server-admin/additional-information#status-page) ) . Hier finden Sie Kommentare zu diesen Themen.
         
    * Für einen bestimmten Datensatz kann diese nThreads-Einstellung von verschiedenen Orten kommen:
        
        * Wenn datasets.xml chunk für einen Datensatz&lt;nThreads&gt; tag (innerhalb der&lt;dataset&gt; tag, nicht als globales Attribut) mit einem Wert &gt;= 1 wird dieser Wert von nThreads verwendet. So können Sie für jeden Datensatz eine andere Anzahl angeben.
        * Ansonsten, wenn datasets.xml eine&lt;nTableThreads&gt; tag (für EDDTable VonFiles Datensätze) oder&lt;nGridThreads&gt; tag (für EDDGrid Datensätze) mit einem Wert &gt;= 1, außerhalb eines&lt;dataset&gt; tag, dieser Wert von nThreads wird verwendet.
        * Ansonsten wird 1 Thread verwendet, was eine sichere Wahl ist, da es die kleinste Menge an Speicher verwendet.
             
        
Für [Original ERDDAP™ Installation](https://coastwatch.pfeg.noaa.gov/erddap/index.html) , wir verwenden
        &lt;nTableThreads&gt; 6&lt;/nTableThreads&gt; (Es ist ein mächtiger Server.) Difficult-Anfragen nehmen jetzt 30 % der vorherigen Zeit.
         
##### Überwachen der Ressourcennutzung{#monitor-resource-usage} 
Wenn Sie mit verschiedenen nThreads-Einstellungen experimentieren (und vielleicht schwierige Probenanträge zu Ihrem ERDDAP ) , Sie können die Ressourcennutzung Ihres Computers überwachen:
* Auf Macs, verwenden Finder : Anwendungen : Utilities : Activity Monitor
* Auf Linux verwenden Sie top
* Unter Windows 10 verwenden *Strg + Shift + Esc* Task-Manager öffnen
             
##### Warnung: Verminderte Verantwortung{#warning-decreased-responsiveness} 
isoliert, ERDDAP™ wird eine Anforderung an einen Datensatz mit einer höheren nThreads-Einstellung schneller erfüllen als wenn nThreads=1 ist. Aber während diese Anfrage bearbeitet wird, werden andere Anfragen von anderen Benutzern etwas überfüllt und eine langsamere Antwort erhalten. Auch, wenn ERDDAP™ reagiert auf eine bestimmte Anfrage, andere Rechenressourcen (z.B. Laufwerkszugriff, Netzwerkbandbreite) kann begrenzen, insbesondere bei höheren nThreads-Einstellungen. So mit höheren nThreads-Einstellungen wird die Gesamtsystem-Responsivität schlechter sein, wenn mehrere Anfragen bearbeitet werden -- dies kann sehr ärgerlich für Benutzer sein&#33; Dadurch: nie nThreads auf mehr als die Anzahl der CPU-Kerne im Computer gesetzt. nThreads=1 ist die fairste Einstellung seit jeder Anfrage (unter mehreren gleichzeitigen Anfragen) wird einen gleichen Anteil an Rechenressourcen erhalten. Aber je mächtiger der Computer, desto weniger wird dies ein Problem sein.
         
##### Warnung: Höherer Speicher Verwendung EDDGrid Datensätze{#warning-higher-memory-use-for-eddgrid-datasets} 
Speichernutzung während der Bearbeitung Anfragen ist direkt proportional zur nThreads-Einstellung. Eine vernünftig sichere Faustregel ist: Sie müssen festlegen [ ERDDAP Speichereinstellungen](/docs/server-admin/deploy-install#memory) mindestens 2GB + (2GB \\* nThreads) . Einige Anfragen an einige Datensätze benötigen mehr Speicher als das. Zum Beispiel nThreads=3 für jede EDDGrid dataset bedeutet, dass die -Xmx-Einstellung mindestens -Xmx8000M betragen sollte. Wenn diese Speichereinstellung größer ist als 3/4 der physische Speicher des Computers, verringern Sie die nThreads-Einstellung, so dass Sie die Speichereinstellung abnehmen können.

Die Speichernutzung von Threads-Verarbeitungsanfragen an EDDTable-Datensätze ist fast immer niedriger, da die Dateien in der Regel viel kleiner sind. Wenn jedoch ein bestimmter EDDTable-Datensatz enorm ist (z.B., &gt;=1 GB) Datendateien, dann gelten die obigen Kommentare auch für diese Datensätze.

Was auch immer die nThreads Einstellung, halten Sie ein Auge auf die Speichernutzung Statistiken auf Ihrer [ ERDDAP Statusseite](/docs/server-admin/additional-information#status-page) . Sie sollten nie in der Nähe kommen, um die Speichernutzung in ERDDAP ; andernfalls werden schwerwiegende Fehler und Fehler auftreten.
        
##### Temporär eingestellt auf 1{#temporarily-set-to-1} 
Ist die aktuelle Speichernutzung sogar leicht hoch, ERDDAP™ wird nThreads für diese Anfrage auf 1 setzen. So ERDDAP™ speichert Speicher, wenn Speicher knapp ist.
         
##### Diminishing Returns{#diminishing-returns} 
Es gibt abnehmende Rückkehr zur Erhöhung der nThreads-Einstellung: 2 Fäden werden viel besser als 1 sein (wenn wir dynamische Übertaktung ignorieren) . Aber 3 wird nur ein Stück besser als 2 sein. Und 4 werden nur geringfügig besser sein als 3.

Bei einem Test einer schwierigen Abfrage auf einen großen EDDTable-Datensatz betrug die Ansprechzeit mit 1, 2, 3, 4, 5, 6 Fäden 38, 36, 20, 18, 13, 11 Sekunden. (Auf diesem Server verwenden wir nun nTableThreads=6.) 

nThreads=2: Obwohl es oft einen erheblichen Vorteil gibt, nThreads=2 anstelle von nThreads=1 anzugeben, wird es oft nicht viel Unterschied in der Taktzeit machen, die benötigt wird, um auf die Anfrage eines bestimmten Benutzers zu reagieren. Der Grund ist: mit nThreads=1 werden die meisten modernen CPU's oft [dynamisch übertakten](https://en.wikipedia.org/wiki/Intel_Turbo_Boost)   (Turbo-Boost) um die Taktgeschwindigkeit der CPU vorübergehend zu erhöhen. Mit nThreads=1 arbeitet der eine Kern oft mit einer höheren Taktgeschwindigkeit als jeder der beiden Kerne, wenn Sie nThreads=2 verwendet haben. Unabhängig davon halten wir es immer noch besser, nThreads=2 anstatt nThreads=1 zu verwenden, da diese Einstellung bessere Ergebnisse in einer größeren Vielfalt von Situationen liefern wird. Und natürlich, wenn Ihr Computer über ausreichende CPU-Kerne verfügt, sollte eine noch höhere nThreads-Einstellung bessere Ergebnisse liefern.

Wie oben erläutert, können sehr hohe nThreads-Einstellungen zu schnelleren Antworten auf einige Anfragen führen, aber das Risiko von insgesamt verringert ERDDAP™ Reaktionsfähigkeit und hoher Speichereinsatz (wie oben erwähnt) Während diese Anträge bearbeitet werden, ist es in der Regel keine gute Idee.
        
##### CPU Kerne{#cpu-cores} 
Sie sollten nie nThreads auf eine Anzahl größer als die Anzahl der CPU-Kerne in der CPU des Computers einstellen. Im Wesentlichen haben alle modernen CPUs mehrere Kerne (z.B. 2, 4 oder 8) . Einige Computer haben sogar mehrere CPUs (z.B. 2 CPUs \\* 4 Cores/CPU = 8 CPU Cores) . Um herauszufinden, wie viele CPUs und Cores ein Computer hat:

* Auf Macs, verwenden *Optionsschlüssel* : Apple Menu : Systeminformationen
* Verwenden Sie auf Linux Katze /proc/cpuinfo
* Unter Windows 10 verwenden *Strg + Shift + Esc* zu öffnen Task-Manager : Leistung (Logische Prozessoren zeigen die Gesamtzahl der CPU-Kerne) 

Ja, die meisten Prozessoren sagen heutzutage, dass sie 2 Fäden pro Kern unterstützen (über [Hyper-Threading](https://en.wikipedia.org/wiki/Hyper-threading) ) , aber die 2 Threads teilen Rechenressourcen, so dass Sie nicht zweimal den Durchsatz auf einer CPU unter schweren Belastung sehen. Ein Computer mit einer CPU mit 4 Kernen kann beispielsweise behaupten, bis zu 8 Threads zu unterstützen, aber Sie sollten nThreads=4 nie überschreiten, indem ERDDAP . Denken Sie daran:

* Die nThreads Einstellung in ERDDAP™ ist pro Anfrage. ERDDAP™ oft behandelt mehrere Anfragen gleichzeitig.
*    ERDDAP™ macht andere Dinge als Prozessanfragen, z.B. Reload-Datensätze.
* Wann ERDDAP™ reagiert auf eine bestimmte Anfrage, andere Rechenressourcen (z.B. Laufwerkszugriff, Netzwerkbandbreite) kann begrenzen. Je höher du nThreads gesetzt hast, desto wahrscheinlicher werden diese anderen Ressourcen maximal ausgeschöpft und verlangsamen ERDDAP Die allgemeine Reaktionsfähigkeit.
* Das Betriebssystem macht andere Dinge als laufen ERDDAP .

So ist es am besten, die nThreads-Einstellung nicht auf mehr als die Anzahl der Kerne in der Computer-CPU einzustellen.
         
##### Ihre Milde Mai Vary (YMMV)  {#your-mileage-may-vary-ymmv} 
Die Ergebnisse verschiedener nThreads-Einstellungen werden für verschiedene Anfragen an verschiedene Datensätze auf verschiedenen Systemen stark variieren. Wenn Sie wirklich die Wirkung verschiedener nThreads-Einstellungen kennen wollen, führen Sie realistische Tests durch.
         
##### Warum nThreads pro Anfrage?{#why-nthreads-per-request} 
Ich höre einige von Ihnen denken: "Warum ist nThreads pro Anfrage? Wenn ich dies kodierte, würde ich einen permanenten Worker Thread Pool und eine Messaging-Quue für eine bessere Leistung verwenden." Das Problem bei der Verwendung eines Arbeitsfadenpools und einer Messaging-Warte ist, dass eine schwierige Anfrage die Warteschlange mit zahlreichen langsamen Aufgaben überfluten würde. Das würde effektiv blockieren ERDDAP™ von der bereits begonnenen Arbeit an Aufgaben im Zusammenhang mit anderen Anfragen bis zur ursprünglichen Anfrage (im Wesentlichen) fertig. So würden sogar einfache Folgewünsche super langsam reagieren. ERDDAP Die Verwendung von nThreads pro Anfrage führt zu einer viel faireren Nutzung von Rechenressourcen.
         
##### nThreads vs. Mehrere Worker Computer{#nthreads-vs-multiple-worker-computers} 
Leider, ERDDAP Das nThreads-System wird nie so effektiv sein wie die wahre Parallelisierung über mehrere Worker-Computer, mit jeder Arbeit an einem Bruch von Daten, in der Weise, dass Hadoop oder Apache Spark in der Regel verwendet werden. Wenn die Aufgabe wirklich parallelisiert / auf mehrere Computer verteilt ist, kann jeder Computer alle seine Ressourcen auf seinem Teil der Aufgabe verwenden. mit ERDDAP 's nThreads System, jeder der Threads ist konkurrieren für die Bandbreite des gleichen Computers, Laufwerke, Speicher, etc. Leider haben die meisten von uns nicht die Ressourcen oder Mittel zur Einrichtung oder sogar Miete (auf Amazon Web Services (AWS) oder Google Cloud Platform (GCP) ) massive Gitter von Computern. Im Gegensatz zu einer relationalen Datenbank, die erlaubt ist, die Ergebniszeilen in beliebiger Reihenfolge zurückzugeben, ERDDAP™ verspricht, die Ergebniszeilen in einer konsistenten Reihenfolge zurückzugeben. Diese Strenge macht ERDDAP 's nThreads Implementierung weniger effizient. Aber... ERDDAP nThreads ist in vielen Fällen nützlich.

Es gibt jedoch Möglichkeiten, ERDDAP™ Skala, um eine große Anzahl von Anfragen schnell zu handhaben, indem ein [netz/cluster/Föderation ERDDAP S](/docs/server-admin/scaling) .
         
#### &lt;Paletten &gt;{#palettes} 
* Beginnen mit ERDDAP™ Version 2.12, datasets.xml kann eine&lt;paletten&gt; tag (innerhalb&lt;erdddapDatasets&gt;), die die&lt;paletten&gt; tag Wert von messages.xml (oder revertiert auf den Nachrichten.xml-Wert, wenn der Tag in datasets.xml ist leer) . Damit können Sie die Liste der verfügbaren Paletten ändern, während ERDDAP™ läuft. Es lässt Sie auch eine Änderung vornehmen und haben es bestehen, wenn Sie eine neue Version von ERDDAP .
WARNING: Die in datasets.xml muss eine Überlagerung der in message.xml aufgeführten Paletten sein; andernfalls ERDDAP™ wird eine Ausnahme werfen und die Verarbeitung stoppen datasets.xml . Dies stellt sicher, dass alle ERDDAP™ Installationen unterstützen zumindest die gleichen Kernpaletten.
WARNING: ERDDAP™ prüft, ob die in message.xml angegebenen Palettendateien tatsächlich vorhanden sind, aber es überprüft nicht die in datasets.xml . Es ist Ihre Verantwortung, sicherzustellen, dass die Dateien vorhanden sind.
    
Auch beginnend mit ERDDAP™ Version 2.12, wenn Sie ein cptfiles Unterverzeichnis im ERDDAP™ Inhaltsverzeichnis, ERDDAP™ alle \\*.cpt-Dateien in diesem Verzeichnis in das Verzeichnis kopieren \\[ Tomcat \\] /webapps/erdap/WEB-INF/cptfiles Verzeichnis jedes Mal ERDDAP™ beginnt. Wenn Sie also benutzerdefinierte Cpt-Dateien in diesem Verzeichnis setzen, werden diese Dateien von ERDDAP™ , ohne zusätzlichen Aufwand auf Ihrem Teil, auch wenn Sie eine neue Version installieren ERDDAP .
    
WARNING: Wenn Sie benutzerdefinierte Paletten zu Ihrem hinzufügen ERDDAP™ und du hast EDDGrid FromErddap und/oder EDDTableFromErddap-Datensätze in Ihrem ERDDAP™ , dann werden Benutzer Ihre benutzerdefinierte Palette Optionen auf der ERDDAP™ Machen Sie ein Graph-Webseiten, aber wenn der Benutzer versucht, sie zu verwenden, erhalten sie ein Diagramm mit dem Standard (in der Regel Regenbogen) palette. Dies liegt daran, dass das Bild von der Fernbedienung gemacht wird ERDDAP™ die nicht die benutzerdefinierte Palette hat. Die einzigen Lösungen sind jetzt die E-Mail der Fernbedienung ERDDAP™ Administrator, um Ihre benutzerdefinierten Paletten zu seiner/ihr hinzufügen ERDDAP oder E-Mail Chris. John bei noaaa.gov zu fragen, dass die Paletten dem Standard hinzugefügt werden ERDDAP™ Verteilung.
    
#### &lt;überChange&gt;{#onchange} 
* ( ** &lt;aufChange&gt; ** &#33; (#onchange) ist ein OPTIONAL-Tag innerhalb eines&lt;Datensatz&gt; tag in datasets.xml die eine Aktion angibt, die bei der Erstellung dieses Datensatzes durchgeführt wird (wenn ERDDAP™ wird neu gestartet) und wann immer sich dieser Datensatz in irgendeiner Weise ändert.
    * Derzeit, für EDDGrid Unterklassen, jede Änderung der Metadaten oder einer Achsgröße (zum Beispiel einen neuen Zeitpunkt für nahezu Echtzeitdaten) wird als eine Änderung betrachtet, aber ein Nachladen des Datensatzes wird nicht als eine Änderung betrachtet (von selbst) .
    * Derzeit gilt für EDDTable-Unterklassen jedes Nachladen des Datensatzes als Änderung.
    * Derzeit sind nur zwei Arten von Aktionen erlaubt:
        * "http://"oder "https://"-- Wenn die Aktion mit " beginnthttp://"oder "https://", ERDDAP™ wird senden HTTP GET Bitte an die angegebene URL. Die Antwort wird ignoriert. Zum Beispiel, die URL könnte einigen anderen Web-Service sagen, etwas zu tun.
            * Wenn die URL ein Abfrageteil hat (nach dem "?") , es muss schon sein [Prozent kodiert](https://en.wikipedia.org/wiki/Percent-encoding) . Sie müssen spezielle Zeichen in den Zwängen kodieren (andere als die ersten „&“ und die wichtigsten '=' in Zwängen) in die Form %HH, wobei HH der zweistellige hexadezimale Wert des Zeichens ist. Normalerweise müssen Sie nur ein paar der Pünktlichkeitszeichen umwandeln: % in %25, & in %26, " in %22,&lt;in %3C, = in %3D, &gt; in %3E, + in %2B, | in %7C, \\[ in %5B, \\] in %5D, Raum in %20, und alle Zeichen über #127 in ihr UTF-8-Formular umwandeln und dann prozentual jeden Byte des UTF-8-Formulars in das %HH-Format kodieren (einen Programmierer um Hilfe bitten) .
Zum Beispiel, & stationID &gt;= 41004
und stationID %3E =%2241004%22
Die prozentuale Kodierung ist in der Regel erforderlich, wenn Sie auf ERDDAP über eine andere Software als einen Browser. Browser behandeln in der Regel prozentuale Kodierung für Sie.
In einigen Situationen müssen Sie Prozent kodieren alle Zeichen andere als A-Za-z0-9\\_-&#33;.~ ' () \\*, aber noch nicht codieren die anfängliche '&' oder die Haupt '=' in Zwängen.
Programmiersprachen haben dazu Werkzeuge (siehe z.B. Java ' [ java.net.URLEncoder ](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html) und Java Script's [encodeURIComponent()&#33; (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) ) und es gibt
                 [Webseiten, die prozentual encode/decode für Sie](https://www.url-encode-decode.com/) .
            * Seit datasets.xml ist eine XML-Datei, Sie müssen auch kodieren ALL '&', '&lt;', und '&gt;' in der URL als '&amp', '&lt;', und '&gt;' nach Prozent Codierung.
            * Beispiel: Für eine URL, die Sie in einen Browser eingeben könnten:
                https://www.company.com/webService?department=R%26D&param2=value2  
Sie sollten eine&lt;aufChange&gt; tag via (auf einer Linie) 
            ```
                <onChange>https://www.company.com/webService?department=R%26D&amp;param2=value2</onChange>
            ```
        * Mailto: -- Wenn die Aktion mit "mailto:" beginnt, ERDDAP™ sendet eine E-Mail an die nachfolgende E-Mail-Adresse, die angibt, dass der Datensatz aktualisiert/verändert wurde.
Zum Beispiel:&lt;aufChange&gt;mailto:john.smith@company.com&lt;/onChange&gt; Wenn Sie einen guten Grund haben ERDDAP™ um eine andere Art von Aktion zu unterstützen, senden Sie uns eine E-Mail, die beschreibt, was Sie wollen.
    * Dieser Tag ist OPTIONAL. Es kann so viele dieser Tags geben, wie Sie wollen. Verwenden Sie eine dieser Tags für jede Aktion durchgeführt werden.
    * Dies ist analog ERDDAP 's E-Mail/URL Abonnement-System, aber diese Aktionen werden nicht persistent gespeichert (d.h. sie werden nur in einem EDD-Objekt gespeichert) .
    * Um ein Abonnement zu entfernen, entfernen Sie einfach die&lt;aufChange&gt; tag. Die Änderung wird beim nächsten erneuten Laden des Datensatzes bemerkt.
         
#### &lt;reloadEveryNMinutes&gt;{#reloadeverynminutes} 
* ( ** &lt;Nachladen AllNMinutes&gt; ** &#33; (#reloadeverynminutes) ist ein OPTIONAL-Tag innerhalb eines&lt;Datensatz&gt; tag in datasets.xml von fast allen Datensätzen, die angeben, wie oft der Datensatz neu geladen werden soll. Zum Beispiel
    ```
    <reloadEveryNMinutes>60</reloadEveryNMinutes>
    ```
    * Generell ändern sich häufig Datenmengen (zum Beispiel neue Datendateien erhalten) sollte häufig wieder geladen werden, beispielsweise alle 60 Minuten.
    * Datensätze, die sich häufig ändern, sollten selten wieder geladen werden, beispielsweise alle 1440 Minuten (täglich) oder 10080 Minuten (wöchentlich) .
    * Dieser Tag ist OPTIONAL, aber empfohlen. Der Standard ist 10080.
    * Ein Beispiel ist:&lt;reloadEveryNMinutes&gt;1440&lt;/Entladung AllNMinutes&gt;
    * Wenn ein Datensatz neu geladen wird, alle Dateien im *BigParentDirectory* /cache/ * datasetID * Verzeichnis wird gelöscht.
    * Egal, auf was dies gesetzt ist, ein Datensatz wird nicht häufiger geladen als&lt;lastDatasetsMinutes&gt; (Standard = 15) , wie in [Setup.xml](/docs/server-admin/deploy-install#setupxml) . Wenn Sie also möchten, dass Datensätze sehr häufig neu geladen werden, müssen Sie beide reloadEveryNMinutes und loadDatasets festlegen MinMinuten zu kleinen Werten.
    * Setzen Sie nicht reloadEveryNMinutes auf den gleichen Wert wie loadDatasets MinMinutes, weil die verstrichene Zeit wahrscheinlich sein wird (beispielsweise) 14:58 oder 15:02, so wird der Datensatz nur in etwa der Hälfte der großen Reloads neu geladen. Stattdessen verwenden Sie eine kleinere (beispielsweise 10) oder größer (beispielsweise 20) Nachladen JederNMinutes Wert.
    * Unabhängig von reloadEveryNMinutes, können Sie manuell sagen ERDDAP™ einen bestimmten Datensatz so schnell wie möglich über eine [Flaggen](/docs/server-admin/additional-information#flag) .
    * Für anspruchsvolle Programmierer -- In ERDDAP™ , das Nachladen aller Datensätze wird durch zwei einzelne Zielfäden gehandhabt. Ein Thread leitet ein kleineres Nachladen ein, wenn es eine Flag-Datei oder ein großes Nachladen findet (die alle Datensätze überprüft, um zu sehen, ob sie neu geladen werden müssen) . Der andere Faden übernimmt die eigentliche Nachladung der Datensätze zu einem Zeitpunkt. Diese Threads arbeiten im Hintergrund, um sicherzustellen, dass alle Datensätze aktuell gehalten werden. Der Faden, der tatsächlich die Reloads vorbereitet eine neue Version eines Datensatzes dann tauscht es in Platz (die alte Version atomar ersetzen) . So ist es sehr möglich, dass die folgende Folge von Ereignissen auftritt. (Das ist gut.) :
        
        1.   ERDDAP™ startet das Nachladen eines Datensatzes (eine neue Version erstellen) im Hintergrund.
        2. Der Benutzer 'A' stellt eine Anfrage an den Datensatz. ERDDAP™ verwendet die aktuelle Version des Datensatzes, um die Antwort zu erstellen. (Das ist gut. Es gab keine Verzögerung für den Benutzer, und die aktuelle Version des Datensatzes sollte nie sehr stabil sein.) 
        3.   ERDDAP™ beendet die Erstellung der neuen neu geladenen Version des Datensatzes und Swaps, die neue Version in die Produktion. Alle nachfolgenden neuen Anfragen werden von der neuen Version des Datensatzes bearbeitet. Für Konsistenz wird die Anfrage des Benutzers A noch von der Originalversion ausgefüllt.
        4. Benutzer 'B' stellt eine Anfrage an den Datensatz und ERDDAP™ verwendet die neue Version des Datensatzes, um die Antwort zu erstellen.
        5. Letztendlich werden die Anfragen von Benutzer A und Benutzer B abgeschlossen. (vielleicht A's beendet zuerst, vielleicht B's beendet zuerst) .
        
Ich höre jemanden, der sagt: "Nur zwei Drittel&#33; Ha&#33; Das ist lahm&#33; Er sollte das so einrichten, dass das Nachladen von Datensätzen so viele Threads verwendet, wie sie benötigt werden, so dass alles schneller und mit wenig oder ohne Verzögerung getan wird." Ja und nein. Das Problem ist, dass das Laden von mehr als einem Datensatz zu einer Zeit mehrere harte neue Probleme schafft. Sie müssen alle gelöst oder behandelt werden. Das aktuelle System funktioniert gut und hat überschaubare Probleme (z.B. das Potenzial für eine Verzögerung, bevor eine Flagge bemerkt wird) . (Wenn Sie Hilfe benötigen, um sie zu verwalten, sehen Sie unsere [Abschnitt zum Erhalt zusätzlicher Unterstützung](/docs/intro#support) .) Der Verwandte [Aktualisierung AllNMillis](#updateeverynmillis) . System funktioniert innerhalb von Antwortfäden, so kann und führt es dazu, dass mehrere Datensätze aktualisiert werden (nicht die volle Nachladung) gleichzeitig.
##### Proactive vs. Reactive{#proactive-vs-reactive} 
 ERDDAP 's Reload-System ist proaktiv -- Datensätze werden bald nach ihrem Reload neu geladen EveryNMinutes Zeit ist auf (d.h., sie werden "stale", aber nie sehr stale) , ob der Datensatz Anfragen von Benutzern erhält oder nicht. So. ERDDAP™ datasets sind immer aktuell und gebrauchsfertig. Dies steht im Gegensatz zum reaktiven Ansatz von THREDDS: Die Anfrage eines Nutzers sagt THREDDS, ob ein Datensatz gestaffelt ist (es kann sehr stale) . Wenn es stale, THREDDS macht den Benutzer warten (oft für ein paar Minuten) während der Datensatz neu geladen wird.
        
#### &lt;Aktualisierung AlleNMillis&gt;{#updateeverynmillis} 
* ( ** &lt;UpdateEveryNMillis&gt; ** &#33; (#updateeverynmillis) ist ein OPTIONAL-Tag innerhalb eines&lt;Datensatz&gt; tag in datasets.xml von einigen Datensatztypen, die helfen ERDDAP™ Arbeit mit Datensätzen, die sich sehr häufig ändern (wie oft jede Sekunde) . Im Gegensatz zu ERDDAP Regelmäßig, proaktiv, [&lt;Nachladen AllNMinutes&gt;] (#reloadeverynminutes) System zum vollständigen Nachladen jedes Datensatzes, dieses OPTIONAL Zusatzsystem ist reaktiv (ausgelöst durch eine Benutzeranforderung) und schneller, weil es inkremental (nur die Aktualisierung der Informationen, die aktualisiert werden müssen) . Zum Beispiel, wenn eine Anfrage an eine EDDGrid FromDap-Datensatz tritt seit dem letzten Update mehr als die angegebene Anzahl von Millisekunden auf, ERDDAP™ wird sehen, ob es neue Werte für den linken (zuerst, in der Regel "time" ) Dimension und, wenn ja, laden Sie diese neuen Werte einfach herunter, bevor Sie die Anfrage des Benutzers bearbeiten. Dieses System ist sehr gut, einen sich schnell ändernden Datensatz aktuell mit minimalen Anforderungen an die Datenquelle zu halten, aber zu den Kosten der leichten Verlangsamung der Verarbeitung einiger Benutzerwünsche.
    * Um dieses System zu verwenden, fügen Sie (beispielsweise) :
        ```
        <updateEveryNMillis>1000</updateEveryNMillis>  
        ```
nach rechts&lt;reloadEveryNMinutes&gt; tag für den Datensatz in datasets.xml . Die Anzahl der Millisekunden, die Sie angeben, kann so klein wie 1 sein (um sicherzustellen, dass der Datensatz immer aktuell ist) . Ein Wert von 0 (Der Standard) oder eine negative Zahl schaltet das System aus.
    * Aufgrund ihrer inkrementellen Natur sollten Updates sehr schnell enden, so dass Benutzer nie eine lange Zeit warten müssen.
    * Kommt eine zweite Datenanforderung vor dem vorherigen Update an, wird die zweite Anfrage kein weiteres Update auslösen.
    * In der gesamten Dokumentation versuchen wir, das Wort "Reload" für regelmäßige, vollständige Datensatz-Reloads und "Update" für diese neuen inkrementellen, teilweisen Updates zu verwenden.
    * Für Testzwecke werden einige Diagnosen auf log.txt gedruckt, wenn [&lt;logLevel&gt; (#loglevel) in datasets.xml wird auf "all" gesetzt.
    * Wenn Sie inkrementelle Updates verwenden und vor allem, wenn die linkeste (erste) , zum Beispiel, Zeit, Achse ist groß, können Sie setzen möchten&lt;reloadEveryNMinutes&gt; auf eine größere Anzahl (1440?) , so dass Updates die meisten der Arbeit tun, um den Datensatz auf dem neuesten Stand zu halten, und vollständige Reloads werden selten durchgeführt.
    * Hinweis: Dieses neue Update-System aktualisiert Metadaten (zum Beispiel, Zeit actual\\_range , time\\_coverage\\_end, ...) aber löst nicht aufChange aus (E-Mail oder Touch URL) oder ändern RSS Futtermittel (Vielleicht sollte es...) .
    * Für alle Datensätze, die Unterklassen von [ EDDGrid VonFiles](#eddgridfromfiles) und [EDDTableFromFiles](#eddtablefromfiles) :
        *    **WARNING:** wenn Sie eine neue Datendatei zu einem Datensatz hinzufügen, indem Sie sie in das Verzeichnis kopieren, dass ERDDAP™ Es besteht die Gefahr, dass ERDDAP™ wird die teilweise geschriebene Datei bemerken; versuchen Sie es zu lesen, aber scheitern, weil die Datei unvollständig ist; erklären Sie die Datei zu einer "schlechten" Datei und entfernen Sie sie (vorübergehend) aus dem Datensatz.
Um das zu vermeiden, wir **STRONGLY EMPFEHLUNGEN** dass Sie eine neue Datei in das Verzeichnis mit einem temporären Namen kopieren (zum Beispiel, 20150226 .nc Tmp) das nicht mit der Datei datasets übereinstimmt NameRegex (* .nc ) , dann umbenennen Sie die Datei in den richtigen Namen (zum Beispiel, 20150226 .nc ) . Wenn Sie diesen Ansatz verwenden, ERDDAP™ wird die temporäre Datei ignorieren und nur die korrekt benannte Datei bemerken, wenn sie vollständig und bereit ist, verwendet zu werden.
        * Wenn Sie bestehende Datendateien ändern (zum Beispiel, um einen neuen Datenpunkt hinzuzufügen) ,&lt;updateEveryNMillis&gt; wird gut funktionieren, wenn die Änderungen atomar erscheinen (in einem Augenblick) und die Datei ist immer eine gültige Datei. Zum Beispiel ermöglicht die netcdf-java-Bibliothek Erweiterungen der unbegrenzten Dimension eines "klassischen" .nc v3 Datei atomar gemacht werden.
            &lt;updateEveryNMillis&gt; wird schlecht funktionieren, wenn die Datei ungültig ist, während die Änderungen vorgenommen werden.
        *   &lt;updateEveryNMillis&gt; funktioniert gut für Datensätze, bei denen sich eine oder ein paar Dateien in kurzer Zeit ändern.
        *   &lt;updateEveryNMillis&gt; wird schlecht für Datensätze arbeiten, bei denen sich eine große Anzahl von Dateien in kurzer Zeit ändern (es sei denn, die Änderungen erscheinen atomar) . Für diese Datensätze ist es besser, nicht zu verwenden&lt;updateEveryNMillis&gt; und ein [Flagge](/docs/server-admin/additional-information#set-dataset-flag) zu sagen ERDDAP™ um den Datensatz neu zu laden.
        *   &lt;UpdateEveryNMillis&gt; die mit der [&lt; subsetVariables &gt; (#subsetvariables) . Normalerweise ist dies kein Problem, weil die subsetVariables Informationen über Dinge haben, die sich nicht sehr oft ändern (zum Beispiel die Liste der Stationsnamen, Breitengrade und Längengrade) . Wenn subsetVariables Datenänderungen (zum Beispiel, wenn eine neue Station zum Datensatz hinzugefügt wird) , dann kontaktieren Sie die [Zurück zur Übersicht](/docs/server-admin/additional-information#set-dataset-flag) für den Datensatz zu sagen ERDDAP™ um den Datensatz neu zu laden. Andernfalls ERDDAP™ wird die neue Untermenge nicht bemerken Variable Informationen, bis zum nächsten Mal der Datensatz wieder geladen wird (&lt;reloadEveryNMinutes&gt;).
        * Unsere allgemeine Empfehlung ist zu verwenden:
        ```
            <reloadEveryNMinutes>1440</reloadEveryNMinutes>  
            <updateEveryNMillis>10000</updateEveryNMillis>
        ```
        * TROUBLE? Auf Linux-Computern, wenn Sie verwenden&lt;UpdateEveryNMillis&gt; mit EDDGrid AusFiles oder EDDTableFromFiles-Klassen können Sie ein Problem sehen, bei dem ein Datensatz nicht geladen wird (gelegentlich oder konsequent) mit der Fehlermeldung: "IOException: Benutzergrenze von inotify Instanzen erreicht oder zu viele offene Dateien". Die Ursache kann ein Fehler in Java die verursacht, dass die Fälle nicht Müll gesammelt werden. Dieses Problem wird vermieden ERDDAP™ v1.66 und höher. So ist die beste Lösung, die neueste Version zu wechseln ERDDAP .
Wenn das das Problem nicht löst (das heißt, wenn Sie eine wirklich große Anzahl von Datensätzen mit&lt;updateEveryNMillis&gt;), können Sie dieses Problem beheben:
            ```
            sudo sysctl fs.inotify.max\\_user\\_watches=65536  
            sudo sysctl fs.inotify.max\\_user\\_instances=1024  
            sudo sysctl -p  
            ```
Oder, verwenden Sie höhere Zahlen, wenn das Problem anhält. Der Standard für Uhren ist 8192. Die Standardeinstellung beträgt beispielsweise 128.
    * Sie können setzen&lt;updateMaxEvents&gt;10&lt;/updateMaxEvents&gt; in datasets.xml   (mit den anderen Einstellungen in der Nähe von oben) um die maximale Anzahl von Dateiänderungen zu ändern (Standardeinstellungen) die vom updateEveryNMillis-System verarbeitet werden. Eine größere Anzahl kann für Datensatz nützlich sein, wo es sehr wichtig ist, dass sie immer aktuell gehalten werden. Siehe [updateMaxEvents Dokumentation](#updatemaxevents) .
    * Für Curious Programmierer -- diese inkrementellen Updates, im Gegensatz ERDDAP 's voll [reloadEveryNMinutes](#reloadeverynminutes) System, innerhalb von Benutzeranforderungsfäden auftreten. So können jede Anzahl von Datensätzen gleichzeitig aktualisiert werden. Es gibt Code (und ein Schloss) um sicherzustellen, dass nur ein Thread an einem Update für einen bestimmten Datensatz zu einem bestimmten Zeitpunkt arbeitet. Mehrere gleichzeitige Updates zu ermöglichen, war einfach; mehrere gleichzeitige vollständige Reloads wären härter.
         
#### &lt;sourceCanConstrainStringEQNE&gt;{#sourcecanconstrainstringeqne} 
* ( ** &lt;sourceCanConstrainStringEQNE&gt; ** &#33; (#sourcecanconstrainstringeqne) ist ein OPTIONAL-Tag innerhalb eines EDDTable&lt;Datensatz&gt; tag in datasets.xml die angibt, ob die Quelle String-Variablen mit den = und &#33;= Operatoren einschränken kann.
    * Für EDDTableFromDapSequence gilt dies nur für die äußere Sequenz String-Variablen. Es wird angenommen, dass die Quelle keine Zwänge an inneren Sequenzvariablen handhaben kann.
    * Dieser Tag ist OPTIONAL. Gültige Werte sind wahr (Der Standard) und falsch.
    * Für EDDTableFromDapSequenz OPeNDAP DRDS-Server, dies sollte auf true gesetzt werden (Der Standard) .
    * Für EDDTableFromDapSequenz Dapper-Server, dies sollte auf false gesetzt werden.
    * Ein Beispiel ist:
```
        <sourceCanConstrainStringEQNE>true</sourceCanConstrainStringEQNE>  
```
         
#### &lt;sourceCanConstrainStringGTLT&gt;{#sourcecanconstrainstringgtlt} 
* ( ** &lt;sourceCanConstrainStringGTLT&gt; ** &#33; (#sourcecanconconstrainstringgtlt) ist ein OPTIONAL-Tag innerhalb eines EDDTable&lt;dataset&gt; tag, der angibt, ob die Quelle String-Variablen mit der&lt;,&lt;=, &gt; und &gt;= Betreiber.
    * Für EDDTableFromDapSequence gilt dies nur für die äußere Sequenz String-Variablen. Es wird angenommen, dass die Quelle keine Zwänge an inneren Sequenzvariablen handhaben kann.
    * Gültige Werte sind wahr (Der Standard) und falsch.
    * Dieser Tag ist OPTIONAL. Der Standard ist wahr.
    * Für EDDTableFromDapSequenz OPeNDAP DRDS-Server, dies sollte auf true gesetzt werden (Der Standard) .
    * Für EDDTableFromDapSequenz Dapper-Server, dies sollte auf false gesetzt werden.
    * Ein Beispiel ist:
```
        <sourceCanConstrainStringGTLT>true</sourceCanConstrainStringGTLT>  
```
         
#### &lt;sourceCanConstrainStringRegex&gt;{#sourcecanconstrainstringregex} 
* ( ** &lt;sourceCanConstrainStringRegex&gt; ** &#33; (#sourcecanconstrainstringregex) ist ein OPTIONAL-Tag innerhalb eines EDDTable&lt;dataset&gt; tag, der spezifiziert, ob die Quelle String-Variablen durch regelmäßige Ausdrücke einschränken kann, und wenn ja, was der Bediener ist.
    * Gültige Werte sind "=~" (die DAP Standard) , "~=" (irrtümlich unterstützt von vielen DAP Server) , oder " (dass die Quelle keine regelmäßigen Ausdrücke unterstützt) .
    * Dieser Tag ist OPTIONAL. Der Standard ist "".
    * Für EDDTableFromDapSequenz OPeNDAP DRDS-Server, dies sollte auf " gesetzt werden" (Der Standard) .
    * Für EDDTableFromDapSequenz Dapper-Server, dies sollte auf " gesetzt werden" (Der Standard) .
    * Ein Beispiel ist:
```
        <sourceCanConstrainStringRegex>=~</sourceCanConstrainStringRegex>  
```
#### &lt;sourceCanDoDistinct&gt;{#sourcecandodistinct} 
* ( ** &lt;SourceCanDoDistinct&gt; ** &#33; (#sourcecandodistinct) ist ein OPTIONAL-Tag innerhalb einer EDDTableFromDatabase&lt;dataset&gt; tag, der angibt, ob die Quelldatenbank mit &distinct umgehen soll () Einschränkungen bei Benutzeranfragen.
    * Dieser Tag ist OPTIONAL. Gültige Werte sind nicht ( ERDDAP™ Griffe deutlich; der Standard) , teilweise (die Quelle Griffe deutlich und ERDDAP™ griff es wieder) , und ja (die Quellgriffe deutlich) .
    * Wenn Sie Nein verwenden und ERDDAP™ wird aus dem Speicher ausgeführt, wenn die Handhabung deutlich, verwenden Sie ja.
    * Wenn Sie ja verwenden und die Quelldatenbank zu langsam deutlich wird, verwenden Sie Nein.
    * teilweise gibt Ihnen das Schlimmste von beiden: es ist langsam, weil die Datenbank-Handling von deutlich ist langsam und es kann aus dem Speicher in ERDDAP .
    * Datenbanken interpretieren DISTINCT als eine Anforderung für nur einzelne Zeilen von Ergebnissen, während ERDDAP™ interpretiert es als Anfrage für eine sortierte Liste von einzigartigen Zeilen von Ergebnissen. Wenn Sie dies auf Teil oder Ja setzen, ERDDAP™ sagt automatisch auch die Datenbank, um die Ergebnisse zu sortieren.
    * Ein kleiner Unterschied in den Ergebnissen:
Nein | teilweise, ERDDAP™ wird " zu Beginn der Ergebnisse sortieren (vor nicht-""" Strings) .
Mit ja, die Datenbank kann (Postgres werden) sort " am Ende der Ergebnisse (nach nicht-""" Saiten) .
Ich werde vermuten, dass dies auch die Sortierung von kurzen Wörtern im Vergleich zu längeren Wörtern beeinflussen wird, die mit dem kurzen Wort beginnen. Zum Beispiel ERDDAP™ wird "Simon" vor "Simons" sortieren.
    * Ein Beispiel ist:
```
        <sourceCanDoDistinct>yes</sourceCanDoDistinct>  
```
         
#### &lt;QuelleCanOrderBy&gt;{#sourcecanorderby} 
* ( ** &lt;Quelle CanOrderBind &gt; ** &#33; (#sourcecanorderby) ist ein OPTIONAL-Tag innerhalb einer EDDTableFromDatabase&lt;dataset&gt; tag, der angibt, ob die Quelldatenbank handhaben soll & orderBy  (...) Einschränkungen bei Benutzeranfragen.
    * Dieser Tag ist OPTIONAL. Gültige Werte sind nicht ( ERDDAP™ Griffe orderBy  (...) ; der Standard) , teilweise (die Quellgriffe orderBy und ERDDAP™ griff es wieder) , und ja (die Quellgriffe orderBy  (...) ) .
    * Wenn Sie Nein verwenden und ERDDAP™ läuft beim Handling aus dem Speicher orderBy  (...) - Ja.
    * Wenn Sie Ja verwenden und die Quelldatenbank behandelt orderBy  (...) zu langsam.
    * teilweise gibt Ihnen das Schlimmste von beiden: es ist langsam, weil die Datenbank-Handling orderBy  (...) ist langsam und es kann aus dem Gedächtnis in ERDDAP .
    * Ein kleiner Unterschied in den Ergebnissen:
Nein | teilweise, ERDDAP™ wird " zu Beginn der Ergebnisse sortieren (vor nicht-""" Strings) .
Mit ja, die Datenbank kann (Postgres werden) sort " am Ende der Ergebnisse (nach nicht-""" Saiten) .
Dies kann auch die Sortierung von kurzen Wörtern gegenüber längeren Wörtern beeinflussen, die mit dem kurzen Wort beginnen. Zum Beispiel ERDDAP™ wird "Simon" vor "Simons" sortieren, aber ich weiß nicht, wie eine Datenbank sie sortieren wird.
    * Ein Beispiel ist:
```
        <sourceCanOrderBy>yes</sourceCanOrderBy>  
```
         
#### &lt;sourceNeedsExpandedFP\\_EQ&gt;{#sourceneedsexpandedfp_eq} 
* ( ** &lt;sourceNeedsExpandedFP\\_EQ&gt; ** &#33; (#sourceneedsexpandedfp_eq) ist ein OPTIONAL-Tag innerhalb eines EDDTable&lt;dataset&gt; tag, der spezifiziert (wahr (Der Standard) oder falsch) wenn die Quelle Hilfe bei Abfragen braucht&lt;Numerisch Variable&gt;=&lt;FloatingPointValue&gt; (und &#33;=, &gt;=,&lt;= Zum Beispiel
    ```
    <sourceNeedsExpandedFP\\_EQ>false</sourceNeedsExpandedFP\\_EQ>
    ```
    * Für einige Datenquellen sind numerische Abfragen mit =, &#33;=,&lt;=, oder &gt;= darf nicht beliebig mit Floating-Point-Nummern arbeiten. Beispielsweise kann eine Suche nach Longitude=220.2 scheitern, wenn der Wert als 220.20000000000001 gespeichert wird.
    * Dieses Problem tritt auf, weil schwimmende Punktzahlen [nicht genau dargestellt innerhalb von Computern](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) .
    * Wenn sourceNeedsExpandedFP\\_EQ ist auf die Wahrheit gesetzt (Der Standard) , ERDDAP™ modifiziert die an die Datenquelle gesendeten Abfragen, um dieses Problem zu vermeiden. Es ist immer sicher und gut, dieses Set zu wahren.
         
#### &lt; sourceUrl &gt;{#sourceurl} 
* ( ** &lt; sourceUrl &gt; ** &#33; (#sourceurl) ist ein häufiger Tag innerhalb des globalen Datensatzes&lt; addAttributes &gt; tag, das die URL, die die Quelle der Daten ist, angibt.
    * Ein Beispiel ist:
    ```
        <sourceUrl>https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/VH/chla/1day</sourceUrl>  
    ```
         (aber alles auf eine Linie setzen) 
    * In ERDDAP™ , alle Datensätze haben ein " sourceUrl " in den kombinierten globalen Attributen, die den Nutzern angezeigt werden.
    * Für die meisten Datensätze ist dieser Tag REQUIRED. Siehe die Beschreibung des Dataset-Typs, um herauszufinden, ob dies REQUIRED ist oder nicht.
    * Für einige Datensätze, die separate&lt; sourceUrl &gt; tag ist nicht erlaubt. Stattdessen müssen Sie ein " sourceUrl " [Globales Attribut](#global-attributes) , meist im globalen \\&gt; addAttributes &lt;. Wenn es keine tatsächliche Quell-URL gibt (beispielsweise, wenn die Daten in lokalen Dateien gespeichert werden) , dieses Attribut hat oft nur einen Platzhalter-Wert, beispielsweise&lt;att name="name"&gt; (lokale Dateien) &lt;.
    * Für die meisten Datensätze ist dies die Basis der URL, mit der Daten angefordert werden können. Zum Beispiel, DAP Server, dies ist die URL, zu der .dods, .das, .dds oder .html hinzugefügt werden können.
    * Seit datasets.xml ist eine XML-Datei, Sie müssen auch kodieren '&', '&lt;', und '&gt;' in der URL als '&amp', '&lt;', und '&gt;'.
    * Für die meisten Datensätze, ERDDAP™ das Original hinzufügen sourceUrl   ("localSourceUrl" im Quellcode) in der [Globale Attribute](#global-attributes)   (wo es zum "publicSourceUrl" im Quellcode wird) . Wenn die Datenquelle lokale Dateien ist, ERDDAP™ in den Warenkorb sourceUrl = (lokale Dateien) " den globalen Attributen als Sicherheitsvorkehrung. Wenn die Datenquelle eine Datenbank ist, ERDDAP™ in den Warenkorb sourceUrl = (Quelle Datenbank) " den globalen Attributen als Sicherheitsvorkehrung. Wenn einige Ihrer Datensätze nicht-öffentlich sind sourceUrl ' (in der Regel, weil ihr Computer in Ihrem DMZ oder auf einem lokalen LAN) Sie können verwenden [&lt;ConvertToPublicSourceUrl&gt;] (#converttopublicsourceurl) tags, um festzulegen, wie man die lokale sourceUrl s für die Öffentlichkeit sourceUrl S.
    * A sourceUrl kann beginnen mit http:// , https:// , ftp:// und vielleicht andere Präfixe. https Verbindungen lesen und überprüfen das digitale Zertifikat der Quelle, um sicherzustellen, dass die Quelle ist, wer sie sagen. In seltenen Fällen kann diese Überprüfung mit dem Fehler "javax.net.ssl.SSLProtocolException: handshake alert: unreuthed\\_name" scheitern. Dies ist wahrscheinlich auf den Domainnamen im Zertifikat zurückzuführen, der nicht dem Domainnamen entspricht, den Sie verwenden. Sie können und sollten die Details der sourceUrl 's Zertifikat in Ihrem Webbrowser, insbesondere die Liste der "DNS-Namen" im Abschnitt "Subject Alternative Name".
        
In einigen Fällen sourceUrl Sie können ein Alias des Domainnamens auf dem Zertifikat sein. Zum Beispiel
        https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/wird diesen Fehler werfen, aber
        https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/, die den Domainnamen auf dem Zertifikat verwendet, wird nicht. Die Lösung in diesen Fällen besteht daher darin, den Domainnamen auf dem Zertifikat zu finden und zu verwenden. Wenn Sie es nicht auf dem Zertifikat finden, kontaktieren Sie den Datenanbieter.
        
In anderen Fällen kann der Domainname auf dem Zertifikat für eine Gruppe von Namen sein. Wenn dies geschieht oder das Problem sonst unlösbar ist, mailen Sie bitte Chris. John bei noaa.gov, um das Problem zu melden.
         

#### &lt;addAttributes&gt; {#addattributes} 
* ( ** &lt; addAttributes &gt; ** &#33; (#addattributes) ist ein OPTIONAL-Tag für jeden Datensatz und für jede Variable, die ERDDAP Administratoren steuern die Metadaten-Attribute, die einem Datensatz und seinen Variablen zugeordnet sind.
    *    ERDDAP™ kombiniert die Attribute aus der Quelle des Datensatzes ("sourceAttributes") und die " addAttributes ", die Sie definieren datasets.xml   (die Priorität haben) die "kombinierten Beiträge" zu machen, die ERDDAP™ Benutzer sehen. So können Sie verwenden addAttributes die Werte von sourceAttributes neu definieren, neue Attribute hinzufügen oder Attribute entfernen.
    * Die&lt; addAttributes &gt; tag umschließt 0 oder mehr ** &lt;mit einem Gehalt an ** Subtags, die zur Angabe einzelner Attribute verwendet werden.
    * Jedes Attribut besteht aus einem Namen und einem Wert (der einen bestimmten Datentyp aufweist, beispielsweise doppelt) .
    * Es kann nur ein Attribut mit einem bestimmten Namen geben. Wenn es mehr gibt, hat die letzte Priorität.
    * Der Wert kann ein einzelner Wert oder eine platzgetrennte Werteliste sein.
    * Syntax
        * Die Reihenfolge der&lt;att&gt; subtags innerhalb addAttributes ist nicht wichtig.
        * Die&lt;att&gt; Subtag Format ist
        ```
            <att name="*name*" \\[type="*type*"\\] >*value*</att>
        ```
        * Der Zielname aller Attribute Starten Sie mit einem Buchstaben (A-Z, a-z) und nur die Zeichen A-Z, a-z, 0-9 oder '\\_' enthalten.
        * Wenn&lt;att&gt; Subtag hat keinen Wert oder einen Wert von null, dieses Attribut wird aus den kombinierten Attributen entfernt.
Zum Beispiel&lt;att name="rows" /&gt; entfernt Zeilen aus den kombinierten Attributen.
Zum Beispiel&lt;att name="Koordinaten"&gt;null&lt;/att&gt; entfernt Koordinaten aus den kombinierten Attributen.
##### Eigenschaften Typ{#attributetype} 
* [Der OPTIONELLE Typwert für&lt;att&gt; subtags] (#attributetype) den Datentyp für die Werte angibt. Der Standardtyp ist String. Ein Beispiel für ein String-Attribut ist:
    ```
    <att name="creator\\_name">NASA/GSFC OBPG</att>
    ```
    * Gültige Typen von Einzelwerten sind Byte (8-bit ganze) , kurz (16-Bit signiert ganze) , Int (32-Bit signiert ganze) , lang (64-Bit signiert ganze) , schwimmen (32-Bit-Schwebungspunkt) , doppelt (64-Bit-Schwebungspunkt) , char und String. Zum Beispiel
        ```
        <att name="scale\\_factor" type="float">0.1</att>
        ```
Sehen Sie diese Anmerkungen zu den [Art der Daten](#char) .
Sehen Sie diese Anmerkungen zu den [lange Datenart](#long) .
        
    * Gültige Typen für raumgetrennte Wertelisten (oder Einzelwerte) sind byteList, shortList, unsignedShortList, charList, intList, longList, floatList, double Liste. Zum Beispiel
        ```
        <att name="actual\\_range" type="doubleList">10.34 23.91</att>  
        ```
Ein unsignedShortList lässt Sie eine Liste von unbesignierten Shorts angeben, aber sie werden in eine Liste der entsprechenden Unicode-Zeichen umgewandelt (z.B. "65 67 69" wird in "A C E" umgewandelt.
Wenn Sie einen charList angeben, kodieren Sie alle Sonderzeichen (z.B. Raum, Doppel-Zitate, Backslash,&lt;#32, oder &gt;#127) wie Sie sie im Datenbereich einer NCCSV-Datei kodieren würden (z.B. ", "\" oder """, "\\\", " \\n ", "\\u20ac") .
Es gibt keine stringList. Speichern Sie die String-Werte als Multi-Line String. Zum Beispiel
        ```
        <att name="history">2011-08-05T08:55:02Z ATAM - made CF-1.6 compliant.  
        2012-04-08T08:34:58Z ATAM - Changed 'height' from double to float.</att>  
                ```
                 
#### Globale Attribute{#global-attributes} 
* ( ** Globale Attribute / Global&lt; addAttributes &gt; ** &#33; (#global-attributes) --
    &lt; addAttributes &gt; ein OPTIONAL-Tag innerhalb der&lt;dataset&gt; tag, mit dem Attribute geändert werden, die für den gesamten Datensatz gelten.
    
    *    ** Global nutzen&lt; addAttributes &gt; zur Änderung der globalen Attribute des Datensatzes. **  ERDDAP™ kombiniert die globalen Attribute aus der Datenquelle (** QuelleBeiträge **) und die globale**  addAttributes  **die Sie definieren datasets.xml   (die Priorität haben) die globale** In den Warenkorb ** , die ERDDAP™ Benutzer sehen. So können Sie verwenden addAttributes die Werte von sourceAttributes neu definieren, neue Attribute hinzufügen oder Attribute entfernen.
    * Siehe die [ ** &lt; addAttributes &gt; **Informationen (#addattributes) das gilt für global und variabel** &lt; addAttributes &gt; ** .
    *    [FGDC](https://www.fgdc.gov/standards/projects/FGDC-standards-projects/metadata/base-metadata/index_html) und [ISO 19115-2/19139](https://en.wikipedia.org/wiki/Geospatial_metadata) Metadaten -- Normalerweise, ERDDAP™ automatisch ISO 19115-2/19139 und FGDC generieren (FGDC-STD-001-1998) XML-Metadatendateien für jeden Datensatz unter Verwendung von Informationen aus den Metadaten des Datensatzes. Also, **gute Datensatz-Metadaten führen zu guter ERDDAP -generierte Metadaten nach ISO 19115 und FGDC. Bitte beachten Sie, dass Sie viel Zeit und Mühe in die Verbesserung der Metadaten Ihrer Datensätze setzen (was trotzdem gut ist) .** Die meisten Datensatz-Metadaten-Attribute, die zur Erzeugung der ISO 19115 und FGDC-Metadaten verwendet werden, stammen aus [ACDD-Metadatenstandard](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) und sind unten so angemerkt.
    * Viele globale Attribute sind besonders darin ERDDAP™ sucht sie und nutzt sie auf verschiedene Weise. Zum Beispiel eine Verbindung zum infoUrl ist auf Webseiten mit Listen von Datensätzen und anderen Orten enthalten, so dass Benutzer mehr über den Datensatz erfahren können.
    * Wenn ein Benutzer eine Teilmenge von Daten wählt, globalAttributes bezogen auf die Länge der Variable, Breite, Höhe (oder Tiefe) , und Zeitbereiche (zum Beispiel Southernmost\\_Northing, Northernmost\\_Northing, time\\_coverage\\_start, time\\_coverage\\_end) werden automatisch generiert oder aktualisiert.
    * Eine einfache Probe global&lt; addAttributes &gt; ist:
        ```
        <addAttributes> 
          <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>
          <att name="infoUrl">https://coastwatch.pfeg.noaa.gov/infog/PH\\_ssta\\_las.html</att>
          <att name="institution">NOAA CoastWatch, West Coast Node</att>
          <att name="title">SST, Pathfinder Ver 5.0, Day and Night, Global</att>
          <att name="cwhdf\\_version" />
        </addAttributes>  
        ```
Das leere cwhdf\\_version Attribut bewirkt das Quell-cwhdf\\_version Attribut (wenn) aus der letzten, kombinierten Liste der Attribute zu entfernen.
    * Die Bereitstellung dieser Informationen hilft ERDDAP™ tun Sie einen besseren Job und hilft Benutzern, die Datensätze zu verstehen.
Gute Metadaten machen einen Datensatz nutzbar.
Unzureichende Metadaten machen einen Datensatz nutzlos.
Bitte nehmen Sie die Zeit, einen guten Job mit Metadaten-Attributen zu tun.
##### Besondere globale Attribute in ERDDAP™ 
###### Anerkennung{#acknowledgement} 
*    [ **Anerkennung** ](#acknowledgement) und **Anerkennung**   (von [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandard) ist ein EMPFEHLEN Weg, um die Gruppe oder Gruppen, die Unterstützung (insbesondere Finanzen) für das Projekt, das diese Daten erstellt hat. Zum Beispiel
    ```
    <att name="acknowledgment">AVISO</att>
    ```    
Beachten Sie, dass ACDD 1.0 und 1.1 die Schreibweise "Hinweihung" verwendet (die übliche Schreibweise in den USA ist.) , aber ACDD 1.3 änderte dies in "Wissenschaft" (die übliche Schreibweise in der U.K.) . Mein Verständnis ist, dass die Veränderung im Wesentlichen ein Unfall war und dass sie sicherlich nicht die Auswirkungen der Veränderung erkannten. Was für ein Chaos&#33; Jetzt gibt es Millionen von Datendateien auf der ganzen Welt, die "Wissen" und Millionen haben "Wissenschaft". Dies unterstreicht die Torheit von "einfachen" Änderungen an einem Standard und betont die Notwendigkeit der Stabilität in Standards. Denn ACDD 1.3 (die Version von ACDD, dass ERDDAP™ Stützen) sagt "Gewissen", das ist, was ERDDAP™   (besonders GenerateDatasets Xml) fördert.
     
###### cdm\\_altitude\\_proxy{#cdm_altitude_proxy} 
*    [ **cdm\\_altitude\\_proxy** ](#cdm_altitude_proxy) ist nur für EDDTable-Datensätze, die keine Höhen- oder Tiefenvariable haben, aber eine Variable haben, die ein Proxy für Höhe oder Tiefe ist (zum Beispiel Druck, Sigma, bottleNumber) , Sie können dieses Attribut verwenden, um diese Variable zu identifizieren. Zum Beispiel
    ```
    <att name="cdm\\_altitude\\_proxy">pressure</att>  
    ```
Wenn [cdm\\_data\\_type](#cdm_data_type) ist Profil oder TrajectoryProfil und es gibt keine Höhen- oder Tiefenvariable, cdm\\_altitude\\_proxy MUST definiert werden. Wenn cdm\\_altitude\\_proxy definiert ist, ERDDAP™ die folgenden Metadaten der Variablen hinzufügen: \\_Koordinate AxisType=Höhe und Achse=Z.
     
###### cdm\\_data\\_type{#cdm_data_type} 
*    [ **cdm\\_data\\_type** ](#cdm_data_type)   (von [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandard) ist ein globales Attribut, das Unidata   [Gemeinsames Datenmodell](https://www.unidata.ucar.edu/software/netcdf-java/v4.6/CDM/index.html) Datentyp für den Datensatz. Zum Beispiel
    ```
    <att name="cdm\\_data\\_type">Point</att>  
    ```
Die CDM entwickelt sich weiter und kann sich wieder ändern. ERDDAP™ entspricht den damit verbundenen und detaillierteren [Diskrete Sampling Geometrien (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Kapitel des [CF 1.6](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) Metadatenkonventionen (zuvor die CF-Punkt-Beobachtungsübereinkommen genannt) .
    * Entweder der globale Datensatz [QuelleBeiträge](#global-attributes) oder seine globale&lt; addAttributes &gt; Fügen Sie das Attribute cdm\\_data\\_type ein. Ein paar Datensatztypen (wie EDDTable VonObis) wird dies automatisch einstellen.
    * Für EDDGrid datasets, die Optionen cdm\\_data\\_type sind Grid (der Standard und bei weitem der häufigste Typ für EDDGrid Datensätze) , MovingGrid, Other, Point, Profile, RadialSweep, TimeSeriesProfil, Swath, Trajectory und TrajectoryProfile. Derzeit, EDDGrid erfordert nicht, dass alle verwandten Metadaten angegeben werden, noch überprüft es, dass die Daten mit dem cdm\\_data\\_type übereinstimmen. Das wird sich in naher Zukunft wahrscheinlich ändern.
    * EDDTable verwendet cdm\\_data\\_type auf rigorose Weise, nach der DSG-Spezifikation von CF anstatt CDM, die aus irgendeinem Grund nicht aktualisiert wurde, um mit DSG konsistent zu sein. Wenn die Metadaten eines Datensatzes nicht mit der ERDDAP cdm\\_data\\_types Anforderungen (siehe unten) , der Datensatz wird nicht geladen und erzeugt eine [Fehlermeldung](#troubleshooting-tips) . (Das ist eine gute Sache, in dem Sinne, dass die Fehlermeldung Ihnen sagt, was falsch ist, damit Sie es beheben können.) Und wenn die Daten des Datensatzes nicht mit dem Metadaten-Setup des Datensatzes übereinstimmen (z.B. wenn in einem Zeitreihen-Datensatz mehr als ein Breitenwert für eine bestimmte Station vorliegt) , einige Anfragen an Daten werden in der Antwort falsche Daten zurückgeben. Stellen Sie sicher, dass Sie das alles richtig bekommen.
        
Für alle diese Datensätze, in den Konventionen und Metadata\\_Conventions Globale Attribute, siehe CF-1.6 (nicht CF-1.0, 1.1, 1.2, 1.3, 1.4 oder 1.5) , da CF-1.6 die erste Version ist, um die Änderungen in Bezug auf diskrete Probegeometrie (DSG) Konventionen.
        *   ** ERDDAP™ hat eine nicht einfache Beziehung zu CF DSG** 
        *    ERDDAP™ kann einen gültigen DSG-Datensatz aus einem Quelldatensatz machen, der bereits eine gültige DSG-Datei ist (S) , oder aus einem Quelldatensatz, der nicht für DSG eingerichtet ist, sondern über Änderungen an Metadaten erfolgen kann (Einige davon sind ERDDAP -spezifisch, um einen allgemeineren Ansatz zur Angabe des DSG-Setups bereitzustellen) .
        *    ERDDAP™ hat eine Menge Gültigkeitstests, wenn es einen Datensatz lädt. Wenn der Datensatz einen cdm\\_data\\_Typ hat (oder featureType ) Attribut erfolgreich geladen ERDDAP™ , dann ERDDAP™ sagt, der Datensatz erfüllt die DSG-Anforderungen (andernfalls ERDDAP™ wird eine Ausnahme werfen, die das erste Problem erklärt, dass es gefunden) .
WARNING: Ein erfolgreich geladener Datensatz scheint die DSG-Anforderungen zu erfüllen (es hat die richtige Kombination von Attributen) , aber kann immer noch falsch eingerichtet werden, was zu falschen Ergebnissen führt .nc CF und .nc CFMA Antwort Dateien. (Software ist auf irgendeine Weise intelligent und auffällig in anderen.) 
        * Wenn Sie die Metadaten des Datensatzes in ERDDAP™ , der DSG-Datensatz erscheint in ERDDAP Das interne Format (ein riesiger, datenbankähnlicher Tisch) . Es ist nicht in einem der DSG-Formate (z.B. sind die Dimensionen und Metadaten nicht richtig) , aber die zur Behandlung des Datensatzes als DSG-Datensatz erforderlichen Informationen sind in den Metadaten (z.B. cdm\\_data\\_type=TimeSeries und cdm\\_timeseries\\_variables= *aCsvListOfStationRelatedVarables* in den globalen Metadaten und cf\\_role=timeseries\\_id für einige Variablen) .
        * Wenn ein Benutzer eine Untermenge des Datensatzes in einem .nc CF (eine .nc Datei im DSG's Contiguous Ragged Array Datei Format) oder .nc CFMA Datei (eine .nc Datei im Format der Datei DSG's Multidimensional Array) , diese Datei wird eine gültige CF DSG-Datei sein.
WARNING: Wenn der Datensatz jedoch falsch eingerichtet wurde (so dass die Versprechen der Metadaten nicht wahr sind) , dann wird die Antwortdatei technisch gültig sein, aber in gewisser Weise falsch sein.
             
###### EDDTable cdm_data_types
* Für EDDTable-Datensätze, die Optionen cdm\\_data\\_type (und damit verbundene Anforderungen in ERDDAP ) werden
###### Punkt{#point} 
*    [Punkt](#point) -- ist für eine Reihe von Messungen zu unbezogenen Zeiten und Orten.
    * Wie bei allen anderen cdm\\_data\\_types haben Point-Datensätze nur Längen-, Breiten- und Zeitvariablen.
###### Profil{#profile} 
*    [Profil](#profile) -- ist eine Reihe von Messungen, die alle zu einem Zeitpunkt, an einer Breitenlänge, aber in mehr als einer Tiefe (oder Höhe) . Der Datensatz kann eine Sammlung dieser Profile sein, beispielsweise 7 Profile von verschiedenen Standorten. Dieser cdm\\_data\\_type bedeutet keine logische Verbindung zwischen einem der Profile.
    
* Eine der Variablen (zum Beispiel Profil\\_number) MUST hat das variable Attribut cf\\_role=profile\\_id, um die Variable zu identifizieren, die die Profile eindeutig identifiziert.
    ```
    <att name="cf\\_role">profile\\_id</att>  
    ```
Wenn keine andere Variable geeignet ist, sollten Sie die Zeitvariable verwenden.
###### cdm\\_profile\\_variables{#cdm_profile_variables} 
* Der Datensatz MUST umfasst den globalen Beitrag [cdm\\_profile\\_variables](#cdm_profile_variables) , wobei der Wert eine komma-separierte Liste der Variablen ist, die die Information über jedes Profil haben. Für ein vorgegebenes Profil sind die Werte dieser Größen MUST konstant. Zum Beispiel
    ```
    <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
    ```
Die Liste MUST enthält die cf\\_role=profile\\_id-Variable und alle anderen Variablen mit Informationen über das Profil und Zeit, Breite und Länge.
Die Liste enthält niemals Höhen-, Tiefen- oder Beobachtungsvariablen.
     

 \\[ Meinung: cdm\\_data\\_type=Profil sollte selten verwendet werden. In der Praxis ist ein vorgegebener Datensatz in der Regel entweder ein TimeSeriesProfil (Profile in fester Position) oder ein Trajektorienprofil (Profile entlang einer Trajektorie) , und so sollte richtig als solche identifiziert werden. \\]   
###### Zeitreihen{#timeseries} 
*    [Zeitreihen](#timeseries) -- eine Abfolge von Messungen (z.B. Meerwassertemperatur) ein, fest, Breite, Länge, Tiefe (oder Höhe) Standort. (Denken Sie daran als "Station".) Der Datensatz kann eine Sammlung dieser TimeSeries sein, beispielsweise eine Sequenz aus jedem von 3 verschiedenen Standorten.
    * Eine der Variablen (z.B. Station\\_id) MUST haben das variable Attribut cf\\_role=timeseries\\_id, um die Variable zu identifizieren, die die Stationen eindeutig identifiziert.
        ```
        <att name="cf\\_role">timeseries\\_id</att>
        ```
###### cdm\\_timeseries\\_variables{#cdm_timeseries_variables} 
* Der Datensatz MUST umfasst den globalen Beitrag [cdm\\_timeseries\\_variables](#cdm_timeseries_variables) , wobei der Wert eine komma getrennte Liste der Variablen ist, die die Informationen über jede Station haben. Für eine bestimmte Station sind die Werte dieser Größen MUST konstant. Zum Beispiel
    ```
    <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
    ```
Die Liste MUST enthält die Variable cf\\_role=timeseries\\_id und alle anderen Variablen mit Informationen über die Station, die fast immer Breite und Länge umfasst (und Höhe oder Tiefe, wenn vorhanden) .
Die Liste enthält niemals Zeit oder Beobachtungsvariablen.
* Für einige moored buoys kann ein Datensatz zwei Sätze von Breiten- und Längenvariablen haben:
    1. Ein Paar Breiten- und Längenwerte, die konstant sind (d.h. die feste Lage der Verankerung) . In ERDDAP™ , geben diese Variablen destinationName s von Breite und Länge, und beinhalten diese Variablen in der Liste der cdm\\_timeseries\\_variables.
    2. Präzise Breiten- und Längenwerte, die jeder Beobachtung zugeordnet sind. In ERDDAP™ , geben diese Variablen unterschiedlich destinationName S (z.B., präzise und präzise Kredit) und enthalten diese Variablen nicht in die Liste der cdm\\_timeseries\\_variables.
Der Grund hierfür ist: aus theoretischer Perspektive, für einen Datensatz der DSG TimeSerie, die Breite und Länge (und Höhe oder Tiefe, wenn vorhanden) Standort der Station MUST konstant sein.
###### Zeitreihenprofil{#timeseriesprofile} 
*    [Zeitreihenprofil](#timeseriesprofile) -- ist für eine Abfolge von Profilen an einem festen, Breitenlängen-Standort. Jedes Profil ist eine Reihe von Messungen in mehreren Höhen oder Tiefen. Der Datensatz kann eine Sammlung dieser TimeSeriesProfile sein, z.B. eine Abfolge von Profilen an jedem von 12 verschiedenen Standorten.
    * Eine der Variablen (z.B. Station\\_id) MUST haben das variable Attribut cf\\_role=timeseries\\_id, um die Variable zu identifizieren, die die Stationen eindeutig identifiziert.
    ```
        <att name="cf\\_role">timeseries\\_id</att>
    ```
    * Eine der Variablen (zum Beispiel Profil\\_number) MUST hat das variable Attribut cf\\_role=profile\\_id, um die Variable zu identifizieren, die die Profile eindeutig identifiziert.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Ein gegebenes Profil\\_id muss nur für eine bestimmte Zeitreihe\\_id einzigartig sein.) Wenn keine andere Variable geeignet ist, sollten Sie die Zeitvariable verwenden.
    * Der Datensatz MUST umfasst die globalAttribute cdm\\_timeseries\\_variables, wobei der Wert eine komma-separierte Liste der Variablen ist, die die Informationen über jede Station haben. Für eine bestimmte Station sind die Werte dieser Größen MUST konstant. Zum Beispiel
        ```
        <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
        ```
Die Liste MUST enthält die Variable cf\\_role=timeseries\\_id und alle anderen Variablen mit Informationen über die Station, die fast immer Breite und Länge umfasst.
Die Liste enthält niemals Zeit, Höhe, Tiefe oder Beobachtungsvariablen.
    * Der Datensatz MUST umfasst das globaleAttribute cdm\\_profile\\_variables, wobei der Wert eine komma-separierte Liste der Variablen ist, die die Informationen über jedes Profil haben. Für ein vorgegebenes Profil sind die Werte dieser Größen MUST konstant. Zum Beispiel
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time</att>
        ```
Die Liste MUST enthält die Variable cf\\_role=profile\\_id und alle anderen Variablen mit Informationen über das Profil, die fast immer Zeit beinhalten.
Die Liste wird niemals Breite, Länge, Höhe, Tiefe oder Beobachtungsvariablen enthalten.
###### Trajektive{#trajectory} 
*    [Trajektive](#trajectory) -- eine Abfolge von Messungen entlang einer Trajektorie (einen Weg durch Raum und Zeit)   (z.B. Meer\\_Wasser\\_Temperatur von einem Schiff, während es durch das Wasser bewegt) . Der Datensatz kann eine Sammlung dieser Trajektorien sein, beispielsweise eine Sequenz aus jedem von 4 verschiedenen Schiffen.
    * Eine der Variablen (zum Beispiel, ship\\_id) MUST haben das Attribut cf\\_role=trajectory\\_id, um die Variable zu identifizieren, die die Trajektorien eindeutig identifiziert.
        ```  
        <att name="cf\\_role">trajectory\\_id</att>
        ```
###### cdm\\_trajectory\\_variables{#cdm_trajectory_variables} 
* Der Datensatz MUST umfasst den globalen Beitrag [cdm\\_trajectory\\_variables](#cdm_trajectory_variables) , wobei der Wert eine komma getrennte Liste der Variablen ist, die die Informationen über jede Trajektorie haben. Für eine gegebene Trajektorie sind die Werte dieser Variablen MUST konstant. Zum Beispiel
    ```
    <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
    ```
Die Liste MUST enthält die Variable cf\\_role=trajectory\\_id und alle anderen Variablen mit Informationen über die Trajektorie.
Die Liste enthält niemals Zeit, Breite, Länge oder Beobachtungsvariablen.
###### Trajektorienprofil{#trajectoryprofile} 
*    [Trajektorienprofil](#trajectoryprofile) -- ist eine Abfolge von Profilen entlang einer Trajektorie. Der Datensatz kann eine Sammlung dieser TrajectoryProfile sein, beispielsweise eine Abfolge von Profilen von 14 verschiedenen Schiffen.
    * Eine der Variablen (zum Beispiel, ship\\_id) MUST hat das variable Attribut cf\\_role=trajectory\\_id, um die Variable zu identifizieren, die die Trajektorien eindeutig identifiziert.
        ``` 
        <att name="cf\\_role">trajectory\\_id</att>
        ```
    * Eine der Variablen (zum Beispiel Profil\\_number) MUST hat das variable Attribut cf\\_role=profile\\_id, um die Variable zu identifizieren, die die Profile eindeutig identifiziert.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Ein gegebenes Profil\\_id muss nur für eine bestimmte Trajektorie\\_id einzigartig sein.) Wenn keine andere Variable geeignet ist, sollten Sie die Zeitvariable verwenden.
    * Der Datensatz MUST umfasst die globale Attribute cdm\\_trajectory\\_variables, wobei der Wert eine komma-separierte Liste der Variablen ist, die die Informationen über jede Trajektorie haben. Für eine gegebene Trajektorie sind die Werte dieser Variablen MUST konstant. Zum Beispiel
        ```
        <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
        ```
Die Liste MUST enthält die Variable cf\\_role=trajectory\\_id und alle anderen Variablen mit Informationen über die Trajektorie.
Die Liste enthält niemals profilbezogene Variablen, Zeit, Breite, Länge oder beliebige Beobachtungsvariablen.
    * Der Datensatz MUST umfasst das globaleAttribute cdm\\_profile\\_variables, wobei der Wert eine komma-separierte Liste der Variablen ist, die die Informationen über jedes Profil haben. Für ein vorgegebenes Profil sind die Werte dieser Größen MUST konstant. Zum Beispiel
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
        ```
Die Liste MUST enthält die Variable cf\\_role=profile\\_id und alle anderen Variablen mit Informationen über das Profil, die fast immer Zeit, Breite und Länge beinhalten.
Die Liste enthält niemals Höhen-, Tiefen- oder Beobachtungsvariablen.
###### Sonstige{#other} 
*    [Sonstige](#other) -- hat keine Anforderungen. Verwenden Sie es, wenn der Datensatz nicht eine der anderen Optionen passt, insbesondere, wenn der Datensatz keine Breiten-, Längen- und Zeitvariablen umfasst.
     
###### Ähnliche Hinweise{#related-notes} 
* Alle EDDTable-Datensätze mit einem anderen cdm\\_data\\_Typ als "Andere" haben Längen-, Breiten- und Zeitvariablen.
* Datensätze mit Profilen MUST haben eine Höhenvariable, eine Tiefenvariable oder eine [cdm\\_altitude\\_proxy](#cdm_altitude_proxy) variabel.
* Wenn Sie einen Datensatz nicht alle Anforderungen an den idealen cdm\\_data\\_type erfüllen können, verwenden Sie "Point" (mit wenigen Anforderungen) oder "Andere" (die keine Anforderungen haben) statt.
* Diese Informationen werden von ERDDAP™ auf verschiedene Weise, zum Beispiel, aber meist für die Herstellung .nc CF-Dateien ( .nc Dateien, die mit den Contiguous Ragged Array Representations im Zusammenhang mit dem cdm\\_data\\_type des Datensatzes übereinstimmen) und .nc CFMA Dateien ( .nc Dateien, die den Multidimensionalen Array-Vertretungen entsprechen, die mit dem cdm\\_data\\_type des Datensatzes verbunden sind) wie definiert [Diskrete Sampling Geometrien (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Kapitel des [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) Metadatenkonventionen, die zuvor "CF Point Observation Conventions" genannt wurden.
* Hinweis: Für diese Datensätze die richtige Einstellung für [ subsetVariables ](#subsetvariables) ist in der Regel die Kombination aller in den Attributen cdm\\_...\\_variables aufgelisteten Variablen. Zum Beispiel für TimeSeriesProfil verwenden Sie die cdm\\_timeseries\\_variables plus die cdm\\_profile\\_variables.
######  contributor\\_name  {#contributor_name} 
*    [ ** contributor\\_name ** ](#contributor_name)   (von [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandard) ist der EMPFEHL-Weg, eine Person, Organisation oder ein Projekt zu identifizieren, die zu diesem Datensatz beigetragen haben (zum Beispiel der ursprüngliche Schöpfer der Daten, bevor es vom Schöpfer dieses Datensatzes wiederaufgearbeitet wurde) . Zum Beispiel
    ```
        <att name="contributor\\_name">NOAA OceanWatch - Central Pacific</att>  
    ```
Wenn "Beitrager" sich nicht wirklich auf einen Datensatz bezieht, verlasse dieses Attribut. Im Vergleich zu [ creator\\_name ](#creator_name) , dies ist manchmal stärker auf die Finanzierungsquelle ausgerichtet.
######  contributor\\_role  {#contributor_role} 
*    [ ** contributor\\_role ** ](#contributor_role)   (von [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandard) ist der EMPFEHL Weg, um die Rolle zu identifizieren [ contributor\\_name ](#creator_name) . Zum Beispiel
    ```
        <att name="contributor\\_role">Source of Level 2b data</att>  
    ```
Wenn "Beitrager" sich nicht wirklich auf einen Datensatz bezieht, verlasse dieses Attribut.
###### Übereinkommen{#conventions} 
*    [ **Übereinkommen** ](#conventions)   (von [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) Metadatenstandard) ist STRONGLY EMPFEHL. (Es kann in der Zukunft REQUIRED sein.) Der Wert ist eine komma-separierte Liste von Metadatenstandards, die dieser Datensatz folgt. Zum Beispiel:
    ```
    <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
    ```
Die gemeinsamen Metadatenkonventionen, die in ERDDAP™ sind:
    
    *    [ COARDS Übereinkommen](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) ist die Vorstufe zu CF.
    *    [Klima und Prognose (CF) Übereinkommen](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) ist die Quelle von vielen der empfohlenen und erforderlichen Attribute in ERDDAP . Die aktuelle CF-Version wird als "CF-1.6" bezeichnet.
    * Die NetCDF Attribut Convention for Dataset Discovery (ANLAGE) ist die Quelle von vielen der empfohlenen und erforderlichen Attribute in ERDDAP . Die Originalversion von ACDD (ein brillantes Werk von Ethan Davis) , wurde als [ Unidata Datensatz Discovery v1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1) Der Strom (ab 2015) 1.3 Version von ACDD wird als [ACDD-1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) . Wenn Ihre Datensätze verwendet wurden Unidata Dataset Discovery v1.0, wir ermutigen Sie, [Schalten Sie Ihre Datensätze um ACDD-1.3 zu verwenden](#switch-to-acdd-13) .
    
Wenn Ihr Datensatz einem zusätzlichen Metadatenstandard folgt, fügen Sie bitte den Namen in die CSV-Liste im Attribute Conventions ein.
######  coverage\\_content\\_type  {#coverage_content_type} 
*    [ ** coverage\\_content\\_type ** ](#coverage_content_type)   (von [ISO 19115](https://en.wikipedia.org/wiki/Geospatial_metadata) Metadatenstandard) ist der RECOMMENDED Weg, die Art der netzgebundenen Daten zu identifizieren (in EDDGrid Datensätze) . Zum Beispiel
    ```
    <att name="coverage\\_content\\_type">modelResult</att>  
    ```
Die einzigen zulässigen Werte sind Hilfsinformationen, Bild, ModellErgebnis, physikalisch Messung (Standard, wenn ISO 19115 Metadaten generiert werden) , QualitätInformationen, Referenzinformationen und thematischeKlassifikation. (Verwenden Sie diesen Tag nicht für EDDTable-Datensätze.)   
######  creator\\_name  {#creator_name} 
*    [ ** creator\\_name ** ](#creator_name)   (von [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandard) ist der EMPFEHL Weg, die Person, Organisation oder Projekt zu identifizieren (wenn nicht eine bestimmte Person oder Organisation) , am meisten verantwortlich für die Schöpfung (oder die jüngste Wiederaufbereitung) dieser Daten. Zum Beispiel
    ```
    <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
    ```
Wurden die Daten weitgehend wiederverarbeitet (beispielsweise Satellitendaten von Ebene 2 bis Ebene 3 oder 4) , dann wird in der Regel der Reprozessor als Schöpfer aufgeführt und der ursprüngliche Schöpfer über [ contributor\\_name ](#contributor_name) . Im Vergleich zu [Projekt](#project) , dies ist flexibler, da es eine Person, eine Organisation oder ein Projekt identifizieren kann.
######  creator\\_email  {#creator_email} 
*    [ ** creator\\_email ** ](#creator_email)   (von [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandard) ist der EMPFEHLEN Weg, eine E-Mail-Adresse zu identifizieren (korrekt formatiert) die einen Weg bietet, den Schöpfer zu kontaktieren. Zum Beispiel
    ```
    <att name="creator\\_email">erd.data@noaa.gov</att>  
    ```
######  creator\\_url  {#creator_url} 
*    [ ** creator\\_url ** ](#creator_url)   (von [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandard) ist der ECOMMENDED Weg, eine URL für Organisation zu identifizieren, die den Datensatz erstellt hat, oder eine URL mit den Informationen des Schöpfers über diesen Datensatz (aber das ist mehr der Zweck [ infoUrl ](#infourl) ) . Zum Beispiel
    ```
    <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
    ```
######  date\\_created  {#date_created} 
*    [ ** date\\_created ** ](#date_created)   (von [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandard) ist der EMPFEHL-Weg, das Datum zu identifizieren, an dem die Daten zuerst erstellt wurden (beispielsweise zu dieser Form verarbeitet) , in ISO 8601 Format. Zum Beispiel
    ```
    <att name="date\\_created">2010-01-30</att>  
    ```
Wird dem Datensatz periodisch Daten hinzugefügt, so ist dies das erste Datum, an dem die ursprünglichen Daten zur Verfügung gestellt wurden.
######  date\\_modified  {#date_modified} 
*    [ ** date\\_modified ** ](#date_modified)   (von [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandard) ist die EMPFEHLUNG, um das Datum zu identifizieren, an dem die Daten zuletzt geändert wurden (zum Beispiel, wenn ein Fehler behoben wurde oder wenn die neuesten Daten hinzugefügt wurden) , in ISO 8601 Format. Zum Beispiel
    ```
    <att name="date\\_modified">2012-03-15</att>  
    ```
######  date\\_issued  {#date_issued} 
*    [ ** date\\_issued ** ](#date_issued)   (von [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandard) ist der ECOMMENDED Weg, das Datum zu identifizieren, an dem die Daten zunächst anderen zur Verfügung gestellt wurden, beispielsweise im ISO 8601 Format, 2012-03-15. Zum Beispiel
    ```
    <att name="date\\_issued">2010-07-30</att>  
    ```
Beispielsweise kann der Datensatz einen [ date\\_created ](#date_created) von 2010-01-30, aber wurde nur öffentlich zugänglich gemacht 2010-07-30. date\\_issued weniger häufig verwendet als date\\_created und date\\_modified . wenn date\\_issued wird weggelassen, es wird angenommen, dass gleich wie die date\\_created .
###### weltweit drawLandMask  {#global-drawlandmask} 
*    [ ** drawLandMask ** ](#global-drawlandmask) -- Dies ist ein OPTIONAL globales Attribut, das von ERDDAP™   (und keine Metadatenstandards) die den Standardwert für die Option "Draw Land Mask" auf dem Datensatz Make A Graph Formular angibt ( * datasetID * .graph) und für den &.land-Parameter in einer URL, die eine Karte der Daten anfordert. Zum Beispiel
    ```
    <att name="drawLandMask">over</att>  
    ```
Siehe [ drawLandMask Überblick](#drawlandmask) .
######  featureType  {#featuretype} 
*    [ ** featureType ** ](#featuretype)   (von [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) Metadatenstandard) ist IGNORED und/oder REPLACED. Wenn der Datensatz [cdm\\_data\\_type](#cdm_data_type) angemessen ist, ERDDAP™ wird es automatisch verwenden, um eine featureType Attribut. So gibt es keine Notwendigkeit, dass Sie es hinzufügen.
    
Allerdings, wenn Sie verwenden [EDDTableFromNcCFFiles](#eddtablefromnccffiles) einen Datensatz aus Dateien zu erstellen, die dem [CF Diskrete Sampling Geometrien (DSG) Standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) , die Dateien selbst müssen haben featureType richtig definiert, so dass ERDDAP™ kann die Dateien richtig lesen. Das ist Teil der CF DSG-Anforderungen für diese Art von Datei.
     
###### Geschichte{#history} 
*    [ **Geschichte** ](#history)   (von [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) und [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandards) ist ein ECOMMENDED Multi-Line String Global Attribut mit einer Zeile für jeden Verarbeitungsschritt, den die Daten durchlaufen haben. Zum Beispiel
    ```
    <att name="history">2011-08-05T08:55:02Z CMOR: Rewrote data to comply with CF standards.  
    2012-04-08T08:34:58Z CMOR: Converted 'height' type from 'd' to 'f'.</att>
    ```
    * Idealerweise hat jede Zeile eine ISO 8601:2004 (E) formatiert date+timeZ (zum Beispiel 2011-08-05T08:55:02Z) gefolgt von einer Beschreibung des Bearbeitungsschritts.
    *    ERDDAP™ schafft das, wenn es nicht schon existiert.
    * Wenn es bereits existiert, ERDDAP™ neue Informationen an die vorhandenen Informationen anhängen.
    * Die Geschichte ist wichtig, weil sie es Kunden ermöglicht, auf die ursprüngliche Quelle der Daten zurückzuverfolgen.
######  infoUrl  {#infourl} 
*    [ ** infoUrl ** ](#infourl) ist ein globales REQUIRED-Attribut mit der URL einer Webseite mit mehr Informationen über diesen Datensatz (in der Regel auf der Website des Quellinstituts) . Zum Beispiel
    ```
    <att name="infoUrl">http://www.globec.org/</att>
    ```
    * Entweder der globale Datensatz [QuelleBeiträge](#global-attributes) oder seine globale&lt; addAttributes &gt; Geben Sie dieses Attribut an.
    *    infoUrl ist wichtig, weil es den Kunden ermöglicht, mehr über die Daten aus der Originalquelle zu erfahren.
    *    ERDDAP™ einen Link zur infoUrl über das Datenzugriffsformular des Datensatzes ( * datasetID * .html) , Stellen Sie ein Diagramm Webseite ( * datasetID * .graph) , und andere Webseiten.
    * Wenn die URL ein Abfrageteil hat (nach dem "?") , es muss schon sein [Prozent kodiert](https://en.wikipedia.org/wiki/Percent-encoding) . Sie müssen spezielle Zeichen in den Zwängen kodieren (andere als die ersten „&“ und die wichtigsten '=' , wenn) in die Form %HH, wobei HH der zweistellige hexadezimale Wert des Zeichens ist. Normalerweise müssen Sie nur ein paar der Pünktlichkeitszeichen umwandeln: % in %25, & in %26, " in %22,&lt;in %3C, = in %3D, &gt; in %3E, + in %2B, | in %7C, \\[ in %5B, \\] in %5D, Raum in %20, und alle Zeichen über #127 in ihr UTF-8-Formular umwandeln und dann prozentual jeden Byte des UTF-8-Formulars in das %HH-Format kodieren (einen Programmierer um Hilfe bitten) .
Zum Beispiel, & stationID &gt;= 41004
und stationID %3E =%2241004%22
Die prozentuale Kodierung ist in der Regel erforderlich, wenn Sie auf ERDDAP über eine andere Software als einen Browser. Browser behandeln in der Regel prozentuale Kodierung für Sie.
In einigen Situationen müssen Sie Prozent kodieren alle Zeichen andere als A-Za-z0-9\\_-&#33;.~ ' () \\*, aber noch nicht codieren die anfängliche '&' oder die Haupt '=' .
Programmiersprachen haben dazu Werkzeuge (siehe z.B. Java ' [ java.net.URLEncoder ](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)   
und Java Script's [encodeURIComponent()&#33; (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) ) und es gibt
         [Webseiten, die prozentual encode/decode für Sie](https://www.url-encode-decode.com/) .
    * Seit datasets.xml ist eine XML-Datei, Sie müssen auch kodieren ALL '&', '&lt;', und '&gt;' in der URL als '&amp', '&lt;', und '&gt;' nach Prozent Codierung.
    *    infoUrl ist einzigartig ERDDAP . Es ist nicht von jedem Metadaten-Standard.
###### Institution{#institution} 
*    [ **Institution** ](#institution)   (von [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) und [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandards) ist ein globales REQUIRED-Attribut mit der kurzen Version des Namens der Institution, die die Quelle dieser Daten ist (in der Regel ein Akronym, in der Regel&lt;20 Zeichen). Zum Beispiel
    ```
    <att name="institution">NASA GSFC</att>
    ```
    * Entweder der globale Datensatz [QuelleBeiträge](#global-attributes) oder seine globale&lt; addAttributes &gt; Geben Sie dieses Attribut an.
    *    ERDDAP™ zeigt das Institut, wann immer es eine Liste von Datensätzen zeigt. Wenn der Name einer Institution hier länger als 20 Zeichen ist, werden in der Liste der Datensätze nur die ersten 20 Zeichen sichtbar. (aber die ganze Institution kann gesehen werden, indem der Maus-Cursor über das benachbarte "?"-Symbol) .
    * Wenn Sie Institution in die Liste der&lt; categoryAttributes &gt; in ERDDAP ' [Setup.xml](/docs/server-admin/deploy-install#setupxml) Datei, Benutzer können leicht finden Datensätze von derselben Institution über ERDDAP 's "Search for Datasets by Kategorie" auf der Homepage.
###### Schlüsselwörter{#keywords} 
*    [ **Schlüsselwörter** ](#keywords)   (von [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandard) ist eine EMPFEHLE-getrennte Liste von Wörtern und kurzen Phrasen (zum Beispiel, [GCMD Wissenschaft Schlüsselwörter](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Access) ) die den Datensatz allgemein beschreiben und keine anderen Kenntnisse des Datensatzes annehmen (zum Beispiel für ozeanographische Daten, umfassen Ozean) . Zum Beispiel
    ```
    <att name="keywords">ano, circulation, coastwatch, currents, derived, Earth Science &gt; Oceans &gt; Ocean Circulation &gt; Ocean Currents, eastward, eastward\\_sea\\_water\\_velocity, experimental, hf radio, meridional, noaa, northward, northward\\_sea\\_water\\_velocity, nuevo, ocean, oceans, radio, radio-derived, scan, sea, seawater, velocity, water, zonal</att>  
    ```
Seit datasets.xml ist ein XML-Dokument, die Zeichen &,&lt;, und &gt; in einem Attribut wie Keywords (z.B. die &gt; Zeichen in GCMD Science Keywords) muss als &amp; kodiert werden,&lt;, bzw. &gt;.
Wenn ein Datensatz geladen wird ERDDAP ,
    
    * "Earth Science &gt; " wird zum Beginn eines GCMD-Keywords hinzugefügt, das es nicht gibt.
    * GCMD Keywords werden in Titel Case umgewandelt (d.h., die ersten Buchstaben werden kapitalisiert) .
    * Die Schlüsselwörter werden in sortierte Reihenfolge umgeordnet und alle neuen Linienzeichen werden entfernt.
     
######  keywords\\_vocabulary  {#keywords_vocabulary} 
*    [ ** keywords\\_vocabulary ** ](#keywords_vocabulary)   (von [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandard) ist ein ECOMMENDED-Attribut: Wenn Sie eine Leitlinie für die Wörter/Freaks in Ihrem Keyword-Attribut verfolgen (zum Beispiel GCMD Science Keywords) , setzen Sie den Namen dieser Leitlinie hier. Zum Beispiel
    ```
    <att name="keywords\\_vocabulary">GCMD Science Keywords</att>  
    ```
###### Lizenz{#license} 
*    [ **Lizenz** ](#license)   (von [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandard) ist ein STRONGLY RECOMMENDED globales Attribut mit den Lizenz- und/oder Nutzungsbeschränkungen. Zum Beispiel
    ```
    <att name="license">\\[standard\\]</att>
    ```
    * Wenn " \\[ Standard \\] " tritt im Attributwert ein, es wird durch den Standard ersetzt ERDDAP™ Lizenz aus dem&lt;StandardLicense&gt; tag in ERDDAP '
         \\[ Tomcat \\] /webapps/erdap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml Datei.
         
######  Metadata\\_Conventions  {#metadata_conventions} 
*    [ ** Metadata\\_Conventions ** ](#metadata_conventions) aus dem veraltet [ACDD 1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)   (die in Metadata\\_Conventions " Unidata Datensatz Discovery v1.0") metadata standard. Der Attributwert war eine komma-separierte Liste von Metadatenkonventionen, die von diesem Datensatz verwendet wurden.
Wenn ein Datensatz ACDD 1.0 verwendet, ist dieses Attribut zum Beispiel STRONGLY RECOMMENDED.
    ```
    <att name="Metadata\\_Conventions">COARDS, CF-1.6, Unidata Dataset Discovery v1.0</att>  
    ```
Aber... ERDDAP™ jetzt empfiehlt ACDD-1.3. Wenn Sie [Ihre Datensätze umgeschaltet, um ACDD-1.3 zu verwenden](#switch-to-acdd-13) , Verwendung Metadata\\_Conventions ist STRONGLY DISCOURAGED: einfach verwenden [&lt;Übereinkommen &gt; (#conventions) statt.
######  processing\\_level  {#processing_level} 
*    [ ** processing\\_level ** ](#processing_level)   (von [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandard) ist eine Textbeschreibung der Verarbeitung (zum Beispiel, [NASA Satellitendatenverarbeitungsebenen](https://en.wikipedia.org/wiki/Remote_sensing#Data_processing_levels) , zum Beispiel Ebene 3) oder Qualitätskontrolle (zum Beispiel Science Quality) der Daten. Zum Beispiel
    ```
    <att name="processing\\_level">3</att>  
    ```
###### Projekt{#project} 
*    [ **Projekt** ](#project)   (von [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandard) ist ein OPTIONAL-Attribut, um das Projekt zu identifizieren, von dem der Datensatz gehört. Zum Beispiel
    ```
    <att name="project">GTSPP</att>  
    ```
Wenn der Datensatz nicht Teil eines Projekts ist, verwenden Sie dieses Attribut nicht. Im Vergleich zu [ creator\\_name ](#creator_name) , dies konzentriert sich auf das Projekt (keine Person oder Organisation, die an mehreren Projekten beteiligt sein kann) .
######  publisher\\_name  {#publisher_name} 
*    [ ** publisher\\_name ** ](#publisher_name)   (von [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandard) ist der EMPFEHL Weg, um die Person, Organisation oder Projekt zu identifizieren, die diesen Datensatz veröffentlicht. Zum Beispiel
    ```
    <att name="publisher\\_name">JPL</att>  
    ```
Zum Beispiel sind Sie der Herausgeber, wenn eine andere Person oder Gruppe [erstellt](#creator_name) der Datensatz und Sie werden es einfach über ERDDAP . Wenn "publisher" sich nicht wirklich auf einen Datensatz bezieht, verlasse dieses Attribut. Im Vergleich zu [ creator\\_name ](#creator_name) , der Verleger hat die Daten wahrscheinlich nicht wesentlich verändert oder neu verarbeitet; der Verleger stellt die Daten nur in einem neuen Ort zur Verfügung.
######  publisher\\_email  {#publisher_email} 
*    [ ** publisher\\_email ** ](#publisher_email)   (von [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandard) ist der EMPFEHLEN Weg, eine E-Mail-Adresse zu identifizieren (korrekt formatiert, zum Beispiel john\\_smith@great.org) die eine Möglichkeit bietet, den Verlag zu kontaktieren. Zum Beispiel
    ```
    <att name="publisher\\_email">john\\_smith@great.org</att>  
    ```
Wenn "publisher" sich nicht wirklich auf einen Datensatz bezieht, verlasse dieses Attribut.
######  publisher\\_url  {#publisher_url} 
*    [ ** publisher\\_url ** ](#publisher_url)   (von [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandard) ist der ECOMMENDED Weg, eine URL für die Organisation zu identifizieren, die den Datensatz veröffentlicht hat, oder eine URL mit den Informationen des Herausgebers über diesen Datensatz (aber das ist mehr der Zweck [ infoUrl ](#infourl) ) . Zum Beispiel
    ```
    <att name="publisher\\_url">https://podaac.jpl.nasa.gov</att>  
    ```
Wenn "publisher" sich nicht wirklich auf einen Datensatz bezieht, verlasse dieses Attribut.
######  real\\_time  {#real_time} 
*    [ ** real\\_time ** ](#real_time) ist ein globales String Attribut (nicht von Standard) angeben, ob dies ein Echtzeit-Datensatz ist. Zum Beispiel
    ```
    <att name="real\\_time">true</att>  
    ```
Wenn das falsch ist (Der Standard) , ERDDAP™ wird Antworten auf Anfragen für Dateitypen, in denen die gesamte Datei erstellt werden muss, bevor ERDDAP™ kann beginnen, die Antwort auf den Benutzer zu senden und sie für bis zu 15 Minuten wiederverwenden (z.B., .nc , .png) .
Wenn das stimmt, ERDDAP™ wird nie die Antwortdateien sperren und immer neu erstellte Dateien zurückgeben.
######  sourceUrl Eigenschaften{#sourceurl-attribute} 
*    [ ** sourceUrl ** ](#sourceurl-attribute) ist ein globales Attribut mit der URL der Quelle der Daten. Zum Beispiel
    ```
    <att name="sourceUrl">https://opendap.co-ops.nos.noaa.gov/ioos-dif-sos/SOS</att>  
    ```
     (aber alles auf eine Linie setzen) 
    *    ERDDAP™ erstellt dieses globale Attribut in der Regel automatisch. Zwei Ausnahmen sind EDDTableFrom Hyrax Dateien und EDDTableFromThreddsFiles.
    * Wenn die Quelle lokale Dateien und die Dateien von Ihrer Organisation erstellt wurden, verwenden Sie
    ```
        <att name="sourceUrl">(local files)</att>
    ```
    * Wenn die Quelle lokale Datenbank ist und die Daten von Ihrer Organisation erstellt wurden, verwenden Sie
    ```
        <att name="sourceUrl">(local database)</att>
    ```
    *    sourceUrl ist wichtig, weil es den Kunden ermöglicht, auf die ursprüngliche Quelle der Daten zurückzuverfolgen.
    *    sourceUrl ist einzigartig ERDDAP . Es ist nicht von jedem Metadaten-Standard.
        
######  standard\\_name\\_vocabulary  {#standard_name_vocabulary} 
*    [ ** standard\\_name\\_vocabulary ** ](#standard_name_vocabulary)   (von [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandard) ist ein RECOMMENDED-Attribut, um den Namen des kontrollierten Vokabulars zu identifizieren, aus dem die Variable [ standard\\_name ](#standard_name) werden genommen. Zum Beispiel
    ```
    <att name="standard\\_name\\_vocabulary">CF Standard Name Table v77</att>  
    ```
für die Version 77 der [CF Standard-Namenstabelle](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) .
         
#####  subsetVariables  {#subsetvariables} 
*    ** subsetVariables **   (nur für EDDTable-Datensätze) ist ein globales EMPFEHL-Attribut, mit dem Sie eine komma getrennte Liste von [&lt; dataVariable &gt; (#datavariable)   [ destinationName ](#destinationname) s zur Identifizierung von Variablen, die eine begrenzte Anzahl von Werten aufweisen (anders angegeben: Variablen, für die jeder der Werte viele Duplikate aufweist) . Zum Beispiel
    ```
        <att name="subsetVariables">station\\_id, longitude, latitude</att>  
    ```
Ist dieses Attribut vorhanden, wird der Datensatz einen * datasetID * .subset Webseite (und einen Link zu ihm auf jeder Datensatzliste) die Benutzer schnell und einfach verschiedene Teilmengen der Daten auswählen lässt.
    * Jedes Mal, wenn ein Datensatz geladen wird, ERDDAP lädt und speichert auf der Festplatte eine Tabelle mit allen verschiedenen () Kombinationen der Untermenge Variables Variables Werte. ERDDAP™ kann lesen, dass subsetVariables Tisch und Prozess es sehr schnell (insbesondere im Vergleich zum Lesen von vielen Datendateien oder zum Erhalt von Daten aus einer Datenbank oder einem anderen externen Service) .
    * Das erlaubt ERDDAP™ 3 Dinge zu tun:
        1. Es erlaubt ERDDAP™ eine Liste möglicher Werte in einer Dropdown-Liste auf dem Data Access Formular, Machen Sie eine Graph-Webseite und .subset-Webseiten.
        2. Es erlaubt ERDDAP™ eine .subset Webseite für diesen Datensatz anbieten. Diese Seite ist interessant, weil sie es leicht macht, gültige Kombinationen der Werte dieser Variablen zu finden, die für einige Datensätze und einige Variablen sehr, sehr hart ist (fast unmöglich) . Dann alle Benutzerwünsche für unterschiedliche () Unterkategorie Variable Daten werden sehr schnell sein.
        3. Wenn eine Benutzeranforderung vorliegt, die sich nur auf eine Teilmenge dieser Variablen bezieht, ERDDAP™ kann schnell lesen subsetVariables und auf die Anfrage antworten. Das kann eine Tonne Zeit und Mühe für ERDDAP .
    * Die Reihenfolge der destinationName Sie bestimmen die Sortierreihenfolge auf der * datasetID * .subset Webseite, so werden Sie in der Regel die wichtigsten Variablen zuerst, dann die wenigsten wichtig. Zum Beispiel für Datensätze mit Zeitreihendaten für mehrere Stationen, können Sie zum Beispiel verwenden
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
so dass die Werte nach Station\\_id sortiert werden.
    * Natürlich ist es Ihre Wahl, welche Variablen in die subsetVariables Liste, aber die vorgeschlagene Nutzung ist:
        
Im Allgemeinen enthalten Variablen, für die Sie möchten ERDDAP™ eine Dropdown-Liste der Optionen auf dem Data Access Formular des Datensatzes anzeigen (.html) und Make-A-Graph (.graph) Webseiten.
        
Im Allgemeinen umfassen Variablen mit Informationen über die Funktionen des Datensatzes (die Stationen, Profile und/oder Trajektorien, insbesondere von [cdm\\_timeseries\\_variables](#cdm_timeseries_variables) , [cdm\\_profile\\_variables](#cdm_profile_variables) , [cdm\\_trajectory\\_variables](#cdm_trajectory_variables) ) . Für diese Variablen gibt es nur einige verschiedene Werte, so dass sie mit Dropdown-Listen gut funktionieren.
        
Fügen Sie niemals Datenvariablen ein, die mit einzelnen Beobachtungen verknüpft sind (z.B. Zeit, Temperatur, Salinität, Stromgeschwindigkeit) in der subsetVariables Liste. Es gibt zu viele verschiedene Werte für diese Variablen, so dass eine Dropdown-Liste langsam zu laden und schwer zu arbeiten mit (oder nicht arbeiten) .
        
    * Wenn die Anzahl der verschiedenen Kombinationen dieser Variablen größer als 1.000.000 ist, sollten Sie die Einschränkung der subsetVariables dass Sie angeben, die Anzahl der verschiedenen Kombinationen auf unter 1.000.000 zu reduzieren; andernfalls * datasetID * .subset-Webseiten können langsam erzeugt werden. In Extremfällen darf der Datensatz nicht in ERDDAP™ weil die Erstellung der Liste der verschiedenen Kombinationen zu viel Speicher verwendet. Wenn ja, Sie müssen einige Variablen aus dem subsetVariables Liste.
    * Wenn die Anzahl der einzelnen Werte einer Subsetvariable größer als etwa 20.000 ist, sollten Sie beachten, dass diese Variable nicht in der Liste enthalten ist. subsetVariables ; andernfalls dauert es lange, die * datasetID * .subset, * datasetID * .graph, und * datasetID * .html Webseiten. Auch, auf einem Mac, ist es sehr schwer, Auswahlen aus einer Dropdown-Liste mit mehr als 500 Artikel wegen des Fehlens einer Scroll-Bar zu machen. Ein Kompromiss ist: Entfernen Sie Variablen aus der Liste, wenn Benutzer nicht wahrscheinlich Werte aus einer Dropdown-Liste auswählen.
    * Sie sollten jeden Datensatz testen, um zu sehen, ob subsetVariables Die Einstellung ist okay. Wenn der Quelldatenserver langsam ist und es zu lange dauert (oder scheitert) um die Daten herunterzuladen, entweder die Anzahl der angegebenen Variablen zu reduzieren oder die subsetVariables Globales Attribut.
    * Teil Variablen sind sehr nützlich. Wenn Ihr Datensatz geeignet ist, erstellen Sie bitte ein subsetVariables Attribut.
    * EDDTableFrom SOS automatisch hinzugefügt
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
wenn der Datensatz erstellt wird.
        * Mögliche Warnung: wenn ein Benutzer die * datasetID * .subset-Webseite wählt einen Wert aus, der einen SchlittenReturn oder einen neuen Liniencharakter aufweist, * datasetID * .subset wird scheitern. ERDDAP™ kann wegen einiger HTML-Details nicht um dieses Problem herum arbeiten. In jedem Fall ist es fast immer eine gute Idee, den SchlittenReturn und neue Linienzeichen aus den Daten zu entfernen. Um Ihnen zu helfen, das Problem zu beheben, wenn das EDDTable. subsetVariables DataTable Methode in ERDDAP erkennt Datenwerte, die Probleme verursachen, es wird eine Warnung per E-Mail mit einer Liste von Abwärtswerten an die E-Mail senden Alles Um E-Mail-Adressen in setup.xml angegeben. Auf diese Weise wissen Sie, was repariert werden muss.
        *    **Vorgenerierte Teiltabellen.** Normalerweise, wenn ERDDAP™ lädt einen Datensatz, er fordert die einzelnen () Subset-Variablen-Datentabelle aus der Datenquelle, nur über eine normale Datenanforderung. In einigen Fällen sind diese Daten nicht aus der Datenquelle verfügbar oder das Abrufen aus der Datenquelle kann auf dem Datenquellenserver hart sein. Wenn ja, können Sie eine Tabelle mit den Informationen in einer .json oder .csv-Datei mit dem Namen *Tomcat* /Fortsetzung/Erdrosselung/Untermenge/ * datasetID *  .json   (oder .csv) . Wenn vorhanden, ERDDAP™ wird es einmal lesen, wenn der Datensatz geladen wird und es als Quelle der Teildaten verwendet.
            * Wenn beim Lesen ein Fehler vorliegt, wird der Datensatz nicht geladen.
            * Es muss genau dieselben Spaltennamen haben (beispielsweise den gleichen Fall) wie&lt; subsetVariables &gt;, aber die Spalten sind in jeder Reihenfolge.
            * Es gibt zusätzliche Spalten (sie werden entfernt und neu redundante Zeilen entfernt werden) .
            * Fehlende Werte sollten fehlende Werte sein (nicht gefälschte Zahlen wie -99) .
            *    .json Dateien können etwas schwieriger zu erstellen, aber mit Unicode Zeichen gut umgehen. .json Dateien sind einfach zu erstellen, wenn Sie sie mit ERDDAP .
            * .csv-Dateien sind einfach zu bearbeiten, aber nur für ISO 8859-1 Zeichen geeignet. .csv-Dateien haben nur Spaltennamen in der ersten Zeile und Daten in nachfolgenden Zeilen.
        * Für große Datensätze oder wenn&lt; subsetVariables &gt; ist falsch konfiguriert, die Tabelle der Kombinationen von Werten kann groß genug sein, um zu viel Daten oder OutOfMemory Fehler zu verursachen. Die Lösung besteht darin, Variablen aus der Liste zu entfernen&lt; subsetVariables &gt; für die eine große Anzahl von Werten vorliegt oder Variablen nach Bedarf entfernt werden, bis die Größe dieser Tabelle angemessen ist. Unabhängig von dem Fehler, die Teile ERDDAP™ dass die subsetVariables System funktioniert nicht gut (z.B. Webseiten laden sehr langsam) wenn es zu viele Zeilen gibt (z.B. mehr als eine Million) in der Tabelle.
        *    subsetVariables hat nichts mit der Angabe zu tun, welche Variablen Benutzer in Zwängen verwenden können, d.h. wie Benutzer Subsets des Datensatzes anfordern können. ERDDAP™ immer erlaubt Zwänge, sich auf eine der Variablen zu beziehen.
###### Zeiteinheiten{#time-units} 
 [Zeit und Zeitstempel](#time-units) Spalten sollten ISO 8601:2004 haben (E) Formatiert Datum+Zeit Z-Strings (zum Beispiel 1985-01-31T15:31:00Z) .
             
###### Zusammenfassung{#summary} 
*    [ **Zusammenfassung** ](#summary)   (von [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) und [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandards) ist ein REQUIRED globales Attribut mit einer langen Beschreibung des Datensatzes (in der Regel&lt;500 Zeichen). Zum Beispiel
    ```
    <att name="summary">VIIRSN Level-3 Standard Mapped Image, Global, 4km, Chlorophyll a, Daily. The Visible and Infrared Imager/Radiometer Suite (VIIRS) is a multi-disciplinary instrument that flies on the National Polar-orbiting Operational Environmental Satellite System (NPOESS) series of spacecraft, including the NPOESS Preparatory Project (NPP).</att>
    ```
    * Entweder der globale Datensatz [QuelleBeiträge](#global-attributes) oder seine globale&lt; addAttributes &gt; Geben Sie dieses Attribut an.
    * Zusammenfassung ist sehr wichtig, weil es den Kunden ermöglicht, eine Beschreibung des Datensatzes zu lesen, der mehr Informationen als den Titel hat und somit schnell verstehen kann, was der Datensatz ist.
    * Hinweis: Bitte schreiben Sie die Zusammenfassung, so dass es funktionieren würde, den Datensatz zu einer zufälligen Person zu beschreiben, die Sie auf der Straße oder einem Kollegen treffen. Denken Sie daran, die [Fünf W und ein H](https://en.wikipedia.org/wiki/Five_Ws) : Wer hat den Datensatz erstellt? Welche Informationen wurden gesammelt? Wann wurden die Daten erhoben? Wo wurde sie gesammelt? Warum wurde es gesammelt? Wie wurde es gesammelt?
    *    ERDDAP™ die Zusammenfassung des Data Access Formulars des Datensatzes anzeigen ( * datasetID * .html) , Stellen Sie ein Diagramm Webseite ( * datasetID * .graph) , und andere Webseiten. ERDDAP™ verwendet die Zusammenfassung bei der Erstellung von FGDC- und ISO 19115-Dokumenten.
######  testOutOfDate  {#testoutofdate} 
*    [ ** testOutOfDate ** ](#testoutofdate)   (ein optionales ERDDAP -spezifisches globales Metadatenattribut, nicht von Standard) simplistisch spezifiziert, wenn die Daten für einen zeitnahen Datensatz als aktuell betrachtet werden, als now-  *nUnits* z.B. now- 2days für Daten, die normalerweise 24-48 Stunden nach dem Zeitwert erscheinen. Für Prognosedaten verwenden Sie jetzt **+**  *nUnits* , zum Beispiel, jetzt + 6days für Prognosedaten, die höchstens 8 Tage in der Zukunft. (Siehe [ now-  *nUnits* Syntax Beschreibung](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) .) Ist der maximale Zeitwert für den Datensatz jünger als der angegebene Zeitpunkt, wird der Datensatz als aktuell betrachtet. Ist der maximale Zeitwert älter als die angegebene Zeit, wird der Datensatz als aktuell betrachtet. Für aktuelle Datensätze gibt es vermutlich ein Problem mit der Datenquelle, also ERDDAP™ ist nicht in der Lage, Daten von neueren Zeitpunkten zuzugreifen.
    
Die testOutOfDate Wert als Spalte in der [ allDatasets Datensatz](#eddtablefromalldatasets) in deiner ERDDAP . Es wird auch verwendet, um den outOfDate Index zu berechnen, der eine andere Spalte in der allDatasets Datensatz.
Wenn der Index&lt;1 wird der Datensatz als aktuell betrachtet.
Wenn der Index&lt;=1, der Datensatz gilt als aktuell.
Wenn der Index&lt;=2, der Datensatz gilt als sehr aktuell.
    
Die testOutOfDate wird auch von ERDDAP™ um diehttps://*yourDomain*/erddap/outOfDateDatasets.htmlSeite ( [Beispiel](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) ) die die Datensätze, die&lt; testOutOfDate &gt; tags, mit den Datensätzen rangiert, wie aktuell sie sind. Wenn Sie den Dateityp ändern (von .html bis .csv, .jsonlCSV , .nc , .tsv ...) , Sie können diese Informationen in verschiedenen Dateiformaten erhalten.
    
Wenn möglich, [GenerateDatasetsXml](#generatedatasetsxml) eine testOutOfDate Attribut der globalen addAttributes eines Datensatzes. Dieser Wert ist ein Vorschlag basierend auf den verfügbaren Informationen zu GenerateDatasetsXml. Wenn der Wert nicht angemessen ist, ändern Sie ihn.
    
"Out-of-date" hier unterscheidet sich sehr von [&lt;Nachladen AllNMinutes&gt;] (#reloadeverynminutes) , die sich mit der aktuellen ERDDAP 's Wissen über den Datensatz ist. Die&lt; testOutOfDate &gt; System geht davon aus, dass ERDDAP Die Kenntnis des Datensatzes ist aktuell. Die Frage&lt; testOutOfDate &gt; behandelt ist: scheint etwas falsch mit der Quelle der Daten zu sein, wodurch neuere Daten nicht zugänglich sind ERDDAP ?
    
###### Titel{#title} 
*    [ **Titel** ](#title)   (von [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) und [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandards) ist ein globales Attribut REQUIRED mit der kurzen Beschreibung des Datensatzes (in der Regel&lt;= 95 Zeichen). Zum Beispiel
    ```
    <att name="title">VIIRSN Level-3 Mapped, Global, 4km, Chlorophyll a, Daily</att>
    ```
    * Entweder der globale Datensatz [QuelleBeiträge](#global-attributes) oder seine globale&lt; addAttributes &gt; Geben Sie dieses Attribut an.
    * Titel ist wichtig, weil jede Liste von Datensätzen, die von ERDDAP   (andere als Suchergebnisse) listet die Datensätze in alphabetischer Reihenfolge auf, nach Titel. Wenn Sie also die Reihenfolge der Datensätze festlegen möchten oder einige Datensätze zusammen gruppiert haben, müssen Sie damit Titel erstellen. Viele Listen von Datensätzen (z.B. als Antwort auf eine Kategoriesuche) , eine Untermenge der vollständigen Liste und in einer anderen Reihenfolge anzeigen. So sollte der Titel für jeden Datensatz allein stehen.
    * Wenn der Titel das Wort "DEPRECATED" enthält (alle Großbuchstaben) , dann wird der Datensatz ein niedrigeres Ranking in Suchanfragen erhalten.
             
##### &lt; axisVariable &gt;{#axisvariable} 
* ( ** &lt; axisVariable &gt; ** &#33; (#axisvariabel) wird verwendet, um eine Dimension zu beschreiben (auch "Achse" genannt) .
Für EDDGrid Datensätze, ein oder mehrere axisVariable tags ist REQUIRED, und alle [ dataVariable S](#datavariable) immer alle Achsengrößen teilen/verwenden. ( [Warum?](#why-just-two-basic-data-structures)   [Und wenn sie es nicht tun?](#dimensions) )   
Für jede Dimension der Datenvariablen muss eine Achsgröße vorhanden sein.
Axis-Variablen MUST werden in der Reihenfolge angegeben, in der die Datenvariablen sie verwenden.
(EDDTable-Datensätze können NICHT verwendet werden&lt; axisVariable &gt; tags.)
Ein fleischiges Beispiel ist:

>&nbsp;&nbsp;&lt;axisVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>MT&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>time&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">days since 1902-01-01T12:00:00Z&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/axisVariable>  

&lt; axisVariable &gt; unterstützt die folgenden Subtags:
###### &lt; sourceName \\ &gt;{#sourcename} 
* (&lt; sourceName &lt; &gt; (#sourcename) -- der Name der Datenquelle für die Variable. Das ist der Name. ERDDAP™ wird bei der Anforderung von Daten aus der Datenquelle verwendet. Das ist der Name. ERDDAP™ sucht nach, wann Daten aus der Datenquelle zurückgegeben werden. Das ist ein Fall. Das ist REQUIRED.
###### &lt; destinationName \\ &gt;{#destinationname} 
* (&lt; destinationName &lt; &gt; (#destinationname) ist der Name für die Variable, die angezeigt und verwendet wird ERDDAP™ Benutzer.
    * Das ist OPTIONAL. Wenn nicht, die sourceName wird verwendet.
    * Dies ist nützlich, weil es Ihnen erlaubt, eine kryptische oder ungerade zu ändern sourceName .
    *    destinationName ist Case sensitive.
    *    destinationName s Beginnen Sie mit einem Buchstaben (A-Z, a-z) gefolgt von 0 oder mehr Zeichen (A-Z, a-z, 0-9 und \\_) . ('-' wurde vorher erlaubt ERDDAP™ Artikel 1.10.) Diese Beschränkung erlaubt es, die Achsenvariablennamen in ERDDAP™ , in den Antwortdateien und in der gesamten Software, in der diese Dateien verwendet werden, einschließlich Programmiersprachen (wie Python , Matlab , und Java Script) wo es ähnliche Einschränkungen bei variablen Namen gibt.
    * In EDDGrid Datensätze, [Länge, Breite, Höhe, Tiefe und Zeit](#destinationname) Achsgrößen sind besonders.
         
######  axisVariable  &lt;addAttributes&gt; {#axisvariable-addattributes} 
* (&lt; addAttributes &gt; (#variable-addattributes) definiert einen OPTIONAL-Set von Attributen ( *Name* = *Wert* ) die den Attributen der Quelle für eine Variable hinzugefügt werden, um die kombinierten Attribute für eine Variable zu machen.
Wenn die Variable [QuelleBeiträge](#variable-addattributes) oder&lt; addAttributes &gt; einschließlich [ scale\\_factor und/oder add\\_offset ](#scale_factor) Attribute, ihre Werte werden verwendet, um die Daten aus der Quelle vor der Verteilung auf den Client zu entpacken
     (Ergebnis Wert = Quelle Werte scale\\_factor + add\\_offset ) . Die ausgepackte Variable wird vom gleichen Datentyp sein (z.B. Schwimmer) als scale\\_factor und add\\_offset Werte.
         
##### &lt; dataVariable &gt;{#datavariable} 
* ( ** &lt; dataVariable &gt; ** &#33; (#datavariable) ist ein REQUIRED (für fast alle Datensätze) tag innerhalb der&lt;dataset&gt; tag, mit dem eine Datengröße beschrieben wird. Es gibt nur 1 oder mehrere Instanzen dieses Tags. Ein ausgefleischtes Beispiel ist:

>&nbsp;&nbsp;&lt;dataVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>waterTemperature&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>sea\\_water\\_temperature&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataType>](#datatype)float&lt;/dataType>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Water Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[standard\\_name](#standard_name)">sea\\_water\\_temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/dataVariable>  

&lt; dataVariable &gt; unterstützt die folgenden Subtags:
###### &lt; sourceName &gt;{#sourcename-1} 
* (&lt; sourceName &gt; (#sourcename) -- der Name der Datenquelle für die Variable. Das ist der Name. ERDDAP™ wird bei der Anforderung von Daten aus der Datenquelle verwendet. Das ist der Name. ERDDAP™ sucht nach, wann Daten aus der Datenquelle zurückgegeben werden. Das ist ein Fall. Das ist REQUIRED.
###### Gruppen{#groups} 
CF unterstützte Gruppen mit CF v1.8. Beginnend in ~2020, NetCDF Werkzeuge unterstützen das Einsetzen von Variablen in Gruppen .nc Datei. In der Praxis bedeutet dies nur, dass die Variablen einen langen Namen haben, der die Gruppe identifiziert (S) und der variable Name, z.B. group1a/group2c/varName ). ERDDAP™ unterstützt Gruppen durch Umwandlung der "/" in der Variablen&lt; sourceName &gt; in "\\_"'s in der Variablen&lt; destinationName &gt; zum Beispiel group1a\\_group2c\\_varName . (Wenn Sie das sehen, sollten Sie erkennen, dass Gruppen nicht viel mehr als eine Syntax-Konvention sind.) Wenn die Variablen aufgelistet sind ERDDAP™ , alle Variablen in einer Gruppe werden zusammen erscheinen und die zugrunde liegende Gruppe nachahmen. \\[ wenn ERDDAP™ , insbesondere GenerateDatasets Xml, nicht so gut wie möglich mit Quelldateien, die Gruppen haben, bitte E-Mail eine Musterdatei an Chris. John bei noaa.gov. \\] 

EDDTableFromFiles-Datensätze können einige speziell kodierte Pseudo- sourceName s zur Definition neuer Datenvariablen, z.B. zur Förderung eines globalen Attributs als Datenvariable. Vgl. [Diese Dokumentation](#pseudo-sourcenames) .
######  HDF Strukturen{#hdf-structures} 
Beginnen mit ERDDAP™ V2.12, EDDGrid VonNcFiles und EDDGrid Von NcFiles Entpackt können Daten von "Strukturen" in .nc 4 und .hdf 4 Dateien. Um eine Variable zu identifizieren, die von einer Struktur stammt,&lt; sourceName &gt; muss das Format verwenden: *Vollständiger StructureName*  |  *MitgliedName* , zum Beispiel group1/myStruct | myMember .

###### Quellnamen für feste Werte{#fixed-value-sourcenames} 
In einem EDDTable-Datensatz, wenn Sie eine Variable erstellen möchten (mit einem einzigen, festen Wert) Das ist nicht im Quelldatensatz, verwenden Sie:
```
    <sourceName>=*fixedValue*</sourceName>  
```
Das erste Gleichzeichen sagt ERDDAP™ dass Wert wird folgen.

* Bei numerischen Größen muss der Festwert ein einziger endlicher Wert oder NaN sein. (Fall unempfindlich, z.B. \\=NaN) .
* Bei String-Variablen muss der Festwert eins sein, [JSON-Stil String](https://www.json.org/json-en.html)   (mit speziellen Zeichen entkommen mit \\ Zeichen) , z.B. \\="Meine \\"Special\\" String" .
* Geben Sie für eine Zeitstempelvariable den festen Wert als Zahl in "seconds since 1970-01-01T00:00:00Z" und Verwendung
Einheiten=Sekunden seit 1970-01-01T00:00Z .
    
Die anderen Tags für die&lt; dataVariable &gt; als eine regelmäßige Variable arbeiten.
Zum Beispiel, um eine Variable genannt Höhe mit einem festen Wert von 0,0 zu erstellen (Flossen) , verwenden:

>        &lt;sourceName>=0&lt;/sourceName>  
>        [&lt;destinationName\\>](#destinationname)altitude&lt;/destinationName>  
>        [&lt;dataType>float&lt;/dataType>](#datatype)  

Für ungewöhnliche Situationen können Sie sogar eine actual\\_range addAttribute, die die erwarteten Werte von Ziel Min und ZielMax überschreiben wird (die andernfalls gleichgestellt würden Wert) .
 
###### Script SourceNames/Derived Variables{#script-sourcenamesderived-variables} 
Beginnen mit ERDDAP™ v2.10, in einem [EDDTableFromFiles](#eddtablefromfiles) , [EDDTableFromDatabase](#eddtablefromdatabase) , oder [EDDTableFromFileNames](#eddtablefromfilenames) Datensatz, der&lt; sourceName &gt; kann
ein Ausdruck (eine Gleichung, die auf einen einzigen Wert auswertet) , mit dem Format
```
    <sourceName>=*expression*</sourceName>  
```
oder ein Skript (eine Reihe von Aussagen, die einen einzigen Wert zurückgibt) , mit dem Format
```
    <sourceName>=*script*</sourceName>  
```
 ERDDAP™ auf der [Apache-Projekt](https://www.apache.org/)   [ Java Ausdruckssprache (JEXL) ](https://commons.apache.org/proper/commons-jexl/)   (Lizenz: [Apache](https://www.apache.org/licenses/LICENSE-2.0) ) die Ausdrücke auswerten und die Skripte ausführen.
Die Berechnung für eine bestimmte neue Variable erfolgt innerhalb einer Zeile der Ergebnisse, wiederholt für alle Zeilen.
Die Ausdrücke und Skripte verwenden eine Java - und Java Script-ähnliche Syntax und kann jede der
 [Betreiber und Methoden, die in JEXL gebaut werden](https://commons.apache.org/proper/commons-jexl/reference/syntax.html) .
Die Skripte können auch Methoden verwenden (Funktionen) aus diesen Klassen:
*    [Kalender2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2) , die ein Wrapper für einige der statischen, zeit- und kalenderbezogenen Methoden in com.cohort.util.Calendar2 ist ( [Lizenz](/acknowledgements#cohort-software) ) . Zum Beispiel
Kalender2.parseToEpochSeconds ( *sourceTime, date Zeitformat* ) wird die Quelle parse Zeitstring über den DatumTimeFormat String und Rückgabe eines "seconds since 1970-01-01T00:00:00Z"   (epochSeconds) doppelter Wert.
*    [Mathematik](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math) , die eine Umhüllung für fast alle statischen, mathematischen Methoden in [java.lang. Mathematik](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html) . Zum Beispiel Math.atan2 ( *y, x* ) in rechteckigen Koordinaten (y, x) und liefert polare Koordinaten (eine Reihe von Doppeln mit \\[ r, theta \\] ) .
*    [Mathematik](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2) , die ein Wrapper für fast alle statischen, math-bezogenen Methoden in com.cohort.util ist. Mathematik ( [Lizenz](/acknowledgements#cohort-software) ) . Zum Beispiel
Math2.roundTo ( *d, nPlaces* ) d auf die angegebene Anzahl von Ziffern nach rechts des Dezimalpunktes umlaufen wird.
* String, die Ihnen Zugriff auf alle statischen, String-bezogenen Methoden in [java.lang. Streichung](https://docs.oracle.com/javase/8/docs/api/java/lang/String) . Streichobjekte in ERDDAP™ Ausdrücke und Skripte können jede ihrer zugehörigen Java Verfahren, wie in der java.lang beschrieben. String Dokumentation. Zum Beispiel String.valueOf (dgl.) den doppelten Wert d in einen String umwandeln (obwohl Sie auch ""+d verwenden können) .
*    [String2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2) , die ein Wrapper für die meisten der statischen, String- und Array-bezogenen Methoden in com.cohort.util.String2 ist ( [Lizenz](/acknowledgements#cohort-software) ) . Zum Beispiel String2 .z EroPad ( *Anzahl, nDigits* ) wird links von der Zahl String 0's hinzufügen, so dass die Gesamtzahl der Ziffern nDigits ist (z.B. String2 .z EroPad ("6", 2) wird zurückkehren "06") .
*    [Zeile](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-row) , die nichtstatische Verfahren zum Zugriff auf die Daten aus den verschiedenen Spalten in der aktuellen Zeile der Quelldatentabelle aufweist. Zum Beispiel Zeile.columnString ("Jahr") liest den Wert aus der Spalte "Jahr" als String, während, Zeile.column In ("Jahr") liest den Wert aus der Spalte "Jahr" als ganze Zahl.

Aus Sicherheitsgründen können Ausdrücke und Skripte keine anderen Klassen als die 6 verwenden. ERDDAP™ erzwingt diese Einschränkung durch die Erstellung einer standardmäßigen Blacklist (die alle Klassen schwarz) und dann eine Whitelist (die spezifisch die oben beschriebenen 6 Klassen erlaubt) . Wenn Sie andere Methoden und/oder andere Klassen benötigen, um Ihre Arbeit zu tun, senden Sie bitte Ihre Anfragen an Chris. John bei noaa.gov.
    
###### Effizienz
Für EDDTableFromFiles-Datensätze gibt es nur ein sehr, sehr minimal (wahrscheinlich nicht merkbar) Verlangsamung von Datenanfragen aus diesen Variablen. Für EDDTableFromDatabase gibt es für Anträge, die Einschränkungen auf diese Variablen beinhalten (u.a. (&longitude0360&gt;30&longitude0360)&lt;40) weil die Einschränkungen nicht an die Datenbank weitergegeben werden können, so dass die Datenbank viel mehr Daten zurückgeben muss, um ERDDAP™   (die sehr zeitaufwendig ist) und ERDDAP™ kann die neue Variable erstellen und die Strenge anwenden. Um den schlimmsten Fall zu vermeiden (wo keine Einschränkungen an die Datenbank weitergegeben werden) , ERDDAP™ wirft eine Fehlermeldung, damit die Datenbank nicht den gesamten Inhalt der Tabelle zurückgeben muss. (Wenn Sie dies umgehen möchten, fügen Sie eine Strenge zu einer nicht-script Spalte hinzu, die immer wahr sein wird, z.B. &time&lt;3000-01.) Aus diesem Grund ist es mit EDDTableFromDatabase wahrscheinlich immer besser, eine abgeleitete Spalte in der Datenbank zu erstellen, anstatt zu verwenden sourceName = Beschreibung ERDDAP .

###### Überblick über Wie ein Ausdruck (Oder Script) Wird verwendet:
Als Antwort auf die Anfrage eines Benutzers für tabellarische Daten, ERDDAP™ erhält Daten aus einer Reihe von Quelldateien. Jede Quelldatei erzeugt eine Tabelle des Rohmaterials (gerade aus der Quelle) Daten. ERDDAP™ wird dann durch die Tabelle der Rohdaten, Zeile für Zeile gehen und den Ausdruck oder das Skript einmal für jede Zeile auswerten, um eine neue Spalte zu erstellen, die diesen Ausdruck oder das Skript als ein sourceName .
    
###### GenerateDatasetsXml
Beachten Sie, dass GenerateDatasets Xml ist völlig unaware, wenn es eine Notwendigkeit, eine Variable mit&lt; sourceName &gt;=============================================================================================================================================================================================================================================================== *Ausdruck* &lt;/ sourceName &gt;. Sie müssen die Variable in erstellen datasets.xml von Hand.

###### Ausdrücksbeispiele:
Hier sind einige vollständige Beispiele von Datenvariablen, die einen Ausdruck verwenden, um eine neue Datenspalte zu erstellen. Wir erwarten, dass diese Beispiele (und Varianten davon) wird etwa 95% der Nutzung aller Ausdrucksvererbung abdecken sourceName S.

###### Kombinieren von separatem "Datum" und "time" Spalten in eine einheitliche Zeitspalte:
```
    <dataVariable>
        <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("date") + "T" + 
            row.columnString("time") + "Z", "yyyy-MM-dd'T'HH:mm:ss'Z'")</sourceName> 
        <destinationName>time</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">seconds since 1970-01-01</att>
        </addAttributes>
    </dataVariable>
```
Das sourceName ein neues "time" Spalte, indem die String-Werte aus dem "Datum" kontaminiert werden ( yyyy-MM-dd ) und "time"   (HH:) Spalten in jeder Zeile der Quelldatei und durch Umwandlung dieses Strings in eine "seconds since 1970-01-01"   (epochSeconds) doppelter Wert.

Oder natürlich, Sie müssen die Zeitformat-String anpassen, um mit dem spezifischen Format in jedem Datensatz Quell-Datum und Zeitspalten, siehe die
 [Zeiteinheiten Dokumentation](#string-time-units) .

Technisch müssen Sie nicht verwenden Kalender2.parseToEpochSeconds () das kombinierte Datum+Zeit in epochSeconds umwandeln. Du könntest einfach das Datum+time String angeben ERDDAP™ und das Format angeben (z.
 yyyy-MM-dd 'T'HH:mm:ss'Z') über das Attribute der Einheiten. Aber es gibt erhebliche Vorteile, um in epochSeconds umzuwandeln -- insbesondere, EDDTableFromFiles kann dann leicht die Reichweite der Zeitwerte in jeder Datei verfolgen und so schnell entscheiden, ob in einer bestimmten Datei zu suchen, wenn auf eine Anforderung reagiert, die Zeitzwänge hat.

Ein damit verbundenes Problem ist die Notwendigkeit, eine einheitliche Datums-/Zeitspalte aus einer Quelle mit separatem Jahr, Monat, Datum, Stunde, Minute, Sekunde zu erstellen. Die Lösung ist sehr ähnlich, aber Sie werden oft brauchen, um Null-Pad viele der Felder, so dass zum Beispiel Monat (1 - 12) und Datum (1 - 31) haben immer 2 Ziffern. Hier ist ein Beispiel mit Jahr, Monat, Datum:
```
    <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("year") + 
        String2.zeroPad(row.columnString("month"), 2) + 
        String2.zeroPad(row.columnString("date"), 2), "yyyyMMdd")</sourceName>
```
Ein damit verbundenes Problem ist die Notwendigkeit, eine einheitliche Breiten- oder Längenspalte zu erstellen, indem die Daten in den einzelnen Graden, Minuten und Sekundenspalten der Quelltabelle zusammengefasst werden, die jeweils als ganze Zahlen gespeichert sind. Zum Beispiel
```
    <sourceName>=row.columnInt("deg") + row.columnInt("min")/60.0 + 
        row.columnInt("sec")/3660.0</sourceName>
```
###### Umrechnen einer Spalte namens "lon" mit Längenwerten von 0 - 360° in eine Spalte mit Werten von -180 - 180°
```
    <dataVariable>
        <sourceName>=Math2.anglePM180(row.columnDouble("lon"))</sourceName> 
        <destinationName>longitude</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">degrees\\_east</att>
        </addAttributes>
    </dataVariable>
```
Das sourceName Ausdruck macht eine neue "Länge"-Spalte, indem der Doppelwert aus der "lon"-Spalte in jeder Zeile der Quelldatei umgewandelt wird (vermutlich mit 0 - 360 Werten) , und durch Umwandlung in einen -180 bis 180 Doppelwert.

Wenn Sie stattdessen Quelllängenwerte von -180 - 180° in 0 - 360° umwandeln möchten, verwenden
```
    <sourceName>=Math2.angle0360(row.columnDouble("lon"))</sourceName>
```
Namen der zwei Längenvariablen:
Wenn der Datensatz 2 Längenvariablen hat, empfehlen wir die Verwendung destinationName = Länge der Größe -180 - 180° und destinationName =Länge0360 (und LongName=\"Longitude 0-360°") für die Größe 0 - 360°. Dies ist wichtig, weil Benutzer manchmal Erweiterte Suche verwenden, um Daten in einem bestimmten Längenbereich zu suchen. Diese Suche wird besser funktionieren, wenn die Länge konsequent -180 - 180° Werte für alle Datensätze hat. Außerdem werden die geospatial\\_lon\\_min, geospatial\\_lon\\_max, Westernmost\\_Easting und Easternmost\\_Eastings globalen Attribute konsequent gesetzt. (mit Längenwerten -180 bis 180°) ;
    
###### Umrechnen einer Spalte namens "tempF" mit Temperaturwerten in Grad\\_ F in eine Spalte namens "tempC" mit Temperaturen in Grad\\_ C:
```
    <dataVariable>
        <sourceName>=(row.columnFloat("tempF")-32)\\*5/9</sourceName> 
        <destinationName>tempC</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_C</att>
        </addAttributes>
    </dataVariable>
```
Das sourceName Ausdruck macht eine neue "tempC"-Spalte, indem der Float-Grad\\_ F-Wert aus der Spalte "tempF" in jeder Zeile der Quelldatei in einen Float-Grad\\_ C-Wert.

Beachten Sie, dass Ihr Datensatz sowohl die ursprüngliche Tempo haben kann F Variable und die neue Zeit C-Variable durch eine andere Variable mit
```
    <sourceName>tempF</sourceName>
```
###### Umrechnen von Wind "Geschwindigkeit" und "Richtung" Spalten in zwei Spalten mit den u,v Komponenten
* Um eine u-variable zu machen, verwenden
```
    <sourceName>=row.columnFloat("speed") \\* Math.cos(row.columnFloat("direction"))</sourceName>
```
* Um eine v-variable zu machen, verwenden
```
    <sourceName>=row.columnFloat("speed") \\* Math.sin(row.columnFloat("direction"))</sourceName>
```
Oder, gegeben u,v:
* Um eine Geschwindigkeitsvariable zu machen, verwenden Sie
```
    <sourceName>=Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[0\\]</sourceName>
```
* Um eine Richtungsvariable zu machen, verwenden Sie
```
    <sourceName>=Math.toDegrees(Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[1\\])</sourceName>
```
    
###### Script Beispiel:
Hier ist ein Beispiel für die Verwendung eines Skripts, nicht nur eines Ausdrucks, als sourceName . Wir erwarten, dass Skripte im Gegensatz zu Ausdrücken nicht oft benötigt werden. In diesem Fall ist das Ziel, einen nicht-NaN fehlenden Wert zurückzugeben (-99) für Temperaturwerte außerhalb eines bestimmten Bereichs. Beachten Sie, dass das Skript der Teil nach der "=" ist.
```
    <dataVariable>
        <sourceName>=var tc=row.columnFloat("tempC"); return tc&gt;35 || tc&lt;-5? -99.0f : tc\\*9/5+32;</sourceName> 
        <destinationName>tempF</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_F</att>
        </addAttributes>
    </dataVariable>
```
###### Hard Flag
Wenn Sie den in einem sourceName , Sie müssen eine [harte Flagge](/docs/server-admin/additional-information#hard-flag) für den Datensatz so ERDDAP™ löscht alle cached Informationen für den Datensatz und liest jede Datendatei neu (Verwendung des neuen Ausdrucks oder Skripts) das nächste Mal lädt es den Datensatz. Alternativ können Sie verwenden [DasDds](#dasdds) die das Äquivalent der Einstellung einer harten Flagge tut.

###### Prozent Encode
Dies ist nur selten relevant: Weil die Ausdrücke und Skripte in datasets.xml , das ist ein XML-Dokument, Sie müssen Prozent kodieren alle&lt;, \\&gt;, und & Zeichen in den Ausdrücken und Skripten wie&lt;, &gt;, und &amp; .

###### Gemeinsame Probleme
Ein häufiges Problem ist, dass Sie eine Variable mit sourceName = *Ausdruck* aber die resultierende Datenspalte hat nur fehlende Werte. Alternativ haben einige Zeilen der neuen Spalte fehlende Werte und Sie denken, sie sollten es nicht. Das zugrunde liegende Problem ist, dass etwas mit dem Ausdruck nicht stimmt und ERDDAP diesen Fehler in einen fehlenden Wert umwandelt. Um das Problem zu lösen,

* Sehen Sie sich den Ausdruck an, um zu sehen, was das Problem sein könnte.
* Sieh mal. [Pressemitteilung](/docs/server-admin/additional-information#log) , die die erste Fehlermeldung bei der Erstellung jeder neuen Spalte anzeigen wird.

Häufige Ursachen sind:

* Du hast den falschen Fall benutzt. Ausdrücke und Skripte sind case sensitive.
* Du hast den Namen der Klasse weggelassen. Zum Beispiel müssen Sie Math.abs verwenden () , nicht nur abs () .
* Du hast keine Conversions gemacht. Wenn zum Beispiel der Datentyp eines Parameterwerts String ist und Sie einen doppelten Wert haben, müssen Sie ein Doppel in einen String über ""+d umwandeln.
* Der Spaltenname im Ausdruck passt nicht genau zum Spaltennamen in der Datei (oder der Name kann in einigen Dateien anders sein) .
* Es gibt einen Syntaxfehler im Ausdruck (z.B. ein fehlendes oder extra ') „.

Wenn du steckst oder Hilfe brauchst,
bitte die Details einschließen und unsere [Abschnitt zum Erhalt zusätzlicher Unterstützung](/docs/intro#support) .
        
###### &lt; destinationName &gt;{#destinationname-1} 
* (&lt; destinationName &gt; (#destinationname) -- der Name für die Variable, die angezeigt und verwendet wird ERDDAP™ Benutzer.
    * Das ist OPTIONAL. Wenn nicht, die [ sourceName ](#sourcename) wird verwendet.
    * Dies ist nützlich, weil es Ihnen erlaubt, eine kryptische oder ungerade zu ändern sourceName .
    *    destinationName ist Case sensitive.
    *    destinationName s Beginnen Sie mit einem Buchstaben (A-Z, a-z) gefolgt von 0 oder mehr Zeichen (A-Z, a-z, 0-9 und \\_) . ('-' wurde vorher erlaubt ERDDAP™ Artikel 1.10.) Diese Einschränkung erlaubt es, die Datenvariablennamen in ERDDAP™ , in den Antwortdateien und in der gesamten Software, in der diese Dateien verwendet werden, einschließlich Programmiersprachen (wie Python , Matlab , und Java Script) wo es ähnliche Einschränkungen bei variablen Namen gibt.
    * In EDDTable-Datensätzen, [Länge, Breite, Höhe (oder Tiefe) , und Zeit](#destinationname) Datenvariablen sind besonders.
             
###### &lt;Daten Art und Weise{#datatype} 
* (&lt;DatenTyp&gt;] (#datatype) -- gibt den Datentyp aus der Quelle an. (In einigen Fällen, beispielsweise beim Lesen von Daten aus ASCII-Dateien, gibt es an, wie die Daten aus der Quelle gespeichert werden sollen.) 
    * Dies ist REQUIRED von einigen Datensätzen und IGNORED von anderen. Datensatztypen, die dies für ihre dataVariable s sind: EDDGrid VonXxxFiles, EDDTableFromXxxFiles, EDDTableFromM WFS , EDDTableFromNOS, EDDTableFrom SOS . Andere Datensätze Typen ignorieren diesen Tag, weil sie die Informationen aus der Quelle erhalten.
         
    * Gültige Werte sind jeder der Standard [ ERDDAP™ Datentypen](#data-types) plus boolean (siehe unten) . Die DataType-Namen sind case-sensitive.
         
###### booleanische Daten{#boolean-data} 
*    ["boolean"](#boolean-data) ist ein Sonderfall.
    * Intern, ERDDAP™ unterstützt keinen Boolean-Typ, weil Booleans fehlende Werte nicht speichern können und die meisten Dateitypen keine Booleans unterstützen. Auch, DAP unterstützt keine Booleaner, so gäbe es keinen Standard Weg, um boolean Variablen abzufragen.
    * Angabe "boolean" für die Daten Typ datasets.xml wird dazu führen, dass booleanische Werte gespeichert und als Bytes dargestellt werden: 0=false, 1=true, 127= missing\\_value .
    * Benutzer können Einschränkungen durch Verwendung der numerischen Werte festlegen (beispielsweise "isAlive=1") .
    *    ERDDAP™ Administratoren müssen manchmal die "booleschen" Daten verwenden Typ datasets.xml zu sagen ERDDAP™ wie Sie mit der Datenquelle interagieren (z.B. boolesche Werte aus einer relationalen Datenbank zu lesen und in 0, 1 oder 127 zu konvertieren) .
         
* Wenn Sie eine Datenvariable aus dem dataType in den Quelldateien ändern möchten (zum Beispiel kurz) in andere Daten Typ im Datensatz (z.B. int) , don't use&lt;dataType&gt;, um anzugeben, was Sie wollen. (Es funktioniert für einige Arten von Datensätzen, aber nicht andere.) Stattdessen:
    * Verwendung&lt;dataTyp&gt;, um anzugeben, was in den Dateien ist (zum Beispiel kurz) .
    * In der&lt; addAttributes &gt; für die Variable, [ scale\\_factor ](#scale_factor) Attribut mit den neuen Daten Typ (z.B. int) und einem Wert von beispielsweise 1,
```
            <att name="scale\\_factor" type="int">1</att>  
```
######  dataVariable  &lt;addAttributes&gt; {#datavariable-addattributes} 
* (&lt; addAttributes &gt; (#variable-addattributes) -- definiert eine Reihe von Attributen ( *Name* = *Wert* ) die den Attributen der Quelle für eine Variable hinzugefügt werden, um die kombinierten Attribute für eine Variable zu machen. Das ist OPTIONAL.
Wenn die Variable [QuelleBeiträge](#variable-addattributes) oder&lt; addAttributes &gt; einschließlich [ scale\\_factor und/oder add\\_offset ](#scale_factor) Attribute, ihre Werte werden verwendet, um die Daten aus der Quelle vor der Verteilung an den Client zu entpacken. Die ausgepackte Variable wird vom gleichen Datentyp sein (z.B. Schwimmer) als scale\\_factor und add\\_offset Werte.
        
###### Variabel&lt;addAttributes&gt; {#variable-addattributes} 
* ( ** Variable Attribute / Variable&lt; addAttributes &gt; ** &#33; (#variable-addattributes) --&lt; addAttributes &gt; ein OPTIONAL-Tag innerhalb eines&lt; axisVariable &gt; oder&lt; dataVariable &gt; tag, mit dem die Attribute der Variablen geändert werden.
    
    *    ** Verwenden Sie eine Variable&lt; addAttributes &gt; zur Änderung der Attribute der Variablen. **  ERDDAP™ kombiniert die Attribute einer Variablen aus der Datenquelle (** QuelleBeiträge **) und der Variablen**  addAttributes  **die Sie definieren datasets.xml   (die Priorität haben) die Variable zu machen "** In den Warenkorb ** ", die was sind, ERDDAP™ Benutzer sehen. So können Sie verwenden addAttributes die Werte von sourceAttributes neu definieren, neue Attribute hinzufügen oder Attribute entfernen.
    * Siehe die [ ** &lt; addAttributes &gt; **Informationen (#addattributes) das gilt für global und variabel** &lt; addAttributes &gt; ** .
    *    ERDDAP™ sucht und nutzt viele dieser Attribute auf verschiedene Weise. Beispielsweise sind die colorBar-Werte erforderlich, um eine Variable über WMS , so dass Karten mit konsistenten colorBars gemacht werden können.
    *    [Die Länge, Breite, Höhe (oder Tiefe) und Zeitvariablen](#destinationname) viele entsprechende Metadaten automatisch erhalten (zum Beispiel, [Einheiten](#units) ) .
    * Eine Stichprobe&lt; addAttributes &gt; für eine Datenvariable:

    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="actual\\_range" type="doubleList">10.34 23.91&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMinimum" type="double">0&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMaximum" type="double">32&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Surface Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="numberOfObservations" />  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  

Das leere NumberOfObservations Attribut verursacht das QuellnummerOfObservations Attribut (wenn) aus der letzten, kombinierten Liste der Attribute zu entfernen.
    * Die Bereitstellung dieser Informationen hilft ERDDAP™ tun Sie einen besseren Job und hilft Benutzern, die Datensätze zu verstehen.
Gute Metadaten machen einen Datensatz nutzbar.
Unzureichende Metadaten machen einen Datensatz nutzlos.
Bitte nehmen Sie die Zeit, einen guten Job mit Metadaten-Attributen zu tun.
    
###### Kommentare zu variablen Attributen, die in ERDDAP :

######  actual\\_range  {#actual_range} 
*    [ ** actual\\_range ** ](#actual_range) ist ein ECOMMENDED Variable Attribut. Zum Beispiel

>    &lt;att name="actual\\_range" [type="floatList"](#attributetype)\\>0.17 23.58&lt;/att>

* Dieses Attribut stammt aus dem [CD COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) und [CF 1.7+](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) Metadatenstandards.
* Falls vorhanden, muss es ein Array von zwei Werten des gleichen Datentyps sein wie der Bestimmungsdatentyp der Variablen, wobei das Ist (nicht die theoretische oder die erlaubte) Mindest- und Maximalwerte der Daten für diese Variable.
* Wenn die Daten mit [ scale\\_factor und/oder add\\_offset ](#scale_factor) , actual\\_range müssen ausgepackte Werte haben und den gleichen Datentyp haben wie die ausgepackten Werte.
* Für einige Datenquellen (zum Beispiel alle EDDTableFrom... Dateien Datensätze) , ERDDAP™ bestimmt die actual\\_range jeder Variablen und setzt die actual\\_range Attribut. mit anderen Datenquellen (beispielsweise relationale Datenbanken, Cassandra, DAP PER, Hyrax ) , es könnte für die Quelle störend oder belastend sein, den Bereich zu berechnen, so ERDDAP™ nicht anfordern. In diesem Fall ist es am besten, wenn Sie actual\\_range   (insbesondere für die Längen-, Breiten-, Höhen-, Tiefen- und Zeitvariablen) durch Hinzufügen eines actual\\_range Attribut zu jeder Variablen [&lt; addAttributes &gt; (#addattributes) für diesen Datensatz in datasets.xml z.B.

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>-180 180&lt;/att>

* Für Zahlen [Zeit- und Zeitstempelvariablen](#time-units) , die angegebenen Werte sollten die betreffende Quelle sein (nicht Bestimmung) Zahlenwerte. Wenn beispielsweise die Quellzeitwerte als "Tage seit 1985-01" gespeichert werden, dann wird actual\\_range sollte in "Tagen seit 1985-01" angegeben werden. Und wenn Sie sich auf NOW als den zweiten Wert für kurzfristige Daten beziehen möchten, die regelmäßig aktualisiert werden, sollten Sie NaN verwenden. Zum Beispiel, um einen Datenbereich von 1985-01-17 bis JETZT anzugeben, verwenden

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>16 NaN&lt;/att>

* wenn actual\\_range bekannt ist (entweder ERDDAP™ Berechnen oder indem Sie es über&lt; addAttributes &gt; ERDDAP™ wird es dem Benutzer im Data Access Formular angezeigt ( * datasetID * .html) und machen Sie ein Graph Webseiten ( * datasetID * .graph) für diesen Datensatz und bei der Generierung der FGDC und ISO 19115 Metadaten verwenden. Auch die letzten 7 Tage der Zeit actual\\_range werden als Standard-Zeit-Subset verwendet.
* wenn actual\\_range ist bekannt, Benutzer können die [min () und max () Funktionen](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min) in Anfragen, die oft sehr nützlich sind.
* Für alle EDDTable... Datensätze, wenn actual\\_range bekannt ist (entweder durch Angabe oder durch ERDDAP™ Berechnung) , ERDDAP™ werden in der Lage sein, schnell alle Anfragen an Daten außerhalb dieses Bereichs abzulehnen. Zum Beispiel, wenn der niedrigste Zeitwert des Datensatzes 1985-01-17 entspricht, wird eine Anforderung für alle Daten von 1985-01-01 bis 1985-01-16 sofort mit der Fehlermeldung "Ihre Abfrage ergab keine passenden Ergebnisse." Das macht actual\\_range ein sehr wichtiges Stück von Metadaten, da es ERDDAP™ viel Aufwand und viel Zeit sparen. Und das zeigt, dass actual\\_range Werte dürfen nicht enger sein als der tatsächliche Datenbereich; andernfalls ERDDAP™ kann falsch sagen "Es gibt keine passenden Daten", wenn es tatsächlich relevante Daten gibt.
* Wenn ein Benutzer eine Teilmenge von Daten wählt und einen Dateityp anfordert, der Metadaten enthält (zum Beispiel, .nc ) , ERDDAP™ Änderungen actual\\_range in der Antwortdatei, um den Subset-Bereich zu reflektieren.
* Siehe auch [ data\\_min und data\\_max ](#data_min-and-data_max) , die eine alternative Möglichkeit sind, die actual\\_range . Diese werden jedoch jetzt abgeschrieben, daß actual\\_range wird durch CF 1.7+ definiert.
         
###### Farbe Bar Attribute{#color-bar-attributes} 
Es gibt mehrere OPTIONAL-Variable-Attribute, die die vorgeschlagenen Standard-Attribute für eine Farbleiste angeben (verwendet, um Datenwerte in Farben auf Bildern zu konvertieren) für diese Variable.
* Wenn vorhanden, werden diese Informationen als Standardinformationen durch griddap und tabledap wenn Sie ein Bild anfordern, das eine Farbleiste verwendet.
* Wenn z.B. Breitenlängenrasterdaten als Deckung auf einer Karte dargestellt werden, gibt die Farbleiste an, wie die Datenwerte in Farben umgewandelt werden.
* Diese Werte können ERDDAP™ Bilder zu erstellen, die über unterschiedliche Anforderungen eine einheitliche Farbleiste verwenden, auch wenn die Zeit oder andere Dimensionswerte variieren.
* Diese Attributnamen wurden für die Verwendung in ERDDAP . Sie stammen nicht aus einem Metadaten-Standard.
* Die Attribute im Zusammenhang mit der Farbleiste sind:
    *    ** colorBarMinimum ** gibt den Mindestwert auf der colorBar an. Zum Beispiel

    >    &lt;att name="colorBarMinimum" [type="double"](#attributetype)\\>-5&lt;/att>  

    * Wenn die Daten mit [ scale\\_factor und/oder add\\_offset ](#scale_factor) , geben Sie die colorBarMinimum als unverpackter Wert.
    * Datenwerte kleiner als colorBarMinimum die gleiche Farbe wie colorBarMinimum Werte.
    * Das Attribut sollte [Typ="double"](#attributetype) , unabhängig vom Typ der Datengröße.
    * Der Wert ist in der Regel eine schöne runde Nummer.
    * Best Practices: Wir empfehlen einen Wert etwas höher als der minimale Datenwert.
    * Es gibt keinen Standardwert.
*    ** colorBarMaximum ** gibt den maximalen Wert auf der colorBar an. Zum Beispiel

    >    &lt;att name="colorBarMaximum" [type="double"](#attributetype)\\>5&lt;/att>  

    * Wenn die Daten mit [ scale\\_factor und/oder add\\_offset ](#scale_factor) , geben Sie die colorBarMinimum als unverpackter Wert.
    * Datenwerte höher als colorBarMaximum die gleiche Farbe wie colorBarMaximum Werte.
    * Das Attribut sollte [Typ="double"](#attributetype) , unabhängig vom Typ der Datengröße.
    * Der Wert ist in der Regel eine schöne runde Nummer.
    * Best Practices: Wir empfehlen einen Wert etwas niedriger als der maximale Datenwert.
    * Es gibt keinen Standardwert.
*    **Farbe BarPalette** gibt die Palette für die colorBar an. Zum Beispiel
    ```
            <att name="colorBarPalette">WhiteRedBlack</att>
    ```
    * Alle ERDDAP™ Installationen unterstützen diese Standardpaletten: BlackBlueWhite, BlackRedWhite, BlackWhite, BlueWhiteRed, LightRainbow, Ocean, OceanDepth, Rainbow, RedWhiteBlue, ReverseRainbow, Topographie, TopographieDepth \\[ hinzugefügt in v1.74 \\] , WhiteBlack, WhiteBlueBlack und WhiteRedBlack.
    * Wenn Sie installiert haben [zusätzliche Paletten](/docs/server-admin/additional-information#palettes) Sie können sich auf einen von ihnen beziehen.
    * Wenn dieses Attribut nicht vorhanden ist, ist der Standard BlueWhiteRed, wenn \\-1\\* colorBarMinimum = colorBarMaximum ; andernfalls ist der Standard Rainbow.
*    **FarbeBarScale** gibt die Skala für die colorBar an. Zum Beispiel
    ``` 
            <att name="colorBarScale">Log</att>
    ```
    * Gültige Werte sind Linear und Log.
    * Ist der Wert Log, colorBarMinimum muss größer als 0 sein.
    * Wenn dieses Attribut nicht vorhanden ist, ist der Standard linear.
*    **Farbe BarContinuous** gibt an, ob die FarbeBar eine kontinuierliche Palette von Farben hat, oder ob die FarbeBar ein paar diskrete Farben hat. Zum Beispiel
    ```
            <att name="colorBarContinuous">false</att>
    ```
    * Gültige Werte sind die Zeichenfolgen wahr und falsch.
    * Wenn dieses Attribut nicht vorhanden ist, ist der Standard zutreffend.
*    **FarbeBarNSections** gibt die Standardnummer der Abschnitte auf der colorBar an. Zum Beispiel
    ```
            <att name="colorBarNSections" type="int">6</att>
    ```
    * Gültige Werte sind positive ganze Zahlen.
    * Wenn dieses Attribut nicht vorhanden ist, ist der Standard \\-1, was sagt ERDDAP™ die Anzahl der Abschnitte basierend auf dem Bereich der colorBar.
######  WMS  {#wms} 
Die wichtigsten Anforderungen an eine Variable, die über ERDDAP ' WMS Server sind:
* Der Datensatz muss ein EDDGrid ... Datensatz.
* Die Datenvariable MUST ist eine Rastervariable.
* Die Datengröße MUST hat Längen- und Breitenachsenvariablen. (Andere Achsenvariablen sind OPTIONAL.) 
* Es gibt nur einige Längenwerte zwischen -180 und 180.
* Die colorBarMinimum und colorBarMaximum Attribute MUST angegeben werden. (Andere Farbleisten-Attribute sind OPTIONAL.) 

######  data\\_min und data\\_max  {#data_min-and-data_max} 
*    [ ** data\\_min ** und ** data\\_max ** ](#data_min-and-data_max) -- Dies sind deprecated variable Attribute definiert im World Ocean Circulation Experiment (WOCHE) Metadatenbeschreibung. Zum Beispiel

    >    &lt;att name="data\\_min" [type="float"](#attributetype)\\>0.17&lt;/att>  
    >    &lt;att name="data\\_max" [type="float"](#attributetype)\\>23.58&lt;/att>

    * Wir empfehlen Ihnen, [ actual\\_range ](#actual_range) , statt data\\_min und data\\_max , weil actual\\_range wird nun durch die CF-Spezifikation definiert.
    * Wenn vorhanden, müssen sie den gleichen Datentyp haben wie der Bestimmungsdatentyp der Variablen, und die tatsächliche (nicht die theoretische oder die erlaubte) Mindest- und Maximalwerte der Daten für diese Variable.
    * Wenn die Daten mit [ scale\\_factor und/oder add\\_offset ](#scale_factor) , data\\_min und data\\_max muss mit dem ausgepackten Datentyp ausgepackt werden.
         
###### Variable drawLandMask  {#variable-drawlandmask} 
*    [ ** drawLandMask ** ](#variable-drawlandmask) -- Dies ist ein OPTIONAL Variable Attribut, das von ERDDAP™   (und keine Metadatenstandards) die den Standardwert für die Option "Draw Land Mask" auf dem Datensatz Make A Graph Formular angibt ( * datasetID * .graph) und für den &.land-Parameter in einer URL, die eine Karte der Daten anfordert. Zum Beispiel
    ```
        <att name="drawLandMask">under</att>  
    ```
Siehe [ drawLandMask Überblick](#drawlandmask) .
###### Kodierung{#encoding} 
*    [ **\\_Verschlüsselung** ](#encoding) 
    * Dieses Attribut kann nur mit String-Variablen verwendet werden.
    * Dieses Attribut wird dringend empfohlen.
    * Dieses Attribut stammt aus dem [ NetCDF Benutzerhandbuch (NUG) ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html) .
    * Intern in ERDDAP™ , Strings sind eine Sequenz von 2-byte Zeichen, die die [Unicode UCS-2 Zeichensatz](https://en.wikipedia.org/wiki/UTF-16) .
    * Viele Dateitypen unterstützen nur 1-Byte-Zeichen in Strings und benötigen so dieses Attribut zur Identifizierung eines zugehörigen
         [Chargier (AKA-Codeseite) ](https://en.wikipedia.org/wiki/Code_page) die definiert, wie die 256 möglichen Werte auf einen Satz von 256 Zeichen aus dem UCS-2 Zeichensatz und/oder dem Codiersystem, z. [UTF-8](https://en.wikipedia.org/wiki/UTF-8)   (die zwischen 1 und 4 Bytes pro Zeichen benötigt) .
    * Werte für \\_Encoding sind case-insensitive.
    * Theorie, ERDDAP™ könnte \\_Encoding-Identifikatoren von [diese IANA-Liste](https://www.iana.org/assignments/character-sets/character-sets.xhtml) , aber in der Praxis, ERDDAP™ aktuell nur unterstützt
        * ISO-8859-1 (Beachten Sie, dass es Armaturen hat, nicht unterstrichen) , die den Vorteil hat, dass er mit den ersten 256 Zeichen von Unicode identisch ist, und
        * UTF-8.
    * Beim Lesen von Quelldateien ist der Standardwert ISO-8859-1, mit Ausnahme von netcdf-4 Dateien, wobei der Standardwert UTF-8 ist.
    * Dies ist ein anhaltendes Problem, weil viele Quelldateien Zeichensätze oder Kodierungen verwenden, die von ISO-8859-1 verschieden sind, aber nicht die Zeichensatz oder Kodierung identifizieren. Beispielsweise haben viele Quelldatendateien einige Metadaten, die von Microsoft Word unter Windows kopiert und eingefügt werden und haben so schicke Bindestriche und Apostrophe von einem Windows-spezifischen Zeichensatz anstelle von ASCII-Hyphen und Apostrophen. Diese Zeichen erscheinen dann als seltsame Zeichen oder '?' in ERDDAP .
         
###### DateiAccessBaseUrl{#fileaccessbaseurl} 
*    ** [DateiAccessBaseUrl](#fileaccessbaseurl) und DateiAccessSuffix** sind sehr selten verwendet Attribute, die nicht von jedem Standard sind. Wenn eine EDDTable Spalte Dateinamen von webfähigen Dateien hat (z.B. Bild-, Video- oder Audiodateien) , Sie können hinzufügen
```
    <att name="fileAccessBaseUrl">*someBaseURL*</a>  
```
zur Angabe der Basis-URL (mit /) benötigt, um die Dateinamen in vollständige URLs zu machen. In ungewöhnlichen Fällen, wie, wenn eine Spalte Referenzen zu .png-Dateien hat, aber die Werte fehlen ".png", können Sie hinzufügen
```
    <att name="fileAccessSuffix">*someSuffix*</a>  
```
(zum Beispiel,&lt;att name="fileAccessSuffix"&gt;.png&lt;(a&gt;)
um ein Suffix zu definieren, das hinzugefügt werden soll, um die Dateinamen in vollständige URLs zu machen. Dann .htmlTable Antworten, ERDDAP™ den Dateinamen als Link zur vollständigen URL anzeigen (die Basis Url plus Dateiname plus Suffix) .

Wenn du willst ERDDAP™ die entsprechenden Dateien zu bedienen, eine separate [EDDTableFromFileNames](#eddtablefromfilenames) Datensatz für diese Dateien (es kann ein privater Datensatz) .
    
###### DateiAccessArchive Url{#fileaccessarchiveurl} 
*    [ **DateiAccessArchive Url** ](#fileaccessarchiveurl) ist ein sehr selten verwendetes Attribut, das nicht von jedem Standard ist. Wenn eine EDDTable Spalte Dateinamen von webfähigen Dateien hat (z.B. Bild-, Video- oder Audiodateien) die über ein Archiv zugänglich sind (z.B., .zip Datei) über eine URL zugänglich, Nutzung&lt;att name="fileAccessArchiveUrl"&gt; *URL* &lt;/att&gt; zur Angabe der URL für das Archiv.
    
Wenn du willst ERDDAP™ um die Archivdatei zu bedienen, eine separate [EDDTableFromFileNames](#eddtablefromfilenames) Datensatz für diese Datei (es kann ein privater Datensatz) .
    
######  ioos\\_category  {#ioos_category} 
*    [ ** ioos\\_category ** ](#ioos_category) -- Dies ist ein REQUIRED Variable Attribut, wenn&lt;VariablenMustHaveIoosCategory&gt; wird auf true gesetzt (Der Standard) in [Setup.xml](/docs/server-admin/deploy-install#setupxml) ; andernfalls ist es OPTIONAL.
Zum Beispiel&lt;att name=" ioos\\_category &gt;Versorgung&lt;/att&gt;
Die Kategorien stammen aus [ NOAA Integriertes Ozeanbeobachtungssystem (IOOS) ](https://ioos.noaa.gov/) .
    
    *    (Das Schreiben) Wir sind uns der formalen Definitionen dieser Namen nicht bewusst.
    * Die Kernnamen stammen von Zdenka Willis' .ppt "Integrated Ocean Observing System (IOOS)   NOAA "Angriff auf eine erste Betriebsfähigkeit" und von der [US IOOS Blueprint](https://www.iooc.us/wp-content/uploads/2010/11/US-IOOS-Blueprint-for-Full-Capability-Version-1.0.pdf)   (Seite 1-5) .
    * Es ist wahrscheinlich, dass diese Liste in Zukunft überarbeitet wird. Wenn Sie Anfragen haben, mailen Sie Chris. John bei noaa.gov.
    *    ERDDAP™ unterstützt eine größere Liste von Kategorien als IOOS tut, weil Bob Simons zusätzliche Namen hinzugefügt (meist auf den Namen der wissenschaftlichen Felder, zum Beispiel Biologie, Ökologie, Meteorologie, Statistik, Taxonomie) für andere Arten von Daten.
    * Die aktuellen gültigen Werte in ERDDAP™ sind Bathymetry, Biology, Bottom Character, CO2, Colored Dissolved Organic Matter, Contaminants, Currents, Dissolved Nutrients, Dissolved O2, Ecology, Fish Abundance, Fish Species, Heat Flux, Hydrology, Iceplan Distribution, Identifier, Location, Meteorology, Ocean Color, Optical Properties, Other, Pathogens, Phytoplankton Spezies, Pressure,
    * Es gibt einige Überschneidungen und Mehrdeutigkeit zwischen verschiedenen Begriffen -- tun Sie Ihr Bestes.
    * Wenn Sie hinzufügen ioos\\_category in die Liste der&lt; categoryAttributes &gt; in ERDDAP ' [Setup.xml](/docs/server-admin/deploy-install#setupxml) Datei, Benutzer können leicht finden Datensätze mit ähnlichen Daten über ERDDAP 's "Search for Datasets by Kategorie" auf der Homepage.
         [Versuchen Sie, ioos\\_category zur Suche nach Datensätzen von Interesse.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000) 
    * Da war [eine Diskussion über ERDDAP™ und ioos\\_category in der ERDDAP™ Google Group.](https://groups.google.com/forum/#!topic/erddap/TnwbgzpSS0w) 
    
Sie können versucht werden zu setzen&lt;VariablenMustHaveIoosCategory&gt; auf false, so dass dieses Attribut nicht benötigt wird. ("Pfft&#33; Was ist los mit mir?") Einige Gründe, es auf die Wahrheit zu verlassen (Der Standard) und Verwendung ioos\\_category sind:
    
    * Wenn setup.xml's&lt;VariablenMustHaveIoosKategorie&gt; ist zu wahr, [GenerateDatasetsXml](#generatedatasetsxml) immer erstellt/vorschlägt an ioos\\_category Attribut für jede Variable in jedem neuen Datensatz. Warum also nicht einfach reinlassen?
    *    ERDDAP™ ermöglicht es Benutzern, nach Datensätzen von Interesse nach Kategorie zu suchen. ioos\\_category ist eine sehr nützliche Suchkategorie, weil die ioos\\_categories (zum Beispiel Temperatur) sind ziemlich breit. Das macht ioos\\_category viel besser zu diesem Zweck als zum Beispiel die viel feinerkörnige CF standard\\_name S (die zu diesem Zweck nicht so gut sind wegen aller Synonyme und leichten Variationen, zum Beispiel, see\\_oberfläche\\_temperature versus Meer\\_Wasser\\_Temperatur) .
(Verwendung) ioos\\_category zu diesem Zweck von&lt; categoryAttributes &gt; in der Datei setup.xml.)
         [Versuchen Sie, ioos\\_category zur Suche nach Datensätzen von Interesse.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000) 
    * Diese Kategorien stammen aus [ NOAA Integriertes Ozeanbeobachtungssystem (IOOS) ](https://ioos.noaa.gov/) . Diese Kategorien sind grundlegend für die Beschreibung von IOOS Mission. Wenn Sie in NOAA , Unterstützung ioos\\_category ist gut Eins. NOAA was zu tun ist. (Schau dir das an. [Ein NOAA Video](https://www.youtube.com/watch?v=nBnCsMYm2yQ) und sei inspiriert&#33;) Wenn Sie in einer anderen US- oder internationalen Agentur sind, oder mit Regierungsbehörden arbeiten, oder mit einem anderen Ocean Observing System arbeiten, ist es nicht eine gute Idee, mit dem US IOOS Büro zusammenzuarbeiten?
    * Früher oder später, Sie mögen vielleicht etwas anderes wollen ERDDAP™ über die Verbindung zu Ihren Datensätzen [ EDDGrid Von Erddap](#eddfromerddap) und [EDDTableFromErddap](#eddfromerddap) . Wenn der andere ERDDAP™ Anforderungen ioos\\_category , Ihre Datensätze müssen ioos\\_category im Auftrag EDDGrid VonErddap und EDDTableFromErddap zur Arbeit.
    * Es ist psychologisch viel einfacher, ioos\\_category wenn Sie den Datensatz erstellen (Es ist nur eine andere Sache, ERDDAP™ erfordert den Datensatz zu ERDDAP ) , als es nach der Tatsache hinzuzufügen (wenn Sie sich für die Zukunft entscheiden) .
         
######  long\\_name  {#long_name} 
*    [ ** long\\_name ** ](#long_name)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) , [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) und [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandards) ist ein RECOMMENDED Variable Attribut ERDDAP . Zum Beispiel
    ```
        <att name="long\\_name">Eastward Sea Water Velocity</att>
    ```
    *    ERDDAP™ Verwendung von long\\_name zur Kennzeichnung von Achsen auf Diagrammen.
    * Best Practices: Kapitalisieren Sie die Wörter in der long\\_name als ob es ein Titel wäre (Kapitalisieren Sie das erste Wort und alle Nicht-Artikelwörter) . Nicht die Einheiten in der long\\_name . Der lange Name sollte nicht sehr lang sein (normalerweise&lt;20 Zeichen), sollte aber deskriptiver sein als die [ destinationName ](#destinationname) , die oft sehr genau ist.
    * Wenn " long\\_name " wird nicht in der Variable definiert [QuelleBeiträge](#variable-addattributes) oder&lt; addAttributes &gt; ERDDAP™ wird sie erzeugen, indem sie [ standard\\_name ](#standard_name)   (wenn vorhanden) oder destinationName .
         
######  missing\\_value  {#missing_value} 
*    [ ** missing\\_value ** ](#missing_value) und **) Wert**   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) und [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) ) sind variable Attribute, die eine Zahl beschreiben (zum Beispiel -9999) die verwendet wird, um einen fehlenden Wert darzustellen. Zum Beispiel

>  &lt;att name="missing\\_value" [type="double"](#attributetype)\\>-9999&lt;/att>  

Für String-Variablen ist der Standard für beide "" (die leere Saite) .
Für numerische Variablen ist der Standard für beide NaN.
*    ERDDAP™ unterstützt beide missing\\_value und \\_FillValue, da einige Datenquellen ihnen leicht verschiedene Bedeutungen zuordnen.
* Falls vorhanden, sollten sie den gleichen Datentyp haben wie die Variable.
* Wenn die Daten mit [ scale\\_factor und/oder add\\_offset ](#scale_factor) , die missing\\_value und \\_FillValue-Werte sollten ebenfalls verpackt werden. In ähnlicher Weise für eine Spalte mit String-Datum/Zeit-Werten, die eine lokale [ time\\_zone ](#time_zone) , die missing\\_value und \\_FillValue-Werte sollten die lokale Zeitzone verwenden.
* Wenn eine Variable diese Sonderwerte verwendet, missing\\_value und/oder \\_FillValue Attribute sind REQUIRED.
* Für [Zeit- und Zeitstempelvariablen](#time-units)   (ob die Quelle Strings oder numerisch ist) , missing\\_value s und \\_FillValues erscheinen als "" (die leere Saite) wenn die Zeit als String und als NaN geschrieben wird, wenn die Zeit als Doppel geschrieben wird. Die Quellwerte für missing\\_value und \\_FillValue erscheint nicht in den Metadaten der Variablen.
* Für String-Variablen, ERDDAP™ immer konvertiert alle missing\\_value s oder \\_FillValue-Datenwerte in "" (die leere Saite) . Die Quellwerte für missing\\_value und \\_FillValue erscheint nicht in den Metadaten der Variablen.
* Für numerische Variablen:
Die missing\\_value und \\_FillValue erscheint in den Metadaten der Variablen.
Für einige Ausgabedatenformate, ERDDAP™ wird diese Sondernummern intakt lassen, z.B., Sie sehen -9999.
Für andere Ausgabedatenformate (insbesondere textähnliche Formate wie .csv und .htmlTable ) , ERDDAP™ diese Sondernummern durch NaN oder " ersetzen".
* Einige Datentypen haben inhärente fehlende Wertmarker, die nicht explizit mit missing\\_value oder \\_FillValue Attribute: Float und Doppelvariablen haben NaN (Nicht eine Nummer) , String-Werte verwenden den leeren String und Char-Werte haben Zeichen \\uffff   (Zeichen #65535, das ist Unicode's Wert für Nicht ein Zeichen) . Integer-Datentypen haben keine inhärenten fehlenden Wertmarker.
* Wenn eine Ganzzahlvariable einen fehlenden Wert aufweist (beispielsweise eine leere Position in einer .csv-Datei) , ERDDAP™ wird den Wert als definiert interpretieren missing\\_value oder \\_FillValue für diese Variable. Wenn keine definiert ist, ERDDAP™ den Wert als Standard-Vermissungswert für diesen Datentyp interpretiert, der immer der Maximalwert ist, der durch diesen Datentyp gehalten werden kann:
127 für Byte-Variablen, 32767 für kurz, 2147483647 für int, 9223372036854775807 lange,
255 für ubyte, 65535 für ushort, 4294967295 für uint, und 18446744073709551615 für ulong.
######  ADD \\_FillValue ATTRIBUTES ?{#add-_fillvalue-attributes} 
*    [ ADD \\_FillValue ATTRIBUTES ?](#add-_fillvalue-attributes)   
Jedes Mal ERDDAP™ lädt einen Datensatz, es prüft, ob die Variablen mit ganzzahligen Quelldatentypen eine definierte missing\\_value oder \\_FillValue Attribut. Wenn eine Variable nicht, dann ERDDAP™ druckt eine Nachricht an die Protokolldatei (beginnend mit "Add \\_FillValue Attribut?") dies zu empfehlen ERDDAP™ Administrator hinzufügen \\_Fill Wertattribut für diese Variable in datasets.xml . Es ist sehr nützlich für jede Variable, eine \\_FillValue oder missing\\_value weil fehlende Werte immer möglich sind, z.B. wenn eine bestimmte Datei in einem Datensatz keine vorgegebene Größe aufweist, ERDDAP™ muss diese Variable mit allen fehlenden Werten für diese Variable darstellen können. Wenn Sie eine Variable nicht über ein \\_FillValue Attribut entscheiden, können Sie hinzufügen
    &lt;att name="\\_FillValue"&gt;null&lt;/att stattdessen, die die Nachricht dafür unterdrücken wird datasetID +variable Kombination in der Zukunft.
    
Jedes Mal ERDDAP™ startet, sammelt alle diese Empfehlungen in eine Nachricht, die in die Protokolldatei geschrieben wird (beginnend mit " ADD \\_FillValue ATTRIBUTES ?") , E-Mail an die ERDDAP™ Administrator und in eine CSV-Datendatei in der \\[ BigParentDirectory \\] /logs/ Verzeichnis. Wenn Sie möchten, können Sie das Programm GenerateDatasetsXml verwenden (und die Option AddFillValueAttributes) alle Vorschläge in der CSV-Datei auf die datasets.xml Datei. Für jede der datasetID /variable Kombinationen in dieser Datei, wenn Sie sich entscheiden, es gibt keine Notwendigkeit, das Attribut hinzuzufügen, können Sie das Attribut ändern&lt;att name="\\_FillValue"&gt;null&lt;/att&gt; zur Unterdrückung der Empfehlung datasetID +variable Kombination in der Zukunft.
    
Das ist wichtig&#33;
Wie Bob oft gesagt hat: es wäre schlecht (und peinlich) wenn einige der Beweise der globalen Erwärmung durch nicht identifizierte fehlende Werte in den Daten verursacht wurden (z.B. Temperaturen von 99 oder 127 Grad\\_ C, die als fehlende Werte gekennzeichnet sein sollten und somit die mittleren und/oder medianen Statistiken höher) .

* Die \\_FillValue und missing\\_value Werte für eine bestimmte Variable in verschiedenen Quelldateien müssen konsistent sein; andernfalls ERDDAP™ wird Dateien mit einem Satz von Werten akzeptieren und alle anderen Dateien als "Bad Files" ablehnen. Um das Problem zu lösen,
    * Wenn die Dateien gerastert sind .nc Dateien, können Sie verwenden [ EDDGrid VonNcFilesUnpacked](#eddgridfromncfilesunpacked) .
    * Wenn die Dateien tabellarische Dateien sind, können Sie EDDTableFrom...Files ' [Standardisierung Was?](#standardizewhat) zu sagen ERDDAP die Quelldateien zu standardisieren, wie sie eingelesen werden ERDDAP .
    * Für härtere Probleme können Sie [NcML](#ncml-files) oder [ NCO ](#netcdf-operators-nco) das Problem zu lösen.
             
######  scale\\_factor  {#scale_factor} 
*    [ ** scale\\_factor ** ](#scale_factor)   (Standard = 1) und ** add\\_offset **   (Standard = 0)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) und [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) ) sind OPTIONAL-variable Attribute, die Daten beschreiben, die in einem einfacheren Datentyp über eine einfache Transformation verpackt werden.
    * Sofern vorhanden, ist ihr Datentyp von dem Quelldatentyp verschieden und beschreibt den Datentyp der Zielwerte.
Beispielsweise könnte eine Datenquelle Floatdatenwerte mit einer Dezimalstelle gespeichert haben, die als kurze Ints verpackt ist. (In den Warenkorb) , mit scale\\_factor = 0,1 und add\\_offset = 0. Zum Beispiel

    >    &lt;att name="scale\\_factor" [type="float"](#attributetype)\\>0.1&lt;/att>  
    >    &lt;att name="add\\_offset" [type="float"](#attributetype)\\>0&lt;/att>  

In diesem Beispiel ERDDAP™ würde die Daten auspacken und dem Benutzer als Float-Datenwerte präsentieren.
    * Wenn vorhanden, ERDDAP™ extrahiert die Werte aus diesen Attributen, entfernt die Attribute und entpackt automatisch die Daten für den Benutzer:
Bestimmung Wert = Quelle Werte scale\\_factor + add\\_offset   
Oder anders gesagt:
unpackedValue = verpackt Werte scale\\_factor + add\\_offset 
    * Die scale\\_factor und add\\_offset Werte für eine bestimmte Variable in verschiedenen Quelldateien müssen konsistent sein; andernfalls ERDDAP™ wird Dateien mit einem Satz von Werten akzeptieren und alle anderen Dateien als "Bad Files" ablehnen. Um das Problem zu lösen,
        * Wenn die Dateien gerastert sind .nc Dateien, können Sie verwenden [ EDDGrid VonNcFilesUnpacked](#eddgridfromncfilesunpacked) .
        * Wenn die Dateien tabellarische Dateien sind, können Sie EDDTableFrom...Files ' [Standardisierung Was?](#standardizewhat) zu sagen ERDDAP die Quelldateien zu standardisieren, wie sie eingelesen werden ERDDAP .
        * Für härtere Probleme können Sie [NcML](#ncml-files) oder [ NCO ](#netcdf-operators-nco) das Problem zu lösen.
             
######  standard\\_name  {#standard_name} 
*    [ ** standard\\_name ** ](#standard_name)   (von [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) Metadatenstandard) ist ein RECOMMENDED Variable Attribut ERDDAP . CF hält die Liste der zugelassenen [CF-Standardnamen](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html) . Zum Beispiel
    ```
        <att name="standard\\_name">eastward\\_sea\\_water\\_velocity</att>
    ```
    * Wenn Sie hinzufügen standard\\_name zu den Attributen von Variablen und standard\\_name in die Liste der&lt; categoryAttributes &gt; in ERDDAP ' [Setup.xml](/docs/server-admin/deploy-install#setupxml) Datei, Benutzer können leicht finden Datensätze mit ähnlichen Daten über ERDDAP 's "Search for Datasets by Kategorie" auf der Homepage.
    * Wenn Sie eine CF angeben standard\\_name für eine Variable muss das Attribut Einheiten für die Variable nicht mit den für den Standardnamen in der CF Standard-Namenstabelle angegebenen kanonischen Einheiten identisch sein, sondern die Einheiten MUST in die kanonischen Einheiten konvertierbar sein. Zum Beispiel alle temperaturbedingten CF standard\\_name s haben "K" (Kelvin) als kanonische Einheiten. So eine Variable mit einem temperaturbedingten standard\\_name Haben Sie Einheiten von K, Grad\\_C, Grad\\_F oder einige UDUnits-Variante dieser Namen, da sie alle interkonvertierbar sind.
    * Best Practices: Teil der Macht [gesteuerte Vokabeln](https://en.wikipedia.org/wiki/Controlled_vocabulary) kommt von der Nutzung nur der Begriffe in der Liste. Wir empfehlen also, sich an die im kontrollierten Vokabular definierten Begriffe zu halten, und wir empfehlen, einen Begriff zu erstellen, wenn in der Liste kein entsprechender vorhanden ist. Wenn Sie zusätzliche Bedingungen benötigen, sehen Sie, ob der Standardausschuss sie dem kontrollierten Wortschatz hinzufügen wird.
    *    standard\\_name Werte sind die einzigen CF Attributwerte, die case sensitive sind. Sie sind immer alle Kleinen. Beginnen ERDDAP™ v1.82, GenerateDatasets wird Großbuchstaben in Kleinbuchstaben konvertieren. Und wenn ein Datensatz geladen wird ERDDAP , Großbuchstaben werden still in Kleinbuchstaben geändert.
         
######  time\\_precision  {#time_precision} 
*    time\\_precision ist ein OPTIONAL Attribut, das von ERDDAP™   (und keine Metadatenstandards) für [Zeit- und Zeitstempelvariablen](#time-units) , die in netzgebundenen Datensätzen oder tabellarischen Datensätzen sein können, und in axisVariable s oder dataVariable S. Zum Beispiel
    ```
        <att name="time\\_precision">1970-01-01</att>  
    ```
     time\\_precision gibt die zu verwendende Präzision an, wenn ERDDAP™ formatiert die Zeitwerte dieser Variablen als Strings auf Webseiten, einschließlich .htmlTable Antworten. In Dateiformaten, in denen ERDDAP™ Formate Zeiten als Zeichenketten (z.B. .csv und .json ) , ERDDAP™ nur verwendet time\\_precision - angegebenes Format, wenn es fraktionierte Sekunden enthält; andernfalls ERDDAP™ verwendet 1970-01T00:00 Z-Format.
* Gültige Werte sind 1970-01, 1970-01-01-01-01T00Z, 1970-01-01T00:00Z, 1970-01-01T00:00Z (Der Standard) , 1970-01-01T00:00:00:00.0Z, 1970-01-01T00:00:00:00.00Z, 1970-01-01T00:00:00:00.000Z. \\[ 1970 ist keine Option, weil es eine einzige Zahl ist, also ERDDAP™ kann nicht wissen, ob es sich um einen formatierten Zeitstring handelt (Jahr) oder wenn es einige Sekunden seit 1970-01-01T00:00Z ist. \\] 
* wenn time\\_precision wird nicht spezifiziert oder der Wert nicht angepasst, der Standardwert wird verwendet.
* Hier wie in anderen Teilen ERDDAP™ , alle Felder der formatierten Zeit, die nicht angezeigt werden, werden angenommen, um den Mindestwert zu haben. Zum Beispiel 1985-07, 1985-07-01, 1985-07-01T00Z, 1985-07-01T00:00Z und 1985-07-01T00:00:00 Z gelten alle als gleichwertig, obwohl mit unterschiedlichen Genauigkeitsstufen impliziert. Das passt zu [ISO 8601:2004 "extended" Zeitformat Spezifikation](https://www.iso.org/iso/date_and_time_format) .
*    **WARNING:** Sie sollten nur eine begrenzte time\\_precision wenn **alle** der Datenwerte für die Variable haben nur den Mindestwert für alle Felder, die versteckt sind.
    * Zum Beispiel können Sie eine time\\_precision von 1970-01-01, wenn alle Datenwerte Stunde = 0, Minute = 0 und Sekunde = (zum Beispiel 2005-03-04T00:00Z und 2005-03-05T00:00Z) .
    * Verwenden Sie zum Beispiel keine time\\_precision von 1970-01, wenn es nicht-0 Stunden, Minute oder Sekunden Werte, (zum Beispiel 2005-03-05T12:00:00Z) weil der nicht-Standard-Stundenwert nicht angezeigt werden würde. Andernfalls, wenn ein Benutzer für alle Daten mit time=2005-03-05 fragt, wird die Anfrage unerwartet scheitern.
             
######  time\\_zone  {#time_zone} 
*    [ ** time\\_zone ** ](#time_zone) 
    *    time\\_zone ist ein OPTIONAL Attribut, das von ERDDAP™   (und keine Metadatenstandards) für [Zeit- und Zeitstempelvariablen](#time-units) , die in Rasterdatensätzen oder tabellarischen Datensätzen vorliegen können.
    * Der Standard ist " Zulu " (die moderne Zeitzone Version von GMT) .
    * Hintergrundinformationen: "Zeitversetzungen" (z.B. Pacific Standard Time, -08:00, GMT-8) sind feste, spezifische Versätze relativ zu Zulu   (GMT) . Im Gegensatz dazu sind "Zeitzonen" die viel komplexeren Dinge, die von Daylight Saving beeinflusst werden (z.B. "US/Pacific") , die an verschiedenen Orten unterschiedliche Regeln hatten. Die Zeitzonen haben immer Namen, da sie nicht durch einen einfachen Offsetwert zusammengefasst werden können. (die Spalte "TZ-Datenbanknamen" in der Tabelle an [https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) ) . ERDDAP ' time\\_zone Attribut hilft Ihnen, lokale Zeitdaten aus einer Zeitzone zu behandeln (z.B. 1987-03-25T17:32:05 ) Zeit) . Wenn Sie String- oder numerische Zeitdaten mit einer (fest) Zeitversatz, sollten Sie einfach die Daten anpassen Zulu   (das ist was ERDDAP™ will) durch Angabe einer anderen Basiszeit im Attribut Einheiten (z.B. "Stunden seit 1970-01-01T08:00Z", beachten Sie den T08, um den Zeitversatz anzugeben) , und immer überprüfen Sie die Ergebnisse, um sicherzustellen, dass Sie die gewünschten Ergebnisse erhalten.
    * Für Zeitstempelvariablen mit Quelldaten von Strings können Sie mit diesem Attribut eine Zeitzone angeben, die führt ERDDAP™ um die lokalen Zeitzonen-Quellenzeiten zu konvertieren (einige in Standardzeit, einige in Tageslicht Sparzeit) in Zulu Zeiten (die immer in Standardzeit sind) . Die Liste der gültigen Zeitzonennamen ist wahrscheinlich identisch mit der Liste in der TZ Spalte bei [https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) . Gemeinsame US-Zeitzonen sind: US/Hawaii, US/Alaska, US/Pacific, US/Mountain, US/Arizona, US/Central, US/Eastern.
    * Für Zeitstempelvariablen mit numerischen Quelldaten können Sie die " time\\_zone "Attribut, aber der Wert muss " Zulu " oder "UTC". Wenn Sie Unterstützung für andere Zeitzonen benötigen, mailen Sie bitte Chris. John bei noaa.gov.
         
###### Einheiten{#units} 
*    [ **Einheiten** ](#units)   ( [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) , [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) und [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandard) definiert die Einheiten der Datenwerte. Zum Beispiel
    ```
        <att name="units">degree\\_C</att>
    ```
    * "units" ist REQUIRED entweder als SourceAttribute oder als AddAttribute für "time" Variablen und ist STRONGLY RECOMMENDED für andere Variablen, wann immer es angemessen ist (die fast immer) .
    * Im Allgemeinen empfehlen wir [UDUniten](https://www.unidata.ucar.edu/software/udunits/) \\-kompatible Einheiten, die von der [ COARDS ](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) und [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) Normen.
    * Ein weiterer gemeinsamer Standard ist [UCUM](https://unitsofmeasure.org/ucum.html) -- der Einheitliche Kodex für Maßeinheiten. [ OGC ](https://www.ogc.org/) Dienstleistungen wie [ SOS ](https://www.ogc.org/standards/sos) , [ WCS ](https://www.ogc.org/standards/wcs) , und [ WMS ](https://www.ogc.org/standards/wms) benötigen UCUM und beziehen sich oft auf UCUM als UOM (Maßeinheiten) .
    * Wir empfehlen Ihnen, für alle Datensätze in Ihrem Standard eine Einheit zu verwenden ERDDAP . Du solltest es sagen. ERDDAP™ welchen Standard Sie mit&lt;Einheiten\\_standard&gt;, in Ihrer [Setup.xml](/docs/server-admin/deploy-install#setupxml) Datei.
    * Die Einheiten für eine bestimmte Variable in verschiedenen Quelldateien müssen konsistent sein. Wenn Sie eine Sammlung von Datendateien haben, in denen eine Teilmenge der Dateien verschiedene Einheitenwerte verwendet als eine oder mehrere andere Teilmengen der Dateien (z.B.
"Tage seit 1985-01" gegen "Tage seit 2000-01",
"degree\\_Celsius" gegen "deg\\_C" oder
"Knoten" gegen "m/s") müssen Sie einen Weg finden, die Einheitenwerte zu standardisieren, andernfalls, ERDDAP™ nur eine Teilmenge der Dateien laden. Denken Sie darüber nach: Wenn eine Datei WindSpeed-Einheiten=Knoten hat und eine andere WindSpeed-Einheiten=m/s hat, sollten die Werte aus den beiden Dateien nicht im gleichen aggregierten Datensatz enthalten sein.
        * Wenn die Dateien gerastert sind .nc Dateien, in vielen Situationen können Sie verwenden [ EDDGrid VonNcFilesUnpacked](#eddgridfromncfilesunpacked) .
        * Wenn die Dateien tabellarische Dateien sind, können Sie in vielen Situationen EDDTableFrom...Files ' [Standardisierung Was?](#standardizewhat) zu sagen ERDDAP die Quelldateien zu standardisieren, wie sie eingelesen werden ERDDAP .
        * Für härtere Probleme können Sie [NcML](#ncml-files) oder [ NCO ](#netcdf-operators-nco) das Problem zu lösen.
    * Der CF-Standard-Abschnitt 8.1 sagt, dass wenn die Daten einer Variablen über [ scale\\_factor und/oder add\\_offset ](#scale_factor) , "Die Einheiten einer Variablen sollten repräsentativ für die ausgepackten Daten sein."
    *    [Für Zeit- und Zeitstempelvariablen,](#time-units) entweder die Variable [QuelleBeiträge](#variable-addattributes) oder&lt; addAttributes &gt; (das vorausgeht) MUSS [Einheiten](#units) die entweder
        
        * Für Zeitachsenvariablen oder Zeitdatenvariablen mit numerischen Daten: [UDUniten](https://www.unidata.ucar.edu/software/udunits/) \\-kompatibler String (mit dem Format *Einheiten* seit *Basiszeit* ) beschreiben, wie Quellzeitwerte interpretiert werden (zum Beispiel, Sekunden seit 1970-01-01T00:00Z) .
            
         *Einheiten* kann jeder von:
        ```
            ms, msec, msecs, millis, millisec, millisecs, millisecond, milliseconds,  
            s, sec, secs, second, seconds, m, min, mins, minute, minutes, h, hr, hrs, hour, hours,  
            d, day, days, week, weeks, mon, mons, month, months, yr, yrs, year, or years.  
        ```
Technisch gesehen ERDDAP™ folgt NICHT UDUNITS Standard beim Konvertieren "years since" und "months since" Zeitwerte bis "seconds since" . Die UDUNITS Standard definiert ein Jahr als Festwert: 3.15569259747e7 Sekunden. Und UDUNITS definiert einen Monat als Jahr/12. Leider, die meisten / alle Datensätze, die wir gesehen haben, dass Verwendung "years since" oder "months since" klar beabsichtigen, dass die Werte Kalenderjahre oder Kalendermonate sind. Zum Beispiel 3 "months since 1970-01-01" gemeint ist in der Regel 1970-04-01. Also, ERDDAP™ Dolmetschen "years since" und "months since" als Kalenderjahre und Monate, und nicht streng folgen UDUNITS Standard.
            
Die *Basiszeit* muss eine ISO 8601:2004 sein (E) formatiert Datum Zeitkette ( yyyy-MM-dd 'T'HH:mm:ssZ, zum Beispiel 1970-01-01T00:00Z) , oder eine Variation davon (zum Beispiel mit am Ende fehlenden Teilen) . ERDDAP™ versucht, mit einer Vielzahl von Variationen dieses idealen Formats zu arbeiten, beispielsweise wird "1970-1-1 0:0:0" unterstützt. Wenn die Zeitzoneninformation fehlt, wird davon ausgegangen, dass die Zulu Zeitzone (AKA GMT) . Selbst wenn ein anderer Zeitversatz angegeben ist, ERDDAP™ nie verwendet Daylight Sparzeit. Wenn die BaseTime ein anderes Format verwendet, müssen Sie&lt; addAttributes &gt; zur Angabe einer neuen Einheitenkette, die eine Änderung der ISO 8601:2004 verwendet (E) Format (z.B. Wechseltage seit 1. Januar 1985 in Tage seit 1985-01.
        
Sie können testen ERDDAP 's Fähigkeit, mit einem bestimmten *Einheiten* seit *Basiszeit* mit ERDDAP ' [Time Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) . Hoffentlich können Sie eine Nummer einstecken (den ersten Zeitwert aus der Datenquelle?) und eine Einheitenfolge, klicken Sie auf Konvertieren, und ERDDAP™ wird sie in eine ISO 8601:2004 umwandeln können (E) formatiert Datum Zeitkette. Der Konverter gibt eine Fehlermeldung zurück, wenn die Einheitenfolge nicht erkennbar ist.

###### String Time Units{#string-time-units} 
*    [Für die Einheiten Attribut für Zeit- oder Zeitstempeldatenvariablen mit String-Daten,](#string-time-units) Sie müssen [java.time.DateTimeFormatter](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) Muster (die meist mit java.text kompatibel ist. Einfaches Format) die beschreibt, wie man die String-Zeiten interpretiert.
    
Für die häufig verwendeten Zeitformate, die Variationen der ISO 8601:2004 sind (E) Standardformat (zum Beispiel, 2018-01-02T00:00Z) , Sie können Variationen angeben yyyy-MM-dd 'T'HH:mm:ssZ zum Beispiel yyyy-MM-dd wenn die Stringzeit nur ein Datum hat. Für jedes Format, das mit yyyyy-M beginnt, ERDDAP verwendet einen speziellen Parser, der sehr vergeben von kleinen Variationen im Format ist. Der Parser kann Zeitzonen im Format 'Z', "UTC", "GMT", ±XX, ±XX und ±XX Formate verarbeiten. Wenn Teile der Datumszeit nicht angegeben sind (z.B. Minuten und Sekunden) , ERDDAP™ den niedrigsten Wert für dieses Feld annimmt (z.B., wenn Sekunden nicht angegeben sind, wird von Sekunden = 0 ausgegangen.) .
    
Für alle anderen String-Zeitformate müssen Sie einen DateTimeFormatter-kompatiblen Zeitformat-String genau festlegen. Wie yyyy-MM-dd 'T'HH:mm:ssZ, diese Format-Strings sind aus Zeichen, die eine bestimmte Art von Informationen aus der Zeitkette identifizieren, z.B. m bedeutet Minute-of-hour. Wenn Sie das Formatzeichen einige Male wiederholen, verfeinert es die Bedeutung, z.B. m bedeutet, dass der Wert durch jede Anzahl von Ziffern vorgegeben werden kann, mm bedeutet, dass der Wert durch 2 Ziffern vorgegeben werden muss. Die Java Die Dokumentation für DateTimeFormatter ist eine grobe Übersicht und macht diese Details nicht deutlich. Hier ist also eine Liste von Formatcharaktervariationen und deren Bedeutung in ERDDAP™   (die sich manchmal etwas von Java DatumTimeFormatter) :
    
     | Zeichen | Beispiele | Bedeutung | 
     | -- | -- | -- | 
     | U, y, Y | \\-4712, 0, 1, 10, 100, 2018 | eine Jahreszahl, jede Zahl von Ziffern. ERDDAP™ Leckereien (Jahr) und Y (Wochen-basiertes Jahr, da dies oft irrtümlich anstelle von y verwendet wird) wie u, die [Anzahl der Tage](https://en.wikipedia.org/wiki/Astronomical_year_numbering) . Astronomische Jahre sind positive oder negative Zahlen, die die BCE nicht verwenden (BC) oder CE (ADAC) Raddesigner: 2018=2018CE, ..., 2=2CE, 1=1CE, 0=1BCE, -1=2BCE, -2=3BCE, ... | 
     | uuuuu, yyyy, YYY | \\-4712, 0000, 0001, 0010, 0100, 2018 | eine 4stellige astronomische Jahreszahl (ignorieren alle vorhergehenden '-')   | 
     | M | 1, 01, 12 | eine Monatsnummer, jede Zahl von Ziffern (1 = Januar)   | 
     | MM | 01, 12 | 2stellig (Null gepolstert) Monat | 
     | MMM | Jan, jan, JAN | ein 3 Buchstaben englischer Monatsname, Fall unempfindlich | 
     | MMMM | Jan, jan, JAN, Januar, Januar, Januar, JANUAR | ein 3 Buchstaben oder voller englischer Monat Name, Fall unempfindlich | 
     | dgl. | 1, 01, 31 | pro Monat, jede Zahl von Ziffern | 
     | d) | 01, 31 | 2stellig (Null gepolstert) Tag des Monats. Das erste 'stellige' kann ein Raum sein. | 
     | D | 1, 001, 366 | Tag-of-Jahr, jede Anzahl von Ziffern, 001=Jan 1 | 
     | DDD | 001, 366 | Tag des Jahres, 3 Ziffern, 001=Jan 1 | 
     | EEE | thu, THU, Thu | ein 3 Buchstaben Tag der Woche, Wert wird beim Parsing ignoriert | 
     | EEEE | thu, THU, Thu, Donnerstag, Donnerstag | ein 3 Buchstaben oder voll englischer Tag der Woche, Fall unempfindlich, Wert wird beim Parsing ignoriert | 
     | H | 0, 00, 23 | H Tagesstunde (0-23) , jede Zahl von Ziffern | 
     | HH | 00, 23 | HH Tagesstunden (00-23) 2 Ziffern. Das erste 'stellige' kann ein Raum sein. | 
     | eine | am, AM, pm, PM | AM oder PM, case-insensitive | 
     | H | 12, 1, 01, 11 | Uhrzeit von morgens (12, 1, 2, 11) , jede Zahl von Ziffern | 
     | H | 12, 01, 11 | Uhrzeit von morgens (12, 1, 2, 11) 2 Ziffern. Das erste 'stellige' kann ein Raum sein. | 
     | K | 0, 1, 11 | Stunde (0, 1, ...11) , jede Zahl von Ziffern | 
     | KK | 00, 01, 11 | Uhrzeit, 2 Ziffern | 
     | m | 0, 00, 59 | min-of-hour, jede Anzahl von Ziffern | 
     | mm | 00, 59 | Minute-of-Stunde, 2 Stellen | 
     | S | 0, 00, 59 | Zweite Minute, jede Anzahl von Ziffern | 
     | S | 00, 59 | 2stellig, 2stellig | 
     | S | 0, 000, 9, 999 | Bruchteil von Sekunden, als ob nach einem Dezimalpunkt, jede Anzahl von Ziffern | 
     | SS | 00, 99 | Hundertstel einer zweiten, 2 Ziffern | 
     | SSS | 000, 999 | Tausende von Sekunden, 3 Ziffern | 
     | A | 0, 0000, 86399999 | Millisekunden von Tag, jede Anzahl von Ziffern | 
     | AAAAAAA | 00000000, 86399999 | Millisekunden-of-day, 8 Stellen | 
     | N | 0, 00000000000000, 863999999999999 | Nanosekunden von Tag, jede Anzahl von Ziffern. In ERDDAP™ , das ist zu nMillis gekürzt. | 
     | NNNNNNNNNNNNNNNNNN | 0000000000000000000000, 863999999999999 | Nanosekunden von Tag, 14 Ziffern. In ERDDAP™ das ist zu nMillis gekürzt. | 
     | n | 0, 000000000000000, 59999999999 | Nanosekunden, jede Anzahl von Ziffern. In ERDDAP™ das ist zu nMillis gekürzt. | 
     | nnnnnnnnn | 000000000000000, 59999999999 | Nanosekunden, 11 Ziffern. In ERDDAP™ das ist zu nMillis gekürzt. | 
     | XXX, ZZZ | Z, -08:00, +01:00 | eine Zeitzone mit dem Format 'Z' oder ± (2stellige Stunde Offset) : (2stellige Minute Offset) . Diese Leckereien *Raum* als + (Nicht-Standard) . ZZZ-Unterstützung 'Z' ist nicht standardmäßig, sondern befasst sich mit einem gemeinsamen Benutzerfehler. | 
     | XX, ZZ | Z -0800, +0100 | eine Zeitzone mit dem Format 'Z' oder ± (2stellige Stunde Offset) : (2stellige Minute Offset) . Diese Leckereien *Raum* als + (Nicht-Standard) . ZZ-Unterstützung 'Z' ist nicht standardmäßig, sondern befasst sich mit einem gemeinsamen Benutzerfehler. | 
     | X, Z | Z, -08, +01 | eine Zeitzone mit dem Format 'Z' oder ± (2stellige Stunde Offset) : (2stellige Minute Offset) . Diese Leckereien *Raum* als + (Nicht-Standard) . Z unterstützt 'Z' ist nicht standardmäßig, sondern beschäftigt sich mit einem gemeinsamen Benutzerfehler. | 
     | Xxx | \\-08:00, +01:00 | eine Zeitzone mit dem Format ± (2stellige Stunde Offset) : (2stellige Minute Offset) . Diese Leckereien *Raum* als + (Nicht-Standard) . | 
     | xx | \\-0800, +0100 | eine Zeitzone mit dem Format ± (2stellige Stunde Offset)  (2stellige Minute Offset) . Diese Leckereien *Raum* als + (Nicht-Standard) . | 
     | x | \\-08, +01 | eine Zeitzone mit dem Format ± (2stellige Stunde Offset) . Diese Leckereien *Raum* als + (Nicht-Standard) . | 
     | ' | 'T', 'Z', 'GMT' | Beginn und Ende einer Reihe von literarischen Zeichen | 
     | ' ' (zwei einzelne Zitate)   | ' ' | zwei einzelne Zitate ein buchstäbliches einzelnes Zitat | 
     |   \\[  \\]   |   \\[   \\]   | Beginn (" \\[ ") und Ende (" \\] ") eines optionalen Abschnitts. Diese Notation wird nur für wörtliche Zeichen und am Ende der Formatfolge unterstützt. | 
     | #, & #123;, & #125; | #, & #123;, & #125; | reserviert für zukünftige Nutzung | 
     | G,L,Q,e,c,V,z,O,p |       | Diese Formatierungszeichen werden unterstützt von Java 's DateTimeFormatter, aber derzeit nicht von ERDDAP . Wenn Sie Unterstützung für sie benötigen, mailen Sie Chris. John bei noaa.gov. | 
    
Anmerkungen:
    
    * In einer Datumszeit mit Punktion können numerische Werte eine variable Anzahl von Ziffern haben (z.B. im US-Slash-Datumsformat "1/2/1985" können der Monat und das Datum 1 oder 2 Ziffern betragen) so muss das Format 1-Buchstaben-Token verwenden, z.B. M/d/yyyy, die jede Anzahl von Ziffern für Monat und Datum akzeptieren.
    * Ist die Anzahl der Ziffern für einen Gegenstand konstant, z.B. 01/02/1985, so geben Sie die Anzahl der Ziffern im Format an, z.B. MM/dd/yyyy für 2-stelligen Monat, 2-stelliges Datum und 4stelliges Jahr.
    * Diese Formate sind knifflig zu arbeiten. Ein vorgegebenes Format kann für die meisten, aber nicht alle, Zeitstrings für eine bestimmte Variable arbeiten. Überprüfen Sie immer, ob das angegebene Format wie erwartet funktioniert ERDDAP für alle Zeitketten einer Variablen.
    * Wenn möglich, GenerateDatasetXml wird Zeitformat-Strings vorschlagen.
    * Wenn Sie Hilfe benötigen, um einen Format-String zu generieren, senden Sie bitte Chris. John bei noaa.gov.

Die Hauptzeitdatenvariable (für tabellarische Datensätze) und die Hauptzeitachse variabel (für gegitterte Datensätze) von der [ destinationName ](#destinationname) Zeit. Ihre Einheiten Metadaten müssen ein UDUnits-kompatibler Einheitenstring für numerische Zeitwerte sein, z.B. "Tage seit 1970-01-01" (für tabellarische oder gitterierte Datensätze) , oder [Einheiten geeignet für Stringzeiten](#string-time-units) , z.B. "M/d/yyyy" (für tabellarische Datensätze) .

Verschiedene Zeiteinheiten in verschiedenen Gridded .nc Dateien - Wenn Sie eine Sammlung von gegitterten .nc Dateien, bei denen für die Zeitvariable eine Teilmenge der Dateien verschiedene Zeiteinheiten als eine oder mehrere andere Teilmengen der Dateien verwendet, können Sie [ EDDGrid VonNcFilesUnpacked](#eddgridfromncfilesunpacked) . Es wandelt Zeitwerte in "seconds since 1970-01-01T00:00:00Z" auf einer niedrigeren Ebene, wodurch die Unterschiede versteckt werden, so dass Sie einen Datensatz aus der Sammlung heterogener Dateien machen können.

###### TimeStamp Variablen{#timestamp-variables} 
 [TimeStamp Variablen](#timestamp-variables) -- Jede andere Variable ( axisVariable oder dataVariable in einem EDDGrid oder EDDTable-Datensatz) kann eine TimeStamp-Variable sein. Timestamp-Variablen sind Variablen, die zeitbezogene Einheiten und Zeitdaten haben, aber eine&lt; destinationName &gt; andere als die Zeit. TimeStamp Variablen verhalten sich wie die Hauptzeitvariable, indem sie das Zeitformat der Quelle in "seconds since 1970-01-01T00:00:00Z" und/oder ISO 8601:2004 (E) Format). ERDDAP™ erkennt Zeit Stamp-Variablen nach ihrer zeitbezogenen " [Einheiten](#units) " Metadaten, die diesem regulären Ausdruck entsprechen müssen " \\[ a-zA-Z \\] + + + + \\[ 0-9 \\] .+" (für numerisches Datum Zeiten, zum Beispiel "seconds since 1970-01-01T00:00:00Z" ) oder ein Datum sein Zeitformat-String mit "uuuu", "yyyy" oder "YYYY" (zum Beispiel " yyyy-MM-dd "T'HH:mm:ssZ") . Aber bitte immer noch benutzen destinationName   "time" für das Hauptdatum Zeitvariable.

 **Überprüfen Sie immer Ihre Arbeit, um sicherzustellen, dass die Zeitdaten, die in ERDDAP™ die richtigen Zeitdaten.** Die Arbeit mit Zeitdaten ist immer knifflig und fehleranfällig.

Vgl. [mehr Informationen zu Zeitvariablen](#destinationname) .
 ERDDAP™ hat ein Dienstprogramm [Numerisch umrechnen Zeit für/von einer Streichzeit](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) .
Vgl. [Wie ERDDAP™ Angebote mit Zeit](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap) .
         
        
######  valid\\_range  {#valid_range} 
*    [ ** valid\\_range ** , oder ** valid\\_min ** und ** valid\\_max ** ](#valid_range) -- Dies sind OPTIONAL-variable Attribute, die in der [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) Metadatenkonventionen. Zum Beispiel

    >    &lt;att name="valid\\_range" [type="floatList"](#attributetype)\\>0.0 40.0&lt;/att>  

oder

    >    &lt;att name="valid\\_min" [type="float"](#attributetype)\\>0.0&lt;/att>  
    >    &lt;att name="valid\\_max" [type="float"](#attributetype)\\>40.0&lt;/att>  

    * Falls vorhanden, sollten sie den gleichen Datentyp wie die Variable haben und die gültigen Mindest- und Maximalwerte der Daten für diese Variable festlegen. Benutzer sollten Werte außerhalb dieses Bereichs als ungültig betrachten.
    *    ERDDAP™ nicht gelten valid\\_range . Sagte einen anderen Weg: ERDDAP™ keine Datenwerte außerhalb der valid\\_range zum \\_Fill Wert oder missing\\_value . ERDDAP™ übergibt diese Metadaten und lässt die Anwendung bis zu Ihnen.
Warum? Das ist, wofür diese Metadaten sind. Wenn der Datenanbieter gewünscht hätte, hätte der Datenanbieter die Datenwerte außerhalb der valid\\_range zu sein \\_FillValues. ERDDAP™ erraten nicht den Datenanbieter. Dieser Ansatz ist sicherer: wenn später gezeigt wird, dass valid\\_range war zu schmal oder sonst falsch, ERDDAP™ die Daten nicht vernichtet haben.
    * Wenn die Daten mit [ scale\\_factor und/oder add\\_offset ](#scale_factor) , valid\\_range , valid\\_min und valid\\_max sollte der gepackte Datentyp und die Werte sein. Seit ERDDAP™ Anwendungsbereich scale\\_factor und add\\_offset wenn es den Datensatz lädt, ERDDAP™ wird entpacken valid\\_range , valid\\_min und valid\\_max Werte, so dass die Ziel-Metadaten (den Benutzern angezeigt) wird den ausgepackten Datentyp und -bereich angeben.
Oder wenn ein Auspacken valid\\_range Attribut ist vorhanden, es wird umbenannt valid\\_range wenn ERDDAP™ lädt den Datensatz.
##### &lt;entfernenMVRows&gt;{#removemvrows} 
* ( ** &lt;EntfernenMVRows&gt; ** &#33; (#removemvrows) ist ein OPTIONAL-Tag innerhalb eines Tags in datasets.xml für EDDTableFromFiles (einschließlich aller Unterklassen) datasets, obwohl es nur für EDDTableFromMultidimNcFiles verwendet wird. Es kann einen Wert von wahr oder falsch haben. Zum Beispiel, wahr
Dies entfernt jeden Block von Zeilen am Ende einer Gruppe, wo alle Werte sind missing\\_value , \\_FillValue oder der CoHort ...Array nativen fehlenden Wert (oder char=#32 für CharArrays) . Dies ist für den CF DSG Multidimensional Array Dateityp und ähnliche Dateien. Wenn zutreffend, dies tut die richtige Prüfung und so lädt immer alle max-Dim-Variablen, so kann es zusätzliche Zeit.
Der Standardwert ist falsch.
Empfehlung -- Wenn möglich für Ihren Datensatz empfehlen wir, removeMVRows auf false zu setzen. Das Setzen von removeMVRows to true kann die Anfragen erheblich verlangsamen, kann jedoch für einige Datensätze benötigt werden.
