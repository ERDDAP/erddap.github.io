---
title: "EDDTableFromEML"
sidebar_position: 6
---
# Der EDDTableFromEML und EDDTableFromEMLBatch Optionen in GenerateDatasets Xml

 \\[ Diese Webseite wird nur von Interesse sein ERDDAP™ Administratoren, die mit EML-Dateien arbeiten.
Dieses Dokument wurde ursprünglich im Jahr 2016 erstellt. Es wurde zuletzt am 2020-11-30 bearbeitet. \\] 

 [ ** ERDDAP™ ** ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) ist ein Datenserver, der den Benutzern eine einfache, konsistente Möglichkeit gibt, Teilmengen von gegitterten und tabellarischen wissenschaftlichen Datensätzen in gemeinsamen Dateiformaten herunterzuladen und Grafiken und Karten zu erstellen. ERDDAP™ arbeitet mit einem bestimmten Datensatz als entweder eine Gruppe von multidimensionalen gitterförmigen Variablen (z.B. Satelliten- oder Modelldaten) oder als datenbankähnliche Tabelle (mit einer Spalte für jede Art von Informationen und einer Zeile für jede Beobachtung) . ERDDAP™ ist Freie und Open Source Software, so dass jeder kann [herunterladen und installieren ERDDAP™ ](/docs/server-admin/deploy-install) um ihre Daten zu bedienen.

