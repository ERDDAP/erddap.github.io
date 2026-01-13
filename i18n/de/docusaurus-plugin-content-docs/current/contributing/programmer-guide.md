---
sidebar_position: 2
---

# Programmer's Guide

Das sind Dinge, mit denen nur ein Programmierer arbeiten will ERDDAP ' Java Klassen müssen es wissen.

###  **Den Quellcode bekommen**  {#getting-the-source-code} 
   

  - Via Source Code auf GitHub
Der Quellcode für aktuelle öffentliche Versionen und In-Entwicklung Versionen ist auch über [GitHub](https://github.com/ERDDAP) . Bitte lesen Sie die [Das ist mein Name.](https://github.com/ERDDAP/erddap/wiki) für das Projekt. Wenn Sie den Quellcode ändern möchten (und möglicherweise die Änderungen in den Standard integriert haben ERDDAP™ Verteilung) , dies ist der empfohlene Ansatz.

###  ** ERDDAP™ Abhängigkeiten**  {#erddap-dependencies} 
 ERDDAP™ verwendet Maven, um Codeabhängigkeiten sowie einige statische Referenzdateien zu laden (WEB-INF/ref) . Dies geschieht, um viele große Dateien im Repository zu speichern.
Sie können verwenden `mvn kompiliert` und das wird die Abhängigkeiten und ref Dateien holen. Sie können auch verwenden `mvn Paket` eine Kriegsakte zu erzeugen.
Sie können die ref-Dateien manuell herunterladen:

  -  [Etopo1\\_ice_g\\_i2 .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip) und entpacken Sie es in /WEB-INF/ref/ .

  -  [Ref\\_files .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip) und entpacken Sie es in /WEB-INF/ref/ .

  -  [ErddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.1/erddapContent.zip)   (Version 1.0.0, 20333 Bytes, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, datiert 2024-10-14) und entpacken Sie es in _tomcat_, erstellen _tomcat_/content/erddap .

HINWEIS: Standardmäßig wird Maven statische Referenz- und Testdatenarchiv-Downloads aufspeichern und nur dann extrahieren, wenn eine neue Version heruntergeladen wird. Um vollständig herunterzuladen, können Sie die `Jetzt herunterladen` und/oder `Skip user information` Immobilien nach Maven (z. `mvn -DskipResourceDownload-Paket` ) . Um die Extraktion zu zwingen, gesetzt `-Ddownload.unpack=true` und `-Ddownload.unpackWhenChanged=false` .

-  ERDDAP™ und seine Unterkomponenten haben sehr liberale, offene Ressourcen [Lizenzen](/license) , so können Sie den Quellcode für jeden Zweck verwenden und ändern, für-profit oder nicht-for-profit. Anmerkung: ERDDAP™ und viele Subkomponenten haben Lizenzen, die erfordern, dass Sie die Quelle des Codes, den Sie verwenden, anerkennen. Vgl. [Kredite](/credits) . Ob erforderlich oder nicht, es ist nur eine gute Form, um alle diese Beiträge zu bestätigen.
  

-  **Code für andere Projekte verwenden** 

Während Sie willkommen sind, Teile der ERDDAP™ Code für andere Projekte, gewarnt werden, dass der Code kann und wird ändern. Wir versprechen nicht, andere Verwendungen unseres Codes zu unterstützen. Git und GitHub werden Ihre wichtigsten Lösungen für den Umgang mit diesem sein - Git ermöglicht es Ihnen, unsere Änderungen in Ihre Veränderungen zu vereinen.
   **Für viele Situationen, in denen Sie versucht werden, Teile zu verwenden ERDDAP™ in Ihrem Projekt finden Sie es viel einfacher zu installieren und zu verwenden ERDDAP™ wie es ist,** und dann andere Dienstleistungen schreiben, die ERDDAP Dienstleistungen. Sie können sich selbst einrichten ERDDAP™ roh in einer Stunde oder zwei. Sie können sich selbst einrichten ERDDAP™ Einbau in poliert in wenigen Tagen (je nach Anzahl und Komplexität Ihrer Datensätze) . Aber das Hacken von Teilen ERDDAP™ für Ihr eigenes Projekt wird wahrscheinlich Wochen dauern (und Monate, um Feinheiten zu fangen) und Sie verlieren die Fähigkeit, Änderungen und Fehlerbehebungen von späteren ERDDAP™ Pressemitteilungen. Wir (offensichtlich) denken, es gibt viele Vorteile zu nutzen ERDDAP™ wie es ist und macht Sie ERDDAP™ öffentlich zugänglich. Aber unter bestimmten Umständen möchten Sie vielleicht nicht Ihre ERDDAP™ öffentlich zugänglich. Dann kann Ihr Service auf Ihre privaten zugreifen und nutzen ERDDAP™ und Ihre Kunden müssen nicht wissen, ERDDAP™ .

  ####  **Halb** 

Oder es gibt einen anderen Ansatz, den Sie nützlich finden können, der auf halbem Weg zwischen dem Eintauchen in ERDDAP Code und Verwendung ERDDAP™ als eigenständiger Webservice: In der EDD-Klasse gibt es eine statische Methode, mit der Sie eine Instanz eines Datensatzes bilden können (auf Basis der Spezifikation in datasets.xml ) :
`oneFromDataset Xml (String tDatasetID) 
`Es gibt eine Instanz eines EDDTable oder EDDGrid Datensatz. In Anbetracht dieser Instanz können Sie anrufen \\
`makeNewFileForDapQuery (String userDapQuery, String Dir, String fileName, String file TypName) 
`um der Instanz eine Datendatei eines bestimmten Dateityps mit den Ergebnissen einer Benutzeranfrage zu erstellen. So ist dies eine einfache Möglichkeit, ERDDAP 's Methoden, um Daten anzufordern und eine Datei in Reaktion zu erhalten, wie ein Client würde die ERDDAP™ Web-Anwendung. Aber dieser Ansatz funktioniert in Ihrem Java Programm und umgeht die Notwendigkeit für einen Anwendungsserver wie Tomcat. Wir verwenden diesen Ansatz für viele der Unit-Tests von EDDTable und EDDGrid subclasses, so können Sie Beispiele davon im Quellcode für alle diese Klassen sehen.

###  **Entwicklung Umwelt**  {#development-environment} 

  - Es gibt Konfigurationen für [Düsen](https://github.com/ERDDAP/erddap/blob/main/development/jetty) und [Docker](https://github.com/ERDDAP/erddap/blob/main/development/docker) in GitHub, obwohl Releases in Tomcat erwartet werden.

  -  **Optional** : Einrichten ERDDAP™ in Tomcat
Seit ERDDAP™ ist vor allem ein servlet in Tomcat, wir empfehlen dringend, dass Sie dem Standard folgen [Installationsanleitung](/docs/server-admin/deploy-install) Tomcat installieren und dann installieren ERDDAP™ in Tomcats Webapps Verzeichnis. Unter anderem, ERDDAP™ wurde entworfen, um in Tomcats Verzeichnisstruktur installiert werden und erwartet, dass Tomcat einige .jar-Dateien zur Verfügung stellt.

  -  ERDDAP™ erfordert keine spezifische IDE (Chris verwendet hauptsächlich Visual Studio Code, Bob verwendet EditPlus) . Wir verwenden keine Eclipse, Ant, etc.; noch bieten wir ERDDAP - die Unterstützung für sie. Das Projekt nutzt Maven.

  - Wir verwenden eine Batch-Datei, die alle .class Dateien im Quellbaum gelöscht, um sicherzustellen, dass wir ein sauberes Kompilieren haben (mit Javac) .

  - Zurzeit verwenden wir Adoptiums Javac jdk-25.0.1+8, um gov.noaa.pfeg.coastwatch.TestAll (es hat Links zu einigen Klassen, die nicht anders kompiliert werden) und die Tests durchführen. Aus Sicherheitsgründen ist es fast immer am besten, die neuesten Versionen von Java 25 und Tomcat 10.

    - Wenn wir javac oder java ausführen, ist das aktuelle Verzeichnis _tomcat_/webapps/erddap/WEB-INF .

    - Unser Javac und Java-Klassenpfad ist
       `Klassen;../.././lib/servlet-api.jar;lib/*` 

    - Deine Javac-Befehlszeile wird so sein wie
       `javac -codierung UTF-8 -cp Klassen;./../../lib/servlet-api.jar;lib/* Klassen/gov/noaa/pfel/coastwatch/TestAll.java` 

    - Und deine Java-Befehlszeile wird so sein.
`java -cp Klassen;./../../lib/servlet-api.jar;lib/* -Xmx4000M -Xms4000M Klassen/gov/noaa/pfel/coastwatch/TestAll
       `Optional: Sie können hinzufügen` -verbose:gc`, was sagt Java zur Erstellung von Müllsammelstatistiken.

    - Prüfung Alle Komplizen, alles ERDDAP™ Die Bedürfnisse wurden zusammengestellt. Einige Klassen werden kompiliert, die nicht für ERDDAP™ . Wenn TestAll erfolgreich ist, aber keine Klasse kompiliert, ist diese Klasse nicht nötig. (Es gibt einige unfertige/ungenutzte Klassen.) 

  - In einigen Fällen verwenden wir 3rd Party Quellcode anstelle von .jar Dateien (insbesondere für DODS ) und haben sie leicht modifiziert, um Probleme zu vermeiden, die mit Java 25. Wir haben oft andere leichte Änderungen vorgenommen (insbesondere DODS ) aus anderen Gründen.

  - Die meisten Klassen haben Testmethoden in ihrer zugehörigen src/test-Datei. Sie können die JUnit-Tests mit der `mvn-Test` Befehl. Dies wird mehrere Zip-Dateien von Daten herunterladen, auf die die Tests von der neuesten Veröffentlichung vertrauen [ ERDDAP /erddap Prüfung](https://github.com/ERDDAP/erddapTest/releases/) .
     
HINWEIS: Maven caches downloads aber wird die heruntergeladenen Archive auf jeder Ausführung entpacken, die Zeit braucht. Zum Download überspringen
und unzipping Testdatenarchive, können Sie die `Skip user information` Immobilien nach Maven (z. `mvn -DskipTestResourceDownload-Paket` ) .

###   **Wichtige Klassen**  {#important-classes} 

Wenn Sie den Quellcode betrachten möchten und versuchen, herauszufinden, wie ERDDAP™ Arbeiten, bitte.

  - Der Code hat Java Der Präsident. - Die Aussprache ist geschlossen. Java Docs wurden nicht generiert. Fühlen Sie sich frei, sie zu erzeugen.

  - Die wichtigsten Klassen (einschließlich der nachstehend genannten) sind innerhalb gov/noaa/pfel/erdap.

  - Die ERDDAP™ Klasse hat die höchste Ebene Methoden. Es erweitert HttpServlet.

  -  ERDDAP™ Anträge auf Fälle von Unterklassen von EDDGrid oder EDDTable, die einzelne Datensätze darstellen.

  - EDStatic hat die meisten statischen Informationen und Einstellungen (z.B. aus der setup.xml und message.xml Dateien) und bietet statische Dienstleistungen (z.B. Senden von E-Mails) .

  -  EDDGrid und EDDTable subclasses parse die Anfrage, erhalten Sie Daten von unterklassenspezifischen Methoden, dann formatieren Sie die Daten für die Antwort.

  -  EDDGrid Unterklassen schieben Daten in GridDataAccessor (den internen Datenbehälter für Rasterdaten) .

  - EDDTable Subclasses Push-Daten in TableWriter Subclasses, die Daten auf einen bestimmten Dateityp auf dem-fly schreiben.

  - Sonstige Klassen (z.B. niedrige Niveauklassen) sind auch wichtig, aber es ist weniger wahrscheinlich, dass Sie arbeiten, um sie zu ändern.
     

###  **Code Beiträge**  {#code-contributions} 

- GitHub Probleme
Wenn Sie einen Beitrag leisten möchten, aber kein Projekt haben möchten, siehe die Liste [GitHub Probleme](https://github.com/ERDDAP/erddap/issues) , viele davon sind Projekte, die Sie übernehmen könnten. Wenn Sie an einem Problem arbeiten möchten, geben Sie es bitte selbst zu, um anderen anzuzeigen, an denen Sie arbeiten. Die GitHub-Problematik ist der beste Ort, um Fragen zu diskutieren, wie man mit der Arbeit an diesem Thema fortfahren kann.

- Wenn die Änderung, die Sie machen möchten, einer der unten üblichen Fälle ist, erstellen Sie bitte eine [GitHub Ausgabe](https://github.com/ERDDAP/erddap/issues) die von Ihnen beabsichtigte Änderung angeben. Dann, wenn die Änderung abgeschlossen ist, stellen Sie eine Zug-Anfrage, um die Zusammenführung zu verlangen. Die gemeinsamen Änderungen umfassen:

  - Sie möchten eine weitere Unterklasse schreiben EDDGrid oder EDDTable, um einen anderen Datenquellentyp zu handhaben. Wenn ja, empfehlen wir Ihnen, die nächste bestehende Unterklasse zu finden und diesen Code als Ausgangspunkt zu verwenden.

  - Sie möchten eine weitere saveAs_FileType_ Methode schreiben. Falls ja, empfehlen wir Ihnen, die nächst vorhandene saveAs_FileType_ Methode in EDDGrid oder EDDTable und verwenden Sie diesen Code als Ausgangspunkt.

Diese Situationen haben den Vorteil, dass der Code, den du schreibst, sich selbst enthalten ist. Sie müssen nicht alle Details von ERDDAP Die Internen. Und es wird leicht für uns sein, Ihren Code in ERDDAP . Beachten Sie, dass, wenn Sie den Code einreichen, die Lizenz mit der ERDDAP™   [Lizenz](/license)   (z.B., [Apache](https://www.apache.org/licenses/) , [BSD](https://www.opensource.org/licenses/bsd-license.php) , oder [MITTEL-X](https://www.opensource.org/licenses/mit-license.php) ) . Wir werden Ihren Beitrag in der [Kredite](/credits) .

- Wenn Sie eine Funktion haben, die oben nicht abgedeckt ist, möchten Sie hinzufügen ERDDAP , es wird empfohlen, zunächst einen Diskussionsfaden in der [GitHub Diskussionen](https://github.com/ERDDAP/erddap/discussions/categories/ideas) . Für wesentliche Merkmale/Änderungen wird das Technische Gremium darüber diskutieren und entscheiden, ob es zu genehmigen ist, ERDDAP™ .

###  **Bewertung Ihrer Code-Beiträge**  {#judging-your-code-contributions} 
Wenn Sie Code oder andere Änderungen einreichen möchten, die in ERDDAP Das ist toll. Ihr Beitrag muss bestimmte Kriterien erfüllen, um angenommen zu werden. Wenn Sie den untenstehenden Richtlinien folgen, erhöhen Sie die Chancen, dass Ihr Beitrag akzeptiert wird.
   

  - Die ERDDAP™ Projekt wird von einem NATD verwaltet ( NOAA Technischer Leiter ernannt) mit Eingang von einem Technischen Board.
Von 2007 (Anfang ERDDAP ) bis 2022, das war Bob Simons (auch der Gründer-Leader) . Ab Januar 2023 ist das Chris John. Grundsätzlich ist die NATD für ERDDAP , so hat er das letzte Wort über Entscheidungen über ERDDAP™ Code, insbesondere über das Design und ob eine bestimmte Zuganforderung akzeptiert oder nicht. Dies muss zum Teil aus Effizienzgründen geschehen. (es funktioniert toll für Linus Torvalds und Linux) und teilweise aus Sicherheitsgründen: Jemand muss den IT-Sicherheitspersonen sagen, dass er die Verantwortung für die Sicherheit und Integrität des Codes übernimmt.
     

  - Die NATD garantiert nicht, dass s/he Ihren Code akzeptiert.
Wenn ein Projekt einfach nicht funktioniert und wir hofften, und wenn es nicht geheilt werden kann, wird die NATD nicht das Projekt im ERDDAP™ Verteilung. Bitte fühlen Sie sich nicht schlecht. Manchmal arbeiten Projekte nicht so gut wie gehofft. Es passiert mit allen Software-Entwicklern. Wenn Sie den untenstehenden Richtlinien folgen, erhöhen Sie Ihre Erfolgschancen stark.
     

  - Es ist am besten, wenn die Änderungen von allgemeinem Interesse und von Nutzen sind.
Wenn der Code für Ihre Organisation spezifisch ist, ist es wahrscheinlich am besten, einen separaten Zweig von ERDDAP™ für Ihren Einsatz. Axiom macht das. Glücklicherweise macht Git das einfach zu tun. Die NATD will eine konsequente Vision für ERDDAP , nicht erlauben es, ein Küchenspülen-Projekt zu werden, wo jeder ein benutzerdefiniertes Feature für ihr Projekt hinzufügt.
     

  - Folgen Sie der Java Kodexübereinkommen.
Im Allgemeinen sollte Ihr Code gute Qualität sein und sollte dem Original folgen [ Java Kodexübereinkommen](https://www.oracle.com/technetwork/java/codeconventions-150003.pdf) : setzen .class-Dateien an der richtigen Stelle in der Verzeichnisstruktur, geben .class-Dateien einen entsprechenden Namen, beinhalten ordnungsgemäß Java Doc kommentiert, enthalten //Kommentare zu Beginn jeder Ziffer des Codes, indent mit 4 Leerzeichen (nicht tab) , vermeiden Zeilen &gt;80 Zeichen, etc. Konventionen ändern sich und der Quellcode ist nicht immer vollständig aktuell. Wenn in Zweifel, passen Sie Code zu den Konventionen und nicht vorhandenen Code.

- Verwenden Sie beschreibende Klasse, Methode und variable Namen.
Das erleichtert den Code für andere.
   

- Vermeiden Sie Phantasiecode.
Auf lange Sicht müssen Sie oder andere Leute den Code herausfinden, um ihn zu erhalten. So verwenden Sie bitte einfache Codierungsmethoden, die so einfacher für andere sind (auch in Zukunft) um herauszufinden. Natürlich, wenn es einen echten Vorteil, um einige Phantasie zu verwenden Java Programmierfunktion, verwenden Sie es, aber ausführlich dokumentieren, was Sie getan haben, warum und wie es funktioniert.
   

- Arbeiten Sie mit dem Technischen Board, bevor Sie beginnen.
Wenn Sie hoffen, Ihre Code-Änderungen in ERDDAP™ , The Technical Board will auf jeden Fall darüber reden, was Sie tun werden und wie Sie es tun werden, bevor Sie Änderungen am Code vornehmen. So können wir vermeiden, dass Sie Änderungen vornehmen, die der NATD letztendlich nicht akzeptiert. Wenn Sie die Arbeit machen, ist der NATD und das Technische Board bereit, Fragen zu beantworten, um Ihnen zu helfen, den vorhandenen Code und (Gesamt) wie Sie Ihr Projekt angehen.
   

- selbständig arbeiten (wie möglich) nach dem Start.
Im Gegensatz zu den oben genannten "Arbeit mit dem Technischen Board" ermutigt die NATD, nach dem Projektstart so unabhängig wie möglich zu arbeiten. Wenn die NATD Ihnen fast alles erzählen und viele Fragen beantworten muss (besonders diejenigen, die Sie durch das Lesen der Dokumentation oder des Codes beantwortet haben könnten) , dann sind Ihre Bemühungen keine Zeitersparnis für die NATD und er könnte auch die Arbeit sie selbst tun. Es ist die [Mythischer Mann Month](https://en.wikipedia.org/wiki/The_Mythical_Man-Month) Problem. Natürlich sollten wir immer noch kommunizieren. Es wäre toll, regelmäßig Ihre Arbeit im laufenden zu sehen, um sicherzustellen, dass das Projekt auf Kurs ist. Aber je mehr Sie selbständig arbeiten können (nachdem der Technische Vorstand die Aufgabenstellung und den allgemeinen Ansatz vereinbart hat) Je besser.
   

- Vermeiden Sie Fehler.
Wenn ein Fehler nicht vor einer Veröffentlichung erwischt wird, verursacht es Probleme für Benutzer (am besten) , gibt die falschen Informationen zurück (am schlimmsten) , ist ein blot auf ERDDAP 's Ruf, und wird weiterhin auf außer-of-date ERDDAP™ Installationen seit Jahren. Arbeite sehr schwer, Fehler zu vermeiden. Teil davon ist das Schreiben von sauberem Code (so ist es einfacher, Probleme zu sehen) . Ein Teil davon ist die Prüfung der Schreibeinheit. Ein Teil davon ist eine ständige Einstellung der Fehlervermeidung, wenn Sie Code schreiben. Machen Sie den NATD nicht bereuen, Ihren Code hinzuzufügen ERDDAP™ .
   

- Schreibe einen Gerätetest oder Tests.
Für neuen Code sollten Sie JUnit-Tests in einer Testdatei schreiben.
Bitte schreiben Sie mindestens eine individuelle Testmethode, die den Code, den Sie schreiben, gründlich testet und in die JUnit Testdatei der Klasse fügt, so dass er automatisch ausgeführt wird. Einheit (und verwandt) Tests sind eine der besten Möglichkeiten, Fehler zu fangen, zunächst, und auf lange Sicht (wie andere Dinge sich ändern ERDDAP™ ) . Wie Bob sagte: "Unit-Tests lassen mich nachts schlafen."
   

- Machen Sie es für die NATD leicht, die Änderungen in Ihrer Zuganforderung zu verstehen und zu akzeptieren.
Teil davon ist das Schreiben einer Einheitstestmethode (S) . Teil davon ist die Begrenzung Ihrer Änderungen an einem Abschnitt des Codes (oder eine Klasse) wenn möglich. Die NATD wird keine Pull-Anfrage mit Hunderten von Änderungen im gesamten Code akzeptieren. Der NATD sagt den IT-Sicherheitspersonen, dass er die Verantwortung für die Sicherheit und Integrität des Codes übernimmt. Wenn es zu viele Veränderungen gibt oder sie zu schwer sind, herauszufinden, dann ist es einfach zu schwer, die Änderungen zu überprüfen sind korrekt und stellen keine Fehler oder Sicherheitsprobleme vor.
   

- Ganz einfach.
Ein gutes Gesamtthema für Ihren Code ist: Halten Sie es einfach. Einfacher Code für andere (auch in Zukunft) zu lesen und zu pflegen. Es ist leicht für die NATD zu verstehen und damit zu akzeptieren.
   

- Nehmen Sie langfristige Verantwortung für Ihren Code an.
Langfristig ist es am besten, wenn Sie die laufende Verantwortung für die Aufrechterhaltung Ihres Codes übernehmen und Fragen darüber beantworten. (z.B. im ERDDAP™ Google Group) . Wie einige Autoren bemerken, ist Code eine Haftung sowie ein Vermögenswert. Wenn ein Fehler in der Zukunft entdeckt wird, ist es am besten, wenn Sie es reparieren, weil niemand kennt Ihren Code besser als Sie (auch, so dass es einen Anreiz, Fehler an erster Stelle zu vermeiden) . Die NATD bittet nicht um ein festes Engagement für eine laufende Wartung. Der NATD sagt nur, dass die Wartung sehr geschätzt wird.