Einen Datensatz zu einem hinzufügen ERDDAP™ Installation, die ERDDAP™ Administrator muss einen chunk von XML hinzufügen, der den Datensatz in eine Datei namens datasets.xml . (Es gibt [gründliche Dokumentation datasets.xml ](/docs/server-admin/datasets) .) Obwohl es möglich ist, den chunk von XML für datasets.xml vollständig von Hand, ERDDAP™ kommt mit einem Werkzeug namens [ **GenerateDatasetsXml** ](/docs/server-admin/datasets#tools) die den groben Entwurf des für einen gegebenen Datensatz benötigten XML-Chunks basierend auf einer Informationsquelle über den Datensatz erzeugen kann.

Das erste, was GenerateDatasets Xml fragt, welche Art von Datensatz Sie erstellen möchten. Datensätze generieren Xml hat eine spezielle Option, **EDDTableFromEML** , die die Informationen in einem [Ökologische Metadatensprache (EML) ](https://knb.ecoinformatics.org/external//emlparser/docs/index.html) XML-Datei, um den chunk von XML für datasets.xml um ein [EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles) Datensatz aus jeder Datentabelle in einer EML-Datei. Dies funktioniert sehr gut für die meisten EML-Dateien, vor allem weil EML-Dateien eine hervorragende Aufgabe der Speicherung aller benötigten Metadaten für einen Datensatz in einem einfach zu handhabenden Format. Die Informationen, die GenerateDatasetsXml die Datensätze erstellen muss, sind in der EML-Datei, einschließlich der URL für die Datendatei, die GenerateDatasetsXml Downloads, Parses und vergleicht mit der Beschreibung in der EML-Datei. (Viele Gruppen würden gut tun, um auf EML umzuschalten, was ein großartiges System zur Dokumentation eines tabellarischen wissenschaftlichen Datensatzes ist, nicht nur ökologische Daten. Und viele Gruppen, die XML-Schema erstellen, würden gut tun, um EML als Fallstudie für XML-Schema zu verwenden, die klar sind, zum Punkt, nicht zu tief (d.h. zu viele Ebenen) , und einfach für Menschen und Computer mit zu arbeiten.) 

## Fragen{#questions} 

Hier sind alle Fragen GenerateDatasets Xml wird fragen, mit Kommentaren, wie Sie antworten sollten, wenn Sie nur eine EML-Datei oder eine Charge von EML-Dateien verarbeiten möchten:

* Welcher EDDType?
Wenn Sie nur eine Datei bearbeiten möchten, antworten Sie: EDDTableFromEML
Wenn Sie eine Gruppe von Dateien bearbeiten möchten, antworten Sie: EDDTableFromEMLBatch
* Verzeichnis, um Dateien zu speichern?
Geben Sie den Namen des Verzeichnisses ein, mit dem heruntergeladene EML- und/oder Datendateien gespeichert werden.
Wenn das Verzeichnis nicht existiert, wird es erstellt.
*    (Für EDDTableFromEML nur) EML URL oder lokale DateiName?
Geben Sie die URL oder den lokalen Dateinamen einer EML-Datei ein.
*    (Nur für EDDTableFromEMLBatch) EML dir (URL oder lokal) ?
Geben Sie den Namen des Verzeichnisses mit den EML-Dateien ein (eine URL oder einen lokalen Schmutz) .
Zum Beispiel:http://sbc.lternet.edu/data/eml/files/
*    (Nur für EDDTableFromEMLBatch) Dateiname regex?
Geben Sie den regulären Ausdruck ein, mit dem die gewünschten EML-Dateien im EML-Verzeichnis identifiziert werden.
Zum Beispiel: knb-lter-sbc\\\\\\d+
* Lokale Dateien verwenden, wenn vorhanden (wahr | falsch) ?
Geben Sie true ein, um die vorhandenen lokalen EML-Dateien und Dateien zu verwenden, wenn sie vorhanden sind.
Geben Sie falsch ein, um die EML-Dateien und/oder Datendateien immer wieder herunterzuladen.
* zugänglich Zu?
Wenn Sie wollen, dass die neuen Datensätze private Datensätze in ERDDAP , den Namen der Gruppe angeben (S) der Zugang erlaubt ist.
Empfohlen für LTER-Gruppen: kombinieren "lter" plus die Gruppe, z.B. Lter Sbc.
Wenn Sie "null" eingeben, gibt es keine&lt;zugänglich Zu &gt; Tag in der Ausgabe.
Vgl. [zugänglich Zu](/docs/server-admin/datasets#accessibleto) .
* Ort ZeitZone (z.B., US/Pacific) ?
Wenn eine Zeitvariable angibt, dass sie lokale Zeitwerte hat, wird diese Zeitzone zugewiesen.
Dies muss ein Wert von [TZ Spaltenliste der Zeitzonennamen](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) .
Beachten Sie alle einfach zu bedienenden "US/..." Namen am Ende der Liste.
Wenn Sie später feststellen, dass, um falsch zu sein, können Sie die time\\_zone in der Schlampe datasets.xml .

EML plus ERDDAP™ ist eine tolle Kombination, da ERDDAP™ kann den Benutzern einen direkten Zugang zum Reichtum geben [Wissensnetzwerk für Biokomplexität (KN-Code) ](https://knb.ecoinformatics.org/) und [Langfristige ökologische Forschung (LTER) ](https://lternet.edu/) Daten und Hilfe für diese Projekte, die die US-Regierung treffen [Öffentlicher Zugang zu Forschungsergebnissen (PARR) Anforderungen](https://nosc.noaa.gov/EDMC/PD.DSP.php) durch Bereitstellung der Daten über einen Webservice. Auch, EML plus ERDDAP™ scheint wie eine große Brücke zwischen Wissenschaftlern im akademischen / NSF-finanzierten Reich und Wissenschaftlern in der Bundesagentur ( NOAA , NASA, USGS) Reich.

Sehen Sie uns [Abschnitt zum Erhalt zusätzlicher Unterstützung](/docs/intro#support) .
 
## Design Details{#design-details} 

Hier sind die Designdetails der EDDTableFromEML Option in GenerateDatasetsXml.
Einige beziehen sich auf Unterschiede, wie EML und ERDDAP™ Dinge tun und wie GenerateDatasets Xml behandelt diese Probleme.

### One dataTable Becomes One ERDDAP™ Datensatz{#one-datatable-becomes-one-erddap-dataset} 
Eine EML-Datei kann mehrere&lt;Daten Tabelle &gt;s. ERDDAP™ macht einen ERDDAP™ dataset per EML dataTable. Die datasetID für den Datensatz
 *EMLName* ) *TabelleAnzahl*   (wenn EMLname Text ist) oder
 *System\\_EMLName* ) *TabelleAnzahl*   (wenn EMLname eine Nummer ist) .
Beispielsweise wird Tabelle #1 in der Datei knb-lter-sbc.28, ERDDAP™   datasetID = kb\\_lter\\_sbc\\_28\\_t1,
     
### EML gegen CF+ACDD{#eml-versus-cfacdd} 
Fast alle Metadaten in den EML-Dateien werden in ERDDAP , aber in einem anderen Format. ERDDAP™ Verwendung von [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) und [ANLAGE](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Metadatenstandards. Sie sind komplementäre Metadatensysteme, die für globale Metadaten und für die Metadaten jeder Variablen Schlüssel=Wertpaare verwenden.
Ja, die EML Darstellung der Metadaten ist schöner als die CF+ACDD Darstellung. Ich schlage nicht vor, die CF+ACDD-Darstellung als Ersatz für die EML zu verwenden. Bitte denken Sie an CF+ACDD als Teil der Brücke von der EML-Welt zur OPeNDAP /CF/ACDD Welt.
     
### Kleine Veränderungen{#small-changes} 
 ERDDAP™ macht viele kleine Veränderungen. Zum Beispiel ERDDAP™ verwendet das EML-Nicht- DOI Stellvertreter Identifier plus eine DatenTabellennummer als ERDDAP™   datasetID , aber leicht Änderungen wechseln Identifier, um es zu einem gültigen Variablennamen in den meisten Computersprachen zu machen, z.B. knb-lter-sbc.33 Daten Tabelle #1 wird knb\\_lter\\_sbc\\_33\\_t1.
     
### Wie geht's?{#docbook} 
EML verwendet DocBooks Markup-System, um Struktur zu Blöcken von Text in EML-Dateien bereitzustellen. CF und ACDD erfordern, dass Metadaten ein einfacher Text sein. So GenerateDatasets Xml wandelt den markierten Text in Klartext um, der wie die formatierte Version des Textes aussieht. Die Inline-Tags werden mit quadratischen Klammern, z.B. \\[ betont \\] , und links im Klartext.
     
### Datendateien{#data-files} 
Da die EML-DatenTabelle die URL der eigentlichen Datendatei umfasst, GenerateDatasets Xml wird:
1. Laden Sie die Datendatei.
2. Speichern Sie es im gleichen Verzeichnis wie die EML-Datei.
3. Lesen Sie die Daten.
4. Vergleichen Sie die Beschreibung der Daten im EML mit den tatsächlichen Daten in der Datei.
5. Wenn Sie Datasets generieren Xml findet Unterschiede, behandelt sie mit ihnen oder fragt den Bediener, ob die Unterschiede in Ordnung sind, oder gibt eine Fehlermeldung zurück. Die Details sind in verschiedenen Artikeln unten.
         
###  .zip 'd Datendateien{#zipd-data-files} 
Ist die referenzierte Datendatei a .zip Datei, es muss nur eine Datei enthalten. Diese Datei wird für die ERDDAP™ Datensatz. Wenn es mehr als 1 Datei gibt. ERDDAP™ wird diesen Datensatz ablehnen. Wenn nötig, könnte dies geändert werden. (In der Praxis haben alle SBC LTER Zip-Dateien nur eine Datendatei.)   
     
### Speichertyp{#storagetype} 
Wenn eine Spalte gespeichert ist Typ ist nicht spezifiziert, ERDDAP™ verwendet seine beste Vermutung basierend auf den Daten in der Datendatei. Das funktioniert ziemlich gut.
     
### Einheiten{#units} 
 ERDDAP™ Verwendung [ UDUNITS Formatierung für Einheiten](https://www.unidata.ucar.edu/software/udunits/) . Datensätze generieren Xml kann EML-Einheiten in UDUNITS sauber ca. 95% der Zeit. Die restlichen 5% ergeben eine lesbare Beschreibung der Einheiten, z.B. "biomassDensityUnitPerAbundanceUnit" in EML wird "Biomassedichteeinheit pro Fülleinheit" in ERDDAP . Technisch ist das nicht erlaubt. Ich glaube nicht, dass es unter den Umständen so schlimm ist. \\[ Wenn nötig, Einheiten, die nicht gemacht werden können UDUNITS Kompatibel kann auf das Kommentarattribut der Variablen verschoben werden. \\]   
     
### EML Version 2.1.1{#eml-version-211} 
Diese Unterstützung für EML v2.1.1 Dateien wurde zu GenerateDatasets hinzugefügt Xml im Jahr 2016 mit der Hoffnung, dass es eine Aufnahme in die EML-Gemeinschaft geben würde. Ab 2020 ist das nicht passiert. Die ERDDAP™ Entwickler würden gerne Unterstützung für neuere Versionen von EML hinzufügen, aber nur, wenn die neuen Funktionen tatsächlich genutzt werden. Bitte E-Mail erd.data at noaa.gov wenn Sie Unterstützung für neuere Versionen von EML wünschen und diese Funktion tatsächlich nutzen.
     

## Probleme mit den EML-Dateien{#issues-with-the-eml-files} 

Es gibt einige Probleme / Probleme mit den EML-Dateien, die Probleme verursachen, wenn ein Software-Client (wie die EDDTableFromEML Option in GenerateDatasetsXML) versucht, die EML-Dateien zu interpretieren/zu bearbeiten.

* Obwohl es hier mehrere Probleme gibt, sind sie meistens kleine, lösbare Probleme. Im Allgemeinen ist EML ein großartiges System und es war mir ein Vergnügen, mit ihm zu arbeiten.
* Diese sind grob sortiert vom schlimmsten / am häufigsten bis mindestens schlecht / weniger häufig.
* Die meisten sind mit kleinen Problemen in bestimmten EML-Dateien verbunden (die nicht EMLs Fehler sind) .
* Die meisten können durch einfache Änderungen in der EML-Datei oder Datendatei behoben werden.
* Da LTER-Personen einen EML-Checker bauen, um die Gültigkeit von EML-Dateien zu testen, habe ich einige Vorschläge unten zu Funktionen hinzugefügt, die dem Checker hinzugefügt werden könnten.

Hier sind die Themen:

### Separate Datum und Zeitsäulen{#separate-date-and-time-columns} 
Einige Datendateien haben separate Spalten für Datum und für Zeit, aber keine einheitliche Datum + Zeit Spalte. Derzeit GenerateDatasets Xml erstellt einen Datensatz mit diesen separaten Spalten, ist aber nicht ideal, weil:

* Es ist am besten, wenn Datensätze in ERDDAP™ eine kombinierte Datums-/Zeitspalte aufgerufen "time" .
* Oft wird der Datensatz nicht geladen ERDDAP™ weil "time" Spalte hat keine Datums-/Zeitdaten.

Es gibt zwei mögliche Lösungen:
1. Bearbeiten Sie die Quelldatendatei, um eine neue Spalte in der Datendatei hinzuzufügen (und es im EML beschreiben) wobei die Datums- und Zeitspalten in eine Spalte zusammengefasst werden. Dann rerun GenerateDatasets Xml so findet es die neue Spalte.
2. Verwenden Sie die [Abgeleitete Variablen](/docs/server-admin/datasets#script-sourcenamesderived-variables) Funktion in ERDDAP™ eine neue Variable definieren datasets.xml die durch das Zusammenfassen des Datums und der Zeitspalten erstellt wird. Eines der Beispiele beschäftigt sich konkret mit dieser Situation.
         
### Inkonsistente Säulennamen{#inconsistent-column-names} 
Die EML-Dateien enthalten die Spalten der Datendatei und deren Namen. Leider unterscheiden sie sich oft von den Spaltennamen in der eigentlichen Datendatei. Normalerweise ist der Spaltenauftrag in der EML-Datei identisch mit der Spaltenordnung in der Datendatei, auch wenn die Namen leicht variieren, aber nicht immer. Datensätze generieren Xml versucht, den Spaltennamen zu entsprechen. Wenn es nicht kann (die gemeinsam sind) , es wird aufhören, zeigen Sie die EML/data Dateinamen Paare, und fragen, ob sie korrekt ausgerichtet sind. Wenn Sie 's' eingeben, um eine Tabelle zu überspringen, wird GeneratedDatasetsXml eine Fehlermeldung ausdrucken und auf die nächste Tabelle gehen.
Die Lösung besteht darin, die fehlerhaften Spaltennamen in der EML-Datei zu ändern, um den Spaltennamen in der Datendatei zu entsprechen.
     
### Verschiedene Column Bestellung{#different-column-order} 
Es gibt mehrere Fälle, in denen die EML die Spalten in einer anderen Reihenfolge als in der Datendatei angegeben hat. Datensätze generieren Xml hört auf und fragt den Bediener, ob die Matchups okay sind oder ob der Datensatz übersprungen werden sollte. Wenn es übersprungen ist, wird es eine Fehlermeldung in der Ergebnisdatei geben, z.B.:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
      datasetID=knb\\_lter\\_sbc\\_17\\_t1
      dataFile=all\\_fish\\_all\\_years\\_20140903.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        SURVEY\\_TIMING        = notes
        NOTES                = survey\\_timing
      --&gt;
```
Die Lösung besteht darin, den Spaltenauftrag in diesen EML-Dateien zu fixieren, so dass sie der Reihenfolge in den Datendateien entsprechen.

Es wäre schön, wenn der EML-Checker überprüfte, dass die Spalten und Spaltenauftrag in der Quelldatei den Spalten und Spaltenauftrag in der EML-Datei entsprechen.
    
### Inkorrekt numHeaderLines{#incorrect-numheaderlines} 
Mehrere Daten Tabellen geben numHeaderLines=1, z.B. ...sbc.4011 falsch an. Diese Ursachen ERDDAP™ die erste Zeile der Daten als Spaltennamen zu lesen. Ich habe versucht, SKIP alle diese Daten zu manuellen. Sie sind offensichtlich, weil die unübertroffenen Quell-Col-Namen alle Datenwerte sind. Und wenn es Dateien, die unrichtig numHeaderLines=0 haben, mein System macht es nicht offensichtlich. Hier ist ein Beispiel aus der SBC LTER Fehlerdatei:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3017\\_t1
      dataFile=MC06\\_allyears\\_2012-03-03.txt
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        2008-10-01T00:00     = timestamp\\_local
        2008-10-01T07:00     = timestamp\\_UTC
        2.27                 = discharge\\_lps
        -999.0               = water\\_temperature\\_celsius
      --&gt;
```
So kann der Fehler auftreten, als ob GenerateDatasets Xml denkt, dass die erste Zeile mit Daten in der Datei (z.B. mit 2008-10-01T00:00 etc.) ist die Zeile mit Spaltennamen (als wäre 2008-10-01T00:00 ein Spaltenname) .

Es wäre schön, wenn der EML-Checker den Wert numHeaderLines überprüft.
    
### numHeaderLines = 0{#numheaderlines--0} 
Einige Quelldateien haben keine Spaltennamen. ERDDAP™ akzeptiert, dass, wenn die EML die gleiche Anzahl von Spalten beschreibt.

Meiner Meinung nach: das scheint sehr gefährlich. Es könnte Spalten in einer anderen Reihenfolge oder mit verschiedenen Einheiten geben (siehe unten) und es gibt keine Möglichkeit, diese Probleme zu fangen. Es ist viel besser, wenn alle ASCII-Datendateien eine Zeile mit Spaltennamen haben.
    
### Datum Zeitformat Strings{#datetime-format-strings} 
EML hat eine übliche Möglichkeit, Datums-Zeitformate zu beschreiben. aber es gibt erhebliche Variationen in seiner Verwendung in EML-Dateien. (Das habe ich vorher falsch gemacht. Ich sehe die EML-Dokumentation für formatString, die dem [ Java DatumTimeFormatter Spezifikation](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html) , die jedoch den wichtigen Richtlinien über seine Verwendung fehlt, mit dem Ergebnis, dass formatString oft/gewöhnlich unangemessen verwendet wird.) Es gibt mehrere Instanzen mit falschem Fall und/oder falscher Vervielfältigung eines Buchstabens und/oder nicht standardmäßiger Formatierung. Das bringt eine unangemessene Belastung für Kunden, insbesondere Software-Clients wie GenerateDatasetsXml. Datensätze generieren Xml versucht, die falsch definierten Formate in den EML-Dateien in
 [das Datum/Zeit-Format, ERDDAP™ Anforderungen](/docs/server-admin/datasets#string-time-units) , die mit Java /Joda-Zeitformat-Spezifikation, aber ist etwas mehr vergeben.

Es wäre schön, wenn der EML-Checker strenge Einhaltung der Java /Joda/ ERDDAP Zeiteinheiten Spezifikation und überprüfte, dass Datum Zeitwerte in der Datentabelle korrekt mit dem angegebenen Format abgeglichen werden konnten.
    
### DateTime aber keine Zeitzone{#datetime-but-no-time-zone} 
Datensätze generieren Xml sucht eine Spalte mit Datum Zeit und eine vorgegebene Zeitzone (entweder Zulu : aus Zeiteinheiten, die in 'Z' enden, oder einer Spalten- oder Attributdefinition, die "gmt" oder "utc" enthält, oder lokal: aus "lokal" in der Spalten- oder Attributdefinition) . Auch akzeptabel ist eine Datei mit einer Datumsspalte, aber keine Zeitspalte. Auch akzeptabel ist eine Datei ohne Datum oder Zeitinformationen.

Datensätze generieren Xml behandelt alle "lokalen" Zeiten als aus der Zeitzone, die Sie für eine bestimmte Anzahl von Dateien angeben können, z.B. für SBC LTER, verwenden Sie US/Pacific. Die Informationen sind manchmal in den Kommentaren, aber nicht in einer Form, die für ein Computerprogramm leicht herauszufinden ist.

Dateien, die diese Kriterien nicht erfüllen, werden mit der Nachricht "NO GOOD DATE abgelehnt (TITEL) VARIABLE". Gemeinsame Probleme sind:

* Es gibt eine Spalte mit Daten und eine Spalte mit Zeiten, aber nicht Datum Zeitspalte.
* Es gibt Zeiteinheiten, aber die Zeitzone ist nicht spezifiziert.

Weitere Bemerkungen:
Wenn es ein gutes Datum + Zeit mit Zeitzone Spalte gibt, wird diese Spalte benannt "time" in ERDDAP . ERDDAP™ erfordert, dass Zeitspaltendaten verständlich/konvertierbar sind, um Zulu /UTC/GMT Zeitzone DatumZeiten. \\[ Mein Glaube ist: Lokale Zeiten und verschiedene Datum/Zeit-Formate verwenden (Zweistellige Jahre&#33; ...) in Datendateien zwingt den Endbenutzer zu komplizierten Konvertierungen zu Zulu Zeit, um Daten von einem Datensatz mit Daten von einem anderen zu vergleichen. So. ERDDAP™ Standardisiert alle Zeitdaten: Für Stringzeiten, ERDDAP™ immer verwendet die ISO 8601:2004 (E) Standardformat, zum Beispiel 1985-01-02T00:00Z. Für numerische Zeiten, ERDDAP™ immer verwendet "seconds since 1970-01-01T00:00:00Z" . ERDDAP™ immer verwendet die Zulu   (UTC, GMT) Zeitzone, um die Schwierigkeiten der Arbeit mit verschiedenen Zeitzonen und Standardzeit gegen Tageslichtsparzeit zu entfernen. So GenerateDatasets Xml sucht eine EML-DatenTabelle Spalte mit Datum+Zeit Zulu . Dies ist hart, weil EML kein formales Vokabular/System verwendet (wie [ Java /Joda Zeitformat](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html) ) zur Angabe der Daten Zeitformat:
Gibt es ein Kol mit numerischen Zeitwerten (z.B., Matlab Zeiten) und Zulu Zeitzone (oder nur Daten, ohne Zeitspalten) , es wird als "time" .
Wenn es eine Col mit Datums- und Zeitdaten gibt, die Zulu Zeitzone, es wird als "time" und jede andere Datums- oder Zeitspalte wird entfernt.
Else, wenn ein Col mit nur Datum Informationen gefunden wird, es wird als die "time" Variable (ohne Zeitzone) .
Gibt es eine Datenspalte und eine Zeitspalte und kein kombiniertes Datum Zeitspalte, der Datensatz ist REJECTED — aber der Datensatz könnte durch Hinzufügen eines kombinierten Datums nutzbar gemacht werden Zeitspalte (bevorzugt, Zulu Zeitzone) die Datei datafile und die Beschreibung in der EML-Datei hinzufügen.
Beispiel aus SBC LTER: [https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/) dataTable #2.

Es wäre schön, wenn EML/LTER die Aufnahme einer Spalte mit Zulu   (UTC, GMT) Zeitzonenzeiten in allen relevanten Quelldatendateien. Das nächste beste ist, ein System zu EML hinzuzufügen, um ein time\\_zone Attribut mit Standardnamen (von [TZ-Säule](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) ) .
    
### Fehlen missing\\_value  {#missing-missing_value} 
Einige Spalten verwenden ein missing\\_value aber nicht in die EML-Metadaten eintragen, z.B. Fällung\\_mm in knb-lter-sbc.5011 verwendet -999. Wenn im EML kein fehlender Wert angegeben wird, sucht GenerateDatasetsXml automatisch nach gemeinsamen fehlenden Werten (z.B. 99, -99, 999, -999, 9999, -9999, etc.) und erstellt diese Metadaten. Aber andere Vermisste missing\\_value s werden nicht gefangen.

Es wäre schön, wenn der EML-Checker nach fehlendem missing\\_value S.
    
### Kleine Probleme{#small-problems} 
Es gibt viele kleine Probleme (Schreibweise, Pünktlichkeit) die wahrscheinlich nur durch eine menschliche Kontrolle jedes Datensatzes gefunden werden.

Es wäre schön, wenn der EML-Checker nach Rechtschreibungen und grammatischen Fehlern suchte. Dies ist ein schwieriges Problem, weil Wörter in der Wissenschaft oft von Zauberscheckern markiert werden. Die menschliche Bearbeitung ist wahrscheinlich notwendig.
    
### Invalide Unicode-Zeichen{#invalid-unicode-characters} 
Einige der EML-Inhalte enthalten ungültige Unicodezeichen. Dies sind wahrscheinlich Zeichen aus dem Windows-Charset, die falsch kopiert und in die UTF-8 EML-Dateien eingefügt wurden. Datensätze generieren Xml sanitisiert diese Zeichen z.B., \\[ 1.28 \\] , so sind sie leicht zu suchen in der ERDDAP™   datasets.xml Datei.

Es wäre schön, wenn der EML-Checker darauf überprüft. Es ist einfach zu finden und einfach zu beheben.
    
### Verschiedene Spalteneinheiten] (#differentColumnUnits)  {#different-column-unitsdifferentcolumnunits} 
Einige EML-DatenTabellen definieren Spalten, die mit den Spalten in der Datendatei unvereinbar sind, insbesondere weil sie unterschiedliche Einheiten aufweisen. Datensätze generieren Xml markiert diese. Es liegt an dem Bediener zu entscheiden, ob die Unterschiede in Ordnung sind oder nicht. Diese erscheinen in der Fehlerdatei als "SKIPPED" DatenTabellen. Beispiel in SBC LTER Fehlerdatei:
```
      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3\\_t1
      dataFile=SBCFC\\_Precip\\_Daily\\_active\\_logger.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        Daily\\_Precipitation\\_Total\\_mm = Daily\\_Precipitation\\_Total\\_inch
        Flag\\_Daily\\_Precipitation\\_Total\\_mm = Flag\\_Daily\\_Precipitation\\_Total\\_inch
      -->
```
Es wäre schön, wenn der EML-Checker überprüft, dass die Einheiten übereinstimmen. Leider ist dies wahrscheinlich unmöglich zu fangen und dann nicht zu lösen, ohne den Datensatz-Ersteller zu kontaktieren, da die Quelldatei keine Einheiten enthält. Die Diskrepanz für das obige Beispiel war nur bemerkbar, weil die Einheiten im Quellspaltennamen und im EML-Spaltennamen enthalten waren. Wie viele andere DatenTabellen haben dieses Problem, sind aber nicht nachweisbar?
    
### Verschiedene Versionen von EML{#different-versions-of-eml} 
Datensätze generieren Xml ist für die Arbeit mit EML 2.1.1. Andere Versionen von EML werden in dem Maße funktionieren, dass sie mit 2.1.1 übereinstimmen oder dass GenerateDatasetsXml spezielle Code hat, um damit zu umgehen. Das ist ein seltenes Problem. Wenn es auftritt, ist die Lösung, die Dateien in EML 2.1.1 zu konvertieren oder die EML-Datei zu senden. erd.data at noaa.gov , so kann ich Änderungen an GenerateDatasets vornehmen Xml, um die Unterschiede zu behandeln.

Bob hat die Unterstützung für EML-Dateien für GenerateDatasets hinzugefügt Xml im Jahr 2016 mit der Hoffnung, dass es eine Aufnahme in die EML-Gemeinschaft geben würde. Ab 2020 ist das nicht passiert. Bob freut sich, Unterstützung für neuere Versionen von EML hinzuzufügen, aber nur, wenn die neuen Features tatsächlich verwendet werden. Bitte E-Mail erd.data at noaa.gov wenn Sie Unterstützung für neuere Versionen von EML wünschen und diese Funktion tatsächlich nutzen.
    
### Probleme beim Parnieren der Datendatei{#trouble-parsing-the-data-file} 
Selten kann ein DataTable mit dem Fehler "unerwartete Anzahl von Punkten auf Zeile #120 abgelehnt werden (beobachtet=52, erwartet=50) " Eine solche Fehlermeldung bedeutet, dass eine Zeile in der Datendatei eine andere Anzahl von Werten als die anderen Zeilen hatte. Es kann ein Problem in ERDDAP™   (z.B. die Datei nicht korrekt parsiert) oder in der Datei. Beispiel aus SBC LTER:
 [https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/) dataTable #3, siehe datafile=LTER\\_monatlich\\_bottledata\\_registered\\_stations\\_20140429.txt
